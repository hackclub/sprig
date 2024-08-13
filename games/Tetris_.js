/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Tetris?
@author: Gautham Nair
@tags: ["Classis", "Tetris", "Infinite"]
@addedOn: 2024-08-05
*/
const White = "W";
const Black = "B"
const Grey = "G"
const Blue = "b"
const DBlue = "D"
const Orange = "O"
const Yellow = "Y"
const Green = "g"
const Purple = "P"
const Red = "R"

// Stick, L, L2, S, S2, Square, and Pyramid (order) 
var pieces = [
  [map`
..b.
..b.
..b.
..b.`, map`
....
....
bbbb
....`, map`
.b..
.b..
.b..
.b..`, map`
....
bbbb
....
....`],
  [map`
.O.
.O.
.OO`, map`
...
OOO
O..`, map`
OO.
.O.
.O.`, map`
..O
OOO
...`],
  [map`
.DD
.D.
.D.`, map`
...
DDD
..D`, map`
.D.
.D.
DD.`, map`
D..
DDD
...`],
  [map`
.g.
.gg
..g`, map`
...
.gg
gg.`, map`
g..
gg.
.g.`, map`
.gg
gg.
...`],
  [map`
..R
.RR
.R.`, map`
...
RR.
.RR`, map`
.R.
RR.
R..`, map`
RR.
.RR
...`],
  [map`
.YY
.YY
...`, map`
.YY
.YY
...`, map`
.YY
.YY
...`, map`
.YY
.YY
...`],
  [map`
.P.
.PP
.P.`, map`
...
PPP
.P.`, map`
.P.
PP.
.P.`, map`
.P.
PPP
...`],
]

setLegend(
  [White, bitmap`
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
2222222222222222
2222222222222222`],
  [Black, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [Grey, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [Blue, bitmap`
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
7777777777777777
7777777777777777`],
  [DBlue, bitmap`
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
5555555555555555
5555555555555555`],
  [Orange, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [Yellow, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [Green, bitmap`
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
4444444444444444
4444444444444444`],
  [Purple, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [Red, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
)

var gameOver = false;
var game = map`
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG`
var gameState = map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........`

var pieceType = -1;
var pieceRot = 3;
var pieceLoc = [-1, -1];

var high = 0;
var score = 0;
var lines = 0;

function updateTile(x, y, newTile) {
  const rows = game.trim().split("\n"); // Trim excess spaces and split into rows
  const maxWidth = Math.max(...rows.map(row => row.length)); // Find the maximum row width

  // Update the specific tile at (x, y) with newTile
  let updatedRow = rows[y];
  // updatedRow = updatedRow.padEnd(maxWidth, ' '); // Pad the row to match maxWidth
  updatedRow = updatedRow.substring(0, x) + newTile + updatedRow.substring(x + 1);

  rows[y] = updatedRow;
  game = rows.join("\n");


}

function updateTileState(x, y, newTile) {
  const rows = gameState.trim().split("\n"); // Trim excess spaces and split into rows
  const maxWidth = Math.max(...rows.map(row => row.length)); // Find the maximum row width

  // Update the specific tile at (x, y) with newTile
  let updatedRow = rows[y];
  updatedRow = updatedRow.padEnd(maxWidth, ' '); // Pad the row to match maxWidth
  updatedRow = updatedRow.substring(0, x) + newTile + updatedRow.substring(x + 1);

  rows[y] = updatedRow;
  gameState = rows.join("\n");

}

function getGameTile(x, y) {
  return game[(11 * y) + x];
}

function getStateTile(x, y) {
  return gameState[(11 * y) + x];
}

function addPiece(pieceNum) {
  var piece = pieces[pieceNum][3];
  var pieceRows = piece.trim().split("\n");
  const gameCopy = game;
  const gameStateCopy = gameState;
  pieceType = pieceNum;
  pieceLoc = [5, 1];
  pieceRot = 3;
  var y = 0;
  for (row of pieceRows) {
    var x = 4;
    for (cell of row) {
      if (cell === ".") {
        cell = "G"
        if (getStateTile(x, y) === "s") {
          cell = getGameTile(x, y);
        }
      } else {
        updateTileState(x, y, "p")
        if (getGameTile(x, y) != "G") {
          gameOver = true;
          game = gameCopy;
          gameState = gameStateCopy;
          break;
        }
      };
      updateTile(x, y, cell);
      x++;
    }
    y++;
  }
}

function pieceUpdate() {
  let rowsRev = gameState.trim().split("\n").reverse();
  let anyFall = false;
  const gameCopy = game;
  const gameStateCopy = gameState;
  for (var y = 19; y > 0; y--) {
    for (var x = 0; x < 10; x++) {
      cell = getStateTile(x, y);
      cellAbove = getStateTile(x, y - 1);
      if (cell === "." && cellAbove === "p") {
        updateTileState(x, y, cellAbove);
        updateTileState(x, y - 1, ".");
        updateTile(x, y, getGameTile(x, y - 1));
        updateTile(x, y - 1, "G");
        anyFall = true;
      } else if (cellAbove === "p") {
        game = gameCopy;
        gameState = gameStateCopy;
        anyFall = false;
        break;
      }
    }
  }
  if (anyFall) {
    pieceLoc[1]++;
  }
  return anyFall;
}

function movePieceLeft() {
  const rows = game.trim().split("\n");
  const columns = rows.map(row => row.split(""));

  const gameCopy = game;
  const gameStateCopy = gameState;

  for (var x = 0; x < 9; x++) {
    for (var y = 0; y < 20; y++) {
      cell = getStateTile(x, y);
      cellRight = getStateTile(x + 1, y);
      if (cell === "." && cellRight === "p") {
        updateTileState(x, y, cellRight);
        updateTileState(x + 1, y, ".");
        updateTile(x, y, getGameTile(x + 1, y));
        updateTile(x + 1, y, "G");
      } else if (cellRight === "p") {
        game = gameCopy;
        gameState = gameStateCopy;
        break;
      }
    }
  }
  if (gameCopy !== game) {
    pieceLoc[0]--;
  }
}

function movePieceRight() {
  const rows = game.trim().split("\n");
  const columns = rows.map(row => row.split(""));

  const gameCopy = game;
  const gameStateCopy = gameState;

  for (var x = 9; x > 0; x--) {
    for (var y = 0; y < 20; y++) {
      cell = getStateTile(x, y);
      cellRight = getStateTile(x - 1, y);
      if (cell === "." && cellRight === "p") {
        updateTileState(x, y, cellRight);
        updateTileState(x - 1, y, ".");
        updateTile(x, y, getGameTile(x - 1, y));
        updateTile(x - 1, y, "G");
      } else if (cellRight === "p") {
        game = gameCopy;
        gameState = gameStateCopy;
        break;
      }
    }
  }
  if (gameCopy !== game) {
    pieceLoc[0]++;
  }
}

function rotatePiece() {
  var revertRot = false;
  if (pieceType >= 0 && pieceLoc != [-1, -1]) {
    const gameCopy = game;
    const gameStateCopy = gameState;

    var nextPiece = pieces[pieceType][(pieceRot + 1) % 4]
    var nextYOffset = (pieceType === 0) ? 2 : 1;
    var pieceRows = nextPiece.trim().split("\n");
    var y = pieceLoc[1] - nextYOffset;
    for (row of pieceRows) {
      var x = pieceLoc[0] - 1;
      for (cell of row) {
        if (x >= 0 && x < 10 && y >= 0 && y < 20) {
          if (cell === ".") {
            cell = "G"
            if (getStateTile(x, y) === "p") {
              updateTileState(x, y, ".");
            } else if (getStateTile(x, y) === "s") {
              cell = getGameTile(x, y);
            }
          } else {
            if (getStateTile(x, y) === "s") {
              revertRot = true;
              break;
            }
            updateTileState(x, y, "p")
          };
          updateTile(x, y, cell);
        } else {
          revertRot = true;
          break;
        }
        x++;
      }
      y++;
    }
    if (revertRot) {
      game = gameCopy;
      gameState = gameStateCopy;
    }
    if (gameCopy !== game) {
      pieceRot = (pieceRot + 1) % 4
    }
  }
}

function gameUpdate() {
  let anyFall = pieceUpdate();
  if (!anyFall) {
    for (var i = 0; i < 200; i++) {
      if (getStateTile(i % 10, Math.floor(i / 10)) === "p") {
        updateTileState(i % 10, Math.floor(i / 10), "s");
      }
    }
    clearRows();
    addPiece(Math.floor(Math.random() * 7));
  }
  if (!gameOver) {
    setTimeout(gameUpdate, 600);
  } else {
    startGame();
  }
  // Update the game display with the modified map
  setMap(game);
  addText("HIGH", {x:14, y:1, color:color`1`})
  addText(high.toString(), {x:15, y:2, color:color`1`})
  addText("SCORE", {x:14, y:3, color:color`1`})
  addText(score.toString(), {x:15, y:4, color:color`1`})
}

function clearRows() {
  var rowsState = gameState.trim().split("\n").reverse();
  var rows = game.trim().split("\n").reverse();

  let numClear = 0;

  //clear all lines
  for (var i = 0; i < rows.length; i++) {
    for (var j=0; j < 20-i; j++) {
      if (rowsState[i] === "ssssssssss") {
        rowsState.splice(i, 1);
        rowsState.push("..........");
        rows.splice(i, 1);
        rows.push("GGGGGGGGGG");
        numClear++;
      }
    }
  }

  switch (numClear) {
    case 1:
      score += 100;
      break;
    case 2:
      score += 300;
      break;
    case 3:
      score += 500
      break;
    case 4:
      score += 800;
      break;
  }

  gameState = rowsState.reverse().join("\n");
  game = rows.reverse().join("\n");
}

function startGame() {
  high = Math.max(high, score);
  score = 0;
  console.log(game);
  if (gameOver) {
    gameOver = false;
    game = map`
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG`;
    gameState = map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........`;
    var pieceType = -1;
    var pieceRot = 3;
    var pieceLoc = [-1, -1];
  }
  gameUpdate();
}

onInput("w", () => {
  rotatePiece();
})
onInput("a", () => {
  movePieceLeft();
})
onInput("s", () => {
  pieceUpdate();
})
onInput("d", () => {
  movePieceRight();
})

afterInput(() => {
  setMap(game);
})

startGame();
