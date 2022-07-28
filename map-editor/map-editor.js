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
  }

  const view = (state) => html`
    <style>${style}</style>
    <div 
      class="map-editor-container"
      @mousedown=${(e) => { state.mousedown = true; mouseDraw(e); }}
      @mousemove=${mouseDraw}
      @mouseup=${onMouseUp}>
      <div class="canvas-container">
        <svg class="grid"><path stroke="#7a7e7c" stroke-width=".2" d=""/></svg>
        <canvas></canvas>
      </div>
      <div class="tools">
        <div>
          ${Object.entries(state.legend).map(([name, bitmap]) => html`<button
              class=${state.activeBitmap === name ? "active" : ""}
              @click=${() => { state.activeBitmap = name; r() }}
            >
              <bitmap-preview text="${bitmap.text}" />
            </button>
          `)}<button
            class=${state.activeBitmap === "." ? "active" : ""}
            @click=${() => { state.activeBitmap = "."; r() }}
          />
        </div>
        <div>
          <button @mousedown=${addRow}>add row</buttton>
          <button @mousedown=${delRow}>delete row</buttton>
          <button @mousedown=${addCol}>add column</buttton>
          <button @mousedown=${delCol}>delete column</buttton>
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

        // show grid

        /* checkerboard */
        // const bgColor =
        //   (x % 2 === 0 && y % 2 === 1) || (x % 2 === 1 && y % 2 === 0)
        //     ? BACKGROUND_BLUE
        //     : BACKGROUND_WHITE;
        // ctx.fillStyle = bgColor;
        // ctx.fillRect(x * SPRITE_SIZE, y * SPRITE_SIZE, SPRITE_SIZE, SPRITE_SIZE);
        
        /* lines */



        if (!state.cells[y]) continue;
        const sprite = state.legend[state.cells[y][x]];
        if (!sprite) continue;
        ctx.putImageData(sprite.imageData, x * SPRITE_SIZE, y * SPRITE_SIZE, 0, 0, SPRITE_SIZE, SPRITE_SIZE);
      }
    }
    
    // ctx.strokeStyle = "#787878";
    // ctx.lineWidth = .8;

    // ctx.beginPath();
    // for (let y = 1; y < state.height; y++) {
    //   ctx.moveTo(0, y*SPRITE_SIZE)
    //   ctx.lineTo(state.width*SPRITE_SIZE, y*SPRITE_SIZE);
    // }

    // for (let x = 1; x < state.width; x++) {
    //   ctx.moveTo(x*SPRITE_SIZE, 0)
    //   ctx.lineTo(x*SPRITE_SIZE, state.height*SPRITE_SIZE);
    // }
    
    // ctx.stroke();
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
    // const ctx = state.canvas.getContext("2d");
    // ctx.strokeStyle = "#787878";
    // ctx.lineWidth = 1;

    const xStep = state.canvas.width/state.width;
    const yStep = state.canvas.height/state.height;

    // ctx.beginPath();
    for (let y = 1; y < state.height; y++) {
      d.push(`M ${0}, ${y*yStep}`);
      d.push(`L ${state.canvas.width}, ${y*yStep}`);
      // ctx.moveTo(0, y*yStep)
      // ctx.lineTo(state.canvas.width, y*yStep);
    }

    for (let x = 1; x < state.width; x++) {
      d.push(`M ${x*xStep}, ${0}`);
      d.push(`L ${x*xStep}, ${state.canvas.height}`);
      // ctx.moveTo(x*xStep, 0)
      // ctx.lineTo(x*xStep, state.canvas.height);
    }
    
    const svg = target.querySelector(".grid");
    const path = target.querySelector(".grid > path");
    if (!path || !svg) return;
    path.setAttribute("d", d.join(" "))
    svg.setAttribute("viewBox", `0 0 ${state.canvas.width} ${state.canvas.height}`);
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
