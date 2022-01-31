import { dispatch } from '../dispatch.js'
import { html } from '../uhtml.js'

const save = (e) => {
  const name = dispatch("SET_NAME", { name: e.target.innerText })
  e.target.textContent = name
  dispatch("RENDER")
}
const input = (e) => {
  console.log({e})
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
  <h1 contenteditable="true"
      @input=${input}
      @blur=${save}
  >
  ${state.name}
  </h1>
  `
)