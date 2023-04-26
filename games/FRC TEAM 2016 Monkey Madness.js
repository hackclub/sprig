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
54.54545454545455: b5-54.54545454545455 + g5-54.54545454545455 + e5-54.54545454545455 + g4-54.54545454545455 + e4-54.54545454545455,
54.54545454545455: d4-54.54545454545455 + a4-54.54545454545455 + e5-54.54545454545455 + g5-54.54545454545455 + a5-54.54545454545455,
54.54545454545455: d4-54.54545454545455 + g4-54.54545454545455 + f4-54.54545454545455 + d5-54.54545454545455 + g5-54.54545454545455,
54.54545454545455: g5-54.54545454545455 + e5-54.54545454545455 + b4-54.54545454545455 + f4-54.54545454545455 + d4-54.54545454545455,
1527.2727272727273`
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
250: e5-250 + b4^250 + g5^250 + e4/250,
250,
250: e5-250 + g5^250 + e4/250,
250: d5-250 + c4/250,
250: e5-250 + g5^250 + b4^250,
250: g5-250 + a4^250 + c4/250,
250: a5-250,
250: c4/250,
250: e5-250 + b4^250 + g5^250 + e4/250,
250,
250: e5-250 + g5^250 + e4/250,
250: d5-250 + b4^250 + d4/250,
250: e5-250 + a4^250 + g5^250,
250: d5-250 + b4^250 + d4/250,
250: b4-250,
250: d5-250 + a4^250 + d4/250,
250: e5-250 + b4^250 + g5^250 + e4/250,
250,
250: e5-250 + g5^250 + e4/250,
250: d5-250 + c4/250,
250: e5-250 + b4^250 + g5^250,
250: g5-250 + c4/250,
250: a5-250,
250: c4/250,
250: b5-250 + a4^250 + d4/250,
250,
250: a5-250 + a4^250 + d4/250,
250: g5-250 + b4^250 + b5^250 + e4/250,
250: e5-250 + g5^250,
250,
250: d5-250 + a4^250,
250`

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
.33...........33
.3.3.........3.3
.3..3.......3..3
.3...3.....3...3
..3...3.3.3...3.
...3....3....3..
...3.3333333.3..
....3...3...3...
........3.......
........3.......
........3.......
........3.......
........3.......
........3.......
........3.......`],
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
