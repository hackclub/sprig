/*
@title: Monkey Bannana
@author: Daivik
@tags: ['humor','action']
@addedOn: 2024-07-23
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/
const player = "p";
const banana = "b";
const banana2 = "n";
const monkey = "m";
const wall = "w";
const powerUp = "u"; // New power-up item

let score = 0; // Initialize the score
let highScore = 0; // Initialize the high score
let hasPowerUp = false; // Track if the player has a power-up

// Define the sprites
setLegend(
  [ player, bitmap`
................
................
................
....3333333.....
....3.....3.....
....3.0.0.3.....
....3.....3.....
....3333333.....
.......3........
.......3........
...333333333....
.......3........
.......3........
......3.3.......
.....3...3......
....3.....3.....`],
  [ banana, bitmap`
................
................
....6666........
....6776........
...667766.......
...677776.......
...67766........
...66666........
....66666.......
....67766.......
...66777766.....
...6777776......
...6776776......
...677666.......
....6666........
................`],
  [ banana2, bitmap`
................
................
....6666........
....6776........
...667766.......
...677776.......
...67766........
...66666........
....66666.......
....67766.......
...66777766.....
...6777776......
...6776776......
...677666.......
....6666........
................`],
  [ monkey, bitmap`
................
................
....5555........
....5775........
...557755.......
...577775.......
...57755........
...55555........
....55555.......
....57755.......
...55777755.....
...5777775......
...5775775......
...577555.......
....5555........
................`],
  [ wall, bitmap`
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
  [ powerUp, bitmap`
................
....5555........
...577775.......
...577775.......
...577775.......
...5555.........
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
................`]
);

setSolids([wall, player]);

let level = 0;
const levels = [
  map`
wbbbbw
w....w
w....w
w....w
w..p.w
wmmmmw`,
  map`
wwwwwww
w.....w
w.p.m.w
w.....w
w.....w
wwwwwww`,
  map`
bbbbbbb
b.....b
b.p...b
b.....b
b.....b
bbbbbbb`,
  map`
p..bbbb
m.mmmm.
bbb.bb.
.mmmmmm
...bbbb
bmmmmmm`,
];

setMap(levels[level]);

setPushables({
  [ player ]: [],
});

// Initialize score and high score displays
let scoreDisplay = addText(`Score: ${score}`, { x: 0, y: 0, color: color`3` });
let highScoreDisplay = addText(`High Score: ${highScore}`, { x: 0, y: 1, color: color`5` });

// Save the previous player position
let prevPlayerPos = { x: 0, y: 0 };

// Movement
onInput("w", () => {
  movePlayer(0, -1);
});

onInput("s", () => {
  movePlayer(0, 1);
});

onInput("d", () => {
  movePlayer(1, 0);
});

onInput("a", () => {
  movePlayer(-1, 0);
});

function movePlayer(dx, dy) {
  const playerPos = getFirst(player);
  prevPlayerPos = { x: playerPos.x, y: playerPos.y }; // Save current position before moving

  playerPos.x += dx;
  playerPos.y += dy;

  if (checkCollisionWithWalls(playerPos)) {
    playerPos.x = prevPlayerPos.x; // Move back to previous position
    playerPos.y = prevPlayerPos.y; // Move back to previous position
    score -= 30; // Deduct score for hitting a wall
    updateScoreDisplay();
  }
}

function checkCollisionWithWalls(pos) {
  const walls = getAll(wall);
  return walls.some(wall => wall.x === pos.x && wall.y === pos.y);
}

function updateScoreDisplay() {
  if (scoreDisplay) {
    scoreDisplay.text = `Score: ${score}`;
  } else {
    scoreDisplay = addText(`Score: ${score}`, { x: 0, y: 0, color: color`3` });
  }
}

// Add a sound effect when collecting a banana
function playCollectSound() {
  playTune(tune`
    100: c5/100,
    100: d5/100,
    100: e5/100`);
}

// Add a sound effect when collecting a power-up
function playPowerUpSound() {
  playTune(tune`
    100: g5/100,
    100: a5/100,
    100: b5/100`);
}

// Banana Collection
afterInput(() => {
  const playerPos = getFirst(player);
  const bananas = getAll(banana);
  const bananas2 = getAll(banana2);
  const powerUps = getAll(powerUp);

  bananas.forEach(banana => {
    if (playerPos.x === banana.x && playerPos.y === banana.y) {
      banana.remove();
      score += 10; // Increase score for collecting a banana
      playCollectSound();
      updateScoreDisplay();
    }
  });

  bananas2.forEach(banana2 => {
    if (playerPos.x === banana2.x && playerPos.y === banana2.y) {
      banana2.remove();
      score += 20; // Increase score for collecting a special banana
      playCollectSound();
      updateScoreDisplay();
    }
  });

  powerUps.forEach(powerUp => {
    if (playerPos.x === powerUp.x && playerPos.y === powerUp.y) {
      powerUp.remove();
      hasPowerUp = true; // Player collects power-up
      score += 50; // Increase score for collecting a power-up
      playPowerUpSound();
      updateScoreDisplay();
      // Power-up lasts for a short duration
      setTimeout(() => {
        hasPowerUp = false;
      }, 5000);
    }
  });

  if (getAll(banana).length === 0 && getAll(banana2).length === 0) {
    level++;
    if (level < levels.length) {
      setMap(levels[level]);
      // Optionally reset score or continue with current score
      // score = 0; // Uncomment this line to reset score when starting a new level
    } else {
      addText(`You win! Final Score: ${score}`, { x: 4, y: 4, color: color`2` });
    }
  }
});

// Add a function to spawn power-ups randomly
function spawnPowerUp() {
  if (Math.random() < 0.1) { // 10% chance to spawn a power-up
    const emptySpaces = getAllEmpty(); // Replace with your method to get empty spaces
    if (emptySpaces.length > 0) {
      const randomPos = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
      addSprite(randomPos.x, randomPos.y, powerUp);
    }
  }
}

// Get all empty spaces on the map
function getAllEmpty() {
  const mapWidth = getWidth();
  const mapHeight = getHeight();
  const occupiedPositions = [...getAll(player), ...getAll(banana), ...getAll(banana2), ...getAll(monkey), ...getAll(wall), ...getAll(powerUp)];
  const emptySpaces = [];

  for (let x = 0; x < mapWidth; x++) {
    for (let y = 0; y < mapHeight; y++) {
      if (!occupiedPositions.some(pos => pos.x === x && pos.y === y)) {
        emptySpaces.push({ x, y });
      }
    }
  }

  return emptySpaces;
}

// Periodically spawn power-ups
setInterval(spawnPowerUp, 10000); // Every 10 seconds
