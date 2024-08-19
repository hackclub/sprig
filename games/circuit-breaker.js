/*
@title: Circuit Breaker
@author: Stefan D
@tags: ["maze", "wire"]
@addedOn: 2024-08-18
*/

const player = "p";
const wall = "w";
const wire = "1";
const wireActive = "2";
const switchOff = "s";
const switchOn = "S";
const ghost = "g";

let ghostStartX = 5;
let ghost1YPosition = 4;
let ghost1Direction = 1;

let ghost2StartX = 7;
let ghost2YPosition = 3;
let ghost2Direction = 1;

let ghost3StartX = 2;
let ghost3YPosition = 5;
let ghost3Direction = 1;

let ghost4StartX = 4;
let ghost4YPosition = 2;
let ghost4Direction = 1;

let ghost5StartX = 6;
let ghost5YPosition = 4;
let ghost5Direction = 1;

let ghostDiagonal1X = 1;
let ghostDiagonal1Y = 1;
let ghostDiagonal1XDirection = 1;
let ghostDiagonal1YDirection = 1;

let ghostDiagonal2X = 8;
let ghostDiagonal2Y = 6;
let ghostDiagonal2XDirection = -1;
let ghostDiagonal2YDirection = -1;

setLegend(
  [player, bitmap`
  . . . . . . . .
  . . 5 5 5 5 . .
  . 5 . . . . 5 .
  . 5 . 5 5 . 5 .
  . 5 . 5 5 . 5 .
  . 5 . . . . 5 .
  . . 5 5 5 5 . .
  . . . . . . . .
  `],
  [wall, bitmap`
  . . . . . . . .
  . 3 3 3 3 3 3 .
  . 3 3 3 3 3 3 .
  . 3 3 3 3 3 3 .
  . 3 3 3 3 3 3 .
  . 3 3 3 3 3 3 .
  . 3 3 3 3 3 3 .
  . . . . . . . .
  `],
  [wire, bitmap`
  . . . . . . . .
  . . . . . . . .
  . . . 2 2 . . .
  . . . 2 2 . . .
  . . . 2 2 . . .
  . . . 2 2 . . .
  . . . . . . . .
  . . . . . . . .
  `],
  [wireActive, bitmap`
  . . . . . . . .
  . . . . . . . .
  . . . 6 6 . . .
  . . . 6 6 . . .
  . . . 6 6 . . .
  . . . 6 6 . . .
  . . . . . . . .
  . . . . . . . .
  `],
  [switchOff, bitmap`
  . . . . . . . .
  . . 4 4 4 4 . .
  . 4 . . . . 4 .
  . 4 . 4 4 . 4 .
  . 4 . 4 4 . 4 .
  . 4 . . . . 4 .
  . . 4 4 4 4 . .
  . . . . . . . .
  `],
  [switchOn, bitmap`
  . . . . . . . .
  . . 8 8 8 8 . .
  . 8 . . . . 8 .
  . 8 . 8 8 . 8 .
  . 8 . 8 8 . 8 .
  . 8 . . . . 8 .
  . . 8 8 8 8 . .
  . . . . . . . .
  `],
  [ghost, bitmap`
  . . . . . . . .
  . . . 8 8 . . .
  . . 8 8 8 8 . .
  . 8 8 . . 8 8 .
  . 8 8 8 8 8 8 .
  . 8 8 8 8 8 8 .
  . . 8 8 8 8 . .
  . . . 8 8 . . .
  `]
);

const level1 = map`
wwwwwwwwww
w........w
w.p......w
w..1..s..w
w..1..g..w
w..1..w..w
w..1..w..w
wwwwwwwwww
`;

const level2 = map`
wwwwwwwwww
w........w
w.p......w
w........w
w..1..s..w
w....g...w
w..1..w..w
wwwwwwwwww
`;

const level3 = map`
wwwwwwwwww
w..p..g..w
w..1..1..w
w..g.....w
w..1..s..w
w........w
w..1..w..w
wwwwwwwwww
`;

const level4 = map`
wwwwwwwwww
w..p.....w
w..1.S1..w
w...S....w
w..1..s..w
w........w
w..1..w..w
wwwwwwwwww
`;

const level5 = map`
wwwwwwwwww
w........w
w.p......w
w........w
w..1..s..w
w....g...w
w..1..w..w
wwwwwwwwww
`;

let maxSteps = 6;
let currentSteps = 0;
let isGameOver = false;
let ghost1Interval, ghost2Interval, ghost3Interval, ghost4Interval, ghost5Interval, ghostDiagonal1Interval, ghostDiagonal2Interval;
let currentLevel = 1; // Track the current level

function updateStepCounter() {
  clearText();
  addText(`${maxSteps - currentSteps}`, { x: 14, y: 1, color: color`0` });
}

function resetGame() {
  currentLevel = 1;
  setMap(level1);
  maxSteps = 6;
  currentSteps = 0;
  isGameOver = false;
  updateStepCounter();
  clearText();
  startGhost1Movement();
}

function gameOver(message) {
  isGameOver = true;
  clearInterval(ghost1Interval);
  clearInterval(ghost2Interval);
  clearInterval(ghost3Interval);
  clearInterval(ghost4Interval);
  clearInterval(ghost5Interval);
  clearInterval(ghostDiagonal1Interval);
  clearInterval(ghostDiagonal2Interval);
  addText(message, { x: 1, y: 8, color: color`0` });
  addText("Press W!", { x: 1, y: 9, color: color`0` });
}

function moveToLevel2() {
  clearInterval(ghost1Interval);
  addText("Circuit Achieved!", { x: 1, y: 8, color: color`0` });
  setTimeout(() => {
    setMap(level2);
    currentLevel = 2;
    maxSteps = 7;
    currentSteps = 0;
    isGameOver = false;
    clearText();
    startGhost2MovementLevel2();
    startGhost3MovementLevel2();
    updateStepCounter();
  }, 1000);
}

function moveToLevel3() {
  clearInterval(ghost2Interval);
  clearInterval(ghost3Interval);
  addText("Circuit Achieved!", { x: 1, y: 8, color: color`0` });
  setTimeout(() => {
    setMap(level3);
    currentLevel = 3;
    maxSteps = 8;
    currentSteps = 0;
    isGameOver = false;
    clearText();
    startGhost4MovementLevel3();
    updateStepCounter();
  }, 1000);
}

function moveToLevel4() {
  clearInterval(ghost4Interval);
  addText("Circuit Achieved!", { x: 1, y: 8, color: color`0` });
  setTimeout(() => {
    setMap(level4);
    currentLevel = 4;
    maxSteps = 9;
    currentSteps = 0;
    isGameOver = false;
    clearText();
    startGhost5MovementLevel4();
    updateStepCounter();
  }, 1000);
}

function moveToLevel5() {
  clearInterval(ghost5Interval);
  addText("Circuit Achieved!", { x: 1, y: 8, color: color`0` });
  setTimeout(() => {
    setMap(level5);
    currentLevel = 5;
    maxSteps = 7;
    currentSteps = 0;
    isGameOver = false;
    clearText();
    startGhostDiagonal1MovementLevel5();
    startGhostDiagonal2MovementLevel5();
    updateStepCounter();
  }, 1000);
}

function showDoneScreen() {
  clearText();
  clearInterval(ghostDiagonal1Interval);
  clearInterval(ghostDiagonal2Interval);
  addText("You Won!", { x: 4, y: 4, color: color`0` });
}

setMap(level1);
setSolids([player, wall]);
updateStepCounter();

onInput("w", () => {
  if (isGameOver) {
    resetGame();
  } else {
    movePlayer(0, -1);
  }
});

onInput("a", () => {
  movePlayer(-1, 0);
});

onInput("s", () => {
  movePlayer(0, 1);
});

onInput("d", () => {
  movePlayer(1, 0);
});

function movePlayer(dx, dy) {
  if (isGameOver) return;
  const p = getFirst(player);
  if (p && currentSteps < maxSteps) {
    const newX = p.x + dx;
    const newY = p.y + dy;
    const destinationTile = getTile(newX, newY);

    if (destinationTile.some(tile => tile.type === wall)) {
      gameOver("You hit a wall!");
      return;
    }

    if (destinationTile.some(tile => tile.type === ghost)) {
      gameOver("You were caught!");
      return;
    }

    p.x = newX;
    p.y = newY;
    currentSteps++;
    updateStepCounter();
    checkGameOver();
  }
}

function checkGameOver() {
  const p = getFirst(player);
  if (currentSteps >= maxSteps) {
    gameOver("Level failed!");
    return;
  }

  const playerTile = getTile(p.x, p.y);
  if (playerTile.some(tile => tile.type === switchOff)) {
    clearTile(p.x, p.y);
    addSprite(p.x, p.y, switchOn);
    getAll(wire).forEach(wireTile => {
      clearTile(wireTile.x, wireTile.y);
      addSprite(wireTile.x, wireTile.y, wireActive);
    });

    if (currentLevel === 1) {
      moveToLevel2();
    } else if (currentLevel === 2) {
      moveToLevel3();
    } else if (currentLevel === 3) {
      moveToLevel4();
    } else if (currentLevel === 4) {
      moveToLevel5();
    } else if (currentLevel === 5) {
      showDoneScreen();
    }
  }
}

function startGhost1Movement() {
  addSprite(ghostStartX, ghost1YPosition, ghost);

  ghost1Interval = setInterval(() => {
    const g = getFirst(ghost);
    if (g) {
      const newY = g.y + ghost1Direction;

      if (newY < 2 || newY > 6) {
        ghost1Direction *= -1;
      }

      g.y = newY;

      const playerTile = getTile(g.x, g.y);
      if (playerTile.some(tile => tile.type === player)) {
        gameOver("You were caught!");
      }
    }
  }, 200);
}

function startGhost2MovementLevel2() {
  addSprite(ghost2StartX, ghost2YPosition, ghost);

  ghost2Interval = setInterval(() => {
    const g = getFirst(ghost);
    if (g) {
      const newY = g.y + ghost2Direction;

      if (newY < 2 || newY > 6) {
        ghost2Direction *= -1;
      }

      g.y = newY;

      const playerTile = getTile(g.x, g.y);
      if (playerTile.some(tile => tile.type === player)) {
        gameOver("You were caught!");
      }
    }
  }, 200);
}

function startGhost3MovementLevel2() {
  addSprite(ghost3StartX, ghost3YPosition, ghost);

  ghost3Interval = setInterval(() => {
    const g = getFirst(ghost);
    if (g) {
      const newX = g.x + ghost3Direction;

      if (newX < 1 || newX > 8) {
        ghost3Direction *= -1;
      }

      g.x = newX;

      const playerTile = getTile(g.x, g.y);
      if (playerTile.some(tile => tile.type === player)) {
        gameOver("You were caught!");
      }
    }
  }, 400);
}

function startGhost4MovementLevel3() {
  addSprite(ghost4StartX, ghost4YPosition, ghost);

  ghost4Interval = setInterval(() => {
    const g = getFirst(ghost);
    if (g) {
      const newY = g.y + ghost4Direction;

      if (newY < 2 || newY > 6) {
        ghost4Direction *= -1;
      }

      g.y = newY;

      const playerTile = getTile(g.x, g.y);
      if (playerTile.some(tile => tile.type === player)) {
        gameOver("You were caught!");
      }
    }
  }, 300);
}

function startGhost5MovementLevel4() {
  addSprite(ghost5StartX, ghost5YPosition, ghost);

  ghost5Interval = setInterval(() => {
    const g = getFirst(ghost);
    if (g) {
      const newY = g.y + ghost5Direction;

      if (newY < 2 || newY > 6) {
        ghost5Direction *= -1;
      }

      g.y = newY;

      const playerTile = getTile(g.x, g.y);
      if (playerTile.some(tile => tile.type === player)) {
        gameOver("You were caught!");
      }
    }
  }, 300);
}

function startGhostDiagonal1MovementLevel5() {
  addSprite(ghostDiagonal1X, ghostDiagonal1Y, ghost);
  
  ghostDiagonal1Interval = setInterval(() => {
    const g = getFirst(ghost);
    if (g) {
      const newY = g.y + ghost;

      if (newY < 2 || newY > 6) {
        ghostDiagonal1XDirection *= -1;
      }

      g.y = newY;

      const playerTile = getTile(g.x, g.y);
      if (playerTile.some(tile => tile.type === player)) {
        gameOver("You were caught!");
      }
    }
  }, 300);
}

function startGhostDiagonal2MovementLevel5() {
  addSprite(ghostDiagonal2X, ghostDiagonal2Y, ghost);

  ghostDiagonal2Interval = setInterval(() => {
    const g = getFirst(ghost);
    if (g) {
      const newY = g.y + ghost;

      if (newY < 2 || newY > 6) {
        ghostDiagonal2XDirection *= -1;
      }

      g.y = newY;

      const playerTile = getTile(g.x, g.y);
      if (playerTile.some(tile => tile.type === player)) {
        gameOver("You were caught!");
      }
    }
  }, 300);
}

startGhost1Movement();
