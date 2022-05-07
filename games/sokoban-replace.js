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
  start,
  setLayers,
  combine,
  setDontReplace,
  match
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

const testKey = { 
  "_": t => {
    return t.type === "g" || t.type === "." 
  },
  "_": ["g", "."]
}

onTileInput("up", _ => {
  match("_\np", testKey).forEach(arr => {
    arr[1].y -= 1;
  })

  match("_\n#\np", testKey).forEach(arr => {
    arr[1].y -= 1;
    arr[2].y -= 1;
  })
})

onTileInput("down", _ => {
  match("p\n_", testKey).forEach(arr => {
    arr[0].y += 1;
  })

  match("p\n#\n_", testKey).forEach(arr => {
    arr[0].y += 1;
    arr[1].y += 1;
  })
})

onTileInput("left", _ => {
  match("_p", testKey).forEach(arr => {
    arr[1].x -= 1;
  })

  match("_#p", testKey).forEach(arr => {
    arr[1].x -= 1;
    arr[2].x -= 1;
  })
})

onTileInput("right", _ => {
  match("p_", testKey).forEach(arr => {
    arr[0].x += 1;
  })

  match("p#_", testKey).forEach(arr => {
    arr[0].x += 1;
    arr[1].x += 1;
  })
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