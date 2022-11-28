import { palette } from "../../palette.js";
import { baseEngine } from "../../engine/baseEngine.js";
import fetch from "node-fetch";

function evalGameScript(script) {
  const { api, state } = baseEngine();

  let legend = null;
  let map = null;
  let background = ".";

  const patchedApi = {
    ...api,
    setLegend: (...bitmaps) => { legend = bitmaps; },
    setBackground: (bg) => { background = bg },
    setMap: (string) => { map = string },
    onInput: () => {}, 
    afterInput: () => {}, 
    getState: () => state,
    playTune: () => {},
    setTimeout: () => {},
    setInterval: () => {},
  }

  try {
    const fn = new Function(...Object.keys(patchedApi), script);
    fn(...Object.values(patchedApi));
  } catch (err) {
    console.log(err);
  }

  return {
    legend: Object.fromEntries(legend),
    map,
    background
  }
}

async function drawGameImage(src) {
  const { legend, map, background } = evalGameScript(src);

  const mapWidth = map.trim().split("\n")[0].trim().length;
  const mapHeight = map.trim().split("\n").length;
  const image = {
    kind: "raw",
    data: new Uint8Array(mapWidth*mapHeight*16*16*4),
    width: mapWidth*16,
    height: mapHeight*16,
  };

  map.trim().split("\n").forEach( (row, y) => {
    row.trim().split("").forEach( (sprite, x) => {
      if (background !== ".") {
        blitSprite(image, makeSpriteBitmap(legend[background]), x, y);
      }
      if (sprite === ".") return;
      blitSprite(image, makeSpriteBitmap(legend[sprite]), x, y);
    })
  })

  // convert to base64
  image.data = image.data.reduce(
    (data, byte) => data + String.fromCharCode(byte)
  , '');
  image.data = btoa(image.data);

  return image;
}

export default async function handler(req, res) {
  const { name } = req.query;
  const srcUrl = `https://raw.githubusercontent.com/hackclub/sprig/main/games/${encodeURIComponent(name)}.js`;
  const data = {
    name,
    image: null,
    url: srcUrl
  };
  
  try {
    // Try fetching a custom image (PNG only)
    const imgUrl = `https://raw.githubusercontent.com/hackclub/sprig/main/games/img/${encodeURIComponent(name)}.png`;
    const image = await fetch(imgUrl)
    if (image.status === 200) {
      data.image = {
        kind: "png",
        data: Buffer.from(await image.arrayBuffer()).toString('base64')
      };
    } else {
      // Fetch the script and try to run the game
      const src = await fetch(srcUrl).then((res) => res.text());
      data.image = await drawGameImage(src);
    }
  } catch (error) {
    // If everything breaks, use a default image
    console.error(error);
    const image = await fetch("https://cloud-i203j2e6a-hack-club-bot.vercel.app/1confused_dinosaur.png");
    data.image = {
      kind: "png",
      data: Buffer.from(await image.arrayBuffer()).toString('base64')
    };
  }

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=604800');

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
