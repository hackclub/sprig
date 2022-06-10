import { WidgetType } from "../libs/@codemirror/view.js";
import { dispatch } from "../dispatch.js";

export class OpenButtonWidget extends WidgetType {
  constructor(label, editorType, initValue, from, to) {
    super();
    
    this.label = label;
    this.editorType = editorType;
    this.initValue = initValue;
    this.from = from;
    this.to = to;
  }

  eq(other) {
    return other.initValue === this.initValue // BADBADBADBADBAD (probably)
      && other.from === this.from
      && other.to === this.to;
  }
  ignoreEvent() { return false; }

  toDOM() {
    const container = document.createElement("span");
    container.classList.add("cm-open-button");
    
    const button = container.appendChild(document.createElement("button"));
    button.textContent = this.label;
    button.addEventListener("click", () => this.onClick());

    if (this.editorType === "sprite") container.appendChild(document.createElement("sprite-preview")).setAttribute("text", this.initValue);

    return container;
  }

  updateDOM(container) {
    const oldButton = container.children[0];
    const button = oldButton.cloneNode(true); // This'll remove all event listeners.
    button.addEventListener("click", () => this.onClick());
    container.replaceChild(button, oldButton);

    if (this.editorType === "sprite") container.querySelector("sprite-preview").setAttribute("text", this.initValue);

    return true;
  }

  onClick() {
    dispatch("SET_EDITOR", {
      type: this.editorType,
      initValue: this.initValue,
      from: this.from,
      to: this.to
    });
  }
}