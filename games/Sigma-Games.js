/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Sigma Games
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
.......0........
........000.....
...........00000
...00000.......0
................
00..............
0.000000000000..
.0............0.
.00............0
..00...........0
....0..........0
.....000......0.
........0000000.
................
................` ],
  [wall,bitmap`
....33333333....
...3333333333...
..333333333333..
.33333333333333.
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....`],
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
.....3.......3..
.....3.......3..
.333.3.......3..
.3...3....3333..
.3...3..3.3.33.3
.3...3..3.3...3.
.33..3..3.3...3.
.....3..3.3...33
.....3..333...33
..........333.3.
................
................
................
................
................`],
  [door,bitmap`
................
.........77....7
.......77....77.
......7.....7...
.....7.....7....
....7.....7.....
..77.....7......
.7......7.....7.
7......7.....77.
......7....77...
.....7...77.....
.....7.77.......
....777.........
...77...........
................
................`],
  [opendoor,bitmap`
................
................
................
................
.9...9..........
.9.99.99........
.999....9.......
.999....9.......
.999..99999.....
...999.9...9....
...9...9...9.9..
...9.9999999.9.9
...9...9.....99.
...9...9.....9..
......9.....99..
......999...9...`],
  [box,bitmap`
................
4...............
4...............
44444...........
4...4..44444....
4...4..4...4....
4...4..4...4....
4444...4..44....
4..44..444......
4....4....4....4
4....44....4..4.
4.....4....4.4..
4.....4.....44..
4....44....4..4.
4...44........4.
44444..........4`],
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
..3.............
..33..33........
..3333333..3....
..3333333..3.33.
...333.3..33333.
....33..33.33.3.
....33.....33..3
....33.....3...3
.....3...6.3....
..6..366.6......
........666666..
..6......6....66
..6......6......
.........6......`]
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
