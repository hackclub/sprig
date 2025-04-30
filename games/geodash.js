const player = "p";
const bg = "b";
const enemy = "e";
const bird = "i";

setLegend(
  [player, bitmap`
4444444444444444
4333333333333334
4366666666666634
4367777777777634
4367555555557634
4367599999957634
436759HHHH957634
436759H08H957634
436759HC1H957634
436759HHHH957634
4367599999957634
4367555555557634
4367777777777634
4366666666666634
4333333333333334
4444444444444444`],
  [bg, bitmap`
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
  [enemy, bitmap `
................
................
................
................
................
................
................
................
.......DD.......
......DCCD......
.....DC66CD.....
....DC6556CD....
...DC652256CD...
..DC65299256CD..
.DC6529009256CD.
DC65290LL09256CD`],
  [bird, bitmap `
436957LCCL759634
.436957LL759634.
..436957759634..
...4369559634...
....43699634....
.....436634.....
......4334......
.......44.......
................
................
................
................
................
................
................
................`]
);

setBackground(bg);
setSolids([player]);

const levels = [
  map `
................
................
................
................
................
................
................
....p...........`
];

setMap(levels[0]);
setPushables({ [player]: [] });

const jumpForce = -3;
const gravity = 0.3;
const moveSpeed = 1;
const groundY = 7;
const ceilingY = 3;
let gravityFlipped = false;

let gameRunning = false;
let score = 0;
let velocityY = 0;
let preciseY = groundY;

/* Start */
displayScore();
setTimeout(() => { gameRunning = true; }, 2000);

setInterval(() => {
  if (gameRunning) {
    applyGravity();
    moveEnemies();
    checkOffScreen();
    checkCollision();
  }
}, 50);

onInput("j", () => {
  const p = getFirst(player);
  if (p && gameRunning && Math.round(preciseY) >= (gravityFlipped ? ceilingY : groundY)) {
    velocityY = gravityFlipped ? -jumpForce : jumpForce;
  }
});

onInput("i", () => {
  gravityFlipped = !gravityFlipped;
});

/* Functions */
function applyGravity() {
  const p = getFirst(player);
  if (p) {
    velocityY += gravity * (gravityFlipped ? -1 : 1);
    preciseY += velocityY;

    if (gravityFlipped) {
      if (preciseY > groundY) {
        preciseY = groundY;
        velocityY = 0;
      }
      if (preciseY <= ceilingY) {
        preciseY = ceilingY;
        velocityY = 0;
      }
    } else {
      if (preciseY < ceilingY) {
        preciseY = ceilingY;
        velocityY = 0;
      }
      if (preciseY >= groundY) {
        preciseY = groundY;
        velocityY = 0;
      }
    }

    p.y = Math.round(preciseY);
  }
}

setInterval(() => {
  if (gameRunning) {
    generateEnemy();
  }
}, 1200);

setInterval(() => {
  if (score >= 5) {
    generateEnemyBird();
  }
}, 2000);

function moveEnemies() {
  const enemies = getAll(enemy);
  const birds = getAll(bird);
  enemies.forEach(e => { e.x -= moveSpeed; });
  birds.forEach(b => { b.x -= moveSpeed; });
}

function generateEnemy() {
  let amount = Math.random() < 0.7 ? 1 : 2;
  for (let i = 0; i < amount; i++) {
    let posX = 15 - i;
    addSprite(posX, groundY, enemy);
  }
}

function generateEnemyBird() {
  addSprite(15, 3, bird);
}

function checkOffScreen() {
  getAll(enemy).forEach(e => {
    if (e.x <= 0) { score++; e.remove(); }
  });
  getAll(bird).forEach(b => {
    if (b.x <= 0) { score++; b.remove(); }
  });
  displayScore();
}

function checkCollision() {
  const p = getFirst(player);
  const enemies = getAll(enemy);
  const birds = getAll(bird);
  
  enemies.forEach(e => {
    if (e.x === p.x && e.y === p.y) {
      p.remove();
      onGameOver();
    }
  });

  birds.forEach(b => {
    if (b.x === p.x && b.y === p.y) {
      p.remove();
      onGameOver();
    }
  });
}

function deleteEnemies() {
  getAll(enemy).forEach(e => e.remove());
  getAll(bird).forEach(b => b.remove());
}

function displayScore() {
  clearText();
  addText(`Score: ${score}`, { x: 1, y: 1, color: color`2` });
}

function displayGameOver() {
  clearText();
  addText("Game Over", { x: 4, y: 4, color: color`2` });
  addText(`Score: ${score}`, { x: 4, y: 6, color: color`4` });
}

function onGameOver() {
  gameRunning = false;
  deleteEnemies();
  displayGameOver();
}
