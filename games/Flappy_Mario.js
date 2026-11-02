/*
@title: Flappy Mario
@author: Arjun
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

const GAP = 3;      // how tall the hole is
const SPACING = 8;  // ticks between pipes

let score = 0;
let dead = false;

setMap(level);

// is Mario standing inside a pipe right now?
function hitPipe(m) {
  return getTile(m.x, m.y).some(s => s.type === pipe);
}

// flap
function flap() {
  if (dead) {
    // restart
    dead = false;
    score = 0;
    setMap(level);
    clearText();
    return;
  }
  const m = getFirst(mario);
  m.y -= 2;

  // flapping into a pipe counts too
  if (hitPipe(m)) die();
}

["w", "a", "s", "d", "i", "j", "k", "l"].forEach(k => onInput(k, flap));

// make a pipe on the right with a hole in it
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

  // gravity
  m.y += 1;

  // fell off the bottom
  if (m.y > 7) {
    m.y = 7;
    die();
    return;
  }

  // fell into a pipe
  if (hitPipe(m)) {
    die();
    return;
  }

  // move pipes
  getAll(pipe).forEach(p => {
    if (p.x === 0) {
      // the bottom block of every pipe is always there, so count once per pipe
      if (p.y === 7) {
        score++;
        clearText();
        addText("" + score, { x: 1, y: 1, color: color`0` });
      }
      p.remove();
    } else p.x -= 1;
  });

  // new pipe every SPACING ticks
  if (t % SPACING === 0) makePipe();

  // a pipe moved into Mario?
  if (hitPipe(m)) die();
}, 250);

function die() {
  dead = true;
  addText("u died lol", { x: 5, y: 6, color: color`0` });
  addText("score: " + score, { x: 5, y: 8, color: color`0` });
}
