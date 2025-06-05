/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: The Box
@author: 
@tags: []
@addedOn: 2024-00-00
*/

let won = false

const player = "p"
const player2 = "x" 
const wall = "w"
const exit = "e"
const fake = "f"
const glass = "g"
const inviswall = "i"
const fake2 = "k"
const wall2 = "v"
const block = "b" 
setLegend(
  [ player, bitmap`
CCCCCCC66CCCCCCC
CCCCCCC66CCCCCCC
CCCCCCC66CCCCCCC
CCCCCCC66CCCCCCC
CCCCCCC66CCCCCCC
CCCCCCC66CCCCCCC
CCC6CCCCCCCC6CCC
CC666CCCCCC666CC
C66666CCCC66666C
CCC6CCCCCCCC6CCC
CCC6CCCCCCCC6CCC
CCC6CCCCCCCC6CCC
CCC6CCCCCCCC6CCC
CCC6CCCCCCCC6CCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
  [ player2, bitmap`
FFFFFFF99FFFFFFF
FFFFFFF99FFFFFFF
FFFFFFF99FFFFFFF
FFFFFFF99FFFFFFF
FFFFFFF99FFFFFFF
FFFFFFF99FFFFFFF
FFF9FFFFFFFF9FFF
FF999FFFFFF999FF
F99999FFFF99999F
FFF9FFFFFFFF9FFF
FFF9FFFFFFFF9FFF
FFF9FFFFFFFF9FFF
FFF9FFFFFFFF9FFF
FFF9FFFFFFFF9FFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF` ],
  [ wall, bitmap`
1111111111111111
1L111111111111L1
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1L111111111111L1
1111111111111111` ],
  [ exit, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLDDDD
L4444L4LLL4L4LDL
L4LLLLL4L4LLLLDL
L4444LLL4LLL4LDL
L4LLLLL4L4LL4LDL
L4444L4LLL4L4LDL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLDLLL
LLLLLLLLLLLLDDLL
LL44444444DDDDDL
LLLLLLLLLLLLDDLL
LLLLLLLLLLLLDLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ fake, bitmap`
1111111111111111
1C111111111111C1
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1C111111111111C1
1111111111111111`],
  [ glass, bitmap`
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
  [ fake2, bitmap`
1111111111111111
1CC1111111111CC1
1CC1111111111CC1
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1CC1111111111CC1
1CC1111111111CC1
1111111111111111`],
  [ wall2, bitmap`
1111111111111111
1LL1111111111LL1
1LL1111111111LL1
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1LL1111111111LL1
1LL1111111111LL1
1111111111111111` ],
  [ block, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
)

setSolids([player, player2, wall, glass, wall2, block])
setBackground(glass)

let level = 0
const levels = [
  map`
wwwwwwwwwwwwww
p............w
wwwww.wwww.w.w
w...w.wwww.w.w
www.w.wwww...w
ww..w......w.w
ww.ww..wwwww.w
ww.ww..w.....w
ww.ww..w.....w
w......w.....w
w.wwww.wwwww.w
w..........w.w
wwwwwwwwwwewww`,
  map`
wwwwwwwwwwwwww
wwwwwww.....pw
wwwwwww.wwwwww
w....ww.wwwwww
w.ww.ww.wwwwww
w....ww...wwww
w.w..wwww.wwww
w.ww......wwww
w..wwwwwwwwwww
w......wwwwwww
w.www..w...www
w...wwww.w.www
www......w...w
wwwwwwwwwwwwew`,
  map`
wwwwwwwwwwwwwwwwww
www.............ww
wwwwww.wwwwwwww.ww
www.ww..wwwwwww.ww
www.www.......wpww
www.www.wwwww..www
www...w......w..ww
www...w.wwww.ww.ww
www.w...wwww.ww.ww
www.www.www..ww.ww
www..w....w.www.ww
wwww.w....w..ww.ww
wwww.w....ww.ww..w
wwww.wwwwwww.wwwww
wwww.......w..wwww
wwwwwwwwww.wwwww.e
wwwwwwwwww.......w
wwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwww
w......ww.....fpw
w.wwwww.w.....www
w.......w.......w
wwwfww..wwwww...w
w...www....ww...w
w.wwwwwwww.ww...w
w.wwwwwwww.www.ww
w.ww.......ww...w
w.ww.wwwww.ww.w.w
w.wwwwwwww.ww.w.w
w........w.ww.w.w
ww.wwwww.w.ww.w.w
ww.wwwww.w.wwww.w
ww.wwwwwew......w
ww.....wwwwww...w
wwwwwwwwwwwwwwwww`,
  map`
vvvvvvvvvvvvvvvvvvvvvvvvvvvv
v..........................v
v.vvvvvvvvvvvvvvvvvvvvvvvv.v
v.v....v................vv.v
v.v....vvv............vvvv.v
v.v......vv............v.v.v
v.vvv.....v....vvvvvvv...v.v
v.vvv.........vvvvvv.v...v.v
v.v.vvv....vvvv......v...v.v
v.v.v.vvvv.v.......vvv...v.v
v.v.v....v.vv...v..v.v...v.v
v.v.v....v.vvv..v....v...v.v
v.v.v.vv.vpvek..v.vvvv...v.v
v.v.v....vvvvv..v....v...v.v
v.v.v......v....v....v...v.v
v.v.v......v.vvvv....vvv.v.v
v.v.v.vvvv.v.v..v..vvv.v.v.v
v.v.v.vv.v.v.v.vv.vv.v.v.v.v
v.v.v.vv.v.v.v....v..v.v.v.v
v.v.v.vv.v.v.v.......v.v.v.v
v.v.v.vv.v.v.vvvvvvvvv...v.v
v.v.v....v.v.........v...v.v
v.v.vvvvvvvvvvvvvv...v...v.v
v.v..................v...v.v
v.vvvvvvvvvvvvvvvv...vv..v.v
v....................v...f.v
vvvvvvvvvvvvvvvvvvvvvvvvvvvv`,
  map`
vvvvvvvvvvvvvvvvvvvvvvvvvvvv
v..........................v
v..vvv.....................v
v..v.vvvvvv........vvv.....v
v..v.......vvvvvvvvv.vv....v
v.vv..v.....v.........vv...v
v.vv..vv...............v...v
v.vv........vv.vvvvvvv.vkv.v
v..v...vv....vvv.........vvv
v..v..........vv...........v
v..vv.vvvv......vvvvvvv....v
v...v.v..v.vvvvvv.....v....v
v...v.v....vp.........v....v
v...vvv.vvvvvvvvv.....v....v
v...vv...........vv...v....v
v....vvv..........vvv.vv...v
v......vv.............vv...v
v..v....v......vvvvvvvv....v
v..vv...v.vvvvvv...vv......v
v.......v..........v...vvv.v
v...vvvvvvvvvvvvvvvvv..vvv.v
v...v...............v......v
v..vv......v........v......v
v..vv......vv....v..v....vvv
v...vvvv.........v..vvvvvvvv
v.........................ev
vvvvvvvvvvvvvvvvvvvvvvvvvvvv`,
  map`
wwwwwwwwwwwwwwwwww
wp.....wwwwwwwwwww
wwwwww.wwwwwwwwwww
wwwwww.wwwwwwfwwww
wwwwww.wwwwfwwwwww
wwwwww.wwwwwwwwwww
wwwwww.wwwwwwwwwww
wwwwww.wwwwfwwwwww
wwwwww.wwwwwwwwfww
wwwwww.wwwwwwwwwww
wwwwww.wwwwwwwwwww
wwwwww.wwwwwwwwwww
wwwwww.wwwwwwwwwww
wwwwww.wwwwwwwwwww
wwwwww.wwwwwwwwwww
wwwwww.........gew
wwwwwwwwwwwwwwfffw`,
  map`
vvvvvvvvvvvvvvvvvvvvvvvv
v.v.........v..........v
v.v.vv.vvvv.v.vvvv.vvv.v
v.v.v..v....v.v..v.v.v.v
v...vvvv.vv.v.v..v.v.v.v
vvvvv....v..v....v.v.v.v
vvvvv.vvvv..v.vvvv.v.v.v
vv....v....vv.v....v.v.v
vv.vvvv.......v.vvvv...v
vv.v......vkv.v.vvv..v.v
vv.v.vvvvvvev.v...v.vv.v
v..v.v.v..vvv.vvv.v.v..v
v.vv.v.v.vv.....v.v.v..v
v.v..v.v.v..vvvvv.v.v..v
v.v.vv.v.v..v.....v.vvvv
v.v....v.vv.v.vvvvv....v
v.vvv..v..v.v.v..vvvvv.v
v...v..vv.v.v.v..v...v.v
vvv.v...v.v.v.v..v.v.v.v
vpv.vvv.v.v.v.v..v.v.v.v
v.v...vvv.vvv.vvvv.v.vvv
v..................v..xv
vvvvvvvvvvvvvvvvvvvvvvvv`,
  map`
vvvvvvvvvvvvvvvvvvvvvvvvvvvvv
v....vv....vvevvv...........v
v.vvvv..vv.v.b.v..vvvv.vvvv.v
v........v.v...vv....v.v..v.v
vvvvvvvvvv.vv.vvvvvvvv....v.v
vv......vv.v..vv.....vv.v.v.v
vv.vvvv.vv.v...v.vvv.v..v.v.v
vv.v...........v.v.v.vvvv.vvv
vv.vvvvvvvvv.v.v.v.v.......vv
vv.v.......v.v.v.vvvvvvvvv.vv
vv.v.vvvvv.v.v.v..v.........v
vv.v.v...v.v.v.vv.v.vvvvvv..v
vv.v...v.v.v.v..v.v.v.......v
vv.vvvvv.v.v.vvvv.v.vvvvvvv.v
vv.......v.v......v.......v.v
vvvvvvvvvv.vvvvvvvvvvvvvv.v.v
v..v.....v.vv...........v.v.v
vvvv.vvv.v.vv.vvvvvvvvv.v.v.v
v....v...v.vv.v.......v.v.v.v
v.vvvv......v.v.vvvvv.v.v.v.v
v.v....vvvvvv.v.v...v.v.v.v.v
v.v.vvvv....v...v.v.v.v.v.v.v
v.v.vvvv.vv.vvvvv.v.v.v.v.v.v
v.v.v....vv..v....v...v.v.v.v
v.vvv.vvvvvvkvkv.vvvvvv.v.vvv
v.....v....vpvxv.vv.........v
vvvvvvvvvvvvvvvvvvvvvvvvvvvvv`,
  ]
const levelWinsX = [10,12,17,8,12,26,16,11,13] // copy and replace line
const levelWinsY = [12,13,15,14,12,25,15,10,1] // copy and replace line
setMap(levels[level])

setPushables({
  [ player ]: [block],
  [ player2 ]: [block]
})

let wPressed = false
let aPressed = false

onInput("w", () => {
  wPressed = true
  /*if (wPressed && aPressed) {
    if (level != levels.length - 1) {
      level += 1
      return setMap(levels[level])
    }
  }*/
  if (won == false) getFirst(player).y -= 1;
  setTimeout(() => {wPressed = false},250)
});

onInput("a", () => {
  aPressed = true
  if (won == false) getFirst(player).x -= 1;
  setTimeout(() => {aPressed = false},250) 
});

onInput("s", () => {
  if (won == false) getFirst(player).y += 1;
});

onInput("d", () => {
  if (won == false) getFirst(player).x += 1;
});


onInput("i", () => {
  try {
    if (won == false) getFirst(player2).y -= 1;
  } catch {}
});

onInput("j", () => {
  try {
    if (won == false) getFirst(player2).x -= 1;
  } catch {}
});

onInput("k", () => {
  try {
    if (won == false) getFirst(player2).y += 1;
  } catch {}
});

onInput("l", () => {
  try {
    if (won == false) getFirst(player2).x += 1;
  } catch {}
});

afterInput(() => {
  console.log(`If: ${getFirst(player).x}, ${getFirst(player).y} is the end replace each line:`)
  levelWinsX.push(getFirst(player).x)
  levelWinsY.push(getFirst(player).y)
  console.log(`const levelWinsX = [${levelWinsX}] // copy and replace line`)
  console.log(`const levelWinsY = [${levelWinsY}] // copy and replace line`)
  levelWinsX.pop()
  levelWinsY.pop()
  try {
    if ((getFirst(player).x == levelWinsX[level] && getFirst(player).y ==  levelWinsY[level]) || getFirst(player2).x == levelWinsX[level] && getFirst(player2).y ==  levelWinsY[level]) {
      if (level === levels.length - 1) {
        addText("You've Won!", { color: color`C` });
        won = true
      } else {
        level += 1;
        setMap(levels[level]);
      }
    }
  } catch {}
});