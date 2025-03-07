const player = "p";
const wall = "q";
const portal = "o";  // New portal symbol

setLegend(
  [player, bitmap`
................
................
...444D444D.....
...D4D44D44.....
...44D6D464.....
...D4444D4D.....
...44D4D444.....
...4D4D34D3.....
...444D4334.....
...4D4444D4.....
................
................
................
................
................
................`],

  [wall, bitmap`
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

  [portal, bitmap`
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
..HH........HH..
..HH........HH..
..HH........HH..
..HH........HH..
..HH........HH..
..HH........HH..
..HH........HH..
..HH........HH..
..HH........HH..
..HH........HH..
..HH........HH..
..HH........HH..
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..`]
);

// Define multiple levels with a portal to the next level
const levels = [
  map`
p..qq....q
q.qq..qq.q
q.qq.qqq.q
q......q..
q.q.qqq.qq
q.q.qqq.qq
q.q.q.q.qq
q.q.q.....
q.qqq.qqq.
q.....qqqo`,

  map`
qqqq....p.
q....q.q.q
q.qq.q.q.q
..qq.q.q.q
.qqq.q.q.q
.q...q.q.q
.q.qqq.q.q
.qoq.qqq.q
.qqq.....q
.....qqqqq`,

  map`
q.......qq
q.qqqqq.qq
q.qqq.q...
qoqq..qqq.
.q.q.qqqq.
.q.....pq.
..qqqqq.q.
.q........
...qqqqqqq
qqqqqqqqqq`,

  map`
q.......pq
q.q.qqqqqq
..q....qqq
.q.qqq....
.q.....qq.
.qqqqqqqq.
.qqqq..q..
......q..q
qqqqq.q.qq
......qoqq`,

  map`
q.p......q
q.qqqqqq.q
q.q......q
q.q.qqqqqq
q.q.q....q
q.q.q.qq.q
q.q.q..qoq
q.qqq.qqq.
q.........
qqqqqqqqqq`,

  map`
qqq.p..qqq
..q.qq...q
q.q.qq.q.q
q.q.q..q.q
q.q.q.qq.q
q.q.q.qq.q
q...q.qq..
q.qqqqqqq.
q.......q.
qqqqqqqoq.`,

  map`
qqqqqqqqqq
q....q...q
q.qqqq.q..
q....q.q.q
..qq.q.q.q
.......q.q
.q.qqqq...
.q..q..q.q
.qqqq.q...
.....pqoqq`,

  map`
.qo......q
..qqqqqq..
q.......q.
q.q.qq.q..
q.q....q.q
q.qqqqqq.q
.........q
.qqqq.qq.q
.q..q.q..q
....qpqqqq`,

  map`
..........
.qqqqqqqq.
...q..q.q.
qq.qq.q.q.
oq.qq.q.q.
.q..q...q.
.q.qq.qqq.
.q.qq.q...
......qqqq
qqqqqp....`,

  map`
qq........
q.qqqqqqqq
q........q
q.q.qqqq.q
q.q..q...q
q.qq.q.q.q
q.qq.q.qqq
q.qq.q...o
q.qq.qqqqq
q....p....`
];

let level = 0;
let playerSprite;  

// Starting positions for each level
const startingPositions = [
  { x: 0, y: 0 },  
  { x: 0, y: 9 },  
  { x: 0, y: 8 },  
  { x: 0, y: 9 },  
  { x: 1, y: 3 },  
  { x: 8, y: 1 },  
  { x: 5, y: 9 },  
  { x: 5, y: 9 },  
  { x: 7, y: 2 },  
  { x: 4, y: 2 }   
];

// Function to set the map and reset player position
function setLevel() {
  setMap(levels[level]);  
  playerSprite = getFirst(player);  
  if (playerSprite) {
    setPlayerPosition();  
  }
}

// Function to set the player's position
function setPlayerPosition() {
  const startPosition = startingPositions[level];
  if (playerSprite) {
    playerSprite.x = startPosition.x;
    playerSprite.y = startPosition.y;
  }
}

// Function to check if player hits a wall
function checkCollision() {
  const wallSprites = getAll(wall);
  wallSprites.forEach(wallSprite => {
    if (playerSprite.x === wallSprite.x && playerSprite.y === wallSprite.y) {
      resetPlayer();  
    }
  });
}

// Function to check if player steps on the portal
function checkPortal() {
  const portalSprite = getFirst(portal);
  if (playerSprite && portalSprite) {
    if (playerSprite.x === portalSprite.x && playerSprite.y === portalSprite.y) {
      nextLevel();  
    }
  }
}

// Function to go to the next level
function nextLevel() {
  if (level < levels.length - 1) {  // Check if the player is not at the last level
    level += 1;
    setLevel();
  } else {  // If the player is at the last level
    addText("YOU WIN!", { x: 4, y: 5, color: color`3` });

    // After 5 seconds, reset to the first level
    setTimeout(() => {
      clearText();
      resetPlayer();  // Reset to the first level
    }, 5000);  // Delay for 5 seconds before resetting
  }
}

// Function to reset player to the first level
function resetPlayer() {
  level = 0; // Reset level to 0
  setLevel(); // Reset the map and player's position
  playerSprite = getFirst(player); // Ensure the player object is updated
  setPlayerPosition(); // Reset the player's position based on starting position
}

// Player movement with WASD keys
onInput("s", () => {
  playerSprite.y += 1;
  checkCollision();  
  checkPortal();   
});

onInput("w", () => {
  playerSprite.y -= 1;
  checkCollision();  
  checkPortal();   
});

onInput("a", () => {
  playerSprite.x -= 1;
  checkCollision();  
  checkPortal();   
});

onInput("d", () => {
  playerSprite.x += 1;
  checkCollision();  
  checkPortal();   
});

// Initialize the game
setLevel();
