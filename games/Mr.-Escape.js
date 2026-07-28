/*
@title: Mr.Escape
@description:  A polished maze escape adventure where you collect the key, navigate tricky paths, and reach the exit to win.
@author: Shishir Khanal
@tags: ['puzzle', 'maze', 'escape', 'adventure', 'logic']
@addedOn: 2026-07-28
*/

/*
Controls:
L = Start / Restart
W = Move Up
A = Move Left
S = Move Down
D = Move Right
*/

const player = "p";
const wall = "w";
const key = "k";
const door = "d";
const menuBg = "m";
const playBg = "v";

const TOTAL_LEVELS = 10;

const MODE_MENU = "menu";
const MODE_PLAY = "play";
const MODE_WIN = "win";

let level = 0;
let hasKey = false;
let mode = MODE_MENU;
let pendingMove = false;
const levels = [];

const startTune = tune`
140: C5/140,
140: E5/140,
140: G5/140`;

const pickupTune = tune`
100: E5/100,
100: G5/100,
100: C6/100`;

const doorTune = tune`
120: C5/120,
120: D5/120,
120: E5/120`;

const winTune = tune`
160: C5/160,
160: E5/160,
160: G5/160,
160: C6/320`;

setLegend(
  [player, bitmap`
................
................
.....66666......
....6606066.....
....6666666.....
....6666666.....
.....66666......
......999.......
..CC..999..CC...
...CCCCCCCCC....
......666.......
......666.......
......666.......
....888.888.....
................
................`],
  [wall, bitmap`
44444HHHHHHHHHHH
44444HHHHHHHHHHH
44444HHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHH44444HHHHHH
HHHHH44444HHHHHH
HHHHH44444HHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHH44444
HHHHHHHHHHH44444
HHHHHHHHHHH44444
HHHHHHHHHHH44444`],
  [key, bitmap`
................
................
................
................
................
................
.....66..0......
.....0066000....
.....66..0......
................
................
................
................
................
................
................`],
  [door, bitmap`
8888888888888888
8888888888888888
88HHHHHHHHHHHH88
88H6666666666H88
88H6222222226H88
88H6223333226H88
88H6223333226H88
88H6223333226H88
88H6223333226H88
88H6223333226H88
88H6223333226H88
88H6222222226H88
88H6666666666H88
88HHHHHHHHHHHH88
8888888888888888
8888888888888888`],
  [menuBg, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [playBg, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`]
);

setSolids([player, wall]);

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function playSfx(sound) {
  if (typeof playTune !== "function") return;
  try {
    playTune(sound);
  } catch (e) {}
}

function blankMap(width, height) {
  const rows = [];
  for (let y = 0; y < height; y++) {
    rows.push(".".repeat(width));
  }
  return rows.join("\n");
}

function generateLevel(levelIndex) {
  const sizeBoost = Math.min(levelIndex, 4);
  const heightBoost = Math.min(levelIndex, 3);
  const width = 9 + sizeBoost * 2;
  const height = 7 + heightBoost * 2;

  const grid = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push("w");
    }
    grid.push(row);
  }

  function carve(x, y) {
    grid[y][x] = ".";
    const dirs = shuffle([[2, 0], [-2, 0], [0, 2], [0, -2]]);
    for (let i = 0; i < dirs.length; i++) {
      const dx = dirs[i][0];
      const dy = dirs[i][1];
      const nx = x + dx;
      const ny = y + dy;
      if (nx <= 0 || ny <= 0 || nx >= width - 1 || ny >= height - 1) continue;
      if (grid[ny][nx] !== "w") continue;
      grid[y + dy / 2][x + dx / 2] = ".";
      grid[ny][nx] = ".";
      carve(nx, ny);
    }
  }

  carve(1, 1);

  const dist = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push(-1);
    }
    dist.push(row);
  }

  const startX = 1;
  const startY = 1;
  dist[startY][startX] = 0;
  const queue = [{ x: startX, y: startY }];
  let farX = startX;
  let farY = startY;
  let farDist = 0;

  while (queue.length > 0) {
    const cur = queue.shift();
    const cx = cur.x;
    const cy = cur.y;
    const currentDist = dist[cy][cx];

    if (currentDist > farDist) {
      farDist = currentDist;
      farX = cx;
      farY = cy;
    }

    const steps = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (let i = 0; i < steps.length; i++) {
      const nx = cx + steps[i][0];
      const ny = cy + steps[i][1];
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      if (grid[ny][nx] !== ".") continue;
      if (dist[ny][nx] !== -1) continue;
      dist[ny][nx] = currentDist + 1;
      queue.push({ x: nx, y: ny });
    }
  }

  const doorX = farX;
  const doorY = farY;

  const keyCandidates = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] !== ".") continue;
      const d = dist[y][x];
      if (d < 0) continue;
      if (x === startX && y === startY) continue;
      if (x === doorX && y === doorY) continue;
      if (d >= Math.floor(farDist / 2)) {
        keyCandidates.push({ x, y });
      }
    }
  }

  let keyX = startX;
  let keyY = startY;

  if (keyCandidates.length > 0) {
    const pick = keyCandidates[Math.floor(Math.random() * keyCandidates.length)];
    keyX = pick.x;
    keyY = pick.y;
  } else {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid[y][x] === "." && !(x === startX && y === startY) && !(x === doorX && y === doorY)) {
          keyX = x;
          keyY = y;
        }
      }
    }
  }

  grid[startY][startX] = player;
  grid[keyY][keyX] = key;
  grid[doorY][doorX] = door;

  const rows = [];
  for (let y = 0; y < height; y++) {
    rows.push(grid[y].join(""));
  }
  return rows.join("\n");
}

function drawHud(message) {
  clearText();
  addText("L" + (level + 1) + "/" + TOTAL_LEVELS, {
    x: 0,
    y: 0,
    color: color`2`
  });
  if (hasKey) {
    addText("KEY", {
      x: 8,
      y: 0,
      color: color`6`
    });
  }
  if (message) {
    addText(message, {
      x: 2,
      y: 1,
      color: color`3`
    });
  }
}

function centerXFor(text, mapW) {
  return Math.max(0, Math.floor((mapW - text.length) / 2));
}

function drawMenu() {
  const mapW = 11;
  const mapH = 9;
  mode = MODE_MENU;
  hasKey = false;
  level = 0;
  setBackground(menuBg);
  setMap(blankMap(mapW, mapH));
  clearText();

  const lines = [
    "     MR.ESCAPE",
    "    GET THE KEY",
    "  ESCAPE THE MAZE",
    "",
    "      L START"
  ];
  const startY = Math.max(0, Math.floor((mapH - lines.length) / 2));
  for (let i = 0; i < lines.length; i++) {
    const txt = lines[i];
    if (txt.length === 0) continue;
    addText(txt, {
      x: centerXFor(txt, mapW),
      y: startY + i,
      color: color`3`
    });
  }
}


function startLevel() {
  mode = MODE_PLAY;
  hasKey = false;
  setBackground(playBg);
  setMap(levels[level]);
  drawHud();
}

function startGame() {
  level = 0;
  playSfx(startTune);
  startLevel();
}

function showWinScreen() {
  const mapW = 11;
  const mapH = 9;
  mode = MODE_WIN;
  playSfx(winTune);
  setBackground(menuBg);
  setMap(blankMap(mapW, mapH));
  clearText();

  const lines = [
    "YOU WIN",
    "MR.ESCAPE",
    "",
    "10/10 CLEARED",
    "",
    "L AGAIN"
  ];
  const startY = Math.max(0, Math.floor((mapH - lines.length) / 2));
  for (let i = 0; i < lines.length; i++) {
    const txt = lines[i];
    if (txt.length === 0) continue;
    addText(txt, {
      x: centerXFor(txt, mapW),
      y: startY + i,
      color: i === 0 ? color`2` : color`0`
    });
  }
}


for (let i = 0; i < TOTAL_LEVELS; i++) {
  levels.push(generateLevel(i));
}

function movePlayer(dx, dy) {
  if (mode !== MODE_PLAY) return;
  const p = getFirst(player);
  if (!p) return;
  pendingMove = true;

  if (dx !== 0) {
    if (dx < 0 && p.x > 0) p.x -= 1;
    if (dx > 0 && p.x < width() - 1) p.x += 1;
  }
  if (dy !== 0) {
    if (dy < 0 && p.y > 0) p.y -= 1;
    if (dy > 0 && p.y < height() - 1) p.y += 1;
  }
}

onInput("w", () => movePlayer(0, -1));
onInput("s", () => movePlayer(0, 1));
onInput("a", () => movePlayer(-1, 0));
onInput("d", () => movePlayer(1, 0));

onInput("l", () => {
  if (mode === MODE_MENU) {
    startGame();
  } else if (mode === MODE_WIN) {
    startGame();
  }
});

afterInput(() => {
  if (!pendingMove) return;
  pendingMove = false;
  if (mode !== MODE_PLAY) return;

  if (tilesWith(player, key).length > 0) {
    const k = getFirst(key);
    if (k) {
      k.remove();
    }
    hasKey = true;
    playSfx(pickupTune);
    drawHud();
  }

  if (tilesWith(player, door).length > 0) {
    if (hasKey) {
      playSfx(doorTune);
      if (level + 1 < TOTAL_LEVELS) {
        level += 1;
        startLevel();
      } else {
        showWinScreen();
      }
    } else {
      drawHud("NEED KEY");
    }
  }
});

drawMenu();