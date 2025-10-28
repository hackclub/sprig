/*
@title: Mister Surfer Pro
@author: Prashanta Bhusal
@description: Advanced endless runner with waves, reefs, clouds, and hoverboard effects. Jump, duck, dodge, and surf as far as you can!
@tags: [endless, action, surfing, arcade]
@addedOn: 2025-10-15
*/

/*
Controls:
  L = Start
  W = Jump
  K = Restart
*/


 // Jump sound melody
const jumpMelody = tune`
179.64071856287424: E5^179.64071856287424 + G5~179.64071856287424,
179.64071856287424: C6^179.64071856287424`;

// Game over melody
const gameOverMelody = tune`
174.41860465116278: C4/174.41860465116278,
174.41860465116278: D4/174.41860465116278,
174.41860465116278: E4/174.41860465116278,
174.41860465116278: E4/174.41860465116278,
174.41860465116278: D4-174.41860465116278,
174.41860465116278: C4-174.41860465116278,
4534.883720930232`;

// Coin collect sound
const coinMelody = tune`
100: C6^100,
100: E6^100,
100: G6^100`;

// High score sound
const highScoreMelody = tune`
200: C6^200,
200: D6^200,
200: E6^200,
200: G6^200`;

const PLAYER = "p";
const SKY = "s";
const WAVE = "w";
const REEF = "r";
const ROCK = "o";
const CLOUD = "c";
const COIN = "x";

let vy = 0;
const JUMP_V = -8;
const GRAVITY = 1;
const MAX_FALL = 8;

let score = 0;
let highScore = 0;
let speed = 120; // Start slow
let gameOver = true;
let spawnRate = 0.15; // Start with slow spawn

setLegend(
  [PLAYER, bitmap`
................
...00...00......
....0...0.......
....00000.......
...0777770......
...0707070......
..077777770.....
..077777770.....
..077666770.....
...0777770......
...0000000......
....00..00......
....0....0......
................
................
................`],
  [SKY, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [WAVE, bitmap`
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
0CCCCC0CCCCCCCCC
CCCCCC0CCCC0C0CC
CCCCCCCCCCCCCCCC
C0CC0CCC0CCCC0CC
CCCCCCCCC0CCCCCC`],
  [REEF, bitmap`
................
................
................
................
................
....C.CCC.C.....
....CC0CCC0.....
....CCCCCCC.....
.....CC0CCC.....
....CCCCCC......
....CCCCCCC.....
....CC.CC0C.....
................
................
................`],
  [ROCK, bitmap`
................
................
................
................
.....0000.......
....000000......
...00000400.....
..0000000000....
.000040000000...
00000000040000..
.000000000000...
..0000400000....
...40000000.....
................
................
................`],
  [CLOUD, bitmap`
................
................
................
...11111........
..1CCCCC1.......
.1CCCCCCC1......
..1CCCCC1.......
...1CCC1........
....111.........
................
................
................
................
................
................`],
  [COIN, bitmap`
................
....5555........
...5FFFF5.......
...5FFFF5.......
....5555........
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

setBackground(SKY);
setSolids([PLAYER]);

const levels = [
  map`
ssssssss
psssssss
wwwwwwww`
];

let level = 0;
setMap(levels[level]);

setPushables({
  [PLAYER]: []
});

// --- Physics ---
function physicsTick() {
  const player = getFirst(PLAYER);
  if (!player) return;

  player.y += Math.sign(vy);
  vy += GRAVITY;
  if (vy > MAX_FALL) vy = MAX_FALL;

  if (player.y > 2) {
    player.y = 2;
    vy = 0;
  }

  if (!gameOver) setTimeout(physicsTick, 30);
}

// --- Game Loop ---
function gameLoop() {
  const player = getFirst(PLAYER);
  if (!player) return;

  // Move all objects
  const allObjects = [
    ...(getAll(REEF) || []),
    ...(getAll(ROCK) || []),
    ...(getAll(CLOUD) || []),
    ...(getAll(COIN) || [])
  ];

  allObjects.forEach((o) => {
    if (o.x <= 0) {
      o.remove();
      if (![CLOUD, COIN].includes(o.type)) score += 1;
    } else {
      o.x -= 1;
    }
  });

  // Spawn obstacles
  if (Math.random() < spawnRate) {
    const type = Math.random();
    if (type < 0.7) {
      if (Math.random() < 0.6) addSprite(width() - 1, 2, REEF);
      else addSprite(width() - 1, 2, ROCK);
    }
  }

  // Spawn clouds
  if (Math.random() < 0.05) addSprite(width() - 1, 0, CLOUD);

  // Spawn coins
  if (Math.random() < 0.08) addSprite(width() - 1, 1 + Math.floor(Math.random() * 2), COIN);

  // Collision detection
  const px = player.x;
  const py = player.y;
  let collided = false;

  const obstacles = [
    ...(getAll(REEF) || []),
    ...(getAll(ROCK) || [])
  ];

  obstacles.forEach((o) => {
    if (o.x === px && o.y === py) collided = true;
  });

  if (tilesWith(REEF, PLAYER).length > 0 || tilesWith(ROCK, PLAYER).length > 0) {
    collided = true;
  }

  if (collided) {
    onLost();
    return;
  }

  // Collect coins
  const coins = getAll(COIN) || [];
  coins.forEach((coin) => {
    if (coin.x === px && coin.y === py) {
      coin.remove();
      score += 5; // Each coin gives 5 points
      playTune(coinMelody); // Coin collect sound
    }
  });

  if (score < 20) {
  speed = 200;       // slow
  spawnRate = 0.10;
} else if (score < 50) {
  speed = 150;       // medium
  spawnRate = 0.19;
} else {
  speed = 120;       // fast
  spawnRate = 0.20;
}


  // Display score
  clearText();
  addText(`Score: ${score}`, { x: 0, y: 0, color: color`4` });

  if (!gameOver) setTimeout(gameLoop, speed);
}

// --- Input handlers ---
onInput("l", () => { if (gameOver) startGame(); });
onInput("w", () => {
  const player = getFirst(PLAYER);
  if (!player) return;
  if (player.y === 2) {
    vy = JUMP_V;
    playTune(jumpMelody); // Jump sound
  }
});
onInput("k", () => { if (gameOver) startGame(); });

// --- Game Over ---
function onLost() {
  gameOver = true;
  clearText();
  addText(`GAME OVER`, { x: 3, y: 3, color: color`4` });
  addText(`Score: ${score}`, { x: 4, y: 5, color: color`6` });

  if (score > highScore) {
    highScore = score;
    addText(`NEW HIGH SCORE!`, { x: 2, y: 7, color: color`3` });
    playTune(highScoreMelody); // High score sound
  }

  addText(`Press K to restart`, { x: 1, y: 9, color: color`6` });
  playTune(gameOverMelody);

  setMap(map`
ssssssssssss
ssssssssssss
ssssssssssss
ssssssssssss
ssssssssssss
ssssssssssss
pwwwwwwwwwww`);
}

// --- Start Game ---
function startGame() {
  gameOver = false;
  score = 0;
  vy = 0;
  speed = 120; 
  spawnRate = 0.15;
  clearText();

  level = 0;
  setMap(levels[level]);

  getAll(REEF).forEach((s) => s.remove());
  getAll(ROCK).forEach((s) => s.remove());
  getAll(CLOUD).forEach((s) => s.remove());
  getAll(COIN).forEach((s) => s.remove());

  const p = getFirst(PLAYER);
  if (p) {
    p.x = 1;
    p.y = 2;
  }

  physicsTick();
  gameLoop();
}

// --- Main Menu ---
function showMainMenu() {
  gameOver = true;
  clearText();
  addText(`MISTER SURFER PRO`, { x: 0, y: 2, color: color`4` });
  addText(`Neon Surf Edition`, { x: 1, y: 4, color: color`6` });
  addText(`W = Jump`, { x: 4, y: 6, color: color`2` });
  addText(`Collect Coins!`, { x: 4, y: 7, color: color`2` });
  addText(`Press L to Start`, { x: 2, y: 9, color: color`7` });
  addText(`High Score: ${highScore}`, { x: 0, y: 10, color: color`5` });
}

showMainMenu();

