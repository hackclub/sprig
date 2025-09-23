/*
@title: ICONIC SNAKE
@description: It is about the really iconic snake classic inspired game. It's about gaining points by feeding your snake food which makes it grow. Just survive till you can't eat anymore.
@author: Master Yug
@tags: ["arcade"]
@addedOn: 2025-08-17
*/


// ========== Bitmaps ==========
const headRight = bitmap`
................
................
......0000......
.....033330.....
....03300330....
...0333330330...
...0333330L30.1.
...0333330L111..
...0333330L111..
...0333330L30.1.
...0333330330...
....03300330....
.....033330.....
......0000......
................
................`;

const headLeft = bitmap`
................
................
......0000......
.....033330.....
....03300330....
...0330333330...
.1.03L0333330...
..111L0333330...
..111L0333330...
.1.03L0333330...
...0330333330...
....03300330....
.....033330.....
......0000......
................
................`;

const headUp = bitmap`
................
......1..1......
.......11.......
.....001100.....
....03311330....
...033LLLL330...
..033000000330..
..030333333030..
..030333333030..
..033333333330..
...0333333330...
....03333330....
.....000000.....
................
................
................`;

const headDown = bitmap`
................
................
................
.....000000.....
....03333330....
...0333333330...
..033333333330..
..030333333030..
..030333333030..
..033000000330..
...033LLLL330...
....03311330....
.....001100.....
.......11.......
......1..1......
................`;

const snakeBody = bitmap`
................
................
......0000......
.....031130.....
....03300330....
...0330330330...
...03L0330L30...
...01L0330L10...
...01L0330L10...
...03L0330L30...
...0330330330...
....03300330....
.....031130.....
......0000......
................
................`;

const food = bitmap`
................
.....C....C.....
......C..C......
.......CC.......
......FFFF......
.....999999.....
....C996699C....
....C96FF69C....
....C96FF69C....
....C996699C....
.....999999.....
......CCCC......
................
................
................
................`;

const brick = bitmap`
6666666666666666
6777777777777776
6766666666666676
6767777777777676
6767666666667676
6767677777767676
6767676666767676
6767676776767676
6767676776767676
6767676666767676
6767677777767676
6767666666667676
6767777777777676
6766666666666676
6777777777777776
6666666666666666`;

// ========== Legend ==========
setLegend(
  ["R", headRight], // head right
  ["L", headLeft],  // head left
  ["U", headUp],    // head up
  ["D", headDown],  // head down
  ["B", snakeBody],
  ["F", food],
  ["W", brick]
);

// ========== Map with walls ==========
const level = map`
WWWWWWWWWWWWWWWW
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
WWWWWWWWWWWWWWWW`;

// ========== State ==========
let snake = [];
let direction = "right";
let nextDirection = "right";
let gameOver = false;
let score = 0;
let highScoreWrapOn = 0;
let highScoreWrapOff = 0;
let speed = 200;
let pointsPerFood = 1;
let difficultyName = "Easy";
let wrapAround = false;
let rotateHead = true;
let mode = "entrance";   // NEW default mode
let loopId = null;
let inputLocked = false;

// blinking helper
let blinkInterval = null;
function startBlinkingText(text, opts) {
  let visible = true;
  blinkInterval = setInterval(() => {
    if (mode !== "entrance" && mode !== "gameover") return;
    if (visible) {
      addText(text, opts);
    } else {
      clearText();
      if (mode === "entrance") {
        addText("WELCOME TO", { y: 4, color: color`3` });
        addText("ICONIC SNAKE", { y: 6, color: color`6` });
        addText("To Start", { y: 10, color: color`9` });
      }
      if (mode === "gameover") {
        addText("Game Over!", { y: 4, color: color`3` });
        addText(`Score: ${score}`, { y: 6, color: color`3` });
        if (wrapAround) {
          addText(`High (Wrap On): ${highScoreWrapOn}`, { y: 7, color: color`6` });
        } else {
          addText(`High (Wrap Off): ${highScoreWrapOff}`, { y: 7, color: color`6` });
        }
        addText(`Difficulty: ${difficultyName}`, { y: 8, color: color`9` });
        addText(`Wrap: ${wrapAround ? "On" : "Off"}`, { y: 9, color: color`9` });
      }
    }
    visible = !visible;
  }, 500);
}
function stopBlinkingText() {
  if (blinkInterval) {
    clearInterval(blinkInterval);
    blinkInterval = null;
  }
}

// ========== Helpers ==========
function clearSprites() {
  getAll().forEach(s => s.remove());
}

function headSymbolForDirection(dir) {
  if (!rotateHead) return "R";
  if (dir === "up") return "U";
  if (dir === "down") return "D";
  if (dir === "left") return "L";
  return "R";
}

function updateHUD() {
  if (mode === "playing") {
    clearText();
    addText(`Score: ${score}`, { x: 1, y: 0, color: color`3` });
  }
}

// ========== Screens ==========
function showEntranceScreen() {
  mode = "entrance";
  clearSprites();
  setMap(level);
  clearText();
  addText("WELCOME TO", { y: 4, color: color`3` });
  addText("ICONIC SNAKE", { y: 6, color: color`6` });
  startBlinkingText("Press I", { y: 12, color: color`9` });
}

function showWrapMenu() {
  stopBlinkingText();
  mode = "wrap";
  clearSprites();
  setMap(level);
  clearText();
  addText("Snake Game",     { y: 3, color: color`3` });
  addText("Wrap Around?",   { y: 5, color: color`3` });
  addText("I - On",         { y: 7, color: color`F` });
  addText("J - Off",        { y: 8, color: color`9` });
}

function showDifficultyMenu() {
  stopBlinkingText();
  mode = "difficulty";
  clearSprites();
  setMap(level);
  clearText();
  addText("Choose Difficulty", { y: 5, color: color`3` });
  addText("I - Easy",          { y: 7, color: color`F` });
  addText("J - Medium",        { y: 8, color: color`6` });
  addText("K - Hard",          { y: 9, color: color`9` });
}

// ========== Game Control ==========
function startGame(startSpeed, points, diffName) {
  stopBlinkingText();
  if (loopId) { clearTimeout(loopId); loopId = null; }
  mode = "playing";
  clearSprites();
  setMap(level);
  clearText();
  snake = [{ x: 5, y: 5 }];
  direction = "right";
  nextDirection = "right";
  inputLocked = false;
  gameOver = false;
  score = 0;
  speed = startSpeed;
  pointsPerFood = points;
  difficultyName = diffName;
  drawSnake();
  spawnFood();
  updateHUD();
  loopId = setTimeout(gameLoop, speed);
}

function endGame() {
  mode = "gameover";
  gameOver = true;
  if (loopId) { clearTimeout(loopId); loopId = null; }
  if (wrapAround) {
    if (score > highScoreWrapOn) highScoreWrapOn = score;
  } else {
    if (score > highScoreWrapOff) highScoreWrapOff = score;
  }
  clearText();
  addText("Game Over!",         { y: 4, color: color`3` });
  addText(`Score: ${score}`,    { y: 6, color: color`3` });
  if (wrapAround) {
    addText(`High (Wrap On): ${highScoreWrapOn}`, { y: 7, color: color`6` });
  } else {
    addText(`High (Wrap Off): ${highScoreWrapOff}`, { y: 7, color: color`6` });
  }
  addText(`Difficulty: ${difficultyName}`, { y: 8, color: color`9` });
  addText(`Wrap: ${wrapAround ? "On" : "Off"}`, { y: 9, color: color`9` });

  startBlinkingText("Press L for Menu", { y: 11, color: color`F` });
}
 
// ========== Snake/Gameplay ==========
function drawSnake() {
  ["B","R","L","U","D"].forEach(t => getAll(t).forEach(s => s.remove()));
  snake.forEach((part, idx) => {
    if (idx === 0) addSprite(part.x, part.y, headSymbolForDirection(direction));
    else addSprite(part.x, part.y, "B");
  });
}

function spawnFood() {
  let x, y, ok = false;
  while (!ok) {
    x = Math.floor(Math.random() * 14) + 1;
    y = Math.floor(Math.random() * 14) + 1;
    if (getTile(x, y).length === 0 && !snake.some(p => p.x === x && p.y === y)) ok = true;
  }
  getAll("F").forEach(s => s.remove());
  addSprite(x, y, "F");
}

function getFoodPos() {
  const f = getAll("F")[0];
  return f ? { x: f.x, y: f.y } : null;
}

// ========== Input ==========
onInput("w", () => {
  if (mode !== "playing" || inputLocked) return;
  if (direction !== "down") { nextDirection = "up"; inputLocked = true; }
});
onInput("s", () => {
  if (mode !== "playing" || inputLocked) return;
  if (direction !== "up") { nextDirection = "down"; inputLocked = true; }
});
onInput("a", () => {
  if (mode !== "playing" || inputLocked) return;
  if (direction !== "right") { nextDirection = "left"; inputLocked = true; }
});
onInput("d", () => {
  if (mode !== "playing" || inputLocked) return;
  if (direction !== "left") { nextDirection = "right"; inputLocked = true; }
});

onInput("i", () => {
  if (mode === "entrance") { stopBlinkingText(); showWrapMenu(); return; }
  if (mode === "wrap") { wrapAround = true; showDifficultyMenu(); return; }
  if (mode === "difficulty") startGame(300, 1, "Easy");
});
onInput("j", () => {
  if (mode === "wrap") { wrapAround = false; showDifficultyMenu(); return; }
  if (mode === "difficulty") startGame(200, 2, "Medium");
});
onInput("k", () => {
  if (mode === "difficulty") startGame(120, 3, "Hard");
});
onInput("l", () => {
  if (mode === "gameover") { stopBlinkingText(); showWrapMenu(); return; }
  if (mode === "playing") { rotateHead = !rotateHead; updateHUD(); drawSnake(); }
});

// ========== Game Loop ==========
function gameLoop() {
  if (gameOver || mode !== "playing") return;
  direction = nextDirection;
  let head = { ...snake[0] };
  if (direction === "up") head.y--;
  if (direction === "down") head.y++;
  if (direction === "left") head.x--;
  if (direction === "right") head.x++;
  if (wrapAround) {
    if (head.x < 1) head.x = 14;
    if (head.x > 14) head.x = 1;
    if (head.y < 1) head.y = 14;
    if (head.y > 14) head.y = 1;
  } else {
    if (head.x < 0 || head.x > 15 || head.y < 0 || head.y > 15) { endGame(); return; }
  }
  const nextTile = getTile(head.x, head.y);
  const foodPos = getFoodPos();
  const willGrow = nextTile.some(s => s.type === "F");
  const tail = snake[snake.length - 1];
  const isMovingIntoTail = (tail.x === head.x && tail.y === head.y);
  const hitsWall = nextTile.some(s => s.type === "W");
  const hitsSnake = nextTile.some(s => ["B","R","L","U","D"].includes(s.type));
  if ((!wrapAround && hitsWall) || (hitsSnake && !(isMovingIntoTail && !willGrow))) {
    endGame();
    return;
  }
  snake.unshift(head);
  if (willGrow && foodPos && head.x === foodPos.x && head.y === foodPos.y) {
    score += pointsPerFood;
    spawnFood();
    updateHUD();
  } else {
    const t = snake.pop();
    clearTile(t.x, t.y);
  }
  drawSnake();
  updateHUD();
  inputLocked = false;
  loopId = setTimeout(gameLoop, speed);
}

// ========== Boot ==========
showEntranceScreen();
