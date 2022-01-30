import { dispatch } from "../dispatch.js"
import { html } from "../uhtml.js";

const mouseEnter = () => dispatch("SOUND", "hover")

const click = () => {
  dispatch("SOUND", "confirm")
}

export default (state) => (
  html`
    <button
      class="hoverable tooltipped"
      @mouseenter=${mouseEnter}
      @click=${click}
      >
      <span class="tooltipped-text">Submit a bug report</span>
      <img src="./assets/bug.png" width="32px" />
    </button>
  `
)