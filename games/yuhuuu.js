const hero = "h"
const key = "k"
const door = "d"
const goal = "g"
const wall = "w"

setLegend(
  [ hero, bitmap`
...0909090......
..0.99099.0.....
00..90009..00...
..999999999.....
..993030399.....
..993030399.....
..903000309.....
..993303399.....
..903303309.....
..909303909.....
..0.99999.0.....
....99.99.......
....99.99.......
....99.99.......
....00.00.......
................`],
  [ key, bitmap`
.....DDD.D......
....D...DDD.....
....DDDD........
....DD..........
....DDDDD.D.....
....D....D......
....D...........
....DDDDD.......
....DDDDD.......
....DDDDD.......
....DDDDD.......
....DDDDD.......
....DDDDD.......
................
................
................`],
  [ door, bitmap`
..CCCCCCCCC.....
..CLLLLL4LC.....
..CL4LL4LLC.....
..CLLLLLL4C.....
..CLL4LLLLC.....
..CLLL4LL4C.....
..CL4LLLLLC.....
..C4LL4L40C.....
..CLL4LLLLC.....
..C4LLLLLLC.....
..CLLLLL4LC.....
..CL4LL4L4C.....
..CLLLLLLLC.....
..CCCCCCCCC.....
................
................`],
  [ goal, bitmap`
................
.333333...33333.
.3333333.333333.
333..333333..333
33....33333...33
333....333....33
.333....3....33.
..33........333.
..333.......333.
...33......333..
...333.....33...
....333...333...
....3333..33....
......33.333....
......33333.....
.......333......`],
  [ wall, bitmap`
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
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`]
)

let level = 1
let hasKey = false

const levels = [
  map`
wwwwwwwwww
w..k.....w
w.wwwww..w
w.h....w.w
w..wwww..w
w.....w..w
w.ww...w.w
w....d..hw
wwwwwwwwww`,

  map`
wwwwwwwwww
w.h....k.w
w.wwwwww.w
w....w...w
w.ww..w.ww
w....w...w
w.wwwww..w
wd......gw
wwwwwwwwww`,

  map`
wwwwwwwwww
w.h......w
w.wwwwww.w
w....k...w
w.ww..ww.w
w..d..w..w
w.wwwwww.w
w.......gw
wwwwwwwwww`
]

setMap(levels[level])
setSolids([hero, wall, door])
setPushables({})

const move = (dx, dy) => {
  const p = getFirst(hero)
  if (!p) return
  p.x += dx
  p.y += dy
}

onInput("w", () => move(0, -1))
onInput("s", () => move(0, 1))
onInput("a", () => move(-1, 0))
onInput("d", () => move(1, 0))
onInput("j", () => {
  setMap(levels[level])
  hasKey = false
  clearText("")
})

afterInput(() => {
  const p = getFirst(hero)
  if (!p) return

  if (tilesWith(hero, key).length) {
    hasKey = true
    getFirst(key).remove()
    addText("key got!", { x: 1, y: 1, color: color`6` })
  }

  if (tilesWith(hero, door).length) {
    if (hasKey) {
      getFirst(door).remove()
      addText("door poped", { x: 1, y: 2, color: color`5` })
    } else {
      addText("need key bruh", { x: 1, y: 2, color: color`3` })
      setMap(levels[level])
    }
  }

  if (tilesWith(hero, goal).length) {
    level += 1
    hasKey = false
    clearText("")
    if (levels[level]) {
      setMap(levels[level])
    } else {
      addText("u win lol", { x: 2, y: 4, color: color`4` })
      addText("gg ez", { x: 3, y: 6, color: color`2` })
    }
  }
})