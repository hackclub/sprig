import { dispatch } from '../dispatch.js'
import { html } from '../uhtml.js'
import runButton from './runButton.js'

const save = (e) => {
  const name = dispatch("SET_NAME", { name: e.target.innerText })
  e.target.textContent = name
  dispatch("RENDER")
}
const input = (e) => {
  if (e.inputType === "insertParagraph") {
    dispatch("SOUND", "yes")
    e.target.blur()
    // ^ this will end typing & trigger a save
  } else {
    dispatch("SOUND", "click")
    dispatch("SET_NAME", { name: e.target.innerText })
  }
}

export default (state) => (
  html`
  <div class="name-bar">
    <div>
      <h1 contenteditable="true"
          spellcheck="false"
          @input=${input}
          @blur=${save}
      >
      ${state.name}
      </h1>
    <span>powered by Game-Lab</span>
    </div>
    ${runButton(state)}
  </div>
  `
)