/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Sinking ships
@author: DO3EET
@tags: []
@addedOn: 2025-03-16
@description A game w/ sinking ships
*/

const player = "p"
const water = "w"
const waves = "w"
const hit = "h"
const miss = "x"
const hiddenship = "s"
let playerInputEnabled = true;
const win = tune``
const loss = tune``

setLegend(
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
................
................
..0..........0..
...0........0...
....0......0....
.....0....0.....
......0..0......
.......00.......
.......00.......
......0..0......
.....0....0.....
....0......0....
...0........0...
..0..........0..
................
................`],
  [miss, bitmap `
................
....66666666....
...6666666666...
..666666666666..
.66600066000666.
.66666666666666.
.66666660666666.
.66666660666666.
.66666606666666.
.66666606666666.
.66666660666666.
.66666666666666.
..666000006666..
...6066666066...
....66666666....
................`],
  [player, bitmap`
................
................
..000......000..
..0..........0..
..0..........0..
................
................
................
................
................
................
..0..........0..
..0..........0..
..000......000..
................
................`],
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
)
setBackground(water)
setSolids([])

let level = 0
const levels = [
  map`
..........
..........
..........
..........
...p......
..........
..........
..........`
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
  [player]: []
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
    addText("you Win!!!")
    playerInputEnabled = false
  }
  if (tilesWith(miss).length >= 10) {
    console.log("loss")
    addText("you lose... sad")
    playerInputEnabled = false
  }
})
