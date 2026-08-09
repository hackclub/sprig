/* Stage 6a: adds a pre-match roster menu with three parody opponents,
   cosmetic opponent recoloring, match-start gating, and a return to the
   roster after the single-set Stage 5 match ends. Stages 0-5 still provide
   movement, serves, wall bounces, four shot trajectories, fake ball height,
   lob shadows, the single hardcoded AI, and tennis scoring. All roster
   choices currently use identical AI stats; dx/dy were NOT used as settable
   velocities, and fractional positions are written to sprites only through
   Math.round. */

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
const OPPONENT_INITIAL_X = 4;

const ROSTER = [
  { name: "Carlos Alcatraz", typeChar: "o" },
  { name: "Rafa Nadale", typeChar: "q" },
  { name: "Novak Djokopoulos", typeChar: "z" }
];

// Stage 4 uses one hardcoded difficulty; the menu belongs to Stage 6b.
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

let gameStage = "ROSTER";

function resetAIForIncomingShot() {
  aiState.reactionTicksRemaining = AI_REACTION_DELAY_TICKS;
  aiState.isReacting = true;
  aiState.accuracyRolled = false;
  aiState.wasMovingTowardOpponent = true;
}

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
  const ballSprite = getFirst(ball);
  const shadowSprite = getFirst(shadow);
  if (ballSprite) ballSprite.remove();
  if (shadowSprite) shadowSprite.remove();
  ballState.inPlay = false;
  clearInterval(ballTick);
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

function renderRosterMenu() {
  clearText();
  ROSTER.forEach((entry, index) => {
    const cursor = index === rosterState.selectedIndex ? ">" : " ";
    addText(cursor + " " + entry.name, { x: 0, y: index, color: color`3` });
  });
  addText("w/s select  k ok", { x: 0, y: 4, color: color`3` });
}

function enterRosterMenu() {
  if (ballTick) {
    clearInterval(ballTick);
    ballTick = null;
  }
  const ballSprite = getFirst(ball);
  const shadowSprite = getFirst(shadow);
  if (ballSprite) ballSprite.remove();
  if (shadowSprite) shadowSprite.remove();
  ballState.inPlay = false;
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
  ballState.inPlay = false;
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
  resetMatchState();
  resetBallState();
  resetAIState();
  opponentState.x = null;
  const selectedOpponent = getFirst(
    ROSTER[rosterState.selectedIndex].typeChar
  );
  if (selectedOpponent) selectedOpponent.x = OPPONENT_INITIAL_X;
  gameStage = "MATCH";
  if (ballTick) clearInterval(ballTick);
  ballTick = setInterval(updateBall, 75);
  clearText();
  updateScoreDisplay();
}

function confirmRosterSelection() {
  const selected = ROSTER[rosterState.selectedIndex];
  const opponentSprite = getFirst(opponent);
  if (opponentSprite) opponentSprite.type = selected.typeChar;
  startMatch();
}

function serveBall() {
  if (ballState.inPlay || matchState.matchOver) return;
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

function finishRally(winner) {
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
  awardPoint(winner);
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

  const opponentSprite = getFirst(
    ROSTER[rosterState.selectedIndex].typeChar
  );
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
  if (gameStage === "MATCH") movePlayer(-1, 0);
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
  if (gameStage === "MATCH") movePlayer(1, 0);
});

function isBallInRangeOf(sprite) {
  const ballSprite = getFirst(ball);
  return !!(sprite && ballSprite &&
    Math.abs(ballState.x - sprite.x) <= 1.5 &&
    Math.abs(ballState.y - sprite.y) <= 1.5);
}

function isBallInRange() {
  return isBallInRangeOf(getFirst(player));
}

function returnToRosterMenu() {
  enterRosterMenu();
}

onInput("i", () => {
  if (gameStage === "GAME_OVER") {
    returnToRosterMenu();
    return;
  }
  if (gameStage !== "MATCH" || !ballState.inPlay || !isBallInRange()) return;
  ballState.vy = -0.4;
  ballState.height = 0;
  ballState.vHeight = 0;
  resetAIForIncomingShot();
});

onInput("j", () => {
  if (gameStage === "GAME_OVER") {
    returnToRosterMenu();
    return;
  }
  if (gameStage !== "MATCH" || !ballState.inPlay || !isBallInRange()) return;
  ballState.vy = -0.14;
  ballState.vx += Math.random() * 0.1 - 0.05;
  ballState.height = 0;
  ballState.vHeight = 0;
  resetAIForIncomingShot();
});

onInput("l", () => {
  if (gameStage === "GAME_OVER") {
    returnToRosterMenu();
    return;
  }
  if (gameStage !== "MATCH" || !ballState.inPlay || !isBallInRange()) return;
  ballState.vy = -0.14;
  ballState.height = 0;
  ballState.vHeight = LOB_INITIAL_VHEIGHT;
  resetAIForIncomingShot();
});

onInput("k", () => {
  if (gameStage === "ROSTER") {
    confirmRosterSelection();
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
  if (!isBallInRange() || ballState.height <= HIGH_BALL_THRESHOLD) return;
  ballState.vy = -0.5;
  ballState.height = 0;
  ballState.vHeight = 0;
  resetAIForIncomingShot();
});

renderRosterMenu();

// Assumptions to verify: setInterval needs no separate Sprig lifecycle cleanup;
// clamping a bottom-edge shadow to row 7 is preferable to placing it off-map.
// Tuning: topspin -0.4, slice/lob -0.14, smash -0.5, lob vHeight 0.2,
// gravity 0.02, and smash threshold height > 1.
// Stage 4 AI tuning: AI_REACTION_DELAY_TICKS = 6, AI_MOVE_SPEED = 0.2,
// AI_ACCURACY = 0.8, for a 450 ms reaction delay at the 75 ms tick rate.
// The AI miss path is not duplicated: when its one accuracy roll fails,
// updateBall leaves the ball's velocity untouched, so crossing the opponent's
// baseline naturally awards that point to the player. Persistent score text is
// at the top-left text origin (column 0, row 0 for points and row 1 for games);
// the final result is at column 0, row 3.
// The opponent's .type reassignment is supported by the Sprig sprite API, but
// Sprig runtime behavior is not available to this static validation run. This
// implementation intentionally uses getFirst(opponent) after reassignment as
// requested; verify in Sprig whether that lookup still finds the same sprite
// after a second roster selection. If it does not, that behavior should be
// reported before adding a later-stage workaround.
// dx/dy remain read-only and are never assigned as velocities.
