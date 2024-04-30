/*
@title: ConnectX
@author: Siddh Patel
@tags: []
@img: ""
@addedOn: 2024-02-03
*/

// Define sprites
const yellow_cursor = "i"
const red_cursor = "j"
const border = "b"
const yellow_chip = "y"
const red_chip = "r"
setLegend(
  [ yellow_cursor, bitmap`
6666666666666666
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6666666666666666`],
  [ red_cursor, bitmap`
3333333333333333
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3333333333333333`], 
  [ border, bitmap`
0000000000000000
000000....000000
0000........0000
000..........000
00............00
00............00
0..............0
0..............0
0..............0
0..............0
00............00
00............00
000..........000
0000........0000
000000....000000
0000000000000000`],
  [ yellow_chip, bitmap`
................
......6666......
....66666666....
...6666666666...
..666666666666..
..666666666666..
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
..666666666666..
..666666666666..
...6666666666...
....66666666....
......6666......
................`],
  [ red_chip, bitmap`
................
......3333......
....33333333....
...3333333333...
..333333333333..
..333333333333..
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
..333333333333..
..333333333333..
...3333333333...
....33333333....
......3333......
................`],
)

// Create levels and board object
var level = 0
const levels = [
  map`
bbbbb
bbbbb
bbbbb
bbbbb
bbbbb`,
  map`
bbbbbbb
bbbbbbb
bbbbbbb
bbbbbbb
bbbbbbb
bbbbbbb`,
  map`
bbbbbbbbb
bbbbbbbbb
bbbbbbbbb
bbbbbbbbb
bbbbbbbbb
bbbbbbbbb
bbbbbbbbb`,
  map`
bbbbbbbbbbb
bbbbbbbbbbb
bbbbbbbbbbb
bbbbbbbbbbb
bbbbbbbbbbb
bbbbbbbbbbb
bbbbbbbbbbb
bbbbbbbbbbb
bbbbbbbbbbb`,
  map`
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbb`,
  map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........`,
]
setMap(levels[level])
var board = [];

// Function to create an empty board array when the map changes
function createBoard() {
  const { numRows, numCols } = getBitmapDimensions(levels[level]);
  board = Array.from({ length: numRows }, () => Array(numCols).fill("_"));
}

// Function to get the dimensions of a map
function getBitmapDimensions(bitmapString) {
  const rows = bitmapString.trim().split('\n');
  const numRows = rows.length;
  const numCols = numRows > 0 ? rows[0].length : 0;
  return { numRows, numCols };
}

// Function to draw the updated board array
function drawBoard() {
  const { numRows, numCols } = getBitmapDimensions(levels[level]);
  for (let x = 0; x < numCols; x++) {
    for (let y = 0; y < numRows; y++) {
      clearTile(x, y);
      addSprite(x, y, border);
      if (board[y][x] == 'y') {
        addSprite(x, y, yellow_chip);
      } else if (board[y][x] == 'r') {
        addSprite(x, y, red_chip);
      };
    };
  };
  // Place the current player's cursor
  if (turn == 'y') {
    if (prevCol != -1) {
      addSprite(prevCol, 0, yellow_cursor);  
    } else {
      addSprite(Math.floor((numCols-1) / 2), 0, yellow_cursor);
    }
  } else {
    if (prevCol != -1) {
      addSprite(prevCol, 0, red_cursor);  
    } else {
      addSprite(Math.floor((numCols-1) / 2), 0, red_cursor);
    }
  }
}

// Function to place the chip
function placeChip(col) {
  const numRows = board.length;
  for (let row = board.length; row > 0; row --) {
    // console.log(board[row-1][col]);
    if (board[row-1][col] == '_') {
      board[row-1][col] = turn;
      if (turn == 'y') {
        turn = 'r';
      } else {
        turn = 'y';
      }
      drawBoard();
      break;
    };
  }

  // Call the check win function, updating scores and displaying text if game is won or drawn
  won = checkWin(level+3);
  if (won == 'y') {
    addText("Yellow Wins", { 
      x: 5,
      y: 5,
      color: color`6`
    })
    yellowWins++;
  } else if (won == 'r') {
    addText("Red Wins", { 
      x: 6,
      y: 5,
      color: color`3`
    })
    redWins++;
  } else if (won == 'draw') {
    addText("Draw", { 
      x: 8,
      y: 5,
      color: color`1`
    })
    redWins+=0.5;
    yellowWins+=0.5;
  }

  // Change level or end game completely (if on last level)
  if (won != null || won == 'draw') {
    if (level != 9) {
      if (altTurn == 'y') {
          turn = 'r';
          altTurn = 'r';
      } else {
          turn = 'y';
          altTurn = 'y';
      }
      won = null;
      level++;
      setMap(levels[level]);
      board = [];
      prevCol = -1;
      createBoard();
      drawBoard();
      addText("Connect " + (level+3), { 
        x: 5,
        y: 7,
        color: color`1`
      })
    } else {
      level++;
      setMap(levels[level]);
      var winner;
      if (redWins > yellowWins) {
          winner = 'Red';
      } else if (yellowWins > redWins) {
          winner = 'Yellow';
      } else {
          winner = 'Draw';
      }
      clearText();
      addText("The Winner is:", { 
        x: 3,
        y: 6,
        color: color`0`
      })
      addText(winner + "!", { 
        x: 10 - (Math.floor(winner.length / 2)),
        y: 8,
        color: color`0`
      })
    }
  }
}

// Function to check win
function checkWin(x) {
  const numRows = board.length;
  const numCols = board[0].length;

  // Function to check for a connect-X sequence in a specific direction
  function checkDirection(row, col, rowDelta, colDelta, player) {
    for (let i = 0; i < x; i++) {
      const newRow = row + i * rowDelta;
      const newCol = col + i * colDelta;
      // Check if the position is within the board boundaries
      if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols) {
        return false;
      }
      // Check if the current position contains the player's chip
      if (board[newRow][newCol] !== player) {
        return false;
      }
    }
    return true;
  }

  // Function to check for a connect-X win in all directions
  function checkAllDirections(row, col, player) {
    const directions = [
      [0, 1],  // Horizontal
      [1, 0],  // Vertical
      [1, 1],  // Diagonal (top-left to bottom-right)
      [1, -1], // Diagonal (top-right to bottom-left)
    ];
    for (const [rowDelta, colDelta] of directions) {
      if (checkDirection(row, col, rowDelta, colDelta, player)) {
        return true;
      }
    }
    return false;
  }

  // Iterate through each position on the board
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const currentPlayer = board[row][col];
      // Skip empty positions
      if (currentPlayer === '_') {
        continue;
      }
      // Check for a connect-X win starting from the current position
      if (checkAllDirections(row, col, currentPlayer)) {
        return currentPlayer; // Return the winning player (either 'y' or 'r')
      }
    }
  }

  // Check for draw
  var full = true;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (board[row][col] == '_') {
        full = false;
      }
    }
  }
  if (full) {
    return 'draw';
  }
  
  // No winner found
  return null;
}

// Start the game
var turn = 'y';
var altTurn = 'y';
var won = null;
var redWins = 0;
var yellowWins = 0;
var prevCol = -1;
createBoard();
drawBoard();
addText("Connect " + (level+3), { 
  x: 5,
  y: 7,
  color: color`1`
});

// Input event listeners
onInput("a", () => {
  clearText();
  if (turn == 'y') {
    getFirst(yellow_cursor).x -= 1
  }
  else {
    getFirst(red_cursor).x -= 1
  }
})
onInput("d", () => {
  clearText();
  if (turn == 'y') {
    getFirst(yellow_cursor).x += 1
  }
  else {
    getFirst(red_cursor).x += 1
  }
})
onInput("k", () => {
  if (won == null) {
    if (turn == 'y') {
      if (board[0][getFirst(yellow_cursor).x] == '_') {
        prevCol = getFirst(yellow_cursor).x;
        placeChip(getFirst(yellow_cursor).x);
      }
    }
    else {
      if (board[0][getFirst(red_cursor).x] == '_') {
        prevCol = getFirst(red_cursor).x;
        placeChip(getFirst(red_cursor).x);
      }
    }
  }
})
