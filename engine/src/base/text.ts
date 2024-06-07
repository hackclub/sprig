import type { Rgba, TextElement } from '../api.js'

export function composeText(texts: TextElement[]): { char: string, color: Rgba }[][] {
	const emptyCell = () => ({ char: ' ', color: [0, 0, 0, 0] as Rgba })
	const range = <T>(length: number, fn: () => T): T[] => Array.from({ length }, fn)
	const gridFromSize = (w: number, h: number) => range(h, () => range(w, emptyCell))
	const CHARS_MAX_X = 20
	const CHARS_MAX_Y = 16

	const grid = gridFromSize(CHARS_MAX_X, CHARS_MAX_Y)

	for (const { x: sx, y: sy, content, color } of texts) {
		let y = sy
		for (const line of content.split('\n')) {
			let x = sx
			for (const char of line.split('')) {
				if (" !\"#%&\'()*+,./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ\\^_-`abcdefghijklmnopqrstuvwxyz|~¦§¨©¬®¯°±´¶·¸ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ÙÚÛÜÝÞßàáâãäåæçèéêëìíîïñòóôõö÷ùúûüýþÿĀāĂăĄąĆćĊċČčĎĐđĒēĖėĘęĚěĞğĠġĦħĪīĮįİıŃńŇňŌōŒœŞşŨũŪūŮůŲųŴŵŶŷŸǍǎǏǐǑǒǓǔˆˇ˘˙˚˛˜˝ẀẁẂẃẄẅỲỳ†‡•…‰⁄™∂∅∏∑−√∞∫≈≠≤≥◊".indexOf(char) === -1)
					throw new Error(`Character ${char} is not in the font. It will be rendered incorrectly.`)
				if (x <= CHARS_MAX_X && y < CHARS_MAX_Y)
					grid[y]![x++] = {color: color, char}
			}
			y++
		}
	}

	return grid
}
