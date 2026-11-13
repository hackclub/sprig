/*
    @title: box pusher
    @author: rufus
    @description: push the boxes to the goal
    @tags: ['puzzle']
    @addedOn: 2026-11-14
    */

const player = "p"
const crate = "c"
const target = "t"
const wall = "w"
const floor = "f"

setLegend(
  [player, bitmap`
.......22.......
......2222......
....22222222....
..222222222222..
....D444444D....
...D44444444D...
...D44044044D...
...D44444444D...
...D40444404D...
...D40040004D...
...D44000444D...
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
.C00099CC99099C.
.C090090099090C.
.C090090C09900C.
.C00CCC0C0C00CC.
.C000CC0C0C0C0C.
.C0909900000900.
.C00099CC909990.
.C99999CC99999C.
.C99999CC99999C.
.C99999CC99999C.
.CCCCCCCCCCCCCC.
................`],
  [target, bitmap`
................
.....333333.....
....33333333....
..333322223333..
..332223322233..
.33222333322233.
.33223322332233.
.33223222232233.
.33223322332233.
..322333333223..
..322223322223..
..333222222333..
...3333333333...
......3333......
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
  [player]: [crate]
})

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
wwwwwwww`,
  map`
wwwwwwww
wp.....w
w.c....w
w.c...tw
w.c...tw
w.....tw
wwwwwwww`,
  map`
wwwwwwww
w..t...w
w..c...w
wtcpct.w
w..c...w
w..t...w
wwwwwwww`,
  map`
wwwwwwww
wp...t.w
wtc..c.w
w......w
w.c..ctw
w.t....w
wwwwwwww`,
  map`
wwwwwwww
w..p...w
w..c...w
w..c...w
w..tt..w
w......w
wwwwwwww`,
  map`
wwwwwwww
w.....tw
w....c.w
w..pc..w
w......w
wt.....w
wwwwwwww`,
  `
  wwwwwwww
w......w
w.cc...w
w.pc.t.w
w..c.t.w
wt...t.w
wwwwwwww`,
  `wwwwwwww
w...w.tw
w.c.w..w
wpc...tw
w.c.w..w
w...w.tw
wwwwwwww`
]

const winSound = tune`
200: C5~200,
200: E5~200,
200: G5~200,
5800`

let level = 9
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
  if (finished) {
    finished = false;
    level = 0
  }
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
