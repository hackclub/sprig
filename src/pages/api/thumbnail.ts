import type { APIRoute } from 'astro'
import { baseEngine, palette } from 'sprig/base'
import { RawThumbnail, Thumbnail } from '../../lib/thumbnail'

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
		console.log(err)
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
	if (!map) throw new Error('No map found')

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
	const srcUrl = `https://raw.githubusercontent.com/hackclub/sprig/main/games/${encodeURIComponent(name)}.js`
	
	let thumbnail: Thumbnail
	try {
		// Try fetching a custom image (PNG only)
		const imgUrl = `https://raw.githubusercontent.com/hackclub/sprig/main/games/img/${encodeURIComponent(name)}.png`
		const image = await fetch(imgUrl)
		if (image.status === 200) {
			thumbnail = {
				kind: 'png',
				data: Buffer.from(await image.arrayBuffer()).toString('base64')
			}
		} else {
			// Fetch the script and try to run the game
			const src = await fetch(srcUrl).then((res) => res.text())
			thumbnail = drawGameImage(src)
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
			'Cache-Control': 's-maxage=60, stale-while-revalidate=604800'
		}
	})
}
