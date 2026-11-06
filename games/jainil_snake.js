/*
@title: Snake
*/

const head = "h";
const body = "b";
const food = "f";

setLegend(
  [head, bitmap`
................
................
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
................
................`],
  [body, bitmap`
................
................
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
................
................`],
  [food, bitmap`
................
................
................
................
......3333......
.....333333.....
....33333333....
....33333333....
....33333333....
....33333333....
.....333333.....
......3333......
................
................
................
................`]
);

const W = 10;
const H = 8;

setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`);

let snake, dir, nextDir, foodPos, score, alive, timer, grow;

function placeFood() {
  do {
    foodPos = {
      x: Math.floor(Math.random() * W),
      y: Math.floor(Math.random() * H)
    };
  } while (snake.some(s => s.x === foodPos.x && s.y === foodPos.y));
}

function draw() {
  [head, body, food].forEach(t => getAll(t).forEach(s => s.remove()));
  addSprite(foodPos.x, foodPos.y, food);
  snake.forEach((s, i) => addSprite(s.x, s.y, i === 0 ? head : body));
  clearText();
  addText("Score: " + score, { x: 1, y: 0, color: color`0` });
}

function gameOver() {
  alive = false;
  clearInterval(timer);
  addText("Game Over!", { x: 5, y: 6, color: color`3` });
  addText("Press J", { x: 6, y: 8, color: color`0` });
}

function step() {
  dir = nextDir;
  const nx = (snake[0].x + dir.x + W) % W;
  const ny = (snake[0].y + dir.y + H) % H;

  // hit yourself
  if (snake.some(s => s.x === nx && s.y === ny)) {
    gameOver();
    return;
  }

  snake.unshift({ x: nx, y: ny });

  if (nx === foodPos.x && ny === foodPos.y) {
    score++;
    grow += 1;
    placeFood();
  }
  if (grow > 0) {
    grow--;
  } else {
    snake.pop();
  }
  draw();
}

function startGame() {
  clearInterval(timer);
  snake = [{ x: 4, y: 4 }];
  dir = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
  score = 0;
  grow = 0;
  alive = true;
  placeFood();
  draw();
  timer = setInterval(step, 250);
}

// Controls: WASD and IJKL both work
function turn(x, y) {
  if (dir.x !== -x || dir.y !== -y) nextDir = { x: x, y: y };
}
onInput("w", () => turn(0, -1));
onInput("s", () => turn(0, 1));
onInput("a", () => turn(-1, 0));
onInput("d", () => turn(1, 0));
onInput("i", () => turn(0, -1));
onInput("k", () => turn(0, 1));
onInput("j", () => turn(-1, 0));
onInput("l", () => turn(1, 0));

// Restart: press J after Game Over
onInput("j", () => { if (!alive) startGame(); });

startGame();
