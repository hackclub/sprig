// Create main elements via JavaScript
const h1 = document.createElement("h1");
h1.textContent = "Diamond Mine";
document.body.appendChild(h1);

const scoreEl = document.createElement("div");
scoreEl.id = "score";
scoreEl.textContent = "Score: 0";
document.body.appendChild(scoreEl);

const gridEl = document.createElement("div");
gridEl.id = "grid";
document.body.appendChild(gridEl);

const gameOverEl = document.createElement("div");
gameOverEl.id = "gameover";
document.body.appendChild(gameOverEl);

const restartBtn = document.createElement("button");
restartBtn.textContent = "Restart Game";
restartBtn.style.display = "none";
restartBtn.style.marginTop = "15px";
restartBtn.style.padding = "10px 20px";
restartBtn.style.fontSize = "16px";
document.body.appendChild(restartBtn);

// Add basic styles
const ROWS = 7;
const COLS = 7;
const DIAMOND_COUNT = 12;
const BOMB_COUNT = 5;

const style = document.createElement("style");
style.textContent = `
  body {
    background: #222;
    font-family: Arial, sans-serif;
    color: white;
    text-align: center;
    padding: 20px;
  }
  #score {
    font-size: 18px;
    margin-bottom: 20px;
  }
  #grid {
    display: grid;
    grid-template-columns: repeat(${COLS}, 30px);
    grid-template-rows: repeat(${ROWS}, 30px);
    gap: 2px;
    justify-content: center;
  }
  .cell {
    width: 30px;
    height: 30px;
    background: gray;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-sizing: border-box;
    user-select: none;
  }
  .revealed {
    background: #ddd;
  }
  .diamond {
    color: cyan;
  }
  .bomb {
    color: red;
  }
  .cursor {
    border: 2px solid yellow;
  }
  #gameover {
    font-size: 24px;
    color: red;
    margin-top: 20px;
  }
  button {
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #4caf50;
    color: white;
  }
  button:hover {
    background-color: #45a049;
  }
`;
document.head.appendChild(style);

// Game variables and grid
let grid = [];
let cursor = { row: 0, col: 0 };
let score = 0;
let gameOver = false;

// Initialize game
function initGame() {
  gridEl.innerHTML = "";
  gameOverEl.textContent = "";
  restartBtn.style.display = "none";
  score = 0;
  gameOver = false;
  cursor = { row: 0, col: 0 };

  // Create grid cells
  grid = [];
  for (let r = 0; r < ROWS; r++) {
    let row = [];
    for (let c = 0; c < COLS; c++) {
      const el = document.createElement("div");
      el.classList.add("cell");
      gridEl.appendChild(el);
      row.push({
        diamond: false,
        bomb: false,
        revealed: false,
        el,
      });
    }
    grid.push(row);
  }

  // Place diamonds
  let placedDiamonds = 0;
  while (placedDiamonds < DIAMOND_COUNT) {
    let r = Math.floor(Math.random() * ROWS);
    let c = Math.floor(Math.random() * COLS);
    if (!grid[r][c].diamond && !grid[r][c].bomb) {
      grid[r][c].diamond = true;
      placedDiamonds++;
    }
  }

  // Place bombs
  let placedBombs = 0;
  while (placedBombs < BOMB_COUNT) {
    let r = Math.floor(Math.random() * ROWS);
    let c = Math.floor(Math.random() * COLS);
    if (!grid[r][c].diamond && !grid[r][c].bomb) {
      grid[r][c].bomb = true;
      placedBombs++;
    }
  }

  updateScore();
  drawGrid();
}

// Draw the grid and cursor
function drawGrid() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = grid[r][c];
      cell.el.classList.remove("cursor", "bomb", "diamond");
      cell.el.textContent = "";

      if (cell.revealed) {
        cell.el.classList.add("revealed");
        if (cell.bomb) {
          cell.el.textContent = "💣";
          cell.el.classList.add("bomb");
        } else if (cell.diamond) {
          cell.el.textContent = "💎";
          cell.el.classList.add("diamond");
        }
      } else {
        cell.el.classList.remove("revealed");
      }
    }
  }
  if (!gameOver) {
    grid[cursor.row][cursor.col].el.classList.add("cursor");
  }
}

// Update score display
function updateScore() {
  scoreEl.textContent = `Score: ${score}`;
}

// End the game when hitting a bomb
function endGame() {
  gameOver = true;
  gameOverEl.textContent = "💥 Game Over! You hit a bomb!";
  restartBtn.style.display = "inline-block";
  drawGrid();
}

// Keyboard controls
window.addEventListener("keydown", (e) => {
  if (gameOver) return;

  const { row, col } = cursor;
  if (e.key === "ArrowUp" && row > 0) cursor.row--;
  else if (e.key === "ArrowDown" && row < ROWS - 1) cursor.row++;
  else if (e.key === "ArrowLeft" && col > 0) cursor.col--;
  else if (e.key === "ArrowRight" && col < COLS - 1) cursor.col++;

  if (e.key === "Enter" || e.key === " ") {
    const cell = grid[cursor.row][cursor.col];
    if (!cell.revealed) {
      cell.revealed = true;
      if (cell.bomb) {
        endGame();
      } else if (cell.diamond) {
        score++;
        updateScore();
      }
    }
  }

  drawGrid();
});

// Restart button click
restartBtn.addEventListener("click", () => {
  initGame();
});

// Start the game
initGame();
