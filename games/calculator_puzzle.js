
/* 
@title: calculator_puzzle
@author: aboutdavid
@tags: ['puzzle']
@addedOn: 2023-04-25
*/

    /*
Greetings! The goal of this game is to get to the goal using
buttons

W, A, S, D correspond to the operations on screen
L restarts the whole game and timer
K restarts the level

Good luck!
*/

var currentValue = 0;
var currentLevel = 0;
var currentMoves = 0;
var currentScore = 0;
var currentTime = 0;
var ended = false;
var bottom = "b";
const levels = [
  {
    start: 0,
    goal: 12,
    keys: ["+1", "+2", "*4"],
  },
  {
    start: 1,
    goal: 16,
    keys: ["+3", "*4"],
  },
  {
    start: 2,
    goal: 24,
    keys: ["+5", "+3", "*3"],
  },
  {
    start: 3,
    goal: 27,
    keys: ["+3", "*9"],
  },
  {
    start: 4,
    goal: 40,
    keys: ["*4", "+6"],
  },
  {
    start: 1,
    goal: 25,
    keys: ["+4", "*5", "/2"],
  },
  {
    start: 0,
    goal: 7,
    keys: ["+4", "-2", "/2", "+8"],
  },
  {
    start: 3,
    goal: 30,
    keys: ["^3", "+9", "*3"],
  },
  {
    start: 4,
    goal: 64,
    keys: ["+8", "*4", "/2"],
  },
  {
    start: 5,
    goal: 125,
    keys: ["+10", "*5", "/1.25", "-5"],
  },
];
function updateNumber() {
  addText(currentValue.toString(), {
    x: 20 - currentValue.toString().length,
    y: 2,
    color: color`0`,
  });
}
setLegend([
  bottom,
  bitmap`
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
................
................
................
................
................
0000000000000000`,
]);
setMap(map`
..........
bbbbbbbbbb
..........
..........
..........
..........
..........
..........`);

function updateLevel(level = 0) {
  clearText();
  currentLevel = level;
  currentValue = levels[currentLevel].start;
  currentMoves = 0;
  addText(`Goal: ${levels[currentLevel].goal}`, {
    x: 0,
    y: 1,
    color: color`0`,
  });
  if (levels[currentLevel].keys[0])
    addText(`W Key: ${levels[currentLevel].keys[0]}`, {
      x: 0,
      y: 11,
      color: color`0`,
    });
  if (levels[currentLevel].keys[1])
    addText(`A Key: ${levels[currentLevel].keys[1]}`, {
      x: 0,
      y: 12,
      color: color`0`,
    });
  if (levels[currentLevel].keys[2])
    addText(`S Key: ${levels[currentLevel].keys[2]}`, {
      x: 0,
      y: 13,
      color: color`0`,
    });
  if (levels[currentLevel].keys[3])
    addText(`D Key: ${levels[currentLevel].keys[3]}`, {
      x: 0,
      y: 14,
      color: color`0`,
    });
  addText(`Level: ${currentLevel}, Moves: ${currentMoves}`, {
    x: 0,
    y: 15,
    color: color`0`,
  });
  updateNumber();
}
function updateMoves() {
  currentMoves++;
  addText(`Level: ${currentLevel}, Moves: ${currentMoves}`, {
    x: 0,
    y: 15,
    color: color`0`,
  });
}
function doMath(key) {
  if (levels[currentLevel].keys[key])
    currentValue = eval(
      currentValue.toString() + levels[currentLevel].keys[key]
    );
}
updateLevel(0); // Start of game!

function checkLevel() {
  if (currentValue != levels[currentLevel].goal) return;

  if (currentLevel + 1 == levels.length) {
    setMap(map`
..........
bbbbbbbbbb
..........
..........
..........
..........
..........
..........`);
    clearText();
    addText(`You win!`, {
      x: 0,
      y: 2,
      color: color`0`,
    });
    addText(`Levels Completed: ${levels.length}`, {
      x: 0,
      y: 7,
      color: color`0`,
    });
    addText(`Time: ${currentTime / 100} seconds`, {
      x: 0,
      y: 8,
      color: color`0`,
    });
    ended = true;
  } else {
    updateLevel(currentLevel + 1);
  }
}
var sid = setInterval(function () {
  currentTime++;
}, 10);

onInput("w", () => {
  if (ended) return;
  updateMoves();
  doMath(0);
  updateNumber();
  checkLevel();
});
onInput("a", () => {
  if (ended) return;
  updateMoves();
  doMath(1);
  updateNumber();
  checkLevel();
});
onInput("s", () => {
  if (ended) return;
  updateMoves();
  doMath(2);
  updateNumber();
  checkLevel();
});
onInput("d", () => {
  if (ended) return;
  updateMoves();
  doMath(3);
  updateNumber();
  checkLevel();
});
onInput("l", () => {
  ended = false;
  currentTime = 0;
  clearText();
  updateLevel(0);
  clearInterval(sid);
  sid = setInterval(function () {
    currentTime++;
  }, 10);
});
onInput("k", () => {
  if (ended) return;
  currentValue = 0;
  updateNumber();
  updateLevel(currentLevel);
});
afterInput(() => {});
