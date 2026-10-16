import { expect, test } from 'vitest'
import { extractLegendBitmaps } from './legend-extractor'

test('extracts setLegend bitmap data without executing game code', () => {
	const code = `
		const player = "p"
		const wall = "w"
		setLegend(
			[player, bitmap\`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................\`],
			[wall, bitmap\`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL\`]
		)
		throw new Error("must not execute")
	`

	expect(extractLegendBitmaps(code)).toEqual([
		['p', '\n................\n................\n................\n................\n................\n................\n................\n................\n................\n................\n................\n................\n................\n................\n................\n................'],
		['w', '\nLLLLLLLLLLLLLLLL\nLLLLLLLLLLLLLLLL\nLLLLLLLLLLLLLLLL\nLLLLLLLLLLLLLLLL\nLLLLLLLLLLLLLLLL\nLLLLLLLLLLLLLLLL\nLLLLLLLLLLLLLLLL\nLLLLLLLLLLLLLLLL\nLLLLLLLLLLLLLLLL\nLLLLLLLLLLLLLLLL\nLLLLLLLLLLLLLLLL\nLLLLLLLLLLLLLLLL\nLLLLLLLLLLLLLLLL\nLLLLLLLLLLLLLLLL\nLLLLLLLLLLLLLLLL\nLLLLLLLLLLLLLLLL'],
	])
})

test('extracts bitmaps defined in variables and object property keys', () => {
	const code = `
		const SPRITES = {
			PLAYER: "p",
			WALL: "w"
		}
		const playerSprite = bitmap \`0000\`
		function resetLegend() {}
		setLegend(
			[SPRITES.PLAYER, playerSprite],
			[SPRITES.WALL, bitmap \`1111\`]
		)
	`
	expect(extractLegendBitmaps(code)).toEqual([
		['p', '0000'],
		['w', '1111'],
	])
})
