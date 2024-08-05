/*
@title: Snake Game
@tags: ['beginner', 'tutorial']
@addedOn: 2024-08-05
@author: OpenAI
*/

// Define the sprites for the Snake game
const snakeHead = "h";
const snakeBody = "b";
const fruitSprite = "f";
const wall = "w";

// Assign bitmap art to each sprite using setLegend
setLegend(
  [snakeHead, bitmap`
................
................
................
......00000.....
.....0.....0....
.....0.....0....
.....0.....0....
.....0.....0....
.....0.....0....
......00000.....
................
................
................
................
................
................
................`],
  [snakeBody, bitmap`
................
................
................
.....000000.....
.....000000.....
.....000000.....
.....000000.....
.....000000.....
.....000000.....
................
................
................
................
................
................
................
................`],
  [fruitSprite, bitmap`
................
................
................
................
.....0.....0....
.....0.....0....
......00000.....
................
................
................
................
................
................
................
................
................`],
  [wall, bitmap`
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
0000000000000000`]
);

// Create game variables
const scale = 20; // Size of each tile
let snake;
let fruit;
let dx = scale; // Initial movement direction (right)
let dy = 0; // Initial movement direction (none)
let isGameOver = false;

// Design the game level using a map
const level = map`
wwwwwwwwwwwwwwwwww
w................w
w................w
w...............fw
w................w
w................w
w................w
w................w
w................w
w................w
w................w
w................w
w................w
w................w
w................w
wwwwwwwwwwwwwwwwww`;

// Set the solid tiles using setSolids
setMap(level);
setSolids([snakeHead, snakeBody, wall]);

// Initialize the snake and fruit positions
function init() {
  snake = [
    { x: 4 * scale, y: 4 * scale },
    { x: 3 * scale, y: 4 * scale },
    { x: 2 * scale, y: 4 * scale }
  ];
  fruit = {
    x: Math.floor(Math.random() * 14 + 1) * scale, // Random position within bounds
    y: Math.floor(Math.random() * 14 + 1) * scale  // Random position within bounds
  };
  dx = scale;
  dy = 0;
  isGameOver = false;
  setMap(level);
  draw();
}

// Draw the snake and fruit on the map
function draw() {
  // Clear the map and redraw
  setMap(level);

  // Draw the snake
  snake.forEach((segment, index) => {
    const sprite = index === 0 ? snakeHead : snakeBody;
    setTile(segment.x / scale, segment.y / scale, sprite);
  });

  // Draw the fruit
  setTile(fruit.x / scale, fruit.y / scale, fruitSprite);
}

// Update the game state
function update() {
  if (isGameOver) return;

  // Move the snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check if the snake eats the fruit
  if (head.x === fruit.x && head.y === fruit.y) {
    // Place new fruit
    fruit = {
      x: Math.floor(Math.random() * 14 + 1) * scale,
      y: Math.floor(Math.random() * 14 + 1) * scale
    };
  } else {
    // Remove the tail if not eating fruit
    snake.pop();
  }

  // Check for collisions
  if (head.x < 0 || head.x >= 15 * scale || head.y < 0 || head.y >= 15 * scale ||
      snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
    isGameOver = true;
    addText("Game Over", { y: 4, color: color`3` });
    return;
  }

  draw();
}

// Handle player input for changing the direction of the snake
function changeDirection(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (dy === 0) {
        dx = 0;
        dy = -scale;
      }
      break;
    case 'ArrowDown':
      if (dy === 0) {
        dx = 0;
        dy = scale;
      }
      break;
    case 'ArrowLeft':
      if (dx === 0) {
        dx = -scale;
        dy = 0;
      }
      break;
    case 'ArrowRight':
      if (dx === 0) {
        dx = scale;
        dy = 0;
      }
      break;
  }
}

// Set up the game by initializing, adding event listeners, and updating the game at regular intervals
window.onload = () => {
  init();
  document.addEventListener('keydown', changeDirection);
  setInterval(update, 200); // Update every 200ms
};
