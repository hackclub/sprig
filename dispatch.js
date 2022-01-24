import { html, render, svg } from "./uhtml.js";
import { view } from "./view.js";
import { init } from "./init.js";
import { Engine } from "./Engine.js";
import { Muse } from "https://muse.hackclub.com/exports.js";

function copy(str) {
  const inp = document.createElement("input");
  document.body.appendChild(inp);
  inp.value = str;
  inp.select();
  document.execCommand("copy", false);
  inp.remove();
}

function showShared() {
  document.querySelector(".shared-modal").classList.toggle("hide");
  setTimeout(
    () => document.querySelector(".shared-modal").classList.toggle("hide"),
    3000
  );
}

const STATE = {
  codemirror: undefined,
  url: undefined,
  shareType: "airtable",
  show: { origin: false, hitbox: false },
  examples: [],
  error: false,
  logs: [],
  name: "name-here",
  pixelEditor: undefined,
  sprites: {},
  mouseX: 0,
  mouseY: 0,
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
    return JSON.stringify({ prog, sprites: state.sprites, name: state.name });
  },
  SAVE({ type }, state) {
    const saveStateObj = JSON.parse(dispatch("GET_SAVE_STATE"));

    if (type === "link") {
      if (
        state.lastSaved.name === saveStateObj.name &&
        state.lastSaved.prog === saveStateObj.prog
      ) {
        copy(state.lastSaved.link);
        showShared();
        return;
      }

      const super_secret_authToken = "recbyefY9mTqsIsu316420036201n7omgg1e3s"; // DO NOT USE PLEASE!!!
      const url = `https://airbridge.hackclub.com/v0.2/Saved%20Projects/Game%20Lab/?authKey=${super_secret_authToken}`;
      (async () => {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Name: saveStateObj.name,
            JSON: dispatch("GET_SAVE_STATE"),
          }),
        }).then((r) => r.json());

        console.log(res);

        copy(res.fields["Link"]);
        showShared();
        state.lastSaved.name = saveStateObj.name;
        state.lastSaved.prog = saveStateObj.prog;
        state.lastSaved.link = res.fields["Link"];
      })();
    }

    if (type === "file") {
      downloadText(`${state.name}.json`, JSON.stringify(saveStateObj));
    }
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
  UPLOAD({ saved }, state) {
    const newProg = saved.prog;
    const currentProg = state.codemirror.view.state.doc.toString();

    state.codemirror.view.dispatch({
      changes: { from: 0, to: currentProg.length, insert: newProg },
    });

    state.sprites = saved.sprites;

    if (Object.keys(saved.sprites).length === 0) dispatch("CREATE_SPRITE");
    else {
      state.sprites = saved.sprites;
      const name = Object.keys(saved.sprites)[0];
      dispatch("SELECT_SPRITE", { name });
    }

    dispatch("RENDER");
    dispatch("RUN");
  },
  LOAD_EXAMPLE({ content }, state) {
    const string = state.codemirror.view.state.doc.toString();
    state.codemirror.view.dispatch({
      changes: { from: 0, to: string.length, insert: content },
    });
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
    // console.log("rendered");
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

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain" });

  var link = document.createElement("a"); // Or maybe get it from the current document
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}`;
  link.click();
  URL.revokeObjectURL(link);
}
