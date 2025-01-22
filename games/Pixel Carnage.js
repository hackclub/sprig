/*
@title: Pixel Carnage
@author: buzzarc
@tags: []
@addedOn: 2025-01-22
*/


// Define the sprites in the game
const player = "p";
const coin = "c";
const enemy = "e";
const wall = "w";

// Assign bitmap art to each sprite
setLegend(
  [player, bitmap`
................
................
................
.....00.........
....0000........
...00..00.......
..00....00......
...00..00.......
....0000........
.....00.........
................
................
................
................
................
................`],
  [coin, bitmap`
................
................
................
......00........
.....0000.......
.....0..0.......
.....0000.......
......00........
................
................
................
................
................
................
................`],
  [enemy, bitmap`
................
.....0000.......
....0....0......
...0.00.00......
...0.00.00......
....0....0......
.....0000.......
................
................
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
0000000000000000`]
);

// Create the game level
const level = map`
wwwwwwwwwwwwwwww
wp.............w
w...e..........w
w.........c....w
w..............w
w......e.......w
w..............w
w....c.........w
w..............w
w....e.........w
w..............w
w..............w
wwwwwwwwwwwwwwww`;

// Set the map and solid objects
setMap(level);
setSolids([player, wall]);

// Track the score
let score = 0;
addText(`Score: ${score}`, { y: 0, color: color`3` });

// Player movement controls
onInput("w", () => getFirst(player).y -= 1);
onInput("s", () => getFirst(player).y += 1);
onInput("a", () => getFirst(player).x -= 1);
onInput("d", () => getFirst(player).x += 1);

// Collision detection and game logic
afterInput(() => {
  const playerTile = getFirst(player);

  // Check if the player collected a coin
  const coins = tilesWith(coin, player);
  if (coins.length > 0) {
    coins.forEach(tile => tile[0].remove()); // Remove the coin
    score += 1;
    clearText();
    addText(`Score: ${score}`, { y: 0, color: color`3` });
  }

  // Check if the player collided with an enemy
  const enemies = tilesWith(enemy, player);
  if (enemies.length > 0) {
    addText("Game Over!", { y: 6, color: color`2` });
    clearInterval(enemyMovementInterval);
    setTimeout(() => restart(), 2000);
  }

  // Check if all coins are collected
  if (tilesWith(coin).length === 0) {
    addText("You Win!", { y: 6, color: color`4` });
    clearInterval(enemyMovementInterval);
    setTimeout(() => restart(), 2000);
  }
});

// Enemy random movement
const enemyMovementInterval = setInterval(() => {
  const enemies = tilesWith(enemy);
  enemies.forEach(enemyTile => {
    const randomDirection = Math.floor(Math.random() * 4);
    if (randomDirection === 0) enemyTile[0].y -= 1; // Move up
    if (randomDirection === 1) enemyTile[0].y += 1; // Move down
    if (randomDirection === 2) enemyTile[0].x -= 1; // Move left
    if (randomDirection === 3) enemyTile[0].x += 1; // Move right
  });
}, 500);

// Restart the game
function restart() {
  setMap(level); // Reset the map
  score = 0; // Reset the score
  clearText();
  addText(`Score: ${score}`, { y: 0, color: color`3` });
}
