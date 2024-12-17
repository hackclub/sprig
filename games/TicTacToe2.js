/*
@title: TicTacToe
@author: Benjamin
@tags: ['multiplayer']
@addedOn: 2024-07-01
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p";
const x = "x";
const o = "o";
const background = "b";
let turn = false;
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];
gameover = false;

setLegend(
  [player, bitmap`
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
  [x, bitmap`
................
................
................
................
................
.....3....3.....
......3..3......
.......33.......
.......33.......
......3..3......
.....3....3.....
................
................
................
................
................`],
  [o, bitmap`
................
................
................
................
................
.....555555.....
.....5....5.....
.....5....5.....
.....5....5.....
.....5....5.....
.....555555.....
................
................
................
................
................`],
  [background, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0000000000000000`]
);


let level = map`
...
.p.
...`;

setMap(level);

setSolids([x, o]);
setBackground(background);

function gameOver(winner) {
  gameover = true
  if (winner == "x") {
    addText(`Game over. X won!`, {
      x: 2,
      y: 6,
      color: color`3`
    })
  } else if (winner == "o") {
    addText(`Game over. O won!`, {
      x: 2,
      y: 6,
      color: color`5`
    })
  } else {
    addText(`Game over.`, {
      x: 4,
      y: 6,
      color: color`9`
    })
    addText(`It was a draw!`, {
      x: 3,
      y: 8,
      color: color`9`
    })
  }
  addText(`Press J to restart`, {
    x: 1,
    y: 10,
    color: color`D`
  })
}

const restartGame = async () => {
  clearText();
  gameover = false
  // Remove all x's
  getAll(x).forEach((x) => {
    x.remove();
  });
  // Remove all o's
  getAll(o).forEach((o) => {
    o.remove();
  });

  // Clear Board
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
}

// inputs for player movement control
onInput("w", () => {
  if (!gameover) {
    getFirst(player).y -= 1;
  }
});

onInput("a", () => {
  if (!gameover) {
    getFirst(player).x -= 1;
  }
});

onInput("s", () => {
  if (!gameover) {
    getFirst(player).y += 1;
  }
});

onInput("d", () => {
  if (!gameover) {
    getFirst(player).x += 1;
  }
});

onInput("j", () => {
  if (gameover) {
    restartGame();
    return;
  }

  let playerPosition = [getFirst(player).x, getFirst(player).y];

  // Check if can place in tile
  if (getTile(playerPosition[0], playerPosition[1]).length > 1) {
    return;
  }

  if (!turn) {
    // Place X
    addSprite(playerPosition[0], playerPosition[1], x);
    board[playerPosition[1]][playerPosition[0]] = "x";
  } else {
    // Place Os
    addSprite(playerPosition[0], playerPosition[1], o);
    board[playerPosition[1]][playerPosition[0]] = "o";
  }

  // Check for winner
  console.log("board", board)
  // Check rows)
  if (board[0][0] == board[0][1] && board[0][1] == board[0][2] && board[0][2] == "x") {
    gameOver("x");
  } else if (board[0][0] == board[0][1] && board[0][1] == board[0][2] && board[0][2] == "o") {
    gameOver("o");
  }
  if (board[1][0] == board[1][1] && board[1][1] == board[1][2] && board[1][2] == "x") {
    gameOver("x");
  } else if (board[1][0] == board[1][1] && board[1][1] == board[1][2] && board[1][2] == "o") {
    gameOver("o");
  }
  if (board[2][0] == board[2][1] && board[2][1] == board[2][2] && board[2][2] == "x") {
    gameOver("x");
  } else if (board[2][0] == board[2][1] && board[2][1] == board[2][2] && board[2][2] == "o") {
    gameOver("o");
  }
  // Check columns
  if (board[0][0] == board[1][0] && board[1][0] == board[2][0] && board[2][0] == "x") {
    gameOver("x");
  } else if (board[0][0] == board[1][0] && board[1][0] == board[2][0] && board[2][0] == "o") {
    gameOver("o");
  }
  if (board[0][1] == board[1][1] && board[1][1] == board[2][1] && board[2][1] == "x") {
    gameOver("x");
  } else if (board[0][1] == board[1][1] && board[1][1] == board[2][1] && board[2][1] == "o") {
    gameOver("o");
  }
  if (board[0][2] == board[1][2] && board[1][2] == board[2][2] && board[2][2] == "x") {
    gameOver("x");
  } else if (board[0][2] == board[1][2] && board[1][2] == board[2][2] && board[2][2] == "o") {
    gameOver("o");
  }
  //Check diagonals
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[2][2] == "x") {
    gameOver("x");
  } else if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[2][2] == "o") {
    gameOver("o");
  }
  if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[2][0] == "x") {
    gameOver("x");
  } else if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[2][0] == "o") {
    gameOver("o");
  }

  //Check for draw
  if (!gameover) {
    counter = 0
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          counter++
        }
      }
    }
    if (counter == 0) {
      gameOver("draw")
    }
  }
  turn = !turn;
});
