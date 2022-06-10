import { EditorView, Decoration } from "../libs/@codemirror/view.js";
import { StateField } from "../libs/@codemirror/state.js";
import { syntaxTree } from "../libs/@codemirror/language.js";
import { getTag } from "./util.js";
import { OpenButtonWidget } from "./openButton.js";

function openButtons(state) {
  const widgets = [];
  const syntax = syntaxTree(state);

  syntax.iterate({
    enter(node) {
      const spriteTag = getTag("sprite", node, syntax, state.doc);
      if (spriteTag) {
        const decoration = Decoration.replace({
          widget: new OpenButtonWidget("sprite", "sprite", spriteTag.text, spriteTag.textFrom, spriteTag.textTo)
        });
        widgets.push(decoration.range(spriteTag.nameFrom, spriteTag.nameTo));
        return;
      }

      const tuneTag = getTag("tune", node, syntax, state.doc);
      if (tuneTag) {
        const decoration = Decoration.replace({
          widget: new OpenButtonWidget("tune", "sequencer", tuneTag.text, tuneTag.textFrom, tuneTag.textTo)
        });
        widgets.push(decoration.range(tuneTag.nameFrom, tuneTag.nameTo));
        return;
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