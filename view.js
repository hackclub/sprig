import { html } from "./uhtml.js";
import { dispatch } from "./dispatch.js";
import "./codemirror/codemirror-html.js";
import "./codemirror/codemirror-js.js";

function shareOptions(state) {
  return html`
    <div class="expand-menu menu-option menu-choice">
      save
      <div class="menu-choices">
        <input type="text" .placeholder=${state.name} @keyup=${(e) => {
    state.name = e.target.value === "" ? "anon" : e.target.value;
  }}></input>
        <button @click=${() => dispatch("SAVE", { type: "file" })}>
          file
        </button>
        <button @click=${() => dispatch("SAVE", { type: "link" })}>link</button>
      </div>
    </div>
  `;
}

const toggleHide = (className) =>
  document.querySelector(`.${className}`).classList.toggle("hide");

// <button class="menu-option" @click=${() => toggleHide("examples")}>examples</button>
// <button class="menu-option" @click=${() => toggleHide("options")}>options</button>

// <pre class="output-overlay mouse-display">
//   ${(() => {
//     const canv = document.querySelector(".game-canvas") ?? {
//       width: 100,
//       height: 100,
//     };
//     const widthChars = ("" + canv.width).length;
//     const heightChars = ("" + canv.height).length;
//     return (
//       "mouse: " +
//       ("" + state.mouseX).padStart(widthChars) +
//       " x, " +
//       ("" + state.mouseY).padStart(heightChars) +
//       " y"
//     );
//   })()}
// </pre>

const gameOutput0 = () => html`
  <style>
    .outer-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: blue;
    }

    .inner-container {
      width: min-content;
      height: min-content;
      position: relative;
    }

    .text-container {
      position: absolute;
      left: 0px;
      top: 0px;
      overflow: show;
    }
  </style>
  <div class="outer-container">
    <div class="inner-container">
      <canvas class="game-canvas" @mousemove=${trackMouse}></canvas>
      <div class="text-container"></div>
    </div>
  </div>
`

const trackMouse = (e) => {
  dispatch("CANVAS_MOUSE_MOVE", {
    content: { mouseX: e.offsetX, mouseY: e.offsetY },
  });
}

const gameOutput = state => html`
  <div class="game-output">
    ${false ? html`<iframe class="game-iframe" sandbox="allow-scripts allow-same-origin"></iframe>` : "" }
    ${true ? gameOutput0() : ""}
    <div class="show-options">
      <p
        @click=${(e) => {
          state.show.origin = !state.show.origin;
          dispatch("RUN");
        }}
      >
        ${state.show.origin ? "[x]" : "[ ]"} show origin
      </p>
      <p
        @click=${(e) => {
          state.show.hitbox = !state.show.hitbox;
          dispatch("RUN");
        }}
      >
        ${state.show.hitbox ? "[x]" : "[ ]"} show hitbox
      </p>
      <span style="display: flex;">
        <span style="min-width: 70px; max-width: 70px;">mouse:</span>
        <span style="display: flex; justify-content: flex-end; min-width: 70px; max-width: 70px;">${state.mouseX} x</span>
        ,
        <span style="display: flex; justify-content: flex-end; min-width: 70px; max-width: 70px;">${state.mouseY} y</span>
      </span>
    </div>
  </div>
`

export function view(state) {
  return html`
    <style>
      :root {
        --horizontal-bar: 60%;
      }

      .right-pane {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        width: 100%;
        flex: 1;
      }

      .game-output {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #000067;
        width: 100%;
        height: var(--horizontal-bar);
        position: relative;
      }

      .pixel-editor-container {
        display: flex;
        background: green;
        width: 100%;
        flex: 1;
        z-index: 9;
        overflow: hidden;
      }

      .list-of-sprites {
        display: flex;
        flex-direction: column;
        background: #d3d3d3;
        min-height: 100%;
        max-height: 100%;
        height: 100%;
        min-width: 40px;
        width: max-content;
        padding: 5px;
      }

      .list-of-sprites > * {
        padding-bottom: 3px;
      }

      .asset-editor {
        overflow: scroll;
        position: relative;
        flex: 1;
      }

      .horizontal-bar {
        position: absolute;
        left: var(--vertical-bar);
        top: calc(var(--horizontal-bar) - 5px);
        background: none;
        height: 10px;
        width: 100%;
        z-index: 10;
      }

      .horizontal-bar:hover {
        background: black;
        cursor: row-resize;
      }

      .sprite-entry {
        display: flex;
        box-sizing: border-box;
        border: 2px solid #ffffff00;
        padding: 3px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 0.8rem;
        justify-content: space-between;
      }

      .sprite-name {
        cursor: pointer;
        flex: 3;
        padding-right: 10px;
      }

      .sprite-entry:hover {
        border: 2px solid yellow;
      }

      .sprite-delete {
        display: flex;
        justify-content: flex-end;
        color: red;
        cursor: pointer;
      }

      .sprite-delete:hover {
        color: orange;
      }

      .selected-sprite {
        border: 2px solid blue;
      }

      .show-options {
        color: white;
        font-size: 20px;
        font-family: monospace;
        position: absolute;
        user-select: none;
        right: 10px;
        bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }

      .show-options > * {
        padding: 0px;
        margin: 0px;
        padding-bottom: 5px;
      }

      .sprite-entry-input {
        font-size: 13px;
        font-family: monospace;
        border: none;
        background-image: none;
        background-color: transparent;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        outline: none;
        padding: 0;
        width: 110px;
      }

      .a-to-button {
        text-decoration: none;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text-color);
      }

      .game-iframe {
        width: 100%;
        height: 100%;
      }
    </style>
    <div class="left-pane">
      <codemirror-js id="code-editor"></codemirror-js>
      <div
        class=${[
          "log",
          state.error ? "error" : "",
          state.logs.length === 0 ? "shrink" : "",
        ].join(" ")}
      >
        ${state.logs.map(
          (x) => html`<div style="white-space: pre-wrap">${x}</div>`
        )}
      </div>
      <div class="menu">
        <button class="menu-option" @click=${() => dispatch("RUN")}>
          run (shift + enter)
        </button>
        ${shareOptions(state)}
        <a
          class="a-to-button menu-choice"
          target="_blank"
          href="https://github.com/hackclub/game-lab"
          >GitHub</a
        >
        <button class="menu-option">
          docs
        </button>
      </div>
    </div>
    <div class="right-pane">
      ${gameOutput(state)}
      <div class="pixel-editor-container">
        <div class="list-of-sprites">
          ${state.assets.map(
            (x, i) => {
              return html`
              <div
                class=${[
                  "sprite-entry",
                  i === state.selected_asset ? "selected-sprite" : "",
                ].join(" ")}
              >
                ${renderSpriteName(x.name, i, state)}
                <div
                  class="sprite-delete"
                  @mousedown=${() => dispatch("DELETE_ASSET", { index: i })}
                >
                  x
                </div>
              </div>
            `
          })}
          <button @click=${() => dispatch("CREATE_ASSET", { assetType: "sprite" })}>add sprite</button>
          <button @click=${() => dispatch("CREATE_ASSET", { assetType: "tune" })}>add tune</button>
        </div>
        <div class="asset-editor"></div>
      </div>
      <div class="horizontal-bar"></div>
    </div>
    <div id="vertical-bar"></div>
    ${renderOptions(state)}
    <div id="notification-container"></div>
  `;
}

const renderSpriteName = (name, index, state) =>
  state.selected_asset === index
    ? html`<input 
          class="sprite-entry-input"
          .value=${name} 
          @input=${(e) => {
            dispatch("CHANGE_ASSET_NAME", {
              index,
              newName: e.target.value,
            });
          }}
          ></input>`
    : html`<div
        class="sprite-name"
        @mousedown=${() => dispatch("SELECT_ASSET", { index })}
      >
        ${name}
      </div> `;

const renderOptions = (state) => {
  return html`
    <div class="options hide">
      <div class="option">
        <span>Link Share Method:</span>
        <select
          @change=${(e) => dispatch("SHARE_TYPE", { type: e.target.value })}
          .value=${state.shareType}
        >
          <option value="binary-url">Binary URL</option>
          <option value="airtable">Airtable</option>
        </select>
      </div>
      <button class="close" @click=${() => toggleHide("options")}>close</button>
    </div>
  `;
};
