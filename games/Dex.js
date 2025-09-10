/*
@title: dexter_nightshift
@description: Dexter must grab the knife and kill the victim before Doakes catches him! 
@author: edits
@tags: ['stealth', 'puzzle']
@addedOn: 2025-08-19
*/

const dexter = "d";
const target = "t";
const doakes = "c";
const knife = "k";
const wall = "w";

setLegend(
  [ dexter, bitmap`
................
................
......000000....
......003003....
...0..000000....
...00.003003....
...00.003003....
...00.003333....
...00..0........
..0000.0........
...00..0........
...00000000.....
.......0........
......000.......
......0.0.......
......0.0.......` ],
  [ target, bitmap`
................
................
................
................
................
....000000......
....033330......
..00000000......
....606066......
....606066......
....66660.......
........0.......
.....0000.......
.....0000.......
.....0000.......
.......00.......` ],
  [ doakes, bitmap`
................
................
................
................
................
......5555......
......5555......
......CCCC......
......0660......
......6336......
.......66.......
.....655556.....
.....6.55.6.....
.....6.55.6.....
.......55.......
.......55.......` ],
  [ knife, bitmap`
.......33.......
......3333......
.....333233.....
.....033223.....
.....023023.....
.....020020.....
.....020220.....
.....020020.....
.....022020.....
.....020020.....
....00000000....
...0000000000...
.......CC.......
.......CC.......
.......CC.......
.......96.......` ],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000L00000000000
0000L00000000000
00000000000L0000
0000000000000000
000000000000L000
00000L0000000000
0000000LL0000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
000LL00000L00000
0000000000000000
0000000000000000` ]
);

// Level design
const levels = [
  map`
wwwwwwwwwwwwwwww
wd.....k.......w
w..wwwwwww.....w
w..............w
w.....c........w
w..........t...w
w..............w
wwwwwwwwwwwwwwww`
];

let level = 0;
setMap(levels[level]);

// Only walls are solid
setSolids([ wall ]);

let dexterHasKnife = false;
let gameOver = false;

// Dexter’s movement (WASD)
onInput("w", () => {
  if (!gameOver) {
    const d = getFirst(dexter);
    const nextY = d.y - 1;
    if (!tileHasType(d.x, nextY, wall)) {
      d.y = nextY;
    }
  }
});

onInput("s", () => {
  if (!gameOver) {
    const d = getFirst(dexter);
    const nextY = d.y + 1;
    if (!tileHasType(d.x, nextY, wall)) {
      d.y = nextY;
    }
  }
});

onInput("a", () => {
  if (!gameOver) {
    const d = getFirst(dexter);
    const nextX = d.x - 1;
    if (!tileHasType(nextX, d.y, wall)) {
      d.x = nextX;
    }
  }
});

onInput("d", () => {
  if (!gameOver) {
    const d = getFirst(dexter);
    const nextX = d.x + 1;
    if (!tileHasType(nextX, d.y, wall)) {
      d.x = nextX;
    }
  }
});

// Doakes’ movement (Arrows)
onInput("i", () => {
  if (!gameOver) {
    const c = getFirst(doakes);
    const nextY = c.y - 1;
    if (!tileHasType(c.x, nextY, wall)) {
      c.y = nextY;
    }
  }
});

onInput("k", () => {
  if (!gameOver) {
    const c = getFirst(doakes);
    const nextY = c.y + 1;
    if (!tileHasType(c.x, nextY, wall)) {
      c.y = nextY;
    }
  }
});

onInput("j", () => {
  if (!gameOver) {
    const c = getFirst(doakes);
    const nextX = c.x - 1;
    if (!tileHasType(nextX, c.y, wall)) {
      c.x = nextX;
    }
  }
});

onInput("l", () => {
  if (!gameOver) {
    const c = getFirst(doakes);
    const nextX = c.x + 1;
    if (!tileHasType(nextX, c.y, wall)) {
      c.x = nextX;
    }
  }
});

// Full screen message
function fullScreenMessage(text, colorCode) {
  clearText();
  for (let y = 0; y < 8; y++) {
    addText(text, { y, color: colorCode });
  }
}

// Function to check if a specific type of sprite is present in a tile
const tileHasType = (x, y, type) => getTile(x, y).some(s => s.type === type);
// After every input
afterInput(() => {
  if (gameOver) return;

  const d = getFirst(dexter);
  const c = getFirst(doakes);

  // Check for collisions with walls
  if (tileHasType(d.x, d.y, wall)) {
    // Dexter is trying to move into a wall, prevent movement
    return;
  }

  if (tileHasType(c.x, c.y, wall)) {
    // Doakes is trying to move into a wall, prevent movement
    return;
  }

  // Dexter interactions
  const tile = getTile(d.x, d.y);
  tile.forEach(obj => {
    if (obj.type === knife) {
      obj.remove();
      dexterHasKnife = true;
      addText("Dexter armed!", { y: 0, color: color`3` });
    }
    if (obj.type === target) {
      if (dexterHasKnife) {
        obj.remove();
        fullScreenMessage("DEXTER WINS!", color`9`);
        gameOver = true;
      } else {
        addText("Need a weapon!", { y: 1, color: color`6` });
      }
    }
  });

  // Doakes catches Dexter
  if (d.x === c.x && d.y === c.y) {
    fullScreenMessage("DOAKES WINS!", color`2`);
    gameOver = true;
  }
});
