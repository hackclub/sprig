/*
@title: Astrovoid
@author: Aspen :D
@tags: ['endless']
@addedOn: 2023-01-23
*/

// Description: Avoid astroids by moving using WASD, pause the game using I


// ---------- Changeables ----------
// These values may be modified to change gameplay parameters

// Points at which more astroids will be added, array index 
// corresponds to number of astroids added per frame
// Value corresponds to at what score to add more
const levels = [
  30, // 2 astroids at score 30
  60, // 3 astroids at score 60
  90, // so on and so forth
  120,
  150,
  180
];

// The amount of miliseconds before the next frame is drawn
// Note: astroids are spawned every other frame
const updateInterval = 500;

// Changes how the astroids spawn
const seed = 123;

// ---------- STOP CHANGING HERE ----------
// Any changes made below this point affect other parts of the game


// -------------SETUP CODE-------------

const player = "p";
const background1 = "b";
const background2 = "c";
const astroid = "a"
const explosion = "e";

const e_sfx = tune`
64.1025641025641,
64.1025641025641: d4/64.1025641025641,
64.1025641025641: d4/64.1025641025641 + c4/64.1025641025641,
64.1025641025641: c4/64.1025641025641 + d4/64.1025641025641,
1794.871794871795`;
const music = tune`
250,
250: d5^250 + d4-250 + a5~250,
250: d5^250,
250: d5^250 + a5~250,
250: d4-250,
250: b4^250 + a5~250,
250,
250: a4^250 + d4-250 + a5~250,
250: a4^250,
250: a4^250 + a5~250,
250: d4-250,
250: g5~250,
250: c4/250,
250: c4/250 + a5~250,
250: c4/250,
250: c4/250 + a5~250,
250,
250: d4-250 + a5~250 + b4^250,
250: b4^250,
250: a5~250 + b4^250,
250: d4-250,
250: g5~250 + g4^250,
250,
250: g4^250 + g5~250 + e4-250,
250: g4^250,
250: g4^250 + g5~250,
250: c4-250,
250: g5~250,
250: c4/250,
250: d4/250 + g5~250,
250: d4/250,
250: c4/250 + g5~250`;
const death = tune`
254.23728813559322,
254.23728813559322: e5~254.23728813559322,
254.23728813559322,
254.23728813559322: a4~254.23728813559322,
254.23728813559322,
254.23728813559322: c4~254.23728813559322,
6610.169491525424`;
const menu_music = tune`
250,
250: c5-250 + c4~250 + f5/250,
250: f5/250,
250: c5-250 + c4~250,
250: a5^250,
250: c5-250 + c4~250 + f4^250,
250,
250: c4~250 + f4^250 + a5^250,
250: a4-250,
250: c4~250 + f4^250 + g5^250,
250: a4-250,
250: c4~250 + d5/250 + a5^250,
250: g4-250 + d5/250,
250: c4~250 + g5^250,
250: a4-250,
250: b4-250 + c4~250 + e5/250 + a5^250,
250: e5/250,
250: c5-250 + c4~250,
250: f4^250,
250: c5-250 + c4~250,
250: f4^250,
250: c5-250 + c4~250,
250: f4^250,
250: b4-250 + c4~250 + f5/250,
250: f5/250,
250: a4-250 + c4~250,
250: a4-250 + f4^250 + f5^250,
250: c4~250 + e4^250 + f5^250,
250: g4-250 + c5/250 + f5^250,
250: c4~250 + c5/250 + f5^250,
250: g4-250 + e5^250,
250: c4~250 + g4-250 + e5^250`;

setLegend(
  [ player, bitmap`
................
................
................
.......77.......
......7557......
.....751157.....
.....711117.....
....71111117....
...7112112117...
...7112112117...
..771110011177..
..712111111127..
.71111011011117.
7777771111777777
.7..7.7777.7..7.
.......33.......`],
  [ astroid, bitmap`
....33333333....
....399999993...
...39665666693..
..396555555553..
..3510111011553.
.39512111112153.
.39511111111153.
.35111211111155.
.51121111111115.
.51111111111115.
.51111111101115.
.55111011111155.
..551211112115..
...55511111555..
.....555555.....
................
`],
  [ background1, bitmap`
0000000000000000
0000000000000000
0050002000000000
0000000000000000
0020000000000000
0000000000000200
0000009000000000
0000000000000000
0000070000000000
0000000000000000
0000000000000000
0000000000000000
0002000000000000
0000000050000000
0000000000000020
0000000000000000
` ],
  [ background2, bitmap`
0050002000000000
0000000000000000
0020000000000000
0000000000000200
0000009000000000
0000000000000000
0000070000000000
0000000000000000
0000000000000000
0000000000000000
0002000000000000
0000000050000000
0000000000000020
0000000000000000
0000000000000000
0000000000000000
` ],
  [ explosion, bitmap`
.......33.......
......399333....
......3999993...
.....39999993...
....3996666993..
...399666669393.
.3396665566993..
3999666556693...
.339666666693...
...39966669933..
....33966993....
.....3966933....
.....399993.....
......3993......
......393.......
.......3........
`]
);

let in_menu = true;

const maps = [map`
..........
..........
..........
..........
..........
..........
..........
..........`, map`
.....
.....
.....
.....`];

/* Credit: MDN
// https://github.com/hackclub/sprig/issues/730
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}*/

// Credit: https://javascript.info/task/pseudo-random-generator
function pseudoRandom(seed) {
  let value = seed;

  return function() {
    value = value * 16807 % 2147483647;
    return (value / 10000) % 1;
  }
}

// -------------Game Logic-------------

var frameCounter = 1;
var points = 0;
var playback;
let generator = pseudoRandom(seed);

// main menu
function menu() {
  setMap(maps[1]);
  playback = playTune(menu_music, Infinity);
  addText("Astrovoid", {x: 6, y: 2, color: color`2`});
  addText("Move: WASD", {x: 5, y: 4, color: color`2`});
  addText("Pause: I", {x: 6, y: 5, color: color`2`});
  addText("Start: K", {x: 6, y: 6, color: color`2`});
  addText("Restart: L", {x: 5, y: 7, color: color`2`});
  
  setBackground(background1);

  addSprite(2, 3, player);
  
}

var difficulty_levels;
var level = 1;

// run on game start
function start() {
  difficulty_levels = levels;
  level = 1;
  running = true;
  points = 0;
  setMap(maps[0]);
  if (playback) playback.end();
  playback = playTune(music, Infinity);
  setBackground(background1); // set initial background
  addSprite(2, 4, "p");
  gameLoop();
}

let running = true;

// main game loop
function gameLoop() {
  if (running) { // I really don't like this method, but I couldn't find a delay/sleep function for js
    setTimeout(gameLoop, updateInterval); // call the function from the function
  }
  else { return; }

  clearText(); // clear all text
  addText("SCORE: " + points, {x: 0, y: 0, color: color`2`});

  checkNextFrame();

  // things that happen every other frame
  if (frameCounter % 2 == 0) {
    points++;
    spawnAstroids(points);
    //addSprite(getRandomInt(width()), 1, astroid);
    setBackground(background2);
  } else { setBackground(background1); }

  frameCounter++;
}

// Spawns the astroids, takes into account the difficulty levels and the current score
function spawnAstroids(score) {
  if (score >= difficulty_levels[0]) {
    difficulty_levels.shift();
    level++;
  }
  for (let i = 0; i < level; i++) {
    let num = Math.floor(generator() * width());
    addSprite(num, 1, astroid);
  }
}

// Update astroid positionThis is fun 
function checkNextFrame() {
  getAll(astroid).forEach((object) => {
    if (!running) { // Needed to avoid error after player death
      return;
    }

    let player_ = getFirst(player); // get player, inefficient method, but it works ig
    if (object.y == height()-1) { // when the astroid is at the edge
      object.remove();
    }
    if (checkDead(object, player_)) {
      return;
    }
    object.y += 1;
  });
}

// Check if player is colliding with astroid
function checkDead(astro, player_) {
  if (player_.x == astro.x && player_.y == astro.y) {
    running = false;
    addText("GAME OVER", {x: 6, y: 5, color: color`2`});
    addSprite(player_.x, player_.y, explosion);
    player_.remove();
    astro.remove();
    if (playback) playback.end();
    playTune(e_sfx);
    playTune(death);
    return true;
  }
  return false;
}

// Start Game
if (in_menu) {
  menu();
}
else {
  start();
}

// -------------Button Logic-------------

// move right
onInput("d", () => {
  if (!in_menu) {
    if (!running) { return; } // only move whenu unpaused
    getFirst(player).x += 1;
  }
});

// move left
onInput("a", () => {
  if (!in_menu) {
    if (!running) { return; }
    getFirst(player).x -= 1;
  }
});

// move up
onInput("w", () => {
  if (!in_menu) {
    if (!running) { return; }
    getFirst(player).y -= 1;
  }
});

// move down
onInput("s", () => {
  if (!in_menu) {
    if (!running) { return; }
    getFirst(player).y += 1;
  }
});

onInput("k", () => {
  if (in_menu) {
    in_menu = false;
    start();
  }
});

onInput("l", () => {
  if (!running && !in_menu) {
    in_menu = true;
    menu();
  }
});

// Pause game when I is pressed
onInput("i", () => {
  if (!in_menu) {
    running = !running;
    if (playback) playback.end();
    if (running) {
      gameLoop(); // restart game loop
      playback = playTune(music, Infinity);
    }
    else {
      addText("PAUSED", {x: 7, y: 5, color: color`2`});
    }
  }
});

afterInput(() => {
  if (!in_menu) {
    getAll(astroid).forEach((object) => {
      if (!running) { // Needed to avoid error after player death
        return;
      }
  
      let player_ = getFirst(player); // get player, inefficient method, but it works ig
      if (object.y == height()-1) { // when the astroid is at the edge
        object.remove();
      }
      checkDead(object, player_);
    });
  }
});
