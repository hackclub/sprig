/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Pirate bay
@author: Cassius
@description: Platformer where you control a slime and escape the sinking pirate ships
@tags: ['Platformer', 'Pirate']
@addedOn: 2026-09-09
*/
 
const player = "p"
const pattack = "a"
const phurt = "h"
const pdead = "k"
const wall = "W"
const rope = "r"
const tentacle = "t"
const tentacle2 = "T"
const tentacleleft = "l"
const tentacleleft2 = "L"
const tentacleup = "u"
const tentacleup2 = "V"
const tentacledown = "d"
const tentacledown2 = "D"
const tpart = "x"
const tpartup = "U"
const goal = "g"
const water = "b"
const acid = "q"
const lava = "y"
const down = "v"


const heartFull = "H"
const heartEmpty = "E"



let yVel = 0
let jumpPressed = false

let health = 3
let damageCooldown = 0

let waterTimer = 0
let hurtTimer = 0

let facing = 1

let waterSpeeds = [2400, 24, 9, 10, 5, 5]   
let waterSpeed = waterSpeeds[0]

setLegend(
  [ player, bitmap`
................
................
................
................
................
................
................
................
................
.....DD4444.....
....DDDD4444....
...DD0DDD0444...
..DDDDDDD4444...
..DDDDDDDD4444..
..DDDD00004444..
..DDDDDDDD4444..` ],
  [ pattack, bitmap`
................
................
....222.2222....
...........222..
........222..2..
...........22.2.
.............2..
......22222.2.11
...22.......2111
.....DD4444.111.
....DDDD444111..
...DD0DDD0111...
..DDDDDDDCL14...
..DDDDDDC6C444..
..DDDD000C4444..
..DDDDDDDD4444..` ],
  [ phurt, bitmap`
................
................
................
................
...3......33....
...33.....3.....
....3....3.....3
....3...3.....3.
3............3..
.3..............
.......333......
.....3333333....
...3333333333...
..330333330333..
..333300033333..
..333033303333..` ],
  [ pdead, bitmap`
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
....DDDDD4......
...DDDDDD444....
..DDD0DDD0444...
DDDDDDDDDD4444..
DDDDDDDDDD444444` ],
  [ wall, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [ tentacle, bitmap`
................
................
................
................
...............H
............H8H8
......HHHHHHHHHH
...H8H8H8H8H8H8H
HHHHHHHHHHHHHHHH
HH8H8H8H8H8H8H8H
.........HHHHHHH
................
................
................
................
................`],
  [ tentacle2, bitmap`
................
................
................
................
................
.........HHHHHHH
HH8H8H8H8H8H8H8H
HHHHHHHHHHHHHHHH
...H8H8H8H8H8H8H
......HHHHHHHHHH
............H8H8
...............H
................
................
................
................`],
  [ tentacleup, bitmap`
......HH........
......HH........
......8H........
......HHH.......
......8H8.......
......HHH.......
......8H8H......
......HHHH......
......8H8H......
.....HHHHH......
.....H8H8H......
.....HHHHH......
.....H8H8HH.....
.....HHHHH8.....
.....H8H8HH.....
.....HHHHH8H....`],
  [ tentacleup2, bitmap`
........HH......
........HH......
........H8......
.......HHH......
.......8H8......
.......HHH......
......H8H8......
......HHHH......
......H8H8......
......HHHHH.....
......H8H8H.....
......HHHHH.....
.....HH8H8H.....
.....8HHHHH.....
.....HH8H8H.....
....H8HHHHH.....`],
  [ tentacleleft, bitmap`
................
................
................
................
................
HHHHHHH.........
H8H8H8H8H8H8H8HH
HHHHHHHHHHHHHHHH
H8H8H8H8H8H8H...
HHHHHHHHHH......
8H8H............
H...............
................
................
................
................`],
  [ tentacleleft2, bitmap`
................
................
................
................
H...............
8H8H............
HHHHHHHHHH......
H8H8H8H8H8H8H...
HHHHHHHHHHHHHHHH
H8H8H8H8H8H8H8HH
HHHHHHH.........
................
................
................
................
................`],
  [ tpart, bitmap`
................
................
................
.HHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
H8H8H8H8H8H8H8H8
HHHHHHHHHHHHHHHH
8H8H8H8H8H8H8H8H
HHHHHHHHHHHHHHHH
8H8H8H8H8H8H8H8H
HHHHHHHHHHHHHHHH
.HHHHHHHHHHHHHHH
................
................
................
................`],
  [ tpartup, bitmap`
.....H8H8HHH....
....HHHHHH8HH...
....HH8H8HHHH...
....HHHHHH8HH...
....HH8H8HHHH...
....HHHHHH8HH...
....HH8H8HHHH...
....HHHHHH8HH...
....HH8H8HHHH...
....HHHHHH8HH...
....HH8H8HHHH...
....HHHHHH8HH...
....HH8H8HHHH...
....HHHHHH8HH...
....HH8H8HHHH...
....HHHHHH8HH...`],
  [ goal, bitmap`
................
................
................
.......HHHHHH...
......HH8888HH..
....HHH888888H..
....H88HHHH88HH.
...H88HH88HH88H.
..HH88H8H888H8H.
..HH88H88H88H8H.
...H888HHH88H...
....H8888888H...
....HH88888HH...
.....HHHHHHH....
................
................`],
  [ water, bitmap`
5777777777777777
5577777555777755
7775577775777777
7755777777557777
7777777777757777
7777777755775777
7775575555777755
5777777777755777
7577755577577777
7777777777755557
7757775557777777
7755777777555557
7777777755777777
7775555777777777
7755777555575577
7777777777777777`],
  [ heartFull, bitmap`
................
................
................
................
....3333.3333...
...33333333333..
...33333332233..
...33333333233..
...33333333333..
....333333333...
.....3333333....
......33333.....
.......333......
........3.......
................
................` ],
  [ heartEmpty, bitmap`
................
................
................
................
....333..3333...
...33333.33333..
...3333..32233..
...3333.333233..
...3333..33333..
....3333.3333...
.....33..333....
......3.333.....
......3..3......
.......3.3......
................
................` ],
  [ acid, bitmap`
D444444444444444
DD44444DDD4444DD
444DD4444D444444
44DD444444DD4444
44444444444D4444
44444444DD44D444
444DD4DDDD4444DD
D4444444444DD444
4D444DDD44D44444
44444444444DDDD4
44D444DDD4444444
44DD444444DDDDD4
44444444DD444444
444DDDD444444D44
44DD444DDDD4DDD4
4444444444444444`],
  [ lava, bitmap`
3999999999999999
3399999333999933
9993399993999999
9933999999339999
9999999999939999
9999999933993999
9993393333999933
3999999999933999
9399933399399999
9999999999933339
9939993339999999
9933999999333339
9999999933999999
9993333999999999
9933999333393399
9999999999999999`],
  [ down, bitmap`
................
................
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
....44444444....
....D4444444....
.....D44444.....
......D444......
.......44.......
................
................`],
  [ rope, bitmap`
.......CC.......
.......CC.......
.......1C.......
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.......C1.......
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.......1C.......
.......CC.......
.......CC.......
.......CC.......`],
)

let tentacleFrame = false

setInterval(() => {

  tentacleFrame = !tentacleFrame

  if (tentacleFrame) {

    getAll(tentacle).forEach(t => t.type = tentacle2)
    getAll(tentacleleft).forEach(t => t.type = tentacleleft2)
    getAll(tentacleup).forEach(t => t.type = tentacleup2)
    getAll(tentacledown).forEach(t => t.type = tentacledown2)

  } else {

    getAll(tentacle2).forEach(t => t.type = tentacle)
    getAll(tentacleleft2).forEach(t => t.type = tentacleleft)
    getAll(tentacleup2).forEach(t => t.type = tentacleup)
    getAll(tentacledown2).forEach(t => t.type = tentacledown)

  }

}, 400)

function drawHearts() {
  getAll(heartFull).forEach(h => h.remove())
  getAll(heartEmpty).forEach(h => h.remove())

  for (let i = 0; i < 3; i++) {
    addSprite(i, 0, i < health ? heartFull : heartEmpty)
  }
}

function raiseWater() {
  let waterTiles = getAll(water)

 
  if (waterTiles.length === 0) {
    for (let y = height() - 1; y >= 0; y--) {
      for (let x = 0; x < width(); x++) {
        const tile = getTile(x, y)
        const below = y === height() - 1 ? null : getTile(x, y + 1)

        const supported =
          y === height() - 1 ||
          below.some(t => t.type === wall)

        if (supported && !tile.some(t => t.type === wall)) {
          addSprite(x, y, water)
        }
      }

      // stop after first valid supported row
      if (getAll(water).length > 0) return
    }
    return
  }

  
  let highestY = Math.min(...waterTiles.map(w => w.y))
  let newY = highestY - 1
  if (newY < 0) return

  for (let x = 0; x < width(); x++) {
    const tile = getTile(x, newY)
    const below = getTile(x, newY + 1)

    const supported =
      below.some(t => t.type === wall) ||
      below.some(t => t.type === water)

    if (supported && !tile.some(t => t.type === wall)) {
      addSprite(x, newY, water)
    }
  }
}

function onGround() {
  const p = getFirst(player) || getFirst(phurt) || getFirst(pattack)
  if (!p) return false

  const below = getTile(p.x, p.y + 1)
  return below.some(t => t.type === wall)
}

let level = 0

const levels = [
  map`
...............
...............
...............
...............
...............
...............
..............g
p.........W..WW
WWWbbWWWbbbWWWW
WWWWWWWWWWWWWWW`,
  map`
...............
...............
...............
...............
...............
...............
...............
p...u.....W...g
WWWWUWW...WWWWW
WWWWWWWWWWWWWWW
WWWWWWWWWWWWWWW`,
  map`
...............
...............
...............
...............
...............
..............g
........WWWW..W
......W.WWWWW.W
......WWWWWWWWW
p.WW..WWWWWWWWW
WWWWWWW.....WWW`,
  map`
...............
...............
...............
...............
p..............
W..............
W..W.....WW...g
W..Wu....WWW...
WW.WU.WWWWWWW.u
WWWWUVWWWWWWWWU
WWWWWWWWWWWWWWW`,
  map`
...............
...............
...............
...............
.........v.....
.........W.....
.........W.....
....WWWWWW....g
...WW....W....W
p.WWWW...W.....
WWW..W..WW.....`,
  map`
.r.........r...
.r....v....r...
.r.........r...
gr.......WWWW..
Wr...........W.
Wr......v......
WWxl..........W
.......WW.....W
.......WWu...WW
p....WW.WU...WW
WWWWWWW.WWWWWWW`,
]

setMap(levels[level])
drawHearts()
  waterTimer = 0

setSolids([player, phurt, pattack, wall])

setPushables({
  [ player ]: []
})




onInput("a", () => {
  const p = getFirst(player) || getFirst(phurt) || getFirst(pattack)
  if (p) {
    p.x -= 1
    facing = -1
  }
})

onInput("d", () => {
  const p = getFirst(player) || getFirst(phurt) || getFirst(pattack)
  if (p) {
    p.x += 1
    facing = 1
  }
})

onInput("w", () => {
  const p = getFirst(player) || getFirst(phurt) || getFirst(pattack)
  if (!p) return

  if (!jumpPressed && onGround() && yVel === 0) {
    yVel = -3
    jumpPressed = true
  }
})


onInput("i", () => {
  const p = getFirst(player) || getFirst(phurt) || getFirst(pattack)
  if (!p) return

  p.type = pattack

  const targetX = p.x + facing
  const targetY = p.y

  if (targetX >= 0 && targetX < width()) {
    getTile(targetX, targetY).forEach(s => {
      if (
        s.type === tentacle ||
        s.type === tentacle2 ||
        s.type === tentacleleft ||
        s.type === tentacleleft2 ||
        s.type === tentacleup ||
        s.type === tentacleup2 ||
        s.type === tentacledown ||
        s.type === tentacledown2 ||
        s.type === tpart ||
        s.type === tpartup
      ) {
        s.remove()
      }
    })
  }

  setTimeout(() => {
    const pa = getFirst(pattack) || getFirst(phurt)
    if (pa) pa.type = player
  }, 200)
})

setInterval(() => {
  const p = getFirst(player) || getFirst(phurt) || getFirst(pattack)
  if (!p) return

  
  yVel += 1


  if (yVel > 0) {
    if (!onGround()) {
      p.y += 1
    } else {
      yVel = 0
      jumpPressed = false
    }
  }

  
  if (yVel < 0) {
    p.y -= 1
  }


const tile = getTile(p.x, p.y)

tile.forEach(s => {
  if (s.type === down) {

    s.remove()

    for (let i = 0; i < 4; i++) {
      const waterTiles = getAll(water)
      if (waterTiles.length === 0) break

      const highest = Math.min(...waterTiles.map(w => w.y))

      waterTiles.forEach(w => {
        if (w.y === highest) w.remove()
      })
    }
  }
})
  

if (
  damageCooldown === 0 &&
  (
    tilesWith(player, water).length > 0 ||
    tilesWith(phurt, water).length > 0 ||
    tilesWith(pattack, water).length > 0 ||

    tilesWith(player, tentacle).length > 0 ||
    tilesWith(phurt, tentacle).length > 0 ||
    tilesWith(pattack, tentacle).length > 0 ||

    tilesWith(player, tentacle2).length > 0 ||
    tilesWith(phurt, tentacle2).length > 0 ||
    tilesWith(pattack, tentacle2).length > 0 ||

    tilesWith(player, tentacleleft).length > 0 ||
    tilesWith(phurt, tentacleleft).length > 0 ||
    tilesWith(pattack, tentacleleft).length > 0 ||

    tilesWith(player, tentacleleft2).length > 0 ||
    tilesWith(phurt, tentacleleft2).length > 0 ||
    tilesWith(pattack, tentacleleft2).length > 0 ||

    tilesWith(player, tentacleup).length > 0 ||
    tilesWith(phurt, tentacleup).length > 0 ||
    tilesWith(pattack, tentacleup).length > 0 ||

    tilesWith(player, tentacleup2).length > 0 ||
    tilesWith(phurt, tentacleup2).length > 0 ||
    tilesWith(pattack, tentacleup2).length > 0 ||

    tilesWith(player, tentacledown).length > 0 ||
    tilesWith(phurt, tentacledown).length > 0 ||
    tilesWith(pattack, tentacledown).length > 0 ||

    tilesWith(player, tentacledown2).length > 0 ||
    tilesWith(phurt, tentacledown2).length > 0 ||
    tilesWith(pattack, tentacledown2).length > 0 ||

    getTile(p.x, p.y).some(s => s.type === tpart) ||
    getTile(p.x, p.y).some(s => s.type === tpartup)
  )
) {
  takeDamage()
  damageCooldown = 12
}

  if (damageCooldown > 0) {
    damageCooldown--
  }


  waterTimer++
  if (waterTimer >= waterSpeed) {
    raiseWater()
    waterTimer = 0
  }

if (
  tilesWith(player, goal).length > 0 ||
  tilesWith(phurt, goal).length > 0 ||
  tilesWith(pattack, goal).length > 0
) {
  level++

  if (level < levels.length) {
    setMap(levels[level])

    waterSpeed = waterSpeeds[level] || 10

  
    const p = getFirst(pattack) || getFirst(phurt) || getFirst(player)
    if (p) p.type = player

    drawHearts()
    waterTimer = 0
  }
}

 
  if (hurtTimer > 0) {
    hurtTimer--

    if (hurtTimer === 0) {
      const hurtPlayer = getFirst(phurt)
      if (hurtPlayer) {
        hurtPlayer.type = player
      }
    }
  }

}, 185)

function takeDamage() {
  if (health > 0) {
    health--
    drawHearts()

    const p = getFirst(player) || getFirst(pattack) || getFirst(phurt)
    if (p) {
      p.type = phurt
      hurtTimer = 5
    }
  }

  if (health === 0) {
    const p = getFirst(player) || getFirst(pattack) || getFirst(phurt)
    if (p) p.type = pdead
  }
}

