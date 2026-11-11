/*
@title: Solar Odyssey
@author: Kristian dos Santos
@tags: ['shooter']
@addedOn: 2026-10-24
@description: A custom game called Solar Odyssey built for Sprig.

CONTROLS
  W A S D  move
  J (or I) shoot - auto-aims at the nearest enemy
  K        switch gun position (1 = straight shots, 2 = spread shots)
  L        start / go back to the title screen

POWER-UPS
  heart = extra life (only drops when you are hurt)
  star  = invincible for 15 seconds
  >>    = rapid fire for 15 seconds
  bomb  = hyper shell: a blast that wipes out every enemy on screen
*/

// Set to false if the sound editor complains about the tunes below.
const SOUND = true;

// COLOURS: Sprig colour keys. If a colour looks wrong, change its key here.
const CK = {};
CK["."] = ".";
CK["k"] = "0";   // black
CK["d"] = "L";   // dark grey
CK["s"] = "1";   // light grey
CK["w"] = "2";   // white
CK["r"] = "3";   // red
CK["y"] = "6";   // yellow
CK["g"] = "4";   // green
CK["b"] = "7";   // blue
CK["p"] = "H";   // purple
CK["o"] = "9";   // orange
CK["n"] = "C";   // brown

// Sprites are drawn as 8x8 patterns and doubled up to the 16x16 that Sprig needs.
function px(rows) {
  var out = [];
  for (var i = 0; i < rows.length; i++) {
    var line = "";
    for (var j = 0; j < rows[i].length; j++) {
      var c = CK[rows[i].charAt(j)];
      line = line + c + c;
    }
    out.push(line);
    out.push(line);
  }
  return out.join("\n");
}

function recolor(rows, pattern, to) {
  var out = [];
  for (var i = 0; i < rows.length; i++) {
    out.push(rows[i].replace(pattern, to));
  }
  return out;
}

function halfHeart(rows) {
  var out = [];
  for (var i = 0; i < rows.length; i++) {
    out.push(rows[i].slice(0, 4) + rows[i].slice(4).replace(/r/g, "d"));
  }
  return out;
}

const SHIP = ["...ww...", "...ww...", "..wssw..", "..wssw..", ".wssssw.", "ws.ss.sw", "w..rr..w", "...rr..."];
const HEART = [".rr..rr.", "rwrrrrrr", "rrrrrrrr", "rrrrrrrr", ".rrrrrr.", "..rrrr..", "...rr...", "........"];

setLegend(
  ["p", px(SHIP)],
  ["P", px(recolor(SHIP, /[ws]/g, "y"))],
  ["e", px(["b......b", ".b....b.", ".bbbbbb.", "bbwbbwbb", "bbkbbkbb", "bbbbbbbb", ".b.bb.b.", "b......b"])],
  ["r", px(["...rr...", "..rrrr..", ".rrrrrr.", ".rwrrwr.", ".rkrrkr.", ".rrrrrr.", ".r.rr.r.", "r..rr..r"])],
  ["B", px(["p..pp..p", ".pppppp.", "pppppppp", "pkkppkkp", "pkwppwkp", "pppppppp", ".pwwwwp.", "..p..p.."])],
  ["m", px(["..gggg..", ".gwkgkg.", "..gggg..", ".gggggg.", "gg.gg.gg", "g..gg..g", "..g..g..", "..n..n.."])],
  ["x", px(["..oooo..", ".oooooo.", "owwoowwo", "okkookko", "oooooooo", "ryyggbbp", ".o.oo.o.", "o.o..o.o"])],
  ["b", px(["........", "........", "...yy...", "..yyyy..", "..yyyy..", "...yy...", "........", "........"])],
  ["h", px(HEART)],
  ["s", px(["...yy...", "...yy...", "yyyyyyyy", ".yyyyyy.", "..yyyy..", ".yy..yy.", "yy....yy", "........"])],
  ["f", px([".b..b...", "..b..b..", "...b..b.", "....b..b", "...b..b.", "..b..b..", ".b..b...", "........"])],
  ["y", px(["....y.o.", ".....n..", "..dddd..", ".dssddd.", "dsddddkd", "ddddddkd", ".ddddkk.", "..dkkk.."])],
  ["H", px(HEART)],
  ["G", px(halfHeart(HEART))],
  ["g", px(recolor(HEART, /r/g, "d"))],
  ["o", px(["...yy...", ".o.yy.o.", "..oyyo..", "yyoyyoyy", "yyoyyoyy", "..oyyo..", ".o.yy.o.", "...yy..."])],
  ["O", px(["oooooooo", "oyyyyyyo", "oyoooyyo", "oyoooyyo", "oyyyyyyo", "oooooooo", "oooooooo", "oooooooo"])],
  ["z", px(["kkkkkkkk", "kkwkkkkk", "kkkkkkdk", "kkkkkkkk", "kdkkkkkk", "kkkkkwkk", "kkkkkkkk", "kkkdkkkk"])]
);

setBackground("z");
setMap("..........\n..........\n..........\n..........\n..........\n..........\n..........\n..........");

// SOUNDS (tiny placeholder tunes)
const T_SHOT = "40: C6^40,\n40: A5^40";
const T_BOOM = "60: E4/60,\n60: C4/60,\n60: A3/60";
const T_POWER = "80: C5~80,\n80: E5~80,\n80: G5~80";
const T_HURT = "100: A3^100,\n100: F3^100";

function sfx(t) {
  if (SOUND) {
    playTune(t);
  }
}

// ---------------------------------------------------------------------------
// GAME
// ---------------------------------------------------------------------------
const COLS = 10;
const ROWS = 8;   // row 0 is the HUD

function rnd(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}
function dist(a, b) {
  return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

// enemy stats (speed in tiles per tick, from the Scratch speeds)
const ET = {};
ET["e"] = { sp: 0.19, hp: 0, pts: 10 };
ET["r"] = { sp: 0.45, hp: 0, pts: 15 };
ET["B"] = { sp: 0.13, hp: 26, pts: 100 };
ET["m"] = { sp: 0.19, hp: 3, pts: 15 };
ET["x"] = { sp: 0.25, hp: 0, pts: 15 };

let state = "title";
let readyT = 0;
let deadT = 0;
let P = { x: 4, y: 4 };
let enemies = [];
let bullets = [];
let items = [];
let fx = [];
let hp = 6;
let score = 0;
let inv = false;
let blink = 0;
let starT = 0;
let rapidT = 0;
let gun = 1;
let side = 1;
let cd = 0;
let swCd = 0;
let facing = { x: 0, y: -1 };
let wait = 2;
let pct = 0.86;
let spawnT = 20;
let spawnLeft = 0;

function newGame() {
  P = { x: 4, y: 4 };
  enemies = [];
  bullets = [];
  items = [];
  fx = [];
  hp = 6;
  score = 0;
  inv = false;
  blink = 0;
  starT = 0;
  rapidT = 0;
  gun = 1;
  side = 1;
  cd = 0;
  swCd = 0;
  facing = { x: 0, y: -1 };
  wait = 2;
  pct = 0.86;
  spawnT = 20;
  spawnLeft = 0;
}

function step(dx, dy) {
  if (state !== "play") {
    return;
  }
  P.x = Math.max(0, Math.min(COLS - 1, P.x + dx));
  P.y = Math.max(1, Math.min(ROWS - 1, P.y + dy));
  facing = { x: dx, y: dy };
}

// Auto-aim
function shoot() {
  if (cd > 0) {
    return;
  }
  if (rapidT > 0) {
    cd = 1;
  } else {
    cd = 2;
  }
  side = -side;
  var dx = facing.x;
  var dy = facing.y;
  var best = 99;
  for (var i = 0; i < enemies.length; i++) {
    var e = enemies[i];
    var d = dist(e, P);
    var onScreen = e.x > -0.5 && e.x < COLS - 0.5 && e.y > 0.5 && e.y < ROWS - 0.5;
    if (d < best && onScreen) {
      best = d;
      dx = e.x - P.x;
      dy = e.y - P.y;
    }
  }
  var a = Math.atan2(dy, dx);
  if (gun === 2) {
    a = a + (25 * Math.PI / 180) * side;   // position 2 = spread shots
  }
  bullets.push({ x: P.x, y: P.y, vx: Math.cos(a) * 0.95, vy: Math.sin(a) * 0.95, dead: false });
  sfx(T_SHOT);
}

function spawn() {
  var k = "e";
  if (rnd(1, 22) === 1) {
    k = "B";
  } else if (rnd(1, 4) === 1) {
    k = "m";
  } else if (rnd(1, 6) === 1) {
    k = "r";
  } else if (rnd(1, 3) === 1) {
    k = "x";
  }
  var s = rnd(1, 4);
  var x = -1;
  var y = 0;
  if (s === 1) {
    x = rnd(0, 9);
    y = 0;
  } else if (s === 2) {
    x = rnd(0, 9);
    y = 8;
  } else if (s === 3) {
    x = -1;
    y = rnd(1, 7);
  } else {
    x = 10;
    y = rnd(1, 7);
  }
  enemies.push({ k: k, x: x, y: y, hp: ET[k].hp, cd: 0, t: 150, fl: 0, dx: 0, dy: 0, vx: 0, vy: 0, dead: false });
}

function boom(e) {
  fx.push({ type: "boom", x: e.x, y: e.y, t: 0, r: 0, dead: false });
  sfx(T_BOOM);
}

// drops: heart (only if hurt), star, rapid fire or hyper shell
function drop(e) {
  var k = "s";
  if (rnd(1, 2) === 1 && hp < 6) {
    k = "h";
  } else {
    var pick = rnd(0, 2);
    if (pick === 0) {
      k = "s";
    } else if (pick === 1) {
      k = "f";
    } else {
      k = "y";
    }
  }
  items.push({ x: Math.max(0, Math.min(COLS - 1, e.x)), y: Math.max(1, Math.min(ROWS - 1, e.y)), k: k, dead: false });
}

// hearts go down in halves; the boss takes a whole heart
function hit(big) {
  if (inv || state !== "play") {
    return;
  }
  var dies = false;
  if (big) {
    dies = hp < 3;
  } else {
    dies = hp === 1;
  }
  if (dies) {
    hp = 0;
    state = "dead";
    deadT = 0;
    sfx(T_HURT);
  } else {
    if (big) {
      hp = hp - 2;
    } else {
      hp = hp - 1;
    }
    inv = true;
    blink = 12;
    sfx(T_HURT);
  }
}

function findBlast() {
  for (var i = 0; i < fx.length; i++) {
    if (fx[i].type === "blast") {
      return fx[i];
    }
  }
  return null;
}

function updateEnemy(e, blast) {
  if (e.fl > 0) {
    e.x = e.x + e.vx;
    e.y = e.y + e.vy;
    e.fl = e.fl - 1;
    if (e.fl <= 0) {
      e.dead = true;
    }
    return;
  }
  var d = ET[e.k];
  var off = e.x < -0.5 || e.x > COLS - 0.5 || e.y < 0.5 || e.y > ROWS - 0.5;
  if (e.k !== "r" || off) {
    var ax = P.x - e.x;
    var ay = P.y - e.y;
    var m = Math.sqrt(ax * ax + ay * ay);
    if (m === 0) {
      m = 1;
    }
    e.dx = ax / m;
    e.dy = ay / m;
  }
  e.x = e.x + e.dx * d.sp;
  e.y = e.y + e.dy * d.sp;
  if (e.k === "r") {
    e.t = e.t - 1;
  }
  if (e.cd > 0) {
    e.cd = e.cd - 1;
  }
  var big = e.k === "B" || e.k === "m";
  var tb = false;
  for (var i = 0; i < bullets.length; i++) {
    var b = bullets[i];
    if (!b.dead && dist(b, e) < 0.7) {
      tb = true;
      b.dead = true;
    }
  }
  var th = dist(e, P) < 0.75;
  var thy = false;
  if (blast !== null && dist(e, blast) < blast.r) {
    thy = true;
  }

  // boss + guy have hit points and a short damage cooldown
  if (big && e.cd <= 0 && e.hp > 1 && (tb || th || thy)) {
    e.hp = e.hp - 1;
    if (th && !inv) {
      if (e.k === "B") {
        hit(true);
      } else {
        hit(false);
        e.hp = 1;
      }
    }
    e.cd = 1;
  }
  var dead = false;
  if (big) {
    dead = e.hp < 2;
  } else {
    dead = tb || th || thy || (e.k === "r" && e.t <= 0);
  }
  if (!dead) {
    return;
  }
  var starKill = (starT > 0 && th) || tb || thy;
  if (starKill) {
    score = score + d.pts;
    if (starT <= 0 || !th) {
      boom(e);
      if (e.k === "B" || (rnd(1, 6 + Math.round(16 / wait)) === 1 && blast === null)) {
        drop(e);
      }
    }
  } else if (!(e.k === "r" && e.t <= 0)) {
    hit(false);
    if (e.k === "r") {
      boom(e);
    }
  }
  if (th && starT > 0) {
    // kicked away by the star
    var kx = e.x - P.x;
    var ky = e.y - P.y;
    var km = Math.sqrt(kx * kx + ky * ky);
    if (km === 0) {
      km = 1;
    }
    e.fl = 8;
    e.vx = kx / km * 0.8;
    e.vy = ky / km * 0.8;
  } else {
    e.dead = true;
  }
}

function keepAlive() {
  var b2 = [];
  var i = 0;
  for (i = 0; i < bullets.length; i++) {
    if (!bullets[i].dead) {
      b2.push(bullets[i]);
    }
  }
  bullets = b2;
  var e2 = [];
  for (i = 0; i < enemies.length; i++) {
    if (!enemies[i].dead) {
      e2.push(enemies[i]);
    }
  }
  enemies = e2;
  var i2 = [];
  for (i = 0; i < items.length; i++) {
    if (!items[i].dead) {
      i2.push(items[i]);
    }
  }
  items = i2;
  var f2 = [];
  for (i = 0; i < fx.length; i++) {
    if (!fx[i].dead) {
      f2.push(fx[i]);
    }
  }
  fx = f2;
}

function tick() {
  if (state === "ready") {
    readyT = readyT - 1;
    if (readyT <= 0) {
      state = "play";
    }
    draw();
    return;
  }
  if (state === "dead") {
    deadT = deadT + 1;
    if (deadT > 25) {
      state = "over";
    }
    draw();
    return;
  }
  if (state !== "play") {
    draw();
    return;
  }

  if (cd > 0) {
    cd = cd - 1;
  }
  if (swCd > 0) {
    swCd = swCd - 1;
  }
  if (rapidT > 0) {
    rapidT = rapidT - 1;
    shoot();
  }
  if (starT > 0) {
    starT = starT - 1;
    if (starT === 0) {
      inv = false;
    }
  } else if (blink > 0) {
    blink = blink - 1;
    if (blink === 0) {
      inv = false;
    }
  }

  // enemy spawner: batches of 20/wait, then the wait time shrinks (same as the Scratch project)
  spawnT = spawnT - 1;
  if (spawnT <= 0) {
    if (spawnLeft <= 0) {
      spawnLeft = Math.max(1, Math.round(20 / wait));
    }
    if (enemies.length < 24) {
      spawn();
    }
    spawnLeft = spawnLeft - 1;
    spawnT = Math.round(wait * 10);
    if (spawnLeft <= 0) {
      wait = wait * pct;
      if (pct < 0.95) {
        pct = pct * 1.01;
      } else {
        pct = 0.95;
      }
    }
  }

  var i = 0;
  for (i = 0; i < bullets.length; i++) {
    var b = bullets[i];
    b.x = b.x + b.vx;
    b.y = b.y + b.vy;
    if (b.x < -1 || b.x > COLS || b.y < 0 || b.y > ROWS) {
      b.dead = true;
    }
  }

  var blast = findBlast();
  for (i = 0; i < enemies.length; i++) {
    updateEnemy(enemies[i], blast);
  }

  // power-ups wait on the floor until you touch them
  for (i = 0; i < items.length; i++) {
    var it = items[i];
    if (state === "play" && dist(it, P) < 0.8) {
      it.dead = true;
      sfx(T_POWER);
      if (it.k === "h") {
        hp = Math.min(6, hp + 2);
      } else if (it.k === "s") {
        starT = 150;
        inv = true;
      } else if (it.k === "f") {
        rapidT = 150;
      } else {
        fx.push({ type: "blast", x: it.x, y: it.y, t: 0, r: 1, dead: false });
      }
    }
  }

  // hyper shell: grows, then wipes whatever is left on screen
  if (blast !== null) {
    blast.t = blast.t + 1;
    blast.r = 1 + blast.t * 0.6;
    if (blast.t >= 16) {
      for (i = 0; i < enemies.length; i++) {
        var en = enemies[i];
        if (!en.dead && en.fl <= 0) {
          score = score + ET[en.k].pts;
          boom(en);
          en.dead = true;
        }
      }
      blast.dead = true;
    }
  }
  for (i = 0; i < fx.length; i++) {
    if (fx[i].type === "boom") {
      fx[i].t = fx[i].t + 1;
      if (fx[i].t > 3) {
        fx[i].dead = true;
      }
    }
  }

  keepAlive();
  draw();
}

// ---------------------------------------------------------------------------
// DRAWING (every tick we clear the sprites and place them again)
// ---------------------------------------------------------------------------
function put(x, y, k) {
  var gx = Math.round(x);
  var gy = Math.round(y);
  if (gx >= 0 && gx < COLS && gy >= 1 && gy < ROWS) {
    addSprite(gx, gy, k);
  }
}

function heartKey(i) {
  var left = hp - i * 2;
  if (left >= 2) {
    return "H";
  }
  if (left === 1) {
    return "G";
  }
  return "g";
}

function draw() {
  var all = getAll();
  for (var n = 0; n < all.length; n++) {
    all[n].remove();
  }
  clearText();

  if (state === "title") {
    addText("SOLAR ODYSSEY", { x: 4, y: 4, color: "2" });
    addText("Press L to play", { x: 3, y: 8, color: "6" });
    addText("W A S D  move", { x: 4, y: 11, color: "1" });
    addText("J shoot  K gun", { x: 4, y: 12, color: "1" });
    return;
  }

  for (var h = 0; h < 3; h++) {
    addSprite(h, 0, heartKey(h));
  }
  if (starT > 0) {
    addSprite(3, 0, "s");
  }
  if (rapidT > 0) {
    addSprite(4, 0, "f");
  }
  addText("" + score, { x: 13, y: 0, color: "2" });
  addText("GUN " + gun, { x: 13, y: 1, color: "1" });

  var i = 0;
  for (i = 0; i < items.length; i++) {
    put(items[i].x, items[i].y, items[i].k);
  }
  for (i = 0; i < bullets.length; i++) {
    put(bullets[i].x, bullets[i].y, "b");
  }
  for (i = 0; i < enemies.length; i++) {
    put(enemies[i].x, enemies[i].y, enemies[i].k);
  }
  for (i = 0; i < fx.length; i++) {
    var f = fx[i];
    if (f.type === "boom") {
      put(f.x, f.y, "o");
    } else {
      for (var x = 0; x < COLS; x++) {
        for (var y = 1; y < ROWS; y++) {
          var ring = Math.sqrt((x - f.x) * (x - f.x) + (y - f.y) * (y - f.y)) - f.r;
          if (Math.abs(ring) < 0.9) {
            addSprite(x, y, "O");
          }
        }
      }
    }
  }

  var hidden = false;
  if (blink > 0 && blink % 2 === 0) {
    hidden = true;
  }
  if (state === "dead" && (deadT % 2 === 0 || deadT > 20)) {
    hidden = true;
  }
  if (!hidden) {
    if (starT > 0) {
      put(P.x, P.y, "P");
    } else {
      put(P.x, P.y, "p");
    }
  }

  if (state === "ready") {
    addText("GET READY", { x: 5, y: 7, color: "2" });
  }
  if (state === "over") {
    addText("GAME OVER", { x: 5, y: 5, color: "3" });
    addText("Score " + score, { x: 5, y: 8, color: "2" });
    addText("Press L", { x: 6, y: 11, color: "6" });
  }
}

onInput("w", () => {
  step(0, -1);
});
onInput("s", () => {
  step(0, 1);
});
onInput("a", () => {
  step(-1, 0);
});
onInput("d", () => {
  step(1, 0);
});
onInput("j", () => {
  if (state === "play") {
    shoot();
  }
});
onInput("i", () => {
  if (state === "play") {
    shoot();
  }
});
onInput("k", () => {
  if (state === "play" && swCd <= 0) {
    if (gun === 1) {
      gun = 2;
    } else {
      gun = 1;
    }
    swCd = 3;
    sfx(T_POWER);
  }
});
onInput("l", () => {
  if (state === "title") {
    newGame();
    state = "ready";
    readyT = 22;
  } else if (state === "over") {
    state = "title";
  }
});

setInterval(tick, 100);
draw();
