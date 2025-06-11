const bubble = "o"
const spike = "v"
const green = "g"

setLegend(
  [ bubble, bitmap`
................
................
.......00.......
......0000......
.....000000.....
.....00..00.....
.....00..00.....
......0000......
.......00.......
......0..0......
......0..0......
.......00.......
.......00.......
.......00.......
.......00.......
................` ],
  [ spike, bitmap`
................
................
................
................
................
......3333......
.....322223.....
.....321123.....
.....321123.....
......3333......
.......3........
.......3........
......333.......
......3.3.......
.....3...3......
................` ],
  [ green, bitmap`
................
................
................
.......44.......
......4444......
.....44..44.....
.....44..44.....
......4444......
.......44.......
................
................
................
................
................
................
................` ]
)

setSolids([bubble])

setMap(map`
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
`)

// Sound effects
const collectSound = tune`
500: C5^500,
500`
const hitSound = tune`
150: G4~150,
150: F4~150,
150: E4~150,
150`
const winSound = tune`
100: C5~100,
100: D5~100,
100: E5~100,
100: G5~100,
100: C6~100,
100`
const loseSound = tune`
100: C4~100,
100: B3~100,
100: A3~100,
100: G3~100,
100`

let lives = 10
let level = 1
let collected = 0
let goal = 5
let bubbleStartX = 7
let bubbleStartY = 12

function spawnBubble() {
  addSprite(bubbleStartX, bubbleStartY, bubble)
}

function spawnFalling(type) {
  let x = Math.floor(Math.random() * width())
  if (getTile(x, 0).length === 0) {
    addSprite(x, 0, type)
  }
}

function clearTypeAt(x, y, typeToRemove) {
  let tile = getTile(x, y)
  for (let i = 0; i < tile.length; i++) {
    if (tile[i].type === typeToRemove) {
      tile[i].remove()
      break
    }
  }
}

function fallObjects(type) {
  for (let y = height() - 2; y >= 0; y--) {
    for (let x = 0; x < width(); x++) {
      let tile = getTile(x, y)
      if (tile.some(t => t.type === type)) {
        let below = getTile(x, y + 1)
        let isBubbleBelow = below.some(t => t.type === bubble)

        if (!isBubbleBelow && below.length === 0) {
          clearTypeAt(x, y, type)
          addSprite(x, y + 1, type)
        } else if (isBubbleBelow) {
          if (type === green) {
            clearTypeAt(x, y, green)
            collected++
            playTune(collectSound)
          } else if (type === spike) {
            clearTypeAt(x, y, spike)
            lives--
            playTune(hitSound)

            let b = getFirst(bubble)
            if (b) clearTile(b.x, b.y)

            if (lives <= 0) {
              clearText()
              addText("GAME OVER", { x: 4, y: 6, color: color`red` })
              playTune(loseSound)
              setTimeout(() => reset(), 2000)
              return
            } else {
              spawnBubble()
            }
          }
        }
      }
    }
  }

  // Clean up objects that reached bottom without hitting bubble
  for (let x = 0; x < width(); x++) {
    let bottomTile = getTile(x, height() - 1)
    for (let obj of bottomTile) {
      if ((obj.type === spike || obj.type === green) && !bottomTile.some(t => t.type === bubble)) {
        obj.remove()
      }
    }
  }
}

function checkGoal() {
  if (collected >= goal) {
    level++
    if (level > 15) {
      clearText()
      addText("YOU WIN!", { x: 4, y: 6, color: color`blue` })
      playTune(winSound)
      return
    }
    resetLevel()
  }
}

function resetLevel() {
  for (let y = 0; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      clearTile(x, y)
    }
  }

  collected = 0
  goal = 5 + (level - 1) * 3
  spawnBubble()
}

function updateUI() {
  clearText()
  addText(`Lives: ${lives}`, { x: 2, y: 0, color: color`green` })
  addText(`Level: ${level}`, { x: 2, y: 1, color: color`blue` })
  addText(`Goal: ${collected}/${goal}`, { x: 2, y: 2, color: color`yellow` })
}


// Movement
onInput("a", () => {
  let b = getFirst(bubble)
  if (b && b.x > 0) {
    clearTile(b.x, b.y)
    addSprite(b.x - 1, b.y, bubble)
  }
})

onInput("d", () => {
  let b = getFirst(bubble)
  if (b && b.x < width() - 1) {
    clearTile(b.x, b.y)
    addSprite(b.x + 1, b.y, bubble)
  }
})

// Game loop
resetLevel()

setInterval(() => {
  fallObjects(spike)
  fallObjects(green)

  let spikeCount = Math.min(1 + Math.floor(level / 3), 5)
  let greenCount = Math.min(1 + Math.floor(level / 4), 4)

  for (let i = 0; i < spikeCount; i++) {
    spawnFalling(spike)
  }
  for (let i = 0; i < greenCount; i++) {
    spawnFalling(green)
  }

  checkGoal()
  updateUI()
}, Math.max(300, 700 - level * 25))
