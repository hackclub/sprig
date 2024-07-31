/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Spring
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"

const wall = "w"

const arrow_0 = "0"
const arrow_45 = "1"
const arrow_90 = "2"
const arrow_135 = "3"
const arrow_180 = "4"
const arrow_225 = "5"
const arrow_270 = "6"
const arrow_315 = "7"

const arrowIncrement = 45

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
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
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
0000000000000000` ]
)

setSolids([ player, wall ])

let level = 0
const levels = [
  map`
....................
....................
....................
....................
....................
.ww.ww.ww.ww.ww.ww.w
....................
....................
....................
....................
...w...w...w...w...w
....................
.w...w...w...w...w..
....................
....................
w..................w
w..................w
..p.................
w.w.w.w.w.w.w.w.w.w.
wwwwwwwwwwwwwwwwwwww`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

let fullX = null
let fullY = null
let xVel = 0
let yVel = 0
let gravity = 0.1

let arrowType = null

let fullMap = null

onInput("s", () => {
  // getFirst(player).y += 1
  // const arrowSprite = addSprite(2, 2, arrow_0)
  // const arrowSprite45 = addSprite(3, 2, arrow_45)
  // arrowSprite.rotate = 20
})

onInput("i", () => {
  if (arrowType === null) {
    addSprite(0, 0, arrow_0)
    arrowType = arrow_0
    setArrowPosition()
  }
})

onInput("j", () => {
  if (arrowType !== null) {
    const arrowTypeNum = Number(arrowType)
    
    const lastArrow = 360 / arrowIncrement - 1
    const newType = (arrowTypeNum === lastArrow) ? 0 : (arrowTypeNum + 1)
    
    const arrowSprite = getFirst(arrowType)
    arrowSprite.type = newType.toString()
    arrowType = newType.toString()

    setArrowPosition()
  }
})

onInput("l", () => {
  if (arrowType !== null) {
    const arrowTypeNum = Number(arrowType)
    
    const lastArrow = 360 / arrowIncrement - 1
    const newType = (arrowTypeNum === 0) ? lastArrow : (arrowTypeNum - 1)
    
    const arrowSprite = getFirst(arrowType)
    arrowSprite.type = newType.toString()
    arrowType = newType.toString()
    
    setArrowPosition()
  }
})

onInput("k", () => {
  if (arrowType !== null) {
    const arrowSprite = getFirst(arrowType)
    arrowSprite.remove()
    arrowType = null
    
    const playerSprite = getFirst(player)
    
    const deg = getArrowDeg()
    const rad = deg * (Math.PI / 180)

    const startVel = 1
    xVel = startVel * Math.cos(rad)
    yVel = -startVel * Math.sin(rad)

    setMapFromParsed(fullMap)
    fullX = playerSprite.x
    fullY = playerSprite.y
    centerMap()
    
    const interval = setInterval(() => {
      setMapFromParsed(fullMap)

      setTimeout(() => {
        const playerSprite = getFirst(player)
        
        // playerSprite.x += xVel
        // playerSprite.y += yVel
        fullX += xVel
        fullY += yVel
  
        const oldX = playerSprite.x
        const oldY = playerSprite.y
        
        playerSprite.x = Math.round(fullX)
        playerSprite.y = Math.round(fullY)
        
        yVel += gravity
  
        if (
          // (xVel && oldX === playerSprite.x) ||
          // (yVel && oldY === playerSprite.y)
          Math.round(fullX) !== playerSprite.x ||
          Math.round(fullY) !== playerSprite.y
        ) {
          clearInterval(interval);
        }

        setTimeout(() => {
          fullMap = getParsedMap()
          centerMap()
        }, 1000)
      }, 1000)
    }, 3000)
    // timeouts are temporary - simply here for debugging purposes (so that each step can be seen separately)
  }
})

afterInput(() => {
  
})

function setArrowPosition() {
  if (arrowType !== null) {
    console.log("hello")
    console.log(getFirst(player)) // undefined
    console.log(getAll(wall)) // []
    console.log(getTile(0, 0))
    console.log(getFirst("0"))
    console.log(getAll("0"))
    
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

function getArrowDeg() {
  if (arrowType === null) return null
  return Number(arrowType) * arrowIncrement
}

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

function zoomMap(parsedMap, rawX, rawY) {
  // const rawX = 200
  // const rawY = 20
  const rawZoomWidth = 15
  const rawZoomHeight = 15

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
  
  const parsedMap = getParsedMap()
  const zoomedMap = zoomMap(parsedMap, playerSprite.x-2, playerSprite.y-2)
  setMapFromParsed(zoomedMap)
}

// console.log(getParsedMap())

// setMapFromParsed(zoomMap(getParsedMap()))

fullMap = getParsedMap()
centerMap()

// console.log(`width: ${width()}`)
// setMapFromParsed(zoomMap(getParsedMap(), 1, 0))
