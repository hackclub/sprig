/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
@title: sonar marine
@description: Sonar Machine is a simple game where your objective is to move your submarine and get to the ore, but what follows you is an evil sea monster. In the deep darkness of the ocean, you can only see ore and the monster with your sonar gadget by pressing 'i' 
@author: Ansh
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/



const player = "p"
const playerActive = "s"
const water = "w"
const evil = "e"
const evilActive = "a"
const darkness = "b"
const oreSample = "o"
const oreSampleActive = "c"

setLegend(
  [ player, bitmap`
................
................
.......4........
.......L........
.......L........
.L.111111111....
.L117777777111..
.L1177797771111.
.L1179707DD1111.
.L1170707DD116..
.L.111111111....
................
................
................
................
................`],
  [playerActive, bitmap`
....4444444.....
...44.....44....
..44..DDD..44...
..4..DDLDD..4...
.......L........
.L.111111111....
.L117777777111..
.L1177797771111.
.L1179707DD1111.
.L1170707DD116..
.L.111111111....
................
..4..DD.DD..4...
..44..DDD..44...
...44.....44....
....4444444.....`],
  [water, bitmap`
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
  [evilActive, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000004444000000
0000040000400000
0000400000040000
0000400440040000
0000400440040000
0000400000040000
0000040000400000
0000004444000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [evil, bitmap`
.......66.......
...H...88...H...
..HH...88...HH..
.HH...8888...HH.
HH...HHHHHH...HH
H...HHHHHHHH...H
HHH.H0HHHH0H.HHH
..HHHHHHHHHHHH..
.HH.HL1L1L1H.HH.
.H..H1L1L1LH..H.
.H..HHHHHHHH..H.
.H............H.
.HH..........HH.
..HHHH....HHHH..
.....H....H.....
................`],
  [darkness, bitmap`
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
0000000000000000`],
  [oreSample, bitmap`
................
................
................
...........111..
..........11LL..
....111..111LL..
...11111141LLL..
...11111111LL...
...1111111LLL...
..11161111LLL...
.11911111LLL....
.11111411LLL....
.11111111LLL....
..116111LL......
...11111........
................`],
  [oreSampleActive, bitmap`
................
....99999999....
...9........9...
..9..444444..9..
.9..4......4..9.
.9.4..6666..4.9.
.9.4.6....6.4.9.
.9.4.6.99.6.4.9.
.9.4.6.99.6.4.9.
.9.4.6....6.4.9.
.9.4..6666..4.9.
.9..4......4..9.
..9..444444..9..
...9........9...
....99999999....
................`],
)

setBackground(darkness)
setSolids([player, evil, evilActive, oreSample])

function randint(min, max){
  return Math.floor(Math.random() * (max - min) + min)
}

let evilInRadius = false
let oreInRadius = false
let sonarUsed = false
let gameOver = false
let gameStarted = false
let playerMoveCount = 0
let level = 0

let x = 0
let y = 0
let ex = 0
let ey = 0
let ox = 0
let oy = 0
let currentMap

function showStartScreen() {
  clearText()
  let grid = []
  for (let i = 0; i < 10; i++) {
    grid.push(new Array(10).fill('b'))
  }
  setMap(map`${renderMap(grid)}`)

  addText("SONAR MARINE", { x: 4, y: 1, color: "7" })
  addText("WASD : MOVE", { x: 5, y: 3, color: "4" })
  addText("I : SONAR", { x: 5, y: 4, color: "4" })
  addText("J : RESTART", { x: 5, y: 5, color: "4" })
  addText("PRESS J TO START", { x: 2, y: 8, color: "3" })
}

function getMap(){
  let oxVal = randint(1, 9)
  let oyVal = randint(1, 9)
  let exVal = randint(1, 9)
  let eyVal = randint(1, 9)

  while (oxVal === exVal && oyVal === eyVal) {
    exVal = randint(1, 9)
    eyVal = randint(1, 9)
  }

  let oreCoords = [oxVal, oyVal]
  let evilCoords = [exVal, eyVal]
  
  let grid = []
  for (let i = 0; i < 10; i++) {
    grid.push(new Array(10).fill('b'))
  }

  grid[0][0] = 'p'
  grid[oyVal][oxVal] = 'o'
  grid[eyVal][exVal] = 'e'

  let hidden = [oreCoords, evilCoords, grid]
  let myMap = map`${renderMap(hidden[2])}`
  return {'mapData': myMap, 'hiddenData': hidden}
}

function renderMap(mapArray){
  let mapString = ""
  for (let i = 0; i < 10; i++){
    for (let j = 0; j < 10; j++){
      if (mapArray[i][j] === 'e' || mapArray[i][j] === 'a'){
        if (!sonarUsed) {
          mapString += 'b'
        } else if (evilInRadius) {
          mapString += 'e'
        } else {
          mapString += 'a'
        }
      } else if (mapArray[i][j] === 'o'){
        if (sonarUsed && oreInRadius) {
          mapString += 'o'
        } else {
          mapString += 'b'
        }
      } else {
        mapString += mapArray[i][j]
      }
    }
    mapString += '\n'
  }
  return mapString
}

function initGame() {
  clearText()
  gameStarted = true
  gameOver = false
  sonarUsed = false
  evilInRadius = false
  oreInRadius = false
  playerMoveCount = 0

  currentMap = getMap()
  setMap(currentMap['mapData'])
  setPushables({
    [ player ]: []
  })

  x = getFirst(player).x
  y = getFirst(player).y
  ex = currentMap["hiddenData"][1][0]
  ey = currentMap["hiddenData"][1][1]
  ox = currentMap["hiddenData"][0][0]
  oy = currentMap["hiddenData"][0][1]
}

showStartScreen()

function moveEvil(){
  const distSq = ((x - ex) ** 2) + ((y - ey) ** 2)
  const isInsideRadius = distSq <= 9

  if (!isInsideRadius) {
    playerMoveCount++
    if (playerMoveCount % 2 !== 0) {
      return
    }
  }

  const dx = x - ex
  const dy = y - ey

  if (Math.abs(dx) >= Math.abs(dy)) {
    if (dx > 0) ex += 1
    else if (dx < 0) ex -= 1
  } else {
    if (dy > 0) ey += 1
    else if (dy < 0) ey -= 1
  }

  currentMap["hiddenData"][1][0] = ex
  currentMap["hiddenData"][1][1] = ey
}

function sendSonar(){
  const px = x
  const py = y
  let mapArray = currentMap['hiddenData'][2]
  
  evilInRadius = false
  oreInRadius = false

  for (let i = 0; i < 10; i++){
    for (let j = 0; j < 10; j++){
      if (((px - j) ** 2) + ((py - i) ** 2) <= 9){
        mapArray[i][j] = 'w';
        if (i === ey && j === ex){
          evilInRadius = true
        }
        if (j === ox && i === oy){
          oreInRadius = true
        }
      } else {
        mapArray[i][j] = 'b'
      }
    }
  }

  mapArray[py][px] = player
  mapArray[ey][ex] = evilInRadius ? evil : evilActive
  mapArray[oy][ox] = oreSample

  return map`${renderMap(mapArray)}`
}

function resetMap(){
  sonarUsed = false
  evilInRadius = false
  oreInRadius = false
  const px = getFirst(player).x
  const py = getFirst(player).y
  
  let mapArray = currentMap['hiddenData'][2]
  for (let i = 0; i < 10; i++){
    for (let j = 0; j < 10; j++){
      mapArray[i][j] = 'b'
    }
  }
  mapArray[py][px] = player
  mapArray[ey][ex] = evil
  mapArray[oy][ox] = oreSample
  setMap(map`${renderMap(mapArray)}`)
}

onInput("s", () => {
  if (!gameStarted || gameOver) return
  getFirst(player).y += 1
  if (sonarUsed) resetMap()
})

onInput("d", () => {
  if (!gameStarted || gameOver) return
  getFirst(player).x += 1
  if (sonarUsed) resetMap()
})

onInput("w", () => {
  if (!gameStarted || gameOver) return
  getFirst(player).y -= 1
  if (sonarUsed) resetMap()
})

onInput("a", () => {
  if (!gameStarted || gameOver) return
  getFirst(player).x -= 1
  if (sonarUsed) resetMap()
})

onInput("i", () => {
  if (!gameStarted || gameOver) return
  sonarUsed = true
  setMap(sendSonar())
})

onInput("j", () => {
  initGame()
})

function checkForResult(){
  if (x === ex && y === ey){
    gameOver = true
    addText("YOU LOST", { x: 6, y: 8, color: "3" })
  } else if (x === ox && y === oy){
    gameOver = true
    addText("YOU WON", { x: 6, y: 8, color: "4" })
  }
}

afterInput(() => {
  if (!gameStarted || gameOver) return
  x = getFirst(player).x
  y = getFirst(player).y
  
  moveEvil()
  
  if (sonarUsed) {
    setMap(sendSonar())
  }
  
  checkForResult()
})