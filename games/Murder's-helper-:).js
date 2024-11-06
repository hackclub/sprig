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
................
................
....00000000....
....00F00000....
....00FF0000....
....020FF000....
..0.0202FF00.0..
.00002222FF0000.
..0.002002F0.0..
....000000000...
...0000000000...
...0000...000...
................
................
................`],
  [ box, bitmap`
................
................
......FFFFF.....
...00000000000..
...0CCCC0CCCC0..
...0CCCC0CCCC0..
...0CCCC0CCCC0..
...0CCCC0CCCC0..
...00000000000..
...0CCCC0CCCC0..
...0CCCC0CCCC0..
...0CCCC0CCCC0..
...0CCCC0CCCC0..
...00000000000..
................
................`],
  [ goal, bitmap`
................
................
................
................
................
................
.........000....
.........00000..
.........000.00.
...........3300.
.........330000.
.........333330.
................
................
................
................`],
  [ wall, bitmap`
0000000000000000
0003333333333000
0333333333333330
0333333333333330
0333333330003330
0333333300L03330
033333000L103330
0333300LL1003330
0333000LLL033330
0330000L00033330
0300000033333330
0330033333333330
0333333333333330
0333333333333330
0003333333333000
0000000000000000`],

);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
wwww
pb.g
wwww`,
  map`
..w
pbw
wg.`,
  map`
.pwg
.b..
ww..
wwww`,
  map`
p...
ww.b
wwwb
wbbg`,
  map`
ppp
ppp
ppp`,
  map`
wpww
w.wg
..b.
.b.g`,
  map`
wwwwwpwwwwww
wwwww.wwwwww
wwww.b.wwwww
www....ww.gw
g..b...b....
w.ww..w.b..g
gb..b.w..b..
..b....w..bg
..g..g..wgww`,
  map`
wpw
wbw
w.w
wgw`,
  map`
wwww
p.bg
wwww`,
  map`
ww..w
w..bw
p...g
ww.b.
ww..g`,
  map`
....
p...
..b.
...g`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [box]:[box]
});

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("w", () => {
  getFirst(player).y += -1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x += -1;
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
      addText("Are you happy?", { y: 4, color: color`3` });
    }
  }
});
