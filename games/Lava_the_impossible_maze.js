/*
@title: Lava the impossible maze
@author: Augustin Z Youtube-@Aaron Dragonheart
@tags: ['puzzle','timed']
@addedOn: 2022-12-21
Inspiration: Game: Treasure_hunt
*/
const melody = tune`
205.4794520547945: c4~205.4794520547945 + d5^205.4794520547945,
205.4794520547945: c4~205.4794520547945,
205.4794520547945: c4~205.4794520547945 + a5^205.4794520547945,
205.4794520547945: c4~205.4794520547945,
205.4794520547945: c4~205.4794520547945 + d5^205.4794520547945,
205.4794520547945: c4~205.4794520547945 + f5^205.4794520547945,
205.4794520547945: c4~205.4794520547945 + a5^205.4794520547945,
205.4794520547945: c4~205.4794520547945,
205.4794520547945: c4~205.4794520547945 + b5^205.4794520547945,
205.4794520547945: c4~205.4794520547945,
205.4794520547945: c4~205.4794520547945 + a5^205.4794520547945,
205.4794520547945: c4~205.4794520547945 + f5^205.4794520547945,
205.4794520547945: c4~205.4794520547945 + e5^205.4794520547945,
205.4794520547945: c4~205.4794520547945,
205.4794520547945: c4~205.4794520547945,
205.4794520547945: c4~205.4794520547945 + e5^205.4794520547945,
205.4794520547945: c4~205.4794520547945 + c5^205.4794520547945,
205.4794520547945: c4~205.4794520547945,
205.4794520547945: c4~205.4794520547945,
205.4794520547945: c4~205.4794520547945,
205.4794520547945: c4~205.4794520547945 + e5^205.4794520547945,
205.4794520547945: c4~205.4794520547945,
205.4794520547945: c4~205.4794520547945 + g5^205.4794520547945,
205.4794520547945: c4~205.4794520547945,
205.4794520547945: c4~205.4794520547945 + f5^205.4794520547945,
205.4794520547945: c4~205.4794520547945 + c5^205.4794520547945,
205.4794520547945: c4~205.4794520547945 + e5^205.4794520547945,
205.4794520547945: c4~205.4794520547945 + g5^205.4794520547945,
205.4794520547945: c4~205.4794520547945 + a5^205.4794520547945,
205.4794520547945: c4~205.4794520547945,
205.4794520547945: c4~205.4794520547945 + b5^205.4794520547945,
205.4794520547945: c4~205.4794520547945 + f5^205.4794520547945`
const playback = playTune(melody, Infinity);
const walk = tune`
94.6372239747634: a4^94.6372239747634 + c5^94.6372239747634 + f4~94.6372239747634 + d4~94.6372239747634,
2933.7539432176654`
const tunes = {
  start: tune`
114.94252873563218: c4~114.94252873563218 + e4~114.94252873563218 + b5-114.94252873563218 + f5-114.94252873563218 + d5-114.94252873563218,
114.94252873563218: a4^114.94252873563218 + f5^114.94252873563218 + e4^114.94252873563218,
3448.2758620689656`,
  reset: tune`
126.58227848101266,
126.58227848101266: c5^126.58227848101266,
126.58227848101266: c5^126.58227848101266,
126.58227848101266,
126.58227848101266: c4^126.58227848101266,
126.58227848101266: c4^126.58227848101266,
3291.1392405063293`,
  win: tune`
105.26315789473684: g5^105.26315789473684 + d5^105.26315789473684 + b4^105.26315789473684 + g4^105.26315789473684,
105.26315789473684: b4^105.26315789473684 + d5^105.26315789473684 + g5^105.26315789473684 + g4^105.26315789473684,
105.26315789473684: g4^105.26315789473684 + b4^105.26315789473684 + d5^105.26315789473684 + g5^105.26315789473684,
105.26315789473684: g4^105.26315789473684,
105.26315789473684: a4^105.26315789473684,
105.26315789473684: b4^105.26315789473684,
105.26315789473684: c5^105.26315789473684,
105.26315789473684: d5^105.26315789473684,
105.26315789473684: e5^105.26315789473684,
105.26315789473684: f5^105.26315789473684,
105.26315789473684: g5^105.26315789473684,
105.26315789473684: a5^105.26315789473684,
105.26315789473684: b5^105.26315789473684,
1999.9999999999998`,
};
const player = "p";
const box = "b";
const goal = "g";
const lavabackground= "l";
const blkwall = "w";

setLegend(
  [player, bitmap`
030...06..030.06
063.0093.0099009
9990336333.36306
0333693939369939
9669399696996690
0332226992229990
0362556962553930
0632559392553633
3363399699999360
369936393936960.
0096336339396990
.3.9539396935630
60.965563355930.
.0336365559330..
9609393369630..6
..96000000003...`],
  [box, bitmap`
................
.......2........
....112222......
...LLL1112.2....
..LLL1111122....
..L1LLLL1111222.
L.LLLLL1LL111222
1LLL1LLLLL11112.
LLLLLLL1LLL11112
LLLLLLLLLLLLLL12
..L1LLLLLLLL1L1.
.LLLLLLLLLL1LL1.
..LLLL1LLLLLLL..
...LLLL1LLLLLL..
...LLLLLLL1L1L..
....L1LLLLLLL...`],
  [goal, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [lavabackground, bitmap`
9393333333339339
3333393339333393
3393333933333333
3333333333339333
9333933393933333
3333333333339393
3393333333333333
3333333933393333
3333393333339333
3339333339333393
9333339333333333
3333333333393393
3393333393333333
3393933333333333
3333393333333333
9393333339333993`],
  [blkwall, bitmap`
0L00010000L00000
1000000L0000100L
000L00000100L000
0L0000L000000000
1000000000L00001
0000000000000L00
L00L010000000000
0000000001000100
0010010L000L000L
0L00000000000000
000000000L000001
L00L00L000000L00
0000000000000000
00100L0010L00L01
0L00000001000000
1000L000000L001L`],
);

setSolids([player, box, blkwall]);

let level = 0;
const levels = [
  map`
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwp....gww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
p..w.....w....w
w.w.w.w....w..w
w......www.ww.w
w..ww.......w.w
w.....www.....w
ww..wwwgw.ww.ww
w.ww..w.w.....w
w....w..w.w.w.w
w.w....w.w....w
w...w......w.ww
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwww
wwwwwwwwwwww
wwwww..wwwww
wwp...b..gww
wwwww..wwwww
wwwwwwwwwwww
wwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
p.....b.......w
wwwwwwwww.w...w
w.......bb.w..w
w..wwww...ww.ww
w.w....www....w
wbw.......www.w
w.w.wwwwww.w..w
w..wwwb..w..w.w
w.......b..wwww
w.w.b.w..w...g.
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
wwwww.............ww
.pb....wwwwwwww.wwww
wwwwwwww......w..www
w...b...b.b.b.wbb.ww
w.wwgwww..w.w.b.w..w
ww.www..ww.w.bw...ww
w....b.b..b.b.w.wb.w
w.b.b.b.b....b.w..bw
wb.b.ww.ww.ww.w.b..w
wb..bw.w..w..w.w.b.w
wb.b.w..w.w..w..b.bw
w...w..w..ww.w.w.w.w
w.b..www....wwb.b.bw
wb.bb...wwwwww.b.b.w
w.b....b..b.b..w.w.w
wb.b.bb.b....w.....w
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwww
......................ww
..p..b.b.b.b.b.b.b.b..ww
wwwwbwbwbwbwbwbwbwbwbwww
w..w.w.w.w.w.w.w.w.w...w
w..w.....ww....b.w.w.b.w
w.w.bw.bw....wb.b.bw...w
ww.......w.b..w.bw..w.bw
ww.wb.b..b...b.ww.b.wb.w
w.b....w...bw..bbb.w...w
wb...wb.b.w.b..bb..w.b.w
w..b...w.b..bww.b.w...bw
ww..w....w.b..w.w..b.b.w
w..b.w.w.....wwb..w.b..w
www....b.bw.bw..bb.w..ww
w.w..b..w....bbw..b.b..w
w..ww..w..w.wbb..ww..b.w
ww...bb.bw.w.w.bwb..b.bw
w....bbbbb...b..w.b....w
w...wwb..wwgwww.b.ww.b.w
ww.w..w.w.www..w.w..b.ww
www....w........w....www
wwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwww
p...................w
w.w.w...w..w.w.w.w..w
ww.b.bww.b..b.bbw.b.w
w..w.w..w.wbw.w..ww.w
ww..b.b..b.w.b.wb.w.w
w.w..w.ww.w.b....ww.w
w.b.w...b.b..bwbb.w.w
ww...b.b.b.w....w.w.w
w.b.w...w...b.w.wbw.w
ww.w..w..b.w.w.b..w.w
w...b..wb.b..b...bw.w
w.bww..b.w.bw.bw.ww.w
ww....w.b.b.w...b.w.w
w..wbw.......b.w.ww.w
ww.....w.wwbw.b...w.w
w.bw.wbwbb...w..w.wbw
w...b......b..bb...g.
wwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwww
wp.w.b....w.b....w
ww.w...wb.b..w..ww
w..b.b.b..b..w..bw
www....wbbw.w.w.ww
w..bwbbw.b.bwbwwww
w.w...bb...bb....w
w..www...bb..b.w.w
w.w.w...w..w..b..w
wb.w.bw...w.ww..ww
w.bw....ww..w.ww.w
w...w.w..wb......w
b.bww...b...bw.w.w
w.b.w.ww.w.w....ww
wb.ww.......b.wbww
w.www.b.w.w......w
w....wbw.w..w.w..w
w.bwwwb...wb..bb.w
w....b....w..w.w.w
wg..w.www.ww.....w
wwwwwwwwwwwwwww.ww`,
  map`
..p............
...www..w..www.
...ww.w.w.w.ww.
...www.....www.
...wwwww.wwwww.
...wwwwwgwwwww.
....wwwwwwwww..
....wwwwwwwww..
.....wwwwwww...
.......www.....
.......www.....
........w......
........w......
.......www.....`,
];


setMap(levels[level]);
setBackground(lavabackground);
setPushables({
  [ player ]: [box],
});
onInput("w", () => {
  getFirst(player).y -= 1;
  playTune(walk);
});
onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(walk);
});
onInput("s", () => {
  getFirst(player).y += 1;
  playTune(walk);
});
onInput("d", () => {
  getFirst(player).x += 1;
  playTune(walk);
});

var tempototal = 300;
    var tempodescendo = setInterval(function(){
    tempototal--;
    clearText(); 
    addText("Time Left: "+tempototal, { y: 0 , color: color`4` });
      if(tempototal <= 0){ 
        clearInterval(tempodescendo);
        clearTile(getFirst(player).x,getFirst(player).y);
        // clearText(); was here before
        addText("Try Again!", { y: 4 , color: color`4` });
        addText("Game Over!", { y: 2 , color: color`4` });
    }
    },1000);
  
  afterInput(() => {
    const targetNumber = tilesWith(goal).length;
    const numberCovered = tilesWith(goal, player).length;

    if (numberCovered === targetNumber) {
      level = level + 1;
    
      const currentLevel = levels[level];
      if (currentLevel !== undefined) {
        setMap(currentLevel);
        playTune(tunes.start);
      } else {
        playback.end();
        addText("You Win!", { y: 2, color: color`6` });
        addText("You Win!", { y: 3, color: color`6` });
        addText("You Win!", { y: 4, color: color`6` });
        addText("You Win!", { y: 5, color: color`6` });
        addText("Credits:", { y: 7, color: color`6` });
        addText("Augustin Z", { y: 8, color: color`6` });
        addText("@Aaron Dragonheart", { y: 10, color: color`6` });
        addText("*Youtube*", { y: 11, color: color`6` });
        addText("I hope you enjoyed!", { y: 14, color: color`6` });
        playTune(tunes.win);
        clearInterval(tempodescendo);
      }
    }
  

    
  });
  
  onInput("j", () => {
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      clearText("");
      setMap(currentLevel);
      playTune(tunes.reset);
    }
  });
