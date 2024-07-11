/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Find the Yellow Square
@author: Charlie Mills
@tags: []
@addedOn: 2024-07-11
*/

const player = "p"

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
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............
......p.......
..............`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})


onInput("s", () => {
  getFirst(player).y += 1
})

afterInput(() => {
  
})
onInput("w", () => {
  getFirst(player).y -= 1 // Move the player up
})

onInput("a", () => {
  getFirst(player).x -= 1 // Move the player left
})

onInput("s", () => {
  getFirst(player).y += 1 // Move the player down
})

onInput("d", () => {
  getFirst(player).x += 1 // Move the player right
})



let score = 0

addText(`Score: ${score}`, { x: 1, y: 1, color: color`6` })

// Function to update the scoreboard
const updateScoreboard = () => {
  clearText() // Clear previous text
  addText(`Score: ${score}`, { x: 1, y: 1, color: color`6` }) // Display updated score
}
const yellowSquare = "0"

setLegend(
  [ player, bitmap`
................
................
................
.....000........
....0...0.......
....0...0.......
.....0.0........
......0.........
.....000........
......0.........
......0.........
.....0.0........
................
................
................
................` ],
  [ yellowSquare, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666` ]
)

// Function to spawn a yellow square at a random position on the map
const spawnYellowSquare = () => {
  const x = Math.floor(Math.random() * width())
  const y = Math.floor(Math.random() * height())
  addSprite(x, y, yellowSquare)
}

// Call the spawnYellowSquare function to initially place yellow squares
spawnYellowSquare()

afterInput(() => {
  const playerSprite = getFirst(player)
  const spritesOnPlayerTile = getTile(playerSprite.x, playerSprite.y)

  spritesOnPlayerTile.forEach(sprite => {
    if (sprite.type === yellowSquare) { // Check if the player is on a yellow square
      score += 1 // Increment the score by 1
      updateScoreboard() // Update the scoreboard display
      sprite.remove() // Remove the yellow square from the tile
      spawnYellowSquare() // Respawn the yellow square at a random position
    }
  })
})
