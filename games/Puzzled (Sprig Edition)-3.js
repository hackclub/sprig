/*
@title: Puzzled (Sprig Edtion!)
@author: cbbcsa
@tags: ['maze', 'puzzle']
@addedOn: 2024-09-21
*/

const playerIdle = "p"; // Player
const wall = "y"; // Wall
const exit = "e"; // Exit
const floor = "f"; // Floor

setLegend(
  [playerIdle, bitmap`
LLLLLLLLLLLLLLLL
L22222222222222L
L20000000000002L
L20000000000002L
L20000000000002L
L22222222222222L
L22222222222222L
L22222222222222L
L22222222222222L
L22222222222222L
L22202222222222L
L22202222222222L
L22200000000222L
L22222222222222L
L22222222222222L
LLLLLLLLLLLLLLLL`],
  [wall, bitmap`
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
  [exit, bitmap`
4444444444444444
4F444444444444F4
44F44444444444F4
444F4444444444F4
4444F444444444F4
44444DDDDDDDDDD4
44444DDDDDDDDDD4
44444DDDDDDDDDD4
44444DDDDDDDDDD4
44444DDDDDDDDDD4
44444DDDDDDDDDD4
44444DDDDDDDDDD4
44444DDDDDDDDDD4
44444DDDDDDDDDD4
4FFFFDDDDDDDDDD4
4444444444444444`],
  [floor, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000`]
);

// gen maze
function generateMaze(width, height) {
  const maze = Array.from({ length: height }, () => Array(width).fill(wall));

  // starting point
  const startX = 1;
  const startY = 1;
  maze[startY][startX] = playerIdle; // Set the player's starting point

  const stack = [
    [startX, startY]
  ];

  // directions
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1]
  ];

  while (stack.length > 0) {
    const [x, y] = stack.pop();
    const neighbors = [];

    // valid others
    directions.forEach(([dx, dy]) => {
      const nx = x + dx * 2;
      const ny = y + dy * 2;
      if (nx > 0 && ny > 0 && nx < width && ny < height && maze[ny][nx] === wall) {
        neighbors.push([nx, ny, dx, dy]);
      }
    });

    if (neighbors.length > 0) {
      stack.push([x, y]); // Push current position back onto the stack

      const [nx, ny, dx, dy] = neighbors[Math.floor(Math.random() * neighbors.length)];
      maze[y + dy][x + dx] = floor; // Set the floor
      maze[ny][nx] = floor; // Carve out the path
      stack.push([nx, ny]); // Move to the next position
    }
  }

  // place exit at reachable spot
  let exitX, exitY;
  let exitPlaced = false;

  while (!exitPlaced) {
    exitX = Math.floor(Math.random() * (width - 1)) * 2 + 1; // Ensure odd position
    exitY = Math.floor(Math.random() * (height - 1)) * 2 + 1; // Ensure odd position

    // is on path?
    if (maze[exitY] && maze[exitY][exitX] === floor) {
      maze[exitY][exitX] = exit; // Set the exit
      exitPlaced = true;
    }
  }

  // multiple routes
  const secondPathStartX = Math.floor(Math.random() * (width - 1)) * 2 + 1; // Random odd position
  const secondPathStartY = Math.floor(Math.random() * (height - 1)) * 2 + 1; // Random odd position

  if (maze[secondPathStartY] && maze[secondPathStartY][secondPathStartX] === floor) {
    directions.forEach(([dx, dy]) => {
      const nx = secondPathStartX + dx;
      const ny = secondPathStartY + dy;
      if (nx > 0 && ny > 0 && nx < width && ny < height) {
        maze[ny][nx] = floor; // Carve out an additional path to exit
      }
    });
  }

  // Convert maze array
  return maze.map(row => row.join('')).join('\n');
}

// maze dimensions
const mazeWidth = 15; // Use odd dimensions for better pathing
const mazeHeight = 12;

// gen a maze withdimensions
function createNewLevel() {
  const mazeString = generateMaze(mazeWidth, mazeHeight).replace(/ /g, '.'); // Replace spaces with dots for display
  return map`${mazeString}`; // Create level using tagged template literal
}

let level = 0; // start
setMap(createNewLevel()); // Set the initial level

// Set player and wall as solid objects
setSolids([playerIdle, wall]);

// Store player object
let player = getFirst(playerIdle);

function movePlayer(dx, dy) {
  player.x += dx;
  player.y += dy;
}

// Inputs for player movement control
onInput("w", () => {
  movePlayer(0, -1); // Move up
});

onInput("s", () => {
  movePlayer(0, 1); // Move down
});

onInput("a", () => {
  movePlayer(-1, 0); // Move left
});

onInput("d", () => {
  movePlayer(1, 0); // Move right
});

// Reset level if needed
onInput("j", () => {
  clearText(""); // Clear the text before starting a new level
  setMap(createNewLevel());
  player = getFirst(playerIdle); // Reassign player after resetting
});

// Check for level completion
afterInput(() => {
  // Check if player has reached the exit
  if (tilesWith(playerIdle, exit).length > 0) {
    addText("Level Complete!", { y: 4, color: color`6` });

    // time then regen
    setTimeout(() => {
      clearText(""); // Clear the text before starting a new level
      level++;
      setMap(createNewLevel());
      player = getFirst(playerIdle); // Reassign player after advancing level
    }, 3000); // Adjust time (in milliseconds) as needed
  }
});
