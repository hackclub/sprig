import { dispatch } from "../dispatch.js"
import { html } from "../uhtml.js";

const mouseEnter = () => dispatch("SOUND", "hover")

const click = () => {
  dispatch("SOUND", "confirm");
  dispatch("REPORT_BUG");
}

const image = (state) => {
  switch(state.bugReportStatus) {
    case 'loading':
      return './assets/loading.gif'
    case 'ready':
      return './assets/bug.png'
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
    <button
      class="${klass(state)}"
      @mouseenter=${mouseEnter}
      @click=${click}
      >
      <span class="tooltipped-text">Submit a bug report</span>
      <img src="${image(state)}" width="32px" />
    </button>
  `
)