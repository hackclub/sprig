/*
@title Destroy the hearts!
@author zKxra

How to play:
WASD To move, J to restart level

typical sokoban game
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
..00000000000...
..06666666660...
..06602620660...
..06666666660...
..06606660660...
..06660006660...
..06666666660...
..00000000000...
................
................
................`],
  [ box, bitmap`
................
................
................
...000..........
...0770.........
...07770........
....07770.......
.....07770......
......0777000...
.......070060...
.......00050....
........060F0...
........00.0F0..
............0F0.
.............00.
................`],
  [ goal, bitmap`
................
................
................
................
................
.......C.C......
......C0C0C.....
.....C0C0C0C....
......CCCCC.....
.....C0CCC0C....
......C0C0C.....
.......C.C......
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
..ww.
wbw..
p.w.g`,
  map`
w...www
w.b.gww
www.w..
.ww.wb.
p.g....
.b.wwgw
..wwwww`,
  map`
...w..g
...wg..
wwwww..
....w.g
.bb.w.w
.pb...w
wwww..w`,
  map`
...wwgw
.b.ww.w
.pb...w
w.ww..w
...b..w
..gwg.w`,
  map`
www..g
ww....
ww.bw.
www.w.
www.w.
p.....`
......
...w..
p.w.w.
.bwgw.
......
..bg..`
......
...w..
p.w.w.
.bwgw.
......
..bg..`,
  map`
..........
...wb.ww..
..wwgww...
..w....w..
..wg..gb..
..ww..w...
....w.w...
...wwb....
.......p..`,
  map`
...b.....
..wgwww..
..w...ww.
.w...b.w.
....w..w.
.wp.w..w.
.ww.g..w.
..wwwwgb.
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
