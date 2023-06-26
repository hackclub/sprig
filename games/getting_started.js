/*
@title: getting_started
@author: leo, edits: samliu
*/

/*
 ______    _______  _______  ______     _______  __   __  ___   _______ 
|    _ |  |       ||   _   ||      |   |       ||  | |  ||   | |       |
|   | ||  |    ___||  |_|  ||  _    |  |_     _||  |_|  ||   | |  _____|
|   |_||_ |   |___ |       || | |   |    |   |  |       ||   | | |_____ 
|    __  ||    ___||       || |_|   |    |   |  |       ||   | |_____  |
|   |  | ||   |___ |   _   ||       |    |   |  |   _   ||   |  _____| |
|___|  |_||_______||__| |__||______|     |___|  |__| |__||___| |_______|

Welcome to Sprig!!!

Hit "run" to execute the code and
start the game (you can also press shift+enter)
Click the "Show Help" to discover your toolkit

The objective is to push the purple boxes onto the green goals
Press j to reset the current level

To solve each step, you'll have to edit the code
The code for this game starts below this comment (the brown text)

--- Step 1 ---
Add controls to move up and left, use "w" and "a" as inputs
 * Tip: Add 2 additional "onInput" functions

--- Step 2 ---
Make the purple blocks pushable
 * Tip: Edit "setPushables"

--- Step 3---
Add some new levels.
 * Tip: Make a new map in "levels"

--- Step 4 ---
Allow the player to push two or more boxes in a row
 * Tip: Allow boxes to push boxes

--- Step 5---
Add sound effects when you move.
 * Tip: Create a "tune" and use "playTune"

--- Step 6 ---
Solve the game you just created!

--- I'm done, now what? --- 
Make your own game! Try
 - adding two players
 - leaving a trail as you move
 - having different blocks and goal types
 - come up with your own mechanic!
*/

// START OF GAME CODE

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
p.bg`,
  map`
p..
.b.
..g`,
  map`
p.wg
.bw.
..w.
..w.`,
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

setSolids([ player, box, wall ]); // these blocks cannot be pushed by others

// allow certain sprites to push certain other sprites
setPushables({
  [player]: []
});

// input for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
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

// These get run after every input
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
