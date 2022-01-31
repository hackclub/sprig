import { dispatch } from '../dispatch.js'
import { html } from '../uhtml.js'

const input = (e) => {
  dispatch("SOUND", "click")
  dispatch("SET_NAME", { name: e.target.innerText })
}

export default (state) => (
  html`
  <h1 contenteditable="true"
      @input=${input}
  >
  ${state.name}
  </h1>
  `
)