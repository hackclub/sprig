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
const powup = "x";

let lastSpawnX; // last position of spawned obstacle

let startTime;
let elapsedTime = 0;
let timeBetweenUpdate = 1000;

let gameover = false;
let gamestarted = false;

let powerup = true;
let insuperPower = false;


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
0000000000000000`],
  [powup, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`]
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
    y: 9,
    color: color`2`
  });
  addText("W for powerup", {
    x: 4,
    y: 12,
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
  clearAll();
  setTimeout(clearAll, 100);
}
function clearAll(){
  let currentObs = getAll(obs);
  for (let i = 0; i < currentObs.length; i++){
    clearTile(currentObs[i].x, currentObs[i].y);
  }
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

function superPower(){
  insuperPower = true;
  let currentObs = getAll(obs);
  clearAll();
  spY();
  setTimeout(spB, 50);
  setTimeout(spY, 100);
  setTimeout(spB, 150);
  setTimeout(spY, 200);
  setTimeout(spB, 250);
  setTimeout(spY, 300);
  setTimeout(spB, 350);
  setTimeout(spY, 400);
  setTimeout(spB, 450);
  setTimeout(sP, 500);
  
  
  powerup = false;
}

function spY(){
  setBackground(powup);
}
function spB(){
  setBackground(backg);
}
function sP(){
  insuperPower = false;
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
onInput("w", () => {
  if (powerup) {superPower() }
});

afterInput(() => {
  // console.log(getFirst(player).x + " " + getFirst(player).y);
  if (collisionCheck(player, obs)) { clearInterval(gameLoop);
    gameOver(); }
});

function gameLoop() {
  if (!insuperPower) {
    moveObstacles();
    spawnNew();
  }
  calculateTime();
  if (!gameover) { setTimeout(gameLoop, timeBetweenUpdate); } // 1000 milliseconds = 1 second
}

mainMenu();