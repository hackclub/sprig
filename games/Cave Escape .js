/*
@title: First Game
@author: 
@tags: []
@addedOn: 2025-00-00
*/

addText("you need the key", { y: 4, color: color`3` })
const player = "p"
const wall = "w"
const next = "n"
const background = "b"
const key = "k"
const lock = "l"
var time = 90
var win = false
setLegend(
  [player, bitmap`
.....000000.....
....08888880....
...0888888880...
..088888888880..
.08822888822880.
.08200888800280.
0088888888888800
.08888888888880.
.08888888888880.
.08888800888880.
.00888888888800.
..008888888800..
...0088888800...
....00000000....
...0........0...
..0..........0..`],
  [wall, bitmap`
LLL00L000200L000
0000LL000000L000
0000000000000L00
0L000000L0000000
0L0L000L00000000
000000L00000L000
000000000000L200
00L000LLL0L00000
0LL00000000L0000
0000L00000000000
0000000020LL0000
0L0000L000LLL000
0000LLLL0000L000
0002000L00000000
00000000LLLL0000
0000000000000000`],
  [next, bitmap`
0200000222220000
0200022444442200
0222224444444200
0244444444444200
0244444444444200
0244444444444200
0244444444442200
0244444444220000
0244444222000000
0244222000000000
0222000000000000
0200000000000000
0200000000000000
0200000000000000
0200000000000000
0200000000000000`],
  [background, bitmap`
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
  [key, bitmap`
0000006666600000
0000006666600000
0000006600000000
0000006666600000
0000006666600000
0000006600000000
0000006600000000
0000006600000000
0000066666600000
0000630000360000
0000606666060000
0000606006060000
0000606006060000
0000606666060000
0000630000360000
0000066666600000`],
  [lock, bitmap`
.......LLLLL....
....LLLLLLLLL...
...LLLLLLLLLLL..
...LLL.....LLL..
..LLL......LLL..
..LL........LL..
..LL...FF...LL..
..LL.FFFFFFFLL..
..LLFFFFFFFFFL..
..LFFF0000FFFL..
..FFFF0000FFFF..
..FFFF0000FFFF..
..FFFFF00FFFFF..
..FFFFF00FFFFF..
..FFFFFFFFFFFF..
..FFFFFFFFFFFF..`],
)

addText(time + " seconds left", { y: 0, color: color`3` })
console.log(time)
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})

setBackground(background)

setSolids([player, wall, lock]);

let level = 0
const levels = [
  map`
wnwwwwwwwwwwwwwwwww
wlww.........w..w..
w.ww.www.ww....www.
w....w...www.w..w..
wwww.w.www...w.www.
w....w.w.w.w.w...w.
wwww.w.w.....w.w.w.
ww...w.wwp.w...w.w.
ww.www..w..wwwww...
ww...ww...ww...ww.w
www.www.wwwwww.w...
..w.w......w...wwww
....www...ww.w.wwkw
.www....w..w.w....w
.......wwwww.w.wwww
wwwwww.......w.....`,
  map`
wwwwwwwwwwwwwwwwwww
w........w.www....w
w.wwwwww.w........w
w....w.w.www.wwww.w
wwww.w.w.w...w..w.w
w....w.w.www.ww.w.w
w.wwww.w.w......w.w
w.w....w.w.wwww.www
w.w.ww.......w....w
wlw..www.www.w.ww.w
wnw..wwwwwwwpwww..w
www.......w....w..w
wkwwwwww..wwww.ww.w
w......ww.w....w...
w.w.ww..wwwwwwwwww.
www.www............`,
  map`
nw.w.w.w.ww.ww.....
lw...w.w....w..w.w.
.ww.ww.www.wwwwwww.
...............w...
wwwwww.wwwww.w.....
w....w.......w.ww..
w.w.ww.wwwww.w..w..
w.w.w......w.w..ww.
w.w.ww.www.w.w..w..
w.w.ww.w.w.w.w.www.
wkw.w..w.w.wpw..w..
www.w........ww.ww.
..w.w.www.wwww...w.
.ww.w.w.www....www.
.ww.www.w...wwww...
...................`,

]

const lose = [
  map`
wwwwwwwwwwwwwwwwwww
w.................w
w.....p......p....w
w.....p......p....w
w.....p......p....w
w.....p......p....w
w.....p......p....w
w.....p......p....w
w.................w
w........pp.......w
w....ppppp.ppp....w
w...p........ppp..w
w..pp..........pp.w
w.p.............ppw
wpp..............pw
wwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwww
w.................w
w.....p......p....w
w.....p......p....w
w.....p......p....w
w.....p......p....w
w.....p......p....w
w.....p......p....w
wp..............p.w
wpp............pp.w
w..pp.........pp..w
w...pp.......pp...w
w....pp.....pp....w
w.....ppp..pp.....w
w........ppp......w
wwwwwwwwwwwwwwwwwww`,
]

function timer() {
  time = time - 1;
  console.log(time)
  clearText()

  if (time >= 1) {
    addText(time + " seconds left", { y: 0, color: color`3` })
  }

  if (time < 1) {
    setMap(lose[0])
    addText("You lost!", { y: 0, color: color`3` })
  }

  if (win == true) {
    setMap(lose[1])
    clearText();
    time = 0
    if (time < 1) {
      addText("You won!!!", { y: 4, color: color`2` });
    }
  }
}

setMap(levels[level])

let intervalID = setInterval(timer, 1000);

setPushables({
  [player]: []
})
afterInput(() => {
  const goalsCovered = tilesWith(player, next)
  const keyCovered = tilesWith(key, player)
  if (keyCovered.length >= 1) {
    gotkey = true
    getFirst(lock).remove();
    getFirst(key).remove();
    addText("you got the key!", { y: 0, color: color`3` })
  }


  if (goalsCovered.length >= 1) {
    // increase the current level number
    level = level + 1;



    // check if current level number is valid
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      clearText();
      addText("You won!!!", { y: 4, color: color`2` });
      win = true
    }
  }
})