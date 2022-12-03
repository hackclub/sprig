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

// const canvas = new OffscreenCanvas(160, 128);

export function getTextImg(texts) {
  const charGrid = composeText(texts);
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

  const canvas = new OffscreenCanvas(160, 128);
  canvas.getContext("2d").putImageData(img, 0, 0);

  return canvas;
}