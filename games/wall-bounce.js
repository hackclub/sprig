import { init } from "../engine/gamelab_functions_v0.js";

const canvas = document.querySelector(".wall-bounce");

const {
  setScreenSize,
  setLegend,
  addLayer,
  setTile,
  getTile,
  addSprite,
  clearTile,
  everyTile,
  tileContains,
  addRule,
  onTileCollision,
  onTileInput,
  makeSolid,
  makePushable,
  replace,
  afterInput,
  getTileGrid,
  getTileAll,
  clear,
  setZOrder,
  sprite,
  start
} = init(canvas);

setScreenSize(500, 500*.8)

setLegend({
  r: sprite(`
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
  `),
  p: sprite(`
................
................
................
......0.........
.....000000.....
....00....00....
....0......0....
...00.0..0..0...
...0........0...
...0........0...
...00.......0...
.....0000..00...
.....00.0000....
.....0....0.....
....00....00....
....0......0....
  `),
  d: sprite(`
................
................
................
................
................
.....bbbbbb.....
.....b.....b....
....bb....bb....
....b.....b.....
....bb...bb.....
.....bbbbb......
................
................
................
................
................
  `),
  u: sprite(`
................
................
................
................
................
.....bbbbbb.....
.....b.....b....
....bb....bb....
....b.....b.....
....bb...bb.....
.....bbbbb......
................
................
................
................
................
  `)
})

makeSolid(["p", "r"])

let level = 0;

const levels = {
  0: `
    rrrrrrrrrr
    r........r
    r........r
    r...d..d.r
    rp.......r
    r........r
    r........r
    rrrrrrrrrr
  `,
}


addLayer(levels[level]);

setInterval(() => {
  replacePattern(`d\n.`,`.\nd`);

  replacePattern(
  `.
   u`
  ,`u
    .`)

  replacePattern(
  `d
   r`
  ,`u
    r`)


  replacePattern(`r\nu`,`r\nd`);

  replacePattern(
  `p
   u`
  ,`.
    u`)

   replacePattern(
  `d
   p`
  ,`d
    .`)
}, 250)


let player = getTileAll("p")[0];

onTileInput("up", _ => {
  player.y -= 1;
})

onTileInput("down", _ => {
  player.y += 1;

})

onTileInput("left", _ => {
  player.x -= 1;
})

onTileInput("right", _ => {
  player.x += 1;
})

afterInput(_ => {
  if (player.x === 8) {
    replacePattern("p", "r");
  }
})

start()