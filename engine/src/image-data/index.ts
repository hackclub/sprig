import type { FullSprigAPI, GameState, InputKey } from '../api.js'
import { type BaseEngineAPI, baseEngine } from '../base/index.js'
import { bitmapTextToImageData } from './bitmap.js'

export * from './bitmap.js'

export type ImageDataEngineAPI = BaseEngineAPI & Pick<
	FullSprigAPI,
	| 'onInput'
	| 'afterInput'
	| 'setLegend'
	| 'setBackground'
	| 'setTimeout'
	| 'setInterval'
	| 'playTune'
>
export const imageDataEngine = (): {
	api: ImageDataEngineAPI,
	render(): ImageData,
	button(key: InputKey): void,
	cleanup(): void,
	state: GameState
} => {
	const game = baseEngine()

	let legendImages: Record<string, ImageData> = {}
	let background: string = '.'

	const timeouts: number[] = []
	const intervals: number[] = []

	const keyHandlers: Record<InputKey, (() => void)[]> = {
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
	
	const cleanup = () => {
		timeouts.forEach(clearTimeout)
		intervals.forEach(clearInterval)
	}

	const api = {
		...game.api,
		onInput: (key: InputKey, fn: () => void) => keyHandlers[key].push(fn),
		afterInput: (fn: () => void) => afterInputs.push(fn),
		setLegend: (...bitmaps: [string, string][]) => {
			game.state.legend = bitmaps
			legendImages = {}
			for (const [ id, desc ] of bitmaps)
				legendImages[id] = bitmapTextToImageData(id, desc)
		},
		setBackground: (kind: string) => background = kind,
		setTimeout: (fn: TimerHandler, ms: number) => {
			const timer = setTimeout(fn, ms)
			timeouts.push(timer)
			return timer
		},
		setInterval: (fn: TimerHandler, ms: number) => {
			const timer = setInterval(fn, ms)
			intervals.push(timer)
			return timer
		},
		playTune: () => ({ end() {}, isPlaying() { return false } })
	}

	return {
		api,
		button(key: InputKey): void {
			for (const fn of keyHandlers[key]) fn()
			for (const fn of afterInputs) fn()
			game.state.sprites.forEach((s: any) => {
				s.dx = 0
				s.dy = 0
			})
		},
		render(): ImageData {
			const width = () => game.state.dimensions.width
			const height = () => game.state.dimensions.height
			const tSize = () => 16

			const sw = width() * tSize()
			const sh = height() * tSize()

			const out = new ImageData(sw, sh)
			out.data.fill(255)

			for (const t of game.api.getGrid().flat()) {
				const img = legendImages[t.type ?? background]
				if (!img) continue

				for (let x = 0; x < tSize(); x++)
					for (let y = 0; y < tSize(); y++) {
						const tx = t.x * tSize() + x
						const ty = t.y * tSize() + y
						const src_alpha = img.data[(y * 16 + x) * 4 + 3]
						if (!src_alpha) continue
						out.data[(ty * sw + tx) * 4 + 0] = img.data[(y * 16 + x) * 4 + 0]!
						out.data[(ty * sw + tx) * 4 + 1] = img.data[(y * 16 + x) * 4 + 1]!
						out.data[(ty * sw + tx) * 4 + 2] = img.data[(y * 16 + x) * 4 + 2]!
						out.data[(ty * sw + tx) * 4 + 3] = img.data[(y * 16 + x) * 4 + 3]!
					}
			}

			return out
		},
		cleanup,
		state: game.state
	}
}