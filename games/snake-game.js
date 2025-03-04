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

const maze = document.createElement('div');
maze.style.width = '400px';
maze.style.height = '400px';
maze.style.position = 'relative';
maze.style.backgroundColor = '#fff';
maze.style.border = '2px solid #000';
maze.style.margin = '20px auto';

document.body.appendChild(maze);

for (let y = 0; y < mazeLayout.length; y++) {
  for (let x = 0; x < mazeLayout[y].length; x++) {
    if (mazeLayout[y][x] === 1) {
      const wall = document.createElement('div');
      wall.style.position = 'absolute';
      wall.style.width = '40px';
      wall.style.height = '40px';
      wall.style.backgroundColor = '#000';
      wall.style.top = `${y * 40}px`;
      wall.style.left = `${x * 40}px`;
      maze.appendChild(wall);
    }
  }
}

const player = document.createElement('div');
player.style.position = 'absolute';
player.style.width = '40px';
player.style.height = '40px';
player.style.backgroundColor = 'red';
player.style.top = '40px';
player.style.left = '40px';
maze.appendChild(player);

const goal = document.createElement('div');
goal.style.position = 'absolute';
goal.style.width = '40px';
goal.style.height = '40px';
goal.style.backgroundColor = 'green';
goal.style.top = '360px';
goal.style.left = '360px';
maze.appendChild(goal);

let playerX = 1;
let playerY = 1;

const winMessage = document.createElement('div');
winMessage.style.position = 'absolute';
winMessage.style.top = '50%';
winMessage.style.left = '50%';
winMessage.style.transform = 'translate(-50%, -50%)';
winMessage.style.fontSize = '24px';
winMessage.style.color = 'green';
winMessage.style.display = 'none';
winMessage.textContent = 'You Win!';
document.body.appendChild(winMessage);

const restartButton = document.createElement('button');
restartButton.textContent = 'Restart';
restartButton.style.display = 'none';
restartButton.style.margin = '20px auto';
restartButton.style.padding = '10px 20px';
restartButton.style.fontSize = '16px';
restartButton.style.cursor = 'pointer';
document.body.appendChild(restartButton);

restartButton.addEventListener('click', () => {
  playerX = 1;
  playerY = 1;
  player.style.top = '40px';
  player.style.left = '40px';
  winMessage.style.display = 'none';
  restartButton.style.display = 'none';
});

document.addEventListener('keydown', (e) => {
  if (winMessage.style.display === 'block') return;

  let newX = playerX;
  let newY = playerY;

  if (e.key === 'ArrowUp') newY--;
  if (e.key === 'ArrowDown') newY++;
  if (e.key === 'ArrowLeft') newX--;
  if (e.key === 'ArrowRight') newX++;

  if (mazeLayout[newY] && mazeLayout[newY][newX] === 0) {
    playerX = newX;
    playerY = newY;
    player.style.top = `${playerY * 40}px`;
    player.style.left = `${playerX * 40}px`;
  }

  if (playerX === 9 && playerY === 9) {
    winMessage.style.display = 'block';
    restartButton.style.display = 'block';
  }
});