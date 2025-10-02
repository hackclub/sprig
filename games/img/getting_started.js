/*
@title: getting_started
@description: "Getting Started" is a tutorial game that guides players through basic game mechanics.
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
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
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
p.wg
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

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
    [player]: [ box ],
    [box]: [ box ]
});

// inputs for player movement control
onInput("w", () => {
    getFirst(player).y -= 1;
    playTune(myTune);
});

onInput("a", () => {
    getFirst(player).x -= 1;
    playTune(myTune);
});

onInput("s", () => {
    getFirst(player).y += 1; // positive y is downwards
    playTune(myTune);
});

onInput("d", () => {
    getFirst(player).x += 1;
    playTune(myTune);
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
const myTune = tune`
1451.6129032258063,
241.93548387096774: D5~241.93548387096774,
241.93548387096774: A4~241.93548387096774 + G4~241.93548387096774 + G5~241.93548387096774,
241.93548387096774: D4~241.93548387096774,
241.93548387096774: A5~241.93548387096774,
241.93548387096774: F4~241.93548387096774,
483.8709677419355,
241.93548387096774: A5~241.93548387096774,
241.93548387096774: B4~241.93548387096774 + F4~241.93548387096774,
241.93548387096774: E5~241.93548387096774 + G5~241.93548387096774,
241.93548387096774: A4~241.93548387096774,
241.93548387096774: D4~241.93548387096774 + G4~241.93548387096774 + B5~241.93548387096774,
241.93548387096774,
241.93548387096774: F5~241.93548387096774,
241.93548387096774: D5~241.93548387096774,
725.8064516129032,
241.93548387096774: E4~241.93548387096774 + G4~241.93548387096774 + C5~241.93548387096774,
241.93548387096774: D5~241.93548387096774 + A4~241.93548387096774,
241.93548387096774,
241.93548387096774: D5~241.93548387096774,
241.93548387096774: F5~241.93548387096774,
241.93548387096774: D4~241.93548387096774,
483.8709677419355`;
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
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
