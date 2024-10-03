/*
@title: Faby Flies
@author: Eny
@tags: ['endless','retro']
@addedOn: 2024-06-22
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const playerFlapping = "f"
const pipeLeft = "l"
const pipeRight = "r"
const pipeEndLeft = "e"
const pipeEndRight = "g"
const grass = "z"
const sky = "s"
const textOne = "x"
const textTwo = "i"
const textThree = "u"
const textFour = "y"
const textFive = "h"
const bronzeMedal = "b"
const silverMedal = "c"
const goldMedal = "q"
const overOne = "j"
const overTwo = "k"
const overThree = "a"
const overFour = "d"
const overFive = "m"

setLegend(
  [ "0", bitmap`
................
................
........0000000.
........0222220.
........0222220.
........0220220.
........0220220.
........0220220.
........0220220.
........0220220.
........0220220.
........0222220.
........0222220.
........0000000.
................
................` ],
  [ "1", bitmap`
................
................
..........00000.
..........02220.
..........02220.
..........00220.
...........0220.
...........0220.
...........0220.
...........0220.
...........0220.
...........0220.
...........0220.
...........0000.
................
................` ],
  [ "2", bitmap`
................
................
........0000000.
........0222220.
........0222220.
........0222220.
........0000220.
........0222220.
........0222220.
........0222220.
........0220000.
........0222220.
........0222220.
........0000000.
................
................` ],
  [ "3", bitmap`
................
................
........0000000.
........0222220.
........0222220.
........0222220.
........0000220.
........0222220.
........0222220.
........0222220.
........0000220.
........0222220.
........0222220.
........0000000.
................
................` ],
  [ "4", bitmap`
................
................
........0000000.
........0220220.
........0220220.
........0220220.
........0222220.
........0222220.
........0000220.
...........0220.
...........0220.
...........0220.
...........0220.
...........0000.
................
................` ],
  [ "5", bitmap`
................
................
........0000000.
........0222220.
........0222220.
........0222220.
........0220000.
........0222220.
........0222220.
........0222220.
........0000220.
........0222220.
........0222220.
........0000000.
................
................` ],
  [ "6", bitmap`
................
................
........0000000.
........0222220.
........0222220.
........0220000.
........0222220.
........0222220.
........0220220.
........0220220.
........0220220.
........0222220.
........0222220.
........0000000.
................
................` ],
  [ "7", bitmap`
................
................
.......00000000.
.......02222220.
.......02222220.
.......00000220.
...........0220.
...........0220.
...........0220.
...........0220.
...........0220.
...........0220.
...........0220.
...........0000.
................
................` ],
  [ "8", bitmap`
................
................
........0000000.
........0222220.
........0222220.
........0220220.
........0220220.
........0222220.
........0222220.
........0220220.
........0220220.
........0222220.
........0222220.
........0000000.
................
................` ],
  [ "9", bitmap`
................
................
........0000000.
........0222220.
........0222220.
........0220220.
........0220220.
........0222220.
........0222220.
........0222220.
........0000220.
........0222220.
........0222220.
........0000000.
................
................` ],
  [ textOne, bitmap`
................
................
.000000.00000000
.022220002200222
.022222002200222
.022222002200220
.022022002200222
.022022002200222
.022022002200220
.022022002200220
.022222002200220
.022222002200220
.022220002200220
.000000.00000000
................
................` ],
  [ textTwo, bitmap`
................
................
0000000000000000
2200222220022002
2200222220022002
0000220000022002
2200222220022002
2200222220022002
0000220000022002
...0220...022002
...0220...022002
...0220...022002
...0220...022002
...0000...000000
................
................` ],
  [ textThree, bitmap`
................
................
0000000000000000
2222002202200220
2222002202200220
2000002202200220
20...02202200220
20...02202200220
20...02202200220
20...02202200220
2000002222200220
2222002222200222
2222002222200222
0000000000000000
................
................` ],
  [ textFour, bitmap`
................
................
00000000000000.0
02222222200220.0
02222222200220.0
00002200000220.0
...0220...022000
...0220...022222
...0220...022222
...0220...000220
0000220.....0220
2200220.....0220
2200220.....0220
0000000.....0000
................
................` ],
  [ textFive, bitmap`
................
................
000.0000........
220.0220........
220.0220........
220.0220........
220.0220........
220.0000........
220.0000........
000.0220........
....0220........
....0220........
....0220........
....0000........
................
................` ],
  [ overOne, bitmap`
................
................
.000000000000000
.022222200222220
.022222200220220
.022000000220220
.0220....0220220
.0220....0222220
.022000000222220
.022002200220220
.022002200220220
.022222200220220
.022222200220220
.000000000000000
................
................` ],
  [ overTwo, bitmap`
................
................
0000000000000000
0222202222002222
0222202222002222
0222202222002200
0222222222002200
0222222222002222
0222222222002222
0220222022002200
0220222022002200
0220222022002222
0220222022002222
0000000000000000
................
................` ],
  [ overThree, bitmap`
................
................
00......00000000
20......02222200
20......02222200
00......02202200
0.......02202200
0.......02202200
0.......02202200
0.......02202200
00......02202200
20......02222200
20......02222200
00......00000000
................
................` ],
  [ overFour, bitmap`
................
................
0000000000000000
2202200222220022
2202200222220022
2202200220000022
220220022000.022
220220022220.022
220220022220.022
22220.022000.022
22220.0220000022
2220..0222220022
2220..0222220022
000...0000000000
................
................` ],
  [ overFive, bitmap`
................
................
0000..000.......
2220..020.......
0220..020.......
0220..020.......
2220..020.......
220...020.......
220...020.......
0220..000.......
0220............
02220.000.......
02220.020.......
0000..000.......
................
................` ],
  [ player, bitmap`
................
................
......00000.....
....00FFF020....
...0FF6602220...
..0F6666022020..
.0666666012020..
.0000066601220..
022222066600000.
0122210660333330
.00000990300000.
..0999999033330.
...00999990000..
.....00000......
................
................` ],
  [ playerFlapping, bitmap`
................
................
......00000.....
....00FFF020....
...0FF6602220...
..0F6666022020..
.0666666012020..
.0666666601220..
.00000666600000.
0122210660333330
022220990300000.
022209999033330.
.0000999990000..
.....00000......
................
................` ],
  [ pipeLeft, bitmap`
..0464444D4D4DDD
..0464444D44DDDD
..0464444D4D4DDD
..0464444D44DDDD
..0464444D4D4DDD
..0464444D44DDDD
..0464444D4D4DDD
..0464444D44DDDD
..0464444D4D4DDD
..0464444D44DDDD
..0464444D4D4DDD
..0464444D44DDDD
..0464444D4D4DDD
..0464444D44DDDD
..0464444D4D4DDD
..0464444D44DDDD` ],
  [ pipeRight, bitmap`
DDDDDDDDDDFDF0..
DDDDDDDDDFDFF0..
DDDDDDDDDDFDF0..
DDDDDDDDDFDFF0..
DDDDDDDDDDFDF0..
DDDDDDDDDFDFF0..
DDDDDDDDDDFDF0..
DDDDDDDDDFDFF0..
DDDDDDDDDDFDF0..
DDDDDDDDDFDFF0..
DDDDDDDDDDFDF0..
DDDDDDDDDFDFF0..
DDDDDDDDDDFDF0..
DDDDDDDDDFDFF0..
DDDDDDDDDDFDF0..
DDDDDDDDDFDFF0..` ],
  [ pipeEndLeft, bitmap`
0000000000000000
0464444D4D4DDDDD
0464444D44DDDDDD
0464444D4D4DDDDD
0464444D44DDDDDD
0464444D4D4DDDDD
0464444D44DDDDDD
0464444D4D4DDDDD
0464444D44DDDDDD
0464444D4D4DDDDD
0464444D44DDDDDD
0464444D4D4DDDDD
0464444D44DDDDDD
0464444D4D4DDDDD
0464444D44DDDDDD
0000000000000000` ],
  [ pipeEndRight, bitmap`
0000000000000000
DDDDDDDDDDDDFDF0
DDDDDDDDDDDFDFF0
DDDDDDDDDDDDFDF0
DDDDDDDDDDDFDFF0
DDDDDDDDDDDDFDF0
DDDDDDDDDDDFDFF0
DDDDDDDDDDDDFDF0
DDDDDDDDDDDFDFF0
DDDDDDDDDDDDFDF0
DDDDDDDDDDDFDFF0
DDDDDDDDDDDDFDF0
DDDDDDDDDDDFDFF0
DDDDDDDDDDDDFDF0
DDDDDDDDDDDFDFF0
0000000000000000` ],
  [ bronzeMedal, bitmap`
..1..CCCCCC.....
.121C999999CC...
1222199999999C..
.121999CC99999C.
.C19999CC99999C.
C999999CC999999C
C999999CC999999C
C999999CC999999C
C999999CC999999C
C99999999999999C
C99999999999999C
.C99999CC99999C.
.C99999CC99999C.
..C9999999999C..
...CC999999CC...
.....CCCCCC.....` ],
  [ silverMedal, bitmap`
..1..LLLLLL.....
.121L222222LL...
1222122222222L..
.1212221122222L.
.L122221122222L.
L22222211222222L
L22222211222222L
L22222211222222L
L22222211222222L
L22222222222222L
L22222222222222L
.L222221122222L.
.L222221122222L.
..L2222222222L..
...LL222222LL...
.....LLLLLL.....` ],
  [ goldMedal, bitmap`
..1..FFFFFF.....
.121F666666FF...
1222166666666F..
.121666FF66666F.
.F16666FF66666F.
F666666FF666666F
F666666FF666666F
F666666FF666666F
F666666FF666666F
F66666666666666F
F66666666666666F
.F66666FF66666F.
.F66666FF66666F.
..F6666666666F..
...FF666666FF...
.....FFFFFF.....` ],
  [ grass, bitmap`
0000000000000000
FFFFFFFFFFFFFFFF
6666666666666666
DDDD4444DDDD4444
DDD4444DDDD4444D
DD4444DDDD4444DD
D4444DDDD4444DDD
DDDDDDDDDDDDDDDD
9999999999999999
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF` ],
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
7777777777777777` ]
)

setSolids([pipeLeft, pipeRight, pipeEndLeft, pipeEndRight])

let inGame = false
const levels = [
  map`
..........
...0......
..........
.p........
..........
..........
..........
zzzzzzzzzz`,
  map`
......lr..
.xiuyheg..
..123.....
..p.......
......eg..
......lr..
......lr..
zzzzzzzzzz`
]

setMap(levels[1])
setBackground(sky)

let speed = 500
let difficulty = 1

let pipeHeight = 0
let pipeGap = 3
let score = 0

let cheatCode = 0

function placeWall(height, pipeType, pipeEndType) {
  for (let y = 0; y < 7; y++) {
    if (y != height && (y != height + 1)) {
      if (y == height -1 || y == height + 2) {
        addSprite(9, y, pipeEndType)
      } else {
        addSprite(9, y, pipeType)
      }
    }
  }
}

function genWall() {
  let height = Math.floor(Math.random() * 4) + 1
  if (height == pipeHeight) {
    genWall()
    return
  }
  pipeHeight = height
  placeWall(height, pipeLeft, pipeEndLeft)
}

function moveSprites() {
  let sprites = getAll(pipeLeft).concat(getAll(pipeRight), getAll(pipeEndLeft), getAll(pipeEndRight))
  let spriteGen = false
  
  sprites.forEach((s) => {
    if (s.x == 0) {
      s.remove()
    }
    s.x -= 1
    if (s.x == 8 && (s.type == pipeLeft || s.type == pipeEndLeft)) {
      spriteGen = true
    }
  });

  if (spriteGen) {
    placeWall(pipeHeight, pipeRight, pipeEndRight)
  }
}

function updateScore(yOffset) {
  yOffset = yOffset || 0
  if (score > 999) {
    return
  }
  let sprites = new Array();
  for (let x = 0; x < 10; x++) {
    sprites = sprites.concat(getAll(x.toString()))
  }
  sprites.sort((a, b) => b.x - a.x)
  
  if (Math.floor(score / 100) > 0) {
    if (sprites.length == 2) {
      addSprite(1, 1 + yOffset, "1")
    } else {
      sprites[2].remove()
      addSprite(1, 1 + yOffset, Math.floor(score / 100).toString())
    }
  }
  if (Math.floor(score / 10) > 0) {
    if (sprites.length == 1) {
      addSprite(2, 1 + yOffset, "1")
    } else {
      sprites[1].remove()
      addSprite(2, 1 + yOffset, Math.floor(score % 100 / 10).toString())
    }
  }
  sprites[0].remove()
  addSprite(3, 1 + yOffset, (score % 10).toString())
}

function updateBird() {
  let p = getFirst(player)
  if (p) {
    addSprite(p.x, p.y, playerFlapping)
    p.remove()
  } else {
    p = getFirst(playerFlapping)
    addSprite(p.x, p.y, player)
    p.remove()
  }
  setTimeout(updateBird, speed / 2)
}

function movePlayer(offset) {
  let p = getFirst(player) || getFirst(playerFlapping)
  if (p.y + offset < 7) {
    p.y += offset
  }
}

function movePlayerDifficulty(dir) {
  let p = getFirst(player) || getFirst(playerFlapping)
  let after = p.x + dir
  if (after < 2 || after > 4) {
    return
  }
  p.x = after
  difficulty = after - 1
  speed = Math.floor(500 / difficulty)
}

function loseScreen() {
  updateScore(1)

  addSprite(1, 1, overOne)
  addSprite(2, 1, overTwo)
  addSprite(3, 1, overThree)
  addSprite(4, 1, overFour)
  addSprite(5, 1, overFive)

  let adjustedScore = Math.max((difficulty / 2), 0.75) * score

  if (adjustedScore > 150) {
    addSprite(5, 2, goldMedal)
  } else if (adjustedScore > 75) {
    addSprite(5, 2, silverMedal)
  } else if (adjustedScore > 40) {
    addSprite(5, 2, bronzeMedal)
  }
}

function gameLoop() {
  moveSprites()
  if (pipeGap < 3) {
    pipeGap += 1
  } else {
    pipeGap = 0
    genWall()
    //score += 1
  }

  let p = getFirst(player) || getFirst(playerFlapping)
  let pipes = getAll(pipeLeft).concat(getAll(pipeRight), getAll(pipeEndLeft), getAll(pipeEndRight))
  let collided = false
  let incr = false

  pipes.forEach((pipe) => {
    if (p.x == pipe.x && p.y == pipe.y) {
      loseScreen()
      inGame = false
      collided = true
    } else if (p.x == pipe.x && pipe.type == pipeEndRight) {
      incr = true
    }
  })
  if (incr) {
    score += 1
    updateScore()
  }
  
  if (!collided) {
    setTimeout(gameLoop, speed)
  }
}

updateBird()

onInput("w", () => {
  if (inGame) {
    movePlayer(-1)
  } else if (score != 0 && cheatCode < 2) {
    cheatCode += 1
  } else if (cheatCode != -1) {
    cheatCode = 0
  }
})
onInput("s", () => {
  if (inGame) {
    movePlayer(1)
  } else if (score != 0 && 1 < cheatCode && cheatCode < 4) {
    cheatCode += 1
  } else if (cheatCode != -1) {
    cheatCode = 0
  }
})

onInput("a", () => {
  if (!inGame && score == 0) {
    movePlayerDifficulty(-1)
  } else if (score != 0 && ((3 < cheatCode && cheatCode < 5) || (5 < cheatCode && cheatCode < 7))) {
    cheatCode += 1
  } else if (cheatCode != -1) {
    cheatCode = 0
  }
})
onInput("d", () => {
  if (!inGame && score == 0) {
    movePlayerDifficulty(1)
  } else if (score != 0 && ((4 < cheatCode && cheatCode < 6) || (6 < cheatCode && cheatCode < 8))) {
    cheatCode += 1
  } else if (cheatCode != -1) {
    cheatCode = 0
  }
})

onInput("k", () => {
  if (!inGame && score != 0 && 7 < cheatCode && cheatCode < 9) {
    cheatCode += 1
  } else if (cheatCode != -1) {
    cheatCode = 0
  }
})

onInput("l", () => {
  if (!inGame && score != 0 && 8 < cheatCode && cheatCode < 10) {
    cheatCode = -1
    let sprites = getAll(pipeLeft).concat(getAll(pipeRight), getAll(pipeEndLeft), getAll(pipeEndRight)).concat(getAll(overOne)).concat(getAll(overTwo)).concat(getAll(overThree)).concat(getAll(overFour)).concat(getAll(overFive)).concat(getAll(bronzeMedal)).concat(getAll(silverMedal)).concat(getAll(goldMedal))
    sprites.forEach((s) => s.remove())
    inGame = true
    gameLoop()
  } else if (cheatCode != -1) {
    cheatCode = 0
  }
})

onInput("j", () => {
  if (!inGame && score == 0) {
    let p = getFirst(player) || getFirst(playerFlapping)
    p.x = 1
    setMap(levels[0])
    inGame = true
    gameLoop()
  } else if (cheatCode != -1) {
    cheatCode = 0
  }
})

onInput("i", () => {
  if (cheatCode != -1) {
    cheatCode = 0
  }
})
