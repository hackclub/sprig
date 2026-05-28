/*
@title: Sprig Mini Golf
@author: Mini Golfer
@tags: ["strategy", "2d"]
@description: Move your club with WASD. Align next to the ball and press I to swing!
*/

// --- 1. SPRITES ---
const wall = "w";
const grass = "g";
const hole = "H";
const ball = "B";
const putter = "P";

setLegend(
  [wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],

  [grass, bitmap`
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

  [hole, bitmap`
4444444444444444
4444400000444444
4440000000004444
4400000000000444
4000000000000044
4000000000000044
0000000000000004
0000000000000004
0000000000000004
0000000000000004
4000000000000044
4000000000000044
4400000000000444
4440000000004444
4444400000444444
4444444444444444`],

  [ball, bitmap`
4444444444444444
4444442222444444
4444222222224444
4442222222222444
4422222222222244
4422222222222244
4222222222222224
4222222222222224
4222222222222224
4222222222222224
4422222222222244
4422222222222244
4442222222222444
4444222222224444
4444442222444444
4444444444444444`],

  [putter, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444666666664444
4444666666664444
4444446644444444
4444446644444444
4444446644444444
4444446644444444
4444446644444444
4444446644444444
4444446644444444
4444446644444444
4444446644444444
4444446644444444
4444444444444444`]
);

setSolids([wall]);

setBackground(grass);

// --- 2. MAP ---
const level = map`
wwwwwwwwwwwwwwww
wggggggggggggggw
wgggggggHggggggw
wggggggggggggggw
wggggggggggggggw
wggggggggggggggw
wggggggggggggggw
wggggggggggggggw
wggggggggggggggw
wggggggggggggggw
wwwwwwwwwwwwwwww
`;

setMap(level);

// --- 3. GAME STATE ---
let hits = 0;
let gameOver = false;

let ballSprite = addSprite(8, 7, ball);
let putterSprite = addSprite(8, 9, putter);

let lastDx = 0;
let lastDy = -1;

// --- 4. UI ---
function updateUI() {
  clearText();
  if (gameOver) {
    addText("GOAL! YOU WIN!", { x: 1, y: 4, color: color`3` });
    addText("Hits: " + hits, { x: 5, y: 6, color: color`2` });
  } else {
    addText("Hits: " + hits, { x: 1, y: 0, color: color`2` });
  }
}
updateUI();

// --- 5. MOVEMENT ---
function movePutter(dx, dy) {
  if (gameOver) return;

  let targetX = putterSprite.x + dx;
  let targetY = putterSprite.y + dy;

  if (targetX < 0 || targetY < 0 || targetX >= width() || targetY >= height()) return;
  if (getTile(targetX, targetY).some(s => s.type === wall)) return;

  lastDx = dx;
  lastDy = dy;

  putterSprite.x = targetX;
  putterSprite.y = targetY;
}

onInput("w", () => movePutter(0, -1));
onInput("s", () => movePutter(0, 1));
onInput("a", () => movePutter(-1, 0));
onInput("d", () => movePutter(1, 0));

// --- 6. SWING / BALL MOVEMENT ---
onInput("i", () => {
  if (gameOver) return;

  let checkX = putterSprite.x + lastDx;
  let checkY = putterSprite.y + lastDy;

  if (ballSprite.x === checkX && ballSprite.y === checkY) {
    hits++;
    updateUI();
    animateBallDrive(lastDx, lastDy);
  }
});

function animateBallDrive(dx, dy) {
  let nextX = ballSprite.x + dx;
  let nextY = ballSprite.y + dy;

  if (nextX < 0 || nextY < 0 || nextX >= width() || nextY >= height()) return;

  if (getTile(nextX, nextY).some(s => s.type === wall)) {
    return;
  }

  ballSprite.x = nextX;
  ballSprite.y = nextY;

  if (getTile(ballSprite.x, ballSprite.y).some(s => s.type === hole)) {
    gameOver = true;
    updateUI();
    return;
  }

  setTimeout(() => {
    animateBallDrive(dx, dy);
  }, 100);
}