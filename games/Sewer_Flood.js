/*
@title: Sewer_Flood
@author: Eduardo
@tags: [infinite]
@addedOn: 2024-00-00
*/

const jumpHeight = 5
let score = 0

const playerIdle = "i"
const playerJump = "j"
const playerFall = "f"
const platform = "o"
const water = "w"
const background = "b"

setLegend(
  [ playerIdle, bitmap`
................
................
.......00.......
......0220......
.....022220.....
.....022220.....
......0220......
.......00.......
......0000......
.....0.00.0.....
....0..00..0....
...0...00...0...
.......00.......
.......00.......
......0..0......
......0..0......` ],
  [ playerJump, bitmap`
................
................
.......00.......
......0220......
.....022220.....
.....052250.0...
......0550..0...
.......00..0....
......00000.....
.....0.00...7...
....0..00.7.7...
...0.7.00.7.7...
.....7.00.7.7...
...7...00.7.....
...7..0..0..7...
...7..0..0..7...` ],
  [ playerFall, bitmap`
.....7....7.....
.....7....7.....
.....7.00.......
..7...0550......
..7..052250.....
..7..022220.....
..7...0220......
..7....00.......
.....000000.....
...00..00..00...
..0....00....0..
.......00.......
.......00.......
.......00.......
......0..0......
......0..0......` ],
  [ platform,   bitmap`
................
....11111111....
...1000000001...
..100000000001..
.10000000000001.
.10000000000001.
.10000000000001.
.10000000000001.
.10000777700001.
.1L0077777700L1.
.1LL77777777LL1.
.11L77777777L11.
..1L77777777L1..
...1777777771...
....77777777....
....77777777....` ],
  [ water,      bitmap`
7777777777777777
7777777777777777
5777755775577775
7577577777757757
7755777777775577
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7557777557777557
7775775775775777
7777557777557777
7777777777777777
7777777777777777` ],
  [ background, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1L0LLLLLLLLL0LL
L1000LLLLLLL000L
L1L0LLLLLLLLL0LL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1L0LLLLLLLLL0LL
L1000LLLLLLL000L
L1L0LLLLLLLLL0LL
LLLLLLLLLLLLLLLL` ],
)

setSolids([ playerIdle, platform ])
setSolids([ playerJump, platform ])
setSolids([ playerFall, platform ])

let level = 0
const levels = [
  map`
............
............
............
............
............
............
............
............
............
............`, // 0 - menu
  map`
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
.......i.......`, // 1 - playing
  map`
............
............
............
............
............
............
............
............
............
............`, // 2 - dead
]

setMap(levels[level])

var allowFall = false
var allowJump = true

function getPlayer() {
  let plr = null

  if (getFirst(playerIdle) != null) {
    plr = getFirst(playerIdle)
  } else if (getFirst(playerJump) != null) {
    plr = getFirst(playerJump)
  } else if (getFirst(playerFall) != null) {
    plr = getFirst(playerFall)
  }

  return plr
}

function replaceSprite(sprite) {
  let plr = getPlayer()
  
  let x = plr.x
  let y = plr.y
  plr.remove()
  addSprite(x, y, sprite)
}

function gravity() {
  if (level != 1) {
    return
  }
  if (allowFall == true) {
    replaceSprite(playerFall)
    allowJump = false
    
    let plr = getFirst(playerFall)
    let x = null
    let y = null
    let stop = false

    let tileBelowY = plr.y + 1

    let tileBelow = getTile(plr.x, tileBelowY)
    tileBelow.forEach(function(sprite) {
      if (sprite.type === platform) {
        stop = true
      }
    })

    if (tileBelowY == height()) {
      stop = true
    }

    if (stop == false) {
      getFirst(playerFall).y += 1
    } else if (stop == true) {
      allowFall = false
      allowJump = true
      replaceSprite(playerIdle)
    }
  }
  
  setTimeout(gravity, 100)
}

let upCount = 0

function jump() {
  if (level != 1) {
    return
  }
  if (upCount < jumpHeight) {
    allowJump = false
    replaceSprite(playerJump)
    allowFall = false
    getFirst(playerJump).y -= 1
    upCount += 1
    setTimeout(jump, 100)
  } else if (upCount == jumpHeight) {
    allowFall = true
    upCount = 0
  }
}

function fallInAir() {
  let tileBelow = getTile(getPlayer().x, getPlayer().y+1)
  if (!tileBelow.includes(platform) && allowFall == false && allowJump == true) {
    allowFall = true
  }
}

function createPlatform(pos) {
  let x = 0
  let y = 0
  if (pos != null) {
    x = pos[0]
    y = pos[1]
  }
  
  addSprite(0+x,0+y, platform)
  addSprite(1+x,0+y, platform)
  addSprite(2+x,0+y, platform)
  addSprite(3+x,0+y, platform)
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function randomPlatforms() {
  for (let i = 2; i < height()-2; i+=4) {
    let x = getRndInteger(0, 11)
    createPlatform([x, i])
  }
}

let toFour = 2

function updateFrame() {
  if (level != 1) {
    return
  }
  toFour += 1
  let platforms = getAll(platform)
  platforms.forEach(function(sprite) {
    if (sprite.y != height()-2) {
      sprite.y += 1
    } else {
      sprite.remove()
    }
  })
  if (toFour == 4) {
    createPlatform([getRndInteger(0, 11), 0])
    toFour = 0
    score += 1000
  }
  if (allowJump == true && allowFall == false) {
    allowFall = true
  }
  setTimeout(updateFrame, 2500)
}

function checkDeath() {
  if (level != 1) {
    return
  }
  if (getPlayer().y == height()-1) {
    death()
  }
  setTimeout(checkDeath, 100)
}

function createWater() {
  for (let i = 0; i < width(); i++) {
    addSprite(i, 21, water)
  }
}

onInput("w", () => {
  if (allowJump == true) {
    jump()
  }
})

onInput("a", () => {
  if (level == 1) {
    getPlayer().x -=1
  } else if (level == 0 || level == 2) {
    start()
  }
})

onInput("d", () => {
  if (level == 1) {
    getPlayer().x +=1
  }
})

afterInput(fallInAir)

function start() {
  score = 0
  level = 1
  setMap(levels[level])
  toFour = 2
  upCount = 0
  clearText()
  setBackground(background)
  gravity()
  randomPlatforms()
  setTimeout(createWater, 2500)
  setTimeout(updateFrame, 2500)
  setTimeout(checkDeath, 2500)
}

function death() {
  level = 2
  setMap(levels[level])
  clearText()
  addText("You drowned", { x:4, y:2, color:color`3` })
  addText("Score: " + score, { x:4, y:5, color:color`3` })
  addText("A to restart", { x:4, y:8, color:color`7` })
  
}

function menu() {
  score = 0
  level = 0
  setMap(levels[level])
  clearText()
  addText("Sewer Flood", { x:4, y:2, color:color`5` })
  addText("A to play", { x:5, y:7, color:color`7` })
}

menu()
