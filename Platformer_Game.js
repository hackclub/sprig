/*
@title: Platformer_Game
@author: Adya
@tags: []
@addedOn: 2024-31-07
*/

const player = "p";
const platform = "x";
const path = "y";
const goal = "g";
const enemy = "e";
const powerUp = "u";
const coin = "c";
const spike = "s";
const movingPlatform = "m";

setLegend(
  [player, bitmap`
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.0.0..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................`],
  [platform, bitmap`
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
  [path, bitmap`
DDDDDDDDDDDDDDDD
D0000DDD000DDDDD
D00DDDDDD000DDDD
D0DDDDDDDDD000DD
DD0DDD0DDD00000D
DDD0D000DDD0000D
D0DDD000DDD0000D
D0DDDDD0D0D0000D
D0DD0DDD00D0000D
D0DD0DDD0DD0000D
D00DDDDDD0D0000D
D000DDDDD0D0000D
D000DDDDD0D0000D
D000000DDDDDD00D
D00000000D000DDD
DDDDDDDDDDDDDDDD`],
  [goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................`],
  [enemy, bitmap`
................
................
................
....111111......
...11....11.....
...1......1.....
...1.......1....
...1.......1....
...1.......1....
...11......1....
....1......1....
....11....11....
.....111111.....
................
................
................`],
  [powerUp, bitmap`
................
................
................
....222222......
...22....22.....
...2......2.....
...2.......2....
...2.......2....
...2.......2....
...22......2....
....2......2....
....22....22....
.....222222.....
................
................
................`],
  [coin, bitmap`
................
................
................
.....6666.......
....66FF66......
....6F66666.....
....6F66666.....
....6666666.....
....6F66666.....
....666666......
......666.......
................
................
................
................
................`],
  [spike, bitmap`
................
................
........3.......
.......333......
......33333.....
.....3333333....
................
................
................
................`],
  [movingPlatform, bitmap`
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

let level = 0;

const levels = [
  map`
p..c...............
..y..xp............
..y..xyp.....u..s..
..y..xyyp......ss.g
..y..xyp...e..sss..
..y..xyp.....ssss..
..y..xyyp...sssss..
..y..xyyp..ssssss..
xxxyyxyyppssssssss.`,
  map`
p...............
..y.............
..y..xyp........
..y..xyp.....u..
..y..xyyp....g.
..y..xyp.......
..y..xyp......s
..y..xyyp......
..y..xyyp......
..y..xyyp......
..y..xyyp......
..y..xyyp......
..y..xyp..u....
..y..xyp.......
ssyss..sss.sss..
xxxxxxxxxxxxxxxx`,
  map`
p...............
..y.............
..y..xyp........
..y..xypp....u..
..y..xyyp....g.
..y..xyp.......
..y..xyp.......
..y..xyyp......
..y..xyyp......
..y..xyyp......
..y..xyyp......
..y..xyyp......
..y..xyp..m....
..y..xyp.......
..y.............
xxxxxxxxxxxxxxxx`,
  map`
p...............
..yss...........
..y..xyp.....u.
..y..xypp...ss.
..y..xyyp...sg.
..y..xyp....s.s
..y..xyp.....ss
..y..xyyp......
..y..xyyp......
..y..xyyp......
..y..xyyp......
..y..xyypsss...
..y..xyp.sms...
..y..xyp.sss...
ssyss..s...s.ss.
xxxxxxxxxxxxxxxx`,
  map`
p...............
..yss.......ss..
..yssxyp.....ss
..ys.xyp......g
..yssxyp...s...
..y..xyp...ssss
..y.sxyp.......
..y..xyp.......
..yssxyp.......
..y.sxyp.......
..y.sxypp......
..y.sxypp......
..y.sxypp......
..ys............
..ys............
ppysssss.ss.ss.s
xxxxxxxxxxxxxxxx`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, platform, path, movingPlatform]);

setPushables({
  [player]: []
});

onInput("w", () => {
  getFirst(player).y -= 1; // Jump
});

onInput("a", () => {
  getFirst(player).x -= 1; // Move left
});

onInput("d", () => {
  getFirst(player).x += 1; // Move right
});

setInterval(() => {
  const p = getFirst(player);
  if (p && !getTile(p.x, p.y + 1).some(t => t.type === platform || t.type === movingPlatform)) {
    p.y += 1; // Apply gravity
  }
}, 100);

afterInput(() => {
  const p = getFirst(player);
  if (p && getTile(p.x, p.y).some(t => t.type === goal)) {
    level += 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
  }
});

// Power-Up Effects
afterInput(() => {
  const p = getFirst(player);
  if (p && getTile(p.x, p.y).some(t => t.type === powerUp)) {
    // Example: Speed Boost
    p.speed = 2;
    setTimeout(() => {
      p.speed = 1;
    }, 5000); // Speed boost lasts for 5 seconds
  }
});

// Collecting Coins
let score = 0;
afterInput(() => {
  const p = getFirst(player);
  if (p && getTile(p.x, p.y).some(t => t.type === coin)) {
    score += 10;
    // Remove all coins from the tile
    getTile(p.x, p.y).forEach(t => {
      if (t.type === coin) t.remove();
    });
    // Visual feedback for collecting coins
    addText(`Score: ${score}`, { x: 1, y: 1, color: color`3` });
  }
});

// Enemy Movement
setInterval(() => {
  getAll(enemy).forEach(e => {
    e.x += 1;
    if (e.x >= 15) e.x = 0; // Loop enemy movement
  });
}, 500);

// Spike Trap
afterInput(() => {
  const p = getFirst(player);
  if (p && getTile(p.x, p.y).some(t => t.type === spike)) {
    // Example: Reduce player's health or trigger game over
    setMap(currentLevel);
  }
});

// Moving Platforms
setInterval(() => {
  getAll(movingPlatform).forEach(mp => {
    mp.x += 1;
    if (mp.x >= 15) mp.x = 0; // Loop moving platform movement
  });
}, 1000);

// Additional Power-Ups
afterInput(() => {
  const p = getFirst(player);
  if (p && getTile(p.x, p.y).some(t => t.type === powerUp)) {
    // Example: Invincibility
    p.invincible = true;
    setTimeout(() => {
      p.invincible = false;
    }, 5000); // Invincibility lasts for 5 seconds
  }
});

// Enhanced Enemy Behavior
setInterval(() => {
  getAll(enemy).forEach(e => {
    e.x += (Math.random() > 0.5 ? 1 : -1); // Random horizontal movement
    e.y += (Math.random() > 0.5 ? 1 : -1); // Random vertical movement
    if (e.x < 0) e.x = 0;
    if (e.x >= 15) e.x = 14;
    if (e.y < 0) e.y = 0;
    if (e.y >= 15) e.y = 14;
  });
}, 500);

// Interactive Elements
afterInput(() => {
  const p = getFirst(player);
  if (p && getTile(p.x, p.y).some(t => t.type === platform)) {
    // Example: Breakable blocks
    getTile(p.x, p.y).forEach(t => {
      if (t.type === platform) t.remove();
    });
  }
});

// Visual and Audio Feedback
function playSound(sound) {
  // Placeholder function for playing sound effects
  console.log(`Playing sound: ${sound}`);
}

afterInput(() => {
  const p = getFirst(player);
  if (p && getTile(p.x, p.y).some(t => t.type === coin)) {
    playSound('coin');
    addText(`Score: ${score}`, { x: 1, y: 1, color: color`3` });
  }
  if (p && getTile(p.x, p.y).some(t => t.type === powerUp)) {
    playSound('powerUp');
  }
  if (p && getTile(p.x, p.y).some(t => t.type === spike)) {
    playSound('spike');
  }
});

// Difficulty Levels
const difficultyLevels = [
  { gravity: 1, enemySpeed: 500 },
  { gravity: 2, enemySpeed: 400 },
  { gravity: 3, enemySpeed: 300 }
];

let currentDifficulty = 0;

setInterval(() => {
  const p = getFirst(player);
  if (p) {
    p.y += difficultyLevels[currentDifficulty].gravity; // Apply gravity based on difficulty
  }
}, 100);

setInterval(() => {
  getAll(enemy).forEach(e => {
    e.x += (Math.random() > 0.5 ? 1 : -1);
    e.y += (Math.random() > 0.5 ? 1 : -1);
    if (e.x < 0) e.x = 0;
    if (e.x >= 15) e.x = 14;
    if (e.y < 0) e.y = 0;
    if (e.y >= 15) e.y = 14;
  });
}, difficultyLevels[currentDifficulty].enemySpeed);

// Increase difficulty as levels progress
afterInput(() => {
  const p = getFirst(player);
  if (p && getTile(p.x, p.y).some(t => t.type === goal)) {
    level += 1;
    currentDifficulty = Math.min(currentDifficulty + 1, difficultyLevels.length - 1);
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
  }
});

// Background Music
function playBackgroundMusic() {
  // Placeholder function for playing background music
  console.log('Playing background music');
}

playBackgroundMusic();

// Game Over Screen
function gameOver() {
  addText('Game Over', { x: 5, y: 7, color: color`2` });
  setTimeout(() => {
    level = 0;
    currentDifficulty = 0;
    setMap(levels[level]);
  }, 3000); // Restart game after 3 seconds
}

// Check for Game Over Condition
afterInput(() => {
  const p = getFirst(player);
  if (p && getTile(p.x, p.y).some(t => t.type === spike) && !p.invincible) {
    gameOver();
  }
});

