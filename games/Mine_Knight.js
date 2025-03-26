/*
@title: Mine Knight
@author: lsyzg
@tags: ['endless']
@addedOn: 2025-3-26

press 'i' to break blocks, you must face the blocks to break them. WASD to move
*/
const player = "p";
const wall = "w";
const bg = "b";

var gameRunning = true;
var score = 0;
var health = 100;
var facing = "d"; // default facing direction: right

setLegend(
  [ player, bitmap`
................
..33............
.333300000......
.33.00LLL00.....
333.0L0000000...
.3..0010101010..
....0010101010..
....0L0000000.0.
.....0LLL000.020
....000000..0220
....0LLLLL0CC20.
...0LLLLLLL0CC..
...00LLLLL00C...
....00L0L0......
.....0L0L0......
.....000000.....` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L222L222222L222L
L112L111112L112L
L112L111112L112L
L112L111112L112L
LLLLLLLLLLLLLLLL
L222222L2222222L
L111112L1111112L
L111112L1111112L
L111112L1111112L
LLLLLLLLLLLLLLLL
L222L222222L222L
L112L111112L112L
L112L111112L112L
L112L111112L112L
LLLLLLLLLLLLLLLL`],
  [ bg, bitmap`
CCC0CCC0CCC0CCC0
CCC0CCC0CCC0CCC0
CCC0CCC0CCC0CCC0
CCC0CCC0CCC0CCC0
CCC0CCC0CCC0CCC0
CCC0CCC0CCC0CCC0
CCC0CCC0CCC0CCC0
CCC0CCC0CCC0CCC0
CCC0CCC0CCC0CCC0
CCC0CCC0CCC0CCC0
CCC0CCC0CCC0CCC0
CCC0CCC0CCC0CCC0
CCC0CCC0CCC0CCC0
CCC0CCC0CCC0CCC0
CCC0CCC0CCC0CCC0
CCC0CCC0CCC0CCC0`]
);

setSolids([player, wall]);
setBackground(bg);

let level = 0;
const levels = [
  map`
........
........
........
.p......`
];
setMap(levels[level]);

setPushables({
  [ player ]: []
});

// Movement inputs. Update facing when moving.
onInput("w", () => {
  getFirst(player).y -= 1;
  facing = "w";
});
onInput("s", () => {
  getFirst(player).y += 1;
  facing = "s";
});
onInput("a", () => {
  getFirst(player).x -= 1;
  facing = "a";
});
onInput("d", () => {
  getFirst(player).x += 1;
  facing = "d";
});

// Spacebar input: remove the block in front of the knight.
onInput("i", () => {
  let knight = getFirst(player);
  let targetX = knight.x;
  let targetY = knight.y;
  if (facing === "w") targetY -= 1;
  else if (facing === "s") targetY += 1;
  else if (facing === "a") targetX -= 1;
  else if (facing === "d") targetX += 1;

  let targetTiles = getTile(targetX, targetY);
  for (let i = 0; i < targetTiles.length; i++) {
    if (targetTiles[i].type === wall) {
      targetTiles[i].remove();
      score += 20; // Increase score when removing a block.
      break; // Only remove one block per press.
    }
  }
});

function spawnObstacle() {
  let x = width() - 1;
  let y = Math.floor(Math.random() * height());
  addSprite(x, y, wall);
}

function moveObstacles() {
  let obstacles = getAll(wall);
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 1;
  }
}

function despawnObstacles() {
  let obstacleSprites = getAll(wall);

  for (let i = 0; i < obstacleSprites.length; i++) {
    if (obstacleSprites[i].x == 0) {
      obstacleSprites[i].remove();
      health -= 10;
    } else {
      obstacleSprites[i].x -= 1;
    }
  }
}

var gameLoop = setInterval(() => {
  clearText();
  addText("Score: " + score, { x: 1, y: 1, color: color`2` });
  addText("Health: " + health, { x: 1, y: 0, color: color`2` });
  
  moveObstacles();
  spawnObstacle();
  despawnObstacles();
  if (health <= 0) {
    clearInterval(gameLoop);
    gameRunning = false;
    clearText();
    addText("Game Over!Score:" + score, { x: 0, y: 6, color: color`6` });
  }
}, 1000);
