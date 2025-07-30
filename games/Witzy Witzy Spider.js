/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Witzy Witzy Spider
@author: Jaco S.
@tags: []
@addedOn: 2025-00-00
*/
const player = "p";
const obstacle = "o";
const cloud = "n";
const boss = "x";
const endingWitzy = "w";

setLegend(
  [player, bitmap`
................
................
......00000.....
......00000.....
.0...0000000..0.
.00000000000000.
....000000000...
.000000000000000
....000000000...
.00000000000000.
.0...000000...0.
...0000000000...
...0..0000..0...
................
................
................`],
  [obstacle, bitmap`
................
.......77.......
......7777......
.....775757.....
....77775777....
...7777575777...
...7777575777...
...7777575777...
...7777777777...
....77755577....
.....757775.....
......7777......
................
................
................
................`],
  [cloud, bitmap`
................
................
................
....111111111...
..111202202211..
.11222200222211.
.122220220222211
1122220220222221
1222220220222221
1222222222222221
1222200000002221
1122202222202211
.11111111111111.
................
................
................`],
  [boss, bitmap`
................
.......66.......
......6666......
.....607760.....
....66606666....
...66606660666..
...66606660666..
...66606660666..
...66666666666..
....66600066....
.....606660.....
......6666......
................
................
................
................`],
  [endingWitzy, bitmap`
................
................
................
................
......00000.....
......02020.....
.0..000202000.0.
.00002000002000.
....022222220...
.000000000000000
....000000000...
.00000000000000.
.0...0000000..0.
...0000000000...
...0..0000..0...
...0........0...`]
);

setSolids([]);
setPushables({ [player]: [] });

let score = 0;
let highScore = 0;
let gameStarted = false;
let gameOver = false;
let inBossFight = false;
let fallSpeed = 400;
let obstacleInterval = null;
let moveInterval = null;
let bossTimer = null;

setMap(map`
nnnnn
.....
.....
.....
..p..
.....`);

onInput("w", () => { if (!gameOver && gameStarted) getFirst(player).y-- });
onInput("s", () => { if (!gameOver && gameStarted) getFirst(player).y++ });
onInput("a", () => { if (!gameOver && gameStarted) getFirst(player).x-- });
onInput("d", () => { if (!gameOver && gameStarted) getFirst(player).x++ });

onInput("j", () => {
  if (!gameStarted || gameOver) {
    startGame();
  }
});

function startGame() {
  clearText();
  setMap(map`
nnnnn
.....
.....
.....
..p..
.....`);
  score = 0;
  fallSpeed = 400;
  gameOver = false;
  gameStarted = true;
  inBossFight = false;
  clearInterval(obstacleInterval);
  clearInterval(moveInterval);
  drawScore();
  moveInterval = setInterval(() => {
    if (!gameOver && gameStarted) {
      moveObstacles();
      checkCollision();
    }
  }, fallSpeed);
  obstacleInterval = setInterval(() => {
    if (!gameOver && gameStarted) {
      spawnObstacle();
      score++;
      drawScore();
      if (!inBossFight) adjustSpeed();
      if (score === 250 && !inBossFight) startBossFight();
    }
  }, 1000);
}

function drawScore() {
  clearText();
  if (!inBossFight) {
    addText("Score: " + score, { x: 0, y: 0, color: color`9` });
    addText("Best: " + highScore, { x: 0, y: 1, color: color`4` });
  }
}

function spawnObstacle() {
  if (!gameStarted || gameOver) return;

  if (inBossFight) {
    const randX = Math.floor(Math.random() * width());
    addSprite(randX, 0, obstacle);
  } else {
    const clouds = getAll(cloud);
    if (clouds.length === 0) return;
    const randomCloud = clouds[Math.floor(Math.random() * clouds.length)];
    addSprite(randomCloud.x, randomCloud.y, obstacle);
  }
}

function moveObstacles() {
  for (let drop of getAll(obstacle)) {
    if (drop.y + 1 < height()) {
      drop.y++;
    } else {
      drop.remove();
    }
  }
}

function checkCollision() {
  if (!gameStarted || gameOver) return;
  const p = getFirst(player);
  if (!p) return;
  for (let o of getAll(obstacle)) {
    if (o.x === p.x && o.y === p.y) {
      loseGame();
    }
  }
  if (!inBossFight) {
    for (let c of getAll(cloud)) {
      if (c.x === p.x && c.y === p.y) {
        loseGame();
      }
    }
  }
}

function loseGame() {
  gameOver = true;
  if (score > highScore) highScore = score;
  clearText();
  addText("YOU LOSE", { y: 6, color: color`6` });
  addText("Press J to Restart", { y: 8, color: color`5` });
  addText("By: Jaco S. / 2025", { y: 10, color: color`3` });
  clearInterval(obstacleInterval);
  clearInterval(moveInterval);
  if (bossTimer) clearTimeout(bossTimer);
}

function adjustSpeed() {
  if (score % 50 === 0 && fallSpeed > 100) {
    fallSpeed -= 50;
    clearInterval(moveInterval);
    moveInterval = setInterval(() => {
      if (!gameOver && gameStarted) {
        moveObstacles();
        checkCollision();
      }
    }, fallSpeed);
  }
}

function startBossFight() {
  inBossFight = true;
  clearText();
  addText("FINAL BOSS", { y: 6, color: color`3` });

  const clouds = getAll(cloud);
  for (let c of clouds) {
    c.remove();
    addSprite(c.x, c.y, boss);
  }

  bossTimer = setTimeout(() => {
    showEndingScene();
  }, 30000);
}

function showEndingScene() {
  clearText();
  clearInterval(obstacleInterval);
  clearInterval(moveInterval);
  const p = getFirst(player);
  if (p) p.remove();
  clearAll(obstacle);
  clearAll(boss);

  addSprite(2, 0, endingWitzy);
  addText("Witzy made it to the top!", { y: 2, color: color`H` });
  addText("Thanks for playing!", { y: 4, color: color`4` });
  addText("By: Jaco S./ 2025", { y: 6, color: color`9` });
}

addText("Witzy Witzy Spider", { y: 5, color: color`6` });
addText("Press J to Start", { y: 7, color: color`5` });
addText("250 points for end!", { y: 9, color: color`3` });