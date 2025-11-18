/*
@title: Little Guy
@author: RHW
@description: An infinite scroller where you can get coins and avoid spikes. Gets harder the more you play!
@tags: ['Scroller', 'Infinite', 'Challenging', 'Sprig']
@addedOn: 2025-10-08
*/

// cntls: W = jump, A/D = move left/right, J = restart

const P = "p"; // player
const X = "x"; // grass top
const G = "g"; // ground beneath grass
const H = "h"; // spikess
const C = "c"; // coin
const S = "s"; // super jump powerup
const BG = "b"; // background cloud

setLegend(
  [P, bitmap`
................
................
................
.......33.......
......3.33......
.....3.3.3.3....
.....333333.....
......3..3......
.....3....3.....
................
................
................
................
................
................
................`],
  [X, bitmap`
LLLLLLLLLLLLLLLL
L88L8L88L8L88L8L
L88L8L88L8L88L8L
88L8L88L8L88L8L8
8L8L88L8L88L8L88
L8L88L8L88L8L88L
8L88L8L88L8L88L8
L88L8L88L8L88L8L
................
................
................
................
................
................
................
................`],
  [G, bitmap`
8L8L88L8L88L8L88
L8L88L8L88L8L88L
8L88L8L88L8L88L8
L88L8L88L8L88L8L
88L8L88L8L88L8L8
8L8L88L8L88L8L88
L8L88L8L88L8L88L
8L88L8L88L8L88L8
L88L8L88L8L88L8L
88L8L88L8L88L8L8
8L8L88L8L88L8L88
L8L88L8L88L8L88L
8L88L8L88L8L88L8
L88L8L88L8L88L8L
8L8L88L8L88L8L88
L8L88L8L88L8L88L`],
  [H, bitmap`
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
...4...4...4....
..444.444.444...
.4444444444444..
4444444444444444
LLLLLLLLLLLLLLLL`],
  [C, bitmap`
................
................
................
......666.......
....66..66......
...6..66..6.....
..6..6....6.....
..6.666...6.....
..6..6....6.....
...6..66..6.....
....66..66......
......666.......
................
................
................
................`],
  [S, bitmap`
................
................
......777.......
.....7...7......
....7.7.7.7.....
...7..7.7..7....
...7.7...7.7....
...7..7.7..7....
....7.7.7.7.....
.....7...7......
......777.......
................
................
................
................
................`],
  [BG, bitmap`
................
................
.11.............
.1111...........
.211111.........
..1111..........
................
............11..
...........1111.
..........211111
...........1111.
................
................
................
................
................`]
);

setBackground(BG);

const W = 18;
const Ht = 16;

let cols = [];
let tickMs = 100;
let tickId = null;
let score = 0;
let speedTimer = 0;
let px = 3; // x
let py = 6; // y
let vy = 0;
let gameOver = false;
let coins = 0;
let superJumpCharge = 0;
let superJumpActive = false;
let superJumpTimer = 0;

const rand = (n) => Math.floor(Math.random() * n);
const emptyCol = () => Array(Ht).fill(".").join("");

function genCol() {
  const col = Array(Ht).fill(".");
  const groundTop = Ht - 4;

  if (Math.random() < 0.8) {
    col[groundTop] = X;
    for (let y = groundTop + 1; y < Ht; y++) col[y] = G;
  }
  if (Math.random() < 0.2) {
    const hrow = groundTop - 3 - rand(4);
    if (hrow >= 2) {
      col[hrow] = X;
      if (hrow + 1 < Ht && Math.random() < 0.5) col[hrow + 1] = G;
    }
  }
  const hazardChance = 0.06 + score / 10000;
  if (Math.random() < hazardChance && col[groundTop] === X) {
    col[groundTop - 1] = H;
  }

  if (Math.random() < 0.1) {
    const crow = groundTop - 4 - rand(4);
    if (crow >= 1 && col[crow + 1] !== H) col[crow] = C;
  }

  if (Math.random() < 0.02) {
    const srow = groundTop - 5 - rand(3);
    if (srow >= 1 && col[srow] === ".") col[srow] = S;
  }

  return col.join("");
}

function initColumns() {
  cols = [];
  for (let i = 0; i < W; i++) cols.push(emptyCol());
}

function buildMapString() {
  const rows = Array(Ht).fill("");
  for (let y = 0; y < Ht; y++) {
    let row = "";
    for (let x = 0; x < W; x++) {
      row += cols[x] ? cols[x][y] : ".";
    }
    rows[y] = row;
  }

  // player
  const pY = Math.max(0, Math.min(Ht - 1, Math.round(py)));
  if (rows[pY]) {
    const rowArr = rows[pY].split("");
    rowArr[px] = P;
    rows[pY] = rowArr.join("");
  }

  return map`${rows.join("\n")}`;
}

function setGameMap() {
  const m = buildMapString();
  setMap(m);
}

// --- MAIN GAME LOOP ---
function tick() {
  if (gameOver) return;

  vy += 0.38; // gravity 4 jump
  py += vy;
  const footY = Math.round(py) + 1;
  const belowY = Math.min(Ht - 1, footY);
  const headY = Math.max(0, Math.round(py));

  if (px >= 0 && px < W && cols[px]) {
    const tileBelow = cols[px][belowY];
    if ((tileBelow === X || tileBelow === G) && vy >= 0) {
      py = belowY - 1;
      vy = 0;
    }
  }

  if (px >= 0 && px < W && cols[px]) {
    const tileAbove = cols[px][headY];
    if ((tileAbove === X || tileAbove === G) && vy < 0) {
      vy = 0;
    }
  }

  if (py > Ht) {
    endGame();
    return;
  }

  if (px >= 0 && px < W && cols[px]) {
    const pTileY = Math.round(py);
    const pTile = cols[px][pTileY];
    if (pTile === C) {
      coins++;
      const col = cols[px].split("");
      col[pTileY] = ".";
      cols[px] = col.join("");
      playTune(tune`C5/8`, 1);
    }
    if (pTile === H) {
      endGame();
      return;
    }
    if (pTile === S) {
      superJumpCharge = Math.min(3, superJumpCharge + 1); // Max 3 charges
      const col = cols[px].split("");
      col[pTileY] = ".";
      cols[px] = col.join("");
      playTune(tune`G5/8 E5/8 C5/8`, 1);
    }
  }

  speedTimer++;
  if (speedTimer % 250 === 0 && tickMs > 45) {
    tickMs = Math.max(45, tickMs - 5);
    clearInterval(tickId);
    tickId = setInterval(tick, tickMs);
  }

  if (superJumpActive) {
    superJumpTimer--;
    if (superJumpTimer <= 0) {
      superJumpActive = false;
    }
  }

  clearText();
  addText(`Score:${score}`, { x: 1, y: 1, color: color`L` });
  addText(`Coins:${coins}`, { x: 1, y: 2, color: color`6` });
  if (superJumpCharge > 0) {
    addText(`Jump:${"S".repeat(superJumpCharge)}`, { x: 10, y: 1, color: color`7` });
  }
  if (superJumpActive) {
    addText("SUPER JUMP!", { x: 4, y: 5, color: color`7` });
  }

  setGameMap();
}

function startGame() {
  score = 0;
  coins = 0;
  py = 6;
  vy = 0;
  tickMs = 100;
  speedTimer = 0;
  superJumpCharge = 0;
  superJumpActive = false;
  gameOver = false;
  initColumns();

  for (let i = 0; i < W; i++) {
    if (i < 8) {
      const col = cols[i].split("");
      col[Ht - 4] = X;
      for (let y = Ht - 3; y < Ht; y++) col[y] = G;
      cols[i] = col.join("");
    } else {
      cols[i] = genCol();
    }
  }

  setGameMap();
  if (tickId) clearInterval(tickId);
  tickId = setInterval(tick, tickMs);
}

function endGame() {
  gameOver = true;
  clearInterval(tickId);
  addText("GAME OVER", { x: 5, y: 6, color: color`4` });
  addText("Press J to restart", { x: 2, y: 8, color: color`L` });
  playTune(tune`C4/4 G3/4 E3/4 C3/2`, 1);
}
// rhw wuz here
// --- INPUT HANDLING ---
onInput("w", () => {
  if (gameOver) return;

  const foot = Math.round(py) + 1;
  const isGrounded = (vy === 0 || (cols[px][Math.min(Ht - 1, foot)] === X) || (cols[px][Math.min(Ht - 1, foot)] === G));

  if (isGrounded) {
    if (superJumpCharge > 0) {
      vy = -4.0; // Stronger jump
      superJumpCharge--;
      superJumpActive = true;
      superJumpTimer = 60; // Lasts for 60 ticks
      playTune(tune`G5/4`, 1);
    } else {
      vy = -3.0; // Normal jump
      playTune(tune`C5/8`, 1);
    }
  }
});

onInput("a", () => {
  if (gameOver) return;
  px = Math.max(0, px - 1);
  setGameMap();
});

onInput("d", () => {
  if (gameOver) return;

  const scrollThreshold = Math.floor(W / 2);

  if (px < scrollThreshold) {
    px = Math.min(W - 1, px + 1);
  } else {
    cols.shift();
    cols.push(genCol());
    score++;
  }

  setGameMap();
});

onInput("j", () => {
  startGame();
});

startGame();