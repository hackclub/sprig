/*
@title: Push A Block
@description: Push the block to get to the "goal" thing
@author: leo, edits
@tags: ['push']
@addedOn: 2026-05-15

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
..77227..23223..
1227227722332221
1227772233323221
1112272233223111
...2222222222...
...1111111111...
..882288882288..
..820228822028..
..82H028820H28..
..882288882288..
..H8880880888H..
..HH83300338HH..
...H33C33C33H...
...C33C33C33C...
..99C33HH33C99..
.CCCCC....CCCCC.`],
  [ box, bitmap`
....00000000....
...0022222200...
..033022220770..
.03333022077770.
0033333007777700
0203333377777020
0220333007770220
0222030220702220
0222070220302220
0220777003330220
0207777733333020
0077777003333300
.07777022033330.
..077022220330..
...0022222200...
....00000000....`],
  [ goal, bitmap`
................
................
......C.........
.......C.444....
........CDD4....
........C444....
.....233333.....
....23333333....
...2333333333...
...3333333333...
...3333332333...
...3333332333...
...3332223333...
...CC333333CC...
....CC3333CC....
.....CCCCCC.....`],
  [ wall, bitmap`
0..........0....
00..0....00...00
.0.....00..000..
..0...000000000.
..00000.00000...
...00000000000..
0000000....00000
.000000000000...
000000000000....
.....0..0000....
.....00000....0.
...00.00000.00..
...00000...0....
......00..0.....
.......0.0......
.......00.......`]
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
p...`,
  map`
pw..
.wwb
.w.b
.b.g`,
  map`
w.pw..p
.w..b..
.pw.w..
p.w....
.g..w..
.w.....
ww....p`,
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
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
