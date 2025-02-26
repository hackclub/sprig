//@title: Flappy bird v.2
//@author: Alexandru Moga
//@tags: []
//@addedOn: 02/26/2026

const bird = "b";
const pipe = "p";
const background = "s";
const score1 = tune`
500: G5~500 + B5~500,
15500`;
const dead = tune`
500: E4-500 + D4-500 + C4-500 + F4-500 + G4-500,
15500`;
const gameOverScreen = "g";

let frameCount = 0;
let score = 0;
let isGameOver = false;
let birdY = 3;
let pipes = [];

setLegend(
  [bird, bitmap`
................
................
......000000....
....002220220...
...02266022220..
.00006660222020.
022220660222020.
022222066022220.
0622260660000000
.066606603333333
..00099030000000
..09999903333330
...009999000000.
.....00000......
................
................`],
  [pipe, bitmap`
DDDDDDDDDDDDDDDD
D444D4444D44444D
D444D44444D4444D
D444D44444D4444D
DDDDDDDDDDDDDDDD
D444444D4444D44D
D444444D4444D44D
D444444D4444D44D
DDDDDDDDDDDDDDDD
D44D4444D444D44D
D44D4444D444D44D
D44D4444D4444D4D
DDDDDDDDDDDDDDDD
D4444444D4444D4D
D4444444D4444D4D
D4444444D4444D4D`],
  [background, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [gameOverScreen, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`]
);

setBackground(background);

const level = map`
..........
..........
..........
..........
..........
..........
..........
..........`;

setMap(level);

function spawnPipes() {
  const gapY = Math.floor(Math.random() * 6) + 1;

  for (let y = 0; y < 8; y++) {
    if (y < gapY || y > gapY + 0) {
      addSprite(9, y, pipe);
    }
  }
}

function movePipes() {
  getAll(pipe).forEach((p) => {
    p.x -= 1;
    if (p.x <= 0) {
      p.remove();
    }
  });

  if (getAll(pipe).length === 0) {
    playTune(score1);
    spawnPipes();
    score++;
  }
}


function updateBirdPosition() {
  clearTile(3, birdY);

  addSprite(3, birdY, bird);
}

function checkCollision() {
  const birdTile = tilesWith(bird, pipe);
  if (birdTile.length > 0) endGame();
}

function endGame() {
  isGameOver = true;
  clearScreen();
  setBackground(gameOverScreen);
  playTune(score1);
  addText("Game Over", { 
    x: 6,
    y: 5,
    color: color`2`
  });
  
  addText(`Score: ${score}`, { 
    x: 6,
    y: 7,
    color: color`2`
  });
}

function resetGame() {
  isGameOver = false;
  score = 0;
  birdY = 3;
  frameCount = 0;
  clearScreen();
  setBackground(background);
  spawnPipes();
  updateBirdPosition();
  gameLoop();
}

onInput("w", () => {
  if (isGameOver) {
    resetGame();
  } else if (birdY > 0) {
    clearTile(3, birdY);
    birdY -= 1;
    updateBirdPosition();
  }
});

onInput("s", () => {
  if (isGameOver) {
    resetGame();
  } else if (birdY < 7) {
    clearTile(3, birdY);
    birdY += 1;
    updateBirdPosition();
  }
});

onInput("a", () => {
  if (isGameOver) resetGame();
});

onInput("d", () => {
  if (isGameOver) resetGame();
});

function gameLoop() {
  if (!isGameOver) {
    movePipes();
    checkCollision();
    
    if (frameCount % 10 === 0) {
      applyGravity();
    }
    
    frameCount++;
    setTimeout(gameLoop, 200);
  }
}


function clearScreen() {
  getAll(pipe).forEach(p => p.remove());
  clearTile(3, birdY);
  clearText();
}

function applyGravity() {
  if (!isGameOver && birdY < 7) {
    clearTile(3, birdY);
    birdY += 1;
    updateBirdPosition();
  }
}


spawnPipes();
updateBirdPosition();
gameLoop();
