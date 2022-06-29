import { dispatch } from "../dispatch.js";
import { evalGameScript } from "./evalGameScript.js";
import { saveGame } from "../saveGame.js"
import { sizeGameCanvas } from "./sizeGameCanvas.js"

export function run(args, state) {
  saveGame(state);

  state.logs = [];
  state.errorInfo = null;
  
  const cmLines = document.querySelectorAll(".cm-line");

  for (let i = 0; i < cmLines.length; i++) {
    const cmLine = cmLines[i];
    cmLine.style.background = "";
    cmLine.classList.remove("err-line");
  }

  const script = state.codemirror.state.doc.toString();
  const err = evalGameScript(script, state.palette);
  if (err) dispatch("LOG_ERROR", { err });

  sizeGameCanvas();

  dispatch("RENDER");

  document.querySelector(".game-canvas").focus();
}

