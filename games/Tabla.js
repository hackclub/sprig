/*
@title: Tabla - Rhythm Game
@author: punit lakhotiya
@tags: [rhythm]
@addedOn: 10-29-2025

A tabla rhythm game with progressive difficulty!
Use the D-pad buttons to match the beats.
w/a/s/d = left D-pad, i/j/k/l = right D-pad
*/

const player = "p"
const note_na = "n"  // Na (tin sound) - Button W
const note_tin = "t" // Tin - Button A
const note_dha = "d" // Dha - Button S
const note_ge = "g"  // Ge - Button D
const hit_zone = "h" // Hit zone indicator
const perfect = "f"  // Perfect hit feedback
const good = "o"     // Good hit feedback
const miss = "m"     // Miss feedback

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ note_na, bitmap`
................
................
.....666666.....
....66666666....
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
....66666666....
.....666666.....
................
................
................` ],
  [ note_tin, bitmap`
................
................
.....333333.....
....33333333....
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
....33333333....
.....333333.....
................
................
................` ],
  [ note_dha, bitmap`
................
................
.....444444.....
....44444444....
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
....44444444....
.....444444.....
................
................
................` ],
  [ note_ge, bitmap`
................
................
.....555555.....
....55555555....
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
....55555555....
.....555555.....
................
................
................` ],
  [ hit_zone, bitmap`
................
2222222222222222
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2222222222222222
................` ],
  [ perfect, bitmap`
................
................
.....444444.....
....44444444....
...4444HH4444...
...444HHHH444...
...44HHHHHH44...
...44HHHHHH44...
...44HHHHHH44...
...444HHHH444...
...4444HH4444...
....44444444....
.....444444.....
................
................
................` ],
  [ good, bitmap`
................
................
.....777777.....
....77777777....
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
....77777777....
.....777777.....
................
................
................` ],
  [ miss, bitmap`
................
................
.....333333.....
....33333333....
...3333333333...
...33333333333..
...3333333333...
...3333333333...
...3333333333...
...33333333333..
...3333333333...
....33333333....
.....333333.....
................
................
................` ]
)

setSolids([])

// Tabla sounds - matching real tabla bols
const sound_na = tune`
16000`

const sound_tin = tune`
93.75: G5^93.75 + B5^93.75,
93.75: G5^93.75,
2718.75`

const sound_dha = tune`
93.75: C4^93.75 + E4^93.75 + G4^93.75,
93.75: C4^93.75 + E4^93.75,
93.75: C4^93.75,
2625`

const sound_ge = tune`
93.75: A4^93.75 + C5^93.75,
93.75: A4^93.75,
2718.75`

// Game state
let score = 0
let combo = 0
let maxCombo = 0
let gameStarted = false
let tickCount = 0
let noteSpeed = 3 // Frames between note movements (starts easy)
let spawnCounter = 0

// Difficulty progression - changes every 30 seconds (300 ticks at 100ms)
let difficulty = "EASY"
let difficultyTimer = 0
const EASY_DURATION = 300  // 30 seconds
const MEDIUM_DURATION = 300 // 30 seconds

// Easy pattern - simple, spaced out
const easyPattern = [
  { type: note_dha, delay: 20 },
  { type: note_tin, delay: 20 },
  { type: note_dha, delay: 20 },
  { type: note_tin, delay: 20 },
  { type: note_na, delay: 20 },
  { type: note_ge, delay: 20 },
]

// Medium pattern - faster, more varied
const mediumPattern = [
  { type: note_dha, delay: 15 },
  { type: note_dha, delay: 15 },
  { type: note_tin, delay: 10 },
  { type: note_na, delay: 15 },
  { type: note_ge, delay: 10 },
  { type: note_tin, delay: 15 },
  { type: note_dha, delay: 10 },
]

// Hard pattern - fast combinations
const hardPattern = [
  { type: note_dha, delay: 10 },
  { type: note_tin, delay: 10 },
  { type: note_dha, delay: 8 },
  { type: note_tin, delay: 8 },
  { type: note_na, delay: 10 },
  { type: note_ge, delay: 8 },
  { type: note_dha, delay: 10 },
  { type: note_tin, delay: 8 },
  { type: note_na, delay: 10 },
]

let currentPattern = easyPattern
let patternIndex = 0
let spawnDelay = 0

let level = 0
const levels = [
  map`
....
....
....
....
....
....
....
....
....
....
....
....
....
....
hhhh
pppp`
]

setMap(levels[level])

// Place hit zones
addSprite(0, 14, hit_zone)
addSprite(1, 14, hit_zone)
addSprite(2, 14, hit_zone)
addSprite(3, 14, hit_zone)

function startGame() {
  gameStarted = true
  score = 0
  combo = 0
  maxCombo = 0
  tickCount = 0
  difficultyTimer = 0
  difficulty = "EASY"
  noteSpeed = 3
  currentPattern = easyPattern
  patternIndex = 0
  spawnDelay = 0
  clearText()
  updateDisplay()
}

function updateDifficulty() {
  difficultyTimer++
  
  if (difficultyTimer === EASY_DURATION && difficulty === "EASY") {
    difficulty = "MEDIUM"
    noteSpeed = 2
    currentPattern = mediumPattern
    patternIndex = 0
    playTune(sound_dha) // Signal difficulty change
  } else if (difficultyTimer === EASY_DURATION + MEDIUM_DURATION && difficulty === "MEDIUM") {
    difficulty = "HARD"
    noteSpeed = 1
    currentPattern = hardPattern
    patternIndex = 0
    playTune(sound_dha) // Signal difficulty change
  }
}

function spawnNote() {
  if (spawnDelay > 0) {
    spawnDelay--
    return
  }
  
  const note = currentPattern[patternIndex]
  const lane = getLaneForNote(note.type)
  addSprite(lane, 0, note.type)
  
  spawnDelay = note.delay
  patternIndex = (patternIndex + 1) % currentPattern.length
}

function getLaneForNote(noteType) {
  if (noteType === note_na) return 0  // W button
  if (noteType === note_tin) return 1 // A button
  if (noteType === note_dha) return 2 // S button
  if (noteType === note_ge) return 3  // D button
  return 0
}

function moveNotes() {
  const noteTypes = [note_na, note_tin, note_dha, note_ge]
  
  for (const noteType of noteTypes) {
    const notes = getAll(noteType)
    for (const note of notes) {
      if (note.y < 15) {
        note.y += 1
      } else {
        // Note missed
        note.remove()
        combo = 0
        showFeedback(note.x, "MISS")
      }
    }
  }
}

function checkHit(lane, noteType) {
  const notes = getAll(noteType).filter(n => n.x === lane)
  
  for (const note of notes) {
    const distance = Math.abs(note.y - 14)
    
    if (distance === 0) {
      note.remove()
      score += 100
      combo++
      maxCombo = Math.max(maxCombo, combo)
      showFeedback(lane, "PERFECT")
      return true
    } else if (distance === 1) {
      note.remove()
      score += 50
      combo++
      maxCombo = Math.max(maxCombo, combo)
      showFeedback(lane, "GOOD")
      return true
    }
  }
  
  if (combo > 0) combo--
  return false
}

function showFeedback(lane, type) {
  const feedbackSprite = type === "PERFECT" ? perfect : 
                         type === "GOOD" ? good : miss
  addSprite(lane, 13, feedbackSprite)
  
  setTimeout(() => {
    const feedback = getAll(feedbackSprite).filter(s => s.x === lane && s.y === 13)
    feedback.forEach(s => s.remove())
  }, 200)
}

function updateDisplay() {
  clearText()
  addText(`${score}`, { x: 1, y: 1, color: color`2` })
  addText(`x${combo}`, { x: 1, y: 2, color: color`6` })
  addText(difficulty, { x: 12, y: 1, color: color`3` })
}

// Button mappings for Sprig console
onInput("w", () => {
  if (!gameStarted) return
  const hit = checkHit(0, note_na)
  if (hit) playTune(sound_na)
})

onInput("a", () => {
  if (!gameStarted) return
  const hit = checkHit(1, note_tin)
  if (hit) playTune(sound_tin)
})

onInput("s", () => {
  if (!gameStarted) return
  const hit = checkHit(2, note_dha)
  if (hit) playTune(sound_dha)
})

onInput("d", () => {
  if (!gameStarted) return
  const hit = checkHit(3, note_ge)
  if (hit) playTune(sound_ge)
})

onInput("j", () => {
  if (!gameStarted) {
    startGame()
  }
})

// Game loop
setInterval(() => {
  if (!gameStarted) return
  
  if (tickCount % noteSpeed === 0) {
    moveNotes()
  }
  
  spawnNote()
  updateDifficulty()
  updateDisplay()
  tickCount++
}, 100)

// Initial message
addText("TABLA", { x: 7, y: 5, color: color`3` })
addText("Rhythm Game", { x: 4, y: 7, color: color`2` })
addText("W-Na A-Tin", { x: 4, y: 10, color: color`6` })
addText("S-Dha D-Ge", { x: 4, y: 11, color: color`4` })
addText("Press J", { x: 6, y: 13, color: color`7` })
addText("to Start!", { x: 5, y: 14, color: color`7` })