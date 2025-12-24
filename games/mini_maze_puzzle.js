/*
@title: Mini Maze Puzzle
@description: Small maze puzzle where you grab a key and escape the maze.
@author: alexlam0206
@tags: ['puzzle']
@addedOn: 2025-12-24
*/

const player = "p";
const wall = "w";
const floor = "f";
const key = "k";
const door = "d";

setLegend(
  [player, bitmap`
................
................
......6666......
.....6LLLL6.....
.....6L00L6.....
.....6L00L6.....
.....6LLLL6.....
......6666......
.......66.......
......6LL6......
.....6L00L6.....
.....6L00L6.....
.....6LLLL6.....
......6666......
................
................`],
  [wall, bitmap`
5555555555555555
5577777777777755
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5577777777777755
5555555555555555`],
  [floor, bitmap`
2222222222222222
2222222222222222
22C2222C2222C222
2222C2222C222222
22C2222C2222C222
2222C2222C222222
22C2222C2222C222
2222C2222C222222
22C2222C2222C222
2222C2222C222222
22C2222C2222C222
2222C2222C222222
22C2222C2222C222
2222C2222C222222
2222222222222222
2222222222222222`],
  [key, bitmap`
................
................
......7777......
.....7CCCC7.....
.....7C33C7.....
.....7C33C7.....
......7CC7......
.......77.......
.......77.......
......7777......
......7..7......
......7..7......
......7..7......
......7..7......
................
................`],
  [door, bitmap`
3333333333333333
3999999999999933
39FFFFFFFFFFFF93
39FCCCCCCCCCCF93
39FCCCCCCCCCCF93
39FCCCCCCCCCCF93
39FCCCCCCCCCCF93
39FCCCCCCCCCCF93
39FCCCCCCCCCCF93
39FCCCCCCCCCCF93
39FCCCCCCCCCCF93
39FCCCCCCCCCCF93
39FCCCCCCCCCCF93
39FFFFFFFFFFFF93
3999999999999933
3333333333333333`]
);

setSolids([player, wall]);

let level = 0;
let hasKey = false;

const TOTAL_LEVELS = 10;
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
    const steps = [[1, 0], [-1, 0], [0, 1], [0, -1]];
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

function startLevel() {
  setMap(levels[level]);
  setBackground(floor);
  hasKey = false;
  drawHud();
}

function drawHud() {
  clearText();
  addText("Level " + (level + 1) + "/10", {
    x: 0,
    y: 0,
    color: color`2`
  });
  addText(hasKey ? "Key: ✓" : "Key: ?", {
    x: 0,
    y: 1,
    color: color`4`
  });
}

onInput("w", () => {
  const p = getFirst(player);
  if (p.y > 0) {
    p.y -= 1;
  }
});

onInput("s", () => {
  const p = getFirst(player);
  if (p.y < height() - 1) {
    p.y += 1;
  }
});

onInput("a", () => {
  const p = getFirst(player);
  if (p.x > 0) {
    p.x -= 1;
  }
});

onInput("d", () => {
  const p = getFirst(player);
  if (p.x < width() - 1) {
    p.x += 1;
  }
});

onInput("j", () => {
  startLevel();
});

afterInput(() => {
  if (tilesWith(player, key).length > 0) {
    const k = getFirst(key);
    if (k) {
      k.remove();
    }
    hasKey = true;
    drawHud();
  }

  if (tilesWith(player, door).length > 0) {
    if (hasKey) {
      const nextLevel = levels[level + 1];
      if (nextLevel !== undefined) {
        level += 1;
        startLevel();
      } else {
        clearText();
        addText("Congrats! 10/10", {
          y: 6,
          color: color`2`
        });
      }
    } else {
      addText("Need the key", {
        x: 7,
        y: 0,
        color: color`3`
      });
    }
  }
});

startLevel();
