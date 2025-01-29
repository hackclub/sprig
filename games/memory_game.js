/*
@title: Memory Game
@author: uped
@tags: []
@addedOn: 2024-06-18
Memory Game!
pair matching cards to earn score

Controls:
wasd to move
i to interact

*/

const question_mark = "?"
const cursor = 'c'
const card1 = '1'
const card2 = '2'
const card3 = '3';
const card4 = '4';
const card5 = '5';
const card6 = '6';
const card7 = '7';
const card8 = '8';
const invalid = 'i';
const correct = 'g';
const background = 'b';
const background2 = 'y';

const moveTune = tune`
211.26760563380282: C5~211.26760563380282,
6549.295774647887`;
const invalidTune = tune`
508.47457627118644: C4/508.47457627118644,
15762.71186440678`;
const correctTune = tune`
365.8536585365854: B5^365.8536585365854,
11341.463414634147`;

setLegend(
  [ question_mark, bitmap`
................
.00000000000000.
.09999999999990.
.09999922199990.
.09999992219990.
.09999999219990.
.09999999219990.
.09999992219990.
.09999922199990.
.09999921999990.
.09999999999990.
.09999921999990.
.09999921999990.
.09999999999990.
.00000000000000.
................` ],
  [ cursor, bitmap`
33.33.33.33.33.3
...............3
3...............
3..............3
...............3
3...............
3..............3
...............3
3...............
3..............3
...............3
3...............
3..............3
...............3
3...............
3.33.33.33.33.33`],
  [ card1, bitmap`
................
...........00...
............00..
............00..
...........0060.
...........0620.
...........0620.
...........0660.
..........00660.
........0006660.
........0666660.
...00000666690..
.0066666666900..
..00066699900...
....0000000.....
................`],
  [ card2, bitmap`
................
.......000......
.....00CC40.....
...00999C4400...
...0999994D90...
..099229999900..
..092299999990..
..092999999990..
..099999999990..
..099999999990..
..099999999990..
..099999999960..
...0999999960...
...0099999600...
.....000000.....
................`],
  [card3, bitmap`
................
......0000......
...0000CCD0.....
..00H8HC4D0.....
..0HH82H8D00....
..00022888800...
...0HH8HH8HH0...
...0HH8HH8HH0...
...0008888800...
.....0HH8HH0....
.....0HH8HH0....
.....0088000....
......0HH0......
......0H0.......
......000.......
................`],
  [card4, bitmap`
................
............00..
..........0030..
........003330..
......0033030...
....003303330...
..0032233330....
.0D432330330....
.0D43333330.....
.0D44303330.....
.0DD4333030.....
.0DD443330......
.00DD44440......
..00DDDD0.......
...000000.......
................`],
  [card5, bitmap`
................
......0.........
.....040........
.....0D400......
....0CCCCC0.....
....0C000CC0....
...0CC0.00C00...
...0C0.0333330..
...0C000322330..
..033330323330..
..032230333330..
..032330333330..
..03333000000...
..0333330.......
...00000........
................`],
  [card6, bitmap`
................
.......00.......
.....00CC00.....
...0033C44300...
...033334D330...
..033233DD3330..
..032233333330..
..033333333330..
..033333333330..
..033333333330..
..033333333330..
..033333333330..
...0333333330...
...0033333300...
.....000000.....
................`],
  [card7, bitmap`
................
................
................
...0000..0000...
..00HH0000HH00..
..0HHHHCCDHHH0..
..0H22HH4DHHH0..
..0H2HHHHHHHH0..
..0HHHHHHHHHH0..
..0HHHHHHHHH80..
..0HHHHHHHH880..
..00HHHHHHH800..
...0HHHHHH880...
....00000000....
................
................`],
  [card8, bitmap`
................
.......00.......
.......00.......
......0CC0......
......04C0......
.....004400.....
.....022440.....
.....042440.....
....00444400....
...0044444400...
...04444444D0...
...0444444DD0...
...0044444D00...
....04444DD0....
.....000000.....
................`],
  [invalid, bitmap`
................
.00000000000000.
.03333333333330.
.03333333333330.
.03321333332330.
.03332133321330.
.03333213213330.
.03333322133330.
.03333322133330.
.03333213213330.
.03332133321330.
.03321333332130.
.03333333333330.
.03333333333330.
.00000000000000.
................`],
  [background, bitmap`
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
  [background2, bitmap`
4444444444444444
4444444444444444
DDD444444444444D
CCDDDDDD4444DDDD
CCCCCCCDDDDDDCCC
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
  [correct, bitmap`
................
.00000000000000.
.0DDDDDDDDDDDD0.
.0DDDDDDDDDDDD0.
.0DDDDDDDDD21D0.
.0DDDDDDDD221D0.
.0DDDDDDDD221D0.
.0DD21DDD221DD0.
.0DD221D221DDD0.
.0DDD22121DDDD0.
.0DDDD2221DDDD0.
.0DDDDD21DDDDD0.
.0DDDDDDDDDDDD0.
.0DDDDDDDDDDDD0.
.00000000000000.
................`]
)
setBackground(background);


setSolids([])

let level = 1
const levels = [
  map`
yyyy
????
????
????
????`,
  map`
yyyy
1..5
2..6
3..7
4..8`,
]

const cards = [card1, card2, card3, card4, card5, card6, card7, card8];

const BOARD_X_SIZE = 4;
const BOARD_Y_SIZE = 4;
let board = [];

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const restart_board = () => {
  board = [];
  for (const card of cards) {
    board.push(card);
    board.push(card);
  }
  shuffleArray(board);
}

restart_board();

      
setMap(levels[level])

addText("Memory", {x: 7, y: 2, color: color`2`});
addText("Game", {x: 8, y: 4, color: color`2`});
addText("WASD: ", {x: 7, y: 7, color: color`2`});
addText("move ", {x: 7, y: 8, color: color`2`});
addText("i:  ", {x: 7, y: 10, color: color`2`});
addText("action", {x: 7, y: 11, color: color`2`});
addText("press", {x: 7, y: 13, color: color`2`});
addText("any", {x: 8, y: 14, color: color`2`});

restart_board();

onInput("s", () => {
  if (level != 0) return;
  getFirst(cursor).y += 1
  playTune(moveTune);
})

onInput("w", () => {
  if (level != 0) return;
  getFirst(cursor).y -= 1;
  playTune(moveTune);
})

onInput("d", () => {
  if (level != 0) return;
  getFirst(cursor).x += 1;
  playTune(moveTune);
})

onInput("a", () => {
  if (level != 0) return;
  getFirst(cursor).x -= 1;
  playTune(moveTune);
})


let first_x = -1;
let first_y = -1;
let second_x = -1;
let second_y = -1;
let should_reset = 0;
let can_interact = true;
let can_restart = false;
let score = 0;

const set_card = (x, y, type, check = false) => {
  const sprites = getTile(x, y)
  for (const sprite of sprites) {
    //if (check && sprite.type == correct) continue;
    if (sprite.type === question_mark || sprite.type == invalid || cards.includes(sprite.type)) {
      sprite.type = type;
    }
  }
} 

onInput("i", () => {
  if (level != 0 || !can_interact) return;
  const c = getFirst(cursor);
  if (getTile(c.x, c.y).filter((x) => x.type == question_mark).length < 1) return;
  playTune(moveTune);
  set_card(c.x, c.y, board[c.x * BOARD_Y_SIZE + (c.y - 1)])
  if (first_x == -1) {
    first_x = c.x;
    first_y = c.y;
  } else if (second_x == -1) {
    second_x = c.x;
    second_y = c.y;
    can_interact = false;
    if (board[first_x * BOARD_Y_SIZE + (first_y - 1)] == board[second_x * BOARD_Y_SIZE + (second_y - 1)]) {
      score++;
      can_restart = true;
    }
  }
})



afterInput(() => {
  if (level == 1) {
    level = 0;
    clearText();
    setMap(levels[level]);
    
    addSprite(0, 1, cursor);
  }
  if (level == 0) {
    addText(score.toString(), {x: 11 - score.toString().length, y: 2, color: color`2`});
    if (second_x != -1) {
      if (should_reset === 0) {
        should_reset = 1;
        return;
      }
      if (should_reset === 2) {
        if (board[first_x * BOARD_Y_SIZE + (first_y - 1)] != board[second_x * BOARD_Y_SIZE + (second_y - 1)]) {
            set_card(first_x, first_y, question_mark);
            set_card(second_x, second_y, question_mark);
        }
        first_x = -1;
        first_y = -1;
        second_x = -1;
        second_y = -1;
        should_reset = 0;
        can_interact = true;
        if (can_restart && (score % 8 === 0)) {
          can_restart = false;
          restart_board();
          setMap(levels[level]);
          addSprite(0, 1, cursor);
        }
      } else if (board[first_x * BOARD_Y_SIZE + (first_y - 1)] == board[second_x * BOARD_Y_SIZE + (second_y - 1)]) {
        set_card(first_x, first_y, correct);
        set_card(second_x, second_y, correct);
        playTune(correctTune);
        should_reset = 2;
      } else {
        set_card(first_x, first_y, invalid);
        set_card(second_x, second_y, invalid);
        playTune(invalidTune);
        should_reset = 2;
      }
    }
  }
})
