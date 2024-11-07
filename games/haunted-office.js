/*
@title: Haunted Office
@author: Aleyah
@tags: []
@addedOn: 2024-4-20

@img: ""
*/

const win = tune`
211.26760563380282: G5^211.26760563380282,
211.26760563380282: B5^211.26760563380282,
211.26760563380282: C5^211.26760563380282,
211.26760563380282,
211.26760563380282: D5^211.26760563380282,
211.26760563380282: G5^211.26760563380282,
211.26760563380282,
211.26760563380282: E5^211.26760563380282,
211.26760563380282,
211.26760563380282: B4^211.26760563380282,
211.26760563380282: E5^211.26760563380282,
211.26760563380282: A5^211.26760563380282,
211.26760563380282: C5^211.26760563380282,
211.26760563380282,
211.26760563380282: F5^211.26760563380282,
211.26760563380282: C5^211.26760563380282,
211.26760563380282,
211.26760563380282: F5^211.26760563380282,
211.26760563380282,
211.26760563380282: C5^211.26760563380282,
211.26760563380282,
211.26760563380282: E5^211.26760563380282,
211.26760563380282: A5^211.26760563380282,
211.26760563380282,
211.26760563380282: E5^211.26760563380282,
211.26760563380282,
211.26760563380282: A5^211.26760563380282,
211.26760563380282,
211.26760563380282: B5^211.26760563380282,
211.26760563380282: D5^211.26760563380282,
211.26760563380282: B5^211.26760563380282,
211.26760563380282`
const bgm = tune`
333.3333333333333: E4~333.3333333333333,
333.3333333333333: C5~333.3333333333333,
333.3333333333333: A5~333.3333333333333,
333.3333333333333: F4~333.3333333333333,
333.3333333333333: E4~333.3333333333333,
333.3333333333333: C5~333.3333333333333,
333.3333333333333: A5~333.3333333333333,
333.3333333333333: E4~333.3333333333333,
333.3333333333333: G4~333.3333333333333,
333.3333333333333: E4~333.3333333333333,
333.3333333333333: G4~333.3333333333333,
333.3333333333333: B4~333.3333333333333,
333.3333333333333: A5~333.3333333333333,
333.3333333333333: C4~333.3333333333333,
333.3333333333333: A5~333.3333333333333,
333.3333333333333,
333.3333333333333: E5~333.3333333333333,
333.3333333333333: C5~333.3333333333333,
333.3333333333333: C4~333.3333333333333,
333.3333333333333: E4~333.3333333333333,
333.3333333333333: C5~333.3333333333333,
333.3333333333333: G4~333.3333333333333,
333.3333333333333: C5~333.3333333333333,
333.3333333333333: A4~333.3333333333333,
333.3333333333333: B5~333.3333333333333,
333.3333333333333: F4~333.3333333333333,
333.3333333333333: E4~333.3333333333333,
333.3333333333333: C5~333.3333333333333,
333.3333333333333: A5~333.3333333333333,
333.3333333333333: E5~333.3333333333333 + F4~333.3333333333333,
333.3333333333333: C5~333.3333333333333 + D4~333.3333333333333,
333.3333333333333: B5~333.3333333333333 + C4~333.3333333333333`
const player = "p"
const wall = "w"
const window= "l"
const floor = "f"
const wall2 = "q"
const wall3 = "e"
const pumpkin = "r"
const door = "d"
const key = "k"
const orangePortal = "1"
const spiderPortal = "2"
const wallSide = "3"
const corner = "4"
const corner2 = "t"
const block = "b"
const cornerthree = "O"
const cornerfour = "m"
setLegend(
  [player, bitmap`
.....00000......
....00.000......
...00..000......
...0..0000......
.....000000.....
....00000000....
...0000000000...
.....222222.....
....22222222....
....22922922....
....22922922....
....22222222....
....22222222....
....22222222....
....22222222....
.....222222.....`] ,
  [pumpkin,bitmap`
................
................
................
................
................
......FF........
....FFFF........
...FF..F........
..FF99999999....
...9999999999...
...99C99C99C9...
..999699C99699..
..999699C99699..
..999699C99699..
..999C99C99C99..
...99C99C99C9...`],
  [key, bitmap`
................
................
................
................
................
................
......22222.....
.....2222222....
.....2202022....
.....2202022....
.....2222222....
......02020.....
......02020.....
................
................
................`],
 [ wall,bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
1111111661111111
1111112112111111
1111121111211111
1111LLLLLLLL1111
1111L655555L1111
1111L555555L1111
1111L555555L1111
1111LLLLLLLL1111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [window,bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
C55555550555555C
C55555550555655C
C55655550555555C
C55555550555555C
C65555650565655C
C55655550555555C
000000000000000C
C55555550555555C
C55565550555655C
C55555650555555C
C56555550565565C
C55555550555555C
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [floor,bitmap`
0000000000000000
0LLLLLLL55555550
0LLLLLLL55555550
0LLLLLLL55555550
0LLLLLLL55555550
0LLLLLLL55555550
0LLLLLLL55555550
0LLLLLLL55555550
05555555LLLLLLL0
05555555LLLLLLL0
05555555LLLLLLL0
05555555LLLLLLL0
05555555LLLLLLL0
05555555LLLLLLL0
05555555LLLLLLL0
0000000000000000`],
  [wall2,bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
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
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [wall3,bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
1111111111111111
1111111111111111
1111111111111111
11111DDDDDDD1111
1111DD444DDD1111
1111DD4DDDDD1111
1111DD4DDDDD1111
11111DDDDDD11111
111111DDDDD11111
11111111F1111111
11111111F1111111
1199999999999991
CCCC999999999CCC
CCCC999999999CCC`],
  [wallSide, bitmap`
CC111111111111CC
CC111111111111CC
CC111111111111CC
CC111111111111CC
CC111111111111CC
CC111111111111CC
CC111111111111CC
CC111111111111CC
CC111111111111CC
CC111111111111CC
CC111111111111CC
CC111111111111CC
CC111111111111CC
CC111111111111CC
CC111111111111CC
CC111111111111CC`],
  [corner,bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC111111111111CC
CC111111111111CC`],
 [corner2,bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
CC111111111111CC
CC111111111111CC`],
  [door,bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
1111111111111111
1111111111111111
11111CCCCCCC1111
11111C33333C1111
11111C33333C1111
11111C33333C1111
11111C33333C1111
11111C33333C1111
11111C33336C1111
11111C33333C1111
11111C33333C1111
11111C33333C1111
CCCCCC33333CCCCC
CCCCCCCCCCCCCCCC`],
  [orangePortal,bitmap`
0099999999999900
0900000000000090
0900999999990090
0909000000009090
0909009999009090
0909090000909090
0909090090909090
0909090900909090
0909090099009090
0909090000009090
0909009999990090
0909000000000090
0900999999999900
0900000000000009
0099999999999990
0000000000000000`],
 [spiderPortal, bitmap`
1111111111111111
1222222222222112
2111111111111212
2112222222211212
2121100111121212
2121300311121212
2121100111121212
2121011022221212
2121111211111212
2121111221111212
2121111111111212
2112222222222112
2111111111111112
1222222222222221
1111111111111111
1111111111111111`],
  [block,bitmap`
................
................
................
......3333......
.....333333.....
....33333333....
....33333333....
....33333333....
...3333333333...
..333333333333..
..33333333333...
..3...33....3...
.33...33....3...
.3....3.....33..
.....33.....3...
.....33.........`],
  [cornerthree,bitmap`
CC111111111111CC
CC111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
11111111111111CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [cornerfour,bitmap`
CC111111111111CC
CC111111111111CC
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CC11111111111111
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
 


  
  
)
const playback = playTune(bgm,Infinity)
setBackground(floor)
setSolids([player,wall,wall2,wall3,wallSide,corner2,block,window,corner,cornerthree,cornerfour])

let level = 0
const levels = [
  map`
........
........
........
.......r
........
........
r......r`, 
  map`
4qelldeqllewt
32.......3..3
3........3r.3
mqqqweqqeO..3
3.r.b.......3
3...3..4qq..3
3.r.3r.3..r.3
3bb.3..3k...3
m2bqO.pmqllqO`, // level 1
  map`
4qqqwqe.p.wqqwel4qqelqt
l.......r..42...3b....l
lr..4qqq...3..k.31....l
l...3..r...3....3b....l
l..r3....r.3...13.....l
l...3......mqewqO.....l
lr..3................ql
l...3..r.qqqqqqqqqqqq.l
l..rmqqqb.r...r...r...l
l2.....b....r...r.....l
mwqeqqwqqqqeqwqqqwqqdqO`, // level 2 
  map`
4qqqwellqqqq4qt
31......r..r32l
l.4qqeqt....3.l
l......3.r.r3.l
3....1.3....3.l
3......3r.r.3.l
3.4ewqqO....3bl
3.3k...r...r3bl
3.mqwqt..r..3dl
3b....3r....mqO
32b...3....r.p3
mqqqqqllllqqq.l`, //level3
  map`
4weqqqllleqwqqt
3r...r.......13
3......r...r..3
3.r4qqqeq4qet.3
l..32....3d.3.l
l..3..4q.3..3.l
lr.3r.3..3..3.l
3..3..3kb3..3.3
3..3.rmweO.b3.3
31........bb3p3
mqqwqqlllqewq.O`, // level 4
  map`
lqellleqllwdl
lk.......32bl
l........3r.l
llllwe.qeO..l
l.r......b..l
lp.....4qq..l
l.r..r.3.br.l
l......32b..l
lllllllllllll`, // level 5
  map`
4qqqwqe.p.wqqwel4qqelqt
l.......r..4d..23....1l
lr..4qqq...3b...3.....l
l...3..r...3....3.....l
l..r3....r.3....32....l
l...3k.....mqewqO.....l
lr..3......b.........ql
l...3..r.qqqqqqqqqqqq.l
l..rmqqqb.r...r...r...l
l......b....r...r.....l
mwqeqqwqqqqeqwqqqwq1qqO`, // level 6 
  map`
4qqqwellqqqq4qt
3.......r..r31l
l.4qqeqt....3.l
l.....k3.r.r3.l
3....1.3....3.l
3......3r.r.3.l
3.4ewqqO....32l
3.3..b.r...r3.l
3.mqwqt..r..3.l
3b...d3r....mqO
3b....3..b.rp.3
mqqqqqllllqqq2l`, // level 7
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
  
})
onInput("w",()=> {
  getFirst(player).y -=1
   
})
onInput("a",()=>{
  getFirst(player).x -=1
  
})
onInput ("d",()=>{
  getFirst(player).x+=1
   
})
onInput("j",()=>{
  clearText();
})
onInput("l", () => {
    setMap(levels[level])
});
if(level == 0){
 
addText("You're a ghost and",{
  x:1,
  y:1,
  color: color`6`
})
  addText("been trapped in an",{
  x:1,
  y:3,
  color: color`6`
})
  addText("office.You must",{
  x:1,
  y:5,
  color: color`6`
})
  addText("avoid the pumpkins ",{
  x:1,
  y:7,
  color: color`6`
})
  addText("and escape. Use ",{
  x:1,
  y:9,
  color: color`6`
})
   addText("'w a s d'to move.",{
  x:1,
  y:11,
  color: color`6`
})
   addText("press 'l' to reset",{
  x:1,
  y:13,
  color: color`6`
})
   addText("press 'j'",{
  x:6,
  y:15,
  color: color`6`
})
} 

function checkForPlayer(x,y) { 
  let result = false
  let tileContents = getTile(x,y);

  for(let i = 0; i < tileContents.length; i++){
    if (tileContents[i].type == player){
      result = true;
    }
  }
  return result;
}

let moveP = false;  // used to check pumpkin move state

function movePumpkins(currentLevel){
  if(currentLevel == 1){
    // Pumpkins are at starting locations
    if(!(checkForPlayer(2,5) ||
         checkForPlayer(3,2) ||
         checkForPlayer(3,4) ||
         checkForPlayer(6,2) ||
         checkForPlayer(6,6) ||
         checkForPlayer(11,2)||
         checkForPlayer(11,6)) &&
         !moveP){
      clearTile(2,6);
      addSprite(2,5,pumpkin);
      clearTile(3,1);
      addSprite(3,2,pumpkin);
      clearTile(2,4);
      addSprite(3,4,pumpkin);
      clearTile(7,2);
      addSprite(6,2,pumpkin);
      clearTile(5,6);
      addSprite(6,6,pumpkin);
      clearTile(10,2);
      addSprite(11,2,pumpkin);
      clearTile(10,6);
      addSprite(11,6,pumpkin);
      moveP = true;
    }
    // Pumpkins are at secondary locations
    else if(!(checkForPlayer(2,6) ||
         checkForPlayer(3,1) ||
         checkForPlayer(2,4) ||
         checkForPlayer(7,2) ||
         checkForPlayer(5,6) ||
         checkForPlayer(10,2)||
         checkForPlayer(10,6)||
         checkForPlayer(18,8)) &&
         moveP){
      clearTile(2,5);
      addSprite(2,6,pumpkin);
      clearTile(3,2);
      addSprite(3,1,pumpkin);
      clearTile(3,4);
      addSprite(2,4,pumpkin);
      clearTile(6,2);
      addSprite(7,2,pumpkin);
      clearTile(6,6);
      addSprite(5,6,pumpkin);
      clearTile(11,2);
      addSprite(10,2,pumpkin);
      clearTile(11,6);
      addSprite(10,6,pumpkin);
      moveP = false;
    }
  }
  if(currentLevel == 2){
  if(!(checkForPlayer(8,1) ||
         checkForPlayer(1,2) ||
        checkForPlayer(3,4) ||
       checkForPlayer(1,6) ||
        checkForPlayer(3,8) ||
         checkForPlayer(7,3)||
       checkForPlayer(9,4)||
      checkForPlayer(8,7)||
       checkForPlayer(10,8)||
        checkForPlayer(10,10)||
       checkForPlayer(10,9)||
       checkForPlayer(12,8)||
       // checkForPlayer(10,11)||
       // checkForPlayer(10,12)||
       checkForPlayer(16,9)||
        checkForPlayer(16,8)||
          checkForPlayer(14,9)||
          checkForPlayer(14,8)||
          checkForPlayer(10,8)||
       
         checkForPlayer(18,9)) &&
         !moveP){
      clearTile(7,1);
      addSprite(8,1,pumpkin);
      clearTile(2,3);
      addSprite(1,2,pumpkin);
    clearTile(2,5);
    addSprite(3,4,pumpkin);
    clearTile(2,7);
   addSprite(1,6,pumpkin);
     clearTile(2,9);
     addSprite(3,8,pumpkin);
     clearTile(8,3);
    addSprite(7,3,pumpkin);
  clearTile(9,5);
     addSprite(9,4,pumpkin);
     clearTile(7,7);
    addSprite(8,7,pumpkin);
   // clearTile(9,8);
      addSprite(8,5,pumpkin);
     clearTile(10,8);
      addSprite(10,9,pumpkin);
    clearTile(12,9);
      addSprite(12,8,pumpkin);
    clearTile(14,8);
      addSprite(14,9,pumpkin);
    clearTile(16,9);
      addSprite(16,8,pumpkin);
     clearTile(18,8);
      addSprite(18,9,pumpkin);
      moveP = true;
    }
    
    else if(!(checkForPlayer(7,1) ||
         checkForPlayer(2,3) ||
        checkForPlayer(2,5) ||
        checkForPlayer(2,7) ||
        checkForPlayer(3,5) ||
        checkForPlayer(2,9) ||
      checkForPlayer(8,3)||
            checkForPlayer(9,5)||
              checkForPlayer(7,7)||
              checkForPlayer(10,9)||
              checkForPlayer(14,9)||
          checkForPlayer(10,8)||
              checkForPlayer(12,10)||
              checkForPlayer(12,8)||
               checkForPlayer(12,9)||
                 checkForPlayer(14,9)||
                 checkForPlayer(14,8)||
            
            
             checkForPlayer(16,8)||
               checkForPlayer(16,10)||
               checkForPlayer(16,9)||
            
         checkForPlayer(18,8)) &&
         moveP){
      clearTile(8,1);
      addSprite(7,1,pumpkin);
      clearTile(1,2);
      addSprite(2,3,pumpkin);
     clearTile(3,4);
     addSprite(2,5,pumpkin);
      clearTile(1,6);
      addSprite(2,7,pumpkin);
     clearTile(3,8);
      addSprite(2,9,pumpkin);
      clearTile(7,3);
      addSprite(8,3,pumpkin);
      clearTile(9,4);
     addSprite(9,5,pumpkin);
      clearTile(8,7);
      addSprite(7,7,pumpkin);
     clearTile(10,9);
      addSprite(10,8,pumpkin);
      clearTile(12,8);
      addSprite(12,9,pumpkin);
      clearTile(14,9);
      addSprite(14,8,pumpkin);
      clearTile(16,8);
      addSprite(16,9,pumpkin);
      clearTile(18,9);
      addSprite(18,8,pumpkin);
      moveP = false;
    }
  }
  if(currentLevel == 3){
    if(!(checkForPlayer(8,1) ||
        checkForPlayer(11,1) ||
      checkForPlayer(9,3) ||
      checkForPlayer(11,3) ||
        checkForPlayer(8,5) ||
       checkForPlayer(10,5)||
      checkForPlayer(7,7)||
         checkForPlayer(7,3)||
     checkForPlayer(7,8)||
            checkForPlayer(7,9)||
       checkForPlayer(9,8)||
      
     checkForPlayer(11,7)||
         checkForPlayer(11,10)) &&
         !moveP){
     clearTile(8,2);
     addSprite(8,1,pumpkin);
      clearTile(10,1);
      addSprite(11,1,pumpkin);
   clearTile(8,3);
    addSprite(9,3,pumpkin);
    clearTile(10,3);
  addSprite(11,3,pumpkin);
    clearTile(9,5);
   addSprite(8,5,pumpkin);
   clearTile(11,5);
    addSprite(10,5,pumpkin);
 clearTile(7,8);
    addSprite(7,7,pumpkin);
     clearTile(8,9);
    addSprite(7,9,pumpkin);
    clearTile(10,8);
    addSprite(9,8,pumpkin);
    clearTile(10,7);
      addSprite(11,7,pumpkin);
    clearTile(11,9);
      addSprite(11,10,pumpkin);
   
      moveP = true;
    }
    
    else if(!(checkForPlayer(8,2) ||
        checkForPlayer(10,1) ||
        checkForPlayer(9,3) ||
       checkForPlayer(10,3) ||
       checkForPlayer(9,5) ||
      checkForPlayer(11,5) ||
      checkForPlayer(7,8)||
              checkForPlayer(8,2)||
              checkForPlayer(8,3)||
              
                 checkForPlayer(7,9)||
          checkForPlayer(8,9)||
             checkForPlayer(10,8)||
              checkForPlayer(10,7)||
          checkForPlayer(11,9)) &&
         moveP){
     clearTile(8,1);
     addSprite(8,2,pumpkin);
      clearTile(11,1);
      addSprite(10,1,pumpkin);
     clearTile(9,3);
     addSprite(8,3,pumpkin);
     clearTile(11,3);
      addSprite(10,3,pumpkin);
   clearTile(8,5);
     addSprite(9,5,pumpkin);
     clearTile(10,5);
      addSprite(11,5,pumpkin);
      clearTile(7,7);
    addSprite(7,8,pumpkin);
     clearTile(7,9);
      addSprite(8,9,pumpkin);
    clearTile(9,8);
    addSprite(10,8,pumpkin);
    clearTile(11,7);
      addSprite(10,7,pumpkin);
    clearTile(11,10);
      addSprite(11,9,pumpkin);
  moveP = false;
    }
  }
  if(currentLevel == 5){
    
    if(!(checkForPlayer(2,5) ||
         checkForPlayer(3,2) ||
         checkForPlayer(3,4) ||
         checkForPlayer(6,2) ||
         checkForPlayer(6,6) ||
         checkForPlayer(11,2)||
          checkForPlayer(9,6)||
         checkForPlayer(10,6)||
         checkForPlayer(8,6)||
         checkForPlayer(11,6)) &&
         !moveP){
      clearTile(2,6);
      addSprite(2,5,pumpkin);
      clearTile(3,1);
      addSprite(3,2,pumpkin);
      clearTile(2,4);
      addSprite(3,4,pumpkin);
      clearTile(7,2);
      addSprite(6,2,pumpkin);
      clearTile(5,6);
      addSprite(6,6,pumpkin);
      clearTile(10,2);
      addSprite(11,2,pumpkin);
      clearTile(10,6);
      addSprite(11,6,pumpkin);
      moveP = true;
    }
   
    else if(!(checkForPlayer(2,6) ||
         checkForPlayer(3,1) ||
         checkForPlayer(2,4) ||
         checkForPlayer(7,2) ||
         checkForPlayer(5,6) ||
         checkForPlayer(10,2)||
              checkForPlayer(9,6)||
         checkForPlayer(10,6)||
         checkForPlayer(8,6)||
         checkForPlayer(18,8)) &&
         moveP){
      clearTile(2,5);
      addSprite(2,6,pumpkin);
      clearTile(3,2);
      addSprite(3,1,pumpkin);
      clearTile(3,4);
      addSprite(2,4,pumpkin);
      clearTile(6,2);
      addSprite(7,2,pumpkin);
      clearTile(6,6);
      addSprite(5,6,pumpkin);
      clearTile(11,2);
      addSprite(10,2,pumpkin);
      clearTile(11,6);
      addSprite(10,6,pumpkin);
      moveP = false;
    }
  }
   if(currentLevel == 6){
  if(!(checkForPlayer(8,1) ||
         checkForPlayer(1,2) ||
        checkForPlayer(3,4) ||
       checkForPlayer(1,6) ||
        checkForPlayer(3,8) ||
         checkForPlayer(7,3)||
       checkForPlayer(9,4)||
      checkForPlayer(8,7)||
       checkForPlayer(10,8)||
        checkForPlayer(10,10)||
       checkForPlayer(10,9)||
       checkForPlayer(12,8)||
       // checkForPlayer(10,11)||
       // checkForPlayer(10,12)||
       checkForPlayer(16,9)||
        checkForPlayer(16,8)||
          checkForPlayer(14,9)||
          checkForPlayer(14,8)||
          checkForPlayer(10,8)||
       
         checkForPlayer(18,9)) &&
         !moveP){
      clearTile(7,1);
      addSprite(8,1,pumpkin);
      clearTile(2,3);
      addSprite(1,2,pumpkin);
    clearTile(2,5);
    addSprite(3,4,pumpkin);
    clearTile(2,7);
   addSprite(1,6,pumpkin);
     clearTile(2,9);
     addSprite(3,8,pumpkin);
     clearTile(8,3);
    addSprite(7,3,pumpkin);
  clearTile(9,5);
     addSprite(9,4,pumpkin);
     clearTile(7,7);
    addSprite(8,7,pumpkin);
   // clearTile(9,8);
      addSprite(8,5,pumpkin);
     clearTile(10,8);
      addSprite(10,9,pumpkin);
    clearTile(12,9);
      addSprite(12,8,pumpkin);
    clearTile(14,8);
      addSprite(14,9,pumpkin);
    clearTile(16,9);
      addSprite(16,8,pumpkin);
     clearTile(18,8);
      addSprite(18,9,pumpkin);
      moveP = true;
    }
    
    else if(!(checkForPlayer(7,1) ||
         checkForPlayer(2,3) ||
        checkForPlayer(2,5) ||
        checkForPlayer(2,7) ||
        checkForPlayer(3,5) ||
        checkForPlayer(2,9) ||
      checkForPlayer(8,3)||
            checkForPlayer(9,5)||
              checkForPlayer(7,7)||
              checkForPlayer(10,9)||
              checkForPlayer(14,9)||
          checkForPlayer(10,8)||
              checkForPlayer(12,10)||
              checkForPlayer(12,8)||
               checkForPlayer(12,9)||
                 checkForPlayer(14,9)||
                 checkForPlayer(14,8)||
            
            
             checkForPlayer(16,8)||
               checkForPlayer(16,10)||
               checkForPlayer(16,9)||
            
         checkForPlayer(18,8)) &&
         moveP){
      clearTile(8,1);
      addSprite(7,1,pumpkin);
      clearTile(1,2);
      addSprite(2,3,pumpkin);
     clearTile(3,4);
     addSprite(2,5,pumpkin);
      clearTile(1,6);
      addSprite(2,7,pumpkin);
     clearTile(3,8);
      addSprite(2,9,pumpkin);
      clearTile(7,3);
      addSprite(8,3,pumpkin);
      clearTile(9,4);
     addSprite(9,5,pumpkin);
      clearTile(8,7);
      addSprite(7,7,pumpkin);
     clearTile(10,9);
      addSprite(10,8,pumpkin);
      clearTile(12,8);
      addSprite(12,9,pumpkin);
      clearTile(14,9);
      addSprite(14,8,pumpkin);
      clearTile(16,8);
      addSprite(16,9,pumpkin);
      clearTile(18,9);
      addSprite(18,8,pumpkin);
      moveP = false;
    }
  }
  if(currentLevel == 7){
    if(!(checkForPlayer(8,1) ||
        checkForPlayer(11,1) ||
      checkForPlayer(9,3) ||
      checkForPlayer(11,3) ||
        checkForPlayer(8,5) ||
       checkForPlayer(10,5)||
      checkForPlayer(7,7)||
         checkForPlayer(7,3)||
     checkForPlayer(7,8)||
            checkForPlayer(7,9)||
       checkForPlayer(9,8)||
      
     checkForPlayer(11,7)||
         checkForPlayer(11,10)) &&
         !moveP){
     clearTile(8,2);
     addSprite(8,1,pumpkin);
      clearTile(10,1);
      addSprite(11,1,pumpkin);
   clearTile(8,3);
    addSprite(9,3,pumpkin);
    clearTile(10,3);
  addSprite(11,3,pumpkin);
    clearTile(9,5);
   addSprite(8,5,pumpkin);
   clearTile(11,5);
    addSprite(10,5,pumpkin);
 clearTile(7,8);
    addSprite(7,7,pumpkin);
     clearTile(8,9);
    addSprite(7,9,pumpkin);
    clearTile(10,8);
    addSprite(9,8,pumpkin);
    clearTile(10,7);
      addSprite(11,7,pumpkin);
    clearTile(11,9);
      addSprite(11,10,pumpkin);
   
      moveP = true;
    }
    
    else if(!(checkForPlayer(8,2) ||
        checkForPlayer(10,1) ||
        checkForPlayer(9,3) ||
       checkForPlayer(10,3) ||
       checkForPlayer(9,5) ||
      checkForPlayer(11,5) ||
      checkForPlayer(7,8)||
              checkForPlayer(8,2)||
              checkForPlayer(8,3)||
              
                 checkForPlayer(7,9)||
          checkForPlayer(8,9)||
             checkForPlayer(10,8)||
              checkForPlayer(10,7)||
          checkForPlayer(11,9)) &&
         moveP){
     clearTile(8,1);
     addSprite(8,2,pumpkin);
      clearTile(11,1);
      addSprite(10,1,pumpkin);
     clearTile(9,3);
     addSprite(8,3,pumpkin);
     clearTile(11,3);
      addSprite(10,3,pumpkin);
   clearTile(8,5);
     addSprite(9,5,pumpkin);
     clearTile(10,5);
      addSprite(11,5,pumpkin);
      clearTile(7,7);
    addSprite(7,8,pumpkin);
     clearTile(7,9);
      addSprite(8,9,pumpkin);
    clearTile(9,8);
    addSprite(10,8,pumpkin);
    clearTile(11,7);
      addSprite(10,7,pumpkin);
    clearTile(11,10);
      addSprite(11,9,pumpkin);
  moveP = false;
    }
  }
}

setInterval(() => {
    movePumpkins(level);   
}, 500)




afterInput(() => {
  const doornum = tilesWith(door).length;
  const dooropened = tilesWith(door,player).length;
  const keycollected = tilesWith(player,key);
 const enemyCovered = tilesWith(player,pumpkin);
  const orangeportal = tilesWith(player, orangePortal);
  const spiderportal = tilesWith(player, spiderPortal);
  if(enemyCovered.length >=1){
   setMap(levels[level])
  }
  if(keycollected.length >=1){
    getFirst(key).remove();
    getFirst(block).remove();
     getFirst(block).remove();
     getFirst(block).remove();
    getFirst(block).remove();
  }
  if(orangeportal.length >=1){
    const op = getFirst(orangePortal);
    const pl = getFirst(player);
    pl.x = op.x;
    pl.y = op.y;
  }
  if(spiderportal.length >=1){
    const sp = getFirst(spiderPortal);
    const pl = getFirst(player);
    pl.x = sp.x;
    pl.y = sp.y;
  }
  if (dooropened === doornum) {
    
    level = level + 1;

    const currentLevel = levels[level];

    if (level<levels.length) {
      setMap(levels[level]);
    } else {
      addText("you got out :)", { y: 4, color: color`9` });
      playback.end()
      playTune(win)
    
  
   
    }
  } 
  
}) 
