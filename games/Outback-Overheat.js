const player = "p";
const gumTree = "g";
const puddle = "w";
const roadTrain = "t";
const sand = "s";
const gravel = "r";

setLegend(
  [player, bitmap`
................
................
....32333323....
...L33333333L...
...L33333333L...
...L33333333L...
....37777773....
....37777773....
....33333333....
....33333333....
...L33333333L...
...L33333333L...
...L33333333L...
....33333333....
................
................`],
  [roadTrain, bitmap`
....33333333....
...L33333333L...
...L33333333L...
...L33333333L...
....37777773....
...3377777733...
...3333333333...
...3333333333...
...3333333333...
....00000000....
....00000000....
....00000000....
...L00011000L...
...L00011000L...
...L00000000L...
................`],
  [gumTree, bitmap`
666DDDD666666666
6DDDD44DDDD66666
DD4DDDDDDDDDDD66
D4DD4D44D4DD4DD6
DD44DDDD4DDDDDD6
6DD4DD4DD44D4DD6
6DD4444D4D4DDD66
6DDDDDDD44DDDD66
66666DDDDDDD6666
66DD666CCCD66666
66D4D66CCC66DD46
666D4C6CCC6D4D66
6666DCCCCCCCDD66
6666666CCCC66666
6666666CCC666666
6666666CCC666666`],
  [puddle, bitmap`
1111111177111111
1111177777777111
1111177777777111
1177777777777711
1177777777777711
1177777777777771
1177777777777771
1777777777777777
1777777777777777
1777777777777777
1177777777777777
1177777777777777
1177777777777777
1177777777777771
1117777777777711
1111777777777111`],
  [sand, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [gravel, bitmap`
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
1111111111111111`]
);

setMap(map`
ssssrrrsssss
ssgsrrrsssgs
ssssrwssssss
sgsrrrsssgss
sssrrrssgsss
sgsrrrssssss
ssswrsssssss
sssrrrssssss
sgsrprssgsss
sssrrrssssss
ssssrrrsssss
ssgsrrrsssgs`);

let heat = 0;
const maxHeat = 100;
let score = 0;
let gameOver = false;
let tickCounter = 0;
let baseSpawnInterval = 500;
let spawnTimer;
let gameOverMessage = "";

function setupGame() {
  heat = 0;
  score = 0;
  gameOver = false;
  tickCounter = 0;
  baseSpawnInterval = 500;
  gameOverMessage = "";

  const p = getFirst(player);
  if (p) {
    p.x = 6;
    p.y = 10;
  }

  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 12; x++) {
      getTile(x, y).forEach(t => { if (t.type !== player) t.remove(); });
      const isRoad = x >= 5 && x <= 7;
      addSprite(x, y, isRoad ? gravel : sand);
      if (!isRoad && Math.random() < 0.1) addSprite(x, y, gumTree);
    }
  }

  updateUI();
  startSpawning();
}

function updateUI() {
  if (heat < 0) heat = 0;
  if (heat > maxHeat) heat = maxHeat;

  clearText();
  addText(`TEMP: ${Math.floor(heat)}%`, { y: 1, color: "0" });
  addText(`KM: ${score}`, { y: 2, color: "0" });

  if (gameOver) {
    addText(gameOverMessage, { y: 7, color: "3" });
    addText("PRESS I TO RESTART", { y: 9, color: "0" });
  }
}

function checkCollision() {
  const p = getFirst(player);
  if (!p) return;

  getTile(p.x, p.y).forEach(tile => {
    if ((tile.type === roadTrain || tile.type === gumTree) && !gameOver) {
      gameOver = true;
      heat = maxHeat;
      gameOverMessage = tile.type === roadTrain ? "COLLIDED WITH TRUCK!" : "COLLIDED WITH TREE!";
    }
    if (tile.type === puddle) heat = 0;
  });

  updateUI();
}

function spawnRow() {
  if (gameOver) return;

  tickCounter++;

  getAll().forEach(s => {
    if (s.type === player) return;

    s.y += 1;

    if (s.type === roadTrain && tickCounter % 2 === 0) {
      s.y -= 1;
    }

    if (s.y === 11 && !s.bottomTick) {
      s.bottomTick = tickCounter;
    }

    if (s.y === 11 && s.bottomTick && tickCounter > s.bottomTick) {
      if (s.type !== sand && s.type !== gravel && s.type !== player) {
        s.remove();
      }
    }

    if (s.y < 0 || s.y > 11) s.remove();
  });

  for (let x = 0; x < 12; x++) {
    const isRoad = x >= 5 && x <= 7;
    const chance = Math.random();

    getTile(x, 0).forEach(t => { if (t.type !== player) t.remove(); });

    if (isRoad) {
      addSprite(x, 0, gravel);
      if (chance < 0.08) addSprite(x, 0, roadTrain);
      else if (chance < 0.12) addSprite(x, 0, puddle);
    } else {
      addSprite(x, 0, sand);
      if (chance < 0.12) addSprite(x, 0, gumTree);
    }
  }

  score++;
  checkCollision();
  clearInterval(spawnTimer);
  startSpawning();
}

function startSpawning() {
  if (spawnTimer) clearInterval(spawnTimer);
  let currentInterval = Math.max(100, baseSpawnInterval - score * 2);
  spawnTimer = setInterval(() => {
    if (!gameOver) spawnRow();
  }, currentInterval);
}

setInterval(() => {
  if (!gameOver) {
    let heatIncrease = Math.min(4, 1 + Math.floor(score / 20));
    heat += heatIncrease;
    if (heat > maxHeat) heat = maxHeat;
    updateUI();
  }
}, 600);


onInput("w", () => { });
onInput("a", () => { const p = getFirst(player); if (p && p.x > 0 && !gameOver) { p.x--; checkCollision(); } });
onInput("d", () => { const p = getFirst(player); if (p && p.x < 11 && !gameOver) { p.x++; checkCollision(); } });
onInput("i", setupGame);

setupGame();
