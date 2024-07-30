/*
@title: Maze Banana
@author: Rushil Chopra
*/
const player = "p";
const wall = "w";
const exit = "e";
const danger = "d";

let score = 0;
let timer = 60; // 60 seconds countdown
let timerInterval;

setLegend(
  [ player, bitmap`
................
................
.......666......
.......666......
......6666......
......66666.0...
....6663636.6...
....6.6666666...
....0.65556.....
......66566.....
.....666666.....
.....66666......
......666.......
......6.6.......
.....00.00......
................` ],
  [ wall, bitmap`
3333333333333333
3111111111111113
3111111111111113
3111111111111113
3111111111111113
3111111111111113
3111111111111113
3333333333333333
3111111111111113
3111111111111113
3111111111111113
3111111111111113
3331111111111333
3331111111111333
3331111111111333
3333333333333333` ],
  [ exit, bitmap`
................
................
................
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....L3LLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
................` ],
  [ danger, bitmap`
................
................
................
................
......33333.....
......3...3.....
......3...3.....
......3...3.....
......33333.....
......3.........
......3.........
......3.........
......3.........
......3.........
......3.........
................` ]
);

setSolids([wall]);

const levels = [
  map`
p.w...
....w.
..w..e`,
  map`
p..w.
.www.
....e
w.w..
....w`,
  map`
p.www
w.w.w
.....
..w.e
..w.w`,
  map`
p.w....
.w.w.d.
.....w.
.wd.w.w
ww...w.
..w.w.e
d.....w`,
  map`
p..w..d
.www..e
.....d.
d.w.ww.
..w....
.....w.`,
  map`
p..w.e
w.w.w.
w..w..
.w.w.w
......
d.w.w.
.w.w.d`
];

const startGame = () => {
  score = 0;
  timer = 60; // Reset timer to 60 seconds
  setMap(levels[0]);
  clearText();
  addText(`Score: ${score}`, { x: 1, y: 1, color: color`4` });
  addText(`Time: ${timer}s`, { x: 1, y: 2, color: color`4` });

  // Start countdown timer
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer -= 1;
    if (timer <= 0) {
      endGame(); // End the game if timer reaches zero
    } else {
      clearText();
      addText(`Score: ${score}`, { x: 1, y: 1, color: color`4` });
      addText(`Time: ${timer}s`, { x: 1, y: 2, color: color`4` });
    }
  }, 1000); // Update every second
};

const endGame = () => {
  clearText();
  addText("GAME OVER!", { y: 4, color: color`4` });
  addText(`Final Score: ${score}`, { y: 6, color: color`4` });

  if (timerInterval) clearInterval(timerInterval); // Clear timer interval

  onInput("r", () => {
    startGame();
  });
};

const setupInputHandlers = () => {
  const movePlayer = (dx, dy) => {
    const playerPos = getFirst(player);
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (newX >= 0 && newX < 16 && newY >= 0 && newY < 16) { // Bounds check
      if (getTile(newX, newY).length === 0 || getTile(newX, newY)[0].type !== wall) {
        getFirst(player).x = newX;
        getFirst(player).y = newY;
      }
    }
  };

  onInput("w", () => movePlayer(0, -1));
  onInput("a", () => movePlayer(-1, 0));
  onInput("s", () => movePlayer(0, 1));
  onInput("d", () => movePlayer(1, 0));
};

setupInputHandlers();
startGame();

afterInput(() => {
  clearText();
  addText(`Score: ${score}`, { x: 1, y: 1, color: color`4` });
  addText(`Time: ${timer}s`, { x: 1, y: 2, color: color`4` });

  const playerPos = getFirst(player);
  const exitPos = getFirst(exit);
  const dangerTiles = tilesWith(danger);

  if (playerPos.x === exitPos.x && playerPos.y === exitPos.y) {
    score += 100; // Increase score
    if (level < levels.length - 1) {
      level += 1;
      setMap(levels[level]);
      clearText();
      addText(`Score: ${score}`, { x: 1, y: 1, color: color`4` });
      addText(`Time: ${timer}s`, { x: 1, y: 2, color: color`4` });
    } else {
      endGame();
    }
  } else if (
    dangerTiles.some(tile => tile.x === playerPos.x && tile.y === playerPos.y)
  ) {
    addText("You Died!", { y: 4, color: color`3` });
    setTimeout(() => {
      setMap(levels[level]);
      clearText();
      addText(`Score: ${score}`, { x: 1, y: 1, color: color`4` });
      addText(`Time: ${timer}s`, { x: 1, y: 2, color: color`4` });
    }, 1000);
  }
});
