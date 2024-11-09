
/* 
@title: hidden_maze_escape
@author: Rylan Berry
@tags: ['puzzle']
@addedOn: 2023-05-23
*/

    /*
              READ ME!
yes, the marvelous sequel to the 1st and 2nd
On the topic of the 1st and 2nd games, hidden maze and hidden maze infinite respectively you should play them before this one 
because this one contians spoilers for the 1st game's maps.
Anyways, the controls here are the same as before, WASD to move, 
but this time you can press J to go back to the start of the game(which ends up being useful)
also beware of places where you can "no-clip" through the floor, 
you'll have to complete a puzzle to get out of them.

Once you're done with this game I recomend keeping an eye on the 2nd game, 
that game will be the only one out of the 3 to recive updates in the future.
*/

const player = "p"
const wall = "w"
const wall2 = "c"
const goal = "g"

const block = "b"
const blockGoal = "d"
const hide = "h"

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
const end = tune`
2000: C4~2000 + D4^2000,
2000: E4~2000 + F4^2000,
2000: C4~2000 + D4^2000,
58000`
const up = tune`
491.8032786885246: F4/491.8032786885246,
15245.901639344262`
const down = tune`
500: D4/500,
15500`
const left = tune`
500: E4/500,
15500`
const right = tune`
500: C4/500,
15500`

function areTouching(item1, item2){
  return tilesWith(item1, item2).length >= tilesWith(item2).length && tilesWith(item2).length != 0
  
}

setLegend(
  [ player, bitmap`
................
......22222.....
......2LLL2.....
.....22L1L2.....
.....2L11L2222..
...222L111L202..
...200L010L202..
...202L111L002..
...202L110L222..
...222L001L2....
....2L1111L2....
....2L111L22....
....22LLL22.....
....2202022.....
....2002002.....
....2222222.....` ],
  [ goal, bitmap`
................
.00000000000000.
0033333333333300
03033C333C333030
03033C3C3C333030
003333CCC3333300
..0033333333000.
...0033333300...
....00033000....
......0330......
......0330......
.....003300.....
....00333300....
...0033333300...
...0333333330...
...0000000000...` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L1111111L1111111
L1111111L1111111
L1111111L1111111
L1111111L1111111
L1111111L1111111
L1111111L1111111
L1111111L1111111
LLLLLLLLLLLLLLLL
L1111111L1111111
L1111111L1111111
L1111111L1111111
L1111111L1111111
L1111111L1111111
L1111111L1111111
L1111111L1111111` ],
  [ wall2, bitmap`
LLLLLLLLLLLLLLLL
L111L111L1L11111
L1111L11L1L11111
L1L11111L11L1111
LL11111LL1111L11
L1111111L111L11L
L11LL111L1L11LL1
L111L111LLL11111
LLLLLLLLLLLLLLLL
L111L111L111L111
L11L1111L111L111
L111L111L111L111
LL111111L1LL111L
L11L1111L11111L1
L11L11LLL11111L1
L1L11111L1L111L1` ],
  [block, bitmap`
................
.333333333333333
.399999939999993
.399999939999993
.399999939999993
.399999939999993
.399999939999993
.399999939999993
.333333333333333
.399999939999993
.399999939999993
.399999939999993
.399999939999993
.399999939999993
.399999939999993
.333333333333333`],
  [blockGoal, bitmap`
................
.....9999999....
...99333333399..
..9939999999399.
..9399333339939.
.939939999939939
.939399333993939
.939393999393939
.939393939393939
.939393999393939
.939399333993939
.939939999939939
..9399333339939.
..9939999999399.
...99333333399..
.....9999999....`],
  [hide, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`]
  
)

setSolids([])

let level = 0
const levels = [
  
  map`
...cg
.c.c.
.c...
pc.ch`,
  map`
.cc.....cg
....c.c.c.
.cc.c.c...
.c..cccccc
.cccc...c.
..c.chc.c.
c.c.ccc...
p.......cc`,
  map`
...........c..g
.c.ccccc.ccc.cc
.c....c........
.cccccccccccccc
.c...c...c...c.
.c.c.chc...c.c.
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
.cc.ccccch.cccccccc.
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
.c.hcc.cc.......c.c.
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
g`,
]

let hLvlsDone = 0;
const hiddenLvls = [
  map`
ccccd
.....
.bc..
p.ccc`,
  map`
cccccccccd
cccccc....
.ccccc...b
........c.
..ccccc.cc
.........c
bbccccc.cc
p.cccccccc`,
  map`
ccccccccccc...d
ccccccccccc.cbc
ccccccccccc.cbc
ccccccccc.c.cbc
.........b..c..
.cccccccc.ccc..
...b...b....c..
cc.cccccccccc..
.........bb.c..
.cccccccccc.c..
b..cccccccc.c..
pc.............`,
  map`
.....b.b...b.b..cccd
.cc...b..b..b.....cd
..c..b.b...b.b..c.b.
c.ccccccccccccccccc.
c.c...c...c...c...c.
c...c...c...c...c.c.
ccccccccccccccccc.c.
.bbbbbbb..........c.
.cccccccc.........c.
.........cccccccccc.
ccccccc.b.........c.
......ccccccccccc.c.
.ccc....c...c.....c.
.c.cccc...c...ccccc.
.cb.b.cccccccc....b.
p..c..b.........c...`,
  map`
ddbbbbbbbbbbbbbbbb..
bcccccccccccccccc...
bcdb....c...c...c..b
bcccccc...c...c...cb
bcc.cccccccccccc..cb
bc...............dcb
bc.bcccccccccccccccb
bc.b..b.b.b.b.b.b.cb
bccc...b.b.b.b.b..cb
bc....b.b.b.b.b.b.cb
bc.....b.b.b.b.b..cb
bc....b.b.b.b.b.b.cb
bccccccccccccccccbcb
b................b.b
b..ccccccccccccccccd
pbbbbbbbbbbbbbbbbbbd`,
  
  ]

setBackground(wall)

setSolids([ player, wall2, block ])

setMap(levels[level])

setPushables({
  [ player ]: [block, player],
  [ block ] : [block, block]
})

afterInput(() => {
  if (level != levels.length -1 && areTouching(player, goal)) {
    // console.log("you die")
    level += 1
    setMap(levels[level])
    if (level == levels.length-1){
      
      addText("Have You Won?", { 
        x: 4,
        y: 10,
        color: color`C` })
        playTune(end)
    }
  }
  if (areTouching(player, hide)){
    setMap(hiddenLvls[level])
  }
  if (areTouching(block, blockGoal)){
    // console.log("here")
    level +=1
    hLvlsDone +=1
    setMap(levels[level])
    if(hLvlsDone >= hiddenLvls.length){
      addText("You Have Escaped", { 
        x: 2,
        y: 10,
        color: color`6` })
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

onInput("j", () => {
  level = 0
  hLvlsDone = 0;
  setMap(levels[level])
})
