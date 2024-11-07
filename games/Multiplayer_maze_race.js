/*
@title: Multiplayer maze
@author: odczik
@tags: []
@addedOn: 2024-08-05
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

let mazeSize = 10 // must be even, min: 10
let minMazeSize = 10
let maxMazeSize = 40

let playing = false;

let inputBlock = false;

const player1 = "p"
const player2 = "q"
const wall = "w"
const space = "s"
const background = "b"
const backgroundColor = "c"

setLegend(
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
  [ player1, bitmap`
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
  [ player2, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ space, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222` ],
  [ background, bitmap`
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
  [ backgroundColor, bitmap`
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
0000000000000000` ]
)

setSolids([ wall, player1, player2 ])

if(mazeSize % 2){
  mazeSize--;
}

const updateMapBitmap = () => {
  let mapBitmap = ''
  for(let i = 0; i < mazeSize * 2 + 1; i++){
    let row = ''
    //for(let j = 0; j < (mazeSize + 2) * 2 + 1; j++){
    for(let j = 0; j < mazeSize * 1.25 * 2 + 3; j++){
      //row += 'b'
      row += '.'
    }
    row += '\n'
    mapBitmap += row
  }

  setMap(mapBitmap)
}
updateMapBitmap();

setBackground(backgroundColor)

setPushables({
  [ player1 ]: [],
  [ player2 ]: []
})

/* Rekurzivní náhodné hloubkové hledání */
const generate_maze = (width, height, start) => {
    const grid = [];
    const stack = [];
    for (let row = 0; row < (height * 2) + 1; row++) {
        if (row == 0 || row == (height * 2))
            grid.push(new Array((width * 2) + 1).fill({ wall: true }));
        else {
            grid.push([]);
            for (let col = 0; col < (width * 2) + 1; col++) {
                if (col == 0 || col == (width * 2))
                    grid[row].push({ wall: true });
                else {
                    if (row % 2 != 0 && col % 2 != 0)
                        grid[row].push({ wall: false });
                    else
                        grid[row].push({ wall: true });
                }
            }
        }
    }
    const neighbours_coords = [[0, -2], [2, 0], [0, 2], [-2, 0]];
    const recursive_backtracking = (current) => {
        if (!grid[current[0]][current[1]].visited) {
            grid[current[0]][current[1]].visited = true;
            stack.push(current);
        }
        let neighbours = [];
        neighbours_coords.forEach(coord => {
            let neighbour = [current[0] + coord[0], current[1] + coord[1]];
            if (neighbour[0] > 0 && neighbour[0] < grid.length && neighbour[1] > 0 && neighbour[1] < grid[0].length) {
                if (!grid[neighbour[0]][neighbour[1]].visited)
                    neighbours.push([neighbour[0], neighbour[1]]);
            }
        });
        const next_node = neighbours[Math.floor(Math.random() * neighbours.length)];
        if (next_node) {
            let wall = [current[0] + Math.sign(next_node[0] - current[0]), current[1] + Math.sign(next_node[1] - current[1])];
            grid[wall[0]][wall[1]].wall = false;
            grid[wall[0]][wall[1]].visited = true;
            recursive_backtracking(next_node);
        }
        else {
            stack.pop();
            //if(render) render(grid);
            if (stack.length > 0)
                recursive_backtracking(stack[stack.length - 1]);
        }
    };
    recursive_backtracking(start);
    return grid;
};

const renderMaze = () => {
    clearText();
  
    const gameWidth = (mazeSize + 2) * 2 + 1; // Calculate the total width of the game 
    const boundWidth = mazeSize * 1.25 * 2 + 3; // didn't know I can use width()
    const leftMazeStart = 1; // Calculate the starting position for the left maze
    const rightMazeStart = boundWidth - 4 - mazeSize; // Calculate the starting position for the right maze
    
    //console.log(boundWidth, rightMazeStart, mazeSize);
    
    // left maze
    const maze = generate_maze((mazeSize + 2) / 2, mazeSize, [1, 1]);
    maze[maze.length - 1] = JSON.parse(JSON.stringify(maze[maze.length - 1])) // exit
    maze[maze.length - 1][maze[0].length - 2].wall = false // exit
    maze[1][1].player = true // player
    maze.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.wall) {
          addSprite(colIndex + leftMazeStart, rowIndex, wall)
        } else {
          addSprite(colIndex + leftMazeStart, rowIndex, space)
        }
        if(cell.player) {
          addSprite(colIndex + leftMazeStart, rowIndex, player1)
        }
      });
    });
    
    // right maze
    maze.forEach(row => row.reverse()); // flip maze vertically
    maze.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.wall) {
          addSprite(colIndex + rightMazeStart, rowIndex, wall)
        } else {
          addSprite(colIndex + rightMazeStart, rowIndex, space)
        }
        if(cell.player) {
          addSprite(colIndex + rightMazeStart, rowIndex, player2)
        }
      });
    });
}

onInput("w", () => {
  if(inputBlock) return;
  if(playing) getFirst(player1).y--;
  else {
    updateMapBitmap();
    renderMaze();
    playing = true;
  }
})
onInput("s", () => {
  if(inputBlock) return;
  if(playing) getFirst(player1).y++;
})
onInput("a", () => {
  if(inputBlock) return;
  if(playing) getFirst(player1).x--;
})
onInput("d", () => {
  if(inputBlock) return;
  if(playing) getFirst(player1).x++;
})

onInput("i", () => {
  if(inputBlock) return;
  if(playing) getFirst(player2).y--;
})
onInput("k", () => {
  if(inputBlock) return;
  if(playing) getFirst(player2).y++;
})
onInput("j", () => {
  if(inputBlock) return;
  if(playing) getFirst(player2).x--;
  else if(mazeSize > minMazeSize){
    mazeSize -= 2;
  }
})
onInput("l", () => {
  if(inputBlock) return;
  if(playing) getFirst(player2).x++;
  else if(mazeSize < maxMazeSize){
    mazeSize += 2;
  }
})


afterInput(() => {
  if(inputBlock) return;
  if(playing){
    if(playing && getFirst(player1).y === height() - 1){
      win(1);
    }
    if(playing && getFirst(player2).y === height() - 1){
      win(2);
    }
  } else {
    menu();
  }
})

// menu
const menu = () => {
  clearText();
  
  addText("Multiplayer", {y: 2, color: color`2`});
  addText("maze", {y: 3, color: color`2`});

  addText("Difficulty:  " + mazeSize, {y: 6, color: color`2`});
  if(mazeSize > minMazeSize){
    addText("<", {x: 15, y: 6, color: color`2`});
    addText("j", {x: 15, y: 7, color: color`2`});
  } else {
    addText(" ", {x: 15, y: 6, color: color`2`});
    addText(" ", {x: 15, y: 7, color: color`2`});
  }
  if(mazeSize < maxMazeSize){
    addText(">", {x: 18, y: 6, color: color`2`});
    addText("l", {x: 18, y: 7, color: color`2`});
  } else {
    addText(" ", {x: 18, y: 6, color: color`2`});
    addText(" ", {x: 18, y: 7, color: color`2`});
  }
  
  addText("W to start", {y: 13, color: color`2`});
}

menu();

const win = (player) => {
  inputBlock = true;
  playing = false;
  
  clearText();
  
  updateMapBitmap();

  switch(player){
    case 1:
      addText("Player " + player + " wins!", {y: 3, color: color`3`});
    case 2:
      addText("Player " + player + " wins!", {y: 3, color: color`7`});
  }
  
  addText("W to play again", {y: 10, color: color`2`});
  addText("Any to", {y: 13, color: color`2`});
  addText("return to menu", {y: 14, color: color`2`});

  // 1s delay
  setTimeout(() => {
    inputBlock = false;
  }, 1000)
}
