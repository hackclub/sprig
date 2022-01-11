import { html, render, svg } from "./uhtml.js";
import lzutf8 from "https://cdn.skypack.dev/lzutf8";
import { view } from "./view.js";
import { init } from "./init.js";
import { Engine } from "./Engine.js";
import { Muse } from "https://hackclub.github.io/muse/exports.js";

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
  examples: [],
  error: false,
  logs: [],
  name: "name-here",
  pixelEditor: undefined,
  sprites: {},
  mouseX: 0,
  mouseY: 0,
  selected_sprite: "",
  lastSaved: {
    name: "",
    text: "",
    link: "",
  },
};

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

      const included = {
        _state: state,
        html,
        render,
        svg,
        Engine,
        Muse,
        ...state.sprites,
      }; // these only work if no other imports

      try {
        new Function(
          ...Object.keys(included),
          `
          {
            const _log = console.log;
            console.log = (...args) => {
              _state.logs.push(...args); 
              _log(...args);
            }
          }

          ${string}
        `
        )(...Object.values(included));
      } catch (e) {
        console.log(e);
        state.error = true;
        const str = JSON.stringify(e, Object.getOwnPropertyNames(e), 2);
        state.logs.push(str);
      }
      dispatch("RENDER");
    }
  },
  SHARE_TYPE({ type }, state) {
    state.shareType = type;
    dispatch("RENDER");
  },
  SHARE({ type }, state) {
    const string = state.codemirror.view.state.doc.toString();

    if (state.shareType === "binary-url" && type === "link") {
      const encoded = lzutf8.compress(string, {
        outputEncoding: "StorageBinaryString",
      });
      const address = `${window.location.origin}${window.location.pathname}?code=${encoded}`;
      copy(address);
      showShared();
    }

    if (state.shareType === "airtable" && type === "link") {
      if (
        state.lastSaved.name === state.name &&
        state.lastSaved.text === string
      ) {
        copy(state.lastSaved.link);
        showShared();
        return;
      }

      const url =
        "https://airbridge.hackclub.com/v0.2/Saved%20Projects/Live%20Editor%20Projects/?authKey=reczbhVzrrkChMMiN1635964782lucs2mn97s";
      (async () => {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Content: string,
            Name: state.name,
          }),
        }).then((r) => r.json());

        copy(res.fields["Link"]);
        showShared();
        state.lastSaved.name = state.name;
        state.lastSaved.text = string;
        state.lastSaved.link = res.fields["Link"];
      })();
    }

    if (type === "file") {
      downloadText(
        `${state.name}.json`,
        JSON.stringify({
          sprites: state.sprites,
          prog: string,
        })
      );
    }
  },
  CANVAS_MOUSE_MOVE({ content: { mouseX, mouseY } }, state) {
    state.mouseX = mouseX;
    state.mouseY = mouseY;
    dispatch("RENDER");
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
  if (trigger) trigger(args, STATE);
  else console.log("Action not recongnized:", action);
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain" });

  var link = document.createElement("a"); // Or maybe get it from the current document
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}`;
  link.click();
  URL.revokeObjectURL(link);
}
