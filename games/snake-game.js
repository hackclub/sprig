const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = 400;
canvas.height = 400;
canvas.style.border = "2px solid black";
canvas.style.backgroundColor = "#fff";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.height = "100vh";
document.body.style.margin = "0";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.backgroundColor = "#f0f0f0";

const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 1, y: 0 };
let score = 0;

function drawGame() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "green";
  for (let segment of snake) {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function updateGame() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert("Game Over! Your score: " + score);
    resetGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
  } else {
    snake.pop();
  }
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 1, y: 0 };
  score = 0;
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);
}

function changeDirection(event) {
  const key = event.key;
  if (key === "ArrowUp" && direction.y === 0) {
    direction.x = 0;
    direction.y = -1;
  } else if (key === "ArrowDown" && direction.y === 0) {
    direction.x = 0;
    direction.y = 1;
  } else if (key === "ArrowLeft" && direction.x === 0) {
    direction.x = -1;
    direction.y = 0;
  } else if (key === "ArrowRight" && direction.x === 0) {
    direction.x = 1;
    direction.y = 0;
  }
}

document.addEventListener("keydown", changeDirection);

function gameLoop() {
  updateGame();
  drawGame();
  setTimeout(gameLoop, 100);
}

resetGame();
gameLoop();