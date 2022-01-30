import { html } from "../uhtml.js";

const tooltip = ({content="i can be text or html", text="this is the tooltip message"}={}) => html`
<div class="tooltip">
  ${content}
  <span class="tooltip-text">${text}</span>
</div>
`

export default  tooltip