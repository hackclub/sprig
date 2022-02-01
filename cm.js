// Don't import this file directly - instead import cm.bundle.js
import {
    EditorState,
    EditorView,
    basicSetup
} from "@codemirror/basic-setup";
import { javascript } from "@codemirror/lang-javascript";

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