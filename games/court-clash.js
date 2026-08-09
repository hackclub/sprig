/* Stage 4: adds a single hardcoded AI opponent that reacts to incoming shots,
   tracks the ball along the x-axis, and returns it with topspin when its
   accuracy check succeeds. Stages 0-3 still provide movement, wall bounces,
   baseline OUT detection, four shot trajectories, fake ball height, and a
   shadow for lob visuals. dx/dy were NOT used as settable velocities. */

const player = "p";
const opponent = "o";
const court = "c";
const net = "n";
const ball = "b";
const shadow = "h";
const PLAYER_MIN_Y = 5;
const PLAYER_MAX_Y = 7;
const OPPONENT_MIN_Y = 0;
const OPPONENT_MAX_Y = 3;
const COURT_MIN_X = 0;
const COURT_MAX_X = 9;

// Stage 4 uses one hardcoded difficulty; the menu belongs to Stage 6.
const AI_REACTION_DELAY_TICKS = 6; // 6 * 75 ms = 450 ms before the AI moves.
const AI_MOVE_SPEED = 0.2; // Fractional x movement per 75 ms tick.
const AI_ACCURACY = 0.8; // 80% chance to return a ball that reaches the AI.
const TOPSPIN_VY = -0.4; // Exact topspin vy used by player input "i".

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
  [shadow, bitmap`
................
................
................
................
................
................
................
.....666666.....
....66666666....
.....666666.....
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
// Lob values are tuned for about 24 ticks of rise-and-fall.
const LOB_INITIAL_VHEIGHT = 0.2;
const HEIGHT_GRAVITY = 0.02;
const HIGH_BALL_THRESHOLD = 1;
const ballState = {
  inPlay: false,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  height: 0,
  vHeight: 0
};

const aiState = {
  reactionTicksRemaining: 0,
  isReacting: false,
  accuracyRolled: false,
  wasMovingTowardOpponent: false
};

const opponentState = {
  x: null
};

function resetAIForIncomingShot() {
  aiState.reactionTicksRemaining = AI_REACTION_DELAY_TICKS;
  aiState.isReacting = true;
  aiState.accuracyRolled = false;
  aiState.wasMovingTowardOpponent = true;
}

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
  ballState.height = 0;
  ballState.vHeight = 0;
  resetAIForIncomingShot();
}

function finishRally() {
  const ballSprite = getFirst(ball);
  const shadowSprite = getFirst(shadow);
  if (ballSprite) ballSprite.remove();
  if (shadowSprite) shadowSprite.remove();
  ballState.inPlay = false;
  ballState.height = 0;
  ballState.vHeight = 0;
  aiState.reactionTicksRemaining = 0;
  aiState.isReacting = false;
  aiState.accuracyRolled = false;
  aiState.wasMovingTowardOpponent = false;
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

  // Apply gravity first, then keep fake height at or above the ground.
  ballState.vHeight -= HEIGHT_GRAVITY;
  ballState.height = Math.max(0, ballState.height + ballState.vHeight);
  if (ballState.height === 0) ballState.vHeight = 0;

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

  // Show one grounded shadow only while the ball is visibly elevated.
  const shadowSprite = getFirst(shadow);
  if (ballState.height > 0.3) {
    const shadowX = Math.round(ballState.x);
    // Keep the one-tile-below shadow inside Sprig's 8-row map.
    const shadowY = Math.min(PLAYER_MAX_Y, Math.round(ballState.y) + 1);
    if (shadowSprite) {
      shadowSprite.x = shadowX;
      shadowSprite.y = shadowY;
    } else {
      addSprite(shadowX, shadowY, shadow);
    }
  } else if (shadowSprite) {
    shadowSprite.remove();
  }

  updateOpponentAI();
}

function updateOpponentAI() {
  if (!ballState.inPlay) return;

  // Negative vy is the existing convention for travel toward the opponent.
  if (ballState.vy >= 0) {
    aiState.wasMovingTowardOpponent = false;
    aiState.isReacting = false;
    aiState.reactionTicksRemaining = 0;
    return;
  }

  // This also catches a direction flip that was not caused by a player input.
  if (!aiState.wasMovingTowardOpponent) {
    resetAIForIncomingShot();
  }

  if (aiState.isReacting) {
    if (aiState.reactionTicksRemaining > 1) {
      aiState.reactionTicksRemaining -= 1;
      return;
    }
    aiState.reactionTicksRemaining = 0;
    aiState.isReacting = false;
  }

  const opponentSprite = getFirst(opponent);
  if (!opponentSprite) return;
  if (opponentState.x === null) opponentState.x = opponentSprite.x;

  const distanceX = ballState.x - opponentState.x;
  const movementX = Math.max(-AI_MOVE_SPEED, Math.min(AI_MOVE_SPEED, distanceX));
  opponentState.x = Math.max(
    COURT_MIN_X,
    Math.min(COURT_MAX_X, opponentState.x + movementX)
  );
  opponentSprite.x = Math.round(opponentState.x);

  if (!aiState.accuracyRolled && isBallInRangeOf(opponentSprite)) {
    aiState.accuracyRolled = true;
    if (Math.random() < AI_ACCURACY) {
      // Use the player's exact topspin speed, reversed so the return travels
      // back toward the player instead of immediately back toward the AI.
      ballState.vy = -TOPSPIN_VY;
      ballState.height = 0;
      ballState.vHeight = 0;
      aiState.wasMovingTowardOpponent = false;
      aiState.isReacting = false;
      aiState.reactionTicksRemaining = 0;
    }
  }
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

function isBallInRangeOf(sprite) {
  const ballSprite = getFirst(ball);
  return !!(sprite && ballSprite &&
    Math.abs(ballState.x - sprite.x) <= 1.5 &&
    Math.abs(ballState.y - sprite.y) <= 1.5);
}

function isBallInRange() {
  return isBallInRangeOf(getFirst(player));
}

onInput("i", () => {
  if (!ballState.inPlay || !isBallInRange()) return;
  ballState.vy = -0.4;
  ballState.height = 0;
  ballState.vHeight = 0;
  resetAIForIncomingShot();
});

onInput("j", () => {
  if (!ballState.inPlay || !isBallInRange()) return;
  ballState.vy = -0.14;
  ballState.vx += Math.random() * 0.1 - 0.05;
  ballState.height = 0;
  ballState.vHeight = 0;
  resetAIForIncomingShot();
});

onInput("l", () => {
  if (!ballState.inPlay || !isBallInRange()) return;
  ballState.vy = -0.14;
  ballState.height = 0;
  ballState.vHeight = LOB_INITIAL_VHEIGHT;
  resetAIForIncomingShot();
});

onInput("k", () => {
  if (!ballState.inPlay) {
    serveBall();
    return;
  }
  if (!isBallInRange() || ballState.height <= HIGH_BALL_THRESHOLD) return;
  ballState.vy = -0.5;
  ballState.height = 0;
  ballState.vHeight = 0;
  resetAIForIncomingShot();
});

// Assumptions to verify: setInterval needs no separate Sprig lifecycle cleanup;
// clamping a bottom-edge shadow to row 7 is preferable to placing it off-map.
// Tuning: topspin -0.4, slice/lob -0.14, smash -0.5, lob vHeight 0.2,
// gravity 0.02, and smash threshold height > 1.
// Stage 4 AI tuning: AI_REACTION_DELAY_TICKS = 6, AI_MOVE_SPEED = 0.2,
// AI_ACCURACY = 0.8, for a 450 ms reaction delay at the 75 ms tick rate.
// dx/dy remain read-only and are never assigned as velocities.
