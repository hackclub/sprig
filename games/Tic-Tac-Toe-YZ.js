/*
@title: Tic-Tac-Toe
@author: bochk0
@tags: ['retro']
@addedOn: 2024-07-17
*/

const PLAYER_Y = "Y";
const PLAYER_Z = "Z";
const POINTER = "P";
const POWERUP = "U";
const DOUBLE_MOVE = "D";

const EMPTY_TILE = "E";
const END_TILE = "T";

setLegend(
  [POINTER, bitmap`
................
................
..777777777777..
..7..........7..
..7..........7..
..7..........7..
..7..........7..
..7..........7..
..7..........7..
..7..........7..
..7..........7..
..7..........7..
..7..........7..
..777777777777..
................
................`],
  [PLAYER_Y, bitmap`
................
................
................
................
....9......9....
....99....99....
.....99..99.....
......9999......
.......99.......
......99........
.....99.........
....99..........
....9...........
................
................
................`],
  [PLAYER_Z, bitmap`
................
................
................
.....444444.....
....44444444....
..........44....
.........44.....
........44......
.......44.......
......44........
.....44.........
....44444444....
.....444444.....
................
................
................`],
  [POWERUP, bitmap`
................
................
.......66.......
......6666......
......6666......
.....666666.....
..666666666666..
..666666666666..
...6666666666...
....66666666....
.....666666.....
....666..666....
...666....666...
..666......666..
................
................`],
  [DOUBLE_MOVE, bitmap`
................
................
...HHHHH........
...H...HH.......
...H.H..HH......
...H.HH..HH.....
...H.H.H..HH....
...H.H..H..HH...
...H.H..H..HH...
...H.H.H..HH....
...H.HH..HH.....
...H.H..HH......
...H...HH.......
...HHHHH........
................
................`],
  [EMPTY_TILE, bitmap`
3333333333333333
3FFFFFFFFFFFFFF3
3FFFFFFFFFFFFFF3
3FFFFFFFFFFFFFF3
3FFFFFFFFFFFFFF3
3FFFFFFFFFFFFFF3
3FFFFFFFFFFFFFF3
3FFFFFFFFFFFFFF3
3FFFFFFFFFFFFFF3
3FFFFFFFFFFFFFF3
3FFFFFFFFFFFFFF3
3FFFFFFFFFFFFFF3
3FFFFFFFFFFFFFF3
3FFFFFFFFFFFFFF3
3FFFFFFFFFFFFFF3
3333333333333333`],
  [END_TILE, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`]
);

setMap(map`
EEE
EEE
EEE`);
addSprite(1, 1, POINTER);

let currentPlayer = true;
let gameBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];
let gameFinished = false;
let aiLoseTurn = false;
let doubleMove = false;
let extraMove = false;
let aiSkipMoves = 0;

function hasWinner(board) {
  const symbol = currentPlayer ? PLAYER_Y : PLAYER_Z;
  const lines = [
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]]
  ];

  for (let line of lines) {
    if (line[0] === symbol && line[1] === symbol && line[2] === symbol) {
      return true;
    }
  }
  return false;
}

function isDraw(board) {
  for (let row of board) {
    for (let cell of row) {
      if (cell === " ") return false;
    }
  }
  return true;
}

function endGame(message) {
  gameFinished = true;
  setMap(map`
TTT
TTT
TTT`);
  addText(message, { y: 7, color: color`2` });
}

function resetGame() {
  gameFinished = false;
  currentPlayer = true;
  aiLoseTurn = false;
  doubleMove = false;
  extraMove = false;
  gameBoard = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ];
  clearText();
  setMap(map`
EEE
EEE
EEE`);
  addSprite(1, 1, POINTER);
}

function spawnPowerUp() {
  if (Math.random() < 0.1) { // 10% chance to spawn a power-up after each move
    const emptyCells = [];
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (gameBoard[y][x] === " ") {
          emptyCells.push([y, x]);
        }
      }
    }
    if (emptyCells.length > 0) {
      const [y, x] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const powerUpType = Math.random() < 0.5 ? POWERUP : DOUBLE_MOVE;
      addSprite(x, y, powerUpType);
    }
  }
}

function minimax(board, depth, isMaximizing) {
  if (hasWinner(board)) {
    return isMaximizing ? -1 : 1;
  }
  if (isDraw(board)) {
    return 0;
  }

  let bestScore = isMaximizing ? -Infinity : Infinity;
  const symbol = isMaximizing ? PLAYER_Z : PLAYER_Y;

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (board[y][x] === " ") {
        board[y][x] = symbol;
        const score = minimax(board, depth + 1, !isMaximizing);
        board[y][x] = " ";
        bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
      }
    }
  }
  return bestScore;
}

function aiMove() {
  if (aiLoseTurn || aiSkipMoves > 0) {
    if (aiLoseTurn) {
      aiLoseTurn = false;
    } else {
      aiSkipMoves--;
    }
    addText("AI loses a turn!", { y: 1, color: color`2` });
    setTimeout(() => clearText(), 2000);
    currentPlayer = !currentPlayer;
    return;
  }

  let bestScore = -Infinity;
  let move;

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (gameBoard[y][x] === " ") {
        gameBoard[y][x] = PLAYER_Z;
        const score = minimax(gameBoard, 0, false);
        gameBoard[y][x] = " ";
        if (score > bestScore) {
          bestScore = score;
          move = { y, x };
        }
      }
    }
  }

  if (move) {
    gameBoard[move.y][move.x] = PLAYER_Z;
    addSprite(move.x, move.y, PLAYER_Z);
    checkGameEnd();
  }
}

function checkGameEnd() {
  if (hasWinner(gameBoard)) {
    endGame(`${currentPlayer ? PLAYER_Y : PLAYER_Z} wins!`);
  } else if (isDraw(gameBoard)) {
    endGame("It's a draw!");
  } else {
    currentPlayer = !currentPlayer;
    if (!currentPlayer && !extraMove) {
      aiMove();
    }
  }
}

onInput("w", () => {
  if (!gameFinished) getFirst(POINTER).y -= 1;
});

onInput("a", () => {
  if (!gameFinished) getFirst(POINTER).x -= 1;
});

onInput("s", () => {
  if (!gameFinished) getFirst(POINTER).y += 1;
});

onInput("d", () => {
  if (!gameFinished) getFirst(POINTER).x += 1;
});

onInput("i", () => {
  if (gameFinished || gameBoard[getFirst(POINTER).y][getFirst(POINTER).x] !== " ") return;

  const pointer = getFirst(POINTER);
  const tiles = getTile(pointer.x, pointer.y);
  
  if (tiles.some(tile => tile.type === POWERUP)) {
    const powerUp = tiles.find(tile => tile.type === POWERUP);
    if (powerUp) {
      powerUp.remove();
    }
    aiLoseTurn = true;
    addText("Power-up collected!", { y: 1, color: color`2` });
    setTimeout(() => clearText(), 2000);
  } else if (tiles.some(tile => tile.type === DOUBLE_MOVE)) {
    const powerUp = tiles.find(tile => tile.type === DOUBLE_MOVE);
    if (powerUp) {
      powerUp.remove();
    }
    aiSkipMoves = 2; // AI skips 2 moves
    addText("Double Move collected!", { y: 1, color: color`2` });
    setTimeout(() => clearText(), 2000);
  } else {
    const symbol = currentPlayer ? PLAYER_Y : PLAYER_Z;
    addSprite(pointer.x, pointer.y, symbol);
    gameBoard[pointer.y][pointer.x] = symbol;
    checkGameEnd();
    if (!gameFinished) {
      spawnPowerUp();
      if (extraMove) {
        extraMove = false;
        currentPlayer = true;
      }
    }
  }
});

onInput("k", () => {
  resetGame();
});
