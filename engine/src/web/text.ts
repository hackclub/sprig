import type { TextElement } from '../api.js'
import { font, composeText } from '../base/index.js'
import { makeCanvas } from './util.js'

export const getTextImg = (texts: TextElement[]): CanvasImageSource => {
	const charGrid = composeText(texts)
	const img = new ImageData(160, 128)
	img.data.fill(0)

	for (const [i, row] of Object.entries(charGrid)) {
		let xt = 0
		for (const { char, color } of row) {
			const cc = char.charCodeAt(0)

			let y = Number(i)*8
			for (const bits of font.slice(cc*8, (1+cc)*8)) {
					for (let x = 0; x < 8; x++) {
						const val = (bits>>(7-x)) & 1

						img.data[(y*img.width + xt + x)*4 + 0] = val*color[0]
						img.data[(y*img.width + xt + x)*4 + 1] = val*color[1]
						img.data[(y*img.width + xt + x)*4 + 2] = val*color[2]
						img.data[(y*img.width + xt + x)*4 + 3] = val*255
					}
					y++
			}
			xt += 8
		}
	}

	const canvas = makeCanvas(160, 128)
	canvas.getContext('2d')!.putImageData(img, 0, 0)

	return canvas
}