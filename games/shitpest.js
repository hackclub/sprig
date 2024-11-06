/*
@title: shitpest
@author: Mason Meirs
@tags: ['strategy']
@addedOn: 2022-12-24
snwy.me
*/

const player = "p"
const enemy  = "e"
const lane   = "w"
const laneL  = "z"
const laneR  = "x"

const bg     = "b"
const blBg   = "h"
const bullet = "l"

let score    = 0
let gameOver = false

let useSuper = true

setLegend(
  [bullet, bitmap`
................
................
.....222222.....
....23333332....
....23333332....
....23333332....
....23333332....
....23333332....
....23333332....
....23333332....
....23333332....
....23333332....
....23333332....
....23333332....
.....222222.....
................`],
  [player, bitmap`
5000000220000005
5002000220000005
5000002L12000005
5020002L12020005
500002L551200025
520002L551200005
50002L5557120205
50002L5557120005
5002L55577712005
5002L55577712005
502L555577771205
502L555777771205
52L5555777777125
52L5557777777125
2L55557777777712
2222222222222222`],
  [enemy, bitmap`
0000000000000000
0000222222220000
0002333333322000
0023333333332200
0233233333233220
0233323332333220
0233333333333220
0233323332333220
0233333333333220
0233322222333220
0233233333233220
0223333333332220
0022333333322200
0002222222222000
0000222222220000
0000000000000000`],
  [lane, bitmap`
5000000000000005
5000200000002005
5000000000000005
5000000000000005
5000000000000005
5000000000200005
5000200000000005
5000000000000005
5000000002000005
5000000000000005
5002000000002005
5000000000000005
5000000000000005
5000000000000005
5000000020000005
5000200000000005`],
  [laneL, bitmap`
5000000000000000
5000200000002000
5000000000000000
5000000000000002
5000000000000000
5000000000200000
5000000200000000
5000000000000000
5000000000000002
5000000000000000
5002000000002000
5000000020000000
5000000000000002
5000000000000000
5000000000000000
5000200000000000`],
  [laneR, bitmap`
0000000000000005
2000000000002005
0000000020000005
0000000000000005
0000020000000005
0000000000200005
0000000000000005
0000000000000005
0200000002000005
0000000000000005
0000000000002005
0000000000000005
0000020000000005
2000000000020005
0000000020000005
0000200000000005`],
  [bg, bitmap`
0000000000000000
0200000200000200
0000000000000000
0000000000000002
0020000002000000
0000000000000000
0000000000002000
0000000000000000
0200000000000002
0000000000000000
0000002000000000
0000000000002000
0000000000000000
0000000000000000
0200000000000000
0000000000020000`],
  [blBg, bitmap`
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
)

setMap(
  map`
hhhhhhbbbb
bbbbbbbbbb
zbbbbbbbbx
wzbbbbbbxw
wwzbbbbxww
wwwzbbxwww
wwwwzxwwww
wwwwwwwwww`
)

onInput("a", () => {
  if(!gameOver) {
    getFirst(player).x -= 1
    handleMovement()
  }
})

onInput("d", () => {
  if(!gameOver) {
    getFirst(player).x += 1
    handleMovement()
  }
})

onInput("i", () => {
  if(!gameOver)
    fireProjectile(getFirst(player))
})

onInput("j", () => {
  if(useSuper && !gameOver) {
    getAll(enemy).forEach(e => e.remove())
    useSuper = false
  }
})

function fireProjectile(player) {
  addSprite(player.x, player.y, bullet)
}

function handleMovement() {
  switch (getFirst(player).x) {
    case 1: getFirst(player).y = 4; break
    case 2: getFirst(player).y = 5; break
    case 3: getFirst(player).y = 6; break
    case 4: 
    case 5: getFirst(player).y = 7; break
    case 6: getFirst(player).y = 6; break
    case 7: getFirst(player).y = 5; break
    case 8: getFirst(player).y = 4; break
  }
}

addSprite(4, 7, player)

function spawnEnemies() {
  let chance = Math.floor(Math.random() * 10) % 10
  switch(chance) {
    case 9:
    case 8:
      if(chance % 2 == 0)
        addSprite(1, 0, enemy)
      else
        addSprite(7, 0, enemy)
      break
    case 7:
    case 6:
      if(chance % 2 == 0)
        addSprite(2, 0, enemy)
      else
        addSprite(6, 0, enemy)
      break
    case 5:
    case 4:
      if(chance % 2 == 0)
        addSprite(3, 0, enemy)
      else
        addSprite(5, 0, enemy)
      break
    case 3:
    case 2: 
    case 1: 
    case 0:
      if(chance % 2 == 0)
        addSprite(4, 0, enemy)
      else
        addSprite(4, 0, enemy)
      break
    default:
      // console.log(chance)
  }
}

function moveEnemies() {
  getAll(enemy).forEach(e => {
    e.y += 1
  })
}

function cleanup() {
  getAll(enemy).forEach(e => {
    if(e.y == 7) {
      e.remove()
      doGameOver()
    }
  })
}

function moveProjectiles() {
  getAll(bullet).forEach(b => {
    getTile(b.x, b.y - 1).forEach(t => {
        if(t.type == enemy) {
          t.remove()
          b.remove()
          score++
        }
    })
    b.y--
    if(b.y <= 0) 
      b.remove()
  })
}

function doGameOver() {
  clearInterval(spawnInterval)
  clearInterval(moveInterval)
  clearInterval(cleanup)
  clearInterval(scoreInterval)
  clearInterval(bulletInterval)

  gameOver = true

  getAll(enemy).forEach(e => e.remove())
  getAll(bullet).forEach(b => b.remove())
  getFirst(player).remove()

  drawText()
  
  addText("GAME OVER", { x: 6, y: 5, color: color`2`})
  addText("GAME OVER", { x: 6, y: 4, color: color`3`})
  addText("GAME OVER", { x: 6, y: 3, color: color`2`})
}

function drawText() {
  clearText()
  addText("SCORE: " + score, { x: 0, y: 0, color: color`6`})
  if(useSuper && !gameOver)
    addText("SUPER ACTIVE", { x: 0, y: 1, color: color`4`})
}

function setSuper() {
  useSuper = true
}

let spawnInterval   = setInterval(spawnEnemies, 1000)
let moveInterval    = setInterval(moveEnemies, 1000)
let cleanupInterval = setInterval(cleanup, 1000)
let scoreInterval   = setInterval(drawText, 50)
let bulletInterval  = setInterval(moveProjectiles, 50)
let superInterval   = setInterval(setSuper, 20000)
