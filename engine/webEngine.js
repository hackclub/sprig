import { sizeGameCanvas } from "../dispatches/sizeGameCanvas.js";
import { baseEngine } from "./baseEngine.js";
import { getTextImg } from "./getTextImg.js";
import { bitmapTextToImageData } from "./bitmap.js";

function makeCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  return canvas;
}

let cur = null;
let _bitmaps = {};
let _zOrder = [];
let offscreenCanvas = makeCanvas(1, 1);
let offscreenCtx = offscreenCanvas.getContext("2d");

export function init(canvas) {
  const { api, state } = baseEngine();

  canvas.setAttribute("tabindex", "1");

  const ctx = canvas.getContext("2d");
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  function gameloop() {
    const { width, height } = state.dimensions;
    if (width === 0 || height === 0) return;

   ctx.clearRect(0, 0, canvas.width, canvas.height);


    // draw text
    // but how big is it

    const image = new Uint8ClampedArray(width*height*16*16*4);
    offscreenCanvas.width = width*16;
    offscreenCanvas.height = height*16;

    offscreenCtx.fillStyle = "white";
    offscreenCtx.fillRect(0, 0, width*16, height*16);

    const grid = api.getGrid();

    for (let i = 0; i < width * height; i++) {
      const x = i % width;
      const y = Math.floor(i/width);
      const sprites = grid[i];

      if (state.background) {
        const imgData = _bitmaps[state.background];
        offscreenCtx.drawImage(imgData, x*16, y*16);
      }

      sprites
        .sort((a, b) => _zOrder.indexOf(b.type) - _zOrder.indexOf(a.type))
        .forEach((sprite) => {
          const imgData = _bitmaps[sprite.type];
          offscreenCtx.drawImage(imgData, x*16, y*16);
        });

    }


    const scale = Math.min(canvas.width/(width*16), canvas.height/(height*16));
    const actualWidth = offscreenCanvas.width*scale;
    const actualHeight = offscreenCanvas.height*scale;
    ctx.drawImage(
      offscreenCanvas, 
      (canvas.width-actualWidth)/2, 
      (canvas.height-actualHeight)/2, 
      actualWidth, 
      actualHeight
    );

    const textCanvas = getTextImg(state.texts);
    ctx.drawImage(
      textCanvas, 
      0,
      0, 
      canvas.width, 
      canvas.height
    );


    animationId = window.requestAnimationFrame(gameloop);
  }

  function setLegend(...bitmaps) {
    bitmaps.forEach(([ key, value ]) => {
      if (key.length !== 1) throw new Error(`Bitmaps must have one character names.`);
    })

    state.legend = bitmaps;
    _zOrder = bitmaps.map(x => x[0]);

    for (let i = 0; i < bitmaps.length; i++) {
      const [ key, value ] = bitmaps[i];
      const imgData = bitmapTextToImageData(value);
      const littleCanvas = makeCanvas(16, 16);
      littleCanvas.getContext("2d").putImageData(imgData, 0, 0);

      _bitmaps[key] = littleCanvas;
    }
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
    ...api,
  }
}
