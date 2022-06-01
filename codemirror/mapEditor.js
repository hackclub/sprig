import {
  EditorView,
  WidgetType,
  Decoration
} from "../libs/@codemirror/view.js";
import { StateField } from "../libs/@codemirror/state.js";
import { syntaxTree } from "../libs/@codemirror/language.js";
import { dispatch } from "../dispatch.js";
import { getTemplateFunctionText } from "./util.js";

class OpenButtonWidget extends WidgetType {
  constructor(legend, text, from, to) {
    super();
    
    this.legend = legend;
    this.text = text;
    this.from = from;
    this.to = to;
  }

  eq(other) {
    return other.text === this.text && other.from === this.from && other.to === this.to
      && other.legend === this.legend; // badbadbadbadbadbad (probably)
  }
  ignoreEvent() { return false; }

  toDOM() {
    const container = document.createElement("span");
    container.classList.add("cm-open-button");
    
    const button = container.appendChild(document.createElement("button"));
    button.textContent = "edit map";
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
      type: "map",
      initValue: {
        text: this.text,
        legend: this.legend
      },
      from: this.from,
      to: this.to
    });
  }
}

function getLegend(syntax, doc) {
  let foundLegend = false;
  const legend = {};
  syntax.iterate({
    enter(node) {
      if (foundLegend || node.name !== "CallExpression") return;
      
      const identifier = syntax.resolve(node.from, 1);
      if (identifier?.name !== "VariableName") return;
      const identifierName = doc.sliceString(identifier.from, identifier.to);
      if (identifierName !== "setLegend") return;
      foundLegend = true;
      
      const argList = identifier.parent.getChild("ArgList");
      if (!argList) return;
      const objectExp = argList.firstChild.nextSibling;
      if (objectExp?.name !== "ObjectExpression") return;
      
      node.iterate((node) => {
        if (node.name !== "Property") return;

        const nameNode = node.node.firstChild;
        if (!["String", "PropertyDefinition"].includes(nameNode.name)) return;
        const nameText = doc.sliceString(nameNode.from, nameNode.to);

        let propName;
        try {
          propName = nameNode.name === "String" ? eval(nameText) : nameText;
        } catch {
          // If the string is malformed and the eval fails. (Bad Code)
          return;
        }

        if (nameNode.nextSibling.name !== ':') return;
        const spriteText = getTemplateFunctionText('sprite', nameNode.nextSibling.nextSibling, syntax, doc);
        if (spriteText) legend[propName] = spriteText;
      });
    }
  })
  return legend;
}

function openButtons(state) {
  const widgets = [];
  const syntax = syntaxTree(state);

  const legend = getLegend(syntaxTree(state), state.doc);
  syntax.iterate({
    enter(node) {
      const mapText = getTemplateFunctionText('map', node, syntax, state.doc);
      if (!mapText) return;
      // console.log(mapText)

      const decoration = Decoration.replace({
        widget: new OpenButtonWidget(
          legend,
          mapText.text,
          mapText.from,
          mapText.to
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