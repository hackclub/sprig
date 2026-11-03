
const P = "p";
const S = "s";
const E = "e";
const B = "b";
const H = "h";
const V = "v";
const NE = "n";
const ES = "r";
const SW = "q";
const WN = "m";

// ---------- GRAPHICS ----------

const playerArt = bitmap`
................
......777.......
.....77777......
....7777777.....
....7777777.....
....7777777.....
.....77777......
......777.......
......777.......
.....77777......
....77...77.....
...77.....77....
................
................
................
................`;

const sourceArt = bitmap`
................
......3333......
.....333333.....
....33333333....
...3333333333...
...3333333333...
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......
......3333......
.....333333.....
................
................
................`;

const exitArt = bitmap`
................
......4444......
.....444444.....
....44....44....
...44......44...
...44......44...
...44......44...
....44....44....
.....444444.....
......4444......
.......44.......
......4444......
.....444444.....
................
................
................`;

const blockArt = bitmap`
5555555555555555
5666666666666665
5655555555555565
5656666666666565
5656555555556565
5656566666656565
5656565555656565
5656565555656565
5656565555656565
5656565555656565
5656566666656565
5656555555556565
5656666666666565
5655555555555565
5666666666666665
5555555555555555`;

const horizontalArt = bitmap`
................
................
................
................
................
................
6666666666666666
6666666666666666
6666666666666666
6666666666666666
................
................
................
................
................
................`;

const verticalArt = bitmap`
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......`;

const northEastArt = bitmap`
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......
......6666666666
......6666666666
......6666666666
......6666666666
................
................
................
................
................
................`;

const eastSouthArt = bitmap`
................
................
................
................
................
................
......6666666666
......6666666666
......6666666666
......6666666666
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......`;

const southWestArt = bitmap`
................
................
................
................
................
................
6666666666......
6666666666......
6666666666......
6666666666......
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......`;

const westNorthArt = bitmap`
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......
6666666666......
6666666666......
6666666666......
6666666666......
................
................
................
................
................
................`;

// ---------- SPRITE LEGEND ----------

setLegend(
  [P, playerArt],
  [S, sourceArt],
  [E, exitArt],
  [B, blockArt],
  [H, horizontalArt],
  [V, verticalArt],
  [NE, northEastArt],
  [ES, eastSouthArt],
  [SW, southWestArt],
  [WN, westNorthArt]
);

// ---------- LEVELS ----------
// max = maximum total wires allowed.
// All levels have different obstacle layouts.

const levels = [
  {
    name: "FIRST CIRCUIT",
    max: 16,
    start: [1, 6],
    blocks: []
  },
  {
    name: "THE WALL",
    max: 18,
    start: [1, 6],
    blocks: [
      "3,1", "3,2", "3,3", "3,4",
      "6,2", "6,3", "6,4"
    ]
  },
  {
    name: "DOUBLE DETOUR",
    max: 20,
    start: [1, 6],
    blocks: [
      "2,1", "2,2", "2,3",
      "5,3", "5,4", "5,5",
      "7,1", "7,2", "7,3"
    ]
  },
  {
    name: "CROSSROADS",
    max: 21,
    start: [1, 6],
    blocks: [
      "3,1", "3,2", "3,3", "3,5",
      "5,2", "5,3", "5,4",
      "7,3", "7,4", "7,5"
    ]
  },
  {
    name: "THE CHICANE",
    max: 22,
    start: [1, 6],
    blocks: [
      "2,1", "3,1", "4,1",
      "5,3", "5,4", "5,5",
      "7,4", "7,5"
    ]
  },
  {
    name: "NARROW PASSAGE",
    max: 23,
    start: [1, 6],
    blocks: [
      "2,2", "3,2", "4,2", "5,2",
      "2,4", "3,4", "4,4",
      "6,3", "6,4", "6,5"
    ]
  },
  {
    name: "ZIGZAG",
    max: 24,
    start: [1, 6],
    blocks: [
      "2,1", "2,2", "2,3",
      "4,4", "5,4", "6,4",
      "7,1", "7,2", "7,3"
    ]
  },
  {
    name: "THE FORTRESS",
    max: 25,
    start: [1, 6],
    blocks: [
      "3,1", "3,2", "3,3", "3,4",
      "5,2", "5,3", "5,4", "5,5",
      "7,1", "7,2", "7,3"
    ]
  },
  {
    name: "SWITCHBACK",
    max: 26,
    start: [1, 6],
    blocks: [
      "2,1", "2,2", "2,3", "2,4",
      "4,3", "4,4", "4,5",
      "6,1", "6,2", "6,3",
      "8,2", "8,3"
    ]
  },
  {
    name: "MASTER ENGINEER",
    max: 27,
    start: [1, 6],
    blocks: [
      "2,1", "2,2", "2,3",
      "4,2", "4,3", "4,4", "4,5",
      "6,1", "6,2", "6,3",
      "7,4", "7,5"
    ]
  }
];

// ---------- GAME STATE ----------

let screen = "title";
let levelIndex = 0;
let player;
let parts = [];
let blocks = [];
let won = false;
let helpPage = 0;

const sourceX = 1;
const sourceY = 1;
const exitX = 8;
const exitY = 6;

// Directions:
// 0 = up
// 1 = right
// 2 = down
// 3 = left

const wireTypes = ["h", "v", "n", "r", "q", "m"];

const portMap = {
  h: [1, 3],
  v: [0, 2],
  n: [0, 1],
  r: [1, 2],
  q: [2, 3],
  m: [3, 0]
};

const dx = [0, 1, 0, -1];
const dy = [-1, 0, 1, 0];

// ---------- BASIC FUNCTIONS ----------

function emptyBoard() {
  setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`);
}

function clearGame() {
  clearText();
  parts = [];
  blocks = [];
  player = null;
  won = false;
  emptyBoard();
}

function partAt(x, y) {
  return parts.find(part => part.x === x && part.y === y);
}

function blockAt(x, y) {
  return blocks.some(block => block[0] === x && block[1] === y);
}

function isSpecialTile(x, y) {
  return (
    (x === sourceX && y === sourceY) ||
    (x === exitX && y === exitY)
  );
}

function portsFor(type) {
  return portMap[type] || [];
}

// ---------- WIRE FUNCTIONS ----------

function addPart(x, y, type) {
  if (partAt(x, y)) return false;
  if (blockAt(x, y) || isSpecialTile(x, y)) return false;

  addSprite(x, y, type);

  const sprite = getTile(x, y).find(s => s.type === type);

  parts.push({
    x: x,
    y: y,
    type: type,
    sprite: sprite
  });

  return true;
}

function changePart(part, newType) {
  if (part.sprite) {
    part.sprite.remove();
  }

  addSprite(part.x, part.y, newType);

  part.type = newType;
  part.sprite = getTile(part.x, part.y).find(
    s => s.type === newType
  );
}

function rotateWire() {
  if (!player || won) return;

  const part = partAt(player.x, player.y);

  if (!part) {
    clearText();
    addText("NO WIRE HERE", {
      x: 2,
      y: 7,
      color: color`3`
    });
    return;
  }

  const current = wireTypes.indexOf(part.type);
  const next = (current + 1) % wireTypes.length;

  changePart(part, wireTypes[next]);

  clearText();
  updateHUD();
  checkCircuit();
}

function placeWire() {
  if (!player || won) return;
  if (partAt(player.x, player.y)) return;

  if (parts.length >= levels[levelIndex].max) {
    clearText();
    addText("WIRE LIMIT!", {
      x: 2,
      y: 7,
      color: color`3`
    });
    return;
  }

  if (addPart(player.x, player.y, "h")) {
    clearText();
    updateHUD();
    checkCircuit();
  }
}

function deleteWire() {
  if (!player || won) return;

  const part = partAt(player.x, player.y);
  if (!part) return;

  if (part.sprite) {
    part.sprite.remove();
  }

  parts = parts.filter(p => p !== part);

  clearText();
  updateHUD();
  checkCircuit();
}

// ---------- CIRCUIT CHECK ----------

function checkCircuit() {
  if (won) return;

  // Wires may be fewer than the maximum.
  if (parts.length > levels[levelIndex].max) return;

  // First wire is directly BELOW the source.
  const startX = sourceX;
  const startY = sourceY + 1;

  // Final wire is directly BELOW the exit.
  const targetX = exitX;
  const targetY = exitY + 1;

  const firstPart = partAt(startX, startY);
  const targetPart = partAt(targetX, targetY);

  if (!firstPart || !targetPart) return;

  // Both terminal connections must face UP.
  if (!portsFor(firstPart.type).includes(0)) return;
  if (!portsFor(targetPart.type).includes(0)) return;

  const queue = [[startX, startY]];
  const visited = new Set();

  while (queue.length > 0) {
    const current = queue.shift();
    const x = current[0];
    const y = current[1];
    const key = x + "," + y;

    if (visited.has(key)) continue;
    visited.add(key);

    // Reaching the final wire completes the circuit.
    if (x === targetX && y === targetY) {
      winLevel();
      return;
    }

    const currentPart = partAt(x, y);
    if (!currentPart) continue;

    for (const direction of portsFor(currentPart.type)) {
      const nx = x + dx[direction];
      const ny = y + dy[direction];

      const nextPart = partAt(nx, ny);
      if (!nextPart) continue;

      const opposite = (direction + 2) % 4;

      if (!portsFor(nextPart.type).includes(opposite)) {
        continue;
      }

      const nextKey = nx + "," + ny;

      if (!visited.has(nextKey)) {
        queue.push([nx, ny]);
      }
    }
  }
}

// ---------- LEVEL SETUP ----------

function loadLevel() {
  clearGame();

  const level = levels[levelIndex];

  for (const position of level.blocks) {
    const coords = position.split(",");
    const x = Number(coords[0]);
    const y = Number(coords[1]);

    blocks.push([x, y]);
    addSprite(x, y, B);
  }

  addSprite(sourceX, sourceY, S);
  addSprite(exitX, exitY, E);

  addSprite(level.start[0], level.start[1], P);

  player = getTile(level.start[0], level.start[1]).find(
    s => s.type === P
  );

  updateHUD();
}

function startGame() {
  levelIndex = 0;
  screen = "game";
  loadLevel();
}

function restartLevel() {
  if (screen !== "game") return;
  loadLevel();
}

function nextLevel() {
  if (levelIndex >= levels.length - 1) {
    showComplete();
    return;
  }

  levelIndex++;
  loadLevel();
}

// ---------- PLAYER MOVEMENT ----------

function movePlayer(direction) {
  if (screen !== "game" || won || !player) return;

  const nx = player.x + dx[direction];
  const ny = player.y + dy[direction];

  if (nx < 0 || nx > 9 || ny < 0 || ny > 7) return;
  if (blockAt(nx, ny)) return;
  if (isSpecialTile(nx, ny)) return;

  player.x = nx;
  player.y = ny;

  updateHUD();
}

// ---------- DISPLAY ----------

function updateHUD() {
  clearText();

  if (screen !== "game") return;

  const level = levels[levelIndex];

  addText("LEVEL " + (levelIndex + 1) + "/10", {
    x: 0,
    y: 0,
    color: color`7`
  });

  addText("WIRES " + parts.length + "/" + level.max, {
    x: 0,
    y: 7,
    color: color`6`
  });
}

function showTitle() {
  clearGame();
  screen = "title";

  addText("SWITCHBOARD", {
    x: 1,
    y: 1,
    color: color`6`
  });

  addText("CIRCUIT PUZZLE", {
    x: 1,
    y: 3,
    color: color`7`
  });

  addText("I: START", {
    x: 1,
    y: 5,
    color: color`4`
  });

  addText("J: HELP", {
    x: 1,
    y: 6,
    color: color`3`
  });
}

function showHelp() {
  clearGame();
  screen = "help";

  if (helpPage === 0) {
    addText("HOW TO PLAY", {
      x: 1,
      y: 0,
      color: color`6`
    });

    addText("CONNECT POWER", {
      x: 0,
      y: 2,
      color: color`3`
    });

    addText("ORANGE TO GREEN", {
      x: 0,
      y: 3,
      color: color`4`
    });

    addText("MOVE: W A S D", {
      x: 0,
      y: 5,
      color: color`7`
    });

    addText("J: NEXT PAGE", {
      x: 0,
      y: 7,
      color: color`6`
    });
  } else {
    addText("WIRE CONTROLS", {
      x: 1,
      y: 0,
      color: color`6`
    });

    addText("J: PLACE WIRE", {
      x: 0,
      y: 2,
      color: color`7`
    });

    addText("I: ROTATE WIRE", {
      x: 0,
      y: 3,
      color: color`7`
    });

    addText("K: DELETE WIRE", {
      x: 0,
      y: 4,
      color: color`7`
    });

    addText("L: RESTART", {
      x: 0,
      y: 5,
      color: color`7`
    });

    addText("I: TITLE", {
      x: 0,
      y: 7,
      color: color`6`
    });
  }
}

// ---------- LEVEL PROGRESSION ----------

function winLevel() {
  if (won) return;

  won = true;
  clearText();

  addText("CIRCUIT READY!", {
    x: 0,
    y: 2,
    color: color`4`
  });

  addText("LEVEL COMPLETE!", {
    x: 0,
    y: 4,
    color: color`6`
  });

  setTimeout(() => {
    if (levelIndex === levels.length - 1) {
      showComplete();
    } else {
      nextLevel();
    }
  }, 1200);
}

function showComplete() {
  clearGame();
  screen = "complete";

  addText("YOU DID IT!", {
    x: 1,
    y: 1,
    color: color`6`
  });

  addText("ALL 10 LEVELS", {
    x: 0,
    y: 3,
    color: color`4`
  });

  addText("COMPLETED", {
    x: 1,
    y: 4,
    color: color`4`
  });

  addText("I: PLAY AGAIN", {
    x: 0,
    y: 6,
    color: color`7`
  });
}

// ---------- INPUTS ----------

onInput("w", () => movePlayer(0));
onInput("d", () => movePlayer(1));
onInput("s", () => movePlayer(2));
onInput("a", () => movePlayer(3));

onInput("i", () => {
  if (screen === "title") {
    startGame();
  } else if (screen === "help") {
    showTitle();
  } else if (screen === "complete") {
    startGame();
  } else if (screen === "game" && !won) {
    rotateWire();
  }
});

onInput("j", () => {
  if (screen === "title") {
    helpPage = 0;
    showHelp();
  } else if (screen === "help") {
    helpPage = 1;
    showHelp();
  } else if (screen === "game" && !won) {
    placeWire();
  }
});

onInput("k", () => {
  if (screen === "game") {
    deleteWire();
  }
});

onInput("l", () => {
  if (screen === "game") {
    restartLevel();
  }
});

// ---------- START ----------

showTitle();
