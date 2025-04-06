const player = "p";
const goal = "g";
const obstacle = "o";

setLegend(
  [player, bitmap`
......CCCC......
......0707......
......1000......
......0111......
......7777......
.....777777.....
.....700007.....
.....707707.....
.....707707.....
.....707707.....
.....707707.....
......7777......
......CCCC......
......CCCC......
......CCCC......
......CCCC......`],
  [goal, bitmap`
......000000....
....00CCCCCC00..
.000CCCCCCCCCC00
.0CC0000000000C0
.0CC0CCCCCCCC0C0
.0CC0CCCCCCCC0C0
.0CC0CCCCCCCC0C0
.0CC0CCCCCCCC0C0
.0CC0CCCCCCCC0C0
.0CC0CCCCCC0C0C0
.0CC0CCCCC0000C0
.0CC0CCCCCC0C0C0
.0CC0CCCCCCCC0C0
.0CC0CCCCCCCC0C0
.0CC0CCCCCCCC0C0
.0CC0CCCCCCCC0C0`],
  [obstacle, bitmap`
.....9L9........
......9L9.......
....0009L900....
...00009L3000...
..00000L300000..
.00000L60000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
..000000000000..
...0000000000...
....00000000....`]
);

setSolids([obstacle]);

let level = 0;
const levels = [
  map`
o.ooo.o....o..o.o.oo
o.ooo.o...ooo..o..oo
o.o...ooo.o.o..o..oo
oooooooooooooooooooo
oo....o.o..o..o.o...
oo..oo..o.oo..o.o...
oo.oo..o..o.ooo.oooo
p.....o..........o.g
oo.ooo..ooo.ooo..o.o
oo.....o..o....o.o..
oo.o..o...oooo..ooo.
oo..oo.......oo.....
oooooooooooooooooooo`,
  map`
p.
o.
g.`
];

setMap(levels[level]);

setPushables({
  [player]: []
});

// Function to spawn obstacles
function spawnObstacles() {
  const obstacleCount = 3; // Number of obstacles to spawn
  for (let i = 0; i < obstacleCount; i++) {
    const x = Math.floor(Math.random() * 2); // Random x position
    const y = Math.floor(Math.random() * 2) + 1; // Random y position (1 or 2)
    if (getTile(x, y) === ".") { // Check if the tile is empty
      setTile(x, y, obstacle); // Place the obstacle
    }
  }
}

// Spawn obstacles at the start
spawnObstacles();

// Store the initial position of the player
const initialPosition = { x: 0, y: 0 };

onInput("s", () => {
  movePlayer(0, 1);
});

onInput("w", () => {
  movePlayer(0, -1);
});

onInput("a", () => {
  movePlayer(-1, 0);
});

onInput("d", () => {
  movePlayer(1, 0);
});

function movePlayer(dx, dy) {
  const playerEntity = getFirst(player);
  playerEntity.x += dx;
  playerEntity.y += dy;
  checkWin();
}

function checkWin() {
  const playerPos = getFirst(player);
  const goalPos = getFirst(goal);

  // Check if player reached the goal
  if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
    addText("You reached the goal!", { x: 1, y: 1 });
    // Optionally, you can reset the level or move to the next level
  }

  // Check for collision with obstacles
  const obstaclePos = getAll(obstacle);
  for (let obs of obstaclePos) {
    if (playerPos.x === obs.x && playerPos.y === obs.y) {
      addText("You hit an obstacle! Respawning...", { x: 1, y: 1 });
      respawnPlayer(); // Call the respawn function
      break; // Exit the loop after respawning
    }
  }
}

function respawnPlayer() {
  const playerEntity = getFirst(player);
  playerEntity.x = initialPosition.x; // Reset to initial x position
  playerEntity.y = initialPosition.y; // Reset to initial y position
}

// After