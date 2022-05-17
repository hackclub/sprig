import { render, html, svg } from "../uhtml.js";
import { playNote } from "./playNote.js";
import styles from "./sequencer-styles.js";

// could add
// scale selection -> chromatic, minor, pentatonic
// length selection
// percussion

// done
// need to improve audio context handling
// line/drag drawing
// line/drag erasing

const instrumentColorMap = {
  "sine": "red",
  "square": "blue",
  "sawtooth": "orange",
  "triangle": "green",
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
}

export function playCellsOnBeat(cells, bpm, beat) {
  // notes :: note[]
  const notes = [];
  // note :: [ pitch, instrument]

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

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain" });

  var link = document.createElement("a"); // Or maybe get it from the current document
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}`;
  link.click();
  URL.revokeObjectURL(link);
}

function getSong(cells, bpm, length, noteMap) {

  const song = [];
  for (let i = 0; i < length; i++) song.push([]);

  for (const k in cells) {
    const [x, y] = k.split("_").map(Number);
    song[x].push([noteMap[y], 1000*60/bpm, cells[k]]);
  }

  return song;
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
    svg: null,
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
    let name = fileName[0];
    const extension = fileName[fileName.length - 1];

    if (extensions.length > 0 && extensions.includes(enxtension))
      throw "Extension not recongized: " + fileName;

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

  const ptsToD = pts => {
    const reducer = (acc, cur, i) => `${acc} ${i === 0 ? "M" : "L"} ${cur.join(",")}`;
    return pts.reduce(reducer, "");
  }

  const drawGrid = (numberX, numberY, target) => {
    const { left, right, bottom, top, width, height} = target.getBoundingClientRect();

    const lines = [];
    let lengthX = width/numberX;
    let lengthY = height/numberY;

    let i = 0;
    while ((i+1)*lengthX < width) {
      lines.push([
        [(i+1)*lengthX, 0],
        [(i+1)*lengthX, height],
      ])
      i++;
    }


    let j = 0;
    while ((j+1)*lengthY < height) {
      lines.push([
        [0, (j+1)*lengthY],
        [width, (j+1)*lengthY],
      ])
      j++;
    }

    return lines.map(line => svg`
      <path 
        stroke="black" 
        vector-effect="non-scaling-stroke" 
        stroke-width="1" d="${ptsToD(line)}"/>
    `)
  }


  const drawBeat = (state) => {
    const { left, right, bottom, top, width, height} = state.svg.getBoundingClientRect();
    const cellWidth = width/state.numberX;
    const cellHeight = height/state.numberY;


    return svg`
      <rect 
        fill=#72cacb33
        x=${state.beat*cellWidth} 
        y=${0} 
        width=${cellWidth} 
        height=${height}/>
    `
  }

  const drawCells = ({ cells, svg: container, numberX, numberY }) => {
    const { left, right, bottom, top, width, height} = container.getBoundingClientRect();
    const cellWidth = width/numberX;
    const cellHeight = height/numberY;

    const drawCell = ([x, y, color]) => {

      return svg`
        <rect 
          fill=${color}
          x=${x*cellWidth} 
          y=${y*cellHeight} 
          width=${cellWidth} 
          height=${cellHeight}/>
      `
    }

    const cellsToDraw = [];

    for (const key in cells) {
      const [x, y] = key.split("_").map(Number);
      const color = instrumentColorMap[cells[key]];
      cellsToDraw.push([ x, y, color ])
    }

    return cellsToDraw.map(drawCell);
  }

  const drawInstrumentSelection = (instrument, color) => {

    return html`
      <div 
        class="instrument" 
        style=${`
          background: ${color};
          border: ${state.instrument === instrument ? "2px solid black" : "none"};
          box-sizing: border-box;
          `} 
        @click=${() => { 
          state.instrument = instrument;
          r();
        }}>
        ${instrument}
        </div>
    `
  }

  const view = (state) => html`
    <style>
      html, body {
        margin: 0px;
      }

      .svg-container {
        width: 100%;
        height: 100%;
        flex: 1;
        background: white;
      }

      .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }

      .sequencer-toolbox {
        display: flex;
        min-height: 80px;
        max-height: 80px;
        background: lightgrey;
        justify-content: space-around;
        align-items: center;
      }

      .bpm {
        display: flex;
      }

      .instruments {
        display: flex;
        flex-wrap: wrap;
        min-width: 140px;
        justify-content: flex-end;
      }

      .instrument {
        color: white;
        height: 30px;
        display: flex;
        width: 70px;
        justify-content: center;
        align-items: center;
      }

      .bpm-control {
        cursor: pointer;
      }

      .bpm-control:hover {
        color: orange;
      }
    </style>
    <div class="container">
      <svg 
        class="svg-container" 
        @mousedown=${onDownSVG} 
        @mousemove=${onMoveSVG}
        @mouseup=${onUpSVG}>
        ${state.svg ? drawCells(state) : ""}
        ${state.svg ? drawBeat(state) : ""}
        ${state.svg ? drawGrid(state.numberX, state.numberY, state.svg) : ""}
      </svg>
      <div class="sequencer-toolbox">
        <div class="play-pause">
          <button @click=${() => {
            if (state.interval) {
              clearInterval(state.interval)
              state.interval = null;
            } else {
              state.interval = play();
            }
          }}>play/pause</button>
          <button @click=${() => {
            const song = getSong(state.cells, state.bpm, state.numberX, noteMap);

            downloadText("jam.json", JSON.stringify({ song, cells: state.cells, bpm: state.bpm }));
          }}>export</button>
        </div>
        <div class="bpm">
          <div style="padding-right: 10px;">BPM:</div>
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
            state.bpm = Number(e.target.value);
            state.data.bpm = state.bpm;
            if (state.interval) {
              clearInterval(state.interval);
              state.interval = play();
            }
            r();
          }} type="range" min="1" max="2000" .value=${state.bpm}>
          </input>
          <span style="width: 30px;">${state.bpm}</span>
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

  const getSVGPos = (e) => {
    const { left, right, bottom, top, width, height} = state.svg.getBoundingClientRect();
    const cellWidth = width/state.numberX;
    const cellHeight = height/state.numberY;

    const x = Math.floor(e.offsetX/cellWidth);
    const y = Math.floor(e.offsetY/cellHeight);

    return [x, y];
  }

  const onDownSVG = (e) => {
    let [x, y] = getSVGPos(e);
    
    x = Math.max(Math.min(x, state.numberX-1), 0);
    y = Math.max(Math.min(y, state.numberY-1), 0);

    const key = `${x}_${y}`;    

    if (key in state.cells && state.cells[key] === state.instrument) {
      delete state.cells[key];
      state.erasing = true;
    } else {
      state.cells[key] = state.instrument;
      const n = noteMap[y];
      const d = (1000*60)/state.bpm;
      playNote(n, d, state.instrument)
      state.drawing = true;
    }

    state.lastPt = [x, y];

    r();
  }

  const onMoveSVG = e => {
    const currentPt = getSVGPos(e);

    if (state.drawing || state.erasing) {
      const pts = line(state.lastPt, currentPt);
      pts.forEach(([x, y]) => {
        const key = `${x}_${y}`
        if (state.erasing) delete state.cells[key]
        else state.cells[key] = state.instrument;
      })
    }

    state.lastPt = currentPt;
    r();
  }

  const onUpSVG = e => {
    state.erasing = false;
    state.drawing = false;

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
    state.svg = target.querySelector("svg");

    r();
    // add events
    // window.addEventListener("resize", r);
    addDropUpload();

  }

  init(state);

  return {
    end() {
      if (state.interval) clearInterval(state.interval);
    },
    setTune(data) {
      const { cells, bpm } = data;
      state.cells = cells;
      state.bpm = bpm;
      state.data = data;
      console.log(state);
      r();
    },
    getTune() {
      return { cells: state.cells, bpm: state.bpm }
    }
  };
}