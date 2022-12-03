/*
@title: leave your mark
@author: nicholas

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
const bullet = "u";
const trail = "t";

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
  [ bullet, bitmap`
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
  [ box, bitmap`
................
................
................
.......20.......
........00......
........000.....
........0000....
...0000000000...
........0000....
........000.....
........00......
........0.......
................
................
................
................`],
  [ goal, bitmap`
................
................
................
....555555......
...55555555.....
...55555555.....
...555555555....
...555555555....
...555555555....
...555555555....
....55555555....
....55555555....
.....555555.....
................
................
................`],
  [ wall, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222223333222222
2222223333222222
2222223333222222
2222223333222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [trail, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  
);

const melody = tune `
38.31417624521073,
38.31417624521073: b5~38.31417624521073 + f4/38.31417624521073,
38.31417624521073: f4/38.31417624521073 + c5~38.31417624521073 + d5~38.31417624521073 + e5~38.31417624521073 + f5~38.31417624521073,
38.31417624521073: f4~38.31417624521073 + g4~38.31417624521073 + a4~38.31417624521073 + b4~38.31417624521073 + g5~38.31417624521073,
38.31417624521073: f5~38.31417624521073 + c5^38.31417624521073 + f4/38.31417624521073 + e4/38.31417624521073 + c4~38.31417624521073,
38.31417624521073: b4^38.31417624521073 + e4/38.31417624521073,
38.31417624521073: g5^38.31417624521073 + a4^38.31417624521073 + e4/38.31417624521073,
38.31417624521073: a4^38.31417624521073 + e4/38.31417624521073 + d4/38.31417624521073,
38.31417624521073: c5~38.31417624521073 + a4^38.31417624521073 + d4/38.31417624521073,
38.31417624521073: g5^38.31417624521073 + a4^38.31417624521073 + b4^38.31417624521073 + d4/38.31417624521073 + c4/38.31417624521073,
38.31417624521073: c5^38.31417624521073 + b4^38.31417624521073 + d5^38.31417624521073 + c4/38.31417624521073,
38.31417624521073: c5/38.31417624521073 + b4/38.31417624521073 + a4/38.31417624521073 + c4/38.31417624521073,
38.31417624521073: b5/38.31417624521073 + a5/38.31417624521073 + c4/38.31417624521073,
38.31417624521073: e5~38.31417624521073 + f4~38.31417624521073 + g4~38.31417624521073 + a5/38.31417624521073,
38.31417624521073: a4~38.31417624521073 + g5/38.31417624521073,
38.31417624521073: a4~38.31417624521073 + b4~38.31417624521073 + f5/38.31417624521073,
38.31417624521073: b4~38.31417624521073 + a5-38.31417624521073 + g5-38.31417624521073 + f5-38.31417624521073 + b5/38.31417624521073,
38.31417624521073: c5-38.31417624521073 + f5-38.31417624521073 + e5-38.31417624521073 + d5-38.31417624521073 + b4-38.31417624521073,
38.31417624521073: c5~38.31417624521073 + d5~38.31417624521073 + a4-38.31417624521073 + g4-38.31417624521073 + f4-38.31417624521073,
38.31417624521073: d5~38.31417624521073 + a5/38.31417624521073 + a4/38.31417624521073 + g4/38.31417624521073,
38.31417624521073: d5~38.31417624521073 + g5/38.31417624521073 + f4/38.31417624521073 + e4/38.31417624521073,
38.31417624521073: d5~38.31417624521073 + e4/38.31417624521073 + d4/38.31417624521073,
38.31417624521073: a4~38.31417624521073 + d5~38.31417624521073 + e5~38.31417624521073,
38.31417624521073: e5~38.31417624521073,
76.62835249042146,
38.31417624521073: f5-38.31417624521073 + a4-38.31417624521073 + b4-38.31417624521073,
38.31417624521073: b4-38.31417624521073 + c5-38.31417624521073,
38.31417624521073: c5-38.31417624521073,
38.31417624521073: f5-38.31417624521073 + b4-38.31417624521073 + a4-38.31417624521073 + g4-38.31417624521073,
76.62835249042146`

let level = 0;
const levels = [
 map`
p
w`,
  map`
p..ww
...ww
...ww`,
  map`
..w...
..www.
p.....
..ww..
..www.
..w...`,
  map`
pw
.w
.w
..`,
  map`
..w
.pw
.ww`,
  map`
p..www`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({ 
  [player]: [box],
  [box]: [box]
});

// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => {
  getFirst(player).y += 1;
   addSprite(getFirst(player).x,
    getFirst(player).y, trail)
});

onInput("w", () => {
  getFirst(player).y -= 1;
   addSprite(getFirst(player).x,
    getFirst(player).y, trail)
});

onInput("a", () => {
  getFirst(player).x -= 1;
   addSprite(getFirst(player).x,
    getFirst(player).y, trail)
});

onInput("d", () => {
  getFirst(player).x += 1;
   addSprite(getFirst(player).x,
    getFirst(player).y, trail)
});

onInput("w", () => {
  addSprite(getFirst(player).x,
    getFirst(player).y, trail)})
  
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
  const targetNumber = tilesWith(trail).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(wall).length;

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
