import { render, html } from "/libs/uhtml.js";
import { spriteTextToImageData } from "../engine/sprite.js";

export function createMapEditor(target) {
  const state = {
    legend: {}
  }

  const view = (state) => html`
    <link rel="stylesheet" href="./map-editor/map-styles.css">
    <div class="map-editor-container">
      <div class="canvas-container">
        hiiiii
      </div>
      <div class="sprites">
        ${Object.entries(state.legend).map(([name, sprite]) => html`
          ${name}<br>
        `)}
      </div>
    </div>
  `;

  const r = () => {
    render(target, view(state));
  };

  const init = (state) => {
    r();
  };

  init(state);

  return {
    loadInitValue({ text, legend }) {
      console.log(legend);
      state.legend = legend;
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