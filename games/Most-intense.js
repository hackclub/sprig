/* @title: Most intense 
   @description: A wall avoiding game based on a bad time sim 
   @author: aditya verma 
   @tags: ['best game ever'] 
   @addedOn: 2026-10-5 
*/

const player = "p"
const wall = "w"

setSolids([player])

setLegend(
  [wall, bitmap`
    ................
    ................
    ...000000000....
    ...000000000....
    ...000000000....
    ...000000000....
    ...000000000....
    ...000000000....
    ...000000000....
    ...000000000....
    ...000000000....
    ................
    ................
    ................
    ................
    ................
  `],
  [player, bitmap`
    ......0000......
    ......0000......
    .......00.......
    .....000000.....
    ....00000000....
    .....000000.....
    ......0000......
    ......0000......
    .....00..00.....
    ....00....00....
    ................
    ................
    ................
    ................
    ................
    ................
  `]
)

const level = [
  map`
    .........
    .........
    .........
    .........
    .........
    .........
    .........
  `
]

let g1 = 0
let g2 = 0

function spawnWave() {
  g1 = Math.floor(Math.random() * 7)
  g2 = Math.floor(Math.random() * 7)
  for (let y = 0; y <= 6; y++) {
    if (y !== g1 && y !== g2) {
      addSprite(8, y, wall)
    }
  }
}

let loop
let survivalTime = 0
let timerInterval
let gameSpeed = 255

function startGameLoop() {
  loop = setInterval(() => {
    let p = getFirst(player)
    let walls = getAll(wall)
    let hit = false
    
    walls.forEach(w => {
      if (w.x === 0) {
        hit = true
      } else {
        w.x--
      }
    })
    
    if (p) {
      let items = getTile(p.x, p.y)
      if (items.some(i => i.type === wall)) {
        clearInterval(loop)
        clearInterval(timerInterval)
        p.remove()
        clearText()
        addText("GAME OVER", { x: 3, y: 2, color: color`3` })
        addText(`Survived: ${survivalTime}s`, { x: 3, y: 4, color: color`5` })
        return
      }
    }
    
    if (hit) {
      walls.forEach(w => w.remove())
      spawnWave()
    }
  }, gameSpeed)
}


let gameState = "start"

function showHomeScreen() {
  clearText()
  setMap(level[0])
  addText("MOST INTENSE", { x: 1, y: 2, color: color`3` })
  addText("Press W to Start", { x: 1, y: 5, color: color`5` })
  addText("WASD to move", { x: 1, y: 6, color: color`4` })
  addText("Avoid the walls", { x: 1, y: 7, color: color`9` })
}


showHomeScreen()

onInput("w", () => {
  if (gameState === "start") {
    gameState = "playing"
    clearText()
    setMap(level[0])
    addSprite(1, 3, player)
    
    setTimeout(() => {
      clearText()
      addText("GOODBYE", { x: 4, y: 2, color: color`3` })
      spawnWave()
      
      timerInterval = setInterval(() => {
        survivalTime++
        addText(`Time: ${survivalTime}`, { x: 4, y: 1, color: color`9` })
        if (survivalTime % 3 === 0) {
          gameSpeed -= 20
          clearInterval(loop)
          startGameLoop()
        }
      }, 1000)
      
      startGameLoop()
    }, 2000)
    
  } else if (gameState === "playing") {
    let p = getFirst(player)
    if (p && p.y > 0) p.y--
  }
})

onInput("s", () => {
  if (gameState === "playing") {
    let p = getFirst(player)
    if (p && p.y < 6) p.y++
  }
})

onInput("a", () => {
  if (gameState === "playing") {
    let p = getFirst(player)
    if (p && p.x > 0) p.x--
  }
})

onInput("d", () => {
  if (gameState === "playing") {
    let p = getFirst(player)
    if (p && p.x < 6) p.x++
  }
})