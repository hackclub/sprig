/*
@title: Dragon Duel
@author: giragon6
@tags: []
@addedOn: 2024-07-30
*/

// * SPRITE DEFINITIONS
const player1 = "1"
const player2 = "2"
const fireball1 = "*"
const fireball2 = "^" // mobile sprites

const background = "b"
const mountainBase = "m"
const mountainPeak = "p"
const cloud = "c" // background sprites

setLegend(
  [player1, bitmap`
................
...333..........
..39993....C....
...99993....39..
...3393....3333.
....93....33....
....993..33.....
.....99333......
......99333...3.
.......39993.393
......3..9993993
.....3.....93993
.3..3......93993
..33..........93
................
................`],
  [player2, bitmap`
................
...........DDD..
.....0....D444D.
...HD....D4444..
..DDDD....D4DD..
.....DD....D4...
......DD..D44...
.......DDD44....
..D...DDD44.....
.D4D.D444D......
.D44D444..D.....
.D44D4.....D....
.D44D4......D..D
.D4..........DD.
................
................`],
  [fireball1, bitmap`
................
................
................
................
.........33.....
......333993....
....333999993...
...33999666993..
..339966666693..
...33999666993..
....333999993...
......333993....
.........33.....
................
................
................`],
  [fireball2, bitmap`
................
................
................
................
.....55.........
....577555......
...577777555....
..57744477755...
..574444447755..
..57744477755...
...577777555....
....577555......
.....55.........
................
................
................`],
  [background, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [mountainBase, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [mountainPeak, bitmap`
................
................
................
................
................
.......00.......
......0220......
.....022220.....
....022LL220....
...0LLLLLLLL0...
...0LLLLLLLL0...
.00LLLLLLLLLL00.
0LLLLLLLLLLLLLL0
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [cloud, bitmap`
................
................
................
................
................
................
.......222......
......22222.....
.....2222222....
....2222222222..
...222222222222.
................
................
................
................
................`]
)
// SPRITE DEFINITIONS *

// * CONSTANTS
const GRAVITY = 0.2
const FLIGHT_STRENGTH = 0.5
const FIREBALL_SPEED = 0.5
// CONSTANTS *

// * MAP INITIALIZATION
setMap(map`
...c....c.
..........
.c..c..c..
..........
1..c..c..2
..........
c...c...c.
pppppppppp
mmmmmmmmmm`)
setBackground(background)
// MAP INITIALIZATION *

// * PHYSICS VARIABLES INITIALIZATION
let p1Velocity = 0
let p2Velocity = 0
let p1FireballVelocity = 0
let p2FireballVelocity = 0
// PHYSICS VARIABLES INITIALIZATION *

// * CONTROLS
onInput("w", () => { // player 1 moves up
  p1Velocity = -FLIGHT_STRENGTH
})

onInput("d", () => { // player 1 shoots fireball
  addSprite(getFirst(player1).x + 1, getFirst(player1).y, fireball1)
})

onInput("i", () => { // player 2 moves up
  p2Velocity = -FLIGHT_STRENGTH
})

onInput("j", () => { // player 2 shoots fireball
  addSprite(getFirst(player2).x - 1, getFirst(player2).y, fireball2)
})
// CONTROLS *

// * MAIN GAME LOOP
let game = {
  running: true,
  isRunning() { return this.running },
  end({ winner } = {}) {
    this.running = false
    addText(`${winner} WINS!`, { color: color`6` })
  }
}

setInterval(() => {
  if (game.isRunning()) {
    p1Velocity += GRAVITY
    p2Velocity += GRAVITY
    getFirst(player1).y += Math.floor(p1Velocity)
    getFirst(player2).y += Math.floor(p2Velocity) // physics updates

    getAll(fireball1).forEach((f) => {
      p2FireballVelocity = -FIREBALL_SPEED
      f.x -= Math.floor(p2FireballVelocity)
      if ((f.x + 1) == width()) {
        const p2InTile = (f.x == getFirst(player2).x) && (f.y == getFirst(player2).y)
        f.remove()
        p2InTile && game.end({ winner: "PLAYER ONE" })
      }
    }) // removes fireballs upon collision w/ right edge of screen, checks if p2 was hit

    getAll(fireball2).forEach((f) => {
      p2FireballVelocity = -FIREBALL_SPEED
      f.x += Math.floor(p2FireballVelocity)
      if (f.x == 0) {
        const p1InTile = (f.x == getFirst(player1).x) && (f.y == getFirst(player1).y)
        f.remove()
        p1InTile && game.end({ winner: "PLAYER TWO" })
      }
    }) // removes fireballs upon collision w/ left edge of screen, checks if p1 was hit
  }
}, 30)
// MAIN GAME LOOP *