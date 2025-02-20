/*
@title: Flapper Ghost
@tags: [ghost, spooky, halloween, Flapper]
@author: Ragib
@addedOn: 2025-02-14
*/

const GHOST_UP = "g";
const GHOST_DOWN = "h";
const TREE = "t";
const DARK_SKY = "d";
const POWER_UP = "O";

const GAME_OVER_TUNE = tune`
50: C4-50 + D4-50,
50: E4-50 + G4-50,
50: A4-50 + B4-50,
50: C5-50,
50: C5-50,
50: C5-50 + B4-50 + A4-50,
50: G4-50,
50: F4-50 + E4-50,
50: D4-50,
50: C4-50`;

const GHOST_SOUND = tune`
400: A3-400,
10000`;

const BACKGROUND_MUSIC = tune`
500: C3-500 + E3-500 + G3-500,
500: D3-500 + F3-500 + A3-500,
500: E3-500 + G3-500 + B3-500,
500: F3-500 + A3-500 + C4-500,
500: G3-500 + B3-500 + D4-500,
500: A3-500 + C4-500 + E4-500,
500: B3-500 + D4-500 + F4-500,
500: C4-500 + E4-500 + G4-500`;

const levelConfig = [
  map`
..........t..
..........t..
..........t..
..........t..
.g...........
..........t..
..........t..
..........t..`
];

let gameState = {
  level: 0,
  speed: 250,
  gap: 4,
  count: 0,
  score: 0,
  isGameOver: false,
  musicPlaying: false,
  isInvisible: false,
  powerUpActive: false
};

setLegend(
  [GHOST_UP, bitmap`
................
................
....00000.......
..06666660......
.0666666600.....
066666666660....
066666666660....
066666666660....
066666666660....
.0666666600.....
..06666660......
...006660.......
....00000.......
................
................
................`],
  [GHOST_DOWN, bitmap`
................
................
....00000.......
...0666600......
..06666660......
.0666666660.....
066666666660....
066666666660....
.0666666600.....
..06666660......
..0066600.......
...00000........
................
................
................
................`],
  [TREE, bitmap`
...33333........
...33333........
...33333........
...33333........
..3333333.......
..3333333.......
..3333333.......
.333333333......
.333333333......
33333333333.....
33333333333.....
..0333330.......
..0333330.......
..0333330.......
..0333330.......
..0333330.......`],
  [DARK_SKY, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111....11111111
111..88..1111111
11..8668..111111
1..866668..11111
1..866668..11111
11..8668..111111
111..88..1111111
1111....11111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [POWER_UP, bitmap`
................
.......99.......
.....999999.....
...9999999999...
..999999999999..
..999999999999..
...9999999999...
.....999999.....
.......99.......
................
................
................
................
................
................
................`]
);

setMap(levelConfig[gameState.level]);
setBackground(DARK_SKY);
setPushables({
  [GHOST_UP]: [],
  [GHOST_DOWN]: [],
});

function getGhost() {
  return getFirst(GHOST_UP) || getFirst(GHOST_DOWN);
}

function updateScore() {
  addText(`Score: ${gameState.score}`, { x: 10, y: 1, color: color`3` });
}

function generateObstacle() {
  gameState.gap = Math.floor(Math.random() * 8);
  for (let y = 0; y < 8; y++) {
    if (y !== gameState.gap) {
      addSprite(7, y, TREE);
    }
  }
  gameState.score++;
}

function moveObstacles() {
  getAll(TREE).forEach((tree) => {
    if (tree.x === 0) {
      tree.remove();
    } else {
      tree.x -= 1;
    }
  });
}

function updateGhost() {
  getGhost().type = [GHOST_UP, GHOST_DOWN][gameState.count % 2];
  if (getGhost().y < 7 && gameState.count % 4 === 0) {
    getGhost().y += 1;
  }
}

function checkCollisions() {
  const ghost = getGhost();
  const firstTree = getFirst(TREE);
  const powerUp = getFirst(POWER_UP);

  if (powerUp && powerUp.x === ghost.x && powerUp.y === ghost.y) {
    powerUp.remove();
    activatePowerUp();
  }

  if (!gameState.isInvisible && firstTree && firstTree.x === ghost.x && ghost.y !== gameState.gap) {
    gameOver();
  }
}

function spawnPowerUp() {
  if (!gameState.powerUpActive) {
    addSprite(Math.floor(Math.random() * 8), Math.floor(Math.random() * 8), POWER_UP);
    gameState.powerUpActive = true;
  }
}

function activatePowerUp() {
  gameState.isInvisible = true;
  gameState.powerUpActive = false;
  addText("INVISIBLE!", { x: 5, y: 1, color: color`2` });

  setTimeout(() => {
    gameState.isInvisible = false;
    clearText();
  }, 5000);
}

function gameOver() {
  clearText();
  gameState.isGameOver = true;
  gameState.musicPlaying = false;
  setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`);
  playTune(GAME_OVER_TUNE);
  addText("Game Over!", { x: 5, y: 7, color: color`3` });
  addText(`Score: ${gameState.score}`, { x: 5, y: 8, color: color`3` });
}

function gameLoop() {
  if (!gameState.musicPlaying) {
    playTune(BACKGROUND_MUSIC, Infinity);
    gameState.musicPlaying = true;
  }

  updateScore();
  moveObstacles();
  updateGhost();
  checkCollisions();

  if (getAll(TREE).length === 0) {
    generateObstacle();
  }

  if (gameState.count % 20 === 0) { 
    spawnPowerUp();
  }

  gameState.count++;
  if (!gameState.isGameOver) {
    setTimeout(gameLoop, gameState.speed);
  }
}

onInput("s", () => {
  if (!gameState.isGameOver) {
    playTune(GHOST_SOUND);
    getGhost().y += 1;
  }
});

onInput("w", () => {
  if (!gameState.isGameOver) {
    playTune(GHOST_SOUND);
    getGhost().y -= 1;
  }
});

gameLoop();
