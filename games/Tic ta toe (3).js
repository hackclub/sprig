/*
Welcome to the Tic-Tac-Toe game!
This code was made on 24 August 

@title: TicTacToe game
@author: surojit 
@tags: 
*/

const PLAYER = "p";
const X_MARK = "x";
const O_MARK = "o";
const BG_TILE = "b";
let isPlayerTurn = false;
let isGameOver = false;
let gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

setLegend(
  [PLAYER, bitmap`
................
................
................
................
................
.....000000.....
.....0....0.....
.....0.00.0.....
.....0.00.0.....
.....0....0.....
.....000000.....
................
................
................
................
................`],
  [X_MARK, bitmap`
5............555
555.........555.
..55.......555..
...5......555...
...55....555....
....5555555.....
.....55555......
.....55555......
.....55555......
...55555555.....
...555...555....
..55......555...
..55.......555..
.55.........555.
.5...........555
55............55`],
  [O_MARK, bitmap`
................
................
................
................
................
.....333333.....
.....333333.....
.....333333.....
.....333333.....
.....333333.....
.....333333.....
................
................
................
................
................`],
  [BG_TILE, bitmap`
5555555555555555
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5555555555555555`]
);

let mapLayout = map`
...
.p.
...`;

setMap(mapLayout);
setSolids([X_MARK, O_MARK]);
setBackground(BG_TILE);

function endGame(winner) {
  isGameOver = true;
  const messages = {
    "x": `Game over. X won!`,
    "o": `Game over. O won!`,
    "draw": `Game over. It's a draw!`
  };

  addText(messages[winner] || messages["draw"], {
    x: 2,
    y: 6,
    color: winner === "x" ? color`H` : winner === "o" ? color`4` : color`9`
  });

  addText(`Press J to restart`, {
    x: 1,
    y: 10,
    color: color`3`
  });
}

const resetGame = async () => {
  clearText();
  isGameOver = false;
  // Remove all X and O markers
  getAll(X_MARK).concat(getAll(O_MARK)).forEach(sprite => sprite.remove());

  // Reset game board
  gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
}

const checkForWinner = () => {
  const winningPatterns = [
    // Rows
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    // Columns
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    // Diagonals
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]]
  ];

  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a[1]][a[0]] && gameBoard[a[1]][a[0]] === gameBoard[b[1]][b[0]] && gameBoard[a[1]][a[0]] === gameBoard[c[1]][c[0]]) {
      return gameBoard[a[1]][a[0]];
    }
  }
  return gameBoard.flat().every(cell => cell) ? "draw" : null;
}

// Player movement controls
onInput("w", () => {
  if (!isGameOver) getFirst(PLAYER).y -= 1;
});

onInput("a", () => {
  if (!isGameOver) getFirst(PLAYER).x -= 1;
});

onInput("s", () => {
  if (!isGameOver) getFirst(PLAYER).y += 1;
});

onInput("d", () => {
  if (!isGameOver) getFirst(PLAYER).x += 1;
});

onInput("j", () => {
  if (isGameOver) {
    resetGame();
    return;
  }

  let currentPlayerPosition = [getFirst(PLAYER).x, getFirst(PLAYER).y];

  // Check if the tile is available
  if (getTile(currentPlayerPosition[0], currentPlayerPosition[1]).length > 1 || isGameOver) {
    return;
  }

  let mark = isPlayerTurn ? O_MARK : X_MARK;
  addSprite(currentPlayerPosition[0], currentPlayerPosition[1], mark);
  gameBoard[currentPlayerPosition[1]][currentPlayerPosition[0]] = mark;

  let result = checkForWinner();
  if (result) {
    endGame(result);
  } else {
    isPlayerTurn = !isPlayerTurn;
  }
});