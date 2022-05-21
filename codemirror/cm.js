import {
  EditorState,
  EditorView,
  basicSetup
} from "../libs/@codemirror/basic-setup.js";
import { javascript } from "../libs/@codemirror/lang-javascript.js";
import booleanCheckbox from './booleanCheckbox.js';
import spriteEditor from './spriteEditor.js';

export function createEditorView() {
  return new EditorView({
    state: EditorState.create({
      extensions: [
        basicSetup,
        javascript(),
        booleanCheckbox,
        spriteEditor
      ]
    })
  });
}