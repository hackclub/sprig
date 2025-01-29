/*
@title: Among Us Survival
@author: anvayajmera
@tags: ['survival']
@addedOn: 2024-07-26
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
...9999999999...
...9333333339...
...9333333339...
...9330000339...
...9330000339...
...9330000339...
...9333333339...
...9333333339...
...9999999999...
................
................
................`],
  
  [PLAYER, bitmap`
.....00000000...
....0333333330..
...033333300000.
...0333330772220
...0333330777770
.000333330777770
0330333333000000
033033333333330.
033033333333330.
033033333333330.
033033300003330.
.0003330..03330.
...03330..03330.
....000....000..
................
................`], 

  [BG, bitmap`
1111111111111111
1111111111111111
1111111111111111
1L11111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111L11111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`]
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
  addText("Difficulty:", { x: 2, y: 4, color: color`2` });
  addText("i. Easy", { x: 2, y: 6, color: color`2` });
  addText("j. Medium", { x: 2, y: 8, color: color`2` });
  addText("k. Hard", { x: 2, y: 10, color: color`2` });
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
    difficulty = 3;
    gameStarted = true;
    startGame();
  }
});

onInput("k", () => {
  if (!gameStarted) {
    difficulty = 4;
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
      addText(`Score: ${score}`, { x: 1, y: 1, color: color`3` });
      despawnRocks();
      moveRocks();
      spawnRock();
    }
    
    if (checkCollision()) {
      deadStatus = true;
      addText("GAME OVER", { x: 6, y: 4, color: color`6` });
      addText("Score: " + score, { x: 6, y: 7, color: color`6` });
      addText("i to Restart", { x: 4, y: 10, color: color`6` });
      clearInterval(gameLoop);
      gameStarted = false;
    }
  }, 1000 / difficulty);
}

displayHomeScreen();
