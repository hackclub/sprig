/*
@title: connect_four
@author: sam liu
@tags: ['retro']
@addedOn: 2022-08-29

The typical Connect Four game.

Controls:
a - move selection left
d - move selection right
s - drop token
*/

const yellow = "y";
const red = "r";
const arrow_yellow = "w";
const arrow_red = "d";
const frame = "f";
const select = "s";
const horizontal = "h";
const vertical = "v";
const diagonal_r = "i";
const diagonal_l = "e";


setLegend(
  [ horizontal, bitmap`
................
................
................
................
................
................
................
0000000000000000
0000000000000000
................
................
................
................
................
................
................`],
  [ vertical, bitmap`
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......`],
  [ diagonal_r, bitmap`
..............00
.............000
............000.
...........000..
..........000...
.........000....
........000.....
.......000......
......000.......
.....000........
....000.........
...000..........
..000...........
.000............
000.............
00..............`],
  [ diagonal_l, bitmap`
00..............
000.............
.000............
..000...........
...000..........
....000.........
.....000........
......000.......
.......000......
........000.....
.........000....
..........000...
...........000..
............000.
.............000
..............00`],
  [ yellow, bitmap`
................
....66666666....
...6666666666...
..666666666666..
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
..666666666666..
...6666666666...
....66666666....
................` ],
  [ red, bitmap`
................
....33333333....
...3333333333...
..333333333333..
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
..333333333333..
...3333333333...
....33333333....
................` ],
  [ arrow_yellow, bitmap`
................
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......
......6666......
..666666666666..
...6666666666...
....66666666....
.....666666.....
......6666......
.......66.......
................` ],
  [ arrow_red, bitmap`
................
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
..333333333333..
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......
................` ],
  [ frame, bitmap`
5555555555555555
5555........5555
555..........555
55............55
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
55............55
555..........555
5555........5555
5555555555555555` ],
  [ select, bitmap`
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
0000000000000000` ]
);

// 0 - Yellow, 1 - Red
let turn = 0;

setMap(map`
wwwwwww
fffffff
fffffff
fffffff
fffffff
fffffff
fffffff`);
let selection = 3;

addSprite(selection, 0, select);
let player = getFirst(select);

let token;
let board = [
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
]
let won = false;

const drawBoard = () => {
  for (let x = 0; x < 7; x++) {
    for (let y = 0; y < 6; y++) {
      clearTile(x, y+1);
      addSprite(x, y+1, frame);
      if (board[y][x] == 0) {
        addSprite(x, y+1, yellow);
      } else if (board[y][x] == 1) {
        addSprite(x, y+1, red);
      };
    };
  };

  for (let x = 0; x < 7; x++) {
    clearTile(x, 0);
    if (turn == 0) {
      addSprite(x, 0, arrow_yellow);
    } else {
      addSprite(x, 0, arrow_red);
    };
  };

  addSprite(selection, 0, select);
  player = getFirst(select);
}

const nextTurn = () => {
  turn += 1;
  turn = turn % 2;

  drawBoard();
}

const win = () => {
  for (let x = 0; x < 7; x++) {
    clearTile(x, 0);
  };
  
  if (turn == 0) {
    addText("Yellow Wins", { 
      x: 5, 
      y: 1, 
      color: color`0`
    });
  } else {
    addText("Red Wins", { 
      x: 6, 
      y: 1, 
      color: color`0`
    });
  };
  // console.log(`${turn} Wins!`)
}

const checkWin = () => {
  
  for (let x = 0; x < 7; x++) {
    for (let y = 0; y < 6; y++) {
      
      if (x < 4) {
        if (board[y][x] == turn && board[y][x+1] == turn && board[y][x+2] == turn && board[y][x+3] == turn ) {
          addSprite(x, y+1, horizontal);
          addSprite(x+1, y+1, horizontal);
          addSprite(x+2, y+1, horizontal);
          addSprite(x+3, y+1, horizontal);
          
          win();
          won = true;
          break;
        };
      };

      if (y < 3) {
        if (board[y][x] == turn && board[y+1][x] == turn && board[y+2][x] == turn && board[y+3][x] == turn ) {
          addSprite(x, y+1, vertical);
          addSprite(x, y+2, vertical);
          addSprite(x, y+3, vertical);
          addSprite(x, y+4, vertical);
          
          win();
          won = true;
          break;
        };
      };

      if (y < 3 && x < 4) {
        if (board[y][x] == turn && board[y+1][x+1] == turn && board[y+2][x+2] == turn && board[y+3][x+3] == turn ) {
          addSprite(x, y+1, diagonal_l);
          addSprite(x+1, y+2, diagonal_l);
          addSprite(x+2, y+3, diagonal_l);
          addSprite(x+3, y+4, diagonal_l);
          
          win();
          won = true;
          break;
        };
      };

      if (y > 2 && x < 4) {
        if (board[y][x] == turn && board[y-1][x+1] == turn && board[y-2][x+2] == turn && board[y-3][x+3] == turn ) {
          addSprite(x, y+1, diagonal_r);
          addSprite(x+1, y, diagonal_r);
          addSprite(x+2, y-1, diagonal_r);
          addSprite(x+3, y-2, diagonal_r);
          
          win();
          won = true;
          break;
        };
      };
        
    }; 
    if (won) { break }; 
  };
  
  if (!won) {
    nextTurn();
  };
}

const dropToken = () => {
  for (let y = 5; y >= 0; y--) {
    if (board[y][selection] == -1) {
      board[y][selection] = turn;

      drawBoard();
      checkWin();
      break;
    };
  };
}

onInput("a", () => {
  selection--;
});

onInput("d", () => {
  selection++;
});

onInput("s", () => {
  if (!won) {
    dropToken();
  };
});

afterInput(() => {
  if (!won) {
    if (selection < 0) {
      selection = 6;
    } else if (selection > 6) {
      selection = 0;
    };
  
    player.x = selection;
  };
});

drawBoard();
