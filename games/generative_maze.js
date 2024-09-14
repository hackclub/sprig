/*
@title: Generative Maze
@author: Zeyu Yao
@tags: ["endless", "infinite", "maze"]
@addedOn: 2024-09-14
*/

const player = "p";
const wall = "w";
const exit = "e";

setLegend(
  [player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`],
  [wall, bitmap`
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
LLLLLLLLLLLLLLLL`],
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
);

setSolids([player, wall]);

let level = 0;
let timeRemaining = 30;
let timerInterval;

function displayTime() {
  clearText();
  addText(`${timeRemaining}`, { x: 1, y: 1, color: color`3` });
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timeRemaining = 30;
  displayTime();
  timerInterval = setInterval(() => {
    timeRemaining--;
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      endGame();
    } else {
      displayTime();
    }
  }, 1000);
}

function endGame() {
  clearText();
  clearInterval(timerInterval);
  for (let y = 0; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      clearTile(x, y);
    }
  }
  addText(`Score: ${level}`, { x: Math.floor(width() / 2) - 3, y: Math.floor(height() / 2), color: color`3` });
}

startTimer();

function generateMaze(width, height, difficulty) {
  if (width % 2 === 0) width++;
  if (height % 2 === 0) height++;

  let maze = [];
  for (let y = 0; y < height; y++) {
    maze[y] = [];
    for (let x = 0; x < width; x++) {
      maze[y][x] = wall;
    }
  }

  // Starting position
  let stack = [];
  let startX = 1;
  let startY = 1;
  maze[startY][startX] = "."; // Empty space

  stack.push({ x: startX, y: startY });

  // Possible directions
  let directions = [
    { x: 0, y: -2 }, // North
    { x: 2, y: 0 }, // East
    { x: 0, y: 2 }, // South
    { x: -2, y: 0 } // West
  ];

  // Calculate branching probability based on difficulty
  let branchingProbability = Math.min(0.1 + difficulty * 0.1, 0.9); // Cap at 0.9

  while (stack.length > 0) {
    let current;
    if (Math.random() < branchingProbability) {
      // Choose a random cell from the stack to increase branching
      current = stack[Math.floor(Math.random() * stack.length)];
    } else {
      // DFS: take the last cell
      current = stack[stack.length - 1];
    }
    let x = current.x;
    let y = current.y;

    // Find unvisited neighbors
    let neighbors = [];

    for (let dir of directions) {
      let nx = x + dir.x;
      let ny = y + dir.y;
      if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1) {
        if (maze[ny][nx] === wall) {
          neighbors.push({ x: nx, y: ny, dir: dir });
        }
      }
    }

    if (neighbors.length > 0) {
      // Shuffle neighbors to add randomness
      neighbors.sort(() => Math.random() - 0.5);

      // Choose a random neighbor
      let next = neighbors[Math.floor(Math.random() * neighbors.length)];

      // Remove wall between current and next
      let wallX = x + next.dir.x / 2;
      let wallY = y + next.dir.y / 2;
      maze[wallY][wallX] = "."; // Empty space

      // Mark next cell as passage
      maze[next.y][next.x] = ".";
      stack.push({ x: next.x, y: next.y });

    } else {
      stack = stack.filter(cell => cell.x !== x || cell.y !== y);
    }
  }

  maze[height - 2][width - 2] = exit;
  maze[1][1] = player;

  let mazeString = "";
  for (let y = 0; y < height; y++) {
    let row = "";
    for (let x = 0; x < width; x++) {
      row += maze[y][x];
    }
    mazeString += row + "\n";
  }

  return mazeString;
}

let currentMaze = generateMaze(15, 15, level);
setMap(map`${currentMaze}`);

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

afterInput(() => {
  let atExit = tilesWith(player, exit).length > 0;
  if (atExit) {
    level++;
    let mazeSize = 15 + level * 2;
    let difficulty = level;
    let newMaze = generateMaze(mazeSize, mazeSize, difficulty);
    setMap(map`${newMaze}`);
    startTimer();
  }
});
