import { html } from "./libs/uhtml.js";
import { dispatch } from "./dispatch.js";
import "./pixel-editor/pixel-editor.js";
import "./sequencer/sequencer.js";

export const view = (state) => html`
  ${menu()}
  <div class="main-container">
    <div class="code-container">
      <codemirror-js class="code-editor"></codemirror-js>
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
  <div class=${["asset-editor", state.editorType === "" ? "hide" : ""].join(" ")}>
    <button 
      @click=${() => dispatch("SET_EDITOR", { type: "" })}>
      close
    </button>
    ${
      {
        "sprite": html`<pixel-editor></pixel-editor>`,
        "sequencer": html`<sequencer-editor></sequencer-editor>`,
        "":""
      }[state.editorType]
    }
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
      editors
      <div class="dropdown-list">
        <div 
          @click=${() => dispatch("SET_EDITOR", { type: "sprite" })}
          class="menu-item">
          sprite
        </div>
        <div
          @click=${() => dispatch("SET_EDITOR", { type: "sequencer" })} 
          class="menu-item">
          sequencer
        </div>
        <div
          @click=${() => dispatch("SET_EDITOR", { type: "map" })} 
          class="menu-item">
          map
        </div>
      </div>
    </div>
    <div class="menu-item docs-trigger">docs</div>
    <div class="menu-item">upload</div>
    <div 
      class="menu-item" 
      @click=${() => dispatch("RUN")}>
      run
    </div>
  </div>
`