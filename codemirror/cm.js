import { EditorState, basicSetup } from "@codemirror/basic-setup";
import { EditorView, keymap } from "@codemirror/view";
import { indentUnit } from "@codemirror/language";
import { indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import booleanCheckbox from './booleanCheckbox.js';
import editors from './editors.js';

export function createEditorView(onUpdate = () => {}) {
  const editor = new EditorView({
    state: EditorState.create({
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]), // TODO: We should put a note about Esc+Tab for accessibility somewhere.
        indentUnit.of("    "),
        javascript(),
        booleanCheckbox,
        editors,
        EditorView.updateListener.of(onUpdate)
      ]
    })
  });

  return editor;
}