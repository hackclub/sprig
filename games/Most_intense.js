/* 
@title: Most_intense
@description: This is a wall avoidence game that i have made. It is based on the bad time sim from sans except youy only face walls. This was my first project and it was very fun
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

const level = map`
  .......
  .......
  .......
  .......
  .......
  .......
  .......
`

setMap(level)
addSprite(1, 3, player)

onInput("w", () => {
  let p = getFirst(player)
  if (p && p.y > 0) p.y--
})
onInput("a", () => {
  let p = getFirst(player)
  if (p && p.x > 0) p.x--
})
onInput("s", () => {
  let p = getFirst(player)
  if (p && p.y < 6) p.y++
})
onInput("d", () => {
  let p = getFirst(player)
  if (p && p.x < 6) p.x++
})

addText("hello :)", { x: 4, y: 4, color: color`8` })

function spawnWave() {
  let g1 = Math.floor(Math.random() * 7)
  let g2 = Math.floor(Math.random() * 7)
  while (g2 === g1) {
    g2 = Math.floor(Math.random() * 7)
  }
  for (let y = 0; y <= 6; y++) {
    if (y !== g1 && y !== g2) {
      addSprite(6, y, wall)
    }
  }
}

let loop

setTimeout(() => {
  clearText()
  addText("GOODBYE", { x: 4, y: 1, color: color`3` })
  spawnWave()

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
        p.remove()
        clearText()
        addText("GAME OVER", { x: 1, y: 3, color: color`3` })
        return
      }
    }

    if (hit) {
      walls.forEach(w => w.remove())
      spawnWave()
    }
  }, 250)
}, 2000)
