/*
@title: Crypt of the Sprig
@author: Matteo
@description: A 5-floor turn-based dungeon crawler. Slay goblins, loot potions and keys, unlock cell doors, upgrade to the enchanted blade, and defeat the dragon to claim the amulet!
@tags: ['rpg', 'adventure', 'dungeon']
*/

// tile legend keys
const slash = "z";   // sword slash fx (first in legend so it renders above entities)
const ps = "x";      // knight with glowing broadsword
const p = "p";       // base knight
const a = "a";       // amulet of yendor
const s = "s";       // pedestal broadsword
const h = "h";       // health potion
const k = "k";       // iron key
const e = "e";       // stairs to next floor
const g = "g";       // goblin
const b = "b";       // fire dragon
const d = "d";       // locked door
const w = "w";       // stone wall

setLegend(
  [ slash, bitmap`
..............20
............0270
..........02770.
........02770...
......02770.....
....02770.......
...0270.........
..0270..........
.0270...........
0270............
020.............
00..............
................
................
................
................` ],
  [ ps, bitmap`
..............0.
.............070
............0770
...........0770.
.....000000070..
....011111100...
...0112211110...
...0120021110...
...01200211106..
...011221111060.
....01111110060.
....05555550.0..
...015555550....
...015000050....
....011..110....
....00....00....` ],
  [ p, bitmap`
................
.....000000.....
....01111110....
...0112211110...
...0120021110...
...0120021110...
...0112211110...
....01111110....
....05555550....
...015555550....
...015000050....
...015555550....
....05555550....
....011..110....
....00....00....
................` ],
  [ a, bitmap`
................
.....000000.....
...0066666600...
..066000000660..
..060......060..
..060..00..060..
...00.0330.00...
.....033330.....
....03322330....
....03322330....
.....033330.....
......0330......
.......00.......
................
................
................` ],
  [ s, bitmap`
..............0.
.............070
............0770
...........0770.
..........0770..
.........0770...
........0770....
.......0770.....
..0...0770......
...000110.......
....06660.......
...0660660......
..060..060......
.00......00.....
................
................` ],
  [ h, bitmap`
................
......0990......
......0990......
.....002200.....
....02222220....
...0223333220...
...0233333320...
...0333333330...
...0332233330...
...0332233330...
...0333333330...
...0333333330...
....03333330....
.....000000.....
................
................` ],
  [ k, bitmap`
................
................
......0000......
.....066660.....
.....060060.....
.....060060.....
.....066660.....
......0660......
.......060......
.......06060....
.......06060....
.......060......
.......06060....
.......0660.....
........00......
................` ],
  [ e, bitmap`
0000000000000000
0111111111111110
0100000000000010
0101111111111010
0101000000001010
0101011111101010
0101010000101010
0101010111101010
0101010100101010
0101010100101010
0101010111101010
0101010000101010
0101011111101010
0101000000001010
0101111111111010
0000000000000000` ],
  [ g, bitmap`
................
.....00..00.....
....04400440....
....04444440....
...0443443440...
...0443443440...
...0444444440...
....04400440....
....00099000....
...0999999990...
...0909999090...
...0909999090...
....09999990....
....0L1..1L0....
....00....00....
................` ],
  [ b, bitmap`
...00......00...
..0330....0330..
..03330..03330..
...0333003330...
....03333330....
...0332332330...
...0330330330...
...0333003330...
..003333333300..
.09033333333090.
.09033000033090.
.09033333333090.
..003333333300..
...0330..0330...
...000....000...
................` ],
  [ d, bitmap`
0000000000000000
0999999999999990
0900000000000090
0901111111111090
0901999999991090
0901999999991090
0901999009991090
0901999009991090
0901999909991090
0901999999991090
0901999999991090
0901111111111090
0909999999990990
0999999999999990
0999999999999990
0000000000000000` ],
  [ w, bitmap`
0000000000000000
0111111011111110
01LLLL101LLLLL10
01LLLL101LLLLL10
0000000000000000
0111101111101110
01LL101LLL101L10
01LL101LLL101L10
0000000000000000
0111111011111110
01LLLL101LLLLL10
01LLLL101LLLLL10
0000000000000000
0111101111101110
01LL101LLL101L10
0000000000000000` ]
);

// sound effects
const hitTune = tune`70: e4~70, 70: c4~70`;
const killTune = tune`90: g4~90, 140: c5~140`;
const hurtTune = tune`100: c3~100, 140: a2~140`;
const pickupTune = tune`70: c5~70, 110: g5~110`;
const healTune = tune`90: e4~90, 90: g4~90, 130: c5~130`;
const doorTune = tune`90: d4~90, 130: f4~130`;
const swordTune = tune`90: c4~90, 90: e4~90, 90: g4~90, 180: c5~180`;
const stairsTune = tune`80: g4~80, 80: e4~80, 120: c4~120`;
const winTune = tune`120: c4~120, 120: e4~120, 120: g4~120, 120: c5~120, 260: e5~260`;
const deathTune = tune`140: f3~140, 140: e3~140, 220: c3~220`;

const levels = [
  // 1: The Catacombs (tutorial floor)
  {
    name: "Catacombs",
    map: map`
wwwwwwwwww
w.p...w..w
w..h..w.gw
w..d..w..w
wwww.www.w
w...k....w
w.......ew
wwwwwwwwww`
  },
  // 2: The Dungeon Cells
  {
    name: "Dungeon",
    map: map`
wwwwwwwwww
w.p..w.h.w
w..g.d...w
w.k..w.g.w
wwww.www.w
w.k..w...w
w.d.....ew
wwwwwwwwww`
  },
  // 3: The Armory (secret broadsword)
  {
    name: "Armory",
    map: map`
wwwwwwwwww
w.p.w..s.w
w...w..d.w
w.g.wwww.w
w...w..k.w
w.h.w.g..w
w.......ew
wwwwwwwwww`
  },
  // 4: The Shrine
  {
    name: "Shrine",
    map: map`
wwwwwwwwww
w.p....g.w
w.ww.www.w
w.h..w.k.w
wwww.w.d.w
w.g....g.w
w.h.....ew
wwwwwwwwww`
  },
  // 5: Dragon's Lair (boss arena)
  {
    name: "Dragon's Lair",
    map: map`
wwwwwwwwww
w.p....h.w
w........w
w..w..w..w
w....b...w
w..w..w..w
w........w
wwwwwwwwww`
  }
];

let floorIndex = 0;
let hp = 10;
const maxHp = 10;
let keys = 0;
let atk = 1;
let hasSword = false;
let gameState = "PLAY";
let facing = { dx: 1, dy: 0 };

function getPlayer() {
  return getFirst(ps) || getFirst(p);
}

function initGame() {
  floorIndex = 0;
  hp = maxHp;
  keys = 0;
  atk = 1;
  hasSword = false;
  gameState = "PLAY";
  loadFloor(0);
}

function loadFloor(idx) {
  floorIndex = idx;
  clearText();
  getAll(slash).forEach(sl => sl.remove());
  setMap(levels[idx].map);

  const player = getFirst(p);
  if (player && hasSword) {
    player.type = ps;
  }

  // set enemy health pools
  for (const gob of getAll(g)) {
    gob.hp = 2;
  }
  for (const dragon of getAll(b)) {
    dragon.hp = 4;
  }

  updateHUD();
}

function updateHUD() {
  clearText();
  if (gameState === "PLAY") {
    const boss = getFirst(b);
    let topText = "HP:" + hp + "/" + maxHp + " K:" + keys + " ATK:" + atk;
    if (boss) {
      topText += " DRAGON:" + boss.hp + "/4";
    }
    addText(topText, { x: 0, y: 0, color: color`7` });

    // only show control guide on floor 1 to keep screen clean
    if (floorIndex === 0) {
      addText("WASD:MOVE  K:ATTACK", { x: 0, y: 7, color: color`6` });
    }
  } else if (gameState === "GAMEOVER") {
    addText("YOU DIED!", { x: 0, y: 0, color: color`3` });
    addText("PRESS K TO RETRY", { x: 0, y: 7, color: color`6` });
  } else if (gameState === "VICTORY") {
    addText("AMULET SECURED!", { x: 0, y: 0, color: color`4` });
    addText("YOU ESCAPED! GG!", { x: 0, y: 7, color: color`6` });
  }
}

function tryMove(dx, dy) {
  if (gameState !== "PLAY") return;

  const player = getPlayer();
  if (!player) return;

  getAll(slash).forEach(sl => sl.remove());
  facing = { dx, dy };
  const tx = player.x + dx;
  const ty = player.y + dy;
  const targetTile = getTile(tx, ty);

  // solid walls
  if (targetTile.some(item => item.type === w)) {
    return;
  }

  // locked doors need keys
  const doorItem = targetTile.find(item => item.type === d);
  if (doorItem) {
    if (keys > 0) {
      keys--;
      doorItem.remove();
      playTune(doorTune);
      updateHUD();
    }
    return;
  }

  // bump into enemy -> triggers attack in that direction
  const enemyItem = targetTile.find(item => item.type === g || item.type === b);
  if (enemyItem) {
    doAttack();
    return;
  }

  // move hero
  player.x = tx;
  player.y = ty;

  // item interactions
  const pickups = getTile(player.x, player.y);
  for (const item of pickups) {
    if (item === player) continue;

    if (item.type === k) {
      keys++;
      item.remove();
      playTune(pickupTune);
    } else if (item.type === h) {
      hp = Math.min(maxHp, hp + 5);
      item.remove();
      playTune(healTune);
    } else if (item.type === s) {
      hasSword = true;
      atk = 2;
      player.type = ps;
      item.remove();
      playTune(swordTune);
    } else if (item.type === e) {
      if (floorIndex + 1 < levels.length) {
        playTune(stairsTune);
        loadFloor(floorIndex + 1);
        return;
      }
    } else if (item.type === a) {
      gameState = "VICTORY";
      playTune(winTune);
      updateHUD();
      return;
    }
  }

  runEnemyTurn();
  updateHUD();
}

function doAttack() {
  if (gameState !== "PLAY") {
    initGame();
    return;
  }

  const player = getPlayer();
  if (!player) return;

  getAll(slash).forEach(sl => sl.remove());

  // target directly in front first
  let tx = player.x + facing.dx;
  let ty = player.y + facing.dy;
  let targetTile = getTile(tx, ty);
  let enemy = targetTile.find(item => item.type === g || item.type === b);

  // auto-aim to adjacent enemies if facing empty tile
  if (!enemy) {
    const adj = [
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 }
    ];
    for (const dir of adj) {
      const tile = getTile(player.x + dir.dx, player.y + dir.dy);
      const found = tile.find(item => item.type === g || item.type === b);
      if (found) {
        enemy = found;
        tx = player.x + dir.dx;
        ty = player.y + dir.dy;
        facing = dir;
        break;
      }
    }
  }

  // sword slash animation
  if (tx >= 0 && tx < 10 && ty >= 0 && ty < 8) {
    addSprite(tx, ty, slash);
    setTimeout(() => {
      getAll(slash).forEach(s => s.remove());
    }, 120);
  }

  if (enemy) {
    enemy.hp = (enemy.hp || (enemy.type === b ? 4 : 2)) - atk;

    if (enemy.hp <= 0) {
      if (enemy.type === b) {
        enemy.remove();
        addSprite(tx, ty, a);
        playTune(winTune);
      } else {
        enemy.remove();
        playTune(killTune);
      }
    } else {
      playTune(hitTune);
    }
  } else {
    // missed swing audio
    playTune(hitTune);
  }

  runEnemyTurn();
  updateHUD();
}

function runEnemyTurn() {
  const player = getPlayer();
  if (!player || gameState !== "PLAY") return;

  const enemies = getAll(g).concat(getAll(b));
  for (const enemy of enemies) {
    const dist = Math.abs(enemy.x - player.x) + Math.abs(enemy.y - player.y);

    if (dist === 1) {
      // melee strike
      const dmg = enemy.type === b ? 2 : 1;
      hp -= dmg;
      playTune(hurtTune);

      if (hp <= 0) {
        hp = 0;
        gameState = "GAMEOVER";
        playTune(deathTune);
        return;
      }
    } else if (dist <= 3) {
      // aggro chase within 3 tiles
      const dx = Math.sign(player.x - enemy.x);
      const dy = Math.sign(player.y - enemy.y);

      let stepX = 0;
      let stepY = 0;

      if (Math.abs(player.x - enemy.x) >= Math.abs(player.y - enemy.y)) {
        if (dx !== 0 && canEnemyWalk(enemy.x + dx, enemy.y)) {
          stepX = dx;
        } else if (dy !== 0 && canEnemyWalk(enemy.x, enemy.y + dy)) {
          stepY = dy;
        }
      } else {
        if (dy !== 0 && canEnemyWalk(enemy.x, enemy.y + dy)) {
          stepY = dy;
        } else if (dx !== 0 && canEnemyWalk(enemy.x + dx, enemy.y)) {
          stepX = dx;
        }
      }

      if (stepX !== 0 || stepY !== 0) {
        enemy.x += stepX;
        enemy.y += stepY;
      }
    }
  }
}

function canEnemyWalk(x, y) {
  const tile = getTile(x, y);
  return !tile.some(item => 
    item.type === w || item.type === d || item.type === g || item.type === b || item.type === p || item.type === ps
  );
}

// movement inputs
onInput("w", () => tryMove(0, -1));
onInput("s", () => tryMove(0, 1));
onInput("a", () => tryMove(-1, 0));
onInput("d", () => tryMove(1, 0));

// attack buttons (mapped to both K and J for handheld comfort)
onInput("k", () => doAttack());
onInput("j", () => doAttack());

// wait / rest turn
onInput("l", () => {
  if (gameState === "PLAY") {
    runEnemyTurn();
    updateHUD();
  } else {
    initGame();
  }
});

// alternative d-pad up
onInput("i", () => tryMove(0, -1));

initGame();