


const player = "p";
const obstacle = "o";
const portal = "l";
let gameRunning = true;
let obstacleSpeed = 1000;
let startTime = Date.now();

setLegend(
  [obstacle, bitmap`
................
................
................
.....300003.....
....03000030....
...0030000300...
...00300003000..
...00300003000..
...00300003000..
....030000300...
....030000300...
.....300003.....
.......000......
................
................
................`],
  [player, bitmap`
................
................
................
.....00000......
....0.....0.....
....0.0.0.0...CC
....0.....0..CCC
....0.000.0.CCCC
....0.....0CCCC.
.....00000.CC...
.......0..CC....
.....0000CC.....
.......0........
.......0........
......0.0.......
.....0...0......`],
  [portal, bitmap`
................
................
................
...0000000C.....
...C......C.....
...C......C.....
...CC000000.....
................
................
................
................
................
................
................
................
................`]
);

setMap(map`
........
........
........
........
........
........
........
....p...
`);

const level2 = map`
....p
..lll.
.ll.l.
......
..l...`;

const levels = [map, level2];

function calculateElapsedTime() {
  let currentTime = Date.now();
  let elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
  return elapsedTimeInSeconds;
}

function transitionToNewLevel() {
  if (levels.indexOf(map) === 0) {
    setMap(level2);
    obstacleSpeed = 333;
  }
}

function checkHit() {
  let playerSprite = getFirst(player);
  let obstacles = getTile(playerSprite.x, playerSprite.y);

  if (obstacles.some(sprite => sprite.type === obstacle)) {
    return true;
  }

  return false;
}

function moveObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;

    if (obstacles[i].y === height()) {
      obstacles[i].remove();
    }
  }
}

function despawnObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].y === 8) {
      obstacles[i].remove();
    }
  }
}

function spawnObstacle() {
  let obstacleX = Math.floor(Math.random() * width());
  addSprite(obstacleX, 0, obstacle);
}

onInput("w", () => {
  let playerSprite = getFirst(player);
  if (playerSprite.y > 0) {
    playerSprite.y -= 1;
  }
});

onInput("a", () => {
  let playerSprite = getFirst(player);
  if (playerSprite.x > 0) {
    playerSprite.x -= 1;
  }
});

onInput("s", () => {
  let playerSprite = getFirst(player);
  if (playerSprite.y < height() - 1) {
    playerSprite.y += 1;
  }
});

onInput("d", () => {
  let playerSprite = getFirst(player);
  if (playerSprite.x < width() - 1) {
    playerSprite.x += 1;
  }
});

var gameLoop = setInterval(() => {
  if (gameRunning) {
    moveObstacles();
    despawnObstacles();
    spawnObstacle();

    if (checkHit()) {
      clearInterval(gameLoop);
      gameRunning = false;
      addText("Game Over!", { x: 5, y: 6, color: color`3` });
    }

    if (calculateElapsedTime() > 15) {
      obstacleSpeed = 750; // Increase obstacle speed after 15 seconds
    } else if (calculateElapsedTime() > 30) {
      obstacleSpeed = 1000;
    } else if (calculateElapsedTime() > 60) {
      obstacleSpeed = 1500;
    } else if (calculateElapsedTime() > 100) {
      obstacleSpeed = 2500;
    }

    addText("Time: " + calculateElapsedTime() + "s", { x: 0, y: 0, color: color`5` });
  } else {
    clearInterval(gameLoop);
  }
}, obstacleSpeed);