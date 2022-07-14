// markdown component

import marked from '../libs/marked.js';
import { style } from "../docs/style.js";

customElements.define('markdown-renderer', class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    new MutationObserver(() => this.update()).observe(this, { childList: true })
    this.update();
  }

  update() {
    let text = `${marked(this.innerHTML)}`;
    text = text
      .replaceAll("&amp;gt;", ">")
      .replaceAll("&amp;lt;", "<")
    this.shadowRoot.innerHTML = `<style>${style}</style>${text}`;
  }
})
