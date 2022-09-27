/*
@title: Treasure_Hunt
@author: Manikandan_M
*/

const player = "p";
const box = "b";
const wall = "w";
const treasure = "t";
const key = "k";

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
  [ key, bitmap`
......66666.....
.....66...66....
.....66...66....
.....66...66....
.....66...66....
.....6666666....
.....6666666....
........6.......
........6.......
.....6666.......
.....6666.......
........6.......
........6.......
........6.......
........6.......
........6.......`]
);

setSolids([player,box,wall]);

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

  //===========FOLDER TO TRASH SCRIPT==============
  const dustbins = tilesWith(treasure).length;
  const targett = tilesWith(treasure, player).length;
  if (dustbins === targett) 
  {
    level = level + 1;
    const currentLevel = levels[level];
  if (currentLevel !== undefined) 
  {
      setMap(currentLevel);
    } 
  }

  
})


