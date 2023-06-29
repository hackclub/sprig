/*
@title: getting_started
@author: leo
*/

/*
 ______    _______  _______  ______     _______  __   __  ___   _______ 
|    _ |  |       ||   _   ||      |   |       ||  | |  ||   | |       |
|   | ||  |    ___||  |_|  ||  _    |  |_     _||  |_|  ||   | |  _____|
|   |_||_ |   |___ |       || | |   |    |   |  |       ||   | | |_____ 
|    __  ||    ___||       || |_|   |    |   |  |       ||   | |_____  |
|   |  | ||   |___ |   _   ||       |    |   |  |   _   ||   |  _____| |
|___|  |_||_______||__| |__||______|     |___|  |__| |__||___| |_______|

Instructions:

Welcome to Sprig!!!

Hit "run" to execute the code and
start the game (you can also press shift+enter).

Click the "Show Help" to discover your toolkit.

The objective is to push the purple boxes onto the green goals.
Press j to reset the current level.

To beat each level you'll have to edit the code.

The code for this game starts below this comment (the brown text).

--------
Level 1
--------

Make the purple block pushable. 

--------
Level 2
--------

Add controls to move up and left, use "w" and "a" as inputs

Tip: 
Do you find it annoying restarting at level 0?
Try adjusting the starting level.

--------
Level 3
--------

Edit the map.

--------
Level 4
--------

Make boxes push boxes.

--------
Level 5
--------

Add sound effects when you move.

--------
Level 6
--------

Solve the puzzle!

--------
END
--------

Make your own game! Try
 - adding two players
 - leaving a trail as you move
 - having different blocks and goal types
 - come up with your own mechanic!

*/


const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

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

let level = 0;
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

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  [player]: []
});

// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});