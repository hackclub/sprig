/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
@title: Sweepar
@author: eshangonemad
@tags: [fun, minesweeper]
@img: ""
@addedOn: 09/03/2024
instructions: WASD to move the cursor around the grid, J to open squares, K to flag squares and I to reset the game
*/
const cursor = "c"
const bomb = "b"
const flag = "f"
const normal = "n"
const open = "o" 
const non="t"
setLegend(
  [ cursor, bitmap`
................
................
................
.....000000.....
....00000000....
...0000000000...
...0000440000...
...0004444000...
...0044444400...
...0000000000...
...0000000000...
....00000000....
.....000000.....
................
................
................` ],
  [ bomb, bitmap`
0000000000000000
0222222222222220
0222222222222220
0222222222222220
0222223223222220
0222223333222220
0222333333332220
0222233333322220
0222233333322220
0222333333332220
0222223333222220
0222223223222220
0222222222222220
0222222222222220
0222222222222220
0000000000000000` ],
  [ flag, bitmap`
0000000000000000
0111111111111110
0111L33333311110
0111L33333311110
0111L33333311110
0111L33333311110
0111L33333311110
0111L11111111110
0111L11111111110
0111L11111111110
0111L11111111110
0111L11111111110
0111L11111111110
0111L11111111110
0111111111111110
0000000000000000` ],
  [ normal, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000` ],
  [open, bitmap`
0000000000000000
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0000000000000000`],
  [non,bitmap`
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

const gameGrid = [
  [normal, normal, normal, normal, normal, normal, normal, normal],
  [normal, normal, normal, normal, normal, normal, normal, normal],
  [normal, normal, normal, normal, normal, normal, normal, normal],
  [normal, normal, normal, normal, normal, normal, normal, normal],
  [normal, normal, normal, normal, normal, normal, normal, normal],
  [normal, normal, normal, normal, normal, normal, normal, normal],
  [normal, normal, normal, normal, normal, normal, normal, normal],
  [normal, normal, normal, normal, normal, normal, normal, normal]
]

const placeBombs = () => {
  for (let i = 0; i < 5; i++) {
    let x = Math.floor(Math.random() * 8)
    let y = Math.floor(Math.random() * 8)
    if (gameGrid[y][x] !== bomb) {
      gameGrid[y][x] = bomb
    } else {
      i--
    }
  }
}

placeBombs()

let cursorX = 0
let cursorY = 0

const moveCursor = (directionX, directionY) => {
  if (cursorX + directionX >= 0 && cursorX + directionX < 8 && cursorY + directionY >= 0 && cursorY + directionY < 8) {
    cursorX += directionX
    cursorY += directionY
    getFirst(cursor).x = cursorX
    getFirst(cursor).y = cursorY
  }
}

const openSquare = () => {
  if (gameGrid[cursorY][cursorX] === bomb) {
    addSprite(cursorX, cursorY, bomb)
    console.log("Game over! You hit a bomb.")
    gameover()
    
  } if (gameGrid[cursorY][cursorX] === flag) {
    clearTile(cursorX, cursorY)
    addSprite(cursorX, cursorY, normal)
    addSprite(cursorX, cursorY, cursor)
    console.log("Square unflagged.")
  } else if (gameGrid[cursorY][cursorX] === normal) {
    clearTile(cursorX, cursorY)
    addSprite(cursorX, cursorY, open)
    addSprite(cursorX, cursorY, cursor)
    console.log("Square unflagged.")
  }
}
const gameover = () =>{
  const overl = map`
tttttttt
tttttttt
tttttttt
tttttttt
tttttttt
tttttttt
tttttttt
tttttttt`
  setMap(overl)
  addText("GAME OVER", { 
  x: 6,
  y: 4,
  color: color`3`
})
    addText("press i to reset", { 
  x: 2,
  y: 5,
  color: color`H`
})
}

const flagSquare = () => {
  if (gameGrid[cursorY][cursorX] === normal || gameGrid[cursorY][cursorX] === bomb) {
    addSprite(cursorX, cursorY, flag)
    gameGrid[cursorY][cursorX] = flag
    console.log("Square flagged.")
  }else if (gameGrid[cursorY][cursorX] === flag) {
    clearTile(cursorX,cursorY)
    addSprite(cursorX,cursorY,normal)
    addSprite(cursorX,cursorY,cursor)
   gameGrid[cursorY][cursorX] = normal
    console.log("Flag removed.")
  }
}

const clear = () => {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      clearTile(x, y)
      gameGrid[y][x] = normal
    }
  }
}

const initialMap = map`
nnnnnnnn
nnnnnnnn
nnnnnnnn
nnnnnnnn
nnnnnnnn
nnnnnnnn
nnnnnnnn
nnnnnnnn
`
setMap(initialMap)
addSprite(cursorX, cursorY, cursor)

onInput("w", () => moveCursor(0, -1))
onInput("a", () => moveCursor(-1, 0))
onInput("s", () => moveCursor(0, 1))
onInput("d", () => moveCursor(1, 0))
onInput("j", openSquare)
onInput("k", flagSquare)
onInput("l", gameover)
onInput("i", () => {
  clear()
  placeBombs()
  setMap(initialMap)
  addSprite(cursorX, cursorY, cursor)
})
