/*
@title: Doomed
@author: m5kro
@tags: ['action']
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
const door = "j";
const ground = "g";
const bossDoor1 = "z";
const bossDoor2 = "y";
const bossDoor3 = "x";
const bossDoor4 = "t";
const fireballUp = "a";
const fireballDown = "c";
const fireballLeft = "h";
const fireballRight = "v";
const demonBUP = "i";
const demonBDown = "k";
const demonBLeft = "s";
const demonBRight = "]";
const bossUp = "[";
const bossDown = "{";
const bossLeft = "}";
const bossRight = "<";

let score = 0;
let playerLives = 5;
let bossHP = 15;
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
.......666......
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
  [ground, bitmap`
1111111001111111
1111110LL0111111
111110LLLL011111
11110LLLLLL01111
1110LLLLLLLL0111
110LLLLLLLLLL011
10LLLLLLLLLLLL01
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
10LLLLLLLLLLLL01
110LLLLLLLLLL011
1110LLLLLLLL0111
11110LLLLLL01111
111110LLLL011111
1111110LL0111111
1111111001111111`],
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
................`],
  [door, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0LLLL100001LLLL0
0LLL01000010LLL0
0LL1010000101LL0
0L010100001010L0
0L010100001010L0
0L010100001010L0
0L010100001010L0
0L010100001010L0
0L010100001010L0
0L010100001010L0
0L010100001010L0
0L010100001010L0
0L010100001010L0
0000000000000000`],
  [bossDoor1, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0L222LLLLLLLLLLL
023232LL01100110
0L222LL001100110
0L222L1001100110
0LLLL11001100110
0LLL011001130110
0LL0011001133110
0LL0011001100110
0LL0011001100110
0LL0011001100110
0LL0011001100110
0LL0011001100110
0LL0011001100110
0LL0011001100110`],
  [bossDoor2, bitmap`
0000000000000000
LLLLLLLLLLLLLLL0
LLLLLLLLLLL222L0
01100110LL232320
011001100LL222L0
0110011001L222L0
01100110011LLLL0
011031100110LLL0
0113311001100LL0
0110011001100LL0
0110011001100LL0
0110011001100LL0
0110011001100LL0
0110011001100LL0
0110011001100LL0
0110011001100LL0`],
  [bossDoor3, bitmap`
0LL0011000000110
0LL0011003330110
0LL0011030000110
0LL0011033330110
0LL0011030000110
0LL0011033330110
0LL0011030000110
0LL0011003330110
0LL0011000000110
0LL0011001100110
0LL0011001100110
0LL0011001100110
0LL0011001100110
0LL0011001100110
0LL0011001100110
0000000000000000`],
  [bossDoor4, bitmap`
0110000001100LL0
0110333001100LL0
0110000301100LL0
0110333301100LL0
0110000301100LL0
0110333301100LL0
0110000301100LL0
0110333001100LL0
0110000001100LL0
0110011001100LL0
0110011001100LL0
0110011001100LL0
0110011001100LL0
0110011001100LL0
0110011001100LL0
0000000000000000`],
  [fireballUp, bitmap`
......9999......
.....996699.....
....39666693....
...3966226693...
...3962222693...
...3962222693...
...3962222693...
...3962222693...
....39622693....
.....396693.....
.....396693.....
.....396693.....
......3993......
......3993......
.......33.......
.......33.......`],
  [fireballDown, bitmap`
.......33.......
.......33.......
......3993......
......3993......
.....396693.....
.....396693.....
.....396693.....
....39622693....
...3962222693...
...3962222693...
...3962222693...
...3962222693...
...3966226693...
....39666693....
.....996699.....
......9999......`],
  [fireballLeft, bitmap`
................
................
................
...33333........
..3999993.......
.99666669333....
99662222699933..
9662222226669933
9662222226669933
99662222699933..
.99666669333....
..3999993.......
...33333........
................
................
................`],
  [fireballRight, bitmap`
................
................
................
........33333...
.......3999993..
....33396666699.
..33999622226699
3399666222222669
3399666222222669
..33999622226699
....33396666699.
.......3999993..
........33333...
................
................
................`],
  [demonBUP, bitmap`
..000000000000..
...0LLLLLLLL0...
....0LLLLLL0....
....0LLLLLL0....
...030LLLL030...
..03600LL00630..
.0L0009009000L0.
.0LL09900990LL0.
.0L0990990990L0.
.00990099009900.
.0090L0990L0900.
.000LL0990LL000.
..0LLL0990LLL0..
...0LL0990LL0...
....00000000....
................`],
  [demonBDown, bitmap`
................
....00000000....
...0LL0990LL0...
..0LLL0990LLL0..
.000LL0990LL000.
.0090L0990L0900.
.00990099009900.
.0L0990990990L0.
.0LL09900990LL0.
.0L0009009000L0.
..03600LL00630..
...030LLLL030...
....0LLLLLL0....
....0LLLLLL0....
...0LLLLLLLL0...
..000000000000..`],
  [demonBLeft, bitmap`
................
......000000....
0....0LLL0000...
00..030L0990L0..
0L003600990LLL0.
0LLL000990LLLL0.
0LLLL0990000000.
0LLLLL009999990.
0LLLLL009999990.
0LLLL0990000000.
0LLL000990LLLL0.
0L003600990LLL0.
00..030L0990L0..
0....0LLL0000...
......000000....
................`],
  [demonBRight, bitmap`
................
....000000......
...0000LLL0....0
..0L0990L030..00
.0LLL099006300L0
.0LLLL099000LLL0
.0000000990LLLL0
.099999900LLLLL0
.099999900LLLLL0
.0000000990LLLL0
.0LLLL099000LLL0
.0LLL099006300L0
..0L0990L030..00
...0000LLL0....0
....000000......
................`],
  [bossUp, bitmap`
.0............0.
030.00000000.030
0330222222220330
.00236322363200.
.02233222233220.
.00232222223200.
.0L0000000000L0.
.0LL03999930LL0.
.0LL03399330LL0.
.00LL033330LL00.
.030LL0330LL030.
.03300399300330.
..033399993330..
...0999999990...
....00000000....
................`],
  [bossDown, bitmap`
................
....00000000....
...0999999990...
..033399993330..
.03300399300330.
.030LL0330LL030.
.00LL033330LL00.
.0LL03399330LL0.
.0LL03999930LL0.
.0L0000000000L0.
.00232222223200.
.02233222233220.
.00236322363200.
0330222222220330
030.00000000.030
.0............0.`],
  [bossLeft, bitmap`
.00.............
033000000000....
.03020LLL0330...
..02220LLL0330..
.02333000LL0390.
.026320330L0390.
.02322093303990.
.02222099339990.
.02222099339990.
.02322093303990.
.026320330L0390.
.02333000LL0390.
..02220LLL0330..
.03020LLL0330...
033000000000....
.00.............`],
  [bossRight, bitmap`
.............00.
....000000000330
...0330LLL02030.
..0330LLL02220..
.0930LL00033320.
.0930L033023620.
.09930339022320.
.09993399022220.
.09993399022220.
.09930339022320.
.0930L033023620.
.0930LL00033320.
..0330LLL02220..
...0330LLL02030.
....000000000330
.............00.`]
);

setBackground(ground);

setSolids([
  playerUp,
  playerDown,
  playerLeft,
  playerRight,
  wall,
  demonUp,
  demonDown,
  demonLeft,
  demonRight,
  demonBUP,
  demonBDown,
  demonBLeft,
  demonBRight,
  bossUp,
  bossDown,
  bossLeft,
  bossRight
]);

let level = 0;
const levels = [
  map`
wwwwwwwwww
w........j
w........w
w........w
w........w
w........w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
j..w.....w
w..w.....w
w..w.....w
w..w..w..w
w..w..w..w
w.....w..j
wwwwwwwwww`,
  map`
wwwwwwwwjw
w........w
w.w....w.w
w........w
w........w
w.w....w.w
j........w
wwwwwwwwww`,
  map`
wwwwwwwwww
w........j
w.w..wwwww
w.w..w...w
w.w..w.w.w
w.wwww.w.w
w......w.w
wwwwwwwwjw`,
  map`
wwwwwwwwww
wwwwzywwww
wwwwxtwwww
w........w
w........w
wwwwwwww.w
j........w
wwwwwwwwww`,
  map`
wwwwwwwwww
w........w
w........w
w..w..w..w
w..w..w..w
w........w
w........w
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
let demonSpawnRate = 3000; // 3 seconds
let demonMoveSpeed = 800; // 0.8 seconds
let demonBMoveSpeed = 800; // 0.8 seconds
const bossMoveSpeed = 500; // 0.5 seconds
let lastBossFireTime = 0;

addText(`Score:${score}`, { 
  x: 1,
  y: 0,
  color: color`4`
});

addText(`HP:${playerLives}`, {
  x: 1,
  y: 15,
  color: color`4`
});

setMap(levels[level]);

addSprite(1, 6, playerRight); // Spawn the player

function movePlayer(dx, dy) {
  // Limit movement speed
  const currentTime = Date.now();
  if (isGameOver || currentTime - lastMoveTime < moveCooldown) return;

  const player = getFirst(playerUp) || getFirst(playerDown) || getFirst(playerLeft) || getFirst(playerRight);

  if (player) {
    const newX = player.x + dx;
    const newY = player.y + dy;
    const targetTile = getTile(newX, newY);

    // Check for door interaction
    const doorTile = targetTile.find(sprite => sprite.type === door);
    if (doorTile) {
      if (level === 0 && newX === 9 && newY === 1) {
        level = 1; // Move to level 1
        setMap(levels[level]);
        addSprite(1, 1, playerRight);
      } else if (level === 1 && newX === 0 && newY === 1) {
        level = 0; // Move back to level 0
        setMap(levels[level]);
        addSprite(8, 1, playerLeft);
      } else if (level === 1 && newX === 9 && newY === 6) {
        level = 2; // Move to level 2
        setMap(levels[level]);
        addSprite(1, 6, playerRight);
      } else if (level === 2 && newX === 0 && newY === 6) {
        level = 1; // Move back to level 1
        setMap(levels[level]);
        addSprite(8, 6, playerLeft);
      } else if (level === 2 && newX === 8 && newY === 0) {
        level = 3 //Move to level 3
        setMap(levels[level]);
        addSprite(8, 6, playerUp);
      } else if (level === 3 && newX === 8 && newY === 7) {
        level = 2; // Move back to level 2
        setMap(levels[level]);
        addSprite(8, 1, playerDown);
      } else if (level === 3 && newX === 9 && newY === 1) {
        level = 4; // Move to level 4
        setMap(levels[level]);
        addSprite(1, 6, playerRight);
      } else if (level === 4 && newX === 0 && newY === 6) {
        level = 3; // Move back to level 3
        setMap(levels[level]);
        addSprite(8, 1, playerLeft);
      }
      return;
    }

    // Check for boss door interaction
    const bossDoorTile = targetTile.find(sprite => sprite.type === bossDoor1 || sprite.type === bossDoor2 || sprite.type === bossDoor3 || sprite.type === bossDoor4);
    if (bossDoorTile) {
      if (level === 4 && (newX === 4 || newX === 5) && newY === 2) {
        level = 5; // Move to level 5
        setMap(levels[level]);
        addSprite(1, 6, playerRight);
        addSprite(8, 6, bossUp); // Spawn the boss

        // Add boss HP
        addText(`Boss HP:${bossHP}`, {
          x: 10,
          y: 15,
          color: color`4`
        });
      }
      return;
    }

    // Move player
    player.x = newX;
    player.y = newY;
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

function updateScoreAndHPText() {
  clearText();
  addText(`Score:${score}`, { 
    x: 1,
    y: 0,
    color: color`4`
  });
  
  addText(`HP:${playerLives}`, {
    x: 1,
    y: 15,
    color: color`4`
  });

  if (level === 5) {
    addText(`Boss HP:${bossHP}`, {
      x: 10,
      y: 15,
      color: color`4`
    });
  }
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
    const demon = initialTile.find(sprite => sprite.type === demonUp || sprite.type === demonDown || sprite.type === demonLeft || sprite.type === demonRight || sprite.type === demonBUP || sprite.type === demonBDown || sprite.type === demonBLeft || sprite.type === demonBRight);
    if (demon) {
      demon.remove();
      score += demon.type.startsWith("demonB") ? 200 : 100;
      updateScoreAndHPText();
      return;
    }

    // Check if there's a boss right in front of the player
    const boss = initialTile.find(sprite => sprite.type === bossUp || sprite.type === bossDown || sprite.type === bossLeft || sprite.type === bossRight);
    if (boss) {
      bossHP--;
      if (bossHP <= 0) {
        boss.remove();
        score += 1000;
        gameOver();
      }
      updateScoreAndHPText();
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
      const demon = tile.find(sprite => sprite.type === demonUp || sprite.type === demonDown || sprite.type === demonLeft || sprite.type === demonRight || sprite.type === demonBUP || sprite.type === demonBDown || sprite.type === demonBLeft || sprite.type === demonBRight);
      if (demon) {
        clearTile(bullet.x, bullet.y)
        clearInterval(moveBullet);
        score += demon.type.startsWith("demonB") ? 200 : 100;
        updateScoreAndHPText();
        return;
      }

      // Check for collision with boss
      const boss = tile.find(sprite => sprite.type === bossUp || sprite.type === bossDown || sprite.type === bossLeft || sprite.type === bossRight);
      if (boss) {
        bullet.remove();
        clearInterval(moveBullet);
        bossHP--;
        if (bossHP <= 0) {
          boss.remove();
          score += 1000;
          gameOver();
        }
        updateScoreAndHPText();
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

function fireFireball(fireballType, dx, dy, startX, startY) {
  // Reduce floating fireballs
  const currentTime = Date.now();
  if (isGameOver || currentTime - lastFireTime < fireCooldown) return;
  lastFireTime = currentTime;
  
  // Fireball sound effect
  const fire = tune`
42.857142857142854: C4-42.857142857142854,
1328.5714285714284`
  playTune(fire)

  // Check if the player is already at the given startX and startY
  const startTile = getTile(startX, startY);
  const playerAtStart = startTile.find(sprite => sprite.type === playerUp || sprite.type === playerDown || sprite.type === playerLeft || sprite.type === playerRight);

  if (playerAtStart) {
    playerLives--;
    updateScoreAndHPText();
    if (playerLives <= 0) {
      gameOver();
    }
    return;
  }

  // Check if the initial position for the fireball is obstructed by a wall or other demon
  if (startTile.some(sprite => sprite.type === wall || sprite.type === demonUp || sprite.type === demonDown || sprite.type === demonLeft || sprite.type === demonRight || sprite.type === demonBUP || sprite.type === demonBDown || sprite.type === demonBLeft || sprite.type === demonBRight)) return;

  // Add the fireball sprite
  addSprite(startX, startY, fireballType);

  // Find the added fireball sprite
  const fireballTile = getTile(startX, startY);
  const fireball = fireballTile.find(sprite => sprite.type === fireballType);

  // Move the fireball
  const moveFireball = setInterval(() => {
    // Move the fireball
    fireball.x += dx;
    fireball.y += dy;

    // Check the tile after moving the fireball
    const nextTile = getTile(fireball.x, fireball.y);
    const player = nextTile.find(sprite => sprite.type === playerUp || sprite.type === playerDown || sprite.type === playerLeft || sprite.type === playerRight);
    const wallOrDoor = nextTile.find(sprite => sprite.type === wall || sprite.type === door || sprite.type === bossDoor1 || sprite.type === bossDoor2 || sprite.type === bossDoor3 || sprite.type === bossDoor4);
    const demon = nextTile.find(sprite => sprite.type === demonUp || sprite.type === demonDown || sprite.type === demonLeft || sprite.type === demonRight || sprite.type === demonBUP || sprite.type === demonBDown || sprite.type === demonBLeft || sprite.type === demonBRight);

    // Check for collision with walls, doors, or demons
    if (wallOrDoor || demon) {
      clearInterval(moveFireball);
      fireball.remove();
      return; // Stop moving the fireball if it hits something
    }

    // Check for collision with player
    if (player) {
      clearInterval(moveFireball);
      fireball.remove();
      playerLives--;
      updateScoreAndHPText();
      if (playerLives <= 0) {
        gameOver();
      }
      return; // Stop moving the fireball if it hits the player
    }

    // Stop moving the fireball if it goes out of bounds
    if (fireball.x < 0 || fireball.y < 0 || fireball.x >= width() || fireball.y >= height()) {
      clearInterval(moveFireball);
      fireball.remove();
    }
  }, bulletSpeed); // Adjust the speed to match the bullet speed
}

function getRandomEmptyPosition() {
  const emptyPositions = [];
  const player = getFirst(playerUp) || getFirst(playerDown) || getFirst(playerLeft) || getFirst(playerRight);
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      const tile = getTile(x, y);
      const distanceToPlayer = Math.abs(x - player.x) + Math.abs(y - player.y);
      if (!tile.some(sprite => 
            sprite.type === wall || 
            sprite.type === playerUp || 
            sprite.type === playerDown || 
            sprite.type === playerLeft || 
            sprite.type === playerRight || 
            sprite.type === bulletUp || 
            sprite.type === bulletDown || 
            sprite.type === bulletLeft || 
            sprite.type === bulletRight || 
            sprite.type === demonUp || 
            sprite.type === demonDown || 
            sprite.type === demonLeft || 
            sprite.type === demonRight || 
            sprite.type === demonBUP || 
            sprite.type === demonBDown || 
            sprite.type === demonBLeft || 
            sprite.type === demonBRight || 
            sprite.type === door ||
            sprite.type === bossDoor1 ||
            sprite.type === bossDoor2 ||
            sprite.type === bossDoor3 ||
            sprite.type === bossDoor4) && 
            distanceToPlayer > 1) {
        emptyPositions.push({ x, y });
      }
    }
  }
  if (emptyPositions.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * emptyPositions.length);
  return emptyPositions[randomIndex];
}

function spawnDemon() {
  if (level === 5) return; // Stop spawning demons at boss lair
  const position = getRandomEmptyPosition();
  if (position) {
    const demonTypes = [demonUp, demonDown, demonLeft, demonRight, demonBUP, demonBDown, demonBLeft, demonBRight];
    const randomDemonType = demonTypes[Math.floor(Math.random() * demonTypes.length)];
    addSprite(position.x, position.y, randomDemonType);
  }
}

function gameOver() {
  // Prevent keypresses
  isGameOver = true;
  
  // Stop intervals
  clearInterval(demonSpawnInterval);
  clearInterval(demonMoveInterval);
  clearInterval(demonBMoveInterval);
  clearInterval(bossMoveInterval);
  clearInterval(increaseInterval);
  clearInterval(speedDecreaseInterval);
  setTimeout(() => {
    clearText();
    const allSprites = getAll();
    allSprites.forEach(sprite => {
      if (sprite.type !== wall && sprite.type !== door && sprite.type !== bossDoor1 && sprite.type !== bossDoor2 && sprite.type !== bossDoor3 && sprite.type !== bossDoor4) {
        sprite.remove();
      }
    });
    addText("Game Over!", {
      x: 5,
      y: 3,
      color: color`4`
    });
    addText(`Score:${score}`, {
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
      addText(`Score:${score}`, {
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
  // Give back control and reset values
  isGameOver = false;
  clearText();
  score = 0;
  playerLives = 5;
  bossHP = 15;
  demonSpawnRate = 3000;
  demonMoveSpeed = 800;
  demonBMoveSpeed = 800;
  level = 0;
  setMap(levels[level]);
  addSprite(1, 6, playerRight); // Reset player
  setPushables({
    [playerUp]: [],
    [playerDown]: [],
    [playerLeft]: [],
    [playerRight]: []
  });

  addText(`Score:${score}`, { 
    x: 1,
    y: 0,
    color: color`4`
  });

  addText(`HP:${playerLives}`, {
    x: 1,
    y: 15,
    color: color`4`
  });

  // Restart intervals
  demonSpawnInterval = setInterval(spawnDemon, demonSpawnRate);
  demonMoveInterval = setInterval(moveDemons, demonMoveSpeed);
  demonBMoveInterval = setInterval(moveDemonB, demonBMoveSpeed);
  bossMoveInterval = setInterval(moveBoss, bossMoveSpeed);
  increaseInterval = setInterval(increaseDemonSpawnRate, 15000);
  speedDecreaseInterval = setInterval(decreaseDemonMoveSpeed, 5000);
}

function increaseDemonSpawnRate() {
  demonSpawnRate /= 2; // Double the spawn rate >:)
  clearInterval(demonSpawnInterval);
  demonSpawnInterval = setInterval(spawnDemon, demonSpawnRate);
}

function decreaseDemonMoveSpeed() {
  demonMoveSpeed = Math.max(25, demonMoveSpeed - 25); // Decrease move speed by 25 milliseconds, minimum 25 milliseconds
  clearInterval(demonMoveInterval);
  demonMoveInterval = setInterval(moveDemons, demonMoveSpeed);
  clearInterval(demonBMoveInterval);
  demonBMoveInterval = setInterval(moveDemonB, demonMoveSpeed);
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
        updateScoreAndHPText();
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

function moveDemonB() {
  const demonBs = [...getAll(demonBUP), ...getAll(demonBDown), ...getAll(demonBLeft), ...getAll(demonBRight)];
  const player = getFirst(playerUp) || getFirst(playerDown) || getFirst(playerLeft) || getFirst(playerRight);

  if (!player) return;

  demonBs.forEach(demonB => {
    const dx = Math.sign(player.x - demonB.x);
    const dy = Math.sign(player.y - demonB.y);

    // Add cooldown for firing
    if (!demonB.lastFireTime) demonB.lastFireTime = 0;
    const currentTime = Date.now();
    const canFire = currentTime - demonB.lastFireTime >= 1000; // 1 second cooldown

    // Check if aligned with the player and shoot fireball
    if ((demonB.x === player.x || demonB.y === player.y) && canFire) {
      if (demonB.x === player.x && demonB.y > player.y) {
        if (demonB.type !== demonBUP) {
          demonB.type = demonBUP;
        } else {
          fireFireball(fireballUp, 0, -1, demonB.x, demonB.y - 1);
          demonB.lastFireTime = currentTime;
          return; // Count as movement
        }
      } else if (demonB.x === player.x && demonB.y < player.y) {
        if (demonB.type !== demonBDown) {
          demonB.type = demonBDown;
        } else {
          fireFireball(fireballDown, 0, 1, demonB.x, demonB.y + 1);
          demonB.lastFireTime = currentTime;
          return; // Count as movement
        }
      } else if (demonB.y === player.y && demonB.x > player.x) {
        if (demonB.type !== demonBLeft) {
          demonB.type = demonBLeft;
        } else {
          fireFireball(fireballLeft, -1, 0, demonB.x - 1, demonB.y);
          demonB.lastFireTime = currentTime;
          return; // Count as movement
        }
      } else if (demonB.y === player.y && demonB.x < player.x) {
        if (demonB.type !== demonBRight) {
          demonB.type = demonBRight;
        } else {
          fireFireball(fireballRight, 1, 0, demonB.x + 1, demonB.y);
          demonB.lastFireTime = currentTime;
          return; // Count as movement
        }
      }
    }

    // Check for collision with player
    if ((demonB.x + dx === player.x && demonB.y === player.y) || (demonB.x === player.x && demonB.y + dy === player.y)) {
      // Ensure demonB is facing player before damaging
      if ((demonB.type === demonBRight && dx > 0) || (demonB.type === demonBLeft && dx < 0) || (demonB.type === demonBDown && dy > 0) || (demonB.type === demonBUP && dy < 0)) {
        playerLives--;
        updateScoreAndHPText();
        if (playerLives <= 0) {
          gameOver();
        }
        return; // Stop demonB's movement if collision occurs
      } else {
        if (dx > 0) {
          demonB.type = demonBRight;
        } else if (dx < 0) {
          demonB.type = demonBLeft;
        } else if (dy > 0) {
          demonB.type = demonBDown;
        } else if (dy < 0) {
          demonB.type = demonBUP;
        }
        return;
      }
    }

    if (dx !== 0) {
      if (demonB.type !== demonBRight && dx > 0) {
        demonB.type = demonBRight;
      } else if (demonB.type !== demonBLeft && dx < 0) {
        demonB.type = demonBLeft;
      } else {
        demonB.x += dx;
      }
    } else if (dy !== 0) {
      if (demonB.type !== demonBDown && dy > 0) {
        demonB.type = demonBDown;
      } else if (demonB.type !== demonBUP && dy < 0) {
        demonB.type = demonBUP;
      } else {
        demonB.y += dy;
      }
    }
  });
}

function moveBoss() {
  const boss = getFirst(bossUp) || getFirst(bossDown) || getFirst(bossLeft) || getFirst(bossRight);
  const player = getFirst(playerUp) || getFirst(playerDown) || getFirst(playerLeft) || getFirst(playerRight);

  if (!boss || !player) return;

  const dx = Math.sign(player.x - boss.x);
  const dy = Math.sign(player.y - boss.y);

  // Move boss and check specific wall positions
  if (player.x === 3 || player.x === 6) {
    // Try to align to the player's y axis
    if (dy !== 0) {
      boss.y += dy;
    } else if (dx !== 0 && (boss.y !== 3 && boss.y !== 4)) {
      boss.x += dx;
    }
  } else if (player.y === 3 || player.y === 4) {
    // Try to align to the player's x axis
    if (dx !== 0) {
      boss.x += dx;
    } else if (dy !== 0 && (boss.x !== 3 && boss.x !== 6)) {
      boss.y += dy;
    }
  } else {
    // Normal movement if not near specific positions
    if (dx !== 0) {
      boss.x += dx;
    } else if (dy !== 0) {
      boss.y += dy;
    }
  }

  const currentTime = Date.now();

  // Check if boss is on the same x or y axis as the player and fire fireballs
  if (currentTime - lastBossFireTime >= 700) { // 0.7 second cooldown
    if (boss.x === player.x || boss.y === player.y) {
      if (boss.x === player.x && boss.y > player.y) {
        if (boss.type !== bossUp) {
          boss.type = bossUp;
        } else {
          fireFireball(fireballUp, 0, -1, boss.x, boss.y - 1);
          lastBossFireTime = currentTime;
          return;
        }
      } else if (boss.x === player.x && boss.y < player.y) {
        if (boss.type !== bossDown) {
          boss.type = bossDown;
        } else {
          fireFireball(fireballDown, 0, 1, boss.x, boss.y + 1);
          lastBossFireTime = currentTime;
          return;
        }
      } else if (boss.y === player.y && boss.x > player.x) {
        if (boss.type !== bossLeft) {
          boss.type = bossLeft;
        } else {
          fireFireball(fireballLeft, -1, 0, boss.x - 1, boss.y);
          lastBossFireTime = currentTime;
          return;
        }
      } else if (boss.y === player.y && boss.x < player.x) {
        if (boss.type !== bossRight) {
          boss.type = bossRight;
        } else {
          fireFireball(fireballRight, 1, 0, boss.x + 1, boss.y);
          lastBossFireTime = currentTime;
          return;
        }
      }
    }
  }
}

let demonSpawnInterval = setInterval(spawnDemon, demonSpawnRate); // Spawn demons at initial rate
let demonMoveInterval = setInterval(moveDemons, demonMoveSpeed); // Move demons at the initial speed
let demonBMoveInterval = setInterval(moveDemonB, demonBMoveSpeed); // Move demonBs at the initial speed
let bossMoveInterval = setInterval(moveBoss, bossMoveSpeed); // Move boss at the set speed
let increaseInterval = setInterval(increaseDemonSpawnRate, 15000); // Increase spawn rate every 15 seconds
let speedDecreaseInterval = setInterval(decreaseDemonMoveSpeed, 5000); // Decrease demon move speed every 5 seconds

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
