import {
  EditorState,
  EditorView,
  basicSetup
} from "../libs/@codemirror/basic-setup.js";
import { javascript } from "../libs/@codemirror/lang-javascript.js";
import booleanCheckbox from './booleanCheckbox.js';
import editors from './editors.js';

export function createEditorView(onUpdate = () => {}) {
  return new EditorView({
    state: EditorState.create({
      extensions: [
        basicSetup,
        javascript(),
        booleanCheckbox,
        editors,
        EditorView.updateListener.of(onUpdate)
      ]
    })
  });
}