import styles from './editor.module.css'
import CodeMirror from '../codemirror'
import Navbar from '../navbar-editor'
import { IoClose, IoPlayCircleOutline, IoVolumeHighOutline, IoVolumeMuteOutline } from 'react-icons/io5'
import { Signal, useComputed, useSignal, useSignalEffect } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'
import { codeMirror, errorLog, muted, PersistenceState } from '../../lib/state'
import EditorModal from '../popups-etc/editor-modal'
import { runGame } from '../../lib/engine'
import DraftWarningModal from '../popups-etc/draft-warning'
import Button from '../design-system/button'
import { debounce } from 'throttle-debounce'
import Help from '../popups-etc/help'
import { collapseRanges } from '../../lib/codemirror/util'
import { defaultExampleCode } from '../../lib/examples'
import MigrateToast from '../popups-etc/migrate-toast'
import { highlightError, clearErrorHighlight } from '../../lib/engine/error'
import { nanoid } from 'nanoid'
import TutorialWarningModal from '../popups-etc/tutorial-warning'

interface EditorProps {
	persistenceState: Signal<PersistenceState>
	cookies: {
		outputAreaSize: number | null
		hideHelp: boolean
	}
}

interface ResizeState {
	startMousePos: number
	startValue: number
}

const minOutputAreaSize = 360
const defaultOutputAreaSize = 400
const heightMargin = 130

const foldAllTemplateLiterals = () => {
	if (!codeMirror.value) return
	const code = codeMirror.value.state.doc.toString() ?? ''
	const matches = [ ...code.matchAll(/(map|bitmap|tune)`[\s\S]*?`/g) ];
	collapseRanges(codeMirror.value, matches.map((match) => [ match.index!, match.index! + 1 ]))
}

let lastSavePromise = Promise.resolve()
let saveQueueSize = 0
const saveGame = debounce(800, (persistenceState: Signal<PersistenceState>, code: string) => {
	const doSave = async () => {
		let isError = false
		try {
			const game = (persistenceState.value.kind === 'PERSISTED' && persistenceState.value.game !== 'LOADING') ? persistenceState.value.game : null
			const res = await fetch('/api/games/save', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ code, gameId: game?.id, tutorialName: game?.tutorialName })
			})
			if (!res.ok) throw new Error(`Error saving game: ${await res.text()}`)
		} catch (error) {
			console.error(error)
			isError = true
		}

		saveQueueSize--
		if (saveQueueSize === 0 && persistenceState.value.kind === 'PERSISTED')
			persistenceState.value = {
				...persistenceState.value,
				cloudSaveState: isError ? 'ERROR' : 'SAVED'
			}
	}

	saveQueueSize++
	lastSavePromise = (lastSavePromise ?? Promise.resolve()).then(doSave)
})

const exitTutorial = (persistenceState: Signal<PersistenceState>) => {
	if (persistenceState.value.kind === 'PERSISTED') {
		delete persistenceState.value.tutorial
		if (typeof persistenceState.value.game !== 'string') {
			delete persistenceState.value.game.tutorialName
		}
		persistenceState.value = {
			...persistenceState.value,
			stale: true
		}
		if (persistenceState.value.kind === 'PERSISTED') {
			persistenceState.value = {
				...persistenceState.value,
				cloudSaveState: 'SAVING'
			}
			saveGame(persistenceState, codeMirror.value!.state.doc.toString())
		}
	}
}

export default function Editor({ persistenceState, cookies }: EditorProps) {
	// Resize state storage
	const outputAreaSize = useSignal(Math.max(minOutputAreaSize, cookies.outputAreaSize ?? defaultOutputAreaSize))
	useSignalEffect(() => {
		document.cookie = `outputAreaSize=${outputAreaSize.value};path=/;max-age=${60 * 60 * 24 * 365}`
	})

	// Exit tutorial warning modal
	const showingTutorialWarning = useSignal(false)

	// Max height
	const maxOutputAreaSize = useSignal(outputAreaSize.value)
	useEffect(() => {
		const updateMaxSize = () => { maxOutputAreaSize.value = (window.innerHeight - heightMargin) * 5 / 4 }
		window.addEventListener('resize', updateMaxSize, { passive: true })
		updateMaxSize()
		return () => window.removeEventListener('resize', updateMaxSize)
	}, [])
	const realOutputAreaSize = useComputed(() => Math.min(maxOutputAreaSize.value, Math.max(minOutputAreaSize, outputAreaSize.value)))

	// Resize bar logic
	const resizeState = useSignal<ResizeState | null>(null)
	useEffect(() => {
		const onMouseMove = (event: MouseEvent) => {
			if (!resizeState.value) return
			event.preventDefault()
			outputAreaSize.value = resizeState.value.startValue + resizeState.value.startMousePos - event.clientX
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
		const res = runGame(code, screen.current, (error) => {
			errorLog.value = [ ...errorLog.value, error ]
			if (error.line) {
				highlightError(error.line);
			}
		})

		screen.current.focus()
		screenShake.value++
		setTimeout(() => screenShake.value--, 200)

		cleanup.current = res.cleanup
		if (res.error) {
			console.error(res.error.raw)
			errorLog.value = [ ...errorLog.value, res.error ]

			if (res.error.line) {
				highlightError(res.error.line);
			}
		} else {
			clearErrorHighlight();
		}
	}
	useEffect(() => () => cleanup.current?.(), [])

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

	let initialCode = ''
	if (persistenceState.value.kind === 'PERSISTED' && persistenceState.value.game !== 'LOADING')
		initialCode = persistenceState.value.game.code
	else if (persistenceState.value.kind === 'SHARED')
		initialCode = persistenceState.value.code
	else if (persistenceState.value.kind === 'IN_MEMORY')
		initialCode = localStorage.getItem('sprigMemory') ?? defaultExampleCode
	
	// Firefox has weird tab restoring logic. When you, for example, Ctrl-Shift-T, it opens
	// a kinda broken cached version of the page. And for some reason this reverts the CM
	// state. Seems like manipulating Preact state is unpredictable, but sessionStorage is
	// saved, so we use a random token to detect if the page is being restored and force a
	// reload.
	//
	// See https://github.com/hackclub/sprig/issues/919 for a bug report this fixes.
	useEffect(() => {
		const pageId = nanoid()
		window.addEventListener('unload', () => {
			sessionStorage.setItem(pageId, pageId)
		})
		window.addEventListener('load', () => {
			if (sessionStorage.getItem(pageId)) {
				sessionStorage.removeItem('pageId')
				window.location.reload()
			}
		})
	}, [ initialCode ])

	return (
		<div class={styles.page}>
			<Navbar persistenceState={persistenceState} />

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
								saveGame(persistenceState, codeMirror.value!.state.doc.toString())
							}

							if (persistenceState.value.kind === 'IN_MEMORY') {
								localStorage.setItem('sprigMemory', codeMirror.value!.state.doc.toString())
							}
						}}
					/>
					{errorLog.value.length > 0 && (
						<div class={styles.errors}>
							<button class={styles.errorClose} onClick={() => errorLog.value = []}>
								<IoClose />
							</button>

							{errorLog.value.map((error, i) => (
								<div key={`${i}-${error.description}`}>{error.description}</div>
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
						resizeState.value = { startMousePos: event.clientX, startValue: realOutputAreaSize.value }
						window.addEventListener('mouseup', () => {
							resizeState.value = null
							document.documentElement.style.cursor = ''
						}, { once: true })
					}}
				/>

				<div class={styles.outputArea} style={{ width: realOutputAreaSize.value }}>
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

			{!((persistenceState.value.kind === 'SHARED' || persistenceState.value.kind === 'PERSISTED') && persistenceState.value.tutorial) && (
				<Help initialVisible={!cookies.hideHelp} />
			)}

			{(persistenceState.value.kind === 'SHARED' || persistenceState.value.kind === 'PERSISTED') && persistenceState.value.tutorial && (
				<Help tutorialContent={persistenceState.value.tutorial} persistenceState={persistenceState} showingTutorialWarning={showingTutorialWarning}/>
			)}

			{showingTutorialWarning.value && (
				<TutorialWarningModal exitTutorial={() => exitTutorial(persistenceState)} showingTutorialWarning={showingTutorialWarning} />
			)}
			<MigrateToast persistenceState={persistenceState} />
		</div>
	)
}