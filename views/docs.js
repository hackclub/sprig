import "./markdown-renderer.js";
import { html } from "../libs/uhtml.js";

export const docs = (state) => html`
  <markdown-renderer>${state.docs}</markdown-renderer>
`