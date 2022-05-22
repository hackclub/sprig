import {
  EditorView,
  WidgetType,
  Decoration
} from "../libs/@codemirror/view.js";
import { StateField } from "../libs/@codemirror/state.js";
import { syntaxTree } from "../libs/@codemirror/language.js";
import { dispatch } from "../dispatch.js";
import { spriteTextToImageData } from "../engine/sprite.js";

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

    const canvas = container.appendChild(document.createElement("canvas"));
    const data = spriteTextToImageData(this.text);
    canvas.width = data.width;
    canvas.height = data.height;
    canvas.getContext("2d").putImageData(data, 0, 0);

    return container;
  }

  updateDOM(container) {
    const oldButton = container.children[0];
    const button = oldButton.cloneNode(true); // This'll remove all event listeners.
    button.addEventListener("click", () => this.onClick());
    container.replaceChild(button, oldButton);

    const canvas = container.querySelector("canvas");
    const data = spriteTextToImageData(this.text);
    canvas.width = data.width;
    canvas.height = data.height;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext("2d").putImageData(data, 0, 0);

    return true;
  }

  onClick() {
    dispatch("SET_EDITOR", {
      type: "sprite",
      initText: this.text,
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
      if (node.name !== "CallExpression") return;

      const identifier = syntax.resolve(node.from, 1);
      if (identifier?.name !== "VariableName") return;
      const identifierName = state.doc.sliceString(identifier.from, identifier.to);
      if (identifierName !== "sprite") return;

      const argList = identifier.parent.getChild("ArgList");
      if (!argList) return;
      const templateString = argList.firstChild.nextSibling;
      if (templateString?.name !== "TemplateString") return;

      const templateStringText = state.doc.sliceString(templateString.from, templateString.to);
      if (!templateStringText.endsWith('`')) return;

      const decoration = Decoration.replace({
        widget: new OpenButtonWidget(
          templateStringText.slice(1, -1),
          templateString.from + 1,
          templateString.to - 1
        )
      });
      widgets.push(decoration.range(node.from, node.to));
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