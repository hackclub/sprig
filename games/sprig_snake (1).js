/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Sprig Snake Game
@author: Ruelle Casey
@tags: [snake, port]
@addedOn: 2024-17-11
*/
const snakeHead = "H";
const snakeBody = "B";
const apple = "A";
const backgroundTile = "z";

let score = 0;
// Initialize the legend for Sprig graphics
setLegend(
  [snakeHead, bitmap`
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
0000000000000000`],
  [snakeBody, bitmap`
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
0000000000000000`],
  [apple, bitmap`
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
0000000000000000`],
  [backgroundTile, bitmap`
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
4444444444444444`]
);

// Function to spawn an apple at a random position, ensuring it doesn't overlap the snake
function spawnApple() {
  let x, y;
  do {
    x = Math.floor(Math.random() * width());
    y = Math.floor(Math.random() * height());
  } while (snake.some(segment => segment.x === x && segment.y === y));
  
  addSprite(x, y, apple);
  return { x, y };
}

// Function to check if the snake's head collides with its body
function isCollision(pos) {
  return snake.some((segment, index) => index !== 0 && segment.x === pos.x && segment.y === pos.y);
}

// initialize variables
setMap(map`
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................`);
setBackground(backgroundTile);

let snake = [{x: 5, y: 5}];
let direction = {x: 1, y: 0};
let applePosition = spawnApple();
let gameOver = false;

// Function to draw the snake
function drawSnake() {
  // Clear previous head position
  snake.forEach(segment => clearTile(segment.x, segment.y));
  
  // Draw each bit of snake on the map
  snake.forEach((segment, index) => {
    addSprite(segment.x, segment.y, index === 0 ? snakeHead : snakeBody);
  });
}

// Place snake and le apol
drawSnake();

// inp movement
onInput("w", () => direction = {x: 0, y: -1});
onInput("s", () => direction = {x: 0, y: 1});
onInput("a", () => direction = {x: -1, y: 0});
onInput("d", () => direction = {x: 1, y: 0});

// gay loop
setInterval(() => {
  if (gameOver) return;

  // Move the snake by adding a new head in the direction of movement
  let head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
  snake.unshift(head);

  // Check for collision with the apple
  if (head.x === applePosition.x && head.y === applePosition.y) {
    // Apple is eaten; spawn a new one
    score = +5
    applePosition = spawnApple();
  } else {
    // Remove the tail segment if no apple is eaten
    let tail = snake.pop();
    clearTile(tail.x, tail.y);
  }

  // Check for wall or self-collision
  if (head.x < 0 || head.y < 0 || head.x >= width() || head.y >= height() || isCollision(head)) {
    gameOver = true;
    addText("Game Over!", {x: 5, y: 5, color: color`3`});
    addText(`Score: ${score}`, {x: 5, y: 7, color: color`6`});
  } else {
    drawSnake(); // Draw updated snake position
  }
}, 200);