const snakeBody = "s";
const food = "f";
const background = "b";

let snake = [{ x: 5, y: 5 }];
let direction = { x: 0, y: 1 };
let foodPosition = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) };
let score = 0;
let gameRunning = true;

setLegend(
  [snakeBody, bitmap`
................
................
................
................
................
................
......LLLL......
......LLLL......
......LLLL......
......LLLL......
................
................
................
................
................
................`], 
  [food, bitmap`
................
................
................
................
................
................
......3333......
......3333......
......3333......
......3333......
................
................
................
................
................
................`], 
  [background, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
4444444444444444
4444444444444444
4444444444444444
4444444444444444
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
4444444444444444
4444444444444444
4444444444444444
4444444444444444
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`]
);

setBackground(background);
setMap(createMap());

onInput("w", () => { if (direction.y === 0) direction = { x: 0, y: -1 } });
onInput("s", () => { if (direction.y === 0) direction = { x: 0, y: 1 } });
onInput("a", () => { if (direction.x === 0) direction = { x: -1, y: 0 } });
onInput("d", () => { if (direction.x === 0) direction = { x: 1, y: 0 } });

setInterval(() => {
  if (gameRunning) {
    updateSnakePosition();
    checkFood();
    render();
  }
}, 200);

function createMap() {
  return map`
  bbbbbbbbbb
  bbbbbbbbbb
  bbbbbbbbbb
  bbbbbbbbbb
  bbbbbbbbbb
  bbbbbbbbbb
  bbbbbbbbbb
  bbbbbbbbbb
  bbbbbbbbbb
  bbbbbbbbbb`;
}

function updateSnakePosition() {
  const newHead = {
    x: (snake[0].x + direction.x + 10) % 10,
    y: (snake[0].y + direction.y + 10) % 10
  };

  // Check for collision with itself
  for (let i = 0; i < snake.length; i++) {
    if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
      gameOver();
      return;
    }
  }

  snake.unshift(newHead);

  // Check if the snake has not eaten food
  if (!(newHead.x === foodPosition.x && newHead.y === foodPosition.y)) {
    const tail = snake.pop();
    clearTile(tail.x, tail.y);
  }
}

function checkFood() {
  if (snake[0].x === foodPosition.x && snake[0].y === foodPosition.y) {
    score++;
    placeNewFood();
  }
}

function placeNewFood() {
  let validPosition = false;

  while (!validPosition) {
    foodPosition = {
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10)
    };

    validPosition = !snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y);
  }
}

function render() {
  // Clear and redraw food
  clearTile(foodPosition.x, foodPosition.y);
  addSprite(foodPosition.x, foodPosition.y, food);

  // Redraw snake
  for (let i = 0; i < snake.length; i++) {
    addSprite(snake[i].x, snake[i].y, snakeBody);
  }

  // Update score
  clearText();
  addText(`Score: ${score}`, { x: 0, y: 0, color: color`2` });
}

function gameOver() {
  gameRunning = false;
  clearText();
  addText("Game Over", { x: 3, y: 5, color: color`2` });
  addText(`Score: ${score}`, { x: 3, y: 6, color: color`2` });
}
