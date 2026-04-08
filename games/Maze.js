/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Maze
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const wall2 = "b"
const trophy = "t"

setLegend(
  [ player, bitmap`
................
................
................
....777777......
...77977977.....
35.77777777.553.
57....77....575.
577.77777...775.
..777DDD77777...
...77D44D77.....
....77DDD77.....
.....77777......
.....7..77......
....77...77.....
....7.....77....
....H......H....` ],

    [ wall, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],

    [ wall2, bitmap`
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
....FFFFFFFF....
...FF666666FF...
..FF66666666FF..
..F6666996666F..
..F6666FF6666F..
..F6666996666F..
..FF66666666FF..
...FFF6666FFF...
.....FF66FF.....
......F66F......
.....FF66FF.....
.....F6666F.....
...FFF6FF6FFF...
...F666FF666F...
...FFFFFFFFFF...` ],
)

setSolids([player, wall, wall2])

let level = 0
const levels = [
  map`
pw.w.....t
.w....w.ww
.w.wwww.w.
.w.ww.w.w.
...w......
.wwww.w.w.
.w....w.w.
.wwww.www.
....w..ww.
..........`,
 ,
  map`
pw.w.b...t
.w....w.ww
.w.wwww...
.www..w.w.
...w..w.b.
.wwww.w.w.
.w....w.w.
.wwww.www.
....w..ww.
..........`
 ,
  map`
pww...w...
b...w.www.
.wwbw.b.w.
..b.www.w.
.ww...b...
....w.w.w.
.wwww.w.w.
...b..w.ww
.wwwwww...
ww......wt`
  
]



setPushables({
  [ player ]: [wall2]
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
  
    addText("YOU WIN!")
    return
  }
  setMap(levels[level])
}

loadLevel()

afterInput(() => {
  const p = getFirst(player)
   const trophies = getTile(p.x, p.y).filter(t => t.type === "t")

  if (trophies.length > 0) {
    level++
    loadLevel()
  }
  
})