/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Just take sushi 
@author: Hugo
@tags: []
@addedOn: 2024-00-00
*/

const man = "c"
const ennemi = "e"
const sushi = "s"

let score = 0
let man_animation = [bitmap`
0000000000000000
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FF00000FF00000FF
FFF272FFFF272FFF
FFFFFFFFFFFFFFFF
FFFFFF0FF0FFFFFF
FFFFFF0FF0FFFFFF
FFFFFF0FF0FFFFFF
FFFFFFF00FFFFFFF
FFFFFFFFFFFFFFFF
FF0FFFFFFFFFF0FF
FFF0FFFFFFFF0FFF
FFFF00000000FFFF
FFFFFFFFF7FFFFFF`, bitmap`
0000000000000000
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FF00000FFFFFFFFF
FFF272FFF00000FF
FFFFFFFFFFFFFFFF
FFFFFF0FF0FFFFFF
FFFFFF0FF0FFFFFF
FFFFFF0FF0FFFFFF
FFFFFFF00FFFFFFF
FFFFFFFFFFFFFFFF
FF0FFFFFFFFFF0FF
FFF0FFFFFFFF0FFF
FFFF00000000FFFF
FFFFFFFFFF7FFFFF`]

setLegend(
  [man, man_animation[0]],
  [ennemi, bitmap`
................
.........39.....
.........23.....
........22......
........2.......
.......22.......
......0000......
....00000000....
....00000000....
...0023002300...
...0000000000...
...0000000000...
...0002222000...
....00022000....
....00000000....
......0000......`],
  [sushi, bitmap`
......0000......
...0002222000...
.00222994422200.
0222299444222220
0002229333222000
0000002222000000
0000000000000000
0000000000000000
0000720000720000
0000000000000000
0000000000000000
0000220000220000
0000022222200000
.00000222200000.
...0000000000...
......0000......`],
  [map, bitmap`
9999999999999999
CCCCCCCCCCCCCCCC
9999999999999999
9999999999999999
9999999999999999
CCCCCCCCCCCCCCCC
9999999999999999
9999999999999999
9999999999999999
CCCCCCCCCCCCCCCC
9999999999999999
9999999999999999
9999999999999999
CCCCCCCCCCCCCCCC
9999999999999999
9999999999999999`]
)

const melody = tune`
200: B5^200,
200: C4/200,
6000`
const melodydeath = tune`
250: C5-250,
250: B4-250,
250: C4/250,
250: B5^250,
250: A5^250,
250: B5/250,
6500`


let g = 1

let i = 0
let interval = setInterval(
  function() {
    setLegend(
      [man, man_animation[i]],
      [ennemi, bitmap`
................
.........39.....
.........23.....
........22......
........2.......
.......22.......
......0000......
....00000000....
....00000000....
...0023002300...
...0000000000...
...0000000000...
...0002222000...
....00022000....
....00000000....
......0000......`],
      [sushi, bitmap`
......0000......
...0002222000...
.00222994422200.
0222299444222220
0002229333222000
0000002222000000
0000000000000000
0000000000000000
0000720000720000
0000000000000000
0000000000000000
0000220000220000
0000022222200000
.00000222200000.
...0000000000...
......0000......`],
      [map, bitmap`
9999999999999999
CCCCCCCCCCCCCCCC
9999999999999999
9999999999999999
9999999999999999
CCCCCCCCCCCCCCCC
9999999999999999
9999999999999999
9999999999999999
CCCCCCCCCCCCCCCC
9999999999999999
9999999999999999
9999999999999999
CCCCCCCCCCCCCCCC
9999999999999999
9999999999999999`]
    )
    i = 1 - i
  }, 200
)

setSolids([])

let level = 0
const levels = [
  map`
..........
..c..s....
..........
..........
..e.......
..........
..........
..........`
]

setMap(levels[level])
setBackground(map)


addText(score.toString(), {
  x: 0,
  y: 1,
  color: color`2`
})

function Score() {
  addText(score.toString(), {
    x: 1,
    y: 1,
    color: color`2`
  })
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function ClearAllSprite() {
  getAll().forEach(sprite => {
    sprite.remove()
  })
}

function Gameover() {
  clearText()
  ClearAllSprite()
}

function SpawnSushi() {
  let canPlace = false
  let thereissmth = false
  let x  = 0
  let y  = 0
  while (canPlace==false) {
    x = getRandomInt(8)
    y = getRandomInt(8)
    getAll(x,y).forEach((element) => {
      thereissmth = true
    })
    if (thereissmth==false) {
      canPlace = true
    }
  }
  addSprite(getRandomInt(8), getRandomInt(8), sushi)
}

function SpawnEnnemi() {
  let canPlace = false
  let thereissmth = false
  let x  = 0
  let y  = 0
  while (canPlace==false) {
    x = getRandomInt(8)
    y = getRandomInt(8)
    getAll(x,y).forEach((element) => {
      thereissmth = true
    })
    if (thereissmth==false) {
      canPlace = true
    }
  }
  addSprite(getRandomInt(8), getRandomInt(8), ennemi)
}


onInput("s", () => {
  getFirst(man).y += 1
})
onInput("w", () => {
  getFirst(man).y += -1
})
onInput("d", () => {
  getFirst(man).x += 1
})
onInput("a", () => {
  getFirst(man).x += -1
})

afterInput(() => {
  let position = [getFirst(man).x,
    getFirst(man).y
  ]
  getAll(sushi).forEach((sprite) => {
    if (sprite.x == getFirst(man).x && sprite.y == getFirst(man).y) {
      sprite.remove()
      playTune(melody)
      SpawnSushi()
      SpawnEnnemi()
      score += 1
      Score()
    }
  })
  getAll(ennemi).forEach((sprite) => {
    if (sprite.x == getFirst(man).x && sprite.y == getFirst(man).y) {
      sprite.remove()
      playTune(melodydeath)
      Gameover()
      addText("Game Over!", {
        x: 5,
        y: 4,
        color: color`2`
      })
      addText("your score is", {
        x: 2,
        y: 6,
        color: color`2`
      })
      addText(score.toString(), {
        x: 16,
        y: 6,
        color: color`6`
      })
      g = 0
    }
  })
})