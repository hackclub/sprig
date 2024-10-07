/*
@title: cave_explorer
@author: Sid Khare
@tags: ['strategy']
@addedOn: 2022-11-12


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

let level = 5;
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
p.wwwwwwwwwwwwwww
w..wwwwwwwww.....
ww.w...wwwww.w.w.
ww.w.w.wwwww.w.w.
ww.w.w.wwwww.....
ww...w....wwwww.w
wwwwwwwww..wwww.w
wwwwwwwwww..www.w
wwwwwwwwwww.....w`,
  map`
...w...w.p.w.....
.w...w...w...w...
.wwwwwwwwwwwwwww.
..w...w......w...
w.w.w.w.wwww.w.ww
w.w.w.w.wwww.w.ww
w.w.w.w.wwww.w.ww
w.w.w.w.wwww.w.ww
w...w...wwww...ww`,
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
  map`
wwwwwwwwpwwwwwwww
wwwwwwww.w.......
ww.......w.wwwww.
ww....wwww.w...w.
wwwww.w....w...w.
wwwww.w.wwww...w.
wwwww.w........w.
wwwww.wwwwwwwwww.
wwwww............`,
  map`
wwwwwwww.........
wwwwwwww.wwwwwww.
wwwwwwwwpw.......
wwwwwwwwww.......
wwwwwwwwww.......
wwwwwwwwww.......
wwwwwwwwww.......
wwwwwwwwww.......
wwwwwwwwww.......`,
  map`
.......w.........
.wwwww.w.wwwwwww.
.w...w.wpw..wwww.
.w.w.w.www..wwww.
.w.w.w.www..wwww.
.w.w.w.www..wwww.
.w.....www..wwww.
.wwwwwwwww..wwww.
.................`,
  map`
pwwwww...........
..wwww.wwwwwwwww.
w..www.ww....www.
ww..ww.ww.ww.www.
www..w....ww.ww..
wwww..www.ww.w..w
wwwww..ww.ww...ww
wwwwww..w.wwwwwww
wwwwwww...wwwwwww`,
  map`
wwp..............
wwwwwwww.wwwwwww.
wwwwwww..wwwwwww.
w.......wwwwwwww.
..wwww..wwwwwwww.
.wwwww..wwwwwwww.
.wwwww..wwwwwwww.
.wwwww..wwwwwwww.
.................`,
  map`
wwwwwwwwwwwwtwww.
tttttwtwwwtwwwtw.
twwwtwwtwtwwtttt.
tttttwwwtwwwtwtw.
twwwwwwtwtwwtwtw.
ttttwwtwwwtwtwtw.
wwwwwwwwwwwwwwww.
wwwwwwwwwwwwwwww.
p................`,
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
