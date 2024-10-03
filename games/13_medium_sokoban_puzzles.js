/*
@title: 13 medium sokoban puzzles
@author: Zachary Miller
@tags: ['puzzle']
@addedOn: 2022-12-19

Instructions:

Hit "run" to execute the code and
start the game (you can also press shift+enter).

The objective is to push the red-brown boxes onto the black goals.
Press j to reset the current level.

*/


const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
................
................
......00........
.....0660.......
....03660.......
...066630.......
...06660........
..006660........
00006660000.....
0..006660..00...
....006660......
.....000660.....
.......0000.....
.......0..0.....
......00.00.....
................`],
  [ box, bitmap`
................
................
................
...CCCCCCCCCCC..
...CLLLLCLLLLC..
...CL33LCL33LC..
...CL33LCL33LC..
...CLLLLCLLLLC..
...CCCCCCCCCCC..
...CLLLLCLLLLC..
...CL33LCL33LC..
...CL33LCL33LC..
...CLLLLCLLLLC..
...CCCCCCCCCCC..
................
................`],
  [ goal, bitmap`
................
................
................
................
................
................
......00000.....
......00000.....
......00000.....
......00000.....
......00000.....
................
................
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
.....
.....
..w..
.bw..
p.w.g`,
  map`
.....ww
w.b.gww
www.w..
.w..wb.
p.g....
.b.wwg.
...ww..`,
  map`
...w.gg
...w..g
.......
....w..
.bb.www
.pb.www
w..wwww`,
  map`
...w.g.
.b.w...
.pb...w
..ww..w
...b..w
..gwg.w`,
  map`
.w..bg
...w..
.wwwww
......
wwwww.
p.....`,
  map`
......
...w..
p.w.w.
.bwgw.
......
..bg..`,
  map`
..........
...ww.ww..
..wwgww...
..w....w..
..wg..gb..
..ww..wbb.
....www...
...www....
.......p..`,
  map`
.........
..wgwww..
..w...ww.
.w..bb.w.
.w.bw..w.
.wp.w..w.
.ww.g..w.
..wwwwg..
.........`,
  map`
g......
.w..bb.
..wp...
..wgw..
...gww.
.bb.w.g
.....w.`,
  map`
p...
gw..
.w..
gwwb
b.w.
..w.
..w.
b..g
....`,
  map`
.gwwwwwwww
.b.g..wp.g
.bwwww....
....g..b.b
b.wwwwwb..
gwg...bg..`,
  map`
..w...
..w.b.
.gwg..
wb.bw.
w....w
wpg...`,
  map`
wwwwww.
www...w
gpb...w
wwwggww
wgw..b.
w..bb..
.....ww
www..ww`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  ["p"]: ["b", "p"],
});


// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
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
