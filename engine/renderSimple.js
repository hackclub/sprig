import { bitmapTextToImageData } from "./bitmap.js";
import { global_state } from "../global_state.js";
import { baseEngine } from "./baseEngine.js";

const _bitmaps = {};

export function setBitmaps(bitmaps) {
  for (let i = 0; i < bitmaps.length; i++) {
    const [ key, value ] = bitmaps[i];
    const { data } = bitmapTextToImageData(value);

    _bitmaps[i] = data;

    // set background
    console.log(data);
  }
}
 
export function setBackground() {}
export function init() {}
export function resize() {}
export function render() {
  const { state, api } = baseEngine();
  const width = state.dimensions.width;
  const height = state.dimensions.height;
  const image = new Uint8ClampedArray(width*height*16*16*4);

  // console.log(image);
  const grid = api.getGrid();

  // console.log(grid);
}

