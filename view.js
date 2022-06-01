import { html } from "./libs/uhtml.js";
import { dispatch } from "./dispatch.js";
import "./pixel-editor/pixel-editor.js";
import "./sequencer/sequencer.js";
import "./map-editor/map-editor.js";

export const view = (state) => html`
  ${menu()}
  <div class="main-container">
    <div class="code-container">
      <div id="code-editor"></div>
      <div class=${["logs", state.error ? "erred" : ""].join(" ")}>
        ${state.logs.map(x => html`${x}`)}
      </div>
    </div>
    <div class="vertical-bar" aria-hidden="true"></div>
    <div class="game-output">
      <div class="game-container">
        <canvas class="game-canvas"></canvas>
      </div>
      <div class="docs">
        ${docs()}
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

const docs = () => html`
  <p>tests</p>
`

const menu = () => html`
  <div class="menu">
    <div class="menu-item">name</div>
    <div class="menu-item">github</div>
    <div class="menu-item dropdown-container">
      export
      <div class="dropdown-list">
        <div>json</div>
        <div>link</div>
        <div>html</div>
      </div>
    </div>
    <div class="menu-item dropdown-container">
      [dbg] editors
      <div class="dropdown-list">
        <div 
          @click=${() => dispatch("SET_EDITOR", { type: "sprite", debug: true })}
          class="menu-item">
          sprite
        </div>
        <div
          @click=${() => dispatch("SET_EDITOR", { type: "sequencer", debug: true })} 
          class="menu-item">
          sequencer
        </div>
        <div
          @click=${() => dispatch("SET_EDITOR", { type: "map", debug: true })} 
          class="menu-item">
          map
        </div>
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
