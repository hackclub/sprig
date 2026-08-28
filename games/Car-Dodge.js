 /*
@title: Car Dodge
@description: Cars are coming at you! Can you doge them and beat your high score?!
@author: ImpulsivxKing
@tags: [driving, cars, crash, score, coin]
@addedOn: 8/27/2026
*/

const player = "p";
const enemy = "e";
const road = "r";
const grass = "g";
const coin = "c";

setLegend(
  [ player, bitmap`
................
................
................
................
................
.....000000.....
....01111110....
....01777710....
....07777770....
...0011111100...
...0000000000...
....0......0....
....0......0....
................
................
................` ],

  [ enemy, bitmap`
................
................
................
................
................
.....000000.....
....02222220....
....02999920....
....09999990....
...0022222200...
...0000000000...
....0......0....
....0......0....
................
................
................` ],

  [ road, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ],

  [ grass, bitmap`
DDDDDDDDDDDDDDDD
DDDD4DD4DDDDD4DD
DDDDDDDDDDDDDDDD
DDD4DDDDDDD4DDDD
DDDDDDD4DDDDDDDD
DDDDDDDDDD4D4DDD
DDDDDDDDDDDDDDDD
DD4DD4DD4DDDDDDD
DDDDDDDDDD4DDDDD
DD4DDDDD4DDD4DDD
DDDDDDDDDDDDDDDD
DDDD4D4DDDDD4DDD
DDDDDDDD4DDDDDDD
DDD4DD4DDDD4DDDD
DDDDDDDDDDDDDDDD
DDDDDDDD4DDDDDDD` ],

  [ coin, bitmap`
................
................
................
................
.......00.......
......0990......
.....099990.....
....09999990....
....09999990....
.....099990.....
......0990......
.......00.......
................
................
................
................` ]
);

setBackground(road);

const level = map`
ggrrrrrrgg
ggrrrrrrgg
ggrrrrrrgg
ggrrrrrrgg
ggrrrrrrgg
ggrrrrrrgg
ggrrrrrrgg
ggrrrrrrgg
ggrrprrrgg
ggrrrrrrgg`;

setMap(level);

setPushables({
  [player]: [enemy]
});

let score = 0;
let gameOver = false;
let tickCount = 0;

function updateScoreText() {
  clearText();

  addText(`Score: ${score}`, {
    x: 0,
    y: 0,
    color: color`0`
  });
}

updateScoreText();

function isOccupied(x, y) {
  const enemies = getAll(enemy);

  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].x === x && enemies[i].y === y) {
      return true;
    }
  }

  const coins = getAll(coin);

  for (let i = 0; i < coins.length; i++) {
    if (coins[i].x === x && coins[i].y === y) {
      return true;
    }
  }

  return false;
}

function spawnCar(y) {
  const roadCols = [2, 3, 4, 5, 6, 7];

  for (let tries = 0; tries < 10; tries++) {
    const x =
      roadCols[Math.floor(Math.random() * roadCols.length)];

    if (!isOccupied(x, y)) {
      addSprite(x, y, enemy);
      return;
    }
  }
}

function spawnInitialCars() {
  addSprite(2, 0, enemy);
  addSprite(6, 3, enemy);
  addSprite(4, 5, enemy);
}

function spawnRow() {
  if (getAll(enemy).length >= 8) {
    return;
  }

  const topCars = getAll(enemy).filter(e => e.y <= 2);

  if (topCars.length >= 2) {
    return;
  }

  spawnCar(0);

  if (Math.random() < 0.15) {
    const x = 2 + Math.floor(Math.random() * 6);

    if (!isOccupied(x, 0)) {
      addSprite(x, 0, coin);
    }
  }
}

function resetGame() {
  const enemies = getAll(enemy);

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].remove();
  }

  const coins = getAll(coin);

  for (let i = 0; i < coins.length; i++) {
    coins[i].remove();
  }

  setMap(level);

  score = 0;
  tickCount = 0;
  gameOver = false;

  updateScoreText();

  spawnInitialCars();
}

function gameTick() {
  if (gameOver) {
    return;
  }

  const p = getFirst(player);

  const coins = getAll(coin);

  for (let i = 0; i < coins.length; i++) {
    const c = coins[i];

    c.y += 1;

    if (c.y >= 9) {
      c.remove();
    }
  }

  const enemies = getAll(enemy);

  for (let i = 0; i < enemies.length; i++) {
    const e = enemies[i];

    e.y += 1;

    if (p && e.x === p.x && e.y === p.y) {
      gameOver = true;

      clearText();

      addText("Crashed!", {
        x: 5,
        y: 4
      });

      setTimeout(() => {
        resetGame();
      }, 1000);

      return;
    }

    if (e.x < 2 || e.x > 7) {
      e.remove();

      score += 1;
      updateScoreText();

      continue;
    }

    if (e.y >= 9) {
      e.remove();

      score += 1;
      updateScoreText();
    }
  }

  if (p) {
    const currentCoins = getAll(coin);

    for (let i = 0; i < currentCoins.length; i++) {
      const c = currentCoins[i];

      if (c.x === p.x && c.y === p.y) {
        c.remove();

        score += 1;
        updateScoreText();
      }
    }
  }
}

onInput("a", () => {
  if (gameOver) return;

  const p = getFirst(player);

  if (p && p.x > 2) {
    p.x -= 1;
  }
});

onInput("d", () => {
  if (gameOver) return;

  const p = getFirst(player);

  if (p && p.x < 7) {
    p.x += 1;
  }
});

spawnInitialCars();

setInterval(() => {
  if (gameOver) return;

  tickCount++;

  let spawnEvery = 4;

  if (score >= 20) {
    spawnEvery = 1;
  } else if (score >= 10) {
    spawnEvery = 2;
  } else if (score >= 5) {
    spawnEvery = 3;
  }

  if (tickCount % spawnEvery === 0) {
    spawnRow();
  }

  gameTick();
}, 300);