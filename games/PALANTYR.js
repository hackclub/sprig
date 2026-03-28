/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: PALANTYR
@author: 
@tags: []
@addedOn: 2025-00-00
*/

// BENEATH THE SURFACE — Hack Club Sprig Edition
// A dungeon-crawler RPG with combat, enemies, keys, boss, and music
// Controls: WASD = move, I = attack, J = drink rum (heal), K = restart level, L = skip dialog

// ── SPRITE TYPE KEYS ──
const P  = "p"  // player
const W  = "w"  // wall
const F  = "f"  // floor (background)
const S  = "s"  // slime enemy
const T  = "t"  // troll enemy
const B  = "b"  // boss (Lord Aldric)
const K  = "k"  // key item
const R  = "r"  // rum flask (heal)
const H  = "h"  // health pack
const E  = "e"  // exit door
const LV = "L"  // lava tile
const O  = "o"  // ore vein (heals slowly)
const SW = "q"  // sword attack marker
const BL = "x"  // boss projectile

// ── BITMAPS ──
setLegend(
  // Player (knight with helmet)
  [P, bitmap`
0000000000000000
0000066660000000
0006666666600000
0006600660600000
0006666666600000
0000066666000000
0000666666000000
0006688886600000
0006666666600000
0060666666060000
0006666666600000
0000666666000000
0000060600000000
0000066600000000
0000060600000000
0000000000000000`],

  // Wall (stone brick)
  [W, bitmap`
1111111111111111
1000000001000001
1011111101011101
1011111101011101
1011111101011101
1000000001000001
1111111111111111
1000001000000001
1011101011111101
1011101011111101
1011101011111101
1000001000000001
1111111111111111
1001110000011001
1001110000011001
1111111111111111`],

  // Floor (dark stone)
  [F, bitmap`
1111111111111111
1000000000000001
1000000000000001
1000001100000001
1000011110000001
1000001100000001
1000000000000001
1000000000000001
1100000000000011
1000000000000001
1000000000000001
1000001100000001
1000011110000001
1000001100000001
1000000000000001
1111111111111111`],

  // Slime enemy (green blob)
  [S, bitmap`
0000000000000000
0000033330000000
0003333333300000
0033333333330000
0033303330330000
0033303330330000
0033333333330000
0033303330330000
0003333333300000
0003333333300000
0000330330000000
0000333330000000
0000033300000000
0000003000000000
0000000000000000
0000000000000000`],

  // Troll enemy (big green brute)
  [T, bitmap`
0000444000000000
0004444440000000
0044040440000000
0044444440000000
0004444440000000
0044444440000000
0444444444000000
0044666440000000
0044666440000000
0044444440000000
0004444440000000
0000440440000000
0000440440000000
0000444444000000
0000000000000000
0000000000000000`],

  // Boss Aldric (crowned mage)
  [B, bitmap`
0066666660000000
0060000060000000
0666666666000000
0666006006600000
0666666666600000
0066666666000000
0666666666600000
0066330333600000
0666333333600000
0666333333600000
0066666666000000
0006666660000000
0000666600000000
0000666600000000
0000066000000000
0000000000000000`],

  // Key (gold key)
  [K, bitmap`
0000000000000000
0000000000000000
0000033330000000
0000300030000000
0000300030000000
0000033330000000
0000003000000000
0000003000000000
0000003030000000
0000003030000000
0000003330000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],

  // Rum flask (brown bottle)
  [R, bitmap`
0000000000000000
0000007000000000
0000077700000000
0000077700000000
0000777770000000
0000799970000000
0000799970000000
0000799970000000
0000799970000000
0000777770000000
0000077700000000
0000077700000000
0000007000000000
0000000000000000
0000000000000000
0000000000000000`],

  // Health pack (green cross)
  [H, bitmap`
0000000000000000
0000044400000000
0000044400000000
0004444444000000
0004444444000000
0004444444000000
0000044400000000
0000044400000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],

  // Exit door (glowing portal)
  [E, bitmap`
0000044000000000
0000444400000000
0004444440000000
0044444444000000
0044444444000000
0044444444000000
0044444444000000
0044444444000000
0044444444000000
0044444444000000
0044444444000000
0004444440000000
0000444400000000
0000044000000000
0000000000000000
0000000000000000`],

  // Lava tile (red/orange)
  [LV, bitmap`
3333333333333333
3333222333332223
3322222233222223
3322323233222323
3222222223222223
3222232223222323
3322222333222223
3333322333333223
3333222333332223
3322222233222223
3322323233222323
3222222223222223
3222232223222323
3322222333222223
3333322333333223
3333333333333333`],

  // Ore vein (glowing orange)
  [O, bitmap`
1111111111111111
1111111111111111
1122221111222111
1222222122222211
1222322222232211
1222222222222211
1122221122222111
1111111111111111
1111111111111111
1122221111222211
1222222112222211
1222232112232211
1222222122222211
1122221111222111
1111111111111111
1111111111111111`],

  // Sword attack flash (yellow)
  [SW, bitmap`
0000000000000000
0000000000000000
0000022200000000
0002222220000000
0022222222000000
0022222222200000
0002222222220000
0000222222220000
0000022222220000
0000002222200000
0000000222000000
0000000020000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],

  // Boss projectile (purple orb)
  [BL, bitmap`
0000000000000000
0000066000000000
0006666600000000
0066666660000000
0066606660000000
0666666666000000
0666666666000000
0066606660000000
0066666660000000
0006666600000000
0000066000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
)

// ── TUNES ──
const walkTune = tune`
150: C4/150,
150: E4/150,
150: G4/150,
150: E4/150`

const attackTune = tune`
80: G5/80,
80: C5/80,
80: E5/80`

const hurtTune = tune`
100: C3/100,
100: A2/100`

const keyTune = tune`
120: C5/120,
120: E5/120,
120: G5/120,
120: C6/120`

const healTune = tune`
100: E5/100,
100: G5/100,
100: B5/100`

const levelTune = tune`
150: C5/150,
150: E5/150,
150: G5/150,
150: C6/150,
150: G5/150,
150: E5/150,
300: C5/300`

const bossTune = tune`
200: C3/200,
200: C3/200,
200: G3/200,
200: F3/200,
200: E3/200,
200: D3/200,
400: C3/400`

const victorTune = tune`
150: C5/150,
150: E5/150,
150: G5/150,
150: B5/150,
150: C6/150,
150: B5/150,
150: G5/150,
150: E5/150,
300: C5/300`

const deathTune = tune`
300: C3/300,
300: B2/300,
300: A2/300,
600: G2/600`

const ambientTune = tune`
400: C4/400,
400: E4/400,
400: G4/400,
400: F4/400`

// ── GAME STATE ──
let gameState = "dialog"  // dialog | playing | gameover | win
let dialogIndex = 0
let currentLevel = 0
let bossActive = false
let bossPhase = 1
let bgMusic = null

// Player stats
let playerHP = 10
let playerMaxHP = 10
let playerRum = 3
let playerScore = 0
let playerKeys = 0
let playerXP = 0
let playerLevel = 1
let comboCount = 0
let comboTimer = 0

// Enemy HP tracking: key = "x,y", value = hp
let enemyHP = {}

// Timers
let enemyMoveTimer = 0
let bossMoveTimer = 0
let bossShootTimer = 0
let bossProjectiles = []  // {x, y, dx, dy, timer}
let attackFlashTimer = 0
let hurtFlashTimer = 0
let dialogPauseTimer = 0
let oreHealTimer = 0
let statusTimer = 0

// Dialog sequences per level
const DIALOGS = [
  // Level 0 — The Crack
  [
    "NARRATOR: The gate above slammed shut.",
    "NARRATOR: Stone groaned. Dust fell like rain.",
    "SER VOSS: My sword is still in my hand.",
    "SER VOSS: Forward. That's the only direction left.",
    "HINT: WASD=Move  I=Attack  J=Heal  L=Skip",
  ],
  // Level 1 — The Magma Halls
  [
    "NARRATOR: Wider chambers. Lava everywhere.",
    "JOURNAL: 'Day 47. The Crown responds to anger.",
    "JOURNAL: The creatures cluster around my rage.'",
    "SER VOSS: Someone else is down here.",
    "SER VOSS: Someone educated. With a plan.",
  ],
  // Level 2 — The Ore Depths
  [
    "NARRATOR: Glowing ore veins in every wall.",
    "CARVING: 'We cage the Crown because rage",
    "CARVING: should never have a throne.'",
    "SER VOSS: The ore heals me. I press on.",
    "SER VOSS: I know who has the Crown now.",
  ],
  // Level 3 — The Maw (Boss)
  [
    "NARRATOR: The deepest place. The Ashen Gate.",
    "NARRATOR: Scorched robes. Cracked obsidian crown.",
    "ALDRIC: A knight. Of course they sent a knight.",
    "VOSS: Nobody sent me. Take off the crown.",
    "ALDRIC: I wore their humiliation 30 years.",
    "ALDRIC: I think I'll keep this a while longer.",
    "ALDRIC: *The room begins to crack*",
  ],
]

const WIN_DIALOG = [
  "NARRATOR: The Crown shatters against the wall.",
  "NARRATOR: Somewhere above, the cracks close.",
  "SER VOSS: Was it worth it, Aldric?",
  "NARRATOR: Aldric doesn't answer. He's gone.",
  "NARRATOR: The deep things go quiet.",
  "NARRATOR: Ser Voss climbs toward the light.",
  "  *** YOU WIN! SCORE: " + playerScore + " ***",
]

// ── LEVEL DEFINITIONS ──
// Grid: 16 wide x 14 tall (Sprig standard)
// p=player, w=wall, .=floor, s=slime, t=troll, b=boss
// k=key, r=rum, h=health, e=exit, L=lava, o=ore

const LEVELS = [
  // ── LEVEL 0: THE CRACK ──
  {
    name: "THE CRACK",
    keysNeeded: 1,
    map: map`
wwwwwwwwwwwwwwww
w..............w
w..p...........w
w..............w
w....www.......w
w....w.........w
w....w.s.......w
w.k..www.......w
w..........s...w
w......www.....w
w......w.......w
w.r....w..t....w
w......w.......w
w..............w
w..............w
wwwwwwweewwwwwww`,
    enemyData: {
      "7,6":  { hp: 3, maxhp: 3, type: "s" },
      "11,8": { hp: 3, maxhp: 3, type: "s" },
      "10,11":{ hp: 5, maxhp: 5, type: "t" },
    },
  },

  // ── LEVEL 1: THE MAGMA HALLS ──
  {
    name: "MAGMA HALLS",
    keysNeeded: 2,
    map: map`
wwwwwwwwwwwwwwww
w..............w
w.p....s.......w
w..............w
wLLLL..........w
w......www.....w
w..k...w.......w
w......w.s.....w
w......www.....w
w..............w
w.s....k.......w
w......www.....w
w.r.h..w..tt...w
w..............w
w..............w
wwwwwwweewwwwwww`,
    enemyData: {
      "7,2":  { hp: 3, maxhp: 3, type: "s" },
      "12,7": { hp: 3, maxhp: 3, type: "s" },
      "5,10": { hp: 3, maxhp: 3, type: "s" },
      "10,12":{ hp: 5, maxhp: 5, type: "t" },
      "11,12":{ hp: 5, maxhp: 5, type: "t" },
    },
  },

  // ── LEVEL 2: THE ORE DEPTHS ──
  {
    name: "ORE DEPTHS",
    keysNeeded: 2,
    map: map`
wwwwwwwwwwwwwwww
wooo.....ooooo.w
w..p...........w
w..............w
w.s..www...s...w
w....w.........w
w..k.w.........w
w....www.......w
wLLLL..........w
w.....www......w
w..s..w....k...w
w.....w....t...w
w.r.h.w....t...w
w..............w
w..............w
wwwwwwweewwwwwww`,
    enemyData: {
      "2,4":  { hp: 3, maxhp: 3, type: "s" },
      "11,4": { hp: 3, maxhp: 3, type: "s" },
      "3,10": { hp: 4, maxhp: 4, type: "s" },
      "11,11":{ hp: 7, maxhp: 7, type: "t" },
      "11,12":{ hp: 7, maxhp: 7, type: "t" },
    },
  },

  // ── LEVEL 3: THE MAW (BOSS) ──
  {
    name: "THE MAW",
    keysNeeded: 0,
    map: map`
wwwwwwwwwwwwwwww
w..............w
w..p...........w
w..............w
w.....www......w
w.....w........w
w.....w........w
w..............w
w..............w
w......b.......w
w..............w
w..............w
w....r.h.......w
w..............w
w..............w
wwwwwwweewwwwwww`,
    enemyData: {
      "7,9": { hp: 20, maxhp: 20, type: "b" },
    },
  },
]

// ── SETUP ──
setBackground(F)

function loadLevel(li) {
  currentLevel = li
  enemyHP = {}
  bossActive = false
  bossPhase = 1
  bossProjectiles = []
  bossMoveTimer = 0
  bossShootTimer = 0
  attackFlashTimer = 0
  hurtFlashTimer = 0
  comboCount = 0
  comboTimer = 0
  oreHealTimer = 0

  const def = LEVELS[li]
  setMap(def.map)

  // Copy enemy HP data
  for (const key in def.enemyData) {
    enemyHP[key] = Object.assign({}, def.enemyData[key])
  }

  setSolids([P, W, S, T, B, LV])
  setPushables({ [P]: [] })

  // Start ambient music — boss gets special track
  if (bgMusic) bgMusic.end()
  bgMusic = playTune(li === 3 ? bossTune : ambientTune, Infinity)

  playerKeys = 0
  clearText()
  showHUD()

  // Show level name briefly
  addText(def.name, { x: 1, y: 0, color: color`2` })
  setTimeout(() => {
    clearText()
    showHUD()
  }, 2000)
}

function showHUD() {
  clearText()
  // HP bar
  const hpBar = "HP:" + "█".repeat(playerHP) + "░".repeat(playerMaxHP - playerHP)
  addText(hpBar.slice(0, 16), { x: 0, y: 0, color: color`4` })
  // Stats row
  addText("RUM:" + playerRum + " KEY:" + playerKeys + " SC:" + playerScore,
    { x: 0, y: 13, color: color`2` })
}

function showDialog() {
  clearText()
  const lines = currentLevel < LEVELS.length
    ? (gameState === "win" ? WIN_DIALOG : DIALOGS[currentLevel])
    : WIN_DIALOG
  const line = lines[dialogIndex]
  if (!line) return

  // Word-wrap across two rows
  if (line.length <= 16) {
    addText(line, { x: 0, y: 6, color: color`2` })
  } else {
    addText(line.slice(0, 16), { x: 0, y: 5, color: color`2` })
    addText(line.slice(16, 32), { x: 0, y: 7, color: color`2` })
  }
  addText("L=next", { x: 10, y: 12, color: color`1` })
}

// ── INPUT HANDLERS ──
onInput("w", () => {
  if (gameState !== "playing") return
  movePlayer(0, -1)
})
onInput("s", () => {
  if (gameState !== "playing") return
  movePlayer(0, 1)
})
onInput("a", () => {
  if (gameState !== "playing") return
  movePlayer(-1, 0)
})
onInput("d", () => {
  if (gameState !== "playing") return
  movePlayer(1, 0)
})

// I = Attack
onInput("i", () => {
  if (gameState !== "playing") return
  doAttack()
})

// J = Drink Rum (heal)
onInput("j", () => {
  if (gameState !== "playing") return
  if (playerRum <= 0) {
    clearText()
    addText("No rum left!", { x: 1, y: 6, color: color`3` })
    showHUD()
    return
  }
  playerRum--
  const healAmt = 3 + playerLevel
  playerHP = Math.min(playerMaxHP, playerHP + healAmt)
  playTune(healTune)
  clearText()
  addText("+" + healAmt + " HP!", { x: 4, y: 6, color: color`4` })
  setTimeout(() => { clearText(); showHUD() }, 800)
  showHUD()
})

// K = Restart level
onInput("k", () => {
  if (gameState === "gameover") {
    playerHP = playerMaxHP
    playerRum = 3
    playerScore = Math.max(0, playerScore - 50)
    gameState = "dialog"
    dialogIndex = 0
    showDialog()
    return
  }
  if (gameState === "playing") {
    playerHP = playerMaxHP
    loadLevel(currentLevel)
  }
})

// L = Skip dialog / advance dialog
onInput("l", () => {
  if (gameState === "dialog") {
    advanceDialog()
    return
  }
  if (gameState === "gameover") {
    playerHP = playerMaxHP
    playerRum = 3
    playerScore = Math.max(0, playerScore - 50)
    gameState = "dialog"
    dialogIndex = 0
    showDialog()
  }
})

// ── DIALOG ADVANCE ──
function advanceDialog() {
  const lines = gameState === "win" ? WIN_DIALOG : DIALOGS[currentLevel]
  dialogIndex++
  if (dialogIndex >= lines.length) {
    dialogIndex = 0
    if (gameState === "win") {
      clearText()
      addText("FINAL SCORE:", { x: 2, y: 5, color: color`2` })
      addText("" + playerScore, { x: 5, y: 7, color: color`4` })
      addText("K=restart", { x: 3, y: 10, color: color`1` })
      return
    }
    // Start gameplay
    gameState = "playing"
    clearText()
    loadLevel(currentLevel)
  } else {
    showDialog()
  }
}

// ── PLAYER MOVEMENT ──
function movePlayer(dx, dy) {
  const player = getFirst(P)
  if (!player) return

  const nx = player.x + dx
  const ny = player.y + dy

  // Check for key pickup
  const keysAtDest = getTile(nx, ny)
  const keySprite = keysAtDest.find(sp => sp.type === K)
  if (keySprite) {
    keySprite.remove()
    playerKeys++
    playerScore += 50
    playTune(keyTune)
    clearText()
    addText("KEY GET! +" + playerKeys, { x: 2, y: 6, color: color`2` })
    setTimeout(() => { clearText(); showHUD() }, 700)
    showHUD()
  }

  // Check for rum pickup
  const rumSprite = keysAtDest.find(sp => sp.type === R)
  if (rumSprite) {
    rumSprite.remove()
    playerRum = Math.min(5, playerRum + 1)
    playerScore += 25
    playTune(healTune)
    clearText()
    addText("RUM +1!", { x: 4, y: 6, color: color`9` })
    setTimeout(() => { clearText(); showHUD() }, 700)
    showHUD()
  }

  // Check for health pack
  const healSprite = keysAtDest.find(sp => sp.type === H)
  if (healSprite) {
    healSprite.remove()
    const h = 4
    playerHP = Math.min(playerMaxHP, playerHP + h)
    playerScore += 30
    playTune(healTune)
    clearText()
    addText("+" + h + " HP!", { x: 4, y: 6, color: color`4` })
    setTimeout(() => { clearText(); showHUD() }, 700)
    showHUD()
  }

  // Check for exit
  const exitSprite = keysAtDest.find(sp => sp.type === E)
  if (exitSprite) {
    const needed = LEVELS[currentLevel].keysNeeded
    if (playerKeys >= needed) {
      goNextLevel()
      return
    } else {
      clearText()
      addText("Need " + needed + " keys!", { x: 1, y: 6, color: color`3` })
      setTimeout(() => { clearText(); showHUD() }, 800)
      return
    }
  }

  // Check for enemy — bump-attack
  const enemy = keysAtDest.find(sp => sp.type === S || sp.type === T || sp.type === B)
  if (enemy) {
    bumpAttack(enemy, nx, ny)
    return
  }

  // Check for boss projectile collision
  const projHit = keysAtDest.find(sp => sp.type === BL)
  if (projHit) {
    projHit.remove()
    takeDamage(3)
    return
  }

  // Ore vein — heal over time if standing on it
  const oreHere = getTile(player.x, player.y).find(sp => sp.type === O)
  if (oreHere) {
    oreHealTimer++
    if (oreHealTimer >= 3) {
      oreHealTimer = 0
      if (playerHP < playerMaxHP) {
        playerHP++
        showHUD()
      }
    }
  } else {
    oreHealTimer = 0
  }

  player.x += dx
  player.y += dy
  playTune(walkTune)
  showHUD()

  // Check for lava damage after move
  const lavaHere = getTile(player.x, player.y).find(sp => sp.type === LV)
  if (lavaHere) {
    takeDamage(2)
    // Push player back
    player.x -= dx
    player.y -= dy
    showHUD()
  }
}

// ── BUMP ATTACK ON MOVE ──
function bumpAttack(enemy, ex, ey) {
  const key = ex + "," + ey
  const data = enemyHP[key]
  if (!data) return

  const dmg = 1 + playerLevel
  data.hp -= dmg
  comboCount++
  comboTimer = 8
  playerScore += 10 * comboCount

  playTune(attackTune)
  clearText()

  if (comboCount >= 3) {
    addText("COMBO x" + comboCount + "!", { x: 3, y: 6, color: color`2` })
  } else {
    addText("-" + dmg + " HP!", { x: 4, y: 6, color: color`3` })
  }

  if (data.hp <= 0) {
    // Enemy dies
    enemy.remove()
    delete enemyHP[key]
    playerScore += data.type === "b" ? 500 : data.type === "t" ? 100 : 50
    playerXP += data.type === "b" ? 10 : data.type === "t" ? 4 : 2

    clearText()
    addText("DEFEAT! +" + (data.type === "b" ? 500 : data.type === "t" ? 100 : 50),
      { x: 0, y: 6, color: color`2` })

    checkLevelUp()

    // Boss died
    if (data.type === "b") {
      if (bgMusic) bgMusic.end()
      playTune(victorTune)
      setTimeout(() => {
        gameState = "win"
        dialogIndex = 0
        showDialog()
      }, 1200)
      return
    }
  } else {
    // Show enemy HP bar
    const bar = "E:" + "█".repeat(data.hp) + "░".repeat(data.maxhp - data.hp)
    addText(bar.slice(0, 16), { x: 0, y: 1, color: color`3` })
  }

  setTimeout(() => { clearText(); showHUD() }, 800)
  showHUD()
}

// ── DIRECTIONAL ATTACK (I key) ──
function doAttack() {
  const player = getFirst(P)
  if (!player) return

  // Attack all 4 adjacent tiles
  const dirs = [[0,-1],[0,1],[-1,0],[1,0]]
  let hit = false

  dirs.forEach(([dx, dy]) => {
    const tx = player.x + dx
    const ty = player.y + dy
    const tiles = getTile(tx, ty)
    const enemy = tiles.find(sp => sp.type === S || sp.type === T || sp.type === B)
    if (enemy) {
      bumpAttack(enemy, tx, ty)
      hit = true

      // Flash sword sprite briefly
      addSprite(tx, ty, SW)
      setTimeout(() => {
        const sw = getTile(tx, ty).find(sp => sp.type === SW)
        if (sw) sw.remove()
      }, 180)
    }
  })

  if (!hit) {
    playTune(attackTune)
    clearText()
    addText("Swoosh!", { x: 4, y: 6, color: color`2` })
    setTimeout(() => { clearText(); showHUD() }, 400)
  }
}

// ── TAKE DAMAGE ──
function takeDamage(dmg) {
  if (hurtFlashTimer > 0) return  // invincibility frames
  playerHP -= dmg
  hurtFlashTimer = 4
  comboCount = 0
  playTune(hurtTune)
  clearText()
  addText("OUCH! -" + dmg, { x: 3, y: 6, color: color`3` })
  setTimeout(() => { clearText(); showHUD() }, 600)
  showHUD()

  if (playerHP <= 0) {
    playerHP = 0
    setTimeout(() => gameOver(), 600)
  }
}

// ── LEVEL UP ──
function checkLevelUp() {
  const needed = playerLevel * 5
  if (playerXP >= needed) {
    playerXP -= needed
    playerLevel++
    playerMaxHP += 2
    playerHP = Math.min(playerMaxHP, playerHP + 3)
    clearText()
    addText("LEVEL UP! " + playerLevel, { x: 2, y: 5, color: color`2` })
    addText("+2 MaxHP +3HP", { x: 1, y: 7, color: color`4` })
    playTune(levelTune)
    setTimeout(() => { clearText(); showHUD() }, 1500)
  }
}

// ── GAME OVER ──
function gameOver() {
  if (bgMusic) bgMusic.end()
  playTune(deathTune)
  gameState = "gameover"
  clearText()
  addText("YOU FELL", { x: 3, y: 4, color: color`3` })
  addText("Score: " + playerScore, { x: 2, y: 6, color: color`2` })
  addText("K or L to retry", { x: 0, y: 8, color: color`1` })
}

// ── NEXT LEVEL ──
function goNextLevel() {
  if (bgMusic) bgMusic.end()
  playTune(levelTune)
  clearText()
  addText("LEVEL CLEAR!", { x: 2, y: 5, color: color`4` })
  addText("+" + 100 + " pts", { x: 4, y: 7, color: color`2` })
  playerScore += 100
  playerHP = Math.min(playerMaxHP, playerHP + 3)  // small heal between levels

  setTimeout(() => {
    const next = currentLevel + 1
    if (next >= LEVELS.length) {
      gameState = "win"
      dialogIndex = 0
      showDialog()
    } else {
      currentLevel = next
      gameState = "dialog"
      dialogIndex = 0
      showDialog()
    }
  }, 1500)
}

// ── ENEMY AI (runs on setInterval) ──
setInterval(() => {
  if (gameState !== "playing") return

  const player = getFirst(P)
  if (!player) return

  // Combo timer decay
  if (comboTimer > 0) {
    comboTimer--
  } else {
    comboCount = 0
  }

  // Invincibility frame countdown
  if (hurtFlashTimer > 0) hurtFlashTimer--

  // Move slimes every 3 ticks
  enemyMoveTimer++
  if (enemyMoveTimer >= 3) {
    enemyMoveTimer = 0
    moveEnemies(player)
  }

  // Boss AI
  const boss = getFirst(B)
  if (boss) {
    moveBoss(boss, player)
    handleBossProjectiles(player)
  }

  // Check boss phases
  if (boss) {
    const bkey = boss.x + "," + boss.y
    const bdata = enemyHP[bkey]
    if (bdata) {
      const pct = bdata.hp / bdata.maxhp
      const newPhase = pct > 0.66 ? 1 : pct > 0.33 ? 2 : 3
      if (newPhase !== bossPhase) {
        bossPhase = newPhase
        clearText()
        addText("PHASE " + bossPhase + "!", { x: 4, y: 6, color: color`3` })
        setTimeout(() => { clearText(); showHUD() }, 1000)
        // Spawn slimes on phase change
        spawnBossMinions()
      }
    }
  }

}, 200)

// ── MOVE ENEMIES ──
function moveEnemies(player) {
  // Move slimes toward player
  getAll(S).forEach(slime => {
    const key = slime.x + "," + slime.y
    if (!enemyHP[key]) return

    const dx = Math.sign(player.x - slime.x)
    const dy = Math.sign(player.y - slime.y)

    // Try to move, horizontal first
    const newX = slime.x + dx
    const newY = slime.y + dy

    // Check if target tile is passable
    const destH = getTile(newX, slime.y)
    const blockedH = destH.some(sp =>
      sp.type === W || sp.type === S || sp.type === T || sp.type === LV)

    if (!blockedH && newX !== player.x) {
      // Check if player is there — attack instead of move
      if (newX === player.x && slime.y === player.y) {
        takeDamage(1)
      } else {
        // Update enemy HP key
        const newKey = newX + "," + slime.y
        if (!enemyHP[newKey]) {
          enemyHP[newKey] = enemyHP[key]
          delete enemyHP[key]
          slime.x = newX
        }
      }
    } else {
      const destV = getTile(slime.x, newY)
      const blockedV = destV.some(sp =>
        sp.type === W || sp.type === S || sp.type === T || sp.type === LV)
      if (!blockedV) {
        if (slime.x === player.x && newY === player.y) {
          takeDamage(1)
        } else {
          const newKey = slime.x + "," + newY
          if (!enemyHP[newKey]) {
            enemyHP[newKey] = enemyHP[key]
            delete enemyHP[key]
            slime.y = newY
          }
        }
      }
    }

    // Slime standing on lava dies
    const lavaUnder = getTile(slime.x, slime.y).find(sp => sp.type === LV)
    if (lavaUnder) {
      slime.remove()
      delete enemyHP[slime.x + "," + slime.y]
      playerScore += 10
      showHUD()
    }
  })

  // Trolls move every other tick (slower)
  getAll(T).forEach(troll => {
    if (Math.random() > 0.6) return  // only move 40% of ticks
    const key = troll.x + "," + troll.y
    if (!enemyHP[key]) return

    const dx = Math.sign(player.x - troll.x)
    const dy = Math.sign(player.y - troll.y)

    // Check horizontal
    const dest = getTile(troll.x + dx, troll.y)
    const blocked = dest.some(sp =>
      sp.type === W || sp.type === S || sp.type === T || sp.type === LV)

    if (!blocked) {
      if ((troll.x + dx) === player.x && troll.y === player.y) {
        takeDamage(2)
      } else {
        const newKey = (troll.x + dx) + "," + troll.y
        if (!enemyHP[newKey]) {
          enemyHP[newKey] = enemyHP[key]
          delete enemyHP[key]
          troll.x += dx
        }
      }
    } else {
      const destV = getTile(troll.x, troll.y + dy)
      const blockedV = destV.some(sp =>
        sp.type === W || sp.type === S || sp.type === T || sp.type === LV)
      if (!blockedV) {
        if (troll.x === player.x && (troll.y + dy) === player.y) {
          takeDamage(2)
        } else {
          const newKey = troll.x + "," + (troll.y + dy)
          if (!enemyHP[newKey]) {
            enemyHP[newKey] = enemyHP[key]
            delete enemyHP[key]
            troll.y += dy
          }
        }
      }
    }
  })
}

// ── BOSS AI ──
function moveBoss(boss, player) {
  bossMoveTimer++
  const speed = bossPhase === 3 ? 1 : bossPhase === 2 ? 2 : 3
  if (bossMoveTimer < speed) return
  bossMoveTimer = 0

  const key = boss.x + "," + boss.y
  if (!enemyHP[key]) return

  // Move toward player
  const dx = Math.sign(player.x - boss.x)
  const dy = Math.sign(player.y - boss.y)

  const dest = getTile(boss.x + dx, boss.y)
  const blocked = dest.some(sp => sp.type === W || sp.type === LV)

  if (!blocked) {
    if ((boss.x + dx) === player.x && boss.y === player.y) {
      takeDamage(3)
    } else {
      const newKey = (boss.x + dx) + "," + boss.y
      enemyHP[newKey] = enemyHP[key]
      delete enemyHP[key]
      boss.x += dx
    }
  } else {
    const destV = getTile(boss.x, boss.y + dy)
    const blockedV = destV.some(sp => sp.type === W || sp.type === LV)
    if (!blockedV) {
      if (boss.x === player.x && (boss.y + dy) === player.y) {
        takeDamage(3)
      } else {
        const newKey = boss.x + "," + (boss.y + dy)
        enemyHP[newKey] = enemyHP[key]
        delete enemyHP[key]
        boss.y += dy
      }
    }
  }

  // Boss shoots projectiles in phase 2+
  if (bossPhase >= 2) {
    bossShootTimer++
    const shootRate = bossPhase === 3 ? 4 : 7
    if (bossShootTimer >= shootRate) {
      bossShootTimer = 0
      shootBossProjectile(boss, player)
    }
  }
}

// ── BOSS PROJECTILE ──
function shootBossProjectile(boss, player) {
  const bx = boss.x
  const by = boss.y
  const dx = Math.sign(player.x - bx)
  const dy = Math.sign(player.y - by)

  // Shoot in 4 directions in phase 3
  if (bossPhase >= 3) {
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([pdx, pdy]) => {
      const sx = bx + pdx
      const sy = by + pdy
      if (sx >= 1 && sx <= 14 && sy >= 1 && sy <= 12) {
        addSprite(sx, sy, BL)
        bossProjectiles.push({ x: sx, y: sy, dx: pdx, dy: pdy, timer: 0 })
      }
    })
  } else {
    // Shoot directly at player
    const sx = bx + dx
    const sy = by + dy
    if (sx >= 1 && sx <= 14 && sy >= 1 && sy <= 12) {
      addSprite(sx, sy, BL)
      bossProjectiles.push({ x: sx, y: sy, dx: dx, dy: dy, timer: 0 })
    }
  }
}

// ── HANDLE BOSS PROJECTILES ──
function handleBossProjectiles(player) {
  bossProjectiles = bossProjectiles.filter(proj => {
    proj.timer++
    if (proj.timer % 2 !== 0) return true  // only move every 2 ticks

    const nx = proj.x + proj.dx
    const ny = proj.y + proj.dy

    // Remove old position
    const old = getTile(proj.x, proj.y)
    const oldBl = old.find(sp => sp.type === BL)
    if (oldBl) oldBl.remove()

    // Hit wall
    if (nx < 1 || nx > 14 || ny < 1 || ny > 12) return false
    const dest = getTile(nx, ny)
    if (dest.some(sp => sp.type === W)) return false

    // Hit player
    if (nx === player.x && ny === player.y) {
      takeDamage(2)
      return false
    }

    // Move projectile
    proj.x = nx
    proj.y = ny
    addSprite(nx, ny, BL)

    // Max range
    if (proj.timer > 10) return false
    return true
  })
}

// ── BOSS MINION SPAWN ──
function spawnBossMinions() {
  // Spawn 2 slimes near boss
  const boss = getFirst(B)
  if (!boss) return
  const positions = [
    [boss.x - 2, boss.y],
    [boss.x + 2, boss.y],
    [boss.x, boss.y - 2],
  ]
  positions.forEach(([sx, sy]) => {
    if (sx >= 1 && sx <= 14 && sy >= 1 && sy <= 12) {
      const dest = getTile(sx, sy)
      const clear = !dest.some(sp =>
        sp.type === W || sp.type === S || sp.type === T ||
        sp.type === B || sp.type === LV || sp.type === P)
      if (clear) {
        addSprite(sx, sy, S)
        enemyHP[sx + "," + sy] = { hp: 3, maxhp: 3, type: "s" }
      }
    }
  })
}

// ── AFTER INPUT HOOK ──
afterInput(() => {
  if (gameState !== "playing") return

  // Check if all enemies dead on non-boss levels (reveal exit hint)
  if (currentLevel < 3) {
    const allSlimes = getAll(S)
    const allTrolls = getAll(T)
    if (allSlimes.length === 0 && allTrolls.length === 0) {
      // Flash exit hint
      const def = LEVELS[currentLevel]
      if (def.keysNeeded <= playerKeys) {
        clearText()
        addText("Find the EXIT!", { x: 1, y: 6, color: color`4` })
        setTimeout(() => { clearText(); showHUD() }, 900)
      }
    }
  }
})

// ── BOOT SEQUENCE ──
// Show title screen first
gameState = "dialog"
clearText()
addText("BENEATH THE", { x: 2, y: 3, color: color`2` })
addText("SURFACE", { x: 4, y: 5, color: color`4` })
addText("Hack Club Sprig", { x: 0, y: 7, color: color`1` })
addText("L=Start", { x: 4, y: 10, color: color`2` })

// Set initial map to level 0 for visual
setMap(LEVELS[0].map)
setSolids([P, W, S, T, B, LV])
bgMusic = playTune(ambientTune, Infinity)

// L key starts the game from title
// (already handled by dialog system — first L press advances dialog index)