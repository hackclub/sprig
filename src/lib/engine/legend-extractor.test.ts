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
