import { dispatch } from "../dispatch.js";
import { loadFromURL } from "./loadFromURL.js"
import { createEditorView } from "../codemirror/cm.js";
import { addEvents } from "../events.js";
import { highlightError } from "./logError.js";

export async function init(args, state) {
  dispatch("RENDER");

  state.codemirror = createEditorView(() => {
    highlightError(state);
  });
  state.codemirror.dom.id = "code-editor";
  document.querySelector("#code-editor").replaceWith(state.codemirror.dom);

  addEvents(state);

  const savedString = window.localStorage.getItem("puzzle-lab") || "[]";
  state.savedGames = JSON.parse(savedString);
  const games = Object.fromEntries(state.savedGames);
  if ("DRAFT" in games) dispatch("SET_EDITOR_TEXT", { text: games["DRAFT"], range: [0, 0] });

  window.addEventListener("error", (e) => {
    // this is a hack to cut down on this chrome bug: https://support.google.com/chrome/thread/165732696/typing-in-console-triggers-error?hl=en
    if (e.message.includes("Uncaught EvalError")) return;

    console.error(e.error);
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

  fetch("/docs.md").then(res => res.text()).then(docs => {
    state.docs = docs;
    dispatch("RENDER");
  });

  document.querySelector(".game-canvas").focus();
  dispatch("RENDER");
}