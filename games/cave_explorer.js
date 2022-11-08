/*
@title: cave_explorer
@author: sid khare


Instructions:

Color the cave.
J to reset.
*/

const player = "p";
const wall = "w";
const paint = "t";

setLegend(
  [ player, bitmap`
................
................
................
................
.....000........
.....000........
.....000........
......0.........
....00000.......
...0..0..0......
...0..0..0......
.....000........
.....0.0........
.....0.0........
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
0000000000000000`],
  [ paint, bitmap`
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
3333333333333333`]
);

setSolids([player, wall, paint]);

let level = 0;
const levels = [
  map`
p.wwwwwwwwwwwwwww
w..wwwwwwwww...ww
ww..wwwwwww..w..w
www..wwwww..www..
wwww..www..wwwww.
wwwww..w..wwwwwww
wwwwww...wwwwwwww
wwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwww`,
  map`
pw...w...w...w...
.w.w.w.w.w.w.w.w.
.w.w.w.w.w.w.w.w.
.w.w.w.w.w.w.w.w.
.w.w.w.w.w.w.w.w.
.w.w.w.w.w.w.w.w.
.w.w.w.w.w.w.w.w.
.w.w.w.w.w.w.w.w.
...w...w...w...w.`,
   map`
wwwwwwwwwwwwwwwww
p...............w
wwwwwwwwwwwwwww.w
w.............w.w
w.wwwwwwwwwww.w.w
w.w...........w.w
w.wwwwwwwwwwwww.w
w...............w
wwwwwwwwwwwwwwwww`,
   map`
ww...............
ww.wwwww.wwwwwww.
ww.....wpw.....w.
ww..ww.www.....w.
ww...w.www..w..w.
ww...w.www..w..w.
wwwwww.www..w..w.
wwwwww.www..wwww.
wwwwww...........`,
];

setMap(levels[level])
const p = getFirst(player);
addSprite(p.x - p.dx, p.y - p.dy, paint)

setPushables({
  [ player ]: [],
});

onInput("s", () => {
  getFirst(player).y += 1
});

onInput("w", () => {
  getFirst(player).y -= 1
});

onInput("d", () => {
  getFirst(player).x += 1
});

onInput("a", () => {
  getFirst(player).x -= 1
});

onInput("j", _ => {
  setMap(levels[level]);
  const p = getFirst(player);
  addSprite(p.x, p.y, paint)
  
})

afterInput(_ => {
  const p = getFirst(player);
  if (p.dy !== 0 || p.dx !==0) {
    addSprite(p.x, p.y, paint)
  }

  if (getAll(paint).length === width() * height() - getAll(wall).length) {
    level++;
    if (level in levels) setMap(levels[level])
    else addText("you win", { y: 5, color: color`H`})
    const p = getFirst(player);
    addSprite(p.x, p.y, paint)
  }
})
