/*
@title: Pockenmaut Adventures I
@author: Ray Rumore
*/
/*
Help Pocketnaut get himself home in time
  the Earth, it needs his help!

 Controls:
 "a" - left
 "d" - right
 "w" key = Jetpack up
 "s" key = Jetpack down


 To Do:
 - Make levels more interesting
 - Add space lava and health units
 - Add more music
 
*/


// Sprites
const background = "b";
const pocketnaut= "p";
const unpocketnaut= "f";
const bill= "d";
const rock = "u";
const ship = "e";
const base = "k";
const space = "o";
const border = "a";
const volcano = "t";
const spacelava = "s";
const wall = "w";
const wall2 = "z";
const wall3 = "x";
const wall4 = "c";
const wall5 = "v";
const wall6 = "n";
const wall7 = "m";
const wall8 = "l";
const wall9 = "j";
const wall10 = "g";










const themesong = tune `
214.28571428571428: B4-214.28571428571428 + B5-214.28571428571428,
214.28571428571428: C5-214.28571428571428 + A5/214.28571428571428,
214.28571428571428: D5-214.28571428571428,
214.28571428571428: E5-214.28571428571428,
214.28571428571428: B4/214.28571428571428 + D5-214.28571428571428 + B5-214.28571428571428,
214.28571428571428: C5/214.28571428571428 + A5/214.28571428571428,
214.28571428571428: D5/214.28571428571428,
214.28571428571428: E5/214.28571428571428,
214.28571428571428: B4^214.28571428571428 + B5-214.28571428571428,
214.28571428571428: C5^214.28571428571428 + A5/214.28571428571428,
214.28571428571428: D5^214.28571428571428,
214.28571428571428: E5^214.28571428571428,
214.28571428571428: B4~214.28571428571428 + F5/214.28571428571428,
214.28571428571428: C5~214.28571428571428 + E5/214.28571428571428,
214.28571428571428: D5~214.28571428571428,
214.28571428571428: E5~214.28571428571428,
214.28571428571428: D5-214.28571428571428 + E4-214.28571428571428 + F5~214.28571428571428,
214.28571428571428: E5-214.28571428571428 + F4/214.28571428571428,
214.28571428571428: F5-214.28571428571428,
214.28571428571428,
214.28571428571428: D5^214.28571428571428 + E4-214.28571428571428,
214.28571428571428: E5/214.28571428571428 + F4/214.28571428571428,
214.28571428571428: F5/214.28571428571428,
214.28571428571428: E5/214.28571428571428,
214.28571428571428: D5^214.28571428571428 + E4-214.28571428571428,
214.28571428571428: E5~214.28571428571428 + F4/214.28571428571428,
214.28571428571428: F5~214.28571428571428,
214.28571428571428: E5~214.28571428571428,
214.28571428571428: D5^214.28571428571428,
214.28571428571428: E5^214.28571428571428,
214.28571428571428: F5^214.28571428571428,
214.28571428571428: D5-214.28571428571428`


playTune(themesong, Infinity)





setLegend(
  [background, bitmap`
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
  [rock, bitmap`
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC`],
  [pocketnaut, bitmap`
......9999......
.....999999.....
.....99LL99.....
.....92LL29.....
.....9LLLL9.....
.....99LL99.....
......9999......
.......99.......
......9999......
......9999......
.....999999.....
.....999999.....
....99999999....
....9.9999.9....
......9..9......
.....99..99.....`],
  [unpocketnaut, bitmap`
................
................
................
................
..99............
9..999....99999.
99999999.99L2999
..99999999LLLL99
..99999999LLLL99
99999999.99L2999
9..999....99999.
..99............
................
................
................
................`],
  [bill, bitmap`
........9999....
......9999999...
......6666699...
......6666669...
......6060669...
......6666666...
......666666....
........66......
.......2222.....
......222222....
.....6.2222.6...
.....6.2222.6...
.......7777.....
.......7..7.....
................
................`],
  [ship, bitmap`
.......1L.......
......11L.......
......11L.......
.....711L.......
....77L11.......
....77111.......
.....7111.......
.....7L1L.......
......11LL......
.....111LLL.....
....11111.L.....
...111111.......
..11LLLLL.......
..1L...L........
..1...LLL.......
.....LLLLL......`],
  [space, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000010000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0001000000000000
0000000000000000
0000000000000000
0000000000100000
0000000000000000
0000000000000000
0000000000000000`],
  [border, bitmap`
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
  [base, bitmap`
................
................
.............5..
............55..
............55..
............55..
.....C......55..
..3..C..555555D.
..33.C..545555..
..33.C.5544455..
.7777777777445..
77555557777745..
77777777777745..
775777777777454.
7777777777774544
.777777777744544`],
  [volcano, bitmap`
1111111333311111
1111111333333311
1111111333333311
1333333333333311
1333333333333311
1333333333333331
3333333331333333
3333331331133333
3333311333113333
3333133333311333
3331133333331133
3311333333333113
3113333313333313
3133333113333333
3333333133333333
3333333333333333`],
  [spacelava, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000060000000000
0000060000000000
0000066000000000
0000000000600000
0060000000600000
0060000000060000
0006660000660000
0000066366600000
0000006399000000
0000006366066600
0000000396000000
0000000390000000`],
  [wall, bitmap`
CCCCCCC3CCCCCCCC
CCCCC333CCCCCCCC
CCC333CCCCCCCCCC
CCC3CCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCC33CCCCCC
C3333CC3333CCCCC
3CCC333CCC33CC33
CCCCCCCCCCC3CC3C
CCCCCCCCCCC3C33C
CCCCCCCCCCC333CC
CCCCCCCCCC3C3CCC
CCCCCCCCC33CCCCC
CCCCCCCC33CCCCCC
CCCCCCC33CCCCCCC
CCCCCCC3CCCCCCCC`],
  [wall2, bitmap`
7777777777777777
7777777777777777
3377777777777777
777777DDDD777777
7777DDD77D777777
777777777D777777
7777777777777777
7777777777777777
7777777777777777
777HHH7777777777
777H777777777777
7777H77777CCCCC7
7777777777777777
7777777777777777
7777777777733377
7777777777777777`],
  [wall3, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD444444DDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD44444DDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD4444DDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDD444DD
DDDDDDDDDDDDDDDD`],
  [wall4, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCC77CCCCCCCCCC
CCCC77CCCCCCCCCC
CCCC77CCCC77777C
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCC777777CCCCC
CCCCC777777CCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [wall5, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
F9FFFFFFFFFFFFFF
F6FFFFFFFFFFFFFF
F6FFFFFFFFFF6FFF
F6FFFFFFFFFF6FFF
FFFFF6FFFFFF6FFF
FFFFF6FFFFFF9FFF
FFFFF6FFFFFFFFFF
FFFFF9FFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [wall6, bitmap`
8888888888888888
8888888888888888
88FF888888888888
88FF888888888888
8888888888888888
888888888FF88888
888888888FF88888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
888FF88888888888
888FF88888888888
88888888888888F8
8888888888888888
8888888888888888`],
  [wall7, bitmap`
HHHHHHHHHHHHHHHH
H9HHHHHHHHHHHHHH
H9HHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHH9HHHHHHHHHH
HHHHH9HHHHHHHHHH
HHHH999HHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHH9HHH
HHHHHHHHHHHH99HH
H9HHHHHHHHHH99HH
HHHHHHHHHHHHHHHH`],
  [wall8, bitmap`
5555555555555555
5555545555555555
5555555555555555
4445555555555444
5555555555555555
5555555555555555
5555555555555555
5555555555545555
5555555555545555
5555455555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5455455555555555
5454555555555555`],
  [wall9, bitmap`
1222222222222212
2112222222222212
2221222222222222
2222122222222222
2222112222222222
2222212222222222
2222212222222222
1122211222222111
2122222111121122
2212222222211222
2211222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222212
2222222222222212`],
  [wall10, bitmap`
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
6666666666666666`]


)

setBackground("b")

setSolids([pocketnaut,bill,border,wall,wall2,wall3,wall4,wall5,wall6,wall7,wall8,wall9,wall10,rock,volcano,])


let level = 0;
const levels = [

  
    map`
aaaaaaaaaaaaaa
a............a
a............a
a............a
a............a
a............a
a............a
ap..........ea
aaaaaaaaaaaaaa
bbbbbbbbbbbbbb
bbbbbbbbbbbbbb`, // Level 1
  map`
oooooooooooooooooooo
oooooooooooooooooooo
oooooooooooooooooooo
okoooooooooooooooooo
wwwwwwwwwwwwoooooooo
w..........wwwoooooo
wp.....w.....wwooooo
wwwwwwwwwww...wwoooo
wwwwwwwwwww....wwwoo
wwwwwwwwwww.......eo
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww`, // Level 2
  map`
aaaaaaaaaaaaaa
aooooooooooooa
aooooooooooooa
woooooooooooow
weooooooooooow
wwwoooooooooow
wwooooooooooow
wwooooooooooow
wwooooooooooow
wwwooooooooopw
wwwwwwwwwwwwww`, // Level 3
 map`
aaaaaaaaaaaaaa
a............a
a............a
a............a
a............a
a............a
a............a
a............a
a.......e....a
ap...zzzz....a
aaaaaaaaaaaaaa`, // Level 4
   map`
aaaaaaaaaaaaaa
a............a
a............a
a............a
a...e........a
a...xx.......a
a....xx......a
a.....xx.....a
a......xx....a
ap.......xx..a
aaaaaaaaaaaaaa`, // Level 5
   map`
aaaaaaaaaaaaaa
a............a
a............a
a............a
a............a
a............a
a............a
a.....e......a
a....cc......a
ap..cc.cc....a
aaaaaaaaaaaaaa`, // Level 6
   map`
aaaaaaaaaaaaaa
a............a
a............a
a............a
a......e.....a
a...mmmm.....a
a..mm...m....a
a............a
a............a
ap...........a
aaaaaaaaaaaaaa`, // Level 7
   map`
aaaaaaaaaaaaaa
a............a
a............a
all..........a
a.llll.......a
a....ll......a
a.....l....e.a
a........lll.a
a.......ll...a
ap.....ll....a
aaaaaaaaaaaaaa`, // Level 8
   map`
aaaaaaaaaaaaaa
a............a
a............a
a............a
a............a
a............a
a......v.....a
a.....vv.....a
a.....v......a
ap..vvv.....ea
aaaaaaaaaaaaaa`, // Level 9
   map`
aaaaaaaaaaaaaa
a............a
a............a
a.jjjjjjjj...a
a........jj..a
a.........jj.a
a..........j.a
a............a
a............a
ap..........ea
aaaaaaaaaaaaaa`, // Level 10
   map`
aaaaaaaaaaaaaa
a............a
a............a
a............a
a.......mmm..a
a.....mm.....a
a..nnn.m.....a
annn.mmm.....a
a............a
ap..........ea
aaaaaaaaaaaaaa`, // Level 11
   map`
aaaaaaaaaaaaaa
a............a
a............a
a...v........a
a...v..vv....a
a...vv..v..v.a
a....v..v....a
a............a
a............a
ap..........ea
aaaaaaaaaaaaaa`, // Level 12
   map`
aaaaaaaaaaaaaa
a............a
a............a
a......e.....a
a.....gg.....a
a....ggggg...a
a.bbbb...g...a
a............a
a............a
ap...........a
aaaaaaaaaaaaaa`, // Level 13
   map`
aaaaaaaaaaaaaa
a............a
a............a
a............a
a............a
a............a
a.......e....a
a.....uuu....a
a....uu......a
ap...u.......a
aaaaaaaaaaaaaa`, // Level 14
   map`
aaaaaaaaaaaaaa
a............a
a..e.........a
a.xxx.x.x.x..a
a............a
a............a
a............a
a............a
a............a
ap...........a
aaaaaaaaaaaaaa`, // Level 15
   map`
aaaaaaaaaaaaaa
a............a
a............a
a............a
a........e...a
a........c...a
a....cccccc..a
a............a
a............a
ap...........a
aaaaaaaaaaaaaa`, // Level 16
   map`
aaaaaaaaaaaaaa
a............a
a............a
a............a
a............a
a............a
a............a
a............a
a............a
ap..........ea
aaaaaaaaaaaaaa`, // Level 17
   map`
aaaaaaaaaaaaaa
a............a
a............a
a...bbbb.....a
a.bb...b...e.a
a.b........z.a
a....zz....z.a
a.......zzzz.a
a............a
ap...........a
aaaaaaaaaaaaaa`, // Level 18
   map`
aaaaaaaaaaaaaa
a............a
a............a
a.......e....a
a....cccc....a
a...c...cc...a
a........c...a
a............a
a............a
ap...........a
aaaaaaaaaaaaaa`, // Level 19
   map`
aaaaaaaaaaaaaa
a............a
a............a
a............a
a...e........a
a...nnnn.....a
a......nn....a
a.......nn...a
a........n...a
a...........pa
aaaaaaaaaaaaaa`, // Level 20
   map`
aaaaaaaaaaaaaa
a............a
a............a
a............a
a.....v..v...a
a.....vvvv...a
a............a
a............a
a............a
ap..........ea
aaaaaaaaaaaaaa`, // Level 21
   map`
aaaaaaaaaaaaaa
a............a
a............a
a............a
a............a
a............a
a............a
a.......e....a
a..ww..ww..wwa
ap.ww..ww..wwa
aaaaaaaaaaaaaa`, // Level 22
   map`
aaaaaaaaaaaaaa
a............a
a............a
a......e.....a
a.....zz.....a
a....zz......a
a....z.......a
a....z.......a
a...zz.......a
ap.zz........a
aaaaaaaaaaaaaa`, // Level 23
    map`
aaaaaaaaaaaaaa
aooooooooooooa
aooooooooooooa
aooooooooooooa
aooooooooooooa
aooooooooooooa
aeoooooooooooa
ccccccccccuccc
c.....p......c
c...........dc
cccccccccccccc`, // 24 You have found Earth!
    map`
aaaaaaaaaaaaaa
abbbbbbbbbbbba
abbbbbooobbbba
abbbooobbbbbba
aobbbbbbbbbboa
abbobbpbbbbooa
abbbbbbbbbbbba
abbbboooobbboa
aobbbboobboooa
aobbbbbbboobba
aaaaaaaaaaaaaa`, // 25 Easter Egg -shhhh!
  map`
obbobbbbbbobbo
bbbbbbbbbbbbbb
bbbbbbooobbbbo
bbbbooobbbbbbb
bobbbbbbbbbbob
bbbobbfbbbboob
bbbbbbbbbbbbbb
obbbboooobbbob
oobbbboobbooob
bobbbbbbboobbb
booobbbbbobbbb` // 26 you died!
];


setMap(levels[level]);

setPushables({
  [pocketnaut]: [rock]
})


addText("Pocketnaut", {y: 2, color: color`9`});
addText("Adventures", {y: 4, color: color`1`});
addText("By:", {y: 6, color: color`1`});
addText("Volt the Robot", {y: 8, color: color`D`});
addText("Move using a,w,s,d", {y: 14, color: color`D`});

onInput("w", () => {
  getFirst(pocketnaut).y -= 1;
})
onInput("a", () => {
  getFirst(pocketnaut).x -= 1;
})
onInput("s", () => {
  getFirst(pocketnaut).y += 1;
})
onInput("d", () => {
  getFirst(pocketnaut).x += 1;
})

;

afterInput(() => {

  if ( getFirst(pocketnaut).x == getFirst(ship).x) {
    if (getFirst(pocketnaut).y == getFirst(ship).y) {
  //    level += 1;
      level =level +1
        clearText()
    //  setMap(levels[level]);
      setMap(levels[level]);
      ;
    }
  }


   if (level == 23){
    ;

    addText("You have reached", { x: 1, y: 3, color: color`9` });
   addText("Earth", { x: 3, y: 4, color: color`9` });

  }
if (level == 24){
    ;

    addText("You found", { x: 1, y: 3, color: color`9` });
   addText("Easter Egg", { x: 3, y: 4, color: color`9` });
 addText("Universe is yours", { x: 1, y: 10, color: color`9` });
  }


    }
  );
