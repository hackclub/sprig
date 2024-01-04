//
/*
@title: Space War
@addedOn: 05 - 01 - 2023
@By Vineet Papnai *.*
@ d , a  for movement right and left respectedly  ;)
@ press 'i'  for shooting :-)
@ press 'J' to restart
@ Happy playing :D
*/

const player = "p"
const laser = "l"
const crash1 = "1"
const crash2 = "2"
const crash3 = "3"
const enemy = "e"
const background = "b"
const wall = "m"

const laserSFX = tune`
500: D4/500,
15500`
const crashSFX = tune`
86.95652173913044: B5-86.95652173913044 + G5-86.95652173913044 + E5-86.95652173913044 + G4-86.95652173913044,
86.95652173913044: A4-86.95652173913044 + E5-86.95652173913044 + G5-86.95652173913044 + A5-86.95652173913044,
86.95652173913044: G4-86.95652173913044 + F4-86.95652173913044 + D5-86.95652173913044 + G5-86.95652173913044,
86.95652173913044: E5-86.95652173913044 + F4-86.95652173913044,
86.95652173913044,
86.95652173913044: A4-86.95652173913044 + D5~86.95652173913044,
86.95652173913044: C5~86.95652173913044 + D5~86.95652173913044,
86.95652173913044: C5~86.95652173913044,
86.95652173913044: C5~86.95652173913044 + B4~86.95652173913044 + A4~86.95652173913044 + G4~86.95652173913044 + F4~86.95652173913044,
86.95652173913044: B4~86.95652173913044 + A4~86.95652173913044 + G4~86.95652173913044 + E4~86.95652173913044 + D4~86.95652173913044,
86.95652173913044: G4~86.95652173913044 + F4~86.95652173913044 + E4~86.95652173913044 + D4~86.95652173913044 + C4~86.95652173913044,
86.95652173913044: E4~86.95652173913044 + D4~86.95652173913044 + C4~86.95652173913044,
86.95652173913044: C4~86.95652173913044,
86.95652173913044: C4~86.95652173913044,
86.95652173913044: C4~86.95652173913044,
86.95652173913044: C4~86.95652173913044,
1391.304347826087`
const crashSFXold = tune`
133.33333333333334,
133.33333333333334: B4-133.33333333333334,
133.33333333333334: C5-133.33333333333334,
133.33333333333334: B4-133.33333333333334,
133.33333333333334: F5/133.33333333333334,
133.33333333333334: G5/133.33333333333334,
133.33333333333334: A5/133.33333333333334,
133.33333333333334: B5/133.33333333333334,
133.33333333333334: B5-133.33333333333334,
133.33333333333334: B5-133.33333333333334,
2933.3333333333335`
const levelUpSFX = tune`
90.6344410876133: C5-90.6344410876133,
90.6344410876133: E5-90.6344410876133,
90.6344410876133: G5-90.6344410876133,
90.6344410876133: E5-90.6344410876133,
90.6344410876133: C5-90.6344410876133,
2447.129909365559`

setLegend(
  [ player, bitmap`
................
.......11.......
......1111......
......1771......
......1111......
......1111......
......1001......
......1001......
......1001......
.....111111.....
....13333331....
...1111111111...
..133333333331..
..111111111111..
.0..0.1111..0.0.
.....011110.....`],
  [ laser, bitmap`
.......33.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
................
................
................
................
................
................
................
................
................`],
  [ crash1,  bitmap`
.........9......
..99.....9.....9
.9999.999999999.
...9999999999...
..999933339699..
..993339993669..
.9993939936669..
.9933663933669..
.99396339933399.
.99336333933369.
.99393333966396.
..9339399966696.
..9999993966699.
.99999..999999..
...99..99....99.
.99...99......9.`],
  [ crash2,  bitmap`
..............99
..9....9........
................
.......996699...
....9..9.99999..
.9..9999993999..
..999993333.99..
..9.9963333369..
....99933333399.
..999.633333399.
.....966666699..
...9..3999999...
................
.9..............
.......99....99.
.9....99......9.`],
  [ crash3,  bitmap`
................
................
................
.......9966.....
.......9.99.99..
.........9......
......93.....9..
......633..3....
....99933....99.
...........3.99.
.....9666666.9..
...9..399999....
................
................
.......99....9..
................`],
  [ enemy, bitmap`
..66........66..
....66....66....
......6..6......
...6666666666...
6..6HHHHHHHH6..6
6.6HHHHHHHHHH6.6
6.6HHHHHHHHHH6.6
6.6HH22HH22HH6.6
.66HH22HH22HH66.
..6HHHHHHHHHH6..
..6HHHHHHHHHH6..
...6HHHHHHHH6...
....66666666....
.....6....6.....
...666....666...
...6........6...`],
  [ background, bitmap`
7000000000000000
0000000500000007
0000000000000000
0000000000500000
0000070000000000
0000000000000050
0700000000000000
0000000000000000
0000005000000000
0000000007000000
0000000000000000
0050000000000000
0000000000000000
0000000000000050
0000070000500000
0000000000000000`]

);

setBackground(background)

setSolids([]);

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

// main game varsjj
var laserAllowed = true
var shootingSpeed = 500
var enemyDelay = 1500
var enemyAllowed = true
var enemySpeed = 300
var enemyMovingAllowed = true
var score = 0
var hiScore = 0
var playerExploded = false

function reset() {
  setMap(levels[0]);
  laserAllowed = true
  shootingSpeed = 500
  enemyDelay = 1000
  enemySpeed = 300
  score = 0   
  playerExploded = false
  clearText()
}

onInput("l", () => {
  
});

onInput("j", () => {
  reset()
});

onInput("a", () => {
  if (!playerExploded) {
    getFirst(player).x -= 1
  }
});

onInput("d", () => {
  if (!playerExploded) {
    getFirst(player).x += 1
  }
});

onInput("i", () => {
  if (!playerExploded && laserAllowed) {
    laserAllowed = false
    var laserTimer = setTimeout(function(){ laserAllowed = true }, shootingSpeed)
    playTune(laserSFX)
    playTune(laserSFX)
    playTune(laserSFX)
    addSprite(getFirst(player).x, 8, laser)
  }
});

function checkELCollision() {
  for (var i = 0; !playerExploded && i < tilesWith(enemy, laser).length; i++) {
    score++
    var storex = tilesWith(enemy, laser)[i][0].x
    var storey = tilesWith(enemy, laser)[i][0].y
    clearTile(storex, storey)
    addSprite(storex, storey, crash1)
    playTune(crashSFX)
    playTune(crashSFX)
    // check for level up
    if (score >= 0 && score % 10 == 0) {
      playTune(levelUpSFX)
      playTune(levelUpSFX)
      playTune(levelUpSFX)
      enemySpeed -= 50
      if (score >= 0 && score % 10 == 0) {
        enemyDelay -= 50
      }
    }
  }
}

// main game loop every 60ms
setInterval(function() {
  // draw score at center of screen
  addText("SCORE " + score + "  HI " + hiScore, { 
    x: 10 - Math.round((("SCORE " + score + "  HI " + hiScore).length) / 2),
    y: 0,
    color: color`2`
  })

  // remove enemies at bottom of screen
  for (var i = 0; i < getAll(enemy).length; i++) {
    if (getAll(enemy)[i].y > 7) {
      getAll(enemy)[i].remove()
    }
  }
  
  // game over animation and reset prompt
  if (playerExploded) {
    clearText()
    addText("  Game Over!\n\n\n\n\n   Press J\n  to restart", { 
      x: 3,
      y: 6,
      color: color`3`
    })
  }
  
  // remove old crashes
  for (var i = 0; i < getAll(crash2).length; i++) {
    getAll(crash2)[i].remove()
  }
  
  // animate crash
  for (var i = 0; i < getAll(crash1).length; i++) {
    getAll(crash1)[i].type = crash2
  }

  // move laser, remove if at top of screen
  for (var i = 0; i < getAll(laser).length; i++) {
    if (getAll(laser)[i].y < 1) {
      getAll(laser)[i].remove()
    } else {
      getAll(laser)[i].y -= 1
    }
  }
  
  checkELCollision()

  // move all enemies toward player
  if (!playerExploded && enemyMovingAllowed) {
    for (var i = 0; !playerExploded && i < getAll(enemy).length; i++) {
      getAll(enemy)[i].y++;
      var slope = ((getFirst(player).y - getAll(enemy)[i].y) / (getFirst(player).x - getAll(enemy)[i].x))
      if (Math.round(1 / slope) > 0.8) {
        getAll(enemy)[i].x++;
      } else if (Math.round(1 / slope) < - 0.8) {
        getAll(enemy)[i].x--;
      }
    }
    var enemyTimer = setTimeout(function(){ enemyMovingAllowed = true }, enemySpeed)
    enemyMovingAllowed = false
  }

  // check for player/enemy crash state
  if (!playerExploded && tilesWith(player, enemy).length > 0) {
    playerExploded = true
    var storex = tilesWith(player, enemy)[0][0].x
    var storey = tilesWith(player, enemy)[0][0].y
    clearTile(storex, storey)
    addSprite(storex, storey, crash1)
    playTune(crashSFXold)
    playTune(crashSFXold)
    playTune(crashSFXold)
    playTune(crashSFXold)
  }
  
  checkELCollision()
  
  // add enemy if allowed at random position
  if (!playerExploded && enemyAllowed) {
    addSprite(Math.round(Math.random() * 10), 0, enemy)
    enemyAllowed = false
    setTimeout(function(){ enemyAllowed = true }, enemyDelay)
  }
  
  // update high score
  if (score > hiScore) hiScore = score;
}, 60);