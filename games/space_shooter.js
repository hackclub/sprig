/*
@title: Space Shooter
@author: valeriuv
@tags: []
@addedOn: 2024-07-26
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p";
const enemy = "e";
const bullet = "b";
const background = "f"

setLegend(
  [player, bitmap`
................
................
................
................
................
................
................
................
................
.......11.......
.......11.......
....H..11..H....
....H..11..H....
...HHHCCCCHHH...
.....1.99.1.....
.....1....1.....`],
  [enemy, bitmap`
................
................
................
................
................
......3333......
.....3H3H33.....
.....33H3H3.....
.....3H3H33.....
.....33H3H3.....
......3333......
................
................
................
................
................`],
  [bullet, bitmap`
................
................
................
................
................
................
.......6........
......666.......
......696.......
......696.......
......696.......
......666.......
................
................
................
................`],
  [background, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`]
);

setBackground(background);
setSolids([]);

let level = 0;
const levels = [
  map`
.......
.......
.......
.......
.......
...p...`
];

var score = 0
var gameOver = false

setMap(levels[level]);

setPushables({
  [player]: [],
  [enemy]: [],
  [bullet]: [enemy]
});


onInput("a", () => {
  if (!gameOver) {
    getFirst(player).x -= 1;
  }
});


onInput("d", () => {
  if (!gameOver) {
    getFirst(player).x += 1;
  }
});

function spawnBullet() {
  let x = getFirst(player).x;
  let y = 5;
  addSprite(x, y, bullet);
}

function moveBullets() {
  let bullets = getAll(bullet);
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].y -= 1;
  }
}

function RemoveBullet() {
  let bullets = getAll(bullet);
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].y == 0) {
      bullets[i].remove();
    }
  }
}

function spawnEnemy() {
  let y = 0
  let x = Math.floor(Math.random() * 7);
  let spawn = Math.floor(Math.random() * 3);
  if (spawn == 1) {
    addSprite(x, y, enemy);
  }
}

function moveEnemy() {
  let enemies = getAll(enemy)
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].y += 1
  }
}

function removeEnemy() {
  let enemies = getAll(enemy);
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].y == 5) {
      // clearInterval(bulletShoot);
      clearInterval(enemySpawnLoop);
      clearInterval(gameLoop);
      gameOver = true
      addText("Game Over", { x: 5, y: 5, color: color`3` });
      break;
    }
  }
}

function destroyEnemy() {
  let enemies = getAll(enemy);
  let bullets = getAll(bullet);
  for (let i = 0; i < bullets.length; i++) {
    for (let z = 0; z < enemies.length; z++) {
      if (bullets[i].x == enemies[z].x && bullets[i].y == enemies[z].y) {
        bullets[i].remove();
        enemies[z].remove();
        score += 1
        break;
      }
    }
  }
}

function checkPlayerCollision() {
  let playerSprite = getFirst(player);
  let enemies = getAll(enemy);
  for (let i = 0; i < enemies.length; i++) {
    if (playerSprite.x == enemies[i].x && playerSprite.y == enemies[i].y) {
      gameOver = true
      break;
    }
  }
}

// var bulletShoot = setInterval(() => {
//   spawnBullet();
//   // 150
// }, 500);

var enemySpawnLoop = setInterval(() => {
  removeEnemy();
  moveEnemy();

}, 700);

var gameLoop = setInterval(() => {
  spawnBullet();
  moveBullets();
  RemoveBullet()
  spawnEnemy()
  destroyEnemy()
  checkPlayerCollision();
  addText("Score: " + score, {
    x: 1,
    y: 1,
    color: color`0`
  })
  if (gameOver) {
    // clearInterval(bulletShoot);
    clearInterval(enemySpawnLoop);
    clearInterval(gameLoop);
    addText("Game Over", { x: 5, y: 5, color: color`3` });
  }
}, 200);
