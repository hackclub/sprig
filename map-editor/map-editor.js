import { render, html } from "/libs/uhtml.js";

export function createMapEditor(target) {
  const state = {}

  const view = (state) => html`
    <link rel="stylesheet" href="./map-editor/map-styles.css">
    <div class="map-editor-container">
      hiiiii
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
    end() {
      console.log("Map editor unmount");
    },
  };
}

class MapEditor extends HTMLElement {
  constructor() {
    super();
    console.log(this.end)
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