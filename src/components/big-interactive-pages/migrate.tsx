import styles from './migrate.module.css'
import MainNavbar from '../navbar-main'
import { useEffect } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import { ExtractedMetadata, extractMetadata } from '../../lib/game-saving/extract-metadata'
import Button from '../design-system/button'
import { IoArrowForward, IoCheckmark } from 'react-icons/io5'
import Input from '../design-system/input'
import { getPuzzleLabFromLocalStorage } from '../../lib/game-saving/legacy-migration'
import { SessionInfo } from '../../lib/game-saving/account'
import { isValidEmail } from '../../lib/game-saving/email'

interface LegacyGame {
	name: string
	code: string
	metadata: ExtractedMetadata
}

interface MigrateProps {
	session: SessionInfo | null
	intitialEmail: string
}

export default function Migrate({ session, intitialEmail }: MigrateProps) {
	const allGames = useSignal<LegacyGame[]>([])
	const selectedGame = useSignal<LegacyGame | null>(null)
	const migratingGames = useSignal<string[]>([])
	const email = useSignal(intitialEmail)

	const state = useSignal<'idle' | 'loading' | 'done'>('idle')
	const migratedGames = useSignal<{ id: string, legacy: LegacyGame }[]>([])

	useEffect(() => {
		let cancel = false

		getPuzzleLabFromLocalStorage(true).then(data => {
			if (cancel) return

			let json: [string, string][]
			try {
				json = JSON.parse(data)
			} catch {
				console.warn('Could not parse localStorage data, might not exist')
				return
			}
			allGames.value = json.map(([ name, code ]: [string, string]) => ({
				name,
				code,
				metadata: extractMetadata(code)
			}))
			selectedGame.value = allGames.value[0] ?? null
		})

		return () => { cancel = true }
	}, [])

	if (state.value === 'done') return (
		<div>
			<MainNavbar session={session} />

			<div class='copy-container'>
				<h1>Games Migrated!</h1>
				<p>All of your games have been saved to an account under the email {email.value}.</p>
				<p>You can now access your games from any device by logging in.</p>
				<a href='/login'><Button icon={IoArrowForward} iconSide='right' accent>Log in</Button></a>

				<div class={styles.migratedList}>
					<p>Or open games right away:</p>
					<ul>
						{migratedGames.value.map(game => (
							<li key={game.legacy.name}>
								{game.legacy.name}{' '}
								{![ null, 'your_name', '' ].includes(game.legacy.metadata.authorName) ? <span class={styles.author}>
									by @{game.legacy.metadata.authorName}
								</span> : null}{' '}
								<a href={`/~/${game.id}`} target='_blank'>
									<Button>Open</Button>
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)

	return (
		<div>
			<MainNavbar session={session} />

			<div class='copy-container'>
				<h1>Migrate Your Games</h1>
				<p>
					Welcome back to Sprig! It looks like you have some games stored through the old system. Let's get those moved over to an account so you don't lose any work.
				</p>
				<p>
					If you choose not to do this now, you can always come back to this page later. None of your games will be lost unless you clear your browser storage.
				</p>

				<h2>Choose games to migrate:</h2>

				{allGames.value.length === 0 ? (
					<p>Looks like you don't have any legacy games in this browser's storage.</p>
				) : (
					<div class={styles.split}>
						<div class={styles.games}>
							{allGames.value.map(game => (
								<div key={game.name} class={`
									${styles.game}
									${selectedGame.value?.name === game.name ? styles.selected : ''}
									${migratingGames.value.includes(game.name) ? styles.migrating : ''}
								`} onMouseDown={() => selectedGame.value = game}>
									<input
										type='checkbox'
										id={game.name}
										name={game.name}
										checked={migratingGames.value.includes(game.name)}
										disabled={state.value !== 'idle'}
										onChange={event => {
											if (event.currentTarget.checked) {
												migratingGames.value = [ ...migratingGames.value, game.name ]
											} else {
												migratingGames.value = migratingGames.value.filter(name => name !== game.name)
											}
										}}
									/>

									<div class={styles.metadata}>
										{game.metadata.name || game.name}{' '}
										{![ null, 'your_name', '' ].includes(game.metadata.authorName) ? <span class={styles.author}>
											by @{game.metadata.authorName}
										</span> : null}
									</div>
								</div>
							))}
						</div>

						<div class={styles.code}>
							{selectedGame.value
								? <pre><code>{selectedGame.value.code}</code></pre>
								: null}
						</div>
					</div>
				)}

				<form onSubmit={async (event) => {
					event.preventDefault()
					state.value = 'loading'

					const res = await fetch('/api/games/migrate', {
						method: 'POST',
						body: JSON.stringify({
							partialSessionEmail: session?.session.full ? undefined : email.value,
							games: allGames.value
								.filter(game => migratingGames.value.includes(game.name))
								.map(game => ({
									name: game.metadata.name || game.name,
									code: game.metadata.cleanedCode
								}))
						})
					})
					if (!res.ok) alert(`Migration unexpectedly failed! ${await res.text()}`)

					const gameIds = await res.json()
					migratedGames.value = allGames.value
						.filter(game => migratingGames.value.includes(game.name))
						.map((game) => ({ id: gameIds[game.name], legacy: game }))

					localStorage.setItem('seenMigration', 'true')

					if (session?.session.full) {
						window.location.replace('/~')
					} else {
						state.value = 'done'
					}
				}}>
					{session?.session.full ? null : (
						<div class={styles.emailEntry}>
							<label for='email'>Enter your email:</label>
							<Input onChange={() => undefined} value={email.value} type='email' autoComplete='email' id='email' placeholder={'fiona@hackclub.com'} bind={email} />
						</div>
					)}

					<Button
						accent
						icon={IoCheckmark}
						class={styles.migrateButton}
						disabled={migratingGames.value.length === 0 || (!session?.session.full && !isValidEmail(email.value))}
						loading={state.value === 'loading'}
						type='submit'
					>
						Migrate {migratingGames.value.length} {migratingGames.value.length === 1 ? 'game' : 'games'}
					</Button>
				</form>
			</div>
		</div>
	)
}
