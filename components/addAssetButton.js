import { dispatch } from "../dispatch.js"
import { html } from "../uhtml.js"

const click = (assetType) => {
  dispatch("SOUND", "click")
  dispatch("CREATE_ASSET", { assetType })
}
const mouseEnter = () => dispatch("SOUND", "hover")
const image = (assetType) => {
  switch (assetType) {
    case 'tune':
      return './assets/add-tune.png'
    case 'sprite':
      return './assets/add-sprite.png'
    default:
      return './assets/err.png'
  }
}

export default (state, assetType) => (
  html`
    <button class="hoverable tooltipped"
            @mouseenter=${mouseEnter}
            @click=${() => click(assetType)}>
      <span class="tooltipped-text">Add ${assetType}</span>
      <img src="${image(assetType)}" width="32px" />
    </button>
  `
)