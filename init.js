import { events } from "./events.js";
import { dispatch } from "./dispatch.js";
import { html } from "./uhtml.js";

const DEFAULT_CARTRIDGE = "fec076692603e11112c10e206a5bc0bc";

function getParam(key) {
  const search = new URLSearchParams(window.location.search);
  return search.get(key);
}

function removeParam(key) {
  const url = new URL(window.location);
  url.searchParams.delete(key);
  window.history.pushState({}, null, url);
}

export function loadFromDefault() {
  dispatch("GENERATE_NAME");
  return loadFromS3(DEFAULT_CARTRIDGE);
}

function loadFromStorage() {
  if (getParam("cached") === "false") return;

  const storedData = window.localStorage.getItem("hc-game-lab");
  if (!storedData) {
    return null;
  }
  const saved = JSON.parse(storedData);

  if (Array.isArray(saved))
    return dispatch("NOTIFICATION", {
      message: html`
        The following games were found in your storage:<br />
        ${saved.map(
          (save) => html`
            <button
              @click=${() => {
                dispatch("LOAD_CARTRIDGE", { saved: save });
              }}
            >
              ${save.name}
            </button>
          `
        )}
      `,
      open: false,
    });

  dispatch("NOTIFICATION", {
    message: html`
      An old game you were working on was found in your storage.<br />
      Would you like to
      <button
        @click=${() => {
          dispatch("LOAD_CARTRIDGE", { saved });
        }}
      >
        load it</button
      >?
    `,
    open: false,
  });

  // return saved;
}

async function loadFromAirtable() {
  const file = getParam("file");
  removeParam("file");
  if (!file) {
    return null;
  }
  const url = `https://api2.hackclub.com/v0.2/Saved%20Projects/Game%20Lab/${file}/?authKey=recbyefY9mTqsIsu316420036201n7omgg1e3s`;
  const result = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((r) => r.json());
  const saved = JSON.parse(result.fields["JSON"]);

  return saved;
}

async function loadFromS3(id = getParam("id")) {
  removeParam("id");
  if (!id) {
    return null;
  }
  const url = `https://project-bucket-hackclub.s3.eu-west-1.amazonaws.com/${id}.json`;
  const saved = await fetch(url, { mode: "cors" }).then((r) => r.json());

  return saved;
}

function initVert() {
  const vert = getParam("vert");
  if (vert) {
    document.documentElement.style.setProperty("--vertical-bar", `${vert}%`);
  }
}

function setGameIframe() {
  const iframe = document.querySelector(".game-iframe");
  const string = `
    <style>
      html, body {
        margin: 0px;
      }

      .outer-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: blue;
      }

      .inner-container {
        width: min-content;
        height: min-content;
        position: relative;
      }

      .text-container {
        position: absolute;
        left: 0px;
        top: 0px;
        overflow: show;
      }
    </style>
    <script defer type="module">
      import { createEval } from "${window.location.href}evalGameScript.js";

      const evalGameScript = createEval();

      window.onmessage = function(e) {
        const { data } = e;
        const { assets, prog, show } = data;

        const gameCanvas = document.querySelector(".game-canvas");

        const err = evalGameScript({ assets, prog, show, gameCanvas });

        if (err) e.source.postMessage(err, e.origin);
        
      };
    </script>
    <div class="outer-container">
      <div class="inner-container">
        <canvas class="game-canvas"></canvas>
        <div class="text-container"></div>
      </div>
    </div>
  `;

  var blob = new Blob([string], { type: "text/html" });
  iframe.src = URL.createObjectURL(blob);

  window.addEventListener("message", (e) => {
    dispatch("LOG_ERROR", { err: e.data });
  });
}

export async function init(state) {
  dispatch("FAVICON", "loading.gif");
  initVert();

  state.runStatus = "loading";
  dispatch("RENDER");
  state.codemirror = document.querySelector("#code-editor");
  events(state);

  state.challenges.forEach((x, i) => {
    if (x.link === window.location.href) {
      state.challengeIndex = i;
    }
  });

  // setGameIframe();

  window.addEventListener("error", (e) => {
    dispatch("LOG_ERROR", { err: e.error });
  });

  loadFromStorage();
  removeParam("cached");

  const saved =
    (await loadFromS3()) ||
    (await loadFromAirtable()) ||
    (await loadFromDefault());

  dispatch("LOAD_CARTRIDGE", { saved });
  dispatch("SOUND", "bootup");
  dispatch("FAVICON");

  document.dispatchEvent(new Event("init_done"));
}
