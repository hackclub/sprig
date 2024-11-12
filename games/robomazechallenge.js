/*
@title: Robo Maze Runner
@author: Sindhoora Raja
@tags: ['maze', 'survival']
@addedOn: 2024-11-12
*/
const player = "p";
const wall = "w";
const goal = "g";
const trap = "t";

setLegend(
  [ player, bitmap`
................
................
................
.....1111111....
.....1LL1LL1....
.....1L21L21....
.....1111111....
.....1111111....
.......111......
....111111111...
....166111111...
....111111111...
....111111111...
................
................
................`],
  [ wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [ goal, bitmap`
................
................
................
.....666666.....
....66666666....
...6666666666...
...666....666...
...666....666...
...666....666...
...6666666666...
....66666666....
.....666666.....
................
................
................
................`],
  [ trap, bitmap`
................
................
.....333333.....
....33333333....
...3333333333...
...33......33...
...33......33...
...3333333333...
....33333333....
.....333333.....
................
................
................
................
................
................`]
);

let level = 0;
let health = 3;
const timerLimit = 30;
let timer = timerLimit;
let timerInterval = null;
let gameOver = false;

const levels = [
  map`
p..w....w.
.w.w...ww.
..tw.t...g
.w.....w..
..w.w.wwww
.w.w.t.w.g
....w...w.
t.w.w.t...
www.....t.`,
  map`
p.w.w....g
.w...ww..t
...w...ww.
...wtw..w.
.w..t..ww.
...w.w..g.
.t.w..t...
w..w..w.w.
.w..g...w.`,
  map`
.w........
t..www..w.
..t....w..
w.w.w.w..w
..t.p..w..
..w.www.w.
.t.w......
.www.w.ww.
...gw..w..`,
  map`
.w.w....t.
t..w.wt...
..t...ww.w
..w.t.w..w
gwt..w.t..
w.www.w.w.
.t....t...
.www.w.ww.
.t..w..w.p`
];

const currentLevel = levels[level];
setMap(currentLevel);

function updateUI() {
  clearText();
  addText(`Health: ${health}`, { y: 0, color: color`0` });
  addText(`Time: ${timer}`, { y: 1, color: color`0` });
}

function movePlayer(dx, dy) {
  if (gameOver) return; 

  const playerTile = getFirst(player);
  const newX = playerTile.x + dx;
  const newY = playerTile.y + dy;
  
  
  if (getTile(newX, newY).some(tile => tile.type === wall)) {
    return; 
  }

  playerTile.x = newX;
  playerTile.y = newY;
  
  if (tilesWith(player, goal).length > 0) {
    level++;
    if (level < levels.length) {
      setMap(levels[level]);
      health = 3;
      timer = timerLimit;
      updateUI();
      addText(`Next Level!`, { y: 2, color: color`0` });
    } else {
      addText("You Win!", { y: 4, color: color`0` });
      clearInterval(timerInterval);
      gameOver = true; 
    }
  } else if (tilesWith(player, trap).length > 0) {
    health--;
    updateUI();
    if (health <= 0) {
      addText("Game Over!", { y: 4, color: color`0` });
      clearInterval(timerInterval); 
      gameOver = true; 
    }
  }
}

onInput("w", () => movePlayer(0, -1));
onInput("s", () => movePlayer(0, 1));
onInput("a", () => movePlayer(-1, 0));
onInput("d", () => movePlayer(1, 0));

onInput("i", () => {
  if (!gameOver) return;
  const currentLevel = levels[level];
  if (currentLevel !== undefined) setMap(currentLevel);
  health = 3;
  timer = timerLimit;
  gameOver = false;
  updateUI();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
});

function updateTimer() {
  if (gameOver) return; 
  timer--;
  if (timer<=0) {
    addText("Time's Up!", { y: 5, color: color`0` });
    clearInterval(timerInterval);
    gameOver = true;
  }
  updateUI();
}

timerInterval = setInterval(updateTimer, 1000);
