/*
@title: The Floor Is Emotionally Unstable
@description: The floor has feelings. Navigate its mood swings to reach the exit!
@author: NellowTCS
@tags: ['puzzle', 'maze', 'movement', 'randomness', 'multi-level']
@addedOn: 2026-04-25
*/

const player = "p"
const wall = "w"
const calm = "c"
const angry = "a"
const hole = "h"
const hyper = "y"
const slip = "s"
const scared = "r"
const exit = "e"
const bg = "b"

setLegend(
  [player, bitmap`
................
......555.......
.....57775......
....5755575.....
....5755575.....
....5555555.....
.....57775......
....5555555.....
...55.555.55....
..5...555...5...
..5...555...5...
......555.......
......5.5.......
.....55.55......
................
................`],

  [wall, bitmap`
1111111111111111
1221221221221221
1212121212121212
1221221221221221
1111111111111111
1221221221221221
1212121212121212
1221221221221221
1111111111111111
1221221221221221
1212121212121212
1221221221221221
1111111111111111
1221221221221221
1212121212121212
1111111111111111`],

  [bg, bitmap`
1111111111111111
1221221221221221
1212121212121212
1221221221221221
1111111111111111
1221221221221221
1212121212121211
1221221221221221
1111111111111111
1221221221221221
1212121212121211
1221221221221221
1111111111111111
1221221221221221
1212121212121211
1111111111111111`],

  [calm, bitmap`
................
..444444444444..
.4CCCCCCCCCCCC4.
.4CC444CC444CC4.
.4CC4C4CC4C4CC4.
.4CC44444444CC4.
.4CCCC4CC4CCCC4.
.4CC44444444CC4.
.4CC4C4CC4C4CC4.
.4CC444CC444CC4.
.4CCCCCCCCCCCC4.
..444444444444..
................
................
................
................`],

  [angry, bitmap`
3333333333333333
3CCCCCCCCCCCCCC3
3C33CCCCCCC33CC3
3C3C3CCCCC3C3CC3
3C333CCCCC333CC3
3CCCCCCCCCCCCCC3
3CCC33CCC33CCCC3
3CC3CC3C3CC3CCC3
3CCC33CCC33CCCC3
3CCCCCCCCCCCCCC3
3C33333333333CC3
3CCCCCCCCCCCCCC3
3C33333333333CC3
3CCCCCCCCCCCCCC3
3333333333333333
................`],

  [hole, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0LL0000000000LL0
0LL0111111110LL0
0LL0100000010LL0
0LL0100220010LL0
0LL0100000010LL0
0LL0111111110LL0
0LL0000000000LL0
0LLLLLLLLLLLLLL0
0000000000000000
................
................
................
................
................`],

  [hyper, bitmap`
................
..222222222222..
.23333333333332.
.23322222222332.
.23326222262332.
.23322222222332.
.23332266233332.
.23322222222332.
.23326222262332.
.23322222222332.
.23333333333332.
..222222222222..
................
................
................
................`],

  [slip, bitmap`
................
..111111111111..
.1LLLLLLLLLLLL1.
.1LL11111111LL1.
.1LL1LL1LL1LLL1.
.1LL1L111L11LL1.
.1LL1LL1LL1LLL1.
.1LL1L111L11LL1.
.1LL11111111LL1.
.1LL11111111LL1.
.1LLLLLLLLLLLL1.
..111111111111..
................
................
................
................`],

  [scared, bitmap`
................
..888888888888..
.8HHHHHHHHHHHH8.
.8HH888HH888HH8.
.8H8H8H8H8H8H88.
.8HH888888888H8.
.8HHHH8HH8HHHH8.
.8HH888888888H8.
.8H8H8H8H8H8H88.
.8HH888HH888HH8.
.8HHHHHHHHHHHH8.
..888888888888..
................
................
................
................`],

  [exit, bitmap`
4D4D4D4D4D4D4D4D
D4D4D4D4D4D4D4D4
4DDD4D4D4D4DDD4D
D4DD4D4D4D4DD4D4
4D4D4D4D4D4D4D4D
D4D4D4D4D4D4D4D4
4D444D4D4D444D4D
D4D4D4D4D4D4D4D4
4D4D4D4D4D4D4D4D
D4D4D4D4D4D4D4D4
4DDD4D4D4D4DDD4D
D4DD4D4D4D4DD4D4
4D4D4D4D4D4D4D4D
D4D4D4D4D4D4D4D4
4D444D4D4D444D4D
D4D4D4D4D4D4D4D4`]
)

setBackground(bg)
setSolids([player, wall, angry])

//  GAME STATE 
let gameState = "title"
let currentLevel = 0
let moveCount = 0

const MOODS = [calm, angry, hole, hyper, slip, scared]

//  LEVELS 

// Key: p=player, e=exit, w=wall, c=calm, a=angry, h=hole, y=hyper, s=slip, r=scared, .=empty(bg only)
const levels = [
  // Level 1 - Tutorial: mostly calm, gentle intro
  map`
wwwwwwww
wpccccew
wcccccww
wccwccww
wcccccww
wwwwwwww
........
........`,

  // Level 2 - Meet angry
  map`
wwwwwwww
wpcccwww
wcacccww
wcccawww
wcccceew
wwwwwwww
........
........`,

  // Level 3 - Slip introduced
  map`
wwwwwwww
wpcccwww
wcssccww
wcccccww
wwcccwww
wwccceww
wwwwwwww
........`,

  // Level 4 - Hyper introduced
  map`
wwwwwwww
wpcyyeww
wccccwww
wcyccwww
wcccawww
wwwwwwww
........
........`,

  // Level 5 - Hole introduced
  map`
wwwwwwww
wpcccwww
wcchccww
wccccwww
wcchceww
wwwwwwww
........
........`,

  // Level 6 - Scared introduced
  map`
wwwwwwww
wpcrreww
wcccccww
wcrccwww
wcccrcww
wwwwwwww
........
........`,

  // Level 7 - Mix: slip + angry corridors
  map`
wwwwwwww
wpcccwww
wcsaswww
wcccccww
wwaaseww
wwwwwwww
........
........`,

  // Level 8 - Hyper jumping puzzle
  map`
wwwwwwww
wpcawwww
wcyccwww
wwcawwww
wwcyccww
wwwaccww
wwwwccew
wwwwwwww`,

  // Level 9 - Hole maze
  map`
wwwwwwww
wpcccwww
wchchwww
wcccccww
wchwchww
wcccceww
wwwwwwww
........`,

  // Level 10 - Scared + slip chain
  map`
wwwwwwww
wpcrrwww
wcssccww
wcrcscww
wccsreww
wwwwwwww
........
........`,

  // Level 11 - Angry maze with calms as islands
  map`
wwwwwwww
wpaaawww
wacacaww
waacaaww
wacaaaww
waaaaeww
wwwwwwww
........`,

  // Level 12 - Hyper + hole chaos
  map`
wwwwwwww
wpcywwww
wcyhcwww
wcccywww
wyhcccww
wcccyeww
wwwwwwww
........`,

  // Level 13 - Slip slide across angry
  map`
wwwwwwww
wpcccwww
wcssswww
waaaaaww
wcssscww
wwwcceww
wwwwwwww
........`,

  // Level 14 - All moods gauntlet
  map`
wwwwwwww
wpcshwww
wcryccww
wcsahcww
wcchrcww
wcycseww
wwwwwwww
........`,

  // Level 15 - Long corridor, dense mood swings
  map`
wwwwwwww
wpcccccw
wcayhscw
wcrscahw
wcycsrcw
wcccccew
wwwwwwww
........`,

  // Level 16 - Grand finale: tight angry maze, all types
  map`
wwwwwwww
wpaawwww
wcachyww
wahcrcww
wcyscaww
waaacwww
wwwcaeww
wwwwwwww`
]

//SCREENS 
const titleMap = map`
........
........
........
........
...p....
........
........
........`

const endMap = map`
........
........
........
........
........
........
........
........`

//HELPERS 

function isMood(type) {
  return MOODS.includes(type)
}

function getMoodAt(x, y) {
  return getTile(x, y).find(s => isMood(s.type))
}

function randomMood() {
  return MOODS[Math.floor(Math.random() * MOODS.length)]
}

function changeMoodAt(x, y) {
  const tile = getTile(x, y)
  const hasMood = tile.find(s => isMood(s.type))
  if (!hasMood) return

  // preserve non-mood sprites (player, exit, wall)
  const keep = tile.filter(s => !isMood(s.type)).map(s => s.type)
  clearTile(x, y)
  addSprite(x, y, randomMood())
  keep.forEach(t => addSprite(x, y, t))
}

function loadLevel(n) {
  setMap(levels[n])
  clearText()
  addText(`LVL ${n + 1}/${levels.length}`, { x: 3, y: 0, color: color`0` })
  addText(`moves:${moveCount}`, { x: 3, y: 15, color: color`0` })
}

function showTitle() {
  gameState = "title"
  currentLevel = 0
  moveCount = 0
  setMap(titleMap)
  clearText()
  addText("THE FLOOR IS", { x: 3, y: 1, color: color`3` })
  addText("EMOTIONALLY", { x: 3, y: 3, color: color`5` })
  addText("UNSTABLE", { x: 3, y: 5, color: color`H` })
  addText("WASD to move", { x: 3, y: 10, color: color`0` })
  addText("reach the", { x: 3, y: 11, color: color`C` })
  addText("checkered exit!", { x: 3, y: 12, color: color`C` })
  addText("press I to play", { x: 3, y: 14, color: color`0` })
}

function showEnding() {
  gameState = "ending"
  setMap(endMap)
  clearText()
  addText("YOU SURVIVED", { x: 3, y: 1, color: color`D` })
  addText("THE FLOOR'S", { x: 4, y: 3, color: color`3` })
  addText("BREAKDOWN!", { x: 4, y: 5, color: color`5` })
  addText(`in ${moveCount} moves`, { x: 3, y: 7, color: color`C` })
  addText("press I", { x: 5, y: 14, color: color`0` })
}

//MOVEMENT 

function movePlayer(dx, dy) {
  if (gameState !== "playing") return

  const p = getFirst(player)
  if (!p) return

  const tx = p.x + dx
  const ty = p.y + dy

  // bounds check
  if (tx < 0 || tx >= width() || ty < 0 || ty >= height()) return

  // check target mood BEFORE changing it
  const targetMood = getMoodAt(tx, ty)

  // mood changes on contact
  if (targetMood) changeMoodAt(tx, ty)

  // read the new mood after the change
  const newMood = getMoodAt(tx, ty)
  const newType = newMood ? newMood.type : null

  // wall: always blocked (handled by setSolids)
  // angry: blocked
  if (newType === angry) return

  // hole: reset level
  if (newType === hole) {
    loadLevel(currentLevel)
    return
  }

  // hyper: move 2 tiles
  if (newType === hyper) {
    const hx = tx + dx
    const hy = ty + dy
    if (hx >= 0 && hx < width() && hy >= 0 && hy < height()) {
      const beyond = getMoodAt(hx, hy)
      if (!beyond || beyond.type !== angry) {
        p.x = hx
        p.y = hy
        moveCount++
        checkWin()
        return
      }
    }
    // if beyond is blocked, just move to hyper tile
    p.x = tx
    p.y = ty
    moveCount++
    checkWin()
    return
  }

  // slip: slide until hitting a wall/angry/edge
  if (newType === slip) {
    p.x = tx
    p.y = ty
    let sliding = true
    while (sliding) {
      const nx = p.x + dx
      const ny = p.y + dy
      if (nx < 0 || nx >= width() || ny < 0 || ny >= height()) break
      const next = getMoodAt(nx, ny)
      const nextType = next ? next.type : null
      if (nextType === angry) break
      // check for wall sprite
      const wallHere = getTile(nx, ny).find(s => s.type === wall)
      if (wallHere) break
      p.x = nx
      p.y = ny
      if (nextType === hole) {
        loadLevel(currentLevel)
        return
      }
    }
    moveCount++
    checkWin()
    return
  }

  // scared / calm / no mood: normal move
  p.x = tx
  p.y = ty
  moveCount++
  checkWin()
}

//  WIN CHECK 

function checkWin() {
  const p = getFirst(player)
  if (!p) return

  const onExit = getTile(p.x, p.y).some(s => s.type === exit)
  if (!onExit) {
    // update move counter display
    clearText()
    addText(`LVL ${currentLevel + 1}/${levels.length}`, { x: 3, y: 0, color: color`0` })
    addText(`moves:${moveCount}`, { x: 3, y: 15, color: color`0` })
    return
  }

  if (currentLevel === levels.length - 1) {
    showEnding()
  } else {
    currentLevel++
    loadLevel(currentLevel)
  }
}

//  MOOD SWINGS (after every input) 

let tick = 0

afterInput(() => {
  if (gameState !== "playing") return
  tick++

  // every 2 inputs, randomly mutate ~40% of mood tiles
  if (tick % 2 === 0) {
    const allMoodTiles = MOODS.flatMap(type => tilesWith(type))
    allMoodTiles.forEach(tile => {
      if (Math.random() < 0.4) {
        changeMoodAt(tile.x, tile.y)
      }
    })
  }
})

//  INPUTS 

onInput("i", () => {
  if (gameState === "title") {
    gameState = "playing"
    loadLevel(currentLevel)
  } else if (gameState === "ending") {
    showTitle()
  }
})

onInput("w", () => movePlayer(0, -1))
onInput("s", () => movePlayer(0, 1))
onInput("a", () => movePlayer(-1, 0))
onInput("d", () => movePlayer(1, 0))

//INIT 
showTitle()
