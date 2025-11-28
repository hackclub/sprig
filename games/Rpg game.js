/*
@title: rpg game
@description: You have to escape from a forest. You need to get the key and escape through the door.
@author: sami singh
@tags: ['puzzle']
@addedOn: 28/11/2025

Instructions:

Hit "run" to execute the code and
start the game (you can also press shift+enter).

the objective is to escape by getting the key and avoid the enemie
*/

const player = "p";
const enemy = "e";
const coin = "c";
const keyItem = "k";
const door = "d";
const wall = "w";
const ground = "g";
const spikes = "s";
const potion = "h";
const fastEnemy = "f";
const boss = "b";

setLegend(
  [player, bitmap`
................
......0000......
.....066660.....
....06666660....
....06622660....
....06666660....
....06666660....
.....066660.....
......2222......
......2222......
......2..2......
......2..2......
.....22..22.....
.....2....2.....
................
................`],
  [enemy, bitmap`
................
.......3........
......333.......
.....33333......
....3333333.....
...333333333....
...330333033....
...333333333....
....3333333.....
....3333333.....
.....33333......
....333.333.....
...33.....33....
..33.......33...
................
................`],
  [fastEnemy, bitmap`
................
.......9........
......999.......
.....99999......
....9999999.....
...999999999....
...990999099....
...999999999....
....9999999.....
....9999999.....
.....99999......
....999.999.....
...99.....99....
..99.......99...
................
................`],
  [boss, bitmap`
................
.....333333.....
....33333333....
...3333333333...
..333333333333..
..330333330333..
..333333333333..
...3333333333...
....33333333....
....33333333....
....33333333....
...333.33.333...
..333.....333...
.333.......333..
................
................`],
  [coin, bitmap`
................
................
.......66.......
......6666......
.....666666.....
....66666666....
....66666666....
....66666666....
.....666666.....
......6666......
.......66.......
................
................
................
................
................`],
  [keyItem, bitmap`
................
................
....66666.......
....66666.......
....66666.......
....666666666...
....666666666...
....66666.......
....66666.......
....66666.......
................
................
................
................
................
................`],
  [door, bitmap`
................
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
................
................`],
  [wall, bitmap`
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
1111111111111111`],
  [ground, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [spikes, bitmap`
................
................
................
................
................
................
................
................
.3.3.3.3.3.3.3.3
3333333333333333
3333333333333333
3333333333333333
................
................
................
................`],
  [potion, bitmap`
................
................
.......33.......
......3333......
......3333......
.....333333.....
....33333333....
....33333333....
....33333333....
....33333333....
.....333333.....
......3333......
................
................
................
................`]
);

let gameState = "menu";
let level = 0;
let score = 0;
let health = 3;
let maxHealth = 3;
let hasKey = false;
let enemyMoveCounter = 0;
let invincible = 0;
let coins = 0;

const levels = [
  map`
wwwwwwwwww
wp.c....cw
w.w.w.w..w
w...e...cw
w.wwww.w.w
w.c....ekw
w.......dw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpc..w...w
w.wwww.w.w
w.e..c..hw
www.wwwwcw
w.ce.e..kw
w.......dw
wwwwwwwwww`,
  map`
wwwwwwwwww
wp..e..c.w
w.wwwwww.w
w.c.e....w
wwww.www.w
wc.....ekw
ws.sss..dw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpc.www.hw
w.w...w.ew
w.f.w.c..w
wew.wwwwcw
w...e...kw
wss.sss.dw
wwwwwwwwww`,
  map`
wwwwwwwwww
wp..ewwc.w
ws.www.w.w
wc..f.e..w
wwwww.ww.w
wec.e..hkw
wsss.sssdw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpc.wfw.hw
w.wws.w..w
we..w.c.ew
www.www.ww
wcf.ee..kw
wsssssss.w
w.......dw
wwwwwwwwww`,
  map`
wwwwwwwwww
wp.fwwc.hw
wswww.we.w
wc..ssc.fw
wwwe.ww.ww
wcf.ee.ekw
wsssssssdw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpc.wfwchw
wsw.wsw.ww
wef.ssce.w
wwwwwww.ww
wcef.e..kw
wsssssssdw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpccwfwchw
wsw.wsw.ww
wef.sscefw
wwwwwwwbww
wcef.e..kw
wsssssssdw
wwwwwwwwww`
];

function showMenu() {
  clearText();
  addText("DUNGEON", { x: 4, y: 3, color: color`3` });
  addText("ESCAPE", { x: 5, y: 4, color: color`3` });
  addText("Press I", { x: 4, y: 7, color: color`6` });
  addText("to Start", { x: 4, y: 8, color: color`6` });
  addText("IJKL:Move", { x: 3, y: 10, color: color`5` });
  addText("Find Key", { x: 3, y: 11, color: color`5` });
  addText("Get Door!", { x: 3, y: 12, color: color`5` });
}

function showHUD() {
  clearText();
  let hearts = "";
  for (let i = 0; i < health; i++) {
    hearts = hearts + "H";
  }
  addText(hearts, { x: 0, y: 0, color: color`3` });
  addText("$:" + coins, { x: 6, y: 0, color: color`6` });
  addText("L:" + (level + 1), { x: 12, y: 0, color: color`5` });
  if (hasKey) {
    addText("KEY", { x: 0, y: 1, color: color`6` });
  }
  if (invincible > 0) {
    addText("SAFE", { x: 12, y: 1, color: color`7` });
  }
}

function startGame() {
  level = 0;
  score = 0;
  coins = 0;
  health = 3;
  maxHealth = 3;
  hasKey = false;
  invincible = 0;
  enemyMoveCounter = 0;
  gameState = "playing";
  setMap(levels[level]);
  setBackground(ground);
  setSolids([player, wall, door]);
  showHUD();
}

function moveEnemies() {
  const difficulty = level + 1;
  const moveFreq = Math.max(2, 5 - Math.floor(difficulty / 2));
  if (enemyMoveCounter % moveFreq !== 0) return;
  const pl = getFirst(player);
  if (!pl) return;
  const enemies = getAll(enemy);
  for (let i = 0; i < enemies.length; i++) {
    const en = enemies[i];
    const dx = pl.x - en.x;
    const dy = pl.y - en.y;
    const dist = Math.abs(dx) + Math.abs(dy);
    if (dist > 4) continue;
    if (Math.abs(dx) > Math.abs(dy)) {
      const newX = en.x + (dx > 0 ? 1 : -1);
      const targetTile = getTile(newX, en.y);
      let canMove = true;
      for (let j = 0; j < targetTile.length; j++) {
        const t = targetTile[j].type;
        if (t === wall || t === door || t === spikes) {
          canMove = false;
          break;
        }
      }
      if (canMove) en.x = newX;
    } else if (dy !== 0) {
      const newY = en.y + (dy > 0 ? 1 : -1);
      const targetTile = getTile(en.x, newY);
      let canMove = true;
      for (let j = 0; j < targetTile.length; j++) {
        const t = targetTile[j].type;
        if (t === wall || t === door || t === spikes) {
          canMove = false;
          break;
        }
      }
      if (canMove) en.y = newY;
    }
  }
  const fastEnemies = getAll(fastEnemy);
  for (let i = 0; i < fastEnemies.length; i++) {
    const en = fastEnemies[i];
    const dx = pl.x - en.x;
    const dy = pl.y - en.y;
    const dist = Math.abs(dx) + Math.abs(dy);
    if (dist > 5) continue;
    if (Math.abs(dx) > Math.abs(dy)) {
      const newX = en.x + (dx > 0 ? 1 : -1);
      const targetTile = getTile(newX, en.y);
      let canMove = true;
      for (let j = 0; j < targetTile.length; j++) {
        const t = targetTile[j].type;
        if (t === wall || t === door || t === spikes) {
          canMove = false;
          break;
        }
      }
      if (canMove) en.x = newX;
    } else if (dy !== 0) {
      const newY = en.y + (dy > 0 ? 1 : -1);
      const targetTile = getTile(en.x, newY);
      let canMove = true;
      for (let j = 0; j < targetTile.length; j++) {
        const t = targetTile[j].type;
        if (t === wall || t === door || t === spikes) {
          canMove = false;
          break;
        }
      }
      if (canMove) en.y = newY;
    }
  }
  const bosses = getAll(boss);
  for (let i = 0; i < bosses.length; i++) {
    const en = bosses[i];
    const dx = pl.x - en.x;
    const dy = pl.y - en.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      const newX = en.x + (dx > 0 ? 1 : -1);
      const targetTile = getTile(newX, en.y);
      let canMove = true;
      for (let j = 0; j < targetTile.length; j++) {
        const t = targetTile[j].type;
        if (t === wall || t === door) {
          canMove = false;
          break;
        }
      }
      if (canMove) en.x = newX;
    } else if (dy !== 0) {
      const newY = en.y + (dy > 0 ? 1 : -1);
      const targetTile = getTile(en.x, newY);
      let canMove = true;
      for (let j = 0; j < targetTile.length; j++) {
        const t = targetTile[j].type;
        if (t === wall || t === door) {
          canMove = false;
          break;
        }
      }
      if (canMove) en.y = newY;
    }
  }
}

function takeDamage() {
  if (invincible > 0) return;
  health = health - 1;
  playTune(tune`100: c4^100, 100: a3^100`);
  if (health > 0) {
    invincible = 8;
  } else {
    gameState = "gameover";
    clearText();
    addText("DEFEATED", { x: 3, y: 5, color: color`3` });
    addText("Coins:" + coins, { x: 3, y: 7, color: color`6` });
    addText("Level:" + (level + 1), { x: 3, y: 8, color: color`5` });
    addText("Press L", { x: 3, y: 10, color: color`5` });
    addText("Restart", { x: 3, y: 11, color: color`5` });
    playTune(tune`200: c5^200, 200: b4^200, 200: a4^200, 400: g4^400`);
  }
}

setMap(map`
wwwwwwwwww
w........w
w........w
w........w
w........w
w........w
wwwwwwwwww`);
setBackground(ground);
showMenu();

onInput("i", () => {
  if (gameState === "menu") {
    startGame();
    return;
  }
  if (gameState === "playing") getFirst(player).y -= 1;
});

onInput("k", () => {
  if (gameState === "playing") getFirst(player).y += 1;
});

onInput("j", () => {
  if (gameState === "playing") getFirst(player).x -= 1;
});

onInput("l", () => {
  if (gameState === "gameover" || gameState === "win") {
    gameState = "menu";
    showMenu();
    setMap(map`
wwwwwwwwww
w........w
w........w
w........w
w........w
w........w
wwwwwwwwww`);
    return;
  }
  if (gameState === "playing") getFirst(player).x += 1;
});

afterInput(() => {
  if (gameState !== "playing") return;
  enemyMoveCounter = enemyMoveCounter + 1;
  moveEnemies();
  showHUD();
  const pl = getFirst(player);
  if (!pl) return;
  tilesWith(coin).forEach(tile => {
    tile.forEach(sprite => {
      if (sprite.type === coin && sprite.x === pl.x && sprite.y === pl.y) {
        sprite.remove();
        coins = coins + 1;
        score = score + 10;
        playTune(tune`100: c5^100`);
      }
    });
  });
  tilesWith(keyItem).forEach(tile => {
    tile.forEach(sprite => {
      if (sprite.type === keyItem && sprite.x === pl.x && sprite.y === pl.y) {
        sprite.remove();
        hasKey = true;
        score = score + 50;
        playTune(tune`100: g5^100, 100: c6^100, 100: e6^100`);
      }
    });
  });
  tilesWith(potion).forEach(tile => {
    tile.forEach(sprite => {
      if (sprite.type === potion && sprite.x === pl.x && sprite.y === pl.y) {
        sprite.remove();
        health = Math.min(health + 1, maxHealth);
        playTune(tune`100: e5^100, 100: g5^100`);
      }
    });
  });
  tilesWith(spikes).forEach(tile => {
    tile.forEach(sprite => {
      if (sprite.type === spikes && sprite.x === pl.x && sprite.y === pl.y) {
        takeDamage();
      }
    });
  });
  tilesWith(enemy).forEach(tile => {
    tile.forEach(sprite => {
      if (sprite.type === enemy && sprite.x === pl.x && sprite.y === pl.y) {
        takeDamage();
      }
    });
  });
  tilesWith(fastEnemy).forEach(tile => {
    tile.forEach(sprite => {
      if (sprite.type === fastEnemy && sprite.x === pl.x && sprite.y === pl.y) {
        takeDamage();
      }
    });
  });
  tilesWith(boss).forEach(tile => {
    tile.forEach(sprite => {
      if (sprite.type === boss && sprite.x === pl.x && sprite.y === pl.y) {
        takeDamage();
      }
    });
  });
  tilesWith(door).forEach(tile => {
    tile.forEach(sprite => {
      if (sprite.type === door && sprite.x === pl.x && sprite.y === pl.y) {
        if (hasKey) {
          level = level + 1;
          if (level < levels.length) {
            hasKey = false;
            score = score + 100;
            enemyMoveCounter = 0;
            setMap(levels[level]);
            playTune(tune`200: c5^200, 200: e5^200, 200: g5^200, 200: c6^200`);
          } else {
            gameState = "win";
            clearText();
            addText("ESCAPED!", { x: 3, y: 5, color: color`6` });
            addText("Coins:" + coins, { x: 3, y: 7, color: color`6` });
            addText("You Win!", { x: 3, y: 8, color: color`5` });
            addText("Press L", { x: 3, y: 10, color: color`5` });
            addText("Restart", { x: 3, y: 11, color: color`5` });
            playTune(tune`500: c5^500, 500: e5^500, 500: g5^500, 1000: c6^1000`);
          }
        } else {
          playTune(tune`100: f4^100`);
        }
      }
    });
  });
  if (invincible > 0) invincible = invincible - 1;
});