/*
/*
@title: Criminal
@author: Karen
*/
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
.....000000.....
....00666660....
...0966060660...
...0966666660...
...0966666660...
....09999990....
.....000000.....
......0...0.....
......2...2.....
......3...3.....
....233...332...
....000...000...
................`],
  [ box, bitmap`
................
.0000000000000..
.0.0.0.0.0.0.0..
.0.0.0.0.0.0.0..
.0.0.0.0.0.0.0..
.0.0.0.0.0.0.0..
.0.0.0.0.0.0.0..
.0.0.0.0.0.0.0..
.0.0.0.0.0.0.0..
.0.0.0.0.0.0.0..
.0.0.0.0.0.0.0..
.0.0.0.0.0.0.0..
.0.0.0.0.0.0.0..
.0.0.0.0.0.0.0..
.0000000000000..
................`],
  [ goal, bitmap`
................
................
.......8.8......
.......888......
......00000.....
.....0666660....
....066666690...
....060660690...
....066666690...
....066666690...
.....0999990....
......00000.....
......0...0.....
....288...882...
....000...000...
................`],
  [ wall, bitmap`
0000000000000000
0333303333033330
0333303333033330
0000000000000000
030CCCC033330330
030CCCC033330330
0000000000000000
03333033330CCCC0
03333033330CCCC0
0000000000000000
0303333033330330
0303333033330330
0000000000000000
03330CCCCC033330
03330CCCCC033330
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
p..g
.b..
....
....`,
  map`
p...
...b
...b
.bbg`,
  map`
.....w
pb...w
wwww.w
w....w
wwww..
......
.b....
wgwwww`,
  map`
pb......g
wwww..b..
g........
........b`,
  map`
p...gwgw
.bwwww.w
.....w.w
...g.w.w
.bwwww.w
.....w.w
wwww..bw
b......w`,
  map`
p.w.
.bwg
..g.
..b.
....`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  [player]: [box],
  [box]: [box]
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
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
