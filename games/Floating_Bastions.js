/*
@title: Floating Bastions
@author: M-Su
@description: Escape the factory using Parkour
@tags: ['platformer']
@addedOn: 2025-11-19
*/

const player = "p"
const wall = "w"
const platform = "f"
const goal = "g"
const background = "b"
const spike = "s"

setLegend(
  [ player, bitmap`
................
................
.......066......
......06666.....
.....066FF60....
.....0670266....
....066702F66...
...06666FFFF60..
..0066666666600.
..0000000000000.
.......0.0......
......0...0.....
......0.0.0.....
......0.0.0.....
.....00..00.....
.....00..00.....` ],
  [ wall, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0000000000000000
0222222222222220
0222222222222220
0222222222222220
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0000000000000000
0222222222222220
0222222222222220
0000000000000000` ],
  [ platform, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L1111111111LL10
0L1LLLLLLLL1LL10
0L1L000000L1LL10
0L1L0CCCCCL1LL10
0L1L0CCCCCL1LL10
0L1L0CCCCCL1LL10
0L1L000000L1LL10
0L1LLLLLLLL1LL10
0L1111111111LL10
0LLLLLLLLLLLLLL0
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ goal, bitmap`
................
................
.....666666.....
....66666666....
...6666666666...
...6666FF6666...
...666F66F666...
...666F66F666...
...666FFFF666...
...6666666666...
....66666666....
.....666666.....
................
................
................
................` ],
  [ spike, bitmap`
.......00.......
......0000......
.....00220......
....00000200....
...00LLLL220....
..00L000LL200...
.000L00LLL2000..
0000LLL0LLL20000
0002LLLL0L020000
.00220LLLL0200..
..00222220220...
...000222000....
....0000L000....
.....000000.....
.......000......
........0.......` ],
  [ background, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ]
)

setSolids([platform, wall])

let currentLevel = 0
const levels = [
  map`
........
.......g
..ffffff
........
........
........
...ff...
........
p.......
ffffffff`,
  
  map`
.......w...........
.......s...........
...................
...g...............
...fff...fff..ff...
....w....w.w.......
.................f.
.................w.
....s............f.
....f.......s....w.
....s..............
.........s.........
...s.sffff.....ff..
.p.f.ffwwf.ssssfwww
fffffffffffffffffff`,
  
  map`
wbfbwwwbfbbbbwww
bff.....fffffbww
ff....s.....fbbw
f...f.ffff..ffbw
f...f....f...ffb
fffff....f....ff
bfff.....fff....
bf........sff...
bffffffff...f..g
bbbbwff....sfssf
wwbbff....ffffff
bbbff....ffbbbbf
bfff...s.fbbbbbb
bf.....sffbbbwwb
bff.....fbbbbwbb
bbfff...fbbbwbwb
wwbbff.pfbbbbwbb
ffffffffffffffff`,

  map`
ffffffffffffffffff
f..f......s.....ff
f.wf......s.....ff
f.w.......s.....ff
f.w.......s.....ff
f..w......s......f
f..w......s......f
f..s..........ff.f
f.....ff..w......f
ff............s..f
..............s..f
....sssssssssss..f
....swwwwwwwwww..f
p...ww........w..f
ff............wg.f
f.............ws.f
f....ss....f.....f
f.....s..........f
f..............fff
f...fswssssssssssf
ffffffffffffffffff`,

  map`
fffffffffffffff
ff...f........f
f....f........f
.....f.........
.....f.....s...
.....f.........
.....f.......s.
.....s.....sff.
p.s........ff..
fff.....ww.ff..
.....s.....ff..
.....f......f.s
.....f......f.f
.....f......f..
.....f......f..
f....f......f..
f...ff......fsg
fffffffffffffff`,

  map`
ffffffffff...s....
fs.s............g.
f......f.......sfs
.......f.....s....
w......f.....s....
w......f..ff.s....
w......f..........
fff....f.........f
p......f.........s
fff....s..ff.....f
w....s...ff......s
w....f...........s
.................f
sssssssssssssssssf`,

  map`
f...................f.....
f...................fs....
fff.................fg....
...ff...............fs...s
.....ff.............f.....
.......f............f....f
.....ss.f......ffff.f....w
........fff.......f......w
.........sf.s.....fs.....w
p...sss..sf.ws..ssffffffff
fffffffs..f.ws............
.f..wwww..fffff.........ss
.f........f...f.ss........
.f.swsff..s...fffffffff...
.f.fffw..ss......ss...s...
.f.f..ssss..........s...ss
.f.fffffffff...ffffffff...
.f.............sf.........
.fs.s..s..s..ssf..........
.wwwwswwswwsfff...........
....fffffffff.............
ffffffffffffffffffffffffff`,
]

setMap(levels[currentLevel])
setBackground(background)

let velocityY = 0
let velocityX = 0
let onGround = false
let onWall = null
let jumpsRemaining = 2
let canJump = true
const gravity = 0.8
const jumpPower = -1.9
const wallJumpPowerX = 2
const wallJumpPowerY = -2.6
const moveSpeed = 1

let gameInterval = setInterval(() => {
  const p = getFirst(player)
  if (!p) return

  velocityY += gravity
  
  const wasOnGround = onGround
  onGround = false
  const belowTiles = getTile(p.x, p.y + 1)
  for (let tile of belowTiles) {
    if (tile.type === platform || tile.type === wall) {
      onGround = true
      if (velocityY > 0) {
        velocityY = 0
      }
      break
    }
  }
  
  if (onGround && !wasOnGround) {
    jumpsRemaining = 2
  }

  onWall = null
  if (!onGround && velocityY > 0) {
    const leftTiles = getTile(p.x - 1, p.y)
    const rightTiles = getTile(p.x + 1, p.y)
    
    for (let tile of leftTiles) {
      if (tile.type === wall) {
        onWall = 'left'
        velocityY *= 0.3
        jumpsRemaining = 2
        break
      }
    }
    
    if (!onWall) {
      for (let tile of rightTiles) {
        if (tile.type === wall) {
          onWall = 'right'
          velocityY *= 0.3
          jumpsRemaining = 2
          break
        }
      }
    }
  }

  if (velocityY > 0) {
    const steps = Math.ceil(velocityY)
    for (let i = 0; i < steps; i++) {
      const below = getTile(p.x, p.y + 1)
      let canMove = true
      for (let tile of below) {
        if (tile.type === platform || tile.type === wall) {
          canMove = false
          velocityY = 0
          break
        }
      }
      if (canMove && p.y < height() - 1) {
        p.y += 1
      } else {
        break
      }
    }
  } else if (velocityY < 0) {
    const steps = Math.ceil(Math.abs(velocityY))
    for (let i = 0; i < steps; i++) {
      const above = getTile(p.x, p.y - 1)
      let canMove = true
      for (let tile of above) {
        if (tile.type === platform || tile.type === wall) {
          canMove = false
          velocityY = 0
          break
        }
      }
      if (canMove && p.y > 0) {
        p.y -= 1
      } else {
        break
      }
    }
  }

  if (velocityX !== 0) {
    const direction = velocityX > 0 ? 1 : -1
    const nextTiles = getTile(p.x + direction, p.y)
    let canMove = true
    for (let tile of nextTiles) {
      if (tile.type === platform || tile.type === wall) {
        canMove = false
        velocityX = 0
        break
      }
    }
    if (canMove) {
      if ((direction > 0 && p.x < width() - 1) || (direction < 0 && p.x > 0)) {
        p.x += direction
      }
    }
    velocityX = 0
  }

  const goalTile = getTile(p.x, p.y)
  for (let tile of goalTile) {
    if (tile.type === goal) {
      clearInterval(gameInterval)
      currentLevel++
      
      if (currentLevel >= levels.length) {
        addText("All Levels", { x: 4, y: 6, color: color`6` })
        addText("Complete!", { x: 4, y: 7, color: color`6` })
        addText("Press i to", { x: 4, y: 9, color: color`2` })
        addText("restart", { x: 5, y: 10, color: color`2` })
      } else {
        addText("Level Clear!", { x: 3, y: 7, color: color`6` })
        addText("Press i for", { x: 3, y: 9, color: color`2` })
        addText("next level", { x: 3, y: 10, color: color`2` })
      }
    }
    if (tile.type === spike) {
      clearInterval(gameInterval)
      addText("You Died!", { x: 4, y: 7, color: color`3` })
      addText("Press i to", { x: 4, y: 9, color: color`2` })
      addText("retry", { x: 6, y: 10, color: color`2` })
    }
  }

}, 100)

onInput("w", () => {
  const p = getFirst(player)
  if (!p || !canJump) return
  
  if (onWall) {
    velocityY = wallJumpPowerY
    velocityX = onWall === 'left' ? wallJumpPowerX : -wallJumpPowerX
    jumpsRemaining = 2
    canJump = false
    setTimeout(() => { canJump = true }, 200)
  } else if (jumpsRemaining > 0) {
    velocityY = jumpPower
    jumpsRemaining--
    canJump = false
    setTimeout(() => { canJump = true }, 200)
  }
})

onInput("a", () => {
  const p = getFirst(player)
  if (!p) return
  velocityX = -moveSpeed
})

onInput("d", () => {
  const p = getFirst(player)
  if (!p) return
  velocityX = moveSpeed
})

onInput("i", () => {
  clearInterval(gameInterval)
  clearText()
  
  if (currentLevel >= levels.length) {
    currentLevel = 0
  }
  
  setMap(levels[currentLevel])
  velocityY = 0
  velocityX = 0
  onGround = false
  onWall = null
  jumpsRemaining = 2
  canJump = true
  
  gameInterval = setInterval(() => {
    const p = getFirst(player)
    if (!p) return
    
    velocityY += gravity
    
    const wasOnGround = onGround
    onGround = false
    const belowTiles = getTile(p.x, p.y + 1)
    for (let tile of belowTiles) {
      if (tile.type === platform || tile.type === wall) {
        onGround = true
        if (velocityY > 0) velocityY = 0
        break
      }
    }
    
    if (onGround && !wasOnGround) {
      jumpsRemaining = 2
    }
    
    onWall = null
    if (!onGround && velocityY > 0) {
      const leftTiles = getTile(p.x - 1, p.y)
      const rightTiles = getTile(p.x + 1, p.y)
      for (let tile of leftTiles) {
        if (tile.type === wall) {
          onWall = 'left'
          velocityY *= 0.3
          jumpsRemaining = 2
          break
        }
      }
      if (!onWall) {
        for (let tile of rightTiles) {
          if (tile.type === wall) {
            onWall = 'right'
            velocityY *= 0.3
            jumpsRemaining = 2
            break
          }
        }
      }
    }
    
    if (velocityY > 0) {
      const steps = Math.ceil(velocityY)
      for (let i = 0; i < steps; i++) {
        const below = getTile(p.x, p.y + 1)
        let canMove = true
        for (let tile of below) {
          if (tile.type === platform || tile.type === wall) {
            canMove = false
            velocityY = 0
            break
          }
        }
        if (canMove && p.y < height() - 1) p.y += 1
        else break
      }
    } else if (velocityY < 0) {
      const steps = Math.ceil(Math.abs(velocityY))
      for (let i = 0; i < steps; i++) {
        const above = getTile(p.x, p.y - 1)
        let canMove = true
        for (let tile of above) {
          if (tile.type === platform || tile.type === wall) {
            canMove = false
            velocityY = 0
            break
          }
        }
        if (canMove && p.y > 0) p.y -= 1
        else break
      }
    }
    
    if (velocityX !== 0) {
      const direction = velocityX > 0 ? 1 : -1
      const nextTiles = getTile(p.x + direction, p.y)
      let canMove = true
      for (let tile of nextTiles) {
        if (tile.type === platform || tile.type === wall) {
          canMove = false
          velocityX = 0
          break
        }
      }
      if (canMove) {
        if ((direction > 0 && p.x < width() - 1) || (direction < 0 && p.x > 0)) {
          p.x += direction
        }
      }
      velocityX = 0
    }
    
    const goalTile = getTile(p.x, p.y)
    for (let tile of goalTile) {
      if (tile.type === goal) {
        clearInterval(gameInterval)
        currentLevel++
        
        if (currentLevel >= levels.length) {
          addText("All Levels", { x: 4, y: 6, color: color`6` })
          addText("Complete!", { x: 4, y: 7, color: color`6` })
          addText("Press i to", { x: 4, y: 9, color: color`2` })
          addText("restart", { x: 5, y: 10, color: color`2` })
        } else {
          addText("Level Clear!", { x: 3, y: 7, color: color`6` })
          addText("Press i for", { x: 3, y: 9, color: color`2` })
          addText("next level", { x: 3, y: 10, color: color`2` })
        }
      }
      if (tile.type === spike) {
        clearInterval(gameInterval)
        addText("You Died!", { x: 4, y: 7, color: color`3` })
        addText("Press i to", { x: 4, y: 9, color: color`2` })
        addText("retry", { x: 6, y: 10, color: color`2` })
      }
    }
  }, 100)
  
  clearText()
  addText("Level " + (currentLevel + 1), { x: 1, y: 1, color: color`6` })
  addText("W: Jump x2", { x: 1, y: 2, color: color`2` })
  addText("A/D: Move", { x: 1, y: 3, color: color`2` })
})

addText("Level 1", { x: 1, y: 1, color: color`6` })
addText("W: Jump x2", { x: 1, y: 2, color: color`2` })
addText("A/D: Move", { x: 1, y: 3, color: color`2` })
