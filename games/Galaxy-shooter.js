/**
 * @title: Space Shooter: Galaxy Attack
 * @author: Anonymous
 * @description: A rapid-fire arcade space shooter game where you dodge and destroy incoming enemies.
 * @tags: ['game','space','shooter','arcade','2d']
 * @addedOn: 2026-07-08
 */

/*
  ╔════════════════════════════════╗
  ║   SPACE SHOOTER: GALAXY ATTACK ║
  ╚════════════════════════════════╝
  a / d     → move left / right
  i         → fire (rapid multi-bullet)
  j         → restart after game over
*/

const player = "p"
const bullet  = "b"
const enemyA  = "e"
const enemyB  = "f"
const star1   = "1"
const star2   = "2"

setLegend(

  [ player, bitmap`
................
.......LL.......
......LLLL......
.....LLLLLL.....
....LLLLLLLL....
...LL.LLLL.LL...
..LLL.7007.LLL..
..LLL.7007.LLL..
.LLLLL7007LLLLL.
..LLL.7007.LLL..
...LL.7777.LL...
....L.6006.L....
.....L6666L.....
......6666......
.......LL.......
................` ],

  [ bullet, bitmap`
................
................
.......44.......
.......44.......
.......55.......
.......55.......
.......44.......
.......44.......
.......55.......
.......55.......
.......44.......
.......44.......
................
................
................
................` ],

  [ enemyA, bitmap`
................
....0......0....
...000....000...
..0000000000....
.00000000000....
.00009990000....
.00092290000....
..0002200000....
..000..000......
...00..00.......
....0..0........
...6600660......
..666..666......
................
................
................` ],

  [ enemyB, bitmap`
................
.......00.......
......0000......
.....009900.....
....00099000....
...0009990000...
..000999990000..
..000922290000..
...009222900....
....00929000....
.....09900......
....066600......
...0666600......
................
................
................` ],

  [ star1, bitmap`
................
................
................
................
................
................
................
.......L........
................
................
................
................
................
................
................
................` ],

  [ star2, bitmap`
................
................
................
................
................
.......9........
......999.......
.......9........
................
................
................
................
................
................
................
................` ]
)

function buildMap() {
  setMap(map`
1..2..1.
..1....2
.2...1..
1....2..
..1..1..
.2...1..
1...2...
...p....`)
}
buildMap()

let highScore      = 0
let score          = 0
let gameOver       = false
let tick           = 0
let shootCool      = 0     // frames between shots (cooldown only, no bullet cap)
let spawnRate      = 50
let enemySpeed     = 22
let hudNeedsUpdate = true

function drawHUD() {
  clearText()
  if (gameOver) {
    addText("YOU DIED",          { x: 1, y: 2, color: color`2` })
    addText("SCR:" + score,      { x: 2, y: 4, color: color`4` })
    addText("BEST:" + highScore, { x: 1, y: 5, color: color`5` })
    addText("J=RETRY",           { x: 2, y: 6, color: color`6` })
  } else {
    addText("S:" + score,        { x: 0, y: 0, color: color`4` })
    addText("HI:" + highScore,   { x: 4, y: 0, color: color`5` })
  }
  hudNeedsUpdate = false
}
drawHUD()

function restart() {
  score = 0
  gameOver = false
  tick = 0
  shootCool = 0
  spawnRate = 50
  enemySpeed = 22
  getAll(enemyA).forEach(e => e.remove())
  getAll(enemyB).forEach(e => e.remove())
  getAll(bullet).forEach(b => b.remove())
  buildMap()
  hudNeedsUpdate = true
  drawHUD()
}

function die() {
  if (gameOver) return
  if (score > highScore) highScore = score
  gameOver = true
  getAll(bullet).forEach(b => b.remove())
  getAll(enemyA).forEach(e => e.remove())
  getAll(enemyB).forEach(e => e.remove())
  hudNeedsUpdate = true
  drawHUD()
}

onInput("a", () => {
  if (gameOver) return
  const s = getFirst(player)
  if (s && s.x > 0) s.x--
})

onInput("d", () => {
  if (gameOver) return
  const s = getFirst(player)
  if (s && s.x < 7) s.x++
})

onInput("i", () => {
  if (gameOver) return
  if (shootCool > 0) return          // small cooldown so bullets don't stack same tile
  const s = getFirst(player)
  if (!s || s.y === 0) return
  addSprite(s.x, s.y - 1, bullet)   // fire — no cap on how many exist
  shootCool = 2                      // 2-tick cooldown = very rapid fire
})

onInput("j", () => {
  if (gameOver) restart()
})

function checkHit(bx, by) {
  const tiles = [getTile(bx, by)]
  if (by > 0) tiles.push(getTile(bx, by - 1))
  for (const tile of tiles) {
    for (const sprite of tile) {
      if (sprite.type === enemyA || sprite.type === enemyB) {
        sprite.remove()
        score++
        if (score > highScore) highScore = score
        hudNeedsUpdate = true
        return true
      }
    }
  }
  return false
}

setInterval(() => {
  if (gameOver) return
  tick++
  if (shootCool > 0) shootCool--

  // ── 1. Move ALL bullets up every tick ─────────────────────
  const allBullets = getAll(bullet)
  for (let i = 0; i < allBullets.length; i++) {
    const b = allBullets[i]
    if (b.y === 0) {
      b.remove()          // already at top row → gone instantly
      continue             // (y can't go negative — sprite.y clamps to the grid,
    }                       //  so we must catch this *before* decrementing)
    b.y--
    if (checkHit(b.x, b.y)) {
      b.remove()          // hit enemy → both vanish, +1 score
    }
  }

  // ── 2. Scroll stars ────────────────────────────────────────
  if (tick % 6 === 0) {
    ;[star1, star2].forEach(st => {
      getAll(st).forEach(s => {
        s.y++
        if (s.y > 7) {
          s.remove()
          addSprite(Math.floor(Math.random() * 8), 0, st)
        }
      })
    })
  }

  // ── 3. Move enemies ────────────────────────────────────────
  if (tick % enemySpeed === 0) {
    const enemies = [...getAll(enemyA), ...getAll(enemyB)]
    for (const en of enemies) {
      if (Math.random() < 0.3) {
        en.x = Math.max(0, Math.min(7, en.x + (Math.random() < 0.5 ? -1 : 1)))
      }
      en.y++

      const ship = getFirst(player)
      if (ship && en.x === ship.x && en.y === ship.y) {
        die(); return
      }
      if (en.y > 7) {
        die(); return
      }
    }

    // overlap check after all moves
    const ship = getFirst(player)
    if (ship) {
      for (const sprite of getTile(ship.x, ship.y)) {
        if (sprite.type === enemyA || sprite.type === enemyB) {
          die(); return
        }
      }
    }
  }

  // ── 4. Spawn enemies ───────────────────────────────────────
  if (tick % spawnRate === 0) {
    const type = (score >= 6 && Math.random() < 0.45) ? enemyB : enemyA
    addSprite(Math.floor(Math.random() * 8), 0, type)
  }

  // ── 5. Difficulty scaling every 5 kills ───────────────────
  spawnRate  = Math.max(14, 50 - Math.floor(score / 5) * 5)
  enemySpeed = Math.max(7,  22 - Math.floor(score / 5) * 2)

  if (hudNeedsUpdate) drawHUD()

}, 70)
