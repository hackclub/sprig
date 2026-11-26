/*
@title: Nabokos
@description: Sokoban, but in reverse: your movements are inverted!
@author: Tony Hsu
@tags: ['game', 'sokoban']
@addedOn: 2026-11-26
*/

const player = "p";
const p2 = "t";
const box = "b";
const goal = "g";
const wall = "w";
const trail = "r";
const inputSound = tune`
500: G4~500 + F4^500,
15500`;
const completeSound = tune`
209.7902097902098: B4~209.7902097902098 + C5^209.7902097902098 + D5~209.7902097902098,
209.7902097902098: E5^209.7902097902098 + C5^209.7902097902098 + D5~209.7902097902098,
6293.706293706294`;
const music = tune`
209.7902097902098: C5~209.7902097902098 + B4^209.7902097902098,
209.7902097902098: D5~209.7902097902098 + C5^209.7902097902098,
209.7902097902098: E5~209.7902097902098 + D5^209.7902097902098,
209.7902097902098: C5~209.7902097902098 + B4^209.7902097902098,
209.7902097902098: A5^209.7902097902098 + G5^209.7902097902098,
209.7902097902098,
209.7902097902098: A5^209.7902097902098 + G5^209.7902097902098,
209.7902097902098: G5^209.7902097902098 + F5^209.7902097902098,
209.7902097902098,
209.7902097902098: C5~209.7902097902098 + B4^209.7902097902098,
209.7902097902098: D5~209.7902097902098 + C5^209.7902097902098,
209.7902097902098: E5~209.7902097902098 + D5^209.7902097902098,
209.7902097902098: C5~209.7902097902098 + B4^209.7902097902098,
209.7902097902098: G5^209.7902097902098 + F5^209.7902097902098,
209.7902097902098,
209.7902097902098: G5^209.7902097902098 + F5^209.7902097902098,
209.7902097902098: F5^209.7902097902098 + E5^209.7902097902098,
209.7902097902098,
209.7902097902098: C5~209.7902097902098 + B4^209.7902097902098,
209.7902097902098: D5~209.7902097902098 + C5^209.7902097902098,
209.7902097902098: E5~209.7902097902098 + D5^209.7902097902098,
209.7902097902098: C5~209.7902097902098 + B4^209.7902097902098,
209.7902097902098: F5^209.7902097902098 + E5^209.7902097902098,
209.7902097902098,
209.7902097902098: G5^209.7902097902098 + F5^209.7902097902098,
209.7902097902098: E5^209.7902097902098 + D5^209.7902097902098,
209.7902097902098,
209.7902097902098: B4~209.7902097902098 + A4^209.7902097902098,
209.7902097902098: A4~209.7902097902098 + G4^209.7902097902098,
209.7902097902098,
209.7902097902098: D5~209.7902097902098,
209.7902097902098: C5~209.7902097902098`;
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
.b..
..w.
....`,
  map`
pw..
.w.b
....
gb.g`,
  map`
p.wt
.bwg
....
..bg`,
  map`
gwg...g
.w.bw.g
.b..w.b
p...b..
.bwgww.
.b.....
..bgw.g`,
  map`
g.w.p
..wb.
..b..
.t.w.
g.b.g`,
];

let finished = false;
let level = 0;
let currentLevel = levels[level];

setLegend(
  [player, bitmap`
................
................
................
.......3........
.....33.333.....
....3.....33....
....3.3.3..3....
....3......3....
....3.333..3....
....33....3.....
......33333.....
......3...3.....
....333...333...
................
................
................`],
  [p2, bitmap`
................
.......55.......
.......55.......
.......55.......
.....555555.....
....5.....55....
....5.5.5..5....
....5......5....
....5......5....
....55....5.....
......55555.....
......55..5.....
....555...5555..
................
................
................`],
  [box, bitmap`
................
................
................
...00000000000..
...0FFFFLFFFF0..
...0FFFFLFFFF0..
...0FFFFLFFFF0..
...0FFFFLFFFF0..
...L111111111L..
...0FFFFLFFFF0..
...0FFFFLFFFF0..
...0FFFFLFFFF0..
...0FFFFLFFFF0..
...00000000000..
................
................`],
  [goal, bitmap`
................
................
................
....4444444.....
...444...444....
...44.....44....
...4...4...4....
...4..444..4....
...4..444..4....
...4...4...4....
...44.....44....
...444...444....
....4444444.....
................
................
................`],
  [wall, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [trail, bitmap`
................
................
................
................
........6.......
.......666......
.....6666666....
......66666.....
......66.66.....
.....66...66....
................
................
................
................
................
................`],
);
setMap(currentLevel);
setSolids([player, p2, box, wall]);
setPushables({
  [player]: [box],
  [p2]: [box],
});
addText(`Level: ${level+1}`, { x: 1, y: 1, color: color`7` });

playTune(music);
setInterval(() => playTune(music), 7500);

onInput("w", () => {
  const pos = getFirst(player);
  addTrail(pos);
  pos.y += 1;
});

onInput("a", () => {
  const pos = getFirst(player);
  addTrail(pos);
  pos.x += 1;
});

onInput("s", () => {
  const pos = getFirst(player);
  addTrail(pos);
  pos.y -= 1;
});

onInput("d", () => {
  const pos = getFirst(player);
  addTrail(pos);
  pos.x -= 1;
});

onInput("i", () => {
  const pos = getFirst(p2);
  if (pos) {
    addTrail(pos);
    pos.y += 1;
  }
});

onInput("j", () => {
  const pos = getFirst(p2);
  if (pos) {}
  if (pos && !finished) {
    addTrail(pos);
    pos.x += 1;
  } else {
    if (finished) {
      level = 0;
      finished = false;
    }
    clearText("");
    setMap(levels[level]);
    addText(`Level: ${level+1}`, { x: 1, y: 1, color: color`7` });
  }
});

onInput("k", () => {
  const pos = getFirst(p2);
  if (pos) {
    addTrail(pos);
    pos.y -= 1;
  }
});

onInput("l", () => {
  const pos = getFirst(p2);
  if (pos) {
    addTrail(pos);
    pos.x -= 1;
  }
});

afterInput(() => {
  const targetNumber = tilesWith(goal).length;
  const numberCovered = tilesWith(goal, box).length;
  if (numberCovered === targetNumber) {
    playTune(completeSound);
    level = level + 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
      addText(`Level: ${level+1}`, { x: 1, y: 1, color: color`7` });
    } else {
      finished = true;
      addText("You win!", { y: 4, color: color`3` });
      addText("Press j to", { y: 7, color: color`5` });
      addText("play again!", { y: 9, color: color`5` });
    }
  } else {
    playTune(inputSound);
  }
});

function addTrail(pos) {
  const [px, py] = [pos.x, pos.y];
  addSprite(pos.x, pos.y, "r");
  setTimeout(() => {
    const tile = getTile(px, py);
    clearTile(px, py);
    if (tile.find(i => i.type == "g")) addSprite(px, py, goal);
    if (tile.find(i => i.type == "w")) addSprite(px, py, wall);
    if (tile.find(i => i.type == "b")) addSprite(px, py, box);
    if (tile.find(i => i.type == "p")) addSprite(px, py, player);
    if (tile.find(i => i.type == "t")) addSprite(px, py, p2);
  }, 500);
}