/*
@title: Court Clash
@author: Sai Konchada
@description: A 2D tennis game with parody pro players, adjustable AI difficulty, and real tennis scoring.
@tags: ['sports', 'tennis', 'ai']
@addedOn: 2026-08-10
*/

// LEGEND & ASSETS

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
const SINGLES_LEFT_X = 1;
const SINGLES_RIGHT_X = 8;
const SERVICE_LINE_OPPONENT_Y = 2;
const SERVICE_LINE_PLAYER_Y = 6;
const AIM_BUFFER_TICKS = 6; // 6 * 75 ms = a 450 ms directional-input window.
const AIM_VX = 0.15; // Horizontal velocity added by a buffered diagonal aim.
const HIT_BUFFER_TICKS = 3; // 3 * 75 ms = a 225 ms forgiving hit window.
const ROSTER = [
  {
    name: "Carlos Alcatraz",
    typeChar: "o",
    baseReactionDelayTicks: 6,
    baseMoveSpeed: 0.2,
    baseAccuracy: 0.8
  },
  {
    name: "Rafa Nadale",
    typeChar: "q",
    baseReactionDelayTicks: 8,
    baseMoveSpeed: 0.15,
    baseAccuracy: 0.9
  },
  {
    name: "Novak Djokopoulos",
    typeChar: "z",
    baseReactionDelayTicks: 4,
    baseMoveSpeed: 0.28,
    baseAccuracy: 0.85
  }
];

const DIFFICULTY_LEVELS = [
  {
    label: "Very Easy",
    reactionMultiplier: 1.6,
    moveSpeedMultiplier: 0.6,
    accuracyMultiplier: 0.7
  },
  {
    label: "Easy",
    reactionMultiplier: 1.3,
    moveSpeedMultiplier: 0.8,
    accuracyMultiplier: 0.85
  },
  {
    label: "Normal",
    reactionMultiplier: 1.0,
    moveSpeedMultiplier: 1.0,
    accuracyMultiplier: 1.0
  },
  {
    label: "Hard",
    reactionMultiplier: 0.75,
    moveSpeedMultiplier: 1.2,
    accuracyMultiplier: 1.1
  },
  {
    label: "Very Hard",
    reactionMultiplier: 0.5,
    moveSpeedMultiplier: 1.4,
    accuracyMultiplier: 1.2
  }
];

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
  ["q", bitmap`
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
  ["z", bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
  ["v", bitmap`
................
................
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
................
................`],
  ["u", bitmap`
................
................
................
................
................
................
................
7777777777777777
................
................
................
................
................
................
................
................`],
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
  ["g", bitmap`
................
................
................
................
......999.......
.....99999......
....9999999.....
....9999999.....
.....99999......
......999.......
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

// SOUND

// These are intentionally short one-shot cues to avoid overlapping long music.
const TUNE_HIT = tune`60: c5^50`;
const TUNE_POINT_LOST = tune`100: c4/80`;
const TUNE_WIN = tune`80: c5^60, 80: e5^60, 120: g5^100`;
const TUNE_LOSE = tune`80: g4/60, 80: e4/60, 120: c4/100`;

// COURT & MAPS

setBackground(court);
const level = map`
cvccccccvc
cvccocccvc
cvuuuuuuvc
cvccccccvc
nnnnnnnnnn
cvccpcccvc
cuuuuuuuuc
cvccccccvc`;
const menuMap = map`
cccccccccc
cccccccccc
cccccccccc
cccccccccc
cccccccccc
cccccccccc
cccccccccc
cccccccccc`;

// GAME STATE

// x/y are fractional physics coordinates; the sprite receives rounded values.
// Lob values are tuned for about 24 ticks of rise-and-fall.
const LOB_INITIAL_VHEIGHT = 0.2;
const HEIGHT_GRAVITY = 0.02;
const HIGH_BALL_THRESHOLD = 1;
const ballState = {
  inPlay: false,
  isServeInFlight: false,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  height: 0,
  vHeight: 0
};

const aimState = {
  direction: null,
  ticksRemaining: 0
};

const hitBufferState = {
  ticksRemaining: 0,
  pendingShot: null
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

const matchState = {
  playerPoints: 0,
  opponentPoints: 0,
  playerGames: 0,
  opponentGames: 0,
  matchOver: false,
  matchWinner: null
};

const rosterState = {
  selectedIndex: 0
};

// This selection intentionally persists when returning to the roster menu.
const difficultyState = {
  selectedIndex: 2
};

let gameStage = "ROSTER";

function getLiveBallSprite() {
  return getFirst(ball) || getFirst("g");
}

function clearHitBuffer() {
  hitBufferState.ticksRemaining = 0;
  hitBufferState.pendingShot = null;
}

function queueHitBuffer(shotType) {
  hitBufferState.ticksRemaining = HIT_BUFFER_TICKS;
  hitBufferState.pendingShot = shotType;
}

// SCORING LOGIC

function getPointDisplayString(winCount, otherWinCount) {
  if (winCount >= 4 && winCount - otherWinCount >= 2) return "Game";
  if (winCount >= 3 && otherWinCount >= 3) {
    if (winCount === otherWinCount) return "Deuce";
    if (winCount - otherWinCount === 1) return "Advantage";
  }
  return ["0", "15", "30", "40"][Math.min(winCount, 3)];
}

function updateScoreDisplay() {
  if (matchState.matchOver) return;
  const playerPoints = getPointDisplayString(
    matchState.playerPoints,
    matchState.opponentPoints
  );
  const opponentPoints = getPointDisplayString(
    matchState.opponentPoints,
    matchState.playerPoints
  );
  let pointText = "P: " + playerPoints + "-" + opponentPoints;
  if (playerPoints === "Deuce") {
    pointText = "Deuce";
  } else if (playerPoints === "Advantage") {
    pointText = "Ad You";
  } else if (opponentPoints === "Advantage") {
    pointText = "Ad Opp";
  }
  clearText();
  addText(pointText, { x: 0, y: 0, color: color`3` });
  addText(
    "G: " + matchState.playerGames + "-" + matchState.opponentGames,
    { x: 0, y: 1, color: color`3` }
  );
}

function checkSetWin() {
  let winner = null;
  if (matchState.playerGames >= 4 &&
      matchState.playerGames - matchState.opponentGames >= 2) {
    winner = "player";
  } else if (matchState.opponentGames >= 4 &&
             matchState.opponentGames - matchState.playerGames >= 2) {
    winner = "opponent";
  }
  if (!winner) return;

  matchState.matchOver = true;
  matchState.matchWinner = winner;
  gameStage = "GAME_OVER";
  const ballSprite = getLiveBallSprite();
  const shadowSprite = getFirst(shadow);
  if (ballSprite) ballSprite.remove();
  if (shadowSprite) shadowSprite.remove();
  ballState.inPlay = false;
  clearInterval(ballTick);
  playTune(winner === "player" ? TUNE_WIN : TUNE_LOSE);
  ballTick = null;
  clearText();
  const resultText = winner === "player" ? "You Win! " : "You Lose. ";
  addText(
    resultText + matchState.playerGames + "-" + matchState.opponentGames,
    { x: 0, y: 3, color: color`3` }
  );
}

function checkGameWin() {
  let winner = null;
  if (matchState.playerPoints >= 4 &&
      matchState.playerPoints - matchState.opponentPoints >= 2) {
    winner = "player";
  } else if (matchState.opponentPoints >= 4 &&
             matchState.opponentPoints - matchState.playerPoints >= 2) {
    winner = "opponent";
  }
  if (!winner) return;

  if (winner === "player") {
    matchState.playerGames += 1;
  } else {
    matchState.opponentGames += 1;
  }
  matchState.playerPoints = 0;
  matchState.opponentPoints = 0;
  checkSetWin();
}

function awardPoint(winner) {
  if (matchState.matchOver) return;
  if (winner === "player") {
    matchState.playerPoints += 1;
  } else if (winner === "opponent") {
    matchState.opponentPoints += 1;
  } else {
    return;
  }
  checkGameWin();
  if (!matchState.matchOver) updateScoreDisplay();
}

// MENU LOGIC

function renderRosterMenu() {
  clearText();
  ROSTER.forEach((entry, index) => {
    const cursor = index === rosterState.selectedIndex ? ">" : " ";
    addText(cursor + " " + entry.name, { x: 0, y: index, color: color`3` });
  });
  addText("w/s select  k ok", { x: 0, y: 4, color: color`3` });
}

function renderDifficultyMenu() {
  const difficulty = DIFFICULTY_LEVELS[difficultyState.selectedIndex];
  const filledSegments = "=".repeat(difficultyState.selectedIndex + 1);
  const emptySegments = "-".repeat(4 - difficultyState.selectedIndex);
  clearText();
  addText(ROSTER[rosterState.selectedIndex].name, {
    x: 0,
    y: 0,
    color: color`3`
  });
  addText(filledSegments + emptySegments, {
    x: 0,
    y: 2,
    color: color`3`
  });
  addText(difficulty.label, { x: 0, y: 3, color: color`3` });
  addText("a/d: adjust  k: start", { x: 0, y: 5, color: color`3` });
}

function enterRosterMenu() {
  if (ballTick) {
    clearInterval(ballTick);
    ballTick = null;
  }
  const ballSprite = getLiveBallSprite();
  const shadowSprite = getFirst(shadow);
  if (ballSprite) ballSprite.remove();
  if (shadowSprite) shadowSprite.remove();
  ballState.inPlay = false;
  setMap(menuMap);
  rosterState.selectedIndex = 0;
  gameStage = "ROSTER";
  renderRosterMenu();
}

function resetMatchState() {
  matchState.playerPoints = 0;
  matchState.opponentPoints = 0;
  matchState.playerGames = 0;
  matchState.opponentGames = 0;
  matchState.matchOver = false;
  matchState.matchWinner = null;
}

function resetBallState() {
  clearHitBuffer();
  ballState.inPlay = false;
  ballState.isServeInFlight = false;
  ballState.x = 0;
  ballState.y = 0;
  ballState.vx = 0;
  ballState.vy = 0;
  ballState.height = 0;
  ballState.vHeight = 0;
}

function resetAIState() {
  aiState.reactionTicksRemaining = 0;
  aiState.isReacting = false;
  aiState.accuracyRolled = false;
  aiState.wasMovingTowardOpponent = false;
}

function startMatch() {
  setMap(level);
  const opponentSprite = getFirst(opponent);
  if (opponentSprite) {
    opponentSprite.type = ROSTER[rosterState.selectedIndex].typeChar;
  }
  resetMatchState();
  resetBallState();
  resetAIState();
  opponentState.x = null;
  aimState.direction = null;
  aimState.ticksRemaining = 0;
  gameStage = "MATCH";
  if (ballTick) clearInterval(ballTick);
  ballTick = setInterval(updateBall, 75);
  clearText();
  updateScoreDisplay();
}

function confirmRosterSelection() {
  gameStage = "DIFFICULTY";
  renderDifficultyMenu();
}

// BALL PHYSICS & RALLY

function serveBall() {
  if (ballState.inPlay || matchState.matchOver) return;
  clearHitBuffer();
  aimState.direction = null;
  aimState.ticksRemaining = 0;
  const playerSprite = getFirst(player);
  if (!playerSprite) return;
  ballState.x = playerSprite.x;
  ballState.y = PLAYER_MAX_Y;
  addSprite(Math.round(ballState.x), Math.round(ballState.y), ball);
  ballState.inPlay = true;
  ballState.isServeInFlight = true;
  ballState.vx = 0;
  ballState.vy = -0.2;
  ballState.height = 0;
  ballState.vHeight = 0;
  resetAIForIncomingShot();
}

function finishRally(winner) {
  const ballSprite = getLiveBallSprite();
  const shadowSprite = getFirst(shadow);
  if (ballSprite) ballSprite.remove();
  if (shadowSprite) shadowSprite.remove();
  ballState.inPlay = false;
  ballState.isServeInFlight = false;
  ballState.height = 0;
  ballState.vHeight = 0;
  aimState.direction = null;
  aimState.ticksRemaining = 0;
  aiState.reactionTicksRemaining = 0;
  aiState.isReacting = false;
  aiState.accuracyRolled = false;
  aiState.wasMovingTowardOpponent = false;
  clearHitBuffer();
  if (winner === "opponent") playTune(TUNE_POINT_LOST);
  awardPoint(winner);
}

// Move the ball, bounce off side walls, then end the rally past a baseline.
function updateBall() {
  // Expire the most recent directional input even between active rallies.
  if (aimState.ticksRemaining > 0) {
    aimState.ticksRemaining -= 1;
    if (aimState.ticksRemaining === 0) aimState.direction = null;
  }
  if (hitBufferState.ticksRemaining > 0) {
    hitBufferState.ticksRemaining -= 1;
  }
  if (!ballState.inPlay) return;
  const ballSprite = getLiveBallSprite();
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

  // A serve faults immediately when it crosses the opponent service line
  // outside the singles width. Use the wall-clamped nextX for this crossing.
  const crossesOpponentServiceLine =
    ballState.y > SERVICE_LINE_OPPONENT_Y &&
    nextY <= SERVICE_LINE_OPPONENT_Y;
  if (ballState.isServeInFlight &&
      crossesOpponentServiceLine &&
      (nextX < SINGLES_LEFT_X || nextX > SINGLES_RIGHT_X)) {
    finishRally("opponent");
    return;
  }

  // End the rally before Sprig receives a y value outside the map.
  if (nextY < OPPONENT_MIN_Y) {
    finishRally("player");
    return;
  }
  if (nextY > PLAYER_MAX_Y) {
    finishRally("opponent");
    return;
  }

  ballState.x = nextX;
  ballState.y = nextY;
  ballSprite.x = Math.round(ballState.x);
  ballSprite.y = Math.round(ballState.y);

  if (hitBufferState.pendingShot !== null && isBallInRange() &&
      (hitBufferState.pendingShot !== "smash" ||
       ballState.height > HIGH_BALL_THRESHOLD)) {
    const pendingShot = hitBufferState.pendingShot;
    clearHitBuffer();
    applyPendingShot(pendingShot);
  } else if (hitBufferState.pendingShot !== null &&
             hitBufferState.ticksRemaining === 0) {
    clearHitBuffer();
  }

  ballSprite.type = isBallInRange() ? "g" : ball;

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

// AI LOGIC

function getActiveAIStats() {
  const rosterEntry = ROSTER[rosterState.selectedIndex];
  const difficulty = DIFFICULTY_LEVELS[difficultyState.selectedIndex];
  return {
    reactionDelayTicks: Math.max(
      1,
      Math.round(rosterEntry.baseReactionDelayTicks *
        difficulty.reactionMultiplier)
    ),
    moveSpeed: rosterEntry.baseMoveSpeed * difficulty.moveSpeedMultiplier,
    accuracy: Math.max(
      0,
      Math.min(0.98, rosterEntry.baseAccuracy *
        difficulty.accuracyMultiplier)
    )
  };
}

function resetAIForIncomingShot() {
  const activeAIStats = getActiveAIStats();
  aiState.reactionTicksRemaining = activeAIStats.reactionDelayTicks;
  aiState.isReacting = true;
  aiState.accuracyRolled = false;
  aiState.wasMovingTowardOpponent = true;
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

  const opponentSprite = getFirst(
    ROSTER[rosterState.selectedIndex].typeChar
  );
  if (!opponentSprite) return;
  if (opponentState.x === null) opponentState.x = opponentSprite.x;

  const activeAIStats = getActiveAIStats();
  const distanceX = ballState.x - opponentState.x;
  const movementX = Math.max(
    -activeAIStats.moveSpeed,
    Math.min(activeAIStats.moveSpeed, distanceX)
  );
  opponentState.x = Math.max(
    COURT_MIN_X,
    Math.min(COURT_MAX_X, opponentState.x + movementX)
  );
  opponentSprite.x = Math.round(opponentState.x);

  if (!aiState.accuracyRolled && isBallInRangeOf(opponentSprite)) {
    aiState.accuracyRolled = true;
    if (Math.random() < activeAIStats.accuracy) {
      // Use the player's exact topspin speed, reversed so the return travels
      // back toward the player instead of immediately back toward the AI.
      ballState.vy = -TOPSPIN_VY;
      ballState.isServeInFlight = false;
      ballState.height = 0;
      ballState.vHeight = 0;
      aiState.wasMovingTowardOpponent = false;
      aiState.isReacting = false;
      aiState.reactionTicksRemaining = 0;
      playTune(TUNE_HIT);
    }
  }
}

// INPUT HANDLERS

// The match interval starts only after roster confirmation.
let ballTick = null;

function movePlayer(dx, dy) {
  if (gameStage !== "MATCH" || matchState.matchOver) return;
  const sprite = getFirst(player);
  if (!sprite) return;
  sprite.x = Math.max(COURT_MIN_X, Math.min(COURT_MAX_X, sprite.x + dx));
  sprite.y = Math.max(PLAYER_MIN_Y, Math.min(PLAYER_MAX_Y, sprite.y + dy));
}

onInput("w", () => {
  if (gameStage === "ROSTER") {
    rosterState.selectedIndex = Math.max(0, rosterState.selectedIndex - 1);
    renderRosterMenu();
  } else if (gameStage === "MATCH") {
    movePlayer(0, -1);
  }
});

onInput("a", () => {
  if (gameStage === "DIFFICULTY") {
    difficultyState.selectedIndex = Math.max(
      0,
      difficultyState.selectedIndex - 1
    );
    renderDifficultyMenu();
  } else if (gameStage === "MATCH") {
    movePlayer(-1, 0);
    aimState.direction = "left";
    aimState.ticksRemaining = AIM_BUFFER_TICKS;
  }
});

onInput("s", () => {
  if (gameStage === "ROSTER") {
    rosterState.selectedIndex = Math.min(
      ROSTER.length - 1,
      rosterState.selectedIndex + 1
    );
    renderRosterMenu();
  } else if (gameStage === "MATCH") {
    movePlayer(0, 1);
  }
});

onInput("d", () => {
  if (gameStage === "DIFFICULTY") {
    difficultyState.selectedIndex = Math.min(
      DIFFICULTY_LEVELS.length - 1,
      difficultyState.selectedIndex + 1
    );
    renderDifficultyMenu();
  } else if (gameStage === "MATCH") {
    movePlayer(1, 0);
    aimState.direction = "right";
    aimState.ticksRemaining = AIM_BUFFER_TICKS;
  }
});

function isBallInRangeOf(sprite) {
  const ballSprite = getLiveBallSprite();
  return !!(sprite && ballSprite &&
    Math.abs(ballState.x - sprite.x) <= 2.0 &&
    Math.abs(ballState.y - sprite.y) <= 2.0);
}

function isBallInRange() {
  return isBallInRangeOf(getFirst(player));
}

function applyBufferedAim() {
  if (aimState.direction !== null && aimState.ticksRemaining > 0) {
    ballState.vx += aimState.direction === "left" ? -AIM_VX : AIM_VX;
    aimState.direction = null;
    aimState.ticksRemaining = 0;
  }
}

function applyTopspinShot() {
  clearHitBuffer();
  ballState.vy = -0.4;
  ballState.height = 0;
  ballState.vHeight = 0;
  ballState.isServeInFlight = false;
  applyBufferedAim();
  playTune(TUNE_HIT);
  resetAIForIncomingShot();
}

function applySliceShot() {
  clearHitBuffer();
  ballState.vy = -0.14;
  ballState.vx += Math.random() * 0.1 - 0.05;
  ballState.height = 0;
  ballState.vHeight = 0;
  ballState.isServeInFlight = false;
  applyBufferedAim();
  playTune(TUNE_HIT);
  resetAIForIncomingShot();
}

function applyLobShot() {
  clearHitBuffer();
  ballState.vy = -0.14;
  ballState.height = 0;
  ballState.vHeight = LOB_INITIAL_VHEIGHT;
  ballState.isServeInFlight = false;
  applyBufferedAim();
  playTune(TUNE_HIT);
  resetAIForIncomingShot();
}

function applySmashShot() {
  clearHitBuffer();
  ballState.vy = -0.5;
  ballState.height = 0;
  ballState.vHeight = 0;
  ballState.isServeInFlight = false;
  applyBufferedAim();
  playTune(TUNE_HIT);
  resetAIForIncomingShot();
}

function applyPendingShot(shotType) {
  if (shotType === "topspin") applyTopspinShot();
  if (shotType === "slice") applySliceShot();
  if (shotType === "lob") applyLobShot();
  if (shotType === "smash") applySmashShot();
}

function returnToRosterMenu() {
  enterRosterMenu();
}

onInput("i", () => {
  if (gameStage === "GAME_OVER") {
    returnToRosterMenu();
    return;
  }
  if (gameStage !== "MATCH" || !ballState.inPlay) return;
  if (!isBallInRange()) {
    queueHitBuffer("topspin");
    return;
  }
  applyTopspinShot();
});

onInput("j", () => {
  if (gameStage === "GAME_OVER") {
    returnToRosterMenu();
    return;
  }
  if (gameStage !== "MATCH" || !ballState.inPlay) return;
  if (!isBallInRange()) {
    queueHitBuffer("slice");
    return;
  }
  applySliceShot();
});

onInput("l", () => {
  if (gameStage === "GAME_OVER") {
    returnToRosterMenu();
    return;
  }
  if (gameStage !== "MATCH" || !ballState.inPlay) return;
  if (!isBallInRange()) {
    queueHitBuffer("lob");
    return;
  }
  applyLobShot();
});

onInput("k", () => {
  if (gameStage === "ROSTER") {
    confirmRosterSelection();
    return;
  }
  if (gameStage === "DIFFICULTY") {
    startMatch();
    return;
  }
  if (gameStage === "GAME_OVER") {
    returnToRosterMenu();
    return;
  }
  if (gameStage !== "MATCH" || matchState.matchOver) return;
  if (!ballState.inPlay) {
    serveBall();
    return;
  }
  if (ballState.height <= HIGH_BALL_THRESHOLD) return;
  if (!isBallInRange()) {
    queueHitBuffer("smash");
    return;
  }
  applySmashShot();
});

enterRosterMenu();

// Tuning: singles lines at x=1 and x=8; service lines at opponent row 2
// and player row 6. A serve faults wide when it crosses row 2 outside x=1..8.
// Buffered diagonal aim adds vx +/-0.15 and lasts 6 ticks = 450 ms at 75 ms
// per tick. The hit-intent buffer lasts 3 ticks = 225 ms at 75 ms per tick.
// Tuning: topspin -0.4, slice/lob -0.14, smash -0.5, lob vHeight
// 0.2, gravity 0.02, and smash threshold height > 1.
// The AI miss path is not duplicated: when its one accuracy roll fails,
// updateBall leaves the ball's velocity untouched, so crossing the opponent's
// baseline naturally awards that point to the player. Persistent score text is
// at the top-left text origin (column 0, row 0 for points and row 1 for games);
// the final result is at column 0, row 3.
// The opponent's .type reassignment is safe on every selection because
// startMatch() first rebuilds level, recreating the opponent as type "o" before
// getFirst(opponent) performs the recolor. During the active match, the AI
// continues using the selected roster type for its lookup.
// Computed AI stats table (reaction ticks / move speed / accuracy), ordered
// Very Easy, Easy, Normal, Hard, Very Hard:
// Carlos: 10/0.12/0.56, 8/0.16/0.68, 6/0.20/0.80, 5/0.24/0.88, 3/0.28/0.96
// Rafa:   13/0.09/0.63, 10/0.12/0.765, 8/0.15/0.90, 6/0.18/0.98, 4/0.21/0.98
// Novak:   6/0.168/0.595, 5/0.224/0.7225, 4/0.28/0.85, 3/0.336/0.935, 2/0.392/0.98
// Difficulty selection intentionally persists across matches when returning
// to the roster menu. The corrected v bitmap remains a rectangular 16-by-16
// asset, and the new g in-range ball bitmap is verified as a rectangular
// 16-by-16 grid. The tune tagged-template
// syntax follows the short, established tune examples used in this project;
// I am confident these four definitions are valid, with the Sprig editor as
// the final runtime confirmation. dx/dy remain read-only and are never
// assigned as velocities.
