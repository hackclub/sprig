/*
@title: Trick-or-Treat Run
@author: Andrew
@description: A full game: go house to house on 3 streets, collect 20 candies, avoid the ghost. Move with WASD. Press J to restart.
@tags: []
@addedOn: 2026-11-08
*/

// ============================================================
// TRICK-OR-TREAT RUN — the FULL game, all 6 weeks in one file
// ============================================================
// How the schedule's weeks map to this code:
//   Week 2 (movement) ....... the onInput blocks near the bottom
//   Week 3 (maps + walls) ... the 3 street maps + setSolids
//   Week 4 (scoring + win) .. score, timer, lives, win / lose
//   Week 5 (opponent) ....... the ghost who chases you (and floats
//                             through houses — he IS a ghost)
//   Week 6 (polish + sound) . title screen, tunes, win screen
//
// HOW TO PLAY:  WASD moves. Collect every candy on a street to
// move to the next street. 20 candies total wins the game.
// The ghost gets faster on each street. 3 lives. J restarts.
//
// ANDREW'S OWN CHARACTER is in this version — the stick-figure
// kid Andrew drew himself on Nov 8, 2026 (brown eyes = C,
// red smile = 3, black = 0, from Sprig's real colour palette).
//
// ANDREW'S JOB: this is a working first draft, not the finished
// game. Make it yours — redraw every sprite in the pixel editor
// (click a bitmap), change the streets, change the tunes in the
// tune editor (click a tune). Then it's your game to publish.
// ============================================================

const player = "p"
const candy = "c"
const house = "h"
const fence = "f"
const tree = "t"
const ghost = "g"
const background = "b"

// ---------- Sprites (click any bitmap to redraw it) ----------
setLegend(
  [player, bitmap`
................
................
.....000000.....
....0.C..C.0....
....0......0....
....0.3333.0....
.....000000.....
.......0........
......000.......
.....0.0.0......
....0..0..0.0...
...0...0...000..
......0.0..000..
.....0...0.000..
.....0...0......
.....0...0......`],
  [candy, bitmap`
................
................
................
................
................
.....333333.....
..6.33366333.6..
..663363363366..
..6.33366333.6..
.....333333.....
................
................
................
................
................
................`],
  [house, bitmap`
................
.......00.......
......0330......
.....033330.....
....03333330....
...0333333330...
..000000000000..
..088888888880..
..085888888580..
..088888888880..
..088800008880..
..088800008880..
..088800008880..
..088888888880..
..000000000000..
................`],
  [fence, bitmap`
................
................
.8.8..8.8..8.8..
.8.8..8.8..8.8..
.88888888888888.
.8.8..8.8..8.8..
.8.8..8.8..8.8..
.88888888888888.
.8.8..8.8..8.8..
.8.8..8.8..8.8..
................
................
................
................
................
................`],
  [tree, bitmap`
................
......6666......
.....666666.....
....66666666....
....66666666....
....66666666....
.....666666.....
......6666......
.......88.......
.......88.......
.......88.......
.......88.......
................
................
................
................`],
  [ghost, bitmap`
................
.....222222.....
....22222222....
...2222222222...
...2202222022...
...2222222222...
...2222222222...
...2222222222...
...2222222222...
...2222222222...
...2222222222...
...22.22.22.....
....2..22..2....
................
................
................`],
  [background, bitmap`
1111111111111111
1111111111111111
1111211111111111
1111111111111111
1111111111121111
1111111111111111
1111111211111111
1111111111111111
1111111111111111
1112111111111111
1111111111111111
1111111111211111
1111111111111111
1111121111111111
1111111111111111
1111111111111111`]
)
setBackground(background)

// ---------- Sounds (click any tune to change it) ----------
const popTune = tune`
120: e6/120,
120: g6/120`
const streetTune = tune`
150: c5/150,
150: e5/150,
150: g5/150,
150: c6/150`
const winTune = tune`
180: c5/180,
180: e5/180,
180: g5/180,
180: c6/360`
const loseTune = tune`
200: g4/200,
200: e4/200,
200: c4/400`

function sound(t) {
  // If a tune ever has a typo, the game keeps going silently
  // instead of crashing. Andrew can fix tunes in the tune editor.
  try { playTune(t) } catch (e) {}
}

// ---------- The 3 streets (Week 3: walls you cannot walk through) ----------
// Candy count: Street 1 = 6, Street 2 = 7, Street 3 = 7  →  20 total
const levels = [
  map`
hhhhhhhhhh
h..c.h...h
hp...h.c.h
h..ff....h
h.c...t..h
h...c.t.ch
h.....c..h
ffffffffff`,
  map`
hhhhhhhhhh
hc..t..c.h
h..pthh..h
h.f.....ch
h.f.c.t.ch
h...t.t..h
hc.....cgh
ffffffffff`,
  map`
hhhhhhhhhh
hc.h..c..h
h..h.tt.ph
h.c....f.h
htt.c..f.h
h...t.c..h
hg.c....ch
ffffffffff`
]

// Houses, fences and trees are solid. The ghost is NOT solid —
// ghosts float through things. Candy is not solid — you walk
// onto it to collect it.
setSolids([player, house, fence, tree])

// ---------- Game state (Week 4) ----------
let level = 0
let score = 0
let scoreAtStreetStart = 0
let lives = 3
let seconds = 0
let ghostTick = 0
let screen = "title" // "title" | "play" | "win" | "lose"

// How often the ghost moves, per street (in player steps).
// Street 1 has no ghost. Street 2: every 3 steps. Street 3: every 2.
const ghostSpeed = [999, 3, 2]

// ---------- Text screens ----------
function drawText() {
  clearText()
  if (screen === "title") {
    addText("TRICK-OR-TREAT RUN", { y: 5, color: color`3` })
    addText("Collect 20 candies!", { y: 7 })
    addText("Avoid the ghost!", { y: 8 })
    addText("W=up A=left S=down D=right", { y: 10 })
    addText("Press a key to start", { y: 11 })
  } else if (screen === "win") {
    addText("YOU WIN!", { y: 5, color: color`3` })
    addText("20 candies in the bag!", { y: 7 })
    addText("Time: " + seconds + " seconds", { y: 8 })
    addText("Press J to play again", { y: 10 })
  } else if (screen === "lose") {
    addText("THE GHOST GOT YOU!", { y: 5, color: color`3` })
    addText("Candy: " + score + "/20", { y: 7 })
    addText("Press J to try again", { y: 9 })
  } else {
    addText("Candy " + score + "/20  Lives " + lives, { y: 0, color: color`3` })
    addText("Street " + (level + 1) + "/3  Time " + seconds + "s", { y: 1 })
  }
}

// ---------- Timer (Week 4) ----------
setInterval(() => {
  if (screen === "play") {
    seconds += 1
    drawText()
  }
}, 1000)

// ---------- The ghost (Week 5) ----------
function moveGhost() {
  const g = getFirst(ghost)
  const p = getFirst(player)
  if (!g || !p) return
  const dx = Math.sign(p.x - g.x)
  const dy = Math.sign(p.y - g.y)
  const startX = g.x
  const startY = g.y
  // Move toward Andrew on whichever axis is farther first
  if (Math.abs(p.x - g.x) >= Math.abs(p.y - g.y)) {
    if (dx !== 0) g.x += dx
    if (g.x === startX && g.y === startY && dy !== 0) g.y += dy
  } else {
    if (dy !== 0) g.y += dy
    if (g.x === startX && g.y === startY && dx !== 0) g.x += dx
  }
}

function caughtByGhost() {
  lives -= 1
  sound(loseTune)
  if (lives <= 0) {
    screen = "lose"
    drawText()
    return true
  }
  // Back to the start of this street. Candies on this street
  // come back, and your score goes back to the street's start.
  score = scoreAtStreetStart
  ghostTick = 0
  setMap(levels[level])
  drawText()
  return true
}

function restartGame() {
  level = 0
  score = 0
  scoreAtStreetStart = 0
  lives = 3
  seconds = 0
  ghostTick = 0
  screen = "play"
  setMap(levels[0])
  drawText()
}

// ---------- Movement (Week 2) ----------
onInput("w", () => {
  if (screen === "win" || screen === "lose") return
  const p = getFirst(player)
  if (p) p.y -= 1
})
onInput("s", () => {
  if (screen === "win" || screen === "lose") return
  const p = getFirst(player)
  if (p) p.y += 1
})
onInput("a", () => {
  if (screen === "win" || screen === "lose") return
  const p = getFirst(player)
  if (p) p.x -= 1
})
onInput("d", () => {
  if (screen === "win" || screen === "lose") return
  const p = getFirst(player)
  if (p) p.x += 1
})
onInput("j", () => {
  if (screen === "win" || screen === "lose") {
    restartGame()
  } else if (screen === "play") {
    // Restart just this street, no life lost
    score = scoreAtStreetStart
    ghostTick = 0
    setMap(levels[level])
    drawText()
  }
})

// ---------- After every move: collect, chase, check ----------
afterInput(() => {
  if (screen === "win" || screen === "lose") return
  if (screen === "title") {
    screen = "play"
  }
  const p = getFirst(player)
  if (!p) return

  // Collect any candy Andrew is standing on
  for (const c of getAll(candy)) {
    if (c.x === p.x && c.y === p.y) {
      c.remove()
      score += 1
      sound(popTune)
    }
  }

  // Street finished?
  if (getAll(candy).length === 0) {
    if (level === levels.length - 1) {
      screen = "win"
      sound(winTune)
      drawText()
      return
    }
    level += 1
    scoreAtStreetStart = score
    ghostTick = 0
    setMap(levels[level])
    sound(streetTune)
    drawText()
    return
  }

  // Ghost takes his turn
  ghostTick += 1
  if (getFirst(ghost) && ghostTick >= ghostSpeed[level]) {
    ghostTick = 0
    moveGhost()
  }

  // Did the ghost catch Andrew (or did Andrew walk into the ghost)?
  if (getFirst(ghost) && tilesWith(player, ghost).length > 0) {
    if (caughtByGhost()) return
  }

  drawText()
})

// ---------- Start ----------
setMap(levels[0])
drawText()
