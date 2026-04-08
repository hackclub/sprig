/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Michael Run
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const kill = "k"
const wall = "w"
const goal = "g"
const push = "f" 
const wall2 = "a"
const kill2 = "m"
const heavenlyMelody = tune`
132.7433628318584,
132.7433628318584: D4^132.7433628318584 + C5~132.7433628318584,
132.7433628318584: E5-132.7433628318584 + E4^132.7433628318584 + D5/132.7433628318584 + A4-132.7433628318584 + C5~132.7433628318584,
132.7433628318584: F5~132.7433628318584 + B4~132.7433628318584,
132.7433628318584: C5~132.7433628318584 + B4~132.7433628318584,
132.7433628318584: F5-132.7433628318584 + D4^132.7433628318584 + E5/132.7433628318584 + C5~132.7433628318584,
132.7433628318584: E4^132.7433628318584 + G5~132.7433628318584 + C5~132.7433628318584,
132.7433628318584,
132.7433628318584: E5-132.7433628318584 + D5/132.7433628318584 + G4-132.7433628318584,
132.7433628318584: D4^132.7433628318584 + F5~132.7433628318584,
132.7433628318584: E4^132.7433628318584,
132.7433628318584: F5-132.7433628318584 + E5/132.7433628318584 + B4~132.7433628318584,
132.7433628318584: G5~132.7433628318584 + B4~132.7433628318584,
132.7433628318584,
132.7433628318584: E5-132.7433628318584 + E4^132.7433628318584 + D5/132.7433628318584,
132.7433628318584: D4^132.7433628318584 + E5~132.7433628318584 + A4-132.7433628318584 + B4~132.7433628318584,
132.7433628318584,
132.7433628318584: F5/132.7433628318584 + G5-132.7433628318584,
132.7433628318584: E4^132.7433628318584 + F5~132.7433628318584,
132.7433628318584: E5-132.7433628318584 + D4^132.7433628318584 + D5/132.7433628318584 + B4-132.7433628318584,
132.7433628318584: D5~132.7433628318584,
132.7433628318584: F4^132.7433628318584,
132.7433628318584: F5-132.7433628318584 + G4^132.7433628318584 + E5/132.7433628318584 + B4~132.7433628318584,
132.7433628318584: G5~132.7433628318584 + B4~132.7433628318584,
132.7433628318584: B4~132.7433628318584,
132.7433628318584: D5-132.7433628318584 + C5/132.7433628318584 + B4~132.7433628318584,
132.7433628318584: F4^132.7433628318584 + B4~132.7433628318584,
132.7433628318584: G5-132.7433628318584 + D4^132.7433628318584 + F5/132.7433628318584,
132.7433628318584: F5~132.7433628318584,
132.7433628318584: F4^132.7433628318584,
132.7433628318584: E5-132.7433628318584 + A4^132.7433628318584 + D5/132.7433628318584 + C5~132.7433628318584,
132.7433628318584: E4^132.7433628318584 + D4^132.7433628318584 + F5~132.7433628318584 + G4-132.7433628318584`
const playback = playTune(heavenlyMelody, Infinity);

setLegend(
  [ player, bitmap`
................
..CCCCCCCCCC....
..CCCCCCCCCC....
..222222222222..
..222022220222..
..222222222222..
..220000000222..
..220000000222..
....22222222....
......4444...0..
......43D4..0...
....004H9400....
...0..4444......
...0..4444......
......0..0......
......0..0......` ],
  [ kill, bitmap`
3333333333333333
3333330000033333
9999902202209999
9999903203209999
6666606660006666
6666606666066666
4444400000004444
4444002222000444
7777002222000777
7777002222000777
HHHH002222000HHH
HHHHH0222220HHHH
3333300000003333
3333666336663333
9999666996669999
9999999999999999` ],
   [ wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1113333177771111
1133333177777111
1133223176677111
1133223176677111
1133333177777111
1133333172277111
1133333172277111
1113333177771111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],
  [ goal, bitmap`
5555555555555555
5555555555555555
5555552555555555
5525525555555555
5555525555555555
5555525555555555
5525552555555555
5555555555555555
5555555555555555
5522222222555555
5555555555555555
5522222222222555
5555555555555555
5522225555555555
5555555555555555
5555555555555555` ],
   [ push, bitmap`
0000000000000000
0000444444440000
0004444444444000
0044444444444400
0444444444444440
0444442222444440
0444423223244440
0444422222244440
0444423223244440
0444442332444440
0444444224444440
0444442222444440
0044442222444400
0004422222244000
0000422222240000
0000000000000000` ],
   [ wall2, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLL77LLLLLLL
LLLLLLL77LLLLLLL
LLLLLL7777LLLLLL
LLLLLL7777LLLLLL
LLLLLLL7777LLLLL
LLLLL7LL777LLLLL
LLLL77777777LLLL
LLL7777777777LLL
LLL77777777777LL
LL77777LL7777LLL
LL7777LLLL77LL7L
L77777LLLL77777L
L7777LLLLLL7777L
LLLLLLLLLLLLLLLL` ],
  [kill2, bitmap`
HHHHHH0222222222
HHHHHH0222222222
HHH0HH0222202222
HHH0HH0222202222
HHHHHH0222222222
HHHHHH0222222222
HHHHHH0222222222
HHHHHH0222222222
HHHHHH0002222222
HHHHHHHH02222222
HHH0HHHH02222022
HHH0HHHH02222022
HHHH000000000222
HHHHHHHH02080222
HHHHHHHH02202222
HHHHHHHH02222222` ]
);

level = 0

levels = [
   map`
p`,
  map`
wwwwww
www.gw
ww..ww
w.mwww
wpwwww
wwwwww`,
  map`
wkwwww
w....w
w.ww.w
w.k..w
wpwgkw
wwwwww`,
  map`
kkkkkkkkkkkkkkkkkkkkkkkk
k...k...k...k...k...k.gk
k.w.k.w.k.w.k.w.k.w.k.wk
k.w.w.w.k.k.k.k.k.w.w.wk
k.w.w.w.k.k.k.k.k.w.w.wk
k.w.w.k.w.k.k.k.w.k.w.wk
k.w.w.k.w.k.k.k.w.k.w.wk
kpk...k...k...k...k...kk
kkkkkkkkkkkkkkkkkkkkkkkk`,
  map`
wwwwwwww
w.ff...w
w.ww.www
w.ww.www
w.ww.www
wpww..gw
wwwwwwww`,
  map`
wwwwwwww
wwwwwwww
wwwwwgww
w.wkk.kw
wff....w
wpkwwwww
wwwwwwww`,
  map`
kkkkkkkkk
kkkkkwwkk
........k
k.kkkk..k
k....k.kk
kkkk.k.kk
k....k.kk
k.kkkk.kk
k....k.kk
kkkk.k.kk
k....k.kk
k.kkkk.kk
k....k.kk
kkkk.k.kk
k....k.kk
k.kkkk.kk
k....k.kk
kkkk.k.kk
k....k.kk
k.kkkk.kk
k...gk.kk
kkkkkk.kk
kpf....wk
kkkkk..wk
kkkkkkkkk`,
  map`
kkkkkkkk
.....f.w
w.wwww.w
w.wkgk.w
w....k.w
wwwwww.w
w.pf....`,
  map`
kwwwww
www.gw
ww..ww
w..www
wpwwww
wwwwww`,
  map`
kkkkww
kkw.gw
kw..ww
w..www
wpwwww
wwwwww`,
  map`
kkkkkk
kkk.gw
kk..ww
k..www
kpwwww
kwwwww`,
  map`
kkkkkk
kkk.gk
kk..kk
k..kkk
kpkkkk
kkkkkk`,
  map`
wwwwwwwwwwwwwww
ww...k...k...ww
ww.k...k...k.ww
w..aaaaaaaaa..w
..aaaaaaaaaaa..
paaaaaaaaaaaaag
aaaaaaaaaaaaaaa`,
  map`
aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
a.....w...w...w...w...w.....a
aww.w.w.w.w.w.w.w.w.w.w.www.a
a...w.w.w.w.w.w.w.w.w.w.w...a
a.www...w...w...w...w...w.wwa
a...wwwwwwwwwwwwwwwwwwwww...a
aww.w...................www.a
a...w.kkkkkkkkkkkkkkkkk.w...a
a.www.k...............k.w.wwa
a...w.k.kkkkkkkkkkkkk.k.w...a
aww.w.k.k...........k.k.www.a
a...w.k.k.kkkkkkkkk.k.k.w...a
a.www.k.k.k.......k.k.k.w.wwa
a..gw.k.k.k.kkk.k.k.k.k.w...a
awwww.k.k.k.k...k.k.k.k.www.a
a.....k.k.k.k.p.k.k.k...w...a
a.www.k.k.k.k...k.k.k.k.w.wwa
a...w.k.k...kkkkk.k.k.k.w...a
aww.w.k.k.k.......k.k.k.www.a
a...w.k.k.kkkkkkkkk.k.k.w...a
a.www.k.k...........k.k.w.wwa
a...w.k.kkkkkkkkk.kkk.k.w...a
aww.w.k...............k.www.a
a...w.kkkkkkkkkkkkkkkkk.w...a
a.www...................w.wwa
a...wwwwwwwwwwwwwwwwwwwww...a
aww.w...w...w...w...w...www.a
a...w.w.w.w.w.w.w.w.w.w.w...a
a.www.w.w.w.w.w.w.w.w.w.w.wwa
a.....w...w...w...w...w.....a
aaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
  map`
aaaaaaaaaaaaakf
pf..ag......afk
aa..aaaaaaa.akf
aaa.aa.aaaa.afk
aaa.aa.f.....kf
aa..aa.aaaaaafk
aa.aaafaaaaaakf
aa.f....afkfkfk`,
  map`
aaaaaaaaaaaaaaa
ak..kkkakkkkkka
ak..........kka
ak.kkkkakk..kka
ak....gakk.kkka
ak.kkkkakkfkkka
aaaaaaaaaa.aaaa
a......a......a
a.kkkk.a.kkkkka
a.kkkk...kkkkka
a.kkkkkakkkkkka
apkkkkkakkkkmka
aaaaaaaaaaaaaaa`,
    map`
aaaaaaaaaaa
aggggggggga
aggggggggga
aggggggggga
aggggggggga
aggggggggga
aaaaakaaaaa
a...a.....k
a.a.k.aak.a
a.a.....aga
a.a.k.aak.a
apa.a.....k
aaaaakaaaaa`,
   map`
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
ag....k...aaaa.....aaaa.....aaaa.....aaaa...aa
aaaaa.a.k.aaaa.aaa.aaaa.aaa.aaaa.aaa.aaaa.k.aa
aaaaa........f........f........f........f.k.pa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
  map`
p`,
  map`
m`,
  
];

setMap(levels[level])
setSolids([player, wall, wall2, push])

if (!gameStarted) {
  addText("    MICHAEL RUN", {
    x: 1,
    y: 1,
    color: color`0`
  })
  addText(" Press (L) to Start", { x: 0, y: 14, color: color`7`})
  onInput ("l", () => {
    level = 1;
    setMap(levels[level])
    clearText()
  })
};
var gameStarted = false

setPushables({
   [player]: [push],
  [push]: [push]
});

 onInput("w", () => {
    getFirst(player).y -= 1
  })
  onInput("a", () => {
    getFirst(player).x -= 1  
  })
  onInput("s", () => {
    getFirst(player).y += 1
  })
  onInput("d", () => {
    getFirst(player).x += 1
  }) 
var cLevel = 1;

  

afterInput(() => {
  const atFlag = tilesWith(goal, player).length;
  const atDeath = tilesWith(kill, player).length;
  

  if(atFlag == 1) {
    level = level + 1;
    setMap(levels[level])
  }
   if(atDeath == 1) {
    setMap(levels[level])
  }
   if(level == 18) { 
     clearText();
     addText(" Thanks for Playing!", { x: 0, y: 0, color: color`7`});
      addText(" Now go Play", { x: 0, y: 1, color: color`7`});
      addText(" The Other", { x: 0, y: 2, color: color`7`});
     addText(" Michael Games", { x: 0, y: 3, color: color`7`});
     addText(" For a Surprise....", { x: 0, y: 13, color: color`H`});
 addText(" Press (J)", { x: 0, y: 14, color: color`H`});
     onInput ("j", () => {
    level = 19;
    setMap(levels[level])
    clearText();
     })
   }
   if(level == 19) {
     addText(" BAHHHH!", { x: 0, y: 0, color: color`7`});
     addText(" unix jumpscare..", { x: 0, y: 14, color: color`7`});
   }
})