/*
@title: Treasure_Hunt
@author: Manikandan_M
@tags: ['strategy']
@addedOn: 2022-09-28
*/

const player = "p";
const box = "b";
const wall = "w";
const treasure = "t";
const box2 = "k";

setLegend(
  [ player, bitmap`
................
......000.......
.....0...0......
......0.0.......
.......0........
......000.......
.....0.0.0......
....0..0..0.....
...0...0...0....
.......0........
.......0........
......0.0.......
.....0...0......
....0.....0.....
................
................`],
  [ box, bitmap`
0300000000000030
3300000000000033
0000000000000000
0000000000000000
0000000000000000
00000H0000H00000
0000000000000000
0000000HH0000000
0000000HH0000000
0000000000000000
00000H0000H00000
0000000000000000
0000000000000000
0000000000000000
3300000000000033
0300000000000030`],
  [ wall, bitmap`
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
  [ treasure, bitmap`
CCCCCCCCCCCCCCCC
CCCC99999999CCCC
CCC9CCCCCCCC9CCC
CC9CCCCCCCCCC9CC
C99999999999999C
C9CCCCCCCCCCCC9C
C9CCCCCCCCCCCC9C
C9CCCCC00CCCCC9C
C9CCCCC00CCCCC9C
C9CCCCCCCCCCCC9C
C9CCCCCCCCCCCC9C
C9CCCCCCCCCCCC9C
C9CCCCCCCCCCCC9C
C9CCCCCCCCCCCC9C
C99999999999999C
CCCCCCCCCCCCCCCC`],
  [ box2, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`]
);

setSolids([player,box,wall,box2]);

let level = 0;
const levels = [
  map`
wwwwwwwwwwwwwwwwwwww
wb.....w.ww..b...w.w
w....w.w.w...b...w.w
w..www...b.wwww..w.w
w..w.....b....w..b.w
w.bw.w..w..b..b..b.w
w..b.w.www.bwww.w..w
w..w.w..b...w.w.w..w
wpww.w.bwwwww.w.w.ww
www..wb.ww....w.wbww
w....wwww..w.bwbw..w
w....b.....w....w.tw
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwww.......
wwww.pwwwwwwwww
w..w..w.......w
w..w..wwwbbb..w
w......www..w.w
www....b.w..w.w
w.w....w....w.w
w...b.wwww..btw
w..w....b..wb.w
w.www..www.w..w
w......w.b.w..w
w........b.w.ww
w..www...w.wwww
w..w.....b..w.w
w.ww.....w.ww.w
wwwwwwwwwwwwwww`,
  map`
................
...kbkkkkkkkk...
kkbkkkb.kk..kkk.
k.......k.b...k.
k.kkkkkbk.b.k.k.
k.k...k.k.kkk.k.
k.k...kp..k.b.k.
k.k...kkkkk.b.k.
..k..b....k.kkk.
bkkkkkkkk.k.k...
.kkk....b.k.k...
..k...k.k.k.k...
..b...k.k.b.k...
kkkkkkk.t...k...`,
  map`
t....kkkkk.........k
k..k.....k.........k
kk..kkkk.kkkk.b..b.k
k.k....kb...k......k
k..k..kk....k.b..b.k
k...k.kkkkbbk..bb..k
kk.k.b.kkk..k......k
kk..k.kkkk..k......k
kk.k.b..kk..k......k
kk..k..kkk..kkkkkkkk
k..k.b..kk..........
k...k.k..k......b..b
k..k.b...b..kkkkkkkp`,
  map`
..............kk..bp
..............kk...b
kkkkkbwwwww...kkbkkk
k.b.......w...kk.k..
k.k...wwwbww..kk.b..
k.kk....w..w.bkk.b..
k.kkkk..w..w.kkkkk..
k....kkkw.tw.k...k..
k...b..kwwwwbkkkkk..
kkkkk..kb.k......b..
....kbbkkkkb.....b..
....k.......kkkkkkkk
....k.......k.......
....kkkkkkkkk.......`,
  map`
wwwwwwwwwwwwwwwwwwww
w..................w
w..................w
w..w.....w.w.w...w.w
w..w.....w.w.ww..w.w
w..w..w..w.w.w.w.w.w
w..w.w.w.w.w.w..ww.w
w..ww...ww.w.w...w.w
w..................w
w..................w
w..................w
w..................w
wwwwwwwwwwwwwwwwwwww`,
];

setMap(levels[level]);

setPushables({
  [ player ]: [ box ],
});

onInput("s", () => {
  getFirst(player).y += 1
});
onInput("w", () => {
  getFirst(player).y -= 1
});
onInput("a", () => {
  getFirst(player).x -= 1
});
onInput("d", () => {
  getFirst(player).x += 1
});

afterInput(() => {

  //=========================
  const treasuree = tilesWith(treasure).length;
  const targett = tilesWith(treasure, player).length;
  if (treasuree === targett) 
  {
    level = level + 1;
    const currentLevel = levels[level];
  if (currentLevel !== undefined) 
  {
      setMap(currentLevel);
    } 
  }

})


onInput("j", () => {
  setMap(levels[level]);
});

