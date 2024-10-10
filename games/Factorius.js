/*
@title: Factorius
@author: Hitu
@description: Rudimentary clone of Factorio
@tags: ['strategy', 'survival']
@img: "Factorius.png"
@addedOn: 2024-10-10
*/

const player = "p";
const coal = "c";
const iron = "i";
const turret = "t";
const biter = "b";
const mineIcon = "m";
const turretIcon = "u";
const hotbarSelection = "s";
const hotbarSlot = "h";
const ironCounterIcon = "x";
const coalCounterIcon = "y";
const timerIcon = "z";

const empty = "e";

const background = "g";


setLegend(
  [player, bitmap`
...6F6FF6F6...
..6F66FF66F6..
.66F6F66F6F66.
66F66F66F66F66
...11111111...
..1111111111..
..1111111111..
..1111111111..
...11111111...
....111111....
...LL1111LL...
..LLLLLLLLLL..
.LLLLLLLLLLLL.
.LL.LLLLLL.LL.
.LL.CCCCCC.LL.
....CC..CC....
`],
  [turret, bitmap`
......1111......
.....1111LLLLLLL
.....111LLL77777
.....11LLLLLLLLL
......LLLL......
......LLLL......
.....000000.....
....F666666F....
...F66666666F...
..F6666666666F..
.FFFFFFFFFFFFFF.
0000000000000000
`],
  [biter, bitmap`
4..........4
44........44
.4........4.
.DDDDDDDDDD.
DDCCDDDDCCDD
DD33DDDD33DD
DDDDDDDDDDDD
DDDDDDDDDDDD
.DDDDDDDDDD.
..44444444..
.4444444444.
.4444444444.
.D444444444.
..DDDDD444..
...DD..DD...
...DD..DD...
`],
  [mineIcon, bitmap`
...LLLLLLLLLLL.
..L11111111222L
..L11211111112L
...LLLLLLLLL11L
.........CCL11L
........CCCL11L
.......CCC.L11L
......CCC..L11L
.....CCC...L11L
....CCC....L21L
...CCC.....L11L
..CCC......L11L
.CCC........LL.
CCC............
CC.............
`],
  [turretIcon, bitmap`
......1111......
.....1111LLLLLLL
.....111LLL77777
.....11LLLLLLLLL
......LLLL......
......LLLL......
.....000000.....
....F666666F....
...F66666666F...
..F6666666666F..
.FFFFFFFFFFFFFF.
0000000000000000
`],
  [hotbarSelection, bitmap`
0000000000000000
0333333333333330
03............30
03............30
03............30
03............30
03............30
03............30
03............30
03............30
03............30
03............30
03............30
03............30
0333333333333330
0000000000000000
`],
  [hotbarSlot, bitmap`
0000000000000000
0000000000000000
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
0000000000000000
0000000000000000
`],
  [ironCounterIcon, bitmap`
................
................
......CCCC......
.....C....C.....
.....C....C.....
.....C....C.....
.....CCCCCC.....
.....C....C.....
.....C....C.....
.....C....C.....
.....C....C.....
.....CCCCCC.....
................
................
................
................`],
  [coalCounterIcon, bitmap`
................
................
......3333......
.....3....3.....
.....3....3.....
.....3....3.....
.....333333.....
.....3....3.....
.....3....3.....
.....3....3.....
.....3....3.....
.....333333.....
................
................
................
................`],
  [timerIcon, bitmap`
................
................
......7777......
.....7....7.....
.....7....7.....
.....7....7.....
.....777777.....
.....7....7.....
.....7....7.....
.....7....7.....
.....7....7.....
.....777777.....
................
................
................
................`],
  [coal, bitmap`
....0000....
..0000L000..
.00000LL000.
.0LL000LL00.
00L00000L000
00L000000L00
000000000000
000000001000
.0000011100.
.0001110000.
..00000000..
....0000....
`],
  [iron, bitmap`
....LLLL....
..LLLLLLLL..
.LLLL111LLL.
.L11LLL11LL.
LLLLLLLL1LLL
LLL1LLLL1LLL
LLL1LLLLLLLL
LLL11LLLL1LL
.LLL11LL11L.
.LLLL1L11LL.
..LLLLLLLL..
....LLLL....
`],
  [background, bitmap`
CCCCCCCCCCCCCCCC
C9CCCC99CCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCC99C
CCCCCCCCCCCCCC9C
CCC99CCCCCCCCCCC
CCCC99CCCCCCCCCC
CCCCC99CCCCCCCCC
CCCCCCCCCCCCCCC9
CCCCCCCCCCCCCC99
C99CCCCCCCCCCC9C
C99CCCCCCC99CCCC
CC9CCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCC9CCCCC99
CCCCCCCC99CCCCCC
`],
  [empty, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`]
);

setBackground(background);

// Initialize variables

let ironCount = 0;
let coalCount = 0;

let hotbar = [mineIcon, turretIcon];
let hotbarSelectionIndex = 0;

// Game state
let gameStarted = false;

let mapWidth = 20;
let mapHeight = 16;

let grid = [];
let biterSpawnInterval = 5000; // Spawn biters every 5 seconds
let biterCount = 0;
let round = 1;
let roundTime = 5000; // 5 seconds
let remainingTime = roundTime;

function generateMap() {
  // Generate an empty map
  grid = [];
  for (let y = 0; y < mapHeight; y++) {
    let row = "";
    for (let x = 0; x < mapWidth; x++) {
      row += empty;
    }
    grid.push(row);
  }

  // Randomly place coal and iron patches
  for (let i = 0; i < 10; i++) {
    let x = Math.floor(Math.random() * mapWidth);
    let y = Math.floor(Math.random() * mapHeight);
    let resourceType = Math.random() < 0.5 ? coal : iron;
    placeResourcePatch(x, y, resourceType);
  }

  // Place the player in the center
  grid[Math.floor(mapHeight / 2)] = replaceCharAt(
    grid[Math.floor(mapHeight / 2)],
    Math.floor(mapWidth / 2),
    player
  );

  setMap(grid.join('\n'));
}

function placeResourcePatch(x, y, resource) {
  // Make sure x and y are within bounds
  if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) return;

  // Place resource at (x, y)
  grid[y] = replaceCharAt(grid[y], x, resource);

  // Randomly expand the patch
  let directions = [
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
  ];

  for (let i = 0; i < 3; i++) {
    let dir = directions[Math.floor(Math.random() * directions.length)];
    let newX = x + dir.dx;
    let newY = y + dir.dy;
    if (newX >= 0 && newX < mapWidth && newY >= 0 && newY < mapHeight) {
      grid[newY] = replaceCharAt(grid[newY], newX, resource);
    }
  }
}

function replaceCharAt(str, index, char) {
  return str.substring(0, index) + char + str.substring(index + 1);
}

generateMap();

// Handle player input

onInput("w", () => {
  if (gameStarted) {
    movePlayer(0, -1);
  } else {
    startGame();
  }
});

onInput("s", () => {
  if (gameStarted) {
    movePlayer(0, 1);
  } else {
    startGame();
  }
});

onInput("a", () => {
  if (gameStarted) {
    movePlayer(-1, 0);
  } else {
    startGame();
  }
});

onInput("d", () => {
  if (gameStarted) {
    movePlayer(1, 0);
  } else {
    startGame();
  }
});

function movePlayer(dx, dy) {
  if (!gameStarted) return;
  let playerSprite = getFirst(player);
  if (!playerSprite) return;

  let newX = playerSprite.x + dx;
  let newY = playerSprite.y + dy;

  if (newX < 0 || newX >= mapWidth || newY < 0 || newY >= mapHeight) return;

  playerSprite.x = newX;
  playerSprite.y = newY;
}

// Cycle through hotbar
onInput("i", () => {
  if (gameStarted) {
    hotbarSelectionIndex = (hotbarSelectionIndex + 1) % hotbar.length;
    drawHotbar();
  } else {
    startGame();
  }
});

// Use selected hotbar item
onInput("j", () => {
  if (gameStarted) {
    useSelectedItem();
  } else {
    startGame();
  }
});

function useSelectedItem() {
  let selectedItem = hotbar[hotbarSelectionIndex];
  let playerSprite = getFirst(player);
  let x = playerSprite.x;
  let y = playerSprite.y;
  if (selectedItem === mineIcon) {
    let tileSprites = getTile(x, y);
    let resourceSprite = tileSprites.find(
      (s) => s.type === coal || s.type === iron
    );
    if (resourceSprite) {
      let amount = Math.floor(Math.random() * 3) + 1;
      if (resourceSprite.type === coal) {
        coalCount += amount;
      } else if (resourceSprite.type === iron) {
        ironCount += amount;
      }
      addText(`+${amount}`, { x: x, y: y - 1, color: color`5` });
    }
  } else if (selectedItem === turretIcon) {
    if (coalCount >= 50 && ironCount >= 50) {
      ironCount -= 50;
      coalCount -= 50;
      addSprite(x, y, turret);
    } else {
      addText("Not enough resources", { y: 7, color: color`2` });
    }
  }
  updateCounters();
}

function updateCounters() {
  addText(`Iron:${ironCount}`, { x: 1, y: 1, color: color`2` });
  addText(`Coal:${coalCount}`, { x: 1, y: 2, color: color`2` });
}

// Draw hotbar
function drawHotbar() {
  // Remove existing hotbar
  getAll(mineIcon).forEach((s) => s.remove());
  getAll(turretIcon).forEach((s) => s.remove());
  getAll(hotbarSelection).forEach((s) => s.remove());
  getAll(hotbarSlot).forEach((s) => s.remove());

  // Draw hotbar icons
  for (let i = 0; i < hotbar.length; i++) {
    addSprite(i, mapHeight - 1, hotbarSlot);
    addSprite(i, mapHeight - 1, hotbar[i]);
  }

  // Draw selection box
  addSprite(hotbarSelectionIndex, mapHeight - 1, hotbarSelection);
}

drawHotbar();

// Game loop

function gameLoop() {
  if (!gameStarted) return;

  clearText();
  updateCounters();

  // Decrease timer
  remainingTime -= 1000;
  if (remainingTime <= 0) {
    // Start new round
    round++;
    remainingTime = roundTime + round * 2000;
    if (round > 10) {
      spawnBiters(round * 2);
    } else {
      spawnBiters(round + 5);
    }
  }
  // Update timer display
  addText(`Time:${Math.ceil(remainingTime / 1000)}`, { x: 1, y: 3, color: color`2` });
  // Move biters towards player
  moveBiters();

  // Player automatically shoots at biters
  shootBiters();

  // Turrets shoot at biters
  turretsShoot();

  // Loop
  setTimeout(gameLoop, 1000);
}

function spawnBiters(number) {
  for (let i = 0; i < number; i++) {
    let edge = Math.floor(Math.random() * 4);
    let x, y;
    if (edge === 0) {
      // Top edge
      x = Math.floor(Math.random() * mapWidth);
      y = 0;
    } else if (edge === 1) {
      // Bottom edge
      x = Math.floor(Math.random() * mapWidth);
      y = mapHeight - 1;
    } else if (edge === 2) {
      // Left edge
      x = 0;
      y = Math.floor(Math.random() * mapHeight);
    } else {
      // Right edge
      x = mapWidth - 1;
      y = Math.floor(Math.random() * mapHeight);
    }
    addSprite(x, y, biter);
  }
}

function moveBiters() {
  let playerSprite = getFirst(player);
  let playerX = playerSprite.x;
  let playerY = playerSprite.y;
  getAll(biter).forEach((biterSprite) => {
    let dx = Math.sign(playerX - biterSprite.x);
    let dy = Math.sign(playerY - biterSprite.y);
    biterSprite.x += dx;
    biterSprite.y += dy;

    // Check if biter reached player
    if (biterSprite.x === playerX && biterSprite.y === playerY) {
      // Game over
      gameOver(); // Call gameOver() function
    }
  });
}

function shootBiters() {
  let biters = getAll(biter);
  if (biters.length > 0) {
    // Remove one biter
    biters[0].remove();
  }
}

function turretsShoot() {
  let turrets = getAll(turret);
  let biters = getAll(biter);
  turrets.forEach((turretSprite) => {
    if (biters.length > 0) {
      // Remove a biter
      biters[0].remove();
      biters.shift();
    }
  });
}

function gameOver() {
  clearText();
  gameStarted = false;
  // Display game over text
  addText("Game Over!", { y: 6, color: color`7` });
  addText(`You reached round ${round}`, { y: 7, color: color`7` });
  addText("Press any key", { y: 8, color: color`4` });
  addText("to restart", { y: 9, color: color`4` });
}

// Title screen
addText("-- Factorius --", { y: 6, color: color`6` });
addText("Press any key", { y: 7, color: color`4` });
addText("to start", { y: 8, color: color`4` });

function startGame() {
  if (!gameStarted) {
    // Reset variables
    ironCount = 0;
    coalCount = 0;
    hotbarSelectionIndex = 0;
    gameStarted = true;
    biterSpawnInterval = 5000;
    biterCount = 0;
    round = 1;
    roundTime = 5000;
    remainingTime = roundTime;
    clearText();
    clearInterval();
    drawHotbar();
    updateCounters();
    setTimeout(gameLoop, 1000);
  }
}

function removeStartInputListeners() {
  onInput("w", null);
  onInput("a", null);
  onInput("s", null);
  onInput("d", null);
  onInput("i", null);
  onInput("j", null);
  onInput("k", null);
}

