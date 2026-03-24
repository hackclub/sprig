/*
@title: plant survivor
@description: In my game you are a plant. You need to make sure you get enough water and sunlight while not getting hit bye the flying birds.
@author: Olli Becker
@tags: ['tutorial']
@addedOn: 2025-9-28
*/

const player = "p"
const sun = "S"
const cloud = "C"
const bird = "b"
const ground = "g"
const background = "j"
const sky1 = "i"
const sky2 = "q"
const sky3 = "w"
const sky4 = "e"
const sky5 = "r"
const sky6 = "t"
const sky = "h"

setLegend(
  [player, bitmap`
...333333333....
...3333333333...
....33333333....
....33333333....
.....333333.....
.....333333.....
.....333333.....
......3333......
.......44.......
.......44.......
.......44.444...
......44444444..
......444.444...
.......44.......
.......44.......
.......44.......`],

  [sun, bitmap`
....66666666....
..666666666666..
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
..666666666666..
....66666666....`],

  [cloud, bitmap`
....22222222....
..222222222222..
.22222222222222.
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
.22222222222222.
..222222222222..
....22222222....`],

  [bird, bitmap`
....00CCCC00....
.....00CC00.....
......0CC0......
..00000CC00000..
.00CCCCCCCCC000.
.0CCCCCCCCCCCC0.
..0CCCCCCCCCC0..
...00C0CC0C00...
.....070070.....
......0CC0......
......9999......
......9999......
.......99.......
................
................
................`],

  [ground, bitmap`
4444444444444444
44DD44DDD444DD44
44DD44DDDDDDDDDD
DDDD44DDDDDDDCCD
DDDDDDDDDDDDDCCD
DDDDDDDDDDCCDDDD
DDDCCCCDDDCCDDDD
CCDCCCCDDDCCCCCC
CCDCCCCDDDCCCCCC
CCCCCCCDDDCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],

  [background, bitmap`
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

  [sky, bitmap`
0000000000000000
0000000000000000
0000000200000000
0002000000000000
0000000000002000
0000000000000000
0000002000000000
0020000000000000
0000000000000000
0000000002000000
0000000000000000
0000020000020000
0000000000000000
0020000000000000
0000000000000020
0000000000000000`],

  [sky1, bitmap`
0000000000000000
0000000000000000
0000000005500000
0055555555555000
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
  
  [sky2, bitmap`
0000000000000000
0000000000000000
0020000000000200
0000000000000000
0000000002000000
0000020000000000
0000000000000000
0000000000000000
0000000020000000
0000000000000000
0000000000000000
0000000000000200
0000000002000000
0000000000000000
0000000000000000
0000000000000000`],
  
  [sky3, bitmap`
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
  
  [sky4, bitmap`
5555555555555555
5555555555555555
5555555555555555
555HHHHHHHHHHH55
55HHHHHHHHHHHHH5
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  
  [sky5, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHH88888HHHHH
HHHH888888888HHH
HH88888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
  
  [sky6, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`]
)

const W = 10
const H = 8
const level = map`
..........
..........
..........
..........
..........
..........
..........
gggggggggg`
const level1 = map`
qhqqhqhqhq
hqhqqhhqhh
iiiiiiiiii
wwwwwwwwww
eeeeeeeeee
rrrrrrrrrr
tttttttttt
gggggggggg`



setMap(level)
setSolids([player, ground])
setBackground(background)
addSprite(4, H - 2, player)

let sunX = 0
const sunY = 0
const cloudY = 1 
let sunSpeed = 1
let isNight = false
let nightTicksLeft = 0
const NIGHT_DURATION = 12
let days = 0

let sunlight = 70
const SUN_MAX = 100
const SUN_GAIN_PER_TICK = 4.5
let SUN_DECAY_PER_TICK = 0.2

let SUN_WIDTH = 3
let SUN_MOVE_INTERVAL = 1
let sunMoveCounter = 0

let water = 80
const WATER_MAX = 100
let WATER_DECAY_PER_TICK = 0.40
const WATER_FROM_RAIN = 2 

let tickMs = 350
let running = true

const CLOUD_SPAWN_BASE = 0.05
const BIRD_SPAWN_BASE = 0.1
let cloudSpawnChance = CLOUD_SPAWN_BASE
let birdSpawnChance = BIRD_SPAWN_BASE

let CLOUD_WIDTH = 3
let clouds = [] 
let cloudSpawnCooldown = 0 

const CLOUD_SPAWN_CAP = 0.25
const BIRD_SPAWN_CAP = 0.60
const MIN_SUN_WIDTH = 1
const MIN_SUN_MOVE_INTERVAL = 1
const MAX_SUN_DECAY = 6.0
const MAX_WATER_DECAY = 2.0
const MIN_CLOUD_WIDTH = 2

let gameLoop = null

function getPlayer() {
  return getFirst(player)
}

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v))
}

function clearHUD() {
  clearText()
}

function drawHUD() {

  if (!running) return
  
  clearHUD()
  addText(`Day: ${days}`, { x: 0, y: 1, color: color`3` })
  addText(`Sun: ${Math.floor(sunlight)}%`, { x: 0, y: 2, color: color`6` })
  addText(`Water: ${Math.floor(water)}%`, { x: 0, y: 3, color: color`5` })
  
  if (isNight) {
    addText("NIGHT", { x: 7, y: 1, color: color`2` })
  }
}

function isCloudBlocking(x) {
  for (const cloudData of clouds) {
    const cloudRadius = Math.floor(CLOUD_WIDTH / 2)
    if (Math.abs(x - cloudData.x) <= cloudRadius) {
      return true
    }
  }
  return false
}

function isPlayerUnderCloud() {
  const P = getPlayer()
  if (!P) return false
  
  for (const cloudData of clouds) {
    const cloudRadius = Math.floor(CLOUD_WIDTH / 2)
    if (Math.abs(P.x - cloudData.x) <= cloudRadius) {
      return true
    }
  }
  return false
}

function updateDifficulty() {
  cloudSpawnChance = clamp(CLOUD_SPAWN_BASE * (1 + days * 0.05), CLOUD_SPAWN_BASE, CLOUD_SPAWN_CAP)
  birdSpawnChance = clamp(BIRD_SPAWN_BASE * (1 + days * 0.15), BIRD_SPAWN_BASE, BIRD_SPAWN_CAP)
  SUN_WIDTH = clamp(3 - Math.floor(days / 20), MIN_SUN_WIDTH, 3)
  SUN_MOVE_INTERVAL = clamp(2 - Math.floor(days / 5), MIN_SUN_MOVE_INTERVAL, 2)
  SUN_DECAY_PER_TICK = clamp(1 + days * 0.02, 2, MAX_SUN_DECAY)
  WATER_DECAY_PER_TICK = clamp(0.15 + days * 0.04, 0.50, MAX_WATER_DECAY)
  CLOUD_WIDTH = clamp(4 - Math.floor(days / 2), MIN_CLOUD_WIDTH, 3)
}

onInput("a", () => {
  const P = getPlayer()
  if (!P) return
  P.x = clamp(P.x - 1, 0, W - 1)
})

onInput("d", () => {
  const P = getPlayer()
  if (!P) return
  P.x = clamp(P.x + 1, 0, W - 1)
})

afterInput(() => {
  if (running) drawHUD()
})

function endGame(reason) {
  running = false
  if (gameLoop) {
    clearInterval(gameLoop)
    gameLoop = null
  }
  clearText()
  addText("GAME OVER", { x: 3, y: 2, color: color`3` })
  addText(reason, { x: 0, y: 4, color: color`2` })
  addText(`Days: ${days}`, { x: 0, y: 6, color: color`6` })
}

function spawnCloud() {
  if (clouds.length >= 3 || cloudSpawnCooldown > 0) {
    return
  }
  
  const fromLeft = Math.random() < 0.5
  const speed = 0.3 + Math.random() * 0.7 // Speed 0.3 to 1.0 (more variation)
  const moveInterval = 1 + Math.floor(Math.random() * 3) // 1-3 ticks between moves
  
  clouds.push({
    x: fromLeft ? 0 : W - 1,
    speed: fromLeft ? speed : -speed,
    moveCounter: 0,
    moveInterval: moveInterval
  })
  
  cloudSpawnCooldown = 8 + Math.floor(Math.random() * 12) // 8-20 tick cooldown
}

function spawnBird() {
  const P = getPlayer()
  const startX = Math.floor(Math.random() * W)
  const b = addSprite(startX, 0, bird)
  if (!b) return
  const targetX = P ? P.x : Math.floor(W / 2)
  b.vx = targetX > b.x ? 1 : (targetX < b.x ? -1 : 0)
  const extraVy = Math.floor(days / 4)
  b.vy = clamp(1 + extraVy, 1, 4)
  b.x = Math.round(b.x)
  b.y = Math.round(b.y)
}



function moveEnemiesAndWeather() {
  if (cloudSpawnCooldown > 0) {
    cloudSpawnCooldown--
  }
  
  for (let i = clouds.length - 1; i >= 0; i--) {
    const cloudData = clouds[i]
    
    cloudData.moveCounter++
    if (cloudData.moveCounter >= cloudData.moveInterval) {
      cloudData.x += cloudData.speed > 0 ? 1 : -1
      cloudData.moveCounter = 0
    }
    
    if (cloudData.x < -1 || cloudData.x > W) {
      clouds.splice(i, 1)
    }
  }

  getAll(bird).forEach(b => {
    if (typeof b.vx !== "number") b.vx = 0
    if (typeof b.vy !== "number") b.vy = 1

    b.x = Math.round(b.x + b.vx)
    b.y = Math.round(b.y + b.vy)

    if (Math.random() < 0.06) {
      b.vx += (Math.random() < 0.5 ? -1 : 1)
      if (b.vx > 2) b.vx = 2
      if (b.vx < -2) b.vx = -2
    }

    const P = getPlayer()
    if (P && Math.round(b.x) === P.x && Math.round(b.y) === P.y) {
      endGame("A bird hit you!")
    }

    if (b.y >= H - 1) {
      b.remove()
      return
    }
    if (b.x < -3 || b.x > W + 3) {
      b.remove()
      return
    }


  })
}



// main tick
function tick() {
  if (!running) return


  if (!isNight) {
    sunMoveCounter++
    if (sunMoveCounter >= SUN_MOVE_INTERVAL) {
      setBackground(background)
      sunX += sunSpeed
      sunMoveCounter = 0
    }
    if (sunX >= W) {
      setBackground(sky)
      isNight = true
      nightTicksLeft = NIGHT_DURATION
      sunX = W - 1
    }
  } else {
    nightTicksLeft -= 1
    if (nightTicksLeft <= 0) {
      days += 1
      water = clamp(water - 8, 0, WATER_MAX) 
      isNight = false
      sunX = 0
      updateDifficulty()
    }
  }

  // Spawn entities - now with better cloud spawning logic
  if (Math.random() < cloudSpawnChance) spawnCloud()
  if (Math.random() < birdSpawnChance) spawnBird()

  moveEnemiesAndWeather()

  // Sunlight logic
  const P = getPlayer()
  const radius = Math.floor(SUN_WIDTH / 2)
  let underSun = false
  if (P && !isNight && Math.abs(P.x - sunX) <= radius && !isCloudBlocking(P.x)) {
    underSun = true
  }

  if (underSun) {
    sunlight = clamp(sunlight + SUN_GAIN_PER_TICK, 0, SUN_MAX)
  } else {
    if (P && !isNight && Math.abs(P.x - sunX) <= radius && isCloudBlocking(P.x)) {
      // Partial sunlight when blocked by cloud
      sunlight = clamp(sunlight + Math.floor(SUN_GAIN_PER_TICK / 3), 0, SUN_MAX)
    } else {
      sunlight = clamp(sunlight - SUN_DECAY_PER_TICK, 0, SUN_MAX)
    }
  }

  // Water logic - now works like sun!
  if (isPlayerUnderCloud()) {
    water = clamp(water + WATER_FROM_RAIN, 0, WATER_MAX)
  } else {
    water = clamp(water - WATER_DECAY_PER_TICK, 0, WATER_MAX)
  }

  // Check deaths
  if (sunlight <= 0) {
    endGame("No sunlight!")
    return
  }
  if (water <= 0) {
    endGame("No water!")
    return
  }

  // Draw sun
  getAll(sun).forEach(s => s.remove())
  if (!isNight) {
    const radius2 = Math.floor(SUN_WIDTH / 2)
    for (let dx = -radius2; dx <= radius2; dx++) {
      const sx = clamp(sunX + dx, 0, W - 1)
      addSprite(sx, sunY, sun)
    }
  }

  getAll(cloud).forEach(c => c.remove())
  for (const cloudData of clouds) {
    if (cloudData.x >= 0 && cloudData.x < W) {
      const cloudRadius = Math.floor(CLOUD_WIDTH / 2)
      for (let dx = -cloudRadius; dx <= cloudRadius; dx++) {
        const cx = clamp(cloudData.x + dx, 0, W - 1)
        addSprite(cx, cloudY, cloud)
      }
    }
  }

  drawHUD()
}

// Initialize and start
updateDifficulty()
if (gameLoop) {
  clearInterval(gameLoop)
  gameLoop = null
}
gameLoop = setInterval(tick, tickMs)

// Initial HUD
drawHUD()
