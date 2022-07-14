import { html } from "./libs/uhtml.js";
import { dispatch } from "./dispatch.js";
import { saveGame } from "./saveGame.js"

import { docs } from "./views/docs.js";
import "./pixel-editor/pixel-editor.js";
import "./sequencer/sequencer.js";
import "./map-editor/map-editor.js";
import "./views/bitmap-preview.js";

export const view = (state) => html`
  ${menu(state)}

  <div class="main-container">
    <div class="code-container">
      <div id="code-editor"></div>
      <div class=${["logs", state.errorInfo ? "erred" : ""].join(" ")}>
        ${state.logs.map(x => html`${x}<br>`)}
      </div>
    </div>
    
    <div class="game-docs-container">
      <div class="game-canvas-container">
        <canvas class="game-canvas"></canvas>
      </div>
      <div class="docs">
        ${docs(state)}
      </div>
    </div>

    <div class="vertical-bar"></div>
  </div>

  <div class=${["asset-editor-container", state.editor ? "" : "hide"].join(" ")}  @click=${(event) => {
    // Click on overlay or close button:
    for (const item of event.composedPath()) {
      if (item.classList && item.classList.contains("asset-editor-content")) return;
    }
    dispatch("SET_ASSET_EDITOR", { type: null, text: null })
  }}>
    <button class="close"><ion-icon icon="close" /></button>
    <div class="asset-editor-content">
      ${
        {
          "bitmap": html`<pixel-editor id="asset-editor"></pixel-editor>`,
          "sequencer": html`<sequencer-editor id="asset-editor"></sequencer-editor>`,
          "map": html`<map-editor id="asset-editor"></map-editor>`,
          [undefined]: ""
        }[state.editor]
      }
    </div>
  </div>
`

const sampleMenuItem = sample => html`
  <a class="sample-menu-item" href=${sample.link}>${sample.name}</a>
`

const editableName = (state) => html`
  <div 
    class="menu-item menu-name" 
    contenteditable 
    spellcheck="false"
    @blur=${e => dispatch("SET_NAME", { name: e.target.innerText })}
  >
    ${state.name}
  </div>
`

const drawFile = (file, i, state) => {
  const [ name, text ] = file;
  const setText = () => {
    saveGame(state);
    const games = Object.fromEntries(state.savedGames);
    const text = games[name];
    const cur = state.codemirror.state.doc.toString();
    dispatch("SET_EDITOR_TEXT", { text, range: [0, cur.length] })
  }

  const fullText = state.codemirror.state.doc.toString();
  const matches = fullText.matchAll(/(map|bitmap|tune)`[\s\S]*?`/g);
  for (const match of matches) {
    const index = match.index;
    state.codemirror.foldRange(index, index+1);
  }
  return html`
    <div @click=${setText}>${name.slice(0, 15)}${name.length > 15 ? "..." : ""}</div>
  `
}  

const menu = (state) => html`
  <div class="menu">
    <div class="menu-item dropdown-container">
      files
      <div class="dropdown-list">
        ${state.savedGames.map((file, i) => drawFile(file, i, state))}
      </div>
    </div>
    <div class="menu-item dropdown-container">
      export
      <div class="dropdown-list">
        <div @click=${e => dispatch("SAVE_TO_FILE")}>js</div>
        <div @click=${e => dispatch("GET_URL")}>link</div>
      </div>
    </div>
    <div class="menu-item dropdown-container">
      samples
      <div class="dropdown-list">
        ${state.samples.map(drawSample)}
      </div>
    </div>
    <div 
      class="menu-item" 
      @click=${() => dispatch("UPLOAD")}>
      upload
    </div>
    <div 
      class="menu-item docs-trigger">
      docs
    </div>
    <div 
      class="menu-item run" 
      @click=${() => dispatch("RUN")}>
      <ion-icon name="play" style="margin-right: 6px;" />
      run
    </div>

    <div class="spacer" aria-hidden="true" />

    <a class="menu-item" href="https://github.com/hackclub/puzzlelab/">
      <ion-icon name="logo-github" />
    </a>
  </div>
`

const drawSample = ({ name, link }) => {
  return html`
    <a href=${link}>
      ${name}
    </a>
  `
}
