import { dispatch } from "../dispatch.js"
import { html } from "../uhtml.js"

const mouseEnter = () => dispatch("SOUND", "hover")
const click = () => {
  dispatch("SOUND", "click")
  dispatch("SAVE", { type: "file" })
}

const image = (state) => {
  switch (state.saveFileStatus) {
    case 'loading':
      return './assets/loading.gif'
    case 'ready':
      return './assets/download.png'
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
      <span class="tooltipped-text">Download</span>
      <img src="${image(state)}" width="32px" />
    </button>
  `
)