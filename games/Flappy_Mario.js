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

let score = 0;
let dead = false;

setMap(level);

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
  getFirst(mario).y -= 2;
}

["w", "a", "s", "d", "i", "j", "k", "l"].forEach(k => onInput(k, flap));

// make a pipe on the right with a hole in it
function makePipe() {
  const hole = Math.floor(Math.random() * 6);
  for (let i = 0; i < 8; i++) {
    if (i !== hole && i !== hole + 1) addSprite(9, i, pipe);
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

  // move pipes
  getAll(pipe).forEach(p => {
    if (p.x === 0) p.remove();
    else p.x -= 1;
  });

  // new pipe every 6 ticks
  if (t % 6 === 0) makePipe();

  // hit a pipe?
  getTile(m.x, m.y).forEach(s => {
    if (s.type === pipe) die();
  });

  // score
  if (t % 6 === 3 && t > 20) {
    score++;
    clearText();
    addText("" + score, { x: 1, y: 1, color: color`0` });
  }
}, 250);

function die() {
  dead = true;
  addText("u died lol", { x: 5, y: 6, color: color`0` });
  addText("score: " + score, { x: 5, y: 8, color: color`0` });
}
