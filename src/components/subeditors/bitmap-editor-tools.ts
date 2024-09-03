import { IoArrowForward, IoBrush, IoColorFill, IoColorWand, IoEllipse, IoEyedrop, IoMove, IoReload, IoSquare, IoSwapHorizontal, IoSwapVertical, IoSync } from 'react-icons/io5'
import { type PaletteItem, transparent } from '../../../engine/src/base'

export type TempGrid = (PaletteItem | null)[][]
export type Vector = { x: number, y: number }
export const makeTempGrid = (): TempGrid => new Array(16).fill(0).map(() => new Array(16).fill(null))
export const cloneGrid = <T>(grid: T[][]): T[][] => grid.map(row => row.slice())
export const gridClamp = (v: Vector): Vector => ({
	x: Math.max(0, Math.min(15, v.x)),
	y: Math.max(0, Math.min(15, v.y))
})

export interface EditContext {
	tempGrid: TempGrid
	pixelGrid: PaletteItem[][]
	currentPos: Vector
	lastPos: Vector
	startPos: Vector
	shiftKey: boolean
	color: PaletteItem
	setColor: (color: PaletteItem) => void
}

export const mirrorGrid = <T extends (PaletteItem | null)>(grid: T[][]): T[][] => {
	const newGrid: T[][] = cloneGrid(grid)
	for (let y = 0; y < 16; y++) {
		for (let x = 0; x < 8; x++) {
			if (grid[y]![16 - x - 1] && grid[y]![16 - x - 1]![0] !== '.')
				newGrid[y]![x] = grid[y]![16 - x - 1]!
			if (grid[y]![x] && grid[y]![x]![0] !== '.')
				newGrid[y]![16 - x - 1] = grid[y]![x]!
		}
	}
	return newGrid
}

const lineMut = (grid: TempGrid, color: PaletteItem, from: Vector, to: Vector) => {
	// Bresenham's line algorithm go brrr
	const dx = Math.abs(to.x - from.x)
	const dy = Math.abs(to.y - from.y)
	const sx = from.x < to.x ? 1 : -1
	const sy = from.y < to.y ? 1 : -1

	let err = dx - dy
	let [ _fromX, _fromY ] = [ from.x, from.y ]

	while (true) {
		grid[_fromY]![_fromX] = color
		if (_fromX === to.x && _fromY === to.y) break
		const e2 = 2 * err
		if (e2 > -dy) { err -= dy; _fromX += sx }
		if (e2 < dx) { err += dx; _fromY += sy }
	}
}

const snapDestToSquare = (src: Vector, dest: Vector): Vector => {
	const dx = dest.x - src.x
	const dy = dest.y - src.y
	const length = Math.max(Math.abs(dx), Math.abs(dy))
	return {
		x: src.x + Math.sign(dx) * length,
		y: src.y + Math.sign(dy) * length
	}
}

const snapDestTo45deg = (src: Vector, dest: Vector): Vector => {
	const dx = dest.x - src.x
	const dy = dest.y - src.y
	const rawAngle = Math.atan2(dy, dx)
	const rawLength = Math.sqrt(dx * dx + dy * dy)
	const snappedAngle = Math.round(rawAngle / (Math.PI / 4)) * (Math.PI / 4)
	return gridClamp({
		x: src.x + Math.round(Math.cos(snappedAngle) * rawLength),
		y: src.y + Math.round(Math.sin(snappedAngle) * rawLength)
	})
}

export const drawingTools = [
	{
		key: 'brush',
		name: 'Brush',
		shortcut: 'P',
		icon: IoBrush,
		clickOnly: false,
		snapEnabled: false,
		mirrorEnabled: true,
		eraseEnabled: true,
		update(ctx: EditContext): TempGrid {
			const grid = cloneGrid(ctx.tempGrid)
			lineMut(grid, ctx.color, ctx.lastPos, ctx.currentPos)
			return grid
		}
	},
	{
		key: 'line',
		name: 'Line',
		shortcut: 'L',
		icon: IoArrowForward,
		clickOnly: false,
		snapEnabled: true,
		mirrorEnabled: true,
		eraseEnabled: true,
		update(ctx: EditContext): TempGrid {
			const dest = ctx.shiftKey ? snapDestTo45deg(ctx.startPos, ctx.currentPos) : ctx.currentPos
			const grid = makeTempGrid()
			lineMut(grid, ctx.color, ctx.startPos, dest)
			return grid
		}
	},
	{
		key: 'box',
		name: 'Box',
		shortcut: 'R',
		icon: IoSquare,
		clickOnly: false,
		snapEnabled: true,
		mirrorEnabled: true,
		eraseEnabled: true,
		update(ctx: EditContext): TempGrid {
			const grid = makeTempGrid()
			const src = ctx.startPos
			const dest: Vector = ctx.shiftKey
				? gridClamp(snapDestToSquare(ctx.startPos, ctx.currentPos))
				: ctx.currentPos
			for (let x = Math.min(src.x, dest.x); x <= Math.max(src.x, dest.x); x++) {
				for (let y = Math.min(src.y, dest.y); y <= Math.max(src.y, dest.y); y++) {
					grid[y]![x] = ctx.color
				}
			}
			return grid
		}
	},
	{
		key: 'ellipse',
		name: 'Ellipse',
		shortcut: 'E',
		icon: IoEllipse,
		clickOnly: false,
		snapEnabled: true,
		mirrorEnabled: true,
		eraseEnabled: true,
		update(ctx: EditContext): TempGrid {
			const grid = makeTempGrid()
			const src = ctx.startPos
			const dest = ctx.shiftKey
				? snapDestToSquare(ctx.startPos, ctx.currentPos)
				: ctx.currentPos

			const min = { x: Math.min(src.x, dest.x) - 1, y: Math.min(src.y, dest.y) - 1 }
			const max = { x: Math.max(src.x, dest.x) + 1, y: Math.max(src.y, dest.y) + 1 }
			const [ cx, cy ] = [ (min.x + max.x) / 2, (min.y + max.y) / 2 ]
			const [ rx, ry ] = [ (max.x - min.x) / 2, (max.y - min.y) / 2 ]
			for (let x = gridClamp(min).x; x <= gridClamp(max).x; x++) {
				for (let y = gridClamp(min).y; y <= gridClamp(max).y; y++) {
					const [ dx, dy ] = [ (x - cx) / rx, (y - cy) / ry ]
					if (dx * dx + dy * dy < 1) grid[y]![x] = ctx.color
				}
			}

			return grid
		}
	},
	{
		key: 'bucket',
		name: 'Paint Bucket',
		shortcut: 'F',
		icon: IoColorFill,
		clickOnly: true,
		snapEnabled: false,
		mirrorEnabled: false,
		eraseEnabled: true,
		update(ctx: EditContext): TempGrid {
			const grid = makeTempGrid()
			const currentPixel = ctx.pixelGrid[ctx.currentPos.y]![ctx.currentPos.x]!
			const queue = [ ctx.currentPos ]
			while (queue.length > 0) {
				const pos = queue.pop()!
				if (grid[pos.y]![pos.x] === null && ctx.pixelGrid[pos.y]![pos.x]![0] === currentPixel[0]) {
					grid[pos.y]![pos.x] = ctx.color
					queue.push(gridClamp({ x: pos.x - 1, y: pos.y }))
					queue.push(gridClamp({ x: pos.x + 1, y: pos.y }))
					queue.push(gridClamp({ x: pos.x, y: pos.y - 1 }))
					queue.push(gridClamp({ x: pos.x, y: pos.y + 1 }))
				}
			}
			return grid
		}
	},
	{
		key: 'color-bucket',
		name: 'Color Swap Bucket',
		icon: IoColorWand,
		clickOnly: true,
		snapEnabled: false,
		mirrorEnabled: false,
		eraseEnabled: true,
		update(ctx: EditContext): TempGrid {
			const currentPixel = ctx.pixelGrid[ctx.currentPos.y]![ctx.currentPos.x]!
			return ctx.pixelGrid.map(row => row.map(pixel => pixel[0] === currentPixel[0] ? ctx.color : null))
		}
	},
	{
		key: 'move',
		name: 'Move',
		shortcut: 'M',
		icon: IoMove,
		clickOnly: false,
		snapEnabled: true,
		mirrorEnabled: false,
		eraseEnabled: false,
		update(ctx: EditContext): TempGrid {
			const dest = ctx.shiftKey ? snapDestTo45deg(ctx.startPos, ctx.currentPos) : ctx.currentPos
			const [ dx, dy ] = [ dest.x - ctx.startPos.x, dest.y - ctx.startPos.y ]
			const grid = makeTempGrid()
			for (let y = 0; y < 16; y++) {
				for (let x = 0; x < 16; x++) {
					const pixelSrc = { x: x - dx, y: y - dy }
					grid[y]![x] = (ctx.pixelGrid[pixelSrc.y] ?? [])[pixelSrc.x] ?? transparent
				}
			}
			return grid
		}
	},
	{
		key: 'eyedropper',
		name: 'Color Picker',
		shortcut: 'I',
		icon: IoEyedrop,
		clickOnly: true,
		snapEnabled: false,
		mirrorEnabled: false,
		eraseEnabled: false,
		update(ctx: EditContext): TempGrid {
			ctx.setColor(ctx.pixelGrid[ctx.currentPos.y]![ctx.currentPos.x]!)
			return makeTempGrid()
		}
	}
]

export const transformTools = [
	{
		key: 'rotate-clockwise',
		name: 'Rotate',
		shortcut: 'Shift+R',
		icon: IoReload,
		activate(pixelGrid: PaletteItem[][]): PaletteItem[][] {
			const newGrid = cloneGrid(pixelGrid)
			for (let y = 0; y < 16; y++) {
				for (let x = 0; x < 16; x++) {
					newGrid[x]![y] = pixelGrid[16 - y - 1]![x]!
				}
			}
			return newGrid
		}
	},
	{
		key: 'mirror',
		name: 'Mirror',
		shortcut: 'Shift+M',
		icon: IoSync,
		activate: mirrorGrid
	},
	{
		key: 'flip-horizontal',
		name: 'Horizontal Flip',
		shortcut: 'Shift+H',
		icon: IoSwapHorizontal,
		activate(pixelGrid: PaletteItem[][]): PaletteItem[][] {
			const newGrid = cloneGrid(pixelGrid)
			for (let y = 0; y < 16; y++) {
				for (let x = 0; x < 16; x++) {
					newGrid[y]![x] = pixelGrid[y]![16 - x - 1]!
				}
			}
			return newGrid
		}
	},
	{
		key: 'flip-vertical',
		name: 'Vertical Flip',
		shortcut: 'Shift+V',
		icon: IoSwapVertical,
		activate(pixelGrid: PaletteItem[][]): PaletteItem[][] {
			const newGrid = cloneGrid(pixelGrid)
			for (let y = 0; y < 16; y++) {
				for (let x = 0; x < 16; x++) {
					newGrid[y]![x] = pixelGrid[16 - y - 1]![x]!
				}
			}
			return newGrid
		}
	}
]
