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
  })

  const docsPerc = parseInt(localStorage.getItem("docs-percentage"));
  if (!isNaN(docsPerc)) {
    document.documentElement.style.setProperty("--docs-percentage", `${docsPerc}%`);
  }

  document.querySelector(".game-canvas").focus();
  dispatch("RENDER");
}