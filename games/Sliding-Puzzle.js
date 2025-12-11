/*
@title: Sliding Puzzle
@author: Claude
@tags: [puzzle]
@addedOn: 2024-12-11
*/

const player = "p";
const tile1 = "1";
const tile2 = "2";
const tile3 = "3";
const tile4 = "4";
const tile5 = "5";
const tile6 = "6";
const tile7 = "7";
const tile8 = "8";
const empty = "e";
const bg = "b";

setLegend(
  [player, bitmap`
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
................`], // invisible
  [tile1, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0......LL......0
0.....LLL......0
0.....L.L......0
0....LL.L......0
0.......L......0
0.......L......0
0.......L......0
0.......L......0
0.......L......0
0..............0
0..............0
0000000000000000`],
  [tile2, bitmap`
0000000000000000
0..............0
0..............0
0....LLL.......0
0...LL.LLL.....0
0...L....L.....0
0...L....LL....0
0...L....LL....0
0........L.....0
0......LLL.....0
0.....LL.......0
0...LLLLLLLL...0
0..............0
0..............0
0..............0
0000000000000000`],
  [tile3, bitmap`
0000000000000000
0..............0
0..............0
0....LLLL......0
0.......LL.....0
0........LL....0
0........LL....0
0......LLL.....0
0.......LLL....0
0.........L....0
0.........L....0
0...LL...LL....0
0....LLLLL.....0
0..............0
0..............0
0000000000000000`],
  [tile4, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0...L..........0
0...L..........0
0...L..........0
0...L...L......0
0...L..L.......0
0...LLLLLL.....0
0.....L........0
0.....L........0
0....L.........0
0..............0
0..............0
0000000000000000`],
  [tile5, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0..............0
0.....LLLL.....0
0.....L........0
0.....L........0
0.....LL.......0
0...L..LL......0
0...LL..L......0
0....LLL.......0
0..............0
0..............0
0..............0
0000000000000000`],
  [tile6, bitmap`
0000000000000000
0..............0
0.......L......0
0.....LLL......0
0....LL........0
0...L..........0
0...L..........0
0..LL..........0
0..LL.LLL......0
0...LLL.LL.....0
0...LL...L.....0
0.....LLLL.....0
0..............0
0..............0
0..............0
0000000000000000`],
  [tile7, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0.....LLLLLL...0
0........LL....0
0.......LL.....0
0....L.LL......0
0.....LL.......0
0.....L........0
0....LL........0
0....L.........0
0..............0
0..............0
0..............0
0000000000000000`],
  [tile8, bitmap`
0000000000000000
0..............0
0..............0
0.....LLL......0
0....LL.LL.....0
0....L...LL....0
0.....L...L....0
0.....LL.LL....0
0...LLLLLL.....0
0...L..L.......0
0...L..L.......0
0...LLLL.......0
0..............0
0..............0
0..............0
0000000000000000`],
  [empty, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0000000000000000`],
  [bg, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`]
);

setSolids([tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8]);

let level = 0;
const levels = [
  map`
bbb
bbb
bbb`,
];

setMap(levels[level]);
setBackground(bg);

let gameStarted = false;

// Show main menu
function showMenu() {
  clearText();
  addText("Sliding Puzzle", { y: 2, color: color`3` });
  addText("", { y: 4, color: color`2` });
  addText("Arrange tiles", { y: 5, color: color`2` });
  addText("in order 1-8", { y: 6, color: color`2` });
  addText("", { y: 8, color: color`2` });
  addText("Use WASD keys", { y: 9, color: color`2` });
  addText("to slide tiles", { y: 10, color: color`2` });
  addText("into the empty", { y: 11, color: color`2` });
  addText("space", { y: 12, color: color`2` });
  addText("", { y: 13, color: color`2` });
  addText("Press W to", { y: 14, color: color`4` });
  addText("START!", { y: 15, color: color`4` });
}

// Initialize puzzle in solved state, then shuffle
function initPuzzle() {
  clearTile(0, 0); addSprite(0, 0, tile1);
  clearTile(1, 0); addSprite(1, 0, tile2);
  clearTile(2, 0); addSprite(2, 0, tile3);
  clearTile(0, 1); addSprite(0, 1, tile4);
  clearTile(1, 1); addSprite(1, 1, tile5);
  clearTile(2, 1); addSprite(2, 1, tile6);
  clearTile(0, 2); addSprite(0, 2, tile7);
  clearTile(1, 2); addSprite(1, 2, tile8);
  clearTile(2, 2); addSprite(2, 2, empty);
  
  // Shuffle with random moves
  for (let i = 0; i < 50; i++) {
    const emptyTile = getFirst(empty);
    const moves = [];
    
    if (emptyTile.x > 0) moves.push([-1, 0]);
    if (emptyTile.x < 2) moves.push([1, 0]);
    if (emptyTile.y > 0) moves.push([0, -1]);
    if (emptyTile.y < 2) moves.push([0, 1]);
    
    const move = moves[Math.floor(Math.random() * moves.length)];
    swapTiles(emptyTile.x + move[0], emptyTile.y + move[1]);
  }
}

function swapTiles(x, y) {
  const emptyTile = getFirst(empty);
  const tiles = getTile(x, y);
  
  if (tiles.length > 0) {
    const tile = tiles[0];
    clearTile(emptyTile.x, emptyTile.y);
    clearTile(x, y);
    addSprite(emptyTile.x, emptyTile.y, tile.type);
    addSprite(x, y, empty);
  }
}

function checkWin() {
  const positions = [
    {x: 0, y: 0, t: tile1}, {x: 1, y: 0, t: tile2}, {x: 2, y: 0, t: tile3},
    {x: 0, y: 1, t: tile4}, {x: 1, y: 1, t: tile5}, {x: 2, y: 1, t: tile6},
    {x: 0, y: 2, t: tile7}, {x: 1, y: 2, t: tile8}, {x: 2, y: 2, t: empty}
  ];
  
  for (const pos of positions) {
    const tiles = getTile(pos.x, pos.y);
    if (tiles.length === 0 || tiles[0].type !== pos.t) {
      return false;
    }
  }
  return true;
}

function clearPuzzle() {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      clearTile(x, y);
    }
  }
}

function startGame() {
  gameStarted = true;
  clearText();
  initPuzzle();
}

showMenu();

onInput("w", () => {
  if (!gameStarted) {
    startGame();
    return;
  }
  
  const emptyTile = getFirst(empty);
  if (emptyTile.y < 2) {
    swapTiles(emptyTile.x, emptyTile.y + 1);
    if (checkWin()) {
      clearPuzzle();
      addText("You Win!", { y: 4, color: color`4` });
      addText("Press J to", { y: 6, color: color`2` });
      addText("play again!", { y: 7, color: color`2` });
    }
  }
});

onInput("s", () => {
  if (!gameStarted) return;
  
  const emptyTile = getFirst(empty);
  if (emptyTile.y > 0) {
    swapTiles(emptyTile.x, emptyTile.y - 1);
    if (checkWin()) {
      clearPuzzle();
      addText("You Win!", { y: 4, color: color`4` });
      addText("Press J to", { y: 6, color: color`2` });
      addText("play again!", { y: 7, color: color`2` });
    }
  }
});

onInput("a", () => {
  if (!gameStarted) return;
  
  const emptyTile = getFirst(empty);
  if (emptyTile.x < 2) {
    swapTiles(emptyTile.x + 1, emptyTile.y);
    if (checkWin()) {
      clearPuzzle();
      addText("You Win!", { y: 4, color: color`4` });
      addText("Press J to", { y: 6, color: color`2` });
      addText("play again!", { y: 7, color: color`2` });
    }
  }
});

onInput("d", () => {
  if (!gameStarted) return;
  
  const emptyTile = getFirst(empty);
  if (emptyTile.x > 0) {
    swapTiles(emptyTile.x - 1, emptyTile.y);
    if (checkWin()) {
      clearPuzzle();
      addText("You Win!", { y: 4, color: color`4` });
      addText("Press J to", { y: 6, color: color`2` });
      addText("play again!", { y: 7, color: color`2` });
    }
  }
});

onInput("j", () => {
  clearText();
  initPuzzle();
});