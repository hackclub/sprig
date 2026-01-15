/*
@title: pete 
@author: katopirat
*/

const PETE = "p" 
const WALL = "w"
const FLAG = "g" 
const ROCK = "r" 
const WATER = "a" 
const BUSH = "h"
const SKULL = "k"
const LAVA = "v" 

const T_PETE = "b" 
const T_IS = "i"
const T_YOU = "y"
const T_WALL = "l"
const T_STOP = "s"
const T_PUSH = "u"
const T_FLAG = "1" 
const T_WIN = "2"
const T_ROCK = "3"  
const T_WATER = "4" 
const T_SINK = "5"
const T_BUSH = "6"
const T_SKULL = "7"
const T_KILL = "8"
const T_LAVA = "9"
const T_HOT = "0"
const T_MELT = "m"

const floor = "f" 

const textToNoun = {
  [T_PETE]: PETE,
  [T_WALL]: WALL,
  [T_FLAG]: FLAG,
  [T_ROCK]: ROCK,
  [T_WATER]: WATER,
  [T_BUSH]: BUSH,
  [T_SKULL]: SKULL,
  [T_LAVA]: LAVA
}

setLegend(
  [floor, bitmap`
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

  [PETE, bitmap`
................
......2222......
....22222222....
...22..22..22...
...2222222222...
...222.22.222...
...222.22.222...
...2222222222...
...2222222222...
....22222222....
....22222222....
..22.222222.22..
..222222222222..
....22222222....
....222..222....
................`],

  [WALL, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL1111LL111111LL
LL1111LL111111LL
LLLLLLLLLLLLLLLL
LL111111LL1111LL
LL111111LL1111LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL1111LL111111LL
LL1111LL111111LL
LLLLLLLLLLLLLLLL
LL111111LL1111LL
LL111111LL1111LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],

  [FLAG, bitmap`
................
..666666666.....
..666666666.....
..6666666666666.
..6666666666666.
..6666666666666.
..66....6666666.
..66....6666666.
..66............
..66............
..66............
..66............
..66............
..66............
..66............
................`],

  [ROCK, bitmap`
................
....CCCCCCCC....
....CCCCCCCC....
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCLCCCLCCCCCLCC
CCLCLCCCLCCCLCLC
LCCLLCCLCCCLCLCC
LLLLLLLLCCLLLLLL
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
................`],

  [WATER, bitmap`
.7.7.7.7.7.7.7.7
7.7.7.7.7.7.7.7.
.7.7.7.7.7.7.7.7
7.7.7.7.7.7.7.7.
.7.7.7.7.7.7.7.7
7.7.7.7.7.7.7.7.
.7.7.7.7.7.7.7.7
7.7.7.7.7.7.7.7.
.7.7.7.7.7.7.7.7
7.7.7.7.7.7.7.7.
.7.7.7.7.7.7.7.7
7.7.7.7.7.7.7.7.
.7.7.7.7.7.7.7.7
7.7.7.7.7.7.7.7.
.7.7.7.7.7.7.7.7
7.7.7.7.7.7.7.7.`],

  [BUSH, bitmap`
DDDD4444..DD4444
DDDD4444..DD4444
..44DD..4444DD44
..44DD..4444DD44
DD44DDDDDD44....
DD44DDDDDD44....
..DD....44..44DD
..DD....44..44DD
DD4444DD44..44..
DD4444DD44..44..
DD..44DD4444DD44
DD..44DD4444DD44
DDDD..4444..DDDD
DDDD..4444..DDDD
....DDDDDD44..DD
....DDDDDD44..DD`],

  [SKULL, bitmap`
...3333333333...
...3333333333...
.33333333333333.
.33333333333333.
.33....33....33.
.33....33....33.
.3333..33..3333.
.3333..33..3333.
.33333333333333.
.33333333333333.
.33333333333333.
...3333333333...
...3333333333...
...3333333333...
...33..33..33...
...33..33..33...`],

  [LAVA, bitmap`
999999999999.999
.999999999999999
9999999999999999
..9999999999999.
..99999999999999
9999999999999999
9999999999999999
.999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
.999999999999999
.999999999999999
999.999999999999
999.9.99.999..99`],

  [T_PETE, bitmap`
8888......888888
8888......888888
88..88....888...
88..88....888888
8888......888...
8888......888888
88........888888
88..............
................
888888....888888
888888....888888
..88......888...
..88......888888
..88......888...
..88......888888
..88......888888`], 

  [T_IS, bitmap`
................
.222222...22222.
.222222...22222.
...22...22......
...22...22......
...22...22......
...22...22......
...22...2222222.
...22...2222222.
...22........22.
...22........22.
...22........22.
...22........22.
.222222.22222...
.222222.22222...
................`], 

  [T_YOU, bitmap`
..888888888888..
..888888888888..
888888.88.888888
888888.88.888888
8888888..8888888
8888888..8888888
8888888..8888888
8888888888888888
8888888888888888
888....88.88.888
888.88.88.88.888
888.88.88.88.888
888....888...888
8888888888888888
..888888888888..
..888888888888..`], 

  [T_WALL, bitmap`
LL....LL....LL..
LL....LL....LL..
LL.LL.LL..LL..LL
LL.LL.LL..LL..LL
LL.LL.LL..LLLLLL
LLLLLLLL..LL..LL
LLLLLLLL..LL..LL
................
................
LL.......LL.....
LL.......LL.....
LL.......LL.....
LL.......LL.....
LL.......LL.....
LLLLLLL..LLLLLLL
LLLLLLL..LLLLLLL`],

  [T_STOP, bitmap`
..DDDDDDDDDDDD..
..DDDDDDDDDDDD..
DDDDD...DD...DDD
DDDDD.DDDDD.DDDD
DDDDD.DDDDD.DDDD
DDDDD.DDDDD.DDDD
DDD...DDDDD.DDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDD....DD....DDD
DDD.DD.DD.DD.DDD
DDD.DD.DD....DDD
DDD....DD.DDDDDD
DDDDDDDDDDDDDDDD
..DDDDDDDDDDDD..
..DDDDDDDDDDDD..`], 

  [T_PUSH, bitmap`
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
CCC....CC.CC.CCC
CCC.CC.CC.CC.CCC
CCC....CC.CC.CCC
CCC.CCCCC.CC.CCC
CCC.CCCCCC...CCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCC...CC.CC.CCC
CCCC.CCCC.CC.CCC
CCCC.CCCC....CCC
CCCC.CCCC.CC.CCC
CC...CCCC.CC.CCC
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..`],

  [T_FLAG, bitmap`
666666...66.....
666666...66.....
66.......66.....
666666...66.....
666666...66.....
66.......666666.
66.......666666.
................
................
..66.....666666.
..66.....666666.
66..66...66.....
66..66...66.666.
666666...66..66.
66..66...666666.
66..66...666666.`], 

  [T_WIN, bitmap`
..666666666666..
..666666666666..
66666.6666.66666
66666.6666.66666
66666.6..6.66666
66666.6..6.66666
66666......66666
6666666666666666
6666666666666666
66.....66...6666
6666.6666.66.666
6666.6666.66.666
66.....66.66.666
6666666666666666
..666666666666..
..666666666666..`],

  [T_ROCK, bitmap`
CCCC.......CCC..
CCCC.......CCC..
CC..CC...CC...CC
CC..CC...CC...CC
CCCC.....CC...CC
CCCC.....CC...CC
CC..CC.....CCC..
CC..CC.....CCC..
................
................
..CCCC...CC..CC.
..CCCC...CC..CC.
CC.......CCCC...
CC.......CCCC...
..CCCC...CC..CC.
..CCCC...CC..CC.`],

  [T_WATER, bitmap`
77....77....77..
77....77....77..
77.77.77..77..77
77.77.77..77..77
77.77.77..777777
77777777..77..77
77777777..77..77
................
.777777..7777...
.777777..7777...
...77....77..77.
...77....77..77.
...77....7777...
...77....7777...
...77....77..77.
...77....77..77.`],

  [T_SINK, bitmap`
..777777777777..
..777777777777..
77777...77...777
77777.77777.7777
77777.77777.7777
77777.77777.7777
777...7777...777
7777777777777777
7777777777777777
777...7777.7.777
777.77.777..7777
777.77.777..7777
777.77.777.7.777
7777777777777777
..777777777777..
..777777777777..`],

  [T_BUSH, bitmap`
44.......44...44
44.......44...44
44.......44...44
444444...44...44
444444...44...44
444444...44...44
444444.....44444
444444.....44444
................
..4444...44...44
..4444...44...44
..44.....4444444
..44.....4444444
..44.....44...44
4444.....44...44
4444.....44...44`],

  [T_SKULL, bitmap`
..3333...33..33.
..3333...33..33.
..33.....3333...
..33.....3333...
..33.....33..33.
3333.....33..33.
3333.....33..33.
................
................
33....33.33.....
33....33.33.....
33....33.33.....
33....33.33.....
33....33.33.....
..333333.3333333
..333333.3333333`],

  [T_KILL, bitmap`
..333333333333..
..333333333333..
333.33.33....333
333.3.3333..3333
333..33333..3333
333.3.3333..3333
333.33.33....333
3333333333333333
3333333333333333
333.33333.333333
333.33333.333333
333.33333.333333
333....33....333
3333333333333333
..333333333333..
..333333333333..`],

  [T_LAVA, bitmap`
99.........99...
99.........99...
99.......99..99.
99.......99..99.
99.......999999.
999999...99..99.
999999...99..99.
................
................
99..99.....99...
99..99.....99...
99..99...99..99.
99..99...99..99.
99..99...999999.
..99.....99..99.
..99.....99..99.`], 

  [T_HOT, bitmap`
..999999999999..
..999999999999..
999999.99.999999
999999....999999
999999.99.999999
999999.99.999999
9999999999999999
9999999999999999
9999999999999999
999....999...999
999.99.9999.9999
999.99.9999.9999
999....9999.9999
9999999999999999
..999999999999..
..999999999999..`],

  [T_MELT, bitmap`
..999999999999..
..999999999999..
999.999.9...9999
999..9..9.999999
999.9.9.9...9999
999.999.9.999999
999.999.9...9999
9999999999999999
9999999999999999
9999999999999999
999.99999...9999
999.999999.99999
999.999999.99999
999....999.99999
..999999999999..
..999999999999..`]
)



const levels = [
  map`
................
................
................
.biy....lis.....
................
wwwwwwwwwwwww...
.......r........
.......r..g.....
..p....r........
.......r........
wwwwwwwwwwwww...
................
.1i2....3iu.....
................
................
................`,
  map`
................
.....wwwwwwww...
.....w......w...
.....w..i...w...
.....w......w...
.wwwww......w...
.w........2.w...
.w.1...g....w...
.w..........w...
.wwwwwwwwwwww...
.....w......w...
.....w.l....w...
...b.w.i..p.w...
...i.w.s....w...
...y.w......w...
.....wwwwwwww...`,
  map`
................
.....gggggggg...
.....g......g...
.....g..i...g...
.....g......g...
.ggggg......g...
.g........2.g...
.g.b...g....g...
.g..........g...
.gggggggggggg...
.....g......g...
.....g.1....g...
...l.g.i..w.g...
...i.g.s....g...
...y.g......g...
.....gggggggg...`,
  map`
lbh.............
iihwwwwwwwwww...
syhw....hhhhw...
hhhw..r...hhw...
.h.w.......hw...
..4w..p.....w...
..iw......r.w...
..5w........w...
.wwwaaawwwwwwww.
.w......w...hhw.
.w......w.3iuhw.
.waaa.w.......w.
hwaaa...w.1i2hw.
hwgaa...w...hhw.
hwwwwwwwwwwwwww.
hh..............`,
  map`
1i2.....kkkkkkk.
biy.....k.....k.
........k.7...k.
........k.i...k.
........k.8.g.k.
........k.....k.
...krk..kkkkkkk.
...krk..........
.kkkrkkk........
.k.....k........
.k.....k..3iu...
.k..p..k........
.k.....k........
.kkkkkkk........
................
................`,
  map`
......wl..3...vv
.p....wi......vv
.....wws.....vvv
..biy.w.....vvvv
.w...ww....vvv..
ww....r....vvv..
w3wwwwww..vvvv..
.i........vvv...
.u..9....vvv....
.........vvv....
.........vvv....
.........vvvv.g.
........vvvvv...
bimw....vvvvv1i2
wwww...vvvvvv...
9i0w...vvvvvv...`,
  map`
........i8...iu.
wwwwwww7wwww7www
w....v.3i5w....w
w.p..v....h....w
w....v....h....w
w3ww.v....h....w
wbiywwwwwwwwwwww
w.ww.a....k....w
w.r..a....k..g.w
w....a....k....w
w.6wwa6ww.k.1i2w
ww9i0w.iywwwwwww
ww.wwhwww.......
wbimwhw..lis....
wwwwwhw.........
hhhhhhw.........`,
  map`
................
................
.....hhhhhhhhh..
....hh..aa...h..
....hr..aa.1.h..
.hhhh...aa.i.h..
.hh.p...aa.2.h..
.hh..r..aa...h..
.hh.....aa.g.h..
.hh.3iu.aa...h..
.hh.....hhhhhh..
.hbiy...hwwwww..
.hhh....hw4i5w..
...h...hhw6isw..
...hhhhhhwwwww..
................`,
  map`
................
................
....biy.........
....1i2.........
................
..p.............
................
................
................
................
..........g.....
................
................
................
................
................`,
]

let gameState = "MENU"
let menuOption = 0 
let selectedStartLevel = 0
let currentLevelIndex = 0
let isGameOver = false

const menuMap = map`
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
................`

function drawMenu() {
  clearText()
  setMap(menuMap)
  setBackground(floor) 
  
  addText("PETE IS YOU", {x: 4, y: 2, color: color`3`})
  
  const colorPlay = (menuOption === 0) ? color`5` : color`7`
  const textPlay = (menuOption === 0) ? "> PLAY" : "  PLAY"
  addText(textPlay, {x: 5, y: 5, color: colorPlay})
 
  const colorLvl = (menuOption === 1) ? color`5` : color`7`
  const textLvl = (menuOption === 1) ? `> LEVEL: ${selectedStartLevel + 1}` : `  LEVEL: ${selectedStartLevel + 1}`
  addText(textLvl, {x: 5, y: 7, color: colorLvl})
 
  const colorHelp = (menuOption === 2) ? color`5` : color`7`
  const textHelp = (menuOption === 2) ? "> HELP" : "  HELP"
  addText(textHelp, {x: 5, y: 9, color: colorHelp})
  
  if (menuOption === 2) {
    addText("WASD = MOVE", {x: 3, y: 12, color: color`6`})
    addText("2x L = MENU", {x: 3, y: 13, color: color`6`})
    addText("2x I = RESTART", {x: 3, y: 14, color: color`6`})
  }
}


drawMenu()




let currentYou = []
let currentStop = []
let currentPush = []
let currentWin = [] 
let currentSink = []
let currentKill = [] 
let currentHot = [] 
let currentMelt = [] 
let currentTransform = {} 

const allText = [
  T_PETE, T_IS, T_YOU, T_WALL, T_STOP, T_PUSH, 
  T_FLAG, T_WIN, T_ROCK, T_WATER, T_SINK, 
  T_BUSH, T_SKULL, T_KILL, T_LAVA, T_HOT, T_MELT
]
const allObjects = [PETE, WALL, FLAG, ROCK, WATER, BUSH, SKULL, LAVA]

function checkRules() {
  if (gameState !== "GAME") return

  currentYou = []
  currentStop = []
  currentPush = []
  currentWin = [] 
  currentSink = [] 
  currentKill = [] 
  currentHot = []
  currentMelt = []
  currentTransform = {} 
  
  const isList = getAll(T_IS)
  
  isList.forEach(is => {
    const x = is.x; const y = is.y
    const subjects = {
      [PETE]: checkPos(T_PETE, x, y),
      [WALL]: checkPos(T_WALL, x, y),
      [FLAG]: checkPos(T_FLAG, x, y),
      [ROCK]: checkPos(T_ROCK, x, y),
      [WATER]: checkPos(T_WATER, x, y),
      [BUSH]: checkPos(T_BUSH, x, y), 
      [SKULL]: checkPos(T_SKULL, x, y),
      [LAVA]: checkPos(T_LAVA, x, y)
    }
    const props = {
      YOU: checkPos(T_YOU, x, y),
      STOP: checkPos(T_STOP, x, y),
      PUSH: checkPos(T_PUSH, x, y),
      WIN: checkPos(T_WIN, x, y),
      SINK: checkPos(T_SINK, x, y),
      KILL: checkPos(T_KILL, x, y),
      HOT: checkPos(T_HOT, x, y),
      MELT: checkPos(T_MELT, x, y)
    }

    for (const [subjType, pos] of Object.entries(subjects)) {
      for (const [textType, targetObj] of Object.entries(textToNoun)) {
        const isHere = checkPos(textType, x, y)
        if (pos.left && isHere.right) currentTransform[subjType] = targetObj
        if (pos.up && isHere.down) currentTransform[subjType] = targetObj
      }
    }

    for (const [objType, pos] of Object.entries(subjects)) {
      if (pos.left) applyRule(objType, props, "right")
      if (pos.up) applyRule(objType, props, "down")
    }
  })

  applyTransformations()
  updatePhysics()
  checkLoseImmediate()
}

function checkPos(type, isX, isY) {
  return {
    left: getAll(type).some(o => o.x === isX-1 && o.y === isY),
    right: getAll(type).some(o => o.x === isX+1 && o.y === isY),
    up: getAll(type).some(o => o.x === isX && o.y === isY-1),
    down: getAll(type).some(o => o.x === isX && o.y === isY+1)
  }
}

function applyRule(subject, props, dir) {
  if (props.YOU[dir]) currentYou.push(subject)
  if (props.STOP[dir]) currentStop.push(subject)
  if (props.PUSH[dir]) currentPush.push(subject)
  if (props.WIN[dir]) currentWin.push(subject)
  if (props.SINK[dir]) currentSink.push(subject)
  if (props.KILL[dir]) currentKill.push(subject)
  if (props.HOT[dir]) currentHot.push(subject)
  if (props.MELT[dir]) currentMelt.push(subject)
}

function applyTransformations() {
  const allObjects = getAll()
  allObjects.forEach(obj => {
    if (currentTransform[obj.type]) obj.type = currentTransform[obj.type]
  })
}

function updatePhysics() {
  const solidObjects = [...currentStop, ...currentPush, ...allText, ...currentYou]
  setSolids(solidObjects)

  const pushableObjects = [...currentPush, ...allText]
  const pushConfig = {}
  
  currentYou.forEach(youType => {
    pushConfig[youType] = pushableObjects
  })
  pushableObjects.forEach(pushType => {
    pushConfig[pushType] = pushableObjects
  })
  
  setPushables(pushConfig)
}


function checkInteractions() {
  if (gameState !== "GAME") return

  currentSink.forEach(sinkType => {
    const sinkObjects = getAll(sinkType)
    sinkObjects.forEach(s => {
      const onTop = getAll().filter(obj => obj.x === s.x && obj.y === s.y && obj !== s)
      if (onTop.length > 0) {
        s.remove()
        onTop[0].remove()
        playTune(tune`150`)
      }
    })
  })

  currentKill.forEach(killType => {
    const deadlyObjects = getAll(killType)
    deadlyObjects.forEach(deadly => {
      const onTop = getAll().filter(obj => obj.x === deadly.x && obj.y === deadly.y && obj !== deadly)
      onTop.forEach(victim => {
        if (currentYou.includes(victim.type)) {
          victim.remove()
          playTune(tune`140`) 
        }
      })
    })
  })

  currentHot.forEach(hotType => {
    const hotObjects = getAll(hotType)
    hotObjects.forEach(hot => {
      const onTop = getAll().filter(obj => obj.x === hot.x && obj.y === hot.y && obj !== hot)
      onTop.forEach(victim => {
        if (currentMelt.includes(victim.type)) {
          victim.remove()
          playTune(tune`130`) 
        }
      })
    })
  })
}


function checkWin() {
  if (gameState !== "GAME" || isGameOver) return

  let playerWon = false;
  currentYou.forEach(youType => {
    const players = getAll(youType)
    players.forEach(p => {
      currentWin.forEach(winType => {
        const wins = getAll(winType)
        wins.forEach(w => {
          if (p.x === w.x && p.y === w.y) playerWon = true
        })
      })
    })
  })

  if (playerWon) {
    currentLevelIndex++ 
    if (currentLevelIndex < levels.length) {
      setMap(levels[currentLevelIndex])
      playTune(tune`
16000`) 
      checkRules() 
    } else {
       
      addText("YOU WIN!", {x: 5, y: 7, color: color`3`})
      playTune(tune`180`)
      isGameOver = true
    }
  }
}

let waitingForRestart = false

function checkLose() {
  if (waitingForRestart) return 

  let totalYou = 0
  currentYou.forEach(type => {
    totalYou += getAll(type).length
  })
  
   
  if (currentYou.length > 0 && totalYou === 0) {
    waitingForRestart = true
    addText("RESTART (I)", {x: 5, y: 7, color: color`2`})  
    playTune(tune`120`)
  }
}

function checkLoseImmediate() {
  if (waitingForRestart) return

  let totalYou = 0
  currentYou.forEach(type => {
    totalYou += getAll(type).length
  })

  if (totalYou === 0) {
    waitingForRestart = true
    addText("RESTART (I)", {x: 5, y: 7, color: color`2`})   
    playTune(tune`120`)
  }
}



let lastLPress = 0
let lastIPress = 0

function startGame() {
  gameState = "GAME"
  isGameOver = false
  currentLevelIndex = selectedStartLevel
  clearText()
  setMap(levels[currentLevelIndex])
  checkRules()
}

function handleInput(key) {
  const now = Date.now()

  //DOUBLE TAP 
  
  // 2x L
  if (key === "l") {
    if (now - lastLPress < 400) {
      gameState = "MENU"
      isGameOver = false
      waitingForRestart = false
      drawMenu()
      return
    }
    lastLPress = now
  }

  // 2x I
  if (key === "i" && gameState === "GAME") {
    if (waitingForRestart || (now - lastIPress < 400)) {
      clearText()
      isGameOver = false
      waitingForRestart = false
      if (currentLevelIndex >= levels.length) currentLevelIndex = 0
      setMap(levels[currentLevelIndex])
      checkRules()
      return
    }
    lastIPress = now
  }

  if (gameState === "MENU") {
    if (key === "w") {
      menuOption--
      if (menuOption < 0) menuOption = 2
      drawMenu()
    }
    if (key === "s") {
      menuOption++
      if (menuOption > 2) menuOption = 0
      drawMenu()
    }
    if (menuOption === 1) { // Level select
      if (key === "a") {
        selectedStartLevel--
        if (selectedStartLevel < 0) selectedStartLevel = 0
        drawMenu()
      }
      if (key === "d") {
        selectedStartLevel++
        if (selectedStartLevel >= levels.length) selectedStartLevel = levels.length - 1
        drawMenu()
      }
    }
    if (key === "k" || key === "j") {
      if (menuOption === 0) startGame()
    }
    return
  }

  if (gameState === "GAME" && !isGameOver && !waitingForRestart) {
    let dx = 0, dy = 0
    if (key === "w") dy = -1
    if (key === "s") dy = 1
    if (key === "a") dx = -1
    if (key === "d") dx = 1
    
    if (dx !== 0 || dy !== 0) {
      moveGame(dx, dy)
    }
  }
}

function tryMove(obj, dx, dy) {
  const targetX = obj.x + dx
  const targetY = obj.y + dy

  if (targetX < 0 || targetX >= 16 || targetY < 0 || targetY >= 16) return false

  const targets = getAll().filter(t => t.x === targetX && t.y === targetY)
  let canProceed = true

  for (let t of targets) {
    if (currentStop.includes(t.type)) {
      canProceed = false; break
    }
    if (currentPush.includes(t.type) || allText.includes(t.type)) {
      const pushed = tryMove(t, dx, dy)
      if (!pushed) { canProceed = false; break }
    } else {
        if (currentYou.includes(t.type) && t !== obj) {
             canProceed = false; break
        }
    }
  }

  if (canProceed) {
    obj.x += dx
    obj.y += dy
    return true
  }
  return false
}

function moveGame(dx, dy) {
  let players = []
  currentYou.forEach(type => players.push(...getAll(type)))
  
  if (dx > 0) players.sort((a, b) => b.x - a.x)
  if (dx < 0) players.sort((a, b) => a.x - b.x)
  if (dy > 0) players.sort((a, b) => b.y - a.y)
  if (dy < 0) players.sort((a, b) => a.y - b.y)
  
  players.forEach(p => tryMove(p, dx, dy))
}

const keys = ["w", "s", "a", "d", "i", "j", "k", "l"]
keys.forEach(k => {
  onInput(k, () => handleInput(k))
})

afterInput(() => {
  if (gameState === "GAME" && !isGameOver) {
    checkRules()
    checkInteractions()
    checkWin()
    checkLose()
  }
})