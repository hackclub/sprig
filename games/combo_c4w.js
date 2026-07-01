/*
@title: Combo C4W!
@description: A Center-4-wide Tetris practicer that implements the full guideline, including 7 bag randomizers and SRS kicks.
@author: MeBadDev
@tags: ['tetris', 'puzzle']
@addedOn: 2026-02-09
*/

const WIDTH = 4;
const WELL_X = 6;
const MAP_WIDTH = 16; // Total map width
const HEIGHT = 20;
const MAX_LOCK_DELAY = 5000; // Time (ms) allowed on floor before auto-lock

setLegend(
  ["E", bitmap`
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
................`],
  ["I", bitmap`
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
  ["i", bitmap`
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
  ["O", bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  ["o", bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  ["T", bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  ["t", bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  ["S", bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  ["s", bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  ["Z", bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  ["z", bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  ["J", bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  ["j", bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  ["L", bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  ["l", bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  ["G", bitmap`
1111111111111111
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1111111111111111`],
  ["B", bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
)

setSolids([]);

// Patterns for the 3 residual blocks
const RESIDUAL_PATTERNS = [
  { type: 's', coords: [
      [2, 19],
      [3, 19],
      [1, 18]
    ] },
  { type: 'i', coords: [
      [1, 19],
      [2, 19],
      [3, 19]
    ] },
  { type: 't', coords: [
      [2, 19],
      [1, 19],
      [2, 18]
    ] },
  { type: 'j', coords: [
      [3, 19],
      [3, 18],
      [3, 17]
    ] },
  { type: 'l', coords: [
      [1, 19],
      [2, 19],
      [2, 18]
    ] }
];

function resetMap() {
  clearText()
  setMap(map`
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
................
................
................
................
................`);

  // Draw border
  for (let y = 0; y < HEIGHT; y++) {
    addSprite(WELL_X - 1, y, "B");
    addSprite(WELL_X + WIDTH, y, "B");
  }

  const pattern = RESIDUAL_PATTERNS[Math.floor(Math.random() * RESIDUAL_PATTERNS.length)];
  pattern.coords.forEach(([rx, ry]) => {
    addSprite(rx + WELL_X, ry, pattern.type);
  });
}

const TYPES = ["I", "O", "T", "S", "Z", "J", "L"];
const PIECES = [
  [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0]
    ],
    [
      [1, -1],
      [1, 0],
      [1, 1],
      [1, 2]
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1]
    ],
    [
      [2, -1],
      [2, 0],
      [2, 1],
      [2, 2]
    ]
  ], // I
  [
    [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1]
    ]
  ], // O
  [
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1]
    ],
    [
      [1, 0],
      [1, 1],
      [2, 1],
      [1, 2]
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [1, 2]
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, 2]
    ]
  ], // T
  [
    [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1]
    ],
    [
      [1, 0],
      [1, 1],
      [2, 1],
      [2, 2]
    ],
    [
      [1, 1],
      [2, 1],
      [0, 2],
      [1, 2]
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2]
    ]
  ], // S
  [
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1]
    ],
    [
      [2, 0],
      [1, 1],
      [2, 1],
      [1, 2]
    ],
    [
      [0, 1],
      [1, 1],
      [1, 2],
      [2, 2]
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2]
    ]
  ], // Z
  [
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1]
    ],
    [
      [1, 0],
      [2, 0],
      [1, 1],
      [1, 2]
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 2]
    ],
    [
      [1, 0],
      [1, 1],
      [0, 2],
      [1, 2]
    ]
  ], // J
  [
    [
      [2, 0],
      [0, 1],
      [1, 1],
      [2, 1]
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 2]
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 2]
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2]
    ]
  ] // L
];

// SRS Data
const SRS_KICKS = {
  "0->1": [
    [0, 0],
    [-1, 0],
    [-1, 1],
    [0, -2],
    [-1, -2]
  ],
  "1->0": [
    [0, 0],
    [1, 0],
    [1, -1],
    [0, 2],
    [1, 2]
  ],
  "1->2": [
    [0, 0],
    [1, 0],
    [1, -1],
    [0, 2],
    [1, 2]
  ],
  "2->1": [
    [0, 0],
    [-1, 0],
    [-1, 1],
    [0, -2],
    [-1, -2]
  ],
  "2->3": [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, -2],
    [1, -2]
  ],
  "3->2": [
    [0, 0],
    [-1, 0],
    [-1, -1],
    [0, 2],
    [-1, 2]
  ],
  "3->0": [
    [0, 0],
    [-1, 0],
    [-1, -1],
    [0, 2],
    [-1, 2]
  ],
  "0->3": [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, -2],
    [1, -2]
  ],
};

const SRS_KICKS_I = {
  "0->1": [
    [0, 0],
    [-2, 0],
    [1, 0],
    [-2, -1],
    [1, 2]
  ],
  "1->0": [
    [0, 0],
    [2, 0],
    [-1, 0],
    [2, 1],
    [-1, -2]
  ],
  "1->2": [
    [0, 0],
    [-1, 0],
    [2, 0],
    [-1, 2],
    [2, -1]
  ],
  "2->1": [
    [0, 0],
    [1, 0],
    [-2, 0],
    [1, -2],
    [-2, 1]
  ],
  "2->3": [
    [0, 0],
    [2, 0],
    [-1, 0],
    [2, 1],
    [-1, -2]
  ],
  "3->2": [
    [0, 0],
    [-2, 0],
    [1, 0],
    [-2, -1],
    [1, 2]
  ],
  "3->0": [
    [0, 0],
    [1, 0],
    [-2, 0],
    [1, -2],
    [-2, 1]
  ],
  "0->3": [
    [0, 0],
    [-1, 0],
    [2, 0],
    [-1, 2],
    [2, -1]
  ],
  // I-piece 180s
  "0->2": [
    [0, 0],
    [-1, 0],
    [-2, 0],
    [1, 0],
    [2, 0],
    [0, 1]
  ],
  "2->0": [
    [0, 0],
    [1, 0],
    [2, 0],
    [-1, 0],
    [-2, 0],
    [0, -1]
  ],
  "1->3": [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, -1],
    [0, -2],
    [-1, 0]
  ],
  "3->1": [
    [0, 0],
    [0, -1],
    [0, -2],
    [0, 1],
    [0, 2],
    [1, 0]
  ]
};

let current = null;
let isGameOver = false;
let bag = [];
let nextQueue = [];
let heldPiece = null;
let canHold = true;
let combo = 0;
let lockTimer = null;

function refillBag() {
  let newBag = [...TYPES];
  for (let i = newBag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newBag[i], newBag[j]] = [newBag[j], newBag[i]];
  }
  bag = bag.concat(newBag);
}

function getNextFromBag() {
  if (bag.length <= 7) refillBag();
  return bag.shift();
}

function spawnPiece() {
  if (isGameOver) return;
  while (nextQueue.length < 6) nextQueue.push(getNextFromBag());
  const type = nextQueue.shift();
  const shapeIndex = TYPES.indexOf(type);
  current = { shape: PIECES[shapeIndex], rot: 0, x: 0, y: -1, type: type };
  lockTimer = null;
  if (collides(0, 0)) gameOver();
}

function cells(rot = current.rot, dx = 0, dy = 0) {
  return current.shape[rot].map(([x, y]) => [current.x + x + dx, current.y + y + dy]);
}

function collides(dx, dy, rot = current.rot) {
  return cells(rot, dx, dy).some(([x, y]) => {
    if (x < 0 || x >= WIDTH || y >= HEIGHT) return true;
    if (y < 0) return false;
    const tiles = getTile(x + WELL_X, y);
    return tiles.some(t => t.type !== "G" && !TYPES.includes(t.type));
  });
}

function clearCurrentOnly() {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = WELL_X; x < WELL_X + WIDTH; x++) {
      getTile(x, y).forEach(t => {
        if (TYPES.includes(t.type) || t.type === "G") clearTile(x, y);
      });
    }
  }
}

function resetLockTimer() {
  if (collides(0, 1)) {
    if (lockTimer === null) lockTimer = Date.now();
  } else {
    lockTimer = null;
  }
}

function hold() {
  if (!canHold || isGameOver) return;
  clearCurrentOnly();
  const typeToHold = current.type;
  if (heldPiece === null) {
    heldPiece = typeToHold;
    spawnPiece();
  } else {
    const temp = heldPiece;
    heldPiece = typeToHold;
    current = { shape: PIECES[TYPES.indexOf(temp)], rot: 0, x: 0, y: -1, type: temp };
  }
  canHold = false;
  lockTimer = null;
  drawPiece();
}

function drawPiece() {
  if (isGameOver || !current) return;
  clearCurrentOnly();
  let drop = 0;
  while (!collides(0, drop + 1)) drop++;
  cells(current.rot, 0, drop).forEach(([x, y]) => {
    if (y >= 0 && y < HEIGHT) addSprite(x + WELL_X, y, "G");
  });
  cells().forEach(([x, y]) => {
    if (y >= 0 && y < HEIGHT) addSprite(x + WELL_X, y, current.type);
  });
  drawUI();
}

function drawUI() {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      if (x < WELL_X - 1 || x > WELL_X + WIDTH) {
        while (getTile(x, y).length > 0) clearTile(x, y);
      }
    }
  }
  if (heldPiece) {
    PIECES[TYPES.indexOf(heldPiece)][0].forEach(([px, py]) => {
      addSprite(px + 1, py + 1, heldPiece.toLowerCase());
    });
  }
  nextQueue.slice(0, 4).forEach((type, index) => {
    PIECES[TYPES.indexOf(type)][0].forEach(([px, py]) => {
      addSprite(12 + px, (index * 5) + 1 + py, type.toLowerCase());
    });
  });
  if (combo > 0) addText(`${combo}`, { x: 5, y: 7, color: color`5` });
  else clearText();
}

function lockPiece() {
  const settledType = current.type.toLowerCase();
  clearCurrentOnly();
  cells().forEach(([x, y]) => {
    if (y >= 0 && y < HEIGHT) {
      clearTile(x + WELL_X, y);
      addSprite(x + WELL_X, y, settledType);
    } else if (y < 0) isGameOver = true;
  });
  if (isGameOver) { gameOver(); return; }
  clearLines();
  canHold = true;
  spawnPiece();
  if (current) drawPiece();
}

function clearLines() {
  let linesCleared = 0;
  for (let y = HEIGHT - 1; y >= 0; y--) {
    let full = true;
    for (let x = 0; x < WIDTH; x++) {
      if (!getTile(x + WELL_X, y).some(t => t.type !== "G")) { full = false; break; }
    }
    if (full) {
      linesCleared++;
      for (let yy = y; yy > 0; yy--) {
        for (let x = 0; x < WIDTH; x++) {
          clearTile(x + WELL_X, yy);
          const upper = getTile(x + WELL_X, yy - 1).filter(t => t.type !== "G");
          if (upper.length > 0) addSprite(x + WELL_X, yy, upper[0].type.toLowerCase());
        }
      }
      for (let x = 0; x < WIDTH; x++) clearTile(x + WELL_X, 0);
      y++;
    }
  }
  if (linesCleared > 0) combo++;
  else combo = 0;
}

function rotate(dir) {
  if (isGameOver || !current || current.type === "O") return;
  const oldRot = current.rot;
  const newRot = (oldRot + dir + current.shape.length) % current.shape.length;
  const kickSet = (current.type === "I") ? SRS_KICKS_I : SRS_KICKS;
  const kicks = kickSet[`${oldRot}->${newRot}`] || [
    [0, 0]
  ];
  clearCurrentOnly();
  for (let i = 0; i < kicks.length; i++) {
    const [kx, ky] = kicks[i];
    if (!collides(kx, -ky, newRot)) {
      current.x += kx;
      current.y -= ky;
      current.rot = newRot;
      resetLockTimer();
      drawPiece();
      return;
    }
  }
  drawPiece();
}

onInput("a", () => { if (!collides(-1, 0)) { current.x -= 1;
    resetLockTimer();
    drawPiece(); } });
onInput("d", () => { if (!collides(1, 0)) { current.x += 1;
    resetLockTimer();
    drawPiece(); } });

onInput("s", () => {
  if (isGameOver) { resetMap();
    refillBag();
    spawnPiece();
    drawPiece();
    isGameOver = false; } else { while (!collides(0, 1)) current.y++;
    lockPiece(); }
});

onInput("w", () => {
  if (!isGameOver) { while (!collides(0, 1)) current.y++;
    resetLockTimer();
    drawPiece(); }
});

onInput("j", () => rotate(-1));
onInput("l", () => rotate(1));
onInput("k", () => hold());

function tick() {
  if (isGameOver) return;
  if (!collides(0, 1)) {
    current.y++;
    lockTimer = null;
    drawPiece();
  } else {
    if (lockTimer === null) lockTimer = Date.now();
    else if (Date.now() - lockTimer >= MAX_LOCK_DELAY) lockPiece();
  }
}

function gameOver() {
  isGameOver = true;
  clearText();
  addText("GAME OVER", { x: 5, y: 8, color: color`3` });
  addText("HD - restart", { x: 4, y: 10, color: color`0` });
}

resetMap();
refillBag();
spawnPiece();
drawPiece();
setInterval(tick, 100);
