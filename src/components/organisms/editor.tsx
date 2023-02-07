import styles from './editor.module.css'
import type { Game, User } from '../../lib/account'
import CodeMirror from '../atoms/codemirror'
import Navbar from '../molecules/navbar-editor'
import { IoPlayCircleOutline, IoVolumeHighOutline, IoVolumeMuteOutline } from 'react-icons/io5'
import { useSignal, useSignalEffect } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'
import { codeMirror, errorLog, formatError, muted } from '../../lib/state'
import EditorModal from '../molecules/editor-modal'
import { runGame } from '../../lib/engine/3-editor'

interface EditorProps {
	user: User
	game: Game
	cookies: {
		outputAreaSize: number | null
	}
}

interface ResizeState {
	startMousePos: number
	startValue: number
}
const [ minWidth, maxWidth ] = [ 400, 800 ]

export default function Editor(props: EditorProps) {
	// Resize state storage
	const outputAreaSize = useSignal(props.cookies.outputAreaSize ?? minWidth)
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

	return (
		<div class={styles.page}>
			<Navbar user={props.user} game={props.game} />
			
			<div class={styles.pageMain}>
				<div className={styles.codeContainer}>
					<CodeMirror
						class={styles.code}
						initialCode={props.game.code}
						onEditorView={(editor) => codeMirror.value = editor}
					/>
					{errorLog.value.length > 0 && (
						<div class={styles.errors}>
							{errorLog.value.map((error) => {
								const formatted = formatError(error)
								return <div key={formatted}>{formatted}</div>
							})}
						</div>
					)}
					<button class={`btn btn-accent ${styles.playButton}`} onClick={onClickRun}>
						Run
						<IoPlayCircleOutline />
					</button>
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
		</div>
	)
}