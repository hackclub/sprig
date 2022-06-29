import "./markdown-renderer.js";
import { style } from "../docs/style.js";
import { md } from "../docs/md.js";
import { html } from "../libs/uhtml.js";

export const docs = (state) => html`
  <markdown-renderer>

    ${md}
  </markdown-renderer>
`