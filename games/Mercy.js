
// ---------------------------------------------------------------- sprite keys
const player   = "p"
const hunter   = "h"
const wall     = "w"
const soul     = "n"
const freed    = "f"
const exitLock = "e"
const exitOpen = "o"
const bg       = "b"
const proj     = "z"   // boss projectile

setLegend(
  [ player, bitmap`
................
......0000......
.....033330.....
.....033330.....
....03300330....
...0333333330...
...0333333330...
...0333333330...
...0333333330...
...0333333330...
....03333330....
.....033330.....
.....0.00.0.....
.....0.00.0.....
....00.00.00....
................` ],
  [ hunter, bitmap`
................
................
......3333......
....33333333....
...3333333333...
...3393333933...
...3399339933...
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
....33.3333.33..
...33...33...33.
..33.........33.
................` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L1L1L1L1L1L1L1LL
LLLLLLLLLLLLLLLL
1L1L1L1L1L1L1L1L
LLLLLLLLLLLLLLLL
L1L1L1L1L1L1L1LL
LLLLLLLLLLLLLLLL
1L1L1L1L1L1L1L1L
LLLLLLLLLLLLLLLL
L1L1L1L1L1L1L1LL
LLLLLLLLLLLLLLLL
1L1L1L1L1L1L1L1L
LLLLLLLLLLLLLLLL
L1L1L1L1L1L1L1LL
LLLLLLLLLLLLLLLL
1L1L1L1L1L1L1L1L` ],
  [ soul, bitmap`
................
.....666666.....
....66666666....
...6666666666...
...6699669966...
...6666666666...
...6666666666...
...6660000666...
...6666006666...
...6666666666...
....66666666....
.....666666.....
......6666......
.......66.......
................
................` ],
  [ freed, bitmap`
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
......4444......
.......44.......
................
................` ],
  [ exitLock, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L0L0L0L0L0L0LL0
0LLLLLLLLLLLLLL0
0L0L0L0L0L0L0LL0
0LLLLLLLLLLLLLL0
0L0L00LLL00L0LL0
0LLLLL000LLLLLL0
0L0L0L000L0L0LL0
0LLLLL000LLLLLL0
0L0L00LLL00L0LL0
0LLLLLLLLLLLLLL0
0L0L0L0L0L0L0LL0
0LLLLLLLLLLLLLL0
0L0L0L0L0L0L0LL0
0000000000000000` ],
  [ exitOpen, bitmap`
5555555555555555
5666666666666665
5655555555555565
5655555555555565
5655555555555565
5655555555555565
5655555555555565
5655555555555565
5655555555555565
5655555555555565
5655555555555565
5655555555555565
5655555555555565
5655555555555565
5666666666666665
5555555555555555` ],
  [ proj, bitmap`
................
......3333......
.....333333.....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
.....333333.....
......3333......
................
................
................` ],
  [ bg, bitmap`
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
0000000000000000` ]
)

setBackground(bg)
setSolids([ player, wall, hunter, soul ])

// ---------------------------------------------------------------- SETTINGS
const SPEED_OPTIONS = [
  { label: "Slow   (800ms)", ms: 800 },
  { label: "Normal (500ms)", ms: 500 },
  { label: "Fast   (350ms)", ms: 350 },
]
let speedIndex = 1

// ---------------------------------------------------------------- LEVELS
// Souls speak one line automatically when freed — no giver NPC needed.
// Each room has a soulLine: what the freed soul says as it's released.
// Rooms 1-10: souls are grateful/pleading (player doesn't know the truth yet)
// Room 11+:   souls reveal what they really are

const TUTORIAL_COUNT = 3

const levels = [

  // TUTORIAL 1
  {
    name: "TUTORIAL 1",
    isTutorial: true,
    map: map`
wwwwwwwwww
wp.......w
w........w
w........w
w........w
w........w
w.......ow
wwwwwwwwww`,
    required: 0,
    creator: "",
    soulLine: "",
    beats: [
      { at: 0, text: "TUTORIAL 1/3\n\nWASD to move.\nStep on the exit." },
    ],
  },

  // TUTORIAL 2
  {
    name: "TUTORIAL 2",
    isTutorial: true,
    map: map`
wwwwwwwwwww
wp...n....w
w.........w
w.........w
w.........w
w.......n.w
w........ew
wwwwwwwwwww`,
    required: 2,
    creator: "",
    soulLine: "Thank you...",
    beats: [
      { at: 0, text: "TUTORIAL 2/3\n\nBlue figures are\ntrapped souls.\n\nStand next to one\nand press J to free.\n\nFree 2 to unlock exit." },
      { at: 2, text: "Exit open.\nStep on it." },
    ],
  },

  // TUTORIAL 3
  {
    name: "TUTORIAL 3",
    isTutorial: true,
    map: map`
wwwwwwwwwwwwww
wp...........w
w............w
w............w
w............w
w............w
w............w
w............w
w............w
w...........hw
w............w
w...........ew
wwwwwwwwwwwwww`,
    required: 0,
    creator: "",
    soulLine: "",
    beats: [
      { at: 0, text: "TUTORIAL 3/3\n\nThe red figure\nchases you.\n\nPress I when it's\nwithin 2 tiles\nto ward it off.\n\nThen run to exit." },
    ],
  },

  // ROOM 1
  {
    name: "ROOM 1",
    map: map`
wwwwwwwwww
wp......nw
w..w...www
w........w
w........w
w.w.....ww
w....n.ehw
wwwwwwwwww`,
    required: 2,
    creator: "Free them. Follow my instructions.",
    soulLine: "Thank you. Keep going.",
    beats: [
      { at: 0, text: "Welcome to Playtest.\nYou have been\nselected." },
      { at: 1, text: "Good. They respond\nto you." },
    ],
  },

  // ROOM 2
  {
    name: "ROOM 2",
    map: map`
wwwwwwwwwww
wp........w
wn...w....w
w.....w.w.w
ww......w.w
w......n.hw
ww......eww
wwwwwwwwwww`,
    required: 2,
    creator: "Keep going.",
    soulLine: "Please. We've been here so long.",
    beats: [
      { at: 0, text: "Room two." },
      { at: 2, text: "Good." },
    ],
  },

  // ROOM 3
  {
    name: "ROOM 3",
    map: map`
wwwwwwwwwwww
wp...w.....w
w.n..w.n...w
w......w...w
w..........w
w.ww..w...ww
w...n.....ew
ww.....w.whw
wwwwwwwwwwww`,
    required: 3,
    creator: "You're doing well.",
    soulLine: "We owe you everything.",
    beats: [
      { at: 0, text: "They trust you." },
      { at: 3, text: "The path opens." },
    ],
  },

  // ROOM 4
  {
    name: "ROOM 4",
    map: map`
wwwwwwwwwwww
wp....w...nw
w..w..w..www
w...w.wn...w
w..........w
w..........w
w.........ww
www...n...ew
w.....w..hww
wwwwwwwwwwww`,
    required: 3,
    creator: "Stay on task.",
    soulLine: "Don't stop now.",
    beats: [
      { at: 0, text: "Don't wander." },
      { at: 3, text: "Onward." },
    ],
  },

  // ROOM 5 — Creator starts to have doubts
  {
    name: "ROOM 5",
    map: map`
wwwwwwwwwwww
wp..eww....w
w........nww
w..ww.....ww
w..........w
w.....wn...w
www...w.w..w
w.....w....w
w.w.n.....hw
wwwwwwwwwwww`,
    required: 3,
    creator: "Something feels wrong.",
    soulLine: "He lied to you.",
    beats: [
      { at: 0, text: "Halfway." },
      { at: 3, text: "...why do they\nwhisper?" },
    ],
  },

  // ROOM 6
  {
    name: "ROOM 6",
    map: map`
wwwwwwwwwwwww
wp......w...w
w.........w.w
w..nww.w....w
wnw.........w
wwn...wwn...w
ww.......w..w
ww..........w
w.w.....w.w.w
w.........ehw
wwwwwwwwwwwww`,
    required: 4,
    creator: "Why do they look at\nyou like that?",
    soulLine: "You don't know what we are.",
    beats: [
      { at: 0, text: "These ones are quiet." },
      { at: 4, text: "Too quiet." },
    ],
  },

  // ROOM 7
  {
    name: "ROOM 7",
    map: map`
wwwwwwwwwwwwww
wp.w..n.w..w.w
w.......w....w
w...w.w....www
w...w....w...w
w............w
w.....ww.....w
ww....ww.....w
w..n.ww......w
w....w.nnw.ehw
wwwwwwwwwwwwww`,
    required: 4,
    creator: "Ignore what they say.",
    soulLine: "Free us anyway.",
    beats: [
      { at: 0, text: "Don't listen to them." },
      { at: 4, text: "Just open the door." },
    ],
  },

  // ROOM 8 — Creator admits something is off
  {
    name: "ROOM 8",
    map: map`
wwwwwwwwwwwwww
wp....w...w..w
w............w
w....w..w.ww.w
www.....n....w
w..n.w.w.....w
w.........ww.w
w....w.w...www
w....w.....w.w
w.n.........ww
w.....w.nw.ehw
wwwwwwwwwwwwww`,
    required: 4,
    creator: "I didn't know what\nthey were.",
    soulLine: "Yes you did.",
    beats: [
      { at: 0, text: "I was told they were\nsafe to release." },
      { at: 4, text: "I'm not sure\nthat's true." },
    ],
  },

  // ROOM 9
  {
    name: "ROOM 9",
    map: map`
wwwwwwwwwwwwwww
wp......whe...w
ww...w...w....w
w..ww.....w..ww
w...w.n....w.nw
w....ww.w....nw
w.w....w...wwww
w.............w
ww..w...w.....w
w......w......w
wnw.......n..ww
wwwwwwwwwwwwwww`,
    required: 5,
    creator: "I said don't question it.",
    soulLine: "Too late to stop now.",
    beats: [
      { at: 0, text: "Stay on task." },
      { at: 5, text: "Use the exit." },
    ],
  },

  // ROOM 10 — Creator fully unravelling
  {
    name: "ROOM 10",
    map: map`
wwwwwwwwwwwwwww
wp..n....w..whw
w.w.....nw.wwew
w.w..w...w.w..w
w....ww....w..w
w...........w.w
w...........w.w
w........w....w
www...n.....w.w
w...ww........w
ww.w..ww.w.n.nw
wwwwwwwwwwwwwww`,
    required: 5,
    creator: "Stop. You need to stop.",
    soulLine: "Open it. Open them all.",
    beats: [
      { at: 0, text: "These should not\nbe opened." },
      { at: 5, text: "What are you doing." },
    ],
  },

  // ROOM 11 — THE TWIST
  // Open map so the twist is readable, not an immediate deathtrap
  {
    name: "ROOM 11",
    map: map`
wwwwwwwwwwwwwwww
wp.............w
w..n...........w
w.......n......w
w..............w
w....n.........w
w..............w
w.......n......w
w.....n........w
w..............w
w..........h.eww
wwwwwwwwwwwwwwww`,
    required: 5,
    creator: "What have you done.",
    soulLine: "Yes. Now you know what we are.",
    beats: [
      { at: 0, text: "The last room." },
      { at: 3, text: "They were not trapped.\nThey were IMPRISONED.\n\nNot souls.\nMonsters.\n\nAnd you freed them all.", twist: true },
    ],
  },

  // ROOM 12 — escape. Creator is COLD now, not helpful.
  {
    name: "ROOM 12",
    map: map`
wwwwwwwwwwwwwwww
wp.....wn.ww...w
ww............ww
ww......w......w
w..n.w.w.......w
w.w.ww...w..ww.w
wn.w.....w.....w
w..nww........ww
w..w.....w.....w
w.w.w....n.....w
w.w...ww...wn..w
w........wwe.hww
wwwwwwwwwwwwwwww`,
    required: 6,
    creator: "You did this.",
    soulLine: "We remember every room.",
    beats: [
      { at: 0, text: "You opened all\nthe locks." },
      { at: 6, text: "They're all out." },
    ],
  },

  // ROOM 13
  {
    name: "ROOM 13",
    map: map`
wwwwwwwwwwwwwwww
wp............nw
ww......w......w
w.w......n..w..w
w.w..w.....w...w
www.w..w...w...w
w.w.....n.w..w.w
w.w....w...w...w
ww..n.ww..w..w.w
w.w...nww......w
w.......w.n..w.w
www..w...w...ehw
wwwwwwwwwwwwwwww`,
    required: 6,
    creator: "Don't expect my help.",
    soulLine: "No quest. Just us.",
    beats: [
      { at: 0, text: "Keep moving." },
      { at: 6, text: "Faster." },
    ],
  },

  // ROOM 14
  {
    name: "ROOM 14",
    map: map`
wwwwwwwwwwwwwwww
wp.............w
w.nww.w......w.w
w...w..wwww....w
w..w......n.w.ww
w...........w.ww
w.....w.www...ww
w.........w..w.w
www.w..........w
w........n..w..w
w..n.....ww.w..w
ww..w.w..wwwn..w
w...n...wwhe...w
wwwwwwwwwwwwwwww`,
    required: 6,
    creator: "You ruined everything.",
    soulLine: "Almost there. Then what?",
    beats: [
      { at: 0, text: "Two rooms left." },
      { at: 6, text: "I worked for years." },
    ],
  },

  // ROOM 15 — last escape room
  {
    name: "ROOM 15",
    map: map`
wwwwwwwwwwwwwwww
wwp..........n.w
w..w...wwn....ww
w.....w.....ww.w
w.....ww...w...w
www.w..ww....w.w
w...ww.........w
w..w.w...w.ww..w
w..w.....w..w.nw
w.....w.n.wn...w
w.w........n.w.w
w.........w.we.w
www..n...w....hw
wwwwwwwwwwwwwwww`,
    required: 7,
    creator: "My life's work. Gone.",
    soulLine: "Goodbye, playtester.",
    beats: [
      { at: 0, text: "The final room." },
      { at: 7, text: "Now go find\nyour Creator." },
    ],
  },

  // BOSS — THE CREATOR'S CHAMBER
  // The Creator is the boss. He's furious. One hunter (him), but faster
  // each wave and with more tricks. No "absorbed souls" nonsense.
  {
    name: "THE CREATOR",
    isBoss: true,
    map: map`
wwwwwwwwwwwwwwwwwwww
wp.................w
w..................w
w..................w
w....wwww...wwww...w
w....w......w...w..w
w....w......w...w..w
w....wwww...wwww...w
w.................ww
w..................w
w..................w
w..................w
wwwwwwwwwwwwwwwwwwww`,
    required: 0,
    creator: "",
    soulLine: "",
    beats: [],
  },
]

// ================================================================ GAME STATE
let levelIndex      = 0
let freedCount      = 0
let firedBeats      = {}
let gameOver        = false
let won             = false
let messageTimer    = 0
let bigMessage      = ""
let statusMsg       = ""
let statusTimer     = 0
let inSettings      = false
let settingsTab     = 0    // 0 = speed, 1 = room select
let roomSelectIdx   = 0    // which room is highlighted in room select
let wardTutorialStep = 0

// ward
const WARD_RANGE      = 2
const WARD_KNOCKBACK  = 4
const WARD_STUN_TICKS = 5   // normal rooms; boss overrides per-phase
const WARD_COOLDOWN       = 10   // normal rooms (ticks × 500ms ≈ 5s)
const WARD_COOLDOWN_BOSS  = 4    // overridden per-phase in startBossPhase
let hunterStunTicks = 0
let wardCooldown    = 0

// ================================================================ BOSS STATE
let inBoss          = false
let bossPhase       = 0
let bossHitsNeeded  = 5
let bossDefeated    = false
let bossInterval    = null
let projInterval    = null

// Player HP
let playerHP        = 3
const PLAYER_MAX_HP = 3
let playerInvincible = 0
// Invincibility ticks scale per-phase so phase 3 burst doesn't one-shot
const INVINCIBLE_TICKS_PER_PHASE = [6, 5, 5]

// KARMA: passive HP drain. Interval per phase (in boss-ticks).
const KARMA_INTERVAL_PER_PHASE = [35, 28, 22]
let karmaTicks = 0

// Regen: if you don't follow up a ward hit within this many ticks, he heals one back.
const REGEN_TICKS_PER_PHASE = [18, 14, 10]
let regenTimer   = 0
let lastHitCount = 5

// Chase/Attack mode. Chase and attack window sizes are per-phase (ticks).
const CHASE_TICKS_PER_PHASE  = [7, 6, 5]
// Each shot in a burst is separated by this many ticks — spaces them out so
// a full burst isn't simultaneous. Phase 3 still feels fast, just not instant.
const ATTACK_TICKS_PER_PHASE = [4, 3, 3]
// Shots per burst per phase (1/2/3).
const BURST_PER_PHASE = [1, 2, 3]
let bossMode      = "chase"
let bossModeTimer = 0
let attackBurst   = 0

let projectiles = []

const CREATOR_BOSS_LINES = [
  ["You had one job.", "Free them.", "I trusted you."],
  ["Do you know what they ARE?", "I spent YEARS.", "You undid all of it."],
  ["You can't leave.", "If you leave they all escape.", "This is YOUR fault."],
]
let bossLineIdx   = 0
let bossLineTimer = 0

// Phase speeds (ms per tick).
// Proj speed is capped so phase 3 still gives ~1.8s to cross the arena.
const BOSS_MOVE_MS = [420, 300, 200]
const BOSS_PROJ_MS = [200, 130, 100]

// ================================================================ BOSS ATTACK PATTERNS
// Each returns an array of {x, y, dx, dy} projectile descriptors.
// x/y is spawn position, dx/dy is direction of travel.
function bossAttackPattern(phase) {
  const h = getFirst(hunter)
  const p = getFirst(player)
  if (!h || !p) return []
  const shots = []

  if (phase === 1) {
    // Single aimed shot directly at player, plus one off by 1 tile to force a dodge
    const dx = Math.sign(p.x - h.x) || 1
    const dy = Math.sign(p.y - h.y) || 0
    // Primary aimed shot
    shots.push({ x: h.x + dx, y: h.y + dy, dx, dy })
    // A second shot aimed but offset — if player moves to dodge, this catches them
    const perp = Math.abs(dx) > Math.abs(dy) ? { dx: 0, dy: 1 } : { dx: 1, dy: 0 }
    shots.push({ x: h.x + perp.dx, y: h.y + perp.dy, dx, dy })

  } else if (phase === 2) {
    // Spread of 3: aimed + two diagonals. Player has to find the gap.
    const aim = getAimDir(h, p)
    shots.push({ x: h.x + aim.dx, y: h.y + aim.dy, dx: aim.dx,  dy: aim.dy  })
    // Two flanking shots — same start point, spread directions
    const [l, r] = perpDirs(aim.dx, aim.dy)
    shots.push({ x: h.x + aim.dx, y: h.y + aim.dy, dx: l.dx, dy: l.dy })
    shots.push({ x: h.x + aim.dx, y: h.y + aim.dy, dx: r.dx, dy: r.dy })
    // Phase 2 also fires a row sweep every other burst: fill player's row
    if (attackBurst % 2 === 0) {
      const row = p.y
      // Fire left-to-right across player's row from the left wall
      shots.push({ x: 1, y: row, dx: 1, dy: 0 })
    }

  } else if (phase === 3) {
    // Phase 3: Sans-style corridor. Fire a full column at the player's x,
    // AND a full row at the player's y, BUT leave exactly one safe tile.
    // The safe tile is always directly adjacent to where the player is standing.
    // Knowing it exists is the skill — you have to read the pattern and move one tile.
    const safeX = p.x + (p.x > width() / 2 ? -1 : 1)
    const safeY = p.y + (p.y > height() / 2 ? -1 : 1)
    // Column: spawn shots from top, traveling down, skipping safeY
    for (let sy = 1; sy < height() - 1; sy++) {
      if (sy === safeY) continue
      shots.push({ x: p.x, y: sy, dx: 0, dy: 1, wall: true })
    }
    // Row: spawn shots from left, traveling right, skipping safeX
    for (let sx = 1; sx < width() - 1; sx++) {
      if (sx === safeX) continue
      shots.push({ x: sx, y: p.y, dx: 1, dy: 0, wall: true })
    }
    // Plus a direct aimed shot just to keep pressure on
    const aim = getAimDir(h, p)
    shots.push({ x: h.x + aim.dx, y: h.y + aim.dy, dx: aim.dx, dy: aim.dy })
  }

  // Filter out any shots that spawn inside a wall or off-map
  return shots.filter(s => !isWallAt(s.x, s.y))
}

function getAimDir(h, p) {
  const gx = p.x - h.x, gy = p.y - h.y
  if (Math.abs(gx) >= Math.abs(gy)) return { dx: Math.sign(gx) || 1, dy: 0 }
  return { dx: 0, dy: Math.sign(gy) || 1 }
}
function perpDirs(dx, dy) {
  if (dx !== 0) return [{ dx: 0, dy: 1 }, { dx: 0, dy: -1 }]
  return [{ dx: 1, dy: 0 }, { dx: -1, dy: 0 }]
}

// ================================================================ PROJECTILE TICK
// Runs on its own fast clock so projectiles visibly travel tile-by-tile.
function projTick() {
  if (!inBoss || gameOver || bossDefeated) return
  if (messageTimer > 0) return
  const p = getFirst(player)

  // Move each projectile one tile
  const next = []
  for (const proj_obj of projectiles) {
    // Remove old sprite
    for (const s of getTile(proj_obj.x, proj_obj.y)) {
      if (s.type === proj) s.remove()
    }
    const nx = proj_obj.x + proj_obj.dx
    const ny = proj_obj.y + proj_obj.dy
    // Projectile disappears when it hits a wall or leaves the map
    if (isWallAt(nx, ny)) continue
    proj_obj.x = nx; proj_obj.y = ny
    addSprite(nx, ny, proj)
    next.push(proj_obj)

    // Check if it hit the player
    if (p && nx === p.x && ny === p.y) {
      hitPlayer()
    }
  }
  projectiles = next
  render()
}

// ================================================================ BOSS TICK
function bossTick() {
  if (!inBoss || gameOver || bossDefeated) return
  if (messageTimer > 0) return

  if (wardCooldown > 0) wardCooldown--
  if (playerInvincible > 0) playerInvincible--

  const h = getFirst(hunter)
  const p = getFirst(player)
  if (!h || !p) return

  // KARMA: passive damage — you can't just hide forever
  karmaTicks++
  const karmaInterval = KARMA_INTERVAL_PER_PHASE[Math.max(0, bossPhase - 1)]
  if (karmaTicks >= karmaInterval) {
    karmaTicks = 0
    hitPlayer()
    if (gameOver) return
  }

  // REGEN: if not pressing the attack, he heals back a hit
  if (regenTimer > 0) {
    regenTimer--
    const regenTicks = REGEN_TICKS_PER_PHASE[Math.max(0, bossPhase - 1)]
    if (regenTimer === 0 && bossHitsNeeded < 5) {
      bossHitsNeeded = Math.min(5, bossHitsNeeded + 1)
      showStatus("He shrugged it off.")
      playTune(hunterRecoverTune)
    }
  }

  // Stun check
  if (hunterStunTicks > 0) {
    hunterStunTicks--
    if (hunterStunTicks === 0) {
      playTune(hunterRecoverTune)
      bossMode = "chase"
      bossModeTimer = CHASE_TICKS_PER_PHASE[Math.max(0, bossPhase - 1)]
      showStatus("He gets up.")
    }
    render()
    return
  }

  // MODE SWITCH
  bossModeTimer--
  if (bossModeTimer <= 0) {
    if (bossMode === "chase") {
      bossMode = "attack"
      attackBurst = BURST_PER_PHASE[bossPhase - 1]
      // Give the full burst room to breathe: one shot per ATTACK_TICKS ticks
      bossModeTimer = ATTACK_TICKS_PER_PHASE[bossPhase - 1] * attackBurst
    } else {
      bossMode = "chase"
      bossModeTimer = CHASE_TICKS_PER_PHASE[bossPhase - 1]
    }
  }

  if (bossMode === "chase") {
    bfsMoveHunter(h)
    // Melee catch
    if (Math.abs(h.x - p.x) + Math.abs(h.y - p.y) <= 1) {
      hitPlayer()
      if (gameOver) return
      // Bounce creator back so it doesn't instantly hit again
      const dx = Math.sign(h.x - p.x) || 1
      const dy = Math.sign(h.y - p.y) || 0
      if (!isWallAt(h.x + dx, h.y)) h.x += dx
      else if (!isWallAt(h.x, h.y + dy)) h.y += dy
    }
  } else {
    // Attack mode: fire one shot per ATTACK_TICKS ticks so burst feels spaced
    const atk = ATTACK_TICKS_PER_PHASE[bossPhase - 1]
    const burstTotal = BURST_PER_PHASE[bossPhase - 1]
    const tickInBurst = (CHASE_TICKS_PER_PHASE[bossPhase - 1] + bossModeTimer) % atk
    if (attackBurst > 0 && tickInBurst === 0) {
      attackBurst--
      const shots = bossAttackPattern(bossPhase)
      for (const s of shots) {
        if (!isWallAt(s.x, s.y)) {
          addSprite(s.x, s.y, proj)
          projectiles.push(s)
        }
      }
      playTune(projFireTune)
    }
    // Back off from player slightly while attacking (like Sans sliding away)
    // Move one step away from player
    const awayX = Math.sign(h.x - p.x)
    const awayY = Math.sign(h.y - p.y)
    const nx = h.x + (awayX || 1)
    const ny = h.y + awayY
    if (!isWallAt(nx, ny)) h.x = nx
    else if (!isWallAt(h.x, h.y + awayY)) h.y += awayY
  }

  // Creator taunts
  if (bossLineTimer > 0) bossLineTimer--
  else {
    const lines = CREATOR_BOSS_LINES[Math.min(bossPhase - 1, 2)]
    statusMsg = lines[bossLineIdx % lines.length]
    bossLineIdx++
    bossLineTimer = 7
  }

  render()
}

// ================================================================ PLAYER HIT
function hitPlayer() {
  if (playerInvincible > 0) return
  playerHP--
  const invTicks = inBoss ? INVINCIBLE_TICKS_PER_PHASE[Math.max(0, bossPhase - 1)] : 4
  playerInvincible = invTicks
  playTune(caughtTune)
  if (playerHP <= 0) {
    gameOver = true
    stopAmbient()
    clearProjectiles()
    render()
  } else {
    showStatus(`${playerHP} HP left. Keep moving.`)
  }
}

function clearProjectiles() {
  for (const s of getAll(proj)) s.remove()
  projectiles = []
}

// ================================================================ BOSS WARD HIT
function bossWardHit() {
  bossHitsNeeded--
  regenTimer   = REGEN_TICKS_PER_PHASE[Math.max(0, bossPhase - 1)]
  lastHitCount = bossHitsNeeded
  showStatus(bossHitsNeeded > 0 ? `${bossHitsNeeded} more.` : "He's breaking!")
  playTune(wardHitTune)

  if (bossHitsNeeded <= 0) {
    if (bossPhase < 3) {
      clearProjectiles()
      showMessage(`He falls back.\n\nBut he gets up.\nFaster.\n\nHe won't let you\nleave like that.`, 5)
      setTimeout(() => {
        if (inBoss && !gameOver && !bossDefeated) startBossPhase(bossPhase + 1)
      }, 3000)
    } else {
      clearProjectiles()
      bossDefeated = true
      if (bossInterval)  clearInterval(bossInterval)
      if (projInterval)  clearInterval(projInterval)
      for (const h of getAll(hunter)) h.remove()
      stopAmbient()
      playTune(winTune)
      render()
    }
  }
}

// ================================================================ START BOSS PHASE
function startBossPhase(phase) {
  bossPhase      = phase
  bossHitsNeeded = 5
  bossLineIdx    = 0
  bossLineTimer  = 3
  bossMode       = "chase"
  bossModeTimer  = CHASE_TICKS_PER_PHASE[phase - 1]
  karmaTicks     = 0
  regenTimer     = 0
  attackBurst    = 0
  clearProjectiles()

  // Respawn creator at far corner from player
  for (const h of getAll(hunter)) h.remove()
  const p  = getFirst(player)
  const px = p ? p.x : 1
  const py = p ? p.y : 1
  const cx = px < width() / 2 ? width() - 2 : 1
  const cy = py < height() / 2 ? height() - 2 : 1
  addSprite(cx, cy, hunter)

  // Restart move and projectile clocks at phase speed
  if (bossInterval) clearInterval(bossInterval)
  if (projInterval) clearInterval(projInterval)
  bossInterval = setInterval(bossTick, BOSS_MOVE_MS[phase - 1])
  projInterval = setInterval(projTick, BOSS_PROJ_MS[phase - 1])

  const phaseText = [
    "PHASE 1\n\nWard him 5 times.\nDon't get hit.\n\nHe'll attack\nif you hesitate.",
    "PHASE 2\n\nHe remembers\nhow you fight.\n\nWard him 5 times.\nFaster this time.",
    "PHASE 3\n\nHe's done\nbeing careful.\n\nWard him 5 times.\nOr don't leave.",
  ][phase - 1]

  showMessage(phaseText, 5)
  playTune(twistTune)
  render()
}

// ================================================================ LOAD / STOP BOSS
function loadBoss() {
  inBoss          = true
  bossPhase       = 0
  bossDefeated    = false
  gameOver        = false
  won             = false
  bigMessage      = ""
  messageTimer    = 0
  wardCooldown    = 0
  hunterStunTicks = 0
  statusMsg       = ""
  statusTimer     = 0
  playerHP        = PLAYER_MAX_HP
  playerInvincible = 0
  karmaTicks      = 0
  regenTimer      = 0
  projectiles     = []
  bossMode        = "chase"
  bossModeTimer   = CHASE_TICKS
  attackBurst     = 0

  setMap(levels[levelIndex].map)
  startAmbient()

  showMessage("You find a door at\nthe end of the hall.\n\nBehind it:\nthe Creator.\n\nHe's been watching\nthis whole time.\n\nHe is not pleased.", 8)
  playTune(twistTune)

  setTimeout(() => {
    if (inBoss && !gameOver && !bossDefeated) startBossPhase(1)
  }, 4500)

  render()
}

function stopBoss() {
  if (bossInterval) clearInterval(bossInterval)
  if (projInterval) clearInterval(projInterval)
  bossInterval = null
  projInterval = null
  inBoss = false
  clearProjectiles()
  for (const h of getAll(hunter)) h.remove()
}

// ================================================================ SOUNDS
const stepTune      = tune`40: C5~40`
const stepTune2     = tune`40: D5~40`
const freedTune     = tune`70: A4~70, 70: C5~70, 70: E5~70`
const unlockTune    = tune`90: C4~90, 90: G4~90, 90: C5~90, 180: E5~180`
const blockedTune   = tune`60: E2~60`
const beatTune      = tune`120: C4~120, 120, 120: E4~120, 120`
const twistTune     = tune`
240: C3~240,
240: A2~240,
240: F2~240,
240: D2~240,
360: C2~360`
const caughtTune    = tune`
160: E3~160,
160: C3~160,
160: G2~160,
160: E2~160,
360: C2~360`
const winTune       = tune`
130: C4~130,
130: E4~130,
130: G4~130,
130: C5~130,
260: E5~260`
const pulseFar      = tune`50: C2~50`
const pulseMid      = tune`50: E2~50`
const pulseNear     = tune`60: A2~60, 60: A2~60`
const wardHitTune   = tune`70: G5~70, 70: D5~70, 70: A4~70, 140: D4~140`
const wardFizzleTune = tune`80: A3~80, 120: F3~120`
const hunterRecoverTune = tune`120: D2~120, 120: G2~120`
const projFireTune  = tune`50: A3~50`   // sharp crack when Creator fires
const settingsTune  = tune`60: G4~60, 60: C5~60`
const ambientDrone  = tune`
500: C2-500,
500: D2-500,
500: C2-500,
500: B1-500`

let ambientHandle = null
function startAmbient() {
  if (ambientHandle && ambientHandle.end) ambientHandle.end()
  if (!curLevel().isTutorial)
    ambientHandle = playTune(ambientDrone, Infinity)
}
function stopAmbient() {
  if (ambientHandle && ambientHandle.end) ambientHandle.end()
  ambientHandle = null
}

let stepFlip = false
function playStep() { stepFlip = !stepFlip; playTune(stepFlip ? stepTune : stepTune2) }

let pulseCounter = 0
function playApproachPulse() {
  const h = getFirst(hunter)
  const p = getFirst(player)
  if (!h || !p) return
  const d = Math.abs(h.x - p.x) + Math.abs(h.y - p.y)
  pulseCounter++
  if (d <= 3)                          playTune(pulseNear)
  else if (d <= 6) { if (pulseCounter % 2 === 0) playTune(pulseMid) }
  else             { if (pulseCounter % 4 === 0) playTune(pulseFar) }
}

// ================================================================ HELPERS
function curLevel()    { return levels[levelIndex] }
function isWallAt(x, y) {
  if (x < 0 || y < 0 || x >= width() || y >= height()) return true
  return getTile(x, y).some(s => s.type === wall)
}
function showMessage(txt, ticks) { bigMessage = txt; messageTimer = ticks }
function showStatus(msg)          { statusMsg = msg; statusTimer = 6 }

function tryFireBeats() {
  const lv = curLevel()
  for (let i = 0; i < lv.beats.length; i++) {
    if (firedBeats[i]) continue
    const beat = lv.beats[i]
    if (freedCount >= beat.at) {
      if (beat.twist && freedCount < Math.max(1, Math.floor(lv.required / 2))) continue
      firedBeats[i] = true
      showMessage(beat.text, beat.twist ? 6 : 4)
      playTune(beat.twist ? twistTune : beatTune)
    }
  }
}

function exitIsOpen() { return getAll(exitOpen).length > 0 }

function unlockExit() {
  for (const s of getAll(exitLock)) {
    const x = s.x, y = s.y
    s.remove()
    addSprite(x, y, exitOpen)
  }
}

// ================================================================ MOVE
function movePlayer(dx, dy) {
  if (gameOver || won || bossDefeated) return
  if (inSettings) return
  if (messageTimer > 0) return
  const p = getFirst(player)
  if (!p) return
  const nx = p.x + dx, ny = p.y + dy
  if (isWallAt(nx, ny)) { playTune(blockedTune); return }
  const occupied = getTile(nx, ny).some(s => s.type === soul || s.type === hunter)
  if (occupied) { playTune(blockedTune); return }
  p.x = nx; p.y = ny
  playStep()
}

// BFS: move a single hunter toward player
function bfsMoveHunter(h) {
  const p = getFirst(player)
  if (!h || !p) return
  const W = width(), H = height()
  const key  = (x, y) => y * W + x
  const start = key(h.x, h.y)
  const goal  = key(p.x, p.y)
  const prev  = new Array(W * H).fill(-1)
  const seen  = new Array(W * H).fill(false)
  const queue = [start]
  seen[start] = true
  const dirs  = [[1,0],[-1,0],[0,1],[0,-1]]
  let found = false, qi = 0
  while (qi < queue.length) {
    const cur = queue[qi++]
    if (cur === goal) { found = true; break }
    const cx = cur % W, cy = (cur - cx) / W
    for (const [ddx, ddy] of dirs) {
      const nx = cx + ddx, ny = cy + ddy
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
      const nk = key(nx, ny)
      if (seen[nk]) continue
      if (nk !== goal && isWallAt(nx, ny)) continue
      if (nk !== goal && getTile(nx, ny).some(s => s.type === hunter)) continue
      seen[nk] = true; prev[nk] = cur; queue.push(nk)
    }
  }
  if (!found) return
  let node = goal
  while (prev[node] !== start && prev[node] !== -1) node = prev[node]
  h.x = node % W; h.y = (node - (node % W)) / W
}

function moveHunter() {
  const h = getFirst(hunter)
  bfsMoveHunter(h)
}

function hunterCaughtPlayer() {
  const h = getFirst(hunter)
  const p = getFirst(player)
  if (!h || !p) return false
  if (hunterStunTicks > 0) return false
  return Math.abs(h.x - p.x) + Math.abs(h.y - p.y) <= 1
}

// ================================================================ INTERACT — souls only, no giver NPC
function interact() {
  if (gameOver || won || bossDefeated || inBoss) return
  if (inSettings || messageTimer > 0) return
  const p = getFirst(player)
  if (!p) return
  const neighbours = [[p.x+1,p.y],[p.x-1,p.y],[p.x,p.y+1],[p.x,p.y-1]]
  for (const [nx, ny] of neighbours) {
    const s = getTile(nx, ny).find(t => t.type === soul)
    if (s) {
      s.remove()
      addSprite(nx, ny, freed)
      freedCount++
      // Soul speaks automatically on release — one line, no button needed
      const line = curLevel().soulLine
      if (line) showStatus(line)
      playTune(freedTune)
      tryFireBeats()
      if (freedCount >= curLevel().required) {
        unlockExit()
        playTune(unlockTune)
      }
      render()
      return
    }
  }
}

// ================================================================ WARD
function useWard() {
  if (gameOver || won || bossDefeated || inSettings) return
  if (messageTimer > 0) return
  if (wardCooldown > 0) { playTune(wardFizzleTune); return }

  const h = getFirst(hunter)
  const p = getFirst(player)
  if (!h || !p) { playTune(wardFizzleTune); return }

  const dist = Math.abs(h.x - p.x) + Math.abs(h.y - p.y)
  const effectiveRange = inBoss ? 3 : WARD_RANGE
  if (dist > effectiveRange) { playTune(wardFizzleTune); return }

  // Knock back
  const gx = h.x - p.x, gy = h.y - p.y
  let dx = 0, dy = 0
  if (Math.abs(gx) >= Math.abs(gy)) dx = Math.sign(gx)
  else dy = Math.sign(gy)
  if (dx === 0 && dy === 0) dx = 1
  let hx = h.x, hy = h.y
  for (let i = 0; i < WARD_KNOCKBACK; i++) {
    const nx = hx + dx, ny = hy + dy
    if (isWallAt(nx, ny)) break
    hx = nx; hy = ny
  }
  h.x = hx; h.y = hy
  hunterStunTicks = WARD_STUN_TICKS
  wardCooldown = inBoss ? WARD_COOLDOWN_BOSS : WARD_COOLDOWN
  playTune(wardHitTune)

  // In boss: ward hit counts toward phase clear
  if (inBoss) bossWardHit()

  // Tutorial 3 progression
  if (curLevel().isTutorial && curLevel().name === "TUTORIAL 3" && wardTutorialStep === 2) {
    wardTutorialStep = 3
    showMessage("Ward hit!\nHunter frozen.\n\nRun to exit\nwhile it's stunned.\n\nWard recharges\nautomatically.", 6)
  }

  render()
}

// ================================================================ SETTINGS
function openSettings()  { if (!gameOver && !won && !inBoss) { inSettings = true; settingsTab = 0; roomSelectIdx = levelIndex; render() } }
function closeSettings() { inSettings = false; render() }
function cycleSpeed() {
  speedIndex = (speedIndex + 1) % SPEED_OPTIONS.length
  playTune(settingsTune)
  restartHunterTimer()
  render()
}

// ================================================================ HUD
const COLS = 20

function wrap(str, maxWidth) {
  const words = str.split(" ")
  const lines = []
  let line = ""
  for (const w of words) {
    if (line === "") line = w
    else if ((line + " " + w).length <= maxWidth) line += " " + w
    else { lines.push(line); line = w }
  }
  if (line) lines.push(line)
  return lines
}
function centerText(str, y, col) {
  const x = Math.max(0, Math.floor((COLS - str.length) / 2))
  addText(str, { x, y, color: col })
}
function centerBlock(text, col, maxWidth) {
  const hardLines = text.split("\n")
  let lines = []
  for (const hl of hardLines) for (const wl of wrap(hl, maxWidth)) lines.push(wl)
  let y = Math.max(1, 8 - lines.length)
  for (const ln of lines) { centerText(ln, y, col); y += 2 }
}

function render() {
  clearText()

  // BOSS DEFEATED — the actual ending
  if (bossDefeated) {
    centerText("YOU GOT OUT.", 2, color`5`)
    centerBlock("The Creator is still\nin there.\n\nYou don't know what\nhappens next.\n\nNeither does he.", color`6`, 16)
    centerText("K = play again", 14, color`3`)
    return
  }

  if (won) {
    centerText("YOU ESCAPED", 3, color`6`)
    centerText("K = play again", 14, color`3`)
    return
  }

  if (gameOver) {
    if (inBoss) {
      centerText("* but it refused.", 4, color`3`)
      centerBlock("He's done this\nbefore.\n\nSo have you.", color`2`, 16)
    } else {
      centerText("CAUGHT.", 4, color`3`)
      centerBlock("Did you think I'd\nlet you just leave?", color`2`, 16)
    }
    centerText("K = retry", 14, color`3`)
    return
  }

  if (inSettings) {
    // Tab header
    const speedLabel    = settingsTab === 0 ? "*SPEED*" : " SPEED "
    const roomLabel     = settingsTab === 1 ? "*ROOMS*" : " ROOMS "
    addText(speedLabel, { x: 0, y: 0, color: settingsTab === 0 ? color`5` : color`2` })
    addText(roomLabel,  { x: COLS - roomLabel.length, y: 0, color: settingsTab === 1 ? color`5` : color`2` })
    addText("A/D = switch tab", { x: 0, y: 15, color: color`2` })

    if (settingsTab === 0) {
      // ---- SPEED TAB ----
      centerText("--- SPEED ---", 2, color`4`)
      centerText("W/S = change speed", 5, color`6`)
      centerText(SPEED_OPTIONS[speedIndex].label, 7, color`5`)
      centerText("L = close", 11, color`2`)

    } else {
      // ---- ROOM SELECT TAB ----
      centerText("-- ROOM SELECT --", 2, color`4`)
      // Show a scrolling window of room names: 4 visible at a time, centered on selection
      const names = levels.map((lv, i) => {
        if (lv.isTutorial) return `TUT ${i + 1}`
        if (lv.isBoss)     return "BOSS"
        return `R${i - TUTORIAL_COUNT + 1}`
      })
      const total   = names.length
      const winSize = 4          // rows visible
      const start   = Math.max(0, Math.min(roomSelectIdx - 1, total - winSize))
      for (let offset = 0; offset < winSize; offset++) {
        const idx = start + offset
        if (idx >= total) break
        const selected = idx === roomSelectIdx
        const label = (selected ? "> " : "  ") + names[idx].padEnd(8) +
                      (idx === levelIndex ? " <now" : "")
        addText(label, { x: 1, y: 5 + offset * 2,
          color: selected ? color`5` : color`2` })
      }
      centerText("W/S scroll  J=go", 13, color`2`)
    }
    return
  }

  if (messageTimer > 0 && bigMessage) {
    const isTwist = !inBoss && curLevel().beats.some(b => b.twist && b.text === bigMessage)
    centerBlock(bigMessage, isTwist ? color`3` : color`6`, 16)
    centerText("J to continue", 15, color`2`)
    return
  }

  // BOSS HUD
  if (inBoss) {
    // Top row: phase + hits needed
    addText(`P${bossPhase}/3`, { x: 0, y: 0, color: color`3` })
    const hitsBar = "o".repeat(bossHitsNeeded) + "-".repeat(5 - bossHitsNeeded)
    addText(hitsBar, { x: 5, y: 0, color: color`7` })
    // Player HP
    const hpBar = "v".repeat(playerHP) + ".".repeat(PLAYER_MAX_HP - playerHP)
    addText(`HP ${hpBar}`, { x: COLS - 8, y: 0, color: playerHP <= 1 ? color`3` : color`5` })
    // Ward status
    if (wardCooldown > 0)
      addText(`Ward ${wardCooldown}`, { x: 0, y: 1, color: color`2` })
    else
      addText("I=WARD range 3", { x: 0, y: 1, color: color`5` })
    // Karma warning
    const karmaLeft = KARMA_INTERVAL_PER_PHASE[Math.max(0, bossPhase - 1)] - karmaTicks
    if (karmaLeft <= 8)
      addText("KARMA!", { x: COLS - 6, y: 1, color: color`3` })
    // Regen warning
    if (regenTimer > 0 && regenTimer <= 6)
      addText("Ward! He heals!", { x: 0, y: 2, color: color`3` })
    // Creator line
    if (statusMsg) {
      const lines = wrap(statusMsg, COLS).slice(0, 2)
      let y = 13
      for (const ln of lines) { addText(ln, { x: 0, y, color: color`9` }); y += 2 }
    }
    addText("WASD dodge  I ward", { x: 0, y: 15, color: color`2` })
    return
  }

  // NORMAL HUD
  const lv = curLevel()
  if (lv.isTutorial) {
    addText(`TUT ${levelIndex + 1}/3`, { x: 0, y: 0, color: color`4` })
  } else {
    const rn = levelIndex - TUTORIAL_COUNT + 1
    addText(`R${rn}/15`, { x: 0, y: 0, color: color`3` })
  }
  if (lv.required > 0) {
    const st = `${freedCount}/${lv.required} freed`
    addText(st, { x: COLS - st.length, y: 0, color: color`4` })
  }
  if (exitIsOpen()) {
    addText(">>> EXIT OPEN <<<", { x: 0, y: 1, color: color`6` })
  } else if (!lv.isTutorial) {
    if (hunterStunTicks > 0) addText("Ward: frozen!", { x: 0, y: 1, color: color`5` })
    else if (wardCooldown > 0) addText(`Ward rchg ${wardCooldown}`, { x: 0, y: 1, color: color`2` })
    else addText("Ward ready (I)", { x: 0, y: 1, color: color`5` })
  }
  if (statusMsg) {
    const shown = wrap(statusMsg, COLS).slice(0, 2)
    let y = 13 - (shown.length - 1) * 2
    for (const ln of shown) {
      addText(ln, { x: 0, y, color: lv.isTutorial ? color`6` : color`9` })
      y += 2
    }
  }
  if (!lv.isTutorial)
    addText("L=settings K=retry", { x: 0, y: 15, color: color`2` })
  else if (levelIndex < 2)
    addText("WASD move  J free", { x: 0, y: 15, color: color`2` })
}

// ================================================================ LOAD
function loadLevel(i) {
  stopBoss()
  levelIndex      = i
  freedCount      = 0
  firedBeats      = {}
  gameOver        = false
  won             = false
  bigMessage      = ""
  messageTimer    = 0
  hunterStunTicks = 0
  wardCooldown    = 0
  inSettings      = false
  settingsTab     = 0
  roomSelectIdx   = 0
  wardTutorialStep = 0
  statusMsg       = ""
  statusTimer     = 0

  const lv = levels[i]
  if (lv.isBoss) { setMap(lv.map); loadBoss(); return }

  setMap(lv.map)
  // Show creator line as initial statusMsg (fades after a few ticks)
  if (!lv.isTutorial && lv.creator) showStatus(lv.creator)
  startAmbient()
  tryFireBeats()
  // Tutorials with no souls: open exit immediately
  if (lv.isTutorial && lv.required === 0) {
    if (getAll(exitLock).length > 0) unlockExit()
  }
  render()
}

// ================================================================ INPUTS
onInput("w", () => {
  if (inSettings) {
    // Scroll up in room select, or cycle speed backward
    if (settingsTab === 1) {
      roomSelectIdx = (roomSelectIdx - 1 + levels.length) % levels.length
      render()
    } else {
      speedIndex = (speedIndex - 1 + SPEED_OPTIONS.length) % SPEED_OPTIONS.length
      playTune(settingsTune); restartHunterTimer(); render()
    }
    return
  }
  movePlayer(0, -1)
})
onInput("s", () => {
  if (inSettings) {
    // Scroll down in room select, or cycle speed forward
    if (settingsTab === 1) {
      roomSelectIdx = (roomSelectIdx + 1) % levels.length
      render()
    } else {
      speedIndex = (speedIndex + 1) % SPEED_OPTIONS.length
      playTune(settingsTune); restartHunterTimer(); render()
    }
    return
  }
  movePlayer(0, 1)
})
onInput("a", () => {
  if (inSettings) { settingsTab = 0; playTune(settingsTune); render(); return }
  movePlayer(-1, 0)
})
onInput("d", () => {
  if (inSettings) { settingsTab = 1; playTune(settingsTune); render(); return }
  movePlayer(1, 0)
})

onInput("j", () => {
  if (inSettings) {
    if (settingsTab === 1) {
      // Confirm teleport to selected room
      closeSettings()
      loadLevel(roomSelectIdx)
    }
    return
  }
  if (messageTimer > 0) { messageTimer = 0; bigMessage = ""; render(); return }
  interact()
})

onInput("i", () => {
  if (inSettings) return   // I does nothing inside the menu
  useWard()
})

onInput("l", () => {
  if (won || gameOver || bossDefeated || inBoss) return
  if (inSettings) { closeSettings(); return }
  openSettings()
})

onInput("k", () => {
  if (inSettings) return   // K does nothing inside the menu (J confirms, L cancels)
  if (bossDefeated || won) { loadLevel(0); return }
  loadLevel(levelIndex)
})

// ================================================================ TURN LOGIC
function checkCatch() {
  if (gameOver || won) return true
  if (hunterCaughtPlayer()) {
    gameOver = true
    stopAmbient()
    playTune(caughtTune)
    render()
    return true
  }
  return false
}

function checkWin() {
  if (gameOver || won) return true
  const p = getFirst(player)
  if (p && exitIsOpen()) {
    if (getTile(p.x, p.y).some(s => s.type === exitOpen)) {
      advanceLevel()
      return true
    }
  }
  return false
}

function hunterTick() {
  if (inBoss) return
  if (gameOver || won || inSettings) return
  if (messageTimer > 0) return
  if (!getFirst(hunter)) return

  if (wardCooldown > 0) wardCooldown--
  if (statusTimer > 0) { statusTimer--; if (statusTimer === 0 && !curLevel().isTutorial) statusMsg = curLevel().creator || "" }

  if (hunterStunTicks > 0) {
    hunterStunTicks--
    if (hunterStunTicks === 0) playTune(hunterRecoverTune)
    render(); return
  }

  // Tutorial 3: prompt ward when hunter gets close
  if (curLevel().isTutorial && curLevel().name === "TUTORIAL 3") {
    const h = getFirst(hunter), p = getFirst(player)
    if (h && p) {
      const d = Math.abs(h.x - p.x) + Math.abs(h.y - p.y)
      if (d <= 5 && wardTutorialStep === 0) {
        wardTutorialStep = 1
        showMessage("The hunter is close!\n\nPress I when it's\nwithin 2 tiles\nto ward it off.", 5)
      } else if (d <= 2 && wardTutorialStep === 1) {
        wardTutorialStep = 2
        showMessage("NOW!\nPress I!", 3)
      }
    }
  }

  moveHunter()
  playApproachPulse()
  if (checkCatch()) return
  render()
}

afterInput(() => {
  if (gameOver || won || bossDefeated || inSettings) return
  if (inBoss) {
    if (messageTimer > 0) { messageTimer = 0; bigMessage = ""; render(); return }
    render(); return
  }
  if (messageTimer > 0) { messageTimer = 0; bigMessage = ""; render(); return }
  if (curLevel().isTutorial && curLevel().required === 0) {
    if (getAll(exitLock).length > 0) unlockExit()
  }
  if (checkCatch()) return
  if (checkWin()) return
  render()
})

let hunterInterval = null
function restartHunterTimer() {
  if (hunterInterval) clearInterval(hunterInterval)
  hunterInterval = setInterval(hunterTick, SPEED_OPTIONS[speedIndex].ms)
}

function advanceLevel() {
  playTune(unlockTune)
  if (levelIndex + 1 < levels.length) loadLevel(levelIndex + 1)
  else { won = true; stopAmbient(); playTune(winTune); render() }
}

// ================================================================ BOOT
restartHunterTimer()
loadLevel(0)