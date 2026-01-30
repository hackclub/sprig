const p1h = "a"
const p1b = "b"
const p2h = "c"
const p2b = "d"
const wall = "w"
const bg = "e"

setLegend(
  [p1h, bitmap`
................
................
..55555555555...
..57777777775...
..57777777775...
..57777777775...
..57777777775...
..57777777775...
..57777777775...
..57777777775...
..57777777775...
..57777777775...
..57777777775...
..55555555555...
................
................`],
  [p1b, bitmap`
................
................
................
..7777777777....
..7777777777....
..7777777777....
..7777777777....
..7777777777....
..7777777777....
..7777777777....
..7777777777....
..7777777777....
..7777777777....
................
................
................`],
  [p2h, bitmap`
................
................
..33333333333...
..39999999993...
..39999999993...
..39999999993...
..39999999993...
..39999999993...
..39999999993...
..39999999993...
..39999999993...
..39999999993...
..39999999993...
..33333333333...
................
................`],
  [p2b, bitmap`
................
................
................
..9999999999....
..9999999999....
..9999999999....
..9999999999....
..9999999999....
..9999999999....
..9999999999....
..9999999999....
..9999999999....
..9999999999....
................
................
................`],
  [wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [bg, bitmap`
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
0000000000000000`]
)

let level = map`
wwwwwwwwwwwwww
weeeeeeeeeeeew
weeeeeeeeeeeew
weeeeeeeeeeeew
weeeeeeeeeeeew
weeeeeeeeeeeew
weeeeeeeeeeeew
weeeeeeeeeeeew
weeeeeeeeeeeew
weeeeeeeeeeeew
wwwwwwwwwwwwww`

setMap(level)

let snake1 = [{x: 3, y: 5}]
let snake2 = [{x: 10, y: 5}]
let dir1 = {x: 1, y: 0}
let dir2 = {x: -1, y: 0}
let gameOver = false
let winner = ""

// Place initial heads
addSprite(snake1[0].x, snake1[0].y, p1h)
addSprite(snake2[0].x, snake2[0].y, p2h)

addText("Blue:W/A/S/D", {x: 2, y: 0, color: color`7`})
addText("Red:I/J/K/L", {x: 3, y: 14, color: color`3`})

function checkCollision(x, y, myBody, otherSnake) {
  if (getTile(x, y).some(s => s.type === wall)) return true
  
  for (let i = 0; i < myBody.length; i++) {
    if (myBody[i].x === x && myBody[i].y === y) return true
  }
  
  for (let seg of otherSnake) {
    if (seg.x === x && seg.y === y) return true
  }
  
  return false
}

function clearSnake(snake, headType, bodyType) {
  for (let seg of snake) {
    let sprites = getTile(seg.x, seg.y)
    for (let s of sprites) {
      if (s.type === headType || s.type === bodyType) {
        s.remove()
      }
    }
  }
}

function drawSnake(snake, headType, bodyType) {
  for (let i = 0; i < snake.length; i++) {
    let seg = snake[i]
    if (i === 0) {
      addSprite(seg.x, seg.y, headType)
    } else {
      addSprite(seg.x, seg.y, bodyType)
    }
  }
}

function moveSnakes() {
  if (gameOver) return
  
  let newX1 = snake1[0].x + dir1.x
  let newY1 = snake1[0].y + dir1.y
  let newX2 = snake2[0].x + dir2.x
  let newY2 = snake2[0].y + dir2.y
  
  let p1Hit = checkCollision(newX1, newY1, snake1, snake2)
  let p2Hit = checkCollision(newX2, newY2, snake2, snake1)
  
  if (newX1 === newX2 && newY1 === newY2) {
    p1Hit = true
    p2Hit = true
  }
  
  if (p1Hit && p2Hit) {
    gameOver = true
    winner = "draw"
    clearText()
    addText("DRAW!", {x: 7, y: 7, color: color`6`})
    return
  } else if (p1Hit) {
    gameOver = true
    winner = "red"
    clearText()
    addText("RED WINS!", {x: 5, y: 7, color: color`3`})
    return
  } else if (p2Hit) {
    gameOver = true
    winner = "blue"
    clearText()
    addText("BLUE WINS!", {x: 4, y: 7, color: color`7`})
    return
  }
  
  clearSnake(snake1, p1h, p1b)
  clearSnake(snake2, p2h, p2b)
  
  snake1.unshift({x: newX1, y: newY1})
  snake2.unshift({x: newX2, y: newY2})
  
  if (snake1.length > 8) {
    snake1.pop()
  }
  if (snake2.length > 8) {
    snake2.pop()
  }
  
  drawSnake(snake1, p1h, p1b)
  drawSnake(snake2, p2h, p2b)
}

onInput("w", () => {
  if (dir1.y === 0) dir1 = {x: 0, y: -1}
})
onInput("s", () => {
  if (dir1.y === 0) dir1 = {x: 0, y: 1}
})
onInput("a", () => {
  if (dir1.x === 0) dir1 = {x: -1, y: 0}
})
onInput("d", () => {
  if (dir1.x === 0) dir1 = {x: 1, y: 0}
})

onInput("i", () => {
  if (dir2.y === 0) dir2 = {x: 0, y: -1}
})
onInput("k", () => {
  if (dir2.y === 0) dir2 = {x: 0, y: 1}
})
onInput("j", () => {
  if (dir2.x === 0) dir2 = {x: -1, y: 0}
})
onInput("l", () => {
  if (dir2.x === 0) dir2 = {x: 1, y: 0}
})

setInterval(() => {
  moveSnakes()
}, 200)