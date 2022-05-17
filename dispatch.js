import { render } from "./libs/uhtml.js";
import "./libs/codemirror-js.js";
import { addEvents } from "./events.js";
import { evalGameScript } from "./evalGameScript.js";
import { view } from "./view.js";

const STATE = {
  codemirror: undefined,
  error: false,
  logs: [],
  name: "game-name-here",
  notifications: [],
}

const ACTIONS = {
  INIT(args, state) {
    dispatch("RENDER");
    state.codemirror = document.querySelector(".code-editor");
    addEvents(state);

    window.addEventListener("error", (e) => {
      dispatch("LOG_ERROR", { err: e.error });
    });

    document.querySelector(".game-canvas").focus();
    dispatch("RENDER");
  },
  RUN(args, state) {
    console.log("run");
    const script = state.codemirror.view.state.doc.toString();
    const err = evalGameScript(script);
    if (err) dispatch("LOG_ERROR", { err });

    dispatch("RENDER");
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
    state.logs = [...STATE.logs, msg];
    dispatch("RENDER");

    const cmLines = document.querySelectorAll(".cm-line");

    for (let i = 0; i < cmLines.length; i++) {
      if (!line || i + 1 !== line) continue;

      const cmLine = cmLines[i];

      cmLine.style.background = "#ecb2b2";
    }
  },
  RENDER(args, state) {
    render(document.querySelector(".root"), view(STATE));
  },
}

export function dispatch(action, args = {}) {
  const trigger = ACTIONS[action];
  if (trigger) return trigger(args, STATE);
  else {
    console.log("Action not recongnized:", action);
    return null;
  }
}