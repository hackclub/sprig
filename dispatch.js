import { html, render, svg } from "./uhtml.js";
import { view } from "./view.js";
import { loadFromDefault, init } from "./init.js";
import { save } from "./save.js";
import { Engine } from "./Engine.js";
import { size_up_sprites } from "./size_up_sprites.js";
import { latestEngineVersion } from "./github.js";
import { createPixelEditor } from "./pixel-editor/pixel-editor.js";
import { createSequencer } from "./sequencer/sequencer.js";
import { playTune, loopTune } from "./tunePlayers.js";
import { createEval } from "./evalGameScript.js";
import uiSounds from "./assets/ui-sounds.js";
import notification from "./utils/notification.js";
import validate from "./utils/validate.js";
import favicon from "./utils/favicon.js";
import title from "./utils/title.js";

const STATE = {
  codemirror: undefined,
  show: { origin: false, hitbox: false },
  error: false,
  logs: [],
  dispatchLogs: [], // Logs for dispatch functions called
  assetEditor: undefined, // type :: pixelEditor | sequencer which have different interfaces
  assets: [],
  mouseX: 0,
  mouseY: 0,
  version: "0.2.2",
  previousID: null, // TODO: start setting this correctly on cartridge load
  selected_asset: -1,
  name: "game-name-here",
  saveLinkStatus: "ready",
  saveFileStatus: "ready",
  runStatus: "loading",
  loadFileStatus: "ready",
  bugReportStatus: "ready",
  lastSaved: {
    name: "",
    text: "",
    link: "",
  },
  showChallengeBar: true,
  challenges: [
    {
      name: "jumpstart", 
      link: `${window.location.origin}/?id=a03045a49a8e46b9c594eab57bca77d8`
    },
    {
      name: "crisis averted",
      link: `${window.location.origin}/?id=b17eeab7e53817731e65b57e8db91da5`
    },
    {
      name: "left behind", 
      link: `${window.location.origin}/?id=e222f64223d6da07208fe6d0b8da5086`
    },
    {
      name: "whats the hold up?", 
      link: `${window.location.origin}/?id=c6e7c88949e3c800c59dfe3bb604bec6`
    },
    {
      name: "sticky situation", 
      link: `${window.location.origin}/?id=7fb849e43733c1e2916b9238cb3b4d4a`
    },
    {
      name: "leaderb0rd", 
      link: `${window.location.origin}/?id=e039799495806408d86786b490b907eb`
    },
    {
      name: "add bounce sound", 
      link: `${window.location.origin}/?id=ecdd45d69183f9621b47236d660486e5`
    },
    {
      name: "off the walls",
      link: `${window.location.origin}/?id=0b6d386ac9fc88ef155b70dfd1b32936`
    },
    {
      name: "bridge the gap",
      link: `${window.location.origin}/?id=c6194224e3038a0ed4da73cad21d6895`
    },
    {
      name: "touch to collect", 
      link: `${window.location.origin}/?id=3f0b1c5b8f02aaa2fa324e607d30ee66`
    },
    {
      name: "multi-platforming",
      link: `${window.location.origin}/?id=f870664007aef333d9e28fb7b247c6e0`
    },
    {
      name: "debarchery",
      link: `${window.location.origin}/?id=ca81bf221b5401778dc32b7f5925784a`
    },
    {
      name: "pressed vs. held",
      link: `${window.location.origin}/?id=3e4d8a38439bf62a2b1a80fb9ee6667d`
    },
    {
      name: "animate sprite", 
      link: `${window.location.origin}/?id=1ff13ed26bf5edf03ed38edca70e67d5`
    },
    {
      name: "one jump", 
      link: `${window.location.origin}/?id=a653579c8ae71b41c8d72a1683c37bc0`
    },
    /* -- what did you just collide with!?! -- */
    {
      name: "make a bunch",
      link: `${window.location.origin}/?id=5fab8726e33df93707d92f4474848f54`
    },
    /* -- wrap game in func to restart on demand -- */
    /* -- multiple levels -- */
  ],
  challengeIndex: -1,
};

const evalGameScript = createEval();

const ACTIONS = {
  INIT(args, state) {
    init(state);
  },
  RUN(args, state) {
    const string = state.codemirror.view.state.doc.toString();

    const sprites = state.assets
      .filter((a) => a.type === "sprite")
      .map((a) => a.data);

    size_up_sprites(sprites);

    state.logs = [];
    state.error = false;

    // document.querySelector("iframe").contentWindow.postMessage({
    //   prog: string,
    //   assets: state.assets,
    //   show: state.show
    // }, '*');

    // const { error, success } = validate(string); // Re-add esprima pre-run validation

    // if (!success) {
    //   state.logs = [
    //     ...state.logs,
    //     error.message == undefined // Just in case something weird happens, encourage the user to submit a bug report if it does
    //       ? `Game Lab encountered an unexpected error. If you're seeing this, please submit a bug report by clicking the bug button at the top.\n    at code.js`
    //       : `${error.message}\n    at code.js:${error.line}:${error.col}`,
    //   ];
    //   state.error = true;
    //   dispatch("RENDER");
    //   return;
    // }

    const gameCanvas = document.querySelector(".game-canvas");
    const err = evalGameScript({
      assets: state.assets,
      prog: string,
      show: state.show,
      gameCanvas,
    });
    if (err) {
      dispatch("LOG_ERROR", { err });
      dispatch("FAVICON", "red.png");
    } else {
      dispatch("FAVICON", "yellow.png");
    }
    document.querySelector(".game-canvas").focus(); // TODO: can we focus in iframe

    dispatch("RENDER");
  },
  LOG_ERROR({ err }, state) {
    console.log(err);
    state.error = true;

    // processError will go here when ready
    state.logs = [err.stack];

    dispatch("RENDER");
  },
  SET_TITLE(arg, state) {
    if (typeof arg == "string") {
      title(arg);
    } else {
      title();
    }
  },
  SOUND(arg, state) {
    uiSounds[arg]();
  },
  FAVICON(arg = null, state) {
    if (typeof arg === "string") {
      favicon(arg);
    } else {
      favicon();
    }
  },
  REPORT_BUG: async (args, state) => {
    state.bugReportStatus = "loading";
    notification({
      message: "Generating a bug report... (1/3)",
    });
    const report = {};
    report["Engine Version"] = state.engineVersion;
    await dispatch("SAVE", { type: "link", copyUrl: false });
    report["Project Link"] = state.lastSaved.link;
    notification({
      message: "Generating a bug report... (2/3)",
    });
    function truncate(string, length, ending) {
      return string.length > length
        ? string.substring(0, length - ending.length) + ending
        : string;
    }
    report["IP Address"] = await fetch("https://ifconfig.me/ip").then(
      (response) => response.text()
    );
    report["Dispatch Event Log"] = state.dispatchLogs
      .slice(0, 50)
      .map((entry) => truncate(JSON.stringify(entry, null, 4), 1999, "..."))
      .join("\n\n");
    report["Error Log"] = state.logs
      .slice(0, 50)
      .map((entry) =>
        truncate(entry.stack || JSON.stringify(entry, null, 4), 1999, "...")
      )
      .join("\n\n");
    report["User Agent"] = await fetch("https://ifconfig.me/ua").then(
      (response) => response.text()
    );
    report["State"] = truncate(
      JSON.stringify(
        {
          url: state.url,
          show: state.show,
          examples: state.examples,
          error: state.error,
          mouseX: state.mouseX,
          mouseY: state.mouseY,
          engineVersion: state.version,
          previousID: state.previousID,
          selected_asset: state.selected_asset,
          name: state.name,
          lastSaved: state.lastSaved,
        },
        null,
        4
      ),
      99900,
      "..."
    );
    notification({
      message: "Generating a bug report... (3/3)",
    });
    const url = new URL("https://airtable.com/shrpcDFA5f9wEOSIm");
    for (const key in report) {
      url.searchParams.append(`prefill_${key}`, report[key]);
    }
    window.open(url, "_blank");
    state.bugReportStatus = "ready";
    dispatch("RENDER");
  },
  GET_SAVE_STATE(args, state) {
    const prog = state.codemirror.view.state.doc.toString();
    return JSON.stringify({
      prog,
      assets: state.assets,
      name: state.name,
      previousID: state.previousID,
      version: state.version,
    });
  },
  SAVE: async ({ type, copyUrl }, state) => {
    await save(type, state, copyUrl);
  },
  CANVAS_MOUSE_MOVE({ content: { mouseX, mouseY } }, state) {
    state.mouseX = mouseX;
    state.mouseY = mouseY;
    dispatch("RENDER");
  },
  LOAD_DEFAULT_CARTRIDGE: async ({}, state) => {
    state.loadFileStatus = 'loading';
    await dispatch("LOAD_CARTRIDGE", { saved: await loadFromDefault() });
    state.loadFileStatus = 'ready';
    dispatch("RENDER");
  },
  LOAD_CARTRIDGE: async ({ saved }, state) => {
    const el = document.querySelector(".asset-editor");
    render(el, html``);
    if (state.assetEditor && state.assetEditor.end) state.assetEditor.end();
    state.selected_asset = -1;

    dispatch("SET_TITLE", "loading...");
    const newProg = saved.prog;
    const currentProg = state.codemirror.view.state.doc.toString();

    state.codemirror.view.dispatch({
      changes: { from: 0, to: currentProg.length, insert: newProg },
    });

    state.assets = saved.assets || [];
    state.name = saved.name;
    state.previousID = saved.previousID || null;

    if (state.version !== saved.version) {
      notification({
        message: `Version mismatch.<br>
                  Editor is version: ${state.version}<br>
                  File uses version: ${saved.version}<br>
                  ${
                    saved.version
                      ? `Old editor is available <a target="_blank" href="https://gamelab-versions.hackclub.dev/${saved.version}/index.html">here</a>.`
                      : ""
                  }`,
        timeout: 5000,
      });
    }

    state.runStatus = "ready";
    dispatch("SET_TITLE", state.name);
    dispatch("RENDER");
    // dispatch("RUN");
  },
  CREATE_ASSET({ assetType }, state) {
    // need to clear asset editor
    const el = document.querySelector(".asset-editor");
    render(el, html``);

    if (state.assetEditor && state.assetEditor.end) state.assetEditor.end();

    function randString(length) {
      var randomChars = "abcdefghijklmnopqrstuvwxyz";
      var result = "";
      for (var i = 0; i < length; i++) {
        result += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length)
        );
      }
      return result;
    }

    if (assetType === "sprite") {
      state.assetEditor = createPixelEditor(
        document.querySelector(".asset-editor")
      );
      const grid = state.assetEditor.createEmptyGrid();
      state.assetEditor.setGridColors(grid);

      const name = "sprite_" + randString(3);
      state.assets.push({
        name,
        type: "sprite",
        data: grid,
      });

      state.selected_asset = state.assets.length - 1;
    } else if (assetType === "tune") {
      state.assetEditor = createSequencer(
        document.querySelector(".asset-editor")
      );

      const name = "tune_" + randString(3);
      const tune = state.assetEditor.getTune();
      state.assets.push({
        name,
        type: "tune",
        data: tune,
      });
      state.assetEditor.setTune(tune);
      state.selected_asset = state.assets.length - 1;
    }

    dispatch("RENDER");
  },
  SET_NAME({ name }, state) {
    const safeName = name
      .trim() // no whitespace before or after
      .replace(/\n/g, "") // no newlines at all
      .replace(/\s+/g, "-"); // all remaining whitespace converted to hyphyens

    dispatch("SET_TITLE", safeName);

    state.name = safeName || "my-project";

    return state.name;
  },
  CHANGE_ASSET_NAME({ e, index, newName }, state) {
    const usedNames = state.assets.map((x) => x.name);
    if (usedNames.includes(newName) || newName.length === 0) return;

    if (!/^[a-z_][a-z_0-9]*$/gi.test(newName)) {
      e.target.value = state.assets[index].name;
    }

		else {
			state.assets[index].name = newName;
			state.selected_asset = index;
		}
  },
  SELECT_ASSET({ index }, state) {
    // need to clear asset editor container to render template fresh
    const el = document.querySelector(".asset-editor");
    render(el, html``);

    if (state.assetEditor && state.assetEditor.end) state.assetEditor.end();

    const assetType = state.assets[index].type;

    if (assetType === "sprite") {
      state.assetEditor = createPixelEditor(
        document.querySelector(".asset-editor")
      );

      const grid = state.assets[index].data;
      state.assetEditor.setGridColors(grid);
    } else if (assetType === "tune") {
      state.assetEditor = createSequencer(
        document.querySelector(".asset-editor")
      );
      const tune = state.assets[index].data;
      state.assetEditor.setTune(tune);
    }

    state.selected_asset = index;
    dispatch("RENDER");
  },
  DELETE_ASSET: async ({ index }, state) => {
    dispatch("SOUND", "click");
    const assetType = state.assets[index].type;
    state.selected_asset = index;

    // msw: our use of confirm() will interupt the page's JS execution and
    // create painful clipping in the UI sounds we're trying to play. These
    // empty promises are just here to wait long enough for songs to play
    // without interrupting them
    await new Promise((resolve) => setTimeout(() => resolve(), 350));
    const shouldContinue = confirm(
      `Are you sure you want to remove that ${assetType}?`
    );
    await new Promise((resolve) => setTimeout(() => resolve(), 350));
    if (!shouldContinue) {
      dispatch("SOUND", "cancel");
      return null;
    }
    dispatch("SOUND", "delete");

    state.assets = state.assets.filter((x, i) => i !== index);

    if (state.selected_asset >= state.assets.length) {
      state.selected_asset = state.assets.length - 1;
    }

    if (state.selected_asset !== -1)
      dispatch("SELECT_ASSET", { index: state.selected_asset });
    else {
      if (state.assetEditor && state.assetEditor.end) state.assetEditor.end();
      const el = document.querySelector(".asset-editor");
      render(el, html``);
    }

    dispatch("RENDER");
  },
  RENDER() {
    render(document.getElementById("root"), view(STATE));
  },
};

export function dispatch(action, args = {}) {
  // console.log(action);
  
  const trigger = ACTIONS[action];
  STATE.dispatchLogs.unshift({ action, args, timestamp: Date.now() });
  if (trigger) return trigger(args, STATE);
  else {
    console.log("Action not recongnized:", action);
    return null;
  }
}
