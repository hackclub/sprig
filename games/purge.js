/*
@title: purge
@author: noviicee
@tags: ['puzzle']
@addedOn: 2022-09-08

Instructions:

Cover the purple with green.

Use w, a, s, d to move around and j to restart the level.

*/

const player = "g";
const box = "b";
const goal = "p";
const wall = "w";

setLegend(
  [ player, bitmap`
................
................
................
.......5........
.......0........
..00000000000...
..0.........0...
..0..0...0..0...
..0.........0...
..0...000...0...
..0.........0...
..00000000000...
................
................
................
................`],
  [ box, bitmap`
................
................
................
...444444444....
...4...4...4....
...4...4...4....
...444444444....
...444444444....
...444444444....
...4...4...4....
...4...4...4....
...444444444....
................
................
................
................`],
  [ goal, bitmap`
................
................
................
....888888......
...88....88.....
...8......8.....
...8.......8....
...8.......8....
...8.......8....
...88......8....
....8......8....
....88....88....
.....888888.....
................
................
................`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`]
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

onInput("s", () => {
  let players = getAll(player);
  for (let i of players) {
    i.y += 1;
  }
});
onInput("d", () => {
  let players = getAll(player);
  for (let i of players) {
    i.x += 1;
  }
});
onInput("w", () => {
  let players = getAll(player);
  for (let i of players) {
    i.y -= 1;
  }
});
onInput("a", () => {
  let players = getAll(player);
  for (let i of players) {
    i.x -= 1;
  }
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
