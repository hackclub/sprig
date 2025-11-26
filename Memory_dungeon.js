/*
@title: Memory Dungeon
@author: J_Liu
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const wall = "w";
const darkWall = "d";
const trap = "t";
const enemy = "e";
const key = "k";
const exit = "x";
const floor = "f";

setLegend(
  [player, bitmap`
................
................
.....444444.....
....44222244....
....43222234....
....42266224....
....44222244....
.....444444.....
......4444......
.....422224.....
....4222F224....
.....422224.....
......4444......
.....44..44.....
....44....44....
................`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
L00000000000000L
L0CCCCCCCCCCCC0L
L0C0000000000C0L
L0C0LLLLLLLL0C0L
L0C0L......L0C0L
L0C0L......L0C0L
L0C0L......L0C0L
L0C0L......L0C0L
L0C0L......L0C0L
L0C0L......L0C0L
L0C0LLLLLLLL0C0L
L0C0000000000C0L
L0CCCCCCCCCCCC0L
L00000000000000L
LLLLLLLLLLLLLLLL`],
  [darkWall, bitmap`
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
  [trap, bitmap`
................
................
................
................
......3333......
.....333333.....
.....333333.....
.....333333.....
.....333333.....
.....333333.....
.....333333.....
......3333......
................
................
................
................`],
  [enemy, bitmap`
................
.....999999.....
....99333399....
...9933333399...
...9333333339...
...9333333339...
...9333333339...
....93333339....
.....999999.....
......9999......
.....933339.....
....93333339....
.....933339.....
......9..9......
.....99..99.....
....99....99....`],
  [key, bitmap`
................
................
......6666......
.....666666.....
.....66..66.....
.....666666.....
......6666......
......6666......
......6666......
......6666......
......66.66.....
......6666......
................
................
................
................`],
  [exit, bitmap`
................
................
..444444444444..
..4..........4..
..4..444444..4..
..4..4....4..4..
..4..4.44.4..4..
..4..4.44.4..4..
..4..4....4..4..
..4..444444..4..
..4..........4..
..444444444444..
................
................
................
................`],
  [floor, bitmap`
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
0000000000000000`]
);

setBackground(floor);
setSolids([player, wall, darkWall]);

let currentRoom = 0;
let previewMode = true;
let hasKey = false;
let enemyPositions = [];
let enemyPaths = [];
let roomLayout = [];
let stepsRemaining = 0;
let maxSteps = 0;
let isDead = false;
let enemyBlinkInterval = null;

// Room definitions
const rooms = [
  // Room 1: Simple introduction
  {
    map: map`
wwwwwwww
w......w
w..p...w
w......w
w....t.w
w......x
wwwwwwww`,
    preview: 2000,
    enemies: [],
    needsKey: false,
    maxSteps: 15
  },
  // Room 2: First maze
  {
    map: map`
wwwwwwwwww
w.p......w
w.wwww.w.w
w....w.w.w
wwww.w.w.w
w....w...w
w.wwwwww.w
w.t......x
wwwwwwwwww`,
    preview: 2200,
    enemies: [],
    needsKey: false,
    maxSteps: 20
  },
  // Room 3: Traps and moving enemy
  {
    map: map`
wwwwwwwwww
wp.......w
w.www.ww.w
w.t...tw.w
w.wwwwww.w
w.e......w
w.wwww.www
w........x
wwwwwwwwww`,
    preview: 2400,
    enemies: [{x: 2, y: 5, path: 'horizontal', range: 5}],
    needsKey: false,
    maxSteps: 25
  },
  // Room 4: Key required
  {
    map: map`
wwwwwwwwww
wp...w...w
w.ww.w.w.w
w.tw...w.w
wwww.www.w
w.k......w
w.wwwwww.w
w.t......x
wwwwwwwwww`,
    preview: 2600,
    enemies: [],
    needsKey: true,
    maxSteps: 30
  },
  // Room 5: Multiple enemies
  {
    map: map`
wwwwwwwwwwwwww
wp...........w
w.wwwwwwwwwwww
w..e.........w
w.wwwwwwww...w
w.t..........w
w.wwwwwwww...w
we...........w
wtwwwwwwww..xw
wk...........w
wwwwwwwwwwwwww`,
    preview: 2800,
    enemies: [
      {x: 3, y: 3, path: 'horizontal', range: 8},
      {x: 1, y: 7, path: 'horizontal', range: 11}
    ],
    needsKey: true,
    maxSteps: 41
  },
  // Room 6: Complex maze
  {
    map: map`
wwwwwwwwwwww
wp.w.......w
w..w.wwwww.w
ww.w.w...w.w
w..w.w.w.w.w
w.ww.w.w.w.w
w....w.w...w
wwww.w.www.w
wt...w...w.w
w.wwwwww.w.w
wk.e.....t.x
wwwwwwwwwwww`,
    preview: 3000,
    enemies: [{x: 3, y: 10, path: 'horizontal', range: 7}],
    needsKey: true,
    maxSteps: 80
  },
  // Room 7: Two patrolling enemies
  {
    map: map`
wwwwwwwwwwww
wp.wk...t..w
ww..w..t...w
wxw..w...t.w
w..w..wwww.w
w...w......w
w.w..wwwww.w
w.wt.......w
w.t...wwtt.w
w...t......w
wwwwwwwwwwww`,
    preview: 3200,
    enemies: [
    ],
    needsKey: true,
    maxSteps: 90
  },
  // Room 8: Tight corridors
  {
    map: map`
wwwwwwwwwwww
wp.w.......w
ww.w.wwwww.w
w....t...w.w
w.ww.www.w.w
w.tw...w.w.w
w.....ew.w.w
we.....w...w
w.wwwwwwww.w
wk.......w.x
wwwwwwwwwwww`,
    preview: 3400,
    enemies: [{x: 1, y: 7, path: 'horizontal', range: 5},
             ],
    needsKey: true,
    maxSteps: 100
  },
  // Room 9: Many traps
  {
    map: map`
wwwwwwwwwwww
wp.....t...w
w....t.....w
wt....t..ttw
w.t.t...t.kw
w......t..tw
w.t.t.t....w
w.t......t.w
w..t..t.t..w
w..........x
wwwwwwwwwwww`,
    preview: 3600,
    enemies: [],
    needsKey: true,
    maxSteps: 55
  },
  // Room 10: Final challenge
  {
    map: map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w.............................w
w.wwwwwwwwwwwwwwwwwwwwwwwwwww.w
w.w.......................kew.w
w.w.....................www.w.w
w.w..............wwwwwwww.w.w.w
w.w.www.....wwwwww........w.w.w
w.w.w..w....w.twww.w......w.w.w
w.w.w...wwwww..tww.w......w.w.w
w.w.w..............w......w.w.w
w.w.w.wwwwwwwwwwwwww......w.w.w
w.w.w.wpw.................w.w.w
w.w.w.w.w.................w.w.w
w.w.w.w.w.............ttttw.w.w
w.w.w.w.www...............w.w.w
w.w.w.w.www..wwwt.........w.w.w
w.w.w.w.wwwwt..wt.........w.w.w
w.w.w.w.wwwwwwx....ttttt..w.w.w
w.w.w.w.wwwww...t....ttt..w.w.w
w.w.w.w.wwwwwttt.......t..w.w.w
w.w.w.w.www...............w.w.w
w.w.w.w.www...............w.w.w
w.w.w.w.www...............w.w.w
w.w.w.w.ww................w.w.w
w.w.w.w...................w.w.w
w.w.w.wwwwwwwwwwwwwwwwwwwww.w.w
w.w.w.......................w.w
w...ww.wwwwwwwwwwwwwwwwwwwwww.w
wwwte.......................w.w
wwwe........wwwwwwwwwwwwwwwww.w
wwwwwwwwwww...................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
    preview: 10000,
    enemies: [
      {x: 27, y: 3, path: 'vertical', range: 23},
      {x: 4, y: 28, path: 'horizontal', range: 2},
      {x: 3, y: 29, path: 'horizontal', range: 7}
    ],
    needsKey: true,
    maxSteps: 670
  }
];

function loadRoom(roomNum) {
  if (roomNum >= rooms.length) {
    clearText();
    addText("You escaped!", { x: 4, y: 7, color: color`4` });
    addText("All rooms cleared!", { x: 2, y: 9, color: color`4` });
    if (enemyBlinkInterval) {
      clearInterval(enemyBlinkInterval);
      enemyBlinkInterval = null;
    }
    return;
  }
  
  const room = rooms[roomNum];
  setMap(room.map);
  previewMode = true;
  hasKey = false;
  enemyPositions = [];
  enemyPaths = [];
  maxSteps = room.maxSteps;
  stepsRemaining = maxSteps;
  isDead = false;
  
  // Clear any existing enemy blink interval
  if (enemyBlinkInterval) {
    clearInterval(enemyBlinkInterval);
    enemyBlinkInterval = null;
  }
  
  // Store the room layout for collision detection
  roomLayout = room.map.trim().split('\n').map(line => line.split(''));
  
  // Setup enemies
  for (let e of room.enemies) {
    enemyPositions.push({...e});
    enemyPaths.push({...e});
  }
  
  clearText();
  addText(`Room ${roomNum + 1}`, { x: 1, y: 1, color: color`2` });
  addText("Memorize!", { x: 5, y: 6, color: color`3` });
  
  // Start preview timer
  setTimeout(() => {
    enterDarkness();
  }, room.preview);
}

function updateDisplay() {
  clearText();
  addText(`R${currentRoom + 1}`, { x: 1, y: 1, color: color`2` });
  addText(`${stepsRemaining}`, { x: 17, y: 1, color: color`6` });
}

function enterDarkness() {
  previewMode = false;
  
  // Replace all walls with invisible dark walls
  const walls = getAll(wall);
  for (let w of walls) {
    const x = w.x;
    const y = w.y;
    w.remove();
    addSprite(x, y, darkWall);
  }
  
  // Remove traps, enemies, keys, and exits
  const allSprites = getAll();
  for (let sprite of allSprites) {
    if (sprite.type === trap || sprite.type === enemy || sprite.type === key || sprite.type === exit) {
      sprite.remove();
    }
  }
  
  updateDisplay();
  
  // Show "Navigate!" message briefly
  addText("Navigate!", { x: 5, y: 6, color: color`6` });
  setTimeout(() => {
    updateDisplay();
  }, 1000);
  
  // Start enemy blinking
  if (enemyPositions.length > 0) {
    enemyBlinkInterval = setInterval(() => {
      if (!isDead && !previewMode) {
        // Show enemies briefly
        for (let e of enemyPositions) {
          addSprite(e.x, e.y, enemy);
        }
        
        // Hide them after 200ms
        setTimeout(() => {
          const enemies = getAll(enemy);
          for (let e of enemies) {
            e.remove();
          }
        }, 200);
      }
    }, 1000);
  }
}

function checkCollision() {
  if (isDead) return;
  
  const p = getFirst(player);
  if (!p) return;
  
  const px = p.x;
  const py = p.y;
  
  // Check if position is valid
  if (py < 0 || py >= roomLayout.length || px < 0 || px >= roomLayout[py].length) {
    return;
  }
  
  const tile = roomLayout[py][px];
  
  // Check traps
  if (tile === 't') {
    isDead = true;
    playTune(tune`
150: c4-150,
150: g4-150,
150: c4-150,
4350: c4-150`);
    clearText();
    addText("TRAP!", { x: 7, y: 7, color: color`3` });
    setTimeout(() => loadRoom(currentRoom), 300);
    return;
  }
  
  // Check enemies
  for (let e of enemyPositions) {
    if (e.x === px && e.y === py) {
      isDead = true;
      playTune(tune`
150: c4-150,
150: g4-150,
150: c4-150,
4350: c4-150`);
      clearText();
      addText("CAUGHT!", { x: 6, y: 7, color: color`3` });
      setTimeout(() => loadRoom(currentRoom), 300);
      return;
    }
  }
  
  // Check key
  if (tile === 'k' && !hasKey) {
    hasKey = true;
    playTune(tune`
150: c5-150,
150: e5-150,
150: g5-150,
4350: c6-150`);
    addText("Key found!", { x: 5, y: 6, color: color`6` });
    setTimeout(() => {
      updateDisplay();
    }, 1000);
    // Mark key as collected in layout
    roomLayout[py][px] = '.';
  }
  
  // Check exit
  if (tile === 'x') {
    const room = rooms[currentRoom];
    if (room.needsKey && !hasKey) {
      playTune(tune`
150: c4-150,
4650: c4-150`);
      clearText();
      addText(`R${currentRoom + 1}`, { x: 1, y: 1, color: color`2` });
      addText(`${stepsRemaining}`, { x: 17, y: 1, color: color`6` });
      addText("Need key!", { x: 5, y: 6, color: color`3` });
      setTimeout(() => {
        updateDisplay();
      }, 1000);
      return;
    }
    
    isDead = true;
    if (enemyBlinkInterval) {
      clearInterval(enemyBlinkInterval);
      enemyBlinkInterval = null;
    }
    playTune(tune`
150: c5-150,
150: d5-150,
150: e5-150,
150: g5-150,
4200: c6-150`);
    currentRoom++;
    setTimeout(() => loadRoom(currentRoom), 500);
  }
}

function moveEnemies() {
  if (previewMode || isDead) return;
  
  for (let i = 0; i < enemyPositions.length; i++) {
    const e = enemyPositions[i];
    const path = enemyPaths[i];
    
    if (path.path === 'horizontal') {
      e.x += e.dx || 1;
      if (e.x >= path.x + path.range || e.x <= path.x) {
        e.dx = (e.dx || 1) * -1;
      }
    } else if (path.path === 'vertical') {
      e.y += e.dy || 1;
      if (e.y >= path.y + path.range || e.y <= path.y) {
        e.dy = (e.dy || 1) * -1;
      }
    }
  }
}

// Enemy movement loop
setInterval(() => {
  moveEnemies();
  checkCollision();
}, 500);

// Controls
onInput("w", () => {
  if (!previewMode && !isDead && stepsRemaining > 0) {
    const p = getFirst(player);
    const oldY = p.y;
    p.y -= 1;
    // Check if movement was blocked by wall
    if (p.y === oldY) {
      // Hit a wall, don't decrease steps
      return;
    }
    stepsRemaining--;
    updateDisplay();
    checkCollision();
    if (stepsRemaining === 0 && !isDead) {
      clearText();
      addText("Out of steps!", { x: 3, y: 7, color: color`3` });
      setTimeout(() => loadRoom(currentRoom), 500);
    }
  }
});

onInput("s", () => {
  if (!previewMode && !isDead && stepsRemaining > 0) {
    const p = getFirst(player);
    const oldY = p.y;
    p.y += 1;
    if (p.y === oldY) {
      return;
    }
    stepsRemaining--;
    updateDisplay();
    checkCollision();
    if (stepsRemaining === 0 && !isDead) {
      clearText();
      addText("Out of steps!", { x: 3, y: 7, color: color`3` });
      setTimeout(() => loadRoom(currentRoom), 500);
    }
  }
});

onInput("a", () => {
  if (!previewMode && !isDead && stepsRemaining > 0) {
    const p = getFirst(player);
    const oldX = p.x;
    p.x -= 1;
    if (p.x === oldX) {
      return;
    }
    stepsRemaining--;
    updateDisplay();
    checkCollision();
    if (stepsRemaining === 0 && !isDead) {
      clearText();
      addText("Out of steps!", { x: 3, y: 7, color: color`3` });
      setTimeout(() => loadRoom(currentRoom), 500);
    }
  }
});

onInput("d", () => {
  if (!previewMode && !isDead && stepsRemaining > 0) {
    const p = getFirst(player);
    const oldX = p.x;
    p.x += 1;
    if (p.x === oldX) {
      return;
    }
    stepsRemaining--;
    updateDisplay();
    checkCollision();
    if (stepsRemaining === 0 && !isDead) {
      clearText();
      addText("Out of steps!", { x: 3, y: 7, color: color`3` });
      setTimeout(() => loadRoom(currentRoom), 500);
    }
  }
});

onInput("j", () => {
  loadRoom(currentRoom);
});

// Start game
loadRoom(0);