// fireball dodge

const dfireball = "d"
const rfireball = "r"
const lfireball = "l"
const player = "p"

let wspeed = 200
let score = 0
let ts = "" // text of score
let high = 0
let th = "" // text of highscore

const die = tune`
37.5: C4~37.5 + D4-37.5 + E4~37.5 + F4^37.5 + B5~37.5,
37.5: C4-37.5 + D4~37.5 + E4^37.5 + A5~37.5,
37.5: C4~37.5 + D4^37.5 + G5~37.5,
37.5: C4^37.5 + F5~37.5,
37.5: D5~37.5,
37.5: A4~37.5,
975`
const move = tune`
500: B5~500,
15500`
const jump = tune`
250: A5~250 + G5-250 + C4~250 + D4^250,
7750`
const bgtn = tune`
250: A4~250 + A5^250,
250,
250: A4~250,
250: B4~250,
250: C5~250,
250,
250: E5~250,
250,
250: D5~250,
250: D5/250,
250,
250: B4~250,
1000,
250: A4~250 + A5^250,
250,
250: A4~250,
250: B4~250,
250: C5~250,
250,
250: A4~250,
250,
250: B4~250,
250: B4/250,
1500`

setLegend(
  [ dfireball, bitmap`
.......33.......
......3333......
......3993......
.....339933.....
.....390093.....
....33900933....
....39900993....
...3396006933...
...3096006903...
..339060060933..
..399600006993..
..399660066993..
..339966669933..
...3399669933...
....33999933....
.....333333.....`],
  [ lfireball, bitmap`
................
................
...3333.........
..3399333.......
.3399990333.....
3399660999333...
399660666999333.
3966000000009933
3966000000009933
399660666999333.
3399660999333...
.3399990333.....
..3399333.......
...3333.........
................
................`],
  [ rfireball, bitmap`
................
................
.........3333...
.......3339933..
.....3330999933.
...3339990669933
.333999666066993
3399000000006693
3399000000006693
.333999666066993
...3339990669933
.....3330999933.
.......3339933..
.........3333...
................
................`],
  [ player, bitmap`
.....666666.....
.....606606.....
.....606606.....
.....666666.....
.....666666.....
.......00.......
......0000......
.....0.00.0.....
....0..00..0....
...0...00...0...
..0....00....0..
......0..0......
.....0....0.....
....0......0....
...0........0...
..0..........0..` ],
)

setSolids([])

let level = 0
const levels = [
  map`
...........
...d.......
..d........
........d..
....d......
...........
.....l.....
...r....d.l
r..........
...........
.....p.....`
]

setMap(levels[level])

setInterval (() => {
  // die calculator
  ls = getTile(getFirst(player).x, getFirst(player).y) // list of sprites
  if (ls.length > 1) {
    clearText()
    addText("YOU\nDIED!", 0, 0, color`3`)
    playTune(die)
    score = 0
    setMap(levels[0])
  }

  // dfireball section

  getAll("d").forEach(sprite => {
    sprite.y += 1;
    if (sprite.y === 10) {
    setTimeout(() => {
      let s = getTile(sprite.x, sprite.y)
      sprite.remove() // fireball die
      addSprite(Math.floor(Math.random() * 11), 0, dfireball)
    }, 100)
  }
  });

  // lfireball section
  getAll("l").forEach(sprite => {
    sprite.x -= 1;
    if (sprite.x === 0) {
    setTimeout(() => {
      let s = getTile(sprite.x, sprite.y)
      sprite.remove() // fireball die
      addSprite(10, Math.floor(Math.random() * 4) + 7, lfireball)
    }, 100)
  }
  });

  // rfireball section
  getAll("r").forEach(sprite => {
    sprite.x += 1;
    if (sprite.x === 10) {
    setTimeout(() => {
      let s = getTile(sprite.x, sprite.y)
      sprite.remove() // fireball die
      addSprite(0, Math.floor(Math.random() * 4) + 7, rfireball)
    }, 100)
  }
  });

  // score
  score += 0.1
  ts = score.toFixed(1).toString()
  clearText()
  addText(ts, 0, 6, color`0`)
  if (score > high) {
    high = score
  }
  
}, wspeed)

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
  playTune(move)
})

onInput("d", () => {
  getFirst(player).x += 1
  playTune(move)
})

onInput("a", () => {
  getFirst(player).x -= 1
  playTune(move)
})

onInput("j", () => {
  th = high.toFixed().toString()
  th = "highscore:\n" + th
  addText(th, 10, color`0`)
})

onInput("w", () => {
  getFirst(player).y -= 1
  playTune(jump)
  setTimeout(() => {
    getFirst(player).y += 1
  }, wspeed * 1.5)
})
afterInput(() => {
  ls = getTile(getFirst(player).x, getFirst(player).y) // list of sprites
  if (ls.length > 1) {
    clearText()
    addText("YOU\nDIED!", 0, 0, color`3`)
    playTune(die)
    score = 0
    setMap(levels[0])
  }
})