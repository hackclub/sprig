import { dispatch } from "../dispatch.js";
import { textToTune } from '../textTuneConverters.js';
import { global_state } from "../global_state.js";
import { sizeGameCanvas } from "../dispatches/sizeGameCanvas.js";
import * as render from "./render.js";
import * as gridEngine from "./engine.js";


let cur = null;

export function init(canvas) {
  const engine = gridEngine.init({
    palette: global_state.palette,
    setBitmaps: bitmaps => {
      console.log(bitmaps);
      render.setBitmaps(bitmaps);
      dispatch("SET_BITMAPS", { bitmaps });
    },
    setScreenSize,
  });

  // remove event listeners
  let newCanvas = canvas.cloneNode(true);
  canvas.parentNode.replaceChild(newCanvas, canvas);
  canvas = newCanvas;

  render.init(canvas);

  canvas.setAttribute("tabindex", "1");

  function gameloop() {
    render.render(drawTiles());

    animationId = window.requestAnimationFrame(gameloop);
  }

  function end() {
    window.cancelAnimationFrame(animationId);
  }

  if (cur) cur();
  cur = end;


  let animationId = window.requestAnimationFrame(gameloop);

  function setScreenSize(w, h) {
    canvas.width = w;
    canvas.height = h;

    const { width, height } = engine.state.dimensions;
    window.idealDimensions = [width, height];
    sizeGameCanvas();

    render.resize(canvas);
  }

  let background = "";
  const tempCanvas = document.createElement("canvas");
  // tempCanvas.width = 16;
  // tempCanvas.height = 16;

  let tileInputs = {
    up: [],
    down: [],
    left: [],
    right: [],
    i: [],
    j: [],
    k: [],
    l: [],
  };
  let afterInputs = [];

  canvas.addEventListener("keydown", (e) => {
    const key = e.key;

    const VALID_INPUTS = ["w", "a", "s", "d", "i", "j", "k", "l"];

    if (!VALID_INPUTS.includes(key)) return;

    if (key === "w") tileInputs["up"].forEach(fn => fn());
    if (key === "a") tileInputs["left"].forEach(fn => fn());
    if (key === "s") tileInputs["down"].forEach(fn => fn());
    if (key === "d") tileInputs["right"].forEach(fn => fn());
    if (key === "i") tileInputs["i"].forEach(fn => fn());
    if (key === "j") tileInputs["j"].forEach(fn => fn());
    if (key === "k") tileInputs["k"].forEach(fn => fn());
    if (key === "l") tileInputs["l"].forEach(fn => fn());

    afterInputs.forEach(f => f());

    engine.state.sprites.forEach(s => {
      s.dx = 0;
      s.dy = 0;
    })

    e.preventDefault();
  });

  function onInput(type, fn) {
    if (!(type in tileInputs)) console.error("Unknown input type:", type)
    tileInputs[type].push(fn);
  }

  function drawTiles() {
    const { dimensions, legend } = engine.state;
    const { width, height, maxTileDim } = dimensions;

    const grid = engine.api.getGrid();
    if (width == 0 || height == 0) return new ImageData(1, 1);
    const img = new ImageData(width, height);

    for (let i = 0; i < grid.length; i++) {
      const x = i%width; 
      const y = Math.floor(i/width); 

      const sprites = grid[i];
      const zOrder = legend.map(x => x[0]);
      sprites.sort((a, b) => zOrder.indexOf(a.type) - zOrder.indexOf(b.type));

      for (let i = 0; i < 4; i++) {
        if (!sprites[i]) continue;
        const { type: t } = sprites[i];
        img.data[(y*dimensions.width + x)*4 + i] = 1+legend.findIndex(f => f[0] == t);
      }
    }

    return img;
  }

  function afterInput(fn) {
    afterInputs.push(fn);
  }

  // how to add timed things, like bird flying and ball kicks
  
  return {
    onInput, 
    afterInput, 
    tune: gridEngine._makeTag(text => textToTune(text)),
    setScreenSize,
    ...engine.api,
  }
}
