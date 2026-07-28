/*
@title: Rushed
@tags: ['action', 'boss-rush']
@author: ZyluxXD
@description: Rushed is a fast-paced boss rush game where you have to defeat increasingly difficult bosses before the timer runs out. Each completed round makes the bosses stronger and faster. If you make it far enough, there is a challenge at the end...
@addedOn: 2026-07-28
*/

// sprites
const player = "p"
const boss1 = "b"
const boss2 = "c"
const boss3 = "e"
const bonusBoss = "q"
const playerShot = "s"
const enemyShot = "x"
const wall = "w"
const floor = "f"
const heart = "h"

setLegend(
  [player, bitmap`
................
......1111......
.....111111.....
....11111111....
....11777711....
....11722711....
....11777711....
.....111111.....
....55555555....
...5555555555...
...5555555555...
....55555555....
.....55..55.....
....555..555....
...555....555...
................`],

  [boss1, bitmap`
....33333333....
..333333333333..
.33332233223333.
3333223322333333
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....
....33....33....
...333....333...
..333......333..
.333........333.
333..........333
................`],

  [boss2, bitmap`
......6666......
....66666666....
...6666666666...
..666622226666..
.66662222226666.
6666666666666666
6666666666666666
.66666666666666.
..666666666666..
...6666666666...
....66666666....
...666.66.666...
..666..66..666..
.666...66...666.
666....66....666
................`],

  [boss3, bitmap`
7..............7
.7....9999....7.
..7.99999999.7..
...9999999999...
..999992299999..
.99999922999999.
9999999999999999
9999999999999999
.99999999999999.
..999999999999..
...9999999999...
..999.9999.999..
.999..9999..999.
999...9999...999
99....9999....99
................`],

  [bonusBoss, bitmap`
5......55......5
.5....5555....5.
..5.55555555.5..
...5555555555...
..555522225555..
.55552222225555.
5555555555555555
5555555555555555
.55555555555555.
..555555555555..
...5555555555...
..555.5555.555..
.555..5555..555.
555...5555...555
55....5555....55
5......55......5`],

  [playerShot, bitmap`
................
................
................
................
................
.......77.......
......7777......
.....777777.....
.....777777.....
......7777......
.......77.......
................
................
................
................
................`],

  [enemyShot, bitmap`
................
................
......3333......
....33333333....
...3333333333...
..333333333333..
..333333333333..
...3333333333...
...3333333333...
..333333333333..
..333333333333..
...3333333333...
....33333333....
......3333......
................
................`],

  [wall, bitmap`
LLLLLLLLLLLLLLLL
L111L111L111L111
L111L111L111L111
LLLLLLLLLLLLLLLL
111L111L111L111L
111L111L111L111L
111L111L111L111L
LLLLLLLLLLLLLLLL
L111L111L111L111
L111L111L111L111
L111L111L111L111
LLLLLLLLLLLLLLLL
111L111L111L111L
111L111L111L111L
111L111L111L111L
LLLLLLLLLLLLLLLL`],

  [floor, bitmap`
0000000000000000
0000000000000000
0000000000000000
000L000000L00000
0000000000000000
0000000000000000
0000000000000000
000000L000000000
0000000000000000
0000000000000000
00L0000000000L00
0000000000000000
0000000000000000
0000000000000000
000000000L000000
0000000000000000`],

  [heart, bitmap`
................
................
...33......33...
..3333....3333..
.333333..333333.
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......
................
................`]
)

setBackground(floor)
setSolids([player, wall])

// the map

const arena = map`
wwwwwwwwww
w........w
w........w
w........w
w........w
w........w
w........w
wwwwwwwwww`

setMap(arena)

// game vars

let playerHealth = 5
let bossHealth = 0
let bossMaxHealth = 0
let bossNumber = 1
let currentBossType = boss1
let roundNumber = 1
let fightingBonusBoss = false
let screenState = "playing"
let timeRemaining = 0
let bossMoveTicks = 0
let bossAttackTicks = 0

const bonusBossRound = 5

let facingX = 0
let facingY = -1

let canShoot = true
let gameRunning = true
let transitioning = false
let invincible = false

// sounds

const shootSound = tune`
50: C5~50,
1550`

const hitSound = tune`
50: C4-50,
50: B4-50,
1500`

const hurtSound = tune`
75: C4~75,
75: C3~75,
75: C2~75,
1375`

const victorySound = tune`
150: C4~150,
150: E4~150,
150: G4~150,
150: C5~150,
1800`

const bossSound = tune`
100: C3-100,
100: D3-100,
100: F3-100,
100: G3-100,
1200`

// game start

function startGame() {
  roundNumber = 1
  startRound()
}

function startRound() {
  clearArenaSprites()
  clearText()

  playerHealth = 5
  bossNumber = 1
  fightingBonusBoss = false
  gameRunning = true
  transitioning = false
  invincible = false
  screenState = "playing"
  bossMoveTicks = 0
  bossAttackTicks = 0

  addSprite(4, 6, player)
  spawnBoss()
}

function startBonusBoss() {
  clearArenaSprites()
  clearText()

  playerHealth = 25
  bossNumber = 4
  fightingBonusBoss = true
  gameRunning = true
  transitioning = false
  invincible = false
  screenState = "playing"
  bossMoveTicks = 0
  bossAttackTicks = 0

  addSprite(4, 6, player)
  spawnBoss()
}

function getBossTime() {
  if (fightingBonusBoss) {
    return 60
  }

  const baseTime = 34
  const roundPenalty = roundNumber - 1
  const bossBonus = (bossNumber - 1) * 3

  return Math.max(
    20,
    baseTime - roundPenalty + bossBonus
  )
}

function spawnBoss() {
  clearProjectiles()

  const difficulty = roundNumber - 1

  if (fightingBonusBoss) {
    currentBossType = bonusBoss
    bossMaxHealth = 30 + difficulty * 5
  } else if (bossNumber === 1) {
    currentBossType = boss1
    bossMaxHealth = 8 + difficulty * 2
  } else if (bossNumber === 2) {
    currentBossType = boss2
    bossMaxHealth = 12 + difficulty * 3
  } else {
    currentBossType = boss3
    bossMaxHealth = 16 + difficulty * 4
  }

  bossHealth = bossMaxHealth
  timeRemaining = getBossTime()
  bossMoveTicks = 0
  bossAttackTicks = 0

  const oldBosses = [
    ...getAll(boss1),
    ...getAll(boss2),
    ...getAll(boss3),
    ...getAll(bonusBoss)
  ]

  for (const oldBoss of oldBosses) {
    oldBoss.remove()
  }

  addSprite(4, 1, currentBossType)
  playTune(bossSound)

  drawUI()
}

function clearArenaSprites() {
  const removableTypes = [
    player,
    boss1,
    boss2,
    boss3,
    bonusBoss,
    playerShot,
    enemyShot
  ]

  for (const type of removableTypes) {
    for (const sprite of getAll(type)) {
      sprite.remove()
    }
  }
}

function clearProjectiles() {
  for (const shot of getAll(playerShot)) {
    shot.remove()
  }

  for (const shot of getAll(enemyShot)) {
    shot.remove()
  }
}

// player movement

function movePlayer(dx, dy) {
  if (!gameRunning || transitioning) return

  const p = getFirst(player)
  if (!p) return

  facingX = dx
  facingY = dy

  p.x += dx
  p.y += dy

  checkPlayerBossCollision()
}

onInput("w", () => movePlayer(0, -1))
onInput("s", () => movePlayer(0, 1))
onInput("a", () => movePlayer(-1, 0))
onInput("d", () => movePlayer(1, 0))

// player attack

function firePlayerShot() {
  if (!gameRunning || transitioning || !canShoot) return

  const p = getFirst(player)
  const boss = getFirst(currentBossType)

  if (!p || !boss) return

  const differenceX = boss.x - p.x
  const differenceY = boss.y - p.y

  const sameTile =
    differenceX === 0 &&
    differenceY === 0

  const oneTileAwayOnSameAxis =
    Math.abs(differenceX) + Math.abs(differenceY) === 1

  if (sameTile || oneTileAwayOnSameAxis) {
    canShoot = false
    playTune(shootSound)
    damageBoss()

    setTimeout(() => {
      canShoot = true
    }, 250)

    return
  }

  let shotX = 0
  let shotY = 0

  if (differenceX === 0) {
    shotY = differenceY > 0 ? 1 : -1
  } else if (differenceY === 0) {
    shotX = differenceX > 0 ? 1 : -1
  } else if (Math.abs(differenceX) > Math.abs(differenceY)) {
    shotX = differenceX > 0 ? 1 : -1
  } else {
    shotY = differenceY > 0 ? 1 : -1
  }

  const startX = p.x + shotX
  const startY = p.y + shotY

  if (isWall(startX, startY)) return

  addSprite(startX, startY, playerShot)

  const shot = getAll(playerShot).at(-1)

  shot.directionX = shotX
  shot.directionY = shotY

  canShoot = false
  playTune(shootSound)

  setTimeout(() => {
    canShoot = true
  }, 250)
}

onInput("i", firePlayerShot)
onInput("k", firePlayerShot)
onInput("l", firePlayerShot)

// projectiles

function updatePlayerShots() {
  if (!gameRunning || transitioning) return

  for (const shot of [...getAll(playerShot)]) {
    const boss = getFirst(currentBossType)

    if (boss && shot.x === boss.x && shot.y === boss.y) {
      shot.remove()
      damageBoss()
      continue
    }

    shot.x += shot.directionX
    shot.y += shot.directionY

    if (isWall(shot.x, shot.y)) {
      shot.remove()
      continue
    }

    if (boss && shot.x === boss.x && shot.y === boss.y) {
      shot.remove()
      damageBoss()
    }
  }
}

function updateEnemyShots() {
  if (!gameRunning || transitioning) return

  const p = getFirst(player)
  if (!p) return

  for (const shot of [...getAll(enemyShot)]) {
    shot.x += shot.directionX
    shot.y += shot.directionY

    if (isWall(shot.x, shot.y)) {
      shot.remove()
      continue
    }

    if (shot.x === p.x && shot.y === p.y) {
      shot.remove()
      damagePlayer()
    }
  }
}

function createEnemyShot(x, y, dx, dy) {
  if (isWall(x, y)) return

  addSprite(x, y, enemyShot)

  const shot = getAll(enemyShot).at(-1)
  shot.directionX = dx
  shot.directionY = dy
}

// boss attacks

function bossAttack() {
  if (!gameRunning || transitioning) return

  const boss = getFirst(currentBossType)
  const p = getFirst(player)

  if (!boss || !p) return

  if (fightingBonusBoss) {
    crossAttack(boss)
    diagonalAttack(boss)
    aimedAttack(boss, p)

    if (bossHealth <= bossMaxHealth / 2) {
      aimedAttack(boss, p)
    }

    return
  }

  if (bossNumber === 1) {
    aimedAttack(boss, p)

    if (roundNumber >= 3) {
      crossAttack(boss)
    }
  }

  if (bossNumber === 2) {
    crossAttack(boss)

    if (
      bossHealth <= bossMaxHealth / 2 ||
      roundNumber >= 2
    ) {
      aimedAttack(boss, p)
    }
  }

  if (bossNumber === 3) {
    crossAttack(boss)
    diagonalAttack(boss)

    if (
      bossHealth <= bossMaxHealth / 2 ||
      roundNumber >= 2
    ) {
      aimedAttack(boss, p)
    }
  }
}

function aimedAttack(boss, p) {
  const distanceX = p.x - boss.x
  const distanceY = p.y - boss.y

  let dx = 0
  let dy = 0

  if (Math.abs(distanceX) > Math.abs(distanceY)) {
    dx = distanceX > 0 ? 1 : -1
  } else {
    dy = distanceY > 0 ? 1 : -1
  }

  createEnemyShot(boss.x + dx, boss.y + dy, dx, dy)
}

function crossAttack(boss) {
  createEnemyShot(boss.x + 1, boss.y, 1, 0)
  createEnemyShot(boss.x - 1, boss.y, -1, 0)
  createEnemyShot(boss.x, boss.y + 1, 0, 1)
  createEnemyShot(boss.x, boss.y - 1, 0, -1)
}

function diagonalAttack(boss) {
  createEnemyShot(boss.x + 1, boss.y + 1, 1, 1)
  createEnemyShot(boss.x - 1, boss.y + 1, -1, 1)
  createEnemyShot(boss.x + 1, boss.y - 1, 1, -1)
  createEnemyShot(boss.x - 1, boss.y - 1, -1, -1)
}

// boss movement

function moveBoss() {
  if (!gameRunning || transitioning) return

  const boss = getFirst(currentBossType)
  const p = getFirst(player)

  if (!boss || !p) return

  let dx = 0
  let dy = 0

  if (bossNumber === 1 && !fightingBonusBoss) {
    // Boss 1 moves randomly.
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ]

    const direction =
      directions[Math.floor(Math.random() * directions.length)]

    dx = direction[0]
    dy = direction[1]
  } else {
    // Later bosses chase the player.
    const differenceX = p.x - boss.x
    const differenceY = p.y - boss.y

    if (Math.abs(differenceX) > Math.abs(differenceY)) {
      dx = differenceX > 0 ? 1 : -1
    } else {
      dy = differenceY > 0 ? 1 : -1
    }
  }

  const nextX = boss.x + dx
  const nextY = boss.y + dy

  if (!isWall(nextX, nextY)) {
    boss.x = nextX
    boss.y = nextY
  }

  checkPlayerBossCollision()
}

function updateBossAI() {
  if (!gameRunning || transitioning) return

  const moveDelay = Math.max(
    250,
    700 - (roundNumber - 1) * 60 - (fightingBonusBoss ? 150 : 0)
  )

  const attackDelay = Math.max(
    350,
    900 - (roundNumber - 1) * 70 - (fightingBonusBoss ? 200 : 0)
  )

  bossMoveTicks += 50
  bossAttackTicks += 50

  if (bossMoveTicks >= moveDelay) {
    bossMoveTicks = 0
    moveBoss()
  }

  if (bossAttackTicks >= attackDelay) {
    bossAttackTicks = 0
    bossAttack()
  }
}

// damage

function damageBoss() {
  if (!gameRunning || transitioning) return

  bossHealth--
  playTune(hitSound)
  drawUI()

  if (bossHealth <= 0) {
    defeatBoss()
  }
}

function damagePlayer() {
  if (!gameRunning || transitioning || invincible) return

  playerHealth--
  invincible = true

  playTune(hurtSound)
  drawUI()

  setTimeout(() => {
    invincible = false
  }, 700)

  if (playerHealth <= 0) {
    loseGame()
  }
}

function checkPlayerBossCollision() {
  const p = getFirst(player)
  const boss = getFirst(currentBossType)

  if (!p || !boss) return

  if (p.x === boss.x && p.y === boss.y) {
    damagePlayer()
  }
}

function updateTimer() {
  if (!gameRunning || transitioning) return

  timeRemaining--

  if (timeRemaining <= 0) {
    timeRemaining = 0
    playerHealth = 0
    playTune(hurtSound)
    loseGame()
    return
  }

  drawUI()
}

// progression
const winTexts = ["Get Ready...", "Prepare...", "Good Job"]
function defeatBoss() {
  transitioning = true
  clearProjectiles()

  const boss = getFirst(currentBossType)

  if (boss) {
    boss.remove()
  }

  if (fightingBonusBoss) {
    winGame()
    return
  }

  if (bossNumber === 3) {
    roundWon()
    return
  }

  clearText()
  addText("BOSS DEFEATED!", {
    x: 3,
    y: 6,
    color: color`7`
  })
  const text = winTexts[Math.floor(Math.random() * winTexts.length)];
  addText(text, {
    x: 5,
    y: 8,
    color: color`2`
  })
  playerHealth++
  bossNumber++

  setTimeout(() => {
    const p = getFirst(player)

    if (p) {
      p.x = 4
      p.y = 6
    }

    transitioning = false
    spawnBoss()
  }, 1500)
}

function roundWon() {
  gameRunning = false
  transitioning = false
  screenState = "roundWon"
  clearProjectiles()
  clearText()

  playTune(victorySound)

  if (roundNumber >= bonusBossRound) {
    addText("BONUS READY!", {
      x: 3,
      y: 4,
      color: color`4`
    })

    addText("FINAL BOSS", {
      x: 5,
      y: 6,
      color: color`7`
    })

    addText("J TO FIGHT", {
      x: 5,
      y: 9,
      color: color`2`
    })
  } else {
    addText("ROUND CLEAR!", {
      x: 3,
      y: 4,
      color: color`4`
    })

    addText("ROUND " + roundNumber, {
      x: 6,
      y: 6,
      color: color`7`
    })

    addText("J: NEXT ROUND", {
      x: 3,
      y: 9,
      color: color`2`
    })
  }
}

// win/loss

const loseTexts = ["git good", "try again", "how did you lose", "skill issue", "object Object"]
function winGame() {
  gameRunning = false
  transitioning = false
  screenState = "finished"
  clearProjectiles()
  clearText()

  playTune(victorySound)

  addText("YOU WIN!", {
    x: 6,
    y: 3,
    color: color`4`
  })

  addText("BONUS BOSS", {
    x: 4,
    y: 5,
    color: color`7`
  })

  addText("DEFEATED!", {
    x: 5,
    y: 7,
    color: color`7`
  })

  addText("J: NEW GAME", {
    x: 4,
    y: 10,
    color: color`2`
  })
}

function loseGame() {
  if (screenState === "lost") return

  gameRunning = false
  transitioning = false
  screenState = "lost"
  clearProjectiles()
  clearText()

  const p = getFirst(player)

  if (p) {
    p.remove()
  }

  addText("GAME OVER", {
    x: 5,
    y: 4,
    color: color`3`
  })

  addText("ROUND " + roundNumber, {
    x: 6,
    y: 6,
    color: color`7`
  })

  const text = loseTexts[Math.floor(Math.random() * loseTexts.length)];

  addText(text, {
    x: 2,
    y: 8,
    color: color`9`
  })

  addText("J: RESET", {
    x: 5,
    y: 10,
    color: color`2`
  })
}

// Restart using J after winning or losing.
onInput("j", () => {
  if (screenState === "title") {
    startGame()
    return
  }
  if (screenState === "roundWon") {
    if (roundNumber >= bonusBossRound) {
      startBonusBoss()
    } else {
      roundNumber++
      startRound()
    }

    return
  }

  if (
    screenState === "lost" ||
    screenState === "finished"
  ) {
    startGame()
  }
})

// ui

function drawUI() {
  if (!gameRunning) return

  clearText()

  addText("HP:" + playerHealth, {
    x: 1,
    y: 0,
    color: color`3`
  })

  addText("B:" + bossHealth, {
    x: 7,
    y: 0,
    color: color`7`
  })

  addText("T:" + timeRemaining, {
    x: 12,
    y: 0,
    color: timeRemaining <= 5 ? color`3` : color`2`
  })

  if (fightingBonusBoss) {
    addText("BONUS", {
      x: 1,
      y: 1,
      color: color`4`
    })
  } else {
    addText(
      "R" + roundNumber + " " + bossNumber + "/3",
      {
        x: 14,
        y: 1,
        color: color`2`
      }
    )
  }
}

// helper funcs

function isWall(x, y) {
  if (x < 0 || x >= width() || y < 0 || y >= height()) {
    return true
  }

  return getTile(x, y).some(sprite => sprite.type === wall)
}
function showTitleScreen() {
  clearArenaSprites()
  clearProjectiles()
  clearText()

  gameRunning = false
  transitioning = false
  screenState = "title"

  addText("RUSHED", {
    x: 7,
    y: 4,
    color: color`3`
  })

  addText("BOSS RUSH", {
    x: 5,
    y: 6,
    color: color`7`
  })

  addText("J TO START", {
    x: 5,
    y: 9,
    color: color`2`
  })
}
// lowkey this game is too hard so uhhh
// the mode only for developers trust
function devMode() {
  setInterval(() => {
    playerHealth++;
  }, 10);
}
// main loops

setInterval(updatePlayerShots, 100)
setInterval(updateEnemyShots, 140)
setInterval(updateBossAI, 50)
setInterval(updateTimer, 1000)

// don't do it....
// resist the urge to remove those two characters..
// stop
// devMode();

showTitleScreen()