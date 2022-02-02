import { events } from "./events.js";
import { dispatch } from "./dispatch.js";
import { createPixelEditor } from "./pixel-editor/pixel-editor.js";
import { createSequencer } from "./sequencer/sequencer.js";
import { latestEngineVersion } from "./github.js";

const DEFAULT_CARTRIDGE = '3449c9e5e332f1dbb81505cd739fbf3f'

function getParam(key) {
  const search = new URLSearchParams(window.location.search);
  return search.get(key)
}

function removeParam(key) {
  const url = new URL(window.location)
  url.searchParams.delete(key)
  window.history.pushState({}, null, url)
}

function loadFromDefault() {
  return loadFromS3(DEFAULT_CARTRIDGE)
}

async function loadFromStorage() {
  const storedData = window.localStorage.getItem("hc-game-lab")
  if (!storedData) { return null }
  const saved = JSON.parse(storedData)
  return saved
}

async function loadFromAirtable() {
  const file = getParam('file')
  removeParam('file')
  if (!file) { return null }
  const url = `https://api2.hackclub.com/v0.2/Saved%20Projects/Game%20Lab/${file}/?authKey=recbyefY9mTqsIsu316420036201n7omgg1e3s`;
  const result = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(r => r.json())
  const saved = JSON.parse(result.fields["JSON"])

  return saved
}

async function loadFromS3(id=getParam('id')) {
  removeParam('id')
  if (!id) { return null }
  const url = `https://project-bucket-hackclub.s3.eu-west-1.amazonaws.com/${id}.json`
  const saved = await fetch(url, { mode: 'cors' }).then(r => r.json())

  return saved
}

function initVert() {
  const vert = getParam('vert')
  if (vert) {
    document.documentElement.style.setProperty("--vertical-bar", `${vert}%`)
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
      }
    </style>
    <script defer type="module">
      import { Engine } from "${window.location.href}Engine.js";
      import { playTune, loopTune } from "${window.location.href}tunePlayers.js";

      let currentEngine = null;
      let tunePlayers = [];

      window.onmessage = function(e) {
        const { data } = e;
        const { assets, prog, show } = data;

        if (tunePlayers.length > 0) {
          tunePlayers.forEach(x => x.end()); 
          tunePlayers = [];
        }

        const gameCanvas = document.querySelector(".game-canvas");

        Engine.show = show;

        const included = {
          playTune() {
            const tunePlayer = playTune(...arguments);
            tunePlayers.push(tunePlayer);

            return tunePlayer;
          },
          
          loopTune() {
            const tunePlayer = loopTune(...arguments);
            tunePlayers.push(tunePlayer);

            return tunePlayer;
          },
          gameCanvas,
          createEngine(...args) {
            if (currentEngine) cancelAnimationFrame(currentEngine._animId);
            currentEngine = new Engine(...args);
            return currentEngine;
          },
        };

        assets.forEach(asset => {
          included[asset.name] = asset.data;
        })

        try {
          new Function(...Object.keys(included), prog)(
            ...Object.values(included)
          );
        } catch (err) {
          e.source.postMessage(err, e.origin);
        }

      };
    </script>
    <div class="outer-container">
      <div class="inner-container">
        <canvas class="game-canvas"></canvas>
        <div class="text-container"></div>
      </div>
    </div>
  `
  var blob = new Blob([string], { type: 'text/html' });
  iframe.src = URL.createObjectURL(blob);

  window.addEventListener("message", e => {
    dispatch("LOG_ERROR", { stack: e.data.stack });
  })
}

export async function init(state) {
  initVert()

  dispatch("RENDER");
  state.codemirror = document.querySelector("#code-editor");
  events(state);

  setGameIframe();

  const saved = await loadFromAirtable() ||
                await loadFromS3() ||
                await loadFromStorage() ||
                await loadFromDefault()
  
  dispatch("LOAD_CARTRIDGE", { saved })
}
