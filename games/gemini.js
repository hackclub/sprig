import { init } from "../engine/gamelab_functions.js";

const canvas = document.querySelector(".gemini");

const {
  setScreenSize,
  setLegend, 
  setMap, 
  getCell,
  addSprite, 
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
  match,
  setBackground
} = init(canvas);


setScreenSize(500, 500)

setLegend({
  r: sprite(`
r
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
  2: sprite(`
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
  "w": sprite(`
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

setSolids(["p", "r"])

setZOrder(["p","r", "2"]);

// setBackground("g")

// setPushables({
//   "2": ["p"]
// })

let level = 0;
let maxMoves = 4;
let moveHistory = [];
let movesMade = 0;

const levels = [
  `
    rrrrrrrrrr
    rrrrrrrrrr
    rp2....g.r
    rrrrrrrrrr
  `,
  `
    rrrrrrrrrr
    r.p2.rrrrr
    rrrr....gr
    rrrrrrrrrr
  `,
]


setMap(levels[level])
swap("t", ["p", "2"]);

let player = () => getAllTiles("p")[0];

onInput("up", _ => {
  if (movesMade >= maxMoves) return;
  player().y -= 1;
  moveHistory.push("u");
  movesMade++;

})

onInput("down", _ => {
  if (movesMade >= maxMoves) return;
  player().y += 1;
  moveHistory.push("d");
  movesMade++;

})

onInput("left", _ => {
  if (movesMade >= maxMoves) return;
  player().x -= 1;
  moveHistory.push("l");
  movesMade++;

})

onInput("right", _ => {
  if (movesMade >= maxMoves) return;
  player().x += 1;
  moveHistory.push("r");
  movesMade++;

})

setPushables({
  "2": ["p"],
})

onInput("action0", _ => {
  setSolids(["p", "r", "2"])
  const p2 = () => getAllTiles("2")[0];
  for (let i = 0; i < moveHistory.length; i++) {

    let move = moveHistory[i];

    if (move === "u") p2().y -= 1;
    if (move === "d") p2().y += 1;
    if (move === "l") {
      p2().x -= 1;
      // replacePattern(".p2", "p2.");
      // replacePattern("gp2", "w..");
    }
    if (move === "r") {
      p2().x += 1;

      // replacePattern("2p.", ".2p");
      // replacePattern("2pg", "..w");
    }

    // p2().dx = 0;
    // getAllTiles("p")[0] = 0;

    // console.log(p2().dx, getAllTiles("p")[0].dx)

    replacePattern("2\n.", ".\n2");

    swap(["p", "g"], "w")
  }

  moveHistory = [];
})

afterInput(_ => {
  replacePattern("p\n.", ".\np");

  // let movesLeft = maxMoves - movesMade;
  // console.log(movesLeft);
  swap(["p", "g"], "w")

  if (getAllTiles("w").length && level < levels.length-1) {
    setSolids(["p", "r"])
    level++;
    moveHistory = [];
    movesMade = 0;
    clear();
    setMap(levels[level]);
  }

})

