/*
@title: pumpkin_hunt
@author: Elijah R. Spitzer
@tags: []
@addedOn: 2024-10-31
*/

const collectSound = tune`
  80: g5~80,
  80: c6~80,
  80: g6~80`;

const iceEffectSound = tune`
245.9016393442623: E5~245.9016393442623 + C5~245.9016393442623,
245.9016393442623: E5~245.9016393442623 + C5~245.9016393442623,
7377.049180327869`;

const suckEffectSound = tune`
120: C4~120 + E4~120 + F5~120 + D5~120,
120: D4~120 + G5~120 + E5~120,
120: E4~120 + A4~120 + A5~120 + F5~120,
3480`;

const gameStartSound = tune`
  100: c5~100,
  100: e5~100,
  100: g5~100,
  100: c6~100`;

const gameOverSound = tune`
  150: g4~150,
  150: e4~150,
  150: c4~150`;

const player = "p";
const wall = "w";
const pumpkin = "k";
const ice = "i";
const suck = "s";
const floor = "f";
let score = 0;
let timeLeft = 60;
let spawnTimer = 0;
let iceSpawnTimer = 0;
let suckSpawnTimer = 0;
let iceEffectTime = 0;
let gameOver = false;
let movePressCount = { w: 0, a: 0, s: 0, d: 0 };

const speeds = {
  Slow: 5,
  Regular: 2.5,
  Fast: 1,
};
let currentSpeed = "Regular";
let pumpkinSpawnInterval = speeds[currentSpeed];
let showSpeedMenu = false; 
let speedMenuTimer = null;

setLegend(
  [ player, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDHHHHHHDDDDD
DDDHHHHHHHHHHDDD
DDDHHHHHHHHHHDDD
DDHH00HHHH00HHDD
DDHH00HHHH00HHDD
DDHHHHHHHHHHHHDD
DDHHHHH00HHHHHDD
DDHHHHHHHHHHHHDD
DDHHH0HHHH0HHHDD
DDDHHH0000HHHDDD
DDDHHHHHHHHHHDDD
DDDDDHHHHHHDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`
  ],
  [ wall, bitmap`
CCCCCCCCCCCCCCCC
CCCCFFFCCCCCCCCC
CCCCCCCFFCCCCCCC
CCFFFFFCCFFCCCCC
CCCCCCCFCCFFFCCC
CCCCCCCCCCCCCCCC
CCCCFFFFCCCCCCCC
CCCCCCCCFFFFCCCC
CCCFFFCCCCCCFCCC
CCCCCFFFFFFCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCFFFFFCCCCC
CCCCCCCCCCCFFFFF
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`
  ],
  [ pumpkin, bitmap`
DDDDDD4444DDDDDD
DDDDDD4444DDDDDD
DDDDDDDD44DDDDDD
DDDD99999999DDDD
DDD9999999999DDD
DD999099990999DD
D99990999909999D
D99000999900099D
D99999999999999D
D99999900999999D
D99999999999999D
D99900999900999D
DD999900009999DD
DDD9999999999DDD
DDDD99999999DDDD
DDDDDDDDDDDDDDDD`
  ],
  [ ice, bitmap`
................
................
................
...7755555555...
...7557555555...
...5555757755...
...5575575575...
...5575577555...
...5577557555...
...5557555555...
...5557777555...
...5555557755...
...5555555555...
................
................
................`
  ],
  [ suck, bitmap`
................
................
................
.....HHHHHH.....
....HHH88HHH....
...H88HH8HHHH...
...HH8HHH8HHH...
...HH88HHHH8H...
...HHH8HH8H8H...
...HHH88H8H88...
...HHHH8H8HHH...
....HHHHHHHH....
.....HHHHHH.....
................
................
................`
  ],
  [ floor, bitmap`
DDDDDDDDDDDDDDDD
DD4D4D4DDDDDDDDD
DDDDDD444DDDDDDD
DDDDDDDDD4DDDDDD
DD4DD4DDDD4DDDDD
DD44DDDD4DDDDDDD
DDD44DDDDDDDDDDD
DDDDD44DDDDDDDDD
DDDDDDD4444444DD
D4DDDDDDDDDDD44D
D4DDDDDDDDDDDDDD
DD44DDDD4DDDDDDD
DDD44DDD44444DDD
DDDDD444444DD444
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`
  ]
);

const mazeWidth = 16;
const mazeHeight = 16;
let maze = Array.from({ length: mazeHeight }, () => Array(mazeWidth).fill(wall));

function spawnPumpkin() {
  let attempts = 0;
  const maxAttempts = 100;
  while (attempts < maxAttempts) {
    let x = Math.floor(Math.random() * mazeWidth);
    let y = Math.floor(Math.random() * mazeHeight);
    if (maze[y][x] === floor && getTile(x, y).every(s => s.type === floor)) {
      addSprite(x, y, pumpkin);
      return true;
    }
    attempts++;
  }
  return false;
}

function spawnIce() {
  let attempts = 0;
  const maxAttempts = 100;
  while (attempts < maxAttempts) {
    let x = Math.floor(Math.random() * mazeWidth);
    let y = Math.floor(Math.random() * mazeHeight);
    if (maze[y][x] === floor && getTile(x, y).every(s => s.type === floor)) {
      addSprite(x, y, ice);
      return true;
    }
    attempts++;
  }
  return false;
}

function spawnSuck() {
  let attempts = 0;
  const maxAttempts = 100;
  while (attempts < maxAttempts) {
    let x = Math.floor(Math.random() * mazeWidth);
    let y = Math.floor(Math.random() * mazeHeight);
    if (maze[y][x] === floor && getTile(x, y).every(s => s.type === floor)) {
      addSprite(x, y, suck);
      return true;
    }
    attempts++;
  }
  return false;
}

function suckPumpkinsNearby(playerX, playerY) {
  const radius = 10;
  let collectedPumpkins = 0;

  let pumpkins = getAll(pumpkin);
  pumpkins.forEach(p => {
    let distance = Math.sqrt(Math.pow(p.x - playerX, 2) + Math.pow(p.y - playerY, 2));
    if (distance <= radius) {
      p.remove();
      collectedPumpkins++;
    }
  });

  score += collectedPumpkins;
}

function clearSprites() {
  getAll().forEach((sprite) => sprite.remove());
}

function resetGame() {
  score = 0;
  timeLeft = 60;
  spawnTimer = 0;
  iceSpawnTimer = 0;
  suckSpawnTimer = 0;
  iceEffectTime = 0;
  gameOver = false;
  movePressCount = { w: 0, a: 0, s: 0, d: 0 };
  pumpkinSpawnInterval = speeds[currentSpeed];
  clearSprites();
  generateMaze();
  let mapString = maze.map(row => row.join("")).join("\n");
  setMap(mapString);
  placeEntities();
  playTune(gameStartSound);
}

function generateMaze() {
  for (let y = 0; y < mazeHeight; y++) {
    for (let x = 0; x < mazeWidth; x++) {
      maze[y][x] = wall;
    }
  }
  let stack = [{ x: 1, y: 1 }];
  maze[1][1] = floor;

  while (stack.length > 0) {
    let current = stack.pop();
    let directions = [
      { x: 0, y: -2 },
      { x: 2, y: 0 },
      { x: 0, y: 2 },
      { x: -2, y: 0 }
    ];
    for (let i = directions.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }
    for (let dir of directions) {
      let nx = current.x + dir.x;
      let ny = current.y + dir.y;
      if (
        nx > 0 &&
        ny > 0 &&
        nx < mazeWidth - 1 &&
        ny < mazeHeight - 1 &&
        maze[ny][nx] === wall
      ) {
        maze[ny][nx] = floor;
        maze[current.y + dir.y / 2][current.x + dir.x / 2] = floor;
        stack.push({ x: nx, y: ny });
      }
    }
  }
}

function placeEntities() {
  addSprite(1, 1, player);
  for (let i = 0; i < 3; i++) {
    spawnPumpkin();
  }
}

function updateDisplay() {
  clearText();
  addText(`Score: ${score}`, { x: 1, y: 1, color: color`6` });
  addText(`Time: ${timeLeft}`, { x: 1, y: 0, color: color`6` });
  
  if (showSpeedMenu) {
    addText(`Speed: ${currentSpeed}`, { x: 1, y: 2, color: color`6` });
  }
  
  if (iceEffectTime > 0) {
    addText(`Ice: ${iceEffectTime}`, { x: 12, y: 0, color: color`5` });
  }

  if (gameOver) {
    addText("Game Over!", { y: 6, color: color`6` });
    addText("Happy Halloween!", { y: 7, color: color`6` });
    addText(`Final Score: ${score}`, { y: 8, color: color`6` });
    addText("Press k to", { y: 10, color: color`3` });
    addText("play again!", { y: 12, color: color`3` });
  }
}

generateMaze();
let mapString = maze.map(row => row.join("")).join("\n");
setMap(mapString);
placeEntities();
setSolids([player, wall]);

function handleMovement(key) {
  if (iceEffectTime > 0) {
    movePressCount[key]++;
    if (movePressCount[key] % 2 !== 0) return;
  }
  let p = getFirst(player);
  if (key === "w" && getTile(p.x, p.y - 1).every(s => s.type !== wall)) p.y -= 1;
  if (key === "a" && getTile(p.x - 1, p.y).every(s => s.type !== wall)) p.x -= 1;
  if (key === "s" && getTile(p.x, p.y + 1).every(s => s.type !== wall)) p.y += 1;
  if (key === "d" && getTile(p.x + 1, p.y).every(s => s.type !== wall)) p.x += 1;
}

onInput("w", () => handleMovement("w"));
onInput("a", () => handleMovement("a"));
onInput("s", () => handleMovement("s"));
onInput("d", () => handleMovement("d"));
onInput("k", () => {
  if (gameOver) {
    resetGame();
  }
});

onInput("i", () => {
  if (currentSpeed === "Regular") {
    currentSpeed = "Fast";
  } else if (currentSpeed === "Fast") {
    currentSpeed = "Slow";
  } else {
    currentSpeed = "Regular";
  }
  pumpkinSpawnInterval = speeds[currentSpeed];
  showSpeedMenu = true;

  if (speedMenuTimer) clearTimeout(speedMenuTimer);
  speedMenuTimer = setTimeout(() => {
    showSpeedMenu = false;
    updateDisplay();
  }, 1000);
});

setInterval(() => {
  if (!gameOver) {
    timeLeft--;
    spawnTimer++;
    if (spawnTimer >= pumpkinSpawnInterval) {
      spawnPumpkin();
      spawnTimer = 0;
    }

    iceSpawnTimer++;
    if (iceSpawnTimer >= 10) {
      spawnIce();
      iceSpawnTimer = 0;
    }

    suckSpawnTimer++;
    if (suckSpawnTimer >= 20) {
      spawnSuck();
      suckSpawnTimer = 0;
    }

    if (iceEffectTime > 0) iceEffectTime--;

    if (timeLeft <= 0) {
      gameOver = true;
      timeLeft = 0;
      playTune(gameOverSound);
    }
  }
  updateDisplay();
}, 1000);

afterInput(() => {
  if (gameOver) return;

  let p = getFirst(player);
  let pumpkins = getAll(pumpkin);
  let ices = getAll(ice);
  let sucks = getAll(suck);

  pumpkins.forEach(k => {
    if (k.x === p.x && k.y === p.y) {
      k.remove();
      score += 1;
      playTune(collectSound);
    }
  });

  ices.forEach(i => {
    if (i.x === p.x && i.y === p.y) {
      i.remove();
      iceEffectTime = 5;
      movePressCount = { w: 0, a: 0, s: 0, d: 0 };
      playTune(iceEffectSound);
    }
  });

  sucks.forEach(s => {
    if (s.x === p.x && s.y === p.y) {
      s.remove();
      suckPumpkinsNearby(p.x, p.y);
      playTune(suckEffectSound);
    }
  });

  updateDisplay();
});
