import {
  EditorView,
  WidgetType,
  Decoration,
  ViewPlugin
} from "../libs/@codemirror/view.js";
import { StateField } from "../libs/@codemirror/state.js";
import { syntaxTree } from "../libs/@codemirror/language.js";

class OpenButtonWidget extends WidgetType {
  eq(other) { return true; }
  ignoreEvent() { return false; }

  toDOM() {
    const container = document.createElement("span");
    container.classList.add("cm-open-button");
    
    const button = container.appendChild(document.createElement("button"));
    button.textContent = "edit sprite";

    return container;
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
      const decoration = Decoration.replace({
        widget: new OpenButtonWidget(),
        // block: true
      });
      widgets.push(decoration.range(templateString.from, templateString.to));
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