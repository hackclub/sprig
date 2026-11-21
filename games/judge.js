/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: judge
@description: press a or d to pick whether the left or right number is greater, press s to reset
@author: armaanwithadouble-a
@tags: ['math', 'fast']
@addedOn: 2026-11-20
*/

let gameOver = false
let score = 0
let currNum = 5
let nextNum = Math.floor(Math.random() * 9) + 1
let defaultSpeed = 500
let timerSpeed = defaultSpeed
let timerInterval

while (nextNum === currNum) {
  nextNum = Math.floor(Math.random() * 9) + 1
}

const game = {
  goodOrBad: function(condition) {
    if (gameOver) return
    if (condition) {
      addText("CORRECT", {
        x: 13,
        y: 1,
        color: color`4`
      })
      currNum = nextNum
      nextNum = Math.floor(Math.random() * 9) + 1
      while (nextNum === currNum) {
        nextNum = Math.floor(Math.random() * 9) + 1
      }
      score += 1
      timerSpeed = timerSpeed * 0.95
      game.resetTimer()
    } else {
      addText("  WRONG", {
        x: 13,
        y: 1,
        color: color`3`
      })
      gameOver = true
      clearInterval(timerInterval)
    }
    game.updateNums()
  },

  updateNums: function() {
    addText(score.toString(), {
      x: 0,
      y: 1,
      color: color`0`
    })

    addText(currNum.toString(), {
      x: 7,
      y: 5,
      color: color`3`
    })

    addText(nextNum.toString(), {
      x: 13,
      y: 5,
      color: color`5`
    })
  },

  resetTimer: function() {
    clearInterval(timerInterval)
    for (let i = 0; i < 8; i++) {
      clearTile(i, 4)
      addSprite(i, 4, timerSprite)
    }
    timerInterval = setInterval(() => {
      if (getAll(timerSprite).length > 0) {
        getAll(timerSprite)[getAll(timerSprite).length - 1].remove()
      } else {
        gameOver = true
        addText("TIME UP", {
          x: 13,
          y: 1,
          color: color`3`
        })
      }
    }, timerSpeed)
  }
}

const timerSprite = "t"
setLegend(
  [timerSprite, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
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
................`]
)

game.updateNums()

setMap(map`
........
........
........
........
tttttttt
........
`)

onInput("a", () => {
  game.goodOrBad(nextNum < currNum)
})

onInput("d", () => {
  game.goodOrBad(nextNum > currNum)
})

onInput("s", () => {
  if (gameOver) {
    currNum = 5
    nextNum = Math.floor(Math.random() * 9) + 1

    while (nextNum === currNum) {
      nextNum = Math.floor(Math.random() * 9) + 1
    }

    score = 0
    gameOver = false

    clearText()
    game.updateNums()
    timerSpeed = defaultSpeed
    game.resetTimer()
  }
})

game.resetTimer()
