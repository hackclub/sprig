/*
@title: Snake_game
@author: Tejaji
@description: Guide your hungry snake to gobble up as many apples as possible without hitting the walls or biting its own tail. Each apple you eat makes the snake longer — and surviving longer means scoring higher!
@tags: [snake]
@addedOn: 2025-11-02
*/

const player1 = "1";
const player2 = "2";
const food = "f";

setLegend(
  [player1, bitmap`
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
  [player2, bitmap`
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
  [food, bitmap`
.....D.....D....
......D.D.D.....
...9999999999...
..999999999999..
.99999999999999.
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
.99999999999999.
..999999999999..
...9999999999...
....99999999....
.....999999.....`]
);

setSolids([]);

// 8x8 map
let level = map`
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............`;

setMap(level);

let snake1 = [{x: 1, y: 1}];
let dir1 = {x: 1, y: 0};

let snake2 = [{x: 6, y: 6}];
let dir2 = {x: -1, y: 0};

let foodPos = {x: 4, y: 4};
addSprite(foodPos.x, foodPos.y, food);

function draw() {
  setMap(level);
  addSprite(foodPos.x, foodPos.y, food);
  snake1.forEach(seg => {
    if (inBounds(seg)) addSprite(seg.x, seg.y, player1);
  });
  snake2.forEach(seg => {
    if (inBounds(seg)) addSprite(seg.x, seg.y, player2);
  });
}

function inBounds(pos) {
  return pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8;
}

function moveSnake(snake, dir) {
  const head = snake[0];
  const newHead = {x: head.x + dir.x, y: head.y + dir.y};
  snake.unshift(newHead);
  snake.pop();
}

function growSnake(snake) {
  const tail = snake[snake.length - 1];
  snake.push({...tail});
}

function samePos(a, b) {
  return a.x === b.x && a.y === b.y;
}

function spawnFood() {
  foodPos = {x: Math.floor(Math.random() * 8), y: Math.floor(Math.random() * 8)};
}

function checkCollision(snake) {
  const head = snake[0];
  if (!inBounds(head)) return true;
  for (let i = 1; i < snake.length; i++) {
    if (samePos(head, snake[i])) return true;
  }
  return false;
}

onInput("w", () => (dir1 = {x: 0, y: -1}));
onInput("s", () => (dir1 = {x: 0, y: 1}));
onInput("a", () => (dir1 = {x: -1, y: 0}));
onInput("d", () => (dir1 = {x: 1, y: 0}));

onInput("i", () => (dir2 = {x: 0, y: -1}));
onInput("k", () => (dir2 = {x: 0, y: 1}));
onInput("j", () => (dir2 = {x: -1, y: 0}));
onInput("l", () => (dir2 = {x: 1, y: 0}));

function gameOver(msg) {
  addText(msg, {x: 1, y: 3, color: color`3`});
  setTimeout(() => resetGame(), 1500);
}

function resetGame() {
  snake1 = [{x: 1, y: 1}];
  dir1 = {x: 1, y: 0};
  snake2 = [{x: 6, y: 6}];
  dir2 = {x: -1, y: 0};
  spawnFood();
}

setInterval(() => {
  moveSnake(snake1, dir1);
  moveSnake(snake2, dir2);

  // Eating food
  if (samePos(snake1[0], foodPos)) {
    growSnake(snake1);
    spawnFood();
  }
  if (samePos(snake2[0], foodPos)) {
    growSnake(snake2);
    spawnFood();
  }

  // Collisions
  if (checkCollision(snake1) || samePos(snake1[0], snake2[0])) {
    gameOver("Player 2 Wins!");
  } else if (checkCollision(snake2) || samePos(snake2[0], snake1[0])) {
    gameOver("Player 1 Wins!");
  }

  draw();
}, 300);
