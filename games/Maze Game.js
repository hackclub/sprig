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
const wall3 = "f"
const wall2 = "b"
const trophy = "t"

setLegend(
  [ player, bitmap`
................
................
.....LLLLL......
...LL6L6.LL.....
...L..L.LLL.....
..LL.L3LL.LL....
..LLHL.LH.LL....
...LLHHHL.L.....
...LLL..LLL.....
....LLLLLL......
...3..55..3.....
....3.55.3......
.....3FF3.......
......87........
......78........
......87........` ],
  
  [ wall, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888` ],

  [ wall2, bitmap`
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
6666666666666666` ],

   [ wall3, bitmap`
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
4444444444444444` ],
  
  [ trophy, bitmap`
................
................
................
................
.......66.......
......6..6......
...666....666...
...66......66...
....6......6....
.....6....6.....
......6..6......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......` ],
)

setSolids([player, wall, wall2, wall3])

let level = 0
const levels = [
  map`
pf....w.........
.f..www.wwwwfff.
.fw.w...........
bbb.w.wwfffwwfw.
.ww.w.........w.
.ww...wwwwwwfff.
.wfffww.......w.
.wwwwww.......w.
............wwwt`, 

  map`
pwwww.w...www.ww
....www.www.w..w
.fw.w.w.w.w.w..w
wfwfw.ww......w.
w.w.w.w..www....
w.....w.wwfwwwf.
wwwww.w.......w.
w...w...wwwwwfw.
....wwwww...wfft`,

map`
pwwww.w...www.ww
....www.wwb.w..w
.ww.w.w.w.b.w..b
bww.w.wb......b.
b.w.w.b..bbw....
b.....b.wwwwwww.
bwwww.b.......b.
b...w...wwwwwwb.
....wwwww...wwwt`,
]

setMap(levels[level])

setPushables({
  [ player ]: [wall3],
  [ wall3 ]: [wall3],
  [ wall3 ]: [wall],
  [ wall ]: [wall]
})

onInput("w", () => {
  getFirst(player).y -= 1
})


onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

function loadLevel() {
  if (level >= levels.length) {
    addText ("Winner Winner!!!", { color: color`5`}) 
    return }
  setMap (levels[level]) 
}

loadLevel()

afterInput(() => {
  const p = getFirst(player)
  const trophies = getTile(p.x, p.y).filter(t => t.type === trophy)

  if (trophies.length > 0) {
    level++
    loadLevel()
  }
})