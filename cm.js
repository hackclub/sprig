// Don't import this file directly - instead import cm.bundle.js
import {
    EditorState,
    EditorView,
    basicSetup
} from "./pkg/@codemirror/basic-setup.js";
import { javascript } from "./pkg/@codemirror/lang-javascript.js";
import booleanExt from "./cmBooleanExtension.js"
import spriteExt from "./cmSpriteExtension.js";

export default function init() {
    return new EditorView({
        state: EditorState.create({
            extensions: [
                spriteExt,
                booleanExt,
                basicSetup,
                javascript()
            ]
        }),
    });
}