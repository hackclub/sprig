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
    mouseDown: 0,
    updateTextDebounce: null,
    cells: [[]],
    legend: {},
    palette: global_state.palette,
  }
  const endEffects = [];

  const view = (state) => html`
    <style>${style}</style>
    <div class="map-editor-container">
      <div class="canvas-container">
        <canvas></canvas>
      </div>
      <div class="sprites">
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
    </div>
  `;
  const r = () => { render(target, view(state)); };

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

  const onMouseUpdate = (e) => {
    const [mx, my] = [e.pageX - state.canvas.offsetLeft, e.pageY - state.canvas.offsetTop];
    const [tw, th] = [state.canvas.offsetWidth / state.width, state.canvas.offsetHeight / state.height];
    const [x, y] = [Math.floor(mx / tw), Math.floor(my / th)];

    if (state.mouseDown > 0
      && (state.legend[state.activeBitmap] || state.activeBitmap === ".")
      && x < state.width && y < state.height
      && x >= 0 && y >= 0
      && (state.cells[y] && state.cells[y][x]) !== state.activeBitmap
    ) {
      state.cells[y][x] = state.activeBitmap;
      draw();

      clearTimeout(state.updateTextDebounce);
      state.updateTextDebounce = setTimeout(updateText, 100);
    }
  }

  const init = () => {
    r();
    state.canvas = target.querySelector(".canvas-container > canvas");

    const mouseDown = (e) => {
      state.mouseDown++;
      onMouseUpdate(e);
    };
    document.addEventListener("mousedown", mouseDown);
    endEffects.push(() => document.removeEventListener("mousedown", mouseDown));
    
    const mouseUp = (e) => {
      state.mouseDown = Math.max(0, state.mouseDown - 1); // Just in case :)
    };
    document.addEventListener("mouseup", mouseUp);
    endEffects.push(() => document.removeEventListener("mouseup", mouseUp));

    state.canvas.addEventListener("mousemove", onMouseUpdate);

    resizeCanvas();
    draw();
  };
  init();

  return {
    loadInitValue({ text, bitmaps }) {
      const legend = {};

      for (let k in bitmaps) {
        const val = bitmaps[k];
        if (val.type === "or") continue;
        if (val.type === "and") {
          // need to overlay the text?
          let textArr = [];
          val.list.forEach(sprite => {
            const spriteText = bitmaps[sprite].text.replace(/ +?/g, '');;
            if (textArr.length === 0) textArr = spriteText.split("");
            else {
              spriteText.split("").forEach((ch, i) => {
                if (ch === ".") return;
                textArr[i] = ch;
              })
            }
          })

          const text = textArr.join("")

          legend[k] = {
            text,
            imageData: bitmapTextToImageData(text, state.palette)
          }
        } else {
          legend[k] = {
            ...val,
            imageData: bitmapTextToImageData(val.text, state.palette)
          }
        }
      }

      state.legend = legend;
      Object.fromEntries(
        Object.entries(bitmaps)
          .filter(([, bitmap]) => !!bitmap.text)
          .map(([ key, bitmap ]) => [ key, { ...bitmap, imageData: bitmapTextToImageData(bitmap.text, state.palette) } ])
      );
      
      if (text) {
        state.cells = text.trim().split("\n").map(x => [...x.trim()]);
        state.width = state.cells[0].length;
        state.height = state.cells.length;
      }
      
      resizeCanvas();
      draw();
      r();
    },
    end() {
      endEffects.forEach(e => e());
    },
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