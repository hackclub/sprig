/*
@title: Desert Snake
@author: clement
@addedOn: 2025-02-06

Eat cacti and get the biggest possible score!
*/

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const mapbg = "m"
const players2 = "b"
const fruits = "f"
const player = "p"
let clementnom = "coffinet"
let positions = []

setLegend(
  [player, bitmap`
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
DDDDDDDDDDDDDDDD`],
  [fruits, bitmap`
6666666D66666666
666666DDD6666666
666666DDD6666666
336666DDD6666666
3D6666DDD6663366
66D666DDD666D366
666DDDDDD66D6666
666666DDD6D66666
666666DDDD666336
633666DDD6666D36
63D666DDD666D666
666DDDDDDDDD6666
666666DDD6666666
666666DDD6666666
666666DDD6666666
666666DDD6666666`],
  [players2, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [mapbg, bitmap`
6666666666666666
6666666666666666
6FF6666666666F66
6F6666666666FF66
FF6666666FFFF666
F6666666F6666666
6666666666666666
6666666666666666
6666666666666666
6FFFFFFFFF666666
6666666666666666
6666666666666666
6666666666666666
666666FF66666666
6666666FFF666666
666666666FFF6666`],
)

setSolids([player, players2])

const level = map`
mmmmmmmmmmmm
mmmmmmmmmmmm
mmmmmmmmmmmm
mmmmmmmmmmmm
mmmmmmmmmmmm
mmmmmmmmmmmm
mmmmmmmmmmmm
mmmmmmmmmmmm
mmmmmmmmmmmm`
let score = 0
setMap(level)

addSprite(5, 5, "p")
addSprite(5, 6, "f")
addSprite(5, 4, "f")
addSprite(4, 6, "f")
addSprite(1, 8, "f")
addSprite(5, 5, "f")

function addposition() {
  getAll(players2).forEach((element) => {
    element.remove()
  })
  positions.forEach((position) => {
    addSprite(position[0], position[1], "b")
  })
  positions.push([getFirst(player).x, getFirst(player).y])
  if (positions.length > score) {
    positions.shift()
  }
  console.log(positions)
}



onInput('k', () => {
  getFirst(player).y += 1
  addposition(players2)
})

onInput('i', () => {
  getFirst(player).y -= 1
  addposition()
})

onInput('j', () => {
  getFirst(player).x -= 1
  addposition()
})

onInput('l', () => {
  getFirst(player).x += 1
  addposition()
})

afterInput(() => {
  getAll(fruits).forEach((fruits) => {
    if (fruits.y == getFirst(player).y && fruits.x == getFirst(player).x) {
      fruits.x = getRandomInt(0, 11)
      fruits.y = getRandomInt(0, 8)
      score += 1
      addText(score.toString(), {
        x: 1,
        y: 1,
        color: color`0`
      })
    }
  })
})
