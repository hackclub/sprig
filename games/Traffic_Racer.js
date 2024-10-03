/*
@title: Traffic Racer 2D
@author: advaitconty
@tags: []
@addedOn: 2024-08-05
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const road = "r"
const boundryT = "T"
const boundryB = "B"
const explosion = "E"
const obstacle = "o"
var playing = false
var speed = 100
let gameIntervalId
let spawnIntervalId
let speedIntervalId
var endGame = false
var distanceTravelled = 0
var offRoaded = 0
var spriteAdded = false

setLegend(
  [explosion, bitmap`
3333333333333333
3FFFF666666FFFF3
3FFF66699666FFF3
3FF6669999666FF3
3F666992299666F3
3666992222996663
3669922222299663
3699222222229963
3699222222229963
3669922222299663
3666992222996663
3F666992299666F3
3FF6669999666FF3
3FFF66699666FFF3
3FFFF666666FFFF3
3333333333333333`],
  [player, bitmap`
................
................
................
................
.40044444440044.
.34444444444446.
.34774LLL477746.
.44774LLL477744.
.44774LLL477744.
.34774LLL477746.
.34444444444446.
.40044444440044.
................
................
................
................`],
  [obstacle, bitmap`
................
................
................
................
.80088888880088.
.88888888888886.
.38778LLL877886.
.38778LLL877888.
.38778LLL877888.
.38778LLL877886.
.88888888888886.
.80088888880088.
................
................
................
................`],
  [road, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
666LL666666LL666
666LL666666LL666
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [boundryT, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
1DDD1DDD1DDD1DDD
1111111111111111`],
  [boundryB, bitmap`
1111111111111111
1DDD1DDD1DDD1DDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`]
)

setSolids([boundryT, boundryB])


let level = 0
const levels = [
  map`
TTTTT
rrrrr
rrrrr
rrrrr
BBBBB`
]

setMap(levels[level])

setPushables({
  [player]: []
})

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateSpeed(speed) {
  clearInterval(speedIntervalId)
  speedIntervalId = setInterval(changeSpeed, speed)
}

function changeSpeed() {
  const playerSprite = getFirst(player);
  playerSprite.x -= 1
}

function spawnCar() {
  if (playing == true) {
    var coordinateX = getRandomInt(3, 4)
    addSprite(getRandomInt(4, 5), getRandomInt(1, 3), obstacle);
  } else {
    const allObstacles = getAll(obstacle)
    allObstacles.forEach(obstacle => {
      obstacle.remove()
    })
  }
}

function detectCollision() {
  const playerSprite = getFirst(player);
  const allObstacles = getAll(obstacle);

  allObstacles.forEach(obstacle => {
    if (playerSprite.x === obstacle.x && playerSprite.y === obstacle.y) {
      clearText()
      addSprite(playerSprite.x, playerSprite.y, explosion)
      endGame = true
      playing = false
      addText("Game Over!", { x: 5, y: 3, color: color`2` })
      addText(`You went\n${((distanceTravelled - offRoaded) / 1000).toString()} km`, { x: 6, y: 5, color: color`2` })
      addText("Press i\nto restart", { x: 5, y: 9, color: color`2` })
    }
  });
}

function startGame() {
  if (playing == true) {
    // Get all obstacle sprites
    const allObstacles = getAll(obstacle)
    allObstacles.forEach(obstacle => {
      if ((obstacle.x - 1) === -1) {
        obstacle.remove();
      } else {
        obstacle.x -= 1;
      }
    })
    distanceTravelled += 1
    addText(distanceTravelled / 1000 + " km", { x: 3, y: 2, color: color`2` })

    const playerSprite = getFirst(player)

    if (playerSprite.y === 0 || playerSprite.y === 4) {
      distanceTravelled -= 2
    }

    if ((distanceTravelled % 0.05) === 0) {
      clearInterval(gameIntervalId)
    }
  }
}


addText("Traffic\n\nRacer2D", { x: 6, y: 4, color: color`2`, font: "Arial" })
addText("Press I\n\nto start", { x: 6, y: 8, color: color`2`, font: "Arial" })

onInput("i", () => {
  if (playing == false) {
    distanceTravelled = 0
    playing = true
    if (spriteAdded == false) {
      addSprite(1, 2, player)
      spriteAdded = true
    }
    clearText()
    gameIntervalId = setInterval(startGame, getRandomInt(800, 1200))
    spawnIntervalId = setInterval(spawnCar, getRandomInt(1000, 1500))
    setInterval(detectCollision, 1000)

    const allExplosions = getAll(explosion);

    allExplosions.forEach(explosionSprite => {
      explosionSprite.remove();
    });
  }
})

onInput("w", () => {
  if (playing == true) {
    const nextTile = getTile(player.x, player.y - 1)
    if (nextTile.includes(boundryT)) {
      getFirst(player).x -= 1
    } else {
      getFirst(player).y -= 1
    }
  }
})

onInput("a", () => {
  if (playing == true) {
    speed += 10
    updateSpeed(speed)
    getFirst(player).x -= 1
  }
})

onInput("s", () => {
  if (playing == true) {
    getFirst(player).y += 1
  }
})

onInput("d", () => {
  if (playing == true) {
    speed -= 10
    updateSpeed(speed)
    getFirst(player).x += 1
  }
})


afterInput(() => {
  if (playing == true) {

  }
})
