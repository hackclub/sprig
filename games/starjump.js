/*
@title: Starjump
@author: skifli

Instructions:

Hit "run" to execute the code and
start the game (you can also press shift+enter).

The objective is to get all the stars. Use WASD to move. Later levels also require keys to be obtained to gain access to the stars.
Press k to reset the level.
*/

const PLAYER = "p"
const KEY = "k"
const STAR = "s"
const WALL = "w"
const WALL_BOTTOM = "g"
const WALL_DIRT = "o"
const WALL_DIRT_SIDES = "i"
const WALL_DIRT_TOPS = "v"
const WALL_DIRT_LSIDE = "j"
const WALL_DIRT_RSIDE = "h"
const WALL_LSIDE = "l"
const WALL_RSIDE = "r"
const WALL_BOTTOM_LSIDE = "y"
const WALL_BOTTOM_RSIDE = "n"
const WALL_3_TOP = "f"
const WALL_3_BOTTOM = "m"

const MAP_SIZE = 15
const MIDDLE = Math.floor(MAP_SIZE/2)

const move = tune`
500: A4~500,
15500`
const star = tune`
250: A4-250,
250: E5-250,
250: A5-250,
7250`
var key = tune`
166.66666666666666: A4/166.66666666666666,
166.66666666666666: C5/166.66666666666666 + G4^166.66666666666666,
166.66666666666666: E5/166.66666666666666,
166.66666666666666: G4^166.66666666666666,
4666.666666666666`
const newLevel = tune`
250: A4~250 + E5-250,
250: G4~250 + D5-250,
250: F4~250 + C5-250,
7250`
const finishedTune = tune`
125: A4~125 + C4-125,
125: A4~125 + D4^125,
125: C4-125 + C5^125,
125: D4^125 + G4/125,
125: D5~125 + C4-125,
125: F5~125 + D4^125 + F4^125,
125: C4-125 + A4/125,
125: D4^125,
125: D5~125 + C4-125,
125: A4~125 + D4^125 + C5/125,
125: C4-125,
125: F4~125 + D4^125 + C5^125,
125: A4~125 + C4-125,
125: D4^125 + F4/125 + C5/125,
125: C4-125,
2125`

var won = false;
var finished = false;

function handleMove() {
  if (!finished) { 
    playTune(move)
    
    let coords = getFirst(PLAYER)
    let starCoords = getFirst(STAR)
    let keyCoords = getFirst(KEY)

    if (keyCoords != undefined) {
      let keys = getAll(KEY)
      
      for (let i = 0; i < keys.length; i++) {
        let keyFound = keys[i]
        
        if (coords.x == keyFound.x && coords.y == keyFound.y) {
          playTune(key)
            
          keyFound.remove()
          
          return
        }
      }

      return
    }
  
    if (coords.x == starCoords.x && coords.y == starCoords.y) {
        playTune(star)
      
        won = true
        addText("PRESS L", {x: MIDDLE, y: MIDDLE, color: color`8`})
    }
  }
}

setLegend(
  [ PLAYER, bitmap`
................
...00..0000.....
...0800888000...
..088888888800..
..088HH888800...
..0888888880....
...000CCCCCL....
.....LCC29CL....
....LLCC29CCL...
....LCCCCCCCL...
....L7777777L...
....L777777L....
.....L77577L....
.....F77575L....
....FF705750....
....FFF007500...` ],
  [ STAR, bitmap`
.......00.......
......0660......
......0660......
.....066660.....
0000006666000000
0666666666666660
.06666066066660.
..066606606660..
...0660660660...
...0666666660...
..066666666660..
..066666666660..
.06666600666660.
.066600..006660.
06600......00660
000..........000`],
  [ KEY, bitmap`
................
................
......000.......
.....07770......
....077.770.....
....07...70.....
....077.770.....
.....07770......
......070.......
......070.......
......070.......
......0770......
......070.......
......0770......
.......00.......
................`],
  [ WALL, bitmap`
D4D4DD4DD44DD4DD
DDDDD44444DDDD4D
D4444DDD444D4DD4
CCCCCCCCCCCCCCCC
CCCCCCCC11CCCCCC
CCL1CCCCLCCCCCCC
CC11CCCCCCC1L1CC
CCCCCCCCCCC111CC
CCCCCCCCCCCCCCCC
CCCCCCC11CCCCCCC
CC1LCCCL1CCCC11C
CC11CCCCCCCCC1LC
CCCCCCCCCCCCCCCC
CLCCCCCCCC11CCCC
C11CCCCCCC1LCCCC
CCCCCCCCCCCCCCCC`],
  [ WALL_BOTTOM, bitmap`
CCCCCCCCCCCCCCCC
C11CCCCCCC1LCCCC
CLCCCCCCCC11CCCC
CCCCCCCCCCCCCCCC
CC11CCCCCCCCC1LC
CC1LCCCL1CCCC11C
CCCCCCC11CCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCC111CC
CC11CCCCCCC1L1CC
CCL1CCCCLCCCCCCC
CCCCCCCC11CCCCCC
CCCCCCCCCCCCCCCC
D4444DDD444D4DD4
DDDDD44444DDDD4D
D4D4DD4DD44DD4DD`],
  [ WALL_DIRT, bitmap`
CCCCCCCCCCCCCCCC
CCC11CCCCCCL1CCC
CCC1LCCCCCC11CCC
CCCCCCCCCCCCCCCC
CCCCCCCC11CCCCCC
CCL1CCCCLCCCCCCC
CC11CCCCCCC1L1CC
CCCCCCCCCCC111CC
CCCCCCCCCCCCCCCC
CCCCCCC11CCCCCCC
CC1LCCCL1CCCC11C
CC11CCCCCCCCC1LC
CCCCCCCCCCCCCCCC
CLCCCCCCCC11CCCC
C11CCCCCCC1LCCCC
CCCCCCCCCCCCCCCC`],
  [ WALL_DIRT_SIDES, bitmap`
4DCCCCCCCCCCCC4D
44C11CCCCCCL1C4D
D4C1LCCCCCC11C4D
D4CCCCCCCCCCCC44
D4CCCCCC11CCCCD4
D4L1CCCCLCCCCCD4
4411CCCCCCC1L1D4
4DCCCCCCCCC111D4
4DCCCCCCCCCCCCD4
4DCCCCC11CCCCCD4
441LCCCL1CCCC144
D411CCCCCCCCC14D
D4CCCCCCCCCCCC4D
D4CCCCCCCC11CC4D
D41CCCCCCC1LCC4D
D4CCCCCCCCCCCC4D`],
  [ WALL_DIRT_TOPS, bitmap`
DDDDD44444DDDD44
444444DDD444444D
C1CC11CCC1LCCCCC
CCCC1LCCC11CC11C
CCCCCCCCCCCCCL1C
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCL1CCCCCCCCC
CCCCC11CCCL1CCCC
CCCCCCCCCCC1CCCC
C11CCCCCCCCCCCCC
CL1CCCCC11CCC1LC
CCCCCCCC1LCCC11C
CCCC11CC11CCCCCC
444444DDDDDD4444
DDDDD44444444DDD`],
  [ WALL_DIRT_LSIDE, bitmap`
4DCCCCCCCCCCCCCC
44C11CCCCCCL1CCC
D4C1LCCCCCC11CCC
D4CCCCCCCCCCCCCC
D4CCCCCC11CCCCCC
D4L1CCCCLCCCCCCC
4411CCCCCCC1L1CC
4DCCCCCCCCC111CC
4DCCCCCCCCCCCCCC
4DCCCCC11CCCCCCC
441LCCCL1CCCC1CC
D411CCCCCCCCC1CC
D4CCCCCCCCCCCCCC
D4CCCCCCCC11CCCC
D41CCCCCCC1LCCCC
D4CCCCCCCCCCCCCC`],
  [ WALL_DIRT_RSIDE, bitmap`
CCCCCCCCCCCCCC4D
CCC11CCCCCCL1C4D
CCC1LCCCCCC11C4D
CCCCCCCCCCCCCC44
CCCCCCCC11CCCCD4
CCL1CCCCLCCCCCD4
CC11CCCCCCC1L1D4
CCCCCCCCCCC111D4
CCCCCCCCCCCCCCD4
CCCCCCC11CCCCCD4
CC1LCCCL1CCCC144
CC11CCCCCCCCC14D
CCCCCCCCCCCCCC4D
CCCCCCCCCC11CC4D
CC1CCCCCCC1LCC4D
CCCCCCCCCCCCCC4D`],
  [ WALL_LSIDE, bitmap`
D4D4DD4DD44DD4DD
DDDDD44444DDDD4D
D4444DDD444D4DD4
44CCCCCCCCCCCCCC
D4CCCCCC11CCCCCC
D4L1CCCCLCCCCCCC
D411CCCCCCC1L1CC
4DCCCCCCCCC111CC
4DCCCCCCCCCCCCCC
4DCCCCC11CCCCCCC
4D1LCCCL1CCCC11C
4D11CCCCCCCCC1LC
4DCCCCCCCCCCCCCC
D4CCCCCCCC11CCCC
D41CCCCCCC1LCCCC
D4CCCCCCCCCCCCCC`],
  [ WALL_RSIDE, bitmap`
DD4DD44DD4DD4D4D
D4DDDD44444DDDDD
4DD4D444DDD4444D
CCCCCCCCCCCCCC44
CCCCCC11CCCCCC4D
CCCCCCCLCCCC1L4D
CC1L1CCCCCCC114D
CC111CCCCCCCCCD4
CCCCCCCCCCCCCCD4
CCCCCCC11CCCCCD4
C11CCCC1LCCCL1D4
CL1CCCCCCCCC11D4
CCCCCCCCCCCCCCD4
CCCC11CCCCCCCC4D
CCCCL1CCCCCCC14D
CCCCCCCCCCCCCC4D`],
  [ WALL_BOTTOM_LSIDE, bitmap`
D4CCCCCCCCCCCCCC
D41CCCCCCC1LCCCC
D4CCCCCCCC11CCCC
4DCCCCCCCCCCCCCC
4D11CCCCCCCCC1LC
4D1LCCCL1CCCC11C
4DCCCCC11CCCCCCC
4DCCCCCCCCCCCCCC
4DCCCCCCCCC111CC
D411CCCCCCC1L1CC
D4L1CCCCLCCCCCCC
D4CCCCCC11CCCCCC
44CCCCCCCCCCCCCC
D4444DDD444D4DD4
DDDDD44444DDDD4D
D4D4DD4DD44DD4DD`],
  [ WALL_BOTTOM_RSIDE, bitmap`
CCCCCCCCCCCCCC4D
CCCCL1CCCCCCC14D
CCCC11CCCCCCCC4D
CCCCCCCCCCCCCCD4
CL1CCCCCCCCC11D4
C11CCCC1LCCCL1D4
CCCCCCC11CCCCCD4
CCCCCCCCCCCCCCD4
CC111CCCCCCCCCD4
CC1L1CCCCCCC114D
CCCCCCCLCCCC1L4D
CCCCCC11CCCCCC4D
CCCCCCCCCCCCCC44
4DD4D444DDD4444D
D4DDDD44444DDDDD
DD4DD44DD4DD4D4D`],
  [ WALL_3_TOP, bitmap`
D4D4DD4DD44DD4DD
DDDDD44444DDDD4D
D4444DDD444D4DD4
44CCCCCCCCCCCC4D
D4CCCCCC11CCCC4D
D4L1CCCCLCCCCC4D
D411CCCCCCC1L14D
4DCCCCCCCCC11144
4DCCCCCCCCCCCC44
4DCCCCC11CCCCC44
4D1LCCCL1CCCC14D
4D11CCCCCCCCC144
4DCCCCCCCCCCCC44
D4CCCCCCCC11CCD4
D41CCCCCCC1LCCD4
D4CCCCCCCCCCCCD4`],
  [ WALL_3_BOTTOM, bitmap`
D4CCCCCCCCCCCCD4
D41CCCCCCC1LCCD4
D4CCCCCCCC11CCD4
4DCCCCCCCCCCCC44
4D11CCCCCCCCC144
4D1LCCCL1CCCC14D
4DCCCCC11CCCCC44
4DCCCCCCCCCCCC44
4DCCCCCCCCC11144
D411CCCCCCC1L14D
D4L1CCCCLCCCCC4D
D4CCCCCC11CCCC4D
44CCCCCCCCCCCC4D
D4444DDD444D4DD4
DDDDD44444DDDD4D
D4D4DD4DD44DD4DD`],
)

let currentLevel = 1
let levels = [map`
p.jh....i...jooo
..yn..r.i...jooo
.....ln.i...yggg
wwr.ln..i.......
gggwn...ywr.lr..
...i.....yn.jh..
...i........jn..
...i.......ln...
...i..lwwwwh..lw
...ywwogggggr.yg
....joh.....i...
....ygh.....jwr.
.lr...jwwr..joh.
.yh...yooh..joh.
..jwr..ygn..ygn.
s.joh...........`, map`
pjh...joh.......
.yh..lgggvr....l
..yr.i....i.lr.j
r..i.i.lr.i.jh.j
h..i.i.yh.i.jh.j
h.lh.i..i.i.jh.j
h.yowor.i.i.jh.j
h..yggn.i.i.jh.j
or......i.i.jn.j
oor...lvn.i.i..j
ooowwvn...i.i.lo
ooooh....ln.i.jo
ogoon..lwn..i.yo
h.yn...yn..lh..y
h..........jh...
owwwwwwwwwwoh..s`,map`
pjooooooh.......
.joogooon..lr...
.ygn.yoh..lggr..
......yn.lh..i.l
...lr....jh..i.j
wwwoowwr.yn.lh.j
oooggggh....jh.j
ooh....jvwvvoh.j
oon.lr.i.i..yn.j
on..jh.i.i.....y
h...ynsi.i..lr..
or....lh.i..jh..
oh....jh.ik.jh..
oor...yn.jwwoh..
ooh......ygggn..
ooowwwwr........`, map`
p.yggggggggogggo
r..........i...j
or....lwwr.i.f.j
oor...yooh.m.i.j
ooor...yoh...i.j
oooor...yowwwh.j
ooooh....yoooh.j
ooooor....yooh.j
oooooh.....yoh.j
oogggn......jh.j
on..........yhkj
h......lr....ywo
h..lwwvggr....yo
h..ygn...yr....y
h.........yr....
owwwwwwwr.kjr.s.`, map`
pi...i......jooo
.i.f.i......yggg
.i.i.i..lwr.....
.i.i.i..joh..f..
.i.i.i.looh..i..
.i.i.i.jooh..i..
.i.i.i.jooh..i..
.i.i.i.jooh..i..
.i.i.i.joon..i..
.i.i.i.joo..ln..
.i.i.i.jon..i...
.i.i.i.jo..lh...
.i.i.i.jn..ygr.k
.i.i.iki.....yww
.m.i.ygn.lwr..yo
...i.....joor.sj`]

setMap(levels[currentLevel])
setSolids([PLAYER, WALL, WALL_BOTTOM, WALL_DIRT, WALL_DIRT_SIDES, WALL_DIRT_TOPS, WALL_DIRT_LSIDE, WALL_DIRT_RSIDE, WALL_LSIDE, WALL_RSIDE, WALL_BOTTOM_LSIDE, WALL_BOTTOM_RSIDE, WALL_3_TOP, WALL_3_BOTTOM])

onInput("w", () => {
  if (!won) {
    getFirst(PLAYER).y -= 1
  }
})

onInput("s", () => {
  if (!won) {
    getFirst(PLAYER).y += 1
  }
})

onInput("a", () => {
  if (!won) {
    getFirst(PLAYER).x -= 1
  }
})

onInput("d", () => { 
  if (!won) {
    getFirst(PLAYER).x += 1
  }
})

onInput("l", () => {
  if (won) {
    currentLevel++
    clearText()

    if (currentLevel == levels.length) {
        playTune(finishedTune)
        addText("YOU WON", {x: MIDDLE, y: MIDDLE, color: color`6`});
      
        finished = true;
    } else {
      won = false
      
      setMap(levels[currentLevel])
    }

    playTune(newLevel)
  }
})


onInput("k", () => { 
  setMap(levels[currentLevel])
})

afterInput(() => {
  handleMove()
})