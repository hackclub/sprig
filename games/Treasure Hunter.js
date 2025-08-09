/*
@title: Treasure Hunter
@author: Rudy Deana
@description: A little game about taking some coins and don't get killes
@tags: ['adventure', 'collection']
@addedOn: 2025-07-30
*/
const player = "p"
const wall = "w"
const treasure = "t"
const enemy = "e"
const goal = "g"
setLegend(
  [ player, bitmap`
................
................
......0000......
.....000000.....
.....000000.....
......0000......
......0000......
......0000......
......0000......
.....000000.....
....00000000....
....00....00....
....00....00....
................
................
................`],
  [ wall, bitmap`
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
  [ treasure, bitmap`
................
................
......6666......
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
......6666......
................
................
................`],
  [ enemy, bitmap`
................
................
......3333......
.....333333.....
.....333333.....
......3333......
......3333......
......3333......
......3333......
.....333333.....
....33333333....
....33....33....
....33....33....
................
................
................`],
  [ goal, bitmap`
................
.......44.......
......4444......
.....444444.....
....44444444....
...4444444444...
..444444444444..
.44444444444444.
.44444444444444.
..444444444444..
...4444444444...
....44444444....
.....444444.....
......4444......
.......44.......
................`]
)

let level = 0
const levels = [
  map`
wwwwwwwwww
w........w
w.t....t.w
w........w
w..p.....w
w........w
w.t....t.w
w........w
w......g.w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.t.....tw
w..wwww..w
w..w..w..w
w..w..w.ew
w..w..w..w
w..wwww..w
w........w
wp......gw
wwwwwwwwww`,
  map`
wwwwwwwwww
wt......tw
w.ww..ww.w
w........w
w..p..e..w
w........w
w.ww..ww.w
wt......tw
w...g....w
wwwwwwwwww`,
  map`
wwwwwwwwww
wt.e....tw
w.www.ww.w
w.......ew
w..p.....w
we.......w
w.ww.www.w
wt....e.tw
w...g....w
wwwwwwwwww`
]

let score = 0
let gameWon = false
setMap(levels[level])

setPushables({
  [player]: []
})
playTune(tune`
500: C4~500 + E4~500 + G4~500,
500: D4~500 + F4~500 + A4~500,
500: E4~500 + G4~500 + B4~500,
500: F4~500 + A4~500 + C5~500,
500: G4~500 + B4~500 + D5~500,
500: A4~500 + C5~500 + E5~500,
500: B4~500 + D5~500 + F5~500,
500: C5~500 + E5~500 + G5~500`)

onInput("w", () => {
  getFirst(player).y -= 1
  checkCollisions()
})

onInput("s", () => {
  getFirst(player).y += 1
  checkCollisions()
})

onInput("a", () => {
  getFirst(player).x -= 1
  checkCollisions()
})

onInput("d", () => {
  getFirst(player).x += 1
  checkCollisions()
})

function checkCollisions() {
  const playerSprite = getFirst(player)
  
  const wallHit = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === wall)
  if (wallHit) {
    if (getFirst(player).x !== playerSprite.x) {
      playerSprite.x = playerSprite.x > 0 ? playerSprite.x - 1 : playerSprite.x + 1
    }
    if (getFirst(player).y !== playerSprite.y) {
      playerSprite.y = playerSprite.y > 0 ? playerSprite.y - 1 : playerSprite.y + 1
    }
    return
  }
  
  const treasureHit = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === treasure)
  if (treasureHit) {
    treasureHit.remove()
    score += 10
    playTune(tune`
150: G4^150,
150: A4^150,
150: B4^150,
150: C5^150`)
  }
  
  const enemyHit = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === enemy)
  if (enemyHit) {
    playTune(tune`
200: C4^200,
200: B3^200,
200: A3^200,
200: G3^200`)
    score = Math.max(0, score - 20)
    setMap(levels[level])
  }
  
  const goalHit = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === goal)
  if (goalHit) {
    if (getAll(treasure).length === 0) {
      level++
      if (level >= levels.length) {
        gameWon = true
        addText("YOU WIN!", { x: 4, y: 4, color: color`4` })
        addText(`Score: ${score}`, { x: 3, y: 6, color: color`6` })
        playTune(tune`
300: C5^300,
300: E5^300,
300: G5^300,
300: C6^300,
600: C6^600`)
      } else {
        setMap(levels[level])
        playTune(tune`
150: C4^150,
150: E4^150,
150: G4^150,
150: C5^150,
150: E5^150`)
      }
    } else {
      addText("Take all the treasure!", { x: 1, y: 8, color: color`3` })
      setTimeout(() => {
        clearText()
      }, 2000)
    }
  }
  
  clearText()
  if (!gameWon) {
    addText(`Level: ${level + 1}`, { x: 1, y: 1, color: color`2` })
    addText(`Score: ${score}`, { x: 1, y: 2, color: color`6` })
    addText(`Treasure: ${getAll(treasure).length}`, { x: 1, y: 3, color: color`4` })
  }
}

setInterval(() => {
  if (gameWon) return
  
  const enemies = getAll(enemy)
  enemies.forEach(enemySprite => {
    const directions = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 }
    ]
    
    const randomDir = directions[Math.floor(Math.random() * directions.length)]
    const newX = enemySprite.x + randomDir.x
    const newY = enemySprite.y + randomDir.y
    
    const tileAtNewPos = getTile(newX, newY)
    const hasWall = tileAtNewPos.some(sprite => sprite.type === wall)
    
    if (!hasWall && newX >= 0 && newY >= 0 && newX < width() && newY < height()) {
      enemySprite.x = newX
      enemySprite.y = newY
      
      const playerSprite = getFirst(player)
      if (enemySprite.x === playerSprite.x && enemySprite.y === playerSprite.y) {
        playTune(tune`
200: C4^200,
200: B3^200,
200: A3^200,
200: G3^200`)
        score = Math.max(0, score - 20)
        setMap(levels[level])
      }
    }
  })
}, 1000)

checkCollisions()

addText("WASD for moving", { x: 1, y: 14, color: color`0` })
addText("take all the treasure", { x: 1, y: 15, color: color`0` })
