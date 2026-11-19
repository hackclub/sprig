/*
@title: Last City
@author: Snetchy09
@description: a top down view zombie survival game set in a city, explore buildings, search for supplies, and try to survive as long as possible. every district can hide something different.
@tags: ['zombie', 'survival', 'city']
@addedOn: 2026-10-08
*/

const player = "p"
const walker = "z"
const hunter = "h"
const stalker = "t"
const person = "c"
const car = "r"
const tree = "v"
const lamp = "l"
const food = "u"
const med = "m"
const battery = "e"
const hideSpot = "k"
const furniture = "q"
const door = "d"
const floor = "f"
const road = "o"
const sidewalk = "y"
const brick = "b"
const glass = "g"
const stone = "s"
const wall = "w"

setLegend(
  [player, bitmap`
................
......66........
.....6666.......
....666666......
....666666......
.....6666.......
......66........
.....6666.......
....66..66......
...66....66.....
................
................
................
................
................`],

  [walker, bitmap`
................
.....5555.......
....555555......
...55555555.....
...55....55.....
..5555555555....
..555.55.555....
...55555555.....
....555555......
.....5555.......
....55..55......
...55....55.....
................
................
................
................`],

  [hunter, bitmap`
................
.....7777.......
....777777......
...77777777.....
...77.77.77.....
..7777777777....
..777.77777.....
...77777777.....
....777777......
.....7777.......
....77..77......
...77....77.....
................
................
................
................`],

  [stalker, bitmap`
................
.....4444.......
....444444......
...44444444.....
...44444444.....
..4444..4444....
..4444444444....
...44444444.....
....444444......
.....4444.......
....44..44......
...44....44.....
................
................
................
................`],

  [person, bitmap`
................
......33........
.....3333.......
....333333......
....333333......
.....3333.......
......33........
.....3333.......
....33..33......
...33....33.....
................
................
................
................
................
................`],

  [car, bitmap`
................
................
...88888888.....
..8888888888....
..8888888888....
...88888888.....
....88..88......
....88..88......
................
................
................
................
................
................
................
................`],

  [tree, bitmap`
................
......44........
.....4444.......
....444444......
...44444444.....
...44444444.....
....444444......
.....4444.......
......44........
......11........
.....1111.......
.....1111.......
................
................
................
................`],

  [lamp, bitmap`
......88........
......88........
......88........
.....8888.......
....888888......
.....8888.......
......88........
......88........
......11........
......11........
......11........
.....1111.......
................
................
................
................`],

  [food, bitmap`
................
................
.....9999.......
....999999......
....99..99......
....999999......
.....9999.......
......99........
................
................
................
................
................
................
................
................`],

  [med, bitmap`
................
......77........
......77........
....777777......
....777777......
......77........
......77........
................
................
................
................
................
................
................
................
................`],

  [battery, bitmap`
................
.....6666.......
....666666......
....66..66......
....66..66......
....666666......
.....6666.......
......66........
................
................
................
................
................
................
................`],

  [hideSpot, bitmap`
................
..111111111111..
..112222222211..
..112222222211..
..112222222211..
..112222222211..
..112222222211..
..111111111111..
................
................
................
................
................
................
................
................`],

  [furniture, bitmap`
................
................
..888888888888..
..888888888888..
..88........88..
..88........88..
..88........88..
..888888888888..
................
................
................
................
................
................
................
................`],

  [door, bitmap`
................
................
....777777......
....777777......
....777777......
....777777......
....777777......
....777777......
....777777......
....777777......
................
................
................
................
................
................`],

  [floor, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],

  [road, bitmap`
1111111111111111
1111111111111111
1111881111111111
1111881111111111
1111881111111111
1111881111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111881111111111
1111881111111111
1111881111111111
1111111111111111
1111111111111111`],

  [sidewalk, bitmap`
8888888888888888
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8888888888888888`],

  [brick, bitmap`
1111111111111111
1222222222222221
1222222222222221
1111111111111111
1222222222222221
1222222222222221
1111111111111111
1222222222222221
1222222222222221
1111111111111111
1222222222222221
1222222222222221
1111111111111111
1222222222222221
1222222222222221
1111111111111111`],

  [glass, bitmap`
6666666666666666
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6666666666666666
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6666666666666666
6777777777777777
6777777777777776
6777777777777776
6777777777777776
6666666666666666`],

  [stone, bitmap`
8888888888888888
8111111111111118
8111111111111118
8888888888888888
8111111111111118
8111111111111118
8888888888888888
8111111111111118
8111111111111118
8888888888888888
8111111111111118
8111111111111118
8888888888888888
8111111111111118
8111111111111118
8888888888888888`],

  [wall, bitmap`
1111111111111111
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1111111111111111`]
)

setSolids([player, wall, brick, glass, stone])

let districtX = 0
let districtY = 0
let layout = []
let buildings = []
let rng = null
let playerSprite = null
let currentBuilding = null
let inBuilding = false

let time = 0
let score = 0
let hp = 3
let hunger = 0
let noise = 0

let foodCount = 2
let medCount = 0
let batteryCount = 1

let hidden = 0
let invulnerable = 0
let turn = 0

let gameOver = false
let won = false
let escapeReady = false

let visited = new Set()
let districtStates = new Map()
let buildingSearch = new Set()

let lastExit = [7, 8]
let objective = "SURVIVE 40"

function id(x, y) {
  return x + "," + y
}

function seed(x, y) {
  let n = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263)
  n ^= n >>> 13
  n = Math.imul(n, 1274126177)
  n ^= n >>> 16
  return n >>> 0 || 1
}

function random(seedValue) {
  let value = seedValue >>> 0

  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0
    return value / 4294967296
  }
}

function stateFor(x, y) {
  let key = id(x, y)
  let state = districtStates.get(key)

  if (!state) {
    state = {
      threat: 0,
      saved: 0,
      looted: {},
      memoryX: 7,
      memoryY: 8
    }

    districtStates.set(key, state)
  }

  return state
}

function buildingType(r) {
  let n = Math.floor(r() * 4)

  if (n === 0) return "APART"
  if (n === 1) return "SHOP"
  if (n === 2) return "HOSP"

  return "OFFICE"
}

function buildingWall(type) {
  if (type === "SHOP") return glass
  if (type === "HOSP") return stone
  if (type === "OFFICE") return brick

  return wall
}

function makeCity() {
  let r = random(seed(districtX, districtY))
  let grid = []
  let result = []

  for (let y = 0; y < 16; y++) {
    grid[y] = []

    for (let x = 0; x < 16; x++) {
      grid[y][x] = road
    }
  }

  const spots = [
    [1, 1, 5, 5, "bottom"],
    [10, 1, 5, 5, "bottom"],
    [1, 10, 5, 5, "top"],
    [10, 10, 5, 5, "top"]
  ]

  spots.forEach((spot, index) => {
    let x = spot[0]
    let y = spot[1]
    let w = spot[2]
    let h = spot[3]
    let side = spot[4]
    let type = buildingType(r)
    let wallType = buildingWall(type)

    for (let yy = y; yy < y + h; yy++) {
      for (let xx = x; xx < x + w; xx++) {
        let edge =
          xx === x ||
          xx === x + w - 1 ||
          yy === y ||
          yy === y + h - 1

        grid[yy][xx] = edge ? wallType : floor
      }
    }

    let doorX = x + Math.floor(w / 2)
    let doorY = side === "bottom" ? y + h - 1 : y

    grid[doorY][doorX] = door

    for (let yy = Math.max(0, y - 1); yy <= Math.min(15, y + h); yy++) {
      for (let xx = Math.max(0, x - 1); xx <= Math.min(15, x + w); xx++) {
        if (grid[yy][xx] === road) {
          grid[yy][xx] = sidewalk
        }
      }
    }

    result.push({
      index,
      x,
      y,
      w,
      h,
      side,
      type,
      doorX,
      doorY
    })
  })

  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      if (
        grid[y][x] === sidewalk &&
        (x === 6 || x === 9 || y === 6 || y === 9)
      ) {
        grid[y][x] = road
      }
    }
  }

  return {
    grid,
    buildings: result
  }
}

function makeInterior(type, side) {
  let grid = []

  for (let y = 0; y < 16; y++) {
    grid[y] = []

    for (let x = 0; x < 16; x++) {
      grid[y][x] = floor
    }
  }

  for (let i = 0; i < 16; i++) {
    grid[0][i] = wall
    grid[15][i] = wall
    grid[i][0] = wall
    grid[i][15] = wall
  }

  if (side === "bottom") {
    grid[15][7] = door
    grid[15][8] = door
    grid[14][7] = floor
    grid[14][8] = floor
  } else {
    grid[0][7] = door
    grid[0][8] = door
    grid[1][7] = floor
    grid[1][8] = floor
  }

  if (type === "APART") {
    for (let y = 4; y < 12; y++) {
      grid[y][7] = wall
    }

    grid[7][7] = floor
  }

  if (type === "SHOP") {
    for (let x = 4; x <= 12; x += 4) {
      for (let y = 3; y < 12; y++) {
        grid[y][x] = furniture
      }
    }
  }

  if (type === "HOSP") {
    for (let x = 4; x <= 12; x += 4) {
      for (let y = 3; y < 13; y++) {
        grid[y][x] = wall
      }
    }

    grid[7][4] = floor
    grid[7][8] = floor
    grid[7][12] = floor
  }

  if (type === "OFFICE") {
    for (let y = 4; y < 12; y++) {
      grid[y][8] = wall
    }

    grid[6][8] = floor
    grid[9][8] = floor
  }

  return grid
}

function loadGrid(grid) {
  setMap(map`${grid.map(row => row.join("")).join("\n")}`)
}

function blockedByType(type) {
  return [
    wall,
    brick,
    glass,
    stone,
    car,
    tree,
    lamp,
    furniture
  ].includes(type)
}

function walkable(x, y) {
  if (x < 0 || x >= 16 || y < 0 || y >= 16) {
    return false
  }

  let tile = getTile(x, y)

  return !tile.some(s => blockedByType(s.type))
}

function occupied(x, y) {
  return getTile(x, y).some(s =>
    [
      car,
      tree,
      lamp,
      furniture
    ].includes(s.type)
  )
}

function openCell(r, used, awayX, awayY) {
  for (let i = 0; i < 200; i++) {
    let x = 1 + Math.floor(r() * 14)
    let y = 1 + Math.floor(r() * 14)
    let key = id(x, y)

    if (used.has(key)) continue
    if (!walkable(x, y)) continue

    if (
      awayX !== undefined &&
      Math.abs(x - awayX) +
      Math.abs(y - awayY) < 4
    ) {
      continue
    }

    used.add(key)

    return [x, y]
  }

  return null
}

function roadCell(r, used) {
  for (let i = 0; i < 200; i++) {
    let x = 1 + Math.floor(r() * 14)
    let y = 1 + Math.floor(r() * 14)
    let key = id(x, y)

    if (used.has(key)) continue
    if (layout[y][x] !== road) continue
    if (!walkable(x, y)) continue

    used.add(key)

    return [x, y]
  }

  return null
}

function addStaticCityStuff() {
  let r = rng
  let used = new Set()

  for (let i = 0; i < 5; i++) {
    let p = roadCell(r, used)

    if (p) {
      addSprite(p[0], p[1], tree)
    }
  }

  for (let i = 0; i < 4; i++) {
    let p = roadCell(r, used)

    if (p) {
      addSprite(p[0], p[1], lamp)
    }
  }

  for (let i = 0; i < 3; i++) {
    let p = roadCell(r, used)

    if (p) {
      addSprite(p[0], p[1], car)
    }
  }
}

function spawnCityActors() {
  let r = rng
  let used = new Set([
    id(playerSprite.x, playerSprite.y)
  ])

  let state = stateFor(
    districtX,
    districtY
  )

  let people = Math.max(
    2,
    5 - state.saved
  )

  let zombies = Math.min(
    7,
    3 + state.threat
  )

  for (let i = 0; i < people; i++) {
    let p = openCell(
      r,
      used,
      playerSprite.x,
      playerSprite.y
    )

    if (p) {
      addSprite(
        p[0],
        p[1],
        person
      )
    }
  }

  for (let i = 0; i < zombies; i++) {
    let p = openCell(
      r,
      used,
      playerSprite.x,
      playerSprite.y
    )

    if (!p) continue

    let n = r()

    let type =
      n < 0.62
        ? walker
        : n < 0.87
          ? hunter
          : stalker

    addSprite(
      p[0],
      p[1],
      type
    )
  }
}

function spawnInteriorActors() {
  let r = rng
  let used = new Set([
    id(
      playerSprite.x,
      playerSprite.y
    )
  ])

  let state =
    stateFor(
      districtX,
      districtY
    )

  let buildingId =
    districtX +
    ":" +
    districtY +
    ":" +
    currentBuilding.index

  let hide = openCell(r, used)

  if (hide) {
    addSprite(
      hide[0],
      hide[1],
      hideSpot
    )
  }

  let furnitureCount =
    currentBuilding.type === "SHOP"
      ? 4
      : 2

  for (
    let i = 0;
    i < furnitureCount;
    i++
  ) {
    let p = openCell(r, used)

    if (p) {
      addSprite(
        p[0],
        p[1],
        furniture
      )
    }
  }

  if (!state.looted[buildingId]) {
    let loot =
      currentBuilding.type === "HOSP"
        ? 4
        : currentBuilding.type === "SHOP"
          ? 3
          : 2

    for (let i = 0; i < loot; i++) {
      let p = openCell(r, used)

      if (!p) continue

      let n = r()

      if (
        currentBuilding.type === "HOSP" &&
        n < 0.7
      ) {
        addSprite(
          p[0],
          p[1],
          med
        )
      } else if (n < 0.45) {
        addSprite(
          p[0],
          p[1],
          food
        )
      } else if (n < 0.72) {
        addSprite(
          p[0],
          p[1],
          battery
        )
      } else {
        addSprite(
          p[0],
          p[1],
          med
        )
      }
    }
  }

  let threat =
    state.threat

  let zombies = Math.min(
    4,
    1 + Math.floor(threat / 2)
  )

  if (
    currentBuilding.type === "HOSP"
  ) {
    zombies++
  }

  for (
    let i = 0;
    i < zombies;
    i++
  ) {
    let p = openCell(
      r,
      used,
      playerSprite.x,
      playerSprite.y
    )

    if (!p) continue

    let n = r()

    let type =
      n < 0.6
        ? walker
        : n < 0.85
          ? hunter
          : stalker

    addSprite(
      p[0],
      p[1],
      type
    )
  }
}

function loadCity(
  x,
  y,
  spawnX,
  spawnY
) {
  districtX = x
  districtY = y

  inBuilding = false
  currentBuilding = null

  let generated =
    makeCity()

  layout =
    generated.grid

  buildings =
    generated.buildings

  rng = random(
    seed(x, y) +
    stateFor(x, y).threat * 991
  )

  loadGrid(layout)

  addSprite(
    spawnX,
    spawnY,
    player
  )

  playerSprite =
    getFirst(player)

  addStaticCityStuff()
  spawnCityActors()

  let state =
    stateFor(x, y)

  visited.add(
    id(x, y)
  )

  updateObjective()
  hud()
}

function loadInterior(building) {
  inBuilding = true
  currentBuilding = building

  layout = makeInterior(
    building.type,
    building.side
  )

  rng = random(
    seed(
      districtX + building.index * 13,
      districtY + building.index * 31
    )
  )

  loadGrid(layout)

  let startY =
    building.side === "bottom"
      ? 14
      : 1

  addSprite(
    7,
    startY,
    player
  )

  playerSprite = getFirst(player)

  spawnInteriorActors()

  updateObjective()
  hud()
}

function leaveInterior() {
  let building =
    currentBuilding

  let x =
    building.doorX

  let y =
    building.doorY

  loadCity(
    districtX,
    districtY,
    x,
    y
  )
}

function updateObjective() {
  if (escapeReady) {
    objective = "ESCAPE"
  } else {
    objective =
      "SURVIVE " +
      Math.max(
        0,
        40 - time
      )
  }
}

function hud() {
  clearText()

  if (gameOver || won) {
    return
  }

  addText(
    "HP" +
      hp +
      " F" +
      foodCount +
      " M" +
      medCount,
    {
      x: 0,
      y: 0
    }
  )

  addText(
    "T" +
      time +
      " B" +
      batteryCount,
    {
      x: 10,
      y: 0
    }
  )

  addText(
    inBuilding
      ? currentBuilding.type
      : "CITY",
    {
      x: 0,
      y: 15
    }
  )

  addText(
    objective,
    {
      x: 7,
      y: 15
    }
  )

  addText(
    hidden > 0
      ? "HID"
      : "N" + noise,
    {
      x: 13,
      y: 14
    }
  )
}

function collectAtPlayer() {
  let tile =
    getTile(
      playerSprite.x,
      playerSprite.y
    )

  let changed = false

  tile.slice().forEach(
    s => {
      if (s.type === food) {
        foodCount++
        score += 30
        s.remove()
        changed = true
      }

      if (s.type === med) {
        medCount++
        score += 40
        s.remove()
        changed = true
      }

      if (s.type === battery) {
        batteryCount++
        score += 35
        s.remove()
        changed = true
      }
    }
  )

  return changed
}

function rescueAtPlayer() {
  let rescued = false

  getAll(person)
    .slice()
    .forEach(c => {
      if (
        c.x === playerSprite.x &&
        c.y === playerSprite.y
      ) {
        c.remove()
        rescued = true
      }
    })

  if (rescued) {
    let state =
      stateFor(
        districtX,
        districtY
      )

    state.saved++

    score += 100
    noise =
      Math.min(
        9,
        noise + 1
      )
  }

  return rescued
}

function hideAtPlayer() {
  if (
    batteryCount <= 0 ||
    hidden > 0
  ) {
    return false
  }

  let hasSpot =
    getTile(
      playerSprite.x,
      playerSprite.y
    ).some(
      s =>
        s.type === hideSpot
    )

  if (!hasSpot) {
    return false
  }

  batteryCount--
  hidden = 4
  noise = 0

  return true
}

function enterOrExit() {
  if (inBuilding) {
    let atExit =
      currentBuilding.side === "bottom"
        ? playerSprite.y >= 15
        : playerSprite.y <= 0

    if (
      atExit &&
      (
        playerSprite.x === 7 ||
        playerSprite.x === 8
      )
    ) {
      let building = currentBuilding

      leaveInterior()

      playerSprite.x = building.doorX
      playerSprite.y = building.doorY

      return true
    }

    return false
  }

  let building = buildings.find(
    b =>
      b.doorX === playerSprite.x &&
      b.doorY === playerSprite.y
  )

  if (!building) {
    return false
  }

  lastExit = [
    building.doorX,
    building.doorY
  ]

  buildingSearch = new Set()

  loadInterior(building)

  noise = 0

  return true
}

function useMedicine() {
  if (
    medCount <= 0 ||
    hp >= 3
  ) {
    return false
  }

  medCount--
  hp++
  score += 40

  return true
}

function eatFood() {
  if (
    foodCount <= 0 ||
    hunger < 5
  ) {
    return false
  }

  foodCount--
  hunger =
    Math.max(
      0,
      hunger - 6
    )

  score += 20

  return true
}

function rememberPlayer() {
  let state =
    stateFor(
      districtX,
      districtY
    )

  state.memoryX =
    playerSprite.x

  state.memoryY =
    playerSprite.y

  if (noise >= 6) {
    state.threat =
      Math.min(
        4,
        state.threat + 1
      )
  }

  if (hidden > 0) {
    state.threat =
      Math.min(
        4,
        state.threat + 1
      )
  }
}

function moveSprite(
  sprite,
  dx,
  dy
) {
  let nx =
    sprite.x + dx

  let ny =
    sprite.y + dy

  if (!walkable(nx, ny)) {
    return false
  }

  if (occupied(nx, ny)) {
    return false
  }

  sprite.x = nx
  sprite.y = ny

  return true
}

function randomMove(sprite) {
  let dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ]

  let start =
    Math.floor(
      rng() * dirs.length
    )

  for (
    let i = 0;
    i < dirs.length;
    i++
  ) {
    let d =
      dirs[
        (start + i) %
        dirs.length
      ]

    if (
      moveSprite(
        sprite,
        d[0],
        d[1]
      )
    ) {
      return
    }
  }
}

function chase(
  sprite,
  range
) {
  let dx =
    playerSprite.x -
    sprite.x

  let dy =
    playerSprite.y -
    sprite.y

  let distance =
    Math.abs(dx) +
    Math.abs(dy)

  if (
    distance > range &&
    noise < 4
  ) {
    randomMove(sprite)
    return
  }

  if (
    Math.abs(dx) >=
    Math.abs(dy)
  ) {
    if (
      dx !== 0 &&
      moveSprite(
        sprite,
        Math.sign(dx),
        0
      )
    ) {
      return
    }

    if (dy !== 0) {
      moveSprite(
        sprite,
        0,
        Math.sign(dy)
      )
    }
  } else {
    if (
      dy !== 0 &&
      moveSprite(
        sprite,
        0,
        Math.sign(dy)
      )
    ) {
      return
    }

    if (dx !== 0) {
      moveSprite(
        sprite,
        Math.sign(dx),
        0
      )
    }
  }
}

function flee(
  sprite,
  threat
) {
  let dx =
    sprite.x -
    threat.x

  let dy =
    sprite.y -
    threat.y

  if (
    Math.abs(dx) >=
    Math.abs(dy)
  ) {
    if (
      dx !== 0 &&
      moveSprite(
        sprite,
        Math.sign(dx),
        0
      )
    ) {
      return
    }

    if (dy !== 0) {
      moveSprite(
        sprite,
        0,
        Math.sign(dy)
      )
    }
  } else {
    if (
      dy !== 0 &&
      moveSprite(
        sprite,
        0,
        Math.sign(dy)
      )
    ) {
      return
    }

    if (dx !== 0) {
      moveSprite(
        sprite,
        Math.sign(dx),
        0
      )
    }
  }
}

function nearestZombie(
  x,
  y,
  range
) {
  let result = null
  let best = 999

  let enemies =
    getAll(walker)
      .concat(getAll(hunter))
      .concat(getAll(stalker))

  enemies.forEach(
    z => {
      let d =
        Math.abs(z.x - x) +
        Math.abs(z.y - y)

      if (
        d <= range &&
        d < best
      ) {
        best = d
        result = z
      }
    }
  )

  return result
}

function movePeople() {
  getAll(person).forEach(
    c => {
      let danger =
        nearestZombie(
          c.x,
          c.y,
          4
        )

      if (danger) {
        flee(
          c,
          danger
        )

        noise =
          Math.min(
            9,
            noise + 1
          )
      } else if (
        turn % 2 === 0
      ) {
        randomMove(c)
      }
    }
  )
}

function moveZombies() {
  if (hidden > 0) {
    return
  }

  getAll(walker).forEach(
    z => {
      chase(z, 6)
    }
  )

  getAll(hunter).forEach(
    z => {
      chase(z, 9)
    }
  )

  let state =
    stateFor(
      districtX,
      districtY
    )

  getAll(stalker).forEach(
    z => {
      let dx =
        state.memoryX -
        z.x

      let dy =
        state.memoryY -
        z.y

      if (
        Math.abs(dx) >=
        Math.abs(dy)
      ) {
        if (
          dx !== 0 &&
          moveSprite(
            z,
            Math.sign(dx),
            0
          )
        ) {
          return
        }

        if (dy !== 0) {
          moveSprite(
            z,
            0,
            Math.sign(dy)
          )
        }
      } else {
        if (
          dy !== 0 &&
          moveSprite(
            z,
            0,
            Math.sign(dy)
          )
        ) {
          return
        }

        if (dx !== 0) {
          moveSprite(
            z,
            Math.sign(dx),
            0
          )
        }
      }
    }
  )
}

function infectPeople() {
  let zombies =
    getAll(walker)
      .concat(getAll(hunter))
      .concat(getAll(stalker))

  getAll(person)
    .slice()
    .forEach(
      c => {
        let hit =
          zombies.some(
            z =>
              z.x === c.x &&
              z.y === c.y
          )

        if (hit) {
          c.type = walker

          noise =
            Math.min(
              9,
              noise + 2
            )
        }
      }
    )
}

function touchingZombie() {
  let zombies =
    getAll(walker)
      .concat(getAll(hunter))
      .concat(getAll(stalker))

  return zombies.some(
    z =>
      z.x ===
        playerSprite.x &&
      z.y ===
        playerSprite.y
  )
}

function damage() {
  if (
    invulnerable > 0 ||
    hidden > 0
  ) {
    return
  }

  hp--
  invulnerable = 2
  noise = 9

  if (hp <= 0) {
    die()
  }
}

function hungerTick() {
  hunger++

  if (hunger >= 9) {
    hunger = 0

    if (foodCount > 0) {
      foodCount--
    } else {
      hp--
    }
  }

  if (hp <= 0) {
    die()
  }
}

function updateMemoryAndThreat() {
  let state =
    stateFor(
      districtX,
      districtY
    )

  if (noise >= 7) {
    state.threat =
      Math.min(
        4,
        state.threat + 1
      )
  }

  state.memoryX =
    playerSprite.x

  state.memoryY =
    playerSprite.y
}

function checkEscape() {
  if (
    !escapeReady ||
    inBuilding
  ) {
    return false
  }

  let edge =
    playerSprite.x === 0 ||
    playerSprite.x === 15 ||
    playerSprite.y === 0 ||
    playerSprite.y === 15

  if (!edge) {
    return false
  }

  win()
  return true
}

function nextTurn() {
  if (gameOver || won) {
    return
  }

  turn++
  time++

  collectAtPlayer()
  rescueAtPlayer()

  if (inBuilding) {
    let state =
      stateFor(
        districtX,
        districtY
      )

    let buildingId =
      districtX +
      ":" +
      districtY +
      ":" +
      currentBuilding.index

    let lootStillThere =
      getAll(food).length +
      getAll(med).length +
      getAll(battery).length

    if (
      lootStillThere === 0
    ) {
      state.looted[buildingId] =
        true
    }
  }

  if (hidden <= 0) {
    movePeople()
    moveZombies()
  } else {
    hidden--
  }

  infectPeople()

  if (touchingZombie()) {
    damage()
  }

  hungerTick()

  if (invulnerable > 0) {
    invulnerable--
  }

  if (noise > 0) {
    noise--
  }

  if (
    !inBuilding &&
    time % 8 === 0
  ) {
    updateMemoryAndThreat()
  }

  if (time >= 40) {
    escapeReady = true
  }

  updateObjective()

  score =
    time * 10 +
    visited.size * 150 +
    stateFor(
      districtX,
      districtY
    ).saved * 100

  hud()
}

function walkPlayer(dx, dy) {
  if (gameOver || won) {
    return
  }

  if (hidden > 0) {
    hidden = 0
  }

  let nx = playerSprite.x + dx
  let ny = playerSprite.y + dy

  if (!inBuilding) {
    if (nx < 0) {
      rememberPlayer()

      districtX--

      loadCity(
        districtX,
        districtY,
        15,
        playerSprite.y
      )

      nextTurn()
      return
    }

    if (nx >= 16) {
      rememberPlayer()

      districtX++

      loadCity(
        districtX,
        districtY,
        0,
        playerSprite.y
      )

      nextTurn()
      return
    }

    if (ny < 0) {
      rememberPlayer()

      districtY--

      loadCity(
        districtX,
        districtY,
        playerSprite.x,
        15
      )

      nextTurn()
      return
    }

    if (ny >= 16) {
      rememberPlayer()

      districtY++

      loadCity(
        districtX,
        districtY,
        playerSprite.x,
        0
      )

      nextTurn()
      return
    }
  }

  if (!walkable(nx, ny)) {
    return
  }

  if (occupied(nx, ny)) {
    return
  }

  playerSprite.x = nx
  playerSprite.y = ny

  noise = Math.min(
    9,
    noise + (inBuilding ? 2 : 1)
  )

  if (!inBuilding) {
    let building = buildings.find(
      b =>
        b.doorX === playerSprite.x &&
        b.doorY === playerSprite.y
    )

    if (building) {
      lastExit = [
        building.doorX,
        building.doorY
      ]

      buildingSearch = new Set()

      loadInterior(building)

      nextTurn()
      return
    }
  } else {
    let atExit =
      currentBuilding.side === "bottom"
        ? playerSprite.y === 15
        : playerSprite.y === 0

    if (
      atExit &&
      (
        playerSprite.x === 7 ||
        playerSprite.x === 8
      )
    ) {
      leaveInterior()
      nextTurn()
      return
    }
  }

  nextTurn()
  checkEscape()
}

function interact() {
  if (gameOver || won) {
    return
  }

  if (collectAtPlayer()) {
    nextTurn()
    return
  }

  if (rescueAtPlayer()) {
    nextTurn()
    return
  }

  if (enterOrExit()) {
    noise = 0
    nextTurn()
    return
  }

  if (hideAtPlayer()) {
    nextTurn()
    return
  }

  if (inBuilding) {
    let key =
      districtX +
      ":" +
      districtY +
      ":" +
      currentBuilding.index +
      ":" +
      playerSprite.x +
      ":" +
      playerSprite.y

    if (!buildingSearch.has(key)) {
      buildingSearch.add(key)

      let r =
        random(
          seed(
            time +
            playerSprite.x * 19,
            playerSprite.y * 23 +
            districtX
          )
        )

      if (r() < 0.16) {
        let n = r()

        if (n < 0.45) {
          addSprite(
            playerSprite.x,
            playerSprite.y,
            food
          )
        } else if (n < 0.72) {
          addSprite(
            playerSprite.x,
            playerSprite.y,
            battery
          )
        } else {
          addSprite(
            playerSprite.x,
            playerSprite.y,
            med
          )
        }
      }
    }
  }

  nextTurn()
}

function eat() {
  if (gameOver || won) {
    return
  }

  if (!eatFood()) {
    return
  }

  nextTurn()
}

function heal() {
  if (gameOver || won) {
    return
  }

  if (!useMedicine()) {
    return
  }

  nextTurn()
}

function die() {
  if (gameOver) {
    return
  }

  gameOver = true

  clearText()

  addText(
    "YOU DIED",
    {
      x: 4,
      y: 6
    }
  )

  addText(
    "TIME " + time,
    {
      x: 4,
      y: 8
    }
  )

  addText(
    "SCORE " + score,
    {
      x: 4,
      y: 10
    }
  )

  addText(
    "PRESS L",
    {
      x: 4,
      y: 12
    }
  )
}

function win() {
  if (won) {
    return
  }

  won = true

  clearText()

  addText(
    "YOU ESCAPED",
    {
      x: 3,
      y: 6
    }
  )

  addText(
    "TIME " + time,
    {
      x: 4,
      y: 8
    }
  )

  addText(
    "SCORE " + score,
    {
      x: 4,
      y: 10
    }
  )

  addText(
    "PRESS L",
    {
      x: 4,
      y: 12
    }
  )
}

function restart() {
  districtX = 0
  districtY = 0
  time = 0
  score = 0

  hp = 3
  hunger = 0
  noise = 0

  foodCount = 2
  medCount = 0
  batteryCount = 1

  hidden = 0
  invulnerable = 0
  turn = 0

  gameOver = false
  won = false
  escapeReady = false

  visited.clear()
  districtStates.clear()
  buildingSearch.clear()

  lastExit = [7, 8]

  currentBuilding = null
  inBuilding = false

  loadCity(
    0,
    0,
    7,
    8
  )
}

onInput(
  "w",
  () => walkPlayer(0, -1)
)

onInput(
  "s",
  () => walkPlayer(0, 1)
)

onInput(
  "a",
  () => walkPlayer(-1, 0)
)

onInput(
  "d",
  () => walkPlayer(1, 0)
)

onInput(
  "i",
  interact
)

onInput(
  "j",
  eat
)

onInput(
  "k",
  heal
)

onInput(
  "l",
  () => {
    if (gameOver || won) {
      restart()
    }
  }
)

afterInput(() => {
  if (!gameOver && !won) {
    hud()
  }
})

restart()