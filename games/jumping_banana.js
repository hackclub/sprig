/*
@title: Jumping banana
@author: Ernests
@tags: ['endless','action']
@addedOn: 2024-07-06
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started


Movement:
  w - jump
*/

const player = "p"
const ground = 'g'
const background = 'b'

setLegend(
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
  [ ground, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC0CCCCCCC0CCCCC
CCCCCCCCCCCCCCCC
CCCCCCC0CCCCC0CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
C0CCC0CCCCCCCCCC
CCCCCCCCCC0CCCC0
CCCCCCCCCCCCCCCC
CCCCCCC0CCCCCCCC
CCCCCCCCCCCCCCCC
CCC0CCCCCCC0CCCC
CCCCCCCCCCCCCCCC` ],
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
7777777777777777`],
)

setSolids([player])

setBackground(background)

let mapLine1 = [`.`, `.`, `${Math.random() > 0.85 ? `g` : `.`}`, `${Math.random() > 0.85 ? `g` : `.`}`, `${Math.random() > 0.85 ? `g` : `.`}`, `${Math.random() > 0.85 ? `g` : `.`}`, `${Math.random() > 0.85 ? `g` : `.`}`, `${Math.random() > 0.85 ? `g` : `.`}`, `${Math.random() > 0.85 ? `g` : `.`}`]
let mapLine2 = [`.`, `.`, `${Math.random() > 0.7 ? `g` : `.`}`, `${Math.random() > 0.7 ? `g` : `.`}`, `${Math.random() > 0.7 ? `g` : `.`}`, `${Math.random() > 0.7 ? `g` : `.`}`, `${Math.random() > 0.7 ? `g` : `.`}`, `${Math.random() > 0.7 ? `g` : `.`}`, `${Math.random() > 0.7 ? `g` : `.`}`]

let level = 0
let levels = [
  map`
  .........
  .........
  p........
  ${mapLine1.join(``)}
  ${mapLine2.join(``)}
  ggggggggg
  .........
  `
]

let running = true

let count = 0

setMap(levels[level])

setPushables({
  [ player ]: []
})

getFirst(player).y += 2
let playerY = getFirst(player).y

const gameFunc = () => {  
  // Update the map by modifying mapLine1 and mapLine2 arrays
  mapLine1.push(`${Math.random() > 0.85 ? 'g' : '.'}`)
  mapLine1.splice(0, 1)

  mapLine2.push(`${Math.random() > 0.7 ? 'g' : '.'}`)
  mapLine2.splice(0, 1)
  // Reconstruct the map with the updated lines
  let updatedMap = map`
    .........
    .........
    p........
    ${mapLine1.join('')}
    ${mapLine2.join('')}
    ggggggggg
    .........
  `
  
  // Set the updated map
  setMap(updatedMap)
  getFirst(player).y = playerY 

  count++;

  clearText();
  addText(count + '', {
    x: 10,
    y: 1,
    color: color`2`
  })

  if (tilesWith(ground, player).length > 0) {
    clearInterval(game)
    addText("Game over!", {
      x: 4,
      y: 4,
      color: color`3`
    })

    addText("Press j to restart", {
      x: 1,
      y: 14,
      color: color`D`
    })
    running = false
  }
}

let game = setInterval(gameFunc, 500)

function checkFlag() {
    if(getTile(0, playerY + 1).length > 0 && playerY != 4 && running) {
       window.setTimeout(checkFlag, 50); /* this checks the flag every 100 milliseconds*/
    } else {
      playerY += 1
      getFirst(player).y += 1
    }
}


onInput("w", () => {
  if (getFirst(player).y == 0) {
    return
  }
  playerY -= 1
  getFirst(player).y -= 1

  setTimeout(() => {
    checkFlag()
  }, 1000)
})

onInput('j', () => {
  running = true
  game = setInterval(gameFunc, 500)
  playerY = 4
  getFirst(player).y = 4
  clearText()
})

afterInput(() => {
  
})