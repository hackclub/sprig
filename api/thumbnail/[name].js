import { palette } from "../../palette.js";
import { readFileSync } from 'fs';
import path from 'path';

function drawGame(name) {

  const url = `https://raw.githubusercontent.com/hackclub/sprig/main/games/${name}.js`;

  const file = path.join(process.cwd(), '../../games', `${name}.js`);
  const src = readFileSync(file, 'utf8');

  let legend = src.match(/setLegend\(([\s\S]*?)\)/)[1];

  const reconstructedLegend = {};

  let lastKey = "";
  legend.split(",").forEach(x => {
    if (x.includes("[")) {
      const tempKey = x.replace("[", "").trim();
      const re = new RegExp(`${tempKey}.*?=.*?["'](.*?)["']`);
      lastKey = src.match(re)[1];
    } else {
      const value = x.match(/bitmap`([\s\S]*?)`/);

      if (value) reconstructedLegend[lastKey] = value[1];
    }
  })

  // get first map
  const firstMap = src.match(/[^t]map`([\s\S]*?)`/)[1];

  const mapWidth = firstMap.trim().split("\n")[0].trim().length;
  const mapHeight = firstMap.trim().split("\n").length;
  const image = {
    data: new Uint8Array(mapWidth*mapHeight*16*16*4),
    width: mapWidth*16
  };

  firstMap.trim().split("\n").forEach( (row, y) => {
    row.trim().split("").forEach( (sprite, x) => {
      if (sprite === ".") return;
      const bitmap = makeSpriteBitmap(reconstructedLegend[sprite]);
      blitSprite(image, bitmap, x, y);
    })
  })


  return { name, image, url };
}

const test = drawGame("tolls");

export default async function handler(request, response) {
  const { name } = request.query;
  const data = drawGame(name);
  return response.status(200).json(data);
}

function makeSpriteBitmap(grid) {
  const result = [];
  const colors = Object.fromEntries(palette);
  grid.trim().split("\n").forEach( (row, y) => {
    row.trim().split("").forEach( (color, x) => {
      const arr = colors[color];
      result.push(...arr);
    })
  })

  return result;
}


function blitSprite(screen, bitmap, tx, ty) {
  for (let x = 0; x < 16; x++)
    for (let y = 0; y < 16; y++) {
      const sx = tx*16 + x;
      const sy = ty*16 + y;

      if (bitmap[(y*16 + x)*4 + 3] < 255) continue;

      screen.data[(sy*screen.width + sx)*4 + 0] = bitmap[(y*16 + x)*4 + 0];
      screen.data[(sy*screen.width + sx)*4 + 1] = bitmap[(y*16 + x)*4 + 1];
      screen.data[(sy*screen.width + sx)*4 + 2] = bitmap[(y*16 + x)*4 + 2];
      screen.data[(sy*screen.width + sx)*4 + 3] = bitmap[(y*16 + x)*4 + 3];
    }
}