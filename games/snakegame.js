/*
@title: SnakeGame
@author: Elijah Grandell
@tags: [snake, game]
@addedOn: 2024-07-11
*/

const player = "p";
const food = "f";

setLegend(
  [ player, bitmap`
................
................
................
................
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
................
................
................
................` ],
  [ food, bitmap`
................
................
.....333333.....
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
.....333333.....
................
................` ]
);

setSolids([]);

let level = 0;
const levels = [
  map`
p.........
..........
..........
..........
..........
..........
..........
..........
..........
..........`
];

setMap(levels[level]);

// Set the background color to brown
addText("", {x: 0, y: 0, color: color`1`});

setPushables({
  [ player ]: []
});

let snake = [{x: 0, y: 0}];
let direction = {x: 1, y: 0};
let foodPosition = {x: 1, y: 1};

function placeFood() {
  const emptyCells = [];
  for (let y = 0; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      if (!getTile(x, y).some(t => t.type === player)) {
        emptyCells.push({x, y});
      }
    }
  }
  foodPosition = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  addSprite(foodPosition.x, foodPosition.y, food);
}

placeFood();

onInput("w", () => {
  if (direction.y === 0) direction = {x: 0, y: -1};
});

onInput("a", () => {
  if (direction.x === 0) direction = {x: -1, y: 0};
});

onInput("s", () => {
  if (direction.y === 0) direction = {x: 0, y: 1};
});

onInput("d", () => {
  if (direction.x === 0) direction = {x: 1, y: 0};
});

function moveSnake() {
  const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
  
  if (head.x < 0 || head.x >= width() || head.y < 0 || head.y >= height() || getTile(head.x, head.y).some(t => t.type === player)) {
    return gameOver();
  }
  
  snake.unshift(head);
  addSprite(head.x, head.y, player);
  
  if (head.x === foodPosition.x && head.y === foodPosition.y) {
    getTile(foodPosition.x, foodPosition.y).forEach(t => {
      if (t.type === food) t.remove();
    });
    placeFood();
  } else {
    const tail = snake.pop();
    getTile(tail.x, tail.y).forEach(t => {
      if (t.type === player) t.remove();
    });
  }
}

function gameOver() {
  clearInterval(gameInterval);
  addText("Game Over", {x: 6, y: 7, color: color`0`});
}

const gameInterval = setInterval(moveSnake, 200);

afterInput(() => {});