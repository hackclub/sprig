import { baseEngine, palette } from '../../engine/src/base'
import { RawThumbnail, Thumbnail } from '../lib/thumbnail'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import metrics from '../../metrics'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const DEFAULT_FALLBACK_PNG_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAA0lEQVQI12P4z8BQDwAEgAF/QualzQAAAABJRU5ErkJggg=='
const colors = Object.fromEntries(palette)
const spriteBitmapCache = new Map<string, Uint8Array>()

type BunRuntime = {
	file: (path: string) => {
		arrayBuffer: () => Promise<ArrayBuffer>
		text: () => Promise<string>
	}
	write: (path: string, data: string) => Promise<unknown>
}

type GenerateImageJsonOptions = {
	name: string
	gameContentString?: string
	imagePath?: string
	outputPath?: string
}

const bun = (globalThis as typeof globalThis & { Bun?: BunRuntime }).Bun

const readTextFile = async (filePath: string) => {
	if (bun) return bun.file(filePath).text()
	return readFile(filePath, 'utf8')
}

const readBase64File = async (filePath: string) => {
	try {
		if (bun) {
			const bytes = await bun.file(filePath).arrayBuffer()
			return Buffer.from(bytes).toString('base64')
		}

		const bytes = await readFile(filePath)
		return bytes.toString('base64')
	} catch {
		return null
	}
}

const readTextIfExists = async (filePath: string) => {
	try {
		return await readTextFile(filePath)
	} catch {
		return null
	}
}

const writeTextIfChanged = async (filePath: string, contents: string) => {
	const existing = await readTextIfExists(filePath)
	if (existing === contents) return false

	await mkdir(dirname(filePath), { recursive: true })
	if (bun) await bun.write(filePath, contents)
	else await writeFile(filePath, contents, 'utf8')
	return true
}

const evalGameScript = (script: string) => {
	const { api } = baseEngine()

	let legend: [string, string][] = []
	let map: string | null = null
	let background = '.'

	const patchedApi = {
		...api,
		setLegend: (...bitmaps: [string, string][]) => { legend = bitmaps },
		setBackground: (bg: string) => { background = bg },
		setMap: (string: string) => { map = string },
		onInput: () => {},
		afterInput: () => {},
		playTune: () => {},
		setTimeout: () => {},
		setInterval: () => {}
	}

	try {
		const fn = new Function(...Object.keys(patchedApi), script)
		fn(...Object.values(patchedApi))
	} catch {
		// Broken scripts fall back to the default thumbnail below.
	}

	return {
		legend: Object.fromEntries(legend),
		map: map as string | null,
		background
	}
}

const makeSpriteBitmap = (grid: string): Uint8Array => {
	const cached = spriteBitmapCache.get(grid)
	if (cached) return cached

	const bitmap = new Uint8Array(16 * 16 * 4)
	let offset = 0
	for (const row of grid.trim().split('\n')) {
		for (const color of row.trim()) {
			const rgba = colors[color]!
			bitmap[offset] = rgba[0]!
			bitmap[offset + 1] = rgba[1]!
			bitmap[offset + 2] = rgba[2]!
			bitmap[offset + 3] = rgba[3]!
			offset += 4
		}
	}

	spriteBitmapCache.set(grid, bitmap)
	return bitmap
}

const blitSprite = (data: Uint8Array, width: number, bitmap: Uint8Array, tx: number, ty: number): void => {
	for (let x = 0; x < 16; x++) {
		for (let y = 0; y < 16; y++) {
			const sx = tx * 16 + x
			const sy = ty * 16 + y
			const sourceOffset = (y * 16 + x) * 4

			if (bitmap[sourceOffset + 3]! < 255) continue

			const targetOffset = (sy * width + sx) * 4
			data[targetOffset] = bitmap[sourceOffset]!
			data[targetOffset + 1] = bitmap[sourceOffset + 1]!
			data[targetOffset + 2] = bitmap[sourceOffset + 2]!
			data[targetOffset + 3] = bitmap[sourceOffset + 3]!
		}
	}
}

const drawGameImage = (src: string): RawThumbnail => {
	const { legend, map, background } = evalGameScript(src)
	if (!map) throw new Error('No map found')

	const rows = map.trim().split('\n').map((row) => row.trim())
	const mapWidth = rows[0]!.length
	const mapHeight = rows.length
	const data = new Uint8Array(mapWidth * mapHeight * 16 * 16 * 4)
	const legendBitmapCache = new Map<string, Uint8Array>()

	const getBitmap = (sprite: string) => {
		const existing = legendBitmapCache.get(sprite)
		if (existing) return existing

		const grid = legend[sprite]
		if (!grid) throw new Error(`No legend bitmap found for sprite ${sprite}`)

		const bitmap = makeSpriteBitmap(grid)
		legendBitmapCache.set(sprite, bitmap)
		return bitmap
	}

	rows.forEach((row, y) => {
		for (let x = 0; x < row.length; x++) {
			if (background !== '.') {
				blitSprite(data, mapWidth * 16, getBitmap(background), x, y)
			}

			const sprite = row[x]!
			if (sprite === '.') continue

			blitSprite(data, mapWidth * 16, getBitmap(sprite), x, y)
		}
	})

	return {
		kind: 'raw',
		data: Buffer.from(data).toString('base64'),
		width: mapWidth * 16,
		height: mapHeight * 16,
	}
}

const loadImageBase64FromDisk = async (name: string, imagePath?: string) => {
	return readBase64File(imagePath ?? resolve(__dirname, `../../games/img/${name}.png`))
}

const loadGameContentFromDisk = async (name: string) => {
	return readTextIfExists(resolve(__dirname, `../../games/${name}.js`))
}

export const generateImageJson = async ({ name, gameContentString, imagePath, outputPath }: GenerateImageJsonOptions): Promise<boolean> => {
	const gameImageBase64 = await loadImageBase64FromDisk(name, imagePath)
	const gameSource = gameContentString ?? await loadGameContentFromDisk(name)

	let thumbnail: Thumbnail
	try {
		if (gameImageBase64 != null) {
			thumbnail = {
				kind: 'png',
				data: gameImageBase64
			}
		} else {
			if (gameSource == null) throw new Error('No image found and no game content found')
			thumbnail = drawGameImage(gameSource)
		}
	} catch {
		thumbnail = {
			kind: 'png',
			data: DEFAULT_FALLBACK_PNG_BASE64
		}
	}

	try {
		return await writeTextIfChanged(
			outputPath ?? resolve(__dirname, `../../public/${name}.json`),
			JSON.stringify(thumbnail),
		)
	} catch {
		metrics.increment('http.errors.thumbnail_json')
		throw new Error(`Failed to write thumbnail JSON for ${name}`)
	}
}
