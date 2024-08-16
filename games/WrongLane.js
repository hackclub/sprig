/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: WrongLane
@author: KaspianDev
@tags: ['dodge', 'endless', 'singleplayer']
@addedOn: 2024-08-15
*/

/* Controls:
w,s,a,d - Car movement
j,l - Difficulty selection
k - Game start
*/

const gameSound = tune`
375: E5~375,
375: G5~375,
375: E5~375,
375: G5~375,
375: F5~375,
375: A5~375,
375: F5~375,
375: A5~375,
375: G5~375,
375: B5~375,
375: G5~375,
375: B5~375,
375: C5~375,
375: D5~375,
375: C5~375,
375: A5~375,
375: E5~375,
375: G5~375,
375: E5~375,
375: G5~375,
375: F5~375,
375: A5~375,
375: F5~375,
375: A5~375,
375: G5~375,
375: B5~375,
375: G5~375,
375: B5~375,
375: C5~375,
375: D5~375,
375: C5~375,
375: D5~375`
const gameOverSound = tune`
214.28571428571428: A5-214.28571428571428,
214.28571428571428: F5-214.28571428571428,
214.28571428571428: D5-214.28571428571428,
214.28571428571428: C4-214.28571428571428,
6000`
const gameStartSound = tune`
214.28571428571428: D5-214.28571428571428,
214.28571428571428: E5-214.28571428571428,
6428.571428571428`
const crashSound = tune`
214.28571428571428: A4^214.28571428571428,
214.28571428571428: G4^214.28571428571428,
6428.571428571428`

let playback;

const player = "p"
const car = "c"
const truck = "t"
const grass = "g"
const roadLeft = "l"
const roadRight = "r"
const roadMiddle = "m"

const heart = "h"

const menuBackgroundLeft = "u"
const menuBackground = "j"
const menuBackgroundRight = "k"

setLegend(
  [player, bitmap`
....6LLLLLL6....
...6LL0000LL6...
...LL077770LL...
..0L07777770L0..
..0L07777770L0..
..0L00000000L0..
...L00111100L...
...L01111110L...
...L01111110L...
...L00111100L...
...L00000000L...
..0L07777770L0..
..0L00777700L0..
..0LLL0000LLL0..
...3LLLLLLLL3...
...33LLLLLL33...`],
  [car, bitmap`
...33HHHHHH33...
...3HHHHHHHH3...
..0HHH0000HHH0..
..0H00777700H0..
..0H07777770H0..
...H00000000H...
...H00888800H...
...H08888880H...
...H08888880H...
...H00888800H...
..0H00000000H0..
..0H07777770H0..
..0H07777770H0..
...HH077770HH...
...6HH0000HH6...
....6HHHHHH6....`],
  [truck, bitmap`
...3000000003...
...30D4444D03...
...D04444440D...
..0D04444440D0..
..0D04444440D0..
..0D0D4444D0D0..
...D00000000D...
...D00000000D...
...D04444440D...
...D04444440D...
...D00444400D...
...D00000000D...
..0D07777770D0..
..0D07777770D0..
..0DD000000DD0..
...66DDDDDD66...`],
  [heart, bitmap`
......00....00..
.....0230..0330.
....023330033330
....033333333330
....033333333330
....033333333330
.....0333333330.
......03333330..
.......033330...
........0330....
.........00.....
................
................
................
................
................`],
  [grass, bitmap`
DDDDDDDDDDDDDDDD
4DD4DDDDDDD4DDDD
DD444DD4DDDDDDDD
DDDCDDDDDDDDDD4D
DDDCDDDDDDDDDDDD
DDDCDDDDDDD4DDDD
DDDDDDD4DD444DDD
D4DDDDDDDDDCDDDD
DDDDDDDDDDDCDDDD
DDD4DDDDDDDCDD4D
DD444DDDDDDDDDDD
DDDCDDDD4DDD4DDD
DDDCDDDDDDDDDDDD
DDDCDDDDDDDDDDDD
D4DDDD4DDD4DDDD4
DDDDDDDDDDDDDDDD`],
  [roadLeft, bitmap`
0L1111111111111L
0L1111110111111L
0L1111110111111L
0L1111111111111L
0L1111111111111L
0L1111110111111L
0L1111110111111L
0L1111111111111L
0L1111111111111L
0L1111110111111L
0L1111110111111L
0L1111111111111L
0L1111111111111L
0L1111110111111L
0L1111110111111L
0L1111111111111L`],
  [roadRight, bitmap`
L1111111111111L0
L1111110111111L0
L1111110111111L0
L1111111111111L0
L1111111111111L0
L1111110111111L0
L1111110111111L0
L1111111111111L0
L1111111111111L0
L1111110111111L0
L1111110111111L0
L1111111111111L0
L1111111111111L0
L1111110111111L0
L1111110111111L0
L1111111111111L0`],
  [roadMiddle, bitmap`
1111111111111111
L11111101111111L
L11111101111111L
L11111111111111L
L11111111111111L
L11111101111111L
L11111101111111L
1111111111111111
1111111111111111
L11111101111111L
L11111101111111L
L11111111111111L
L11111111111111L
L11111101111111L
L11111101111111L
1111111111111111`],
  [menuBackgroundLeft, bitmap`
L1LLLLLLLLLLLLLL
1L1LLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
1L1LLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
1L1LLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
1L1LLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
1L1LLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
1L1LLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
1L1LLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
1L1LLLLLLLLLLLLL`],
  [menuBackground, bitmap`
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
  [menuBackgroundRight, bitmap`
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLL1L1
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLL1L1
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLL1L1
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLL1L1
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLL1L1
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLL1L1
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLL1L1
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLL1L1`]
)

setSolids([player, grass])

let level = 0
const levels = [
  map`
ujjjjk
ujjjjk
ujjjjk
ujjjjk
ujjjjk`,
  map`
gglmrgg
gglmrgg
gglmrgg
gglmrgg
gglmrgg
gglmrgg
gglmrgg`
]
setMap(levels[0])

let score = 0
let highscore = 0

let lives;
let speed;
let frequency;

let carTaskID;
let carSpawnTaskID;

let playing = false

function play() {
  setMap(levels[1])
  playing = true
  if (difficulty === 0) {
    speed = 350
    frequency = 3
    lives = 3
  } else if (difficulty === 1) {
    speed = 300
    frequency = 3
    lives = 2
  } else {
    speed = 300
    frequency = 2
    lives = 1
  }
  refreshGame()
  addSprite(0, 6, heart)
  playTune(gameStartSound)
  setTimeout(() => {
    playback = playTune(gameSound, Infinity)
  }, 700)
}

const cars = []
const newCars = []

function stop() {
  playing = false
  setMap(levels[0])
  if (carTaskID) clearInterval(carTaskID)
  if (carSpawnTaskID) clearInterval(carSpawnTaskID)
  clearCars()
  if (score > highscore) highscore = score
  playback.end()
  score = 0
  refreshMenu()
  playTune(gameOverSound)
}

const carTypes = ["c", "t"]

function getRandomCarType() {
  return carTypes[Math.floor(Math.random() * 2)]
}

function refreshScore() {
  clearText()
  addText(lives.toString(), {
    x: 5,
    y: 14,
    color: color`0`
  })
  addText(score.toString(), {
    x: 14,
    y: 1,
    color: color`0`
  })
  addText(highscore.toString(), {
    x: 14,
    y: 14,
    color: color`0`
  })
}

function crash() {
  lives--
  if (lives === 0) {
    stop()
  } else {
    getFirst(player).remove()
    refreshGame()
    clearCars()
    playTune(crashSound)
  }
}

function clearCars() {
  cars.forEach((car) => car.remove())
  cars.length = 0
}

function refreshGame() {
  addSprite(3, 6, player)
  refreshScore()
  if (carTaskID) clearInterval(carTaskID)
  if (carSpawnTaskID) clearInterval(carSpawnTaskID)
  carTaskID = setInterval(() => {
    cars.forEach((trafficCar, index) => {
      if (!playing) return
      if (newCars.includes(trafficCar)) {
        newCars.pop(trafficCar)
        checkCarForCrash(trafficCar)
        return
      }
      if (trafficCar.y === height() - 1) {
        cars.splice(index, 1);
        trafficCar.remove()
        score++
        refreshScore()
      } else {
        trafficCar.y++
      }
      checkCarForCrash(trafficCar)
    })
  }, speed)
  carSpawnTaskID = setInterval(() => {
    const carType = getRandomCarType();
    addSprite(2 + Math.floor(Math.random() * 3), 0, carType)
    const sprite = getAll(carType)[getAll(carType).length - 1]
    cars.push(sprite)
    newCars.push(sprite)
  }, speed * frequency)
}

function checkForCrash() {
  cars.forEach((car) => {
    checkCarForCrash(car)
  })
}

function checkCarForCrash(car) {
  if (car.x === getFirst(player).x &&
    car.y === getFirst(player).y) {
    crash()
  }
}

let difficulty = 0

function refreshMenu() {
  clearText()

  if (highscore != 0) {
    const highscoreText = "Highscore " + highscore
    addText(highscoreText, {
      x: 4,
      y: 4,
      color: color`7`
    })
  }

  addText("Wrong Lane", {
    x: 5,
    y: 1,
    color: color`6`
  })

  addText("Difficulty", {
    x: 5,
    y: 7,
    color: color`2`
  })

  addText("Press k to start", {
    x: 2,
    y: 13,
    color: color`2`
  })

  if (difficulty === 0) {
    addText("< Normal >", {
      x: 5,
      y: 9,
      color: color`4`
    })
  } else if (difficulty === 1) {
    addText("< Hard >", {
      x: 6,
      y: 9,
      color: color`9`
    })
  } else {
    addText("< Hardcore >", {
      x: 4,
      y: 9,
      color: color`3`
    })
  }
}

refreshMenu()

setPushables({
  [player]: []
})

onInput("w", () => {
  if (playing) {
    getFirst(player).y--
    checkForCrash()
  }
})

onInput("s", () => {
  if (playing) {
    getFirst(player).y++
    checkForCrash()
  }
})

onInput("a", () => {
  if (playing) {
    getFirst(player).x--
    checkForCrash()
  }
})

onInput("d", () => {
  if (playing) {
    getFirst(player).x++
    checkForCrash()
  }
})

onInput("i", () => {
  if (!playing) {
    getFirst(player).y--
  }
})

onInput("k", () => {
  if (!playing) {
    play()
  }
})

onInput("j", () => {
  if (!playing) {
    if (difficulty > 0) { 
      difficulty--
    } else {
      difficulty = 2
    }
    refreshMenu()
  }
})

onInput("l", () => {
  if (!playing) {
    if (difficulty < 2) {
      difficulty++
    } else {
      difficulty = 0
    }
    refreshMenu()
  }
})

