/*
@title: Colorshift
@author: Syntax-Surfer-1
@tags: []
@addedOn: 2025-00-00
*/

const player = "p";
const wall = "X";
const red = "R";
const green = "G";
const blue = "B";
const goal = "E";
const star = "S";
const gate = "L";
const ghost = "Z";

const colorMap = {
  red: color`3`,
  green: color`4`,
  blue: color`5`
};

let currentColor = "red";
let starCount = 0;
let level = 0;
let gameWon = false;

setLegend(
  [ player, bitmap`
................
................
.....HHHHHH.....
....HLLLLLLH....
...HLLLLLLLLH...
..HHL2LLLL2LHH..
..HHL2LLLL2LHH..
..H.3LLLLLL3.H..
..H..666666..H..
..H..6....6..H..
..H..6....6..H..
.....1....1.....
.....1....1.....
.....1....1.....
..1111....1111..
................`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ red, bitmap`
3333333333333333
3CCCCCCCCCCCCCC3
3CCCCCCCCCCCCCC3
3CC3333333333CC3
3CC3CCCCCCCC3CC3
3CC3CCCCCCCC3CC3
3CC3CC3333CC3CC3
3CC3CC3333CC3CC3
3CC3CC3333CC3CC3
3CC3CC3333CC3CC3
3CC3CCCCCCCC3CC3
3CC3CCCCCCCC3CC3
3CC3333333333CC3
3CCCCCCCCCCCCCC3
3CCCCCCCCCCCCCC3
3333333333333333`],
  [ green, bitmap`
DDDDDDDDDDDDDDDD
D44444444444444D
D44444444444444D
D44DDDDDDDDDD44D
D44D44444444D44D
D44D44444444D44D
D44D44DDDD44D44D
D44D44DDDD44D44D
D44D44DDDD44D44D
D44D44DDDD44D44D
D44D44444444D44D
D44D44444444D44D
D44DDDDDDDDDD44D
D44444444444444D
D44444444444444D
DDDDDDDDDDDDDDDD`],
  [ blue, bitmap`
5555555555555555
5777777777777775
5777777777777775
5775555555555775
5775777777775775
5775777777775775
5775775555775775
5775775555775775
5775775555775775
5775775555775775
5775777777775775
5775777777775775
5775555555555775
5777777777777775
5777777777777775
5555555555555555`],
  [ goal, bitmap`
................
................
................
.....999999.....
....99999999....
...9999889999...
...9998888999...
...9988778899...
...9988778899...
...9998888999...
...9999889999...
....99999999....
.....999999.....
................
................
................`],
  [ star, bitmap`
.......6........
......666.......
.....66666......
....6663666.....
...666363666....
..66636663666...
.6663667663666..
6663667H7663666.
.6663667663666..
..66636663666...
...666363666....
....6663666.....
.....66666......
......666.......
.......6........
................`],
  [ gate, bitmap`
HHHHHHHHHHHHHHHH
HH888888888888HH
H8H8888888888H8H
H88HHHHHHHHHH88H
H88HH888888HH88H
H88H8H8888H8H88H
H88H88H88H88H88H
H88H888HH888H88H
H88H888HH888H88H
H88H88H88H88H88H
H88H8H8888H8H88H
H88HH888888HH88H
H88HHHHHHHHHH88H
H8H8888888888H8H
HH888888888888HH
HHHHHHHHHHHHHHHH`],
  [ ghost, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
);

const levels = [
  map`
XXXXXXXXXXXXXX
Xp.S.X.S.BXXXX
X.XXXXRXXZXLEX
X..S..ZX..GGXX
XXXXXXXXXXXXXX`,

  map`
XXXXXXXXXXXXXX
XpR.X.S.B.LEXX
X.XXG.XXZZXXSX
X.SZ..X..G..ZX
XXXXXXXXXXXXXX`,

  map`
XXXXXXZZZXXXXXX
Xp..SXZXB.S...X
X.XXXR..XXXXX.X
X.S.Z...XGL.R.X
XXXXXXXXXEXXXXX`,

  map`
XXXXXXZZZXXXXXX
XpXXXZZZXXZXXXX
XZXZRZXZXXZXXXX
XZXZXXXZXZGZXXX
XZZZXXXBZZXZZLX
XXXXXXXXXXXXZEX`,
];

function startLevel() {
  if (gameWon) return;
  starCount = 0;
  setMap(levels[level]);
  updateSolids();
  updateColorText();
}

function updateSolids() {
  if (currentColor === "red") {
    setSolids([player, wall, green, blue, gate]);
  } else if (currentColor === "green") {
    setSolids([player, wall, red, blue, gate]);
  } else if (currentColor === "blue") {
    setSolids([player, wall, red, green, gate]);
  }
}

function updateColorText() {
  if (gameWon) return;
  clearText();
  addText(`Color: ${currentColor.toUpperCase()}`, {
    x: 1,
    y: 14,
    color: colorMap[currentColor]
  });
  addText(`Stars: ${starCount}/3`, {
    x: 1,
    y: 15,
    color: color`3`
  });
}

function showWinScreen() {
  clearText();
  // Replace map with empty level to simulate clearing
  setMap(map`
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................`);
  addText("YOU WIN OwO", {
    x: 3,
    y: 7,
    color: color`3`
  });
  addText("Press L to Restart", {
    x: 2,
    y: 9,
    color: color`4`
  });
}

onInput("w", () => getFirst(player).y--);
onInput("s", () => getFirst(player).y++);
onInput("a", () => getFirst(player).x--);
onInput("d", () => getFirst(player).x++);

onInput("i", () => {
  currentColor = "red";
  updateSolids();
  updateColorText();
});
onInput("j", () => {
  currentColor = "green";
  updateSolids();
  updateColorText();
});
onInput("k", () => {
  currentColor = "blue";
  updateSolids();
  updateColorText();
});
onInput("l", () => {
  level = 0;
  gameWon = false;
  startLevel();
});

afterInput(() => {
  if (gameWon) return;

  updateColorText();

  const collected = tilesWith(player, star);
  for (let tile of collected) {
    const hasPlayer = tile.some(obj => obj.type === player);
    const hasStar = tile.some(obj => obj.type === star);
    if (hasPlayer && hasStar) {
      const pos = tile.find(obj => obj.type === player);
      clearTile(pos.x, pos.y);
      addSprite(pos.x, pos.y, player);
      starCount++;
    }
  }

  if (starCount >= 3) {
    const gates = getAll(gate);
    for (let g of gates) clearTile(g.x, g.y);
  }

  const won = tilesWith(player, goal).length > 0;
  if (won) {
    if (level < levels.length - 1) {
      clearText();
      addText("Level Complete!", { x: 2, y: 7, color: color`3` });
      level++;
      setTimeout(startLevel, 1000);
    } else {
      gameWon = true;
      showWinScreen();
    }
  }
});

startLevel();
