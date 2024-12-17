/*
@title: The Unwinnable Chase
@author: Wyatt Brashear
@tags: []
@addedOn: 2024-12-03
*/
const player = "p"
const enemy = "e"

setLegend(
  [player, bitmap`
0000000..0000000
000...0..000...0
000...0..000...0
0000000..0000000
0000000..0000000
0000000..0000000
0000000..0000000
.......0........
.......0........
.......00.......
....0.....0.....
.....00000......
................
................
................
................`],
  [enemy, bitmap`
3..............3
.3............3.
..3..........3..
...3........3...
................
....33....33....
....33....33....
.......3........
.......33.......
................
......333.......
.....3...3......
................
................
................
................`]
)

setSolids([])

let level = 0
const levels = [
  map`
...........
...........
...........
...........
...........
...........
p..........
...........`
]

setMap(levels[level])

setPushables({
  [player]: []
})

addSprite(5, 5, enemy) // Initial position of the enemy sprite

afterInput(() => {
  const playerSprite = getFirst(player)
  const enemySprite = getFirst(enemy)

  if (playerSprite.x < enemySprite.x) {
    enemySprite.x -= 1
  } else if (playerSprite.x > enemySprite.x) {
    enemySprite.x += 1
  }

  if (playerSprite.y < enemySprite.y) {
    enemySprite.y -= 1
  } else if (playerSprite.y > enemySprite.y) {
    enemySprite.y += 1
  }
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  const playerSprite = getFirst(player)

  // Randomly generate new enemy position
  const newX = Math.floor(Math.random() * width()) // Random x coordinate within the map width
  const newY = Math.floor(Math.random() * height()) // Random y coordinate within the map height

  // Add a new enemy sprite at the random position
  addSprite(newX, newY, enemy)

  // Move all enemy sprites towards the player
  const newPlayerX = playerSprite.x
  const newPlayerY = playerSprite.y

  getAll(enemy).forEach(enemySprite => {
    if (newPlayerX < enemySprite.x) {
      enemySprite.x -= 1
    } else if (newPlayerX > enemySprite.x) {
      enemySprite.x += 1
    }

    if (newPlayerY < enemySprite.y) {
      enemySprite.y -= 1
    } else if (newPlayerY > enemySprite.y) {
      enemySprite.y += 1
    }
  })

  // Move the player sprite based on the input
  switch (lastInput()) {
    case "w":
      playerSprite.y -= 1
      break
    case "s":
      playerSprite.y += 1
      break
    case "a":
      playerSprite.x -= 1
      break
    case "d":
      playerSprite.x += 1
      break
    default:
      break
  }
})
