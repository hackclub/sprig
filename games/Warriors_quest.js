/*
@author: The-UnknownHacker
@title: The Warrior's Quest
@tags: ['puzzle', 'platformer']
@addedOn: 2024-11-25
*/


// USE W,A,S,D to move and find the right coin
// Only one coin will work and the other ones are fake
// Enjoy





// Define sprite keys using numbers
const player = "1"; // Player represented by 1
const wall = "2";   // Wall represented by 2
const coin = "3";   // Coin represented by 3
const white_block = "4"; // White block represented by 4
const goal = "5";   // Goal represented by 5
const side_wall = "6"; // Side wall represented by 6
const corner_top_right = "7"; // Corner top right
const corner_top_left = "8";  // Corner top left
const corner_bottom_right = "9"; // Corner bottom right
const corner_bottom_left = "w"; // Corner bottom left
const trick_goal = "e";





// Set the legend for the game sprites
setLegend(
  [player, bitmap`
HHHH33000033HHHH
HHH0330000330HHH
HH000CCCCCC000HH
H00CCLLLLLLCC00H
000CLLLLLLLLC000
00CLLLLLLLLLLC00
00CLLLLLLLLLLC00
00CLLLL44LLLLC00
00CLLLL44LLLLC00
00CLLLLLLLLLLC00
00CLLLLLLLLLLC00
03CCLLLLLLLLC330
H33CCLLLLLLCC33H
HH333CCCCCC333HH
HH333333333333HH
HHHH33333333HHHH`], // Player sprite (simple square)
  [wall, bitmap`
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....`], // Wall sprite
  [coin, bitmap`
...0666666660...
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
0666666666666660
006666666666660.
.0066666666660..
..006666666600..
...0000000000...`], // Coin sprite
  [white_block, bitmap`
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
..22222222222222`], // White block sprite
  [goal, bitmap`
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
................`], // Goal sprite
  [trick_goal, bitmap`
....06666660....
...6666666666...
..666666666666..
.66666666666666.
6666666666666666
6666666666666666
6666666666666666
6666666006666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
0666666666666660
.06666666666660.
..0666666666600.
...0000000000...`], // Goal sprite

  [side_wall, bitmap`
................
................
................
................
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
................
................
................
................`], // Side Wall sprite
  [corner_top_right, bitmap`
................
................
................
................
000000000000....
000000000000....
000000000000....
000000000000....
000000000000....
000000000000....
000000000000....
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....`], // Corner Top Right sprite
  [corner_top_left, bitmap`
................
................
................
................
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....`], // Corner Top Left sprite
  [corner_bottom_right, bitmap`
....00000000....
....00000000....
....00000000....
....00000000....
000000000000....
00000000000H....
000000000000....
000000000000....
000000000000....
000000000000....
000000000000....
................
................
................
................
................`], // Corner Bottom Right spritesddd
  [corner_bottom_left, bitmap`
....00000000....
....00000000....
....00000000....
....00000000....
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
................
................
................
................
................`], // Corner Bottom Left sprawdte
);

// Set the background to the white block
setBackground(white_block);

// Define 5 levels, each with a single coin
const levels = [
  map`
8686766666666667
232e2..........2
252.2.8667.....2
2525.52.e2.e...2
25w66695895586.2
25..5555w6669..2
25.5555555555..2
25..555555555512
25..5555555555.2
2566666755867..2
2555e252..2e...2
25555552..w69..2
255552e2.......2
w666666666666669`,
  
  map`
866666666666667
2..2...2...2.32
2..2.2.2.2.2.22
2..2.2.2.252522
2..252525252522
2.5252525252522
21.252525252.22
2..252525252522
255252525252522
2..252525252522
2..252.2.252522
2..2.2.2.2.2.22
2....2...2...22
w66666666666699`,

  map`
8666666666666667
21..22.........2
2.2.22....2....2
2.2.22....2....2
2.2.22....2....2
2.2.22....2....2
2.2.22....2....2
2.2.22.3..2....2
2.2.2666662....2
2.2.2...2......2
2.2.2.2.2.2....2
2.2.2.2.2.2....2
2.2...2...2....2
w666666666666669`,

  map`
86666666666666667
218667...8667...2
2.2222.2.2222.2.2
2.2222.2.2869.2.2
2.2222.2.22...2.2
2.2222.2.22.862.2
2.2222.2.22.222.2
2.w669.2.22.222.2
2......2.22.222.2
26666669.22.222.2
2........22.222.2
2..86666692.w69.2
2..w6666669.2...2
2...........2.222
26666666666623222
w6666666666666669`,

  map`
1..............
.86666666666666
.2.............
.w66666666.2.7.
...........2.2.
86666666666952.
2............9.
2.8666666666664
2.2............
2.2............
2.2............
2.8666666666664
2e23..........e
w6w666666666669`
];

// Initialize current level index
let level = 0;
let canMove = false; // Flag to control movement

// Set player and wall as solid objects, including side wall
setSolids([player, wall, side_wall]);

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
  }, 1000); // Delay for 3 seconds
}

// Initialize the first level
startLevel();

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
