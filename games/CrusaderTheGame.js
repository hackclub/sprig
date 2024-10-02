/*
@title: Crusader
@author: Skyfall
@tags: ['platformer']
@addedOn: 2024-07-18
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const stoneWall = "S"
const coin = "c"
const coinHud = "C"
const spikeStage1 = "z"
const spikeStage2 = "Z"
const spikeGoingDown = ":"
const spikeRetreat = "?"
const spikePermanent = "0"
const lava = "q"
const background = "b"
const key = "k"
const portalLocked = "@"
const portalUnlocked = "^"

const tick = "t"
const cross = "x"

const deathSound = tune`
106.76156583629893: E5-106.76156583629893 + D5-106.76156583629893 + A4-106.76156583629893 + F4-106.76156583629893 + C5~106.76156583629893,
106.76156583629893: D5-106.76156583629893 + C5-106.76156583629893 + B4~106.76156583629893 + A4~106.76156583629893,
106.76156583629893: C5-106.76156583629893 + B4~106.76156583629893 + A4~106.76156583629893,
106.76156583629893: B4-106.76156583629893 + A4~106.76156583629893 + C5~106.76156583629893,
106.76156583629893: B4-106.76156583629893 + A4~106.76156583629893 + C5~106.76156583629893,
106.76156583629893: C5~106.76156583629893 + B4~106.76156583629893 + A4~106.76156583629893,
2775.800711743772`
const successSound = tune`
106.76156583629893: D5/106.76156583629893 + C5/106.76156583629893 + B4^106.76156583629893 + A4^106.76156583629893,
106.76156583629893: E5/106.76156583629893 + C5/106.76156583629893 + D5^106.76156583629893 + B4^106.76156583629893 + A4^106.76156583629893,
106.76156583629893: C5^106.76156583629893 + A4-106.76156583629893 + E5-106.76156583629893 + B4~106.76156583629893 + D5^106.76156583629893,
3096.085409252669`
const music = tune`
303.030303030303: E4^303.030303030303,
303.030303030303: E4^303.030303030303 + G4~303.030303030303,
303.030303030303: B4/303.030303030303 + E5-303.030303030303 + E4^303.030303030303 + G4~303.030303030303,
303.030303030303: B4/303.030303030303 + D5-303.030303030303 + D4^303.030303030303 + F4~303.030303030303 + E4~303.030303030303,
303.030303030303: A4/303.030303030303 + G4/303.030303030303 + D5-303.030303030303 + D4^303.030303030303 + F4~303.030303030303,
303.030303030303: G4/303.030303030303 + D5-303.030303030303 + D4^303.030303030303 + F4~303.030303030303 + E4~303.030303030303,
303.030303030303: G4/303.030303030303 + D5-303.030303030303 + D4^303.030303030303 + F4~303.030303030303 + E4~303.030303030303,
303.030303030303: G4/303.030303030303 + D5-303.030303030303 + E4^303.030303030303 + F4~303.030303030303,
303.030303030303: G4/303.030303030303 + C5-303.030303030303 + E4^303.030303030303 + F4~303.030303030303,
303.030303030303: G4~303.030303030303 + C5-303.030303030303 + E4^303.030303030303 + F4^303.030303030303,
303.030303030303: G4~303.030303030303 + C5-303.030303030303 + F4^303.030303030303,
303.030303030303: A4/303.030303030303 + D5-303.030303030303 + F4^303.030303030303 + G4~303.030303030303,
303.030303030303: A4~303.030303030303 + D5-303.030303030303 + G4^303.030303030303 + F4^303.030303030303,
303.030303030303: B4~303.030303030303 + E5-303.030303030303 + G4^303.030303030303 + F4~303.030303030303,
303.030303030303: B4/303.030303030303 + F5-303.030303030303 + G4^303.030303030303 + C5~303.030303030303 + A4^303.030303030303,
303.030303030303: B4/303.030303030303 + F5-303.030303030303 + A4^303.030303030303 + C5~303.030303030303 + G4~303.030303030303,
303.030303030303: B4/303.030303030303 + F5-303.030303030303 + A4^303.030303030303 + C5~303.030303030303 + G4~303.030303030303,
303.030303030303: C5~303.030303030303 + F5-303.030303030303 + A4^303.030303030303 + G4~303.030303030303,
303.030303030303: C5~303.030303030303 + F5-303.030303030303 + A4^303.030303030303 + G4~303.030303030303,
303.030303030303: C5~303.030303030303 + F5-303.030303030303 + G4^303.030303030303 + A4^303.030303030303 + F4~303.030303030303,
303.030303030303: C5~303.030303030303 + F5-303.030303030303 + G4^303.030303030303 + F4~303.030303030303,
303.030303030303: D5/303.030303030303 + F5-303.030303030303 + G4^303.030303030303 + B4~303.030303030303 + F4~303.030303030303,
303.030303030303: D5/303.030303030303 + E5-303.030303030303 + G4^303.030303030303 + B4~303.030303030303 + F4^303.030303030303,
303.030303030303: C5/303.030303030303 + E5-303.030303030303 + F4^303.030303030303 + B4~303.030303030303,
303.030303030303: C5/303.030303030303 + E5-303.030303030303 + F4^303.030303030303 + A4~303.030303030303,
303.030303030303: B4/303.030303030303 + E5-303.030303030303 + F4^303.030303030303 + A4~303.030303030303,
303.030303030303: B4/303.030303030303 + E5-303.030303030303 + F4^303.030303030303 + A4~303.030303030303,
303.030303030303: A4~303.030303030303 + D5-303.030303030303 + E4^303.030303030303,
303.030303030303: A4~303.030303030303 + D5-303.030303030303 + E4^303.030303030303,
303.030303030303: G4/303.030303030303 + D5-303.030303030303 + E4^303.030303030303 + A4~303.030303030303,
303.030303030303: G4/303.030303030303 + C5-303.030303030303 + E4^303.030303030303 + A4~303.030303030303,
303.030303030303: F4/303.030303030303 + E4/303.030303030303 + C5-303.030303030303 + B4-303.030303030303 + A4-303.030303030303`
let deathSoundPlaying = false
let successSoundPlaying = false

setLegend(

  [tick, bitmap`
..............DD
.............DD.
.............DD.
............DD..
............DD..
...........DD...
...........DD...
..........DD....
..........DD....
...DD....DD.....
....DD...DD.....
....DD..DD......
.....DD.DD......
......DDD.......
......DDD.......
.......D........`],
  [cross, bitmap`
................
.33..........33.
..33........33..
...33......33...
....33....33....
.....33..33.....
......3333......
.......33.......
......3333......
.....33..33.....
....33....33....
...33......33...
..33........33..
.33..........33.
.3............3.
................`],
  [coinHud, bitmap`
LLLL66666666....
LLL6666666666...
LL666FFFFFF666..
L666FFFFFFFF666.
666FFFFFFFFFF666
66FFFFF66FFFFF66
66FFFFF66FFFFF66
66FFFFF66FFFFF66
66FFFFF66FFFFF66
66FFFFF66FFFFF66
66FFFFF66FFFFF66
666FFFFFFFFFF666
.666FFFFFFFF666.
..666FFFFFF666..
...6666666666...
....66666666....`],

  [lava, bitmap`
................
..999..99..9999.
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

  [player, bitmap`
................
................
................
................
.......000......
.....00..00.....
...00.....0.....
...0......0.....
..0..0....0.....
..0..000000.....
..0.............
.0..............
.0..............
.0..............
.0..............
.00000...00.....`],
  [stoneWall, bitmap`
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
  [coin, bitmap`
....66666666....
...6666666666...
..666FFFFFF666..
.666FFFFFFFF666.
666FFFFFFFFFF666
66FFFFF66FFFFF66
66FFFFF66FFFFF66
66FFFFF66FFFFF66
66FFFFF66FFFFF66
66FFFFF66FFFFF66
66FFFFF66FFFFF66
666FFFFFFFFFF666
.666FFFFFFFF666.
..666FFFFFF666..
...6666666666...
....66666666....`],

  [portalLocked, bitmap`
.....LLLLLL.....
...LLLLLLLLLL...
..LLLLLLLLLLLL..
..LLHHHHHHHHLL..
.LLHHHHHHHHHHLL.
.LLHHH1111HHHLL.
LLHHHH1HH1HHHHLL
LLHHHH1HH1HHHHLL
LLHHH666666HHHLL
LLHHH666666HHHLL
LLHHH666666HHHLL
LLHHH666666HHHLL
LLHHH666666HHHLL
LLHHH666666HHHLL
LLHHHHHHHHHHHHLL
LLHHHHHHHHHHHHLL`],
  [portalUnlocked, bitmap`
.....LLLLLL.....
...LLLLLLLLLL...
..LLLLLLLLLLLL..
..LLHHHHHHHHLL..
.LLHHHHHHHHHHLL.
.LLHHHHHHHHHHLL.
LLHHHHHHHHHHHHLL
LLHHHHHHHHHHHHLL
LLHHHHHHHHHHHHLL
LLHHHHHHHHHHHHLL
LLHHHHHHHHHHHHLL
LLHHHHHHHHHHHHLL
LLHHHHHHHHHHHHLL
LLHHHHHHHHHHHHLL
LLHHHHHHHHHHHHLL
LLHHHHHHHHHHHHLL`],

  [spikeStage1, bitmap`
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
..33...33...33..
.333..3333..333.
.3333.3333.3333.
3333333333333333
3333333333333333`],
  [spikeStage2, bitmap`
................
................
................
................
................
................
................
................
................
..33...33...33..
..33...33...33..
.3333.3333.3333.
.3333.3333.3333.
.3333.3333.3333.
3333333333333333
3333333333333333`],
  [spikeGoingDown, bitmap`
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
................
..33...33...33..
.3333.3333.3333.
3333333333333333`],
  [spikeRetreat, bitmap``],
  [spikePermanent, bitmap`
................
................
................
................
................
................
................
................
................
..33...33...33..
..33...33...33..
.3333.3333.3333.
.3333.3333.3333.
.3333.3333.3333.
3333333333333333
9999999999999999`],

  [background, bitmap`
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
  [key, bitmap`
................
................
.....9999.......
.....9..9.......
.....9..9.......
.....9999.......
........9.......
........9.......
........9.......
........999.....
........9.......
........9.......
........999.....
................
................
................`],
)

setSolids([stoneWall, player, portalLocked])

let level = 0
const levels = [
  map`
SSSSSSSSSSSSSSS
S.............S
S............@S
S......c...SSSS
Sc.....S......S
SS............S
S.S.......S...S
S...SSSS......S
S.......S.....S
S.........SSSSS
S....p...z..kcS
SSSSSSSSSSSSSSS`,
  map`
SSSSSSSSSSSSSSS
S.............S
S.............S
S...S..S..S..@S
S.S..........SS
S..S..........S
S....S.......cS
S...........zkS
S......SSSS.SSS
S.p..S........S
SqSqqqqqqqqqqqS
SSSSSSSSSSSSSSS`,
  map`
SSSSSSSSSSSSSSS
..............@
............SSS
......SSSS.....
...............
..SSSS.......k.
.............S.
.......SSSS....
...............
p...........SSS
SSqqqSqqSS.::.c
SSSSSSSSSSSSSSS`,
  map`
SSSSSSSSSSSSSSS
SSSSSSSSSSSSSSS
SSSSSSSSSSSSSSS
SSSSSSSSSSSSSSS
SSSSSSSSSSSSSSS
SSSSSSSSSSSSSSS
SSSSSSSSSSSSSSS
SSSSSSSSSSSSSSS
SSSSSSSSSSSSSSS
SSSSSSSSSSSSSSS
SSSSSSSSSSSSSSS
SSSSSSSSSSSSSSS`
]
const lastLevelId = levels.length - 1

setBackground(background)
setPushables({
  [player]: []
})

let isJumping = false;
let jumpingGracePeriod = false;

let initialGameState = {
  isDead: false,
  hasKey: false,
  coinsObtained: 0,
  initialCoinCount: null,
}
let gameState = Object.create(initialGameState)
loadLevel()

updateHud()

onInput("a", () => {
  let playerTile = getFirst(player)
  if (!playerTile) return
  if (!gameState.isDead) {
    playerTile.x -= 1
  }
})

onInput("d", () => {
  let playerTile = getFirst(player)
  if (!playerTile) return

  if (!gameState.isDead) {
    playerTile.x += 1
  }
})

onInput("w", () => {
  let playerTile = getFirst(player)
  if (!playerTile) return

  if (!isJumping && !gameState.isDead) {
    isJumping = true
    jumpingGracePeriod = true
    setTimeout(() => {
      jumpingGracePeriod = false
    }, 300)

    let tile1 = getTile(playerTile.x, playerTile.y - 1)[0]
    let tile2 = getTile(playerTile.x, playerTile.y - 2)[0]
    if (!tile1 && !tile2) {
      getFirst(player).y -= 2
    } else {
      getFirst(player).y -= 1
    }
  }
})

afterInput(() => {
  // Check if dead
  let touchingSpike = isTouchingAny([spikeStage1, spikeStage2, spikeGoingDown, spikePermanent, lava])
  if (touchingSpike !== false) {
    gameState.isDead = true

    if (!deathSoundPlaying) {
      deathSoundPlaying = true
      playTune(deathSound, 1)
    }

    addText("You died!", {
      x: 2,
      y: 0,
      color: color`3`
    })
    return
  }

  // Check if at portal
  if (isTouchingAny([portalUnlocked]) !== false) {
    level += 1
    loadLevel()
    if (!successSoundPlaying) {
      successSoundPlaying = true
      playTune(successSound)
      successSoundPlaying = false
    }
  }

  // Check for coins
  let touchingCoin = isTouchingAny([coin])
  if (touchingCoin !== false) {
    console.log(touchingCoin.x, touchingCoin.y)
    removeSpriteFromTile(touchingCoin.x, touchingCoin.y, coin)
    if (!successSoundPlaying) {
      successSoundPlaying = true
      playTune(successSound)
      successSoundPlaying = false
    }
  }
  gameState.coinsObtained = gameState.initialCoinCount - getAll(coin).length

  // Check for key
  let touchingKey = isTouchingAny([key])
  if (touchingKey !== false) {
    gameState.hasKey = true;
    removeSpriteFromTile(touchingKey.x, touchingKey.y, key)
    getAll(portalLocked).forEach((portal) => portal.type = portalUnlocked)
    if (!successSoundPlaying) {
      successSoundPlaying = true
      playTune(successSound)
    }
  }

  // Update HUD
  updateHud()
})

setInterval(() => {
  // Check for key
  let touchingKey = isTouchingAny([key])
  if (touchingKey !== false) {
    gameState.hasKey = true;
    removeSpriteFromTile(touchingKey.x, touchingKey.y, key)
    getAll(portalLocked).forEach((portal) => portal.type = portalUnlocked)
    if (!successSoundPlaying) {
      successSoundPlaying = true
      playTune(successSound)
      successSoundPlaying = false
    }
  }
}, 50)

setInterval(() => {
  let playerTile = getFirst(player)
  if (!playerTile) return
  let tile = getTile(playerTile.x, playerTile.y + 1)[0]
  if (tile && tile.type === stoneWall && !jumpingGracePeriod) {
    isJumping = false
  } else {
    if (!jumpingGracePeriod) {
      // Get the instance again to update it
      getFirst(player).y += 1
    }
  }

  let touchingSpike = isTouchingAny([spikeStage1, spikeStage2, spikePermanent, lava])
  if (touchingSpike !== false) {
    gameState.isDead = true
    if (!deathSoundPlaying) {
      deathSoundPlaying = true
      playTune(deathSound, 1)
      deathSoundPlaying = false
    }
    addText("You died!", {
      x: 2,
      y: 0,
      color: color`3`
    })
    return
  }
}, 250)

setInterval(() => {
  let spikes = [getAll(spikeStage1), getAll(spikeStage2), getAll(spikeGoingDown), getAll(spikeRetreat)].flat()
  spikes.forEach((spike) => {
    if (spike.type === spikeStage1) {
      spike.type = spikeStage2
    } else if (spike.type === spikeStage2) {
      spike.type = spikeGoingDown
    } else if (spike.type === spikeGoingDown) {
      spike.type = spikeRetreat
    } else {
      spike.type = spikeStage1
    }
  })
}, 1500)

function updateHud() {
  // 1 is for the slash, 2 is for extra margin
  const coinTextX = 2
  const coinIconX = gameState.coinsObtained.toString().length + 1 + gameState.initialCoinCount.toString().length + 1;
  const coinY = 0

  const keyIconX = 2
  const keyY = 15

  removeSpriteFromTile(coinIconX, coinY, coinHud)
  removeSpriteFromTile(keyIconX, keyY, key)

  clearText()

  // Add completion text
  if (level === lastLevelId) {
    addText("You win!", {
      y: 6,
      color: color`6`
    })
    addText("More levels coming", {
      y: 8,
      color: color`2`
    })
    addText("soon(tm)", {
      y: 9,
      color: color`2`
    })
    return
  }

  addText(`${gameState.coinsObtained.toString()}/${gameState.initialCoinCount}`, {
    x: coinTextX,
    y: coinY,
    color: gameState.coinsObtained === gameState.initialCoinCount ? color`6` : color`3`
  })
  addSprite(coinIconX, coinY, coinHud)

  addText(gameState.hasKey ? "Got key!" : "No key :(", {
    x: 2,
    y: 15,
    color: gameState.hasKey ? color`D` : color`3`
  })
}

function loadLevel() {
  setMap(levels[level])
  gameState = Object.create(initialGameState)
  gameState.initialCoinCount = getAll(coin).length
}

// Utils

function isTouchingAny(tileTypes) {
  let playerTile = getFirst(player)
  if (!playerTile) return false;

  let tiles = tileTypes.map((tileType) => getAll(tileType)).flat()
  let result = false

  tiles.forEach((tile) => {
    if ((tile.x == playerTile.x) && (tile.y == playerTile.y)) {
      // Doesn't work without a variable for some reason. It should!
      result = {
        x: tile.x,
        y: tile.y,
      }
    }
  })
  return result
}

function removeSpriteFromTile(x, y, spriteType) {
  let spritesToRemove = getTile(x, y).filter(sprite => sprite.type === spriteType)
  spritesToRemove.forEach(sprite => sprite.remove())
}
