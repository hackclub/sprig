/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: BlockMaze
@author: Arjun
@tags: ['maze', 'puzzle', 'color']
@addedOn: 2024-07-08
*/

const player = "p";
const wall = "w";
const floor = "f";
const paint = "c";

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
3333333333333333`]
);

setSolids([player, wall]);

let level = 0;
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
.wwwww..w
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

setMap(levels[level]);

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
});

function movePlayer(dx, dy) {
  let playerObj = getFirst(player);
  let nextX = playerObj.x + dx;
  let nextY = playerObj.y + dy;
  if (getTile(nextX, nextY).length != 0) {
    return
  }
  console.log(playerObj.x);
  addSprite(playerObj.x, playerObj.y, paint);
  getFirst(player).x = nextX;
  getFirst(player).y = nextY;
}

afterInput(() => {
  if (isMazeFilled()) {
    level++;
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You win!", { y: 4, color: color`5` });
    }
  }
});

function isMazeFilled() {
  for (let y = 0; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      let tiles = getTile(x, y);
      console.log(tiles);
      if (tiles.length == 0) {
        return false;
      }
    }
  }
  return true;
}

setMap(levels[level]);
