/*
@title: maze_game
@author: leo mcelroy
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
p....
.....
.....
.....
`
]


setMap(levels[level])
const p = getFirst(player);
addSprite(p.x - p.dx, p.y - p.dy, red)

onInput("up", _ => {
  getFirst(player).y -= 1;
})

onInput("down", _ => {
  getFirst(player).y += 1;
})

onInput("left", _ => {
  getFirst(player).x -= 1;
})

onInput("right", _ => {
  getFirst(player).x += 1;
})

afterInput(_ => {
  const p = getFirst(player);
  if (p.dy !== 0 || p.dx !==0) {
    addSprite(p.x, p.y, red)
  }

  if (getAll(red).length === width() * height() - getAll(wall).length) {
    level++;
    if (level in levels) setMap(levels[level])
    else console.log("you win")
    const p = getFirst(player);
    addSprite(p.x, p.y, red)
  }
})