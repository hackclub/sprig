/*
@title: Car Driver
@description: Steer a car across four lanes of busy traffic and dodge every other car for as long as you can.
@author: Arjun Pai
@tags: ['arcade', 'driving', 'survival']
@addedOn: 2026-11-17
*/

const player = "p"
const redcar = "e"
const yellowcar = "y"
const grass = "g"
const road = "r"

setLegend(
  [ player, bitmap`
................
....00000000....
...0555555550...
...0555555550...
..000777777000..
..050777777050..
..000777777000..
...0555555550...
...0555555550...
...0555555550...
..000555555000..
..050555555050..
..000000000000..
...0555555550...
...0000000000...
................` ],

  [ redcar, bitmap`
................
...0000000000...
...0333333330...
..000000000000..
..030333333030..
..000333333000..
...0333333330...
...0333333330...
...0333333330...
..000777777000..
..030777777030..
..000777777000..
...0333333330...
...0333333330...
....00000000....
................` ],

  [ yellowcar, bitmap`
................
...0000000000...
...0666666660...
..000000000000..
..060666666060..
..000666666000..
...0666666660...
...0666666660...
...0666666660...
..000777777000..
..060777777060..
..000777777000..
...0666666660...
...0666666660...
....00000000....
................` ],

  [ grass, bitmap`
4444444444444444
44D4444444444444
4444444444D44444
4444444444444444
4D44444444444444
4444444D44444444
4444444444444D44
4444444444444444
44444D4444444444
4444444444444444
4D44444444D44444
4444444444444444
4444444D44444444
4444444444444444
44D4444444444D44
4444444444444444` ],

  [ road, bitmap`
2111111111111111
2111111111111111
2111111111111111
2111111111111111
2111111111111111
2111111111111111
2111111111111111
2111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ]
)

setBackground(road)

const layout = map`
ggg....ggg
ggg....ggg
ggg....ggg
ggg....ggg
ggg....ggg
ggg....ggg
ggg....ggg
ggg.p..ggg`

const crashTune = tune`
120: E4~120 + D4~120,
120: C4~120 + B4~120,
120: G4~120,
2760`

let score = 0
let alive = true
let running = false
let speed = 450
let ticks = 0

function allCars() {
  return getAll(redcar).concat(getAll(yellowcar))
}

function hit() {
  return tilesWith(player, redcar).length > 0 || tilesWith(player, yellowcar).length > 0
}

function drawScore() {
  clearText()
  addText("Score", { x: 0, y: 0, color: color`2` })
  addText("" + score, { x: 0, y: 1, color: color`2` })

  if (!alive) {
    addText("Crashed!", { x: 6, y: 6, color: color`3` })
    addText("K: retry", { x: 6, y: 8, color: color`2` })
  }
}

function crash() {
  alive = false
  playTune(crashTune)
  drawScore()
}

function randomCar() {
  return Math.random() < 0.5 ? redcar : yellowcar
}

function spawn() {
  const lane = 3 + Math.floor(Math.random() * 4)
  addSprite(lane, 0, randomCar())

  if (score > 10 && Math.random() < 0.3) {
    let other = 3 + Math.floor(Math.random() * 4)

    while (other == lane) {
      other = 3 + Math.floor(Math.random() * 4)
    }

    addSprite(other, 0, randomCar())
  }
}

function tick() {
  running = false

  if (!alive) return

  ticks++

  allCars().forEach(car => {
    if (car.y >= height() - 1) {
      car.remove()
      score++
    } else {
      car.y += 1
    }
  })

  if (ticks % 2 == 0) spawn()

  speed = Math.max(140, 450 - score * 6)

  if (hit()) {
    crash()
    return
  }

  drawScore()
  running = true
  setTimeout(tick, speed)
}

function steer(dx) {
  if (!alive) return

  const p = getFirst(player)
  const nextX = p.x + dx

  if (nextX < 3 || nextX > 6) return

  p.x = nextX

  if (hit()) crash()
}

function restart() {
  setMap(layout)
  score = 0
  ticks = 0
  speed = 450
  alive = true
  drawScore()

  if (!running) {
    running = true
    setTimeout(tick, speed)
  }
}

onInput("a", () => steer(-1))
onInput("d", () => steer(1))
onInput("j", () => steer(-1))
onInput("l", () => steer(1))
onInput("k", restart)

restart()
