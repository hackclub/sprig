/*
@title: Sussy Among Us
@author: doggo_74
@tags: []
@addedOn: 2022-07-26

Push the boxes to the designated zone- but don't get stuck!!!
*/

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
................
.....3333333....
....335555555...
...33555555555..
.3333555555555..
.333335555555...
.333333333333...
.333333333333...
.333333333333...
.333333333333...
...3333333333...
...3333..3333...
...3333..3333...
....33....33....
................`],
  [ box, bitmap`
................
................
................
...LLLLLLLLLLL..
...LLFFFFFFFLL..
...LFL1L1L1LFL..
...LFL1L1L1LFL..
...LFL1L1L1LFL..
...LFL1L1L1LFL..
...LFL1L1L1LFL..
...LFL1L1L1LFL..
...LFL1L1L1LFL..
...LLFFFFFFFLL..
...LLLLLLLLLLL..
................
................`],
  [ goal, bitmap`
................
................
................
...66666666666..
...66006006006..
...60600600606..
...60060060066..
...66006006006..
...60600600606..
...60060060066..
...66006006006..
...60600600606..
...60060060066..
...66666666666..
................
................`],
  [ wall, bitmap`
..LLLLLLLLLLLL..
.LLLLLLLLLLLLLL.
LL1LLLLLLLLLL1LL
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
LL1LLLLLLLLLL1LL
.LLLLLLLLLLLLLL.
..LLLLLLLLLLLL..`]
);

// create game levels
let level = 1; // this tracks the level we are on
const levels = [
  map`
..p.
.b.g
....`,
  map`
p..
.b.
..g`,
  map`
p.wg
.b..
....
..w.`,
  map`
p...
.wwb
.ww.
...g`,
  map`
www
ppp
www`,
  map`
p.w.
.bwg
....
..bg`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box]
});

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});
// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("viCtoRy", { y: 4, color: color`5` });
    }
  }
});
