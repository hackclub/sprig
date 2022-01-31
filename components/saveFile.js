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
const klass = (state) => {
  let k = "hoverable tooltipped button "
  switch(state.saveFileStatus) {
    case 'loading':
      k += 'cursor-progress'
      break
    case 'ready':
      k += 'cursor-pointer'
      break
    default:
      k += 'cursor-help'
      break
  }
  return k
}

export default (state) => (
  html`
    <button @click=${click}
            @mouseenter=${mouseEnter}
            class="${klass(state)}"
            >
      <span class="tooltipped-text">Download</span>
      <img src="${image(state)}" width="32px" height="32px" />
    </button>
  `
)