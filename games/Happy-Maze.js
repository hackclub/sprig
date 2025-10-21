/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Happy Escape
@author: LifelagCheats
@description: None
@tags: ["maze"]
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const stone = "s"
const orb = "o"
const checkpoint = "c"
const block = "b"
const jumper = "j"
const lock = "l"
const key = "k"
const redportal = "g"
const blueportal = "r"
let i = 0

setLegend(
  [ player, bitmap`
................
....66666666....
...6666666666...
..666666666666..
.66000666600066.
.66000666600066.
.66000666600066.
.66666666666666.
.66666666666666.
.66066666666066.
.66606666660666.
.66660000006666.
..666666666666..
...6666666666...
....66666666....
................` ],
  [ wall, bitmap`
4L111DD14LLL1114
44LL11D44LL11144
L4LL444LLL11444L
L4LL4DLLLLDD444D
L44L4DLLLLDL4LLL
LL4444LLLLDD44LL
LLLD444LLLLDDDLL
LLDDL444LLLL4DDL
LLDLLL44LL444DDL
LLDLL444LLLDDDLL
LLD444L4LDDDLLL1
L444LLL4LD4LLL11
141DLLLDDDLLL111
141DLLLDL14L1111
144DLLLLL1444441
1144DDDDDL111144` ],
  [ stone, bitmap`
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
  [ orb, bitmap`
1..............1
.1...755557....1
1..5575557755.1.
.1.5577577555...
..755757555555..
..577555755555..
..555775755555..
..555575555555..
..555577577555..
..557575557775..
..557577755577..
...7755577555...
...7555557755...
.....555557.....
..11........1.1.
111..........1.1`],
  [ checkpoint, bitmap`
................
................
................
...7777777777...
..7..........7..
.7....7777...77.
7....777777...77
7....777777....7
7....777777....7
7....777777....7
7.....7777.....7
.7............7.
..7..........7..
...7777777777...
................
................`],
  [ block, bitmap`
1111111111111111
11LLLLLLLLLLLL11
1L1LLLLLLLLLL1L1
1LL1LLLLLLLL1LL1
1LLL1LLLLLL1LLL1
1LLLL1LLLL1LLLL1
1LLLLL1LL1LLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLL1LL1LLLLL1
1LLLL1LLLL1LLLL1
1LLL1LLLLLL1LLL1
1LL1LLLLLLLL1LL1
1L1LLLLLLLLLL1L1
11LLLLLLLLLLLL11
1111111111111111`],
  [ jumper, bitmap`
LLLLLLLLLLLLLLLL
L11LL999999LL11L
L11L93333339L11L
LLL9333333339LLL
LL933399993339LL
LL933999999339LL
LL933999999339LL
LL933999999339LL
LL933999999339LL
LL933999999339LL
LL933399993339LL
LLL9333333339LLL
LLLL93333339LLLL
L11LL999999LL11L
L11LLLLLLLLLL11L
LLLLLLLLLLLLLLLL`],
  [ lock, bitmap`
......1111......
.....1....1.....
....11....11....
....1......1....
...1111111111...
...1111111111...
...1111111111...
...1111LL1111...
...111LLLL111...
...111LLLL111...
...11LLLLLL11...
...11LLLLLL11...
...111111111L...
...1111111LLL...
................
................`],
  [ key, bitmap`
..666666666.....
..6.......6.....
..6.......6.....
..6.......6.....
..666666666.....
...66...........
...66...........
...66...........
...66666666.....
...66666666.....
...66...........
...66666666.....
...66666666.....
...66...........
...66666666.....
...66666666.....`],
  [ blueportal, bitmap`
.55..........5..
.5...555555..55.
55.5555555555.55
...5555555555..5
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
5..5555555555...
5..5555555555...
55...555555...55
.55.........555.
..55............`],
  [ redportal, bitmap`
.33..........3..
.3...333333..33.
33.3333333333.33
...3333333333..3
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
3..3333333333...
3..3333333333...
33...333333...33
.33.........333.
..33............`],
)

setSolids([])

let level = 0
let keyObtained = false
let steps = 16
let cooldown = 0
let gameWon = false;
const jumpertune =tune`
500: C4^500 + D4~500 + E4/500,
15500`
const step = tune`
500: C4^500,
15500`
const lose = tune`
555.5555555555555: C5/555.5555555555555,
555.5555555555555: B4/555.5555555555555,
555.5555555555555: C4/555.5555555555555,
16111.111111111111`
const win = tune`
500: D5~500 + F4~500 + C5^500 + G4^500 + A4~500,
15500`
const truewin = tune`
500: C5/500 + B4/500,
500: B4/500 + C5^500,
500: B4^500 + D5-500 + A4^500 + G4^500,
500: E5-500 + G4/500 + C5~500,
500: F4/500 + C5~500,
500: G5/500 + F5~500 + E5~500,
500: G5/500 + E5~500 + F5~500 + D5^500 + B4-500,
500: G5/500 + F5~500 + E5~500 + C5^500 + B4-500,
500: G5/500 + F5~500 + E5~500 + B4^500,
11500`
const levels = [
  map`
ssssws
s.b..s
s..o.s
s.pb.w
s..bcs
wsssws`,
  map`
ww.b..
...b..
..ssc.
.pbl..
.o.s.b
k..bj.`,
  map`
wsssssss
ssss.gkw
p.sws..s
bo.ssbss
.b.ss..s
...s...s
.r.l.c.s
s...ssss`
]

setMap(levels[level])
setSolids([ player, wall, stone, orb, block])



setPushables({
  [ player ]: [orb, player, block]
})

onInput("s", () => {
  getFirst(player).y += 1
  playTune(step)
})

onInput("w", () => {
  getFirst(player).y -= 1
  playTune(step)
})

onInput("d", () => {
  getFirst(player).x += 1
  playTune(step)
})

onInput("a", () => {
  getFirst(player).x -= 1
  playTune(step)
})

afterInput(() => {
  if (gameWon) return;
  
  if (cooldown > 0) cooldown--;
  
  if (tilesWith(orb, checkpoint).length > 0) {
    if (level + 1 >= levels.length) {
      addText("You win!", {
        x: 6,
        y: 6,
        color: color`4`,
      })
      playTune(truewin)
      getFirst(player).remove()
      gameWon = true;
    }
    else {
      level++
      clearText()
      setMap(levels[level])
      steps = 16 * (level + 1) + steps
      keyObtained = false
      playTune(win)
    }
  }
  if (tilesWith(player, jumper).length > 0) {
    getFirst(player).y -= 1
    playTune(jumpertune)
  }
  if (tilesWith(player, key).length > 0) {
    keyObtained = true
    getFirst(key).remove()
  }
  if (tilesWith(player, lock).length > 0 && keyObtained) {
    getFirst(lock).remove()
  }
  if (keyObtained === false) {
    setSolids([ player, wall, stone, orb, block, lock])
  }
  else {
    setSolids([ player, wall, stone, orb, block ])
  }
    
  if (cooldown === 0) {
    Teleport();
    cooldown = 13;
  } else {
    addText(`Teleport is on cooldown (${cooldown})`, {
      x: 2,
      y: 1,
      color: `3`
    });
  }
  clearText()
  CountSteps()
})

function gameOver() {
  
  addText("Game Over", {
    x: 6,
    y: 6,
    color: `3`
  })
  getFirst(player).remove()
  playTune(lose)
  steps = 13
  
}

function Teleport() {

  const redTiles = tilesWith(player, redportal);
  const blueTiles = tilesWith(player, blueportal);

  const pl = getFirst(player);

  if (redTiles.length > 0) {
    const bp = getFirst(blueportal);
    if (bp) {
      pl.x = bp.x;
      pl.y = bp.y;
    }
  } else if (blueTiles.length > 0) {
    const rp = getFirst(redportal);
    if (rp) {
      pl.x = rp.x;
      pl.y = rp.y;
    }
  }
}


function CountSteps() {
  addText(`steps left: ${steps - 1}`, {
    x: 3,
    y: 14,
    color: `3`
  })
  steps--
  cooldown--
  if (steps === 0) {
    gameOver()
  }
}