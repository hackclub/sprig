const grass = "g"
const line = "l"
const vline = "v"
const circle = "c"
const ball = "o"
const blue = "b"
const red = "r"
const blueGK = "q"
const redGK = "s"
const markerBlue = "x"
const markerRed = "y"
const goal = "n"
const post = "p"

const discoColors = [3, 7, 6, 8, 10, 11]
let discoIndex = 0

setLegend(
  [markerBlue, bitmap`
................
................
....33333333....
...3333333333...
...3333333333...
....33333333....
.....333333.....
......3333......
................
................
................
................
................
................
................
................`],

  [markerRed, bitmap`
................
................
....77777777....
...7777777777...
...7777777777...
....77777777....
.....777777.....
......7777......
................
................
................
................
................
................
................
................`],

  [ball, bitmap`
................
................
......0000......
....00000000....
...0000000000...
...0000000000...
....00000000....
......0000......
................
................
................
................
................
................
................
................`],

  [blue, bitmap`
................
.....333333.....
....33333333....
...3333333333...
..333333333333..
..333333333333..
...3333333333...
...3333333333...
....33333333....
.....333333.....
......3333......
................
................
................
................
................`],

  [red, bitmap`
................
.....777777.....
....77777777....
...7777777777...
..777777777777..
..777777777777..
...7777777777...
...7777777777...
....77777777....
.....777777.....
......7777......
................
................
................
................
................`],

  [blueGK, bitmap`
................
.....333333.....
....33333333....
...3333333333...
..333333333333..
..333333333333..
...3333333333...
...3333333333...
....33333333....
.....333333.....
......3333......
................
................
................
................
................`],

  [redGK, bitmap`
................
.....777777.....
....77777777....
...7777777777...
..777777777777..
..777777777777..
...7777777777...
...7777777777...
....77777777....
.....777777.....
......7777......
................
................
................
................
................`],

  [goal, bitmap`
1111111111111111
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1111111111111111`],

  [post, bitmap`
................
................
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
................
................`],

[line, bitmap`
................
................
................
................
................
................
................
1111111111111111
1111111111111111
................
................
................
................
................
................
................
`],

 [vline, bitmap`
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
`],

 [circle, bitmap`
.....111111.....
....11....11....
...1........1...
..1..........1..
.11..........11.
1..............1
1..............1
1..............1
1..............1
1..............1
.11..........11.
..1..........1..
...1........1...
....11....11....
.....111111.....
................
`],

 [grass, bitmap`
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
4444444444444444`]
)

const level = map`
gggggggggg
gggggggggg
gggggggggg
gggggggggg
gggggggggg
gggggggggg
gggggggggg
gggggggggg`

setMap(level)
setBackground(grass)

for (let x = 1; x <= 8; x++) {
  addSprite(x, 1, line)
  addSprite(x, 7, line)
}

for (let y = 2; y <= 6; y++) {
  addSprite(1, y, vline)
  addSprite(8, y, vline)
}

for (let y = 2; y <= 6; y++) {
  addSprite(5, y, vline)
}

addSprite(2, 3, line)
addSprite(2, 5, line)

addSprite(7, 3, line)
addSprite(2, 3, vline)
addSprite(2, 4, vline)
addSprite(2, 5, vline)
addSprite(7, 5, line)

addSprite(5, 4, circle)

addSprite(7, 3, vline)
addSprite(7, 4, vline)
addSprite(7, 5, vline)

addSprite(5, 4, circle)

addSprite(1, 3, post)
addSprite(1, 4, goal)
addSprite(1, 5, post)

addSprite(8, 3, post)
addSprite(8, 4, goal)
addSprite(8, 5, post)

addSprite(3, 4, blue)
addSprite(3, 2, blue)
addSprite(4, 3, blue)
addSprite(3, 5, blue)
addSprite(2, 4, blueGK)

addSprite(6, 4, red)
addSprite(6, 2, red)
addSprite(5, 3, red)
addSprite(6, 5, red)
addSprite(7, 4, redGK)

addSprite(4, 4, ball)

let blueSelected = 0
let redSelected = 0
let blueScore = 0
let redScore = 0
let timeLeft = 300
let gameOver = false

function getBluePlayers() {
  return getAll(blue).concat(getAll(blueGK))
}

function getRedPlayers() {
  return getAll(red).concat(getAll(redGK))
}

function distance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

function playerAt(x, y, ignore) {
  const players = getBluePlayers().concat(getRedPlayers())

  for (const p of players) {
    if (p === ignore) continue

    if (p.x === x && p.y === y) {
      return true
    }
  }

  return false
}

function tryMovePlayer(player, dx, dy) {
  const nx = player.x + dx
  const ny = player.y + dy

  if (
  !validPlayerPosition(nx, ny) &&
  !validGoalkeeperPosition(player, nx, ny)
) {
  return false
}

  const football = getFirst(ball)

  if (football.x === nx && football.y === ny) {
    const oldX = football.x
    const oldY = football.y

    kickBall(dx, dy)

    if (football.x === oldX && football.y === oldY) {
      return false
    }
  }

  const players = getBluePlayers().concat(getRedPlayers())

  let blocker = null

  for (const p of players) {
    if (p !== player && p.x === nx && p.y === ny) {
      blocker = p
      break
    }
  }

  if (blocker === null) {
    player.x = nx
    player.y = ny
    return true
  }

  const pushX = blocker.x + dx
  const pushY = blocker.y + dy

  if (
    validPlayerPosition(pushX, pushY) &&
    !playerAt(pushX, pushY, blocker)
  ) {
    blocker.x = pushX
    blocker.y = pushY

    player.x = nx
    player.y = ny

    return true
  }

  const side1X = player.x + dy
  const side1Y = player.y - dx

  if (
    validPlayerPosition(side1X, side1Y) &&
    !playerAt(side1X, side1Y, player)
  ) {
    player.x = side1X
    player.y = side1Y
    return true
  }

  const side2X = player.x - dy
  const side2Y = player.y + dx

  if (
    validPlayerPosition(side2X, side2Y) &&
    !playerAt(side2X, side2Y, player)
  ) {
    player.x = side2X
    player.y = side2Y
    return true
  }

  return false
}
function validPlayerPosition(x, y) {
  return x >= 2 && x <= 7 && y >= 1 && y <= 7
}

function validGoalkeeperPosition(player, x, y) {
  if (player.type === blueGK) {
    return x === 2 && y >= 1 && y <= 6
  }

  if (player.type === redGK) {
    return x === 7 && y >= 1 && y <= 6
  }

  return false
}

function updateBlueSelection() {
  const players = getBluePlayers()
  const football = getFirst(ball)

  let best = 999
  let selected = 0

  for (let i = 0; i < players.length; i++) {
    const d = distance(players[i], football)

    if (d < best) {
      best = d
      selected = i
    }
  }

  blueSelected = selected
}

function updateRedSelection() {
  const players = getRedPlayers()
  const football = getFirst(ball)

  let best = 999
  let selected = 0

  for (let i = 0; i < players.length; i++) {
    const d = distance(players[i], football)

    if (d < best) {
      best = d
      selected = i
    }
  }

  redSelected = selected
}

function updateMarkers() {
  const blueMarkers = getAll(markerBlue)
  const redMarkers = getAll(markerRed)

  for (const m of blueMarkers) {
    m.remove()
  }

  for (const m of redMarkers) {
    m.remove()
  }

  const bp = getBluePlayers()
  const rp = getRedPlayers()

  if (bp[blueSelected]) {
    addSprite(bp[blueSelected].x, bp[blueSelected].y, markerBlue)
  }

  if (rp[redSelected]) {
    addSprite(rp[redSelected].x, rp[redSelected].y, markerRed)
  }
}

function validBallPosition(x, y) {
  if ((x === 1 || x === 8) && (y === 3 || y === 4)) {
    return true
  }

  return x >= 2 && x <= 7 && y >= 2 && y <= 5
}

function kickBall(dx, dy) {
  const football = getFirst(ball)

  const nx = football.x + dx
  const ny = football.y + dy

  if (!validBallPosition(nx, ny)) {
    return false
  }

  const players = getBluePlayers().concat(getRedPlayers())

  let blocker = null

  for (const p of players) {
    if (p.x === nx && p.y === ny) {
      blocker = p
      break
    }
  }

  if (blocker !== null) {
    const pushX = blocker.x + dx
    const pushY = blocker.y + dy

    if (
      validPlayerPosition(pushX, pushY) &&
      !playerAt(pushX, pushY, blocker)
    ) {
      blocker.x = pushX
      blocker.y = pushY
    } else {
      const side1X = football.x + dy
      const side1Y = football.y - dx

      const side2X = football.x - dy
      const side2Y = football.y + dx

      if (
        validBallPosition(side1X, side1Y) &&
        !playerAt(side1X, side1Y, null)
      ) {
        football.x = side1X
        football.y = side1Y
        checkGoal()
        return true
      }

      if (
        validBallPosition(side2X, side2Y) &&
        !playerAt(side2X, side2Y, null)
      ) {
        football.x = side2X
        football.y = side2Y
        checkGoal()
        return true
      }

      return false
    }
  }

  football.x = nx
  football.y = ny

  checkGoal()
  return true
}

function moveBlue(dx, dy) {
  if (gameOver) return

  updateBlueSelection()

  const players = getBluePlayers()
  const player = players[blueSelected]

  tryMovePlayer(player, dx, dy)

  checkGoal()

  updateBlueSelection()
  updateRedSelection()
  updateMarkers()
}

function moveRed(dx, dy) {
  if (gameOver) return

  updateRedSelection()

  const players = getRedPlayers()
  const player = players[redSelected]

  tryMovePlayer(player, dx, dy)

  checkGoal()

  updateBlueSelection()
  updateRedSelection()
  updateMarkers()
}

function moveBlueAI() {
  const players = getBluePlayers()
  const football = getFirst(ball)

  for (let i = 0; i < players.length; i++) {
    if (i === blueSelected) continue

    if (Math.random() > 0.3) continue

    const p = players[i]

    let dx = 0
    let dy = 0

    if (football.x > p.x) dx = 1
    if (football.x < p.x) dx = -1
    if (football.y > p.y) dy = 1
    if (football.y < p.y) dy = -1

    if (Math.random() < 0.5) {
      dy = 0
    } else {
      dx = 0
    }

    const nx = p.x + dx
    const ny = p.y + dy

    if (
      validPlayerPosition(nx, ny) &&
      !playerAt(nx, ny, p)
    ) {
      p.x = nx
      p.y = ny
    }

    if (
      Math.abs(p.x - football.x) <= 1 &&
      Math.abs(p.y - football.y) <= 1 &&
      football.x < 8
    ) {
      kickBall(1, 0)
    }
  }
}

function moveRedAI() {
  const players = getRedPlayers()
  const football = getFirst(ball)

  for (let i = 0; i < players.length; i++) {
    if (i === redSelected) continue

    if (Math.random() > 0.3) continue

    const p = players[i]

    let dx = 0
    let dy = 0

    if (football.x > p.x) dx = 1
    if (football.x < p.x) dx = -1
    if (football.y > p.y) dy = 1
    if (football.y < p.y) dy = -1

    if (Math.random() < 0.5) {
      dy = 0
    } else {
      dx = 0
    }

    const nx = p.x + dx
    const ny = p.y + dy

    if (
      validPlayerPosition(nx, ny) &&
      !playerAt(nx, ny, p)
    ) {
      p.x = nx
      p.y = ny
    }

    if (
      Math.abs(p.x - football.x) <= 1 &&
      Math.abs(p.y - football.y) <= 1 &&
      football.x > 1
    ) {
      kickBall(-1, 0)
    }
  }
}

function resetPositions() {
  const bp = getBluePlayers()
  const rp = getRedPlayers()

  const bluePositions = [
    [3, 4],
    [3, 2],
    [4, 3],
    [3, 5],
    [2, 4]
  ]

  const redPositions = [
    [6, 4],
    [6, 2],
    [5, 3],
    [6, 5],
    [7, 4]
  ]

  for (let i = 0; i < bp.length; i++) {
    bp[i].x = bluePositions[i][0]
    bp[i].y = bluePositions[i][1]
  }

  for (let i = 0; i < rp.length; i++) {
    rp[i].x = redPositions[i][0]
    rp[i].y = redPositions[i][1]
  }

  const football = getFirst(ball)
  football.x = 4
  football.y = 4

  updateBlueSelection()
  updateRedSelection()
  updateMarkers()
}

function checkGoal() {
  if (gameOver) return

  const football = getFirst(ball)

  if (
    football.x === 1 &&
    (football.y === 3 || football.y === 4)
  ) {
    blueScore++
    resetPositions()
    updateScore()
    return
  }

  if (
    football.x === 8 &&
    (football.y === 3 || football.y === 4)
  ) {
    redScore++
    resetPositions()
    updateScore()
    return
  }
}

function updateScore() {
  clearText()

  let minutes = Math.floor(timeLeft / 60)
  let seconds = timeLeft % 60

  if (seconds < 10) {
    seconds = "0" + seconds
  }

  addText("RED: " + redScore, {
    x: 0,
    y: 0,
    color: color`3`
  })

  addText(minutes + ":" + seconds, {
    x: 8,
    y: 1,
    color: color`5`
  })

  addText("BLUE: " + blueScore, {
    x: 13,
    y: 0,
    color: color`7`
  })
}

function drawFinalScreen() {
  clearText()

  const c = color`${discoColors[discoIndex]}`

  if (blueScore > redScore) {
    addText("BLUE WINS!", {x:7,y:3,color:c})
  } else if (redScore > blueScore) {
    addText("RED WINS!", {x:7,y:3,color:c})
  } else {
    addText("DRAW!", {x:7,y:3,color:c})
  }

  addText("FINAL", {x:8,y:4,color:c})
  addText(blueScore+" - "+redScore, {x:9,y:5,color:c})
}

function fullTime() {
  gameOver = true
  discoIndex = 0
  drawFinalScreen()
}

setInterval(() => {
  if (!gameOver) return

  discoIndex = (discoIndex + 1) % discoColors.length
  drawFinalScreen()
}, 300)

onInput("w", () => {
  moveBlue(0, -1)
})

onInput("a", () => {
  moveBlue(-1, 0)
})

onInput("s", () => {
  moveBlue(0, 1)
})

onInput("d", () => {
  moveBlue(1, 0)
})

onInput("i", () => {
  moveRed(0, -1)
})

onInput("j", () => {
  moveRed(-1, 0)
})

onInput("k", () => {
  moveRed(0, 1)
})

onInput("l", () => {
  moveRed(1, 0)
})

afterInput(() => {
  checkGoal()
  updateMarkers()
})

updateBlueSelection()
updateRedSelection()
updateMarkers()
updateScore()

setInterval(() => {
  if (gameOver) return

  timeLeft--

  moveBlueAI()
  moveRedAI()

  updateBlueSelection()
  updateRedSelection()
  updateMarkers()

  checkGoal()
  updateScore()

  if (timeLeft <= 0) {
    fullTime()
  }
}, 1000)