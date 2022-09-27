import { render } from "./libs/uhtml.js";
import { view } from "./view.js";
import { upload } from "./upload.js";
import { run } from "./dispatches/run.js";
import { init } from "./dispatches/init.js";
import { logError } from "./dispatches/logError.js";
import { setName } from "./dispatches/setName.js";
import { saveToFile } from "./dispatches/export/saveToFile.js";
import { exportS3 } from "./s3.js";
import { global_state } from "./global_state.js";
import { saveGame } from "./saveGame.js"
import { view as viewMobile } from "./mobile/view.js";
import { mute } from "./engine/playTune.js";
import { strip } from 'ansicolor';

function getURLPath(extension) {
  return (
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    extension
  );
}

const ACTIONS = {
  INIT: init,
  RUN: run,
  SET_BITMAPS({ bitmaps }, state) {
    state.bitmaps = bitmaps;
  }, 
  UPLOAD(args, state) {
    if (state.uploadState === "uploading") return;
    state.uploadLogs = "";
    upload(state.codemirror.state.doc.toString());
  },
  SAVE(args, state) {
    saveGame(state);
    state.stale = false;
    dispatch("RENDER");
  },
  SAVE_TO_FILE(args, state) {
    const string = state.codemirror.state.doc.toString();
    const match = string.match(/@title:\s+([^\n]+)/);
    const name = (match !== null) ? match[1] : "DRAFT";
    saveToFile(`${name}.js`, string);
  },
  TOGGLE_MUTE() {
    mute.current = !mute.current;
    dispatch("RENDER");
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
  SET_NAME: setName,
  LOAD_FROM_DATA({ data }, state) {
    console.log(data);
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
  }
}

export function dispatch(action, args = {}) {
  const trigger = ACTIONS[action];
  if (trigger) return trigger(args, global_state);
  else {
    console.log("Action not recognized:", action);
    return null;
  }
}
