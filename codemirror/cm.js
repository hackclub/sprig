import {
    EditorState,
    EditorView,
    basicSetup
} from "../pkg/@codemirror/basic-setup.js";
import { javascript } from "../pkg/@codemirror/lang-javascript.js";
import booleanExt from "./booleanExtension.js"
import spriteExt from "./spriteExtension.js";

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