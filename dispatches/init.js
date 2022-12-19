import { dispatch } from "../dispatch.js";
import { loadFromURL } from "./loadFromURL.js"
import { createEditorView } from "../codemirror/cm.js";
import { addEvents } from "../events.js";
import { highlightError } from "./logError.js";
import { sizeGameCanvas } from "./sizeGameCanvas.js";

function getParam(key) {
  const search = new URLSearchParams(window.location.search);
  return search.get(key);
}

function removeParam(key) {
  const url = new URL(window.location);
  url.searchParams.delete(key);
  window.history.replaceState({}, document.title, url);
}

export async function init(args, state) {
  dispatch("RENDER");

  state.codemirror = createEditorView((update) => {
    highlightError(state);

    if (!update.docChanged) return;
    dispatch("SAVE_TO_STORAGE");
    state.staleRun = true;
    dispatch("RENDER");
  });

  state.codemirror.dom.id = "code-editor";
  document.querySelector("#code-editor").replaceWith(state.codemirror.dom);

  addEvents(state);

  const savedString = window.localStorage.getItem("puzzle-lab") || "[]";
  state.savedGames = JSON.parse(savedString);

  const lastGameName = window.localStorage.getItem("last-game");
  const lastGame = state.savedGames.find(([name]) => name === lastGameName)
  if (lastGame) {
    dispatch("LOAD_NEW_GAME", { code: lastGame[1] });
  } else {
    const link = "https://raw.githubusercontent.com/hackclub/sprig/main/games/getting_started.js";
    const code = await fetch(link).then(x => x.text());
    dispatch("LOAD_NEW_GAME", { code });
  }

  window.addEventListener("error", (err) => {
    // this is a hack to cut down on this chrome bug: https://support.google.com/chrome/thread/165732696/typing-in-console-triggers-error?hl=en
    if (err.message.includes("Uncaught EvalError")) return;

    dispatch("LOG_ERROR", { type: "page", err });
  });

  const file = getParam("file");
  // removeParam("file");
  if (file) {
    const code = await loadFromURL(file);
    dispatch("LOAD_NEW_GAME", { code });

    // These params only make sense when running from a file

    if (getParam("run")) dispatch("RUN")
    if (getParam("hide")) document.querySelector(".code-container").remove()

    const watch = getParam("watch")
    if (watch) {
      let oldCode = code

      setInterval(async () => {
        const newCode = await loadFromURL(file)

        if (newCode !== oldCode){
          oldCode = newCode
          dispatch("LOAD_NEW_GAME", { code: oldCode })
          if (getParam("run")) dispatch("RUN")
        }
      }, watch)
    }
  }

  const id = getParam("id");
  // removeParam("id");
  if (id) {
    const url = `https://project-bucket-hackclub.s3.eu-west-1.amazonaws.com/${id}.json`
    const json = await fetch(url, { mode: "cors" }).then((r) => r.json());
    dispatch("LOAD_NEW_GAME", { code: json.text });
  }

  const container = document.querySelector(".game-canvas-container");
  new ResizeObserver(sizeGameCanvas).observe(container);

  document.querySelector(".game-canvas").focus();

  const md = await fetch("https://raw.githubusercontent.com/hackclub/sprig/main/docs/docs.md").then(res => res.text());
  const mdRenderer = document.querySelector("markdown-renderer");
  mdRenderer.innerHTML = md;

  const DEFAULT_DOCS_PERCENTAGE = "0%";
  const docsPerc = localStorage.getItem("docs-percentage") || DEFAULT_DOCS_PERCENTAGE;
  document.documentElement.style.setProperty("--docs-percentage", docsPerc);
  document.querySelector(".docs").classList.toggle("docs-expanded", docsPerc.trim() !== "0%");

  dispatch("RENDER");

  // switch to mobile mode
  const mobile = isMobile();
  if (mobile) {
    const text = state.codemirror.state.doc.toString();
    dispatch("RENDER_MOBILE", { text });
    sizeGameCanvas();
  }
}

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
