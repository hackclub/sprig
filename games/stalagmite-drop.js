const player = "p"
const stone = "s"
const ground = "g"

setLegend(
  [stone, bitmap`
..011111111110..
..011111111110..
..011111111110..
...0111111110...
...0111111110...
...0111111110...
....01111110....
....01111110....
....01111110....
.....011110.....
.....011110.....
.....011110.....
......0110......
......0110......
......0110......
.......00.......`],
  [player, bitmap`
.....000000.....
.....0FFFF0.....
.....0CFFC0.....
.....0FFFF0.....
.....0F33F0.....
...0000000000...
...0707777070...
...0F077770F0...
...0F077770F0...
...0F077770F0...
...0F077770F0...
.....000000.....
.....055050.....
.....050550.....
.....050550.....
.....055050.....`],
  [ground, bitmap`
DDDDDDDDDDDDDDDD
DDDCCDDDDDDCCCDD
DDCCCCCDDCCCCCDD
DCCCCCCCCCCCCCCD
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`]
)
setSolids([ground])

let level = 0
const levels = [
  map`
........
........
........
........
........
........
........
........
........
........
........
........
p.......
gggggggg`
]

setMap(levels[level])

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

function spawnRock() {
  const x = Math.floor(Math.random() * width())
  addSprite(x, 0, stone)
}

let delay = 500
let loopId
let gameOver = false

function loop() {
  if (gameOver) return

  addText(delay.toString(), { x: 0, y: 0, color: color`3` })
  delay -= 2
  spawnRock()

  const stones = getAll(stone)
  const playerSprite = getFirst(player)

  for (const r of stones) {
    if (r.y + 1 < height()) {
      r.y += 1
    }

    if (r.y > playerSprite.y && r.x === playerSprite.x) {
      addText("YOU LOST", {
        x: Math.floor(width() / 2),
        y: Math.floor(height() / 2),
        color: color`3`
      })
      
      return
    }
    if(delay <= 100){
      addText("YOU WON", {
        x: Math.floor(width() / 2),
        y: Math.floor(height() / 2),
        color: color`4`
      })
      return
      
    }

    if (r.y >= height() - 1) {
      r.remove()
    }
  }

  loopId = setTimeout(loop, delay)
}

loop()
