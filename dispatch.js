import { html, render, svg } from "./uhtml.js";
import { view } from "./view.js";
import { init } from "./init.js";
import { save } from "./save.js";
import { Engine } from "./Engine.js";
import { Muse } from "https://muse.hackclub.com/exports.js";
import { size_up_sprites } from "./size_up_sprites.js";
import { latestEngineVersion } from "./github.js";
import { createPixelEditor } from "./pixel-editor/pixel-editor.js";
import { createSequencer } from "./sequencer/sequencer.js";


const STATE = {
  codemirror: undefined,
  url: undefined,
  show: { origin: false, hitbox: false },
  examples: [],
  error: false,
  logs: [],
  assetEditor: undefined, // type :: pixelEditor | sequencer which have different interfaces
  assets: [],
  mouseX: 0,
  mouseY: 0,
  engineVersion: null, // TODO: actually start loading data depending on this value
  previousID: null, // TODO: start setting this correctly on cartridge load
  selected_asset: -1,
  name: "name-here",
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

      Engine.show = state.show;

      const sprites = state.assets.filter(a => a.type === "sprite").map(a => a.data);

      size_up_sprites(sprites);

      const gameCanvas = document.querySelector(".game-canvas");

      const included = {
        _state: state,
        html,
        render,
        svg,
        Muse,
        gameCanvas,
        createEngine(...args) {
          if (currentEngine) cancelAnimationFrame(currentEngine._animId);
          currentEngine = new Engine(...args);
          return currentEngine;
        },
        // Muse
      }; // these only work if no other imports

      state.assets.forEach(asset => {
        included[asset.name] = asset.data;
      })

      try {
        new Function(...Object.keys(included), string)(
          ...Object.values(included)
        );
      } catch (e) {
        console.log(e);
        state.error = true;
        const str = e.stack;
        state.logs.push(str);
      }
      dispatch("RENDER");
      document.querySelector(".game-canvas").focus();
    }
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
  SAVE: async ({ type }, state) => {
    await save(type, state)
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

    // TODO: do we need to select default

    // if (saved.assets.length === 0) {
    //   dispatch("CREATE_ASSET", { assetType: "sprite" })
    // } else {
    //   state.assets = saved.assets;
    //   dispatch("SELECT_ASSET", { index: 0 });
    // }

    if (!state.engineVersion) {
      state.engineVersion = await latestEngineVersion()
    }

    dispatch("RENDER");
    dispatch("RUN");
  },
  CREATE_ASSET({ assetType }, state) {
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
      console.log(state);
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

      // const grid = state.assetEditor.createEmptyGrid();
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
  CHANGE_ASSET_NAME({ index, newName }, state) {
    const usedNames = state.assets.map(x => x.name);
    if (usedNames.includes(newName)) return;
    else {
      state.assets[index].name = newName;
      state.selected_asset = index;
    }

    dispatch("RUN");
    dispatch("RENDER");
  },
  SELECT_ASSET({ index }, state) {
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
  if (trigger) return trigger(args, STATE);
  else {
    console.log("Action not recongnized:", action);
    return null;
  }
}
