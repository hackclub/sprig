/*
@title: 2Ptag
@author: Shadow8928
@tags: []
@addedOn: 2025-01-03
*/
var end = 0
const player = "p"
const player1 = "q"
const pl1_win = tune`
16000`
const pl2_win = tune`
16000`
const win = "w"
const win2 = "s"
var turn = 1;
setLegend(
  [player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`],
  [player1, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`],
  [win, bitmap`
................
................
................
................
.0.0.0.000.0...0
.0.0.0.0.0.00..0
.0.0.0.0.0.0.0.0
.0.0.0.0.0.0..00
.00000.000.0...0
................
.000.00.........
.0.0..0.........
.000..0.........
.0....0.........
.0....0.........
................`],
  [win2, bitmap`
................
................
................
................
.0.0.0.000.0...0
.0.0.0.0.0.00..0
.0.0.0.0.0.0.0.0
.0.0.0.0.0.0..00
.00000.000.0...0
................
.000..000.......
.0.0....0.......
.000..000.......
.0....0.0.......
.0....00000.....
................`]

)

setSolids([])

let level = 0
var levels = [
  map`
.....q
......
......
......
p.....`
]

setMap(levels[level])

setPushables({
  [player]: []
})
pl1 = getFirst(player)
pl2 = getFirst(player1)
onInput("s", () => {
  if (turn == 1) {
    pl1.y += 1
    if (pl1.x == pl2.x && pl1.y == pl2.y) {
      turn = 3
      playTune(pl1_win)
      end = 1
    }
  }
})
onInput("w", () => {
  if (turn == 1) {
    getFirst(player).y -= 1
    if (pl1.x == pl2.x && pl1.y == pl2.y) {
      turn = 3
      playTune(pl1_win)
      end = 1
    }
  }
})
onInput("a", () => {
  if (turn == 1) {
    getFirst(player).x -= 1
    if (pl1.x == pl2.x && pl1.y == pl2.y) {
      turn = 3
      playTune(pl1_win)
      end = 1
    }
  }
})
onInput("d", () => {
  if (turn == 1) {
    getFirst(player).x += 1
    if (pl1.x == pl2.x && pl1.y == pl2.y) {
      turn = 3
      playTune(pl1_win)
      end = 1
    }
  }
})

onInput("k", () => {
  if (turn == 1) {
    getFirst(player1).y += 1
    if (pl1.x == pl2.x && pl1.y == pl2.y) {
      turn = 3
      playTune(pl2_win)
      end = 2
    }
  }
})
onInput("i", () => {
  if (turn == 1) {
    getFirst(player1).y -= 1
    if (pl1.x == pl2.x && pl1.y == pl2.y) {
      playTune(pl2_win)
      end = 2
      turn = 3
    }
  }
})
onInput("j", () => {
  if (turn == 1) {
    getFirst(player1).x -= 1
    if (pl1.x == pl2.x && pl1.y == pl2.y) {
      playTune(pl2_win)
      end = 2
      turn = 3
    }
  }
})
onInput("l", () => {
  if (turn == 1) {
    getFirst(player1).x += 1
    if (pl1.x == pl2.x && pl1.y == pl2.y) {
      playTune(pl2_win)
      end = 2
      turn = 3
    }
  }
})
afterInput(() => {
  if (end == 1) {
    addText("Player 1 Wins!", { x: 5, y: 5, color: color`0` })
  } else if (end == 2) {
    addText("Player 2 Wins!", { x: 5, y: 5, color: color`0` })
  }
})
