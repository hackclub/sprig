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
export default (state) => (
  html`
    <button class="menu-option hoverable tooltipped"
            @click=${click}
            @mouseenter=${mouseEnter}>
      <span class="tooltipped-text">Run (shift+enter)</span>
      <img src="${image(state)}" width="32px" />
    </button>
  `
)