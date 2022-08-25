import { dispatch } from "../dispatch.js";
import { evalGameScript } from "../engine/evalGameScript.js";
import { sizeGameCanvas } from "./sizeGameCanvas.js"

export function run(args, state) {

  state.logs = [];
  state.errorInfo = null;
  state.staleRun = false;
  
  const cmLines = document.querySelectorAll(".err-line");

  for (let i = 0; i < cmLines.length; i++) {
    const cmLine = cmLines[i];
    cmLine.classList.remove("err-line");
  }

  const script = state.codemirror.state.doc.toString();
  const canvas = document.querySelector(".game-canvas");
  const err = evalGameScript(script, canvas);
  if (err) dispatch("LOG_ERROR", err);

  sizeGameCanvas();

  dispatch("RENDER");

  // wiggle the canvas window
  const gameCanvas = document.querySelector(".game-canvas");
  const gameCanvasContainer = document.querySelector(".game-canvas-container");

  gameCanvasContainer.classList.add("shake");

  gameCanvas.focus();

  setTimeout(() => {
    gameCanvasContainer.classList.remove("shake");
  }, 200)
}

