/*
@title: shark_dodger
@author: angelgames
@tags: ['action']
@addedOn: 2024-05-23
@img: ""
*/
const player = "p"
const harpoon = "h"
const capturer = "c"
const fish = "f"
const background = "b"
let health = 3
let healthtext = health

var loop = 1

setLegend(
  [harpoon, bitmap`
.......00.......
.......00.......
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.....LLLLLL.....
...LL..LL..LL...
...L...LL...L...
...L...LL...L...
...L...LL...L...
...L...LL...L...`],
  [player, bitmap`
................
................
....1111........
...1111111.....1
..1111111111..11
.1101L1L1L111.1.
11011L1L1L11111.
11111L1L1L1L111.
22111L1L1L1L111.
111L1L1L1L1L111.
111L1L1L1L11111.
.11L1L111111..11
..11111111.....1
....1111........
................
................`],
  [fish, bitmap`
................
................
....66666.......
..666466666.....
.66644466666....
6066666466666...
60664444644466.6
666646666664666.
.4466666644446.6
...664444666....
....646666......
................
................
................
................
................`],
  [background, bitmap`
5555555555555555
5555777775555555
5757755555577775
5777555755575555
5555577755577555
7557755577557555
7577555755557555
7775557755575555
7555777777755555
5755555557777755
5755557744555777
5577777754755555
5575555744777555
5777777457757755
7577557477777777
5555555455557555`],
  [capturer, bitmap`
.......2........
.......222......
.......222......
.......C2.......
.......C2.......
.......C........
..CFF..C...FCCC.
FFFCCCCCCFCCCFFC
CCCCCCCCCFCFCFFC
CCCFCCCCCCCCFFCC
.CCFFCFFFCCFFCC.
..CCCCCCCCCCCC..
................
................
................
................`]
)

setBackground(background)

const level = map`
cccccccccccccccccccc
....................
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
....................`
setMap(level)

setSolids([player])

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

function moveobjects() {
  let harpoons = getAll(harpoon)
  for (let harpoonpos = 0; harpoonpos < harpoons.length; harpoonpos++) {
    if (harpoons[harpoonpos].y == 15) {
      harpoons[harpoonpos].remove()
    }
    harpoons[harpoonpos].y += 1
  }
  let fishs = getAll(fish)
  for (let fishpos = 0; fishpos < fishs.length; fishpos++) {
    if (fishs[fishpos].y == 15) {
      fishs[fishpos].remove()
    }
    fishs[fishpos].y += 1
  }
}

function spawnobjects() {
  let harpoongoal = 4
  for (let harpooncount = 1; harpooncount <= harpoongoal; harpooncount++) {
    let x = Math.floor(Math.random() * 20)
    let y = 0
    addSprite(x, y, harpoon)
  }
  let fishgoal = 1
  for (let fishcount = 1; fishcount <= fishgoal; fishcount++) {
    let x = Math.floor(Math.random() * 20)
    let y = 0
    addSprite(x, y, fish)
  }
}
function checkDeath() {
  let harpoons = getAll(harpoon)
  let capturers = getAll(capturer)
  let p = getFirst(player)
  for (let harpoonpos = 0; harpoonpos < harpoons.length; harpoonpos++) {
    if (harpoons[harpoonpos].x == p.x && harpoons[harpoonpos].y == p.y) {
      return true
    }
   for (let capturerpos = 1; capturerpos < capturers.length; capturerpos++) 
    for(let capturers = 15; capturerpos < capturers.length; capturerpos++) {
    if (capturers[capturerpos].x == p.x && capturers[capturerpos].y == p.y) {
      return true
    }
  }
}
}

function checkHealth() {
  let fishs = getAll(fish)
  let p = getFirst(player)
  for (let fishpos = 0; fishpos < fishs.length; fishpos++) {
    if (fishs[fishpos].x == p.x && fishs[fishpos].y == p.y) {
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
      addText("You were hunted!", {
        x: 3,
        y: 7,
        color: color`3`
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
