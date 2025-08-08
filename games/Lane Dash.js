/*
@title: Lane Dash
@author: Mustafa Ali 
@description:Dodge your way to victory in Lane Dodger! You control a top-down car racing down a highway packed with hazards. Switch lanes quickly to avoid oncoming obstacles and survive as long as possible. Get a point for every obstacle you dodge!
@tags: ["endless runner", "car"]
@addedOn: 2025-7-22 
*/



const player = "p"
const obstacle = "o" 
const track = "t"
const background = "b"

setLegend(
  [player, bitmap`
......7227......
.....225522.....
.....525525.....
...0557557550...
...0L575575L0...
...0L520025L0...
....L500005L....
....L575575L....
....55755755....
....55777755....
....15777751....
...0155555510...
...0155555510...
...0555555550...
....55555555....
.....1....1.....`], 
  [obstacle, bitmap`
....L.....L.....
...333636333....
..03336363330...
..0L3363633L0...
..0L3363633L0...
...L3363633L....
...333636333....
...133636331....
...133636331....
...133636331....
..01300000310...
..03310001330...
..03336363330...
...232636232....
....2363632.....
................`],
  [track, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`], 
)

let lanes = [2, 4, 6] 
let currentLane = 1   
let playerY = 6      
let score = 0
let gameOver = false

let customMap = [
  "tt.t.t.tt",
  "tt.t.t.tt",
  "tt.t.t.tt",
  "tt.t.t.tt",
  "tt.t.t.tt",
  "tt.t.t.tt",
  "tt.t.t.tt"
]

setMap(map`${customMap.join('\n')}`)

function drawPlayer() {
  lanes.forEach(x => clearTile(x, playerY)) 
  addSprite(lanes[currentLane], playerY, player)
}

function spawnObstacle() {
  let x = lanes[Math.floor(Math.random() * lanes.length)]
  addSprite(x, 0, obstacle) 
}

function moveObstacles() {
  for (let y = 5; y >= 0; y--) {
    for (let x of lanes) {
      let tile = getTile(x, y)
      if (tile.some(s => s.type === obstacle)) {
        clearTile(x, y)
        addSprite(x, y + 1, obstacle)
      }
    }
  }

  for (let x of lanes) {
    if (x === lanes[currentLane]) continue

    let tile = getTile(x, 6)
    if (tile.some(s => s.type === obstacle)) {
      clearTile(x, 6)
      score++
    }
  }
}

function checkCollision() {
  let x = lanes[currentLane]
  let tile = getTile(x, playerY)

  if (tile.some(s => s.type === obstacle)) {
    clearInterval(loop)
    gameOver = true

    addText("Game Over\nScore: " + score + "\nPress J to restart", {
      x: 1,
      y: 2,
      color: color`3`
    })
  }
}

function restartGame() {
  clearText()
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 8; x++) {
      clearTile(x, y)
    }
  }

  score = 0
  gameOver = false
  currentLane = 1
  setMap(map`${customMap.join('\n')}`)
  drawPlayer()

  loop = setInterval(() => {
    moveObstacles()
    checkCollision()
    spawnObstacle()
    drawPlayer()
  }, 600)
}

onInput("j", () => {
  if (gameOver) {
    restartGame()
  }
})

onInput("a", () => {
  if (currentLane > 0) {
    currentLane--
    drawPlayer()
  }
})

onInput("d", () => {
  if (currentLane < 2) {
    currentLane++
    drawPlayer()
  }
})

drawPlayer()

let loop = setInterval(() => {
  moveObstacles()
  checkCollision()
  spawnObstacle()
  drawPlayer()
}, 600)
