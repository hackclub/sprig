/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Collector's Quest
@author: PawiX25
@tags: []
@addedOn: 2024-08-13
*/

const player = "p";
const enemy = "e";
const wall = "w";
const collectible = "c";

let level = 0;
let isGameOver = false;
let levelStartTime = 0;
let timeSpent = 0;
let timerInterval;
let bonusAchieved = false;

const levels = [
  map`
p.w.w...
.w.w.w..
.w.e.w..
...w.c..
..w...w.
w....w..
w.w.w..w`,
  map`
p..w.w..
..w.w.w.
.w.e...w
....w.c.
......w.
w.w.w.w.
....w...`,
  map`
p...w..w
w.w.w.w.
...e.w.w
w..w..c.
w.w.w..w
.w...w..
..w.w...`,
  map`
p.w.....
w....w..
..w.e...
w...w.c.
.w......
w.w....w
...w.w..`,
  map`
p..w..w.
.w.....w
..e.....
.w.w.w.c
.......w
....w.w.
w.w..w..`,
  map`
p.....w.
w.w.w.w.
....e.w.
w.w...c.
.w.w..w.
w....w.w
..w.w...`,
  map`
p.w..w.w
w...w..w
..w.e.w.
....w.w.
w.w....c
.w......
...w.w..`,
  map`
p......w
...w.w.w
w.e.....
..w...c.
w...w.w.
.....w..
..w.....`,
  map`
p.w.w.w.
.....w..
.w...e.w
....w.c.
w......w
w.w.w...
..w.....`,
  map`
p...w...
w.w....w
...e.w.w
.w....c.
..w.w..w
......w.
...w.w..`,
  map`
p..w....
..w....w
w...w...
..w.e..w
w......c
w.w....w
...w..w.`,
  map`
p.w....w
w...w..w
..w.e.w.
....w..w
.w....c.
w.w.w.w.
w.......`,
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffle(levels);

setLegend(
  [player, bitmap`
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
................`],
  [enemy, bitmap`
................
................
.......333......
.......3.3......
......3..3......
......3...3.3...
....3334.43.3...
....3.3...333...
....3.34443.....
......3...3.....
.....3....3.....
.....3...3......
......333.......
......3.3.......
.....33.33......
................`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1L1111111111L1L
L1L1LLLLLLLL1L1L
L1L1L1111111L1L1
L1L1L1LLLL1L1L1L
L1L1L1L11L1L1L1L
L1L1L1L11L1L1L1L
L1L1L1LLLL1L1L1L
L1L1L1111111L1L1
L1L1LLLLLLLL1L1L
L1L1111111111L1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [collectible, bitmap`
................
................
.......666......
.......6.6......
......6..6......
......6...6.6...
....6665.56.6...
....6.6...666...
....6.65556.....
......6...6.....
.....6....6.....
.....6...6......
......666.......
......6.6.......
.....66.66......
................`]
);

setSolids([wall, player]);

function displayTimer() {
  clearText();
  addText(`Level: ${level + 1}`, { x: 1, y: 1, color: color`3` });
  addText(`Time: ${timeSpent}s`, { x: 1, y: 2, color: color`3` });
}

function startTimer() {
  levelStartTime = Date.now();
  timerInterval = setInterval(() => {
    if (!isGameOver) {
      timeSpent = Math.floor((Date.now() - levelStartTime) / 1000);
      displayTimer();
    }
  }, 1000);
}

function gameOver(message, playAgainMessage) {
  isGameOver = true;
  clearInterval(timerInterval);
  clearText();
  addText(message, { x: 5, y: 6, color: color`3` });
  addText(playAgainMessage, { x: 1, y: 8, color: color`3` });
}

function restartGame() {
  level = 0;
  isGameOver = false;
  timeSpent = 0;
  bonusAchieved = false;
  shuffle(levels);  
  setMap(levels[level]);
  startTimer();
  clearText();
  displayTimer();
}

function checkBonus() {
  if (timeSpent <= 30) {
    bonusAchieved = true;
    addText("Bonus Achieved!", { x: 3, y: 10, color: color`6` });
  }
}

setMap(levels[level]);
startTimer();

onInput("w", () => {
  if (!isGameOver) getFirst(player).y -= 1;
});

onInput("s", () => {
  if (!isGameOver) getFirst(player).y += 1;
});

onInput("a", () => {
  if (!isGameOver) getFirst(player).x -= 1;
});

onInput("d", () => {
  if (!isGameOver) getFirst(player).x += 1;
});

onInput("l", () => {
  if (isGameOver) restartGame();
});

afterInput(() => {
  if (isGameOver) return;

  const playerPosition = getFirst(player);
  const enemyPosition = getFirst(enemy);

  const dx = playerPosition.x - enemyPosition.x;
  const dy = playerPosition.y - enemyPosition.y;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0 && getTile(enemyPosition.x + 1, enemyPosition.y).length === 0) {
      enemyPosition.x += 1;
    } else if (dx < 0 && getTile(enemyPosition.x - 1, enemyPosition.y).length === 0) {
      enemyPosition.x -= 1;
    }
  } else {
    if (dy > 0 && getTile(enemyPosition.x, enemyPosition.y + 1).length === 0) {
      enemyPosition.y += 1;
    } else if (dy < 0 && getTile(enemyPosition.x, enemyPosition.y - 1).length === 0) {
      enemyPosition.y -= 1;
    }
  }

  if (playerPosition.x === enemyPosition.x && playerPosition.y === enemyPosition.y) {
    gameOver("Game Over", "Press 'L' to Retry");
  }

  const collectibles = getAll(collectible);
  for (const item of collectibles) {
    if (playerPosition.x === item.x && playerPosition.y === item.y) {
      clearTile(item.x, item.y);
      addText("Collected!", { x: 5, y: 4, color: color`5` });

      if (getAll(collectible).length === 0) {
        checkBonus();
        level += 1;
        if (level < levels.length) {
          setMap(levels[level]);
          timeSpent = 0;
          startTimer();
               } else {
          gameOver("You Win!", "Press 'L' to Retry");
          clearText();
          addText("You Win!", { x: 6, y: 6, color: color`6` });
          addText("Press 'L' to Retry", { x: 1, y: 8, color: color`6` });
        }
      }
    }
  }
});
