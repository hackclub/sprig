/*
Gethin Shape Game
By Gethin
Simple maze
Maze, Colors
*/

const player = "p"
const wall = "w"
const blue = "b"
const red = "r"
const green = "g"

setLegend(
  [ player, bitmap`
................
................
................
....55555555....
....57777775....
....57755775....
....57555575....
....57555575....
....57755775....
....57777775....
....55555555....
................
................
................
................
................`],
  [ wall, bitmap`
CCCC99CCCCCCCCCC
999CCCCCCCCCCC99
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCC99CCCC999
CCCC99CCC999CCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
99CCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCC9CCCCC
CCCCCCCCCCC9CCCC
CCCCCCC999CCCC99`],
  [ blue, bitmap`
................
................
................
................
....77777777....
...7755555577...
...7557777557...
...7577557757...
...7575555757...
...7577557757...
...7557777557...
...7755555577...
....77777777....
................
................
................`],
  [ red, bitmap`
................
................
................
....9999999.....
...993333399....
...933999339....
...939939939....
...939333939....
...939939939....
...933999339....
...993333399....
....9999999.....
................
................
................
................`],
  [ green, bitmap`
................
................
................
................
................
.......44.......
......4444......
.....44DD44.....
....44DDDD44....
...44DD44DD44...
..44DD4444DD44..
..44DDDDDDDD44..
..444444444444..
................
................
................`]
)

setSolids([player, wall])

let level = 0


function drawLevelCounter() {
  clearText()
  addText("Lvl " + (level + 1), { x: 8, y: 0, color: color`2` })
}

const levels = [
map`
wwwwwwwwww
wp.......w
ww.ww.w.ww
ww..wgw.ww
www.www.ww
ww..w...ww
wwrwwbwwww
wwwwwwwwww`,
map`
wwwwwwwwww
wp.www..gw
ww..ww.w.w
www......w
wbwwwr.w.w
w..wwwww.w
ww.......w
wwwwwwwwww`,
map`
wwwwwwwwww
w...pw.g.w
w.wwww.www
w.w.....rw
w.www.w.ww
w.....w..w
wwwwwwwwbw
wwwwwwwwww`,
map`
wwwwwwwwww
wp......ww
w..wwww..w
w..w..r..w
wwww.ww..w
w..g.ww..w
wb.......w
wwwwwwwwww`,
map`
wwwwwwwwww
wp.rw....w
w.wwwwww.w
w.wb..ww.w
w.www.ww.w
w.wgw.w..w
w........w
wwwwwwwwww`,
map`
wwwwwwwwww
wp....w..w
w.www.w..w
wr.w..w..w
wwww.ww..w
w.ww.ww..w
w.wg.bw..w
wwwwwwwwww`,
map`
wwwwwwwwww
wp.www..bw
ww.www..ww
ww...w..rw
wwww....ww
w..wwww.gw
w....wwwww
wwwwwwwwww`,
map`
wwwwwwwwww
wp......ww
w..wwww..w
w..w..g..w
w..w.ww..w
w..r.....w
w....b...w
wwwwwwwwww`,
map`
wwwwwwwwww
wpwr...www
w.ww.w.www
w....w..ww
wwwwwww.ww
wbwwgw..ww
w......www
wwwwwwwwww`,
map`
wwwwwwwwww
wp.wwwwwbw
ww.....w.w
ww.www.w.w
ww.www.w.w
w........w
wgwwwwwwrw
wwwwwwwwww`,
map`
wwwwwwwwww
wp.......w
w.wwwww..w
w.wwbrww.w
w.ww...w.w
w.gwww...w
w........w
wwwwwwwwww`,
map`
wwwwwwwwww
wp.ww...ww
ww..w.w.ww
www...w.rw
w.wwwww.ww
w.......ww
wbwwwwgwww
wwwwwwwwww`,
map`
wwwwwwwwww
wpw...w.bw
w.g.w.w.ww
w.w.r.w.ww
w.w.w.w.ww
w.w.w.w.ww
w...w...ww
wwwwwwwwww`,
map`
wwwwwwwwww
wp.wwww.gw
ww..ww..ww
www.ww.www
www.ww.www
w........w
wbwwwwwwrw
wwwwwwwwww`,
map`
wwwwwwwwww
wp.......w
wwwwwwww.w
wwwwwwww.w
wwwwwwww.w
wwwwwwww.w
wb.......w
wwwwwwwwww`
]


setMap(levels[level])
drawLevelCounter()


onInput("w", () => getFirst(player).y -= 1)
onInput("s", () => getFirst(player).y += 1)
onInput("a", () => getFirst(player).x -= 1)
onInput("d", () => getFirst(player).x += 1)


afterInput(() => {


  if (tilesWith(player, blue).length > 0) {
    level++

    if (level >= levels.length) {
      clearText()
      addText("YOU WIN!", { x: 3, y: 3, color: color`4` })
      return
    }

    setMap(levels[level])
    drawLevelCounter()
  }


  if (
    tilesWith(player, red).length > 0 ||
    tilesWith(player, green).length > 0
  ) {
    setMap(levels[level])
    drawLevelCounter()
  }
})
