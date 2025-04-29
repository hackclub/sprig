/*
@title: Mine Knight
@author: lsyzg
@tags: ['endless']
@addedOn: 2025-3-31

press 'i' to break blocks, you must face the blocks to break them. WASD to move
*/
const player = "p";
const wall = "w";
const wood = "b";
const castle = "c";
const grass = "g";

var gameRunning = true;
var score = 0;
var health = 100;
var facing = "d";
var level = 0;
var obstacleSpeed = 1000;
var obstacleRate = 1;
var gameLoop;
var totalScore = 0;

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
  [ wood, bitmap`
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
CCC0CCC0CCC0CCC0`],
  [ castle, bitmap`
111LLLLLLLLL1111
111LLLL111LLLL11
11LLLL111111LLL1
LLLLLLLL1111LLLL
LLLLLLLLLLLLLLLL
LLLLL11111LLLLLL
11LL1111111LLLL1
111LL11111LLLL11
111LLLLLLLLLLL11
111LLLLLLLLLLL11
1LLLLL111LLLLLL1
LLLLL11111LLLLLL
LLLLL111111LLLLL
1LLLLL111111L111
11LLLL111LLLL111
11LLLLLLLLLL1111`],
  [ grass, bitmap`
4444444444444444
4444444444444DD4
4444444D444444D4
44D44444D44D4444
44DD444D444DD444
444D444444444444
44444444D4444444
4444444D4444D444
444444444444DD44
44444444444D4444
444D444444444444
4444DD4444444444
4DD44D44DD44444D
44D444444DD444D4
44D444444D4444D4
4444444444444444`]
);

setSolids([player, wall]);

const levels = [
  map`
.......
.......
.......
p......`,
  map`
.......
.......
.......
p......`,
  map`
.......
.......
.......
p......`
];

const backgrounds = [grass, castle, wood];

function startLevel(lvl) {
  level = lvl;
  setMap(levels[level]);
  setBackground(backgrounds[level]);
  clearText();
  addText("Level " + (level + 1), { x: 5, y: 3, color: color`4` });
  addText("Press 'i' to break", { x: 1, y: 5, color: color`4` });
  setTimeout(() => clearText(), 10000);
  obstacleSpeed = 1000 - 200 * level;
  obstacleRate = 1 + level;
  if (gameLoop) clearInterval(gameLoop);
  gameLoop = setInterval(updateGame, obstacleSpeed);
  
}

setMap(levels[level]);

onInput("w", () => { getFirst(player).y -= 1; facing = "w"; });
onInput("s", () => { getFirst(player).y += 1; facing = "s"; });
onInput("a", () => { getFirst(player).x -= 1; facing = "a"; });
onInput("d", () => { getFirst(player).x += 1; facing = "d"; });
onInput("j", () => {
  score = 0;
  health = 100;
  level = 0;
  totalScore = 0;
  gameRunning = true;
  startLevel(0);
});

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
      score += 20;
      if (score >= 300 && level < 2) {
        score = 0;
        startLevel(level + 1);
        totalScore += 300;
      }
      break;
    }
  }
});

function spawnObstacle() {
  for (let i = 0; i < obstacleRate; i++) {
    let x = width() - 1;
    let y = Math.floor(Math.random() * height());
    addSprite(x, y, wall);
  }
}

function moveObstacles() {
  let obstacles = getAll(wall);
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 1;

    let knight = getFirst(player);
    if (obstacles[i].x === knight.x && obstacles[i].y === knight.y) {
      if (facing === "w") knight.y += 1;
      else if (facing === "s") knight.y -= 1;
      else if (facing === "a") knight.x += 1;
      else if (facing === "d") knight.x -= 1;
      health -= 10;
    }
  }
}

function despawnObstacles() {
  let obstacles = getAll(wall);
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == 0) {
      obstacles[i].remove();
      health -=10;
    }
  }
}

function updateGame() {
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
    totalScore += score;
    addText("Game Over! \n \nFinal Score: " + totalScore + "\n \nPress 'j' to restart", { x: 0, y: 6, color: color`4` });
  }
}

startLevel(0);
