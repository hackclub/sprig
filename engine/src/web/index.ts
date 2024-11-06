import { type InputKey, type PlayTuneRes, VALID_INPUTS, type FullSprigAPI, type GameState } from '../api.js'
import { type BaseEngineAPI, baseEngine, textToTune } from '../base/index.js'
import { bitmapTextToImageData } from '../image-data/index.js'
import { getTextImg } from './text.js'
import { playTune } from './tune.js'
import { makeCanvas } from './util.js'

export * from './text.js'
export * from './tune.js'

export type WebEngineAPI = BaseEngineAPI & Pick<
	FullSprigAPI,
	| 'setLegend'
	| 'onInput'
	| 'afterInput'
	| 'playTune'
> & {
	getState(): GameState // For weird backwards-compatibility reasons, not part of API
}

export function webEngine(canvas: HTMLCanvasElement): {
	api: WebEngineAPI,
	state: GameState,
	cleanup(): void
} {
	const { api, state } = baseEngine()

	const ctx = canvas.getContext('2d')!
	const offscreenCanvas = makeCanvas(1, 1)
	const offscreenCtx = offscreenCanvas.getContext('2d')!

	const _bitmaps: Record<string, CanvasImageSource> = {}
	let _zOrder: string[] = []

	ctx.imageSmoothingEnabled = false

	const _gameloop = (): void => {
		const { width, height } = state.dimensions
		if (width === 0 || height === 0) return

		ctx.clearRect(0, 0, canvas.width, canvas.height)

		offscreenCanvas.width = width*16
		offscreenCanvas.height = height*16

		offscreenCtx.fillStyle = 'white'
		offscreenCtx.fillRect(0, 0, width*16, height*16)

		const grid = api.getGrid()

		for (let i = 0; i < width * height; i++) {
			const x = i % width
			const y = Math.floor(i/width)
			const sprites = grid[i]!

			if (state.background) {
				const imgData = _bitmaps[state.background]!
				offscreenCtx.drawImage(imgData, x*16, y*16)
			}

			sprites
				.sort((a, b) => _zOrder.indexOf(b.type) - _zOrder.indexOf(a.type))
				.forEach((sprite) => {
					const imgData = _bitmaps[sprite.type]!
					offscreenCtx.drawImage(imgData, x*16, y*16)
				})

		}

		const scale = Math.min(canvas.width/(width*16), canvas.height/(height*16))
		const actualWidth = offscreenCanvas.width*scale
		const actualHeight = offscreenCanvas.height*scale
		ctx.drawImage(
			offscreenCanvas,
			(canvas.width-actualWidth)/2,
			(canvas.height-actualHeight)/2,
			actualWidth,
			actualHeight
		)

		const textCanvas = getTextImg(state.texts)
		ctx.drawImage(
			textCanvas,
			0,
			0,
			canvas.width,
			canvas.height
		)

		animationId = window.requestAnimationFrame(_gameloop)
	}
	let animationId = window.requestAnimationFrame(_gameloop)

	const setLegend = (...bitmaps: [string, string][]): void => {
		if (bitmaps.length == 0) throw new Error('There needs to be at least one sprite in the legend.')

		if (!Array.isArray(bitmaps[0])) throw new Error('The sprites passed into setLegend each need to be in square brackets, like setLegend([player, bitmap`...`]).')

		bitmaps.forEach(([ key ]) => {
			if (key === '.') throw new Error(`Can't reassign "." bitmap`)
			if (key.length !== 1) throw new Error(`Bitmaps must have one character names`)
		})

		state.legend = bitmaps
		_zOrder = bitmaps.map(x => x[0])

		for (let i = 0; i < bitmaps.length; i++) {
			const [ key, value ] = bitmaps[i]!
			const imgData = bitmapTextToImageData(key, value)
			const littleCanvas = makeCanvas(16, 16)
			littleCanvas.getContext('2d')!.putImageData(imgData, 0, 0)
			_bitmaps[key] = littleCanvas
		}
	}

	let tileInputs: Record<InputKey, (() => void)[]> = {
		w: [],
		s: [],
		a: [],
		d: [],
		i: [],
		j: [],
		k: [],
		l: []
	}
	const afterInputs: (() => void)[] = []

	const keydown = (e: KeyboardEvent) => {
		const key = e.key.toLowerCase();
		if (!VALID_INPUTS.includes(key as any)) return

		for (const validKey of VALID_INPUTS)
			if (key === validKey) tileInputs[key].forEach(fn => fn())

		afterInputs.forEach(f => f())

		state.sprites.forEach((s: any) => {
			s.dx = 0
			s.dy = 0
		})

		e.preventDefault()
	}
	canvas.addEventListener('keydown', keydown)

	const onInput = (key: InputKey, fn: () => void): void => {
		if (!VALID_INPUTS.includes(key))
			throw new Error(`Unknown input key, "${key}": expected one of ${VALID_INPUTS.join(', ')}`)
		tileInputs[key].push(fn)
	}
	const afterInput = (fn: () => void): void => { afterInputs.push(fn) }

	const tunes: PlayTuneRes[] = []
	return {
		api: {
			...api,
			setLegend,
			onInput,
			afterInput,
			getState: () => state,
			playTune: (text: string, n: number) => {
				const tune = textToTune(text)
				const playTuneRes = playTune(tune, n)
				tunes.push(playTuneRes)
				return playTuneRes
			}
		},
		state,
		cleanup: () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			window.cancelAnimationFrame(animationId)
			canvas.removeEventListener('keydown', keydown)
			tunes.forEach(tune => tune.end())
		}
	}
}
