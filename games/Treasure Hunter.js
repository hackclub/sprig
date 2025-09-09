/*
@title: Treasure Hunter
@author: Rudy Deana
@description: An treasure hunting adventure with power-ups, traps, and more levels!
@tags: ['adventure', 'collection', 'arcade']
@addedOn: 2025-09-04
*/

const player = "p"
const wall = "w"
const treasure = "t"
const enemy = "e"
const goal = "g"
const powerup = "u"
const trap = "x"
const key = "k"
const door = "d"
const crystal = "c"

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
................`],
  [ powerup, bitmap`
................
......5555......
.....555555.....
....55555555....
...5555555555...
..555555555555..
.55555555555555.
5555555555555555
5555555555555555
.55555555555555.
..555555555555..
...5555555555...
....55555555....
.....555555.....
......5555......
................`],
  [ trap, bitmap`
................
................
.....222222.....
....22222222....
...2222222222...
..222222222222..
.22222222222222.
2222222222222222
2222222222222222
.22222222222222.
..222222222222..
...2222222222...
....22222222....
.....222222.....
................
................`],
  [ key, bitmap`
................
................
......9999......
.....999999.....
.....999999.....
.....999999.....
.....999999.....
.....9999.......
.....9999.......
.....9999999....
.....9999999....
.....9999.......
................
................
................
................`],
  [ door, bitmap`
7777777777777777
7..............7
7..............7
7..............7
7..............7
7......77......7
7......77......7
7......77......7
7......77......7
7......77......7
7..............7
7..............7
7..............7
7..............7
7..............7
7777777777777777`],
  [ crystal, bitmap`
................
......1111......
.....111111.....
....11111111....
...1111111111...
..111111111111..
.11111111111111.
1111111111111111
1111111111111111
.11111111111111.
..111111111111..
...1111111111...
....11111111....
.....111111.....
......1111......
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
w..u....ew
w..p.x...w
we....u..w
w.ww.www.w
wt....e.tw
w...g....w
wwwwwwwwww`,
  
  map`
wwwwwwwwww
wt.....ktw
w.wwdwww.w
w.......ew
w..p.....w
we.......w
w.wwwdww.w
wt.k...etw
w...g....w
wwwwwwwwww`,
  
  map`
wwwwwwwwww
wc.e.w.ecw
w.www.w..w
w.....w..w
w.wp..w..w
w.....w.ew
w..ww.w..w
wc....w.cw
w....g...w
wwwwwwwwww`,
  
  map`
wwwwwwwwww
wtxwewxktw
w...w....w
www.w.wwww
w.u...e..w
w.wwdwww.w
w...p....w
wt.www.t.w
w.....g..w
wwwwwwwwww`,
  
  map`
wwwwwwwwww
wcxexexecw
wuwwwwwwuw
w.......ew
w.kpd....w
we.......w
wuwwwwwwuw
wcxexexecw
w...gx...w
wwwwwwwwww`
]

let score = 0
let gameWon = false
let lives = 3
let hasKey = false
let invulnerable = false
let invulnerableTime = 0
let crystalBonus = 0

// Store player movement direction for collision handling
let lastDirection = { x: 0, y: 0 }

setMap(levels[level])

setPushables({
  [player]: []
})

playTune(tune`
400: C4~400 + E4~400 + G4~400,
400: D4~400 + F4~400 + A4~400,
400: E4~400 + G4~400 + B4~400,
400: F4~400 + A4~400 + C5~400,
400: G4~400 + B4~400 + D5~400,
400: A4~400 + C5~400 + E5~400,
400: B4~400 + D5~400 + F5~400,
400: C5~400 + E5~400 + G5~400`)

onInput("w", () => {
  if (!gameWon && lives > 0) {
    lastDirection = { x: 0, y: -1 }
    getFirst(player).y -= 1
    checkCollisions()
  }
})

onInput("s", () => {
  if (!gameWon && lives > 0) {
    lastDirection = { x: 0, y: 1 }
    getFirst(player).y += 1
    checkCollisions()
  }
})

onInput("a", () => {
  if (!gameWon && lives > 0) {
    lastDirection = { x: -1, y: 0 }
    getFirst(player).x -= 1
    checkCollisions()
  }
})

onInput("d", () => {
  if (!gameWon && lives > 0) {
    lastDirection = { x: 1, y: 0 }
    getFirst(player).x += 1
    checkCollisions()
  }
})

onInput("j", () => {
  if (!gameWon && lives > 0) {
    resetLevel()
    score = Math.max(0, score - 10)
    addText("Restarted!", { x: 3, y: 7, color: color`3` })
    setTimeout(() => {
      clearText()
      updateHUD()
    }, 1000)
  }
})

function resetLevel() {
  setMap(levels[level])
  hasKey = false
  invulnerable = false
  invulnerableTime = 0
}

function checkCollisions() {
  const playerSprite = getFirst(player)
  if (!playerSprite) return
  
  // Wall collision
  const wallHit = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === wall)
  if (wallHit) {
    playerSprite.x -= lastDirection.x
    playerSprite.y -= lastDirection.y
    return
  }
  
  // Door collision
  const doorHit = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === door)
  if (doorHit) {
    if (!hasKey) {
      playerSprite.x -= lastDirection.x
      playerSprite.y -= lastDirection.y
      addText("Need key!", { x: 3, y: 7, color: color`3` })
      setTimeout(() => {
        clearText()
        updateHUD()
      }, 1000)
      return
    } else {
      doorHit.remove()
      hasKey = false
      score += 5
      playTune(tune`100: G4^100, 100: A4^100, 100: B4^100`)
    }
  }
  
  // Treasure collision
  const treasureHit = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === treasure)
  if (treasureHit) {
    treasureHit.remove()
    score += 10
    playTune(tune`100: G4^100, 100: A4^100, 100: B4^100, 100: C5^100`)
  }
  
  // Crystal collision
  const crystalHit = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === crystal)
  if (crystalHit) {
    crystalHit.remove()
    score += 25
    crystalBonus += 1
    playTune(tune`80: C5^80, 80: E5^80, 80: G5^80, 80: C6^80`)
    addText("Crystal!", { x: 3, y: 7, color: color`1` })
    setTimeout(() => {
      clearText()
      updateHUD()
    }, 1000)
  }
  
  // Key collision
  const keyHit = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === key)
  if (keyHit) {
    keyHit.remove()
    hasKey = true
    score += 15
    playTune(tune`120: F4^120, 120: A4^120, 120: C5^120`)
    addText("Got Key!", { x: 3, y: 7, color: color`9` })
    setTimeout(() => {
      clearText()
      updateHUD()
    }, 1000)
  }
  
  // Power-up collision
  const powerupHit = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === powerup)
  if (powerupHit) {
    powerupHit.remove()
    invulnerable = true
    invulnerableTime = 5000
    score += 20
    playTune(tune`100: C5^100, 100: D5^100, 100: E5^100, 100: F5^100, 100: G5^100`)
    addText("Power-up!", { x: 2, y: 7, color: color`5` })
    setTimeout(() => {
      clearText()
      updateHUD()
    }, 1000)
  }
  
  // Trap collision
  const trapHit = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === trap)
  if (trapHit && !invulnerable) {
    playTune(tune`150: C4^150, 150: A3^150, 150: F3^150`)
    score = Math.max(0, score - 15)
    addText("Trap!", { x: 3, y: 7, color: color`2` })
    setTimeout(() => {
      clearText()
      updateHUD()
    }, 1000)
  }
  
  // Enemy collision
  const enemyHit = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === enemy)
  if (enemyHit && !invulnerable) {
    playTune(tune`200: C4^200, 200: B3^200, 200: A3^200, 200: G3^200`)
    lives -= 1
    score = Math.max(0, score - 20)
    
    if (lives <= 0) {
      addText("GAME OVER!", { x: 2, y: 4, color: color`3` })
      addText(`Score: ${score}`, { x: 3, y: 6, color: color`6` })
      return
    }
    
    resetLevel()
    addText(`Lives: ${lives}`, { x: 3, y: 7, color: color`3` })
    setTimeout(() => {
      clearText()
      updateHUD()
    }, 1000)
  }
  
  // Goal collision
  const goalHit = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === goal)
  if (goalHit) {
    const treasuresLeft = getAll(treasure).length + getAll(crystal).length
    if (treasuresLeft === 0) {
      level++
      hasKey = false
      score += 50
      
      if (level >= levels.length) {
        gameWon = true
        let finalScore = score + (lives * 100) + (crystalBonus * 50)
        addText("VICTORY!", { x: 2, y: 3, color: color`4` })
        addText(`Score: ${finalScore}`, { x: 2, y: 5, color: color`6` })
        addText(`Lives: +${lives * 100}`, { x: 2, y: 6, color: color`0` })
        addText(`Crystal: +${crystalBonus * 50}`, { x: 1, y: 7, color: color`1` })
        playTune(tune`250: C5^250, 250: E5^250, 250: G5^250, 250: C6^250, 500: C6^500`)
      } else {
        resetLevel()
        addText(`Level ${level + 1}!`, { x: 2, y: 7, color: color`4` })
        playTune(tune`120: C4^120, 120: E4^120, 120: G4^120, 120: C5^120, 120: E5^120`)
        setTimeout(() => {
          clearText()
          updateHUD()
        }, 1500)
      }
    } else {
      addText("Get all treasures!", { x: 1, y: 7, color: color`3` })
      setTimeout(() => {
        clearText()
        updateHUD()
      }, 1500)
    }
  }
  
  updateHUD()
}

function updateHUD() {
  clearText()
  if (!gameWon && lives > 0) {
    addText(`L:${level + 1} S:${score}`, { x: 0, y: 0, color: color`2` })
    addText(`♥${lives} T:${getAll(treasure).length + getAll(crystal).length}`, { x: 0, y: 1, color: color`3` })
    
    if (hasKey) {
      addText("K", { x: 8, y: 0, color: color`9` })
    }
    
    if (invulnerable) {
      addText("P", { x: 9, y: 0, color: color`5` })
    }
  }
}

// Enemy movement
let enemyTimer = 0
setInterval(() => {
  if (gameWon || lives <= 0) return
  
  enemyTimer++
  const enemies = getAll(enemy)
  
  enemies.forEach((enemySprite, index) => {
    const playerSprite = getFirst(player)
    if (!playerSprite) return
    
    let newX = enemySprite.x
    let newY = enemySprite.y
    
    // Different movement patterns
    if (index % 3 === 0) {
      // Random movement
      const directions = [
        { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }
      ]
      const randomDir = directions[Math.floor(Math.random() * directions.length)]
      newX += randomDir.x
      newY += randomDir.y
    } else if (index % 3 === 1) {
      // Chase player
      if (Math.abs(playerSprite.x - enemySprite.x) > Math.abs(playerSprite.y - enemySprite.y)) {
        newX += playerSprite.x > enemySprite.x ? 1 : -1
      } else {
        newY += playerSprite.y > enemySprite.y ? 1 : -1
      }
    } else {
      // Patrol
      const patrolDirs = [
        { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }
      ]
      const patrolDir = patrolDirs[Math.floor(enemyTimer / 3) % 4]
      newX += patrolDir.x
      newY += patrolDir.y
    }
    
    // Check if move is valid
    const tileAtNewPos = getTile(newX, newY)
    const hasObstacle = tileAtNewPos.some(sprite => 
      sprite.type === wall || sprite.type === door
    )
    
    if (!hasObstacle && newX >= 0 && newY >= 0 && newX < width() && newY < height()) {
      enemySprite.x = newX
      enemySprite.y = newY
      
      // Check collision with player
      if (enemySprite.x === playerSprite.x && enemySprite.y === playerSprite.y && !invulnerable) {
        playTune(tune`200: C4^200, 200: B3^200, 200: A3^200, 200: G3^200`)
        lives -= 1
        score = Math.max(0, score - 20)
        
        if (lives <= 0) {
          addText("GAME OVER!", { x: 2, y: 4, color: color`3` })
          addText(`Score: ${score}`, { x: 3, y: 6, color: color`6` })
          return
        }
        
        resetLevel()
        addText(`Lives: ${lives}`, { x: 3, y: 7, color: color`3` })
        setTimeout(() => {
          clearText()
          updateHUD()
        }, 1000)
      }
    }
  })
}, 800)

// Invulnerability timer
setInterval(() => {
  if (invulnerable) {
    invulnerableTime -= 100
    if (invulnerableTime <= 0) {
      invulnerable = false
      invulnerableTime = 0
      updateHUD()
    }
  }
}, 100)

updateHUD()

addText("WASD: Move, J: Restart", { x: 0, y: 14, color: color`0` })
addText("Collect all treasures!", { x: 0, y: 15, color: color`0` })
