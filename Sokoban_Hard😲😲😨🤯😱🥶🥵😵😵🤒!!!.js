/*
@title: Sokoban_Hard😲😲😨🤯😱🥶🥵😵😵🤒!!!
@author: P.Rama_Ganesh

Instructions:

Cover the green with purple.

Use w, a, s, d to move around and j to restart the level.

*/

const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
................
................
................
......3.........
....H6.4F9......
...9.....H6.....
...F.7.7..5.....
...4......3.....
...3.3030.7.....
...75....8......
.....D8C1D......
.....1...5......
...DDC...555....
................
................
................`],
  [ box, bitmap`
................
................
..CCCCCCCCCCCCC.
..C77777C77777C.
..C77777C77777C.
..C77777C77777C.
..C77777C77777C.
..C77777C77777C.
..CCCCCCCCCCCCC.
..C77777C77777C.
..C77777C77777C.
..C77777C77777C.
..C77777C77777C.
..C77777C77777C.
..CCCCCCCCCCCCC.
................`],
  [ goal, bitmap`
................
................
................
.....DDDDD......
....DDDDDDD.....
...DD22222DD....
...DD22222DD....
...DD22222DD....
...DD22222DD....
...DD22222DD....
....DDDDDDD.....
.....DDDDD......
................
................
................
................`],
  [ wall, bitmap`
CCC0CCC0CCC0CCC0
0000000000000000
C0CCC0CCC0CCC0CC
0000000000000000
CCC0CCC0CCC0CCC0
0000000000000000
C0CCC0CCC0CCC0CC
0000000000000000
CCC0CCC0CCC0CCC0
0000000000000000
C0CCC0CCC0CCC0CC
0000000000000000
CCC0CCC0CCC0CCC0
0000000000000000
C0CCC0CCC0CCC0CC
0000000000000000`]
);

let level = 0;
const levels = [
  map`
p...
www.
w...
wbwg
....
....`,
  map`
.....
.b.b.
www..
g..gp`,
  map`
......
p.....
.bwww.
...w..
..bgwg`,
  map`
...w
...w
.gbg
..b.
..w.
.bw.
.g.p`,
  map`
wwwwwwww
www...ww
wgpb..ww
www.bgww
wgwwb.ww
w.w.g.gw
wbbgbb.w
w...g..w
wwwwwwww`
];

const currentLevel = levels[level];
setMap(currentLevel);

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
  }
});

setSolids([ player, box, wall ]);

setPushables({
  [ player ]: [ box ]
});

afterInput(() => {
  const numberCovered = tilesWith(goal, box).length;
  const targetNumber = tilesWith(goal).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
