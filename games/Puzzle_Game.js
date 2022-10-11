/*
@title: Puzzle_Game
@author: Amelia
*/

const player = "p";
const box = "b";
const wall = "w";
const thing = "t";
const goal = "g";

setLegend(
  [ player, bitmap`
................
....66666666....
...6666666666...
..666666666666..
.66633366333666.
.66633366333666.
.66633366333666.
.66666666666666.
.66666666666666.
.66666666666666.
.66663333336666.
.66666666666666.
..666666666666..
...6666666666...
....66666666....
................`],
  [ box, bitmap`
CCCCCCCCCCCCCCCC
C.....C..C.....C
C.....C..C.....C
C.....C..C.....C
C.....C..C.....C
C.....C..C.....C
CCCCCCCCCCCCCCCC
C.....C..C.....C
C.....C..C.....C
CCCCCCCCCCCCCCCC
C.....C..C.....C
C.....C..C.....C
C.....C..C.....C
C.....C..C.....C
C.....C..C.....C
CCCCCCCCCCCCCCCC`],
  [ wall, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666CC6666666
66666666C6666666
666666CCCC666666
666666CCCC666666
66666CCCCCC66666
66666CCCCCC66666
6666CCCCCCCC6666
6666CCCCCCCC6666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [ thing, bitmap`
0..............0
.0............0.
..0..........0..
...0........0...
....0......0....
.....0....0.....
......0..0......
.......00.......
.......00.......
......0..0......
.....0....0.....
....0......0....
...0........0...
..0..........0..
.0............0.
0..............0`],
  [ goal, bitmap`
................
................
................
................
................
......444444....
......444444....
......444444....
......444444....
......4.........
......4.........
......4.........
......4.........
......4.........
................
................`]
);

setSolids([]);

let level = 0;
const levels = [
  map`
p.w..g
.bw...
..w...
..w...
..w...
..t...`,
  map`
.wwwg.....w
.w.w......w
.w.w......w
.w.wwwwwtww
ww.........
...........
wwwww.www..
....w.w...w
..w.w.w.b.w
p.w...w..ww
www.wwwwwww
w.....wwwww`,
];

setSolids([ player, box, wall, thing ]);

setMap(levels[level]);

setPushables({
  [ player ]: [box], [ box ]: [thing],
});


onInput("w", () => {
  getFirst(player).y -= 1
});

onInput("a", () => {
  getFirst(player).x -= 1
});

onInput("s", () => {
  getFirst(player).y += 1
});

onInput("d", () => {
  getFirst(player).x += 1
});


afterInput(() => {
  const numberCovered = tilesWith(goal, player).length;
  const targetNumber = tilesWith(goal).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: [255, 0, 0] });
    }
  }
});
