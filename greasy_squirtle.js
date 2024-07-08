/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
let score = 0

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ]
)

setSolids([])

let level = 0
const levels = [
  map`
.......
.......
.......
.......
p......
.......`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
  checkForPoint()
})

onInput("w", () => {
  getFirst(player).y -= 1
  checkForPoint()
})

onInput("a", () => {
  getFirst(player).x -= 1
  checkForPoint()
})

onInput("d", () => {
  getFirst(player).x += 1
  checkForPoint()
})

function checkForPoint() {
  // Check if the player character is on a specific spot to gain a point
  const playerSprite = getFirst(player)
  const randomX = Math.floor(Math.random() * width())
  const randomY = Math.floor(Math.random() * height())
  
  if (playerSprite.x === randomX && playerSprite.y === randomY) {
    score++
    console.log("Point gained! Score: " + score)
  }
}