import { html, render, svg } from "./uhtml.js";
import { view } from "./view.js";
import { init } from "./init.js";
import { save } from "./save.js";
import { Engine } from "./Engine.js";
import { size_up_sprites } from "./size_up_sprites.js";
import { latestEngineVersion } from "./github.js";
import { createPixelEditor } from "./pixel-editor/pixel-editor.js";
import { createSequencer } from "./sequencer/sequencer.js";
import { playTune, loopTune } from "./tunePlayers.js";
import uiSounds from "./assets/ui-sounds.js";
import notification from "./utils/notification.js";
import validate from "./utils/validate.js";

const STATE = {
  codemirror: undefined,
  url: undefined,
  show: { origin: false, hitbox: false },
  examples: [],
  error: false,
  logs: [],
  dispatchLogs: [], // Logs for dispatch functions called
  assetEditor: undefined, // type :: pixelEditor | sequencer which have different interfaces
  assets: [],
  mouseX: 0,
  mouseY: 0,
  engineVersion: null, // TODO: actually start loading data depending on this value
  previousID: null, // TODO: start setting this correctly on cartridge load
  tunePlayers: [],
  selected_asset: -1,
  name: "name-here",
  saveLinkStatus: "ready",
  saveFileStatus: "ready",
  runStatus: "loading",
  bugReportStatus: "ready",
  lastSaved: {
    name: "",
    text: "",
    link: "",
  },
};

let currentEngine;
const ACTIONS = {
  INIT(args, state) {
    init(state);
  },
  RUN(args, state) {
    const string = state.codemirror.view.state.doc.toString();

    const hasImport = /import\s/.test(string);
    if (hasImport) {
      // how to inject included into this scope?
      const blob = URL.createObjectURL(
        new Blob([string], { type: "text/javascript" })
      );
      import(blob).then((res) => {
        // console.log(imported);
        // TODO: these are accumulating how can I clear them out?
        URL.revokeObjectURL(blob);
      });
    } else {
      state.error = false;
      state.logs = [];
      if (state.tunePlayers.length > 0) {
        state.tunePlayers.forEach(x => x.end()); 
        state.tunePlayers = [];
      }

      Engine.show = state.show;

      const sprites = state.assets.filter(a => a.type === "sprite").map(a => a.data);

      size_up_sprites(sprites);

      const gameCanvas = document.querySelector(".game-canvas");

      const included = {
        // blacklist
        document: null,
        window: null,
        localStorage: null,
        // end of blacklist
        _state: state,
        playTune() {
          const tunePlayer = playTune(...arguments);
          state.tunePlayers.push(tunePlayer);

          return tunePlayer;
        },
        
        loopTune() {
          const tunePlayer = loopTune(...arguments);
          state.tunePlayers.push(tunePlayer);

          return tunePlayer;
        },
        gameCanvas,
        createEngine(...args) {
          if (currentEngine) cancelAnimationFrame(currentEngine._animId);
          currentEngine = new Engine(...args);
          return currentEngine;
        },
      };

      state.assets.forEach(asset => {
        included[asset.name] = asset.data;
      });

      let { success, error } = validate(string);
      if (success) {

        try { // TODO can we run this in an iframe?
          new Function(...Object.keys(included), string)(
            ...Object.values(included)
          );
        } catch (e) {
          console.log(e);
          state.error = true;
          console.log(e.stack, 'stack', e.message, 'message')
          let split = e.stack.split('\n').slice(0, 2);
          function filterInts (str) {
            return str.split('').filter(char => char == +char).join('');
          }
          function checkLine (line) {
            let colonSplit = line.split(':');
            if (!(colonSplit.length >= 3)) return false;
            if (isNaN(+filterInts(colonSplit[colonSplit.length - 1]))) return false; // If the integer is not similar to the string, it's not a number
            if (isNaN(+filterInts(colonSplit[colonSplit.length - 2]))) return false;
            return true;
          }
          let lineNumber = e.stack.includes(e.message) ? 1 : 0
          console.log(split, checkLine(split[lineNumber]));
          if (checkLine(split[lineNumber])) {
            let trace = split[lineNumber].split(':')[split[lineNumber].split(':').length - 2] + ':' + split[lineNumber].split(':')[split[lineNumber].split(':').length - 1]
            let [line, col] = trace.split(':');
            const str = `${e.stack.includes(e.message) ? split[0] : 'RuntimeError: ' + e.message}\n    at code.js:${+filterInts(line) - 2}:${+filterInts(col)}`;
            state.logs.push(str);
          }
          else state.logs.push(e.stack);
        }
      } else {
        state.error = true;
        const str = `SyntaxError: ${error.message}\n    at code.js:${error.line}:${error.col}`;
        state.logs.push(str);
      }
      dispatch("RENDER");
      document.querySelector(".game-canvas").focus();
    }
  },
  SOUND(arg, state) {
    uiSounds[arg]()
  },
  REPORT_BUG: async (args, state) => {
    state.bugReportStatus = "loading"
    notification({
      message: "Generating a bug report... (1/3)"
    });
    const report = {};
    report['Engine Version'] = state.engineVersion;
    await dispatch("SAVE", { type: 'link', copyUrl: false });
    report['Project Link'] = state.lastSaved.link;
    notification({
      message: "Generating a bug report... (2/3)"
    });
    function truncate (string, length, ending) {
      return (string.length > length ? string.substring(0, length - ending.length) + ending : string);
    }
    report['IP Address'] = await fetch('https://ifconfig.me/ip').then(response => response.text());
    report['Dispatch Event Log'] = state.dispatchLogs.slice(0, 50).map(entry => truncate(JSON.stringify(entry, null, 4), 1999, '...')).join('\n\n');
    report['Error Log'] = state.logs.slice(0, 50).map(entry => truncate(entry.stack || JSON.stringify(entry, null, 4), 1999, '...')).join('\n\n');
    report['User Agent'] = await fetch('https://ifconfig.me/ua').then(response => response.text());
    report['State'] = truncate(JSON.stringify({
      url: state.url,
      show: state.show,
      examples: state.examples,
      error: state.error,
      mouseX: state.mouseX,
      mouseY: state.mouseY,
      engineVersion: state.engineVersion,
      previousID: state.previousID,
      selected_asset: state.selected_asset,
      name: state.name,
      lastSaved: state.lastSaved,
    }, null, 4), 99900, '...');
    notification({
      message: "Generating a bug report... (3/3)"
    });
    const url = new URL('https://airtable.com/shrpcDFA5f9wEOSIm')
    for (const key in report) {
      url.searchParams.append(`prefill_${key}`, report[key])
    }
    window.open(url, '_blank');
    state.bugReportStatus = "ready"
    dispatch("RENDER")
  },
  GET_SAVE_STATE(args, state) {
    const prog = state.codemirror.view.state.doc.toString();
    return JSON.stringify({
      prog,
      assets: state.assets,
      name: state.name,
      previousID: state.previousID,
      engineVersion: state.engineVersion
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
  LOAD_CARTRIDGE: async ({ saved }, state) => {
    const newProg = saved.prog;
    const currentProg = state.codemirror.view.state.doc.toString();

    state.codemirror.view.dispatch({
      changes: { from: 0, to: currentProg.length, insert: newProg },
    });

    state.assets = saved.assets || [];

    state.name = saved.name

    // TODO: do we need to select default asset? maybe not

    if (!state.engineVersion) {
      state.engineVersion = await latestEngineVersion()
    }

    state.runStatus = 'ready'
    dispatch("RENDER");
    dispatch("RUN");
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
      )
      const grid = state.assetEditor.createEmptyGrid();
      state.assetEditor.setGridColors(grid);

      const name = "sprite_" + randString(3);
      state.assets.push({
        name,
        type: "sprite",
        data: grid
      })

      state.selected_asset = state.assets.length - 1;
    } else if (assetType === "tune") {
      state.assetEditor = createSequencer(
        document.querySelector(".asset-editor")
      )

      const name = "tune_" + randString(3);
      const tune = state.assetEditor.getTune();
      state.assets.push({
        name,
        type: "tune",
        data: tune
      })
      state.assetEditor.setTune(tune);
      state.selected_asset = state.assets.length - 1;
    }

    dispatch("RENDER");
  },
  SET_NAME({ name }, state) {
    state.name = name.trim().replace(/\s+/g,'-') || "project-name"

    return state.name
  },
  CHANGE_ASSET_NAME({ index, newName }, state) {
    const usedNames = state.assets.map(x => x.name);
    if (usedNames.includes(newName)) return;
    else {
      state.assets[index].name = newName;
      state.selected_asset = index;
    }
    dispatch("RUN");
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
      )

      const grid = state.assets[index].data;
      state.assetEditor.setGridColors(grid);
    } else if (assetType === "tune") {
      state.assetEditor = createSequencer(
        document.querySelector(".asset-editor")
      )
      const tune = state.assets[index].data;
      state.assetEditor.setTune(tune);
    }

    state.selected_asset = index;
    dispatch("RENDER");
  },
  DELETE_ASSET({ index }, state) { // TODO this is broken
    const assetType = state.assets[index].type;
    state.selected_asset = index;

    state.assets = state.assets.filter((x, i) => i !== index);

    if (state.selected_asset >= state.assets.length) {
      state.selected_asset = state.assets.length - 1
    }

    if (state.selected_asset !== -1) dispatch("SELECT_ASSET", { index: state.selected_asset });
    else {
      if (state.assetEditor && state.assetEditor.end) state.assetEditor.end();
      const el = document.querySelector(".asset-editor");
      render(el, html``);
    }

    dispatch("RUN");
  },
  RENDER() {
    render(document.getElementById("root"), view(STATE));
  },
};

export function dispatch(action, args = {}) {
  console.log(action);
  const trigger = ACTIONS[action];
  STATE.dispatchLogs.unshift({ action, args, timestamp: Date.now() });
  if (trigger) return trigger(args, STATE);
  else {
    console.log("Action not recongnized:", action);
    return null;
  }
}