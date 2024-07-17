/*
@title: Tic-Tac-Toe
@author: bochk0	
@tags: ['classic']
@addedOn: 2024-07-17
*/

const PLAYER_Y = "Y";
const PLAYER_Z = "Z";
const POINTER = "P";

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

function aiMove() {
  const emptyCells = [];
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (gameBoard[y][x] === " ") {
        emptyCells.push([y, x]);
      }
    }
  }

  // AI's simple strategy: winning move, blocking move, random move
  for (let cell of emptyCells) {
    const [y, x] = cell;
    gameBoard[y][x] = PLAYER_Z;
    if (hasWinner(gameBoard)) {
      addSprite(x, y, PLAYER_Z);
      checkGameEnd();
      return;
    }
    gameBoard[y][x] = " ";
  }

  for (let cell of emptyCells) {
    const [y, x] = cell;
    gameBoard[y][x] = PLAYER_Y;
    if (hasWinner(gameBoard)) {
      gameBoard[y][x] = PLAYER_Z;
      addSprite(x, y, PLAYER_Z);
      checkGameEnd();
      return;
    }
    gameBoard[y][x] = " ";
  }

  const [y, x] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  gameBoard[y][x] = PLAYER_Z;
  addSprite(x, y, PLAYER_Z);
  checkGameEnd();
}

function checkGameEnd() {
  if (hasWinner(gameBoard)) {
    endGame(`${currentPlayer ? PLAYER_Y : PLAYER_Z} wins!`);
  } else if (isDraw(gameBoard)) {
    endGame("It's a draw!");
  } else {
    currentPlayer = !currentPlayer;
    if (!currentPlayer) {
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

  const symbol = currentPlayer ? PLAYER_Y : PLAYER_Z;
  addSprite(getFirst(POINTER).x, getFirst(POINTER).y, symbol);
  gameBoard[getFirst(POINTER).y][getFirst(POINTER).x] = symbol;

  checkGameEnd();
});

onInput("k", () => {
  resetGame();
});