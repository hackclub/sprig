/*
@title: Flappy Mario
@author: Arjun
@description: Mario and Flappy Bird mashed into one game! Run and jump over blocks like Mario with WASD (A D to move, W to jump). Then Mario flies into the blue sky for 3 seconds and the game turns into Flappy Bird, where any button flaps. Then it's back to Mario, forever.
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
const GOAL_MARIO = 8;   // blocks to get past before Mario flies away
const FLY_TICKS = 12;   // 12 ticks = 3 seconds of blue sky
const GOAL_FLAPPY = 6;  // pipes to pass before we switch to mario

let mode = "mario";     // "mario", "fly" or "flappy"
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

// start a new stage (mario, fly or flappy)
function startStage(newMode) {
  mode = newMode;
  t = 0;
  count = 0;
  jump = 0;
  pause = 0;

  // clean up everything from the last stage
  getAll(pipe).forEach(s => s.remove());
  getAll(block).forEach(s => s.remove());
  getAll(ground).forEach(s => s.remove());

  const m = getFirst(mario);
  m.x = 2;
  showScore();

  if (mode === "mario") {
    pause = 12;  // 3 seconds to read
    for (let x = 0; x < 10; x++) addSprite(x, 7, ground);
    m.y = 6;
    addText("MARIO TIME!", { x: 4, y: 3, color: color`0` });
    addText("A D move  W jump", { x: 2, y: 5, color: color`0` });
  } else if (mode === "fly") {
    // no ground, no blocks, just blue sky
    addText("FLAPPY TIME!", { x: 4, y: 3, color: color`0` });
    addText("get ready...", { x: 4, y: 4, color: color`0` });
  } else {
    m.y = 3;
  }
}

// a button was pressed
function press(key) {
  if (pause > 0 || mode === "fly") return;

  if (dead) {
    // restart
    dead = false;
    score = 0;
    setMap(level);
    startStage("mario");
    return;
  }

  const m = getFirst(mario);

  // flappy stage: every button flaps
  if (mode === "flappy") {
    m.y -= 2;
    // flapping into a pipe counts too
    if (hit(m)) die();
    return;
  }

  // mario stage: w jumps (only from the ground), a goes left, d goes right
  if (key === "w" || key === "i") {
    if (m.y === 6 && jump === 0) jump = 2;
  }
  if (key === "a" || key === "j") {
    m.x -= 1;
    if (hit(m)) die();
  }
  if (key === "d" || key === "l") {
    if (m.x < 8) m.x += 1;
    if (hit(m)) die();
  }
}

["w", "a", "s", "d", "i", "j", "k", "l"].forEach(k => onInput(k, () => press(k)));

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

  if (count >= GOAL_MARIO) startStage("fly");
}

// what happens every tick in the fly stage
function flyTick(m) {
  // Mario floats up into the sky, then bobs up and down
  if (m.y > 3) m.y -= 1;
  else if (t % 2 === 0) m.y = 4;
  else m.y = 3;

  // 3 seconds are over, time for flappy bird
  if (t >= FLY_TICKS) startStage("flappy");
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
  else if (mode === "fly") flyTick(m);
  else flappyTick(m);
}, 250);

function die() {
  dead = true;
  addText("u died lol", { x: 5, y: 6, color: color`0` });
  addText("score: " + score, { x: 5, y: 8, color: color`0` });
}

startStage("mario");
