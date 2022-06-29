
// fetch("/docs.md").then(res => res.text()).then(docs => {
//   state.docs = docs;
//   dispatch("RENDER");
// });

import "./markdown-renderer.js";



class ToolboxDocs extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const methods = createPixelEditor(shadow);
    for (const i in methods) {
      this[i] = methods[i];
    }
  }

  disconnectedCallback() {
    this.end();
  }
}

customElements.define("toolbox-docs", ToolboxDocs);