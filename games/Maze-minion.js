/*
@title: None
@author: None
@description: None
@tags: []
@addedOn: None
*/

// Define sprite types (single characters only)
const pDown = "p";    // Down-facing player
const pLeft = "l";    // Left-facing player
const pRight = "r";   // Right-facing player
const pUp = "u";      // Up-facing player
const wall = "w";     // Regular wall sprite
const wallTop = "T";  // Walltop sprite (new solid wall variant)
const treasure = "t"; // Treasure sprite
const bUp = "1";      // Bullet moving up
const bDown = "2";    // Bullet moving down
const bLeft = "3";    // Bullet moving left
const bRight = "4";   // Bullet moving right
const enemy = "e";    // Original enemy (moves horizontally)
const rEnemy = "5";   // Random-moving enemy
const sUp = "a";      // Sword up
const sDown = "b";    // Sword down
const sLeft = "c";    // Sword left
const sRight = "d";   // Sword right

// Set up the sprite legend with bitmaps
setLegend(
  [pDown, bitmap`
................
................
................
................
......000.......
......CCC.......
......000.......
.......C........
.....00000......
.....C000C......
.....C000C......
......333.......
......000.......
......0.0.......
......0.0.......
.....00.00......`],
  [pLeft, bitmap`
................
................
................
................
.......000......
.......C00......
.......000......
........C.......
.......000......
.......0C0......
.......CC0......
.......333......
.......000......
........0.......
........0.......
.......00.......`],
  [pRight, bitmap`
................
................
................
................
......000.......
......00C.......
......000.......
.......C........
......000.......
......0C0.......
......0CC.......
......333.......
......000.......
.......0........
.......0........
.......00.......`],
  [pUp, bitmap`
................
................
................
................
......000.......
......000.......
......000.......
.......C........
.....00000......
.....C000C......
.....C000C......
......333.......
......000.......
......0.0.......
......0.0.......
.....00.00......`],
  [wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [wallTop, bitmap`
................
11..111..111..11
11..111..111..11
11..111..111..11
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [treasure, bitmap`
................
................
................
....666666......
...66999966.....
...69666696.....
...69666696.....
...66999966.....
....666666......
................
................
................
................
................
................
................`],
  [bUp, bitmap`
................
................
........L.......
.......LLL......
.......LLL......
......L.L.L.....
........C.......
........C.......
........C.......
........C.......
........C.......
........C.......
.......1C1......
......11C11.....
......11C11.....
......11C11.....`],
  [bDown, bitmap`
.....11C11......
.....11C11......
.....11C11......
......1C1.......
.......C........
.......C........
.......C........
.......C........
.......C........
.......C........
.....L.L.L......
......LLL.......
......LLL.......
.......L........
................
................`],
  [bLeft, bitmap`
................
................
................
................
................
.....L.......111
...LL.......1111
..LLLLCCCCCCCCCC
...LL.......1111
.....L.......111
................
................
................
................
................
................`],
  [bRight, bitmap`
................
................
................
................
................
................
111.......L.....
1111.......LL...
CCCCCCCCCCLLLL..
1111.......LL...
111.......L.....
................
................
................
................
................`],
  [enemy, bitmap`
................
................
.......000......
.......DDD......
.......DDD......
........D.......
......D999D.....
......D999D.....
......D999D.....
.......111......
.......1.1......
.......1.1......
.......D.D......
................
................
................`],
  [rEnemy, bitmap`
...444444444D...
...4CCCCCCCCDD..
...4C4444444D...
...4C4..........
...4C44444444...
...4CCCCCCCC4...
...44444444C4...
..........4C4...
...44444444C4...
...4CCCCCCCC4...
...4C44444444...
...4C4..........
...4C4..........
..44444.........
...343..........
....4...........`],
  [sUp, bitmap`
........L.......
.......L1L......
......LL1LL.....
......LL1LL.....
......LL1LL.....
......LL1LL.....
......LL1LL.....
......LL1LL.....
......LL1LL.....
......LL1LL.....
......LL1LL.....
.......L1L......
........C.......
........C.......
........C.......
........C.......`],
  [sDown, bitmap`
........C.......
........C.......
........C.......
........C.......
.......L1L......
......LL1LL.....
......LL1LL.....
......LL1LL.....
......LL1LL.....
......LL1LL.....
......LL1LL.....
......LL1LL.....
......LL1LL.....
......LL1LL.....
.......L1L......
........L.......`],
  [sLeft, bitmap`
................
................
................
................
................
..LLLLLLLLL.....
.LLLLLLLLLLL....
L11111111111CCCC
.LLLLLLLLLLL....
..LLLLLLLLL.....
................
................
................
................
................
................`],
  [sRight, bitmap`
................
................
................
................
................
................
.....LLLLLLLLL..
....LLLLLLLLLLL.
CCCC11111111111L
....LLLLLLLLLLL.
.....LLLLLLLLL..
................
................
................
................
................`]
);

// Define solid objects that cannot be passed through (including wallTop)
setSolids([pDown, pLeft, pRight, pUp, wall, wallTop, enemy, rEnemy]);

// Initialize game variables
let level = 0;
let lives = 3;
let facing = pDown; // Will be set dynamically by loadLevel
let gameOver = false; // Flag to stop game logic after winning

// Define wall types for easier collision checks
const wallTypes = [wall, wallTop];

// Define levels (mazes unchanged)
const level1 = map`
TTTTTTTTTT
w.tw5..w.w
w.Tw...w.w
w.e..e.w.w
w.TTTT.w.w
w.w....w.w
w.w.TTTw.w
w.w.e..e.w
w.w.TTTT.w
wTwTwwwwpw`;

const level2 = map`
TTTTTTTTTT
w.tww5..ww
w.Tww.TT.T
w.e.w.w..w
w.T.w.we.w
w.w.w.wT.w
w.w.w.w..w
w.we..e..w
w.wTTT.T.w
wTwwwwTwpw`;

const level3 = map`
TTTTTTTTTT
wtw.e.5..w
w.w.TTTT.w
w.w..e.w.w
w.wTTT.w.w
w.e..w.w.w
w.TT.w.w.w
w.w..e.w.w
w.w.TTTw.w
wTwTwwwwpw`;

const level4 = map`
TTTTTTTTTT
w.t.w....w
w.T.w.T5Tw
w.e.w.w..w
w.T.w.w..w
w.w.e.w.ew
w.w.T.w..w
w.w.w.e..w
w.w.w.T..w
wTwTwTwTpw`;

const level5 = map`
TTTTTTTTTT
w.t....e.w
w.TTTT.T.w
w..w.w.w.w
w.e..w.wTw
w.T5T....w
w.w.wTTT.w
w.w..e.w.w
w.w.TTTw.w
wTwewwwwpw`;

const level6 = map`
TTTTTTTTTT
w.tww....w
w.Tew.Te.w
w.w...w..w
w.w.T.w5Tw
w.e.w.w.ew
w.T.w.w..w
w.w.w.e..w
w.w.w.T..w
wTwTwTwTpw`;

const level7 = map`
TTTTTTTTTT
wtw....e.w
w.w.TTTT.w
w.w.e..w.w
w.w.T5T..w
w.w.w..T.w
w.w.wT.w.w
w.w..e.w.w
w.e.T..w.w
wTTTwTTwpw`;

const level8 = map`
TTTTTTTTTT
w.t.w.e..w
w.T.w.T5Tw
w.we..w..w
w.w.T.w..w
we..w.w..w
w.T.w.w..w
w.w.w.e..w
w.w.w.T..w
wTwTwTwTpw`;

const level9 = map`
TTTTTTTTTT
wew....e.w
w.w.wwww.w
w...e..w.w
w.w.w5w..w
w.w.w.we.w
w.w.w..w.w
w.w..e.w.w
wtw.wwww.w
wwwwwwwwpw`;

const level10 = map`
TTTTTTTTTT
wetew5..ww
w.T.w.T.ew
w.e.w.w..w
w.T.w.we.w
w.w.e.w..w
w.w.T.w.ew
w.w.w.w..w
w.w.w.we.w
wTwTwTwTpw`;

const level11 = map`
TTTTTTTTTTTTTTTTT
w.5...e.......w.w
w....w...e.ee.w.w
w.TTTwTTTT.eTTw.w
w.w5e.e5.e...5w.w
w.wTT.TTTTTT..w.w
we.ew.5.e.ew.Tw.w
w.e.wTwTT.TTTw..w
w..5.w5.w....w5ew
w5.eT...w.e.ew..w
w.eew...wTT..w.5w
w.TTw.e5.ew.uwe.w
w.wtwT..T.wTTwT.w
w.w..e.T....e...w
w.wTTTTwwwwTTTw.w
w..e.e...e..e...w
wTTTTTTTTTTTTTTTw`;

const levels = [level1, level2, level3, level4, level5, level6, level7, level8, level9, level10, level11];

// Function to load a level and set facing correctly
function loadLevel(lvl) {
  setMap(levels[lvl]);
  const playerSprites = [pDown, pLeft, pRight, pUp];
  for (const sprite of playerSprites) {
    if (getFirst(sprite)) {
      facing = sprite;
      break;
    }
  }
  clearText();
  addText(`Lives: ${lives}`, { x: 6, y: 0, color: color`3` });
}

// Set the initial map
loadLevel(level);

// Define pushable objects (none in this case)
setPushables({
  [pDown]: [],
  [pLeft]: [],
  [pRight]: [],
  [pUp]: []
});

// Helper function to update player sprite based on direction
function updatePlayerSprite(newFacing) {
  const playerPos = getFirst(facing);
  if (playerPos) {
    playerPos.type = newFacing;
    facing = newFacing;
  }
}

// Player movement with direction-based sprites
onInput("w", () => {
  if (gameOver) return;
  const playerPos = getFirst(facing);
  if (playerPos && playerPos.y - 1 >= 0) {
    playerPos.y -= 1;
    updatePlayerSprite(pUp);
  }
});

onInput("s", () => {
  if (gameOver) return;
  const playerPos = getFirst(facing);
  if (playerPos && playerPos.y + 1 < height()) {
    playerPos.y += 1;
    updatePlayerSprite(pDown);
  }
});

onInput("a", () => {
  if (gameOver) return;
  const playerPos = getFirst(facing);
  if (playerPos && playerPos.x - 1 >= 0) {
    playerPos.x -= 1;
    updatePlayerSprite(pLeft);
  }
});

onInput("d", () => {
  if (gameOver) return;
  const playerPos = getFirst(facing);
  if (playerPos && playerPos.x + 1 < width()) {
    playerPos.x += 1;
    updatePlayerSprite(pRight);
  }
});

// Shooting bullets in facing direction with "k" key
onInput("k", () => {
  if (gameOver) return;
  const playerPos = getFirst(facing);
  if (playerPos) {
    let bulletX = playerPos.x;
    let bulletY = playerPos.y;
    let bulletType;

    if (facing === pUp && bulletY > 0) {
      bulletY -= 1;
      bulletType = bUp;
    } else if (facing === pDown && bulletY < height() - 1) {
      bulletY += 1;
      bulletType = bDown;
    } else if (facing === pLeft && bulletX > 0) {
      bulletX -= 1;
      bulletType = bLeft;
    } else if (facing === pRight && bulletX < width() - 1) {
      bulletX += 1;
      bulletType = bRight;
    }

    if (bulletType) {
      const targetTile = getTile(bulletX, bulletY);
      if (!targetTile.some(sprite => wallTypes.includes(sprite.type) || sprite.type === enemy || sprite.type === rEnemy)) {
        addSprite(bulletX, bulletY, bulletType);
      }
    }
  }
});

// Sword swinging with "j" key
onInput("j", () => {
  if (gameOver) return;
  const playerPos = getFirst(facing);
  if (playerPos) {
    let swordX = playerPos.x;
    let swordY = playerPos.y;
    let swordType;

    if (facing === pUp && swordY - 1 >= 0) {
      swordY -= 1;
      swordType = sUp;
    } else if (facing === pDown && swordY + 1 < height()) {
      swordY += 1;
      swordType = sDown;
    } else if (facing === pLeft && swordX - 1 >= 0) {
      swordX -= 1;
      swordType = sLeft;
    } else if (facing === pRight && swordX + 1 < width()) {
      swordX += 1;
      swordType = sRight;
    }

    if (swordType) {
      const targetTile = getTile(swordX, swordY);
      if (!targetTile.some(sprite => wallTypes.includes(sprite.type))) {
        addSprite(swordX, swordY, swordType);
        const enemies = targetTile.filter(s => s.type === enemy || s.type === rEnemy);
        enemies.forEach(enemySprite => enemySprite.remove());
        setTimeout(() => {
          const swordSprite = getTile(swordX, swordY).find(s => s.type === swordType);
          if (swordSprite) swordSprite.remove();
        }, 200);
      }
    }
  }
});

// Original enemy movement (horizontal) and collision with player
setInterval(() => {
  if (gameOver) return;
  const playerPos = getFirst(facing);
  if (playerPos) {
    getAll(enemy).forEach(e => {
      const leftTile = getTile(e.x - 1, e.y);
      const rightTile = getTile(e.x + 1, e.y);
      let nextX = e.x;

      if (e.x + 1 < width() && !rightTile.some(sprite => wallTypes.includes(sprite.type) || sprite.type === enemy || sprite.type === rEnemy)) {
        nextX = e.x + 1;
      } else if (e.x - 1 >= 0 && !leftTile.some(sprite => wallTypes.includes(sprite.type) || sprite.type === enemy || sprite.type === rEnemy)) {
        nextX = e.x - 1;
      }

      if (nextX === playerPos.x && e.y === playerPos.y) {
        lives -= 1;
        clearText();
        addText(`Lives: ${lives}`, { x: 6, y: 0, color: color`3` });
        
        if (lives > 0) {
          loadLevel(level);
        } else {
          level = 0;
          lives = 3;
          loadLevel(level);
          gameOver = false;
          addText("Game Over!\nStarting Over", { x: 4, y: 4, color: color`3` });
          setTimeout(() => {
            clearText();
            addText(`Lives: ${lives}`, { x: 6, y: 0, color: color`3` });
          }, 2000);
        }
      } else {
        e.x = nextX;
      }
    });
  }
}, 500);

// Random enemy movement (moves in any direction randomly)
setInterval(() => {
  if (gameOver) return;
  const playerPos = getFirst(facing);
  if (playerPos) {
    getAll(rEnemy).forEach(re => {
      const direction = Math.floor(Math.random() * 4);
      let nextX = re.x;
      let nextY = re.y;

      if (direction === 0 && re.y - 1 >= 0) {
        nextY = re.y - 1;
      } else if (direction === 1 && re.y + 1 < height()) {
        nextY = re.y + 1;
      } else if (direction === 2 && re.x - 1 >= 0) {
        nextX = re.x - 1;
      } else if (direction === 3 && re.x + 1 < width()) {
        nextX = re.x + 1;
      }

      const nextTile = getTile(nextX, nextY);
      const isBlocked = nextTile.some(sprite => wallTypes.includes(sprite.type) || sprite.type === enemy || sprite.type === rEnemy);

      if (!isBlocked) {
        if (nextX === playerPos.x && nextY === playerPos.y) {
          lives -= 1;
          clearText();
          addText(`Lives: ${lives}`, { x: 6, y: 0, color: color`3` });
          
          if (lives > 0) {
            loadLevel(level);
          } else {
            level = 0;
            lives = 3;
            loadLevel(level);
            gameOver = false;
            addText("Game Over!\nStarting Over", { x: 4, y: 4, color: color`3` });
            setTimeout(() => {
              clearText();
              addText(`Lives: ${lives}`, { x: 6, y: 0, color: color`3` });
            }, 2000);
          }
        } else {
          re.x = nextX;
          re.y = nextY;
        }
      }
    });
  }
}, 500);

// Bullet movement and enemy collision logic
setInterval(() => {
  if (gameOver) return;
  const bulletTypes = [bUp, bDown, bLeft, bRight];
  bulletTypes.forEach(bulletType => {
    getAll(bulletType).forEach(b => {
      const currentTile = getTile(b.x, b.y);
      const enemies = currentTile.filter(s => s.type === enemy || s.type === rEnemy);
      if (enemies.length > 0) {
        enemies.forEach(enemySprite => enemySprite.remove());
        b.remove();
        return;
      }

      let moved = false;
      if (bulletType === bUp && b.y - 1 >= 0 && !getTile(b.x, b.y - 1).some(s => wallTypes.includes(s.type))) {
        b.y -= 1;
        moved = true;
      } else if (bulletType === bDown && b.y + 1 < height() && !getTile(b.x, b.y + 1).some(s => wallTypes.includes(s.type))) {
        b.y += 1;
        moved = true;
      } else if (bulletType === bLeft && b.x - 1 >= 0 && !getTile(b.x - 1, b.y).some(s => wallTypes.includes(s.type))) {
        b.x -= 1;
        moved = true;
      } else if (bulletType === bRight && b.x + 1 < width() && !getTile(b.x + 1, b.y).some(s => wallTypes.includes(s.type))) {
        b.x += 1;
        moved = true;
      }

      if (!moved) {
        b.remove();
        return;
      }

      const newTile = getTile(b.x, b.y);
      const newEnemies = newTile.filter(s => s.type === enemy || s.type === rEnemy);
      if (newEnemies.length > 0) {
        newEnemies.forEach(enemySprite => enemySprite.remove());
        b.remove();
      }
    });
  });
}, 100);

// Check for treasure collection and level progression
afterInput(() => {
  if (gameOver) return;
  const playerPos = getFirst(facing);
  if (playerPos) {
    const treasureSprites = getTile(playerPos.x, playerPos.y).filter(s => s.type === treasure);
    if (treasureSprites.length > 0) {
      level += 1;
      if (level < levels.length) {
        loadLevel(level);
      } else {
        gameOver = true;
        clearText();
        addText("You found all treasures! You win!", { x: 4, y: 4, color: color`3` });
      }
    }
  }
});
