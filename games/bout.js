/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Classic Breakout
@author: 
@tags: []
@addedOn: 2025-02-18
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
LLLLLLLLLLLLLLLL`]
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


setInterval(() => {
      let ballpos = { x: getFirst(ball).x, y: getFirst(ball).y }
  let playerrightpos = { x: getFirst(playerright).x, y: getFirst(playerright).y }
  let playerleftpos = { x: getFirst(playerleft).x, y: getFirst(playerleft).y }
  console.log(ballpos.y)
  console.log(((getTile((getFirst(ball).x + 1),(getFirst(ball).y - 1))).some(sprite => sprite.type === "B")) + "")


  //console.log(countspastbounce + "")
  
  if( balldir === "ne") {
    console.log(balldir)
    getFirst(ball).x += 1
    getFirst(ball).y -= 1
    tilestraveled += 1

  }
    if( balldir === "se") {
    console.log(balldir)
    getFirst(ball).x += 1
    getFirst(ball).y += 1
    tilestraveled += 1
  }
    
    if( balldir === "nw") {
    console.log(balldir)
    getFirst(ball).x -= 1
    getFirst(ball).y -= 1
    tilestraveled += 1
  }
    if( balldir === "sw") {
    console.log(balldir)
    getFirst(ball).x -= 1
    getFirst(ball).y += 1
    tilestraveled += 1
  }

  if(((getFirst(ball).y === getFirst(playerright).y  -1) || (getFirst(ball).y === getFirst(playerleft).y -1)) && ((getFirst(ball).x === getFirst(playerleft).x) || (getFirst(ball).x === getFirst(playerright).x )) && (balldir === "sw") && (countspastbounce >= 1)) {
    balldir = "nw"
    countspastbounce = 0
    getFirst(ball).y -= 0
    console.log("sw => nw")
  }

  if(((getFirst(ball).y === getFirst(playerright).y  -1) || (getFirst(ball).y === getFirst(playerleft).y -1)) && ((getFirst(ball).x === getFirst(playerleft).x) || (getFirst(ball).x === getFirst(playerright).x )) && (balldir === "se") && (countspastbounce >= 1)) {
    balldir = "ne"
    countspastbounce = 0
    getFirst(ball).y -= 0
    console.log("nw => sw")
  }
    countspastbounce += 1
  //väggar
  if((getFirst(ball).x === 1) && (balldir === "nw") && (countspastbounce >= 1)) {
    balldir = "ne"
    countspastbounce = 0
//    getFirst(ball).x += 1
    console.log("nw => ne")
  }
    if((getFirst(ball).x === 1) && (balldir === "sw")  && (countspastbounce >= 1)) {
    balldir = "se"
    countspastbounce = 0
//    getFirst(ball).x += 1
    console.log("sw => se")
    }
  if((getFirst(ball).x === 20) && (balldir === "ne") && (countspastbounce >= 1)) {
    balldir = "nw"
    countspastbounce = 0
    console.log("ne => nw")
  }
    if((getFirst(ball).x === 20) && (balldir === "se") && (countspastbounce >= 1)) {
    balldir = "sw"
    countspastbounce = 0
    console.log("se => sw")
    }
  //tak
    if((getFirst(ball).y === 0) && (balldir === "ne") && (countspastbounce >= 1)) {
    balldir = "se"
    countspastbounce = 0
    console.log("ne => se")
  }
    if((getFirst(ball).y === 0) && (balldir === "nw") && (countspastbounce >= 1)) {
    balldir = "sw"
    countspastbounce = 0
    console.log("nw => sw")
    }
      if(((getTile((getFirst(ball).x ),(getFirst(ball).y - 1))).some(sprite => sprite.type === "B")) && (balldir === "ne")) {
      console.log("bounce")
      clearTile((getFirst(ball).x), (getFirst(ball).y -1))
      balldir = "se"
      blockcleartimecount = tilestraveled
    }
        if(((getTile((getFirst(ball).x ),(getFirst(ball).y + 1))).some(sprite => sprite.type === "B")) && (balldir === "se")) {
      console.log("bounce")
      clearTile((getFirst(ball).x), (getFirst(ball).y +1))
      balldir = "ne"
      blockcleartimecount = tilestraveled
    }
        if(((getTile((getFirst(ball).x ),(getFirst(ball).y - 1))).some(sprite => sprite.type === "B")) && (balldir === "nw")) {
      console.log("bounce")
      clearTile((getFirst(ball).x), (getFirst(ball).y -1))
      balldir = "sw"
      blockcleartimecount = tilestraveled
    }
        if(((getTile((getFirst(ball).x ),(getFirst(ball).y + 1))).some(sprite => sprite.type === "B")) && (balldir === "sw")) {
      console.log("bounce")
      clearTile((getFirst(ball).x), (getFirst(ball).y +1))
      balldir = "nw"
      blockcleartimecount = tilestraveled
        }


  
      if(((getTile((getFirst(ball).x +1 ),(getFirst(ball).y))).some(sprite => sprite.type === "B")) && (balldir === "ne")) {
      console.log("bounce")
      clearTile((getFirst(ball).x + 1), (getFirst(ball).y))
      balldir = "nw"
      blockcleartimecount = tilestraveled
    }
        if(((getTile((getFirst(ball).x +1 ),(getFirst(ball).y))).some(sprite => sprite.type === "B")) && (balldir === "se")) {
      console.log("bounce")
      clearTile((getFirst(ball).x +1), (getFirst(ball).y))
      balldir = "sw"
      blockcleartimecount = tilestraveled
    }
        if(((getTile((getFirst(ball).x -1),(getFirst(ball).y ))).some(sprite => sprite.type === "B")) && (balldir === "nw")) {
      console.log("bounce")
      clearTile((getFirst(ball).x -1), (getFirst(ball).y))
      balldir = "ne"
      blockcleartimecount = tilestraveled
    }
        if(((getTile((getFirst(ball).x -1),(getFirst(ball).y))).some(sprite => sprite.type === "B")) && (balldir === "sw")) {
      console.log("bounce")
      clearTile((getFirst(ball).x -1), (getFirst(ball).y))
      balldir = "se"
      blockcleartimecount = tilestraveled
        }
    if ((getAll(block).length === 0) || (blockcleartimecount === tilestraveled + 50)) {
            balldir = "off"
      clearInterval()   
      addText("You won!", {
        x: 4,
        y: 5,
        color: color`5`
      })
    }
  if(ballpos.y === 17) {
      balldir = "off"
      clearInterval()   
      addText("You died!", {
        x: 4,
        y: 5,
        color: color`5`
        })
      }
  if(tilestraveled === 50) {
    loopdelay = 250  }
  if(tilestraveled === 100) {
    loopdelay = 200  }
  if(tilestraveled === 150) {
    loopdelay = 150  }
  if(tilestraveled === 200) {
    loopdelay = 100  }


}, loopdelay);

afterInput(() => {

})
