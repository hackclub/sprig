/*
@title: THE CORRIDOR DELUXE
@author: Jona Noack
@tags: ['meta', 'puzzle', 'story', 'cinematic']
@description: The Corridor  fuer Sprig
@addedOn: 2026-10-28

*/

const p1 = "p";
const pInv = "v";
const pZap = "q";
const dust = "a";

const wallT = "w";
const wallB = "W";
const lampOn = "l";
const lampOff = "L";
const floorTile = "f";
const doorC = "e";
const doorO = "E";

const btn = "o";
const btnGlow = "O";
const btnSweat = "n";
const btnPress = "x";
const decoyBtn = "d";
const tinyB = "i";

const laserA = "z";
const laserI = "Z";
const pad1 = "t";
const pad2 = "T";
const gli1 = "g";
const gli2 = "j";
const fog = "k";
const eyes = "Y";
const star = "s";
const part = "c";

const swOff = "r";
const swOn = "R";
const gate = "G";
const clone = "C";

const boss = "m";
const bossHit = "M";
const shield = "S";
const winCup = "y";

const csBL = "B";
const csBR = "b";
const csPL = "K";
const csPR = "V";
const csH1 = "H";
const csH2 = "A";
const csH3 = "F";
const csDL = "D";
const csDR = "N";
const csSpk = "X";

setLegend(
  [p1, bitmap`
................
....00000000....
...0222222220...
..027777777720..
..077777777770..
..072222777770..
..072222777770..
...0777777770...
....00000000....
...0444444440...
..044884488440..
..044444444440..
...0LLLLLLLL0...
...0110000110...
...0110..0110...
..00000..00000..`],

  [pInv, bitmap`
..00000..00000..
...0110..0110...
...0110000110...
...0LLLLLLLL0...
..044444444440..
..044884488440..
...0444444440...
....00000000....
...0777777770...
..072222777770..
..072222777770..
..077777777770..
..027777777720..
...0222222220...
....00000000....
................`],

  [pZap, bitmap`
.6..00000000..6.
..602222222206..
.60277777777206.
..077666677770..
.60722227777706.
..072222777770..
.6.0777777770.6.
....00000000....
.7.0444444440.7.
..044884488440..
.70444444444407.
...0LLLLLLLL0...
.6..01100110..6.
...0110..0110...
.600000..000006.
..6............6`],

  [dust, bitmap`
................
................
................
................
................
................
................
................
................
................
................
....111..111....
...1222112221...
...1222112221...
....111..111....
................`],

  [wallT, bitmap`
0000000000000000
0000000000000000
1111111111111111
7777777777777777
2222222222222222
7777777777777777
1111111111111111
LLLLLLLLLLLLLLLL
1111111111111111
0000000000000000
1111001111110011
LLLL00LLLLLL00LL
1111001111110011
0000000000000000
1111111111111111
0000000000000000`],

  [wallB, bitmap`
LLLLLLLLLLLLLLLL
1111111111111111
0000000000000000
5555000055550000
5550000555500005
5500005555000055
5000055550000555
0000555500005555
0005555000055550
0055550000555500
0555500005555000
5555000055550000
0000000000000000
LLLLLLLLLLLLLLLL
1111111111111111
0000000000000000`],

  [lampOn, bitmap`
0000000000000000
0000000000000000
1111111111111111
7777777777777777
2222222222222222
7777777777777777
1111111111111111
LLLLLLLLLLLLLLLL
.00000000000000.
.02222222222220.
.05555555555550.
.00000000000000.
..555555555555..
...5555555555...
....55555555....
.....555555.....`],

  [lampOff, bitmap`
0000000000000000
0000000000000000
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
.00000000000000.
.01111111111110.
.01111111111110.
.00000000000000.
................
................
................
................`],

  [floorTile, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
0000000000000000
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
0000000000000000`],

  [doorC, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L111111111111L0
0L133333333331L0
0L130000000031L0
0L1LLLLLLLLLL1L0
0L111110011111L0
0L111110011111L0
0L111110011111L0
0L111110011111L0
0L1LLLLLLLLLL1L0
0L130000000031L0
0L133333333331L0
0L111111111111L0
0LLLLLLLLLLLLLL0
0000000000000000`],

  [doorO, bitmap`
0000000000000000
011110....011110
01LL0......0LL10
01L40......04L10
01L40......04L10
01LL0......0LL10
01110......01110
01110......01110
01110......01110
01110......01110
01LL0......0LL10
01L40......04L10
01L40......04L10
01LL0......0LL10
011110....011110
0000000000000000`],

  [btn, bitmap`
................
................
.....000000.....
....04444440....
...0445522440...
...0455222440...
...0444444440...
...0444444440...
....04444440....
....00000000....
...0111111110...
..011LLLLLL110..
..01L700007L10..
..01LLLLLLLL10..
..011111111110..
.00000000000000.`],

  [btnGlow, bitmap`
.......55.......
....55544555....
...5440000445...
..540444444045..
..504455224405..
.5045522224405..
.5044444444405..
.5044444444405..
..50444444405...
..540000000045..
...5411111145...
..011LLLLLL110..
..01L700007L10..
..01LLLLLLLL10..
..011111111110..
.00000000000000.`],

  [btnSweat, bitmap`
................
.7..............
..7..000000.....
....04444440....
...0442002440...
...0442002440...
...0444004440...
...0444444440...
....04444440....
....00000000....
...0111111110...
..011LLLLLL110..
..01L300003L10..
..01LLLLLLLL10..
..011111111110..
.00000000000000.`],

  [btnPress, bitmap`
................
................
................
................
................
................
.....000000.....
....04444440....
...0445224440...
....00000000....
...0111111110...
..011LLLLLL110..
..01L444444L10..
..01LLLLLLLL10..
..011111111110..
.00000000000000.`],

  [decoyBtn, bitmap`
................
................
.....000000.....
....04444440....
...0448822440...
...0488222440...
...0444444440...
...0444444440...
....04444440....
....00000000....
...0111111110...
..011LLLLLL110..
..01L300003L10..
..01LLLLLLLL10..
..011111111110..
.00000000000000.`],

  [tinyB, bitmap`
................
................
................
................
................
................
......0000......
.....045240.....
.....044440.....
......0000......
.....01LL10.....
....011LL110....
...01LLLLLL10...
...0111111110...
..000000000000..
................`],

  [laserA, bitmap`
..0000....0000..
..0330....0330..
..0000....0000..
....03333330....
....03522530....
....03522530....
....03333330....
.2....0330....2.
....03333330....
....03522530....
....03522530....
....03333330....
..2...0330...2..
..0000....0000..
..0330....0330..
..0000....0000..`],

  [laserI, bitmap`
..0000....0000..
..0LL0....0LL0..
..0000....0000..
................
................
................
................
................
................
................
................
................
................
..0000....0000..
..0LL0....0LL0..
..0000....0000..`],

  [pad1, bitmap`
................
................
..770......770..
..77770..77770..
..772770772770..
...77277772770..
....772222770...
.....7722770....
....772222770...
...77277772770..
..772770772770..
..77770..77770..
..770......770..
................
................
................`],

  [pad2, bitmap`
................
................
....770......770
..777770...77777
.77772770.777277
..77772777772770
...777722222770.
....7777222770..
...777722222770.
..77772777772770
.77772770.777277
..777770...77777
....770......770
................
................
................`],

  [gli1, bitmap`
0000888877770000
8888222200008888
7777000055557777
0000888822220000
2222777700008888
0000000088887777
8888222200005555
7777000088882222
0000555577770000
8888000000008888
2222777788880000
0000888800007777
7777000055558888
8888222277770000
0000777700008888
8888000022227777`],

  [gli2, bitmap`
8888000022227777
0000777700008888
8888222277770000
7777000055558888
0000888800007777
2222777788880000
8888000000008888
0000555577770000
7777000088882222
8888222200005555
0000000088887777
2222777700008888
0000888822220000
7777000055557777
8888222200008888
0000888877770000`],

  [fog, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],

  [eyes, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0003300000033000
0032230000322300
0003300000033000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],

  [star, bitmap`
.......22.......
......2552......
......2552......
.....255552.....
....25522552....
...2552222552...
..255522225552..
2255222222225522
2255222222225522
..255522225552..
...2552222552...
....25522552....
.....255552.....
......2552......
......2552......
.......22.......`],

  [part, bitmap`
..5...3...4...7.
...5.3.....4.7..
.2..5...9...4...
..2....9.9...5..
....3...9...5.5.
.7...3.....5....
..7...5...2...3.
...7.5...2.2.3..
.4..5...2...3...
..4....8.8...5..
....9...8...5.5.
.3...9.....5....
..3...7...4...2.
...3.7...4.4.2..
.5..7...4...2...
..5....5.5...7..`],

  [swOff, bitmap`
................
................
................
......0000......
.....033330.....
.....032230.....
......0000......
.......010......
.......010......
......01110.....
.....01LLLL0....
....01LLLLLL0...
...01111111110..
..0000000000000.
................
................`],

  [swOn, bitmap`
................
................
................
................
................
.......010......
......0110......
.....044440.....
.....042240.....
......0000......
.....01LLLL0....
....01LLLLLL0...
...01111111110..
..0000000000000.
................
................`],

  [gate, bitmap`
0000000000000000
1111111111111111
0033003300330033
0033003300330033
0022002200220022
0022002200220022
0033003300330033
0033003300330033
0033003300330033
0033003300330033
0022002200220022
0022002200220022
0033003300330033
0033003300330033
1111111111111111
0000000000000000`],

  [clone, bitmap`
................
....00000000....
...0999999990...
..092222222290..
..022222222220..
..020000222220..
..020000222220..
...0222222220...
....00000000....
...0888888880...
..088008800880..
..088888888880..
...0111111110...
...0110000110...
...0110..0110...
..00000..00000..`],

  [boss, bitmap`
....00000000....
...0333333330...
..033552255330..
.03355222255330.
.03522222222530.
0352222222222530
0352222222222530
0335522222255330
0333355225533330
.03333333333330.
.00000000000000.
..011111111110..
.011LLLLLLLL110.
.01L53535353L10.
0111111111111110
0000000000000000`],

  [bossHit, bitmap`
....00000000....
...0222222220...
..022222222220..
.02222222222220.
.02222222222220.
0222222222222220
0222222222222220
0222222222222220
0222222222222220
.02222222222220.
.00000000000000.
..011111111110..
.011LLLLLLLL110.
.01L23232323L10.
0111111111111110
0000000000000000`],

  [shield, bitmap`
.77777777777777.
7222222222222227
72............27
72............27
72............27
72............27
72............27
72............27
72............27
72............27
72............27
72............27
72............27
72............27
7222222222222227
.77777777777777.`],

  [winCup, bitmap`
...2...5555...2.
..22..522225..22
.555555222255555
.50055555555005.
.50055555555005.
..555555555555..
....55555555....
.....555555.....
......5555......
.......55.......
.......55.......
......5555......
.....555555.....
....00000000....
...0111111110...
...0000000000...`],

  [csBL, bitmap`
...........00000
.......000044444
....000444445522
..00444444552222
.044444455222222
0444444455222222
0444444444552222
0444444444445522
0444444444444444
0444444444444444
0444444444444444
0000000000000000
1111111111111111
LLLLLLLLLLLLLLLL
0000000000000000
................`],

  [csBR, bitmap`
00000...........
444440000.......
224444444000....
22224444444400..
222244444444440.
2222444444444440
2244444444444440
4444444444444440
4444444444444440
4444444444444440
4444444444444440
0000000000000000
1111111111111111
LLLLLLLLLLLLLLLL
0000000000000000
................`],

  [csPL, bitmap`
................
................
................
................
................
................
...........00000
.......000044444
....000444445522
..00444444552222
.044444455222222
0000000000000000
4444444444444444
2222222222222222
0000000000000000
................`],

  [csPR, bitmap`
................
................
................
................
................
................
00000...........
444440000.......
224444444000....
22224444444400..
222244444444440.
0000000000000000
4444444444444444
2222222222222222
0000000000000000
................`],

  [csH1, bitmap`
......022220....
.....02777720...
.....02777720...
.....02777720...
.....02777720...
.....02777720...
.....02777720...
.....02777720...
.....02777720...
.....02777720...
.....02777720...
.....02777720...
.....02777720...
.....02777720...
......022220....
.......0000.....`],

  [csH2, bitmap`
......011110....
......01LL10....
......01LL10....
......01LL10....
......000000....
......022220....
.....02777720...
.....02777720...
.....02777720...
.....02777720...
.....02777720...
.....02777720...
.....02777720...
.....02777720...
......022220....
.......0000.....`],

  [csH3, bitmap`
......011110....
......01LL10....
......01LL10....
......01LL10....
......01LL10....
......01LL10....
......000000....
......022220....
.....02777720...
.....02777720...
.....02777720...
.....02777720...
.....02777720...
......022220....
.......0000.....
......055550....`],

  [csDL, bitmap`
0000000000000000
0111111111111111
01LLLLLLLLLLLLLL
01L550055005500L
01L550055005500L
01LLLLLLLLLLLLLL
01L777777777777L
01L777777777777L
01LLLLLLLLLLLLLL
0111111111111111
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0000000000000000
................
................
................`],

  [csDR, bitmap`
0000000000000000
1111111111111110
LLLLLLLLLLLLLL10
L005500550055L10
L005500550055L10
LLLLLLLLLLLLLL10
L444444444444L10
L444444444444L10
LLLLLLLLLLLLLL10
1111111111111110
LLLLLLLLLLLLLLL0
LLLLLLLLLLLLLLL0
0000000000000000
................
................
................`],

  [csSpk, bitmap`
.2.....55.....2.
..2...5225...2..
...2.522225.2...
....52222225....
...5222222225...
..522222222225..
.52222222222225.
5522222222222255
5522222222222255
.52222222222225.
..522222222225..
...5222222225...
....52222225....
...2.522225.2...
..2...5225...2..
.2.....55.....2.`]
);

setBackground(floorTile);
setSolids([wallT, wallB, doorC, gate]);

const cBlack = color`0`;
const cGray = color`1`;
const cWhite = color`2`;
const cRed = color`3`;
const cGreen = color`4`;
const cYellow = color`5`;
const cOrange = color`6`;
const cCyan = color`7`;
const cBlue = color`8`;
const cPurple = color`9`;

const sStep1 = tune`30: G2-25`;
const sStep2 = tune`30: A2-25`;
const sClick = tune`50: B4-40, 50: E5-40, 100: G#5-90, 200: E6~180`;
const sBuzz = tune`90: F3/80, 90: D#3/110`;
const sZap = tune`50: C6/40, 50: B5/40, 50: A5/40, 90: G#5/70`;
const sWarp = tune`60: C4^50, 60: E4^50, 60: G4^50, 60: B4^50, 120: C5^100`;
const sGli = tune`30: C7/25, 30: F#2/25, 30: B6/25, 30: C3/25`;
const sHonk = tune`120: F#4-100, 140: G4-120`;
const sHit = tune`50: E2-40, 50: C2-40, 100: B1-80`;
const sFanfare = tune`120: G4^100, 120: C5^100, 120: E5^100, 240: G5^200, 120: E5^100, 360: G5^300`;
const sVoice = tune`30: A4^20`;
const sServo = tune`80: G3-60, 80: B3-60, 80: E4-80`;
const sDoor = tune`70: C3-50, 70: F3-50, 100: A3-80`;
const sSwitch = tune`40: C5-30, 60: G5-50`;
const sAlarm = tune`100: E5^80, 100: C5^80`;

const bgmTitle = tune`180: C3-120, 180: G3-120, 180: D#3-120, 180: G3-120, 180: C4^140, 180: A#3^140, 180: G3-120, 180: D#3-120, 180: F3-120, 180: C4-120, 180: G#3-120, 180: C4-120, 180: D4^140, 180: C4^140, 180: G#3-120, 180: F3-120`;
const bgmCorridor = tune`160: C3-100, 160: E3-100, 160: G3-100, 160: B3-100, 160: A3^120, 160: G3-100, 160: E3-100, 160: D3-100, 160: F3-100, 160: A3-100, 160: C4-100, 160: E4-100, 160: D4^120, 160: C4-100, 160: A3-100, 160: G3-100`;
const bgmHorror = tune`300: C2~250, 300: F#2~250, 300: C2~250, 300: F2~250, 300: D#2~250, 300: D2~250, 300: C#2~250, 300: C2~250`;
const bgmBoss = tune`120: E2-80, 120: E2-80, 120: G2-80, 120: E2-80, 120: A#2^90, 120: A2^90, 120: G2-80, 120: E2-80, 120: D2-80, 120: D2-80, 120: F2-80, 120: D2-80, 120: G#2^90, 120: G2^90, 120: F2-80, 120: D2-80`;
const bgmVictory = tune`140: C4^120, 140: E4^120, 140: G4^120, 280: C5^240, 140: G4^120, 280: C5^240, 140: D5^120, 140: E5^120, 420: F5^380, 140: E5^120, 140: D5^120, 560: C5^500`;

let curBgm = null;
let curTrack = null;
let optMusic = true;
let optSound = true;
let optShake = true;
let optTimer = true;

function playMusic(track) {
  if (!optMusic) return;
  if (curBgm && curTrack === track) return;
  stopMusic();
  try {
    curTrack = track;
    curBgm = playTune(track, Infinity);
  } catch (e) {}
}

function stopMusic() {
  if (curBgm) {
    try { curBgm.end(); } catch (e) {}
    curBgm = null;
    curTrack = null;
  }
}

function playSfx(s) {
  if (!optSound || !s) return;
  try { playTune(s); } catch (e) {}
}

const mapMenu = map`
wwwwlwwwwwlwwwww
................
...s........s...
.......Bb.......
......DN........
................
................
WWWWWWWWWWWWWWWW`;

const mapIntroBoot = map`
WWWWWWWWWWWWWWWW
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
WWWWWWWWWWWWWWWW`;

const mapIntroDoors = map`
WWWWWWWWWWWWWWWW
WeeeeeeeeeeeeeeW
WeeeeeeeeeeeeeeW
WeeeeeeeeeeeeeeW
WeeeeeeeeeeeeeeW
WeeeeeeeeeeeeeeW
WeeeeeeeeeeeeeeW
WWWWWWWWWWWWWWWW`;

const mapCS1 = map`
wwwwlwwwwwlwwwww
................
.......H........
.......H........
......Bb........
......DN........
................
WWWWWWWWWWWWWWWW`;

const mapCS2 = map`
wwwwlwwwwwlwwwww
................
.......A........
.......H........
......Bb........
......DN........
................
WWWWWWWWWWWWWWWW`;

const mapCS3 = map`
wwwwlwwwwwlwwwww
.......A........
.......A........
.......F........
......Bb........
......DN........
................
WWWWWWWWWWWWWWWW`;

const mapCS4 = map`
wwwwlwwwwwlwwwww
.......A........
.......A........
.......F........
.....XKVX.......
......DN........
................
WWWWWWWWWWWWWWWW`;

const mapCS5 = map`
ssssssssssssssss
ssssssssssssssss
ssssssssssssssss
ssssssssssssssss
ssssssssssssssss
ssssssssssssssss
ssssssssssssssss
ssssssssssssssss`;

const mapCSPanic1 = map`
wwwwlwwwwwlwwwww
................
................
......Bb........
......DN........
................
................
WWWWWWWWWWWWWWWW`;

const mapCSPanic2 = map`
wwwwlwwwwwlwwwww
................
.......H........
......Bb........
......DN........
................
................
WWWWWWWWWWWWWWWW`;

const mapCSPanic3 = map`
wwwwlwwwwwlwwwww
................
.......A........
.......F........
.....XKVX.......
......DN........
................
WWWWWWWWWWWWWWWW`;

const mapCSLaser1 = map`
wwwwzwwwwwzwwwww
................
z..............z
......Bb........
......DN........
z..............z
................
WWWWZWWWWWZWWWWW`;

const mapCSLaser2 = map`
zzzzzzzzzzzzzzzz
................
zz....XX......zz
.....XKVX.......
......DN........
zz............zz
................
ZZZZZZZZZZZZZZZZ`;

const mapCSGlitch1 = map`
wwwwgwwwwjwwwwww
...j.....g......
g.g...j...g...j.
.....XKVX.......
......DN........
..g.....j.....g.
................
WWWWjWWWWgWWWWWW`;

const mapCSGlitch2 = map`
gjgjgjgjgjgjgjgj
jkgjgjgjgjgjgjgk
gjgYYgjgjgYYgjgj
jgjgjgjgjgjgjgjg
gjgjgjgjgjgjgjgj
jkgjgjgjgjgjgjgk
gjgjgjgjgjgjgjgj
jgjgjgjgjgjgjgjg`;

const mapCSBossBoom1 = map`
wwwwlwwwwwlwwwww
................
e.....XmX.....e.
ep....XMX.....o.
e.....XmX.....e.
................
................
WWWWWWWWWWWWWWWW`;

const mapCSBossBoom2 = map`
wwwwlwwwwwlwwwww
..c...c...c...c.
e....XXsXX....e.
ep..XssMssX...o.
e....XXsXX....e.
..c...c...c...c.
................
WWWWWWWWWWWWWWWW`;

const corridorLevels = [
  map`
wwwwlwwwwwlwwwww
................
................
................
ep............o.
................
................
WWWWWWWWWWWWWWWW`,

  map`
wwwwlwwwwwlwwwww
................
................
................
ep............o.
................
................
WWWWWWWWWWWWWWWW`,

  map`
wwwwlwwwwwlwwwww
................
................
................
ep............o.
................
................
WWWWWWWWWWWWWWWW`,

  map`
wwwwlwwwwwlwwwww
................
................
................
ep............o.
................
................
WWWWWWWWWWWWWWWW`,

  map`
wwwwlwwwwwlwwwww
................
e.t...t...t...t.
ep.t...t...t..o.
e...t...t...t.t.
................
................
WWWWWWWWWWWWWWWW`,

  map`
wwwwlwwwwwlwwwww
................
e...z...z...z...
ep..z...z...z.o.
e...z...z...z...
................
................
WWWWWWWWWWWWWWWW`,

  map`
wwwwlwwwwwlwwwww
................
e...d..d..d..d..
ep..d..d..o..d..
e...d..d..d..d..
................
................
WWWWWWWWWWWWWWWW`,

  map`
wwwwlwwwwwlwwwww
................
................
................
ep............o.
................
................
WWWWWWWWWWWWWWWW`,

  map`
WWWWWWWWWWWWWWWW
................
................
................
ev............o.
................
................
wwwwlwwwwwlwwwww`,

  map`
wwwwLwwwwwwLwwww
e...k......k...e
e...k......k...e
ep..k......k..o.
e...k......k...e
e...k......k...e
................
WWWWLWWWWWWLWWWW`,

  map`
wwwwgwwwwjwwwwww
...j.....g......
e.g...j...g...j.
ep..g...j...g.o.
e...j.g...j...g.
..g.....j.....g.
................
WWWWjWWWWgWWWWWW`,

  map`
wwwwlwwwwwlwwwww
..r.............
e.wwww..........
ep...w......C.o.
e.wwww..........
................
................
WWWWWWWWWWWWWWWW`,

  map`
wwwwlwwwwwlwwwww
....r...........
e.......r.......
ep..........G.o.
e.....r.........
................
................
WWWWWWWWWWWWWWWW`,

  map`
wwwwlwwwwwlwwwww
................
................
................
ep............i.
................
................
WWWWWWWWWWWWWWWW`,

  map`
wwwwlwwwwwlwwwww
................
e.............m.
ep............Sm
e.............m.
................
................
WWWWWWWWWWWWWWWW`,

  map`
wwwwlwwwwwlwwwww
..c...c...c...c.
e.......y.......
ep..............
e...............
..c...c...c...c.
................
WWWWWWWWWWWWWWWW`
];

const dialogues = [
  { t: "00: DER ANFANG", m: "DRUECK BUTTON!" },
  { t: "01: WARUM WIEDER", m: "NICHT DRUECKEN!" },
  { t: "02: 40M SPRINT", m: "LAUFE MIT (D)" },
  { t: "03: PANIK-BUTTON", m: "FANG DEN BUTTON!" },
  { t: "04: TURBO-BAHN", m: "SCHNELLER SPRINT" },
  { t: "05: LASER-FALLE", m: "PASS AUF LASER!" },
  { t: "06: KOEDER-FELD", m: "NUR EINER ECHT!" },
  { t: "07: DUNKELHEIT", m: "SUCH IM DUNKELN" },
  { t: "08: SCHWERKRAFT", m: "ALLES STEHT KOPF" },
  { t: "09: FAHRSTUHL", m: "EBENE -99 METER" },
  { t: "10: GLITCH-WELT", m: "SYSTEM-FEHLER!" },
  { t: "11: SCHATTEN", m: "NUTZE DEN KLON!" },
  { t: "12: 3 SCHALTER", m: "OEFFNE SCHLEUSE" },
  { t: "13: MINI-BUTTON", m: "TREFF DEN PUNKT" },
  { t: "14: MECHA-BOSS", m: "WEICHE AUS!" },
  { t: "15: GESCHAFFT!", m: "DU HAST GESIEGT" }
];

const stageIntros = [
  { t: "00: DER ANFANG", m: "SCHAU NICHT HIN" },
  { t: "01: WARUM WIEDER", m: "ICH HABS GESAGT" },
  { t: "02: 40M SPRINT", m: "AUSDAUER-TEST!" },
  { t: "03: PANIK-BUTTON", m: "ER HAT ANGST!" },
  { t: "04: TURBO-BAHN", m: "VOLLGAS ERLAUBT" },
  { t: "05: LASER-FALLE", m: "LASER AKTIV!" },
  { t: "06: KOEDER-FELD", m: "FINDE DAS ECHTE" },
  { t: "07: DUNKELHEIT", m: "LICHT AUS!" },
  { t: "08: SCHWERKRAFT", m: "KOPFUEBER!" },
  { t: "09: FAHRSTUHL", m: "EBENE -99 METER" },
  { t: "10: GLITCH-WELT", m: "FEHLER 0x00!" },
  { t: "11: SCHATTEN", m: "SPIEGELBILD..." },
  { t: "12: 3 SCHALTER", m: "3 SCHLOESSER!" },
  { t: "13: MINI-BUTTON", m: "WO IST ER HIN?" },
  { t: "14: MECHA-BOSS", m: "ABWEHR-MECHA!" },
  { t: "15: GESCHAFFT!", m: "UNBELEHRBAR!" }
];

const ST_MENU = 0;
const ST_LEVELS = 1;
const ST_JUKEBOX = 2;
const ST_OPTIONS = 3;
const ST_STATS = 4;
const ST_HELP = 5;
const ST_GAME = 6;
const ST_CUTSCENE = 7;
const ST_PAUSE = 8;
const ST_INTRO = 9;

let gameState = ST_MENU;
let menuCursor = 0;
let curLvl = 0;
let walkFrame = 0;
let inCutscene = false;

let animTimer = null;
let laserTimer = null;
let lasersActive = true;
let bossHp = 5;
let bossTimer = null;
let bossShieldOn = true;

let scrollX = 1;
const scrollMax = 40;

let elevFloor = 0;
let elevTimer = null;
let switchesHit = 0;

let lastMoveTime = 0;
const MOVE_COOLDOWN = 160;
let rushCounter = 0;
let lastMoveDir = "";
let introTimeouts = [];

let stats = {
  presses: 0,
  steps: 0,
  deaths: 0,
  start: Date.now()
};

function setUI(l1, l2, c1 = cOrange, c2 = cWhite) {
  clearText();
  if (l1) addText(l1, { y: 0, color: c1 });
  if (l2) addText(l2, { y: 1, color: c2 });
  if (optTimer && gameState === ST_GAME) {
    const sec = Math.floor((Date.now() - stats.start) / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    addText((m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s), { x: 11, y: 0, color: cCyan });
  }
}

function shake(ms = 150) {
  if (!optShake) return;
  const p = getPlayer();
  if (!p) return;
  const ox = p.x;
  p.x = Math.max(0, p.x + (Math.random() > 0.5 ? 1 : -1));
  setTimeout(() => {
    const cp = getPlayer();
    if (cp) cp.x = ox;
  }, ms / 2);
}

function clearTimers() {
  if (animTimer) { clearInterval(animTimer); animTimer = null; }
  if (laserTimer) { clearInterval(laserTimer); laserTimer = null; }
  if (bossTimer) { clearInterval(bossTimer); bossTimer = null; }
  if (elevTimer) { clearInterval(elevTimer); elevTimer = null; }
  introTimeouts.forEach(t => clearTimeout(t));
  introTimeouts = [];
}

function playPrologue() {
  clearTimers();
  gameState = ST_INTRO;
  inCutscene = true;
  stopMusic();

  setMap(mapIntroBoot);
  setUI("SYSTEM BOOT...", "EINRICHTUNG 404", cCyan, cWhite);
  addText("(J) SKIP INTRO", { y: 13, color: cYellow });
  playSfx(sServo);

  function schedule(fn, delay) {
    const t = setTimeout(fn, delay);
    introTimeouts.push(t);
  }

  schedule(() => {
    setUI("SUBJEKT: 0-42", "STATUS: BEREIT", cGreen, cWhite);
    addText("(J) SKIP INTRO", { y: 13, color: cYellow });
    playSfx(sClick);
  }, 900);

  schedule(() => {
    setMap(mapIntroDoors);
    setUI("SICHERHEIT...", "SCHLEUSE OEFFNEN", cRed, cOrange);
    addText("(J) SKIP INTRO", { y: 13, color: cYellow });
    playSfx(sAlarm);
    shake(180);
  }, 1800);

  schedule(() => {
    setMap(corridorLevels[0]);
    setUI("NARRATOR:", "WILLKOMMEN IM KORRIDOR.", cOrange, cWhite);
    addText("(J) SKIP INTRO", { y: 13, color: cYellow });
    playSfx(sDoor);
    playMusic(bgmCorridor);
  }, 2800);

  schedule(() => {
    setUI("NARRATOR:", "REGEL: KEIN BUTTON-DRUCK!", cRed, cYellow);
    addText("(J) SKIP INTRO", { y: 13, color: cYellow });
    playSfx(sVoice);
  }, 3900);

  schedule(() => {
    setUI("NARRATOR:", "ES IST EINE FALLE. KLAR?", cYellow, cGreen);
    addText("(J) SKIP INTRO", { y: 13, color: cYellow });
    playSfx(sVoice);
  }, 5000);

  schedule(() => {
    shake(120);
    playSfx(sDoor);
    inCutscene = false;
    loadLevel(0);
  }, 6200);
}

function skipPrologue() {
  clearTimers();
  inCutscene = false;
  loadLevel(0);
}

function playStageIntro(idx, onDone) {
  inCutscene = true;
  clearText();
  getAll(lampOn).forEach(l => { l.type = lampOff; });

  const dClosed = getFirst(doorC);
  if (dClosed) dClosed.type = doorO;
  playSfx(sDoor);

  setTimeout(() => {
    const lamps = getAll(lampOff);
    if (lamps.length > 0) lamps[0].type = lampOn;
    playSfx(sClick);

    setTimeout(() => {
      const moreLamps = getAll(lampOff);
      moreLamps.forEach(l => { l.type = lampOn; });
      playSfx(sClick);

      const dO = getFirst(doorO);
      if (dO) dO.type = doorC;
      playSfx(sDoor);
      shake(80);

      const intro = stageIntros[idx];
      setUI(intro.t, intro.m, cCyan, cOrange);
      playSfx(sVoice);

      setTimeout(() => {
        inCutscene = false;
        if (onDone) onDone();
      }, 400);
    }, 180);
  }, 180);
}

function playCutsceneArm(cb) {
  inCutscene = true;
  gameState = ST_CUTSCENE;
  clearTimers();
  stats.presses += 1;

  setMap(mapCS1);
  setUI("ZIEL ERFASST", "ARM FAEHRT AUS", cCyan, cWhite);
  playSfx(sServo);

  setTimeout(() => {
    setMap(mapCS2);
    setUI("ANNAEHERUNG...", "DRUCK ERHOEHT", cOrange, cWhite);
    playSfx(sServo);

    setTimeout(() => {
      setMap(mapCS3);
      setUI("KONTAKT!", "FINGER AUF BUTTON", cRed, cOrange);
      playSfx(sVoice);

      setTimeout(() => {
        setMap(mapCS4);
        setUI("KLICK!!!", "KLICK! VOLLTREFFER", cGreen, cOrange);
        playSfx(sClick);
        shake(250);

        setTimeout(() => {
          setMap(mapCS5);
          setUI("SYSTEM REBOOT...", "REBOOT LAEUFT...", cRed, cCyan);
          playSfx(sWarp);

          setTimeout(() => {
            inCutscene = false;
            if (cb) cb();
          }, 500);
        }, 450);
      }, 450);
    }, 400);
  }, 400);
}

function playCutscenePanic(cb) {
  inCutscene = true;
  gameState = ST_CUTSCENE;
  clearTimers();
  stats.presses += 1;

  setMap(mapCSPanic1);
  setUI("BUTTON:", "BITTE NICHT!", cRed, cYellow);
  playSfx(sHonk);

  setTimeout(() => {
    setMap(mapCSPanic2);
    setUI("BUTTON:", "ICH HAB FAMILIE", cOrange, cWhite);
    playSfx(sHonk);
    shake(100);

    setTimeout(() => {
      setMap(mapCSPanic3);
      setUI("SPLAT!", "VOLLTREFFER!", cGreen, cRed);
      playSfx(sClick);
      shake(250);

      setTimeout(() => {
        setMap(mapCS5);
        setUI("SYSTEM RESET", "NEUER VERSUCH...", cCyan, cWhite);
        playSfx(sWarp);

        setTimeout(() => {
          inCutscene = false;
          if (cb) cb();
        }, 500);
      }, 450);
    }, 450);
  }, 450);
}

function playCutsceneLaser(cb) {
  inCutscene = true;
  gameState = ST_CUTSCENE;
  clearTimers();
  stats.presses += 1;

  setMap(mapCSLaser1);
  setUI("WARNUNG!", "UEBERLASTUNG!", cRed, cCyan);
  playSfx(sAlarm);
  shake(150);

  setTimeout(() => {
    setMap(mapCSLaser2);
    setUI("ALARM: LASER!", "KERN-SCHMELZE!", cOrange, cRed);
    playSfx(sZap);
    shake(250);

    setTimeout(() => {
      setMap(mapCS5);
      setUI("NOTABSCHALTUNG", "KUEHLUNG AN", cCyan, cWhite);
      playSfx(sWarp);

      setTimeout(() => {
        inCutscene = false;
        if (cb) cb();
      }, 500);
    }, 500);
  }, 500);
}

function playCutsceneGlitch(cb) {
  inCutscene = true;
  gameState = ST_CUTSCENE;
  clearTimers();
  stats.presses += 1;

  setMap(mapCSGlitch1);
  setUI("CRITICAL ERROR", "0x00F8 CODE LEAK", cRed, cGreen);
  playSfx(sGli);

  setTimeout(() => {
    setMap(mapCSGlitch2);
    setUI("MATRIX RESET", "REALITAET DEFEKT", cYellow, cRed);
    playSfx(sGli);
    shake(300);

    setTimeout(() => {
      setMap(mapCS5);
      setUI("RECONSTRUCTING", "REBOOT LAEUFT", cCyan, cWhite);
      playSfx(sWarp);

      setTimeout(() => {
        inCutscene = false;
        if (cb) cb();
      }, 500);
    }, 500);
  }, 500);
}

function playCutsceneBossBoom(cb) {
  inCutscene = true;
  gameState = ST_CUTSCENE;
  clearTimers();
  stats.presses += 1;

  setMap(mapCSBossBoom1);
  setUI("BOSS KRITISCH!", "BOOM! DETONATION", cRed, cOrange);
  playSfx(sHit);
  shake(200);

  setTimeout(() => {
    setMap(mapCSBossBoom2);
    setUI("SUPERNOVA!", "RIESEN EXPLOSION", cYellow, cRed);
    playSfx(sZap);
    shake(350);

    setTimeout(() => {
      setMap(mapCS5);
      setUI("BOSS BESIEGT!", "SEKTOR GEREINIGT", cGreen, cWhite);
      playSfx(sFanfare);

      setTimeout(() => {
        inCutscene = false;
        if (cb) cb();
      }, 600);
    }, 500);
  }, 500);
}

function triggerLevelCutscene(lvl, cb) {
  if (lvl === 1 || lvl === 3) playCutscenePanic(cb);
  else if (lvl === 5 || lvl === 9) playCutsceneLaser(cb);
  else if (lvl === 7 || lvl === 10) playCutsceneGlitch(cb);
  else if (lvl === 14) playCutsceneBossBoom(cb);
  else playCutsceneArm(cb);
}

function startAnims() {
  clearTimers();
  let pulse = false;

  animTimer = setInterval(() => {
    pulse = !pulse;

    getAll(btn).concat(getAll(btnGlow)).forEach(b => {
      b.type = pulse ? btnGlow : btn;
    });

    getAll(lampOn).concat(getAll(lampOff)).forEach(l => {
      if (Math.random() < 0.2) l.type = pulse ? lampOff : lampOn;
    });

    getAll(pad1).concat(getAll(pad2)).forEach(sp => {
      sp.type = pulse ? pad2 : pad1;
    });

    getAll(gli1).concat(getAll(gli2)).forEach(g => {
      g.type = pulse ? gli2 : gli1;
    });

    const sh = getFirst(shield);
    if (sh) sh.type = pulse ? shield : bossHit;

    if (gameState === ST_GAME && curLvl === 10 && Math.random() < 0.2) {
      playSfx(sGli);
    }
  }, 350);

  if (gameState === ST_GAME && curLvl === 5) {
    laserTimer = setInterval(() => {
      lasersActive = !lasersActive;
      const target = lasersActive ? laserA : laserI;
      const curType = lasersActive ? laserI : laserA;
      getAll(curType).forEach(l => { l.type = target; });
      if (lasersActive) playSfx(sZap);
    }, 700);
  }

  if (gameState === ST_GAME && curLvl === 14) {
    startBoss();
  }
}

function renderScroll() {
  const camX = Math.max(0, Math.min(scrollMax - 16, scrollX - 7));
  for (let x = 0; x < 16; x++) {
    const wx = camX + x;
    for (let y = 1; y < 7; y++) clearTile(x, y);

    if (wx === 0) addSprite(x, 4, doorC);
    if (wx === 10 || wx === 20 || wx === 30) addSprite(x, 4, pad1);
    if (wx === 38) addSprite(x, 4, btn);
    if (wx === scrollX) addSprite(x, 4, p1);
  }
  setUI("40-METER-SPRINT", scrollX + "M / " + scrollMax + "M", cOrange, cCyan);
}

function updateDark() {
  if (gameState !== ST_GAME || curLvl !== 7) return;
  getAll(fog).forEach(k => k.remove());
  getAll(eyes).forEach(y => y.remove());
  const p = getPlayer();
  if (!p) return;

  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      const d = Math.abs(x - p.x) + Math.abs(y - p.y);
      const vis = (d <= 2) || (x >= 13 && y >= 3 && y <= 5);
      if (!vis) {
        addSprite(x, y, fog);
        if ((x === 6 && y === 2) || (x === 11 && y === 5)) addSprite(x, y, eyes);
      }
    }
  }
}

function startElevator() {
  elevFloor = 0;
  playSfx(sAlarm);
  elevTimer = setInterval(() => {
    elevFloor -= 15;
    shake(80);
    playSfx(sServo);
    setUI("EBENE: " + elevFloor + "M", "FAHRT NACH -99M", cRed, cCyan);

    if (elevFloor <= -99) {
      clearInterval(elevTimer);
      elevTimer = null;
      playSfx(sFanfare);
      setUI("EBENE -99 ERREICHT!", "TUER GEOEFFNET", cGreen, cWhite);
      const d = getFirst(doorC);
      if (d) {
        d.type = doorO;
        setTimeout(() => { if (d) d.type = doorC; }, 500);
      }
    }
  }, 350);
}

function startBoss() {
  let step = 0;
  bossTimer = setInterval(() => {
    step = (step + 1) % 4;
    if (step === 1) {
      setUI("WARNUNG: LASER!", "WEICHE AUS!", cRed, cCyan);
      playSfx(sAlarm);
    } else if (step === 2) {
      shake(200);
      playSfx(sZap);
      for (let x = 2; x < 12; x++) addSprite(x, 4, laserA);
      const p = getPlayer();
      if (p && p.y === 4) zapPlayer();
    } else if (step === 3) {
      getAll(laserA).forEach(l => l.remove());
      bossShieldOn = false;
      const sh = getFirst(shield);
      if (sh) sh.type = star;
      setUI("SCHILD DEFEKT!", "GREIF DEN BOSS AN", cGreen, cOrange);
      playSfx(sVoice);
      setTimeout(() => {
        bossShieldOn = true;
        const sp = getFirst(star);
        if (sp) sp.type = shield;
      }, 1800);
    }
  }, 1200);
}

function getPlayer() {
  return getFirst(p1) || getFirst(pZap) || getFirst(pInv);
}

function loadLevel(idx) {
  gameState = ST_GAME;
  curLvl = idx;
  clearTimers();
  rushCounter = 0;

  if (idx === 7) playMusic(bgmHorror);
  else if (idx === 14) playMusic(bgmBoss);
  else if (idx === 15) playMusic(bgmVictory);
  else playMusic(bgmCorridor);

  if (idx === 2) {
    scrollX = 1;
    setMap(corridorLevels[2]);
    renderScroll();
    startAnims();
    playStageIntro(2);
    return;
  }

  setMap(corridorLevels[curLvl]);

  if (idx === 8) {
    const p = getPlayer();
    if (p) p.type = pInv;
  } else if (idx === 9) {
    startElevator();
  } else if (idx === 12) {
    switchesHit = 0;
  } else if (idx === 14) {
    bossHp = 5;
    bossShieldOn = true;
  } else if (idx === 7) {
    updateDark();
  }

  startAnims();
  playStageIntro(curLvl);
}

function zapPlayer() {
  const p = getPlayer();
  if (!p) return;
  stats.deaths += 1;
  p.type = pZap;
  playSfx(sZap);
  shake(200);
  setUI("ZAP! ERWISCHT!", "NEUSTART...", cRed, cCyan);

  setTimeout(() => {
    const cp = getPlayer();
    if (cp) {
      cp.type = (curLvl === 8) ? pInv : p1;
      cp.x = 1;
      cp.y = 4;
    }
  }, 400);
}

function selectMenuItem() {
  playSfx(sClick);
  if (menuCursor === 0) playPrologue();
  else if (menuCursor === 1) showLevels();
  else if (menuCursor === 2) showJukebox();
  else if (menuCursor === 3) showOptions();
  else if (menuCursor === 4) showStats();
  else if (menuCursor === 5) showHelp();
}

function showMenu() {
  gameState = ST_MENU;
  menuCursor = 0;
  clearTimers();
  playMusic(bgmTitle);
  setMap(mapMenu);
  drawMenu();
  startAnims();
}

function drawMenu() {
  clearText();
  addText("THE CORRIDOR", { y: 0, color: cOrange });
  addText("DELUXE", { y: 1, color: cCyan });

  const m = [
    "1. START",
    "2. LEVEL",
    "3. JUKEBOX",
    "4. OPTIONEN",
    "5. REKORDE",
    "6. HILFE"
  ];
  for (let i = 0; i < m.length; i++) {
    const sel = (menuCursor === i);
    addText((sel ? "> " : "  ") + m[i], { y: 7 + i, color: sel ? cGreen : cWhite });
  }
  addText("W/S:WAHL  J:OK", { y: 13, color: cYellow });
}

function showLevels() {
  gameState = ST_LEVELS;
  menuCursor = curLvl;
  drawLevels();
}

function drawLevels() {
  clearText();
  addText("LEVEL-AUSWAHL", { y: 0, color: cOrange });
  addText("W/S:WAHL  J:START", { y: 1, color: cCyan });
  const d = dialogues[menuCursor];
  addText(">> " + d.t, { y: 8, color: cGreen });
  addText(d.m, { y: 10, color: cWhite });
  addText("J:START  K:MENUE", { y: 13, color: cRed });
}

function showJukebox() {
  gameState = ST_JUKEBOX;
  menuCursor = 0;
  drawJukebox();
}

function drawJukebox() {
  clearText();
  addText("JUKEBOX", { y: 0, color: cOrange });
  addText("J:ABSPIELEN", { y: 1, color: cCyan });
  const t = [
    "1. TITEL-THEME",
    "2. KORRIDOR",
    "3. HORROR",
    "4. BOSS",
    "5. SIEG",
    "6. SFX TEST"
  ];
  for (let i = 0; i < t.length; i++) {
    const sel = (menuCursor === i);
    addText((sel ? "> " : "  ") + t[i], { y: 7 + i, color: sel ? cGreen : cWhite });
  }
  addText("K:ZURUECK", { y: 13, color: cRed });
}

function showOptions() {
  gameState = ST_OPTIONS;
  menuCursor = 0;
  drawOptions();
}

function drawOptions() {
  clearText();
  addText("OPTIONEN", { y: 0, color: cOrange });
  addText("J:WECHSELN", { y: 1, color: cCyan });
  const o = [
    "MUSIK:  " + (optMusic ? "(AN)" : "(AUS)"),
    "SOUND:  " + (optSound ? "(AN)" : "(AUS)"),
    "SHAKE:  " + (optShake ? "(AN)" : "(AUS)"),
    "TIMER:  " + (optTimer ? "(AN)" : "(AUS)")
  ];
  for (let i = 0; i < o.length; i++) {
    const sel = (menuCursor === i);
    addText((sel ? "> " : "  ") + o[i], { y: 7 + i, color: sel ? cGreen : cWhite });
  }
  addText("K:ZURUECK", { y: 13, color: cRed });
}

function showStats() {
  gameState = ST_STATS;
  clearText();
  addText("STATISTIKEN", { y: 0, color: cOrange });
  const sec = Math.floor((Date.now() - stats.start) / 1000);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  addText("BUTTONS:  " + stats.presses, { y: 7, color: cWhite });
  addText("SCHRITTE: " + stats.steps, { y: 8, color: cWhite });
  addText("TODE:     " + stats.deaths, { y: 9, color: cRed });
  addText("ZEIT:     " + m + "M " + s + "S", { y: 10, color: cGreen });
  addText("J/K:ZURUECK", { y: 13, color: cCyan });
}

function showHelp() {
  gameState = ST_HELP;
  clearText();
  addText("STEUERUNG", { y: 0, color: cOrange });
  addText("W A S D:LAUFEN", { y: 7, color: cWhite });
  addText("J:INTERAGIEREN", { y: 8, color: cWhite });
  addText("K:PAUSE", { y: 9, color: cWhite });
  addText("L:MUSIK AN/AUS", { y: 10, color: cGreen });
  addText("I:NEUSTART", { y: 11, color: cGreen });
  addText("J/K:ZURUECK", { y: 13, color: cCyan });
}

function showPause() {
  gameState = ST_PAUSE;
  menuCursor = 0;
  drawPause();
}

function drawPause() {
  clearText();
  addText("PAUSE", { y: 0, color: cRed });
  const p = ["1. WEITER", "2. NEUSTART", "3. MENUE"];
  for (let i = 0; i < p.length; i++) {
    const sel = (menuCursor === i);
    addText((sel ? "> " : "  ") + p[i], { y: 7 + i, color: sel ? cGreen : cWhite });
  }
  addText("W/S:WAHL  J:OK", { y: 13, color: cYellow });
}

function move(dx, dy) {
  if (inCutscene) return;

  const now = Date.now();
  const cooldown = (gameState === ST_GAME) ? MOVE_COOLDOWN : 140;
  if (now - lastMoveTime < cooldown) return;
  lastMoveTime = now;

  if (gameState === ST_MENU) {
    if (dy < 0) menuCursor = (menuCursor + 5) % 6;
    if (dy > 0) menuCursor = (menuCursor + 1) % 6;
    if (dx > 0) { selectMenuItem(); return; }
    playSfx(sVoice);
    drawMenu();
    return;
  }
  if (gameState === ST_LEVELS) {
    if (dy < 0 || dx < 0) menuCursor = (menuCursor + 15) % 16;
    if (dy > 0 || dx > 0) menuCursor = (menuCursor + 1) % 16;
    playSfx(sVoice);
    drawLevels();
    return;
  }
  if (gameState === ST_JUKEBOX) {
    if (dy < 0) menuCursor = (menuCursor + 5) % 6;
    if (dy > 0) menuCursor = (menuCursor + 1) % 6;
    playSfx(sVoice);
    drawJukebox();
    return;
  }
  if (gameState === ST_OPTIONS) {
    if (dy < 0) menuCursor = (menuCursor + 3) % 4;
    if (dy > 0) menuCursor = (menuCursor + 1) % 4;
    playSfx(sVoice);
    drawOptions();
    return;
  }
  if (gameState === ST_PAUSE) {
    if (dy < 0) menuCursor = (menuCursor + 2) % 3;
    if (dy > 0) menuCursor = (menuCursor + 1) % 3;
    playSfx(sVoice);
    drawPause();
    return;
  }

  if (gameState === ST_GAME) {
    const dirKey = dx + "," + dy;
    if (dirKey === lastMoveDir) {
      rushCounter++;
      if (rushCounter >= 7 && curLvl !== 2) {
        playSfx(sHonk);
        setUI("TEMPOLIMIT!", "NARRATOR: LANGSAMER!", cYellow, cRed);
        rushCounter = 0;
      }
    } else {
      rushCounter = 1;
      lastMoveDir = dirKey;
    }
  }

  if (gameState === ST_GAME && curLvl === 2) {
    if (dx !== 0) {
      scrollX = Math.max(1, Math.min(scrollMax - 2, scrollX + dx));
      walkFrame = 1 - walkFrame;
      playSfx(walkFrame === 0 ? sStep1 : sStep2);
      stats.steps += 1;
      renderScroll();
      if (scrollX === scrollMax - 2) {
        triggerLevelCutscene(2, () => { loadLevel(3); });
      }
    }
    return;
  }

  const p = getPlayer();
  if (!p) return;

  if (gameState === ST_GAME && curLvl === 8) {
    dx = -dx;
    dy = -dy;
  }

  const nx = p.x + dx;
  const ny = p.y + dy;

  if (nx < 0 || nx >= width() || ny < 0 || ny >= height()) return;

  const dest = getTile(nx, ny);
  const solid = dest.some(s => s.type === wallT || s.type === wallB || s.type === doorC || s.type === gate);
  if (solid) {
    playSfx(sBuzz);
    return;
  }

  walkFrame = 1 - walkFrame;
  stats.steps += 1;
  p.x = nx;
  p.y = ny;

  playSfx(walkFrame === 0 ? sStep1 : sStep2);

  if (gameState === ST_GAME && curLvl === 11) {
    const cl = getFirst(clone);
    if (cl) {
      const cnx = cl.x - dx;
      const cny = cl.y - dy;
      if (cnx >= 0 && cnx < width() && cny >= 0 && cny < height()) {
        const cdest = getTile(cnx, cny);
        if (!cdest.some(s => s.type === wallT || s.type === wallB)) {
          cl.x = cnx;
          cl.y = cny;
          if (cdest.some(s => s.type === swOff)) {
            const sw = cdest.find(s => s.type === swOff);
            if (sw) sw.type = swOn;
            playSfx(sSwitch);
            setUI("KLON AUF SCHALTER!", "SCHLEUSE OFFEN", cGreen, cOrange);
            const g = getFirst(gate);
            if (g) g.remove();
          }
        }
      }
    }
  }

  if (gameState === ST_GAME && curLvl === 7) updateDark();

  if (dest.some(s => s.type === pad1 || s.type === pad2)) {
    playSfx(sWarp);
    setUI("TURBO SPEED!", "WUUUSCH!");
    setTimeout(() => {
      const cp = getPlayer();
      if (cp && cp.x + 3 < width() - 2) {
        cp.x += 3;
        playSfx(sStep1);
        checkAction();
      }
    }, 100);
    return;
  }

  if (gameState === ST_GAME && curLvl === 5 && lasersActive && dest.some(s => s.type === laserA)) {
    zapPlayer();
    return;
  }

  if (gameState === ST_GAME && curLvl === 3) {
    const b = getFirst(btn) || getFirst(btnGlow) || getFirst(btnSweat);
    if (b) {
      const dist = Math.abs(b.x - p.x) + Math.abs(b.y - p.y);
      if (dist <= 2) {
        b.type = btnSweat;
        if (b.x < width() - 2) {
          b.x += 1;
          playSfx(sHonk);
          setUI("ER FLIEHT!", "FANG DEN BUTTON!");
        } else if (b.y === 4) {
          b.y = Math.random() > 0.5 ? 3 : 5;
          playSfx(sHonk);
        }
      }
    }
  }

  if (gameState === ST_GAME && curLvl === 1) {
    const b = getFirst(btn) || getFirst(btnGlow);
    if (b) {
      const dist = Math.abs(b.x - p.x) + Math.abs(b.y - p.y);
      if (dist <= 2) {
        b.type = btnSweat;
        setUI("ER ZITTERT!", "NICHT DRUECKEN!", cRed, cCyan);
      }
    }
  }

  checkAction();
}

function isNearButton() {
  const p = getPlayer();
  if (!p) return false;
  const b = getFirst(btn) || getFirst(btnGlow) || getFirst(btnSweat) || getFirst(tinyB);
  if (!b) return false;
  return (Math.abs(p.x - b.x) + Math.abs(p.y - b.y) <= 1);
}

function triggerButtonPress() {
  const b = getFirst(btn) || getFirst(btnGlow) || getFirst(btnSweat) || getFirst(tinyB);
  if (b) b.type = btnPress;
  triggerLevelCutscene(curLvl, () => {
    if (curLvl + 1 < corridorLevels.length) loadLevel(curLvl + 1);
    else loadLevel(0);
  });
}

function checkAction() {
  const p = getPlayer();
  if (!p) return;

  const cur = getTile(p.x, p.y);

  const b = cur.find(s => s.type === btn || s.type === btnGlow || s.type === btnSweat || s.type === tinyB);
  if (b) {
    triggerButtonPress();
    return;
  }

  const fb = cur.find(s => s.type === decoyBtn);
  if (fb) {
    fb.type = btnPress;
    playSfx(sHonk);
    const j = ["HONK! FALSCH!", "CLOWN-TASTE!", "REINGELEGT!", "ERROR 404"];
    setUI("FALSCH!", j[Math.floor(Math.random() * j.length)], cRed, cOrange);
    return;
  }

  const sw = cur.find(s => s.type === swOff);
  if (sw) {
    sw.type = swOn;
    playSfx(sSwitch);
    switchesHit += 1;
    setUI("SCHALTER " + switchesHit + "/3", (3 - switchesHit) + " VERBLEIBEN", cGreen, cOrange);
    if (switchesHit >= 3) {
      const g = getFirst(gate);
      if (g) {
        g.remove();
        playSfx(sFanfare);
        setUI("SCHLEUSE FREI!", "BUTTON IST OFFEN", cGreen, cWhite);
      }
    }
    return;
  }

  const bs = cur.find(s => s.type === boss);
  if (bs) {
    if (bossShieldOn) {
      playSfx(sBuzz);
      setUI("SCHILD AKTIV!", "WARTE BIS ER FAELLT", cRed, cCyan);
      p.x = Math.max(1, p.x - 2);
      return;
    }
    bossHp -= 1;
    playSfx(sHit);
    shake(250);
    if (bossHp > 0) {
      let hp = "";
      for (let i = 0; i < 5; i++) hp += (i < bossHp ? "I" : ".");
      setUI("TREFFER! (" + hp + ")", bossHp + " HP UEBRIG!", cYellow, cRed);
      p.x = Math.max(1, p.x - 2);
    } else {
      bs.type = btnPress;
      clearTimers();
      triggerLevelCutscene(14, () => {
        setUI("BOSS BESIEGT!", "EPISCHER SIEG!", cGreen, cOrange);
        playSfx(sFanfare);
        loadLevel(15);
      });
    }
    return;
  }

  const cup = cur.find(s => s.type === winCup);
  if (cup) {
    playSfx(sFanfare);
    showStats();
  }
}

onInput("w", () => move(0, -1));
onInput("s", () => move(0, 1));
onInput("a", () => move(-1, 0));
onInput("d", () => move(1, 0));

onInput("j", () => {
  if (gameState === ST_INTRO) {
    skipPrologue();
  } else if (gameState === ST_MENU) {
    selectMenuItem();
  } else if (gameState === ST_LEVELS) {
    playSfx(sWarp);
    loadLevel(menuCursor);
  } else if (gameState === ST_JUKEBOX) {
    if (menuCursor === 0) playMusic(bgmTitle);
    else if (menuCursor === 1) playMusic(bgmCorridor);
    else if (menuCursor === 2) playMusic(bgmHorror);
    else if (menuCursor === 3) playMusic(bgmBoss);
    else if (menuCursor === 4) playMusic(bgmVictory);
    else if (menuCursor === 5) {
      playSfx(sFanfare);
      setTimeout(() => playSfx(sWarp), 200);
      setTimeout(() => playSfx(sClick), 400);
    }
  } else if (gameState === ST_OPTIONS) {
    playSfx(sSwitch);
    if (menuCursor === 0) {
      optMusic = !optMusic;
      if (!optMusic) stopMusic();
      else playMusic(bgmTitle);
    } else if (menuCursor === 1) optSound = !optSound;
    else if (menuCursor === 2) optShake = !optShake;
    else if (menuCursor === 3) optTimer = !optTimer;
    drawOptions();
  } else if (gameState === ST_STATS || gameState === ST_HELP) {
    showMenu();
  } else if (gameState === ST_PAUSE) {
    playSfx(sClick);
    if (menuCursor === 0) {
      gameState = ST_GAME;
      const d = dialogues[curLvl];
      setUI(d.t, d.m);
    } else if (menuCursor === 1) {
      loadLevel(curLvl);
    } else if (menuCursor === 2) {
      showMenu();
    }
  } else if (gameState === ST_GAME) {
    if (isNearButton()) {
      triggerButtonPress();
    } else {
      const d = dialogues[curLvl];
      setUI(d.t, d.m);
      playSfx(sVoice);
    }
  }
});

onInput("k", () => {
  if (gameState === ST_LEVELS || gameState === ST_JUKEBOX || gameState === ST_OPTIONS || gameState === ST_STATS || gameState === ST_HELP) {
    showMenu();
  } else if (gameState === ST_GAME) {
    showPause();
  } else if (gameState === ST_PAUSE) {
    gameState = ST_GAME;
    const d = dialogues[curLvl];
    setUI(d.t, d.m);
  }
});

onInput("l", () => {
  optMusic = !optMusic;
  if (!optMusic) {
    stopMusic();
    setUI("MUSIK: (AUS)", "(L) ZUM EINSCHALTEN");
  } else {
    setUI("MUSIK: (AN)", "MUSIK AKTIVIERT");
    if (gameState === ST_GAME) loadLevel(curLvl);
    else playMusic(bgmTitle);
  }
});

onInput("i", () => {
  if (gameState === ST_GAME) {
    playSfx(sWarp);
    loadLevel(curLvl);
  }
});

showMenu();
