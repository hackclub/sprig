/*
@title: Bat Maze
@description: A maze, but you can not see very far
@author: matthew0112
@tags: ['puzzle', 'maze']
@addedOn: 2026-09-28 
*/
const player = "p";
const wall = "w";
const end = "e";
const fog = "f";

setLegend(
  [player, bitmap`
................
................
................
................
................
................
.000..0.0..000..
..000.303.000...
...000000000....
....0.000.0.....
.......0........
................
................
................
................
................`],

  [wall, bitmap`
LLLLLLLLLLLLLLLL
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
LLLLLLLLLLLLLLLL`],

  [end, bitmap`
4444444444444444
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4444444444444444`],

  [fog, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);

const levels = [
  [
    "wwwwwwwwwwwwwww",
    "ew.w.ww.w.w...w",
    "...w........w.w",
    "ww.ww.wwwww.w.w",
    ".w.w........w.w",
    ".w.w.wwwwwwww.w",
    "...w.w........w",
    ".w.w.w.wwwwwwww",
    ".w.w.w........w",
    ".w.w.w.w.wwww.w",
    "ww.w.w.w....w.w",
    "...w.w.wwwwww.w",
    ".w.w.w........w",
    ".w.w.www.wwww.w",
    ".....w......wpw"
  ],
  [
    "wwwwwwwwwwwwwww",
    "we....w.......w",
    "wwwww.www.wwwww",
    "w...w...w.....w",
    "w.w.w.w.w.ww..w",
    "w.w.....w.w...w",
    "w.wwwwwww.w.w.w",
    "w.......w.w.w.w",
    "wwwwwww.w.w.www",
    "w.....w...w...w",
    "w.wwwwwww.www.w",
    "w.w.....w.....w",
    "w.w.w..wwwwww.w",
    "w...w........pw",
    "wwwwwwwwwwwwwww"
  ],

  [
    "wwwwwwwwwwwwwww",
    "we....w.......w",
    "wwwww.w.www.www",
    "w...w.w...w...w",
    "w..ww.www.www.w",
    "w.....w.w.w.w.w",
    "w.wwwww.w.w.w.w",
    "w...w...w...w.w",
    "www.www..ww.w.w",
    "w.w...w.....w.w",
    "w.www.wwwwwww.w",
    "w...w.w.....w.w",
    "w.w.w.w.www.w.w",
    "w.w.....w....pw",
    "wwwwwwwwwwwwwww"
  ],

  [
    "wwwwwwwwwwwwwww",
    "wew...........w",
    "w..ww.wwwww.www",
    "w...w...w.w...w",
    "www.www.w.ww..w",
    "w.w.w.w.....w.w",
    "w.w.w.wwwww.w.w",
    "w.w.w...w...w.w",
    "w.w.w.www.www.w",
    "w.w.w.......w.w",
    "w.w.wwwww..ww.w",
    "w.w.....w.w...w",
    "w.w.www.www.w.w",
    "w...........wpw",
    "wwwwwwwwwwwwwww"
  ],

  [
    "wwwwwwwwwwwwwww",
    "wew.......w...w",
    "w.w.wwwww.www.w",
    "w.w.....w...w.w",
    "w.www.w.www.w.w",
    "w...w.....w...w",
    "www.ww..w.www.w",
    "w.w...w.w...w.w",
    "w.www.wwwww.w.w",
    "w...w.....w.w.w",
    "w.wwwwwww.w.w.w",
    "w...........w.w",
    "w.www.wwww.ww.w",
    "w...w........pw",
    "wwwwwwwwwwwwwww"
  ],

  [
    "wwwwwwwwwwwwwww",
    "wew...........w",
    "w.w.w.w.w.www.w",
    "w.w.....w...w.w",
    "w.w.w.w.wwwww.w",
    "w.w.w.w.......w",
    "w.www.wwwwwww.w",
    "w.w...w.......w",
    "w.w.www.wwwwwww",
    "w.w.w.w.w.....w",
    "w.w.w.w.w.www.w",
    "w...w.w.w...w.w",
    "wwwww.w.w.w.w.w",
    "w............pw",
    "wwwwwwwwwwwwwww"
  ],

  [
    "wwwwwwwwwwwwwww",
    "wew...........w",
    "w.wwwwwwww.ww.w",
    "w.w.........w.w",
    "w.w.ww.wwww.w.w",
    "w...w.....w.w.w",
    "wwwww.wwwww.w.w",
    "w.w.........w.w",
    "w.w.wwwwwwwww.w",
    "w.w.....w.....w",
    "w.wwwww.wwwww.w",
    "w.....w.......w",
    "w.w.wwwwwwwww.w",
    "w............pw",
    "wwwwwwwwwwwwwww"
  ],

  [
    "wwwwwwwwwwwwwww",
    "wew...........w",
    "w.ww..wwwwwww.w",
    "w.....w.....w.w",
    "wwwwwww.w..ww.w",
    "w.....w...w...w",
    "w.w.w.w.w.w.www",
    "w.w.w.w.w.w...w",
    "w.w.www.w.www.w",
    "w.w...w.w.....w",
    "wwwww.w.wwwwwww",
    "w.....w.w.....w",
    "w.wwwww.wwwww.w",
    "w............pw",
    "wwwwwwwwwwwwwww"
  ],

  [
    "wwwwwwwwwwwwwww",
    "wew.w.........w",
    "w.w.w.wwwww.www",
    "w.w.w.....w...w",
    "w.w.w.wwwwwww.w",
    "w.w...w.....w.w",
    "w.wwwww.www.w.w",
    "w.w.....w.w.w.w",
    "w.w.wwwww.w.w.w",
    "w...w...w...w.w",
    "wwwww.w.w.www.w",
    "w.....w.w.w...w",
    "w.w.wwwww.w.w.w",
    "w.w.........wpw",
    "wwwwwwwwwwwwwww"
  ],

  [
    "wwwwwwwwwwwwwww",
    "wew.........w.w",
    "w.w.wwwww.w.w.w",
    "w...w...w...w.w",
    "wwwww.w.w.www.w",
    "w.....w.w.w...w",
    "w.wwwww.w.www.w",
    "w.w...w...w...w",
    "w.www..w.ww.w.w",
    "w.w.........w.w",
    "w....wwwwwwww.w",
    "w.w.w.....w...w",
    "w.w.w.w.www.www",
    "w...w.w......pw",
    "wwwwwwwwwwwwwww"
  ]
];

let level = 0;
let originalMap = levels[level];
let playerX = 13;
let playerY = 13;

function updateFog() {
  const display = [];

  for (let y = 0; y < originalMap.length; y++) {
    let row = "";

    for (let x = 0; x < originalMap[y].length; x++) {
      const visible =
        Math.abs(x - playerX) <= 1 &&
        Math.abs(y - playerY) <= 1;

      if (visible) {
        if (x === playerX && y === playerY) {
          row += ".";
        } else if (originalMap[y][x] === "p") {
          row += ".";
        } else {
          row += originalMap[y][x];
        }
      } else {
        row += fog;
      }
    }

    display.push(row);
  }

  setMap(map`
${display.join("\n")}
`);

  addSprite(playerX, playerY, player);
}

function canMove(x, y) {
  if (y < 0 || y >= originalMap.length || x < 0 || x >= originalMap[y].length) {
    return false;
  }

  return originalMap[y][x] !== "w";
}

function checkEnd() {
  if (originalMap[playerY][playerX] === "e") {
    level++;

    if (level >= levels.length) {
      setMap(map`
ffffffffff
ffffffffff
ffffffffff
ffffffffff
ffffffffff
ffffffffff
ffffffffff
ffffffffff
ffffffffff
ffffffffff`);

      addText("YOU WIN!", { x: 5, y: 7, color: color`4` });

      return;
    }

    loadLevel();
  }
}

function loadLevel() {
  originalMap = levels[level];

  for (let y = 0; y < originalMap.length; y++) {
    const x = originalMap[y].indexOf("p");

    if (x !== -1) {
      playerX = x;
      playerY = y;
      break;
    }
  }

  updateFog();
}

function movePlayer(dx, dy) {
  const newX = playerX + dx;
  const newY = playerY + dy;

  if (canMove(newX, newY)) {
    playerX = newX;
    playerY = newY;

    updateFog();
    checkEnd();
  }
}

updateFog();

onInput("w", () => {
  movePlayer(0, -1);
});

onInput("a", () => {
  movePlayer(-1, 0);
});

onInput("s", () => {
  movePlayer(0, 1);
});

onInput("d", () => {
  movePlayer(1, 0);
});
