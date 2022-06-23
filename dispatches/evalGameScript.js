// import { init } from "../engine/gamelab_functions.js";
import { init } from "../engine/engine.js";
import { playTune } from "../engine/playTune.js";

let tunes = [];

export function evalGameScript(script, palette) {
  const canvas = document.querySelector(".game-canvas");
  const gameFunctions = init(canvas);
  
  tunes.forEach(t => t.end());
  tunes = [];

  gameFunctions.playTune = (tune, n) => {
    const x = playTune(tune, n);
    tunes.push(x);
  };

  try {
    const fn = new Function(...Object.keys(gameFunctions), script);
    fn(...Object.values(gameFunctions));

    return null;
  } catch (err) {
    return err;
  }
}
