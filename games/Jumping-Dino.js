/*
@title: Dino Jumps
@description: Chrome dino-style jump game with fireballs, spikes, and star power-up
@author: TopMyster
@tags: ['endless runner', 'arcade']
@addedOn: 2026-05-03
*/

var dino = "d"
var dinoPower = "p"
var fireball = "c"
var spike = "k"
var coin = "n"
var ground = "g"
var sky = "s"
var building = "b"
var house = "h"

setLegend(
  [ dino, bitmap`
................
................
.......444......
.......4.4......
.......444......
......44........
.....4444.......
....4.44........
....4.444444....
.....4444.4.....
......444.......
......4.4.......
.....4..4.......
.....4...4......
......4..4......
................` ],
  [ dinoPower, bitmap`
................
..6...6...6.....
...6.666.6......
.......444......
..6....4.4..6...
.66....444.66...
......44..6.....
.6...4444.......
....4.44........
....4.444444....
.6...4444.4..6..
......444...6...
.6....4.4.......
.....4..4...6...
..6..4...4......
......4..4......` ],
  [ fireball, bitmap`
................
.........96.....
........9966....
.......699369...
......69933669..
......69933369..
.....3699333669.
.....0369933369.
.....0369993369.
.....003699369..
.....003369969..
.....00336999...
......003699....
.......0369.....
........09......
................` ],
  [ spike, bitmap`
................
................
................
................
................
................
................
................
.......11.......
......1001......
.....100001.....
....10000001....
...1000000001...
..100000000001..
.11111111111111.
................` ],
  [ coin, bitmap`
................
.....666666.....
....66666666....
...6669999666...
..666999999666..
..669999999966..
..669996699966..
..669960099966..
..669960099966..
..669996699966..
..669999999966..
..666999999666..
...6669999666...
....66666666....
.....666666.....
................` ],
  [ building, bitmap`
..0000000000....
..0LLLLLLLL0....
..0L17LL17L0....
..0L17LL17L0....
..0LLLLLLLL0....
..0L17LL17L0....
..0L17LL17L0....
..0LLLLLLLL0....
..0L17LL17L0....
..0L17LL17L0....
..0LLLLLLLL0....
..0L17LL17L0....
..0L17LL17L0....
..0LLLLLLLL0....
..0LL0440LL0....
..0LL0440LL0....` ],
  [ house, bitmap`
................
................
................
..........00....
......0000......
.....088880.....
....08888880....
...0888888880...
..00000000000...
..0LLLLLLLL0....
..0L17LL17L0....
..0L17LL17L0....
..0LLL0440L0....
..0LLL0440L0....
..0000000000....
................` ],
  [ ground, bitmap`
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ sky, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ]
)

setSolids([ dino, dinoPower, ground ])

var score = 0
var gameOver = false
var isJumping = false
var jumpStep = 0
var powered = false
var powerTimer = 0
var groundRow = 6
var dinoCol = 1
var POWER_DURATION = 50

var levels = [
  map`
ssssssssss
ssssssssss
ssssssssss
ssssssssss
ssssssssss
ssssssssss
gggggggggg
gggggggggg`
]

setMap(levels[0])

addSprite(dinoCol, groundRow - 1, dino)

addSprite(4, groundRow - 2, building)
addSprite(4, groundRow - 1, building)
addSprite(7, groundRow - 1, house)

function spawnObstacle() {
  if (gameOver) return
  var allFireballs = getAll(fireball)
  var allSpikes = getAll(spike)
  var allCoins = getAll(coin)
  var i
  for (i = 0; i < allFireballs.length; i++) { if (allFireballs[i].x >= 7) return }
  for (i = 0; i < allSpikes.length; i++) { if (allSpikes[i].x >= 7) return }
  for (i = 0; i < allCoins.length; i++) { if (allCoins[i].x >= 7) return }

  var roll = Math.random()
  if (roll < 0.10 && !powered) {
    addSprite(9, groundRow - 2, coin)
  } else if (roll < 0.33) {
    addSprite(9, groundRow - 1, spike)
  } else {
    addSprite(9, groundRow - 1, fireball)
  }
}

onInput("w", function() {
  if (!isJumping && !gameOver) {
    isJumping = true
    jumpStep = 0
  }
})

onInput("i", function() {
  if (!isJumping && !gameOver) {
    isJumping = true
    jumpStep = 0
  }
})

onInput("s", function() {
  if (gameOver) restartGame()
})

onInput("k", function() {
  if (gameOver) restartGame()
})

function restartGame() {
  gameOver = false
  isJumping = false
  jumpStep = 0
  score = 0
  powered = false
  powerTimer = 0
  clearText()
  setMap(levels[0])
  addSprite(dinoCol, groundRow - 1, dino)
  addSprite(4, groundRow - 2, building)
  addSprite(4, groundRow - 1, building)
  addSprite(7, groundRow - 1, house)
}

function getDino() {
  var d = getFirst(dinoPower)
  if (d) return d
  return getFirst(dino)
}

function swapSprite(fromType, toType) {
  var sprite = getFirst(fromType)
  if (!sprite) return
  var sx = sprite.x
  var sy = sprite.y
  sprite.remove()
  addSprite(sx, sy, toType)
}

function activatePower() {
  powered = true
  powerTimer = POWER_DURATION
  swapSprite(dino, dinoPower)
}

function deactivatePower() {
  powered = false
  powerTimer = 0
  swapSprite(dinoPower, dino)
}

function checkCollision() {
  var d = getDino()
  if (!d) return

  var allCoins = getAll(coin)
  var i
  for (i = 0; i < allCoins.length; i++) {
    if (allCoins[i].x === d.x && allCoins[i].y === d.y) {
      allCoins[i].remove()
      activatePower()
      return
    }
  }

  var obstacles = getAll(fireball).concat(getAll(spike))
  for (i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x === d.x && obstacles[i].y === d.y) {
      if (powered) {
        obstacles[i].remove()
        score += 3
      } else {
        gameOver = true
        clearText()
        addText("GAME OVER", { x: 5, y: 3, color: color`3` })
        addText("Score: " + score, { x: 5, y: 5, color: color`0` })
        addText("S to restart", { x: 3, y: 7, color: color`0` })
      }
    }
  }
}

setInterval(function() {
  if (gameOver) return

  var d = getDino()
  if (!d) return

  if (powered) {
    powerTimer--
    if (powerTimer <= 0) {
      deactivatePower()
    }
  }

  if (isJumping) {
    if (jumpStep === 0) d.y = groundRow - 2
    else if (jumpStep === 1) d.y = groundRow - 4
    else if (jumpStep === 2) d.y = groundRow - 4
    else if (jumpStep === 3) d.y = groundRow - 2
    else if (jumpStep === 4) {
      d.y = groundRow - 1
      isJumping = false
    }
    jumpStep++
  }

  var everything = getAll(fireball).concat(getAll(spike)).concat(getAll(coin))
  var i
  for (i = 0; i < everything.length; i++) {
    if (everything[i].x <= 0) {
      var wasObstacle = (everything[i].type !== coin)
      everything[i].remove()
      if (wasObstacle) score++
    } else {
      everything[i].x -= 1
    }
  }

  checkCollision()

  if (!gameOver) {
    clearText()
    if (powered) {
      var secsLeft = Math.ceil(powerTimer / 5)
      addText("STAR POWER " + secsLeft + "s", { x: 0, y: 0, color: color`6` })
      addText("Score: " + score, { x: 0, y: 1, color: color`6` })
    } else {
      addText("Score: " + score, { x: 0, y: 0, color: color`0` })
    }
  }

}, 200)

setInterval(function() {
  if (!gameOver) {
    if (Math.random() < 0.35) {
      spawnObstacle()
    }
  }
}, 1000)
