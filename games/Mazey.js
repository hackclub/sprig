/*
@title: Mazey
@description: Mazey is a maze challenge where you collect stars and escape before time runs out! Beat higher levels for more points and complexity.
@author: Pakkid
@tags: ['maze', 'stars', 'timed', 'custom']
@addedOn: 2025-04-16
*/

const player = "p";
const wall = "w";
const exit = "e";
const star = "s";
const collect = tune`
75: A5/75 + A4~75,
75: B5/75 + B4~75,
2250`
const lvlup = tune`
150: C5-150 + C4~150,
150,
150: C5-150 + C4~150,
150: G5-150 + G4~150,
4200`
const gameover = tune`
200: G4-200,
200: C4-200,
6000`
const Start = tune`
100: C4^100,
100: E4^100,
100: G4^100,
100: C5^100,
100: B3^100,
100: D4^100,
100: F4^100,
100: A4^100,
100: C4^100,
100: E4^100,
100: G4^100,
100: C5^100,
100: E5^100,
100: G5^100,
100: C4^100,
100: E4^100,
400,
100: E4^100,
100: F6^100,
1300`


setLegend(
  [player, bitmap`
....33333333....
....33333333....
..3333....3333..
..3333....3333..
3333333333333333
3333333333333333
33..33333333..33
33..33333333..33
33..33333333..33
33..33333333..33
....33....33....
....33....33....
..3333....33....
..3333....33....
..........3333..
..........3333..`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
L1LLD121LLLLL1LL
LDLLDLLDLL1LDLLL
LDL1DLLD1D2LD1DL
1LDLL12DLDLLLLDL
L1DLLDLLLLL1LL2L
LL1L1DLL1LLDDLLL
L1L2LL1LLLLD1LLL
LDLDL2D11L1LDLL1
LDLD1LDLLDLLDLDD
L1LLLLL2LD1LDDDL
L12L1LL1LLDLLDDD
LLLLLDLLLLDLLLLD
LDL1LDLD21L1D2LL
LDLLDLLDLLLLD1LL
L1LLDLLD1LLLLLLL`],
  [exit, bitmap`
................
................
................
................
......0000......
.....0....0.....
....0......0....
....0......0....
....0......0....
....0......0....
.....0....0.....
......0000......
................
................
................
................`],
  [star, bitmap`
................
................
................
.......5........
......545.......
.....54445......
.....54445......
......545.......
.......5........
................
................
................
................
................
................
................`]
);

setSolids([player, wall]);

let level = 0;
let timeRemaining = 30;
let starsCollected = 0;
let totalScore = 0;
let timerInterval;
let musicInterval;
let musicPlayback;

function displayHUD() {
  clearText();
  addText(`Time: ${timeRemaining}s`, { x: 1, y: 0, color: color`3` });
  addText(`Level: ${level}`, { x: 11, y: 0, color: color`2` });
  //addText(`*: ${starsCollected}`, { x: 1, y: 3, color: color`4` });
  addText(`Score: ${totalScore}`, { x: 6, y: 15, color: color`4` });
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timeRemaining = 30;
  displayHUD();
  timerInterval = setInterval(() => {
    timeRemaining--;
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      endGame();
    } else {
      displayHUD();
    }
  }, 1000);
}

function endGame() {
  clearText();
  clearInterval(timerInterval);
  clearMap();
  addText(`Game Over`, { x: 5, y: 5, color: color`3` });
  addText(`Final Score:`, { x: 4, y: 7, color: color`0` });
  addText(`${totalScore}`, { x: 9, y: 9, color: color`4` });
  playTune(gameover)
}

function generateMaze(width, height, difficulty) {
  if (width % 2 === 0) width++;
  if (height % 2 === 0) height++;

  let maze = Array.from({ length: height }, () => Array(width).fill(wall));

  let stack = [];
  let startX = 1;
  let startY = 1;
  maze[startY][startX] = ".";

  stack.push({ x: startX, y: startY });

  let directions = [
    { x: 0, y: -2 },
    { x: 2, y: 0 },
    { x: 0, y: 2 },
    { x: -2, y: 0 }
  ];

  let branchingProbability = Math.min(0.1 + difficulty * 0.1, 0.9);

  while (stack.length > 0) {
    let current = Math.random() < branchingProbability
      ? stack[Math.floor(Math.random() * stack.length)]
      : stack[stack.length - 1];

    let { x, y } = current;

    let neighbors = [];

    for (let dir of directions) {
      let nx = x + dir.x;
      let ny = y + dir.y;
      if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1) {
        if (maze[ny][nx] === wall) {
          neighbors.push({ x: nx, y: ny, dir });
        }
      }
    }

    if (neighbors.length > 0) {
      neighbors.sort(() => Math.random() - 0.5);
      let next = neighbors[Math.floor(Math.random() * neighbors.length)];
      maze[y + next.dir.y / 2][x + next.dir.x / 2] = ".";
      maze[next.y][next.x] = ".";
      stack.push({ x: next.x, y: next.y });
    } else {
      stack = stack.filter(cell => cell.x !== x || cell.y !== y);
    }
  }

  // Place exit
  maze[height - 2][width - 2] = exit;

  // Place stars
  let starCount = Math.min(3 + level, 10);
  while (starCount > 0) {
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);
    if (maze[y][x] === ".") {
      maze[y][x] = star;
      starCount--;
    }
  }

  // Place player
  maze[1][1] = player;

  return maze.map(row => row.join("")).join("\n");
}

function clearMap() {
  for (let y = 0; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      clearTile(x, y);
    }
  }
}

function startLevel() {
  starsCollected = 0;
  let size = 15 + level * 2;
  let mazeStr = generateMaze(size, size, level);
  setMap(map`${mazeStr}`);
  startTimer();
}

startLevel();
playTune(Start)

onInput("w", () => {
  let p = getFirst(player);
  if (p) p.y -= 1;
});
onInput("s", () => {
  let p = getFirst(player);
  if (p) p.y += 1;
});
onInput("a", () => {
  let p = getFirst(player);
  if (p) p.x -= 1;
});
onInput("d", () => {
  let p = getFirst(player);
  if (p) p.x += 1;
});

onInput("j", () => {
  endGame()
});

afterInput(() => {
  let p = getFirst(player);
  if (!p) return;

  // Star Collection
  if (tilesWith(player, star).length > 0) {
    let tile = getTile(p.x, p.y);
    let newTile = tile.filter(t => t !== star);
    clearTile(p.x, p.y);
    addSprite(p.x, p.y, player);
    starsCollected++;
    totalScore += 5;
    timeRemaining += 3;
    playTune(collect)
    displayHUD();
  }

  // Exit
  if (tilesWith(player, exit).length > 0) {
    level++;
    totalScore += 10 + starsCollected * 2;
    startLevel();
    // Play level-up tunes
    playTune(lvlup);
  }
});
