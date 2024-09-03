/*
@title: FallingTiles
@author: Rishabh R
@addedOn: 2024-09-03
@tags: []
*/
const tile = "t";
const background = "b";
const line = "l";
const flashSprite = "f"; // New sprite for flashing effect

setLegend(
  [tile, bitmap`
  . . . . . . . .
  . 1 1 1 1 1 1 .
  . 1 1 1 1 1 1 .
  . 1 1 1 1 1 1 .
  . 1 1 1 1 1 1 .
  . 1 1 1 1 1 1 .
  . 1 1 1 1 1 1 .
  . . . . . . . .
  `],
  [background, bitmap`
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
................`],
  [flashSprite, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [line, bitmap`
  . . . . . . . .
  . . . . . . . .
  . . . . . . . .
  . 3 3 3 3 3 3 .
  . 3 3 3 3 3 3 .
  . . . . . . . .
  . . . . . . . .
  . . . . . . . .
  `]
);

const numColumns = 4;
const gridHeight = 8;
const gridWidth = 4;
const scoreRow = gridHeight - 3;

let score = 0;
let highScore = 0;
let misses = 0;
const maxMisses = 5;
let gameOver = false;

let tilesReadyToRemove = [];
const spawnRate = 600;
const moveRate = 300;

let currentState = "start";
let gameLoopInterval, spawnInterval, moveInterval;

const missedSound = tune`
65.50218340611353: F4/65.50218340611353,
65.50218340611353: C4/65.50218340611353,
1965.065502183406`;
const scoredSound = tune`
42.97994269340974: G5-42.97994269340974,
42.97994269340974: B5-42.97994269340974,
1289.3982808022922`;

const inputCooldowns = [false, false, false, false]; // Track cooldowns for each column
const keyStates = { a: false, d: false, j: false, l: false }; // Track if a key is pressed

function startScreen() {
  clearText();
  addText("Falling Tiles", { x: 4, y: 2, color: color`0` });
  addText("press s to start", { x: 2, y: 14, color: color`L` });
  setMap(map`
.....
.....
.....
.....`);
}

function gameScreen() {
  score = 0;
  misses = 0;
  gameOver = false;
  tilesReadyToRemove = [];

  const level = map`
....
....
....
....
....
....
....
....`;

  setMap(level);
  setBackground(background);

  for (let x = 0; x < gridWidth; x++) {
    addSprite(x, scoreRow, line);
  }

  onInput("a", () => handleInput(0, "a"));
  onInput("d", () => handleInput(1, "d"));
  onInput("j", () => handleInput(2, "j"));
  onInput("l", () => handleInput(3, "l"));

  // Reset the key state after each input
  afterInput(() => {
    resetKeyState("a");
    resetKeyState("d");
    resetKeyState("j");
    resetKeyState("l");
  });

  gameLoopInterval = setInterval(gameLoop, 50);
  spawnInterval = setInterval(spawnTile, spawnRate);
  moveInterval = setInterval(handleTileMovement, moveRate);
}

function loseScreen() {
  if (score > highScore) highScore = score;
  clearText();
  addText("YOU LOSE", { x: 6, y: 2, color: color`3` });
  addText(`Score: ${score}`, { x: 6, y: 5, color: color`5` });

  if (score === highScore) {
    addText(`NEW High Score: ${highScore}`, { x: 2, y: 7, color: color`6` });
  } else {
    addText(`High Score: ${highScore}`, { x: 4, y: 7, color: color`6` });
  }

  addText("press w to restart", { x: 1, y: 14, color: color`L` });
  setMap(map`
.....
.....
.....
.....`);
}

function updateScore() {
  clearText();
  addText("Score: " + score, {
    x: 0,
    y: 0,
    color: gameOver ? color`3` : color`5`
  });
  addText("Misses: " + misses, {
    x: 0,
    y: 1,
    color: gameOver ? color`3` : color`5`
  });
}

function spawnTile() {
  if (currentState !== "game") return;
  if (Math.random() >= 0.5) {
    const col = Math.floor(Math.random() * numColumns);
    addSprite(col, 0, tile);
  }
}

function handleTileMovement() {
  if (currentState !== "game") return;

  const allTiles = getAll(tile);
  const newTilesReadyToRemove = [];

  allTiles.forEach(t => {
    if (t.y < gridHeight - 1) {
      t.y += 1;
      if (t.y == gridHeight - 1) newTilesReadyToRemove.push(t);
    } else if (tilesReadyToRemove.includes(t)) {
      t.remove();
      misses++;
      playTune(missedSound);
      if (misses >= maxMisses) {
        gameOver = true;
        currentState = "lose";
        clearInterval(gameLoopInterval);
        clearInterval(spawnInterval);
        clearInterval(moveInterval);
        loseScreen();
      }
    }
  });

  tilesReadyToRemove = newTilesReadyToRemove;
}

function handleInput(col, key) {
  if (currentState !== "game" || inputCooldowns[col] || keyStates[key]) return;

  keyStates[key] = true; // Mark key as held

  // Original input handling logic
  inputCooldowns[col] = true;
  flashColumn(col);
  checkScored(col);

  setTimeout(() => inputCooldowns[col] = false, 200); // Cooldown duration
}

function resetKeyState(key) {
  keyStates[key] = false; // Mark key as released
}

function flashColumn(col) {
  // Add flash sprites to the column
  for (let y = 0; y < gridHeight; y++) {
    addSprite(col, y, flashSprite);
  }

  // Remove flash sprites after a short duration
  setTimeout(() => removeFlashColumn(col), 100); // Flash duration of 100ms
}

function removeFlashColumn(col) {
  const flashSprites = getAll(flashSprite).filter(s => s.x === col);
  flashSprites.forEach(sprite => sprite.remove());
}

function checkScored(col) {
  const tileAtScoreRow = getTile(col, scoreRow).find(t => t.type === tile);
  if (tileAtScoreRow) {
    tileAtScoreRow.remove();
    score++;
    playTune(scoredSound);
  }
}

function gameLoop() {
  if (currentState !== "game") return;
  updateScore();
}

function resetGame() {
  clearInterval(gameLoopInterval);
  gameScreen();
}

onInput("s", () => {
  if (currentState === "start") {
    currentState = "game";
    gameScreen();
  }
});

onInput("w", () => {
  if (currentState === "lose") {
    currentState = "start";
    startScreen();
  }
});

startScreen();

