
/* 
@title: FRC_TEAM_2016_Monkey_Madness
@author: Hunter
@tags: ['action']
@addedOn: 2023-04-30
*/

    //By Puppybro11991 aka ANYB0DYTH3R3
const player = "p"
const laser = "l"
const crash1 = "1"
const crash2 = "2"
const enemy = "e"
const background = "b"

const laserSFX = tune`
49.83388704318937: b5^49.83388704318937 + a5^49.83388704318937 + g5^49.83388704318937 + f5^49.83388704318937 + e5^49.83388704318937,
49.83388704318937: a5^49.83388704318937 + g5^49.83388704318937 + f5^49.83388704318937 + e5^49.83388704318937 + d5^49.83388704318937,
49.83388704318937: g5^49.83388704318937 + f5^49.83388704318937 + e5^49.83388704318937 + d5^49.83388704318937 + c5^49.83388704318937,
1445.1827242524917`
const crashSFX = tune`
54.54545454545455: B5-54.54545454545455 + G5-54.54545454545455 + E5-54.54545454545455 + G4-54.54545454545455 + E4-54.54545454545455,
54.54545454545455: D4-54.54545454545455 + A4-54.54545454545455 + E5-54.54545454545455 + G5-54.54545454545455 + A5-54.54545454545455,
54.54545454545455: D4-54.54545454545455 + G4-54.54545454545455 + F4-54.54545454545455 + D5-54.54545454545455 + G5-54.54545454545455,
54.54545454545455: G5-54.54545454545455 + E5-54.54545454545455 + B4-54.54545454545455 + F4-54.54545454545455 + D4-54.54545454545455,
54.54545454545455: F5~54.54545454545455 + G4~54.54545454545455 + E4~54.54545454545455 + C5~54.54545454545455 + A5~54.54545454545455,
54.54545454545455: B5~54.54545454545455 + G5~54.54545454545455 + D5~54.54545454545455 + A4~54.54545454545455 + F4~54.54545454545455,
54.54545454545455: A5~54.54545454545455 + E5~54.54545454545455 + B4~54.54545454545455 + G4~54.54545454545455,
54.54545454545455: B5~54.54545454545455 + F5~54.54545454545455 + C5~54.54545454545455 + A4~54.54545454545455,
54.54545454545455: G5~54.54545454545455 + D5~54.54545454545455 + B4~54.54545454545455,
54.54545454545455: A5~54.54545454545455 + E5~54.54545454545455 + C5~54.54545454545455,
54.54545454545455: B5~54.54545454545455 + F5~54.54545454545455 + D5~54.54545454545455,
54.54545454545455: G5~54.54545454545455 + E5~54.54545454545455,
54.54545454545455: A5~54.54545454545455 + F5~54.54545454545455,
54.54545454545455: B5~54.54545454545455 + G5~54.54545454545455,
54.54545454545455: A5~54.54545454545455,
54.54545454545455: B5~54.54545454545455,
872.7272727272727`
const crashSFXold = tune`
71.42857142857143: a4-71.42857142857143 + b4-71.42857142857143 + c5-71.42857142857143 + d5-71.42857142857143 + e5-71.42857142857143,
71.42857142857143: b4-71.42857142857143 + c5-71.42857142857143 + d5-71.42857142857143 + e5-71.42857142857143 + f5-71.42857142857143,
71.42857142857143: c5-71.42857142857143 + d5-71.42857142857143 + e5-71.42857142857143 + f5-71.42857142857143 + g5-71.42857142857143,
71.42857142857143: d5-71.42857142857143 + e5-71.42857142857143 + f5-71.42857142857143 + g5-71.42857142857143 + a5-71.42857142857143,
71.42857142857143: e5-71.42857142857143 + f5-71.42857142857143 + g5-71.42857142857143 + a5-71.42857142857143 + b5-71.42857142857143,
1928.5714285714287`
const levelUpSFX = tune`
90.6344410876133: c5-90.6344410876133,
90.6344410876133: e5-90.6344410876133,
90.6344410876133: g5-90.6344410876133,
90.6344410876133: e5-90.6344410876133,
90.6344410876133: c5-90.6344410876133,
2447.129909365559`
const music = tune`
250: E5-250 + B4^250 + G5^250 + E4/250 + D5~250,
250: D5~250 + C4/250,
250: E5-250 + G5^250 + E4/250 + D5~250 + C4/250,
250: D5~250 + C4/250,
250: E5-250 + G5^250 + B4^250 + D5~250 + C4/250,
250: G5-250 + A4^250 + C4/250 + D5~250,
250: A5-250 + D5~250 + C4/250,
250: C4/250 + D5~250,
250: E5-250 + B4^250 + G5^250 + E4/250 + D5~250,
250: D5~250 + C4/250,
250: E5-250 + G5^250 + E4/250 + D5~250 + C4/250,
250: D5~250 + B4^250 + D4/250 + C4/250,
250: E5-250 + A4^250 + G5^250 + D5~250 + C4/250,
250: D5~250 + B4^250 + D4/250 + C4/250,
250: B4-250 + D5~250 + C4/250,
250: D5~250 + A4^250 + D4/250 + C4/250,
250: E5-250 + B4^250 + G5^250 + E4/250 + D5~250,
250: D5~250 + C4/250,
250: E5-250 + G5^250 + E4/250 + D5~250 + C4/250,
250: C4/250 + D5~250,
250: E5-250 + B4^250 + G5^250 + D5~250 + C4/250,
250: G5-250 + C4/250 + D5~250,
250: A5-250 + D5~250 + C4/250,
250: C4/250 + D5~250,
250: B5-250 + A4^250 + D4/250 + D5~250 + C4/250,
250: D5~250 + C4/250,
250: A5-250 + A4^250 + D4/250 + D5~250 + C4/250,
250: G5-250 + B4^250 + B5^250 + E4/250 + D5~250,
250: E5-250 + G5^250 + D5~250 + C4/250,
250: D5~250 + C4/250,
250: D5~250 + A4^250 + C4/250,
250: D5~250 + C4/250`

playTune(music, Infinity);

setLegend(
  [ player, bitmap`
....00000.......
..00CCCCC0......
..0FFFFCCC0.....
.0F5FF5FCC00....
.0F5FF5FCCCC0...
0F00FFFFCC2C0...
0FFFF3FFCC200...
00333FFCCCC0....
.0FFFFCCCC0.....
..0CCCCCCCC00...
..0CCCCCCCC00.00
..0FCCCCCCCC0.C0
.00FFCCCCCCC0.C0
.000000CCCCC00C0
.0FF0CCCFFCC0000
..0000000000000.`],
  [ laser, bitmap`
........CCCCC...
........6666....
........66666...
........666666..
.........666666.
..........666666
...........66666
...........66666
...........66666
..........66666.
.........66666..
........66666...
.......66666....
.......6666.....
.......666......
................`],
  [ crash1,  bitmap`
.........9......
..99.....9.....9
.9999.999999999.
...9999999999...
..999999999699..
..999933393669..
.9999333336669..
.9993663333669..
.99396333333399.
.99936333333369.
.99933333366396.
..9996333366696.
..9999933966699.
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
  [ enemy, bitmap`
................
................
................
......5555......
.....555555.....
....55555255....
...5555CC5555...
..555556655555..
..525566555255..
..552665552555..
.33333333333333.
3333333333333333
3333333333333333
.33333333333333.
................
................`],
  [ background, bitmap`
7727777772777772
7777772777777777
2777777777777777
7727777777772772
7777777777777777
7777777777777777
7727777777777277
7777772777277777
2777777777777772
7777777727777777
7727777777772777
7777777777777777
7777277277777772
7777777777727777
7777777777777777
7277777772777777`]
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

// main game vars
var laserAllowed = true
var shootingSpeed = 500
var enemyDelay = 1000
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
    if (score >= 0 && score % 25 == 0) {
      playTune(levelUpSFX)
      playTune(levelUpSFX)
      playTune(levelUpSFX)
      enemySpeed -= 23
      if (score >= 0 && score % 25 == 0) {
        enemyDelay -= 60
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
    addText("  Game Over!\n\nPress J (left)\n  to restart", { 
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
    playTune(crashSFX)
    playTune(crashSFX)
    playTune(crashSFX)
    playTune(crashSFX)
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
