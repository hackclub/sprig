import { init } from "../engine/gamelab_functions.js";

const canvas = document.querySelector(".sokoban-replace");

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
  `),
  ",": sprite(`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
  `)
})

let level = 0;

const levels = {
  0: `
    rrrrrrrrrr
    rp.......r
    r.#..#g..r
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

const bg = () => addLayer(`
,,,,,,,,,,
,,,,,,,,,,
,,,,,,,,,,
,,,,,,,,,,
,,,,,,,,,,
,,,,,,,,,,
,,,,,,,,,,
,,,,,,,,,,
`)

// bg();
addLayer(levels[level])


let player = () => getTileAll("p")[0];

onTileInput("up", _ => {
  replace("_\np", "p\n_"); // how to move on top of goal?
  // if (replace(".\np")) player().y -= 1;
  replace("_\n#\np", "#\np\n_");
})

onTileInput("down", _ => {
  replace("p\n_", "_\np");
  replace("p\n#\n_", "_\np\n#");
})

onTileInput("left", _ => {
  replace("_p", "p_");
  replace("_#p", "#p_");
  if(replace("g#p", "bp_")) return;
  replace("_bp", "#gp");
})

onTileInput("right", _ => {
  replace("p_", "_p");
  replace("p#_", "_p#");
  if(replace("p#g", "_pb")) return;
  replace("pb_", "pg#");
})

afterInput(_ => {
  const hasG = [];
  Object.values(getTileGrid()).forEach(cell => {
    if (cell.map(c => c.type).includes("g")) hasG.push(cell.map(c => c.type));
  })

  if (hasG.every(c => c.includes("#"))) {
    level++;
    clear();
    // bg();
    if (level in levels) addLayer(levels[level])
    else console.log("you win");
  }
})

start()