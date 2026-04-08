/*
@title: SIN EATER
@author: Vain Sindemy
@description: Blasphemous like
@tags: ['tag1', 'tag2']
@addedOn: 2026-02-01
*/

const p = "p" // Droite
const q = "q" // Gauche
const s = "s" // Mob
const b = "b" // Mur
const a = "a" // Atk D
const g = "g" // Atk G
const v = "v" // Atk H (Verticale)
const e = "e" // Sang
const m = "m" // Squelette / Mort
const o = "o" // Déco mid
const n = "n" // PIQUES MORTELS

setLegend(
  [p, bitmap`
........1.......
........1.......
.......L11......
3FC....L1L......
C33C..11111.....
C.33C0L010L.....
...20L1111L1L...
..L100L1001L1C..
.52L.001L1L.CC3.
.75..F1LL1F..33.
575.FL3333FF....
75...6FFFF3.....
75...L1F1FL.....
7....CLF.LC.....
....CC..F.CC....
...CCL....LCC...`],
  [q, bitmap`
.......1........
.......1........
......11L.......
......L1L....CF3
.....11111..C33C
.....L010L0C33.C
...L1L1111L02...
..C1L100L1001L..
.3CC.L1L100.L25.
.33..F1LL1F..57.
....FF3333LF.575
.....3FFFF6...57
.....LF1F1L...57
.....CL.FLC....7
....CC.F..CC....
...CCL....LCC...`],
  [s, bitmap`
................
.....00000......
....0000000.....
...00L000L00....
...00LL0LL00....
...000000000....
...0000L0000....
...000LLL000....
..10000000001...
..L10L0L0L01L...
..LL1L0L0L.1L...
...L.......L....
...LL1.1.1LL....
....LLLLLLL.....
................
................`],
  [b, bitmap`
00LLLLLLLLLLLL00
011111LLL111LLL0
L111111LL1111110
LL11111LL011111L
LL00LLLLLL00LLLL
L00111111L01111L
L01111111L11111L
LL111111LL11100L
LLLLLLLLLLLLLLLL
L001100LL00111LL
L011111LL011111L
L111111LL011111L
LLLLLLLLLLLLLLLL
LL1111LLLL0111LL
LL111111LL11111L
00011111L0001110`],
  [a, bitmap`
................
................
................
.......0LL1LL22.
.......011001L2.
.......002201L2.
..........2L1L2.
..........2L1L2.
.........220112.
.......22011L22.
......22L1LL22..
...222LL112.....
...0011112......
....LL122.......
....2222........
................`],
  [g, bitmap`
................
................
................
.22LL1LL0.......
.2L100110.......
.2L102200.......
.2L1L2..........
.2L1L2..........
.211022.........
.22L11022.......
..22LL1L22......
.....211LL222...
......2111100...
.......221LL....
........2222....
................`],
  [v, bitmap`
......2200022...
.....221111022..
...22111LLLL022.
..2000L1111LL02.
.220L1122221L022
.00L1222..221002
.0LL2.......21L2
.0L02........210
.20...........00
................
................
................
................
................
................
................`],
  [e, bitmap`
................
................
................
................
...L31...L.....L
...LL31.L3L...L3
....L3L.L33L..L3
..L.L3L.133L..13
.13L.L.13333L..L
.13L...L333331..
1333L..L333331..
L333L...L333L...
L333L....LLL....
.L3L11111111111.
.1L3333333333311
1333333333333333`],
  [m, bitmap`
................
................
................
................
................
................
................
................
.....LLLLL......
.LLLL33333L.....
L3333333333LL...
3333333333333LL.
L33333333333333L
L333333333333333
.LLL33333333333L
....LL33333LLLL.`],
  [o, bitmap`
1333333333333333
1333333333333331
.13333333333LL1.
..1333333LLL11..
...111111111....
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
................`],
  [n, bitmap`
................
................
................
................
................
................
................
.......3........
......3L3.......
......0L13......
.....00L113.....
....00LLL1133...
...30LLLLL1113..
...00LLLLLLL1133
..00LLLLLLLLL111
L0000L0000LLLLL1`]
)

setSolids([b])

let state = {
  mode: "MENU",
  hp: 100,
  vy: 0,
  dir: 1,
  atkTimer: 0
}

function getP() { return getFirst(p) || getFirst(q) }

// --- ENTRÉES UTILISATEUR ---

onInput("a", () => {
  const player = getP()
  if (player && state.mode === "PLAYING") {
    state.dir = -1
    if (!getTile(player.x - 1, player.y).some(t => t.type === b)) player.x -= 1
    player.type = q
  }
})

onInput("d", () => {
  const player = getP()
  if (player && state.mode === "PLAYING") {
    state.dir = 1
    if (!getTile(player.x + 1, player.y).some(t => t.type === b)) player.x += 1
    player.type = p
  }
})

onInput("w", () => {
  const player = getP()
  if (player && state.mode === "PLAYING") {
    const sol = getTile(player.x, player.y + 1).some(t => t.type === b)
    if (sol) state.vy = -1
  }
})

onInput("j", () => {
  if (state.mode === "MENU") {
    state.mode = "PLAYING"
    state.hp = 100
    setMap(map`
bbbbbbbbbbbbbbbb
bbbs........sbbb
bb.........s..bb
b...s...s......b
b...............
b...b.b.....b...
bp.bbnbb...bbn..
bbbbbbbbbbbbbbbb`)
  } else if (state.atkTimer === 0) {
    const player = getP()
    if (!player) return
    state.atkTimer = 2
    let tx = player.x + state.dir,
      ty = player.y
    let type = state.dir === 1 ? a : g
    if (!getTile(tx, ty).some(t => t.type === b)) addSprite(tx, ty, type)
    getTile(tx, ty).forEach(t => {
      if (t.type === s) {
        t.remove();
        addSprite(tx, ty, e)
      }
    })
  }
})

onInput("k", () => {
  const player = getP()
  if (player && state.mode === "PLAYING" && state.atkTimer === 0) {
    state.atkTimer = 2
    let tx = player.x,
      ty = player.y - 1
    if (!getTile(tx, ty).some(t => t.type === b)) addSprite(tx, ty, v)
    getTile(tx, ty).forEach(t => {
      if (t.type === s) {
        t.remove();
        addSprite(tx, ty, e)
      }
    })
  }
})

// --- BOUCLE DE JEU ---

setInterval(() => {
  clearText()
  if (state.mode === "MENU") {
    addText("SIN EATER", { y: 5, color: color`3` })
    addText("J : START / ATK", { y: 10, color: color`7` })
    addText("K : ATK HAUT", { y: 11, color: color`5` })
    addText("W A D : MOVE", { y: 13, color: color`7` })
    return
  }

  const player = getP()
  if (!player) return

  if (getTile(player.x, player.y).some(t => t.type === n)) state.hp = 0

  // ________________________________________________________________________
  // IA ET DÉGÂTS DES MOBS
  getAll(s).forEach(mob => {
    // Si le mob touche le joueur, il perd de la vie
    if (mob.x === player.x && mob.y === player.y) state.hp -= 20

    // Mouvement aléatoire simple
    if (Math.random() > 0.9) {
      let dx = Math.random() > 0.5 ? 1 : -1
      if (!getTile(mob.x + dx, mob.y).some(t => t.type === b)) mob.x += dx
    }
  })
  // ________________________________________________________________________

  if (state.hp <= 0) {
    let dx = player.x,
      dy = player.y
    player.remove()
    addSprite(dx, dy, m)
    setTimeout(() => {
      state.mode = "MENU";
      setMap(map`................`)
    }, 800)
    return
  }

  const grounded = getTile(player.x, player.y + 1).some(t => t.type === b)

  if (state.vy < 0) {
    if (!getTile(player.x, player.y - 1).some(t => t.type === b)) {
      player.y -= 1
      state.vy += 1
    } else {
      state.vy = 0
    }
  } else if (!grounded) {
    player.y += 1
  } else {
    state.vy = 0
  }

  if (state.atkTimer > 0) {
    state.atkTimer--
    if (state.atkTimer === 0) {
      [a, g, v, e].forEach(type => getAll(type).forEach(t => t.remove()))
    }
  }

  addText(`VITAE: ${state.hp}`, { x: 1, y: 1, color: color`3` })
}, 120)

setMap(map`................`)