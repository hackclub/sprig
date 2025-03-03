// Sprig Simon Says Game
/*

@title: TicTacToe
@author: Youssef Tech
@tags: [memory]
@addedOn: 2025-03-03

*/

// Sprites
const red = "R";
const green = "G";
const blue = "B";
const yellow = "Y";
const cursor = "C";

setLegend(
  [red, bitmap`
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
3333333333333333`],
  [green, bitmap`
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
4444444444444444`],
  [blue, bitmap`
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
7777777777777777`],
  [yellow, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [cursor, bitmap`
................
................
................
................
.....000000.....
....00....00....
....0......0....
....0......0....
....0......0....
....0......0....
....00....00....
.....000000.....
................
................
................
................`]
);

// Board and cursor
let board = [
  [red, green],
  [blue, yellow]
];

let cursorPosition = { row: 0, col: 0 };

// Draw the board with cursor
function drawBoard() {
  let mapString = '';
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 2; col++) {
      if (row === cursorPosition.row && col === cursorPosition.col) {
        mapString += cursor;
      } else {
        mapString += board[row][col];
      }
    }
    mapString += '\n';
  }
  setMap(map`${mapString}`);
}

drawBoard();

// Game logic variables
let gameSequence = [];
let playerSequence = [];
let level = 0;
let acceptingInput = false;

// Add a random color to the sequence
function addRandomStep() {
  const colors = [red, green, blue, yellow];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameSequence.push(randomColor);
}

// Highlight color by briefly replacing map with only that color
function highlightColor(color) {
  setMap(map`${color}${color}\n${color}${color}`);
}

// Clear highlight and show normal board
function clearHighlight() {
  drawBoard();
}

// Show the sequence to player (one color at a time)
async function displaySequence() {
  acceptingInput = false;
  for (let color of gameSequence) {
    highlightColor(color);
    await new Promise(resolve => setTimeout(resolve, 600));
    clearHighlight();
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  acceptingInput = true;
}

// Move cursor on the 2x2 grid
function moveCursor(rowOffset, colOffset) {
  if (!acceptingInput) return;
  const newRow = cursorPosition.row + rowOffset;
  const newCol = cursorPosition.col + colOffset;
  if (newRow >= 0 && newRow < 2 && newCol >= 0 && newCol < 2) {
    cursorPosition = { row: newRow, col: newCol };
    drawBoard();
  }
}

// Handle player selecting a color
function selectColor() {
  if (!acceptingInput) return;
  const { row, col } = cursorPosition;
  const selectedColor = board[row][col];
  playerSequence.push(selectedColor);

  highlightColor(selectedColor);
  setTimeout(() => {
    clearHighlight();
    checkPlayerInput();
  }, 300);
}

// Check if player's input matches game sequence
function checkPlayerInput() {
  const currentStep = playerSequence.length - 1;
  if (playerSequence[currentStep] !== gameSequence[currentStep]) {
    endGame();
    return;
  }

  if (playerSequence.length === gameSequence.length) {
    // Player completed level
    level++;
    playerSequence = [];
    addRandomStep();
    setTimeout(() => {
      displaySequence();
    }, 1000);
  }
}

// Start new game
function startGame() {
  level = 1;
  gameSequence = [];
  playerSequence = [];
  addRandomStep();
  displaySequence();
}

// Game over screen
function endGame() {
  acceptingInput = false;
  clearText();
  addText("Game Over!", { y: 4, color: color`9` });
  addText("Press i to Restart", { y: 6, color: color`9` });

  onInput("i", () => {
    clearText();
    startGame();
  });
}

// Input handlers
onInput("w", () => moveCursor(-1, 0));
onInput("s", () => moveCursor(1, 0));
onInput("a", () => moveCursor(0, -1));
onInput("d", () => moveCursor(0, 1));
onInput("i", selectColor);

// Start game when script loads
startGame();
