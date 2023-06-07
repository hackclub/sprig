import { effect } from '@preact/signals'
import { lazy } from '../utils/lazy'
import { muted } from '../state'
import { type PlayTuneRes, type Tune } from 'sprig'
import { playTuneHelper } from 'sprig/web'

const audioCtx = lazy(() => new AudioContext())
const volGain = lazy(() => {
	const volGain = audioCtx.createGain()
	volGain.connect(audioCtx.destination)
	effect(() => volGain.gain.value = 1 - +muted.value)
	return volGain
})

export function playTune(tune: Tune, number = 1): PlayTuneRes {
	const playingRef = { playing: true }
	playTuneHelper(tune, number, playingRef, audioCtx, volGain.__lazy_self)
	return {
		end() { playingRef.playing = false },
		isPlaying() { return playingRef.playing }
	}
}