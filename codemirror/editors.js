import { EditorView, WidgetType, Decoration } from "../libs/@codemirror/view.js";
import { StateField } from "../libs/@codemirror/state.js";
import { syntaxTree } from "../libs/@codemirror/language.js";
import { getTag } from "./util.js";
import { dispatch } from "../dispatch.js";

const pairs = [
  [ "sprite", "sprite" ],
  [ "tune", "sequencer" ],
  [ "map", "map" ]
]

export class OpenButtonWidget extends WidgetType {
  constructor(label, editorType, text, from, to) {
    super();
    
    this.label = label;
    this.editorType = editorType;
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
    button.textContent = this.label;
    button.addEventListener("click", () => this.onClick());

    if (this.editorType === "sprite") container.appendChild(document.createElement("sprite-preview")).setAttribute("text", this.text);

    return container;
  }

  updateDOM(container) {
    const oldButton = container.children[0];
    const button = oldButton.cloneNode(true); // This'll remove all event listeners.
    button.addEventListener("click", () => this.onClick());
    container.replaceChild(button, oldButton);

    if (this.editorType === "sprite") container.querySelector("sprite-preview").setAttribute("text", this.text);

    return true;
  }

  onClick() {
    dispatch("SET_EDITOR", {
      type: this.editorType,
      text: this.text,
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
      for (const [label, editorType] of pairs) {
        const tag = getTag(label, node, syntax, state.doc);
        if (!tag) continue;
        const decoration = Decoration.replace({
          widget: new OpenButtonWidget(label, editorType, tag.text, tag.textFrom, tag.textTo)
        });
        widgets.push(decoration.range(tag.nameFrom, tag.nameTo));
        break;
      }
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