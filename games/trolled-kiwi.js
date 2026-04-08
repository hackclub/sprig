/*
@title: kiwi
@description: "kiwi" is a puzzle game where you guide a kiwi, and help it push a coquette box into the void
@author: shaheeraazfar07-blip
@tags: ['']
@addedOn: 2026-03-09

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const bg = "o";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
................
................
....CCCCC9CCC...
...CCDDDDDDDCC..
...CD4444444DC..
...9D4044404D9..
..0CD4044404DC0.
.0.CD8432348DC.0
.0.CD4444444DC.0
...CD4444444DC..
...CCDDDDDDDCC..
....CCC9CCCCC...
.....0.....0....
.....0.....0....
................`],
  [ box, bitmap`
................
................
................
................
..33333333333...
..33333333333...
..33888388833...
..33833833833...
..33833833833...
..33888388833...
..33338383333...
..33383338333...
..33833333833...
..33333333333...
................
................`],
  [ goal, bitmap`
................
................
..HHHHHHHHHHHH..
..H0000000000H..
..H0000000000H..
..H0000000000H..
..H0000000000H..
..H0000000000H..
..H0000000000H..
..H0000000000H..
..H0000000000H..
..H0000000000H..
..H0000000000H..
..HHHHHHHHHHHH..
................
................`],
  [ wall, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
  [ bg, bitmap`
777777777777777C
787878787878787C
777777777777777C
787777777777787C
777777777777777C
787777777777787C
777777777777777C
787777777777787C
777777777777777C
787777777777787C
777777777777777C
787777777777787C
777777777777777C
787878787878787C
777777777777777C
CCCCCCCCCCCCCCCC`]
);

setBackground(bg);

// Create a tune:
const melody = tune`
500: F5^500,
500: D5-500 + E5^500,
500: E5-500 + D5^500 + F5^500,
500: E5-500 + F5^500,
500: E5^500,
500: E5-500 + D5^500,
500: D5/500,
500: D5^500 + C5~500,
500: D5/500,
500: D5/500,
500: C5~500,
500: C5^500,
500: C5~500,
500: C5^500,
500: B4^500 + A4~500,
500: B4^500,
500: B4^500 + C5~500,
500: A4-500,
500: A4^500,
500: A4-500,
500: B4/500 + C5^500 + D5/500,
500: D5^500 + B4~500 + A4~500,
500: D5/500,
500: D5/500,
500: C5^500,
500: B4~500,
500: G5^500 + B4^500 + C5-500 + D5-500,
500: A5^500 + B4^500 + E5~500,
500: C5^500 + F5~500,
500: D5^500,
500: E5^500 + F5-500,
500: E5^500`
// Play it:
playTune(melody)

// Play it 5 times:
playTune(melody, 5)

// Play it until the heat death of the universe:
const playback = playTune(melody, Infinity)

// Or make it shut up early:
playback.end()

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
.bw.
..w.
w...`,
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

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("w", () => {
  getFirst(player).y -= 1; // negative y is upwards
});

onInput("d", () => {
  getFirst(player).x += 1;
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
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
