/*
@title: ChocolateNimGame
@author: Sarah Akhtar
@tags: ['strategy', 'puzzle']
@addedOn: 2024-12-10
*/

/**
 * Creates Entities
 */
const chocolate = "c"
const spoiled = "s"
setLegend(
  [ chocolate, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0C22C2CCCCCCCCC0
0C2CCCCCCCCCCCC0
0C2CCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000`],
  [ spoiled, bitmap`
5555555555555555
5000000000000005
505550LLLLLLLL05
505550LLLLLLLL05
5055500000000005
5000007777705505
50L0500000005505
50L050550LL05505
50L050550LL05505
50L0500000005505
500050LL0LL05505
505050000LL05505
500050550LL05505
507050550LL05505
5000000000000005
5555555555555555`]
)
setSolids([])

/**
 * Defining States
 */
let chocolateBar = []
let spoiledRow = 0
let spoiledCol = 0
let isPlayerTurn = true

/**
 * Starting Game
 */
initializeGame(5, 5)

/**
 * Random State Generation
 */
function getRandomPosition(rows, cols) {
  return {
    row: Math.floor(Math.random() * rows),
    col: Math.floor(Math.random() * cols)
  }
}

/**
 * Creating Game
 */
function initializeGame(rows, cols) {
  const { row: sr, col: sc } = getRandomPosition(rows, cols)
  
  chocolateBar = Array(rows).fill().map(() => Array(cols).fill(chocolate))
  spoiledRow = sr
  spoiledCol = sc
  chocolateBar[spoiledRow][spoiledCol] = spoiled
  
  isPlayerTurn = ((rows % 2 === 1 && cols % 2 === 1) || (rows % 2 === 0 && cols % 2 === 0))
  
  updateMap()
}

/**
 * Updating Map from Key
 */
function updateMap() {
  clearText()
  const newMap = chocolateBar.map(row => row.join('')).join('\n')
  setMap(newMap)
  addText("Chocolate Nim Game", { 
    y: 2, 
    color: color`6`,
  })
}

/**
 * Input Command 'W'
 */
onInput("w", () => {
  if (isPlayerTurn) eatChocolate('u')
})

/**
 * Input Command 'S'
 */
onInput("s", () => {
  if (isPlayerTurn) eatChocolate('d')
})

/**
 * Input Command 'A'
 */
onInput("a", () => {
  if (isPlayerTurn) eatChocolate('l')
})

/**
 * Input Command 'D'
 */
onInput("d", () => {
  if (isPlayerTurn) eatChocolate('r')
})

/**
 * Eating Chocolate Animation
 */
function eatChocolate(direction) {
  let eatsSpoiled = false
  if (direction === 'u') {
    eatsSpoiled = (spoiledRow === 0)
    if (!eatsSpoiled) {
      chocolateBar.shift()
      spoiledRow--
    }
  } else if (direction === 'd') {
    eatsSpoiled = (spoiledRow === chocolateBar.length - 1)
    if (!eatsSpoiled) {
      chocolateBar.pop()
    }
  } else if (direction === 'l') {
    eatsSpoiled = (spoiledCol === 0)
    if (!eatsSpoiled) {
      chocolateBar.forEach(row => row.shift())
      spoiledCol--
    }
  } else if (direction === 'r') {
    eatsSpoiled = (spoiledCol === chocolateBar[0].length - 1)
    if (!eatsSpoiled) {
      chocolateBar.forEach(row => row.pop())
    }
  }
  
  if (eatsSpoiled) {
    addText("Game Over! You Lost!", { 
      y: 8, 
      color: color`6`,
    })
    setTimeout(() => initializeGame(5, 5), 2000)
  } else {
    updateMap()
    isPlayerTurn = !isPlayerTurn
    if (!isPlayerTurn) {
      computerMove()
    }
  }
}

/**
 * Computer Artificial Intelligence (AI) Move
 */
function computerMove() {
  const validMoves = ['u', 'd', 'l', 'r'].filter(dir => isValidMove(dir))
  if (validMoves.length > 0) {
    const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)]
    eatChocolate(randomMove)
  } else {
    addText("You Win! Computer Lost!", { 
      y: 8, 
      color: color`6`,
    })
    setTimeout(() => initializeGame(5, 5), 2000)
  }
}

/**
 * Valid Direction Check
 */
function isValidMove(direction) {
  if (direction === 'u') return spoiledRow > 0
  if (direction === 'd') return spoiledRow < chocolateBar.length - 1
  if (direction === 'l') return spoiledCol > 0
  if (direction === 'r') return spoiledCol < chocolateBar[0].length - 1
  return false
}
