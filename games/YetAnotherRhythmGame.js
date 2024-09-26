/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: fruit catch
@author: Sreekar617
@tags: ['beginner']
@addedOn: 2024-08-15
*/

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Move apples dowm
async function scroll() {
  await sleep(250) // Change this number to change difficulity!
  for (i = 0; i < getAll(apple).length; i++) {
    getAll(apple)[i].y += 1
  }
}

const player = "p"
const wall = "w"
const bg = "b"
const apple = "a"
const receptor = "r"
const haircut = "h"
const person = "e"
const fail = "f"
const lava = "l"
var points = 0

setLegend(
  [player, bitmap`
......3333......
....33333333....
...333333333....
...333333333....
.77777733333....
.7227773333333..
.7777773333333..
...33300000333..
...33303333333..
...33330333333..
...333330333....
...333303333....
...333033333....
...333000003....
....33....33....
....33....33....`],
  [wall, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [bg, bitmap`
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
  [apple, bitmap`
................
.........C......
........CC......
........C.......
.....333333.....
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
....33333333....
.....333333.....
................`],
  [person, bitmap`
................
................
................
.333..222222....
3...3.2.....22..
3.....2.2..2.22.
.333..2.......2.
....3.2.......2.
3...3.22.....22.
.333...2222222..
..........22....
..........22....
.......2222222..
.....222..22..22
.....2....22....
................`],
  [fail, bitmap`
................
................
................
33333.222222....
3.....2.....22..
3.....2.2..2.22.
33333.2.......2.
3.....2.......2.
3.....22.....22.
3......2222222..
3.........22....
..........22....
.......2222222..
.....222..22..22
.....2....22....
................`],
  [lava, bitmap`
....22....22....
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
9999999999999999`],
  [receptor, bitmap`
....22....22....
...2........2...
..2.........2...
222.........2...
2...........22..
2.............2.
2.............2.
222...........2.
..2...........2.
..2...........2.
..2.........22..
..2.........2...
..2.........2...
..2.........2...
...2..2222..2...
...2..2..2..2...`],
  [haircut, bitmap`
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
......2222......`]

)

setSolids([])

let level = 0
const levels = [
  map`
w.a..w
w....w
w....w
w....w
w....w
w....w
whhhhw
wrrrrw
wllllw`,
  map`
e`
]

const sounds = [
  tune`
500: C4-500 + F4-500 + C5-500,
15500`,
  tune`
500: E4-500 + A4-500 + E5-500,
15500`,
  tune`
500: G4-500 + C5-500 + G5-500,
15500`,
  tune`
500: E4-500 + E5-500 + B4-500,
15500`
]
setBackground(bg)

setMap(levels[level])
addSprite(1, 7, player)

async function main() {
  let a = Math.floor(Math.random() * 10) + 1 // Generate a random number from 1 to 10
  if (getAll(apple).length < 8) {
    addSprite(Math.floor(Math.random() * 4) + 1, 0, apple) // Add new apple if there aren't already too many onscreen
  }

  await scroll()

  onInput("s", () => {
    getFirst(player).x = 1
  })

  onInput("d", () => {
    getFirst(player).x = 2
  })

  onInput("k", () => {
    getFirst(player).x = 3
  })

  onInput("l", () => {
    getFirst(player).x = 4
  })

  afterInput(() => {
    if (tilesWith(player, apple).length > 0) {
      points += 1
      console.log(points)
    }
  })


  // Unnecessarily complex code resets apples once they hit the bottom
  for (i = 0; i < getAll(apple).length; i++) {
    let appleInstance = getAll(apple)[i]
    if (appleInstance && appleInstance.y == 7) {
      playTune(sounds[Math.floor(Math.random() * 4)])
    } else if (appleInstance && appleInstance.y == 8) {
      appleInstance.y = 0
      appleInstance.x = Math.floor(Math.random() * 4) + 1
      points -= 2
      console.log(points)
    }
  }
}


// if (getFirst(apple).y == 7) {
//   await scroll()
//   getFirst(apple).y = 0
//   addSprite(1, 1, apple)
// }


async function start() {
  for (let i = 0; i < 500; i++) {
    await main()
  }
  setMap(levels[1])
  if (points > 0) {
    addText(`you win!\nscore: ${Math.floor(points)}`, {
      x: 4,
      y: 0,
      color: color`D`
    })
  } else {
    clearTile(0,0)
    addSprite(0,0,fail)
    addText(`you lose\nscore: ${Math.floor(points)}`, {
      x: 4,
      y: 0,
      color: color`3`
    })
  }
}

start()

