// Define single-character keys for sprites
const player = 'p';
const food = 'f';
const wall = 'w';

// Initialize Sprig and set the legend with one-character keys
setLegend([
  [player, bitmap`
........
....##..
....##..
........
........
....##..
....##..
........
`],
  [food, bitmap`
........
........
..####..
..#..#..
..####..
........
........
........
`],
  [wall, bitmap`
########
########
########
########
########
########
########
########
`]
]);

// Create the game map using the characters defined in the legend
const level = map`
wwwwwwwwwwww
w..........w
w..........w
w..........w
w..........w
w..........w
w..........w
w..........w
wwwwwwwwwwww
`;
setMap(level);  // Load the map into the game

setSolids([wall]);  // Make the wall solid

// Initial position for the player
let playerX = 5;
let playerY = 5;
addSprite(playerX, playerY, player);  // Place player on the map

// Function to randomly place food on the map where there are no other sprites
function placeFood() {
  let x, y;
  do {
    x = Math.floor(Math.random() * (width() - 2)) + 1;
    y = Math.floor(Math.random() * (height() - 2)) + 1;
  } while (getTile(x, y).length !== 0);
  addSprite(x, y, food);
}
placeFood();  // Call function to place the initial food

// Initialize score and display it
let score = 0;
addText("Score: 0", { x: 1, y: 0, color: color`3` });

// Direction handling with 'wasd' inputs
let direction = 'd';  // Initial direction is right
onInput('w', () => { if (direction !== 's') direction = 'w'; });
onInput('a', () => { if (direction !== 'd') direction = 'a'; });
onInput('s', () => { if (direction !== 'w') direction = 's'; });
onInput('d', () => { if (direction !== 'a') direction = 'd'; });

// Function to move the player based on input
function movePlayer() {
  let newX = playerX;
  let newY = playerY;
  switch (direction) {
    case 'w': newY--; break;
    case 'a': newX--; break;
    case 's': newY++; break;
    case 'd': newX++; break;
  }

  // Check for collision with walls or the player itself
  if (tilesWith(player).includes(getTile(newX, newY))) {
    clearText();
    addText("Game Over!", { x: width() / 2 - 4, y: height() / 2, color: color`3` });
    return;  // Stop further execution if collision occurs
  }

  // Move the player sprite to new position
  clearTile(playerX, playerY);
  playerX = newX;
  playerY = newY;
  addSprite(playerX, playerY, player);

  // Check if the player has collected food
  if (tilesWith(food).includes(getTile(playerX, playerY))) {
    score += 1;  // Increase score
    clearTile(playerX, playerY);  // Remove the food sprite
    addText("Score: " + score, { x: 1, y: 0, color: color`3` });  // Update score display
    placeFood();  // Place new food
  }
}

// Continuously handle player movement after each input
afterInput(() => {
  movePlayer();
});
