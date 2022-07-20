import { palette } from "../../palette.js";
import { readFileSync } from 'fs';
import path from 'path';

function drawGame(name) {

  const url = `https://raw.githubusercontent.com/hackclub/sprig/main/games/${name}.js`;

  const file = path.join(process.cwd(), '../../games', `${name}.js`);
  const src = readFileSync(file, 'utf8');

  // have src

  // get legend
  let legend = src.match(/setLegend\(([\s\S]*?)\)/)[1];

  // const getVariable = name => legend.match(/name(.*?)['"](.*?)['"]/)[2];

  const reconstructedLegend = {};

  // for (let i = 0; i < legend.length; i++) {
    
  // }

  let lastKey = "";
  legend.split(",").forEach(x => {
    console.log(x);
    if (x.includes("[")) {
      lastKey = x.replace("[", "").trim();
    } else {
      const value = x.match(/bitmap`([\s\S]*?)`/);
      console.log(value);
      if (value) reconstructedLegend[lastKey] = value;
    }
  })

  console.log(reconstructedLegend);

  // replace every [ thing ,
  // with const | let thing = "newThing" | 'newThing'

  // console.log(legend);
  // get first map
  const firstMap = src.match(/[^t]map`([\s\S]*?)`/)[1];
  // draw first map
  // console.log(firstMap);

  const image = {
    data: new Uint8Array(120*168),
    width: 128
  };

  return { name, image, url };
}

const test = drawGame("tolls");
console.log(test);

export default async function handler(request, response) {
  const { name } = request.query;
  const data = drawGame(name);
  return response.status(200).json(data);
}


function blitSprite(screen, sprite, tx, ty) {
  const [_, { imageData: { data: bitmap } }] = sprite;
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

function drawTiles(state, api, screen, bitmaps) {
  const { dimensions, legend } = state;
  const { width, height, maxTileDim } = dimensions;

  const grid = api.getGrid();

  for (const cell of grid) {
    const zOrder = legend.map(x => x[0]);
    cell.sort((a, b) => zOrder.indexOf(a.type) - zOrder.indexOf(b.type));

    for (const { x, y, type } of cell) {
      blitSprite(screen, bitmaps.find(x => x[0] == type), x, y);
    }
  }
}