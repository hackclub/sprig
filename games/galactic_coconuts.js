// Define sprites
const player = "p"
const coconut = "s"
const goldenCoconut = "C"
const dart = "d"
const borderBottom = "b"
const borderCornerLeft = "l"
const borderTop = "t"
const borderCornerRight = "r"
const borderTopCornerLeft = "L"
const borderTopCornerRight = "R"
const coolDownBar = "c"
const livesBar = "h"

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
0000000000000000
0000000000000000
0000000000000000` ],
  [ borderCornerLeft, bitmap`
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
0000000000000000
0000000000000000
0000000000000000` ],
  [ borderTop, bitmap`
0000000000000000
0000000000000000
0000000000000000
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
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
0000000000000000
0000000000000000
0000000000000000` ],
  [ borderTopCornerRight, bitmap`
0000000000000000
0000000000000000
0000000000000000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000` ],
  [ borderTopCornerLeft, bitmap`
0000000000000000
0000000000000000
0000000000000000
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............` ],
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
....6666C666....
...66C6C9C6C6...
..96C6C6C666C6..
.C669C9996C6696.
.666C6CC69996C6.
.69C9CC66CC6966.
.6C6966C6C9CC96.
.C69C69C69C6C66.
.6C9C6666C6C696.
.C669666C669C66.
.66C9CC6C696CC6.
..6C699999C666..
...C666C6C69C...
....CC66666C....
................` ]
)

setSolids([player])

// Sounds
const loseLife = tune`
348.83720930232556: G4~348.83720930232556,
348.83720930232556: F4~348.83720930232556,
348.83720930232556: E4~348.83720930232556,
10116.27906976744`
const loseGame = tune`
750: G5~750 + F5^750,
750: E5~750 + D5^750,
750: C5~750 + B4^750,
750: C4/750,
750: C4/750,
750: C4/750,
19500`
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
2872.340425531915`
const fire = tune`
140.18691588785046,
140.18691588785046: C4~140.18691588785046,
4205.607476635514`
const cash = tune`
116.73151750972762: G5~116.73151750972762,
116.73151750972762: A5~116.73151750972762,
116.73151750972762: B5~116.73151750972762,
3385.214007782101`

// Vars
let gameRunning = false
let gameOver = false
let score = 0
let winScore = 1000
let distance = 0
// dart
let dartCooldown = 0
const dartMaxCooldown = 6
// lives
let lives = 3
let maxLives = 3
// Speed
let speedInterval = 75
let incrementSpeed = 50
let startSpeed = 350
// Coconuts
const goldenCoconutChance = 0.95
let goldenCoconutMultiplier = 1.5

// Levels
let level = 0
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
]

setMap(levels[level])

// controls
onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1;
  }
  else {
    if (gameOver) {
      startScreen();
    }
    else {
      start()
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
      start()
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
      start()
    }
  }
});

// Dart Code
function spawnDart() {
  if (dartCooldown < 1) {
    playTune(fire);
    dartCooldown = dartMaxCooldown;
    let player_pos = getFirst(player);
    addSprite(player_pos.x, player_pos.y, dart);
    for (let i = 0; i < dartMaxCooldown - 2; i++) {
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
    dartCooldown -= 1;
    clearTile(dartCooldown+4, 0)
    addSprite(dartCooldown+4, 0, borderTop);
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
      playTune(cash);
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
    return true
  }
}

function golden() {
  if (tilesWith(goldenCoconut, player).length != 0) {
    return true
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
      playTune(loseGame);
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
      playTune(loseLife);
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
        })
        clearScreen();
        addText("You won!", {
          x: 6,
          y: 7,
          color: color`9`
        });
        playTune(winGame);
        gameRunning = false;
    }
    else {
      score ++;
      clearText();
      addText("" + score, {
        x: 1,
        y: 1,
        color: color`9`
      })
    }
    if (golden()) {
      score = Math.floor(score * goldenCoconutMultiplier);
      playTune(cash);
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
  addText("Galactic Coconuts", {
    x: 2,
    y: 1,
    color: color`9`
  });
  addText("a kcoderhtml game", {
    x: 1,
    y: 3,
    color: color`4`
  });
  addText("Avoid the falling\ncoconuts and shoot\nboth coconuts.\nBe sure to shoot\nthe golden coconuts", {
    x: 1,
    y: 5,
    color: color`9`
  });
  addText("(a,d) for movement\nj to shoot", {
    x: 1,
    y: 11,
    color: color`4`
  });
  addText("(a,d,j) start level", {
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