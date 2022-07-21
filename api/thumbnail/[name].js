import { palette } from "../../palette.js";
import { baseEngine } from "../../engine/baseEngine.js";
import { readFileSync } from 'fs';
import path from 'path';
import fetch from "node-fetch";

function evalGameScript(script) {
  const { api, state } = baseEngine();

  let legend = null;
  let map = null;

  const patchedApi = {
    ...api,
    setLegend: (...bitmaps) => { legend = bitmaps; },
    setMap: (string) => { map = string },
    onInput: () => {}, 
    afterInput: () => {}, 
    setScreenSize: () => {},
    getState: () => state,
    playTune: () => {},
    setTimeout: () => {},
    setInterval: () => {},
  }

  try {
    const fn = new Function(...Object.keys(patchedApi), script);
    fn(...Object.values(patchedApi));
  } catch (err) { }

  return {
    legend: Object.fromEntries(legend),
    map
  }
}

async function drawGame(name) {

  const url = `https://raw.githubusercontent.com/hackclub/sprig/main/games/${name}.js`;
  const src = await fetch(url).then( res => res.text() );
  const { legend, map } = evalGameScript(src);

  const mapWidth = map.trim().split("\n")[0].trim().length;
  const mapHeight = map.trim().split("\n").length;
  const image = {
    data: new Uint8Array(mapWidth*mapHeight*16*16*4),
    width: mapWidth*16
  };

  map.trim().split("\n").forEach( (row, y) => {
    row.trim().split("").forEach( (sprite, x) => {
      if (sprite === ".") return;
      const bitmap = makeSpriteBitmap(legend[sprite]);
      blitSprite(image, bitmap, x, y);
    })
  })

  // convert to base64
  image.data = image.data.reduce(
    (data, byte) => data + String.fromCharCode(byte)
  , '');

  image.data = btoa(image.data);


  return { name, image, url };
}

export default async function handler(req, res) {
  const { name } = req.query;
  const data = await drawGame(name);
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  return res.status(200).send(data);
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

// const file = path.join(process.cwd(), '../../games', `${name}.js`);
// console.log(file);
// const src = readFileSync(file, 'utf8');


//  let legend = src.match(/setLegend\(([\s\S]*?)\)/)[1];

//  const reconstructedLegend = {};

//  let lastKey = "";
//  legend.split(",").forEach(x => {
//    if (x.includes("[")) {
//      // check if is variable or string
//      if (!x.match(/["']/)) {
//        const tempKey = x.replace("[", "").trim();
//        const re = new RegExp(`${tempKey}.*?=.*?["'](.*?)["']`);
//        lastKey = src.match(re)[1];
//      } else {
//        lastKey = x
//          .split("")
//          .filter(ch => !(/['"\s\[]/).test(ch))
//          .join("");
//      }

//    } else {
//      const value = x.match(/bitmap`([\s\S]*?)`/);

//      if (value) reconstructedLegend[lastKey] = value[1];
//    }
//  })