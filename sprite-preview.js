import { spriteTextToImageData } from "./engine/sprite.js";

class SpritePreview extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.canvas = shadow.appendChild(document.createElement("canvas"));
    this.canvas.style.display = "block";
    this.canvas.style.width = "100%";
    this.canvas.style.imageRendering = "pixelated";
    this.attributeChangedCallback();
  }

  attributeChangedCallback() {
    if (!this.canvas) return;

    const data = spriteTextToImageData(this.getAttribute("text") ?? "");
    this.canvas.width = data.width;
    this.canvas.height = data.height;
    this.canvas.getContext("2d").clearRect(0, 0, data.width, data.height);
    this.canvas.getContext("2d").putImageData(data, 0, 0);
    this.staleCanvas = false;
  }

  static get observedAttributes() { return [ "text" ]; }
}

customElements.define("sprite-preview", SpritePreview);