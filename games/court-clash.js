/* Stage 2: adds a fractional-position ball, serve, basic returns, wall
   bounces, and an OUT rally loop. dx/dy were NOT used as settable velocities. */
const player = "p";
const opponent = "o";
const court = "c";
const net = "n";
const ball = "b";
const PLAYER_MIN_Y = 5;
const PLAYER_MAX_Y = 7;
const OPPONENT_MIN_Y = 0;
const OPPONENT_MAX_Y = 3;
const COURT_MIN_X = 0;
const COURT_MAX_X = 9;

setLegend(
  [player, bitmap`
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
  [opponent, bitmap`
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
  [ball, bitmap`
................
................
................
................
......444.......
.....44444......
....4444444.....
....4444444.....
.....44444......
......444.......
................
................
................
................
................
................`],
  [court, bitmap`
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
  [net, bitmap`
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
1111111111111111`]
);

setBackground(court);
const level = map`
cccccccccc
ccccoccccc
cccccccccc
cccccccccc
nnnnnnnnnn
ccccpccccc
cccccccccc
cccccccccc`;
setMap(level);

// x/y are fractional physics coordinates; the sprite receives rounded values.
const ballState = { inPlay: false, x: 0, y: 0, vx: 0, vy: 0 };

function serveBall() {
  if (ballState.inPlay) return;
  const playerSprite = getFirst(player);
  if (!playerSprite) return;
  ballState.x = playerSprite.x;
  ballState.y = PLAYER_MIN_Y - 0.5;
  addSprite(Math.round(ballState.x), Math.round(ballState.y), ball);
  ballState.inPlay = true;
  ballState.vx = 0;
  ballState.vy = -0.2;
}

function finishRally() {
  const ballSprite = getFirst(ball);
  if (ballSprite) ballSprite.remove();
  ballState.inPlay = false;
  addText("OUT", { x: 4, y: 3, color: color`3` });
  setTimeout(() => clearText(), 1000);
}

// Move the ball, bounce off side walls, then end the rally past a baseline.
function updateBall() {
  if (!ballState.inPlay) return;
  const ballSprite = getFirst(ball);
  if (!ballSprite) {
    ballState.inPlay = false;
    return;
  }

  // Calculate from fractional state so sprite coordinates stay integer-safe.
  let nextX = ballState.x + ballState.vx;
  const nextY = ballState.y + ballState.vy;

  // Bounce off side walls while keeping x inside the playable grid.
  if (nextX < COURT_MIN_X) {
    nextX = COURT_MIN_X;
    ballState.vx = -ballState.vx;
  } else if (nextX > COURT_MAX_X) {
    nextX = COURT_MAX_X;
    ballState.vx = -ballState.vx;
  }

  // End the rally before Sprig receives a y value outside the map.
  if (nextY < OPPONENT_MIN_Y || nextY > PLAYER_MAX_Y) {
    finishRally();
    return;
  }

  ballState.x = nextX;
  ballState.y = nextY;
  ballSprite.x = Math.round(ballState.x);
  ballSprite.y = Math.round(ballState.y);
}

// 75 ms keeps fractional movement smooth without adding a busy loop.
const ballTick = setInterval(updateBall, 75);

function movePlayer(dx, dy) {
  const sprite = getFirst(player);
  if (!sprite) return;
  sprite.x = Math.max(COURT_MIN_X, Math.min(COURT_MAX_X, sprite.x + dx));
  sprite.y = Math.max(PLAYER_MIN_Y, Math.min(PLAYER_MAX_Y, sprite.y + dy));
}

onInput("w", () => movePlayer(0, -1));
onInput("a", () => movePlayer(-1, 0));
onInput("s", () => movePlayer(0, 1));
onInput("d", () => movePlayer(1, 0));

onInput("k", () => {
  if (!ballState.inPlay) {
    serveBall();
    return;
  }
  const playerSprite = getFirst(player);
  const ballSprite = getFirst(ball);
  if (playerSprite && ballSprite &&
      Math.abs(ballState.x - playerSprite.x) <= 1.5 &&
      Math.abs(ballState.y - playerSprite.y) <= 1.5) {
    ballState.vy = -ballState.vy;
  }
});

// Assumption to verify: setInterval needs no separate Sprig lifecycle cleanup.
