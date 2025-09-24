/*
Maze Game
Navigate through the maze to reach the goal.
*/

const player = "p"
const wall = "w"
const goal = "g"

setLegend(
  [ player, bitmap`
........
..00....
..00....
..00..00
..00..00
..00000.
....00..
........` ],
  [ wall, bitmap`
00000000
0......0
0.0000.0
0......0
0.0000.0
0......0
00000000` ],
  [ goal, bitmap`
........
........
..00....
..0.0...
..0.0...
..000...
........
........` ]
)

setBackground(wall)

const levels = [
  map`
w.w.w.w
w......
......w
..wwww.
..w...w
.w.....`
]

let level = 0
setMap(levels[level])

setSolids([wall])

setPushables({
  [ player ]: [ wall ]
})

onInput("w", () => {
  const playerSprite = getFirst(player)
  const playerX = playerSprite.x
  const playerY = playerSprite.y
  const moveUp = getTile(playerX, playerY - 1)
  if (moveUp.length === 0) playerSprite.y -= 1
})

onInput("d", () => {
  const playerSprite = getFirst(player)
  const playerX = playerSprite.x
  const playerY = playerSprite.y
  const moveRight = getTile(playerX + 1, playerY)
  if (moveRight.length === 0) playerSprite.x += 1
})

afterInput(() => {
  const playerSprite = getFirst(player)
  const goalTile = tilesWith(goal)[0]
  
  if (goalTile && playerSprite.x === goalTile[0].x && playerSprite.y === goalTile[0].y) {
    addText("You won!", { x: 5, y: 5, color: color`2` })
  }
})