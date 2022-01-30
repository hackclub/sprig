import { dispatch } from "../dispatch.js"
import { html } from "../uhtml.js"

const mouseEnter = () => dispatch("SOUND", "hover")
const click = () => {
  dispatch("SOUND", "click")
  dispatch("SAVE", { type: "file" })
}
export default (state) => (
  html`
    <button @click=${click}
            @mouseenter=${mouseEnter}
            class="hoverable tooltipped"
            >
      <span class="tooltipped-text">Download</span>
      <img src="./assets/download.png" width="32px" />
    </button>
  `
)