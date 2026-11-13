/*
  @title: Crate Pusher
  @description: Push every crate onto a red target. 3 short levels.
  @tags: ['puzzle']

  W A S D  move and push crates
  J        restart the level
*/

const player = "p"
const crate = "c"
const target = "t"
const wall = "w"
const floor = "f"

setLegend(
  [player, bitmap`
................
................
................
.....DDDDDD.....
....D444444D....
...D44444444D...
...D44044044D...
...D44444444D...
...D44444444D...
...D44444444D...
...D44444444D...
....D444444D....
.....DDDDDD.....
................
................
................`],
  [crate, bitmap`
................
.CCCCCCCCCCCCCC.
.C99999CC99999C.
.C99999CC99999C.
.C99999CC99999C.
.C99999CC99999C.
.C99999CC99999C.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.C99999CC99999C.
.C99999CC99999C.
.C99999CC99999C.
.C99999CC99999C.
.C99999CC99999C.
.CCCCCCCCCCCCCC.
................`],
  [target, bitmap`
................
................
................
......3333......
....33....33....
...3........3...
..3..........3..
..3..........3..
..3..........3..
..3..........3..
...3........3...
....33....33....
......3333......
................
................
................`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
L1111111L1111111
L1111111L1111111
L1111111L1111111
LLLLLLLLLLLLLLLL
1111L1111111L111
1111L1111111L111
1111L1111111L111
LLLLLLLLLLLLLLLL
L1111111L1111111
L1111111L1111111
L1111111L1111111
LLLLLLLLLLLLLLLL
1111L1111111L111
1111L1111111L111
1111L1111111L111`],
  [floor, bitmap`
0000000000000000
0000000000000000
0000000000000000
000000000000L000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000L00000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
)

setBackground(floor)
setSolids([player, crate, wall])
setPushables({
  [player]: [crate] })

const levels = [
  map`
wwwwwwww
wp.....w
w..c...w
w....t.w
w......w
wwwwwwww`,
  map`
wwwwwwww
wp.....w
w.c.c..w
w......w
w.t..t.w
wwwwwwww`,
  map`
wwwwwwww
wp.....w
w.c....w
w..w..tw
w.c....w
w.....tw
wwwwwwww`
]

const winSound = tune`
200: C5~200,
200: E5~200,
200: G5~200,
200`

let level = 0
let finished = false

function showLevel() {
  clearText()
  setMap(levels[level])
  addText("Level " + (level + 1), { x: 1, y: 0, color: color`2` })
}
showLevel()

onInput("w", () => { if (!finished) getFirst(player).y -= 1 })
onInput("s", () => { if (!finished) getFirst(player).y += 1 })
onInput("a", () => { if (!finished) getFirst(player).x -= 1 })
onInput("d", () => { if (!finished) getFirst(player).x += 1 })
onInput("j", () => {
  if (finished) { finished = false;
    level = 0 }
  showLevel()
})

afterInput(() => {
  if (finished) return
  if (tilesWith(target, crate).length === tilesWith(target).length) {
    playTune(winSound)
    level++
    if (level >= levels.length) {
      finished = true
      clearText()
      addText("You win!", { x: 6, y: 6, color: color`6` })
      addText("J: play again", { x: 4, y: 8, color: color`2` })
    } else {
      showLevel()
    }
  }
})