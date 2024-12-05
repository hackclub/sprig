/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: FinalTrigger
@author: MrDomocle
@tags: []
@addedOn: 2024-00-00
*/

let playMusic = false // turn music switch - set with "i"

let mx = 0 // x movement
let my = 0 // y movement
let dead = false // to stop things from running when character is dead
let deadInputs = 0 // how many presses after death

const player = "p"
const spike = "s"
const uspike = "u"
const wall = "w"
const box = "x"
const fbox = "o"
const flagbase = "e"
const flagpole = "f"
const flagtip = "t"
const bg = "b"
setLegend(
  [ player, bitmap`
................
................
.....00..00.....
....04D00D40....
...0204DD4020...
...000DDDD000...
...0F0D44D0F0...
..0D0DD44DD0D0..
..044D0000D440..
..0D00666600D0..
..00F66FF66F00..
...000F66F000...
..0.0D0000D0.0..
....0D4DD4D0....
.....000000.....
.....0....0.....` ],
  [ spike, bitmap`
................
0...0...0...0...
0...0...0...0...
0...0...0...0...
10.010.010.010.0
10.010.010.010.0
10.010.010.010.0
2101210121012101
2101210121012101
2201220122012201
2201220122012201
2201220122012201
2201220122012201
2201220122012201
2201220122012201
2201220122012201` ],
  [ uspike, bitmap`
2201220122012201
2201220122012201
2201220122012201
2201220122012201
2201220122012201
2201220122012201
2201220122012201
2101210121012101
2101210121012101
10.010.010.010.0
10.010.010.010.0
10.010.010.010.0
0...0...0...0...
0...0...0...0...
0...0...0...0...
................` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
CCC1CCCCCCC1CCCC
CCC1CCCCCCC1CCCC
CCC1CCCCCCC1CCCC
LLLLLLLLLLLLLLLL
CCCCCCC1CCCCCCC1
CCCCCCC1CCCCCCC1
CCCCCCC1CCCCCCC1
LLLLLLLLLLLLLLLL
CCC1CCCCCCC1CCCC
CCC1CCCCCCC1CCCC
CCC1CCCCCCC1CCCC
LLLLLLLLLLLLLLLL
CCCCCCC1CCCCCCC1
CCCCCCC1CCCCCCC1
CCCCCCC1CCCCCCC1` ],
  [ box, bitmap`
CCCCCCCCCCCCCCCC
CC666666666666CC
C6F6666666666F9C
C66F66666666F69C
C666F666666F669C
C6666F6666F6669C
C66666F66F66669C
C666666FF666669C
C666666FF666669C
C66666F66F66669C
C6666F6666F6669C
C666F666666F669C
C66F66666666F69C
C6F6666666666F9C
CC999999999999CC
CCCCCCCCCCCCCCCC` ],
  [ fbox, bitmap`
CCCCCCCCCCCCCCCC
CC666666666666CC
C6F6666666666F9C
C66F66666666F69C
C666F666666F669C
C6666F6666F6669C
C66666F66F66669C
C666666FF666669C
C666666FF666669C
C66666F66F66669C
C6666F6666F6669C
C666F666666F669C
C66F66666666F69C
C6F6666666666F9C
CC999999999999CC
CCCCCCCCCCCCCCCC` ],
  [ flagbase, bitmap`
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
....00000000....
.00055557777000.
0555555577777770
0555555577777770
0555555577777770
0000000000000000` ],
  [ flagpole, bitmap`
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......` ],
  [ flagtip, bitmap`
................
................
................
.......133333333
.......13333333.
.......1333333..
.......133333...
.......13333....
.......1333.....
.......133......
.......13.......
.......12.......
.......12.......
.......12.......
.......12.......
.......12.......` ],
  [ bg, bitmap`
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
7777777777777777` ]
)

const tuneLen = 3333 // ms
const melody1 = tune`
102.38907849829351: G4^102.38907849829351,
102.38907849829351: A4^102.38907849829351,
102.38907849829351: C5^102.38907849829351,
102.38907849829351: A4^102.38907849829351,
102.38907849829351: E5^102.38907849829351 + F4~102.38907849829351,
204.77815699658703,
102.38907849829351: E5^102.38907849829351,
204.77815699658703,
102.38907849829351: D5^102.38907849829351 + G4~102.38907849829351,
511.9453924914676,
102.38907849829351: G4^102.38907849829351,
102.38907849829351: A4^102.38907849829351,
102.38907849829351: B4^102.38907849829351,
102.38907849829351: G4^102.38907849829351,
102.38907849829351: D5^102.38907849829351 + E4~102.38907849829351,
204.77815699658703,
102.38907849829351: D5^102.38907849829351,
204.77815699658703,
102.38907849829351: C5^102.38907849829351 + A4~102.38907849829351,
511.9453924914676`
const melody2 = tune`
102.38907849829351: G4^102.38907849829351,
102.38907849829351: A4^102.38907849829351,
102.38907849829351: C5^102.38907849829351,
102.38907849829351: A4^102.38907849829351,
102.38907849829351: C5^102.38907849829351 + F4~102.38907849829351,
307.1672354948805,
102.38907849829351: D5^102.38907849829351,
102.38907849829351,
102.38907849829351: B4^102.38907849829351 + G4~102.38907849829351,
204.77815699658703,
102.38907849829351: A4^102.38907849829351,
102.38907849829351: G4^102.38907849829351,
307.1672354948805,
102.38907849829351: G4^102.38907849829351,
102.38907849829351,
102.38907849829351: D5^102.38907849829351 + E4~102.38907849829351,
307.1672354948805,
102.38907849829351: C5^102.38907849829351 + A4~102.38907849829351,
716.7235494880546`
const melody3 = tune`
102.38907849829351: G4^102.38907849829351,
102.38907849829351: A4^102.38907849829351,
102.38907849829351: C5^102.38907849829351,
102.38907849829351: A4^102.38907849829351,
102.38907849829351: E5^102.38907849829351 + F4~102.38907849829351,
204.77815699658703,
102.38907849829351: E5^102.38907849829351,
204.77815699658703,
102.38907849829351: D5^102.38907849829351 + G4~102.38907849829351,
511.9453924914676,
102.38907849829351: G4^102.38907849829351,
102.38907849829351: A4^102.38907849829351,
102.38907849829351: B4^102.38907849829351,
102.38907849829351: G4^102.38907849829351,
102.38907849829351: G5^102.38907849829351 + E4~102.38907849829351,
204.77815699658703,
102.38907849829351: B4^102.38907849829351,
204.77815699658703,
102.38907849829351: C5^102.38907849829351 + A4~102.38907849829351,
204.77815699658703,
102.38907849829351: B4^102.38907849829351,
102.38907849829351: A4^102.38907849829351,
102.38907849829351`

const jumpTune = tune`
37.5: C5^37.5,
37.5: D5^37.5,
37.5: E5^37.5,
37.5: F5^37.5,
37.5: G5^37.5,
1012.5`
const walkTune = tune`
117.1875: C4^117.1875,
3632.8125`

const gameOverTune = tune`
139.53488372093022,
69.76744186046511: B4^69.76744186046511 + G4~69.76744186046511,
69.76744186046511,
69.76744186046511: F5^69.76744186046511 + G4~69.76744186046511,
209.30232558139534,
69.76744186046511: F5^69.76744186046511 + G4~69.76744186046511,
69.76744186046511,
69.76744186046511: F5^69.76744186046511 + G4~69.76744186046511,
139.53488372093022,
69.76744186046511: E5^69.76744186046511 + A4~69.76744186046511,
139.53488372093022,
69.76744186046511: D5^69.76744186046511 + B4~69.76744186046511,
69.76744186046511,
69.76744186046511: C5^69.76744186046511,
209.30232558139534,
69.76744186046511: G4~69.76744186046511,
209.30232558139534,
69.76744186046511: C4~69.76744186046511,
348.83720930232556`
const winTune = tune`
79.36507936507937: G4^79.36507936507937 + C5~79.36507936507937,
79.36507936507937,
79.36507936507937: E4^79.36507936507937 + G4~79.36507936507937,
79.36507936507937,
79.36507936507937: G4^79.36507936507937 + C5~79.36507936507937,
79.36507936507937,
79.36507936507937: C5^79.36507936507937 + E5~79.36507936507937,
79.36507936507937,
79.36507936507937: G4^79.36507936507937 + C5~79.36507936507937,
79.36507936507937,
79.36507936507937: E5^79.36507936507937 + C5~79.36507936507937,
79.36507936507937,
79.36507936507937: G5^79.36507936507937 + E5~79.36507936507937,
317.46031746031747,
79.36507936507937: E5^79.36507936507937 + C5~79.36507936507937,
1111.111111111111`
const endTune = tune`
88.49557522123894,
88.49557522123894: C5~88.49557522123894 + F5-88.49557522123894,
265.4867256637168,
88.49557522123894: C5~88.49557522123894 + F5-88.49557522123894,
88.49557522123894,
88.49557522123894: C5~88.49557522123894 + F5-88.49557522123894,
88.49557522123894,
88.49557522123894: C5~88.49557522123894 + F5-88.49557522123894,
88.49557522123894,
88.49557522123894: B4~88.49557522123894 + G5-88.49557522123894,
176.99115044247787,
88.49557522123894: D4^88.49557522123894,
176.99115044247787,
88.49557522123894: G4^88.49557522123894,
1238.9380530973451`

setSolids([spike, player, wall, box, fbox])

let level = 0
const levels = [
  map`
uuuuuuuuuuuuuuuuuuuu
.www.w.w..w..ww..w..
.wp..w.wwpw.wp.w.w..
.ww..w.w.ww.wwww.w..
.w...w.w..w.w..w.ww.
....................
ooo..o...ooo...oo...
.o...o...o.....opo..
.o...o...opo...oo...
.o...o...ooo...o.o..
..oo..ooo...ooo.....
..opo.o.....ooo.....
..oo..opo...op......
..o.o.ooo...ooo.....
....................
ssssssssssssssssssss`, // 0
  map`
p.........
..........
..........
..........
..........
..........
wwwwwwwwww
wwwwwwwwww`, // 1
  map`
..........
..........
.....w....
....www...
...wwwww..
p.wwwwwww.
wwwwwwwwww
wwwwwwwwww`, // 2
  map`
..........
.........t
.......w.f
......ww.f
.....www.f
p...wwww.e
wwwwwwwwww
wwwwwwwwww`, // 3
  map`
..........
..........
..........
..x...w...
.ww...ww..
p.....www.
wwwwwwwwww
wwwwwwwwww`, // 4
  map`
..........
..........
..........
..x.......
..x.......
p.x.......
www...wwww
wwwssswwww`, // 5
  map`
..........
..........
..........
..........
..........
p.........
w.w.w.w.ww
ssssssssss`, // 6
  map`
..........
..........
....x.....
....w...w.
..w.....w.
pww.....w.
wwwwwwwwww
wwwwwwwwww`, // 7
  map`
..........
.........t
.........f
.........f
......w..f
px...www.e
ww.wwwwwww
wwswwwwwww`, // 8
  map`
..........
..........
..........
..........
.x.x......
px.x......
ww.w.w.w.w
wwswswswsw`, // 9
  map`
..........
..........
..........
...o.o..o.
..o.......
po........
ww........
ww........`, // 10
  map`
..........
.........t
p........f
o.o..o...f
.........f
.........e
........ww
........ww`, // 11
  map`
uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
........................................
..xxxxxxx.x....x..xxxx..x...x.x...x.....
.....x....x....x.x....x.xx..x.x..xx.....
.....x....x....x.xp...x.xx..x.xpxx......
.....x....xxxxxx.xxxxxx.x.x.x.xxx.......
.....x....xxxxxx.xxxxxx.x.x.x.xx........
.....x....x....x.x....x.x..xx.xxx.......
.....x....x....x.x....x.x..xx.x.xx......
.....x....x....x.x....x.x...x.x..xx.....
.............p..........................
.........w...w..ww..w...w....w..w.......
.........w...w.w..w.w...w....w..w.......
..........w.w..w..w.w...w....w..w.......
...........w...w..w.w...w....wwww.......
...........w...w..w.w...w.......w.......
...........w....ww...www........w.......
........................................
........................................
...p....................................
..xxxx.x.....xx..x..x.xxxx.x...x.xxxx...
..x..x.x....x..x.x..x..xx..xx..x.x......
..x..x.x....x..x.x..x..xx..xx..x.x......
..x..x.x....x..x.x..x..xx..xx..x.x......
..xxxx.x....xxxx..x.x..xx..x.x.x.x.p....
..x....x....x..x...xx..xx..x.x.x.x.xx...
..x....x....x..x....x..xx..x..xx.x..x...
..x....x....x..x....x..xx..x..xx.x..x...
..x....x....x..x....x..xx..x..xx.x..x...
..x....xxxx.x..x....x.xxxx.x...x.xxxx...
........................................
ssssssssssssssssssssssssssssssssssssssss`, // 12
]
let flagLevels = [3, 8, 11]
let edge = ""

setMap(levels[level])
setBackground(bg)

if (level === 0) { // title screen
  dead = true
  addText("Press j to start", {y: 14, color: `0`})
}
if (level === 12) { // end screen
  dead = true
}
  
function playBGM() {
  if (playMusic) {
    setTimeout(() => playTune(melody1), 0*tuneLen)
    setTimeout(() => playTune(melody2), 1*tuneLen)
    setTimeout(() => playTune(melody3), 2*tuneLen)
    setTimeout(() => playTune(melody2), 3*tuneLen)
  }
}
playBGM()

function gameOver(msg) {
  dead = true // set death flag - disables all physics until restart
  let wait = 0
  if (msg === "Reset") {
    wait = 500
  }
  else {
    playTune(gameOverTune)
    wait = 2000
  }
  addText(msg, {y:7, color:`3`})
  setTimeout( () => { // wait before resetting level
    clearText()
    resetVars()
    setMap(levels[level])
    console.log("reset")
  }, wait)
}
function screenScroll() {
  let y = getFirst(player).y
  resetVars()
  level += 1
  setMap(levels[level])
  getFirst(player).y = y // restore height
  console.log("level " + level)
}
function screenScrollBack() {
  let y = getFirst(player).y
  resetVars()
  level -= 1
  setMap(levels[level])
  getFirst(player).y = y // restore height
  getFirst(player).x = width() - 1 // restore horizontal
  console.log("level " + level)
}
function levelWin(pole) {
  let winText = ""
  switch (pole) { // change message depending on what part of the pole was touched
    case 0: // base
      winText = "Good job!"
      break
    case 1: // pole
      winText = "Congratulations!"
      break
    case 2: // tip
      winText = "Amazing!"
      break
  }
  addText(winText, {y:7, color:`6`})
  playTune(winTune)
  dead = true // disable logic until transition finishes
  setTimeout( () => { // wait before setting level
    clearText()
    resetVars()
    level += 1
    setMap(levels[level])
    console.log("level " + level)
  }, 3000)
}
function gameWin() {
  addText("Game complete!", {y:7, color:`6`})
  dead = true
}
function resetVars() {
  mx = 0
  my = 0
  edge = ""
  dead = false
  deadInputs = 0
}

function update() {
  // Player
  
  let frog = getFirst(player) // this is our player instance
  let absMx = Math.abs(mx) // absolute values for iteration
  let absMy = Math.abs(my)
  // do in for loops to prevent skipping tiles
  if (my < 0) { // if sum is up
    for (let i = 0; i < absMy; i++) {
      frog.y -= 1
    }
    playTune(jumpTune) // play jump sound
  }
  if (my >= 0) { // if sum is down or nothing
    for (let i = 0; i <= absMy; i++) { // the <= adds one to account for gravity
      frog.y += 1
    }
  }
  // movement on x
  if (mx < 0) { // if sum is left
    for (let i = 0; i < absMx; i++) {
      frog.x -= 1
    }
    playTune(walkTune) // play walk sound
  }
  if (mx > 0) { // if sum is right
    for (let i = 0; i < absMx; i++) {
      frog.x += 1
    }
    playTune(walkTune) // play walk sound
  }
  // reset both
  mx = 0
  my = 0

  // run logic checks
  checkDeath() // game over if above spikes
  checkFlag()
  checkEdge()

  // Boxes
  boxes = getAll(box)
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].y += 1 // gravity
  }
}

function isOnGround() {
  walls = getAll(wall)
  boxes = getAll(box)
  fboxes = getAll(fbox)
  let x = getFirst(player).x
  let y = getFirst(player).y
  for (let i = 0; i < walls.length; i++) {
    if (x === walls[i].x & y+1 === walls[i].y) {
      return true
    }
  }
  for (let i = 0; i < boxes.length; i++) {
    if (x === boxes[i].x & y+1 === boxes[i].y) {
      return true
    }
  }
  for (let i = 0; i < fboxes.length; i++) {
    if (x === fboxes[i].x & y+1 === fboxes[i].y) {
      return true
    }
  }
}

// Checks
function checkDeath() {
  let x = getFirst(player).x
  let y = getFirst(player).y
  // check spike contact
  spikes = getAll(spike)
  for (let i = 0; i < spikes.length; i++) {
    if (x === spikes[i].x & y+1 === spikes[i].y & !dead) {
      gameOver("Game Over!")
    }
  }
  // check out of bounds death
  if (y === height() - 1) {
    clearTile(x,y)
    gameOver("Bro fell off")
  }
}
function checkFlag() {
  if (flagLevels.includes(level)) { // skip check if the level isn't a flag level
    x = getFirst(player).x
    y = getFirst(player).y
    let tip = getFirst(flagtip)
    let poles = getAll(flagpole)
    let base = getFirst(flagbase)
    // check base
    if (x === base.x & y === base.y) {
      levelWin(0)
      return
    }
    // check all pole tiles
    for (let i = 0; i < poles.length; i++) {
      if (x === poles[i].x & y === poles[i].y) {
        levelWin(1)
        return
      }
    }
    // check tip
    if (x === tip.x & y === tip.y) {
      levelWin(2)
      return
    }
  }
}
function checkEdge() {
  x = getFirst(player).x
  if (x+1 === width() & !flagLevels.includes(level)) { // right edge, check that it isn't a flag level
    edge = "r"
  }
  else if (x === 0  & !flagLevels.includes(level-1) & level > 1 ) { // left edge, check that previous screen wasn't a flag screen and that it isn't the first screen
    edge = "l"
  }
  else {
    edge = ""
  }
}

setInterval(() => { // physics
  if (!dead) {
    update()
  }
}, 100)
setInterval(() => { // music
  playBGM()
}, 4*tuneLen)

setPushables({
  [ player ]: [ box ]
})

// x axis
onInput("a", () => {
  mx = -1
  if (edge === "l") { // scroll if already on edge
    screenScrollBack()
  }
})
onInput("d", () => {
  mx = 1
  if (edge === "r") { // scroll if already on edge
    screenScroll()
  }
})
// jump
onInput("j", () => {
  if (isOnGround()) {
    my = -2
  }
  if (level === 0) {
    screenScroll()
    clearText()
  }
  if (level === 12) {
    dead = false
  }
})

// music toggle
onInput("i", () => {
  playMusic = !playMusic
})
// reset level
onInput("k", () => {
  gameOver("Reset")
})


afterInput(() => {
  if (dead) { // cancel inputs in dead state
    mx = 0
    my = 0
    deadInputs += 1 // fun!
    if (deadInputs > 10) {
      addText("stop it!", {y:4}) // tell player to shut up if they start mashing buttons in frustration
    }
  }
})