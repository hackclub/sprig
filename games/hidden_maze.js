/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const player = "p"
const wall = "w"
const wall2 = "c"
const goal = "g"

const win = tune`
1000,
500: F4^500 + A4^500 + C5^500,
500: G4^500 + B4^500 + D5^500,
500: A4^500 + C5^500 + E5^500,
500,
500: F4^500 + A4^500 + C5^500,
500: D5^500 + B4^500 + G4^500,
500: E5^500 + C5^500 + A4^500,
500,
500: E5/500 + C5-500 + A4~500,
10500`
const up = tune`
500: D5-500,
15500`
const down = tune`
500: B4-500,
15500`
const left = tune`
500: C5-500,
15500`
const right = tune`
500: A4-500,
15500`



setLegend(
  [ player, bitmap`
................
......22222.....
......2FFF2.....
.....22F6F2.....
.....2F66F2222..
...222F666F202..
...200F060F202..
...202F666F002..
...202F660F222..
...222F006F2....
....2F6666F2....
....2F666F22....
....22FFF22.....
....2202022.....
....2002002.....
....2222222.....` ],
  [ goal, bitmap`
................
2222222222222222
2266666666666622
26266F666F666262
26266F6F6F666262
226666FFF6666622
2222666666662222
.22226666662222.
....22266222....
......2662......
......2662......
.....226622.....
....22666622....
...2266666622...
...2666666662...
...2222222222...` ],
  [ wall, bitmap`
0000000000000000
0333333305555555
0333333305555555
0333333305555555
0333333305555555
0333333305555555
0333333305555555
0333333305555555
0000000000000000
0666666604444444
0666666604444444
0666666604444444
0666666604444444
0666666604444444
0666666604444444
0666666604444444` ],
  [ wall2, bitmap`
0000000000000000
0333333305555555
0333333305555555
0333333305555555
0333333305555555
0333333305555555
0333333305555555
0333333305555555
00000000L0000000
0666666604444444
0666666604444444
0666666604444444
0666666604444444
0666666604444444
0666666604444444
0666666604444444` ]
)

setSolids([])

let level = 0
const levels = [
  
  map`
...cg
.c.c.
.c...
pc.c.`,
  map`
.cc.....cg
....c.c.c.
.cc.c.c...
.c..cccccc
.cccc...c.
..c.c.c.c.
c.c.ccc...
p.......cc`,
  map`
...........c..g
.c.ccccc.ccc.cc
.c....c........
.cccccccccccccc
.c...c...c...c.
.c.c.c.c...c.c.
.c.c.ccccccc.c.
.c.c.c.......c.
.ccc.c.c.ccccc.
.....c.c.......
cccc.ccccccccc.
p..............`,
  map`
g`
]

setBackground(wall)

setSolids([ player, wall2 ])

setMap(levels[level])

setPushables({
  [ player ]: []
})

afterInput(() => {
  if (level != levels.length -1 && (getFirst(goal).y == getFirst(player).y && getFirst(goal).x == getFirst(player).x)) {
    console.log("you win")
    level += 1
    setMap(levels[level])
    if (level == levels.length-1){
      
      addText("You've Won!", { 
        x: 5,
        y: 10,
        color: color`0` })
        playTune(win)
    }
  }
})

onInput("s", () => {
  if (level != levels.length -1){
    getFirst(player).y += 1
    playTune(down)
  }
})

onInput("w", () => {
  if (level != levels.length -1){
    getFirst(player).y -= 1
    playTune(up)
  }
})


onInput("a", () => {
  if (level != levels.length -1){
    getFirst(player).x -= 1
    playTune(right)
  }
})


onInput("d", () => {
  if (level != levels.length -1){
    getFirst(player).x += 1
    playTune(left)
  }
})

