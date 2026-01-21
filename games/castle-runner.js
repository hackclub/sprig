/*
@title: Castle Zombie Outbreak
@author: Your Name Here
@tags: []
@addedOn: 2025-01-07
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

About:
Explore a haunted castle infested with zombies! Fight your way through multiple rooms,
collect loot from chests, and survive the undead hordes. Manage your health carefully
and shoot zombies before they get too close!

How to play:
- WASD: Move your character
- I: Shoot up
- J: Shoot left
- K: Shoot down
- L: Shoot right
- Stand on chest for 2 seconds to open
- Clear all zombies to unlock the door
Survive all rooms and defeat the zombies to win!
*/

const player = "p";
const zombie = "z";
const shooterZombie = "s";
const bullet = "b";
const enemyBullet = "e";
const wall = "w";
const chest = "c";
const openChest = "o";
const door = "d";
const floor = "f";

setLegend(
  [player, bitmap`
................
................
.......66.......
......6776......
......6776......
.......66.......
......7777......
.....777777.....
......7777......
.......77.......
......7..7......
.....77..77.....
....77....77....
...77......77...
................
................`],
  [zombie, bitmap`
................
.......44.......
......4DD4......
......4DD4......
.....44DD44.....
......4444......
.....DDDDDD.....
....DD4444DD....
.....DDDDDD.....
......D..D......
.....DD..DD.....
....DD....DD....
...DD......DD...
..DD........DD..
................
................`],
  [shooterZombie, bitmap`
................
.......33.......
......3DD3......
......3DD3......
.....33DD33.....
......3333......
.....DDDDDD.....
....DD3333DD....
.....DDDDDD.....
......D99D......
.....DD99DD.....
....DD....DD....
...DD......DD...
..DD........DD..
................
................`],
  [bullet, bitmap`
................
................
................
................
................
................
.......99.......
.......99.......
................
................
................
................
................
................
................
................`],
  [enemyBullet, bitmap`
................
................
................
................
................
................
.......33.......
.......33.......
................
................
................
................
................
................
................
................`],
  [wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0LLLLLLLLLLLLLL0
0000000000000000
0LLLLLLLLLLLLLL0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0LLLLLLLLLLLLLL0`],
  [chest, bitmap`
................
................
................
................
...CCCCCCCCCC...
...C66666666C...
...C66666666C...
...C66666666C...
...CCCCCCCCCC...
...CCCCCCCCCC...
...C66666666C...
...C66666666C...
...CCCCCCCCCC...
................
................
................`],
  [openChest, bitmap`
................
...CCCCCCCCCC...
...C66666666C...
...C66666666C...
...CCCCCCCCCC...
................
................
................
...CCCCCCCCCC...
...CCCCCCCCCC...
...C66666666C...
...C66666666C...
...CCCCCCCCCC...
................
................
................`],
  [door, bitmap`
................
CCCCCCCCCCCCCCCC
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
CCCCCCCCCCCCCCCC
................`],
  [floor, bitmap`
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
1111111111111111`]
);

setPushables({
  [player]: [chest, openChest]
});

let level = 0;
let health = 5;
let maxHealth = 5;
let ammo = 20;
let score = 0;
let chestTimer = 0;
let chestX = -1;
let chestY = -1;
let gameOver = false;

const levels = [
  map`
wwwwwwwwww
wp.z...czw
w........w
w..c..z..w
w........w
w.z.s..z.w
w........w
w....c...w
w.......dw
wwwwwwwwww`,
  map`
wwwwwwwwww
wp......zw
w..z.....w
wz..c..s.w
w........w
w..z.s.z.w
w........w
wc..s..c.w
w.......dw
wwwwwwwwww`,
  map`
wwwwwwwwww
wp.z.s.z.w
w........w
w.c...c..w
w...z....w
ws.z..s.zw
w........w
wz..s..z.w
w.......dw
wwwwwwwwww`
];

function drawUI() {
  clearText();
  addText(`HP:${health}/${maxHealth}`, { x: 1, y: 1, color: color`3` });
  addText(`A:${ammo}`, { x: 1, y: 2, color: color`6` });
  addText(`Score:${score}`, { x: 1, y: 3, color: color`6` });
  addText(`Rm:${level + 1}/${levels.length}`, { x: 1, y: 4, color: color`2` });
  
  if (chestTimer > 0) {
    addText(`Opening: ${3 - chestTimer}s`, { x: 2, y: 8, color: color`4` });
  }
}

setMap(levels[level]);
drawUI();

// Movement
onInput("w", () => {
  if (gameOver) return;
  getFirst(player).y -= 1;
  resetChestTimer();
});

onInput("s", () => {
  if (gameOver) return;
  getFirst(player).y += 1;
  resetChestTimer();
});

onInput("a", () => {
  if (gameOver) return;
  getFirst(player).x -= 1;
  resetChestTimer();
});

onInput("d", () => {
  if (gameOver) return;
  getFirst(player).x += 1;
  resetChestTimer();
});

// Shooting
onInput("i", () => { if (!gameOver) shoot(0, -1); });
onInput("k", () => { if (!gameOver) shoot(0, 1); });
onInput("j", () => { if (!gameOver) shoot(-1, 0); });
onInput("l", () => { if (!gameOver) shoot(1, 0); });

function shoot(dx, dy) {
  if (ammo <= 0) return;
  
  ammo -= 1;
  drawUI();
  
  const p = getFirst(player);
  addSprite(p.x + dx, p.y + dy, bullet);
  
  moveBullet(p.x + dx, p.y + dy, dx, dy, bullet);
}

function moveBullet(x, y, dx, dy, bulletType) {
  setTimeout(() => {
    const bullets = getAll(bulletType).filter(b => b.x === x && b.y === y);
    if (bullets.length === 0) return;
    
    const b = bullets[0];
    const nextX = b.x + dx;
    const nextY = b.y + dy;
    
    // Check boundaries first
    if (nextX < 0 || nextX >= width() || nextY < 0 || nextY >= height()) {
      b.remove();
      return;
    }
    
    // Check wall collision
    const wallHit = getTile(nextX, nextY).some(s => s.type === wall);
    
    // Check enemy collision (player bullets hit zombies)
    if (bulletType === bullet) {
      const enemyHit = getTile(nextX, nextY).filter(s => 
        s.type === zombie || s.type === shooterZombie
      );
      
      if (wallHit) {
        b.remove();
        return;
      }
      
      if (enemyHit.length > 0) {
        enemyHit.forEach(z => z.remove());
        score += 10;
        b.remove();
        drawUI();
        checkAllZombiesDead();
        return;
      }
    }
    
    // Check player collision (enemy bullets hit player)
    if (bulletType === enemyBullet) {
      const p = getFirst(player);
      if (p && nextX === p.x && nextY === p.y) {
        takeDamage(1);
        b.remove();
        return;
      }
      if (wallHit) {
        b.remove();
        return;
      }
    }
    
    // Move bullet
    b.x = nextX;
    b.y = nextY;
    moveBullet(nextX, nextY, dx, dy, bulletType);
  }, 100);
}

function resetChestTimer() {
  chestTimer = 0;
  chestX = -1;
  chestY = -1;
  drawUI();
}

function checkChestOpening() {
  if (gameOver) return;
  
  const p = getFirst(player);
  if (!p) return;
  
  const tile = getTile(p.x, p.y);
  const hasChest = tile.some(s => s.type === chest);
  
  if (hasChest) {
    if (chestX === p.x && chestY === p.y) {
      chestTimer += 1;
      drawUI();
      
      if (chestTimer >= 3) {
        openChestAt(p.x, p.y);
        resetChestTimer();
      }
    } else {
      chestX = p.x;
      chestY = p.y;
      chestTimer = 0;
    }
  } else {
    resetChestTimer();
  }
}

function openChestAt(x, y) {
  const tile = getTile(x, y);
  tile.forEach(sprite => {
    if (sprite.type === chest) {
      sprite.remove();
      
      const reward = Math.random();
      let rewardText = "";
      
      if (reward < 0.3) {
        // Health pack
        health = Math.min(maxHealth, health + 2);
        rewardText = "Health +2!";
        clearText();
        addText(rewardText, { x: 4, y: 7, color: color`3` });
      } else if (reward < 0.7) {
        // Ammo
        ammo += 10;
        rewardText = "Ammo +10!";
        clearText();
        addText(rewardText, { x: 4, y: 7, color: color`6` });
      } else {
        // Max health upgrade
        maxHealth += 1;
        health = maxHealth;
        rewardText = "Max HP +1!";
        clearText();
        addText(rewardText, { x: 4, y: 7, color: color`4` });
      }
      
      setTimeout(() => {
        clearText();
        drawUI();
      }, 2000);
    }
  });
}

function checkDoor() {
  if (gameOver) return;
  
  const p = getFirst(player);
  if (!p) return;
  
  const tile = getTile(p.x, p.y);
  
  tile.forEach(sprite => {
    if (sprite.type === door) {
      const zombiesLeft = getAll(zombie).length + getAll(shooterZombie).length;
      if (zombiesLeft === 0) {
        nextLevel();
      } else {
        clearText();
        addText(`Kill ${zombiesLeft} more!`, { x: 2, y: 7, color: color`3` });
        setTimeout(() => {
          clearText();
          drawUI();
        }, 1500);
      }
    }
  });
}

function nextLevel() {
  level += 1;
  resetChestTimer();
  
  if (level < levels.length) {
    setMap(levels[level]);
    clearText();
    addText("Next Room!", { x: 3, y: 7, color: color`4` });
    setTimeout(() => {
      clearText();
      drawUI();
    }, 1500);
  } else {
    gameOver = true;
    clearText();
    addText("YOU WIN!", { x: 4, y: 6, color: color`4` });
    addText(`Score: ${score}`, { x: 3, y: 8, color: color`6` });
  }
}

function checkAllZombiesDead() {
  const zombiesLeft = getAll(zombie).length + getAll(shooterZombie).length;
  if (zombiesLeft === 0) {
    setSolids([player, wall]);
    clearText();
    addText("Door Unlocked!", { x: 2, y: 7, color: color`4` });
    setTimeout(() => {
      clearText();
      drawUI();
    }, 1500);
  }
}

function takeDamage(amount) {
  health -= amount;
  drawUI();
  
  if (health <= 0) {
    gameOver = true;
    clearText();
    addText("GAME OVER!", { x: 3, y: 6, color: color`3` });
    addText(`Score: ${score}`, { x: 3, y: 8, color: color`6` });
  }
}

// Zombie AI
setInterval(() => {
  if (gameOver) return;
  
  const zombies = getAll(zombie);
  const p = getFirst(player);
  
  if (!p) return;
  
  zombies.forEach(z => {
    // Move towards player
    const dx = p.x - z.x;
    const dy = p.y - z.y;
    
    // Check next position before moving
    let nextX = z.x;
    let nextY = z.y;
    
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) nextX = z.x + 1;
      else nextX = z.x - 1;
    } else {
      if (dy > 0) nextY = z.y + 1;
      else nextY = z.y - 1;
    }
    
    // Check if the next tile has a wall
    const hasWall = getTile(nextX, nextY).some(s => s.type === wall);
    
    if (!hasWall) {
      z.x = nextX;
      z.y = nextY;
    }
    
    // Check if touching player
    if (z.x === p.x && z.y === p.y) {
      takeDamage(1);
    }
  });
}, 800);

// Shooter Zombie AI
setInterval(() => {
  if (gameOver) return;
  
  const shooters = getAll(shooterZombie);
  const p = getFirst(player);
  
  if (!p) return;
  
  shooters.forEach(s => {
    const dx = p.x - s.x;
    const dy = p.y - s.y;
    const dist = Math.abs(dx) + Math.abs(dy);
    
    // If close enough, shoot at player
    if (dist < 5 && Math.random() < 0.3) {
      let shootDx = 0, shootDy = 0;
      if (Math.abs(dx) > Math.abs(dy)) {
        shootDx = dx > 0 ? 1 : -1;
      } else {
        shootDy = dy > 0 ? 1 : -1;
      }
      
      addSprite(s.x + shootDx, s.y + shootDy, enemyBullet);
      moveBullet(s.x + shootDx, s.y + shootDy, shootDx, shootDy, enemyBullet);
    } else {
      // Move towards player
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) s.x += 1;
        else s.x -= 1;
      } else {
        if (dy > 0) s.y += 1;
        else s.y -= 1;
      }
      
      // Check if touching player
      if (s.x === p.x && s.y === p.y) {
        takeDamage(1);
      }
    }
  });
}, 1000);

// Chest opening timer
setInterval(() => {
  checkChestOpening();
}, 1000);

afterInput(() => {
  if (!gameOver) {
    drawUI();
    checkDoor();
  }
});