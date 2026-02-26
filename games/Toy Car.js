const song = tune `
140.8450704225352,
140.8450704225352: C4~140.8450704225352,
140.8450704225352: E4^140.8450704225352,
140.8450704225352,
140.8450704225352: D4/140.8450704225352,
140.8450704225352,
140.8450704225352: C4~140.8450704225352,
140.8450704225352: C4~140.8450704225352,
140.8450704225352,
140.8450704225352: C4~140.8450704225352,
140.8450704225352: C4~140.8450704225352,
140.8450704225352: E4^140.8450704225352,
140.8450704225352,
140.8450704225352: D4/140.8450704225352,
281.6901408450704,
140.8450704225352: E4^140.8450704225352,
140.8450704225352: C4~140.8450704225352,
281.6901408450704,
140.8450704225352: D4/140.8450704225352,
140.8450704225352: E4^140.8450704225352,
140.8450704225352: C4~140.8450704225352,
140.8450704225352: C4~140.8450704225352,
140.8450704225352: F4^140.8450704225352,
140.8450704225352: C4~140.8450704225352,
140.8450704225352: C4~140.8450704225352,
140.8450704225352,
140.8450704225352: D4/140.8450704225352 + F4^140.8450704225352,
140.8450704225352,
140.8450704225352: E4^140.8450704225352,
140.8450704225352: C4~140.8450704225352`
const player = "p"
    const wall = "w"
    const goal = "g"
    const floor = "f"
    const fakegoal = "x"
    const trap = "t"
    const broken = "b"
    const portalone ="2"
    const portaltwo ="j"



setLegend(
	[ player, bitmap`
................
.....000000.....
.....0CCCC0.....
.....C2CC2C.....
.....CCCCCC.....
.....CC00CC.....
..CHHHHHHHHHHC..
.CCHHHHHHHHHHCC.
.CCHHHHHHHHHHCC.
.CC.HHHHHHHH.CC.
.CC.HHHHHHHH.CC.
.CCCHHHHHHHHCCC.
..CC55555555CC..
...C55555555C...
....555..555....
....555..555....` ],
    [ wall ,bitmap`
00CCCCCCCCCCCCCC
CCCCCCCCCCCCCC0C
CC0CCCC0CCC0CCCC
CC0CCC00CCC0CCCC
CC0CCCCCCCC0CCCC
CC0CCCCCC0C0CCCC
C00C0CCCC0C00CCC
CCCC0CCCC0CC0CCC
CCCC00CC0CCC0CCC
0CCCC0CC0CCCCCCC
0CCC00CC0CCCCCCC
CCC00CCCCCCCCCCC
CCCCCCC00CCCCCCC
CCCCCCCC0CCCCCC0
C00CCCCC0CCCCCC0
CC0CCCCC00CCCCC0` ],
  [goal,bitmap`
................
................
................
................
................
................
................
................
.....LLLL00.....
...LLLLLL00LL...
...LLLLLLLLLL...
....00....00....
................
................
................
................`],
  [floor,bitmap`
4444444444444D44
44D444444444D444
4D44444444444444
44444D4444444D44
4444D4444444D444
44D4D4444444D444
444D444D444D4444
444D44D444444444
4444444444444444
4444444444D44444
444444D44D444444
4444444444D44444
44D44D444D444444
444DD4444D444444
4444D444D44444D4
4444444444444D44`],
 [fakegoal,bitmap`
DDDDDDDDDDDDDDDD
D44444444444444D
D4DDDDDDDDDDDD4D
D4DDDDDDDDDDDD4D
D4DDDDDDDDDDDD4D
D4DDDDDDDDD2DD4D
D4DDDDDDDD22DD4D
D4DDDDDDD22DDD4D
D4DDDDDD22DDDD4D
D4D2DDD22DDDDD4D
D4D22D22DDDDDD4D
D4DD222DDDDDDD4D
D4DDD2DDDDDDDD4D
D4DDDDDDDDDDDD4D
D44444444444444D
DDDDDDDDDDDDDDDD`],
  [trap,bitmap`
4444444444444D44
44D444444444D444
4D44444444444444
44444D4444444D44
4444D4444444D444
44D4D4444444D444
444D4446444D4444
444D446444444444
4444444444444444
4444444444D44444
444444D44D444444
4444444444D44444
44D44D444D444444
444DD4444D444444
4444D444D44444D4
4444444444444D44`],
  [portalone,bitmap`
88HHHHH88HHHHH88
8000000000000008
H08HHHHHHHHHH80H
H0H0000000000H0H
H0H0HHH88HHH0H0H
H0H0H000000H0H0H
H0H0H0HHHH0H0H0H
80H080H00H080H08
80H080H00H080H08
H0H0H0HHHH0H0H0H
H0H0H000000H0H0H
H0H0HHH88HHH0H0H
H0H0000000000H0H
H08HHHHHHHHHH80H
8000000000000008
88HHHHH88HHHHH88`],
  [portaltwo,bitmap`
0000000000000000
088HHHH88HHHH880
0800000000000080
0H08HHHHHHHH80H0
0H0H00000000H0H0
0H0H0HH88HH0H0H0
0H0H0H0000H0H0H0
080H080HH080H080
080H080HH080H080
0H0H0H0000H0H0H0
0H0H0HH88HH0H0H0
0H0H00000000H0H0
0H08HHHHHHHH80H0
0800000000000080
088HHHH88HHHH880
0000000000000000`]
)
setBackground("f")

setSolids([player,wall])


let level = 0
const levels = [
  map`
...........
...........
...fffff...
...fff.f...
...fffff...
...fff.f...
...ff.ff...
...........
.....p.....`,
  map`
pw.w.
.w.w.
.....
www.w
g...w`,
	map`
pw...www.
.www.w.w.
.....w.w.
wwww.w...
g.w...ww.
..www....
w....w..w
www....ww`,
   map`
pwwwwwwwwwww...
.w.........w.w.
.w.wwwwwww.w.w.
.w.w.....w.w.w.
.w.w.www.w.w.w.
.w.w.wgw.w.w.w.
.w.w.w.w.w.w.w.
.w.w.w.w.w.w.w.
.w.w.w...w.w.w.
.w.w.wwwww.w.w.
.w.w.......w.w.
.w.wwwwwwwww.w.
.w...........w.
.wwwwwwwwwwwww.
...............`,
 map`
p...wwww......
..w.w.....www.
..w...w....ww.
.ww...w..wt...
.......www..ww
..www...tw...w
....w.ww......
ww....ww......
ww..w..ww..www
.ww.ww..w...ww
...t........ww
w...www.www...
www.w...w....g`,
  map`
p.wwt..........
w..ww.wwww.ww..
ww..w..www.wwwt
www.wt..ww..ww.
www.www.www..w.
ww..w...wwww...
w..ww.ww...ww..
..w...ww.w.www.
.wwgwww..w.www.
..wwww..ww.www.
w..ww..ww...w..
ww....tww.t...t`,
  map`
ww..ww.......t...wp
....w..wwww...ww.w.
.w.ww.www..tw.w....
.w........w.w.w.www
..w.ww.ww.w.w......
.w..w...w..tww.wwww
.w..w.w.w.w.......w
.w.w.t....www.www..
..t...ww.w...t.ww.w
..wwwww..w.ww...t.w
w...ww.tww.ww....ww
ww.w........w....w.
.w.w...w..w...wwww.
ww...www..www......
...w....w.....ww..w
.www.ww.www..wwwgww`,
  map`
ww.......wwwt...t..
p.wt.www.w....w....
t.w....t....ww...t.
..w.www...w...w.w..
.w..w....w.w..wwgw.
.w..w...wwwww.w....
.wt.www.w...w.w...t
.w..t..t.ww..t...w.
.w.w...w...w....w..
.w..w.w..w..wwww..w
.w..w...t.w.ww...ww
.wt......t.......ww
.w..w..wwwwwww.w...
.w.w.www.......w...
.ww...w..w....ww...
....w...w..........`,
  map`
www.....pw.www..wwwg..w
w...ww.www..www..tww..w
...w......w..www.....ww
wwt...www.....wwwt....t
ww..w.ww.tww....w.www..
w..ww.....www..t....ww.
..ww...w...www.www...w.
w..w..w.w......w.......
ww.w..w.w..ww...t..www.
w..t.w...w.....www...wt
www....w.t.w.....w.w...
.ww....w..w.ww..ww.w...
w...ww.t..w....ww...w..
.wwww..w..w...ww....ww.
..ww..w.w..w..w.....ww.
w..t.....w..w..w...t...
w...www...w....w...w...
w......wwt..w....www...
www...w.....wwww.......`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww......w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww..w.ww.w
www...www..t........t........t...t.t.t....
pt..t..t..t..t.tt..t..t.tt..t..t....tt..tg
...www........t........t........t..t..tw.w
wwwwwwwwwwwwwwwwwwwwwwww.wwwwwwwwwwwwwww.w
wwwwwwwwwwwwwwwwwwwwwwww.................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwpwwwwwwwwwww
wwwwwwwwwww..w...w.ww..w
w.w.w.w.ww..w..www....ww
w.t........ww........www
ww..wwwwwwww...w....wwww
www...........www..wwwww
wwww.wwwwwww.wwwww..wwww
wwww.wwwwwww..www....www
www.t.wwwwww...w......ww
ww..w..wwwwww.....w....w
w..www.wwwwwww...www...w
w...w..wwwwwwww.wwww...w
w.w.w.wwwwwwwww...ww...w
w.w.w.....wwww.........w
w.w...www..w....www....w
w.w.wwwwww..tww.w....w.w
w.w...w.www.www.....ww.w
w.w.w.w...w....wwww.ww.w
w.w.w.w...ww...ww..t...w
w...w......ww.......t..w
w.wwwwwww.wwww......t..w
w.....www.www..ww.www..w
w.ww..www.www..wwtwwww.w
w.ww..www.www..ww.ww...w
w.ww..www.www.....ww.www
w.ww..wwt...www...ww.www
w.ww.....ww.www......www
w..wwwwwwww.www.wwwwwwww
wwwwwwwwwwwgt...wwwwwwww`,

]
const playback = playTune(song,Infinity)

setMap(levels[level])



afterInput(() => {
    
    const trapsCovered = tilesWith(player, trap); 
    
  
    if (trapsCovered.length > 0) {
        setMap(levels[level])
    }
})
setPushables({
	[ player ]: []
})

onInput("s", () => {
	getFirst(player).y += 1
  
})

onInput("d", () => {
  getFirst(player).x += 1;
    
});

onInput("w", () => {
  getFirst(player).y += -1;
   
});

onInput("a", () => {
  getFirst(player).x += -1;
    
});



// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; 

 
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
 
 
const currentLevel = levels[level]; 

  const targetNumber = tilesWith(goal).length;
 
  const numberCovered = tilesWith(goal,player).length;

  if (numberCovered === targetNumber) {
   
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You win!", { y: 4, color: color`2` });
    }
  }



 
});

if(level ==0){
addText("OH NO!",{
  x:7,
  y:1,
  color:color`2`
})
  addText("Jimmy was wandering",{
  x:1,
  y:2 ,
    color:color`2`
})
 addText("off and managed",{
  x:3,
  y:4 ,
    color:color`2`
})
 addText("to lose his toy car!",{
  x:0,
  y:6 ,
    color:color`2`
})
      addText("HELP JIMMY!",{
  x:4,
  y:8 ,
    color:color`2`
})   
   addText("Traps can be",{
  x:7,
  y:10 ,
    color:color`2`
})   
    addText("W=fwd",{
  x:1,
  y:10 ,
    color:color`2`
})  
    addText("A=left",{
  x:1,
  y:11 ,
    color:color`2`
})  
    addText("S=bwd",{
  x:1,
  y:12 ,
    color:color`2`
})   
    addText("D=right",{
  x:1,
  y:13 ,
    color:color`2`
})   
    addText("(Press j)",{
  x:5,
  y:15 ,
    color:color`2`
})   
  
   onInput("j",()=>{
    level+1
    clearText()
        })
   }