/*
@title: sokoban
@author: leo
@tags: ['puzzle']
@addedOn: 2022-07-18

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
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.0.0..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................`],
  [ box, bitmap`
................
................
................
...888888888....
...8...8...8....
...8...8...8....
...8...8...8....
...8...8...8....
...888888888....
...8...8...8....
...8...8...8....
...888888888....
................
................
................
................`],
  [ goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................`],
  [ wall, bitmap`
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

let level = 0;
const levels = [
  map`
p.w.
.bwg
....
....`,
  map`
....g
.bbww
w....
g...p`,
  map`
p.w.
.bwg
....
..bg`,
  map`
..w
..w
gbg
.b.
.w.
bw.
g.p`
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

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
  }
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
