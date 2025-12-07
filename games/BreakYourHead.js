/*
@title: Dungeon Escape: Fixed
@author: You
@tags: []
@addedOn: 2025-00-00
*/

const tuneMusic = tune`
120,
0: C3~400,
500: G3~400,
1000: Eb3~400,
1500: G3~400,
2000`

const tuneKey = tune`
120,
0: B4~100,
150: E5~250,
400`

const tuneDoor = tune`
120,
0: G4~100,
100: C5~300,
400`

const tuneLocked = tune`
120,
0: C3~100,
100`

const tuneSpike = tune`
120,
0: F#3~100,
100: C2~300,
400`

const tuneGhost = tune`
180,
0: C#4~50,
50: C4~50,
100: B3~200`

const tuneWin = tune`
120,
0: C4~100,
100: E4~100,
200: G4~100,
300: C5~400,
700`

playTune(tuneMusic, Infinity)

const player = "p"
const wall = "w"
const floor = "f"
const ice = "i"
const key = "k"
const door = "d"
const box = "b"
const plate = "_"
const spike = "s"
const ghost = "g"
const portal = "@"

setLegend(
  [player, bitmap`
................
................
......222.......
......202.......
...222222222....
...2.20002.2....
.....22222......
.....2.2.2......
.....2.2.2......
................
................
................
................
................
................
................`],
  [wall, bitmap`
CCC0CCC0CCC0CCC0
0000000000000000
C0CCC0CCC0CCC0CC
0000000000000000
CCC0CCC0CCC0CCC0
0000000000000000
C0CCC0CCC0CCC0CC
0000000000000000
CCC0CCC0CCC0CCC0
0000000000000000
C0CCC0CCC0CCC0CC
0000000000000000
CCC0CCC0CCC0CCC0
0000000000000000
C0CCC0CCC0CCC0CC
0000000000000000`],
  [floor, bitmap`
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
   [ice, bitmap`
................
.777............
.777............
.777.......777..
....7777...777..
....7777...777..
....7777........
................
................
777.............
777.............
777....777......
.......777......
............777.
............777.
............777.`],
  [box, bitmap`
................
................
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CC88888888CC..
..CC88888888CC..
..CC88888888CC..
..CC88888888CC..
..CC88888888CC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
................
................
................
................
................`],
  [plate, bitmap`
................
................
................
................
................
................
................
................
................
......6666......
.....000000.....
....66666666....
................
................
................
................`],
  [door, bitmap`
0000000000000000
0000066666000000
0000060006000000
0000060006000000
0000666666600000
0000660006600000
0000666066600000
0000666066600000
0000666666600000
0000000000000000
0000000000000000
................
................
................
................
................`],
  [key, bitmap`
................
................
......333.......
.....3...3......
......333.......
.......3........
.......3........
.......33.......
.......33.......
................
................
................
................
................
................
................`],
  [spike, bitmap`
................
................
................
................
................
...L...L...L....
..L3L.L3L.L3L...
.L3L3L3L3L3L3L..
................
................
................
................
................
................
................
................`],
  [ghost, bitmap`
................
................
......22222.....
.....2222222....
....222222222...
....222020222...
....222222222...
....222222222...
....222222222...
....222222222...
....222222222...
....222222222...
....222222222...
....2.2.2.2.2...
................
................`],
  [portal, bitmap`
................
....HHHHHHHH....
...HHHHHHHHHH...
..HHH......HHH..
.HHH........HHH.
.HH...4444...HH.
.HH..444444..HH.
.HH..445544..HH.
.HH..445544..HH.
.HH..444444..HH.
.HH...4444...HH.
.HHH........HHH.
..HHH......HHH..
...HHHHHHHHHH...
....HHHHHHHH....
................`]
)

setBackground(floor, ice)

let currentLevel = 0
let hasKey = false

const levels = [
  map`
wwwwwwww
w@d...fw
wwwwwiiw
w......w
w.k..p.w
wwwwwwww`,
  map`
wwwwwwww
w@.....w
w.wwwwww
w.w..g.w
w...p..w
wwwwwwww`,
  map`
wwwwwwwww
w@.w..._w
w..wfw.bw
ws..dw.fw
wfswiwiiw
wiwwswwdw
wf......w
wp.wk...w
wwwwwwwww`,
  map`
wwwwwwwww
w@.s.f..w
wdww..www
w....b..w
wwws.swdw
w.iiii..w
wgp._k..w
wwwwwwwww`
]

function loadLevel(index) {
  if (index >= levels.length) {
    addText("YOU WIN!", { x: 3, y: 4, color: color`3` })
    playTune(tuneWin)
    return
  }
  
  clearText()
  hasKey = false
  setMap(levels[index])
}

loadLevel(currentLevel)

setSolids([player, wall, door, box, ghost])
setPushables({
  [player]: [box]
})

function move(dx, dy) {
  const p = getFirst(player)
  if (!p) return

  const nextX = p.x + dx
  const nextY = p.y + dy
  
  if (nextX < 0 || nextX >= width() || nextY < 0 || nextY >= height()) return

  const targetTile = getTile(nextX, nextY) || []

  const isSolid = targetTile.some(s => [wall, ghost].includes(s.type))
  if (isSolid) {
    return 
  }

  const doorSprite = targetTile.find(s => s.type === door)
  if (doorSprite) {
    if (hasKey) {
      doorSprite.remove()
      hasKey = false 
      playTune(tuneDoor)
      addText("Open!", {x: p.x, y: p.y - 1, color: color`3`})
      setTimeout(clearText, 500)
    } else {
      playTune(tuneLocked)
      addText("Locked", {x: p.x, y: p.y - 1, color: color`5`})
      setTimeout(clearText, 500)
      return 
    }
  }

  p.x += dx
  p.y += dy

  const currentTile = getTile(p.x, p.y) || []
  const onIce = currentTile.some(s => s.type === ice)
  if (onIce) {
     setTimeout(() => move(dx, dy), 50)
  }
}

onInput("w", () => move(0, -1))
onInput("s", () => move(0, 1))
onInput("a", () => move(-1, 0))
onInput("d", () => move(1, 0))

afterInput(() => {
  const p = getFirst(player)
  if (!p) return 

  const myTile = getTile(p.x, p.y) || []

  const portalSprite = myTile.find(s => s.type === portal)
  if (portalSprite) {
    playTune(tuneWin)
    currentLevel += 1
    loadLevel(currentLevel)
    return
  }

  const keySprite = myTile.find(s => s.type === key)
  if (keySprite) {
    keySprite.remove()
    hasKey = true
    playTune(tuneKey)
    addText("Got Key", {x: p.x, y: p.y - 1, color: color`3`})
    setTimeout(clearText, 500)
  }

  const spikeSprite = myTile.find(s => s.type === spike)
  if (spikeSprite) {
    playTune(tuneSpike)
    addText("OUCH!", {x: p.x, y: p.y - 1, color: color`3`})
    setTimeout(() => loadLevel(currentLevel), 500)
    return 
  }

  const plates = getAll(plate)
  let platePressed = false
  plates.forEach(pl => {
    const itemsOnPlate = getTile(pl.x, pl.y) || []
    if (itemsOnPlate.some(s => s.type === box)) {
      platePressed = true
    }
  })
  if (platePressed) {
    const doors = getAll(door)
    if (doors.length > 0) {
      playTune(tuneDoor)
      doors.forEach(d => d.remove())
    }
  }

  const ghosts = getAll(ghost)
  ghosts.forEach(g => {
    const dx = p.x - g.x
    const dy = p.y - g.y
    
    let moveX = 0
    let moveY = 0
    if (Math.abs(dx) > Math.abs(dy)) {
      moveX = Math.sign(dx)
    } else {
      moveY = Math.sign(dy)
    }

    const targetX = g.x + moveX
    const targetY = g.y + moveY
    const targetTile = getTile(targetX, targetY) || []
    
    const isBlocked = targetTile.some(s => [wall, box, door, ghost].includes(s.type))
    
    if (!isBlocked) {
      g.x += moveX
      g.y += moveY
    }
    
    if (g.x === p.x && g.y === p.y) {
      playTune(tuneGhost)
      addText("CAUGHT!", {x: p.x, y: p.y - 1, color: color`0`})
      setTimeout(() => loadLevel(currentLevel), 500)
    }
  })
})