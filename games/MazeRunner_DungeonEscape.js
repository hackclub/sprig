/*
@title: Maze Runner (Dungeon Escape Edition)
@author: Adya
@tags: ['maze', 'runner', 'puzzle', 'action', 'escape']
@addedOn: 2025-06-02
*/

const player = "p"
const wall = "w"
const exit = "e"
const coin = "c"
const background = "b"
const spike = "s"
const lava = "l"
const enemy = "m"
const key = "k"
const door = "d"
const powerup = "u"
const checkpoint = "x"

setLegend(
  [player, bitmap`
................
.........0......
.......001000...
......01111110..
......01LLLL10..
......011LL110..
......001LL100..
........000000..
....00L011110L0.
00000L0101110L10
066F0L0000000LL0
.00F00.01111100.
...0...0L00L00..
.......00..00...
................
................`],
  [wall, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0L11111111111110
0L11111111111110
0L11111111111110
0L11111111111110
0L11111111111110
0L11111111111110
0L11111111111110
0L11111111111110
0L11111111111110
0L11111111111110
0LLLL11111111110
0000000000000000`],
  [exit, bitmap`
................
................
...777777777....
..79999999997...
.5799999999975..
.7999999999997..
.7999999999997..
.7999999999997..
.7999999999997..
.7999999999997..
.7999999999997..
.7999999999997..
.5799999999975..
..79999999997...
...777777777....
................`],
  [coin, bitmap`
................
................
.....666666.....
....66666666....
...6666666666...
...6666FF6666...
...666F66F666...
...666F66F666...
...6666FF6666...
...6666666666...
....66666666....
.....666666.....
................
................
................
................`],
  [background, bitmap`
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
  [spike, bitmap`
................
................
................
................
................
................
......0.0.......
.....0.0.0......
....0.0.0.0.....
...000000000....
..00000000000...
.0000000000000..
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [lava, bitmap`
3333333333333333
3333333333333333
3393939393939333
3939393939393933
3393939393939333
3939339393393939
3339393939393339
3939393939393939
3393939393939333
3939393939393933
3393939393939333
3939393939393939
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [enemy, bitmap`
................
................
.....333333.....
....33333333....
....3333333.....
....33.33.33....
....33.33.33....
....33333333....
....33333333....
.....333333.....
.....3....3.....
.....3....3.....
.....33..33.....
.....33..33.....
................
................`],
  [key, bitmap`
................
................
.....FFFF.......
....F6666F......
....F6666F......
.....FFFF.......
......F.........
......FFFFF.....
......F...F.....
......FFFFF.....
......F.........
......F.........
................
................
................
................`],
  [door, bitmap`
9999999999999999
9777777777777779
9777777777777779
9777777777777779
9777777777777779
9777777777777779
9777777777777779
977777FF77777779
977777FF77777779
9777777777777779
9777777777777779
9777777777777779
9777777777777779
9777777777777779
9777777777777779
9999999999999999`],
  [powerup, bitmap`
................
................
......2222......
.....222222.....
....22222222....
....22FFFF22....
....2FF22FF2....
....2F2222F2....
....2F2222F2....
....2FF22FF2....
....22FFFF22....
....22222222....
.....222222.....
......2222......
................
................`],
  [checkpoint, bitmap`
................
.......44.......
......4444......
.....444444.....
....44444444....
...4444444444...
..444444444444..
.44444444444444.
4444444444444444
.44444444444444.
..444444444444..
...4444444444...
....44444444....
.....444444.....
......4444......
.......44.......`]
)

setBackground(background)
setSolids([player, wall, door])

let level = 0
let score = 0
let timeLeft = 90
let gameTimer
let gameActive = true
let enemyTimer
let enemies = []
let hasKey = false
let lives = 3
let invulnerable = false
let invulnerabilityTimer = 0
let powerupActive = false
let powerupTimeLeft = 0
let checkpointReached = false
let checkpointPosition = null
let coinsCollected = 0
let invulnerabilityUsed = false

const levels = [
  // Level 1 - simple tutorial level (key/door mechanic)
  map`
wwwwwwwwwwwwww
wp...........w
w.wwww.wwww..w
w.w..c.....w.w
w.w.wwwwww.w.w
w.....k....w.w
wwwwww.wwwww.w
w.c..........w
w.wwwwwwwwww.w
w...........cw
w.wwwwwwwdwwww
w............w
w............e
wwwwwwwwwwwwww`,

  // Level 2 - introduction of checkpoints & shield
  map`
wwwwwwwwwwwwwwwwww
wp...............w
w.wwww.wwwwwwww..w
w.w..........w...w
w.w.cc.wwww..w.w.w
w.w....w.....w.w.w
w.wwww.w.wwwww.w.w
w...s..w..x..s.w.w
w.wwwwwwwwwwww.w.w
w.w............w.w
w.w.cc.wwwwwwwww.w
w.w..............w
w.wwwwwwwwwwwwww.w
w.c.....s.....u..w
w................e
wwwwwwwwwwwwwwwwww`,

  // Level 3 - more complex: with all elements*
  map`
wwwwwwwwwwwwwwwwwwww
wp.................w
w.wwww.wwwwwwwwwww.w
w.w..........w.....w
w.w.cc.wwww..w.ww..w
w.w....w.....w.w...w
w.wwww.w.wwwwwwd...w
w....k.w.......c...w
w.wwwwwlllwwwwwww..w
w.w......x.........w
w.w.cc.wwwwwwwwwww.w
w.w....w.......ll..w
w.w....w.wwwwwwwww.w
w....u.w...........w
w.c....w..........sw
w......w.......ll..w
w..................w
w..................e
wwwwwwwwwwwwwwwwwwww`,

  // Level 4 - BOSS level -> multiple enemies introduced
  map`
wwwwwwwwwwwwwwwwwwwwww
wp...................w
w.wwwwwwwwwwwwwwwwwwxw
w....c...............w
wwwwwwwwww.wwwwwwwww.w
w....................w
w.wwwwwwwlllwwwwwwwwww
w.c..................w
w.wwwwwwwdwwwwwwwwww.w
w.........s..........w
wwwwwwwwww.wwwwwwwww.w
w.c..........k.......w
w.wwwwwwwwwwwwwwwwww.w
w....................w
w.wwwwwwwlllwwwwwwwwww
w.u.........s........w
w.wwwwwwwwwwwwwwwwww.w
w....................w
w....................e
wwwwwwwwwwwwwwwwwwwwww`,

  // Level 5 - Masterrrrr challenge!!!! 
  map`
wwwwwwwwwwwwwwwwwwwwww
wp...................w
w.wwwwwwwwwwwwwwwwwwxw
w.c..................w
w.wwwwwwwwwwwwwwwwww.w
w....................w
w.wwwwwwwlllwwwwwwwwww
w.c..................w
w.wwwwwwwdwwwwwwwwww.w
w.........ss.........w
w.wwwwwwwwwwwwwwwwww.w
w.c...........k......w
w.wwwwwwwwwwwwwwwwww.w
w....................w
w.wwwwwwwlllwwwwwwwwww
w.u.........ss.......w
w.wwwwwwwwwwwwwwwwww.w
w....................w
w..c................cw
w....................w
w....................e
wwwwwwwwwwwwwwwwwwwwww`
]

setMap(levels[level])

setPushables({
  [player]: []
})

function spawnEnemies() {
  enemies = []
  const enemyCount = Math.min(level + 1, 3)

  if (level >= 2) {
    const emptySpaces = []
    for (let x = 0; x < width(); x++) {
      for (let y = 0; y < height(); y++) {
        const tiles = getTile(x, y)
        const isEmpty = tiles.length === 0 ||
          (tiles.length === 1 && tiles[0].type === background) ||
          tiles.some(tile => tile.type === coin)

        const playerPos = getFirst(player)
        const exitPos = getFirst(exit)
        const distFromPlayer = Math.abs(x - playerPos.x) + Math.abs(y - playerPos.y)
        const distFromExit = exitPos ? Math.abs(x - exitPos.x) + Math.abs(y - exitPos.y) : 10

        if (isEmpty && distFromPlayer > 4 && distFromExit > 3) {
          emptySpaces.push({ x, y })
        }
      }
    }

    for (let i = 0; i < Math.min(enemyCount, emptySpaces.length); i++) {
      const pos = emptySpaces[Math.floor(Math.random() * emptySpaces.length)]
      addSprite(pos.x, pos.y, enemy)
      enemies.push({
        x: pos.x,
        y: pos.y,
        dx: Math.random() > 0.5 ? 1 : -1,
        dy: 0,
        moveCounter: 0
      })
      emptySpaces.splice(emptySpaces.indexOf(pos), 1)
    }
  }
}

function moveEnemies() {
  if (level < 2 || !gameActive) return

  getAll(enemy).forEach((enemySprite, index) => {
    if (enemies[index]) {
      let enemy = enemies[index]
      enemy.moveCounter++

      if (enemy.moveCounter % 4 === 0 && Math.random() < 0.4) {
        const directions = [{ dx: 1, dy: 0 }, { dx: -1, dy: 0 }, { dx: 0, dy: 1 }, { dx: 0, dy: -1 }]
        const newDir = directions[Math.floor(Math.random() * directions.length)]
        enemy.dx = newDir.dx
        enemy.dy = newDir.dy
      }

      const newX = enemySprite.x + enemy.dx
      const newY = enemySprite.y + enemy.dy

      const tilesAtNewPos = getTile(newX, newY)
      const hasObstacle = tilesAtNewPos.some(tile => [wall, door, spike, lava].includes(tile.type))

      if (hasObstacle || newX < 0 || newX >= width() || newY < 0 || newY >= height()) {
        enemy.dx *= -1
        enemy.dy *= -1
      } else {
        enemySprite.x = newX
        enemySprite.y = newY
      }
    }
  })
}

function updateUI() {
  clearText()

  // make display smaller to fit on screen
  addText(`L${level + 1} S:${score} T:${timeLeft}`, {
    x: 2,
    y: 14,
    color: timeLeft <= 20 ? color`3` : color`6`
  })

  addText(`LIVES:${lives} ${hasKey ? 'KEY:YES' : 'KEY:NO'}`, {
    x: 2,
    y: 15,
    color: color`2`
  })

  if (powerupActive) {
    addText(`POWER:${powerupTimeLeft}s`, {
      x: 2,
      y: 0,
      color: color`2`
    })
  }

  if (invulnerable) {
    addText("SHIELD ACTIVE!", {
      x: 5,
      y: 4,
      color: color`4`
    })
  }
}

function displayGameOver() {
  clearText()
  addText("GAME OVER!", { x: 5, y: 6, color: color`3` })
  addText(`Final Score: ${score}`, { x: 2, y: 7, color: color`6` })
  addText("Better luck!", { x: 4, y: 8, color: color`F` })
  addText("Press K", { x: 6, y: 13, color: color`0` })
  addText("to restart", { x: 5, y: 14, color: color`0` })
}

function displayVictory() {
  clearText()
  const finalBonus = (timeLeft * 10) + (lives * 500)
  score += finalBonus

  addText("!VICTORY!", { x: 6, y: 4, color: color`C` })
  addText("DUNGEON MASTER!", { x: 3, y: 5, color: color`F` })
  addText(`Final Score: ${score}`, { x: 2, y: 6, color: color`3` })
  addText(`Bonus: +${finalBonus}`, { x: 4, y: 7, color: color`6` })
  addText("Amazing work!", { x: 4, y: 8, color: color`9` })
  addText("Press K", { x: 6, y: 13, color: color`0` })
  addText("for new game", { x: 4, y: 14, color: color`0` })
}

function startTimer() {
  if (gameTimer) clearInterval(gameTimer)
  if (enemyTimer) clearInterval(enemyTimer)
  gameActive = true

  gameTimer = setInterval(() => {
    if (gameActive) {
      timeLeft--

      if (invulnerable) {
        invulnerabilityTimer--
        if (invulnerabilityTimer <= 0) {
          invulnerable = false
        }
      }

      if (powerupActive) {
        powerupTimeLeft--
        if (powerupTimeLeft <= 0) {
          powerupActive = false
        }
      }

      updateUI()

      if (timeLeft <= 0) {
        gameActive = false
        clearInterval(gameTimer)
        clearInterval(enemyTimer)
        displayGameOver()
        playTune(tune`
150: C4~150,
150: B3~150,
150: A3~150,
450`)
      }
    }
  }, 1000)

  enemyTimer = setInterval(() => {
    if (gameActive) {
      moveEnemies()
    }
  }, 500 - (level * 30))
}

function loseLife(cause) {
  if (invulnerable) return false

  lives--

  // death message.... 
  clearText()
  addText(`KILLED BY ${cause}!`, { x: 2, y: 5, color: color`3` })
  addText(`Lives left: ${lives}`, { x: 3, y: 6, color: color`F` })

  if (lives <= 0) {
    gameActive = false
    clearInterval(gameTimer)
    clearInterval(enemyTimer)
    setTimeout(displayGameOver, 1500)
  } else {
    // brief invulnerability + potential respawn perhaps
    if (!invulnerabilityUsed) {
      invulnerable = true
      invulnerabilityTimer = 5
      invulnerabilityUsed = true
      setTimeout(() => {
        if (checkpointReached && checkpointPosition) {
          getFirst(player).x = checkpointPosition.x
          getFirst(player).y = checkpointPosition.y
        }
        updateUI()
      }, 1500)
    } else if (checkpointReached && checkpointPosition) {
      setTimeout(() => {
        getFirst(player).x = checkpointPosition.x
        getFirst(player).y = checkpointPosition.y
        updateUI()
      }, 1500)
    }
  }

  playTune(tune`
100: C4~100,
100: B3~100,
100: A3~100,
100: G3~100,
400`)

  return true
}

function initGame() {
  level = 0
  score = 0
  timeLeft = 60 + (level * 5) // to provide some leeway for difficulty! hm maybe make more actually..!
  lives = 3
  hasKey = false
  invulnerable = false
  powerupActive = false
  checkpointReached = false
  checkpointPosition = null
  coinsCollected = 0
  invulnerabilityUsed = false
  gameActive = true

  setMap(levels[level])
  spawnEnemies()
  startTimer()
  updateUI()
}

initGame()

onInput("s", () => {
  if (gameActive) {
    getFirst(player).y += 1
  }
})

onInput("w", () => {
  if (gameActive) {
    getFirst(player).y -= 1
  }
})

onInput("a", () => {
  if (gameActive) {
    getFirst(player).x -= 1
  }
})

onInput("d", () => {
  if (gameActive) {
    getFirst(player).x += 1
  }
})

onInput("k", () => {
  clearInterval(gameTimer)
  clearInterval(enemyTimer)
  initGame()
})

afterInput(() => {
  if (!gameActive) return

  const playerPos = getFirst(player)
  if (!playerPos) return

  const tilesAtPlayer = getTile(playerPos.x, playerPos.y)

  // detect colllisions - check for deadly obstacles FIRST !
  const hasSpike = tilesAtPlayer.some(sprite => sprite.type === spike)
  const hasLava = tilesAtPlayer.some(sprite => sprite.type === lava)
  const hasEnemy = tilesAtPlayer.some(sprite => sprite.type === enemy)

  // instant death -> from hazards (unless protected)
  if ((hasSpike || hasLava || hasEnemy) && !invulnerable && !powerupActive) {
    const deathCause = hasSpike ? "SPIKES" : hasLava ? "LAVA" : "ENEMY"
    if (loseLife(deathCause)) {
      return // Exit early if player died
    }
  }

  // check if player has key
  const keysAtPlayer = tilesAtPlayer.filter(sprite => sprite.type === key)
  if (keysAtPlayer.length > 0) {
    keysAtPlayer.forEach(keySprite => {
      keySprite.remove()
      hasKey = true
      score += 50
    })

    playTune(tune`
50: F5~50,
50: A5~50,
50: C6~50,
150`)
  }

  // check if they've played with the door -- gotta check this one ! 
  const doorsAtPlayer = tilesAtPlayer.filter(sprite => sprite.type === door)
  setSolids([player, wall]) //update solids FIRST, dynamically! 
  if (doorsAtPlayer.length > 0 && hasKey) {
    doorsAtPlayer.forEach(doorSprite => { //trebllll..... have to get doors from solid to pass thru - GOT IT!!!
      doorSprite.remove() // okay, unlocks door!
      hasKey = false // use key up for effort
      score += 75 // add to score as reward
    })

    playTune(tune`
75: C5~75,
75: E5~75,
75: G5~75,
225`)
  }

  // check -> players' collection of coins 
  const coinsAtPlayer = tilesAtPlayer.filter(sprite => sprite.type === coin)
  if (coinsAtPlayer.length > 0) {
    coinsAtPlayer.forEach(coinSprite => {
      coinSprite.remove()
      score += 15
      coinsCollected++
    })

    playTune(tune`
50: E5~50,
50: G5~50,
50: C6~50,
150`)
  }

  // check for power-up collection
  const powerupsAtPlayer = tilesAtPlayer.filter(sprite => sprite.type === powerup)
  if (powerupsAtPlayer.length > 0) {
    powerupsAtPlayer.forEach(powerupSprite => {
      powerupSprite.remove()
      powerupActive = true
      powerupTimeLeft = 15
      score += 100
    })

    playTune(tune`
50: C6~50,
50: E6~50,
50: G6~50,
50: C7~50,
200`)
  }

  // checkpoint check!!!
  const checkpointsAtPlayer = tilesAtPlayer.filter(sprite => sprite.type === checkpoint)
  if (checkpointsAtPlayer.length > 0 && !checkpointReached) {
    checkpointReached = true
    checkpointPosition = { x: playerPos.x, y: playerPos.y }
    score += 25

    addText("CHECKPOINT SAVED!", { x: 3, y: 3, color: color`4` })

    playTune(tune`
100: G5~100,
100: C6~100,
200`)

    setTimeout(updateUI, 1000)
  }

  // check for exit.
  const exitAtPlayer = tilesAtPlayer.filter(sprite => sprite.type === exit)
  if (exitAtPlayer.length > 0) {
    level++

    if (level < levels.length) {
      // Level is complete!
      const timeBonus = Math.max(0, timeLeft * 5)
      const coinBonus = coinsCollected * 10
      timeLeft = Math.min(timeLeft + 25, 120)
      score += 150 + timeBonus + coinBonus

      hasKey = false
      checkpointReached = false
      checkpointPosition = null
      coinsCollected = 0
      invulnerabilityUsed = false // reset (for new lvl)

      setMap(levels[level])
      spawnEnemies()

      clearText()
      addText(`LEVEL ${level} COMPLETE!`, { x: 3, y: 4, color: color`4` })
      addText(`+150 Base Points!`, { x: 3, y: 5, color: color`F` })
      addText(`+${timeBonus} Time Bonus!`, { x: 3, y: 6, color: color`6` })
      addText(`+${coinBonus} Coin Bonus!`, { x: 3, y: 7, color: color`6` })
      addText("Get Ready!", { x: 5, y: 9, color: color`2` })

      playTune(tune`
100: C5~100,
100: E5~100,
100: G5~100,
100: C6~100,
400`)

      setTimeout(() => {
        updateUI()
      }, 3000)

    } else {
      // game is won!
      gameActive = false
      clearInterval(gameTimer)
      clearInterval(enemyTimer)

      setTimeout(displayVictory, 500)

      playTune(tune`
75: C5~75,
75: D5~75,
75: E5~75,
75: F5~75,
75: G5~75,
75: A5~75,
75: B5~75,
75: C6~75,
75: C6~75,
75: C6~75,
750`)
    }
  }

  updateUI()
})
