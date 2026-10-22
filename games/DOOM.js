/*
@title: DOOM
@author: Satvik Hardat
@description: A Doom-style fake 3D raycaster shooter with enemies, ammo, HUD, minimap, and an exit goal.
@tags: ['action', 'shooter', 'raycaster']
@addedOn: 2026-06-10
*/


/*
  SPRIG DOOM - pushing the limits

  CONTROLS:
  W - Move Forward
  S - Move Backward
  A - Turn Left
  D - Turn Right
  I / J - Shoot

  Author: @satvikhardat (same name on hackclub slack)

  If someone can find a better implementation for this please FOR SURE let me know please

  bugs-
  I wasnt able to make the ammo sprite for now, you can see "A" in minimap for ammo it works, you get ammo but you dont see it in raycast
  enemy sprites are duped sometimes in rendering
  you cant tell beyond the minimap if the enemy is comming closer or not
  the textures are a bit too red but these are the only ones that atleast let us know whats going on
  sometimes enemies may no-clip and kill you
*/

const levelData = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 3, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 2, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const SKY = "s";
const FLOOR = "f";
const WALL_LIGHT = "w";
const WALL_DARK = "d";
const WALL_FAR = "r";
const GOAL = "g";
const ENEMY_CLOSE = "e";
const ENEMY_MID = "m";
const ENEMY_FAR = "n";
const GUN_L = "l";
const GUN_R = "q";
const FLASH_L = "h";
const FLASH_R = "k";

setLegend(
  [SKY, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],

  [FLOOR, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],

  [WALL_LIGHT, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],

  [WALL_DARK, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],

  [WALL_FAR, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],

  [GOAL, bitmap`
5757575757575757
7575757575757575
5757575757575757
7575757575757575
5757575757575757
7575757575757575
5757575757575757
7575757575757575
5757575757575757
7575757575757575
5757575757575757
7575757575757575
5757575757575757
7575757575757575
5757575757575757
7575757575757575`],

  [ENEMY_CLOSE, bitmap`
................
................
.....333333.....
....33333333....
....33033033....
....33333333....
.....333333.....
......3443......
.....344443.....
....33444433....
....33444433....
.....344443.....
.....33..33.....
....333..333....
................
................`],

  [ENEMY_MID, bitmap`
................
................
................
................
......3333......
.....330033.....
.....333333.....
......3443......
.....344443.....
.....344443.....
......3443......
......3..3......
................
................
................
................`],

  [ENEMY_FAR, bitmap`
................
................
................
................
................
................
.......33.......
......3003......
......3333......
.......44.......
......3443......
.......33.......
................
................
................
................`],

  [GUN_L, bitmap`
................
................
................
................
................
................
................
.........00.....
........000.....
.......0000.....
......00000.....
.....000000.....
....0000000.....
...00000000.....
..111111111.....
.2222222222.....`],

  [GUN_R, bitmap`
................
................
................
................
................
................
................
.....00.........
.....000........
.....0000.......
.....00000......
.....000000.....
.....0000000....
.....00000000...
.....111111111..
.....2222222222.`],

  [FLASH_L, bitmap`
................
................
................
................
.........7......
........777.....
.......77777....
......7777777...
.......77777....
........777.....
.........7......
................
................
................
................
................`],

  [FLASH_R, bitmap`
................
................
................
................
......7.........
.....777........
....77777.......
...7777777......
....77777.......
.....777........
......7.........
................
................
................
................
................`]
);

setSolids([]);

setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`);

let px = 1.5;
let py = 1.5;

let dirX = 1;
let dirY = 0;

let planeX = 0;
let planeY = 0.66;

let hp = 100;
let ammo = 25;

let isShooting = false;
let frameCount = 0;

let msg = "FIND GOAL";
let msgTimer = 60;

let enemies = [
  { x: 3.5, y: 1.5, hp: 100 },
  { x: 6.5, y: 5.5, hp: 100 },
  { x: 10.5, y: 8.5, hp: 100 },
  { x: 2.5, y: 8.5, hp: 100 },
  { x: 13.5, y: 3.5, hp: 100 },
  { x: 15.5, y: 8.5, hp: 100 }
];

function clearScreen() {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 10; x++) {
      clearTile(x, y);
    }
  }
}

function isWalkable(x, y) {
  const mx = Math.floor(x);
  const my = Math.floor(y);

  if (my < 0 || my >= levelData.length) return false;
  if (mx < 0 || mx >= levelData[0].length) return false;

  return (
    levelData[my][mx] === 0 ||
    levelData[my][mx] === 2 ||
    levelData[my][mx] === 3
  );
}

function render() {
  clearScreen();
  clearText();

  const screenW = 10;
  const screenH = 8;
  const pixelH = 128;
  const zBuffer = [];

  for (let x = 0; x < screenW; x++) {
    const cameraX = (2 * x) / screenW - 1;

    const rayDirX = dirX + planeX * cameraX;
    const rayDirY = dirY + planeY * cameraX;

    let mapX = Math.floor(px);
    let mapY = Math.floor(py);

    const deltaDistX = rayDirX === 0 ? 1e30 : Math.abs(1 / rayDirX);
    const deltaDistY = rayDirY === 0 ? 1e30 : Math.abs(1 / rayDirY);

    let sideDistX;
    let sideDistY;
    let stepX;
    let stepY;

    if (rayDirX < 0) {
      stepX = -1;
      sideDistX = (px - mapX) * deltaDistX;
    } else {
      stepX = 1;
      sideDistX = (mapX + 1 - px) * deltaDistX;
    }

    if (rayDirY < 0) {
      stepY = -1;
      sideDistY = (py - mapY) * deltaDistY;
    } else {
      stepY = 1;
      sideDistY = (mapY + 1 - py) * deltaDistY;
    }

    let hit = false;
    let side = 0;
    let hitGoal = false;
    let guard = 0;

    while (!hit && guard < 40) {
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX;
        mapX += stepX;
        side = 0;
      } else {
        sideDistY += deltaDistY;
        mapY += stepY;
        side = 1;
      }

      if (
        mapY < 0 ||
        mapY >= levelData.length ||
        mapX < 0 ||
        mapX >= levelData[0].length ||
        levelData[mapY][mapX] === 1 ||
        levelData[mapY][mapX] === 3
      ) {
        hit = true;

        if (
          mapY >= 0 &&
          mapY < levelData.length &&
          mapX >= 0 &&
          mapX < levelData[0].length &&
          levelData[mapY][mapX] === 3
        ) {
          hitGoal = true;
        }
      }

      guard++;
    }

    let perpWallDist;

    if (side === 0) {
      perpWallDist = sideDistX - deltaDistX;
    } else {
      perpWallDist = sideDistY - deltaDistY;
    }

    if (Number.isNaN(perpWallDist) || perpWallDist < 0.1) {
      perpWallDist = 0.1;
    }

    zBuffer[x] = perpWallDist;

    let lineHeight = Math.floor(pixelH / perpWallDist);

    if (lineHeight < 16) lineHeight = 16;
    if (lineHeight > 128) lineHeight = 128;

    let drawStart = Math.floor(-lineHeight / 2 + pixelH / 2);
    let drawEnd = Math.floor(lineHeight / 2 + pixelH / 2);

    if (drawStart < 0) drawStart = 0;
    if (drawEnd > 127) drawEnd = 127;

    const wallTile = hitGoal ? GOAL : side === 0 ? WALL_LIGHT : WALL_DARK;

    for (let ty = 0; ty < screenH; ty++) {
      const tileTop = ty * 16;
      const tileBottom = tileTop + 15;

      if (drawEnd < tileTop) {
        addSprite(x, ty, SKY);
      } else if (drawStart > tileBottom) {
        addSprite(x, ty, FLOOR);
      } else {
        if (perpWallDist > 6) {
          addSprite(x, ty, WALL_FAR);
        } else {
          addSprite(x, ty, wallTile);
        }
      }
    }
  }

  renderEnemies(zBuffer);
  renderWeapon();
  renderHud();
  renderMinimap();
}

function renderEnemies(zBuffer) {
  const screenW = 10;

  const visible = enemies
    .filter((en) => en.hp > 0)
    .map((en) => {
      const spriteX = en.x - px;
      const spriteY = en.y - py;

      const invDet = 1.0 / (planeX * dirY - dirX * planeY);

      const transformX = invDet * (dirY * spriteX - dirX * spriteY);
      const transformY = invDet * (-planeY * spriteX + planeX * spriteY);

      const screenX = Math.floor((screenW / 2) * (1 + transformX / transformY));

      return {
        enemy: en,
        x: screenX,
        depth: transformY
      };
    })
    .sort((a, b) => b.depth - a.depth);

  for (let i = 0; i < visible.length; i++) {
    const spr = visible[i];

    if (spr.depth <= 0) continue;
    if (spr.x < 0 || spr.x >= screenW) continue;
    if (spr.depth > 8) continue;

    let sprite = ENEMY_FAR;
    let row = 4;

    if (spr.depth < 2.2) {
      sprite = ENEMY_CLOSE;
      row = 3;
    } else if (spr.depth < 4.5) {
      sprite = ENEMY_MID;
      row = 4;
    } else {
      sprite = ENEMY_FAR;
      row = 4;
    }

    if (spr.depth < zBuffer[spr.x] + 0.9) {
      clearTile(spr.x, row);
      addSprite(spr.x, row, sprite);

      if (spr.depth < 2.2 && row + 1 < 8) {
        clearTile(spr.x, row + 1);
        addSprite(spr.x, row + 1, sprite);
      }
    }
  }
}

function renderWeapon() {
  if (isShooting && frameCount % 4 < 2) {
    addSprite(4, 5, FLASH_L);
    addSprite(5, 5, FLASH_R);
  }

  addSprite(4, 6, GUN_L);
  addSprite(5, 6, GUN_R);
  addSprite(4, 7, GUN_L);
  addSprite(5, 7, GUN_R);
}

function renderHud() {
  const aliveCount = enemies.filter((en) => en.hp > 0).length;

  addText("HP:" + hp, {
    x: 0,
    y: 0,
    color: color`3`
  });

  addText("AM:" + ammo, {
    x: 0,
    y: 1,
    color: color`6`
  });

  addText("EN:" + aliveCount, {
    x: 7,
    y: 0,
    color: color`4`
  });

  if (msgTimer > 0) {
    addText(msg, {
      x: 3,
      y: 3,
      color: color`7`
    });
  }
}

function renderMinimap() {
  const cx = Math.floor(px);
  const cy = Math.floor(py);

  for (let yy = -2; yy <= 2; yy++) {
    let line = "";

    for (let xx = -2; xx <= 2; xx++) {
      const mx = cx + xx;
      const my = cy + yy;

      if (mx === cx && my === cy) {
        line += "P";
      } else if (
        my < 0 ||
        my >= levelData.length ||
        mx < 0 ||
        mx >= levelData[0].length
      ) {
        line += "#";
      } else {
        let enemyHere = false;

        for (let i = 0; i < enemies.length; i++) {
          const en = enemies[i];

          if (
            en.hp > 0 &&
            Math.floor(en.x) === mx &&
            Math.floor(en.y) === my
          ) {
            enemyHere = true;
          }
        }

        if (enemyHere) {
          line += "E";
        } else if (levelData[my][mx] === 1) {
          line += "#";
        } else if (levelData[my][mx] === 2) {
          line += "A";
        } else if (levelData[my][mx] === 3) {
          line += "X";
        } else {
          line += ".";
        }
      }
    }

    addText(line, {
      x: 14,
      y: 2 + (yy + 2),
      color: color`2`
    });
  }
}

function collectTile() {
  const mx = Math.floor(px);
  const my = Math.floor(py);

  if (levelData[my][mx] === 2) {
    ammo += 10;
    levelData[my][mx] = 0;
    msg = "+10 AMMO";
    msgTimer = 25;
  }

  if (levelData[my][mx] === 3) {
    msg = "YOU WIN";
    msgTimer = 999;
  }
}

function move(step) {
  if (hp <= 0 || msg === "YOU WIN") return;

  const newX = px + dirX * step;
  const newY = py + dirY * step;

  if (isWalkable(newX, py)) {
    px = newX;
  }

  if (isWalkable(px, newY)) {
    py = newY;
  }

  collectTile();
  render();
}

function rotate(rot) {
  if (hp <= 0 || msg === "YOU WIN") return;

  const oldDirX = dirX;

  dirX = dirX * Math.cos(rot) - dirY * Math.sin(rot);
  dirY = oldDirX * Math.sin(rot) + dirY * Math.cos(rot);

  const oldPlaneX = planeX;

  planeX = planeX * Math.cos(rot) - planeY * Math.sin(rot);
  planeY = oldPlaneX * Math.sin(rot) + planeY * Math.cos(rot);

  render();
}

function shoot() {
  if (hp <= 0 || ammo <= 0 || isShooting || msg === "YOU WIN") return;

  ammo--;
  isShooting = true;

  let bestEnemy = null;
  let bestDist = 999;

  for (let i = 0; i < enemies.length; i++) {
    const en = enemies[i];

    if (en.hp <= 0) continue;

    const dx = en.x - px;
    const dy = en.y - py;

    const dist = Math.sqrt(dx * dx + dy * dy);

    const angleToEnemy = Math.atan2(dy, dx);
    const playerAngle = Math.atan2(dirY, dirX);

    let diff = angleToEnemy - playerAngle;

    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;

    if (Math.abs(diff) < 0.65 && dist < bestDist && dist < 8) {
      bestEnemy = en;
      bestDist = dist;
    }
  }

  if (bestEnemy) {
    bestEnemy.hp -= 50;

    if (bestEnemy.hp <= 0) {
      msg = "KILLED +5AM";
      msgTimer = 25;
      ammo += 5;
    }
  } else {
    msg = "MISS";
    msgTimer = 10;
  }

  render();

  setTimeout(() => {
    isShooting = false;
    render();
  }, 150);
}

function enemyTick() {
  if (hp <= 0 || msg === "YOU WIN") return;

  let needsRender = false;
  frameCount++;

  if (msgTimer > 0) {
    msgTimer--;
    needsRender = true;
  }

  for (let i = 0; i < enemies.length; i++) {
    const en = enemies[i];

    if (en.hp <= 0) continue;

    const dx = px - en.x;
    const dy = py - en.y;

    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 7 && dist > 0.75) {
      const moveX = (dx / dist) * 0.06;
      const moveY = (dy / dist) * 0.06;

      if (isWalkable(en.x + moveX, en.y)) {
        en.x += moveX;
      }

      if (isWalkable(en.x, en.y + moveY)) {
        en.y += moveY;
      }

      needsRender = true;
    }

    if (dist <= 0.75 && frameCount % 8 === 0) {
      hp -= 8;

      if (hp < 0) hp = 0;

      msg = "OUCH";
      msgTimer = 10;

      if (hp <= 0) {
        msg = "YOU DIED";
        msgTimer = 999;
      }

      needsRender = true;
    }
  }

  if (needsRender || isShooting) {
    render();
  }
}

onInput("w", () => move(0.35));
onInput("s", () => move(-0.35));
onInput("a", () => rotate(-0.2));
onInput("d", () => rotate(0.2));
onInput("i", shoot);
onInput("j", shoot);

setInterval(enemyTick, 120);

render();
