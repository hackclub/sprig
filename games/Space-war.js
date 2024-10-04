
/* 
@title: Space-war
@author: Yash
@tags: []
@addedOn: 2023-10-02
*/

    /*

  Game: Space War
  Author: Yash
  
*/

// Symbols for game elements
const playerSymbol = "p";          // Player's spaceship
const laserSymbol = "l";           // Laser beam
const crash1Symbol = "1";          // Explosion animation frame 1
const crash2Symbol = "2";          // Explosion animation frame 2
const enemySymbol = "e";           // Enemy spaceship
const backgroundSymbol = "b";      // Background

// Background music
const backgroundMusic = tune`
149.2537313432836: E5~149.2537313432836 + B4~149.2537313432836,
149.2537313432836: E5~149.2537313432836,
149.2537313432836,
149.2537313432836: A4~149.2537313432836,
149.2537313432836: A4~149.2537313432836 + D5~149.2537313432836,
149.2537313432836: F5~149.2537313432836,
298.5074626865672,
// More musical notes...
149.2537313432836: G4^149.2537313432836,
149.2537313432836
`;

// Explosion sound effect
const explosionSound = tune`
98.6842105263158,
49.3421052631579: E4-49.3421052631579 + F4-49.3421052631579,
49.3421052631579: F4-49.3421052631579,
49.3421052631579: F4-49.3421052631579 + B4^49.3421052631579 + E4/49.3421052631579 + G5/49.3421052631579,
49.3421052631579: F4-49.3421052631579 + G4-49.3421052631579 + B4^49.3421052631579 + D4/49.3421052631579 + E4/49.3421052631579,
49.3421052631579: G4-49.3421052631579 + A4-49.3421052631579 + C5^49.3421052631579 + E4/49.3421052631579 + G5/49.3421052631579,
49.3421052631579: A4-49.3421052631579 + D5^49.3421052631579 + E4/49.3421052631579 + G5/49.3421052631579 + A5/49.3421052631579,
49.3421052631579: B4-49.3421052631579 + D5^49.3421052631579 + F4/49.3421052631579 + A5/49.3421052631579,
49.3421052631579: B4-49.3421052631579 + D5^49.3421052631579 + F4/49.3421052631579 + A5/49.3421052631579,
1085.5263157894738`;

// Set up game elements and background
playTune(backgroundMusic, Infinity);

setLegend(
  [playerSymbol, bitmap`
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ........2.......
    .......323......
    .......323......
    ......30203.....
    .....3302033....
    ....333020333...
    ...33220202233..
  `],
  [laserSymbol, bitmap`
    ......3333......
    .......22.......
    .......22.......
    .......22.......
    .......22.......
    .......22.......
    .......22.......
    ......0000......
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
  `],
  [crash1Symbol,  bitmap`
    ....3333333D....
    ..33333333333D.9
    .3333333333333D.
    .3333333333333DD
    333333333333333D
    333333333333333D
    333333333333333D
    333333333333333D
    333333333333333D
    333333333333333D
    333333333333333D
    333333333333333.
    .33333333333339.
    .3333333333333..
    ..3333333333399.
    .99.3333333...9.
  `],
  [crash2Symbol,  bitmap`
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ...99999........
    .33999993.......
    3339999999999...
    33399999999999..
    33399999999999..
    33333399999999..
    33333399999999..
    .333333999999...
  `],
  [enemySymbol, bitmap`
    ...LLLLLLLL.....
    ..LLLLLLLLLL....
    .LLLLL11111LL...
    LLLLL1111111LL..
    LLLLL1111111LL0.
    LLLLL1111111LL0.
    LLLLL1111111LL0.
    LLLLL1111111LL0.
    LLLLLL11111LLL0.
    LLLLLLLLLLLLLL0.
    LLLLLLLLLLLLLL0.
    0LLLLLLLLLLLL00.
    .0LLLLLLLLLL00..
    ..0LLLLLLLL00...
    ....0000000.....
  `],
  [backgroundSymbol, bitmap`
    5050505050505050
    0000000000000000
    5050505050505050
    0000000000000000
    5050505050505050
    0000000000000000
    5050505050505050
    0000000000000000
    5050505050505050
    0000000000000000
    5050505050505050
    0000000000000000
    5050505050505050
    0000000000000000
    5050505050505050
    0000000000000000
  `]
);

setBackground(backgroundSymbol);

setSolids([]);

let level = 0;
const levels = [
  map`
  ...........
  ...........
  ...........
  ...........
  ...........
  ...........
  ...........
  ...........
  .....p.....
  `
];

setMap(levels[level]);

// Main game variables
var isLaserAllowed = true;
var shootingInterval = 500;
var enemySpawnDelay = 1000;
var isEnemyAllowed = true;
var enemySpeed = 300;
var isEnemyMovingAllowed = true;
var score = 0;
var hiScore = 0;
var isPlayerExploded = false;

// Function to reset the game
function resetGame() {
  setMap(levels[0]);
  isLaserAllowed = true;
  shootingInterval = 500;
  enemySpawnDelay = 1000;
  enemySpeed = 300;
  score = 0;
  isPlayerExploded = false;
  clearText();
}

// Handle user input
onInput("i", () => {
  resetGame();
});

onInput("a", () => {
  if (!isPlayerExploded) {
    getFirst(playerSymbol).x -= 1;
  }
});

onInput("d", () => {
  if (!isPlayerExploded) {
    getFirst(playerSymbol).x += 1;
  }
});

onInput("w", () => {
  if (!isPlayerExploded && isLaserAllowed) {
    isLaserAllowed = false;
    var laserTimer = setTimeout(function(){ isLaserAllowed = true; }, shootingInterval);
    addSprite(getFirst(playerSymbol).x, 8, laserSymbol);
  }
});

// Function to handle collisions
function handleCollisions() {
  for (var i = 0; !isPlayerExploded && i < tilesWith(enemySymbol, laserSymbol).length; i++) {
    score++;
    var enemyX = tilesWith(enemySymbol, laserSymbol)[i][0].x;
    var enemyY = tilesWith(enemySymbol, laserSymbol)[i][0].y;
    clearTile(enemyX, enemyY);
    addSprite(enemyX, enemyY, crash1Symbol);
    playTune(explosionSound);
    playTune(explosionSound);
    // Check for level up
    if (score >= 0 && score % 25 === 0) {
      enemySpeed -= 23;
      if (score >= 0 && score % 25 === 0) {
        enemySpawnDelay -= 60;
      }
    }
  }
}

// Main game loop every 60ms
setInterval(function() {
  // Draw score at the center of the screen
  addText("SCORE " + score + "  HI " + hiScore, {
    x: 10 - Math.round(("SCORE " + score + "  HI " + hiScore).length / 2),
    y: 0,
    color: color`2`
  });

  // Remove enemies at the bottom of the screen
  for (var i = 0; i < getAll(enemySymbol).length; i++) {
    if (getAll(enemySymbol)[i].y > 7) {
      getAll(enemySymbol)[i].remove();
    }
  }

  // Game over animation and reset prompt
  if (isPlayerExploded) {
    clearText();
    addText("  Game Over!\n\nPress I to\nrestart \n \n Score:  " + score,  {
      x: 3,
      y: 6,
      color: color`2`
    });
  
  }

  // Remove old crashes
  for (var i = 0; i < getAll(crash2Symbol).length; i++) {
    getAll(crash2Symbol)[i].remove();
  }

  // Animate crash
  for (var i = 0; i < getAll(crash1Symbol).length; i++) {
    getAll(crash1Symbol)[i].type = crash2Symbol;
  }

  // Move laser, remove if at the top of the screen
  for (var i = 0; i < getAll(laserSymbol).length; i++) {
    if (getAll(laserSymbol)[i].y < 1) {
      getAll(laserSymbol)[i].remove();
    } else {
      getAll(laserSymbol)[i].y -= 1;
    }
  }

  handleCollisions();

  // Move all enemies toward the player
  if (!isPlayerExploded && isEnemyMovingAllowed) {
    for (var i = 0; !isPlayerExploded && i < getAll(enemySymbol).length; i++) {
      getAll(enemySymbol)[i].y++;
      var slope = ((getFirst(playerSymbol).y - getAll(enemySymbol)[i].y) / (getFirst(playerSymbol).x - getAll(enemySymbol)[i].x));
      if (Math.round(1 / slope) > 0.8) {
        getAll(enemySymbol)[i].x++;
      } else if (Math.round(1 / slope) < -0.8) {
        getAll(enemySymbol)[i].x--;
      }
    }
    var enemyTimer = setTimeout(function(){ isEnemyMovingAllowed = true; }, enemySpeed);
    isEnemyMovingAllowed = false;
  }

  // Check if you lost
  if (!isPlayerExploded && tilesWith(playerSymbol, enemySymbol).length > 0) {
    isPlayerExploded = true;
    var posX = tilesWith(playerSymbol, enemySymbol)[0][0].x;
    var posY = tilesWith(playerSymbol, enemySymbol)[0][0].y;
    clearTile(posX, posY);
    addSprite(posX, posY, crash1Symbol);
    playTune(explosionSound);
    playTune(explosionSound);
    playTune(explosionSound);
  }

  handleCollisions();

  // Add an enemy if allowed at a random position
  if (!isPlayerExploded && isEnemyAllowed) {
    addSprite(Math.round(Math.random() * 10), 0, enemySymbol);
    isEnemyAllowed = false;
    setTimeout(function(){ isEnemyAllowed = true; }, enemySpawnDelay);
  }

  // Update the high score
  if (score > hiScore) hiScore = score;
}, 60);
