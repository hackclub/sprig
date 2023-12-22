import type { APIRoute } from 'astro'
import { baseEngine, palette } from 'sprig/base'
import { RawThumbnail, Thumbnail } from '../../lib/thumbnail'
import fs from 'fs'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

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
	} catch (err) {
		// NOTE: We hide this error, because it currently serves no purpose other than muddying the log
		// HOWEVER, generally this is probably an excellent place to detect broken games in the future
		//console.log(err)
	}

	return {
		legend: Object.fromEntries(legend),
		map: map as string | null,
		background
	}
}

const makeSpriteBitmap = (grid: string): number[] => {
	const result: number[] = []
	const colors = Object.fromEntries(palette)
	grid.trim().split('\n').forEach((row) => {
		row.trim().split('').forEach((color) => {
			const arr = colors[color]!
			result.push(...arr)
		})
	})
	return result
}


const blitSprite = (data: Uint8Array, width: number, bitmap: number[], tx: number, ty: number): void => {
	for (let x = 0; x < 16; x++)
		for (let y = 0; y < 16; y++) {
			const sx = tx*16 + x
			const sy = ty*16 + y

			if (bitmap[(y*16 + x)*4 + 3]! < 255) continue

			data[(sy*width + sx)*4 + 0] = bitmap[(y*16 + x)*4 + 0]!
			data[(sy*width + sx)*4 + 1] = bitmap[(y*16 + x)*4 + 1]!
			data[(sy*width + sx)*4 + 2] = bitmap[(y*16 + x)*4 + 2]!
			data[(sy*width + sx)*4 + 3] = bitmap[(y*16 + x)*4 + 3]!
		}
}

const drawGameImage = (src: string): RawThumbnail => {
	const { legend, map, background } = evalGameScript(src)
	if (!map) { 
		throw new Error('No map found') 
	}

	const mapWidth = map.trim().split('\n')[0]!.trim().length
	const mapHeight = map.trim().split('\n').length

	const data = new Uint8Array(mapWidth*mapHeight*16*16*4)
	map.trim().split('\n').forEach((row, y) => {
		row.trim().split('').forEach((sprite, x) => {
			if (background !== '.') {
				blitSprite(data, mapWidth*16, makeSpriteBitmap(legend[background]!), x, y)
			}
			if (sprite === '.') return
			blitSprite(data, mapWidth*16, makeSpriteBitmap(legend[sprite]!), x, y)
		})
	})

	return {
		kind: 'raw',
		data: Buffer.from(data.reduce(
			(data, byte) => data + String.fromCharCode(byte)
		, ''), 'ascii').toString('base64'),
		width: mapWidth*16,
		height: mapHeight*16,
	}
}

export const get: APIRoute = async ({ url }) => {
	const name = url.searchParams.get('key') || ''
	let gameContentString = loadGameContentFromDisk(name)
	let gameImageBase64 = loadImageBase64FromDisk(name)
	
	let thumbnail: Thumbnail
	try {
		if (gameImageBase64 != null) 
		{
			// Try fetching a custom image (PNG only)
			thumbnail = {
				kind: 'png',
				data: gameImageBase64
			}
		} else {
			if (gameContentString == null) {
				throw new Error('No image found, no game content found - weird')
			} else {
				// Fetch the script and try to run the game			
				thumbnail = drawGameImage(gameContentString as string)
			}
		}	
	} catch (error) {
		// If everything breaks, use a default image
		console.error(error)
		const image = await fetch('https://cloud-i203j2e6a-hack-club-bot.vercel.app/1confused_dinosaur.png')
		thumbnail = {
			kind: 'png',
			data: Buffer.from(await image.arrayBuffer()).toString('base64')
		}
	}

	return new Response(JSON.stringify(thumbnail), {
		status: 200,
		headers: {
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,OPTIONS',
			'Access-Control-Allow-Headers': '*',
			'Cache-Control': 'max-age=86400'
		}
	})
}
function loadImageBase64FromDisk(name: string) {
	try {
		let imgPath = path.resolve(__dirname, `../../../games/img/${name}.png`)
		if (!fs.existsSync(imgPath)) return null
		return fs.readFileSync(imgPath).toString("base64")
	} catch {
		return null
	}
}

function loadGameContentFromDisk(name: string) {	
	let gameContentPath = path.resolve(__dirname, `../../../games/${name}.js`)
	if (!fs.existsSync(gameContentPath)) return null
	return fs.readFileSync(gameContentPath).toString()
}

