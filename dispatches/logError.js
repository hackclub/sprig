import { dispatch } from "../dispatch.js";

export function logError({ err }, state) {
  console.log(err);

  const location = err.stack.match(/<anonymous>:(.+)\)/);
  let line = null;
  let col = null;

  if (location) {
    let lineCol = location[1].split(":").map(Number);
    line = lineCol[0] - 2;
    col = lineCol[1];
  }

  const msg =
    line && col
      ? `${err.message} on line ${line} in column ${col}`
      : err.message;

  state.errorInfo = { line };
  state.logs = [...state.logs, msg];
  dispatch("RENDER");
  highlightError(state);
}

export function highlightError(state) {
  const line = state.errorInfo?.line;

  const cmLines = document.querySelectorAll(".cm-line");
  for (let i = 0; i < cmLines.length; i++) {
    if (!line || i + 1 !== line) continue;

    const cmLine = cmLines[i];
    cmLine.classList.add("err-line");
    cmLine.style.background = "#ecb2b2";
  }
}