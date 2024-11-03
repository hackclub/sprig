/*
@author: The-UnknownHacker
@title: The Warrior's Quest
@tags: ['puzzle', 'platformer']
@addedOn: 2024-11-2
*/

// Define sprite keys using numbers
const player = "1"; // Player represented by 1
const wall = "2";   // Wall represented by 2
const coin = "3";   // Coin represented by 3
const white_block = "4"; // White block represented by 4
const goal = "5";   // Goal represented by 5

// Set the legend for the game sprites
setLegend(
  [ player, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ], // Player sprite (simple square)
  [ wall, bitmap`
2....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....` ],   // Wall sprite
  [ coin, bitmap`
....66666666....
...6666666666...
..666666666666..
.66666666666666.
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
.66666666666666.
..666666666666..
...6666666666...
....66666666....` ],  // Coin sprite
  [ white_block, bitmap`
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
..22222222222222` ],    // White block sprite
  [ goal, bitmap`
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
................` ] // Goal sprite
);

// Set the background to the white block
setBackground(white_block);

// Define 5 levels, each with a single coin
const levels = [
  map`
22222222
252.2522
2...2.12
23252.52
222.5.22
22222222`,
  
  map`
2222222
2.2...2
1.2.2.2
5.2.2.2
25..232
2222222`,

  map`
22222222
25.....2
21222.22
2.25.2.2
2..3..22
22222222`,

  map`
2222222
21..5.2
2..22.2
2.22..2
25..3.2
2222222`,

  map`
2222222
2522..2
2..1..2
2.2.2.2
23..5.2
2222222`
];

// Initialize current level index
let level = 0;
let canMove = false; // Flag to control movement

// Display the current level number at the start for 3 seconds
function displayLevel() {
  clearText();
  addText(`Level ${level + 1}`, { x: 5, y: 3 });
}

// Set the initial map and display the level for 3 seconds
function startLevel() {
  setMap(levels[level]);
  displayLevel();
  canMove = false; // Prevent movement during display
  
  // Delay for 3 seconds, then allow movement
  setTimeout(() => {
    clearText(); // Clear level display after 3 seconds
    canMove = true; // Enable movement
  }, 1000);
}

// Initialize the first level
startLevel();

// Set player and wall as solid objects
setSolids([ player, wall ]);

// Set pushables (player can push coins)
setPushables({ 
  [player]: [coin] 
});

// Function to switch levels
function goToNextLevel() {
  level += 1;

  if (level < levels.length) {
    startLevel(); // Start the next level
  } else {
    clearText();
    addText("You win!", { y: 4, color: color`7` });
  }
}

// Handle player input for movement (only if canMove is true)
onInput("d", () => {
  if (canMove) {
    const playerSprite = getFirst(player);
    playerSprite.x += 1; // Move right
  }
});

onInput("a", () => {
  if (canMove) {
    const playerSprite = getFirst(player);
    playerSprite.x -= 1; // Move left
  }
});

onInput("w", () => {
  if (canMove) {
    const playerSprite = getFirst(player);
    playerSprite.y -= 1; // Move up
  }
});

onInput("s", () => {
  if (canMove) {
    const playerSprite = getFirst(player);
    playerSprite.y += 1; // Move down
  }
});

// Check if player has collected the coin after each input
afterInput(() => {
  if (canMove) {
    const playerSprite = getFirst(player);
    const coinSprite = getFirst(coin);

    // If player is on the same tile as the coin, switch levels
    if (coinSprite && playerSprite.x === coinSprite.x && playerSprite.y === coinSprite.y) {
      goToNextLevel();
    }
  }
});
