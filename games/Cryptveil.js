// =============================================
// SPRIG ACTION GAME — Full Version
// Features: 3 lives, moving enemies, 3 levels,
// score, key/door, invincibility frames
// =============================================

const p = "p"  // player
const e = "e"  // enemy
const c = "c"  // coin
const w = "w"  // wall
const k = "k"  // key
const d = "d"  // door
const h = "h"  // heart (life pickup)

setLegend(
  [p, bitmap`
0000000000000000
0000066666000000
0000666666600000
0006666666660000
0006060660600000
0006666666660000
0000066666000000
0000066666000000
0000060660600000
0000060660600000
0000600000060000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [e, bitmap`
0000000000000000
0000033333000000
0003333333330000
0033333333333000
0033133333133000
0033333333333000
0033333333333000
0003333333330000
0000333303330000
0000003333000000
0000003333000000
0000030003000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [c, bitmap`
0000000000000000
0000000000000000
0000066666000000
0000666666600000
0000664466600000
0000666666600000
0000066666000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [w, bitmap`
5555555555555555
5500555555005555
5500555555005555
5555555555555555
5555550055555555
5555550055555555
5555555555555555
5555555555505555
5555555555505555
5555555555555555
5500555555555555
5500555555555555
5555555555555555
5555555555550055
5555555555550055
5555555555555555`],
  [k, bitmap`
0000000000000000
0000066666000000
0000666666600000
0006666666660000
0006600006660000
0006600006660000
0006666666660000
0000666666600000
0000066666000000
0000006660000000
0000006660000000
0000006660000000
0000066660000000
0000000000000000
0000000000000000
0000000000000000`],
  [d, bitmap`
0000000000000000
0000555555000000
0005555555500000
0055444445550000
0054444444450000
0054444444450000
0054444444450000
0054444444450000
0054440444450000
0054444444450000
0054444444450000
0055444445550000
0005555555500000
0000555555000000
0000000000000000
0000000000000000`],
  [h, bitmap`
0000000000000000
0000000000000000
0003330033300000
0033333333330000
0333333333333000
0333333333333000
0033333333330000
0003333333300000
0000333333000000
0000033330000000
0000003300000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
)

// =============================================
// LEVELS — add more levels by extending this array
// =============================================
const levels = [
  map`
wwwwwwwwwwwwwwww
w..............w
w.p..c....c....w
w..........e...w
w....wwww......w
w....w..w..c...w
w....w..w......w
w..c.....e.....w
w......wwwww...w
w..e...w...w...w
w......w.k.w...w
w......wwwww...w
w......d.......w
w..............w
w..............w
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
w.............hw
w.p.....c......w
w....wwwwww....w
w....w....w....w
w..e.w.c..w....w
w....w....w..e.w
wwww.w....w....w
w....wwwwww....w
w..c...........w
w........e.....w
w...wwwwwwwww..w
w...w.........ww
w...w.k....d..ww
w...wwwwwwwwwwww
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
w.p.....c......w
w....e.........w
wwwwww.wwwwww..w
w......w.......w
w..c...w..e....w
w......w.......w
w..wwwwwwww....w
w..w.....e.....w
w..w.c.........w
w..w.....wwwwwww
w..wwwwwww.....w
w..........k...w
w..e...........w
w.........c..d.w
wwwwwwwwwwwwwwww`
]

// =============================================
// GAME STATE
// =============================================
let currentLevel = 0
let score = 0
let lives = 3
let hasKey = false
let invincible = false
let invincibleTimer = 0
let enemyMoveTimer = 0
let enemyDirs = []
let gameOver = false
let won = false

// =============================================
// HELPERS
// =============================================
function initLevel() {
  clearText()
  setMap(levels[currentLevel])
  hasKey = false
  invincible = false
  invincibleTimer = 0
  enemyMoveTimer = 0
  // Give each enemy a starting direction
  const enemies = getAll(e)
  enemyDirs = enemies.map(() => ({
    dx: Math.random() < 0.5 ? 1 : -1,
    dy: 0
  }))
  drawHUD()
}

function drawHUD() {
  clearText()
  const livesStr = "♥".repeat(lives) + "♡".repeat(Math.max(0, 3 - lives))
  addText(livesStr, { x: 0, y: 0, color: color`3` })
  addText(`${score}`, { x: 11, y: 0, color: color`4` })
  if (hasKey) addText("KEY!", { x: 6, y: 0, color: color`2` })
}

function flashInvincible() {
  invincible = true
  invincibleTimer = 0
}

// =============================================
// CONTROLS
// =============================================
onInput("w", () => { if (!gameOver && !won) movePlayer(0, -1) })
onInput("s", () => { if (!gameOver && !won) movePlayer(0, 1) })
onInput("a", () => { if (!gameOver && !won) movePlayer(-1, 0) })
onInput("d", () => { if (!gameOver && !won) movePlayer(1, 0) })

function movePlayer(dx, dy) {
  const player = getFirst(p)
  if (!player) return

  const nx = player.x + dx
  const ny = player.y + dy

  // Don't walk into walls
  const dest = getTile(nx, ny)
  const blocked = dest.some(s => s.type === w)
  const doorTile = dest.find(s => s.type === d)

  if (doorTile) {
    if (hasKey) {
      // Advance to next level
      currentLevel++
      if (currentLevel >= levels.length) {
        won = true
        clearText()
        addText("YOU WIN!", { x: 3, y: 6, color: color`4` })
        addText(`Score:${score}`, { x: 2, y: 8, color: color`2` })
        return
      }
      score += 100
      initLevel()
      return
    } else {
      addText("Need key!", { x: 2, y: 7, color: color`3` })
      setTimeout(() => drawHUD(), 800)
      return
    }
  }

  if (!blocked) {
    player.x = nx
    player.y = ny
  }

  afterMove()
}

function afterMove() {
  const player = getFirst(p)
  if (!player) return

  // Collect coins
  const coins = getTile(player.x, player.y).filter(s => s.type === c)
  coins.forEach(coin => { coin.remove(); score += 10 })

  // Pick up key
  const keys = getTile(player.x, player.y).filter(s => s.type === k)
  keys.forEach(key => { key.remove(); hasKey = true })

  // Pick up heart
  const hearts = getTile(player.x, player.y).filter(s => s.type === h)
  hearts.forEach(heart => { heart.remove(); lives = Math.min(3, lives + 1) })

  // Enemy collision
  if (!invincible) {
    const enemies = getTile(player.x, player.y).filter(s => s.type === e)
    if (enemies.length > 0) hitByEnemy()
  }

  // Win level by collecting all coins and using door
  drawHUD()

  // Move enemies every 2 player moves
  enemyMoveTimer++
  if (enemyMoveTimer >= 2) {
    enemyMoveTimer = 0
    moveEnemies()
  }

  // Invincibility countdown
  if (invincible) {
    invincibleTimer++
    if (invincibleTimer > 4) invincible = false
  }
}

function hitByEnemy() {
  lives--
  flashInvincible()
  if (lives <= 0) {
    gameOver = true
    clearText()
    addText("GAME", { x: 5, y: 5, color: color`3` })
    addText("OVER", { x: 5, y: 7, color: color`3` })
    addText(`Score:${score}`, { x: 2, y: 9, color: color`2` })
    setTimeout(() => {
      gameOver = false
      currentLevel = 0
      score = 0
      lives = 3
      initLevel()
    }, 2000)
    return
  }
  drawHUD()
}

function moveEnemies() {
  const enemies = getAll(e)
  const player = getFirst(p)
  if (!player) return

  enemies.forEach((enemy, i) => {
    if (!enemyDirs[i]) enemyDirs[i] = { dx: 1, dy: 0 }

    // Simple chase logic: move toward player occasionally, patrol otherwise
    const chasing = Math.random() < 0.4
    let dx, dy

    if (chasing) {
      dx = player.x > enemy.x ? 1 : player.x < enemy.x ? -1 : 0
      dy = player.y > enemy.y ? 1 : player.y < enemy.y ? -1 : 0
      // Pick one axis
      if (Math.abs(player.x - enemy.x) >= Math.abs(player.y - enemy.y)) dy = 0
      else dx = 0
    } else {
      dx = enemyDirs[i].dx
      dy = enemyDirs[i].dy
    }

    const nx = enemy.x + dx
    const ny = enemy.y + dy
    const dest = getTile(nx, ny)
    const blocked = dest.some(s => s.type === w || s.type === d)

    if (!blocked) {
      enemy.x = nx
      enemy.y = ny
    } else {
      // Bounce direction
      const dirs = [{dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:1},{dx:0,dy:-1}]
      const valid = dirs.filter(dir => {
        const t = getTile(enemy.x + dir.dx, enemy.y + dir.dy)
        return !t.some(s => s.type === w || s.type === d)
      })
      if (valid.length > 0) enemyDirs[i] = valid[Math.floor(Math.random() * valid.length)]
    }

    // Check if enemy walked into player
    if (!invincible && enemy.x === player.x && enemy.y === player.y) hitByEnemy()
  })
}

// =============================================
// START
// =============================================
setSolids([p, w])
initLevel()