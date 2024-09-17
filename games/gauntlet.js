/*
@title: gauntlet
@author: hex4
@tags: ["arcade", "endless"]
@addedOn: 2024-09-16
*/

const red = "*"
const blue = "+"
const bg = "0"
const bg1 = "1"
const bg2 = "2"
const bg3 = "3"
const bg4 = "4"
const wall = "#"
const rw = "R"
const bw = "B"
const aw = "?"

let nextTick
let nextScoreTick

let score = 0

let px = 8
let py = 4
let ps = red
let p
let speed = 500
let playing = true

let wo
let wt
let wx

setLegend(
  [red, bitmap`
................
.........222....
........23332...
......22333332..
....22339333932.
..2233333999332.
.23339933333332.
233392193333332.
233392193333332.
.23339933333332.
..2233333999332.
....22339333932.
......22333332..
........23332...
.........222....
................`],
  [blue, bitmap`
................
.........222....
........27772...
......22777772..
....22775777572.
..2277777555772.
.27775577777772.
277752157777772.
277752157777772.
.27775577777772.
..2277777555772.
....22775777572.
......22777772..
........27772...
.........222....
................`],
  [rw, bitmap`
3...3.3.3.3....3
3....3.3.3.3....
....3.3.3.3....3
3....3.3.3.3...3
3...3.3.3.3.....
.....3.3.3.3...3
3...3.3.3.3....3
3....3.3.3.3....
....3.3.3.3....3
3....3.3.3.3...3
3...3.3.3.3.....
.....3.3.3.3...3
3...3.3.3.3....3
3....3.3.3.3....
....3.3.3.3....3
3....3.3.3.3...3`],
  [bw, bitmap`
7...7.7.7.7....7
7....7.7.7.7....
....7.7.7.7....7
7....7.7.7.7...7
7...7.7.7.7.....
.....7.7.7.7...7
7...7.7.7.7....7
7....7.7.7.7....
....7.7.7.7....7
7....7.7.7.7...7
7...7.7.7.7.....
.....7.7.7.7...7
7...7.7.7.7....7
7....7.7.7.7....
....7.7.7.7....7
7....7.7.7.7...7`],
  [aw, bitmap`
1..............1
1...............
...............1
1..............1
1...............
...............1
1..............1
1...............
...............1
1..............1
1...............
...............1
1..............1
1...............
...............1
1..............1`],
  [wall, bitmap`
2222222222222222
2111111111111112
2121111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111212
2111111111111112
2222222222222222`],
  [bg, bitmap`
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
  [bg1, bitmap`
LLLLLLLLLLLLLLLL
L11LLLLLLLLLL11L
L1LLLLLLLLLLLL1L
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
L1LLLLLLLLLLLL1L
L11LLLLLLLLLL11L
LLLLLLLLLLLLLLLL`],
  [bg2, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1L1LLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLL1L1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [bg3, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL1LLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLL1LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLL1LLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [bg4, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLL1LLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL1LLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLL1LLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],


)

setSolids([])

let frame = 0
const frames = [
  map`
0000000000
0030400010
0000000000
0100002000
0000300040
0000000000
0020040300
0000000000`,
  map`
0000000000
0003040001
0000000000
0010000200
0000030004
0000000000
0002004030
0000000000`,
  map`
0000000000
1000304000
0000000000
0001000020
4000003000
0000000000
0000200403
0000000000`,
  map`
0000000000
0100030400
0000000000
0000100002
0400000300
0000000000
3000020040
0000000000`,
  map`
0000000000
0010003040
0000000000
2000010000
0040000030
0000000000
0300002004
0000000000`,
  map`
0000000000
0001000304
0000000000
0200001000
0004000003
0000000000
4030000200
0000000000`,
  map`
0000000000
4000100030
0000000000
0020000100
3000400000
0000000000
0403000020
0000000000`,
  map`
0000000000
0400010003
0000000000
0002000010
0300040000
0000000000
0040300002
0000000000`,
  map`
0000000000
3040001000
0000000000
0000200001
0030004000
0000000000
2004030000
0000000000`,
  map`
0000000000
0304000100
0000000000
1000020000
0003000400
0000000000
0200403000
0000000000`,
]

const over = map`
0300000000
0000300000
0000000020
0040000000
0000000000
0000200000
0300000040
0000000000`

// SFX
const move = tune`
69.28406466512702: C4/69.28406466512702,
2147.8060046189375`
const swap = tune`
69.76744186046511: D5^69.76744186046511 + G5-69.76744186046511,
69.76744186046511: D5^69.76744186046511 + A5-69.76744186046511,
2093.0232558139533`
const sad = tune`
285.7142857142857: A4^285.7142857142857,
285.7142857142857: F4^285.7142857142857,
285.7142857142857: D4^285.7142857142857,
285.7142857142857,
285.7142857142857: C4^285.7142857142857 + E4~285.7142857142857,
285.7142857142857: C4-285.7142857142857 + E4~285.7142857142857,
285.7142857142857: C4/285.7142857142857 + E4~285.7142857142857,
7142.857142857143`


setMap(frames[frame])


setPushables({
  [red]: [],
  [blue]: [],
})

onInput("w", () => {
  if (playing) {
    getFirst(ps).y -= 1
    playTune(move)
  }
})
onInput("s", () => {
  if (playing) {
    getFirst(ps).y += 1
    playTune(move)
  }
})

onInput("i", () => {
  if (!playing) {
    start()
  }
})


onInput("j", () => {
  if (playing) {
    {
      const { x, y } = getFirst(ps)
      px = x
      py = y
    }
    if (ps == red) {
      ps = blue
    } else if (ps == blue) {
      ps = red
    }


    addSprite(px, py, ps)
    if (ps == red) {
      getFirst(blue).remove()
    } else if (ps == blue) {
      getFirst(red).remove()
    }
    playTune(swap)
  }
})

afterInput(() => {
  if (collision()) {
    playing = false
    setMap(sad)
    clearText()
    playTune(sad)
    if (ps == red) {
      addText("GAME OVER :(", {
        x: 1,
        y: 1,
        color: color`3`
      })
      addText("FINAL SCORE", {
        x: 1,
        y: 5,
        color: color`3`
      })
      addText(score.toString(), {
        x: 1,
        y: 7,
        color: color`3`
      })
      addText("PRESS I TO RESTART", {
        x: 1,
        y: 14,
        color: color`3`
      })
    } else if (ps == blue) {
      addText("GAME OVER :(", {
        x: 1,
        y: 1,
        color: color`7`
      })
      addText("FINAL SCORE", {
        x: 1,
        y: 5,
        color: color`7`
      })
      addText(score.toString(), {
        x: 1,
        y: 7,
        color: color`7`
      })
      addText("PRESS I TO RESTART", {
        x: 1,
        y: 14,
        color: color`7`
      })
    }
  }
})


function start() {
  px = 8
  py = 4
  ps = red
  speed = 500
  playing = true
  score = 0

  addSprite(px, py, ps)
  p = getFirst(ps)
  makeWall()
  scoreTick()
  tick()


}

function makeWall() {
  wo = Math.floor(Math.random() * 8)
  const types = [rw, bw, aw]
  wt = types[Math.floor(Math.random() * types.length)];
  wx = -1

}

function collision() {

  let p = getFirst(ps)

  for (const tile of getAll(wall)) {
    if (tile.y == p.y && tile.x == p.x) {
      
      return true
    }
  }
  for (const tile of getAll(rw)) {
    if (tile.y == p.y && tile.x == p.x && ps == blue) {
      
      return true
    }
  }
  for (const tile of getAll(bw)) {
    if (tile.y == p.y && tile.x == p.x && ps == red) {
      
      return true
    }
  }
  return false
}

const tick = () => {




  {
    const { x, y } = getFirst(ps)
    px = x
    py = y
  }


  // Animate bg
  frame += 1;
  if (frame > 9) {
    frame = 0
  }
  setMap(frames[frame])

  addSprite(px, py, ps)


  if (speed > 175) {
    speed -= 3 // CHANGE ME BACK TO 3
  }

  // Draw walls
  for (let i = 0; i < 9; i++) {
    if (getTile(wx, i)[2] && getTile(wx, i)[2].type != ps) {
      getTile(wx, i)[2].remove()
    }
  }

  if (wx < 9) {
    wx++
  } else {
    makeWall()
  }
  if (wx > -1) {
    for (let i = 0; i < 8; i++) {
      if (i != wo) {
        addSprite(wx, i, wall)
      } else {
        addSprite(wx, i, wt)
      }
    }
  }

  
  
  if (collision()) {
    
    playTune(sad)
    playing = false
    setMap(over)
    clearText()

    if (ps == red) {
      addText("GAME OVER :(", {
        x: 1,
        y: 1,
        color: color`3`
      })
      addText("FINAL SCORE", {
        x: 1,
        y: 5,
        color: color`3`
      })
      addText(score.toString(), {
        x: 1,
        y: 7,
        color: color`3`
      })
      addText("PRESS I TO RESTART", {
        x: 1,
        y: 14,
        color: color`3`
      })
    } else if (ps == blue) {
      addText("GAME OVER :(", {
        x: 1,
        y: 1,
        color: color`7`
      })
      addText("FINAL SCORE", {
        x: 1,
        y: 5,
        color: color`7`
      })
      addText(score.toString(), {
        x: 1,
        y: 7,
        color: color`7`
      })
      addText("PRESS I TO RESTART", {
        x: 1,
        y: 14,
        color: color`7`
      })
    }
  }

  

  if (playing) {
    // Ticking logic
    lastTick = Date.now();
    clearTimeout(nextTick);
    nextTick = setTimeout(tick, speed);
  }


}

const scoreTick = () => {
  score += 50


  // Score display
  if (playing) {
    clearText()
    if (ps == red && playing) {
      addText(score.toString(), {
        x: 1,
        y: 1,
        color: color`3`
      })
    } else if (ps == blue && playing) {
      addText(score.toString(), {
        x: 1,
        y: 1,
        color: color`7`
      })
    }
  }
  if (playing) {
    // Ticking logic
    lastTick = Date.now();
    clearTimeout(nextScoreTick);
    nextScoreTick = setTimeout(scoreTick, 50);
  }
}
start()
