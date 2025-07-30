/*
"Tris" game using pseudo-triminos (3-block shapes, that can be connected by corners). Move (A/D), soft drop (S), rotate (W), hard drop (j), and restart (I).
*/

const blockMoveSpeed = 0.6;

const border = "@"
const blue = "b"
const red = "r"
const green = "g"
const yellow = "y"
const pink = "p"
const orange = "l"
const bg = "t"

setLegend(
  [border, bitmap`
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
  [blue, bitmap`
5555555555555555
5577777777777755
5577777777777755
5577777777777755
5577777777777755
5577777777777755
5577777777777755
5555555555777755
5555555555577755
5555555555557755
5555555555555755
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [red, bitmap`
CCCCCCCCCCCCCCCC
CC333333333333CC
CC333333333333CC
CC333333333333CC
CC333333333333CC
CC333333333333CC
CC333333333333CC
CCCCCCCCCC3333CC
CCCCCCCCCCC333CC
CCCCCCCCCCCC33CC
CCCCCCCCCCCCC3CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [green, bitmap`
DDDDDDDDDDDDDDDD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DDDDDDDDDD4444DD
DDDDDDDDDDD444DD
DDDDDDDDDDDD44DD
DDDDDDDDDDDDD4DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [pink, bitmap`
HHHHHHHHHHHHHHHH
HH888888888888HH
HH888888888888HH
HH888888888888HH
HH888888888888HH
HH888888888888HH
HH888888888888HH
HHHHHHHHHH8888HH
HHHHHHHHHHH888HH
HHHHHHHHHHHH88HH
HHHHHHHHHHHHH8HH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [orange, bitmap`
9999999999999999
99FFFFFFFFFFFF99
99FFFFFFFFFFFF99
99FFFFFFFFFFFF99
99FFFFFFFFFFFF99
99FFFFFFFFFFFF99
99FFFFFFFFFFFF99
9999999999FFFF99
99999999999FFF99
999999999999FF99
9999999999999F99
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [bg, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
1666666666666666
6166666666666661
1616666666666616
6161666666666161
1616166666661616
6161616666616161
1616161616161616
6161616161616161
1616161616161616
6161616161616161`]
)

let trisShapes = [
  // straight
  [ [0,0,blue], [1,0,blue], [2,0,blue] ],
  // L
  [ [0,0,red], [1,0,red], [1,1,red] ],
  // N
  [ [0,1,green], [1,0,green], [2,0,green] ],
  // N2
  [ [0,0,green], [1,0,green], [2,1,green] ],
  // M
  [ [0,1,pink], [1,0,pink], [2,1,pink] ],
  // X
  [ [0,0,orange], [1,1,orange], [2,2,orange] ],
]

const tetrisTheme = tune`
201.34228187919464: E5/201.34228187919464,
201.34228187919464,
201.34228187919464: B4/201.34228187919464,
201.34228187919464: C5/201.34228187919464,
201.34228187919464: D5/201.34228187919464,
201.34228187919464,
201.34228187919464: C5/201.34228187919464,
201.34228187919464: B4/201.34228187919464,
201.34228187919464: A4/201.34228187919464,
201.34228187919464,
201.34228187919464: A4/201.34228187919464,
201.34228187919464: C5/201.34228187919464,
201.34228187919464: E5/201.34228187919464,
201.34228187919464,
201.34228187919464: D5/201.34228187919464,
201.34228187919464: C5/201.34228187919464,
201.34228187919464: B4/201.34228187919464,
201.34228187919464,
201.34228187919464: B4/201.34228187919464,
201.34228187919464: C5/201.34228187919464,
201.34228187919464: D5/201.34228187919464,
201.34228187919464,
201.34228187919464: E5/201.34228187919464,
201.34228187919464,
201.34228187919464: C5/201.34228187919464,
201.34228187919464,
201.34228187919464: A4/201.34228187919464,
201.34228187919464,
201.34228187919464: A4/201.34228187919464,
604.026845637584`;
const tetrisThemeLow = tune`
201.34228187919464: E4^201.34228187919464,
201.34228187919464: E5^201.34228187919464,
201.34228187919464: E4^201.34228187919464,
201.34228187919464: E5^201.34228187919464,
201.34228187919464: E4^201.34228187919464,
201.34228187919464: E5^201.34228187919464,
201.34228187919464: E4^201.34228187919464,
201.34228187919464: E5^201.34228187919464,
201.34228187919464: A4^201.34228187919464,
201.34228187919464: A5^201.34228187919464,
201.34228187919464: A4^201.34228187919464,
201.34228187919464: A5^201.34228187919464,
201.34228187919464: A4^201.34228187919464,
201.34228187919464: A5^201.34228187919464,
201.34228187919464: A4^201.34228187919464,
201.34228187919464: A5^201.34228187919464,
201.34228187919464: D4^201.34228187919464,
201.34228187919464: D5^201.34228187919464,
201.34228187919464: D4^201.34228187919464,
201.34228187919464: D5^201.34228187919464,
201.34228187919464: D4^201.34228187919464,
201.34228187919464: D5^201.34228187919464,
201.34228187919464: D4^201.34228187919464,
201.34228187919464: D5^201.34228187919464,
201.34228187919464: D4^201.34228187919464,
201.34228187919464: D5^201.34228187919464,
201.34228187919464: D4^201.34228187919464,
201.34228187919464: E5^201.34228187919464,
201.34228187919464: D4^201.34228187919464,
201.34228187919464: E5^201.34228187919464,
201.34228187919464: D4^201.34228187919464,
201.34228187919464: E5^201.34228187919464`;

playTune(tetrisTheme, Infinity);
playTune(tetrisThemeLow, Infinity);

let mapString = map`
@@@@@@@@@@@@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@@@@@@@@@@@@`

let locked = [];
let score = 0;
let isGameOver = false;

let curr = { shape: 0, rot: 0, x: 5, y: 1 };

function randomTri() {
  return Math.floor(Math.random() * trisShapes.length);
}

function getTriminoOffsets(shape, rot) {
  // rotations
  let cells = trisShapes[shape];
  let out = [];
  for (let [x, y, col] of cells) {
    let rx = x, ry = y;
    if (rot === 1) { [rx, ry] = [ -ry,  rx ]; }
    if (rot === 2) { [rx, ry] = [ -rx, -ry ]; }
    if (rot === 3) { [rx, ry] = [  ry, -rx ]; }
    out.push([rx, ry, col]);
  }
  return out;
}

function canPlace(x, y, shape, rot) {
  for (let [dx, dy] of getTriminoOffsets(shape, rot)) {
    let nx = x + dx;
    let ny = y + dy;
    if (getTile(nx, ny).some(t => t.type === border)) return false;
    if (locked.some(l => l[0] === nx && l[1] === ny)) return false;
  }
  return true;
}

function draw() {
  setMap(mapString);
  setBackground(bg);
  clearText();
  // Draw locked
  for (let [x, y, c] of locked) addSprite(x, y, c);
  // Draw current
  for (let [dx, dy, c] of getTriminoOffsets(curr.shape, curr.rot)) {
    addSprite(curr.x + dx, curr.y + dy, c);
  }
  addText(`SCORE`, { x: 0, y: 1, color: color`4` });
  addText(score.toString().padStart(4, "0"), { x: 0, y: 2, color: color`1` });
  if (isGameOver) {
    addText("GAME", { x: 7, y: 6, color: color`3` });
    addText("OVER", { x: 7, y: 7, color: color`3` });
    addText("I=RESTART", { x: 5, y: 9, color: color`4` });
  }
}

function tryLockOrMoveDown() {
  if (canPlace(curr.x, curr.y + 1, curr.shape, curr.rot)) {
    curr.y++;
  } else {
    // Lock current
    for (let [dx, dy, c] of getTriminoOffsets(curr.shape, curr.rot)) {
      locked.push([curr.x + dx, curr.y + dy, c]);
    }
    // Clear lines
    let lines = [];
    for (let y = 1; y <= 15; y++) {
      let count = 0;
      for (let x = 1; x <= 10; x++) if (locked.some(l => l[0] === x && l[1] === y)) count++;
      if (count === 10) lines.push(y);
    }
    for (let y of lines) {
      locked = locked.filter(l => l[1] !== y);
      for (let l of locked) if (l[1] < y) l[1]++;
      score += 100;
    }
    // New piece
    curr.shape = randomTri();
    curr.rot = 0;
    curr.x = 5; curr.y = 1;
    if (!canPlace(curr.x, curr.y, curr.shape, curr.rot)) {
      isGameOver = true;
    }
  }
  draw();
}

function restartGame() {
  isGameOver = false;
  locked = [];
  curr = { shape: randomTri(), rot: 0, x: 5, y: 1 };
  score = 0;
  draw();
}


let tick = setInterval(() => { if (!isGameOver) tryLockOrMoveDown(); }, blockMoveSpeed * 1000);
restartGame();

// inputs
onInput("a", () => {
  if (isGameOver) return;
  if (canPlace(curr.x - 1, curr.y, curr.shape, curr.rot)) curr.x--;
  draw();
});
onInput("d", () => {
  if (isGameOver) return;
  if (canPlace(curr.x + 1, curr.y, curr.shape, curr.rot)) curr.x++;
  draw();
});
onInput("s", () => {
  if (isGameOver) return;
  tryLockOrMoveDown();
  score += 1
});
onInput("w", () => {
  if (isGameOver) return;
  let nr = (curr.rot + 1) % 4;
  if (canPlace(curr.x, curr.y, curr.shape, nr)) curr.rot = nr;
  draw();
});
onInput("j", () => {
  if (isGameOver) return;
  while (canPlace(curr.x, curr.y + 1, curr.shape, curr.rot)) curr.y++;
  tryLockOrMoveDown();
  score += 2
});
onInput("i", restartGame);

afterInput(draw);