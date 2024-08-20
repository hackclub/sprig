import styles from './bitmap-editor.module.css'
import type { EditorProps } from '../../lib/state'
import type { IconType } from 'react-icons'
import { signal, useSignal, useSignalEffect } from '@preact/signals'
import { palette, type PaletteItem, rgbaToHex, transparent  } from '../../../engine/src/base'
import { transparentBgUrl } from '../../lib/utils/transparent-bg'
import { drawingTools, makeTempGrid, mirrorGrid, TempGrid, transformTools, Vector } from './bitmap-editor-tools'
import { useEffect, useRef } from 'preact/hooks'
import tinykeys from 'tinykeys'
import { IoArrowRedo, IoArrowUndo, IoImage, IoTrash } from 'react-icons/io5'
import { leftDown, modIcon, rightDown } from '../../lib/utils/events'

const makePixelGrid = (): PaletteItem[][] => new Array(16).fill(0).map(() => new Array(16).fill(transparent))
const textToPixelGrid = (text: string): PaletteItem[][] => {
	const rows = text.trim().split('\n').map(row => row.trim())
	while (rows.length < 16) rows.push('................')
	rows.forEach((_, i) => { while (rows[i]!.length < 16) rows[i] += '.' })
	return rows.map(row => [ ...row ].map(char => palette.find(([ key ]) => key === char) ?? transparent))
}
const pixelGridToText = (pixelGrid: PaletteItem[][]): string => pixelGrid.map(row => row.map(([ key ]) => key).join('')).join('\n')
const pixelGridToCanvas = (pixelGrid: PaletteItem[][]): HTMLCanvasElement => {
	const canvas = document.createElement('canvas')
	canvas.width = 16
	canvas.height = 16
	const ctx = canvas.getContext('2d')!
	for (let y = 0; y < 16; y++) {
		for (let x = 0; x < 16; x++) {
			ctx.fillStyle = rgbaToHex(pixelGrid[y]![x]![1])
			ctx.fillRect(x, y, 1, 1)
		}
	}
	return canvas
}

interface ToolButtonProps {
	onActivate?: () => void
	active?: boolean
	name: string
	shortcut?: string
	tooltipSide: 'top' | 'bottom'
	disabled?: boolean
	iconOnly?: boolean
	icon: IconType
}

function ToolButton(props: ToolButtonProps) {
	const ref = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		return props.shortcut ? tinykeys(window, {
			[props.shortcut]: (event: KeyboardEvent) => {
				event.preventDefault()
				props.onActivate?.()
				ref.current?.focus({ focusVisible: false } as any)
			}
		}) : undefined
	}, [ props.shortcut ])

	const formattedShortcut = props.shortcut
		?.replaceAll('Shift', '⇧')
		?.replaceAll('$mod', modIcon())
		?.replaceAll('+', '')

	return (
		<button
			class={`${styles.tool} ${props.active ? styles.active : ''}`}
			onClick={() => props.onActivate?.()}
			disabled={props.disabled ?? false}
			ref={ref}
		>
			<props.icon />
			<div class={`${styles.tooltip} ${styles[props.tooltipSide]}`}>
				{props.name}
				{props.shortcut ? <span class={styles.shortcut}>{' '}({formattedShortcut})</span> : ''}
			</div>
			{/* {!props.iconOnly && <div class={styles.toolName}>{props.name}</div>} */}
		</button>
	)
}

// Outside component because persisting across open/close is good
const drawingTool = signal(drawingTools[0]!)
const color = signal(palette[0]!)

// Cursed memory-leaky linked list for undo/redo history
interface Moment {
	pixelGrid: PaletteItem[][]
	previous: Moment | null
	next: Moment | null
}

interface EditState {
	tempGrid: TempGrid
	startPos: Vector
	lastPos: Vector | null
}

export default function BitmapEditor(props: EditorProps) {
	const moment = useSignal<Moment>({
		pixelGrid: textToPixelGrid(props.text.value),
		previous: null,
		next: null
	})
	const editState = useSignal<EditState | null>(null)
	const liveMirror = useSignal(false)
	const uiRightClick = useSignal(false)

	// Sync text changes with pixel grid
	useSignalEffect(() => {
		const curGrid = moment.peek().pixelGrid
		const newGrid = textToPixelGrid(props.text.value)

		if (pixelGridToText(curGrid) !== pixelGridToText(newGrid)) {
			moment.value = {
				pixelGrid: newGrid,
				previous: moment.peek(),
				next: null
			}
		}
	})
	// Sync pixel grid changes with text
	useSignalEffect(() => { props.text.value = '\n' + pixelGridToText(moment.value.pixelGrid) })

	useEffect(() => {
		const mouseup = (event: MouseEvent) => {
			uiRightClick.value = rightDown(event)
			liveMirror.value = event.altKey
			if (!editState.value || leftDown(event) || rightDown(event)) return

			if (liveMirror.value && drawingTool.value.mirrorEnabled)
				editState.value.tempGrid = mirrorGrid(editState.value.tempGrid)
			moment.value = {
				pixelGrid: moment.value.pixelGrid.map((row, y) => row.map((item, x) => {
					return editState.value!.tempGrid[y]![x]! ?? item
				})),
				previous: moment.value,
				next: null
			}
			editState.value = null
		}

    const keydown = (event: KeyboardEvent) => { liveMirror.value = event.altKey }
		const keyup = (event: KeyboardEvent) => { liveMirror.value = event.altKey }

		window.addEventListener('mouseup', mouseup)
		window.addEventListener('keydown', keydown)
		window.addEventListener('keyup', keyup)
		return () => {
			window.removeEventListener('mouseup', mouseup)
			window.removeEventListener('keydown', keydown)
			window.removeEventListener('keyup', keyup)
		}
	}, [])

	const drawingToolUpdate = (currentPos: Vector, shiftKey: boolean, rightClick: boolean): void => {
		if (!editState.value || !drawingTool.value) return
		editState.value = {
			...editState.value,
			lastPos: currentPos,
			tempGrid: drawingTool.value.update({
				...editState.value,
				lastPos: editState.value.lastPos ?? currentPos,
				currentPos,
				pixelGrid: moment.value.pixelGrid,
				shiftKey,
				color: rightClick ? transparent : color.value,
				setColor: newColor => color.value = newColor
			})
		}
	}

	return (
		<div class={styles.container}>
			<div class={styles.sidebar}>
				<div class={styles.artTools}>
					<div class={styles.toolSection}>
						<h3>Drawing Tools</h3>
						<div class={styles.toolGrid}>
							{drawingTools.map(tool => (
								<ToolButton
									{...tool}
									tooltipSide='bottom'
									active={tool === drawingTool.value}
									onActivate={() => drawingTool.value = tool}
								/>
							))}
						</div>
					</div>

					<div class={styles.toolSection}>
						<h3>Transform</h3>
						<div class={styles.toolGrid}>
							{transformTools.map(tool => (
								<ToolButton
									{...tool}
									tooltipSide='bottom'
									active={tool.key === 'mirror' && liveMirror.value}
									iconOnly
									onActivate={() => moment.value = {
										pixelGrid: tool.activate(moment.value.pixelGrid),
										previous: moment.value,
										next: null
									}}
								/>
							))}
						</div>
					</div>
				</div>

				<div class={styles.configTools}>
					<div class={styles.helpText}>
						{drawingTool.value.eraseEnabled && <p>Right click to erase</p>}
						{drawingTool.value.snapEnabled && <p>Hold <span class={styles.shortcut}>shift</span> to snap</p>}
						{drawingTool.value.mirrorEnabled && <p>Hold <span class={styles.shortcut}>alt</span> to live mirror</p>}
					</div>
				</div>
			</div>

			<div class={styles.canvasContainer}>
				<div
					class={styles.canvas}
					style={{ backgroundImage: `url("${transparentBgUrl}")` }}
					onMouseLeave={() => { if (editState.value) editState.value.lastPos = null }}
				>
					{moment.value.pixelGrid.map((row, y) => (
						<div class={styles.row}>
							{row.map((item, x) => {
								const mirroredTempGrid = editState.value && (liveMirror.value ? mirrorGrid(editState.value.tempGrid) : editState.value.tempGrid)
								if (mirroredTempGrid?.[y]![x]) item = mirroredTempGrid[y]![x]!

								return (
									<div
										key={`${x},${y}`}
										class={styles.pixel}
										onContextMenu={(event) => event.preventDefault()}
										onMouseDown={(event) => {
											event.preventDefault()
											uiRightClick.value = rightDown(event)
											liveMirror.value = event.altKey
											if (leftDown(event) || rightDown(event)) {
												if (!editState.value) {
													editState.value = {
														tempGrid: makeTempGrid(),
														startPos: { x, y },
														lastPos: { x, y }
													}
												}
												drawingToolUpdate({ x, y }, event.shiftKey, rightDown(event))
											}
										}}
										onMouseMove={(event) => {
											event.preventDefault()
											uiRightClick.value = rightDown(event)
											liveMirror.value = event.altKey
											if (!drawingTool.value.clickOnly && (leftDown(event) || rightDown(event)))
												drawingToolUpdate({ x, y }, event.shiftKey, rightDown(event))
										}}
										style={{ backgroundColor: rgbaToHex(item[1]) }}
									/>
								)
							})}
						</div>
					))}
				</div>
			</div>

			<div class={styles.sidebar}>
				<div class={styles.configTools}>
					<div class={styles.toolSection}>
						<h3>Color Picker</h3>
						<div class={styles.toolGrid}>
							{palette.map(([ key, rgba ]) => {
								const isActive = uiRightClick.value
									? key === transparent[0]
									: key === color.value[0]
								return (
									<button
										key={key}
										onClick={() => color.value = [key, rgba]}
										class={`${styles.color} ${isActive ? styles.active : ''}`}
										style={{
											backgroundColor: rgbaToHex(rgba),
											backgroundImage: rgba[3] === 0 ? `url("${transparentBgUrl}")` : undefined,
										}}
									/>
								)
							})}
						</div>
					</div>
				</div>

				<div class={styles.configTools}>
					<div class={styles.toolGrid}>
						<ToolButton
							key='undo'
							name='Undo'
							shortcut='$mod+Z'
							icon={IoArrowUndo}
							disabled={!moment.value.previous}
							onActivate={() => {
								if (!moment.value.previous) return
								console.log('cur:')
								console.log(pixelGridToText(moment.value.pixelGrid))
								console.log('prev:')
								console.log(pixelGridToText(moment.value.previous.pixelGrid))
								console.log()

								moment.value.previous.next = moment.value // We only need to populate this when traversing history
								moment.value = moment.value.previous
							}}
							tooltipSide='top'
							iconOnly
						/>
						<ToolButton
							key='redo'
							name='Redo'
							shortcut='$mod+Shift+Z'
							icon={IoArrowRedo}
							disabled={!moment.value.next}
							onActivate={() => moment.value.next && (moment.value = moment.value.next)}
							tooltipSide='top'
							iconOnly
						/>
						<ToolButton
							key='export'
							name='Export as PNG'
							icon={IoImage}
							tooltipSide='top'
							onActivate={() => {
								const link = document.createElement('a')
								link.download = 'sprite.png'
								link.href = pixelGridToCanvas(moment.value.pixelGrid).toDataURL()
								link.click()
							}}
							iconOnly
						/>
						<ToolButton
							key='clear'
							name='Clear'
							icon={IoTrash}
							onActivate={() => moment.value = {
								pixelGrid: makePixelGrid(),
								previous: moment.value,
								next: null
							}}
							tooltipSide='top'
							iconOnly
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
