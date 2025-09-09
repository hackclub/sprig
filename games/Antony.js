/*
@title: Antony
@author: Chee Yong Lee
@tags: ['puzzle']
@addedOn: 2025-08-05
@description: The objective of the game is to lead Antony to collect crumbs and proceed to the next room while dodging zombies, while using the least time as possible.

Instructions:

Click "run" to start the game
Press "j" to restart game
Use "w,a,s,d" to move Antony 

The objective is to collect the crumbs, prevent the zombies and find the way out to the next room
*/


const ant = "a"
const wall = "w"
const crumb = "c"
const exit = "e"
const floor = "f"
const enemy = "x"

var inputTimes = 0
var startTime
let gameOver = false

setLegend(
  [ ant, bitmap`
................
................
.......66.......
......6006......
......0660......
......0660......
......6666......
......0660......
.....006600.....
.....006600.....
......0660......
......0660......
......0660......
......0000......
................
................` ],
  [ wall, bitmap`
CCC11CCCC1CCCC1C
CCC11CCCC1CCCC1C
11CCCC1CCCCC1CCC
11CCCC1CCCCC1CCC
CCC1111111111111
11CCCCCCC1111CCC
CCCCCCCCCCCCCCCC
CCC111CCCCCCC111
1CCCCCC111CCC111
1C1111CCCCC1CCCC
1CCCCCC111C11111
11C111CCCCC11111
CCC11111CCCCCCCC
CCCCCCCCC1111111
1C11C111CCCCCCCC
1C11C111C111C111` ],
  [ crumb, bitmap`
................
................
......4444......
.....446644.....
.....446644.....
......4444......
................
................
................
................
................
................
................
................
................
................` ],
  [ exit, bitmap`
................
................
......9999......
.....9...99.....
....9.....99....
....9......9....
....9......9....
.....9....9.....
......9999......
................
................
................
................
................
................
................` ],
  [ floor, bitmap`
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
................` ],
  [ enemy, bitmap`
................
................
......3333......
.....366663.....
.....366663.....
......3333......
......3333......
.....366663.....
.....366663.....
......3333......
......3333......
......3333......
......3333......
................
................
................` ]
)

setSolids([ant, wall])

setPushables({ [ant]: [] })

let level = 0

const levels = [
  map`
wwwwwwww
wa....cw
w...w..w
w.c.w..w
w.www..w
w...c..w
w......w
wwwwwwww`,
  map`
wwwwwwww
w.c....w
w..ww..w
w.a....w
w..w.c.w
w.c....w
w......w
wwwwwwww`,
  map`
wwwwwwww
w.c.a..w
w..ww..w
w.c....w
w..w.c.w
w...c..w
w..x...w
wwwwwwww`,
  map`
wwwwwwww
w.c.a..w
w...w..w
w.c....w
w..w.c.w
w.w....w
w...c..w
wwwwwwww`,
  map`
wwwwwwww
w.c.a.cw
wwwww..w
w.cw...w
w..w.c.w
w.ww.www
wc..c..w
wwwwwwww`,
  map`
wwwwwwww
wwc.awcw
ww.wwwfw
wwcw...w
w..w.c.w
w.wwww.w
w...c..w
wwwwwwww`,
  map`
wwwwwwwwww
wa..c....w
w..ww..c.w
w.c....x.w
w..w.c..ww
w.w....c.w
w...c...ww
w..c....cw
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.c.a...cw
w..ww..x.w
w.c....c.w
w..w.c..ww
w.ww.www.w
w.c..c..cw
w.....c..w
w..x.....w
wwwwwwwwww`,
  map`
wwwwwwwwww
wa..c..x.w
wfwcwf..cw
wfcwwcf..w
ww.www.w.w
wcfwwf...w
ww..c..c.w
w..c..c..w
w......x.w
wwwwwwwwww`
]

function shuffle(array) {
  let currentIndex = array.length
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }
}

shuffle(levels)
setMap(levels[level])
setBackground(floor)

function checkCrumbs() {
  if (tilesWith(crumb).length === 0 && tilesWith(exit).length === 0) {
    const widthMap = width()
    const heightMap = height()
    const centerX = Math.floor(widthMap / 2)
    const centerY = Math.floor(heightMap / 2)

    const tile = getTile(centerX, centerY)
    if (!tile.some(t => t.type === wall)) {
      addSprite(centerX, centerY, exit)
    } else {
      const antSprite = getFirst(ant)
      addSprite(antSprite.x, antSprite.y, exit)
    }
  }
}

function msToMinSec(millis) {
  var minutes = Math.floor(millis / 60000)
  var seconds = ((millis % 60000) / 1000).toFixed(0)
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
}

function checkWin() {
  if (tilesWith(ant, exit).length > 0 && !gameOver) {
    level++
    if (level < levels.length) {
      setMap(levels[level])
    } else {
      clearText()
      addText("Antony Wins!", { y: 4, color: color`0` })
      addText("Time Elapsed: "+msToMinSec(performance.now() - startTime), { y: 6, color: color`7` })
      gameOver = true
    }
  }
}

function checkGameOver() {
  if (tilesWith(ant, enemy).length > 0 && !gameOver) {
    gameOver = true
    clearText()
    addText("Game Over!", { y: 4, color: color`3` })
    addText("Press J to Restart", { y: 6, color: color`7` })
  }
}

function moveEnemies() {
  if (gameOver) return
  const enemies = getAll(enemy)
  enemies.forEach(e => {
    const dir = [[1,0],[-1,0],[0,1],[0,-1]][Math.floor(Math.random()*4)]
    const newX = e.x + dir[0]
    const newY = e.y + dir[1]
    const tile = getTile(newX, newY)

    if (!tile.some(t => t.type === wall || t.type === enemy)) {
      e.x = newX
      e.y = newY
    }
  })
  checkGameOver()
}

setInterval(moveEnemies, 700)

onInput("w", () => moveAnt(0, -1))
onInput("s", () => moveAnt(0, 1))
onInput("a", () => moveAnt(-1, 0))
onInput("d", () => moveAnt(1, 0))

function moveAnt(dx, dy) {
  if (gameOver) return

  if(inputTimes == 0) {
    startTime = performance.now()
  }
  inputTimes ++
  const antSprite = getFirst(ant)
  const newX = antSprite.x + dx
  const newY = antSprite.y + dy
  const tile = getTile(newX, newY)

  if (!tile.some(t => t.type === wall)) {
    antSprite.x = newX
    antSprite.y = newY

    if (tile.some(t => t.type === crumb)) {
      clearTile(newX, newY)
      addSprite(newX, newY, floor)
      addSprite(newX, newY, ant)
    }

    checkCrumbs()
    checkWin()
    checkGameOver()
  }
}

onInput("j", () => {
  level = 0
  shuffle(levels)
  setMap(levels[level])
  inputTimes = 0
  startTime = undefined
  gameOver = false
  clearText()
})
