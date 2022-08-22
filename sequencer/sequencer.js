import { render, html } from "uhtml";
import { playNote } from "./playNote.js";
import { dispatch } from "../dispatch.js";
import { tuneToText, textToTune, tones } from '../engine/textTuneConverters.js';
import { global_state as globalState } from "../global_state.js";
import { style } from "./style.js";

// could add
// scale selection -> chromatic, minor, pentatonic
// length selection
// percussion

const instrumentColorMap = {
  sine: "#e03131",
  square: "#1971c2",
  sawtooth: "#e8590c",
  triangle: "#099268",
};

const instrumentDarkerColorMap = {
  sine: "#9a2222",
  square: "#195185",
  sawtooth: "#ad471f",
  triangle: "#116a4f"
}

const noteMap = {
  13: "c4",
  12: "d4",
  11: "e4",
  10: "f4",
  9: "g4",
  8: "a4",
  7: "b4",
  6: "c5",
  5: "d5",
  4: "e5",
  3: "f5",
  2: "g5",
  1: "a5",
  0: "b5",
};

export function playCellsOnBeat(cells, bpm, beat) {
  // notes :: note[]
  const notes = [];
  // note :: [ pitch, instrument ]

  Object
    .entries(cells)
    .forEach(([ k, v ]) => {
      const [x, y] = k.split("_").map(Number);
      if (x === beat) notes.push([ y, v ]);
    })

  notes.forEach(([note, instrument]) => {
    const n = noteMap[note];
    const d = (1000*60)/bpm;
    playNote(n, d, instrument)
  })
}

function cellsToTune(cells, bpm, beats) {

  const tune = [];
  const beatTime = 1000*60/bpm;
  const getNotes = (x) => Object.entries(cells)
    .filter(([k]) => k.split("_")[0] === x.toString())
    .map(([k, v]) => [Number(k.split("_")[1]), v]);
  for (let x = 0; x < beats; x++) {
    let rests = 0;
    while (getNotes(x).length === 0 && x < beats) {
      rests++;
      x++;
    }
    if (rests) tune.push([rests * beatTime]);
    if (x >= beats) break;

    const notes = getNotes(x);
    tune.push([beatTime, ...notes.map(([ y, instrument ]) => [ instrument, noteMap[y], beatTime ])].flat());
  }
  return tune;
}

function tuneToCells(tune) {
  const nonRestBeats = tune.filter(el => el.length > 1);
  if (!nonRestBeats.length) return {};
  const beatTime = nonRestBeats[0][0];
  
  const cells = {};
  let x = 0;
  for (const [duration, ...rest] of tune) {
    for (let i = 0; i < rest.length; i += 3) {
      const [instrument, note] = rest.slice(i, i + 2);
      const name = typeof note === "string"
        ? note.toLowerCase()
        : Object.entries(tones).find(([, v]) => v === note)[0].toLowerCase();
      const y = Object.entries(noteMap).find(([, v]) => v === name)[0];
      cells[`${x}_${y}`] = instrument;
    }

    if (!rest.length) {
      x += duration / beatTime;
    } else {
      x++;
    }
  }
  return cells;
}

function line(from, to) {
  const points = [];
  if (Math.abs(from[0] - to[0]) > Math.abs(from[1] - to[1])) {
    if (from[0] > to[0]) [from, to] = [to, from];
    let slope = (to[1] - from[1]) / (to[0] - from[0]);
    for (let [x, y] = from; x <= to[0]; x++) {
      points.push([x, Math.round(y)]);
      y += slope;
    }
  } else {
    if (from[1] > to[1]) [from, to] = [to, from];
    let slope = (to[0] - from[0]) / (to[1] - from[1]);
    for (let [x, y] = from; y <= to[1]; y++) {
      points.push([Math.round(x), y]);
      x += slope;
    }
  }
  return points;
}

export function createSequencer(target) {
  const state = {
    numberX: 32,
    numberY: 14,
    instrument: "sine",
    cells: {},
    beat: 0,
    bpm: 120,
    interval: null,
    lastPt: [0, 0],
    drawing: false,
    erasing: false,
    data: {}, // this is to pass bpm by reference from the game-lab
  };

  function upload(files, extensions = []) {
    let file = files[0];
    let fileName = file.name.split(".");
    const extension = fileName[fileName.length - 1];

    if (extensions.length > 0 && extensions.includes(enxtension))
      throw "Extension not recognized: " + fileName;

    readFile(file);
  }

  function readFile(file) {
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onloadend = (event) => {
      let raw = reader.result;

      const json = JSON.parse(raw);
      const { song, cells, bpm } = json;

      for (const cell in state.cells) {
        delete state.cells[cell];
      }

      for (const cell in cells) {
        state.cells[cell] = cells[cell];
      }

      state.bpm = bpm;
      state.data.cells = state.cells;
      state.data.bpm = state.bpm;
      state.data.song = song;
      r();
    };
  }

  function addDropUpload() {
    const container = target.querySelector(".container");
    
    container.addEventListener("drop", (e) => {
      let dt = e.dataTransfer;
      let files = dt.files;

      upload(files);

      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      e.cancelBubble = true;
      e.returnValue = false;
    });

    container.addEventListener("dragover", (e) => {
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      e.cancelBubble = true;
      e.returnValue = false;
    });
  }

  const cell = ({ cells, numberY }, x, y) => {
    const classes = ["cell"];
    if (x % 2 === 0) classes.push("beat");
    if (x % 8 === 0) classes.push("downbeat");
    if ((numberY - y) % 8 === 0) classes.push("root");

    const key = `${x}_${y}`;
    const color = instrumentColorMap[cells[key]] || "transparent";

    return html`
      <div
        class=${classes.join(" ")}
        style=${`background: ${color};`}
        @mousedown=${() => {
          if (key in state.cells && state.cells[key] === state.instrument) {
            delete state.cells[key];
            state.erasing = true;
          } else {
            state.cells[key] = state.instrument;
            const n = noteMap[y];
            const d = (1000*60)/state.bpm;
            playNote(n, d, state.instrument);
            state.drawing = true;
          }

          state.lastPt = [x, y];
          r();
        }}
        @mouseover=${() => {
          if (state.drawing || state.erasing) {
            const pts = line(state.lastPt, [x, y]);
            pts.forEach(([x, y]) => {
              const key = `${x}_${y}`
              if (state.erasing) delete state.cells[key]
              else {
                if (state.cells[key] !== state.instrument) {
                  const n = noteMap[y];
                  const d = (1000*60)/state.bpm;
                  playNote(n, d, state.instrument);
                }
                state.cells[key] = state.instrument;
              }
            })
          }

          state.lastPt = [x, y];
          r();
        }}
      />
    `;
  }

  const grid = (state) => {
    const { numberX, numberY, beat } = state;
    return new Array(numberX).fill(0).map((_, x) => html`
      <div class=${["column", beat === x ? "playhead" : ""].join(" ")}>
        ${new Array(numberY).fill(0).map((_, y) => cell(state, x, y))}
      </div>
    `);
  }

  const drawInstrumentSelection = (instrument) => {
    const instrumentSymbol = { 
      "sine": "~", 
      "triangle": "^",
      "square": "-",
      "sawtooth": "/"
    }[instrument];
    const shortName = {
      "sine": "sin",
      "triangle": "tri",
      "square": "sqr",
      "sawtooth": "saw"
    }

    return html`
      <button 
        class=${["instrument", state.instrument === instrument ? "pressed" : ""].join(" ")}
        style=${`
          background: ${instrumentColorMap[instrument]};
          --shadow-color: ${instrumentDarkerColorMap[instrument]};
        `}
        @click=${() => { 
          state.instrument = instrument;
          r();
        }}
      >
        ${instrumentSymbol}
        ${shortName[instrument]}
      </button>
    `
  }

  const view = (state) => html`
    <style>${style}</style>
    <div class="container">
      <div class="sequencer-grid">
        ${grid(state)}
      </div>

      <div class="sequencer-toolbox">
        <div class="play-pause">
          <button
            @click=${() => {
              if (state.interval) {
                clearInterval(state.interval)
                state.interval = null;
              } else {
                state.interval = play();
              }
              r();
            }}
            class=${["accent", state.interval ? "pressed" : ""].join(" ")}
          >
            <ion-icon name="play" style="vertical-align: middle;" />
            play
          </button>
        </div>

        <div class="bpm">
          <div style="padding-right: 10px;">speed:</div>
          <div 
            class="bpm-control" 
            style="padding-right: 5px;" 
            @click=${() => {
              state.bpm = Math.max(state.bpm - 1, 1);
              state.data.bpm = state.bpm;
              if (state.interval) {
                clearInterval(state.interval);
                state.interval = play();
              }

              r();
            }}>-</div>
          <input @input=${(e) => {
            state.bpm = Number(e.target.value) * 2;
            state.data.bpm = state.bpm;
            if (state.interval) {
              clearInterval(state.interval);
              state.interval = play();
            }
            r();
          }} type="range" min="1" max="1000" .value=${state.bpm / 2}>
          </input>
          <span style="width: 30px;">${state.bpm / 2} bpm</span>
          <div 
            class="bpm-control" 
            style="padding-left: 5px;" 
            @click=${() => {
              state.bpm = Math.min(state.bpm + 1, 2000);
              state.data.bpm = state.bpm;
              if (state.interval) {
                clearInterval(state.interval);
                state.interval = play();
              }
              r();
            }}>+</div>
        </div>

        <div class="instruments">
          ${Object
            .entries(instrumentColorMap)
            .map(x => drawInstrumentSelection(x[0], x[1]))}
        </div>
      </div>
    </div>
  `;

  const setCodeText = () => {
    if (!state.erasing && !state.drawing) return;
    state.erasing = false;
    state.drawing = false;
    let text = tuneToText(cellsToTune(state.cells, state.bpm, state.numberX));
    text = "\n" + text.trim();
    dispatch("SET_EDITOR_TEXT", { text, range: globalState.editRange });
    r();
  }

  const r = () => {
    render(target, view(state));
  };

  const play = () => setInterval(() => {
    state.beat = (state.beat+1) % (state.numberX);
    // play song
    playCellsOnBeat(state.cells, state.bpm, state.beat);
    r();
  }, (1000*60)/state.bpm)

  const init = (state) => {
    r();
    addDropUpload();

    const grid = target.querySelector(".sequencer-grid");
    grid.addEventListener("mouseup", setCodeText);
    grid.addEventListener("mouseleave", setCodeText);
  }

  init(state);

  return {
    loadInitValue({ text }) {
      state.cells = tuneToCells(textToTune(text));
      let num = text.match(/(.+):/);
      if (num) num = 60*1000/Number(num[1]);
      else num = 120;
      state.bpm = Math.round(num);
      r();
    },
    end() {
      if (state.interval) clearInterval(state.interval);
    },
    setTune(data) {
      const { cells, bpm } = data;
      state.cells = cells;
      state.bpm = bpm;
      state.data = data;
      r();
    },
    getTune() {
      return { cells: state.cells, bpm: state.bpm }
    }
  };
}

class Sequencer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});

    const methods = createSequencer(shadow);
    for (let i in methods) {
      this[i] = methods[i];
    }
  }

  disconnectedCallback() {
    this.end();
  }
}

customElements.define("sequencer-editor", Sequencer);

