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

const styles = `
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default (state, assetType) => (
  html`
    <button 
      style=${styles}
      class="hoverable tooltipped button cursor-pointer"
      @click=${() => click(assetType)}>
      <img src="${image(assetType)}" width="24px" height="24px" style="padding-right: 5px;"/>
      <span>add ${assetType}</span>
    </button>
  `
)