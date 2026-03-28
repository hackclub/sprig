/*
@title: Apple Catch
@author: Mujtaba
@tags: ['arcade']
@addedOn: 2026-01-16

Instructions:
- Use A and D keys to move left and right
- Catch falling apples to score points
- Don't let apples hit the ground!
- Game over after missing 3 apples
- Speed increases every 5 apples caught
*/

const player = "p";
const apple = "a";
const ground = "g";
const sky = "s";

setLegend(
  [ player, bitmap`
................
................
................
................
................
................
.....666666.....
....66666666....
...6666666666...
..666666666666..
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
................
................`],
  [ apple, bitmap`
................
.......33.......
......3..3......
.....3....3.....
.....333333.....
....33333333....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
....33333333....
.....333333.....
................`],
  [ ground, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ sky, bitmap`
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

setSolids([]);

let level = 0;
const levels = [
  map`
ssssssss
ssssssss
ssssssss
ssssssss
ssssssss
ssssssss
ssssssss
ssssssss
ssssssss
p......g`
];

setMap(levels[level]);

let score = 0;
let lives = 3;
let fallSpeed = 800;
let spawnSpeed = 2000;
let lastFall = Date.now();
let lastSpawn = Date.now();
let gameOver = false;

addText(`Score: ${score}`, { x: 1, y: 1, color: color`2` });
addText(`Lives: ${lives}`, { x: 1, y: 2, color: color`3` });

onInput("a", () => {
  if (!gameOver) {
    const p = getFirst(player);
    if (p && p.x > 0) {
      p.x -= 1;
    }
  }
});

onInput("d", () => {
  if (!gameOver) {
    const p = getFirst(player);
    if (p && p.x < 7) {
      p.x += 1;
    }
  }
});

onInput("j", () => {
  if (gameOver) {
    resetGame();
  }
});

function spawnApple() {
  const randomX = Math.floor(Math.random() * 8);
  addSprite(randomX, 0, apple);
}

function moveApplesDown() {
  const apples = getAll(apple);

  for (let a of apples) {
    const currentY = a.y;

    if (currentY === 9) {
      const playerSprite = getFirst(player);
      if (playerSprite && a.x === playerSprite.x) {
        score++;
        a.remove();

        if (score % 5 === 0) {
          fallSpeed = Math.max(300, fallSpeed - 50);
          spawnSpeed = Math.max(1000, spawnSpeed - 100);
        }

        clearText();
        addText(`Score: ${score}`, { x: 1, y: 1, color: color`2` });
        addText(`Lives: ${lives}`, { x: 1, y: 2, color: color`3` });
      } else {
        lives--;
        a.remove();

        clearText();
        addText(`Score: ${score}`, { x: 1, y: 1, color: color`2` });
        addText(`Lives: ${lives}`, { x: 1, y: 2, color: color`3` });

        if (lives <= 0) {
          gameOver = true;
          addText(`GAME OVER!`, { x: 4, y: 6, color: color`3` });
          addText(`Score: ${score}`, { x: 4, y: 8, color: color`2` });
          addText(`Press J`, { x: 5, y: 10, color: color`6` });
          addText(`to restart`, { x: 4, y: 11, color: color`6` });
        }
      }
    } else if (currentY < 9) {
      a.y += 1;
    }
  }
}

function resetGame() {
  getAll(apple).forEach(a => a.remove());

  score = 0;
  lives = 3;
  fallSpeed = 800;
  spawnSpeed = 2000;
  gameOver = false;

  const p = getFirst(player);
  if (p) {
    p.x = 0;
  }

  clearText();
  addText(`Score: ${score}`, { x: 1, y: 1, color: color`2` });
  addText(`Lives: ${lives}`, { x: 1, y: 2, color: color`3` });
}

setInterval(() => {
  if (!gameOver) {
    const now = Date.now();

    if (now - lastSpawn > spawnSpeed) {
      spawnApple();
      lastSpawn = now;
    }

    if (now - lastFall > fallSpeed) {
      moveApplesDown();
      lastFall = now;
    }
  }
}, 100);
