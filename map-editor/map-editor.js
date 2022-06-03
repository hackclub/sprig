import { render, html } from "/libs/uhtml.js";
import { spriteTextToImageData } from "../engine/sprite.js";

const SPRITE_SIZE = 16;

export function createMapEditor(target) {
  const state = {
    canvas: null,
    width: 10,
    height: 6,
    cells: [[]],
    legend: {}
  }

  const view = (state) => html`
    <link rel="stylesheet" href="./map-editor/map-styles.css">
    <div class="map-editor-container">
      <div class="canvas-container">
        <canvas></canvas>
      </div>
      <div class="sprites">
        ${Object.entries(state.legend).map(([name, sprite]) => html`
          <sprite-preview text="${sprite.text}" />
        `)}
      </div>
    </div>
  `;
  const r = () => { render(target, view(state)); };

  const resizeCanvas = () => {
    state.canvas.width = state.width * SPRITE_SIZE;
    state.canvas.height = state.height * SPRITE_SIZE;
  };

  const draw = () => {
    const ctx = state.canvas.getContext("2d");
    for (let y = 0; y < state.height; y++) {
      for (let x = 0; x < state.width; x++) {
        if (!state.cells[y]) continue;
        const sprite = state.legend[state.cells[y][x]];
        if (!sprite) continue;
        ctx.putImageData(sprite.imageData, x * SPRITE_SIZE, y * SPRITE_SIZE, 0, 0, SPRITE_SIZE, SPRITE_SIZE);
      }
    }
  };

  const init = () => {
    r();
    state.canvas = target.querySelector(".canvas-container > canvas");
    resizeCanvas();
    draw();
  };
  init();

  return {
    loadInitValue({ text, legend }) {
      state.legend = Object.fromEntries(
        Object.entries(legend)
          .map(([ key, sprite ]) => [ key, { ...sprite, imageData: spriteTextToImageData(sprite.text) } ])
      );

      state.cells = text.trim().split("\n").map(x => [...x.trim()]);
      state.width = state.cells[0].length;
      state.height = state.cells.length;
      resizeCanvas();
      draw();

      r();
    },
    end() {
      console.log("Map editor unmount");
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