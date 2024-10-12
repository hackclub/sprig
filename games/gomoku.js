/*
@title: Gomoku
@author: Bianca
@tags: ['strategy', 'multiplayer']
@addedOn: 2024-10-12

Controls:
- WASD to move cursor
- J to place stones
- I to restart
*/

const black = "b";
const white = "w";
const cursor = "c";
const empty = "0";
const bg = "2";

setLegend(
  [black, bitmap`
................
....00000000....
...0000000000...
..000000000000..
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
..000000000000..
...0000000000...
....00000000....
................`],
  [white, bitmap`
................
....22222222....
...2222222222...
..222222222222..
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
..222222222222..
...2222222222...
....22222222....
................`],
  [cursor, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [empty, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`],
  [bg, bitmap`
FFFFFFFCCFFFFFFF
FFFFFFFCCFFFFFFF
FFFFFFFCCFFFFFFF
FFFFFFFCCFFFFFFF
FFFFFFFCCFFFFFFF
FFFFFFFCCFFFFFFF
FFFFFFFCCFFFFFFF
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
FFFFFFFCCFFFFFFF
FFFFFFFCCFFFFFFF
FFFFFFFCCFFFFFFF
FFFFFFFCCFFFFFFF
FFFFFFFCCFFFFFFF
FFFFFFFCCFFFFFFF
FFFFFFFCCFFFFFFF`]
);

var board_size = 15;
let board = create_board_arr(board_size);
let player_turn = black;
let gameover = false;

function create_board_arr(size) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    let column = [];
    for (let j = 0; j < size; j++) {
      column.push(0); // 0 means empty
    }
    arr.push(column);
  }
  return arr;
}

function reset_board() {
  board = create_board_arr(board_size);
  gameover = false;
  player_turn = black;
  clearText();

  const todelete = [white, black];
  
  todelete.forEach(type => {
      const spritesToDelete = getAll(type);
      
      spritesToDelete.forEach(sprite => {
        sprite.remove();
    });
  });
  const cursorSprite = getFirst(cursor);
  if (cursorSprite) {
    cursorSprite.x = 0;
    cursorSprite.y = 0;
  }
}

function check_winner(x, y, color) {
  const directions = [
    { dx: 1, dy: 0 }, // horizontal
    { dx: 0, dy: 1 }, // vertical
    { dx: 1, dy: 1 }, // diagonal /
    { dx: 1, dy: -1 } // diagonal \
  ];
  
  for (const dir of directions) {
    let count = 1;
    
    for (let i = 1; i < 5; i++) {
      const nx = x + dir.dx * i;
      const ny = y + dir.dy * i;
      if (nx < 0 || nx >= board_size || ny < 0 || ny >= board_size || board[nx][ny] !== color) {
        break;
      }
      count++;
    }
    
    for (let i = 1; i < 5; i++) {
      const nx = x - dir.dx * i;
      const ny = y - dir.dy * i;
      if (nx < 0 || nx >= board_size || ny < 0 || ny >= board_size || board[nx][ny] !== color) {
        break;
      }
      count++;
    }
    
    if (count >= 5) {
      return true; // winner found
    }
  }
  
  return false; // no winner found
}

function spawn_cursor() {
  addSprite(0, 0, cursor);
}

function game_start() {
  clearText();
  reset_board();
  setMap(map`${generateEmptyMap()}`);
  if (!getFirst(cursor)) {spawn_cursor()}
}

function generateEmptyMap() {
  const map = [];
  for (let i = 0; i < board_size; i++) {
    let row = Array(board_size).fill(bg).join('');
    map.push(row);
  }
  console.log(map.join('\n'));
  const h = map.join('\n')
  console.log(`${h}`)
  return `${h}`
}

function get_cursor_pos() {
  const cursorSprite = getFirst(cursor);
  if (!cursorSprite) {
    console.error("Cursor not found");
    return
  }
  const x = cursorSprite.x
  const y = cursorSprite.y

  return [x, y]
}

if (!gameover) {
  onInput("w", () => {
    getFirst(cursor).y -= 1;
  });

  onInput("s", () => {
    getFirst(cursor).y += 1;
  });

  onInput("a", () => {
    getFirst(cursor).x -= 1;
  });

  onInput("d", () => {
    getFirst(cursor).x += 1;
  });

onInput("j", () => {
  if (gameover) return;
  const [x, y] = get_cursor_pos();
  if (board[x][y] === 0) {
    board[x][y] = player_turn;
    addSprite(x, y, player_turn);

    if (check_winner(x, y, player_turn)) {
      gameover = true;
      addText(`${player_turn.charAt(0).toUpperCase() + player_turn.slice(1)} wins!`, { x: 7, y: 8, color: color`5` });
    }

    player_turn = player_turn === black ? white : black; 
  }
});  
}

onInput("i", () => {
  reset_board();
});

game_start();
