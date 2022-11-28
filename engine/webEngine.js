import { dispatch } from "../dispatch.js";
import { sizeGameCanvas } from "../dispatches/sizeGameCanvas.js";
import * as render from "./renderSimple.js";
import { baseEngine } from "./baseEngine.js";
import { getTextImg } from "./getTextImg.js";

let cur = null;
let _bitmaps = {};

export function init(canvas, headless = false, runDispatch = true) {
  const { api, state } = baseEngine();

  canvas.setAttribute("tabindex", "1");

  function gameloop() {
    const { width, height } = state.dimensions;

    // draw text
    const textImg = getTextImg(state.texts);

    const image = new Uint8ClampedArray(width*height*16*16*4);


    animationId = window.requestAnimationFrame(gameloop);
  }

  function setLegend(...bitmaps) {
    bitmaps.forEach(([ key, value ]) => {
      if (key.length !== 1) throw new Error(`Bitmaps must have one character names.`);
    })
    state.legend = bitmaps;

    for (let i = 0; i < bitmaps.length; i++) {
      const [ key, value ] = bitmaps[i];
      _bitmaps[i] = bitmapTextToImageData(value);;
    }

    if (runDispatch) dispatch("SET_BITMAPS", { bitmaps });
  }

  function end() {
    window.cancelAnimationFrame(animationId);
  }

  if (cur) cur();
  cur = end;


  let animationId = window.requestAnimationFrame(gameloop);

  let tileInputs = {
    w: [],
    s: [],
    a: [],
    d: [],
    i: [],
    j: [],
    k: [],
    l: [],
  };
  let afterInputs = [];

  const VALID_INPUTS = ["w", "a", "s", "d", "i", "j", "k", "l"];
  canvas.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!VALID_INPUTS.includes(key)) return;

    for (const valid_key of VALID_INPUTS)
      if (key == valid_key)
        tileInputs[key].forEach(fn => fn());

    afterInputs.forEach(f => f());

    state.sprites.forEach(s => {
      s.dx = 0;
      s.dy = 0;
    })

    e.preventDefault();
  });

  function onInput(type, fn) {
    if (!(type in tileInputs)) throw new Error(
      `Unknown input key, "${type}": expected one of ${VALID_INPUTS.join(', ')}`
    )
    tileInputs[type].push(fn);
  }

  function getDimsGrid() {
    const { width, height } = state.dimensions;
    const grid = api.getGrid();

    return { width, height, grid };
  }

  function afterInput(fn) {
    afterInputs.push(fn);
  }

  // how to add timed things, like bird flying and ball kicks
  
  return {
    setLegend,
    onInput, 
    afterInput, 
    getState: () => state,
    setBackground: (type) => render.setBackground(type),
    ...api,
  }
}
