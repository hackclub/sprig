/*
@title: Fighting Hard
@description: Survive waves of monsters in the arena!
@tags: ['action']
@author: Ruhaan Anand
@addedOn: 2026-11-24
*/

const player = "p", enemy = "e", fast = "v", tank = "t", boss = "b", wall = "w", floor = "f", attack = "a", heart = "h", power = "u", ranged = "r", shot = "s", warning = "q", fire = "z", chest = "c";

const monsterArt = bitmap`
.....0....0.....
..33.00..00.33..
..333.0000.333..
...3333333333...
..333999933333..
.33333333333333.
.33203333203333.
.33203333203333.
.33333333333333.
.33302000033333.
..330000203333..
..333333333333..
...3333333333...
...333....333...
...000....000...
................`;

setLegend(
[attack, bitmap`
................
.......63.......
..3....36....6..
...6........3...
....6......6....
................
.66..........36.
366..........666
663..........666
.66..........63.
................
....6......6....
...3........3...
..6....36....6..
.......63.......
................`],
[player, bitmap`
................
.....000000.....
....07777770....
...0777777770...
...0711111170...
...0102002010...
...0111111110...
....07777770....
.....000000.....
...0555555550...
..055577775550..
..055577775550..
...0555555550...
....05500550....
....000..000....
................`],
[enemy, monsterArt],
[fast, bitmap`
................
.8............8.
.88..........88.
..888......888..
...8888888888...
..888888888888..
.88820888802888.
.88820888802888.
.88888888888888.
..888000088888..
..888888888888..
...8888888888...
....88....88....
...888....888...
..88........88..
................`],
[tank, bitmap`
................
..000......000..
..010000000010..
..011111111110..
.01119999911110.
.01111111111110.
.01920999902910.
.01920999902910.
.01111111111110.
.01110000011110.
.01111111111110.
..011111111110..
..011111111110..
..01110..01110..
..00000..00000..
................`],
[boss, bitmap`
00............00
030..........030
0330........0330
0333000000003330
.03333999933330.
0333996666993330
0333320330233330
0333320330233330
0333333333333330
0393300000033930
0393022222203930
0333000000033330
.03333333333330.
.03330....03330.
033330....033330
000000....000000`],
[ranged, bitmap`
.......88.......
......8888......
.....888888.....
....88008888....
...8882088888...
..888888888888..
..888888888888..
..880888880888..
..882888882888..
..888888888888..
...8888888888...
....88888888....
...88..88..88...
..88...88...88..
................
................`],
[shot, bitmap`
................
................
................
................
......8888......
.....866668.....
....86222268....
....86222268....
....86222268....
....86222268....
.....866668.....
......8888......
................
................
................
................`],
[warning, bitmap`
3.3.3.3.3.3.3.3.
................
3..............3
................
3..............3
.......66.......
3......66......3
.......66.......
3......66......3
................
3......66......3
.......66.......
3..............3
................
3..............3
.3.3.3.3.3.3.3.3`],
[fire, bitmap`
................
..3...6...3.....
..33..66..33....
..333666.333....
...33666333.....
..3336663333....
..33666663333...
.3336666663333..
.3366622666333..
.3366222266333..
..36622226633...
..3366666633....
...33333333.....
................
................
................`],
[heart, bitmap`
................
................
..333....333....
.33333..33333...
.333333333333...
.332333333333...
.333333333333...
..3333333333....
...33333333.....
....333333......
.....3333.......
......33........
................
................
................
................`],
[power, bitmap`
................
........66......
.......666......
......6666......
.....6666.......
....6666........
...666666666....
..666666666.....
......6666......
.....6666.......
....6666........
...6666.........
...66...........
..66............
................
................`],
[chest, bitmap`
................
................
................
...0000000000...
..099999999990..
.09966666699990.
.09999999999990.
.00000000000000.
.06666600666660.
.09999922999990.
.09999900999990.
.09999999999990.
.00000000000000.
................
................
................`],
[wall, bitmap`
0000000000000000
0111111011111110
0122221012222110
0121111012111110
0111111011111110
0111111011111110
0000000000000000
1110111111101111
1210122222101221
1110111111101111
1110111111101111
1110111111101111
0000000000000000
0111111011111110
0122221012222110
0000000000000000`],
[floor, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0111110111110110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111011111111110
0111111111101110
0111111111111110
0111111111111110
0111111111111110
0000000000000000`]
);

setBackground(floor);
setSolids([player, enemy, fast, tank, ranged, boss, wall]);

const slash = tune`
45: C5-45,
45: G4-45,
45: C4-45`;

const ko = tune`
65: E5~65,
65: G5~65,
100: C6~100`;

const hurt = tune`
120: G3-120,
160: C3-160`;

const pickup = tune`
70: C5~70,
70: E5~70,
70: G5~70,
100: C6~100`;

const blast = tune`
90: C4-90 + C5~90,
90: E4-90 + G5~90,
150: C3-150 + C6~150`;

const alarm = tune`
100: G4-80,
100: G4-80`;

const win = tune`
120: C5~120,
120: E5~120,
120: G5~120,
300: C6~300`;

const lose = tune`
200: G4~200,
200: E4~200,
200: C4~200,
400: C3~400`;

const music = tune`
130: A3-100 + A4~100,
130: E4~100,
130: A3-100 + C5~100,
130: E4~100,
130: A3-100 + E5~100,
130: G4~100,
130: E5~100,
130: C5~100,
130: F3-100 + A4~100,
130: C5~100,
130: F3-100 + E5~100,
130: C5~100,
130: G3-100 + B4~100,
130: D5~100,
130: G3-100 + G5~100,
130: E5~100`;

const bossMusic = tune`
100: C3-90 + C5~80,
100: G4~80,
100: C3-90 + C5~80,
100: D5~80,
100: C3-90 + E5~80,
100: G5~80,
100: E5~80,
100: D5~80,
100: G3-90 + G4~80,
100: C5~80,
100: G3-90 + D5~80,
100: E5~80,
100: C3-90 + G5~80,
100: E5~80,
100: D5~80,
100: C5~80`;

const arena = map`
wwwwwwwwww
w........w
w........w
w........w
w....p...w
w........w
w........w
w........w
wwwwwwwwww`;

let state = "title";
let wave = 1;
let hp = 5;
let maxHp = 5;
let score = 0;
let best = 0;
let kills = 0;
let charge = 0;
let combo = 0;
let comboTime = 0;
let damage = 1;
let cooldown = 0;
let dashWait = 0;
let dashRate = 18;
let shield = 0;
let boost = 0;
let tick = 0;
let faceX = 1;
let faceY = 0;
let pending = [];
let mobs = [];
let shots = [];
let hazards = [];
let fx = [];
let musicHandle = null;
let countdown = 0;
let endless = false;

function stopMusic() {
  if (musicHandle) musicHandle.end();
  musicHandle = null;
}

function playMusic() {
  stopMusic();
  musicHandle = playTune(
    wave % 5 === 0 ? bossMusic : music,
    Infinity
  );
}

function text(s, x, y, c) {
  addText(s, {x: x, y: y, color: c});
}

function title() {
  state = "title";
  setMap(arena);
  clearText();

  text("FIGHTING HARD", 3, 2, color`6`);
  text("K: START", 6, 11, color`7`);
  text("J HIT  L DASH", 3, 13, color`2`);
  text("I: ULTIMATE", 4, 14, color`2`);
}

function hud() {
  clearText();

  text("HP:" + hp + " W:" + wave, 0, 0, color`3`);
  text("S:" + score, 13, 0, color`6`);

  let b = mobs.find(m => m.type === boss);

  if (b) {
    text("BOSS:" + b.hp, 0, 15, color`3`);
  } else {
    text(
      combo > 1 ? "COMBO x" + combo : "ULT:" + charge + "/5",
      0, 15, color`6`
    );
  }

  text(dashWait ? "WAIT" : "DASH", 15, 15, color`7`);
}

function dist(a, b) {
  return Math.abs(a.x - b.x) +
         Math.abs(a.y - b.y);
}

function inside(x, y) {
  return x > 0 && y > 0 &&
         x < width() - 1 &&
         y < height() - 1;
}

function add(x, y, type) {
  addSprite(x, y, type);
  return getTile(x, y).find(s => s.type === type);
}

function free(min) {
  let p = getFirst(player);
  let spots = [];

  for (let x = 1; x < width() - 1; x++) {
    for (let y = 1; y < height() - 1; y++) {
      if (
        getTile(x, y).length === 0 &&
        dist(p, {x, y}) >= min
      ) {
        spots.push([x, y]);
      }
    }
  }

  return spots.length
    ? spots[Math.floor(Math.random() * spots.length)]
    : null;
}

function effect(x, y, type, time) {
  if (!inside(x, y)) return;
  if (getTile(x, y).some(s => s.type === type)) return;

  fx.push({
    s: add(x, y, type),
    time
  });
}

function resetArena() {
  setMap(arena);
  mobs = [];
  shots = [];
  hazards = [];
  fx = [];
  pending = [];
}

function start() {
  stopMusic();

  wave = 1;
  hp = maxHp = 5;
  score = kills = charge = combo = comboTime = 0;
  damage = 1;
  cooldown = dashWait = shield = boost = tick = 0;
  dashRate = 18;
  faceX = 1;
  faceY = 0;
  endless = false;

  beginWave();
}

function beginWave() {
  resetArena();

  state = "countdown";
  countdown = 20;
  tick = 0;
  cooldown = dashWait = shield = 0;
  combo = comboTime = 0;

  let n = Math.min(14, 3 + wave);

  if (wave % 5 === 0) {
    pending = [boss];
  } else {
    for (let i = 0; i < n; i++) {
      let pool =
        wave === 1 ? [enemy] :
        wave === 2 ? [enemy, fast] :
        wave === 3 ? [enemy, fast, ranged] :
        [enemy, fast, ranged, tank];

      pending.push(pool[i % pool.length]);
    }
  }

  if (wave > 1 && wave % 5 !== 0) {
    let s = free(3);
    if (s) add(s[0], s[1], chest);
  }

  playMusic();
}

function spawn(type) {
  let s = free(3);
  if (!s) return false;

  let hp =
    type === boss ? (wave >= 10 ? 24 : 15) :
    type === tank ? 3 :
    type === ranged ? 2 : 1;

  mobs.push({
    s: add(s[0], s[1], type),
    type,
    hp,
    max: hp,
    stun: 0,
    clock: 0,
    charge: null
  });

  effect(s[0], s[1], warning, 5);
  return true;
}

function collect() {
  let p = getFirst(player);

  for (let s of getTile(p.x, p.y).slice()) {
    if (s.type === heart) {
      hp = Math.min(maxHp, hp + 2);
      s.remove();
      playTune(pickup);
    }

    if (s.type === power) {
      boost = 80;
      s.remove();
      playTune(pickup);
    }

    if (s.type === chest) {
      s.remove();

      if (hp < maxHp) {
        hp = Math.min(maxHp, hp + 2);
      } else {
        boost = 100;
        charge = Math.min(5, charge + 2);
      }

      score += 25;
      best = Math.max(best, score);
      playTune(pickup);
    }
  }
}

function move(dx, dy) {
  if (state !== "playing") return;

  faceX = dx;
  faceY = dy;

  let p = getFirst(player);
  p.x += dx;
  p.y += dy;

  collect();
}

onInput("w", () => move(0, -1));
onInput("a", () => move(-1, 0));
onInput("s", () => move(0, 1));
onInput("d", () => move(1, 0));

function knock(m, p) {
  let dx = m.s.x - p.x;
  let dy = m.s.y - p.y;

  if (Math.abs(dx) >= Math.abs(dy)) {
    m.s.x += Math.sign(dx);
  } else {
    m.s.y += Math.sign(dy);
  }
}

function defeat(m) {
  let x = m.s.x;
  let y = m.s.y;

  m.s.remove();
  mobs = mobs.filter(a => a !== m);

  kills++;
  charge = Math.min(5, charge + 1);
  combo = comboTime ? Math.min(9, combo + 1) : 1;
  comboTime = 35;

  score += 10 * combo + (m.type === boss ? 100 : 0);
  best = Math.max(best, score);

  playTune(combo >= 4 ? pickup : ko);

  if (m.type === boss) {
    pending = [];

    for (let a of mobs) {
      a.s.remove();
    }

    mobs = [];
  } else if (kills % 4 === 0) {
    add(x, y, hp < maxHp ? heart : power);
  }
}

function strike(radius, amount) {
  let p = getFirst(player);

  for (let x = -radius; x <= radius; x++) {
    for (let y = -radius; y <= radius; y++) {
      if (Math.abs(x) + Math.abs(y) <= radius + 1) {
        effect(p.x + x, p.y + y, attack, 3);
      }
    }
  }

  for (let m of mobs.slice()) {
    if (!mobs.includes(m)) continue;

    if (
      Math.abs(m.s.x - p.x) <= radius &&
      Math.abs(m.s.y - p.y) <= radius &&
      dist(m.s, p) <= radius + 1
    ) {
      m.hp -= amount;
      m.stun = m.type === boss ? 2 : 5;

      if (m.hp <= 0) {
        defeat(m);
      } else {
        knock(m, p);
      }
    }
  }
}

onInput("j", () => {
  if (state === "upgrade") {
    choose(1);
    return;
  }

  if (state !== "playing" || cooldown) return;

  cooldown = 4;
  playTune(slash);

  strike(1, damage * (boost ? 2 : 1));
});

onInput("i", () => {
  if (state === "upgrade") {
    choose(0);
    return;
  }

  if (state !== "playing" || charge < 5) return;

  charge = 0;
  shield = Math.max(shield, 8);

  playTune(blast);
  strike(2, damage * 3);

  for (let s of shots) {
    s.s.remove();
  }

  shots = [];
});

onInput("l", () => {
  if (state === "upgrade") {
    choose(2);
    return;
  }

  if (state !== "playing" || dashWait) return;

  dashWait = dashRate;
  shield = Math.max(shield, 5);

  let p = getFirst(player);

  playTune(slash);

  for (let i = 0; i < 2; i++) {
    effect(p.x, p.y, attack, 2);

    p.x += faceX;
    p.y += faceY;

    collect();
  }
});

onInput("k", () => {
  if (state === "victory") {
    endless = true;
    wave++;
    beginWave();
  } else if (state === "title" || state === "ended") {
    start();
  }
});

function damagePlayer(n) {
  if (shield || state !== "playing") return;

  hp = Math.max(0, hp - n);
  shield = 12;
  combo = comboTime = 0;

  let p = getFirst(player);

  effect(p.x, p.y, fire, 3);
  playTune(hurt);

  if (!hp) finish(false);
}

function shoot(x, y, dx, dy) {
  if (!inside(x, y)) return;
  if (getTile(x, y).some(s => s.type === shot)) return;

  shots.push({
    s: add(x, y, shot),
    dx,
    dy
  });
}

function aim(m, p) {
  let dx = p.x - m.s.x;
  let dy = p.y - m.s.y;

  if (Math.abs(dx) >= Math.abs(dy)) {
    return [Math.sign(dx), 0];
  }

  return [0, Math.sign(dy)];
}

function step(m, dx, dy) {
  let x = m.s.x;
  let y = m.s.y;

  m.s.x += dx;
  m.s.y += dy;

  return m.s.x !== x || m.s.y !== y;
}

function chase(m, p, away = false) {
  let dx = p.x - m.s.x;
  let dy = p.y - m.s.y;
  let k = away ? -1 : 1;

  if (Math.abs(dx) >= Math.abs(dy)) {
    if (!step(m, k * Math.sign(dx), 0)) {
      step(m, 0, k * Math.sign(dy));
    }
  } else {
    if (!step(m, 0, k * Math.sign(dy))) {
      step(m, k * Math.sign(dx), 0);
    }
  }
}

function hazard(x, y) {
  if (!inside(x, y)) return;

  if (
    getTile(x, y).some(
      s => s.type === warning || s.type === fire
    )
  ) return;

  hazards.push({
    x,
    y,
    s: add(x, y, warning),
    time: 10,
    active: false
  });
}

function enemyTurn(m) {
  let p = getFirst(player);
  let d = dist(m.s, p);

  m.clock++;

  if (m.stun) {
    m.stun--;
    return;
  }

  if (m.type === boss) {
    let phase = m.hp <= m.max / 2;

    if (m.charge) {
      m.charge.time--;

      if (m.charge.time <= 0) {
        let a = m.charge;
        m.charge = null;

        for (let i = 0; i < 3; i++) {
          if (dist(m.s, p) === 1) {
            damagePlayer(2);
            break;
          }

          if (!step(m, a.dx, a.dy)) break;
        }
      }

      return;
    }

    if (m.clock % 45 === 0) {
      let a = aim(m, p);

      m.charge = {
        dx: a[0],
        dy: a[1],
        time: 6
      };

      for (let i = 1; i <= 3; i++) {
        hazard(
          m.s.x + a[0] * i,
          m.s.y + a[1] * i
        );
      }

      playTune(alarm);
      return;
    }

    if (m.clock % (phase ? 18 : 28) === 0) {
      for (let a of [[1,0], [-1,0], [0,1], [0,-1]]) {
        shoot(
          m.s.x + a[0],
          m.s.y + a[1],
          a[0],
          a[1]
        );
      }

      if (phase && mobs.length < 3) {
        spawn(fast);
      }
    }

    if (m.clock % (phase ? 4 : 6) !== 0) return;

  } else if (m.type === ranged) {
    if (m.clock % 18 === 0) {
      let a = aim(m, p);
      shoot(m.s.x, m.s.y, a[0], a[1]);
    }

    if (m.clock % 8 === 0) {
      if (d < 3) {
        chase(m, p, true);
      } else if (d > 4) {
        chase(m, p);
      }
    }

    return;

  } else {
    let speed =
      m.type === fast ? 3 :
      m.type === tank ? 9 :
      Math.max(4, 8 - Math.floor(wave / 2));

    if (m.clock % speed !== 0) return;
  }

  if (d === 1) {
    damagePlayer(m.type === boss ? 2 : 1);

    if (state === "playing") {
      knock(m, p);
    }
  } else {
    chase(m, p);
  }
}

function removeShot(a) {
  a.s.remove();
  shots = shots.filter(s => s !== a);
}

function updateShots() {
  if (tick % 2) return;

  let p = getFirst(player);

  for (let a of shots.slice()) {
    if (dist(a.s, p) === 0) {
      removeShot(a);
      damagePlayer(1);

      if (state !== "playing") return;
      continue;
    }

    let x = a.s.x + a.dx;
    let y = a.s.y + a.dy;

    if (!inside(x, y)) {
      removeShot(a);
      continue;
    }

    if (getTile(x, y).some(s => s.type === shot)) {
      removeShot(a);
      continue;
    }

    a.s.x = x;
    a.s.y = y;

    if (x === p.x && y === p.y) {
      removeShot(a);
      damagePlayer(1);

      if (state !== "playing") return;
    }
  }
}

function updateHazards() {
  let p = getFirst(player);

  for (let a of hazards.slice()) {
    a.time--;

    if (a.time <= 0) {
      a.s.remove();

      if (!a.active) {
        a.active = true;
        a.time = 5;
        a.s = add(a.x, a.y, fire);
      } else {
        hazards = hazards.filter(h => h !== a);
        continue;
      }
    }

    if (a.active && p.x === a.x && p.y === a.y) {
      damagePlayer(1);

      if (state !== "playing") return;
    }
  }
}

function upgrade() {
  state = "upgrade";

  stopMusic();
  resetArena();
  clearText();

  text("WAVE CLEARED!", 3, 2, color`6`);
  text("CHOOSE UPGRADE", 3, 4, color`2`);
  text("I: +1 DAMAGE", 3, 7, color`6`);
  text("J: +1 MAX HP", 3, 9, color`3`);
  text("L: QUICK DASH", 3, 11, color`7`);

  playTune(win);
}

function choose(n) {
  if (n === 0) damage++;

  if (n === 1) {
    maxHp++;
    hp = Math.min(maxHp, hp + 3);
  }

  if (n === 2) {
    dashRate = Math.max(6, dashRate - 4);
  }

  wave++;
  beginWave();
}

function finish(won) {
  state = won ? "victory" : "ended";

  stopMusic();
  resetArena();
  clearText();

  text(won ? "VICTORY!" : "GAME OVER", 5, 3, color`6`);
  text("SCORE: " + score, 3, 7, color`2`);
  text("BEST: " + best, 3, 9, color`7`);
  text(won ? "K: ENDLESS MODE" : "K: RETRY", 2, 13, color`4`);

  playTune(won ? win : lose);
}

setInterval(() => {
  if (state === "countdown") {
    countdown--;

    clearText();

    text("WAVE " + wave, 6, 5, color`6`);

    text(
      wave % 5 === 0 ? "BOSS INCOMING" : "GET READY",
      3, 8, color`3`
    );

    text(
      "" + Math.max(1, Math.ceil(countdown / 10)),
      9, 11, color`2`
    );

    if (countdown <= 0) {
      state = "playing";
      hud();
    }

    return;
  }

  if (state !== "playing") return;

  tick++;

  if (cooldown) cooldown--;
  if (dashWait) dashWait--;
  if (shield) shield--;
  if (boost) boost--;
  if (comboTime) comboTime--;
  if (!comboTime) combo = 0;

  for (let a of fx.slice()) {
    if (--a.time <= 0) {
      a.s.remove();
      fx = fx.filter(f => f !== a);
    }
  }

  if (
    pending.length &&
    mobs.length < Math.min(5, 2 + Math.floor(wave / 3)) &&
    tick % 8 === 0
  ) {
    if (spawn(pending[0])) {
      pending.shift();
    }
  }

  if (
    wave >= 4 &&
    tick % Math.max(18, 45 - wave * 2) === 0
  ) {
    let p = getFirst(player);
    let x = p.x;
    let y = p.y;

    hazard(x, y);

    if (wave >= 7) hazard(x + 1, y);
    if (wave >= 9) hazard(x, y + 1);

    playTune(alarm);
  }

  for (let m of mobs.slice()) {
    enemyTurn(m);

    if (state !== "playing") return;
  }

  updateShots();

  if (state !== "playing") return;

  updateHazards();

  if (state !== "playing") return;

  collect();

  if (!mobs.length && !pending.length) {
    if (wave === 10 && !endless) {
      finish(true);
    } else {
      upgrade();
    }

    return;
  }

  hud();
}, 100);

title();
