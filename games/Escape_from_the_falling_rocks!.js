/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Escape_from_the_falling_rocks!
@description: Escape the collapsing cave! Move & climb (A, D), dodge falling rocks, and reach one of four escape points or survive until 75% of the map is filled before you're crushed (you only die if you're boxed in). Restart: J
@author: @ThePlaneGuy
@tags: ['escape', 'rocks']
@addedOn: 2026-08-10
*/

const player = "p";
const rock = "r";
const escapePoint = "e";
const background = "b";

setLegend(
  [player, bitmap`
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

  [rock, bitmap`
................
.....111111.....
...1111111111...
..111111111111..
.11111111111111.
.11111111111111.
.11111111111111.
.11111111111111.
..111111111111..
...1111111111...
....11111111....
.....111111.....
................
................
................
................`],

  [escapePoint, bitmap`
................
................
....22222222....
...2222222222...
...2222222222...
...2222222222...
...2222222222...
....22222222....
................
................
................
................
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

const moveSound = tune`
60: C4/60,
60: E4/60,
100`;

const rockSound = tune`
70: G3/70,
70: D3/70,
100`;

const hitSound = tune`
80: C3~80,
80: B2~80,
180`;

const climbSound = tune`
60: C4/60,
60: F4/60,
60: A4/60,
100`;

const winSound = tune`
100: C4/100,
100: E4/100,
100: G4/100,
100: C5~200,
200`;

const blockedSound = tune`
100: D3/100,
100: C3/100,
200`;

let gameOver = false;
let won = false;
let gameTime = 0;
let spawnDelay = 650;
let lastSpawn = 0;

function loadGame() {
  setMap(map`
e..e..e..e
..........
..........
..........
..........
..........
..........
..........`);

  addSprite(5, 7, player);

  gameOver = false;
  won = false;
  gameTime = 0;
  spawnDelay = 650;
  lastSpawn = Date.now();

  clearText();
}

loadGame();

function inside(x, y) {
  return (
    x >= 0 &&
    x < width() &&
    y >= 0 &&
    y < height()
  );
}

function hasRock(x, y) {
  if (!inside(x, y)) {
    return true;
  }

  return getTile(x, y).some(
    tile => tile.type === rock
  );
}

function hasPlayer(x, y) {
  if (!inside(x, y)) {
    return false;
  }

  return getTile(x, y).some(
    tile => tile.type === player
  );
}

function movePlayer(dx) {
  if (gameOver || won) {
    return;
  }

  const p = getFirst(player);
  const direction = dx > 0 ? 1 : -1;
  const targetX = p.x + direction;

  if (!inside(targetX, p.y)) {
    return;
  }

  if (!hasRock(targetX, p.y)) {
    p.x = targetX;
    playTune(moveSound);
    checkEscape();
    return;
  }

  const climbY = p.y - 1;

  if (
    inside(targetX, climbY) &&
    !hasRock(targetX, climbY)
  ) {

    if (
      climbY - 1 >= 0 &&
      hasRock(targetX, climbY - 1)
    ) {
      playTune(blockedSound);
      return;
    }

    p.x = targetX;
    p.y = climbY;

    playTune(climbSound);
    checkEscape();

    return;
  }

  playTune(blockedSound);
}

function applyGravity() {
  if (gameOver || won) {
    return;
  }

  const p = getFirst(player);

  if (p.y >= height() - 1) {
    return;
  }

  if (!hasRock(p.x, p.y + 1)) {
    p.y += 1;
  }
}

onInput("a", () => {
  movePlayer(-1);
});

onInput("d", () => {
  movePlayer(1);
});

onInput("j", () => {
  loadGame();
});

function spawnRock() {
  for (let attempt = 0; attempt < 15; attempt++) {
    const x = Math.floor(Math.random() * width());

    if (!hasRock(x, 0)) {
      addSprite(x, 0, rock);
      playTune(rockSound);
      return;
    }
  }
}

function moveRock(r) {
  if (r.y >= height() - 1) {
    return;
  }

  const nextX = r.x;
  const nextY = r.y + 1;

  if (hasPlayer(nextX, nextY)) {
    const p = getFirst(player);

    const leftX = p.x - 1;
    const rightX = p.x + 1;

    const leftSafe =
      inside(leftX, p.y) &&
      !hasRock(leftX, p.y);

    const rightSafe =
      inside(rightX, p.y) &&
      !hasRock(rightX, p.y);

    if (leftSafe && rightSafe) {
      if (Math.random() < 0.5) {
        p.x = leftX;
      } else {
        p.x = rightX;
      }

      r.y += 1;
      playTune(hitSound);
      return;
    }

    if (leftSafe) {
      p.x = leftX;
      r.y += 1;
      playTune(hitSound);
      return;
    }

    if (rightSafe) {
      p.x = rightX;
      r.y += 1;
      playTune(hitSound);
      return;
    }

    gameOver = true;
    playTune(hitSound);
    return;
  }

  if (hasRock(nextX, nextY)) {
    return;
  }

  r.y += 1;
}

function updateRocks() {
  const rocks = [...getAll(rock)];

  rocks.sort((a, b) => b.y - a.y);

  for (const r of rocks) {
    if (gameOver || won) {
      return;
    }

    moveRock(r);
  }
}

function checkEscape() {
  if (gameOver || won) {
    return;
  }

  const p = getFirst(player);

  const escaped =
    getTile(p.x, p.y).some(
      tile => tile.type === escapePoint
    );

  if (escaped) {
    won = true;

    playTune(winSound);

    clearText();

    addText("ESCAPED!", {
      x: 3,
      y: 3,
      color: color`2`
    });

    addText("J = RESTART", {
      x: 2,
      y: 6,
      color: color`4`
    });
  }
}

function checkRockWin() {
  if (gameOver || won) {
    return;
  }

  const totalTiles = width() * height();
  const rockCount = getAll(rock).length;
  const required = Math.ceil(totalTiles * 0.75);

  if (rockCount >= required) {
    won = true;

    playTune(winSound);

    clearText();

    addText("CAVE FILLED!", {
      x: 1,
      y: 3,
      color: color`3`
    });

    addText("75% ROCKS", {
      x: 2,
      y: 5,
      color: color`2`
    });

    addText("J = RESTART", {
      x: 2,
      y: 7,
      color: color`4`
    });
  }
}

function showGameOver() {
  clearText();

  addText("CRUSHED!", {
    x: 2,
    y: 3,
    color: color`3`
  });

  addText("NO WAY OUT", {
    x: 1,
    y: 5,
    color: color`7`
  });

  addText("J = RESTART", {
    x: 2,
    y: 7,
    color: color`2`
  });
}

setInterval(() => {
  if (gameOver) {
    showGameOver();
    return;
  }

  if (won) {
    return;
  }

  clearText();

  gameTime += 0.20;

  spawnDelay = Math.max(
    180,
    650 - gameTime * 18
  );

  if (
    Date.now() - lastSpawn >= spawnDelay
  ) {
    spawnRock();
    lastSpawn = Date.now();
  }

  updateRocks();
  applyGravity();

  checkEscape();
  checkRockWin();

  if (!gameOver && !won) {
    const rockCount = getAll(rock).length;
    const totalTiles = width() * height();

    const percentage =
      Math.floor(
        (rockCount / totalTiles) * 100
      );

    addText(
      "ROCK " + percentage + "%",
      {
        x: 0,
        y: 0,
        color: color`0`
      }
    );
  }
}, 200);