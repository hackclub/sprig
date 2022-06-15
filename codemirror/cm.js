import { EditorState, basicSetup } from "../libs/@codemirror/basic-setup.js";
import { EditorView, keymap } from "../libs/@codemirror/view.js";
import { indentUnit } from "../libs/@codemirror/language.js";
import { indentWithTab } from "../libs/@codemirror/commands.js";
import { javascript } from "../libs/@codemirror/lang-javascript.js";
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