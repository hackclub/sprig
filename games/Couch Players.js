/*
@title: 2 Player Games
@description: An iPod-style menu of 8 two-player games: Ping Pong, Golf, Sumo Battle, Pool, Tic Tac Toe, Air Hockey, Racers and Tug of War. Play a friend on one screen, or hold it sideways and play a bot.
@author:
@tags: ['multiplayer', 'collection', 'sports']
@addedOn: 2026-11-20
*/

// ============================================================
//  MENU (right d-pad):  I / K scroll   L select   J back
//  BLUE = left d-pad (W A S D)    RED = right d-pad (I J K L)
//  VS BOT: you are RED. Hold the Sprig sideways with the
//  right d-pad at the bottom (Racers stays flat).
//  Games can't be quit midway: switch the Sprig off and on.
//  The lock screen opens first: press DOWN (S or K) to unlock.
// ============================================================

const HW = typeof window === "undefined"
const now = () => Date.now()
const W = 160, H = 128
const BLUE = "7", RED = "3"
const TEAM = [BLUE, RED]
const TEAM_NAME = ["BLUE", "RED"]

// ------------------------------------------------------------
//  FRAMEBUFFER (game coordinates: a = 0..159 from BLUE's end to
//  RED's end, b = 0..127 across). In portrait it is shown flipped
//  so the console can be held sideways.
// ------------------------------------------------------------
const FB = new Array(H)
const FILLS = {}
function fillStr(c, n) {
  const k = c + n
  if (!FILLS[k]) FILLS[k] = Array(n + 1).join(c)
  return FILLS[k]
}
function clear(c) { const s = fillStr(c, W); for (let b = 0; b < H; b++) FB[b] = s }
function span(b, a0, a1, c) {
  b = Math.round(b); a0 = Math.max(0, Math.round(a0)); a1 = Math.min(W, Math.round(a1))
  if (b < 0 || b >= H || a1 <= a0) return
  const row = FB[b]
  FB[b] = row.substr(0, a0) + fillStr(c, a1 - a0) + row.substr(a1)
}
function rect(a, b, w, h, c) {
  const y0 = Math.round(b), y1 = Math.round(b + h)
  for (let y = y0; y < y1; y++) span(y, a, a + w, c)
}
function disc(ca, cb, r, c) {
  for (let y = Math.ceil(cb - r); y <= Math.floor(cb + r); y++) {
    const dy = y - cb
    const hw = Math.sqrt(Math.max(0, r * r - dy * dy))
    span(y, ca - hw + 0.5, ca + hw + 0.5, c)
  }
}

// ------------------------------------------------------------
//  SCREEN BUFFER (what the player sees, already turned the right
//  way). Portrait = Sprig held sideways, right d-pad at the bottom.
// ------------------------------------------------------------
let portrait = false
const VW = () => portrait ? 128 : 160
const VH = () => portrait ? 160 : 128
let OUT = []
let CLIP0 = 0, CLIP1 = 160
function clearV(c) {
  const s = fillStr(c, VW())
  OUT = []
  for (let v = 0; v < VH(); v++) OUT.push(s)
  CLIP0 = 0; CLIP1 = VW()
}
function ospan(v, u0, u1, c) {
  v = Math.floor(v); u0 = Math.max(CLIP0, Math.round(u0)); u1 = Math.min(CLIP1, Math.round(u1))
  if (v < 0 || v >= OUT.length || u1 <= u0) return
  const row = OUT[v]
  OUT[v] = row.substr(0, u0) + fillStr(c, u1 - u0) + row.substr(u1)
}
function rectV(u, v, w, h, c) {
  const y0 = Math.round(v), y1 = Math.round(v + h)
  for (let y = y0; y < y1; y++) ospan(y, u, u + w, c)
}
function ellipseV(cu, cv, rx, ry, c) {
  if (rx < 0.5 || ry < 0.5) { ospan(cv, cu - 0.5, cu + 0.5, c); return }
  for (let y = Math.ceil(cv - ry - 0.5); y <= Math.floor(cv + ry - 0.5); y++) {
    const dy = (y + 0.5 - cv) / ry
    const hw = rx * Math.sqrt(Math.max(0, 1 - dy * dy))
    ospan(y, cu - hw, cu + hw, c)
  }
}
const discV = (cu, cv, r, c) => ellipseV(cu, cv, r, r, c)
// filled convex polygon, points are [u, v]
function fillPoly(pts, c) {
  let lo = 1e9, hi = -1e9
  for (const p of pts) { lo = Math.min(lo, p[1]); hi = Math.max(hi, p[1]) }
  const n = pts.length
  for (let y = Math.max(0, Math.floor(lo)); y <= Math.min(OUT.length - 1, Math.floor(hi)); y++) {
    const yc = y + 0.5
    let a = 1e9, b = -1e9
    for (let i = 0; i < n; i++) {
      const p = pts[i], q = pts[(i + 1) % n]
      if ((p[1] <= yc && q[1] > yc) || (q[1] <= yc && p[1] > yc)) {
        const x = p[0] + (yc - p[1]) * (q[0] - p[0]) / (q[1] - p[1])
        if (x < a) a = x
        if (x > b) b = x
      }
    }
    if (a > b) continue
    if (b - a < 1) { const m = (a + b) / 2; a = m - 0.5; b = m + 0.5 }
    ospan(y, a, b, c)
  }
}
// floor drawing in field coordinates (X across the screen, Y down the screen)
function toC(X, Y) { return portrait ? [Y, X] : [X, Y] }
function rectF(X, Y, w, h, c) { if (portrait) rect(Y, X, h, w, c); else rect(X, Y, w, h, c) }
function discF(X, Y, r, c) { if (portrait) disc(Y, X, r, c); else disc(X, Y, r, c) }

// ------------------------------------------------------------
//  3D: the flat game field is drawn into FB, then shown tilted
//  away from you with real perspective, and 3D objects
//  (blocks, cylinders, balls) are drawn on top.
// ------------------------------------------------------------
const SHADE = { "7": "5", "3": "C", "2": "1", "1": "L", "L": "0", "4": "D", "D": "4", "6": "9", "9": "C", "8": "H", "H": "5", "C": "0", "0": "0", "5": "0", "F": "C" }
const dk = c => SHADE[c] || "0"
let PJ = null
function setupProj(k, top) {
  const FW = VW(), FD = VH(), topV = top, botV = VH() - 3
  const D0 = k * FD / (1 - k)
  const F = VW() * 0.97 * D0 / FW
  const Hc = (botV - topV) / (F * (1 / D0 - 1 / (D0 + FD)))
  PJ = { FW, FD, D0, F, Hc, hor: botV - Hc * F / D0, cu: VW() / 2 }
}
function P(X, Y, z) {
  const s = PJ.F / (PJ.D0 + PJ.FD - Y)
  return [PJ.cu + (X - PJ.FW / 2) * s, PJ.hor + PJ.Hc * s - z * s, s]
}
function projectFloor(bg, side) {
  const vw = VW(), vh = VH(), step = HW ? 2 : 1
  const bgRow = fillStr(bg, vw)
  OUT = []
  CLIP0 = 0; CLIP1 = vw
  for (let v = 0; v < vh; v++) {
    const dv = v + 0.5 - PJ.hor
    if (dv <= 0) { OUT.push(bgRow); continue }
    const d = PJ.Hc * PJ.F / dv, Y = PJ.FD + PJ.D0 - d
    if (Y < 0 || Y >= PJ.FD) { OUT.push(bgRow); continue }
    const s = PJ.F / d, Yi = Math.floor(Y)
    const src = portrait ? null : FB[Yi]
    const dX = step / s
    let X = PJ.FW / 2 + (step / 2 - PJ.cu) / s
    let row = ""
    for (let u = 0; u < vw; u += step) {
      let c
      if (X < 0 || X >= PJ.FW) c = side
      else c = portrait ? FB[Math.floor(X)].charAt(Yi) : src.charAt(Math.floor(X))
      row += step === 2 ? c + c : c
      X += dX
    }
    OUT.push(row)
  }
}
// 3D objects, positions in game coordinates (a, b)
const sphere = (a, b, z, r, c) => ({ k: "s", a, b, z, r, c })
const prism = (pts, z, h, top, side) => ({ k: "p", pts, z, h, top, side: side || dk(top) })
const box = (a, b, w, d, z, h, top, side) => prism([[a, b], [a + w, b], [a + w, b + d], [a, b + d]], z, h, top, side)
function cyl(a, b, r, z, h, top, side, n) {
  n = n || 12
  const pts = []
  for (let i = 0; i < n; i++) { const t = (i + 0.5) / n * Math.PI * 2; pts.push([a + Math.cos(t) * r, b + Math.sin(t) * r]) }
  return prism(pts, z, h, top, side)
}
function drawObjects(list) {
  list.forEach((o, i) => {
    o.i = i
    if (o.k === "s") o.depth = toC(o.a, o.b) && (portrait ? o.a : o.b)
    else { let s = 0; for (const p of o.pts) s += portrait ? p[0] : p[1]; o.depth = s / o.pts.length }
  })
  list.sort((x, y) => x.depth - y.depth || x.i - y.i)
  for (const o of list) {
    if (o.k === "s") {
      const f = toC(o.a, o.b), q = P(f[0], f[1], o.z + o.r), R = o.r * q[2]
      discV(q[0], q[1], R, o.c)
      if (R >= 1.6) discV(q[0] - R * 0.35, q[1] - R * 0.35, Math.max(0.7, R * 0.3), "2")
      continue
    }
    const F = o.pts.map(p => toC(p[0], p[1])), n = F.length
    let cx = 0, cy = 0
    for (const p of F) { cx += p[0] / n; cy += p[1] / n }
    const camX = PJ.FW / 2, camY = PJ.FD + PJ.D0
    for (let i = 0; i < n; i++) {
      const p = F[i], q = F[(i + 1) % n]
      let nx = q[1] - p[1], ny = -(q[0] - p[0])
      const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2
      if (nx * (mx - cx) + ny * (my - cy) < 0) { nx = -nx; ny = -ny }
      if (nx * (camX - mx) + ny * (camY - my) <= 0) continue
      const col = Math.abs(nx) > Math.abs(ny) * 1.2 ? dk(o.side) : o.side
      fillPoly([P(p[0], p[1], o.z), P(q[0], q[1], o.z), P(q[0], q[1], o.z + o.h), P(p[0], p[1], o.z + o.h)], col)
    }
    fillPoly(F.map(p => P(p[0], p[1], o.z + o.h)), o.top)
  }
}
function drawGame() {
  if (game.floor) {
    game.floor()
    setupProj(game.tilt || 0.62, 15)
    projectFloor(game.bg || "0", game.side || game.bg || "0")
    drawObjects(game.objects())
    game.hud()
  } else game.draw()
}

const FONT = {
  "0": "111101101101111", "1": "010110010010111", "2": "111001111100111", "3": "111001111001111",
  "4": "101101111001001", "5": "111100111001111", "6": "111100111101111", "7": "111001010010010",
  "8": "111101111101111", "9": "111101111001111",
  "A": "010101111101101", "B": "110101110101110", "C": "011100100100011", "D": "110101101101110",
  "E": "111100110100111", "F": "111100110100100", "G": "011100101101011", "H": "101101111101101",
  "I": "111010010010111", "J": "001001001101010", "K": "101101110101101", "L": "100100100100111",
  "M": "101111111101101", "N": "110101101101101", "O": "010101101101010", "P": "110101110100100",
  "Q": "010101101110011", "R": "110101110101101", "S": "011100010001110", "T": "111010010010010",
  "U": "101101101101111", "V": "101101101101010", "W": "101101111111101", "X": "101101010101101",
  "Y": "101101010010010", "Z": "111001010100111",
  "!": "010010010000010", "?": "110001010000010", ":": "000010000010000", "-": "000000111000000",
  ".": "000000000000010", "/": "001001010100100", ">": "100010001010100", "<": "001010100010001",
  "=": "000111000111000", "%": "101001010100101", " ": "000000000000000"
}
function textV(str, u, v, c, s) {
  s = s || 1
  for (let i = 0; i < str.length; i++) {
    const g = FONT[str[i]] || FONT["?"]
    for (let gy = 0; gy < 5; gy++) {
      let gx = 0
      while (gx < 3) {
        if (g[gy * 3 + gx] === "1") {
          let e = gx
          while (e < 3 && g[gy * 3 + e] === "1") e++
          rectV(u + (i * 4 + gx) * s, v + gy * s, (e - gx) * s, s, c)
          gx = e
        } else gx++
      }
    }
  }
}
const textWidth = (str, s) => (str.length * 4 - 1) * (s || 1)
function textC(str, v, c, s) { textV(str, Math.floor((VW() - textWidth(str, s)) / 2), v, c, s) }

// 80 live screen tiles
const KEYS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&*+-=?@^_~<>/;"
function present() {
  const ents = []
  let rows = OUT
  if (portrait) {
    rows = []
    for (let y = 0; y < 128; y++) {
      const u = 127 - y
      let r = ""
      for (let x = 0; x < 160; x++) r += OUT[x].charAt(u)
      rows.push(r)
    }
  }
  for (let ty = 0; ty < 8; ty++) {
    for (let tx = 0; tx < 10; tx++) {
      let bmp = "\n"
      for (let r = 0; r < 16; r++) bmp += rows[ty * 16 + r].substr(tx * 16, 16) + "\n"
      ents.push([KEYS[ty * 10 + tx], bmp])
    }
  }
  setLegend(...ents)
}

// ------------------------------------------------------------
//  SOUND
// ------------------------------------------------------------
const sfxClick = tune`
40: C6^40,
40`
const sfxBeep = tune`
120: C5-120,
120`
const sfxGo = tune`
300: C6-300,
300`
const sfxHit = tune`
50: G5^50,
50`
const sfxScore = tune`
80: C5^80,
80: E5^80,
80: G5^80,
80`
const sfxWin = tune`
150: C5^150,
150: E5^150,
150: G5^150,
450: C6^450,
300`
const sfxBad = tune`
100: E4-100,
100: C4-100,
100`
const play = t => { try { playTune(t) } catch (e) { } }

// ------------------------------------------------------------
//  INPUT: taps (single presses) + holds
// ------------------------------------------------------------
const KEYLIST = ["w", "a", "s", "d", "i", "j", "k", "l"]
const held = {}, pulseT = {}, lastTap = {}
for (const k of KEYLIST) { held[k] = false; pulseT[k] = 0; lastTap[k] = 0 }
const PULSE = HW ? 180 : 120
let listenerWorks = false
function tap(k) {
  const t = now()
  if (t - lastTap[k] < 25) return
  lastTap[k] = t
  onTap(k)
}
try {
  if (!HW && window.addEventListener) {
    const old = window.__twoPG
    if (old) {
      window.removeEventListener("keydown", old.down)
      window.removeEventListener("keyup", old.up)
      window.removeEventListener("blur", old.blur)
    }
    const down = e => {
      const k = (e.key || "").toLowerCase()
      if (!(k in held)) return
      listenerWorks = true
      held[k] = true
      if (!e.repeat) tap(k)
    }
    const up = e => { const k = (e.key || "").toLowerCase(); if (k in held) held[k] = false }
    const blur = () => { for (const k of KEYLIST) held[k] = false }
    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)
    window.addEventListener("blur", blur)
    window.__twoPG = { down, up, blur }
  }
} catch (e) { }
for (const k of KEYLIST) onInput(k, () => { pulseT[k] = now() + PULSE; if (!listenerWorks) tap(k) })
const isDown = k => held[k] || now() < pulseT[k]

// player 0 = BLUE (left pad), 1 = RED (right pad)
const CTRL = [{ up: "w", down: "s", act: "d", back: "a" }, { up: "i", down: "k", act: "j", back: "l" }]
const owner = k => "wasd".indexOf(k) >= 0 ? 0 : 1
// movement across the field (b axis), works in both orientations
function acrossDir(p) {
  const c = CTRL[p]
  let d = (isDown(c.down) ? 1 : 0) - (isDown(c.up) ? 1 : 0)
  if (portrait && p === 1) d = -d
  return d
}
// movement along the field (a axis, toward/away from the other player)
function alongDir(p) {
  return p === 0 ? (isDown("d") ? 1 : 0) - (isDown("a") ? 1 : 0)
                 : (isDown("l") ? 1 : 0) - (isDown("j") ? 1 : 0)
}
const isHuman = p => !(vsBot && p === 0)
const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x))
const rnd = (lo, hi) => lo + Math.random() * (hi - lo)
// bot difficulty: 0 easy, 1 normal, 2 hard
let diff = 1
const byDiff = (e, n, h) => diff === 0 ? e : diff === 1 ? n : h
// per-game settings
function opt(name) {
  for (const o of game.opts || []) if (o.name === name) return o.vals[o.i]
  return null
}

// ------------------------------------------------------------
//  SHARED HUD HELPERS
// ------------------------------------------------------------
function drawScores(s0, s1) {
  const t0 = String(s0), t1 = String(s1)
  if (!portrait) {
    textV(t0, 72 - textWidth(t0, 2), 5, BLUE, 2)
    textV(t1, 89, 5, RED, 2)
  } else {
    textV(t0, 5, 66, BLUE, 2)
    textV(t1, 5, 84, RED, 2)
  }
}
// small text at a player's own side of the screen
function sideText(p, str, line, c) {
  if (!portrait) {
    const u = p === 0 ? 3 : 157 - textWidth(str)
    textV(str, u, 3 + line * 7, c || TEAM[p])
  } else {
    textV(str, 3, p === 0 ? 3 + line * 7 : 152 - line * 7, c || TEAM[p])
  }
}
function playerName(p) { return vsBot ? (p === 1 ? "YOU" : "BOT") : TEAM_NAME[p] }

// aiming + power meter shared by Pool and Golf
function newAim(ang) { return { phase: "aim", ang: ang, power: 0, t: 0 } }
function aimUpdate(A, p, dt) {
  if (A.phase === "aim") A.ang += acrossDir(p) * 1.7 * dt
  else { A.t += dt; A.power = (1 - Math.cos(A.t * 3.2)) / 2 }
}
function drawAimLine(a, b, ang, len, c) {
  for (let d = 6; d < len; d += 4) rect(Math.round(a + Math.cos(ang) * d), Math.round(b + Math.sin(ang) * d), 1, 1, c)
}
function drawPowerBar(A, c) {
  if (A.phase !== "power") return
  const w = VW() - 8
  rectV(3, VH() - 6, w + 2, 5, "0")
  rectV(4, VH() - 5, Math.max(1, Math.round(w * A.power)), 3, c)
}

// ============================================================
//  GAME 1: PING PONG
// ============================================================
let G = null
const Pong = {
  name: "PING PONG", spam: false,
  opts: [{ name: "POINTS", vals: [3, 5, 7, 11], i: 1 }, { name: "BALL", vals: ["SLOW", "NORMAL", "FAST"], i: 1 }],
  init() {
    const sp = { SLOW: 60, NORMAL: 78, FAST: 100 }[opt("BALL")]
    G = { s: [0, 0], pad: [64, 64], sp, cap: sp * 3.2 }; pongServe(Math.random() < 0.5 ? 1 : -1) },
  onTap() { },
  update(dt) {
    const PL = 28
    for (let p = 0; p < 2; p++) {
      let d, sp = 135
      if (!isHuman(p)) {
        const tb = G.ball.va < 0 ? G.ball.b + G.ball.vb * byDiff(0, 0.08, 0.15) : 64
        const gap = tb - G.pad[0]
        d = Math.abs(gap) < 3 ? 0 : Math.sign(gap)
        sp = byDiff(62, 92, 125)
      } else d = acrossDir(p)
      G.pad[p] = clamp(G.pad[p] + d * sp * dt, PL / 2 + 1, 127 - PL / 2)
    }
    if (G.wait > 0) { G.wait -= dt; return }
    const bl = G.ball
    for (let s = 0; s < 4; s++) {
      bl.a += bl.va * dt / 4; bl.b += bl.vb * dt / 4
      if (bl.b < 2) { bl.b = 2; bl.vb = Math.abs(bl.vb) }
      if (bl.b > 125) { bl.b = 125; bl.vb = -Math.abs(bl.vb) }
      if (bl.va < 0 && bl.a <= 11 && bl.a >= 5 && Math.abs(bl.b - G.pad[0]) <= PL / 2 + 2) {
        bl.va = Math.min(G.cap, -bl.va * 1.07); bl.vb += (bl.b - G.pad[0]) * 5; bl.a = 11; play(sfxHit)
      }
      if (bl.va > 0 && bl.a >= 148 && bl.a <= 154 && Math.abs(bl.b - G.pad[1]) <= PL / 2 + 2) {
        bl.va = -Math.min(G.cap, bl.va * 1.07); bl.vb += (bl.b - G.pad[1]) * 5; bl.a = 148; play(sfxHit)
      }
      bl.vb = clamp(bl.vb, -150, 150)
      if (bl.a < -3 || bl.a > 163) {
        const sc = bl.a < 0 ? 1 : 0
        G.s[sc]++
        play(sfxScore)
        if (G.s[sc] >= opt("POINTS")) return endGame(sc)
        pongServe(sc === 1 ? -1 : 1)
        return
      }
    }
  },
  bg: "0", tilt: 0.6,
  floor() {
    clear("0")
    rect(2, 2, 156, 124, "4")
    rect(2, 2, 156, 2, "2"); rect(2, 124, 156, 2, "2"); rect(2, 2, 2, 124, "2"); rect(156, 2, 2, 124, "2")
    rect(4, 63, 152, 1, "2")
    disc(G.ball.a + 1, G.ball.b + 1, 2.5, "D")
    rect(9, G.pad[0] - 13, 3, 28, "D"); rect(150, G.pad[1] - 13, 3, 28, "D")
  },
  objects() {
    const o = [], bl = G.ball
    for (let i = 0; i < 8; i++) o.push(box(79, 2 + i * 15.5, 2, 15.5, 0, 7, "2", "1"))
    o.push(box(8, G.pad[0] - 14, 3, 28, 0, 7, BLUE), box(149, G.pad[1] - 14, 3, 28, 0, 7, RED))
    const z = G.wait > 0 ? 1 : 1 + 14 * Math.abs(Math.cos(Math.PI * (bl.a - 80) / 160))
    o.push(sphere(bl.a, bl.b, z, 2.5, "2"))
    return o
  },
  hud() { drawScores(G.s[0], G.s[1]) }
}
function pongServe(dir) { G.ball = { a: 80, b: rnd(30, 98), va: dir * G.sp, vb: rnd(-45, 45) }; G.wait = 1 }

// ============================================================
//  GAME 2: GOLF (random mini golf, fewest strokes wins)
// ============================================================
const GOLF_MAX = 8
const GOLF_THEMES = ["OPEN", "ZIGZAG", "BUMPERS", "POND", "MIXED", "TUNNEL"]
const Golf = {
  name: "GOLF", spam: false,
  opts: [{ name: "HOLES", vals: [1, 3, 5, 9, 18], i: 1 }],
  init() { G = { hole: 0, total: [0, 0], msg: "", msgT: 0 }; golfNewHole() },
  onTap(k) {
    if (G.rolling || G.holeDone > 0) return
    const p = owner(k)
    if (p !== G.turn || !isHuman(p) || k !== CTRL[p].act) return
    if (G.A.phase === "aim") { G.A.phase = "power"; G.A.t = 0 }
    else golfShoot(G.A.ang, G.A.power)
  },
  update(dt) {
    if (G.msgT > 0) G.msgT -= dt
    if (G.holeDone > 0) {
      G.holeDone -= dt
      if (G.holeDone <= 0) {
        G.total[0] += G.strokes[0]; G.total[1] += G.strokes[1]
        G.hole++
        if (G.hole >= opt("HOLES")) return endGame(G.total[0] < G.total[1] ? 0 : G.total[1] < G.total[0] ? 1 : -1)
        golfNewHole()
      }
      return
    }
    if (G.rolling) {
      const bl = G.balls[G.turn]
      for (let s = 0; s < 8; s++) {
        if (golfStep(bl, dt / 8)) { bl.in = true; play(sfxScore); G.msg = G.strokes[G.turn] === 1 ? "HOLE IN ONE!" : "IN!"; G.msgT = 1; break }
        if (bl.wet) break
      }
      if (bl.wet) {
        bl.wet = false; bl.a = bl.fa; bl.b = bl.fb; bl.va = bl.vb = 0
        G.strokes[G.turn]++
        G.msg = "SPLASH! +1"; G.msgT = 1.2; play(sfxBad)
      }
      if (bl.in || (bl.va === 0 && bl.vb === 0)) {
        G.rolling = false
        if (!bl.in && G.strokes[G.turn] >= GOLF_MAX) { bl.in = true; play(sfxBad) }
        golfNextTurn()
      }
      return
    }
    if (!isHuman(G.turn)) {
      G.botT += dt
      if (!G.plan) G.plan = golfPlan(G.balls[0])
      G.A.ang += clamp(angDiff(G.plan.ang, G.A.ang), -2 * dt, 2 * dt)
      if (G.botT > 1.2) { G.A.phase = "power"; G.A.power = Math.min(G.plan.power, (G.botT - 1.2) * 1.5) }
      if (G.botT > 1.2 + G.plan.power / 1.5 + 0.15) golfShoot(G.plan.ang, G.plan.power)
      return
    }
    aimUpdate(G.A, G.turn, dt)
  },
  bg: "0", tilt: 0.66,
  floor() {
    const C = G.course
    clear("4")
    for (const w of C.water) { disc(w.a, w.b, w.r, "5"); disc(w.a - w.r * 0.3, w.b - w.r * 0.3, w.r * 0.25, "7") }
    for (const s of C.sand) disc(s.a, s.b, s.r, "6")
    for (const r of C.walls) rect(r.a + 2, r.b + 2, r.w, r.h, "D")
    for (const u of C.bumpers) disc(u.a + 1.5, u.b + 1.5, u.r, "D")
    disc(C.tee.a, C.tee.b, 3, "D")
    disc(C.cup.a, C.cup.b, 4, "0")
    for (let p = 0; p < 2; p++) { const bl = G.balls[p]; if (!bl.in) disc(bl.a + 1, bl.b + 1, 2.2, "D") }
    if (!G.rolling && G.holeDone <= 0) { const bl = G.balls[G.turn]; drawAimLine(bl.a, bl.b, G.A.ang, 40, TEAM[G.turn]) }
  },
  objects() {
    const C = G.course, o = []
    o.push(box(0, 0, 160, 4, 0, 5, "C"), box(0, 124, 160, 4, 0, 5, "C"), box(0, 4, 4, 120, 0, 5, "C"), box(156, 4, 4, 120, 0, 5, "C"))
    for (const r of C.walls) o.push(box(r.a, r.b, r.w, r.h, 0, 7, "1", "L"))
    for (const u of C.bumpers) o.push(cyl(u.a, u.b, u.r, 0, 6, "8", "H", 10))
    o.push(box(C.cup.a - 0.6, C.cup.b - 0.6, 1.2, 1.2, 0, 20, "2", "1"), box(C.cup.a + 0.6, C.cup.b - 0.5, 7, 1, 14, 6, "6", "9"))
    for (let p = 0; p < 2; p++) { const bl = G.balls[p]; if (!bl.in) o.push(sphere(bl.a, bl.b, 0, 2.4, TEAM[p])) }
    return o
  },
  hud() {
    if (!G.rolling && G.holeDone <= 0) drawPowerBar(G.A, TEAM[G.turn])
    textV("HOLE " + (G.hole + 1) + "/" + opt("HOLES"), 2, 2, "2")
    textV(String(G.total[0] + G.strokes[0]), VW() - 30, 2, BLUE)
    textV("-", VW() - 20, 2, "2")
    textV(String(G.total[1] + G.strokes[1]), VW() - 12, 2, RED)
    if (G.msgT > 0) textC(G.msg, VH() / 2 - 5, "2", 2)
    else if (G.holeDone > 0) textC("HOLE DONE!", VH() / 2 - 5, "2", 2)
    else if (!G.rolling) textC(playerName(G.turn) + (isHuman(G.turn) ? " SHOT" : " AIMING"), 9, TEAM[G.turn])
  }
}
// is (a,b) inside something solid or wet? r = clearance
function golfBlocked(a, b, r, C) {
  for (const w of C.walls) if (a > w.a - r && a < w.a + w.w + r && b > w.b - r && b < w.b + w.h + r) return true
  for (const u of C.bumpers) if ((a - u.a) * (a - u.a) + (b - u.b) * (b - u.b) < (u.r + r) * (u.r + r)) return true
  for (const w of C.water) if ((a - w.a) * (a - w.a) + (b - w.b) * (b - w.b) < (w.r + r) * (w.r + r)) return true
  return false
}
function golfMakeCourse() {
  const flip = Math.random() < 0.5
  const theme = GOLF_THEMES[Math.floor(Math.random() * GOLF_THEMES.length)]
  const C = { theme, walls: [], bumpers: [], sand: [], water: [],
    tee: { a: flip ? 144 : 16, b: rnd(24, 104) }, cup: { a: flip ? 16 : 144, b: rnd(20, 108) } }
  const addWall = (a, b, w, h) => C.walls.push({ a: Math.round(a), b: Math.round(b), w: Math.round(w), h: Math.round(h) })
  if (theme === "OPEN" || theme === "MIXED") {
    const n = theme === "OPEN" ? 1 + Math.floor(Math.random() * 2) : 2
    for (let i = 0; i < n; i++) {
      const v = Math.random() < 0.7
      const w = v ? rnd(5, 9) : rnd(20, 40), h = v ? rnd(22, 48) : rnd(5, 9)
      addWall(rnd(36, 120 - w), rnd(4, 124 - h), w, h)
    }
    C.sand.push({ a: rnd(45, 115), b: rnd(20, 108), r: rnd(7, 13) })
  }
  if (theme === "ZIGZAG") {
    const n = 2 + Math.floor(Math.random() * 2)
    for (let i = 0; i < n; i++) {
      const a = 40 + (i + 0.5) * (80 / n) - 3, h = rnd(70, 84)
      if ((i + (Math.random() < 0.5 ? 0 : 1)) % 2) addWall(a, 4, 6, h); else addWall(a, 124 - h, 6, h)
    }
  }
  if (theme === "BUMPERS" || theme === "MIXED") {
    const n = theme === "BUMPERS" ? 6 + Math.floor(Math.random() * 5) : 3
    for (let i = 0; i < n; i++) C.bumpers.push({ a: rnd(38, 122), b: rnd(14, 114), r: rnd(3.5, 6.5) })
  }
  if (theme === "POND" || theme === "MIXED") {
    const big = theme === "POND"
    C.water.push({ a: rnd(60, 100), b: rnd(35, 93), r: big ? rnd(18, 28) : rnd(8, 12) })
    if (big && Math.random() < 0.5) C.water.push({ a: rnd(45, 115), b: rnd(20, 108), r: rnd(7, 11) })
    if (big) C.sand.push({ a: rnd(45, 115), b: rnd(20, 108), r: rnd(6, 10) })
  }
  if (theme === "TUNNEL") {
    const gap = rnd(22, 34), mid = rnd(30 + gap / 2, 98 - gap / 2)
    addWall(50, 4, 60, mid - gap / 2 - 4)
    addWall(50, mid + gap / 2, 60, 124 - mid - gap / 2)
    if (Math.random() < 0.6) C.bumpers.push({ a: 80, b: mid + rnd(-4, 4), r: 3.5 })
    C.sand.push({ a: rnd(20, 40), b: rnd(20, 108), r: rnd(6, 10) })
  }
  return C
}
function golfReachable(C) {
  if (golfBlocked(C.cup.a, C.cup.b, 6, C) || golfBlocked(C.tee.a, C.tee.b, 7, C)) return false
  const GW = 40, GH = 32, seen = {}
  const q = [[Math.floor(C.tee.a / 4), Math.floor(C.tee.b / 4)]]
  seen[q[0][0] + "," + q[0][1]] = true
  while (q.length) {
    const [x, y] = q.shift()
    if (Math.abs(x * 4 + 2 - C.cup.a) < 5 && Math.abs(y * 4 + 2 - C.cup.b) < 5) return true
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy, key = nx + "," + ny
      if (nx < 1 || ny < 1 || nx >= GW - 1 || ny >= GH - 1 || seen[key]) continue
      if (golfBlocked(nx * 4 + 2, ny * 4 + 2, 3, C)) continue
      seen[key] = true
      q.push([nx, ny])
    }
  }
  return false
}
function golfNewHole() {
  let C = null
  for (let tries = 0; tries < 40 && !C; tries++) {
    const c = golfMakeCourse()
    if (golfReachable(c)) C = c
  }
  if (!C) C = { theme: "OPEN", walls: [], bumpers: [], sand: [], water: [], tee: { a: 16, b: 64 }, cup: { a: 144, b: 64 } }
  G.course = C
  G.balls = [0, 1].map(p => ({ a: C.tee.a, b: C.tee.b + (p === 0 ? -5 : 5), va: 0, vb: 0, in: false, wet: false }))
  G.strokes = [0, 0]
  G.turn = G.hole % 2
  G.rolling = false
  G.holeDone = 0
  G.msg = "HOLE " + (G.hole + 1) + ": " + C.theme; G.msgT = 1.5
  golfResetAim()
}
function golfResetAim() {
  const bl = G.balls[G.turn], C = G.course
  G.A = newAim(Math.atan2(C.cup.b - bl.b, C.cup.a - bl.a))
  G.botT = 0
  G.plan = null
}
function golfShoot(ang, power) {
  const bl = G.balls[G.turn], sp = 40 + power * 230
  bl.fa = bl.a; bl.fb = bl.b
  bl.va = Math.cos(ang) * sp; bl.vb = Math.sin(ang) * sp
  G.strokes[G.turn]++
  G.rolling = true
  play(sfxHit)
}
function golfNextTurn() {
  const B = G.balls
  if (B[0].in && B[1].in) { G.holeDone = 1.6; return }
  const other = 1 - G.turn
  if (!B[other].in) G.turn = other
  golfResetAim()
}
// one physics step; returns true when the ball drops in the cup
function golfStep(bl, h, C) {
  C = C || G.course
  const pa = bl.a, pb = bl.b
  bl.a += bl.va * h; bl.b += bl.vb * h
  if (bl.a < 6) { bl.a = 6; bl.va = Math.abs(bl.va) * 0.8 }
  if (bl.a > 154) { bl.a = 154; bl.va = -Math.abs(bl.va) * 0.8 }
  if (bl.b < 6) { bl.b = 6; bl.vb = Math.abs(bl.vb) * 0.8 }
  if (bl.b > 122) { bl.b = 122; bl.vb = -Math.abs(bl.vb) * 0.8 }
  for (const w of C.walls) {
    if (bl.a > w.a - 2 && bl.a < w.a + w.w + 2 && bl.b > w.b - 2 && bl.b < w.b + w.h + 2) {
      const wasOutA = pa <= w.a - 2 || pa >= w.a + w.w + 2
      if (wasOutA) { bl.va = -bl.va * 0.8; bl.a = pa } else { bl.vb = -bl.vb * 0.8; bl.b = pb }
    }
  }
  for (const u of C.bumpers) {
    const dx = bl.a - u.a, dy = bl.b - u.b, d = Math.sqrt(dx * dx + dy * dy), R = u.r + 2
    if (d < R && d > 0.001) {
      const nx = dx / d, ny = dy / d
      bl.a = u.a + nx * R; bl.b = u.b + ny * R
      const vn = bl.va * nx + bl.vb * ny
      if (vn < 0) { bl.va -= 2 * vn * nx; bl.vb -= 2 * vn * ny; bl.va *= 1.05; bl.vb *= 1.05 }
    }
  }
  for (const w of C.water) {
    if ((bl.a - w.a) * (bl.a - w.a) + (bl.b - w.b) * (bl.b - w.b) < w.r * w.r) { bl.wet = true; bl.va = bl.vb = 0; return false }
  }
  let onSand = false
  for (const s of C.sand) if ((bl.a - s.a) * (bl.a - s.a) + (bl.b - s.b) * (bl.b - s.b) < s.r * s.r) onSand = true
  const sp = Math.sqrt(bl.va * bl.va + bl.vb * bl.vb)
  const dc = Math.sqrt((bl.a - C.cup.a) * (bl.a - C.cup.a) + (bl.b - C.cup.b) * (bl.b - C.cup.b))
  if (dc < 4 && sp < 150) { bl.va = bl.vb = 0; return true }
  const ns = Math.max(0, sp - (onSand ? 280 : 70) * h)
  if (ns < 2) { bl.va = bl.vb = 0 } else { bl.va *= ns / sp; bl.vb *= ns / sp }
  return false
}
function golfPlan(ball) {
  const C = G.course
  const base = Math.atan2(C.cup.b - ball.b, C.cup.a - ball.a)
  let best = { ang: base, power: 0.5, score: 1e9 }
  const angs = HW ? 13 : 25, pows = HW ? 4 : 7
  for (let i = 0; i < angs; i++) {
    const ang = base + (i / (angs - 1) - 0.5) * 3.2
    for (let j = 0; j < pows; j++) {
      const power = 0.15 + 0.85 * j / (pows - 1)
      const sp = 40 + power * 230
      const bl = { a: ball.a, b: ball.b, va: Math.cos(ang) * sp, vb: Math.sin(ang) * sp, wet: false }
      let score = 1e9
      for (let s = 0; s < 300; s++) {
        if (golfStep(bl, 1 / 50, C)) { score = -100 + s * 0.01; break }
        if (bl.wet) { score = 500; break }
        if (bl.va === 0 && bl.vb === 0) break
      }
      if (score > 0 && score < 500) score = Math.sqrt((bl.a - C.cup.a) * (bl.a - C.cup.a) + (bl.b - C.cup.b) * (bl.b - C.cup.b))
      if (score < best.score) best = { ang, power, score }
    }
  }
  const e = byDiff(0.22, 0.06, 0.015)
  best.ang += rnd(-e, e)
  best.power = clamp(best.power + rnd(-e, e), 0.1, 1)
  return best
}

// ============================================================
//  GAME 3: SUMO BATTLE (spam for 20 seconds)
// ============================================================
const Sumo = {
  name: "SUMO BATTLE", spam: true,
  opts: [{ name: "TIME", vals: [10, 20, 30, 60], i: 1 }],
  init() { G = { t: opt("TIME"), c: [0, 0], el: 0, bot: 0.3 } },
  onTap(k) { const p = owner(k); if (isHuman(p) && G.t > 0) G.c[p]++ },
  update(dt) {
    G.t -= dt; G.el += dt
    if (vsBot) { G.bot -= dt; while (G.bot <= 0) { G.c[0]++; G.bot += 1 / botCps() } }
    const contact = sumoContact()
    if (contact - 24 < 80 - 54) return endGame(1)
    if (contact + 24 > 80 + 54) return endGame(0)
    if (G.t <= 0) endGame(G.c[0] > G.c[1] ? 0 : G.c[1] > G.c[0] ? 1 : -1)
  },
  bg: "L", tilt: 0.62,
  floor() {
    clear("L")
    disc(80, 64, 60, "C")
    disc(80, 64, 55, "6")
    rect(70, 54, 2, 20, "2"); rect(88, 54, 2, 20, "2")
    const c = sumoContact()
    disc(c - 11, 66, 12, "9"); disc(c + 15, 66, 12, "9")
  },
  objects() {
    const c = sumoContact(), o = []
    const guy = (a, col) => { o.push(cyl(a, 64, 12, 0, 13, col, dk(col), 14), cyl(a, 64, 12.4, 3, 3, "0", "0", 14), sphere(a, 64, 13, 5.5, "9"), sphere(a, 64, 22, 2.2, "0")) }
    guy(c - 13, BLUE); guy(c + 13, RED)
    return o
  },
  hud() {
    for (let p = 0; p < 2; p++) {
      sideText(p, String(G.c[p]), 0)
      sideText(p, (G.c[p] / Math.max(1, G.el)).toFixed(1) + " CPS", 1)
    }
    const tt = String(Math.max(0, Math.ceil(G.t)))
    if (!portrait) textC(tt, 2, "2", 2)
    else textV(tt, 128 - textWidth(tt, 2) - 3, 75, "2", 2)
    if (G.el < 2) textC("SPAM!", portrait ? 30 : 24, "2", 2)
  }
}
const botCps = () => byDiff(rnd(3.5, 5.5), rnd(5.5, 8.5), rnd(8.5, 11))
function sumoContact() { return 80 - (G.c[1] - G.c[0]) * 1.4 }
function sumoGuy(a, col) {
  disc(a, 64, 12, col)
  rect(a - 12, 62, 24, 4, "0")
  disc(a, 64, 4, "0")
}

// ============================================================
//  GAME 4: POOL (sink your colour, then the black)
// ============================================================
const BR = 3
const POCKETS = [[9, 9], [80, 7], [151, 9], [9, 119], [80, 121], [151, 119]]
const Pool = {
  name: "POOL", spam: false,
  opts: [{ name: "BALLS EACH", vals: [2, 3, 4], i: 2 }],
  init() {
    const balls = [{ a: 40, b: 64, va: 0, vb: 0, k: "cue", c: "2", in: false }]
    const each = opt("BALLS EACH")
    const order = { 2: ["r", "b", "k", "b", "r"], 3: ["r", "b", "r", "k", "b", "r", "b"], 4: ["r", "b", "r", "b", "k", "r", "b", "r", "b"] }[each]
    let i = 0
    for (let row = 0; row < 4; row++) {
      const count = Math.min(row + 1, 3, order.length - i)
      if (count <= 0) break
      for (let j = 0; j < count; j++) {
        const kind = order[i++]
        balls.push({
          a: 105 + row * 5.6, b: 64 + (j - (count - 1) / 2) * 6.6, va: 0, vb: 0, in: false,
          k: kind === "r" ? "red" : kind === "b" ? "blue" : "black",
          c: kind === "r" ? RED : kind === "b" ? BLUE : "0"
        })
      }
    }
    G = { balls, turn: Math.random() < 0.5 ? 0 : 1, rolling: false, sunk: [], msg: "", msgT: 0, botT: 0, plan: null }
    G.A = newAim(0)
  },
  onTap(k) {
    if (G.rolling) return
    const p = owner(k)
    if (p !== G.turn || !isHuman(p) || k !== CTRL[p].act) return
    if (G.A.phase === "aim") { G.A.phase = "power"; G.A.t = 0 }
    else poolShoot(G.A.ang, G.A.power)
  },
  update(dt) {
    if (G.msgT > 0) G.msgT -= dt
    if (G.rolling) {
      for (let s = 0; s < 6; s++) poolStep(dt / 6)
      if (G.balls.every(b => b.in || (b.va === 0 && b.vb === 0))) poolResolve()
      return
    }
    if (!isHuman(G.turn)) {
      G.botT += dt
      if (!G.plan) G.plan = poolPlan()
      G.A.ang += clamp(angDiff(G.plan.ang, G.A.ang), -2 * dt, 2 * dt)
      if (G.botT > 1.3) { G.A.phase = "power"; G.A.power = Math.min(G.plan.power, (G.botT - 1.3) * 1.5) }
      if (G.botT > 1.3 + G.plan.power / 1.5 + 0.15) poolShoot(G.plan.ang, G.plan.power)
      return
    }
    aimUpdate(G.A, G.turn, dt)
  },
  bg: "0", tilt: 0.66,
  floor() {
    clear("C")
    rect(6, 6, 148, 116, "4")
    for (const [a, b] of POCKETS) disc(a, b, 5, "0")
    for (const bl of G.balls) if (!bl.in) disc(bl.a + 1, bl.b + 1, BR, "D")
    if (!G.rolling) { const cue = G.balls[0]; drawAimLine(cue.a, cue.b, G.A.ang, 50, TEAM[G.turn]) }
  },
  objects() {
    const o = []
    o.push(box(14, 0, 60, 6, 0, 5, "C"), box(86, 0, 60, 6, 0, 5, "C"), box(14, 122, 60, 6, 0, 5, "C"), box(86, 122, 60, 6, 0, 5, "C"))
    o.push(box(0, 14, 6, 100, 0, 5, "C"), box(154, 14, 6, 100, 0, 5, "C"))
    for (const bl of G.balls) if (!bl.in) o.push(sphere(bl.a, bl.b, 0, BR, bl.c))
    return o
  },
  hud() {
    if (!G.rolling) drawPowerBar(G.A, TEAM[G.turn])
    const left = p => G.balls.filter(b => b.k === (p === 0 ? "blue" : "red") && !b.in).length
    textV(String(left(0)), 3, 2, BLUE)
    textV(String(left(1)), VW() - 6, 2, RED)
    textC(playerName(G.turn) + (G.rolling ? "" : (isHuman(G.turn) ? " SHOT" : " AIMING")), 2, TEAM[G.turn])
    if (G.msgT > 0) textC(G.msg, VH() / 2 - 5, "2", 2)
  }
}
function angDiff(a, b) {
  let d = (a - b) % (Math.PI * 2)
  if (d > Math.PI) d -= Math.PI * 2
  if (d < -Math.PI) d += Math.PI * 2
  return d
}
function poolShoot(ang, power) {
  const cue = G.balls[0], sp = 50 + power * 280
  cue.va = Math.cos(ang) * sp; cue.vb = Math.sin(ang) * sp
  G.rolling = true
  G.sunk = []
  G.ownBefore = G.balls.filter(b => b.k === (G.turn === 0 ? "blue" : "red") && !b.in).length
  play(sfxHit)
}
function nearPocket(a, b) { for (const [pa, pb] of POCKETS) if (Math.abs(a - pa) < 9 && Math.abs(b - pb) < 9) return true; return false }
function poolStep(h) {
  const B = G.balls
  for (const bl of B) {
    if (bl.in) continue
    bl.a += bl.va * h; bl.b += bl.vb * h
    const sp = Math.sqrt(bl.va * bl.va + bl.vb * bl.vb)
    if (sp > 0) {
      const ns = Math.max(0, sp - 75 * h)
      if (ns < 1.5) { bl.va = bl.vb = 0 } else { bl.va *= ns / sp; bl.vb *= ns / sp }
    }
    for (const [pa, pb] of POCKETS) {
      if ((bl.a - pa) * (bl.a - pa) + (bl.b - pb) * (bl.b - pb) < 36) {
        bl.in = true; bl.va = bl.vb = 0; G.sunk.push(bl); play(sfxScore)
      }
    }
    if (bl.in) continue
    if (!nearPocket(bl.a, bl.b)) {
      if (bl.a < 6 + BR) { bl.a = 6 + BR; bl.va = Math.abs(bl.va) * 0.8 }
      if (bl.a > 154 - BR) { bl.a = 154 - BR; bl.va = -Math.abs(bl.va) * 0.8 }
      if (bl.b < 6 + BR) { bl.b = 6 + BR; bl.vb = Math.abs(bl.vb) * 0.8 }
      if (bl.b > 122 - BR) { bl.b = 122 - BR; bl.vb = -Math.abs(bl.vb) * 0.8 }
    }
  }
  for (let i = 0; i < B.length; i++) {
    const A = B[i]
    if (A.in) continue
    for (let j = i + 1; j < B.length; j++) {
      const C = B[j]
      if (C.in) continue
      const dx = C.a - A.a, dy = C.b - A.b, d2 = dx * dx + dy * dy
      if (d2 >= 4 * BR * BR || d2 === 0) continue
      const d = Math.sqrt(d2), nx = dx / d, ny = dy / d
      const ov = (2 * BR - d) / 2
      A.a -= nx * ov; A.b -= ny * ov; C.a += nx * ov; C.b += ny * ov
      const vn = (C.va - A.va) * nx + (C.vb - A.vb) * ny
      if (vn < 0) {
        A.va += vn * nx * 0.96; A.vb += vn * ny * 0.96
        C.va -= vn * nx * 0.96; C.vb -= vn * ny * 0.96
      }
    }
  }
}
function poolResolve() {
  G.rolling = false
  const p = G.turn, own = p === 0 ? "blue" : "red", opp = p === 0 ? "red" : "blue"
  const cue = G.balls[0]
  const cueIn = cue.in
  if (G.sunk.some(b => b.k === "black")) {
    if (!cueIn && G.ownBefore === 0) return endGame(p)
    return endGame(1 - p)
  }
  const sunkOwn = G.sunk.some(b => b.k === own), sunkOpp = G.sunk.some(b => b.k === opp)
  if (cueIn) {
    cue.in = false; cue.va = cue.vb = 0; cue.a = 40; cue.b = 64
    while (G.balls.some(b => b !== cue && !b.in && Math.abs(b.a - cue.a) < 7 && Math.abs(b.b - cue.b) < 7)) cue.b += 7
    G.msg = "SCRATCH!"; G.msgT = 1.2; play(sfxBad)
    G.turn = 1 - p
  } else if (sunkOwn && !sunkOpp) {
    G.msg = "NICE!"; G.msgT = 0.8
  } else G.turn = 1 - p
  G.botT = 0; G.plan = null
  G.A = newAim(G.A.ang)
}
function poolPlan() {
  const B = G.balls, cue = B[0], own = G.turn === 0 ? "blue" : "red"
  let targets = B.filter(b => b.k === own && !b.in)
  if (!targets.length) targets = B.filter(b => b.k === "black" && !b.in)
  let best = null
  for (const t of targets) {
    for (const [pa, pb] of POCKETS) {
      let dx = pa - t.a, dy = pb - t.b
      const dp = Math.sqrt(dx * dx + dy * dy); dx /= dp; dy /= dp
      const ga = t.a - dx * 2 * BR, gb = t.b - dy * 2 * BR
      let ax = ga - cue.a, ay = gb - cue.b
      const dg = Math.sqrt(ax * ax + ay * ay); ax /= dg; ay /= dg
      const cut = ax * dx + ay * dy
      if (cut < 0.35) continue
      let blocked = false
      for (const o of B) {
        if (o === cue || o === t || o.in) continue
        const ox = o.a - cue.a, oy = o.b - cue.b
        const along = ox * ax + oy * ay
        if (along > 0 && along < dg && Math.abs(ox * ay - oy * ax) < 2 * BR + 0.5) blocked = true
      }
      if (blocked) continue
      const score = cut * 2 - (dg + dp) / 150
      if (!best || score > best.score) best = { score, ang: Math.atan2(ay, ax), power: clamp(0.35 + (dg + dp) / 260, 0.35, 0.95) }
    }
  }
  if (!best) {
    const t = targets[0] || B[1]
    best = { ang: Math.atan2(t.b - cue.b, t.a - cue.a), power: 0.6 }
  }
  if (diff === 0 && Math.random() < 0.3) best.ang += rnd(-0.5, 0.5)
  best.ang += rnd(-1, 1) * byDiff(0.12, 0.04, 0.008)
  return best
}

// ============================================================
//  GAME 5: TIC TAC TOE
// ============================================================
let tttStarter = 1
const TTT_LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
const TicTac = {
  name: "TIC TAC TOE", spam: false,
  opts: [{ name: "ROUNDS", vals: ["1", "BEST OF 3", "BEST OF 5"], i: 0 }],
  init() { G = { wins: [0, 0] }; tttRound() },
  round() {
    tttStarter = 1 - tttStarter
    const wins = G.wins
    G = { wins, cells: [-1, -1, -1, -1, -1, -1, -1, -1, -1], turn: tttStarter, cur: 4, over: false, endT: 0, win: -1, line: null, botT: 0 }
  },
  onTap(k) {
    if (G.over) return
    const p = owner(k)
    if (p !== G.turn || !isHuman(p)) return
    const c = CTRL[p]
    if (k === c.up || k === c.down) {
      let step = k === c.down ? 1 : -1
      if (portrait && p === 1) step = -step
      for (let i = 1; i <= 9; i++) {
        const idx = ((G.cur + step * i) % 9 + 9) % 9
        if (G.cells[idx] < 0) { G.cur = idx; play(sfxClick); break }
      }
    } else if (k === c.act && G.cells[G.cur] < 0) tttPlace(G.cur)
  },
  update(dt) {
    if (G.over) {
      G.endT += dt
      if (G.endT > 1.4) {
        const need = { "1": 1, "BEST OF 3": 2, "BEST OF 5": 3 }[opt("ROUNDS")]
        if (G.win >= 0) G.wins[G.win]++
        if (G.win >= 0 && G.wins[G.win] >= need) endGame(G.win)
        else if (need === 1) endGame(-1)
        else tttRound()
      }
      return
    }
    if (!isHuman(G.turn)) {
      G.botT += dt
      if (G.botT > 0.7) { G.botT = 0; tttPlace(tttBest()) }
    }
  },
  bg: "0", tilt: 0.7,
  floor() {
    clear("C")
    const gu = Math.floor((VW() - 90) / 2), gv = Math.floor((VH() - 90) / 2) + 4
    rectF(gu - 4, gv - 4, 98, 98, "2")
    if (G.line) for (const i of G.line) rectF(gu + (i % 3) * 30, gv + Math.floor(i / 3) * 30, 30, 30, "6")
    if (!G.over) {
      const cu = gu + (G.cur % 3) * 30, cv = gv + Math.floor(G.cur / 3) * 30, col = TEAM[G.turn]
      rectF(cu + 2, cv + 2, 26, 3, col); rectF(cu + 2, cv + 25, 26, 3, col)
      rectF(cu + 2, cv + 2, 3, 26, col); rectF(cu + 25, cv + 2, 3, 26, col)
    }
    rectF(gu + 29, gv, 2, 90, "0"); rectF(gu + 59, gv, 2, 90, "0")
    rectF(gu, gv + 29, 90, 2, "0"); rectF(gu, gv + 59, 90, 2, "0")
  },
  objects() {
    const o = []
    const gu = Math.floor((VW() - 90) / 2), gv = Math.floor((VH() - 90) / 2) + 4
    for (let i = 0; i < 9; i++) {
      const X = gu + (i % 3) * 30 + 15, Y = gv + Math.floor(i / 3) * 30 + 15
      if (G.cells[i] === 1) {
        for (const ang of [Math.PI / 4, -Math.PI / 4]) {
          const ca = Math.cos(ang), sa = Math.sin(ang)
          const pts = [[-11, -2.5], [11, -2.5], [11, 2.5], [-11, 2.5]].map(([l, s]) => toC(X + ca * l - sa * s, Y + sa * l + ca * s))
          o.push(prism(pts, 0, 5, RED))
        }
      } else if (G.cells[i] === 0) {
        const [a, b] = toC(X, Y)
        o.push(cyl(a, b, 10, 0, 5, BLUE, "5", 16), cyl(a, b, 6, 5, 0.01, G.line && G.line.indexOf(i) >= 0 ? "6" : "2", "2", 16))
      }
    }
    return o
  },
  hud() {
    if (!G.over) textC(playerName(G.turn) + (isHuman(G.turn) ? " TURN" : " THINKING"), 4, TEAM[G.turn])
    if (opt("ROUNDS") !== "1") { textV(String(G.wins[0]), 3, VH() - 8, BLUE); textV(String(G.wins[1]), VW() - 6, VH() - 8, RED) }
  }
}
function tttRound() { TicTac.round() }
function tttWinner(c) {
  for (const L of TTT_LINES) if (c[L[0]] >= 0 && c[L[0]] === c[L[1]] && c[L[1]] === c[L[2]]) return { p: c[L[0]], line: L }
  return null
}
function tttPlace(i) {
  G.cells[i] = G.turn
  play(sfxHit)
  const w = tttWinner(G.cells)
  if (w) { G.over = true; G.win = w.p; G.line = w.line; return }
  if (G.cells.every(x => x >= 0)) { G.over = true; G.win = -1; return }
  G.turn = 1 - G.turn
  for (let j = 0; j < 9; j++) if (G.cells[(4 + j) % 9] < 0) { G.cur = (4 + j) % 9; break }
}
function tttMinimax(c, p, me) {
  const w = tttWinner(c)
  if (w) return w.p === me ? 10 : -10
  if (c.every(x => x >= 0)) return 0
  let best = p === me ? -99 : 99
  for (let i = 0; i < 9; i++) if (c[i] < 0) {
    c[i] = p
    const s = tttMinimax(c, 1 - p, me) * 0.9
    c[i] = -1
    best = p === me ? Math.max(best, s) : Math.min(best, s)
  }
  return best
}
function tttBest() {
  const empty = []
  for (let i = 0; i < 9; i++) if (G.cells[i] < 0) empty.push(i)
  if (Math.random() < byDiff(0.55, 0.15, 0)) return empty[Math.floor(Math.random() * empty.length)]
  let best = empty[0], bs = -999
  for (const i of empty) {
    G.cells[i] = G.turn
    const s = tttMinimax(G.cells, 1 - G.turn, G.turn) + Math.random() * 0.1
    G.cells[i] = -1
    if (s > bs) { bs = s; best = i }
  }
  return best
}

// ============================================================
//  GAME 6: AIR HOCKEY
// ============================================================
const MR = 8, PKR = 5, GOAL0 = 44, GOAL1 = 84
const AirHockey = {
  name: "AIR HOCKEY", spam: false,
  opts: [{ name: "GOALS", vals: [3, 5, 7, 10], i: 1 }],
  init() { G = { s: [0, 0] }; ahReset(-1) },
  onTap() { },
  update(dt) {
    for (let p = 0; p < 2; p++) {
      const m = G.m[p]
      let da, db, sp = 150
      if (!isHuman(p)) {
        const pk = G.pk
        let ta, tb
        if (pk.a < 86) {
          ta = pk.a - 9; tb = pk.b
          if (m.a > pk.a - 4) { ta = pk.a - 16; tb = pk.b + (m.b < pk.b ? -15 : 15) }
        } else { ta = 22; tb = clamp(pk.b, 48, 80) }
        const dx = ta - m.a, dy = tb - m.b, d = Math.sqrt(dx * dx + dy * dy)
        da = d > 2 ? dx / d : 0; db = d > 2 ? dy / d : 0
        sp = byDiff(80, 112, 145)
      } else {
        da = alongDir(p); db = acrossDir(p)
        if (da && db) { da *= 0.707; db *= 0.707 }
      }
      const oa = m.a, ob = m.b
      m.a += da * sp * dt; m.b += db * sp * dt
      if (p === 0) m.a = clamp(m.a, 3 + MR, 80 - MR); else m.a = clamp(m.a, 80 + MR, 157 - MR)
      m.b = clamp(m.b, 3 + MR, 125 - MR)
      m.va = (m.a - oa) / Math.max(dt, 0.001); m.vb = (m.b - ob) / Math.max(dt, 0.001)
    }
    if (G.wait > 0) { G.wait -= dt; return }
    const pk = G.pk, h = dt / 6
    for (let s = 0; s < 6; s++) {
      pk.a += pk.va * h; pk.b += pk.vb * h
      if (pk.b < 3 + PKR) { pk.b = 3 + PKR; pk.vb = Math.abs(pk.vb) * 0.9 }
      if (pk.b > 125 - PKR) { pk.b = 125 - PKR; pk.vb = -Math.abs(pk.vb) * 0.9 }
      const inMouth = pk.b > GOAL0 && pk.b < GOAL1
      if (pk.a < 3 + PKR && !inMouth) { pk.a = 3 + PKR; pk.va = Math.abs(pk.va) * 0.9 }
      if (pk.a > 157 - PKR && !inMouth) { pk.a = 157 - PKR; pk.va = -Math.abs(pk.va) * 0.9 }
      if (pk.a < -PKR || pk.a > 160 + PKR) {
        const sc = pk.a < 0 ? 1 : 0
        G.s[sc]++
        play(sfxScore)
        if (G.s[sc] >= opt("GOALS")) return endGame(sc)
        return ahReset(1 - sc)
      }
      for (const m of G.m) {
        const dx = pk.a - m.a, dy = pk.b - m.b, d = Math.sqrt(dx * dx + dy * dy)
        if (d < MR + PKR && d > 0.01) {
          const nx = dx / d, ny = dy / d
          pk.a = m.a + nx * (MR + PKR); pk.b = m.b + ny * (MR + PKR)
          const vn = (pk.va - m.va) * nx + (pk.vb - m.vb) * ny
          if (vn < 0) { pk.va -= 1.9 * vn * nx; pk.vb -= 1.9 * vn * ny; play(sfxHit) }
        }
      }
    }
    const sp = Math.sqrt(pk.va * pk.va + pk.vb * pk.vb)
    if (sp > 300) { pk.va *= 300 / sp; pk.vb *= 300 / sp }
    pk.va *= 1 - 0.3 * dt; pk.vb *= 1 - 0.3 * dt
  },
  bg: "0", tilt: 0.62,
  floor() {
    clear("2")
    disc(0, 64, 24, "1"); disc(0, 64, 22, "2")
    disc(160, 64, 24, "1"); disc(160, 64, 22, "2")
    disc(80, 64, 17, "8"); disc(80, 64, 15, "2")
    rect(79, 0, 2, 128, "8")
    rect(0, GOAL0, 3, GOAL1 - GOAL0, "0"); rect(157, GOAL0, 3, GOAL1 - GOAL0, "0")
    disc(G.pk.a + 1.5, G.pk.b + 1.5, PKR, "1")
    for (const m of G.m) disc(m.a + 1.5, m.b + 1.5, MR, "1")
  },
  objects() {
    const o = [box(0, 0, 160, 3, 0, 6, "1", "L"), box(0, 125, 160, 3, 0, 6, "1", "L"),
      box(0, 3, 3, GOAL0 - 3, 0, 6, BLUE), box(0, GOAL1, 3, 125 - GOAL1, 0, 6, BLUE),
      box(157, 3, 3, GOAL0 - 3, 0, 6, RED), box(157, GOAL1, 3, 125 - GOAL1, 0, 6, RED)]
    o.push(cyl(G.pk.a, G.pk.b, PKR, 0, 2.5, "0", "L", 12))
    for (let p = 0; p < 2; p++) {
      const m = G.m[p]
      o.push(cyl(m.a, m.b, MR, 0, 4, TEAM[p], dk(TEAM[p]), 14), cyl(m.a, m.b, 3.5, 4, 6, TEAM[p], dk(TEAM[p]), 10))
    }
    return o
  },
  hud() { drawScores(G.s[0], G.s[1]) }
}
function ahReset(side) {
  G.m = [{ a: 24, b: 64, va: 0, vb: 0 }, { a: 136, b: 64, va: 0, vb: 0 }]
  G.pk = { a: side === 0 ? 50 : side === 1 ? 110 : 80, b: 64, va: 0, vb: 0 }
  if (side < 0) G.pk.vb = rnd(-30, 30)
  G.wait = 0.6
}

// ============================================================
//  GAME 7: RACERS (Mode 7, random track every race)
// ============================================================
let LAPS = 3
const MW = 64
const RX = HW ? 4 : 2, RY = 2, TR = HW ? 1 : 2
const CAR_ROWS = [
  "................",
  "................",
  "................",
  "................",
  ".....KKKKKK.....",
  "....KLLLLLLK....",
  "...KLLLLLLLLK...",
  "..KKKKKKKKKKKK..",
  ".KKKKKKKKKKKKKK.",
  ".K66KKKKKKKK66K.",
  ".KKKKKKKKKKKKKK.",
  "00KKKKKKKKKKKK00",
  "00KKK0LLLL0KKK00",
  "00............00",
  "................",
  "................"
]
const CAR_ART = TEAM.map(c => CAR_ROWS.map(r => r.split("K").join(c)))
const CAR_LEAN = CAR_ART.map(art => art.map((r, y) => y < 8 ? r.substr(1) + "." : r))
const TREE_ART = [
  "......4444......",
  "....44444444....",
  "...4444D444444..",
  "..44444DD444444.",
  "..444444444D444.",
  ".44444444444D444",
  ".444D44444444444",
  ".44444444444444.",
  "..444444444444..",
  "..44D444444D44..",
  "...4444444444...",
  ".....44444......",
  ".......CC.......",
  ".......CC.......",
  "......CCCC......",
  "................"
]
const PANOS = {}
function getPano(fp) {
  if (PANOS[fp]) return PANOS[fp]
  const PW = Math.round(Math.PI * 2 * fp), rows = []
  const clouds = [0.1, 0.32, 0.55, 0.8].map(x => x * PW)
  for (let y = 0; y < 16; y++) {
    let row = ""
    for (let x = 0; x < PW; x++) {
      const th = x / PW * Math.PI * 2
      const hgt = 7 + 4 * Math.sin(3 * th) + 2 * Math.sin(7 * th + 1)
      let c = "7"
      for (const cx of clouds) {
        let dx = Math.abs(x - cx); if (dx > PW / 2) dx = PW - dx
        const cw = fp / 8
        if ((dx / cw) * (dx / cw) + ((y - 3) / 2.2) * ((y - 3) / 2.2) < 1) c = "2"
      }
      const hy = 15 - y
      if (hy < hgt - 1) c = "4"
      else if (hy < hgt) c = "D"
      row += c
    }
    rows.push(row + row.substr(0, 160))
  }
  PANOS[fp] = { PW, rows }
  return PANOS[fp]
}
function segDist(px, py, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1]
  let t = ((px - a[0]) * dx + (py - a[1]) * dy) / (dx * dx + dy * dy)
  t = clamp(t, 0, 1)
  const ex = a[0] + t * dx - px, ey = a[1] + t * dy - py
  return Math.sqrt(ex * ex + ey * ey)
}
// random track: a wobbly loop, like terrain noise around a circle
function makeTrack() {
  const seed = Math.floor(rnd(1000, 99999))
  let s = seed
  const srand = () => { s = (s * 16807) % 2147483647; return s / 2147483647 }
  const ph = [srand(), srand(), srand(), srand()].map(x => x * Math.PI * 2)
  const amp = [rnd(3, 6), rnd(2, 4), rnd(1, 3), rnd(0.5, 2)].map((x, i) => x * (0.6 + srand() * 0.8))
  const WP = []
  const NWP = 18
  for (let i = 0; i < NWP; i++) {
    const th = i / NWP * Math.PI * 2
    let r = 21 + amp[0] * Math.sin(2 * th + ph[0]) + amp[1] * Math.sin(3 * th + ph[1]) + amp[2] * Math.sin(5 * th + ph[2]) + amp[3] * Math.sin(7 * th + ph[3])
    r = clamp(r, 11, 27)
    WP.push([32 + Math.cos(th) * r, 32 + Math.sin(th) * r])
  }
  const N = WP.length
  const d0x = WP[1][0] - WP[0][0], d0y = WP[1][1] - WP[0][1], d0 = Math.sqrt(d0x * d0x + d0y * d0y)
  const boostSegs = [3, 9, 14].map(i => [(WP[i][0] + WP[i + 1][0]) / 2, (WP[i][1] + WP[i + 1][1]) / 2])
  let types = ""
  const trees = []
  for (let y = 0; y < MW; y++) {
    let row = ""
    for (let x = 0; x < MW; x++) {
      const cx = x + 0.5, cy = y + 0.5
      let d = 1e9
      for (let i = 0; i < N; i++) d = Math.min(d, segDist(cx, cy, WP[i], WP[(i + 1) % N]))
      let t
      if (x < 2 || y < 2 || x >= MW - 2 || y >= MW - 2) t = "w"
      else if (d <= 3.6) {
        t = d <= 2.6 ? "r" : "k"
        const along = ((cx - WP[0][0]) * d0x + (cy - WP[0][1]) * d0y) / d0
        const dw = Math.sqrt((cx - WP[0][0]) * (cx - WP[0][0]) + (cy - WP[0][1]) * (cy - WP[0][1]))
        if (Math.abs(along) < 0.75 && dw < 4.5) t = "f"
        for (const [bx, by] of boostSegs) if (t === "r" && Math.abs(cx - bx) < 1.4 && Math.abs(cy - by) < 1.4) t = "b"
      } else t = "g"
      if (t === "g" && d > 6 && x > 4 && y > 4 && x < MW - 5 && y < MW - 5 && srand() < 0.025 && trees.length < 14) trees.push({ x: cx, y: cy })
      row += t
    }
    types += row
  }
  const TEX = MW * TR
  const texRows = []
  for (let ty = 0; ty < TEX; ty++) {
    let row = ""
    for (let tx = 0; tx < TEX; tx++) {
      const cx = Math.floor(tx / TR), cy = Math.floor(ty / TR)
      const t = types.charAt(cy * MW + cx)
      let c
      if (t === "r") c = "1"
      else if (t === "k") c = ((cx + cy) & 1) ? "3" : "2"
      else if (t === "g") c = (((cx >> 1) + (cy >> 1)) & 1) ? "4" : "D"
      else if (t === "f") c = ((tx + ty) & 1) ? "0" : "2"
      else if (t === "b") c = (((tx + ty) >> 1) & 1) ? "6" : "9"
      else c = (((cx >> 1) + (cy >> 1)) & 1) ? "4" : "D"
      row += c
    }
    texRows.push(row)
  }
  return { seed, WP, N, types, trees, tex: texRows.join(""), TEX }
}
const Racers = {
  name: "RACERS", spam: false,
  opts: [{ name: "LAPS", vals: [1, 3, 5, 10], i: 1 }],
  init() {
    LAPS = opt("LAPS")
    const T = makeTrack()
    const [w0, w1] = [T.WP[0], T.WP[1]]
    const fx = w1[0] - w0[0], fy = w1[1] - w0[1], fl = Math.sqrt(fx * fx + fy * fy)
    const ux = fx / fl, uy = fy / fl
    const ang = Math.atan2(ux, -uy)
    const cars = [0, 1].map(p => {
      const side = p === 0 ? -1.4 : 1.4
      return {
        p, x: w0[0] - ux * 3 - uy * side, y: w0[1] - uy * 3 + ux * side, a: ang, v: 0,
        next: 1, passed: 0, laps: 1, finished: false, turbo: 0, stuck: 0, steer: 0,
        top: isHuman(p) ? 10 : byDiff(8.4, 9.4, 10.1), cam: { x: 0, y: 0, a: ang }
      }
    })
    G = { T, cars, finishOrder: 0 }
    for (const c of cars) snapCam(c)
  },
  onTap() { },
  update(dt) {
    for (const c of G.cars) carStep(c, dt)
    const [A, B] = G.cars
    const dx = A.x - B.x, dy = A.y - B.y, d = Math.sqrt(dx * dx + dy * dy)
    if (d < 1.4 && d > 0.01) {
      const push = (1.4 - d) / 2
      if (!racerBlocked(A.x + dx / d * push, A.y + dy / d * push)) { A.x += dx / d * push; A.y += dy / d * push }
      if (!racerBlocked(B.x - dx / d * push, B.y - dy / d * push)) { B.x -= dx / d * push; B.y -= dy / d * push }
    }
    for (const c of G.cars) {
      c.cam.a += angDiff(c.a, c.cam.a) * Math.min(1, dt * 10)
      snapCam(c, true)
    }
  },
  draw() {
    clearV("0")
    if (vsBot) {
      renderView(G.cars[1], { x0: 0, w: 160, hor: 32, fp: 90, camh: 5, camd: 5.6 })
      racerHud(G.cars[1], 0, 160)
    } else {
      renderView(G.cars[0], { x0: 0, w: 80, hor: 36, fp: 50, camh: 6, camd: 4 })
      renderView(G.cars[1], { x0: 80, w: 80, hor: 36, fp: 50, camh: 6, camd: 4 })
      rectV(79, 0, 2, 128, "0")
      racerHud(G.cars[0], 0, 79)
      racerHud(G.cars[1], 81, 79)
    }
  }
}
function snapCam(c, keepAngle) {
  if (!keepAngle) c.cam.a = c.a
  c.cam.x = c.x; c.cam.y = c.y
}
function racerType(x, y) {
  x = Math.floor(x); y = Math.floor(y)
  if (x < 0 || y < 0 || x >= MW || y >= MW) return "w"
  return G.T.types.charAt(y * MW + x)
}
const racerBlocked = (x, y) => racerType(x, y) === "w"
function racerProgress(c) {
  const T = G.T
  if (c.finished) return 1e6 - c.place
  const prev = T.WP[(c.next - 1 + T.N) % T.N], nx = T.WP[c.next]
  const sl = Math.sqrt((nx[0] - prev[0]) * (nx[0] - prev[0]) + (nx[1] - prev[1]) * (nx[1] - prev[1])) || 1
  const dn = Math.sqrt((c.x - nx[0]) * (c.x - nx[0]) + (c.y - nx[1]) * (c.y - nx[1]))
  return (c.laps * T.N) + c.passed + 1 - Math.min(1, dn / sl)
}
function carStep(c, dt) {
  const T = G.T
  const human = isHuman(c.p) && !c.finished
  let braking = false
  if (human) {
    const L = c.p === 0 ? "a" : "j", R = c.p === 0 ? "d" : "l", Bk = c.p === 0 ? "s" : "k"
    c.steer = (isDown(R) ? 1 : 0) - (isDown(L) ? 1 : 0)
    const grip = Math.min(1, 0.35 + Math.abs(c.v) / 6)
    c.a += c.steer * 2.1 * grip * dt * (c.v < 0 ? -1 : 1)
    braking = isDown(Bk)
  } else {
    const tw = T.WP[c.next]
    const want = Math.atan2(tw[0] - c.x, -(tw[1] - c.y))
    const d = angDiff(want, c.a)
    c.a += clamp(d, -2.6 * dt, 2.6 * dt)
    c.steer = Math.abs(d) > 0.15 ? Math.sign(d) : 0
  }
  const ground = racerType(c.x, c.y)
  if (ground === "b") c.turbo = Math.max(c.turbo, 0.8)
  let top = c.top
  if (!isHuman(c.p)) {
    const diff = racerProgress(c) - racerProgress(G.cars[1])
    top *= diff > 2 ? 0.9 : diff < -2 ? 1.1 : 1
  }
  if (ground === "g") top *= 0.42
  if (c.turbo > 0) { c.turbo -= dt; top = Math.max(top, 15) }
  if (braking) c.v = Math.max(-3, c.v - 16 * dt)
  else if (c.v < top) c.v = Math.min(top, c.v + (c.turbo > 0 ? 25 : 6) * dt)
  else c.v = Math.max(top, c.v - 9 * dt)
  const nx = c.x + Math.sin(c.a) * c.v * dt, ny = c.y - Math.cos(c.a) * c.v * dt
  if (!racerBlocked(nx, ny)) { c.x = nx; c.y = ny }
  else if (!racerBlocked(nx, c.y)) { c.x = nx; c.v *= 0.8 }
  else if (!racerBlocked(c.x, ny)) { c.y = ny; c.v *= 0.8 }
  else c.v = -c.v * 0.3
  for (const t of T.trees) {
    const dx = c.x - t.x, dy = c.y - t.y, d = Math.sqrt(dx * dx + dy * dy)
    if (d < 1.1 && d > 0.01) { c.x = t.x + dx / d * 1.1; c.y = t.y + dy / d * 1.1; if (Math.abs(c.v) > 2) c.v = -c.v * 0.3 }
  }
  if (!human) {
    if (Math.abs(c.v) < 1) c.stuck += dt; else c.stuck = 0
    if (c.stuck > 2) { const p = T.WP[(c.next - 1 + T.N) % T.N]; c.x = p[0]; c.y = p[1]; c.v = 0; c.stuck = 0 }
  }
  // checkpoints
  const R0 = c.next === 0 ? 4.5 : (isHuman(c.p) ? 5 : 3.5)
  const w = T.WP[c.next]
  const dw = Math.sqrt((c.x - w[0]) * (c.x - w[0]) + (c.y - w[1]) * (c.y - w[1]))
  if (dw < R0) {
    if (c.next === 0) {
      c.laps++
      if (c.laps > LAPS && !c.finished) {
        c.finished = true
        c.place = ++G.finishOrder
        if (c.place === 1) { endGame(c.p); return }
      } else if (c.laps === LAPS) play(sfxScore)
    }
    c.passed++
    c.next = (c.next + 1) % T.N
  }
}
function renderView(car, V) {
  const T = G.T, cam = car.cam
  const ca = cam.a, fx = Math.sin(ca), fy = -Math.cos(ca), rx = Math.cos(ca), ry = Math.sin(ca)
  const cx = cam.x - fx * V.camd, cy = cam.y - fy * V.camd
  const half = V.w / 2
  const put = (y, line) => {
    const row = OUT[y]
    OUT[y] = row.substr(0, V.x0) + line + row.substr(V.x0 + V.w)
  }
  // sky
  const P = getPano(V.fp)
  let off = Math.floor((ca / (Math.PI * 2)) * P.PW) % P.PW
  if (off < 0) off += P.PW
  const sky = fillStr("7", V.w)
  for (let y = 0; y < V.hor - 16; y++) put(y, sky)
  for (let y = 0; y < 16; y++) put(V.hor - 16 + y, P.rows[y].substr(off, V.w))
  // ground
  const n = V.w / RX, FAR = 55
  const haze = fillStr("D", V.w)
  for (let j = 0; j < (128 - V.hor) / RY; j++) {
    const p = j * RY + RY / 2
    const z = V.camh * V.fp / p
    let line
    if (z > FAR) line = haze
    else {
      const k = z / V.fp
      const sx = rx * RX * k * TR, sy = ry * RX * k * TR
      let wx = (cx + fx * z - rx * half * k) * TR + sx * 0.5
      let wy = (cy + fy * z - ry * half * k) * TR + sy * 0.5
      line = ""
      for (let i = 0; i < n; i++) {
        const tx = Math.floor(wx), ty = Math.floor(wy)
        const c = (tx >= 0 && ty >= 0 && tx < T.TEX && ty < T.TEX) ? T.tex.charAt(ty * T.TEX + tx) : ((((Math.floor(tx / TR) >> 1) + (Math.floor(ty / TR) >> 1)) & 1) ? "4" : "D")
        line += RX === 2 ? c + c : c + c + c + c
        wx += sx; wy += sy
      }
    }
    for (let r = 0; r < RY; r++) { const y = V.hor + j * RY + r; if (y < 128) put(y, line) }
  }
  // billboards
  const bills = []
  const add = (x, y, art, size, flip) => {
    const dx = x - cx, dy = y - cy, d = dx * fx + dy * fy
    if (d < 1.2 || d > FAR) return
    const l = dx * rx + dy * ry
    bills.push({ d, sx: V.x0 + half + l * V.fp / d, gy: V.hor + V.camh * V.fp / d, size: size * V.fp / d, art, flip })
  }
  for (const t of T.trees) add(t.x, t.y, TREE_ART, 4, false)
  for (const o of G.cars) if (o !== car) add(o.x, o.y, o.steer ? CAR_LEAN[o.p] : CAR_ART[o.p], 2, o.steer > 0)
  bills.sort((a, b) => b.d - a.d)
  for (const b of bills) spriteClip(b.art, b.sx, b.gy, b.size, b.flip, V.x0, V.x0 + V.w)
  // own car
  const bounce = (car.turbo > 0 || racerType(car.x, car.y) === "g") && Math.floor(now() / 80) % 2 ? 1 : 0
  const own = car.steer ? CAR_LEAN[car.p] : CAR_ART[car.p]
  spriteClip(own, V.x0 + half, V.hor + V.camh * V.fp / V.camd - bounce, 2 * V.fp / V.camd, car.steer > 0, V.x0, V.x0 + V.w)
}
function spriteClip(art, cx, gy, size, flip, xMin, xMax) {
  const s = Math.round(size)
  if (s < 2) return
  const top = Math.round(gy - s * 14 / 16), left = Math.round(cx - s / 2)
  const x0 = Math.max(xMin, left), x1 = Math.min(xMax, left + s)
  if (x0 >= x1) return
  for (let dy = 0; dy < s; dy++) {
    const y = top + dy
    if (y < 0 || y > 127) continue
    const srow = art[Math.floor(dy * 16 / s)], line = OUT[y]
    let seg = ""
    for (let x = x0; x < x1; x++) {
      let sx = Math.floor((x - left) * 16 / s)
      if (flip) sx = 15 - sx
      const c = srow.charAt(sx)
      seg += c === "." ? line.charAt(x) : c
    }
    OUT[y] = line.substr(0, x0) + seg + line.substr(x1)
  }
}
function racerHud(car, x0, w) {
  const other = G.cars[1 - car.p]
  const place = racerProgress(car) >= racerProgress(other) ? "1ST" : "2ND"
  textV("LAP " + Math.min(LAPS, car.laps) + "/" + LAPS, x0 + 2, 2, "2")
  textV(place, x0 + w - textWidth(place) - 2, 2, place === "1ST" ? "6" : "2")
}

// ============================================================
//  GAME 9: DRIFT BOSS (hold = drift right, release = drift left)
//  Both players drive the same endless floating road. Fall off
//  and your run ends. Highest score wins.
// ============================================================
const DriftBoss = {
  name: "DRIFT BOSS", spam: false,
  opts: [{ name: "SPEED", vals: ["SLOW", "NORMAL", "FAST"], i: 1 }],
  init() {
    G = { rng: Math.floor(rnd(1, 2147483000)), path: [], index: {}, dir: 1, segLeft: 0, t: 0 }
    for (let i = 0; i < 7; i++) dbAdd(0, i)
    dbExtend(90)
    const v0 = { SLOW: 2.3, NORMAL: 2.9, FAST: 3.5 }[opt("SPEED")]
    G.cars = [0, 1].map(p => ({
      p, x: 0.5, y: 0.5, h: Math.PI / 2, vang: Math.PI / 2, v: v0, z: 0, vz: 0,
      fall: false, done: false, best: 0, coins: 0, got: {}, hold: false,
      trail: [], trailT: 0, cam: { x: 0.5, y: 0.5 }, botQ: []
    }))
  },
  onTap(k) {
    const p = owner(k)
    // no hold detection (real Sprig): each tap flips the drift direction
    if (!listenerWorks && isHuman(p) && G.cars) G.cars[p].hold = !G.cars[p].hold
  },
  update(dt) {
    G.t += dt
    let far = 0
    for (const c of G.cars) {
      if (isHuman(c.p) && listenerWorks) {
        const keys = c.p === 0 ? "wasd" : "ijkl"
        c.hold = false
        for (const k of keys) if (held[k]) c.hold = true
      } else if (!isHuman(c.p)) dbBot(c)
      dbStep(c, dt)
      c.cam.x += (c.x - c.cam.x) * Math.min(1, dt * 5)
      c.cam.y += (c.y - c.cam.y) * Math.min(1, dt * 5)
      far = Math.max(far, c.best)
    }
    dbExtend(far + 60)
    const [b, r] = G.cars, sb = dbScore(b), sr = dbScore(r)
    if (b.done && r.done) endGame(sb > sr ? 0 : sr > sb ? 1 : -1)
    else if (b.done && sr > sb) endGame(1)
    else if (r.done && sb > sr) endGame(0)
  },
  draw() {
    clearV("7")
    if (portrait) dbView(G.cars[1], 0, 128, 160, 9)
    else if (vsBot) dbView(G.cars[1], 0, 160, 128, 9)
    else {
      dbView(G.cars[0], 0, 79, 128, 7)
      dbView(G.cars[1], 81, 79, 128, 7)
      rectV(79, 0, 2, 128, "0")
    }
  }
}
function dbRand() { G.rng = (G.rng * 16807) % 2147483647; return G.rng / 2147483647 }
function dbAdd(x, y) {
  const i = G.path.length
  G.path.push({ x, y, coin: i > 10 && dbRand() < 0.14 })
  G.index[x + "," + y] = i
}
function dbExtend(n) {
  const P = G.path
  while (P.length < n) {
    if (G.segLeft <= 0) {
      G.dir = 1 - G.dir
      const maxL = P.length < 60 ? 6 : P.length < 160 ? 5 : 4
      G.segLeft = 2 + Math.floor(dbRand() * (maxL - 1))
    }
    const last = P[P.length - 1]
    dbAdd(last.x + (G.dir === 0 ? 1 : 0), last.y + (G.dir === 1 ? 1 : 0))
    G.segLeft--
  }
}
const dbScore = c => c.best + c.coins * 5
// which road tile is under (x, y)? a little edge tolerance so it feels fair
function dbCell(x, y) {
  const e = 0.13
  for (const [ox, oy] of [[0, 0], [e, 0], [-e, 0], [0, e], [0, -e]]) {
    const i = G.index[Math.floor(x + ox) + "," + Math.floor(y + oy)]
    if (i !== undefined) return i
  }
  return undefined
}
function dbStep(c, dt) {
  if (c.done) return
  if (c.fall) {
    c.vz -= 16 * dt; c.z += c.vz * dt
    c.x += Math.cos(c.vang) * c.v * dt * 0.7; c.y += Math.sin(c.vang) * c.v * dt * 0.7
    c.h += 4 * dt
    if (c.z < -5) { c.done = true; if (isHuman(c.p)) play(sfxBad) }
    return
  }
  const target = c.hold ? 0 : Math.PI / 2
  c.h += clamp(target - c.h, -9 * dt, 9 * dt)
  c.vang += clamp(c.h - c.vang, -8 * dt, 8 * dt)
  c.x += Math.cos(c.vang) * c.v * dt
  c.y += Math.sin(c.vang) * c.v * dt
  c.v = Math.min(6, c.v + 0.035 * dt)
  const idx = dbCell(c.x, c.y)
  if (idx === undefined) { c.fall = true; c.vz = 0; return }
  if (idx > c.best) c.best = idx
  if (G.path[idx].coin && !c.got[idx]) { c.got[idx] = 1; c.coins++; if (isHuman(c.p)) play(sfxClick) }
  if (Math.abs(c.h - c.vang) > 0.2) {
    c.trailT -= dt
    if (c.trailT <= 0) { c.trail.push([c.x, c.y]); if (c.trail.length > 46) c.trail.shift(); c.trailT = 0.03 }
  }
}
function dbBot(c) {
  if (c.fall || c.done) return
  const idx = dbCell(c.x, c.y)
  if (idx === undefined) return
  const t = G.path[Math.min(G.path.length - 1, idx + 1)]
  const want = Math.atan2(t.y + 0.5 - c.y, t.x + 0.5 - c.x) < Math.PI / 4
  const delay = byDiff(rnd(0.04, 0.17), rnd(0.02, 0.08), rnd(0, 0.02))
  c.botQ.push([G.t + delay, want])
  while (c.botQ.length && c.botQ[0][0] <= G.t) c.hold = c.botQ.shift()[1]
}
function dbView(car, u0, w, vh, T) {
  CLIP0 = u0; CLIP1 = u0 + w
  const cx = car.cam.x, cy = car.cam.y, cu = u0 + w / 2, cv = vh * 0.66
  const iso = (x, y, z) => [cu + ((x - cx) - (y - cy)) * T, cv - ((x - cx) + (y - cy)) * T * 0.5 - z * T]
  // sky + drifting clouds
  rectV(u0, 0, w, vh, "7")
  for (let i = 0; i < 4; i++) {
    let cu2 = ((i * 53 - (cx - cy) * T * 0.25) % (w + 40) + (w + 40)) % (w + 40) - 20
    const cv2 = ((i * 37 + (cx + cy) * T * 0.12) % (vh + 30) + (vh + 30)) % (vh + 30) - 15
    ellipseV(u0 + cu2, cv2, 13, 4, "2"); ellipseV(u0 + cu2 + 6, cv2 - 3, 8, 4, "2")
  }
  const cars = G.cars.filter(c => !c.done)
  const drawCar = c => dbCar(c, iso)
  // cars that fell below the road go behind it
  for (const c of cars) if (c.z < -0.2) drawCar(c)
  const i0 = Math.max(0, car.best - 16), i1 = Math.min(G.path.length - 1, car.best + 40)
  const bob = Math.sin(G.t * 6) * 0.06
  for (let i = i1; i >= i0; i--) {
    const t = G.path[i], x = t.x, y = t.y
    const A = iso(x, y, 0), B = iso(x + 1, y, 0), C = iso(x + 1, y + 1, 0), D = iso(x, y + 1, 0)
    const A2 = iso(x, y, -0.55), B2 = iso(x + 1, y, -0.55), D2 = iso(x, y + 1, -0.55)
    if (A[1] - T * 2 > vh || C[1] < -T * 2) continue
    fillPoly([D, A, A2, D2], "1")
    fillPoly([A, B, B2, A2], "L")
    fillPoly([A, B, C, D], i % 2 ? "2" : "F")
    if (t.coin && !car.got[i]) {
      const q = iso(x + 0.5, y + 0.5, 0.38 + bob), s = iso(x + 0.5, y + 0.5, 0)
      ellipseV(s[0], s[1], T * 0.22, T * 0.1, "1")
      ellipseV(q[0], q[1], T * 0.24, T * 0.3, "9"); ellipseV(q[0], q[1], T * 0.15, T * 0.2, "6")
    }
  }
  for (const c of cars) {
    if (c.z < -0.2) continue
    for (const [tx, ty] of c.trail) { const q = iso(tx, ty, 0); rectV(q[0] - 1, q[1], 2, 1, "L") }
  }
  for (const c of cars) if (c !== car && c.z >= -0.2) drawCar(c)
  if (car.z >= -0.2 && !car.done) drawCar(car)
  // HUD
  const sc = String(dbScore(car))
  rectV(u0 + 1, 1, textWidth(sc, 2) + 4, 14, "0")
  textV(sc, u0 + 3, 3, TEAM[car.p], 2)
  if (car.coins) { rectV(u0 + 1, 15, textWidth(car.coins + "C") + 4, 8, "0"); textV(car.coins + "C", u0 + 3, 16, "6") }
  if (vsBot) { const bs = "BOT " + dbScore(G.cars[0]); rectV(u0 + w - textWidth(bs) - 5, 1, textWidth(bs) + 4, 9, "0"); textV(bs, u0 + w - textWidth(bs) - 3, 3, BLUE) }
  if (G.t < 3) {
    const hint = listenerWorks ? "HOLD = RIGHT" : "TAP = TURN"
    textV(hint, u0 + Math.floor((w - textWidth(hint)) / 2), vh - 10, "0")
  }
  if (car.done || car.fall) {
    rectV(u0 + w / 2 - 30, vh / 2 - 14, 60, 22, "0")
    textV("FELL!", u0 + w / 2 - textWidth("FELL!", 2) / 2, vh / 2 - 11, TEAM[car.p], 2)
    textV("SCORE " + sc, u0 + w / 2 - textWidth("SCORE " + sc) / 2, vh / 2 + 1, "2")
  }
  CLIP0 = 0; CLIP1 = VW()
}
function dbCar(c, iso) {
  const ca = Math.cos(c.h), sa = Math.sin(c.h)
  const pts = (lf, lb, wd) => [[lf, -wd], [lf, wd], [-lb, wd], [-lb, -wd]].map(([l, s]) => [c.x + ca * l - sa * s, c.y + sa * l + ca * s])
  if (c.z > -0.2) fillPoly(pts(0.36, 0.36, 0.22).map(p => iso(p[0], p[1], 0)), "L")
  const col = TEAM[c.p]
  dbExtrude(pts(0.35, 0.35, 0.2), c.z + 0.05, 0.2, col, dk(col), iso)
  dbExtrude(pts(0.09, 0.23, 0.15), c.z + 0.25, 0.15, col, "0", iso)
  const hl = pts(0.36, -0.3, 0.13)
  for (const p of [hl[0], hl[1]]) { const q = iso(p[0], p[1], c.z + 0.15); rectV(q[0] - 0.5, q[1] - 0.5, 1.5, 1.5, "6") }
}
function dbExtrude(pts, z, h, top, side, iso) {
  const n = pts.length
  let cx = 0, cy = 0
  for (const p of pts) { cx += p[0] / n; cy += p[1] / n }
  for (let i = 0; i < n; i++) {
    const p = pts[i], q = pts[(i + 1) % n]
    let nx = q[1] - p[1], ny = -(q[0] - p[0])
    if (nx * ((p[0] + q[0]) / 2 - cx) + ny * ((p[1] + q[1]) / 2 - cy) < 0) { nx = -nx; ny = -ny }
    if (nx + ny >= 0) continue
    fillPoly([iso(p[0], p[1], z), iso(q[0], q[1], z), iso(q[0], q[1], z + h), iso(p[0], p[1], z + h)], nx < ny ? side : dk(side))
  }
  fillPoly(pts.map(p => iso(p[0], p[1], z + h)), top)
}

// ============================================================
//  GAME 8: TUG OF WAR
// ============================================================
const Tug = {
  name: "TUG OF WAR", spam: true,
  opts: [{ name: "TIME", vals: [10, 20, 30, 60], i: 1 }],
  init() { G = { t: opt("TIME"), m: 80, c: [0, 0], el: 0, bot: 0.3 } },
  onTap(k) {
    const p = owner(k)
    if (!isHuman(p) || G.t <= 0) return
    G.c[p]++; G.m += p === 0 ? -2.2 : 2.2
  },
  update(dt) {
    G.t -= dt; G.el += dt
    if (vsBot) { G.bot -= dt; while (G.bot <= 0) { G.c[0]++; G.m -= 2.2; G.bot += 1 / botCps() } }
    if (G.m <= 40) return endGame(0)
    if (G.m >= 120) return endGame(1)
    if (G.t <= 0) endGame(G.m < 80 ? 0 : G.m > 80 ? 1 : -1)
  },
  bg: "4", tilt: 0.62,
  floor() {
    clear("4")
    rect(72, 0, 16, 128, "C")
    for (let b = 0; b < 128; b += 6) { rect(40, b, 1, 3, BLUE); rect(119, b, 1, 3, RED) }
    const off = G.m - 80
    rect(6 + off, 66, 152, 2, "D")
  },
  objects() {
    const off = G.m - 80, o = []
    o.push(box(4 + off, 63.5, 152, 2, 6, 2, "9", "C"))
    o.push(box(G.m - 0.6, 63.4, 1.2, 1.2, 0, 22, "0", "L"), box(G.m + 0.6, 63.5, 8, 1, 15, 7, "6", "9"))
    for (let i = 0; i < 3; i++) {
      const pull = Math.floor(G.el * 6 + i) % 2
      for (const [a, col] of [[16 + i * 11 + off - pull, BLUE], [144 - i * 11 + off + pull, RED]]) {
        o.push(cyl(a, 64, 4.5, 0, 9, col, dk(col), 10), sphere(a, 64, 9, 3.2, "9"))
      }
    }
    return o
  },
  hud() {
    for (let p = 0; p < 2; p++) {
      sideText(p, String(G.c[p]), 0)
      sideText(p, (G.c[p] / Math.max(1, G.el)).toFixed(1) + " CPS", 1)
    }
    const tt = String(Math.max(0, Math.ceil(G.t)))
    if (!portrait) textC(tt, 2, "2", 2)
    else textV(tt, 128 - textWidth(tt, 2) - 3, 75, "2", 2)
    if (G.el < 2) textC("SPAM!", portrait ? 30 : 24, "2", 2)
  }
}
function tugGuy(a, col) { disc(a, 64, 5, col); disc(a, 64, 2.5, "0") }

// ============================================================
//  LOCK SCREEN, CLOCK + BATTERY
// ============================================================
const bootT = now()
let clockOffset = 0
const hasRTC = () => { try { return new Date().getFullYear() >= 2020 } catch (e) { return false } }
const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
function clockNow() {
  if (hasRTC()) {
    const d = new Date(now() + clockOffset)
    return { h: d.getHours(), m: d.getMinutes(), date: DAYS[d.getDay()] + " " + MONTHS[d.getMonth()] + " " + d.getDate() }
  }
  // the Sprig has no real clock: count from 12:00 when it was switched on
  const mins = Math.floor((now() - bootT + clockOffset) / 60000) + 12 * 60
  return { h: Math.floor(mins / 60) % 24, m: mins % 60, date: null }
}
let battLevel = null
try {
  if (!HW && typeof navigator !== "undefined" && navigator.getBattery) {
    navigator.getBattery().then(b => {
      const upd = () => { battLevel = b.level; dirty = true }
      upd()
      b.addEventListener("levelchange", upd)
    })
  }
} catch (e) { }
// real battery level in the browser if available; on the Sprig, an
// estimate from time switched on (2x AAA last about 30 hours)
function batteryPct() {
  if (battLevel !== null) return Math.round(battLevel * 100)
  return clamp(Math.round(100 - (now() - bootT) / 3600000 / 30 * 100), 1, 100)
}
function drawBattery(u, v, textCol) {
  const p = batteryPct(), col = p > 50 ? "4" : p > 20 ? "6" : "3"
  rectV(u, v, 15, 8, "0"); rectV(u + 15, v + 2, 2, 4, "0")
  rectV(u + 1, v + 1, 13, 6, "2")
  rectV(u + 1, v + 1, Math.max(1, Math.round(13 * p / 100)), 6, col)
  const t = p + "%"
  textV(t, u - textWidth(t) - 2, v + 2, textCol)
}
let lockT = 0
function drawLock() {
  portrait = false
  clearV("5")
  rectV(0, 38, 160, 20, "H")
  rectV(0, 58, 160, 16, "8")
  rectV(0, 74, 160, 14, "9")
  discV(80, 88, 20, "6")
  for (let u = 0; u < 160; u++) {
    const top = Math.round(86 + 7 * Math.sin(u / 13) + 4 * Math.sin(u / 5 + 1))
    rectV(u, top, 1, 128 - top, "0")
    const top2 = Math.round(100 + 5 * Math.sin(u / 9 + 2))
    rectV(u, top2, 1, 128 - top2, "L")
  }
  const c = clockNow()
  const h12 = c.h % 12 || 12
  const t = h12 + ":" + (c.m < 10 ? "0" : "") + c.m
  textC(t, 12, "2", 5)
  textV(c.h < 12 ? "AM" : "PM", Math.floor((160 + textWidth(t, 5)) / 2) + 3, 12, "2")
  if (c.date) textC(c.date, 42, "2")
  else textC("W = HOUR  I = MINUTE", 42, "2")
  textV("SPRIG", 3, 2, "2")
  drawBattery(141, 1, "2")
  const bounce = Math.floor(lockT * 4) % 2
  textC("V", 106 + bounce, "2", 2)
  textC("PRESS DOWN TO UNLOCK", 119, "2")
}

// ============================================================
//  MENU / FLOW
// ============================================================
const GAMES = [Pong, Golf, Sumo, Pool, TicTac, AirHockey, Racers, DriftBoss, Tug]
let screen = "menu", vsBot = false
let menuIdx = 0, menuTop = 0, modeIdx = 0, optRow = 0
let game = null, countT = 0, lastBeep = -1
let winner = -1, resultT = 0, dirty = true

function drawMenu() {
  portrait = false
  clearV("2")
  rectV(0, 0, 160, 14, "L")
  textV("2 PLAYER GAMES", 3, 2, "2", 2)
  drawBattery(141, 3, "2")
  const VIS = 7
  if (menuIdx < menuTop) menuTop = menuIdx
  if (menuIdx >= menuTop + VIS) menuTop = menuIdx - VIS + 1
  for (let i = 0; i < VIS; i++) {
    const gi = menuTop + i
    if (gi >= GAMES.length) break
    const y = 15 + i * 14
    const sel = gi === menuIdx
    if (sel) rectV(0, y, 153, 14, "7")
    textV(GAMES[gi].name, 5, y + 2, sel ? "2" : "0", 2)
    if (sel) textV(">", 144, y + 2, "2", 2)
  }
  rectV(155, 15, 4, 98, "1")
  const th = Math.round(98 * VIS / GAMES.length)
  rectV(155, 15 + Math.round((98 - th) * menuTop / (GAMES.length - VIS)), 4, th, "0")
  rectV(0, 114, 160, 14, "1")
  textC("I/K SCROLL  L SELECT  J BACK", 119, "0")
}

function drawMode() {
  portrait = false
  const g = GAMES[menuIdx]
  clearV("2")
  rectV(0, 0, 160, 14, "L")
  textC(g.name, 2, "2", 2)
  const opts = ["2 PLAYER", "VS BOT"]
  for (let i = 0; i < 2; i++) {
    const y = 22 + i * 18
    if (i === modeIdx) rectV(0, y, 160, 15, "7")
    textC(opts[i], y + 3, i === modeIdx ? "2" : "0", 2)
  }
  const tips = modeIdx === 0
    ? ["PUT THE SPRIG ON A TABLE.", "BLUE = LEFT PAD (WASD)", "RED = RIGHT PAD (IJKL)"]
    : (g === Racers
      ? ["YOU ARE RED (RIGHT PAD).", "KEEP THE SPRIG FLAT", "FOR RACING."]
      : ["YOU ARE RED. HOLD IT", "SIDEWAYS WITH THE RIGHT", "PAD AT THE BOTTOM."])
  for (let i = 0; i < tips.length; i++) textC(tips[i], 66 + i * 9, "L")
  rectV(0, 114, 160, 14, "1")
  textC("I/K CHOOSE  L NEXT  J BACK", 119, "0")
}

function drawDiff() {
  portrait = false
  clearV("2")
  rectV(0, 0, 160, 14, "L")
  textC("BOT LEVEL", 2, "2", 2)
  const opts = ["EASY", "NORMAL", "HARD"], cols = ["4", "6", "3"]
  for (let i = 0; i < 3; i++) {
    const y = 20 + i * 18
    if (i === diff) rectV(0, y, 160, 15, "7")
    textC(opts[i], y + 3, i === diff ? "2" : "0", 2)
    if (i === diff) rectV(8, y + 4, 6, 6, cols[i])
  }
  rectV(0, 114, 160, 14, "1")
  textC("I/K CHOOSE  L NEXT  J BACK", 119, "0")
}
function drawOpts() {
  portrait = false
  clearV("2")
  rectV(0, 0, 160, 14, "L")
  textC(game.name, 2, "2", 2)
  const rows = game.opts.map(o => o.name + ": " + o.vals[o.i]).concat(["START!"])
  for (let i = 0; i < rows.length; i++) {
    const y = 18 + i * 16
    const sel = i === optRow
    if (sel) rectV(0, y, 160, 14, i === rows.length - 1 ? "4" : "7")
    textC(rows[i], y + 2, sel ? "2" : "0", 2)
    if (sel && i < rows.length - 1) { textV("<", 3, y + 2, "2", 2); textV(">", 147, y + 2, "2", 2) }
  }
  if (vsBot) textC("BOT: " + ["EASY", "NORMAL", "HARD"][diff], 104, "L")
  rectV(0, 114, 160, 14, "1")
  textC("I/K MOVE  L CHANGE/GO  J BACK", 119, "0")
}
function toOpts() {
  if (game.opts && game.opts.length) { screen = "opts"; optRow = game.opts.length }
  else startGame()
}
function startGame() {
  vsBot = modeIdx === 1
  portrait = vsBot && game !== Racers
  game.init()
  screen = "countdown"; countT = 0; lastBeep = -1
}
function endGame(w) {
  if (screen !== "play") return
  winner = w
  screen = "result"; resultT = 0
  play(w < 0 ? sfxBeep : (vsBot && w === 0 ? sfxBad : sfxWin))
}
function goMenu() { screen = "menu"; portrait = false; dirty = true; G = null }

function overlayResult() {
  const msg = winner < 0 ? "TIE GAME!" : vsBot ? (winner === 1 ? "YOU WIN!" : "BOT WINS!") : TEAM_NAME[winner] + " WINS!"
  const col = winner < 0 ? "2" : TEAM[winner]
  const bw = Math.min(VW() - 8, textWidth(msg, 2) + 16), bu = Math.floor((VW() - bw) / 2), bv = Math.floor(VH() / 2) - 18
  rectV(bu - 2, bv - 2, bw + 4, 40, col)
  rectV(bu, bv, bw, 36, "0")
  textC(msg, bv + 5, col, 2)
  if (resultT > 0.8) textC("L AGAIN  J MENU", bv + 24, "2")
}

function onTap(k) {
  if (screen === "lock") {
    if (k === "s" || k === "k") { screen = "menu"; dirty = true; play(sfxGo) }
    else if (!hasRTC() && k === "w") clockOffset += 3600000
    else if (!hasRTC() && k === "i") clockOffset += 60000
    return
  }
  if (screen === "menu") {
    if (k === "j") { screen = "lock"; play(sfxClick); return }
    if (k === "i" && menuIdx > 0) { menuIdx--; play(sfxClick) }
    else if (k === "k" && menuIdx < GAMES.length - 1) { menuIdx++; play(sfxClick) }
    else if (k === "l") { game = GAMES[menuIdx]; screen = "mode"; modeIdx = 0; play(sfxClick) }
    dirty = true
  } else if (screen === "mode") {
    if (k === "i" || k === "k") { modeIdx = 1 - modeIdx; play(sfxClick) }
    else if (k === "l") { vsBot = modeIdx === 1; play(sfxClick); if (vsBot) screen = "diff"; else toOpts() }
    else if (k === "j") { screen = "menu"; play(sfxClick) }
    dirty = true
  } else if (screen === "diff") {
    if (k === "i" && diff > 0) { diff--; play(sfxClick) }
    else if (k === "k" && diff < 2) { diff++; play(sfxClick) }
    else if (k === "l") { play(sfxClick); toOpts() }
    else if (k === "j") { screen = "mode"; play(sfxClick) }
    dirty = true
  } else if (screen === "opts") {
    const n = game.opts.length
    if (k === "i" && optRow > 0) { optRow--; play(sfxClick) }
    else if (k === "k" && optRow < n) { optRow++; play(sfxClick) }
    else if (k === "l") {
      if (optRow === n) startGame()
      else { const o = game.opts[optRow]; o.i = (o.i + 1) % o.vals.length; play(sfxClick) }
    }
    else if (k === "j") { screen = vsBot ? "diff" : "mode"; play(sfxClick) }
    dirty = true
  } else if (screen === "play") {
    game.onTap(k)
  } else if (screen === "result" && resultT > 0.8) {
    if (k === "l") startGame()
    else if (k === "j") goMenu()
  }
}

let lastT = now(), lastDraw = 0
function frame() {
  const t = now()
  let dt = (t - lastT) / 1000
  lastT = t
  if (dt > 0.1) dt = 0.1
  if (screen === "lock") {
    lockT += dt
    if (now() - lastDraw < 120) return
    lastDraw = now()
    drawLock()
    present()
    return
  }
  if (screen === "menu" && now() - lastDraw > 20000) dirty = true
  if (screen === "menu" || screen === "mode" || screen === "diff" || screen === "opts") {
    if (!dirty) return
    lastDraw = now()
    if (screen === "menu") drawMenu()
    else if (screen === "mode") drawMode()
    else if (screen === "diff") drawDiff()
    else drawOpts()
    dirty = false
    present()
    return
  }
  if (screen === "countdown") {
    const n = 5 - Math.floor(countT)
    if (n !== lastBeep) { play(sfxBeep); lastBeep = n }
    countT += dt
    drawGame()
    const num = String(Math.max(1, 5 - Math.floor(countT)))
    const bu = Math.floor(VW() / 2) - 14, bv = Math.floor(VH() / 2) - 22
    rectV(bu, bv, 28, 40, "0")
    textC(num, bv + 5, "6", 6)
    if (game === Racers && G.T) textC("TRACK " + G.T.seed, bv + 44, "2")
    if (countT >= 5) { screen = "play"; play(sfxGo) }
    present()
    return
  }
  if (screen === "play") {
    game.update(dt)
    drawGame()
  } else if (screen === "result") {
    resultT += dt
    drawGame()
    overlayResult()
  }
  present()
}

// start
clearV("2")
present()
{
  const lines = []
  for (let ty = 0; ty < 8; ty++) lines.push(KEYS.substr(ty * 10, 10))
  setMap(lines.join("\n"))
}
screen = "lock"
setInterval(frame, HW ? 15 : 33)