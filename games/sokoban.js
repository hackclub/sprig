import { init } from "../engine/gamelab_functions_v0.js";

const canvas = document.querySelector(".sokoban");

const {
  setScreenSize,
  setLegend,
  addLayer,
  setTile,
  getTile,
  addTile,
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
  g: sprite(`
................
............r...
....rr......r...
.....rr....r....
......rggggrg...
.....grr..r.gg..
....gg.rr.r..g..
....g...r.r..g..
....g....rr..g..
....g....rr..g..
....g........g..
....gg.......g..
.....gg.....gg..
.......gggggg...
................
................
  `),
  b: sprite(`
................
................
................
....0000000.....
....0.....0000..
....0...0....0..
....0...0....0..
....0...0...00..
....0000000.0...
....0...0...0...
....0...0...0...
....0...0...0...
....000000000...
................
................
................
  `),
  p: sprite(`
................
................
................
................
.....000000.....
....00....00....
....0..0.0.0....
....00.....0....
.....0....0.....
.....000000.....
......0..00.....
.....00...0.....
.....0..........
................
................
................
  `),
  "#": sprite(`
................
................
................
....0000000.....
....0.....0000..
....0...0....0..
....0...0....0..
....0...0...00..
....0000000.0...
....0...0...0...
....0...0...0...
....0...0...0...
....000000000...
................
................
................
  `)
})

makeSolid(["p", "#", "r"])

makePushable({
  "p": ["#"],
})

let level = 0;

const levels = {
  0: `
    rrrrrrrrrr
    rp.......r
    r....#g..r
    r........r
    r...r....r
    r...r....r
    r...r....r
    rrrrrrrrrr
  `,
  1: `
    rrrrrrrrrr
    rp.....rgr
    r...#..r.r
    r........r
    r.#.r..g.r
    r...r....r
    r...r....r
    rrrrrrrrrr
    `
}


addLayer(levels[level])


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
  const hasG = [];
  Object.values(getTileGrid()).forEach(cell => {
    if (cell.map(c => c.type).includes("g")) hasG.push(cell.map(c => c.type));
  })

  if (hasG.every(c => c.includes("#"))) {
    level++;
    clear();
    if (level in levels) addLayer(levels[level])
    else console.log("you win");
    player = getTileAll("p")[0];
  }
})

start()