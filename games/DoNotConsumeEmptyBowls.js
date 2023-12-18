const player = "p";
const obstacle = "o";
const sushi2 = "s";
const rainbow = "r";
const sushi4 = "w";
const sushi3 = "h";
const sushi5 = "f";
const sushi6 = "x";
const block = "y";
const sushiTypes = [sushi2, sushi4, sushi3, sushi5, sushi6];
const randomSushiType = sushiTypes[Math.floor(Math.random() * sushiTypes.length)];
const melody = tune`
37.5: B5~37.5,
37.5: B5~37.5 + A5~37.5,
37.5: A5~37.5 + G5~37.5,
37.5: G5~37.5,
37.5: G5~37.5 + F5~37.5,
37.5: F5~37.5,
37.5: E5~37.5,
37.5: E5~37.5 + D5~37.5,
37.5: D5~37.5 + C5~37.5,
37.5: C5~37.5,
37.5: C5~37.5 + B4~37.5,
37.5: B4~37.5,
37.5: B4~37.5 + A4~37.5,
37.5: A4~37.5,
37.5: G4~37.5,
37.5: G4~37.5,
37.5: G4~37.5 + F4~37.5,
37.5: F4~37.5,
37.5: F4~37.5,
37.5: F4~37.5 + E4~37.5,
37.5: E4~37.5,
37.5: E4~37.5,
37.5: E4~37.5 + D4~37.5,
37.5: D4~37.5,
37.5: D4~37.5,
37.5: D4~37.5,
37.5: C4~37.5,
37.5: C4~37.5,
37.5: C4~37.5,
37.5: C4~37.5,
37.5: C4~37.5,
37.5: C4~37.5`
const eat = tune`
37.5,
37.5: C5^37.5,
1125`
// Sprites
setLegend(
  [obstacle, bitmap`
................
................
................
....00000000....
...0111111110...
..0L11111111L0..
.0L1111111111L0.
.000L111111L000.
.0CC0LLLLLL0CC0.
.0CCC000000CCC0.
..0CCCCCCCCCC0..
...0CCCCCCCC0...
....0CCCCCC0....
.....000000.....
................
................`],
  [sushi2, bitmap`
................
................
....00000.......
..003333300.....
.03333330000....
0333333000000...
03333330000000..
.00330000003330.
.01000000003330.
.02200000033330.
..02000003333330
...0000100033330
....00022110030.
......00222210..
.......0022220..
.........0000...`],
  [player, bitmap`
...00.....00....
...0L0...0L0....
...02LL0LL20....
...021L1L120....
.00L1111111L00..
..01111211110...
.00L1012101L00..
..01102220110...
...012282210....
....00LLL000....
...00LL1LL00....
...001222100....
..01010101010...
..0L010L010L0...
...001000100....
....020.020.....`],
  [rainbow, bitmap`
................
................
................
.....000000.....
...0002222000...
..00229D682200..
..02269D608220..
..00229D382200..
..000222222000..
..000000000000..
..000000000000..
...0000000000...
....00000000....
................
................
................`],
  [ sushi4, bitmap`
................
................
....00000.......
..009999900.....
.09999930000....
0999333000000...
03399390000000..
.00330000009990.
.01000000009990.
.02200000099330.
..02000003393990
...0000100033390
....00022110030.
......00222210..
.......0022220..
.........0000...`],
  [ sushi3, bitmap`
....000.........
..0092200.......
.009229900......
09922299900.....
03322999220.....
.032999229900...
.00009229992900.
.021100033229330
.022111100390030
..0222221009900.
...022222110330.
...00022220.00..
......00000.....
................
................
................`],
  [ sushi5, bitmap`
........0000....
.......066660...
.....0066666000.
..0000622266660.
0006009926669900
062200099669000.
006260009999010.
.00966600000110.
.00099990001220.
.01009000002220.
.02100011002200.
.0222122200200..
..00222220000...
....0000000.....
................
................`],
  [ sushi6, bitmap`
................
................
................
.....0000.......
...00333300.....
.003393939300...
02993993933320..
00223933392200..
00002222220010..
0000000000L110..
0000000LL1L110..
0000000LL1L110..
0000000LL1L110..
.000000LL1L10...
..00000LL100....
....000000......`],
  [ block, bitmap`
................
................
................
................
....0.....0.....
................
.............0..
.0....0.....00..
.00..000....0...
..0000.00..00...
........0000....
................
................
................
................
................`]
)

setMap(map`
........
.y....y.
........
..y..y..
...yy...
........
........
...p....`) // Background

// More Variables
var gameRunning = true;
let currentscore = 0; 
let highscore = 0;

// Input Controls
onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1;
  }
});
onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1;
  }
});
onInput("j", () => {
  if (!gameRunning) {
    restartGame();
  }
});

// Spawn Bowls & Sushi
function spawnObstacle() {
  let x = Math.floor(Math.random() * 8);
  let y = 0;
  addSprite(x, y, obstacle);
}
function spawnSushi() {
  const randomSushiType = sushiTypes[Math.floor(Math.random() * sushiTypes.length)];
  let x = Math.floor(Math.random() * 8);
  addSprite(x, 0, randomSushiType);
}

// Sprite Falling Movement
function moveObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}
function moveSushi() {
  for (const sushiType of sushiTypes) {
    let sushis = getAll(sushiType);
    for (let i = 0; i < sushis.length; i++) {
      sushis[i].y += 1;
    }
  }
}
// Despawning
function despawnObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].y == 7) {
      obstacles[i].remove();
    }
  }
}
function despawnSushi() {
  for (const sushiType of sushiTypes) {
    let sushis = getAll(sushiType);
    for (let i = 0; i < sushis.length; i++) {
      if (sushis[i].y == 7) {
        sushis[i].remove();
      }
    }
  }
}

// Check Collision
function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);


  if (!p || !obstacles) {
    return false;
  }

  for (let i = 0; i < obstacles.length; i++) {
    
    if (obstacles[i].x !== undefined && obstacles[i].y !== undefined) {
      if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
        return true;
      }
    }
  }

  return false;
}
function ate() {
  const allSushi = [].concat(...sushiTypes.map(sushiType => getAll(sushiType)));
  let p = getFirst(player);


  if (!p || !allSushi) {
    return false;
  }

  for (let i = 0; i < allSushi.length; i++) {
 
    if (allSushi[i].x !== undefined && allSushi[i].y !== undefined) {
      if (allSushi[i].x == p.x && allSushi[i].y == p.y) {
        return true;
        
      }
    }
  }

  return false;
}

var gameLoop;
var spawnInterval = 500; // Starting, will increase

function startGame() {
  gameLoop = setTimeout(function gameTick() {
    despawnObstacles();
    moveObstacles();
    spawnObstacle();
    despawnSushi();
    moveSushi();
    spawnSushi();
    addText("Score: " + currentscore, {
      x: 6,
      y: 2,
      color: color`D`
    });

    if (checkHit()) {
      gameRunning = false;
      endGame();
    }

    if (ate()) {
      playTune(eat)
      currentscore += 1;
    }

    // Schedule the next tick
    if (gameRunning) {
      gameLoop = setTimeout(gameTick, spawnInterval);
    }
  }, spawnInterval);
} // Has Score Update

function decreaseInterval() {
  if (spawnInterval > 100) {
    spawnInterval -= 50;
    setTimeout(decreaseInterval, 10000);
  }
} // Speed up
function clearMap() {
  const allSprites = getAll();
  allSprites.forEach(sprite => sprite.remove());
} 
function endGame() {
  clearMap();
  playTune(melody)
  addText("Game Over!", {
    x: 5,
    y: 6,
    color: color`3`
  });

  if (currentscore > highscore){
    highscore = currentscore;
  }
  addText("High Score: " + highscore, {
    x: 5,
    y: 8,
    color: color`7`
  });
  addText(" 'j' to retry", {
    x: 2,
    y: 10,
    color: color`5`
  });
}
function restartGame() {
  clearText();
  clearMap();
  currentscore = 0;
  gameRunning = true;
  spawnInterval = 500;

  let playerX = 3;
  let playerY = 7; 
  addSprite(playerX, playerY, player);

  startGame();
}

decreaseInterval();
startGame();
