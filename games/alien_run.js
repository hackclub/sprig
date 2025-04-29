/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Alien Run
@autor:Olivia Chevalier 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const obstacle = "o";

setLegend(
  [ player, bitmap`
................
................
.....44..44.....
......4..4......
.....444444.....
.....404404.....
.....404404.....
.....444444.....
.......44.......
.....444444.....
....44.44.44....
....4..44..4....
.......44.......
......4444......
......4..4......
................` ],
  [ obstacle, bitmap`
................
................
................
.........0......
........00......
.......000......
....00003000.0..
...00333333000.9
..00332233333099
..003322333330.9
...00333333000..
....00003000.0..
.......000......
........00......
.........0......
................` ]
);

setSolids([player]);

let level = 0;
const levels = [
  map`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`
];

setMap(levels[level]);

setPushables({
  [ player ]: []
});

let isJumping = false;
let velocityY = 0;
let gravity = 0.15;
let jumpStrength = -0.7;
let jumpFrames = 0;
let speed = 400;
let obstacleInterval;
let physicsInterval;
let score = 0;
let scoreInterval;
let obstacleCooldown = false;

const startX = 1;
const startY = 13;

function spawnPlayer() {
  if (!getFirst(player)) {
    addSprite(startX, startY, player);
  }
}

onInput("w", () => {
  let playerObj = getFirst(player);
  if (playerObj && playerObj.y === startY && !isJumping) {
    isJumping = true;
    velocityY = jumpStrength;
    jumpFrames = 0;
  }
});

function spawnObstacle() {
  let x = width() - 1;
  let y = startY;
  if (x >= 0 && x < width()) {
    addSprite(x, y, obstacle);
  }
  obstacleCooldown = true;
  setTimeout(() => {
    obstacleCooldown = false;
  }, 1800);
}

function startGame() {
  clearInterval(obstacleInterval);
  clearInterval(physicsInterval);
  clearInterval(scoreInterval);
  clearText();
  setMap(levels[level]);
  spawnPlayer();
  isJumping = false;
  velocityY = 0;
  score = 0;
  addText("Score: 0", { x: 1, y: 0, color: color`white` });

  obstacleInterval = setInterval(() => {
    getAll(obstacle).forEach(ob => {
      ob.x -= 1;
      if (ob.x < 0) {
        ob.remove();
      }
    });

    if (!obstacleCooldown) {
      spawnObstacle();
    }
  }, 400);

  physicsInterval = setInterval(() => {
    let playerObj = getFirst(player);
    if (!playerObj) return;

    if (isJumping) {
      jumpFrames++;
      if (jumpFrames < 6) {
        velocityY = jumpStrength;
      } else {
        velocityY += gravity;
      }
    } else {
      velocityY += gravity;
    }

    let newY = playerObj.y + velocityY;
    if (newY >= startY) {
      newY = startY;
      velocityY = 0;
      isJumping = false;
    }
    if (newY < 0) newY = 0;

    playerObj.y = Math.round(newY);

    let tile = getTile(playerObj.x, playerObj.y);
    if (tile && tile.some(t => t.type === obstacle)) {
      clearInterval(obstacleInterval);
      clearInterval(physicsInterval);
      clearInterval(scoreInterval);
      clearText();
      addText("GAME OVER", { x: 4, y: 7, color: color`red` });
      addText("Score: " + score, { x: 4, y: 9, color: color`white` });
      setTimeout(startGame, 1500);
    }
  }, 50);

  scoreInterval = setInterval(() => {
    score++;
    clearText();
    addText("Score: " + score, { x: 1, y: 0, color: color`white` });
  }, 250);
}

startGame();
