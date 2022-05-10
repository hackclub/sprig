import { init } from "../engine/gamelab_functions.js";

const canvas = document.querySelector(".snake-replace");

const {
  setScreenSize,
  setLegend, 
  setMap, 
  getCell,
  addTile, 
  clearTile, 
  setSolids,
  setPushables, 
  replace, 
  onInput,
  afterInput, 
  getGrid,
  getAllTiles, 
  clear, 
  setZOrder, 
  sprite,
  swap,
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
  "0": sprite(`
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
  `)
})

setSolids(["p", "r", "0"])

setZOrder(["p","r", "0"]);

let level = 0;

const levels = {
  1: `
    ..........
    ..........
    ...p......
    ..........
    ..........
    ..........
    ..........
    ..........
  `,
  0: `
    p..0......
    ...0......
    ...000....
    ..........
    ..........
    ...000....
    ..0.......
    ..0.......
    `
}


setMap(levels[level])
let player = getAllTiles("p")[0];
addTile(player.x - player.dx, player.y - player.dy, "r")

onInput("up", _ => {
  if (player.y === 0) return;
  player.y -= 1;

})

onInput("down", _ => {
  if (player.y === 7) return;
  player.y += 1;
})

onInput("left", _ => {
  if (player.x === 0) return;
  player.x -= 1;
})

onInput("right", _ => {
  if (player.x === 9) return;
  player.x += 1;
})

// in what order should collision, push be applied

afterInput(_ => {
  if (player.dy !== 0 || player.dx !==0) {
    addTile(player.x, player.y, "r")
  }
  
  if (getAllTiles("r").length === 10*8 - getAllTiles("0").length) {
    level++;
    clear();
    if (level in levels) setMap(levels[level])
    else console.log("you win")
    player = getAllTiles("p")[0]
    addTile(player.x - player.dx, player.y - player.dy, "r")
  }
})

// win conditions
// all cells with x also have y
// no cells like such around

