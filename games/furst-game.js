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
const myTune = tune`
294.11764705882354,
294.11764705882354: E4^294.11764705882354,
294.11764705882354,
294.11764705882354: B4/294.11764705882354,
294.11764705882354: E4^294.11764705882354 + E5/294.11764705882354 + G4/294.11764705882354,
294.11764705882354: D5^294.11764705882354,
294.11764705882354: D4^294.11764705882354 + G4^294.11764705882354,
294.11764705882354: D5^294.11764705882354 + F4/294.11764705882354 + A5/294.11764705882354,
294.11764705882354: A4^294.11764705882354 + D5/294.11764705882354,
294.11764705882354: E4/294.11764705882354 + D5^294.11764705882354 + A4/294.11764705882354,
294.11764705882354: C5^294.11764705882354 + E4^294.11764705882354,
294.11764705882354: D5^294.11764705882354 + G5^294.11764705882354 + E4/294.11764705882354,
294.11764705882354: D5^294.11764705882354 + E4^294.11764705882354,
294.11764705882354: G4^294.11764705882354 + A4^294.11764705882354,
294.11764705882354: D4^294.11764705882354 + E5^294.11764705882354 + F4/294.11764705882354,
294.11764705882354: D5^294.11764705882354 + A4^294.11764705882354 + F5^294.11764705882354 + F4/294.11764705882354,
294.11764705882354: E4^294.11764705882354,
294.11764705882354: A4/294.11764705882354,
294.11764705882354: G4^294.11764705882354 + E4^294.11764705882354 + C5/294.11764705882354,
294.11764705882354: E4/294.11764705882354 + F4/294.11764705882354,
294.11764705882354: C4^294.11764705882354 + E5^294.11764705882354 + C5/294.11764705882354,
294.11764705882354: D5^294.11764705882354,
294.11764705882354: A4^294.11764705882354 + D4/294.11764705882354 + C5/294.11764705882354,
294.11764705882354: D5^294.11764705882354 + C5/294.11764705882354,
294.11764705882354: E5^294.11764705882354 + G4/294.11764705882354,
294.11764705882354: E4^294.11764705882354 + C4^294.11764705882354 + C5/294.11764705882354,
294.11764705882354: B4^294.11764705882354 + G4/294.11764705882354,
294.11764705882354: A4^294.11764705882354,
294.11764705882354: E5^294.11764705882354 + G4/294.11764705882354 + D5/294.11764705882354,
294.11764705882354: E4^294.11764705882354 + D5/294.11764705882354,
294.11764705882354: G4^294.11764705882354 + E4^294.11764705882354,
294.11764705882354`;

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
................
.....0000000....
....0.......0...
...0.........0..
...0.000.000.0..
...0.000.000.0..
...0.........0..
....0.......0...
.....00...00....
......00000.....
......0.0.0.....
......0.0.0.....
................
................
................`],
  [ box, bitmap`
................
................
................
................
.3........C.....
.333.....CCCC...
.3333....CCCCC..
.66666666CCCCCC.
.3333....CCCCCC.
.333.....CCCC...
.3........C.....
................
................
................
................
................`],
  [ goal, bitmap`
3333333333333333
3..............3
3.333333333333.3
3.3..........3.3
3.3.33333333.3.3
3.3.3......3.3.3
3.3.3.3333.3.3.3
3.3.3.3003.3.3.3
3.3.3.3003.3.3.3
3.3.3.3333.3.3.3
3.3.3......3.3.3
3.3.33333333.3.3
3.3..........3.3
3.333333333333.3
3..............3
3333333333333333`],
  [ wall, bitmap`
0000000000000000
0000000000000000
000.000.00000.00
0000000000000000
0000.00000.00000
00.000000.000000
0000000000000000
000..0.00000.000
0000000000000000
0000000000.00.00
00000000.0000000
000000.000000000
000.000000000000
00000000..000000
000.0000.0000000
0000000000000000`]
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
p......
.b.....
.......
.......
.......
......g`,
  map`
wwwwww
ww...w
w.pw.w
ww.b.w
www.gw
wwwwww`,
  map`
....
....
p.wg
.bww
..ww
wwww`,
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
.pw...g
.bw..ww
..w..bg
..w..ww
..w..bg
..w..ww
..w..bg
..w..ww
..w..bg
.....ww
.....bg`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: []
});

setPushables({
    [player]: [ box ]
});

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
