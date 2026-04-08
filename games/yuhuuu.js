/*
@title: Key Maze Escape
@description: Collect keys, unlock doors, and escape increasingly complex mazes.
@author: yash raghuwanshi
@tags: [maze, puzzle, logic]
@addedOn: 2026-03-24
*/

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
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`]
)

let level = 0
let hasKey = false

const levels = [

map`
wwwwwwwwww
w..k.....w
w.wwwww..w
w.h....www
w..wwww..w
w..w..w..w
w.ww...w.w
w....d..gw
wwwwwwwwww`,

map`
wwwwwwwwww
w.h....k.w
w.wwwwww.w
w....w..ww
w.ww..w.ww
w....w...w
w.wwwwwwww
wd......gw
wwwwwwwwww`,

map`
wwwwwwwwww
w.h...w..w
w.wwwwwwww
w....k...w
w.wwwwww.w
ww.......w
ww.wwwwwww
w......dgw
wwwwwwwwww`,

map`
wwwwwwwwww
w.h......w
wwww.w.w.w
w.k..w.w.w
w.wwww.w.w
w....w...w
wwwwwwwddw
w.......gw
wwwwwwwwww`,

map`
gggggggggg
gwwwwwwwwg
ww......ww
www...wwww
w.d.w.w.hw
ww..w...ww
ww..wwwddw
wk....wdgw
wwwwwwwwww`,

map`
kwwwwwwwww
w.h.......
w.wwwwww..
w.k.....dd
w.wwwwwwwd
w......ddw
wwwwwdwwww
w.d.....gw
wwwwwwwwww`

]

setMap(levels[level])
setSolids([hero, wall]) // FIXED: door removed

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
    clearText()
    addText("KEY ACQUIRED", { x: 2, y: 1, color: color`6` })
  }

  if (tilesWith(hero, door).length) {
    if (hasKey) {
      getFirst(door).remove()
      clearText()
      addText("DOOR OPENED", { x: 2, y: 2, color: color`4` })
    } else {
      clearText()
      addText("NEED KEY!", { x: 3, y: 2, color: color`3` })
      setMap(levels[level])
    }
  }

  if (tilesWith(hero, goal).length) {
    level += 1
    hasKey = false
    clearText()

    if (levels[level]) {
      setMap(levels[level])
      addText("LEVEL " + (level + 1), { x: 3, y: 0, color: color`2` })
    } else {
      addText("YOU ESCAPED!", { x: 1, y: 4, color: color`4` })
      addText("PRESS J TO REPLAY", { x: 0, y: 6, color: color`2` })
      level = 0
    }
  }
})