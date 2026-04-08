/*
@title: Mega Maze
@author: Shourya
@tags: [maze, procedural, logic]
*/

const player = "p";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
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
................
................` ],
  [ goal, bitmap`
................
..888888888888..
..8..........8..
..8..888888..8..
..8..8....8..8..
..8..8.44.8..8..
..8..8.44.8..8..
..8..8....8..8..
..8..888888..8..
..8..........8..
..888888888888..
................` ],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ]
);

setSolids([player, wall]);

let gameState = "MENU";
let levelCount = 0;

function showMenu() {
  gameState = "MENU";
  clearText();
  setMap(map`
....................
....................
....................
....................
....................`);
  addText("MEGA MAZE", { y: 4, color: color`red` });
  addText("Press W to START", { y: 7, color: color`black` });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateMaze() {
  const COLS = 31; 
  const ROWS = 31; 
  let maze = [];

  for (let r = 0; r < ROWS; r++) {
    maze[r] = [];
    for (let c = 0; c < COLS; c++) maze[r][c] = 1;
  }

  let stack = [[1, 1]];
  maze[1][1] = 0;

  while (stack.length > 0) {
    let [x, y] = stack.pop();
    let directions = shuffle([[0, -2], [0, 2], [-2, 0], [2, 0]]);

    for (let [dx, dy] of directions) {
      let nx = x + dx;
      let ny = y + dy;
      if (nx > 0 && nx < COLS - 1 && ny > 0 && ny < ROWS - 1 && maze[ny][nx] === 1) {
        maze[ny][nx] = 0;
        maze[y + dy / 2][x + dx / 2] = 0;
        stack.push([nx, ny]);
      }
    }
  }

  let mapString = "";
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (r === 1 && c === 1) mapString += "p";
      // Goal is at the very bottom right
      else if (r === ROWS - 2 && c === COLS - 2) mapString += "g";
      else mapString += maze[r][c] === 1 ? "w" : ".";
    }
    mapString += "\n";
  }
  return mapString;
}

showMenu();

onInput("w", () => {
  if (gameState === "MENU") {
    gameState = "PLAYING";
    levelCount = 1;
    clearText();
    setMap(generateMaze());
  } else {
    const p = getFirst(player);
    if (p) p.y -= 1;
  }
});

onInput("s", () => { if (gameState === "PLAYING") getFirst(player).y += 1; });
onInput("a", () => { if (gameState === "PLAYING") getFirst(player).x -= 1; });
onInput("d", () => { if (gameState === "PLAYING") getFirst(player).x += 1; });

afterInput(() => {
  if (gameState !== "PLAYING") return;
  const p = getFirst(player);
  if (!p) return;

  if (getTile(p.x, p.y).find(s => s.type === goal)) {
    levelCount++;
    setMap(generateMaze());
    addText(`LEVEL ${levelCount}`, { y: 1, color: color`purple` });
    setTimeout(() => clearText(), 2000);
  }
});