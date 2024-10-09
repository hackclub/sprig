/*
@title: Blob_Runner
@author: Bright Li
@tags: ['platformer', 'maze']
@addedOn: 2023-01-09
*/

const player = "p"
const blocker = "b"
const wood = 'w'
const spike = 's'
const locked = 'l'
const key = 'k'
setLegend(
  [ player, bitmap`
................
................
................
................
................
....0000........
...0...000000...
..00........00..
..0..........00.
.00..00...00..0.
.0...00...00..0.
00............0.
0.............0.
0..............0
0.00000000000000
000.............` ],
  [blocker, bitmap`
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
  [wood, bitmap`
C0CC0CC0CC0CC0CC
C0CC0CC0CC0CC0CC
C0CC0CC0CC0CC0CC
6666666666666666
C0CC0CC0CC0CC0CC
C0CC0CC0CC0CC0CC
C0CC0CC0CC0CC0CC
C0CC0CC0CC0CC0CC
C0CC0CC0CC0CC0CC
C0CC0CC0CC0CC0CC
C0CC0CC0CC0CC0CC
C0CC0CC0CC0CC0CC
6666666666666666
C0CC0CC0CC0CC0CC
C0CC0CC0CC0CC0CC
C0CC0CC0CC0CC0CC`],
  [spike, bitmap`
....3.......3...
...333.....333..
..33333...33333.
.3333333.3333333
3333333333333333
3333333333333333
3333333333330333
3333033333300333
3333303333003333
3333330033033333
3333333030333333
3333330333303333
3333333333333333
3333333333333333
3333300000003333
3333333333333333`],
  [locked, bitmap`
0...............
.....000000.....
.....0....00....
....0......0....
...00......00...
...0........0...
...0........0...
...0000000000...
...0........0...
...0........0...
...0...00...0...
...0...00...0...
...0...00...0...
...0........0...
...0000000000...
................`],
  [key, bitmap`
................
................
...666..........
..66.66.........
..6...6.........
..66.66.........
...66663........
......36........
.......6666.....
.......66.......
........6666....
........66......
.........6666...
................
................
................`]
)

setSolids([player,blocker,wood,locked])
let cooldown = 0;
let loseindex = 8;
let activate = 0;
let level = 0
let stop = 0;
const levels = [
  map`
................
..b.............
..b.............
..b.............
..b.............
..b.............
..b.............
..b.......b.....
..b....bb.b.....
..b.......b.....
..bbbb....b.....
..........b.....
.......bb.b.....
p..bb..bb.b.....
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb`,
  map`
bbb......b......
bbbb.bbb.b...b..
bbb..bbb.b..bb..
bbb.bbbb.bb..b..
bbb..bbb.b...b..
bbbb.bbb.b..bb..
bbb..bbb.bb..b..
bbb.bbbb.b...b..
bbbp.bbb.b..bb..
bbbbbbbb.b...b..
bbbbbbbb.bb..b..
bbbbbbbb.b..bb..
bbbbbbbb.....b..
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb`,
  map`
................
................
................
................
................
................
................
................
................
........s.......
.......bbb......
.......bbb......
p..w...bbb......
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbb.
bb.....bbbbbbbb.
bb.bbb..........
bb.b.b.bbbbbbbb.
bb.b.b....b...b.
bb.b.bbbb.b.b.b.
bb.b.......bb.b.
bb.bbbbbbb.bb.b.
bb......b.....b.
bb.bb.b.b.bbb.b.
bb.bb.b.b...b.b.
bb.bb.b.bbb.b.b.
bb.bb.b.....b.b.
bbbbb.bbbbbbb.b.
bp............b.
bbbbbbbbbbbbbbb.`,
   map`
................................
..........................s...b.
................s.s.s.s.bbb.b.b.
............s...bbb.bbb.b.....b.
........s.bbbbb...............b.
.......bb.....................b.
..s.s.b.......................b.
..bbb...s...s.................b.
......bbbbbbbbbbb.............b.
.................b............b.
..................b...........b.
..................bb..........b.
................b..b..........b.
.........s......b...bb........b.
.........b..s...b......bbb....b.
.........bb.b...b...bb........b.
.........b..b...bbb...........b.
.........b.bb.......bb........b.
.........b..b..bb...bb........b.
.........bb.b..bb......bb.....b.
.........b..b..........bb.....b.
.....bb..b.bb.......bb........b.
..bb........b.......bb........b.
........bbbbb.................b.
bb............................b.
...bb.........................b.
..............................b.
......bb........................
...bb.bb........................
p..bb...........................
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
b.......................b....................
b.bbbbbbbbbbbbbbbbbbbb..b....................
b.b..........b..........b....................
b.b..bbbbbb.b...........b..b...........b.....
b.b..bbbbbb.b.bbbbbbbbbbb..bbbbbbbb.bbbbbbbbb
b.b......bb.b...........b..b......b.b.bbb...b
b.b......bb.b...........b..b...b..b.b.b.....b
b.b..bb..bb.b...........b..bb..b..b.bb......b
b.b..bb..bbbbbbbbbbbbb..b...b...b.b.bb......b
b.b..bb..bb.............bbbbb.b..bb.b.bb....b
b.bbbbb..bb.............b...b..b....b.bbbb..b
b........bb...bbbbbbb...b...b..bbb..b.b..b..b
p........bb...b.....b...b...b...bbbbb.b...b.b
bbbbbbbbbbb...b.b.bbb...b...b...b..bb.b...b.b
bbbbbbbbbbb...b.b.b...bbb..bbb.bb..bb..b..b.b
b.............b.b.b...b...b........bb..b....b
b.............b.bbb...b...b........bb.....b.b
b............bb.b....bb...b........bb.......b
b..bbbbbbbbb.b..b....b....b..bbbb..bb....b..b
b..b.......bbb..b....b....b..b......b....b..b
b..b............b....b....b..b......b....b..b
b..b...bbbbbb...b....b....b..b......bb......b
b..b........b...bbb.bbb..bb..bbbbbbbbb...b..b
b..bb....bbb.............................b..b
b..bbbbbbb.b.b.......bbbbb.............bb...b
b..b.......bbbbbbb...b...bbbbbbbb..bbbbb....b
b..b.............b..bb............bb........b
b..b.............bbbb..bbbb......bb.........b
b..b.....bbbbbbb.b.....b...b.....b..........b
b..bbb..........bb.....b...bb....b..........b
b.....bbbbbbbbb........b....b...b...........b
b.....................bb....b...b...........b
b...b.................b....bb...b...........b
b....bbbbbbbbbbbbbbbbbb....bbbbb............b
b...........b...b..b.b......................b
b......b.b...............b....b.............b
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbllll..
b.b...............b.....b............b..........bb
b.b..bbbbbb.......b.....b............b......b...bb
b.bb.b..sss..bb...b.....b.bbbbbbbbb.bb..b.b.....bb
b.b..b..bbb.bbb...b....bb........b...b..s.......bb
b.b.bb...b...bb...b....bb.w.w.w..bb.bb..b.b.....bb
b.b..b...b..bbb...b....bb.bbbbbbbb...b....s.....bb
b.b..b...bb..bb...b.....b........bb.bb..b.b.....bb
b.bb.b...b..bbb...b.....b.w.w.w..b...b..s.......bb
b.b..b...b....b...b.....b.bbbbbbbb..bb..b.b.....bb
b.b..b...bb...b...b.....b........b...b....s.....bb
b.b..b...b...bb...bbbbbbb.w.w.w..bb.bb..b.b.....bb
b.b.bb.......bb...b.....b.bbbbbbbb...b....s.....bb
b.b..b...w...bb...b.....b........bb.bb..b.b.....bb
b.b..b..bbbbbbb...b.....b.w.w.w..b...b..s.......bb
b.bb.bb.b.........b..k....bbbbbbbbb.bb..b.b.....bb
b.b..b..b.........bbbbb..........b...b....s.....bb
b.b..b.bb.bbbbbbbbb..............bb.bb..b.b.....bb
b.b.bb..b.........b..............b...b..s.......bb
b.b..bb.b.........b..............bb.bb..b.b.....bb
b.b..b..bbbb......b..............b...b....s.....bb
b.bb.b.bb.........b..............bb..b..b.b.....bb
b.b..b..b.........b..............b...b....s.....bb
b.b.bbb.bsss......b..............b..bb..b.b.....bb
b.b..b..bbbb......b..............b...b..s.......bb
b.bb.b.bb.........b..............bb..b..b.b.....bb
b.b..b..b..w......b....bbbbbbbb......b....s.....bb
b.b.bbb.bbbb......b.................bb..b.b.....bb
b.b..b..b.........b..............b...b..s.......bb
b.b..b.bb.........b..................b..b.b.....bb
b.b.....bbbb.bbbbbb................b.b..s.......bb
b.bb..bbb............................b..b.b.....bb
b.b..bb..........................b...b..........bb
b.b.bb...................ss........bbb..b.b.....bb
b.b..b...........bbbbb...bbbbbbb.bbb............bb
b.bb.b..................................b.......bb
b.b..b..........................................bb
b.b.bb.....bbbbbb............bbb..........bb....bb
b.b..b...........bbb.......................b....bb
b.bb........bbb............bbbb.........b..b....bb
b.b.................bbb....................b....bb
b.bbbbb...w...................bbb.........bb....bb
b.......bbb....bbbb...............bbb......b....bb
b.....................................bbb..b....bb
b...........bb..................................bb
b......bbb......................................bb
b...............................................bb
bp.w............................................bb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`,
  map`
................................
................................
..b.............................
...b....bb......................
...b...bb.......................
....b..b........................
....bbb....bbbbb......b.........
.....bb....b...bb.....bb...b....
....bb.....b.....b.....b...bb...
....b.....b......bb....b....b...
...bb.....b......b.....b...bb...
...b......b......b......b..bb...
..bb......bb....b.......bbbb.bbb
..b........bbbbb................
................................
................................
................................
................................
................................
................................
..............b................b
..........................bbb..b
.b....bb..b...b...........b.b..b
.b....bb..b...b........b.b...b.b
..b..bbb.bb....b.......b.b...b.b
..b..b.b.b.....b.......bb....b.b
...b.b.bbb.....b.......bb....b.b
...b.b.bb......b.......bb....b..
...bb...b......b........b....b..
........................b......b
........................b.......
................................`,
  map`
..b.....b...................
..bb...bb...................
...b..bb....................
...b..b.....................
....bb......................
....bb...bb..........b......
....b...bbbbb.....b..b......
...b....b...b.....b..b......
..bb...b...bb.....b.bb......
..b....b...b......bbbbb.....
.......bbbb...........bb....
............................
............................
.b..........................
.b..........................
.b..........................
.b..........................
.b........bbb....bb....bbbb.
.b........b.b..bb......bb...
.b.......b..b..bb......bbbb.
.b......b...b...bb.....bb...
.b......b...b...bb.....bbbbb
.b.b....bbbb...bb...........
.bb.........................`,
  
 
]
let widths= {
  0:15,
  1:15,
  2:15,
  3:15,
  4:31,
  5:44,
  6: 48,
}
let cooldown2 = 0;
setMap(levels[level])

setPushables({
  [ player ]: [ wood ]
})

setInterval(()=>{
  if(stop) return;
 
  
 

  if(level!=3&& level!=5){
      
  
    for(let y in getAll(wood)){
      getAll(wood)[y].y +=1
    }
    if(!cooldown){
        getFirst(player).y += 1
    }
    
  
  }
  
},500)
setInterval(()=>{
  if(stop) return;
  if(level!=3&& level!=5){
    for(let y in getAll(wood)){
      getAll(wood)[y].y +=1
    }
  }
  
},200)

onInput("s", () => {
  getFirst(player).y += 1
  
})
function isDead(){
 
    if(getTile(getFirst(player).x, getFirst(player).y).length==2){
      if(level==6 && getTile(21, 15).length == 2){
  
    }else{
        setMap(levels[loseindex])
    stop = 1;
    // console.log('STOP')
    level = 0
    clearText()
    }
    
  }
}

onInput("w",()=>{
  if(cooldown) return;
  
  if(level!=3 && level!=5){
    cooldown =1 
    getFirst(player).y -=1
    setTimeout(()=>{
      getFirst(player).y -=1
    },200)
    setTimeout(()=>{
      getFirst(player).y +=1

    },400)
    setTimeout(()=>{
      getFirst(player).y +=1
      cooldown =0 
      isDead()
      
    },500)
    
    
  }else{
    getFirst(player).y -=1
  }
  
  
})
onInput("i", ()=>{
  getFirst(player).x = widths[level]
})
onInput("j", ()=>{
     stop = 0;
    setMap(levels[level])
 
})
onInput("a", ()=>{
  getFirst(player).x -=1
})
onInput("d", ()=>{
  getFirst(player).x +=1
})

afterInput(() => {
  
  // console.log(getFirst(player).x)
  if(level==6){
    if(getTile(21, 15).length == 2){
      clearTile(47, 0)
      clearTile(46, 0)
      clearTile(45, 0)
      clearTile(44, 0)
    }
    
    if(getFirst(player).x == 26){
      if(getFirst(player).y <17){
        if(cooldown2 == 0){
         
    
           setTimeout(()=>{
              getFirst(player).x -= 1
              cooldown2 = 1
             
      
          },300)
          setTimeout(()=>{
           
             cooldown2=0
      
          },2000)
        }
       
      }
    }
  }
  if(getFirst(player).x == widths[level]){
    
      // console.log(widths[level])
      level ++
      setMap(levels[level])
    }
  if(level==0){
  addText("WASD to move", { 
  x: 5,
  y: 4,
  color: color`3`
})
}else if(level==1){
    clearText()
   addText("J to Restart", { 
  x: 5,
  y: 15,
  color: color`2`
})
}else if(level==2){
    clearText()
   addText("Push the block", { 
  x: 2,
  y: 15,
  color: color`8`
})
    
   addText("Don't hit the spike", { 
  x: 0,
  y: 5,
  color: color`3`
})
}else{
    clearText()
}
  isDead()
  if(level ==loseindex-1){
    stop = 1
  }
  
  
    
  
    setTimeout(()=>{
      if(activate == 0){
        cooldown = 0
        activate =1
      }
      
    },2000)
})
