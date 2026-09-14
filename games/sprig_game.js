/*
@title: BLOBBY
@description: Eat everything. Grow huge. The chef is coming. Eat him too.
@author: Gurmehar
@tags: ['arcade', 'puzzle']
@addedOn: 2026-09-014
*/

const player = "p"   // small (0-1 snacks)
const chubby = "q"   // medium (2-3 snacks)
const chonk  = "e"   // MAXIMUM (4+). smashes crates, cookies, AND chefs
const wall = "w"
const cookie = "x"
const apple = "a"
const burger = "b"
const donut = "d"
const iceCream = "i"
const crate = "B"
const chefType = "c"
const crumb = "n"
const sparkle = "f"

const foods = [apple, burger, donut, iceCream]
const playerTypes = [player, chubby, chonk]
const solidTypes = [player, chubby, chonk, wall, cookie, crate]

const levelNames = ["the pantry", "sealed lunchbox", "the cookie vault", "the kitchen"]
const levelFlavor = ["eat everything", "locked-up snacks", "the chef is near", "eat or be eaten"]

const deathLines = [
  "you got chopped!",
  "soup's on...",
  "brr! so cold!",
  "salted. rude.",
]

const sfxMunch  = [[420, 40, 640, 60]]
const sfxCombo1 = [[523, 40, 784, 60]]
const sfxCombo2 = [[659, 40, 988, 70]]
const sfxCombo3 = [[784, 40, 1175, 90]]
const sfxCrunch = [[160, 70, 110, 110]]
const sfxGrow   = [[392, 70, 330, 70, 262, 110]]
const sfxChonk  = [[262, 80, 330, 80, 392, 80, 523, 220]]
const sfxChomp  = [[220, 60, 165, 60, 110, 200]]
const sfxCaught = [[330, 130, 262, 130, 208, 260]]
const sfxLevel  = [[523, 90, 659, 90, 784, 200]]
const sfxBack   = [[220, 70, 220, 70, 175, 150]]
const sfxWin    = [
  [523, 120, 659, 120, 784, 120, 1047, 320],
  [262, 120, 330, 120, 392, 120, 523, 320],
]

const MAP_W = 12
const MAP_H = 12
const TEXT_W = 16

let level = 0
let gameState = "playing"   // "playing" | "dead" | "won"
let moveCount = 0
let eaten = 0
let totalEaten = 0
let smashed = false
let smashedAt = [0, 0]
let justAteChef = false
let combo = 0
let lastEatMove = -99
let bestCombo = 0
let score = 0
let chefsEaten = 0
let deathCount = 0
let chefRespawn = 0
let chefSpawn = null
const pendingTimers = []

// plays whether the engine's tune() returns a player function
// or starts playing on creation
function play(melody) {
  const t = tune(melody)
  if (typeof t === "function") t()
}

function isChonk() {
  return eaten >= 4
}

function playerType() {
  return playerTypes[Math.min(2, Math.floor(eaten / 2))]
}

function snacksLeft() {
  return foods.reduce((total, food) => total + getAll(food).length, 0)
}

function centerText(str, y, col) {
  const x = Math.max(0, Math.floor((TEXT_W - str.length) / 2))
  addText(str, { x, y, color: col })
}

function drawHUD() {
  clearText()
  addText(`${snacksLeft()} left`, { x: 0, y: 0, color: color`3` })
  const s = String(score)
  addText(s, { x: TEXT_W - s.length, y: 0, color: color`4` })
  if (isChonk()) addText("CHONK!", { x: 5, y: 1, color: color`4` })
}

function clearTimers() {
  pendingTimers.forEach(id => clearTimeout(id))
  pendingTimers.length = 0
}

// remove a sprite after ms
function fade(sprite, ms) {
  pendingTimers.push(setTimeout(() => {
    try { sprite.remove() } catch (e) {}
  }, ms))
}

function flash() {
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      if ((x + y) % 2 === 0) fade(addSprite(x, y, sparkle), 150)
    }
  }
}

function burst(x, y, count) {
  const spots = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]]
  for (let i = 0; i < count; i++) {
    const s = spots[Math.floor(Math.random() * spots.length)]
    const bx = x + s[0], by = y + s[1]
    if (bx < 0 || by < 0 || bx >= MAP_W || by >= MAP_H) continue
    if (!isPassable(bx, by)) continue
    fade(addSprite(bx, by, crumb), 250 + Math.random() * 250)
  }
}

function isPassable(x, y) {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return false
  return !getTile(x, y).some(s => solidTypes.includes(s.type))
}

function bfsFirstStep(sx, sy, tx, ty) {
  if (sx === tx && sy === ty) return null
  
  const key = (x, y) => y * MAP_W + x
  const prev = new Map()
  
  prev.set(key(sx, sy), -1)
  
  const queue = [[sx, sy]]
  
  while (queue.length > 0) {
    const cur = queue.shift()
    const cx = cur[0], cy = cur[1]
    
    if (cx === tx && cy === ty) {
      let k = key(cx, cy)
      let first = k
      
      while (prev.get(k) !== -1) {
        first = k
        k = prev.get(k)
      }
      
      return [first % MAP_W - sx, Math.floor(first / MAP_W) - sy]
    }
    
    const dirs = [[0,1],[0,-1],[1,0],[-1,0]]
    for (const d of dirs) {
      const nx = cx + d[0], ny = cy + d[1]
      
      if (nx < 0 || ny < 0 || nx >= MAP_W || ny >= MAP_H) continue
      
      const nk = key(nx, ny)
      
      if (prev.has(nk)) continue
      
      const isTarget = nx === tx && ny === ty
      
      if (!isTarget && !isPassable(nx, ny)) continue
      
      prev.set(nk, key(cx, cy))
      queue.push([nx, ny])
    }
  }
  
  return null
}

function wander(chef) {
  const dirs = [[0,1],[0,-1],[1,0],[-1,0]]
  const d = dirs[Math.floor(Math.random() * 4)]
  
  if (isPassable(chef.x + d[0], chef.y + d[1])) {
    chef.x += d[0]
    chef.y += d[1]
  }
}

function fleeFrom(chef, me) {
  const dirs = [[0,1],[0,-1],[1,0],[-1,0]]
  let best = null
  let bestDist = -1
  
  for (const d of dirs) {
    const nx = chef.x + d[0], ny = chef.y + d[1]
    
    if (!isPassable(nx, ny)) continue
    
    const dist = Math.abs(nx - me.x) + Math.abs(ny - me.y)
    
    if (dist > bestDist) { bestDist = dist; best = d }
  }
  
  if (best) { chef.x += best[0]; chef.y += best[1] }
}

function chefTurn() {
  const chef = getFirst(chefType)
  
  if (!chef) {
    // respawn countdown
    if (chefRespawn > 0) {
      chefRespawn -= 1
      if (chefRespawn === 3) centerText("footsteps...", 10, color`3`)
      if (chefRespawn === 0 && chefSpawn) {
        const me = getFirst(playerType())
        if (me && me.x === chefSpawn[0] && me.y === chefSpawn[1]) {
          chefRespawn = 1
          return
        }
        addSprite(chefSpawn[0], chefSpawn[1], chefType)
        play(sfxBack)
        centerText("the chef is back", 10, color`6`)
      }
    }
    return
  }
  // every other turn on the vault, every turn in the kitchen
  const speed = level === 3 ? 1 : 2
  if (moveCount % speed !== 0) return
  const me = getFirst(playerType())
  if (isChonk()) {
    fleeFrom(chef, me) // hunter becomes the hunted
  } else {
    const step = bfsFirstStep(chef.x, chef.y, me.x, me.y)
    if (step) { chef.x += step[0]; chef.y += step[1] }
    else wander(chef)
  }
}

function die() {
  gameState = "dead"
  totalEaten -= eaten
  eaten = 0
  combo = 0
  deathCount += 1
  play(sfxCaught)
  flash()
  clearText()
  centerText("GOT CHOPPED!", 3, color`6`)
  centerText(deathLines[(deathCount - 1) % deathLines.length], 5, color`3`)
  centerText("any key to retry", 8, color`3`)
}

function loadLevel(i) {
  clearTimers()
  setMap(levels[i])
  eaten = 0
  smashed = false
  justAteChef = false
  combo = 0
  lastEatMove = -99
  chefRespawn = 0
  gameState = "playing"
  const chef = getFirst(chefType)
  chefSpawn = chef ? [chef.x, chef.y] : null
  drawHUD()
  centerText(levelNames[i], 3, color`4`)
  centerText(levelFlavor[i], 5, color`3`)
}

function revive() {
  loadLevel(level)
}

function restartGame() {
  level = 0
  totalEaten = 0
  moveCount = 0
  score = 0
  bestCombo = 0
  deathCount = 0
  chefsEaten = 0
  loadLevel(0)
}

function winGame() {
  gameState = "won"
  clearTimers()
  play(sfxWin)
  clearText()
  centerText("BLOBBY WINS!", 2, color`4`)
  centerText("kitchen consumed", 4, color`3`)
  centerText(`score: ${score}`, 6, color`3`)
  centerText(`best combo: x${bestCombo}`, 7, color`3`)
  centerText(`chefs eaten: ${chefsEaten}`, 8, color`3`)
  centerText(`snacks: ${totalEaten}`, 9, color`3`)
  centerText(`moves: ${moveCount}`, 10, color`3`)
  centerText("move to restart", 12, color`3`)
}

function tryMove(dx, dy) {
  if (gameState === "dead") { revive(); return }
  if (gameState === "won") { restartGame(); return }
  smashed = false
  moveCount += 1
  const me = getFirst(playerType())

  if (isChonk()) {
    const lunch = getTile(me.x + dx, me.y + dy)
      .filter(s => s.type === crate || s.type === cookie || s.type === chefType)
    lunch.forEach(s => s.remove())
    if (lunch.some(s => s.type === crate || s.type === cookie)) {
      smashed = true
      smashedAt = [me.x + dx, me.y + dy]
    }
    if (lunch.some(s => s.type === chefType)) justAteChef = true
  }

  me.x += dx
  me.y += dy
}

setLegend(
  [ player, bitmap`
................
................
................
................
................
......0000......
.....077770.....
....07777770....
....07077070....
....07077070....
....07777770....
....07744770....
.....077770.....
......0000......
................
................` ],
  [ chubby, bitmap`
................
................
................
....00000000....
...0777777770...
..077777777770..
..077007700770..
..077007700770..
..077777777770..
..077744447770..
..077777777770..
...0777777770...
....00000000....
................
................
................` ],
  [ chonk, bitmap`
......0000......
....00000000....
...0777777770...
..077777777770..
.07777777777770.
.07700777700770.
.07700777700770.
.07777777777770.
.07777444477770.
.07774000047770.
.07777777777770.
..077777777770..
...0777777770...
....00000000....
......0000......
...5..5..5..5...` ],
  [ wall, bitmap`
0000000000000000
0777707777077770
0777707777077770
0777707777077770
0000000000000000
0770777770777770
0770777770777770
0770777770777770
0000000000000000
0777707777077770
0777707777077770
0777707777077770
0000000000000000
0770777770777770
0770777770777770
0770777770777770` ],
  [ cookie, bitmap`
0000000000000000
0444444444444440
0443444444443440
0444444444444440
0444444344444440
0444444444444440
0444444444344440
0444444444444440
0443444444444440
0444444444444440
0444444444444340
0444444444444440
0444443444444440
0444444444444440
0444444444444440
0000000000000000` ],
  [ apple, bitmap`
................
.......00.......
.......00.......
......0000......
....00000000....
...0444444440...
..045544444440..
..044444444440..
..044444444440..
...0444444440...
...0444444440...
....04444440....
.....044440.....
......0000......
................
................` ],
  [ burger, bitmap`
................
................
................
................
....00000000....
...0777777770...
..077777777770..
..077777777770..
..033333333330..
..044444444440..
..055555555550..
..077777777770..
...0777777770...
....00000000....
................
................` ],
  [ donut, bitmap`
................
................
................
.....000000.....
...0444444440...
..044444444440..
..044744344440..
..044400004440..
..044400004440..
..055555555550..
..055555555550..
...0555555550...
....05555550....
.....000000.....
................
................` ],
  [ iceCream, bitmap`
................
................
......0000......
.....044440.....
....00000000....
...0333333330...
..033333333330..
..033333333330..
..033333333330..
...0333333330...
....04444440....
.....044440.....
......0440......
.......00.......
................
................` ],
  [ crate, bitmap`
................
.00000000000000.
.05555555555550.
.05555555555550.
.05555555555550.
.05555555555550.
.00000000000000.
.05555555555550.
.05555533555550.
.05555555555550.
.05555555555550.
.00000000000000.
.05555555555550.
.05555555555550.
.05555555555550.
.00000000000000.` ],
  [ chefType, bitmap`
................
......7777......
....77777777....
...7777777777...
...0000000000...
....44444444....
....40444044....
....44444444....
....00000000....
....44444444....
...6666666666...
...6677777766...
...6677777766...
...6666666666...
....00....00....
................` ],
  [ crumb, bitmap`
................
................
................
................
................
................
................
.......44.......
......4.........
................
................
................
................
................
................
................` ],
  [ sparkle, bitmap`
................
................
....5...........
....5...........
................
................
................
..........77....
................
................
................
......4.........
......4.........
................
................
................` ]
)

setSolids([ player, chubby, chonk, wall, cookie, crate ])

setPushables({
  [ player ]: [ crate ],
  [ chubby ]: [ crate ]
})

const levels = [
  map`
wwwwwwwwwwww
w.p......a.w
w..........w
w...d...b..w
w..........w
w..i.....i.w
w..........w
w......b...w
w..a.......w
w..........w
w.....d....w
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
w.p........w
w..........w
w..a....i..w
w..........w
w....d.....w
w.....b....w
w.......i..w
w....BBBB..w
w....BdiB..w
w....BBBB..w
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
w.p...c....w
w..a.......w
w.......b..w
w.xxxxxxxx.w
w.x.a..i.x.w
w.x......x.w
w.x..b...x.w
w.xxxxxxxx.w
w......d...w
w.......i..w
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
w.p...c....w
w..........w
w.a......b.w
w...xxxx...w
w...xiix...w
w...xxxx...w
w..........w
w..d....a..w
w.BBBBBB...w
w.....i..b.w
wwwwwwwwwwww`
]

onInput("w", () => tryMove(0, -1))
onInput("a", () => tryMove(-1, 0))
onInput("s", () => tryMove(0, 1))
onInput("d", () => tryMove(1, 0))
onInput("i", () => tryMove(0, -1))
onInput("j", () => tryMove(-1, 0))
onInput("k", () => tryMove(0, 1))
onInput("l", () => tryMove(1, 0))

afterInput(() => {
  if (gameState !== "playing") return

  let me = getFirst(playerType())

  // eat snacks under the player (+ combo + score)
  const bite = getTile(me.x, me.y).filter(s => foods.includes(s.type))
  if (bite.length > 0) {
    bite.forEach(s => s.remove())
    totalEaten += bite.length
    if (moveCount - lastEatMove <= 4) combo += 1
    else combo = 1
    lastEatMove = moveCount
    if (combo > bestCombo) bestCombo = combo
    score += 100 * combo
    burst(me.x, me.y, 3)
    if (combo >= 4) play(sfxCombo3)
    else if (combo === 3) play(sfxCombo2)
    else if (combo === 2) play(sfxCombo1)
    else play(sfxMunch)
  }

  // grow: 2 snacks = chubby, 4 snacks = CHONK
  const sizeBefore = Math.min(2, Math.floor(eaten / 2))
  eaten += bite.length
  const sizeAfter = Math.min(2, Math.floor(eaten / 2))
  const grew = sizeAfter > sizeBefore
  if (grew) {
    const px = me.x, py = me.y
    me.remove()
    addSprite(px, py, playerTypes[sizeAfter])
  }

  drawHUD()

  // popups
  if (bite.length > 0) centerText(combo >= 2 ? `COMBO x${combo}!` : "YUM!", 2, color`4`)
  if (grew && sizeAfter === 1) {
    play(sfxGrow)
    centerText("BURP!", 4, color`4`)
  }
  if (grew && sizeAfter === 2) {
    play(sfxChonk)
    flash()
    centerText("CHONK MODE!", 3, color`4`)
    centerText("smash everything", 5, color`3`)
  }
  if (smashed) {
    smashed = false
    play(sfxCrunch)
    burst(smashedAt[0], smashedAt[1], 3)
    centerText("CRUNCH!", 6, color`4`)
  }

  // level cleared?
  if (snacksLeft() === 0) {
    level += 1
    if (level >= levels.length) { winGame(); return }
    play(sfxLevel)
    loadLevel(level)
    return
  }

  // chef turn
  chefTurn()

  // chef meets player?
  const chef = getFirst(chefType)
  me = getFirst(playerType())
  if (chef && me && chef.x === me.x && chef.y === me.y) {
    if (isChonk()) {
      chef.remove()
      justAteChef = true
    } else {
      die()
      return
    }
  }

  // you ate the chef
  if (justAteChef) {
    justAteChef = false
    chefsEaten += 1
    score += 1000
    chefRespawn = 12
    play(sfxChomp)
    flash()
    burst(me.x, me.y, 6)
    centerText("NOM NOM NOM!", 7, color`4`)
    centerText("the chef: +1000", 9, color`3`)
  }
})

// snacks twinkle so the world feels alive
setInterval(() => {
  if (gameState !== "playing") return
  const snacks = []
  foods.forEach(f => getAll(f).forEach(s => snacks.push(s)))
  if (snacks.length === 0) return
  const s = snacks[Math.floor(Math.random() * snacks.length)]
  fade(addSprite(s.x, s.y, sparkle), 220)
}, 650)

restartGame()