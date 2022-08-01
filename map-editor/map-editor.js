import { render, html } from "uhtml";
import { bitmapTextToImageData } from "../engine/bitmap.js";
import { dispatch } from "../dispatch.js";
import { global_state } from "../global_state.js";
import { style } from "./style.js";

const SPRITE_SIZE = 16;

export function createMapEditor(target) {
  const state = {
    canvas: null,
    width: 10,
    height: 6,
    activeBitmap: "",
    mouseDown: false,
    cells: [[]],
    legend: {},
    palette: global_state.palette,
    hoveredCell: null
  }

  const view = (state) => html`
    <style>${style}</style>
    <div 
      class="map-editor-container"
      @mousedown=${(e) => { state.mousedown = true; mouseDraw(e); }}
      @mousemove=${mouseDraw}
      @mouseup=${onMouseUp}>
      <div class="canvas-container">
        <svg class="grid">
          <path stroke="#7a7e7c" stroke-width=".2" d=""/>
          <rect x="0" y="0" width="0" height="0" stroke="#ebc64f" fill="none" stroke-width=".5"/>
        </svg>
        <canvas></canvas>
      </div>
      <div class="tools">
        <div class="tiles">
          ${Object.entries(state.legend).map(([name, bitmap]) => html`<button
              class=${"sprite-button " + (state.activeBitmap === name ? "active" : "")}
              @click=${() => { state.activeBitmap = name; r() }}
            >
              <bitmap-preview text="${bitmap.text}" />
            </button>
          `)}<button
            class=${"sprite-button " + (state.activeBitmap === "." ? "active" : "")}
            @click=${() => { state.activeBitmap = "."; r() }}
          />
        </div>
        <div class="action-button-container">
          <button class="action-button" @mousedown=${addRow}>add row</buttton>
          <button class="action-button" @mousedown=${addCol}>add col</buttton>
          <button class="action-button" @mousedown=${delRow}>delete row</buttton>
          <button class="action-button" @mousedown=${delCol}>delete col</buttton>
        </div>
      </div>
    </div>
  `;

  const BACKGROUND_BLUE = "#b4e2fc87";
  const BACKGROUND_WHITE = "#e3e3e34a";

  const draw = () => {
    const ctx = state.canvas.getContext("2d");
    ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);

    for (let y = 0; y < state.height; y++) {
      for (let x = 0; x < state.width; x++) {
        if (!state.cells[y]) continue;
        const sprite = state.legend[state.cells[y][x]];
        if (!sprite) continue;
        ctx.putImageData(sprite.imageData, x * SPRITE_SIZE, y * SPRITE_SIZE, 0, 0, SPRITE_SIZE, SPRITE_SIZE);
      }
    }
  };

  const resizeCanvas = () => {
    state.canvas.width = state.width * SPRITE_SIZE;
    state.canvas.height = state.height * SPRITE_SIZE;

    if (state.cells.length < state.height) {
      while (state.cells.length < state.height) {
        state.cells.push([]);
      }
    } else if (state.cells.length > state.height) {
      state.cells = state.cells.slice(0, state.height);
    }

    for (let y = 0; y < state.height; y++) {
      if (state.cells[y].length < state.width) {
        state.cells[y] = state.cells[y].concat(new Array(state.width - state.cells[y].length).fill("."));
      } else if (state.cells[y].length > state.width) {
        state.cells[y] = state.cells[y].slice(0, state.width);
      }
    }
  };

  const drawGrid = () => {
    const d = [];

    const xStep = state.canvas.width/state.width;
    const yStep = state.canvas.height/state.height;

    for (let y = 1; y < state.height; y++) {
      d.push(`M ${0}, ${y*yStep}`);
      d.push(`L ${state.canvas.width}, ${y*yStep}`);
    }

    for (let x = 1; x < state.width; x++) {
      d.push(`M ${x*xStep}, ${0}`);
      d.push(`L ${x*xStep}, ${state.canvas.height}`);
    }
    
    const svg = target.querySelector(".grid");
    const path = target.querySelector(".grid > path");
    if (!path || !svg) return;
    path.setAttribute("d", d.join(" "))
    svg.setAttribute("viewBox", `0 0 ${state.canvas.width} ${state.canvas.height}`);
  }

  const drawHoveredCell = () => {
    const rect = target.querySelector(".grid > rect");
    if (!rect) return;

    const xStep = state.canvas.width/state.width;
    const yStep = state.canvas.height/state.height;

    const [ x, y ] = state.hoveredCell;
    rect.setAttribute("stroke", x < 0 || x >= state.width || y < 0 || y >= state.height ? "none" : "#ebc64f");
    rect.setAttribute("width", xStep);
    rect.setAttribute("height", yStep);
    rect.setAttribute("x", x*xStep);
    rect.setAttribute("y", y*yStep);
  }

  const r = () => { 
    render(target, view(state)); 

    state.canvas = target.querySelector(".canvas-container > canvas");
    resizeCanvas();
    draw();
    sizeCanvas();
    drawGrid();
  };

  const addRow = () => {
    const newRow = [];
    for (let i = 0; i < state.width; i++) newRow.push(".");
    state.cells.push(newRow);
    state.height++;
    updateText();
    r();
  }

  const delRow = () => {
    if (state.height === 1) return;
    state.cells = state.cells.slice(0, state.cells.length - 1);
    state.height--;
    updateText();
    r();
  }

  const addCol = () => {
    state.cells.forEach(row => {
      row.push(".");
    })
    state.width++;
    updateText();
    r();
  }

  const delCol = () => {
    if (state.width === 1) return;
    state.cells.forEach((row, i) => {
      state.cells[i] = row.slice(0, row.length - 1);
    })
    state.width--;
    updateText();
    r();
  }

  const updateText = () => {
    let text = "";
    for (let y = 0; y < state.height; y++) {
      for (let x = 0; x < state.width; x++) {
        text += (state.cells[y] && state.cells[y][x]) || ".";
      }
      text += "\n";
    }

    text = "\n" + text.trim();

    dispatch("SET_EDITOR_TEXT", { text, range: global_state.editRange });
  }

  function sizeCanvas() {
    const canvas = state.canvas;
    if (!canvas) return;
    canvas.style.removeProperty("height");
    canvas.style.removeProperty("width");
    canvas.style.removeProperty("aspect-ratio");
    const container = canvas.parentNode;
    const { width, height } = container.getBoundingClientRect();
    const ar = canvas.width/canvas.height;
    canvas.style["aspect-ratio"] = ar;
    if (height*ar > width) {
      canvas.style["width"] = "100%";
    } else {
      canvas.style["height"] = "100%";
    }

    const svg = container.querySelector(".grid");
    if (!svg) return;
    svg.style.removeProperty("height");
    svg.style.removeProperty("width");
    svg.style.removeProperty("aspect-ratio");
    svg.style["aspect-ratio"] = ar;
    if (height*ar > width) {
      svg.style["width"] = "100%";
    } else {
      svg.style["height"] = "100%";
    }
  }

  const mouseDraw = (e) => {
    // const [mx, my] = [e.pageX - state.canvas.offsetLeft, e.pageY - state.canvas.offsetTop];
    // const [tw, th] = [state.canvas.offsetWidth / state.width, state.canvas.offsetHeight / state.height];
    // const [x, y] = [Math.floor(mx / tw), Math.floor(my / th)];

    const rect = state.canvas.getBoundingClientRect();
    const absX = e.clientX - rect.left;
    const absY = e.clientY - rect.top;
    const xStep = rect.width/state.width;
    const yStep = rect.height/state.height;
    const x = Math.floor(absX/xStep);
    const y = Math.floor(absY/yStep);

    state.hoveredCell = [ x, y ];
    drawHoveredCell();

    if (state.mousedown
      && (state.legend[state.activeBitmap] || state.activeBitmap === ".")
      && x < state.width && y < state.height
      && x >= 0 && y >= 0
      && (state.cells[y] && state.cells[y][x]) !== state.activeBitmap
    ) {
      state.cells[y][x] = state.activeBitmap;
      r();
    }
  }

  const onMouseUp = () => {
    if (state.mousedown) updateText();
    state.mousedown = false;
  }

  const init = () => {
    r();
    new ResizeObserver(sizeCanvas).observe(target.querySelector("div"));
  };

  init();

  return {
    loadInitValue({ text, bitmaps }) {
      const legend = {};
      console.log(text, bitmaps);

      bitmaps.forEach( (x, i) => {
        const k = x[0];
        const val = x[1];

        if (val.length > 0) legend[k] = {
          text: val,
          imageData: bitmapTextToImageData(val, state.palette)
        }
      })

      state.legend = legend;
      
      if (text) {
        state.cells = text.trim().split("\n").map(x => [...x.trim()]);
        state.width = state.cells[0].length;
        state.height = state.cells.length;
      }
      
      r();
    },
    end() {},
  };
}

class MapEditor extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const methods = createMapEditor(shadow);
    for (const i in methods) {
      this[i] = methods[i];
    }
  }

  disconnectedCallback() {
    this.end();
  }
}

customElements.define("map-editor", MapEditor);
