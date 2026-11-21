/*
@title: SoulRun
@description: A man trapped in his memories.
@author: Hlieb
@tags: ['story', 'exploration', 'puzzle']
@addedOn: 2026-11-21
*/

/*
SOULRUN

CONTROLS:
WASD = Physical body
IJKL = Leave the body and move as a ghost

The old man cannot go further than 3 steps from where he
woke up. If he tries, he changes his mind and walks back.
Only after all five memories are found can he move freely.

The physical body cannot pass through walls or furniture.
The ghost can pass through everything.

The ghost returns to the body automatically when it
reaches the body's position.

Find all five memories (sparkles on the furniture) as a ghost,
return to the body, and choose.

A = Forget
D = Accept

Forgetting results in the bad ending.
Accepting starts the farewell: walk through the maze with
your real body and touch each sparkling object one last time.
Then the exit opens.
*/

// ==========================================
// 1. SPRITE KEYS
// ==========================================

const player = "p"
const playerA = "a"
const playerD = "d"
const playerW = "u"
const playerS = "v"

const ghost = "g"

const wall = "W"
const background = "B"

const bed = "b"
const desk = "t"
const shelf = "h"
const mirror = "m"
const photo = "f"
const box = "x"
const sparkle = "c"
const door = "e"

// Speech bubble pieces (white box with a black outline).
const bTL = "i"
const bT = "j"
const bTR = "k"
const bL = "l"
const bF = "n"
const bR = "o"
const bBL = "q"
const bB = "r"
const bBR = "s"

const BLACK = color`0`

// ==========================================
// 2. SPRITES
// ==========================================

setLegend(

  // ---------- speech bubble ----------

  [bTL, bitmap`
..00000000000000
.022222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222`],

  [bT, bitmap`
0000000000000000
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],

  [bTR, bitmap`
00000000000000..
222222222222220.
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220`],

  [bL, bitmap`
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222`],

  [bF, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],

  [bR, bitmap`
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220`],

  [bBL, bitmap`
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
.022222222222222
..00000000000000`],

  [bB, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
0000000000000000`],

  [bBR, bitmap`
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
222222222222220.
00000000000000..`],

  // ---------- characters ----------

  [ghost, bitmap`
.....LLLLLL.....
...LL222222LL...
..L2222222222L..
.L222222222222L.
.L222222222222L.
.L2222L22L2222L.
.L2222L22L2222L.
.L2222L22L2222L.
.L222222222222L.
.L222222222222L.
.L122222222222L.
..L12L2222L12L..
..L11L1222L11L..
...LLL1111LLL...
......LLLL......
................`],

  [player, bitmap`
................
....00000000....
...0222222220...
..022222222220..
.01222222222210.
.01122222222110.
0211222222221120
0211200220021120
.00222222222200.
.00577777777500.
0577777777777750
0577777777777750
0550777777770550
.00077777777000.
..0FCCC00CCCF0..
..000000000000..`],

  [playerA, bitmap`
................
....00000000....
...0222222210...
..02222222110...
..02222211110...
..02222111110...
..02222110110...
..02002102010...
..0222222200....
...02222200.....
....0000000.....
.....050750.....
.....070570.....
......00000.....
.....0FCC0......
.....00000......`],

  [playerD, bitmap`
................
...00000000.....
..0122222220....
..01122222220...
..01111222220...
..01111122220...
..01101122220...
..01020120020...
...0022222220...
....00222220....
.....000000.....
....057050......
....075070......
....00000.......
.....0CCF0......
.....00000......`],

  [playerW, bitmap`
................
....00000000....
...0222222220...
..022222222220..
.01222222222210.
.01122222222110.
0211122222211120
0211111111111120
.00111111111100.
.00577777777500.
0577777777777750
0577777777777750
0550777777770550
.00077777777000.
..0FCCC00CCCF0..
..000000000000..`],

  [playerS, bitmap`
................
....00000000....
...0222222220...
..022222222220..
.01222222222210.
.01122222222110.
0211222222221120
0211200220021120
.00222222222200.
.00577777777500.
0577777777777750
0577777777777750
0550777777770550
.00077777777000.
..0FCCC00CCCF0..
..000000000000..`],

  [sparkle, bitmap`
................
.......5........
......555.......
.......5........
....5..5..5.....
.....55555......
.......5........
......555.......
.......5........
................
................
................
................
................
................
................`],

  // ---------- room ----------

  [wall, bitmap`
0000000000000000
CCCCCCC0CCCCCCC0
CCCCCCC0CCCCCCC0
CCCCCCC0CCCCCCC0
0000000000000000
CCC0CCCCCCC0CCCC
CCC0CCCCCCC0CCCC
CCC0CCCCCCC0CCCC
0000000000000000
CCCCCCC0CCCCCCC0
CCCCCCC0CCCCCCC0
CCCCCCC0CCCCCCC0
0000000000000000
CCC0CCCCCCC0CCCC
CCC0CCCCCCC0CCCC
CCC0CCCCCCC0CCCC`],

  [background, bitmap`
FFFFFFFFFFFFFFCF
FCFDFFFFFDFFFFFF
6FFFFFFFFFFFFFDF
FFF4FFFCFF46FFFF
FFFCFDFFFFFFFCFF
FDFFFFFFFFFFDFFF
FFFFFFFFFF6FFF4F
FFFF6FFF6FFFFFFF
FDFF4FFDFFCFFFFF
FFFFFFFCFFC4FFFD
4FFFFFFFFFFFFFFF
FFFFFF6FFDFFFFFF
F66FFFFFFFFFFF6F
CFFF4FFFFFFFFFCF
FDF6CFFFDFF6FF4C
FFFFFFFFFFFFFFFF`],

  // ---------- furniture ----------

 
  [bed, bitmap`
..000000000000..
.0CCCCCCCCCCCC0.
.0C9999999999C0.
.0CCCCCCCCCCCC0.
.0C2222112222C0.
.0C2222112222C0.
.0C1111111111C0.
.0C2222222222C0.
.0C5555555555C0.
.0C5757575757C0.
.0C5555555555C0.
.0C7575757575C0.
.0C5555555555C0.
.0CCCCCCCCCCCC0.
..000000000000..
................`],

  [desk, bitmap`
................
...000..........
..06660.........
.0666660..00000.
....L.....03330.
...LLL....00000.
0000000000000000
0999999999999990
0CCCCCCCCCCCCCC0
0000000000000000
.0C0...0CCCCCC0.
.0C0...0CC99CC0.
.0C0...00000000.
.0C0...0CCCCCC0.
.0C0...0CC99CC0.
.000...00000000.`],

  [shelf, bitmap`
.00000000000000.
.0CCCCCCCCCCCC0.
.0CL3L55L77L2C0.
.0C3355667722C0.
.0C3355667722C0.
.0C9999999999C0.
.0C66L7L2L33LC0.
.0C6677225533C0.
.0C6677225533C0.
.0C6677225533C0.
.0C9999999999C0.
.0CLL5L33L6LLC0.
.0C7755336622C0.
.0C7755336622C0.
.0CCCCCCCCCCCC0.
.00000000000000.`],

  [mirror, bitmap`
....00000000....
...0CCCCCCCC0...
..0C99999999C0..
..0C11111221C0..
..0C11112211C0..
..0C11122111C0..
..0C11221111C0..
..0C11111111C0..
..0C11111111C0..
..0C11111111C0..
..0C11111111C0..
..0C11111111C0..
..0CCCCCCCCCC0..
...0000000000...
....0C....C0....
...000....000...`],

  [photo, bitmap`
................
.00000000000000.
.0C9999999999C0.
.0C7777777777C0.
.0C7FF7777FF7C0.
.0C7FF7777FF7C0.
.0C3333776666C0.
.0C3333FF6666C0.
.0C3333556666C0.
.0C3333556666C0.
.0C7LL7LL7LL7C0.
.0C7LL7LL7LL7C0.
.0CFFFFFFFFFFC0.
.0CCCCCCCCCCCC0.
.00000000000000.
................`],

  [box, bitmap`
................
..000000000000..
.09L99999999L90.
.0CLCCCCCCCCLC0.
.0CLCCCCCCCCLC0.
.00000000000000.
.0CLCCCCCCCCLC0.
.0CLCCC66CCCLC0.
.0CLCCC60CCCLC0.
.0CLCCCCCCCCLC0.
.0CLCCCCCCCCLC0.
.0CCCCCCCCCCCC0.
.00000000000000.
................
................
................`],

  [door, bitmap`
.66666666666666.
.67777777777776.
.67777777777776.
.67777777777776.
.67777777777776.
.67777777777776.
.67777777777776.
.67777777777776.
.67777777777776.
.67777777777776.
.67777777777776.
.67777777777776.
.67777777777776.
.66666666666666.
................
................`]
)

setSolids([])

// ==========================================
// 3. BEDROOM MAP
// ==========================================

setBackground(background)

const DOOR_X = 8
const DOOR_Y = 0

const bedroom = map`
WWWWWWWWeWWWWWWW
W..............W
W.WWWWWW.....W.W
W.W..........W.W
W.W.WW.W.WWW.W.W
W...W..W...W...W
W...WWWW.W.W...W
W.W......W.....W
W.W.WWW...WWWW.W
W.W............W
W..............W
WWWWWWWWWWWWWWWW`

setMap(bedroom)

// ==========================================
// 4. FURNITURE
// ==========================================

addSprite(3, 3, bed)
addSprite(6, 4, desk)
addSprite(12, 4, shelf)
addSprite(12, 2, mirror)
addSprite(2, 6, photo)
addSprite(13, 6, box)

const obstacles = [wall, bed, desk, shelf, mirror, photo, box, door]

// ==========================================
// 5. SETTINGS AND GAME STATE
// ==========================================

const SPAWN_X = 8        // where the old man wakes up
const SPAWN_Y = 9
const LEASH = 3          // max distance (in steps) from the spawn point
const WALK_MS = 700      // time per step when he walks back

const TILE = 10          
const MAP_OFFSET_Y = 4   

let bodyX = SPAWN_X
let bodyY = SPAWN_Y
let bodyFrame = player

let spiritX = SPAWN_X
let spiritY = SPAWN_Y

let mode = "body"        // "body" | "spirit" | "lost"
let allFound = false     // all five memories collected
let decisionReady = false
let accepted = false     // farewell phase started
let doorOpen = false     // all farewells done
let finished = false
let returning = false    // the old man is walking back to the spawn

let msgLines = null      // text currently shown in the speech bubble
let msgSticky = false    // clear the message on the next move

// ==========================================
// 6. MEMORIES 
// ==========================================

// found = discovered by the ghost
// seen  = revisited with the real body during the farewell

const memories = [
  {
    x: 12, y: 2, found: false, seen: false,   // mirror
    title: "THE WINDOW",
    lines: [
      "You remember this",
      "window.",
      "Every evening, you",
      "waited for someone",
      "to come home."
    ]
  },
  {
    x: 6, y: 4, found: false, seen: false,    // desk
    title: "THE LETTER",
    lines: [
      "A letter you never",
      "managed to finish.",
      "There were so many",
      "things you wanted",
      "to say."
    ]
  },
  {
    x: 2, y: 6, found: false, seen: false,    // photo
    title: "THE PHOTOGRAPH",
    lines: [
      "A photograph of",
      "your family.",
      "You were all happy.",
      "You promised you'd",
      "always remember."
    ]
  },
  {
    x: 3, y: 3, found: false, seen: false,    // bed
    title: "THE LAST DAY",
    lines: [
      "The day everything",
      "changed.",
      "You couldn't stop",
      "it. But it was",
      "never your fault."
    ]
  },
  {
    x: 13, y: 6, found: false, seen: false,   // box
    title: "THE MEMORY BOX",
    lines: [
      "Inside are the",
      "things you kept.",
      "They remind you of",
      "where you came from.",
      "And who you were."
    ]
  }
]

function countFound() {
  return memories.filter(m => m.found).length
}

function countSeen() {
  return memories.filter(m => m.seen).length
}

// ==========================================
// 7. SPEECH BUBBLES
// ==========================================

const bubbleTypes = [bTL, bT, bTR, bL, bF, bR, bBL, bB, bBR]

function drawBubble(lines, top) {
  const n = lines.length

  let maxLen = 1
  lines.forEach(l => {
    maxLen = Math.max(maxLen, Math.min(l.length, 20))
  })

  const startCol = Math.floor((20 - maxLen) / 2)
  const pad = 4

  const x0 = startCol * 8 - pad
  const x1 = (startCol + maxLen) * 8 + pad
  const y0 = top * 8 - pad - MAP_OFFSET_Y
  const y1 = (top + n) * 8 + pad - MAP_OFFSET_Y

  let tx0 = Math.max(0, Math.floor(x0 / TILE))
  let tx1 = Math.min(width() - 1, Math.floor((x1 - 1) / TILE))
  let ty0 = Math.max(0, Math.floor(y0 / TILE))
  let ty1 = Math.min(height() - 1, Math.floor((y1 - 1) / TILE))

  if (tx1 <= tx0) tx1 = tx0 + 1
  if (ty1 <= ty0) ty1 = ty0 + 1

  for (let ty = ty0; ty <= ty1; ty++) {
    for (let tx = tx0; tx <= tx1; tx++) {
      const isTop = ty === ty0
      const isBottom = ty === ty1
      const isLeft = tx === tx0
      const isRight = tx === tx1

      let piece
      if (isTop) piece = isLeft ? bTL : (isRight ? bTR : bT)
      else if (isBottom) piece = isLeft ? bBL : (isRight ? bBR : bB)
      else piece = isLeft ? bL : (isRight ? bR : bF)

      addSprite(tx, ty, piece)
    }
  }

  lines.forEach((line, i) => {
    if (line.length === 0) return
    const s = line.slice(0, 20)
    addText(s, {
      x: Math.floor((20 - s.length) / 2),
      y: top + i,
      color: BLACK
    })
  })
}

function hudText() {
  if (finished || mode === "lost") return null
  if (!accepted) {
    const n = countFound()
    return n > 0 ? "MEMORIES " + n + "/5" : null
  }
  if (!doorOpen) return "FAREWELL " + countSeen() + "/5"
  return null
}

function drawOverlay() {
  clearText()

  if (msgLines) {
    const top = Math.max(0, Math.floor((14 - msgLines.length) / 2))
    drawBubble(msgLines, top)
  }

  const hud = hudText()
  if (hud) drawBubble([hud], 14)
}

function showMsg(lines, sticky) {
  msgLines = lines
  msgSticky = sticky
}

function dismissMessage() {
  if (msgSticky) {
    msgLines = null
    msgSticky = false
  }
}

// ==========================================
// 8. RENDERING
// ==========================================


const dynamicTypes = [
  player, playerA, playerD, playerW, playerS, ghost, sparkle
].concat(bubbleTypes)

function render() {
  dynamicTypes.forEach(t => {
    getAll(t).forEach(s => s.remove())
  })

  memories.forEach(m => {
    const visible = accepted ? !m.seen : !m.found
    if (visible) addSprite(m.x, m.y, sparkle)
  })


  addSprite(bodyX, bodyY, bodyFrame)


  if (mode === "spirit") {
    addSprite(spiritX, spiritY, ghost)
  }

  drawOverlay()
}

// ==========================================
// 9. WALKING BACK (the old man changes his mind)
// ==========================================

function isBlocked(x, y) {
  if (x < 0 || x >= width() || y < 0 || y >= height()) return true
  return getTile(x, y).some(s => obstacles.includes(s.type))
}

function frameFor(dx, dy) {
  if (dx < 0) return playerA
  if (dx > 0) return playerD
  if (dy < 0) return playerW
  return playerS
}

// Breadth-first search: shortest walkable path to the spawn point.
function findPath(sx, sy, tx, ty) {
  const keyOf = (x, y) => x + "," + y
  const prev = {}
  prev[keyOf(sx, sy)] = null

  const queue = [[sx, sy]]
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]

  while (queue.length > 0) {
    const cur = queue.shift()
    if (cur[0] === tx && cur[1] === ty) break

    for (let i = 0; i < dirs.length; i++) {
      const nx = cur[0] + dirs[i][0]
      const ny = cur[1] + dirs[i][1]
      const k = keyOf(nx, ny)
      if (prev[k] !== undefined || isBlocked(nx, ny)) continue
      prev[k] = cur
      queue.push([nx, ny])
    }
  }

  const path = []
  if (prev[keyOf(tx, ty)] === undefined) return path

  let node = [tx, ty]
  while (prev[keyOf(node[0], node[1])] !== null) {
    const p = prev[keyOf(node[0], node[1])]
    path.unshift({ x: node[0], y: node[1], dx: node[0] - p[0], dy: node[1] - p[1] })
    node = p
  }
  return path
}

function leashDistance() {
  return Math.abs(bodyX - SPAWN_X) + Math.abs(bodyY - SPAWN_Y)
}

function startReturn() {
  returning = true
  showMsg(["Nah, I don't want", "to leave."], false)
  render()

  const path = findPath(bodyX, bodyY, SPAWN_X, SPAWN_Y)
  walkBack(path, 0)
}

function walkBack(path, i) {
  setTimeout(() => {
    if (i < path.length) {
      const step = path[i]
      bodyX = step.x
      bodyY = step.y
      bodyFrame = frameFor(step.dx, step.dy)
    }

    if (i >= path.length - 1) {
      // Arrived at the spawn point.
      bodyX = SPAWN_X
      bodyY = SPAWN_Y
      bodyFrame = player
      returning = false
      msgLines = null
      msgSticky = false
      render()
      return
    }

    render()
    walkBack(path, i + 1)
  }, WALK_MS)
}

// ==========================================
// 10. BODY MOVEMENT (WASD)
// ==========================================

function moveBody(dx, dy, frame) {
  if (mode !== "body" || finished || decisionReady || returning) return

  dismissMessage()

  bodyFrame = frame

  const nextX = bodyX + dx
  const nextY = bodyY + dy

  if (nextX >= 0 && nextX < width() && nextY >= 0 && nextY < height()) {

    // Farewell: touching a sparkling object revisits the memory.
    if (accepted && !doorOpen) {
      const memory = memories.find(m => !m.seen && m.x === nextX && m.y === nextY)
      if (memory) {
        visitFarewell(memory)
        render()
        return
      }
    }

    if (!isBlocked(nextX, nextY)) {
      bodyX = nextX
      bodyY = nextY
    }
  }

  // Leaving through the open door.
  if (doorOpen && bodyX === DOOR_X && bodyY === DOOR_Y) {
    finished = true
    showMsg([
      "SOUL RUN",
      "",
      "THE DOOR IS OPEN.",
      "You are finally free",
      "",
      "THE END"
    ], false)
    render()
    return
  }

  render()

  // Too far from home: he changes his mind and walks back.
  if (!allFound && !accepted && leashDistance() > LEASH) {
    startReturn()
  }
}

onInput("w", () => moveBody(0, -1, playerW))
onInput("s", () => moveBody(0, 1, playerS))

onInput("a", () => {
  if (decisionReady && mode === "body") {
    forgetEnding()
    return
  }
  moveBody(-1, 0, playerA)
})

onInput("d", () => {
  if (decisionReady && mode === "body") {
    acceptEnding()
    return
  }
  moveBody(1, 0, playerD)
})

// ==========================================
// 11. GHOST MOVEMENT (IJKL)
// ==========================================

function moveSpirit(dx, dy) {
  if (finished || decisionReady || accepted || returning || mode === "lost") return

  // First IJKL press: the ghost leaves the body.
  if (mode === "body") {
    mode = "spirit"
    spiritX = bodyX
    spiritY = bodyY
  }

  dismissMessage()

  const nextX = spiritX + dx
  const nextY = spiritY + dy

  // Stay inside the screen; otherwise do nothing.
  if (nextX < 0 || nextX >= width() || nextY < 0 || nextY >= height()) {
    render()
    return
  }

  spiritX = nextX
  spiritY = nextY

  // Reached the body: return to it.
  if (spiritX === bodyX && spiritY === bodyY) {
    returnToBody()
    return
  }

  // Reached a memory.
  const memory = memories.find(m => !m.found && m.x === spiritX && m.y === spiritY)
  if (memory) {
    discoverMemory(memory)
  }

  render()
}

onInput("i", () => moveSpirit(0, -1))
onInput("k", () => moveSpirit(0, 1))
onInput("j", () => moveSpirit(-1, 0))
onInput("l", () => moveSpirit(1, 0))

// ==========================================
// 12. RETURN TO BODY
// ==========================================

function returnToBody() {
  mode = "body"
  bodyFrame = player

  if (allFound) {
    decisionReady = true
    showMsg([
      "YOU REMEMBER.",
      "",
      "Everything returns.",
      "The door is waiting.",
      "",
      "A: FORGET",
      "D: ACCEPT"
    ], false)
  } else {
    showMsg(["You are back."], true)
  }

  render()
}

// ==========================================
// 13. MEMORY DISCOVERY (ghost)
// ==========================================

function discoverMemory(memory) {
  memory.found = true

  let lines = [memory.title, ""].concat(memory.lines)

  if (countFound() === 5) {
    allFound = true
    lines = lines.concat(["", "All found!", "Return to your body"])
  }

  showMsg(lines, true)
}

// ==========================================
// 14. FAREWELL (real body)
// ==========================================

function visitFarewell(memory) {
  memory.seen = true

  let lines = [memory.title, ""].concat(memory.lines).concat(["", "Goodbye."])

  if (countSeen() === 5) {
    // Last farewell: the exit opens.
    doorOpen = true
    getAll(door).forEach(d => d.remove())
    lines = lines.concat(["The door opens."])
  }

  showMsg(lines, true)
}

// ==========================================
// 15. FORGETTING ENDING
// ==========================================

function forgetEnding() {
  if (!decisionReady || finished) return

  finished = true
  decisionReady = false
  mode = "lost"

  showMsg([
    "YOU CHOSE",
    "TO FORGET.",
    "",
    "But memories remain.",
    "",
    "YOU CANNOT ESCAPE."
  ], false)
  render()
}

// ==========================================
// 16. ACCEPTANCE (starts the farewell)
// ==========================================

function acceptEnding() {
  if (!decisionReady || finished) return

  decisionReady = false
  accepted = true

  showMsg([
    "YOU ACCEPTED.",
    "The past is yours.",
    "See them one last",
    "time. Touch each",
    "sparkle, then leave."
  ], true)
  render()
}

// ==========================================
// 17. START
// ==========================================
showMsg([
  "I'm an old man.",
  "I want to leave this place,",
  "but something is",
  "keeping me here."
], true)

render()
