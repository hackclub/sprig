/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Echo Protocol
@description: A time-loop puzzle game where your past movements become echoes. Record five actions, activate pressure plates, open doors, and escape the chamber.
@author: Gurkirat Singh
@tags: ['puzzle', 'strategy', 'time-loop']
@addedOn: 2026-11-23
*/

const player = "p";
const echo = "g";
const wall = "w";
const switchTile = "s";
const door = "b";
const exit = "e";

setLegend(
  [player, bitmap`
................
.....000000.....
....06666660....
...0666666660...
...0660660660...
...0666666660...
...0666666660...
...0660000660...
...0666666660...
...0666666660...
...0666666660...
....06666660....
.....000000.....
......0..0......
.....00..00.....
................`],
  [echo, bitmap`
................
.....777777.....
....07777770....
...0777777770...
...0770077070...
...0777777770...
...0777777770...
...0770000770...
...0777777770...
...0777777770...
...0777777770...
....07777770....
.....000000.....
......0..0......
.....00..00.....
................`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [switchTile, bitmap`
................
................
....77777777....
...7777777777...
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
...7777777777...
....77777777....
................
................
................
................`],
  [door, bitmap`
3333333333333333
3333333333333333
333CCCCCCCCCC333
333CCCCCCCCCC333
333CC333333CC333
333CC333333CC333
333CC333333CC333
333CC333333CC333
333CC333333CC333
333CC333333CC333
333CCCCCCCCCC333
333CCCCCCCCCC333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [exit, bitmap`
................
..444444444444..
..444444444444..
..44........44..
..44........44..
..44........44..
..44........44..
..44........44..
..44........44..
..44........44..
..44........44..
..444444444444..
..444444444444..
................
................
................`]
);

const level = map`
wwwwwwww
w..sw..w
w...w..w
w.p.b.ew
w...w..w
wwwwwwww`;

const CYCLE_LENGTH = 5;

const DOOR_X = 4;
const DOOR_Y = 3;
const SWITCH_X = 3;
const SWITCH_Y = 1;
const EXIT_X = 6;
const EXIT_Y = 3;

setSolids([player, wall, door]);

let turnCount = 0;
let recording = [];
let recordingStart = null;
let activeEcho = null;
let won = false;
let doorOpen = false;
let gameStarted = false;

// ----------------------------------
// HELPERS
// ----------------------------------

function hasType(x, y, type) {
  return getTile(x, y).some(
    sprite => sprite.type === type
  );
}

function getDelta(action) {
  if (action === "w") return [0, -1];
  if (action === "s") return [0, 1];
  if (action === "a") return [-1, 0];
  if (action === "d") return [1, 0];
  return [0, 0];
}

// ----------------------------------
// MOVEMENT
// ----------------------------------

function movePlayer(action) {
  const robot = getFirst(player);
  if (!robot) return;

  const delta = getDelta(action);
  robot.x += delta[0];
  robot.y += delta[1];
}

function moveEcho(action) {
  const ghost = getFirst(echo);
  if (!ghost) return;

  const delta = getDelta(action);
  const nx = ghost.x + delta[0];
  const ny = ghost.y + delta[1];

  if (
    nx < 0 || ny < 0 ||
    nx >= width() || ny >= height()
  ) return;

  if (hasType(nx, ny, wall)) return;
  if (hasType(nx, ny, door)) return;

  ghost.x = nx;
  ghost.y = ny;
}

// ----------------------------------
// SWITCH AND DOOR
// ----------------------------------

function switchActive() {
  return (
    hasType(SWITCH_X, SWITCH_Y, player) ||
    hasType(SWITCH_X, SWITCH_Y, echo)
  );
}

function updateDoor() {
  const occupied = hasType(
    DOOR_X, DOOR_Y, player
  );

  const shouldOpen =
    switchActive() || occupied;

  if (shouldOpen && !doorOpen) {
    for (const d of getAll(door)) {
      d.remove();
    }
    doorOpen = true;
  }

  if (!shouldOpen && doorOpen) {
    addSprite(DOOR_X, DOOR_Y, door);
    doorOpen = false;
  }
}

// ----------------------------------
// HUD
// ----------------------------------

function turnsUntilEcho() {
  return CYCLE_LENGTH - recording.length;
}

function updateHUD() {
  clearText();

  if (won) {
    addText("LEVEL COMPLETE!", {
      x: 2,
      y: 2,
      color: color`4`
    });

    addText("K TO RESTART", {
      x: 3,
      y: 4,
      color: color`3`
    });

    return;
  }

  addText("T:" + turnCount, {
    x: 1,
    y: 0,
    color: color`3`
  });

  addText(
    "REC:" + recording.length + "/5", {
      x: 8,
      y: 0,
      color: color`7`
    }
  );

  if (activeEcho === null) {
    addText(
      "ECHO IN " + turnsUntilEcho(), {
        x: 1,
        y: 1,
        color: color`3`
      }
    );
  } else {
    addText(
      "ECHO ON R:" + turnsUntilEcho(), {
        x: 1,
        y: 1,
        color: color`7`
      }
    );
  }
}

// ----------------------------------
// OPENING CONTROLS SCREEN
// ----------------------------------

function showControls() {
  clearText();

  addText("ECHO PROTOCOL", {
    x: 3,
    y: 1,
    color: color`7`
  });

  addText("WASD - MOVE", {
    x: 3,
    y: 3,
    color: color`3`
  });

  addText("J - WAIT", {
    x: 3,
    y: 5,
    color: color`3`
  });

  addText("K - RESTART", {
    x: 3,
    y: 7,
    color: color`3`
  });

  addText("5 MOVES = ECHO", {
    x: 2,
    y: 9,
    color: color`7`
  });

  addText("L - START", {
    x: 3,
    y: 12,
    color: color`4`
  });
}

// ----------------------------------
// ECHO RECORDING
// ----------------------------------

function createEcho() {
  for (const ghost of getAll(echo)) {
    ghost.remove();
  }

  addSprite(
    recordingStart.x,
    recordingStart.y,
    echo
  );

  activeEcho = {
    actions: recording.slice(),
    index: 0
  };
}

// ----------------------------------
// GAME TURN
// ----------------------------------

function takeTurn(action) {
  if (!gameStarted || won) return;

  const robot = getFirst(player);
  if (!robot) return;

  if (recording.length === 0) {
    recordingStart = {
      x: robot.x,
      y: robot.y
    };
  }

  // Existing echo replays one action.
  if (activeEcho !== null) {
    const ghostAction =
      activeEcho.actions[activeEcho.index];

    moveEcho(ghostAction);

    activeEcho.index =
      (activeEcho.index + 1) % CYCLE_LENGTH;
  }

  updateDoor();

  // Move the real player.
  movePlayer(action);
  updateDoor();

  // Record the action.
  recording.push(action);
  turnCount++;

  // Create or replace echo every 5 turns.
  if (recording.length === CYCLE_LENGTH) {
    createEcho();
    recording = [];
    updateDoor();
  }

  // Check victory.
  if (
    robot.x === EXIT_X &&
    robot.y === EXIT_Y
  ) {
    won = true;
  }

  updateHUD();
}

// ----------------------------------
// RESTART
// ----------------------------------

function restart() {
  setMap(level);

  turnCount = 0;
  recording = [];
  recordingStart = null;
  activeEcho = null;
  won = false;
  doorOpen = false;

  updateHUD();
}

// ----------------------------------
// CONTROLS
// ----------------------------------

onInput("w", () => takeTurn("w"));
onInput("a", () => takeTurn("a"));
onInput("s", () => takeTurn("s"));
onInput("d", () => takeTurn("d"));

onInput("j", () => takeTurn("j"));

onInput("k", () => {
  if (gameStarted) restart();
});

onInput("l", () => {
  if (!gameStarted) {
    gameStarted = true;
    restart();
  }
});

// ----------------------------------
// INITIALIZE
// ----------------------------------

restart();
showControls();
