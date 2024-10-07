/*
@title: LUCK
@author: Ethan
@tags: ['puzzle']
@addedOn: 2022-09-28
*/

const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
....44444444....
...44466666444..
..446664446644..
.4466447744664..
.4467777777464..
..460.77770044..
...40.0.0..04...
....0......0....
....0..3...0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................`],
  [ box, bitmap`
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
  [ goal, bitmap`
................
................
................
....000000......
...00....00.....
...0......0.....
...0.......0....
...0.......0....
...0.......0....
...00......0....
....0......0....
....00....00....
.....000000.....
................
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
.b.
pwg
.w.`,
  map`
p.wg
..w.
..w.
..b.`,
  map`
pw..
bww.
..bb
..wg`,
  map`
pbg
.b.
.b.`,
  map`
p..w
..w.
.w..
b..g`
];

const mel = tune`
250: g5~250,
250: f5~250,
250: e5~250,
250: d5~250,
250: e5~250,
250: d5~250,
250: c5~250,
250: b4~250,
250: c5~250,
250: d5~250,
250: c5~250,
250: b4~250,
250: a4~250,
250,
250: g5~250,
250,
250: f5~250,
250: e5~250,
250: d5~250,
250: c5~250,
250: d5~250,
250: c5~250,
250: b4~250,
250: a4~250,
250: b4~250,
250: c5~250,
250: d5~250,
250: e5~250,
250: f5~250,
250,
250: g5~250,
250`;
playTune(mel, Infinity);

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, wall ]);

// START - PLAYER MOVEMENT CONTROLS

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

// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;

  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, player).length;

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
