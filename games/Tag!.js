/*
@title: Tag!
@author: Majd
@tags: [two-player]
@addedOn: 2024-00-00
*/

const tagger = "t"
const wall = "w"
const runner = "r"
const clock = "c"
const invert = "i"
const background = "b"
const tp = "p"
const speed = "s"

const tagSFX = tune`
124.48132780082987: C4^124.48132780082987 + D4^124.48132780082987 + E4^124.48132780082987 + F4^124.48132780082987 + G4^124.48132780082987,
124.48132780082987: C4^124.48132780082987 + D4^124.48132780082987 + E4^124.48132780082987 + F4^124.48132780082987 + G4^124.48132780082987,
3734.4398340248963`
const runnerWinSFX = tune`
143.54066985645932: C5^143.54066985645932 + C4-143.54066985645932,
143.54066985645932: A5^143.54066985645932 + A4-143.54066985645932,
143.54066985645932: G5^143.54066985645932 + G4-143.54066985645932,
143.54066985645932: B4^143.54066985645932 + C4-143.54066985645932,
143.54066985645932: C5^143.54066985645932 + C4-143.54066985645932,
3875.5980861244016`
const endGameTune = tune`
300: B4/300 + G4/300 + D4/300 + E5/300,
300: B4/300 + G4/300 + D4/300 + E5/300,
300: B4/300 + G4/300 + D4/300 + E5/300,
300: B4/300 + G4/300 + D4/300 + E5/300,
300: D5/300 + A4/300 + F4/300 + D4/300,
300: D5/300 + A4/300 + F4/300 + D4/300,
300: D5/300 + A4/300 + F4/300 + D4/300,
300: D5/300 + A4/300 + F4/300 + D4/300,
300: A4/300 + E4/300 + C4/300,
300: A4/300 + E4/300 + C4/300,
300: A4/300 + E4/300 + C4/300,
300: A4/300 + E4/300 + C4/300,
300: C4/300 + E4/300 + A4/300,
300: C4/300 + E4/300 + G4/300 + C5/300,
300: C4/300 + E4/300 + G4/300 + C5/300,
300: C5/300 + G4/300 + E4/300 + C4/300,
300: E5~300 + B4~300 + G4~300 + D4~300,
300: E5^300 + B4^300 + G4^300 + D4^300,
300: E5~300 + B4~300 + G4~300 + D4~300,
300: E5^300 + B4^300 + G4^300 + D4^300,
300: E5~300 + B4~300 + G4~300 + D4~300,
300: D5^300 + A4^300 + F4^300 + D4^300,
300: D5~300 + A4~300 + F4~300 + D4~300,
300: D5^300 + A4^300 + F4^300 + D4^300,
300: D5~300 + A4~300 + F4~300 + D4~300,
300: A4^300 + E4^300 + C4^300,
300: A4~300 + E4~300 + C4~300,
300: A4^300 + E4^300 + C4^300,
300: A4~300 + E4~300 + C4~300,
300: C5^300 + C4^300 + E4^300 + G4^300,
300: C5~300 + C4~300 + E4~300 + G4~300,
300: C5^300 + C4^300 + E4^300 + G4^300`
const roundTune = tune`
126.58227848101266: G4^126.58227848101266 + B4^126.58227848101266,
126.58227848101266: G4^126.58227848101266 + B4^126.58227848101266,
126.58227848101266: G4^126.58227848101266 + B4^126.58227848101266,
126.58227848101266: G4^126.58227848101266 + B4^126.58227848101266,
126.58227848101266: A4^126.58227848101266 + F4^126.58227848101266,
126.58227848101266: A4^126.58227848101266 + F4^126.58227848101266,
126.58227848101266: A4^126.58227848101266 + F4^126.58227848101266,
126.58227848101266: A4^126.58227848101266 + F4^126.58227848101266,
126.58227848101266: G4^126.58227848101266 + B4^126.58227848101266,
126.58227848101266: G4^126.58227848101266 + B4^126.58227848101266,
126.58227848101266: G4^126.58227848101266 + B4^126.58227848101266,
126.58227848101266: G4^126.58227848101266 + B4^126.58227848101266,
126.58227848101266: E5^126.58227848101266 + C5^126.58227848101266,
126.58227848101266: E5^126.58227848101266 + C5^126.58227848101266,
126.58227848101266: E5^126.58227848101266 + C5^126.58227848101266,
126.58227848101266: C5^126.58227848101266 + E5^126.58227848101266,
126.58227848101266: F4^126.58227848101266 + A4^126.58227848101266,
126.58227848101266: A4^126.58227848101266 + F4^126.58227848101266,
126.58227848101266: A4^126.58227848101266 + F4^126.58227848101266,
126.58227848101266: A4^126.58227848101266 + F4^126.58227848101266,
126.58227848101266: G4^126.58227848101266 + B4^126.58227848101266,
126.58227848101266: B4^126.58227848101266 + G4^126.58227848101266,
126.58227848101266: B4^126.58227848101266 + G4^126.58227848101266,
126.58227848101266: B4^126.58227848101266 + G4^126.58227848101266,
126.58227848101266: D5^126.58227848101266 + B4^126.58227848101266,
126.58227848101266: D5^126.58227848101266 + B4^126.58227848101266,
126.58227848101266: D5^126.58227848101266 + B4^126.58227848101266,
126.58227848101266: D5^126.58227848101266 + B4^126.58227848101266,
126.58227848101266: G4^126.58227848101266 + E4^126.58227848101266,
126.58227848101266: G4^126.58227848101266 + E4^126.58227848101266,
126.58227848101266: G4^126.58227848101266 + E4^126.58227848101266,
126.58227848101266: G4^126.58227848101266 + E4^126.58227848101266`
const roundFastTune = tune`
83.33333333333333: G4^83.33333333333333 + B4^83.33333333333333,
83.33333333333333: G4^83.33333333333333 + B4^83.33333333333333,
83.33333333333333: G4^83.33333333333333 + B4^83.33333333333333,
83.33333333333333: G4^83.33333333333333 + B4^83.33333333333333,
83.33333333333333: A4^83.33333333333333 + F4^83.33333333333333,
83.33333333333333: A4^83.33333333333333 + F4^83.33333333333333,
83.33333333333333: A4^83.33333333333333 + F4^83.33333333333333,
83.33333333333333: A4^83.33333333333333 + F4^83.33333333333333,
83.33333333333333: G4^83.33333333333333 + B4^83.33333333333333,
83.33333333333333: G4^83.33333333333333 + B4^83.33333333333333,
83.33333333333333: G4^83.33333333333333 + B4^83.33333333333333,
83.33333333333333: G4^83.33333333333333 + B4^83.33333333333333,
83.33333333333333: E5^83.33333333333333 + C5^83.33333333333333,
83.33333333333333: E5^83.33333333333333 + C5^83.33333333333333,
83.33333333333333: E5^83.33333333333333 + C5^83.33333333333333,
83.33333333333333: C5^83.33333333333333 + E5^83.33333333333333,
83.33333333333333: F4^83.33333333333333 + A4^83.33333333333333,
83.33333333333333: A4^83.33333333333333 + F4^83.33333333333333,
83.33333333333333: A4^83.33333333333333 + F4^83.33333333333333,
83.33333333333333: A4^83.33333333333333 + F4^83.33333333333333,
83.33333333333333: G4^83.33333333333333 + B4^83.33333333333333,
83.33333333333333: B4^83.33333333333333 + G4^83.33333333333333,
83.33333333333333: B4^83.33333333333333 + G4^83.33333333333333,
83.33333333333333: B4^83.33333333333333 + G4^83.33333333333333,
83.33333333333333: D5^83.33333333333333 + B4^83.33333333333333,
83.33333333333333: D5^83.33333333333333 + B4^83.33333333333333,
83.33333333333333: D5^83.33333333333333 + B4^83.33333333333333,
83.33333333333333: D5^83.33333333333333 + B4^83.33333333333333,
83.33333333333333: G4^83.33333333333333 + E4^83.33333333333333,
83.33333333333333: G4^83.33333333333333 + E4^83.33333333333333,
83.33333333333333: G4^83.33333333333333 + E4^83.33333333333333,
83.33333333333333: G4^83.33333333333333 + E4^83.33333333333333`
const clockSFX = tune`
84.26966292134831: A4-84.26966292134831 + B4-84.26966292134831 + C5-84.26966292134831 + D5-84.26966292134831 + E5-84.26966292134831,
84.26966292134831,
84.26966292134831: C4-84.26966292134831 + D4-84.26966292134831 + E4-84.26966292134831 + F4-84.26966292134831 + G4-84.26966292134831,
2443.820224719101`
const invertSFX = tune`
93.16770186335404: C4^93.16770186335404 + D4^93.16770186335404 + E4^93.16770186335404 + F4^93.16770186335404 + G4^93.16770186335404,
93.16770186335404: B5^93.16770186335404 + A5^93.16770186335404 + G5^93.16770186335404 + F5^93.16770186335404 + E5^93.16770186335404,
2795.031055900621`
const tpSFX = tune`
37.5: A4^37.5,
37.5: A4^37.5,
37.5: G4^37.5,
37.5: G4^37.5,
37.5: F4^37.5,
37.5: E4^37.5,
37.5: D4^37.5 + C4^37.5,
37.5: C4^37.5,
900`
const speedSFX = tune`
37.5: C4~37.5,
37.5: C4~37.5,
37.5: C4~37.5,
37.5: D4~37.5,
37.5: D4~37.5,
37.5: E4~37.5,
37.5: E4~37.5,
37.5: F4~37.5,
37.5: G4~37.5 + A4~37.5,
37.5: B4~37.5 + A4~37.5,
37.5: C5~37.5 + D5~37.5 + B4~37.5,
37.5: E5~37.5 + F5~37.5 + G5~37.5 + A5~37.5 + D5~37.5,
37.5: B5~37.5,
712.5`
const BLANK = tune`
16000`

setLegend(
  [tagger, bitmap`
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
  [runner, bitmap`
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
7777777777777777`],
  [wall, bitmap`
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
  [clock, bitmap`
................
....33333333....
..333333333333..
.33322200222333.
.33222222222233.
3322222222222233
3322222022222233
3322222022222233
3302222000022033
3322222222222233
3322222222222233
3322222222222233
.33222222222233.
.33322200222333.
..333333333333..
....33333333....`],
  [invert, bitmap`
...........7....
...........77...
...........777..
777777777777777.
7777777777777777
777777777777777.
...........777..
....3......77...
...33......7....
..333...........
.333333333333333
3333333333333333
.333333333333333
..333...........
...33...........
....3...........`],
  [tp, bitmap`
................
.H...HHHHHH.....
.....HHH888.H..H
.8..............
...HHHHHHHHHH.8.
....H8H8H8HH....
8.............H.
...HHHHHHHHHH...
.H.HHH888H8H8...
...............H
8.8HHHHHHHHHHH..
..H88HH8HH8HHH.8
................
.HHHHHHHHHHHHHH.
.8HH8HH88HH88HH.
................`],
  [speed, bitmap`
................
................
................
................
..3...3.........
..33333.........
..3333232323....
..3333232323CC..
..3333333333CCC.
..3333333333CCC.
..3333333333CCC.
..1L1111L1L11L1.
................
................
................
................`],
  [background, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`]
)

setSolids([tagger, runner, wall])


const levels = [
  map`
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwww
w....wwww....wwwwwwwww
w....wwww....wwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wbbbbbbbbbbbbbbbbbbbbw
wbwbwbbwwbwwbwbwbwbwbw
wbbbbbbbbbbbbwbbbbbbbw
wbbbwbbbbbbbbwbbbbwbbw
wwbwwbwwwbbbbbbbbbbbbw
wbbbbbbbwwwbbbbbwbbbbw
wbbwwbbbwbwwwbbbwbbbbw
wbwwwwbbwbbbbbwbwwbwww
wbbwbbbbbbbwbbbbwbbbbw
wbbbbbwbwwwwbbwbwbwbbw
wwbwbbwbbbwwbbbbwbbbbw
wbbwbbwbbwbwwbwwwwbbww
wbwwwbwwbbbbwbbbbbbbbw
wbbwwbbwwbbbbwbbbbbbbw
wbwbwwbbbbwbbbwbbbbwbw
wbtbwbbwwwwbbbbbbrbbbw
wbwbbbbwbbbbwbbwbbbbbw
wbbbwbbbbbwbbbbbbbbbbw
wwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwww
w....wwww....wwwwwwwww
w....wwww....wwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwbbbwbbbbbbbbbbbbbw
wbbbbwbwwwwbwbwbwwwwbw
wbbwwbbbbbbbbbbbbbbwbw
wbbwbbbwbwbbwbwbbwbbbw
wbbwbbbbwbbbbwbbbwbwbw
wbwwwbbbbbbbbbbwbbbwbw
wbbbbbwbbwbwwbwbwbrbbw
wbwwbbbbbwbwbbbbbbbbww
wbbwbbwwwwbwbbwbwbwbbw
wbbwbbbbbwbwwbbbbbbwww
wbbbwbwbbwbwbbwbbbbwbw
wbbbbbbwbbbbbwbbwwbwbw
wbwwwwbbbbwbwwbbwbbbbw
wbbbbwbwbbwbbwbbbbwwbw
wbbwbwbbbbwbbwbwbbbwbw
wbtbbwbwwwbbbwbbbbbbbw
wbbbbbbwbwbwwwwbwwwwbw
wwwwwwwwbbbbbbbbbbbbbw
wwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwww
w....wwww....wwwwwwwww
w....wwww....wwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wtbwbbbwbbbbbbwbbbbbbw
wbbbbwbbbbbwbbbbwbbwbw
wwbwbwbwbbbbbbwbbwbwbw
wbbbbbbbwwwbwwbbbbbwbw
wbwwwbwbwbbbbwbwbwbbbw
wbbbwbbbwwbwbwbbwbbwbw
wwwbwbwwwbbbwwbwbbw.ww
wbbbbbbbbbwwbwbbbwbwbw
wbwwbwwbwbbbbwbbbbbbbw
wbbwbbbbwwbbwwwwwwbwww
wwbbbwbwwbbbbwwwwwbbbw
wbbbwwbbwbwwbbbbbbwbww
wbwbbbbbwbbbbwwbwbbbbw
wbwwwwwbwbbwbwbbwwwbbw
wbwbbbbbwwbbwwbbbbbbbw
wbbbwbbwbbbbbbwbwbwbww
wwbbwbbbbwbwwbbbwbbbbw
wbbbwbbwbbbbbbbbbbwbrw
wwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwww
w....wwww....wwwwwwwww
w....wwww....wwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wbbbbbbbbbwwbwwwwwwwww
wbwwwwwwwbbbbwbbbwbbbw
wbbbbbbbbbwwbwbwbwbwbw
wbwwwbbwbwwwbbbwbbbwbw
wbwwwbbbbbwwbwbwbwbwbw
wbbbbbwbwbwwbwbbbwbwbw
wbwwwbwbwbbbbwwwwwwwbw
wbwwbbwbwbwwbwwbbbbbbw
wbbbbbbbbbwwbbbrbwwbww
wbwwbwwbwwwwwbwwbwwbww
wbwwbwbbbbbbbbwwbbbbbw
wtbbbwwbwbwwwbbbbwwbww
wwbbwwwbbbwwbbbwbwwbww
wwwbbwwwbwwwwbwwbwbbww
wwwwbbwbbbwwwbwwbwbwww
wwwwwbbbwbwwbbbbbbbwww
wwwwwwwbbbbbbwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwww
w....wwww....wwwwwwwww
w....wwww....wwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwww
wtbbbbbbbbwbbbbbbbbbbw
wwbwwwwbwwwwbwwwwbwwww
wbbbbwbbbbbwbbbbbbbbbw
wbwwbwwwbwwwwwwbwbwwww
wbbbbbwbbbbbbbbbwbbbbw
wwwbwbwwwbwwwbwbwwwbww
wbbbbbbbbbbbbbbbbbbbbw
wwbwwwbwbwwbwwwbwwbwww
wbbbbbbbbbbbbbwbbbbbbw
wwbwbwbwbwbwbwwwwbwwww
wbbbbbbbbbbbbbbbbbbbbw
wwwbwwwbwwwwbwwbwwwwbw
wbbbbbbbbbbbbbbbbbbbbw
wwwbwbwwwwbwwwwwbwbwbw
wbbbbbbbbbbbbbbbbbbbbw
wbwwbwwwbwwwwbwbwwwwbw
wbbbbbbbbbbbwbbbbbbbrw
wwwwwwwwwwwwwwwwwwwwww`
]

let level = 0

setMap(levels[level])

setPushables({
  [tagger]: []
})

let randomLevels = true

let intervalPlayerOne = 0
let intervalPlayerTwo = 0
let intervalRunnerTimer = 0
let canMove = true
let start = false

let isRunner = false
let isTagger = false

let playerOneScore = 0
let playerTwoScore = 0

let runnerTimer = 30
let resetRunnerTimer = 0

let getPlayerOneSprite = 0
let getPlayerTwoSprite = 0

let playerOneSpeed = 0
let playerTwoSpeed = 0

let playerOneInverted = false
let playerTwoInverted = false

let boost = false

let roundFastTunePlayback = playTune(BLANK, Infinity)
let roundTunePlayback = playTune(BLANK, Infinity)

let blankSpots = getAll(background)

const powerUps = ["clock", "invert", "tp", "speed"]
let powerUpsOn = true


function endGame(playerWhoWon) {
  clearText()
  setMap(levels[0])
  roundTunePlayback.end()
  playTune(endGameTune, Infinity)
  if (playerWhoWon == 1) {
    addText("Player One Wins!", { x: 2, y: 7, color: color`3` })
  } else {
    addText("Player Two Wins!", { x: 2, y: 7, color: color`3` })
  }
}

function spawnPowerUp() {
  let powerUpIndex = Math.floor(Math.random() * 4)
  console.log(powerUpIndex)
  let index = Math.floor(Math.random() * (blankSpots.length))
  if (powerUps[powerUpIndex] == "clock") {
    addSprite(blankSpots[index].x, blankSpots[index].y, clock)
  } else if (powerUps[powerUpIndex] == "invert") {
    addSprite(blankSpots[index].x, blankSpots[index].y, invert)
  } else if (powerUps[powerUpIndex] == "tp") {
    addSprite(blankSpots[index].x, blankSpots[index].y, tp)
  } else if (powerUps[powerUpIndex] == "speed") {
    addSprite(blankSpots[index].x, blankSpots[index].y, speed)
  }


}

function startTimer() {
  let played = false
  let randomTimeOne = Math.floor(Math.random() * (25 - 15 + 1) + 15)
  let randomTimeTwo = Math.floor(Math.random() * (randomTimeOne - 10) + 10) - 5
  console.log(randomTimeOne)
  console.log(randomTimeTwo)
  runnerTimer -= 1
  addText(String(runnerTimer), { x: 9, y: 1, color: color`9` })
  intervalRunnerTimer = setInterval(() => {
    clearText()
    addText(String(playerOneScore) + "-" + String(playerTwoScore), { x: 3, y: 1, color: color`3` })
    runnerTimer -= 1
    addText(String(runnerTimer), { x: 9, y: 1, color: color`9` })
    if (runnerTimer <= 5 && !played) {
      played = true
      roundTunePlayback.end()
      roundFastTunePlayback = playTune(roundFastTune, Infinity)
    }
    if (runnerTimer <= 0) {
      roundFastTunePlayback.end()
      playTune(runnerWinSFX)
      if (isRunner) { roundEnd(1) } else { roundEnd(2) }
    }
    if (runnerTimer == randomTimeOne && powerUpsOn) {
      randomTimeOne = -11
      spawnPowerUp()
    }
    if (runnerTimer == randomTimeTwo && powerUpsOn) {
      randomTimeTwo = -11
      spawnPowerUp()
    }
  }, 1000)
}


function roundEnd(playerWhoWon) {
  clearInterval(intervalPlayerOne)
  clearInterval(intervalPlayerTwo)
  clearInterval(intervalRunnerTimer)
  canMove = false
  if (playerWhoWon == 1) {
    playerOneScore += 1
    addText("Player One Wins!", { x: 2, y: 7, color: color`3` })
  } else {
    playerTwoScore += 1
    addText("Player Two Wins!", { x: 2, y: 7, color: color`3` })
  }

  addText(String(playerOneScore) + "-" + String(playerTwoScore), { x: 3, y: 1, color: color`3` })
  if (playerOneScore >= 5) {
    endGame(1)
  } else if (playerTwoScore >= 5) {
    endGame(2)
  } else {
    setTimeout(() => {
      clearText()
      if (randomLevels) {
        level = Math.floor(Math.random() * (levels.length - 1) + 1)
      } else {
        level += 1
        if (level >= levels.length) {
          level = 1
        }
      }

      setMap(levels[level])
      blankSpots = getAll(background)
      roundTunePlayback = playTune(roundTune, Infinity)
      runnerTimer = resetRunnerTimer
      addText(String(runnerTimer), { x: 9, y: 1, color: color`9` })
      addText(String(playerOneScore) + "-" + String(playerTwoScore), { x: 3, y: 1, color: color`3` })
      isRunner = !isRunner
      isTagger = !isTagger
      start = false
      canMove = true

    }, 3000)
  }

}



function checkIfTagged(player) {
  if ((getFirst(tagger).x + 1 == getFirst(runner).x || getFirst(tagger).x - 1 == getFirst(runner).x) && getFirst(tagger).y == getFirst(runner).y) {
    roundTunePlayback.end()
    roundFastTunePlayback.end()
    playTune(tagSFX)
    if (player == 1) { roundEnd(1) } else { roundEnd(2) }
  } else if ((getFirst(tagger).y + 1 == getFirst(runner).y || getFirst(tagger).y - 1 == getFirst(runner).y) && getFirst(tagger).x == getFirst(runner).x) {
    roundTunePlayback.end()
    roundFastTunePlayback.end()
    playTune(tagSFX)
    if (player == 1) { roundEnd(1) } else { roundEnd(2) }
  }
}


function clockPowerUp(role) {
  playTune(clockSFX)
  if (role == "tagger") {
    runnerTimer += 6
  } else {
    runnerTimer -= 6
  }
  getFirst(clock).remove()
}

function invertPowerUp(player) {
  playTune(invertSFX)
  if (player == 1) {
    playerTwoInverted = true
    setTimeout(() => { playerTwoInverted = false }, 3000)
  } else {
    playerOneInverted = true
    setTimeout(() => { playerOneInverted = false }, 3000)
  }
  getFirst(invert).remove()
}

function tpPowerUp(role) {
  playTune(tpSFX)
  if (role == "tagger") {
    let index = Math.floor(Math.random() * (blankSpots.length))
    getFirst(runner).remove()
    addSprite(blankSpots[index].x, blankSpots[index].y, runner)
  } else {
    let index = Math.floor(Math.random() * (blankSpots.length))
    getFirst(tagger).remove()
    addSprite(blankSpots[index].x, blankSpots[index].y, tagger)
  }
  getFirst(tp).remove()
}

function speedPowerUp(player) {
  playTune(speedSFX)
  if (player == 1) {
    playerOneSpeed -= 35
    boost = true
    setTimeout(() => {
      playerOneSpeed += 35
      boost = false
    }, 3000)
  } else {
    playerTwoSpeed -= 35
    boost = true
    setTimeout(() => {
      playerTwoSpeed -= 35
      boost = false
    }, 3000)
  }
  getFirst(speed).remove()
}

function checkPowerUp(player, role) {

  if (role == "tagger") {
    if (tilesWith(tagger, clock).length >= 1) {
      clockPowerUp(role)
    }
    if (tilesWith(tagger, invert).length >= 1) {
      invertPowerUp(player)
    }
    if (tilesWith(tagger, tp).length >= 1) {
      tpPowerUp(role)
    }
    if (tilesWith(tagger, speed).length >= 1) {
      speedPowerUp(player)
    }
  } else if (role == "runner") {
    if (tilesWith(runner, clock).length >= 1) {
      clockPowerUp(role)
    }

    if (tilesWith(runner, invert).length >= 1) {
      invertPowerUp(player)
    }
    if (tilesWith(runner, tp).length >= 1) {
      tpPowerUp(role)
    }
    if (tilesWith(runner, speed).length >= 1) {
      speedPowerUp(player)
    }
  }
}

function movePlayerOne(direction, role) {
  if (role == "tagger" && !boost) {
    getPlayerOneSprite = getFirst(tagger)
    playerOneSpeed = 145
  } else if (role == "runner" && !boost) {
    getPlayerOneSprite = getFirst(runner)
    playerOneSpeed = 150
  }
  clearInterval(intervalPlayerOne)
  if (canMove == true) {
    intervalPlayerOne = setInterval(() => {
      if (role == "tagger") { checkIfTagged(1) }
      checkPowerUp(1, role)
      if (direction == "w") {
        getPlayerOneSprite.y -= 1
      } else if (direction == "a") {
        getPlayerOneSprite.x -= 1
      } else if (direction == "s") {
        getPlayerOneSprite.y += 1
      } else {
        getPlayerOneSprite.x += 1
      }

    }, playerOneSpeed)
  }
}

function movePlayerTwo(direction, role) {
  if (role == "tagger" && !boost) {
    getPlayerTwoSprite = getFirst(tagger)
    playerTwoSpeed = 145
  } else if (role == "runner" && !boost) {
    getPlayerTwoSprite = getFirst(runner)
    playerTwoSpeed = 150
  }
  clearInterval(intervalPlayerTwo)
  if (canMove == true) {
    intervalPlayerTwo = setInterval(() => {
      if (role == "tagger") { checkIfTagged(2) }
      checkPowerUp(2, role)
      if (direction == "i") {
        getPlayerTwoSprite.y -= 1
      } else if (direction == "j") {
        getPlayerTwoSprite.x -= 1
      } else if (direction == "k") {
        getPlayerTwoSprite.y += 1
      } else {
        getPlayerTwoSprite.x += 1
      }
    }, playerTwoSpeed)
  }
}






function resetMenuText() {
  clearText()
  addText("Tag!", { x: 8, y: 1, color: color`3` })
  addText("Runner Timer is " + String(runnerTimer), { x: 1, y: 3, color: color`9` })
  if (powerUpsOn) {
    addText("Power Ups On", { x: 4, y: 6, color: color`3` })
  } else {
    addText("Power Ups Off", { x: 4, y: 6, color: color`3` })
  }
  if (randomLevels) {
    addText("Random Levels On", { x: 2, y: 9, color: color`5` })
  } else {
    addText("Random Levels Off", { x: 2, y: 9, color: color`5` })
  }
  addText("Right Button To Start!", { x: 1, y: 12, color: color`4` })
}

function startGame() {
  clearText()
  if (randomLevels) {
    level = Math.floor(Math.random() * (levels.length - 1) + 1)
  } else { level += 1 }

  setMap(levels[level])
  blankSpots = getAll(background)
  addText(String(runnerTimer), { x: 9, y: 1, color: color`9` })
  addText(String(playerOneScore) + "-" + String(playerTwoScore), { x: 3, y: 1, color: color`3` })
  roundTunePlayback = playTune(roundTune, Infinity)
}

function changeTime(input) {
  if (input == "a" && runnerTimer > 10) {
    runnerTimer -= 5
  } else if (input == "d") {
    runnerTimer += 5
  }
  resetRunnerTimer = runnerTimer
  resetMenuText()
}

function powerUpsToggle() {
  powerUpsOn = !powerUpsOn
  resetMenuText()
}

function randomLevelsToggle() {
  randomLevels = !randomLevels
  resetMenuText()
}

resetRunnerTimer = runnerTimer
resetMenuText()



function playerOneInput(direction, oppositeDirection) {
  if (!start) {
    start = true
    startTimer()
  }
  if (!playerOneInverted) {
    if (!isRunner) {
      movePlayerOne(direction, "tagger")
    } else { movePlayerOne(direction, "runner") }
  } else {
    if (!isRunner) {
      movePlayerOne(oppositeDirection, "tagger")
    } else { movePlayerOne(oppositeDirection, "runner") }
  }
}

function playerTwoInput(direction, oppositeDirection) {
  if (level != 0) {
    if (!start) {
      start = true
      startTimer()
    }
    if (!playerTwoInverted) {
      if (!isTagger) {
        movePlayerTwo(direction, "runner")
      } else { movePlayerTwo(direction, "tagger") }
    } else {
      if (!isTagger) {
        movePlayerTwo(oppositeDirection, "runner")
      } else { movePlayerTwo(oppositeDirection, "tagger") }
    }
  }
}

onInput("w", () => { if (level == 0) { powerUpsToggle() } else { playerOneInput("w", "s") } })
onInput("a", () => { if (level == 0) { changeTime("a") } else { playerOneInput("a", "d") } })
onInput("s", () => { if (level == 0) { randomLevelsToggle() } else { playerOneInput("s", "w") } })
onInput("d", () => { if (level == 0) { changeTime("d") } else { playerOneInput("d", "a") } })


onInput("i", () => { playerTwoInput("i", "k") })
onInput("j", () => { playerTwoInput("j", "l") })
onInput("k", () => { playerTwoInput("k", "i") })
onInput("l", () => { if (level == 0) { startGame() } else { playerTwoInput("l", "j") } })