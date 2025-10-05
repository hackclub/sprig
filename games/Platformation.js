/*
@title: Platformation
@author: temidaradev
@tags: [platformer, easy, annoying]
@addedOn: 2025-10-05

Collect all coins to progress through the game.
A long, annoying platformer journey.
*/

const player = "p"
const wall = "w"
const frame = "f"
const goal = "g"
const platform = "m"

let playerVelocityY = 0.0
let isJumping = false
let canJump = true

setLegend(
  [ player, bitmap`
................
.......6........
.......73.......
......LLLL......
.....L0LL0L.....
.....LLLLLL.....
......L11L......
......L00L......
.....LLLLLL.....
....LLLLLLLL....
...LLLLLLLLLL...
....LLLLLLLL....
.....LL..LL.....
.....LL..LL.....
....LL....LL....
................` ],
  [ wall, bitmap`
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
  [ frame, bitmap`
................
....66666666....
...6666666666...
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
...6666666666...
....66666666....
................
................` ],
  [ goal, bitmap`
................
.....444444.....
....44444444....
...4444444444...
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
...4444444444...
....44444444....
.....444444.....
................
................` ],
  [ platform, bitmap`
1111111111111111
1LLLLLLLLLLLLLL1
1111111111111111
................
................
................
................
................
................
................
................
................
................
................
................
................` ]
)

setSolids([player, wall, platform])

let level = 0
const levels = [
  // Level 1
  map`
wwwwwwwwwwwwwwwwwwww
w..................w
w..................w
w.f...f............w
wmmm.mmm...........w
w..........f...f...w
w.........mmm.mmm..w
w..................w
w.f................w
wmm....f...........w
w.....mm...........w
wp................gw
wwwwwwwwwwwwwwwwwwww`,

  // Level 2
  map`
wwwwwwwwwwwwwwwwwwww
w..................w
w..................w
w.............f....w
w..f.........mmm...w
w.mmm..............w
w......f...........w
w.....mmm..........w
w..........f.......w
w.........mmm......w
w..................w
wp................gw
wwwwwwwwwwwwwwwwwwww`,

  // Level 3
  map`
wwwwwwwwwwwwwwwwwwwww
w...................w
w...................w
w.f.f...............w
wmmmm...............w
w......f.f..........w
w.....mmmmm.........w
w..........f.f......w
w.........mmmmm.....w
w...................w
w...............f...w
wp.............mmm.gw
wwwwwwwwwwwwwwwwwwwww`,

  // Level 4
  map`
wwwwwwwwwwwwwwwwwwww
w..................w
w................f.w
w...............mm.w
w..............f...w
w.............mm...w
w............f.....w
w...........mm.....w
w..........f.......w
w.........mm.......w
w........f.........w
wp......mm........gw
wwwwwwwwwwwwwwwwwwww`,

  // Level 5
  map`
wwwwwwwwwwwwwwwwwwww
w..................w
w.f................w
wmm................w
w...f..............w
w..mmm.............w
w......f...........w
w.....mmm..........w
w.........f........w
w........mmm.......w
w............f.....w
wp..........mmm...gw
wwwwwwwwwwwwwwwwwwww`,

  // Level 6
  map`
wwwwwwwwwwwwwwwwwwww
w..................w
w.f.f.f............w
wmmmmmmm...........w
w..........f.f.f...w
w.........mmmmmmm..w
w..................w
w.f................w
wmm.....f..........w
w......mm..........w
w..........f.......w
wp........mmm.....gw
wwwwwwwwwwwwwwwwwwww`,

  // Level 7
  map`
wwwwwwwwwwwwwwwwwwww
w..................w
w..............f...w
w.............mmm..w
w.........f........w
w........mmm.......w
w....f.............w
w...mmm............w
wf.................w
wmm................w
w..................w
wp................gw
wwwwwwwwwwwwwwwwwwww`,

  // Level 8
  map`
wwwwwwwwwwwwwwwwwwww
w..................w
w.f..f..f..f.......w
wmmmmmmmmmmm.......w
w..............f.f.w
w.............mmmmmw
w..................w
w.f.f.......mm.....w
wmmmmmm............w
w..................w
w..............f...w
wp............mmm.gw
wwwwwwwwwwwwwwwwwwww`,

  // Level 9
  map`
wwwwwwwwwwwwwwwwwwww
w..................w
w..................w
w.f................w
wmm...f............w
w....mm............w
w.......f..........w
w......mm..........w
w..........f.......w
w.........mm.......w
w.............f....w
wp...........mm...gw
wwwwwwwwwwwwwwwwwwww`,

  // Level 10
  map`
wwwwwwwwwwwwwwwwwwww
w..................w
w.f.f.f.f..........w
wmmmmmmmm..........w
w..........f.f.f.f.w
w.........mmmmmmmmmw
w......mm..........w
w.f.f..............w
wmmmmm.............w
w.......f.f........w
w......mmmmm.......w
wp................gw
wwwwwwwwwwwwwwwwwwww`,

  // Level 11
  map`
wwwwwwwwwwwwwwwwwwww
w..................w
w.............f....w
w............mmm...w
w.........f........w
w........mmm.......w
w.....f............w
w....mmm...........w
w.f................w
wmmm...............w
w..................w
wp................gw
wwwwwwwwwwwwwwwwwwww`,

  // Level 12
  map`
wwwwwwwwwwwwwwwwwwww
w..................w
w.f.f.f.f.f........w
wmmmmmmmmmmm.......w
w............f.f.f.w
w.mmmmmmmmmmmmmmmmmw
w..................w
w.f.f.f............w
wmmmmmmmm..........w
w..........f.f.....w
w.........mmmmm....w
wp................gw
wwwwwwwwwwwwwwwwwwww`,

  // Level 13
  map`
wwwwwwwwwwwwwwwwwwww
w..................w
w..................w
w.f................w
wmm....f...........w
w.....mm...........w
w........f.........w
w.......mm.........w
w...........f......w
w..........mm......w
w..............f...w
wp............mm.g.w
wwwwwwwwwwwwwwwwwwww`,

  // Level 14
  map`
wwwwwwwwwwwwwwwwwwww
w..................w
w.f.f..............w
wmmmmm.............w
w......f.f.........w
w.....mmmmm........w
w...........f.f....w
w..........mmmmm...w
w.................ww
w.f...............ww
wmm.............wwww
wp................gw
wwwwwwwwwwwwwwwwwwww`,

  // Level 15
  map`
wwwwwwwwwwwwwwwwwwww
wp.................w
w..............f.f.w
w.............mmmmmw
w..........f.......w
w.........mmm......w
w......f...........w
w.....mmm..........w
w..f...............w
w.mmm..............w
wf.................w
wm................gw
wwwwwwwwwwwwwwwwwwww`
]

let framesCollected = 0
let totalFrames = 0

setMap(levels[level])

function countFrames() {
  totalFrames = getAll(frame).length
  framesCollected = 0
  playerVelocityY = 0
  isJumping = false
  canJump = true
}

countFrames()

setPushables({
  [player]: []
})

// Movement controls
onInput("a", () => {
  const p = getFirst(player)
  if (!p) return
  
  const nextTile = getTile(p.x - 1, p.y)
  const blocked = nextTile.some(t => t.type === wall)
  
  if (!blocked) {
    p.x -= 1
  }
})

onInput("d", () => {
  const p = getFirst(player)
  if (!p) return
  
  const nextTile = getTile(p.x + 1, p.y)
  const blocked = nextTile.some(t => t.type === wall)
  
  if (!blocked) {
    p.x += 1
  }
})

// Jump
onInput("w", () => {
  const p = getFirst(player)
  if (!p) return
  
  if (canJump && !isJumping) {
    playerVelocityY = -2.5
    isJumping = true
    canJump = false
    playTune(tune`
60: C4-60,
1940`)
  }
})

// Reset level
onInput("j", () => {
  setMap(levels[level])
  countFrames()
  addText("Reset!", { x: 7, y: 7, color: color`3` })
  setTimeout(() => clearText(), 800)
})

// Gravity and physics
setInterval(() => {
  const p = getFirst(player)
  if (!p) return
  
  // Apply gravity
  playerVelocityY += 0.5
  if (playerVelocityY > 3) playerVelocityY = 3
  
  // Move player vertically
  const moveY = Math.round(playerVelocityY)
  
  if (moveY > 0) {
    // Falling down
    for (let i = 0; i < moveY; i++) {
      const nextTile = getTile(p.x, p.y + 1)
      const blocked = nextTile.some(t => 
        t.type === wall || 
        t.type === platform
      )
      
      if (blocked) {
        playerVelocityY = 0
        isJumping = false
        canJump = true
        break
      } else {
        p.y += 1
      }
    }
  } else if (moveY < 0) {
    // Jumping up
    for (let i = 0; i < Math.abs(moveY); i++) {
      const nextTile = getTile(p.x, p.y - 1)
      const blocked = nextTile.some(t => 
        t.type === wall || 
        t.type === platform
      )
      
      if (blocked) {
        playerVelocityY = 0
        break
      } else {
        p.y -= 1
      }
    }
  }
  
  // Check if on ground
  const belowTile = getTile(p.x, p.y + 1)
  const onGround = belowTile.some(t => 
    t.type === wall || 
    t.type === platform
  )
  
  if (onGround && playerVelocityY >= 0) {
    canJump = true
    isJumping = false
  }
}, 100)

// Main game loop
afterInput(() => {
  const p = getFirst(player)
  if (!p) return
  
  clearText()
  
  // Collect frames
  const framesHere = getTile(p.x, p.y).filter(t => t.type === frame)
  if (framesHere.length > 0) {
    framesCollected += framesHere.length
    framesHere.forEach(f => f.remove())
    playTune(tune`
60: C5-60,
1940`)
  }
  
  // Display frame count and level
  addText(`Level ${level + 1}/${levels.length}`, { 
    x: 1,
    y: 0,
    color: color`4`
  })
  
  addText(`Frames: ${framesCollected}/${totalFrames}`, { 
    x: 1,
    y: 1,
    color: color`L`
  })
  
  // Goal check
  const goalHere = getTile(p.x, p.y).some(t => t.type === goal)
  if (goalHere) {
    if (framesCollected === totalFrames) {
      level++
      if (level < levels.length) {
        setMap(levels[level])
        countFrames()
        addText(`Level ${level + 1}!`, { x: 6, y: 7, color: color`4` })
        playTune(tune`
60: C4-60,
60: E4-60,
60: G4-60,
60: C5-60,
1760`)
        setTimeout(() => clearText(), 1200)
      } else {
        addText("platformation done", { x: 1, y: 5, color: color`L` })
        playTune(tune`
60: C5-60,
60: E5-60,
60: G5-60,
60: C6-60,
60: G5-60,
60: E5-60,
60: C5-60,
1580`)
        
        // Close game after 3 seconds
        setTimeout(() => {
          // Clear everything and show final message
          clearText()
          setMap(map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`)
          addText("platformation done", { x: 1, y: 5, color: color`L` })
        }, 3000)
      }
    } else {
      addText(`Need ${totalFrames - framesCollected} more!`, { 
        x: 3,
        y: 7,
        color: color`3`
      })
    }
  }
})