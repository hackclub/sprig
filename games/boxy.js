/*
@title: boxy
@author: olii-dev
@tags: ['retro']
@addedOn: 2024-07-08
Get the package (box) to mr poptato! (the green thing)
Watch out! Yellow enemies try to take your parcels!

Instructions:

Use W, A, S, D to move
Hit J to restart the level you're currently on
Hit K to restart to level one (also if you want to play again)
*/

const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const enemy = "e";

setLegend(
  [player, bitmap`
......1111......
......1111......
......1111......
.....111111.....
....00000000....
....0......0....
....0.0.0..0....
....0......0....
....0.000..0....
....0......0....
....00000000....
......0..0......
....000..000....
................
................
................`],
  [box, bitmap`
................
................
................
...CCCCC2CCCCC..
...CCCCC2CCCCC..
...CCCCC2CCCCC..
...CCCCC2CCCCC..
...CCCCC2CCCCC..
...22222222222..
...CCCCC2CCCCC..
...CCCCC2CCCCC..
...CCCCC2CCCCC..
...CCCCC2CCCCC..
...CCCCC2CCCCC..
........2.......
................`],
  [goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4..4.4..4....
...4.......4....
...44.4..4.4....
....4..44..4....
....44....44....
.....444444.....
................
................
................`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
LL0000000000000L
L0L000000000000L
L00L00000000000L
L000L0000000000L
L0000L000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
LLLLLLLLLLLLLLLL`],
  [enemy, bitmap`
................
................
....6666666.....
....6.....6.....
....66...66.....
....6.....6.....
....6666666.....
....6666666.....
....6666666.....
.....6...6......
.....6...6......
.....6...6......
................
................
................
................`],
);

let level = 0;
const levels = [
  map`
e....w..g
.....w..w
.bw.....w
p.w.....w`,
  map`
ww...
pb...
www.e
www..
.....
.....
..www
..www
....g`,
  map`
pwwe..g
.ww....
.b....b
www..wg`,
  map`
...ww..ww
....wb..p
.w..w.www
.w.ew..ww
.w.....ww
gw..wwwww`,
  map`
wwww
....
.bpg
wwww`,
  map`
e...wwwwwwww
g....wwwe...
ww.....w....
www...bw..w.
p.w.w..w..w.
.bw.w.....w.
....w.....w.
....w..wwwwg`,
  map`
wwwwww
.pwgew
.b...w
.....w`,
  map`
ep..w.e
.b..wg.
..w.w..
w......
wwww...`,
  map`
pw.......wg
.w.wwwww.w.
.w....ww.w.
.w.ww.w.bw.
...w..w....
.bgwwww....`,
  map`
wwweww...ew
www.......w
.b...we...w
pww..www..w
wwwwwwww..w
g.........w
wwwwwwwwwww`,
  map`
wwwwwg..wwwwwwwwwwwww
ww...w............gww
.b...w..www..wwwwwwww
.ww..w..www........ww
..w..w..b.w.ew..b..ww
w.w.......w..w.www..w
p.wwww..eww..w......w
wwwwwwwwwww..w.....ew
g............wwwwwwww`
];

setMap(levels[level]);

setSolids([player, box, wall]);

setPushables({
  [player]: [box],
  [box]: [box]
});

let time = 0;
let timerInterval;
let gameStarted = false;
let bestTime = localStorage.getItem('bestTime') ? parseInt(localStorage.getItem('bestTime')) : Infinity;

function formatTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let ms = milliseconds % 1000;
  return `${seconds}.${ms.toString().padStart(3, '0')}s`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    time += 100;
    addText(`Time: ${formatTime(time)}`, { x: 0, y: 0, color: color`2` });
  }, 100);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    startTimer();
  }
}

function resetGame() {
  level = 0;
  time = 0;
  gameStarted = false;
  clearText();
  setMap(levels[level]);
  stopTimer();
}

function saveBestTime(milliseconds) {
  localStorage.setItem('bestTime', milliseconds.toString());
}

function checkCollision() {
  const playerTile = getFirst(player);
  const enemyTiles = getAll(enemy);

  for (const enemyTile of enemyTiles) {
    if (playerTile.x === enemyTile.x && playerTile.y === enemyTile.y) {
      setMap(levels[level]);
      break;
    }
  }
}

onInput("s", () => {
  startGame();
  getFirst(player).y += 1;
  checkCollision();
})

onInput("d", () => {
  startGame();
  getFirst(player).x += 1;
  checkCollision();
});

onInput("a", () => {
  startGame();
  getFirst(player).x -= 1;
  checkCollision();
});

onInput("w", () => {
  startGame();
  getFirst(player).y -= 1;
  checkCollision();
});

onInput("j", () => {
  if (levels[level] !== undefined) {
    clearText("");
    setMap(levels[level]);
  }
});

onInput("k", () => {
  resetGame();
});

afterInput(() => {
  const targetNumber = tilesWith(goal).length;
  const numberCovered = tilesWith(goal, box).length;

  if (numberCovered === targetNumber) {
    level += 1;

    if (levels[level] !== undefined) {
      setMap(levels[level]);
    } else {
      stopTimer();
      if (time < bestTime) {
        bestTime = time;
        saveBestTime(bestTime);
      }
      addText(`      You won!\nYour time: ${formatTime(time)}\nBest time: ${formatTime(bestTime)}`, { x: 1, y: 6, color: color`3` });
    }
  }
});
