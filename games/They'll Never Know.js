/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: They'll Never Know
@description: Based off of Among Us. After the murder, how well can the evidence be hid so that the crew mates will never know?
@author: Livie
@tags: []
@addedOn: 2026-07-11
*/

const player = "p"
const vent = "v";
const box = "b";
const wall = "w";

setLegend(
  [player, bitmap`
................
................
................
................
.......000......
......0HHH0.....
.....00HH070....
....0H0HH050....
.....00HHH0.....
......0H0H0.....
......0H0H0.....
.......0.0......
................
................
................
................`],
  [vent, bitmap`
................
................
................
.1111111111111..
.1L1L1L1L1L1L1..
.1L1L1L1L1L1L1..
.1L1L1L1L1L1L1..
.1L1L1L1L1L1L1..
.1L1L1L1L1L1L1..
.1L1L1L1L1L1L1..
.1L1L1L1L1L1L1..
.1L1L1L1L1L1L1..
.1L1L1L1L1L1L1..
.1111111111111..
................
................`],
  [box, bitmap`
................
................
................
...........13...
..........113...
.........113....
........1113....
.......1111L....
......1111L.....
.....0011L......
....000LL.......
...000..........
...00...........
................
................
................`],
  [wall, bitmap`
1111LLLL00001111
1111LLLL00001111
L00001111LLLL000
L00001111LLLL000
11LLLL00001111LL
11LLLL00001111LL
0001111LLLL00001
0001111LLLL00001
LLLL00001111LLLL
LLLL00001111LLLL
01111LLLL0000111
01111LLLL0000111
LL00001111LLLL00
LL00001111LLLL00
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
);
setSolids([player, box, wall]);

let level = 0;
const levels = [map`
p..ww
.b..w
ww...
.....
w...v`,
  map`
p.w..
.bwvw
....w
..bv.
wwwww`,
  map`
..ww.
...b.
v.p.v
.b...
.ww..`,
  map`
p....
.bw..
..ww.
.....
ww..v`,
  map`
....v
.....
pbwww
....w
.b..v`,
  map`
w....
w.ww.
w.pw.
wwww.
vb...`,
  map`
v...p
wwbwb
.w.w.
.w...
....v`,
  map`
v...w
.wb.w
p....
ww.b.
v...w`,
  map`
.w.w.
.w...
.bvw.
.w.wb
p..wv`,
  map`
w...w
w.b..
vwp..
.b.wv
...ww`,
  map`
ww...
p.b..
.ww.w
ww...
....v`,
 map`
p.w.w
wbwvw
w...w
..b..
v....`,
 map`
ww...
vw.b.
.wwwv
.b.w.
....p`,
 map`
v.b.v
.pw..
bwwwb
..w..
v.b.v`,
map`
...ww
.b.wv
ww.b.
wv...
wpw..`,
map`
wwwp.
v.w..
..ww.
...b.
..www`,
map`
...ww
v.b.w
wwp..
v.b.w
...ww`,
map`
....w
..b.w
vw..w
ww.ww
p..w.`,
map`
v..b.
..ww.
.wp..
.www.
.b..v`,
map`
w...w
.....
..w..
.bw.p
..wv.`,
map`
.....
.....
..p..
.....
.....`,
]

setMap(levels[level])

setPushables({
  [player]: [box]
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("l", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) setMap(currentLevel);
})

onInput("i", () => {
  addText("W - Up  A - Left", { y: 0, color: color`3` });
  addText("S - Down D - Right", { y: 2, color: color`3` });
  addText("L - Restart Level", { y: 4, color: color`3` });
})

onInput("k", () => {
  clearText()
})

afterInput(() => {
  const numberCovered = tilesWith(vent, box).length;
  const targetNumber = tilesWith(vent).length;

  if (numberCovered === targetNumber) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) setMap(currentLevel);

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("Vous Gagnez!", { y: 2, color: color`3` });
    }
  }
});