import styles from './editor.module.css'
import CodeMirror from '../codemirror'
import Navbar from '../navbar-editor'
import { IoPlayCircleOutline, IoVolumeHighOutline, IoVolumeMuteOutline } from 'react-icons/io5/index'
import { Signal, useSignal, useSignalEffect } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'
import { codeMirror, errorLog, formatError, muted, PersistenceState } from '../../lib/state'
import EditorModal from '../popups-etc/editor-modal'
import { runGame } from '../../lib/engine/3-editor'
import DraftWarningModal from '../popups-etc/draft-warning'
import Button from '../button'
import debounce from 'debounce'
import Help from '../popups-etc/help'

interface EditorProps {
	loggedIn: boolean
	persistenceState: Signal<PersistenceState>
	cookies: {
		outputAreaSize: number | null
	}
}

interface ResizeState {
	startMousePos: number
	startValue: number
}
const [ minWidth, maxWidth ] = [ 400, 800 ]

export default function Editor({ persistenceState, loggedIn, cookies }: EditorProps) {
	// Resize state storage
	const outputAreaSize = useSignal(cookies.outputAreaSize ?? minWidth)
	useSignalEffect(() => { document.cookie = `outputAreaSize=${outputAreaSize.value}` })
	
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
	const onClickRun = async () => {
		if (!screen.current) return
		screenShake.value++
		setTimeout(() => screenShake.value--, 200)
		
		if (cleanup.current) cleanup.current()
		errorLog.value = []

		const code = codeMirror.value?.state.doc.toString() ?? ''
		const res = runGame(code, screen.current)

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
				if (!res.ok) throw new Error('Failed to save game')
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
		if (persistenceState.value.kind === 'SHARED') {
			needsWarning = true
		} else if (persistenceState.value.kind === 'IN_MEMORY_DRAFT' && !persistenceState.value.showInitialWarning) {
			needsWarning = true
		} else if (persistenceState.value.kind === 'PERSISTED' && persistenceState.value.game !== 'LOADING') {
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

	return (
		<div class={styles.page}>
			<Navbar loggedIn={loggedIn} persistenceState={persistenceState} />
			
			<div class={styles.pageMain}>
				<div className={styles.codeContainer}>
					<CodeMirror
						class={styles.code}
						initialCode={persistenceState.value.kind === 'PERSISTED' && persistenceState.value.game !== 'LOADING'
							? persistenceState.value.game.code
							: ''}
						onEditorView={(editor) => codeMirror.value = editor}
						onCodeChange={() => {
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
							{errorLog.value.map((error) => {
								const formatted = formatError(error)
								return <div key={formatted}>{formatted}</div>
							})}
						</div>
					)}
					<Button accent icon={IoPlayCircleOutline} bigIcon iconSide='right' class={styles.playButton} onClick={onClickRun}>
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

				<div class={styles.outputArea}>
					<div class={styles.screenContainer} style={{ width: outputAreaSize.value }}>
						<canvas
							class={`${styles.screen} ${screenShake.value > 0 ? 'shake' : ''}`}
							ref={screen}
							tabIndex={0}
							width='1000'
							height='800'
						/>
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
			{persistenceState.value.kind === 'IN_MEMORY_DRAFT' && persistenceState.value.showInitialWarning && (
				<DraftWarningModal persistenceState={persistenceState} />
			)}
			
			<Help />
		</div>
	)
}