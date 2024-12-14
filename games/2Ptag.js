/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Game
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const player1 = "q"
const pl1_win = tune`
16000`
const pl2_win = tune`
16000`
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
................`]
)

setSolids([])

let level = 0
const levels = [
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
    turn = 2;
  }
})
onInput("w", () => {
  if (turn == 1) {
    getFirst(player).y -= 1
    turn = 2;
    if (pl1.x == pl2.x && pl1.y == pl2.y) {
      turn = 3
      playTune(pl1_win)
    }
  }
})
onInput("a", () => {
  if (turn == 1) {
    getFirst(player).x -= 1
    turn = 2;
    if (pl1.x == pl2.x && pl1.y == pl2.y) {
      turn = 3
      playTune(pl1_win)
    }
  }
})
onInput("d", () => {
  if (turn == 1) {
    getFirst(player).x += 1
    turn = 2;
    if (pl1.x == pl2.x && pl1.y == pl2.y) {
      turn = 3
      playTune(pl1_win)
    }
  }
})

onInput("k", () => {
  if (turn == 2) {
    getFirst(player1).y += 2
    turn = 1;
    if (pl1.x == pl2.x && pl1.y == pl2.y) {
      turn = 3
      playTune(pl2_win)
    }
  }
})
onInput("i", () => {
  if (turn == 2) {
    getFirst(player1).y -= 2
    turn = 1;
    if (pl1.x == pl2.x && pl1.y == pl2.y) {
      turn = 3
      playTune(pl2_win)
    }
  }
})
onInput("j", () => {
  if (turn == 2) {
    getFirst(player1).x -= 2
    turn = 1;
    if (pl1.x == pl2.x && pl1.y == pl2.y) {
      turn = 3
      playTune(pl2_win)
    }
  }
})
onInput("l", () => {
  if (turn == 2) {
    getFirst(player1).x += 2
    turn = 1;
    if (pl1.x == pl2.x && pl1.y == pl2.y) {
      turn = 3
      playTune(pl2_win)
    }
  }
})
afterInput(() => {

})