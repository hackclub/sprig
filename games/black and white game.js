/*
@title: black and white game
@author: liam
*/

const player = "p";
const final = "f";
const obstacle = "o";

setLegend(
  [ player, bitmap`
0000000000000000
0000000000000000
0000000000000000
0002200000022000
0022220000222200
0022220000222200
0002200000022000
0000000000000000
0000000000000000
0000000000000000
0000002222000000
0000002222000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ final, bitmap`
0000000000000000
0222222222222220
0200000000000020
0202222222222020
0202000000002020
0202022222202020
0202020000202020
0202020220202020
0202020220202020
0202020000202020
0202022222202020
0202000000002020
0202222222222020
0200000000000020
0222222222222220
0000000000000000`],
   [ obstacle, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`]
);

setSolids([player, obstacle]);

let level = 0;
const levels = [
  map`
...o........
.p.o........
...o....oo..
.o.ooooooooo
.o..o......o
.o..o.ooo.oo
.o..o..o...o
.o.oo..o.f.o
........o.oo
...oooo..oo.
..oo..ooooo.
..o.........`,
  map`
oooo.o.o.oo...o
..o....o...o.o.
.ooo.o.oo..o...
.o..oo..o.oo.f.
oooo.o..ooo....
o.o.oo.oo..o...
oop..o.o.o..oo.
.ooooo..o.oo.o.
o....o.oo.o....
...ooo.o..oo...
..o..o..oo..o..
..oo..oo.ooo.o.
.o.....oo.o....`,
  map`
.....o...ooooo....
o.o.oo.o..o....ooo
...ooo...o.oo.....
o.oo.o..o.oo...o..
...o..oooo.o.oof..
oooo.oo..oo.oo....
........o..oo....o
..o..o.o.o..o.ooo.
.oo.ooo..oo..oo.o.
.o.oooo.oo....oo.o
.o.oo.oo.o..ooo..o
o.oo..o..o....o.oo
oo.o.oo.oo.o..oo.o
..o..ooo.oo..o..oo
..o.ooo.....oo..o.
.p..oo.oo..oo..o..
...o...o..o...o...`,
  map`
o.o.o.o.o...o
o.o.o.o.o.o.f
..o.ooooooooo
..o.o.o...o.o
..ooooooo...o
..o.o...o...o
.ooo..ooooooo
o.o.....o.o.o
ooooooooooooo
o.....o...o.o
oooo..ooooooo
o.o...o.o.o.o
opo.o.o.o.o.o`,
  map`
.........................
.........................
.........................
...o..o..o....o.o.o..o...
...o..o..o....o.o.oo.o...
...o..o..o.oo.o.o.o.oo...
...oooo..oooooo.o.o..o...
.........................
.........................
.........................
.........................
.......ooooooooooo.......
.......o.........o.......
.......o.........o.......
.......o.........o.......
.......o....p....o.......
.......o.........o.......
.......o.........o.......
.......o.........o.......
.......ooooooooooo.......
.........................
.........................
.........................
.........................`
];

setMap(levels[level]);

setPushables({
  [ player ]: [obstacle],
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
  const tilesplayerandfinal=tilesWith(final, player);
  if (tilesplayerandfinal.length > 0) {addText("you winl!");
  level += 1
  setMap(levels[level])
}
});