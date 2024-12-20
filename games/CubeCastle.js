/*
@title: Cube Castle
@author: Paylicier
@tags: ['platformer']
@addedOn: 2024-12-05
*/

const player = "p"
const king = "k"
const princess = "w"
const plateform = "#"
const lava = "@"
const sign = "s"
const fireball = "f"

const DIAL_SCENE = 0

setLegend(
  [player, bitmap`
................
................
..00000000000000
..00000000000000
0000LLLLLLLLLL00
0000LLLLLLLLLL00
00LLLLL00LL00L00
00LLLLL00LL00L00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
0000LLLLLLLLLL00
0000LLLLLLLLLL00
..00000000000000
..00000000000000`],
  [plateform, bitmap`
0000000000000000
0000000000000000
0011111111111100
0011111111111100
0011LLLLLLLL1100
0011LLLLLLLL1100
0011LLLLLLLL1100
0011LLLLLLLL1100
0011LLLLLLLL1100
0011LLLLLLLL1100
0011LLLLLLLL1100
0011LLLLLLLL1100
0011111111111100
0011111111111100
0000000000000000
0000000000000000`],
  [lava, bitmap`
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
  [sign, bitmap`
................
................
................
...CCCCCCCCCC...
..CCCCCCCCCCCC..
..CC00000000CC..
..CCCCCCCCCCCC..
..CCC000000CCC..
..CCCCCCCCCCCC..
..CCCC0000CCCC..
..CCCCCCCCCCCC..
......FFFF......
......FFFF......
......FFFF......
......FFFF......
......FFFF......`],
  [king, bitmap`
................
6.66.66.66.66.66
6.66.66.66.66.66
6666666666666666
6666666666666666
0000000000000000
0000000000000000
00L0LLLLLLLL0L00
00LL0LLLLLL0LL00
00LLL0LLLL0LLL00
00L20LLLLLL02L00
00L20L0LL0L02L00
00LLLLL00LLLLL00
00LLLLLLLLLLLL00
0000000000000000
0000000000000000`],
  [princess, bitmap`
................
................
................
.............H8H
HHHHHHHHHHHHH868
HHHHHHHHHHHHHH8H
0000000000000000
00LLLLLLLLLLLL00
00L20LLLLLL02L00
00L20LLLLLL02L00
00LLLLLLLLLLLL00
00LLLL0000LLLL00
00LLL0LLLL0LLL00
00LLLLLLLLLLLL00
0000000000000000
0000000000000000`],
  [fireball, bitmap`
................
................
................
................
................
................
................
................
....33333333....
....39999993....
....39666693....
....39622693....
....39622693....
....39666693....
....39999993....
....33333333....`]
)

setSolids([plateform, player])

let isJumping = false
let isDead = false
let lives = 5

let level = 1
const levels = [
  map`
.`,
  map`
..........
.........s
.......###
...#.#....
p.........
##########`,
  map`
..........
.........s
.....##.##
....###...
p..####...
#@@#@@#@@@`,
  map`
.........#
.........#
p........#
##########
##########
##########
.........s
##########
@@@@@@@@@@`,
  map`
............
............
.p..........
.#..#..#...s
@#@@#@@#@@##
@#@@#@@#@@@@`,
  map`
............
..s.........
..##.####...
..........##
.........###
........#...
......##....
.p.##..#....
.#..#..#....
@#@@#@@#@@@@
@#@@#@@#@@@@`,
  map`
.................
....w............
...###...........
.................
..............k.s
..............###
..p.......###....
.###..###........
.................
@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@`
]

const melody = tune`
185.1851851851852: C4/185.1851851851852,
185.1851851851852: D4-185.1851851851852,
185.1851851851852: E4^185.1851851851852,
185.1851851851852: D4-185.1851851851852 + B4/185.1851851851852,
185.1851851851852: E4^185.1851851851852,
185.1851851851852: D4-185.1851851851852,
185.1851851851852: E4^185.1851851851852,
185.1851851851852: D4-185.1851851851852,
185.1851851851852: C4/185.1851851851852,
185.1851851851852: C4-185.1851851851852,
185.1851851851852: D4^185.1851851851852,
185.1851851851852: C4-185.1851851851852 + B4/185.1851851851852,
185.1851851851852: D4^185.1851851851852,
185.1851851851852: C4-185.1851851851852,
185.1851851851852: D4^185.1851851851852,
185.1851851851852: C4-185.1851851851852,
185.1851851851852: C4/185.1851851851852,
185.1851851851852: D4-185.1851851851852,
185.1851851851852: E4^185.1851851851852,
185.1851851851852: D4-185.1851851851852 + B4/185.1851851851852,
185.1851851851852: E4^185.1851851851852,
185.1851851851852: D4-185.1851851851852,
185.1851851851852: E4^185.1851851851852,
185.1851851851852: D4-185.1851851851852,
185.1851851851852: C4/185.1851851851852,
185.1851851851852: C4-185.1851851851852,
185.1851851851852: D4^185.1851851851852,
185.1851851851852: C4-185.1851851851852 + B4/185.1851851851852,
185.1851851851852: D4^185.1851851851852,
185.1851851851852: C4-185.1851851851852,
185.1851851851852: D4^185.1851851851852,
185.1851851851852: C4-185.1851851851852`
let playback = playTune(melody, Infinity)
let time = 0;

const dialogues = [{
    level: 1,
    text: "In this game,\nyou're a cube\nthat needs\nto free\nthe princess\nfrom the cube\nking.\n\n\nPress L again\nto close",
    targetlvl: 2
  },
  {
    level: 2,
    text: "Welcome to\nthe king's\ncastle\n\n\nPress L again\nto close",
    targetlvl: 3
  },
  {
    level: 3,
    text: "You're\nentering the\nlava hallway\n\nPress L again\nto close",
    targetlvl: 4
  },
  {
    level: 4,
    text: "You're\nentering the\nlava hallway2\n\nPress L again\nto close",
    targetlvl: 5
  },
  {
    level: 5,
    text: "Boss Battle\ntime\n!1!1!1!1!\n\nPress L again\nto close",
    targetlvl: 6
  },
  {
    level: 6,
    text: `You win !\nThe king failed\na jump and\ndied in lava.\n\nTime: {TIME} sec.\n\nPress L to\nrestart`,
    targetlvl: 1
  }
]

function jump(player) {
  const plr = getFirst(player);
  if (isJumping && player != king) return;
  isJumping = true
  plr.y -= 1
  setTimeout(function() {
    plr.y -= 1
    if (player === king) plr.x -= 1
    setTimeout(function() {
      isJumping = false
      gravity(player)
    }, 120)
  }, 60)
}

function gravity(obj) {
  const playerSprite = getFirst(obj)
  if (!playerSprite) return;
  if (!isJumping) {
    const belowSprites = getTile(playerSprite.x, playerSprite.y + 1)

    if (belowSprites.some(sprite => sprite?.type === lava) || belowSprites.some(sprite => sprite?.type === player)) {
      if (obj != player && !belowSprites.some(sprite => sprite?.type === player)) return playerSprite.remove();
      // Player touched lava/fireball, reset the game
      kill()
      return;
    }

    if (belowSprites.length === 0) {
      isJumping = true
      playerSprite.y += 1
      setTimeout(function() {
        isJumping = false
        gravity(obj)
      }, 100)
    } else {
      if (obj === fireball) {
        breakBlock(belowSprites[0].x, belowSprites[0].y)
        return playerSprite.remove()
      }
      isJumping = false
    }
  }
}

function kill() {
  isDead = true
  setMap(levels[DIAL_SCENE])
  lives--
  if (lives === 0) {
    addText("Game Over !", { x: 5, y: 5, color: color`0` })
    setTimeout(function() {
      isJumping = false
      isDead = false
      clearText()
      level = 1
      lives = 5
      time = 0
      setMap(levels[1])
    }, 1200)
    return;
  }
  addText("You died !\n\nLives:" + lives, { x: 5, y: 5, color: color`0` })
  setTimeout(function() {
    isJumping = false
    isDead = false
    clearText()
    setMap(levels[level])
    if (level === 6) bossFight();
  }, 1200)
}

function spawnFireballs() {
  if (level != 3) return;
  const fireballX = Math.floor(Math.random() * width()) // Random x coordinate
  const fireballY = 0 // Fixed y coordinate
  addSprite(fireballX, fireballY, fireball)
  gravity(fireball)
  setTimeout(function() {
    spawnFireballs()
  }, Math.floor(Math.random() * 1000) + 100)
}

function breakBlock(x, y) {
  const blockSprite = getTile(x, y)[0]
  if (blockSprite?.type === plateform) {
    blockSprite.remove() // Remove the block sprite
  }
}

function bossFight() {
  setTimeout(function() {
    const kingSprite = getFirst(king);
    if (kingSprite) {
      jump(king);
    }
  }, 1500)
}

function interactCheck() {
  const playerSprite = getFirst(player)
  if (!playerSprite) return;
  const adjacentSprites = [
    getTile(playerSprite.x + 1, playerSprite.y)[0], // Right
    getTile(playerSprite.x - 1, playerSprite.y)[0], // Left
    getTile(playerSprite.x, playerSprite.y - 1)[0] // Up
  ]

  const isNearSign = adjacentSprites.some(sprite => sprite?.type === sign)

  if (isNearSign) {
    addText("Press L to interact", { x: 0, y: 14, color: color`2` })
  } else {
    clearText()
  }
}


function interact() {
  const playerSprite = getFirst(player)
  if (!playerSprite) {
    if (isDead) return;
    const dialogue = dialogues.find((dial) => dial.level === level);
    clearText();
    if (dialogue?.targetlvl) level = dialogue.targetlvl
    if (level === 3) spawnFireballs();
    setMap(levels[level]);
    if (level === 6) bossFight();
    if (level === 1) {
      time = 0;
      lives = 5;
    }
    return;
  }
  const adjacentSprites = [
    getTile(playerSprite.x + 1, playerSprite.y)[0], // Right
    getTile(playerSprite.x - 1, playerSprite.y)[0], // Left
  ]

  const isNearSign = adjacentSprites.some(sprite => sprite?.type === sign)

  if (isNearSign) {
    const dialogue = dialogues.find((dial) => dial?.level === level);
    setMap(levels[DIAL_SCENE])
    clearText()
    addText(dialogue?.text.replace("{TIME}", time) || "notext", { x: 3, y: 1, color: color`0` })
  }
}


setMap(levels[level])

setPushables({
  [player]: []
})

onInput("w", () => {
  if (!getFirst(player)) return;
  jump(player)
})

onInput("l", () => {
  interact()
})

onInput("d", () => {
  if (!getFirst(player)) return;
  getFirst(player).x += 1
})

onInput("a", () => {
  if (!getFirst(player)) return;
  getFirst(player).x -= 1
})

onInput("k", () => {
  if (playback) {
    playback.end()
    playback = null
    return;
  }
  playback = playTune(melody, Infinity);

})

afterInput(() => {
  if (!isJumping) gravity(player)
  interactCheck()
})


//time
setInterval(function() {
  time++
}, 1000)
