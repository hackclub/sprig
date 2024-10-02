/*
@title: Froggo's Dunegon Adventures
@author: amuseee (slack
@tags: ['adventure']
@addedOn: 2023-11-06
Keys: 
- w/a/s/d to move, J to interaction/attack, k to restart
objective:
just get to the end, thats hard enough >:)
*/

// mobs
const player = "p"
const playergf = "G"
const heart = "Z"
var playerdata = {
  health: 100,
  maxhealth: 100,
}

// misc
const infobox = "i"

// decoration and level
const bg = "h"
const bg2 = "B"
const bush = "b"
const wall = "w"
const wall2 = "V"
const wall3 = "C"
const tree = "t"
const surfacerock = "s"
const transportedge = "e"
const grass = "g"
const grass2 = "a"
const caventrance = "c"
const torch = "T"
const torch2 = "U"
const tongueright = "W"
const tongueleft = "u"
const tongueup = "l"
const tonguedown = "v"
const enemy = "E"
var enemydata = {
  damage: 4
}
const fly = "x"
var flydata = {
  damage: 2
}
const watermelon = "K"

setLegend(
  [ player, bitmap`
.0000......0000.
0222200000022220
0200204444020020
0222204444022220
.00004444440000.
0999999999999990
0900000000000090
0999999999999990
.00000000000000.
.00444444444400.
0404444444444040
0444040440404440
.04404044040440.
0444040000404440
0000440..0440000
...000....000...` ],
  [ playergf, bitmap`
.0000......0000.
0222200000022220
0200208888020020
0222208888022220
.00008888880000.
0HHHHHHHHHHHHHH0
0H000000000000H0
0HHHHHHHHHHHHHH0
.00000000000000.
.00888888888800.
0808888888888080
0888080880808880
.08808088080880.
0888080000808880
0000880..0880000
...000....000...` ],
  [ heart, bitmap`
................
................
................
......3...3.....
.....3C3.3C3....
....3CCCCCCC3...
...3CCCCCCCCC3..
....3CCCCCCC3...
.....3CCCCC3....
......3CCC3.....
.......3C3......
........3.......
................
................
................
................` ],
  [ infobox, bitmap`
................
................
................
................
.....000000.....
....02200220....
....02022020....
....02220220....
....02202220....
....02222220....
....02202220....
.....000000.....
................
................
................
................` ],
  [ bg, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF` ],
  [ bush, bitmap`
................
................
................
................
...00...........
..04400...000...
.0444440004440..
.04444444443440.
0D4434444444440.
0D44444444444D0.
0DD44444344DDD0.
0DDDD44444DDD00.
.00DDDD4DDDD0...
...0DDDDDD00....
....000000......
................` ],
  [ tree, bitmap`
................
.....00000......
...004444400....
..04444444440...
..04444444440...
.0444444444440..
.0444D444D4440..
.0D4D0DDD0D4D0..
..0D0C0D0C0D0...
..0DD0C0C0DD0...
...00D0C0D00....
.....00C00......
......0C0.......
......0C0.......
......0C0.......
.....0CCC0......` ],
  [ surfacerock, bitmap`
................
................
................
................
......000.......
.....01110......
....0111110.....
....01111110....
...0L1111110....
...0LL1111110...
...0LL1111110...
...0LLLL111110..
...0LLLLLL1110..
....0LLLLLLL0...
.....0000000....
................` ],
  [ transportedge, bitmap`
................
................
................
................
................
.....333333.....
.....333333.....
.....333333.....
.....333333.....
.....333333.....
.....333333.....
................
................
................
................
................` ],
  [ grass, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFF66FFFFFFF
FFFFFF66FFFFFFFF
FF666F66FFFFFFFF
FFF66F6FFFFFFFFF
FFFFFFFFFFFF66FF
FFFFFFFFFFF66FFF
FFFFFFFFFFFFFFFF
FFFFFFFF6FFFFFFF
FFFFFFFF66FFFFFF
FFFFFFFF66FF66FF
FFFFFFFF66F66FFF
FFFFFFFFF6F66FFF
FFFFFFFFFFFFFFFF` ],
  [ grass2, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFF6FFFFFF
FFFFFFFFFF6F6FFF
FFFFFFFFFF6F6FFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF` ],
  [ caventrance, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000LLL
000000000000000L
LL000000000000LL
LLLLL00000LLLLLL
LLLLLLL00LLL1111
111LLLLLLLLLL111
1111L1LLLLL11111
111111LLLL111111
111111111L111111
...1111111111...
...11111111.....
.....111..1.....
................` ],
  [ bg2, bitmap`
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
LLLLLLLLLLLLLLLL` ],
  [ wall, bitmap`
111111L1111111L1
111111L1111111L1
1111LLL1LLLLLLL1
LLLLL1LLL111L11L
11L1111111L11111
11L1111111L11111
LLL1111111LL1111
L11LLLLLLLL1LLLL
111111L111111LL1
111111L1111111L1
11111LL111111LL1
LLLLL1111LLLLLLL
11L11111111L1LLL
L1L11111111L111L
L11L11111LL1111L
LL1L1LL1LL111LLL` ],
  [ wall2, bitmap`
1D1111L111D111L1
1D1111L111DD11L1
1DDDLLL1LLLDDLL1
LLLDL1LLLD11D11L
11LD1111DDL1DDDD
11LDD111D1L111DD
LLL1D11DD1LL1111
L11LDLDDLLL1LLLD
1111D1D111111LDD
1111DDD111111DD1
11111DL111111DL1
DLLLLD111LLLLDLL
D1L11D11111L1LDL
DDL11D11111LDD1L
LD1L11D11LL1D11L
LD1L1LLDLL11DLLL` ],
  [ wall3, bitmap`
011111L1101111L1
100011L110L111L0
11L01L1010L11L01
LL1L000LL0LLL00L
1111L0L110000LL1
100010L110L0L111
11L011010LL0L101
L11L000L00LL010L
1111LL00L111L0L1
1111110L11111L01
11111L0L00111L0L
LLL0L100LL01L0LL
11L000LL11L0L111
1000LL11010L1111
11LL1110L0L11111
LL11LLL0L01LLLL0` ],
  [ torch, bitmap`
................
................
...........9....
...3...3........
.....399993.....
....399399393...
...9933933339...
.0.3903939199.1.
..090330L33191..
..009909931911..
...0300333191...
...00090L9911...
....000LLL11....
....00LLLL11....
................
................` ],
  [ fly, bitmap`
................
................
................
................
.22.........22..
.222.00.00.222..
.2220330330222..
..22033033022...
.....00000......
................
................
................
................
................
................
................` ],
  [ tongueright, bitmap`
................
................
................
................
................
................
333333333333333.
CCCCCCCCCCCCCCC3
CCCCCCCCCCCCCCC3
333333333333333.
................
................
................
................
................
................` ],
  [ tongueleft, bitmap`
................
................
................
................
................
................
.333333333333333
3CCCCCCCCCCCCCCC
3CCCCCCCCCCCCCCC
.333333333333333
................
................
................
................
................
................` ],
  [ tongueup, bitmap`
.......33.......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......` ],
  [ tonguedown, bitmap`
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
......3CC3......
.......33.......` ],
  [ enemy,  bitmap`
................
....0000........
...044440.......
..04443440......
..0DDD44440.....
.0300CCCD40.....
030..0CCD40.....
.0...0CDD0......
....0DDD0.......
..00CDD0........
.0CCDD0....000..
0CDDD0....0D440.
0CDD000000DD40..
0CDD444444DD0...
0CCDDDDDDDD0....
.0CCCCCCCC0.....` ],
  [ watermelon,  bitmap`
................
................
................
.........DDD....
........3224DD..
.......333244D..
......3303244D..
.....3303324DD..
....33033324D...
...333333244D...
...D4422224DD...
...DD444444D....
....DDDDDDDD....
................
................
................` ],
)

//setup
setBackground(bg);
setSolids([player, bg, bush, tree, surfacerock, wall, wall2, wall3, torch, infobox, tongueright, tongueleft, tongueup, tonguedown,])

var lastDirection = "up";
var spotted = false; // enemy movement mechanics

// level logic
let level = 1
const levels = [
  map`
..........
..........
..........
..........
..........
..........
..........
..........`, // game end screen
  map`
ab.betb...
tgts..sbsa
..bt..atbt
e.g......s
....pi...e
tbs...a.bt
gabs.gbbs.
tstbstbstg`, // layer 0 - start
  map`
a.b.bas...
tsgt.t.ttb
.tbi....s.
a.......pe
g.........
tb....b.bt
b.b.tbatab
.tbbagbgbt`, // layer 0 - start + left
  map`
b.t..t....
.ttb.....x
tbi......s
.........x
ep.......t
.........t
t.....x.b.
.tb..b.t.s`, // layer 0 - start + right - enemy test room
  map`
t.CCccC...
.bsw..wsb.
t.bttttg.t
........ia
.t..K...t.
t......tg.
.tt.p.tbt.
bsb.e.bs.t`, // layer 0 - start + up
  map`
T.w.e.w.V.
.wV...VC.C
w......wC.
..........
e........T
..........
w...p...CC
.wT.e..CVw`, // layer 1 - start
  map`
..wCe...w.
.wV......w
wT...E....
..........
.E......pe
..........
V...w.V.CV
.CwVTV.C..`, // layer 1 - start + left
  map`
s..wCew...
.wV....wCs
wT....E.TC
V.E......w
w...K....C
wT......Tw
sww.p..wV.
..Vwiwww.s`, // layer 1 - start + left + straight OR start + straight (no more backteleports from here mwahahah)
  map`
.wwwwe.www
wwK.wwwwws
.wwwww.ww.
T.w.w..w..
www.w..w..
..w.......
wwwwww.www
swi...pw..`, // layer 1 - maze test - i plan to incorporate the eating mechanic into the maze
  map`
s.wew...e..ww.s.
.wT.Tw....w.Tw.s
w.x...w..w...w..
.w...xw..w....w.
.w....w.w.E....w
ww...w.w.......w
p..K..i.w.......
ww...w.ww...K..E
.w....w.w.......
.w....w.w......w
w....xw........e
wx....ww.E.....w
w..Tww..w..T..w.
.weww...wwwwwews`, // false teleport rooms mwahaha
  map`
...w......ew..w
e..ww.www..w..w
......w.ww..w.w
w..E.....wx...e
ww..www....ww..
.ww.w......w...
....w..ww.ww...
.ww....iw....ww
.w..w..........
ww..w.w...ww..E
....w.ww...ww..
p.w....w....w.e`, // last layer 1 level
  map`
e.wTTTTV..
.CK.....C.
w......K.C
T...is...T
T........T
w.K......V
.V.....KV.
..wT.pTC..`, // layer 2 start 
  map`
w.E.wwwVwe
w....E.Vww
.w.....VVV
ww........
p.......E.
ww.......w
.w......w.
..w.E.wwe.`, // big maze start (this is number 0)
  map`
wwCCwwwwwwwVVVww
w...w...w...w..w
www.w.V.V.w.VV.V
w...V.V.V.w....V
w.wVV.V.V.VwCw.V
p.w...V.w.V....w
w.w.K.w.w.w.C..C
w.w...w..Ew.CE.w
w.w.C.CwwCw....e
C...C.C........w
C.wwC.C..wCCw..V
w...w...E.....KV
wwVVwwwwwwVVVwwV`, // (this is number 2)
  map`
VwCwwwwpwwwCCwwe
V.w.w....w..ww.w
V.w.C..K.w.w...V
V...w.w....V.www
w..ww.CCww.V.w.w
CE.w.......w.C.w
C...wCC.ww.C.C.V
C...EVV.w..w.w.V
w...www.C....w.V
V...VV..wVVw...w
V....www.w.wCw.w
VE...Vw..w....Ew
wwCCwVwwewwVVwww`, // (this is number 1)
  map`
wwwwwVVwVwwVwwww
p..............w
w.wwVVw.wwCwww.w
w.....w...C....V
Vwwww.www.wwwwwV
V...C...w......V
w.www.K.wwCCCw.w
V.........wK...w
V.wwwwCCwww..www
w...w.....w....w
wwCCC.www.wCCw.w
w.....w........e
wwwCCCwCCwCwwwww`, // (this is number 7)
  map`
CC.p.CC
C.....C
T..i..T
C.....C
CCVwVCC`, // (this is number 9)
  map`
wwwwwCwwwwwwwCCCC
p....C..E.......w
w...Kww...ww....w
w.....VVwww.CC.Ew
Vw.ww........w..w
V...w....x...w..w
V..EwwVVw..Kw.w.C
V.www...w.....VwC
w.w.w...www.....C
w...ww....VV....w
w....w.....w..E.w
w..E.w.....ww...e
CCCCCwwwwwwwwwwww`, // (this is number 3)
  map`
swwspswwVs
w.......Vw
V........T
V...i....e
V........T
w......E.w
w.......wV
sCCTeTwwCs`, // (this is number 4)
  map`
CC.p.CC
C.....C
T..i..T
C.....C
CCVwVCC`, // (this is number 5)
  map`
wwwTsKsTwww
wK.......Kw
w.........w
T...pZG...T
w.........w
wK.......Kw
wwwTsKsTwww`, // (this is number 6) WINNER!!!
]
setMap(levels[level])

/*
  the maze layout is like this, numbers marks rooms and dashes are the path to the win room, (w)
  ---- 2----- 3 -----
  |                 |         
  0   7 -----       4 --- 6(w)
  |   |     |       |
  1 ---     9       5
  
*/

// pushables
setPushables({
  [ player ]: []
})

// functions

const win = () => {
  if (level == 20) {
    level == 20;
    addText("YOU WIN!!!", {x: 6, y: 4, color: color`2`})
    addText("how thoughtful,\na chocolate heart!", {x: 2, y: 10, color: color`0`})
  }
}

const damagecontroller = (object, objectdata) => {
  if (isAround(getFirst(object).x, getFirst(object).y, player)) {
    if (playerdata.health <= 0) {
      level = 0;
      setMap(levels[level])
      setBackground(bg2);
      addText(`GAME OVER :C`, {x: 4, y: 5, color: color`2`});
      addText(`press k to restart\nthe game`, {x: 2, y: 7, color: color`2`});
    } else {
      playerdata.health -= objectdata.damage;
    }
  }
}


const printplayerhealth = () => {
  addText(`HP:${playerdata.health}`, {x: 14, y: 0, color: color`2`});
}

const pickup = () => {
  if (getFirst(player).x == getFirst(watermelon).x && getFirst(player).y == getFirst(watermelon).y) {
    if (playerdata.health < playerdata.maxhealth) {
      playerdata.health += 5;
      setTimeout(() => {
      clearTile(getFirst(watermelon).x, getFirst(watermelon).y);
      }, 550);
    }
  }
}

// s/o wet for helping me make this expandable datastructure!!! www
const tp = (player, x, y) => {
  getFirst(player).x = x;
  getFirst(player).y = y;
}

const levelTeleportConditions = {
  1: {
    '0,3': { level: 2, teleport: null },
    '9,4': { level: 3, teleport: null },
    '4,0': { level: 4, teleport: null },
  },
  2: {
    '9,3': { level: 1, teleport: [1, 3] },
  },
  3: {
    '0,4': { level: 1, teleport: [8, 4] },
  },
  4: {
    '4,7': { level: 1, teleport: [4, 1] },
    '4,0': { level: 5, teleport: null },
    '5,0': { level: 5, teleport: null },
  },
  5: {
    '4,7': { level: 4, teleport: [4, 1] },
    '0,4': { level: 6, teleport: null },
    '4,0': { level: 7, teleport: null },
  },
  6: {
    '9,4': {level: 5, teleport: [1, 4] },
    '4,0': {level: 7, teleport: null },
  },
  7: {
    '5,0': {level: 8, teleport: null },
  },
  8: {
    '5,0': {level: 9, teleport: null },
  },
  9: {
    '8,0': {level: 10, teleport: null },
  },
  10: {
    '14,3': {level: 11, teleport: null },
  },
  11: {
    '0,0': {level: 12, teleport: null },
  },
  12: {
    '9,0': {level: 13, teleport: null },
    '8,7': {level: 14, teleport: null },
  },
  13: {
    '15,8': {level: 17, teleport: null },
  },
  14: {
    '16,0': {level: 15, teleport: null},
  },
  15: {
    '16,11': {level: 16, teleport: null},
  },
  17: {
    '16,11': {level: 18, teleport: null},
  },
  18: {
    '4,7': {level: 19, teleport: null},
    '9,3': {level: 20, teleport: null},
  },
}

const checkLevelTeleport = () => {
  const key = `${getFirst(player).x},${getFirst(player).y}`;
  if (levelTeleportConditions[level] && levelTeleportConditions[level][key]) {
    const { level: newLevel, teleport } = levelTeleportConditions[level][key];
    level = newLevel;
    setMap(levels[level])
    if (teleport) {
      tp(player, teleport[0], teleport[1])
    }
  }
}

const setBg = () => {
  if (level == 1 || level == 2 || level == 3 || level == 4) {
    setBackground(bg);
  } else {
    setBackground(bg2);
  }
}

const inrangeofplayer = (object, range) => {
  if (getFirst(object).x + range >= getFirst(player).x && getFirst(object).y + range >= getFirst(player).x) return true;
  else if (getFirst(object).x - range >= getFirst(player).x && getFirst(object).y + range >= getFirst(player).x) return true;
  else if (getFirst(object).x - range >= getFirst(player).x && getFirst(object).y - range >= getFirst(player).x) return true;
  else if (getFirst(object).x + range >= getFirst(player).x && getFirst(object).y - range >= getFirst(player).x) return true;
  return false;
}

const moveTowardsPlayer = (object, range) => {
  if (inrangeofplayer(object, range)) {
    if (getFirst(object).y > getFirst(player).y + 2) {
      getFirst(object).y--
    }
    if (getFirst(object).y + 2 < getFirst(player).y + 2) {
      getFirst(object).y++
    }
    if (getFirst(object).x > getFirst(player).x + 2) {
      getFirst(object).x--
    }
    if (getFirst(object).x + 2 < getFirst(player).x + 2) {
      getFirst(object).x++
    }
  }
}


const spawnTongue = () => {
  if (lastDirection == "right") {
    addSprite(getFirst(player).x + 1, getFirst(player).y, tongueright);
    setTimeout(() => {
    clearTile(getFirst(tongueright).x, getFirst(tongueright).y);
    }, 150);
  } else if (lastDirection == "left") {
    addSprite(getFirst(player).x - 1, getFirst(player).y, tongueleft)
    setTimeout(() => {
    clearTile(getFirst(tongueleft).x, getFirst(tongueleft).y);
    }, 150);
  } else if (lastDirection == "up") {
    addSprite(getFirst(player).x, getFirst(player).y - 1, tongueup)
    setTimeout(() => {
    clearTile(getFirst(tongueup).x, getFirst(tongueup).y);
    }, 150);
  } else if (lastDirection == "down") {
    setTimeout(() => {
    clearTile(getFirst(tonguedown).x, getFirst(tonguedown).y);
    }, 150);
    addSprite(getFirst(player).x, getFirst(player).y + 1, tonguedown)
  }
}

// HUGE S/O BIRB FOR HELPING RENDER THE MESSAGES

const renderMessage = (message) => {
  addText(message, {x: 4, y: 10, color: color`2`});
  setTimeout(() => {
  clearText()
  }, 1050);
}

const levelsAndMessages = {
  1: "use w/a/s/d\nto move around\nand j to\nattack and\ninteract",
  2: "frogs can eat\ntrees and bushes\ntotally (real)",
  3: "try to avoid\nthe enemies\nand use the\ntongue to eat\nthem",
  4: "you see an\nominous cave,\nit beacons\nto you",
  7: "no turning back\nfrom here\n:c",
  8: "i love mazes\ni can just eat\nthe walls!",
  9: "which one is\nthe right\nteleport?",
  10: "i hope\nyou learned\nthe false\nteleports",
  11: "you see the\nrock of truth\nit says:\nthe hardest\nis yet to come",
  16: "you took the\nwrong path and\ngot trapped :c\npress k to\nrestart",
  18: "choices, choices\n, choices...",
  19: "you took the\nwrong path and\ngot trapped :c\npress k to\nrestart",
};

const isAround = (x, y, object) => { // idea taken from Tom-on's "spirit bound"
  if (getFirst(object).x == x && getFirst(object).y == y + 1) return true;
  else if (getFirst(object).x == x && getFirst(object).y == y - 1) return true;
  else if (getFirst(object).x == x + 1 && getFirst(object).y == y) return true;
  else if (getFirst(object).x == x - 1 && getFirst(object).y == y) return true;
  return false;
}

if (level != 20) {
  onInput("w", () => {
  getFirst(player).y -= 1
  lastDirection = "up"
})

onInput("s", () => {
  getFirst(player).y += 1
  lastDirection = "down"
})

onInput("a", () => {
  getFirst(player).x -= 1
  lastDirection = "left"
})

onInput("d", () => {
  getFirst(player).x += 1
  lastDirection = "right"
})


onInput("j", () => {
  if (getFirst(infobox) == null) {
    spawnTongue()
  } else {
    if (isAround(getFirst(infobox).x, getFirst(infobox).y, player)) {
      renderMessage(levelsAndMessages[level])
    } else {
      spawnTongue()
    }
  }
})
}

onInput("k", () => {
  level = 1;
  setMap(levels[level])
  clearText()
})

afterInput(() => {
  win();
  checkLevelTeleport()
  setBg()
  printplayerhealth()
  if (getFirst(watermelon) != null) {
    pickup()  
  }
  if (getFirst(fly) == null) {
    moveTowardsPlayer(enemy, 3)
    damagecontroller(enemy, enemydata)
  } else {
    moveTowardsPlayer(fly, 2)
    damagecontroller(fly, flydata)
  }
})