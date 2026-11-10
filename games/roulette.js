/*
@title: roulette
@author: platoshka
@description: pick a color and bet your money!
@tags: ['game', 'casino']
@addedOn: 2026-10-04
*/

const RED = "r"
const BLACK = "b"
const GREEN = "g"
const CURSOR = "c"
const WHEEL = "w"

let w1 = bitmap`
...6666666666...
..660303030366..
.66303030303066.
6633FFFFFFFF0066
600FF......FF336
633F........F006
600F..0000..F336
633F..0660..F006
600F..0660..F336
633F..0000..F006
600F........F336
633FF......FF006
6600FFFFFFFF3366
.660303DD030366.
..66303DD03066..
...6666666666...`

let w2 = bitmap`
...6666666666...
..663030303066..
.66030303030366.
6600FFFFFFFF3366
633FF......FF006
600F........F336
633F..0000..F006
6DDF..0660..F336
6DDF..0660..F006
600F..0000..F336
633F........F006
600FF......FF336
6633FFFFFFFF0066
.66303030303066.
..660303030366..
...6666666666...`

let w3 = bitmap`
...6666666666...
..66030DD30366..
.663030DD303066.
6633FFFFFFFF0066
600FF......FF336
633F........F006
600F..0000..F336
633F..0660..F006
600F..0660..F336
633F..0000..F006
600F........F336
633FF......FF006
6600FFFFFFFF3366
.66030303030366.
..663030303066..
...6666666666...`

let w4 = bitmap`
...6666666666...
..663030303066..
.66030303030366.
6600FFFFFFFF3366
633FF......FF006
600F........F336
633F..0000..F006
600F..0660..FDD6
633F..0660..FDD6
600F..0000..F336
633F........F006
600FF......FF336
6633FFFFFFFF0066
.66303030303066.
..663333030366..
...6666666666...`

let red = bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`

let black = bitmap`
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
0000000000000000`

let green = bitmap`
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
DDDDDDDDDDDDDDDD`

let cursor = bitmap`
................
................
................
.......7........
.......77.......
.777777777......
.7777777777.....
.77777777777....
.77777777777....
.7777777777.....
.777777777......
.......77.......
.......7........
................
................
................`

setLegend(
  [RED, red],
  [BLACK, black],
  [GREEN, green],
  [CURSOR, cursor],
  [WHEEL, w1]
)

setMap(map`
.....
cr...
.b.w.
.g...`)

var money = 100
var bet = 20
var isSpinning = false
var cursorY = 1
var streak = 0
var wheelPos = 0
var gameState = "PLAYING"

function updateUI() {
  clearText()
  addText("MONEY:" + money + " BET:" + bet, { x: 0, y: 0, color: color`4` })
  addText("A/D to bet, K spin", { x: 0, y: 1, color: color`0` })
  addText("W/S to change colors", { x: 0, y: 2, color: color`0` })
}

updateUI()

onInput("w", () => {
  if (gameState == "PLAYING" && !isSpinning) {
    if (cursorY > 1) {
      cursorY = cursorY - 1
      getFirst(CURSOR).y = cursorY
    }
  }
})

onInput("s", () => {
  if (gameState == "PLAYING" && !isSpinning) {
    if (cursorY < 3) {
      cursorY = cursorY + 1
      getFirst(CURSOR).y = cursorY
    }
  }
})

onInput("a", () => {
  if (gameState == "PLAYING" && !isSpinning) {
    if (bet > 10) {
      bet = bet - 10
      updateUI()
    }
  }
})

onInput("d", () => {
  if (gameState == "PLAYING" && !isSpinning) {
    if (bet + 10 <= money) {
      bet = bet + 10
      updateUI()
    }
  }
})

onInput("k", () => {
  if (gameState != "PLAYING") {
    money = 100
    bet = 20
    isSpinning = false
    streak = 0
    cursorY = 1
    gameState = "PLAYING"
    getFirst(CURSOR).y = 1
    updateUI()
    return
  }

  if (isSpinning || money < bet) return

  isSpinning = true
  money = money - bet

  clearText()
  addText("SPINING...", { x: 0, y: 0, color: color`0` })

  var rand = Math.floor(Math.random() * 100)
  var targetColor = "green"
  if (rand < 47) {
    targetColor = "red"
  } else if (rand < 94) {
    targetColor = "black"
  }

  var target = 0
  if (targetColor == "red") target = 0
  if (targetColor == "black") target = 2
  if (targetColor == "green") target = 3

  var stepsToGo = target - wheelPos
  if (stepsToGo < 0) {
    stepsToGo = stepsToGo + 4
  }

  var spinsLeft = 16 + stepsToGo
  var delay = 70

  function doSpin() {
    spinsLeft = spinsLeft - 1
    wheelPos = wheelPos + 1
    if (wheelPos > 3) {
      wheelPos = 0
    }

    if (wheelPos == 0) setLegend([RED, red], [BLACK, black], [GREEN, green], [CURSOR, cursor], [WHEEL, w1])
    if (wheelPos == 1) setLegend([RED, red], [BLACK, black], [GREEN, green], [CURSOR, cursor], [WHEEL, w2])
    if (wheelPos == 2) setLegend([RED, red], [BLACK, black], [GREEN, green], [CURSOR, cursor], [WHEEL, w3])
    if (wheelPos == 3) setLegend([RED, red], [BLACK, black], [GREEN, green], [CURSOR, cursor], [WHEEL, w4])

    playTune(tune`50: c4-2`)

    if (spinsLeft > 0) {
      if (spinsLeft < 6) {
        delay = Math.floor(delay * 1.3)
      }
      setTimeout(doSpin, delay)
    } else {
      checkWin()
    }
  }

  doSpin()
})

function checkWin() {
  var landedOn = ""
  if (wheelPos == 0 || wheelPos == 1) landedOn = "red"
  if (wheelPos == 2) landedOn = "black"
  if (wheelPos == 3) landedOn = "green"

  var playerGuess = ""
  if (cursorY == 1) playerGuess = "red"
  if (cursorY == 2) playerGuess = "black"
  if (cursorY == 3) playerGuess = "green"

  clearText()

  if (playerGuess == landedOn) {
    streak = streak + 1
    var payout = bet * 2
    if (landedOn == "green") payout = bet * 5

    if (streak >= 3) {
      payout = payout * 2
      addText("STREAK BONUS!", { x: 0, y: 1, color: color`6` })
    }

    money = money + payout
    addText("YOU WIN! +" + payout, { x: 0, y: 0, color: color`4` })
    playTune(tune`100: c5-8\n100: e5-8`)
  } else {
    streak = 0
    addText("you loose...", { x: 0, y: 0, color: color`3` })
    playTune(tune`100: e3-10`)
  }

  setTimeout(() => {
    isSpinning = false

    if (money < 10) {
      gameState = "GAMEOVER"
      clearText()
      addText("NO MONEY LEFT", { x: 0, y: 0, color: color`3` })
      addText("GAME OVER", { x: 0, y: 1, color: color`3` })
      addText("press k to reset", { x: 0, y: 3, color: color`0` })
    } else if (money >= 400) {
      gameState = "WON"
      clearText()
      addText("YOU BEAT THE GAME", { x: 0, y: 0, color: color`6` })
      addText("press k to reset", { x: 0, y: 2, color: color`0` })
    } else {
      if (bet > money) {
        bet = money
      }
      updateUI()
    }
  }, 1300)
}
