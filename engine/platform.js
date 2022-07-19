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
    drawText: img => {
      const text = document.querySelector(".game-text");
      text.width = img.width;
      text.height = img.height;
      text
        .getContext("2d")
        .putImageData(img, 0, 0);
    },
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

    console.log(key);
    const INPUT_MAP = {
      "up":    ["w", "ArrowUp"   ],
      "down":  ["s", "ArrowDown" ],
      "left":  ["a", "ArrowLeft" ],
      "right": ["d", "ArrowRight"],
      "i":     ["i"],
      "j":     ["j"],
      "k":     ["k"],
      "l":     ["l"]
    };

    const VALID_INPUTS = Object.values(INPUT_MAP).flat();
    if (!VALID_INPUTS.includes(key)) return;

    for (const [gameKey, platformKeys] of Object.entries(INPUT_MAP))
      if (platformKeys.includes(key))
        tileInputs[gameKey].forEach(fn => fn());

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
