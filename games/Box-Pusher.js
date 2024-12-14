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
const floor = "f";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
................
.....CC.........
.....C..........
....CCC.........
....666.........
...66666........
...60606........
...66066........
...60006........
...66666........
....66666.......
....66666.......
....66666.......
......666.......
.......66.......`],
  [ box, bitmap`
................
................
................
....H.......H...
.....HH000HH....
.....H05050H....
.....0550550....
.....0000000....
.....0550550....
.....H05050H....
.....HH000HH....
....H.......H...
................
................
................
................`],
  [ goal, bitmap`
77..33333333..77
7773333333333777
.73333333333337.
.33000000000033.
3330055555500333
3330555555550333
3330555555550333
3330555555550333
3330555555550333
3330555555550333
3330555555550333
3330055555500333
.33000000000033.
.73333333333337.
7773333333333777
77..33333333..77`],
  [ wall, bitmap`
LLLLL11111111111
LLLLL1111CC11111
LLLLL11111111111
LLLLLCCCCCCCC111
LLLCCCCCCCCCCCC1
LLLCCCCCCCCCCCC1
LLLCCCCCCCCCCCC1
LLLCCCCCCCCCCCC1
LLLCCCCCCCCCCCC1
LLLLLCCCCCCCC111
LCCCCCCCCCCCCC11
LCCCCCCCCCCCCC11
LLLLLLLLLL111111
LLCCCCCCLL111111
LLCCCCCCLL11CC11
LLCCCCCCLL111111`],
  [ floor, bitmap`
0000000000000000
0000000000000000
4000C00000000000
0000000040000000
0000040000040000
0000000000040000
0000000000000000
0000000000040000
0000000C00000C00
0000000000000000
C000040000000004
0000000000000000
0000000000000000
0000040004000000
00000000C0000000
0000000000000000`],

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
p.w...
.bw.g.
......
..w...`,
  map`
p.....
g..b..
...b.g
.bbg..
......
.g....`,
  map`
...
.p.
...`,
  map`
...wg...
.p.w..b.
b.b..w..
.....w..
...b.w..
g..wgw.g`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);
setBackground(floor); // Apply the floor tile as the background

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box]
});

// inputs for player movement control
onInput("s", () => {
  const playerTile = getFirst(player);
  if (canMoveTo(playerTile.x, playerTile.y + 1)) {
    playerTile.y += 1; // move down
  }
});

onInput("d", () => {
  const playerTile = getFirst(player);
  if (canMoveTo(playerTile.x + 1, playerTile.y)) {
    playerTile.x += 1; // move right
  }
});

onInput("w", () => {
  const playerTile = getFirst(player);
  if (canMoveTo(playerTile.x, playerTile.y - 1)) {
    playerTile.y -= 1; // move up
  }
});

onInput("a", () => {
  const playerTile = getFirst(player);
  if (canMoveTo(playerTile.x - 1, playerTile.y)) {
    playerTile.x -= 1; // move left
  }
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

// check if the player can move to a specific tile
function canMoveTo(x, y) {
  const targetTile = getTile(x, y);
  return targetTile !== wall && targetTile !== undefined;
}

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
