//most of the programming was done by @Aspen :D

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
const astroid = "a"
const explosion = "x";
const background2 = "c";
const laser = "l";

const e_sfx = tune`
64.1025641025641,
64.1025641025641: D4/64.1025641025641,
64.1025641025641: D4/64.1025641025641 + C4/64.1025641025641,
64.1025641025641: C4/64.1025641025641 + D4/64.1025641025641,
1794.871794871795`;
const music = tune`
142.18009478672985: C4~142.18009478672985 + D4^142.18009478672985,
142.18009478672985: C4^142.18009478672985,
142.18009478672985: D4~142.18009478672985,
142.18009478672985: C4~142.18009478672985 + D4^142.18009478672985,
142.18009478672985: C4^142.18009478672985,
142.18009478672985: D4~142.18009478672985,
142.18009478672985: C4~142.18009478672985 + D4^142.18009478672985,
142.18009478672985: C4^142.18009478672985,
142.18009478672985: D4~142.18009478672985,
142.18009478672985: C4~142.18009478672985 + D4^142.18009478672985,
142.18009478672985: C4^142.18009478672985,
142.18009478672985: D4~142.18009478672985,
142.18009478672985: C4~142.18009478672985 + D4^142.18009478672985,
142.18009478672985: C4^142.18009478672985,
142.18009478672985: D4~142.18009478672985,
142.18009478672985: C4~142.18009478672985 + D4^142.18009478672985,
142.18009478672985: C4^142.18009478672985,
142.18009478672985: D4~142.18009478672985,
142.18009478672985: C4~142.18009478672985 + D4^142.18009478672985,
142.18009478672985: C4^142.18009478672985,
142.18009478672985: D4~142.18009478672985,
142.18009478672985: D4^142.18009478672985 + C4~142.18009478672985,
142.18009478672985: C4^142.18009478672985,
142.18009478672985: D4~142.18009478672985,
142.18009478672985: C4~142.18009478672985 + D4^142.18009478672985,
142.18009478672985: C4^142.18009478672985,
142.18009478672985: D4~142.18009478672985,
142.18009478672985: C4~142.18009478672985 + D4^142.18009478672985,
142.18009478672985: C4^142.18009478672985,
142.18009478672985: D4~142.18009478672985,
142.18009478672985: C4~142.18009478672985 + D4^142.18009478672985,
142.18009478672985: C4^142.18009478672985`;
const death = tune`
99.17355371900827,
49.586776859504134: C5/49.586776859504134 + B4/49.586776859504134,
49.586776859504134: A4/49.586776859504134,
49.586776859504134: G4/49.586776859504134,
1338.8429752066115`;
const menu_music = tune`
148.5148514851485: A4-148.5148514851485,
148.5148514851485: C4~148.5148514851485,
148.5148514851485: D5/148.5148514851485,
148.5148514851485: C4~148.5148514851485 + E5-148.5148514851485,
148.5148514851485: B4^148.5148514851485 + F4-148.5148514851485,
148.5148514851485: C4~148.5148514851485 + C5-148.5148514851485,
148.5148514851485: B4^148.5148514851485 + F5/148.5148514851485,
148.5148514851485: C4~148.5148514851485,
148.5148514851485: C5^148.5148514851485 + E5/148.5148514851485,
148.5148514851485: C4~148.5148514851485 + E5-148.5148514851485,
148.5148514851485: F4-148.5148514851485,
148.5148514851485: C4~148.5148514851485 + C5-148.5148514851485,
148.5148514851485,
148.5148514851485: C4~148.5148514851485 + B4^148.5148514851485,
148.5148514851485,
148.5148514851485: C4~148.5148514851485 + B4^148.5148514851485,
148.5148514851485: C5/148.5148514851485,
148.5148514851485: C4~148.5148514851485 + C5^148.5148514851485 + E5-148.5148514851485,
148.5148514851485: F4-148.5148514851485,
148.5148514851485: C4~148.5148514851485 + C5-148.5148514851485,
148.5148514851485,
148.5148514851485: C4~148.5148514851485 + E5-148.5148514851485,
148.5148514851485: F4-148.5148514851485,
148.5148514851485: C4~148.5148514851485 + B4^148.5148514851485 + C5-148.5148514851485,
148.5148514851485,
148.5148514851485: C4~148.5148514851485 + B4^148.5148514851485 + E5/148.5148514851485,
148.5148514851485,
148.5148514851485: C4~148.5148514851485 + C5^148.5148514851485 + D5/148.5148514851485,
148.5148514851485: E5-148.5148514851485,
148.5148514851485: C4~148.5148514851485 + F4-148.5148514851485,
148.5148514851485: C5-148.5148514851485,
148.5148514851485: C4~148.5148514851485`;
const laserSFX = tune`
49.83388704318937: b5^49.83388704318937 + a5^49.83388704318937 + g5^49.83388704318937 + f5^49.83388704318937 + e5^49.83388704318937,
49.83388704318937: a5^49.83388704318937 + g5^49.83388704318937 + f5^49.83388704318937 + e5^49.83388704318937 + d5^49.83388704318937,
49.83388704318937: g5^49.83388704318937 + f5^49.83388704318937 + e5^49.83388704318937 + d5^49.83388704318937 + c5^49.83388704318937,
1445.1827242524917`

setLegend(
    [ laser, bitmap`
.......33.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
................
................
................
................
................
................
................
................
................`],
  [ player, bitmap`
................
................
................
.......2........
.......2........
......222.......
......222.......
......222.......
......222.......
...2..222..2....
...2..222..2....
...222222222....
...222222222....
...969...969....
...969...969....
....9.....9.....`],
  [ astroid, bitmap`
................
............L...
........L.......
..1..LLLLL......
.....LLLLLL.....
....LLLLLLLL....
.1..LLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
....LLLLLLLL....
...............1
.....L........1.
..............1.
.L..............`],
  [ background1, bitmap`
0000000000000000
0000002000000000
0000000000000000
0000000000000200
0000000000000000
0200000000000000
0000000000000000
0000000000000000
0000000000000000
0000000002000000
0000000000000020
0000000000000000
0002000000000000
0000000000000000
0000000000020000
0000000000000000` ],
  [ background2,  bitmap`
0000000000000000
0000002000000000
0000000000000000
0000000000000200
0000000000000000
0200000000000000
0000000000000000
0000000000000000
0000000000000000
0000000002000000
0000000000000020
0000000000000000
0002000000000000
0000000000000000
0000000000020000
0000000000000000`],
  [ explosion, bitmap`
.......33.......
......399333....
......3999993...
.....39999993...
....3996666993..
...399666669393.
.3396666666993..
3999666666693...
.339666666693...
...39966669933..
....33966993....
.....3966933....
.....399993.....
......3993......
......393.......
.......3........`]
);

  // check for player/enemy crash state
  if (!laser && tilesWith(laser, enemy).length > 0) {
    laser = true
    var storex = tilesWith(player, enemy)[0][0].x
    var storey = tilesWith(player, enemy)[0][0].y
  }

var laserAllowed = true
var shootingSpeed = 500

onInput("j", () => {
  if (!explosion && laserAllowed) {
    laserAllowed = false
    var laserTimer = setTimeout(function(){ laserAllowed = true }, shootingSpeed)
    playTune(laserSFX)
    playTune(laserSFX)
    playTune(laserSFX)
    addSprite(getFirst(player).x, 8, laser)
  }
});

let in_menu = true;

const maps = [map`
.......
.......
.......
.......
.......
.......
.......`, map`
.....
.....
.....
.....`];

/* Credit: MDN
// https://github.com/hackclub/sprig/issues/730
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}*/

  // move laser, remove if at top of screen
  for (var i = 0; i < getAll(laser).length; i++) {
    if (getAll(laser)[i].y < 1) {
      getAll(laser)[i].remove()
    } else {
      getAll(laser)[i].y -= 1
    }
  }

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
  addText("Start: K", {x: 6, y: 7, color: color`2`});
  
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
  addSprite(2, 6, "p");
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
    addText("L to restart", {x: 5, y: 6, color: color`2`});
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