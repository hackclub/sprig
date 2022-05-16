import { init } from "../engine/gamelab_functions.js";


export function evalGameScript(script) {
  const canvas = document.querySelector(".game-canvas");
  const gameFunctions = init(canvas);

  try {
    const fn = new Function(...Object.keys(gameFunctions), script);
    fn(...Object.values(gameFunctions));

    return null;
  } catch (err) {
    return err;
  }
}
