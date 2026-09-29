/*
@title: Flappy Spring
@author: Piyush
@description: Score, difficulty and sounds
@tags: ['arcade']
*/

const bird = "b";
const pipe = "p";
const ground = "g";
const sky = "s";

setLegend(
  [bird, bitmap`
................
................
......666.......
....666666......
...666666660....
..66666666600...
..666666666660..
..666666666666..
..666666666660..
...6666666666...
....66666666....
.....66..66.....
................
................
................
................`],
  [pipe, bitmap`
...DDDDDDDDDD...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
...DDDDDDDDDD...`],
  [ground, bitmap`
6666666666666666
6666666666666666
CCCCCCCCCCCCCCCC
CC9CC9CC9CC9CC9C
C9CC9CC9CC9CC9CC
CCCCCCCCCCCCCCCC
9999999999999999
99C999C999C999C9
9C999C999C999C99
9999999999999999
CCCCCCCCCCCCCCCC
CC9CC9CC9CC9CC9C
C9CC9CC9CC9CC9CC
CCCCCCCCCCCCCCCC
9999999999999999
9999999999999999`],
  [sky, bitmap`
7777777777777777
7777777777777777
7777777777722777
7777777772222277
7777777722222227
7777777772222277
7777777777722777
7777777777777777
7777777777777777
7777722777777777
7777222277777777
7777722777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`]
);

setBackground(sky);
setSolids([]);

const gameMap = map`
..........
..........
..........
..........
..........
..........
..........
gggggggggg`;

const jumpSound = tune`
50: C5~50,
1550`;

const pointSound = tune`
50: E5~50,
50: G5~50,
1500`;

const hitSound = tune`
100: C3-100,
100: B2-100,
100: A2-100,
1300`;

const startSound = tune`
100: C5~100,
100: E5~100,
100: G5~100,
1300`;

let birdX = 2;
let birdY = 3;
let gravityCounter = 0;
let tickCount = 0;

let pipes = [];
let score = 0;
let highScore = 0;

let gameStarted = false;
let gameOver = false;
let paused = false;

let gameSpeed = 320;
let gameLoop;

function randomGap() {
  return Math.floor(Math.random() * 4) + 1;
}

function createPipe() {
  pipes.push({ x: 9, gapY: randomGap(), scored: false });
}

function drawPipe(data) {
  for (let y = 0; y < 7; y++) {
    const inGap = y >= data.gapY && y < data.gapY + 2;

    if (!inGap && data.x >= 0 && data.x < 10) {
      addSprite(data.x, y, pipe);
    }
  }
}

function drawGame() {
  setMap(gameMap);

  for (let i = 0; i < pipes.length; i++) {
    drawPipe(pipes[i]);
  }

  addSprite(birdX, birdY, bird);

  clearText();
  addText("SCORE " + score, {
    x: 1,
    y: 1,
    color: color`2`
  });

  if (paused) {
    addText("PAUSED", {
      x: 7,
      y: 6,
      color: color`3`
    });

    addText("J TO CONTINUE", {
      x: 3,
      y: 9,
      color: color`2`
    });
  }

  if (gameOver) {
    addText("GAME OVER", {
      x: 5,
      y: 5,
      color: color`3`
    });

    addText("BEST " + highScore, {
      x: 6,
      y: 8,
      color: color`6`
    });

    addText("W TO RESTART", {
      x: 4,
      y: 11,
      color: color`2`
    });
  }
}

function showStartScreen() {
  setMap(gameMap);
  clearText();

  addSprite(2, 3, bird);

  addText("FLAPPY SPRIG", {
    x: 4,
    y: 3,
    color: color`6`
  });

  addText("W / I TO FLY", {
    x: 4,
    y: 6,
    color: color`2`
  });

  addText("J TO PAUSE", {
    x: 5,
    y: 8,
    color: color`2`
  });

  addText("PRESS W", {
    x: 6,
    y: 11,
    color: color`4`
  });
}

function collided() {
  if (birdY >= 7) return true;

  for (let i = 0; i < pipes.length; i++) {
    let data = pipes[i];

    if (data.x === birdX) {
      const safe = birdY >= data.gapY && birdY < data.gapY + 2;

      if (!safe) {
        return true;
      }
    }
  }

  return false;
}

function restartLoop() {
  if (gameLoop) {
    clearInterval(gameLoop);
  }

  gameLoop = setInterval(gameTick, gameSpeed);
}

function startGame() {
  birdY = 3;
  pipes = [];
  score = 0;
  tickCount = 0;
  gravityCounter = 0;

  gameSpeed = 320;
  gameStarted = true;
  gameOver = false;
  paused = false;

  playTune(startSound);

  restartLoop();
  drawGame();
}

function flap() {
  if (!gameStarted || gameOver) {
    startGame();
    return;
  }

  if (paused) {
    return;
  }

  birdY -= 1;

  if (birdY < 0) {
    birdY = 0;
  }

  gravityCounter = 0;

  playTune(jumpSound);
  drawGame();
}

function togglePause() {
  if (!gameStarted || gameOver) {
    return;
  }

  paused = !paused;
  drawGame();
}

function gameTick() {
  if (!gameStarted || gameOver || paused) return;

  tickCount += 1;
  gravityCounter += 1;

  // gravity
  if (gravityCounter >= 2) {
    birdY += 1;
    gravityCounter = 0;
  }

  // new pipe every 5 ticks
  if (tickCount % 5 === 0) {
    createPipe();
  }

  // move pipes
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x -= 1;

    if (pipes[i].x < birdX && !pipes[i].scored) {
      pipes[i].scored = true;
      score += 1;

      playTune(pointSound);

      // make it faster
      if (score % 5 === 0 && gameSpeed > 160) {
        gameSpeed -= 20;
        restartLoop();
      }
    }
  }

  // remove pipes that left the screen
  pipes = pipes.filter(function(data) {
    return data.x >= 0;
  });

  drawGame();

  if (collided()) {
    gameOver = true;
    gameStarted = false;

    clearInterval(gameLoop);

    if (score > highScore) {
      highScore = score;
    }

    playTune(hitSound);
    drawGame();
  }
}

onInput("w", flap);
onInput("i", flap);
onInput("j", togglePause);
onInput("k", startGame);

showStartScreen();
