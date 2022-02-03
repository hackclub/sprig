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

const klass = (state) => {
  let k = "hoverable tooltipped button "
  switch(state.saveLinkStatus) {
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
      <span class="tooltipped-text">Save online</span>
      <img src="${image(state)}" width="32px" />
    </button>
  `
)