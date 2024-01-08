/*
@title: Asteroid Field
@tags: ['catch']
@img: ""
@addedOn: 2022-11-25
@author: Kaitlyn - copied code from pr to test
*/
const _0x18cc47=_0x21bd;(function(_0x423229,_0x2422a7){const _0x1c0916=_0x21bd,_0x3746fc=_0x423229();while(!![]){try{const _0x206f8c=-parseInt(_0x1c0916(0xa3))/0x1*(-parseInt(_0x1c0916(0xad))/0x2)+parseInt(_0x1c0916(0xaa))/0x3+-parseInt(_0x1c0916(0x9e))/0x4*(parseInt(_0x1c0916(0xa7))/0x5)+-parseInt(_0x1c0916(0xa0))/0x6*(parseInt(_0x1c0916(0xab))/0x7)+parseInt(_0x1c0916(0xac))/0x8*(-parseInt(_0x1c0916(0xa9))/0x9)+parseInt(_0x1c0916(0xa5))/0xa*(-parseInt(_0x1c0916(0xae))/0xb)+parseInt(_0x1c0916(0xa4))/0xc;if(_0x206f8c===_0x2422a7)break;else _0x3746fc['push'](_0x3746fc['shift']());}catch(_0x314357){_0x3746fc['push'](_0x3746fc['shift']());}}}(_0x3be5,0x61363));function _0x3be5(){const _0xba2935=['5IeISIO','random','1580679xGqvWV','2000058uiKXTq','504AjFAAZ','24mSdMpe','376ajTBUK','1397hsPNoJ','floor','1478956QuAciX','end','29208cqOQCX','length','Asteroid\x20Field','2756ZOXLuh','6124848SRVdsc','3930exesqU','ceil'];_0x3be5=function(){return _0xba2935;};return _0x3be5();}function getRandomInt(_0x43e9bc,_0x25d063){const _0x33c181=_0x21bd;return _0x43e9bc=Math[_0x33c181(0xa6)](_0x43e9bc),_0x25d063=Math['floor'](_0x25d063),Math[_0x33c181(0xaf)](Math[_0x33c181(0xa8)]()*(_0x25d063-_0x43e9bc)+_0x43e9bc);}const ship='s',asteroida='a',asteroidb='b',bg='g',goal='e',menuMusic=tune`
500: g5/500 + e5-500,
500: g5/500 + e5-500,
500: a5/500 + f5-500,
500: e5/500 + c4~500 + e4-500 + c5-500,
500: e5/500 + c4~500 + e4-500 + c5-500,
500: b4/500 + g4-500,
500: d5/500 + c4^500 + e4-500 + b4-500,
500: d5/500 + c4^500 + e4-500 + b4-500,
500: g5/500 + e5-500,
500: g5/500 + c4~500 + e4-500 + e5-500,
500: a5/500 + c4~500 + e4-500 + f5-500,
500: e5/500 + c5-500,
500: e5/500 + c4^500 + e4-500 + c5-500,
500: c4^500 + e4-500,
500: d5/500 + b4-500,
500: e5/500 + e4-500 + c4~500 + c5-500,
500: e5/500 + e4-500 + c4~500 + c5-500,
500: f5/500 + d5-500,
500: f5/500 + c4^500 + d5-500 + e4-500,
500: d5/500 + c4^500 + b4-500 + e4-500,
500: d5/500 + b4-500,
500: e4-500 + c4~500 + c5/500 + a4-500,
500: e4-500 + c4~500 + c5/500 + a4-500,
500: g5/500 + e5-500,
500: g5/500 + e4-500 + c4^500 + e5-500,
500: a5/500 + e4-500 + c4^500 + f5-500,
500: f5/500 + d5-500,
500: e5/500 + e4-500 + c4~500 + c5-500,
500: f5/500 + e4-500 + c4~500 + d5-500,
500: g5/500 + e5-500,
500: e4-500 + c4^500,
500: e4-500 + c4^500`,gameMusic=tune`
750: e4~750,
750: f4~750,
750,
750: f5~750,
750,
750: c4~750,
750: g5^750,
750: c4~750,
750: d5~750,
750: c5~750,
750: a5^750,
750: g4~750,
750,
750: c5~750,
750,
750: f4~750,
750: b4~750,
750: f5^750,
750: d5~750,
750,
750: g5~750,
750,
750: f5~750,
750,
750: c5^750,
750: d5~750,
750: a4~750,
750,
750: e4~750,
750: a5^750,
750: f4~750,
750: d5~750`,playback=playTune(menuMusic,Infinity),farMove='d',levels=[map`
..........
..........
..........
..........
..........
e....s....
..........
..........`,map`
..a...b...
..........
..b.......
.a........
......b.a.
b.a.......
.b....ae..
a....sb..b`,map`
.e..a.a..a
..a.....ad
..a.b...aa
.......a..
.b.a....b.
a.ba......
.a..b....b
b.b..s....`,map`
........be
b...baa...
.......b..
..a....a.b
.b...b..a.
.a.....b..
a..a.....a
.b...s..b.`,map`
..........
..aa.b.b..
.....a..ae
b...b.b..b
.b....a.a.
.a....b...
b.b.....b.
b....s..ba`,map`
.a..b....b
aeab......
..b...ba.a
b..b.ba...
.a...b..a.
b...b...ba
.a.ba..a..
b.a.bsb...`,map`
a.....b.a.
.e........
.........a
..ab.a....
.a........
b...b....b
.a.....a..
a....s...a`,map`
...b....a.
.sb...a...
.ab...a...
..b.....a.
....b.a...
..a.......
a....aa...
.bba....be`,map`
....a...bb
.ab.b.....
a.....s.b.
eb..a.b.b.
.a........
...b....a.
.b.a...aa.
b..b..b..d`,map`
a.eb.a....
........ab
a.a.......
..a...ab..
.....aea..
.ba..bb..a
....s.....
.a........`];setLegend([ship,bitmap`
................
................
................
.......LL.......
......L22L......
.....L2222L.....
.....L2222L.....
...LLL2222LLL...
.LL111LLLL111LL.
L11441111114411L
L11441144114411L
.LL1111441111LL.
...LLLLLLLLLL...
................
................
................`],[asteroida,bitmap`
................
.......111111...
.......11111111.
......111LLL111.
.....111LLLLLL1.
.....11LLLLLLL1.
....111LLLLLLL1.
..11111LLLLLL1..
..1LLL11LLLLL1..
.11LLL111LLL11..
.1111111111111..
..11L1111111....
...1L11LL11.....
...1111LL11.....
....111111......
................`],[asteroidb,bitmap`
................
................
......1111111...
....1111LL1111..
....111LLLLL11..
...1111LLLLL11..
..11111LLLLL11..
..111111LLL111..
..1LLL11111111..
..1LLL111111L1..
..1LLL11111LLL..
..11111111LLLLL.
...11111111LLL1.
...111111111L...
................
................`],[bg,bitmap`
0000020000000000
0200000000000000
0000000000200000
0000000000000000
0000000000000000
0000200000002000
0020000000000000
0000000000000000
0000002000000000
0000000000020000
0000000000000000
0000000000000000
0200020000000200
0000000000000000
0000000000000000
0020000020000002`],[goal,bitmap`
................
....44444444....
...44HHHHHH44...
..4HH......HH4..
.44H........H44.
.4H...4444...H4.
.4H..4HHHH4..H4.
.4H..4H..H4..H4.
.4H..4H..H4..H4.
.4H..4HHHH4..H4.
.4H...4444...H4.
.44H........H44.
..4HH......HH4..
...44HHHHHH44...
....44444444....
................`],[farMove,bitmap`
.......7.......7
......77......77
.....777.....777
....7777....7777
...77777...77777
..777777..777777
.7777777.7777777
7777777777777777
7777777777777777
.7777777.7777777
..777777..777777
...77777...77777
....7777....7777
.....777.....777
......77......77
.......7.......7`]),setSolids([asteroida,asteroidb,ship]);let level=0x0;function _0x21bd(_0x2811a7,_0x40127c){const _0x3be581=_0x3be5();return _0x21bd=function(_0x21bd4a,_0x10f370){_0x21bd4a=_0x21bd4a-0x9e;let _0x1ed82b=_0x3be581[_0x21bd4a];return _0x1ed82b;},_0x21bd(_0x2811a7,_0x40127c);}level==0x0&&addText(_0x18cc47(0xa2),{'x':0x3,'y':0x4,'color':color`9`});setMap(levels[level]),setBackground(bg),onInput('w',()=>{getFirst(ship)['y']-=0x1;}),onInput('a',()=>{getFirst(ship)['x']-=0x1;}),onInput('s',()=>{getFirst(ship)['y']+=0x1;}),onInput('d',()=>{getFirst(ship)['x']+=0x1;});let num=0x0;afterInput(()=>{const _0x1c1150=_0x18cc47,_0x51cd26=tilesWith(goal)[_0x1c1150(0xa1)],_0x5217e4=tilesWith(goal,ship)['length'],_0x4bcbe7=tilesWith(farMove)[_0x1c1150(0xa1)],_0x32ac2d=tilesWith(farMove,ship)[_0x1c1150(0xa1)];_0x4bcbe7==_0x32ac2d&&_0x4bcbe7!==0x0&&(onInput('w',()=>{getFirst(ship)['y']-=0x1;}),onInput('a',()=>{getFirst(ship)['x']-=0x1;}),onInput('s',()=>{getFirst(ship)['y']+=0x1;}),onInput('d',()=>{getFirst(ship)['x']+=0x1;}));if(_0x5217e4==_0x51cd26){level=getRandomInt(0x1,0x9);let _0x29ddc5=levels[level];if(level>=0x1){clearText();if(playback)playback[_0x1c1150(0x9f)]();_0x29ddc5!==undefined&&setMap(_0x29ddc5);}if(level>=0x1&&num==0x0){num=0x1;const _0x5ada79=playTune(gameMusic,Infinity);}}});