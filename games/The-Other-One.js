/*
@title: The Other One
@author: Malakbnz
@tags: []
@addedOn: 2024-11-26
*/

const player = "p";
const shadow = "s";
const goal = "g";
const obstacle = "o";
const background = "b"; // Background tile

let gameRunning = false; // Start the game after the title screen

// Define sprites
setLegend(
  [player, bitmap`
......CCCC......
.....CCCCCC.....
.....C99CCC.....
.....9909CC.....
.....C9999C.....
.....CC75.C.....
.....5C755......
.....9C759......
.....9575.......
......973.......
......893.......
......833.......
......8..3......
.....8...3......
.....8...3......
.....8...3......
.....0...0......`],
  [shadow, bitmap`
......000.......
.....00000......
.....011000.....
.....110100.....
.....011100.....
.....0.LL0......
.....L0LLL......
.....L0LL1......
.....1LLL1......
.....1LL1.......
......L10.......
......L.0.......
......L.0.......
.....L...0......
.....L...0......
.....0...0......`],
  [goal, bitmap`
.....CCCCC......
....CCCCCCC.....
...CCCCCCCCC....
..CCCCCCCCCCC...
..CCC9CCC9CCC...
..CCC9CCC9CCC...
..CCC9CCC9CCC...
..CCC9CCC9CCC...
..C9C9CCC9C9C...
..C9C9CCC9C9C...
..C9C9CCC922C...
..C9C9CCC9C9C...
..C9C9CCC9C9C...
..C9C9CCC9C9C...
..C9C9CCC9C9C...
..C9C9CCC9C9C...`],
  [obstacle, bitmap`
.....111111.....
.....111111.....
.....111111.....
.....111111.....
.....111111.....
.....111111.....
.....111111.....
.....111111.....
.....111111.....
.....111111.....
.....111111.....
.....111111.....
.....111111.....`],
  [background, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
D44DDDDDDDDDDDD4
444DDDDD4DDD4444
444D444D444DD444
444DD44444444444
444444D44DDDDDDD
DDDDDDDDDDDD4D44
DD4444444DD44D4D
DD44444444D44DD4
DD4444444444D444
DDDDDD44D44D44D4
DDDDD4DDDDDD44D4
DDD444DD4D4DD4DD
DD4D444D44DDDDD4`]
);

// Set solid objects
setSolids([player, obstacle]);

// Levels
let level = 0;
const levels = [
  map`
bbbbbbbb
bbbbbbbb
pbbbbbbb
bbobbbbb
bbbbobbb
bbbbbgbb`,
  map`
bbbbobbb
bbboobbb
pbbbbbgb
bbbbobbb
bbobbbbb
bbbbbbbb`
];
setBackground(background); // Apply the background
setMap(levels[level]);

// Define tunes
const scaryTune = tune`
200: C4~200 + G4~200 + E4~200,
200: D4~200 + undefined~200 + A4~200,
200: undefined~200,
200: C4~200 + E4~200 + G4~200,
200: F4~200 + A4~200 + C5~200,
200: D4~200 + G4~200 + B4~200,
200: C4~200 + undefined~200 + A4~200,
5000`;

const loseSound = tune`
100: c2~100 + g2~100 + c3~100,
100: b1~100 + f#2~100 + a2~100,
100: a1~100 + e2~100 + g2~100`;

const winSound = tune`
100: c5~100 + e5~100 + g5~100,
100: b4~100 + f#5~100 + a5~100`;

// Player movement with collision detection
onInput("s", () => movePlayer(0, 1));
onInput("w", () => movePlayer(0, -1));
onInput("a", () => movePlayer(-1, 0));
onInput("d", () => movePlayer(1, 0));

function movePlayer(dx, dy) {
  let playerSprite = getFirst(player);
  if (playerSprite && !isObstacle(playerSprite.x + dx, playerSprite.y + dy)) {
    playerSprite.x += dx;
    playerSprite.y += dy;
  }
}

// Check if a tile is an obstacle
function isObstacle(x, y) {
  let tile = getTile(x, y);
  return tile.some(t => t.type === obstacle);
}

// Move shadow towards the player
function moveShadow() {
  let playerSprite = getFirst(player);
  let shadowSprite = getFirst(shadow);

  if (playerSprite && shadowSprite) {
    let deltaX = playerSprite.x - shadowSprite.x;
    let deltaY = playerSprite.y - shadowSprite.y;

    if (deltaX !== 0) shadowSprite.x += Math.sign(deltaX);
    if (deltaY !== 0) shadowSprite.y += Math.sign(deltaY);

    // End game if shadow catches the player
    if (shadowSprite.x === playerSprite.x && shadowSprite.y === playerSprite.y) {
      gameRunning = false;
      playTune(loseSound); // Play lose sound
      showLoseText();
    }
  }
}

// Show lose text
function showLoseText() {
  addText("You Lost!", { x: 5, y: 6, color: color`3` });
}

// Show win text
function showWinText() {
  addText("You Won!", { x: 5, y: 6, color: color`2` });
  playTune(winSound); // Play win sound
}

// Check if the player reached the goal
function checkGoal() {
  let playerSprite = getFirst(player);
  let goalSprite = getFirst(goal);

  if (playerSprite && goalSprite && playerSprite.x === goalSprite.x && playerSprite.y === goalSprite.y) {
    if (level < levels.length - 1) {
      level++;
      setMap(levels[level]);
    } else {
      gameRunning = false;
      playTune(winSound); // Play win sound
      showWinText();
    }
  }
}

// Add shadow at the start
function addShadow() {
  let playerSprite = getFirst(player);
  if (playerSprite) {
    addSprite(playerSprite.x + 2, playerSprite.y, shadow);
  }
}

// Game loop
setInterval(() => {
  if (gameRunning) {
    moveShadow();
    checkGoal();
  }
}, 300); // Update every 300ms

// Start the game
setTimeout(() => {
  addShadow();
  playTune(scaryTune, Infinity); // Play scary tune in a loop
  gameRunning = true;
}, 2000); // Start after a short delay
