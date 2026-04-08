/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Classic Breakout
@author: Anonymous
@tags: []
@addedOn: 2025-02-18
@description: A classic Breakout-style game where you control a paddle to bounce a ball and break blocks. Use 'A' and 'D' keys to move the paddle left and right. Clear all the blocks to win!

todo:
kunna vinna
random spawn av boll?
flyta boll till mitten-ich
snabbare spel efter 20 studs?
*/

const playerright = "r"
const playerleft = "l"
const background = "b"
const block = "B"
const ball = "o"
const wall = "w"
const powerup = "p"
let countspastbounce = 0
let tilestraveled = 0
let loopdelay = 300
let blockcleartimecount = 0

  function generateRandomDirection(length) {
  const directions = ['nw', 'sw', 'ne', 'se'];
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * directions.length);
    randomString += directions[randomIndex];
  }

  return randomString;
}
let balldir  =  generateRandomDirection(1)
setLegend(
  [playerright, bitmap`
0000000000000000
2222222222222220
2222222222222220
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [playerleft, bitmap`
0000000000000000
0222222222222222
0222222222222222
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [background, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [block, bitmap`
................
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
................`],
  [ball, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000220000000
0000002222000000
0000022222200000
0000022222200000
0000002222000000
0000000220000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [wall, bitmap`
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
  [powerup, bitmap`
................
................
................
.....444444.....
....4......4....
....4..44..4....
....4..44..4....
....4......4....
.....444444.....
.......44.......
.......44.......
.......44.......
.......44.......
................
................
................`]
)

setSolids([playerright, playerleft, ball, block, wall])
setBackground([background])

let level = 0
const levels = [
  map`
w....................w
w....................w
w..BBBBBBBBBBBBBBBB..w
w..BBBBBBBBBBBBBBBB..w
w..BBBBBBBBBBBBBBBB..w
w..BBBBBBBBBBBBBBBB..w
w..BBBBBBBBBBBBBBBB..w
w....................w
w....................w
w....................w
w.........o..........w
w....................w
w....................w
w....................w
w....................w
w....................w
w.........lr.........w
w....................w`
]

setMap(levels[level])

//setPushables({
//  [playerright]: []
//})

onInput("d", () => {
  getFirst(playerright).x += 1
  getFirst(playerleft).x += 1
})

onInput("a", () => {
  getFirst(playerleft).x -= 1
  getFirst(playerright).x -= 1
})
getFirst(ball).dir = generateRandomDirection(1)
getFirst(ball).count = 0

setInterval(() => {
  if ((getAll(block).length === 0)) {
    clearInterval()
    addText("You won!", { x: 4, y: 5, color: color`5` })
    return
  }

  if (getAll(ball).length === 0) {
    clearInterval()
    addText("You died!", { x: 4, y: 5, color: color`5` })
    return
  }

  getAll(ball).forEach(b => {

    if (b.dir === "ne") {
      b.x += 1
      b.y -= 1
      tilestraveled += 1
    }
    if (b.dir === "se") {
      b.x += 1
      b.y += 1
      tilestraveled += 1
    }
    if (b.dir === "nw") {
      b.x -= 1
      b.y -= 1
      tilestraveled += 1
    }
    if (b.dir === "sw") {
      b.x -= 1
      b.y += 1
      tilestraveled += 1
    }

    if (((b.y === getFirst(playerright).y - 1) || (b.y === getFirst(playerleft).y - 1)) && 
        ((b.x === getFirst(playerleft).x) || (b.x === getFirst(playerright).x)) && 
        (b.dir === "sw") && (b.count >= 1)) {
      b.dir = "nw"
      b.count = 0
    }

    if (((b.y === getFirst(playerright).y - 1) || (b.y === getFirst(playerleft).y - 1)) && 
        ((b.x === getFirst(playerleft).x) || (b.x === getFirst(playerright).x)) && 
        (b.dir === "se") && (b.count >= 1)) {
      b.dir = "ne"
      b.count = 0
    }
    
    b.count += 1

    if ((b.x === 1) && (b.dir === "nw") && (b.count >= 1)) {
      b.dir = "ne"
      b.count = 0
    }
    if ((b.x === 1) && (b.dir === "sw") && (b.count >= 1)) {
      b.dir = "se"
      b.count = 0
    }
    if ((b.x === 20) && (b.dir === "ne") && (b.count >= 1)) {
      b.dir = "nw"
      b.count = 0
    }
    if ((b.x === 20) && (b.dir === "se") && (b.count >= 1)) {
      b.dir = "sw"
      b.count = 0
    }

    if ((b.y === 0) && (b.dir === "ne") && (b.count >= 1)) {
      b.dir = "se"
      b.count = 0
    }
    if ((b.y === 0) && (b.dir === "nw") && (b.count >= 1)) {
      b.dir = "sw"
      b.count = 0
    }

    if (b.y > 15) {
      b.remove()
    }

    if (((getTile((b.x), (b.y - 1))).some(sprite => sprite.type === "B")) && (b.dir === "ne")) {
      clearTile((b.x), (b.y - 1))
      if (Math.random() < 0.2) addSprite(b.x, b.y, powerup)
      b.dir = "se"
      blockcleartimecount = tilestraveled
    }
    if (((getTile((b.x), (b.y + 1))).some(sprite => sprite.type === "B")) && (b.dir === "se")) {
      clearTile((b.x), (b.y + 1))
      if (Math.random() < 0.2) addSprite(b.x, b.y, powerup)
      b.dir = "ne"
      blockcleartimecount = tilestraveled
    }
    if (((getTile((b.x), (b.y - 1))).some(sprite => sprite.type === "B")) && (b.dir === "nw")) {
      clearTile((b.x), (b.y - 1))
      if (Math.random() < 0.2) addSprite(b.x, b.y, powerup)
      b.dir = "sw"
      blockcleartimecount = tilestraveled
    }
    if (((getTile((b.x), (b.y + 1))).some(sprite => sprite.type === "B")) && (b.dir === "sw")) {
      clearTile((b.x), (b.y + 1))
      if (Math.random() < 0.2) addSprite(b.x, b.y, powerup)
      b.dir = "nw"
      blockcleartimecount = tilestraveled
    }

    if (((getTile((b.x + 1), (b.y))).some(sprite => sprite.type === "B")) && (b.dir === "ne")) {
      clearTile((b.x + 1), (b.y))
      if (Math.random() < 0.2) addSprite(b.x, b.y, powerup)
      b.dir = "nw"
      blockcleartimecount = tilestraveled
    }
    if (((getTile((b.x + 1), (b.y))).some(sprite => sprite.type === "B")) && (b.dir === "se")) {
      clearTile((b.x + 1), (b.y))
      if (Math.random() < 0.2) addSprite(b.x, b.y, powerup)
      b.dir = "sw"
      blockcleartimecount = tilestraveled
    }
    if (((getTile((b.x - 1), (b.y))).some(sprite => sprite.type === "B")) && (b.dir === "nw")) {
      clearTile((b.x - 1), (b.y))
      if (Math.random() < 0.2) addSprite(b.x, b.y, powerup)
      b.dir = "ne"
      blockcleartimecount = tilestraveled
    }
    if (((getTile((b.x - 1), (b.y))).some(sprite => sprite.type === "B")) && (b.dir === "sw")) {
      clearTile((b.x - 1), (b.y))
      if (Math.random() < 0.2) addSprite(b.x, b.y, powerup)
      b.dir = "se"
      blockcleartimecount = tilestraveled
    }
  })

  getAll(powerup).forEach(p => {
    p.y += 1
    if (p.y > 15) {
      p.remove()
    }

    const hitLeft = (p.x === getFirst(playerleft).x && p.y === getFirst(playerleft).y)
    const hitRight = (p.x === getFirst(playerright).x && p.y === getFirst(playerright).y)

    if (hitLeft || hitRight) {
      p.remove()
      
      if (Math.random() < 0.5) { 
        let rx = getFirst(playerright).x
        let ry = getFirst(playerright).y - 1
        let lx = getFirst(playerleft).x
        let ly = getFirst(playerleft).y - 1
        addSprite(rx, ry, ball)
        let newBall1 = getTile(rx, ry).find(s => s.type === ball)
        newBall1.dir = "nw"
        newBall1.count = 0
        addSprite(lx, ly, ball)
        let newBall2 = getTile(lx, ly).find(s => s.type === ball)
        newBall2.dir = "ne"
        newBall2.count = 0

        addText("+Balls!", { x: p.x, y: p.y - 1, color: color`3` })
      } else {
        loopdelay += 50
        addText("+Slow!", { x: p.x, y: p.y - 1, color: color`3` })
      }
    }
  })

  if (tilestraveled === 50) loopdelay = 250
  if (tilestraveled === 100) loopdelay = 200
  if (tilestraveled === 150) loopdelay = 150
  if (tilestraveled === 200) loopdelay = 100

}, loopdelay);

afterInput(() => {

})
