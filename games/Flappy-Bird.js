/*
@title: Flappy Bird (Sprig)
@author: Xayden
*/

const BIRD = "b"
const PIPE_TOP = "T"
const PIPE_BOTTOM = "P"
const GROUND = "g"
const SKY = "s" 

const MAP_W = 16
const MAP_H = 16
const PLAYABLE_H = MAP_H - 1 

setLegend(
  [ SKY, bitmap`
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

  [ BIRD, bitmap`
................
................
................
.......77.......
......7777......
.....777777.....
....77777777....
...7777777777...
..777777777777..
.77777777777777.
.77007770007770.
..770000000077..
...7700000077...
....77707777....
.....777777.....
......7777......` ],
  [ PIPE_TOP, bitmap`
................
................
................
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
................
................` ],
  [ PIPE_BOTTOM, bitmap`
................
................
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
................
................` ],
  [ GROUND, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ]
)

setBackground(SKY)
setSolids([PIPE_TOP, PIPE_BOTTOM, GROUND]) 

const baseMap = map`
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
gggggggggggggggg`
setMap(baseMap)

getAll(GROUND).forEach(s => s.remove())
for (let x = 0; x < MAP_W; x++) addSprite(x, MAP_H - 1, GROUND)

addSprite(2, 7, BIRD)
let bird = getFirst(BIRD)


let birdFy = bird.y


let gravity = 0
let score = 0
let running = true

let pipes = [] 
const GAP_SIZE = 4
const SCROLL_SPEED = 0.45 
const TICK_MS = 80
const SPAWN_TICKS = 12 
let spawnCounter = 0

function addPipeAtColumn(colX) {
  const minGapY = 1
  const maxGapY = Math.max(minGapY, PLAYABLE_H - GAP_SIZE - 1)
  const gapY = Math.floor(Math.random() * (maxGapY - minGapY + 1)) + minGapY


  pipes.push({ x: colX, gapY: gapY, gapSize: GAP_SIZE, passed: false })

  if (colX >= 0 && colX < MAP_W) {

    for (let y = 0; y < gapY; y++) {
      addSprite(colX, y, PIPE_TOP)
    }

    const bottomStart = gapY + GAP_SIZE
    for (let y = bottomStart; y < PLAYABLE_H; y++) {
      addSprite(colX, y, PIPE_BOTTOM)
    }
  }
}


for (let i = 0; i < 3; i++) {
  const startX = MAP_W - 1 + i * Math.floor(SPAWN_TICKS * SCROLL_SPEED) + i * 6
  addPipeAtColumn(startX)
}


function renderPipesFromLogic() {
  getAll(PIPE_TOP).forEach(s => s.remove())
  getAll(PIPE_BOTTOM).forEach(s => s.remove())


  pipes.forEach(p => {
    const col = Math.round(p.x)
    if (col >= 0 && col < MAP_W) {

      for (let y = 0; y < p.gapY; y++) {
        addSprite(col, y, PIPE_TOP)
      }

      const bottomStart = p.gapY + p.gapSize
      for (let y = bottomStart; y < PLAYABLE_H; y++) {
        addSprite(col, y, PIPE_BOTTOM)
      }
    }
  })
}

function tick() {
  if (!running) return


  gravity += 0.18
  if (gravity > 3) gravity = 3
  birdFy += gravity

  if (birdFy < 0) birdFy = 0
  if (birdFy > PLAYABLE_H - 1) birdFy = PLAYABLE_H - 1

  bird.y = Math.round(birdFy)

  pipes.forEach(p => {
    p.x -= SCROLL_SPEED
  })


  while (pipes.length > 0 && pipes[0].x < -2) {
    pipes.shift()
  }


  spawnCounter++
  if (spawnCounter >= SPAWN_TICKS) {

    addPipeAtColumn(MAP_W - 1)
    spawnCounter = 0
  }


  renderPipesFromLogic()


  pipes.forEach(p => {
    if (!p.passed && bird.x > p.x + 0.5) {
      p.passed = true
      score++
    }
  })


  const bx = Math.floor(bird.x)
  const by = Math.floor(bird.y)
  const tileSprites = getTile(bx, by)
  const hitPipe = tileSprites.some(s => s.type === PIPE_TOP || s.type === PIPE_BOTTOM)
  const hitGround = by >= PLAYABLE_H

  if (hitPipe || hitGround) {
    running = false
    clearText()
    addText("Game Over", { x: 4, y: 6, color: color`3` })
    addText("Score: " + score, { x: 5, y: 8, color: color`3` })
    addText("Press S to restart", { x: 2, y: 10, color: color`3` })
    return
  }


  clearText()
  addText("Score: " + score, { x: 1, y: 1, color: color`3` })

  setTimeout(tick, TICK_MS)
}

tick()

onInput("w", () => {
  if (!running) return

  gravity = -0.9
  birdFy += gravity 
  if (birdFy < 0) birdFy = 0
  if (birdFy > PLAYABLE_H - 1) birdFy = PLAYABLE_H - 1
  bird.y = Math.round(birdFy)
})

onInput("s", () => {
  if (running) return

  getAll(PIPE_TOP).forEach(s => s.remove())
  getAll(PIPE_BOTTOM).forEach(s => s.remove())

  pipes = []
  spawnCounter = 0

  for (let i = 0; i < 3; i++) {
    const startX = MAP_W - 1 + i * Math.floor(SPAWN_TICKS * SCROLL_SPEED) + i * 6
    addPipeAtColumn(startX)
  }

  bird.x = 2
  birdFy = 7
  bird.y = Math.round(birdFy)
  gravity = 0
  score = 0
  running = true
  clearText()
  tick()
})