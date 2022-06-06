import { render } from "./libs/uhtml.js";
import { addEvents } from "./events.js";
import { evalGameScript } from "./evalGameScript.js";
import { view } from "./view.js";
import { upload } from "./upload.js";
import { createEditorView } from "./codemirror/cm.js";
import { loadFromURL } from "./loadFromURL.js"

const STATE = {
  codemirror: undefined,
  error: false,
  logs: [],
  name: "game-name-here",
  notifications: [],
  editor: null,
  samples: [],
}

const ACTIONS = {
  INIT: async (args, state) => {
    dispatch("RENDER");

    state.codemirror = createEditorView();
    state.codemirror.dom.id = "code-editor";
    document.querySelector("#code-editor").replaceWith(state.codemirror.dom);

    addEvents(state);

    window.addEventListener("error", (e) => {
      dispatch("LOG_ERROR", { err: e.error });
    });

    const text = await loadFromURL();
    if (text) {
      const changes = {
        from: 0,
        insert: text
      };

      state.codemirror.dispatch({ changes })
    }


    document.querySelector(".game-canvas").focus();
    dispatch("RENDER");
  },
  RUN(args, state) {
    console.log("run");
    state.logs = [];
    state.error = false;
    
    const cmLines = document.querySelectorAll(".cm-line");

    for (let i = 0; i < cmLines.length; i++) {
      const cmLine = cmLines[i];
      cmLine.style.background = "";
      cmLine.classList.remove("err-line");
    }

    const script = state.codemirror.state.doc.toString();
    const err = evalGameScript(script);
    if (err) dispatch("LOG_ERROR", { err });

    dispatch("RENDER");
  },
  UPLOAD(args, state) {
    upload(state.codemirror.state.doc.toString());
  },
  LOG_ERROR({ err }, state) {
    console.log(err);

    const location = err.stack.match(/<anonymous>:(.+)\)/);
    let line = null;
    let col = null;

    if (location) {
      let lineCol = location[1].split(":").map(Number);
      line = lineCol[0] - 2;
      col = lineCol[1];
    }

    const msg =
      line && col
        ? `${err.message} on line ${line} in column ${col}`
        : err.message;

    state.error = true;
    state.logs = [...state.logs, msg];
    dispatch("RENDER");

    const cmLines = document.querySelectorAll(".cm-line");

    for (let i = 0; i < cmLines.length; i++) {
      if (!line || i + 1 !== line) continue;

      const cmLine = cmLines[i];
      cmLine.classList.add("err-line");
      cmLine.style.background = "#ecb2b2";
    }
  },
  SET_EDITOR(editor, state) {
    state.editor = editor;
    dispatch("RENDER");
    if (editor?.initValue) {
      const el = document.getElementById("asset-editor");
      el.loadInitValue && el.loadInitValue(editor.initValue);
    }
  },
  EDITOR_TEXT(text, state) {
    if (!state.editor) return console.log("EDITOR_TEXT but no editor");
    if (state.editor.debug) return console.log(text);
    
    state.codemirror.dispatch({ changes: {
      from: state.editor.from,
      to: state.editor.to,
      insert: text
    } })
    state.editor.to = state.editor.from + text.length;

    dispatch("RUN");
  },
  RENDER(args, state) {
    render(document.querySelector(".root"), view(state));
  },
}

export function dispatch(action, args = {}) {
  console.log(action);
  const trigger = ACTIONS[action];
  if (trigger) return trigger(args, STATE);
  else {
    console.log("Action not recongnized:", action);
    return null;
  }
}
