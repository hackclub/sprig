import { EditorState, basicSetup } from "@codemirror/basic-setup";
import { EditorView, keymap } from "@codemirror/view";
import { StateEffect } from "@codemirror/state";
import { indentUnit, foldable, foldEffect } from "@codemirror/language";
import { indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import booleanCheckbox from './booleanCheckbox.js';
import editors from './editors.js';


const foldRange = view => (start, end) => {
  let { state } = view, effects = [];
  for (let pos = start; pos < end;) {
      let line = view.lineBlockAt(pos), range = foldable(state, line.from, line.to);
      if (range)
          effects.push(foldEffect.of(range));
      pos = (range ? view.lineBlockAt(range.to) : line).to + 1;
  }
  if (effects.length)
      view.dispatch({ effects });
  return !!effects.length;
};

export function createEditorView(onUpdate = () => {}) {
  const editor = new EditorView({
    state: EditorState.create({
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]), // TODO: We should put a note about Esc+Tab for accessibility somewhere.
        indentUnit.of("  "),
        javascript(),
        // booleanCheckbox,
        editors,
        EditorView.updateListener.of(onUpdate)
      ]
    })
  });

  editor.foldRange = foldRange(editor);

  return editor;
}
