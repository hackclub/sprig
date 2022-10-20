/*
@title: Flurffy
@author: LucasHT22
*/

const flurffy = "f"
const canom = "m"
const canot = "t"
const canotd = "d"
const bg = "b"
const canof = "n"
const morte = "h"

setLegend(
  [ flurffy, bitmap`
................
.......00000....
.....00660220...
....0666022220..
...066660220220.
..0666666022220.
..0000066600000.
.066666060333330
.06666600300000.
..0000066033330.
...06666660000..
....0066660.....
......0000......
................
................
................`],
  [ canom, bitmap`
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402`],
  [ canot, bitmap`
0000000000000000
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0000000000000000
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402`],
  [ canotd, bitmap`
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
2044444444444402
0000000000000000
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0000000000000000`],
  [ canof, bitmap`
0000002222000000
0777700000077770
0777707777077770
0777707777077770
0777707777077770
0777707777077770
0777707777077770
0777707777077770
0777707777077770
0777707777077770
0777707777077770
0777707777077770
0777707777077770
0777707777077770
0777700000077770
0000002222000000`],
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

setSolids([flurffy, canom, canot, canotd]);

let level = 0;
const levels = [
  map`
bmbmbm
bmbmbm
bdbdbd
fbbbbn
btbtbt
bmbmbm`,
  map`
fbddmm
tbbbmm
mtbbdm
mmtbbm
mmmtbd
mmmbbn`,
  map`
mbmmbd
mbmmbn
mbddbt
dbbbbm
fbtbbm
ttmbtm`,
  map`
mbmmmm
mbddmm
mbbbbm
dbtbdd
fbmbbn
ttmtbt`,
  map`
bbddmbddd
bbbbmbbbb
bbtbmbtbt
bbmbmbmbm
bbmbmbmbm
bbmbmbmbm
bbmbdbmbd
fbmbbbmbn
btmbttmbt`,
  map`
ddmddmbddm
fbm.bmbbbb
tbdbbmbtbm
mbbbbmbmbm
mtttbmbmbm
mmmbbmbmbm
mmmmbmbmbm
mmmmbdbmbd
mmmmbbbmbn
mmmmbttmbt`,
  map`
ddmddmbdddmmmm
fbmbbmbbbbmmmm
tbdbbmbtbtmmmm
mbbbbmbmbmmmmm
mbttbmbmbmmmmm
mtmmbmbmbmmmmm
mmmmbmbmbmmmmm
mmmmbdbmbdddmm
mmmmbbbmbbbbdm
mmmmbttmbtbbbm
mmmmtmmmtmbbbd
mmmmmmmmmmtbbn
mmmmmmmmmmmtbt
mmmmmmmmmmmmtm`,
];

setMap(levels[level]);

onInput("w", () => {
  getFirst(flurffy).y -= 1;
});

onInput("s", () => {
  getFirst(flurffy).y += 1;
});

onInput("a", () => {
  getFirst(flurffy).x -= 1;
});

onInput("d", () => {
  getFirst(flurffy).x += 1;
});
var tempototal = 35;
    var tempodescendo = setInterval(function(){
    tempototal--;
    clearText();
    addText(""+tempototal, { y: 1 , color: color`3` });
      if(tempototal <= 0){
        clearTile(getFirst(flurffy).x,getFirst(flurffy).y);
        clearInterval(tempodescendo);
        clearText()
    }
    },1000);

afterInput(() => {
  const atual = tilesWith( flurffy, canof).length;
  const f2 = tilesWith(canof).length;
   if (atual === f2) {
    level = level + 1;

    const faseAtual = levels[level];

    if (faseAtual !== undefined) {
      setMap(faseAtual);
    } else {
      addText("congrats, you win!")
    }
  }
});