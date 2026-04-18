/*
@title: Push
@author: Jibran
*/

const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const win = "k";

setLegend(
  [ player, bitmap`
................
................
................
.......44.......
.....44..44.....
....4......4....
....4.4.4..4....
....4......4....
....4......4....
.....4....4.....
......44444.....
......4...4.....
.....44...44....
................
................
................`],
  [ box, bitmap`
................
................
................
...CCCCFFFCCCC..
...CCCCFFFCCCC..
...CCCCFFFCCCC..
...CCCCFFFCCCC..
...CCCCFFFCCCC..
...FFFFCFCFFFF..
...FFFFFCFFFFF..
...FFFFCFCFFFF..
...CCCCFFFCCCC..
...CCCCFFFCCCC..
...CCCCFFFCCCC..
................
................`],
  [ goal, bitmap`
................
................
................
.....6666.......
....666666......
...66666666.....
..6666666666....
..6666666666....
..6666666666....
..6666666666....
...66666666.....
....666666......
.....6666.......
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
  [ win, bitmap`
................
................
................
................
..0.0.000.0.0...
..000.0.0.0.0...
...0..000.000...
................
..0...0.0.00....
..0.0.0.0.0.0...
...0.0..0.0.0...
................
................
................
................
................`],
);

let level = 0; 
const levels = [
  map`
..p.
.b.g
....`,
  map`
p..
.b.
..g`,
  map`
p.wg
.bw.
....
....`,
  map`
p...
...b
...b
.bbg`,
  map`
.k.
kpk
.k.`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  [player]: [box],
  [box]: [box]
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("j", () => {
  const currentLevel = levels[level]; 

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const targetNumber = tilesWith(goal).length;
  
  const numberCovered = tilesWith(goal, box).length;

  if (numberCovered === targetNumber) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
