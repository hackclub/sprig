/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: subway surfers
@author: AKKS1013
@tags: []
@addedOn: 2024-09-03
*/

const player = "p"
const obstacle_low = "l"
const obstacle_high = "h"

let obstacleInterval = setInterval(moveObstacles, 1000)
let spawn = false

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
  [ obstacle_low, bitmap`
  ................
  ................
  ................
  ................
  ................
  ................
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333`],
  [ obstacle_high, bitmap`
  5555555555555555
  5555555555555555
  5555555555555555
  5555555555555555
  5555555555555555
  5555555555555555
  5..............5
  5..............5
  5..............5
  5..............5`]
)

setSolids([ player, obstacle_low, obstacle_high ])

function spawnObstacle(obstacle, three) {
  const rand = Math.random()
  const randx = Math.floor(Math.random() * width())
  const randn = Math.random()

  while (obstacle === randx) {
    randx = Math.floor(Math.random() * width())
  }
  
  if (rand <= 0.5) {
    addSprite(randx, 0, obstacle_low)
    obstacle = randx
  } else {
    addSprite(randx, 0, obstacle_high)
    obstacle = randx
  }
  if (randn > 0.5 && !three) {
    three = true
    spawnObstacle(randx, three)
  }
}

function moveObstacles() {
  const obstacles = getAll(obstacle_low).concat(getAll(obstacle_high));

  obstacles.forEach(obstacle => {
    if (getTile(obstacle.x, obstacle.y + 1).length !== 0) {
      addText("GAME OVER", {x: 5, y: 4, color: color`3`});
      clearInterval(obstacleInterval);
    } else {
    
      obstacle.y += 1;

      if (obstacle.y >= height() - 1) {
        obstacle.remove();
      }
    }
  });

  if (spawn === true) {
    spawnObstacle(-1, false)
    spawn = false
  } else {
    spawn = true
  }
}

let level = 0
const levels = [
  map`
...
...
l.h
.p.`
]

setMap(levels[level])

setPushables({
  [ obstacle_low ]: [ player ],
  [ obstacle_high ]: [ player ]
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("i", () => {
  if (getTile(getFirst(player).x, getFirst(player).y - 1)[0].type === obstacle_low) {
    getFirst(player).y -= 2
  }
})

onInput("k", () => {
  if (getTile(getFirst(player).x, getFirst(player).y - 1)[0].type === obstacle_high) {
    getFirst(player).y -= 2
  }
})


afterInput(() => {
  
})

