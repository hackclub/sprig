import { dispatch } from "../dispatch.js";

export function logError({ type, err }, state) {
  console.error(err);

  if (type === "page" || type === "runtime") {
    let line = null;
    let col = null;
    let location = err.stack.match(/<anonymous>:(.+)\)/);

    if (location) {
      let lineCol = location[1].split(":").map(Number);
      line = lineCol[0] - 2;
      col = lineCol[1];
    }

    const msg =
      line && col
        ? `${err.message} on line ${line} in column ${col}`
        : err.message;

    if (line && col) {
      state.errorInfo = { line };
      state.logs = [...state.logs, msg];
    }

  } else if (type === "parse") {
    const { description, lineNumber, column } = err;

    const msg = `${description} on line ${lineNumber} in column ${column}`;
    state.errorInfo = { line:lineNumber };
    state.logs = [...state.logs, msg];
  }


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