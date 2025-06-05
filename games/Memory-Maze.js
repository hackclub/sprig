/*
@title: Memory Maze
*/

const startScreenTile = "s"
const pathTile = "p"
const wallTile = "w"
const playerTile = "x"
const exitTile = "e"
const borderTopLeft = "1"
const borderTop = "2"
const borderTopRight = "3"
const borderLeft = "4"
const borderRight = "5"
const borderBottomLeft = "6"
const borderBottom = "7"
const borderBottomRight = "8"
const background = "v"
const boxTile = "b"
const confetti1 = "c"
const confetti2 = "z"
const confetti3 = "q"



setLegend(
  [startScreenTile, bitmap`
................
................
................
................
................
................
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

  [pathTile, bitmap`
................
................
.....111........
.....111........
.....111........
.....111........
.....111........
.....111........
.....111........
.....111........
.....111........
.....111........
.....111........
.....111........
................`],

  [wallTile, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],

  [playerTile, bitmap`
................
................
................
................
................
................
....0000000.....
..00022222000...
.00222222222000.
002222022202220.
0222220222022200
0222220222022220
0222222222222220
0222222222222220
0222222222222200
.00000000000000.`],

  [exitTile, bitmap`
................
................
................
................
.....0000000000.
.....0444444440.
.....0444444440.
.....0444444440.
.....0444444440.
.....0000000000.
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........`],

  [ borderTopLeft, bitmap`
3333333333333333
3333............ 
33.............. 
3............... 
3............... 
3............... 
3............... 
3............... 
3............... 
3............... 
3............... 
3............... 
3............... 
3............... 
3............... 
3...............`],
  [ borderTop, bitmap`
3333333333333333
................
................
................
................
................
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
  [ borderTopRight, bitmap`
3333333333333333
............3333
..............33
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3`],
  [ borderLeft, bitmap`
3...............
3...............
3...............
3...............
3...............
3...............
3...............
3...............
3...............
3...............
3...............
3...............
3...............
3...............
3...............
3...............`],
  [ borderRight, bitmap`
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3`],
  [ borderBottomLeft, bitmap`
3...............
3...............
3...............
3...............
3...............
3...............
3...............
3...............
3...............
3...............
3...............
3...............
3...............
3...............
33..............
3333333333333333`],
  [ borderBottom, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
3333333333333333`],
  [ borderBottomRight, bitmap`
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
...............3
..............33
3333333333333333`],
  [ background, bitmap`
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
2222222222222222`],
  [ boxTile, bitmap`
1111111111111111
1111111111111111
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1111111111111111
1111111111111111`],
  [confetti1, bitmap`
................
................
................
................
.......6........
................
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
  [confetti2, bitmap`
................
................
................
................
.......3........
................
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
  [confetti3, bitmap`
................
................
................
................
.......5........
................
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

)

setSolids([wallTile, playerTile, startScreenTile])

setBackground(background)


// Maze layout
const mazeLayout = map`
wwwwwwwwwwwwwwww
w..............w
w...www...w..www
w.w...w.w.w..w.w
w.w.www.w.ww.w.e
w.w.w.w.w.w..w.w
w.w...w.w.w..w.w
w.wwwwwww.w.ww.w
w......ww.w..w.w
ww.wwwwww.ww.w.w
w..w......w..w.w
w.wwwwwwwwww.w.w
w..........w...w
wwwwwwwwwwwwwwww`
const invisibleLayout = map`
ssssssssssssssss
s..............s
s...sss...s..sss
s.s...s.s.s..s.s
s.s.sss.s.ss.s.e
s.s.s.s.s.s..s.s
s.s...s.s.s..s.s
s.sssssss.s.ss.s
s......ss.s..s.s
ss.ssssss.ss.s.s
s..s......s..s.s
s.ssssssssss.s.s
s..........s...s
ssssssssssssssss`
const mazeLayout2 = map`
w...w.....w.....
....w.......w.w.
..w...wwwwwww.w.
..w.........w.w.
..w...w...w.w.w.
......w...w.www.
.wwwwww...w.w.w.
.w....w.www.w.w.
.w....w.....w.w.
.w.w.....w..w.we
.w.w..........ww
...wwwwwwwwww.w.
wwww...w.w..w...
.....w..........`
const invisibleLayout2 = map`
s...s.....s.....
....s.......s.s.
..s...sssssss.s.
..s.........s.s.
..s...s...s.s.s.
......s...s.sss.
.ssssss...s.s.s.
.s....s.sss.s.s.
.s....s.....s.s.
.s.s.....s..s.se
.s.s..........ss
...ssssssssss.s.
ssss...s.s..s...
.....s..........`
const mazeLayout3 = map`
..........wew..w
w.ww.wwww.w.ww.w
w.ww...wwww.ww.w
w...ww.ww...w..w
..ww...w..www.ww
.w.w.w...w....w.
.w.w.w.wwwww.ww.
.w...www.ww.....
..wwww....www.w.
w......ww...w.w.
w.wwww...ww.w.w.
w...wwww.w..w.w.
w.ww.....w.wwww.
..ww.wwwww......`
const invisibleLayout3 = map`
..........ses..s
s.ss.sssss.s.ss.s
s.ss...ssss.ss.s
s...ss.ss...s..s
..ss...s..sss.ss
.s.s.s...s....s.
.s.s.s.sssss.ss.
.s...sss.ss.....
..ssss....sss.s.
s......ss...s.s.
s.ssss...ss.s.s.
s...ssss.s..s.s.
s.ss.....s.ssss.
..ss.sssss......`




let selectedLevel = 1
let inStartScreen = true
let movementEnabled = false
const playerPos = { x: 6, y: 10 }

// Start screen setup
const startMap = map`
12223
4s..5
4...5
4...5
67778`

function updateStartScreenText() {
  clearText()
  addText(" Memory Maze", { x: 4, y: 3, color: color`7` })
  addText(`Level: ${selectedLevel}`, { x: 6, y: 6, color: color`0` })
  addText("K/I for Level", { x: 4, y: 14, color: color`0` })
  addText("J to start", { x: 5, y: 12, color: color`0` })
}

setMap(startMap)
updateStartScreenText()

function startGame(level) {
  inStartScreen = false
  movementEnabled = false
  clearText()

  if (level === 1) {
    setMap(mazeLayout)
    playerPos.x = 6
    playerPos.y = 10
  } else if (level === 2) {
    setMap(mazeLayout2)
    playerPos.x = 6
    playerPos.y = 10
  } else if (level === 3) {
    setMap(mazeLayout3)
    playerPos.x = 6
    playerPos.y = 10
  }

  addSprite(playerPos.x, playerPos.y, playerTile)

  let countdown = 3
  const countdownInterval = setInterval(() => {
    clearText()
    addSprite(7, 5, boxTile)
    if (countdown > 0) {
      addText(`${countdown}`, { x: 9, y: 6, color: color`0` })
    }

    if (countdown === 0) {
      clearInterval(countdownInterval)
      setTimeout(() => {
        clearText()
        if (level === 1) setMap(invisibleLayout)
        if (level === 2) setMap(invisibleLayout2)
        if (level === 3) setMap(invisibleLayout3)
        addSprite(playerPos.x, playerPos.y, playerTile)
        hideWallsAndEnableMovement()
      }, 500)
    }

    countdown--
  }, 1000)
}

function hideWallsAndEnableMovement() {
  movementEnabled = true
}

function checkWin() {
  const player = getFirst(playerTile)
  const exit = getFirst(exitTile)
  if (player.x === exit.x && player.y === exit.y) {
    showWinScreen()
  }
}

function showWinScreen() {
  setMap(startMap)
  clearText()
  inStartScreen = false
  movementEnabled = false

  // Display "You Win" message
  addText("   YOU WIN!   ", { x: 3, y: 6, color: color`0` })
 

  // Wait for 3 seconds, then return to the home screen
  setTimeout(() => {
    setMap(startMap)
    updateStartScreenText()
    inStartScreen = true
    movementEnabled = false
  }, 3000)
}




// Movement
onInput("w", () => {
  if (movementEnabled) getFirst(playerTile).y -= 1
  checkWin()
})
onInput("s", () => {
  if (movementEnabled) getFirst(playerTile).y += 1
  checkWin()
})
onInput("a", () => {
  if (movementEnabled) getFirst(playerTile).x -= 1
  checkWin()
})
onInput("d", () => {
  if (movementEnabled) getFirst(playerTile).x += 1
  checkWin()
})

// Level controls
onInput("i", () => {
  if (inStartScreen) {
    selectedLevel++
    if (selectedLevel > 3) selectedLevel = 1
    updateStartScreenText()
  }
})

onInput("k", () => {
  if (inStartScreen) {
    selectedLevel--
    if (selectedLevel < 1) selectedLevel = 3
    updateStartScreenText()
  }
})

onInput("j", () => {
  if (inStartScreen) {
    startGame(selectedLevel)
  }
})
