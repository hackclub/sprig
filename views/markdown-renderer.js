// markdown component

import marked from '../libs/marked.js';

customElements.define('markdown-renderer', class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // view
    this.shadowRoot.innerHTML = `${marked(this.innerHTML)}`
  }
})
