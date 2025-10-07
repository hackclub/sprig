let score = 0;
const WIN_SCORE = 50;
let ASTEROID_SPAWN_RATE = 1000;
const GEM_SPAWN_RATE = 6;
let tickCount = 60;
let isGameOver = false;
let highScore = 0;
setLegend(
  ["P", bitmap`
.....000000.....
...0.067760.0...
...0007557000...
.....075570.....
.....067760.....
...0000000000...
..00...00...00..
......0000......
.....000000.....
...0006006000...
..0099H00H9900..
.00633H00H33600.
006H99600699H600
.00000000000000.
.66660033006666.
.3333.0000.3333.`],
  ["G", bitmap`
................
.....000000.....
....00444400....
...0044224400...
...0446666440...
...0426556240...
...0426556240...
...0446666440...
...0044224400...
....00444400....
.....000000.....
................
................
................
................
................`],
  ["A", bitmap`
................
................
.......33.......
......3333......
.....333333.....
....33.33.33....
...33.3333.33...
..333333333333..
..333.3333.333..
...33.3333.33...
....33.33.33....
.....333333.....
......3333......
.......33.......
................
................`]
);
setMap(map`
..........
..........
..........
..........
..........
..........
.....P....
..........
..........
..........
..........`);const player = getFirst("P");
function canMoveSprite(sprite, dx, dy) {
  const newX = sprite.x + dx;
  const newY = sprite.y + dy;
  return newX >= 0 && newX < 10 && newY >= 0 && newY < 10;
}
onInput("d", () => {
  if (isGameOver) return;
  if (canMoveSprite(player, 1, 0)) {
    player.x += 1;
    checkCollisions();
  }
});

onInput("a", () => {
  if (isGameOver) return;
  if (canMoveSprite(player, -1, 0)) {
    player.x -= 1;
    checkCollisions();
  }
});

onInput("s", () => {
  if (isGameOver) return;
  if (canMoveSprite(player, 0, 1)) {
    player.y += 1;
    checkCollisions();
  }
});

onInput("w", () => {
  if (isGameOver) return;
  if (canMoveSprite(player, 0, -1)) {
    player.y -= 1;
    checkCollisions();
  }
});
function checkCollisions() {
  const tilesAtPlayer = getTile(player.x, player.y);
  
  for (const sprite of tilesAtPlayer) {
    if (sprite === player) continue;
    
    if (sprite.type === "G") {
      sprite.remove();
      score++;
      updateScoreDisplay();
      
      if (score >= WIN_SCORE) {
        endGame(true);
        return;
      }
    }
    
    if (sprite.type === "A") {
      endGame(false);
      return;
    }
  }
}
function spawnNewItem(type) {
  const freePositions = [];
  for (let x = 0; x < 10; x++) {
    const spritesHere = getTile(x, 0);
    if (spritesHere.length === 0) {
      freePositions.push(x);
    }
  }
  if (freePositions.length > 0) {
    const spawnX = freePositions[Math.floor(Math.random() * freePositions.length)];
    addSprite(spawnX, 0, type);
  }
}
let gameInterval = setInterval(() => {
  if (isGameOver) return; 
  const asteroids = getAll("A");
  for (let i = asteroids.length - 1; i >= 0; i--) {
    const asteroid = asteroids[i];
    if (canMoveSprite(asteroid, 0, 1)) {
      asteroid.y += 1;
      
      if (asteroid.x === player.x && asteroid.y === player.y) {
        endGame(false);
        return;
      }
    } else {
      asteroid.remove(); 
    }
  }

  
  const gems = getAll("G");
  for (let i = gems.length - 1; i >= 0; i--) {
    const gem = gems[i];
    if (canMoveSprite(gem, 0, 1)) {
      gem.y += 1;
    } else {
      gem.remove(); 
    }
  }
  tickCount++;
  ASTEROID_SPAWN_RATE = Math.max(0, 6- Math.floor(score / 2));
  
  if (tickCount % ASTEROID_SPAWN_RATE === 0) {
    spawnNewItem("A");
  }
  if (tickCount % GEM_SPAWN_RATE === 0) {
    spawnNewItem("G");
  }
}, 300);
function updateScoreDisplay() {
  clearText();
  addText(`Gems: ${score}/${WIN_SCORE}`, { x: 1, y: 1, color: color`6` });
  if (highScore > 0) {
    addText(`High: ${highScore}`, { x: 1, y: 2, color: color`3` });
  }
}
function endGame(won) {
  isGameOver = true;
  clearInterval(gameInterval);
  
  if (score > highScore) {
    highScore = score;
  }
  
  clearText();
  if (won) {
    addText("YOU WIN!", { x: 6, y: 7, color: color`4` });
    addText(`Final Score: ${score}`, { x: 2, y: 8, color: color`6` });
  } else {
    addText("CRASHED!", { x: 6, y: 7, color: color`3` });
    addText("GAME OVER", { x: 5, y: 8, color: color`3` });
    addText(`Score: ${score}`, { x: 6, y: 9, color: color`6` });
  }
  addText("Press J to restart", { x: 2, y: 11, color: color`4` });
}
onInput("j", () => { 
  if (isGameOver) restartGame(); 
});

function restartGame() {
  clearInterval(gameInterval);
   score = 0;
  tickCount = 0;
  isGameOver = false;
  ASTEROID_SPAWN_RATE = 30;
  getAll("A").forEach(sprite => sprite.remove());
  getAll("G").forEach(sprite => sprite.remove());
  player.x = 0;
  player.y = 0;
  gameInterval = setInterval(() => {
    if (isGameOver) return;
    const asteroids = getAll("A");
    for (let i = asteroids.length - 1; i >= 0; i--) {
      const asteroid = asteroids[i];
      if (canMoveSprite(asteroid, 0, 1)) {
        asteroid.y += 1;
        if (asteroid.x === player.x && asteroid.y === player.y) {
          endGame(false);
          return;
        }
      } else {
        asteroid.remove();
      }
    }
    const gems = getAll("G");
    for (let i = gems.length - 1; i >= 0; i--) {
      const gem = gems[i];
      if (canMoveSprite(gem, 0, 1)) {
        gem.y += 1;
      } else {
        gem.remove();
      }
    }
    tickCount++;
    ASTEROID_SPAWN_RATE = Math.max(100, 200 - Math.floor(score / 2));
    
    if (tickCount % ASTEROID_SPAWN_RATE === 0) {
      spawnNewItem("A");
    }
    if (tickCount % GEM_SPAWN_RATE === 0) {
      spawnNewItem("G");
    }
  }, 300);
  updateScoreDisplay();
}
updateScoreDisplay();
