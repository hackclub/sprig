/*
@title: spriGO
@author: InfinityCity18
@tags: ['multiplayer', 'strategy', 'go', 'baduk']
@addedOn: 2024-08-12
*/

/*
wasd to move,
j to place stones, confirm in menu
i to pass, 2 consecutive passes end the game
i and k to increase and decrease komi and size in menu
*/

const white = "w"
const black = "b"
const cross = "0"
const lt_corner = "1"
const rt_corner = "2"
const lb_corner = "3"
const rb_corner = "4"
const l_pipe = "5"
const r_pipe = "6"
const t_bar = "7"
const b_bar = "8"
const bg = "9"
const cursor = "c"
const logo_l = "!"
const logo_r = "@"
const menu_bg = "#"
const sfx_button = "$"
const play = "%"
const menu_cursor = "^"
const sfx_cross = "&"

setLegend(
  [menu_cursor, bitmap`
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
5555555555555555`],
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
.L000000000000L.
..L0000000000L..
...L00000000L...
....LLLLLLLL....
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
.L222222222222L.
..L2222222222L..
...L22222222L...
....LLLLLLLL....
................`],
  [cursor, bitmap`
555..........555
55............55
5..............5
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
5..............5
55............55
555..........555`],
  [cross, bitmap`
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
3333333003333333
0000000000000000
0000000000000000
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC`],
  [lt_corner, bitmap`
................
................
................
................
................
................
................
.......000000000
.......000000000
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC`],
  [rt_corner, bitmap`
................
................
................
................
................
................
................
000000000.......
000000000.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......`],
  [lb_corner, bitmap`
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......003333333
.......000000000
.......000000000
................
................
................
................
................
................
................`],
  [rb_corner, bitmap`
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
333333300.......
000000000.......
000000000.......
................
................
................
................
................
................
................`],
  [l_pipe, bitmap`
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......003333333
.......000000000
.......000000000
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC`],
  [r_pipe, bitmap`
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
333333300.......
000000000.......
000000000.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......`],
  [t_bar, bitmap`
................
................
................
................
................
................
................
0000000000000000
0000000000000000
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC`],
  [b_bar, bitmap`
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
3333333003333333
0000000000000000
0000000000000000
................
................
................
................
................
................
................`],
  [bg, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [logo_l, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCC2
CCCCCCCCCCCCCCCC
CC222C222CC2C2C2
C2CCCC2CC2C22CC2
CC22CC2CC2C2CCC2
CCCC2C2C2CC2CCC2
C222CC22CCC2CCC2
CCCCCC2CCCCCCCCC
CCCCCC2CCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [logo_r, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC222CCC222CC2CC
C2CCCCC2CCC2C2CC
C2CCCCC2CCC2C2CC
C2CC22C2CCC2C2CC
C2CCC2C2CCC2C2CC
C2CCC2C2CCC2CCCC
CC222CCC222CC2CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [menu_bg, bitmap`
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
CCCCCCCCCCCCCCCC`],
  [sfx_cross, bitmap`
................
................
................
...22......22...
.....22..22.....
.......22.......
.......22.......
.....22..22.....
...22......22...
................
................
................
................
................
................
................`],
  [sfx_button, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC222222222222CC
CC2CCCCCCCCCC2CC
CC2CCCCCCCCCC2CC
CC2CCCCCCCCCC2CC
CC2CCCCCCCCCC2CC
CC2CCCCCCCCCC2CC
CC2CCCCCCCCCC2CC
CC222222222222CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [play, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCC22CCCCCCCC
CCCCCC2222CCCCCC
CCCCCC222222CCCC
CCCCCC2222222CCC
CCCCCC222222CCCC
CCCCCC2222CCCCCC
CCCCCC22CCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
)

const placing_sound = tune`
200: G4^200,
6200`;

const menu = map`
#!@#
$%##
####`;

var black_score;
var white_score;
var last_player_passed;
let player_turn; //black starts
let board; //0 means empty, b means black stone, w means white stone
let ko;
var board_size = 9;
let komi = 6.5
let sfx = false;
let in_menu = true;
var menu_cursor_pos = 1;
var gameover = false;
var are_inputs_defined = false;

function start_menu() {

  setMap(menu);

  addSprite(menu_cursor_pos, 1, menu_cursor);

  draw_menu_text();
  if (!(are_inputs_defined)) {
    define_inputs();
    are_inputs_defined = true;
  }
}

start_menu();
//game_start();

function create_board_arr(size) {
  let arr = []

  for (let i = 0; i < size; i++) {
    let column = []
    for (let j = 0; j < size; j++) {
      column.push(0)
    }
    arr.push(column)
  }

  return arr;
}

function get_cursor_pos() {
  return [getFirst(cursor).x, getFirst(cursor).y];
}

function mark_dfs(map, x, y, marker, opponent_color, piece_color) {
  map[x][y] = marker;
  const adjacent = [];
  var has_liberty = false;

  //index bounds check
  legal_adjacent_tiles(x, y, adjacent);

  for (const i in adjacent) {
    const x_loop = adjacent[i][0];
    const y_loop = adjacent[i][1];

    if (map[x_loop][y_loop] != 0) { //this place was visited already
      continue;
    }

    var type = board[x_loop][y_loop];

    if (type == opponent_color) {
      if (mark_dfs(map, x_loop, y_loop, marker, opponent_color, piece_color)) {
        has_liberty = true;
      };
    } else if (type == piece_color) {} else {
      has_liberty = true;
    }
  }

  return has_liberty;
}


function place_piece(x, y, piece_color) {
  addSprite(x, y, piece_color);
  board[x][y] = piece_color;
}

function remove_piece(x, y, piece_color) {
  const sprites = getTile(Number(x), Number(y));
  for (let i in sprites) {
    if (sprites[i].type == piece_color) {
      sprites[i].remove();
      break;
    }
  }
  board[x][y] = 0;
}

function legal_adjacent_tiles(x, y, adjacent) {
  if (x - 1 >= 0) {
    adjacent.push([x - 1, y]);
  }
  if (x + 1 < board_size) {
    adjacent.push([x + 1, y]);
  }
  if (y - 1 >= 0) {
    adjacent.push([x, y - 1]);
  }
  if (y + 1 < board_size) {
    adjacent.push([x, y + 1]);
  }
  return adjacent;
}

function capture(map, to_capture, opponent_color) {
  var points = 0;
  for (let x in map) {
    for (let y in map[x]) {
      if (to_capture.includes(map[x][y])) {
        remove_piece(x, y, opponent_color);
        points += 1;
      }
    }
  }
  return points;
}

function count_for_ko(map, marker) {
  var count = 0;
  var x_ko;
  var y_ko;
  for (let x in map) {
    for (let y in map[x]) {
      if (map[x][y] == marker) {
        count += 1;
        x_ko = x;
        y_ko = y;
      }
    }
  }
  if (count == 1) {
    ko[x_ko][y_ko] = 1;
    return [true, x_ko, y_ko];
  }
  return [false];
}

function spawn_cursor() {
  const half = Math.floor(board_size / 2);
  addSprite(half, half, cursor);
}

function count_territory() {
  const map = create_board_arr(board_size);

  for (let i in board) {
    for (let j in board[i]) {
      if (!(board[Number(i)][Number(j)] != 0) && (map[i][j] == 0)) {
        const evaluation = territory_dfs(map, Number(i), Number(j));
        if (evaluation[0] && evaluation[1]) {
          //neutral territory
        } else if (evaluation[0]) {
          black_score += evaluation[2];
        } else if (evaluation[1]) {
          white_score += evaluation[2];
        } else {
          //should only be reachable when game is ended with zero pieces placed
        }
      }
    }
  }
}

function territory_dfs(map, x, y) {
  map[x][y] = "v";
  const adjacent = [];
  var black_terr = false;
  var white_terr = false;
  var counter = 1;

  //index bounds check
  legal_adjacent_tiles(x, y, adjacent);

  for (const i in adjacent) {
    const x_loop = adjacent[i][0];
    const y_loop = adjacent[i][1];

    if (map[x_loop][y_loop] != 0) { //this place was visited already
      continue;
    }

    var type = board[x_loop][y_loop];

    if (type == black) {
      black_terr = true;
    } else if (type == white) {
      white_terr = true;
    } else {
      const evaluation = territory_dfs(map, x_loop, y_loop);
      if (evaluation[0]) {
        black_terr = evaluation[0];
      }
      if (evaluation[1]) {
        white_terr = evaluation[1];
      }
      counter += evaluation[2];
    }
  }

  return [black_terr, white_terr, counter];
}

function game_start() {

  clearText();
  const board_map = create_board(board_size);

  setMap(board_map)
  setBackground(bg)

  spawn_cursor();
  board = create_board_arr(board_size);
  ko = create_board_arr(board_size);
  black_score = 0;
  white_score = 0;
  last_player_passed = false;
  player_turn = black;
}

function gameover_screen() {
  count_territory();
  let winning_player_text = "";
  const gameover_text_color = color`7`;
  const score_text = " " + black_score + " : " + (white_score + komi);

  if (black_score > (white_score + komi)) { //black wins
    winning_player_text = "Black wins!";
  } else { //white wins
    winning_player_text = "White wins!";
  }
  addText(winning_player_text, {
    x: 5,
    y: 5,
    color: gameover_text_color
  })
  addText(score_text, {
    x: 6,
    y: 7,
    color: gameover_text_color
  });
  addText("Press k to exit", {
    x: 2,
    y: 9,
    color: gameover_text_color
  });

}

function create_board(size) {
  let return_value = ""
  return_value += "\n";
  return_value += "1";
  for (let i = 0; i < size - 2; i++) { return_value += "7" }
  return_value += "2";
  return_value += "\n";
  for (let i = 0; i < size - 2; i++) {
    return_value += "5";
    for (let j = 0; j < size - 2; j++) { return_value += "0" }
    return_value += "6";
    return_value += "\n";
  }
  return_value += "3";
  for (let i = 0; i < size - 2; i++) { return_value += "8" }
  return_value += "4";
  return_value += "\n";
  return map`${return_value}`;
}

function draw_menu_text() {
  addText(komi.toString(), {
    x: 11,
    y: 7,
    color: color`2`
  });
  addText(board_size.toString(), {
    x: 16,
    y: 7,
    color: color`2`
  });
  addText(" Komi", {
    x: 10,
    y: 9,
    color: color`2`
  })
  addText("SFX", {
    x: 1,
    y: 9,
    color: color`2`
  })
  addText("Size", {
    x: 16,
    y: 9,
    color: color`2`
  })
  addText("Play", {
    x: 6,
    y: 9,
    color: color`2`
  })
}

function define_inputs() {

  onInput("j", () => {
    if (in_menu) {
      if (menu_cursor_pos == 0) {
        if (sfx) {
          sfx = false;
          getFirst(sfx_cross).remove();
        } else {
          sfx = true;
          addSprite(0, 1, sfx_cross);
        }
        return;
      } else if (menu_cursor_pos == 1) {
        in_menu = false;
        game_start();
        return;
      }
      return;
    }

    if (gameover) {
      return;
    }
    const [cursor_x, cursor_y] = get_cursor_pos();
    if (board[cursor_x][cursor_y] != 0) {
      return;
    }

    if (ko[cursor_x][cursor_y] == 1) {
      board[cursor_x][cursor_y] = 0;
      return;
    }

    board[cursor_x][cursor_y] = player_turn; // temp add for mark_dfs, will be deleted if move is illegal
    let opponent_color = player_turn == black ? white : black;
    let adjacent = [];
    legal_adjacent_tiles(cursor_x, cursor_y, adjacent);

    let opponent_map = create_board_arr(board_size);
    let friendly_map = create_board_arr(board_size);
    let to_capture = [];
    let friendly_in_danger = [];
    var opponent_marker = 1;
    var liberty_markers = {
      1: false,
      2: false,
      3: false,
      4: false
    };
    var friendly_marker = 1;
    var liberty_opponents = 0;

    for (let i in adjacent) {
      let [x, y] = adjacent[i];
      let type = board[x][y];

      if (type == player_turn) { //is our stone

        if (friendly_map[x][y] != 0) { //was here before
          if (friendly_in_danger.includes(friendly_map[x][y])) {
            friendly_in_danger.push(friendly_map[x][y]);
          }
          continue;
        }

        if (!(mark_dfs(friendly_map, x, y, friendly_marker, player_turn, opponent_color))) { //we have to invert colors, because we are searching for our stones
          friendly_in_danger.push(friendly_marker);
        }
        friendly_marker += 1;

      } else if (type == opponent_color) {
        if (opponent_map[x][y] != 0) { //was here before
          if (liberty_markers[opponent_map[x][y]]) {
            liberty_opponents += 1;
          }
          continue;
        }

        if (!(mark_dfs(opponent_map, x, y, opponent_marker, opponent_color, player_turn))) {
          to_capture.push(opponent_marker);
        } else {
          liberty_markers[opponent_marker] = true;
          liberty_opponents += 1;
        }
        opponent_marker += 1;

      }
    }
    var dont_delete_ko = false;
    var dont_delete_ko_x;
    var dont_delete_ko_y;
    if (to_capture.length > 0) { //we can capture at least one, so our move is surely legal
      if (to_capture.length == 1) {
        let [flow, x_ko, y_ko] = count_for_ko(opponent_map, to_capture[0]);
        if (flow) {
          dont_delete_ko = true;
          dont_delete_ko_x = x_ko;
          dont_delete_ko_y = y_ko;
        }
      }
      const points = capture(opponent_map, to_capture, opponent_color);
      if (player_turn == black) {
        black_score += points;
      } else {
        white_score += points;
      }
    }

    if ((liberty_opponents + friendly_in_danger.length) == adjacent.length) {
      board[cursor_x][cursor_y] = 0;
      return;
    }

    if (dont_delete_ko) {
      for (let iter_x in ko) {
        for (let iter_y in ko[iter_x]) {
          if (!(iter_x == dont_delete_ko_x && iter_y == dont_delete_ko_y)) {
            ko[iter_x][iter_y] = 0;
          }
        }
      }
    } else {
      ko = create_board_arr(board_size);
    }
    last_player_passed = false;
    board[cursor_x][cursor_y] = 0;
    place_piece(cursor_x, cursor_y, player_turn);
    if (sfx) {
      playTune(placing_sound);
    }
    if (player_turn == black) {
      player_turn = white;
    } else {
      player_turn = black;
    }
  })

  onInput("s", () => {
    if (gameover || in_menu) {
      return;
    }
    getFirst(cursor).y += 1
  })

  onInput("w", () => {
    if (gameover || in_menu) {
      return;
    }
    getFirst(cursor).y -= 1
  })

  onInput("a", () => {
    if (in_menu) {
      getFirst(menu_cursor).x -= 1;
      menu_cursor_pos = getFirst(menu_cursor).x;
      return;
    } else if (gameover) {
      return;
    }
    getFirst(cursor).x -= 1
  })

  onInput("d", () => {
    if (in_menu) {
      getFirst(menu_cursor).x += 1;
      menu_cursor_pos = getFirst(menu_cursor).x;
      return;
    } else if (gameover) {
      return;
    }
    getFirst(cursor).x += 1
  })

  onInput("i", () => { //passing
    if (in_menu) {
      if (menu_cursor_pos == 2) {
        komi += 1.0;
        if (komi > 9.5) {
          komi = 9.5;
        } else if (komi < 0.0) {
          komi = 0.0;
        }
      } else if (menu_cursor_pos == 3) {
        board_size += 1;
        if (board_size > 19) {
          board_size = 19;
        }
      }
      return;
    }
    if (gameover) {
      return;
    }
    if (player_turn == black) {
      player_turn = white;
    } else {
      player_turn = black;
    }
    if (last_player_passed) {
      gameover = true;
    }

    last_player_passed = true;
  })

  onInput("k", () => { //zero out input
    if (in_menu) {
      if (menu_cursor_pos == 2) {
        komi -= 1.0;
        if (komi > 9.5) {
          komi = 9.5;
        } else if (komi < 0.5) {
          komi = 0.5;
        }
        
      }
      else if (menu_cursor_pos == 3) {
        board_size -= 1;
        if (board_size < 5) {
          board_size = 5;
        }
      }
      return;
    }
    if (gameover) {
      clearText();
      gameover = false;
      in_menu = true;
      board_size = 9;
      komi = 6.5
      menu_cursor_pos = 1;
      sfx = false;
      start_menu();
    }
  })

  onInput("l", () => { //zero out input
  })

  afterInput(() => {
    if (in_menu) {
      clearText();
      draw_menu_text();
      return;
    }
    if (gameover) {
      gameover_screen();
    }
  })
}
