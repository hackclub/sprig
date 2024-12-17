/*
@title: Black Labyrinth
@author: Somebud0180
@tags: ['puzzle']
@addedOn: 2024-08-13
*/

// A game all about mazes, mazes with lights, and mazes with boxes, even both at the same time

// Controls
// They're in the guide
// Use WS or AD to move up and down an L to enter

// Game Bitmaps
const background = "t";
const wall = "w";
const fenceWall = "p";
const player = "y";
const keyOne = "a";
const keyTwo = "s";
const keyThree = "d";
const doorOne = "u";
const doorTwo = "i";
const doorThree = "o";
const lightPost = "q";
const lightLantern = "e";
const hangingLantern = "r";
const box = "0";
const boxKeyOne = "1";
const boxKeyTwo = "2";
const boxKeyThree = "3";

// Main Menu Bitmaps
const arrow = "z";
const muteIcon = "g";
const buttonW = "x";
const buttonA = "c";
const buttonS = "v";
const buttonD = "b";
const buttonI = "n";
const buttonK = "m";
const buttonJ = "h";
const buttonL = "j";
let buttonActive = "k";
const tipBoxOne = "9";
const tipBoxTwo = "8";
const tipBoxThree = "7";
const tipBoxFour = "6";
const tipBoxFive = "5";
let tipBoxActive = "l";

// Resources
// Map
const levels = [
  map`
....................
....................
....................
....................
....x..........n....
...c.b........h.j...
....v..........m....
....................
....................
..9..08..7y..6a..5..
....................
....................
......j.............
....................
....................
....................`, // Level 0 || Guide
  map`
...wwwwwwwwwwwwww...
...w............w.g.
...w..........e.w...
...w..........q.w...
...w..........q.w...
...wwwwwwwwwwwwww...
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`, // Level 1 || Main Menu
  map`
wwwwwwwwwwwwwwwwwwww
w...................
www.wwwwwwww..wwwwww
w.....w............w
w.....w..r......r..w
w.....w............w
w.....w..r......r..w
wwwwwww............w
w.......wwwwwwwwwwww
w.......w..........w
w.......w.....w...0w
w.......w.....w0..1w
w.......w.....w00..w
ww.wwwwwwwwiwwwwwwww
w...................
wwwwwwwwwwwwwwwwwwww`, // Level 2 || Map 1: Level 1
  map`
wwwwwwwwwwwwwwwwwwww
...................o
wwwwwwww....wwwwwwww
w...w..........w...w
ww.ww..........w.www
w...w.r......r.w...w
w..............w.www
ww.ww...r..r...w..dw
w...w..........w.www
ww.ww...r..r...u...w
ws..w..........w...w
ww.ww.r......r.w.www
w...w..........w...w
wwwwwwww....wwwwwwww
...................w
wwwwwwwwwwwwwwwwwwww`, // Level 3 || Map 1: Level 2
  map`
wwwwwwwwwwwwwwwwwwww
w...r..........r....
wwww..wwwwwwwwwwwwww
w......w.....w.....w
w......w.....w.....w
w............w..d..w
w......w.....w.....w
w......w.....w.....w
w......wwwwwwwwwww.w
w.wwwwww........u..w
w......w........w.ww
w......w........w..w
w......w........w..w
wwww.wwwww.wwwwwwwww
w...r..........r....
wwwwwwwwwwwwwwwwwwww`, // Level 4 || Map 2: Level 1
  map`
wwwwwwwwwwwwwwwwwwww
....r..........r....
wwwww.wwwwwwwww.wwww
w.....w.....w......w
w.....w.....w......w
w.....w..a..w......w
w.....i.....w......w
w.....w.....w......w
www.wwwwwwwww.wwwwww
w..................w
w..................w
w..................w
w..................w
wwwwwwwww.wwwwwwwwww
....r..........r....
wwwwwwwwwwwwwwwwwwww`, // Level 5 || Map 2: Level 2
  map`
wwwwwwwwwwwwwwwwwwww
....r............w.o
wwww.wwwwww.wwwwww.w
w..w.ww...w.w......w
w.ww.w.sw...w.wwwwww
w....w.wwwwww.ww...w
w.ww.www....w..w...w
w..w.....wwwww.www.w
ww.w.wwwww.........w
w..w.......wwwwwww.w
w.wwww.wwwww...w...w
w.w..w...w.w.w.w.w.w
w....w.w...w.w...w.w
wwww.wwwww.wwwwwwwww
....r..........r...w
wwwwwwwwwwwwwwwwwwww`, // Level 6 || Map 2: Level 3
  map`
wwwwwwwwwwwwwwwwwwww
w.w.0d0.0.0.0.0w010w
w.w.0.0...0.0.0w0.0w
w.w.0.0.0.0...0w0.0w
w.w.....0...0.0w0.0w
w.w.0.0.0.0.0.0w0.0w
w.wwwwwwwiwwwwwww.ww
w.....r..r.......r.w
wwwwwwuwwwwwwwwwww.w
w................w.w
w.000000.00000000w.w
w................w.w
w00000.000000000.w.w
w............s...w.w
w.000000.0000000.w.o
wwwwwwwwwwwwwwwwwwww`, // Level 7 || Map 3: Level 1
  map`
wwwwwwwwwwwwwwwwwwww
w...r..........r....
wwwwww.wwwwww.wwwwww
w.0w............w0.w
w..u...r....r......w
w3.w............w.0w
wwwwwwwww..wwwwwwwww
w..............r....
w...r...............
wwww.wwwwwwwwww.wwww
w......w0000w....00w
w0.....r....r.....0w
w00....w....w......w
www.wwwwwwwwwwww.www
w...r..........r....
wwwwwwwwwwwwwwwwwwww`, // Level 8 || Map 4: Level 1
  map`
wwwwwwwwwwwwwwwwwwww
....r..........r...o
wwwwwwwww..wwwwwwwww
w.w0..0w....w0000w0w
w.r....r....r....r.w
w2w.0..w....w....w0w
wwwwwwwww..wwwwwwwww
...............r...w
....r..............w
wwwwwwwww..wwwwwwwww
w.......w..w00...0aw
w.r...r....i.0.0.0.w
w.......w..w...0...w
wwwwwwwww..wwwwwwwww
....r..........r...w
wwwwwwwwwwwwwwwwwwww`, // Level 9 || Map 4: Level 2
  map`
wwwwwwwwwwwwwwwwwwww
w........r........sw
wwwwwwwww.wwwwwwwwww
w...w...w.u.......3w
w.w.w.w.w.wwwwwwwwww
w.w.w.w.w....0...1.w
w.w.w.w.w..0...0...w
w.w.w.w.wiwww.wwwwww
w.w.w0w.....w....w.o
w.w.wwwwwwwww.ww.w.w
w.w.w.........w..w.w
w.w.wwwwwwwwwww.ww.w
w.w..............w.w
w.wwwwwwwwwwwwwwww.w
w..................w
wwwwwwwwwwwwwwwwwwww`, // Level 10 || Map 5: Level 1
  map`
wwwwwwwwwwwwwwwwwwww
w00...00w..w00...00w
w0.....0w..w0.....0w
w..020..u......0...w
w..000..w..w..0r0..w
w0.....0w..w0.....0w
w00...00w..w00...00w
wwwwwwwww..wwwwwwwww
w..r...r....r...r...
wwwwwwwww..wwwwwwwww
w0000000w..w.......w
w...0...w..w.....r.w
w.0.3.0.w..w.......w
w.0...0.i....r.....w
w0000000w..w.......w
wwwwwwwwwwwwwwwwwwww`, // Level 11 || Map 6: Level 1
  map`
wwwwwwwwwwwwwwwwwwww
w...r..........r...w
wwwwwww..wwwwwwww..w
w...............w..w
w.r.......r.....wr.w
w.....r.......r.w..w
w...............w..w
wwwwwwwwwwwwwwwww..w
...r...r....r...r..w
wwwwwwwwwwwwwwwww..w
w00..w....w.....w..w
w0.............1wr.w
w....w....w...00w..w
wwwwwww..wwwwwwww..w
w...r..........r...o
wwwwwwwwwwwwwwwwwwww`, // Level 12 || Map 6: Level 2
  map`
wwwwwwwwwwwwwwwwwwww
w...................
wwwwwwwwwwwwwww..www
w00.000.00w........w
w0...0...0w........w
w2.0...0..u..r..r..w
w0000.0000w........w
wwwwwwwwwww........w
w.........wwwwwwwwww
w.00.00000w...0..0.w
wd.0....0...0r...0.w
w0.000.00.w00000r0.w
w..0......w........w
wwwwiiwwwwwwwwwwwwww
w...................
wwwwwwwwwwwwwwwwwwww`, // Level 13 || Map 7: Level 1
  map`
wwwwwwwwwwwwwwwwwwww
...................o
ww.wwwwwwwwwwwwwwwww
w0.w0000ww000ww0000w
w..w0...w0...2w...0w
wrww0...ww...ww...0w
w..w0...2w...w0...0w
w0.w00.0000.0000.02w
w0.................w
w0.w00.0000.0010.00w
wwrw0.............0w
w..w0...ww...ww...0w
w.0w0000ww010ww1000w
w.wwwwwwwwwwwwwwwwww
...................w
wwwwwwwwwwwwwwwwwwww`, // Level 14 || Map 7: Level 2
  map`
wwwwwwwwwwwwwwwwwwww
w..................w
wwwwwwwww.wwwwwwwwww
w0000000w.w..w...w.w
w0......i.w.sw.w...w
w0000000w.w....w.w.w
wwwwwwwww.wwwwwwww.w
w..................w
wwwwwwuww.wwwwwwww.w
w.......w.w...w....w
w.00000.w.w.wa..w..w
w...0...w.wwwwwwww.w
w.00000.w.w........w
w...0...w.wwwwwwwwww
w0030000w..........o
wwwwwwwwwwwwwwwwwwww`, // Level 15 || Map 8: Level 1
  map`
wwwwwwwwwwwwwwwwwwww
w.....w...w........u
w.wwwww.w.wwwwww.w.w
w.......w......w.www
w.wwwwwwwwwwww.w...w
w.......w....w.www.w
wwwwwww.w.ww.w.w...w
w.....w...w..w.w.www
w.w.w.w.www.ww.w...w
www.www.w.a..w.www.w
w.......w....w.w...w
w.wwwww.wwwwww.w.www
w.....w............w
wwwwwwwwwwwwwwwwww.w
w..................w
wwwwwwwwwwwwwwwwwwww`, // Level 16 || Map 9: Level 1
  map`
wwwwwwwwwwwwwwwwwwww
.........w.....w..sw
wwww.www...www.ww..w
w....w.wwwww.w..ww.w
w.wwww...w...w...w.w
w.w....w.w.w.....w.w
w.www.ww.w.www..ww.w
w......w.w...wwww..w
www.ww.w.w.w......ww
w...w....w.wwwwwwwww
w.w....w.w.w.......w
w.ww.w.w.w...wwwww.w
w..w.w.w.w.w.....w.w
ww.www.wwwwwwwwwww.w
w....w...........w.i
wwwwwwwwwwwwwwwwwwww`, // Level 17 || Map 9: Level 2
  map`
wwwwwwwwwwwwwwwwwwww
w...w.w............w
w.w...w.wwwwww.www.w
w.wwwww.w....w.w.w.w
w...w...w..w.w.w.w.w
www.ww.ww..w.w...w.w
w...w...w..w.w.w.w.w
w.www.www..w.w.w.w.w
w...w..dw..w.wwwww.w
ww.www.ww..w.......w
w.......w..wwwwwwwww
wwww.wwww..........w
w.......w..........w
ww.wwwwwwwwwwwwwww.w
.................w.o
wwwwwwwwwwwwwwwwwwww`, // Level 18 || Map 9: Level 3
  map`
wwwwwwwwwwwwwwwwwwww
w.....w...aw.......w
w.ww.ww.wwww.wwwww.w
w.w.....w..w.w.wsw.w
w.wwwwwww..w.w.w.www
w.w.....ww.w.w.w.w.w
w.w.www..w.w.w.w.w.w
w.w.w.wwww.w.w.w.w.w
w.w.w.w....w.w.wuw.w
w.w.w.w.wwww.w.w.w.w
w.w.w.w.w..w.w.w.w.w
w.w.w.w.w..w.w.w.w.w
w..................w
www..............www
w..r...r....r...r..i
wwwwwwwwwwwwwwwwwwww`, // Level 19 || Map 10: Level 1
  map`
wwwwwwwwwwwwwwwwwwww
w...w..w...........o
w.w.ww.w.wwwwwwwwwww
w.www..w...w...w...w
w...w.www..ww.wwww.w
www.w.w.w...w..w.d.w
w.w.w...www.ww.w.www
w.w.www.w...w..w...w
w.w.w.w.w..w..wwww.w
w.w.w.w.w..w.w...w.w
w.w.w.w.w..w.w.www.w
w.w.w.w.w..w.w.w.w.w
w.w.w.w.w..w.w.w.w.w
w.w.w.w.w..w.w.w.w.w
...................w
wwwwwwwwwwwwwwwwwwww`, // Level 20 || Map 10: Level 2
  map`
wwwwwwwwwwwwwwwwwwww
w..................o
wwwwwwwwww.wwwwwwwww
w00000000w.w.......w
w........w.w.ww.wwww
w02.ww.00w.w..w.w..w
w00.ww.00w.w..w....w
w........w.ww.wwwwww
w........u.i..w.d..w
w00.ww.00w.ww.wwww.w
w00.ww.00w.w..w....w
w........w.w.ww.wwww
w00000000w.w.......w
wwwwwwwwww.wwwwwwwww
wa.................w
wwwwwwwwwwwwwwwwwwww`, // Level 21 || Map 11: Level 1
  map`
wwwwwwwwwwwwwwwwwwww
w..w...............w
w..w.0000.000000r00w
w.rw...............w
w..w00r00000.00000.w
w..w...............w
wr.wwwwwwwwwwwwwwwww
w......r.....r.....r
w...r.....r.....r...
wwwwwwwwwwwwwwwwwwww
w..................w
w00r000.00000.00000w
w..................w
w.00000000.00000r00w
w..................w
wwwwwwwwwwwwwwwwwwww`, // Level 22 || Map 12: Level 1
  map`
wwwwwwwwwwwwwwwwwwww
w.................0w
w.wwwwwwwwwwwwwww..w
w.............w....w
w.wwwwwwwwwwwww.ww.w
w...............w..w
www..wwwwwwwwwwww.ww
........w...........
........w...........
wwww..wwwwwww.wwwwww
w...........w......w
w.wwwwwwwwwwwwwwww.w
w..................w
w.wwwwwwwwwwwwwwww.w
w................wsw
wwwwwwwwwwwwwwwwwwww`, // Level 23 || Map 12: Level 2
  map`
wwwwwwwwwwwwwwwwwwww
w..................w
w.wwwwwww.wwwwwwww.w
w.w.....w.wa.......w
w.w.wwwww.wwwwwwwwww
w..................w
wwwiwwwwwwwwwwwwwwww
....r...............
...............r....
wwwwwuwwww.wwwwwwwww
w........w.........w
wwww.w.w.w.w.w.w.w.w
w.dw.w.w.w.w.w.w.w.w
w..w.w...w...w.w...w
w....w...w000w0w000w
wwwwwwwwwwwwwwwwwwww`, // Level 24 || Map 12: Level 3
  map`
wwwww.wwwwwwwww.wwww
wwwwwrwwwwwwwwwrwwww
w.....w.....w......w
w.r...i.r...w....r.w
w...r.w..ar.w.r....w
w.....w.....w......w
wwwwwwwwwwwwwwwwwwww
....................
....................
wwwwwwwwwwwwwwwwwwww
w.......w......r..0w
w.r...r.w.r.r.w0..2w
w.......w.....w00.rw
ww.wwwwwwwwuwwwwwwww
...r...r....r...r...
wwwwwwwwwwwwwwwwwwww`, // Level 25 || Map 12: Level 4
  map`
wwwwwwwwwwwwwwwwwwww
wr..w.w..r..r...r..w
w.w.r.w.wwwwww.www.w
w.wwwww.w....w.w.wrw
w.r.w.r.w.rw.w.w.w.w
www.ww.ww..w.w.r.w.w
wwwwwwwwwwwwwwwwwwww
...................w
...................w
wwwwwwwwwwwwwwww...w
w0000000w..w...w...w
w..r0..rw.rw.r.w...w
w.0.3.0.w..w...w...w
wr0..r0.ir...r.w...w
w0000000w..w...w...o
wwwwwwwwwwwwwwwwwwww`, // Level 26 || Map 12: Level 5
  map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
...e...e....e...e...
...q...q....q...q...
pppqpppqppppqpppqppp
wwwwwwwwwwwwwwwwwwww`, // Level 27 || End Screen
];

// Map name
const mapNames = [
  "Starting Somewhere", // Map 1
  "The Labyrinth", // Map 2
  "Not all boxes", // Map 3
  "Boxes Here", // Map 4
  "Going In Circles", // Map 5
  "Storage Room", // Map 6
  "Logistics", // Map 7
  "Dark Rooms", // Map 8
  "Massive Mazes", // Map 9
  "Flowing Mazes", // Map 10
  "Half and Half", // Map 11
  "Familiarity", // Map 12
];

// Menu Sprites
const buttonLSprite = bitmap`
................
................
................
................
.....222222.....
....22000222....
....22022022.2..
....22000222.22.
....22022022.22.
....22022022.2..
....22022022....
.....222222.....
................
................
................
................`;
const unmutedSprite = bitmap`
................
................
.........22.....
.........222....
.........2......
....22...2......
...222.222......
..2222.222......
..2222..........
...222....2222..
....22....2..2..
..........2..2..
.........22.22..
.........22.22..
................
................`;
const mutedSprite = bitmap`
................
..............3.
.........22..3..
.........2223...
.........203....
....22...23.....
...222.223......
..2222.232......
..2222.3........
...2223...2222..
....23....2..2..
....3.....2..2..
...3.....22.22..
..3......22.22..
.3..............
................`;

// Guide Sprites
const buttonWInactiveSprite = bitmap`
................
.......11.......
......1111......
................
.....111111.....
....11011111....
....11011111....
....11011111....
....11011111....
....11011111....
....11000011....
.....111111.....
................
................
................
................`;
const buttonAInactiveSprite = bitmap`
................
................
................
................
.....111111.....
....11011111....
..1.11011111....
.11.11011111....
.11.11011111....
..1.11011111....
....11000011....
.....111111.....
................
................
................
................`;
const buttonSInactiveSprite = bitmap`
................
................
................
................
.....111111.....
....11011111....
....11011111....
....11011111....
....11011111....
....11011111....
....11000011....
.....111111.....
................
......1111......
.......11.......
................`;
const buttonDInactiveSprite = bitmap`
................
................
................
................
.....111111.....
....11011111....
....11011111.1..
....11011111.11.
....11011111.11.
....11011111.1..
....11000011....
.....111111.....
................
................
................
................`;
const buttonIInactiveSprite = bitmap`
................
.......11.......
......1111......
................
.....111111.....
....11000111....
....11011011....
....11000111....
....11011011....
....11011011....
....11011011....
.....111111.....
................
................
................
................`;
const buttonJInactiveSprite = bitmap`
................
................
................
................
.....111111.....
....11000111....
..1.11011011....
.11.11000111....
.11.11011011....
..1.11011011....
....11011011....
.....111111.....
................
................
................
................`;
const buttonKInactiveSprite = bitmap`
................
................
................
................
.....111111.....
....11000111....
....11011011....
....11000111....
....11011011....
....11011011....
....11011011....
.....111111.....
................
......1111......
.......11.......
................`;
const buttonLInactiveSprite = bitmap`
................
................
................
................
.....111111.....
....11000111....
....11011011.1..
....11000111.11.
....11011011.11.
....11011011.1..
....11011011....
.....111111.....
................
................
................
................`;
const tipBoxSprite = bitmap`
..LLLLLLLLLLLL..
.LLLLLLLLLLLLLL.
LLLLL111111LLLLL
LLLL11111111LLLL
LLLL111LL111LLLL
LLLLL11LL111LLLL
LLLLLLLLL111LLLL
LLLLLLLL111LLLLL
LLLLLLL1111LLLLL
LLLLLLL111LLLLLL
LLLLLLLLLLLLLLLL
LLLLLLL111LLLLLL
LLLLLLL111LLLLLL
LLLLLLL111LLLLLL
.LLLLLLLLLLLLLL.
..LLLLLLLLLLLL..`;

// Highlight Sprites
const buttonHighlightSprite = bitmap`
................
................
................
.....222222.....
....21111112....
...2111111112...
...2111111112...
...2111212112...
...2112121112...
...2111111112...
...2111111112...
....21111112....
.....222222.....
................
................
................`;
const tipHighlightSprite = bitmap`
..222222222222..
.22111111111122.
2211122222211122
2111222222221112
2111222112221112
2111122112221112
2111111112221112
2111111122211112
2111111222211112
2111111222111112
2111111111111112
2111111222111112
2111111222111112
2211111222111122
.22111111111122.
..222222222222..`;
const arrowSprite = bitmap`
........22......
........222.....
........2222....
........22222...
.2222222222222..
.22222222222222.
.22222222222222.
.2222222222222..
........22222...
........2222....
........222.....
........22......
................
................
................
................`;

// Game Sprites
const backgroundSprite = bitmap`
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
0000000000000000`;
const wallSprite = bitmap`
LLLLLLLLLLLLLLLL
11111L1111111L11
11111L1111111L11
11111L1111111L11
LLLLLLLLLLLLLLLL
1111L1111L1111L1
1111L1111L1111L1
1111L1111L1111L1
LLLLLLLLLLLLLLLL
111L111111L11111
111L111111L11111
111L111111L11111
LLLLLLLLLLLLLLLL
1111111L111111L1
1111111L111111L1
1111111L111111L1`;
const fenceWallSprite = bitmap`
................
................
................
................
................
................
................
................
................
.LLLLLL..LLLLLL.
.L1111L..L1111L.
.L1111L..L1111L.
LLLLLLLLLLLLLLLL
111L11111111L111
111L11111111L111
111L11111111L111`;
const playerSprite = bitmap`
................
................
................
.....111111.....
....10000001....
...1002222001...
...1022222201...
...1022222201...
...1022222201...
...1022222201...
...1002222001...
....10000001....
.....111111.....
................
................
................`;
const playerSideSprite = bitmap`
......1111......
.....100001.....
....10022001....
...1002222001...
...1022222201...
...1022222201...
...1022222201...
...1022222201...
...1022222201...
...1002222001...
....10022001....
.....100001.....
.....101101.....
....11011011....
...1000110001...
....111..111....`;
const playerBrightSprite = bitmap`
................
................
................
.....666666.....
....60000006....
...6002222006...
...6022222206...
...6022222206...
...6022222206...
...6022222206...
...6002222006...
....60000006....
.....666666.....
................
................
................`;
const playerWeakBrightSprite = bitmap`
................
................
................
.....FFFFFF.....
....F000000F....
...F00222200F...
...F02222220F...
...F02222220F...
...F02222220F...
...F02222220F...
...F00222200F...
....F000000F....
.....FFFFFF.....
................
................
................`;
const playerWithKeyOneSprite = bitmap`
................
................
................
.....111111.....
....10000001....
...1002222001.6.
...10222222016.6
...1022222201.6.
...1022222201.66
...1022222201.6.
...1002222001.66
....10000001....
.....111111.....
................
................
................`;
const playerWithKeyTwoSprite = bitmap`
................
................
................
.....111111.....
....10000001....
...1002222001.7.
...10222222017.7
...1022222201.7.
...1022222201.77
...1022222201.7.
...1002222001.77
....10000001....
.....111111.....
................
................
................`;
const playerWithKeyThreeSprite = bitmap`
................
................
................
.....111111.....
....10000001....
...1002222001.9.
...10222222019.9
...1022222201.9.
...1022222201.99
...1022222201.9.
...1002222001.99
....10000001....
.....111111.....
................
................
................`;
const keyOneSprite = bitmap`
................
................
................
................
.......6........
......666.......
.....66.66......
......666.......
.......6........
.......666......
.......6........
.......666......
................
................
................
................`;
const keyTwoSprite = bitmap`
................
................
................
................
.......7........
......777.......
.....77.77......
......777.......
.......7........
.......777......
.......7........
.......777......
................
................
................
................`;
const keyThreeSprite = bitmap`
................
................
................
................
.......9........
......999.......
.....99.99......
......999.......
.......9........
.......999......
.......9........
.......999......
................
................
................
................`;
const doorOneSprite = bitmap`
....1CCCCCC1....
..CC1CCCCCC1CC..
..CC1CCCCCC1CC..
.1CC1CCCCCC1CC1.
.1CC1CCCCCC1CC1.
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1666C
C1CC1CCCCCC16L6C
C1CC1CCCCCC16L6C
C1CC1CCCCCC1666C
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1CC1C`;
const doorTwoSprite = bitmap`
....1CCCCCC1....
..CC1CCCCCC1CC..
..CC1CCCCCC1CC..
.1CC1CCCCCC1CC1.
.1CC1CCCCCC1CC1.
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1777C
C1CC1CCCCCC17L7C
C1CC1CCCCCC17L7C
C1CC1CCCCCC1777C
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1CC1C`;
const doorThreeSprite = bitmap`
....1CCCCCC1....
..CC1CCCCCC1CC..
..CC1CCCCCC1CC..
.1CC1CCCCCC1CC1.
.1CC1CCCCCC1CC1.
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1999C
C1CC1CCCCCC19L9C
C1CC1CCCCCC19L9C
C1CC1CCCCCC1999C
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1CC1C
C1CC1CCCCCC1CC1C`;
const lightPostSprite = bitmap`
....L00LL00L....
....LL0LL0LL....
.....L0LL0L.....
.....L0LL0L.....
.....L0LL0L.....
.....L0LL0L.....
.....L0LL0L.....
.....L0LL0L.....
.....L0LL0L.....
.....L0LL0L.....
.....L0LL0L.....
.....L0LL0L.....
.....L0LL0L.....
.....L0LL0L.....
....LL0LL0LL....
....L00LL00L....`;
const lightLanternSprite = bitmap`
................
......1111......
.....1LLLL1.....
....1LLLLLL1....
...1LLLLLLLL1...
...2LLLLLLLL2...
...2L6LLLL6L2...
...2L6L66L6L2...
...2L6L66L6L2...
...2L6L66L6L2...
...2L6L66L6L2...
...2L6L66L6L2...
...2L6L66L6L2...
...2LLL66LLL2...
...100LLLL001...
....L000000L....`;
const hangingLanternSprite = bitmap`
................
................
................
......6666......
.....611116.....
....611LL116....
...611L11L116...
...61L1111L16...
...61L1111L16...
...611L11L116...
....611LL116....
.....611116.....
......6666......
................
................
................`;
const boxSprite = bitmap`
................
.11111111111111.
.1CCCCCCCCCCCC1.
.1LLLLLLLLLLLL1.
.1CCCCCCCCCCCC1.
.1CCCCCCCCCCCC1.
.1LLLLLLLLLLLL1.
.1CCCCCCCCCCCC1.
.1CCCCCCCCCCCC1.
.1LLLLLLLLLLLL1.
.1CCCCCCCCCCCC1.
.1CCCCCCCCCCCC1.
.1LLLLLLLLLLLL1.
.1CCCCCCCCCCCC1.
.11111111111111.
................`;
const boxOneHighlightSprite = bitmap`
................
.11111111111111.
.1CCCCCCCCCCCC1.
.1LLLLL66LLLLL1.
.1CCCC6CC6CCCC1.
.1CCCC6CC6CCCC1.
.1LLLLL66LLLLL1.
.1CCCCC6CCCCCC1.
.1CCCCC6CCCCCC1.
.1LLLLL666LLLL1.
.1CCCCC6CCCCCC1.
.1CCCCC6CCCCCC1.
.1LLLLLL66LLLL1.
.1CCCCCCCCCCCC1.
.11111111111111.
................`;
const boxTwoHighlightSprite = bitmap`
................
.11111111111111.
.1CCCCCCCCCCCC1.
.1LLLLL77LLLLL1.
.1CCCC7CC7CCCC1.
.1CCCC7CC7CCCC1.
.1LLLLL77LLLLL1.
.1CCCCC7CCCCCC1.
.1CCCCC7CCCCCC1.
.1LLLLL777LLLL1.
.1CCCCC7CCCCCC1.
.1CCCCC7CCCCCC1.
.1LLLLLL77LLLL1.
.1CCCCCCCCCCCC1.
.11111111111111.
................`;
const boxThreeHighlightSprite = bitmap`
................
.11111111111111.
.1CCCCCCCCCCCC1.
.1LLLLL99LLLLL1.
.1CCCC9CC9CCCC1.
.1CCCC9CC9CCCC1.
.1LLLLL99LLLLL1.
.1CCCCC9CCCCCC1.
.1CCCCC9CCCCCC1.
.1LLLLL999LLLL1.
.1CCCCC9CCCCCC1.
.1CCCCC9CCCCCC1.
.1LLLLLL99LLLL1.
.1CCCCCCCCCCCC1.
.11111111111111.
................`;

// Menu Sounds
const errorSFX = tune`
60: C4^60,
60: C4~60,
60,
60: C4^60,
60: C4~60,
1620`;
const menuSFX = tune`
333.3333333333333: C4~333.3333333333333,
10333.333333333332`;
const clickSFX = tune`
60: C4~60 + D4~60,
1860`;

// Game Sounds
const keyFoundSFX = tune`
50: F5^50,
50: G5^50,
50: G5^50,
50: G5^50,
1400`;
const stepSFX = tune`
100: C4~100 + D4^100,
3100`;
const unlockSFX = tune`
100: D4-100,
100: C4-100,
3000`;
const nextMapSFX = tune`
100: B4~100 + A4^100,
100: B4~100 + G4^100,
100: B4~100 + A4^100,
2900`;
const flashSFX = tune`
37.5: B5^37.5,
37.5: B5^37.5,
37.5: B5^37.5,
37.5: B5^37.5,
1050`;
const dingSFX = tune`
100: B5/100 + A5/100,
100: A5/100,
3000`;

// Music
const stemDefault = tune`
16000`;
const menuOneStem = tune`
250: D4~250,
250: E4~250,
250: D4~250,
250: E4~250,
250: D4~250,
250: E4~250,
250: D4~250,
250: E4~250,
250: D4~250,
250: E4~250,
250: D4~250,
250: E4~250,
250: D4~250,
250: E4~250,
250: D4~250,
250: E4~250,
250: C4~250,
250: D4~250,
250: C4~250,
250: D4~250,
250: C4~250,
250: D4~250,
250: C4~250,
250: D4~250,
250: C4~250,
250: D4~250,
250: C4~250,
250: D4~250,
250: C4~250,
250: D4~250,
250: C4~250,
250: D4~250`;
const menuTwoStem = tune`
500: B4~500,
500: B4~500,
500: A4~500,
500: C5~500,
500: G4~500,
500: D5~500,
500: F4~500,
500,
500: B4~500,
500: B4~500,
500: A4~500,
500: C5~500,
500: G4~500,
500: D5~500,
500: F4~500,
500,
500: B4~500,
500: B4~500,
500: A4~500,
500: C5~500,
500: G4~500,
500: D5~500,
500: F4~500,
500,
500: B4~500,
500: B4~500,
1000,
500: B4~500,
500: B4~500,
1000`;
const menuThreeStem = tune`
500: B4^500,
500: B4^500,
1000,
500: B4^500,
500: B4^500,
1000,
500: B4^500,
500: B4^500,
500: A4^500,
500: C5^500,
500: G4^500,
500: D5^500,
500: F4^500,
500,
500: B4^500,
500: B4^500,
500: A4^500,
500: C5^500,
500: G4^500,
500: D5^500,
500: F4^500,
500,
500: B4^500,
500: B4^500,
500: A4^500,
500: C5^500,
500: G4^500,
500: D5^500,
500: F4^500,
500`;
const menuFourStem = tune`
250: E4^250,
250,
250: D4^250,
250,
250: C4^250,
250: C4^250,
250: C4^250,
250,
250: C4^250,
250: D4^250,
250: C4^250,
250: D4^250,
250: C4^250,
750,
250: E4^250,
250,
250: D4^250,
250,
250: C4^250,
250: C4^250,
250: C4^250,
250,
250: C4^250,
250: D4^250,
250: C4^250,
250: D4^250,
250: C4^250,
750`;
const endSong = tune`
250: D5^250,
250: D5^250,
250,
250: B4^250,
250: C4~250,
250: B4^250,
250: C4~250,
250: B4^250,
250,
250: D5^250,
250: D5^250,
250,
250: B4^250,
250,
250: B4^250,
250,
250: B4^250,
250,
250: B4~250,
250: C5~250,
250: B4~250,
250: C5~250,
250,
250: D5~250,
250: D5~250,
250: D5~250,
250: G4~250,
250: G4~250,
250: G4~250,
750`;

// Main Menu Text
let currentLevelText;
let titleText = `
  Black
  
Labyrinth`;
let mainMenuOptions = `
  Start Game
  ----------
  
  Guide
  -----`;
let backButton = `
Back
----`;
// Guide Text
let menuGuide = `Press   
to activate`;

// Controls Text
let upLGuide = `Moves player
upward`;
let leftLGuide = `Moves player to 
the left`;
let downLGuide = `Moves player 
downward`;
let rightLGuide = `Moves player to 
the right`;
let upRGuide = `Flashes the map
in-game`;
let leftRGuide = `Mutes menu music.
Returns to menu
in-game (Progress
is saved)`;
let downRGuide = `Back button in
the menu, lazy key
picker in game`;
let rightRGuide = `Confirm menu
selection, used to
interact in-game`;

// Tip Text
let tipOneGuide = `Look across levels
to find the key
for the doors`;

let tipTwoGuide = `Checking a box
scans left, right,
up and down.`;

let tipThreeGuide = `Lost?
Use the   button
to see farther
around the player`;

let tipFourGuide = `Stuck?
Use the   button
to cycle through
the keys you need`;

let tipFiveGuide = `Try to complete
the game without
these assists ;)`;

// Game Text
let keyFoundText = `
You found a 
       key`;
let keyNeededText = `
You need a 
       key`;
let keyOneText = `yellow`;
let keyTwoText = `blue`;
let keyThreeText = `orange`;
let boxEmptyText = `
There's nothing in
the box`;

// Credits
let farewellText = `
Thanks for
 playing!`;

let noAssistText = `
You finished the
  game without
using assists :O`;

// Configurable Variables
let defaultSolids = [
  player,
  wall,
  doorOne,
  doorTwo,
  doorThree,
  box,
  boxKeyOne,
  boxKeyTwo,
  boxKeyThree,
]; // List of solid blocks
let mapLevels = [2, 4, 7, 8, 10, 11, 13, 15, 16, 19, 21, 22]; // List of levels that are the beginning of a map
let lightRange = 3; // The default distance a light can reach, for displaySpritesInRange()
let playerRange = 3; // The default distance the player can see, for displaySpritesInRange()
let flashBrightness = 10; // How far the player can see when using mapFlash()
let toastDelay = 3000; // How long a toast lasts
let shortToastDelay = 1500; // How long a short toast lasts
let textHeightOffset = 4; // How high toast texts should appear
let mapHeightOffset = 1; // How high map name toast texts should appear
let isMusicMuted = false; // The default option wether to play main menu music or not
let spawnX = 1; // Default X value used to spawn player on start, tells where to spawn player in spawn()
let spawnY = 1; // Default Y value used to spawn player on start, tells where to spawn player in spawn()

// Music Variables
let stemOne; // Used to set playback of stem one
let stemTwo; // Used to set playback of stem two
let stemThree; // Used to set playback of stem three
let stemFour; // Used to set playback of stem four
let musicTimeouts = [0, 1, 2, 3, 4, 5, 6]; // Used to set the timeout of each phase

// Background Game Variables
let gameState; // Stores the current game state (menu, game, pause, end) used for certain functions
let pointerOption = 0; // Stores which option is currently selected
let currentPointer; // Stores which texture the pointer is using
let currentMuteIcon = unmutedSprite; // Stores which texture the mute icon is using
let backButtonState = "2"; // Stores the state of the back button in the guide (1: Inactive, 2: Active)
let pingError; // Notifies errorPing() if an error occured (reduces error spam)
let allSprites; // Stores all blocks inside a level
let currentPlayerCoord; // Stores player's last position. Used in stepPing()
let keyFound; // Stores if a key was found. Used to feature key while gameState paused, for setSprites()
let textHeight; // Stores which height toast texts appear
let flashingMap; // Stores if the player pressed the map flash button, used to adjust player texture
let mapIndex = 0; // Stores the current map number
let lastDisplayed; // Stores the last displayed map name
let usedAssist; // Stores if the player ever used the assists (flash map and key magic)
let toastTimeout; // Stores the timeout used for toast text clear

// In-Game Variables
let widthX; // Stores actual map width (Stored on spawn)
let level = 1; // 0 for Guide; 1 for Main Menu
let lastLevel = 1; // Tracks level before mainMenu to allow accessing the main menu whilst in game
let currentKey; // Used to track which key the player is holding
let currentPlayer = playerSprite; // Used to track which player sprite to show (based on key)
let solidSprites = defaultSolids; //  Stores which blocks are currently solid

// Loops
let pointerChangeInterval; // Loop used to change the pointer icon in the main menu
let flickerLightsInterval; // Loop used to dynamically change the lantern range

// Initialize the music player and start the main menu
musicPlayer("startup");
mainMenu();

// Controls
onInput("w", () => {
  if (gameState == "menu") {
    pointerUp();
  } else if (gameState == "game" || gameState == "toast") {
    getFirst(player).y--;
  }
});

onInput("s", () => {
  if (gameState == "menu") {
    pointerDown();
  } else if (gameState == "game" || gameState == "toast") {
    getFirst(player).y++;
  }
});

onInput("a", () => {
  if (gameState == "menu") {
    pointerUp();
  } else if (gameState == "game" || gameState == "toast") {
    if (getFirst(player).x == 0) {
      // Check if at left border and move to last map
      levelCheck("down");
    }
    if (getFirst(player)) {
      getFirst(player).x--;
    }
  }
});

onInput("d", () => {
  if (gameState == "menu") {
    pointerDown();
  } else if (gameState == "game" || gameState == "toast") {
    if (getFirst(player).x == widthX) {
      // Check if at right border and move to next map
      levelCheck("up");
    }
    if (getFirst(player)) {
      getFirst(player).x++;
    }
  }
});

onInput("i", () => {
  if (gameState == "game" || gameState == "toast") {
    mapFlash();
  }
});

onInput("k", () => {
  if (gameState == "menu") {
    pointerContinue("k");
    pointerBack();
  } else if (gameState == "game" || gameState == "toast") {
    usedAssist = true;
    if (currentKey == 1) {
      currentKey = 2;
      playerInit();
    } else if (currentKey == 2) {
      currentKey = 3;
      playerInit();
    } else if (currentKey == 3) {
      currentKey = 0;
      playerInit();
    } else {
      currentKey = 1;
      playerInit();
    }
  }
});

onInput("j", () => {
  if (gameState == "menu") {
    if (isMusicMuted) {
      isMusicMuted = false;
      musicPlayer("menu");
      muteIconChange();
    } else if (!isMusicMuted) {
      isMusicMuted = true;
      musicPlayer("stop");
      muteIconChange();
    }
  } else if (gameState == "game") {
    lastLevel = level; // Remember the level before opening the main menu
    mainMenu();
  }
});

onInput("l", () => {
  if (gameState == "menu") {
    pointerContinue();
  } else if (gameState == "game" || gameState == "toast") {
    itemInteract();
  }
});

afterInput(() => {
  if (gameState == "game" || gameState == "toast") {
    stepPing(); // Check if player coordinates moved
    displaySpritesInRange(); // Updates the visible blocks when moving
    spawnX = getFirst(player).x; // Save player coordinates
    spawnY = getFirst(player).y; // Save player coordinates
  }
});

// Menu Code (Derived from Up, Down, Top-down)
// Sets up the main menu
function mainMenu() {
  pointerX = 3;
  pointerY = 8;
  gameState = "menu";
  menuMode = 1;
  pointerOption = 0;
  updateGameIntervals();
  musicPlayer("menu");

  // Check for current level
  if (level != 0 && level < 2) {
    // Check if game hasn't started yet and is not from the guide then set default level
    lastLevel = 2;
  }

  currentLevelText = `Current level: ${lastLevel - 1}`;
  clearText();
  setSprites();
  level = 1;
  setMap(levels[level]);
  setBackground(background);
  pointerChange(); // Trigger pointer spawning in advance (Rather than wait for interval)

  addText(titleText, { x: 5, y: 1, color: color`2` });
  addText(mainMenuOptions, { x: 3, y: 7, color: color`2` });
  addText(currentLevelText, { x: 2, y: 15, color: color`1` });
}

// Sets up the guide
function guideScreen() {
  gameState = "menu";
  menuMode = 2;
  updateGameIntervals();
  setSprites();
  clearText();
  level = 0;
  setMap(levels[level]);
  setBackground(background);
  addBack();
  addText(menuGuide, { x: 1, y: 12, color: color`1` });
}

// Clears text and adds the back button
function addBack() {
  clearText();
  addText(backButton, {
    x: 2,
    y: 0,
    color: backButtonState,
  });
}

// Handles pointer blinking and spawning
function pointerChange() {
  if (menuMode == 1) {
    // Point to selected
    if (currentPointer == arrow) {
      clearTile(pointerX, pointerY);
      addSprite(pointerX, pointerY, buttonL);
    } else {
      clearTile(pointerX, pointerY);
      addSprite(pointerX, pointerY, arrow);
    }
    currentPointer = getTile(pointerX, pointerY)[0].type;
  }
}

// Handles mute icon
function muteIconChange() {
  // Mute icon check
  if (isMusicMuted) {
    currentMuteIcon = mutedSprite;
    setSprites();
  } else if (!isMusicMuted) {
    currentMuteIcon = unmutedSprite;
    setSprites();
  }
}

// Handles pointer selection in guide on-demand
function pointerUpdate() {
  clearTile(9, 12); // Resets the button Sprite spawned by tip guide 2 & 3
  if (pointerOption == 1) {
    if (getTile(6, 12) !== undefined) {
      clearTile(6, 12);
    }
    updateSprite(buttonW);
  } else if (pointerOption == 2) {
    updateSprite(buttonA);
  } else if (pointerOption == 3) {
    updateSprite(buttonS);
  } else if (pointerOption == 4) {
    updateSprite(buttonD);
  } else if (pointerOption == 5) {
    updateSprite(buttonI);
  } else if (pointerOption == 6) {
    updateSprite(buttonJ);
  } else if (pointerOption == 7) {
    updateSprite(buttonK);
  } else if (pointerOption == 8) {
    updateSprite(buttonL);
  } else if (pointerOption == 9) {
    updateSprite(tipBoxOne);
  } else if (pointerOption == 10) {
    updateSprite(tipBoxTwo);
  } else if (pointerOption == 11) {
    updateSprite(tipBoxThree);
  } else if (pointerOption == 12) {
    updateSprite(tipBoxFour);
  } else if (pointerOption == 13) {
    updateSprite(tipBoxFive);
  } else {
    pointerOption = 0;
    updateSprite();
  }
  // Change back button color
  if (pointerOption == 0) {
    backButtonState = color`2`;
    addBack();
  } else {
    backButtonState = color`1`;
    addBack();
  }
}

// Handles pointer movement (downwards)
function pointerDown() {
  if (menuMode == 1) {
    if (pointerOption == 0) {
      clearTile(pointerX, pointerY);
      pointerY += 3;
      pointerOption++;
      pointerChange();
      playTune(menuSFX);
    } else {
      pingError = true;
    }
  } else if (menuMode == 2) {
    if (pointerOption < 13) {
      pointerOption++;
      pointerUpdate();
      playTune(menuSFX);
    } else {
      pingError = true;
    }
  }
}

// Handles pointer movement (upwards)
function pointerUp() {
  if (menuMode == 1) {
    if (pointerOption == 1) {
      clearTile(pointerX, pointerY);
      pointerY -= 3;
      pointerOption--;
      pointerChange();
      playTune(menuSFX);
    } else {
      pingError = true;
    }
  } else if (menuMode == 2) {
    if (pointerOption > 0) {
      pointerOption--;
      pointerUpdate();
      playTune(menuSFX);
    } else {
      pingError = true;
    }
  }
}

// Allows pointer to jump back to the first option
function pointerBack() {
  if (menuMode == 1) {
    if (pointerOption == 1) {
      clearTile(pointerX, pointerY);
      pointerY -= 3;
      pointerOption = 0;
      pointerChange();
    }
  } else if (menuMode == 2) {
    if (pointerOption > 0) {
      pointerOption = 0;
      pointerUpdate();
    }
  }
}

// Handles pointer selection and runs/displays them accordingly
function pointerContinue(triggered) {
  if (menuMode == 1) {
    // Main Menu
    if (triggered == "k") {
      // Check if triggered by back button
      if (pointerOption == 0) {
        pingError = true;
      }
    } else if (pointerOption == 0) {
      // Start the Game
      playTune(clickSFX);
      initializeGame();
    } else if (pointerOption == 1) {
      // Go to Guide
      playTune(clickSFX);
      pointerOption = 0; // Return to first option
      guideScreen();
    }
  } else if (menuMode == 2) {
    // Guide
    if (triggered == "k") {
      // Check if triggered by back button
      if (pointerOption == 0) {
        playTune(clickSFX);
        mainMenu();
      }
    } else if (pointerOption == 0) {
      playTune(clickSFX);
      pointerOption = 0; // Return to first option
      mainMenu();
    } else if (pointerOption > 0) {
      playTune(clickSFX);
      guideText();
    }
  }
}

// Update current selected item Sprite to highlight in the guid
function updateSprite(activeOption) {
  if (pointerOption == 0) {
    buttonActive = "g"; // Reset buttonActive and activeOption when switching back
    tipBoxActive = "l"; // Reset tipBoxActive and activeOption when switching back
  } else if (pointerOption > 0 && pointerOption < 9) {
    tipBoxActive = "l"; // Reset tipBoxActive and activeOption when switching back
    buttonActive = activeOption;
  } else if (pointerOption > 8 && pointerOption < 14) {
    buttonActive = "g"; // Reset buttonActive and activeOption when switching back
    tipBoxActive = activeOption;
  }
  setSprites();
}

// Handles displaying guide text
function guideText() {
  addBack();
  if (pointerOption == 1) {
    addText(upLGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 2) {
    addText(leftLGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 3) {
    addText(downLGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 4) {
    addText(rightLGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 5) {
    addText(upRGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 6) {
    addText(leftRGuide, { x: 1, y: 11, color: color`2` });
  } else if (pointerOption == 7) {
    addText(downRGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 8) {
    addText(rightRGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 9) {
    addText(tipOneGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 10) {
    addText(tipTwoGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 11) {
    addSprite(9, 12, buttonI);
    addText(tipThreeGuide, { x: 1, y: 11, color: color`2` });
  } else if (pointerOption == 12) {
    addSprite(9, 12, buttonK);
    addText(tipFourGuide, { x: 1, y: 11, color: color`2` });
  } else if (pointerOption == 13) {
    addSprite(9, 12, buttonI);
    addText(tipFiveGuide, { x: 1, y: 12, color: color`2` });
  }
}

// Setup the game
function initializeGame() {
  level = lastLevel; // Restore lastLevel if applicable
  setBackground(background);
  musicPlayer("stop");
  spawn(); // Start Game
}

// Spawn Code
function spawn() {
  gameState = "pause";
  playerInit();
  updateGameIntervals();
  clearText(); // Cleans text before spawn
  setSolids(solidSprites);
  setMap(levels[level]);
  nextMapCheck();
  widthX = width() - 1; // Check map actual width
  textHeight = height() - textHeightOffset; // Sets toast text height
  addSprite(spawnX, spawnY, player);
  levelCheck("next");
  gameState = "game";
  playerInit();
  updateGameIntervals();
  allSprites = getAll(); // Grabs all sprites in the map and saves them.
  displaySpritesInRange(); // Make sure the player is in the map when this is runned
}

// Extends the players range of sight temporarily
function mapFlash() {
  usedAssist = true;
  playerRange = flashBrightness;
  gameState = "pause";
  flashingMap = 2;
  updateGameIntervals();
  displaySpritesInRange();
  playerInit();
  playTune(flashSFX);
  setTimeout(() => {
    // Reduce range after a period of time
    playerRange = flashBrightness / 2;
    flashingMap = 1;
    playerInit();
    displaySpritesInRange();
  }, 1000);
  setTimeout(() => {
    // Normalize range after a period of time
    playerRange = 3;
    gameState = "game";
    flashingMap = 0;
    updateGameIntervals();
    playerInit();
    displaySpritesInRange();
  }, 3000);
}

// Allows player to interact with all items at once
function itemInteract() {
  grabBox(); // Check if next to a box and if it has a key and grab it
  grabKey(); // Check if on a key and grab it
  unlockDoor(); // Check if next to a door and unlock it
  playerInit(); // Refreshes player sprite for every interaction
}

// Checks the boxes around the player for a key
function grabBox() {
  let playerCoord = getFirst(player);
  let surroundingTiles = [
    getTile(playerCoord.x, playerCoord.y + 1)[0], // Tile below player
    getTile(playerCoord.x, playerCoord.y - 1)[0], // Tile above player
    getTile(playerCoord.x + 1, playerCoord.y)[0], // Tile to the right of player
    getTile(playerCoord.x - 1, playerCoord.y)[0], // Tile to the left of playerd
  ];
  let boxOneFound = surroundingTiles.some((tile) => tile && tile.type == boxKeyOne);
  let boxTwoFound = surroundingTiles.some((tile) => tile && tile.type == boxKeyTwo);
  let boxThreeFound = surroundingTiles.some((tile) => tile && tile.type == boxKeyThree);
  let boxFound = surroundingTiles.some((tile) => tile && tile.type == box);

  if (boxOneFound) {
    currentKey = 1;
    keyFound = true;
    gameState = "toast";
    clearTimeout(toastTimeout);
    updateGameIntervals();
    playTune(keyFoundSFX);
    clearText();
    addText(keyFoundText, { x: 1, y: textHeight, color: color`2` });
    addText(keyOneText, { x: 1, y: textHeight + 2, color: color`6` });
    toastTimeout = setTimeout(toastTextClear, toastDelay);
  } else if (boxTwoFound) {
    currentKey = 2;
    keyFound = true;
    gameState = "toast";
    clearTimeout(toastTimeout);
    updateGameIntervals();
    playTune(keyFoundSFX);
    clearText();
    addText(keyFoundText, { x: 1, y: textHeight, color: color`2` });
    addText(keyTwoText, { x: 1, y: textHeight + 2, color: color`7` });
    toastTimeout = setTimeout(toastTextClear, toastDelay);
  } else if (boxThreeFound) {
    currentKey = 3;
    keyFound = true;
    gameState = "toast";
    clearTimeout(toastTimeout);
    updateGameIntervals();
    playTune(keyFoundSFX);
    clearText();
    addText(keyFoundText, { x: 1, y: textHeight, color: color`2` });
    addText(keyThreeText, { x: 1, y: textHeight + 2, color: color`9` });
    toastTimeout = setTimeout(toastTextClear, toastDelay);
  } else if (boxFound) {
    gameState = "toast";
    clearTimeout(toastTimeout);
    updateGameIntervals();
    playTune(keyFoundSFX);
    clearText();
    addText(boxEmptyText, { x: 1, y: textHeight, color: color`2` });
    toastTimeout = setTimeout(toastTextClear, shortToastDelay);
  }
}

// Checks around the player for a key
function grabKey() {
  let playerCoord = getFirst(player);
  let keyOneCoord = getFirst(keyOne);
  let keyTwoCoord = getFirst(keyTwo);
  let keyThreeCoord = getFirst(keyThree);

  if (
    keyOneCoord &&
    playerCoord.x == keyOneCoord.x &&
    playerCoord.y == keyOneCoord.y
  ) {
    // Player and key are on the same tile
    currentKey = 1;
    keyFound = true;
    gameState = "toast";
    clearTimeout(toastTimeout);
    updateGameIntervals();
    playTune(keyFoundSFX);
    clearText();
    addText(keyFoundText, { x: 1, y: textHeight, color: color`2` });
    addText(keyOneText, { x: 1, y: textHeight + 2, color: color`6` });
    toastTimeout = setTimeout(toastTextClear, toastDelay);
  } else if (
    keyTwoCoord &&
    playerCoord.x == keyTwoCoord.x &&
    playerCoord.y == keyTwoCoord.y
  ) {
    // Player and key are on the same tile
    currentKey = 2;
    keyFound = true;
    gameState = "toast";
    clearTimeout(toastTimeout);
    updateGameIntervals();
    playTune(keyFoundSFX);
    clearText();
    addText(keyFoundText, { x: 1, y: textHeight, color: color`2` });
    addText(keyTwoText, { x: 1, y: textHeight + 2, color: color`7` });
    toastTimeout = setTimeout(toastTextClear, toastDelay);
  } else if (
    keyThreeCoord &&
    playerCoord.x == keyThreeCoord.x &&
    playerCoord.y == keyThreeCoord.y
  ) {
    // Player and key are on the same tile
    currentKey = 3;
    keyFound = true;
    gameState = "toast";
    clearTimeout(toastTimeout);
    updateGameIntervals();
    playTune(keyFoundSFX);
    clearText();
    addText(keyFoundText, { x: 1, y: textHeight, color: color`2` });
    addText(keyThreeText, { x: 1, y: textHeight + 2, color: color`9` });
    toastTimeout = setTimeout(toastTextClear, toastDelay);
  }
}

// Checks around the player for a door and if the player can open it
function unlockDoor() {
  let playerCoord = getFirst(player);
  let surroundingTiles = [
    getTile(playerCoord.x, playerCoord.y + 1)[0], // Tile below player
    getTile(playerCoord.x, playerCoord.y - 1)[0], // Tile above player
    getTile(playerCoord.x + 1, playerCoord.y)[0], // Tile to the right of player
    getTile(playerCoord.x - 1, playerCoord.y)[0], // Tile to the left of playerd
  ];
  let doorOneFound = surroundingTiles.some(
    (tile) => tile && tile.type == doorOne,
  );
  let doorTwoFound = surroundingTiles.some(
    (tile) => tile && tile.type == doorTwo,
  );
  let doorThreeFound = surroundingTiles.some(
    (tile) => tile && tile.type == doorThree,
  );

  if (doorOneFound && solidSprites.includes(doorOne) && currentKey == 1) {
    // Checks if player has key 1
    solidSprites = solidSprites.filter((item) => item != doorOne);
    currentKey = 0;
    setSolids(solidSprites);
    playTune(unlockSFX);
    return;
  } else if (doorOneFound && solidSprites.includes(doorOne)) {
    // Checks if the door is locked
    gameState = "toast";
    clearTimeout(toastTimeout);
    updateGameIntervals();
    clearText();
    addText(keyNeededText, { x: 1, y: textHeight, color: color`2` });
    addText(keyOneText, { x: 1, y: textHeight + 2, color: color`6` });
    toastTimeout = setTimeout(toastTextClear, shortToastDelay);
    return;
  } else if (
    doorTwoFound &&
    solidSprites.includes(doorTwo) &&
    currentKey == 2
  ) {
    // Checks if player has key 2
    solidSprites = solidSprites.filter((item) => item != doorTwo);
    currentKey = 0;
    setSolids(solidSprites);
    playTune(unlockSFX);
    return;
  } else if (doorTwoFound && solidSprites.includes(doorTwo)) {
    // Checks if the door is locked
    gameState = "toast";
    clearTimeout(toastTimeout);
    updateGameIntervals();
    clearText();
    addText(keyNeededText, { x: 1, y: textHeight, color: color`2` });
    addText(keyTwoText, { x: 1, y: textHeight + 2, color: color`7` });
    toastTimeout = setTimeout(toastTextClear, shortToastDelay);
    return;
  } else if (
    doorThreeFound &&
    solidSprites.includes(doorThree) &&
    currentKey == 3
  ) {
    // Checks if player has key 3
    solidSprites = solidSprites.filter((item) => item != doorThree);
    currentKey = 0;
    setSolids(solidSprites);
    playTune(unlockSFX);
    return;
  } else if (doorThreeFound && solidSprites.includes(doorThree)) {
    // Checks if the door is locked
    gameState = "toast";
    clearTimeout(toastTimeout);
    updateGameIntervals();
    clearText();
    addText(keyNeededText, { x: 1, y: textHeight, color: color`2` });
    addText(keyThreeText, { x: 1, y: textHeight + 2, color: color`9` });
    toastTimeout = setTimeout(toastTextClear, shortToastDelay);
    return;
  }
}

// Clears toast text
function toastTextClear() {
  clearText();
  keyFound = false;
  gameState = "game";
  updateGameIntervals();
  playerInit();
}

// Checks if the current level is a different map
function nextMapCheck() {
  textHeight = height() - mapHeightOffset;
  if (mapLevels.includes(level) && lastDisplayed != level) {
    // Check if the current level is the beginning of a map and if the current level hasn't been displayed yet
    gameState = "toast";
    clearTimeout(toastTimeout);
    updateGameIntervals();
    addText(nextMapText(), { y: textHeight, color: color`2` });
    toastTimeout = setTimeout(toastTextClear, toastDelay);
  }
}

// Returns the map name
function nextMapText() {
  if (mapIndex < mapNames.length && level != lastDisplayed) {
    // Check if mapIndex is at the end and if the current level hasn't been displayed yet
    lastDisplayed = level;
    return mapNames[mapIndex++];
  } else {
    // Reset mapIndex
    mapIndex = 0;
    return mapNames[mapIndex++];
  }
}

// Checks current level and acts based on it
function levelCheck(move) {
  gameState = "pause";
  playerY = getFirst(player).y;
  if (level == levels.length - 2) {
    // If current level is the level right before the end
    if (move == "up") {
      // If moving to the right, trigger the end screen
      level++;
      endScreen();
    } else if (move == "down") {
      // If moving to the left, go back a level
      playerY = getFirst(player).y;
      spawnX = widthX;
      spawnY = playerY;
      lastLevel = level;
      level--;
      spawn();
    }
  } else if (level < levels.length - 2) {
    // If current level is not the level right before the end
    if (move == "up") {
      // If moving to the right, go up a level
      playerY = getFirst(player).y;
      spawnX = 0;
      spawnY = playerY;
      lastLevel = level;
      level++;
      spawn();
    } else if (move == "down") {
      // If moving to the left, go back a level
      playerY = getFirst(player).y;
      spawnX = widthX;
      spawnY = playerY;
      lastLevel = level;
      level--;
      spawn();
    }
    if (mapLevels.includes(level) && level > lastLevel && move == "next") {
      // If current level is the beginning of a new map and is higher than the last level
      currentKey = 0; // Make sure the player does not bring over a key
      solidSprites = defaultSolids; // Reset solid sprites to default, lock all the doors
      playerInit();
      setSolids(solidSprites);
      playTune(nextMapSFX);
    }
  }
}

// Hide blocks far away from a light source or the player
function displaySpritesInRange() {
  // Filter out the player sprite and wallLantern from allSprites
  const otherSprites = allSprites.filter(
    (sprite) => sprite.type != player && sprite.type != hangingLantern,
  );

  // Get the player's coordinates
  let playerCoord = getFirst(player);
  let playerX = playerCoord.x;
  let playerY = playerCoord.y;

  // Return all blocks to level
  for (let allSprite of otherSprites) {
    let spriteX = allSprite.x;
    let spriteY = allSprite.y;
    addSprite(spriteX, spriteY, allSprite.type);
  }

  // Loop for each block
  for (let allSprite of otherSprites) {
    let spriteX = allSprite.x;
    let spriteY = allSprite.y;

    // Calculate the distance between the block and the player
    const distancePlayer = Math.abs(spriteX - playerX) + Math.abs(spriteY - playerY);

    // Check if the block is outside the specified range around the player
    if (distancePlayer >= playerRange) {
      if (getTile(spriteX, spriteY)) {
        // If block exceeds the range, remove it from the game
        clearTile(spriteX, spriteY);
      }
    }

    // Check if the block is within the specified range around the hanging lantern
    if (getFirst(hangingLantern)) {
      // Check if there is a hanging lantern in the map
      let lanternAmount = getAll(hangingLantern).length;
      for (let i = 0; i < lanternAmount; i++) {
        // Loop for each lantern
        let lanternCoord = getAll(hangingLantern)[i];
        let lanternX = lanternCoord.x;
        let lanternY = lanternCoord.y;

        // Calculate the distance between the block and the lantern
        const distanceLantern = Math.abs(spriteX - lanternX) + Math.abs(spriteY - lanternY);

        // Check if the block is within the specified range around the hanging lantern
        if (distanceLantern <= lightRange) {
          // If block is within range, add it to the game
          addSprite(spriteX, spriteY, allSprite.type);
        }
      }
    }
  }
}

// Randomizes hanging lantern's light range
function flickerLights() {
  let randomness = Math.random();
  if (randomness < 0.2) {
    lightRange = 2;
  } else if (randomness > 0.8) {
    lightRange = 4;
  } else {
    lightRange = 3;
  }
  displaySpritesInRange(); // Update lantern range
}

// Initializes player texture
function playerInit() {
  if (flashingMap == 1) {
    currentPlayer = playerWeakBrightSprite;
  } else if (flashingMap == 2) {
    currentPlayer = playerBrightSprite;
  } else if (currentKey == 1) {
    currentPlayer = playerWithKeyOneSprite;
  } else if (currentKey == 2) {
    currentPlayer = playerWithKeyTwoSprite;
  } else if (currentKey == 3) {
    currentPlayer = playerWithKeyThreeSprite;
  } else {
    currentPlayer = playerSprite;
  }
  setSprites();
}

// Plays out the end screen
function endScreen() {
  // Initialize
  gameState = "end";
  updateGameIntervals();
  setSprites();
  setMap(levels[level]);
  addSprite(0, 14, player);
  const playback = playTune(endSong, Infinity);

  // Movement
  setTimeout(moveRight, 500);
  setTimeout(moveRight, 1000);
  setTimeout(moveRight, 1500);
  setTimeout(moveRight, 2000);
  setTimeout(moveRight, 2500);
  setTimeout(moveRight, 3000);
  setTimeout(moveRight, 3500);
  setTimeout(moveRight, 4000);

  // Text
  addText(titleText, { x: 5, y: 0, color: color`2` });

  setTimeout(() => {
    clearText();
    addText(titleText, { x: 5, y: 0, color: color`1` });
    addText(farewellText, { x: 5, y: 6, color: color`2` });
  }, 5000);

  if (usedAssist != true) {
    setTimeout(() => {
      clearText();
      addText(titleText, { x: 5, y: 0, color: color`1` });
      addText(farewellText, { x: 5, y: 4, color: color`1` });
      addText(noAssistText, { x: 2, y: 7, color: color`6` });
      playTune(dingSFX);
    }, 8000);
  }

  // Cleanup
  setTimeout(() => {
    playback.end();
    level = 1;
    spawnX = 1;
    spawnY = 1;
    solidSprites = defaultSolids;
  }, 15000);

  // Exit
  setTimeout(mainMenu, 18000);
}

// Moves player to the right and plays the accompanying sound effect
function moveRight() {
  getFirst(player).x++;
  playTune(stepSFX);
}

// Returns the correct box sprite when a key in a box is found
function boxSpriteCheck(boxKey) {
  if (boxKey == 1 && currentKey == 1) {
    return boxOneHighlightSprite;
  } else if (boxKey == 2 && currentKey == 2) {
    return boxTwoHighlightSprite;
  } else if (boxKey == 3 && currentKey == 3) {
    return boxThreeHighlightSprite;
  } else {
    return boxSprite;
  }
}

// Updates every sprite's texture
function setSprites() {
  // This function loads the required Sprites for each gameState and menuMode
  if (gameState == "menu") {
    // If at the Menu
    if (menuMode == 1) {
      // If at the Main Menu
      setLegend(
        [background, backgroundSprite],
        [wall, wallSprite],
        [lightPost, lightPostSprite],
        [lightLantern, lightLanternSprite],
        [arrow, arrowSprite],
        [buttonL, buttonLSprite],
        [muteIcon, currentMuteIcon],
      );
    } else if (menuMode == 2) {
      // If at the Guide
      setLegend(
        [background, backgroundSprite],
        [wall, wallSprite],
        [buttonW, buttonWInactiveSprite],
        [buttonA, buttonAInactiveSprite],
        [buttonS, buttonSInactiveSprite],
        [buttonD, buttonDInactiveSprite],
        [buttonI, buttonIInactiveSprite],
        [buttonJ, buttonJInactiveSprite],
        [buttonK, buttonKInactiveSprite],
        [buttonL, buttonLInactiveSprite],
        [buttonActive, buttonHighlightSprite],
        [tipBoxOne, tipBoxSprite],
        [tipBoxTwo, tipBoxSprite],
        [tipBoxThree, tipBoxSprite],
        [tipBoxFour, tipBoxSprite],
        [tipBoxFive, tipBoxSprite],
        [tipBoxActive, tipHighlightSprite],
        [player, currentPlayer],
        [keyOne, keyOneSprite],
        [box, boxSprite],
      );
    }
  } else if (gameState == "game" || gameState == "toast" || gameState == "pause") {
    // If In-Game
    if (keyFound) {
      // If a key is found
      setLegend(
        [background, backgroundSprite],
        [wall, wallSprite],
        [fenceWall, fenceWallSprite],
        [hangingLantern, hangingLanternSprite],
        [player, currentPlayer],
        [keyOne, keyOneSprite],
        [keyTwo, keyTwoSprite],
        [keyThree, keyThreeSprite],
        [doorOne, doorOneSprite],
        [doorTwo, doorTwoSprite],
        [doorThree, doorThreeSprite],
        [box, boxSprite],
        [boxKeyOne, boxSpriteCheck(1)],
        [boxKeyTwo, boxSpriteCheck(2)],
        [boxKeyThree, boxSpriteCheck(3)],
      );
    } else {
      setLegend(
        [background, backgroundSprite],
        [wall, wallSprite],
        [fenceWall, fenceWallSprite],
        [hangingLantern, hangingLanternSprite],
        [player, currentPlayer],
        [keyOne, keyOneSprite],
        [keyTwo, keyTwoSprite],
        [keyThree, keyThreeSprite],
        [doorOne, doorOneSprite],
        [doorTwo, doorTwoSprite],
        [doorThree, doorThreeSprite],
        [box, boxSprite],
        [boxKeyOne, boxSprite],
        [boxKeyTwo, boxSprite],
        [boxKeyThree, boxSprite],
      );
    }
  } else if (gameState == "end") {
    // If at the end screen
    setLegend(
      [lightPost, lightPostSprite],
      [lightLantern, lightLanternSprite],
      [background, backgroundSprite],
      [wall, wallSprite],
      [fenceWall, fenceWallSprite],
      [hangingLantern, hangingLanternSprite],
      [player, playerSideSprite],
      [keyOne, keyOneSprite],
      [keyTwo, keyTwoSprite],
      [keyThree, keyThreeSprite],
      [doorOne, doorOneSprite],
      [doorTwo, doorTwoSprite],
      [doorThree, doorThreeSprite],
      [box, boxSprite],
      [boxKeyOne, boxSprite],
      [boxKeyTwo, boxSprite],
      [boxKeyThree, boxSprite],
    );
  }
}

// Music Player
function musicPlayer(mode) {
  if (mode == "startup") {
    // Initialize stems and stop them
    stemOne = playTune(stemDefault);
    stemTwo = playTune(stemDefault);
    stemThree = playTune(stemDefault);
    stemFour = playTune(stemDefault);
    stemOne.end();
    stemTwo.end();
    stemThree.end();
    stemFour.end();
  } else if (mode == "menu" && !isMusicMuted) {
    // Plays the song
    let isPlaying;
    if (!stemOne.isPlaying() && !stemFour.isPlaying()) {
      stemOne = playTune(menuOneStem, Infinity);
      musicTimeouts[0] = setTimeout(() => {
        stemTwo = playTune(menuTwoStem, Infinity);
      }, 16000);
      musicTimeouts[1] = setTimeout(() => {
        stemThree = playTune(menuThreeStem, Infinity);
      }, 28000);
      musicTimeouts[2] = setTimeout(() => {
        stemTwo.end();
      }, 32000);
      musicTimeouts[3] = setTimeout(() => {
        stemOne.end();
        stemFour = playTune(menuFourStem, Infinity);
      }, 48000);
      musicTimeouts[4] = setTimeout(() => {
        stemThree.end();
        stemFour.end();
        stemOne = playTune(menuOneStem, Infinity);
        stemTwo = playTune(menuTwoStem, Infinity);
      }, 64000);
      musicTimeouts[5] = setTimeout(() => {
        stemTwo.end();
      }, 80000);
      musicTimeouts[6] = setTimeout(() => {
        stemOne.end();
      }, 88000);
    }
  } else if (mode == "stop") {
    // Stops the song
    if (stemOne != undefined) {
      stemOne.end();
    }
    if (stemTwo != undefined) {
      stemTwo.end();
    }
    if (stemThree != undefined) {
      stemThree.end();
    }
    if (stemFour != undefined) {
      stemFour.end();
    }
    for (let i = 0; i < musicTimeouts.length; i++) {
      // Check if the timeout exists
      if (musicTimeouts[i]) {
        // Clear the timeout
        clearTimeout(musicTimeouts[i]);
      }
    }
  }
}

// Plays the error sound effect (every half a second)
function errorPing() {
  if (pingError == true) {
    // Check if an error occured
    playTune(errorSFX);
    pingError = false;
  }
}

// Plays the step effect
function stepPing() {
  currentPlayerCoord = getFirst(player); // Get the player coordinates
  if (currentPlayerCoord.dx != 0 || currentPlayerCoord.dy != 0) {
    // Check if the player moved
    playTune(stepSFX);
  }
}

// Refreshes game intervals
function updateGameIntervals() {
  errorPingInterval = setInterval(errorPing, 500); // Set interval for error sound being played
  if (gameState == "game" || gameState == "pause" || gameState == "toast") {
    // Clear any existing intervals
    clearInterval(pointerChangeInterval);
    clearInterval(flickerLightsInterval);

    flickerLightsInterval = setInterval(flickerLights, 1000); // Set interval for light flickering
  } else if (gameState == "menu") {
    // Clear any existing intervals
    clearInterval(pointerChangeInterval);
    clearInterval(flickerLightsInterval);

    pointerChangeInterval = setInterval(pointerChange, 1000); // Set interval for pointer sprite swap
  } else {
    // Clear intervals during unset state
    clearInterval(pointerChangeInterval);
    clearInterval(flickerLightsInterval);
  }
}
