const player = "p";
const enemy = "e";
const wall = "w";
const exit = "x";

setLegend(
  [player, bitmap`
................
................
......0000......
....000..000....
....00....00....
....00000000....
......0..0......
......0000......
.......00.......
.......00.......
...0000000000...
.......00.......
......0000......
......0..0......
......0..0......
................`],
  [enemy, bitmap`
................
................
................
....333333333...
....33.....33...
....333...333...
....3.33.33.3...
....3.......3...
....3.....333...
....3333333.....
.......3........
.....33333......
.......3........
......333.......
......3.3.......
......3.........`],
  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [exit, bitmap`
................
....CCCCCCCCC...
....C.......C...
....C.......C...
....C.......C...
....C.......C...
....C.......C...
....C.CC....C...
....CCCC....C...
....C.CC....C...
....C.......C...
....C.......C...
....C.......C...
....C.......C...
....C.......C...
....CCCCCCCCC...`]
);

setSolids([player, wall, enemy]);

let level = 0;
const levels = [
  map`
wwwwww
wpe..w
w.ww.w
w..x.w
wwwwww`,
  map`
wwwwwwww
w..pw..w
w.wew..w
w.w.w..w
w...w..w
w...x..w
wwwwwwww`,
  map`
wwwwwwww
w.p..wxw
w..w.w.w
w..we..w
w...w..w
w......w
wwwwwwww`,
  map`
wwwwwwwww
w..p....w
w..ww...w
w...e...w
w...ww..w
w.......w
w.....x.w
wwwwwwwww`,
  map`
wwwwwwwwww
w..p.....w
w..www...w
w..w.....w
w...e....w
w.wwwww..w
w........w
w......x.w
wwwwwwwwww`
];

setMap(levels[level]);

setPushables({
  [player]: [],
  [enemy]: []
});

function movePlayer(dx, dy) {
  const playerSprite = getFirst(player);
  
  // Check if the target tile is walkable
  const targetTile = getTile(playerSprite.x + dx, playerSprite.y + dy);
  const hasWall = targetTile.some(tile => tile.type === wall);
  
  if (!hasWall) {
    playerSprite.x += dx;
    playerSprite.y += dy;
    
    // Check collision after player moves (before enemies move)
    checkPlayerCaught();
    
    // Only move enemies if player wasn't caught
    if (!checkPlayerCaught()) {
      moveEnemies();
    }
  }
}

onInput("w", () => movePlayer(0, -1));
onInput("s", () => movePlayer(0, 1));
onInput("a", () => movePlayer(-1, 0));
onInput("d", () => movePlayer(1, 0));

function checkPlayerCaught() {
  const playerSprite = getFirst(player);
  const enemies = getAll(enemy);
  
  // Debug: log positions
  console.log("Player at:", playerSprite.x, playerSprite.y);
  enemies.forEach((e, i) => {
    console.log("Enemy", i, "at:", e.x, e.y);
  });
  
  for (let enemySprite of enemies) {
    if (enemySprite.x === playerSprite.x && enemySprite.y === playerSprite.y) {
      console.log("PLAYER CAUGHT!");
      loseGame();
      return true;
    }
  }
  return false;
}

function moveEnemies() {
  const playerSprite = getFirst(player);
  const enemies = getAll(enemy);
  
  enemies.forEach(enemySprite => {
    // Calculate direction toward player
    const dx = Math.sign(playerSprite.x - enemySprite.x);
    const dy = Math.sign(playerSprite.y - enemySprite.y);
    
    // Try to move horizontally first, then vertically
    let moved = false;
    
    // Try horizontal movement
    if (dx !== 0) {
      const targetTile = getTile(enemySprite.x + dx, enemySprite.y);
      const canMoveHorizontal = !targetTile.some(tile => 
        tile.type === wall || tile.type === enemy
      );
      
      if (canMoveHorizontal) {
        enemySprite.x += dx;
        moved = true;
      }
    }
    
    // If didn't move horizontally, try vertical
    if (!moved && dy !== 0) {
      const targetTile = getTile(enemySprite.x, enemySprite.y + dy);
      const canMoveVertical = !targetTile.some(tile => 
        tile.type === wall || tile.type === enemy
      );
      
      if (canMoveVertical) {
        enemySprite.y += dy;
      }
    }
  });
  
  // Check if player was caught after enemies move
  if (checkPlayerCaught()) {
    return;
  }
  
  // Check if player reached exit
  const exitSprite = getFirst(exit);
  if (playerSprite.x === exitSprite.x && playerSprite.y === exitSprite.y) {
    nextLevel();
  }
}

function loseGame() {
  console.log("LOSE GAME CALLED");
  addText("Tagged! Try again", {
    x: 5,
    y: 6,
    color: color`3`
  });
  
  setTimeout(() => {
    clearText();
    setMap(levels[level]);
  }, 1500);
}

function nextLevel() {
  level++;
  
  if (level < levels.length) {
    addText(`Level ${level + 1}!`, {
      x: 6,
      y: 6,
      color: color`4`
    });
    
    setTimeout(() => {
      clearText();
      setMap(levels[level]);
    }, 1000);
  } else {
    addText("You Win!", {
      x: 6,
      y: 6,
      color: color`5`
    });
    
    setTimeout(() => {
      clearText();
      level = 0;
      setMap(levels[level]);
    }, 2000);
  }
}

// Initial instructions
addText("Move: WASD", {
  x: 5,
  y: 1,
  color: color`2`
});
addText("Avoid enemies!", {
  x: 4,
 y: 2,
  color: color`2`
});

setTimeout(() => {
  clearText();
}, 2000);