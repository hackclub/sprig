/*
@title: flappy plane
@author: qeshm
@tags: []
@addedOn: 2024-09-20
*/

const player = "p";
const pipe = "P";

setLegend(
  [ player, bitmap`
................
................
................
................
................
1111............
.11.............
.1111111111111..
.L1L1LL1L1LL1LL.
.111111111111111
................
................
................
................
................
................` ],
  [ pipe, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000` ]
);

const screenWidth = 20;
const screenHeight = 16;

const level = 0;
const levels = [
  map`
p...................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`
];

setMap(levels[level]);

setSolids([]);

let gravity = 0.5;
let jumpPower = -1.7;
let velocity = 0;

const playerSprite = getFirst(player);
if (playerSprite) {
  playerSprite.x = 7;
  playerSprite.y = Math.floor(screenHeight / 2);
}

let gameOver = false;

function flap() {
  if (!gameOver) {
    velocity = jumpPower;
  }
}

function restartGame() {
  if (gameOver) {
    velocity = 0;
    gameOver = false;
    playerSprite.x = 7;
    playerSprite.y = Math.floor(screenHeight / 2);
    getAll(pipe).forEach(pipeSprite => pipeSprite.remove());
    clearInterval(gameLoop);
    gameLoop = setInterval(updateGame, 200);
    clearInterval(pipeSpawner);
    pipeSpawner = setInterval(() => spawnPipe(), 4000);
    clearText();
  }
}

onInput("s", flap);
onInput("w", flap);
onInput("i", flap);
onInput("l", restartGame);

function spawnPipe() {
  const pipeGap = 4;
  const gapStart = Math.floor(Math.random() * (screenHeight - pipeGap - 2)) + 1;
  for (let y = 0; y < screenHeight; y++) {
    if (y < gapStart || y >= gapStart + pipeGap) {
      addSprite(screenWidth - 1, y, pipe);
    }
  }
}

let pipeMovementCounter = 0;

function movePipes() {
  pipeMovementCounter++;
  if (pipeMovementCounter % 3 === 0) {
    getAll(pipe).forEach((pipeSprite) => {
      pipeSprite.x -= 1;

      if (pipeSprite.x < 0) {
        pipeSprite.remove();
      }

      if (playerSprite &&
          pipeSprite.x === playerSprite.x &&
          pipeSprite.y === playerSprite.y) {
        gameOver = true;
        clearInterval(gameLoop);
        clearInterval(pipeSpawner);
        clearText();
        addText("Game Over!", { x: 4, y: 6, color: color`1wwwwww` });
        addText("Press L to Restart", { x: 2, y: 8, color: color`1` });
      }
    });
  }
}

let pipeSpawner = setInterval(() => {
  if (!gameOver) {
    spawnPipe();
  }
}, 4000);

function updateGame() {
  if (playerSprite && !gameOver) {
    velocity += gravity;
    playerSprite.y += Math.round(velocity);
    if (playerSprite.y >= screenHeight - 1) {
      playerSprite.y = screenHeight - 1;
      velocity = 0;
    }
    if (playerSprite.y < 0) {
      playerSprite.y = 0;
      velocity = 0;
    }
  }
  movePipes();
}

let gameLoop = setInterval(updateGame, 200);
