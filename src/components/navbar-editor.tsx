import { Signal, useSignal, useSignalEffect } from '@preact/signals'
import { codeMirror, PersistenceState, isDark, toggleTheme } from '../lib/state'
import Button from './design-system/button'
import SavePrompt from './popups-etc/save-prompt'
import styles from './navbar.module.css'
import { persist } from '../lib/game-saving/auth-helper'
import InlineInput from './design-system/inline-input'
import { throttle } from 'throttle-debounce'
import SharePopup from './popups-etc/share-popup'
import { IoChevronDown, IoLogoGithub, IoPlay, IoSaveOutline, IoShareOutline, IoShuffle, IoWarning } from 'react-icons/io5'
import { usePopupCloseClick } from '../lib/utils/popup-close-click'
import { upload, uploadState } from '../lib/upload'
import { VscLoading } from 'react-icons/vsc'
import { defaultExampleCode } from '../lib/examples'

const saveName = throttle(500, async (gameId: string, newName: string) => {
	try {
		const res = await fetch('/api/games/rename', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ gameId, newName })
		})
		if (!res.ok) throw new Error(`Error renaming game: ${await res.text()}`)
	} catch (error) {
		console.error(error)
	}
})

const onNameEdit = (persistenceState: Signal<PersistenceState>, newName: string) => {
	if (persistenceState.value.kind !== 'PERSISTED' || persistenceState.value.game === 'LOADING') return
	saveName(persistenceState.value.game.id, newName)
	persistenceState.value = {
		...persistenceState.value,
		game: {
			...persistenceState.value.game,
			name: newName
		}
	}
}

const canDelete = (persistenceState: Signal<PersistenceState>) => {
	return true
		&& persistenceState.value.kind === 'PERSISTED'
		&& persistenceState.value.game !== 'LOADING'
		&& !persistenceState.value.game.unprotected
}

interface EditorNavbarProps {
	persistenceState: Signal<PersistenceState>
}

export default function EditorNavbar(props: EditorNavbarProps) {
	const showNavPopup = useSignal(false)

	const showSavePrompt = useSignal(false)
	const showSharePopup = useSignal(false)

	const deleteState = useSignal<'idle' | 'confirm' | 'deleting'>('idle')
	const resetState = useSignal<'idle' | 'confirm'>('idle')
	useSignalEffect(() => {
		const _showNavPopup = showNavPopup.value
		const _deleteState = deleteState.value
		const _resetState = resetState.value
		if (!_showNavPopup && _deleteState === 'confirm') deleteState.value = 'idle'
		if (!_showNavPopup && _resetState === 'confirm') resetState.value = 'idle'
	})

	usePopupCloseClick(styles.navPopup!, () => showNavPopup.value = false, showNavPopup.value)

	let saveState
	let actionButton
	let errorBlink = false
	if (props.persistenceState.value.kind === 'IN_MEMORY') {
		saveState = 'Your work is unsaved!'

		actionButton = <Button icon={IoSaveOutline} onClick={() => showSavePrompt.value = !showSavePrompt.value}>
			Save your work
		</Button>
	} else if (props.persistenceState.value.kind === 'SHARED') {
		saveState = props.persistenceState.value.stale
			? 'Your changes are unsaved!'
			: 'No changes to save'

		actionButton = <Button icon={IoShuffle} onClick={() => {
			if (props.persistenceState.value.session?.session.full)
				persist(props.persistenceState)
			showSavePrompt.value = true
		}}>
			Remix to save edits
		</Button>
	} else if (props.persistenceState.value.kind === 'PERSISTED') {
		saveState = {
			SAVED: `Saved to ${props.persistenceState.value.session?.user.email ?? '???'}`,
			SAVING: 'Saving...',
			ERROR: 'Error saving to cloud'
		}[props.persistenceState.value.cloudSaveState]
		if (props.persistenceState.value.cloudSaveState === 'ERROR')
			errorBlink = true

		actionButton = <Button icon={IoShareOutline} onClick={() => showSharePopup.value = !showSharePopup.value}>
			Share
		</Button>
	}

	return (<>
		<nav class={styles.container}>
			<ul class={styles.editorStats}>
				<li class={`${styles.logo} ${showNavPopup.value ? styles.active : ''}`}>
					<button onClick={() => showNavPopup.value = !showNavPopup.value}>
						{/* <SprigIcon /> */}
						<img class={styles.dino} src='/SPRIGDINO.png' height={38} />
						<div class={styles.caret}><IoChevronDown /></div>
					</button>
				</li>
				<li class={styles.filename}>
					{props.persistenceState.value.kind === 'PERSISTED' && props.persistenceState.value.game !== 'LOADING' ? (<>
						<InlineInput
							placeholder='Untitled'
							value={props.persistenceState.value.game.name}
							onChange={newName => onNameEdit(props.persistenceState, newName)}
						/>
						<span class={styles.attribution}>{' '} by you</span>
					</>) : props.persistenceState.value.kind === 'SHARED' ? (<>
						{props.persistenceState.value.name}
						<span class={styles.attribution}>
							{props.persistenceState.value.authorName
								? ` by ${props.persistenceState.value.authorName}`
								: ' (shared with you)'}
						</span>
					</>) : 'Unsaved Game'}
				</li>
				<li class={`${styles.saveState} ${errorBlink ? styles.error : ''}`}>
					{saveState}
				</li>
			</ul>

			<li class={styles.actionIcon}>
				<a href='https://github.com/hackclub/sprig/' target='_blank'>
					<IoLogoGithub />
				</a>
			</li>

			<li>
				<Button onClick={toggleTheme}>
					{isDark.value ? "Light" : "Dark"}
				</Button>
			</li>

			<li>
				<Button
					accent
					icon={{
						IDLE: IoPlay,
						LOADING: VscLoading,
						ERROR: IoWarning
					}[uploadState.value]}
					spinnyIcon={uploadState.value === 'LOADING'}
					loading={uploadState.value === 'LOADING'}
					onClick={() => upload(codeMirror.value?.state.doc.toString() ?? '')}
				>
					Run on Device
				</Button>
			</li>

			<li>{actionButton}</li>
		</nav>

		{/* <LoginPrompt persistenceState={props.persistenceState} /> */}
		{showSavePrompt.value && <SavePrompt
			kind={props.persistenceState.value.session?.session.full
				? 'instant'
				: 'email'}
			persistenceState={props.persistenceState}
			onClose={() => showSavePrompt.value = false}
		/>}
		{showSharePopup.value && <SharePopup
			persistenceState={props.persistenceState}
			onClose={() => showSharePopup.value = false}
		/>}

		{showNavPopup.value && <div class={styles.navPopup}>
			<ul>
				{props.persistenceState.value.session?.session.full
					? (<>
						<li><a href='/~'>Your games</a></li>
						<li><a href='/~/new'>New game</a></li>
					</>)
					: (<>
						<li><a href='/~'>Your games (log in)</a></li>
						<li>
							<a href='javascript:void' role='button' onClick={() => {
								if (resetState.value === 'idle') {
									resetState.value = 'confirm'
								} else {
									codeMirror.value?.dispatch({
										changes: {
											from: 0,
											to: codeMirror.value.state.doc.length,
											insert: defaultExampleCode
										}
									})
									resetState.value = 'idle'
								}
							}}>
								{resetState.value === 'idle'
									? 'Reset game code'
									: 'Are you sure?'}
							</a>
						</li>
					</>)}
				<li><a href='/gallery'>Gallery</a></li>
				<li><a href='/get'>Get a Sprig</a></li>
			</ul>
			<div class={styles.divider} />
			<ul>
				<li>
					<a href='javascript:void' role='button' onClick={() => {
						const a = document.createElement('a')
						const name = props.persistenceState.value.kind === 'PERSISTED' && props.persistenceState.value.game !== 'LOADING'
							? props.persistenceState.value.game.name
							: props.persistenceState.value.kind === 'SHARED'
								? props.persistenceState.value.name
								: 'sprig-game'
						const code = codeMirror.value?.state.doc.toString() ?? ''
						const url = URL.createObjectURL(new Blob([ code ], { type: 'application/javascript' }))
						a.href = url
						a.download = `${name}.js`
						a.click()
					}}>
						Download
					</a>
				</li>
				{canDelete(props.persistenceState) ? (
					<li>
						<a href='javascript:void' role='button' onClick={async () => {
							if (deleteState.value === 'idle') {
								deleteState.value = 'confirm'
							} else if (deleteState.value === 'confirm') {
								deleteState.value = 'deleting'
								const res = await fetch(`/api/games/delete`, {
									method: 'POST',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify({
										gameId: props.persistenceState.value.kind === 'PERSISTED'
											&& props.persistenceState.value.game !== 'LOADING'
											&& props.persistenceState.value.game.id
									})
								})
								if (!res.ok) console.error(`Error deleting game: ${await res.text()}`)
								window.location.replace('/~')
							}
						}}>
							{{
								idle: 'Delete',
								confirm: 'Are you sure?',
								deleting: 'Deleting...'
							}[deleteState.value]}
						</a>
					</li>
				) : null}
			</ul>
		</div>}
	</>)
}