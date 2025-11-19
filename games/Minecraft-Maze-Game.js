/*
@title: Minecraft-Maze-Game
@author: Angel
@tags: ["Puzzle", "Maze", "Minecraft"]
@addedOn: 2025-11-17
*/

//Sprite Constants
const player = "p"
const cobblestone = "c"
const teleport = "t"
const magma = "m"
const back_1 = "b"
const back_2 = "q"
const lava = "l"
const tnt = "n"
const plate = "s"
const obsidian = "o"
const empty_portal = "e"
const breakable_wall = "w"
const back_3 = "k"

//Player Sprites
setLegend(
  [ player, bitmap`
....4424D444....
....44424444....
....40044004....
....40044004....
....44400444....
....D400004D....
....4404404D....
....44444444....
......444D......
......4D44......
......24DD......
......D44D......
......44D4......
......4444......
....44D..4D4....
....040..040....` ], [ cobblestone, bitmap`
1LL111111LLLLL11
1L11111111LLL111
L1111L1111L1L111
LL111L111LL1LL11
1LLLLLLLLL111LL1
11111LLL11111111
1111111111111111
1111111111111111
1111111111111111
L111111LLL111111
LLL111111LL11111
LLLLL11111LL1111
L1111111111L11L1
L1111111111111L1
1111111111LLLLL1
1LLL111111111111` ], [ teleport, bitmap`
..000000000000..
..000000000000..
..00HHHHHHHH00..
..0088H88HHH00..
..00H88888HH00..
..00HHHHHHHH00..
..00HH88HHHH00..
..00HH8HHH8800..
..00HH888H8H00..
..00HHHHHH8H00..
..00HHHHHH8H00..
..00H8HH8H8H00..
..00H8888HHH00..
..00HHHHHHHH00..
..000000000000..
..000000000000..` ], [ magma, bitmap`
C99CCCCCC99999CC
C9CCCCCCCC999CCC
9CCCC9CCCC9C9CCC
99CCC9CCC99C99CC
C999999999CCC99C
CCCCC999CCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
9CCCCCC999CCCCCC
999CCCCCC99CCCCC
99999CCCCC99CCCC
9CCCCCCCCCC9CC9C
9CCCCCCCCCCCCC9C
CCCCCCCCCC99999C
C999CCCCCCCCCCCC` ], [ back_1, bitmap`
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
7777777777777777` ], [ back_2, bitmap`
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
3333333333333333` ], [ lava, bitmap`
9999999999999999
9996699996699999
9966699996669969
9999999999999669
9999999999999699
9999999699999999
9996699669969999
9966699999966999
9966699999966999
9999999999999999
9999999669999999
9999999669999999
9999999969999999
9966699999999969
9999999999999669
9999999999996699` ], [ tnt, bitmap`
333C333C333C333C
333C333C333C333C
333C333C333C333C
333C333C333C333C
2222222222222222
2222222222222222
2200020220200022
2220220020220222
2220220200220222
2220220220220222
2222222222222222
2222222222222222
333C333C333C333C
333C333C333C333C
333C333C333C333C
333C333C333C333C` ], [ plate, bitmap`
................
.6FFFFFF62FFFFF.
.F66FFFFF66FFFF.
.FF66FFFFFF6FFF.
.FFF66FFFFF66FF.
.FFFF66FFFFFF6F.
.FFFFF66FFFFFF6.
.FFFFFF66FFFFF6.
.6FFFFFF6FFFFFF.
.F6FFFFFF66FFFF.
.FF6FFFFFF6FFFF.
.FF66FFFFFF6FFF.
.FFFF6FFFFFF6FF.
.FFFF66FFFFFF6F.
.FFFFF66FFFFFFF.
................` ],  [obsidian, bitmap`
0HH000000HHHHH00
0H00000000HHH000
H0000H0000H0H000
HH000H000HH0HH00
0HHHHHHHHH000HH0
00000HHH00000000
0000000000000000
0000000000000000
0000000000000000
H000000HHH000000
HHH000000HH00000
HHHHH00000HH0000
H0000000000H00H0
H0000000000000H0
0000000000HHHHH0
0HHH000000000000` ], [ empty_portal, bitmap`
..000000000000..
..000000000000..
..00........00..
..00........00..
..00........00..
..00........00..
..00........00..
..00........00..
..00........00..
..00........00..
..00........00..
..00........00..
..00........00..
..00........00..
..000000000000..
..000000000000..` ], [ breakable_wall, bitmap`
1LL111DD1LLLLL11
1L1DDD1111LLL111
L1111L1111L1L111
LL111L111LL1LL11
1LLLLLLLLL111LL1
11111LLL111D1111
1D111111111D1111
1DDD11111111DD11
111DD111111111DD
L1111D1LLL11111D
LLL111111LL1111D
LLLLL11111LL1111
L11111DDD11L11L1
L1111DD1111111L1
1111DD1111LLLLL1
1LLL111111111111`], [ back_3, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666` ])

//Set Background
setBackground(back_1)

//Set Pushables
setPushables({ 
  [player]: [ tnt ], [tnt]: [tnt]
})

//Set Solids
setSolids([player, magma, cobblestone, tnt, obsidian])

//Map Sprites
let level = 0
const levels = [
  map`
ccpcc
cc.cc
cc.cc
cctcc`, map`
mt.mmml
mm.mep.
mm.mmm.
mm.mmm.
ml.....`, map`
ep....
ccccc.
...tc.
.cccc.
......`, map`
mmmmmtm
ep.lm.m
mm.lm.m
mm.lm.m
mm.lm.m
mm....l`, map`
e.........
pccc..ccc.
.ccc..ccc.
.ccc..ccc.
..........
....cc....
...cccc...
...c..c...
.........t`, map`
ep.mtll
mm.l.ll
...l.ll
.lll.ll
...l...
ll.lll.
ll.ll..
ll.ll.l
ll....l`,  map`
ccccccccccc
cep.n..n.no
l.........o
c....n..n.o
c.n....n.oo
c...n....oo
c.n.....ooo
c......swto
c..n....ooo`,  map`
........p.......
..m.m.oooo.c.c..
..mmm.o..o.c.c..
...m..o..o.c.c..
...m..oooo.ccc..
................
.n...n.nnn.nn.n.
.n.n.n..n..n.nn.
.nn.nn.nnn.n..n.
................`]

//Set Map
setMap(levels[level])

//Movement Controls
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

//All the checks after an input
afterInput(() => {

//Get sprite reference variables
  playerp = getFirst(player);
  teleportp = getFirst(teleport);
  platep = getFirst(plate);
  breakable_wallp = getFirst(breakable_wall)
  lava_array = getAll(lava);
  tnt_array = getAll(tnt);

//Player touches teleport gets set back to first level
  if (teleportp && playerp.y == teleportp.y && playerp.x == teleportp.x)
  {
    level = level+1;
    setMap(levels[level])
    
//Set background based on level
    if(level==levels.length-1){
      setBackground(back_3)
  }
    else if(level % 2 === 0){
      setBackground(back_1)
  }
    else{
      setBackground(back_2)
    }
  }

//player touches lava and sends player back to first level
for (let lava_single of lava_array) {
  if (playerp.y == lava_single.y && playerp.x == lava_single.x)
  {
    level = 0;
    setMap(levels[level])
    setBackground(back_1)
}
}
  
//tnt touches plate and removes plate, tnt, and breakable wall
if(platep){
for (let tnt_single of tnt_array) {
  if (platep.y == tnt_single.y && platep.x == tnt_single.x)
  {
    platep.remove();
    tnt_single.remove();
    breakable_wallp.remove();
}
}

//lava destroys tnt
for (let tnt_single of tnt_array) {
  for (let lava_single of lava_array){
    if (tnt_single.y == lava_single.y && tnt_single.x == lava_single.x)
  {
    tnt_single.remove();
  }
  
}
}
}
})