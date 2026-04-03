const player = "p";
const enemy = "e";
const bullet = "b";
const laser = "l";
const tripleUp = "t"; 
const bombUp = "x";   
const bg = "k";       

let state = "MENU"; 
let score = 0;
let wave = 0;
let bombs = 1;
let hasTripleShot = false;
let powerupTimer = 0;

setLegend(
  [ player, bitmap`
................
.......2........
......222.......
....2222222.....
.2222222222222..
..22222222222...
....2222222.....
......222.......
` ],
  [ enemy, bitmap`
................
.......4........
......444.......
....4444444.....
..44444444444...
....4444444.....
......444.......
.......4........
` ],
  [ bullet, bitmap`
................
................
......DDDD......
......DDDD......
................
................
................
................
................
................
................
................
................
................
................
................` ],
  [ laser, bitmap`
................
................
......7777......
......7777......
................
` ],
  [ tripleUp, bitmap`
.......5........
......555.......
.....55855......
......555.......
.......5........
` ],
  [ bombUp, bitmap`
.......3........
......333.......
.....33033......
......333.......
.......3........
` ],
  [ bg, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000L00000000000
0000000050000100
0000000000000000
0000000000000000
0000000000000000
0000000L00001000
0010000000000000
0000000000000000
0000000000000000
0000000000000000
000005000000L000
0000000000000000
0000000000000000` ]
);

// This ensures the starry background is always visible
setBackground(bg);

// Initialize a blank map
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
`);

// --- Collision Helper ---
function getSpriteAt(x, y, type) {
  if (x < 0 || x >= width() || y < 0 || y >= height()) return null;
  const t = getTile(x, y);
  return t ? t.find(s => s.type === type) : null;
}

function spawnWave() {
  wave++;
  for (let i = 0; i < 2 + wave; i++) {
    const rx = width() - 1 - Math.floor(Math.random() * 3);
    const ry = Math.floor(Math.random() * height());
    if (!getSpriteAt(rx, ry, enemy)) addSprite(rx, ry, enemy);
  }
}

function startGame() {
  getAll().forEach(s => s.remove());
  score = 0;
  wave = 0;
  bombs = 1;
  hasTripleShot = false;
  state = "PLAY";
  addSprite(2, 4, player);
  spawnWave();
}

// --- Console Inputs (W A S D | J K L) ---
onInput("w", () => { const p = getFirst(player); if (p && p.y > 0) p.y -= 1; });
onInput("s", () => { const p = getFirst(player); if (p && p.y < height() - 1) p.y += 1; });
onInput("a", () => { const p = getFirst(player); if (p && p.x > 0) p.x -= 1; });
onInput("d", () => { const p = getFirst(player); if (p && p.x < width() - 1) p.x += 1; });

onInput("j", () => {
  if (state === "MENU" || state === "OVER" || state === "HOWTO") {
    startGame();
  } else {
    const p = getFirst(player);
    if (p) {
      addSprite(p.x + 1, p.y, bullet);
      if (hasTripleShot) {
        if (p.y > 0) addSprite(p.x + 1, p.y - 1, bullet);
        if (p.y < height() - 1) addSprite(p.x + 1, p.y + 1, bullet);
      }
    }
  }
});

onInput("k", () => {
  if (state === "MENU") {
    state = "HOWTO";
  } else if (state === "PLAY" && bombs > 0) {
    bombs--;
    getAll(enemy).forEach(e => { score += 50; e.remove(); });
    getAll(laser).forEach(l => l.remove());
  }
});

// --- Main Engine ---
setInterval(() => {
  clearText();

  if (state === "MENU") {
    addText("STAR STRIKER", { x: 3, y: 2, color: color`5` });
    addText("J: START", { x: 5, y: 5, color: color`2` });
    addText("K: HOW TO", { x: 4, y: 7, color: color`2` });
    return;
  }

  if (state === "HOWTO") {
    addText("WASD: MOVE", { x: 3, y: 2, color: color`2` });
    addText("J: SHOOT", { x: 3, y: 4, color: color`2` });
    addText("K: BOMB", { x: 3, y: 6, color: color`3` });
    addText("J TO START", { x: 3, y: 9, color: color`5` });
    return;
  }

  if (state === "OVER") {
    addText("GAME OVER", { x: 4, y: 3, color: color`7` });
    addText(`SCORE: ${score}`, { x: 4, y: 5, color: color`3` });
    addText("J: RETRY", { x: 4, y: 8, color: color`2` });
    return;
  }

  // --- Play State Logic ---
  if (powerupTimer > 0) powerupTimer--;
  if (powerupTimer === 0) hasTripleShot = false;

  // Move Bullets
  getAll(bullet).forEach(b => {
    b.x += 1;
    if (b.x >= width()) { b.remove(); return; }
    const e = getSpriteAt(b.x, b.y, enemy);
    if (e) {
      if (Math.random() < 0.1) addSprite(e.x, e.y, tripleUp);
      else if (Math.random() < 0.05) addSprite(e.x, e.y, bombUp);
      e.remove(); b.remove(); score += 50;
    }
  });

  // Move Lasers
  getAll(laser).forEach(l => {
    l.x -= 1;
    if (l.x < 0) { l.remove(); return; }
    if (getSpriteAt(l.x, l.y, player)) {
      state = "OVER";
    }
  });

  // Collect Powerups
  getAll(tripleUp).forEach(u => {
    if (getSpriteAt(u.x, u.y, player)) { hasTripleShot = true; powerupTimer = 60; u.remove(); }
  });
  getAll(bombUp).forEach(x => {
    if (getSpriteAt(x.x, x.y, player)) { bombs++; x.remove(); }
  });

  // Enemy Movement & AI
  getAll(enemy).forEach(e => {
    if (Math.random() < 0.04) addSprite(e.x - 1, e.y, laser);
    if (Math.random() < 0.1) {
      const move = Math.random() > 0.5 ? 1 : -1;
      if (e.y + move >= 0 && e.y + move < height()) e.y += move;
    }
  });

  if (getAll(enemy).length === 0) spawnWave();

  // HUD
  addText(`S:${score} W:${wave} B:${bombs}`, { x: 0, y: 0, color: color`3` });

}, 130);