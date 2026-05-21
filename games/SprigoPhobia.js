/*
@title: SprigoPhobia
@author: Lukypuky11cz
@description: Inspired by the horror game Phasmophobia, you go inside a house with equipment, check the rooms for evidences, record the found evindences and indentify what type of ghost you are dealing with.
@tags: ['paranormal', 'ghost']
@addedOn: 2026-02-25
*/

const player = "p"
const doorEnter = "g"
const doorExit = "h"
const idBoard = "c"

const emf = "e"
const spiritBox = "s"
const book = "b"
const thermometer = "t"
const uvLight = "u"
const floor = "f"
const identificationBg = "x"

// "Decoration" sprites
const tree = "r"
const tv = "m"
const couch = "o"
const table = "a"
const bed = "1"
const sink = "2"
const kitchenSink = "3"
const bathtub = "4"

let level = -1 // = tutorial
let previousLevel = 0
let inInventory = false
let inIdentification = false
let equippedItem = null
let selectedEvidences = []
let cursorPosition = 0
let gameFinished = false
const textCols = 20
const textRows = 16

const items = [emf, spiritBox, book, thermometer, uvLight]
let inventory = []

const itemNames = {
  [emf]: "EMF",
  [spiritBox]: "Spirit Box",
  [book]: "Book",
  [thermometer]: "Thermometer",
  [uvLight]: "UV light"
}

const itemEvidenceMap = {
  [emf]: "EMF5",
  [spiritBox]: "SpiritBox",
  [book]: "Writing",
  [thermometer]: "Freezing",
  [uvLight]: "UV"
}

const allEvidences = ["EMF5", "SpiritBox", "Writing", "Freezing", "UV"]

const ghosts = [
  { name: "Spirit", evidences: ["EMF5", "SpiritBox", "Writing"] },
  { name: "Wraith", evidences: ["Freezing", "SpiritBox", "UV"] },
  { name: "Demon", evidences: ["Writing", "Freezing", "UV"] },
  { name: "Phantom", evidences: ["EMF5", "Freezing", "UV"] },
  { name: "Poltergeist", evidences: ["EMF5", "SpiritBox", "UV"] },
  { name: "Banshee", evidences: ["SpiritBox", "Writing", "Freezing"] }
]
let ghost = ghosts[Math.floor(Math.random() * ghosts.length)]
let evidenceRoomByType = {}
console.log("Ghost rolled:", ghost.name)

function rerollGhost() {
  ghost = ghosts[Math.floor(Math.random() * ghosts.length)]
  console.log("Ghost rolled:", ghost.name)
}

function restartGame() {
  level = -1
  previousLevel = 0
  inInventory = false
  inIdentification = false
  equippedItem = null
  selectedEvidences = []
  cursorPosition = 0
  inventory = []
  gameFinished = false
  rerollGhost()
  initializeEvidenceAssignments()
  showTutorial()
}

function loadCurrentLevelMap() {
  setMap(levels[level])
  setBackground(floor)
}

function returnToCurrentLevel(clearUi = true) {
  loadCurrentLevelMap()
  spawnStartingItems()
  if (clearUi) {
    clearText()
    drawVerticalRoomName()
    drawOutsideLabels()
  }
}

function closeInventory(clearUi = true) {
  inInventory = false
  level = previousLevel
  returnToCurrentLevel(clearUi)
}

function movePlayer(dx, dy) {
  if (inIdentification) return
  if (!inInventory) {
    clearText()
    drawVerticalRoomName()
    drawOutsideLabels()
  }
  const playerSprite = getFirst(player)
  playerSprite.x += dx
  playerSprite.y += dy
}

function spawnItemIfNotInInventory(item, x, y) {
  if (level !== 0 || inventory.includes(item)) return
  addSprite(x, y, item)
}

function spawnStartingItems() {
  if (level !== 0) return
  spawnItemIfNotInInventory(emf, 0, 4)
  spawnItemIfNotInInventory(spiritBox, 1, 4)
  spawnItemIfNotInInventory(book, 2, 4)
  spawnItemIfNotInInventory(thermometer, 3, 4)
  spawnItemIfNotInInventory(uvLight, 4, 4)
  
  // Always spawn identification board
  if (getAll(idBoard).length === 0) {
    addSprite(4, 0, idBoard)
  }
}

function spawnInventoryItems() {
  // clear old item sprites from inventory screen (keeps player)
  for (const it of items) {
    for (const s of getAll(it)) s.remove()
  }

  // put items on (0:4 - 0)
  for (let i = 0; i < items.length; i++) {
    const it = items[i]
    if (inventory.includes(it)) addSprite(i, 0, it)
  }
  clearText()
  if (equippedItem) {
    addText(`${itemNames[equippedItem]} equipped`, { x: 0, y: 1, color: color`2` })
  } else {
    addText(`No item equipped`, { x: 0, y: 1, color: color`2` })
  }
  addText(`I to exit`, { x: 0, y: 2, color: color`3` })
}

function showCenteredLevelText(message, tint = color`2`) {
  if (inInventory) return
  clearText()
  const x = Math.max(0, Math.floor((textCols - message.length) / 2))
  const y = Math.floor(textRows / 2)
  addText(message, { x, y, color: tint })
}

function drawVerticalRoomName() {
  if (level < 0 || inInventory || inIdentification) return

  const roomName = rooms[level] || ""
  const maxChars = textRows

  for (let i = 0; i < Math.min(roomName.length, maxChars); i++) {
    addText(roomName[i], { x: 1, y: i, color: color`2` })
  }
}
function drawOutsideLabels() {
  if (level !== 0) return

  addText("<-House", { x: 5, y: 0, color: color`2` })
  addText("Identify->", { x: 5, y: 2, color: color`2` })
  addText("Items:", { x: 2, y: 11, color: color`2` })
}
function initializeEvidenceAssignments() {
  evidenceRoomByType = {}
  const minRoomLevel = 1 // 0 is outside
  const maxRoomLevel = levels.length - 1

  for (const evidence of ghost.evidences) {
    const roomLevel = minRoomLevel + Math.floor(Math.random() * (maxRoomLevel - minRoomLevel + 1))
    evidenceRoomByType[evidence] = roomLevel
  }
  const readableAssignment = {}
  for (const [evidence, roomLevel] of Object.entries(evidenceRoomByType)) {
    readableAssignment[evidence] = rooms[roomLevel]
  }
  console.log("Evidence assignment:", JSON.stringify(readableAssignment))
}

function useEquippedItem() {
  if (inInventory || inIdentification) return

  if (!equippedItem) {
    showCenteredLevelText("No item equipped", color`2`)
    return
  }

  if (level === 0) {
    showCenteredLevelText("No evidence outside", color`2`)
    return
  }

  const evidenceType = itemEvidenceMap[equippedItem]
  const assignedRoom = evidenceRoomByType[evidenceType]

  if (assignedRoom === level) {
    showCenteredLevelText(`${evidenceType} FOUND`, color`4`)
  } else {
    showCenteredLevelText(`No ${evidenceType}`, color`3`)
  }
}

function getPossibleGhosts() {
  if (selectedEvidences.length === 0) return ghosts
  
  return ghosts.filter(g => 
    selectedEvidences.every(ev => g.evidences.includes(ev))
  )
}

function showIdentificationScreen() {
  clearText()
  addText("GHOST IDENTIFICATION", { x: 0, y: 0, color: color`2` })
  addText("Select Evidences:", { x: 0, y: 2, color: color`3` })
  
  // show evidences and the cursor thing
  for (let i = 0; i < allEvidences.length; i++) {
    const ev = allEvidences[i]
    const mark = selectedEvidences.includes(ev) ? "X" : "O"
    const cursor = cursorPosition === i ? ">" : " "
    const yPos = 4 + i
    addText(`${cursor}${mark} ${ev}`, { x: 0, y: yPos, color: color`2` })
  }
  
  // ghost pool
  const possible = getPossibleGhosts()
  addText("Possible Ghosts:", { x: 0, y: 10, color: color`3` })
  
  if (possible.length === 0) {
    addText("None match!", { x: 0, y: 11, color: color`2` })
  } else {
    // 3 ghosts left
    for (let i = 0; i < Math.min(3, possible.length); i++) {
      const cursor = cursorPosition === (5 + i) ? ">" : " "
      addText(`${cursor}${possible[i].name}`, { x: 0, y: 11 + i, color: color`2` })
    }
    //3 ghosts right
    for (let i = 3; i < Math.min(6, possible.length); i++) {
      const cursor = cursorPosition === (5 + i) ? ">" : " "
      addText(`${cursor}${possible[i].name}`, { x: 8, y: 11 + (i - 3), color: color`2` })
    }
  }
  
  addText("WS:Nav J:Pick", { x: 0, y: 14, color: color`4` })
  addText("I:Exit", { x: 0, y: 15, color: color`4` })
}

function enterIdentification() {
  inIdentification = true
  previousLevel = level
  cursorPosition = 0
  setMap(identificationMap)
  setBackground(identificationBg)
  showIdentificationScreen()
}

function exitIdentification() {
  inIdentification = false
  level = previousLevel
  returnToCurrentLevel(true)
}

function toggleEvidence(evidence) {
  if (selectedEvidences.includes(evidence)) {
    selectedEvidences = selectedEvidences.filter(e => e !== evidence)
  } else {
    selectedEvidences.push(evidence)
  }
}

function handleIdentificationInput(key) {
  if (gameFinished) return

  const possible = getPossibleGhosts()
  const maxCursor = 5 + possible.length - 1
  let needsRefresh = false
  
  if (key === "w") {
    cursorPosition = Math.max(0, cursorPosition - 1)
    needsRefresh = true
  } else if (key === "s") {
    cursorPosition = Math.min(maxCursor, cursorPosition + 1)
    needsRefresh = true
  } else if (key === "j" || key === "a" || key === "d") {
    if (cursorPosition < 5) {
      toggleEvidence(allEvidences[cursorPosition])
      needsRefresh = true
    } else if (key === "j" && cursorPosition >= 5 && possible.length > 0) {
      const ghostIndex = cursorPosition - 5
      if (ghostIndex < possible.length) {
        const guessedGhost = possible[ghostIndex]
        clearText()
        if (guessedGhost.name === ghost.name) {
          addText("CORRECT!", { x: 6, y: 7, color: color`4` })
          addText(`It was ${ghost.name}!`, { x: 1, y: 8, color: color`4` })
        } else {
          addText("WRONG!", { x: 7, y: 7, color: color`2` })
          addText(`It was ${ghost.name}`, { x: 3, y: 8, color: color`2` })
          addText(`Not ${guessedGhost.name}`, { x: 3, y: 9, color: color`2` })
        }
        addText("Press I to restart", { x: 2, y: 11, color: color`3` })
        gameFinished = true
        return
      }
    }
  }
  
  if (needsRefresh) showIdentificationScreen()
}

function pickUp(type) {
  const tiles = tilesWith(player, type)
  if (tiles.length === 0) return false

  tiles.forEach(tile => {
    tile.forEach(s => { if (s.type === type) s.remove() })
  })

  if (!inventory.includes(type)) {
    inventory.push(type)
    console.log(`inventory now: ${inventory.map(t => itemNames[t]).join(", ")}`)
  }
  return true
}

function checkPickups() {
  if (inInventory) return
  items.forEach(item => pickUp(item))
}

function equipFromInventoryTile() {
  if (!inInventory) return false

  for (const it of items) {
    if (tilesWith(player, it).length > 0) {
      equippedItem = it
      closeInventory(false)
      showCenteredLevelText(`${itemNames[it]} equipped`)
      console.log(`${itemNames[it]} equipped`)
      return true
    }
  }
  return false
}

setLegend(
  [player, bitmap`
.....3333333....
....33CCCC33....
...33C0CC0C33...
...33CCCCCC33...
...33CCC0CC3300.
.......CC....CC.
......7CC7...CC.
.CC7777777777CC.
.CC7777777777CC.
.CC..777777.....
.00..777777.....
.....777777.....
.....00..00.....
.....00..00.....
.....00..00.....
.....000.000....`],

  [doorEnter, bitmap`
...9999999999...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCC3339...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9999999999...`],

  [doorExit, bitmap`
...9999999999...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCC7779...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9CCCCCCCC9...
...9999999999...`],

  [emf, bitmap`
................
....222222221...
....242426231...
....222222221...
....222222221...
....222222211...
....22222221....
.....2222221....
.....2222221....
.....2222221....
.....2222211....
.....2222212....
......22221.....
......22221.....
......22221.....
......22221.....`],

  [spiritBox, bitmap`
...........L....
...........0....
...........0....
...........0....
....00000000....
....09999970....
....09999990....
....09999990....
....00000000....
....00000000....
....01100110....
....00000000....
....01100110....
....00000000....
....01100110....
....00000000....`],

  [book, bitmap`
.......33.......
66CCCCCCCCCCCC66
6222222CC2222226
C2LLLL2CC2LLLL2C
C222222CC222222C
C2LLLL2CC2LLLL2C
C222222CC222222C
C2LLLL2CC2LLLL2C
C222222CC222222C
C2LLLL2CC2LLLL2C
C222222CC222222C
C2LLLL2CC2LLLL2C
6222222CC2222226
66CCCCCCCCCCCC66
.......33.......
.......99.......`],

  [thermometer, bitmap`
................
....11111111111.
...1155555522511
...1577777522551
...1570007522551
...1577777522511
...155353511111.
....1555551.....
....1222221.....
....1222221.....
....1222221.....
....1222221.....
....1222221.....
.....1555511....
.....1555551....
.....1111111....`],

  [uvLight, bitmap`
...HHHHHHHHHHH..
....HHHHHHHHH...
.....HHHHHHH....
.....0HHHHH0....
.....0HHHHH0....
.....00HHH00....
.....0000000....
......00000.....
......00000.....
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......`],

  [idBoard, bitmap`
0000000000000000
0111111111111110
0122222222222210
0122222222222210
0122229999222210
0122229999222210
0122229999222210
0122229999222210
0122222222222210
0122222222222210
0111111111111110
0000000000000000
....00000000....
....03333330....
....03333330....
....00000000....`],

  [floor, bitmap`
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL`],

  [identificationBg, bitmap`
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

  [tree, bitmap`
......DDDD......
.....D4444D.....
....D444444D....
...D44444444D...
..D4444444444D..
...D44444444D...
....D444444D....
.....D4444D.....
......DCCD......
.......CC.......
.......CC.......
.......CC.......
.......CC.......
......CCCC......
......CCCC......
.....CCCCCC.....`],

  [tv, bitmap`
0000000000000000
0222222222222220
02233322222DDD20
0232223222D222D0
02233322222DDD20
032232222D22D2D0
033333332DDDDDD0
022232232222D220
02232322222D2D20
02332322222D22D0
0232233222D222D0
0000000000000000
.......00.......
.....000000.....
....00000000....
....00000000....`],

  [couch, bitmap`
.....000000.....
....05555550....
...0577777750...
...0570770750...
...0577777750...
...0577777750...
...0577777750...
...0577777750...
...0555555550...
.00000000000000.
0770777777770770
0770777777770770
0550555555550550
0550000000000550
0550555555550550
0550555555550550`],

  [table, bitmap`
....CC..........
....CCCCC.......
...CCCCCCCCCC...
...CCCCCCCCCCCC.
..CCCCCCCCCCCCC.
..CCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.C..CCCCCCCCC.C.
.C..C...CCCCC.C.
.C..C.......C.C.
.C..C.......C.C.
.C..........C...
.C..........C...
.C..........C...
............C...`],

  [bed, bitmap`
CCCCCCCCCCCC....
C222222222CCC...
C222222222C.....
C222222222C.....
CCCCCCCCCCC.....
C333333333C.....
C333333333C.....
C333333333C.....
C333333333C.....
C333333333C.....
C333333333C.....
C333333333C.....
C333333333C.....
C333333333C.....
CCCCCCCCCCC.....
.CC.......CC....`],

  [sink, bitmap`
................
......1111......
.........1......
........315.....
..222222212222..
..255555555552..
..257777777752..
..257777777752..
..255555555552..
..222222222222..
....22222222....
.....222222.....
......2222......
......2222......
.......222......
................`],

  [kitchenSink, bitmap`
......111.......
.....1...1......
....713.........
.....1..........
0000000000000000
0FFFFFF00FFFFFF0
0F6666F00F6666F0
0F6666F00F6666F0
0F0666F00F6660F0
0F0666F00F6660F0
0F6666F00F6666F0
0F6666F00F6666F0
0FFFFFF00FFFFFF0
0000000000000000
0LLLLLLLLLLLLLL0
0000000000000000`],

  [bathtub, bitmap`
...22222222.....
..2222222222....
..2277722222....
.227777722222...
.227777722222...
.227777722222...
.227777722222...
.227777722222...
.227777722222...
.227777722222...
.227777722222...
.211777722222...
.212777222222...
..1232222222....
..1111222222....
...25222222.....`]

  
)

setBackground(floor)
setSolids([tree, tv, couch, table, bed, sink, kitchenSink, bathtub])

const tutorial = map`
..........
..........
..........
..........
..........
..........
..........
..........`

const inventoryMap = map`
.....
..p..`

const identificationMap = map`
..........
..........
..........
..........
..........
..........
..........
..........`

const levels = [
  map`
g...c
.....
....r
..p..
.....`, // outside
  map`
.g.
...
...
.pa
.h.`, // hall
  map`
.o.o.
.....
....g
..p..
.mh..`, // living room
  map`
..a.3
.....
hp..g
.....
.....`, // kitchen
  map`
..g..
a...a
1...1
..p..
..h..`, // bedroom
  map`
..2..
.....
4....
..p..
..h..`, // bathroom
]

const rooms = ["Outside", "Hall", "Living Room", "Kitchen", "Bedroom", "Bathroom"]

initializeEvidenceAssignments()

function showTutorial() {
  setMap(tutorial)
  setBackground(identificationBg)
  clearText()
  addText("Pickup Items", { x: 4, y: 2, color: color`2` })
  addText("Go inside", { x: 5, y: 4, color: color`2` })
  addText("Collect evidences", { x: 2, y: 6, color: color`2` })
  addText("Identify the ghost", { x: 1, y: 8, color: color`2` })
  addText("I for inventory", { x: 2, y: 10, color: color`3` })
  addText("J for Interacting", { x: 1, y: 11, color: color`3` })
  addText("K to continue", { x: 3, y: 13, color: color`4` })
}

showTutorial()

setPushables({
  [player]: []
})

onInput("w", () => {
  if (inIdentification) {
    handleIdentificationInput("w")
    return
  }
  movePlayer(0, -1)
})
onInput("s", () => {
  if (inIdentification) {
    handleIdentificationInput("s")
    return
  }
  movePlayer(0, 1)
})
onInput("a", () => {
  if (inIdentification) {
    handleIdentificationInput("a")
    return
  }
  movePlayer(-1, 0)
})
onInput("d", () => {
  if (inIdentification) {
    handleIdentificationInput("d")
    return
  }
  movePlayer(1, 0)
})

onInput("i", () => {
  if (inIdentification) {
    if (gameFinished) {
      restartGame()
      return
    }
    exitIdentification()
    return
  }
  
  if (!inInventory) {
    previousLevel = level
    inInventory = true
    setMap(inventoryMap)
    setBackground(floor)
    spawnInventoryItems()
    return
  }

  closeInventory(true)
})

onInput("j", () => {
  if (inIdentification) {
    handleIdentificationInput("j")
    return
  }
  useEquippedItem()
})

onInput("k", () => {
  if (level === -1) {
    level = 0
    loadCurrentLevelMap()
    spawnStartingItems()
    clearText()
    drawVerticalRoomName()
    drawOutsideLabels()
  }
})

function changeLevel(newLevel) {
  level = newLevel
  loadCurrentLevelMap()
  console.log(`You just entered: ${rooms[level]}`)
  spawnStartingItems()
  clearText()
  drawVerticalRoomName()
  drawOutsideLabels()
}

afterInput(() => {
  if (equipFromInventoryTile() || inInventory || inIdentification) return
  
  if (level === 0 && tilesWith(player, idBoard).length > 0) {
    enterIdentification()
    return
  }

  checkPickups()

  if (tilesWith(doorEnter, player).length > 0) {
    changeLevel(Math.min(level + 1, levels.length - 1))
    return
  }

  if (tilesWith(doorExit, player).length > 0) {
    changeLevel(Math.max(level - 1, 0))
  }
})
