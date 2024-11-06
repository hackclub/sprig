/*
@title: alien_invaders
@author: stati30241
@tags: ['retro']
@addedOn: 2022-09-28

Controls:
 - A to move left
 - D to move right
 - W or I to shoot
 - J to replay
*/

// Sprites
const background = "b";
const player = "p";
const laser = "l";
const enemy1 = "e";
const enemy2 = "r";
const enemy3 = "s";
const explodingEnemy = "w";
const enemyLaser = "i";

// Sound effects
let playSound = true;
let laserSound = tune`
227.27272727272728: b4-227.27272727272728,
7045.454545454546`;
let explosionSound = tune`
119.04761904761905: c4-119.04761904761905,
119.04761904761905: d4-119.04761904761905,
119.04761904761905: e4-119.04761904761905,
119.04761904761905: d4-119.04761904761905,
119.04761904761905: c4-119.04761904761905,
3214.285714285714`;
let victorySound = tune`
212.7659574468085: f4-212.7659574468085 + a4-212.7659574468085 + c5-212.7659574468085,
212.7659574468085: d5-212.7659574468085 + b4-212.7659574468085 + g4-212.7659574468085,
212.7659574468085: f5-212.7659574468085 + c5-212.7659574468085 + f4-212.7659574468085,
6170.212765957446`;
let gameOverSound = tune`
416.6666666666667: a4-416.6666666666667,
416.6666666666667: e4-416.6666666666667,
416.6666666666667: c4-416.6666666666667,
12083.333333333334`;

// Game variables
let ticks = 0;
let gameOver = false;
let playerWin = false;

// Initializes the sprites
setLegend(
  [ background, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ player, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000DD0000000
0000000DD0000000
0000000DD0000000
0DDDDDDDDDDDDDD0
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ laser, bitmap`
0000000000000000
0000000000000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000
0000000000000000
0000000000000000`],
  [ enemy1, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0007700000077000
0000070000700000
0000777777770000
0007707777077000
0077777777777700
0777777777777770
0707777777777070
0707000000007070
0000777007770000
0000000000000000
0000000000000000
0000000000000000`],
  [ enemy2, bitmap`
0000000000000000
0000000000000000
0000000000000000
0007700000077000
0000700000070000
0700070000700070
0700777777770070
0707707777077070
0777777777777770
0077777777777700
0007777777777000
0000700000070000
0000700000070000
0007000000007000
0070000000000700
0000000000000000`],
  [ enemy3, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000055555500000
0005555555555000
0055555555555500
0550550550550550
5555555555555555
0055500550055500
0005000000005000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ explodingEnemy, bitmap`
0000000000000000
0000000000000000
0090060000000900
0060000009000000
00L0000000000000
9000090039060300
0000900696030000
0000036939300300
00690933L3900000
0000069396000000
0003000903009000
09600000000000C0
0090030000030600
0000000000000000
0000009600600000
0000000000000000`],
  [ enemyLaser, bitmap`
0000000000000000
0000000000000000
0000000330000000
0000000330000000
0000000330000000
0000000330000000
0000000330000000
0000000330000000
0000000330000000
0000000330000000
0000000330000000
0000000330000000
0000000330000000
0000000330000000
0000000000000000
0000000000000000`]
);

// Levels
const levelReset = map`
bsbsbsbsbsbsbsbsbsbsbsbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbebbrbbebbrbbebbrbbebbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
brbbebbrbbebbrbbebbrbbebb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbrbbebbrbbebbrbbebbrbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbpbbbbbbbbbbbb`;
const levels = [
  map`
bsbsbsbsbsbsbsbsbsbsbsbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbebbrbbebbrbbebbrbbebbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
brbbebbrbbebbrbbebbrbbebb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbrbbebbrbbebbrbbebbrbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbpbbbbbbbbbbbb`,
  map`
bbbbb
bbbbb
bbbbb
bbbbb`
];
setMap(levels[0]);

// Handles player ship movement
onInput("a", () => {
  if (gameOver) return;
  
  let playerX = getFirst(player).x;
  let playerY = getFirst(player).y;

  if (playerX != 0) {
    clearTile(playerX, playerY);
    clearTile(playerX - 1, playerY);
    addSprite(playerX, playerY, background);
    addSprite(playerX - 1, playerY, player);
  }
});
onInput("d", () => {
  if (gameOver) return;
  
  let playerX = getFirst(player).x;
  let playerY = getFirst(player).y;

  if (playerX != 24) {
    clearTile(playerX, playerY);
    clearTile(playerX + 1, playerY);
    addSprite(playerX, playerY, background);
    addSprite(playerX + 1, playerY, player);
  }
});

// Handles shooting lasers
onInput("w", () => {
  if (gameOver) return;
  
  let playerX = getFirst(player).x;
  let playerY = getFirst(player).y;
  clearTile(playerX, playerY - 1);
  addSprite(playerX, playerY - 1, laser);
  playTune(laserSound);
});
onInput("i", () => {
  if (gameOver) return;
  
  let playerX = getFirst(player).x;
  let playerY = getFirst(player).y;
  clearTile(playerX, playerY - 1);
  addSprite(playerX, playerY - 1, laser);
  playTune(laserSound);
});

// Handles replay
onInput("j", () => {
  clearText();
  
  levels[0] = levelReset;
  setMap(levels[0]);
  
  ticks = 0;
  gameOver = false;
  playerWin = false;
});

// Main update function-thing?
const mainUpdate = () => {
  // Enemies
  let enemy1Array = getAll(enemy1);
  let enemy2Array = getAll(enemy2);
  let enemy3Array = getAll(enemy3);
  let enemyArray = enemy1Array.concat(enemy2Array, enemy3Array);
  enemyArray.sort(function(a,b) {return a.y - b.y});

  // Checks if all the enemies are dead
  if (enemyArray.length == 0 && gameOver == false) {
    playerWin = true;
    gameOver = true;
  }
  
  // Checks if the game is over
  if (gameOver) {
    setMap(levels[1]);

    if (playerWin) {
      addText("YOU", { x: 8, y: 6, color: color`3` });
      addText("WIN", { x: 8, y: 8, color: color`3` });
      if (playSound) {
        playTune(victorySound);
        playSound = false;
      }
    } else {
      addText("GAME", { x: 8, y: 6, color: color`3` });
      addText("OVER", { x: 8, y: 8, color: color`3` });
      if (playSound) {
        playTune(gameOverSound);
        playSound = false;
      }
    }
    return;
  }
  
  // Gets rid of exploded enemies
  let explodedArray = getAll(explodingEnemy);
  for (var i = 0; i < explodedArray.length; ++i) {
    clearTile(explodedArray[i].x, explodedArray[i].y);
    addSprite(explodedArray[i].x, explodedArray[i].y, background);
  }

  // Randomly shoots at player
  let shooting = Math.random() > 0.9;
  if (shooting) {
    let x = Math.floor(Math.random() * 23) + 1;
    let y = enemyArray[enemyArray.length - 1].y + 1;
    let s = getTile(x, y)[0].type;
    if (s == enemy1 && s == enemy2 && s == enemy3) shooting = false;
    if (shooting) {
      clearTile(x, y);
      addSprite(x, y, enemyLaser);
    }
  }

  // Updates the position of the enemy lasers
  let eLaserArray = getAll(enemyLaser);
  for (var w of eLaserArray) {
    // Updates the y position of the laser
    let wy = w.y + 1;

    // Checks for collision between laser and player
    let collision = false;
    if (getFirst(player).x == w.x && getFirst(player).y == wy) {
      collision = true;
    }

    // Checks for collision with enemy
    if (wy <= 19) {
      let s = getTile(w.x, wy)[0].type;
      if (s == enemy1 && s == enemy2 && s == enemy3) {
        alert("Hello");
      }
    }

    clearTile(w.x, w.y);
    addSprite(w.x, w.y, background);
    if (wy <= 19) {
      clearTile(w.x, wy);
      if (collision) {
        addSprite(w.x, wy, explodingEnemy);
        gameOver = true;
        return;
      }
      else addSprite(w.x, wy, enemyLaser);
    }
  }
  
  // Updates the positions of the lasers
  let laserArray = getAll(laser);
  for (var l of laserArray) {
    // Updates the y position of the laser
    let ly = l.y - 1;

    // Check for collision between laser and enemies
    let collision = false;
    for (var i = 0; i < enemyArray.length; ++i) {
      if (l.x == enemyArray[i].x && ly == enemyArray[i].y) {
        collision = true;
      }
    }

    // Updates the laser sprite
    clearTile(l.x, l.y);
    addSprite(l.x, l.y, background);
    if (ly >= 0) {
      clearTile(l.x, ly);
      if (collision) {
        addSprite(l.x, ly, explodingEnemy);
        playTune(explosionSound);
      }
      else addSprite(l.x, ly, laser);
    }
  }
}

// Enemy update function-thing?
const updateEnemies = () => {
  // Gets the array of all the enemies
  let enemy1Array = getAll(enemy1);
  let enemy2Array = getAll(enemy2);
  let enemy3Array = getAll(enemy3);
  let enemyArray = enemy1Array.concat(enemy2Array, enemy3Array);

  for (var i = 0; i < enemyArray.length; ++i) {
    let ex = enemyArray[i].x;
    let ey = enemyArray[i].y;
    let et = enemyArray[i].type;

    if (ticks % 4 == 0) {
      if (ex == 24) continue;
      clearTile(ex, ey);
      addSprite(ex, ey, background);
      clearTile(ex + 1, ey);
      if (et == enemy3) addSprite(ex + 1, ey, et);
      if (et == enemy1) addSprite(ex + 1, ey, enemy2);
      if (et == enemy2) addSprite(ex + 1, ey, enemy1);
    } else if (ticks % 4 == 1) {
      if (ey == 19) continue;
      clearTile(ex, ey);
      addSprite(ex, ey, background);
      clearTile(ex, ey + 1);
      if (et == enemy3) addSprite(ex, ey + 1, et);
      if (et == enemy1) addSprite(ex, ey + 1, enemy2);
      if (et == enemy2) addSprite(ex, ey + 1, enemy1);
    } else if (ticks % 4 == 2) {
      if (ex == 0) continue;
      clearTile(ex, ey);
      addSprite(ex, ey, background);
      clearTile(ex - 1, ey);
      if (et == enemy3) addSprite(ex - 1, ey, et);
      if (et == enemy1) addSprite(ex - 1, ey, enemy2);
      if (et == enemy2) addSprite(ex - 1, ey, enemy1);
    } else if (ticks % 4 == 3) {
      if (ey == 19) continue;
      clearTile(ex, ey);
      addSprite(ex, ey, background);
      clearTile(ex, ey + 1);
      if (et == enemy3) addSprite(ex, ey + 1, et);
      if (et == enemy1) addSprite(ex, ey + 1, enemy2);
      if (et == enemy2) addSprite(ex, ey + 1, enemy1);
    }
    
    if (ey == 18) {
      gameOver = true;
      return;
    }
  }

  ticks += 1;
}

// Calls the update functions
let main = setInterval(mainUpdate, 120);
let emain = setInterval(updateEnemies, 1500);
