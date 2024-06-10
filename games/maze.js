/*
@title: maze_game
@tags: ['beginner', 'hackable']
@addedOn: 2022-07-15
@author: leo mcelroy

Instructions:

Cover all the tiles.
*/

const player = "p";
const red = "r";
const wall = "w";

setLegend(
  [ player, bitmap`
................
................
................
................
.....000000.....
....00....00....
....0..0.0.0....
....00.....0....
.....0....0.....
.....000000.....
......0..00.....
.....00...0.....
.....0..........
................
................
................
 `],
  [ red, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
 `],
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
0000000000000000
 `]
)

setSolids([player, red, wall])

let level = 0;

const levels = [
  map`
p...
..w.
..w.`,
  map`
p..w....
...w....
..wwww..
........
........
..wwww..
..ww....
..ww....
`,
  map`
..w..
p....
.w...
..ww.
..ww.
.....
..www`,
]


setMap(levels[level])
const p = getFirst(player);
addSprite(p.x - p.dx, p.y - p.dy, red)

onInput("w", _ => {
  getFirst(player).y -= 1;
})

onInput("s", _ => {
  getFirst(player).y += 1;
})

onInput("a", _ => {
  getFirst(player).x -= 1;
})

onInput("d", _ => {
  getFirst(player).x += 1;
})

onInput("j", _ => {
  setMap(levels[level]);
  const p = getFirst(player);
  addSprite(p.x, p.y, red)
  
})

afterInput(_ => {
  const p = getFirst(player);
  if (p.dy !== 0 || p.dx !==0) {
    addSprite(p.x, p.y, red)
  }

  if (getAll(red).length === width() * height() - getAll(wall).length) {
    level++;
    if (level in levels) setMap(levels[level])
    else addText("you win", { y: 5, color: color`5`})
    const p = getFirst(player);
    addSprite(p.x, p.y, red)
  }
})
