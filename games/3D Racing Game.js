/*
@title: 3D Racing Game
@description: A pseudo-3D racing game with obstacles and curves
@author: Eren Karababa
@tags: ['racing', '3d']
*/

let sprites = []
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!£$%^&*()_+-=[]{}#~'@;:/?>,<|.¬"
let idState = 0
const background = getNextId()

let playerX = 0
let speed = 60
let distance = 0
let gameOver = false
let obstacles = []
let scenery = []
let score = 0

initializeSprites()
let tileMap = ""
for (let y = 0; y < 8; y++) {
  for (let x = 0; x < 10; x++) {
    tileMap += sprites[x][y].id
  }
  tileMap += "\n"
}
flushScreen()
setMap(tileMap)
setBackground(background)

function gameLoop() {
  if (!gameOver) {
    update()
    render()
    setTimeout(gameLoop, 80)
  } else {
    render()
  }
}

function update() {
  distance += speed
  score = Math.floor(distance / 100)
  
  if (obstacles.length < 2) {
    let difficulty = Math.min(score / 100, 1)
    let spawnDistance = 5000 + Math.random() * 3000
    let obstacleX = (Math.random() - 0.5) * (1.0 - difficulty * 0.2)
    
    obstacles.push({
      x: obstacleX,
      z: distance + spawnDistance,
      type: Math.random() > 0.5 ? 'rock' : 'cone'
    })
  }
  
  if (scenery.length < 10) {
    let types = ['house', 'house', 'tree', 'tree']
    let type = types[Math.floor(Math.random() * types.length)]
    let side = Math.random() > 0.5 ? 'left' : 'right'
    let spawnDistance = 3000 + Math.random() * 4000
    let xPos = side === 'left' ? -2.0 - Math.random() * 1.0 : 2.0 + Math.random() * 1.0
    
    scenery.push({
      x: xPos,
      z: distance + spawnDistance,
      type: type,
      side: side
    })
  }
  
  obstacles = obstacles.filter(obs => obs.z > distance - 100)
  scenery = scenery.filter(obj => obj.z > distance - 100)
  
  for (let obs of obstacles) {
    let obsDistance = obs.z - distance
    if (obsDistance > 0 && obsDistance < 150) {
      let curve = getCurve(obs.z)
      let depth = obsDistance
      let scale = 500 / depth
      
      let obsScreenX = 80 + (curve - playerX + obs.x) * (1000 / depth)
      let carScreenX = 80
      
      let dx = Math.abs(obsScreenX - carScreenX)
      
      if (dx < 15 && obsDistance < 100) {
        gameOver = true
      }
    }
  }
  
  if (Math.abs(playerX) > 1.3) {
    gameOver = true
  }
}

function getCurve(z) {
  return Math.sin(z / 1000) * 0.5
}

function render() {
  clear()
  
  for (let y = 0; y < 64; y++) {
    for (let x = 0; x < 160; x++) {
      setPixel(x, y, "5")
    }
  }
  
  for (let y = 64; y < 128; y++) {
    for (let x = 0; x < 160; x++) {
      setPixel(x, y, "4")
    }
  }
  
  for (let y = 64; y < 128; y++) {
    let depth = 500 / (y - 63)
    let worldZ = distance + depth
    
    let curve = getCurve(worldZ)
    
    let roadWidth = 3000 / depth
    
    let roadCenterX = 80 + (curve - playerX) * (1000 / depth)
    
    let stripeSize = Math.floor(worldZ / 50) % 2
    let roadColor = stripeSize === 0 ? "L" : "1"
    
    for (let x = 0; x < 160; x++) {
      let dx = x - roadCenterX
      
      if (Math.abs(dx) < roadWidth / 2) {
        setPixel(x, y, roadColor)
        
        if (Math.abs(dx) > roadWidth / 2 - 3) {
          setPixel(x, y, "2")
        }
        
        if (Math.abs(dx) < 2 && Math.floor(worldZ / 30) % 3 < 1) {
          setPixel(x, y, "6")
        }
      } else if (Math.abs(dx) < roadWidth / 2 + 100 / depth) {
        setPixel(x, y, "D")
      }
    }
  }
  
  for (let obj of scenery) {
    let objDistance = obj.z - distance
    if (objDistance > 0 && objDistance < 6000) {
      let curve = getCurve(obj.z)
      let depth = objDistance
      let scale = 500 / depth
      
      let objX = 80 + (curve - playerX + obj.x) * (1000 / depth)
      let objY = 64 + scale
      let objSize = scale * 1.5
      
      if (objX > -80 && objX < 240 && objY > 30 && objY < 128 && objSize > 0.5) {
        if (obj.type === 'house') {
          drawHouse(objX, objY, objSize)
        } else if (obj.type === 'tree') {
          drawTree(objX, objY, objSize * 0.7)
        }
      }
    }
  }
  
  for (let obs of obstacles) {
    let obsDistance = obs.z - distance
    if (obsDistance > 0 && obsDistance < 6000) {
      let curve = getCurve(obs.z)
      let depth = obsDistance
      let scale = 500 / depth
      
      let obsX = 80 + (curve - playerX + obs.x) * (1000 / depth)
      let obsY = 64 + scale
      let obsSize = scale * 1.2
      
      if (obsX > -50 && obsX < 210 && obsY > 0 && obsY < 128 && obsSize > 1) {
        if (obs.type === 'rock') {
          drawRock(obsX, obsY, obsSize)
        } else {
          drawCone(obsX, obsY, obsSize)
        }
      }
    }
  }
  
  let carX = 80
  let carY = 108
  
  for (let dy = 0; dy < 16; dy++) {
    for (let dx = -6; dx <= 6; dx++) {
      if (dy < 3 || dy > 13) {
        if (Math.abs(dx) < 5) {
          setPixel(carX + dx, carY + dy, "L")
        }
      } else {
        setPixel(carX + dx, carY + dy, "L")
      }
    }
  }
  
  for (let dy = 3; dy < 7; dy++) {
    for (let dx = -4; dx <= 4; dx++) {
      setPixel(carX + dx, carY + dy, "5")
    }
  }
  
  for (let dy = 14; dy < 16; dy++) {
    setPixel(carX - 5, carY + dy, "0")
    setPixel(carX - 4, carY + dy, "0")
    setPixel(carX + 4, carY + dy, "0")
    setPixel(carX + 5, carY + dy, "0")
  }
  
  for (let dy = 0; dy < 2; dy++) {
    setPixel(carX - 5, carY + dy, "0")
    setPixel(carX - 4, carY + dy, "0")
    setPixel(carX + 4, carY + dy, "0")
    setPixel(carX + 5, carY + dy, "0")
  }
  
  setPixel(carX - 3, carY + 8, "3")
  setPixel(carX - 2, carY + 8, "3")
  setPixel(carX + 2, carY + 8, "3")
  setPixel(carX + 3, carY + 8, "3")
  
  for (let dx = -1; dx <= 1; dx++) {
    setPixel(carX + dx, carY, "6")
    setPixel(carX + dx, carY + 1, "6")
  }
  
  if (gameOver) {
    for (let y = 45; y < 95; y++) {
      for (let x = 25; x < 135; x++) {
        if (y === 45 || y === 94 || x === 25 || x === 134) {
          setPixel(x, y, "3")
        } else {
          setPixel(x, y, "0")
        }
      }
    }
    
    let gameOverText = [
      [0,1,1,0,0,1,1,1,0,1,0,0,1,0,1,1,1],
      [1,0,0,0,0,1,0,1,0,1,1,0,1,0,1,0,0],
      [1,0,1,0,0,1,1,1,0,1,0,1,1,0,1,1,0],
      [1,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,0],
      [0,1,1,0,0,1,0,1,0,1,0,0,1,0,1,1,1]
    ]
    
    let overText = [
      [1,1,1,0,1,0,1,0,1,1,1,0,1,1,1],
      [1,0,1,0,1,0,1,0,1,0,0,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,1,0,0,1,1,0],
      [1,0,1,0,0,1,0,0,1,0,0,0,1,0,1],
      [1,1,1,0,0,1,0,0,1,1,1,0,1,0,1]
    ]
    
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 17; x++) {
        if (gameOverText[y][x] === 1) {
          setPixel(35 + x * 2, 52 + y * 2, "3")
          setPixel(36 + x * 2, 52 + y * 2, "3")
          setPixel(35 + x * 2, 53 + y * 2, "3")
          setPixel(36 + x * 2, 53 + y * 2, "3")
        }
      }
    }
    
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 15; x++) {
        if (overText[y][x] === 1) {
          setPixel(43 + x * 2, 64 + y * 2, "2")
          setPixel(44 + x * 2, 64 + y * 2, "2")
        }
      }
    }
    
    let jText = [
      [1,1,1,0,0,1,1,1,0,0,1,1,1],
      [0,1,0,0,0,0,1,0,0,0,1,0,1],
      [0,1,0,0,0,0,1,0,0,0,1,1,0],
      [1,0,1,0,0,0,1,0,0,0,1,0,1],
      [0,1,0,0,0,0,1,0,0,0,1,0,1]
    ]
    
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 13; x++) {
        if (jText[y][x] === 1) {
          setPixel(45 + x * 2, 78 + y * 2, "6")
          setPixel(46 + x * 2, 78 + y * 2, "6")
        }
      }
    }
  }
  
  flushScreen()
}

function drawTree(x, y, size) {
  x = Math.floor(x)
  y = Math.floor(y)
  size = Math.max(1, Math.floor(size))
  
  if (x < -50 || x >= 210 || y < 0 || y >= 128) return
  
  for (let dy = 0; dy < size * 2; dy++) {
    for (let dx = -size/3; dx <= size/3; dx++) {
      if (y + dy < 128 && y + dy >= 0) {
        setPixel(x + dx, y + dy, "C")
      }
    }
  }
  
  for (let dy = -size; dy < size; dy++) {
    for (let dx = -size; dx <= size; dx++) {
      if (dx * dx + dy * dy < size * size) {
        if (y + dy < 128 && y + dy >= 0) {
          setPixel(x + dx, y + dy, "D")
        }
      }
    }
  }
}

function drawRock(x, y, size) {
  x = Math.floor(x)
  y = Math.floor(y)
  size = Math.max(2, Math.floor(size))
  
  if (x < -30 || x >= 190 || y < 0 || y >= 128) return
  
  for (let dy = 0; dy < size * 1.5; dy++) {
    for (let dx = -size * 0.8; dx <= size * 0.8; dx++) {
      if (Math.abs(dx) + Math.abs(dy - size * 0.5) < size * 0.9) {
        if (y + dy < 128 && y + dy >= 0) {
          setPixel(x + dx, y + dy, "L")
        }
      }
    }
  }
}

function drawCone(x, y, size) {
  x = Math.floor(x)
  y = Math.floor(y)
  size = Math.max(2, Math.floor(size))
  
  if (x < -30 || x >= 190 || y < 0 || y >= 128) return
  
  for (let dy = 0; dy < size * 1.8; dy++) {
    let width = Math.max(1, (size * 1.8 - dy) * 0.4)
    for (let dx = -width; dx <= width; dx++) {
      if (y + dy < 128 && y + dy >= 0) {
        setPixel(x + dx, y + dy, "9")
      }
    }
  }
  
  let stripe1Y = Math.floor(size * 0.6)
  let stripe2Y = Math.floor(size * 1.2)
  for (let dx = -size * 0.3; dx <= size * 0.3; dx++) {
    if (y + stripe1Y < 128 && y + stripe1Y >= 0) setPixel(x + dx, y + stripe1Y, "2")
    if (y + stripe2Y < 128 && y + stripe2Y >= 0) setPixel(x + dx, y + stripe2Y, "2")
  }
}

function drawHouse(x, y, size) {
  x = Math.floor(x)
  y = Math.floor(y)
  size = Math.max(2, Math.floor(size))
  
  if (x < -50 || x >= 210 || y < 0 || y >= 128) return
  
  for (let dy = size; dy < size * 3; dy++) {
    for (let dx = -size; dx <= size; dx++) {
      if (y + dy < 128 && y + dy >= 0) {
        setPixel(x + dx, y + dy, "3")
      }
    }
  }
  
  for (let dy = 0; dy < size; dy++) {
    let width = size * (1 - dy / size)
    for (let dx = -width; dx <= width; dx++) {
      if (y + dy < 128 && y + dy >= 0) {
        setPixel(x + dx, y + dy, "C")
      }
    }
  }
  
  let windowSize = Math.max(1, size * 0.3)
  for (let dy = 0; dy < windowSize; dy++) {
    for (let dx = 0; dx < windowSize; dx++) {
      if (y + size * 1.5 + dy < 128 && y + size * 1.5 + dy >= 0) {
        setPixel(x - size * 0.5 + dx, y + size * 1.5 + dy, "6")
      }
    }
  }
}

function initializeSprites() {
  for (let x = 0; x < 10; x++) {
    sprites.push([])
    for (let y = 0; y < 8; y++) {
      sprites[x].push({
        id: getNextId(),
        tile: `0000000000000000
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
`
      })
    }
  }
}

function getTilemap() {
  const output = []
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 8; y++) {
      output.push([sprites[x][y].id, sprites[x][y].tile])
    }
  }
  return output
}

function getNextId() {
  let id = alphabet[idState]
  idState++
  return id
}

function setPixel(x, y, colour) {
  x = Math.floor(x)
  y = Math.floor(y)
  if (x >= 0 && x < 160 && y >= 0 && y < 128) {
    const tileX = Math.floor(x / 16)
    const tileY = Math.floor(y / 16)
    const subTileX = x % 16
    const subTileY = y % 16
    const strIndex = (subTileY * 17) + subTileX
    sprites[tileX][tileY].tile = strReplaceAt(sprites[tileX][tileY].tile, strIndex, colour)
  }
}

function clear() {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 8; y++) {
      sprites[x][y].tile = `0000000000000000
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
`
    }
  }
}

function flushScreen() {
  let tilemap = getTilemap()
  setLegend(...tilemap, [background, bitmap`0000000000000000
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
0000000000000000`])
}

function strReplaceAt(str, index, replacement) {
  return str.substring(0, index) + replacement + str.substring(index + 1)
}

onInput("a", () => {
  playerX -= 0.15
})

onInput("d", () => {
  playerX += 0.15
})

onInput("w", () => {
  speed = Math.min(200, speed + 10)
})

onInput("s", () => {
  speed = Math.max(50, speed - 10)
})

onInput("j", () => {
  playerX = 0
  speed = 60
  distance = 0
  gameOver = false
  obstacles = []
  scenery = []
  score = 0
  gameLoop()
})

gameLoop()