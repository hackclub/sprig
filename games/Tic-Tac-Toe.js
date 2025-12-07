// Tic Tac Toe — X en 0 (nul)
// W/A/S/D bewegen, J plaatsen, I reset

setLegend(
  ["x", bitmap`
................
................
..0..........0..
...0.........0..
....0.......0...
.....00....0....
......0...0.....
.......0.0......
........0.......
.......0.0......
......0...0.....
.....0.....0....
....0.......0...
...0.........0..
................
................`],

  ["0", bitmap`
................
................
................
................
.....000000.....
....00....00....
...00......00...
...00......00...
...00......00...
...00......00...
...00......00...
....00....00....
.....000000.....
................
................
................`],

  ["c", bitmap`
................
................
................
................
.......00.......
......0000......
.....00..00.....
.....00..00.....
.....00..00.....
.....00..00.....
.....00..00.....
.....00..00.....
......0000......
.......00.......
................
................`]
);

setMap(map`
...
...
...
`);

// --- state ---
let board = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];

let turn = "X"; // X begint
let cx = 1;     // cursor x
let cy = 1;     // cursor y
let gameOver = false;

// clear sprites on 3x3 grid
function clearBoardSprites() {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      clearTile(x, y);
    }
  }
}

function draw() {
  clearBoardSprites();
  clearText();

  // draw X/0
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (board[y][x] === "X") addSprite(x, y, "x");
      if (board[y][x] === "0") addSprite(x, y, "0");
    }
  }

  if (!gameOver) {
    addSprite(cx, cy, "c");
    addText("TURN: " + turn, { y: 15 });
    addText("MOVE: W A S D   PLACE: J   RESET: I", { y: 14 });
  } else {
    addText("Press I to restart", { y: 15 });
  }
}

function checkWin(p) {
  for (let r = 0; r < 3; r++) {
    if (board[r][0] === p && board[r][1] === p && board[r][2] === p) return true;
  }
  for (let c = 0; c < 3; c++) {
    if (board[0][c] === p && board[1][c] === p && board[2][c] === p) return true;
  }
  if (board[0][0] === p && board[1][1] === p && board[2][2] === p) return true;
  if (board[0][2] === p && board[1][1] === p && board[2][0] === p) return true;
  return false;
}

function resetGame() {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ];
  turn = "X";
  cx = 1; 
  cy = 1;
  gameOver = false;
  draw();
}

function place() {
  if (gameOver) return;
  if (board[cy][cx] !== " ") return;

  board[cy][cx] = turn;

  if (checkWin(turn)) {
    gameOver = true;
    draw();
    addText(turn + " WINS!", { y: 7 });
    return;
  }

  // check draw
  let full = true;
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (board[y][x] === " ") full = false;
    }
  }

  if (full) {
    gameOver = true;
    draw();
    addText("Draw!", { y: 7 });
    return;
  }

  // switch turn X → 0 → X
  turn = (turn === "X") ? "0" : "X";
  draw();
}

// Movement
onInput("w", () => { if (!gameOver && cy > 0) { cy--; draw(); } });
onInput("s", () => { if (!gameOver && cy < 2) { cy++; draw(); } });
onInput("a", () => { if (!gameOver && cx > 0) { cx--; draw(); } });
onInput("d", () => { if (!gameOver && cx < 2) { cx++; draw(); } });

// Place tile
onInput("j", () => place());

// Reset
onInput("i", () => resetGame());

// first draw
draw();
