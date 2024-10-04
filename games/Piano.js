/*
@title: Piano
@author: Scott
@tags: ['simulation']
@addedOn: 2022-09-14

Instructions:

Use A & D to move the arrow, press W to play note
*/

// notes
const c = tune`
500,
500: c4^500,
15000`;
const d = tune`
500,
500: d4^500,
15000`;
const e = tune`
500,
500: e4^500,
15000`;
const f = tune`
500,
500: f4^500,
15000`;
const g = tune`
500,
500: g4^500,
15000`;
const a = tune`
500,
500: a4^500,
15000`;
const b = tune`
500,
500: b4^500,
15000`;
const high_c = tune`
500,
500: c5^500,
15000`;

const arrow = "a";
const wall = "w";

setLegend(
  [ arrow, bitmap`
................
................
................
................
.......00.......
......0000......
.....000000.....
.......00.......
.......00.......
.......00.......
.......00.......
................
................
................
................
................`],
  [ "_", bitmap`
2222222222220000
2222222222220000
2222222222220000
2222222222220000
2222222222220000
2222222222220000
2222222222220000
2222222222220000
2222222222220000
2222222222220000
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [ "b", bitmap`
0022222222222200
0022222222222200
0022222222222200
0022222222222200
0022222222222200
0022222222222200
0022222222222200
0022222222222200
0022222222222200
0022222222222200
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [ "c", bitmap`
0000222222222222
0000222222222222
0000222222222222
0000222222222222
0000222222222222
0000222222222222
0000222222222222
0000222222222222
0000222222222222
0000222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
);

setBackground(wall)

let level = map`
_bc_bbc_
a.......`;

setMap(level);

setSolids([ arrow, wall ]);

setPushables({
  [arrow]: []
});

// FUNCTIONS

function playSound(x) {
  if (x == 0) {
    playTune(c);
  } else if (x == 1) {
    playTune(d);
  } else if (x == 2) {
    playTune(e);
  } else if (x == 3) {
    playTune(f);
  } else if (x == 4) {
    playTune(g);
  } else if (x == 5) {
    playTune(a);
  } else if (x == 6) {
    playTune(b);
  } else if (x == 7) {
    playTune(high_c);
  }
};

// START - PLAYER MOVEMENT CONTROLS

onInput("a", () => {
  getFirst(arrow).x -= 1;
});

onInput("d", () => {
  getFirst(arrow).x += 1;
});

onInput("w", () => {
  playSound(getFirst(arrow).x);
});

// END - PLAYER MOVEMENT CONTROLS
