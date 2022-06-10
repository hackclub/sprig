import {
  EditorView,
  WidgetType,
  Decoration
} from "../libs/@codemirror/view.js";
import { StateField } from "../libs/@codemirror/state.js";
import { syntaxTree } from "../libs/@codemirror/language.js";
import { dispatch } from "../dispatch.js";
import { spriteTextToImageData } from "../engine/sprite.js";
import { getTag } from "./util.js";

class OpenButtonWidget extends WidgetType {
  constructor(text, from, to) {
    super();
    
    this.text = text;
    this.from = from;
    this.to = to;
  }

  eq(other) { return other.text === this.text && other.from === this.from && other.to === this.to; }
  ignoreEvent() { return false; }

  toDOM() {
    const container = document.createElement("span");
    container.classList.add("cm-open-button");
    
    const button = container.appendChild(document.createElement("button"));
    button.textContent = "edit sprite";
    button.addEventListener("click", () => this.onClick());

    container.appendChild(document.createElement("sprite-preview")).setAttribute("text", this.text);

    return container;
  }

  updateDOM(container) {
    const oldButton = container.children[0];
    const button = oldButton.cloneNode(true); // This'll remove all event listeners.
    button.addEventListener("click", () => this.onClick());
    container.replaceChild(button, oldButton);

    container.querySelector("sprite-preview").setAttribute("text", this.text);

    return true;
  }

  onClick() {
    dispatch("SET_EDITOR", {
      type: "sprite",
      initValue: this.text,
      from: this.from,
      to: this.to
    });
  }
}

function openButtons(state) {
  const widgets = [];
  const syntax = syntaxTree(state);

  syntax.iterate({
    enter(node) {
      const tag = getTag('sprite', node, syntax, state.doc);
      if (!tag) return;

      const decoration = Decoration.replace({
        widget: new OpenButtonWidget(
          tag.text,
          tag.textFrom,
          tag.textTo
        )
      });
      widgets.push(decoration.range(tag.nameFrom, tag.nameTo));
    }
  })

  return Decoration.set(widgets);
}

export default StateField.define({
  create(state) {
    return openButtons(state);
  },
  update(decorations, transaction) {
    if (transaction.docChanged) return openButtons(transaction.state);
    return decorations.map(transaction.changes);
  },
  provide(field) {
    return EditorView.decorations.from(field);
  }
});