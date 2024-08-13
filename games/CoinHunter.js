/*
@title: Coin Hunter
@author: Daniyal Shaikh
@tags: []
@addedOn: 08/08/2024
*/

const player = "p";
const coin = "c";

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ coin, bitmap`
................
................
.......0000.....
.....0222200....
....022222220...
...02222222220..
...02222222220..
....022222220...
.....0222220....
......02220.....
.......000......
................
................
................
................
................` ]
);

setSolids([player]);

const levels = [
  map`
p.........
..........
..........
..........
..........
..........`,
];

setMap(levels[0]);

setPushables({
  [player]: []
});

let score = 0;
let timeLeft = 70; // 60 seconds timer

// Display the initial score and time left
addText(`Score: ${score}`, { x: 1, y: 1 });
addText(`Time: ${timeLeft}`, { x: 10, y: 1 });

function spawnCoin() {
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 6);
  addSprite(x, y, coin);
}

// Spawn a coin every second
const coinSpawn = setInterval(spawnCoin, 1000);

// Update the timer every second
const timer = setInterval(() => {
  timeLeft -= 1;
  clearText(); // Clear the previous text
  addText(`Score: ${score}`, { x: 1, y: 1 });
  addText(`Time: ${timeLeft}`, { x: 10, y: 1 });

  if (timeLeft <= 0) {
    clearInterval(timer);
    clearInterval(coinSpawn); // Stop spawning coins
    addText(`Game Over! Final Score: ${score}`, { x: 1, y: 2 });
  }
}, 1000);

// Player movement
onInput("w", () => {
  const playerSprite = getFirst(player);
  if (playerSprite) playerSprite.y -= 1;
});

onInput("a", () => {
  const playerSprite = getFirst(player);
  if (playerSprite) playerSprite.x -= 1;
});

onInput("s", () => {
  const playerSprite = getFirst(player);
  if (playerSprite) playerSprite.y += 1;
});

onInput("d", () => {
  const playerSprite = getFirst(player);
  if (playerSprite) playerSprite.x += 1;
});

afterInput(() => {
  const playerSprite = getFirst(player);
  if (playerSprite) {
    const coins = getAll(coin);
    
    // Check if the player is on the same spot as a coin
    coins.forEach((c) => {
      if (c.x === playerSprite.x && c.y === playerSprite.y) {
        score += 1;
        // Remove only the coin, not the player
        clearTile(c.x, c.y);
        addSprite(playerSprite.x, playerSprite.y, player);
      }
    });

    // Update the score display
    clearText();
    addText(`Score: ${score}`, { x: 1, y: 1 });
    addText(`Time: ${timeLeft}`, { x: 10, y: 1 });
  }
});
