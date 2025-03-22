/*
@title: Galactic_Assault
@author: Grok (inspired by Yash and whatware)
@tags: ['space', 'shooter', 'advanced']
@addedOn: 2025-03-22
*/

// Game symbols
const player = "p";
const laser = "l";
const enemyStandard = "e";
const enemyFast = "f";
const enemyHeavy = "h";
const powerUpSpeed = "s";
const powerUpShield = "d";
const crash1 = "1";
const crash2 = "2";
const background = "b";

// Audio
const backgroundMusic = tune`
200: E5^200 + B4~200 + G4/200,
200: G5^200 + E5~200,
200: A5^200 + F5/200 + C5~200,
200: B5^200 + G5~200,
200: E5^200 + B4~200 + G4/200,
200: D5^200 + A4/200,
200: F5^200 + C5~200,
200`;
const laserSound = tune`
50: G5^50 + E5^50,
50: A5^50 + F5^50,
100`;
const explosionSound = tune`
75: B4-75 + G4-75 + E4/75,
75: D5-75 + A4-75 + F4/75,
75: G5-75 + E5-75,
150`;
const powerUpSound = tune`
100: C5~100,
100: E5~100,
100: G5~100,
100`;
const victorySound = tune`
150: C5~150,
150: E5~150,
150: G5~150,
150: C6~150,
300`;

setLegend(
  [player, bitmap`
    .......66.......
    ......6336......
    .....630036.....
    ....63022036....
    ...6302222036...
    ..630222220036..
    .63022222220036.
    .30222222222003.
    .02222222222220.
    6022222222222206
    3322222222222233
    3330222222220333
    3333022222203333
    3333302222033333
    .33333200233333.
    ..333333333333..`],
  [laser, bitmap`
    ......6666......
    .....633336.....
    ....63222336....
    ...632222336....
    ..632222222336..
    .6322222223336..
    .6322222223336..
    ..632222223336..
    ...6322223336...
    ....63222336....
    .....633336.....
    ......6666......`],
  [enemyStandard, bitmap`
    ....55555555....
    ...5555555555...
    ..555511115555..
    .55551111115555.
    5555511111155555
    5555511111155555
    5555511111155555
    5555511111155555
    5555511111155555
    5555551111555555
    5555555555555555
    .55555555555555.
    ..555555555555..
    ...5555555555...
    ....55555555....
    .....555555.....`],
  [enemyFast, bitmap`
    .....7777.......
    ....777777......
    ...77111177.....
    ..7711111177....
    .771111111177...
    77111111111777..
    77111111111777..
    77111111111777..
    .771111111177...
    ..7711111177....
    ...77111177.....
    ....777777......
    .....7777.......
    ......77........
    .......7........`],
  [enemyHeavy, bitmap`
    ..999999999999..
    .99999999999999.
    9999999999999999
    9999911111199999
    9999111111119999
    9999111111119999
    9999111111119999
    9999111111119999
    9999111111119999
    9999111111119999
    9999111111119999
    9999911111199999
    9999999999999999
    9999999999999999
    .99999999999999.
    ..999999999999..`],
  [powerUpSpeed, bitmap`
    ....44444444....
    ...4444444444...
    ..444433334444..
    .44443333334444.
    4444333333334444
    4444333333334444
    4444333333334444
    4444333333334444
    4444333333334444
    4444333333334444
    4444333333334444
    .44443333334444.
    ..444433334444..
    ...4444444444...
    ....44444444....
    .....444444.....`],
  [powerUpShield, bitmap`
    ....CCCCCC......
    ...CCCCCCCC.....
    ..CCCC3333CC....
    .CCC333333CCC...
    CC3333333333CC..
    CC3333333333CC..
    C33333333333CCC.
    C33333333333CCC.
    C33333333333CCC.
    C33333333333CCC.
    CC3333333333CC..
    CC3333333333CC..
    .CCC333333CCC...
    ..CCCC3333CC....
    ...CCCCCCCC.....
    ....CCCCCC......`],
  [crash1, bitmap`
    ..9999999999....
    .999999999999...
    99999999999999..
    999933333339999.
    9933333333339999
    9333333333333999
    9333333333333399
    9333333333333399
    9333333333333399
    9333333333333999
    9933333333339999
    999933333339999.
    .9999999999999..
    ..99999999999...
    ...999999999....
    ....9999999.....`],
  [crash2, bitmap`
    .....9999.......
    ....999999......
    ...999..9999....
    ..999....9999...
    .999......9999..
    999........9999.
    99..........999.
    99..........999.
    999........9999.
    .999......9999..
    ..999....9999...
    ...999..9999....
    ....999999......
    .....9999.......
    ......99........
    .......9........`],
  [background, bitmap`
    0000000000000000
    0000000500000000
    0000000000000000
    0005000000005000
    0000000000000000
    0000000000000000
    0000000000500000
    0000000000000000
    0000000000000000
    0000050000000000
    0000000000000000
    0000000000000000
    0050000000000000
    0000000000000000
    0000000000005000
    0000000000000000`]
);

setBackground(background);
playTune(backgroundMusic, Infinity);

setSolids([player]);

let level = 0;
const levels = [
  map`
  ...........
  ...........
  ...........
  ...........
  ...........
  ...........
  ...........
  ...........
  .....p.....`
];
setMap(levels[level]);

// Game variables
let laserAllowed = true;
let shootingSpeed = 500; // Initial shooting delay (ms)
let enemyDelay = 1000;
let enemyAllowed = true;
let enemySpeed = 300;
let enemyMovingAllowed = true;
let score = 0;
let hiScore = 0;
let playerExploded = false;
let lives = 3;
let shieldActive = false;
let wave = 1;
let gameTime = 0; // Tracks time in ms
const maxGameTime = 300000; // 5 minutes in ms
let gameEnded = false;

// Reset game
function resetGame() {
  setMap(levels[0]);
  laserAllowed = true;
  shootingSpeed = 500;
  enemyDelay = 1000;
  enemySpeed = 300;
  score = 0;
  lives = 3;
  shieldActive = false;
  wave = 1;
  gameTime = 0;
  playerExploded = false;
  gameEnded = false;
  clearText();
}

// Handle input
onInput("a", () => {
  if (!playerExploded && !gameEnded) getFirst(player).x -= 1;
});

onInput("d", () => {
  if (!playerExploded && !gameEnded) getFirst(player).x += 1;
});

onInput("w", () => {
  if (!playerExploded && !gameEnded && laserAllowed) {
    laserAllowed = false;
    setTimeout(() => { laserAllowed = true; }, shootingSpeed);
    playTune(laserSound);
    addSprite(getFirst(player).x, 7, laser);
  }
});

onInput("s", () => {
  if (!playerExploded && !gameEnded && !shieldActive && lives > 0) {
    shieldActive = true;
    setTimeout(() => { shieldActive = false; }, 3000); // Shield lasts 3s
  }
});

onInput("i", () => {
  resetGame();
});

// Collision handling
function handleCollisions() {
  const enemyTypes = [enemyStandard, enemyFast, enemyHeavy];
  enemyTypes.forEach(enemy => {
    tilesWith(enemy, laser).forEach(tile => {
      if (!playerExploded && !gameEnded) {
        score += enemy === enemyStandard ? 1 : enemy === enemyFast ? 2 : 3;
        const [x, y] = [tile[0].x, tile[0].y];
        clearTile(x, y);
        addSprite(x, y, crash1);
        playTune(explosionSound);
      }
    });
  });

  if (!playerExploded && !shieldActive && !gameEnded) {
    enemyTypes.forEach(enemy => {
      if (tilesWith(player, enemy).length > 0) {
        lives--;
        const [x, y] = [tilesWith(player, enemy)[0][0].x, tilesWith(player, enemy)[0][0].y];
        clearTile(x, y);
        addSprite(x, y, crash1);
        playTune(explosionSound);
        if (lives > 0) setMap(levels[0]);
        else playerExploded = true;
      }
    });
  }
}

// Power-up handling
function handlePowerUps() {
  if (tilesWith(player, powerUpSpeed).length > 0) {
    const [x, y] = [tilesWith(player, powerUpSpeed)[0][0].x, tilesWith(player, powerUpSpeed)[0][0].y];
    clearTile(x, y);
    shootingSpeed = Math.max(200, shootingSpeed - 100);
    playTune(powerUpSound);
    setTimeout(() => { shootingSpeed += 100; }, 5000);
  }
  if (tilesWith(player, powerUpShield).length > 0) {
    const [x, y] = [tilesWith(player, powerUpShield)[0][0].x, tilesWith(player, powerUpShield)[0][0].y];
    clearTile(x, y);
    lives = Math.min(5, lives + 1); // Max 5 lives
    playTune(powerUpSound);
  }
}

// Main game loop (60ms)
setInterval(() => {
  clearText();
  const timeLeft = Math.max(0, Math.floor((maxGameTime - gameTime) / 1000));
  addText(`SCORE ${score}  HI ${hiScore}  LIVES ${lives}  WAVE ${wave}`, { x: 2, y: 0, color: color`2` });
  addText(`TIME ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`, { x: 2, y: 1, color: color`2` });

  if (!gameEnded && !playerExploded) gameTime += 60; // Increment time

  if (gameTime >= maxGameTime && !gameEnded) {
    gameEnded = true;
    playerExploded = false; // Override death state for victory
    clearText();
    addText("Victory!\nSurvived 5 min\nPress I to\nrestart", { x: 5, y: 6, color: color`7` });
    playTune(victorySound);
    return;
  }

  if (playerExploded && !gameEnded) {
    addText("Game Over!\nPress I to\nrestart", { x: 5, y: 6, color: color`3` });
    return;
  }

  if (gameEnded) return;

  // Move lasers
  getAll(laser).forEach(l => {
    l.y -= 1;
    if (l.y < 0) l.remove();
  });

  // Animate crashes
  getAll(crash1).forEach(c => c.type = crash2);
  getAll(crash2).forEach(c => c.remove());

  // Move enemies
  if (enemyMovingAllowed) {
    [enemyStandard, enemyFast, enemyHeavy].forEach(enemy => {
      getAll(enemy).forEach(e => {
        e.y += enemy === enemyFast ? 2 : 1;
        const slope = (getFirst(player).y - e.y) / (getFirst(player).x - e.x);
        if (Math.abs(1 / slope) > 0.8) e.x += Math.sign(getFirst(player).x - e.x);
        if (e.y > 7) e.remove();
      });
    });
    enemyMovingAllowed = false;
    setTimeout(() => { enemyMovingAllowed = true; }, enemySpeed);
  }

  handleCollisions();
  handlePowerUps();

  // Spawn enemies and power-ups
  if (enemyAllowed) {
    const rand = Math.random();
    const enemyType = rand < 0.5 ? enemyStandard : rand < 0.8 ? enemyFast : enemyHeavy;
    addSprite(Math.round(Math.random() * 10), 0, enemyType);
    if (Math.random() < 0.05) addSprite(Math.round(Math.random() * 10), 0, powerUpSpeed);
    if (Math.random() < 0.03) addSprite(Math.round(Math.random() * 10), 0, powerUpShield);
    enemyAllowed = false;
    setTimeout(() => { enemyAllowed = true; }, enemyDelay);
  }

  // Wave progression and shooting speed increase
  if (score >= wave * 25) {
    wave++;
    enemySpeed = Math.max(150, enemySpeed - 20);
    enemyDelay = Math.max(500, enemyDelay - 50);
  }

  // Increase shooting speed with score
  shootingSpeed = Math.max(100, 500 - Math.floor(score / 5) * 10); // Decrease delay by 10ms every 5 points, min 100ms

  if (score > hiScore) hiScore = score;
}, 60);