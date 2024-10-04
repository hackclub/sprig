/*
@title: maze runner
@author: wetf
@tags: ['puzzle','timed']
@addedOn: 2022-09-26
*/

const player = "p";
const wall = "w";
const finnish = "f";
const lock = "d";
const key = "k";
const spikes = "s";
setLegend(
  [ player, bitmap`
................
................
..000000000000..
..044444444440..
..088884488880..
..077784487770..
..088884488880..
..066666666660..
..066656656660..
..066666666660..
..066566665660..
..066655556660..
..066666666660..
..000000000000..
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
  [ finnish, bitmap`
................
.66666666666666.
.68888888888886.
.68..........86.
.68..........86.
.68..........86.
.68..........86.
.68..........86.
.68..........86.
.68..........86.
.68..........86.
.68..........86.
.68..........86.
.68888888888886.
.66666666666666.
................`],
  [ lock, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLL0000LLLLLL
LLLLL0LLLL0LLLLL
LLLLL0LLLL0LLLLL
LLLL00000000LLLL
LLLL00000000LLLL
LLLL00001000LLLL
LLLL00010000LLLL
LLLL00000000LLLL
LLLL00000000LLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ spikes, bitmap`
L..L.L.LL.L.L..L
.L.L.L.LL.L.L.L.
..000000000000..
LL000000000000LL
..000000000000..
LL000000000000LL
..000000000000..
LL000000000000LL
LL000000000000LL
..000000000000..
LL000000000000LL
..000000000000..
LL000000000000LL
..000000000000..
.L.L.L.LL.L.L.L.
L..L.L.LL.L.L..L`],
  [ key, bitmap`
.......000......
......06660.....
.....066060.....
.....060060.....
.....060660.....
.....06660......
......060.......
......0600......
......06660.....
......0600......
......0660......
......0600......
......06660.....
......06660.....
.......000......
................`]
);

setSolids([ player, wall, lock ]);

let level = 0;
const levels = [
  map`
ps...
.s.s.
...s.
ss.sf
ss...`,
  map`
p...sf
wws.w.
wws.w.
....s.
.wwsw.
......`,
  map`
fww........s...
..w.wswwss.w.w.
w.w.s....w.w.w.
s.w.w.ww.w.w.w.
..s.w.wp.s...s.
.s....wwwwswww.
.w.wwww......w.
.w......swww.w.
.wswwwww....sw.
.........ws....`,
  map`
pw...w...s...sfs
.w.w.w.w.w.w.s..
.w.w.w.w.w.w.ss.
.w.w.w.w.w.w.s..
.w.w.w.w.w.w.s.s
.w.w.w.w.w.w.s..
.w.w.w.w.w.w.ss.
.w.w.w.w.w.w....
.w.w.w.w.w.wswws
.w.w.w.w.s......
.w.w.w.w.wwwwww.
.w.w.w.w........
.w.w.w.wswwwwwws
.w.w.s..........
.w.w.wwwwwwwwww.
...w............`,
  map`
p....................
swwwwwwwwwwwwwwwwwww.
...................s.
.wswwwwwwwwwwwwwww.w.
.w...............s.w.
.w.wswwwwwwwwwww.w.w.
.w.w...........s.w.w.
.w.w.wswwwwwww.w.w.w.
.w.w.w.......s.w.w.w.
.w.w.w.wwwsw.w.w.w.w.
.w.w.w.s...w.w.w.w.w.
.w.w.w.w.w.w.w.w.w.w.
.w.w.w.wfs...w.w.w.w.
.w.w.w.wwwwwsw.w.w.w.
.w.w.s.........w.w.w.
.w.w.wwwwwwwwwsw.w.w.
.w.s.............w.w.
.w.wwwwwwwwwwwwwsw.w.
.s.................w.
.wwwwwwwwwwwwwwwwwsw.
.....................`,
  map`
f..s...s..............p
ss.s.s.s.ssss.sss.ssss.
.s...s.s.s......s.s....
.sssss.ssssssss.s.s.sss
.......d.s...s..s.s....
sssss.ss...s...ss.ssss.
....s.sssssssssssss....
.ss.s.s.........s.s.sss
.ss.s.s.sssssssss.s....
.ssss.s...........ssss.
.s.s..s.s.sssssss.s....
.s.ssssss.s.....s.s.sss
.s..s...s.s.sssss.s....
.s.ss.s.s.s.s...s.ss.s.
.s..s.s...s.s.s.s....s.
.ss...s.sss.sss.ssssss.
.s..s.s.s..............
.ss.s.s.s.ssssssss.ssss
....s.s.s........s.....
.ssss.s.sssssssssssssss
......s...............k`,
  map`
.......................................
.......................................
.......................................
.....ww......ww...wwwww...ww...ww......
.....ww......ww..wwwwwww..ww...ww......
.....ww......ww..ww...ww..ww...ww......
.....ww......ww..ww...ww..ww...ww......
.....ww......ww..ww...ww..ww...ww......
.....www....www..ww...ww..ww...ww......
......wwwwwwww...ww...ww..ww...ww......
.......wwwwww....ww...ww..ww...ww......
.........ww......ww...ww..ww...ww......
.........ww......ww...ww..www.www......
.........ww......wwwwwww..wwwwwww......
.........ww.......wwwww....wwwww.......
.........ww............................
.......................................
.......................................
...................ww..................
......ww...w...ww..ww..ww.....ww.......
......ww...w...ww......www....ww.......
......www.www.www..ww..wwww...ww.......
.......ww.www.ww...ww..wwwww..ww.......
.......wwwwwwwww...ww..ww.www.ww.......
........www.www....ww..ww..wwwww.......
........www.www....ww..ww...wwww.......
.........w...w.....ww..ww....www.......
.........w...w.....ww..ww.....ww.......
.......................................
.......................................`
];

setMap(levels[level]);

onInput("s", () => {
  getFirst(player).y += 1
});

onInput("w", () => {
  getFirst(player).y -= 1
});

onInput("a", () => {
  getFirst(player).x -= 1
});

onInput("d", () => {
  getFirst(player).x += 1
});

afterInput(() => {
  const gotSpiked = tilesWith(spikes, player).length
  if (gotSpiked === 1) {
    level = 0
    setMap(levels[level]);
  }
  const gotKey = tilesWith(key, player).length
  if (gotKey === 1) {
    setSolids([ player, wall ]);
  }
  const numberCovered = tilesWith(finnish, player).length;
  if (numberCovered === 1) {
     level = level + 1;
     setMap(levels[level]);
     setSolids([ player, wall, lock ]); 
  }
});
