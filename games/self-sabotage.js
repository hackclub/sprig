/*
@title: You Are the Enemy
@author: Suratii
@addedOn: 2024-12-03
@tags: []
*/

const player = "p";
const terrain = "t";
const enemy = "e";
const bullet = "b";
const target = "g";
const tear = "x";

let playerHP = 10;
let hits = 0;
let level = 0;
let gameStarted = false;

const levels = [
  { targetHits: 3, enemiesPerHit: 2 },
  { targetHits: 5, enemiesPerHit: 3 },
  { targetHits: 10, enemiesPerHit: 5 }
];

setLegend(
  [player, bitmap`
0000000DD0000000
000000D4D0000000
00000D4D00000000
0002222200000000
0022000220000000
0020202020000000
0020202020000000
0020000021110000
0022000221000000
0002222200000000
0000202000000000
0000202000000000
0002202200000000
0000000000000000
0000000000000000
0000000000000000`],
  [terrain, bitmap`
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
  [enemy, bitmap`
0000000CC0000000
000000CCC0000000
00000CCC00000000
000LLLLL00000000
00LL000LL0000000
00L0L0L0L0000000
00L0L0L0L0000000
00L00000L0000000
00LL000LL0000000
000LLLLL00000000
0000L0L000000000
0000L0L000000000
000LL0LL00000000
0000000000000000
0000000000000000
0000000000000000`],
  [bullet, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000600000000
0000000L00000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [target, bitmap`
3333333333333333
3222222222222223
3233333333333323
3232222222222323
3232333333332323
3232322222232323
3232323333232323
3232323223232323
3232323223232323
3232323333232323
3232322222232323
3232333333332323
3232222222222323
3233333333333323
3222222222222223
3333333333333333`]
);

setSolids([player]);

// Display the start screen
const startMap = map`
.........
.........
.........
.........
.........
.........
.........
.........
.........`;
setMap(startMap);
setBackground(terrain)

const textMap = map`
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................`;

addText("SELF SABATOGE", { x: 2, y: 3, color: color`0` });
addText("WASD to move", { x: 3, y: 5, color: color`3` });
addText("Press J to start", { x: 2, y: 7, color: color`5` });

// Start the game
onInput("j", () => {
  if (!gameStarted) {
    gameStarted = true;
    startLevel();
  }
});

function startLevel() {
  clearText();
  setMap(map`
.........
.........
....g....
.........
.........
.........
....p....
.........
.........`);
  hits = 0;
  updateHP();
}

// Player movement restricted to avoid the target
onInput("w", () => movePlayer(0, -1));
onInput("s", () => movePlayer(0, 1));
onInput("a", () => movePlayer(-1, 0));
onInput("d", () => movePlayer(1, 0));

function movePlayer(dx, dy) {
  const p = getFirst(player);
  const t = getFirst(target);
  const newX = p.x + dx;
  const newY = p.y + dy;

  // Prevent movement within 3 pixels of the target
  if (
    Math.abs(newX - t.x) < 3 &&
    Math.abs(newY - t.y) < 3
  ) return;

  if (newX >= 0 && newX <= 8 && newY >= 0 && newY <= 8) {
    p.x = newX;
    p.y = newY;
  }
}

// Shooting mechanism
onInput("i", () => {
  const p = getFirst(player);
  if (p) addSprite(p.x, p.y - 1, bullet);
});

setInterval(() => {
  // Move bullets upward and detect hits
  const bullets = getAll(bullet);
  bullets.forEach(b => {
    b.y -= 1;
    if (tilesWith(target, bullet).length > 0) {
      hits += 1;
      b.remove();
      spawnEnemies(levels[level].enemiesPerHit);

      // Level completion check
      if (hits >= levels[level].targetHits) {
        level += 1;
        if (level >= levels.length) {
          addText("You Win!", { x: 4, y: 4, color: color`5` });
        } else {
          startLevel();
        }
      }
    }
  });
}, 200);

// Spawn enemies
function spawnEnemies(count) {
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 9);
    const y = Math.floor(Math.random() * 9);
    addSprite(x, y, enemy);
  }
}

// Enemy movement and player damage
setInterval(() => {
  const enemies = getAll(enemy);
  const p = getFirst(player);
  enemies.forEach(e => {
    const dx = p.x > e.x ? 1 : -1;
    const dy = p.y > e.y ? 1 : -1;
    e.x += dx;
    e.y += dy;

    if (tilesWith(player, enemy).length > 0) {
      playerHP -= 1;
      e.remove();
      if (playerHP <= 0) gameOver();
    }
  });
}, 500);

function gameOver() {
  setMap(textMap)
  addText("   YOU DIED", { x: 2, y: 4, color: color`F` });
  addText("k to give up", { x: 6, y: 6, color: color`grey` });

  onInput("l", () => {
    setMap(startMap)
    playerHP = 10; // Reset health
    startLevel();
  });

  onInput("k", () => {
    gameStarted = false;
    setMap(startMap);
    clearText();
    addText("SELF SABOTAGE", { x: 2, y: 3, color: color`8` });
    addText("WASD to move", { x: 3, y: 5, color: color`3` });
    addText("Press J to start", { x: 2, y: 7, color: color`5` });
  });
}

// HP display at the top right corner
function updateHP() {
  clearText();
  addText(`HP: ${playerHP}`, { x: 7, y: 0, color: color`green` });
}
