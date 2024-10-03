/*
@title: aMAZE
@author: anabia
@tags: ['puzzle']
@addedOn: 2023-01-08
*/
const player = "p";
const wall = "w";
const goal = "g";
const melodyBg = tune`
214.28571428571428: c4~214.28571428571428,
214.28571428571428: b4~214.28571428571428,
214.28571428571428,
214.28571428571428: c4~214.28571428571428,
214.28571428571428: c5~214.28571428571428,
214.28571428571428: g5~214.28571428571428,
214.28571428571428: b5~214.28571428571428,
214.28571428571428: d5~214.28571428571428,
214.28571428571428: b5~214.28571428571428,
214.28571428571428: b4~214.28571428571428,
214.28571428571428: g4~214.28571428571428,
214.28571428571428: d4~214.28571428571428,
214.28571428571428: c5~214.28571428571428,
214.28571428571428: e5~214.28571428571428,
214.28571428571428: a5~214.28571428571428 + b4~214.28571428571428,
214.28571428571428,
214.28571428571428: a5~214.28571428571428,
214.28571428571428: b4~214.28571428571428,
214.28571428571428,
214.28571428571428: e5~214.28571428571428,
214.28571428571428: g4~214.28571428571428,
214.28571428571428: d4~214.28571428571428,
214.28571428571428: c4~214.28571428571428,
214.28571428571428: f4~214.28571428571428,
214.28571428571428: b4~214.28571428571428,
214.28571428571428: d5~214.28571428571428,
214.28571428571428: f5~214.28571428571428,
214.28571428571428: c5~214.28571428571428,
214.28571428571428: g5~214.28571428571428,
214.28571428571428: g4~214.28571428571428,
214.28571428571428: e4~214.28571428571428,
214.28571428571428: c4~214.28571428571428`


setLegend(
  [player, bitmap`
0000006116000000
0000060000600000
0000608888060000
000600CCCC006000
006888CCCC888600
088CCCCCCCCCC880
0CCCC0CCCC0CCCC0
0CCCC0CCCC0CCCC0
0CCCC0CCCC0CCCC0
0CCCC0CCCC0CCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCC000000CCCC0
0CCCC033330CCCC0
8CCCCCCCCCCCCCC8
8CCCCCCCCCCCCCC8` ],
  [wall, bitmap`
3333333333333333
9999999999999999
6666666666666666
DDDDDDDDDDDDDDDD
7777777777777777
5555555555555555
HHHHHHHHHHHHHHHH
8888888888888888
3333333333333333
9999999999999999
6666666666666666
DDDDDDDDDDDDDDDD
7777777777777777
5555555555555555
HHHHHHHHHHHHHHHH
8888888888888888`], 
  [ goal, bitmap`
000.......0.....
0.........0.....
00..000.000.....
0...0.0.0.0.....
000.0.0.000.....
................
................
8888888888888888
9999999999999999
6666666666666666
4444444444444444
7777777777777777
5555555555555555
HHHHHHHHHHHHHHHH
................
................`]
)

let level = 0;
const levels = [
                map`
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
pgwwwwwwww`,
                map`
p.w...g
.w....w
..www..
w..w...
...w...
.w....w`,
                map`
w...w.....p
w....w..www
w..w..w..w.
wwww...w...
......w.ww.
wwwww....w.
w...w.ww.w.
..w....w...
gwwww.wwwww`,
                map`
wwwwwwwwwwwww
w.gw........w
w.ww.ww.ww.ww
w..w.pw..w..w
w.wwwwww.ww.w
w...www..w..w
www.w...ww.ww
w...w....w..w
ww.wwwwwww..w
w.....w....ww
ww..w.......w
wwwwwwwwwwwww`,
                map`
wwwwwwwwwwwwwwwww
wpw..w.........ww
w....w.wwwwwww..w
w..www.w..w.gw.ww
ww.....w..ww.w..w
wwwwwwwww.w..ww.w
w..w.w.w..w.ww..w
w......w..w..w.ww
ww..w..w.www.w..w
w..www.......ww.w
w...w..w..w..w..w
w.wwwwwwwwwwww.ww
w..w...w...w.w..w
w....w...w......w
wwwwwwwwwwwwwwwww`,
                map`
wwwwwwwwwwwwwwww
w..w.....w...w.w
ww...w.w...w...w
w..wwwwwwwwww.ww
w.ww..w...w.w..w
w..ww...w...ww.w
w.ww..wwww.ww..w
w..w.wwg.w..ww.w
ww.w..ww...ww..w
w..w.ww..w..w.ww
w.ww..wwwwwww..w
w..ww...w.....ww
w..w..w...w.w..w
wpwwwwwwwwwwwwww`,
                map`
wwwwwwwwwwwwwwwwwwwwwwww
w.pw.......wgw...w.....w
w.wwwwww.w.w.w.w.w...w.w
w..w...w...w...w.......w
ww.w......wwwwwwwwwww..w
w..w.wwwwww...w.....ww.w
w.ww..ww.w..w....w.....w
w..w.ww..w....wwwwwwwwww
ww.w..w.ww.ww..w.......w
w..ww......w...www..w..w
w.ww...w...w...........w
w..w...w.w.w.w.....w...w
ww.wwwwwwwwwwwwwww.....w
w..w.w.........w.wwwww.w
w.ww.w.........w...w...w
w..w.wwwwwww...w......ww
w.................w.w..w
wwwwwwwwwwwwwwwwwwwwwwww`,
                map`
wwwwwwwwwwwwwwwwwwwwwwww
p.w..........w.......w.w
w.w.www.wwww.www.w...w.w
w.w...w.w..w.....w.www.w
w.ww..w..w.wwwwwww.....w
w.....wwww.w.w......w..w
w.www.w.w..w.ww..wwwwwww
www.www.ww.w.....w...w.w
w.w..w.......wwwww.w...w
w.......w..w.....w...w.w
w.w.wwwww.wwwww..www.w.w
w.w.w.w.w.w...w..w...w.w
w.w.w...www.w.wwww.w.w.w
w.w.w.w.....w......w.w.w
w.w.w.wwwwwwwwwwwwww.w.w
w.w.w.........w..w...w.w
w.w.wwwwww..w.ww.w..w..w
w.w.w...w...w.w.....w.ww
w.w...w...w.w.w..w.w..gw
wwwwwwwwwwwwwwwwwwwwwwww`,
                map`
wwwwwwwwwwwwwwwwwwwwww
wp.w......wg.........w
ww.w.w.w..wwwwwwwww.ww
w..ww..ww.w.w...w....w
w.ww..ww..w...w...w.ww
w..w...ww.w.wwwwwww..w
ww.w..ww..w...w...wwww
w..ww.w...w.w...w....w
w.w....w.wwwwwwwww.w.w
w...w..w..w......www.w
wwwwww.ww.ww.w.w.....w
w...w..w..w..wwwwww.ww
w......w.ww.ww.w..w..w
w..w..ww..w..w.ww.ww.w
w..w...ww.ww.w.w..w..w
wwwww..w..w..w.w.ww.ww
w..w..ww.ww.ww....w..w
w......w.....w..w....w
wwwwwwwwwwwwwwwwwwwwww`,
               
]

const currentLevel = levels[level];
setMap(currentLevel);
setSolids([ player, wall]);
    addText("Help the princess", { y: 5, color: color`2` });
    addText("get to her", { y: 6, color: color`2` });
    addText("coronation!", { y: 7, color: color`2` });
    addText("Press d to start.", { y: 8, color: color`2` });
  
const playback = playTune(melodyBg, Infinity);

onInput("s", () => {
  getFirst(player).y += 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});
onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

afterInput(() => {
  const numberCovered = tilesWith(goal, player).length;
  const targetNumber = tilesWith(goal).length;


  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      clearText()
      setMap(currentLevel);
    } else {
      setMap(map`
p`);
      addText("Welcome our", { y: 4,x:4, color:color`7` });
      addText("new queen!", { y: 5,x:5, color: color `H` });
      addText("SLAY!", { y: 6,x:8, color : color `2` });
      playback.end();

      const melodyWin = tune`
159.5744680851064: c4~159.5744680851064 + d4/159.5744680851064,
159.5744680851064: c4~159.5744680851064 + d4/159.5744680851064,
159.5744680851064: e4~159.5744680851064 + f4-159.5744680851064,
159.5744680851064: e4~159.5744680851064 + f4-159.5744680851064,
159.5744680851064: g4~159.5744680851064 + a4^159.5744680851064,
159.5744680851064: g4~159.5744680851064 + a4^159.5744680851064,
159.5744680851064: a4~159.5744680851064 + b4~159.5744680851064,
159.5744680851064: a4~159.5744680851064 + b4~159.5744680851064,
159.5744680851064: c5~159.5744680851064 + d5/159.5744680851064,
159.5744680851064: c5~159.5744680851064 + d5/159.5744680851064,
159.5744680851064: d5~159.5744680851064 + e5-159.5744680851064,
159.5744680851064: d5~159.5744680851064 + e5-159.5744680851064,
159.5744680851064: e5~159.5744680851064 + f5^159.5744680851064,
159.5744680851064: e5~159.5744680851064 + f5^159.5744680851064,
159.5744680851064: f5~159.5744680851064 + g5~159.5744680851064,
159.5744680851064: f5~159.5744680851064 + g5~159.5744680851064,
159.5744680851064: c4~159.5744680851064 + d4/159.5744680851064,
159.5744680851064: c4~159.5744680851064 + d4/159.5744680851064,
2234.0425531914893`
      playTune(melodyWin)
    }
  }
});

