const player = "p";
const obstacle = "o";

const WIDTH = 7;
const HEIGHT = 9;

setLegend(
  [player, bitmap`
................
................
....6333336.....
...633333336....
...333333333....
...330000033....
...333333333....
...373333373....
...777777777....
...555555555....
...353333353....
...333333333....
...330000033....
...333333333....
....6333336.....
................`],
  [obstacle, bitmap`
................
................
................
................
......F0F0F.....
.....0CCCCC0....
....FCCCCCCCF...
....0CCCCCCC0...
....FCCCCCCCF...
....0CCCCCCC0...
....FCCCCCCCF...
.....0CCCCC0....
......F0F0F.....
................
................
................`]
);

setSolids([]);

// Build empty map
setMap(
  Array(HEIGHT).fill(".".repeat(WIDTH)).join("\n")
);

addSprite(Math.floor(WIDTH / 2), HEIGHT - 1, player);

let score = 0;
let gameRunning = true;
let tickCount = 0;
let tickSpeed = 450;
let tickInterval;


onInput("a", () => {
  if (!gameRunning) return;
  const p = getAll(player)[0];
  if (p && p.x > 0) p.x--;
});
onInput("d", () => {
  if (!gameRunning) return;
  const p = getAll(player)[0];
  if (p && p.x < WIDTH - 1) p.x++;
});

onInput("j", () => {
  if (!gameRunning) return;
  const p = getAll(player)[0];
  if (p && p.x > 0) p.x--;
});
onInput("l", () => {
  if (!gameRunning) return;
  const p = getAll(player)[0];
  if (p && p.x < WIDTH - 1) p.x++;
});


onInput("i", () => {
  if (!gameRunning) restartGame();
});


function spawnObstacles() {

  const maxObs = Math.min(1 + Math.floor(score / 8), WIDTH - 2);
  const cols = Array.from({ length: WIDTH }, (_, i) => i);

  for (let i = cols.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cols[i], cols[j]] = [cols[j], cols[i]];
  }
  for (let i = 0; i < maxObs; i++) {
    addSprite(cols[i], 0, obstacle);
  }
}

function moveObstacles() {
  for (const obs of getAll(obstacle)) {
    if (obs.y >= HEIGHT - 1) obs.remove();
    else obs.y++;
  }
}

function checkCollision() {
  const p = getAll(player)[0];
  if (!p) return false;
  return getAll(obstacle).some(o => o.x === p.x && o.y === p.y);
}

function updateHUD() {
  clearText();
  addText(`Score: ${score}`, { x: 0, y: 0, color: color`3` });
}

function endGame() {
  gameRunning = false;
  clearInterval(tickInterval);
  clearText();
  addText("GAME OVER", { x: 0, y: 3, color: color`3` });
  addText(`Score: ${score}`, { x: 0, y: 4, color: color`2` });
  addText("i = restart", { x: 0, y: 5, color: color`4` });
}

function restartGame() {
  // Clear all sprites
  for (const obs of getAll(obstacle)) obs.remove();
  for (const p of getAll(player)) p.remove();

  score = 0;
  tickCount = 0;
  tickSpeed = 450;
  gameRunning = true;

  addSprite(Math.floor(WIDTH / 2), HEIGHT - 1, player);
  clearInterval(tickInterval);
  tickInterval = setInterval(tick, tickSpeed);
  updateHUD();
}

function tick() {
  if (!gameRunning) return;

  moveObstacles();

  if (checkCollision()) {
    endGame();
    return;
  }

  if (tickCount % 2 === 0) spawnObstacles();

  score++;
  tickCount++;
  updateHUD();

  if (score % 10 === 0 && tickSpeed > 150) {
    clearInterval(tickInterval);
    tickSpeed -= 25;
    tickInterval = setInterval(tick, tickSpeed);
  }
}

tickInterval = setInterval(tick, tickSpeed);
updateHUD();