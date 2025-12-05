/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Battle ship
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const water = "w"
const waves = "w"
const hit = "h"
const miss = "x"
const hiddenship = "s"
let playerInputEnabled = true;
const win = tune`
16000`
const loss = tune`
1666.6666666666667,
833.3333333333334: A4~833.3333333333334 + C4/833.3333333333334,
833.3333333333334: A4~833.3333333333334,
833.3333333333334: A4~833.3333333333334 + C4/833.3333333333334,
833.3333333333334: F4~833.3333333333334 + G4-833.3333333333334,
833.3333333333334: E4^833.3333333333334 + F4-833.3333333333334,
833.3333333333334: D4^833.3333333333334 + E4-833.3333333333334,
833.3333333333334: C4^833.3333333333334 + D4-833.3333333333334,
19166.666666666668`

setLegend(
  [wall, bitmap`
................
....1111111111..
...11LLLLLL1111.
..L1000090000L1.
..0092709092701.
...999999099999.
...999999009999.
...999999909999.
...999999909999.
...99999909999..
...9999LLLLL99..
66669999000999..
6267779999777766
6265777999777762
5555577997777562
5555557777775555`],
  [hiddenship, bitmap`
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
................
................
................`],
  [hit, bitmap `
....33333333....
...3333333333...
..333333333333..
.33333333333333.
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....`],
  [miss, bitmap `
....22222222....
...2222222222...
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
.22222222222222.
..222222222222..
...2222222222...
....22222222....`],
  [player, bitmap`
LLLLLLLLLLLLLLLL
L77777777777777L
L77777777777777L
L77777722777777L
L77777700777777L
L77700000000777L
L77700000000777L
L77777700777777L
L77777000077777L
L77777777777777L
L77777777777777L
L77777777777777L
L77777777777777L
L77777777777777L
L77777777777777L
LLLLLLLLLLLLLLLL`],
  [water, bitmap`
7777755577555555
5555775555577755
7777755577775557
5555555555555555
5555777555557775
5777755577777555
5555555555555555
7775557777555577
5555777555557775
5555555555555555
7777755555555777
5555557777757755
7755577555555557
5557555577777777
7555577775555577
5557775555577755`],
)
setBackground(water)
setSolids([])

let level = 0
const levels = [
  map`
p......
.......
.......
.......
.......
.......
.......`
]

setMap(levels[level])

function getRandomCoordinates(minX, maxX, minY, maxY) {
  const randomX = Math.floor(Math.random() * (maxX - minX + 1) + minX)
  const randomY = Math.floor(Math.random() * (maxY - minY + 1) + minY)
  return { x: randomX, y: randomY };
}

function checkCollision(newShip, existingShips) {
  for (const existingShip of existingShips) {
    if (newShip.x === existingShip.x && newShip.y === existingShip.y) {
      return true // Kollision gefunden
    }
  }
  return false // Keine Kollision
}

function placeShip(existingShips, minX, maxX, minY, maxY) {
  let newShip;
  do {
    newShip = getRandomCoordinates(minX, maxX, minY, maxY)
  } while (checkCollision(newShip, existingShips))
  existingShips.push(newShip)
  return newShip
}

const existingShips = [];
const ship1 = placeShip(existingShips, 0, 9, 0, 7)
const ship2 = placeShip(existingShips, 0, 9, 0, 7)
const ship3 = placeShip(existingShips, 0, 9, 0, 7)
const ship4 = placeShip(existingShips, 0, 9, 0, 7)

addSprite(ship1.x, ship1.y, hiddenship)
addSprite(ship2.x, ship2.y, hiddenship)
addSprite(ship3.x, ship3.y, hiddenship)
addSprite(ship4.x, ship4.y, hiddenship)
setPushables({
  [ player ]: []
})

onInput("s", () => {
  if (playerInputEnabled) {
    getFirst(player).y += 1
  }
})
onInput("w", () => {
  if (playerInputEnabled) {
    getFirst(player).y -= 1
  }
})
onInput("a", () => {
  if (playerInputEnabled) {
    getFirst(player).x -= 1
  }
})
onInput("d", () => {
  if (playerInputEnabled) {
    getFirst(player).x += 1
  }
})
onInput("l", () => {
  console.log(getTile(getFirst(player).x, getFirst(player).y)[0].type)
  if (getTile(getFirst(player).x, getFirst(player).y)[0].type == "s") {
    getTile(getFirst(player).x, getFirst(player).y)[0].type = "h"
  } else if (getTile(getFirst(player).x, getFirst(player).y)[0].type == "h") {
    console.log("hit the hit")
  } else if (getTile(getFirst(player).x, getFirst(player).y)[0].type == "x") {
    console.log("hit the miss")
  } else {
    addSprite(getFirst(player).x, getFirst(player).y, miss)
  }
})

afterInput(() => {
  if (tilesWith(hiddenship).length == 0) {
    console.log("win")
    addText("You Win!")
    playerInputEnabled = false
  }
  if (tilesWith(miss).length >= 10) {
    console.log("loss")
    addText("No more Ammo")
    playerInputEnabled = false
  }
})
