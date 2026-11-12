/*
@title: Flappy Mario
@author: Arjun
@description: Mario and Flappy Bird mashed into one game! First you jump over blocks like Mario, then you flap through pipes like Flappy Bird, then back to Mario, then Flappy again, forever. Press any button to jump or flap.
@tags: ['arcade']
@addedOn: 2026-10-19
*/

const mario = "m";
const pipe = "p";
const block = "b";
const ground = "g";
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
  [block, bitmap`
0000000000000000
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0000000000000000`],
  [ground, bitmap`
4444444444444444
4444444444444444
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

const GAP = 3;          // how tall the hole in a pipe is
const SPACING = 8;      // ticks between pipes
const GOAL_MARIO = 8;   // blocks to jump before we switch to flappy
const GOAL_FLAPPY = 6;  // pipes to pass before we switch to mario

let mode = "mario";     // "mario" or "flappy"
let score = 0;
let dead = false;
let t = 0;              // ticks in this stage
let count = 0;          // blocks or pipes passed in this stage
let jump = 0;           // how many ticks Mario still goes up
let pause = 0;          // little break between stages

setMap(level);

// is Mario inside a pipe or a block right now?
function hit(m) {
  return getTile(m.x, m.y).some(s => s.type === pipe || s.type === block);
}

function showScore() {
  clearText();
  addText("" + score, { x: 1, y: 1, color: color`0` });
}

// start a new stage (mario or flappy)
function startStage(newMode) {
  mode = newMode;
  t = 0;
  count = 0;
  jump = 0;
  pause = 8;  // 2 seconds

  // clean up everything from the last stage
  getAll(pipe).forEach(s => s.remove());
  getAll(block).forEach(s => s.remove());
  getAll(ground).forEach(s => s.remove());

  const m = getFirst(mario);
  showScore();

  if (mode === "mario") {
    for (let x = 0; x < 10; x++) addSprite(x, 7, ground);
    m.y = 6;
    addText("MARIO TIME!", { x: 4, y: 5, color: color`0` });
    addText("jump over blocks", { x: 2, y: 7, color: color`0` });
  } else {
    m.y = 3;
    addText("FLAPPY TIME!", { x: 4, y: 5, color: color`0` });
    addText("fly through pipes", { x: 1, y: 7, color: color`0` });
  }
}

// any button
function flap() {
  if (pause > 0) return;

  if (dead) {
    // restart
    dead = false;
    score = 0;
    setMap(level);
    startStage("mario");
    return;
  }

  const m = getFirst(mario);

  if (mode === "mario") {
    // jump, but only from the ground
    if (m.y === 6 && jump === 0) jump = 2;
  } else {
    m.y -= 2;
    // flapping into a pipe counts too
    if (hit(m)) die();
  }
}

["w", "a", "s", "d", "i", "j", "k", "l"].forEach(k => onInput(k, flap));

// make a pipe on the right with a hole in it
function makePipe() {
  const hole = Math.floor(Math.random() * (8 - GAP));
  for (let i = 0; i < 8; i++) {
    if (i < hole || i >= hole + GAP) addSprite(9, i, pipe);
  }
}

// what happens every tick in the mario stage
function marioTick(m) {
  // going up or coming down
  if (jump > 0) {
    m.y -= 1;
    jump -= 1;
  } else if (m.y < 6) {
    m.y += 1;
  }
  if (hit(m)) {
    die();
    return;
  }

  // move blocks to the left
  getAll(block).forEach(b => {
    if (b.x === 0) {
      b.remove();
      score++;
      count++;
      showScore();
    } else b.x -= 1;
  });
  if (hit(m)) {
    die();
    return;
  }

  // new block every 6 ticks (sometimes we skip one)
  if (t % 6 === 0 && Math.random() < 0.8) addSprite(9, 6, block);

  if (count >= GOAL_MARIO) startStage("flappy");
}

// what happens every tick in the flappy stage
function flappyTick(m) {
  // gravity
  m.y += 1;
  if (hit(m)) {
    die();
    return;
  }

  // move pipes to the left
  getAll(pipe).forEach(p => {
    if (p.x === 0) {
      // the bottom block of every pipe is always there, so count once per pipe
      if (p.y === 7) {
        score++;
        count++;
        showScore();
      }
      p.remove();
    } else p.x -= 1;
  });
  if (hit(m)) {
    die();
    return;
  }

  // new pipe every SPACING ticks
  if (t % SPACING === 0) makePipe();

  if (count >= GOAL_FLAPPY) startStage("mario");
}

setInterval(() => {
  if (dead) return;

  // short break between stages
  if (pause > 0) {
    pause--;
    if (pause === 0) showScore();
    return;
  }

  t++;
  const m = getFirst(mario);

  if (mode === "mario") marioTick(m);
  else flappyTick(m);
}, 250);

function die() {
  dead = true;
  addText("u died lol", { x: 5, y: 6, color: color`0` });
  addText("score: " + score, { x: 5, y: 8, color: color`0` });
}

startStage("mario");
