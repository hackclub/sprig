/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const enemy = "e";
const bullet = "b";

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
.......77.......
.......77.......
....H..77..H....
....H..77..H....
...HHH7777HHH...
.....7.99.7.....
.....7....7.....`],
  [enemy, bitmap`
................
................
................
................
................
......3333......
.....333333.....
.....333333.....
.....333333.....
.....333333.....
......3333......
................
................
................
................
................`],
  [bullet, bitmap`
................
................
......111.......
......F6F.......
......F6F.......
.....FF6FF......
.....FC6CF......
.....FC6CF......
.....FC6CF......
.....FC6CF......
.....FC6CF......
.....FC6CF......
.....FC6CF......
.....FC6CF......
................
................`],
);

setSolids([player, enemy]);

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

setMap(levels[level]);

setPushables({
  [player]: [],
  [enemy]: [],
  [bullet]: [enemy]
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

function spawnBullet() {
  let x = getFirst(player).x;
  let y = 4;
  addSprite(x, y, bullet);
}

function moveBullets() {
  let bullets = getAll(bullet);
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].y -= 1;
    console.log(bullets[i].y)
  }
}
function RemoveBullet() {
  let bullets = getAll(bullet);
  for (let i = 0; i < bullets.length; i++){
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
      enemies[i].remove();
    }
  }
}

function destroyEnemy() {
  let enemies = getAll(enemy);
  let bullets = getAll(bullet)
  for (let i = 0; i < bullets.length; i++) {
    for (let z = 0; z < enemies.length; z++) {
      if (bullets[i].y == enemies[z].y && bullets[i].x == covids[z].x) {
        clearTile(bullets[i].x, bullets[i].y)
      }
    }
  }
}

var bulletShoot = setInterval(() => {
  spawnBullet();
}, 150);

var enemySpawnLoop = setInterval(() => {
  removeEnemy();
    moveEnemy();
  
}, 700);

var gameLoop = setInterval(() => {
  moveBullets();
  RemoveBullet()
  spawnEnemy()
  
}, 200);

// afterInput(() => {

// })
