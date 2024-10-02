/*
@title: Galactic Coconuts
@author: kcoderhtml (@kieran on slack)
@tags: ['action']
@addedOn: 2023-10-30
Keys: 
- J to fire
- A to move left
- D to move right
- L to mute
Objective: 
- Get the highest score you can by moving forward,
shooting normal coconuts for 2 points,
and running into or shooting the golden coconuts for
1.5 times the score decreased by 0.9x every 75 tiles.
*/

// Define sprites
const player = "p";
const coconut = "s";
const goldenCoconut = "C";
const dart = "d";
const borderBottom = "b";
const borderCornerLeft = "l";
const borderTop = "t";
const borderCornerRight = "r";
const borderTopCornerLeft = "L";
const borderTopCornerRight = "R";
const coolDownBar = "c";
const livesBar = "h";
const background = "B";
const muteIcon = "m";

setLegend(
  [ player, bitmap`
................
................
................
................
................
......3333......
.....3L00L3.....
......3003......
......3003......
.....333333.....
.....333333.....
.....333333.....
.....333333.....
.....333333.....
.....333333.....
.....303303.....` ],
  [ coconut, bitmap`
........C.......
...00CCC00C0....
.CC0CCC0CCC0C...
.CC0CC00CC0CC...
.CC0CCCC000CC.C.
C0C0CCC0CCCC00C.
C0C0CCC0CCCC00C.
C0C0CCC0CCC0C0C.
0CC00CC0CCC0CC..
0CCC0CC0CCC0CC..
0C0C0CC0CCC0CC..
.C0C0CC0CCCCCC..
.00CC0C00CCCC...
.00CC0CC0CCCC...
...C00CC00CC....
....CCCC.C......` ],
  [ dart, bitmap`
......3333......
......3D43......
......34D3......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......` ],
  [ borderBottom, bitmap`
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
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ borderCornerLeft, bitmap`
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ borderTop, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
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
................` ],
  [ borderCornerRight, bitmap`
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ borderTopCornerRight, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL` ],
  [ borderTopCornerLeft, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............` ],
  [ coolDownBar, bitmap`
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
.99999999999999.
9999999999999999
D99999999999999D
D99999999999999D
9999999999999999
.99999999999999.` ],
  [ livesBar, bitmap`
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
..333333333333..
.33333333333333.
3333333333333333
3333333333333333
.33333333333333.
..333333333333..` ],
  [ goldenCoconut, bitmap`
................
....66666666....
...6669696696...
..966666666666..
.66696696966696.
.66666666669666.
.69696966666966.
.66696666696696.
.66966966966666.
.66966669666696.
.66696966669666.
.66696666696666.
..666969696666..
...6666696696...
....69666666....
................` ],
  [ background, bitmap`
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
0000000000000000` ],
  [ muteIcon, bitmap`
................
........33333333
....3333.....33.
...3.........3..
...3......33333.
..3......3.3....
..3.....333.....
.3......33...33.
.3.....333...333
.3.....33.....3.
.33.....3.......
..3....3.33..3..
...33.3...333...
.....333........
.....3..33333333
....3...........` ],
);

setSolids([player]);

// Sounds
const loseLife = tune`
348.83720930232556: G4~348.83720930232556,
348.83720930232556: F4~348.83720930232556,
348.83720930232556: E4~348.83720930232556,
10116.27906976744`;
const loseGame = tune`
750: G5~750 + F5^750,
750: E5~750 + D5^750,
750: C5~750 + B4^750,
750: C4/750,
750: C4/750,
750: C4/750,
19500`;
const winGame = tune`
319.1489361702128: C4/319.1489361702128 + E4~319.1489361702128 + A4~319.1489361702128,
319.1489361702128: E4/319.1489361702128 + G4-319.1489361702128,
319.1489361702128: F4~319.1489361702128 + A4~319.1489361702128 + D4~319.1489361702128,
319.1489361702128: G4/319.1489361702128 + B4-319.1489361702128,
319.1489361702128: F4~319.1489361702128,
319.1489361702128: C4/319.1489361702128 + E4-319.1489361702128 + A4~319.1489361702128,
319.1489361702128: E4/319.1489361702128 + G4-319.1489361702128,
319.1489361702128: F4/319.1489361702128 + A4~319.1489361702128,
319.1489361702128: G4/319.1489361702128 + B4-319.1489361702128 + D4~319.1489361702128,
319.1489361702128: E4~319.1489361702128 + G4-319.1489361702128,
319.1489361702128: C4/319.1489361702128 + E4-319.1489361702128 + F4~319.1489361702128,
319.1489361702128: E4/319.1489361702128 + G4-319.1489361702128 + B4~319.1489361702128,
319.1489361702128: D4/319.1489361702128 + F4-319.1489361702128 + G4~319.1489361702128,
319.1489361702128,
319.1489361702128: A4~319.1489361702128,
319.1489361702128: E4/319.1489361702128 + G4-319.1489361702128 + C4~319.1489361702128,
319.1489361702128: E4/319.1489361702128 + G4-319.1489361702128,
319.1489361702128: D4/319.1489361702128 + F4-319.1489361702128,
319.1489361702128: C4/319.1489361702128 + E4-319.1489361702128 + A4~319.1489361702128,
319.1489361702128: D4/319.1489361702128 + F4-319.1489361702128,
319.1489361702128: E4~319.1489361702128 + G4-319.1489361702128,
319.1489361702128: F4/319.1489361702128 + A4~319.1489361702128,
319.1489361702128: G4/319.1489361702128 + B4-319.1489361702128,
2872.340425531915`;
const fire = tune`
140.18691588785046,
140.18691588785046: C4~140.18691588785046,
4205.607476635514`;
const cash = tune`
116.73151750972762: G5~116.73151750972762,
116.73151750972762: A5~116.73151750972762,
116.73151750972762: B5~116.73151750972762,
3385.214007782101`;

// Vars
let gameRunning = false;
let gameOver = false;
let muted = false;
// score
let score = 0;
let winScore = 1000;
let distance = 0;
// dart
let dartCooldown = 0;
const dartMaxCooldown = 4;
// lives
let lives = 3;
let maxLives = 3;
// Speed
let speedInterval = 75;
let incrementSpeed = 50;
let startSpeed = 350;
// Coconuts
const goldenCoconutChance = 0.95;
let goldenCoconutMultiplier = 1.5;

// Levels
let level = 0;
const levels = [
  map`
LtttttttttttttR
lbbbbbbbbbbbbbr
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............`
];

setMap(levels[level]);
setBackground(background);

// controls

onInput("w", () => {
  if (!gameRunning) {
    if (gameOver) {
      startScreen();
    }
    else {
      startSpeed = 250;
      winScore = 850;
      speedInterval = 100;
      start();
    }
  }
});

onInput("s", () => {
  if (!gameRunning) {
    if (gameOver) {
      startScreen();
    }
    else {
      startSpeed = 250;
      winScore = 850;
      speedInterval = 100;
      start();
    }
  }
});

onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1;
  }
  else {
    if (gameOver) {
      startScreen();
    }
    else {
      start();
    }
  }
});

onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1;
  }
  else {
    if (gameOver) {
      startScreen();
    }
    else {
      startSpeed = 300;
      winScore = 950;
      speedInterval = 85;
      start();
    }
  }
});

onInput("i", () => {
  if (gameRunning) {
    spawnDart();
  }
  else {
    if (gameOver) {
      startScreen();
    }
    else {
      startSpeed = 250;
      winScore = 850;
      speedInterval = 100;
      start();
    }
  }
});

onInput("j", () => {
  if (gameRunning) {
    spawnDart();
  }
  else {
    if (gameOver) {
      startScreen();
    }
    else {
      startSpeed = 250;
      winScore = 850;
      speedInterval = 100;
      start();
    }
  }
});

onInput("k", () => {
  if (!gameRunning) {
    if (gameOver) {
      startScreen();
    }
    else {
      startSpeed = 250;
      winScore = 850;
      speedInterval = 100;
      start();
    }
  }
});

onInput("l", () => {
  if (gameRunning) {
    if (!muted) {
      muted = true;
      addSprite(14, 11, muteIcon);
    }
    else {
      muted = false;
      clearTile(14, 11);
    }
  }
  else {
    if (gameOver) {
      startScreen();
    }
    else {
      start();
    }
  }
});

// Muted Logic
function playSound(tune) {
  if (!muted) {
    playTune(tune);
  }
}

// Dart Code
function spawnDart() {
  if (dartCooldown < 1) {
    playSound(fire);
    dartCooldown = dartMaxCooldown;
    let player_pos = getFirst(player);
    addSprite(player_pos.x, player_pos.y, dart);
    for (let i = 0; i < dartMaxCooldown; i++) {
      addSprite(4+i, 0, coolDownBar);
    }
  }
}

function moveDart() {  
  let darts = getAll(dart);
 
  for (let i = 0; i < darts.length; i++) {
    darts[i].y -= 1;
  }
}

// Dart cooldownBar
function refreshCooldownBar() {
  if (dartCooldown > 0) {
    clearTile(dartCooldown+3, 0);
    addSprite(dartCooldown+3, 0, borderTop);
    dartCooldown -= 1;
  }
}

// Lives Bar
function refreshLivesBar() {
  if (lives == maxLives) {
    for (let i = 0; i < lives; i++) {
      addSprite(11+i, 0, livesBar);
    }
  }
  else {
    clearTile(11+lives, 0);
    addSprite(11+lives, 0, borderTop);
  }
}

// coconut Code

function moveCoconut() {
  let coconuts = getAll(coconut);
  let goldenCoconuts = getAll(goldenCoconut);
 
  for (let i = 0; i < coconuts.length; i++) {
    coconuts[i].y += 1;
  }
  for (let i = 0; i < goldenCoconuts.length; i++) {
    goldenCoconuts[i].y += 1;
  }
}

function removeCoconut() {
  let coconuts = getAll(coconut);
  let goldenCoconuts = getAll(goldenCoconut);
 
  for (let i = 0; i < coconuts.length; i++) {
    if (coconuts[i].y == height() - 1) {
      coconuts[i].remove();
    }
  }
  for (let i = 0; i < goldenCoconuts.length; i++) {
    if (goldenCoconuts[i].y == height() - 1) {
      goldenCoconuts[i].remove();
    }
  }
}

function spawnCoconut() {
  for (let i = 0; i < 1 + Math.floor(Math.random() * distance / 60); i++) {
    let x = Math.floor(Math.random() * width());
    let y = 2;
    if (Math.random() > goldenCoconutChance) {
      addSprite(x, y, goldenCoconut);
    }
    else {
      addSprite(x, y, coconut);
    }
  }
}

// Hit check
function hit() {
  let darts = getAll(dart);

  let coconutHit = tilesWith(coconut, dart);
  let goldenCoconutHit = tilesWith(goldenCoconut, dart);

  for (let i = 0; i < coconutHit.length; i++) {
    for (let n = 0; n < coconutHit[i].length; n++) {
      coconutHit[i][n].remove();
      score ++;
    }
  }
  for (let i = 0; i < goldenCoconutHit.length; i++) {
    for (let n = 0; n < goldenCoconutHit[i].length; n++) {
      goldenCoconutHit[i][n].remove();
      score = Math.floor(score * 1.25);
      playSound(cash);
    }
  }
  
  for (let i = 0; i < darts.length; i++) {
    if (darts[i].y == 1) {
      darts[i].remove();
    }
  }
}

// kill logic
function killed() {
  if (tilesWith(coconut, player).length != 0) {
    return true;
  }
}

function golden() {
  if (tilesWith(goldenCoconut, player).length != 0) {
    return true;
  }
}

function clearScreen() {
  let coconuts = getAll(coconut);
  for (let i = 0; i < coconuts.length; i++) {
    coconuts[i].remove();
  }
  let goldenCoconuts = getAll(goldenCoconut);
  for (let i = 0; i < goldenCoconuts.length; i++) {
    goldenCoconuts[i].remove();
  }
  let thePlayer = getFirst(player);
  thePlayer.remove();
}

// Gameloop
function gameLoop(tps) {
  var tick = setInterval(() => {
  distance ++;
  refreshCooldownBar();
  moveDart();
  hit();
  moveCoconut();
  hit();
  removeCoconut();
  spawnCoconut();
  if (killed()) {
    if (lives < 1) {
      playSound(loseGame);
      clearInterval(tick);
      gameRunning = false;
      gameOver = true;
      clearScreen();
      addText("Game Over!", {
        x: 5,
        y: 6,
        color: color`3`
      });
    }
    else {
      lives -= 1;
      playSound(loseLife);
      if (score < 100) {
        score = 0;
      }
      else {
        score -= 100;
      }
      refreshLivesBar();
    }
  }
  else {
      if (score > winScore) {
        clearInterval(tick);
        clearText();
        addText("" + score, {
          x: 1,
          y: 1,
          color: color`9`
        });
        clearScreen();
        addText("You won!", {
          x: 6,
          y: 7,
          color: color`9`
        });
        playSound(winGame);
        gameRunning = false;
    }
    else {
      score ++;
      clearText();
      addText("" + score, {
        x: 1,
        y: 1,
        color: color`9`
      });
    }
    if (golden()) {
      score = Math.floor(score * goldenCoconutMultiplier);
      playSound(cash);
    }
    if (distance % speedInterval == 0) {
      clearInterval(tick);
      goldenCoconutMultiplier *= 0.9;
      gameLoop(startSpeed - (incrementSpeed*distance/speedInterval));
    }
  }
}, tps);
}

// Start screen
function startScreen() {
  clearText();
  lives = 3;
  score = 0;
  distance = 0;
  gameOver = false;
  addText("Falling Coconuts", {
    x: 2,
    y: 1,
    color: color`9`
  });
  addText("a kcoderhtml game", {
    x: 1,
    y: 3,
    color: color`4`
  });
  addText("Avoid the falling\ncoconuts and shoot\nboth coconuts.\nThe golden coconuts\ngive a x1.5 bonus", {
    x: 1,
    y: 5,
    color: color`9`
  });
  addText("(a,d) for movement\nj to shoot", {
    x: 1,
    y: 11,
    color: color`4`
  });
  addText("(a,d,j) lvl sel", {
    x: 1,
    y: 14,
    color: color`3`
  });
}

function start() {
  clearText();
  gameRunning = true;
  addSprite(7,10,player);
  refreshLivesBar();
  gameLoop(startSpeed);
}

startScreen();
