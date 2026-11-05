/*
@title: Sprig3D ZOMBIZ
@description: 3d Zombie Level Shooter
@author: AldoCantu
@tags: ['3d', 'fps', 'zombies']
@addedOn: 2026-11-04
*/

// CONTROLS
// W/S: Move
// A/D: Turn
// J/L: Strafe
// I: Fire or confirm
// K: Reload
// K + L within 180 ms: Pause or resume

const W = 160;
const H = 128;
const RAYS = 80;
const FOV = Math.PI / 3;

const TICK_MS = 25;
const MENU_DELAY = 400;
const COMBO_MS = 180;

const MAG_SIZE = 12;
const RELOAD_MS = 1200;
const SHOT_MS = 450;

const MAX_ACTIVE = 3;
const PLAYER_RADIUS = 0.17;

// ============================================
// FRAMEBUFFER
// ============================================

const KEYS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "abcdefghijklmnopqrstuvwxyz" +
  "0123456789!#$%&*+-:;<=>?@^_~";

const screenRows = [];

for (let y = 0; y < 8; y++) {
  screenRows.push(KEYS.slice(y * 10, y * 10 + 10));
}

const screenMap = screenRows.join("\n");

// ============================================
// CAMPAIGN
//
// 0: Walkable
// 1: Concrete
// 2: Reinforced concrete
// 3: Metal
// ============================================

const LEVELS = [
  {
    name: "FIRST CONTACT",
    total: 3,
    hp: 3,
    speed: 0.65,
    damage: 8,
    start: [2.5, 3.5, 0],

    map: [
      "111111111111",
      "100000000001",
      "102220033301",
      "100020000001",
      "100020330301",
      "100000030001",
      "103300030301",
      "100000000001",
      "111111111111"
    ],

    supplies: [
      [5.5, 1.5, "ammo"],
      [1.5, 7.5, "health"]
    ]
  },

  {
    name: "INFESTATION",
    total: 5,
    hp: 3,
    speed: 0.70,
    damage: 9,
    start: [1.5, 1.5, 0],

    map: [
      "11111111111111",
      "10000000000001",
      "10222003330001",
      "10002000000001",
      "10002000333001",
      "10000000300001",
      "10333000300001",
      "10000000000001",
      "10022200333001",
      "10000000000001",
      "11111111111111"
    ],

    supplies: [
      [6.5, 3.5, "ammo"],
      [11.5, 7.5, "health"],
      [3.5, 9.5, "ammo"]
    ]
  },

  {
    name: "LOCKDOWN",
    total: 7,
    hp: 4,
    speed: 0.75,
    damage: 10,
    start: [1.5, 1.5, 0],

    map: [
      "33333333333333",
      "30000000000003",
      "30222002222003",
      "30002002000003",
      "30002002033003",
      "30000000003003",
      "30333033303003",
      "30000000300003",
      "30222000022003",
      "30000000000003",
      "33333333333333"
    ],

    supplies: [
      [5.5, 3.5, "ammo"],
      [10.5, 3.5, "health"],
      [4.5, 7.5, "ammo"],
      [11.5, 9.5, "health"]
    ]
  },

  {
    name: "OUTBREAK",
    total: 9,
    hp: 4,
    speed: 0.82,
    damage: 11,
    start: [1.5, 1.5, 0],

    map: [
      "1111111111111111",
      "1000000000000001",
      "1022200333022201",
      "1000200000000201",
      "1000200333000201",
      "1000000300000001",
      "1033300303330001",
      "1000000000030001",
      "1022200333002201",
      "1000000000000001",
      "1111111111111111"
    ],

    supplies: [
      [5.5, 3.5, "ammo"],
      [12.5, 5.5, "health"],
      [4.5, 7.5, "ammo"],
      [13.5, 9.5, "health"]
    ]
  },

  {
    name: "LAST STAND",
    total: 12,
    hp: 5,
    speed: 0.88,
    damage: 12,
    start: [1.5, 1.5, 0],

    map: [
      "3333333333333333",
      "3000000000000003",
      "3022200333022203",
      "3000000000000003",
      "3033303330333003",
      "3000000000000003",
      "3022200333022203",
      "3000000000000003",
      "3033303330333003",
      "3000000000000003",
      "3333333333333333"
    ],

    supplies: [
      [6.5, 3.5, "ammo"],
      [12.5, 3.5, "health"],
      [4.5, 5.5, "ammo"],
      [10.5, 7.5, "health"],
      [13.5, 9.5, "ammo"]
    ]
  }
];

// ============================================
// GAME STATE
// ============================================

let state = "menu";
let menuIndex = 0;
let menuUnlockAt = Date.now() + MENU_DELAY;

let levelIndex = 0;
let world = LEVELS[0].map;

let px = 2.5;
let py = 3.5;
let angle = 0;

let health = 100;
let ammo = MAG_SIZE;
let reserveAmmo = 48;

let kills = 0;
let shots = 0;
let hits = 0;
let deaths = 0;

let levelKills = 0;
let spawned = 0;

let enemies = [];
let pickups = [];
let checkpoint = null;

let gameMs = 0;
let reloadUntil = 0;
let shotAt = 0;
let spawnAt = 0;

let flashUntil = 0;
let hurtUntil = 0;
let reloading = false;

let message = "";
let messageUntil = 0;

let pendingKey = null;
let comboUntil = 0;

let nav = [];
let navCell = -1;

let dirty = true;
let busy = false;

let lastTick = Date.now();
let aiElapsed = 0;
let lastFrame = -1;

// ============================================
// FONT
// ============================================

const FONT = {
  A: "010/101/111/101/101",
  B: "110/101/110/101/110",
  C: "011/100/100/100/011",
  D: "110/101/101/101/110",
  E: "111/100/110/100/111",
  F: "111/100/110/100/100",
  G: "011/100/101/101/011",
  H: "101/101/111/101/101",
  I: "111/010/010/010/111",
  J: "001/001/001/101/010",
  K: "101/101/110/101/101",
  L: "100/100/100/100/111",
  M: "101/111/111/101/101",
  N: "101/111/111/111/101",
  O: "010/101/101/101/010",
  P: "110/101/110/100/100",
  Q: "010/101/101/111/011",
  R: "110/101/110/101/101",
  S: "011/100/010/001/110",
  T: "111/010/010/010/010",
  U: "101/101/101/101/111",
  V: "101/101/010/101/010",
  W: "101/101/111/111/101",
  X: "101/101/010/101/101",
  Y: "101/101/010/010/010",
  Z: "111/001/010/100/111",

  "0": "111/101/101/101/111",
  "1": "010/110/010/010/111",
  "2": "110/001/010/100/111",
  "3": "110/001/010/001/110",
  "4": "101/101/111/001/001",
  "5": "111/100/110/001/110",
  "6": "011/100/110/101/010",
  "7": "111/001/010/010/010",
  "8": "010/101/010/101/010",
  "9": "010/101/011/001/110",

  ":": "000/010/000/010/000",
  ".": "000/000/000/000/010",
  "-": "000/000/111/000/000",
  "/": "001/001/010/100/100",
  "+": "000/010/111/010/000",
  ">": "100/010/001/010/100",
  "%": "101/001/010/100/101",
  " ": "000/000/000/000/000"
};

for (const c of Object.keys(FONT)) {
  FONT[c] = FONT[c].split("/");
}

// ============================================
// DRAWING UTILITIES
// ============================================

function rect(p, x, y, w, h, color) {
  const x0 = Math.max(0, Math.floor(x));
  const x1 = Math.min(W, Math.ceil(x + w));

  const y0 = Math.max(0, Math.floor(y));
  const y1 = Math.min(H, Math.ceil(y + h));

  for (let yy = y0; yy < y1; yy++) {
    for (let xx = x0; xx < x1; xx++) {
      p[yy][xx] = color;
    }
  }
}

function text(p, str, x, y, color = "7", scale = 1) {
  str = String(str).toUpperCase();

  for (let i = 0; i < str.length; i++) {
    const glyph = FONT[str[i]] || FONT[" "];

    for (let gy = 0; gy < 5; gy++) {
      for (let gx = 0; gx < 3; gx++) {
        if (glyph[gy][gx] === "1") {
          rect(
            p,
            x + (i * 4 + gx) * scale,
            y + gy * scale,
            scale,
            scale,
            color
          );
        }
      }
    }
  }
}

function centered(p, str, y, color = "7", scale = 1) {
  const width = (str.length * 4 - 1) * scale;
  const x = Math.floor((W - width) / 2);

  text(p, str, x, y, color, scale);
}

function wrapAngle(a) {
  while (a > Math.PI) {
    a -= Math.PI * 2;
  }

  while (a < -Math.PI) {
    a += Math.PI * 2;
  }

  return a;
}

function timeText(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  return minutes + ":" + (remaining < 10 ? "0" : "") + remaining;
}

function notifyMessage(str) {
  message = str;
  messageUntil = gameMs + 1500;
  dirty = true;
}

// ============================================
// COLLISION AND MOVEMENT
// ============================================

function wallAt(x, y) {
  const mx = Math.floor(x);
  const my = Math.floor(y);

  return !world[my] || world[my][mx] !== "0";
}

function freeAt(x, y, radius = PLAYER_RADIUS) {
  return (
    !wallAt(x - radius, y - radius) &&
    !wallAt(x + radius, y - radius) &&
    !wallAt(x - radius, y + radius) &&
    !wallAt(x + radius, y + radius)
  );
}

function move(distance, side = 0) {
  if (state !== "playing") {
    return;
  }

  const dx = Math.cos(angle + side) * distance;
  const dy = Math.sin(angle + side) * distance;

  if (freeAt(px + dx, py)) {
    px += dx;
  }

  if (freeAt(px, py + dy)) {
    py += dy;
  }

  collectPickups();
  dirty = true;
}

function turn(distance) {
  if (state !== "playing") {
    return;
  }

  angle = wrapAngle(angle + distance);
  dirty = true;
}

// ============================================
// SHARED ZOMBIE NAVIGATION
// ============================================

const DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1]
];

function updateNavigation() {
  const width = world[0].length;
  const cell = Math.floor(py) * width + Math.floor(px);

  if (cell === navCell) {
    return;
  }

  navCell = cell;
  nav = new Array(width * world.length).fill(-1);

  const queue = [cell];
  nav[cell] = 0;

  for (let head = 0; head < queue.length; head++) {
    const id = queue[head];
    const x = id % width;
    const y = Math.floor(id / width);

    for (const direction of DIRS) {
      const nx = x + direction[0];
      const ny = y + direction[1];
      const next = ny * width + nx;

      if (
        nx < 0 ||
        nx >= width ||
        ny < 0 ||
        ny >= world.length ||
        world[ny][nx] !== "0" ||
        nav[next] !== -1
      ) {
        continue;
      }

      nav[next] = nav[id] + 1;
      queue.push(next);
    }
  }
}

function nextPathTile(enemy) {
  const width = world[0].length;
  const x = Math.floor(enemy.x);
  const y = Math.floor(enemy.y);

  let best = nav[y * width + x];
  let target = null;

  if (best === 0) {
    return { x: px, y: py };
  }

  for (const direction of DIRS) {
    const nx = x + direction[0];
    const ny = y + direction[1];
    const id = ny * width + nx;

    if (
      nx < 0 ||
      nx >= width ||
      ny < 0 ||
      ny >= world.length
    ) {
      continue;
    }

    if (nav[id] >= 0 && nav[id] < best) {
      best = nav[id];

      target = {
        x: nx + 0.5,
        y: ny + 0.5
      };
    }
  }

  return target;
}

// ============================================
// DDA RAYCASTER
// ============================================

const rayOffsets = [];

for (let i = 0; i < RAYS; i++) {
  rayOffsets.push(
    Math.atan(
      (2 * (i + 0.5) / RAYS - 1) * Math.tan(FOV / 2)
    )
  );
}

function castRay(a) {
  const dx = Math.cos(a);
  const dy = Math.sin(a);

  let mx = Math.floor(px);
  let my = Math.floor(py);

  const ddx = Math.abs(1 / (dx || 1e-10));
  const ddy = Math.abs(1 / (dy || 1e-10));

  const stepX = dx < 0 ? -1 : 1;
  const stepY = dy < 0 ? -1 : 1;

  let sx = (dx < 0 ? px - mx : mx + 1 - px) * ddx;
  let sy = (dy < 0 ? py - my : my + 1 - py) * ddy;

  for (let n = 0; n < 64; n++) {
    let distance;
    let side;

    if (sx < sy) {
      distance = sx;
      sx += ddx;
      mx += stepX;
      side = 0;
    } else {
      distance = sy;
      sy += ddy;
      my += stepY;
      side = 1;
    }

    const material = (world[my] && world[my][mx]) || "1";

    if (material !== "0") {
      let u;

      if (side === 0) {
        u = py + distance * dy;
      } else {
        u = px + distance * dx;
      }

      u -= Math.floor(u);

      if (
        (side === 0 && dx > 0) ||
        (side === 1 && dy < 0)
      ) {
        u = 1 - u;
      }

      return {
        distance: Math.max(0.001, distance),
        side: side,
        material: material,
        texX: Math.max(0, Math.min(15, Math.floor(u * 16)))
      };
    }
  }

  return {
    distance: 64,
    side: 1,
    material: "1",
    texX: 0
  };
}

// ============================================
// ZOMBIE SPAWNING
// ============================================

function spawnEnemy() {
  const level = LEVELS[levelIndex];

  if (
    spawned >= level.total ||
    enemies.length >= MAX_ACTIVE
  ) {
    return false;
  }

  updateNavigation();

  let best = null;
  let bestScore = -Infinity;

  for (let y = 1; y < world.length - 1; y++) {
    for (let x = 1; x < world[0].length - 1; x++) {
      const distance = nav[y * world[0].length + x];
      const ex = x + 0.5;
      const ey = y + 0.5;

      const crowded = enemies.some(function (enemy) {
        return Math.hypot(enemy.x - ex, enemy.y - ey) < 1.2;
      });

      if (distance < 3 || crowded) {
        continue;
      }

      const dx = ex - px;
      const dy = ey - py;

      const dist = Math.hypot(dx, dy);
      const aim = Math.atan2(dy, dx);
      const relative = wrapAngle(aim - angle);

      const hidden =
        Math.abs(relative) > FOV / 2 ||
        castRay(aim).distance < dist - 0.25;

      const score = distance + (hidden ? 20 : 0);

      if (score > bestScore) {
        bestScore = score;

        best = {
          x: ex,
          y: ey
        };
      }
    }
  }

  if (!best) {
    return false;
  }

  enemies.push({
    x: best.x,
    y: best.y,
    hp: level.hp,
    cooldown: gameMs + 900,
    hurtUntil: 0,
    target: null
  });

  spawned++;
  dirty = true;

  return true;
}

// ============================================
// PICKUPS
// ============================================

function collectPickups() {
  for (const item of pickups) {
    const distance = Math.hypot(item.x - px, item.y - py);

    if (item.used || distance > 0.55) {
      continue;
    }

    if (item.kind === "health") {
      if (health >= 100) {
        continue;
      }

      health = Math.min(100, health + 30);
      notifyMessage("HEALTH +30");
    } else {
      if (reserveAmmo >= 144) {
        continue;
      }

      reserveAmmo = Math.min(144, reserveAmmo + 24);
      notifyMessage("AMMO +24");
    }

    item.used = true;
  }
}

// ============================================
// ZOMBIE AI
// ============================================

function updateAI(dt) {
  updateNavigation();

  const level = LEVELS[levelIndex];

  for (const enemy of enemies) {
    const dx = px - enemy.x;
    const dy = py - enemy.y;
    const distance = Math.hypot(dx, dy);

    const attackVisible =
      castRay(Math.atan2(-dy, -dx)).distance >= distance - 0.02;

    if (distance < 0.72 && attackVisible) {
      if (gameMs >= enemy.cooldown) {
        health = Math.max(0, health - level.damage);
        enemy.cooldown = gameMs + 1100;

        hurtUntil = gameMs + 180;
        dirty = true;

        if (health <= 0) {
          deaths++;
          openScreen("dead");
          return;
        }
      }

      continue;
    }

    // Reach a tile's center before turning around a corner.
    const reachedTarget =
      enemy.target &&
      Math.hypot(
        enemy.target.x - enemy.x,
        enemy.target.y - enemy.y
      ) < 0.025;

    if (!enemy.target || reachedTarget) {
      enemy.target = nextPathTile(enemy);
    }

    if (!enemy.target) {
      continue;
    }

    const tx = enemy.target.x - enemy.x;
    const ty = enemy.target.y - enemy.y;
    const length = Math.hypot(tx, ty);

    if (length < 0.001) {
      continue;
    }

    const step = Math.min(length, level.speed * dt);
    const mx = tx / length * step;
    const my = ty / length * step;

    if (freeAt(enemy.x + mx, enemy.y, 0.13)) {
      enemy.x += mx;
    }

    if (freeAt(enemy.x, enemy.y + my, 0.13)) {
      enemy.y += my;
    }

    dirty = true;
  }

  if (
    gameMs >= spawnAt &&
    enemies.length < MAX_ACTIVE &&
    spawned < level.total
  ) {
    spawnEnemy();
    spawnAt = gameMs + 900;
  }
}

// ============================================
// COMBAT
// ============================================

function fire() {
  if (
    state !== "playing" ||
    reloading ||
    gameMs < shotAt
  ) {
    return;
  }

  if (ammo <= 0) {
    notifyMessage(
      reserveAmmo > 0 ? "K TO RELOAD" : "FIND AMMO"
    );

    return;
  }

  ammo--;
  shots++;

  shotAt = gameMs + SHOT_MS;
  flashUntil = gameMs + 100;
  dirty = true;

  let target = null;
  let nearest = Infinity;

  for (const enemy of enemies) {
    const dx = enemy.x - px;
    const dy = enemy.y - py;

    const distance = Math.hypot(dx, dy);
    const aim = Math.atan2(dy, dx);
    const relative = wrapAngle(aim - angle);

    if (Math.abs(relative) > Math.atan2(0.24, distance)) {
      continue;
    }

    if (
      distance < castRay(aim).distance + 0.02 &&
      distance < nearest
    ) {
      target = enemy;
      nearest = distance;
    }
  }

  if (!target) {
    return;
  }

  hits++;
  target.hp--;
  target.hurtUntil = gameMs + 180;

  if (target.hp > 0) {
    return;
  }

  enemies = enemies.filter(function (enemy) {
    return enemy !== target;
  });

  kills++;
  levelKills++;
  spawnAt = gameMs + 900;

  if (levelKills === LEVELS[levelIndex].total) {
    if (levelIndex === LEVELS.length - 1) {
      openScreen("victory");
    } else {
      openScreen("clear");
    }
  }
}

function reload() {
  if (
    state !== "playing" ||
    reloading ||
    ammo === MAG_SIZE ||
    reserveAmmo <= 0
  ) {
    return;
  }

  reloading = true;
  reloadUntil = gameMs + RELOAD_MS;
  dirty = true;
}

// ============================================
// GAME AND LEVEL STATES
// ============================================

function openScreen(next) {
  state = next;
  menuIndex = 0;
  menuUnlockAt = Date.now() + MENU_DELAY;

  pendingKey = null;
  dirty = true;
}

function loadLevel(retry = false) {
  if (retry) {
    health = checkpoint.health;
    ammo = checkpoint.ammo;
    reserveAmmo = checkpoint.reserveAmmo;

    kills = checkpoint.kills;
    shots = checkpoint.shots;
    hits = checkpoint.hits;
  } else {
    checkpoint = {
      health: health,
      ammo: ammo,
      reserveAmmo: reserveAmmo,
      kills: kills,
      shots: shots,
      hits: hits
    };
  }

  const level = LEVELS[levelIndex];

  world = level.map;

  px = level.start[0];
  py = level.start[1];
  angle = level.start[2];

  enemies = [];

  pickups = level.supplies.map(function (supply) {
    return {
      x: supply[0],
      y: supply[1],
      kind: supply[2],
      used: false
    };
  });

  levelKills = 0;
  spawned = 0;
  navCell = -1;

  reloading = false;
  reloadUntil = 0;

  flashUntil = 0;
  hurtUntil = 0;

  shotAt = gameMs;
  spawnAt = gameMs + 900;

  pendingKey = null;
  comboUntil = Date.now() + MENU_DELAY;

  state = "playing";
  lastTick = Date.now();

  aiElapsed = 0;
  lastFrame = -1;

  updateNavigation();

  for (let i = 0; i < MAX_ACTIVE; i++) {
    spawnEnemy();
  }

  notifyMessage(
    "LEVEL " + (levelIndex + 1) + " - " + level.name
  );
}

function resetGame() {
  health = 100;
  ammo = MAG_SIZE;
  reserveAmmo = 48;

  kills = 0;
  shots = 0;
  hits = 0;
  deaths = 0;

  levelIndex = 0;
  gameMs = 0;

  loadLevel();
}

function nextLevel() {
  health = Math.min(100, Math.max(40, health + 20));
  reserveAmmo = Math.min(144, reserveAmmo + 24);

  levelIndex++;
  loadLevel();
}

function resumeGame() {
  state = "playing";
  lastTick = Date.now();

  pendingKey = null;
  comboUntil = Date.now() + MENU_DELAY;

  dirty = true;
}

// ============================================
// MENU INPUT
// ============================================

function menuOptions() {
  if (state === "menu") {
    return ["START GAME", "CONTROLS"];
  }

  if (state === "paused") {
    return ["RESUME", "RETRY LEVEL", "MAIN MENU"];
  }

  if (state === "dead") {
    return ["RETRY LEVEL", "MAIN MENU"];
  }

  if (state === "clear") {
    return ["NEXT LEVEL", "MAIN MENU"];
  }

  if (state === "victory") {
    return ["NEW CAMPAIGN", "MAIN MENU"];
  }

  if (state === "controls") {
    return ["BACK"];
  }

  return [];
}

function menuMove(direction) {
  if (Date.now() < menuUnlockAt) {
    return;
  }

  const options = menuOptions();

  if (!options.length) {
    return;
  }

  menuIndex =
    (menuIndex + direction + options.length) % options.length;

  dirty = true;
}

function confirmMenu() {
  if (Date.now() < menuUnlockAt) {
    return;
  }

  const option = menuOptions()[menuIndex];

  if (
    option === "START GAME" ||
    option === "NEW CAMPAIGN"
  ) {
    resetGame();
  } else if (option === "RETRY LEVEL") {
    loadLevel(true);
  } else if (option === "NEXT LEVEL") {
    nextLevel();
  } else if (option === "RESUME") {
    resumeGame();
  } else if (option === "CONTROLS") {
    openScreen("controls");
  } else if (
    option === "BACK" ||
    option === "MAIN MENU"
  ) {
    openScreen("menu");
  }
}

// ============================================
// PAUSE COMBINATION
// ============================================

function flushPending() {
  if (!pendingKey || Date.now() < pendingKey.until) {
    return;
  }

  const key = pendingKey.key;
  pendingKey = null;

  if (state !== "playing") {
    return;
  }

  if (key === "k") {
    reload();
  } else {
    move(0.17, Math.PI / 2);
  }
}

function comboKey(key) {
  const now = Date.now();

  if (
    (state !== "playing" && state !== "paused") ||
    now < comboUntil ||
    now < menuUnlockAt
  ) {
    return;
  }

  flushPending();

  if (pendingKey && pendingKey.key !== key) {
    pendingKey = null;
    comboUntil = now + 500;

    if (state === "playing") {
      openScreen("paused");
    } else {
      resumeGame();
    }
  } else if (!pendingKey) {
    pendingKey = {
      key: key,
      until: now + COMBO_MS
    };
  }
}

// ============================================
// WALL TEXTURES
// ============================================

const textures = {};

for (const type of ["1", "2", "3"]) {
  const texture = [];

  for (let y = 0; y < 16; y++) {
    const row = [];

    for (let x = 0; x < 16; x++) {
      let color = "2";

      if (type === "1") {
        if (
          y === 0 ||
          y === 8 ||
          (y < 8 ? x === 0 : x === 8)
        ) {
          color = "0";
        }
      }

      if (type === "2") {
        if (
          x === 0 ||
          x === 15 ||
          y === 0 ||
          y === 15
        ) {
          color = "0";
        }

        if (
          (x === 4 || x === 11) &&
          (y === 4 || y === 11)
        ) {
          color = "1";
        }
      }

      if (type === "3") {
        if (
          x === 0 ||
          x === 15 ||
          y === 0 ||
          y === 15 ||
          x === 2 ||
          x === 13
        ) {
          color = "0";
        }
      }

      row.push(color);
    }

    texture.push(row);
  }

  textures[type] = texture;
}

function sampleWall(material, x, y, side) {
  const color = textures[material][y & 15][x & 15];

  if (
    side === 1 &&
    color === "2" &&
    (x + y) % 4 === 0
  ) {
    return "0";
  }

  return color;
}

// ============================================
// ZOMBIE SPRITE
// ============================================

function drawZombie(
  p,
  cx,
  top,
  size,
  depth,
  distance,
  frame,
  hurt
) {
  const left = cx - size / 2;

  function part(x, y, w, h, color) {
    const x0 = Math.max(0, Math.floor(left + x * size));
    const x1 = Math.min(W, Math.ceil(left + (x + w) * size));

    const y0 = Math.max(0, Math.floor(top + y * size));
    const y1 = Math.min(116, Math.ceil(top + (y + h) * size));

    for (let xx = x0; xx < x1; xx++) {
      if (distance >= depth[Math.floor(xx / 2)]) {
        continue;
      }

      for (let yy = y0; yy < y1; yy++) {
        p[yy][xx] = color;
      }
    }
  }

  const skin = hurt ? "6" : "4";
  const shadow = hurt ? "6" : "D";
  const clothes = "0";
  const walk = frame % 2 === 0 ? 0.04 : -0.04;

  // Legs
  part(0.30, 0.70, 0.16, 0.24 + walk, clothes);
  part(0.54, 0.70, 0.16, 0.24 - walk, clothes);

  // Boots
  part(0.27, 0.92 + walk, 0.20, 0.06, "2");
  part(0.53, 0.92 - walk, 0.20, 0.06, "2");

  // Body
  part(0.27, 0.32, 0.46, 0.43, clothes);
  part(0.34, 0.38, 0.32, 0.28, shadow);

  // Torn clothing
  part(0.37, 0.48, 0.10, 0.13, "2");
  part(0.55, 0.54, 0.08, 0.12, "6");

  // Arms
  part(0.14, 0.36 + walk, 0.15, 0.33, skin);
  part(0.71, 0.36 - walk, 0.15, 0.33, skin);

  // Hands
  part(0.12, 0.63 + walk, 0.18, 0.10, skin);
  part(0.70, 0.63 - walk, 0.18, 0.10, skin);

  // Neck and head
  part(0.44, 0.28, 0.12, 0.08, skin);
  part(0.31, 0.08, 0.38, 0.25, skin);

  // Hair
  part(0.31, 0.08, 0.38, 0.06, clothes);
  part(0.31, 0.13, 0.07, 0.08, clothes);

  // Face
  part(0.38, 0.19, 0.08, 0.05, "6");
  part(0.55, 0.19, 0.08, 0.05, "6");
  part(0.43, 0.28, 0.15, 0.025, clothes);
}

// ============================================
// PICKUP SPRITE
// ============================================

function drawPickup(p, item, cx, size, depth, forward) {
  const left = Math.floor(cx - size / 2);
  const top = Math.floor(H / 2 + H * 0.5 / forward - size);

  for (let yy = 0; yy < size; yy++) {
    for (let xx = 0; xx < size; xx++) {
      const sx = left + xx;
      const sy = top + yy;

      if (
        sx < 0 ||
        sx >= W ||
        sy < 0 ||
        sy >= 116 ||
        forward >= depth[Math.floor(sx / 2)]
      ) {
        continue;
      }

      const u = xx / size;
      const v = yy / size;

      const edge =
        u < 0.12 ||
        u > 0.88 ||
        v < 0.12 ||
        v > 0.88;

      let color;

      if (edge) {
        color = "0";
      } else {
        color = item.kind === "health" ? "2" : "D";
      }

      if (item.kind === "health") {
        const vertical =
          u > 0.4 && u < 0.6 &&
          v > 0.2 && v < 0.8;

        const horizontal =
          v > 0.4 && v < 0.6 &&
          u > 0.2 && u < 0.8;

        if (vertical || horizontal) {
          color = "3";
        }
      }

      if (item.kind === "ammo") {
        const bullet =
          (u > 0.2 && u < 0.35) ||
          (u > 0.45 && u < 0.6) ||
          (u > 0.7 && u < 0.85);

        if (v > 0.25 && v < 0.75 && bullet) {
          color = "6";
        }
      }

      p[sy][sx] = color;
    }
  }
}

// ============================================
// WORLD RENDERING
// ============================================

function drawWorld(p) {
  const depth = new Array(RAYS);

  // Walls
  for (let r = 0; r < RAYS; r++) {
    const relative = rayOffsets[r];
    const hit = castRay(angle + relative);

    const distance = Math.max(
      0.05,
      hit.distance * Math.cos(relative)
    );

    depth[r] = distance;

    const wallHeight = H / distance;
    const wallTop = (H - wallHeight) / 2;

    const top = Math.max(0, Math.floor(wallTop));
    const bottom = Math.min(
      H,
      Math.ceil(wallTop + wallHeight)
    );

    for (let y = top; y < bottom; y++) {
      const ty = Math.max(
        0,
        Math.min(
          15,
          Math.floor((y - wallTop) / wallHeight * 16)
        )
      );

      const color = sampleWall(
        hit.material,
        hit.texX,
        ty,
        hit.side
      );

      p[y][r * 2] = color;
      p[y][r * 2 + 1] = color;
    }
  }

  // Zombies and pickups, sorted back to front.
  const visible = [];

  for (const enemy of enemies) {
    visible.push({
      e: enemy,
      kind: "zombie"
    });
  }

  for (const item of pickups) {
    if (!item.used) {
      visible.push({
        e: item,
        kind: "pickup"
      });
    }
  }

  for (const item of visible) {
    const dx = item.e.x - px;
    const dy = item.e.y - py;

    item.forward =
      dx * Math.cos(angle) +
      dy * Math.sin(angle);

    item.side =
      dy * Math.cos(angle) -
      dx * Math.sin(angle);
  }

  visible.sort(function (a, b) {
    return b.forward - a.forward;
  });

  for (const item of visible) {
    if (item.forward <= 0.1) {
      continue;
    }

    const cx =
      W / 2 +
      item.side / item.forward /
      Math.tan(FOV / 2) * W / 2;

    if (item.kind === "zombie") {
      const size = Math.min(
        230,
        Math.floor(H * 0.7 / item.forward)
      );

      if (
        cx + size / 2 < 0 ||
        cx - size / 2 > W
      ) {
        continue;
      }

      const top = Math.floor(
        H / 2 + H * 0.5 / item.forward - size
      );

      drawZombie(
        p,
        cx,
        top,
        size,
        depth,
        item.forward,
        Math.floor(gameMs / 350),
        gameMs < item.e.hurtUntil
      );
    } else {
      const size = Math.max(
        2,
        Math.min(
          64,
          Math.floor(H * 0.22 / item.forward)
        )
      );

      if (
        cx + size / 2 >= 0 &&
        cx - size / 2 < W
      ) {
        drawPickup(
          p,
          item.e,
          cx,
          size,
          depth,
          item.forward
        );
      }
    }
  }

  // Pistol
  const flash = gameMs < flashUntil;

  const gunY =
    97 +
    (reloading ? 16 : 0) +
    (flash ? 5 : 0);

  rect(p, 62, gunY + 20, 16, 17, "D");
  rect(p, 82, gunY + 20, 16, 17, "D");

  rect(p, 74, gunY + 13, 13, 26, "0");
  rect(p, 77, gunY + 17, 7, 19, "2");

  rect(p, 70, gunY + 5, 21, 15, "0");
  rect(p, 73, gunY + 7, 15, 10, "2");

  rect(p, 75, gunY, 11, 12, "0");
  rect(p, 78, gunY + 2, 5, 8, "1");
  rect(p, 78, gunY + 1, 5, 4, "0");

  rect(p, 79, gunY - 3, 3, 4, "2");

  if (flash) {
    rect(p, 77, gunY - 12, 7, 11, "6");
    rect(p, 74, gunY - 7, 13, 5, "6");
    rect(p, 79, gunY - 16, 3, 7, "7");
  }

  // Crosshair
  if (state === "playing") {
    rect(p, 77, 64, 7, 1, "7");
    rect(p, 80, 61, 1, 7, "7");
  }

  // Top HUD
  rect(p, 0, 0, 160, 10, "0");

  text(
    p,
    "L" + (levelIndex + 1) + "/5",
    3,
    3,
    "4"
  );

  text(
    p,
    "Z " + levelKills + "/" + LEVELS[levelIndex].total,
    42,
    3,
    "7"
  );

  text(p, timeText(gameMs), 116, 3, "6");

  if (gameMs < messageUntil) {
    rect(p, 0, 12, 160, 9, "0");
    centered(p, message, 14, "6");
  }

  // Bottom HUD
  rect(p, 0, 116, 160, 12, "0");

  rect(p, 3, 119, 42, 6, "2");

  rect(
    p,
    4,
    120,
    Math.floor(40 * health / 100),
    4,
    health > 30 ? "4" : "6"
  );

  for (let i = 0; i < ammo; i++) {
    rect(p, 55 + i * 4, 120, 2, 5, "6");
  }

  text(p, String(reserveAmmo), 110, 120, "2");
  text(p, String(health), 140, 120, "4");

  if (reloading) {
    rect(p, 64, 87, 33, 7, "0");
    text(p, "RELOAD", 69, 88, "6");

    const progress =
      1 - (reloadUntil - gameMs) / RELOAD_MS;

    rect(p, 66, 96, 28 * progress, 2, "6");
  }

  if (gameMs < hurtUntil) {
    rect(p, 0, 10, 2, 106, "3");
    rect(p, 158, 10, 2, 106, "3");
  }
}

// ============================================
// MENU DRAWING
// ============================================

function border(p, color = "4") {
  rect(p, 5, 5, 150, 2, color);
  rect(p, 5, 121, 150, 2, color);

  rect(p, 5, 5, 2, 118, "2");
  rect(p, 153, 5, 2, 118, "2");
}

function drawOptions(p, options, startY, step = 15) {
  for (let i = 0; i < options.length; i++) {
    const y = startY + i * step;
    const selected = i === menuIndex;

    if (selected) {
      rect(p, 18, y - 4, 124, 13, "2");
      rect(p, 20, y - 2, 120, 9, "0");
      text(p, ">", 25, y, "6");
    }

    centered(
      p,
      options[i],
      y,
      selected ? "7" : "2"
    );
  }
}

function drawMenu(p) {
  border(p);

  centered(p, "SPRIG3D", 22, "7", 2);
  centered(p, "ZOMBIZ", 41, "4", 2);
  centered(p, "5 LEVEL SURVIVAL", 57, "2");

  drawOptions(p, menuOptions(), 77);

  centered(p, "W/S SELECT  I ENTER", 110, "7");
}

function drawControls(p) {
  border(p);
  centered(p, "CONTROLS", 12, "7", 2);

  const lines = [
    "W/S MOVE",
    "A/D TURN",
    "J/L STRAFE",
    "I FIRE",
    "K RELOAD",
    "K+L PAUSE"
  ];

  for (let i = 0; i < lines.length; i++) {
    centered(
      p,
      lines[i],
      33 + i * 11,
      i === 5 ? "6" : "2"
    );
  }

  centered(p, "> BACK - I", 110, "7");
}

function drawEnd(p) {
  border(p, state === "dead" ? "6" : "4");

  let title;

  if (state === "victory") {
    title = "YOU SURVIVED";
  } else if (state === "clear") {
    title = "LEVEL CLEAR";
  } else {
    title = "YOU DIED";
  }

  centered(
    p,
    title,
    15,
    state === "dead" ? "6" : "4",
    2
  );

  centered(
    p,
    "LEVEL " + (levelIndex + 1) +
      " - " + LEVELS[levelIndex].name,
    32,
    "7"
  );

  centered(
    p,
    "KILLS " + kills + "/36  TIME " + timeText(gameMs),
    43,
    "2"
  );

  const accuracy = shots
    ? Math.round(hits / shots * 100)
    : 0;

  centered(
    p,
    "ACCURACY " + accuracy + "%  DEATHS " + deaths,
    53,
    "2"
  );

  if (state === "clear") {
    centered(p, "NEXT: HP BOOST +24 AMMO", 63, "6");
  }

  if (state === "dead") {
    centered(p, "RETRY RESTORES LEVEL KIT", 63, "6");
  }

  if (state === "victory") {
    centered(p, "CAMPAIGN COMPLETE", 63, "6");
  }

  drawOptions(p, menuOptions(), 80, 16);
  centered(p, "W/S SELECT  I ENTER", 111, "7");
}

function drawPause(p) {
  rect(p, 15, 28, 130, 79, "2");
  rect(p, 18, 31, 124, 73, "0");

  centered(p, "PAUSED", 39, "7", 2);
  drawOptions(p, menuOptions(), 65, 12);
}

// ============================================
// FRAMEBUFFER UPLOAD
// ============================================

function renderFrame() {
  const p = [];

  for (let y = 0; y < H; y++) {
    let background = "0";

    if (state === "playing" || state === "paused") {
      background = y < 64 ? "2" : "D";
    }

    p.push(new Array(W).fill(background));
  }

  if (state === "menu") {
    drawMenu(p);
  } else if (state === "controls") {
    drawControls(p);
  } else if (
    state === "dead" ||
    state === "clear" ||
    state === "victory"
  ) {
    drawEnd(p);
  } else {
    drawWorld(p);

    if (state === "paused") {
      drawPause(p);
    }
  }

  const legend = [];

  for (let ty = 0; ty < 8; ty++) {
    for (let tx = 0; tx < 10; tx++) {
      const bitmapRows = [];

      for (let ly = 0; ly < 16; ly++) {
        bitmapRows.push(
          p[ty * 16 + ly]
            .slice(tx * 16, tx * 16 + 16)
            .join("")
        );
      }

      legend.push([
        KEYS[ty * 10 + tx],
        bitmap`${bitmapRows.join("\n")}`
      ]);
    }
  }

  setLegend(...legend);
  setMap(screenMap);
}

// ============================================
// INPUT
// ============================================

onInput("w", function () {
  if (state === "playing") {
    move(0.22);
  } else {
    menuMove(-1);
  }
});

onInput("s", function () {
  if (state === "playing") {
    move(-0.22);
  } else {
    menuMove(1);
  }
});

onInput("a", function () {
  turn(-0.18);
});

onInput("d", function () {
  turn(0.18);
});

onInput("j", function () {
  move(-0.17, Math.PI / 2);
});

onInput("l", function () {
  comboKey("l");
});

onInput("k", function () {
  comboKey("k");
});

onInput("i", function () {
  if (state === "playing") {
    fire();
  } else {
    confirmMenu();
  }
});

// ============================================
// GAME LOOP
// ============================================

function tick() {
  const now = Date.now();
  const elapsed = Math.max(0, now - lastTick);

  lastTick = now;
  flushPending();

  if (state === "playing") {
    gameMs += elapsed;

    if (reloading && gameMs >= reloadUntil) {
      const loaded = Math.min(
        MAG_SIZE - ammo,
        reserveAmmo
      );

      ammo += loaded;
      reserveAmmo -= loaded;

      reloading = false;
      dirty = true;
    }

    collectPickups();

    aiElapsed += Math.min(250, elapsed);

    if (aiElapsed >= 100) {
      const dt = aiElapsed / 1000;

      aiElapsed = 0;
      updateAI(dt);
    }

    const frame = Math.floor(gameMs / 75);

    if (frame !== lastFrame) {
      lastFrame = frame;
      dirty = true;
    }
  }

  if (!dirty || busy) {
    return;
  }

  busy = true;
  dirty = false;

  try {
    renderFrame();
  } finally {
    busy = false;
  }
}

tick();
setInterval(tick, TICK_MS);