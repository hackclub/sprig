import { html } from "./libs/uhtml.js";
import { dispatch } from "./dispatch.js";

import { docs } from "./views/docs.js";
import "./pixel-editor/pixel-editor.js";
import "./sequencer/sequencer.js";
import "./map-editor/map-editor.js";
import "./views/sprite-preview.js";

export const view = (state) => html`
  ${menu(state)}
  <div class="main-container">
    <div class="code-container">
      <div id="code-editor"></div>
      <div class=${["logs", state.errorInfo ? "erred" : ""].join(" ")}>
        ${state.logs.map(x => html`${x}<br>`)}
      </div>
    </div>
    <div class="vertical-bar" aria-hidden="true"></div>
    <div class="game-output">
      <div class="game-container">
        <canvas class="game-canvas"></canvas>
      </div>
      <div class="docs">
        ${docs(state)}
      </div>
    </div>
  </div>
  <div class=${["asset-editor-container", state.editor ? "" : "hide"].join(" ")}>
    <button
      class="close"
      @click=${() => dispatch("SET_EDITOR", null)}>
      close
    </button>
    <div class="asset-editor-content">
      ${
        {
          "sprite": html`<pixel-editor id="asset-editor"></pixel-editor>`,
          "sequencer": html`<sequencer-editor id="asset-editor"></sequencer-editor>`,
          "map": html`<map-editor id="asset-editor"></map-editor>`,
          [undefined]: ""
        }[state.editor?.type]
      }
    </div>
  </div>
`

const sampleMenuItem = sample => html`
  <a class="sample-menu-item" href=${sample.link}>${sample.name}</a>
`

const menu = (state) => html`
  <div class="menu">
    <div 
      class="menu-item menu-name" 
      contenteditable 
      spellcheck="false"
      @blur=${e => dispatch("SET_NAME", { name: e.target.innerText })}>${state.name}</div>
    <a class="menu-item" href="https://www.github.com/hackclub/gamelab">github</a>
    <div class="menu-item dropdown-container">
      export
      <div class="dropdown-list">
        <div @click=${e => dispatch("SAVE_TO_FILE")}>js</div>
        <div>TODO: link</div>
        <div>TODO: html</div>
      </div>
    </div>
    <div class="menu-item dropdown-container">
      samples
      <div class="dropdown-list">
        ${state.samples.map(drawSample)}
      </div>
    </div>
    <div class="menu-item docs-trigger">docs</div>
    <div 
      class="menu-item" 
      @click=${() => dispatch("UPLOAD")}>
      upload
    </div>
    <div 
      class="menu-item" 
      @click=${() => dispatch("RUN")}>
      run
    </div>
  </div>
`

const drawSample = ({ name, link }) => {
  return html`
    <a 
      class="menu-item" 
      href=${link}>
      ${name}
    </a>
  `
}
