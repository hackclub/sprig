import { html, render, svg } from "./uhtml.js";
import { view } from "./view.js";
import { init } from "./init.js";
import { save } from "./save.js";
import { Engine } from "./Engine.js";
import { Muse } from "https://muse.hackclub.com/exports.js";
import { latestEngineVersion } from "./github.js";


const STATE = {
  codemirror: undefined,
  url: undefined,
  show: { origin: false, hitbox: false },
  examples: [],
  error: false,
  logs: [],
  pixelEditor: undefined,
  sprites: {},
  mouseX: 0,
  mouseY: 0,
  engineVersion: null, // TODO: actually start loading data depending on this value
  previousID: null, // TODO: start setting this correctly on cartridge load
  selected_sprite: "",
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

      const included = {
        _state: state,
        html,
        render,
        svg,
        Muse,
        createEngine(...args) {
          if (currentEngine) cancelAnimationFrame(currentEngine._animId);
          currentEngine = new Engine(...args);
          return currentEngine;
        },
        // Muse,
        ...state.sprites,
      }; // these only work if no other imports

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
  SHARE_TYPE({ type }, state) {
    state.shareType = type;
    dispatch("RENDER");
  },
  GET_SAVE_STATE(args, state) {
    const prog = state.codemirror.view.state.doc.toString();
    return JSON.stringify({
      prog,
      sprites: state.sprites,
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
  SIZE_UP_SPRITES({}, state) {
    function contextBoundingBox(sprite, w, h) {
      const occupiedPixel = (pixel) => pixel[3] > 0;

      const ascending = (a, b) => a - b;
      const xs = sprite
        .reduce((a, p, i) => (p[3] == 0 ? a : [...a, i % w]), [])
        .sort(ascending);
      const ys = sprite
        .reduce((a, p, i) => (p[3] == 0 ? a : [...a, Math.floor(i / w)]), [])
        .sort(ascending);

      return {
        x: xs[0],
        y: ys[0],
        maxX: xs[xs.length - 1],
        maxY: ys[ys.length - 1],
        width: xs[xs.length - 1] - xs[0] + 1,
        height: ys[ys.length - 1] - ys[0] + 1,
      };
    }

    for (const sprite of Object.values(state.sprites)) {
      sprite.bounds = contextBoundingBox(sprite.colors, 32, 32);
      if (sprite.bounds.x === undefined) {
        sprite.bounds = {
          x: 0,
          y: 0,
          maxX: 0,
          maxY: 0,
          width: 1,
          height: 1,
        };
      }
    }
  },
  LOAD_CARTRIDGE: async ({ saved }, state) => {
    const newProg = saved.prog;
    const currentProg = state.codemirror.view.state.doc.toString();

    state.codemirror.view.dispatch({
      changes: { from: 0, to: currentProg.length, insert: newProg },
    });

    state.sprites = saved.sprites;

    if (Object.keys(saved.sprites).length === 0) {
      dispatch("CREATE_SPRITE")
    } else {
      state.sprites = saved.sprites;
      const name = Object.keys(saved.sprites)[0];
      dispatch("SELECT_SPRITE", { name });
    }

    if (!state.engineVersion) {
      state.engineVersion = await latestEngineVersion()
    }

    dispatch("RENDER");
    dispatch("RUN");
  },
  CREATE_SPRITE(args, state) {
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

    const grid = state.pixelEditor.createEmptyGrid();
    const name = "sprite_" + randString(3);
    state.sprites[name] = grid;
    state.pixelEditor.setGridColors(grid);
    state.selected_sprite = name;
    dispatch("RENDER");
  },
  CHANGE_SPRITE_NAME({ oldName, newName }, state) {
    // check name is valid, not duplicate or blank
    if (newName in state.sprites) return;

    const sprite = state.sprites[oldName];
    state.sprites[newName] = sprite;
    delete state.sprites[oldName];
    state.selected_sprite = newName;
    dispatch("RUN");
    dispatch("RENDER");
  },
  SELECT_SPRITE({ name }, state) {
    const grid = state.sprites[name];
    state.selected_sprite = name;
    state.pixelEditor.setGridColors(grid);
    dispatch("RENDER");
  },
  DELETE_SPRITE({ name }, state) {
    delete state.sprites[name];
    if (
      state.selected_sprite === name &&
      Object.keys(state.sprites).length > 0
    ) {
      const name = Object.keys(state.sprites)[0];
      dispatch("SELECT_SPRITE", { name });
    }

    if (Object.keys(state.sprites).length === 0) dispatch("CREATE_SPRITE");

    dispatch("RENDER");
    dispatch("RUN");
  },
  RENDER() {
    render(document.getElementById("root"), view(STATE));
  },
};

export function dispatch(action, args = {}) {
  const trigger = ACTIONS[action];
  if (trigger) return trigger(args, STATE);
  else {
    console.log("Action not recongnized:", action);
    return null;
  }
}
