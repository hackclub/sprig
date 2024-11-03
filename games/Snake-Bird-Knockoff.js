/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Snake Bird Knockoff
@author: CreativityShark
@tags: ['puzzle', 'platformer']
@addedOn: 2024-11-03
*/

class Move {
  constructor(x_change, y_change) {
    this.x_change = x_change;
    this.y_change = y_change;
  }

  move(sprite) {
    sprite.x += this.x_change;
    sprite.y += this.y_change;
  }

  copy() {
    return new Move(this.x_change, this.y_change);
  }
}

const bird = "b"
const snake = "s"
const apple = "a"
const ground = "d"
const grass = "g"
const sky = "k"
const cloud = "c"
const spike = "q"
const portal = "p"

const eat_sfx = tune`
50.08347245409015,
50.08347245409015: E4/50.08347245409015 + F4/50.08347245409015,
50.08347245409015: A4/50.08347245409015 + B4/50.08347245409015,
50.08347245409015: D5/50.08347245409015,
50.08347245409015: E5/50.08347245409015,
50.08347245409015: F5/50.08347245409015,
50.08347245409015: B4/50.08347245409015 + C5/50.08347245409015 + D5/50.08347245409015 + E5/50.08347245409015 + F5/50.08347245409015,
50.08347245409015: B4/50.08347245409015 + C5/50.08347245409015 + D5/50.08347245409015 + E5/50.08347245409015 + F5/50.08347245409015,
200.3338898163606,
50.08347245409015: E5~50.08347245409015,
50.08347245409015: C5~50.08347245409015,
50.08347245409015: D5~50.08347245409015,
50.08347245409015: A4~50.08347245409015,
50.08347245409015: F4^50.08347245409015 + E4~50.08347245409015,
50.08347245409015,
50.08347245409015: E5~50.08347245409015,
50.08347245409015: C5~50.08347245409015,
50.08347245409015: D5~50.08347245409015,
50.08347245409015: A4~50.08347245409015,
50.08347245409015: F4^50.08347245409015 + E4~50.08347245409015,
150.25041736227044,
50.08347245409015: E5~50.08347245409015,
50.08347245409015: C5~50.08347245409015,
50.08347245409015: D5~50.08347245409015,
50.08347245409015: A4~50.08347245409015,
50.08347245409015,
50.08347245409015: E4^50.08347245409015 + D4~50.08347245409015`
const move_sfx = tune`
150.7537688442211,
150.7537688442211: F5/150.7537688442211,
4522.613065326633`
const death_sfx = tune`
60: E5~60 + F5~60 + G5~60 + A5~60 + B5~60,
60: E5~60 + F5~60 + G5~60 + A5~60 + B5~60,
60: G4^60 + A4^60 + B4-60,
60: E4^60 + F4^60 + G4-60,
60: C4^60 + D4^60 + E4-60,
60: E4^60 + F4^60 + G4-60,
60: C4^60 + D4^60 + E4-60,
60: E4^60 + F4^60,
60: C4^60 + D4^60,
60: E4^60 + F4^60,
60: C4^60 + D4^60,
60: F4^60 + E4^60,
60: D4^60 + C4^60,
1140`
const portal_sfx = tune`
150,
150: E5-150 + C5-150,
150: A4/150 + C5/150,
150: D5-150 + B4-150,
150: G4/150 + B4/150,
150: A4-150 + C5-150,
150: F4/150 + A4/150,
150: A5/150 + F5/150 + C5-150,
150: A5/150,
3450`

setLegend(
  [ bird, bitmap`
L00000000000000L
0399999993399930
0999999999399990
0999993393999990
0999999933999990
0999999999999990
0990033333300990
0390033333300930
0330133993301330
0330039999300330
0330036666300330
0399366666639930
0333336666333330
0333333663333330
0333333333333330
L00000000000000L` ],
  [ snake, bitmap`
L000000000000000L
09999999999999990
09999999999393990
09939399999933990
09993399999999990
09999999999999990
09999999939399990
09999999993399990
03999999999999930
03333333333333330
03333333333333330
03333939333333330
03333399333393930
03333333333339930
03333333333333330
L000000000000000L`],
  [ apple, bitmap`
.........00.....
........0C1.....
....L000C00L....
...0469DC9660...
..066666666660..
..066666666660..
..0F6666664460..
..0F66666464F0..
..0F4666444DD0..
..0DD44444DDD0..
..0DDD44DDDDD0..
...0DDDDDDDD40..
...0DDDDDDDDF...
....0D4LLDD4L...
.....00.L00L....
................`],
  [ ground, bitmap`
L00000000000000L
0CCCCCCCC11CCCC0
0CCCFCCCC11CCCC0
0CCCCCCCCLLCCCC0
0CCCCCCCCCCCCCC0
0CC1CCCCCCCCCCC0
0CCCCCCFCCCCCFC0
0CCCCCCCCCCCCCC0
0FCCCCCCCCC11CC0
0CCCCCCCCCC11CC0
0CC11LCCCCCLLCC0
0C1121CCCCCCCCC0
0C1111CCCCCCCCC0
0CL11LCCCCFCCCC0
0CCLLLCCCCCCCCC0
L00000000000000L`],
  [ grass, bitmap`
L00000000000000L
0444444444444440
0D44DD44DD44DD40
0DDLDDDLDDDLDDD0
0LDLDLDLDLDLDLD0
0LL1LLLLLLLLLLL0
0CLCLCLFLCLCLCL0
0CCCCCCCCCCCCCC0
0FCCCCCCCCC11CC0
0CCCCCCCCCC11CC0
0CC11LCCCCCCCCC0
0C1121CCCCCCCCC0
0C1111CCCCCCCCC0
0CL11LCCCFCCCCC0
0CCLLLCCCCCCCCC0
L00000000000000L`],
  [ sky, bitmap`
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
  [ cloud, bitmap`
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
  [ spike, bitmap`
00.....00.....00
0200..L21L..0020
.0220.0210.0220.
.0L110L21L011L0.
..0LL1L11L1LL0..
...0LLL00LLL0...
.L022102101220L.
0221102211011220
0LLLL011LL0LLLL0
.L0LLL01L0LLL0L.
...021L00L120...
..021LL11LL120..
.02LL0L21L0LL20.
.0LL0.0210.0LL0.
0L00..L21L..00L0
00.....00.....00`],
  [ portal, bitmap`
....00000..00L..
....088H5008H0..
L00008888788H0..
0HH57288H78H50..
088H8728H7887000
.0888H72H8H72880
.07778H2HH728880
058HHHH2222888H0
0H8882222HHHH850
088827HH2H87770.
08827H8H27H8880.
0007887H8278H880
..05H87H88275HH0
..0H88788880000L
..0H8005H880....
..L00..00000....`]
)

let level = 0
const levels = [
  map`
c.........
ccc.......
.......ccc
......cccc
..........
..........
..........
.ssb....p.
gggggggggg
dddddddddd`,
  map`
....cc....
..cccc....
.........c
........cc
.a......p.
gg........
ddg.......
.ssb......
gggggggggg
dddddddddd`,
  map`
.gg....cc.
.dd...cccc
c.d.......
ccda....p.
..........
ssb.......
ggg.......
ddd.....a.
dddqgggggg
dddgdddddd`,
  map`
.cc.......
cccc......
........cc
.ssba.cccc
.gggg.....
.a........
..ddd.....
........p.
........g.
qqqqqqqqdq`,
  map`
........c.
......cccc
.cc.......
.cccc.....
..........
..........
..........
..........
..........
gggggggggg`,
]

setMap(levels[level])

setBackground(sky)

var bird_snake = [getFirst(bird), getAll(snake)[1], getFirst(snake)]
// Last item of moves is always the most recent move performed, not a move to be performed
var moves = [new Move(1, 0), new Move(1, 0), new Move(0, 0)]

function moveBirdSnake() {
  for (var i = 0; i < bird_snake.length; i++) {
    let sprite = bird_snake[i];
    moves[i].move(sprite);
  }
  playTune(move_sfx);
}

function canMove(x, y) {
  if (x < 0 || x >= width() || y < 0 || y >= height()) {
    return false;
  }
  for (var sprite of getTile(x, y)) {
    if (sprite.type == "b" || sprite.type == "s" || sprite.type == "g" || sprite.type == "d") {
      return false;
    }
  }
  return true;
}

function canFallInto(x, y) {
  if (y >= height()) {
    return false;
  }
  for (var sprite of getTile(x, y)) {
    if (sprite.type == "g" || sprite.type == "d") {
      return false;
    }
  }
  return true;
}

// Returns [-1, -1] when no valid pos is found.
function checkAdjacent(x, y) {
  if (canMove(x - 1, y)) {
    return [x - 1, y];
  } else if (canMove(x, y - 1)) {
    return [x, y - 1];
  } else if (canMove(x + 1, y)) {
    return [x + 1, y];
  } else if (canMove(x, y + 1)) {
    return [x, y + 1];
  }
  return [-1, -1];
}

function birdSnakeIsFloating() {
  let floating = true;
  for (var segment of bird_snake) {
    if (!canFallInto(segment.x, segment.y + 1)) {
      floating = false;
    }
  }
  return floating;
}

function addSegment() {
  let last = bird_snake.length - 1;
  let segment = bird_snake[last];
  let x = segment.x;
  let y = segment.y;
  let behind = [x + moves[last].x_change * -1, y + moves[last].y_change * -1];
  
  if (canMove(behind[0], behind[1])) {
    x = behind[0];
    y = behind[1];
    moves.push(moves[last].copy());
  } else {
    let other_pos = checkAdjacent(x, y);
    if (other_pos[0] != -1 && other_pos[0] != -1) {
      x = other_pos[0];
      y = other_pos[1];
      // Broken code, pls fix future me
      moves.push(moves[last].copy());
      moves[last - 1] = new Move(x - segment.x, y - segment.y);
    } else {
      console.log("return!");
      return;
    }
  }
  
  addSprite(x, y, snake);
  bird_snake.push(getAll(snake)[getAll(snake).length - 1]);
}

// Call after changing level
// Assumes snake is 3 long, straight, and facing right
function resetBirdSnake() {
  setMap(levels[level]);
  bird_snake = [getFirst(bird), getAll(snake)[1], getFirst(snake)];
  moves = [new Move(1, 0), new Move(1, 0), new Move(0, 0)];
}

onInput("w", () => {
  if (!canMove(bird_snake[0].x, bird_snake[0].y - 1)) {
    return;
  }
  moves.unshift(new Move(0, -1));
  moves.pop();
  moveBirdSnake();
})
onInput("a", () => {
  if (!canMove(bird_snake[0].x - 1, bird_snake[0].y)) {
    return;
  }
  moves.unshift(new Move(-1, 0));
  moves.pop();
  moveBirdSnake();
})
onInput("s", () => {
  if (!canMove(bird_snake[0].x, bird_snake[0].y + 1)) {
    return;
  }
  moves.unshift(new Move(0, 1));
  moves.pop();
  moveBirdSnake();
})
onInput("d", () => {
  if (!canMove(bird_snake[0].x + 1, bird_snake[0].y)) {
    return;
  }
  moves.unshift(new Move(1, 0));
  moves.pop();
  moveBirdSnake();
})

afterInput(() => {
  let birdy = bird_snake[0];
  
  while (birdSnakeIsFloating()) {
    for (var i = bird_snake.length - 1; i >= 0; i--) {
      bird_snake[i].y += 1;
    }
  }

  for (var segment of bird_snake) {
    for (var sprite of getTile(segment.x, segment.y)) {
      if (sprite.type == "q") {
        resetBirdSnake();
        playTune(death_sfx);
      }
    }
  }
  
  for (var sprite of getTile(birdy.x, birdy.y)) {
    if (sprite.type == "a") {
      addSegment();
      sprite.remove();
      playTune(eat_sfx);
    }
    if (sprite.type == "p") {
        level++;
        resetBirdSnake();
        playTune(portal_sfx);
      }
  }

  if (level == 4) {
    addText("You Win!", {
      x: 6,
      y: 8,
      color: color`2`
    })
  }
})
