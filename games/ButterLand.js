/*
@title: Escape ButterLand
@description: An epic journey through the depths of ButterLand trying to escape!
@author: butterlabs
@tags: ['puzzle']
@addedOn: 2026-09-15
*/
// orginal by @alexam0206
const player = "p";
const wall = "w";
const floor = "f";
const key = "k";
const door = "d";
const endBg = "e";
const butterSlice = "s";

const logo1 = "1";
const logo2 = "2";
const logo3 = "3";

const keySound = tune`
100: C5~100,
100: G5~100`;

const doorSound = tune`
500: B5~500 + A5~500 + G5~500 + F5~500,
500: E5~500,
15000`;

const sliceSound = tune`
80: G5~80,
80: undefined~80 + G5^80 + C5-80,
80: F5^80,
2320`;

setLegend(
  [logo1, bitmap`
................
.666..6...6.666.
.6..6.6...6...6.
.666..6...6...6.
.6..6.6...6...6.
.666...666....6.
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
  [logo2, bitmap`
................
.666.6666.666...
...6.6....6..6..
...6.666..666...
...6.6....6..6..
...6.6666.6...6.
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
  [logo3, bitmap`
................
................
...6666666666...
..688888888886..
..686666666666..
..686666666666..
..686666666666..
..686666666666..
..444444444444..
................
................
................
................
................
................
................`],
  [butterSlice, bitmap`
................
................
...666666666....
..68888888866...
..68666666666...
..68666666666...
..68666666666...
..68666666666...
..44444444444...
................
................
................
................
................
................
................`],
  [player, bitmap`
....DDDDDDDD....
...DD777777DD...
..DD77444477DD..
..D7740440477D..
.DD7440440447DD.
.D770444444077D.
.D740000000047D.
.D999999999999D.
.D999DDDDDD999D.
.D99DD....DD99D.
.D99D......D99D.
.DD9D......D9DD.
..D9D......D9D..
..DDD......DDD..
...DD......DD...
................`],
  [wall, bitmap`
0000000000000000
0044444444444400
0444DDDDDDDD4440
044D4DDDDDD4D440
04D4D4DDDD4D4D40
04DD4D4DD4D4DD40
04DDD4D44D4DDD40
04DDDD4DD4DDDD40
04DDDD4DD4DDDD40
04DDD4D44D4DDD40
04DD4D4DD4D4DD40
04D4D4DDDD4D4D40
044D4DDDDDD4D440
04D4DDDDDDDD4440
0044444444444400
0000000000000000`],
  [floor, bitmap`
CCCCCCCCCCCCCCCC
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [key, bitmap`
................
................
................
................
..666...........
.69996..........
.6999666666666..
.6999999999996..
.6999999999996..
.6999666666666..
.69996..6...6...
..666...6...6...
................
................
................
................`],
  [door, bitmap`
FFFFFF6666FFFFFF
F66666666666666F
F6FFFF6666FFFF6F
F6F6666666666F6F
F6F6FF6666FF6F6F
6666666666666666
666666FFFF666666
666666F66F666666
666666F66F666666
666666FFFF666666
F6F6F666666F6F6F
F6F6FF6666FF6F6F
F6F6666666666F6F
F6FFFF6666FFFF6F
F66666666666666F
FFFFFF6666FFFFFF`],
  [endBg, bitmap`
CCCCCCCCCCCCCCCC
CFFFFFFFFFFFFFFC
CFCCCCCCCCCCCCFC
CFCFFFFFFFFFFCFC
CFCFCCCCCCCCFCFC
CFCFCFFFFFFCFCFC
CFCFCFCCCCFCFCFC
CFCFCFCFFCFCFCFC
CFCFCFCFFCFCFCFC
CFCFCFCCCCFCFCFC
CFCFCFFFFFFCFCFC
CFCFCCCCCCCCFCFC
CFCFFFFFFFFFFCFC
CFCCCCCCCCCCCCFC
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC`]
);

setSolids([player, wall]);

let level = 0;
let hasKey = false;
let won = false;
let gameStarted = false;
let butterCount = 0;
let totalButter = 0;

const TOTAL_LEVELS = 15;
const levels = [];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
  return arr;
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
    const dirs = shuffle([
      [2, 0],
      [-2, 0],
      [0, 2],
      [0, -2]
    ]);
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
  const q = [{ x: startX, y: startY }];
  let farX = startX;
  let farY = startY;
  let farDist = 0;

  while (q.length > 0) {
    const cur = q.shift();
    const cx = cur.x;
    const cy = cur.y;
    const d = dist[cy][cx];
    if (d > farDist) {
      farDist = d;
      farX = cx;
      farY = cy;
    }
    const steps = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ];
    for (let i = 0; i < steps.length; i++) {
      const nx = cx + steps[i][0];
      const ny = cy + steps[i][1];
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      if (grid[ny][nx] !== ".") continue;
      if (dist[ny][nx] !== -1) continue;
      dist[ny][nx] = d + 1;
      q.push({ x: nx, y: ny });
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
        if (grid[y][x] === "." && !(x === doorX && y === doorY) && !(x === startX && y === startY)) {
          keyX = x;
          keyY = y;
        }
      }
    }
  }
  const sliceCandidates = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (
        grid[y][x] === "." &&
        !(x === startX && y === startY) &&
        !(x === doorX && y === doorY) &&
        !(x === keyX && y === keyY)
      ) {
        sliceCandidates.push({ x, y });
      }
    }
  }
  shuffle(sliceCandidates);
  const numSlices = Math.min(3, sliceCandidates.length);
  for (let i = 0; i < numSlices; i++) {
    grid[sliceCandidates[i].y][sliceCandidates[i].x] = "s";
  }

  grid[startY][startX] = "p";
  grid[keyY][keyX] = "k";
  grid[doorY][doorX] = "d";

  const rows = [];
  for (let y = 0; y < height; y++) {
    rows.push(grid[y].join(""));
  }
  return rows.join("\n");
}

for (let i = 0; i < TOTAL_LEVELS; i++) {
  levels.push(generateLevel(i));
}

function showStartScreen() {
  gameStarted = false;
  setMap(`
eeeeeeeee
eeeeeeeee
eee123eee
eeepeekee
eeeeeeeee
eeeeeeeee
eeeeeeeee
`);
  clearText();
  addText("Escape ButterLand", {
    x: 1,
    y: 1,
    color: color`6`
  });
  addText("Press J to Start", {
    x: 1,
    y: 5,
    color: color`7`
  });
}

function startLevel() {
  setMap(levels[level]);
  setBackground(floor);
  hasKey = false;
  butterCount = 0;
  totalButter = tilesWith(butterSlice).length;
  drawHud();
}

function drawHud() {
  clearText();
  addText("Lvl " + (level + 1) + "/15", {
    x: 0,
    y: 0,
    color: color`2`
  });
  addText("Key:" + (hasKey ? "YES" : "NO"), {
    x: 9,
    y: 0,
    color: color`2`
  });
  addText("Butter:" + butterCount + "/" + totalButter, {
    x: 0,
    y: 14,
    color: color`6`
  });
}

function winstart() {
  if (won) return;
  won = true;
  playback.end();
  playTune(wintune, Infinity);
}

function showWinScreen() {
  winstart();
  const w = width();
  const h = height();
  const rows = [];
  for (let y = 0; y < h; y++) {
    rows.push(endBg.repeat(w));
  }
  setMap(rows.join("\n"));
  clearText();
  addText("Congrats! 15/15", {
    x: 2,
    y: Math.floor(h / 2),
    color: color`2`,
    bg: color`0`
  });
}

onInput("w", () => {
  if (!gameStarted) return;
  const p = getFirst(player);
  if (!p) return;
  if (p.y > 0) {
    p.y -= 1;
    drawHud();
  }
});

onInput("s", () => {
  if (!gameStarted) return;
  const p = getFirst(player);
  if (!p) return;
  if (p.y < height() - 1) {
    p.y += 1;
    drawHud();
  }
});

onInput("a", () => {
  if (!gameStarted) return;
  const p = getFirst(player);
  if (!p) return;
  if (p.x > 0) {
    p.x -= 1;
    drawHud();
  }
});

onInput("d", () => {
  if (!gameStarted) return;
  const p = getFirst(player);
  if (!p) return;
  if (p.x < width() - 1) {
    p.x += 1;
    drawHud();
  }
});

onInput("j", () => {
  if (!gameStarted) {
    gameStarted = true;
    startLevel();
    return;
  }
  startLevel();
});

onInput("i", () => {
  if (!gameStarted) return;
  if (level + 1 < TOTAL_LEVELS) {
    level += 1;
    startLevel();
  } else {
    showWinScreen();
  }
});

afterInput(() => {
  if (!gameStarted) return;

  const p = getFirst(player);
  if (!p) return;

  if (tilesWith(player, butterSlice).length > 0) {
    const currentTileSlices = getTile(p.x, p.y).filter(t => t.type === butterSlice);
    if (currentTileSlices.length > 0) {
      currentTileSlices[0].remove();
      butterCount++;
      playTune(sliceSound);
      drawHud();
    }
  }

  if (tilesWith(player, key).length > 0) {
    const currentTileKeys = getTile(p.x, p.y).filter(t => t.type === key);
    if (currentTileKeys.length > 0) {
      currentTileKeys[0].remove();
      playTune(keySound);
    }
    hasKey = true;
    drawHud();
  }

  if (tilesWith(player, door).length > 0) {
    if (hasKey) {
      playTune(doorSound);
      const nextLevel = levels[level + 1];
      if (nextLevel !== undefined) {
        level += 1;
        startLevel();
      } else {
        showWinScreen();
      }
    } else {
      addText("Need key!", {
        x: 7,
        y: 0,
        color: color`3`
      });
    }
  }
});

showStartScreen();

const melody = tune`
227.27272727272728: B5^227.27272727272728 + C4~227.27272727272728 + C5/227.27272727272728 + G4-227.27272727272728,
227.27272727272728: A5^227.27272727272728 + C4~227.27272727272728 + D4~227.27272727272728 + B4/227.27272727272728 + G4-227.27272727272728,
227.27272727272728: A5^227.27272727272728 + D4~227.27272727272728 + C5/227.27272727272728,
227.27272727272728: G5^227.27272727272728 + E4~227.27272727272728 + B4/227.27272727272728,
227.27272727272728: F5^227.27272727272728 + E4~227.27272727272728 + C5/227.27272727272728,
227.27272727272728: F5^227.27272727272728 + F4~227.27272727272728 + B4/227.27272727272728,
227.27272727272728: E5^227.27272727272728 + F4~227.27272727272728 + C5/227.27272727272728,
227.27272727272728: E5^227.27272727272728 + G4~227.27272727272728 + B4/227.27272727272728,
227.27272727272728: D5^227.27272727272728 + G4~227.27272727272728 + A4~227.27272727272728 + C5/227.27272727272728,
227.27272727272728: D5^227.27272727272728 + A4~227.27272727272728 + B4/227.27272727272728,
227.27272727272728: C5^227.27272727272728 + A4~227.27272727272728 + B4~227.27272727272728 + G4-227.27272727272728 + E5-227.27272727272728,
227.27272727272728: B4^227.27272727272728 + C5~227.27272727272728 + A4/227.27272727272728 + D5/227.27272727272728 + G4-227.27272727272728,
227.27272727272728: B4^227.27272727272728 + C5~227.27272727272728 + G4/227.27272727272728 + E5/227.27272727272728,
227.27272727272728: A4^227.27272727272728 + D5~227.27272727272728 + C5/227.27272727272728,
227.27272727272728: G4^227.27272727272728 + D5~227.27272727272728 + E5~227.27272727272728 + B4/227.27272727272728,
227.27272727272728: G4^227.27272727272728 + E5~227.27272727272728 + C5/227.27272727272728 + F5~227.27272727272728,
227.27272727272728: F4^227.27272727272728 + F5~227.27272727272728 + G5~227.27272727272728 + B4/227.27272727272728,
227.27272727272728: E4^227.27272727272728 + G5~227.27272727272728 + C5/227.27272727272728 + A5~227.27272727272728,
227.27272727272728: D4^227.27272727272728 + A5~227.27272727272728 + B4~227.27272727272728,
227.27272727272728: D4^227.27272727272728 + A5~227.27272727272728 + B5~227.27272727272728 + C5/227.27272727272728,
227.27272727272728: E4^227.27272727272728 + B5~227.27272727272728 + A5~227.27272727272728 + B4/227.27272727272728,
227.27272727272728: F4^227.27272727272728 + A5~227.27272727272728 + G5~227.27272727272728 + C5/227.27272727272728,
227.27272727272728: F4^227.27272727272728 + F5~227.27272727272728 + E5~227.27272727272728 + B4/227.27272727272728,
227.27272727272728: G4^227.27272727272728 + E5~227.27272727272728 + D5~227.27272727272728 + C5/227.27272727272728,
227.27272727272728: A4^227.27272727272728 + D5~227.27272727272728 + C5~227.27272727272728 + B4/227.27272727272728,
227.27272727272728: A4^227.27272727272728 + C5~227.27272727272728 + B4~227.27272727272728,
227.27272727272728: B4^227.27272727272728 + A4~227.27272727272728 + C5/227.27272727272728,
227.27272727272728: C5^227.27272727272728 + G4~227.27272727272728 + B4/227.27272727272728,
227.27272727272728: C5^227.27272727272728 + G4~227.27272727272728 + F4~227.27272727272728,
227.27272727272728: D5^227.27272727272728 + F4~227.27272727272728 + E4~227.27272727272728 + C5/227.27272727272728,
227.27272727272728: E5^227.27272727272728 + E4~227.27272727272728 + D4~227.27272727272728,
227.27272727272728: E5^227.27272727272728 + D4~227.27272727272728 + C4~227.27272727272728 + B4/227.27272727272728`;

const wintune = tune`
250,
250: C4~250 + C5~250 + E5~250 + G5~250,
250: C4~250 + E5~250 + G5~250 + C6~250,
250: G3~250 + D5~250 + G5~250 + B5~250,
250: G3~250 + D5~250 + G5~250 + D6~250,
250: A3~250 + E5~250 + A5~250 + C6~250,
250: F3~250 + F5~250 + A5~250 + C6~250,
250: G3~250 + G5~250 + B5~250 + D6~250,
250: C4~250 + G5~250 + C6~250 + E6~250,
250: F3~250 + C5~250 + F5~250 + A5~250,
250: F3~250 + D5~250 + F5~250 + B5~250,
250: G3~250 + E5~250 + G5~250 + C6~250,
250: G3~250 + F5~250 + G5~250 + D6~250,
250: C4~250 + E5~250 + G5~250 + E6~250,
250: C4~250 + D5~250 + F5~250 + D6~250,
250: C4~250 + C5~250 + E5~250 + C6~250,
500: C4~500 + G4~500 + C5~500 + E5~500 + G5~500 + C6~500`;

const playback = playTune(melody, Infinity);