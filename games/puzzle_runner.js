/*
@title: puzzle_runner
@author: Shanath
@tags: ['puzzle']
@addedOn: 2022-10-12

In Puzzle Runner, you must navigate through the maze while 
pushing a box. If you get through all the levels, you win! 

Controls:
w - move up
a - move left
s - move down
d - move right
j -reset current level

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
p..w....
.w.w..w.
.b.w....
...w..ww
........
.ww.....
........
....wwwg`,
  map`
p.ww.w..
w..w..w.
w.b.....
..w.w...
..w.....
.wwwww.w
w......w
..w.w..g`,
  map`
w..w..ww..
p......w..
w.......w.
..w.ww..ww
.w..w.b...
w...ww..w.
ww....w.w.
.w....wwww
.www..w..w
...w......
www.w.w...
...ww.ww.g`,
  map`
wwwwwwwpwwwwwww
w.w.....w..w..w
w.wwwww.ww.ww.w
w.w...w....w..w
w.w..wwwww.w..w
w....w........w
www.ww..wwwww.w
w...w..ww...w.w
w...ww....w...w
www..w...www..w
w...ww....b...w
w...w..wwwww..w
w.....ww......w
w......ww.....w
wwwwww.wwgwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
wp......w..........w
w.....wwwww.....wwww
www......w...wwww..w
w.wwww...w....w.ww.w
w.w.......ww..w..w.w
w....ww....w..w..w.w
w.w...ww...w.....w.w
w.ww..ww.b.w.......w
w..w...ww..........w
w........w..w...wwww
w...wwwww....w..w..w
www..w.w...ww.w.ww.w
w.ww.w.ww...www..www
w..www..w........www
w..w.ww......ww.ww.w
w.w..w.ww.....ww...w
w..w......w........w
ww.......ww.....w.gw
wwwwwwwwwwwwwwwwwwww`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  [player]: [box, player]
});


// START - PLAYER MOVEMENT CONTROLS
onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

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
