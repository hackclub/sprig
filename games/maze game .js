/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: maze game 
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const wall2 = "b"
const wall3 = "c"
const trophy = "t"

setLegend(
  [player, bitmap`
................
................
.......2........
.....62266266...
.....66266266...
.....66266266...
.....62266226...
.....62666622...
.2...26666662...
.....26666666...
................
................
................
................
................
................`],
   [wall, bitmap`
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
4444444444444444`],
  [wall2, bitmap`
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
4444444444444444`],
  [wall3, bitmap`
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
4444444444444444`],
   [trophy, bitmap`
................
................
................
................
................
...66....66.....
...666..666.....
...66666666.....
....666666......
.....6666.......
......66........
......66........
.....6666.......
................
................
................`],
 
  
)

setSolids([player, wall, wall3])

let level = 0
const levels = [
  map`
pw.wwwww.w
.w.......w
.w.w.www.w
.w.w...w.w
.w.www.w.w
.......w.w
.wwwwwww.w
.w.......w
.www.wwwww
ww.bbbbbbt`,
  
   map`
pw.wwwwwww
.wwww....w
.w....ww.w
cc.ww.ww.w
cc...w.w.w
c...w..wbb
cwwwww..bb
........wb
.wwwwwwwwb
.w.......t`,

   map`
pwbbwbbbww
bbbbwbwbbw
wwbbwbwbbw
bbbwwbwbbw
bwbbwbwbbw
bbbbbbwwwb
bwbwwwwbwb
bwbbbbbbwb
bwwwwwwbwb
bbbbbbbbbt`,
]

setMap(levels[level])

setPushables({
  [ player ]: [wall3],
  [ wall3 ]: [wall3],
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
    addText("You Win!")
    return
  }
  setMap(levels[level])}
loadLevel()
  

afterInput(() => {
  const p = getFirst(player)
  const trophies = getTile(p.x, p.y).filter(t => t.type === trophy)

  if (trophies.length > 0) {
    level ++
    loadLevel()
  }
})