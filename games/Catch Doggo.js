/*
@title: Catch Doggo
@author: Jackson Flanders

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
................
................
................
................
................
.....551133.....
...0022222200...
...7722772277...
...7722772277...
0000022222200000
0000022222200000
00LLL222222LLL00
00L1L000000L1L00
..LLL......LLL..
................`],
  [ box, bitmap`
1111111111111111
1.1.1.1.1.1.1.11
1.1.1.1.1.1.1.11
1.1.1.1.1.1.1.11
1.1.1.1.1.1.1.11
1.1.1.1.1.1.1.11
1.1.1.1.1.1.1.11
1.1.1.1.1.1.1.11
1.1.1.1.1.1.1.11
1.1.1.1.1.1.1.11
1.1.1.1.1.1.1.11
1.1.1.1.1.1.1.11
1.1.1.1.1.1.1.11
1.1.1.1.1.1.1.11
1.1.1.1.1.1.1.11
1111111111111111`],
  [ goal, bitmap`
................
..999......999..
..966999999669..
...9999999999...
....92099209....
....99666699....
....96600669....
.....906609.....
....99999999....
....99666699....
....99666699....
....99666699....
....99966999....
....99....99....
................
................`],
  [ wall, bitmap`
2CCCC2CCCCC2CCCC
2CCCC2CCCCC2CCCC
2CCCC2CCCCC2CCCC
2CCCC2CCCCC2CCCC
2222222222222222
CC2CCCCC2CCCCC2C
CC2CCCCC2CCCCC2C
CC2CCCCC2CCCCC2C
CC2CCCCC2CCCCC2C
2222222222222222
CCCCC2CCCCC2CCCC
CCCCC2CCCCC2CCCC
CCCCC2CCCCC2CCCC
CCCCC2CCCCC2CCCC
2222222222222222
C2CCCCCC2CCCCC2C`]
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
....
....`,
  map`
p.ww
.b..
....
wwwg`,
  map`
...
.b.
gp.`,
  map`
p.w.
...g
.bw.
..bg`,
  map`
w....bg.w.
.bg......p
...w......
g....gb...
b.w......b
...bg.w..g`,
  map`
.................................
..g...................bg.....gb..
..b...b..........................
......g..........................
..........g......gb...gb....g....
..........b.................b....
.............g...................
b...g........b...................
g...b....................bg......
.......g...b....p..............bg
.......b...g.........g...........
.....................b...........
.........................b.......
.............g...........g.......
...g.........b...b............g..
.b.b...b.........g............b..
.g.....g.........................
..........................b......
..b....b.......b.....g....g....b.
..g....g.......g.....b.........g.
.................................`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  [player]: [box]
});

// START - PLAYER MOVEMENT CONTROLS

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
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
      addText("YOU CAUGHT DOGGO", { y: 4, color: color`0` });
    }
  }
});
