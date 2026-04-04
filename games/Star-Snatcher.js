/*
@title: Star-Snatcher
@description: Catch 'em all!
@author: tap
@tags: []
@addedOn: 2025-12-13
*/

const player = "p"
const star = "s"
const wall = "w"

setLegend(
  [player, bitmap`
................
................
......0000......
.....0....0.....
.....0.00.0.....
.....0....0.....
......0000......
...3333333333...
...3333333333...
......3333......
......3333......
......3333......
......HH88......
......HH8H......
......HH8H......
......00LL......`],
  [star, bitmap`
................
................
................
................
........6.......
.......666......
......66666.....
.....6666666....
......66666.....
.......666......
........6.......
................
................
................
................
................`],
  [wall, bitmap`
0000000000000000
0000000000000000
00L0LLL00LLLLL00
00L1LLL00L0LLL00
00LLLLL00LLL1L00
00LL10L00LLL1L00
00LLL0L00L01LL00
0000000000000000
0000000000000000
00LLLLL00LLL0L00
00LL0LL00L0LLL00
00L1LLL00LLLLL00
00LL0LL00LL1LL00
00LLLL000LL0LL00
0000000000000000
0000000000000000`]
)

setSolids([player, wall])

let level = 0

const levels = [
  // Level 1
  map`
wwwwwwwww
wp..s...w
w.......w
w.......w
w...s...w
wwwwwwwww`,

  // Level 2
  map`
wwwwwwwww
wp..w...w
w..w.s..w
w..w....w
w...s...w
wwwwwwwww`,

  // Level 3
  map`
wwwwwwwww
wp..w.s.w
w.w.w.w.w
w.s...w.w
w.w.w...w
wwwwwwwww`,

  // Level 4
  map`
wwwwwwwww
wp.w.w..w
w.s.w.w.w
w.w...w.w
w..w...sw
wwwwwwwww`,

  // Level 5
  map`
wwwwwwwwwwww
w...w...wwsw
w.w.w.w....w
wp..w.w.wwww
w.w.w.w.ws.w
w.w...w.ww.w
w.w.w.w....w
wwwwwwwwwwww`,
  
  // Level 6
  map`
wwwwwwwwwwww
ww.......w.w
w.ws.w.www.w
w.wwww...w.w
ws.w...w...w
ww.w.w.w.w.w
w....w.ww.pw
wwwwwwwwwwww`
]

setMap(levels[level])

onInput("w", () => getFirst(player).y -= 1)
onInput("s", () => getFirst(player).y += 1)
onInput("a", () => getFirst(player).x -= 1)
onInput("d", () => getFirst(player).x += 1)

afterInput(() => {
  const stars = tilesWith(player, star)

  if (stars.length > 0) {
    stars.forEach(tile => tile[1].remove())
  }

  if (getAll(star).length === 0) {
    level++

    if (level < levels.length) {
      setMap(levels[level])
    } else {
      clearText()
      addText("YOU BEAT ALL LEVELS", {
        x: 1,
        y: 6,
        color: color`3`
      })
    }
  }
})

