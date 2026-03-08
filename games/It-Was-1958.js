/*
@title: pong_final_scaled
@description: Sprig Pong with 2-tile tall paddles, working movement and collision
*/

const ball = "o"
const p1 = "1"
const p2 = "2"
const wall = "w"

// Paddle bitmaps are now 2 tiles tall (32 px visually)
setLegend(
  [p1, bitmap`
................
.....3333.......
.....3333.......
.....3333.......
.....3333.......
.....3333.......
.....3333.......
.....3333.......
.....3333.......
.....3333.......
.....3333.......
.....3333.......
................
................
................
................`],
  [p2, bitmap`
................
.....6666.......
.....6666.......
.....6666.......
.....6666.......
.....6666.......
.....6666.......
.....6666.......
.....6666.......
.....6666.......
.....6666.......
.....6666.......
................
................
................
................`],
  [ball, bitmap`
................
......0000......
.....000000.....
.....000000.....
.....000000.....
......0000......
................
................
................
................
................
................
................
................
................
................`],
  [wall, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`]
)

setMap(map`
wwwwwwwwww
.1......2.
..........
..........
....o.....
..........
..........
wwwwwwwwww
`)

setSolids([p1, p2, wall])

// velocities
let vx = Math.random() > 0.5 ? 1 : -1
let vy = Math.random() > 0.5 ? 1 : -1
let score1 = 0
let score2 = 0
let gameOver = false
const WIN_SCORE = 5

function showScore() {
  clearText()
  addText(score1 + ":" + score2, {x:4, y:0, color: color`3`})
}
showScore()

// Controls
onInput("w", () => { 
  const p = getFirst(p1)
  if(p.y > 1) p.y-- 
})
onInput("s", () => { 
  const p = getFirst(p1)
  if(p.y < 5) p.y++ 
})
onInput("i", () => { 
  const p = getFirst(p2)
  if(p.y > 1) p.y-- 
})
onInput("k", () => { 
  const p = getFirst(p2)
  if(p.y < 5) p.y++ 
})

function resetBall(servingRight = null){
  const b = getFirst(ball)
  b.x = 5
  b.y = 4
  if(servingRight === true) vx = 1
  else if(servingRight === false) vx = -1
  else vx = Math.random() > 0.5 ? 1 : -1
  vy = Math.random() > 0.5 ? 1 : -1
}

// Main loop
setInterval(()=>{
  if(gameOver) return

  const b = getFirst(ball)
  const left = getFirst(p1)
  const right = getFirst(p2)

  let nextX = b.x + vx
  let nextY = b.y + vy

  // bounce top/bottom (playable Y: 1..6)
  if(nextY <= 1 || nextY >= 6) vy = -vy
  nextY = b.y + vy

  // Paddle collision: single sprite, 2 tiles visually
  if(vx < 0 && nextX <= left.x + 1 && nextX >= left.x &&
     (nextY === left.y || nextY === left.y+1)) {
    vx = 1
    vy = (nextY === left.y) ? -1 : 1
  }
  if(vx > 0 && nextX >= right.x - 1 && nextX <= right.x &&
     (nextY === right.y || nextY === right.y+1)) {
    vx = -1
    vy = (nextY === right.y) ? -1 : 1
  }

  // scoring
  if(nextX < 0){
    score2++
    showScore()
    if(score2 >= WIN_SCORE){
      gameOver=true
      clearText()
      addText("P2 WINS",{x:4,y:4,color:color`4`})
      return
    }
    resetBall(true)
    return
  }
  if(nextX > 9){
    score1++
    showScore()
    if(score1 >= WIN_SCORE){
      gameOver=true
      clearText()
      addText("P1 WINS",{x:4,y:4,color:color`4`})
      return
    }
    resetBall(false)
    return
  }

  b.x = nextX
  b.y = nextY

}, 200)