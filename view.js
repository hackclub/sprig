import { html } from "./uhtml.js";
import { dispatch } from "./dispatch.js";
import "./codemirror/codemirror-html.js";
import "./codemirror/codemirror-js.js";

import addAssetButton from "./components/addAssetButton.js";
import { renderDocs } from "./components/renderDocs.js";
import nameBar from "./components/nameBar.js";

const toggleHide = (className) =>
  document.querySelector(`.${className}`).classList.toggle("hide");

const gameOutput0 = (state) => html`
  <style>
    .outer-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--lighter);
      border-radius: 5px;
    }

    .inner-container {
      width: min-content;
      height: min-content;
      position: relative;
      background: var(--darkless);
      padding: 0.5em;
      border-radius: 5px;
      border: 0.5em solid var(--lightless);
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
`;

const trackMouse = (e) => {
  dispatch("CANVAS_MOUSE_MOVE", {
    content: { mouseX: e.offsetX, mouseY: e.offsetY },
  });
};

const gameOutput = (state) => html`
  <div class="game-output">
    ${true
      ? gameOutput0(state)
      : html`<iframe
          class="game-iframe"
          sandbox="allow-scripts allow-same-origin"
        ></iframe>`}
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
        <span
          style="display: flex; justify-content: flex-end; min-width: 70px; max-width: 70px;"
          >${state.mouseX} x</span
        >
        ,
        <span
          style="display: flex; justify-content: flex-end; min-width: 70px; max-width: 70px;"
          >${state.mouseY} y</span
        >
      </span>
    </div>
  </div>
`;

export function view(state) {
  return html`
    <style>
      :root {
        --horizontal-bar: 60%;
      }

      .hoverable:hover {
        transform: translateY(1px);
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
        background: var(--lighter);
        width: 100%;
        height: var(--horizontal-bar);
        position: relative;
        text-align: center;
      }

      .game-output .menu {
        display: flex;
        justify-content: end;
      }

      .game-output .menu > *:first-child {
        margin-right: auto;
      }

      @keyframes screen-flicker {
        0% {
          box-shadow: 0 0 6px 3px #fff2, /* inner white */ 0 0 10px 6px #f0f2,
            /* middle magenta */ 0 0 14px 9px #0ff2; /* outer cyan */
        }
        20% {
          box-shadow: 0 0 30px 15px #fff2, /* inner white */ 0 0 50px 30px #f0f2,
            /* middle magenta */ 0 0 70px 45px #0ff2; /* outer cyan */
        }
        100% {
          box-shadow: 0 0 6px 3px #fff2, /* inner white */ 0 0 10px 6px #f0f2,
            /* middle magenta */ 0 0 14px 9px #0ff2; /* outer cyan */
        }
      }

      .game-canvas {
        border-radius: 5px;

        background: url(./assets/no-canvas.gif);
        background-repeat: no-repeat;
        background-size: cover;

        box-shadow: 0 0 6px 3px #fff2, /* inner white */ 0 0 10px 6px #f0f2,
          /* middle magenta */ 0 0 14px 9px #0ff2; /* outer cyan */
        animation: ease-in-out 1s screen-flicker;
        animation-fill-mode: forwards;
      }

      .pixel-editor-container {
        display: flex;
        background: var(--lightless);
        width: 100%;
        flex: 1;
        z-index: 9;
        overflow: hidden;
      }

      .list-of-sprites {
        display: flex;
        flex-direction: column;
        background: var(--darkless);
        min-height: 100%;
        max-height: 100%;
        height: 100%;
        min-width: 40px;
        width: max-content;
        padding: 5px;
        overflow: scroll;
        color: var(--smoke);
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
        right: 0;
        top: calc(var(--horizontal-bar) - 5px);
        background: none;
        height: 10px;
        z-index: 10;
      }

      .horizontal-bar:after {
        content: " ";
        height: 0.5em;
        width: 10em;
        max-width: 30%;
        border-radius: 5em;
        background: var(--darker);
        cursor: inherit;
        display: inline-block;
        transform: translateY(-50%) translateX(-50%);
        position: absolute;
        left: 50%;
        top: 50%;
      }

      .horizontal-bar:hover:after {
        max-width: 30%;
        background: var(--lightless);
      }

      .horizontal-bar:hover {
        background: var(--darker);
        border: 1px dashed var(--darker);
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

      .game-container {
        background: url("./assets/screen-backing.svg");
        border: 1em solid var(--lightless);
        border-radius: 5px;
        padding: 0.5em;
        background: var(--darkless);
        position: relative;
      }

      .text-container {
        width: 1px;
        height: 1px;
        position: absolute;
        left: 0px;
        top: 0px;
        overflow: show;
      }

      .show-options {
        background-color: rgba(0, 0, 0, 25%);
        color: white;
        font-size: 20px;
        font-family: monospace;
        position: absolute;
        user-select: none;
        right: 10px;
        bottom: 10px;
        padding: 0 5px;
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
        color: inherit;
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
      ${nameBar(state)}
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
    </div>
    <div class="right-pane">
      ${gameOutput(state)}
      <div class="pixel-editor-container">
        <div class="list-of-sprites">
          ${addAssetButton(state, "sprite")} ${addAssetButton(state, "tune")}
          ${state.assets.map((x, i) => {
            return html`
              <div
                class=${[
                  "sprite-entry",
                  i === state.selected_asset ? "selected-sprite" : "",
                ].join(" ")}
              >
                ${{
                  tune: html`<img
                    src="assets/tune.png"
                    style="width:16px;height:16px;filter:invert(1);margin-right:5px;"
                  />`,
                  sprite: html`<img
                    src="assets/favicon/white-alt-2.png"
                    style="width:11px;height:11px;padding:3px;margin-right:5px;"
                  />`,
                }[x.type]}
                ${renderSpriteName(x.name, i, state)}
                <div
                  class="sprite-delete"
                  @mousedown=${() => dispatch("DELETE_ASSET", { index: i })}
                >
                  x
                </div>
              </div>
            `;
          })}
        </div>
        <div class="asset-editor"></div>
      </div>
      <div class="horizontal-bar"></div>
    </div>
    <div id="vertical-bar"></div>
    ${renderDocs(state)}
  `;
}

const renderSpriteName = (name, index, state) =>
  state.selected_asset === index
    ? html`<input 
          class="sprite-entry-input"
          .value=${name} 
          @input=${(e) => {
            dispatch("CHANGE_ASSET_NAME", {
              e,
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
