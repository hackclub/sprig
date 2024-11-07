/*
@title: The game of life
@author: Jules Pouvreaux
@tags: []
@addedOn: 2024-00-00

----------------------------------

W, A, S, D : Movement
I, K       : Speed +/-
J          : Reset
L          : Switch tile state

----------------------------------
*/

const outcomes = "B3/S23";
var fps = 0;

const sel = "s";
const living = "l";
const dead = "d";

setLegend(
  [sel, bitmap`
HHHHHHHHHHHHHHHH
HH............HH
HH............HH
HH............HH
HH............HH
HH............HH
HH............HH
HH............HH
HH............HH
HH............HH
HH............HH
HH............HH
HH............HH
HH............HH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [living, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [dead, bitmap`
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

setSolids([]);

const maparr = map`
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd`.trim().split('');
setMap(maparr.join(''));
addSprite(0, 0, sel);

const maparr_get = (x, y) => maparr[y * (width() + 1) + x];
const maparr_set = (x, y, c) => maparr[y * (width() + 1) + x] = c;

function maparr_render() {
  const { x: cx, y: cy } = getFirst(sel);
  setMap(maparr.join(''));
  addSprite(cx, cy, sel);
}

getFirst(sel).y = 15;
getFirst(sel).x = 19;

const deadOutcomes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const livingOutcomes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
{
  const [dO, lO] = outcomes.split("/").map(part => part.substring(1));
  dO.split("").forEach(num => deadOutcomes[parseInt(num)] = 1);
  lO.split("").forEach(num => livingOutcomes[parseInt(num)] = 1);
}

function step() {
  const livingNeighborMap = new Uint8Array(width() * height());
  const index = (x, y) => y * width() + x;

  const livingNeighborMapAdd = (x, y) => {
    if (x < 0 || y < 0 || x >= width() || y >= height()) return;
    livingNeighborMap[index(x, y)] += 1;
  }

  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      if (maparr_get(x, y) === living) {
        livingNeighborMapAdd(x + 1, y - 1);
        livingNeighborMapAdd(x + 1, y);
        livingNeighborMapAdd(x + 1, y + 1);
        livingNeighborMapAdd(x, y - 1);
        livingNeighborMapAdd(x, y + 1);
        livingNeighborMapAdd(x - 1, y - 1);
        livingNeighborMapAdd(x - 1, y);
        livingNeighborMapAdd(x - 1, y + 1);
      }
    }
  }

  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      const livingNeighbors = livingNeighborMap[index(x, y)];
      const type = maparr_get(x, y);

      if (type === living && livingOutcomes[livingNeighbors] === 0) {
        maparr_set(x, y, dead);
      } else if (type === dead && deadOutcomes[livingNeighbors] === 1) {
        maparr_set(x, y, living);
      }
    }
  }

  maparr_render();
}

let interval;
let running = false;

function game() {
  if (running) {
    step();
    setTimeout(game, 1000 / fps);
  } else {
    setTimeout(game, 1000);
  }
}

game();

onInput("w", () => getFirst(sel).y -= 1);
onInput("a", () => getFirst(sel).x -= 1);
onInput("s", () => getFirst(sel).y += 1);
onInput("d", () => getFirst(sel).x += 1);
onInput("i", () => {
  fps = Math.min(fps + 1, 100);
  running = true;
});
onInput("j", () => {
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      maparr_set(x, y, dead);
    }
  }
  maparr_render();
});
onInput("k", () => {
  fps = Math.max(fps - 1, 0);
  if (fps <= 0) {
    running = false;
  }
});
onInput("l", () => {
  const { x, y } = getFirst(sel);
  maparr_set(x, y, maparr_get(x, y) === living ? dead : living);
  maparr_render();
});