/*
@title: random_maze_game_with_dfs_algorithm
@author: Hanz Po
@tags: ['endless']
@img: ""
@addedOn: 2023-12-29
*/

/*
Sprig is perfect for maze games and I wanted to learn more about graph theory, so I decided to combine them into this project
This project incorporates the iterative implementation of a randomized depth-first search (DFS) generation algorithm, 
as described in this Wikipedia article: https://en.wikipedia.org/wiki/Maze_generation_algorithm

The objective of the game is to get the player (red square) to the target (green square)

Controls:
WASD to move
J to generate a maze

Other settings:
You can change the dimensions of the maze by chainging the dimensions of the placeholder level in the levels array, but the
dimensions must be odd numbers.
*/

// SPRITES
const player = "p";
const wall = "w";
const target = "t";

setLegend(
  [ player, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ target, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ]
);

setSolids([wall, player]);

// AUDIO
const keyInput = tune`
122.44897959183673: D4~122.44897959183673,
3795.918367346939`;
const winSound = tune`
74.81296758104739: E4~74.81296758104739 + F4^74.81296758104739,
74.81296758104739: E4~74.81296758104739 + F4^74.81296758104739,
74.81296758104739: E4~74.81296758104739 + F4^74.81296758104739,
74.81296758104739: E4~74.81296758104739 + G4^74.81296758104739,
74.81296758104739: E4~74.81296758104739 + G4^74.81296758104739,
74.81296758104739: E4~74.81296758104739 + G4^74.81296758104739,
74.81296758104739: F4~74.81296758104739 + E4~74.81296758104739 + G4^74.81296758104739 + A4^74.81296758104739,
74.81296758104739: F4~74.81296758104739 + A4^74.81296758104739,
74.81296758104739: F4~74.81296758104739 + G4~74.81296758104739 + A4^74.81296758104739 + B4^74.81296758104739,
74.81296758104739: G4~74.81296758104739 + B4^74.81296758104739,
74.81296758104739: G4~74.81296758104739 + A4~74.81296758104739 + B4^74.81296758104739 + C5^74.81296758104739,
74.81296758104739: A4~74.81296758104739 + C5^74.81296758104739 + D5^74.81296758104739,
74.81296758104739: A4~74.81296758104739 + B4~74.81296758104739 + D5^74.81296758104739,
74.81296758104739: B4~74.81296758104739 + C5~74.81296758104739 + E5^74.81296758104739,
74.81296758104739: C5~74.81296758104739 + F5^74.81296758104739,
74.81296758104739: D5~74.81296758104739 + E5~74.81296758104739 + C5~74.81296758104739 + G5^74.81296758104739,
74.81296758104739: E5~74.81296758104739 + F5~74.81296758104739 + G5~74.81296758104739 + A5^74.81296758104739,
1122.1945137157109`;

// MAP
/*const levels = [
  map`
wwwwwwwwwwwwwwwwwwwwwwwww
wp......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
wwwwwwwwwwwwwwwwwwwwwwwww`
]; 
*/

const levels = [map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wp..........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
w...........................................................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`];

setMap(levels[0]);

// Maze Generation
function generateMaze() {
  // Creates 2d array the represents the maze 
  let maze = Array(height()).fill(null).map(() => Array(width()));
  
  function findUnvisitedNeighbours(position, maze, height, width) {
    const unvisitedNeighbours = [];
  
    if (position[0] === 1 && position[1] === 1) {
      if (maze[1][3] === 'w') {
        unvisitedNeighbours.push([1, 3]);
      }
      if (maze[3][1] === 'w') {
        unvisitedNeighbours.push([3, 1]);
      }
    } else if (position[0] === height - 2 && position[1] === width - 2) {
      if (maze[height - 4][width - 2] === 'w') {
        unvisitedNeighbours.push([height - 4, width - 2]);
      }
      if (maze[height - 2][width - 4] === 'w') {
        unvisitedNeighbours.push([height - 2, width - 4]);
      }
    } else if (position[0] === 1 && position[1] === width - 2) {
      if (maze[3][width - 2] === 'w') {
        unvisitedNeighbours.push([3, width - 2]);
      }
      if (maze[1][width - 4] === 'w') {
        unvisitedNeighbours.push([1, width - 4]);
      }
    } else if (position[0] === height - 2 && position[1] === 1) {
      if (maze[height - 4][1] === 'w') {
        unvisitedNeighbours.push([height - 4, 1]);
      }
      if (maze[height - 2][3] === 'w') {
        unvisitedNeighbours.push([height - 2, 3]);
      }
    } else if (position[0] === 1) {
      if (maze[1][position[1] - 2] === 'w') {
        unvisitedNeighbours.push([1, position[1] - 2]);
      }
      if (maze[1][position[1] + 2] === 'w') {
        unvisitedNeighbours.push([1, position[1] + 2]);
      }
      if (maze[3][position[1]] === 'w') {
        unvisitedNeighbours.push([3, position[1]]);
      }
    } else if (position[0] === height - 2) {
      if (maze[height - 2][position[1] - 2] === 'w') {
        unvisitedNeighbours.push([height - 2, position[1] - 2]);
      }
      if (maze[height - 2][position[1] + 2] === 'w') {
        unvisitedNeighbours.push([height - 2, position[1] + 2]);
      }
      if (maze[height - 4][position[1]] === 'w') {
        unvisitedNeighbours.push([height - 4, position[1]]);
      }
    } else if (position[1] === 1) {
      if (maze[position[0] + 2][1] === 'w') {
        unvisitedNeighbours.push([position[0] + 2, 1]);
      }
      if (maze[position[0] - 2][1] === 'w') {
        unvisitedNeighbours.push([position[0] - 2, 1]);
      }
      if (maze[position[0]][3] === 'w') {
        unvisitedNeighbours.push([position[0], 3]);
      }
    } else if (position[1] === width - 2) {
      if (maze[position[0] + 2][width - 2] === 'w') {
        unvisitedNeighbours.push([position[0] + 2, width - 2]);
      }
      if (maze[position[0] - 2][width - 2] === 'w') {
        unvisitedNeighbours.push([position[0] - 2, width - 2]);
      }
      if (maze[position[0]][width - 4] === 'w') {
        unvisitedNeighbours.push([position[0], width - 4]);
      }
    } else {
      if (maze[position[0] + 2][position[1]] === 'w') {
        unvisitedNeighbours.push([position[0] + 2, position[1]]);
      }
      if (maze[position[0] - 2][position[1]] === 'w') {
        unvisitedNeighbours.push([position[0] - 2, position[1]]);
      }
      if (maze[position[0]][position[1] + 2] === 'w') {
        unvisitedNeighbours.push([position[0], position[1] + 2]);
      }
      if (maze[position[0]][position[1] - 2] === 'w') {
        unvisitedNeighbours.push([position[0], position[1] - 2]);
      }
    }
  
    return unvisitedNeighbours;
  }

  // Stack to keep track of cells
  let cells = Array();

  // Fills maze array with walls, except the cell that has been visited (starting point)
  for (let i = 0; i < height(); i++) {
      for (let j = 0; j < width(); j++) {
        if (i == 1 && j == 1) {
          maze[i][j] = '.';
        } else {
          maze[i][j] = 'w';
        }
      }
  }

  // Start at starting point
  cells.push([1, 1]);
  
  while (cells.length > 0) {
    // Set current cell
    let current_cell = cells.pop();

    // Get unvisited neighbours, pick one, then knock down wall between current cell and randomly chosen cell
    let unvisited_neighbours = findUnvisitedNeighbours(current_cell, maze, height(), width());
  
    if (unvisited_neighbours.length > 0) {
      cells.push(current_cell);
  
      let chosen_cell = unvisited_neighbours[Math.floor(Math.random() * unvisited_neighbours.length)];
      
      if (chosen_cell[0] > current_cell[0]) {
          maze[chosen_cell[0] - 1][chosen_cell[1]] = '.';
        } else if (chosen_cell[0] < current_cell[0]) {
          maze[chosen_cell[0] + 1][chosen_cell[1]] = '.';
        } else if (chosen_cell[1] > current_cell[1]) {
          maze[chosen_cell[0]][chosen_cell[1] - 1] = '.';
        } else if (chosen_cell[1] < current_cell[1]) {
          maze[chosen_cell[0]][chosen_cell[1] + 1] = '.';
      }
  
      maze[chosen_cell[0]][chosen_cell[1]] = '.';
      cells.push(chosen_cell);
    }
  }

  // Set target and player position
  maze[height() - 2][width() - 2] = 't';
  maze[1][1] = 'p';

  // Set map to randomly generated maze
  let generated_maze = '';
  
  for (let i = 0; i < height(); i++) {
      for (let j = 0; j < width(); j++) {
        generated_maze += maze[i][j];
      }
  
      generated_maze += '\n';
  }
  
  levels.push(generated_maze);
  setMap(levels[levels.length - 1]);
}

addText("Random Maze Game\nusing DFS\nAlgorithm\n\nPress j to create\na new maze", {
    x: 1,
    y: 4,
    color: color`0`
});

// USER INPUT
onInput("s", () => {
  getFirst(player).y += 1;
  playTune(keyInput);
});

onInput("w", () => {
  getFirst(player).y -= 1;
  playTune(keyInput);
});

onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(keyInput);
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(keyInput);
});

onInput("j", () => {
  clearText();
  generateMaze();
});

afterInput(() => {
  // Checks win condition
  const win = tilesWith(player, target).length;

  if (win > 0) {
    addText("You win!\nPress j\nto start\nnew round", { 
  x: 5,
  y: 4,
  color: color`4`
});
    playTune(winSound);
  }
});