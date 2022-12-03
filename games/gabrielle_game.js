/*
@title: getting_started
@author: leo

Instructions:

Welcome to Sprig!!!

Hit "run" to execute the code and
start the game (you can also press shift+enter).

To beat each level you'll have to edit the code.

The code for this game starts below this comment.

The objective is to push the purple boxes onto the green goals.
Press j to reset the current level.

Click the "open help" to discover your toolkit.

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
.....000000.....
.....0.00.0.....
.....000000.....
.....0....0.....
.....0.33.0.....
.....000000.....
.......00.......
...0000000000...
.......00.......
.......00.......
.......00.......
.....000000.....
.....00..00.....
.....00..00.....
.....00..00.....`],
  [ box, bitmap`
................
................
................
.......000......
......09090.....
.....0990990....
....099909990...
...09999099990..
...00000000000..
...99999099999..
....999909999...
.....9990999....
......99099.....
.......909......
................
................`],
  [ goal, bitmap`
................
................
....03..........
....03333.......
....03333333....
....033333333...
....03333333....
....03333.......
....03..........
....0...........
....0...........
....0...........
....0...........
....0...........
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

let level = 1;
const levels = [
  map`
p.bg`,
  map`
p..
.b.
..g`,
  map`
p..g
.b..
....
....`,
  map`
p...
...b
...b
..bg`,
  map`
...
.pb
..g`,
  map`
p.w.
.b.g
....
..bg`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  [player]: [box,player]
});

setPushables({
  [player]: [box,box]
});

// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

const melody = tune`
468.75,
468.75: a4-468.75,
468.75: f4-468.75,
468.75: a4-468.75,
468.75: e4-468.75,
468.75: c4-468.75,
468.75: f4-468.75,
468.75: a4-468.75,
468.75: f4-468.75,
468.75: d4-468.75,
468.75: a4-468.75,
468.75: d5-468.75,
468.75: d5-468.75,
468.75: e5-468.75,
468.75: f5-468.75,
468.75: c5-468.75,
468.75: d5-468.75,
7031.25`
const playback = playTune(melody, Infinity)
playback.end()

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
