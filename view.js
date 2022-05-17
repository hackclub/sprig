import { html } from "./libs/uhtml.js";
import { dispatch } from "./dispatch.js";

export const view = (state) => html`
  ${menu()}
  <div class="main-container">
    <div class="code-container">
      <codemirror-js class="code-editor"></codemirror-js>
    </div>
    <div class="vertical-bar" aria-hidden="true"></div>
    <div class="game-output">
      <canvas class="game-canvas"></canvas>
    </div>
  </div>
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
    <div class="menu-item">docs</div>
    <div 
      class="menu-item" 
      @click=${() => dispatch("RUN")}>
      run
    </div>
  </div>
`