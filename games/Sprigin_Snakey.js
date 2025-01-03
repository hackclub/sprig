/*
@title: Sprigin Snakey
@author: hcjk
@tags: []
@addedOn: 2024-11-01
*/
const player = "p";
const wall = "w";
const food = "l";
const uitop = "u";
const uidown = "d";
const uidown2 = "2";
const speedIncrement = 0.25;
const body = "b";
const background = "s";
let baseSpeed = 2;
const maxSpeed = 12;
let speed = baseSpeed;
let score = 0;
let gameOver = false;
let snake = [{ x: 5, y: 5 }];
let direction = { x: 0, y: 0 };
let nextDirection = { x: 0, y: 0 };
let lastPositionUpdate = Date.now();

setLegend(
  [player, bitmap`
......4444......
......444444....
....004440......
...002222000....
..00222222200...
..020022200.0...
..00270207200...
..02000200020...
..02222222220...
..02222222220...
..00022222000...
.0222202022220..
.0222220222220..
.0222222222220..
..00000000000...
................`], 
  [wall, bitmap`
4444444444444444
4DD4444DD4444DD4
4DD4444DD4444DD4
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4DD4444DD4444DD4
4DD4444DD4444DD4
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4DD4444DD4444DD4
4DD4444DD4444DD4
4444444444444444`],
  [food, bitmap`
................
..D.............
..DDDD..........
..D44DD.........
..D444D.........
..D444DD........
..D4444DD.......
..D44D44DD......
..DD44D44DDDD...
...D444D44444D..
...DD444D4444D..
....DD444D444DD.
.....DDD444444D.
.......DDDDDDDD.
................
................`],
  [uitop, bitmap`
5777777777777775
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
5777777777777775`], 
  [uidown, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
0000000000000000
4444444444444444
4444444444444444
44DD44444444DD44
44DD44444444DD44
4444444444444444
4444444444444444`], 
  [uidown2, bitmap`
4444444444444444
4444444444444444
44DD44444444DD44
44DD44444444DD44
4444444444444444
4444444444444444
0000000000000000
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],   
  [body, bitmap`
................
....00000000....
...0222222220...
..022222222220..
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
..022222222220..
...0222222220...
....00000000....
................`],
  [background, bitmap`
1122222222222211
1222222222222221
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
1222222222222221
1122222222222211`]
);

setMap(map`
www22222222222222www
wwwuuuuuuuuuuuuuuwww
wwwddddddddddddddwww
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
wwwwwwwwwwwwwwwwwwww`);

setBackground(background)

setSolids([player, wall]);

function spawnFood() {
  let validPositions = [];
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      if (
        tilesWith(wall).some(tile => tile.x === x && tile.y === y) || 
        snake.some(segment => segment.x === x && segment.y === y) ||
        y < 4 || y >= height() - 2 || x < 2 || x >= width() - 2
      ) continue;
      
      validPositions.push({ x, y });
    }
  }

  if (validPositions.length > 0) {
    const spawnPoint = validPositions[Math.floor(Math.random() * validPositions.length)];
    addSprite(spawnPoint.x, spawnPoint.y, food);
  }
}

function playEatSound() {
  playTune(tune`
260.8695652173913: B4-260.8695652173913,
260.8695652173913: C5-260.8695652173913,
7826.086956521739`);
}

function playGameOverSound() {
  playTune(tune`
147.7832512315271: G5-147.7832512315271,
147.7832512315271: F5-147.7832512315271,
147.7832512315271: E5-147.7832512315271,
147.7832512315271: D5-147.7832512315271,
147.7832512315271: C5-147.7832512315271,
147.7832512315271: B4-147.7832512315271,
147.7832512315271: A4-147.7832512315271,
3694.581280788177`);
}

function playWinSound() {
  playTune(tune`
153.84615384615384: D4-153.84615384615384,
153.84615384615384: E4-153.84615384615384,
153.84615384615384: F4-153.84615384615384,
153.84615384615384: G4-153.84615384615384,
153.84615384615384: F4-153.84615384615384,
153.84615384615384,
153.84615384615384: G4-153.84615384615384,
153.84615384615384: A4-153.84615384615384,
153.84615384615384: B4-153.84615384615384,
153.84615384615384: C5-153.84615384615384,
153.84615384615384: B4-153.84615384615384,
153.84615384615384,
153.84615384615384: C5-153.84615384615384,
153.84615384615384: D5-153.84615384615384,
153.84615384615384: E5-153.84615384615384,
153.84615384615384: F5-153.84615384615384,
153.84615384615384: G5-153.84615384615384,
153.84615384615384: G5-153.84615384615384,
153.84615384615384: G5-153.84615384615384,
153.84615384615384: B5-153.84615384615384,
153.84615384615384: B5-153.84615384615384,
153.84615384615384: B5-153.84615384615384,
153.84615384615384: B5-153.84615384615384,
1384.6153846153845`);
}

function startGame() {
  speed = baseSpeed;
  score = 0;
  gameOver = false;
  snake = [{ x: 5, y: 5 }];
  direction = { x: 0, y: 0 };
  nextDirection = { x: 0, y: 0 };
  clearText();
  addSprite(snake[0].x, snake[0].y, player);
  spawnFood();
  loop();
}

function loop() {
  if (gameOver) return;

  const now = Date.now();
  if (now - lastPositionUpdate < 1000 / speed) {
    setTimeout(loop, 50);
    return;
  }

  direction = nextDirection;
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (
    head.x < 1 || head.x >= width() - 1 || head.y < 3 || head.y >= height() - 1
  ) {
    gameOver = true;
    playGameOverSound();
    addText("Game Over!", { x: 5, y: 5, color: color`3` });
    return;
  }

  const isCollidingWithSelf = snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
  if (isCollidingWithSelf) {
    gameOver = true;
    playGameOverSound();
    addText("Game Over!", { x: 5, y: 5, color: color`3` });
    return;
  }

  if (getTile(head.x, head.y).some(sprite => sprite.type === food)) {
    playEatSound();
    score += 1;
    if (speed < maxSpeed) {
        speed += speedIncrement;
        if (speed > maxSpeed) {
            speed = maxSpeed;
        }
    }
        if (score >= 214) {
          gameOver = true;
      addText("Congratulations!", { x: 3, y: 5, color: color`6` });
      playWinSound();
          return;
    }
    spawnFood();
  } else {
    const tail = snake.pop();
    clearTile(tail.x, tail.y);
  }

  snake.unshift(head);
  clearTile(snake[0].x, snake[0].y);
  addSprite(snake[0].x, snake[0].y, player);
  for (let i = 1; i < snake.length; i++) {
    clearTile(snake[i].x, snake[i].y);
    addSprite(snake[i].x, snake[i].y, body);
  }

  addText("Leaves: " + score, { x: 4, y: 1, color: color`5` });

  lastPositionUpdate = now;
  setTimeout(loop, 50);
}

onInput("w", () => { if (direction.y === 0) nextDirection = { x: 0, y: -1 }; });
onInput("a", () => { if (direction.x === 0) nextDirection = { x: -1, y: 0 }; });
onInput("s", () => { if (direction.y === 0) nextDirection = { x: 0, y: 1 }; });
onInput("d", () => { if (direction.x === 0) nextDirection = { x: 1, y: 0 }; });

startGame();
