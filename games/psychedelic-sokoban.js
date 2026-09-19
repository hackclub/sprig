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
const trail = "t";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
......C....CC...
.....CC....C....
...00CC...CC....
...0000000000...
...0066666660...
....066066600...
....060766070...
....066666660...
....066606660...
....060030060...
....066666660...
....000000000...
................
................
................`],
  [ box, bitmap`
................
................
................
...CLLCC3CCCCC..
...CLLCC3CCCCC..
...CCC3C3CCCCC..
...CCC333C3CCC..
...CCCCC333CCC..
...33333333333..
...CCC33333CCC..
...CC33C3C33CC..
...CCCCC3CCCCC..
...CCCCC3CCCF6..
...CCCCC3CCC66..
................
................`],
  [ goal, bitmap`
................
......3333......
....333FF333....
...33HHFFFF3F...
..33HHHHH4FF3...
..33HHHHH94F3F..
..33HHHHH99F33..
..3FHHH9999FF3..
.33FHHH9999FF3..
.33FF999999F33..
..39FF9999FF3...
..33333FFFFF3...
.....43333433...
..........3.....
................
................`],
  [ wall, bitmap`
CCCCCCCCCCCCCCCC
C1111CCCC000CCCC
C000000000LL00CC
C00CCCCC00LLLLCC
C00CCCCC00LL00CC
CCCCCCCCC00000CC
CCCCCCCCCC0000CC
CL0LLLLL0000CCCC
CLLLL00000CCCCCC
C00000CCCCC000CC
C0CC0LLLLLLLC0CC
C0CCCLLLLLLLCC0C
C0000000000CCCCC
C111100000CCCCCC
CC111110C00CCCCC
CCCCCCCCCCCCCCCC`],
  [ trail, bitmap`
................
................
................
................
................
................
................
444488FFHHHCCCCC
8888FFCCCCCHH333
................
................
................
................
................
................
................`],
);





//sfx
const backgroundTune = tune`
152.28426395939087: B4~152.28426395939087 + F4^152.28426395939087,
152.28426395939087: F4^152.28426395939087,
152.28426395939087: B4~152.28426395939087 + F4^152.28426395939087,
152.28426395939087: F4^152.28426395939087,
152.28426395939087: B4~152.28426395939087 + F4^152.28426395939087,
152.28426395939087: F4^152.28426395939087,
152.28426395939087: B4~152.28426395939087 + F4^152.28426395939087,
152.28426395939087: F4^152.28426395939087,
152.28426395939087: B4~152.28426395939087 + F4^152.28426395939087,
152.28426395939087: F4^152.28426395939087,
152.28426395939087: B4~152.28426395939087 + F4^152.28426395939087,
152.28426395939087: F4^152.28426395939087,
152.28426395939087: B4~152.28426395939087,
152.28426395939087: B4~152.28426395939087,
152.28426395939087: B4~152.28426395939087 + F4^152.28426395939087,
152.28426395939087: B4~152.28426395939087,
152.28426395939087: B4~152.28426395939087 + F4^152.28426395939087,
152.28426395939087: F4^152.28426395939087,
152.28426395939087: B4~152.28426395939087 + F4^152.28426395939087,
152.28426395939087: F4^152.28426395939087,
152.28426395939087: B4~152.28426395939087 + F4^152.28426395939087,
152.28426395939087: F4^152.28426395939087,
152.28426395939087: B4~152.28426395939087 + F4^152.28426395939087,
152.28426395939087: F4^152.28426395939087,
152.28426395939087: B4~152.28426395939087 + F4^152.28426395939087,
152.28426395939087: F4^152.28426395939087,
152.28426395939087: B4~152.28426395939087,
152.28426395939087: B4~152.28426395939087,
152.28426395939087: B4~152.28426395939087 + F4^152.28426395939087,
152.28426395939087: B4~152.28426395939087,
152.28426395939087: B4~152.28426395939087 + F4^152.28426395939087,
152.28426395939087: F4^152.28426395939087`;

const playback = playTune(backgroundTune, Infinity);
playTune(backgroundTune);

const wTune = tune`
500: C5/500 + B5/500 + G5/500 + G4/500 + D4/500,
15500`;

const newTune = tune`...`;


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
  getFirst(player).y -= 1; // positive y is downwards
  playTune(wTune);
});

onInput("a", () => {
  getFirst(player).x -= 1; // positive y is downwards
  playTune(wTune);
});

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
  playTune(wTune);
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(wTune);
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
      addText("you won ig!", { y: 4, color: color`3` });
    }
  }
});