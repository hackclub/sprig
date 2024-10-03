/*
@title: Castle_Drop
@author: aISaidJak
@tags: ['action']
@addedOn: 2024-05-14
@img: ""
*/
const player = "p"
const window = "w"
const spike = "s"
const pad = "e"
const background = "b"
let health = 3
let healthtext = health

var loop = 1

setLegend(
  [spike, bitmap`
....22222222....
....22222222....
..223333333322..
..223333333322..
2233CCCCCCCC3322
2233CCCCCCCC3322
2233CC0000CC3322
2233CC0000CC3322
2233CC0000CC3322
2233CC0000CC3322
2233CCCCCCCC3322
2233CCCCCCCC3322
..223333333322..
..223333333322..
....22222222....
....22222222....`],
  [player, bitmap`
....77777777....
....77777777....
..772222222277..
..772222222277..
7722002222002277
7722002222002277
7722002222002277
7722002222002277
7722222222222277
7722222222222277
7722332222222277
7722332222222277
..772233333377..
..772233333377..
....77777777....
....77777777....`],
  [pad, bitmap`
....44444444....
....44444444....
..444444444444..
..444444444444..
4444DDDDDDDD4444
4444DDDDDDDD4444
4444DD2222DD4444
4444DD2222DD4444
4444DD2222DD4444
4444DD2222DD4444
4444DDDDDDDD4444
4444DDDDDDDD4444
..444444444444..
..444444444444..
....44444444....
....44444444....`],
  [background, bitmap`
0000000000000000
0000000000000000
1111111111111100
1111111111111100
11LLLLLLLLLL1100
11LLLLLLLLLL1100
1111111111111100
1111111111111100
0000000000000000
0000000000000000
1111110011111111
1111110011111111
LLLL110011LLLLLL
LLLL110011LLLLLL
1111110011111111
1111110011111111`],
)

setBackground(background)

const level = map`
....................
....................
....................
....................
.........p..........
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`
setMap(level)

setSolids([player])

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

function moveobjects() {
  let spikes = getAll(spike)
  for (let spikepos = 0; spikepos < spikes.length; spikepos++) {
    if (spikes[spikepos].y == 0) {
      spikes[spikepos].remove()
    }
    spikes[spikepos].y -= 1
  }
  let pads = getAll(pad)
  for (let padpos = 0; padpos < pads.length; padpos++) {
    if (pads[padpos].y == 0) {
      pads[padpos].remove()
    }
    pads[padpos].y -= 1
  }
}

function spawnobjects() {
  let spikegoal = 4
  for (let spikecount = 1; spikecount <= spikegoal; spikecount++) {
    let x = Math.floor(Math.random() * 20)
    let y = 15
    addSprite(x, y, spike)
  }
  let padgoal = 1
  for (let padcount = 1; padcount <= padgoal; padcount++) {
    let x = Math.floor(Math.random() * 20)
    let y = 15
    addSprite(x, y, pad)
  }
}

function checkDeath() {
  let spikes = getAll(spike)
  let p = getFirst(player)
  for (let spikepos = 0; spikepos < spikes.length; spikepos++) {
    if (spikes[spikepos].x == p.x && spikes[spikepos].y == p.y) {
      return true
    }
  }
  return false
}

function checkHealth() {
  let pads = getAll(pad)
  let p = getFirst(player)
  for (let padpos = 0; padpos < pads.length; padpos++) {
    if (pads[padpos].x == p.x && pads[padpos].y == p.y) {
      return true
    }
  }
  return false
}


var gameLoop = setInterval(() => {
  let healthstring = healthtext.toString()
  addText(healthstring + " LIVES", {
    x: 0,
    y: 0,
    color: color`6`
  })
  checkDeath()
  if (checkDeath()) {
    if (health == 1) {
      clearInterval(gameLoop)
      gameRunning = false
      addText("0 LIVES", {
        x: 0,
        y: 0,
        color: color`6`
      })
      addText("Game Over!", {
        x: 5,
        y: 6,
        color: color`6`
      })
    } else {
      health--
      healthtext--
    }
  }
  spawnobjects()
  moveobjects()
  checkHealth()
  if (checkHealth()) {
    health++
    healthtext++
    if (health >= 9) {
      let health = 9
      let healthtext = 9
    }
  }
}, 150)
