/*
@title: crypt of the sprig
@author: Ritmada
@description: A turn-based dungeon crawler RPG. Slay goblins, collect keys and potions, unlock doors, find the legendary broadsword, and defeat the dragon boss to escape with the Amulet!
@tags: ['rpg', 'adventure', 'puzzle']
@addedOn: 2026-11-08
*/

const p = "p"; // Cavaliere
const a = "a"; // Amuleto leggendario
const s = "s"; // Spada potenziata
const h = "h"; // Pozione cura
const k = "k"; // Chiave d'oro
const e = "e"; // Scale prossimo piano
const g = "g"; // Goblin
const b = "b"; // Drago Boss
const d = "d"; // Porta chiusa
const w = "w"; // Muro di pietra

setLegend(
  [ p, bitmap`
................
.....000000.....
....01111110....
...0112211110...
...0120021110...
...0120021110...
...0112211110...
....01111110....
....05555550.0..
...015555550060.
...015000050060.
...015555550060.
....05555550.0..
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
  {
    name: "FLOOR 1: CATACOMBS",
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
  {
    name: "FLOOR 2: THE ARMORY",
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
  {
    name: "FLOOR 3: DRAGON LAIR",
    map: map`
wwwwwwwwww
w.p....h.w
w........w
w...ww...w
w...wb...w
w...ww...w
w........w
wwwwwwwwww`
  }
];

let floorIndex = 0;
let hp = 10;
const maxHp = 10;
let keys = 0;
let atk = 1;
let gameState = "PLAY";
let statusMsg = "EXPLORE THE DUNGEON!";

function initGame() {
  floorIndex = 0;
  hp = maxHp;
  keys = 0;
  atk = 1;
  gameState = "PLAY";
  statusMsg = "EXPLORE THE DUNGEON!";
  loadFloor(0);
}

function loadFloor(idx) {
  floorIndex = idx;
  clearText();
  setMap(levels[idx].map);

  for (const gob of getAll(g)) {
    gob.hp = 2;
  }
  for (const dragon of getAll(b)) {
    dragon.hp = 6;
  }

  updateHUD();
}

function updateHUD() {
  clearText();
  if (gameState === "PLAY") {
    addText("HP:" + hp + "/" + maxHp + " K:" + keys + " ATK:" + atk, { x: 0, y: 0, color: color`7` });
    addText(statusMsg, { x: 0, y: 7, color: color`6` });
  } else if (gameState === "GAMEOVER") {
    addText("YOU DIED!", { x: 1, y: 3, color: color`3` });
    addText("PRESS J TO RETRY", { x: 0, y: 4, color: color`6` });
  } else if (gameState === "VICTORY") {
    addText("AMULET RECOVERED!", { x: 0, y: 3, color: color`4` });
    addText("YOU ESCAPED ALIVE!", { x: 0, y: 4, color: color`6` });
  }
}

function tryMove(dx, dy) {
  if (gameState !== "PLAY") return;

  const player = getFirst(p);
  if (!player) return;

  const tx = player.x + dx;
  const ty = player.y + dy;
  const targetTile = getTile(tx, ty);

  // 1. Muro
  if (targetTile.some(item => item.type === w)) {
    statusMsg = "BLOCKED BY WALL";
    updateHUD();
    return;
  }

  // 2. Porta chiusa
  const doorItem = targetTile.find(item => item.type === d);
  if (doorItem) {
    if (keys > 0) {
      keys--;
      doorItem.remove();
      playTune(doorTune);
      statusMsg = "DOOR UNLOCKED!";
      updateHUD();
    } else {
      statusMsg = "LOCKED! NEED A KEY";
      updateHUD();
    }
    return;
  }

  // 3. Combattimento a impatto
  const enemyItem = targetTile.find(item => item.type === g || item.type === b);
  if (enemyItem) {
    enemyItem.hp = (enemyItem.hp || (enemyItem.type === b ? 6 : 2)) - atk;

    if (enemyItem.hp <= 0) {
      if (enemyItem.type === b) {
        enemyItem.remove();
        addSprite(tx, ty, a);
        playTune(winTune);
        statusMsg = "BOSS SLAIN! AMULET REVEALED!";
      } else {
        enemyItem.remove();
        playTune(killTune);
        statusMsg = "SLAYED GOBLIN!";
      }
    } else {
      playTune(hitTune);
      const dmg = enemyItem.type === b ? 2 : 1;
      hp -= dmg;
      playTune(hurtTune);
      statusMsg = "HIT ENEMY! TOOK -" + dmg + " HP";

      if (hp <= 0) {
        hp = 0;
        gameState = "GAMEOVER";
        playTune(deathTune);
        updateHUD();
        return;
      }
    }

    runEnemyTurn();
    updateHUD();
    return;
  }

  // 4. Movimento del cavaliere
  player.x = tx;
  player.y = ty;

  // 5. Raccolta oggetti
  const pickups = getTile(player.x, player.y);
  for (const item of pickups) {
    if (item === player) continue;

    if (item.type === k) {
      keys++;
      item.remove();
      playTune(pickupTune);
      statusMsg = "FOUND GOLDEN KEY!";
    } else if (item.type === h) {
      hp = Math.min(maxHp, hp + 5);
      item.remove();
      playTune(healTune);
      statusMsg = "HEALED +5 HP!";
    } else if (item.type === s) {
      atk = 2;
      item.remove();
      playTune(swordTune);
      statusMsg = "FOUND BROADSWORD! ATK=2";
    } else if (item.type === e) {
      if (floorIndex + 1 < levels.length) {
        playTune(stairsTune);
        loadFloor(floorIndex + 1);
        statusMsg = "DESCENDED TO " + levels[floorIndex].name;
        updateHUD();
        return;
      }
    } else if (item.type === a) {
      gameState = "VICTORY";
      playTune(winTune);
      statusMsg = "AMULET RECOVERED! YOU WIN!";
      updateHUD();
      return;
    }
  }

  // 6. Turno nemici
  runEnemyTurn();
  updateHUD();
}

function runEnemyTurn() {
  const player = getFirst(p);
  if (!player || gameState !== "PLAY") return;

  const enemies = getAll(g).concat(getAll(b));
  for (const enemy of enemies) {
    const dist = Math.abs(enemy.x - player.x) + Math.abs(enemy.y - player.y);

    if (dist === 1) {
      const dmg = enemy.type === b ? 2 : 1;
      hp -= dmg;
      playTune(hurtTune);
      statusMsg = (enemy.type === b ? "BOSS" : "GOBLIN") + " ATTACKED! (-" + dmg + " HP)";

      if (hp <= 0) {
        hp = 0;
        gameState = "GAMEOVER";
        playTune(deathTune);
        return;
      }
    } else if (dist <= 3) {
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
    item.type === w || item.type === d || item.type === g || item.type === b || item.type === p
  );
}

onInput("w", () => tryMove(0, -1));
onInput("s", () => tryMove(0, 1));
onInput("a", () => tryMove(-1, 0));
onInput("d", () => tryMove(1, 0));

onInput("i", () => tryMove(0, -1));
onInput("k", () => tryMove(0, 1));

onInput("j", () => {
  if (gameState !== "PLAY") {
    initGame();
  } else {
    runEnemyTurn();
    statusMsg = "WAITED 1 TURN";
    updateHUD();
  }
});

onInput("l", () => {
  if (gameState === "PLAY") {
    runEnemyTurn();
    statusMsg = "WAITED 1 TURN";
    updateHUD();
  }
});

initGame();
