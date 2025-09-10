/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Box Adventure Maze
@author: Logan
@description:a fun maze for you and a friend 
@tags: [#maze #puzzle]
@addedOn: 2025-09-10 
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
const deathblock = "d"
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
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
  [ deathblock, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
)

setSolids([player, player2, wall, glass, wall2, block])
setBackground(glass)

let level = 0
const levels = [
  map`
.wwwwwwwwwwwwww.
.p............w.
.wwwww.wwww.w.w.
.w...w.wwww.w.w.
.www.w.wwww...w.
.ww..w......w.w.
.ww.ww..wwwww.w.
.ww.ww..w.....w.
.ww.ww..w.....w.
.w......w.....w.
.w.wwww.wwwww.w.
.w..........w.w.
.wwwwwwwwwwewww.`,
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
v.v....v................vvpv
v.v....vvv............vvvv.v
v........vv............v.v.v
v.vvv.....v....vvvvvvv...v.v
v.vvv.........vvvvvv.v...v.v
v.v.vvv....vvvv......v...v.v
v.v.v.vvvv.v.......vvv...v.v
v.v.v....v.vv...v..v.v...v.v
v.v.v....v.vvv..v....v...v.v
v.v.v.vv.v.vek..v.vvvv...v.v
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
v....................v.....v
vvvvvvvvvvvvvvvvvvvvvvvvvvvv`,
  map`
vvvvvvvvvvvvvvvvvvvvvvvvvvvv
v..v.......vvvvvvvvv.vv....v
v.vv..v.....v.........vv...v
v.vv..vv...............k...v
v.vv........vv.vvvvvvvvvvv.v
v..v...vv....vvv.........vkv
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
v...vvvvvvvvvvvvvvvvv..vev.v
v...v...............v..vkv.v
v..vv......v........v......v
vvvvvvvvvvvvvvvvvvvvvvvvvvvv`,
  map`
vvpvvvvvvvvvvvvvvvvvvvvv
vvbv..v.v.vvvvvvvvvvv.vv
v..vv...b............bvv
v....vv.vvvvvvvvvvvvv.vv
vvbvv.v....v...v.b.....v
v..vvvvvvv.v...v..vvvvvv
v..b..v..v.vvv.v.v.vvvvv
vvv.vvv..v.v.vvv.....b.v
..b.v....v..b..vvvbvvvvv
v.vvvv...vv..vb.ev....vv
v.b..v...vvvvv.vvv....vv
vvv.vvvvvvvvvvvvvvvbvvvv
v.v.v.......v........vvv
vvv.v.vvvvv.v.vvvvvv...v
v...v.vvvvv.v......vv.vv
v.vvv.vvvvv.vvvvvv.v.b.v
v...v.vvv...vv...vvvv..v
vvvbv...v.vvvv.v.v....vv
v.v..vv.v.v..b...vvv.vvv
v.......v....v.v.....vvv
vvvvvvvvvvvvvvvvvvvvvvvv`,
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
vvvvvvvvvvvvvvvvvvvvvvvvvvvv
v......d..dvvevvdddddddddddv
v.dddd.d..dv.b.vd..........v
v.d....d..dv...vd.dddddddd.v
v.d.......dvvkvv.........d.v
v.......d........d....dddd.v
vdddddd.ddd..ddddd.d.......v
v.......d........d.d.ddddddv
v.dddddddddddddd.ddd.......v
v.....ddd......d.d..dddddd.v
v.ddd.....dddd.ddd.........v
v.d...dddd...d.....d.ddddddv
v.d.ddddd....ddddd.ddd.....v
v.d.....d........d......dd.v
vdddd.d.d........ddddddddd.v
v...d.d.d.........d........v
v.d.ddd.ddddddddddd.dddd.ddv
v.d.....d....d....d.dddd.d.v
v..dddd.d..d.d.dd.d.dd...d.v
vd...ddddd.vkvkvd.dddd.ddd.v
vd.d.......vpvxv.......d...v
vvvvvvvvvvvvvvvvvvvvvvvvvvvv`,
  map`
vvvvvvvvvvvvvvvvvvvvvvvvvvv
v.......v.v.e.vv....v.vv..v
vvvvvv.vv.vv.vvvvvvvv.....v
v......vv.v.b.v.....vv.v..v
v.vvvv.vv.vk.kv.vvv.v..v..v
v.v...........v.v.v.vvvv..v
v.vvvvvvvvv.v.v.v.v.......v
v.v.......v.v.v.vvvvvvvvv.v
v.v.vvvvv.v.v.v..v........v
v.v.v...v.v.v.vv.v.vvvvvv.v
v.v...v.v.v.v..v.v.v......v
vvvvvvv.v.v.v.vv.v.vvvvvv.v
v.......v........v........v
v.vvvvvvv.vvvvvvvvvvvvvv.vv
v.......v.vv...........v..v
vvv.vvv.v.vv.vvvvvvvvv.vv.v
v...v...vvvv.v.......v.v..v
v.vvv...vvvv.v.vvvvv.v.v.vv
v.....vvvvvv.v.v...v.v.v..v
v..vvvv....v...v.v.v.v.vv.v
v..vvvv.vv.vvvvv.v.v.v.v..v
vp.vx...vv.......v...v...vv
vvvvvvvvvvvvvvvvvvvvvvvvvvv`,
  
  ]
const levelWinsX = [10,12,17,8,12,26,17,11,13] // copy and replace line
const levelWinsY = [12,13,15,14,12,25,11,10,1] // copy and replace line

function is_two_player(){
  //console.log(getFirst(player2))
  if(getFirst(player2)){
    return true;
  }
  return false
}

let player1_start_x = 0
let player1_start_y = 0
let player2_start_x = 0
let player2_start_y = 0

function record_start_positions(){
  player1_start_x = getFirst(player).x
  player1_start_y = getFirst(player).y
  try{
    player2_start_x = getFirst(player2).x
    player2_start_y = getFirst(player2).y
  } catch{}
}


setMap(levels[level])
record_start_positions()
is_two_player()

setPushables({
  [ player ]: [block],
  [ player2 ]: [block],
  [ block ]: [block]
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

function are_you_dead(player_tile){
    let currenttile = getTile(getFirst(player_tile).x, getFirst(player_tile).y);
    
    currenttile.forEach((sprite) => {
      //console.log(JSON.stringify(sprite))
      if(sprite._type == exit){
        if (level === levels.length - 1) {
          addText("You've Won!", { color: color`6` });
          won = true
        } else {
          level += 1;
          setMap(levels[level]);
          record_start_positions()
        }
      }

      if(sprite._type == deathblock){
        if(is_two_player()){
          //use recorded_start_positions()
          if(player_tile == player){
              getFirst(player).x = player1_start_x
              getFirst(player).y = player1_start_y
          }
          if(player_tile == player2){
              getFirst(player2).x = player2_start_x
              getFirst(player2).y = player2_start_y
          }
        } else{
          if (level === levels.length - 1) {
            addText("You died,LOL!", { color: color`2` });
            dead = true
          } else {
            //level -= 1;
            setMap(levels[level]);
          }
        }
      }
    });
  }


afterInput(() => {
  try {
    are_you_dead(player);
    are_you_dead(player2);
    
  } catch {}
});



