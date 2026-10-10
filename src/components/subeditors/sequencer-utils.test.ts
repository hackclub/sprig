import { expect, test } from "vitest"
import { cellsToTune, getBPM, tuneToCells, type Cells } from "./sequencer-utils"
import { textToTune, tuneToText } from "../../../engine/src/base"

test('getBPM parses the tempo from a normal tune', () => {
	expect(getBPM('400: C4~400,\n11600')).toBe(150)
})

test('getBPM falls back to 120 for tunes wrapped in grave accents', () => {
	expect(getBPM('`400: C4~400,\n11600`')).toBe(120)
})

test('getBPM falls back to 120 for non-numeric durations', () => {
	expect(getBPM('C4: C4~400,\n11600')).toBe(120)
})

test('getBPM falls back to 120 when no colon is present', () => {
	expect(getBPM('11600')).toBe(120)
})

test('tune editor round-trips grave-accent wrapped text without NaN', () => {
	const text = '`400: C4~400,\n11600`'
	const cells = tuneToCells(textToTune(text))
	const output = tuneToText(cellsToTune(cells, getBPM(text)))
	expect(output).not.toMatch(/NaN|Infinity/)
	expect(output).toBe('500: C4~500,\n15500')
})

test('cellsToTune produces only finite values', () => {
	const cells: Cells = { '0_13': 'sine', '1_11': 'square' }
	for (const bpm of [1, 60, 120, 1600]) {
		for (const element of cellsToTune(cells, bpm)) {
			for (const value of element) {
				if (typeof value === 'number') expect(Number.isFinite(value)).toBe(true)
			}
		}
	}
})
