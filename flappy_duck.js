/*
@title: flappy_duck
@author: Brians
*/

const duck = "f"
const pipe_up = "m"
const pipe_down = "o"
const pipe_up_end = "t"
const pipe_down_end = "d"
const bg = "b"
const win_block = "n"
const win = 0
const sfx = tune`
500: d4-500,
15500`

setLegend(
  [ duck, bitmap`
......0000......
....00666600....
...0F666666F0...
...0F66666660...
..0666666666F0..
..0666606666F0..
.0F66660633330..
0F6666663999930.
0F60666633333060
060F6666FFFFF0F0
.0F666666FFFF00.
..0FFFFFFFFF0...
...000000000....
................
................
................`],
  [ pipe_up, bitmap`
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02`],
  [ pipe_down, bitmap`
20D4444444444402
20D4444444444402
20D4444444444402
20D4444444444402
20D4444444444402
20D4444444444402
20D4444444444402
20D4444444444402
20D4444444444402
20D4444444444402
20D4444444444402
20D4444444444402
20D4444444444402
20D4444444444402
20D4444444444402
20D4444444444402`],
  [ pipe_up_end, bitmap`
0000000000000000
04444444444444D0
04444444444444D0
04444444444444D0
04444444444444D0
0000000000000000
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02`],
  [ pipe_down_end, bitmap`
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
2044444444444D02
0000000000000000
04444444444444D0
04444444444444D0
04444444444444D0
04444444444444D0
0000000000000000`],
  [ win_block, bitmap`
.......00.......
......0660......
......0660......
.....066660.....
0000006666000000
06666666666666F0
.0F6666666666F0.
..0F66066066F0..
...0F606606F0...
...0F60660F0....
..0F6666666F0...
..0F6666666F0...
.0F666F00FFFF0..
0FFFFF0..00FFF0.
0FF000.....00FF0
.00..........000`],
  [ bg, bitmap`
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
);

setSolids([duck, pipe_up, pipe_down, pipe_up_end, pipe_down_end]);

let level = 0;
const levels = [
  map`
bbbmbm
bbbdbm
bbbbbd
fbbbbn
btbbbb
bmbbbb`,
  map`
fbbdmm
bbbbdm
tbbbbd
mtbbb.
mmtbb.
mmmtbn`,
  map`
mbmdbd
dbdbbb
bbbbbn
bbbbbt
fbtbbm
ttmbtm`,
  map`
mbmmmm
mbddmm
dbbbdm
bbbbbd
fbtbbn
ttmtbt`,
  map`
bbddmbddd
bbbbmbbbb
bbbbmbbbt
bbbbmbbbm
bbtbmbtbd
bbmbdbmbb
bbmbbbmbb
fbmbbbmbn
btmbttmbt`,
  map`
ddmddmbddm
fbd.bmbbbd
bbbbbmbbbn
tbbbbmbbbb
mtbbbmbtbt
mmtbbdbmbm
mmmtbbbmbm
mmmmbbbmbm
mmmmtbbmbm
mmmmmttmbm`,
  map`
bdmddmbdddmmmm
fbmbbmbbbbmmdm
bbdbbmbbbtmmbm
bbbbbmbbbmmmbd
bbbbbmbbbdmdbn
btbbbdbbbbmbbt
bmbbbbbtbbmbbm
bmbbbbbmbbdbbm
bmbbbbbmbbbbbm
bmbbbttmbbbbbm
bmbbtmmmttbbbm
bmbbmmmmmmtbbm
bmbbmmmmmmmtbm
bmbbmmmmmmmmtm`,
  map`
mm...m..m.mm.mm.bm.m.mm
mm...m..m.mm.mm.bm.m.mm
mm...m..m.mm.mm.bm.m.mm
mm...m..m.mm.mm..m.m.mm
dm...m..m.mm.mm..m.m.mm
.m...m..m.mm.dm..m.m.mo
.m...m..m.mm..m..m.m.mo
bd...m..m.mm..m..m.d.mo
bb...d..m.mm..mb.d...mo
........m.mm..mb.....do
fbb.....m.dm..db......o
bbbt....m..m...b......m
bbbo....d..m...b...t..m
bb.o.......m...bt..o..m
tbbo.......m....o..o..m
ob.o.......m..t.ot.o..d
mb.o..t....d..o.oo.ob..
o..o..o.......o.oo.ob.n
ob.o..o.......o.oo.ob..
o..o..o.....t.o.oo.ob.t
o..o..o..t..o.o.oobob.o
ob.o..o..o..o.o.oobob.o
ob.o..o..o..o.o.oobob.o`,
];

setMap(levels[level]);

onInput("w", () => {
  getFirst(duck).y -= 1;
});

onInput("d", () => {
  getFirst(duck).x += 1;
});

var gravity = 1000;
    var gravityfunc = setInterval(function(){
    getFirst(duck).y +=1 ;
    gravity--;
    },500);

var time = 45;
    var timefunc = setInterval(function(){
    time--;
    clearText();
    addText(""+time, { y: 1 , color: color`3` });
      if(time <= 0 && win != 1){
        clearTile(getFirst(duck).x,getFirst(duck).y);
        clearInterval(timefunc);
        clearText();
        addText("you lose!", { y: 4, color: color`3` });
      }
    },1000);

afterInput(() => {
  playTune(sfx);
  const atual = tilesWith( duck, win_block).length;
  const f2 = tilesWith(win_block).length;
   if (atual === f2) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      clearText();
      addText("you win!", { y: 4, color: color`3` });
      clearTile(getFirst(duck).x,getFirst(duck).y);
      const win = 1;
    }
  }
});
