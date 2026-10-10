// @title: Retro Snake Chime
// @author: Rajiv Kumar
// @tags: ['classic', 'retro']
// @addedOn: 2026-10-10
// @description: A classic snake game built with optimized rendering functions and sound effects. Eat fruit to grow, avoid the walls and yourself!


let snake = [{x:8, y:8}, {x:7, y:8}, {x:6, y:8}];
let dx = 1;
let dy = 0;
let fx = 11;
let fy = 8;
let lose = false;

setLegend(
  ["w", bitmap`
................
................
..000000000000..
..088888888880..
..080000000080..
..080000000080..
..080000000080..
..080000000080..
..080000000080..
..080000000080..
..080000000080..
..080000000080..
..088888888880..
..000000000000..
................
................`],
  ["h", bitmap`
................
................
....55555555....
...5000000005...
..500100001005..
..501000000105..
..500000000005..
..500000000005..
..500555555555..
..500000000005..
..500000000005..
...5000000005...
....55555555....
................
................
................`],
  ["b", bitmap`
................
................
....55555555....
...5000000005...
..500000000005..
..500000000005..
..500000000005..
..500000000005..
..500000000005..
..500000000005..
..500000000005..
...5000000005...
....55555555....
................
................
................`],
  ["f", bitmap`
................
................
.....00.........
....0220........
...022220.......
..02222220......
..02222220......
.0222222220.....
.0222222220.....
..02222220......
..02222220......
...022220.......
....0220........
.....00.........
................
................`]
);

const mapTemplate = map`
wwwwwwwwwwwwwwww
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
wwwwwwwwwwwwwwww
`;

function drawGame() {
  setMap(mapTemplate);
  
  if (!lose) {
    addSprite(fx, fy, "f");
  }

  for (let i = 1; i < snake.length; i++) {
    addSprite(snake[i].x, snake[i].y, "b");
  }

  addSprite(snake[0].x, snake[0].y, "h");
}

function spawnFood() {
  let valid = false;
  while (!valid) {
    fx = Math.floor(Math.random() * 14) + 1;
    fy = Math.floor(Math.random() * 14) + 1;
    valid = true;
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === fx && snake[i].y === fy) {
        valid = false;
      }
    }
  }
}

onInput("w", () => { if (dy !== 1) { dx = 0; dy = -1; } });
onInput("s", () => { if (dy !== -1) { dx = 0; dy = 1; } });
onInput("a", () => { if (dx !== 1) { dx = -1; dy = 0; } });
onInput("d", () => { if (dx !== -1) { dx = 1; dy = 0; } });

function updateGame() {
  if (lose) return;

  let head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (head.x <= 0 || head.x >= 15 || head.y <= 0 || head.y >= 15) {
    lose = true;
    addText("Game Over!", { y: 7, color: color`2` });
    return;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      lose = true;
      addText("Game Over!", { y: 7, color: color`2` });
      return;
    }
  }

  snake.unshift(head);

  if (head.x === fx && head.y === fy) {
    playTune(tune`50ms c5`);
    spawnFood();
  } else {
    snake.pop();
  }

  drawGame();
}

drawGame();
setInterval(updateGame, 200);
