import "./markdown-renderer.js";
import { html } from "../libs/uhtml.js";

export const docs = (state) => html`
  <markdown-renderer>
<link rel="stylesheet" href="/docs.css" />

${state.docs}
  </markdown-renderer>
`