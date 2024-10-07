/*
@title: Checker Invasion
@author: Stefan Lighezan
@tags: ['endless']
@addedOn: 2024-07-24
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const redChecker = "r"
const blackChecker = "b"
const cursor = "C"
const heart = "h"
const aPosition = "B"

setLegend(
  [redChecker, bitmap`
....33333333....
...3333333333...
..332233332233..
.33322333322333.
3333223333223333
3333333333333333
3333333333333333
3333333333333333
3333233333323333
3333322222233333
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....`],
  [blackChecker, bitmap`
....00000000....
...0000000000...
..002220022200..
.00022200222000.
0000222002220000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
.00000000000000.
..000000000000..
...0000000000...
....00000000....`],
  [cursor, bitmap`
0000000..0000000
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
................
................
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0000000..0000000`],
  [heart, bitmap`
................
...333....333...
..33333..33333..
.33333333333333.
3333333333333333
3333333333333333
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......
................`],
  [aPosition, bitmap`
....11111111....
...1111111111...
..111111111111..
.11111111111111.
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
.11111111111111.
..111111111111..
...1111111111...
....11111111....`],
)
setSolids([])

let enemiesKilled = 0
let level = 0
let enemies = []
let hasLostGame = false

let health = 3
let maxHealth = 3
let timeElapsed = 0
let hasLost = false
const levels = [
  map`
................h..
...................
...................
...................
...................
...................
...................
...................
...................
.........rC........
...................
...................
...................
...................
...................
...................
...................
...................
...................`
]

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawnEnemy() {
  if (!hasLostGame) {
    const edges = [
      { x: 0, y: Math.floor(Math.random() * height()) }, // Left edge
      { x: width() - 1, y: Math.floor(Math.random() * height()) }, // Right edge
      { x: Math.floor(Math.random() * width()), y: 0 }, // Top edge
      { x: Math.floor(Math.random() * width()), y: height() - 1 } // Bottom edge
    ]
    const edge = edges[Math.floor(Math.random() * edges.length)]

    addSprite(edge.x, edge.y, blackChecker)
    enemies = getAll(blackChecker)
  }
}


let moveInterval = 1000;

function updateMoveInterval() {
  if (!hasLostGame) {
    moveInterval = Math.max(300, 1000 - (enemiesKilled * 5));
  }
}

function moveEnemy() {
  if (!hasLostGame) {
    for (let i = 0; i < enemies.length; i++) {
      move(enemies[i]);
    }
  }
}


setInterval(() => {
  updateMoveInterval();
}, 1000);

setInterval(() => {
  if (!hasLostGame) {
    timeElapsed += 0.1
    clearText()
    addText(health.toString(), { x: 17, y: 0, color: color`0` })
    addText("Killed: " + enemiesKilled, { x: 2, y: 0, color: color`0` })
    if (timeElapsed >= 60) {
      const minutes = Math.floor(timeElapsed / 60)
      const seconds = (timeElapsed % 60).toFixed(0)
      addText(`${minutes}m ${seconds}s`, { x: 8, y: 15, color: color`0` })
    } else {
      addText(`${timeElapsed.toFixed(1)}`, { x: 12, y: 15, color: color`0` })
    }
  }
}, 100)

setInterval(() => {
  if (health + 1 <= maxHealth) {
    health++
  }

}, 30000)


setInterval(moveEnemy, moveInterval);
setInterval(spawnEnemy, 2000);

function moveEnemyTowardsPlayer() {
  if (!hasLost) {
    for (let i = 0; i < enemies.length; i++) {
      move(enemies[i])
    }
  }
}

function checkCollisions() {
  const playerSprite = getFirst(redChecker)
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i]
    if (enemy.x === playerSprite.x && enemy.y === playerSprite.y) {
      enemies[i].remove()
      enemies.splice(i, 1);
      health--

      if (health <= 0) {
        enemies.forEach(enemy => enemy.remove())

        enemies = []
        timeElapsed = 0
        enemiesKilled = 0
        clearText()

        addText("Tap K to Restart", { x: 2, y: 8, color: color`0` })

        hasLostGame = true
      }
    }
  }
}



setInterval(() => {
  checkCollisions()
}, 100)

function move(enemySprite) {
  const playerSprite = getFirst(redChecker)
  const currentX = enemySprite.x
  const currentY = enemySprite.y


  let nextX = currentX
  let nextY = currentY

  if (enemySprite.x < playerSprite.x) {
    nextX = currentX + 1
  } else if (enemySprite.x > playerSprite.x) {
    nextX = currentX - 1
  }
  if (enemySprite.y < playerSprite.y) {
    nextY = currentY + 1
  } else if (enemySprite.y > playerSprite.y) {
    nextY = currentY - 1
  }

  enemySprite.x = nextX
  enemySprite.y = nextY

}

let scrollOffset = 0
let scrollSpeed = 0.1

function scrollBackground() {

}

scrollBackground();

setMap(levels[level])

onInput("w", () => {
  getFirst(cursor).y -= 1
})

onInput("a", () => {
  getFirst(cursor).x -= 1
})

onInput("s", () => {
  getFirst(cursor).y += 1
})

onInput("d", () => {
  getFirst(cursor).x += 1
})

onInput("j", () => {
  const cursorSprite = getFirst(cursor)
  const spritesAtCursor = getTile(cursorSprite.x, cursorSprite.y)


  const blackCheckerAtCursor = spritesAtCursor.find(sprite => sprite.type === blackChecker)

  if (blackCheckerAtCursor) {
    enemiesKilled++
    blackCheckerAtCursor.remove()
  }
})

onInput("k", () => {
  if (hasLostGame) {
    enemies.forEach(enemy => enemy.remove())
    enemies = []
    timeElapsed = 0
    enemiesKilled = 0
    health = maxHealth
    clearText()
    hasLostGame = false
  }
})

afterInput(() => {

})
