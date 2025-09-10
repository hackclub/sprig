/*
@title: Phil_Tom_Bug
@description: Phil_Tom_Bug is an adventurous game about guiding the character Phil Tom Bug through various levels filled with obstacles to reunite with his mom. Players navigate through increasing challenges involving moving enemies, pushable boxes, and traps set within intricate environments. The game explores the life story of Phil Tom Bug, highlighting both the beginning and the end of his life within its gameplay levels.
@author: Alexis, Westmoreland, Joy
@tags: []
@addedOn: 2024-05-20
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@img: ""
*/

/*
I want to show the story of Phil Tom Bug, one of my OG characters. 
This game will show the beginning and the end of his life as he gets older
What i want to acomplish:

keys and locks..
moving enemeys..
push boxes..
portels..
time limit..
fragle tiles..
two player..
sliding movement..
traps 

*/

//characters
const phil = "p";
const mom = "m";
const evilPhil = "e";
const teacher = "q";
const babyPhil = "b";
const teenPhil = "n";
const lockers = "l";
const reflection = "r";
const ladybug = "a";
const caterpiller = "c";
const background = "k";
const wall = "z";
const brown = "x";
const black = "g";
const blue = "u";
const lightBlue = "h";
const white = "t";
const red = "d";
const green = "v";

//music
const gameMusic = tune`230.76923076923077: B4^230.76923076923077,
230.76923076923077: D5^230.76923076923077 + B4/230.76923076923077,
230.76923076923077: F5^230.76923076923077 + D5/230.76923076923077,
230.76923076923077: B4^230.76923076923077 + F5/230.76923076923077,
230.76923076923077: D5^230.76923076923077 + B4/230.76923076923077,
230.76923076923077: F5^230.76923076923077 + D5/230.76923076923077,
230.76923076923077: B4^230.76923076923077 + F5/230.76923076923077,
230.76923076923077: D5^230.76923076923077 + B4/230.76923076923077,
230.76923076923077: F5^230.76923076923077 + D5/230.76923076923077,
230.76923076923077: C5^230.76923076923077 + F5/230.76923076923077,
230.76923076923077: E5^230.76923076923077 + C5/230.76923076923077,
230.76923076923077: G5^230.76923076923077 + E5/230.76923076923077,
230.76923076923077: G5/230.76923076923077,
230.76923076923077: D4-230.76923076923077,
230.76923076923077: F4-230.76923076923077 + D4~230.76923076923077,
230.76923076923077: A4-230.76923076923077 + F4~230.76923076923077,
230.76923076923077: D4-230.76923076923077 + A4~230.76923076923077,
230.76923076923077: F4-230.76923076923077 + D4~230.76923076923077,
230.76923076923077: A4-230.76923076923077 + F4~230.76923076923077,
230.76923076923077: D4-230.76923076923077 + A4~230.76923076923077,
230.76923076923077: F4-230.76923076923077 + D4~230.76923076923077,
230.76923076923077: A4-230.76923076923077 + F4~230.76923076923077,
230.76923076923077: E4-230.76923076923077 + A4~230.76923076923077,
230.76923076923077: G4-230.76923076923077 + E4~230.76923076923077,
230.76923076923077: B4-230.76923076923077 + G4~230.76923076923077,
230.76923076923077: B4~230.76923076923077,
230.76923076923077: F4~230.76923076923077,
230.76923076923077: G4~230.76923076923077 + B4-230.76923076923077,
230.76923076923077: B4-230.76923076923077,
230.76923076923077: D5/230.76923076923077,
230.76923076923077: D5/230.76923076923077 + B4^230.76923076923077,
230.76923076923077: B4^230.76923076923077`;
const musicForever = playTune(gameMusic, Infinity )
const myTune = tune`
163.04347826086956,
163.04347826086956: D4^163.04347826086956 + E4-163.04347826086956,
163.04347826086956,
163.04347826086956: F4^163.04347826086956 + G4-163.04347826086956,
163.04347826086956: F4^163.04347826086956 + G4-163.04347826086956,
163.04347826086956: A4^163.04347826086956 + B4-163.04347826086956,
163.04347826086956: C5^163.04347826086956 + D5-163.04347826086956,
163.04347826086956: C5^163.04347826086956 + D5-163.04347826086956,
163.04347826086956: C5^163.04347826086956 + D5-163.04347826086956,
163.04347826086956: A5^163.04347826086956 + B5-163.04347826086956,
163.04347826086956: A5^163.04347826086956 + B5-163.04347826086956,
163.04347826086956: A5^163.04347826086956 + B5-163.04347826086956,
163.04347826086956,
163.04347826086956: B4/163.04347826086956 + F4-163.04347826086956,
163.04347826086956: B4/163.04347826086956 + F4-163.04347826086956,
163.04347826086956: B4/163.04347826086956 + F4-163.04347826086956,
163.04347826086956: B4/163.04347826086956 + F4-163.04347826086956,
163.04347826086956: B4/163.04347826086956 + F4-163.04347826086956,
163.04347826086956: B4/163.04347826086956 + F4-163.04347826086956,
163.04347826086956: B4/163.04347826086956 + F4-163.04347826086956,
163.04347826086956: B4/163.04347826086956 + F4-163.04347826086956,
163.04347826086956: B4/163.04347826086956 + F4-163.04347826086956,
163.04347826086956: B4/163.04347826086956 + F4-163.04347826086956,
163.04347826086956: B4/163.04347826086956 + F4-163.04347826086956,
163.04347826086956: E5-163.04347826086956 + A5/163.04347826086956,
163.04347826086956: E5-163.04347826086956 + A5/163.04347826086956,
163.04347826086956: E5-163.04347826086956 + A5/163.04347826086956,
163.04347826086956: E5-163.04347826086956 + A5/163.04347826086956,
163.04347826086956: E5-163.04347826086956 + A5/163.04347826086956,
163.04347826086956: E5-163.04347826086956 + A5/163.04347826086956,
326.0869565217391`

setBackground(background);

setLegend(
  [ phil, bitmap`
................
................
................
..444.....444...
....4.....4.....
....4444444.....
....4224224.....
....4024024.....
....4224224.....
....4444444.....
.......4........
....4444444.....
......444.......
......444.......
......4.4.......
.....44.44......` ],
  [ mom, bitmap`
................
................
................
..444.....444...
....4CCCCC4.....
...C4444444C....
...C4224224C....
...C4024024C....
...C4224224C....
.C.C4444444C.C..
.CCC...4...CCC..
....4774774.....
......777.......
.....77777......
......4.4.......
.....44.44......`],
  [ evilPhil, bitmap`
................
................
................
..333.....333...
....3.....3.....
....3333333.....
....3CC3CC3.....
....3CC3CC3.....
....3023023.....
....3333333.....
.......3........
....3333333.....
......333.......
......333.......
......3.3.......
.....33.33......`],
  [ teacher, bitmap`
................
................
................
..444.CCC.444...
....4.CCC.4.....
....4444444.....
....4HH4HH4.....
...C4024024C....
...C4224224C....
..CC4444444CC...
.......4........
....44H4H44.....
......HHH.......
.....HHHHH......
......4.4.......
.....44.44......`],
  [ babyPhil, bitmap`
................
................
................
..444.....444...
....4222224.....
...244444442....
...242242242....
...240240242....
...242242242....
...244444442....
...222222222....
.....44444......
.......4........
......222.......
......424.......
.....44.44......`],
  [ teenPhil, bitmap`
................
................
................
..444.....444...
....4000003.....
....0000004.....
...00000DD4.....
...00004203.....
...04224224.....
....4344344.....
.......4........
....4404044.....
......000.......
......000.......
......0.0.......
.....44.44......`],
  [ lockers, bitmap`
1111111L1111111L
1LLLLL1L1LLLLL4L
1111111L1111111L
1LLLLL1L1LLLLL1L
1111111L1111111L
1117111L4441111L
1771111L1413333L
1711111L1113113L
1771111L1113333L
1111161L1113113L
1111161L1111111L
1611661L1111111L
1611111L111H1H1L
1611111L11HHHHHL
1111111L111HHH1L
1111111L1111H11L`],
  [ reflection, bitmap`
....000000777722
....000000777722
....00..00777222
....00..00772227
......0000772227
4.....00..772277
44444400..442244
42242200..742247
4204204...742447
42242200..722442
4444444...722427
..444.....744247
4444444...222477
..444.....224477
..4.4.....224477
.44.44....244447`],
  [ ladybug, bitmap`
................
................
................
................
....000..000....
......0..0......
......0..0......
......0000......
......L00L......
.....300003.....
...0000000000...
....30000003....
...0000000000...
....30000003....
.....300003.....
....000..000....`],
  [caterpiller, bitmap`
................
................
................
................
................
......DDD.......
......FDF.......
......DDD.......
......DDD.......
......444.......
......DDDD......
.......444......
.......DDD......
...D4D44DD......
...D4D4D4D......
...D4D4DD4......`],
  [ background, bitmap`
H957H957H957H957
H957H957H957H957
H957H957H957H957
H957H957H957H957
H957H957H957H957
H957H957H957H957
H957H957H957H957
H957H957H957H957
H957H957H957H957
H957H957H957H957
H957H957H957H957
H957H957H957H957
H957H957H957H957
H957H957H957H957
H957H957H957H957
H957H957H957H957`],
  [wall, bitmap`
CC0CCCC0CCCC0CCC
CC0CCCC0CCCC0CCC
0000000000000000
CCC0CCCC0CCCC0CC
CCC0CCCC0CCCC0CC
0000000000000000
CC0CCCC0CCCC0CCC
CC0CCCC0CCCC0CCC
0000000000000000
CCC0CCCC0CCCC0CC
CCC0CCCC0CCCC0CC
0000000000000000
CC0CCCC0CCCC0CCC
CC0CCCC0CCCC0CCC
0000000000000000
CCC0CCCC0CCCC0CC`],
  [ brown, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [black, bitmap`
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
  [blue, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [lightBlue, bitmap`
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
7777777777777777`],
  [white, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [red, bitmap`
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
3333333333333333`],
  [ green, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`]
);

setSolids([wall, phil, lockers, black])

let level = 0;

const levels = [

//story page
  map`
zzzzm
zzzzz
zzzzz
bzzzz`,
//levels
  map`
lllllllllll
.cl..cla...
p.l...l...m
....l...l..
...al...l..
zzzzzzzzzzz`,//1
  map`
llllllll......g
.l.l...lll.g.gm
.lal.l......g.g
pl.l.lclllll..l
.l.l.l.l..cl..l
.....l.l.l.l..l
.lllll.lll.l..l
...a..........l
lllllllllllllll`,//2
  map`
llll.al........
..qll.llllllllc
.l.............
plllllllllllll.
...............
.llllllllc....m
........llllll.
.a.............
lllllllllllllll`,//3
  map`
llllllllll....a
...lal...l.lcl.
pl.l.l.l.l.l.l.
.l.l.l.l.l.l.l.
.l...lalll.l.l.
.c.......l.l.l.
llllllll.l.l.l.
l......c...lll.
llllllllll....m`,//4
  map`
pl...........a.
.l.zzz.zzlzzzz.
.l.lcz......cz.
.l.z.zzzzzzz.z.
.l.z.......l.z.
.zzzzz.zzz.z.z.
.a.....laz.z.z.
.zlzzz.z.zcz..m
.g.............`,//5
  map`
........az.z.g.
.zzzzzzz.z.z.gm
.z.....z.zcz.g.
.zzzzz.z.z.z..z
.a...z.z.z.z..z
zzzzzz.....z..z
p......z.z.z..z
.zzzzzzz.z....z
zz....c..zzzzzz`,//6
  map`
zzzzzzzzzzzzzzz
zvzvzvzvzvzvzhm
z.z.z.z.z.z.z.z
zgzgzgzgzgzgz.z
p.............z
zgzgzgzgzgzgz.z
z.z.z.z.z.z.z.z
zvzvzvzvzvzvz.z
zzzzzzzzzzzzzzz`,//7
  map`
z.z.z.z.............
z.z.z.z.....zz.zzzz.
z.zzgggzzzz.z.......
....gpg.....z.zzzzz.
.zzzgggzzzz.z.z.....
.z..z.z.......z.zzz.
.z.......zzzz.z.z...
.zzzzzzz.z....z.z...
.......z.z.zzzz.z..m`,//8
  map`
llllllllllg.lll
.....l....g....
plll.l.lllg.lll
.l.l.l.l..g....
.l........g.lll
.l.lllllllg....
.l.l......g.lll
.....llll.g...m
llll......g.lll`,//9
  map`
a.........l..a.
zzzzzzzzz.llll.
p..............
.zzzzzzzz.llll.
......c...z....
.zzzzzzzzzz.l.m
..........c.l..
l.....lllll.lll
.c...a.........`,//10
  map`
zzzzzzzzzzzzz.m
.....z.g.......
.zzz.z.zzzazz..
pz...a......z..
.z.zzzzzzzz.z..
.z..........z..
.zzzzzzzzzzzzgg
...............
zzzazzzzzzzzzzz`,//11
  map`
lllllllllllllll
laa...........l
lllllllllllll..
l.aa...a......m
lll.l.l.l.lll..
l.l.l.l.l.l.lgl
p.............l
l.lal.laa.a.l.l
lllllllllllllll`,//12
  map`
lllllllllllll..
l.l.........l.m
l.l.llllll..l..
l.l.........l..
l.l.........l..
l.lllllll......
l.........llll.
l..............
p.lllllllllll..`,//13
 
]

setMap(levels[level]);

//level diolog 
if(levels[0]){
  addText("please help Phil", { x: 1, y: 2, color: color`2`})
  addText("Tom Bug get back", { x: 1, y: 3, color: color`2`})
  addText("to his mom",{ x: 1, y: 4, color: color`2`})
  addText("use WASD to ",{ x: 1, y: 6, color: color`2`})
  addText("guide him ",{ x: 1, y: 7, color: color`2`})
  addText("press 'i'",{x: 5, y: 10, color: color`2`})
  addText("to continue", {x: 4, y: 11, color: color`2`})
}

setPushables({
  [ phil ]: [black]
})

//movement
onInput("w", () => {
  getFirst(phil).y -= 1;
});
onInput("a", () => {
  getFirst(phil).x -= 1;
});
onInput("s", () => {
  getFirst(phil).y += 1; 
});
onInput("d", () => {
  getFirst(phil).x += 1;
});


onInput("i", () => {
  clearText();
 setMap(levels[1])
});

afterInput(() => {
   const goalsCovered = tilesWith(phil,mom); 
   if (goalsCovered.length >= 1) {
        level = level + 1;
      
        if (level < levels.length) {
            setMap(levels[level]);
        } else 
            addText("you win!", { y: 4, color: color`4` });
            musicForever.end()
            playTune(myTune);
        };
    });

  const trapCovered = tilesWith(phil, ladybug);
  
  if ( trapCovered.length > 0) {
    setMap(levels[1]);
  };
  const trapCoveredCat = tilesWith(phil, caterpiller);
  

  if ( trapCoveredCat.length > 0) {
    setMap(levels[level]);
  };
const trapSet = tilesWith(black, green);
  
  if ( trapSet.length > 11) {
    getFirst(lightBlue).remove();

  };
    



