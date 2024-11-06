/*
@title: go_home
@author: Arthur Beck
@tags: ['puzzle']
@addedOn: 2024-01-25
*/

const player = "p"
const wall = "#"
const black = "b"
const box = "1"
const activator = "2"
const target = "@"
const fakeTarget = "w"
const open = "$"
const nonoTarget = "!"
const mirror = "%"
const blackWall = ")"
const playerShrink1 = "q"
const playerShrink2 = "a"
const playerShrink3 = "e"
const playerShrink4 = "r"
const playerShrink5 = "t"

setLegend(
  [ player, bitmap`
.....CC44CC.....
....CC4444CC....
....CC0440CC....
....C444444C....
......4444......
....2FF44FF2....
....3FF33FF3....
....25522552....
....35533553....
....25522552....
....55555555....
....55555555....
.....555555.....
.....L....L.....
....LL....LL....
....LL....LL....` ],
  [ wall, bitmap`
LLL1L1L11L1L1LLL
LL1L1L1LL1L1L1LL
L1L1L1L11L1L1L1L
1L1L1L1LL1L1L1L1
L1L1L1L11L1L1L1L
1L1L1L1LL1L1L1L1
L1L1L1L11L1L1L1L
1L1L1L1LL1L1L1L1
L1L1L1L11L1L1L1L
1L1L1L1LL1L1L1L1
L1L1L1L11L1L1L1L
1L1L1L1LL1L1L1L1
L1L1L1L11L1L1L1L
1L1L1L1LL1L1L1L1
L1L1L1L11L1L1L1L
LL1L1L1LL1L1L1LL` ],
  [ black, bitmap`
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
0000000000000000` ],
  [ box, bitmap`
CCCCCCCCCCCCCCCC
C77777777777777C
C7FFFFFFFFFFFF7C
C7FFFFFFFFFFFF7C
C7FFFFFFFFFFFF7C
C7FFFFFFFFFFFF7C
C7FFFFFFFFFFFF7C
C7FFFFFFFFFFFF7C
C7FFFFFFFFFFFF7C
C7FFFFFFFFFFFF7C
C7FFFFFFFFFFFF7C
C7FFFFFFFFFFFF7C
C7FFFFFFFFFFFF7C
C7FFFFFFFFFFFF7C
C77777777777777C
CCCCCCCCCCCCCCCC` ],
  [ target, bitmap`
3333333333333333
3222222222222223
3233333333333323
3232222222222323
3232333333332323
3232322222232323
3232322222232323
3232322222232323
3232322222232323
3232322222232323
3232322222232323
3232333333332323
3232222222222323
3233333333333323
3222222222222223
3333333333333333` ],
  [ fakeTarget, bitmap`
3333333333333333
3222222222222223
3233333333333323
3232222222222323
3232333333332323
3232322222232323
3232322222232323
3232322222232323
3232322222232323
3232322222232323
3232322222232323
3232333333332323
3232222222222323
3233333333333323
3222222222222223
3333333333333333` ],
  [ nonoTarget, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1L1111111111L1L
L1L1LLLLLLLL1L1L
L1L1L111111L1L1L
L1L1L111111L1L1L
L1L1L111111L1L1L
L1L1L111111L1L1L
L1L1L111111L1L1L
L1L1L111111L1L1L
L1L1LLLLLLLL1L1L
L1L1111111111L1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL` ],
  [ open, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L111111111111L0
0L100000000001L0
0L100000000001L0
0L100000000001L0
0L100000000001L0
0L100000000001L0
0L100000000001L0
0L100000000001L0
0L100000000001L0
0L100000000001L0
0L100000000001L0
0L111111111111L0
0LLLLLLLLLLLLLL0
0000000000000000` ],
  [ activator, bitmap`
................
................
................
.......33.......
.......33.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
....LLLLLLLL....
....LLLLLLLL....
................
................
................
................` ],
  [ mirror, bitmap`
7777777777777777
7222222222222227
7222222222272227
7222222222227227
7222222222222727
7222222222222227
7222222222222227
7222222222222227
7222222222222227
7222222222222227
7222222222222227
7272222222222227
7227222222222227
7222722222222227
7222222222222227
7777777777777777` ],
  [ blackWall, bitmap`
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
0000000000000000` ],
  [ playerShrink1, bitmap`
................
................
................
.......CC.......
......C44C......
......C44C......
.......44.......
.......44.......
......3FF3......
......3553......
......3553......
......5555......
......L..L......
......L..L......
................
................` ],
  [ playerShrink2, bitmap`
................
................
................
................
........C.......
.......C4C......
........4.......
.......3F3......
.......353......
.......353......
.......555......
.......L.L......
................
................
................
................` ],
  [ playerShrink3, bitmap`
................
................
................
................
................
.......CCC......
.......CFC......
........3.......
.......D3D......
.......D5D......
........L.......
................
................
................
................
................` ],
  [ playerShrink4, bitmap`
................
................
................
................
................
................
........C.......
........4.......
........3.......
........5.......
................
................
................
................
................
................` ],
  [ playerShrink5, bitmap`
................
................
................
................
................
................
................
........4.......
........5.......
................
................
................
................
................
................
................` ]
)
let playerShrinkStage = -1

setSolids([player, wall, box, open, mirror, blackWall])

let level = -1
let inCutscene = false;
const cutsceneLevel = map`
bbbbb
bbbbb
bbbbb
bbbbb`
const levels = [
  map`
########
#...@..#
#......$
#...1..#
#...p..#
########`,
  map`
########
#...@..#
#......$
#@1.1..#
#...p..#
########`,
  map`
########
#2..@2.#
#......$
#!1.1..#
#...p..#
########`,
  map`
########
#......#
#..%...$
#@1.1..#
#...p..#
########`,
  map`
########
#!..2..#
#1#.!12$
#.1..%.#
#2..p..#
########`,
  map`
########
#!1!.2.#
#.%.1..$
#2.....#
#!.1p..#
########`,
  map`
))))))))
)......)
)......)
)....p.)
)......)
))))))))`,
]
const cutsceneMaps = [0,1,2,3,4,6];
const cutsceneText = {
  0: "I just woke up     \n here...I need to  \n escape and get    \n back to my        \n mothership!",//   \n                   \n
  1: "Hmm, okay.         \nI guess that I need\n to get the box on \n the target before \n I can leave.",//  \n                   \n
  2: "How am I supposed  \n to do this?       \nWait... what are   \n those levers?",// \n                   \n                   \n
  3: "What is this piece \n of glass and what \n does it do?",//   \n                   \n                   \n                   \n
  4: "Uh-oh, I think     \n it's grind time   \n with a bunch of   \n more challenging  \n levels.",//       \n                   \n
  6: "Hmm, that one was- \n - - - ERROR - - - \n THERE IS SOMEONE  \n IN THE SYSTEM     \nWAIT. I KNOW YOU.  \n I HAVE SOMETHING  \n SPECIAL FOR YOU."
};
const restartText =
     "Do you really want \nto restart? Press  \nthe button again to\nconfirm.";
const endText =
     "Are you enjoying   \nthis? Are you      \nenjoying playing   \nthis boy and tortu-\nring him? You are a\ngood person. HElP  \n mE. ITITI'S NooTT\nyOU R FAuLt HhEhHE\niss mnmAkiAING\nGMMEME SAy tHESE\nTHinGS. PllLpeaese\nhElELp.";

const mainMusic = tune`
500: A4^500 + F5-500 + F4~500,
500: B4^500 + D4~500 + G5-500,
500: C5^500 + E4~500 + F5-500,
500: B4^500 + C4~500 + G5-500,
500: A4^500 + E4~500 + A5-500,
500: D5^500 + F5-500 + D4~500,
500: A4^500 + G5-500 + D4~500,
500: B4^500 + E4~500 + F5~500,
500: B4^500 + C4~500 + A5~500,
500: B4/500,
500: C5/500 + D4~500,
500: D5/500 + C4~500,
500: B4/500 + G4/500 + E4~500,
500: C5/500 + F5/500,
500: F4~500,
500: G4/500 + D4~500 + C5/500,
500: B4/500 + A5-500,
500: A4^500 + E4~500 + G5-500,
500: B4^500 + D4~500 + G5-500,
500: C5^500 + A5-500,
500: B4^500 + D4~500 + F5-500,
500: C5^500 + F4~500 + G5-500,
500: A4^500 + G5-500,
500: D4~500 + C5^500 + F5-500,
500: E4~500 + B4^500,
500: A4^500 + E5-500,
500: E4~500 + D5^500 + G5-500,
500: C5^500 + E5-500,
500: F4~500 + E5-500,
500: C5^500,
500: D4~500 + B4^500 + G5-500,
500: F4~500 + A4^500 + F5-500`
var musicPlayer = playTune(mainMusic, Infinity)
const falseMusic = tune`
265.4867256637168: E4^265.4867256637168,
265.4867256637168: B4/265.4867256637168 + D5~265.4867256637168 + F4^265.4867256637168,
265.4867256637168: B4-265.4867256637168 + G4^265.4867256637168,
265.4867256637168: F4^265.4867256637168,
265.4867256637168: D5~265.4867256637168 + G4^265.4867256637168,
265.4867256637168: F4^265.4867256637168,
265.4867256637168: E4^265.4867256637168,
265.4867256637168: B4-265.4867256637168 + D5~265.4867256637168 + F4^265.4867256637168,
265.4867256637168: G4^265.4867256637168,
265.4867256637168: E4^265.4867256637168,
265.4867256637168: D5~265.4867256637168 + G4^265.4867256637168,
265.4867256637168: B4/265.4867256637168 + F4^265.4867256637168,
265.4867256637168: B4-265.4867256637168 + E4^265.4867256637168,
265.4867256637168: D5~265.4867256637168 + G4^265.4867256637168,
265.4867256637168: B4^265.4867256637168 + F4^265.4867256637168,
265.4867256637168: B4/265.4867256637168 + G4^265.4867256637168,
265.4867256637168: D5~265.4867256637168 + E4^265.4867256637168,
265.4867256637168: F4^265.4867256637168,
265.4867256637168: G4^265.4867256637168,
265.4867256637168: B4-265.4867256637168 + D5~265.4867256637168 + E4^265.4867256637168,
265.4867256637168: F4^265.4867256637168,
265.4867256637168: G4^265.4867256637168,
265.4867256637168: D5~265.4867256637168 + G4^265.4867256637168,
265.4867256637168: B4/265.4867256637168 + E4^265.4867256637168,
265.4867256637168: B4-265.4867256637168,
265.4867256637168: D5~265.4867256637168 + E4^265.4867256637168,
265.4867256637168: F4^265.4867256637168,
265.4867256637168: F4^265.4867256637168,
265.4867256637168: B4/265.4867256637168 + D5~265.4867256637168 + G4^265.4867256637168,
265.4867256637168: B4-265.4867256637168 + E4^265.4867256637168,
265.4867256637168: E4^265.4867256637168,
265.4867256637168: D5~265.4867256637168 + G4^265.4867256637168`
const bomp = tune`
500: B5-500 + A5-500 + G5-500 + F5-500 + E5-500,
15500`
var musicEnabled = true

function nextMap() {
  if (!musicEnabled) {
    musicPlayer.end()
  }
  level++
  if (level == 6) {
    setBackground(black)
    musicPlayer.end()
    if (musicEnabled) {
      musicPlayer = playTune(falseMusic, Infinity)
    }
  }
  clearText()
  if (cutsceneMaps.includes(level)) {
    inCutscene = true;
    setMap(cutsceneLevel)
    addText(cutsceneText[level], {
      x: 1,
      y: 5
    })
    addText("(press any button)", {
      x: 1,
      y: 14
    })
  } else {
    inCutscene = false
    setMap(levels[level])
  }
}
nextMap()

setPushables({
  [ player ]: [ box, mirror ]
})

function finalEnd() {
  clearText()
  setMap(cutsceneLevel)
  addText("I'm sorry.", {
    x: 7,
    y: 5,
    color: color`F`
  })
  setTimeout(()=>{
    clearText()
    addText("(connection lost)", {
      x: 1,
      y: 1,
      color: color`7`
    })
    setTimeout(()=>{
      clearText()
      addText(" Thank you\nfor playing.", {
        x: 5,
        y: 7,
        color: color`H`
      })
    },5000)
  },5000)
}

const beforeInput = function () {
  if (inCutscene) {
    inCutscene = false
    clearText()
    setMap(levels[level])
    return false
  }
  if (!getFirst(player)) {
    return false
  }
  return true
}

const getPlayerTile = function () {
  if (!getFirst(player)) 
    return [{
      x: 5,
      y: 5,
      type: player,
      remove: ()=>{}
    }]
  return getTile(getFirst(player).x, getFirst(player).y);
}

onInput("w", () => {
  wantToRestart = false
  clearText()
  if (!beforeInput()) {
    return
  }
  getFirst(player).y -= 1
})
onInput("a", () => {
  wantToRestart = false
  clearText()
  if (!beforeInput()) {
    return
  }
  getFirst(player).x -= 1
})
onInput("s", () => {
  wantToRestart = false
  clearText()
  if (!beforeInput()) {
    return
  }
  getFirst(player).y += 1
})
onInput("d", () => {
  wantToRestart = false
  clearText()
  if (!beforeInput()) {
    return
  }
  getFirst(player).x += 1
})

let wantToRestart = false
onInput("i", () => {
  if (!beforeInput()) {
    return
  }
  if (!wantToRestart) {
    wantToRestart = true
    clearText();
    addText(restartText, {
      x: 1,
      y: 5,
      color: color`9`
    })
  } else {
    wantToRestart = false
    clearText()
    level = level-1
    nextMap()
  }
})

onInput("j", () => {
  if (!beforeInput()) {
    return
  }
  wantToRestart = false
  clearText()
  if (musicEnabled) {
    musicEnabled = false
    addText("Music disabled", {
      x: 4,
      y: 5,
      color: color`9`
    })
  } else {
    musicEnabled = true
    addText("Music enabled", {
      x: 4,
      y: 5,
      color: color`9`
    })
  }
  if (!musicEnabled) {
    musicPlayer.end()
  }
  if (level == 6) {
    if (musicEnabled) {
      musicPlayer = playTune(falseMusic, Infinity)
    }
  } else {
    if (musicEnabled) {
      musicPlayer = playTune(mainMusic, Infinity)
    }
  }
})
onInput("k", () => {
  if (!beforeInput()) {
    return
  }
  wantToRestart = false
  clearText()
})
onInput("l", () => {
  if (!beforeInput()) {
    return
  }
  wantToRestart = false
  clearText()
})

let endCounter = 0;
let playerShrinkStatus = 0;
let startedEnd = false;
afterInput(() => {
  if (level == 6 && endCounter < 10) {
    endCounter++
  }
  if (endCounter >= 8 && !startedEnd) {
    startedEnd = true;
    clearText();
    addText(endText, {
      x: 1,
      y: 3,
      color: color`1`
    })
    musicPlayer.end()
    if (musicEnabled) {
      playTune(bomp)
    }
    function shrink(interval) {
      return ()=>{
        playerShrinkStatus++
        switch (playerShrinkStatus) {
          case 1:
            getFirst(player).type = playerShrink1
            break
          case 2:
            getFirst(playerShrink1).type = playerShrink2
            clearText()
            break
          case 3:
            getFirst(playerShrink2).type = playerShrink3
            break
          case 4:
            getFirst(playerShrink3).type = playerShrink4
            addText("Please.", {
              x: 1,
              y: 5,
              color: color`1`
            })
            break
          case 5:
            getFirst(playerShrink4).type = playerShrink5
            clearText()
            addText("Help me.", {
              x: 1,
              y: 5,
              color: color`1`
            })
            setTimeout(finalEnd, interval+562)
            break
          default:
            return
        }
        setTimeout(shrink(interval+562), interval+562)
      }
    }
    setTimeout(shrink(5000), 5000)
  }
  if (!getFirst(player)) return
  let boxes = getAll(box)
  let valid = tilesWith(target, box).length;
  if (valid == boxes.length) {
      let opens = getAll(open)
      for (let i = 0; i<opens.length; i++) {
        opens[i].remove()
    }
  }
  if (
      getFirst(player).x <= 0 ||
      getFirst(player).x >= 7 ||
      getFirst(player).y <= 0 ||
      getFirst(player).y >= 5
  ) {
    nextMap()
  }
  if (tilesWith(player, activator).length>0) {
    getAll(nonoTarget).forEach((item) => {
      if (item.x == getFirst(player).x || item.y == getFirst(player).y) {
        item.type = fakeTarget
      }
    })
    getAll(target).forEach((item) => {
      if (item.x == getFirst(player).x || item.y == getFirst(player).y) {
        item.type = nonoTarget;
      }
    })
    getAll(fakeTarget).forEach((item) => {
      item.type = target
    })
  }
  getAll(mirror).forEach((item) => {
    let continues = false
    let goUp = true
    getTile(item.x, item.y+1).forEach((item2) => {
      if (item2.type == target && !continues)
        continues = true
    })
    getTile(item.x, item.y-1).forEach((item2) => {
      if (item2.type == target && !continues) {
        continues = true
        goUp = false
      }
      if (item2.type == target && continues && goUp)
        continues = false
    })
    if (continues) {
      addSprite(item.x, item.y+(goUp ? -1 : 1), target)
    }
  })
  getAll(mirror).forEach((item) => {
    let continues = false
    let goUp = true
    getTile(item.x, item.y+1).forEach((item2) => {
      if (item2.type == nonoTarget && !continues)
        continues = true
    })
    getTile(item.x, item.y-1).forEach((item2) => {
      if (item2.type == nonoTarget && !continues) {
        continues = true
        goUp = false
      }
      if (item2.type == nonoTarget && continues && goUp)
        continues = false
    })
    if (continues) {
      addSprite(item.x, item.y+(goUp ? -1 : 1), nonoTarget)
    }
  })
})
