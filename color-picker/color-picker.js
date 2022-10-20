import { render, html } from "uhtml";
import { dispatch } from "../dispatch.js";
import { global_state } from "../global_state.js";
import { style } from "./style.js";
import { RGBA_to_hex, transparentBg } from "../palette.js";

export function createColorPicker(target) {
  const state = { color: '' };

  const r = () => render(target, html`
    <style>${style}</style>

    <div class="color-picker-outer">
      <h3>color picker:</h3>
      <div class="color-picker-inner">
        ${global_state.palette.map(drawColorButton)}
      </div>
    </div>
  `);

  const drawColorButton = (color) => {
    let style = `background-color: ${RGBA_to_hex(color[1])};`;
    color[1][3] === 0 ? style += `background-image: url("${transparentBg}");` : ``

    return html`
      <div
        class=${state.color === color[0] ? "active" : ""}
        style=${style}
        @click=${() => {
          state.color = color[0];
          dispatch("SET_EDITOR_TEXT", { text: state.color, range: global_state.editRange });
          r();
        }}>
      </div>
    `
  };

  r();
  return {
    loadInitValue({ text }) {
      if (global_state.palette.find(([key]) => key === text)) state.color = text;
      r();
    }
  };
}

class ColorPicker extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const methods = createColorPicker(shadow);
    for (const i in methods) this[i] = methods[i];
  }
}

customElements.define("color-picker", ColorPicker);
