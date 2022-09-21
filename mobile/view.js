import { html } from "../libs/uhtml.js";
import { evalGameScript } from "../engine/evalGameScript.js";

export const view = (text) => html`
  <style>
    .root {
      display: flex;
      margin: 0;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
      transform-origin: left top;
      width: 100vw;
      height: 100vh;
      user-select: none;
    }

    @media (orientation: portrait) {
      .root {
        transform: rotate(-90deg);
        width: 100vh;
        height: 100vw;
        overflow-x: hidden;
        top: 100%;
        left: 0;
      }
    }

    body {
      margin: 0;
    }

    .mobile-view {
      width: 100%;
      height: 100%;
    }

    .message {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: #00000046;
      flex-direction: column;
      gap: 20px;
      padding: 10px;
      color: white;
      align-items: flex-start;
    }

    .player {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    p {
      margin: 0;
      max-width: 90%;
    }

    .buttons {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
      
    button {
      display: block;
      background: transparent;
      border: 2px solid #5e7251;
      color: white;
      font-size: inherit;
      font-family: inherit;
      padding: 6px 12px;
      border-radius: 4px;
    }

    button.black {
      background: black;
      color: white;
      border-color: black;
    }

    a {
      text-decoration: none;
    }

    .mobile-view .game-canvas-container {
      width: 50%;
      aspect-ratio: calc(160/128);
      max-height: 100%;
    }

    .mobile-button {
      background: black;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mobile-button:active {
      background: grey;
    }

    .input-button-w {
      position: absolute;
      top: calc(50% - 75px);
      left: calc(5% + 25px);
    }

    .input-button-a {
      position: absolute;
      top: calc(50% - 25px);
      left: calc(5% - 25px);
    }

    .input-button-d {
      position: absolute;
      top: calc(50% - 25px);
      left: calc(5% + 75px);;
    }

    .input-button-s {
      position: absolute;
      top: calc(50% + 25px);
      left: calc(5% + 25px);;
    }

    .input-button-i {
      position: absolute;
      top: calc(50% - 75px);
      right: calc(5% + 25px);
    }

    .input-button-l {
      position: absolute;
      top: calc(50% - 25px);
      right: calc(5% - 25px);
    }

    .input-button-j {
      position: absolute;
      top: calc(50% - 25px);
      right: calc(5% + 75px);;
    }

    .input-button-k {
      position: absolute;
      top: calc(50% + 25px);
      right: calc(5% + 25px);;
    }

    .hidden {
      display: none;
    }
  </style>
  <div class="mobile-view">
    <div class="message">
      <p>The mobile editing experience isn't quite ready yet!</p>
      <p>Switch to your computer, check out the landing page, or play this game on your phone.</p>

      <div class="buttons">
        <button class="black" @click=${() => {
          document.querySelector(".message").classList.add("hidden");
          document.querySelector(".player").classList.remove("hidden");
          runGame(text);
        }}>Play game</button>
        <a href='https://sprig.hackclub.com'><button>Learn about Sprig &raquo;</button></a>
      </div>
    </div>

    <div class="player hidden">
      <div class="wasd">
        <div class="mobile-button no-select input-button-w" @click=${() => dispatchKey("w")}>w</div>
        <div class="mobile-button no-select input-button-a" @click=${() => dispatchKey("a")}>a</div>
        <div class="mobile-button no-select input-button-s" @click=${() => dispatchKey("s")}>s</div>
        <div class="mobile-button no-select input-button-d" @click=${() => dispatchKey("d")}>d</div>
      </div>
      <div class="game-canvas-container">
        <canvas class="game-canvas"></canvas>
        <canvas class="game-text"></canvas>
      </div>
      <div class="wasd">
        <div class="mobile-button no-select input-button-i" @click=${() => dispatchKey("i")}>i</div>
        <div class="mobile-button no-select input-button-j" @click=${() => dispatchKey("j")}>j</div>
        <div class="mobile-button no-select input-button-k" @click=${() => dispatchKey("k")}>k</div>
        <div class="mobile-button no-select input-button-l" @click=${() => dispatchKey("l")}>l</div>
      </div>
    </div>
  </div>
`

function runGame(text) {
  // wiggle the canvas window
  const gameCanvas = document.querySelector(".game-canvas");
  const gameCanvasContainer = document.querySelector(".game-canvas-container");

  evalGameScript(text, gameCanvas);

  gameCanvasContainer.classList.add("shake");

  gameCanvas.focus();

  setTimeout(() => {
    gameCanvasContainer.classList.remove("shake");
  }, 200)
}

function dispatchKey(key) {
  const gameCanvas = document.querySelector(".game-canvas");
  gameCanvas.focus();
  gameCanvas.dispatchEvent(new KeyboardEvent('keydown', { key }));
}
