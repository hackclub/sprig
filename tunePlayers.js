import { playCellsOnBeat } from "./sequencer/sequencer.js";

function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function playTuneHelper(tunes, playingRef) {
  for (let i = 0; i < 32 * tunes.length; i++) {
    if (!playingRef.playing) break;
    const cellsIndex = Math.floor(i / 32);
    const { cells, bpm } = tunes[cellsIndex];
    playCellsOnBeat(cells, bpm, i % 32);
    await wait((1000 * 60) / bpm);
  }
}

export function playTune() {
  let playingRef = { playing: true };

  playTuneHelper(arguments, playingRef);

  return {
    end() {
      playingRef.playing = false;
    },
    isPlaying() {
      return playingRef.playing;
    },
  };
}

export async function loopTuneHelper(tunes, playingRef) {
  let i = 0;
  while (playingRef.playing) {
    const cellsIndex = Math.floor(i / 32) % tunes.length;
    const { cells, bpm } = tunes[cellsIndex];

    playCellsOnBeat(cells, bpm, i % 32);

    i++;

    await wait((1000 * 60) / bpm);
  }
}

export function loopTune() {
  let playingRef = { playing: true };

  loopTuneHelper(arguments, playingRef);

  return {
    end() {
      playingRef.playing = false;
    },
    isPlaying() {
      return playingRef.playing;
    },
  };
}
