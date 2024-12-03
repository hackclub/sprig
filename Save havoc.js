/*
@title: Save havoc
@author: Frecnh
@tags: []
@addedOn: 2024-12-04
*/

const BG = "b";
const PLAYER = "p";
const ROCK = "r";
let deadStatus = false;
let score = 0;
let difficulty = 1;
let gameStarted = false;

setLegend(
  [ROCK, bitmap`
................
................
................
................
...0000000000...
...0000000000...
...0000000200...
...0000200000...
...0000000000...
...0000000000...
...0000002000...
...0200000000...
...0000000000...
................
................
................`],
  
  [PLAYER, bitmap`
................
....6..6........
...66.66.6......
..33333366......
.30033333.......
.320333366......
..33333336......
...333336.......
....333366......
....333336......
..3333333.......
.33333333.......
.33333333.......
.333..333.......
.333..333.......
.333..333.......`], 

  [BG, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`]
);

setBackground(BG);
setSolids([]);

let currentLevel = 0;
const gameLevels = [
  map`
........
........
........
........
........
........
........
....p...`
];

setMap(gameLevels[currentLevel]);

onInput("w", () => { if (!deadStatus) getFirst(PLAYER).y -= 1; });
onInput("a", () => { if (!deadStatus) getFirst(PLAYER).x -= 1; });
onInput("s", () => { if (!deadStatus) getFirst(PLAYER).y += 1; });
onInput("d", () => { if (!deadStatus) getFirst(PLAYER).x += 1; });

onInput("i", () => {
  if (deadStatus) {
    clearText();
    setMap(gameLevels[currentLevel]);
    score = 0;
    deadStatus = false;
    startGame();
  }
});

function spawnRock() {
  let x = Math.floor(Math.random() * 8);
  let y = 0; 
  addSprite(x, y, ROCK);
}

function moveRocks() {
  let allRocks = getAll(ROCK);
  for (let rock of allRocks) {
    rock.y += 1;
  }
}

function despawnRocks() {
  let allRocks = getAll(ROCK);
  for (let rock of allRocks) {
    if (rock.y >= 7) {
      rock.remove();
    }
  }
}

function checkCollision() {
  let allRocks = getAll(ROCK);
  let player = getFirst(PLAYER);
  for (let rock of allRocks) {
    if (rock.x === player.x && rock.y === player.y) {
      deadStatus = true;
      return true;
    }
  }
  return false;
}

function displayHomeScreen() {
  clearText();
  addText("SAVE HAVOC!", { x: 5, y: 2, color: color`3` });
  addText("Difficulty:", { x: 2, y: 4, color: color`0` });
  addText("i. Easy", { x: 2, y: 6, color: color`7` });
  addText("j. Hard", { x: 2, y: 8, color: color`H` });
  addText("k. Extreme!", { x: 2, y: 10, color: color`3` });
}

onInput("i", () => {
  if (!gameStarted) {
    difficulty = 2;
    gameStarted = true;
    startGame();
  }
});

onInput("j", () => {
  if (!gameStarted) {
    difficulty = 4;
    gameStarted = true;
    startGame();
  }
});

onInput("k", () => {
  if (!gameStarted) {
    difficulty = 7;
    gameStarted = true;
    startGame();
  }
});

function startGame() {
  clearText();
  setMap(gameLevels[currentLevel]);
  gameLoop = setInterval(() => {
    if (!deadStatus) {
      score++;
      clearText();
      addText(`Points: ${score}`, { x: 1, y: 1, color: color`3` });
      despawnRocks();
      moveRocks();
      spawnRock();
    }
    
    if (checkCollision()) {
      deadStatus = true;
      addText("GAME OVER", { x: 6, y: 4, color: color`3` });
      addText("Score: " + score, { x: 6, y: 7, color: color`5` });
      addText("i to Restart", { x: 4, y: 10, color: color`D` });
      clearInterval(gameLoop);
      gameStarted = false;
    }
  }, 1000 / difficulty);
}

displayHomeScreen();
