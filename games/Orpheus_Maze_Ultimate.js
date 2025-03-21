/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Orpheus Maze Ultimate
@author: Aahil
@tags: [puzzle, maze]
@addedOn: 2025-03-21
*/

const player = "p";
const wall = "w";
const exit = "e";
setLegend(
  [player, bitmap`
333.............
3.3.............
..3.............
.33.00000000....
.3.0022222200...
.3002222222200..
.00222222222200.
.02200222200220.
.02042022042020.
.02042022042020.
.02022022022020.
.02200222200220.
.00222222222200.
..002200002200..
...0022222200...
....00000000....`],
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
DFFDFFDFFDFDDFFF
DFDDFFDFDDDDDFDF
DFFDFDDFDDFDDFFF
DDFLLLDFDDFLLLDF
DFFL0LDFDDFL0LFF
DLLLLLLLDLLLLLLL
DL0LDL0LDL0LDL0L
DLLLLLLLDLLLLLLL
DDDL0LDDDDDL0LDD
DDDLLLDDDDDLLLDD
DFDDDDDDDDDDDDDD
DFDD000000000DDD
DFFF0376H3980DDD
DFDF053H76370DDD
DFDF000000000DDD
DDDDDDDDDDDDDDDD`],
);
setSolids([player, wall]);
let level = 0;
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
    let current;
    if (Math.random() < branchingProbability) {
      current = stack[Math.floor(Math.random() * stack.length)];
    } else {
      current = stack[stack.length - 1];
    }
    let x = current.x;
    let y = current.y;
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
      neighbors.sort(() => Math.random() - 0.5);
      let next = neighbors[Math.floor(Math.random() * neighbors.length)];
      let wallX = x + next.dir.x / 2;
      let wallY = y + next.dir.y / 2;
      maze[wallY][wallX] = ".";
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
  }
});