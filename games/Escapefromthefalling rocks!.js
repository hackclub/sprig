/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Escape from the falling rocks!
@description: Survive falling rocks!
@author: Olivér Kelényi
@tags: ['survival']
@addedOn: 2026-05-26
*/


const player = "p";
const rock = "r";
const bg = "g";

setLegend(
  [ player, bitmap`
................
................
......0000......
....00000000....
...0000000000...
...0000000000...
...0000000000...
....00000000....
......0000......
................
................
................
................
................
................
................`],

  [ rock, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],

  [ bg, bitmap`
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

setBackground(bg);

function loadGame() {
  setMap(map`
................
................
................
................
................
................
................
................
................
p...............`);
}

loadGame();

setSolids([player, rock]);

let gameOver = false;

function movePlayer(dx, dy) {

  const p = getFirst(player);

  const ox = p.x;
  const oy = p.y;

  p.x += dx;
  p.y += dy;

  if (tilesWith(player, rock).length > 0) {

    // vissza
    p.x = ox;
    p.y = oy;

    p.y -= 1;
    p.x += dx;

    if (tilesWith(player, rock).length > 0) {
      p.x = ox;
      p.y = oy;
    }
  }

  p.x = Math.max(0, Math.min(width()-1, p.x));
  p.y = Math.max(0, Math.min(height()-1, p.y));
}

onInput("w", () => {
  if (!gameOver) movePlayer(0, -1);
});

onInput("s", () => {
  if (!gameOver) movePlayer(0, 1);
});

onInput("a", () => {
  if (!gameOver) movePlayer(-1, 0);
});

onInput("d", () => {
  if (!gameOver) movePlayer(1, 0);
});


onInput("j", () => {

  gameOver = false;

  clearText();

  loadGame();
});

function spawnRock() {

  const x = Math.floor(Math.random() * width());

  if (getTile(x, 0).length === 0) {
    addSprite(x, 0, rock);
  }
}

function updateRocks() {

  const rocks = [...getAll(rock)];

  for (const r of rocks.reverse()) {

    if (r.y >= height()-1) {
      continue;
    }

    const below = getTile(r.x, r.y + 1);

    const playerBelow = below.some(t => t.type === player);
    const rockBelow = below.some(t => t.type === rock);


    if (playerBelow) {

      const p = getFirst(player);


      const leftFree =
        p.x > 0 &&
        getTile(p.x - 1, p.y).every(t => t.type !== rock);

      const rightFree =
        p.x < width()-1 &&
        getTile(p.x + 1, p.y).every(t => t.type !== rock);

      if (leftFree) {

        p.x -= 1;
        r.y += 1;

      } else if (rightFree) {

        p.x += 1;
        r.y += 1;

      } else {

        gameOver = true;
      }

    }

    else if (!rockBelow) {

      r.y += 1;
    }
  }
}

function crushCheck() {

  const p = getFirst(player);

  const up =
    p.y > 0 &&
    getTile(p.x, p.y - 1).some(t => t.type === rock);

  const down =
    p.y < height()-1 &&
    getTile(p.x, p.y + 1).some(t => t.type === rock);

  const left =
    p.x > 0 &&
    getTile(p.x - 1, p.y).some(t => t.type === rock);

  const right =
    p.x < width()-1 &&
    getTile(p.x + 1, p.y).some(t => t.type === rock);

  if (up && down && left && right) {
    gameOver = true;
  }
}

function drawGameOver() {

  addText("GAME OVER", {
    x: 3,
    y: 5,
    color: color`3`
  });

  addText("J = RESTART", {
    x: 2,
    y: 7,
    color: color`2`
  });
}

setInterval(() => {

  if (gameOver) {

    clearText();
    drawGameOver();
    return;
  }

  clearText();

  if (Math.random() < 0.45) {
    spawnRock();
  }

  updateRocks();

  crushCheck();

}, 220);
