/*
@title: Galaxy Dodger
@author: Caleb B
@tags: ['real-time','action']
@addedOn: 2024-07-15
*/

// define the sprites in our game
const player = "p";
const asteroidU = "u";
const asteroidL = "l";
const asteroidR = "r";
const asteroidD = "d";

const cannonU = "q"
const cannonD = "w"
const cannonL = "e"
const cannonR = "t"

const engineU = "f"
const engineD = "g"
const engineL = "h"
const engineR = "j"

const engineMiniU = "z"
const engineMiniD = "x"
const engineMiniL = "c"
const engineMiniR = "v"

const cannonBooster = "0"
const engineBooster = "1"

const laserU = "2"
const laserL = "3"
const laserR = "4"
const laserD = "5"

const laserNW = "6"
const laserNE = "7"
const laserSW = "8"
const laserSE = "9"

const selector = "s"

const background = "b"

const controls = tune `
329.6703296703297,
164.83516483516485: F4~164.83516483516485,
164.83516483516485: A4~164.83516483516485,
164.83516483516485: B4~164.83516483516485,
164.83516483516485,
164.83516483516485: F4~164.83516483516485,
164.83516483516485: A4~164.83516483516485,
164.83516483516485: B4~164.83516483516485,
164.83516483516485,
164.83516483516485: F4~164.83516483516485,
164.83516483516485: A4~164.83516483516485,
164.83516483516485: B4~164.83516483516485,
164.83516483516485: E5~164.83516483516485,
164.83516483516485: D5~164.83516483516485,
164.83516483516485,
164.83516483516485: B4~164.83516483516485,
164.83516483516485: C5~164.83516483516485,
164.83516483516485: B4~164.83516483516485,
164.83516483516485: A4~164.83516483516485,
164.83516483516485: E4~164.83516483516485,
494.50549450549454,
164.83516483516485: D4~164.83516483516485,
164.83516483516485: E4~164.83516483516485,
164.83516483516485: G4~164.83516483516485,
164.83516483516485: E4~164.83516483516485,
659.3406593406594`
const menu = tune `
240: C4-240 + G4-240,
240,
240: E4-240 + A4-240,
240,
240: F4-240 + C5-240,
240,
240: G4-240 + D5-240,
240,
240: C4-240 + G4-240,
240,
240: E4-240 + A4-240,
240,
240: F4-240 + C5-240,
240,
240: G4-240 + D5-240,
240,
240: C4-240 + G4-240,
240,
240: E4-240 + A4-240,
240,
240: F4-240 + C5-240,
240,
240: G4-240 + D5-240,
240,
240: C4-240 + G4-240,
240,
240: E4-240 + A4-240,
240,
240: F4-240 + C5-240,
240,
240: G4-240 + D5-240,
240`
const noise = tune `
120: D5-120 + C4/120,
120: D4^120,
120: D5-120 + E4^120,
120: F5-120 + F4^120,
120: E5-120 + G4^120 + C4/120,
120: D5-120 + F4^120,
120: C5-120 + E4^120,
120: D5-120 + D4^120,
120: E4^120 + C4/120,
120: F4^120,
120: D5-120 + G4^120,
120: F5-120 + F4^120,
120: E5-120 + E4^120 + C4/120,
120: D5-120 + D4^120,
120: C5-120 + E4^120,
120: E5-120 + F4^120,
120: G4^120 + C4/120,
120: F4^120,
120: D5-120 + E4^120,
120: F5-120 + D4^120,
120: E5-120 + E4^120 + C4/120,
120: D5-120 + F4^120,
120: C5-120 + G4^120,
120: E5-120 + F4^120,
120: F5-120 + E4^120 + C4/120,
120: G5-120 + D4^120,
120: F5-120 + E4^120,
120: E5-120 + F4^120,
120: C5-120 + G4^120 + C4/120,
120: D5-120 + F4^120,
120: E4^120,
120: D4^120`
const dundundun = tune `
92.3076923076923: A4^92.3076923076923 + G4^92.3076923076923,
92.3076923076923: G4^92.3076923076923 + F4^92.3076923076923,
92.3076923076923: F4^92.3076923076923 + E4^92.3076923076923,
92.3076923076923: E4^92.3076923076923 + D4^92.3076923076923,
92.3076923076923: D4^92.3076923076923 + C4^92.3076923076923,
92.3076923076923,
92.3076923076923: C4/92.3076923076923,
92.3076923076923: C4/92.3076923076923,
92.3076923076923: C4/92.3076923076923,
92.3076923076923: C4/92.3076923076923,
92.3076923076923: C4/92.3076923076923,
276.9230769230769,
92.3076923076923: C4-92.3076923076923,
1569.2307692307693`

let backmusic = playTune(menu, Infinity)

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
........3.......
........1.......
........1.......
........1.......
.......111......
......11111.....
..3...11311...3.
..1..1122211..1.
..1..1122211..1.
..1..1112111..1.
..1111111111111.
..1111111111111.
...11111111111..
....111111111...
.......111......
........1.......`],
  [ asteroidU, bitmap`
................
....CCCC........
...CCCCCCCCC....
...CCCCCCCCCCC..
..CCCCC111CCCCC.
.CCCC11CCCCCCCC.
.CCCCCCCCCCCCCCC
..CCCCCCCCCCCCCC
...CCCCCCC1CCCCC
...CCCCC11CCCCCC
...C1CC11CCCCCC.
...CCCCCCCCCCC..
....CCCCCC1CCC..
.....CCCCCCCCC..
.......CCCCCC...
................`],
  [ asteroidD, bitmap `
................
................
....LLLLLLL.....
...LLLLLLLLL....
..LLLLLLLLLLL...
..LLLL1111LLL...
..LL11LLLLLLL...
.LLLLLLLLLLLLL..
.LLLLLLLLLLLLL..
.LLLLL11LLLLLL..
..LLLLL1LLL1LLL.
..LLLLL1LLLL1LL.
...L1LLL1LLL11L.
...LLLLL11LLL1L.
...LLLLLL1LLLL..
....LLLLLLLLL...
.......LLLL.....`],
  [ asteroidL, bitmap `
................
................
....LLLLLLL.....
...LLLLLLLLL....
..LLLLLLLLLLL...
..LLLL1111LLL...
..LL11LLLLLLL...
.LLLLLLLLLLLLL..
.LLLLLLLLLLLLL..
.LLLLL11LLLLLL..
..LLLLL1LLL1LLL.
..LLLLL1LLLL1LL.
...L1LLL1LLL11L.
...LLLLL11LLL1L.
...LLLLLL1LLLL..
....LLLLLLLLL...
.......LLLL.....`],
  [ asteroidR, bitmap `
................
....CCCC........
...CCCCCCCCC....
...CCCCCCCCCCC..
..CCCCC111CCCCC.
.CCCC11CCCCCCCC.
.CCCCCCCCCCCCCCC
..CCCCCCCCCCCCCC
...CCCCCCC1CCCCC
...CCCCC11CCCCCC
...C1CC11CCCCCC.
...CCCCCCCCCCC..
....CCCCCC1CCC..
.....CCCCCCCCC..
.......CCCCCC...
................`],
  [ cannonU, bitmap`
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.....HHHHHH.....
......4444......
....HHHHHHHH....
.....444444.....
.....444444.....
...HHHHHHHHHH...
..H4HHHHHHHH4H..
..HH4HHHHHH4HH..
..HHH444444HHH..
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [ cannonD, bitmap `
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
..HHH444444HHH..
..HH4HHHHHH4HH..
..H4HHHHHHHH4H..
...HHHHHHHHHH...
.....444444.....
.....444444.....
....HHHHHHHH....
......4444......
.....HHHHHH.....
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......`],
  [ cannonL, bitmap `
..............HH
..............HH
...........HHHHH
..........H4HHHH
.......H..HH4HHH
.....H.H44HHH4HH
.....H4H44HHH4HH
66666H4H44HHH4HH
66666H4H44HHH4HH
.....H4H44HHH4HH
.....H.H44HHH4HH
.......H..HH4HHH
..........H4HHHH
...........HHHHH
..............HH
..............HH`],
  [ cannonR, bitmap `
HH..............
HH..............
HHHHH...........
HHHH4H..........
HHH4HH..H.......
HH4HHH44H.H.....
HH4HHH44H4H.....
HH4HHH44H4H66666
HH4HHH44H4H66666
HH4HHH44H4H.....
HH4HHH44H.H.....
HHH4HH..H.......
HHHH4H..........
HHHHH...........
HH..............
HH..............`],
  [ engineU, bitmap`
CCCCCCCCCCCCCCCC
.CCFCCCCCCCCFCC.
..CFFCCCCCCFFC..
..CCFFCCCCFFCC..
...CCFCCCCFCC...
...CCFCCCCFCC...
....CFCCCCFC....
....CFCCCCFC....
....CFCCCCFC....
....CCFCCFCC....
...CCCCFFCCCC...
...CCCFCCFCCC...
..CCCFCCCCFCCC..
..CFFFFFFFFFFC..
..CCCCCCCCCCCC..
....93939693....`],
  [ engineD, bitmap `
....39693939....
..CCCCCCCCCCCC..
..CFFFFFFFFFFC..
..CCCFCCCCFCCC..
...CCCFCCFCCC...
...CCCCFFCCCC...
....CCFCCFCC....
....CFCCCCFC....
....CFCCCCFC....
....CFCCCCFC....
...CCFCCCCFCC...
...CCFCCCCFCC...
..CCFFCCCCFFCC..
..CFFCCCCCCFFC..
.CCFCCCCCCCCFCC.
CCCCCCCCCCCCCCCC`],
  [ engineL, bitmap `
C...............
CC..............
CCCC........CCC.
CFFCCC....CCCFC.
CCFFCCCCCCCCCFC3
CCCFFFFFFCCCFFC9
CCCCCCCCCFCFCFC6
CCCCCCCCCCFCCFC9
CCCCCCCCCCFCCFC3
CCCCCCCCCFCFCFC9
CCCFFFFFFCCCFFC3
CCFFCCCCCCCCCFC9
CFFCCC....CCCFC.
CCCC........CCC.
CC..............
C...............`],
  [ engineR, bitmap `
...............C
..............CC
.CCC........CCCC
.CFCCC....CCCFFC
9CFCCCCCCCCCFFCC
3CFFCCCFFFFFFCCC
9CFCFCFCCCCCCCCC
3CFCCFCCCCCCCCCC
9CFCCFCCCCCCCCCC
6CFCFCFCCCCCCCCC
9CFFCCCFFFFFFCCC
3CFCCCCCCCCCFFCC
.CFCCC....CCCFFC
.CCC........CCCC
..............CC
...............C`],
  [ engineMiniU, bitmap`
CCCCCCCCCCCCCCCC
.CCFCCCCCCCCFCC.
..CFFCCCCCCFFC..
..CCFFCCCCFFCC..
...CCFCCCCFCC1..
...CCFCCCCFCC11.
....CFCCCCFC1111
....CFCCCCFC1119
....CFCCCCFC1119
....CCFCCFCC1111
...CCCCFFCCCC11.
...CCCFCCFCCC1..
..CCCFCCCCFCCC..
..CFFFFFFFFFFC..
..CCCCCCCCCCCC..
....93939693....`],
  [ engineMiniD, bitmap `
....39693939....
..CCCCCCCCCCCC..
..CFFFFFFFFFFC..
..CCCFCCCCFCCC..
..1CCCFCCFCCC...
.11CCCCFFCCCC...
1111CCFCCFCC....
9111CFCCCCFC....
9111CFCCCCFC....
1111CFCCCCFC....
.11CCFCCCCFCC...
..1CCFCCCCFCC...
..CCFFCCCCFFCC..
..CFFCCCCCCFFC..
.CCFCCCCCCCCFCC.
CCCCCCCCCCCCCCCC`],
  [ engineMiniL, bitmap `
C.....1991......
CC...111111.....
CCCC11111111CCC.
CFFCCC1111CCCFC.
CCFFCCCCCCCCCFC3
CCCFFFFFFCCCFFC9
CCCCCCCCCFCFCFC6
CCCCCCCCCCFCCFC9
CCCCCCCCCCFCCFC3
CCCCCCCCCFCFCFC9
CCCFFFFFFCCCFFC3
CCFFCCCCCCCCCFC9
CFFCCC....CCCFC.
CCCC........CCC.
CC..............
C...............`],
  [ engineMiniR, bitmap `
...............C
..............CC
.CCC........CCCC
.CFCCC....CCCFFC
9CFCCCCCCCCCFFCC
3CFFCCCFFFFFFCCC
9CFCFCFCCCCCCCCC
3CFCCFCCCCCCCCCC
9CFCCFCCCCCCCCCC
6CFCFCFCCCCCCCCC
9CFFCCCFFFFFFCCC
3CFCCCCCCCCCFFCC
.CFCCC1111CCCFFC
.CCC11111111CCCC
.....111111...CC
......1991.....C`],
  [ cannonBooster, bitmap`
...HHHHHHHHHH...
..HHHHHHHHHHHH..
.HHHHHHHHHHHHHH.
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHH8888HHHHHH
HHHHHH8888HHHHHH
HHHHHH8888HHHHHH
HHHHHH8888HHHHHH
HHHHHH8888HHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
.HHHHHHHHHHHHHH.
..HHHHHHHHHHHH..
...HHHHHHHHHH...`],
  [ engineBooster, bitmap`
...CCCCCCCCCC...
..CCCCCCCCCCCC..
.CCCCCCCCCCCCCC.
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCFFFFCCCCCC
CCCCCCFFFFCCCCCC
CCCCCCFFFFCCCCCC
CCCCCCFFFFCCCCCC
CCCCCCFFFFCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
.CCCCCCCCCCCCCC.
..CCCCCCCCCCCC..
...CCCCCCCCCC...`],
  [ selector, bitmap `
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
3333333333333333`],
  [ laserL, bitmap `
................
................
................
................
................
................
................
3333333333333333
3333333333333333
................
................
................
................
................
................
................`],
  [ laserU, bitmap `
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......`],
  [ laserR, bitmap `
................
................
................
................
................
................
................
3333333333333333
3333333333333333
................
................
................
................
................
................
................`],
  [ laserD, bitmap `
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......`],
  [ laserNW, bitmap `
33..............
333.............
.333............
..333...........
...333..........
....333.........
.....333........
......333.......
.......333......
........333.....
.........333....
..........333...
...........333..
............333.
.............333
..............33`],
  [ laserNE, bitmap `
..............33
.............333
............333.
...........333..
..........333...
.........333....
........333.....
.......333......
......333.......
.....333........
....333.........
...333..........
..333...........
.333............
333.............
33..............`],
  [ laserSW, bitmap `
..............33
.............333
............333.
...........333..
..........333...
.........333....
........333.....
.......333......
......333.......
.....333........
....333.........
...333..........
..333...........
.333............
333.............
33..............`],
  [ laserSE, bitmap `
33..............
333.............
.333............
..333...........
...333..........
....333.........
.....333........
......333.......
.......333......
........333.....
.........333....
..........333...
...........333..
............333.
.............333
..............33`],
  [ background, bitmap`
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
0000000000000000`]
)

let level = 0
const levels = [
  map `
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`,
  map`
...........
...........
...........
.s.........
...........
...........
...........
...........
...........
...........`,
  map `
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`,
  map `
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`,
  map `bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`
]

// set the map displayed to the current level
setMap(levels[level]);

let score = 0
let gameOver = false
let change = 1

let first;
let second;
let third;
let fourth;
let components;
let laserQueue = []

function initialize() {
  addText("Build your ship", {x: 2, y: 1, color: color `5`})
  
  for (let y = 3; y < 7; y += 2) {
    for (let x = 1; x < 11; x += 2) {
      addSprite(x, y, getType());
    }
  }
}

function spawnSpaceship() {
  addSprite(15, 15, first)
  addSprite(16, 15, second)
  addSprite(15, 16, third)
  addSprite(16, 16, fourth)
}

// inputs for player movement control
onInput("w", () => {
  if (level == 1) {
    if (getFirst(selector).y == 5) getFirst(selector).y -= 2;
  } else if (level == 2 && !gameOver && (components.includes(engineU) || components.includes(engineMiniU))) {
    components.forEach(c => { getFirst(c).y -= change });
  }
  else if (level == 3 && !gameOver) { getFirst(player).y -= 1; }
});

onInput("a", () => {
  if (level == 1) {
    if (getFirst(selector).x != 1) getFirst(selector).x -= 2;
  } else if (level == 2 && !gameOver && (components.includes(engineL) || components.includes(engineMiniL))) {
    components.forEach(c => { getFirst(c).x -= change });
  }
  else if (level == 3 && !gameOver) { getFirst(player).x -= 1; }
});

onInput("s", () => {
  if (level == 1) {
    if (getFirst(selector).y == 3) getFirst(selector).y += 2;
  } else if (level == 2 && !gameOver && (components.includes(engineD) || components.includes(engineMiniD))) {
    components.forEach(c => { getFirst(c).y += change });
  }
  else if (level == 3 && !gameOver) { getFirst(player).y += 1; }
});

onInput("d", () => {
  if (level == 1) {
    if (getFirst(selector).x != 10) getFirst(selector).x += 2;
  } else if (level == 2 && !gameOver && (components.includes(engineR) || components.includes(engineMiniR))) {
    components.forEach(c => { getFirst(c).x += change });
  }
  else if (level == 3 && !gameOver) { getFirst(player).x += 1; }
});

onInput("k", () => { 
  if (level == 0) { level = 1; setMap(levels[level]); clearText(); initialize(); } 
  else if (level == 2 || level == 3) {
    if (!gameOver) {
      if (components.includes(cannonU) && getAll(laserU).length < 3) { 
        laserQueue.push(laserU) 
        if (components.includes(cannonBooster)) { laserQueue.push(laserNW); laserQueue.push(laserNE); }
      }
      if (components.includes(cannonD) && getAll(laserD).length < 3) { 
        laserQueue.push(laserD) 
        if (components.includes(cannonBooster)) { laserQueue.push(laserSW); laserQueue.push(laserSE); }
      }
      if (components.includes(cannonL) && getAll(laserL).length < 3) { 
        laserQueue.push(laserL) 
        if (components.includes(cannonBooster)) { laserQueue.push(laserNW); laserQueue.push(laserSW); }
      }
      if (components.includes(cannonR) && getAll(laserR).length < 3) { 
        laserQueue.push(laserR) 
        if (components.includes(cannonBooster)) { laserQueue.push(laserNE); laserQueue.push(laserSE); }
      }
    } else { 
      level = 0; 
      setMap(levels[level]); 
      clearText(); 
      backmusic = playTune(menu, Infinity); 
      gameOver = false; 
      first = undefined; second = undefined; third = undefined; fourth = undefined; components = [];
      start(); }
  }
})

function swap(type) {
  switch (type) {
    case cannonU: return cannonR; break;
    case cannonD: return cannonL; break;
    case cannonL: return cannonU; break;
    case cannonR: return cannonD; break;
    case engineU: return engineR; break;
    case engineD: return engineL; break;
    case engineL: return engineU; break;
    case engineR: return engineD; break;
    case engineMiniU: return engineMiniR; break;
    case engineMiniU: return engineMiniL; break;
    case engineMiniU: return engineMiniU; break;
    case engineMiniU: return engineMiniD; break;
    default: return type; break;
  }
}

onInput("j", () => { 
  if (level == 0) { 
    level = 3;
    setMap(levels[level]); 
    clearText(); 
    addSprite(13, 15, player); 
    backmusic.end()
    backmusic = playTune(noise, Infinity)
    gameLoop(); 
    genAsteroids(); }
  else if (level == 2 && !gameOver && (components.includes(engineMiniU) || components.includes(engineMiniD) || components.includes(engineMiniL) || components.includes(engineMiniR))) {
    newComponents = [swap(third), swap(first), swap(fourth), swap(second)]
    addSprite(getFirst(first).x, getFirst(first).y, newComponents[0])
    addSprite(getFirst(second).x, getFirst(second).y, newComponents[1])
    addSprite(getFirst(third).x, getFirst(third).y, newComponents[2])
    addSprite(getFirst(fourth).x, getFirst(fourth).y, newComponents[3])
    
    getFirst(first).remove();
    getFirst(second).remove();
    getFirst(third).remove();
    getFirst(fourth).remove();
    
    components = newComponents
    first = components[0]
    second = components[1]
    third = components[2]
    fourth = components[3]
  }
})

onInput("l", () => {
  if (level == 1) { 
    let select = getFirst(selector)
    if (getTile(select.x, select.y).length == 2) {
      let type = getTile(select.x, select.y)[0].type
      getAll(type).forEach(t => { t.remove() })
      
      if (first == undefined) {
        addSprite(5, 7, type)
        first = type
      } else if (second == undefined) {
        addSprite(6, 7, type)
        second = type
      } else if (third == undefined) {
        addSprite(5, 8, type)
        third = type
      } else if (fourth == undefined) {
        addSprite(6, 8, type)
        fourth = type
      }
    }
  }
});

onInput("i", () => {
  if (level == 0) {
    backmusic.end()
    backmusic = playTune(controls, Infinity)
    level = 4;
    setMap(levels[level])
    clearText();

    addText("When building:", { x: 1, y: 2, color: color `4` })
    addText("WASD to move", { x: 3, y: 3, color: color `8` })
    addText("l to choose item", { x: 3, y: 4, color: color `9` })
    
    addText("When flying:", { x: 1, y: 6, color: color `7` })
    addText("WASD to move", { x: 3, y: 7, color: color `3` })
    addText("k to Fire Lasers", { x: 3, y: 8, color: color `H` })
    addText("with cannon", { x: 4, y: 9, color: color `H` })
    addText("j to Rotate", { x: 3, y: 10, color: color `C` })
    addText("with mini engine", { x: 4, y: 11, color: color `C` })

    addText("Press i to return", { x: 2, y: 14, color: color `2`})
  } else if (level == 4) {
    backmusic.end()
    backmusic = playTune(menu, Infinity)
    level = 0;
    setMap(levels[level])
    clearText();
    start();
  }
})

// these get run after every input
afterInput(() => {
  if (level == 1 && first != undefined && second != undefined && third != undefined && fourth != undefined) {
    components = [first, second, third, fourth];
    level++;
    clearText();
    score = 0;

    if (components.includes(engineBooster)) { change = 3 }

    backmusic.end();
    backmusic = playTune(noise, Infinity)
    setMap(levels[level]);
    spawnSpaceship();
    gameLoop();
    genAsteroids();
  }
});


function getType() {
  switch (Math.floor(Math.random() * 14)) {
    case 0: return cannonU; break;
    case 1: return cannonD; break;
    case 2: return cannonL; break;
    case 3: return cannonR; break;
    case 4: return engineU; break;
    case 5: return engineD; break;
    case 6: return engineL; break;
    case 7: return engineR; break;
    case 8: return engineMiniU; break;
    case 9: return engineMiniD; break;
    case 10: return engineMiniL; break;
    case 11: return engineMiniR; break;
    case 12: return cannonBooster; break;
    case 13: return engineBooster; break;
  }
}

function moveAsteroids() {
  getAll(asteroidU).forEach(ast => { 
    if (ast.y == 0) { score += 5; ast.remove(); }
    ast.y -= 1; 
  });

  getAll(asteroidD).forEach(ast => { 
    if (ast.y == height() - 1) { score += 5; ast.remove(); }
    ast.y += 1; 
  });

  getAll(asteroidL).forEach(ast => { 
    if (ast.x == width() - 1) { score += 5; ast.remove(); }
    ast.x += 1; 
  });

  getAll(asteroidR).forEach(ast => { 
    if (ast.x == 0) { score += 5; ast.remove(); }
    ast.x -= 1; 
  });
}

function endGame() {
  change = 1
  gameOver = true;
  backmusic.end()
  playTune(dundundun)
  addText("Game Over", { x: 5, y: 5, color: color`3` })
  
  setTimeout(addText("Press k to return", { x: 2, y: 15, color: color`F`}), 2000000)
}

function compareShip(ast) {
  return (ast.x == getFirst(first).x && ast.y == getFirst(first).y) ||
         (ast.x == getFirst(second).x && ast.y == getFirst(second).y) ||
         (ast.x == getFirst(third).x && ast.y == getFirst(third).y) ||
         (ast.x == getFirst(fourth).x && ast.y == getFirst(fourth).y); 
}

function compareLaser(ast) {
  let collided = false
  getAll(laserU).forEach(laser => { if (ast.x == laser.x && ast.y == laser.y) { collided = true; }});
  getAll(laserD).forEach(laser => { if (ast.x == laser.x && ast.y == laser.y) { collided = true; }});
  getAll(laserL).forEach(laser => { if (ast.x == laser.x && ast.y == laser.y) { collided = true; }});
  getAll(laserR).forEach(laser => { if (ast.x == laser.x && ast.y == laser.y) { collided = true; }});
  return collided;
}

function checkForCollision() {
  if (level == 2) {
    getAll(asteroidU).forEach(ast => { if (compareShip(ast)) { endGame() } })
    getAll(asteroidD).forEach(ast => { if (compareShip(ast)) { endGame() }})
    getAll(asteroidL).forEach(ast => { if (compareShip(ast)) { endGame() }})
    getAll(asteroidR).forEach(ast => { if (compareShip(ast)) { endGame() }})

    getAll(asteroidU).forEach(ast => { if (compareLaser(ast)) { ast.remove(); score += 25 } })
    getAll(asteroidD).forEach(ast => { if (compareLaser(ast)) { ast.remove(); score += 25 }})
    getAll(asteroidL).forEach(ast => { if (compareLaser(ast)) { ast.remove(); score += 25 }})
    getAll(asteroidR).forEach(ast => { if (compareLaser(ast)) { ast.remove(); score += 25 }})
  } else if (level == 3) {
    let p = getFirst(player)
    getAll(asteroidU).forEach(ast => { if (ast.x == p.x && ast.y == p.y) { endGame() } })
    getAll(asteroidD).forEach(ast => { if (ast.x == p.x && ast.y == p.y) { endGame() }})
    getAll(asteroidL).forEach(ast => { if (ast.x == p.x && ast.y == p.y) { endGame() }})
    getAll(asteroidR).forEach(ast => { if (ast.x == p.x && ast.y == p.y) { endGame() }})
  }
}

function genLasers() {
  laserQueue.forEach(laser => {
    if (laser == laserU && getFirst(cannonU)) { addSprite(getFirst(cannonU).x, getFirst(cannonU).y, laser) }
    if (laser == laserD && getFirst(cannonD)) { addSprite(getFirst(cannonD).x, getFirst(cannonD).y, laser) }
    if (laser == laserL && getFirst(cannonL)) { addSprite(getFirst(cannonL).x, getFirst(cannonL).y, laser) }
    if (laser == laserR && getFirst(cannonR)) { addSprite(getFirst(cannonR).x, getFirst(cannonR).y, laser) }
    if (laser == laserNW) { 
      let location = getFirst(cannonU) ? getFirst(cannonU) : getFirst(cannonL)
      addSprite(location.x, location.y, laser) }
    if (laser == laserNE) { 
      let location = getFirst(cannonU) ? getFirst(cannonU) : getFirst(cannonR)
      addSprite(location.x, location.y, laser) }
    if (laser == laserSW) { 
      let location = getFirst(cannonD) ? getFirst(cannonD) : getFirst(cannonL)
      addSprite(location.x, location.y, laser) }
    if (laser == laserSE) { 
      let location = getFirst(cannonD) ? getFirst(cannonD) : getFirst(cannonR)
      addSprite(location.x, location.y, laser) }
  })

  laserQueue = []
}

function moveLasers() {
  getAll(laserU).forEach(l => { 
    if (l.y == 0) { l.remove(); }
    l.y -= 1; 
  });

  getAll(laserD).forEach(l => { 
    if (l.y == height() - 1) { l.remove(); }
    l.y += 1; 
  });

  getAll(laserL).forEach(l => { 
    if (l.x == 0) { l.remove(); }
    l.x -= 1; 
  });

  getAll(laserR).forEach(l => { 
    if (l.x == width() - 1) { l.remove(); }
    l.x += 1; 
  });

  getAll(laserNW).forEach(l => {
    if (l.x == 0 || l.y == 0) { l.remove(); }
    l.x -= 1; l.y -= 1; 
  });

  getAll(laserNE).forEach(l => {
    if (l.x == width() -1 || l.y == 0) { l.remove(); }
    l.x += 1; l.y -= 1; 
  });

  getAll(laserSW).forEach(l => {
    if (l.x == 0 || l.y == height() - 1) { l.remove(); }
    l.x -= 1; l.y += 1; 
  });

  getAll(laserSE).forEach(l => {
    if (l.x == width() - 1 || l.y == height() - 1) { l.remove(); }
    l.x += 1; l.y += 1; 
  });
}

function gameLoop() {
  if (!gameOver) {
    genLasers()
    moveLasers()
    checkForCollision()
    moveAsteroids()
    checkForCollision()
    addText(`Score: ${score}`, { x: 0, y: 0, color: color `1`})
    
    setTimeout(gameLoop, 100)
  }
}

function genAsteroids() {
  if (!gameOver) {
    switch (Math.floor(Math.random() * 4)) {
      case 0:   addSprite(Math.floor(Math.random() * width()), 0, asteroidD); break;
      case 1:   addSprite(Math.floor(Math.random() * width()), 25, asteroidU); break;
      case 2:   addSprite(0, Math.floor(Math.random() * height()), asteroidL); break;
      case 3:   addSprite(31, Math.floor(Math.random() * height()), asteroidR); break;
    }
    
    setTimeout(genAsteroids, 250)
  }
}

function start() {
  score = 0
  addText("Galaxy Dodger", { x: 3, y: 3, color: color`5`})
  addText("Press k to start", { x: 2, y: 10, color: color`4`})
  addText("j for classic mode", { x: 1, y: 12, color: color`D`})
  addText("or i for controls", { x: 2, y: 14, color: color `7`})
}

start()
