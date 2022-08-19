import { Serial } from "./upload/serial.js"
import { transfer } from "./upload/ymodem.js"

let serial;

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

const imports = `
const {
  /* sprite interactions */ setSolids, setPushables,
  /*              see also: sprite.x +=, sprite.y += */

  /* art */ setLegend, setBackground,
  /* text */ addText, clearText,

  /*   spawn sprites */ setMap, addSprite,
  /* despawn sprites */ clearTile, /* sprite.remove() */

  /* tile queries */ getGrid, getTile, getFirst, getAll, tilesWith,
  /* see also: sprite.type */

  /* map dimensions */ width, height,

  /* constructors */ bitmap, tune, map,

  /* input handling */ onInput, afterInput,

  /* how much sprite has moved since last onInput: sprite.dx, sprite.dy */
} = require("engine");
`;

const startupSound = `
const tones = {
  "B0": 31,
  "C1": 33,
  "C#1": 35,
  "D1": 37,
  "D#1": 39,
  "E1": 41,
  "F1": 44,
  "F#1": 46,
  "G1": 49,
  "G#1": 52,
  "A1": 55,
  "A#1": 58,
  "B1": 62,
  "C2": 65,
  "C#2": 69,
  "D2": 73,
  "D#2": 78,
  "E2": 82,
  "F2": 87,
  "F#2": 93,
  "G2": 98,
  "G#2": 104,
  "A2": 110,
  "A#2": 117,
  "B2": 123,
  "C3": 131,
  "C#3": 139,
  "D3": 147,
  "D#3": 156,
  "E3": 165,
  "F3": 175,
  "F#3": 185,
  "G3": 196,
  "G#3": 208,
  "A3": 220,
  "A#3": 233,
  "B3": 247,
  "C4": 262,
  "C#4": 277,
  "D4": 294,
  "D#4": 311,
  "E4": 330,
  "F4": 349,
  "F#4": 370,
  "G4": 392,
  "G#4": 415,
  "A4": 440,
  "A#4": 466,
  "B4": 494,
  "C5": 523,
  "C#5": 554,
  "D5": 587,
  "D#5": 622,
  "E5": 659,
  "F5": 698,
  "F#5": 740,
  "G5": 784,
  "G#5": 831,
  "A5": 880,
  "A#5": 932,
  "B5": 988,
  "C6": 1047,
  "C#6": 1109,
  "D6": 1175,
  "D#6": 1245,
  "E6": 1319,
  "F6": 1397,
  "F#6": 1480,
  "G6": 1568,
  "G#6": 1661,
  "A6": 1760,
  "A#6": 1865,
  "B6": 1976,
  "C7": 2093,
  "C#7": 2217,
  "D7": 2349,
  "D#7": 2489,
  "E7": 2637,
  "F7": 2794,
  "F#7": 2960,
  "G7": 3136,
  "G#7": 3322,
  "A7": 3520,
  "A#7": 3729,
  "B7": 3951,
  "C8": 4186,
  "C#8": 4435,
  "D8": 4699,
  "D#8": 4978
};

const instrumentKey = {
  '~': 'sine',
  '-': 'square',
  '^': 'triangle',
  '/': 'sawtooth',
};

const reverseInstrumentKey = Object.fromEntries(Object.entries(instrumentKey).map(([k, v]) => [v, k]));

function textToTune(text) {
  const elements = text.replace(/\s/g, '').split(',');
  const tune = [];

  for (const element of elements) {
    if (!element) continue;
    const [durationRaw, notesRaw] = element.split(':');
    const duration = Math.round(parseInt(durationRaw));
    const notes = (notesRaw || '').split('+').map((noteRaw) => {
      if (!noteRaw) return [];
      const [, pitchRaw, instrumentRaw, durationRaw] = noteRaw.match(/^(.+)([~\-^\/])(.+)$/);
      return [
        instrumentKey[instrumentRaw],
        isNaN(parseInt(pitchRaw, 10)) ? pitchRaw : parseInt(pitchRaw, 10),
        parseInt(durationRaw, 10)
      ];
    });
    tune.push([duration, ...notes].flat());
  }

  return tune;
}

const sleep = async (duration) => new Promise(_ => setTimeout(_, duration))

const INSTRUMENTS = ["sine", "triangle", "square", "sawtooth"];

const audio = require("i2saudio");
function playTuneHelper(tune, number, playingRef) {
  for (let i = 0; i < tune.length*number; i++) {
    const index = i%tune.length;
    if (!playingRef.playing) break;
    const noteSet = tune[index];
    const sleepTime = noteSet[0];
    
    for (let j = 1; j < noteSet.length; j += 3) {
      const instrument = noteSet[j];
      const note = noteSet[j+1];
      const duration = noteSet[j+2];

      const f = typeof note === "string" 
        ? tones[note.toUpperCase()]
        : 2**((note-69)/12)*440;

      const i = INSTRUMENTS.indexOf(instrument);
      if ((i >= 0) && f !== undefined)
        audio.push_freq(f, i);
    }
    audio.wait(sleepTime);
  }
}

function playTune(tune, number = 1) {
  let playingRef = { playing: true };

  playTuneHelper(tune, number, playingRef);

  return {
    end() {
      playingRef.playing = false;
    },
    isPlaying() {
      return playingRef.playing;
    },
  };
}


playTune(textToTune(\`
150: c5~150 + g4~150 + e5^150,
150,
150: g5^150,
150,
150: b4~150 + d5^150 + g4~150,
150,
150: e5^150,
150,
150: a4~150 + f4~150 + c5^150,
150,
150: g4~150 + b4~150 + d5^150,
150,
150: g4~150 + e4~150 + c4~150 + e5^150 + c5~150 + g5~150,
2850
\`));
// Syntax:
// 500: 64.4~500 + c5~1000
// [500, "sine", 64.4, 500, "sine", "c5", 1000]
// Comma between each tune element. Whitespace ignored.
`;

export async function upload(code) {
  if (!serial) {
    const port = await navigator.serial.requestPort();
    serial = new Serial(port);
    await serial.open({ baudRate: 115200 });

    let respStr;
    serial.on("data", t => {
      for (let c of t) {
        if (c == 10) return;
        if (c == 13) {
          console.log(respStr);
          respStr = '';
        }
        else respStr += String.fromCharCode(c);
      }
    })

    serial.write("\r.hi\r");
  }

  await serial.write("\r");
  await serial.write(".flash -w\r");
  await delay(500);

  const result = await transfer(
    serial,
    "code",
    new TextEncoder().encode(startupSound + imports + code)
  );
  console.log('ymodem transfer result: ', result);
  await delay(500);
  serial.write("\r.load\r");
}
