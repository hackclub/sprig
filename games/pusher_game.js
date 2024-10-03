/*
@title: Pusher game
@author: liam
@tags: ['strategy']
@addedOn: 2023-02-08
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
.....oo..o.o
.oo..oo.o.fo
o...oo..oo..
o..oo.o...oo
oooooo..o.o.
oooooo.o.ooo
ooopooo.....
oooooooo.ooo
oo...o.ooo..
oo....o....o
.o.oo.o..o..`,
  map`
oooo.o.o......
.o...ooo......
ofo.o..o......
oo.oo.oo......
.o.oo..o...p..
.o.o..oo......
.o.ooooo......
oo.o.o.o......
.ooo.o.o......
.ooooooo......
..ooo.oo......
o.oo..oo......
oooooooo......`,
  map`
o......oo....o.
oooo.oo..oooo..
.ooooo..oooo...
.o..oo..o..oo..
.o...o...o.ooo.
ooof..o.o.o..o.
oo...oo...o..o.
...ooo..oo...o.
...o.oooo.o.oo.
.ooooo..oo.oo..
o.o.o...oooo...
.oo.o..oooo.oo.
o..ooooo...oooo
oo.ooo...p.oooo`,
  map`
oo..o..o.oo.o.o..
o.......o...oof.o
ooooooo.o.o.o....
o...o..o.o.o.oooo
...p...o....oo..o
o....oooo.oooo..o
..o..oo.ooooo....
oo...oo.ooooo.o.o
.o...ooooo.o.o.o.
..oo.o.o.oo...ooo
ooooo.ooooo.o....
o...oooo.oo......
.oo..o...........
.o.oo....oo......
.....oooo.oo.o..o
.o.o..ooooo....o.
.......ooo......o`,
  map`
.............oo....
...ooo..o.o...o...o
..o.o..ooo.o..o..fo
.............o.oooo
.o..oo....o.o..oooo
.ooo..oo.o.oo.oo..o
.o.oo.ooo.o..oo..oo
..o..o..o.o.o...oo.
..o.o.oooo.oo..ooo.
.oo.....o.oo...o.o.
.ooo..oo.ooo.oo...o
oooo.oo..oo.o.ooo.o
ooo..o..oo...oo.oo.
.o..o...o....oooooo
.o.oo..o....oo.o..o
.oo...oo...oo..o.o.
o....oo...oo..oo...
o...oo...oo..oooo..
...oo..oooo.ooooo..
..oo..oo...oooo...o
oo....ooooo...ooo..
o....ooo.o.o..ooo..
op.ooo..oo....oooo.
o.oo....oooooo..ooo`,
  map`
.o....oo..oooo..
.oo....oo.o.oo..
o.oo.o..o.oooooo
oo.ooooooo.ooooo
o.oo..oooooooo.o
.oo.oo.oo...ooo.
ooo..o.ooooo.ooo
o..po.o.o.o.ooo.
o.o.o.o.ooo.o.f.
.......oo.o.....
..o...o.o...o..o
oo.oo..oo..ooooo
o..ooo.ooo..ooo.
.oooo.o.o..o....
....o..ooo..oooo`,
  map`
.f..........o.oo.
oooooo...oooo....
..ooo.oo..ooo....
oo..o..ooo.o.....
o.oooooooooooo.oo
o.ooooo.o....o.o.
oop..oo.o.o.o..o.
oooo....o.......o
....o..ooo..ooooo
ooo.....o.o.o.o.o
............oo.o.
o.o..o..oo.o.oo..
..oo.ooo...o..ooo
.oo...oo.ooo..o..
.o..o......o.oo.o
...o.oo.o.ooooooo
..oo..o.o.oo.o.o.
.oooo.o.o......o.
oooo.o.ooo.....o.
oo....oooo.oo...o
.o...o.oo......o.`,
  map`
...oo..............oooo
..ooooooo.o.o.o........
o.o...oooo......ooo.f..
o.o.ooo..ooooo...oo....
ooooo.oo.ooo.ooo...o..o
.ooo....ooooo.ooo.o..o.
.ooo....oo.oo.o...o....
.ooo.oo.ooooooo.....o..
.ooooo.oo...oooo..oooo.
.oooo..oo...ooo...oooo.
.o.o...o.oooo.o..oo..o.
.o.o...ooooo.....ooo...
.o.....o.oo..o.ooo..oo.
.o.p..o..o..o......oooo
.ooooo.oo..oooo.....oo.
.ooooo.o.o.o.o.o.....o.
.oo.ooo.....oo.o...ooo.
.ooo..oooo...oo.....o..
..ooooo.ooo..oo.o.oo...
o.o..oo.oo.oo.o.o.oo.o.`,
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

onInput("j", () => {
  setMap(levels[level])
});

afterInput(() => {
  const tilesplayerandfinal=tilesWith(final, player);
  if (tilesplayerandfinal.length > 0) {addText("you win!!");
  level += 1
  // increase level
  setMap(levels[level])
}
});
