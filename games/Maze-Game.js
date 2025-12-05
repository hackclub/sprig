/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Maze Game
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const finish = "f"

setLegend(
  [ player, bitmap`
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333` ],
  [ wall, bitmap`
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
  0000000000000000` ],
  [ finish, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666` ]
)

setSolids([ player, wall ])

let level = 0
const levels = [
  map`
....p
.wwww
.wwwf
.www.
.....`,

  // Level 2
  map`
p....
wwww.
.....
.wwww
....f`,

  // Level 3
  map`
.w.wf..
.....w.
.ww.w..
..w.w.w
w.p.w.w
ww.....
ww...ww`,

  // Level 4
  map`
fw...www..w...
.www...wwwwww.
....w..w.w....
..w...ww.w...w
.w.ww.w..w.www
.w..w.w..w.w..
ww..w.ww.w.w..
.w.......w.w..
.wwwwwww...www
.w...w...w.wpw
.ww.......ww.w
.....wwww....w`,

  // Level 5
  map`
p.w...ww.w.....
w.www....w.ww..
w.w.www.ww.w.ww
w.w........w...
w...ww..w.wwww.
ww....w.w....w.
.w.ww.w.w.wwww.
.w..w.w.w....w.
.ww...w.wwww.w.
....w........w.
w...w.w.wwww.w.
w...w.w..wfw.w.
wwwww.ww.w.w...
.........w.www.
..wwwwww.w.....`,

  // Level 6
  map`
wwwwwwwwwwwwwwwwwwww
w..w.pw.wwwww......w
w..w..w.....w.www..w
w.....wwwww.w.w.w..w
w.w.w.........w.w..w
w.w.wwwwww.ww.w.w..w
w.w......w.ww.www..w
w.w..www.w.ww......w
w.w......w..wwwwww.w
w.www.w..ww........w
w.w...w............w
w.ww..w.wwwwwwwwwwww
w.....w.w........www
w..w..w.wwwwwwwwww.w
wwwww.......w......w
w....wwwwww.wwww.w.w
w.ww..w..........w.w
w...w.wwwwwwwwwwww.w
wf..w..............w
wwwwwwwwwwwwwwwwwwww`
]


setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
  addSprite(
    getFirst(player).x,
    getFirst(player).y,
    wall
  )
})

onInput("w", () => {
  getFirst(player).y -= 1
  addSprite(
    getFirst(player).x,
    getFirst(player).y,
    wall
  )
})
onInput("a", () => {
  getFirst(player).x -= 1
  addSprite(
    getFirst(player).x,
    getFirst(player).y,
    wall
  )
})
onInput("d", () => {
  getFirst(player).x += 1
  addSprite(
    getFirst(player).x,
    getFirst(player).y,
    wall
  )
})

afterInput(() => {
  const p = getFirst(player)
  const f = getFirst(finish)

  // Check if player reached finish
  if (p && f && p.x === f.x && p.y === f.y) {
    level++
    if (level < levels.length) {
      setMap(levels[level])
    } else {
      addText("You win!", { x: 5, y: 5, color: color`3` })
    }
  }
})
