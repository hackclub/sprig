/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Office Eclipse
@description: - 
@author: uservin333
@tags: ['tag1', 'tag2']
@addedOn: 2026-10-28
*/

const player = "p"
const enemy = "e"
const brief = "b"
const diskK = "k"
const diskQ = "q"
const diskJ = "j"
const koma = "l"
const block = "x"

setLegend(
  [player, bitmap`
................
....00000000....
...0DDDDDDDD0...
..0DDDDDDDDDD0..
.0DDDDDDDDDDDD0.
.0DDD666DDDDDD0.
.0DD6606DDDDDD0.
.0DD66666DDDDD0.
.0DD86666668DD0.
..001112D21100..
..011112D21110..
..026122222620..
...00L22L2200...
....0LLL0LL0....
....09990999....
....0CCC0CCC....`],
  [enemy, bitmap`
................
................
....0L00000L....
...0LL2222LL0...
...0LL2222LL0...
...0L222666L0...
...0220261620...
...0222266620...
....02222260....
...0LL101L6L0...
..0LLL101LLLL0..
..022L111LL220..
...0211111120...
...0L11L11L0....
....0LLLLLLL0...
.....000000000..`],
  [brief, bitmap`
.00000000000000.
.0LLLLLLLLLLLL0.
.01111111111110.
.01777777777710.
.01777777777710.
.01777777777710.
.01777777777710.
.01111111111110.
.00000000000000.
......0LL0......
..000011110000..
.0LLLL0000LLLL0.
.01111111111110.
.01431000100010.
.01111111111110.
..000000000000..`],
  [diskK, bitmap`
................
................
................
................
................
...0L11111L0....
...0L11111LL0...
...0LLLLLLLL0...
...0L222222L0...
...0L200202L0...
...0L200202L0...
...0L200022L0...
...0L200202L0...
...0L222222L0...
...0000000000...
................`],
  [diskQ, bitmap`
................
................
................
................
................
...0L11111L0....
...0L11111LL0...
...0LLLLLLLL0...
...0L222222L0...
...0L200002L0...
...0L200202L0...
...0L200002L0...
...0L222202L0...
...0L222222L0...
...0000000000...
................`],
  [diskJ, bitmap`
................
................
................
................
................
...0L11111L0....
...0L11111LL0...
...0LLLLLLLL0...
...0L222222L0...
...0L200002L0...
...0L222002L0...
...0L202002L0...
...0L220002L0...
...0L222222L0...
...0000000000...
................`],
  [koma, bitmap`
................
.....000000000..
....0000000000..
....0000000000..
....000000000000
................
....0......00...
....0..00.0110..
....0.0...0110..
....0......000..
....0........0..
....0........0..
...0.........0..
..0........0....
.0000000000.....
................`],
  [block, bitmap`
0000000000000000
0211111111L21110
0111111111L11110
0LLLLL11LLLL1110
0211L2111L211110
0111L1111L111110
01LLLLL11LLLLLL0
0211111L21111110
0111111L11111110
0LLL1LLLLLLL1LL0
011L211111L21110
011L111111L11110
0LLLLL11LLLLLL10
01111L211111L210
01111L111111L110
0000000000000000`]
)

setSolids([block, player])

let status = 'play'
let level = 0
const levels = [
  map`
......be
.p.x....
q..x....
xxxxx.xx
k...x...
.......j`,
  map`
............
............
b..........b
............
............
............
............
............
l...........`
]

setMap(levels[level])

setPushables({
  [player]: []
})

onInput("s", () => {
  if (status == 'play') {
    getFirst(player).y += 1
    eMove()
  }
})
onInput("w", () => {
  if (status == 'play') {
    getFirst(player).y -= 1
    eMove()
  }
})
onInput("d", () => {
  if (status == 'play') {
    getFirst(player).x += 1
    eMove()
  }
})
onInput("a", () => {
  if (status == 'play') {
    getFirst(player).x -= 1
    eMove()
  }
})
onInput("j", () => {
  if (status != 'play') {
    if (status == 'fin') {
      start()
    } else {
      setMap(levels[0])
      clearText()
      status = 'play'
      addText("press wasd", { y: 14, color: 0 })
    }
  }
})

let lastScore = 0
let lastStage = 0
afterInput(() => {
  if (status == 'play') {
    if (getFirst(enemy).x == getFirst(player).x && getFirst(enemy).y == getFirst(player).y) {
      clearText()
      lastScore = score
      lastStage = stage
      addText("You Lose", { y: 4, color: 0 })
      addText(`score: ${lastScore}`, { y: 8, color: 0 })
      addText(`stage ${lastStage}`, { y: 6, color: 0 })
      addText("j to retry", { y: 12, color: 0 })
      setMap(levels[1])
      score = 0
      stage = 1
      status = 'dead'
    }
  }
})

let score = 0
let disks = 1
let obj = 1
const dObj = [".", "K", "Q", "J"]
let enemyY = 0
let stage = 1

function eMove() {
  if (getFirst(enemy).x == 0) {
    getFirst(enemy).x = 7
    getFirst(enemy).y += 1
    enemyY += 1
    if (enemyY == 6) {
      getFirst(enemy).y = 0
      enemyY = 0
    }
  } else {
    getFirst(enemy).x -= 1
  }
  if (getFirst(brief).x == getFirst(player).x && getFirst(brief).y == getFirst(player).y) {
    if (disks == obj) {
      score += 1
      disks = 0
      nextObj()
      let x = Math.floor
    }
  }
  if (getFirst(brief).x == getFirst(enemy).x && getFirst(brief).y == getFirst(enemy).y) {
    if (score > 0) {
      if (Math.round(Math.random() * 100) < score * 7) {
        score -= 1
      }
    }
  }
  check()
  clearText()
  addText(`done: ${score}/${5+5*stage}`, { y: 1, x: 0, color: 0 })
  addText(`hand: ${dObj[disks]}`, { y: 3, x: 0, color: 0 })
  addText(`need: ${dObj[obj]}`, { y: 5, x: 0, color: 0 })
  addText(`stage ${stage}`, { y: 14, x: 0, color: 0 })
  if (score == 5+5*stage) {
    finish()
  }
}

function nextObj() {
  obj = Math.round(Math.random()) + Math.round(Math.random()) + Math.round(Math.random())
  if (obj == 0) { obj = 2 }
}

function check() {
  if (getFirst(diskK).x == getFirst(player).x && getFirst(diskK).y == getFirst(player).y) {
    disks = 1
  }
  if (getFirst(diskQ).x == getFirst(player).x && getFirst(diskQ).y == getFirst(player).y) {
    disks = 2
  }
  if (getFirst(diskJ).x == getFirst(player).x && getFirst(diskJ).y == getFirst(player).y) {
    disks = 3
  }
}

function start() {
  clearText()
  score = 0
  setMap(levels[1])
  addText("Office Eclipse", { y: 4, color: 0 })
  addText("j to start", { y: 10, color: 0 })
  addText(`stage ${stage}`, { y: 12, color: 0 })
  status = 'menu'
}
start()

function finish() {
  clearText()
  addText("You Win", { y: 4, color: 0 })
  addText(`Perfect`, { y: 6, color: 7 })
  addText("j to menu", { y: 12, color: 0 })
  setMap(levels[1])
  status = 'fin'
  stage += 1
}