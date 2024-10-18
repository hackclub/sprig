/*
@title: Maze Chase
@author: Armaanpreet Singh
@tags: ["puzzle" , "timed" , "multiplayer"]
@addedOn: 2024-08-05
Capture the flag before the other player does!
*/
const player1 = "a";
const player2 = "b";
const wall = "w";
const flag = "f";
const gameover = "g";
const teleporter = "t";

const player1Bitmap = bitmap`
................
................
.......3........
.....88888......
.....80808......
.....88388......
.....C000C......
....C..0..C.....
......0.0.......
................
................
................
................
................
................
................`;

const player2Bitmap = bitmap`
................
................
................
................
.......C........
.....77277......
.....20202......
.....72C27......
.....H000H......
....H..0..H.....
......0.0.......
................
................
................
................
................`;

const wallBitmap = bitmap`
FFLLLLLLLLLLLLFF
FFFLLLLLLLLLLFFF
LLFLLLLLLLLLLFLL
LLLFLLLLLLLLFLLL
LLLLFFLLLLFFLLLL
LLLLLFLLLLFLLLLL
LLLLL333333LLLLL
LLLLL333333LLLLL
LLLLL333333LLLLL
LLLLL333333LLLLL
LLLLL333333LLLLL
LLLLL333333LLLLL
LLLLFLLLLLLFLLLL
LLFFLLLLLLLLFFFL
FFLLLLLLLLLLLLFF
FFLLLLLLLLLLLLFF`;

const flagBitmap = bitmap`
................
................
................
................
................
................
.......33.......
.......033......
.......03.......
.......0........
................
................
................
................
................
................`;

const gameoverBitmap = bitmap`
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
2222222222222222`;

const teleporterBitmap = bitmap`
................
................
......7..7......
......7777......
......7227......
....77277277....
....72HHHH27....
....72HHHH27....
....72HHHH27....
....77277277....
......7227......
......7777......
......7..7......
................
................
................`;

setLegend(
  [player1, player1Bitmap],
  [player2, player2Bitmap],
  [wall, wallBitmap],
  [flag, flagBitmap],
  [gameover, gameoverBitmap],
  [teleporter, teleporterBitmap]
);

setSolids([player1, player2, wall]);

// Level 0 to 3 are the game levels, level 4 is the end screen
let level = 0;
const levels = [
  map`
a.....w..b
..ww....ww
w.w..ww.w.
..w.wt..w.
.ww.w.www.
......w...
.w.wwww...
.......f..`,
  map`
wwwwww.www
.........w
..www.ww.w
....a.w..w
.ww...w..w
w....bw.ww
..wwwt.fww
..w.....ww`,
  map`
a.wwwwwwww
w........w
w.wwwww..w
w.wwwww..w
w...f....w
..wwwww..w
.........w
wwwwwwww.b`,
  map`
wwwwwwwwwwwwww
a.........t..w
.www.w.www...w
.............w
wwww.wfw.ww.ww
www..www.....w
www......www.w
wwwwwwwwwwww.b`,
  map`
g`
];

setMap(levels[level]);

// Timer variables
let timer = 30;
let interval;

function startTimer() {
  interval = setInterval(() => {
    timer--;
    clearText();
    addText(`Time: ${timer}`, { x: 10, y: 0, color: color`0` });
    if (timer <= 0) {
      clearInterval(interval);
      setMap(levels[4]);
      addText("TIME'S UP! DRAW", { x: 0, y: 0, color: color`5` });
      addText("ANY KEY TO CONTINUE", { x: 0, y: 2, color: color`5` });
    }
  }, 1000);
}

function checkWin() {
  const winMusic = tune`
283.0188679245283: E5~283.0188679245283,
283.0188679245283: G5~283.0188679245283,
283.0188679245283: A5~283.0188679245283,
283.0188679245283: A5~283.0188679245283,
283.0188679245283: G5~283.0188679245283,
283.0188679245283: E5~283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: C5~283.0188679245283 + A4-283.0188679245283,
283.0188679245283: C5~283.0188679245283 + A4-283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: E5~283.0188679245283,
283.0188679245283: E5~283.0188679245283,
283.0188679245283: D5~283.0188679245283 + A4-283.0188679245283,
283.0188679245283: D5~283.0188679245283 + A4-283.0188679245283,
283.0188679245283: E5~283.0188679245283,
283.0188679245283: F5~283.0188679245283,
283.0188679245283: G5~283.0188679245283,
283.0188679245283: G5~283.0188679245283,
283.0188679245283: F5~283.0188679245283,
283.0188679245283: E5~283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: C5~283.0188679245283 + A4-283.0188679245283 + F4/283.0188679245283,
283.0188679245283: C5~283.0188679245283 + A4-283.0188679245283 + F4/283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: E5~283.0188679245283,
283.0188679245283: E5~283.0188679245283,
283.0188679245283: D5~283.0188679245283 + A4^283.0188679245283,
283.0188679245283: C5~283.0188679245283 + G4^283.0188679245283,
1132.0754716981132`;

  try {
    if (getFirst(player1).x == getFirst(flag).x && getFirst(player1).y == getFirst(flag).y) {
      clearInterval(interval);
      playTune(winMusic);
      setMap(levels[4]); // Show the end screen
      addText("PLAYER 1 WINS", { x: 0, y: 0, color: color`7` });
      addText("ANY KEY TO CONTINUE", { x: 0, y: 2, color: color`7` });
    } else if (getFirst(player2).x == getFirst(flag).x && getFirst(player2).y == getFirst(flag).y) {
      clearInterval(interval);
      playTune(winMusic);
      setMap(levels[4]); // Show the end screen
      addText("PLAYER 2 WINS", { x: 0, y: 0, color: color`3` });
      addText("ANY KEY TO CONTINUE", { x: 0, y: 2, color: color`3` });
    }
  } catch (e) {}
}

function teleport(player) {
  const newX = Math.floor(Math.random() * 10);
  const newY = Math.floor(Math.random() * 10);
  player.x = newX;
  player.y = newY;
}

// Player 1 controls
onInput("w", () => {
  if (level < 4) {
    getFirst(player1).y -= 1;
    if (getTile(getFirst(player1).x, getFirst(player1).y).some(tile => tile.type === teleporter)) {
      teleport(getFirst(player1));
    }
    checkWin();
  }
});

onInput("s", () => {
  if (level < 4) {
    getFirst(player1).y += 1;
    if (getTile(getFirst(player1).x, getFirst(player1).y).some(tile => tile.type === teleporter)) {
      teleport(getFirst(player1));
    }
    checkWin();
  }
});

onInput("a", () => {
  if (level < 4) {
    getFirst(player1).x -= 1;
    if (getTile(getFirst(player1).x, getFirst(player1).y).some(tile => tile.type === teleporter)) {
      teleport(getFirst(player1));
    }
    checkWin();
  }
});

onInput("d", () => {
  if (level < 4) {
    getFirst(player1).x += 1;
    if (getTile(getFirst(player1).x, getFirst(player1).y).some(tile => tile.type === teleporter)) {
      teleport(getFirst(player1));
    }
    checkWin();
  }
});

// Player 2 controls
onInput("i", () => {
  if (level < 4) {
    getFirst(player2).y -= 1;
    if (getTile(getFirst(player2).x, getFirst(player2).y).some(tile => tile.type === teleporter)) {
      teleport(getFirst(player2));
    }
    checkWin();
  }
});

onInput("k", () => {
  if (level < 4) {
    getFirst(player2).y += 1;
    if (getTile(getFirst(player2).x, getFirst(player2).y).some(tile => tile.type === teleporter)) {
      teleport(getFirst(player2));
    }
    checkWin();
  }
});

onInput("j", () => {
  if (level < 4) {
    getFirst(player2).x -= 1;
    if (getTile(getFirst(player2).x, getFirst(player2).y).some(tile => tile.type === teleporter)) {
      teleport(getFirst(player2));
    }
    checkWin();
  }
});

onInput("l", () => {
  if (level < 4) {
    getFirst(player2).x += 1;
    if (getTile(getFirst(player2).x, getFirst(player2).y).some(tile => tile.type === teleporter)) {
      teleport(getFirst(player2));
    }
    checkWin();
  }
});

// Restart the game and move to the next level if the level is different
afterInput(() => {
  if (level == 4) {
    clearText();
    level = (level + 1) % 4; // Move to the next level
    setMap(levels[level]);
    timer = 30;
    startTimer();
  }
});

startTimer();
