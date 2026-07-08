// @title: Grid Run Sysadmin
// @author: hack club sprig contest entry
// @description: You are an IT guy trying to save servers from bugs and overheating.
// @tags: [arcade, strategy]
// @addedOn: 2026-07-06

// grid run sysadmin
// you are an IT guy trying to save servers from bugs and overheating
// made for hack club sprig contest!!

const player = "p"
const server = "s"
const heat   = "h"
const bug    = "b"
const crash  = "x"
const wall   = "w"

setLegend(
  [ player, bitmap`
................
....00000000....
...0011111100...
..001111111110..
..0155111111510.
..0100100100110.
..0100100100110.
..011111111100..
..011111111100..
..0100000000110.
..0100000000110.
..011111111110..
..001111111110..
...0011111100...
....00000000....
................` ],

  [ server, bitmap`
................
.00000000000000.
.01111111111110.
.01000000000010.
.01055000055010.
.01000000000010.
.01111111111110.
.01000000000010.
.01055000055010.
.01000000000010.
.01111111111110.
.01000000000010.
.01055000055010.
.00000000000000.
................` ],

  [ heat, bitmap`
................
.00000000000000.
.03333333333330.
.03000000000030.
.03033000033030.
.03000000000030.
.03333333333330.
.03000000000030.
.03033000033030.
.03000000000030.
.03333333333330.
.03000000000030.
.03033000033030.
.00000000000000.
................` ],

  [ bug, bitmap`
................
......44..44....
.....44444444...
....4404444044..
....4444444444..
....4444444444..
.....44444444...
..4..44444444..4
..44.44444444.44
...444.4444.444.
....4...44...4..
................
................
................
................
................` ],

  [ crash, bitmap`
................
.00000000000000.
.01111111111110.
.01000000000010.
.01020000020210.
.01002002000210.
.01000220000210.
.01000220000210.
.01002002000210.
.01020000020210.
.01000000000010.
.01111111111110.
.00000000000000.
................
................` ],

  [ wall, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000` ]
)

setMap(map`
wwwwwwwwww
w.s..s..bw
w...p...sw
ws.s..s..w
w....b...w
w.s..s..sw
w...s....w
wwwwwwwwww
`)

let stepCount    = 0
let crashedCount = 0
let score        = 0
let gameOver     = false
const MAX_CRASHES = 3

function updateHUD() {
  clearText()
  addText("x:" + crashedCount + "/" + MAX_CRASHES + " s:" + score, { x: 0, y: 0, color: color`2` })
}

function checkWinLose() {
  if (gameOver) return

  if (crashedCount >= MAX_CRASHES) {
    clearText()
    addText("GAME OVER :(", { x: 1, y: 4, color: color`2` })
    addText("score: " + score, { x: 2, y: 6, color: color`1` })
    gameOver = true
  }
}

function spawnBug() {
  let emptySpots = []
  for (let x = 1; x < 9; x++) {
    for (let y = 1; y < 7; y++) {
      let stuff = getTile(x, y)
      if (stuff.length === 0) {
        emptySpots.push({ x, y })
      }
    }
  }
  if (emptySpots.length > 0) {
    let spot = emptySpots[ Math.floor(Math.random() * emptySpots.length) ]
    addSprite(spot.x, spot.y, bug)
  }
}

function tick() {
  if (gameOver) return
  stepCount++

  if (stepCount % 3 === 0) {
    let goodServers = getAll(server)
    if (goodServers.length > 0) {
      let pick = goodServers[ Math.floor(Math.random() * goodServers.length) ]
      pick.type = heat
    }
  }

  if (stepCount % 15 === 0) {
    spawnBug()
  }

  if (stepCount % 3 === 0) {
    let allBugs = getAll(bug)
    let me = getFirst(player)

    if (me) {
      for (let i = 0; i < allBugs.length; i++) {
        let b = allBugs[i]

        let dx = me.x - b.x
        let dy = me.y - b.y
        let nx = b.x
        let ny = b.y

        if (Math.abs(dx) > Math.abs(dy)) {
          nx += Math.sign(dx)
        } else {
          ny += Math.sign(dy)
        }

        let stuff     = getTile(nx, ny)
        let isWall    = stuff.some(t => t.type === wall)
        let isBug     = stuff.some(t => t.type === bug)
        let isPlayer  = stuff.some(t => t.type === player)
        let hitServer = stuff.find(t => t.type === server || t.type === heat)

        if (isWall || isBug) {
          // blocked
        } else if (hitServer) {
          hitServer.type = crash
          b.remove()
          crashedCount++
        } else if (!isPlayer) {
          b.x = nx
          b.y = ny
        }
      }
    }
  }

  updateHUD()
  checkWinLose()
}

function fixNearby() {
  if (gameOver) return
  let me = getFirst(player)
  if (!me) return

  let dirs = [
    { x: 0, y: -1 },
    { x: 0, y:  1 },
    { x: -1, y: 0 },
    { x:  1, y: 0 }
  ]

  for (let i = 0; i < dirs.length; i++) {
    let tx = me.x + dirs[i].x
    let ty = me.y + dirs[i].y
    let stuff = getTile(tx, ty)

    for (let j = 0; j < stuff.length; j++) {
      let t = stuff[j]
      if (t.type === heat) {
        t.type = server
        score++
      } else if (t.type === bug) {
        t.remove()
        score += 2
      }
    }
  }
}

function canWalkTo(x, y) {
  let stuff = getTile(x, y)
  return !stuff.some(t =>
    t.type === wall ||
    t.type === server ||
    t.type === heat ||
    t.type === crash
  )
}

onInput("w", () => {
  if (gameOver) return
  let me = getFirst(player)
  if (me && canWalkTo(me.x, me.y - 1)) {
    me.y -= 1
    tick()
  }
})

onInput("s", () => {
  if (gameOver) return
  let me = getFirst(player)
  if (me && canWalkTo(me.x, me.y + 1)) {
    me.y += 1
    tick()
  }
})

onInput("a", () => {
  if (gameOver) return
  let me = getFirst(player)
  if (me && canWalkTo(me.x - 1, me.y)) {
    me.x -= 1
    tick()
  }
})

onInput("d", () => {
  if (gameOver) return
  let me = getFirst(player)
  if (me && canWalkTo(me.x + 1, me.y)) {
    me.x += 1
    tick()
  }
})

onInput("i", () => {
  if (gameOver) return
  fixNearby()
  tick()
})

updateHUD()
