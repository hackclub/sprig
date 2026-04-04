/*
@Title: Escape The Dungeon!
@author: James Moser
@Description: Escape the dungeon and claim the treasure :)
@Tags: [Maze, Puzzle]
@addedOn:2026-02-23
*/

const player = "p"
const wall = "w"
const goal = "g"
const key = "k"
const trap = "t"
const moveable = "m"
const chest ="c"
const background="z"
const lockedDoor="l"
const gameOver="x"
const final="f"
const endScene="e"
let level=1;
let keys=0;
let coins=0;

setLegend(
  [ player, bitmap`
................
................
................
................
................
.......4........
.......44.......
........44......
.......444......
.....444444.....
....444444444...
...44404440444..
...44444444444..
..448440404484..
..44444404444D..
...44444444DD...` ],
  [ wall, bitmap`
L1111111LLL11LLL
L111111LLLL1111L
LLLLLLLLLL11111L
1LLLLLLLL11111LL
LL11LLLL111111L1
L111111LL111LLL1
LLL11111L1LLL111
11LL1111L1L11111
111L111LLLLLLL11
1111LLLL11111LLL
1111LL1111111111
111LLL111111LLLL
11LL1L11111LL111
LLL111LLLLLL1111
1111111111LLL111
LLLLL1111LL1LLLL`],
  [ goal, bitmap`
...CCCCCCCCCCC..
..CFFFFFCFFFFFC.
.CFFFFFFCFFFFFFC
.CFFFFFFCFFFFFFC
.CFFFFFFCFFFFFFC
.CFFFFFFCFFFFFFC
.CFFFFFFCFFFFFFC
.CFFFFFFCFFFFFFC
.CFFFFFFCFFFFFFC
.CFFFFCFCFCFFFFC
.CFFFCFFCFFCFFFC
.CFFFFFFCFFFFFFC
.CFFFFFFCFFFFFFC
.CFFFFFFCFFFFFFC
.CFFFFFFCFFFFFFC
.CFFFFFFCFFFFFFC`],
  [key, bitmap`
................
......666.......
.....6...6......
.....6...F......
.....6...F......
......66F.......
.......6........
.......6........
.......6........
.....664........
.......6........
.....665........
.......6........
.....663........
................
................`],
  [trap, bitmap`
................
.........193....
........11......
.....LLL1LLL....
....LLLL1LLLL...
...LLLLLLLLLLL..
...LLLLLLLLLLL..
...LLLLLLLLLLL..
...LLLLLLLLLLL..
...LLLLLLLLLLL..
...LLLLLLLLLLL..
...LLLLLLLLLLL..
....LLLLLLLLL...
.....LLLLLLL....
................
................`],
  [moveable, bitmap`
................
................
................
................
................
......LLLLLLL...
....LLL111111L..
..LL11111LLLL1L.
.LL1111LLL11111L
L111LLLL1111111L
L11LL1111111111L
L11L111111111L1L
L11L11111111LL1L
L11111111LLLL11L
L1L111LLLL11111L
L11LL1111111111L`],
    [chest, bitmap`
................
................
................
................
................
................
................
....CCCCCCCCCC..
...CFFFFFFFFFFC.
..CFFFFFFFFFFFFC
..CFFFFFFFFFFFFC
..CCFFFFFFFFFFCC
..CFCCCC66CCCCFC
..CFFFFF66FFFFFC
..CFFFFFFFFFFFFC
..CCCCCCCCCCCCCC`],
  [background, bitmap`
1111111111111111
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1111111111111111`],
    [lockedDoor, bitmap`
...CCCCCCCCCCC..
..CFFFFFCFFFFFC.
.CFFFFFFCFFFFFFC
.CFFFFFFCFFFFFFC
.CFFFFFFCFFFFFFC
.CFFFFFFLFFFFFFC
.CFFFFFLLLFFFFFC
.CFFFFFLCLFFFFFC
.CFFFFF666FFFFFC
.CFFFFF6L6FFFFFC
.CFFFFF666FFFFFC
.CFFFFFFCFFFFFFC
.CFFFFFFCFFFFFFC
.CFFFFFFCFFFFFFC
.CFFFFFFCFFFFFFC
.CFFFFFFCFFFFFFC`],
  [gameOver, bitmap`
0000000300000000
0000000300000000
3000003300000000
3330003330003300
0339333933333300
0039999993393000
0003999999993000
0003999999999300
0000339999999933
0000039999999933
0333399999999900
0339999999999300
0000039933999930
0000033303993933
0000033000330000
0000030000000000`],
  [final, bitmap`
LLLLL66696LLLLLL
LLLLL696696LLLLL
LLLLL696696LLLLL
LLLL69666696LLLL
LLL669696696LLLL
L669966996696666
6996669999669999
9666699669966666
6666996666996669
9966699669966996
669966999966966L
LL66966996696LLL
LLLL69669696LLLL
LLLLL6966696LLLL
LLLLL696696LLLLL
LLLLLL69696LLLLL`],
  [endScene, bitmap`
11777111777F6666
22171222177F6666
222122222177F666
2222122217777F66
22222111777777FF
2222217777777777
1111177777700000
777777777770L11L
777777777777L1L1
774777777777LLL1
74447777777711LL
DDDDDDDDDDLLLL11
DDDDDDDDDDD0L11L
DDDDDDDDDDDD0000
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`]
)

const levels = [
  map`
x`,
    map`
wwwwwwwww
wwp....ww
w..tw...w
w..ww...w
w..www..w
wt..wt..w
ww......g
wwwwwwwww`,
    map`
wwwwwpwwwww
wwwww.wwwww
wwwwwm....w
wwwww.www.w
wwwwwww...w
wwwwct....w
ww........w
w.........w
www......ww
..m.....www
g.wwwwwwwww`,
    map`
wwwwwwwwwwww
wp...m.wwwwk
wwwwwmm.www.
wwwww..wwww.
wlwwww.wwww.
...www.wwww.
..tww...ww..
w.w...t....w
w.w.w...wwww
w.m.ww.wwwww
w..wwwcwwwww
wwwwwwwwwwww`, 
  map`
c..............ww
ww.wwwwwwwwwww..w
p............ww.w
wtwwwwwwwwww..w.w
wm........m.w.w.w
w.wwwwwwww.ww.w.w
w.wwwwwwww.ww.w.w
w.w........ww.w.w
w.w.wwwwwwwww.w.w
w.w....lw.....w.w
w.wwwwwww.twwww.w
w.w.t.www....ww.w
w.w...wwwwww.ww.w
w.w.w.w...ww.ww.w
w.w.w...w.ww.tt.w
w...w...w.ww.wwkw
wwwwwwww...m.wwww`,
  map`
wwwww.....w.....
ww.wwm...m.ww.w.
t.mm...ww.www.w.
p.m.wm..w..ct.wf
t..w....ww.ww.ww
wwwww.wtwwm...ww
wwwww.....m.wwww`,
  map`
e`,
  ]
const currentLevel = levels[level];
setBackground("z");

addText("Coins: " + coins, {color:color`6`})

setMap(currentLevel);

setSolids([player, wall, moveable]);

setPushables({
  [ player ]: [moveable]
});

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", ()=>{
  getFirst(player).y -=1
})
onInput("a", ()=>{
  getFirst(player).x -=1
})
onInput("d", ()=>{
  getFirst(player).x +=1
})
onInput("j", ()=>{
  level=1;
  setMap(levels[level]);
  keys=0;
  coins=0;
  clearText();
})

afterInput(() => {
  const chestGet=tilesWith(player, chest).length;
  if(chestGet >=1){
    coins = coins+500;
    getFirst(chest).remove();
    addText("Coins: " + coins, {color:color`6`})
  }

  
  const trapHit=tilesWith(player, trap).length;
  if(trapHit >=1){
    level=0;
    setMap(levels[level]);
    addText("GAME OVER", {x:6, y:7});
    addText("'j' to reset :)", {color:color`2`});
  }
  
  const keyGet=tilesWith(player, key).length;
  const keyDoor=tilesWith(player, lockedDoor).length;
  
  if (keyGet >=1){
    keys=keys +1;
    getFirst(key).remove();
  }
  if (keys >=1 && keyDoor>=1){
    level=level+1;
    const currentLevel=levels[level];
    setMap(currentLevel);
    keys=0;
  }

  
  const goalHit = tilesWith(player, goal).length;
  if (goalHit >= 1){
    level = level+1;
    const currentLevel=levels[level];
    setMap(currentLevel);
  }
  const finalHit=tilesWith(player, final).length;
  if (finalHit >=1){
    level=level+1;
    const currentLevel=levels[level];
    setMap(levels[level]);
    clearText();
    addText("YOU WIN!!", {x:5, y:6, color:color`9`});
  }
})
