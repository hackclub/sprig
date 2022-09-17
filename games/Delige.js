/*
@title: Delige
@author: Heritage

Instructions:

Cover the green object(hole) with blue object(box)

Only the black object(player) can push the box into the hole

Use w, a, s, d to move the player around and j to restart the level.

Get hacking!!!

*/

const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const melody = tune`
500,
500: c4~500 + f4~500 + e4~500,
500: c4~500 + f4~500,
500: c4~500 + f4~500 + e4~500,
500: c4~500 + f4~500 + e4~500,
500: c4~500 + d4~500 + f4~500,
500: d4~500 + c4~500,
500: d4~500 + c4~500,
500: d4~500 + c4~500,
500: d4~500 + c4~500,
500: e4~500 + c4~500,
500: e4~500 + c4~500,
500: e4~500 + c4~500,
500: e4~500 + c4~500,
500: e4~500 + f4~500 + c4~500 + d4~500,
500: f4~500 + d4~500,
500: f4~500 + d4~500,
500: f4~500 + g4~500 + d4~500,
500: g4~500 + d4~500,
500: g4~500 + d4~500,
500: g4~500 + d4~500,
500: g4~500 + a4~500 + d4~500 + f4~500,
500: a4~500 + d4~500 + f4~500,
500: a4~500 + d4~500 + f4~500,
500: a4~500 + d4~500 + f4~500 + c4~500,
500: a4~500 + b4~500 + d4~500 + f4~500 + c4~500,
500: b4~500 + f4~500 + c4~500,
500: b4~500 + f4~500 + g4~500 + c4~500,
500: b4~500 + g4~500 + c4~500,
500: b4~500 + g4~500 + f4~500 + c4~500,
500: b4~500 + a4~500 + f4~500 + c4~500,
500: a4~500 + g4~500 + f4~500 + e4~500 + d4~500`

setLegend(
  [ player, bitmap`
................
................
................
.......0........
.....00.00......
....0.....0.....
....0.0.0..0....
....0......0....
....0..0...0....
....00....0.....
......00000.....
......0...0.....
....000...000...
....0.......0...
................
................`],
  [ box, bitmap`
................
................
................
...555555555....
...5...5...5....
...5...5...5....
...555555555....
...5.......5....
...555555555....
...5...5...5....
...5...5...5....
...555555555....
................
................
................
................`],
  [ goal, bitmap`
................
................
................
.....4444444....
....444444444...
...444.....444..
...44.00000.44..
...44.04440.44..
...44.04.40.44..
...44.04440.44..
...44.00000.44..
...444.....444..
....444444444...
.....4444444....
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
0000000000000000`]
);

let level = 0;
const levels = [
   map`
p.bg`,
  map`
p..
.b.
..g`,
  map`
..w.
.bwg
....
p...`,
  map`
....g
.bbww
w....
g...p`,
  map`
p.w.
.bwg
....
..bg`,
  map`
..w
..w
gbg
.b.
.w.
bw.
g.p`,
  map`
.b.w....g.
...w..wwww
...w..g...
b........g
.ww.....w.
...bw...w.
pw..ww..w.
.w...wg.w.
.wb..w..w.`
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
      addText("You are a winner. Keep hacking!", { y: 5, color: [233, 116, 81] });
    }
    const playback = playTune(melody, Infinity)
  }
});
