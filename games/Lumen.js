/*
@title: Lumen
@description: Lumen is a light bending puzzle game. An emitter fires a beam of
light across the grid. Push mirrors to redirect the beam around walls and light.
up every target gem.
@author: Abdullah Metahen
@tags: ['puzzle']
@addedOn: 2026-11-07

*/

//

const player = "p"
const wall = "w"
const mirrorSlash = "m"   // "/" reflects: right->up, up->right, down->left, left->down
const mirrorBack = "n"    // "\" reflects: right->down, down->right, up->left, left->up
const emitterR = "e"      // emitter that fires the beam to the RIGHT
const emitterD = "q"      // emitter that fires the beam DOWN
const target = "t"        // dim gem - light it up
const spark = "h"         // the same gem, lit
const beam = "b"          // a dot of light
const floorTile = "f"     // background tile (never placed in maps)


setLegend(
  [ player, bitmap`
................
.....000000.....
....02222220....
....02022020....
....02222220....
.....022220.....
......0000......
....00222200....
...0222222220...
...0222222220...
...0L222222L0...
....0L2222L0....
.....022220.....
.....0L00L0.....
....0L0..0L0....
....00....00....` ],
  [ spark, bitmap`
0000000000000000
0000000000000000
0000000220000000
0000002662000000
0000026666200000
0000266666620000
0000266226620000
0000266666620000
0000026666200000
0000002662000000
0000000220000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ target, bitmap`
0000000000000000
0000000000000000
0000000LL0000000
000000LHHL000000
00000LHHHHL00000
0000LHHHHHHL0000
0000LHH2HHHL0000
0000LHHHHHHL0000
00000LHHHHL00000
000000LHHL000000
0000000LL0000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ emitterR, bitmap`
0000000000000000
0000000000000000
0LLLLLLLLLLL0000
0L111111111L0000
0L111111111L0000
0L111111111L0000
0L111111111L0660
0L11111111100660
0L11111111100660
0L111111111L0660
0L111111111L0000
0L111111111L0000
0LLLLLLLLLLL0000
0000000000000000
0000000000000000
0000000000000000` ],
  [ emitterD, bitmap`
0000000000000000
0LLLLLLLLLLL0000
0L111111111L0000
0L111111111L0000
0L111111111L0000
0L111111111L0000
0L111111111L0000
0L111111111L0000
0L111111111L0000
0L111111111L0000
0LLLL00LLLLL0000
0000006600000000
0000006600000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ beam, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000200000000
0000002620000000
0000266662000000
0000002620000000
0000000200000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ mirrorSlash, bitmap`
LLLLLLLLLLLLLLLL
L00000000000000L
L00000000000220L
L00000000002200L
L00000000022000L
L00000000220000L
L00000002200000L
L00000022000000L
L00000220000000L
L00002200000000L
L00022000000000L
L00220000000000L
L02200000000000L
L22000000000000L
L00000000000000L
LLLLLLLLLLLLLLLL` ],
  [ mirrorBack, bitmap`
LLLLLLLLLLLLLLLL
L00000000000000L
L02200000000000L
L00220000000000L
L00022000000000L
L00002200000000L
L00000220000000L
L00000022000000L
L00000002200000L
L00000000220000L
L00000000022000L
L00000000002200L
L00000000000220L
L00000000000022L
L00000000000000L
LLLLLLLLLLLLLLLL` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L0000000L0000000
L0000000L0000000
L0000000L0000000
L0000000L0000000
LLLLLLLLLLLLLLLL
0000000L0000000L
0000000L0000000L
0000000L0000000L
0000000L0000000L
LLLLLLLLLLLLLLLL
L0000000L0000000
L0000000L0000000
L0000000L0000000
L0000000L0000000
LLLLLLLLLLLLLLLL` ],
  [ floorTile, bitmap`
L000000000000000
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
0000000000000000` ]
)

setBackground(floorTile)

setSolids([ player, wall, mirrorSlash, mirrorBack, emitterR, emitterD ])
setPushables({ [player]: [ mirrorSlash, mirrorBack ] })

// ============================ LEVELS ============================
// Legend: w wall · p player · m "/" mirror · n "\" mirror
//         e emitter -> · q emitter v · t target

const levels = [
  map`
wwwwwwwwww
we.......w
w........w
w........w
w...n..p.w
w........w
w...t....w
wwwwwwwwww`,
  map`
wwwwwwwwww
w....t...w
w........w
we.......w
w........w
w..p.m..nw
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
we.......w
w........w
w....p...w
w.t......w
w..n...m.w
w........w
wwwwwwwwww`,
  map`
wwwwwwwqww
w........w
w.p..n...w
w........w
we...w..tw
w..tn....w
w........w
wwwwwwwwww`,
  map`
wwwwwwqwww
w........w
w..p...t.w
w.t......w
w.m......w
we..m...ww
w........w
wwwwwwwwww`,
  map`
wwwwwwwqww
w..p.....w
w.t......w
w...t....w
w.....n..w
w......m.w
we.m.....w
wwwwwwwwww`,
  map`
wwwwwwwwww
we.......w
w.p......w
w..n.....w
w.t......w
w....m...w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwqw
we.......w
w.p...n..w
w........w
w....t...w
w..m....ww
w...t....w
wwwwwwwwww`,
  map`
wwwwqwwwww
w.....p..w
w.t...n..w
w........w
w.n.....tw
w......m.w
we....w..w
wwwwwwwwww`,
  map`
wwwqwwwwww
we.......w
w......m.w
w...n.t..w
w.t....p.w
w.n.....tw
w........w
wwwwwwwwww`,
]

const levelNames = [
  "FIRST LIGHT",
  "UPWARD",
  "ZIGZAG",
  "TWIN SPARKS",
  "CROSSFIRE",
  "THE GAUNTLET",
  "ROUND TRIP",
  "SPLIT END",
  "OVER AND UNDER",
  "GRAND FINALE",
]

let current = 0
let transitioning = false

// ============================ SOUND ============================
// Every level gets its own theme. The music swaps when the level loads.

const levelTunes = [
  // 1 · FIRST LIGHT — warm, simple, sunrise major
  tune`
150: C4~150 + E4~150,
150: G4~150,
150: A4~150,
150: G4~150,
150: F4~150 + A4~150,
150: C5~150,
150: G4~150,
150: E4~150,`,
  // 2 · UPWARD — a melody that keeps climbing
  tune`
150: A3~150,
150: C4~150,
150: E4~150,
150: A4~150,
150: G4~150 + C5~150,
150: E4~150,
150: C4~150,
300: D4~300,`,
  // 3 · ZIGZAG — bouncy, darting triangle wave
  tune`
120: C4^120,
120: G4^120,
120: E4^120,
120: G4^120,
120: D4^120,
120: A4^120,
120: F4^120,
120: A4^120,
120: E4^120 + C5^120,
120: G4^120,
120: C4^120,
240: G4^240,`,
  // 4 · TWIN SPARKS — two voices in step
  tune`
160: C4~160 + G4^160,
160: D4~160 + A4^160,
160: E4~160 + B4^160,
160: F4~160 + C5^160,
160: E4~160 + B4^160,
320: G4~320 + D5^320,`,
  // 5 · CROSSFIRE — tense minor, two lines crossing
  tune`
140: A3~140 + E4^140,
140: B3~140 + E4^140,
140: C4~140 + F4^140,
140: B3~140 + E4^140,
140: A3~140 + E4^140,
140: G#3~140 + D4^140,
280: A3~280 + E4^280,`,
  // 6 · THE GAUNTLET — driving, urgent square bass
  tune`
110: D3-110 + D4-110,
110: D3-110,
110: A3-110 + A4-110,
110: D3-110,
110: F3-110 + F4-110,
110: F3-110,
110: C4-110 + C5-110,
110: A3-110,`,
  // 7 · ROUND TRIP — a phrase that comes back around
  tune`
140: C4~140 + E4^140,
140: G4~140,
140: E4~140 + G4^140,
140: C5~140,
140: D4~140 + F4^140,
140: A4~140,
140: F4~140 + A4^140,
280: G4~280,`,
  // 8 · SPLIT END — hesitant, with silences that leave you guessing
  tune`
160: E4~160,
160,
160: G4~160 + B4^160,
160,
160: D4~160,
160: F4~160 + A4^160,
320,
160: E4~160 + G#4^160,`,
  // 9 · OVER AND UNDER — high notes and low notes taking turns
  tune`
130: C5~130,
130: G3~130,
130: E5~130,
130: A3~130,
130: G4~130 + C4^130,
130: C5~130,
130: A3~130,
260: E5~260,`,
  // 10 · GRAND FINALE — full chords, one last climb
  tune`
170: C4~170 + E4~170 + G4^170,
170: F4~170 + A4~170 + C5^170,
170: G4~170 + B4~170 + D5^170,
340: C5~340 + E5~340 + G5^340,
170: A4~170 + C5~170 + F5^170,
170: G4~170 + B4~170 + D5^170,
340: C5~340 + E5~340 + G5^340,
340: E5~340 + G5~340 + C6^340,`,
]

let music = null

const sfxWin = tune`
150: C5~150,
150: E5~150,
150: G5~150,
400: C6~400,`

const sfxFinal = tune`
200: C5~200 + E5~200 + G5~200,
200: F5~200 + A5~200,
200: G5~200 + B5~200,
600: C6~600 + E6~600 + G6~600,`

// ============================ BEAM ENGINE ============================
// The heart of the game. Wipes the old beam, then simulates the light:
// it starts one tile in front of each emitter, travels in straight
// lines, reflects on mirrors, passes through targets, and stops at
// walls, other emitters, or the edge of the map.

const fireBeam = () => {
  // wipe the previous shot and dim the gems
  getAll(beam).forEach(s => s.remove())
  getAll(spark).forEach(s => { s.type = target })

  const total = getAll(target).length
  const lit = new Set()

  // gather every emitter and the direction it fires
  const emitters = []
  getAll(emitterR).forEach(s => emitters.push({ x: s.x, y: s.y, dx: 1, dy: 0 }))
  getAll(emitterD).forEach(s => emitters.push({ x: s.x, y: s.y, dx: 0, dy: 1 }))

  emitters.forEach(em => {
    let x = em.x + em.dx
    let y = em.y + em.dy
    let dx = em.dx
    let dy = em.dy
    let steps = 0

    while (steps < 300) {   // step cap = infinite-mirror-proof
      steps++

      // left the map? done.
      if (x < 0 || y < 0 || x >= width() || y >= height()) break

      const tile = getTile(x, y)
      const types = tile.map(s => s.type)

      // walls and other emitters absorb the beam
      if (types.includes(wall) || types.includes(emitterR) || types.includes(emitterD)) break

      // reflect! "/" turns (dx,dy) into (-dy,-dx), "\" into (dy,dx)
      if (types.includes(mirrorSlash)) {
        const oldDx = dx
        dx = -dy
        dy = -oldDx
      } else if (types.includes(mirrorBack)) {
        const oldDx = dx
        dx = dy
        dy = oldDx
      }

      addSprite(x, y, beam)

      // the beam shines straight through gems, lighting them on the way
      if (types.includes(target)) {
        lit.add(x + "," + y)
        tile.forEach(s => { if (s.type === target) s.type = spark })
      }

      x += dx
      y += dy
    }
  })

  return total > 0 && lit.size >= total
}

// ============================ GAME FLOW ============================

const loadLevel = (n) => {
  current = n
  clearText()
  setMap(levels[n])

  // swap in this level's theme
  if (music) music.end()
  music = playTune(levelTunes[n], Infinity)

  const name = levelNames[n]
  addText("LEVEL " + (n + 1), { x: 7, y: 0, color: color`1` })
  addText(name, { x: Math.floor((20 - name.length) / 2), y: 1, color: color`7` })
  if (n === 0) addText("WASD MOVE   L RESET", { x: 0, y: 14, color: color`6` })

  fireBeam()
}

onInput("w", () => { getFirst(player).y -= 1 })
onInput("s", () => { getFirst(player).y += 1 })
onInput("a", () => { getFirst(player).x -= 1 })
onInput("d", () => { getFirst(player).x += 1 })
onInput("l", () => { if (!transitioning) loadLevel(current) })

afterInput(() => {
  if (transitioning) return
  if (!fireBeam()) return

  // every gem is lit - level clear!
  transitioning = true
  addText("LEVEL CLEAR!", { x: 4, y: 6, color: color`4` })

  if (current === levels.length - 1) {
    playTune(sfxFinal)
    addText("YOU WIN!", { x: 6, y: 9, color: color`6` })
    setTimeout(() => { transitioning = false; loadLevel(0) }, 3000)
  } else {
    playTune(sfxWin)
    setTimeout(() => { transitioning = false; loadLevel(current + 1) }, 1600)
  }
})



// ============================ START ============================

loadLevel(0)
