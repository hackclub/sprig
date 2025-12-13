/*
@title: Star Snatcher
@author: 
@tags: ['game']
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
.......00.......
.......00.......
.......00.......
.......00.......
......000.......
.....0000.......
......000.......
....00000.......
......000.......`],
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
0LL1LLL111011101
0111111L11111101
1111L1111L11L111
1L11111111111101
1011111111LL1101
111111L111111111
11101111111111L1
10L1111011L11111
1111111L111111L1
111111L111110LL1
011L1111111L1111
0111111111111111
01111111L111L110
0101111L11111111
1111111111111011
1001110011111110`]
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
w..w.w.s.w
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

