import type { AddTextOptions, FullSprigAPI, GameState, SpriteType } from '../api.js'
import { palette } from './palette.js'
import { composeText } from './text.js'

export * from './font.js'
export * from './palette.js'
export * from './text.js'
export * from './tune.js'

// Tagged template literal factory go brrr
const _makeTag = <T>(cb: (string: string) => T) => {
	return (strings: TemplateStringsArray, ...interps: string[]) => {
		if (typeof strings === 'string') {
			throw new Error('Tagged template literal must be used like name`text`, instead of name(`text`)')
		}
		const string = strings.reduce((p, c, i) => p + c + (interps[i] ?? ''), '')
		return cb(string)
	}
}

export type BaseEngineAPI = Pick<
	FullSprigAPI,
	| 'setMap'
	| 'addText'
	| 'clearText'
	| 'addSprite'
	| 'getGrid'
	| 'getTile'
	| 'tilesWith'
	| 'clearTile'
	| 'setSolids'
	| 'setPushables'
	| 'setBackground'
	| 'map'
	| 'bitmap'
	| 'color'
	| 'tune'
	| 'getFirst'
	| 'getAll'
	| 'width'
	| 'height'
>
export function baseEngine(): { api: BaseEngineAPI, state: GameState } {
	const gameState: GameState = {
		legend: [],
		texts: [],
		dimensions: {
			width: 0,
			height: 0,
		},
		sprites: [],
		solids: [],
		pushable: {},
		background: null
	}

	class Sprite implements SpriteType {
		_type: string
		_x: number
		_y: number
		dx: number
		dy: number

		constructor(type: string, x: number, y: number) {
			this._type = type
			this._x = x
			this._y = y
			this.dx = 0
			this.dy = 0
		}

		set type(newType) {
			const legendDict = Object.fromEntries(gameState.legend)
			if (!(newType in legendDict)) throw new Error(`"${newType}" isn\'t in the legend.`)
			this.remove()
			addSprite(this._x, this._y, newType)
		}

		get type() {
			return this._type
		}

		set x(newX) {
			const dx = newX - this.x
			if (_canMoveToPush(this, dx, 0)) this.dx = dx
		}

		get x() {
			return this._x
		}

		set y(newY) {
			const dy = newY - this.y
			if (_canMoveToPush(this, 0, dy)) this.dy = dy
		}

		get y() {
			return this._y
		}

		remove() {
			gameState.sprites = gameState.sprites.filter(s => s !== this)
			return this
		}
	}

	const _canMoveToPush = (sprite: Sprite, dx: number, dy: number): boolean => {
		const { x, y, type } = sprite
		const { width, height } = gameState.dimensions
		const i = (x+dx)+(y+dy)*width

		const inBounds = (x+dx < width && x+dx >= 0 && y+dy < height && y+dy >= 0)
		if (!inBounds) return false

		const grid = getGrid()

		const notSolid = !gameState.solids.includes(type)
		const noMovement = dx === 0 && dy === 0
		const movingToEmpty = i < grid.length && grid[i]!.length === 0

		if (notSolid || noMovement || movingToEmpty) {
			sprite._x += dx
			sprite._y += dy
			return true
		}

		let canMove = true

		const { pushable }  = gameState

		grid[i]!.forEach(sprite => {
			const isSolid = gameState.solids.includes(sprite.type)
			const isPushable = (type in pushable) && pushable[type]!.includes(sprite.type)

			if (isSolid && !isPushable)
				canMove = false

			if (isSolid && isPushable) {
				canMove = canMove && _canMoveToPush(sprite as Sprite, dx, dy)
			}
		})

		if (canMove) {
			sprite._x += dx
			sprite._y += dy
		}

		return canMove
	}

	const getGrid = (): SpriteType[][] => {
		const { width, height } = gameState.dimensions

		const grid: SpriteType[][] = new Array(width*height).fill(0).map(_ => [])
		gameState.sprites.forEach(s => {
			const i = s.x+s.y*width
			grid[i]!.push(s)
		})

		const legendIndex = (t: SpriteType) => gameState.legend.findIndex(l => l[0] == t.type)
		for (const tile of grid) tile.sort((a, b) => legendIndex(a) - legendIndex(b))

		return grid
	}

	const _checkBounds = (x: number, y: number): void => {
		const { width, height } = gameState.dimensions
		if (x >= width || x < 0 || y < 0 || y >= height) throw new Error(`Sprite out of bounds.`)
	}

	const _checkLegend = (type: string): void => {
		if (!(type in Object.fromEntries(gameState.legend)))
			throw new Error(`Unknown sprite type: ${type}`)
	}

	const addSprite = (x: number, y: number, type: string): void => {
		if (type === '.') return

		_checkBounds(x, y)
		_checkLegend(type)

		const s = new Sprite(type, x, y)
		gameState.sprites.push(s)
	}
	
	const _allEqual = <T>(arr: T[]): boolean => arr.every(val => val === arr[0])

	const setMap = (string: string): void => {
		if (!string) throw new Error('Tried to set empty map.')

		if (string.constructor == Object) throw new Error('setMap() takes a string, not a dict.') // https://stackoverflow.com/a/51285298
		if (Array.isArray(string)) throw new Error('It looks like you passed an array into setMap(). Did you mean to use something like setMap(levels[level]) instead of setMap(levels)?')
		
		const rows = string.trim().split("\n").map(x => x.trim())
		const rowLengths = rows.map(x => x.length)
		const isRect = _allEqual(rowLengths)
		if (!isRect) throw new Error('Level must be rectangular.')
		const w = rows[0]?.length ?? 0
		const h = rows.length
		gameState.dimensions.width = w
		gameState.dimensions.height = h

		gameState.sprites = []

		const nonSpace = string.split("").filter(x => x !== " " && x !== "\n") // \S regex was too slow
		for (let i = 0; i < w*h; i++) {
			const type = nonSpace[i]!
			if (type === '.') continue

			const x = i%w 
			const y = Math.floor(i/w)

			addSprite(x, y, type)
		}
	}

	const clearTile = (x: number, y: number): void => {
		gameState.sprites = gameState.sprites.filter(s => s.x !== x || s.y !== y)
	}

	const addText = (str: string, opts: AddTextOptions = {}): void => {
		const CHARS_MAX_X = 21
		const padLeft = Math.floor((CHARS_MAX_X - str.length)/2)

		if (Array.isArray(opts.color)) throw new Error('addText no longer takes an RGBA color. Please use a Sprig color instead with \"{ color: color`` }\"')
		const [, rgba ] = palette.find(([key]) => key === opts.color) ?? palette.find(([key]) => key === 'L')!

		const textOptions = {
			x: opts.x ?? padLeft,
			y: opts.y ?? 0,
			color: rgba,
			content: str
		};

		composeText([textOptions]);

		gameState.texts.push(textOptions);
	}

	const clearText = (): void => { gameState.texts = [] }

	const getTile = (x: number, y: number): SpriteType[] => {
		if (y < 0) return []
		if (x < 0) return []
		if (y >= gameState.dimensions.height) return []
		if (x >= gameState.dimensions.width) return []

		return getGrid()[gameState.dimensions.width*y+x] ?? []
	}

	const _hasDuplicates = <T>(array: T[]): boolean => (new Set(array)).size !== array.length

	const tilesWith = (...matchingTypes: string[]): SpriteType[][] => {
		const { width, height } = gameState.dimensions
		const tiles: SpriteType[][] = []
		const grid = getGrid()
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				const tile = grid[width*y+x] || []
				const matchIndices = matchingTypes.map(type => {
					return tile.map(s => s.type).indexOf(type)
				})
				if (!_hasDuplicates(matchIndices) && !matchIndices.includes(-1)) tiles.push(tile)
			}
		}
		return tiles
	}

	const setSolids = (arr: string[]): void => { 
		if (!Array.isArray(arr)) throw new Error('The sprites passed into setSolids() need to be an array.')
		gameState.solids = arr 
	}
	const setPushables = (map: Record<string, string[]>): void => { 
		for (const key in map) {
			if(key.length != 1) {
				throw new Error('Your sprite name must be wrapped in [] brackets here.');
			}
			_checkLegend(key)
		}
		gameState.pushable = map 
	}

	const api: BaseEngineAPI = {
		setMap, 
		addText,
		clearText,
		addSprite,
		getGrid,
		getTile,
		tilesWith,
		clearTile, 
		setSolids, 
		setPushables, 
		setBackground: (type: string) => { gameState.background = type },
		map: _makeTag(text => text),
		bitmap: _makeTag(text => text),
		color: _makeTag(text => text),
		tune: _makeTag(text => text),
		getFirst: (type: string): SpriteType | undefined => gameState.sprites.find(t => t.type === type), // **
		getAll: (type: string): SpriteType[] => type ? gameState.sprites.filter(t => t.type === type) : gameState.sprites, // **
		width: () => gameState.dimensions.width,
		height: () => gameState.dimensions.height
	}

	return { api, state: gameState }
}
