import styles from './map-editor.module.css'
import { bitmaps, EditorProps } from '../../lib/state'
import BitmapPreview from '../design-system/bitmap-preview'
import { Signal, useSignal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'
import { transparentBgUrl } from '../../lib/utils/transparent-bg'
import { leftDown, rightDown } from '../../lib/utils/events'

const textToGrid = (text: string): string[][] => text.trim().split('\n').map(line => [ ...line.trim() ])
const gridToText = (grid: string[][]): string => '\n' + grid.map(row => row.join('')).join('\n')

interface ResizeControlsProps {
	text: Signal<string>
	dw: -1 | 0 | 1
	dh: -1 | 0 | 1
}

function ResizeControls(props: ResizeControlsProps) {
	const grid = textToGrid(props.text.value)
    return (
		<div class={styles.resizeControls}>
			<button
				onClick={() => {
					if (props.dw) grid.forEach(row => row[props.dw > 0 ? 'push' : 'unshift']('.')) // Add a column
					if (props.dh) grid[props.dh > 0 ? 'push' : 'unshift'](new Array(grid[0]!.length).fill('.')) // Add a row
					props.text.value = gridToText(grid)
				}}
			>
				+
			</button>

			<button
				onClick={() => {
					if (props.dw) grid.forEach(row => row.splice(props.dw > 0 ? row.length - 1 : 0, 1)) // Remove a column
					if (props.dh) grid.splice(props.dh > 0 ? grid.length - 1 : 0, 1) // Remove a row
					props.text.value = gridToText(grid)
				}}
				disabled={!!(props.dw && grid[0]!.length <= 1) || !!(props.dh && grid.length <= 1)}
			>
				-
			</button>
		</div>
    )
}

export default function MapEditor(props: EditorProps) {
	const active = useSignal(bitmaps.value[0]?.[0] ?? '.')
	const drawing = useSignal(false)
	const erasing = useSignal(false)
	
	const gridContainer = useRef<HTMLDivElement>(null)
	const gridContainerSize = useSignal<{ width: number, height: number }>({ width: 1, height: 1 })
	useEffect(() => {
		const observer = new ResizeObserver(() => {
			if (!gridContainer.current) return
			gridContainerSize.value = gridContainer.current.getBoundingClientRect()
		})
		observer.observe(gridContainer.current!)
		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		const mouseup = (event: MouseEvent) => {
			if (!leftDown(event) && !rightDown(event)) drawing.value = false
			erasing.value = rightDown(event)
		}
		window.addEventListener('mouseup', mouseup)
		return () => window.removeEventListener('mouseup', mouseup)
	})

	const grid = textToGrid(props.text.value)
	const placeSprite = (x: number, y: number) => {
		grid[y]![x] = erasing.value ? '.' : active.value
		props.text.value = gridToText(grid)
	}

	return (
		<div class={styles.container}>
			<div class={styles.sidebar}>
				<div class={styles.spriteButtons}>
					{bitmaps.value.map(([ key, text ]) => (
						<button
							key={key}
							class={`${styles.spriteButton} ${active.value === key && !erasing.value ? styles.active : ''}`}
							style={{ backgroundImage: `url("${transparentBgUrl}")` }}
							onClick={() => active.value = key}
						>
							<BitmapPreview text={text} />
						</button>
					))}
					<button
						class={`${styles.spriteButton} ${active.value === '.' || erasing.value ? styles.active : ''}`}
						style={{ backgroundImage: `url("${transparentBgUrl}")` }}
						onClick={() => active.value = '.'}
					/>
				</div>

				<div class={styles.helpText}>
					<p>Dimensions: {grid[0]?.length ?? 0}&times;{grid.length}</p>
					<p>Drag right click to erase.</p>
				</div>
			</div>

			<div class={styles.resizeX}>
				<ResizeControls text={props.text} dw={-1} dh={0} />
				
				<div class={styles.resizeY}>
					<ResizeControls text={props.text} dw={0} dh={-1} />

					<div
						ref={gridContainer}
						class={styles.gridContainer}
						style={{
							'--cell-size': Math.min(
								gridContainerSize.value.width / grid[0]!.length,
								gridContainerSize.value.height / grid.length
							) + 'px'
						}}
					>
						<div class={styles.grid} style={{ backgroundImage: `url("${transparentBgUrl}")` }}>
							{grid.map((row, y) => (
								<div key={y} class={styles.row}>
									{row.map((cell, x) => {
										const bitmap = bitmaps.value.find(([key]) => key === cell)
										const isError = !bitmap && cell !== '.'
										return (
											<div
												key={x}
												class={`${styles.cell} ${isError ? styles.error : ''}`}
												onContextMenu={(event) => event.preventDefault()}
												onMouseDown={(event) => {
													event.preventDefault()
													erasing.value = rightDown(event)
													if (leftDown(event) || rightDown(event)) {
														drawing.value = true
														placeSprite(x, y)
													}
												}}
												onMouseMove={(event) => {
													event.preventDefault()
													erasing.value = rightDown(event)
													if (drawing.value) {
														if (leftDown(event) || rightDown(event)) {
															placeSprite(x, y)
														} else {
															drawing.value = false
														}
													}
												}}
											>
												{bitmap && <BitmapPreview text={bitmap[1]} />}
											</div>
										)
									})}
								</div>
							))}
						</div>
					</div>

					<ResizeControls text={props.text} dw={0} dh={1} />
				</div>

				<ResizeControls text={props.text} dw={1} dh={0} />
			</div>
		</div>
	)
}