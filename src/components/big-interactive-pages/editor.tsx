import styles from './editor.module.css'
import CodeMirror from '../codemirror'
import Navbar from '../navbar-editor'
import { IoPlayCircleOutline, IoVolumeHighOutline, IoVolumeMuteOutline } from 'react-icons/io5'
import { Signal, useSignal, useSignalEffect } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'
import { codeMirror, errorLog, muted, PersistenceState } from '../../lib/state'
import EditorModal from '../popups-etc/editor-modal'
import { runGame } from '../../lib/engine/3-editor'
import DraftWarningModal from '../popups-etc/draft-warning'
import Button from '../design-system/button'
import debounce from 'debounce'
import Help from '../popups-etc/help'
import { collapseRanges } from '../../lib/codemirror/util'
import { defaultExampleCode } from '../../lib/examples'
import { getPuzzleLabFromLocalStorage } from '../../lib/legacy-migration'

interface EditorProps {
	loggedIn: 'full' | 'partial' | 'none'
	persistenceState: Signal<PersistenceState>
	cookies: {
		outputAreaSize: number | null
	}
}

interface ResizeState {
	startMousePos: number
	startValue: number
}
const [ minWidth, maxWidth ] = [ 400, 2000 ]
const defaultWidth = 400

const foldAllTemplateLiterals = () => {
	if (!codeMirror.value) return
	const code = codeMirror.value.state.doc.toString() ?? ''
	const matches = [ ...code.matchAll(/(map|bitmap|tune)`[\s\S]*?`/g) ];
	collapseRanges(codeMirror.value, matches.map((match) => [ match.index!, match.index! + 1 ]))
}

export default function Editor({ persistenceState, loggedIn, cookies }: EditorProps) {
	// Resize state storage
	const outputAreaSize = useSignal(cookies.outputAreaSize ?? defaultWidth)
	useSignalEffect(() => {
		document.cookie = `outputAreaSize=${outputAreaSize.value};path=/;max-age=${60 * 60 * 24 * 365}`

		// Limit height of output area
		const height = Math.min(outputAreaSize.value * 4 / 5, window.innerHeight * 0.8)
		outputAreaSize.value = height * 5 / 4
	})
	
	// Resize bar logic
	const resizeState = useSignal<ResizeState | null>(null)
	useEffect(() => {
		const onMouseMove = (event: MouseEvent) => {
			if (!resizeState.value) return
			event.preventDefault()
			outputAreaSize.value = Math.min(maxWidth, Math.max(minWidth, resizeState.value.startValue + resizeState.value.startMousePos - event.clientX))
		}
		window.addEventListener('mousemove', onMouseMove)
		return () => window.removeEventListener('mousemove', onMouseMove)
	}, [])

	// We like running games!
	const screen = useRef<HTMLCanvasElement>(null)
	const cleanup = useRef<(() => void) | null>(null)
	const screenShake = useSignal(0)
	const onRun = async () => {
		foldAllTemplateLiterals()
		if (!screen.current) return
		
		if (cleanup.current) cleanup.current()
		errorLog.value = []

		const code = codeMirror.value?.state.doc.toString() ?? ''
		const res = runGame(code, screen.current)
		
		screen.current.focus()
		screenShake.value++
		setTimeout(() => screenShake.value--, 200)

		cleanup.current = res.cleanup
		if (res.error) {
			console.error(res.error.raw)
			errorLog.value = [ ...errorLog.value, res.error ]
		}
	}

	// Losing work is bad, let's save the user's code
	const saveQueue = useRef<Promise<void>[]>([])
	const saveGame = debounce((code: string) => {
		const promise = (async () => {
			try {
				const game = (persistenceState.value.kind === 'PERSISTED' && persistenceState.value.game !== 'LOADING') ? persistenceState.value.game : null
				const res = await fetch('/api/save', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ code, gameId: game?.id })
				})
				if (!res.ok) throw new Error(`Error saving game: ${await res.text()}`)
			} catch (error) {
				console.error(error)
				if (persistenceState.value.kind === 'PERSISTED')
					persistenceState.value = {
						...persistenceState.value,
						cloudSaveState: 'ERROR'
					}
			}
		})()
		saveQueue.current.push(promise)
		promise.then(() => {
			saveQueue.current = saveQueue.current.filter((q) => q !== promise)
			if (saveQueue.current.length === 0 && persistenceState.value.kind === 'PERSISTED')
				persistenceState.value = {
					...persistenceState.value,
					cloudSaveState: 'SAVED'
				}
		})
	}, 1000)

	// Warn before leave
	useSignalEffect(() => {
		let needsWarning = false
		if ([ 'SHARED', 'IN_MEMORY' ].includes(persistenceState.value.kind)) {
			needsWarning = persistenceState.value.stale
		} else if (persistenceState.value.kind === 'PERSISTED' && persistenceState.value.stale && persistenceState.value.game !== 'LOADING') {
			needsWarning = persistenceState.value.cloudSaveState !== 'SAVED'
		}

		if (needsWarning) {
			const onBeforeUnload = (event: BeforeUnloadEvent) => {
				event.preventDefault()
				event.returnValue = ''
				return ''
			}
			window.addEventListener('beforeunload', onBeforeUnload)
			return () => window.removeEventListener('beforeunload', onBeforeUnload)
		} else {
			return () => {}
		}
	})

	// Disable native save shortcut
	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			if (event.key === 's' && (event.metaKey || event.ctrlKey)) event.preventDefault()
		}
		window.addEventListener('keydown', handler)
		return () => window.removeEventListener('keydown', handler)
	}, [])

	// Migration
	useEffect(() => {
		let cancel = false
		getPuzzleLabFromLocalStorage().then(() => {
			if (cancel) return
			if (localStorage.getItem('seenMigration') !== 'true') {
				localStorage.setItem('seenMigration', 'true')
				window.location.href = '/migrate'
			}
		})
		return () => { cancel = true }
	}, [])

	let initialCode = ''
	if (persistenceState.value.kind === 'PERSISTED' && persistenceState.value.game !== 'LOADING')
		initialCode = persistenceState.value.game.code
	else if (persistenceState.value.kind === 'SHARED')
		initialCode = persistenceState.value.code
	else if (persistenceState.value.kind === 'IN_MEMORY')
		initialCode = defaultExampleCode

	return (
		<div class={styles.page}>
			<Navbar loggedIn={loggedIn} persistenceState={persistenceState} />
			
			<div class={styles.pageMain}>
				<div className={styles.codeContainer}>
					<CodeMirror
						class={styles.code}
						initialCode={initialCode}
						onEditorView={(editor) => {
							codeMirror.value = editor
							setTimeout(() => foldAllTemplateLiterals(), 100) // Fold after the document is parsed (gross)
						}}
						onRunShortcut={onRun}
						onCodeChange={() => {
							persistenceState.value = {
								...persistenceState.value,
								stale: true
							}
							if (persistenceState.value.kind === 'PERSISTED') {
								persistenceState.value = {
									...persistenceState.value,
									cloudSaveState: 'SAVING'
								}
								saveGame(codeMirror.value!.state.doc.toString())
							}
						}}
					/>
					{errorLog.value.length > 0 && (
						<div class={styles.errors}>
							{errorLog.value.map((error) => (
								<div key={error.description}>{error.description}</div>
							))}
						</div>
					)}
					<Button accent icon={IoPlayCircleOutline} bigIcon iconSide='right' class={styles.playButton} onClick={onRun}>
						Run
					</Button>
				</div>

				<div
					class={`${styles.resizeBar} ${resizeState.value ? styles.resizing : ''}`}
					onMouseDown={(event) => {
						document.documentElement.style.cursor = 'col-resize'
						resizeState.value = { startMousePos: event.clientX, startValue: outputAreaSize.value }
						window.addEventListener('mouseup', () => {
							resizeState.value = null
							document.documentElement.style.cursor = ''
						}, { once: true })
					}}
				/>

				<div class={styles.outputArea} style={{ width: outputAreaSize.value }}>
					<div class={styles.screenContainer}>
						<div class={styles.canvasWrapper}>
							<canvas
								class={`${styles.screen} ${screenShake.value > 0 ? 'shake' : ''}`}
								ref={screen}
								tabIndex={0}
								width='1000'
								height='800'
							/>
						</div>
						<div class={styles.screenControls}>
							<button className={styles.mute} onClick={() => muted.value = !muted.value}>
								{muted.value
									? <><IoVolumeMuteOutline /> <span>Unmute</span></>
									: <><IoVolumeHighOutline /> <span>Mute</span></>}
							</button>
							<div class={styles.screenSize}>(Actual Sprig screen is 1/8" / 160&times;128 px)</div>
						</div>
					</div>
				</div>
			</div>

			<EditorModal />
			{persistenceState.value.kind === 'IN_MEMORY' && persistenceState.value.showInitialWarning && (
				<DraftWarningModal persistenceState={persistenceState} />
			)}
			
			<Help />
		</div>
	)
}