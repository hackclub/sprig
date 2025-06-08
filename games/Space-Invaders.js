
const player = "p";
const invader = "i";
const bullet = "b";
const enemyBullet = "e";
const wall = "w";
const empty = ".";

setLegend(
  [player, bitmap`
    ......3333......
    .....333333.....
    .....333333.....
    .....333333.....
    ....33333333....
    ...3333333333...
    ...3333333333...
    ...3377773333...
    ...3377773333...
    ...3333333333...
    ...3333333333...
    ....33333333....
    .....333333.....
    .....333333.....
    ......3333......
    ................
  `],
  [invader, bitmap`
    ................
    ................
    ....88....88....
    .....88..88.....
    ....88888888....
    ...8888888888...
    ...8888888888...
    ...88888888888..
    ...88888888888..
    ...8888888888...
    ....8888888.....
    .....88888......
    ......888.......
    ................
    ................
    ................
  `],
  [bullet, bitmap`
    ................
    ................
    ................
    ................
    ................
    ................
    ......7777......
    ......7777......
    ......7777......
    ......7777......
    ................
    ................
    ................
    ................
    ................
    ................
  `],
  [enemyBullet, bitmap`
    ................
    ................
    ................
    ................
    ................
    ................
    ......DDDD......
    ......DDDD......
    ......DDDD......
    ......DDDD......
    ................
    ................
    ................
    ................
    ................
    ................
  `],
  [wall, bitmap`
    CCCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
  `]
);

const level = map`
wwwwwwwwwwwwww
w............w
w..i.i.i.i.i.w
w..i.i.i.i.i.w
w..i.i.i.i.i.w
w..i.i.i.i.i.w
w............w
w............w
w............w
w............w
w............w
w............w
w......p.....w
wwwwwwwwwwwwww
`;

setMap(level);
setSolids([player, invader, wall]);

let score = 0;
let gameOver = false;
let invadersDirection = 1;
let invadersMoveDownTimer = 0;
let bulletActive = false;

onInput("a", () => {
  if (!gameOver) {
    const p = getFirst(player);
    if (p && p.x > 1) p.x -= 1;
  }
});

onInput("d", () => {
  if (!gameOver) {
    const p = getFirst(player);
    if (p && p.x < width() - 2) p.x += 1;
  }
});

onInput("j", () => {
  if (!gameOver && !bulletActive) {
    const p = getFirst(player);
    if (p) {
      bulletActive = true;
      addSprite(p.x, p.y - 1, bullet);
      playTune(tune`500: c4-500`);
    }
  }
});

onInput("k", () => {
  if (gameOver) {
    clearText();
    setMap(level);
    score = 0;
    gameOver = false;
    invadersDirection = 1;
    invadersMoveDownTimer = 0;
    bulletActive = false;
    addText(`Score: ${score}`, { y: 0, color: color`3` });
  }
});

afterInput(() => {
  if (gameOver) return;

  getAll(bullet).forEach(b => {
    b.y -= 1;
    const hit = getTile(b.x, b.y).find(s => s.type === invader);
    if (hit) {
      b.remove();
      hit.remove();
      bulletActive = false;
      score += 10;
      playTune(tune`200: e4~200, g4~200`);
      if (getAll(invader).length === 0) {
        addText("YOU WIN!", { y: 8, color: color`7` });
        gameOver = true;
      }
    }
    if (b.y <= 0) {
      b.remove();
      bulletActive = false;
    }
  });

  getAll(enemyBullet).forEach(eb => {
    eb.y += 1;
    const playerHit = getTile(eb.x, eb.y).find(s => s.type === player);
    if (playerHit) {
      addText("GAME OVER", { y: 8, color: color`B` });
      gameOver = true;
    }
    if (eb.y >= height() - 1) eb.remove();
  });

  invadersMoveDownTimer++;
  if (invadersMoveDownTimer >= 5) {
    invadersMoveDownTimer = 0;
    let changeDirection = false;
    const invaders = getAll(invader);

    invaders.forEach(i => {
      if ((i.x >= width() - 2 && invadersDirection === 1) || 
          (i.x <= 1 && invadersDirection === -1)) {
        changeDirection = true;
      }
      if (i.y >= getFirst(player).y - 1) {
        addText("GAME OVER", { y: 8, color: color`B` });
        gameOver = true;
      }
    });

    if (changeDirection) {
      invadersDirection *= -1;
      invaders.forEach(i => i.y += 1);
    } else {
      invaders.forEach(i => i.x += invadersDirection);
    }

    if (Math.random() < 0.02 && invaders.length > 0) {
      const shooter = invaders[Math.floor(Math.random() * invaders.length)];
      addSprite(shooter.x, shooter.y + 1, enemyBullet);
    }
  }

  clearText();
  addText(`Score: ${score}`, { y: 0, color: color`3` });
});

addText(`Score: ${score}`, { y: 0, color: color`3` });
addText("A/D: Move | J: Shoot | K: Restart", { y: 15, color: color`7` });
