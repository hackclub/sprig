/*
@title: sokoban
@author: leo

Instructions:

Cover the green with purple.

Use w, a, s, d to move around and j to restart the level.

*/

const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
......33........
.....33333......
.....C606.......
....CC60666.....
....C666C666....
....C66CCCC6....
....CC66666.....
....335353......
...333535333....
...633656336....
....65555566....
....5555555.....
....555.555.....
....CC...CC.....
...CCC...CCC....
................`],
  [ box, bitmap`
................
................
...0000000000...
...0966666690...
...0662222660...
...0666662660...
...0666222660...
...0666266660...
...0666666660...
...0666266660...
...0966666690...
...0000000000...
................
................
................
................`],
  [ goal, bitmap`
................
......9999......
......9999......
.......11888888.
.......118688688
.......118666688
.......118666688
.......11888888.
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
......CCCC......
......CCCC......
......CCCC......`],
  [ wall, bitmap`
CCCCCCCLCCCCCCCC
CCCCCCCLCCCCCCCC
CCCCCCCLCCCCCCCC
CCCCCCCLCCCCCCCC
LLLLLLLLLLLLLLLL
CCCLCCCCCCCLCCCC
CCCLCCCCCCCLCCCC
CCCLCCCCCCCLCCCC
CCCLCCCCCCCLCCCC
LLLLLLLLLLLLLLLL
CCCCCCCLCCCCCCCC
CCCCCCCLCCCCCCCC
CCCCCCCLCCCCCCCC
CCCCCCCLCCCCCCCC
LLLLLLLLLLLLLLLL
CCCLCCCCCCCLCCCC`],
);

let level = 0;
const levels = [
  map`
pw..
.wb.
.w..
.wg.`,
  map`
wpw.
.w..
wwww
g.b.`,
  map`
pwg..
w.w.w
w.b..
w.w.w`,
  map`
pw.w.ww.bg
wwwwwwwwww
w.w..ww.wg
.bwwwwwww.
...w.w.ww.
.wwwww.b..
gwwwwwww..`
];

const currentLevel = levels[level];
setMap(currentLevel);

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

onInput("l", () => {
  getFirst(player).x += 2;
});

onInput("j", () => {
  getFirst(player).x -= 2;
});

onInput("k", () => {
  getFirst(player).y += 2;
});

onInput("i", () => {
  getFirst(player).y -= 2;
});


setSolids([ player, box, wall ]);

setPushables({
  [ player ]: [ box ]
});

afterInput(() => {
  const numberCovered = tilesWith(goal, box).length;
  const targetNumber = tilesWith(goal).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
