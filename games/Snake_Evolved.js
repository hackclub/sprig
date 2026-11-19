/*
@title: Snake Evolved
@author: Aarav Chauhan
@description: Version of the classic snake game, with 2 modes, campaign and infinite. Infinite is is self-explanatory, eat till you die in a massive arena. Campaign consists of 3 levels, each having a score requirement to progress to the new levels. The first level is a small open level with obstacles spawning as you eat food. Second level is bigger with walls and the third level has a boss you have to defeat. Good luck!
@tags: ['snake', 'infinite']
@addedOn: 2026-09-28
    */

const player = "p"
const body = "b"
const food = "f"
const goldFood = "g"
const wall = "w"
const rock = "o"
const gem = "c"
const bossType = "x"
const coreItem = "k"
const blackTile = "z"

setLegend(
  [ player, bitmap`
.111111.
11111111
11111111
11111111
11111111
11111111
11111111
.111111.`],
  [ body, bitmap`
.444444.
44444444
44444444
44444444
44444444
44444444
44444444
.444444.`],
  [ food, bitmap`
..DDDD..
.DDDDDD.
DDDDDDDD
DDDDDDDD
DDDDDDDD
DDDDDDDD
.DDDDDD.
..DDDD..`],
  [ goldFood, bitmap`
..5555..
.555555.
55555555
55555555
55555555
55555555
.555555.
..5555..`],
  [ wall, bitmap`
33333333
33333333
33333333
33333333
33333333
33333333
33333333
33333333`],
  [ rock, bitmap`
........
.666666.
.677776.
.677776.
.677776.
.677776.
.666666.
........`],
  [ gem, bitmap`
...77...
..7777..
.777777.
77777777
.777777.
..7777..
...77...
........`],
  [ bossType, bitmap`
99999999
9.9999.9
9.9999.9
99999999
9.9999.9
99999999
9.9999.9
99999999`],
  [ coreItem, bitmap`
..8888..
.888888.
88888888
88888888
88888888
88888888
.888888.
..8888..`],
  [ blackTile, bitmap`
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
)


const menuMap = map`
..........
..........
..........
..........
..........
..........
..........
..........`

const level1Map = map`
wwwwwwwwww
w........w
w........w
w........w
w........w
w........w
w........w
wwwwwwwwww`

const level2Map = map`
wwwwwwwwwwwwwww
w.............w
w..ww.....ww..w
w..ww.....ww..w
w.............w
w....wwwww....w
w....wwwww....w
w.............w
w..ww.....ww..w
w..ww.....ww..w
w.............w
wwwwwwwwwwwwwww`

const level3Map = map`
wwwwwwwwwwwwwwwwwwww
w..................w
w..................w
w..ww....ww....ww..w
w..ww....ww....ww..w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..ww....ww....ww..w
w..ww....ww....ww..w
w..................w
w..................w
wwwwwwwwwwwwwwwwwwww`

const infiniteMap = map`
wwwwwwwwwwwwwwwwwwwwwwwww
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
w.......................w
wwwwwwwwwwwwwwwwwwwwwwwww`

const blackMap = map`
zzzzzzzzzz
zzzzzzzzzz
zzzzzzzzzz
zzzzzzzzzz
zzzzzzzzzz
zzzzzzzzzz
zzzzzzzzzz
zzzzzzzzzz`


const GEM_POSITIONS = [
  { x: 2, y: 2 },
  { x: 17, y: 2 },
  { x: 2, y: 13 },
  { x: 17, y: 13 },
  { x: 9, y: 7 }
]

const levelConfigs = {
  1: {
    map: level1Map,
    start: [ { x: 5, y: 4 }, { x: 4, y: 4 }, { x: 3, y: 4 } ],
    startDir: { x: 1, y: 0 },
    obstacleEvery: 5,
    obstacleCap: 6,
    minSpeed: 80,
    enterSpeed: 220
  },
  2: {
    map: level2Map,
    start: [ { x: 5, y: 1 }, { x: 4, y: 1 }, { x: 3, y: 1 } ],
    startDir: { x: 1, y: 0 },
    obstacleEvery: 4,
    obstacleCap: 12,
    minSpeed: 55,
    enterSpeed: 170
  },
  3: {
    map: level3Map,
    start: [ { x: 10, y: 1 }, { x: 9, y: 1 }, { x: 8, y: 1 } ],
    startDir: { x: 1, y: 0 },
    obstacleEvery: 3,
    obstacleCap: 16,
    minSpeed: 45,
    enterSpeed: 150
  }
}

const infiniteConfig = {
  map: infiniteMap,
  start: [ { x: 12, y: 10 }, { x: 11, y: 10 }, { x: 10, y: 10 } ],
  startDir: { x: 1, y: 0 },
  obstacleEvery: 3,
  obstacleCap: 9999,
  minSpeed: 30,
  enterSpeed: 200
}

const LEVEL2_UP_SCORE = 30
const LEVEL3_UP_SCORE = 60

const BOSS_MAX_HP = 5
const CORE_LIFETIME = 14
const CORE_SPAWN_EVERY = 6


let gameState = "menu"
let gameMode = "campaign"

let level = 1
let snake, dx, dy, nextDx, nextDy
let score, highScore = 0
let won = false
let tickHandle = null
let speed = 220

let obstacles = []
let isGolden = false
let goldTicksLeft = 0
const GOLD_LIFETIME = 22
const GOLD_CHANCE = 0.28

let level3Phase = "gems"
let gemsCollected = 0
let bossEntity = null
let core = null
let ticksSinceCore = 0

let milestoneText = ""
let milestoneTicksLeft = 0
const milestones = {
  10: "hot!",
  20: "wild!",
  40: "epic!",
  50: "insane"
}

function currentConfig() {
  if (gameMode === "infinite") {
    return infiniteConfig
  }
  return levelConfigs[level]
}

function isWallTile(x, y) {
  return getTile(x, y).some(s => s.type === wall)
}

function emptyTiles() {
  const tiles = []
  for (let x = 1; x < width() - 1; x++) {
    for (let y = 1; y < height() - 1; y++) {
      if (getTile(x, y).length > 0) continue
      if (snake.some(s => s.x === x && s.y === y)) continue
      tiles.push({ x: x, y: y })
    }
  }
  return tiles
}

function spawnFood() {
  const tiles = emptyTiles()
  if (tiles.length === 0) return
  const spot = tiles[Math.floor(Math.random() * tiles.length)]

  getAll(food).forEach(f => f.remove())
  getAll(goldFood).forEach(f => f.remove())

  isGolden = Math.random() < GOLD_CHANCE
  if (isGolden) {
    goldTicksLeft = GOLD_LIFETIME
    addSprite(spot.x, spot.y, goldFood)
  } else {
    addSprite(spot.x, spot.y, food)
  }
}

function fillObstaclesToTarget() {
  const cfg = currentConfig()
  const targetCount = Math.min(Math.floor(score / cfg.obstacleEvery), cfg.obstacleCap)

  while (obstacles.length < targetCount) {
    const head = snake[0]
    const tiles = emptyTiles().filter(t => {
      return Math.abs(t.x - head.x) + Math.abs(t.y - head.y) > 2
    })
    if (tiles.length === 0) break
    const spot = tiles[Math.floor(Math.random() * tiles.length)]
    obstacles.push(spot)
    addSprite(spot.x, spot.y, rock)
  }
}

function draw() {
  getAll(player).forEach(s => s.remove())
  getAll(body).forEach(s => s.remove())
  for (let i = 0; i < snake.length; i++) {
    addSprite(snake[i].x, snake[i].y, i === 0 ? player : body)
  }
}

function showScore() {
  clearText()

  if (milestoneTicksLeft > 0) {
    addText(milestoneText, { x: 0, y: 0, color: color`5` })
    milestoneTicksLeft--
    return
  }

  addText(`${score}`, { x: 0, y: 0, color: color`0` })

  if (gameMode === "infinite") {
    addText("inf", { x: 0, y: 1, color: color`0` })
  }
  else if (level === 3 && level3Phase === "gems") {
    addText(`G${gemsCollected}/5`, { x: 0, y: 1, color: color`0` })
  }
  else if (level === 3 && level3Phase === "boss" && bossEntity) {
    addText(`B${bossEntity.hp}/${BOSS_MAX_HP}`, { x: 0, y: 1, color: color`0` })
  }
  else {
    addText(`L${level}`, { x: 0, y: 1, color: color`0` })
  }
}

function checkMilestone() {
  if (milestones[score]) {
    milestoneText = milestones[score]
    milestoneTicksLeft = 3
  }
}

function restartInterval() {
  clearInterval(tickHandle)
  tickHandle = setInterval(tick, speed)
}


function showMenu() {
  gameState = "menu"
  if (tickHandle) clearInterval(tickHandle)
  setMap(menuMap)
  clearText()
  addText("snake", { x: 1, y: 2, color: color`0` })
  addText("j:campaign", { x: 1, y: 5, color: color`0` })
  addText("i:infinite", { x: 1, y: 6, color: color`0` })
  if (highScore > 0) {
    addText(`best ${highScore}`, { x: 1, y: 8, color: color`0` })
  }
}


function loadLevel(lvlNum) {
  level = lvlNum
  const cfg = currentConfig()

  setMap(cfg.map)

  snake = cfg.start.map(p => ({ x: p.x, y: p.y }))
  dx = cfg.startDir.x
  dy = cfg.startDir.y
  nextDx = dx
  nextDy = dy

  obstacles = []
  isGolden = false
  goldTicksLeft = 0
  speed = cfg.enterSpeed

  if (lvlNum === 3) {
    level3Phase = "gems"
    gemsCollected = 0
    bossEntity = null
    core = null
    ticksSinceCore = 0
    GEM_POSITIONS.forEach(p => addSprite(p.x, p.y, gem))
  }

  fillObstaclesToTarget()
  draw()
  spawnFood()
  restartInterval()
}

function startGame(mode) {
  gameState = "playing"
  gameMode = mode
  if (tickHandle) clearInterval(tickHandle)
  score = 0
  won = false
  milestoneText = ""
  milestoneTicksLeft = 0
  level3Phase = "gems"
  gemsCollected = 0
  bossEntity = null
  core = null
  ticksSinceCore = 0

  if (mode === "infinite") {
    level = 0
    const cfg = infiniteConfig
    setMap(cfg.map)
    snake = cfg.start.map(p => ({ x: p.x, y: p.y }))
    dx = cfg.startDir.x
    dy = cfg.startDir.y
    nextDx = dx
    nextDy = dy
    obstacles = []
    isGolden = false
    goldTicksLeft = 0
    speed = cfg.enterSpeed
    fillObstaclesToTarget()
    draw()
    spawnFood()
    restartInterval()
    showScore()
  } else {
    loadLevel(1)
    showScore()
  }
}

function levelUp2() {
  loadLevel(2)
  milestoneText = "lvl 2!"
  milestoneTicksLeft = 4
}

function levelUp3() {
  loadLevel(3)
  milestoneText = "lvl 3!"
  milestoneTicksLeft = 4
}


function startBossFight() {
  level3Phase = "boss"
  addSprite(10, 8, bossType)
  const spr = getFirst(bossType)
  bossEntity = { sprite: spr, hp: BOSS_MAX_HP, moveCounter: 0 }
  core = null
  ticksSinceCore = CORE_SPAWN_EVERY
  milestoneText = "boss!"
  milestoneTicksLeft = 4
}

function spawnCore() {
  if (!bossEntity) return
  const b = bossEntity.sprite
  let tiles = emptyTiles().filter(t => Math.abs(t.x - b.x) + Math.abs(t.y - b.y) <= 5)
  if (tiles.length === 0) tiles = emptyTiles()
  if (tiles.length === 0) return
  const spot = tiles[Math.floor(Math.random() * tiles.length)]
  addSprite(spot.x, spot.y, coreItem)
  const spr = getFirst(coreItem)
  core = { sprite: spr, ticksLeft: CORE_LIFETIME }
}

function stepBossToward(target) {
  const b = bossEntity.sprite
  const dxs = Math.sign(target.x - b.x)
  const dys = Math.sign(target.y - b.y)
  const distX = Math.abs(target.x - b.x)
  const distY = Math.abs(target.y - b.y)

  let tryMoves
  if (distX >= distY) {
    tryMoves = [[dxs, 0], [0, dys]]
  } else {
    tryMoves = [[0, dys], [dxs, 0]]
  }

  for (const [mx, my] of tryMoves) {
    if (mx === 0 && my === 0) continue
    const nx = b.x + mx
    const ny = b.y + my
    if (!isWallTile(nx, ny)) {
      b.x = nx
      b.y = ny
      return
    }
  }
}

function moveBossAndCore() {
  if (!bossEntity) return false

  ticksSinceCore++
  if (!core && ticksSinceCore >= CORE_SPAWN_EVERY) {
    spawnCore()
    ticksSinceCore = 0
  }
  if (core) {
    core.ticksLeft--
    if (core.ticksLeft <= 0) {
      core.sprite.remove()
      core = null
    }
  }

  bossEntity.moveCounter++
  let moveEvery = 2
  if (bossEntity.hp <= 2) moveEvery = 1
  if (bossEntity.moveCounter >= moveEvery) {
    bossEntity.moveCounter = 0
    stepBossToward(snake[0])
  }

  const bx = bossEntity.sprite.x
  const by = bossEntity.sprite.y
  if (snake.some(s => s.x === bx && s.y === by)) {
    endGame()
    return true
  }
  return false
}


function endGame() {
  gameState = "ended"
  won = false
  clearInterval(tickHandle)
  if (score > highScore) highScore = score
  setMap(blackMap)
  clearText()
  addText("game over", { x: 1, y: 3, color: color`2` })
  addText(`score ${score}`, { x: 1, y: 5, color: color`2` })
  addText(`best  ${highScore}`, { x: 1, y: 6, color: color`2` })
  addText("j: menu", { x: 1, y: 8, color: color`2` })
}

function winGame() {
  gameState = "ended"
  won = true
  clearInterval(tickHandle)
  if (bossEntity) { bossEntity.sprite.remove(); bossEntity = null }
  if (core) { core.sprite.remove(); core = null }
  level3Phase = "won"
  score += 50
  if (score > highScore) highScore = score
  setMap(blackMap)
  clearText()
  addText("you win!", { x: 1, y: 3, color: color`2` })
  addText(`score ${score}`, { x: 1, y: 5, color: color`2` })
  addText(`best  ${highScore}`, { x: 1, y: 6, color: color`2` })
  addText("j: menu", { x: 1, y: 8, color: color`2` })
}


function tick() {
  if (gameState !== "playing") return

  dx = nextDx
  dy = nextDy

  const head = snake[0]
  const newHead = { x: head.x + dx, y: head.y + dy }

  const hitsWallNow = isWallTile(newHead.x, newHead.y)
  const hitsSelf = snake.some(s => s.x === newHead.x && s.y === newHead.y)
  const hitsRock = obstacles.some(o => o.x === newHead.x && o.y === newHead.y)
  const hitsBoss = bossEntity && newHead.x === bossEntity.sprite.x && newHead.y === bossEntity.sprite.y

  if (hitsWallNow || hitsSelf || hitsRock || hitsBoss) {
    endGame()
    return
  }

  const tileSprites = getTile(newHead.x, newHead.y)
  const foodSprite = tileSprites.find(s => s.type === food)
  const goldSprite = tileSprites.find(s => s.type === goldFood)
  const gemSprite = gameMode === "campaign" ? tileSprites.find(s => s.type === gem) : null
  const coreSprite = gameMode === "campaign" ? tileSprites.find(s => s.type === coreItem) : null

  snake.unshift(newHead)
  let grew = false

  if (gemSprite) {
    gemSprite.remove()
    gemsCollected++
    score += 5
    grew = true
    checkMilestone()
    if (gemsCollected >= 5 && level3Phase === "gems") {
      startBossFight()
      draw()
      showScore()
      return
    }
  }

  if (coreSprite && bossEntity) {
    coreSprite.remove()
    core = null
    bossEntity.hp--
    score += 8
    grew = true
    if (bossEntity.hp <= 0) {
      winGame()
      return
    } else {
      milestoneText = `hit ${BOSS_MAX_HP - bossEntity.hp}/${BOSS_MAX_HP}`
      milestoneTicksLeft = 3
    }
  }

  if (foodSprite || goldSprite) {
    score += goldSprite ? 3 : 1
    grew = true
    checkMilestone()

    if (gameMode === "campaign") {
      if (level === 1 && score >= LEVEL2_UP_SCORE) {
        levelUp2()
        showScore()
        return
      }
      if (level === 2 && score >= LEVEL3_UP_SCORE) {
        levelUp3()
        showScore()
        return
      }
    }

    fillObstaclesToTarget()
    spawnFood()

    const cfg = currentConfig()
    if (score % 3 === 0 && speed > cfg.minSpeed) {
      speed -= 15
      restartInterval()
    }
  }

  if (!grew) {
    snake.pop()
    if (isGolden) {
      goldTicksLeft--
      if (goldTicksLeft <= 0) {
        getAll(goldFood).forEach(f => f.remove())
        isGolden = false
        spawnFood()
      }
    }
  }

  if (gameMode === "campaign" && level3Phase === "boss") {
    const ended = moveBossAndCore()
    if (ended) return
  }

  draw()
  showScore()
}


onInput("w", () => {
  if (gameState !== "playing") return
  if (dy === 0) { nextDx = 0; nextDy = -1 }
})
onInput("s", () => {
  if (gameState !== "playing") return
  if (dy === 0) { nextDx = 0; nextDy = 1 }
})
onInput("a", () => {
  if (gameState !== "playing") return
  if (dx === 0) { nextDx = -1; nextDy = 0 }
})
onInput("d", () => {
  if (gameState !== "playing") return
  if (dx === 0) { nextDx = 1; nextDy = 0 }
})

onInput("j", () => {
  if (gameState === "menu") { startGame("campaign"); return }
  if (gameState === "ended") { showMenu(); return }
})
onInput("i", () => {
  if (gameState === "menu") { startGame("infinite"); return }
})

showMenu()
