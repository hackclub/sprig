/*
@title: getting_started
@author: leo, edits
@tags: ['tutorial']
@addedOn: 2022-07-26

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
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
....00000000....
...0000000000...
..000000000000..
.00022000022000.
.00022000022000.
.00000000000000.
.00000000000000.
.00000000000000.
.00022222222000.
.00022222222000.
.00002333320000.
..000000000000..
...0000000000...
....00000000....
................`],
  [ box, bitmap`
................
................
................
...DDDDDDDDDDD..
...DDDDDDDDDDD..
...DDDDDDDDDDD..
...DDDDDDDDDDD..
...DDDDDDDDDDD..
...DDDDDDDDDDD..
...DDDDDDDDDDD..
...DDDDDDDDDDD..
...DDDDDDDDDDD..
...DDDDDDDDDDD..
...DDDDDDDDDDD..
................
................`],
  [ goal, bitmap`
................
................
................
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
................
................
................`],
  [ wall, bitmap`
0000000000000000
0CCCCC2CCCCCCCC0
0CCCCC2CCCCCCCC0
0CCCCC2CCCCCCCC0
0222222222222220
0CCCCCCCCCC2CCC0
0CCCCCCCCCC2CCC0
0CCCCCCCCCC2CCC0
0222222222222220
0CCC2CCCCCCCCCC0
0CCC2CCCCCCCCCC0
0CCC2CCCCCCCCCC0
0222222222222220
0CCCCCCCCC2CCCC0
0CCCCCCCCC2CCCC0
0000000000000000`]
);

// create game levels
let level = 0; // this tracks the level we are on
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
p..g
.b..
....
....`,
  map`
p...
...b
...b
.bbg`,
  map`
...
.p.
...`,
  map`
p.w.
.bwg
....
..bg`
];

// Create a tune:
const melody = tune`
386.2660944206009,
128.75536480686696: F5~128.75536480686696 + E5~128.75536480686696 + D5~128.75536480686696 + C5^128.75536480686696 + B4^128.75536480686696,
3605.150214592275`


// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [box]: [box]
});

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
  playTune(melody);
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(melody);
});

onInput("w", () => {
  getFirst(player).y -= 1; // positive y is downwards
  playTune(melody);
});

onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(melody);
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
      addText("you win!", { y: 4, color: color`7` });
    }
  }
});
