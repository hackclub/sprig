/*
@title: box oush
@author: justin

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
....2555552.....
..5.5555555.5...
..55552225555...
....5522255.....
....5555555.....
....2555552.....
....5.....5.....
...55.....55....
................
................
................
................`],
  [ box, bitmap`
................
................
................
...88888888888..
...86666855558..
...86666855558..
...86666855558..
...86666855558..
...88888888888..
...89999844448..
...89999844448..
...89999844448..
...89999844448..
...88888888888..
................
................`],
  [ goal, bitmap`
................
................
................
................
...2999999992...
...9222222229...
...9229999229...
...9229999229...
...9229999229...
...9229999229...
...9222222229...
...2999999992...
................
................
................
................`],
  [ wall, bitmap`
0003000000003000
0003000000003000
0003000000003000
0003000000003000
0003000000003000
0003000000003000
0003000000003000
0003000000003000
0003000000003000
0003000000003000
0003000000003000
0003000000003000
0003000000003000
0003000000003000
0003000000003000
0003000000003000`]
);

let level = 0;
const levels = [
  map`
pwg..
..b..
..b..
.wg..`,
  map`
gw.wg
.wwwb
bwgw.
.wbw.
p....`,
  map`
.....
.w.w.
bwbw.
.wgwb
g...g`,
  map`
wwgb.w
pgww..
..b..w
w.w.b.
.....g`,
  map`
.bgwwwp
.wwwgb.
gb.www.
...wgw.
.wwwbw.
.......`,
  map`
pw.w...wg.b.wg
.wwg...wg.b.w.
.w.wb..wwww.w.
.wwg...w.gw.wb
.w.wb..w.bw.w.
.wwg...ww.w.w.
.w.wb..bg.w.w.
..............`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  [player]: [box]
});

// START - PLAYER MOVEMENT CONTROLS

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
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
      addText("you win !", { y: 4, color: color`5` });
    }
  }
});
