// import { init } from "../engine/gamelab_functions.js";
import { init } from "./webEngine.js";
import { playTune } from "./playTune.js";
import { textToTune } from './textTuneConverters.js';

let tunes = [];
let intervals = [];
let timeouts = [];

export function evalGameScript(script) {
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

  gameFunctions.playTune = (text, n) => {
    const tune = textToTune(text);
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
