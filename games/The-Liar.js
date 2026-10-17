const PLAYER = "p";
const GUARD = "g";
const MIRA = "1";
const JON = "2";
const RAVI = "3";
const DARK = "8";
const WALL = "w";
const FLOOR = "f";
const HUD = "h";
const DOOR = "d";
const PC = "c";
const NOTEBOOK = "n";
const EMAIL = "m";
const PHOTO = "t";
const SHELF = "k";
const PLANT = "i";
const RACK = "r";
const LOG = "l";
const PHONE = "v";
const VENT = "e";
const KEYCARD = "y";
const SAFE = "s";
const CABINET = "z";
const COATRACK = "j";
const SIGNBOOK = "q";
const MONITOR = "u";
const LOCKER = "x";
const BREAKER = "o";
const TOOLBOX = "b";
const BOX = "a";
const COPIER = "4";
const CAMBAG = "5";
const DRAWER = "6";
const TRASH = "7";

const BOOM = "Z";
const PBULLET = "P";
const EBULLET = "B";
const CRUISER = "C";
const VAN = "V";
const TRAFFIC = "T";
const SPIKES = "S";
const AMMO = "A";
const MEDKIT = "H";
const CRATE = "X";
const DOCK_CRATE = "K";
const CRACKED_CRATE = "Q";
const ROAD = "R";
const EDGE_A = "E";
const EDGE_B = "F";
const PLANK = "O";
const WATER = "W";
const BOAT = "Y";

setLegend(
  [PLAYER, bitmap`
................
....00000000....
...0000000000...
..000000000000..
....08888880....
....08088080....
....08888880....
.....888888.....
...CCCCCCCCCC...
..CCCC2CC2CCCC..
..CC.CCCCCC.CC..
..88.CCCCCC.88..
.....CCCCCC.....
.....CC..CC.....
.....CC..CC.....
.....00..00.....`],
  [GUARD, bitmap`
................
....55555555....
...5555555555...
....00000000....
....08888880....
....08088080....
....08888880....
.....888888.....
...5555555555...
..555565565555..
..55.555555.55..
..88.555555.88..
.....555555.....
.....55..55.....
.....55..55.....
.....00..00.....`],
  [MIRA, bitmap`
................
.....000000.....
....00000000....
...0088888800...
...0080880800...
...0088888800...
...0088888800...
....HHHHHHHH....
...HH22HHHHHH...
...HH22HHHHHH...
...8HHHHHHHH8...
....HHHHHHHH....
....LLL..LLL....
....LLL..LLL....
....000..000....
................`],
  [JON, bitmap`
................
.....CCCCCC.....
....CCCCCCCC....
....C888888C....
....C808808C....
....C888888C....
.....888888.....
....LLLLLLLL....
...LL99LLLLLL...
...LL99LLLLLL...
...8LLLLLLLL8...
....LLLLLLLL....
....000..000....
....000..000....
....000..000....
................`],
  [RAVI, bitmap`
................
.....000000.....
....00000000....
....08888880....
....08088080....
....08888880....
.....888888.....
....55555555....
...5566555555...
...5566555555...
...8555555558...
....55555555....
....LLL..LLL....
....LLL..LLL....
....000..000....
................`],
  [BOOM, bitmap`
................
.......9........
...9...9...9....
....9.999.9.....
.....99699......
...9996669999...
..999666666999..
...9996669999...
.....99699......
....9.999.9.....
...9...9...9....
.......9........
................
................
................
................`],
  [PBULLET, bitmap`
................
................
................
................
................
................
......6666......
......6666......
......6666......
......6666......
................
................
................
................
................
................`],
  [EBULLET, bitmap`
................
................
................
................
................
................
......3333......
......3333......
......3333......
......3333......
................
................
................
................
................
................`],
  [CRUISER, bitmap`
................
.....000000.....
....02222220....
...0222222220...
...0277777720...
...0277777720...
...0222222220...
...0555223330...
...0222222220...
...0200000020...
...0222222220...
...0222222220...
...0277777720...
...0222222220...
....00000000....
................`],
  [VAN, bitmap`
................
...0000000000...
...0LLLLLLLL0...
...0L777777L0...
...0L777777L0...
...0LLLLLLLL0...
...0LLLLLLLL0...
...0LLLLLLLL0...
...0LLLLLLLL0...
...0LLLLLLLL0...
...0LLLLLLLL0...
...0LLLLLLLL0...
...03LLLLLL30...
...0LLLLLLLL0...
...0000000000...
....00....00....`],
  [TRAFFIC, bitmap`
................
................
....00000000....
...0666666660...
...0677777760...
...0677777760...
...0666666660...
...0666666660...
...0666666660...
...0666666660...
...0677777760...
...0666666660...
...0366666630...
....00000000....
................
................`],
  [SPIKES, bitmap`
................
................
................
................
................
................
..1...1...1...1.
.111.111.111.111
1111111111111111
LLLLLLLLLLLLLLLL
0000000000000000
................
................
................
................
................`],
  [AMMO, bitmap`
................
................
................
...0000000000...
...0FFFFFFFF0...
...0F669966F0...
...0F669966F0...
...0FFFFFFFF0...
...0F222222F0...
...0FFFFFFFF0...
...0000000000...
................
................
................
................
................`],
  [MEDKIT, bitmap`
................
................
...0000000000...
...0222222220...
...0222332220...
...0222332220...
...0233333320...
...0233333320...
...0222332220...
...0222332220...
...0222222220...
...0000000000...
................
................
................
................`],
  [CRATE, bitmap`
................
................
..CCCCCCCCCCCC..
..C9999999999C..
..C9C999999C9C..
..C99C9999C99C..
..C999C99C999C..
..C9999CC9999C..
..C9999CC9999C..
..C999C99C999C..
..C99C9999C99C..
..C9C999999C9C..
..C9999999999C..
..CCCCCCCCCCCC..
................
................`],
  [DOCK_CRATE, bitmap`
CCCCCCCCCCCCCCCC
C99999999999999C
C9C9999999999C9C
C99C99999999C99C
C999C999999C999C
C9999C9999C9999C
C99999C99C99999C
C999999CC999999C
C999999CC999999C
C99999C99C99999C
C9999C9999C9999C
C999C999999C999C
C99C99999999C99C
C9C9999999999C9C
C99999999999999C
CCCCCCCCCCCCCCCC`],
  [CRACKED_CRATE, bitmap`
CCCCCCC..CCCCCCC
C99999.0..99999C
C9C999.0.9999C9C
C99C9..0.999C99C
C999C.0..99C999C
C9999.0...C9999C
C9999..0.C99999C
C99999.0C999999C
C99999.0C999999C
C9999..0.C99999C
C999..0...C9999C
C99C..0..999C99C
C9C9...0.9999C9C
C99999.0.999999C
C999999..999999C
CCCCCCC..CCCCCCC`],
  [DARK, bitmap`
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
  [WALL, bitmap`
LLLLLLLLLLLLLLLL
1111111L1111111L
1111111L1111111L
1111111L1111111L
LLLLLLLLLLLLLLLL
111L1111111L1111
111L1111111L1111
111L1111111L1111
LLLLLLLLLLLLLLLL
1111111L1111111L
1111111L1111111L
1111111L1111111L
LLLLLLLLLLLLLLLL
111L1111111L1111
111L1111111L1111
111L1111111L1111`],
  [FLOOR, bitmap`
2222222222222221
2222222222222221
2222222222222221
2222222222222221
2222222222222221
2222222222222221
2222222222222221
2222222222222221
2222222222222221
2222222222222221
2222222222222221
2222222222222221
2222222222222221
2222222222222221
2222222222222221
1111111111111111`],
  [HUD, bitmap`
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
  [DOOR, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0C999999999999C0
0C9CCCCCCCCCC9C0
0C9C99999999C9C0
0C9C99999999C9C0
0C9CCCCCCCCCC9C0
0C999999999669C0
0C999999999669C0
0C9CCCCCCCCCC9C0
0C9C99999999C9C0
0C9C99999999C9C0
0C9C99999999C9C0
0C9CCCCCCCCCC9C0
0C999999999999C0
0CCCCCCCCCCCCCC0`],
  [PC, bitmap`
................
..000000000000..
..055555555550..
..057777777750..
..057222777750..
..057777777750..
..055555555550..
..000000000000..
.......00.......
.....000000.....
CCCCCCCCCCCCCCCC
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC
.CC..........CC.
.CC..........CC.
.CC..........CC.`],
  [NOTEBOOK, bitmap`
................
................
...0000000000...
...0H66666660...
...0H66666660...
...0H60000060...
...0H66666660...
...0H60000060...
...0H66666660...
...0H60000060...
...0H66666660...
...0000000000...
................
................
................
................`],
  [EMAIL, bitmap`
................
................
..000000000000..
..022222222220..
..020222222020..
..022022220220..
..022200002220..
..022222222220..
..021111111120..
..022222222220..
..021111111120..
..022222222220..
..000000000000..
................
................
................`],
  [PHOTO, bitmap`
................
................
..000000000000..
..0LLLLLLLLLL0..
..0L11111111L0..
..0L11199111L0..
..0L11199111L0..
..0L11999911L0..
..0L11999911L0..
..0L11199111L0..
..0LLLLLLLLLL0..
..000000000000..
................
................
................
................`],
  [SHELF, bitmap`
CCCCCCCCCCCCCCCC
C33H55744H366D5C
C33H55744H366D5C
C33H55744H366D5C
CCCCCCCCCCCCCCCC
C5577H33D44HH77C
C5577H33D44HH77C
C5577H33D44HH77C
CCCCCCCCCCCCCCCC
C944HH5533DD99HC
C944HH5533DD99HC
C944HH5533DD99HC
CCCCCCCCCCCCCCCC
C..............C
C..............C
CCCCCCCCCCCCCCCC`],
  [PLANT, bitmap`
................
......4..4......
.....44.444.....
....4444444.....
...44D44D444....
...4D4444D44....
....44D4444.....
.....44D44......
......DDD.......
.....CCCCCC.....
.....C9999C.....
.....C9999C.....
......C99C......
......CCCC......
................
................`],
  [RACK, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L000000000000L0
0L044000000330L0
0L000000000000L0
0LLLLLLLLLLLLLL0
0L000000000000L0
0L040000000770L0
0L000000000000L0
0LLLLLLLLLLLLLL0
0L000000000000L0
0L044000000440L0
0L000000000000L0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [LOG, bitmap`
................
..000000000000..
..022222222220..
..044444444440..
..022222222220..
..044444444440..
..022222222220..
..044444444440..
..022222222220..
..044444444440..
..022222222220..
..000000000000..
................
................
................
................`],
  [PHONE, bitmap`
................
................
...3333333333...
..333333333333..
..333......333..
..33........33..
......3333......
.....333333.....
....33333333....
...3320202023...
...3302020203...
...3320202023...
...3333333333...
................
................
................`],
  [VENT, bitmap`
................
................
................
.LLLLLLLLLLLLLL.
.L111111111111L.
.L000000000000L.
.L111111111111L.
.L000000000000L.
.L111111111111L.
.L000000000000L.
.L111111111111L.
.LLLLLLLLLLLLLL.
................
................
................
................`],
  [KEYCARD, bitmap`
................
................
................
................
...0000000000...
...0999999990...
...0922299990...
...0922299990...
...0999999990...
...0900000090...
...0999999990...
...0000000000...
................
................
................
................`],
  [SAFE, bitmap`
................
.00000000000000.
.0LLLLLLLLLLLL0.
.0L1111111111L0.
.0L1111111111L0.
.0L1110000111L0.
.0L1110660111L0.
.0L1110660111L0.
.0L1110000111L0.
.0L1111111111L0.
.0L1111111166L0.
.0L1111111111L0.
.0LLLLLLLLLLLL0.
.00000000000000.
..00........00..
................`],
  [CABINET, bitmap`
.00000000000000.
.01111111111110.
.01LLLLLLLLLL10.
.01L22222222L10.
.01LLLLLLLLLL10.
.01111111111110.
.01111LLLL11110.
.01111111111110.
.00000000000000.
.01110444401110.
.01110626201110.
.01110262601110.
.01110000001110.
.01111111111110.
.01111111111110.
.00000000000000.`],
  [COATRACK, bitmap`
.......CC.......
.....CCCCCC.....
.......CC.......
.....LLLLLL.....
....LLLLLLLL....
....LLLLLLLL....
....LL99LLLL....
....LL99LLLL....
....LLLLLLLL....
....LLLLLLLL....
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.....CCCCCC.....
................`],
  [SIGNBOOK, bitmap`
................
................
....22222222....
....20000002....
....22222222....
....20000002....
....22222222....
CCCCCCCCCCCCCCCC
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC
.CC..........CC.
.CC..........CC.
.CC..........CC.
................
................
................`],
  [MONITOR, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L000000000000L0
0L044400077700L0
0L040400070700L0
0L044400077700L0
0L000000000000L0
0LLLLLLLLLLLLLL0
0000000000000000
.......00.......
.....000000.....
CCCCCCCCCCCCCCCC
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC
.CC..........CC.
.CC..........CC.`],
  [LOCKER, bitmap`
0000000000000000
0LLLLLL00LLLLLL0
0L1111L00L1111L0
0L0000L00L0000L0
0L1111L00L1111L0
0L0000L00L0000L0
0L1111L00L1111L0
0LLLLLL00LLLLLL0
0LLLL6L00L6LLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0000000000000000
.00..........00.`],
  [BREAKER, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L111111111111L0
0L144114411441L0
0L144114411441L0
0L111111111111L0
0L133113311331L0
0L133113311331L0
0L111111111111L0
0L144114411331L0
0L144114411331L0
0L111111111111L0
0LLLLLLLLLLLLLL0
0LLLLLL66LLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [TOOLBOX, bitmap`
................
................
................
.....000000.....
.....0....0.....
.....0....0.....
..333333333333..
..333333333333..
..300000000003..
..333333333333..
..333332233333..
..333333333333..
..333333333333..
..333333333333..
................
................`],
  [BOX, bitmap`
................
................
................
..CCCCCCCCCCCC..
..C9999CC9999C..
..C9999CC9999C..
..CCCCCCCCCCCC..
..C9999999999C..
..C9999999999C..
..C9922222299C..
..C9922222299C..
..C9999999999C..
..C9999999999C..
..CCCCCCCCCCCC..
................
................`],
  [COPIER, bitmap`
................
.11111111111111.
.1LLLLLLLLLLLL1.
.11111111111111.
.12222222222221.
.11111111111111.
.1L7777777777L1.
.1LLLLLLLLLLLL1.
.11111111111441.
.11111111111111.
.1LLLLLLLLLLLL1.
.12222222222221.
.11111111111111.
.11111111111111.
.LL..........LL.
................`],
  [CAMBAG, bitmap`
................
................
......0000......
.....0....0.....
....0......0....
...0000000000...
...0LLLLLLLL0...
...0L000000L0...
...0L011110L0...
...0L017710L0...
...0L011110L0...
...0L000000L0...
...0LLLL22LL0...
...0000000000...
................
................`],
  [DRAWER, bitmap`
................
................
................
................
CCCCCCCCCCCCCCCC
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC
CCCCCCCC......CC
C999999C......CC
C996699C......CC
C999999C......CC
CCCCCCCC......CC
C999999C......CC
C996699C......CC
C999999C......CC
CCCCCCCC......CC`],
  [TRASH, bitmap`
................
................
................
....22.2..2.....
...LLLLLLLLLL...
....L111111L....
....L1L11L1L....
....L1L11L1L....
....L1L11L1L....
....L1L11L1L....
....L1L11L1L....
....L1L11L1L....
....L111111L....
....LLLLLLLL....
................
................`],
  [ROAD, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLL1LLLL
LLLLLLLLLLLLLLLL
1LLLLLLLLLLLLLLL
1LLLLLLLLLLLLLLL
1LLL1LLLLLLLLLLL
1LLLLLLLLLLLLLLL
1LLLLLLLLLLLLLLL
1LLLLLLLLLLL1LLL
1LLLLLLLLLLLLLLL
1LLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLL1LLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [EDGE_A, bitmap`
4444444444444444
44D44444444D4444
4DDD4444444DD444
4444444444444444
4444444444444444
4444444D44444444
444444DDD4444444
4444444444444444
4444444444444444
44D44444444D4444
4DDD4444444DD444
4444444444444444
4444444444444444
4444444D44444444
444444DDD4444444
4444444444444444`],
  [EDGE_B, bitmap`
4444444444444444
4444444D44444444
444444DDD4444444
4444444444444444
4444444444444444
44D44444444D4444
4DDD4444444DD444
4444444444444444
4444444444444444
4444444D44444444
444444DDD4444444
4444444444444444
4444444444444444
44D44444444D4444
4DDD4444444DD444
4444444444444444`],
  [PLANK, bitmap`
CCCCCCCCCCCCCCCC
9999999999999999
9999999C99999999
9999999999999999
CCCCCCCCCCCCCCCC
9999999999999999
999999999999C999
9999999999999999
CCCCCCCCCCCCCCCC
9999999999999999
99C9999999999999
9999999999999999
CCCCCCCCCCCCCCCC
9999999999999999
9999999999C99999
9999999999999999`],
  [WATER, bitmap`
5555555555555555
5555555555555555
5577555555557755
5755755555575575
5555555555555555
5555555555555555
5555555775555555
5555557557555555
5555555555555555
5555555555555555
5775555555555775
7557555555557557
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [BOAT, bitmap`
5555555555555555
5555555005555555
5555550220555555
5555502222055555
5555022222205555
5550222222220555
5502222222222055
5022222222222205
0222222222222220
0333333333333330
0222222222222220
5022222222222205
5500000000000055
5577555555557755
5755755555575575
5555555555555555`]
);

setBackground(FLOOR);

setSolids([
  PLAYER, GUARD, MIRA, JON, RAVI, WALL, HUD, DOOR, PC, NOTEBOOK, EMAIL,
  PHOTO, SHELF, PLANT, RACK, LOG, PHONE, VENT, KEYCARD, SAFE, CABINET,
  COATRACK, SIGNBOOK, MONITOR, LOCKER, BREAKER, TOOLBOX, BOX, COPIER,
  CAMBAG, DRAWER, TRASH
]);

const WHITE = color`2`;
const GREY = color`1`;
const YELLOW = color`6`;
const GREEN = color`4`;
const RED = color`3`;
const ORANGE = color`9`;
const CYAN = color`7`;

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function pickOne(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffled(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

function pad2(n) {
  return n < 10 ? "0" + n : "" + n;
}

function padRight(text, size) {
  let out = text;
  while (out.length < size) out += " ";
  return out;
}

function sign(n) {
  if (n > 0) return 1;
  if (n < 0) return -1;
  return 0;
}

const SCREEN_MAP = map`
hhhhhhhhhh
hhhhhhhhhh
hhhhhhhhhh
hhhhhhhhhh
hhhhhhhhhh
hhhhhhhhhh
hhhhhhhhhh
hhhhhhhhhh`;

const HIGHWAY_MAP = map`
ERRRRRRRRE
ERRRRRRRRE
ERRRRRRRRE
ERRRRRRRRE
ERRRRRRRRE
ERRRRRRRRE
ERRRRRRRRE
hhhhhhhhhh`;

const DOCKS_MAP = map`
WWWWYWWWWW
OOOOOOOOOO
OOOOOOOOOO
OOOOOOOOOO
OOOOOOOOOO
OOOOOOOOOO
OOOOOOOOOO
hhhhhhhhhh`;

const LOBBY = 0;
const OFFICE = 1;
const SECURITY = 2;
const SERVERS = 3;
const STORAGE = 4;
const ELECTRICAL = 5;
const ARCHIVE = 6;
const INTERVIEW = 7;

const ROOMS = [
  {
    name: "LOBBY",
    map: map`
wwwwdwwwww
wq.....j.w
w........w
d........d
w........w
wi...7..iw
wwwwdwwwww
hhhhhhhhhh`
  },
  {
    name: "OFFICE",
    map: map`
wwwwwwwwww
wk...c..iw
w........w
wn.......d
w........w
wm.6...t.w
wwwwdwwwww
hhhhhhhhhh`
  },
  {
    name: "SECURITY",
    map: map`
wwwwdwwwww
wuu....x.w
w........w
w........d
w........w
wi.......w
wwwwwwwwww
hhhhhhhhhh`
  },
  {
    name: "SERVERS",
    map: map`
wwwwwwwwww
wrr..l..ew
w........w
d........d
w........w
wv.....rrw
wwwwwwwwww
hhhhhhhhhh`
  },
  {
    name: "STORAGE",
    map: map`
wwwwwwwwww
wz...s..bw
w........w
d........w
w........w
w....y..iw
wwwwwwwwww
hhhhhhhhhh`
  },
  {
    name: "ELECTRICAL",
    map: map`
wwwwwwwwww
w...o...nw
w........w
w........w
w........w
wi.......w
wwwwdwwwww
hhhhhhhhhh`
  },
  {
    name: "ARCHIVE",
    map: map`
wwwwwwwwww
wkk..4..5w
w........w
d........w
w........w
wkk.a...nw
wwwwwwwwww
hhhhhhhhhh`
  },
  {
    name: "INTERVIEW",
    map: map`
wwwwdwwwww
w........w
w........w
wi......iw
w.1..2..3w
w........w
wwwwwwwwww
hhhhhhhhhh`
  }
];

const DOORS = [
  { room: LOBBY, x: 4, y: 0, to: OFFICE, spawn: [4, 5] },
  { room: LOBBY, x: 0, y: 3, to: SECURITY, spawn: [8, 3] },
  { room: LOBBY, x: 9, y: 3, to: SERVERS, spawn: [1, 3], needs: "alexbadge" },
  { room: LOBBY, x: 4, y: 6, to: INTERVIEW, spawn: [4, 1] },
  { room: OFFICE, x: 4, y: 6, to: LOBBY, spawn: [4, 1] },
  { room: OFFICE, x: 9, y: 3, to: ARCHIVE, spawn: [1, 3] },
  { room: SECURITY, x: 9, y: 3, to: LOBBY, spawn: [1, 3] },
  { room: SECURITY, x: 4, y: 0, to: ELECTRICAL, spawn: [4, 5] },
  { room: SERVERS, x: 0, y: 3, to: LOBBY, spawn: [8, 3] },
  { room: SERVERS, x: 9, y: 3, to: STORAGE, spawn: [1, 3] },
  { room: STORAGE, x: 0, y: 3, to: SERVERS, spawn: [8, 3] },
  { room: ELECTRICAL, x: 4, y: 6, to: SECURITY, spawn: [4, 1] },
  { room: ARCHIVE, x: 0, y: 3, to: OFFICE, spawn: [8, 3] },
  { room: INTERVIEW, x: 4, y: 0, to: LOBBY, spawn: [4, 5] }
];

const START_SPAWN = [4, 3];

const GUARD_ROOM = SERVERS;
const GUARD_PATH = [
  [3, 2], [4, 2], [5, 2], [6, 2], [6, 3],
  [6, 4], [5, 4], [4, 4], [3, 4], [3, 3]
];

const START_MINUTES = 8 * 60;
const DEADLINE_MINUTES = 12 * 60;
const TICKS_PER_MINUTE = 3;
const CAUGHT_COST = 60;
const BLUFF_COST = 15;
const MAX_CREDIBILITY = 5;
const MAX_WRONG = 2;
const HELP_TXT = "I:look J:log K:bag";

const PEOPLE = {
  mira: {
    first: "Mira", upper: "MIRA SHAH", short: "MIRA", initials: "M.S.",
    sheetName: "M. SHAH", badge: "MIRA-01", badgeColor: "WHITE",
    role: "Lab technician", sprite: MIRA, inTime: "08:10"
  },
  jon: {
    first: "Jon", upper: "JON REED", short: "JON", initials: "J.R.",
    sheetName: "J. REED", badge: "JON-04", badgeColor: "ORANGE",
    role: "Sysadmin", sprite: JON, inTime: "08:02"
  },
  ravi: {
    first: "Ravi", upper: "RAVI DAS", short: "RAVI", initials: "R.D.",
    sheetName: "R. DAS", badge: "RAVI-07", badgeColor: "YELLOW",
    role: "Archivist", sprite: RAVI, inTime: "09:30"
  }
};

const SUSPECT_BY_SPRITE = { [MIRA]: "mira", [JON]: "jon", [RAVI]: "ravi" };
const SUSPECT_ORDER = ["mira", "jon", "ravi"];

const SECRETS = {
  mira: {
    text: ["\"I never touched", "the audit files.\""],
    breaks: ["copylog"],
    reveal: ["\"Okay! I copied", "the report for the", "board. That's all.\""]
  },
  jon: {
    text: ["\"I only run work", "jobs on servers.\""],
    breaks: ["minerlog"],
    reveal: ["\"Fine, the miner", "is mine. It's just", "side cash.\""]
  },
  ravi: {
    text: ["\"I never borrowed", "Alex's camera.\""],
    breaks: ["notebook", "camerabag"],
    reveal: ["\"Okay, I borrowed", "it for archive", "photos.\""]
  }
};

const PASSWORD_RULES = [
  { line1: "sorted by FIRST", line2: "name, A to Z.", answer: "RSD" },
  { line1: "sorted by SURNAME,", line2: "A to Z.", answer: "DRS" },
  { line1: "sorted by FIRST", line2: "name, Z to A.", answer: "DSR" }
];

const ITEMS = {
  flashlight: "Flashlight",
  smallkey: "Small brass key",
  alexbadge: "Alex's badge",
  screwdriver: "Screwdriver"
};

const INTERACTIVE = [
  DOOR, PC, NOTEBOOK, EMAIL, PHOTO, SHELF, PLANT, RACK, LOG, PHONE, VENT,
  KEYCARD, SAFE, CABINET, COATRACK, SIGNBOOK, MONITOR, LOCKER, BREAKER,
  TOOLBOX, BOX, COPIER, CAMBAG, DRAWER, TRASH, MIRA, JON, RAVI, GUARD
];

let theCase = null;

function buildCase() {
  const culpritId = pickOne(SUSPECT_ORDER);
  const innocents = shuffled(SUSPECT_ORDER.filter(id => id !== culpritId));
  const leaverId = innocents[0];
  const witnessId = innocents[1];

  const c = PEOPLE[culpritId];
  const lv = PEOPLE[leaverId];
  const wt = PEOPLE[witnessId];

  const badgeMin = randInt(14, 19);
  const loginMin = badgeMin + 2;
  const deleteMin = loginMin + randInt(3, 6);
  const exportMin = deleteMin + 1;
  const badgeTime = "21:" + pad2(badgeMin);
  const loginTime = "21:" + pad2(loginMin);
  const deleteTime = "21:" + pad2(deleteMin);
  const exportTime = "21:" + pad2(exportMin);
  const rule = pickOne(PASSWORD_RULES);

  const outTimes = {};
  outTimes[culpritId] = "----";
  outTimes[leaverId] = "21:03";
  outTimes[witnessId] = "21:40";

  const signLines = ["Yesterday:", ""];
  for (const id of SUSPECT_ORDER) {
    signLines.push(padRight(PEOPLE[id].short, 6) + "in " + PEOPLE[id].inTime);
    signLines.push("      out " + outTimes[id]);
  }

  const evidence = {
    signin: { label: "Sign-in book", fact: c.short + " never left" },
    coat: { label: c.short + "'s coat", fact: "Left behind at 9?" },
    receipt: { label: "Vending receipt", fact: c.short + "'s card 22:47" },
    notebook: { label: "Alex's notebook", fact: "Ravi had my camera" },
    email: { label: "Email draft", fact: c.short + " 'home' at 9" },
    photo: { label: "Camera printout", fact: c.badgeColor + " badge " + loginTime },
    pwhint: { label: "Password hint", fact: "Initials in order" },
    adminacct: { label: "Security notice", fact: "Temp admin " + c.badge },
    deleted: { label: "Recovered file", fact: "Signed " + c.initials },
    camerameta: { label: "Photo metadata", fact: "Taken " + loginTime + ":03" },
    cctvlobby: { label: "Lobby camera", fact: c.short + " never exits" },
    cctvserver: { label: "Server door camera", fact: c.badgeColor + " badge " + badgeTime },
    cctvback: { label: "Loading dock cam", fact: c.short + " exits 23:52" },
    archivesheet: { label: "Archive sheet", fact: wt.short + " 21:12-21:40" },
    copylog: { label: "Copier log", fact: "Mira copied report" },
    camerabag: { label: "Camera bag", fact: "Ravi's name tag" },
    minerlog: { label: "Rack screen", fact: "Jon's crypto miner" },
    serverlog: { label: "Server log", fact: "Deleted at " + deleteTime },
    voicemail: { label: wt.short + "'s voicemail", fact: c.short + ": forget it" },
    memcard: { label: "Vent memory card", fact: "Export by " + c.badge },
    keycard: { label: "Keycard slip", fact: c.badge + " in " + badgeTime },
    backup: { label: "Backup drive", fact: c.badge + " deleted" },
    statement: { label: "Alex's statement", fact: c.short + " had a motive" }
  };

  const clues = {
    [SIGNBOOK]: { title: "SIGN-IN BOOK", evidence: "signin", lines: signLines },
    [COATRACK]: {
      title: "COAT RACK",
      evidence: "coat",
      lines: [
        "A grey jacket with",
        "a " + c.badgeColor + " lanyard.",
        "Name tag: " + c.upper,
        "",
        c.first + " claims to",
        "have gone home at",
        "9:00 PM. In October.",
        "Without a coat?"
      ]
    },
    [TRASH]: {
      title: "LOBBY BIN",
      evidence: "receipt",
      lines: [
        "Coffee cups and a",
        "vending receipt:",
        "",
        "CHIPS + COLA",
        "22:47 yesterday",
        "Card: " + c.upper
      ]
    },
    [PLANT]: {
      title: "POTTED PLANT",
      evidence: null,
      lines: ["Dry soil.", "Nobody watered it.", "", "Not a clue. Just", "a sad plant."]
    },
    [NOTEBOOK]: {
      title: "ALEX'S NOTEBOOK",
      evidence: "notebook",
      lines: [
        "Staff on late shift:",
        "- Mira Shah, lab",
        "- Jon Reed, sysadmin",
        "- Ravi Das, archive",
        "",
        c.first + " kept asking",
        "about my audit.",
        "Ravi borrowed my",
        "camera again."
      ]
    },
    [EMAIL]: {
      title: "EMAIL DRAFT",
      evidence: "email",
      lines: [
        "To: " + lv.upper,
        "Re: audit file",
        "",
        c.first + " said they'd",
        "go home at 9:00.",
        "They NEVER leave",
        "before the backup.",
        "Something is wrong."
      ]
    },
    [PHOTO]: {
      title: "CAMERA PRINTOUT",
      evidence: "photo",
      lines: [
        "Server room door,",
        "seen from the",
        "archive window.",
        "",
        "Clock: " + loginTime,
        "A hooded figure",
        "wears a staff badge.",
        "Badge color: " + c.badgeColor
      ]
    },
    [SHELF]: {
      title: "BOOKSHELF",
      evidence: "pwhint",
      lines: [
        "A sticky note on a",
        "book reads:",
        "",
        "PC PASSWORD =",
        "surname initials",
        "of my 3 coworkers,",
        rule.line1,
        rule.line2
      ]
    },
    [COPIER]: {
      title: "COPIER LOG",
      evidence: "copylog",
      lines: [
        "LAST JOBS:",
        "",
        "20:40 M.SHAH",
        "AUDIT_REPORT.pdf",
        "48 pages, 1 copy",
        "",
        "20:55 R.DAS",
        "Box labels, 2 pages"
      ]
    },
    [CAMBAG]: {
      title: "CAMERA BAG",
      evidence: "camerabag",
      lines: [
        "Tag: PROPERTY OF",
        "ALEX MORGAN",
        "",
        "A second tag, in",
        "different ink:",
        "\"Borrowed - R.Das\"",
        "",
        "The SD card is gone."
      ]
    },
    [RACK]: {
      title: "SERVER RACK",
      evidence: "minerlog",
      lines: [
        "Fans roar. A tiny",
        "screen blinks:",
        "",
        "MINER.EXE running",
        "Owner: JON-04",
        "Uptime: 93 days",
        "",
        "BACKUP MISSING.",
        "Copy moved to the",
        "storage safe."
      ]
    },
    [LOG]: {
      title: "SERVER ACCESS LOG",
      evidence: "serverlog",
      lines: [
        "20:58 ALEX  logout",
        "21:03 " + padRight(lv.short, 6) + "logout",
        "21:12 " + padRight(wt.short, 6) + "archive",
        loginTime + " ADMIN login",
        deleteTime + " FILE DELETED",
        exportTime + " LOG EXPORT",
        "",
        "No logout for " + c.short + ".",
        "Admin login used a",
        "temp account."
      ]
    },
    [PHONE]: {
      title: wt.short + "'S VOICEMAIL",
      evidence: "voicemail",
      lines: [
        "\"Alex, it's " + wt.first + ".",
        "I saw " + lv.first + " leave",
        "at 9:03. At 9:" + pad2(loginMin),
        "I saw someone at",
        "the server door.",
        c.first + " told me to",
        "forget it...\""
      ]
    },
    [KEYCARD]: {
      title: "DROPPED KEYCARD",
      evidence: "keycard",
      lines: [
        "Badge: " + c.badge,
        "(" + c.badgeColor + " staff tag)",
        "",
        "Clipped reader slip:",
        "SERVER DOOR",
        "IN   " + badgeTime,
        "OUT  none"
      ]
    }
  };

  const roomClues = {
    [ELECTRICAL]: {
      [NOTEBOOK]: {
        title: "ELECTRICIAN NOTE",
        evidence: null,
        lines: [
          "Breaker panel tips:",
          "",
          "Flipping a switch",
          "also flips the ones",
          "directly above,",
          "below, left and",
          "right of it.",
          "",
          "Get all 9 to ON."
        ]
      }
    },
    [ARCHIVE]: {
      [SHELF]: {
        title: "DUSTY SHELVES",
        evidence: null,
        lines: ["Boxes of reports", "from 2009.", "", "Nothing about", "last night."]
      },
      [NOTEBOOK]: {
        title: "ARCHIVE SHEET",
        evidence: "archivesheet",
        lines: [
          "ARCHIVE VISITORS",
          "",
          padRight(wt.sheetName, 8) + "in  21:12",
          padRight(wt.sheetName, 8) + "out 21:40",
          "",
          "Purpose: sorting",
          "old record boxes."
        ]
      }
    }
  };

  const containers = {
    [LOCKER]: {
      title: "STAFF LOCKER",
      needs: null,
      gives: "flashlight",
      evidence: null,
      lines: ["Spare uniform,", "an umbrella and", "a heavy flashlight.", "", "You take the", "flashlight."],
      emptyLines: ["Spare uniform and", "an umbrella.", "Nothing else."]
    },
    [BOX]: {
      title: "RECORD BOX",
      needs: null,
      gives: "smallkey",
      evidence: null,
      lines: ["Under old folders", "is a small brass", "key labelled", "\"ALEX - DESK\".", "", "You take it."],
      emptyLines: ["Old folders.", "Nothing else."]
    },
    [DRAWER]: {
      title: "ALEX'S DESK",
      needs: "smallkey",
      lockedLines: ["The drawer has a", "small brass lock.", "", "The key must be", "somewhere nearby."],
      gives: "alexbadge",
      evidence: null,
      lines: ["The key turns.", "Inside: Alex's", "staff badge, with", "SERVER ROOM access.", "", "You take it."],
      emptyLines: ["Pens, gum and a", "stapler."]
    },
    [TOOLBOX]: {
      title: "TOOLBOX",
      needs: null,
      gives: "screwdriver",
      evidence: null,
      lines: ["Tape, wire, and a", "screwdriver.", "", "You take the", "screwdriver."],
      emptyLines: ["Tape and wire."]
    },
    [VENT]: {
      title: "LOOSE VENT",
      needs: "screwdriver",
      lockedLines: ["A vent cover held", "by four screws.", "Something is taped", "behind it.", "", "You need a tool."],
      gives: null,
      evidence: "memcard",
      lines: [
        "Taped inside is a",
        "memory card.",
        "",
        "LOG EXPORT " + exportTime,
        "Exported by:",
        c.badge + " (temp)",
        "",
        "Someone hid this."
      ]
    }
  };

  const terminalFiles = [
    {
      name: "readme.txt",
      evidence: null,
      lines: ["Welcome, alex.", "Last login 20:58.", "", "Use A/D to browse", "the files."]
    },
    {
      name: "mail.log",
      evidence: null,
      lines: [
        "20:51 From: " + c.short,
        "\"Heading home now.\"",
        "",
        deleteTime + " From: ADMIN",
        "\"File removed.\"",
        "\"No backups left.\""
      ]
    },
    {
      name: "security.txt",
      evidence: "adminacct",
      lines: [
        "NOTICE:",
        "Temp admin account",
        "TEMP-09 was made",
        "for badge " + c.badge + ".",
        "It was never",
        "disabled."
      ]
    },
    {
      name: "deleted.tmp",
      evidence: "deleted",
      lines: [
        "RECOVERED FRAGMENT",
        "\"If anyone asks,",
        "I was home by 9.",
        "The badge proves",
        "nothing.\"",
        "- " + c.initials
      ]
    },
    {
      name: "camera.meta",
      evidence: "camerameta",
      lines: [
        "IMAGE: srv_21" + pad2(loginMin) + ".jpg",
        "TIME: " + loginTime + ":03",
        "DEVICE: ALEX-CAM",
        "Unedited original."
      ]
    },
    {
      name: "audit.txt",
      evidence: null,
      lines: [
        "Audit board: 12:00",
        "",
        "If my file goes",
        "missing, the copy",
        "is in the storage",
        "safe. - Alex"
      ]
    }
  ];

  const cctvFeeds = [
    {
      name: "CAM 1: LOBBY",
      evidence: "cctvlobby",
      lines: [
        "21:03 " + lv.first + " walks",
        "out the front.",
        "21:40 " + wt.first + " walks",
        "out the front.",
        "",
        c.first + " never passes",
        "through the lobby."
      ]
    },
    {
      name: "CAM 2: SERVER DOOR",
      evidence: "cctvserver",
      lines: [
        badgeTime + " A hooded",
        "figure swipes a",
        c.badgeColor + " badge.",
        "",
        "21:" + pad2(deleteMin + 2) + " They leave",
        "holding a drive."
      ]
    },
    {
      name: "CAM 3: LOADING DOCK",
      evidence: "cctvback",
      lines: [
        "23:52 " + c.upper,
        "slips out through",
        "the loading dock.",
        "",
        "No coat. They look",
        "straight at the",
        "camera."
      ]
    }
  ];

  const locks = {
    pc: {
      title: "ALEX-PC LOGIN",
      hint: ["Enter password.", "3 letters.", "", "Alex hid a hint", "in this office."],
      symbols: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      answer: rule.answer
    },
    safe: {
      title: "EVIDENCE SAFE",
      hint: ["Engraved on door:", "Set the time the", "file was deleted.", "Format HHMM (24h)."],
      symbols: "0123456789",
      answer: "21" + pad2(deleteMin)
    },
    cabinet: {
      title: "FILING CABINET",
      hint: ["Keypad label:", "Time the intruder's", "badge opened the", "server door.", "Format HHMM (24h)."],
      symbols: "0123456789",
      answer: "21" + pad2(badgeMin)
    }
  };

  function claimsFor(id) {
    const isCulprit = id === culpritId;
    const list = [];
    if (isCulprit) {
      list.push({
        text: ["\"I went home at", "9:00 PM. Ask", "anyone.\""],
        breaks: ["signin", "coat", "receipt", "cctvback", "cctvlobby"],
        supports: [],
        reveal: ["\"Fine. I stayed", "late to finish", "some work.\""],
        required: true
      });
    } else if (id === leaverId) {
      list.push({
        text: ["\"I left at 9:03 PM.", "Check the log.\""],
        breaks: [],
        supports: ["serverlog", "cctvlobby", "signin", "voicemail"],
        reveal: [],
        required: false
      });
    } else {
      list.push({
        text: ["\"I was in the", "archive from 9:12", "to 9:40.\""],
        breaks: [],
        supports: ["archivesheet", "cctvlobby", "signin", "serverlog"],
        reveal: [],
        required: false
      });
    }
    list.push({
      text: ["\"I never went near", "the server room.\""],
      breaks: isCulprit ? ["keycard", "cctvserver", "photo"] : [],
      supports: isCulprit ? [] : ["keycard", "cctvserver", "photo"],
      reveal: ["\"I checked a rack.", "Routine stuff.\""],
      required: isCulprit
    });
    list.push({
      text: ["\"Temp admin? I", "never made one.\""],
      breaks: isCulprit ? ["adminacct", "memcard"] : [],
      supports: isCulprit ? [] : ["adminacct", "memcard"],
      reveal: ["\"It was for tests!", "I forgot to turn", "it off.\""],
      required: isCulprit
    });
    list.push({
      text: ["\"I'd never delete", "Alex's audit file.\""],
      breaks: isCulprit ? ["backup", "deleted"] : [],
      supports: isCulprit ? [] : ["backup", "deleted"],
      reveal: ["A long silence.", "Their hands shake."],
      required: isCulprit
    });
    list.push({
      text: ["\"Alex and I got", "along just fine.\""],
      breaks: isCulprit ? ["statement"] : [],
      supports: isCulprit ? [] : ["statement"],
      reveal: ["\"Alex was going", "to report me...\""],
      required: isCulprit
    });
    const secret = SECRETS[id];
    list.push({
      text: secret.text,
      breaks: secret.breaks,
      supports: [],
      reveal: secret.reveal,
      required: false
    });
    return list;
  }

  const claims = {};
  for (const id of SUSPECT_ORDER) claims[id] = claimsFor(id);

  return {
    culpritId: culpritId,
    leaverId: leaverId,
    witnessId: witnessId,
    badgeTime: badgeTime,
    deleteTime: deleteTime,
    evidence: evidence,
    clues: clues,
    roomClues: roomClues,
    containers: containers,
    terminalFiles: terminalFiles,
    cctvFeeds: cctvFeeds,
    locks: locks,
    claims: claims
  };
}

function culprit() {
  return PEOPLE[theCase.culpritId];
}

function evCount() {
  return Object.keys(theCase.evidence).length;
}

function totalLies() {
  let count = 0;
  for (const id of SUSPECT_ORDER) {
    for (const claim of theCase.claims[id]) if (claim.breaks.length > 0) count++;
  }
  return count;
}

function neededLies() {
  return theCase.claims[theCase.culpritId].filter(claim => claim.required).length;
}

let mode = "intro";

let roomIndex = LOBBY;
let playerPos = { x: START_SPAWN[0], y: START_SPAWN[1] };
let facing = { dx: 0, dy: -1 };
let statusText = HELP_TXT;
let ticks = 0;
let steps = 0;
let found = [];
let items = [];
let pcUnlocked = false;
let safeUnlocked = false;
let cabinetUnlocked = false;
let powerOn = false;
let breakerGrid = [];
let swCursor = { x: 1, y: 1 };
let breakerMoves = 0;
let filePage = 0;
let camPage = 0;
let journalPage = 0;
let activeLock = null;
let digits = [];
let digitIdx = 0;
let codeMsg = "";
let talkingTo = null;
let claimIndex = 0;
let brokenClaims = {};
let pickIdx = 0;
let interviewed = {};
let wrongAccusations = 0;
let credibility = MAX_CREDIBILITY;
let timesCaught = 0;
let guardStep = 0;
let invScore = 0;
let doneAt = "";

function gotEv(id) {
  return found.includes(id);
}

function giveEv(id) {
  if (!id || gotEv(id)) return false;
  found.push(id);
  return true;
}

function gotItem(id) {
  return items.includes(id);
}

function giveItem(id) {
  if (!id || gotItem(id)) return false;
  items.push(id);
  return true;
}

function minutesNow() {
  return START_MINUTES + Math.floor(ticks / TICKS_PER_MINUTE);
}

function minutesLeft() {
  return Math.max(0, DEADLINE_MINUTES - minutesNow());
}

function clockText() {
  const total = minutesNow();
  return pad2(Math.floor(total / 60)) + ":" + pad2(total % 60);
}

function claimKey(suspectId, index) {
  return suspectId + ":" + index;
}

function liesExposed() {
  return Object.keys(brokenClaims).length;
}

function provenVs(suspectId) {
  let count = 0;
  theCase.claims[suspectId].forEach((claim, i) => {
    if (claim.required && brokenClaims[claimKey(suspectId, i)]) count++;
  });
  return count;
}

function spendTime(amount) {
  ticks += amount;
  if (minutesNow() >= DEADLINE_MINUTES) {
    showLose("time");
    return true;
  }
  return false;
}

function openScreen(nextMode) {
  if (mode === "world") {
    const player = getFirst(PLAYER);
    if (player) playerPos = { x: player.x, y: player.y };
  }
  mode = nextMode;
  setMap(SCREEN_MAP);
  clearText();
}

function showScreen(title, lines, footer, nextMode) {
  openScreen(nextMode || "screen");
  addText(title, { x: 0, y: 0, color: YELLOW });
  lines.forEach((line, i) => {
    if (line) addText(line, { x: 0, y: 2 + i, color: WHITE });
  });
  if (footer) addText(footer, { x: 0, y: 15, color: GREY });
}

function drawHud() {
  clearText();
  const room = ROOMS[roomIndex];
  addText((roomIndex + 1) + "/" + ROOMS.length + " " + room.name, { x: 0, y: 14, color: YELLOW });
  const clockColor = minutesLeft() <= 30 ? RED : GREEN;
  addText(clockText(), { x: 15, y: 14, color: clockColor });
  addText(statusText, { x: 0, y: 15, color: WHITE });
}

function setStatus(text) {
  statusText = text;
  drawHud();
}

function isDark() {
  return roomIndex === ARCHIVE && !gotItem("flashlight");
}

function applyDarkness() {
  if (!isDark()) return;
  for (let y = 1; y < height() - 2; y++) {
    for (let x = 1; x < width() - 1; x++) addSprite(x, y, DARK);
  }
}

function placeGuard() {
  if (roomIndex !== GUARD_ROOM) return;
  const spot = GUARD_PATH[guardStep];
  addSprite(spot[0], spot[1], GUARD);
}

function guardTouching() {
  const guard = getFirst(GUARD);
  const player = getFirst(PLAYER);
  if (!guard || !player) return false;
  return Math.abs(guard.x - player.x) + Math.abs(guard.y - player.y) <= 1;
}

function advanceGuard() {
  const guard = getFirst(GUARD);
  if (!guard) return;
  const next = (guardStep + 1) % GUARD_PATH.length;
  const target = GUARD_PATH[next];
  guard.x = target[0];
  guard.y = target[1];
  if (guard.x === target[0] && guard.y === target[1]) {
    guardStep = next;
  } else {

    guard.x = GUARD_PATH[guardStep][0];
    guard.y = GUARD_PATH[guardStep][1];
  }
}

function caughtByGuard() {
  timesCaught++;
  roomIndex = LOBBY;
  if (spendTime(CAUGHT_COST)) return;
  showScreen("CAUGHT!", [
    "Guard Bruno grabs",
    "your shoulder.",
    "",
    "\"No visitors in the",
    "server room during",
    "an audit!\"",
    "",
    "He walks you back",
    "to the lobby.",
    "",
    "-20 minutes"
  ], "I: continue");
  playerPos = { x: 8, y: 3 };
  facing = { dx: -1, dy: 0 };
}

function enterWorld(status) {
  mode = "world";
  setMap(ROOMS[roomIndex].map);
  addSprite(playerPos.x, playerPos.y, PLAYER);
  placeGuard();
  applyDarkness();
  if (status) statusText = status;
  else if (isDark()) statusText = "Pitch black in here";
  else statusText = HELP_TXT;
  drawHud();
}

function enterRoom(index, spawn) {
  roomIndex = index;
  playerPos = { x: spawn[0], y: spawn[1] };
  let status = "Entered " + ROOMS[index].name;
  if (index === GUARD_ROOM) status = "Avoid the guard!";
  if (index === ARCHIVE && isDark()) status = "Too dark to search";
  if (index === INTERVIEW) status = "Face a suspect + I";
  enterWorld(status);
}

function movePlayer(dx, dy) {
  const player = getFirst(PLAYER);
  if (!player) return;
  facing = { dx: dx, dy: dy };
  const oldX = player.x;
  const oldY = player.y;

  if (dx !== 0) player.x += dx;
  if (dy !== 0) player.y += dy;
  if (player.x !== oldX || player.y !== oldY) {
    steps++;
    statusText = isDark() ? "Pitch black in here" : HELP_TXT;
  } else {
    statusText = "You wait a moment.";
  }
  if (spendTime(1)) return;

  if (roomIndex === GUARD_ROOM) {
    if (guardTouching()) {
      caughtByGuard();
      return;
    }
    advanceGuard();
    if (guardTouching()) {
      caughtByGuard();
      return;
    }
  }
  drawHud();
}

function inspect() {
  const player = getFirst(PLAYER);
  if (!player) return;
  const directions = [
    [facing.dx, facing.dy],
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0]
  ];
  for (const dir of directions) {
    const x = player.x + dir[0];
    const y = player.y + dir[1];
    if (x < 0 || y < 0 || x >= width() || y >= height()) continue;
    const target = getTile(x, y).find(sprite => INTERACTIVE.includes(sprite.type));
    if (target) {
      facing = { dx: dir[0], dy: dir[1] };
      interactWith(target.type, x, y);
      return;
    }
  }
  setStatus(isDark() ? "Too dark to see." : "Nothing to inspect.");
}

function clueFor(type) {
  const roomSet = theCase.roomClues[roomIndex];
  if (roomSet && roomSet[type]) return roomSet[type];
  return theCase.clues[type] || null;
}

function interactWith(type, x, y) {
  if (type === DOOR) {
    tryDoor(x, y);
    return;
  }
  if (isDark()) {
    setStatus("Too dark. Need light");
    return;
  }
  if (type === GUARD) {
    caughtByGuard();
  } else if (type === PC) {
    if (pcUnlocked) showFile(filePage);
    else openCode("pc");
  } else if (type === SAFE) {
    if (safeUnlocked) openSafe();
    else openCode("safe");
  } else if (type === CABINET) {
    if (cabinetUnlocked) openCabinet();
    else openCode("cabinet");
  } else if (type === MONITOR) {
    openCctv();
  } else if (type === BREAKER) {
    openBreaker();
  } else if (SUSPECT_BY_SPRITE[type]) {
    openInterview(SUSPECT_BY_SPRITE[type], 0, "");
  } else if (theCase.containers[type]) {
    openContainer(theCase.containers[type]);
  } else if (clueFor(type)) {
    const clue = clueFor(type);
    showClue(clue.title, clue.lines, clue.evidence);
  } else {
    setStatus("Nothing to inspect.");
  }
}

function showClue(title, lines, evidenceId) {
  const isNew = giveEv(evidenceId);
  showScreen(title, lines, "I: back");
  if (isNew) addText("+ NEW EVIDENCE", { x: 0, y: 13, color: GREEN });
}

function openContainer(box) {
  if (box.needs && !gotItem(box.needs)) {
    showScreen(box.title, box.lockedLines, "I: back");
    return;
  }
  if (box.gives) {
    if (giveItem(box.gives)) {
      showScreen(box.title, box.lines, "I: back");
      addText("+ NEW TOOL", { x: 0, y: 13, color: CYAN });
    } else {
      showScreen(box.title, box.emptyLines, "I: back");
    }
    return;
  }
  showClue(box.title, box.lines, box.evidence);
}

function tryDoor(x, y) {
  const door = DOORS.find(d => d.room === roomIndex && d.x === x && d.y === y);
  if (!door) {
    setStatus("It won't budge.");
    return;
  }
  if (door.needs && !gotItem(door.needs)) {
    showScreen("SERVER ROOM", [
      "A badge reader",
      "blinks red.",
      "",
      "Only staff with",
      "server access can",
      "enter. Alex must",
      "have had a badge."
    ], "I: back");
    return;
  }
  enterRoom(door.to, door.spawn);
}

function showHint() {

  let hint = "Accuse the liar!";
  if (!gotItem("flashlight")) hint = "Check security";
  else if (!powerOn) hint = "Power is out";
  else if (!pcUnlocked) hint = "Alex's PC is locked";
  else if (!gotItem("smallkey")) hint = "Search the archive";
  else if (!gotItem("alexbadge")) hint = "Alex's desk drawer";
  else if (!gotEv("serverlog")) hint = "Server room log";
  else if (!gotItem("screwdriver")) hint = "Storage has tools";
  else if (!safeUnlocked || !cabinetUnlocked) hint = "Storage locks";
  else if (!gotEv("memcard")) hint = "Server room vent";
  else if (provenVs(theCase.culpritId) < neededLies()) hint = "Break 5 lies";
  setStatus(hint);
}

function openCode(lockId) {
  activeLock = lockId;
  digits = [];
  for (let i = 0; i < theCase.locks[lockId].answer.length; i++) digits.push(0);
  digitIdx = 0;
  codeMsg = "";
  drawCode();
}

function drawCode() {
  const lock = theCase.locks[activeLock];
  openScreen("code");
  addText(lock.title, { x: 0, y: 0, color: YELLOW });
  lock.hint.forEach((line, i) => {
    if (line) addText(line, { x: 0, y: 2 + i, color: WHITE });
  });
  const shown = digits.map(v => lock.symbols[v]).join(" ");
  const left = Math.floor((20 - shown.length) / 2);
  addText(shown, { x: left, y: 9, color: CYAN });
  addText("^", { x: left + digitIdx * 2, y: 10, color: ORANGE });
  if (codeMsg) addText(codeMsg, { x: 0, y: 12, color: RED });
  addText("W/S change A/D move", { x: 0, y: 14, color: GREY });
  addText("K enter  I cancel", { x: 0, y: 15, color: GREY });
}

function spinDigit(step) {
  const count = theCase.locks[activeLock].symbols.length;
  digits[digitIdx] = (digits[digitIdx] + step + count) % count;
  codeMsg = "";
  drawCode();
}

function moveDigit(step) {
  const length = digits.length;
  digitIdx = (digitIdx + step + length) % length;
  drawCode();
}

function submitCode() {
  const lock = theCase.locks[activeLock];
  const entered = digits.map(v => lock.symbols[v]).join("");
  if (entered !== lock.answer) {
    codeMsg = "ACCESS DENIED";
    drawCode();
    return;
  }
  if (activeLock === "pc") {
    pcUnlocked = true;
    showFile(0);
  } else if (activeLock === "safe") {
    safeUnlocked = true;
    openSafe();
  } else if (activeLock === "cabinet") {
    cabinetUnlocked = true;
    openCabinet();
  }
}

function openSafe() {
  const c = culprit();
  showClue("SAFE OPEN", [
    "A backup drive!",
    "",
    "History:",
    theCase.deleteTime + " DELETE by",
    c.badge + " temp admin",
    "",
    "The original file",
    "is still here."
  ], "backup");
}

function openCabinet() {
  const c = culprit();
  showClue("CABINET OPEN", [
    "Alex's statement:",
    "",
    "\"" + c.first + " asked me to",
    "delete the backup",
    "before the audit.",
    "I refused.\"",
    "",
    "- Alex Morgan"
  ], "statement");
}

function flipSwitch(grid, x, y) {
  const spots = [[x, y], [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
  for (const spot of spots) {
    const sx = spot[0];
    const sy = spot[1];
    if (sx >= 0 && sy >= 0 && sx < 3 && sy < 3) grid[sy][sx] = !grid[sy][sx];
  }
}

function resetBreaker() {
  breakerGrid = [
    [true, true, true],
    [true, true, true],
    [true, true, true]
  ];
  const cells = shuffled([0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, 3);
  for (const cell of cells) flipSwitch(breakerGrid, cell % 3, Math.floor(cell / 3));
  swCursor = { x: 1, y: 1 };
  breakerMoves = 0;
}

function breakerSolved() {
  return breakerGrid.every(row => row.every(on => on));
}

function openBreaker() {
  if (powerOn) {
    showScreen("BREAKER PANEL", [
      "All nine switches",
      "are ON.",
      "",
      "The security room",
      "has power again."
    ], "I: back");
    return;
  }
  drawBreaker();
}

function drawBreaker() {
  openScreen("breaker");
  addText("BREAKER PANEL", { x: 0, y: 0, color: YELLOW });
  addText("Turn every switch", { x: 0, y: 2, color: WHITE });
  addText("ON to restore power", { x: 0, y: 3, color: WHITE });
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const on = breakerGrid[y][x];
      const cellX = 5 + x * 4;
      const cellY = 5 + y * 2;
      addText(on ? "(#)" : "( )", { x: cellX, y: cellY, color: on ? GREEN : RED });
      if (swCursor.x === x && swCursor.y === y) {
        addText(">", { x: cellX - 1, y: cellY, color: YELLOW });
      }
    }
  }
  addText("Flips: " + breakerMoves, { x: 0, y: 12, color: CYAN });
  addText("WASD move K flip", { x: 0, y: 14, color: GREY });
  addText("I leave", { x: 0, y: 15, color: GREY });
}

function moveSwitch(dx, dy) {
  swCursor.x = (swCursor.x + dx + 3) % 3;
  swCursor.y = (swCursor.y + dy + 3) % 3;
  drawBreaker();
}

function pressBreaker() {
  flipSwitch(breakerGrid, swCursor.x, swCursor.y);
  breakerMoves++;
  if (breakerSolved()) {
    powerOn = true;
    showScreen("POWER RESTORED", [
      "The panel hums.",
      "Lights flicker on",
      "next door.",
      "",
      "The security",
      "cameras should",
      "work now."
    ], "I: back");
    return;
  }
  drawBreaker();
}

function showFile(index) {
  const files = theCase.terminalFiles;
  const count = files.length;
  filePage = (index + count) % count;
  const file = files[filePage];
  const isNew = giveEv(file.evidence);
  openScreen("terminal");
  addText("ALEX-PC  FILE " + (filePage + 1) + "/" + count, { x: 0, y: 0, color: YELLOW });
  addText(file.name, { x: 0, y: 1, color: ORANGE });
  file.lines.forEach((line, i) => {
    if (line) addText(line, { x: 0, y: 3 + i, color: GREEN });
  });
  if (isNew) addText("+ NEW EVIDENCE", { x: 0, y: 12, color: CYAN });
  addText("A/D files  I close", { x: 0, y: 15, color: GREY });
}

function openCctv() {
  if (!powerOn) {
    showScreen("SECURITY MONITORS", [
      "NO SIGNAL",
      "",
      "The cameras lost",
      "power last night.",
      "Someone flipped",
      "the breakers in",
      "the room north",
      "of here."
    ], "I: back");
    return;
  }
  showCctvFeed(camPage);
}

function showCctvFeed(index) {
  const feeds = theCase.cctvFeeds;
  const count = feeds.length;
  camPage = (index + count) % count;
  const feed = feeds[camPage];
  const isNew = giveEv(feed.evidence);
  openScreen("cctv");
  addText("CCTV PLAYBACK " + (camPage + 1) + "/" + count, { x: 0, y: 0, color: YELLOW });
  addText(feed.name, { x: 0, y: 1, color: ORANGE });
  feed.lines.forEach((line, i) => {
    if (line) addText(line, { x: 0, y: 3 + i, color: CYAN });
  });
  if (isNew) addText("+ NEW EVIDENCE", { x: 0, y: 12, color: GREEN });
  addText("A/D feeds  I close", { x: 0, y: 15, color: GREY });
}

function showJournal(page) {
  const perPage = 5;
  const pages = Math.max(1, Math.ceil(found.length / perPage));
  journalPage = page % pages;
  openScreen("journal");
  addText("JOURNAL " + (journalPage + 1) + "/" + pages, { x: 0, y: 0, color: YELLOW });
  if (found.length === 0) {
    addText("No evidence yet.", { x: 0, y: 2, color: WHITE });
    addText("Inspect with I.", { x: 0, y: 3, color: WHITE });
  }
  const start = journalPage * perPage;
  found.slice(start, start + perPage).forEach((id, i) => {
    addText(theCase.evidence[id].label, { x: 0, y: 2 + i * 2, color: WHITE });
    addText(theCase.evidence[id].fact, { x: 1, y: 3 + i * 2, color: CYAN });
  });
  addText("Found " + found.length + "/" + evCount(), { x: 0, y: 13, color: GREEN });
  addText("J next  I close", { x: 0, y: 15, color: GREY });
}

function showBag() {
  openScreen("bag");
  addText("CASE BAG", { x: 0, y: 0, color: YELLOW });
  addText("Tools:", { x: 0, y: 2, color: ORANGE });
  if (items.length === 0) {
    addText("(none)", { x: 1, y: 3, color: GREY });
  }
  items.forEach((id, i) => {
    addText(ITEMS[id], { x: 1, y: 3 + i, color: WHITE });
  });
  addText("Evidence  " + pad2(found.length) + "/" + evCount(), { x: 0, y: 8, color: GREEN });
  addText("Lies      " + liesExposed() + "/" + totalLies(), { x: 0, y: 9, color: GREEN });
  addText("Credibility " + credibility + "/" + MAX_CREDIBILITY, { x: 0, y: 10, color: CYAN });
  addText("Strikes   " + wrongAccusations + "/" + MAX_WRONG, { x: 0, y: 11, color: RED });
  addText("Time left " + minutesLeft() + " min", { x: 0, y: 12, color: YELLOW });
  addText("J help", { x: 0, y: 14, color: GREY });
  addText("I close", { x: 0, y: 15, color: GREY });
}

function showHelp() {
  showScreen("FIELD GUIDE", [
    "WASD move, bump a",
    "  wall to wait",
    "I  inspect / back",
    "J journal  K bag",
    "L  hint",
    "",
    "Interview: A/D pick",
    "a claim, K present",
    "evidence, L accuse.",
    "",
    "Chase: WASD move,",
    "K shoot, I pause."
  ], "I: continue");
}

function showIntro() {
  showScreen("THE LIAR'S COMPUTER", [
    "08:00. Last night",
    "someone deleted",
    "Alex Morgan's audit",
    "file.",
    "",
    "Three coworkers",
    "stayed late. One is",
    "lying, and it's",
    "never the same one.",
    "",
    "Board meets: 12:00"
  ], null, "intro");
  addText("I: start", { x: 0, y: 14, color: GREY });
  addText("J: controls", { x: 0, y: 15, color: GREY });
}

function openInterview(suspectId, index, message) {
  const person = PEOPLE[suspectId];
  const claims = theCase.claims[suspectId];
  const count = claims.length;
  talkingTo = suspectId;
  claimIndex = (index + count) % count;
  interviewed[suspectId] = true;
  const claim = claims[claimIndex];
  const broken = brokenClaims[claimKey(suspectId, claimIndex)];

  openScreen("interview");
  addText("INTERVIEW", { x: 0, y: 0, color: YELLOW });
  addText("CRED " + credibility, { x: 14, y: 0, color: CYAN });
  addText(person.upper, { x: 0, y: 1, color: WHITE });
  addText(person.role, { x: 0, y: 2, color: GREY });
  addText("Badge: " + person.badgeColor, { x: 0, y: 3, color: GREY });
  addText("CLAIM " + (claimIndex + 1) + "/" + count, { x: 0, y: 5, color: ORANGE });
  if (broken) addText("LIE!", { x: 16, y: 5, color: RED });
  claim.text.forEach((line, i) => {
    addText(line, { x: 0, y: 6 + i, color: CYAN });
  });
  if (broken) {
    claim.reveal.slice(0, 3).forEach((line, i) => {
      addText(line, { x: 0, y: 10 + i, color: GREEN });
    });
  }
  if (message) addText(message, { x: 0, y: 13, color: RED });
  addText("A/D claim K present", { x: 0, y: 14, color: GREY });
  addText("L accuse  I back", { x: 0, y: 15, color: GREY });
}

function backToInterview(message) {
  openInterview(talkingTo, claimIndex, message || "");
}

function openPicker() {
  if (found.length === 0) {
    backToInterview("No evidence yet!");
    return;
  }
  if (pickIdx >= found.length) pickIdx = 0;
  drawPicker();
}

function drawPicker() {
  openScreen("picker");
  addText("PRESENT EVIDENCE", { x: 0, y: 0, color: YELLOW });
  addText("vs claim " + (claimIndex + 1), { x: 0, y: 1, color: GREY });
  const visible = 9;
  let start = pickIdx - Math.floor(visible / 2);
  if (start > found.length - visible) start = found.length - visible;
  if (start < 0) start = 0;
  for (let i = start; i < start + visible && i < found.length; i++) {
    const row = 3 + (i - start);
    const selected = i === pickIdx;
    if (selected) addText(">", { x: 0, y: row, color: YELLOW });
    addText(theCase.evidence[found[i]].label, { x: 1, y: row, color: selected ? YELLOW : WHITE });
  }
  addText((pickIdx + 1) + "/" + found.length, { x: 15, y: 1, color: GREY });
  addText("W/S pick K present", { x: 0, y: 14, color: GREY });
  addText("I back", { x: 0, y: 15, color: GREY });
}

function movePicker(step) {
  pickIdx = (pickIdx + step + found.length) % found.length;
  drawPicker();
}

function presentEvidence() {
  const evidenceId = found[pickIdx];
  const person = PEOPLE[talkingTo];
  const claim = theCase.claims[talkingTo][claimIndex];
  const key = claimKey(talkingTo, claimIndex);
  const label = theCase.evidence[evidenceId].label;

  if (brokenClaims[key]) {
    backToInterview("Already proven!");
    return;
  }

  if (claim.breaks.includes(evidenceId)) {
    brokenClaims[key] = true;
    showScreen("CONTRADICTION!", [
      "You show the",
      label + ".",
      "",
      person.upper + ":"
    ].concat(claim.reveal), "I: back", "reaction");
    addText("+ LIE EXPOSED", { x: 0, y: 13, color: GREEN });
    return;
  }

  if (claim.supports.includes(evidenceId)) {
    showScreen("THAT CHECKS OUT", [
      "The " + label,
      "backs up this claim.",
      "",
      "No contradiction,",
      "but no harm done."
    ], "I: back", "reaction");
    return;
  }

  credibility--;
  if (credibility <= 0) {
    showLose("credibility");
    return;
  }
  if (spendTime(BLUFF_COST)) return;
  showScreen("SO WHAT?", [
    person.upper + ":",
    "\"What does that",
    "have to do with",
    "anything?\"",
    "",
    "Bad bluff.",
    "-1 credibility",
    "-5 minutes"
  ], "I: back", "reaction");
}

function askAccuse() {
  const missing = SUSPECT_ORDER.filter(id => !interviewed[id]);
  if (missing.length > 0) {
    backToInterview("Talk to all 3 first");
    return;
  }
  showScreen("ACCUSE?", [
    PEOPLE[talkingTo].upper,
    "",
    "Once you accuse,",
    "there's no undo.",
    "",
    "Strikes left: " + (MAX_WRONG - wrongAccusations)
  ], null, "confirm");
  addText("L: accuse", { x: 0, y: 14, color: RED });
  addText("I: not yet", { x: 0, y: 15, color: GREY });
}

function resolveAccusation() {
  const person = PEOPLE[talkingTo];
  if (talkingTo === theCase.culpritId) {
    const proven = provenVs(talkingTo);
    const needed = neededLies();
    if (proven >= needed) {
      invScore = calcScore();
      doneAt = clockText();
      startChase();
      return;
    }
    wrongAccusations++;
    if (wrongAccusations >= MAX_WRONG) {
      showLose("strikes");
      return;
    }
    showScreen("NOT ENOUGH PROOF", [
      person.first + " smirks.",
      "\"You've got",
      "nothing on me.\"",
      "",
      "Lies proven: " + proven + "/" + needed,
      "Break EVERY core",
      "claim first.",
      "",
      "1 strike left."
    ], "I: keep digging");
    return;
  }
  wrongAccusations++;
  if (wrongAccusations >= MAX_WRONG) {
    showLose("strikes");
    return;
  }
  showScreen("WRONG CALL", [
    person.upper,
    "had a secret, but",
    "not THIS secret.",
    "",
    "Compare every alibi",
    "with the logs and",
    "camera footage.",
    "",
    "1 strike left."
  ], "I: keep digging");
}

const TICK_MS = 120;
const FPS = 1000 / TICK_MS;
const CONTINUES = 2;

const hwSprites = [CRUISER, VAN, TRAFFIC, CRATE, EBULLET, PBULLET, SPIKES, AMMO, MEDKIT, BOOM];
const dkSprites = [PLAYER, MIRA, JON, RAVI, DOCK_CRATE, CRACKED_CRATE, EBULLET, PBULLET, AMMO, MEDKIT, BOOM];

const HW = {
  left: 1,
  right: 8,
  topRow: 3,
  bottomRow: 6,
  vanHp: 15,
  playerHp: 4,
  startAmmo: 20,
  maxAmmo: 30,
  ammoPickup: 8,
  timeLimit: 95,
  fireCooldown: 3,
  hitInvincible: 10
};

const DK = {
  bossHp: 12,
  playerHp: 4,
  startAmmo: 12,
  maxAmmo: 20,
  ammoPickup: 5,
  timeLimit: 75,
  fireCooldown: 3,
  hitInvincible: 10,
  crateHp: 3,
  bossTop: 1,
  bossBottom: 3
};

const DOCK_CRATES = [
  [1, 2], [4, 2], [7, 2],
  [2, 4], [5, 4], [8, 4],
  [0, 5], [9, 5]
];

let chaseStage = 0;
let continuesLeft = CONTINUES;
let wasMode = "";
let chaseTick = 0;
let hw = null;
let dk = null;
let bonus = 0;

function startChase() {
  continuesLeft = CONTINUES;
  bonus = 0;
  const c = culprit();
  showScreen("BUSTED... ALMOST", [
    c.upper + " shoves",
    "the table over and",
    "bolts for the",
    "loading dock!",
    "",
    "An armed getaway",
    "van is waiting.",
    "",
    "Grab the cruiser.",
    "Don't let them go."
  ], null, "busted");
  chaseStage = 1;
  addText("I: start the chase", { x: 0, y: 14, color: RED });
  addText("Continues: " + continuesLeft, { x: 0, y: 15, color: GREY });
}

function stageIntro(stage) {
  chaseStage = stage;
  if (stage === 1) {
    showScreen("STAGE 1: HIGHWAY", [
      "Shoot the van (K).",
      "Dodge traffic,",
      "crates and bullets.",
      "",
      "Below 2/3 HP it",
      "shoots back. Below",
      "1/3: spike strips!",
      "",
      "Grab ammo + repair",
      "kits on the road."
    ], null, "chaseIntro");
  } else {
    showScreen("STAGE 2: THE DOCKS", [
      "The van flips! The",
      "culprit runs for a",
      "boat with a pistol.",
      "",
      "Crates are cover",
      "but they break.",
      "You shoot the way",
      "you last moved.",
      "",
      "Boat leaves in " + DK.timeLimit + "s"
    ], null, "chaseIntro");
  }
  addText("I: GO", { x: 0, y: 14, color: RED });
  addText("Continues: " + continuesLeft, { x: 0, y: 15, color: GREY });
}

function beginStage() {
  chaseTick = 0;
  if (chaseStage === 1) startHighway();
  else startDocks();
}

function clearSprites(types) {
  for (const type of types) for (const sprite of getAll(type)) sprite.remove();
}

function pauseChase() {
  wasMode = mode;
  mode = "paused";
  clearText();
  addText("PAUSED", { x: 7, y: 6, color: YELLOW });
  addText("I: resume", { x: 5, y: 8, color: WHITE });
}

function resumeChase() {
  mode = wasMode;
  if (mode === "highway") renderHighway();
  else renderDocks();
}

function chaseLost(reason) {
  const c = culprit();
  let lines;
  if (reason === "wrecked") {
    lines = ["Your cruiser spins", "into the barrier.", "Totaled."];
  } else if (reason === "vanEscaped") {
    lines = ["The van vanishes", "into traffic."];
  } else if (reason === "shot") {
    lines = ["You take a hit and", "go down behind a", "crate."];
  } else {
    lines = ["The boat roars off", "with " + c.first + " on it."];
  }
  if (continuesLeft <= 0) {
    showLose("escaped");
    return;
  }
  continuesLeft--;
  showScreen("STAGE FAILED", lines.concat([
    "",
    "Continues left: " + continuesLeft
  ]), null, "chaseLost");
  addText("I: retry stage", { x: 0, y: 15, color: RED });
}

function startHighway() {
  mode = "highway";
  setMap(HIGHWAY_MAP);
  hw = {
    px: 4,
    py: 6,
    hp: HW.playerHp,
    ammo: HW.startAmmo,
    cool: 0,
    inv: 0,
    vanX: 5,
    vanTarget: 5,
    vanHp: HW.vanHp,
    timeLeft: HW.timeLimit * FPS,
    things: [],
    booms: [],
    gapLanes: [],
    gapUntil: 0
  };
  renderHighway();
}

function highwayPhase() {
  if (hw.vanHp > Math.ceil(HW.vanHp * 2 / 3)) return 1;
  if (hw.vanHp > Math.ceil(HW.vanHp / 3)) return 2;
  return 3;
}

function hwThingAt(x, y, kind) {
  return hw.things.find(t => t.x === x && t.y === y && (!kind || t.kind === kind));
}

function hwAdd(kind, x, y, every) {
  hw.things.push({ kind: kind, x: x, y: y, every: every, dead: false });
}

function hwBoom(x, y) {
  hw.booms.push({ x: x, y: y, life: 3 });
}

const hazards = ["traffic", "crate", "ebullet", "spike"];

function hwCheckPlayer() {
  for (const thing of hw.things) {
    if (thing.dead || thing.x !== hw.px || thing.y !== hw.py) continue;
    if (thing.kind === "ammo") {
      thing.dead = true;
      hw.ammo = Math.min(HW.maxAmmo, hw.ammo + HW.ammoPickup);
    } else if (thing.kind === "repair") {
      thing.dead = true;
      hw.hp = Math.min(HW.playerHp, hw.hp + 1);
    } else if (hazards.includes(thing.kind)) {
      if (hw.inv > 0) continue;
      thing.dead = true;
      hw.hp--;
      hw.inv = HW.hitInvincible;
      hwBoom(hw.px, hw.py);
    }
  }
}

function hwCheckBullets() {
  for (const bullet of hw.things) {
    if (bullet.dead || bullet.kind !== "pbullet") continue;
    if (bullet.y === 0 && bullet.x === hw.vanX) {
      bullet.dead = true;
      hw.vanHp--;
      hwBoom(bullet.x, 0);
      continue;
    }
    for (const other of hw.things) {
      if (other.dead || other === bullet || other.x !== bullet.x || other.y !== bullet.y) continue;
      if (other.kind === "crate" || other.kind === "ebullet") {

        other.dead = true;
        bullet.dead = true;
        hwBoom(other.x, other.y);
      } else if (other.kind === "traffic") {

        bullet.dead = true;
      }
      if (bullet.dead) break;
    }
  }
}

function hwFire() {
  if (hw.cool > 0 || hw.ammo <= 0) return;
  hw.ammo--;
  hw.cool = HW.fireCooldown;
  if (hw.py - 1 < 0) return;
  hwAdd("pbullet", hw.px, hw.py - 1, 1);
  hwCheckBullets();
  renderHighway();
}

function hwMove(dx, dy) {
  const nx = hw.px + dx;
  const ny = hw.py + dy;
  if (nx < HW.left || nx > HW.right || ny < HW.topRow || ny > HW.bottomRow) return;
  hw.px = nx;
  hw.py = ny;
  hwCheckPlayer();
  if (hw.hp <= 0) {
    chaseLost("wrecked");
    return;
  }
  renderHighway();
}

function inGap(lane) {
  return chaseTick < hw.gapUntil && hw.gapLanes.includes(lane);
}

function hwFreeLane() {
  for (let tries = 0; tries < 8; tries++) {
    const lane = randInt(HW.left, HW.right);
    if (lane === hw.vanX || inGap(lane)) continue;
    if (hwThingAt(lane, 0) || hwThingAt(lane, 1)) continue;
    return lane;
  }
  return -1;
}

function highwayTick() {
  chaseTick++;
  hw.timeLeft--;
  if (hw.cool > 0) hw.cool--;
  if (hw.inv > 0) hw.inv--;
  const phase = highwayPhase();

  for (const thing of hw.things) {
    if (thing.kind === "pbullet" && !thing.dead) {
      thing.y--;
      if (thing.y < 0) thing.dead = true;
    }
  }
  hwCheckBullets();

  for (const thing of hw.things) {
    if (thing.dead || thing.kind === "pbullet") continue;
    if (chaseTick % thing.every === 0) {
      thing.y++;
      if (thing.y > HW.bottomRow) thing.dead = true;
    }
  }
  hwCheckBullets();

  const moveEvery = phase === 1 ? 5 : phase === 2 ? 4 : 3;
  const retargetEvery = phase === 1 ? 18 : 12;
  if (chaseTick % retargetEvery === 0) {
    if (phase >= 2 && Math.random() < 0.45) hw.vanTarget = hw.px;
    else hw.vanTarget = randInt(HW.left, HW.right);
  }
  if (chaseTick % moveEvery === 0) hw.vanX += sign(hw.vanTarget - hw.vanX);

  const crateEvery = phase === 1 ? 14 : phase === 2 ? 12 : 10;
  if (chaseTick % crateEvery === 0 && !hwThingAt(hw.vanX, 1) && !inGap(hw.vanX)) {
    hwAdd("crate", hw.vanX, 1, 2);
  }
  if (phase >= 2) {
    const shootEvery = phase === 2 ? 14 : 10;
    if (chaseTick % shootEvery === 0) hwAdd("ebullet", hw.vanX, 1, 1);
  }
  if (phase === 3 && chaseTick % 40 === 0) {
    const gap = randInt(HW.left, HW.right - 1);
    hw.gapLanes = [gap, gap + 1];
    hw.gapUntil = chaseTick + 16;

    for (const thing of hw.things) {
      if (hw.gapLanes.includes(thing.x) && thing.y <= 3 && thing.kind !== "pbullet") thing.dead = true;
    }
    for (let lane = HW.left; lane <= HW.right; lane++) {
      if (hw.gapLanes.includes(lane)) continue;
      hwAdd("spike", lane, 1, 2);
    }
  }

  const trafficEvery = phase === 1 ? 10 : phase === 2 ? 9 : 8;
  if (chaseTick % trafficEvery === 0) {
    const lane = hwFreeLane();
    if (lane >= 0) hwAdd("traffic", lane, 0, phase === 3 ? 2 : 3);
  }
  const ammoEvery = hw.ammo < 5 ? 15 : 30;
  if (chaseTick % ammoEvery === 0 && hw.ammo < HW.maxAmmo) {
    const lane = hwFreeLane();
    if (lane >= 0) hwAdd("ammo", lane, 0, 2);
  }
  if (chaseTick % 110 === 0 && hw.hp < HW.playerHp) {
    const lane = hwFreeLane();
    if (lane >= 0) hwAdd("repair", lane, 0, 2);
  }

  hwCheckPlayer();
  hw.things = hw.things.filter(t => !t.dead);

  if (chaseTick % 2 === 0) {
    const from = getAll(EDGE_A).length > 0 ? EDGE_A : EDGE_B;
    const to = from === EDGE_A ? EDGE_B : EDGE_A;
    for (const tile of getAll(from)) tile.type = to;
  }
  for (const boom of hw.booms) boom.life--;
  hw.booms = hw.booms.filter(b => b.life > 0);

  if (hw.vanHp <= 0) {
    bonus += hw.hp * 25 + Math.floor(hw.timeLeft / FPS);
    stageIntro(2);
    return;
  }
  if (hw.hp <= 0) {
    chaseLost("wrecked");
    return;
  }
  if (hw.timeLeft <= 0) {
    chaseLost("vanEscaped");
    return;
  }
  renderHighway();
}

const hwLook = {
  traffic: TRAFFIC,
  crate: CRATE,
  ebullet: EBULLET,
  pbullet: PBULLET,
  spike: SPIKES,
  ammo: AMMO,
  repair: MEDKIT
};

function renderHighway() {
  clearSprites(hwSprites);
  for (const thing of hw.things) {
    if (thing.y >= 0 && thing.y <= HW.bottomRow) addSprite(thing.x, thing.y, hwLook[thing.kind]);
  }
  addSprite(hw.vanX, 0, VAN);

  if (hw.inv === 0 || chaseTick % 2 === 0) addSprite(hw.px, hw.py, CRUISER);
  for (const boom of hw.booms) addSprite(boom.x, boom.y, BOOM);

  clearText();
  addText("VAN " + hw.vanHp + "/" + HW.vanHp, { x: 0, y: 14, color: RED });
  const secs = Math.ceil(hw.timeLeft / FPS);
  addText("T " + secs, { x: 14, y: 14, color: secs <= 20 ? RED : YELLOW });
  addText("HP " + hw.hp + "  AMMO " + hw.ammo, { x: 0, y: 15, color: WHITE });
}

function startDocks() {
  mode = "docks";
  setMap(DOCKS_MAP);
  dk = {
    px: 4,
    py: 6,
    fdx: 0,
    fdy: -1,
    hp: DK.playerHp,
    ammo: DK.startAmmo,
    cool: 0,
    inv: 0,
    bx: 4,
    by: 1,
    bossHp: DK.bossHp,
    timeLeft: DK.timeLimit * FPS,
    crates: DOCK_CRATES.map(pos => ({ x: pos[0], y: pos[1], hp: DK.crateHp })),
    bullets: [],
    pickups: [],
    booms: []
  };
  renderDocks();
}

function dkCrateAt(x, y) {
  return dk.crates.find(crate => crate.x === x && crate.y === y && crate.hp > 0);
}

function dkInside(x, y) {
  return x >= 0 && x <= 9 && y >= 1 && y <= 6;
}

function dkBlocked(x, y) {
  return !dkInside(x, y) || !!dkCrateAt(x, y);
}

function dkHurtPlayer() {
  if (dk.inv > 0) return;
  dk.hp--;
  dk.inv = DK.hitInvincible;
  dk.booms.push({ x: dk.px, y: dk.py, life: 3 });
}

function stepBullet(bullet) {
  const nx = bullet.x + bullet.dx;
  const ny = bullet.y + bullet.dy;
  if (nx < 0 || nx > 9 || ny < 0 || ny > 6) {
    bullet.dead = true;
    return;
  }
  const crate = dkCrateAt(nx, ny);
  if (crate) {
    crate.hp--;
    bullet.dead = true;
    if (crate.hp <= 0) dk.booms.push({ x: nx, y: ny, life: 3 });
    return;
  }
  bullet.x = nx;
  bullet.y = ny;
  if (bullet.owner === "player" && nx === dk.bx && ny === dk.by) {
    bullet.dead = true;
    dk.bossHp--;
    dk.booms.push({ x: nx, y: ny, life: 2 });
  } else if (bullet.owner === "enemy" && nx === dk.px && ny === dk.py) {
    bullet.dead = true;
    dkHurtPlayer();
  }
}

function dkFire() {
  if (dk.cool > 0 || dk.ammo <= 0) return;
  dk.ammo--;
  dk.cool = DK.fireCooldown;
  const bullet = { x: dk.px, y: dk.py, dx: dk.fdx, dy: dk.fdy, owner: "player", dead: false };
  stepBullet(bullet);
  if (!bullet.dead) dk.bullets.push(bullet);
  dkAfterAction();
}

function dkMove(dx, dy) {
  dk.fdx = dx;
  dk.fdy = dy;
  const nx = dk.px + dx;
  const ny = dk.py + dy;
  if (!dkBlocked(nx, ny) && !(nx === dk.bx && ny === dk.by)) {
    dk.px = nx;
    dk.py = ny;

    for (const bullet of dk.bullets) {
      if (!bullet.dead && bullet.owner === "enemy" && bullet.x === nx && bullet.y === ny) {
        bullet.dead = true;
        dkHurtPlayer();
      }
    }
    grabPickups();
  }
  dkAfterAction();
}

function grabPickups() {
  for (const pickup of dk.pickups) {
    if (pickup.dead || pickup.x !== dk.px || pickup.y !== dk.py) continue;
    pickup.dead = true;
    if (pickup.kind === "ammo") dk.ammo = Math.min(DK.maxAmmo, dk.ammo + DK.ammoPickup);
    else dk.hp = Math.min(DK.playerHp, dk.hp + 1);
  }
  dk.pickups = dk.pickups.filter(p => !p.dead);
}

function dkCheckEnd() {
  if (dk.bossHp <= 0) {
    bonus += dk.hp * 25 + Math.floor(dk.timeLeft / FPS);
    showWin();
    return true;
  }
  if (dk.hp <= 0) {
    chaseLost("shot");
    return true;
  }
  if (dk.timeLeft <= 0) {
    chaseLost("boat");
    return true;
  }
  return false;
}

function dkAfterAction() {
  dk.bullets = dk.bullets.filter(b => !b.dead);
  if (dkCheckEnd()) return;
  renderDocks();
}

function dkFreeTile(minRow, maxRow) {
  for (let tries = 0; tries < 12; tries++) {
    const x = randInt(0, 9);
    const y = randInt(minRow, maxRow);
    if (dkCrateAt(x, y)) continue;
    if (x === dk.px && y === dk.py) continue;
    if (x === dk.bx && y === dk.by) continue;
    if (dk.pickups.some(p => p.x === x && p.y === y)) continue;
    return { x: x, y: y };
  }
  return null;
}

function rotate45(dx, dy, turn) {
  const dirs = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];
  let index = dirs.findIndex(d => d[0] === dx && d[1] === dy);
  if (index < 0) return [dx, dy];
  index = (index + turn + 8) % 8;
  return dirs[index];
}

function dkBossShoot(dx, dy) {
  if (dx === 0 && dy === 0) return;
  const bullet = { x: dk.bx, y: dk.by, dx: dx, dy: dy, owner: "enemy", dead: false };
  stepBullet(bullet);
  if (!bullet.dead) dk.bullets.push(bullet);
}

function docksTick() {
  chaseTick++;
  dk.timeLeft--;
  if (dk.cool > 0) dk.cool--;
  if (dk.inv > 0) dk.inv--;
  const angry = dk.bossHp <= Math.floor(DK.bossHp / 2);

  for (const bullet of dk.bullets) if (!bullet.dead) stepBullet(bullet);

  const moveEvery = angry ? 4 : 6;
  if (chaseTick % moveEvery === 0 && Math.random() < 0.8) {
    const options = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(d => {
      const nx = dk.bx + d[0];
      const ny = dk.by + d[1];
      return ny >= DK.bossTop && ny <= DK.bossBottom && !dkBlocked(nx, ny) &&
        !(nx === dk.px && ny === dk.py);
    });
    if (options.length > 0) {
      const step = pickOne(options);
      dk.bx += step[0];
      dk.by += step[1];
    }
  }

  const shootEvery = angry ? 9 : 12;
  if (chaseTick % shootEvery === 0) {
    const aimX = sign(dk.px - dk.bx);
    const aimY = sign(dk.py - dk.by);
    dkBossShoot(aimX, aimY);
    if (angry) {
      const left = rotate45(aimX, aimY, -1);
      const right = rotate45(aimX, aimY, 1);
      dkBossShoot(left[0], left[1]);
      dkBossShoot(right[0], right[1]);
    }
  }

  if (chaseTick % 55 === 0 && !dk.pickups.some(p => p.kind === "ammo")) {
    const spot = dkFreeTile(4, 6);
    if (spot) dk.pickups.push({ x: spot.x, y: spot.y, kind: "ammo", dead: false });
  }
  if (chaseTick % 200 === 0 && dk.hp < DK.playerHp && !dk.pickups.some(p => p.kind === "medkit")) {
    const spot = dkFreeTile(5, 6);
    if (spot) dk.pickups.push({ x: spot.x, y: spot.y, kind: "medkit", dead: false });
  }

  for (const boom of dk.booms) boom.life--;
  dk.booms = dk.booms.filter(b => b.life > 0);
  dk.bullets = dk.bullets.filter(b => !b.dead);
  if (dkCheckEnd()) return;
  renderDocks();
}

function renderDocks() {
  clearSprites(dkSprites);
  for (const crate of dk.crates) {
    if (crate.hp <= 0) continue;
    addSprite(crate.x, crate.y, crate.hp === 1 ? CRACKED_CRATE : DOCK_CRATE);
  }
  for (const pickup of dk.pickups) {
    addSprite(pickup.x, pickup.y, pickup.kind === "ammo" ? AMMO : MEDKIT);
  }
  for (const bullet of dk.bullets) {
    addSprite(bullet.x, bullet.y, bullet.owner === "player" ? PBULLET : EBULLET);
  }
  addSprite(dk.bx, dk.by, culprit().sprite);
  if (dk.inv === 0 || chaseTick % 2 === 0) addSprite(dk.px, dk.py, PLAYER);
  for (const boom of dk.booms) addSprite(boom.x, boom.y, BOOM);

  clearText();
  addText(culprit().short + " " + dk.bossHp + "/" + DK.bossHp, { x: 0, y: 14, color: RED });
  const secs = Math.ceil(dk.timeLeft / FPS);
  addText("BOAT " + secs, { x: 12, y: 14, color: secs <= 15 ? RED : YELLOW });
  addText("HP " + dk.hp + "  AMMO " + dk.ammo, { x: 0, y: 15, color: WHITE });
}

function gameTick() {
  if (mode === "highway") highwayTick();
  else if (mode === "docks") docksTick();
}

function calcScore() {
  return found.length * 10 +
    liesExposed() * 15 +
    credibility * 20 +
    minutesLeft() -
    wrongAccusations * 50 -
    timesCaught * 15;
}

function rankFor(score) {
  if (score >= 900) return "LEGEND";
  if (score >= 780) return "MASTER SLEUTH";
  if (score >= 650) return "DETECTIVE";
  if (score >= 500) return "INSPECTOR";
  return "ROOKIE";
}

function showWin() {
  const c = culprit();
  const usedContinues = CONTINUES - continuesLeft;
  const score = Math.max(0, invScore + bonus + continuesLeft * 40);
  showScreen("CASE CLOSED", [
    c.upper + " is in",
    "handcuffs.",
    theCase.badgeTime + " badge in",
    theCase.deleteTime + " file deleted",
    "",
    "Evidence  " + found.length + "/" + evCount(),
    "Lies      " + liesExposed() + "/" + totalLies(),
    "Solved at " + doneAt,
    "Continues " + usedContinues + " used",
    "Score     " + score,
    "Rank: " + rankFor(score)
  ], null, "ending");
  addText("J: play again", { x: 0, y: 15, color: GREEN });
}

function showLose(reason) {
  let lines;
  if (reason === "time") {
    lines = [
      "It's 12:00.",
      "The board meets",
      "without your proof.",
      "",
      "The case is closed",
      "as \"system error\"."
    ];
  } else if (reason === "credibility") {
    lines = [
      "Too many bluffs.",
      "",
      "The suspects call",
      "their lawyers and",
      "refuse to talk."
    ];
  } else if (reason === "escaped") {
    lines = [
      "You solved it, but",
      culprit().upper + " got",
      "away. Out of",
      "continues.",
      "",
      "Somewhere, a boat",
      "is heading south."
    ];
  } else {
    lines = [
      "Two wrong calls.",
      "",
      "You're taken off",
      "the case. The liar",
      "walks free."
    ];
  }
  lines.push("");
  lines.push("Evidence " + found.length + "/" + evCount());
  showScreen("CASE LOST", lines, null, "ending");
  addText("J: try again", { x: 0, y: 15, color: RED });
}

function restartGame() {
  theCase = buildCase();
  roomIndex = LOBBY;
  playerPos = { x: START_SPAWN[0], y: START_SPAWN[1] };
  facing = { dx: 0, dy: -1 };
  statusText = HELP_TXT;
  ticks = 0;
  steps = 0;
  found = [];
  items = [];
  pcUnlocked = false;
  safeUnlocked = false;
  cabinetUnlocked = false;
  powerOn = false;
  resetBreaker();
  filePage = 0;
  camPage = 0;
  journalPage = 0;
  activeLock = null;
  digits = [];
  digitIdx = 0;
  codeMsg = "";
  talkingTo = null;
  claimIndex = 0;
  brokenClaims = {};
  pickIdx = 0;
  interviewed = {};
  wrongAccusations = 0;
  credibility = MAX_CREDIBILITY;
  timesCaught = 0;
  guardStep = 0;
  invScore = 0;
  doneAt = "";
  chaseStage = 0;
  continuesLeft = CONTINUES;
  wasMode = "";
  chaseTick = 0;
  hw = null;
  dk = null;
  bonus = 0;
  showIntro();
}

function handleDirection(dx, dy) {
  if (mode === "world") {
    movePlayer(dx, dy);
  } else if (mode === "highway") {
    hwMove(dx, dy);
  } else if (mode === "docks") {
    dkMove(dx, dy);
  } else if (mode === "code") {
    if (dy !== 0) spinDigit(-dy);
    else moveDigit(dx);
  } else if (mode === "breaker") {
    moveSwitch(dx, dy);
  } else if (mode === "terminal" && dx !== 0) {
    showFile(filePage + dx);
  } else if (mode === "cctv" && dx !== 0) {
    showCctvFeed(camPage + dx);
  } else if (mode === "interview" && dx !== 0) {
    openInterview(talkingTo, claimIndex + dx, "");
  } else if (mode === "picker" && dy !== 0) {
    movePicker(dy);
  }
}

onInput("w", () => handleDirection(0, -1));
onInput("s", () => handleDirection(0, 1));
onInput("a", () => handleDirection(-1, 0));
onInput("d", () => handleDirection(1, 0));

onInput("i", () => {
  if (mode === "intro") enterWorld("Case opened. 4 hrs");
  else if (mode === "world") inspect();
  else if (mode === "code") enterWorld("Still locked.");
  else if (mode === "picker" || mode === "reaction" || mode === "confirm") backToInterview("");
  else if (mode === "busted") stageIntro(1);
  else if (mode === "chaseIntro" || mode === "chaseLost") beginStage();
  else if (mode === "highway" || mode === "docks") pauseChase();
  else if (mode === "paused") resumeChase();
  else if (mode === "screen" || mode === "terminal" || mode === "cctv" ||
           mode === "journal" || mode === "bag" || mode === "breaker" ||
           mode === "interview") enterWorld();

});

onInput("j", () => {
  if (mode === "intro" || mode === "bag") showHelp();
  else if (mode === "world") showJournal(0);
  else if (mode === "journal") showJournal(journalPage + 1);
  else if (mode === "ending") restartGame();
});

onInput("k", () => {
  if (mode === "world") showBag();
  else if (mode === "highway") hwFire();
  else if (mode === "docks") dkFire();
  else if (mode === "code") submitCode();
  else if (mode === "breaker") pressBreaker();
  else if (mode === "interview") openPicker();
  else if (mode === "picker") presentEvidence();
});

onInput("l", () => {
  if (mode === "world") showHint();
  else if (mode === "interview") askAccuse();
  else if (mode === "confirm") resolveAccusation();
});

setInterval(gameTick, TICK_MS);
restartGame();