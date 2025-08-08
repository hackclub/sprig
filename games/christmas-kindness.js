/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: christmas kindness
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const santa = "s"
const wall = "w"
const gift = "g"
const person = "p"
const snow = "z"

setLegend(
  [santa, bitmap`
................
................
................
......0000......
.....066660.....
.....066660.....
.....066660.....
.....066660.....
.....099990.....
.....099990.....
.....099990.....
....0666660.....
....0666660.....
.....0....0.....
................
................`],
  [wall, bitmap`
333333333333
333333333333
333333333333
333333333333
333333333333
333333333333
333333333333
333333333333
333333333333
333333333333
333333333333
333333333333`],
  [gift, bitmap`
.....3333.....
....322223....
...32222223...
...32222223...
....322223....
.....3333.....
......3.......
......3.......
.....333......
.....3.3......
.....3.3......
.....3.3......
.....333......`],
  [person, bitmap`
............
............
.....4444...
....444444..
....440044..
....440044..
....444444..
.....4444...
.....0666...
.....0666...
....066666..
....066066..
....060006..
.....0000...
....00..00..
............
`],
  [snow, bitmap`
............
............
............
............
............
............
............
............
............
............
............
............
............
............
............
............
`]
)

setBackground(snow)

const levels = [
  map`
wwwwwwwwwww
w......pw.w
w.w.w.w...w
w..g......w
w.w.w.w...w
w....p....w
w.w.w.w...w
w..s......w
w.......p.w
wwwwwwwwwww`
]

setMap(levels[0])

setSolids([santa, wall])
setPushables({})

let timer = 30
let timerId = null
let gameOver = false

// Sounds
const jingle = tune`
500: c4~500 + e4~500 + g4~500,
500: c5~500,
500: g4~500,
500: e4~500,
500: c5~500,
500: g4~500,
500: e4~500,
500: g4~500`

const alarm = tune`
300: c3~300 + e3~300 + g3~300,
300: c3~300 + e3~300 + g3~300,
300: c3~300 + e3~300 + g3~300,
`

const xmasMusic = tune`
400: c4+e4+g4~400,
400: f4+a4+c5~400,
400: g4+b4+d5~400,
400: c5+e5+g5~400,
400: c4+e4+g4~400,
400: f4+a4+c5~400,
400: g4+b4+d5~400,
400: c5+e5+g5~400,
`

function updateText() {
  clearText()
  addText(`TIME: ${timer}s`, { x: 9, y: 0, color: color`2` })
  addText("SANTA: GET GIFTS", { x: 0, y: 0, color: color`2` })
  addText("DELIVER TO PEOPLE", { x: 0, y: 1, color: color`2` })
}

function startTimer() {
  timerId = setInterval(() => {
    if (gameOver) {
      clearInterval(timerId)
      return
    }
    timer -= 1
    updateText()

    if (timer <= 0) {
      gameOver = true
      clearInterval(timerId)
      clearText()
      playTune(alarm)
      addText("GAME OVER!", { x: 4, y: 6, color: color`2` })
    }
  }, 1000)
}

startTimer()
updateText()

// Movement with collision check
onInput("w", () => {
  if (gameOver) return
  const s = getFirst(santa)
  if (!isSolid(s.x, s.y - 1)) s.y -= 1
})
onInput("s", () => {
  if (gameOver) return
  const s = getFirst(santa)
  if (!isSolid(s.x, s.y + 1)) s.y += 1
})
onInput("a", () => {
  if (gameOver) return
  const s = getFirst(santa)
  if (!isSolid(s.x - 1, s.y)) s.x -= 1
})
onInput("d", () => {
  if (gameOver) return
  const s = getFirst(santa)
  if (!isSolid(s.x + 1, s.y)) s.x += 1
})

function isSolid(x, y) {
  return tilesWith(santa, wall).some(t => t.x === x && t.y === y)
}

afterInput(() => {
  if (gameOver) return

  const s = getFirst(santa)
  const tile = getTile(s.x, s.y)
  const hasGift = tile.some(sp => sp.type === gift)
  const hasPerson = tile.some(sp => sp.type === person)

  if (hasGift) {
    const giftSprite = tile.find(sp => sp.type === gift)
    giftSprite.remove()
    s.hasGift = true
  }

  if (hasPerson && s.hasGift) {
    tile.filter(sp => sp.type === person).forEach(sp => sp.remove())
    s.hasGift = false
    playTune(jingle)
  }

  const remainingPeople = tilesWith(person)
  if (remainingPeople.length === 0) {
    gameOver = true
    clearInterval(timerId)
    clearText()
    playTune(xmasMusic)
    addText("YOU SPREAD CHEER!", { x: 3, y: 6, color: color`2` })
  }
})


