/*
@title: Poisonous Snake
@author: dkim19375
@tags: []
@addedOn: 2024-06-23
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const player = "p"
const snakeHead = "h"
const snakeTail = "t"
const apple = "a"
const poisonedApple = "x"

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ snakeHead, bitmap`
5555555555555555
5777777777777775
5777777777777775
5777700000077775
5777000000007775
5770000000000775
5770000000000775
5770000000000775
5770000000000775
5770000000000775
5770000000000775
5777000000007775
5777700000077775
5777777777777775
5777777777777775
5555555555555555` ],
  [ snakeTail, bitmap`
5555555555555555
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5555555555555555` ],
  [ apple, bitmap`
......0.........
.....0C0........
.....0C000000...
..0000C044DDD0..
.0333300DDDDDD00
03333333000DDDD0
0332233333300DD0
0332233333333000
033333333333330.
033333333333330.
033333333333330.
033333333333330.
.0333333333330..
..03333333330...
...033303330....
....000.000.....` ],
  [ poisonedApple, bitmap`
.......0........
......0C0.......
......0C0.......
...0000C0000....
.00444404D4400..
04444444444DD40.
044D444D4444440.
044444444444440.
044444444444440.
0444DD4DD444DD0.
04DDDDDDD4DDDD0.
0DDDDDDDDDDDDC0.
.0DCCCCDDDDCC0..
..0CCCCCCCDC0...
...0CCC0CCC0....
....000.000.....` ],
)

setSolids([ snakeHead ])

let level = 0
const levels = [
  map`
.........
....x....
.........
.........
.h.....a.
.........
.........
....x....
.........`,
]
let mapWidth = 9;
let mapHeight = 9;

setMap(levels[level])

setPushables({
  [ player ]: []
})

let tailLength = 0;
let tails = [];
let gameOver = false;
let lastPosition = {};

let lastMove = { x: 0, y: 0 };
let nextMove = { x: 0, y: 0 };

function spawnRandom(sprite) {
  let tryPos = { x: -1, y: -1 };
  while (tryPos.x == -1 || getTile(tryPos.x, tryPos.y).length > 0) {
    tryPos = { x: Math.floor(Math.random() * 7), y: Math.floor(Math.random() * 7) };
  }
  addSprite(tryPos.x, tryPos.y, sprite);
}

function afterMove(position) {
  console.log(position);
  let lastPos = lastPosition;
  lastPosition = { x: position.x, y: position.y };
  let spritesOnHead = getTile(position.x, position.y);
  let isOnTail = false;
  let isOnApple = false;
  let isOnPoison = false;
  for (let i = 0; i < spritesOnHead.length; i++) {
    let sprite = spritesOnHead[i];
    if (sprite.type == snakeTail) isOnTail = true;
    if (sprite.type == apple) isOnApple = true;
    if (sprite.type == poisonedApple) isOnPoison = true;
  }
  let outOfBounds = position.x >= mapWidth || position.x < 0 || position.y >= mapHeight || position.y < 0;
  if (isOnTail || outOfBounds || isOnPoison) {
    gameOver = true;
    addText("Game Over!\n You Lose", {
      x: 5,
      y: 12,
      color: color`3`
    });
    playTune(tune`
70.58823529411765: C5/70.58823529411765 + E5~70.58823529411765,
70.58823529411765: B4/70.58823529411765 + G4~70.58823529411765 + C5^70.58823529411765,
70.58823529411765: A4/70.58823529411765 + G4~70.58823529411765 + B4^70.58823529411765,
70.58823529411765: G4/70.58823529411765 + A4^70.58823529411765,
70.58823529411765: F4/70.58823529411765 + D4~70.58823529411765 + G4^70.58823529411765,
70.58823529411765: E4/70.58823529411765 + C4~70.58823529411765 + F4^70.58823529411765,
70.58823529411765: E4^70.58823529411765,
1764.7058823529412`);
    return;
  }
  if (isOnApple) {
    tailLength += 1;
    tails.push(lastPos);
    addSprite(lastPos.x, lastPos.y, snakeTail);
    spawnRandom(apple);
    let tilesWithPoison = tilesWith(poisonedApple);
    for (let i = 0; i < tilesWithPoison.length; i++) {
      clearTile(tilesWithPoison[i][0].x, tilesWithPoison[i][0].y);
    }
    spawnRandom(poisonedApple);
    spawnRandom(poisonedApple);
    playTune(tune`
96.7741935483871: F5/96.7741935483871 + C5~96.7741935483871,
96.7741935483871: A5/96.7741935483871 + F5~96.7741935483871,
2903.225806451613`);
    return;
  }
  if (tails.length == 0) return;
  clearTile(tails[0].x, tails[0].y);
  tails.shift();
  tails.push(lastPos);
  addSprite(lastPos.x, lastPos.y, snakeTail);
};

onInput("w", () => {
  if (gameOver) return;
  if (lastMove.y != 0) return;
  nextMove = { x: 0, y: -1 };
})
onInput("a", () => {
  if (gameOver) return;
  if (lastMove.x != 0) return;
  nextMove = { x: -1, y: 0 };
})
onInput("s", () => {
  if (gameOver) return;
  if (lastMove.y != 0) return;
  nextMove = { x: 0, y: 1 };
})
onInput("d", () => {
  if (gameOver) return;
  if (lastMove.x != 0) return;
  nextMove = { x: 1, y: 0 };
})

let lastGameLoop = performance.now();

function gameLoop() {
  if (gameOver) return;
  if (nextMove.x == 0 && nextMove.y == 0) {
    return;
  }
  let requiredDiff = 700 - tailLength * 30;
  if (performance.now() - lastGameLoop < requiredDiff) {
    return;
  }
  lastGameLoop = performance.now();
  afterMove({ x: getFirst(snakeHead).x + nextMove.x, y: getFirst(snakeHead).y + nextMove.y });
  if (gameOver) return;
  getFirst(snakeHead).x += nextMove.x;
  getFirst(snakeHead).y += nextMove.y;
  lastMove = nextMove;
}

setInterval(gameLoop, 50);
