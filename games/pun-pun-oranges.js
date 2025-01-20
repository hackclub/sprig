/*
@title: getting_started
@author: leo, edits
@tags: ['tutorial']
@addedOn: 2022-07-26

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// Create a tune:
const arriba = tune`
500,
500: B4~500,
15000`;
const abajo = tune`
500,
500: G5^500,
15000`;
const izquierda = tune`
500,
500: G5-500,
15000;`;
const derecha = tune`
500,
500: D5/500,
15000`;

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
......000.......
.....00.00......
....00...0......
....0....0......
....0.0.00......
....0....0......
...00....00.....
...0.......0....
...0....00000...
...0....0.0000..
...0....0...00..
...000000.......
.....0.0........
.....0.0........
.....0.0........
.....0000.......`], 
  [ box, bitmap`
................
................
........DD......
........DDDDDD..
.......9999DD...
.....99999999...
....999999999...
....999999999...
....999999999...
....999999999...
....99999999....
.....9999999....
.......9999.....
................
................
................`],
  [ goal, bitmap`
................
................
................
.CC.........C...
CCCC.......C.CC.
CC..CC....CCCC..
.CCCCCCCCCCCC...
..CCCCC.CCCCC...
..C.C.444C.CC...
..CCCC999CCCC...
..C.C.999CCCC...
..C.CC999CC.C...
..CCCCCCCCCCC...
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
.bw.
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
  [player]: [box],
  [box]: [box]
});

// inputs for player movement control
onInput("w", () => {
  getFirst(player).y -= 1;
  playTune(arriba);
});

onInput("a", () => {
  getFirst(player).x -= 1;
    playTune(izquierda);
});

onInput("s", () => {
  getFirst(player).y += 1;
    playTune(abajo);
});

onInput("d", () => {
  getFirst(player).x += 1;
    playTune(derecha);
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
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
