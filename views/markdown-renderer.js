// markdown component

import marked from '../libs/marked.js';

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
    this.shadowRoot.innerHTML = `${marked(this.innerHTML)}`
  }
})
