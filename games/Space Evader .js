/*
@title: Space Evaders
@author: Sunjot Ghotra
@description:
@tags: [survival, arcade, dodging, space, minimalist, retro, pixel-art, wave-based, endless, challenging, fast-paced, browser-game]
@addedOn: 2025-09-15
*/

const player = "p"
const enemy = "e"

setLegend(
  [player, bitmap`
0000000000000000
0333333333333330
0333333333333330
0330000330000330
0330220330220330
0330220330220330
0330000330000330
0333333333333330
0330000000000330
0330222222220330
0330888888880330
0330888888880330
0330000000000330
0333333333333330
0333333333333330
0000000000000000`],
  [enemy, bitmap`
................
...00......00...
..0HH0....0HH0..
...0HH0000HH0...
....0HHHHHH0....
.0.0HHHHHHHH0.0.
0H0HHH0HH0HHH0H0
0HHHHH0HH0HHHHH0
.0HHHHHHHHHHHH0.
..0HHHHHHHHHH0..
..0HHHHHHHHHH0..
..0HH0HHHH0HH0..
...0H000000H0...
....0H0..0H0....
.....0....0.....
................`]
)

setSolids([])

let frame = 0
let wave = 1
let level = 0
let gameOver = false
let enemies = [];

const levels = [
  map`
.......... 
.......... 
.......... 
.......... 
.......... 
.......... 
.......... 
.......... 
.......... 
..........`
]

setMap(levels[level])
const center = Math.floor(width() / 2)
const playerSprite = addSprite(center, center, player)

setPushables({
  [player]: []
})

function moveEnemies() {
  if (gameOver) return;

  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemyInfo = enemies[i];

    const enemySprites = getTile(enemyInfo.x, enemyInfo.y);
    const enemySprite = enemySprites.find(s => s.type === enemy);

    if (!enemySprite) {
      enemies.splice(i, 1);
      continue;
    }

    enemyInfo.x += enemyInfo.dx;
    enemyInfo.y += enemyInfo.dy;

    enemySprite.x = enemyInfo.x;
    enemySprite.y = enemyInfo.y;

    if (enemyInfo.x < 0 || enemyInfo.x >= width() || enemyInfo.y < 0 || enemyInfo.y >= height()) {
      enemySprite.remove();
      enemies.splice(i, 1);
      continue;
    }

    const p = getFirst(player);
    if (p && enemyInfo.x === p.x && enemyInfo.y === p.y) {
      gameOver = true;
      addText("Game Over", { x: 6, y: 6, color: color`0` });
      addText("Press i to restart", { x: 3, y: 8, color: color`0` });
      return;
    }
  }
}

function spawnEnemy() {
  if (gameOver) return;

  const maxEnemies = Math.min(wave + 2, 10);
  if (enemies.length >= maxEnemies) return;

  const side = Math.floor(Math.random() * 4);
  let x, y, dx = 0,
    dy = 0;

  if (side === 0) {
    x = 0;
    y = Math.floor(Math.random() * height());
    dx = 1;
  } else if (side === 1) {
    x = width() - 1;
    y = Math.floor(Math.random() * height());
    dx = -1;
  } else if (side === 2) {
    x = Math.floor(Math.random() * width());
    y = 0;
    dy = 1;
  } else {
    x = Math.floor(Math.random() * width());
    y = height() - 1;
    dy = -1;
  }

  addSprite(x, y, enemy);

  enemies.push({
    x: x,
    y: y,
    dx: dx,
    dy: dy
  });
}

onInput("s", () => {
  if (gameOver) return;
  const p = getFirst(player);
  if (p && p.y < height() - 1) p.y += 1;
})

onInput("w", () => {
  if (gameOver) return;
  const p = getFirst(player);
  if (p && p.y > 0) p.y -= 1;
})

onInput("a", () => {
  if (gameOver) return;
  const p = getFirst(player);
  if (p && p.x > 0) p.x -= 1;
})

onInput("d", () => {
  if (gameOver) return;
  const p = getFirst(player);
  if (p && p.x < width() - 1) p.x += 1;
})

onInput("i", () => {
  resetGame();
})

function resetGame() {
  getAll(enemy).forEach(e => e.remove());
  enemies = [];

  frame = 0;
  wave = 1;
  gameOver = false;
  clearText();

  const p = getFirst(player);
  if (!p) {
    addSprite(center, center, player);
  } else {
    p.x = center;
    p.y = center;
  }

  addText(`Wave ${wave}`, { x: 8, y: 0, color: color`3` });
}

addText(`Wave ${wave}`, { x: 8, y: 2, color: color`3` });

setInterval(() => {
  if (gameOver) return;

  frame += 1;

  const spawnRate = Math.max(5, 15 - wave);
  if (frame % spawnRate === 0) {
    spawnEnemy();
  }

  const moveRate = Math.max(3, 10 - Math.floor(wave / 2));
  if (frame % moveRate === 0) {
    moveEnemies();
  }

  const p = getFirst(player);
  if (p) {
    for (const enemyInfo of enemies) {
      if (enemyInfo.x === p.x && enemyInfo.y === p.y) {
        gameOver = true;
        addText("Game Over", { x: 6, y: 6, color: color`0` });
        addText("Press i to restart", { x: 3, y: 8, color: color`0` });
        break;
      }
    }
  }

  if (frame > 150) {
    wave += 1;
    frame = 0;

    getAll(enemy).forEach(e => e.remove());
    enemies = [];

    clearText();
    addText(`Wave ${wave}`, { x: 8, y: 10, color: color`3` });
    addText(`Wave ${wave} passed!`, { x: 3, y: 6, color: color`3` });

    setTimeout(() => {
      if (!gameOver) clearText();
      addText(`Wave ${wave}`, { x: 8, y: 1, color: color`3` });
    }, 1000);
  }
}, 100);