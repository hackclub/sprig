/*
@title: Dodge the Fireballs!
*/

const player = "p"
const fireball = "f"

setLegend(
  [ player, bitmap`
................
....000000......
..0000..0000....
..0.0.33.0.0....
..0.000000.0....
..0..0..0..0....
..0..0..0..0....
.....0..0.......` ],
  [ fireball, bitmap`
....999.99......
...333393339....
..3399999933....
..3999339993....
..9399399939....
...33339333.....
...999339.......
................
................
................
................
................
................
................
................
................` ]
)

let level = 0
const levels = [
  map`
....
....
....
....
....
..p.`
]

setMap(levels[level])
setSolids([])
setPushables({ [player]: [] })

onInput("a", () => { if (!isGameOver) getFirst(player).x -= 1 })
onInput("d", () => { if (!isGameOver) getFirst(player).x += 1 })

let isGameOver = false

setInterval(() => {
  if (isGameOver) return
  if (getAll(fireball).length < 3) {
    addSprite(Math.floor(Math.random() * width()), 0, fireball)
  }
}, 800) 
setInterval(() => {
  if (isGameOver) return

  getAll(fireball).forEach(f => {
    f.y += 1

    if (f.y >= height() - 1) {
      setTimeout(() => {
        f.remove()
      }, 400) 
    }
  })

  const p = getFirst(player)
  if (p) {
    getAll(fireball).forEach(f => {
      if (f.x === p.x && f.y === p.y) {
        isGameOver = true
        addText("YOU LOST!", { y: 2, color: "red" })
        setTimeout(() => {
          clearText()
          getAll(fireball).forEach(fire => fire.remove())
          setMap(levels[level])
          isGameOver = false
        }, 1000)
      }
    })
  }
}, 500)