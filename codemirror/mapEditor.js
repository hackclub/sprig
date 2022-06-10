import { EditorView, Decoration } from "../libs/@codemirror/view.js";
import { StateField } from "../libs/@codemirror/state.js";
import { syntaxTree } from "../libs/@codemirror/language.js";
import { getTag } from "./util.js";
import { OpenButtonWidget } from "./openButton.js";

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
        const spriteText = getTag('sprite', nameNode.nextSibling.nextSibling, syntax, doc);
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
      const tag = getTag('map', node, syntax, state.doc);
      if (!tag) return;

      const decoration = Decoration.replace({
        widget: new OpenButtonWidget(
          'map',
          'map',
          { text: tag.text, legend },
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