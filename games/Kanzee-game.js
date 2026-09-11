//@title: Kanzee game
//@author: Kanzee
//@description: A game where you will have to escape the house with parkour
//@tags: Run away from the bad guy
//@addedOn: 2026-09-11                                           

const player = "p"
const Badguy = "e"
const whiteblock = "w"
const blueblock = "b"
const goldblock = "g"
const sky = "s"
const cloud = "c"
const brown ="o"
const green ="d"
const orange ="l"
const bullet = "a"
const laserBlock = "1"
const laser = "2"

setLegend(
  [ player, bitmap`
................
................
................
.....CCCC.......
.....C020.......
.....CCCC.......
...00000000.....
...0..00..0.....
...0..00..0.....
..00..00..00....
......00........
......00........
......00........
...00000000.....
................
................`],
  [ Badguy, bitmap`
.....LLLLL......
.....LLLLL......
.....20202......
.....22222......
....5232325.....
.....52325......
....5522255.....
..55555L53555...
..55555L35555...
..55555533555...
..22555533522...
..C255555352C...
....5555555.....
.....55.55......
.....58.85......
....888.888.....`],
  [ whiteblock, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [ blueblock, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ goldblock, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [ sky, bitmap`
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
  [ cloud, bitmap`
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
1111111111111111`],
  [ brown, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [ green, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ orange, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [ bullet, bitmap`
................
................
................
................
................
................
.......666......
.....666666.....
....66666666....
.....666666.....
.......666......
................
................
................
................
................`],
  [ laserBlock, bitmap`
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
1111111111111111` ],
  [ laser, bitmap`
................
................
................
................
................
................
3333333333333333
3333333333333333
3333333333333333
................
................
................
................
................
................
................` ]
)

const solidTiles = [goldblock]
setSolids([player, ...solidTiles])

let vx = 0
let vy = 0

const GRAVITY = 1
const MAX_FALL = 1      
const JUMP_POWER = -2.5  
const MOVE_SPEED = 1

let leftHeld = false
let rightHeld = false

const levels = [
  map`
sccsssssccsssssccssssccssscc
ccccssccccccssccccssccccsccc
sccssssccccssssccssssccssscc
ssssssssssssssssssssssssssss
ssssssssssssssssssssssssssss
sssssssssssssggsssssssssssss
ssssssssssssggggssssssssssss
sssssssssssggggggsssssssssss
ssssssssssggggggggssssssssss
sssssssssggggggggggsssssssss
ssssssssggggggggggggssssssss
sssdsssggggggggggggggsssdsss
ssdddsswwwwwwwwwwwwwwssdddss
sdddddswwwwwwwwwwwwwwsddddds
sdddddswwwwwwwwwwwwwwsddddds
ssdodsswwwwwwwwwwwwwwsddodds
sssossswwwwwwwwwwwwwwsssosss
sssossswwwwllllllwwwwsssosss
sssossswwwwllllllwwwwsssosss
sssossswwwwlollolwwwwsssosss
sssossswwwwllllllwwwwsssosss
sssossswwwwllllllwwwwsssosss`,

  map`
.......................
.......................
.......................
.................g..g.l
.......................
..............g........
.......................
...........g...........
.......................
ssss....g..............
sbbs.........g.........
s..s...................
s..s.....g.............
sbbs........g..........
ssss...................
.......g..g...........o
.....................oo
.....g.............oooo
p..g........e......oooo`,



  map`
.......................
.......................
l...g......g...........
..g...........g........
......g................
.................g.....
.........g..g..........
..................g....
...............g.......
.......................
......g..g...g.........
...g...................
...........g...........
.g...g.................
.......................
...g...................
g......................
....g..................
p.........e............`,

  
  map`
.......................
.......................
.......................
.....sssss.............
....s..........ssss....
....s..........s.......
....s..........s.......
....s..ssss....s.sss...
....s.....s....s...s...
....s.....s....s...s...
...sssssss....ssssss...
.......................
......ssssss.sssss.....
......s.........ss.....
......s........s.......
......ssssss.ss........
......s......sssss.....
......ssssss...........
.......................`,

  
  map`
.s...s............ssssss.......................
.s...s............s...ss...s.....ssss..........
.s...s............s...ss...ssss.ss...s.........
.s...s............s...ss...s..s.s...ss.........
.s...s............s...ss...s....sssss..........
.s...s............s...ss...s....s..............
.s...s............ss.ss.s..s....s..............
..sss..............sss..ss.s....sssss..........
...............................................
.sss............s..............................
.s.ss..ssss....ss..sss...................sssss.
.s..s..s.......ss..s.ss..............sss...s...
.s..s..s......ss.s.s..s.ss.ss.ssss...s.s...s...
.s..s..ssss...s..s.s..s.ss.ss.s......s.ss..s...
.s..s..s.....sssss.s.s..sssss.ssss..ss..s..s...
.s..s..s.....s...s.sss.s..s.s.s.....sssss..s...
.sss...ssss..s.........s....s.s.....s...s..s...
.......................s....s.ssss..s...s..s...
............................s..................`
]
let level = 0
setMap(levels[level])
addSprite(0, (height() - 1), player)

onInput("a", () => {
  leftHeld = true
  rightHeld = false
})

onInput("d", () => {
  rightHeld = true
  leftHeld = false
})

onInput("w", () => {
  const p = getFirst(player)
  if (!p) return

  if (isGrounded(p)) {
    vy = JUMP_POWER
  }
})
afterInput(() => {
  const playerOnOrange = tilesWith(player, orange).length;
  if (playerOnOrange == 1) {
    level = level + 1;

    const currentLevel = levels[level];

    setMap(currentLevel);
  }
});
function isSolidAt(x, y) {
  if (x < 0 || x >= width() || y < 0 || y >= height()) return true

  const tile = getTile(x, y)

  for (const thing of tile) {
    if (solidTiles.includes(thing.type)) {
      return true
    }
  }

  return false
}

function isGrounded(sprite) {
  return isSolidAt(sprite.x, sprite.y + 1)
}

function isStanding(sprite) {

  if (sprite.y >= height() - 1) return true

  const below = getTile(sprite.x, sprite.y + 1)


  return below.some(t =>
    t.type === blueblock ||
    t.type === goldblock
  )
}


const LEVEL_1 = 1
const LEVEL_2 = 2
const WIN_SCREEN = 3
const DEATH_SCREEN = 4

let gameOver = false

let laserTimer = 0
let laserRows = 0

const LASER_RISE_DELAY = 25
const LASER_START_LEVEL = 1


function resetLasers() {
  laserTimer = 0
  laserRows = 0
}

function loadLevel(newLevel) {
  level = newLevel
  setMap(levels[level])

  vx = 0
  vy = 0

  resetLasers()
}

function playerDies() {
  gameOver = true
  level = DEATH_SCREEN
  setMap(levels[DEATH_SCREEN])
}

function playerWins() {
  gameOver = true
  level = WIN_SCREEN
  setMap(levels[WIN_SCREEN])
}

setInterval(() => {
  const p = getFirst(player)
  if (!p) return

  vx = 0

  if (leftHeld) vx = -MOVE_SPEED
  if (rightHeld) vx = MOVE_SPEED

  // Gravity
  vy += GRAVITY

  if (vy > MAX_FALL) {
    vy = MAX_FALL
  }

  // Horizontal movement
  if (vx > 0) {
    for (let i = 0; i < vx; i++) {
      if (!isSolidAt(p.x + 1, p.y)) {
        p.x += 1
      }
    }
  } else if (vx < 0) {
    for (let i = 0; i < -vx; i++) {
      if (!isSolidAt(p.x - 1, p.y)) {
        p.x -= 1
      }
    }
  }

  // Vertical movement
  if (vy > 0) {
    for (let i = 0; i < vy; i++) {
      if (!isSolidAt(p.x, p.y + 1)) {
        p.y += 1
      } else {
        vy = 0
        break
      }
    }
  } else if (vy < 0) {
    for (let i = 0; i < -vy; i++) {
      if (!isSolidAt(p.x, p.y - 1)) {
        p.y -= 1
      } else {
        vy = 0
        break
      }
    }
  }

  leftHeld = false
  rightHeld = false

  // LEVEL CHANGE

  if (tilesWith(player, orange).length > 0) {

    if (level === 0) {
      loadLevel(LEVEL_1)
      return
    }

    if (level === LEVEL_1) {
      loadLevel(LEVEL_2)
      return
    }

    if (level === LEVEL_2) {
      playerWins()
      return
    }
  }

  // LASER WALL

  if (level >= LASER_START_LEVEL) {
    laserTimer++

    if (
      laserTimer >= LASER_RISE_DELAY &&
      laserRows < height()
    ) {
      laserTimer = 0

      const lasers = getAll(laser)

      for (const beam of lasers) {
        beam.y -= 1
      }

      const bottomY = height() - 1

      for (let x = 0; x < width(); x++) {
        addSprite(x, bottomY, laser)
      }

      laserRows++
    }

    // LASER HIT PLAYER

    if (tilesWith(player, laser).length > 0) {
      playerDies()
      return
    }
  }
}, 120)