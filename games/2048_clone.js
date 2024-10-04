/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 2048
@author: VeressIris
@tags: ['endless', 'puzzle']
@addedOn: 2024-08-19
*/

const two = "1"
const four = "2"
const eight = "3"
const sixteen = "4"
const thirtytwo = "5"
const sixtyfour = "6"
const onetwentyeight = "7"
const twofiftysix = "8"
const fivetwelve = "9"
const tentwentyfour = "0"
const twentyfourtyeight = "w"
const block = "b"

setLegend(
  [two, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666600000666666
6666066660066666
6666066666066666
6666666660066666
6666666660666666
6666666600666666
6666666006666666
6666600066666666
6666006666666666
6660000000000666
6666666666666666
6666666666666666
6666666666666666`],
  [four, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFF00FFFFFF
FFFFFFF00FFFFFFF
FFFFFF00FFFFFFFF
FFFFF00FFFFFFFFF
FFFF00FFFFFFFFFF
FFFF000000FFFFFF
FFFFFFFF00FFFFFF
FFFFFFFFF0FFFFFF
FFFFFFFFF0FFFFFF
FFFFFFFFF0FFFFFF
FFFFFFFFF0FFFFFF
FFFFFFFFF0FFFFFF
FFFFFFFFF0FFFFFF
FFFFFFFFF0FFFFFF
FFFFFFFFFFFFFFFF`],
  [eight, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD0000DDDDDD
DDDDD0DDDD0DDDDD
DDDDD0DDDD0DDDDD
DDDDD0DDDD0DDDDD
DDDDD0DDDD0DDDDD
DDDDDD0000DDDDDD
DDDDD0DDDD0DDDDD
DDDDD0DDDD0DDDDD
DDDDD0DDDD0DDDDD
DDDDD0DDDD0DDDDD
DDDDDD0000DDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [sixteen, bitmap`
7777777777777777
7777777777777777
7777707700077777
7777007077707777
7770007077777777
7700707077777777
7777707077777777
7777707077777777
7777707070077777
7777707007707777
7777707077707777
7777707077707777
7777707077707777
7777707077707777
7777707700077777
7777777777777777`],
  [thirtytwo, bitmap`
5555555555555555
5555555555555555
5555555555555555
5550005550005555
5505550500500555
5555550505550555
5555550555550555
5550005555500555
5555550555005555
5555550550055555
5555550550555555
5505550500555555
5550005500000555
5555555555555555
5555555555555555
5555555555555555`],
  [sixtyfour, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHH000HHHHH0HHHH
HH00HH0HHH0HHHHH
HH0HHHHHH0HHHHHH
HH0HHHHH0HHHHHHH
HH0HHHHH00000HHH
HH0H000HHHHH0HHH
HH00HH0HHHHH0HHH
HH0HHH0HHHHH0HHH
HH0HHH0HHHHH0HHH
HH0HHH0HHHHH0HHH
HHH000HHHHHH0HHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [onetwentyeight, bitmap`
8888888888888888
8888888888888888
8888888888888888
8808880008880008
8008800800808880
0808808880808880
8808888880808880
8808888800808880
8808888008880008
8808880088808880
8808880888808880
8808800888808880
8808800000880008
8888888888888888
8888888888888888
8888888888888888`],
  [twofiftysix, bitmap`
4444444444444444
4444444444444444
4000440000440004
0440040444404440
0444040444404440
4444040444404440
4444040444404440
4440040000440004
4400444440404440
4004444440404440
0044444440404440
0444444440404440
0000040000440004
4444444444444444
4444444444444444
4444444444444444`],
  [fivetwelve, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
C0000CCC00CC000C
C0CCCCC000C0CC00
C0CCCC00C0CCCCC0
C0CCCCCCC0CCCCC0
C0CCCCCCC0CCCC00
C0000CCCC0CCCC0C
CCCC0CCCC0CCC00C
CCCC0CCCC0CCC0CC
CCCC0CCCC0CC00CC
CCCC0CCCC0CC0CCC
CCCC0CCCC0C00CCC
C0000CCCC0C00000
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [tentwentyfour, bitmap`
3333333333333333
3333330330033333
3333300303303333
3333030303303333
3333330303303333
3333330303303333
3333330330033333
3333333333333333
3333300333303333
3333033033033333
3333333030333333
3333330030000333
3333300333330333
3333003333330333
3333000033330333
3333333333333333`],
  [twentyfourtyeight, bitmap`
9999999999999999
9999009990099999
9990900909909999
9999990909909999
9999990909909999
9999909909909999
9999009909909999
9990000090099999
9999999999999999
9999909990099999
9999099909909999
9990999909909999
9990000990099999
9999990909909999
9999990909909999
9999990990099999`],
  [block, bitmap`
1111111111111111
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1111111111111111`]
)

setSolids([two, four, eight, sixteen, thirtytwo, sixtyfour, onetwentyeight, twofiftysix, fivetwelve, tentwentyfour, twentyfourtyeight, block])

const emptyLevel =
  map`
.bbbb.
.bbbb.
.bbbb.
.bbbb.`
setMap(emptyLevel)

function updateScore() {
  scoreDigitArr = score.toString().split('')
  scoreString = scoreDigitArr.join('\n')
  addText(scoreString, {
    x: 1,
    y: 2,
    color: color`0`
  })
}

var score = 0
var scoreDigitArr = []
var scoreString = ""
var gameOver = false
var won = false

var board = Array(4).fill().map(() => Array(4).fill(0))
var boardVisual = emptyLevel

function resetGame() {
  gameOver = false
  won = false
  setMap(emptyLevel)
  
  board = Array(4).fill().map(() => Array(4).fill(0))
  boardVisual = emptyLevel
  
  score = 0
  scoreDigitArr = []
  scoreString = ""
  clearText()

  startGame()
}

const numberMapping = {
  2: two,
  4: four,
  8: eight,
  16: sixteen,
  32: thirtytwo,
  64: sixtyfour,
  128: onetwentyeight,
  256: twofiftysix,
  512: fivetwelve,
  1024: tentwentyfour,
  2048: twentyfourtyeight
}

function getAvailableSpots() {
  const res = []
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        res.push({
          x: j,
          y: i
        })
      }
    }
  }
  return res
}

function getRandomNum() {
  return Math.floor(Math.random() * 4)
}

function getTwoOrFour() {
  return Math.random() > 0.8 ? 4 : 2
}

function possibleMoves() {
  for (let i = 1; i < 3; i++) {
    for (let j = 1; j < 3; j++) {
      if (board[i][j] === board[i + 1][j] || board[i][j] === board[i - 1][j] ||
          board[i][j] === board[i][j + 1] || board[i][j] === board[i][j - 1])
        return true
    }
  }
  return false
}

function getRandomPos() {
  const availableSpots = getAvailableSpots()
  if (availableSpots.length === 0) {
    return null
  }
  
  const randomIndex = Math.floor(Math.random() * availableSpots.length)
  return availableSpots[randomIndex]
}

function splitBoardStringIntoArray() {
  return boardVisual.trim().split('\n').map(line => line.split(''))
}

function returnToOriginalForm(lines) {
  return lines.map(line => line.join('')).join('\n')
}

function startGame() {
  const randomPos1 = getRandomPos()
  const randomNumber1 = getTwoOrFour()
  board[randomPos1.y][randomPos1.x] = randomNumber1

  const randomPos2 = getRandomPos()
  const randomNumber2 = getTwoOrFour()
  board[randomPos2.y][randomPos2.x] = randomNumber2

  boardVisual = splitBoardStringIntoArray()
  boardVisual[randomPos1.y][randomPos1.x + 1] = numberMapping[randomNumber1]
  boardVisual[randomPos2.y][randomPos2.x + 1] = numberMapping[randomNumber2]
  boardVisual = returnToOriginalForm(boardVisual)

  setMap(boardVisual)

  score += randomNumber1 + randomNumber2
  updateScore()
}

function placeNewNumber() { // ONLY IF CAN MOVE IN SPECIFIED DIRECTION
  const randomPos = getRandomPos()
  const val = getTwoOrFour()
  board[randomPos.y][randomPos.x] = val

  boardVisual = splitBoardStringIntoArray()
  boardVisual[randomPos.y][randomPos.x + 1] = numberMapping[val]
  boardVisual = returnToOriginalForm(boardVisual)

  setMap(boardVisual)

  // update score
  score += val
  updateScore()
}

function applyVisualChanges() {
  boardVisual = returnToOriginalForm(boardVisual)
  setMap(boardVisual)

  updateScore()
}

// depending on the axis + update score + check if won
function updateBoardsData(val, newPos, i, j, axis) {
  if (val == 2048) {
    won = true
    addText("     You win!\nPress i to restart", {
      x: 1,
      y: 7,
      color: color`4`
    })
  }
  
  if (axis == "y") {
    // update board in memory
    board[newPos][j] = val
    board[i][j] = 0
          
    // change board visual data
    boardVisual[newPos][j + 1] = numberMapping[val]
    boardVisual[i][j + 1] = 'b'
  } else if (axis == "x") {
    // update board in memory
    board[i][newPos] = val
    board[i][j] = 0
          
    // change board visual data
    boardVisual[i][newPos + 1] = numberMapping[val]
    boardVisual[i][j + 1] = 'b'
  }
}

onInput("w", () => {
  if (won) return
  
  if (getAvailableSpots().length === 0 && !possibleMoves()) {
    gameOver = true
    addText("     Game over!\nPress i to restart", {
      x: 1,
      y: 7,
      color: color`3`
    })
    return
  }
  
  boardVisual = splitBoardStringIntoArray()
  let addNewNumber = false
  let merges = 0
  
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        let val = board[i][j]
        let newPos = i - 1
        while (newPos > 0 && board[newPos][j] === 0) {
          newPos--
        }

        // merge tiles (essentially double the value)
        if (board[newPos][j] === val && merges < 2) {
          val *= 2
          score += val // update score
          merges++
        } else if (board[newPos][j] != 0) { // move to nearest empty tile
          newPos++
        }
        
        // if tile could/can move
        if (newPos != i) {
          addNewNumber = true
          
          updateBoardsData(val, newPos, i, j, "y")
        }
      }
    }
  }

  applyVisualChanges()
    
  if (addNewNumber) placeNewNumber()
})

onInput("s", () => {
  if (won) return
  
  if (getAvailableSpots().length === 0 && !possibleMoves()) {
    gameOver = true
    addText("     Game over!\nPress i to restart", {
      x: 1,
      y: 7,
      color: color`3`
    })
    return
  }
  
  boardVisual = splitBoardStringIntoArray()
  let addNewNumber = false
  let merges = 0
  
  for (let i = 2; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        let val = board[i][j]
        let newPos = i + 1
        while (newPos < 3 && board[newPos][j] === 0) {
          newPos++
        }

        // merge tiles (essentially double the value)
        if (board[newPos][j] === val && merges < 2) {
          val *= 2
          score += val // update score
          merges++
        } else if (board[newPos][j] != 0) { // move to nearest empty tile
          newPos--
        }
        
        // if tile could/can move
        if (newPos != i) {
          addNewNumber = true
          
          updateBoardsData(val, newPos, i, j, "y")
        }
      }
    }
  }

  applyVisualChanges()

  if (addNewNumber) placeNewNumber()
})

onInput("a", () => {
  if (won) return
  
  if (getAvailableSpots().length === 0 && !possibleMoves()) {
    gameOver = true
    addText("     Game over!\nPress i to restart", {
      x: 1,
      y: 7,
      color: color`3`
    })
    return
  }
  
  boardVisual = splitBoardStringIntoArray()
  let addNewNumber = false
  let merges = 0
  
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        let val = board[i][j]
        let newPos = j - 1
        while (newPos > 0 && board[i][newPos] === 0) {
          newPos--
        }

        // merge tiles (essentially double the value)
        if (board[i][newPos] === val && merges < 2) {
          val *= 2
          score += val // update score
          merges++
        } else if (board[i][newPos] != 0) { // move to nearest empty tile
          newPos++
        }
        
        // if tile could/can move
        if (newPos != j) {
          addNewNumber = true
          
          updateBoardsData(val, newPos, i, j, "x")
        }
      }
    }
  }

  applyVisualChanges()

  if (addNewNumber) placeNewNumber()
})

onInput("d", () => { 
  if (won) return
  
  if (getAvailableSpots().length === 0 && !possibleMoves()) {
    gameOver = true
    addText("     Game over!\nPress i to restart", {
      x: 1,
      y: 7,
      color: color`3`
    })
    return
  }
  
  boardVisual = splitBoardStringIntoArray()
  let addNewNumber = false
  let merges = 0
  
  for (let i = 0; i < 4; i++) {
    for (let j = 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        let val = board[i][j]
        let newPos = j + 1
        while (newPos > 0 && board[i][newPos] === 0) {
          newPos++
        }

        // merge tiles (essentially double the value)
        if (board[i][newPos] === val && merges < 2) {
          val *= 2
          score += val // update score
          merges++
        } else if (board[i][newPos] != 0) { // move to nearest empty tile
          newPos--
        }
        
        // if tile could/can move
        if (newPos != j) {
          addNewNumber = true
          
          updateBoardsData(val, newPos, i, j, "x")
        }
      }
    }
  }

  applyVisualChanges()

  if (addNewNumber) placeNewNumber()
})

onInput("i", () => {
  if (!gameOver && !won) return
  resetGame()
})

startGame()
