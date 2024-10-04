/*
@title: Astroid World
@author: Shaurya
@tags: []
@addedOn: 2024-08-06
*/

const moveTune = tune`
42.73504273504273: B5~42.73504273504273,
1324.7863247863247`
const shootTune = tune`
43.92386530014641: F5~43.92386530014641 + E5^43.92386530014641 + D5~43.92386530014641,
1361.6398243045387`
const startTune = tune`
99.00990099009901: G4^99.00990099009901 + B4^99.00990099009901 + D5^99.00990099009901,
99.00990099009901: A4^99.00990099009901 + C5^99.00990099009901 + E5^99.00990099009901,
99.00990099009901: B4^99.00990099009901 + D5^99.00990099009901 + F5^99.00990099009901,
99.00990099009901: C5^99.00990099009901 + E5^99.00990099009901 + G5^99.00990099009901,
99.00990099009901: D5^99.00990099009901 + F5^99.00990099009901 + A5^99.00990099009901,
2673.267326732673`
const gameOverTune = tune`
500: B4^500 + D5^500 + F5^500,
500: A4^500 + C5^500 + E5^500,
500: G4^500 + B4^500 + D5^500,
500: F4^500 + A4^500 + C5^500,
500: E4^500 + G4^500 + B4^500,
500: A4^500 + F4^500 + D4^500,
500: G4^500 + E4^500 + C4^500,
12500`

const player = "p"
const bg = "b"
const bullet = "l" // Define a new sprite type for the bullet
const ast1 = "1"
const ast2 = "2"
let astkilled = 0
let gameOver = false

let startGame = false;

setLegend(
  [player, bitmap`
................
................
.......33.......
......2222......
......2..2......
......2..2......
......2..2......
.....22..22.....
....22....22....
....2......2....
22222......22222
2..............2
2..............2
2222222222222222
................
................`],
  [bg, bitmap`
0000000000000000
0200000000000000
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
0000000000000200
0000000000000000
0000000000000000`],
  [bullet, bitmap`
................
................
................
................
................
.......66.......
......6..6......
......6..6......
......6..6......
......6..6......
......6..6......
......6666......
................
................
................
................`],
  [ast1, bitmap`
................
................
.....1111111....
....111111111...
...11111112111..
..1112111111111.
..1111111111111.
..1111111111111.
..1111111111111.
..1111111122111.
..1121111122111.
..1121111111111.
...11111111111..
....111111111...
.....1111111....
................`],
  [ast2, bitmap`
................
................
....LLLLLL......
...LLLLLLLL.....
..LLLLLLLLLL....
..LL22LLL2LL....
..LL22LLLLLL....
..LLLLLLLLLL....
..LLLLLLLLLL....
..LLLLLLLLLL....
..LLLLLL2LLL....
..LLL2LL2LLL....
..LLLLLLLLLL....
...LLLLLLLL.....
....LLLLLL......
................`]
)

setSolids([bullet])

function shootUpdate() {
  if (getAll(bullet).length > 0) {
    for (let proj of getAll(bullet)) {
      proj.y -= 1;
      if (getTile(proj.x, proj.y).length > 1) {
        let a = getTile(proj.x, proj.y)[0]['_type']
        let b = getTile(proj.x, proj.y)[1]['_type']
        for (let letter of ["1", "2"]) {
          if (a == letter || b == letter)
            astkilled++;
        }
        for (let stuff of getTile(proj.x, proj.y)) {
          stuff.remove();
        }
        proj.remove();
        return;
      }
      if (proj.y == 0) { proj.remove(); }
    }
  }
}

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawn() {
  if (!gameOver) {
    const randomInt = randint(1, 2)
    const eX = randint(0, 8)
    const eY = 0
    if (randomInt == 1) {
      addSprite(eX, eY, ast1)
    } else {
      addSprite(eX, eY, ast2)
    }
  }
}

function updateAst() {
  if (!gameOver) {
    const playerSprite = getFirst(player)
    if (getAll(ast1).length > 0 || getAll(ast2).length > 0) {
      for (let proj of getAll(ast1)) {
        proj.y += 1;
        if (proj.y == 7) { proj.remove(); }
        if (proj.x == playerSprite.x && proj.y == playerSprite.y) {
          gameOver = true
          playTune(gameOverTune)
          addText("Asteroid Killed:", {
            y: 2,
            color: color`6`
          })
          addText(`${astkilled}`, {
            y: 4,
            color: color`6`
          })
          addText('Game Over!!', {
            y: 6,
            color: color`3`
          })
          addText('j to restart', {
            y: 8,
            color: color`4`
          })
        }
      }

      for (let proj of getAll(ast2)) {
        proj.y += 1;
        if (proj.y == 7) { proj.remove(); }
        if (proj.x == playerSprite.x && proj.y == playerSprite.y) {
          gameOver = true
          playTune(gameOverTune)
          addText("Asteroid Killed:", {
            y: 2,
            color: color`6`
          })
          addText(`${astkilled}`, {
            y: 4,
            color: color`6`
          })
          addText('Game Over!!', {
            y: 6,
            color: color`3`
          })
          addText('j to restart', {
            y: 8,
            color: color`4`
          })
        }
      }
    }
  }
}

let level = 0
const levels = [
  map`
.........
.........
.........
.........
.........
.........
.........
....p....`
]

setMap(levels[level])
setBackground(bg)

setPushables({
  [player]: []
})

addText("shoot or avoid the", {
  y: 1,
  color: color`2`
})

addText("asteroids", {
  y: 3,
  color: color`2`
})

addText("a & d to move.", {
  y: 5,
  color: color`3`
})

addText("w to shoot.", {
  y: 7,
  color: color`6`
})

addText("j to start!", {
  y: 9,
  color: color`4`
})

onInput("a", () => {
  if (startGame && !gameOver) {
    getFirst(player).x -= 1
    playTune(moveTune)
  }
})


onInput("d", () => {
  if (startGame && !gameOver) {
    getFirst(player).x += 1
    playTune(moveTune)
  }
})

onInput("w", () => {
  if (startGame && !gameOver) {
    const playerSprite = getFirst(player)
    addSprite(playerSprite.x, playerSprite.y, bullet)
    playTune(shootTune)
  }
})

onInput("j", () => {
  clearText()
  startGame = true;
  gameOver = false;
  setMap(levels[level])
  playTune(startTune)
  if (!gameOver) {
    setInterval(shootUpdate, 100);
    setInterval(spawn, randint(2000, 3500))
    setInterval(spawn, randint(2000, 3500))
    setInterval(updateAst, randint(300, 500))
  }
})

afterInput(() => {

})
