/*
@title: Doomed
@author: m5kro
@tags: [singleplayer, shooter]
@addedOn: 2024-07-24
*/
const playerUp = "u";
const playerDown = "d";
const playerLeft = "l";
const playerRight = "r";
const bulletUp = "b";
const bulletDown = "n";
const bulletLeft = "e";
const bulletRight = "f";
const wall = "w";
const demonUp = "m";
const demonDown = "o";
const demonLeft = "p";
const demonRight = "q";

let demonsKilled = 0;
let playerLives = 5;
let isGameOver = false; // Prevent player from breaking game over screen

setLegend(
  [playerUp, bitmap`
.........00.....
........0110....
........0110....
........0110....
....00000000....
...0555555550...
..055500005550..
.0D050LLLL050D0.
.0DD00000000DD0.
.0DDD0DDDD0DDD0.
.0DD0DDDDDD0DD0.
.0DD0DDDDDD0DD0.
.0DD0DDDDDD0DD0.
..0DD0DDDD0DD0..
...00DDDDDD00...
....00000000....`],
  [playerDown, bitmap`
....00000000....
...00DDDDDD00...
..0DD0DDDD0DD0..
.0DD0DDDDDD0DD0.
.0DD0DDDDDD0DD0.
.0DD0DDDDDD0DD0.
.0DDD0DDDD0DDD0.
.0DD00000000DD0.
.0D050LLLL050D0.
..055500005550..
...0555555550...
....00000000....
....0110........
....0110........
....0110........
.....00.........`],
  [playerLeft, bitmap`
................
.......000000...
......0DDDDDD0..
.....050DDDDDD0.
.00005550D000D00
0111055000DDD0D0
0111050L0DDDDDD0
.000050L0DDDDDD0
....050L0DDDDDD0
....050L0DDDDDD0
....055000DDD0D0
....05550D000D00
.....050DDDDDD0.
......0DDDDDD0..
.......000000...
................`],
  [playerRight, bitmap`
................
...000000.......
..0DDDDDD0......
.0DDDDDD050.....
00D000D05550....
0D0DDD000550....
0DDDDDD0L050....
0DDDDDD0L050....
0DDDDDD0L050000.
0DDDDDD0L0501110
0D0DDD0005501110
00D000D05550000.
.0DDDDDD050.....
..0DDDDDD0......
...000000.......
................`],
  [bulletUp, bitmap`
................
................
................
................
................
................
.........6......
.........6......
.........6......
................
................
................
................
................
................
................`],
  [bulletDown, bitmap`
................
................
................
................
................
................
................
......6.........
......6.........
......6.........
................
................
................
................
................
................`],
  [bulletLeft, bitmap`
................
................
................
................
................
................
......666.......
................
................
................
................
................
................
................
................
................`],
  [bulletRight, bitmap`
................
................
................
................
................
................
................
................
................
.......666......
................
................
................
................`],
  [wall, bitmap`
0000000000000000
3333003333333333
3333003333333333
3333003333333333
3333003333333333
3333003333333333
3333003333333333
0000000000000000
0000000000000000
3333333333003333
3333333333003333
3333333333003333
3333333333003333
3333333333003333
3333333333003333
0000000000000000`],
  [demonUp, bitmap`
......0..0......
..00.020020.00..
.03302200220330.
.03300000000330.
.03036300363030.
.00336300363300.
.03033033033030.
.03300333300330.
.00333000033300.
.03033333333030.
.03300000000330.
.03030333303030.
..033300003330..
...0303333030...
....00000000....
................`],
  [demonDown, bitmap`
................
....00000000....
...0303333030...
..033300003330..
.03030333303030.
.03300000000330.
.03033333333030.
.00333000033300.
.03300333300330.
.03033033033030.
.00336300363300.
.03036300363030.
.03300000000330.
.03302200220330.
..00.020020.00..
......0..0......`],
  [demonLeft, bitmap`
................
..0000000000....
.033303303330...
.0330303303030..
..0033303303330.
.02066303300300.
022033030303030.
.00000330303030.
.00000330303030.
022033030303030.
.02066303300300.
..0033303303330.
.0330303303030..
.033303303330...
..0000000000....
................`],
  [demonRight, bitmap`
................
....0000000000..
...033303303330.
..0303033030330.
.0333033033300..
.00300330366020.
.030303030330220
.03030303300000.
.03030303300000.
.030303030330220
.00300330366020.
.0333033033300..
..0303033030330.
...033303303330.
....0000000000..
................`]
);

setSolids([playerUp, playerDown, playerLeft, playerRight, wall, demonUp, demonDown, demonLeft, demonRight]);

let level = 0;
const levels = [
  map`
wwwwwwwwww
w........w
w........w
w........w
w........w
w........w
wu.......w
wwwwwwwwww`
];

// The Only Thing They Fear Is You - Mick Gordon (I tried)
const melody = tune`
315.7894736842105: E5/315.7894736842105,
315.7894736842105: E4/315.7894736842105,
315.7894736842105: E4/315.7894736842105,
315.7894736842105: E4/315.7894736842105,
315.7894736842105: D5/315.7894736842105,
315.7894736842105: F5/315.7894736842105,
315.7894736842105: D5/315.7894736842105,
315.7894736842105: E5/315.7894736842105,
315.7894736842105: E4/315.7894736842105,
315.7894736842105: E4/315.7894736842105,
315.7894736842105: E4/315.7894736842105,
315.7894736842105: F5/315.7894736842105,
315.7894736842105: D5/315.7894736842105,
315.7894736842105: E5/315.7894736842105,
315.7894736842105: E4/315.7894736842105,
315.7894736842105: E4/315.7894736842105,
315.7894736842105: E4/315.7894736842105,
315.7894736842105: D5/315.7894736842105,
315.7894736842105: F5/315.7894736842105,
315.7894736842105: D5/315.7894736842105,
315.7894736842105: E5/315.7894736842105,
315.7894736842105: E4/315.7894736842105,
315.7894736842105: E4/315.7894736842105,
315.7894736842105: D5/315.7894736842105,
315.7894736842105: E5/315.7894736842105,
315.7894736842105: D5/315.7894736842105,
315.7894736842105: E5/315.7894736842105,
315.7894736842105,
315.7894736842105: E5/315.7894736842105,
315.7894736842105: E5/315.7894736842105,
315.7894736842105: E5/315.7894736842105,
315.7894736842105-`

// The repeating melody will kill you before the demons will
const playbackMelody = playTune(melody, Infinity)

setMap(levels[level]);

setPushables({
  [playerUp]: [],
  [playerDown]: [],
  [playerLeft]: [],
  [playerRight]: []
});

let lastMoveTime = 0;
const moveCooldown = 300; // 0.3 seconds
const bulletSpeed = 100; // 0.1 seconds
let lastFireTime = 0;
const fireCooldown = 100; // 0.1 seconds

addText(`Demons killed:${demonsKilled}`, { 
  x: 1,
  y: 0,
  color: color`4`
});

addText(`Lives:${playerLives}`, {
  x: 1,
  y: 15,
  color: color`4`
});

function movePlayer(dx, dy) {
  // Limit movement speed
  const currentTime = Date.now();
  if (isGameOver || currentTime - lastMoveTime < moveCooldown) return;

  const player = getFirst(playerUp) || getFirst(playerDown) || getFirst(playerLeft) || getFirst(playerRight);

  if (player) {
    player.x += dx;
    player.y += dy;
    lastMoveTime = currentTime;
  }
}

function changeDirection(newDirection) {
  if (isGameOver) return;

  const player = getFirst(playerUp) || getFirst(playerDown) || getFirst(playerLeft) || getFirst(playerRight);

  if (player) {
    player.type = newDirection;
  }
}

function updateDemonsKilledText() {
  clearText();
  addText(`Demons killed:${demonsKilled}`, { 
    x: 1,
    y: 0,
    color: color`4`
  });
  
  addText(`Lives:${playerLives}`, {
    x: 1,
    y: 15,
    color: color`4`
  });
}

function fireBullet(bulletType, dx, dy) {
  // Limit to firing rate
  const currentTime = Date.now();
  if (isGameOver || currentTime - lastFireTime < fireCooldown) return;
  lastFireTime = currentTime;

  const player = getFirst(playerUp) || getFirst(playerDown) || getFirst(playerLeft) || getFirst(playerRight);

  if (player) {
    // Shooting sound effect
    const shot = tune`
42.857142857142854: C5/42.857142857142854,
1328.5714285714284`
    playTune(shot)
    
    const bulletX = player.x + dx;
    const bulletY = player.y + dy;

    // Check if there's a demon right in front of the player
    const initialTile = getTile(bulletX, bulletY);
    const demon = initialTile.find(sprite => sprite.type === demonUp || sprite.type === demonDown || sprite.type === demonLeft || sprite.type === demonRight);
    if (demon) {
      demon.remove();
      demonsKilled++;
      updateDemonsKilledText();
      return;
    }

    // Check if the initial position for the bullet is obstructed by a wall
    if (initialTile.some(sprite => sprite.type === wall)) return;

    addSprite(bulletX, bulletY, bulletType);

    const bulletTile = getTile(bulletX, bulletY);
    const bullet = bulletTile.find(sprite => sprite.type === bulletType);

    const moveBullet = setInterval(() => {
      bullet.x += dx;
      bullet.y += dy;

      // Check for collision with demons
      const tile = getTile(bullet.x, bullet.y);
      const demon = tile.find(sprite => sprite.type === demonUp || sprite.type === demonDown || sprite.type === demonLeft || sprite.type === demonRight);
      if (demon) {
        demon.remove();
        bullet.remove();
        clearInterval(moveBullet);
        demonsKilled++;
        updateDemonsKilledText();
        return;
      }

      // Stop moving bullet if it hits a wall or goes out of bounds
      if (tile.some(sprite => sprite.type === wall) || bullet.x < 0 || bullet.y < 0 || bullet.x >= width() || bullet.y >= height()) {
        clearInterval(moveBullet);
        bullet.remove();
      }
    }, bulletSpeed);
  }
}

function getRandomEmptyPosition() {
  const emptyPositions = [];
  const player = getFirst(playerUp) || getFirst(playerDown) || getFirst(playerLeft) || getFirst(playerRight);
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      const tile = getTile(x, y);
      const distanceToPlayer = Math.abs(x - player.x) + Math.abs(y - player.y);
      if (!tile.some(sprite => sprite.type === wall || sprite.type === playerUp || sprite.type === playerDown || sprite.type === playerLeft || sprite.type === playerRight || sprite.type === bulletUp || sprite.type === bulletDown || sprite.type === bulletLeft || sprite.type === bulletRight || sprite.type === demonUp || sprite.type === demonDown || sprite.type === demonLeft || sprite.type === demonRight) && distanceToPlayer > 1) {
        emptyPositions.push({ x, y });
      }
    }
  }
  if (emptyPositions.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * emptyPositions.length);
  return emptyPositions[randomIndex];
}

function spawnDemon() {
  const position = getRandomEmptyPosition();
  if (position) {
    const demonTypes = [demonUp, demonDown, demonLeft, demonRight];
    const randomDemonType = demonTypes[Math.floor(Math.random() * demonTypes.length)];
    addSprite(position.x, position.y, randomDemonType);
  }
}

function gameOver() {
  isGameOver = true;
  clearInterval(demonSpawnInterval);
  clearInterval(demonMoveInterval);
  clearInterval(increaseInterval);
  setTimeout(() => {
    clearText();
    const allSprites = getAll();
    allSprites.forEach(sprite => {
      if (sprite.type !== wall) {
        sprite.remove();
      }
    });
    addText("Game Over!", {
      x: 5,
      y: 3,
      color: color`4`
    });
    addText(`Demons Killed:${demonsKilled}`, {
      x: 2,
      y: 4,
      color: color`4`
    });

    let countdown = 10;
    const countdownInterval = setInterval(() => {
      clearText();
      addText("Game Over!", {
        x: 5,
        y: 3,
        color: color`4`
      });
      addText(`Demons Killed:${demonsKilled}`, {
        x: 2,
        y: 4,
        color: color`4`
      });
      addText(`Restarting in:${countdown}`, {
        x: 2,
        y: 6,
        color: color`4`
      });
      countdown--;
      if (countdown < 0) {
        clearInterval(countdownInterval);
        restartGame();
      }
    }, 1000);
  }, 100); // Add 100 milliseconds delay before clearing the screen
}

function restartGame() {
  isGameOver = false;
  clearText();
  demonsKilled = 0;
  playerLives = 5; // Reset lives
  demonSpawnRate = 3000; // Reset spawn rate
  setMap(levels[level]);
  setPushables({
    [playerUp]: [],
    [playerDown]: [],
    [playerLeft]: [],
    [playerRight]: []
  });

  addText(`Demons killed:${demonsKilled}`, { 
    x: 1,
    y: 0,
    color: color`4`
  });

  addText(`Lives:${playerLives}`, {
    x: 1,
    y: 15,
    color: color`4`
  });

  // Restart intervals
  demonSpawnInterval = setInterval(spawnDemon, demonSpawnRate);
  demonMoveInterval = setInterval(moveDemons, 800); // Move demons every 0.8 seconds
  increaseInterval = setInterval(increaseDemonSpawnRate, 15000); // Increase spawn rate every 15 seconds
}

let demonSpawnRate = 3000; // Start with 3 seconds
function increaseDemonSpawnRate() {
  demonSpawnRate /= 2; // Double the spawn rate >:)
  clearInterval(demonSpawnInterval);
  demonSpawnInterval = setInterval(spawnDemon, demonSpawnRate);
}

function moveDemons() {
  const demons = [...getAll(demonUp), ...getAll(demonDown), ...getAll(demonLeft), ...getAll(demonRight)];
  const player = getFirst(playerUp) || getFirst(playerDown) || getFirst(playerLeft) || getFirst(playerRight);

  if (!player) return;

  demons.forEach(demon => {
    const dx = Math.sign(player.x - demon.x);
    const dy = Math.sign(player.y - demon.y);
    const moveXFirst = Math.random() < 0.5;

    // Check for collision with player
    if ((demon.x + dx === player.x && demon.y === player.y) || (demon.x === player.x && demon.y + dy === player.y)) {
      // Ensure demon is facing player before damaging
      if ((demon.type === demonRight && dx > 0) || (demon.type === demonLeft && dx < 0) || (demon.type === demonDown && dy > 0) || (demon.type === demonUp && dy < 0)) {
        playerLives--;
        updateDemonsKilledText();
        if (playerLives <= 0) {
          gameOver();
        }
        return; // Stop demon's movement if collision occurs
      } else {
        if (dx > 0) {
          demon.type = demonRight;
        } else if (dx < 0) {
          demon.type = demonLeft;
        } else if (dy > 0) {
          demon.type = demonDown;
        } else if (dy < 0) {
          demon.type = demonUp;
        }
        return;
      }
    }

    if (moveXFirst && dx !== 0) {
      if (demon.type !== demonRight && dx > 0) {
        demon.type = demonRight;
      } else if (demon.type !== demonLeft && dx < 0) {
        demon.type = demonLeft;
      } else {
        demon.x += dx;
      }
    } else if (dy !== 0) {
      if (demon.type !== demonDown && dy > 0) {
        demon.type = demonDown;
      } else if (demon.type !== demonUp && dy < 0) {
        demon.type = demonUp;
      } else {
        demon.y += dy;
      }
    } else if (dx !== 0) {
      if (demon.type !== demonRight && dx > 0) {
        demon.type = demonRight;
      } else if (demon.type !== demonLeft && dx < 0) {
        demon.type = demonLeft;
      } else {
        demon.x += dx;
      }
    }
  });
}

let demonSpawnInterval = setInterval(spawnDemon, demonSpawnRate);
let demonMoveInterval = setInterval(moveDemons, 800); // Move demons every 0.8 seconds
let increaseInterval = setInterval(increaseDemonSpawnRate, 15000); // Increase spawn rate every 15 seconds

onInput("w", () => movePlayer(0, -1));
onInput("a", () => movePlayer(-1, 0));
onInput("s", () => movePlayer(0, 1));
onInput("d", () => movePlayer(1, 0));

onInput("i", () => {
  changeDirection(playerUp);
  fireBullet(bulletUp, 0, -1);
});
onInput("j", () => {
  changeDirection(playerLeft);
  fireBullet(bulletLeft, -1, 0);
});
onInput("k", () => {
  changeDirection(playerDown);
  fireBullet(bulletDown, 0, 1);
});
onInput("l", () => {
  changeDirection(playerRight);
  fireBullet(bulletRight, 1, 0);
});
