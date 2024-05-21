
/* 
@title:
@author:
@tags: []
@img: ""
@addedOn: 2023-08-08
*/



   
   

    const moving = tune `
42.796005706134096: G5^42.796005706134096,
1326.676176890157`
    const winTune = tune `
127.11864406779661: B4~127.11864406779661 + G4-127.11864406779661,
127.11864406779661: C5~127.11864406779661,
127.11864406779661: C5~127.11864406779661 + G4-127.11864406779661,
127.11864406779661: F5~127.11864406779661,
127.11864406779661: C5-127.11864406779661,
127.11864406779661: G5~127.11864406779661 + D5-127.11864406779661,
127.11864406779661: G5~127.11864406779661 + D5-127.11864406779661,
127.11864406779661,
127.11864406779661: F5~127.11864406779661,
127.11864406779661: E5~127.11864406779661 + B4-127.11864406779661,
127.11864406779661: B4-127.11864406779661,
127.11864406779661: D5~127.11864406779661,
127.11864406779661: D5~127.11864406779661,
127.11864406779661: B4-127.11864406779661,
127.11864406779661: F5~127.11864406779661,
127.11864406779661,
127.11864406779661: E5~127.11864406779661 + C5-127.11864406779661,
127.11864406779661: E5~127.11864406779661 + C5-127.11864406779661,
127.11864406779661: G5~127.11864406779661,
127.11864406779661,
127.11864406779661: G5~127.11864406779661 + E5-127.11864406779661,
127.11864406779661,
127.11864406779661: G5~127.11864406779661,
127.11864406779661: A5~127.11864406779661 + F5-127.11864406779661,
127.11864406779661: A5~127.11864406779661 + F5-127.11864406779661,
127.11864406779661,
127.11864406779661: G5~127.11864406779661 + A5-127.11864406779661,
127.11864406779661: G5~127.11864406779661,
508.47457627118644`
    


  
    

    const player = "p"
    const wall = "w"
    const goal = "g"
    const box = "b"
    const wall2 = "a"
    const wall3 = "c"
    const vines = "v"
    const key = "k"
    const vines2 = "s"
    const fakeKey = "f"
    const back = "h"
    const grass = "2"
    const sky = "3"
    
    

 setLegend(
	[ player, bitmap`
.....2....2.....
....212..212....
....21L22L12....
....21LLLL12....
....2LLLLLL2....
..2220LLLL0222..
.2LL2LL88LL2LL2.
.21LL2LLLL2LL12.
..21LLLLLLLL112.
..211LL11LL112..
...211L11L112...
....21L11L12....
.....2L22L2.....
......2..2......
................
................` ],
    [wall, bitmap `
.L1111444DD9LLL.
..L1L11141969L..
...L111111L9L...
...L1LD411LL....
...4114111LL....
...DD1H111LL....
....4H6H11L.....
....L1H11LL.....
.....L11LLL.....
.....L111L......
.....L11LL......
.....L14L.......
......4D........
......4D........
......L.........
................`],
    [goal, bitmap `
DL1111111114DD11
111111LLLLLL11L1
L11L1LL00000L17L
11LL1L0000000767
1141L00000000L71
1D41L000000000L1
141L0000000000L1
111L0000000000L1
11LL0000000000LD
1L1L000000000L41
1131L00000000L1L
136310000000LL1L
11311L00000L811L
1LL11LLLLLL868LL
41L11114D1118L11
D1111411D4111114`],
    [box, bitmap `
................
................
................
...55.0...0.55..
..5775.0.0.5775.
..572750.057275.
..5777750577775.
...57277077275..
....577202775...
.....5770775....
....572707275...
...57277077275..
...57755.55775..
....55.....55...
................
................`], 
    [wall2, bitmap `
................
...........1....
...........4....
..........4D....
...1......D11.41
1.11..8..4DL14DD
1114L86811111114
DL4D1181111411L1
L11L4111L1DD151L
LL1111111L4L5651
LLH41L1L111LL54L
LH6HLLL1144LLLLL
LLHL1LLL44DDL1LL
L1LLLLL4LDLLLL11
0L1LLLLLLL1LLLL0
00LLLLLLL0LL0000`],
    [wall3, bitmap `
00LLLLLLLLLLLL00
LLL11L81LL1L1011
L11DD8681L11111L
L74D4481111411LL
7674D111111044LL
474D41LL11L1DD4L
L4DCL1L4LLLL1LDL
44LLLLLLLLLLLLLL
4LLLLLLL000LLLLL
LLLLLLL000LLLLLL
LLLLLLLLLLLLLL34
LL4DLLLLLLLLL363
LLLLLLLD4LLD4D3D
LLLLLLDD4LLLLDDL
LLLLLLL4LLLLLLLC
LLLLLLLLLLLLLC00`],
    [vines, bitmap `
.D....94...D....
.D...969...D....
.43...94...4....
.363...D..4D....
..34...D..D.....
...D..44..H4....
....4.4..H6H....
....7.D...H4....
...7674.....4...
...47.D.....5...
..4...48...565..
..4...868...5...
..D..448...4....
...4.4...74D....
...8.D4.767.....
..868.4..74.....`],
    [key, bitmap `
................
................
...........00...
..........0.....
......00000.00..
.....0033000..0.
.....00033000...
....0000000000..
...0.00000000.0.
..0..0.002002...
....0..0.0000...
....0.0.........
......0.........
................
................
................`],
    [vines2, bitmap `
...8.4...D......
...D..D..4......
....D.4..D......
....4.4..4......
....4.D.D.......
...4..D.4.......
...4..D.4.......
....4.4.........
......4.........
......4.........
......4.........
................
................
................
................
................`],
    [fakeKey, bitmap `
................
................
...........00...
..........0.....
......00000.00..
.....0033000..0.
.....00033300...
....0000000000..
...0.00000000.0.
..0..0.002002...
....0..0.0000...
....0.0.........
......0.........
................
................
................`],
    [back, bitmap `
LLLLLLLL11LLLLLL
LLLL111111111LLL
LL111111111LL11L
LL1111111111L11L
LL1111111111111L
L1L1111111111111
L1L1111111111111
L111111111111111
1111111111111111
1111111111111111
11111111111111L1
1111111111111L1L
L11111111111111L
L111LL11111111LL
LL1111L111111LLL
LLLL11111LLLLLLL`],
    [grass, bitmap `
4444444444444444
4444444444444444
4D4444444444D444
4DD44444DD444444
44444D4444444444
44444D4444444444
44444444444D4444
44444444444D4D44
44D444444D4D4D44
44D444444D444444
44D44D4444444444
44444D4444444444
44444444444D4444
4444444444DD4444
4444444444DD4444
4444444444444444`],
    [sky, bitmap `
HHHHHHHHHHHHHHHH
2HHHHHHHHHHHHHH2
22HHHHHHHHHH2222
222HHH8HHHH22222
HHH8HHH8HHHHH8HH
882888HHHH228888
8222888222222888
8888989998988899
9998998999999989
9989999999998999
6669969989999669
6966666669996666
6696666696666666
6666666666666666
6666666666666666
6666666666666666`]
   
  
);   


 setBackground(back)

setSolids([ wall, player, box, wall2, wall3, vines, vines2 ])

setPushables({
  [player]: [box, player]
})

addText("Help the bat escape!", { y: 2, color: color`6` });
addText("A, W, S, D to move", { y: 14, color: color`6` });

let level = 0
const levels = [
	map`
g.w.w.....w..
w.b......b..p
.............
.......b.....
aaaaaaaaaaaaa
ccccccccccccc`,
    map `
ww...w..www.....ww..w.www.w
...........................
...........................
p....aaaa..................
a...accccaa.....aaaaaa....a
caaacccccccaaaaaccccccaaagc
ccccccccccccccccccccccccccc
ccccccccccccccccccccccccccc
ccccccccccccccccccccccccccc
ccccccccccccccccccccccccccc
ccccccccccccccccccccccccccc`,
    map `
ww.b..ww....wb...www.
p........b.........b.
cc..ccc.........b....
ccc.cccccccc......ccc
cccb.cccccccccccccccc
ccc......cccccccccccc
cccccccc..ccccccccccg
ccccccccc............`,
    map `
pww.w.b...www...b..w.
.b.......b....b......
....b...cccccccc...b.
.cc....c.....c.cccc..
.ccccccc.c.c.c.cccccc
.c...c...c....b..cccc
b..cb..ccc.ccc.c....c
.ccc.ccc...ccg.cccc.c`,
    map `
.www..w...ww.........wgw
........................
ccc......ccccbcc........
c.ccccccccccc.ccccccc...
c.c...c.b...........cccc
cb..cbc.ccccc.ccccc.c..c
c.ccc.c.c....b....c.ccbc
c.c.....c.ccc.ccc......c
p.c.c.ccc.......cccccccc`,
    map `
3333333333
2222222222
222pg22222`


] 

setMap(levels[level])



onInput("s", () => {
	getFirst(player).y += 1
    playTune(moving)
})

onInput("w", () => {
	getFirst(player).y -= 1
    playTune(moving)
})

onInput("d", () => {
   getFirst(player).x += 1
   playTune(moving)
})

onInput("a", () => {
   getFirst(player).x -= 1
   playTune(moving)
})





afterInput(() => {

  // when player covers goal they move to next level
 
  const targetNumber = tilesWith(goal).length;
  
  const numberCovered = tilesWith(goal, player).length;

  const keysNeeded = tilesWith(key).length;

  const keysTaken = tilesWith(key, player).length;


  
  if (numberCovered === targetNumber) {
    
    level = level + 1;

    const currentLevel = levels[level];

    
    
 if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You got out!", { y: 4, color: color`6` });
      playTune(winTune);
    }
  }});
    
    
    
  
   

 


  
  
