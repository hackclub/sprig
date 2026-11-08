/*
@title: HYPERLANE
@author: Masti-Dev
@description: A neon-themed endless runner where players dodge obstacles, collect coins, and use shields to survive as the speed increases.
@tags: ['arcade', 'runner', 'pixel-art', 'survival']
@addedOn: 2026-11-08
*/

const player = "p"
const obstacle = "o"
const coin = "c"
const shield = "s"

setLegend(
  [player, bitmap`
................
................
......33........
.....3333.......
.....3333.......
......33........
.....3..3.......
....3....3......
................
................
................
................
................
................
................
................`],

  [obstacle, bitmap`
................
................
................
.......444......
......44444.....
.....4444444....
....444444444...
....444444444...
................
................
................
................
................
................
................
................`],

    [coin, bitmap`
................
................
......666.......
.....66666......
....6666666.....
....6666666.....
.....66666......
......666.......
................
................
................
................
................
................
................
................`],

  [shield, bitmap`
................
................
.......5........
......555.......
.....55555......
....5555555.....
....5555555.....
.....55555......
......555.......
.......5........
................
................
................
................
................
................`]
)

const level = map`
..........
..........
..........
..........
..........
..........
..........
..........`


const backgroundMusic = tune`
1000,
500: A4-500,
500: G4/500 + A4-500,
500: B4-500 + F4/500,
500: B4-500 + A4-500 + F4/500,
500: A4-500 + D5^500 + E4/500,
500: B4-500 + D5^500,
500: B4-500 + C5^500 + G4/500,
500: C5-500 + B4-500 + D5^500 + G4/500,
500: B4-500 + C5^500 + E5~500 + F4/500,
500: C5^500 + D5^500 + E5^500 + F4/500,
500: C5-500 + E5^500 + F4/500,
500: C5^500 + B4-500 + A4-500 + D5^500,
500: A4-500 + C5^500 + F4/500 + E5~500,
500: A4-500 + B4-500 + C5^500 + F4/500,
500: B4-500 + D5^500 + A4~500,
500: C5^500 + D5-500 + A4~500,
500: E5-500 + D5-500 + B4^500,
500: C5-500 + B4-500 + A4^500 + G4^500 + F4~500,
500: B4-500 + A4-500 + G4^500 + D4~500 + E4~500,
500: G4^500 + D4~500,
500: A4-500 + G4^500,
500: B4^500 + C5-500 + A4^500 + F4/500,
500: C5^500,
500: C5^500 + D5^500,
3000`;

const hitSound = tune`
1500,
500: E4/500 + D4~500 + F4/500 + G4/500 + C4/500,
500: D4~500 + C4~500 + E4/500 + G4/500 + F4/500,
500: C4~500 + D4/500 + E4/500 + F4/500 + G4-500,
500: C4~500 + E4/500 + D4/500 + F4-500 + G4-500,
500: C4~500 + D4-500 + E4-500 + F4-500 + G4-500,
500: G4^500 + F4^500 + E4^500 + D4^500 + C4^500,
500: F4^500,
500: E4~500,
500: D4/500,
500: C4-500,
9500`;

setMap(level);

const coinSound = tune`
1000,
500: F4^500 + B4-500 + B5~500 + A5~500,
500: F4^500 + G4^500 + B4-500 + B5^500 + A5~500,
500: F4^500 + C5~500 + B4-500 + B5^500 + A5~500,
13500`;

// Player lanes
const lanes = [2, 4, 6];
let laneIndex = 1;

// Create player
addSprite(2, 4, player);

let score = 0;
let gameOver = false;
let gameStarted = false;
let gameLoop;
let isPaused = false;
let shieldActive = false;

let currentSpeed = 500;
let highScore = 0;

let musicPlayback;

function updateScore() {
  clearText();

  addText("SCORE: " + score, {
    x: 1,
    y: 0,
    color: color`3`
  });
}

function showStartScreen() {
  clearText();

addText("HYPERLANE", {
    x: 2,
    y: 2,
    color: color`3`
  });

  addText("PRESS J TO START", {
    x: 1,
    y: 4,
    color: color`4`
  });

  addText("BEST: " + highScore, {
    x: 2,
    y: 6,
    color: color`6`
  });
}


function endGame() {
  if (gameOver) {
    return;
  }

  gameOver = true;

  clearInterval(gameLoop);

  if (musicPlayback) {
    musicPlayback.end();
    musicPlayback = null;
  }

  playTune(hitSound);

  if (score > highScore) {
    highScore = score;
  }

  clearText();

  addText("GAME OVER", {
    x: 2,
    y: 2,
    color: color`3`
  });

  addText("SCORE: " + score, {
    x: 2,
    y: 4,
    color: color`4`
  });

  addText("BEST: " + highScore, {
    x: 2,
    y: 5,
    color: color`6`
  });

  addText("PRESS K TO RESTART", {
    x: 0,
    y: 6,
    color: color`6`
  });
}

function moveObjects() {
  const obstacles = getAll(obstacle);
  const coins = getAll(coin);
  const shields = getAll(shield);

  for (const obj of obstacles) {
    obj.x -= 1;

    if (obj.x < 0) {
      obj.remove();
    }
  }

  for (const obj of coins) {
    obj.x -= 1;

    if (obj.x < 0) {
      obj.remove();
    }
  }

  for (const obj of shields) {
    obj.x -= 1;

    if (obj.x < 0) {
      obj.remove();
    }
  }
}

function spawnObjects() {
  const randomLane = lanes[
    Math.floor(Math.random() * lanes.length)
  ];

  const randomNumber = Math.random();

  if (randomNumber < 0.25) {
    addSprite(9, randomLane, obstacle);
  } else if (randomNumber < 0.50) {
    addSprite(9, randomLane, coin);
  } else if (randomNumber < 0.60) {
    addSprite(9, randomLane, shield);
  }
}

function checkCollision() {
  const runner = getFirst(player);

  // Obstacle collision
  const obstacles = getAll(obstacle);

  for (const obj of obstacles) {
    if (runner.x === obj.x && runner.y === obj.y) {

      if (shieldActive) {
        shieldActive = false;
        obj.remove();
        return;
      }

      endGame();
      return;
    }
  }

  // Coin collection
  const coins = getAll(coin);

  for (const obj of coins) {
    if (runner.x === obj.x && runner.y === obj.y) {
      obj.remove();

      score += 10;

      playTune(coinSound);
    }
  }

  // Shield collection
  const shields = getAll(shield);

  for (const obj of shields) {
    if (runner.x === obj.x && runner.y === obj.y) {
      obj.remove();
      shieldActive = true;
      return;
    }
  }
}

function updateDifficulty() {
  let newSpeed = 500 - Math.floor(score / 50) * 50;

  if (newSpeed < 150) {
    newSpeed = 150;
  }

  if (newSpeed !== currentSpeed) {
    currentSpeed = newSpeed;

    clearInterval(gameLoop);

    gameLoop = setInterval(gameStep, currentSpeed);
  }
}

function gameStep() {
  if (!gameStarted || gameOver || isPaused) {
    return;
  }

  moveObjects();

  checkCollision();

  if (gameOver) {
    return;
  }

  spawnObjects();

  score++;

  updateScore();

  // Display shield status
  if (shieldActive) {
    addText("SHIELD: ON", {
      x: 1,
      y: 1,
      color: color`5`
    });
  }

  updateDifficulty();
}

function startGame() {
  if (gameStarted || gameOver) {
    return;
  }

  gameStarted = true;
  isPaused = false;

  currentSpeed = 500;

  musicPlayback = playTune(backgroundMusic, Infinity);

  clearText();
  updateScore();

  gameLoop = setInterval(gameStep, currentSpeed);
}

function pauseGame() {
  if (!gameStarted || gameOver || isPaused) {
    return;
  }

  isPaused = true;

  clearInterval(gameLoop);

  if (musicPlayback) {
    musicPlayback.end();
    musicPlayback = null;
  }

  addText("PAUSED", {
    x: 5,
    y: 4,
    color: color`6`
  });
}

function resumeGame() {
  if (!isPaused || gameOver) {
    return;
  }

  isPaused = false;

  clearText();
  updateScore();

  if (shieldActive) {
    addText("SHIELD: ON", {
      x: 1,
      y: 1,
      color: color`5`
    });
  }

  musicPlayback = playTune(backgroundMusic, Infinity);

  gameLoop = setInterval(gameStep, currentSpeed);
}

function restartGame() {
  clearInterval(gameLoop);

  if (musicPlayback) {
    musicPlayback.end();
    musicPlayback = null;
  }

  // Remove old obstacles
  getAll(obstacle).forEach(sprite => {
    sprite.remove();
  });

  // Remove old coins
  getAll(coin).forEach(sprite => {
    sprite.remove();
  });

  // Remove old shields
  getAll(shield).forEach(sprite => {
    sprite.remove();
  });

  // Reset game variables
  score = 0;
  laneIndex = 1;
  gameOver = false;
  gameStarted = false;
  isPaused = false;
  shieldActive = false;
  currentSpeed = 500;

  // Reset player position
  const runner = getFirst(player);

  runner.x = 2;
  runner.y = lanes[laneIndex];

  showStartScreen();
}

// Player movement: W and S
onInput("w", () => {
  if (!gameStarted || gameOver || isPaused) {
    return;
  }

  if (laneIndex > 0) {
    laneIndex--;
    getFirst(player).y = lanes[laneIndex];
  }
});

onInput("s", () => {
  if (!gameStarted || gameOver || isPaused) {
    return;
  }

  if (laneIndex < 2) {
    laneIndex++;
    getFirst(player).y = lanes[laneIndex];
  }
});

// Start game: J
showStartScreen();

onInput("j", () => {
  startGame();
});

// Restart: K
onInput("k", () => {
  if (gameOver) {
    restartGame();
  }
});

// Pause and resume: I
onInput("i", () => {
  if (isPaused) {
    resumeGame();
  } else {
    pauseGame();
  }
});
