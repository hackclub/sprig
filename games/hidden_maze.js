
/* 
@title: hidden_maze
@author: Rylan Berry
@tags: ['puzzle']
@addedOn: 2023-05-06
*/

    /*
This is hidden maze, the first of three, you have 5 mazes to get through until you're done, 
if you want more out of this, go to hidden maze infinite, it's in the gallery aswell,
depending on when you're playing this, I recomend checking to see if the 3rd is out yet.
Controls are WASD, and try to get to the gold cup
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
...c...............g
.c.c.cccccccccccccc.
.c...c...c...c...cc.
.c.ccc.c.c.c.c.c.c..
.c.....c.c.c.c.c.c.c
.cccc.cc...c.c.c....
.c..cccccccc.c.cccc.
.cc...............c.
.cc.ccccc..cccccccc.
..c.....ccccc.....c.
c.ccc.c.c...c.ccc.c.
....c.c.c.c.c.c...c.
.cc.ccc...c.c.c.ccc.
.c......c.c...c...c.
.cccccccccccccc.c.c.
p...............c...`,
  map`
......c.............
.cccc...ccccccccccc.
.c...ccc..........c.
.c.c.....cccccccc.c.
.c..cc.cc.......c.c.
.c.cg..cc.ccccc.c.c.
.c.cccccc.....c.c.c.
.c.c.cccccccc.c.c.c.
.c.c..........c.c.c.
.c.ccccccccccc..c.c.
.c........cccc.c..c.
.c.cccccc......c.c..
.ccc.....ccccccc.c.c
.....ccc.........c..
ccccc...ccccccccc.c.
p.....c.............`,
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
    // console.log("you win")
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

// console.log("01000100 01100101 01100001 01110010 00100000 01100110 01110010 01101001 01100101 01101110 01100100 00101100 00001010 01001001 00100000 01100001 01101101 00100000 01101001 01101110 01110110 01101001 01110100 01101001 01101110 01100111 00100000 01111001 01101111 01110101 00100000 01110100 01101111 00100000 01101101 01111001 00100000 01101110 01100101 01110111 00100000 01101101 01100001 01111010 01100101 00101100 00100000 01110100 01110010 01111001 00100000 01101110 01101111 01110100 00100000 01110100 01101111 00100000 01100111 01100101 01110100 00100000 01110011 01110100 01110101 01100011 01101011 00101100 00100000 01101101 01100001 01101011 01100101 00100000 01110011 01110101 01110010 01100101 00100000 01110100 01101111 00100000 01101000 01100001 01110110 01100101 00100000 01100110 01110101 01101110 00100001")


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

