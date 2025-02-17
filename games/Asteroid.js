/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Asteroid
@author: sleekez
@tags: [endless]
@addedOn: 2025-02-16
*/

const player = "p";
const obs = "o";
const backg = "b";

let lastSpawnX; // last position of spawned obstacle

let startTime;
let elapsedTime = 0;
let timeBetweenUpdate = 1000;

let gameover = false;
let gamestarted = false;


setLegend(
  [player, bitmap`
....6.3..3.6....
.....6....6.....
....63....36....
....36....63....
.....63..36.....
....602..206....
....0D0..0D0....
....0DD00DD0....
....04DDDD40....
....044DD440....
.....044440.....
......0440......
.......00.......
................
................
................`],
  [obs, bitmap`
................
................
................
.......00.......
......0330......
.....033330.....
....033CC330....
....03CCCC30....
....0CC00CC0....
....0C0..0C0....
....600..006....
.....63..36.....
....36....63....
....63....36....
.....6....6.....
....6.3..3.6....`],
  [backg, bitmap`
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
0000000000000000`]
);

setSolids(
  [player]
);

let level = 0;
const levels = [
  map`
.`,
  map`
...p...
.......
.......
.......
.......
.......`
];



function mainMenu() {
  setMap(levels[0]);
  setBackground(backg);
  addText("Asteroid", {
    x: 6,
    y: 2,
    color: color`2`
  });
  addText("J to start", {
    x: 5,
    y: 10,
    color: color`2`
  });
  addText("A and D to move", {
    x: 3,
    y: 6,
    color: color`2`
  });
}

function gameStart() {
  startTime = performance.now();
  clearText();
  gamestarted = true;
  setMap(levels[1]);
  setBackground(backg);
  gameLoop();
}

function collisionCheck(spr1, spr2) {
  colliding = tilesWith(spr1, spr2);
  if (colliding.length > 0) { return true; } else { return false; }
}

function gameOver()
{
  let gameOverTime = Math.round(elapsedTime / 1000);
  addText("Game Over", {
    x: 6,
    y: 2,
    color: color`3`
  });
  addText("Score: " + gameOverTime.toString() + " ", {
    x: 6,
    y: 4,
    color: color`2`
  });
  gameover = true;
}

function spawnNew() {
  let rand = 4;
  do { rand = getRandomInt(0, 6) } while (rand == lastSpawnX)
  obs, rand, 5
  //console.log(getTile(x,y))// + " " + getTile(x,y).length);
  if (getTile(rand, 5).length == 0) {
    addSprite(rand, 5, obs);
  }
  lastSpawnX = rand;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveObstacles() {
  let currentObstacles = getAll(obs);
  for (let i = 0; i < currentObstacles.length; i++) {
    if (currentObstacles[i].y == 0) { clearTile(currentObstacles[i].x, currentObstacles[i].y); } else { currentObstacles[i].y += -1; } // positive y is down
  }
  if (collisionCheck(player, obs)) { clearInterval(gameLoop);
    gameOver(); }
}

function calculateTime() {
  elapsedTime = performance.now() - startTime;
  timeBetweenUpdate = 1000 * Math.pow(0.75, elapsedTime / 10000); // Adjust the multiplier for desired game speed
  console.log(timeBetweenUpdate);
}

setPushables({
  [player]: []
});

onInput("a", () => {
  if (!gameover && gamestarted) { getFirst(player).x += -1 }
});

onInput("d", () => {
  if (!gameover && gamestarted) { getFirst(player).x += 1 }
});

onInput("j", () => {
  if (!gamestarted) { gameStart(); }
});

afterInput(() => {
  // console.log(getFirst(player).x + " " + getFirst(player).y);
  if (collisionCheck(player, obs)) { clearInterval(gameLoop);
    gameOver(); }
});

function gameLoop() {
  moveObstacles();
  spawnNew();
  calculateTime();
  if (!gameover) { setTimeout(gameLoop, timeBetweenUpdate); } // 1000 milliseconds = 1 second
}

mainMenu();