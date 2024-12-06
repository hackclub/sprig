/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title:  Omarie Maze
@author: 
@tags: []
@addedOn: 2024-00-00
*/

let won = false
let lose = false

const player = "p"
const wall  = "w"
const goal = "g"
setLegend(
  [ player, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ],
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
  [ goal, bitmap`
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
6666666666666666`]
)

setSolids([wall, player])

let level = 0
const levels = [
  map`
gwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
.w...w...........w.......w...............
...w.w.wwwwwwwww.w.wwwww.w.wwwwwwwwwwwww.
wwww.w.w.........w.w.....w.w.............
.....w.w.wwwwwwwww.w.wwwww.w.wwwwwww.wwww
.wwwww.w.w...w...w.w.w.w.w.w.......w.....
.......w.w.w.w.w.w.w.w.w.w.w.wwwwwwwwww.w
wwwwwwww.w.w.w.w.w.w.w.w.w.w..........w.w
...........w...w.w.w.w.w.w.wwwwwwwwwwww.w
wwwwwwwwwwwwwwww.w.w.w.w.w.w............w
.........w.........w...w.w.w.wwwwwwwwwwww
.wwwwwww.wwwwwwwwwww.www.w.w.w...........
.......w.................w.w.w.wwwwwwwww.
wwwwww.wwwwwwwwwwwwwwwwwww.w.w.w.........
...........................w.w.w.wwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwww.w.w.wwwwwwww
.........................w...w.w.........
wwwwwwwwwww.wwwwwwww.wwwww.www.wwwwwwwwww
..........w.w............................
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwp`,
  map`
...w...w.............................w...
.w.w.w.w.wwwwwwwwwwwwwwwwwwwwwwwwwww.w.w.
.w.w.w.w...........................w.w.w.
.w.w.w.wwwwwwwwwwwwwwwwwwwwwwwwwww.w.w.w.
.w.w.w.w...........................w.w.w.
.w.w.w.w.wwwwwwwwwwwwwwwwwwwwwwwwwww.w.w.
.w.w.w.w...........................w.w.w.
.w.w.w.wwwwwwwwwwwwwwwwwwwwwwwwwww.w.w.w.
.w.w.w.w...........................w.w.w.
.w.w.w.w.wwwwwwwwwwwwwwwwwwwwwwwwwww.w.w.
.w.w.w.w...........................w.w.w.
.w.w.w.wwwwwwwwwwwwwwwwwwwwwwwwwww.w.w.w.
.w.w.w.w...........................w.w.w.
.w.w.w.w.wwwwwwwwwwwwwwwwwwwwwwwwwww.w.w.
.w.w.w.w...........................w.w.w.
.w.w.w.wwwwwwwwwwwwwwwwwwwwwwwwwww.w.w.w.
.w.w.w.www...w...w...w...w...w...w.w.w.w.
.w.w.w.www.w.w.w.w.w.w.w.w.w.w.w.w.w.w.w.
.w.w.w.www.w.w.w.w.w.w.w.w.w.w.w.w.w.w.w.
gw...w.....w...w...w...w...w...w...w...wp`,
]
leveltimes = [45, 85]
setMap(levels[level])

setPushables({
  [ player ]: []
})
var timer = 45


setInterval(() => {
  if(won==false){ 
      if (timer>0) {
        timer-=1
        clearText()
        addText(timer.toString(), {
          x: 10,
          y: 4,
          color: color`3`
        })
      }
      if(tilesWith(player, goal).length>0 && timer>0 && level==levels.length-1) {
        won=true
        clearText()
        addText("YOU WIN", { 
          x: 10,
          y: 4,
          color: color`3`
    })
  }
    if (timer==0) {
    lose=true
    clearText()
    addText("YOU LOSE", { 
      x: 10,
      y: 4,
      color: color`3`
    })
    }
  }
}, 1000)

onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})

afterInput(() => {
  if(tilesWith(player, goal).length>0 && timer>0 && level==levels.length-1) {
      won=true
      clearText()
      addText("YOU WIN", { 
        x: 10,
        y: 4,
        color: color`3`
      })
  } else if (lose == false && tilesWith(player, goal).length > 0) {
    level+=1
    timer=leveltimes[level]
    setMap(levels[level])
  }
  // won = true
})