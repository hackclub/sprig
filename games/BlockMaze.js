/*
@title: BlockMaze
@author: Arjun
@tags: ['puzzle']
@addedOn: 2024-07-08
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p";
const wall = "w";
const floor = "f";
const paint = "c";
const collectible = "o";

setLegend(
  [player, bitmap`
....00000000....
...00000LL000...
..0000000LL000..
.000000000LLL00.
000000000000L000
0000000000000000
0000000000000000
00000000000000L0
0000000000000000
0000000000000000
0000000000000000
0000000000000000
.00000000000000.
..000000000000..
...0000000000...
....00000000....`],
  [wall, bitmap`
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
0000000000000000`],
  [floor, bitmap`
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
................`],
  [paint, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [collectible, bitmap`
....00000000....
..0000....0000..
.000........000.
.00..........00.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.00..........00.
.000........000.
..0000....0000..
....00000000....`]
);

setSolids([player, wall]);

let level = 0;
let w = 0;
let interval;
let collectiblesCollected = 0;

const levels = [
  map`
pwwwwwwww
.w......w
.w.wwww.w
.w.wwww.w
.w.wwww.w
.w.wwww.w
........w
wwwwwwwww`,
  map`
p........
wwwwwwww.
.........
.wwwwwwww
.w.......
.w.wwwww.
.w.......
...wwwwww`,
  map`
pwwwwwwww
.w......w
.w.wwww.w
.w....w..
.wwww.ww.
.w....www
...wwwwww
wwwwwwwww`,
  map`
p........
wwwwwwww.
.......w.
.wwwww.w.
.w.....w.
.w.wwwww.
.........
wwwwwwwww`,
  map`
p........
wwwwwwww.
.......w.
.wwwww.w.
.w.....w.
.w.wwwww.
.........
wwwwwwwww`,
  map`
pwwwwwwww
.w......w
.w.wwww.w
.w.wwww.w
.w.wwww.w
.w.wwww.w
........w
wwwwwwwww`
];

function startTimer() {
  timer = 0;
  interval = setInterval(() => {
    timer++;
    addText(`Time: ${timer}`, { x: 0, y: 0, color: color`2` });
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function resetTimer() {
  stopTimer();
  startTimer();
}

function addCollectibles() {
  let count = 5; // number of collectibles to add per level
  for (let i = 0; i < count; i++) {
    let x = Math.floor(Math.random() * width());
    let y = Math.floor(Math.random() * height());
    if (getTile(x, y).length == 0) {
      addSprite(x, y, collectible);
    } else {
      i--; // try again if the spot is occupied
    }
  }
}

setMap(levels[level]);
resetTimer();
addCollectibles();

onInput("w", () => {
  movePlayer(0, -1);
});

onInput("s", () => {
  movePlayer(0, 1);
});

onInput("a", () => {
  movePlayer(-1, 0);
});

onInput("d", () => {
  movePlayer(1, 0);
});

onInput("i", () => {
  setMap(levels[level]);
  resetTimer();
  addCollectibles();
});

function isType(x, y, type) {
  let tiles = getTile(x, y);
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i]._type == type) {
      return true;
    }
  }
  return false;
}

function canGo(x, y) {
  if (isType(x, y, wall) || isType(x, y, paint) || x > 8 || y > 7 || y < 0 || x < 0) {
    return false;
  } else {
    return true;
  }
}

function movePlayer(dx, dy) {
  let playerObj = getFirst(player);
  let nextX = playerObj.x + dx;
  let nextY = playerObj.y + dy;
  let tiles = getTile(nextX, nextY);
  if (!canGo(nextX, nextY)) {
    return;
  } else {
    let depth = 0;
    while (canGo(nextX+dx, nextY+dy) && depth < 10) {
      addSprite(nextX, nextY, paint);
      if (isType(nextX, nextY, collectible)) {
        collectiblesCollected++;
        tiles.forEach(tile => {
          if (tile == collectible) {
            removeSprite(tile);
          }
        });
      }
      nextX += dx;
      nextY += dy;
      depth++;
    }
  }
  addSprite(playerObj.x, playerObj.y, paint);
  playerObj.x = nextX;
  playerObj.y = nextY;
  addSprite(playerObj.x, playerObj.y, paint);
}

afterInput(() => {
  addText(`Collected: ${collectiblesCollected}`, {y: 2, x: 0, color: `5`});
  if (isMazeFilled()) {
    level++;
    if (level < levels.length) {
      setMap(levels[level]);
      resetTimer();
      addCollectibles();
    } else {
      addText("You win!", { y: 4, color: color`5` });
      stopTimer();
    }
  }
});

function isMazeFilled() {
  for (let y = 0; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      let tiles = getTile(x, y);
      if (tiles.length == 0) {
        return false;
      }
    }
  }
  return true;
}

setMap(levels[level]);
addCollectibles();
