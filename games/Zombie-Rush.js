/*
@title: Zombie Rush
@author: Arghya Vyas
@description: A simple shooter game where you shoot zombies!
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const zombie = "z"
const bullet = "b"
const playershootingl = "l"
const playershootingr = "r"
const bgmusic = tune`
285.7142857142857: F4^285.7142857142857 + C4~285.7142857142857,
285.7142857142857: E4^285.7142857142857 + D4~285.7142857142857,
285.7142857142857: C4~285.7142857142857 + G4^285.7142857142857,
285.7142857142857: D4~285.7142857142857 + A4^285.7142857142857,
285.7142857142857: C4~285.7142857142857 + E4^285.7142857142857 + G4^285.7142857142857,
285.7142857142857: D4~285.7142857142857 + F4^285.7142857142857,
285.7142857142857: C4~285.7142857142857 + E4^285.7142857142857,
285.7142857142857: G4^285.7142857142857 + D4~285.7142857142857,
285.7142857142857: A4^285.7142857142857 + C4~285.7142857142857,
285.7142857142857: G4^285.7142857142857 + D4~285.7142857142857,
285.7142857142857: F4^285.7142857142857 + C4~285.7142857142857,
285.7142857142857: E4^285.7142857142857 + D4~285.7142857142857,
285.7142857142857: C4~285.7142857142857,
285.7142857142857: E4^285.7142857142857 + D4~285.7142857142857,
285.7142857142857: F4^285.7142857142857 + C4~285.7142857142857,
285.7142857142857: E4^285.7142857142857 + D4~285.7142857142857,
285.7142857142857: G4^285.7142857142857 + C4~285.7142857142857,
285.7142857142857: A4^285.7142857142857 + D4~285.7142857142857,
285.7142857142857: G4^285.7142857142857 + C4~285.7142857142857,
285.7142857142857: F4^285.7142857142857 + D4~285.7142857142857,
285.7142857142857: E4^285.7142857142857 + C4~285.7142857142857,
285.7142857142857: D4~285.7142857142857,
285.7142857142857: E4^285.7142857142857 + C4~285.7142857142857,
285.7142857142857: F4^285.7142857142857 + D4~285.7142857142857,
285.7142857142857: E4^285.7142857142857 + C4~285.7142857142857,
285.7142857142857: G4^285.7142857142857 + D4~285.7142857142857,
285.7142857142857: A4^285.7142857142857 + C4~285.7142857142857,
285.7142857142857: G4^285.7142857142857 + D4~285.7142857142857,
285.7142857142857: F4^285.7142857142857 + C4~285.7142857142857,
285.7142857142857: E4^285.7142857142857 + D4~285.7142857142857,
285.7142857142857: C4~285.7142857142857,
285.7142857142857: E4^285.7142857142857 + D4~285.7142857142857`
const shootr = tune`
500: G4-500 + F4-500 + E4/500 + D4/500,
15500`
const shootl = tune`
500: F4^500 + E4^500 + D4-500 + C4-500,
15500`
const tutorialbgr = "1"
const tutorialbgl = "2"
const hiddenwall = "w"
const boss = "a"

// tuning
const ZOMBIE_MOVE_DELAY = 5 


setLegend(
  [ player, bitmap`
................
................
................
................
................
................
......0000......
......0000......
......0000......
.1111.0000......
...10..00..1111.
....000000001...
.......00...1...
.......00.......
......0..0......
......0..0......` ],
  [ zombie, bitmap`
................
................
................
................
................
.......88.......
......DDDD......
......0D0D......
......DDDD......
......000D......
.......DD.......
......DDD.......
.......DD.......
................
................
................` ],
  [ bullet, bitmap`
................
................
................
................
................
.....9..........
..........9.....
.......66.......
.......66.......
................
.....9..........
..........9.....
................
................
................
................` ],
  [ playershootingl, bitmap`
................
................
................
................
................
................
.6....0000......
......0000......
.9....0000......
91111.0000......
.9.10..00..1111.
..6.000000001...
.......00...1...
.......00.......
......0..0......
......0..0......` ],
  [ playershootingr, bitmap`
................
................
................
................
................
................
......0000......
......0000...6..
......0000......
.1111.0000....9.
...10..00..11119
....000000001.9.
.......00...1...
.......00....6..
......0..0......
......0..0......` ],
  [ tutorialbgr, bitmap`
................
................
................
................
................
................
.......00.......
....66.00.66....
...6006..6006...
...6006..6006...
....66.00.66....
.......00.......
................
................
................
................` ],
  [ tutorialbgl, bitmap`
................
.......0........
......000.......
.....0.0.0......
.......0........
......333.......
..0...333....0..
.0..33...33...0.
000033...3300000
.0..33...33...0.
..0...333....0..
......333.......
.......0........
.....0.0.0......
......000.......
.......0........` ],
  [ hiddenwall, bitmap`
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
................` ],
  [ boss, bitmap`
......8H88......
...888888H888...
..888HH88888888.
.88HH888888H8H8.
.44444443444444.
.42222443422224.
.42002443420024.
.42002243420024.
.44222243422224.
.44444444344434.
.44444443444344.
.44444444444444.
.40000000000004.
.402C332CC2C004.
.40000000000004.
.44444444444444.` ]
)

setSolids([player, tutorialbgr, tutorialbgl, hiddenwall])

let level = 0
let gameOver = false

const levels = [
  map`
ww..z.z.
21......
ww....z.
ww.p....`,
  map`
....z...
.z.z..z.
p....z..
..z.z.z.
....z...
..z...z.`,
  map`
z..z......
......z...
z.z.......
z.........
.........z
z.......z.
..p...z...
..........`,
  map`
.z......z.
...a..a..a
..z.z.....
z......za.
...z...z.z
z....z..z.
..p.....a.
.......z..`,
  map`
.z...z....
...z...z.z
..z.z.z...
z....z.z..
..az...zzz
a....z..z.
..p.......
....a..z.z`,
  map`
.z...z.z..
.z.z.a.zzz
..z.z.z.z.
z.z..z.za.
...z.a.zzz
a....z..z.
..p..zz..a
a....z.z.z`,

]

setMap(levels[level])
playTune(bgmusic, Infinity)



function animateShoot(p, shootingSprite) {
  clearTile(p.x, p.y)
  addSprite(p.x, p.y, shootingSprite)

  setTimeout(() => {
    const s = getFirst(shootingSprite)
    if (s) {
      clearTile(s.x, s.y)
      addSprite(s.x, s.y, player)
    }
  }, 150) 
}

setPushables({
  [ player ]: []
})

addText("Controls", { 
  x: 0,
  y: 4,
  color: color`3`
})
addText("wasd, j&l to shoot", { 
  x: 1,
  y: 14,
  color: color`3`
})
addText("dont touch zombies", { 
  x: 1,
  y: 1,
  color: color`3`
})
  addText("i=reset lvl", { 
    x: 0,
    y: 3,
    color: color`3`
  })
  addText("k=reset game", { 
    x: 0,
    y: 10,
    color: color`3`
  })


onInput("s", () => {
  if (gameOver) return
  const p = getFirst(player)
  if (!p) return
  p.y += 1
})
onInput("w", () => {
  if (gameOver) return
  const p = getFirst(player)
  if (!p) return
  p.y -= 1
})
onInput("d", () => {
  if (gameOver) return
  const p = getFirst(player)
  if (!p) return
  p.x += 1
})
onInput("a", () => {
  if (gameOver) return
  const p = getFirst(player)
  if (!p) return
  p.x -= 1
})

onInput("l", () => { 
  if (gameOver) return
  const p = getFirst(player)
  if (!p) return

  addSprite(p.x + 1, p.y, bullet)
  const b = getTile(p.x + 1, p.y).find(s => s.type === bullet)
  if (b) b.direction = 1 
  playTune(shootl)
  animateShoot(p, playershootingr)
})

onInput("j", () => {
  if (gameOver) return
  const p = getFirst(player)
  if (!p) return

  addSprite(p.x - 1, p.y, bullet)
  const b = getTile(p.x - 1, p.y).find(s => s.type === bullet)
  if (b) b.direction = -1 
  playTune(shootr)
  animateShoot(p, playershootingl)
})

onInput("i", () => {
  if (gameOver) return
  clearText()
  setMap(levels[level])
})

onInput("k", () => {
  clearText()
  level = 0
  gameOver = false
  setMap(levels[level])
  addText("Controls", { 
    x: 0,
    y: 4,
    color: color`3`
  })
  addText("wasd, j&l to shoot", { 
    x: 1,
    y: 14,
    color: color`3`
  })
  addText("dont touch zombies", { 
    x: 1,
    y: 1,
    color: color`3`
  })
  addText("i=reset lvl", { 
    x: 0,
    y: 3,
    color: color`3`
  })
  addText("k=reset game", { 
    x: 0,
    y: 10,
    color: color`3`
  })
})


function isBlockedForZombie(x, y) {
  if (x < 0 || x >= width() || y < 0 || y >= height()) return true
  const tile = getTile(x, y)
 
  return tile.some(s => s.type === zombie || s.type === boss || s.type === hiddenwall || s.type === tutorialbgr || s.type === tutorialbgl)
}

function lose() {
  clearText()
  addText("YOU LOSE!", { x: 5, y: 7, color: color`3` })
  addText("Dont walk", {x:5, y: 8, color: color`9` })
  addText("into zombies", {x:5, y: 9, color: color`9` })
  gameOver = true
}


function handleHit(sprite, bulletSprite) {
  if (sprite.type === zombie) {
  sprite.remove()
}
bulletSprite.remove()
}
afterInput(() => {
  if (gameOver) return

  const p = getFirst(player)
  if (!p) return


  if (getTile(p.x, p.y).some(s => s.type === zombie || s.type === boss)) {
    lose()
    return
  }

  const bullets = getAll(bullet)
  for (const b of bullets) {
    if (gameOver) break
    if (b.direction === undefined) {
      b.remove()
      continue
    }


    let hit = getTile(b.x, b.y).find(s => s.type === zombie || s.type === boss)
    if (hit) {
      handleHit(hit, b)
      continue
    }

    b.x += b.direction


    if (b.x < 0 || b.x >= width()) {
      b.remove()
      continue
    }


    hit = getTile(b.x, b.y).find(s => s.type === zombie || s.type === boss)
    if (hit) {
      handleHit(hit, b)
      continue
    }
  }


  const zombies = getAll(zombie)
  for (const z of zombies) {
    if (gameOver) break

    if (z.moveCooldown === undefined) z.moveCooldown = 0
    if (z.moveCooldown > 0) {
      z.moveCooldown--
      continue
    }

    const dx = Math.sign(p.x - z.x)
    const dy = Math.sign(p.y - z.y)

    let moved = false

 
    if (Math.abs(p.x - z.x) > Math.abs(p.y - z.y)) {
      if (dx !== 0 && !isBlockedForZombie(z.x + dx, z.y)) {
        z.x += dx
        moved = true
      }
    }

    if (!moved && dy !== 0 && !isBlockedForZombie(z.x, z.y + dy)) {
      z.y += dy
      moved = true
    }

    if (!moved && dx !== 0 && !isBlockedForZombie(z.x + dx, z.y)) {
      z.x += dx
      moved = true
    }

    if (moved) {
      z.moveCooldown = ZOMBIE_MOVE_DELAY
    }


    if (getTile(z.x, z.y).some(s => s.type === player)) {
      lose()
      return
    }
  }

  if (getAll(zombie).length === 0) {
  clearText()
  level++
  if (level < levels.length) {
    setMap(levels[level])
    if (level === 3) {
      addText("walk around the bosses!", { x: 1, y:1 , color: color`H` })
      addText("they cant be shot", { x: 1, y:8 , color: color`H` })
    }
  } else {
    addText("YOU WIN!", { x: 5, y: 7, color: color`6` })
    gameOver = true
  }
  }
})
