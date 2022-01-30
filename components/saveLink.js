import { dispatch } from "../dispatch.js"
import { html } from "../uhtml.js"

const mouseEnter = () => dispatch("SOUND", "hover")
const click = () => {
  dispatch("SOUND", "click")
  dispatch("SAVE", { type: "link" })
}

const image = (state) => {
  switch (state.saveLinkStatus) {
    case 'loading':
      return './assets/loading.gif'
    case 'ready':
      return './assets/upload.png'
    default:
      return './assets/err.png'
  }
}
export default (state) => (
  html`
    <button @click=${click}
            @mouseenter=${mouseEnter}
            class="hoverable tooltipped"
            >
      <span class="tooltipped-text">Save online</span>
      <img src="${image(state)}" width="32px" />
    </button>
  `
)