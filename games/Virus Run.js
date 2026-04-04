/*
	@title: Virus Run
	@author: david
	@description: An endless scroller game where you have to dodge viruses
	@tags: ['scroller', 'endless']
	@addedOn: 2026-02-04
*/

//sprites
setLegend(
["p", bitmap`
................
................
.....000000.....
....00666600....
...0066666600...
..006666666600..
..066606606660..
..066666666660..
..066606606660..
..006660066600..
...0066666600...
....00666600....
.....000000.....
................
................
................`],

["s", bitmap`
................
................
.....000000.....
....00444400....
...0044444400...
..004444444400..
..044404404440..
..044444444440..
..044440044440..
..004404404400..
...0044444400...
....00444400....
.....000000.....
................
................
................`],

["v", bitmap`
...4...4.4......
....4.4...4.....
....4444444.44..
.44.44444444....
..44444444444.4.
..4444444444444.
.4444404404444..
4.444444444444.4
..4444000044444.
.4444404404444..
.4.444400444444.
....44444444....
..44.444444.44..
......4..4......
.......4.4......
................`],

["b", bitmap`
3..............7
33............77
.33..........77.
..33........77..
...33......77...
....33....77....
.....33..77.....
......3377......
......7733......
.....77..33.....
....77....33....
...77......33...
..77........33..
.77..........33.
77............33
7..............3`]
)


setBackground("b")

//map
const WIDTH = 20
const HEIGHT = 16

setMap(map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
`)

//game state
let dead = false
let score = 0
let tick = 0
let speed = 8

addSprite(10, 8, "p")

//input
onInput("w", () => {
  if (dead) return
  const p = getFirst("p")
  if (p && p.y > 0) p.y -= 1
})

onInput("s", () => {
  if (dead) return
  const p = getFirst("p")
  if (p && p.y < HEIGHT - 1) p.y += 1
})

onInput("a", () => {
  if (dead) return
  const p = getFirst("p")
  if (p && p.x > 0) p.x -= 1
})

onInput("d", () => {
  if (dead) return
  const p = getFirst("p")
  if (p && p.x < WIDTH - 1) p.x += 1
})

//restart
onInput("i", () => {
  clearText()
  setMap(map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
  `)

  dead = false
  score = 0
  tick = 0
  speed = 8

  addSprite(10, 8, "p")
})

//game loop
setInterval(() => {
  if (dead) return

  tick++

  //remove viruses
  getAll("v").forEach(v => {
    if (v.y === HEIGHT - 1) {
      v.remove()
      score++              
    } else {
      v.y += 1
    }
  })

  //spawn viruses
  if (tick % speed === 0) {
    addSprite(
      Math.floor(Math.random() * WIDTH),
      0,
      "v"
    )
    if (speed > 3) speed--
  }

  //collision
  if (tilesWith("p", "v").length > 0) {
    dead = true

    getAll("p").forEach(p => p.remove())
    addSprite(10, 8, "s")

    clearText()
    addText("YOU GOT SICK!", { x: 3, y: 7, color: color`H` })
    addText("PRESS I TO RESTART", { x: 1, y: 9, color: color`H` })
    return
  }

  //hud
  clearText()
  addText(`SCORE ${score}`, { x: 1, y: 1, color: color`H` })

}, 200)
