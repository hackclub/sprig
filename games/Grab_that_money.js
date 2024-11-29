/*
@title: grab_that_money
@author: Dh
@tags: ['multiplayer']
@addedOn: 2024-10-17
*/

/*
Controls:
- WASD to move player
-IJKL for player 2
- first to 3 wins
- game resets when a player wins
*/

// Define the sprites in our game
const player1 = "p"; // Player 1
const player2 = "q"; // Player 2
const goal = "g";
const wall = "w";

// Assign bitmap art to each sprite
setLegend(
  [player1, bitmap`
................
................
................
................
................
...0......0.....
................
.000000000000...
..0...0...0.....
..000000000.....
................
................
................
................
................
................`],
  [player2, bitmap`
................
................
................
................
................
.....0....0.....
................
.000000000000...
..0...0...0.....
..000000000.....
................
................
................
................
................
................`],
  [goal, bitmap`
................
................
................
.....666666.....
....66999966....
....69666696....
....69699696....
....69699696....
....69699696....
....69666696....
....66999966....
.....666666.....
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
0000000000000000`]
);

// Initialize scores
let score1 = 0;
let score2 = 0;
const winningScore = 5; // Winning score threshold

// Create game levels
let level = 0; // This tracks the level we are on
const levels = [
  map`
..p..q
...g..`,
  map`
p..q.
....g`,
  map`
p..g
.wq.`,
  map`
p.q.
...g`,
  map`
...q.
.p...
..g..`,
  map`
p.w.
.g..
....`
];

// Set the map displayed to the current level
setMap(levels[level]);

setSolids([player1, player2, wall]); // Other sprites cannot go inside of these sprites

// Inputs for player 1 movement control
onInput("s", () => {
  getFirst(player1).y += 1; // Positive y is downwards
});

onInput("d", () => {
  getFirst(player1).x += 1;
});

// Inputs for player 2 movement control
onInput("k", () => {
  getFirst(player2).y += 1; // Positive y is downwards
});

onInput("l", () => {
  getFirst(player2).x += 1;
});

// Input to reset level
onInput("j", () => {
  resetLevel();
});

// These get run after every input
afterInput(() => {
  // Check if Player 1 reaches the goal
  if (tilesWith(goal, player1).length > 0) {
    score1++;
    addText(`Player 1 Score: ${score1}`, { y: 0, color: color`3` });
    resetLevel();
  }

  // Check if Player 2 reaches the goal
  if (tilesWith(goal, player2).length > 0) {
    score2++;
    addText(`Player 2 Score: ${score2}`, { y: 0, color: color`3` });
    resetLevel();
  }

  // Check if either player has reached the winning score
  if (score1 >= winningScore) {
    addText("Player 1 Wins!", { y: 4, color: color`3` });
    endGame();
  } else if (score2 >= winningScore) {
    addText("Player 2 Wins!", { y: 4, color: color`3` });
    endGame();
  }
});

// Reset the level
function resetLevel() {
  // Set the map displayed to the current level
  setMap(levels[level]);
  
  // Reset player positions
  getFirst(player1).x = 0; // Reset Player 1 to start position
  getFirst(player1).y = 0;
  getFirst(player2).x = 1; // Reset Player 2 to start position
  getFirst(player2).y = 0;
}

// End the game
function endGame() {
  // Disable further inputs or actions
  clearText("");
  addText("Game Over! Refresh to Play Again", { y: 4, color: color`3` });
}
