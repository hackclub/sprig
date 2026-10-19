/*
@title: Fast snake
@description: Snake Game
@author: Xenoe or ugnius0716 on github
@tags: ['game', 'snake']
@addedOn: 2026-09-22
*/

const headRight = "q"
const bodyRightLeft = "w"
const tailRight = "e"
const headLeft = "r"
const bodyDownUp = "t"
const tailLeft = "y"
const food = "f"
const tailUp = "i"
const headUp = "o"
const tailDown = "p"
const headDown = "l"
const bodyRightDown = "a"
const bodyLeftDown = "b"
const bodyRightUp = "c"
const bodyLeftUp = "d"
const wall = "z"

let normalSpeed = 150
let boostedSpeed = 100
let slowedSpeed = 200
let speed = normalSpeed
let gameTimer = null
let speedTimeout = null
let powerUp

let gameOver = false
let score = 0
const GRID_WIDTH = 18
const GRID_HEIGHT = 10
let direction = "right"
let nextDirection = "right"

setLegend(
  [ headRight, bitmap`
................
................
DDDDDDDDDDDD....
444444444444DD..
44444444422244D.
444444444202444D
444444444222444D
444444444444444D
444444444444444D
444444444222444D
444444444202444D
44444444422244D.
444444444444DD..
DDDDDDDDDDDD....
................
................` ],
  [ headLeft, bitmap`
................
................
....DDDDDDDDDDDD
..DD444444444444
.D44222444444444
D444202444444444
D444222444444444
D444444444444444
D444444444444444
D444222444444444
D444202444444444
.D44222444444444
..DD444444444444
....DDDDDDDDDDDD
................
................` ],
  [ headDown, bitmap`
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4222442224D..
..D4202442024D..
..D4222442224D..
...D44444444D...
...D44444444D...
....D444444D....
.....DDDDDD.....` ],
  [ headUp, bitmap`
.....DDDDDD.....
....D444444D....
...D44444444D...
...D44444444D...
..D4222442224D..
..D4202442024D..
..D4222442224D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..` ],
  [ bodyRightLeft, bitmap`
................
................
DDDDDDDDDDDDDDDD
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
DDDDDDDDDDDDDDDD
................
................` ],
  [ bodyDownUp, bitmap`
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..` ],
  [ bodyRightDown, bitmap`
................
................
DDDDDDDDDDD.....
44444444444D....
444444444444D...
4444444444444D..
4444444444444D..
4444444444444D..
4444444444444D..
4444444444444D..
4444444444444D..
4444444444444D..
4444444444444D..
D444444444444D..
.D44444444444D..
..D4444444444D..` ],
  [ bodyRightUp, bitmap`
..D4444444444D..
.D44444444444D..
D444444444444D..
4444444444444D..
4444444444444D..
4444444444444D..
4444444444444D..
4444444444444D..
4444444444444D..
4444444444444D..
4444444444444D..
444444444444D...
44444444444D....
DDDDDDDDDDD.....
................
................` ],
  [ bodyLeftDown, bitmap`
................
................
.....DDDDDDDDDDD
....D44444444444
...D444444444444
..D4444444444444
..D4444444444444
..D4444444444444
..D4444444444444
..D4444444444444
..D4444444444444
..D4444444444444
..D4444444444444
..D44444444444DD
..D44444444444D.
..D4444444444D..` ],
  [ bodyLeftUp, bitmap`
..D4444444444D..
..D44444444444D.
..D444444444444D
..D4444444444444
..D4444444444444
..D4444444444444
..D4444444444444
..D4444444444444
..D4444444444444
..D4444444444444
..D4444444444444
...D444444444444
....D44444444444
.....DDDDDDDDDDD
................
................` ],
  [ tailRight, bitmap`
................
................
..........DDDDDD
........DD444444
......DD44444444
....DD4444444444
..DD444444444444
DD44444444444444
DD44444444444444
..DD444444444444
....DD4444444444
......DD44444444
........DD444444
..........DDDDDD
................
................`],
  [ tailLeft, bitmap`
................
................
DDDDDD..........
444444DD........
44444444DD......
4444444444DD....
444444444444DD..
44444444444444DD
44444444444444DD
444444444444DD..
4444444444DD....
44444444DD......
444444DD........
DDDDDD..........
................
................`],
  [ tailDown, bitmap`
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
...D44444444D...
...D44444444D...
....D444444D....
....D444444D....
.....D4444D.....
.....D4444D.....
......D44D......
......D44D......
.......DD.......
.......DD.......`],
  [ tailUp, bitmap`
.......DD.......
.......DD.......
......D44D......
......D44D......
.....D4444D.....
.....D4444D.....
....D444444D....
....D444444D....
...D44444444D...
...D44444444D...
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..
..D4444444444D..`],
  [ food, bitmap`
.....333333.....
...338H111133...
..3888H11111H3..
.3H82888881H883.
.31H88HHHH88283.
31118H8888H88883
3118H888888H8HH3
3118H888888H8113
3118H888888H8113
3HH8H888888H8113
38888H8888H81113
.38288HHHH88H13.
.382H18888828H3.
..3H11111H8883..
...331111H833...
.....333333.....`],
  [ wall, bitmap`
5555555555555555
5777777777777775
5771115555555775
57115HHHHHHHH575
5715HHHHHHHHH575
571HHHHHHHHHH575
575HHHHHHHHHH575
575HHHHHHHHHH575
575HHHHHHHHHH575
575HHHHHHHHHH575
575HHHHHHHHHH175
575HHHHHHHHH5175
575HHHHHHHH51175
5775555555111775
5777777777777775
5555555555555555`]
)
setSolids([])

let level = 0
const levels = [
  map `
zzzzzzzzzzzzzzzzz
z...............z
z...............z
z...............z
z...............z
z...............z
z...............z
zzzzzzzzzzzzzzzzz
`
]

setMap(levels[level])

let snake = [
  { x: 4, y: 1, type: headRight },      // HEAD
  { x: 3, y: 1, type: bodyRightLeft },  // BODY
  { x: 2, y: 1, type: tailRight }       // TAIL
]

let food_pos = { x: 0, y: 0 }

function spawnFood() {
  let randomX, randomY
  do {
    randomX = Math.floor(Math.random() * 14) + 1   
    randomY = Math.floor(Math.random() * 6) + 1    
  } while (snake.some(s => s.x === randomX && s.y === randomY))
  
  food_pos = { x: randomX, y: randomY }
}

spawnFood()
function powerUps() {
  powerUp = Math.floor(Math.random() * 7) + 1   
  
  switch (powerUp) {
  case 1:
    speed = boostedSpeed
    startGameLoop(speed)

    // Reset the timer if another speed power-up is collected
    if (speedTimeout !== null) clearTimeout(speedTimeout)

    speedTimeout = setTimeout(() => {
      speed = normalSpeed
      startGameLoop(speed)
      speedTimeout = null
    }, 5000)
      
    addText("Boost: 5 seconds!")

    setTimeout(() => {
    clearText()
    }, 1000)  
    
    console.log("Speed boost for 5 seconds!")
    break

  case 2:
    speed = slowedSpeed
    startGameLoop(speed)

    // Reset the timer if another speed power-up is collected
    if (speedTimeout !== null) clearTimeout(speedTimeout)

    speedTimeout = setTimeout(() => {
      speed = normalSpeed
      startGameLoop(speed)
      speedTimeout = null
    }, 5000)
      
    addText("Slowed: 5 seconds!")

    setTimeout(() => {
    clearText()
    }, 1000)  
    
    console.log("slowed for 5 seconds!")
    break

  case 3:
    score++
    console.log("Extra points!")
    break

  default:
    console.log("no power up")
  }
}



function gameTick() {
  if (gameOver || snake.length === 0) return

  // UPDATE DIRECTION
  direction = nextDirection

  const head = snake[0]
  const newHead = { x: head.x, y: head.y, type: head.type }

  if (direction === "right") {
    newHead.x += 1
    newHead.type = headRight
  } else if (direction === "left") {
    newHead.x -= 1
    newHead.type = headLeft
  } else if (direction === "up") {
    newHead.y -= 1
    newHead.type = headUp
  } else if (direction === "down") {
    newHead.y += 1
    newHead.type = headDown
  }

  // CHECK WALL COLLISION BEFORE CLEARING SPRITES
  const headTile = getTile(newHead.x, newHead.y)
  let hitWall = false
  for (let sprite of headTile) {
    if (sprite.type === wall) {
      hitWall = true
      break
    }
  }

  // Clear old sprites
  for (let segment of snake) {
    let tile = getTile(segment.x, segment.y)
    for (let sprite of tile) {
      sprite.remove()
    }
  }

  let foodTile = getFirst(food)
  if (foodTile) foodTile.remove()

  // CHECK FOOD COLLISION
  const ateFood = newHead.x === food_pos.x && newHead.y === food_pos.y

  if (ateFood) {
    snake.unshift(newHead)
    score++
    powerUps()
    spawnFood()
  } else {
    snake.pop()
    snake.unshift(newHead)
  }
  
  
  
  
  

  // Update body/tail graphics
  for (let i = 1; i < snake.length - 1; i++) {
    const current = snake[i]
    const front = snake[i - 1]
    const back = snake[i + 1]

    if (front.y === current.y && back.y === current.y) {
      current.type = bodyRightLeft
    } else if (front.x === current.x && back.x === current.x) {
      current.type = bodyDownUp
    } else if ((front.x > current.x && back.y > current.y) || (back.x > current.x && front.y > current.y)) {
      current.type = bodyLeftDown
    } else if ((front.x < current.x && back.y > current.y) || (back.x < current.x && front.y > current.y)) {
      current.type = bodyRightDown
    } else if ((front.x > current.x && back.y < current.y) || (back.x > current.x && front.y < current.y)) {
      current.type = bodyLeftUp
    } else if ((front.x < current.x && back.y < current.y) || (back.x < current.x && front.y < current.y)) {
      current.type = bodyRightUp
    }
  }

  // Update tail
  if (snake.length > 1) {
    const tail = snake[snake.length - 1]
    const lastBody = snake[snake.length - 2]

    if (tail.x > lastBody.x) tail.type = tailLeft
    else if (tail.x < lastBody.x) tail.type = tailRight
    else if (tail.y > lastBody.y) tail.type = tailDown
    else if (tail.y < lastBody.y) tail.type = tailUp
  }

  // Redraw everything
  for (let segment of snake) {
    addSprite(segment.x, segment.y, segment.type)
  }

  addSprite(food_pos.x, food_pos.y, food)

  // NOW CHECK IF WE HIT A WALL
  if (hitWall) {
    gameOver = true
    addText(`GAME OVER! Score: ${score}`, () => {})
  }

  // CHECK SELF COLLISION AFTER REDRAW
  if (snake.slice(1).some(s => s.x === snake[0].x && s.y === snake[0].y)) {
    gameOver = true
    addText(`GAME OVER! Score: ${score}`, () => {})
  }

  
}

function startGameLoop(delay) {
  if (gameTimer !== null) clearInterval(gameTimer)
  gameTimer = setInterval(gameTick, delay)
}

startGameLoop(speed)

// Restart control
onInput("j", () => {
  if (gameOver) {
    for (let segment of snake) {
      let tile = getTile(segment.x, segment.y)
      for (let sprite of tile) {
        sprite.remove()
      }
      
    }
    setMap(levels[0])
    // Clear old snake sprites
    
    // Clear old food sprite
    let foodTile = getFirst(food)
    if (foodTile) foodTile.remove()
    
    gameOver = false
    score = 0

    // Cancel any active speed boost and restore normal speed
    if (speedTimeout !== null) {
      clearTimeout(speedTimeout)
      speedTimeout = null
    }
    speed = normalSpeed
    snake = [
      { x: 4, y: 1, type: headRight },
      { x: 3, y: 1, type: bodyRightLeft },
      { x: 2, y: 1, type: tailRight }
    ]
    direction = "right"
    nextDirection = "right"
    spawnFood()
    startGameLoop(speed)
    
    clearText()
  }
})

// Controls
onInput("w", () => { if (!gameOver && direction !== "down") nextDirection = "up" })
onInput("s", () => { if (!gameOver && direction !== "up") nextDirection = "down" })
onInput("a", () => { if (!gameOver && direction !== "right") nextDirection = "left" })
onInput("d", () => { if (!gameOver && direction !== "left") nextDirection = "right" })
