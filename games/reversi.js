/*
@title: reversi
@author: veehj
@tags: ['multiplayer','retro']
@addedOn: 2022-09-13
*/

const game = {
  board: [
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, 0, 1, -1, -1, -1],
    [-1, -1, -1, 1, 0, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
  ],
  turn: 0,
  player: 0,
  score: [2, 2],
  winner: -1,
  isGameOver: false,

  /** Return 8x8 scoreBoard where scoreBoard[i][j] is the score received if played there */
  showMovables(player) {
    const scoreBoard = [];
    for (let i = 0; i < 8; i++) {
      scoreBoard.push([]);
      for (let j = 0; j < 8; j++) {
        scoreBoard[i].push(this.getScore(i, j, player));
      }
    }
    return scoreBoard;
  },

  /** Return the score received if played at (x, y) */
  getScore(x, y, player) {
    if (this.board[x][y] !== -1) return 0;
    let score = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        score += this.getScoreInDirection(x, y, i, j, player);
      }
    }
    return score;
  },

  /** Return the score received if played at (x, y) in the direction (dx, dy) */
  getScoreInDirection(x, y, dx, dy, player) {
    let score = 0;
    let i = x + dx;
    let j = y + dy;
    while (i >= 0 && i < 8 && j >= 0 && j < 8) {
      if (this.board[i][j] === -1) return 0;
      if (this.board[i][j] === player) {
        return score;
      }
      score++;
      i += dx;
      j += dy;
    }
    return 0;
  },

  /** Play at (x,y) */
  play(x, y) {
    // console.log("play", x, y, this.player, this.getScore(x, y, this.player));
    if (this.getScore(x, y, this.player) === 0) return false;
    this.board[x][y] = this.player;
    this.score[this.player]++;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        if (this.getScoreInDirection(x, y, i, j, this.player) > 0) {
          this.flipInDirection(x, y, i, j, this.player);
        }
      }
    }
    // check if next player can move
    this.player = 1 - this.player;
    if (this.bestMove(this.player) === null) {
      this.player = 1 - this.player;
    }
    // check if game has ended
    if (
      this.showMovables(0)
        .flat()
        .reduce((a, b) => a + b) === 0 &&
      this.showMovables(1)
        .flat()
        .reduce((a, b) => a + b) === 0
    ) {
      this.isGameOver = true;
      this.winner = this.score[0] > this.score[1] ? 0 : 1;
      this.player = -1;
    }

    return true;
  },

  /** Flip those in (dx,dy) direction from (x,y) */
  flipInDirection(x, y, dx, dy, player) {
    let i = x + dx;
    let j = y + dy;
    while (i >= 0 && i < 8 && j >= 0 && j < 8) {
      if (this.board[i][j] === player) return;
      this.board[i][j] = player;
      this.score[player]++;
      this.score[1 - player]--;
      i += dx;
      j += dy;
    }
  },

  /** Reset board */
  reset() {
    this.board = [
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, 0, 1, -1, -1, -1],
      [-1, -1, -1, 1, 0, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
    ];
  },

  /** Greedily find best move */
  bestMove(player = this.player) {
    const movables = this.showMovables(player);
    let bestScore = 0;
    let bestMove = null;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (movables[i][j] > bestScore) {
          bestScore = movables[i][j];
          bestMove = [i, j];
        }
      }
    }
    return bestMove;
  },
};

const black = ["b", "B"];
const white = ["w", "W"];
const blank = ["z", "Z"];
const cursored = ["c", "d", "e"]; // blank, black, white
const cursored_bitmap = [
  `4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`,
  `4444444444444444
4444444444444444
4444000000004444
4440000000000444
4400000000000044
4400000000000044
4400000000000044
4400000000000044
4400000000000044
4400000000000044
4400000000000044
4400000000000044
4440000000000444
4444000000004444
4444444444444444
4444444444444444`,
  `4444444444444444
4444444444444444
4444222222224444
4442222222222444
4422222222222244
4422222222222244
4422222222222244
4422222222222244
4422222222222244
4422222222222244
4422222222222244
4422222222222244
4442222222222444
4444222222224444
4444444444444444
4444444444444444`,
];

const totally_white = "x";

function zero_or_one(x, y) {
  return (x + y) % 2;
}

let cursor = {
  x: 3,
  y: 3,
};

function renderCell(i, j, board = game.board) {
  if (i == cursor.x && j == cursor.y) {
    return cursored[game.board[i][j] + 1];
  } else {
    if (board[i][j] === -1) {
      return blank[zero_or_one(i, j)];
    } else if (board[i][j] === 0) {
      return black[zero_or_one(i, j)];
    } else {
      return white[zero_or_one(i, j)];
    }
  }
}

function renderBoard(board = game.board) {
  let output = "";
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      output += renderCell(j, i, board);
    }
    output += game.player ? "w" : "b";
    output += "\n";
  }
  output += `${black[0]}${totally_white.repeat(7)}${white[0]}`;
  return output;
}

setLegend(
  [
    black[0],
    bitmap`5555555555555555
5555555555555555
5555000000005555
5550000000000555
5500000000000055
5500000000000055
5500000000000055
5500000000000055
5500000000000055
5500000000000055
5500000000000055
5500000000000055
5550000000000555
5555000000005555
5555555555555555
5555555555555555`,
  ],
  [
    white[0],
    bitmap`5555555555555555
5555555555555555
5555222222225555
5552222222222555
5522222222222255
5522222222222255
5522222222222255
5522222222222255
5522222222222255
5522222222222255
5522222222222255
5522222222222255
5552222222222555
5555222222225555
5555555555555555
5555555555555555`,
  ],
  [
    black[1],
    bitmap`7777777777777777
7777777777777777
7777000000007777
7770000000000777
7700000000000077
7700000000000077
7700000000000077
7700000000000077
7700000000000077
7700000000000077
7700000000000077
7700000000000077
7770000000000777
7777000000007777
7777777777777777
7777777777777777`,
  ],
  [
    white[1],
    bitmap`7777777777777777
7777777777777777
7777222222227777
7772222222222777
7722222222222277
7722222222222277
7722222222222277
7722222222222277
7722222222222277
7722222222222277
7722222222222277
7722222222222277
7772222222222777
7777222222227777
7777777777777777
7777777777777777`,
  ],
  [
    blank[0],
    bitmap`5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`,
  ],
  [
    blank[1],
    bitmap`7777777777777777
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
7777777777777777`,
  ],
  [cursored[0], bitmap`${cursored_bitmap[0]}`],
  [cursored[1], bitmap`${cursored_bitmap[1]}`],
  [cursored[2], bitmap`${cursored_bitmap[2]}`],
  [
    totally_white,
    bitmap`2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`,
  ]
);

function updateBoard() {
  clearText();
  setMap(map`${renderBoard()}`);
  addText("" + game.score[0] + " - " + game.score[1], {
    y: 15,
    color: color`3`,
  });
}

let gameStart = false;
let bot = true;
function startGame() {
  clearText();
  gameStart = true;
  game.reset();
  updateBoard();
}

async function gameOnKey(key) {
  // console.log(key);
  if (key == "w") {
    if (cursor.y > 0) cursor.y--;
  } else if (key == "s") {
    if (cursor.y < 7) cursor.y++;
  } else if (key == "a") {
    if (cursor.x > 0) cursor.x--;
  } else if (key == "d") {
    if (cursor.x < 7) cursor.x++;
  } else if (key == "i") {
    if(bot && game.player == 1) return;
    game.play(cursor.x, cursor.y);
  } else if (key == "k") {
    if (!game.isGameOver) return;
    startGame();
  }
  updateBoard();
  while (bot && !game.isGameOver && game.player == 1) {
    await new Promise((r) => {
      setTimeout(() => {
        r();
      }, 500);
    });
    if(game.player != 1){
      // console.log("bug");
      break;
    }
    game.play(...game.bestMove());
    updateBoard();
  }
  if (game.winner != -1) {
    addText("Winner: " + (game.winner ? "White" : "Black"), {
      y: 4,
      color: color`3`,
    });
  }
}

let menuChoice = 0;
function showMenu() {
  clearText();
  addText("Reversi", { y: 3, color: color`3` });
  addText((menuChoice ? "> " : "") + "1 Player", {
    y: 5,
    color: menuChoice ? color`4` : color`3`,
  });
  addText((menuChoice ? "" : "> ") + "2 Players", {
    y: 6,
    color: menuChoice ? color`3` : color`4`,
  });
  addText("W/S: select", { y: 8, color: color`3` });
  addText("I: confirm", { y: 9, color: color`3` });
}

function onKey(key) {
  if (gameStart) {
    gameOnKey(key);
  } else if (key == "w" || key == "s") {
    menuChoice = 1 - menuChoice;
    showMenu();
  } else if (key == "i") {
    bot = menuChoice;
    startGame();
  }
}

onInput("w", () => {
  onKey("w");
});
onInput("a", () => {
  onKey("a");
});
onInput("s", () => {
  onKey("s");
});
onInput("d", () => {
  onKey("d");
});
onInput("i", () => {
  onKey("i");
});
onInput("j", () => {
  onKey("j");
});
onInput("k", () => {
  onKey("k");
});
onInput("l", () => {
  onKey("l");
});

const menuMap = map`xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx`;
setMap(menuMap);
showMenu();
