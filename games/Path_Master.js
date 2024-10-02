/*
@title: Path Master
@author: Mir Muhammad Abidul Haq (Ahnaf)
@tags: ['puzzle']
@addedOn: 2024-07-08

Instructions:

Hit "run" to execute the code and
start the game (you can also press shift+enter).

In this game, enemies slide back and forth and up and down.
The enemy will stop moving if you go near the enemy.
Although, if you go with an object and the enemy catches the object, the object will be gone and you have to restart the level.

Press j to reset the current level.
*/
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const obstacle = "o";
const Portal1 = "x";
const bluePortal = 'y';
const key = "k";
const lock = "l";

setLegend(
  [player, bitmap`
.......0.0......
......0...0.....
.....0000000....
....0.......0...
....0.00.00.0...
....0..3..5.0...
.0000.......000.
.0..0...66..0.0.
.0H.0.......0.0H
....0.......0...
....0.......0...
....00.....00...
.....0000000....
......0...0.....
......0C..0C....
................`],
  [obstacle, bitmap`
................
................
..0000000000....
.00........00...
0........0..00..
0.000..0000..0..
0.0.0..0..0..0..
0.000..0000..0..
0............0..
0...........00..
.00.00000..00...
..0.00..0.00....
..0..0000.0.....
...0....000.....
...000000.......
................`],
  [box, bitmap`
................
................
................
...222222222222.
...233332DDDD22.
..2233332DDDD22.
..2233332DDDD22.
..2233332DDDD22.
..2222222222222.
..2266662555522.
..226666255552..
...26666255552..
...26666255552..
...222222222222.
................
................`],
  [goal, bitmap`
................
................
................
....CCCCCC......
...CCCCCCCC.....
...CCCCCCCC.....
...CCCCCCCC.....
...CCCCCC66.....
...CCCCCC66.....
...CCCCCCCC.....
...CCCCCCCC.....
...CCCCCCCC.....
....CCCCCC......
................
................
................`],
  [wall, bitmap`
D.DDDDDDD..DDD.D
D.D..D..DDDD.DD.
.DD..DD..DDDD.DD
DDDD.DDDD....D.D
D.DDDDDDDD..DD.D
D.DDDDDDDDDDD.DD
D.D..D....DD..D.
D.D..DDD.DDDD.D.
DD.DD.DDDD..D.DD
D.D.DDD..DD.D.D.
DDDDDDD.D.D.DDDD
.DDDD.DDDDDDDDDD
.DDDD..D....D.D.
.D..DDDDDDD.D.D.
.DDDDD...DD.D.DD
DDD...DDDDD..DDD`],
  [Portal1, bitmap`
................
................
................
...000....000...
...0H000000H0...
...0HHHHHHHH0...
...0HHHHHHHH0...
...0HHHHHHHH0...
...0HHHHHHHH0...
...0HHHHHHHH0...
...0HHHHHHHH0...
...0HHHHHHHH0...
....0HHHHHH0....
.....000000.....
................
................`],
  [bluePortal, bitmap `
................
................
..000.....000...
..05500000550...
..05555555550...
..05555555550...
..05555555550...
..05555555550...
..05555555550...
..05555555550...
..05555555550...
...055555550....
....0000000.....
................
................
................`],
  [key, bitmap`
................
................
.......000......
.......0........
.......0........
.......000......
.......0........
.......0........
.......0........
......0000......
.....0....0.....
.....0....0.....
.....0....0.....
......0000......
................
................`],
  [lock, bitmap`
................
................
................
.....000000.....
.....0....0.....
.....0....0.....
.....0....0.....
.00000000000000.
.0............0.
.0.....00.....0.
.0....0..0....0.
.0....0..0....0.
.0.....00.....0.
.0............0.
.00000000000000.
................`]
);

let level = 0;
const levels = [
  map`
wwwwwwwwww
w.......gw
w.b..b...w
w...ww...w
w.p.wg...w
wwwwwwwwww`,
  map`
wwwwwwwww
wy..w..kw
w.g...b.w
w.......w
w.wwwwwww
w.pwglbxw
w...w...w
wwwwwwwww`,
  map`
wwwwwwwwwww
wg....w..yw
wk....b...w
wgw..bwb..w
wbw...g...w
wlw..p...ww
w.w.....www
wxw....wwww
www...wwwww
wg...wwwwww
wwwwwwwwwww`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, box, wall, obstacle, lock]);

setPushables({
  [player]: [box],
  [box]: [box]
});

onInput("w", () => {
  getFirst(player).y -= 1;
});
onInput("s", () => {
  getFirst(player).y += 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});
onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const targetNumber = tilesWith(goal).length;
  const keysTaken = tilesWith(player, key);
  const numberCovered = tilesWith(goal, box).length;
  const pPortalsCovered = tilesWith(player, Portal1);
  const bluePortalsCovered = tilesWith(player, bluePortal);

  if (pPortalsCovered.length >= 1) {
    const bp = getFirst(bluePortal);
    const pl = getFirst(player);

    pl.x = bp.x;
    pl.y = bp.y;
  }

  if (bluePortalsCovered.length >= 1) {
    const rp = getFirst(Portal1);
    const pl = getFirst(player);
    pl.x = rp.x;
    pl.y = rp.y;
  }
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("Nah, You Won!", { y: 1, color: color`3` });
    }
  }
  if (keysTaken.length >= 1) {
    getFirst(lock).remove();
    getFirst(key).remove();
  }
});

function checkForPlayer(x, y) {
  let result = false
  getTile(x, y).map((tile) => {
    if (tile.type == player || tile.type == obstacle)
      result = true
  })
  return result // this function returns true only if there is a player at (x,y)
}

let up = false

setInterval(() => {
  if (level == 0) { // run different code depending on the level
    if (up) {
      if (!(checkForPlayer(2, 3) || checkForPlayer(3, 3) || checkForPlayer(6, 4))) {
        clearTile(1, 3)
        clearTile(3, 2)
        clearTile(6, 3)
        addSprite(2, 3, obstacle)
        addSprite(3, 3, obstacle)
        addSprite(6, 4, obstacle)
        up = false
      }
    } else {
      if (!(checkForPlayer(1, 3) || checkForPlayer(3, 2) || checkForPlayer(6, 3))) {
        clearTile(2, 3)
        clearTile(3, 3)
        clearTile(6, 4)
        addSprite(1, 3, obstacle)
        addSprite(3, 2, obstacle)
        addSprite(6, 3, obstacle)
        up = true
      }
    }
  } else if (level == 1) {
    if (up) {
      if (!(checkForPlayer(4, 2))) {
        clearTile(4, 3)
        addSprite(4, 2, obstacle)
        up = false
      }
    } else {
      if (!(checkForPlayer(4, 3))) {
        clearTile(4, 2)
        addSprite(4, 3, obstacle)
        up = true
      }
    }
  } else if (level == 2) {
    if (up) {
      if (!(checkForPlayer(2, 2))) {
        clearTile(2, 1)
        addSprite(2, 2, obstacle)
        up = false
      }
    } else {
      if (!(checkForPlayer(2, 1))) {
        clearTile(2, 2)
        addSprite(2, 1, obstacle)
        up = true
      }
    }
  }
}, 500)
