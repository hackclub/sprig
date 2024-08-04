/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Spring
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"

const background = "b"

const wall = "w"
const wall_no_stick = "n"

const arrow_0 = "0"
const arrow_22 = "1"
const arrow_45 = "2"
const arrow_67 = "3"
const arrow_90 = "4"
const arrow_112 = "5"
const arrow_135 = "6"
const arrow_157 = "7"
const arrow_180 = "8"
const arrow_202 = "9"
const arrow_225 = "!"
const arrow_247 = "@"
const arrow_270 = "#"
const arrow_292 = "$"
const arrow_315 = "%"
const arrow_337 = "^"

const arrowCounters = [
  arrow_0,
  arrow_22,
  arrow_45,
  arrow_67,
  arrow_90,
  arrow_112,
  arrow_135,
  arrow_157,
  arrow_180,
  arrow_202,
  arrow_225,
  arrow_247,
  arrow_270,
  arrow_292,
  arrow_315,
  arrow_337
]

const arrowIncrement = 22.5
const lastArrow = 360 / arrowIncrement - 1

setLegend(
  [ arrow_0, bitmap`
................
................
................
.........00.....
.........000....
...........000..
............000.
.000000000000000
.000000000000000
............000.
...........000..
.........000....
.........00.....
................
................
................` ],
  [ arrow_22, bitmap`
.......000000...
........00000000
............0000
..........00000.
.......00000..0.
....000000...00.
..00000.....00..
.000.......000..
............0...
................
................
................
................
................
................
................` ],
  [ arrow_45, bitmap`
................
................
................
................
.....0000000....
.....0000000....
........0000....
.......00000....
......000.00....
.....000..00....
....000...00....
...000..........
..000...........
.000............
000.............
00..............` ],
  [ arrow_67, bitmap`
.............00.
..........00000.
........000.000.
.......000..0000
........0..00.00
...........00.00
..........00..00
..........00..00
..........00...0
.........00.....
.........00.....
.........00.....
........00......
........00......
.........0......
................` ],
  [ arrow_90, bitmap`
.......00.......
......0000......
.....000000.....
.....000000.....
....00.00.00....
...00..00..00...
...00..00..00...
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
................` ],
  [ arrow_112, bitmap`
.00.............
.00000..........
.000.000........
0000..000.......
00.00..0........
00.00...........
00..00..........
00..00..........
0...00..........
.....00.........
.....00.........
.....00.........
......00........
......00........
......0.........
................` ],
  [ arrow_135, bitmap`
................
................
................
................
....0000000.....
....0000000.....
....0000........
....00000.......
....00.000......
....00..000.....
....00...000....
..........000...
...........000..
............000.
.............000
..............00` ],
  [ arrow_157, bitmap`
...000000.......
00000000........
0000............
.00000..........
.0..00000.......
.00...000000....
..00.....00000..
..000.......000.
...0............
................
................
................
................
................
................
................` ],
  [ arrow_180, bitmap`
................
................
................
.....00.........
....000.........
..000...........
.000............
000000000000000.
000000000000000.
.000............
..000...........
....000.........
.....00.........
................
................
................` ],
  [ arrow_202, bitmap`
................
................
................
................
................
................
................
...0............
..000.......000.
..00.....00000..
.00...000000....
.0..00000.......
.00000..........
0000............
00000000........
...000000.......` ],
  [ arrow_225, bitmap`
..............00
.............000
............000.
...........000..
..........000...
....00...000....
....00..000.....
....00.000......
....00000.......
....0000........
....0000000.....
....0000000.....
................
................
................
................` ],
  [ arrow_247, bitmap`
................
......0.........
......00........
......00........
.....00.........
.....00.........
.....00.........
0...00..........
00..00..........
00..00..........
00.00...........
00.00..0........
0000..000.......
.000.000........
.00000..........
.00.............` ],
  [ arrow_270, bitmap`
................
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
...00..00..00...
...00..00..00...
....00.00.00....
.....000000.....
.....000000.....
......0000......
.......00.......` ],
  [ arrow_292, bitmap`
................
.........0......
........00......
........00......
.........00.....
.........00.....
.........00.....
..........00...0
..........00..00
..........00..00
...........00.00
........0..00.00
.......000..0000
........000.000.
..........00000.
.............00.` ],
  [ arrow_315, bitmap`
00..............
000.............
.000............
..000...........
...000..........
....000...00....
.....000..00....
......000.00....
.......00000....
........0000....
.....0000000....
.....0000000....
................
................
................
................` ],
  [ arrow_337, bitmap`
................
................
................
................
................
................
................
............0...
.000.......000..
..00000.....00..
....000000...00.
.......00000..0.
..........00000.
............0000
........00000000
.......000000...` ],
  [ player, bitmap`
...0000000000...
..000000000000..
.00033333333000.
0003333333333000
0033333333333300
0033300330033300
0033300330033300
0033300330033300
0033333333333300
0033333333333300
0033333333333300
0033333333333300
0033333333333000
.00033333333000.
..000000000000..
...0000000000...` ],
  [ background, bitmap`
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
7777777777777777` ],
  [ wall, bitmap`
0000000000000000
0000000000000000
0099999999999900
0099999999999900
0099999999999900
0099999999999900
0099999999999900
0099999999999900
0099999999999900
0099999999999900
0099999999999900
0099999999999900
0099999999999900
0099999999999900
0000000000000000
0000000000000000` ],
  [ wall_no_stick, bitmap`
.00000000000000.
0000000000000000
00LLL111LLLLLL00
00LL111LLLLLL100
00L111LLLLLL1L00
00111LLLLLL1LL00
0011LLLLLL1LLL00
001LLLLLL1LLL100
00LLLLLL1LLL1100
00LLLLL1LLL11L00
00LLLL1LLL11LL00
00LLL1LLL11LLL00
00LL1LLL11LLLL00
00L1LLL11LLLLL00
0000000000000000
.00000000000000.` ]
)

const melody = tune`
150: D4-150,
150: D4-150,
150: F4-150,
150: F4-150,
150: E4-150,
150: E4-150,
300,
150: D4-150,
150: D4-150,
150: F4-150,
150: F4-150,
150: E4-150,
150: E4-150,
300,
150: D4-150 + F4-150,
150: D4-150 + F4-150,
150: F4-150 + A4-150,
150: F4-150 + A4-150,
150: E4-150 + G4-150,
150: E4-150 + G4-150,
300,
150: D4-150 + F4-150,
150: D4-150 + F4-150,
150: F4-150 + A4-150,
150: F4-150 + A4-150,
150: E4-150 + G4-150,
150: E4-150 + G4-150,
300`

const melody2 = tune`
150: D4-150 + F4-150,
150: D4-150 + F4-150,
150: F4-150 + A4-150,
150: F4-150 + A4-150,
150: E4-150 + G4-150,
150: E4-150 + G4-150,
300,
150: D4-150 + F4-150,
150: D4-150 + F4-150,
150: F4-150 + A4-150,
150: F4-150 + A4-150,
150: E4-150 + G4-150,
150: E4-150 + G4-150,
300,
150: F4-150 + A4-150,
150: F4-150 + A4-150,
150: A4-150 + C5-150,
150: A4-150 + C5-150,
150: B4-150 + G4-150,
150: B4-150 + G4-150,
300,
150: F4-150 + A4-150,
150: F4-150 + A4-150,
150: A4-150 + C5-150,
150: A4-150 + C5-150,
150: B4-150 + G4-150,
150: B4-150 + G4-150,
300`

setSolids([ player, wall, wall_no_stick ])

let level = 0
const levels = [
  map`
nnnnnnnnnnnnnnnnnnnn
n..................n
n..................n
n..................n
n..................n
nww.ww.ww.ww.ww.ww.n
n..................n
n..................n
n..................n
n..................n
n..w...w...w...w...n
n..................n
nw...w...w...w...w.n
n............w.....n
n..................n
n........n.........n
n..................n
n..................n
n.w...w.w.w.w.w.w.wn
n.wwwwwwwwwwwwwwwwwn
n.n...n............n
n.n...n............n
n.n.........ww..wwwn
n.......n..........n
np......n..........n
wwwwwwwwwwwwwwwwwwww`
]

setBackground(background)

setMap(levels[level])

setPushables({
  [ player ]: []
})

let fullX = null
let fullY = null
let xVel = 0
let yVel = 0
let gravity = 0.1

let inAir = false

let arrowType = null

let fullMap = null

onInput("s", () => {
  // getFirst(player).y += 1
  // const arrowSprite = addSprite(2, 2, arrow_0)
  // const arrowSprite45 = addSprite(3, 2, arrow_45)
  // arrowSprite.rotate = 20
})

onInput("i", () => {
  if (arrowType === null && !inAir) {
    let newArrowType = arrowCounters.indexOf(arrow_0)
    while (checkArrowIsInvalid(arrowCounters[newArrowType])) {
      newArrowType += 1
      if (newArrowType === lastArrow) throw new Error("No possible moves")
    }
    newArrowType = arrowCounters[newArrowType]
    
    addSprite(0, 0, newArrowType)
    arrowType = newArrowType
    setArrowPosition()
  }
})

// TODO: simplify code in "j" and "l" listeners to avoid duplicating
onInput("j", () => {
  if (arrowType !== null) {
    const arrowTypeNum = arrowCounters.indexOf(arrowType)
    
    const newType = arrowCounters[(arrowTypeNum === lastArrow) ? 0 : (arrowTypeNum + 1)]
    
    const isInvalid = checkArrowIsInvalid(newType)

    if (isInvalid) return
    
    const arrowSprite = getFirst(arrowType)
    arrowSprite.type = newType
    arrowType = newType

    setArrowPosition()
  }
})

onInput("l", () => {
  if (arrowType !== null) {
    const arrowTypeNum = arrowCounters.indexOf(arrowType)
    
    const newType = arrowCounters[(arrowTypeNum === 0) ? lastArrow : (arrowTypeNum - 1)]
    
    const isInvalid = checkArrowIsInvalid(newType)

    if (isInvalid) return
    
    const arrowSprite = getFirst(arrowType)
    arrowSprite.type = newType
    arrowType = newType

    setArrowPosition()
  }
})

onInput("k", () => {
  if (arrowType !== null) {
    inAir = true
    
    const deg = getArrowDeg()
    const rad = deg * (Math.PI / 180)

    const arrowSprite = getFirst(arrowType)
    arrowSprite.remove()
    arrowType = null

    // note that startVel should never be larger than 1
    const startVel = 1
    xVel = startVel * Math.cos(rad)
    yVel = -startVel * Math.sin(rad)

    setMapFromParsed(fullMap)
    
    const playerSprite = getFirst(player)
    fullX = playerSprite.x
    fullY = playerSprite.y
    
    centerMap()
    
    const interval = setInterval(() => {
      setMapFromParsed(fullMap)
      
      const p = getFirst(player)
      
      fullX += xVel
      fullY += yVel

      // const oldX = p.x
      // const oldY = p.y
      
      p.x = Math.round(fullX)
      p.y = Math.round(fullY)
      
      // yVel += gravity

      yVel = Math.min(yVel+gravity, 1)
      
      const walls = getAll(wall)
      if (
        walls.some(w => (
          (w.x === p.x && w.y === p.y - 1 && yVel < 0 && !isEffectivelyZero(yVel)) ||
          (w.y === p.y && w.x === p.x + 1 && xVel > 0 && !isEffectivelyZero(xVel)) ||
          (w.x === p.x && w.y === p.y + 1 && yVel > 0 && !isEffectivelyZero(yVel)) ||
          (w.y === p.y && w.x === p.x - 1 && xVel < 0 && !isEffectivelyZero(xVel))
        ))
      ) {
        // TODO: consider playing sound effect here
        console.log("clear")
        clearInterval(interval)
        inAir = false
      } else {
        const wallsNoStick = getAll(wall_no_stick)
        if (
          wallsNoStick.some(w => (
            (w.y === p.y && w.x === p.x + 1 && xVel > 0 && !isEffectivelyZero(xVel)) ||
            (w.y === p.y && w.x === p.x - 1 && xVel < 0 && !isEffectivelyZero(xVel))
          ))
        ) {
          console.log("reset x")
          xVel = 0
          fullX = p.x
        }
        if (
          wallsNoStick.some(w => (
            (w.x === p.x && w.y === p.y + 1 && yVel > 0 && !isEffectivelyZero(yVel)) ||
            (w.x === p.x && w.y === p.y - 1 && yVel < 0 && !isEffectivelyZero(yVel))
          ))
        ) {
          console.log("reset y")
          yVel = 0
          fullY = p.y
        }
      }

      console.log(p.y)
    
      fullMap = getParsedMap()
      
      centerMap()
    }, 60)
  }
})

afterInput(() => {
  
})

function setArrowPosition() {
  if (arrowType !== null) {
    // console.log("hello")
    // console.log(getFirst(player)) // undefined
    // console.log(getAll(wall)) // []
    // console.log(getTile(0, 0))
    // console.log(getFirst("0"))
    // console.log(getAll("0"))
    
    const playerSprite = getFirst(player)
    const arrowSprite = getFirst(arrowType)

    const deg = getArrowDeg()
    const rad = deg * (Math.PI / 180)
    const distance = 1
    const x = distance * Math.cos(rad)
    const y = distance * Math.sin(rad)
    // console.log(`deg: ${deg}`)
    // console.log(`x: ${x}`)
    // console.log(`y: ${y}`)
    
    arrowSprite.x = Math.round(playerSprite.x + x)
    arrowSprite.y = Math.round(playerSprite.y - y)
    
    // arrowSprite.x = playerSprite.x + 1
    // arrowSprite.y = playerSprite.y - 1
  }
}

// function getArrowDeg() {
//   if (arrowType === null) return null
//   return Number(arrowType) * arrowIncrement
// }

function getParsedMap() {
  // console.log(height())
  
  const map = [];

  for (let y = 0; y < height(); y++) {
    const row = []
    map.push(row)
    
    for (let x = 0; x < width(); x++) {      
      const tile = getTile(x, y).map(tile => tile.type)
      row.push(tile)
    }
  }
  
  return map;
}

function setMapFromParsed(parsedMap) {  
  setMap(
    parsedMap.map(row =>
      row.map(tile => tile.length === 0 ? "." : tile[0]).join("")
    ).join("\n")
  )

  // console.log(
  //   parsedMap.map(row =>
  //     row.map(tile => tile.length === 0 ? "." : tile[0]).join("")
  //   ).join("\n")
  // )

  // console.log(map)
  
  for (let y = 0; y < height(); y++) {
  // for (let y = 0; y < map.length; y++) {
    const row = parsedMap[y]

    // console.log("row")
    
    for (let x = 0; x < width(); x++) {
    // for (let x = 0; x < row.length; x++) {
      const tile = row[x]
      
      for (let i = 1; i < tile.length; i++) {
        const sprite = tile[i]
        // console.log(tile)
        addSprite(x, y, tile)
      }
    }
  }
}

function zoomMap(parsedMap, rawX, rawY, rawZoomWidth, rawZoomHeight) {
  // const rawX = 200
  // const rawY = 20
  // const rawZoomWidth = 10
  // const rawZoomHeight = 10

  const mapWidth = parsedMap[0].length
  const mapHeight = parsedMap.length

  // const zoomWidth = rawZoomWidth
  // const zoomHeight = rawZoomHeight
  
  const zoomWidth = Math.min(rawZoomWidth, mapWidth)
  const zoomHeight = Math.min(rawZoomHeight, mapHeight)
  const x = Math.max(Math.min(rawX, mapWidth-zoomWidth), 0)
  const y = Math.max(Math.min(rawY, mapHeight-zoomHeight), 0)

  // const x = rawX
  // const y = rawY
  
  const zoomedMap = []

  for (let iterY = 0; iterY < zoomHeight; iterY++) {
    const row = []
    zoomedMap.push(row)

    for (let iterX = 0; iterX < zoomWidth; iterX++) {
      const tile = []
      row.push(tile)

      // console.log("row");
      
      for (let i = 0; i < parsedMap[iterY+y][iterX+x].length; i++) {
        // console.log(parsedMap[iterY+y][iterX+x][i])
        tile.push(parsedMap[iterY+y][iterX+x][i])
      }
    }
  }

  return zoomedMap
}

function centerMap() {
  const playerSprite = getFirst(player)

  // console.log({x:playerSprite.x,y:playerSprite.y})

  const mapWidth = 10
  const mapHeight = 10
  
  const parsedMap = getParsedMap()
  const zoomedMap = zoomMap(
    parsedMap,
    playerSprite.x-Math.round(mapWidth/2)+1,
    playerSprite.y-Math.round(mapHeight/2),
    mapWidth,
    mapHeight
  )
  setMapFromParsed(zoomedMap)
}

// function getTouching() {
//   const playerSprite = getFirst(player)
//   const walls = getAll(wall)
//   // console.log({ playerSpriteX: playerSprite.x, playerSpriteY: playerSprite.y })
//   // console.log({ wallX: walls[0].x, wallY: walls[0].y })
//   // const touching = walls.filter(w => (
//   //   (w.y === playerSprite.y && Math.abs(w.x - playerSprite.x) <= 1) ||
//   //   (w.x === playerSprite.x && Math.abs(w.y - playerSprite.y) <= 1)
//   // ));
//   const touching = walls.filter(w => playerTouchingWall(playerSprite, w))
//   return touching
// }

// function playerTouchingWall(p, w) {
//   return (
//     (w.y === p.y && Math.abs(w.x - p.x) <= 1) ||
//     (w.x === p.x && Math.abs(w.y - p.y) <= 1)
//   )
// }

function checkArrowIsInvalid(thisArrowType) {
  const p = getFirst(player)
  const walls = [...getAll(wall), ...getAll(wall_no_stick)]
  const arrowDeg = getArrowDeg(thisArrowType)
  
  const someIsInvalid = walls.some(w => {
    const isTouching = (
      (w.y === p.y && Math.abs(w.x - p.x) <= 1) ||
      (w.x === p.x && Math.abs(w.y - p.y) <= 1)
    )

    if (!isTouching) return false
    
    let angle = Math.atan2(p.y-w.y, w.x-p.x)*(180/Math.PI)
    angle = angle < 0 ? angle + 360 : angle

    let distance = Math.abs(arrowDeg-angle) % 360
    distance = distance > 180 ? (180 - (distance % 180)) : distance
    console.log(distance)
    if (distance < 90) return true
  })
  
  return someIsInvalid
}

function getArrowDeg(thisArrowType) {
  if (typeof thisArrowType === "string" || typeof thisArrowType === "number")
    return arrowCounters.indexOf(thisArrowType) * arrowIncrement
  else if (arrowType === null) return null
  else return arrowCounters.indexOf(arrowType) * arrowIncrement
}

function isEffectivelyZero(num) {
  const epsilon = 1e-10
  return Math.abs(num) < epsilon
}

fullMap = getParsedMap()
centerMap()
