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
  S = Duck (toggle)
  K = Restart
*/

const PLAYER = "p";
const SKY = "s";
const WAVE = "w";
const REEF = "r";
const SEAGULL = "b";
const ROCK = "o";
const CLOUD = "c";

let vy = 0;
const JUMP_V = -8;
const GRAVITY = 1;
const MAX_FALL = 8;

let score = 0;
let speed = 140;
let gameOver = true;
let ducking = false;
let spawnRate = 0.15;

setLegend(
  [PLAYER, bitmap`
................
................
................
................
....9999........
...966669.......
...966669.......
..96066069......
..96066069......
..96644669......
...966669.......
...999999.......
....9..9........
...99..99.......
................
................`],

  [SKY, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],

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
................
................
4CCCCCCCCCCCC4CC
CCCCC4CC4CCCCCCC
C4CCCCCCCCCCCC4C`],

  [REEF, bitmap`
................
................
................
................
................
....C.CCC.C.....
....CC4CCC4.....
....CCCCCCC.....
.....CC4CCC.....
....CCCCCC......
....CCCCCCC.....
....CC.CC4C.....
................
................
................
................`],

  [SEAGULL, bitmap`
................
........00......
.......0606.....
......0666660...
.....066666660..
.....0600660....
.....0....0.....
....000000000...
................
................
................
................
................
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
..1LLLLL1.......
.1LLLLLLL1......
..1LLLLL1.......
...1LLL1........
....111.........
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
ssssssss
pwwwwwww`
];

let level = 0;
setMap(levels[level]);

setPushables({
  [PLAYER]: []
});

// physics tick
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

  const delay = Math.max(50, speed - Math.abs(vy) * 6);
  if (!gameOver) setTimeout(physicsTick, delay);
}

// game loop
function gameLoop() {
  const player = getFirst(PLAYER);
  if (!player) return;

  // move obstacles
  getAll(REEF).concat(getAll(ROCK), getAll(SEAGULL), getAll(CLOUD)).forEach((o) => {
    if (o.x <= 0) {
      o.remove();
      if (o.type !== CLOUD) score += 1;
    } else {
      o.x -= 1;
    }
  });

  // spawn obstacles & clouds
  if (Math.random() < spawnRate) {
    const type = Math.random();
    if (type < 0.5) {
      if (Math.random() < 0.6) addSprite(width() - 1, 2, REEF);
      else addSprite(width() - 1, 2, ROCK);
    } else {
      addSprite(width() - 1, 1, SEAGULL);
    }
  }
  // clouds spawn slowly
  if (Math.random() < 0.03) addSprite(width() - 1, 0, CLOUD);

  // collision detection
  const px = player.x;
  const py = player.y;
  let collided = false;

  getAll(REEF).concat(getAll(ROCK), getAll(SEAGULL)).forEach((o) => {
    if (o.x === px && o.y === py) {
      if (o.type === SEAGULL && ducking) return;
      collided = true;
    }
  });

  if (tilesWith(REEF, PLAYER).length > 0 || tilesWith(ROCK, PLAYER).length > 0) collided = true;
  if (tilesWith(SEAGULL, PLAYER).length > 0 && !ducking) collided = true;

  if (collided) {
    onLost();
    return;
  }

  // difficulty scaling
  if (score > 0 && score % 10 === 0) {
    speed = Math.max(80, 140 - Math.floor(score / 10) * 6);
    spawnRate = Math.min(0.35, 0.15 + score * 0.004);
  }

  if (!gameOver) setTimeout(gameLoop, speed);
}

// input handlers
onInput("l", () => {
  if (gameOver) startGame();
});

onInput("w", () => {
  const player = getFirst(PLAYER);
  if (!player) return;
  if (player.y === 2) vy = JUMP_V;
});

onInput("s", () => {
  ducking = !ducking;
  clearText();
  addText(`Score: ${score}`, { x: 0, y: 0, color: color`6` });
  if (ducking) addText(`Duck`, { x: 12, y: 0, color: color`5` });
});

onInput("k", () => {
  if (gameOver) startGame();
});

function onLost() {
  gameOver = true;
  clearText();
  addText(`GAME OVER`, { x: 3, y: 3, color: color`6` });
  addText(`Score: ${score}`, { x: 4, y: 5, color: color`6` });
  addText(`Press K to restart`, { x: 1, y: 7, color: color`6` });

  setMap(map`
ssssssssssss
ssssssssssss
ssssssssssss
ssssssssssss
ssssssssssss
ssssssssssss
ssssssssssss
spssssssssss
wwwwwwwwwwww`);
}

function startGame() {
  gameOver = false;
  score = 0;
  vy = 0;
  ducking = false;
  speed = 140;
  spawnRate = 0.15;
  clearText();

  level = 0;
  setMap(levels[level]);

  getAll(REEF).forEach((s) => s.remove());
  getAll(ROCK).forEach((s) => s.remove());
  getAll(SEAGULL).forEach((s) => s.remove());
  getAll(CLOUD).forEach((s) => s.remove());

  addText(`Score: ${score}`, { x: 0, y: 0, color: color`3` });

  const p = getFirst(PLAYER);
  if (p) {
    p.x = 1;
    p.y = 2;
  }

  physicsTick();
  gameLoop();
}

function showMainMenu() {
  gameOver = true;
  clearText();
  addText(`MISTER SURFER PRO`, { x: 0, y: 2, color: color`6` });
  addText(`Jump (W) / Duck (S)`, { x: 0, y: 5, color: color`5` });
  addText(`Press L to start`, { x: 3, y: 9, color: color`6` });
}

showMainMenu();
