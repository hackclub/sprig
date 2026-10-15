
/*
@title: Dodge_The_Rocks
@description: Survive an endless asteroid field with shields, power-ups, combos and special rocks.
@author:Vinayak Choudhary
@tags: ['arcade', 'survival']
@addedOn: 2026-10-02
*/

const ship = "p";
const rock = "r";
const space = "b";
const armored = "a";
const fastRock = "f";
const pickup = "u";

setLegend(
  [ship, bitmap`
.......33.......
.......33.......
......3333......
......3333......
.....333333.....
.....333333.....
....33333333....
...3333333333...
..333333333333..
..33L333333L33..
..33.C3333C.33..
.....CCCCCC.....
......CCCC......
................
................
................`],

  [rock, bitmap`
................
......11........
...1122211111...
..12222221LL11..
.1222LL22221LL1.
.122LLL2222221L.
.11222222221LL1.
..122222LL22L1..
.1L2222222LL211.
.11L222222222L1.
..11LL2222LLL1..
...11LLLLLL11...
.....1111.......
................
................
................`],

  [armored, bitmap`
................
......6666......
...6661111666...
..661122221166..
.66122222222166.
.61222222222216.
.61226611662216.
.61226611662216.
.61222222222216.
.66122222222166.
..661122221166..
...6661111666...
......6666......
................
................
................`],

  [fastRock, bitmap`
................
........44......
......44444.....
....44422144....
...4422222144...
..442222222144..
..422222222214..
..442222222144..
...4422222144...
....44422144....
......44444.....
........44......
................
................
................
................`],

  [pickup, bitmap`
................
................
.......55.......
......5775......
.....577775.....
....57777775....
....57777775....
....57777775....
....57777775....
.....577775.....
......5775......
.......55.......
................
................
................
................`],

  [space, bitmap`
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
0000000000000000`]
);

setBackground(space);
setSolids([]);

const W = 10;
const H = 8;

const INITIAL_MAP = map`
..........
..........
..........
..........
..........
..........
..........
....p.....`;

setMap(INITIAL_MAP);

// =====================
// GAME STATE
// =====================

let score = 0;
let health = 3;
let ammo = 3;

let alive = true;
let paused = false;

let bombReady = true;
let nextBomb = 0;

let safeX = 4;
let nextPickup = 12;

let combo = 0;
let bestCombo = 0;
let comboUntil = 0;

let shieldUntil = 0;
let shieldCooldownUntil = 0;
let invulnerableUntil = 0;

let timer = null;

// =====================
// HELPERS
// =====================

function now() {
  return Date.now();
}

function hazards() {
  return [
    ...getAll(rock),
    ...getAll(armored),
    ...getAll(fastRock)
  ];
}

function removeAllHazards() {
  hazards().forEach(r => r.remove());
}

function showScore() {
  clearText();

  addText("Score:" + score + " HP:" + health, {
    x: 1, y: 0, color: color`3`
  });

  addText("Ammo:" + ammo + " Bomb:" +
    (bombReady ? "READY" : "..."), {
    x: 1, y: 1, color: color`3`
  });

  let shieldText = "SHIELD READY";

  if (now() < shieldUntil) {
    shieldText = "SHIELD ACTIVE";
  } else if (now() < shieldCooldownUntil) {
    shieldText = "SHIELD RECHARGING";
  }

  addText(shieldText, {
    x: 1, y: 2, color: color`3`
  });

  if (combo > 1) {
    addText("COMBO x" + combo, {
      x: 5, y: 3, color: color`5`
    });
  }
}

// =====================
// COLLISION SYSTEM
// =====================

function gameOver() {
  if (!alive) return;

  alive = false;
  clearTimeout(timer);
  timer = null;

  clearText();

  addText("GAME OVER", {
    x: 5, y: 3, color: color`3`
  });

  addText("Score:" + score, {
    x: 5, y: 4, color: color`3`
  });

  addText("Best combo:" + bestCombo, {
    x: 3, y: 5, color: color`3`
  });

  addText("Press J to retry", {
    x: 2, y: 6, color: color`3`
  });
}

function hitCheck() {
  if (!alive) return;

  const s = getFirst(ship);
  if (!s) return;

  const collisions = hazards().filter(r =>
    r.x === s.x && r.y === s.y
  );

  if (collisions.length === 0) return;

  // Shield destroys rocks touching the ship.
  if (now() < shieldUntil) {
    collisions.forEach(r => r.remove());
    score += collisions.length * 2;
    showScore();
    return;
  }

  // Brief invulnerability prevents repeated damage.
  if (now() < invulnerableUntil) {
    return;
  }

  collisions.forEach(r => r.remove());

  health--;
  combo = 0;
  invulnerableUntil = now() + 1000;

  if (health <= 0) {
    gameOver();
  } else {
    showScore();
  }
}

// =====================
// PICKUPS
// =====================

function collectPickups() {
  if (!alive) return;

  const s = getFirst(ship);
  if (!s) return;

  // getAll returns sprites, unlike tilesWith.
  // This lets us safely call item.remove().
  const items = getAll(pickup).filter(item =>
    item.x === s.x && item.y === s.y
  );

  items.forEach(item => {
    item.remove();

    const reward = Math.floor(Math.random() * 3);

    if (reward === 0) {
      ammo = Math.min(5, ammo + 2);

      addText("+2 AMMO", {
        x: 5, y: 5, color: color`5`
      });
    } else if (reward === 1) {
      health = Math.min(3, health + 1);

      addText("+1 HEALTH", {
        x: 4, y: 5, color: color`5`
      });
    } else {
      score += 15;

      addText("+15 POINTS", {
        x: 4, y: 5, color: color`5`
      });
    }
  });

  if (items.length > 0) {
    showScore();
  }
}

// =====================
// SPAWNING
// =====================


function spawnRocks() {
  safeX += Math.floor(Math.random() * 3) - 1;
  safeX = Math.max(0, Math.min(W - 1, safeX));

  const chance = Math.min(0.12 + score / 500, 0.65);
  let count = 0;

  for (let x = 0; x < W; x++) {
    if (x === safeX) continue;
    if (count >= 3) break;

    if (Math.random() < chance) {
      const roll = Math.random();

      if (roll < 0.15) {
        addSprite(x, 0, armored);
      } else if (roll < 0.35) {
        addSprite(x, 0, fastRock);
      } else {
        addSprite(x, 0, rock);
      }

      count++;
    }
  }
}


function spawnPickup() {
  const x = Math.floor(Math.random() * W);
  addSprite(x, 0, pickup);
}

// =====================
// SHOOTING
// =====================


function shoot() {
  if (!alive || paused || ammo <= 0) return;

  const s = getFirst(ship);
  if (!s) return;

  const targets = hazards().filter(r =>
    r.x === s.x && r.y < s.y
  );

  if (targets.length === 0) {
    combo = 0;
    showScore();
    return;
  }

  targets.sort((a, b) => b.y - a.y);

  const target = targets[0];
  ammo--;

  if (target.type === armored) {
    target.remove();
    ammo = Math.min(5, ammo + 1);
    combo++;
    score += 10 * Math.min(combo, 5);
  } else {
    target.remove();
    combo++;
    score += 5 * Math.min(combo, 5);
  }

  if (combo > bestCombo) {
    bestCombo = combo;
  }

  comboUntil = now() + 2500;
  showScore();
}


// =====================
// BOMB
// =====================

function bomb() {
  if (!alive || paused || !bombReady) return;

  removeAllHazards();

  bombReady = false;
  nextBomb = score + 60;

  combo = 0;
  score += 5;

  showScore();
}

// =====================
// SHIELD
// =====================

function activateShield() {
  if (!alive || paused) return;
  if (now() < shieldCooldownUntil) return;

  shieldUntil = now() + 3000;
  shieldCooldownUntil = now() + 20000;

  // Immediately clear rocks touching the ship.
  const s = getFirst(ship);

  if (s) {
    hazards().forEach(r => {
      if (r.x === s.x && r.y === s.y) {
        r.remove();
      }
    });
  }

  showScore();
}

// =====================
// MAIN GAME TICK
// =====================

function tick() {
  if (!alive || paused) return;

  // Move each asteroid.
  hazards().forEach(r => {
    if (r.y >= H - 1) {
      r.remove();
      return;
    }

    // Fast rocks move two rows at a time.
    if (r.type === fastRock) {
      r.y = Math.min(H - 1, r.y + 2);
    } else {
      r.y += 1;
    }
  });

  // Move power-ups.
  getAll(pickup).forEach(p => {
    if (p.y >= H - 1) {
      p.remove();
    } else {
      p.y += 1;
    }
  });

  hitCheck();
  if (!alive) return;

  collectPickups();

  hitCheck();
  if (!alive) return;

  // Spawn asteroids.
  if (score % 2 === 0) {
    spawnRocks();
  }

  // Spawn collectibles periodically.
  if (score >= nextPickup) {
    spawnPickup();

    nextPickup =
      score + 12 + Math.floor(Math.random() * 8);
  }

  score++;

  // Regenerate ammo slowly.
  if (score % 20 === 0 && ammo < 3) {
    ammo++;
  }

  // Bomb cooldown.
  if (!bombReady && score >= nextBomb) {
    bombReady = true;
  }

  // Combo timeout.
  if (combo > 0 && now() > comboUntil) {
    combo = 0;
  }

  showScore();
}

function loop() {
  if (paused || !alive) return;

  tick();

  if (alive && !paused) {
    const delay = Math.max(180, 550 - score * 2);
    timer = setTimeout(loop, delay);
  }
}

// =====================
// MOVEMENT
// =====================

function move(dx, dy) {
  if (!alive || paused) return;

  const s = getFirst(ship);
  if (!s) return;

  const nx = s.x + dx;
  const ny = s.y + dy;

  if (nx >= 0 && nx < W) {
    s.x = nx;
  }

  // Keep the ship in the bottom three rows.
  if (ny >= H - 3 && ny < H) {
    s.y = ny;
  }

  hitCheck();
  if (!alive) return;

  collectPickups();
  showScore();
}

// =====================
// PAUSE
// =====================

function togglePause() {
  if (!alive) return;

  paused = !paused;

  if (paused) {
    clearTimeout(timer);
    timer = null;

    clearText();
    addText("PAUSED", {
      x: 6, y: 4, color: color`3`
    });

    addText("Press I to resume", {
      x: 2, y: 5, color: color`3`
    });
  } else {
    showScore();
    loop();
  }
}

// =====================
// RESTART
// =====================

function restart() {
  clearTimeout(timer);
  timer = null;

  removeAllHazards();
  getAll(pickup).forEach(p => p.remove());

  const s = getFirst(ship);

  if (s) {
    s.x = 4;
    s.y = H - 1;
  }

  score = 0;
  health = 3;
  ammo = 3;

  alive = true;
  paused = false;

  bombReady = true;
  nextBomb = 0;

  safeX = 4;
  nextPickup = 12;

  combo = 0;
  bestCombo = 0;
  comboUntil = 0;

  shieldUntil = 0;
  shieldCooldownUntil = 0;
  invulnerableUntil = 0;

  showScore();
  loop();
}

// =====================
// CONTROLS
// =====================

onInput("a", () => move(-1, 0));
onInput("d", () => move(1, 0));
onInput("w", () => move(0, -1));
onInput("s", () => move(0, 1));

onInput("j", () => {
  if (alive) {
    shoot();
  } else {
    restart();
  }
});

onInput("k", () => bomb());
onInput("i", () => togglePause());
onInput("l", () => activateShield());

// Start the game.
showScore();
loop();
