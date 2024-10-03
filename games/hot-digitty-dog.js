/*
@title: hot-digitty-dog
@author: Urjith Mishra
@tags: ['endless']
@addedOn: 2023-01-10
*/

// Sprites
const player = "p";
const mustard = "m";
const pineapple = "s";

// Speed info
const minSpeed = 300;
let speed = 1000;

// Music
const bgTune = tune`
206.89655172413794: c5~206.89655172413794 + g4~206.89655172413794,
206.89655172413794: b4~206.89655172413794,
206.89655172413794: b4~206.89655172413794,
206.89655172413794: a4~206.89655172413794 + d4~206.89655172413794,
206.89655172413794: g4~206.89655172413794,
206.89655172413794: g4~206.89655172413794,
206.89655172413794: g4~206.89655172413794,
206.89655172413794: a4~206.89655172413794 + e4~206.89655172413794,
206.89655172413794: b4~206.89655172413794 + e4~206.89655172413794,
206.89655172413794: c5~206.89655172413794 + e4~206.89655172413794,
206.89655172413794: e4~206.89655172413794 + d5~206.89655172413794,
206.89655172413794: f5~206.89655172413794 + e4~206.89655172413794,
206.89655172413794: g5~206.89655172413794,
206.89655172413794: g5~206.89655172413794,
206.89655172413794: f5~206.89655172413794 + b4~206.89655172413794,
206.89655172413794: e5~206.89655172413794 + a4~206.89655172413794,
206.89655172413794: d5~206.89655172413794 + g4~206.89655172413794,
206.89655172413794: c5~206.89655172413794 + f4~206.89655172413794,
206.89655172413794: b4~206.89655172413794 + e4~206.89655172413794,
206.89655172413794: a4~206.89655172413794,
206.89655172413794: g4~206.89655172413794,
206.89655172413794: f4~206.89655172413794,
206.89655172413794: e4~206.89655172413794,
206.89655172413794: f4~206.89655172413794 + b4~206.89655172413794,
206.89655172413794: e5~206.89655172413794,
206.89655172413794: f5~206.89655172413794,
206.89655172413794: f4~206.89655172413794,
206.89655172413794: c5~206.89655172413794,
206.89655172413794: f4~206.89655172413794,
206.89655172413794: a4~206.89655172413794,
206.89655172413794: d5~206.89655172413794,
206.89655172413794`;
let bgMusic = playTune(bgTune, Infinity)

// Other
let score = 0;
let gameLoop;
let gameOver = false;

// Sprite bitmaps
setLegend(
  [ player, bitmap`
................
.....66...66....
....6FF606FF6...
....6FF0C06FF...
...6FF0CC06FFF..
...6FF0CCC06FF..
...6FF04C406FF..
..6FFF0CCC06FF..
..6FFF06C606FF..
..6FFF036306F...
...6F0CC3C06F...
....60CCC06F....
......000.......
......0.0.......
.....00.00......
................`],
  [ mustard, bitmap`
................
.......6........
......666.......
......666.......
.....FFFFF......
....F26666F.....
....F26666F.....
....F66666F.....
....F63366F.....
....F33336F.....
....F63366F.....
....F66666F.....
.....F666F......
......FFF.......
................
................`],
  [ pineapple, bitmap`
................
.......4DDD.....
.....4DDD..D....
....4.F6D6......
.....666D66.....
....66F6666F....
..F.666F66F6....
...F666666666...
...66666F666FF..
...666F666666...
....66F666F6....
....6666666F....
.....F66666.....
....F.66F6......
........F.......
................`]
);

setSolids([player, pineapple, mustard]);

// Simple 2x5 setup
let level = 0;
let alive = true;
const levels = [
  map`
......
p.....`,
];

setMap(levels[level]);

// Display initial score
addText(score.toString(), {
  x: 20 - score.toString().length,
  y: 5,
  color: color`0`
});

// Ran every speed milliseconds
const gameLoopFunc = () => {
  // Move all objects
  let objects = getAll(pineapple).concat(getAll(mustard));
  objects.forEach((n) => {
    if (n.x == 0) n.remove();
    if (n.x == getFirst(player).x + 1 && n.y == getFirst(player).y) {
      speed = Math.max(speed - 100, minSpeed);
      n.remove();
      // Game over if touching pineapple
      if (n.type === pineapple) {
        addText("Game Over", { 
          x: 5,
          y: 5,
          color: color`3`
        });
        gameOver = true;
        if (bgMusic) bgMusic.end();
      } else if (n.type == mustard) {
        score++;
        clearText();
        addText(score.toString(), {
          x: 20 - score.toString().length,
          y: 5,
          color: color`0`
        });
      }
    }
    n.x--;
  });

  // Generate new random pineapple or mustard
  let generation = Math.floor(Math.random() * 2);
  let newY = Math.round(Math.random());
  switch (generation) {
    // Mustard
    case 0:
      addSprite(5, newY, mustard);
      break;
    // Pineapple if possible
    case 1:
      // Ensure possibility
      if (!(getTile(4, !newY).map(x => x.type).includes(pineapple) || getTile(5, !newY).map(x => x.type).includes(pineapple)))
        addSprite(5, newY, pineapple);
      else
        addSprite(5, newY, mustard);
      break;
  }
  clearInterval(gameLoop);
  if (!gameOver) gameLoop = setInterval(gameLoopFunc, speed);
}

// Start loop
gameLoop = setInterval(gameLoopFunc, speed);

// Restart
onInput("j", () => {
  clearText();
  score = 0;
  speed = 1000;
  clearInterval(gameLoop);
  level = 0;
  setMap(levels[level]);
  if (bgMusic) bgMusic.end();
  bgMusic = playTune(bgTune, Infinity);
  // Display initial score
  addText(score.toString(), {
    x: 20 - score.toString().length,
    y: 5,
    color: color`0`
  });
  gameOver = false;
  gameLoop = setInterval(gameLoopFunc, speed);
});

// Go up
onInput("w", () => {
  if (getTile(getFirst(player).x, getFirst(player).y - 1).map(x => x.type).includes(mustard)) {
    getTile(getFirst(player).x, getFirst(player).y - 1).map((x) => { x.remove() });
    score++;
    clearText();
    addText(score.toString(), {
      x: 20 - score.toString().length,
      y: 5,
      color: color`0`
    });
  }
  getFirst(player).y--;
});

// Go down
onInput("s", () => {
  if (getTile(getFirst(player).x, getFirst(player).y + 1).map(x => x.type).includes(mustard)) {
    getTile(getFirst(player).x, getFirst(player).y + 1).map((x) => { x.remove() });
    score++;
    clearText();
    addText(score.toString(), {
      x: 20 - score.toString().length,
      y: 5,
      color: color`0`
    });
  }
  getFirst(player).y++;
});
