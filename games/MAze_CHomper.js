
const player      = "p"  
const wall        = "w"  
const hud         = "h"  
const dot         = "d"  
const power       = "o"  
const ghostRed    = "1"  
const ghostPink   = "2"  
const ghostCyan   = "3"  
const ghostScared = "s"  
const bg          = "b"  


const GHOST_KINDS = [ghostRed, ghostPink, ghostCyan]


setLegend(
  [ player, bitmap`
................
................
.....CCCCC......
....CCCCCCC.....
...CCCCFFCCC....
..CCCCCCCCCCC...
....6666666.....
...666666666....
...666066066....
...666666666....
...666666666....
...666633666....
....6666666.....
................
................
................` ],

  [ ghostRed, bitmap`
................
................
...3.......3....
....3..3..3.....
...333333333....
...3..333..3....
..33.0.3.0.33...
.333...3...333..
..33333333333...
...33.....33....
...3..2.2..3....
....3333333.....
.....33333......
................
................
................` ],

  [ ghostPink, bitmap`
................
................
...8.......8....
....8..8..8.....
...888888888....
...8..888..8....
..88.0.8.0.88...
.888...8...888..
..88888888888...
...88.....88....
...8..2.2..8....
....8888888.....
.....88888......
................
................
................` ],

  [ ghostCyan, bitmap`
................
................
...7.......7....
....7..7..7.....
...777777777....
...7..777..7....
..77.0.7.0.77...
.777...7...777..
..77777777777...
...77.....77....
...7..2.2..7....
....7777777.....
.....77777......
................
................
................` ],

  [ ghostScared, bitmap`
................
................
...9.......9....
....9..9..9.....
...999999999....
...9...9...9....
..99.9.9.9.99...
.999...9...999..
..99999999999...
...9..9.9..9....
...9.9.9.9.9....
....9999999.....
.....99999......
................
................
................` ],

  [ power, bitmap`
................
................
................
................
................
.....222222.....
....22222222....
....22222222....
....22222222....
....22222222....
.....222222.....
................
................
................
................
................` ],

  [ dot, bitmap`
................
................
................
................
................
................
......5555......
......5555......
......5555......
......5555......
................
................
................
................
................
................` ],

  [ wall, bitmap`
9999999999999999
9000000900000009
9000000999000009
9000000009000009
9990000000000009
9099000000000999
9000000000000909
9000000000009909
9090000000099009
9990000000000009
9000000000000009
9000000000000009
9000990000000999
9009900000000909
9009000009000009
9999999999999999` ],

  [ hud, bitmap`
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
0000000000000000` ],

  [ bg, bitmap`
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
0000000000000000` ]
)

setBackground(bg)               
setSolids([player, wall, hud])  


const sfxDot    = tune`
60: C6~60,
60`
const sfxPower  = tune`
100: C5~100,
100: E5~100,
100: G5~100,
100: C6~100`
const sfxGhost  = tune`
80: G5~80,
80: C6~80,
80: E6~80`
const sfxDie    = tune`
150: G4~150,
150: E4~150,
150: C4~150,
300: A3~300`
const sfxLevel  = tune`
120: C5~120,
120: E5~120,
120: G5~120,
240: C6~240`

const levels = [

  map`
hhhhhhhhhh
wp...w..1w
w.ww...w.w
w.w..w...w
w...ww.w.w
w.w....w.w
w.o.w...ow
wwwwwwwwww`,

 
  map`
hhhhhhhhhh
wp..w...2w
w.ww.w.w.w
w.o..w.w.w
w.ww...w.w
w..w.w...w
w1.....o.w
wwwwwwwwww`,


  map`
hhhhhhhhhh
w1.w...w3w
w.o.w.w..w
w.w...w.ww
w...w.p..w
w.ww.w.w.w
w2.o...o.w
wwwwwwwwww`
]


const GHOST_SPEED = [650, 520, 420]


let level = 0            
let score = 0
let lives = 3
let scared = 0           
let grace = 0            
let tickCount = 0        
let state = "play"       
let ticker = null        
let lastDir = { dx: 1, dy: 0 }   
let playerStart = { x: 1, y: 1 } 
let ghosts = []          


const DIRS = [
  { dx: 0, dy: -1 }, // up
  { dx: 0, dy: 1 },  // down
  { dx: -1, dy: 0 }, // left
  { dx: 1, dy: 0 }   // right
]




function isWall(x, y) {
  return getTile(x, y).some(s => s.type === wall || s.type === hud)
}


function drawHud() {
  clearText()
  addText("SCORE " + score, { x: 0, y: 0, color: color`6` })
  addText("LV " + (level + 1) + "/" + levels.length, { x: 13, y: 0, color: color`2` })
  addText("LIVES " + lives, { x: 0, y: 1, color: color`3` })
  if (scared > 0) {
    addText("POWER!", { x: 13, y: 1, color: color`5` })
  }
}


function renderGhosts() {
  for (const kind of [...GHOST_KINDS, ghostScared]) {
    getAll(kind).forEach(s => s.remove())
  }
  for (const g of ghosts) {
    let look = g.kind
    
    if (scared > 5 || (scared > 0 && scared % 2 === 0)) look = ghostScared
    addSprite(g.x, g.y, look)
  }
}


function pickByDistance(g, options, tx, ty, closer) {
  let best = options[0]
  let bestDist = closer ? Infinity : -Infinity
  for (const d of options) {
    const dist = Math.abs(g.x + d.dx - tx) + Math.abs(g.y + d.dy - ty)
    if (closer ? dist < bestDist : dist > bestDist) {
      bestDist = dist
      best = d
    }
  }
  return best
}

function moveGhost(g) {
  const p = getFirst(player)

  
  let options = DIRS.filter(d => !isWall(g.x + d.dx, g.y + d.dy))
  if (options.length === 0) return

  
  const noBack = options.filter(d => !(d.dx === -g.dx && d.dy === -g.dy))
  if (noBack.length > 0) options = noBack

  
  let choice
  const randomMove = options[Math.floor(Math.random() * options.length)]

  if (scared > 0) {
    
    choice = pickByDistance(g, options, p.x, p.y, false)
  } else if (g.kind === ghostRed) {
   
    choice = Math.random() < 0.15 ? randomMove : pickByDistance(g, options, p.x, p.y, true)
  } else if (g.kind === ghostPink) {
   
    const tx = p.x + lastDir.dx * 3
    const ty = p.y + lastDir.dy * 3
    choice = Math.random() < 0.15 ? randomMove : pickByDistance(g, options, tx, ty, true)
  } else {
   
    choice = Math.random() < 0.6 ? randomMove : pickByDistance(g, options, p.x, p.y, true)
  }

  
  g.dx = choice.dx
  g.dy = choice.dy
  g.x += choice.dx
  g.y += choice.dy
}


function tick() {
  if (state !== "play") return
  tickCount++

  
  if (grace > 0) {
    grace--
    return
  }

  if (scared > 0) scared--

  for (const g of ghosts) {
    
    if (scared > 0 && tickCount % 2 === 0) continue
    moveGhost(g)
  }

  checkCollisions()
  if (state === "play") {
    renderGhosts()
    drawHud()
  }
}


function loadLevel(i) {
  clearInterval(ticker)         
  setMap(levels[i])

 
  for (let y = 1; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      if (getTile(x, y).length === 0) addSprite(x, y, dot)
    }
  }

  
  const p = getFirst(player)
  playerStart = { x: p.x, y: p.y }

  
  ghosts = []
  for (const kind of GHOST_KINDS) {
    const s = getFirst(kind)
    if (s) ghosts.push({ kind: kind, x: s.x, y: s.y, sx: s.x, sy: s.y, dx: 0, dy: 0 })
  }

  scared = 0
  grace = 3
  tickCount = 0
  lastDir = { dx: 1, dy: 0 }
  state = "play"

  renderGhosts()
  drawHud()

  
  ticker = setInterval(tick, GHOST_SPEED[i])
}


function checkCollisions() {
  const p = getFirst(player)
  for (const g of ghosts) {
    if (g.x === p.x && g.y === p.y) {
      if (scared > 0) {
        
        score += 200
        g.x = g.sx
        g.y = g.sy
        g.dx = 0
        g.dy = 0
        playTune(sfxGhost)
      } else {
        loseLife()
        return
      }
    }
  }
}

function loseLife() {
  lives--
  playTune(sfxDie)

  if (lives <= 0) {
    endGame("over")
    return
  }

  
  const p = getFirst(player)
  p.x = playerStart.x
  p.y = playerStart.y
  for (const g of ghosts) {
    g.x = g.sx
    g.y = g.sy
    g.dx = 0
    g.dy = 0
  }
  scared = 0
  grace = 4
  renderGhosts()
  drawHud()
}


function endGame(result) {
  state = result
  clearInterval(ticker)
  renderGhosts()
  drawHud()
  if (result === "over") {
    addText("GAME OVER", { x: 5, y: 7, color: color`3` })
  } else {
    addText("YOU WIN!", { x: 6, y: 7, color: color`6` })
    playTune(sfxLevel)
  }
  addText("J = PLAY AGAIN", { x: 3, y: 9, color: color`2` })
}


function levelComplete() {
  state = "between"
  clearInterval(ticker)
  playTune(sfxLevel)
  drawHud()

  if (level === levels.length - 1) {
    endGame("win")
    return
  }

  addText("LEVEL CLEAR!", { x: 4, y: 7, color: color`6` })

  
  setTimeout(() => {
    level++
    loadLevel(level)
  }, 1500)
}


function movePlayer(dx, dy) {
  if (state !== "play") return

  const p = getFirst(player)
  const nx = p.x + dx
  const ny = p.y + dy

 
  if (isWall(nx, ny)) return

  p.x = nx
  p.y = ny
  lastDir = { dx: dx, dy: dy }   
  const here = getTile(nx, ny)

  
  for (const s of here) {
    if (s.type === dot) {
      s.remove()
      score += 10
      playTune(sfxDot)
    }
   
    if (s.type === power) {
      s.remove()
      score += 50
      scared = 18
      playTune(sfxPower)
    }
  }

  checkCollisions()
  if (state !== "play") return

  
  if (getAll(dot).length === 0) {
    levelComplete()
    return
  }

  renderGhosts()
  drawHud()
}

// Keyboard: W A S D to move
onInput("w", () => movePlayer(0, -1))
onInput("s", () => movePlayer(0, 1))
onInput("a", () => movePlayer(-1, 0))
onInput("d", () => movePlayer(1, 0))

// J restarts after the game ends
onInput("j", () => {
  if (state === "over" || state === "win") {
    level = 0
    score = 0
    lives = 3
    loadLevel(0)
  }
})


loadLevel(level)