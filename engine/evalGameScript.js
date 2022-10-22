// import { init } from "../engine/gamelab_functions.js";
import { init } from "./webEngine.js";
import { playTune } from "./playTune.js";
import { textToTune } from './textTuneConverters.js';
import { parseScript } from "esprima";

let tunes = [];
let intervals = [];
let timeouts = [];

export function evalGameScript(script, canvas) {
  script = `"use strict";\n${script}`;

  // remove event listeners
  const newCanvas = canvas.cloneNode(true);
  canvas.parentNode.replaceChild(newCanvas, canvas);
  canvas = newCanvas;

  const gameFunctions = init(canvas);

  // for debugging
  window.getState = gameFunctions.getState;

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
    return x;
  };

  try {
    parseScript(script);
  } catch (err) {
    return { type: "parse", err };
  }

  try {
    // script += `'use strict';\n\n${script}`
    const fn = new Function(...Object.keys(gameFunctions), script);
    fn(...Object.values(gameFunctions));
    return null;
  } catch (err) {
    return { type: "runtime", err };
  }
}

export function evalGameScriptHeadless(script) {
  const gameFunctions = init(document.createElement("canvas"), true);

  gameFunctions.setTimeout = () => {}
  gameFunctions.setInterval = () => {};
  gameFunctions.playTune = () => {};

  try {
    parseScript(script);
  } catch (err) {
    return { type: "parse", err };
  }

  try {
    const fn = new Function(...Object.keys(gameFunctions), script);
    fn(...Object.values(gameFunctions));
    return null;
  } catch (err) {
    return { type: "runtime", err };
  }
}