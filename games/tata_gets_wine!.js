/*
@title: tata_gets_wine!
@author: tata



const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
................
................
..........0000..
..000000.003300.
.0033330.0333300
0033333000333330
0333333303333330
0333333333333330
0333330330333330
0333333333333330
0333336666333300
003333000033330.
.00333666633300.
..000333333300..
....003333000...
.....000000.....`],
  [ box, bitmap`
................
................
.....00000......
.......0........
......4444......
.....D4D4D4.....
....4444444D....
...44D4040444...
...4444D44D44...
....D44000444...
.....44D4D44....
.....D44444D....
......4D444.....
.......444......
................
................`],
  [ goal, bitmap`
................
...........H....
..........H.....
...........H....
....2....H22....
....2......2....
....2HHHHHH2....
....2HHHHHH2....
....22HHHH2.....
.....222222.....
.......22.......
.......22.......
....22222222....
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
0000000000000000`],
  
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
p..g
.b..
....
....`,
  map`
p...
...b
....
...g`,
  map`
...
.p.
..b`,
  map`
.....
pb...
.....
.....
...g.`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  [player]: []
});

// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => {
  getFirst(box).y += 1;
});

onInput("d", () => {
  getFirst(box).x += 1;
});

onInput("w", () => {
  getFirst(box).y -= 1;
});

onInput("a", () => {
  getFirst(box).x -= 1;
});

// Create a tune:
const melody = tune`
16000`

// Play it:
playTune(melody)

// Play it 5 times:
playTune(melody, 5)

// Play it until the heat death of the universe:
const playback = playTune(melody, Infinity)

// Or make it shut up early:
playback.end()

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
  const numberCovered = tilesWith(goal, box).length;

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
