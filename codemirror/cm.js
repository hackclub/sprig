import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { indentUnit, foldable, foldEffect } from "@codemirror/language";
import { indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import editors from './editors.js';

const collapseRanges = (view) => (ranges) => {
  const effects = [];

  for (const [ start, end ] of ranges) {
    for (let pos = start; pos < end;) {
      const line = view.lineBlockAt(pos);
      const range = foldable(view.state, line.from, line.to);
      if (range) effects.push(foldEffect.of(range));
      pos = (range ? view.lineBlockAt(range.to) : line).to + 1;
    }
  }

  if (effects.length) view.dispatch({ effects });
  return !!effects.length;
};

// this is a terrible hack but strange bugs are about this one
// removing autocomplete and suggestions
const bs = basicSetup.filter((_, i) => ![11, 12].includes(i));

export function createEditorView(onUpdate = () => {}) {
  const editor = new EditorView({
    state: EditorState.create({
      extensions: [
        bs,
        keymap.of([indentWithTab]), // TODO: We should put a note about Esc+Tab for accessibility somewhere.
        indentUnit.of("  "),
        javascript(),
        editors,
        EditorView.updateListener.of(onUpdate)
      ]
    })
  });

  editor.collapseRanges = collapseRanges(editor);

  return editor;
}
