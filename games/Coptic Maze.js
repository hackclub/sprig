/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Coptic Maze
@author: Salt and Light
@tags: []
@addedOn: 2025-00-00
*/

// 1. fix background
const player = "p"
const traps = "t"
const goal = "g"
const key = "k"
const lock = "l"
const box = "j"
const wall = "w"
const redPortal = "q"
const bluePortal = "e"
const bg = "a"
setLegend(
  [player, bitmap`
....0000000000..
....0666666660..
....0666666660..
....0666666660..
....0666666660..
....0666666660..
....0666666660..
....0026666200..
....0666036660..
....0000000000..
.....03222F0....
.....0F22230....
...00033F3F000..
.....0F22230....
.....0000000....
.......0.0......`],
  [traps, bitmap`
................
................
....00000000....
...00FFFFFF00...
...0FFFFFFFF0...
..00FFFFFFFF00..
..040000000040..
..044444444440..
..033633363330..
..0C66666666C0..
..0CCCCCCCCCC0..
..000000000000..
...0FFFFFFFF0...
...0000000000...
................
................`],
  [goal, bitmap`
................
..0000000000000.
..0CCCCCCC020C0.
..0CCCCCCC020C0.
..0CCC6CCC020C0.
..0CCC6CCC020C0.
..0C66666C020C0.
..0CCC6CCC020C0.
..0CCC6CCC020C0.
..0CCC6CCC020C0.
..0CCC6CCC020C0.
..0CCC6CCC020C0.
..0CCCCCCC020C0.
..0CCCCCCC020C0.
..0000000000000.
................`],
  [key, bitmap`
......000.......
.....00C00......
.....0CCC0......
...0000C0000....
..00C00C00C00...
..0CCCCCCCCC0...
..00C00C00C00...
...0000C0000....
......0C0.......
......0C0.......
......0C0.......
......0C0.......
.....00C00......
.....0CCC0......
.....00C00......
......000.......`],
  [lock, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCC0CCCCCCCC
CCCCCC000CCCCCCC
CCCCCCC0CCCCCCCC
CCCC0CC0CC0CCCCC
CCC000000000CCCC
CCCC0CC0CC0CCCCC
CCCCCCC0CCCCCCCC
CCCCCCC0CCCCCCCC
CCCCCCC0CCCCCCCC
CCCCCCC0CCCCCCCC
CCCCCCC0CCCCCCCC
CCCCCCC0CCCCCCCC
CCCCCC000CCCCCCC
CCCCCCC0CCCCCCCC
CCCCCCCCCCCCCCCC`],
  [box, bitmap`
................
.......000......
......00600.....
......06660.....
......00600.....
.......060......
.......000......
.......0C0......
.......0C0......
.......0C0......
.......0C0......
.......0C0......
.......0C0......
.......0C0......
.......0C0......
.......000......`],
  [wall, bitmap`
000000D000000000
0CCCCCDDCCCCCCC0
0CCCCDDDDCCCCCC0
0C000D00D000CCC0
0C08DD8HDDH0CCC0
0C0HD0HH0DH0CCC0
0C0000000DD0CCC0
0CC08H08H0DCCCC0
0CC0HH0HH0CCCCC0
0CC0000000CCCCC0
0CCCC08H0CCCCCC0
0CCCC0HH0CCCCCC0
0CCCC0000CCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000`],
  [redPortal, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0C000000000000C0
0C0333FFFF3330C0
0C0333F66F3330C0
0C0FFFF66FFFF0C0
0C0F66666666F0C0
0C0F66666666F0C0
0C0FFFF66FFFF0C0
0C0333F66F3330C0
0C0333F66F3330C0
0C0333F66F3330C0
0C0333F66F3330C0
0C0333F66F3330C0
0C0333FFFF3330C0
0C000000000000C0`],
  [bluePortal, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0C000000000000C0
0C033333333330C0
0C03333FF33330C0
0C03333FF33330C0
0C03FFFFFFFF30C0
0C03FFFFFFFF30C0
0C03333FF33330C0
0C03333FF33330C0
0C03333FF33330C0
0C03333FF33330C0
0C03333FF33330C0
0C03333FF33330C0
0C033333333330C0
0C000000000000C0`],
  [ bg, bitmap`
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
)

setBackground(bg)


let level = 0
const levels = [
  map`
pw...
.w.w.
.w.w.
.w.w.
...wg`,
  map`
p....
.....
.wlww
.w.we
qwgwk`,
  map`
...
.w.
.t.
.w.
.t.
.w.
.t.
.w.
.t.
pwg`,
  map`
wwwwwww
w.....w
w.www.w
w.wgw.w
w...w.w
wwwww.w
p.....w`,
  map`
wwwwwqwww
........e
.wwwwwwlw
......w.w
.wwww.w.w
....wkw.w
.ww.www.w
..w.wgw.w
.pw.t...w`,
  map`
wpw...wqw
w.w.w.w.w
w.w.w.wlw
w...w.w.w
wwwww.w.w
wk......w
wwwwwwwww
wej......
www.....g`, 
  map`
...
.p.
.g.`
]

setMap(levels[level])

setSolids([player, box, wall, lock ]);

setPushables({
  [player]: [box],
  [box]: [box]
});

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y += -1
})

onInput("a", () => {
  getFirst(player).x += -1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("j", () => {
  setMap(levels[level])
});

// these get run after every input
afterInput(() => {
  const goalsCovered = tilesWith(player, goal); // tiles that both contain the player and goal

  // if at least one goal is overlapping with a player, proceed to the next level
  if (goalsCovered.length >= 1) {
    // increase the current level number
    level = level + 1;

    // check if current level number is valid
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("ur empl*yed :3", { y: 4, color: color`9` });
    }
  }
});

afterInput(() => {
  const fireReset = tilesWith(player, traps); // tiles that both contain the player and goal

  // if at least one goal is overlapping with a player, proceed to the next level
  if (fireReset.length >= 1) {
    // increase the current level number
    setMap(levels[level])
  }
});

afterInput(() => {
  const goalsCovered = tilesWith(player, goal); // tiles that both contain the player and goal
  const keysTaken = tilesWith(player, key); // ADDED: all the keys that the player is on

  // there is one player, so if 1 or more tiles with both a goal and a player, next level
  if (goalsCovered.length >= 1) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {}
  }

  // ADDED: remove the lock and key if the key is picked up
  if (keysTaken.length >= 1) {
    getFirst(lock).remove();
    getFirst(key).remove();
  }

});

afterInput(() => {
  const redPortalsCovered = tilesWith(player, redPortal);
  const bluePortalsCovered = tilesWith(player, bluePortal);
  
  // ADDED: teleport the player to the blue portal if they are standing on the red one
  if (redPortalsCovered.length >= 1) {
    const bp = getFirst(bluePortal);
    const pl = getFirst(player);

    // teleport player to blue portal
    pl.x = bp.x;
    pl.y = bp.y;
  }

  // ADDED: teleport the player to the red portal if they are standing on the blue one
  if (bluePortalsCovered.length >= 1) {
    const rp = getFirst(redPortal);
    const pl = getFirst(player);

    // teleport player to blue portal
    pl.x = rp.x;
    pl.y = rp.y;
  }
  
  /* your other code */
    
});