/*
@title: Pluffy_The_Cage_Bird
@author: Nihal_K
@inspired by 'Flurffy Game'
*/
const pluffy = "p"
const piller = "u"
const pillerco = "d"
const pillercol = "f"
const pillercor = "n"
const pillercold = "h"
const pillercord = "z"
const pillerver = "v"
const bg = "b"
const cage = "c"
const moveTune = tune`
500,
500: C4~500 + D4~500,
15000`;
const levelTune = tune`
500: F5~500 + C5~500 + A4~500 + G4-500 + F4-500,
500: E5~500 + B4~500 + A4^500 + G4^500 + C5-500,
500: D5~500 + G5~500 + A4~500 + B4-500 + F5-500,
500: F5~500 + D5~500 + F4-500 + E4~500 + B4/500,
14000`;
const timeTune = tune`
508.47457627118644: A4-508.47457627118644,
15762.71186440678`;
const winTune = tune`
508.47457627118644: A4-508.47457627118644 + D5/508.47457627118644 + F4~508.47457627118644 + C4^508.47457627118644 + D4^508.47457627118644,
508.47457627118644: F4/508.47457627118644 + D5~508.47457627118644 + B4~508.47457627118644 + D4^508.47457627118644 + E4^508.47457627118644,
508.47457627118644: F5/508.47457627118644 + D5~508.47457627118644 + E4^508.47457627118644 + F4^508.47457627118644 + G4-508.47457627118644,
508.47457627118644: D4/508.47457627118644 + C5~508.47457627118644 + E4~508.47457627118644 + G4^508.47457627118644 + A4^508.47457627118644,
508.47457627118644: E5/508.47457627118644 + D5/508.47457627118644 + D4~508.47457627118644 + A4^508.47457627118644 + B4-508.47457627118644,
508.47457627118644: B4-508.47457627118644 + B5~508.47457627118644 + F4~508.47457627118644 + C4^508.47457627118644 + C5-508.47457627118644,
508.47457627118644: E4/508.47457627118644 + F5/508.47457627118644 + C4^508.47457627118644 + D4^508.47457627118644 + C5-508.47457627118644,
508.47457627118644: G5~508.47457627118644 + D5~508.47457627118644 + D4^508.47457627118644 + E4^508.47457627118644 + G4-508.47457627118644,
508.47457627118644: E5/508.47457627118644 + D5/508.47457627118644 + B4/508.47457627118644 + A4/508.47457627118644 + F4~508.47457627118644,
508.47457627118644: E4/508.47457627118644 + D5/508.47457627118644 + A4-508.47457627118644 + F4^508.47457627118644 + B4-508.47457627118644,
508.47457627118644: F5/508.47457627118644 + E5/508.47457627118644 + G4^508.47457627118644 + A4^508.47457627118644 + B4-508.47457627118644,
508.47457627118644: C5/508.47457627118644 + A5~508.47457627118644 + D5~508.47457627118644 + C4^508.47457627118644 + A4^508.47457627118644,
508.47457627118644: F4/508.47457627118644 + B4~508.47457627118644 + E5^508.47457627118644 + C4^508.47457627118644 + D4^508.47457627118644,
508.47457627118644: A4~508.47457627118644 + F5^508.47457627118644 + E4^508.47457627118644 + F4-508.47457627118644 + D5/508.47457627118644,
508.47457627118644: A4~508.47457627118644 + B4~508.47457627118644 + D5~508.47457627118644 + F5^508.47457627118644 + G5^508.47457627118644,
508.47457627118644: D5~508.47457627118644 + G5^508.47457627118644 + G4-508.47457627118644 + A4-508.47457627118644 + C4-508.47457627118644,
508.47457627118644: D5~508.47457627118644 + G5^508.47457627118644 + A4^508.47457627118644 + B4-508.47457627118644 + C4-508.47457627118644,
508.47457627118644: F4~508.47457627118644 + A5^508.47457627118644 + B4-508.47457627118644 + C5-508.47457627118644 + D4-508.47457627118644,
508.47457627118644: B4~508.47457627118644 + A5^508.47457627118644 + C5-508.47457627118644 + D4-508.47457627118644 + G4/508.47457627118644,
508.47457627118644: A4~508.47457627118644 + A5^508.47457627118644 + C5-508.47457627118644 + D5-508.47457627118644 + E4-508.47457627118644,
508.47457627118644: D5-508.47457627118644 + E5-508.47457627118644 + G4~508.47457627118644 + E4-508.47457627118644 + B4/508.47457627118644,
508.47457627118644: D5~508.47457627118644 + F4~508.47457627118644 + A4^508.47457627118644 + B4^508.47457627118644 + E5-508.47457627118644,
508.47457627118644: F4~508.47457627118644 + B4^508.47457627118644 + C5^508.47457627118644 + F5-508.47457627118644 + G5-508.47457627118644,
508.47457627118644: F5~508.47457627118644 + E5~508.47457627118644 + E4~508.47457627118644 + C5^508.47457627118644 + D5^508.47457627118644,
508.47457627118644: E4~508.47457627118644 + D5^508.47457627118644 + E5^508.47457627118644 + A5-508.47457627118644 + A4-508.47457627118644,
508.47457627118644: A4~508.47457627118644 + E4~508.47457627118644 + D4~508.47457627118644 + E5^508.47457627118644 + F5^508.47457627118644,
508.47457627118644: F5~508.47457627118644 + C5-508.47457627118644 + G5/508.47457627118644 + A5/508.47457627118644 + B5/508.47457627118644,
508.47457627118644: G4~508.47457627118644 + E5~508.47457627118644 + C4^508.47457627118644 + D4^508.47457627118644 + C5-508.47457627118644,
508.47457627118644: D5-508.47457627118644 + E5^508.47457627118644 + F5^508.47457627118644 + A4/508.47457627118644 + C4/508.47457627118644,
508.47457627118644: D5-508.47457627118644 + G5^508.47457627118644 + A5^508.47457627118644 + E5-508.47457627118644 + B4/508.47457627118644,
508.47457627118644: C5/508.47457627118644 + A5^508.47457627118644 + B5^508.47457627118644 + E5-508.47457627118644 + B4/508.47457627118644,
508.47457627118644: B4~508.47457627118644 + D4^508.47457627118644 + A4/508.47457627118644 + G4/508.47457627118644 + B5/508.47457627118644`;
setLegend(
	[pluffy, bitmap`
................
.......00000....
.....00440220...
....0444022220..
...044440220220.
..0444444022220.
..0000044400000.
.044444040CCCCC0
.04444400C00000.
..00000440CCCC0.
...04444440000..
....0044440.....
..000.0000......
.....000........
................
................`],
	[piller, bitmap`
..0CCCCCCCC00...
..00CCCCCCCC00..
...0CCCCCCCC0...
...0CCCCCCCC0...
..00CCCCCCCC00..
...0CCCCCCCC00..
...0CCCCCCCC0...
...0CCCCCCCC0...
..00CCCCCCC00...
..00CCCCCCC00...
..00CCCCCCC00...
...0CCCCCCC00...
...0CCCCCCCC0...
...0CCCCCCCC00..
...00CCCCCC00...
...00CCCCCC00...`],
  [pillercol, bitmap`
..0CCCCCCCC00...
0C00CCCCCCCC00..
000CCCCCCCCC0...
C0CCCCCCCCCC0...
CCCCCCCCCCCC00..
CCCCCCCCCCCC0...
CCCCCCCCCCCC0...
CCCCCCCCCCCC0...
CCCCCCCCCCCC0...
CCCCCCCCCCC00...
CCCCCCCCCCC0....
CCCCCCCCCCC0....
CCCCCCCC000.....
000000C00.......
00000000........
00..............`],
  [pillercor, bitmap`
...00CCCCCCCC0..
..00CCCCCCCC00C0
...0CCCCCCCCC000
...0CCCCCCCCCC0C
..00CCCCCCCCCCCC
...0CCCCCCCCCCCC
...0CCCCCCCCCCCC
...0CCCCCCCCCCCC
...0CCCCCCCCCCCC
...00CCCCCCCCCCC
....0CCCCCCCCCCC
....0CCCCCCCCCCC
.....000CCCCCCCC
.......00C000000
........00000000
..............00`],
  [pillercold, bitmap`
..............00
........00000000
.......00C000000
.....000CCCCCCCC
....0CCCCCCCCCCC
....0CCCCCCCCCCC
...00CCCCCCCCCCC
...0CCCCCCCCCCCC
...0CCCCCCCCCCCC
...0CCCCCCCCCCCC
...0CCCCCCCCCCCC
..00CCCCCCCCCCCC
...0CCCCCCCCCC0C
...0CCCCCCCCC000
..00CCCCCCCC00C0
...00CCCCCCCC0..`],
  [pillercord, bitmap`
00..............
00000000........
000000C00.......
CCCCCCCC000.....
CCCCCCCCCCC0....
CCCCCCCCCCC0....
CCCCCCCCCCC00...
CCCCCCCCCCCC0...
CCCCCCCCCCCC0...
CCCCCCCCCCCC0...
CCCCCCCCCCCC0...
CCCCCCCCCCCC00..
C0CCCCCCCCCC0...
000CCCCCCCCC0...
0C00CCCCCCCC00..
..0CCCCCCCC00...`],
  [pillerver, bitmap`
................
00.............0
C00..000...0..00
CC0000000000000C
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCC0000CCCCCCCC
C0000000000000CC
000.......00.00C
0.............00
................`],
	[cage, bitmap`
0000000000000000
0000000000000000
.001L0L02210100.
.0L120L0L1001L0.
.0L100100100110.
.0L1001L0110110.
.01100110LL0100.
.01100L201100L0.
.001L0LL0L10LL0.
.01110L10110100.
.0L100010L10100.
.0L110010010120.
.00110010L10100.
002110L10110210.
0000000000000000
0000000000000000`],
	[bg, bitmap`
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
LLLLLLLLLLLLLLLL`], );

setSolids([pluffy,bg,piller,pillerco,pillerver,pillercol,pillercor,pillercold,pillercord]);
let level = 0;
const levels = [
	map`
bbbbbubb
b....ubb
b....ubb
b.u..ubb
b.u..nvb
..u....c
.pu....b
bbubbbbb`,
	map`
ubbbbbbbh
nvf.....u
b...hz..u
b..vfu.nf
b....u..c
bhvz.u.hv
bu...u..b
bu.p.u..b
bubbbubbb`,
	map`
bbbbbbbbbbbb
b..........b
b.........cb
b..hvvvvvvvv
b..nvvvvvvvv
b..........b
b..........b
vvvvvvvvz..b
vvvvvvvvf..b
b..........b
bp.........b
bbbbbbbbbbbb`,
	map`
bbbbbbbbbbbbbbb
bbb...bbb....cb
bbb.hz.b.hz...b
bb..nf...nf...b
b.............b
b.hz...hz..hz.b
..nf.b.nf..nf.b
p....b...bb..bb
bbbbbbbbbbbbbbb`,
	map`
bbbbbbbbbbbbbbbb
b..............b
b.bbbbbbbbbbbb.b
b.b.........ub.b
b.b.bbbb..bbbb.b
b.b.b..bz.b....b
b...bb.bu.b.bbbb
b...nb.bu.b...bb
vvz..b.bf.bbb..b
b.u..b.b...nbb.b
b.u.bb.b.....bbb
vvf.bb.bz..b.bnz
b...bb.bbbbb.bbn
b........pub..bb
bbbbbbbbbbbbbcbb`,
	map`
bbbbbbbbbbbbbbbbbbbbbbbbbbb
b.........................b
b.bbbbbbbbbbbb.bbbbbb..b.hb
b.b.........u..b...nb..bbbb
b.b.bbbb..bbbb.b.b..b....bb
b.b.b..bz.b....b.b..bbb..bb
b.b.bb.bu.b.bbbhvb....b..bb
b.b..b.bu.b...bb.b.bb.b.hbb
b.bb.b.bf.bbb..b.b.b..b.bbb
b....b.b...u...b.b.bbbb..bb
bvb..b.b.bbb.hbb.b.......bb
b.b..b.b...b.bbb.bzbbbbbbbb
b.bb.b.bb..b.nbb.bubbbbbbbb
b........pbb...c..nvvf....b
bbbbbbbbbbbbbbbbbbbbbbbbbbb`,
	map`
bbbbbbbbbbbbbb
b.nvf.b.....nb
b.....bz.....b
b..b..bu.b...b
bz.b.hbu.bvz.b
bf.b.ubu.b.u.b
b..b.ubf.bvf.b
b.hb.ub..b...b
b.nb.nb..b..hb
b..b..b..b.hfb
b..b..b.hb.u.b
b..b..b.ub.u.b
bz.bz.b.ub.nzb
bu.bf.b.ub..ub
bf.b..b.ub.hfb
b..b..b.nb.nzb
b..b.....b..nb
b.hb.hvz.bz..b
bpbbbbbbbbbbcb`,
  map`
bbbbbbbbbbbbbb
bf......nbbbbb
bbbbbb...nbbfb
b...nbb......b
bb...cbb.b.b.b
b..bbbbb.b.b.b
b.bvbbb..b.b.b
b.b......b.b.b
b.b.bbb.bb.b.b
b.b.b.bbb..b.b
b.bb......bb.b
b....bbb.bbf.b
bbbbbbvbbbf..b
bp...........b
bbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbbbbbbbbbb
bf........................nb
b..........................b
b..bbbbbbbbbbbbbbbbbbbbbb..b
b..bf..................nb..b
b..b....................b..b
b..b..bbbbbbbbbbbbbbbb..b..b
b..b..bf............nb..b..b
b..b..b..............b..b..b
b..b..b..bbbbbbbbbb..b..b..b
b..b..b..bf......nb..b..b..b
b..b..b..b........b..b..b..b
b..b..b..b..bbbb..b..b..b..b
b..b..b..b..bcbb..b..b..b..b
b..b..b..b..b....hb..b..b..b
b..b..b..b..bbbbbbb..b..b..b
b..b..b..b...........b..b..b
b..b..b..bz.........hb..b..b
b..b..b..bbbbbbbbbbbbb..b..b
b..b..b.................b..b
b..b..bz...............hb..b
b..b..bbbbbbbbbbbbbbbbbbb..b
b..b.......................b
bzpbz.....................hb
bbbbbbbbbbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbbbbbbbbbb
bf........................nb
b..........................b
b..bbbbbbbbbbbbbbbbbbbbbb..b
b..bf..................nb..b
b..b....................b..b
b..b..bbbbbbbbbbbbbbbb..b..b
b..b..bf............nb..b..b
b..b..b..............b..b..b
b..b..b..bbbbbbbbbb..b..b..b
b..b..b..bf......nb..b..b..b
b..b..b..b........b..b..b..b
b..b..b..b..bbbb..b..b..b..b
b..b..b..b..bp....b..b..b..b
b..b..b..b..bbbb.hb..b..b..b
b..b..b..b..bbbbbbb..b..b..b
b..b..b..b...........b..b..b
b..b..b..bz.........hb..b..b
b..b..b..bbbbbbbbbbbbb..b..b
b..b..b.................b..b
b..b..bz...............hb..b
bz.b..bbbbbbbbbbbbbbbbbbb..b
bb.b.......................b
bbcbz.....................hb
bbbbbbbbbbbbbbbbbbbbbbbbbbbb`,
];

const currentLevel = levels[level];
setMap(currentLevel);

onInput("w", () => {
  getFirst(pluffy).y -= 1;
  playTune(moveTune) ;
});

onInput("s", () => {
  getFirst(pluffy).y += 1;
  playTune(moveTune) ;
});

onInput("a", () => {
  getFirst(pluffy).x -= 1;
  playTune(moveTune) ;
});

onInput("d", () => {
  getFirst(pluffy).x += 1;
  playTune(moveTune) ;
});

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
    timer();
  }
});
onInput("i", () => {
  level= 0;
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
    timer();
  }
});

var countDownTotal;
timer();
function timer() {
  countDownTotal = 60;
  var countDownId = setInterval(function() {
	countDownTotal--;
    playTune(timeTune) ;
	clearText();
	addText("" + countDownTotal, {
		y: 1,
		color: color`3`
	});
  
	if (countDownTotal <= 0) {
		clearInterval(countDownId);
		clearText();
        addText("Time Over! Press I", {
		y: 1,
		color: color`3`
	});
        const currentLevel = levels[level];
      setMap(currentLevel);
	}
}, 1000);

}

afterInput(() => {
  const numberCovered = tilesWith(pluffy, cage).length;
  const targetNumber = tilesWith(cage).length;

  
  if (numberCovered === targetNumber) {
    level = level + 1;
    playTune(levelTune) ;
    const currentLevel = levels[level];
    countDownTotal = 60;
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
      playTune(winTune) ;
    }
  }
});