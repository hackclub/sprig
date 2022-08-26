import { dispatch } from "../dispatch.js";
import { evalGameScript, evalGameScriptHeadless } from "../engine/evalGameScript.js";
import { sizeGameCanvas } from "./sizeGameCanvas.js"

export function run(args, state) {
  if (args.headless) {
    const script = state.codemirror.state.doc.toString();
    evalGameScriptHeadless(script);
  } else {
    state.logs = [];
    state.errorInfo = null;
    state.staleRun = false;
    
    const cmLines = document.querySelectorAll(".err-line");

    for (let i = 0; i < cmLines.length; i++) {
      const cmLine = cmLines[i];
      cmLine.classList.remove("err-line");
    }

    const gameCanvas = document.querySelector(".game-canvas");
    const gameCanvasContainer = document.querySelector(".game-canvas-container");

    const script = state.codemirror.state.doc.toString();
    const err = evalGameScript(script, gameCanvas);
    if (err) dispatch("LOG_ERROR", err);

    sizeGameCanvas();

    dispatch("RENDER");

    // wiggle the canvas window
    gameCanvasContainer.classList.add("shake");

    gameCanvas.focus();

    setTimeout(() => {
      gameCanvasContainer.classList.remove("shake");
    }, 200)
  }
}

