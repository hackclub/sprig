/*
title: fill the map!
author: Ansh Kumar

Instructions:

Cover all the tiles to move to the next level
You may face the difficulty of a button not working on the edges, don't worry this is some glitch because of the map!
Enjoy!


*/


const player = "p";
const green = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
.....000000.....
....0......0....
....0.0..0.0....
....0......0....
....0..00..0....
....0......0....
.....000000.....
.......0........
.......0........
.....00000......
.......0........
.......0........
.......0........
......0.0.......
.....0...0......
....0.....0.....`],
  [ green, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
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
 `],
)

setSolids([player, green, wall])

let level = 0;

const levels = [
  map`
pw..
.w..
....`,
  map`
pw......
.w...w..
.www....
........
.......w
..ww....
...w....
...w....`,
  map`
pw...
.w...
.w...
.w...
.w...
.w...
.....`,
  map`
pwwwwwwwwwwwwwwwww..
.w.................
.w.wwwwwwwwwwww.....
.w.................
.wwwwwwwwwwwwwwwwww.
....w....w..w......
..w.w.......w..w...
..w.w.www.w.w..w...
..w.w.wwwww.w..w...
..w...wwwww....w....`,
];



setMap(levels[level])
const p = getFirst(player);
addSprite(p.x - p.dx, p.y - p.dy, green)

onInput("w", _ => {
  getFirst(player).y -= 1;
})

onInput("s", _ => {
  getFirst(player).y += 1;
})

onInput("a", _ => {
  getFirst(player).x -= 1
})

onInput("d", _ => {
  getFirst(player).x += 1;
})

onInput("j", _ => {
  setMap(levels[level]);
  const p = getFirst(player);
  addSprite(p.x, p.y, green)
  
})

afterInput(_ => {
  const p = getFirst(player);
  if (p.dy !== 0 || p.dx !==0) {
    addSprite(p.x, p.y, green)
  }

  if (getAll(green).length === width() * height() - getAll(wall).length) {
    level++;
    if (level in levels) setMap(levels[level])
    else addText("you win", { y: 5, color: color`5`})
    const p = getFirst(player);
    addSprite(p.x, p.y, green)
  }
})