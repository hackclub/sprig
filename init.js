import { events } from "./events.js";
import { defaultProg } from "./defaultProg.js";
import { createPixelEditor } from "./pixel-editor/pixel-editor.js";
import lzutf8 from "https://cdn.skypack.dev/lzutf8";

export function init(state) {
  const url = new URL(window.location.href);

  const search = window.location.search;
  const file = new URLSearchParams(search).get("file");
  const vert = new URLSearchParams(search).get("vert");

  if (vert)
    document.documentElement.style.setProperty("--vertical-bar", `${vert}%`);

  dispatch("RENDER");
  state.pixelEditor = createPixelEditor(
    document.querySelector(".pixel-editor")
  );
  state.codemirror = document.querySelector("#code-editor");
  events(state);

  if (file) {
    let file_url = file;

    if (file.startsWith("rec")) {
      const url = `https://api2.hackclub.com/v0.1/Saved Projects/Game Lab/?select={"filterByFormula": "RECORD_ID()='${file}'"}`;
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((res) =>
        res.json().then((json) => {
          console.log(json);
          // state.codemirror.view.dispatch({
          //   changes: { from: 0, insert: json[0].fields["Content"] },
          // });
          // dispatch("RUN");
        })
      );
    } else {
      // if (!file.startsWith("http")) file = `examples/${file}`;
      // fetch(file_url, { mode: "cors" }).then((file) =>
      //   file.text().then((txt) => {
      //     state.codemirror.view.dispatch({ changes: { from: 0, insert: txt } });
      //     dispatch("RUN");
      //   })
      // );
    }
  } else {
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

  // (async () => {
  //     const url = `https://api2.hackclub.com/v0.1/Saved Projects/Live Editor Projects/?select={"filterByFormula": "{Public}=TRUE()"}`;
  //        const json = await fetch(url, { mode: "cors" }).then(res => res.json());
  //        state.examples = json.map(x => x.fields);
  //        dispatch("RENDER");
  //    })()
}
