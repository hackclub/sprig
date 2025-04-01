/*
@title: Ultimate Maze Escape
@author: 
@tags: [maze, puzzle, adventure, challenge]
@addedOn: 2024-03-31
*/

const player = "p";
const wall = "w";
const goal = "g";

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ wall, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222` ],
  [ goal, bitmap`
................
................
......4444......
.....4....4.....
....4......4....
...4........4...
...4..4444..4...
...4..4..4..4...
...4..4..4..4...
...4..4444..4...
....4......4....
.....4....4.....
......4444......
................
................
................` ]
);

setSolids([player, wall]);

let level = 0;
const levels = [
  map`
wwwwwwwwwwwwwwwwwwww
wp.....w.........wgw
w.www.wwww.wwwww.w.w
w.w...w....w.....w.w
w.w.w.wwwww...wwww.w
w.w.w...w...w.......
w.wwwww.w.wwwwwww.w.
w.....w.w.......w.w.
wwwww.w.wwwwwww.w.w.
w.....w.......w.w.w.
w.wwwwwwwwwww.w.w.w.
w.w...........w.w.w.
w.w.wwwwwwwwwww.w.w.
w.w.w...........w.w.
w.w.w.wwwwwwwwwww.w.
w.w.w...........w.w.
w.wwwwwwwwwwwww.w.w.
w...............w.w.
wwwwwwwwwwwwwwwwwwww`
];

setMap(levels[level]);

setPushables({
  [player]: []
});

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

afterInput(() => {
  let p = getFirst(player);
  if (p.x === getFirst(goal).x && p.y === getFirst(goal).y) {
    addText("You Win!", { x: 5, y: 5, color: color`4` });
  }
});
