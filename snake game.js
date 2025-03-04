// Maze layout: 1 represents walls, 0 represents paths
const mazeLayout = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Create maze container
const maze = document.createElement('div');
maze.style.width = '400px';
maze.style.height = '400px';
maze.style.position = 'relative';
maze.style.backgroundColor = '#fff'; // White background for better contrast
maze.style.border = '2px solid #000'; // Black border to define the maze area
maze.style.margin = '20px auto'; // Center the maze horizontally
document.body.appendChild(maze);

// Generate maze walls
for (let y = 0; y < mazeLayout.length; y++) {
  for (let x = 0; x < mazeLayout[y].length; x++) {
    if (mazeLayout[y][x] === 1) {
      const wall = document.createElement('div');
      wall.style.position = 'absolute';
      wall.style.width = '40px';
      wall.style.height = '40px';
      wall.style.backgroundColor = '#000'; // Walls are black
      wall.style.top = `${y * 40}px`;
      wall.style.left = `${x * 40}px`;
      maze.appendChild(wall); // Add wall to the maze
    }
  }
}

// Create the player
const player = document.createElement('div');
player.style.position = 'absolute';
player.style.width = '40px';
player.style.height = '40px';
player.style.backgroundColor = 'red'; // Player is red for visibility
player.style.top = '40px';
player.style.left = '40px';
maze.appendChild(player);

// Create the goal
const goal = document.createElement('div');
goal.style.position = 'absolute';
goal.style.width = '40px';
goal.style.height = '40px';
goal.style.backgroundColor = 'green'; // Goal is green to signify success
goal.style.top = '360px';
goal.style.left = '360px';
maze.appendChild(goal);

// Player position in the grid
let playerX = 1;
let playerY = 1;

// Create the win message
const winMessage = document.createElement('div');
winMessage.style.position = 'absolute';
winMessage.style.top = '50%';
winMessage.style.left = '50%';
winMessage.style.transform = 'translate(-50%, -50%)';
winMessage.style.fontSize = '24px';
winMessage.style.color = 'green';
winMessage.style.display = 'none'; // Hidden initially
winMessage.textContent = 'You Win!';
document.body.appendChild(winMessage);

// Restart button
const restartButton = document.createElement('button');
restartButton.textContent = 'Restart';
restartButton.style.display = 'none'; // Hidden initially
restartButton.style.margin = '20px auto';
restartButton.style.padding = '10px 20px';
restartButton.style.fontSize = '16px';
restartButton.style.cursor = 'pointer';
document.body.appendChild(restartButton);

// Restart game logic
restartButton.addEventListener('click', () => {
  playerX = 1;
  playerY = 1;
  player.style.top = '40px';
  player.style.left = '40px';
  winMessage.style.display = 'none';
  restartButton.style.display = 'none';
});

// Movement logic
document.addEventListener('keydown', (e) => {
  if (winMessage.style.display === 'block') return; // Prevent movement after winning

  let newX = playerX;
  let newY = playerY;

  // Determine new position based on key press
  if (e.key === 'ArrowUp') newY--;
  if (e.key === 'ArrowDown') newY++;
  if (e.key === 'ArrowLeft') newX--;
  if (e.key === 'ArrowRight') newX++;

  // Check if the new position is valid
  if (mazeLayout[newY] && mazeLayout[newY][newX] === 0) {
    playerX = newX;
    playerY = newY;
    player.style.top = `${playerY * 40}px`;
    player.style.left = `${playerX * 40}px`;
  }

  // Check if player has reached the goal
  if (playerX === 9 && playerY === 9) {
    winMessage.style.display = 'block';
    restartButton.style.display = 'block';
  }
});
