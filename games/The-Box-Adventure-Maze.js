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
const wall = "w"
const exit = "e"
const fake = "f"
const glass = "g"
const inviswall = "i"
const fake2 = "k"
const wall2 = "v"
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
)

setSolids([player, wall, glass, wall2])
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
w...........pw
w...wwwwwwwwww
w.w..wwww.wwww
w.ww..www....w
w.www.wwwwww.w
w.....wwwwww.w
w..ww.wwwwww.w
w..ww........w
w..ww.wwwwwwww
w..ww.wwwwwwww
w..ww.ww.....w
w..ww....www.w
wwwwwwwwwwwwew`,
  map`
wwwwwwwwwwwwwwwwww
www.............ww
www.ww.wwwwwwww.ww
www.ww..wwwwwww.ww
www.www.......wpww
www.wwwwwwwww..www
www..........w..ww
www.www.wwww.ww.ww
www.www.wwww.ww.ww
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
w......ww.......w
w.wwwww.........w
w.......w.......w
wwwfww..wwwww...w
w...www....ww...w
w.wwwwwwww.ww...w
w.wwwwwwww.wwwwww
w.ww.......ww...w
w.ww.wwwww.ww...w
w.wwwwwwww.ww...w
w........w.ww...w
ww.wwwww.w.ww...w
ww.wwwww.w.ww...w
ww.wwwwwewp.....w
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
v....................v.....v
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
]
const levelWinsX = [10,12,17,8,12,26,16] // copy and replace line
const levelWinsY = [12,13,15,14,12,25,15] // copy and replace line
setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("w", () => {
  if (won == false) getFirst(player).y -= 1;
});

onInput("a", () => {
  if (won == false) getFirst(player).x -= 1;
});

onInput("s", () => {
  if (won == false) getFirst(player).y += 1;
});

onInput("d", () => {
  if (won == false) getFirst(player).x += 1;
});

onInput("j", () => {
  if (level != levels.length - 1) {
    level += 1
    setMap(levels[level])
  }
})

afterInput(() => {
  console.log(`If: ${getFirst(player).x}, ${getFirst(player).y} is the end replace each line:`)
  levelWinsX.push(getFirst(player).x)
  levelWinsY.push(getFirst(player).y)
  console.log(`const levelWinsX = [${levelWinsX}] // copy and replace line`)
  console.log(`const levelWinsY = [${levelWinsY}] // copy and replace line`)
  levelWinsX.pop()
  levelWinsY.pop()
  if (getFirst(player).x == levelWinsX[level] && getFirst(player).y ==  levelWinsY[level]) {
    if (level === levels.length - 1) {
      addText("You've Won!", { color: color`C` });
      won = true
    } else {
      level += 1;
      setMap(levels[level]);
    }
  }
});