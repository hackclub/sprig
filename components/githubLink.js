import { dispatch } from "../dispatch.js"
import { html } from "../uhtml.js";

const mouseEnter = () => dispatch("SOUND", "hover")

const click = () => dispatch("SOUND", "confirm")

export default (state) => (
  html`
    <a
      @mouseenter=${mouseEnter}
      @click=${click}
      target="_blank"
      href="https://github.com/hackclub/game-lab"
      >
      <button class="hoverable tooltipped button cursor-pointer">
        <span class="tooltipped-text">GitHub</span>
        <img src="./assets/github.png" width="32px" />
      </button>
    </a>
  `
)