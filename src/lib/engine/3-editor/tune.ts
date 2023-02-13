/*
song form

[
	[duration, instrument, pitch, duration, ...],
]

Syntax:
500: 64.4~500 + c5~1000
[500, 'sine', 64.4, 500, 'sine', 'c5', 1000]
Comma between each tune element. Whitespace ignored.
*/

import { effect } from '@preact/signals'
import { lazy } from '../../lazy'
import { muted } from '../../state'
import { instruments, InstrumentType, tones, type Tune } from '../1-base/tune'

const audioCtx = lazy(() => new AudioContext())
const volGain = lazy(() => {
	const volGain = audioCtx.createGain()
	volGain.connect(audioCtx.destination)
	effect(() => volGain.gain.value = 1 - +muted.value)
	return volGain
})

export function playFrequency(frequency: number, duration: number, instrument: InstrumentType, ctx: AudioContext, node: AudioNode) {
	const osc = ctx.createOscillator()
	const rampGain = ctx.createGain()

	osc.connect(rampGain)
	rampGain.connect(node)

	osc.frequency.value = frequency
	osc.type = instrument ?? 'sine'
	osc.start()

	const endTime = ctx.currentTime + duration*2/1000
	osc.stop(endTime)
	
	rampGain.gain.setValueAtTime(0, ctx.currentTime)
	rampGain.gain.linearRampToValueAtTime(.2, ctx.currentTime + duration/5/1000)
	rampGain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration/1000)
	rampGain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration*2/1000) // does this ramp from the last ramp
	
	osc.onended = () => {
		osc.disconnect()
		rampGain.disconnect()
	}
}

const sleep = async (duration: number) => new Promise(resolve => setTimeout(resolve, duration))
async function playTuneHelper(tune: Tune, number: number, playingRef: { playing: boolean }) {
	for (let i = 0; i < tune.length*number; i++) {
		const index = i%tune.length
		if (!playingRef.playing) break
		const noteSet = tune[index]!
		const sleepTime = noteSet[0]
		for (let j = 1; j < noteSet.length; j += 3) {
			const instrument = noteSet[j] as InstrumentType
			const note = noteSet[j+1]!
			const duration = noteSet[j+2] as number

			const frequency = typeof note === 'string' 
				? tones[note.toUpperCase()]
				: 2**((note-69)/12)*440
			if (instruments.includes(instrument) && frequency !== undefined) playFrequency(frequency, duration, instrument, audioCtx, volGain.__lazy_self)
		}
		await sleep(sleepTime)
	}
}

export function playTune(tune: Tune, number = 1) {
	const playingRef = { playing: true }
	playTuneHelper(tune, number, playingRef)
	return {
		end() { playingRef.playing = false },
		isPlaying() { return playingRef.playing }
	}
}