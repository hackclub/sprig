import {
  EditorView,
  WidgetType,
  Decoration
} from "../libs/@codemirror/view.js";
import { StateField } from "../libs/@codemirror/state.js";
import { syntaxTree } from "../libs/@codemirror/language.js";
import { dispatch } from "../dispatch.js";

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

    return container;
  }

  updateDOM(container) {
    const oldButton = container.children[0];
    const button = oldButton.cloneNode(true); // This'll remove all event listeners.
    button.addEventListener("click", () => this.onClick());
    container.replaceChild(button, oldButton);
    return true;
  }

  onClick() {
    dispatch("SET_EDITOR", {
      type: "sprite",
      initText: this.text.slice(1, -1),
      from: this.from + 1,
      to: this.to - 1
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
        widget: new OpenButtonWidget(templateStringText, templateString.from, templateString.to)
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