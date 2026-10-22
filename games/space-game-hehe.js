/*

@title: space game hehe
@author: Naman S
@description: A space-themed game. Avoid the asteroids and the aliens. Two player game. Last one standing wins!
@tags: []
@addedOn: 2025-00-00
*/

const player1 = "p";
const player2 = "q";
const wall = "X";
const asteroid = "A";
const alien = "E";
const shield = "H";
const star = "*";
const crown = "C";
const blackSpace = "B";
const p1ShieldAura = "1";
const p2ShieldAura = "2";

setLegend(
  [player1, bitmap`
................
................
.......8........
......888.......
.....88888......
....8888888.....
...888888888....
..88888888888...
..L111111111L...
..L111111111L...
.8L111111111L8..
88L111LLL111L88.
88LLLLLLLLLLL88.
8..000000000..8.
....9999999.....
.....99999......`],
  [player2, bitmap`
................
................
.......7........
......777.......
.....77777......
....7777777.....
...777777777....
..77777777777...
..L111111111L...
..L111111111L...
.7L111111111L7..
77L111LLL111L77.
77LLLLLLLLLLL77.
7..000000000..7.
....9999999.....
.....99999......`],
  [wall, bitmap`
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
  [asteroid, bitmap`
................
................
....CCCCCCCCC...
...CC3330033CC..
..CC030333333CC.
..C00300330033C.
..C33333333003C.
..C33333333303C.
..C03303333333C.
..C03303333330C.
..C03330333330C.
..C33330033033C.
..CC003303300CC.
...CC0333330CC..
....CCCCCCCCC...
................`],
  [alien, bitmap`
..4..........4..
...44......44...
....4......4....
....44444444....
..444444444444..
.44444444444444.
.44440044004444.
4444400440044444
4444444444444444
4444444444444444
4.444444444444.4
4...44444444...4
4...4......4...4
4...444..444...4
................
................`],
  [shield, bitmap`
................
....44444444....
...4444444444...
..444444444444..
.44422222222444.
.44422222222444.
.44422222222444.
.44422222222444.
.44422222222444.
.44422222222444.
.44442222224444.
.44444222244444.
..444442244444..
...4444444444...
....44444444....
................`],
  [star, bitmap`
................
................
................
......11........
......11........
....111111......
....111111......
......11........
......11........
................
................
................
................
................
................
................`],
  [crown, bitmap`
................
................
................
................
................
................
...6.........6..
...66...6...66..
...666.666.666..
...66666666666..
...66666666666..
................
................
................
................
................`],
  [blackSpace, bitmap`
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
  [p1ShieldAura, bitmap`
....44444444....
...4444444444...
..444444444444..
.44444444444444.
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
.44444444444444.
..444444444444..
...4444444444...
....44444444....`],
  [p2ShieldAura, bitmap`
....44444444....
...4444444444...
..444444444444..
.44444444444444.
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
.44444444444444.
..444444444444..
...4444444444...
....44444444....`]
);

setMap(map`
XXXXXXXXXXXXXXXXXXXX
X..................X
X..................X
X..................X
X..................X
X..................X
X..................X
X..................X
X..................X
X..................X
X..................X
X..................X
X..................X
X..................X
X..................X
XXXXXXXXXXXXXXXXXXXX`);

setBackground(blackSpace);

function addStarsToBackground() {
  for (let x = 1; x < 19; x++) {
    for (let y = 1; y < 15; y++) {
      if (Math.random() < 0.05) {
        addSprite(x, y, star);
      }
    }
  }
}

setSolids([wall]);

let p1Start = {x: 5, y: 12};
let p2Start = {x: 14, y: 12};

addSprite(p1Start.x, p1Start.y, player1);
addSprite(p2Start.x, p2Start.y, player2);

let gameOver = false;
let winner = null;
let timeLeft = 90;
let gameStarted = false;

let p1Shield = 0;
let p2Shield = 0;

let asteroidSpawnRate = 0.3;
let alienSpawnRate = 0.1;
let powerUpSpawnRate = 0.03;
let gameSpeed = 1;

function resetGame() {
  gameOver = false;
  winner = null;
  timeLeft = 90;
  gameStarted = true;
  
  getAll(asteroid).forEach(a => a.remove());
  getAll(alien).forEach(e => e.remove());
  getAll(shield).forEach(h => h.remove());
  getAll(star).forEach(s => s.remove());
  getAll(crown).forEach(c => c.remove());
  getAll(p1ShieldAura).forEach(a => a.remove());
  getAll(p2ShieldAura).forEach(a => a.remove());
  
  addStarsToBackground();
  
  const p1 = getFirst(player1);
  const p2 = getFirst(player2);
  if (p1) {
    p1.x = p1Start.x;
    p1.y = p1Start.y;
  } else {
    addSprite(p1Start.x, p1Start.y, player1);
  }
  if (p2) {
    p2.x = p2Start.x;
    p2.y = p2Start.y;
  } else {
    addSprite(p2Start.x, p2Start.y, player2);
  }
  
  p1Shield = 0;
  p2Shield = 0;
  
  asteroidSpawnRate = 0.3;
  alienSpawnRate = 0.1;
  powerUpSpawnRate = 0.03;
  gameSpeed = 1;
}

function spawnAsteroid() {
  if (Math.random() < asteroidSpawnRate) {
    const x = Math.floor(Math.random() * 18) + 1;
    addSprite(x, 1, asteroid);
  }
}

function spawnAlien() {
  if (Math.random() < alienSpawnRate) {
    const x = Math.floor(Math.random() * 18) + 1;
    addSprite(x, 1, alien);
  }
}

function spawnPowerUp() {
  if (Math.random() < powerUpSpawnRate) {
    const x = Math.floor(Math.random() * 18) + 1;
    addSprite(x, 1, shield);
  }
}

function moveAsteroids() {
  const allAsteroids = getAll(asteroid);
  allAsteroids.forEach(a => {
    a.y += gameSpeed;
    if (a.y >= 15) {
      a.remove();
    }
  });
}

function moveAliens() {
  const allAliens = getAll(alien);
  allAliens.forEach(a => {
    a.y += gameSpeed;
    
    if (!a.direction) {
      a.direction = 1;
      a.moveCounter = 0;
    }
    
    a.moveCounter++;
    if (a.moveCounter >= 2) {
      const newX = a.x + a.direction;
      if (newX >= 1 && newX < 19) {
        a.x = newX;
      }
      a.direction *= -1;
      a.moveCounter = 0;
    }
    
    if (a.y >= 15) {
      a.remove();
    }
  });
}

function movePowerUps() {
  const allPowerUps = getAll(shield);
  allPowerUps.forEach(p => {
    p.y += gameSpeed;
    if (p.y >= 15) {
      p.remove();
    }
  });
}

function updateShieldAuras() {
  getAll(p1ShieldAura).forEach(a => a.remove());
  getAll(p2ShieldAura).forEach(a => a.remove());
  
  const p1 = getFirst(player1);
  const p2 = getFirst(player2);
  
  if (p1 && p1Shield > 0) {
    addSprite(p1.x, p1.y, p1ShieldAura);
  }
  
  if (p2 && p2Shield > 0) {
    addSprite(p2.x, p2.y, p2ShieldAura);
  }
}

function checkCollisions() {
  const p1 = getFirst(player1);
  const p2 = getFirst(player2);
  
  if (!p1 || !p2 || gameOver) return;
  
  const asteroidTiles = getAll(asteroid);
  asteroidTiles.forEach(a => {
    if (p1.x === a.x && p1.y === a.y) {
      if (p1Shield === 0) {
        gameOver = true;
        winner = "Player 2";
        showWinner();
      } else {
        a.remove();
        p1Shield = Math.max(0, p1Shield - 5);
      }
    }
    if (p2.x === a.x && p2.y === a.y) {
      if (p2Shield === 0) {
        gameOver = true;
        winner = "Player 1";
        showWinner();
      } else {
        a.remove();
        p2Shield = Math.max(0, p2Shield - 5);
      }
    }
  });
  
  const alienTiles = getAll(alien);
  alienTiles.forEach(e => {
    if (p1.x === e.x && p1.y === e.y) {
      if (p1Shield === 0) {
        gameOver = true;
        winner = "Player 2";
        showWinner();
      } else {
        e.remove();
        p1Shield = Math.max(0, p1Shield - 10);
      }
    }
    if (p2.x === e.x && p2.y === e.y) {
      if (p2Shield === 0) {
        gameOver = true;
        winner = "Player 1";
        showWinner();
      } else {
        e.remove();
        p2Shield = Math.max(0, p2Shield - 10);
      }
    }
  });
  
  const shieldTiles = getAll(shield);
  shieldTiles.forEach(shieldItem => {
    if (p1 && (
      (p1.x === shieldItem.x && p1.y === shieldItem.y) || 
      (Math.abs(p1.x - shieldItem.x) <= 1 && p1.y === shieldItem.y)
    )) {
      shieldItem.remove();
      p1Shield = 45;
    }
    else if (p2 && (
      (p2.x === shieldItem.x && p2.y === shieldItem.y) || 
      (Math.abs(p2.x - shieldItem.x) <= 1 && p2.y === shieldItem.y)
    )) {
      shieldItem.remove();
      p2Shield = 45;
    }
  });
}

function updatePowerUps() {
  if (p1Shield > 0) p1Shield--;
  if (p2Shield > 0) p2Shield--;
  
  updateShieldAuras();
}

function showWinner() {
  getAll(asteroid).forEach(a => a.remove());
  getAll(alien).forEach(e => e.remove());
  getAll(shield).forEach(h => h.remove());
  getAll(p1ShieldAura).forEach(a => a.remove());
  getAll(p2ShieldAura).forEach(a => a.remove());
  
  const centerX = 9;
  const centerY = 8;
  
  if (winner === "Player 1") {
    const p1 = getFirst(player1);
    if (p1) {
      p1.x = centerX;
      p1.y = centerY;
    }
    const p2 = getFirst(player2);
    if (p2) p2.remove();
  } else if (winner === "Player 2") {
    const p2 = getFirst(player2);
    if (p2) {
      p2.x = centerX;
      p2.y = centerY;
    }
    const p1 = getFirst(player1);
    if (p1) p1.remove();
  } else {
    const p1 = getFirst(player1);
    const p2 = getFirst(player2);
    if (p1) {
      p1.x = centerX - 1;
      p1.y = centerY;
    }
    if (p2) {
      p2.x = centerX + 1;
      p2.y = centerY;
    }
  }
  
  if (winner === "Both Players") {
    addSprite(centerX - 1, centerY - 1, crown);
    addSprite(centerX + 1, centerY - 1, crown);
  } else {
    addSprite(centerX, centerY - 1, crown);
  }
}

function updateTimer() {
  if (!gameOver && gameStarted) {
    if (timeLeft > 0) {
      timeLeft--;
    } else {
      gameOver = true;
      winner = "Both Players";
      showWinner();
    }
  }
}

function movePlayer(playerType, dx) {
  if (gameOver) return;
  
  const player = getFirst(playerType);
  if (!player) return;
  
  let newX = player.x + dx;
  
  if (newX < 1 || newX >= 19) return;
  
  const otherPlayerType = playerType === player1 ? player2 : player1;
  const otherPlayer = getFirst(otherPlayerType);
  
  if (otherPlayer && otherPlayer.x === newX && otherPlayer.y === player.y) {
    let pushX = otherPlayer.x + dx;
    
    if (pushX >= 1 && pushX < 19) {
      otherPlayer.x = pushX;
      player.x = newX;
      updateShieldAuras();
      checkCollisions();
    }
    return;
  }
  
  player.x = newX;
  updateShieldAuras();
  checkCollisions();
}

onInput("a", () => {
  movePlayer(player1, -1);
});
onInput("d", () => {
  movePlayer(player1, 1);
});

onInput("j", () => {
  movePlayer(player2, -1);
});
onInput("l", () => {
  movePlayer(player2, 1);
});

function gameLoop() {
  if (!gameOver && gameStarted) {
    spawnAsteroid();
    spawnAlien();
    spawnPowerUp();
    moveAsteroids();
    movePowerUps();
    checkCollisions();
    moveAliens();
    checkCollisions();
    updatePowerUps();
    
    asteroidSpawnRate = Math.min(0.7, asteroidSpawnRate + 0.001);
    alienSpawnRate = Math.min(0.3, alienSpawnRate + 0.0005);
    powerUpSpawnRate = Math.min(0.08, powerUpSpawnRate + 0.0002);
    
    clearText();
    addText(`${timeLeft}`, { x: 0, y: 0, color: color`1` });
  } else if (gameOver) {
    clearText();
    if (winner === "Both Players") {
      addText("gjgj u both win", { x: 3, y: 4, color: color`6` });
    } else {
      addText("GAME OVER!", { x: 5, y: 4, color: color`3` });
      addText(`${winner} Wins!`, { x: 3, y: 6, color: color`2` });
    }
    addText("Press V to restart", { x: 1, y: 12, color: color`1` });
  } else {
    clearText();
    addText("< >", { x: 4, y: 14, color: color`1` });
    addText("< >", { x: 13, y: 14, color: color`1` });
    addText("Press V to start", { x: 2, y: 8, color: color`6` });
  }
}

onInput("k", () => {
  if (gameOver || !gameStarted) {
    resetGame();
  }
});

onInput("s", () => {
  if (gameOver || !gameStarted) {
    resetGame();
  }
});

setInterval(gameLoop, 200);
setInterval(updateTimer, 1000);

addStarsToBackground();
