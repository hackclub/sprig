/*
@title: TicTacToe
@author: Northernside
@tags: ['retro']
@addedOn: 2023-02-02

This isn't 100% made by me, as I heavily modified Atharv Gupta's code and fixed some bugs + improved the code.

@credits: Atharv Gupta -> because this game builds upon their work
*/

const x = "X",
  o = "O",
  cursor = "c";

const tile = "0",
  endScreenTile = "1";

setLegend(
  [ cursor, bitmap`
................
................
..222222222222..
..2..........2..
..2..........2..
..2..........2..
..2..........2..
..2..........2..
..2..........2..
..2..........2..
..2..........2..
..2..........2..
..2..........2..
..222222222222..
................
................`],
  [ x, bitmap`
................
................
................
................
....77....77....
....777..777....
.....777777.....
......7777......
......7777......
.....777777.....
....777..777....
....77....77....
................
................
................
................`],
  [ o, bitmap`
................
................
................
................
......3333......
.....333333.....
....333..333....
....33....33....
....33....33....
....333..333....
.....333333.....
......3333......
................
................
................
................`],
  [ tile, bitmap`
1111111111111111
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1111111111111111`],
  [ endScreenTile, bitmap`
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

setMap(map`
000
000
000`);
addSprite(1, 1, cursor);

let isPlayer = true,
  tileState = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ], gameEnded = false;

function checkWin() {
  const mappedChar = (isPlayer ? "X" : "O");
  
  // Vertical check
  for (let y = 0; y < 3; ++y)
    if (tileState[y][0] != " " && tileState[y][0] == tileState[y][1] && tileState[y][1] == tileState[y][2])
      endGame(mappedChar + " wins!");
      
  // Horizontal check
  for (let x = 0; x < 3; ++x)
    if (tileState[0][x] != " " && tileState[0][x] == tileState[1][x] && tileState[1][x] == tileState[2][x])
      endGame(mappedChar + " wins!");

  // Diagonal check
  if (tileState[0][0] != " " && tileState[0][0] == tileState[1][1] && tileState[1][1] == tileState[2][2])
    endGame(mappedChar + " wins!");
    
  // Antidiagonal check
  if (tileState[0][2] != " " && tileState[0][2] == tileState[1][1] && tileState[1][1] == tileState[2][0])
    endGame(mappedChar + " wins!");
  
  return;
}

function checkTie() {
  for (let y = 0; y < 3; y++)
    for (let x = 0; x < 3; x++)
      if (tileState[y][x] == " ")
        return;
  
  endGame("It was a tie...");
}

function endGame(phrase) {
  gameEnded = true;
  setMap(map`
111
111
111`);
  addText(phrase, {y:7, color: color`2`});
}

onInput("w", () => {
  if (gameEnded == false)
    getFirst(cursor).y -= 1;
});

onInput("a", () => {
  if (gameEnded == false)
    getFirst(cursor).x -= 1;
});

onInput("s", () => {
  if (gameEnded == false)
    getFirst(cursor).y += 1;
});

onInput("d", () => {
  if (gameEnded == false)
    getFirst(cursor).x += 1;
});

onInput("i", () => {
  if (gameEnded || tileState[getFirst(cursor).y][getFirst(cursor).x] != " ")
    return;
  
  const mappedChar = (isPlayer ? "X" : "O");
  
  addSprite(getFirst(cursor).x, getFirst(cursor).y, mappedChar);
  tileState[getFirst(cursor).y][getFirst(cursor).x] = mappedChar;

  checkWin();
  checkTie();
  
  isPlayer = !isPlayer;
});
