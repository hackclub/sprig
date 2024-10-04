
/* 
@title: mazegame
@author: Elian
@tags: ['puzzle']
@addedOn: 2023-11-04
*/

    const player = "p"
const wall="w"
const end="e"
var gameRunning=true
setSolids([player,wall])

setLegend(
  [ player, bitmap`
................
.......999......
....999..999....
...9........9...
..99..9......9..
..99......9..9..
...99..99....99.
.....99......99.
......9...9999..
....999999......
9999...999999...
.......9999.....
......999..99...
......99....99..
......9......99.
................` ],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ end, bitmap`
3333333333333333
3..............3
3.333333333333.3
3.3..........3.3
3.3.33333333.3.3
3.3.3......3.3.3
3.3.3.3333.3.3.3
3.3.3.3663.3.3.3
3.3.3.3663.3.3.3
3.3.3.3333.3.3.3
3.3.3......3.3.3
3.3.33333333.3.3
3.3..........3.3
3.333333333333.3
3..............3
3333333333333333`]
)

let level = 0
const levels = [
  map`
................
..wwwwww...ww...
......ew....w..w
.w.wwwww....w..w
.w..............
..ww.......ww...
........ww..w...
..w...w..www..w.
w.w.wwwp...w..w.
..w.....ww.w..w.
.ww......www.ww.
.....www..w..w..
.w.w...ww......w
.w.www..w.....ww
.w......wwwwwww.
................`,
  map`
.....w.........p
.www.w.wwwwwwww.
.w.w.w........w.
.w.w.www.wwwwww.
.w.w.....w......
...wwwwwww.wwwww
.w......w.......
wwwwwww.w.w..w.w
........w.wwww.w
...w.w.........w
ww......www.wwww
ew.w.w....w...w.
.w.....w..www.w.
.wwwwwwwwww.w.w.
................
.wwwwwwwwwwwwwww`,
  map`
............w.ww
.w.wwwww.ww.w...
.w.....w..w.ww..
ww.wwwwww.w.w.w.
...w...w..w.w...
.www.w.w..www.ww
...w...ww..w....
wwew.w....ww..ww
.www.wwww..w..w.
.......ww..w..w.
.w.ww...ww......
ww.w..w..w...w..
...ww.www.w..www
.wwwwww.w...w..w
.........ww..w..
pww.www.ww.w....`,
  map`
................
ewwwwwwwwwwww...
w............w..
wwwww.........w.
w...ww...wwww.w.
w..w..w....w..w.
w.w.w.....w.w.w.
w.w.w.....w.w.w.
w..w.......w..w.
w.....w.w.....w.
w.............w.
w...wwwwwwww..w.
w.............w.
pww.........ww..
..wwwwwwwwwww...
................`,
  map`
...............p
.wwwwwwwwwwwwwww
.w..............
.w.wwwwwwwwwwww.
.w.w..........w.
.w.w.wwwwwwww.w.
.w.w.w......w.w.
.w.w.w.wwww.w.w.
.w.w.w.w.ew.w.w.
.w.w.w....w.w.w.
.w.w.wwwwww.w.w.
.w.w........w.w.
.w.wwwwwwwwww.w.
.w............w.
.wwwwwwwwwwwwww.
................`,
  map`.w.......wwe.w..
w.......w..w.w..
...ww...w..w..ww
..w..w...ww.....
..w..w..........
...ww......ww..w
w.....ww..w..w.w
.w...w..w.w..w..
.w...w..w..ww...
w.....ww........
...ww....ww.....
..w..w..w..w....
..w..w..w..w...w
...ww....ww...w.
wwp...w.....w.w.
wwww..ww...ww..w`,
map`
................
................
................
..w.w.www.w.w...
...w..w.w.w.w...
...w..w.w.w.w...
...w..www.www...
................
................
..w.w.w.www.w..w
..w.w.w..w..ww.w
..w.w.w..w..wwww
..w.w.w..w..w.ww
...w.w..www.w..w
................
................`
]
setMap(levels[level])

function checkHit(){
  let obstacles=getAll(end)
  let p=getFirst(player)

  for(let i=0; i<obstacles.length;i++){
    if(obstacles[i].y==p.y && obstacles[i].x==p.x){
      return true
    }
  }
  return false
}
function nextLevel(){
  if(checkHit()){
    level+=1
    setMap(levels[level])
  }
}

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
}) 


var gameLoop=setInterval(()=>{
  checkHit()
  nextLevel()
},300)
