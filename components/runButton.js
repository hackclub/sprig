import { dispatch } from "../dispatch.js";
import { html } from "../uhtml.js";

const click = () => { dispatch("SOUND", "click"); dispatch("RUN") }
const mouseEnter = () => dispatch("SOUND", "hover")
const image = (state) => {
  switch (state.runStatus) {
    case 'loading':
      return './assets/loading.gif'
    case 'ready':
      return './assets/play.png'
    default:
      return './assets/err.png'
  }
}
const klass = (state) => {
  let k = "hoverable tooltipped button "
  switch(state.bugReportStatus) {
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
    <button class="${klass(state)}"
            @click=${click}
            @mouseenter=${mouseEnter}>
      <span class="tooltipped-text">Run (shift+enter)</span>
      <img src="${image(state)}" width="32px" />
    </button>
  `
)