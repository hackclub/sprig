import { events } from "./events.js";
import { defaultProg } from "./defaultProg.js";
import { createPixelEditor } from "./pixel-editor/pixel-editor.js";
import { Cartridge } from "./cartridge.js";
import { dispatch } from "./dispatch.js";

async function loadFromStorage({state}) {
    const saved = JSON.parse(window.localStorage.getItem("hc-game-lab"));

    if (!saved) {
      state.codemirror.view.dispatch({
        changes: { from: 0, insert: defaultProg.trim() },
      });
      dispatch("CREATE_SPRITE");
    } else {
      const prog = saved.prog;
      state.codemirror.view.dispatch({
        changes: { from: 0, insert: !prog ? defaultProg.trim() : prog },
      });

      if (Object.keys(saved.sprites).length === 0) dispatch("CREATE_SPRITE");
      else {
        if (Array.isArray(Object.values(saved.sprites)[0]))
          saved.sprites = Object.fromEntries(
            Object.entries(saved.sprites).map(([name, colors]) => [
              name,
              { size: [32, 32], colors },
            ])
          );
        state.sprites = saved.sprites;
        const name = Object.keys(saved.sprites)[0];
        dispatch("SELECT_SPRITE", { name });
      }
    }

    dispatch("RENDER");
    dispatch("RUN");
}

async function loadFromAirtable() {
      const url = `https://api2.hackclub.com/v0.2/Saved%20Projects/Game%20Lab/${file}/?authKey=recbyefY9mTqsIsu316420036201n7omgg1e3s`;
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((res) =>
        res.json().then((json) => {
          console.log(json);
          const saved = JSON.parse(json.fields["JSON"]);
          dispatch("UPLOAD", { saved });
        })
      );

}

async function loadFromS3({id, state}) {
  console.log({id})
  state.cartridge = new Cartridge({id})
  await state.cartridge.download()
  window.cart = state.cartridge
  const saved = JSON.parse(state.cartridge.content)
  dispatch("UPLOAD", {saved})
}

export async function init(state) {
  const url = new URL(window.location.href);

  const search = window.location.search;
  const file = new URLSearchParams(search).get("file");
  const vert = new URLSearchParams(search).get("vert");
  const id = new URLSearchParams(search).get("id");
  console.log({id})

  if (vert) {
    document.documentElement.style.setProperty("--vertical-bar", `${vert}%`);
  }

  dispatch("RENDER");
  state.pixelEditor = createPixelEditor(
    document.querySelector(".pixel-editor")
  );
  state.codemirror = document.querySelector("#code-editor");
  events(state);

  if (file) {
    loadFromAirtable(file)
  }
  if (id) {
    loadFromS3({id, state})
  }
  if (!id && !file) {
    loadFromStorage({state})
  }
  if (!state.cartridge) {
    // we should always have a cartridge
    state.cartridge = new Cartridge()
  }
}
