/*
@title: tetris
@author: neesh
@tags: ["endless" , "puzzle" , "retro"]
@addedOn: 2022-09-12
*/

const rows = 12;
const cols = 8;
const borders = false;
const emptyColor = "0";
const background = "b";

setLegend( 
  [ background, bitmap`
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
0000000000000000`]
);

const iPiece = [
      [  true,  true,  true,  true ]
  ]
const jPiece = [
      [  true, false, false ],
      [  true,  true,  true ]
]
const lPiece = [
    [ false, false,  true ],
    [  true,  true,  true ]
]
const oPiece = [
    [  true,  true ],
    [  true,  true ]
]
const sPiece = [
    [ false,  true,  true ],
    [  true,  true, false ]
]
const tPiece = [
    [ false,  true, false ],
    [  true,  true,  true ]
]
const zPiece = [
    [  true,  true, false ],
    [ false,  true,  true ]
]
let board = [];
let score = 0;
const music = tune`
214.28571428571428: e5-214.28571428571428 + e2/214.28571428571428,
214.28571428571428: e3/214.28571428571428,
214.28571428571428: b4-214.28571428571428 + e2/214.28571428571428,
214.28571428571428: c5-214.28571428571428 + e3/214.28571428571428,
214.28571428571428: d5-214.28571428571428 + e2/214.28571428571428,
214.28571428571428: e3/214.28571428571428,
214.28571428571428: c5-214.28571428571428 + e2/214.28571428571428,
214.28571428571428: b4-214.28571428571428 + e3/214.28571428571428,
214.28571428571428: a4-214.28571428571428 + a2/214.28571428571428,
214.28571428571428: a3/214.28571428571428,
214.28571428571428: a4-214.28571428571428 + a2/214.28571428571428,
214.28571428571428: c5-214.28571428571428 + a3/214.28571428571428,
214.28571428571428: e5-214.28571428571428 + a2/214.28571428571428,
214.28571428571428: a3/214.28571428571428,
214.28571428571428: d5-214.28571428571428 + a2/214.28571428571428,
214.28571428571428: c5-214.28571428571428 + a3/214.28571428571428,
214.28571428571428: b4-214.28571428571428 + e2/214.28571428571428,
214.28571428571428: e3/214.28571428571428,
214.28571428571428: b4-214.28571428571428 + e2/214.28571428571428,
214.28571428571428: c5-214.28571428571428 + e3/214.28571428571428,
214.28571428571428: d5-214.28571428571428 + e2/214.28571428571428,
214.28571428571428: e3/214.28571428571428,
214.28571428571428: e5-214.28571428571428 + e2/214.28571428571428,
214.28571428571428: e3/214.28571428571428,
214.28571428571428: c5-214.28571428571428 + a2/214.28571428571428,
214.28571428571428: a3/214.28571428571428,
214.28571428571428: a4-214.28571428571428 + a2/214.28571428571428,
214.28571428571428: a3/214.28571428571428,
214.28571428571428: a4-214.28571428571428 + a2/214.28571428571428,
214.28571428571428: a3/214.28571428571428,
214.28571428571428: a2/214.28571428571428,
214.28571428571428: a3/214.28571428571428`
let playback = playTune(music, Infinity)
for (let i = 0; i < rows; i ++){
  const row = [];
  for (let j = 0; j < cols; j ++){ row.push(emptyColor); }
  board.push(row);
}

const pieces = [ iPiece, jPiece, lPiece, oPiece,
                        sPiece, tPiece, zPiece ]
const colors = [ "3", "6", "8",
                             "1", "7", "4", "5" ]

let fallingPiece;
let fallingPieceColor;
let numFallingPieceRows, numFallingPieceCols;
let fallingPieceRow, fallingPieceCol;

function newFallingPiece() {
  let randomIndex = Math.floor(Math.random() * pieces.length);
  fallingPiece = pieces[randomIndex]
  fallingPieceColor = colors[randomIndex]

  numFallingPieceRows = fallingPiece.length;
  numFallingPieceCols = fallingPiece[0].length;
  fallingPieceRow = 0;
  fallingPieceCol = Math.floor(cols / 2) - Math.floor(numFallingPieceCols / 2)
}

function placeFallingPiece() {
  let fp = fallingPiece;
  for (let r = 0; r < fp.length; r ++) {
    const row = fp[r]
    for (let c = 0; c < fp[r].length; c++) {
      const col = fp[r][c];
      if (col) {
        let boardRow = fallingPieceRow + r;
        let boardCol = fallingPieceCol + c;
        board[boardRow][boardCol] = fallingPieceColor
      }
    }
  }
  removeFullRows()
}

function generateEmpty2DList(rows, cols, fill) {
  const grid = [];
  for (let i = 0; i < rows; i ++) {
    const row = [];
    for (let j = 0; j < cols; j ++) {
      row.push(fill ? fill : "");
    }
    grid.push(row);
  }
  return grid
}

function rotateFallingPiece() {
  const oldRows = numFallingPieceRows;
  const oldCols = numFallingPieceCols;
  const oldPiece = fallingPiece;
  const oldRow = fallingPieceRow;
  const oldCol = fallingPieceCol;
  let rotated = generateEmpty2DList(oldCols, oldRows)

  let newRows = oldCols
  let newCols = oldRows

  for (let c = 0; c < oldCols; c ++) {
    for (let r = 0; r < oldRows; r ++) {
      rotated[c][r] = oldPiece[r][c];
    }
  }

  for (let r = 0; r < newRows; r ++) {
    rotated[r].reverse()
  }

  numFallingPieceRows = newRows;
  numFallingPieceCols = newCols;
  fallingPiece = rotated;

  let newRow = oldRow + Math.floor(oldRows / 2) - Math.floor(newRows / 2)
  let newCol = oldCol + Math.floor(oldCols / 2) - Math.floor(newCols / 2)

  fallingPieceRow = newRow
  fallingPieceCol = newCol;

  if(!fallingPieceIsLegal()) {
    fallingPiece = oldPiece;
    numFallingPieceRows = oldRows;
    numFallingPieceCols = oldCols;
    fallingPieceRow = oldRow;
    fallingPieceCol = oldCol;
  }
  
}

function fallingPieceIsLegal() {
  for (let r = 0; r < fallingPiece.length; r ++) {
    const row = fallingPiece[r]
    for (let c = 0; c < row.length; c ++) {
      const col = fallingPiece[r][c];
      if (!col) continue;
      const x = r + fallingPieceRow;
      const y = c + fallingPieceCol;
      const withinBoundsX = x >= 0 && x < rows;
      const withinBoundsY = y >= 0 && y < cols;
      if (!withinBoundsX || !withinBoundsY) {
        return false;
      }
      if (board[x][y] != emptyColor) {
        return false
      }
    }
  }
  return true;
}

function moveFallingPiece(drow, dcol) {
  fallingPieceRow += drow;
  fallingPieceCol += dcol;
  if (!fallingPieceIsLegal()) {
    fallingPieceRow -= drow;
    fallingPieceCol -= dcol;
    return false;
  }
  return true;
}

function removeFullRows(app) {
  let fullRows = 0;
  const newBoard = [];
  board.forEach(row => {
    let isFull = true;
    row.forEach(col => {
      if (col == emptyColor) {
        isFull = false;
      }
    })
    if (isFull) {
      fullRows += 1;
    }
    else {
      newBoard.push(row)
    }
  })
  for (let r = 0; r < fullRows; r ++) {
    newBoard.splice(0, 0, Array.from(emptyColor.repeat(cols)))
  }
  board = newBoard
  score += fullRows;
}

// each "sprite" contains 16 actual cells, x, y are the top left coords
function genPiece(xCoord, yCoord) {
  let sprite = []; // 4x4 of 4x4s
  for (let i = 0; i < 4; i ++) {
    let rows = []; // 4 4x4s
    for (let j = 0; j < 4; j ++){
      const x = i + xCoord;
      const y = j + yCoord;
      let cell = board[x][y];
      const withinFallingPieceX = fallingPieceRow <= x && x < fallingPieceRow + numFallingPieceRows
      const withinFallingPieceY = fallingPieceCol <= y && y < fallingPieceCol + numFallingPieceCols
      if (withinFallingPieceX && withinFallingPieceY) {
        if (fallingPiece[x - fallingPieceRow][y - fallingPieceCol]) {
          cell = fallingPieceColor;
        }
      }
      let row = []; // 4x4
      for (let r = 0; r < 4; r ++) {
        let miniRow = []; // 1x4
        for (let c = 0; c < 4; c ++) {
          if ((r == 0 || c == 0 || r == 3 || c == 3) && borders) { // make borders black
            miniRow.push(emptyColor);
          }
          else {
            miniRow.push(cell);
          }
        }
        row.push(miniRow);
      }
      rows.push(row)
    }
    sprite.push(rows);
  }
  return boardToString(sprite);
}

function boardToString(board) {
  // board is a 4x4 of 4x4s
  let string = "";
  for (const bigRow of board) {
    let bigRowString = "\n\n\n";
    for (const cell of bigRow) {
      // 4x4
      let row = "";
      for (let c = 0; c < 4; c ++) {
        for (let r = 0; r < 4; r ++) {
          row += (cell[r][c]);
        }
        row += "\n"
      }

      let rows = bigRowString.split("\n")
      let newRows = row.trim().split("\n")
      bigRowString = rows.map((r, i) => r + newRows[i]).join("\n")
    }
    string += bigRowString
    string += "\n"
  }
  return string;
}


function loadPieces() {
  const legend = [];
  let i = 0;
  for (let r = 0; r < rows; r += 4){
    for (let c = 0; c < cols; c += 4) {
      legend.push([`${i}`, genPiece(r, c)])
      i += 1;
    }
  }
  setLegend(...legend)
}

function start() {
  fallingPiece = undefined;
  fallingPieceRow = undefined;
  fallingPieceCol = undefined;
  fallingPieceColor = undefined;
  numFallingPieceRows = undefined;
  numFallingPieceCols = undefined;

  board = generateEmpty2DList(rows, cols, emptyColor)
  newFallingPiece();
  loadPieces();
  score = 0;
}


start();
setBackground(background);

setMap(`
01
23
45
`)

setSolids([]);

setInterval(() => {
  getAll().forEach((sprite) => {
    sprite.remove();
  })
  loadPieces();
  setMap(`
  01
  23
  45
  `)

  clearText();
  addText(`${score}`, { x: 14, y: 1, color: color`2` })
}, 30)

setInterval(() => {
  if (!moveFallingPiece(1, 0)) {
    placeFallingPiece();
    newFallingPiece();
  }

  for (let c = 0; c < cols; c ++) {
    if (board[0][c] != emptyColor) {
      start();
    }
  }
}, 700)

onInput("d", () => { moveFallingPiece(0, 1) })
onInput("a", () => { moveFallingPiece(0, -1) })
onInput("s", () => { moveFallingPiece(1, 0) })
onInput("l", () => { rotateFallingPiece() })
onInput("k", () => { start() })
