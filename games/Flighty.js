/*
@title: Flighty
@author: AdityaJainDXB
@description: A 2D take on the Notch Apple flight sim. Take off, fly, land on the far runway.
@tags: ['simulation', 'arcade']
@addedOn: 2026-11-28
*/

const player = "p"
const gearDown = "d"
const runway = "r"
const grass = "g"

setLegend(
  [ player, bitmap`
................
................
................
................
................
.33.............
.333............
..0000000000L...
.022222222222L..
.0222222222233L.
..0000000000L...
......11L.......
................
................
................
................` ],
  [ gearDown, bitmap`
................
................
................
................
................
.33.............
.333............
..0000000000L...
.022222222222L..
.0222222222233L.
..0000000000L...
......11L.......
......1....1....
.....000..000...
................
................` ],
  [ runway, bitmap`
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
1111222211112222
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],
  [ grass, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555` ]
)

setSolids([])

setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`)

// Controls: W/S pitch (S brakes on the ground)  A/D throttle  I gear  K flaps  J restart
// Numbers come from the Cessna in the real sim: stall 24 m/s, cruise 52, max 78.

const RWY_A = [0, 900]
const RWY_B = [3000, 3900]
const onRunway = px => (px >= RWY_A[0] && px <= RWY_A[1]) || (px >= RWY_B[0] && px <= RWY_B[1])
const pad = (n, w) => String(Math.max(0, Math.round(n))).padStart(w, " ")
const sgn = n => (n >= 0 ? "+" : "-") + String(Math.min(99, Math.round(Math.abs(n)))).padStart(2, "0")

let x, alt, speed, vsi, pitch, thr, gear, flaps, fuel
let onGround, hasFlown, state, msg, rating, brake, stalled

function reset() {
  x = 100; alt = 0; speed = 0; vsi = 0; pitch = 0
  thr = 0; gear = true; flaps = 0; fuel = 600
  onGround = true; hasFlown = false; state = "fly"
  msg = ""; rating = ""; brake = 0; stalled = false
}
reset()

function crash(why) { state = "crash"; msg = why; speed = 0; vsi = 0 }

onInput("w", () => { if (state === "fly") pitch = Math.min(20, pitch + 1.5) })
onInput("s", () => {
  if (state !== "fly") return
  if (onGround) brake = 2
  else pitch = Math.max(-15, pitch - 1.5)
})
onInput("a", () => { thr = Math.max(0, thr - 0.1) })
onInput("d", () => { thr = Math.min(1, thr + 0.1) })
onInput("i", () => { if (state === "fly" && !onGround) gear = !gear })
onInput("k", () => { flaps = (flaps + 1) % 4 })
onInput("j", () => { if (state !== "fly") reset() })

function tick() {
  if (state === "fly") {
    const dt = 0.1
    const vs = 24 * (1 - 0.12 * flaps / 3)   // flaps lower the stall speed
    const vr = vs * 1.15                       // rotate speed
    const dragK = 0.00054 * (1 + (gear ? 0.5 : 0) + flaps * 0.15)
    const thrust = fuel > 0 ? thr * 3.3 : 0
    let a = thrust - dragK * speed * speed
    if (onGround) { a -= 0.4; if (brake > 0) a -= 3 }
    if (brake > 0) brake--
    speed = Math.max(0, speed + a * dt)
    fuel = Math.max(0, fuel - thr * dt)
    x += speed * dt

    if (onGround) {
      if (speed < vr) pitch = 0
      else if (pitch >= 4) { onGround = false; hasFlown = true; vsi = 2; alt = 0.5 }
      if (onGround && speed > 1 && !onRunway(x)) crash("OFF THE RUNWAY")
      else if (onGround && hasFlown && speed < 0.3) {
        state = "done"
        msg = (x > 2000 ? "ARRIVED AT B" : "BACK AT A")
      }
    } else {
      let target = speed * Math.sin(pitch * Math.PI / 180)
      stalled = speed < vs
      if (stalled) { target -= (vs - speed) * 0.9 + 3; pitch = Math.max(-10, pitch - 6 * dt) }
      vsi += (target - vsi) * 0.25
      // climbing costs speed, diving gains it
      speed = Math.max(0, speed - 9.8 * vsi / Math.max(speed, 20) * dt * 0.7)
      alt += vsi * dt
      if (alt <= 0) {
        alt = 0
        const sink = -vsi
        if (!gear) crash("GEAR UP LANDING")
        else if (!onRunway(x)) crash("OFF THE RUNWAY")
        else if (sink > 3.5 || pitch > 12 || pitch < -3) crash("HARD LANDING")
        else {
          onGround = true; pitch = 0; vsi = 0
          rating = sink < 0.8 ? "BUTTER" : sink < 1.8 ? "SMOOTH" : "FIRM"
        }
      }
    }
  }
  draw()
}

function draw() {
  getAll().forEach(s => s.remove())
  const base = Math.floor(x / 40)
  for (let c = 0; c < 10; c++) {
    const t = base - 2 + c
    addSprite(c, 7, onRunway(t * 40 + 20) ? runway : grass)
  }
  const row = 6 - Math.min(5, Math.floor(alt / 50))
  addSprite(2, row, gear ? gearDown : player)

  clearText()
  const k = color`0`
  addText("SPD " + pad(speed, 3) + " ALT " + pad(alt, 4), { x: 0, y: 0, color: k })
  addText("THR " + pad(thr * 100, 3) + "% G:" + (gear ? "DN" : "UP") + " F" + flaps, { x: 0, y: 1, color: k })
  addText("PIT " + sgn(pitch) + " VS " + sgn(vsi), { x: 5, y: 2, color: k })

  let warn = ""
  if (state === "fly" && !onGround) {
    if (stalled) warn = "STALL"
    else if (!gear && alt < 150 && vsi < -1) warn = "TOO LOW GEAR"
    else if (vsi < -6 && alt < 150) warn = "SINK RATE"
    else if (fuel <= 0) warn = "NO FUEL"
  }
  if (warn) addText(warn, { x: 6, y: 4, color: color`3` })

  const toB = Math.max(0, Math.round((3000 - x) / 100) / 10)
  addText("B " + toB + "KM FUEL " + Math.round(fuel / 6) + "%", { x: 0, y: 14, color: k })

  if (state !== "fly") {
    addText(msg, { x: 3, y: 6, color: color`3` })
    if (rating) addText(rating + " LANDING", { x: 3, y: 8, color: k })
    addText("J = fly again", { x: 3, y: 10, color: k })
  }
}

setInterval(tick, 100)
afterInput(() => {})
