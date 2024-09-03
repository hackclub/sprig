/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Spring
@author: TechPandaPro 
@tags: []
@addedOn: 2024-08-15
*/

const player = "p"

const background = "b"

const wall = "w"
const wall_no_stick = "n"
const lava_top = "t"
const lava = "l"
const ice = "i"
const ladder = "c"
const one_way_up = "u"
const key = "k"
const goal = "g"
const locked = "L"
const locked_graphic = "G"
const unlocked = "U"
const moving_platform = "m"
const movement_guide = "M"
const spike_up = "s"
const spike_down = "d"
const spike_left = "q"

const arrow_0 = "0"
const arrow_22 = "1"
const arrow_45 = "2"
const arrow_67 = "3"
const arrow_90 = "4"
const arrow_112 = "5"
const arrow_135 = "6"
const arrow_157 = "7"
const arrow_180 = "8"
const arrow_202 = "9"
const arrow_225 = "!"
const arrow_247 = "@"
const arrow_270 = "#"
const arrow_292 = "$"
const arrow_315 = "%"
const arrow_337 = "^"

const arrowCounters = [
  arrow_0,
  arrow_22,
  arrow_45,
  arrow_67,
  arrow_90,
  arrow_112,
  arrow_135,
  arrow_157,
  arrow_180,
  arrow_202,
  arrow_225,
  arrow_247,
  arrow_270,
  arrow_292,
  arrow_315,
  arrow_337
]

const arrowIncrement = 22.5
const lastArrow = 360 / arrowIncrement - 1

const defaultMapWidth = 10
const defaultMapHeight = 8

setLegend(
  [ arrow_0, bitmap`
................
................
................
.........00.....
.........000....
...........000..
............000.
.000000000000000
.000000000000000
............000.
...........000..
.........000....
.........00.....
................
................
................` ],
  [ arrow_22, bitmap`
.......000000...
........00000000
............0000
..........00000.
.......00000..0.
....000000...00.
..00000.....00..
.000.......000..
............0...
................
................
................
................
................
................
................` ],
  [ arrow_45, bitmap`
................
................
................
................
.....0000000....
.....0000000....
........0000....
.......00000....
......000.00....
.....000..00....
....000...00....
...000..........
..000...........
.000............
000.............
00..............` ],
  [ arrow_67, bitmap`
.............00.
..........00000.
........000.000.
.......000..0000
........0..00.00
...........00.00
..........00..00
..........00..00
..........00...0
.........00.....
.........00.....
.........00.....
........00......
........00......
.........0......
................` ],
  [ arrow_90, bitmap`
.......00.......
......0000......
.....000000.....
.....000000.....
....00.00.00....
...00..00..00...
...00..00..00...
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
................` ],
  [ arrow_112, bitmap`
.00.............
.00000..........
.000.000........
0000..000.......
00.00..0........
00.00...........
00..00..........
00..00..........
0...00..........
.....00.........
.....00.........
.....00.........
......00........
......00........
......0.........
................` ],
  [ arrow_135, bitmap`
................
................
................
................
....0000000.....
....0000000.....
....0000........
....00000.......
....00.000......
....00..000.....
....00...000....
..........000...
...........000..
............000.
.............000
..............00` ],
  [ arrow_157, bitmap`
...000000.......
00000000........
0000............
.00000..........
.0..00000.......
.00...000000....
..00.....00000..
..000.......000.
...0............
................
................
................
................
................
................
................` ],
  [ arrow_180, bitmap`
................
................
................
.....00.........
....000.........
..000...........
.000............
000000000000000.
000000000000000.
.000............
..000...........
....000.........
.....00.........
................
................
................` ],
  [ arrow_202, bitmap`
................
................
................
................
................
................
................
...0............
..000.......000.
..00.....00000..
.00...000000....
.0..00000.......
.00000..........
0000............
00000000........
...000000.......` ],
  [ arrow_225, bitmap`
..............00
.............000
............000.
...........000..
..........000...
....00...000....
....00..000.....
....00.000......
....00000.......
....0000........
....0000000.....
....0000000.....
................
................
................
................` ],
  [ arrow_247, bitmap`
................
......0.........
......00........
......00........
.....00.........
.....00.........
.....00.........
0...00..........
00..00..........
00..00..........
00.00...........
00.00..0........
0000..000.......
.000.000........
.00000..........
.00.............` ],
  [ arrow_270, bitmap`
................
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
...00..00..00...
...00..00..00...
....00.00.00....
.....000000.....
.....000000.....
......0000......
.......00.......` ],
  [ arrow_292, bitmap`
................
.........0......
........00......
........00......
.........00.....
.........00.....
.........00.....
..........00...0
..........00..00
..........00..00
...........00.00
........0..00.00
.......000..0000
........000.000.
..........00000.
.............00.` ],
  [ arrow_315, bitmap`
00..............
000.............
.000............
..000...........
...000..........
....000...00....
.....000..00....
......000.00....
.......00000....
........0000....
.....0000000....
.....0000000....
................
................
................
................` ],
  [ arrow_337, bitmap`
................
................
................
................
................
................
................
............0...
.000.......000..
..00000.....00..
....000000...00.
.......00000..0.
..........00000.
............0000
........00000000
.......000000...` ],
  [ player, bitmap`
...0000000000...
..000000000000..
.00033333333000.
0003333333333000
0033333333333300
0033300330033300
0033300330033300
0033300330033300
0033333333333300
0033333333333300
0033333333333300
0033333333333300
0033333333333000
.00033333333000.
..000000000000..
...0000000000...` ],
  [ background, bitmap`
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
  [ wall, bitmap`
..000000000000..
.00000000000000.
000DDFFFFFFFF000
00DDDFFFFFFFFF00
00DDDDDDDDDFFF00
00DDDDDDDDDDFF00
00DDDDDDDDDDFF00
00DDDDDDDDDDFF00
00DDDDDDDDDDFF00
00DDDDDDDDDDFF00
00FFDDDDDDDDFF00
00FFFDDDDDDDDD00
00FFFFFFDDDDDD00
000FFFFFDDDDD000
.00000000000000.
..000000000000..` ],
  [ wall_no_stick, bitmap`
.00000000000000.
0000000000000000
00LLL111LLLLLL00
00LL111LLLLLL100
00L111LLLLLL1L00
00111LLLLLL1LL00
0011LLLLLL1LLL00
001LLLLLL1LLL100
00LLLLLL1LLL1100
00LLLLL1LLL11L00
00LLLL1LLL11LL00
00LLL1LLL11LLL00
00LL1LLL11LLLL00
00L1LLL11LLLLL00
0000000000000000
.00000000000000.` ],
  [ lava_top, bitmap`
................
................
.666.....666....
6666666666666666
6999666669996666
9999999999999999
9996999999999999
9999999969999999
9999999999999999
9999999999996999
9999999999999999
9999996999999999
9999999999999996
9996999999999999
9999999999699999
9999999999999999` ],
  [ lava, bitmap`
9999999999999999
9999999999999999
9999999996999999
9999999999999999
9999699999999999
9999999999999969
9999999999999999
9969999996999999
9999999999999999
9999999999999999
9999999999999999
9999969999999999
9999999999999999
9699999999996999
9999999999999999
9999999999999999` ],
  [ ice, bitmap`
..000000000000..
.00000000000000.
0007777772222000
0077777777772200
0077777777777200
0077777777777200
0077777777777200
0077777777777700
0077777777777700
0077777777777700
0077777777777700
0077777777777700
0027777777777700
0002777777777000
.00000000000000.
..000000000000..` ],
  [ ladder, bitmap`
CC............CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC............CC
CC............CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC............CC
CC............CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC............CC
CC............CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC............CC` ],
  [ one_way_up, bitmap`
.00000000000000.
0000000000000000
00DDDDDDDDFFFF00
00DDDDDDDDDDDF00
00FFDDDDDDDDDD00
0000000000000000
.00000000000000.
................
................
................
................
................
................
................
................
................` ],
  [ goal, bitmap`
................
................
......0000......
....00666600....
...0666666660...
...0666996660...
..066699996660..
..066999999660..
..066999999660..
..066699996660..
...0666996660...
...0666666660...
....00666600....
......0000......
................
................` ],
  [ key, bitmap`
................
..........00....
.........0660...
........066660..
.......06600660.
.......0660.0690
........06600690
.......06066690.
......06690990..
...0.06690.00...
..0606690.......
.0606690........
..06690.........
...090..........
....0...........
................` ],
  [ locked, bitmap`
.00000000000000.
01LL.1.1.1LL.1.0
0LL.1.1.1LL.1.10
0L.1.1.1LL.1.1.0
0.1.1.1LL.1.1.10
01.1.1LL.1.1.1L0
0.1.1LL.1.1.1LL0
01.1LL.1.1.1LL.0
0.1LL.1.1.1LL.10
01LL.1.1.1LL.1.0
0LL.1.1.1LL.1.10
0L.1.1.1LL.1.1.0
0.1.1.1LL.1.1.10
01.1.1LL.1.1.1L0
0.1.1LL.1.1.1LL0
.00000000000000.` ],
  [ locked_graphic, bitmap`
.00000000000000.
01LL.1.1.1LL.1.0
0LL.1.100LL.1.10
0L.1.10000.1.1.0
0.1.1000000.1.10
01.1.00L.001.1L0
0.1.100.100.1LL0
01.100000000LL.0
0.1L00000000L.10
01LL00000000.1.0
0LL.000..0001.10
0L.100000000.1.0
0.1.000000001.10
01.100000000.1L0
0.1.1LL.1.1.1LL0
.00000000000000.` ],
  [ unlocked, bitmap`
.LLLLLLLLLLLLLL.
L1.1.1.1.1.1.1.L
L.1.1.1.1.1.1.1L
L1.1.1.1.1.1.1.L
L.1.1.1.1.1.1.1L
L1.1.1.1.1.1.1.L
L.1.1.1.1.1.1.1L
L1.1.1.1.1.1.1.L
L.1.1.1.1.1.1.1L
L1.1.1.1.1.1.1.L
L.1.1.1.1.1.1.1L
L1.1.1.1.1.1.1.L
L.1.1.1.1.1.1.1L
L1.1.1.1.1.1.1.L
L.1.1.1.1.1.1.1L
.LLLLLLLLLLLLLL.` ],
  [ moving_platform, bitmap`
..LLLLLLLLLLLL..
.LLLLLLLLLLLLLL.
LLLDDFFFFFFFFLLL
LLDDDFFFFFFFFFLL
LLDDDDDDDDDFFFLL
LLDDDDDDDDDDFFLL
LLDDDDDDDDDDFFLL
LLDDDDDDDDDDFFLL
LLDDDDDDDDDDFFLL
LLDDDDDDDDDDFFLL
LLFFDDDDDDDDFFLL
LLFFFDDDDDDDDDLL
LLFFFFFFDDDDDDLL
LLLFFFFFDDDDDLLL
.LLLLLLLLLLLLLL.
..LLLLLLLLLLLL..` ],
  [ movement_guide, bitmap`
................
................
................
................
................
................
................
2222222222222222
1111111111111111
................
................
................
................
................
................
................` ],
  [ spike_up, bitmap`
................
.......00.......
.......00.......
......0110......
......0110......
......0110......
.....011110.....
.....011110.....
.....011110.....
....01111110....
....01111110....
....01111110....
...0111111110...
...0111111110...
...0111111110...
...0000000000...` ],
  [ spike_down, bitmap`
...0000000000...
...0111111110...
...0111111110...
...0111111110...
....01111110....
....01111110....
....01111110....
.....011110.....
.....011110.....
.....011110.....
......0110......
......0110......
......0110......
.......00.......
.......00.......
................` ],
  [ spike_left, bitmap`
................
................
................
............0000
.........0001110
......0001111110
...0001111111110
.001111111111110
.001111111111110
...0001111111110
......0001111110
.........0001110
............0000
................
................
................` ]
)

const spriteCategories = {
  solid: {
    sound: null,
    types: [ wall, wall_no_stick, ice, locked, locked_graphic, moving_platform ]
  },
  sticky: {
    sound: tune`
120: C4/120,
3720`,
    types: [ wall, moving_platform ]
  },
  sticky_top: {
    sound: tune`
107.14285714285714: C4-107.14285714285714,
3321.428571428571`,
    types: [ locked, locked_graphic ]
  },
  slippery: {
    sound: tune`
60: B5^60,
1860`,
    types: [ wall_no_stick, ice ]
  },
  danger: {
    sound: tune`
150: G4/150,
150: C4/150 + E4/150,
4500`,
    types: [ lava_top, lava, spike_up, spike_down, spike_left ]
  },
  goal: {
    sound: tune`
150: A5/150 + F5/150,
150: A5/150 + F5/150,
150: B5/150 + G5/150,
150: B5/150 + G5/150,
150,
150: A5/150 + F5/150,
150: B5/150 + G5/150,
3750`,
    types: [ goal ]
  },
  directional_up: {
    sound: tune`
120: D4/120,
3720`,
    types: [ one_way_up ]
  },
  key: {
    sound: tune`
200: B5~200,
6200`,
    types: [ key ]
  },
  locked: {
    sound: null,
    types: [ locked, locked_graphic ]
  }
}

let level
const levels = [
  map`
wwwwwwwwww
w........w
w........w
w........w
w........w
w........w
w.p....g.w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.....w.gw
w.....w..w
w.....w..w
w..w.....w
w..w.....w
wp.w.....w
wwwwwwwwww`,
  map`
nnnnnnnnnnnnnnnnnnnn
n..................n
n..................n
n...............g..n
n.......ww.........n
n..................n
np.................n
nwwww........wwwwwwn`,
  map`
wwwwwwwwwwnnnnnwwwwwnnnnnwwwwwwwwwwwwwwww
w.........nnnnn.....nnnnn.............qnw
w.........ddddd.....ddddd.............qnw
w................................ss...qnw
w................................nn....nw
w....sssss.....sssss.....sssss...nn....nw
w.p..nnnnn.....nnnnn.....nnnnn...nng...nw
wwwwwnnnnnwwwwwnnnnnwwwwwnnnnnwwwwwwwwwww`,
  map`
nwnwnwnwnwnwnwnwnwnwn
w...................w
n...................n
w...................w
n...................n
w...................w
n...................n
w...................w
n...................n
w...................w
n...................n
w...................w
n.....wwwwwwwwww....n
w...................w
n..................kn
w.................www
n...................n
w...................w
n.....nttttttttn....n
w.....nlllllllln....w
n.....nlllllllln....n
wuuuuunnnnnnnnnn....w
n.....L........n....n
w.....G........n....w
n.p...L....g...n....n
wwwwwwwwwwwwwwwwwwwww`,
  map`
nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
n.........................................n
n.........................................n
n.........................................n
n.........................................n
n.........................................n
n.........................................n
n.........................................n
n.........................................n
n.........................................n
n...........p.............................n
n..........www...............www..........n
n.........................................n
n....................k....................n
n.........................................n
n.........................................n
n................LLLLGLLLL................n
n.........................................n
n................MMMMMMMMm................n
n.........................................n
n.........................................n
n................mMMMMMMMM................n
n.........................................n
n.........................................n
n................MMMMMMMMm.sss............n
n..........................www............n
n...........................gw............n
n................mMMMMMMMM................n
n.........................................n
n.........................................n
n.........................................n
n.........................................n
n.........................................n
n.........................................n
n.........................................n`,
  map`
nnnnnnnwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwnnnnnnnnnnnnnnnnnnnn
n.......................................w...................n
n.......................................w...................n
n.......................................w...................n
n.......................................w...................n
n..........................sssss........w...................n
n......wwwwwwwwwwiiiiiiiiiiwwwwwwwwwwwwww...................n
n.......................................w...................n
nuuu....................................w...................n
n.......................................w...................n
n.......................................w...................n
n.......................................w...................n
nuuu...wwwwwwwwwwiiiiiiiiii.............w...................n
n.......................................w...................n
n.......................................w...................n
n.......................................w...................n
nuuu....................................w...................n
n.......................................w...................n
n......wwwwwwwwwwiiiiiiiiiiwwwwwwwwwwwwww...................n
n.......................................w...................n
nuuu....................................w...................n
n.......................................w...................n
n.......................................w...................n
n.......................................w...................n
nuuu...wwwwwwwwwwiiiiiiiiiiwwwwwwwwwwwwww...................n
n.......................................w...................n
n...................................LLL.w...................n
n...................................GgL.w...................n
nuuu................................LLL.w...................n
n.......................................w...................n
n......wwwwwwwwwwiiiiiiiiiiwwwwwwwwwwwwww...................n
n.......................................w...................n
nuuu....................................w...................n
n.......................................w...................n
n.......................................w...................n
n.......................................w...................n
nuuu...wwwwwwwwwwiiiiiiiiiiwwwwwwwwwwwwww...................n
n...........................................................n
n...........................................................n
n...........................................................n
nuuu........................................................n
n................................................k..........n
n......wwwwwwwwwwiiiiiiiiiiiiiiiiiiiiiiiiMMMMmMMMM..........n
n.......................................w...................n
nuuu....................................w...................n
n.......................................w...................n
n.......................................w...................n
n.......................................w...................n
nuuu...wwwwwwwwwwiiiiiiiiiiwwwww........w...................n
n..........................L............w...................n
n..........................L............w...................n
n..........................G............w...................n
nuuu.......................L............w...................n
n..........................L....ssssssssw...................n
n......wwwwwwwwwwiiiiiiiiiiwwwwwwwwwwwwww...................n
n.......................................w...................n
nuuu....................................w...................n
n.......................................w...................n
n.......................................w...................n
n.p.....................................w...................n
nwww...wwwwwwwwwwiiiiiiiiii......wwwwwwww...................n`,
  map`
nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
n.......................................................n
n.......................................................n
n.......................................................n
n.......................................................n
n.......................................................n
n.......................................................n
n.......................................................n
n.......................................................n
n.......................................................n
n..g....................................................n
n..ww............................ntttttnw....wntttttttttn
n.......ww.......................nlllllnw....wnllllllllln
n............ww...ww...ww...ww...nnnnnnnw....wnnnnnnnnnnn
n.......................................w....w..........n
n.......................................w....w..........n
n.......................................w....w..........n
n.......................................w....w..........n
n.......................................w....w..........n
n.......................................w....w..........n
nwww...www..............................w....w..........n
n.......................................w....w..........n
n............wwww....wiiiiiiiii..............w..........n
n...ii....ii....w....w........n..............w..........n
n...............w....w........n..............w..........n
n...............w....w........n..............w..........n
n...............w....w........n..............w..........n
n...............wp...w........n..............w..........n
n...............ww...w........n.........nwwwww..........n
nttttttttttttttttttttn........ntttttttttn...............n
nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn`,
  map`
nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n..........uuuuuiiiiiiiiiiiiiiiii.............iiiiiiiiiiiiiiiiiuuuuu..........n
n.............................................................................n
n..........w.......................................................w..........n
n..........w.......................................................w..........n
n..........w...........................p...........................w..........n
n.................uuu................iiiii................uuu.................n
n.............................................................................n
n.................i.........................................i.................n
n.................iiiiiiiiiii.....................iiiiiiiiiii.................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n...................iiiiiiiiiiiiiiiii.....iiiiiiiiiiiiiiiii...................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n.............................................................................n
n................................ntttttttttttn................................n
n................................nnnnnnnnnnnnn................................n
n.............................................................................n
n......................................g......................................n
n...............iii...................uuu...................iii...............n
n.............................................................................n
n......................iiimMMMMMMMMMMM...MMMMMMMMMMMmiii......................n
n.............................................................................n
n.............................................................................n`
]

setBackground(background)

setPushables({
  [ player ]: []
})

let gravity = 0.1

let showedLeftHint = false

let lastResetClick
let resetClickCount

let finishedAll = false

let totalTime = 0

// these are all set within startLevel()
let fullX
let fullY
let xVel
let yVel
let playedOnTile
let inAir
let gameOver
let won
let lastArrowType
let arrowType
let fullMap
let zoom
let cachedZoomBox
let updateTilesInterval
let startTime

onInput("w", () => handleWasdInput("w"))
onInput("a", () => handleWasdInput("a"))
onInput("s", () => handleWasdInput("s"))
onInput("d", () => handleWasdInput("d"))

onInput("i", () => handleIjklInput("i"))
onInput("j", () => handleIjklInput("j"))
onInput("l", () => handleIjklInput("l"))
onInput("k", () => handleIjklInput("k"))

startLevel(3)

function handleWasdInput(key) {
  const earlyReturn = handleGlobalInput()
  if (earlyReturn) return

  if (level === 4) clearText()
  
  switch (key) {
    case "w":
      panBy(0, -1)
      break
    case "a":
      panBy(-1, 0)
      break
    case "s":
      panBy(0, 1)
      break
    case "d":
      panBy(1, 0)
      break
    default:
      throw new Error(`Unexpected key ${key}`)
  }
}

function handleIjklInput(key) {
  const earlyReturn = handleGlobalInput()
  if (earlyReturn) return
  
  if (zoom.isZoomedOut) {
    resetPan()
    return
  }

  switch (key) {
    case "i":      
      if (
        zoom.zooming ||
        arrowType !== null ||
        inAir
      ) return

      const validArrows = []
      for (let i = 0; i < lastArrow; i++) {
        if (!checkArrowIsInvalid(arrowCounters[i]))
          validArrows.push(i)
      }
      if (validArrows.length === 0) throw new Error("No possible moves")
      
      const goalArrowType = arrowCounters.indexOf(lastArrowType ?? arrow_0)
      
      const closestArrowType = validArrows.reduce(
        (prev, curr) => Math.abs(curr - goalArrowType) < Math.abs(prev - goalArrowType) ? curr : prev
      )
      
      const newArrowType = arrowCounters[closestArrowType]
      
      addSprite(0, 0, newArrowType)
      arrowType = newArrowType
      lastArrowType = arrowType
      setArrowPosition()
      
      break
    case "j":
      if (arrowType === null) return
      rotateArrow(1)
      break
    case "l":
      if (arrowType === null) return
      rotateArrow(-1)
      break
    case "k":
      if (arrowType === null) return
      
      inAir = true
      
      const deg = getArrowDeg()
      const rad = deg * (Math.PI / 180)
    
      const arrowSprite = getFirst(arrowType)
      arrowSprite.remove()
      arrowType = null
    
      // note that startVel should never be larger than 1
      const startVel = 1
      xVel = startVel * Math.cos(rad)
      yVel = -startVel * Math.sin(rad)
    
      setMapFromParsed(fullMap)
      
      const playerSprite = getFirst(player)
      fullX = playerSprite.x
      fullY = playerSprite.y
      
      centerMap()
      
      const interval = setInterval(() => {
        let soundToPlay
        
        setMapFromParsed(fullMap)
        
        const p = getFirst(player)

        const oldX = p.x
        const oldY = p.y
        
        fullX += xVel
        fullY += yVel

        const roundedFullX = Math.round(fullX)
        const roundedFullY = Math.round(fullY)
        
        if ( // handle player going out of bounds (e.g. falling out of map)
          roundedFullX < 0 || roundedFullX >= width() ||
          roundedFullY < 0 || roundedFullY >= height()
        ) {
          p.remove()
          endGame({ won: false })
          stopMove()
        } else {
          p.x = roundedFullX
          p.y = roundedFullY
      
          yVel = Math.min(yVel+gravity, 1)

          // handle diagonal collisions
          if (playerOverlapsWithCategory("solid")) {
            if (yVel > xVel) {
              p.x -= xVel / Math.abs(xVel)
              fullX = p.x
            } else {
              p.y -= yVel / Math.abs(yVel)
              fullY = p.y
            }
          }

          checkNonSolidOverlap()

          if (gameOver) stopMove()
          else {
            // check normal solid collisions
            const stickyWalls = getAllOfCategory("sticky")
            const stickyTopWalls = getAllOfCategory("sticky_top")
            const directionalUp = getAllOfCategory("directional_up")
            if (
              stickyWalls.some(w => (
                (w.x === p.x && w.y === p.y - 1 && yVel < 0 && !isEffectivelyZero(yVel)) ||
                (w.y === p.y && w.x === p.x + 1 && xVel > 0 && !isEffectivelyZero(xVel)) ||
                (w.x === p.x && w.y === p.y + 1 && yVel > 0 && !isEffectivelyZero(yVel)) ||
                (w.y === p.y && w.x === p.x - 1 && xVel < 0 && !isEffectivelyZero(xVel))
              ))
            ) {
              stopMove()
              soundToPlay = "sticky"
            } else if (
              stickyTopWalls.some(w => (
                w.x === p.x && w.y === p.y + 1 && yVel > 0 && !isEffectivelyZero(yVel)
              ))
            ) {
              stopMove()
              soundToPlay = "sticky_top"
            } else if (
              directionalUp.some(w => (
                w.x === p.x && w.y === p.y + 1 && yVel > 0 && !isEffectivelyZero(yVel)
              ))
            ) {
              stopMove()
              soundToPlay = "directional_up"
            } else {
              const wallsSlippery = [...getAllOfCategory("slippery"), ...getAllOfCategory("sticky_top")]
              
              const touchingSlipperyX = wallsSlippery.find(w => (
                (w.y === p.y && w.x === p.x + 1 && xVel > 0 && !isEffectivelyZero(xVel)) ||
                (w.y === p.y && w.x === p.x - 1 && xVel < 0 && !isEffectivelyZero(xVel))
              ))
              if (touchingSlipperyX) {
                xVel = 0
                fullX = p.x
                soundToPlay = typeIsInCategory(touchingSlipperyX.type, "sticky_top") ? "sticky_top" : "slippery"
              }
              
              const touchingSlipperyY = wallsSlippery.find(w => (
                (w.x === p.x && w.y === p.y + 1 && yVel > 0 && !isEffectivelyZero(yVel)) ||
                (w.x === p.x && w.y === p.y - 1 && yVel < 0 && !isEffectivelyZero(yVel))
              ))
              if (touchingSlipperyY) {
                if (yVel > 0 && isEffectivelyZero(xVel)) stopMove()
                yVel = 0
                fullY = p.y
                soundToPlay = typeIsInCategory(touchingSlipperyY.type, "locked") ? "locked" : "slippery"
              }
            }
          }
  
          if (oldX !== p.x || oldY !== p.y) playedOnTile = false
        }
          
        fullMap = getParsedMap()
        centerMap()
        
        if (soundToPlay) playSoundOfType(soundToPlay)
      }, 60)

      function stopMove() {
        clearInterval(interval)
        inAir = false
      }
      
      break
    default:
      throw new Error(`Unexpected key ${key}`)
  }
}

function checkNonSolidOverlap() {
  // handle player overlapping with key (collect it)
  const keyOverlap = playerOverlapsWithCategory("key")
  if (keyOverlap) {
    keyOverlap.remove()
    getAllOfCategory("locked").map(l => l.type = unlocked)
    playSoundOfType("key", true)
  }
  
  if (playerOverlapsWithCategory("danger")) // handle game over from danger sprite (e.g. lava)
    endGame({ won: false })
  else if (playerOverlapsWithCategory("goal")) // handle game being won (player overlapping with goal sprite)
    endGame({ won: true })
}

function endGame(options = {}) {
  const duration = Date.now() - startTime
  totalTime += duration
  
  gameOver = true
  won = options.won ?? false
  
  if (updateTilesInterval)
    clearInterval(updateTilesInterval)

  clearText()
  
  if (won) {
    playSoundOfType("goal", true)

    if (level === levels.length-1) {
      addTexts([
        { text: "ALL LEVELS!", y: 3, color: color`6` },
        { text: "COMPLETE!", y: 4, color: color`6` },
        { text: "Congratulations!", y: 6 },
        { text: `Time: ${formatTime(duration)}`, y: 8 },
        { text: `Total: ${formatTime(totalTime)}`, y: 9, color: color`6` },
        { text: "Triple press any", y: 11 },
        { text: "button to restart", y: 12 },
        { text: "to the first level.", y: 13 }
      ])
    } else {
      addTexts([
        { text: "Level Complete!", y: 5 },
        { text: `Time: ${formatTime(duration)}`, y: 7 },
        { text: "Press any button", y: 9 },
        { text: "to continue to", y: 10 },
        { text: "the next level!", y: 11 }
      ])
    }
  } else {
    playSoundOfType("danger", true)

    addTexts([
      { text: "Game Over", y: 5 },
      { text: "Press any button", y: 7 },
      { text: "to play again!", y: 8 },
      { text: `Time: ${formatTime(duration)}`, y: 10 }
    ])
  }
}

function handleGlobalInput() {
  if (inAir) return
  if (gameOver) {
    if (won) {
      if (level === levels.length-1) {
        finishedAll = true
        
        const currDate = Date.now()
        
        if (
          !lastResetClick ||
          currDate-lastResetClick >= 1000
        ) resetClickCount = 0
        
        lastResetClick = currDate
        resetClickCount++

        if (resetClickCount === 3) level = 0
        else return true
      } else level++
    }
    startLevel(level)
    return true
  }
  return false
}

function rotateArrow(rotateCount) {
  const arrowTypeNum = arrowCounters.indexOf(arrowType)

  let rawNewTypeNum = arrowTypeNum + rotateCount
  let newTypeNum = constrainArrowTypeNum(rawNewTypeNum)
  let newType = arrowCounters[newTypeNum]

  const startedAt = newType
  while (checkArrowIsInvalid(newType)) {
    rawNewTypeNum += rotateCount
    newTypeNum = constrainArrowTypeNum(rawNewTypeNum)
    newType = arrowCounters[newTypeNum]
    if (newType === startedAt) {
      newType = null
      break
    }
  }

  if (!newType) return
  
  const arrowSprite = getFirst(arrowType)
  arrowSprite.type = newType
  arrowType = newType
  lastArrowType = arrowType

  setArrowPosition()
}

function constrainArrowTypeNum(rawArrowTypeNum) {
  const arrowCount = lastArrow + 1
  const constrainedTypeNum = ((rawArrowTypeNum) % arrowCount + arrowCount) % arrowCount
  return constrainedTypeNum
}

function setArrowPosition() {
  if (arrowType === null) return
  
  const playerSprite = getFirst(player)

  if (!playerSprite) return
  
  const arrowSprite = getFirst(arrowType)

  const deg = getArrowDeg()
  const rad = deg * (Math.PI / 180)
  const distance = 1
  const x = distance * Math.cos(rad)
  const y = distance * Math.sin(rad)
  
  arrowSprite.x = Math.round(playerSprite.x + x)
  arrowSprite.y = Math.round(playerSprite.y - y)
}

function getParsedMap() {
  const grid = getGrid()
  
  const map = []

  const currWidth = width()
  const currHeight = height()
  
  for (let y = 0; y < currHeight; y++) {
    const row = []
    map.push(row)
    
    for (let x = 0; x < currWidth; x++) {      
      const tile = grid[currWidth*y+x].map(tile => tile.type)
      row.push(tile)
    }
  }
  
  return map
}

function setMapFromParsed(parsedMap) {
  setMap(
    parsedMap.map(row =>
      row.map(tile => tile.length === 0 ? "." : tile[0]).join("")
    ).join("\n")
  )
  
  for (let y = 0; y < height(); y++) {
    const row = parsedMap[y]
    
    for (let x = 0; x < width(); x++) {
      const tile = row[x]
      
      for (let i = 1; i < tile.length; i++) {
        const sprite = tile[i]
        addSprite(x, y, sprite)
      }
    }
  }
}

function zoomMap(parsedMap, rawX, rawY, rawZoomWidth, rawZoomHeight) {
  const mapWidth = parsedMap[0].length
  const mapHeight = parsedMap.length
  
  const zoomWidth = Math.min(rawZoomWidth, mapWidth)
  const zoomHeight = Math.min(rawZoomHeight, mapHeight)
  const x = Math.max(Math.min(rawX, mapWidth-zoomWidth), 0)
  const y = Math.max(Math.min(rawY, mapHeight-zoomHeight), 0)
  
  const zoomedMap = []

  for (let iterY = 0; iterY < zoomHeight; iterY++) {
    const row = []
    zoomedMap.push(row)

    for (let iterX = 0; iterX < zoomWidth; iterX++) {
      const tile = []
      row.push(tile)
      
      for (let i = 0; i < parsedMap[iterY+y][iterX+x].length; i++)
        tile.push(parsedMap[iterY+y][iterX+x][i])
    }
  }

  return zoomedMap
}

function centerMap() {
  const {
    x: zoomX,
    y: zoomY,
    width: zoomWidth,
    height: zoomHeight
  } = getCenterZoomBox()
  
  const parsedMap = getParsedMap()
  const zoomedMap = zoomMap(
    parsedMap,
    zoomX,
    zoomY,
    zoomWidth,
    zoomHeight
  )
  setMapFromParsed(zoomedMap)
}

function getCenterZoomBox(options = {}) {
  const playerSprite = getFirst(player)
  
  if (playerSprite) {
    const mapWidth = options.width ?? defaultMapWidth
    const mapHeight = options.height ?? defaultMapHeight
    
    const x = playerSprite.x-Math.round(mapWidth/2)+1
    const y = playerSprite.y-Math.round(mapHeight/2)
    
    const constrainedX = Math.max(Math.min(x, width()-mapWidth), 0)
    const constrainedY = Math.max(Math.min(y, height()-mapHeight), 0)
  
    const zoomBox = {
      x: constrainedX,
      y: constrainedY,
      width: mapWidth,
      height: mapHeight
    }

    if (mapWidth === defaultMapWidth && mapHeight === defaultMapHeight)
      cachedZoomBox = zoomBox
    
    return zoomBox
  } else if (cachedZoomBox)
    return cachedZoomBox
  else
    throw new Error("Could not provide zoom box")
}

async function panBy(panByX, panByY) {
  const arrowSprite = getFirst(arrowType)
  if (arrowSprite) arrowSprite.remove()
  arrowType = null
  
  const ogParsedMap = getParsedMap()
  setMapFromParsed(fullMap)
  const fullWidth = width()
  const fullHeight = height()
  setMapFromParsed(ogParsedMap)

  const reset = typeof panByX !== "number" && typeof panByY !== "number"
  
  if (zoom.isZoomedOut && !reset) {
    zoom.x = Math.max(Math.min(zoom.x+panByX, fullWidth-zoom.width), 0)
    zoom.y = Math.max(Math.min(zoom.y+panByY, fullHeight-zoom.height), 0)
    
    setMapFromParsed(fullMap)
    const parsedMap = getParsedMap()
    const zoomedMap = zoomMap(parsedMap, zoom.x, zoom.y, zoom.width, zoom.height)
    setMapFromParsed(zoomedMap)
  } else if ((!zoom.zooming || reset) && !inAir) {
    const ogWidth = width()
    const ogHeight = height()
    
    setMapFromParsed(fullMap)

    const {
      x: centerZoomX,
      y: centerZoomY,
      width: centerZoomWidth,
      height: centerZoomHeight
    } = getCenterZoomBox()
    
    if (!reset && centerZoomWidth === fullWidth && centerZoomHeight === fullHeight) {
      centerMap()
      return
    }
    
    zoom.zooming = true
    
    let newWidth = Math.min(reset ? centerZoomWidth : 20, fullWidth)
    let newHeight = Math.min(reset ? centerZoomHeight : 16, fullHeight)

    if (!reset) {
      if (newWidth < 20)
        newHeight = Math.round(newWidth * 0.8)
      else if (newHeight < 16)
        newWidth = Math.round(newHeight * 1.25)
    }

    const { x: newZoomX, y: newZoomY } = getCenterZoomBox({ width: newWidth, height: newHeight })
    
    const ogZoomX = reset ? zoom.x : centerZoomX
    const ogZoomY = reset ? zoom.y : centerZoomY
    
    const zoomDiffWidth = newWidth-ogWidth
    const zoomDiffHeight = newHeight-ogHeight
    const zoomDiffX = newZoomX-ogZoomX
    const zoomDiffY = newZoomY-ogZoomY
    
    let iterationCount = Math.ceil(Math.max(Math.abs(zoomDiffWidth), Math.abs(zoomDiffHeight))/2)    
    if (reset) iterationCount = Math.max(iterationCount, 3)
    
    if (iterationCount >= 1) {
      for (let i = 0; i < iterationCount; i++) {
        if (i >= 1) setMapFromParsed(fullMap)
        
        zoom.width = ogWidth+Math.round(zoomDiffWidth / iterationCount * (i+1))
        zoom.height = ogHeight+Math.round(zoomDiffHeight / iterationCount * (i+1))
  
        zoom.x = ogZoomX + Math.round(zoomDiffX / iterationCount * (i+1))
        zoom.y = ogZoomY + Math.round(zoomDiffY / iterationCount * (i+1))
        
        const parsedMap = getParsedMap()
        const zoomedMap = zoomMap(parsedMap, zoom.x, zoom.y, zoom.width, zoom.height)
        setMapFromParsed(zoomedMap)
  
        if (i < iterationCount-1) await wait(10)
      }
    } else {
      zoom.width = newWidth
      zoom.height = newHeight
      zoom.x = newZoomX
      zoom.y = newZoomY

      const parsedMap = getParsedMap()
      const zoomedMap = zoomMap(parsedMap, zoom.x, zoom.y, zoom.width, zoom.height)
      setMapFromParsed(zoomedMap)
    }
      
    zoom.isZoomedOut = !reset
    zoom.zooming = false
  }
}

async function resetPan() {
  // empty arguments results in reset
  await panBy()
}

function wait(ms) {
  return new Promise((resolve, _reject) => setTimeout(resolve, ms))
}

function checkArrowIsInvalid(thisArrowType) {
  const p = getFirst(player)
  const walls = getAllOfCategory("solid")
  const arrowDeg = getArrowDeg(thisArrowType)
  
  const someIsInvalid = walls.some(w => {
    const isTouching = (
      (w.y === p.y && Math.abs(w.x - p.x) === 1) ||
      (w.x === p.x && Math.abs(w.y - p.y) === 1)
    )

    const isTouchingDiagonal = (
      !isTouching &&
      Math.abs(w.x - p.x) === 1 && Math.abs(w.y - p.y) === 1
    )

    if (!isTouching && !isTouchingDiagonal) return false
    
    let angle = Math.atan2(p.y-w.y, w.x-p.x)*(180/Math.PI)
    angle = angle < 0 ? angle + 360 : angle

    let distance = Math.abs(arrowDeg-angle) % 360
    distance = distance > 180 ? (180 - (distance % 180)) : distance
    
    if (
      (isTouching && distance < 90) ||
      (isTouchingDiagonal && distance < 45)
    ) return true
  })
  
  return someIsInvalid
}

function getArrowDeg(thisArrowType) {
  if (typeof thisArrowType === "string" || typeof thisArrowType === "number")
    return arrowCounters.indexOf(thisArrowType) * arrowIncrement
  else if (arrowType === null) return null
  else return arrowCounters.indexOf(arrowType) * arrowIncrement
}

function getAllOfCategory(categoryId) {
  if (!(categoryId in spriteCategories)) throw new Error(`Category ${category} not found`)
  const category = spriteCategories[categoryId]
  return category.types.map(t => getAll(t)).flat()
}

function typeIsInCategory(type, categoryId) {
  if (!(categoryId in spriteCategories)) throw new Error(`Category ${category} not found`)
  const category = spriteCategories[categoryId]
  return category.types.includes(type)
}

function playerOverlapsWithCategory(categoryId) {
  const playerSprite = getFirst(player)
  if (!playerSprite) return false
  return getAllOfCategory(categoryId).find(w => w.x === playerSprite.x && w.y === playerSprite.y) ?? false
}

function playSoundOfType(categoryId, forceSound) {
  if (!(categoryId in spriteCategories)) throw new Error(`Category ${categoryId} not found`)
  
  const category = spriteCategories[categoryId]
  
  if (
    !category.sound ||
    (playedOnTile && !forceSound)
  ) return

  setTimeout(() => playTune(category.sound), 60)
  
  playedOnTile = true
}

function isEffectivelyZero(num) {
  const epsilon = 1e-10
  return Math.abs(num) < epsilon
}

function startLevel(newLevel) {
  if (!(newLevel in levels)) throw new Error(`Level ${newLevel} does not exist`)
  
  fullX = null
  fullY = null
  xVel = 0
  yVel = 0

  playedOnTile = false
  
  inAir = false
  gameOver = false
  won = false

  lastArrowType = null
  arrowType = null
  
  fullMap = null
  
  zoom = {
    zooming: false,
    isZoomedOut: false,
    x: null,
    y: null
  }
  
  cachedZoomBox = null

  clearText()
  
  level = newLevel
  setMap(levels[level])

  if (!getFirst(player)) throw new Error("Player is not in level. A player sprite must exist")
  
  fullMap = getParsedMap()
  
  const movingSprites = fullMap
    .map((row, y) =>
      row
        .map((tile, x) =>
          tile
            .filter(sprite => sprite === moving_platform)
            .map(sprite => ({
              type: sprite,
              x,
              y,
              direction: getTile(x + 1, y).some(s => s.type === movement_guide) ? 1 : -1
            }))
        )
        .flat()
    )
    .flat()
  
  centerMap()
  
  updateTilesInterval = setInterval(() => {
    setMapFromParsed(fullMap)
    
    const movingPlatforms = getAll(moving_platform)

    const playerSprite = getFirst(player)
    
    for (const movementInfo of movingSprites) {
      const movingSprite = getTile(movementInfo.x, movementInfo.y).find(s => s.type === moving_platform)

      const swapGuide = getTile(movingSprite.x + movementInfo.direction, movingSprite.y).find(s => s.type === movement_guide)
      if (swapGuide) swapGuide.x -= movementInfo.direction

      const doMovePlayer = (
        !inAir &&
        (
          (movingSprite.y === playerSprite.y && Math.abs(movingSprite.x - playerSprite.x) <= 1) ||
          (movingSprite.x === playerSprite.x && Math.abs(movingSprite.y - playerSprite.y) <= 1)
        )
      )
      
      movingSprite.x += movementInfo.direction
      movementInfo.x = movingSprite.x
      movementInfo.y = movingSprite.y
      
      if (doMovePlayer) {
        playerSprite.x += movementInfo.direction
        checkNonSolidOverlap()
        if (playerOverlapsWithCategory("solid")) {
          playerSprite.remove()
          endGame({ won: false })
        }
      }

      const nextGuide = getTile(movingSprite.x + movementInfo.direction, movingSprite.y)
        .find(s => s.type === movement_guide)
      if (!nextGuide) movementInfo.direction = -movementInfo.direction
    }

    fullMap = getParsedMap()

    if (zoom.isZoomedOut || zoom.zooming) {
      const parsedMap = getParsedMap()
      const zoomedMap = zoomMap(parsedMap, zoom.x, zoom.y, zoom.width, zoom.height)
      setMapFromParsed(zoomedMap)
    } else
      centerMap()

    if (arrowType) {
      addSprite(0, 0, arrowType)
      setArrowPosition()
    }
  }, 1000)

  startTime = Date.now()
  if (newLevel === 0) totalTime = 0

  if (!finishedAll && newLevel === 0) {
    totalTime = 0
    
    const textsList = [
      [
        { text: "SPRING!", y: 3, color: color`5` },
        { text: "Learn the controls", y: 5 },
        { text: "by experimenting!", y: 6 }
      ],
      [
        { text: "Start with the", y: 3 },
        { text: "buttons on the", y: 4 },
        { text: "RIGHT. The LEFT", y: 5 },
        { text: "buttons will prove", y: 6 },
        { text: "useful later!", y: 7 },
      ],
      [
        { text: "HINT:", y: 3 },
        { text: "UP=   set direction", x: 1, y: 5 },
        { text: "LEFT= rotate left", x: 1, y: 6 },
        { text: "RIGHT=rotate right", x: 1, y: 7 },
        { text: "DOWN= move!", x: 1, y: 8 },
      ]
    ]
    
    let textIndex
    
    nextText()
    
    const firstLevelInterval = setInterval(() => {
      if (level !== 0 || gameOver) {
        clearInterval(firstLevelInterval)
        return
      }
      nextText()
    }, 10000)

    function nextText() {
      if (typeof textIndex === "number")
        textIndex = (textIndex + 1) % textsList.length
      else textIndex = 0

      clearText()

      const texts = textsList[textIndex]
      addTexts(texts)
    }
  } else if (!finishedAll && newLevel === 4 && !showedLeftHint) {
    showedLeftHint = true

    addTexts([
      { text: "Pssst...", y: 2 },
      { text: "Now would be a", y: 3 },
      { text: "good time to", y: 4 },
      { text: "experiment with", y: 5 },
      { text: "the LEFT buttons!", y: 6 }
    ])
  }
}

function addTexts(texts = []) {
  for (const textOptions of texts) {
    addTextCustom(textOptions)
  }
}

function addTextCustom(options = {}) {
  const {
    text,
    x,
    y = 0,
    color: textColor = color`2`
  } = options

  if (!text) throw new Error("Text is required")
  
  addText(text, { x, y, color: textColor })
}

function formatTime(ms) {
  const labels = [
    { label: "h", count: 1000 * 60 * 60 },
    { label: "m", count: 1000 * 60 },
    { label: "s", count: 1000 }
  ]
  
  let remaining = ms
  
  const outputUnits = []
  for (const label of labels) {
    const isLast = labels.indexOf(label) === labels.length-1
    
    const count = remaining / label.count
    const roundedCount = (
      isLast ?
      Math.floor(count * 10) / 10 :
      Math.floor(count)
    )
    
    if (outputUnits.length >= 1 || roundedCount > 0 || isLast)
      outputUnits.push(`${roundedCount}${label.label}`)
    
    remaining = remaining % label.count
  }
  
  const formattedTime = outputUnits.join(" ")
  
  return formattedTime
}

