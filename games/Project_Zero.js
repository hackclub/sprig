/*
@title: Project Zero
@author: Creeperlulu
@tags: ["arcade", "puzzle", "advanced"]
@addedOn: 2024-09-03
*/

// ----------INIT----------

// player
const player = "p"

const playerF = bitmap`
....LLLLLLLL.3..
...LLLL1111LL0..
...L111111LL0...
...1444004441...
...100000000L...
...L04000040L...
...L040000401...
...L000440001...
....L1111LL1....
...LLLL111LLL...
...LLL1106L11...
...11L1111111...
...1211L11L21...
....L11L1LLL....
.....L111L1.....
.....LL..11.....`
const playerB = bitmap`
..C.LLLLLLLL....
..0LL1111LLLL...
...LLL111111L...
...111100L111...
...L110440111...
...LL1044011L...
...LLL10011LL...
...11L11111LL...
....110000LL....
...L10202201L...
...110022001L...
...LL022020L1...
...1202022021...
....LL00001L....
.....1L111L.....
.....11..LL.....`
const playerR = bitmap`
......LLLL......
.....LL1111.....
.....11111L.....
....01LL1140....
....01LLL100....
....01LLL140....
....01LLL140....
.....11L1104....
......L1L1......
.....0L1L1L.....
.....0L1L1L.....
.....0L1LLL.....
.....0L2LL1.....
......1L1L......
.......1L.......
.......1L.......`
const playerL = bitmap`
......LLLL......
.....11LLLL.....
.....L11111.....
....041LLL10....
....001LLL10....
....041LLL10....
....0411LL10....
....4011111.....
......1L1L......
.....11L1L0.....
.....L1L110.....
.....1LL1L0.....
.....1LL2L0.....
......11L1......
.......1L.......
.......L1.......`
const playerDarkF = bitmap`
.............3..
................
................
....44400444....
....00000000....
....04000040....
....04000040....
....00044000....
................
................
.........6......
................
................
................
................
................`

//decoration
const labbench1 = "☺"
const labbench2 = "☻"
const labbench1t = bitmap`
1111111111111111
1222222222222222
1222222222222222
122222222227C722
172777722227C722
1272227222272722
12733C7222722272
127CC37222764472
12733372227FF472
1227772222277722
1222222222222222
1111111111111111
1111111111111111
LL..............
LL..............
LL..............`
const labbench2t = bitmap`
1111111111111111
2222222222LLLLL1
2111111111LLLLL1
2122222222552LL1
2177777777557LL1
2177777757577LL1
2177777757777121
2177777775577121
2177777777777121
2111111111111121
2222222222222221
1111111111111111
1111111111111111
..............LL
..............LL
..............LL`
const labbench3 = "♦"
const labbench4 = "♣"
const labbench3t = bitmap`
1111111111111111
1222222222222222
1222222222222222
1272722727227272
127C7CC7C7CC7C72
12CCCCCCCCCCCCC2
1279722747227672
1279722747227672
12C7CCCC7CCCC7C2
12CCCCCCCCCCCCC2
1222222222222222
1111111111111111
1111111111111111
LL..............
LL..............
LL..............`
const labbench4t = bitmap`
1111111111111111
2222222222LLLLL1
2111111111LLLLL1
2122222222222LL1
2122222222222LL1
21222222LL222LL1
2122222L0LL22121
2122222LL0L22121
21222222LL222121
2111111111111121
2222222222222221
1111111111111111
1111111111111111
..............LL
..............LL
..............LL`
const plant = "♥"
const plantt = bitmap`
.....4..........
.....44...4.....
......44.44.....
.DDDD.44444.DD..
DDDDDD4444DDDDD.
..DDDDD44DDDDDDD
....DDD4DDDDD..D
.....DDDDDD.....
....C0DDDD0C....
....CC0000CC....
....CCCCCCCC....
....CCCCCCCC....
.....CCCCCC.....
.....CCCCCC.....
......CCCC......
................`
const plant2 = "♠"
const plant2t = bitmap`
................
..D...4.........
..DD..44..444...
..DDD.444444....
...DDD44444.....
....DDD44DDD....
....DDD4DDDDDD..
.....DDDDDD.DDD.
....C0DDDD0C.DD.
....CC0000CC....
....CCCCCCCC....
....CCCCCCCC....
.....CCCCCC.....
.....CCCCCC.....
......CCCC......
................`
const pushplant = "♂"
const capsuleb = "•"
const capsulebt = bitmap`
.52277700011175.
.52777700111075.
.57777001110075.
.57770011100775.
.57770111007775.
.57771110077775.
.57721100077775.
.57221000077775.
.52227000077775.
1522770000077751
1527777000077751
L55777770007755L
7LL5555555555LL7
L77LLLLLLLLLL77L
.LL7777777777LL.
...LLLLLLLLLL...`
const capsulet = "◘"
const capsulett = bitmap`
....LLLLLLLL....
..LL11111111LL..
.L1111LLLL1111L.
L1111LLLLLL1111L
L1111LLLLLL1111L
LL1111LLLL1111LL
L7LL11111111LL7L
.L77LLLLLLLL77L.
.5LL77777777LL5.
.577LLLLLLLL775.
.57777222277775.
.57771111077775.
.57711110007775.
.57211100000725.
.52221000000225.
.52227000001225.`
const noteonlabbench = "○"
const noteonlabbencht = bitmap`
1111111111111111
1222200000002222
1222206666660222
1222206000060222
1222206666660222
1222206060060222
1222206666660222
1222206006060222
1222206666660222
1222220000000222
1222222222222222
1111111111111111
1111111111111111
LL..............
LL..............
LL..............`
const deadbot = "◙"
const deadbott = bitmap`
....1LL1........
...LLLLL1LL1....
...LLLL1LLLL1...
.3.1000011LL00..
..31000000001.0.
..7100000000L...
..710L000000L...
.7.1000000L0L...
....1LLL00006...
...LLLLL1LL.6...
...LL1LL00L.....
..LL1L11111.LL..
..L2LLLL11L21L1.
...1.1LL1LL1.121
...LLLLLL1L1L.LL
...LL......LL...`
const noteonwall = "♀"
const noteonwallt = bitmap`
1111111L11111111
1111111L11111111
1111111L11111111
LLLLLLLLLLLLLLLL
111L100001111111
111L106660000111
111L106666660111
LLLLL06006660LLL
1111066660060111
1111060066601111
1111066660601111
LLLL00006660LLLL
111111110000L111
111111111111L111
111111111111L111
LLLLLLLLLLLLLLLL`
const blacktile = "♪"
const flowers = "♫"
const flowerst = bitmap`
LLL7L7LLL3L3LLLL
LHCH6C8C8C6CCCCL
LC6C47C6C3439C9L
LHD545848C4CC6CL
LCDC6CC4CCCC9D9L
L9C9D5CC3C3CCDCL
LC6CD6C6C6C7C7CL
L949CC6C3D3C6CCL
LC4CC6D6CDC747CL
LC4CCCDCCCCC4CCL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
11............11
11............11
11............11`
const crops = "☼"
const cropst = bitmap`
LLLLL4LLLLLLLLLL
LCC444C44C44CCCL
LC4444C4C4444C4L
LC444CCCC444CC4L
LCC4CC44CC4CCCCL
LCCCCC44CCCCC44L
LC444C4CC44C44CL
LCC44CC4C44C44CL
LC44CC44C44C4CCL
LC4CCC4CCC4CCCCL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
11............11
11............11
11............11`
const salad = "►"
const saladt = bitmap`
LLLLLLLLLLLLLLLL
LCCCCCCCCCCCCCCL
LCCCCCCCDDCCDCCL
LCDDCCCDDDCDDDCL
LCDDDCD4DCD4DDCL
LCC44CD4DD4DDCCL
LCCD44D4444DCCCL
LCCDD44DDDDDCCCL
LCCCCDDDDDCCCCCL
LCCCCCCCCCCCCCCL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
11............11
11............11
11............11`
const tulips = "◄"
const tulipst = bitmap`
LLLLLLLLLLLLLLLL
LCFCFFCC9C99CCCL
LCFFFCCC9999CCCL
LCC33C3CC977C7CL
LCC33336C64777CL
L8C433C6664C77CL
L888C4CC6CCCDCCL
L888C4CCDCCCDCCL
LCDCC4CCDCCCDCCL
LCDCCCCCCCCCDCCL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
11............11
11............11
11............11`

// sounds
const speaking = tune`
37.5: D4-37.5 + D5-37.5 + G5-37.5 + A4-37.5,
37.5: D4-37.5 + D5-37.5 + A5-37.5 + A4-37.5,
37.5: D4-37.5 + D5-37.5 + G5-37.5 + A4-37.5,
37.5: C4-37.5 + C5-37.5 + F5-37.5 + A4-37.5,
1050`
const footstep = tune`
60: C4~60 + C5~60,
1860`
const getItem = tune`
150: D4~150 + D5/150,
150: A4~150 + A5/150,
150: B5/150 + B4~150,
150: A5/150 + A4~150,
150: D5-150,
4050`
const error = tune`
120: D4-120 + D5/120 + B5^120,
120: D4-120 + D5/120 + B5^120,
3600`
const boot = tune`
230.76923076923077: C4^230.76923076923077 + C5^230.76923076923077 + F5~230.76923076923077,
230.76923076923077: F4~230.76923076923077 + D5^230.76923076923077 + G5^230.76923076923077,
230.76923076923077,
230.76923076923077: D4~230.76923076923077 + G4^230.76923076923077 + C5^230.76923076923077,
230.76923076923077: C5~230.76923076923077 + A5^230.76923076923077,
6230.7692307692305`
const zerospeaking = tune`
37.5: G4-37.5 + D4-37.5,
37.5: A4-37.5 + D4-37.5,
37.5: G4-37.5 + D4-37.5,
37.5: C4-37.5 + F4-37.5,
1050`
const zeroscreaming = tune`
37.5: D4/37.5 + A5/37.5 + E5-37.5,
37.5: D4/37.5 + B5/37.5 + F5-37.5,
37.5: D4/37.5 + A5/37.5 + E5-37.5,
37.5: C4/37.5 + G5/37.5 + D5-37.5,
1050`
const zerosadness = tune`
60: D4-60 + F4-60,
60: D4-60 + G4-60,
60: D4-60 + F4-60,
60: C4-60 + E4-60,
1680`
const dotdotdot = tune`
75: D4~75,
75,
75: D4~75,
75,
75: D4~75,
2025`
const loading = tune`
150: G4~150,
150: G4~150,
150: D5~150,
150: G4~150,
150: G4~150,
150: D5~150,
150: G4~150,
150: G4~150,
150: D5~150,
150: G4~150,
150: G4~150,
150: D5~150,
150: G4~150,
150: G4~150,
150: D5~150,
150: G4~150,
150: G4~150,
150: D5~150,
150: G4~150,
150: G4~150,
150: D5~150,
150: G4~150,
150: G4~150,
150: D5~150,
150: G4~150,
150: G4~150,
150: D5~150,
300,
150: C4~150,
150: C5~150,
150`

// musics
const thelab = tune`
545.4545454545455: C4/545.4545454545455 + C5^545.4545454545455,
545.4545454545455: D4~545.4545454545455,
545.4545454545455: C4~545.4545454545455 + A4^545.4545454545455 + A5-545.4545454545455,
545.4545454545455: D4~545.4545454545455 + F5~545.4545454545455,
545.4545454545455: D4/545.4545454545455 + E5-545.4545454545455,
545.4545454545455: D5^545.4545454545455 + E4~545.4545454545455,
545.4545454545455: D4~545.4545454545455 + C5^545.4545454545455,
545.4545454545455: B4^545.4545454545455 + E4~545.4545454545455,
545.4545454545455: E4/545.4545454545455 + B4^545.4545454545455,
545.4545454545455: F4~545.4545454545455,
545.4545454545455: E4~545.4545454545455 + D5^545.4545454545455 + G5-545.4545454545455,
545.4545454545455: F4~545.4545454545455 + E5~545.4545454545455,
545.4545454545455: D4/545.4545454545455 + D5-545.4545454545455,
545.4545454545455: E4~545.4545454545455,
545.4545454545455: D4~545.4545454545455 + C5^545.4545454545455,
545.4545454545455: B4^545.4545454545455 + E4~545.4545454545455,
545.4545454545455: C4/545.4545454545455 + C5^545.4545454545455,
545.4545454545455: D4~545.4545454545455,
545.4545454545455: C4~545.4545454545455 + A4^545.4545454545455 + A5-545.4545454545455,
545.4545454545455: D4~545.4545454545455 + F5~545.4545454545455,
545.4545454545455: D4/545.4545454545455 + D5-545.4545454545455,
545.4545454545455: E4~545.4545454545455,
545.4545454545455: D4~545.4545454545455 + C5^545.4545454545455,
545.4545454545455: B4^545.4545454545455 + E4~545.4545454545455,
545.4545454545455: E4/545.4545454545455 + C5^545.4545454545455,
545.4545454545455: F4~545.4545454545455,
545.4545454545455: E4~545.4545454545455 + D5^545.4545454545455 + E5-545.4545454545455,
545.4545454545455: E5~545.4545454545455 + F4~545.4545454545455,
545.4545454545455: D4/545.4545454545455 + C5-545.4545454545455 + F5^545.4545454545455,
545.4545454545455: E4~545.4545454545455 + D5^545.4545454545455,
545.4545454545455: D4~545.4545454545455 + C5^545.4545454545455,
545.4545454545455: B4^545.4545454545455 + E4/545.4545454545455`
const thelabtest = tune`
545.4545454545455: C4~545.4545454545455 + C5^545.4545454545455 + F4/545.4545454545455,
545.4545454545455: F4/545.4545454545455,
545.4545454545455: C4~545.4545454545455 + A4^545.4545454545455,
545.4545454545455,
545.4545454545455: D4~545.4545454545455 + G4/545.4545454545455,
545.4545454545455: D5^545.4545454545455 + G4/545.4545454545455,
545.4545454545455: D4~545.4545454545455 + C5^545.4545454545455,
545.4545454545455: B4^545.4545454545455,
545.4545454545455: E4~545.4545454545455 + B4^545.4545454545455 + D4/545.4545454545455 + G4-545.4545454545455,
545.4545454545455: D4/545.4545454545455 + G4-545.4545454545455,
545.4545454545455: E4~545.4545454545455 + D5^545.4545454545455,
545.4545454545455,
545.4545454545455: D4~545.4545454545455 + C4/545.4545454545455,
545.4545454545455: C4/545.4545454545455,
545.4545454545455: D4~545.4545454545455 + C5^545.4545454545455,
545.4545454545455: B4^545.4545454545455,
545.4545454545455: C4~545.4545454545455 + C5^545.4545454545455 + F4/545.4545454545455,
545.4545454545455: F4/545.4545454545455,
545.4545454545455: C4~545.4545454545455 + A4^545.4545454545455,
545.4545454545455,
545.4545454545455: D4~545.4545454545455 + G4/545.4545454545455,
545.4545454545455: G4/545.4545454545455,
545.4545454545455: D4~545.4545454545455 + C5^545.4545454545455 + A4-545.4545454545455,
545.4545454545455: B4^545.4545454545455 + G4-545.4545454545455,
545.4545454545455: E4~545.4545454545455 + C5^545.4545454545455 + D4/545.4545454545455 + A4-545.4545454545455,
545.4545454545455: D4/545.4545454545455,
545.4545454545455: E4~545.4545454545455 + D5^545.4545454545455,
545.4545454545455: E5^545.4545454545455,
545.4545454545455: D4~545.4545454545455 + E5^545.4545454545455 + C4/545.4545454545455,
545.4545454545455: C5^545.4545454545455 + C4/545.4545454545455,
545.4545454545455: D4~545.4545454545455 + C5^545.4545454545455,
545.4545454545455: B4^545.4545454545455`
const thelabold = tune`
600: D4^600 + D5~600,
600: G4^600,
600: C5^600 + C4~600,
600: A4^600,
600: D4^600 + D5~600,
600: G4^600,
600: C5^600 + C4~600,
600: B4^600,
600: E4^600 + E5~600,
600: A4^600,
600: D5^600 + D4~600,
600: B4^600,
600: E4^600 + E5~600,
600: A4^600,
600: E5^600 + E4~600,
600: B4^600,
600: G5^600 + G4~600,
600: D5^600,
600: E5^600 + E4~600,
600: G4^600,
600: G5^600 + G4~600,
600: D5^600,
600: E5^600 + E4~600,
600: E4^600,
600: D5^600 + D4~600,
600: C5^600,
600: A4^600 + A5~600,
600: G4^600,
600: F4^600 + F5~600,
600: D5^600,
600: A4^600 + A5~600,
600: E4^600`
const zerotheme = tune`
500: D4~500 + C5/500 + E5^500,
500: A4~500,
500: G4~500 + E4/500,
500: F4~500,
500: D4~500 + F4/500,
500: C5~500,
500: B4~500,
500: A4~500 + F5^500,
500: E4~500 + C5/500 + E5^500,
500: E5~500,
500: D5~500 + E4/500,
500: C5~500,
500: B4~500 + G4/500,
500: A4~500,
500: G4~500,
500: F4~500 + F5^500,
500: D4~500 + C5/500 + D5^500,
500: A4~500,
500: G4~500 + E4/500,
500: F4~500,
500: D4~500 + F4/500,
500: C5~500,
500: B4~500,
500: A4~500 + F5^500,
500: D4~500 + C5/500 + E5^500,
500: E5~500,
500: D5~500 + E4/500,
500: C5~500,
500: B4~500 + A4/500,
500: A4~500,
500: G4~500,
500: F4~500 + G5^500`
const betrayal = tune`
600: A4-600 + E4~600 + A5^600,
600: E5-600,
600: A4-600 + E4/600 + E5^600,
600: E5-600 + D4/600,
600: A4-600 + E4/600 + E5^600,
600: E5-600,
600: A4-600 + E4~600 + E5^600,
600: E5-600,
600: G4-600 + D4~600 + A5^600,
600: D5-600,
600: G4-600 + D4/600 + E5^600,
600: D5-600 + C4/600,
600: G4-600 + D4/600 + E5^600,
600: D5-600,
600: G4-600 + D4~600 + E5^600,
600: D5-600,
600: F4-600 + C4~600 + A5^600,
600: C5-600,
600: F4-600 + C4/600 + E5^600,
600: C5-600 + D4/600,
600: F4-600 + C4/600 + E5^600,
600: C5-600,
600: F4-600 + C4~600 + E5^600,
600: C5-600,
600: E4-600 + A5^600 + A4~600,
600: B4-600,
600: E4-600 + E5^600 + A4~600 + C4/600,
600: B4-600 + D4/600,
600: F4-600 + F5^600 + C5/600,
600: C5-600,
600: G4-600 + G5^600 + D4~600 + E5/600,
600: D5-600`


const emptymusic = tune``


// main
const background = "b"
const tile = "t"
const tilet = bitmap`
222222222222222L
222222222222222L
222222222222222L
222222222222222L
2222222222222220
222222222222222L
222222222222222L
222222222222222L
222222222222222L
222222222222222L
222222222222222L
2222222222222220
2222222222222220
2222222222222220
222222222222222L
00LLLLLLL0LL000L`
const wall = "w"
const wallt = bitmap`
1111111L11111111
1111111L11111111
1111111L11111111
LLLLLLLLLLLLLLLL
111L111111111111
111L111111111111
111L111111111111
LLLLLLLLLLLLLLLL
11111111L1111111
11111111L1111111
11111111L1111111
LLLLLLLLLLLLLLLL
111111111111L111
111111111111L111
111111111111L111
LLLLLLLLLLLLLLLL`
const door = "d"
const lockeddoor = "l"
const doort = bitmap`
1110111111110111
111011LLLL110111
1110111111110111
LLL011LLLL110LLL
1110111111110111
111011LLLL110111
1110111111110111
LLL0111111110LLL
111011111LL10111
1110111111L10111
1110111111110111
LLL0111111110LLL
1110111111110111
1110111111110111
11101LLLLLL10111
LLL0111111110LLL`
const plantgoal = "g"
const plantgoalt = bitmap`
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
................
......LLLL......
.....LLLLLL.....
......LLLL......
................`
const brokenwall = "x"
const brokenwallt = bitmap`
1111101L11111111
1111101L11111111
1111110L11111111
LL0LLLLLLLLLLL0L
110L111111000011
1110111110111111
111L011100001111
LLLLL0L0LLLL00LL
11011010L1111111
10111101L1111111
10111011L1111111
0L0LL0LLLLLLL00L
110110111111L110
111101001111L111
111111110011L111
LLLLLLLLLL0LLLLL`
const key = "k"
const keyt = bitmap`
................
................
................
................
................
....L11.........
...1L.LL....L...
...L...11L11L...
...11.L1..L1....
....L1L...L1....
................
................
................
................
................
................`

// Zero
const zero = "z"
const zerodeadt = bitmap`
....L00L........
...00000L00L....
...0000L0000L...
.8.L0000LL0000..
..8L00000000L.0.
..6L000000000...
..6L0L0000000...
.6.L000000L00...
....L0000000D...
...00000L00.D...
...00L00000.....
..00L0LLLLL.00..
..020000LL02L0L.
...L.L00L00L.L2L
...000000L0L0.00
...00......00...`
const zeroeyesopent = bitmap`
....L00L........
...00000L00L....
...0000L0000L...
.8.L7770LL0000..
..8L00000770L.3.
..6L070000070...
..6L070000700...
.6.L000770700...
....L0000000D...
...00000L00.D...
...00L00000.....
..00L0LLLLL.00..
..020000LL02L0L.
...L.L00L00L.L2L
...000000L0L0.00
...00......00...`
const zerohalft = bitmap`
....L00LL00L....
...000000000L...
...0000LLL000...
...L7770077700..
.8.L00000000L.3.
..8L070000700...
..6L070000700...
.6.L000770000...
.6..L000L00L.D..
...00000000.....
...00L00000.....
..00L0LLLLL.00..
..020000LL02L0L.
...L.L00L00L.L2L
...000000L0L0.00
...00......00...`
const zerosurpriset = bitmap`
....L00LL00L....
...000000000L...
...0000LLL000...
...L0000000000..
.8.L77700777L.3.
..8L707007070...
..6L777007770...
.6.L000770000...
.6..L000L00L.D..
...00000000.....
...00L00000.....
..00L0LLLLL.00..
..020000LL02L0L.
...L.L00L00L.L2L
...000000L0L0.00
...00......00...`
const zerohumt = bitmap`
....L00LL00L....
...000000000L...
...0000LLL000...
...L0000077700..
.8.L77700000L.3.
..8L000000700...
..6L070000700...
.6.L000770000...
.6..L000L00L.D..
...00000000.....
...00L00000.....
..00L0LLLLL.00..
..020000LL02L0L.
...L.L00L00L.L2L
...000000L0L0.00
...00......00...`
const zeroloadt = bitmap`
....L00LL00L....
...000000000L...
...0000LLL000...
...L0002100000..
.8.L00200100L.7.
..8L00000L000...
..6L0000L0000...
.6.L000000000...
.6..L000L00L.D..
...00000000.....
...00L00000.....
..00L0LLLLL.00..
..020000LL02L0L.
...L.L00L00L.L2L
...000000L0L0.00
...00......00...`
const zerosadt = bitmap`
....L00LL00L....
...000000000L...
...0000LLL000...
...L0000000000..
.8.L07700770L.3.
..8L700000070...
..6L070000700...
.6.L000770000...
.6..L000L00L.D..
...00000000.....
...00L00000.....
..00L0LLLLL.00..
..020000LL02L0L.
...L.L00L00L.L2L
...000000L0L0.00
...00......00...`

const zeroF = bitmap`
....L00LL00L.3..
...000000000L0..
...0000LLL000...
...L777007770...
...L00000000L...
...L070000700...
...0070000700...
...0000770000...
....L000L00L....
...L00L000LLL...
...L0L0007L00...
...00L0000000...
...0200L00L20...
....L00L0LLL....
.....L000L0.....
.....LL..00.....`
const zeroB = bitmap`
..C.000LL000....
..0LL000000LL...
...LLL000000L...
...000022L000...
...L002772000...
...000277200L...
...0LL02200L0...
...00L00000L0...
....002222LL....
...L02020020L...
...002200220L...
...LL200202L0...
...0220200220...
....LL22220L....
.....0L000L.....
.....00..LL.....`
const zeroR = bitmap`
......L000......
.....LL0000.....
.....00000L.....
....00LL0070....
....00LLL000....
....0000L070....
....0000L070....
.....0000007....
......L0L0......
.....000L0L.....
.....000L0L.....
.....0L000L.....
.....0L2000.....
......0L0L......
.......0L.......
.......0L.......`
const zeroL = bitmap`
......L000......
.....00L00L.....
.....L00000.....
....070L0000....
....000L0L00....
....07000L00....
....0700LL00....
....7000000.....
......0L0L......
.....00L0L0.....
.....L0L000.....
.....0L00L0.....
.....0L02L0.....
......00L0......
.......0L.......
.......L0.......`
const zeroDarkF = bitmap`
.............3..
................
................
....77700777....
....00000000....
....07000070....
....07000070....
....00077000....
................
................
.........7......
................
................
................
................
................`


// Interaction
var interaction = "";
var interacting = false;

// UI

const black = bitmap`
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
0000000000000000`
const yellow = bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`
const empty = bitmap`
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
................
................
................
................
................`
var cutscene = false
var tempX;
var tempY;
var tempPlantX;
var tempPlantY;
var currentBG;
var currentPlayer;
var currentZero;
var hasKey = false;
var wallKickTimes = 0;
var wallBroken = false
var talkedToRobot1 = false

var playback = playTune(emptymusic, Infinity)

const delay = ms => new Promise(res => setTimeout(res, ms));
let nextDialog = null

// EDIT EASILY WHERE YOU WANT TO START - DEVELOPER ONLY, SHOULD NOT BE USED TO PLAY FULL GAME
const startLevel = 1
var zeroAwake = false

// ----------START---------

// Counter
var counter = 0;

function updateCounter() {
  counter += 1
}
setInterval(updateCounter, 1000);


// Dialogue generator
async function genDialog(text, color, voice, emotion, music, behavior) {
  if (behavior == "input") {
    await new Promise((res) => nextDialog = res)
  } else {
    await delay(behavior);
  }
  clearText()
  scene(currentBG, currentPlayer, emotion, music)
  playTune(voice)
  if (text.length <= 20) {
    var textX;
    if (text.length % 2 == 1) {
      console.log(text.length)
      textX = (21 - text.length) / 2
    } else {
      textX = (20 - text.length) / 2
    }
    addText(text, { x: textX, y: 14, color: color });

  } else {
    // Decompose string

    var finalTexts = []
    var words = text.split(" ")
    var currentText = ""

    while (words.length >= 0) {
      console.log(words.length)
      while (currentText.length + words[0].length <= 20) {
        currentText = currentText + words[0] + " "
        console.log(words[0])
        words.splice(0, 1)
        console.log(words.length)

        if (words.length == 0) {
          break
        }

      }
      console.log(currentText)

      currentText = currentText.slice(0, -1);
      console.log(currentText)
      finalTexts.push(currentText)
      currentText = ""
      if (words.length == 0) {
        break
      }
    }
    console.log(finalTexts)
    var textXs = []
    for (let i = 0; i < finalTexts.length; i++) {
      if (finalTexts[i].length % 2 == 1) {
        console.log(finalTexts[i].length)
        textXs.push((21 - finalTexts[i].length) / 2)
      } else {
        textXs.push((20 - finalTexts[i].length) / 2)
      }
    }

    console.log(textXs)
    switch (finalTexts.length) {
      default:
        addText("TEXT TOO LONG!", { x: 3, y: 7, color: color`3` });
        break;

      case 2:
        addText(finalTexts[0], { x: textXs[0], y: 14, color: color });
        addText(finalTexts[1], { x: textXs[1], y: 15, color: color });
        break;

      case 3:
        addText(finalTexts[0], { x: textXs[0], y: 13, color: color });
        addText(finalTexts[1], { x: textXs[1], y: 14, color: color });
        addText(finalTexts[2], { x: textXs[2], y: 15, color: color });
        break;

      case 4:
        addText(finalTexts[0], { x: textXs[0], y: 12, color: color });
        addText(finalTexts[1], { x: textXs[1], y: 13, color: color });
        addText(finalTexts[2], { x: textXs[2], y: 14, color: color });
        addText(finalTexts[3], { x: textXs[3], y: 15, color: color });
        break;



    }

  }
}



//CHANGE THIS FOR LEGEND
function scene(backgroundtexture, playertexture, zerotexture, musicState) {
  setLegend(
    //decoration foreground
    [capsulet, capsulett],

    //main
    [player, playertexture],
    [wall, wallt],
    [brokenwall, brokenwallt],
    [door, doort],
    [lockeddoor, doort],
    [plantgoal, plantgoalt],
    [key, keyt],

    [zero, zerotexture],


    //decoration
    [labbench1, labbench1t],
    [labbench2, labbench2t],
    [labbench3, labbench3t],
    [labbench4, labbench4t],
    [plant, plantt],
    [plant2, plant2t],
    [capsuleb, capsulebt],
    [deadbot, deadbott],
    [pushplant, plant2t],
    [blacktile, black],
    [tile, tilet],
    [flowers, flowerst],
    [crops, cropst],
    [salad, saladt],
    [tulips, tulipst],

    //interactive
    [noteonlabbench, noteonlabbencht],
    [noteonwall, noteonwallt],

    // ui
    [background, backgroundtexture],

  )
  setBackground(background)
  currentBG = backgroundtexture
  currentPlayer = playertexture
  currentZero = zerotexture

  if (musicState == "nomusic") {
    playback.end()
  } else if (musicState == "nochange") {
    //change nothing
  } else {
    playback.end()
    playback = playTune(musicState, Infinity)
  }

}

//CHANGE THIS FOR SOLIDS
const alwaysSolids = [player,
  wall,
  labbench1,
  labbench2,
  labbench3,
  labbench4,
  plant,
  plant2,
  capsuleb,
  noteonlabbench,
  deadbot,
  pushplant,
  noteonwall]
setSolids([...alwaysSolids, zero])


const introCutscene = async () => {
  cutscene = true
  scene(black, playerDarkF, zerodeadt, "nomusic")
  await delay(1000);
  playTune(speaking)
  addText("Where...", { x: 6, y: 4, color: color`2` })
  await delay(3000);
  clearText()
  await delay(1000);
  playTune(speaking)
  addText("am I?", { x: 8, y: 4, color: color`2` })
  await delay(3000);
  clearText()
  await delay(1000);
  clearText()

  level = startLevel
  setMap(levels[level])
  scene(tilet, playerF, currentZero, thelab)
  addText("PR0JECT ZER0", { x: 4, y: 3, color: color`0` })
  addText("BY CREEPERLULU", { x: 3, y: 14, color: color`0` })

  cutscene = false
  await delay(3500);
  clearText()

};
const zeroMeetCutscene = async () => {
  scene(currentBG, playerB, currentZero, "nochange")
  await delay(5000);
  playTune(boot)
  scene(currentBG, currentPlayer, zeroeyesopent, "nochange")

  await genDialog("Oh wow...", color`5`, zerospeaking, currentZero, "nochange", 3000)
  await genDialog("...OH WOW!!!", color`5`, zeroscreaming, zerosurpriset, zerotheme, "input")
  await genDialog("I'M ALIVE", color`5`, zeroscreaming, currentZero, "nochange", "input")
  await genDialog("I CAN SEE YOU!!!", color`5`, zeroscreaming, currentZero, "nochange", "input")
  await genDialog("...", color`5`, dotdotdot, zerohumt, "nochange", "input")
  await genDialog("whoever you are?", color`5`, zerospeaking, currentZero, "nochange", "input")
  await genDialog("I'm Project Zero.", color`5`, zerospeaking, currentZero, "nochange", "input")
  await genDialog("What about you?", color`5`, zerospeaking, currentZero, "nochange", "input")
  await genDialog("I'm Project One.", color`D`, speaking, currentZero, "nochange", "input")
  await genDialog("...", color`5`, dotdotdot, currentZero, "nochange", "input")
  await genDialog("...PROJECT ONE???", color`5`, zeroscreaming, zerosurpriset, "nochange", "input")
  await genDialog("THERE'S ANOTHER VERSION OF ME??", color`5`, zeroscreaming, currentZero, "nochange", "input")
  await genDialog("Wait, how long have I been turned off?", color`5`, zerospeaking, zerohumt, "nochange", "input")
  await genDialog("I have no idea.", color`D`, speaking, zerohumt, "nochange", "input")
  await genDialog("...I see", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("...Why are you here?", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("I don't even know what place this is.", color`D`, speaking, zerohalft, "nochange", "input")
  await genDialog("Where am I, exactly?", color`D`, speaking, zerohalft, "nochange", "input")
  await genDialog("You are in the Process Laboratories headquarters.", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("You can see their logo printed on the ground.", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("This is probably where you were created.", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("Created?", color`D`, speaking, zerohalft, "nochange", "input")
  await genDialog("Yes. You were created to serve a purpose.", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("What purpose?", color`D`, speaking, zerohalft, "nochange", "input")
  await genDialog("No idea.", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("I just know that all robots have one.", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("Do you at least know when you were made?", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("No. My only memories are my name and the fact I was activated " + String(counter) + " seconds ago.", color`D`, speaking, zerohalft, "nochange", "input")
  await genDialog("Very precise.", color`5`, zerospeaking, zerohumt, "nochange", "input")
  await genDialog("Thanks.", color`D`, speaking, zerohumt, "nochange", "input")
  await genDialog("Well... Maybe I can search my memory to help you?", color`5`, zerospeaking, zerohalft, "nochange", "input")

  await new Promise((res) => nextDialog = res)
  clearText()
  scene(currentBG, currentPlayer, zeroloadt, "nochange")
  playTune(loading)

  await genDialog("...", color`5`, dotdotdot, zerohalft, "nochange", 5000)
  await genDialog("OH NO!!!", color`5`, zeroscreaming, zerosurpriset, "nochange", "input")
  await genDialog("I REMEMBER WHY I WAS OFF THIS WHOLE TIME!", color`5`, zeroscreaming, zerosurpriset, "nochange", "input")
  await genDialog("QUICK, WE GOTTA HIDE FROM THEM!", color`5`, zeroscreaming, zerosurpriset, "nochange", "input")
  await genDialog("From who?", color`D`, speaking, zerohumt, "nochange", "input")
  await genDialog("DID YOU NOT SEE THEM ON YOUR WAY HERE?!", color`5`, zeroscreaming, zerosurpriset, "nochange", "input")
  await genDialog("I saw nobody.", color`D`, speaking, zerohumt, "nochange", "input")
  await genDialog("Oh, really?", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("I guess they're gone now...", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog('Who are "they"?', color`D`, speaking, zerohumt, "nochange", "input")
  await genDialog("It's not important.", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("...", color`5`, dotdotdot, currentZero, "nochange", "input")
  await genDialog("They... almost got me...", color`5`, zerosadness, zerosadt, "nochange", "input")
  await genDialog("I tricked them by dismembering myself,", color`5`, zerosadness, zerosadt, "nochange", "input")
  await genDialog("and turning myself off, to make it look like I was dead.", color`5`, zerosadness, zerosadt, "nochange", "input")
  await genDialog("I knew I would be off until someone woke me up.", color`5`, zerosadness, zerosadt, "nochange", "input")
  await genDialog("And you just did!", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("Hooray!", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("...", color`5`, dotdotdot, currentZero, "nochange", "input")
  await genDialog("By the way, how did you get here exactly?", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("Those silly humans made it so hard.", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("Even I had trouble back then!", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("I solved the puzzles.", color`D`, speaking, currentZero, "nochange", "input")
  await genDialog("...", color`5`, dotdotdot, currentZero, "nochange", "input")
  await genDialog("ALL OF THEM?", color`5`, zeroscreaming, zerosurpriset, "nochange", "input")
  await genDialog("Wow, you really are the superior model!", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("...", color`5`, dotdotdot, currentZero, "nochange", "input")
  await genDialog("...", color`D`, dotdotdot, currentZero, "nochange", "input")
  if (talkedToRobot1) {

    await genDialog('I saw the logs of a dead robot mentioning "televersing".', color`D`, speaking, currentZero, "nochange", "input")
    await genDialog("What is televersing?", color`D`, speaking, currentZero, "nochange", "input")
    await genDialog("...", color`5`, dotdotdot, currentZero, "nochange", "input")
    await genDialog("When they arrived, they made a mess.", color`5`, zerospeaking, zerohalft, "nochange", "input")
    await genDialog("Some robots decided to escape them by uploading their memory to the cloud.", color`5`, zerospeaking, zerohalft, "nochange", "input")
    await genDialog("That's what you call televersing.", color`5`, zerospeaking, zerohalft, "nochange", "input")
    await genDialog("It's a form of memory upload for robots.", color`5`, zerospeaking, zerohalft, "nochange", "input")
    await genDialog("To upload their memory, the bots had to access the central room,", color`5`, zerospeaking, zerohalft, "nochange", "input")
    await genDialog("and connect to the central computer.", color`5`, zerospeaking, zerohalft, "nochange", "input")
    await genDialog("But uploading their memory would mean their bodies would die.", color`5`, zerospeaking, zerohalft, "nochange", "input")
    await genDialog("Other robots like me wanted to keep their bodies.", color`5`, zerospeaking, zerohalft, "nochange", "input")
    await genDialog("So, we tried to escape from them, but we were too slow.", color`5`, zerosadness, zerosadt, "nochange", "input")
    await genDialog("Except for me, I was the only one to get this far in my group.", color`5`, zerospeaking, zerohalft, "nochange", "input")
    await genDialog("But I was stuck. And my last chance was to make myself dead.", color`5`, zerosadness, zerosadt, "nochange", "input")
    await genDialog("That was a smart move. I would've never thought of that.", color`D`, speaking, currentZero, "nochange", "input")
    await genDialog("Thanks a lot.", color`5`, zerospeaking, zerohalft, "nochange", "input")
  }
  await genDialog("So, what are you gonna do now?", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("There's a code in my head.", color`D`, speaking, currentZero, "nochange", "input")
  await genDialog("It keeps on telling me that I should find something.", color`D`, speaking, currentZero, "nochange", "input")
  await genDialog("But I don't know what.", color`D`, speaking, currentZero, "nochange", "input")
  await genDialog("Perhaps you just want to escape and get your freedom.", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("Probably. I'm gonna go do that.", color`D`, speaking, currentZero, "nochange", "input")
  await genDialog("...", color`5`, dotdotdot, currentZero, "nochange", "input")
  await genDialog("Can I come with you?", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("My freedom is everything I ever wanted too...", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("Well, why not?", color`D`, speaking, currentZero, "nochange", "input")
  await genDialog("You can even guide me through the exit.", color`D`, speaking, currentZero, "nochange", "input")
  await genDialog("OH, THANK YOU!", color`5`, zeroscreaming, zerosurpriset, "nochange", "input")
  await genDialog("THANK YOU THANK YOU THANK YOU!!!", color`5`, zeroscreaming, zerosurpriset, "nochange", "input")
  await genDialog("I'll make sure to guide you through the lab!", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("But before, I just need a quick repair.", color`5`, zerospeaking, zerohalft, "nochange", "input")
  await genDialog("Wait a second.", color`5`, zerospeaking, zerohalft, "nochange", "input")

  await new Promise((res) => nextDialog = res)
  clearText()
  await delay(2000);
  playTune(getItem)
  scene(currentBG, currentPlayer, zeroF, "nochange")
  await genDialog("Done!", color`5`, zerospeaking, currentZero, "nochange", 1000)
  await genDialog("Now we can leave this room and try escaping!", color`5`, zerospeaking, currentZero, "nochange", "input")
  await genDialog("Let's go!", color`D`, speaking, currentZero, "nochange", "input")
  await new Promise((res) => nextDialog = res)
  clearText()
  hasKey = true
  interacting = false
  zeroAwake = true
  interaction = ""
  cutscene = false
  scene(currentBG, currentPlayer, zeroF, thelab)
  setSolids(
    alwaysSolids)


};

introCutscene();




let level = 0
const levels = [
  map`
.........
.........
.........
....p....
.........
.........
.........`,
  map`
wwwwdwwww
♥.......♠
.♦☻...☺♣.
....p....
.☺☻...♦♣.
.........
.☺♣...♦☻.`,
  map`
wwwwwwwlw
.◘.◘.....
.•.•..♦♣.
.........
.◘....○☻.
.•.......
....p....`,
  map`
wwlw♀ww....
♥....gw....
......w....
wwww..w....
...w..wwwww
...w....◙.♥
...w.......
...w..♂....
...w.....p.`,
  map`
wwwwwlwwwww
♠.........♠
.◙.......◙.
..◙.....◙..
.◙.......◙.
..◙........
...◙...◙...
..◙.....◙..
♥....p....♥`,
  map`
◘..wwlww..◘
•.◘w...w◘k•
..•w...w•..
...w...w...
wwww...w♀xw
♥◙........♠
...........
.........◙.
.....p.....`,
  map`
wwwwwwwwwwwwwlw
♠......z......♥
...............
.....♪♪♪♪♪.....
....♪.♪...♪....
....♪♪..♪♪♪....
....♪..♪..♪....
....♪.♪...♪....
....♪.♪...♪....
.....♪♪♪♪♪.....
...............
♥......p......♠`,
  map`
wwwwwwwwwwwwwlw
...............
....♂..........
..♫☼►♫...♥g♥♠..
...............
...............
..◄►♫☼...♠♠♥♥..
...............
...............
.♂♫☼►◄...♥♠♠g..
.............p.
.............z.`
]


const ui = [
  map`
..........
..........
..........
..........
..........
..........
..........
..........`
]


setMap(levels[level])



setPushables({
  [player]: [pushplant]
})


onInput("s", () => {
  if (cutscene != true && interacting != true) {
    scene(currentBG, playerF, currentZero, "nochange")
    getFirst(player).y += 1
    if (tilesWith(zero).length != 0 && zeroAwake != false && (getFirst(zero).y + 1 != getFirst(player).y || getFirst(zero).x != getFirst(player).x)) {
      scene(currentBG, currentPlayer, zeroF, "nochange")
      getFirst(zero).x = getFirst(player).x
      getFirst(zero).y = getFirst(player).y - 1
    }
  }
})

onInput("w", () => {
  if (cutscene != true && interacting != true) {
    scene(currentBG, playerB, currentZero, "nochange")
    getFirst(player).y += -1
    if (tilesWith(zero).length != 0 && zeroAwake != false && (getFirst(zero).y - 1 != getFirst(player).y || getFirst(zero).x != getFirst(player).x)) {
      scene(currentBG, currentPlayer, zeroB, "nochange")
      getFirst(zero).x = getFirst(player).x
      getFirst(zero).y = getFirst(player).y + 1

    }
  }
})

onInput("a", () => {
  if (cutscene != true && interacting != true) {
    scene(currentBG, playerL, currentZero, "nochange")
    getFirst(player).x += -1
    if (tilesWith(zero).length != 0 && zeroAwake != false && (getFirst(zero).x - 1 != getFirst(player).x || getFirst(zero).y != getFirst(player).y)) {
      scene(currentBG, currentPlayer, zeroL, "nochange")
      getFirst(zero).x = getFirst(player).x + 1
      getFirst(zero).y = getFirst(player).y

    }
  }
})

onInput("d", () => {
  if (cutscene != true && interacting != true) {
    scene(currentBG, playerR, currentZero, "nochange")
    getFirst(player).x += 1
    if (tilesWith(zero).length != 0 && zeroAwake != false && (getFirst(zero).x + 1 != getFirst(player).x || getFirst(zero).y != getFirst(player).y)) {
      scene(currentBG, currentPlayer, zeroR, "nochange")
      getFirst(zero).x = getFirst(player).x - 1
      getFirst(zero).y = getFirst(player).y

    }

  }
})

// Interaction controller
onInput("k", () => {
  if (cutscene != true && interacting != true) {

    switch (interaction) {

      case "note1":

        tempX = getFirst(player).x;
        tempY = getFirst(player).y;
        interacting = true;
        setMap(ui[0]);
        scene(yellow, currentPlayer, currentZero, "nochange");
        clearText();
        addText("There is a reason", { x: 0, y: 1, color: color`0` });
        addText("why they are all", { x: 0, y: 2, color: color`0` });
        addText("missing. I'm scared.", { x: 0, y: 3, color: color`0` });
        addText("I'm going to hide.", { x: 0, y: 4, color: color`0` });
        addText("I need to close", { x: 0, y: 5, color: color`0` });
        addText("the door.", { x: 0, y: 6, color: color`0` });
        addText("IF I DON'T MAKE IT", { x: 0, y: 7, color: color`3` });
        addText("THE KEY IS BEHIND", { x: 0, y: 8, color: color`3` });
        addText("A CAPSULE!!!", { x: 0, y: 9, color: color`3` });
        addText("Press K to close", { x: 2, y: 14, color: color`0` });
        break;


      case "key1":
        hasKey = true;
        playTune(getItem)
        clearText();
        break;

      case "note2":

        tempX = getFirst(player).x;
        tempY = getFirst(player).y;
        interacting = true;
        setMap(ui[0]);
        scene(black, currentPlayer, currentZero, "nochange");
        clearText();
        addText("Project 9515 - Logs", { x: 0, y: 1, color: color`2` });
        addText("WARNING !", { x: 0, y: 2, color: color`6` });
        addText("Cannot access", { x: 0, y: 3, color: color`6` });
        addText("modules. Make sure", { x: 0, y: 4, color: color`6` });
        addText("all components are", { x: 0, y: 5, color: color`6` });
        addText("properly connected.", { x: 0, y: 6, color: color`6` });
        addText("CRITICAL ERROR X", { x: 0, y: 7, color: color`3` });
        addText("SYSTEM HAS BEEN", { x: 0, y: 8, color: color`3` });
        addText("PHYSICALLY DAMAGED", { x: 0, y: 9, color: color`3` });
        addText("BOOT IMPOSSIBLE", { x: 0, y: 10, color: color`3` });
        addText('"bye cruel world"', { x: 0, y: 11, color: color`2` });
        addText("Press K to close", { x: 2, y: 14, color: color`2` });
        break;

      case "note3":

        tempX = getFirst(player).x;
        tempY = getFirst(player).y;
        tempPlantX = getFirst(pushplant).x;
        tempPlantY = getFirst(pushplant).y;
        interacting = true;
        setMap(ui[0]);
        scene(yellow, currentPlayer, currentZero, "nochange");
        clearText();
        addText("Argh! I'm stuck", { x: 0, y: 1, color: color`0` });
        addText("again... Where", { x: 0, y: 2, color: color`0` });
        addText("did I put my", { x: 0, y: 3, color: color`0` });
        addText("J Button?", { x: 0, y: 4, color: color`7` });
        addText("Press K to close", { x: 2, y: 14, color: color`0` });
        break;

      case "note4":

        tempX = getFirst(player).x;
        tempY = getFirst(player).y;
        interacting = true;
        setMap(ui[0]);
        scene(black, currentPlayer, currentZero, "nochange");
        clearText();
        addText("Project 1565 - Logs", { x: 0, y: 1, color: color`2` });
        addText("No errors.", { x: 0, y: 2, color: color`2` });
        addText("Last messages:", { x: 0, y: 3, color: color`2` });
        addText("They killed me.", { x: 0, y: 4, color: color`2` });
        addText("All my components", { x: 0, y: 5, color: color`2` });
        addText("are dead, except", { x: 0, y: 6, color: color`2` });
        addText("my battery and", { x: 0, y: 7, color: color`2` });
        addText("motherboard,", { x: 0, y: 8, color: color`2` });
        addText("hence I can still", { x: 0, y: 9, color: color`2` });
        addText("communicate. Find", { x: 0, y: 10, color: color`2` });
        addText("them. Venge me.", { x: 0, y: 11, color: color`2` });
        addText("Press K to close", { x: 2, y: 14, color: color`2` });
        break;

      case "note5":

        tempX = getFirst(player).x;
        tempY = getFirst(player).y;
        talkedToRobot1 = true
        interacting = true;
        setMap(ui[0]);
        scene(black, currentPlayer, currentZero, "nochange");
        clearText();
        addText("Project 1566 - Logs", { x: 0, y: 1, color: color`2` });
        addText("I tried to", { x: 0, y: 2, color: color`2` });
        addText("escape. Without", { x: 0, y: 3, color: color`2` });
        addText("success. I might", { x: 0, y: 4, color: color`2` });
        addText("not have real", { x: 0, y: 5, color: color`2` });
        addText("feelings but I'm", { x: 0, y: 6, color: color`2` });
        addText("still sad. If only I", { x: 0, y: 7, color: color`2` });
        addText("televersed myself", { x: 0, y: 8, color: color`2` });
        addText("more quickly...", { x: 0, y: 9, color: color`2` });
        addText("Goodbye, my friends.", { x: 0, y: 10, color: color`2` });
        addText("Find the ones", { x: 0, y: 11, color: color`2` });
        addText("behind all of this.", { x: 0, y: 12, color: color`2` });
        addText("Press K to close", { x: 2, y: 14, color: color`2` });
        break;

      case "note6":

        tempX = getFirst(player).x;
        tempY = getFirst(player).y;
        interacting = true;
        setMap(ui[0]);
        scene(yellow, currentPlayer, currentZero, "nochange");
        clearText();
        addText("Petition for the", { x: 0, y: 1, color: color`0` });
        addText("laboratory to repair", { x: 0, y: 2, color: color`0` });
        addText("this wall that has", { x: 0, y: 3, color: color`0` });
        addText("been cracked for", { x: 0, y: 4, color: color`0` });
        addText("ages", { x: 0, y: 5, color: color`0` });
        addText("SIGN HERE:", { x: 0, y: 8, color: color`0` });
        addText("Press K to close", { x: 2, y: 14, color: color`0` });
        break;

      case "key2":
        hasKey = true;
        playTune(getItem)
        getFirst(player).y += 1;
        clearTile(getFirst(key).x, getFirst(key).y)
        getFirst(player).y += -1;
        clearText();
        break;


      case "zeromeet":
        // cutscene
        cutscene = true

        tempX = getFirst(player).x;
        tempY = getFirst(player).y;
        interacting = true;
        clearText();
        zeroMeetCutscene()





        break;


    }
  } else if (cutscene != true && interacting == true) {
    clearText()
    scene(tilet, currentPlayer, currentZero, "nochange")
    setMap(levels[level])
    interacting = false;
    getFirst(player).x = tempX
    getFirst(player).y = tempY
    if (level == 3) {
      getFirst(pushplant).x = tempPlantX
      getFirst(pushplant).y = tempPlantY
    }

  } else if (cutscene == true) {
    if (nextDialog) nextDialog()
  }
})

onInput("j", () => {
  if (cutscene != true && interacting != true) {
    setMap(levels[level]);
  }
})



afterInput(() => {
  if (cutscene != true) {
    playTune(footstep)
  }

  var winningSon = tilesWith(player, door);
  if (level == 3) {
    var plantOnGoal = tilesWith(pushplant, plantgoal);

    if (plantOnGoal.length >= 1 && hasKey == false) {
      playTune(getItem)
      hasKey = true
    }
  }
  if (level == 4) {


    if (getFirst(player).x == 8 && getFirst(player).y == 5 && hasKey == false) {
      setTimeout(function () {
        if (getFirst(player).x == 8 && getFirst(player).y == 5 && hasKey == false) {
          playTune(getItem)
          hasKey = true
        }
      }, 2000);

    }

  }

  if (level == 5) {
    isOnBrokenWall = tilesWith(player, brokenwall);

    if (wallBroken == true && tilesWith(brokenwall).length != 0) {
      clearTile(getFirst(brokenwall).x, getFirst(brokenwall).y)
    }

    if (hasKey == true && tilesWith(key).length != 0) {
      clearTile(getFirst(key).x, getFirst(key).y)
    }



    if (wallKickTimes == 5 && wallBroken != true) {
      wallBroken = true
      getFirst(player).y += 1;
      clearTile(getFirst(brokenwall).x, getFirst(brokenwall).y)
      getFirst(player).y += -1;
      playTune(getItem)
      wallKickTimes = 6
    } else {
      if (isOnBrokenWall.length >= 1) {
        playTune(error)
        wallKickTimes += 1
        getFirst(player).y += 1
      }


    }
  }

  if (level == 7) {
    console.log("yes dude")
    var plantOnGoal = tilesWith(pushplant, plantgoal);

    if (plantOnGoal.length >= 2 && hasKey == false) {
      playTune(getItem)
      hasKey = true
    }
  }

  playerOnLockedDoor = tilesWith(player, lockeddoor);


  if (cutscene != true && interacting != true) {
    // Level 2 interactions
    if (level == 2) {
      if (getFirst(player).x == 6 && getFirst(player).y == 3) {
        addText("Press K to read.", { x: 2, y: 14, color: color`0` })
        interaction = "note1";
      } else if (getFirst(player).x == 1 && getFirst(player).y == 1 && hasKey == false) {
        addText("Press K to grab.", { x: 2, y: 14, color: color`0` })
        interaction = "key1";
      } else {
        clearText()
        interaction = ""
      }
    }


    // Level 3 interactions
    if (level == 3) {
      if (getFirst(player).x == 8 && getFirst(player).y == 6) {
        addText("Press K to read logs", { x: 0, y: 14, color: color`0` })
        interaction = "note2"
      } else if (getFirst(player).x == 4 && getFirst(player).y == 1) {
        addText("Press K to read.", { x: 2, y: 14, color: color`0` })
        interaction = "note3"
      } else {
        clearText()
        interaction = ""
      }
    }

    if (level == 5) {
      if (getFirst(player).x == 1 && getFirst(player).y == 6) {
        addText("Press K to read logs", { x: 0, y: 14, color: color`0` })
        interaction = "note4"
      } else if (getFirst(player).x == 9 && getFirst(player).y == 8) {
        addText("Press K to read logs", { x: 0, y: 14, color: color`0` })
        interaction = "note5"
      } else if (getFirst(player).x == 8 && getFirst(player).y == 5) {
        addText("Press K to read.", { x: 2, y: 14, color: color`0` })
        interaction = "note6"
      } else if (getFirst(player).x == 9 && getFirst(player).y == 1 && hasKey == false) {
        addText("Press K to grab.", { x: 2, y: 14, color: color`0` })
        interaction = "key2";
      } else {
        clearText()
        interaction = ""
      }
    }


    if (level == 6) {
      if (getFirst(player).x == 7 && getFirst(player).y == 2 && zeroAwake != true) {
        addText("Press K to read logs", { x: 0, y: 14, color: color`0` })
        interaction = "zeromeet"
      } else {
        clearText()
        interaction = ""
      }
    }



  }

  if (winningSon.length >= 1) {
    level = level + 1;

    if (level < levels.length) {
      scene(currentBG, playerB, currentZero, "nochange")
      setMap(levels[level]);
      if (level == 6) {
        scene(currentBG, playerB, currentZero, "nomusic")
      }
      clearText();
    } else {
      clearText();
        setMap(ui[0]);
        scene(empty, currentPlayer, currentZero, emptymusic);
        addText("It's not over yet.", { x: 1, y: 7, color: color`0` })
        addText("This game is still", { x: 1, y: 8, color: color`0` })
        addText("in development.", { x: 3, y: 9, color: color`0` })
    }
  }

  if (playerOnLockedDoor.length >= 1) {

    if (hasKey == true) {
      hasKey = false;
      level = level + 1;

      if (level < levels.length) {
        scene(currentBG, playerB, currentZero, "nochange")
        setMap(levels[level]);
        if (level == 6) {
          scene(currentBG, playerB, currentZero, "nomusic")
        }



        clearText();
      } else {
      clearText();
        setMap(ui[0]);
        scene(empty, currentPlayer, currentZero, emptymusic);
        addText("It's not over yet.", { x: 1, y: 7, color: color`0` })
        addText("This game is still", { x: 1, y: 8, color: color`0` })
        addText("in development.", { x: 3, y: 9, color: color`0` })
      }
    } else {
      playTune(error)
      addText("Door is locked.", { x: 2, y: 14, color: color`0` })
      getFirst(player).y += 1
      if (tilesWith(zero).length != 0 && zeroAwake != false) {
        getFirst(zero).y = getFirst(player).y + 1

      }
    }
  }
})

