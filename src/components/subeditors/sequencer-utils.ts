import { effect, Signal } from '@preact/signals'
import { type InstrumentType, tones, type Tune } from '../../../engine/src/api'
import { playFrequency } from '../../../engine/src/web'
import { lazy } from '../../lib/utils/lazy'

// Weird representations are used here:
// - Tune: see editor/tune.ts in the engine, represents the native tune format
// - Cells: grid constrained version of a tune that the sequencer supports

export const beats = 32
export const height = 14

export const yNoteMap: Record<number, string> = {
	13: 'C4',
	12: 'D4',
	11: 'E4',
	10: 'F4',
	9: 'G4',
	8: 'A4',
	7: 'B4',
	6: 'C5',
	5: 'D5',
	4: 'E5',
	3: 'F5',
	2: 'G5',
	1: 'A5',
	0: 'B5'
}

export type Cells = Record<`${number}_${number}`, InstrumentType>

export const cellsToTune = (cells: Cells, bpm: number): Tune => {
	const tune: Tune = []
	const beatTime = 1000*60 / bpm
	const getNotes = (x: number) => Object.entries(cells)
		.filter(([ k ]) => k.split('_')[0] === x.toString())
		.map(([ k, v ]) => [ Number(k.split('_')[1]), v])

	for (let x = 0; x < beats; x++) {
		let rests = 0
		while (getNotes(x).length === 0 && x < beats) {
			rests++
			x++
		}
		if (rests) tune.push([ rests * beatTime ])
		if (x >= beats) break

		const notes = getNotes(x)
		tune.push([ beatTime, ...notes.map(([ y, instrument ]) => [ instrument!, yNoteMap[y as number]!, beatTime ]).flat() ])
	}
	return tune
}

export const tuneToCells = (tune: Tune) => {
	const nonRestBeats = tune.filter(el => el.length > 1)
	if (!nonRestBeats.length) return {}
	const beatTime = nonRestBeats[0]![0]

	const cells: Cells = {}
	let x = 0
	for (const [ duration, ...rest ] of tune) {
		for (let i = 0; i < rest.length; i += 3) {
			const [ instrument, note ] = rest.slice(i, i + 2)
			const name = typeof note === 'string'
				? note.toUpperCase()
				: Object.entries(tones).find(([, v]) => v === note)?.[0].toUpperCase()
			const y = Number(Object.entries(yNoteMap).find(([, v]) => v === name)?.[0])
			cells[`${x}_${y}`] = String(instrument) as InstrumentType
		}

		if (!rest.length) {
			x += Math.round(duration / beatTime)
		} else {
			x++
		}
	}
	return cells
}

export const cellsEq = (a: Cells, b: Cells) => {
	const aKeys = Object.keys(a)
	const bKeys = Object.keys(b)
	if (aKeys.length !== bKeys.length) return false
	for (const key of aKeys) {
		if (a[key as any] !== b[key as any]) return false
	}
	for (const key of bKeys) {
		if (a[key as any] !== b[key as any]) return false
	}
	return true
}

const audioCtx = lazy(() => new AudioContext())

export const playNote = (symbol: string, duration: number, instrument: InstrumentType): void => {
	const hz = tones[symbol]!
	playFrequency(hz, duration, instrument, audioCtx, audioCtx.destination)
}

const playBeat = (beat: number, cells: Cells, bpm: number) => {
	const notes: [number, InstrumentType][] = []

	Object
		.entries(cells)
		.forEach(([ key, value ]) => {
			const [ x, y ] = key.split('_').map(Number)
			if (x === beat) notes.push([ y!, value ])
		})

	notes.forEach(([ y, instrument ]) => {
		const note = yNoteMap[y]!
		const duration = (1000*60) / bpm
		playNote(note, duration, instrument)
	})
  }

export const play = (cells: Signal<Cells>, bpm: Signal<number>, beat: Signal<number>): () => void => {
	const stop = { current: false }
	let _timeout: unknown | null = null
	const go = () => {
		if (stop.current) return
		playBeat(beat.value, cells.value, bpm.value)
		setTimeout(() => {
			if (stop.current) return
			beat.value = (beat.value + 1) % beats

			effect(() => {
				if (_timeout) clearTimeout(_timeout as number)
				_timeout = setTimeout(go, ((1000 * 60) / bpm.value) - (audioCtx.outputLatency * 1000))
			})

		}, audioCtx.outputLatency * 1000)
	}
	go()
	console.log(`Latency compensation: ${Math.round(audioCtx.outputLatency * 1000)}ms`)
	return () => { stop.current = true }
}
