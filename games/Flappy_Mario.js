/*
@title: Flappy Mario
@author: Arjun Pai
@description: A very bad Flappy Mario. Mario is a red blob. Press any button to flap. Don't touch the green stuff.
@tags: ['arcade']
@addedOn: 2026-10-19
*/
const mario = "m";
const pipe = "p";
const sky = "s";

setLegend(
  [mario, bitmap`
................
................
....33333333....
...3333333333...
...3333333333...
...3330330333...
...3333333333...
...3333333333...
....33333333....
................
................
................
................
................
................
................`],
  [pipe, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [sky, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`]
);

setBackground(sky);

const level = map`
..........
..........
..........
..m.......
..........
..........
..........
..........`;

const GAP = 3;
const SPACING = 8;

let score = 0;
let dead = false;

setMap(level);

function hitPipe(m) {
  return getTile(m.x, m.y).some(s => s.type === pipe);
}

function flap() {
  if (dead) {

    dead = false;
    score = 0;
    setMap(level);
    clearText();
    return;
  }
  const m = getFirst(mario);
  m.y -= 2;

  if (hitPipe(m)) die();
}

["w", "a", "s", "d", "i", "j", "k", "l"].forEach(k => onInput(k, flap));

function makePipe() {
  const hole = Math.floor(Math.random() * (8 - GAP));
  for (let i = 0; i < 8; i++) {
    if (i < hole || i >= hole + GAP) addSprite(9, i, pipe);
  }
}

let t = 0;
setInterval(() => {
  if (dead) return;
  t++;

  const m = getFirst(mario);

  m.y += 1;

  if (m.y >= 7) {
    die();
    return;
  }

  if (hitPipe(m)) {
    die();
    return;
  }

  getAll(pipe).forEach(p => {
    if (p.x === 0) {

      if (p.y === 7) {
        score++;
        clearText();
        addText("" + score, { x: 1, y: 1, color: color`0` });
      }
      p.remove();
    } else p.x -= 1;
  });

  if (t % SPACING === 0) makePipe();

  if (hitPipe(m)) die();
}, 250);

function die() {
  dead = true;
  addText("u died lol", { x: 5, y: 6, color: color`0` });
  addText("score: " + score, { x: 5, y: 8, color: color`0` });
}
