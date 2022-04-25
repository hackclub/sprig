import { Engine } from "./Engine.js";
import { init } from "./engine/gamelab_functions.js";

const BLACK_LISTED_WORDS = [
  // "localStorage",
  // "document",
  // "window",
  // "eval",
  // "import",
  // "Function"
];

export function createEval() {
  let current = null;

  return evalGameScript;

  function evalGameScript({ assets, prog, show, gameCanvas }) {
    if (current) current();

    for (let i = 0; i < BLACK_LISTED_WORDS.length; i++) {
      const word = BLACK_LISTED_WORDS[i];
      if (prog.includes(word)) {
        return new Error(`Error: "${word}" is not allowed in game script.`);
      }
    }

    // Engine.show = show;

    gameCanvas.width = 300;
    gameCanvas.height = 300;

    const included = init(gameCanvas);

    current = included.end;

    assets.forEach((asset) => {
      included[asset.name] = asset.data;
    });

    try {
      new Function(...Object.keys(included), prog)(...Object.values(included));

      return null;
    } catch (err) {
      return err;
    }
  }
}
