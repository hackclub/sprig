// import { init } from "../engine/gamelab_functions.js";
import { init } from "../engine/platform.js";
import { playTune } from "../engine/playTune.js";

let tunes = [];
let intervals = [];
let timeouts = [];

export function evalGameScript(script, palette) {
  const canvas = document.querySelector(".game-canvas");
  const gameFunctions = init(canvas);

  tunes.forEach(t => t.end());
  tunes = [];

  timeouts.forEach(clearTimeout);
  timeouts = [];
  gameFunctions.setTimeout = (fn, n) => {
      const t = setTimeout(fn, n);
      timeouts.push(t);
      return t;
  }

  intervals.forEach(clearInterval);
  intervals = [];
  gameFunctions.setInterval = (fn, n) => {
      const i = setInterval(fn, n);
      intervals.push(i);
      return i;
  };

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
