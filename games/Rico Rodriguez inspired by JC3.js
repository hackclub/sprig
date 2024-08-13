const player = "p";
const bullet = "b";
const background = "g";

setLegend(
  [player, bitmap`
................
................
................
.....777777.....
.....7C77C7.....
.....777777.....
.....773377.....
......7777......
.....777777.....
.......77.......
......7777......
......7..7......
.....77..77.....
................
................
................`],
  [bullet, bitmap`
..............
....11........
....11........
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............`],
  [background, bitmap`
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
4444444444444444`]
);

setBackground(background);
const level = map`
................
................
................
................
................
................
........p.......
................
................
................
................
................
................
................
................`;
setMap(level);

setSolids([player, bullet]);

let gameOver = false;
let gameStarted = false;
let stepsSurvived = 0;

function showStartScreen() {
  addText("Your name is", { x: 2, y: 1, color: color`3` });
  addText("Rico Rodriguez.", { x: 2, y: 2, color: color`3` });
  addText("The black hand", { x: 2, y: 4, color: color`3` });
  addText("have found you", { x: 2, y: 5, color: color`3` });
  addText("vulnerable!", { x: 2, y: 6, color: color`3` });
  addText("Your controls", { x: 2, y: 8, color: color`3` });
  addText("have been", { x: 2, y: 9, color: color`3` });
  addText("hacked", { x: 2, y: 10, color: color`3` });
  addText("and are somehow", { x: 2, y: 11, color: color`3` });
  addText("flipped!", { x: 2, y: 12, color: color`3` });
  addText("Press I to start", { x: 2, y: 14, color: color`3` });
}

function hideStartScreen() {
  clearText();
}

function createBullet() {
  if (!gameOver && gameStarted) {
    const x = Math.floor(Math.random() * width());
    const y = Math.floor(Math.random() * height());
    if (x !== getFirst(player).x && y !== getFirst(player).y) {
      addSprite(x, y, bullet);
    }
  }
}

function moveBullets() {
  if (!gameOver && gameStarted) {
    getAll(bullet).forEach(b => {
      b.x += Math.floor(Math.random() * 5) - 2;
      b.y += Math.floor(Math.random() * 5) - 2;

      if (b.x < 0 || b.x >= width() || b.y < 0 || b.y >= height()) {
        b.remove();
      }
    });
  }
}

function checkCollisions() {
  const p = getFirst(player);
  
  if (p) {
    getAll(bullet).forEach(b => {
      if (p.x < b.x + 8 &&
          p.x + 8 > b.x &&
          p.y === b.y - 8) {
        gameOver = true;
        addText("Game Over!", { x: 2, y: 5, color: color`3` });
        addText(`Survived Steps: ${stepsSurvived}`, { x: 2, y: 7, color: color`3` });
        addText("Press J to restart", { x: 2, y: 9, color: color`3` });
        getAll(bullet).forEach(b => b.remove());
        setInterval(() => {}, 1000);
      }
    });
  }
}

onInput("w", () => {
  const p = getFirst(player);
  if (p && p.y > 0 && !gameOver && gameStarted) {
    p.y += 1;
    stepsSurvived += 1;
  }
});
onInput("s", () => {
  const p = getFirst(player);
  if (p && p.y < height() - 1 && !gameOver && gameStarted) {
    p.y -= 1;
    stepsSurvived += 1;
  }
});
onInput("a", () => {
  const p = getFirst(player);
  if (p && p.x > 0 && !gameOver && gameStarted) {
    p.x += 1;
    stepsSurvived += 1;
  }
});
onInput("d", () => {
  const p = getFirst(player);
  if (p && p.x < width() - 1 && !gameOver && gameStarted) {
    p.x -= 1;
    stepsSurvived += 1;
  }
});
onInput("j", () => {
  if (gameOver) {
    location.reload();
  }
});
onInput("i", () => {
  if (!gameStarted) {
    gameStarted = true;
    hideStartScreen();
  }
});

afterInput(() => {
  if (!gameOver && gameStarted) {
    moveBullets();
    checkCollisions();
  }
});

setInterval(createBullet, 1000);

showStartScreen();
