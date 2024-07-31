/*
@title: Platformer_Game
@author: Adya
@tags: []
@addedOn: 2024-31-07
*/

const player = "p";
const platform = "x";
const goal = "g";

setLegend(
  [player, bitmap`
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.0.0..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................`],
  [platform, bitmap`
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
  [goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................`]
);

let level = 0;

const levels = [
  map`
    p...
    .x..
    .x..
    .xg.
  `
];

const currentLevel = levels[level];
setMap(currentLevel);


setPushables({
  [player]: []
})

onInput("w", () => {
  getFirst(player).y -= 1; // Jump
});

onInput("a", () => {
  getFirst(player).x -= 1; // Move left
});

onInput("d", () => {
  getFirst(player).x += 1; // Move right
});

setInterval(() => {
  const p = getFirst(player);
  if (p && !getTile(p.x, p.y + 1).some(t => t.type === platform)) {
    p.y += 1; // Apply gravity
  }
}, 100);

afterInput(() => {
  const p = getFirst(player);
  if (p && getTile(p.x, p.y).some(t => t.type === goal)) {
    level += 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
  }
});