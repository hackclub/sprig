/*
@title: Treasure_Quest
@author: Albin Thapaliya
@tags: ['puzzle','adventure']
@addedOn: 2024-06-18
// Treasure Quest
// Navigate through obstacles and puzzles to reach the treasure and beaware of enemy!

*/

const player = "p";
const background = "b";
const treasure = "t";
const block = "s";
const enemy = "e";

setLegend(
  [player, bitmap`
    ................
    ......00000.....
    .....0.....0....
    ....0.0...0.0...
    ....0..000..0...
    .....0.....0....
    ......00000.....
    .....00...00....
    ....0.......0...
    ...0.........0..
    ...0.........0..
    ...0.........0..
    ...0.........0..
    ....000...000...
    ......0...0.....`],
  [background, bitmap`
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
    7777777777777777
    7777777777777777`],
  [block, bitmap`
    CCCCCCCCL11111111
    CCCCCCCCL11111111
    CCCCCCCCLL1111111
    CCCCCCCCLLL111111
    CCCCCCCCCLL111111
    CCCCCCCCCCL111111
    CCCCCCCCCCL111111
    CCCCCCCCCLLL11111
    CCCCCCCCCLLL11111
    CCCCCCCCLLL111111
    CCCCCCCCCLL111111
    CCCCCCCCCCL111111
    CCCCCCCCCCL111111
    CCCCCCCCCLL111111
    CCCCCCCCLLL111111
    CCCCCCCCLL1111111`],
  [treasure, bitmap`
    0000000000000000
    0CCLCCCCCLCCLCL0
    0LCCLCCLLCCCLLC0
    0CLCLCLCCCCLCLC0
    0CCLLCCLCCLCCLC0
    0CCCC11111CCLCL0
    0000011111000000
    0000011111000000
    0CCCC11111CCLCC0
    0CLCC11111CCCLC0
    0CCLCCCCCCLCCCC0
    0CCLCCCCLCCCLCL0
    0CLCCCLCCCCLCCC0
    0CCCCLCLLCCLLCC0
    0CCCCCCCCCLCLCC0
    0000000000000000`],
  [enemy, bitmap`
    9999999999999999
    9999111199991119
    9911111119111119
    9991111199991119
    9999111199991119
    9999999999999999
    9991111199991119
    9911111119111119
    9911111119111119
    9991111199991119
    9999111199991119
    9999999999999999
    9991111199991119
    9911111119111119
    9991111199991119
    9999111199991119`]
);

setSolids([block, player]);

const levels = [
  map`
sssss....s..s.s
p........s..s.s
.s..ssss.s..s.s
ss..s....s..s..
.s............s
....sssssss.sss
.s..s..s.......
ss.............
.ss.s.sss.ssss.
.......s...s...
.s..s......s..s
.s..s..s.s....s
sss...ss.sss.ss`
];

function initializeGame() {
  clearText();
  setMap(levels[0]);
  setBackground(background);

  timer = 0;
  treasureCount = 0;
  enemyMoveCounter = 0;

  addSprite(14, 3, enemy);
  startTimer();
  updateText();

  placeTreasure();
}

let timer = 0, treasureCount = 0;
let enemyMoveCounter = 0;
const enemyMoveDelay = 2;
let gameInterval;

function startTimer() {
  clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    timer++;
    updateText();
  }, 1000);
}

function updateText() {
  clearText();
  addText(`Time: ${timer}s`, { x: 1, y: 1, color: '3' });
  addText(`Treasures: ${treasureCount}`, { x: 1, y: 2, color: '3' });
}

function placeTreasure() {
  let placed = false;
  let enemyPos = getFirst(enemy);
  const minDistanceFromEnemy = 5;

  while (!placed) {
    let x = Math.floor(Math.random() * width());
    let y = Math.floor(Math.random() * height());
    let distance = Math.abs(x - enemyPos.x) + Math.abs(y - enemyPos.y);

    if (getTile(x, y).length === 0 && distance > minDistanceFromEnemy) {
      addSprite(x, y, treasure);
      placed = true;
    }
  }
}

function moveEnemy() {
  enemyMoveCounter++;
  if (enemyMoveCounter >= enemyMoveDelay) {
    enemyMoveCounter = 0;
    let playerPos = getFirst(player);
    let enemyPos = getFirst(enemy);
    
    let moves = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ];

    moves.sort((a, b) => {
      let distA = Math.abs((enemyPos.x + a[0]) - playerPos.x) + Math.abs((enemyPos.y + a[1]) - playerPos.y);
      let distB = Math.abs((enemyPos.x + b[0]) - playerPos.x) + Math.abs((enemyPos.y + b[1]) - playerPos.y);
      return distA - distB;
    });

    for (let move of moves) {
      let newX = enemyPos.x + move[0];
      let newY = enemyPos.y + move[1];
      if (isValidMove(newX, newY)) {
        enemyPos.x = newX;
        enemyPos.y = newY;
        break;
      }
    }
  }
}

function isValidMove(x, y) {
  return x >= 0 && x < width() && y >= 0 && y < height() && !getTile(x, y).some(sprite => sprite.type === block);
}

onInput("s", () => { getFirst(player).y += 1; });
onInput("w", () => { getFirst(player).y -= 1; });
onInput("a", () => { getFirst(player).x -= 1; });
onInput("d", () => { getFirst(player).x += 1; });

function checkGameOver() {
  let playerPos = getFirst(player);
  let enemyPos = getFirst(enemy);
  if (playerPos.x === enemyPos.x && playerPos.y === enemyPos.y) {
    gameOver();
  }
}

function gameOver() {
  clearInterval(gameInterval);
  addText("Game Over!", { x: 5, y: 8, color: '9' });

  setTimeout(() => {
    initializeGame();
  }, 5000);
}

afterInput(() => {
  moveEnemy();
  checkGameOver();
  let playerPos = getFirst(player);
  getAll(treasure).forEach(t => {
    if (t.x === playerPos.x && t.y === playerPos.y) {
      t.remove();
      treasureCount++;
      placeTreasure();
      updateText();
    }
  });
});

initializeGame();