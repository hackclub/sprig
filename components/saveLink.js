import { dispatch } from "../dispatch.js"
import { html } from "../uhtml.js"

const mouseEnter = () => dispatch("SOUND", "hover")
const click = () => {
  dispatch("SOUND", "click")
  dispatch("SAVE", { type: "link" })
}
export default (state) => (
  html`
    <button @click=${click}
            @mouseenter=${mouseEnter}
            class="hoverable tooltipped"
            >
      <span class="tooltipped-text">Save online</span>
      <img src="./assets/upload.png" width="32px" />
    </button>
  `
)