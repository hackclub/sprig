/*
@title: Alien Blast
@author: Aloys
@description: A simple space shooter where you kill aliens before they reach you
@tags: [alien, shooter, arcade]
@addedOn: 2025-08-25
*/

/*
Instructions:
Use "A" and "D" to move your ship left and right
Use "W" to shoot bullets
Destroy the aliens before they reach the bottom
The game ends if an alien touches your row
*/

/*
Menu Instructions:
Use "W" and "S" to navigate
Use "J" to select / confirm
Press "K" to go back to the main menu
*/

// === Sprite ids ===
const PLAYER = "p"
const ALIEN = "a"
const BULLET = "b"

// skin ids (3 variants total: default + 2 color variants)
const SKIN_DEFAULT = "p" // keep original 'p' as default
const SKIN_RED = "r"
const SKIN_GREEN = "g"
const SKINS = [SKIN_DEFAULT, SKIN_RED, SKIN_GREEN]
const SKIN_NAMES = ["Default", "Red", "Green"]

// map ids (3 variants)
const MAP_M = "m"
const MAP_N = "n"
const MAP_O = "o"
const MAPS = [MAP_M, MAP_N, MAP_O]
const MAP_NAMES = ["Classic", "Stars", "Purple"]

// state variables
let score = 0
let gameStarted = false
let gameOver = false

// menu state
let mainMenuSelection = 0           // 0: Play, 1: Skins, 2: Maps
let inSkinMenu = false
let inMapMenu = false
let skinMenuSelection = 0
let mapMenuSelection = 0
let selectedSkinIndex = 0          // index in SKINS
let selectedMapIndex = 0           // index in MAPS
let activePlayerType = SKIN_DEFAULT

// === Legend (sprites + simple map tile bitmaps) ===
setLegend(
  [ PLAYER, bitmap`
......77........
.....7777.......
....777777......
....777777......
.....7777.......
......77........
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
  [ SKIN_RED, bitmap`
......33........
.....3333.......
....333333......
....333333......
.....3333.......
......33........
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
  [ SKIN_GREEN, bitmap`
......44........
.....4444.......
....444444......
....444444......
.....4444.......
......44........
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
  [ ALIEN, bitmap`
...55555555.....
..5555555555....
..5555..5555....
..5555555555....
...55555555.....
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
  [ BULLET, bitmap`
......33........
......33........
......33........
......33........
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
  // simple tile bitmaps for 3 map variants (used as map fill characters)
  [ MAP_M, bitmap`
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
  [ MAP_N, bitmap`
2222222222222222
................
2222222222222222
................
2222222222222222
................
2222222222222222
................
2222222222222222
................
2222222222222222
................
2222222222222222
................
2222222222222222
................` ],
  [ MAP_O, bitmap`
................
1111111111111111
................
1111111111111111
................
1111111111111111
................
1111111111111111
................
1111111111111111
................
1111111111111111
................
1111111111111111
................
1111111111111111` ]
)

// === Game maps for each background (10x9) ===
const GAME_MAP_M = map`
mmmmmmmmmm
mmmmmmmmmm
mmmmmmmmmm
mmmmmmmmmm
mmmmmmmmmm
mmmmmmmmmm
mmmmmmmmmm
mmmmmmmmmm
.mmmmmmmmm`
const GAME_MAP_N = map`
nnnnnnnnnn
nnnnnnnnnn
nnnnnnnnnn
nnnnnnnnnn
nnnnnnnnnn
nnnnnnnnnn
nnnnnnnnnn
nnnnnnnnnn
nnnnnnnnnn`
const GAME_MAP_O = map`
oooooooooo
oooooooooo
oooooooooo
oooooooooo
oooooooooo
oooooooooo
oooooooooo
oooooooooo
oooooooooo`

// initial menu map (empty, placeholder p on last row)
const MENU_MAP = map`
..........
..........
..........
..........
..........
..........
..........
..........
p.........`

// ensure solids include all possible player types
setSolids([ SKIN_DEFAULT, SKIN_RED, SKIN_GREEN ])
setPushables({ [SKIN_DEFAULT]: [], [SKIN_RED]: [], [SKIN_GREEN]: [] })

// === Utility: clear all game entities (aliens, bullets, player sprites) ===
function clearEntities() {
  getAll(ALIEN).forEach(s => s.remove())
  getAll(BULLET).forEach(s => s.remove())
  // remove any remaining player-type sprites (p/r/g)
  getAll(SKIN_DEFAULT).forEach(s => s.remove())
  getAll(SKIN_RED).forEach(s => s.remove())
  getAll(SKIN_GREEN).forEach(s => s.remove())
}

// === Menu rendering ===
function showMainMenu() {
  clearText()
  setMap(MENU_MAP)
  addText("ALIEN BLAST", { x: 4, y: 2, color: color`3` })
  addText(mainMenuSelection === 0 ? "> Play" : "  Play", { x: 4, y: 6, color: color`3` })
  addText(mainMenuSelection === 1 ? "> Skins" : "  Skins", { x: 4, y: 8, color: color`3` })
  addText(mainMenuSelection === 2 ? "> Maps" : "  Maps", { x: 4, y: 10, color: color`3` })

  // show currently selected skin/map
  addText(`Skin: ${SKIN_NAMES[selectedSkinIndex]}`, { x: 1, y: 12, color: color`3` })
  addText(`Map: ${MAP_NAMES[selectedMapIndex]}`, { x: 1, y: 13, color: color`3` })

  // help texts
  addText("W/S move", { x: 1, y: 14, color: color`0` })
  addText("J select", { x: 1, y: 15, color: color`0` })
}
function showSkinsMenu() {
  clearText()
  setMap(MENU_MAP)
  addText("SELECT SKIN", { x: 3, y: 2, color: color`3` })
  addText(skinMenuSelection === 0 ? "> " + SKIN_NAMES[0] : "  " + SKIN_NAMES[0], { x: 4, y: 6, color: color`3` })
  addText(skinMenuSelection === 1 ? "> " + SKIN_NAMES[1] : "  " + SKIN_NAMES[1], { x: 4, y: 8, color: color`3` })
  addText(skinMenuSelection === 2 ? "> " + SKIN_NAMES[2] : "  " + SKIN_NAMES[2], { x: 4, y: 10, color: color`3` })
  addText("J confirm", { x: 1, y: 14, color: color`0` })
  addText("K back", { x: 1, y: 15, color: color`0` })
}
function showMapsMenu() {
  clearText()
  setMap(MENU_MAP)
  addText("SELECT MAP", { x: 3, y: 2, color: color`3` })
  addText(mapMenuSelection === 0 ? "> " + MAP_NAMES[0] : "  " + MAP_NAMES[0], { x: 4, y: 6, color: color`3` })
  addText(mapMenuSelection === 1 ? "> " + MAP_NAMES[1] : "  " + MAP_NAMES[1], { x: 4, y: 8, color: color`3` })
  addText(mapMenuSelection === 2 ? "> " + MAP_NAMES[2] : "  " + MAP_NAMES[2], { x: 4, y: 10, color: color`3` })
  addText("J confirm", { x: 1, y: 14, color: color`0` })
  addText("K back", { x: 1, y: 15, color: color`0` })
}

// show initial menu
showMainMenu()

// === Input handling (single handler per logical key, branch by state) ===
onInput("w", () => {
  // menu navigation if inside menu
  if (!gameStarted || inSkinMenu || inMapMenu || !gameStarted && !gameOver) {
    if (inSkinMenu) {
      skinMenuSelection = (skinMenuSelection + SKINS.length - 1) % SKINS.length
      showSkinsMenu()
      return
    }
    if (inMapMenu) {
      mapMenuSelection = (mapMenuSelection + MAPS.length - 1) % MAPS.length
      showMapsMenu()
      return
    }
    // main menu navigation
    if (!gameStarted && !gameOver) {
      mainMenuSelection = (mainMenuSelection + 2) % 3
      showMainMenu()
      return
    }
  }

  // in-game: W = shoot
  if (gameStarted && !gameOver) {
    let ship = getFirst(activePlayerType)
    if (ship) addSprite(ship.x, ship.y - 1, BULLET)
  }
})

onInput("s", () => {
  // menu navigation if inside menu
  if (!gameStarted || inSkinMenu || inMapMenu || !gameStarted && !gameOver) {
    if (inSkinMenu) {
      skinMenuSelection = (skinMenuSelection + 1) % SKINS.length
      showSkinsMenu()
      return
    }
    if (inMapMenu) {
      mapMenuSelection = (mapMenuSelection + 1) % MAPS.length
      showMapsMenu()
      return
    }
    // main menu navigation
    if (!gameStarted && !gameOver) {
      mainMenuSelection = (mainMenuSelection + 1) % 3
      showMainMenu()
      return
    }
  }

  // in-game: S does nothing (kept for consistency)
})

onInput("j", () => {
  // If game over: J restarts immediately
  if (gameOver) {
    startGame()
    return
  }

  // If inside skins menu: confirm selection and return to main menu
  if (!gameStarted && inSkinMenu) {
    selectedSkinIndex = skinMenuSelection
    inSkinMenu = false
    showMainMenu()
    return
  }

  // If inside maps menu: confirm selection and return to main menu
  if (!gameStarted && inMapMenu) {
    selectedMapIndex = mapMenuSelection
    inMapMenu = false
    showMainMenu()
    return
  }

  // If in main menu: act on selection
  if (!gameStarted && !inSkinMenu && !inMapMenu) {
    if (mainMenuSelection === 0) {
      startGame()
      return
    }
    if (mainMenuSelection === 1) {
      inSkinMenu = true
      skinMenuSelection = selectedSkinIndex
      showSkinsMenu()
      return
    }
    if (mainMenuSelection === 2) {
      inMapMenu = true
      mapMenuSelection = selectedMapIndex
      showMapsMenu()
      return
    }
  }
})

onInput("k", () => {
  // From game over -> return to menu
  if (gameOver) {
    gameStarted = false
    gameOver = false
    clearEntities()
    showMainMenu()
    return
  }

  // In a submenu -> back to main menu
  if (inSkinMenu || inMapMenu) {
    inSkinMenu = false
    inMapMenu = false
    showMainMenu()
    return
  }

  // If in main menu do nothing, if during game do nothing
})

// Movement keys (game only)
onInput("a", () => {
  if (!gameStarted || gameOver) return
  let ship = getFirst(activePlayerType)
  if (ship && ship.x > 0) ship.x -= 1
})
onInput("d", () => {
  if (!gameStarted || gameOver) return
  let ship = getFirst(activePlayerType)
  if (ship && ship.x < width() - 1) ship.x += 1
})

// === Game start / end logic ===
function startGame() {
  // apply chosen map
  clearEntities()
  gameStarted = true
  gameOver = false
  score = 0

  if (selectedMapIndex === 0) setMap(GAME_MAP_M)
  else if (selectedMapIndex === 1) setMap(GAME_MAP_N)
  else setMap(GAME_MAP_O)

  // ensure player exists at map 'p' position and set its type to chosen skin
  let ship = getFirst(PLAYER) // map contains 'p' as placeholder
  if (ship) {
    ship.type = SKINS[selectedSkinIndex]
    activePlayerType = SKINS[selectedSkinIndex]
  } else {
    // fallback: place player manually at bottom-left
    addSprite(0, height() - 1, SKINS[selectedSkinIndex])
    activePlayerType = SKINS[selectedSkinIndex]
  }

  // clear any text overlays
  clearText()
}

function gameOverScreen() {
  gameOver = true
  gameStarted = false
  addText("GAME OVER", { x: 4, y: 4, color: color`4` }) // red
  addText("J to restart", { x: 3, y: 6, color: color`0` })
  addText("K to menu", { x: 3, y: 7, color: color`0` })
}

// === Gameplay loops (timers) ===

// bullets move up
setInterval(() => {
  if (!gameStarted || gameOver) return
  getAll(BULLET).forEach(b => {
    b.y -= 1
    if (b.y < 0) b.remove()
  })
}, 150)

// spawn aliens
setInterval(() => {
  if (!gameStarted || gameOver) return
  const x = Math.floor(Math.random() * width())
  addSprite(x, 0, ALIEN)
}, 700)

// move aliens down
setInterval(() => {
  if (!gameStarted || gameOver) return
  getAll(ALIEN).forEach(a => {
    a.y += 1
    if (a.y >= height() - 1) {
      // an alien reached player's row -> game over
      gameOverScreen()
    }
  })
}, 500)

// collision detection (bullets vs aliens)
afterInput(() => {
  if (!gameStarted || gameOver) return
  const bullets = getAll(BULLET)
  const aliens = getAll(ALIEN)
  for (let b of bullets) {
    for (let a of aliens) {
      if (b.x === a.x && b.y === a.y) {
        b.remove()
        a.remove()
        score += 1
      }
    }
  }
})

// score HUD
setInterval(() => {
  if (!gameStarted || gameOver) return
  clearText()
  addText(`Score: ${score}`, { x: 4, y: 0, color: color`2` })
}, 100)
