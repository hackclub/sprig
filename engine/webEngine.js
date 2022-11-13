import { dispatch } from "../dispatch.js";
import { sizeGameCanvas } from "../dispatches/sizeGameCanvas.js";
import * as render from "./render.js";
import { baseEngine } from "./baseEngine.js";
import { font } from "./font.js";

function composeText(texts) {
  const emptyCell = () => ({ char: ' ', color: [0, 0, 0] });
  const range = (length, fn) => Array.from({ length }, fn);
  const gridFromSize = (w, h) => range(h, _ => range(w, emptyCell));
  const CHARS_MAX_X = 20;
  const CHARS_MAX_Y = 16;

  const grid = gridFromSize(CHARS_MAX_X, CHARS_MAX_Y);

  for (const { x: sx, y: sy, content, color } of texts) {
    let y = sy;
    for (const line of content.split('\n')) {
      let x = sx;
      for (const char of line.split(''))
        if (x <= CHARS_MAX_X && y < CHARS_MAX_Y)
          grid[y][x++] = { color, char };
      y++;
    }
  }

  return grid;
}

function drawText(charGrid) {
  const img = new ImageData(160, 128);
  img.data.fill(0);

  for (const [i, row] of Object.entries(charGrid)) {
    let xt = 0;
    for (const { char, color } of row) {
      const cc = char.charCodeAt(0);

      let y = i*8;
      for (const bits of font.slice(cc*8, (1+cc)*8)) {
          for (let x = 0; x < 8; x++) {
            const val = (bits>>(7-x)) & 1;

            img.data[(y*img.width + xt + x)*4 + 0] = val*color[0];
            img.data[(y*img.width + xt + x)*4 + 1] = val*color[1];
            img.data[(y*img.width + xt + x)*4 + 2] = val*color[2];
            img.data[(y*img.width + xt + x)*4 + 3] = val*255;
          }
          y++;
      }
      xt += 8;
    }
  }

  const text = document.querySelector(".game-text");
  text.width = img.width;
  text.height = img.height;
  text
    .getContext("2d")
    .putImageData(img, 0, 0);
}

let cur = null;

export function init(canvas, headless = false, runDispatch = true) {
  const { api, state } = baseEngine();
  render.init(canvas);

  canvas.setAttribute("tabindex", "1");

  function gameloop() {
    const dims = state.dimensions;
    setScreenSize(dims.width*16, dims.height*16);

    // draw text
    drawText(composeText(state.texts));

    render.render(drawTiles());


    animationId = window.requestAnimationFrame(gameloop);
  }

  function setLegend(...bitmaps) {
    bitmaps.forEach(([ key, value ]) => {
      if (key.length !== 1) throw new Error(`Bitmaps must have one character names.`);
    })
    state.legend = bitmaps;

    render.setBitmaps(bitmaps);
    if (runDispatch) dispatch("SET_BITMAPS", { bitmaps });
  }

  function end() {
    window.cancelAnimationFrame(animationId);
  }

  if (cur) cur();
  cur = end;


  let animationId = window.requestAnimationFrame(gameloop);

  function setScreenSize(w, h) {
    if (headless) return;
    canvas.width = w;
    canvas.height = h;

    const { width, height } = state.dimensions;
    window.idealDimensions = [width, height];
    sizeGameCanvas();

    render.resize(canvas);
  }

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

  const KEY_MAPPINGS = {
    "w": "w",
    "a": "a",
    "s": "s",
    "d": "d",
    "i": "i",
    "j": "j",
    "k": "k",
    "l": "l",
    "ArrowUp": "w",
    "ArrowDown": "s",
    "ArrowLeft": "a",
    "ArrowRight": "d",
    "1": "j",
    "2": "k",
    "3": "i",
    "4": "l",
  };
  canvas.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!(key in KEY_MAPPINGS)) return;

    tileInputs[KEY_MAPPINGS[key]].forEach(fn => fn());

    afterInputs.forEach(f => f());

    state.sprites.forEach(s => {
      s.dx = 0;
      s.dy = 0;
    })

    e.preventDefault();
  });

  function onInput(type, fn) {
    if (!(type in tileInputs)) throw new Error(
      `Unknown input key, "${type}": expected one of ${[...new Set(Object.values(KEY_MAPPINGS))].join(', ')}`
    )
    tileInputs[type].push(fn);
  }

  function drawTiles() {
    const { dimensions, legend } = state;
    const { width, height, maxTileDim } = dimensions;

    const grid = api.getGrid();
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
    setLegend,
    onInput, 
    afterInput, 
    setScreenSize,
    getState: () => state,
    setBackground: (type) => render.setBackground(type),
    ...api,
  }
}
