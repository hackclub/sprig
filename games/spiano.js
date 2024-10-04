/*
@title: spiano
@author: thezebix
@tags: ['music']
@addedOn: 2024-04-19
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const unpressedKey = "u"
const pressedKey = "p"
const controlPanel1 = "c"
const screenLeft = "l"
const screenMiddle = "m"
const screenRight = "r"
const greyBg = "g"
const hashLeft = "h"
const hashRight = "i"

const tuneA = tune`
750: B4~750,
23250`;
const tuneD = tune`
750: C5~750,
23250`;
const tuneJ = tune`
750: D5~750,
23250`;
const tuneL = tune`
750: E5~750,
23250`;

const tuneW = tune`
750: F5~750,
23250`;
const tuneS = tune`
750: G5~750,
23250`;
const tuneI = tune`
750: A5~750,
23250`;
const tuneK = tune`
750: B5~750,
23250`;

setLegend(
  [unpressedKey, bitmap`
L00000000000000L
L02222222222220L
L02222222222220L
L02222222222220L
L02222222222220L
L02222222222220L
L02222222222220L
L02222222222220L
L02222222222220L
L02222222222220L
L02222222222220L
L02222222222220L
L02222222222220L
L00222222222200L
LL000000000000LL
LL000000000000LL`],
  [pressedKey, bitmap`
L00000000000000L
L01111111111110L
L01111111111110L
L01111111111110L
L01111111111110L
L01111111111110L
L01111111111110L
L01111111111110L
L01111111111110L
L01111111111110L
L01111111111110L
L01111111111110L
L01111111111110L
L00111111111100L
LL000000000000LL
LL000000000000LL`],
  [controlPanel1, bitmap`
LLLLLLLLLLLLLLLL
LLL000LLLLLLLLLL
LL02230LLLLLLLLL
L0233330LLLLLLLL
L0233330LLLLLLLL
L0333330LLLLLLLL
LL03330LLLLLLLLL
LLL000LLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL000LLLLLLLLLL
LL05550LLLLLLLLL
LL05550LLLLLLLLL
LLL000LLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [greyBg, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [screenLeft, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLL00000000
LLLLLL0004444444
LLLLL004444DD444
LLLLL044444DDDD4
LLLLL044444D4DDD
LLLLL044444D44DD
LLLLL044444D44D4
LLLLL0444DDD4D44
LLLLL044D44D4444
LLLLL044D44D4444
LLLLL0444DD44444
LLLLL00444444444
LLLLLL0004444444
LLLLLLLL00000000
LLLLLLLLLLLLLLLL`],
  [screenMiddle, bitmap`
LLLLLLLLLLLLLLLL
0000000000000000
4444444444444444
44444444DD444444
44444444DDDD4444
44444444D4DDD444
44444444D44DD444
44444444D44D4444
444444DDD4D44444
44444D44D4444444
44444D44D4444444
444444DD44444444
4444444444444444
4444444444444444
0000000000000000
LLLLLLLLLLLLLLLL`],
  [screenRight, bitmap`
LLLLLLLLLLLLLLLL
00000000LLLLLLLL
4444444000LLLLLL
444DD444400LLLLL
444DDDD4440LLLLL
444D4DDD440LLLLL
444D44DD440LLLLL
444D44D4440LLLLL
4DDD4D44440LLLLL
D44D4444440LLLLL
D44D4444440LLLLL
4DD44444440LLLLL
44444444400LLLLL
4444444000LLLLLL
00000000LLLLLLLL
LLLLLLLLLLLLLLLL`],
  [hashLeft, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
L000000000000000
0111111111111111
0000000000000000
0111111111111111
0000000000000000
0111111111111111
0000000000000000
0111111111111111
0000000000000000
0111111111111111
L000000000000000
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [hashRight, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
000000000000LLLL
1111111111110LLL
0000000000000LLL
1111111111110LLL
0000000000000LLL
1111111111110LLL
0000000000000LLL
1111111111110LLL
0000000000000LLL
1111111111110LLL
000000000000LLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
)

setBackground(greyBg)

let level = 0
const levels = [
  map`
clmmr.hi
uuuuuuuu`
]

setMap(levels[level])

addText(" A D J  L  W S  I K", {
  x: 0,
  y: 11,
  color: color`3`
})

onInput("a", () => {
  getTile(0, 1).find(s => s.type == unpressedKey).remove()
  addSprite(0, 1, pressedKey)
  playTune(tuneA)
  setTimeout(function() {
    getTile(0, 1).find(s => s.type == pressedKey).remove()
    addSprite(0, 1, unpressedKey)
  }, 600);
})

onInput("d", () => {
  getTile(1, 1).find(s => s.type == unpressedKey).remove()
  addSprite(1, 1, pressedKey)
  playTune(tuneD)
  setTimeout(function() {
    getTile(1, 1).find(s => s.type == pressedKey).remove()
    addSprite(1, 1, unpressedKey)
  }, 600);
})

onInput("j", () => {
  getTile(2, 1).find(s => s.type == unpressedKey).remove()
  addSprite(2, 1, pressedKey)
  playTune(tuneJ)
  setTimeout(function() {
    getTile(2, 1).find(s => s.type == pressedKey).remove()
    addSprite(2, 1, unpressedKey)
  }, 600);
})

onInput("l", () => {
  getTile(3, 1).find(s => s.type == unpressedKey).remove()
  addSprite(3, 1, pressedKey)
  playTune(tuneL)
  setTimeout(function() {
    getTile(3, 1).find(s => s.type == pressedKey).remove()
    addSprite(3, 1, unpressedKey)
  }, 600);
})

onInput("w", () => {
  getTile(4, 1).find(s => s.type == unpressedKey).remove()
  addSprite(4, 1, pressedKey)
  playTune(tuneW)
  setTimeout(function() {
    getTile(4, 1).find(s => s.type == pressedKey).remove()
    addSprite(4, 1, unpressedKey)
  }, 600);
})

onInput("s", () => {
  getTile(5, 1).find(s => s.type == unpressedKey).remove()
  addSprite(5, 1, pressedKey)
  playTune(tuneS)
  setTimeout(function() {
    getTile(5, 1).find(s => s.type == pressedKey).remove()
    addSprite(5, 1, unpressedKey)
  }, 600);
})

onInput("i", () => {
  getTile(6, 1).find(s => s.type == unpressedKey).remove()
  addSprite(6, 1, pressedKey)
  playTune(tuneI)
  setTimeout(function() {
    getTile(6, 1).find(s => s.type == pressedKey).remove()
    addSprite(6, 1, unpressedKey)
  }, 600);
})

onInput("k", () => {
  getTile(7, 1).find(s => s.type == unpressedKey).remove()
  addSprite(7, 1, pressedKey)
  playTune(tuneK)
  setTimeout(function() {
    getTile(7, 1).find(s => s.type == pressedKey).remove()
    addSprite(7, 1, unpressedKey)
  }, 600);
})

afterInput(() => {

})
