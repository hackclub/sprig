// possible song formats

/* 
want to be able to 

- loop
- end tune
- play after

- trim whitespace?

*/

const song0 = [["a4", "c4"], [], ["c4"], ["c4"], []] // notes on each beat
// then also need number of beats per minute
// also now all notes are fixed length

const song1 = [
  [ ["a4", 3], ["c4", 1] ], 
  [ [] ], 
  [ ["c4", 1, "sine"] ], 
  [ ["c4", 1, "sine"] ], 
  []
] // notes on each beat

const song2 = [
  [ ["a4", 3, "sine"], ["c4", 1, "triangle"] ], 
  [], 
  [ ["c4"] ], 
  ["c4"], 
  []
] // notes on each beat



export async function playCells({ cells, bpm, numBeats }, n = 0) {
  // if n === 0 then loop else play n times

  const beatTime = (1000*60)/bpm;

  let ended = false;

  for (let i = 0; i < numBeats; i++) {
    if (ended) break;

    playCellsOnBeat(cells, bpm, i);
    // await one beat
    await setTimeout(() => {}, beatTime);
  }

  ended = true;

  return {
    play({ cells, bpm, numBeats }) {

    },
    end() {
      ended = true;
    }
  }
}