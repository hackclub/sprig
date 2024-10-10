/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Tug-of-War
@author: liamcharger
@tags: ['multiplayer']
@addedOn: 2024-10-10
*/

const player = "p"
const opponent = "o"
const rope = "r"

const endTone = tune`
600: C4-600 + E4-600 + G4-600 + C5-600,
18600`

setLegend(
  [ player, bitmap`
................
................
......000.......
.....0..0.......
.....0...0......
.....0...0......
.....03.30......
.....0...0000...
.....05550003333
.....0...0......
.....0...0......
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ opponent, bitmap`
................
................
......000.......
.....0..0.......
.....0...0......
.....0...0......
.....03.30......
..0000...0......
3330005550......
.....0...0......
.....0...0......
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ rope, bitmap`
................
................
................
................
................
................
................
................
3333333333333333
................
................
................
................
................
................
................` ]
)

setSolids([])

let countdown = 3
let msg = `Begin in ${countdown}`

let gameOver = false
let isCounting = true

let level = 0
const levels = [
  map`
..........
..........
...prro...
..........
..........`
]

setMap(levels[level])
addText(msg, { x: 1, y: 1, color: color`3` })

setPushables({
  [ player ]: []
})

function checkForGameOver() {
  if (getFirst(player).x <= 0) {
      endGame("Player 1")
    } else if (getFirst(opponent).x >= 9) {
      endGame("Player 2")
    }
}

const startGame = () => {
  gameOver = false
}

const endGame = (winner) => {
  msg = `${winner} won!`
  addText(msg, { x: 1, y: 1, color: color`3` })
  playTune(endTone)
  gameOver = true
}

const updateCountdown = () => {
  if (!gameOver) {
    countdown -= 1
    msg = `Begin in ${countdown}`
  
    if (countdown <= 0) {
      msg = "Tug!      "
      isCounting = false
    }

    addText(msg, { x: 1, y: 1, color: color`3` })
    }
}

setInterval(updateCountdown, 1000)

onInput("a", () => {
  if (!gameOver && !isCounting) {
    getAll(rope).forEach(ropeSprite => {
      ropeSprite.x -= 1
    })
    getFirst(player).x -= 1
    getFirst(opponent).x -= 1

    checkForGameOver()
  }
})

onInput("l", () => {
  if (!gameOver && !isCounting) {
    getAll(rope).forEach(ropeSprite => {
      ropeSprite.x += 1
    })
    getFirst(player).x += 1
    getFirst(opponent).x += 1

    checkForGameOver()
  }
})

onInput("k", () => {
  if (gameOver && !isCounting) {
    clearText();
    countdown = 3;
    isCounting = true;
    gameOver = false;
    msg = `Begin in ${countdown}`;
    
    getFirst(player).x = 3;

    const ropes = getAll(rope);
    
    ropes[0].x = 4;
    ropes[1].x = 5;
    
    getFirst(opponent).x = 6;
    
    addText(msg, { x: 1, y: 1, color: color`3` });
  }
})
