import "./markdown-renderer.js";
// import { style } from "../docs/style.js";
// import { md } from "../docs/md.js";
import { html } from "../libs/uhtml.js";

const md = await fetch("/docs/docs.md").then(res => res.text());

export const docs = (state) => html`
  <markdown-renderer>
    ${md}
  </markdown-renderer>
`