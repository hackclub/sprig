/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: jumper man
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const wall = "w"
const coin = "c"

setLegend(
  [ player, bitmap`
000000000....00.
000000000...0000
00CCCCC00...0000
00CC0CC00...0000
..CCCCC......33.
..CCCCC......33.
.333333333...33.
.33003030333333.
.33033003333333.
.330030303......
.333333333......
.333333333......
....000.........
....000.........
....00000.......
....00000.......` ],[ wall, bitmap`
CCCCCCCCCCCCCCCC
CCC000CCCC000CCC
CCC000CCCC000CCC
CCCCCCC00CCCCCCC
CCC000C00C000CCC
CCC000C00C000CCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCC000C00C000CCC
CCC000C00C000CCC
CCCCCCC00CCCCCCC
CCC000CCCC000CCC
CCC000CCCC000CCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],[ coin, bitmap`
................
................
................
....66666666....
..666666666666..
..666666666666..
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
..666666666666..
..666666666666..
....66666666....
................
................` ]
)

setSolids([player,wall])

let level = 0
const levels=map = [
  map`
wwwwwwwwwwwwwwwwwwwwwwwww
ww.......................
wc...........cccccccccccc
ww...........wwwwwwwwwwww
wwwwwwwcw.wwcwwwwwwwwwwww
wc...wwwwww..wwwwwwwwwwww
w.ww..wwww..wwwwwwwwwwwww
w.pww......wwwwwwwwwwwwww
w...cw.....wwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwww
p.wwwwwwwwwwwwwwwwwwwwwww
w...............c...wwwww
ww...........wwwwww...www
wwwwwwwcwcww.wwwwwww..www
wc...wwwwww..wwwwwwww..ww
w.ww..wwww..wwwwwwwwww..w
w.cww......wwwwwwwwwwww.c
w..www.....wwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwww
p.wwwwwwwwwwwwwwwwwwwwwww
w..........w........wwwww
ww.........w.wwwwww...www
wwwwwwwcwcww.wwwwwww..www
w....wwwwww..wwwwwwww..ww
w.ww..wwww..wwwwwwwwww..w
w..ww......wwwwwwwwwwww..
w..www.....wwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwww`
]
setMap(levels[0])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})


addText("welcome",{
  x: 11,
  y:8,
  color:color`4`
})

function hasCoin(tile) {
  return tile.type =="c";
}

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})


onInput("a", () => {
  getFirst(player).x -= 1
})

afterInput(() => {
  x = getFirst(player).x
  y = getFirst(player).y
  contents = getTile( x, y)
  if (contents.some(hasCoin))
  {
    clearTile(x, y)
    addSprite(x, y, player)
    if (getAll(coin).length == 0)
    {
    console.log("Success")
      level += 1
      setMap(levels[level % levels.length])
    }
  }
  //getAll(coin)
})
