import { dispatch } from "../dispatch.js";

export function logError({ type, err }, state) {
  console.error(err);

  if (type === "page" || type === "runtime") {
    let line = null;
    let col = null;
    let location = err.stack.match(/<anonymous>:(.+)\)/);

    if (location) {
      let lineCol = location[1].split(":").map(Number);
      line = lineCol[0] - 2 - 1;
      col = lineCol[1];
    }

    const msg =
      line && col
        ? `${err.message} on line ${line} in column ${col}.\nOpen the browser console for more information.`
        : err.message;

    if (line && col) {
      state.errorInfo = { line };
      state.logs = [...state.logs, msg];
    }

  } else if (type === "parse") {
    const { description, lineNumber, column } = err;
    const line = lineNumber - 1;

    const msg = `${description} on line ${line} in column ${column}.\nOpen the browser console for more information.`;
    state.errorInfo = { line };
    state.logs = [...state.logs, msg];
  }


  dispatch("RENDER");
  highlightError(state);
}

export function highlightError(state) {
  const line = state.errorInfo?.line;
  const cmLines = document.querySelectorAll(".cm-lineNumbers > .cm-gutterElement");
  for (let i = 0; i < cmLines.length; i++) {
    const cmLine = cmLines[i];
    const innerNumber = cmLine.innerText;
    const height = cmLine.style.height;
    if (Number(cmLine.innerText) !== line || height === "0px") continue;
    cmLine.classList.add("err-line");
  }
}