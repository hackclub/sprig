
/*
@title: NEON DASH
@description: Jump, dodge, survive!
@author: You
@tags: ['arcade', 'platformer']
*/

const player = "p"
const spike = "s"
const ground = "g"

setLegend(
  [player, bitmap`
................
................
....555555......
....555555......
....55FF55......
....55FF55......
....555555......
....555555......
....555555......
....555555......
....555555......
....555555......
....555555......
....555555......
................
................`],
  [spike, bitmap`
................
................
.......3........
......333.......
......333.......
.....33333......
.....33333......
....3333333.....
....3333333.....
...333333333....
...333333333....
..33333333333...
..33333333333...
.3333333333333..
.3333333333333..
3333333333333333`],
  [ground, bitmap`
7777777777777777
7777777777777777
7777777777777777
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
................`
  ]
)

const startingLevel = map`
........
........
........
........
........
........
.p......
gggggggg`

setMap(startingLevel)

let alive = true
let jumping = false
let jumpStep = 0
let tick = 0
let score = 0
let spawnTimer = 0

// Higher jump: 4 tiles up, then 4 tiles down.
const jumpHeight = 4
const jumpDuration = 8

function resetGame() {
  alive = true
  jumping = false
  jumpStep = 0
  tick = 0
  score = 0
  spawnTimer = 0

  setMap(startingLevel)
  clearText()
}

function jump() {
  if (!alive) {
    resetGame()
    return
  }

  if (!jumping) {
    jumping = true
    jumpStep = 0
  }
}

onInput("w", jump)
onInput("k", jump)
onInput("j", jump)

function crash() {
  alive = false
  clearText()

  addText("CRASH!", {
    x: 1,
    y: 2,
    color: color`3`
  })

  addText("Score: " + score, {
    x: 1,
    y: 4,
    color: color`5`
  })

  addText("J TO RETRY", {
    x: 0,
    y: 6,
    color: color`3`
  })
}

function gameTick() {
  if (alive) {
    tick++

    const hero = getFirst(player)
    if (!hero) return

    // Jump up 4 tiles, then descend 4 tiles.
    if (jumping) {
      if (jumpStep < jumpHeight) {
        if (hero.y > 0) hero.y -= 1
      } else {
        if (hero.y < 6) hero.y += 1
      }

      jumpStep++

      if (jumpStep >= jumpDuration) {
        hero.y = 6
        jumping = false
        jumpStep = 0
      }
    }

    // Scroll spikes left.
    if (tick % 3 === 0) {
      for (const s of getAll(spike)) {
        s.x -= 1

        if (s.x < 0) {
          s.remove()
          score++
        }
      }

      spawnTimer++

      // Leave more space between spikes.
      if (spawnTimer >= 3) {
        spawnTimer = 0
        addSprite(7, 6, spike)
      }
    }

    // Check collisions.
    for (const s of getAll(spike)) {
      if (s.x === hero.x && s.y === hero.y) {
        crash()
        return
      }
    }

    clearText()

    addText("NEON DASH", {
      x: 0,
      y: 0,
      color: color`5`
    })

    addText("Score: " + score, {
      x: 0,
      y: 1,
      color: color`3`
    })
  }

  setTimeout(gameTick, 250)
}

gameTick()

