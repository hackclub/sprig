/*
  JOJO GAME-STARDUST CRUSADERS
  made by tanmay chhabra!
  controls: WASD to move,I to summon star platinum
*/
const jojoSprite = bitmap`
................
...00000000.....
..0000000000....
..0000200000....
...77777777.....
...7777777......
...22222222.....
..2222222222....
..2200220022....
..2200220022....
..2222222222....
..2222..2222....
..2222..2222....
..8888..8888....
................
................
`
const standSprite = bitmap`
................
................
................
......99999.....
....99911999....
...9991199999...
...9999999999...
...9999999999...
....9999999.....
......999.......
................
................
................
................
................
................
`
const knifeSprite = bitmap`
................
................
................
................
................
.......88881....
....88888811....
...888888111....
....88888811....
.......88881....
................
................
................
................
................
................
`
const floor = bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
`
const HERO = "J"
const PUNCH = "O"
const BAD_THING = "k"
const GROUND = "r"

setLegend(
  [HERO, jojoSprite],
  [PUNCH, standSprite],
  [BAD_THING, knifeSprite],
  [GROUND, floor]
)
const levelLayout = map`
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rJrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
`

setMap(levelLayout)

const oraSound = tune`C4 E4`
const deflectSound = tune`G4 C5`
const deadSound = tune`C3 B2 A2`

let points = 0
let gameOver = false
let punchTimer = 0
let gameStarted = false

addText("Press I to Start", { x: 4, y: 7, color: "3" })

onInput("w", () => {
  const p = getFirst(HERO)
  if (p.y > 0) p.y = p.y - 1
})

onInput("s", () => {
  const p = getFirst(HERO)
  if (p.y < 14) p.y = p.y + 1
})

onInput("a", () => {
  const p = getFirst(HERO)
  if (p.x > 0) p.x = p.x - 1
})

onInput("d", () => {
  const p = getFirst(HERO)
  if (p.x < 10) p.x = p.x + 1
})

onInput("i", () => {
  if (gameStarted == false) {
    gameStarted = true
    clearText()
    addText("Score: 0", { x: 1, y: 1, color: "3" })
    playTune(oraSound)
    return
  }
  if (punchTimer > 0) {
    return
  }

  const p = getFirst(HERO)


  addSprite(p.x + 1, p.y, PUNCH)
  playTune(oraSound)
  console.log("ORA!")

  punchTimer = 5
})

setInterval(() => {
  if (gameOver) return
  if (!gameStarted) return


  if (punchTimer > 0) {
    punchTimer = punchTimer - 1
  } else {

    const attacks = getAll(PUNCH)
    for (const a of attacks) {
      a.remove()
    }
  }


  if (Math.random() * 100 < 10) {
    const rY = Math.floor(Math.random() * 14)
    addSprite(15, rY, BAD_THING)
  }


  const enemies = getAll(BAD_THING)

  for (const k of enemies) {
    k.x = k.x - 1
    const me = getFirst(HERO)
    if (k.x == me.x && k.y == me.y) {
      gameOver = true
      playTune(deadSound)
      addText("RETIRED...", { color: "2" })
    }


    if (k.x < 0) {
      k.remove()
    }
  }

  const myPunches = getAll(PUNCH)

  for (const p of myPunches) {

    const touchedKnife = enemies.find(k => k.x == p.x && k.y == p.y)
    if (touchedKnife) {
      touchedKnife.remove()
      points = points + 1
      playTune(deflectSound)
      clearText()
      addText("Score: " + points, { x: 1, y: 1, color: "3" })
    }
  }

}, 100);