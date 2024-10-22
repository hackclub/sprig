/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: looparround
@author: Emarald64
@tags: ['puzzle', 'maze']
@addedOn: 2024-10-22
*/

const player = "p"
const wall = "w"
const flag ="f"
const button = "b"
const door = "d"
const opendoor = "o"
const box ="a"
const adoor="c"
const openadoor="e"

setLegend(
  [ player, bitmap`
................
.11111111111111.
.10000000000001.
.10000000000001.
.10000000000001.
.10007000070001.
.10007000070001.
.10000000000001.
.10000000000001.
.10000700700001.
.10000077000001.
.10000000000001.
.10000000000001.
.10000000000001.
.11111111111111.
................` ],
  [wall,bitmap`
LLLLLLLLLLLLLLLL
1111L11111111111
1111L11111111111
1111L11111111111
LLLLLLLLLLLLLLLL
111111111111L111
111111111111L111
111111111111L111
LLLLLLLLLLLLLLLL
1111L11111111111
1111L11111111111
1111L11111111111
LLLLLLLLLLLLLLLL
111111111111L111
111111111111L111
111111111111L111`],
  [flag,bitmap`
................
................
.......004......
.......0044.....
.......00444....
.......004444...
.......0044444..
.......00444444.
.......004444444
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......`],
  [button,bitmap`
................
.11111111111111.
.13333333333331.
.13333333333331.
.13333333333331.
.13333333333331.
.13333333333331.
.13333333333331.
.13333333333331.
.13333333333331.
.13333333333331.
.13333333333331.
.13333333333331.
.13333333333331.
.11111111111111.
................`],
  [door,bitmap`
................
................
.LLLLLL..LLLLLL.
L777777LL777777L
L777777LL777777L
L777777LL777777L
L777777LL777777L
L777777LL777777L
L777777LL777777L
L777777LL777777L
L777777LL777777L
L777777LL777777L
L777777LL777777L
.LLLLLLLLLLLLLL.
................
................`],
  [opendoor,bitmap`
................
................
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
................`],
  [box,bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC000000000000CC
CC0CCCCCCC0CC0CC
CC0CCCCCC0CCC0CC
CC0CCCCC0CCC00CC
CC0CCCC0CCC0C0CC
CC0CCC0CCC0CC0CC
CC0CC0CCC0CCC0CC
CC0C0CCC0CCCC0CC
CC00CCC0CCCCC0CC
CC0CCC0CCCCCC0CC
CC0CC0CCCCCCC0CC
CC000000000000CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [adoor,bitmap`
................
................
.LLLLLL..LLLLLL.
L333333LL333333L
L333333LL333333L
L333333LL333333L
L333333LL333333L
L333333LL333333L
L333333LL333333L
L333333LL333333L
L333333LL333333L
L333333LL333333L
L333333LL333333L
.LLLLLLLLLLLLLL.
................
................`],
  [openadoor,bitmap`
................
................
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
................`]
)

setSolids([wall,player,box,door,adoor])

let level = 6
const levels = [
  map`
wwwwwwwww
wp......w
w.wwwww.w
w...w.w.w
w.www...w
w...www.w
w.w..fw.w
w..w.w..w
wwwwwwwww`,
  map`
wwwww...w
wp......w
w.......w
w.......w
wwwwwwwww
w.......w
w.......w
wf......w
wwwww...w`,
  map`
wwwwwwww.
wp..a.bw.
wwwwwdww.
.....f...
.........
.........
.........
.........
.........`,
  map`
wwwww.w.w
wwwbw.w.w
....w.w..
www.w...w
.p..wwww.
waw.www..
w...ww..w
wwwww..ww
wwwfd.w.w`,
  map`
....www..
.ab.wfw..
wwwwwcwww
w..pw....
w...w....
w...d.aab
w...w....
w...w....
w...wwwww`,
  map`
w...w....
waa.w....
w.a.wdddd
.a.aw....
p.a.w....
.a..w.bbb
wwwwwweee
w.ba.w...
w....w.f.`,
  map`
wwdwwdwww
dp.e....d
wwewdewdw
d...dee.d
wed.eww.w
we.w..dew
ww..ded.w
dfwwbae.d
wwwwwdwww`,
  map`
.........
.........
....e....
...ebe...
..ebebe..
.ebepebe.
..ebebe..
...ebe...
....e....`
]

setMap(levels[level])

setPushables({
  [ player ]: [box]
})

  
onInput("s", () => {
  if(getFirst(player).y==8)
    getFirst(player).y=0
  else getFirst(player).y += 1
})
onInput("w", () => {
  if(getFirst(player).y==0)
    getFirst(player).y=8
  else getFirst(player).y -= 1
})
onInput("d", () => {
  if(getFirst(player).x==8)
    getFirst(player).x=0
  else getFirst(player).x += 1
})
onInput("a", () => {
  if(getFirst(player).x==0)
    getFirst(player).x=8
  else getFirst(player).x -= 1
})
onInput("j",()=>{
  setMap(levels[level])
})


afterInput(() => {
  if (tilesWith(flag,player).length>0){
    level++;
    setMap(levels[level])
    if(level==3)addText('J to restart', { y: 0,x:0, color: color`9` })
    if(level==7)addText('You Win', { y: 2,x:5, color: color`9` })
    else clearText()
  }
  if(tilesWith(box,button).length+tilesWith(button,player).length>=1){
    doors=getAll(door)
    openadoors=getAll(openadoor)
    for(i=0;i<doors.length;i++){
        doors[i].type=opendoor
    }
    for(i=0;i<openadoors.length;i++){
        openadoors[i].type=adoor
    }
  }else{
    doors=getAll(opendoor)
    openadoors=getAll(adoor)
    for(i=0;i<doors.length;i++){
        doors[i].type=door
    }
    for(i=0;i<openadoors.length;i++){
        openadoors[i].type=openadoor
    }
  }
})
