import { dispatch } from "../dispatch.js"
import { html } from "../uhtml.js";

const mouseEnter = () => dispatch("SOUND", "hover")

const click = () => dispatch("SOUND", "confirm")

export default (state) => (
  html`
    <style>
      .github-button {
        position: relative;
        box-sizing: border-box;
      }

      .github-tooltip {
        visibility: visible;
        background-color: black;
        color: #fff;
        padding: 5px 0;
        border-radius: 6px;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1;
      }
    </style>
    <a
      @mouseenter=${mouseEnter}
      @click=${click}
      target="_blank"
      href="https://github.com/hackclub/gamelab"
      >
      <button class="github-button">
        <span class="github-tooltip">GitHub</span>
        <img src="./assets/github.png" width="32px" />
      </button>
    </a>
  `
)