// Don't import this file directly - instead import cm.bundle.js
import {
    EditorState,
    EditorView,
    basicSetup
} from "./@codemirror/basic-setup.js";
import { javascript } from "./@codemirror/lang-javascript.js";

export default function init() {
    return new EditorView({
        state: EditorState.create({
            extensions: [
                basicSetup,
                javascript()
            ]
        }),
    });
}