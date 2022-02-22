function processError(err) {
  const logs = [];

  let split = err.stack.split("\n").slice(0, 2);
  function filterInts(str) {
    return str
      .split("")
      .filter((char) => char == +char)
      .join("");
  }
  function checkLine(line) {
    let colonSplit = line.split(":");
    if (!(colonSplit.length >= 3)) return false;
    if (isNaN(+filterInts(colonSplit[colonSplit.length - 1]))) return false;
    if (isNaN(+filterInts(colonSplit[colonSplit.length - 2]))) return false;
    return true;
  }
  let lineNumber = err.stack.includes(err.message) ? 1 : 0;

  if (checkLine(split[lineNumber])) {
    let trace =
      split[lineNumber].split(":")[split[lineNumber].split(":").length - 2] +
      ":" +
      split[lineNumber].split(":")[split[lineNumber].split(":").length - 1];
    let [line, col] = trace.split(":");
    const str = `${
      err.stack.includes(err.message)
        ? split[0]
        : (err.name ? err.name : "RuntimeError") + ": " + err.message
    }\n    at code.js:${+filterInts(line) - 2}:${+filterInts(col)}`;
    logs.push(str);
  } else {
    logs.push(
      (err.stack.includes(err.message)
        ? (err.name ? err.name : "RuntimeError") + "\n    at code.js"
        : (err.name ? err.name : "RuntimeError") +
          ": " +
          err.message +
          "\n    at code.js") +
        "\n\nGame Lab was unable to determine where your error is located. Please submit a bug report if you think this issue was caused by Game Lab."
    ); // Safari sadly doesn't show you a stack trace inside evals
  } // Best(?) combination of checking if certain error properties exist

  return logs;
}
