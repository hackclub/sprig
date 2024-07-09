/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Tank War
@author: Shubh Mehra
@tags: ['Tank war', 'Tanks']
@addedOn: 2024-07-08
*/

const player = "p";
const enemyBase = "e";
const bullet = "b";
const enemyBullet = "n";

let gameRunning = false;
let score = 0;

setLegend(
  [ player, bitmap`
................
................
................
................
................
.......C........
.......C........
.......C........
.......C........
......CCC.......
.....CCCCC......
.CCCCCCCCCCCCC..
.CC...C..C..CC..
..CCCCCCCCCCC...
...CCCCCCCCC....
................` ],
  [ enemyBase, bitmap`
0000000000000000
0222222LL2222220
022222L11L222220
022222L11L222220
0222222LL2222220
0000000000000000
....00000000....
.....000000.....
......0000......
.......00.......
.......00.......
.......00.......
.......00.......
................
................
................` ],
  [ bullet, bitmap`
................
................
................
................
................
................
................
................
................
................
................
.......6........
......666.......
......666.......
......666.......
......666.......` ],
  [ enemyBullet, bitmap`
......333.......
......333.......
......333.......
......333.......
.......3........
................
................
................
................
................
................
................
................
................
................
................` ],
)

setSolids([])

let level = 0
const levels = [
  map`
eeeeeeee
.n......
....n...
..n...n.
...p....`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("a", () => {
  if(gameRunning)
    getFirst(player).x -= 1
})

onInput("d", () => {
  if(gameRunning)
    getFirst(player).x += 1
})

onInput("w", () => {
  if(gameRunning) {
    let bulletX = getFirst(player).x;
    let bulletY = getFirst(player).y - 1;
  
    addSprite(bulletX, bulletY, bullet);
  }
})

onInput("s", () => {
  if(!gameRunning)
  {
    score = 0;
    clearText();
    runGame();
  }
});

afterInput(() => {
  
})

function movePlayerBullets() {
  let bullets = getAll(bullet);
 
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].y -= 1;
  }
}

function moveEnemyBullets() {
  let bullets = getAll(enemyBullet);
 
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].y += 1;
  }
}

function checkEnemyCollision() {
  let bullets = getAll(bullet);
  let enemies = getAll(enemyBase);
  
  for(let i = 0; i < enemies.length; i++) {
    for(let j = 0; j < bullets.length; j++) {
      console.log(enemies[i].x, bullets[j].x, enemies[i].y, bullets[j].y);
      if(enemies[i].x === bullets[j].x && enemies[i].y === bullets[j].y) {
        let x = enemies[i].x;
        let y = enemies[i].y;
        enemies[i].remove();
        setTimeout(() => {
          addSprite(x, y, enemyBase);
        }, 10000);
        score++;
      }
    }
  }
}

function checkPlayerCollision() {
  let enemyBullets = getAll(enemyBullet);
  let tank = getFirst(player);

  for(let i = 0; i < enemyBullets.length; i++) {
    if(enemyBullets[i].x === tank.x && enemyBullets[i].y === tank.y)
      return true;
  }

  return false;
}

function checkCollisions() {
  checkEnemyCollision();
}

function despawnPlayerBullet() {
  let bullets = getAll(bullet);

  for(let i = 0; i < bullets.length; i++)
  {
    if(bullets[i].y === 0)
      setTimeout(() => {
        bullets[i].remove();
      }, 10);
  }
}

function despawnEnemyBullet() {
  let bullets = getAll(enemyBullet);

  for(let i = 0; i < bullets.length; i++)
  {
    if(bullets[i].y === 4)
      setTimeout(() => {
        bullets[i].remove();
      }, 10);
  }
}

function despawnBullets() {
  despawnPlayerBullet();
  despawnEnemyBullet();
}

function despawnAllBullets() {
  let bullets = getAll(bullet);
  let enemyBullets = getAll(enemyBullet);

  for(let i = 0; i < bullets.length; i++)
    bullets[i].remove();
  for(let i = 0; i < enemyBullets.length; i++)
    enemyBullets[i].remove();
}

function spawnEnemyBullet() {
  let x;
  let enemies = getAll(enemyBase);
  let launcherBase;

  launcherBase = enemies[Math.floor(Math.random() * (enemies.length))];
  addSprite(launcherBase.x, 1, enemyBullet);
}

function runGame()
{
  gameRunning = true;

  let gameLoop = setInterval(() => {
    addText("Score: "+score, {
      x: 1,
      y: 12,
      color: color`0`
    });
    movePlayerBullets();
    moveEnemyBullets();
    despawnBullets();
    checkCollisions();
    spawnEnemyBullet();
    spawnEnemyBullet();
  }, 500);

  let checkLoop = setInterval(() => {
    if(checkPlayerCollision()) {
      gameRunning = false;
      despawnAllBullets();
      clearInterval(gameLoop);
      clearInterval(checkLoop);
    }
  }, 250);
}

runGame();
