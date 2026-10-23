
/*
@title: Food Hero - Boss Battle
@description: Sammle Essen und kämpfe gegen den Boss!
@author: You
@tags: adventure, boss, food
*/

const P = "p"
const F = "f"
const B = "b"

setLegend(
  [P, bitmap`
................
.......000......
......00000.....
......0.0.0.....
......00000.....
.......000......
......22222.....
.....22.2.22....
.....2..2..2....
........2.......
.......222......
......2...2.....
......2...2.....
.....22...22....
................
................`],

  [F, bitmap`
................
......3333......
.....333333.....
....33333333....
....33333333....
.....333333.....
......3333......
.......33.......
......33........
................
................
................
................
................
................
................`],

  [B, bitmap`
......444444....
.....44444444...
....44......44..
...44..4444..44.
...44..4444..44.
...44........44.
....4444444444..
......444444....
.....44.44.44...
.....44.44.44...
....44..44..44..
....44..44..44..
....44......44..
...44........44.
................
................`]
)

setSolids([])

const gameWidth = 8
const gameHeight = 8

let foodCount = 0
let gameOver = false
let bossMode = false

const player = {x:1, y:1}

const foods = [
  {x:3, y:1},
  {x:5, y:2},
  {x:2, y:4},
  {x:6, y:5},
  {x:4, y:6},
  {x:1, y:6},
  {x:6, y:1},
  {x:4, y:3}
]

const boss = {x:6, y:6}

function same(a, b) {
  return a.x === b.x && a.y === b.y
}

function draw() {
  clearText()

  setMap(map`
........
........
........
........
........
........
........
........`)

  addSprite(player.x, player.y, P)

  for (const f of foods) {
    addSprite(f.x, f.y, F)
  }

  if (!bossMode) {
    addSprite(boss.x, boss.y, B)
  }

  addText("Essen: " + foodCount, {
    x:0, y:0, color:color`2`
  })

  addText("Boss: J druecken", {
    x:0, y:7, color:color`4`
  })
}

function movePlayer(dx, dy) {
  if (gameOver || bossMode) return

  player.x = (player.x + dx + gameWidth) % gameWidth
  player.y = (player.y + dy + gameHeight) % gameHeight

  for (let i = foods.length - 1; i >= 0; i--) {
    if (same(player, foods[i])) {
      foods.splice(i, 1)
      foodCount++
    }
  }

  draw()
}

function fightBoss() {
  if (gameOver || bossMode) return

  if (!same(player, boss)) {
    clearText()

    addText("Geh zum Boss!", {
      x:1, y:3, color:color`3`
    })

    addText("Laufe zum Monster!", {
      x:0, y:5, color:color`4`
    })

    return
  }

  bossMode = true
  clearText()

  if (foodCount >= 5) {
    addText("DU GEWINNST!", {
      x:1, y:3, color:color`3`
    })

    addText("Du bist stark!", {
      x:2, y:5, color:color`4`
    })
  } else {
    addText("DU VERLIERST!", {
      x:1, y:3, color:color`3`
    })

    addText("Mehr Essen noetig!", {
      x:0, y:5, color:color`4`
    })
  }

  gameOver = true
}

// Steuerung
onInput("w", () => movePlayer(0, -1))
onInput("s", () => movePlayer(0, 1))
onInput("a", () => movePlayer(-1, 0))
onInput("d", () => movePlayer(1, 0))

// J startet den Bosskampf
onInput("j", fightBoss)

draw()
