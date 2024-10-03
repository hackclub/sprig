/*
@title: Maze Banana 2-Player
@author: Rushil Chopra
@tags: []
@addedOn: 2024-08-05
*/
const player1 = "p"; // First player
const player2 = "P"; // Second player
const wall = "w";
const exit = "e";
const danger = "d";

let score1 = 0;
let score2 = 0;
let timer = 60; // 60 seconds countdown
let timerInterval;
let level = 0; // Initialize the level variable

setLegend(
  [player1, bitmap`
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
................`],
  [player2, bitmap`
......33333.....
.....33HHH33....
.....3333333....
.......666......
......6666......
......66666.H...
....666H6H6.6...
....6.6666666...
....H.6HHH6.....
......66H66.....
.....666666.....
.....66666......
......666.......
......6.6.......
.....HH.HH......
................`],
  [wall, bitmap`
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
3333333333333333`],
  [exit, bitmap`
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
................`],
  [danger, bitmap`
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
................`]
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
  score1 = 0;
  score2 = 0;
  timer = 60; // Reset timer to 60 seconds
  level = 0; // Reset level to the first one
  setMap(levels[level]);
  addPlayer2(); // Add second player
  clearText();
  addText(`P1 Score: ${score1}`, { x: 1, y: 1, color: color`4` });
  addText(`P2 Score: ${score2}`, { x: 1, y: 2, color: color`4` });
  addText(`Time: ${timer}s`, { x: 1, y: 3, color: color`4` });

  // Start countdown timer
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer -= 1;
    if (timer <= 0) {
      endGame(); // End the game if timer reaches zero
    } else {
      clearText();
      addText(`P1 Score: ${score1}`, { x: 1, y: 1, color: color`4` });
      addText(`P2 Score: ${score2}`, { x: 1, y: 2, color: color`4` });
      addText(`Time: ${timer}s`, { x: 1, y: 3, color: color`4` });
    }
  }, 1000); // Update every second
};

const endGame = () => {
  clearText();
  addText("GAME OVER!", { y: 4, color: color`4` });
  addText(`P1 Final Score: ${score1}`, { y: 6, color: color`4` });
  addText(`P2 Final Score: ${score2}`, { y: 7, color: color`4` });

  if (timerInterval) clearInterval(timerInterval); // Clear timer interval

  onInput("r", () => {
    startGame();
  });
};

const setupInputHandlers = () => {
  const movePlayer = (player, dx, dy) => {
    const playerPos = getFirst(player);
    if (playerPos) {
      const newX = playerPos.x + dx;
      const newY = playerPos.y + dy;

      if (newX >= 0 && newX < 16 && newY >= 0 && newY < 16) { // Bounds check
        if (getTile(newX, newY).length === 0 || getTile(newX, newY)[0].type !== wall) {
          playerPos.x = newX;
          playerPos.y = newY;
        }
      }
    }
  };

  onInput("w", () => movePlayer(player1, 0, -1)); // P1 up
  onInput("a", () => movePlayer(player1, -1, 0)); // P1 left
  onInput("s", () => movePlayer(player1, 0, 1));  // P1 down
  onInput("d", () => movePlayer(player1, 1, 0));  // P1 right

  onInput("i", () => movePlayer(player2, 0, -1)); // P2 up
  onInput("j", () => movePlayer(player2, -1, 0)); // P2 left
  onInput("k", () => movePlayer(player2, 0, 1));  // P2 down
  onInput("l", () => movePlayer(player2, 1, 0));  // P2 right
};

const addPlayer2 = () => {
  // Add Player 2 to the map
  addSprite(0, 0, player2);
  const player1Pos = getFirst(player1);
  if (player1Pos) {
    getFirst(player2).x = player1Pos.x + 1; // Place player2 next to player1
    getFirst(player2).y = player1Pos.y;
  }
};

setupInputHandlers();
startGame();

afterInput(() => {
  clearText();
  addText(`P1 Score: ${score1}`, { x: 1, y: 1, color: color`4` });
  addText(`P2 Score: ${score2}`, { x: 1, y: 2, color: color`4` });
  addText(`Time: ${timer}s`, { x: 1, y: 3, color: color`4` });

  const player1Pos = getFirst(player1);
  const player2Pos = getFirst(player2);
  const exitPos = getFirst(exit);
  const dangerTiles = tilesWith(danger);

  // Check if Player 1 reached the exit
  if (player1Pos && player1Pos.x === exitPos.x && player1Pos.y === exitPos.y) {
    score1 += 100; // Increase score for Player 1
    if (level < levels.length - 1) {
      level += 1;
      setMap(levels[level]);
      addPlayer2(); // Re-add Player 2 on the new map
      clearText();
      addText(`P1 Score: ${score1}`, { x: 1, y: 1, color: color`4` });
      addText(`P2 Score: ${score2}`, { x: 1, y: 2, color: color`4` });
      addText(`Time: ${timer}s`, { x: 1, y: 3, color: color`4` });
    } else {
      endGame();
    }
  }

  // Check if Player 2 reached the exit
  if (player2Pos && player2Pos.x === exitPos.x && player2Pos.y === exitPos.y) {
    score2 += 100; // Increase score for Player 2
    if (level < levels.length - 1) {
      level += 1;
      setMap(levels[level]);
      addPlayer2(); // Re-add Player 2 on the new map
      clearText();
      addText(`P1 Score: ${score1}`, { x: 1, y: 1, color: color`4` });
      addText(`P2 Score: ${score2}`, { x: 1, y: 2, color: color`4` });
      addText(`Time: ${timer}s`, { x: 1, y: 3, color: color`4` });
    } else {
      endGame();
    }
  }

  // Check if Player 1 hit a danger tile
  if (dangerTiles.some(tile => tile.x === player1Pos.x && tile.y === player1Pos.y)) {
    addText("P1 Died!", { y: 4, color: color`3` });
    setTimeout(() => {
      setMap(levels[level]);
      addPlayer2(); // Re-add Player 2 on the new map
      clearText();
      addText(`P1 Score: ${score1}`, { x: 1, y: 1, color: color`4` });
      addText(`P2 Score: ${score2}`, { x: 1, y: 2, color: color`4` });
      addText(`Time: ${timer}s`, { x: 1, y: 3, color: color`4` });
    }, 1000);
  }

  // Check if Player 2 hit a danger tile
  if (dangerTiles.some(tile => tile.x === player2Pos.x && tile.y === player2Pos.y)) {
    addText("P2 Died!", { y: 4, color: color`3` });
    setTimeout(() => {
      setMap(levels[level]);
      addPlayer2(); // Re-add Player 2 on the new map
      clearText();
      addText(`P1 Score: ${score1}`, { x: 1, y: 1, color: color`4` });
      addText(`P2 Score: ${score2}`, { x: 1, y: 2, color: color`4` });
      addText(`Time: ${timer}s`, { x: 1, y: 3, color: color`4` });
    }, 1000);
  }
});
