import { render } from "./libs/uhtml.js";
import { view } from "./view.js";
import { upload } from "./upload.js";
import { run } from "./dispatches/run.js";
import { init } from "./dispatches/init.js";
import { logError } from "./dispatches/logError.js";
import { saveToFile } from "./dispatches/export/saveToFile.js";
import { exportS3 } from "./s3.js";
import { global_state } from "./global_state.js";
import { view as viewMobile } from "./mobile/view.js";
import { mute } from "./engine/playTune.js";
import { strip } from "ansicolor";

const ACTIONS = {
  INIT: init,
  RUN: run,
  SET_BITMAPS({ bitmaps }, state) {
    state.bitmaps = bitmaps;
  },
  TOGGLE_MUTE() {
    mute.current = !mute.current;
    dispatch("RENDER");
  },
  LOG_ERROR: logError,
  SET_EDIT_RANGE({ range }, state) {
    state.editRange = range;
  },
  SET_ASSET_EDITOR({ type, text }, state) {
    state.editor = type;
    dispatch("RUN", { headless: true });
    dispatch("RENDER");
    if (type === null) return;

    const el = document.getElementById("asset-editor");

    el.loadInitValue && el.loadInitValue({
      text,
      bitmaps: state.bitmaps
    });    
  },
  SET_EDITOR_TEXT({ text, range }, state) {
    const [ from, to ] = range;
    const changes = {
      from,
      to,
      insert: text
    };

    state.codemirror.dispatch({ changes });
    dispatch("RENDER");

    if (state.editRange === null) return;
    state.editRange[1] = state.editRange[0] + text.length;
  },
  RENDER_MOBILE({ text }, state) {
    // render(document.querySelector(".root"), view(state));
    render(document.querySelector(".root"), viewMobile(text));
    // screen.orientation.lock('landscape');
  },
  RENDER(args, state) {
    render(document.querySelector(".root"), view(state));
  },
  DOC_OPEN(args, state) {
    const setPerc = n => {
      document.documentElement.style.setProperty("--docs-percentage", `${n}%`);
      localStorage.setItem("docs-percentage", `${n}%`);
    };
    
    const perc = getComputedStyle(document.documentElement)
      .getPropertyValue("--docs-percentage");

    setPerc((perc.trim() === "0%") ? 75 : 0);

    document.querySelector(".docs").classList.toggle("docs-expanded");

    dispatch("RENDER");
  },
  SET_UPLOAD_STATE(args, state) {
    state.uploadState = args;
    dispatch("RENDER");
  },
  UPLOAD_LOG(args, state) {
    args = strip(args);
    console.log(args);
    state.uploadLogs += state.uploadLogs ? '\n' + args : args;
    dispatch("RENDER");

    const container = document.querySelector(".logs-container");
    container.scrollTo(0, container.scrollHeight);
  },
  UPLOAD(args, state) {
    if (state.uploadState === "uploading") return;
    state.uploadLogs = "";
    upload(state.codemirror.state.doc.toString());
  },

  // File operations
  LOAD_NEW_GAME({ code }, state) {
    state.newDocument = true;
    const cur = state.codemirror.state.doc.toString();
    dispatch("SET_EDITOR_TEXT", { text: "", range: [0, cur.length] });
    dispatch("RUN");
    
    state.newDocument = true;
    dispatch("SET_EDITOR_TEXT", { text: code, range: [0, 0] });

    const titleMatch = code.match(/@title:\s+([^\n]+)/);
    const name = (titleMatch !== null) ? titleMatch[1] : "UNTITLED";
    state.prevName = name;
    
    state.staleRun = true;
    dispatch("RENDER");
  },
  SAVE_TO_STORAGE(args, state) {
    if (state.newDocument) {
      state.newDocument = false;
      return;
    }

    const code = state.codemirror.state.doc.toString();

    const titleMatch = code.match(/@title:\s+([^\n]+)/);
    const name = (titleMatch !== null) ? titleMatch[1] : "UNTITLED";

    const gameDict = Object.fromEntries(state.savedGames);
    if (state.prevName !== null && state.prevName !== name) {
      delete gameDict[state.prevName];
    }

    const newSave = [ name, code ];
    const currentGames = state.savedGames.filter(x => x[0] !== name && x[0] !== state.prevName);
    
    state.savedGames = [ newSave, ...currentGames ];
    state.prevName = name;
    window.localStorage.setItem("puzzle-lab", JSON.stringify(state.savedGames));
    window.localStorage.setItem("last-game", name);
  },
  SAVE_TO_FILE(args, state) {
    const string = state.codemirror.state.doc.toString();
    const match = string.match(/@title:\s+([^\n]+)/);
    const name = (match !== null) ? match[1] : "UNTITLED";
    saveToFile(`${name}.js`, string);
  },
  async GET_URL(args, state) {
    if (state.shareLinkState !== "idle") return console.warn("Share already in progress");

    state.shareLinkState = "loading";
    dispatch("RENDER");

    const string = state.codemirror.state.doc.toString();
    const link = await exportS3(string);
    console.log(`Got link: ${link}`);

    const input = document.createElement("input");
    input.value = link;
    input.select();
    document.execCommand("copy");
    input.remove();
    
    navigator.clipboard.writeText(link)

    state.shareLinkState = "copied";
    dispatch("RENDER");
    setTimeout(() => {
      state.shareLinkState = "idle";
      dispatch("RENDER");
    }, 3000);

    fetch("https://misguided.enterprises/clubscraps/cabal", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link })
    });
  },
}

export function dispatch(action, args = {}) {
  const trigger = ACTIONS[action];
  if (trigger) return trigger(args, global_state);
  else {
    console.log("Action not recognized:", action);
    return null;
  }
}
