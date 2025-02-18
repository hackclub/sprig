/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Gudatama ぐでたま! - Soy Sauce Adventures
@author: gtmsprs
@tags: ['platformer'] 
@addedOn: 2024-09-10
*/
// CONTROLS
// Press I to start game
// Use WASD to move
// DON'T TOUCH THE CATS THEY GIVE YOU COOTIES!!

//THE STORY
/* After being beaten black and blue by cats, gudetama finds himself in
the trash. As gudetama recollects himself, he realizes that his precious soy sauce 
bottle had been stolen by the cat gangoons! Searching for clues, he puts two and two 
together and finds out that an evil soy sauce company run by cats had taken his soy
sauce and wants to crack the recipe so they can make bank! Will Gudetama stop 
them before they patent his secret soy sauce recipe or will it be too late? */
//PRESS J TO START

// colors used for animated title screen
const GU1 = "h"
const GU2 = "t"
const GU3 = "o"
const GU4 = "s"
const GU5 = "a"
const GU6 = "p"

// sprites and objects declared
const gudetama = "x"
const enemy = "e"
const concrete = "c"
const brick = "b"
const SoySauce_Trophy = "n"
const box_egg = "j"
const egg_portal = "d"
const platformer = "l"
const spine = "m"
const soyboy = "y"
const waller = "r"
const waller_backgrnd = "z"
const city1 = "f"
const city2 = "i"
const city3 = "q"
const sky1 = "k"
const sky2 = "u"
const cloud1 = "g"
const cloud2 = "w"
const antenna = "v"

//sprites and interactive elements (basically what makes the game the game)
setLegend(
  [GU1, bitmap `
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [GU2, bitmap`
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
  [GU3, bitmap`
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
  [GU4, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [GU5, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [GU6, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [gudetama, bitmap`
....00000000....
...0922222990...
..0C99999992C0..
..0C99999999C0..
.0C9009999009C0.
.0C9990000999C0.
.0C9902222099C0.
.0C9990000999C0.
.0C9999999999C0.
.00909999990900.
.0C0999999990C0.
.0C9999999999C0.
..099999999990..
..0C9C0000C9C0..
...0C0....0C0...
....00....00....`],
  [enemy, bitmap`
....00.....00...
....090...020...
...02L0...0L90..
...00000000000..
..0LL2992292LL0.
..02002929900L0.
..0L22029902220.
..0L44222924420.
..0LDD20022DDL0.
..0L22088002LL0.
..00L0222290L00.
..099L000009920.
..0009023320900.
..0922033330290.
..0999200002LL0.
...00000000000..`],
  [concrete, bitmap`
.00000000000000.
01111111111111L0
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0000000000000000`],
  [brick, bitmap`
.00000000000000.
0L0LL0LLLL0LL0L0
0L0LL0LLLL0LL0L0
0000000000000000
0LL0LL0LL0LL0LL0
0LL0LL0LL0LL0LL0
0000000000000000
0L0LL0LLLL0LL0L0
0L0LL0LLLL0LL0L0
0000000000000000
0LL0LL0LL0LL0LL0
0LL0LL0LL0LL0LL0
0000000000000000
0L0LL0LLLL0LL0L0
0L0LL0LLLL0LL0L0
.00000000000000.`],
  [SoySauce_Trophy, bitmap`
.......33.......
.6....L33L....6.
..6...L00L...6..
......L00L6.....
.....L000666....
.....L00006.....
....L000000L....
....L00FF00L....
.6..L0FF0F0L..6.
....L0FFFF0L....
....L00FF00L....
....L000000L....
....L0FFFF0L....
..6.L000000L.6..
.6..L000000L..6.
.....LLLLLL.....`],
  [box_egg, bitmap`
.00000000000000.
0222222222222220
022LL222222LL220
022LL222222LL220
0222222222222220
0222222222222220
0222992992992220
0222992992992220
0222992292292220
0222222992992220
0222222222222220
0222222222222220
022331L11LL1L220
02233L1LL11L1220
0222222222222220
.00000000000000.`],
  [egg_portal, bitmap`
.....999...9....
....929999969...
...9929669669...
.999929699629...
966269299229999.
9966299292992229
..99229229929999
.969992222296699
996692222299269.
99992992229299..
9222922929226699
.999629992969669
..9926996929999.
...9669669299...
...969.99929....
....99..999.....`],
  [platformer, bitmap`
000000000000000.
0LL0LL0LL0LL0LL0
0000000000000000
0L0LL0LL0LL0LL0.
.00000000000000.
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
................`],
  [spine, bitmap`
.......00.......
......0390......
......0390......
.....033390.....
.....033390.....
....03333390....
....03333390....
...0323333390...
...0222333390...
..033233333390..
..033333333390..
.03333333333990.
.03333333333390.
0333333333333390
0333333333999930
0000000000000000`],
  [soyboy, bitmap`
00FF000FF000FF00
00FF000FF000FF00
00FF000FF000FF00
00FF000FF000FF00
00FF000FF000FF00
00FF000FF000FF00
00FF000FF000FF00
00FF000FF000FF00
00FF000FF000FF00
00FF000FF000FF00
00FF000FF000FF00
00FF000FF000FF00
00FF000FF000FF00
00FF000FF000FF00
00FF000FF000FF00
00FF000FF000FF00`],
  [waller, bitmap`
0000000000000000
0333333333333330
0333333333333330
0000000000000000
0333333333333330
0000000000000000
0000000000000000
0333333333333330
0333333333333330
0000000000000000
0000000000000000
0333333333333330
0000000000000000
0333333333333330
0000000000000000
0000000000000000`],
  [waller_backgrnd, bitmap`
0000000000000000
03330FF0F0F03330
0323000000003230
03300FFFFFF00330
0000F000000F0000
0F0F00000FF0F0F0
000F00000FF0F0F0
0F0FFFF00000F000
000FFFFF0000F0F0
0F0FF00FFF00F000
0F0FF00FFF00F0F0
0000FFFFFFFF0000
03300FFFFFF00330
0323000000003230
03330F0F0FF03330
0000000000000000`],
  [city1, bitmap`
..00000000000L..
..LLLLLLLLLLLL..
..000000000000..
..LLLLLLLLLLLL..
..L00000000000..
..LLLLLLLLLLLL..
..000000000000..
..LLLLLLLLLLLL..
..00000000000L..
..LLLLLLLLLLLL..
..000000000000..
..LLLLLLLLLLLL..
..L00000000000..
..LLLLLLLLLLLL..
..000000000000..
..LLLLLLLLLLLL..`],
  [city2, bitmap`
..LLLLLLLLLLLL..
..L9L9L9L9L9LL..
..LLLLLLLLLLLL..
..LL9L9L9L9L9L..
..LLLLLLLLLLLL..
..L9L9L9L9L9LL..
..LLLLLLLLLLLL..
..LL9L9L9L9L9L..
..LLLLLLLLLLLL..
..L9L9L9L9L9LL..
..LLLLLLLLLLLL..
..LL9L9L9L9L9L..
..LLLLLLLLLLLL..
..L9L9L9L9L9LL..
..LLLLLLLLLLLL..
..LL9L9L9L9L9L..`],
  [city3, bitmap`
..FFFFFFFFFFFF..
..LLLFLLLLFLLL..
..LLLFLLLLFLLL..
..FFFFFFFFFFFF..
..LLLFLLLLFLLL..
..LLLFLLLLFLLL..
..FFFFFFFFFFFF..
..LLLFLLLLFLLL..
..LLLFLLLLFLLL..
..FFFFFFFFFFFF..
..LLLFLLLLFLLL..
..LLLFLLLLFLLL..
..FFFFFFFFFFFF..
..LLLFLLLLFLLL..
..LLLFLLLLFLLL..
..FFFFFFFFFFFF..`],
  [antenna, bitmap`
................
................
.........0......
.........0......
.........0......
.........0......
.........0......
.........0......
.........0......
......0..0......
......0..0......
......0..0......
......0..0......
......0..0......
......0..0..00..
..000000000000..`],
  [sky1, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [sky2, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [cloud1, bitmap `
..00000000000...
.02222222222200.
.022222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
022222222222220.
.00222222222220.
...00000000000..`],
  [cloud2, bitmap `
................
................
................
................
................
.......LLLLL....
....LLL2222L....
...L22222222L...
..L2222222222L..
..L222222222LL..
...LLLLLLLLL....
................
................
................
................
................`]
);

// sfx that go brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
const portal_escape = tune `
153.84615384615384,
76.92307692307692: D5-76.92307692307692 + C5^76.92307692307692,
76.92307692307692: E5-76.92307692307692 + D5/76.92307692307692,
76.92307692307692: F5-76.92307692307692 + E5/76.92307692307692,
76.92307692307692: G5-76.92307692307692 + F5/76.92307692307692,
230.76923076923077,
76.92307692307692: A4-76.92307692307692 + F5/76.92307692307692 + E5^76.92307692307692 + G4^76.92307692307692 + D5~76.92307692307692,
153.84615384615384,
76.92307692307692: G4-76.92307692307692 + E5/76.92307692307692 + D5^76.92307692307692 + F4^76.92307692307692 + C5~76.92307692307692,
1461.5384615384614`
const arewedeaduzz = tune `
150,
37.5: D5~37.5 + B4/37.5 + D4/37.5 + G4/37.5 + C5-37.5,
37.5: D5~37.5 + B4-37.5 + A4~37.5 + G4^37.5,
37.5: D5~37.5 + C5/37.5 + G4~37.5 + F4^37.5,
37.5: C5~37.5 + G4/37.5 + E4~37.5 + C4~37.5 + D4^37.5,
37.5: B4~37.5 + A4~37.5 + F4^37.5,
37.5: A4~37.5 + G4~37.5 + C4^37.5,
37.5: F4~37.5 + D4^37.5,
37.5: E4~37.5 + D4/37.5 + C4~37.5,
37.5: D4-37.5 + C4-37.5,
37.5: C4~37.5,
675`
const gudatheme = tune`
182.9268292682927: D5/182.9268292682927 + C4~182.9268292682927,
182.9268292682927: C5^182.9268292682927 + F4/182.9268292682927 + C4/182.9268292682927 + A4-182.9268292682927,
182.9268292682927: D4/182.9268292682927 + D5-182.9268292682927,
182.9268292682927: E4/182.9268292682927,
182.9268292682927: E5/182.9268292682927 + C4^182.9268292682927 + G4-182.9268292682927,
182.9268292682927: G4/182.9268292682927,
182.9268292682927: E4/182.9268292682927 + D5~182.9268292682927,
182.9268292682927: C5-182.9268292682927 + D4^182.9268292682927,
182.9268292682927: E4/182.9268292682927 + D5^182.9268292682927,
182.9268292682927,
182.9268292682927: E4^182.9268292682927 + E5-182.9268292682927 + A4/182.9268292682927,
182.9268292682927: D5/182.9268292682927 + F4^182.9268292682927,
182.9268292682927,
182.9268292682927: F4/182.9268292682927 + D5^182.9268292682927 + D4~182.9268292682927,
182.9268292682927: F5/182.9268292682927,
182.9268292682927: F4/182.9268292682927 + C5^182.9268292682927 + D4^182.9268292682927,
182.9268292682927,
182.9268292682927: E4~182.9268292682927 + E5^182.9268292682927,
182.9268292682927: G4/182.9268292682927 + D5-182.9268292682927,
182.9268292682927: D5/182.9268292682927 + C5^182.9268292682927,
182.9268292682927: E4/182.9268292682927,
182.9268292682927: E5-182.9268292682927 + C5/182.9268292682927,
182.9268292682927,
182.9268292682927: D4/182.9268292682927 + D5~182.9268292682927 + G4-182.9268292682927,
182.9268292682927: F4/182.9268292682927 + C5/182.9268292682927 + A4~182.9268292682927,
182.9268292682927: D5/182.9268292682927 + E4^182.9268292682927,
182.9268292682927: E5/182.9268292682927 + D4-182.9268292682927 + C5~182.9268292682927 + D5-182.9268292682927,
182.9268292682927: C5/182.9268292682927 + F4/182.9268292682927 + E5^182.9268292682927,
182.9268292682927: G5^182.9268292682927 + G4-182.9268292682927,
182.9268292682927: A4/182.9268292682927 + E5/182.9268292682927 + D4-182.9268292682927 + C4~182.9268292682927,
182.9268292682927: D5/182.9268292682927,
182.9268292682927: F5^182.9268292682927 + C4-182.9268292682927 + C5/182.9268292682927`
const vikornationhowwefeeling = tune `
95.84664536741214,
95.84664536741214: G4/95.84664536741214 + C4/95.84664536741214,
191.69329073482427,
95.84664536741214: C5/95.84664536741214 + E4/95.84664536741214,
95.84664536741214: D5/95.84664536741214 + G4/95.84664536741214,
95.84664536741214,
95.84664536741214: G5/95.84664536741214 + D5/95.84664536741214,
2300.3194888178914`
const wefoundthejuanpiece = tune `
375,
37.5: B4/37.5,
37.5: F4/37.5 + C5/37.5 + B4/37.5,
37.5: D5~37.5 + C5/37.5 + G4/37.5 + F4/37.5,
37.5: E5-37.5 + G4/37.5 + D5/37.5 + B4/37.5,
37.5: E5~37.5 + F5-37.5 + A4/37.5 + C5/37.5,
37.5: D5^37.5 + F5~37.5 + B4/37.5 + G5/37.5,
37.5: G5^37.5 + F5-37.5 + C5/37.5 + A5/37.5 + E5/37.5,
37.5: F5-37.5 + D5-37.5 + A5~37.5 + E5~37.5,
37.5: A5^37.5 + F5-37.5 + G5~37.5 + B5/37.5,
37.5: F5-37.5,
37.5: A5^37.5 + G5/37.5 + B5/37.5,
37.5: A5/37.5 + B5/37.5 + G5/37.5,
37.5: A5/37.5 + B5/37.5,
337.5`
const Iamthedangerahhbeat = tune `
89.28571428571429,
89.28571428571429: C4/89.28571428571429 + E4^89.28571428571429 + F4-89.28571428571429 + B4~89.28571428571429,
89.28571428571429: C4/89.28571428571429,
89.28571428571429: C4/89.28571428571429 + F4~89.28571428571429,
89.28571428571429: C4/89.28571428571429 + C5~89.28571428571429,
89.28571428571429: C4/89.28571428571429 + A4^89.28571428571429 + G4-89.28571428571429,
89.28571428571429,
89.28571428571429: C4/89.28571428571429 + G4-89.28571428571429 + F4^89.28571428571429,
89.28571428571429: C4/89.28571428571429 + B4~89.28571428571429,
89.28571428571429: C4/89.28571428571429 + F4~89.28571428571429,
89.28571428571429: C4/89.28571428571429,
89.28571428571429: C4/89.28571428571429 + E4-89.28571428571429 + F4^89.28571428571429,
89.28571428571429: A4~89.28571428571429,
89.28571428571429: E4~89.28571428571429,
89.28571428571429: C4/89.28571428571429 + A4^89.28571428571429 + B4-89.28571428571429,
89.28571428571429: C4/89.28571428571429 + F4~89.28571428571429,
89.28571428571429: C4/89.28571428571429 + C5~89.28571428571429,
89.28571428571429: C4/89.28571428571429 + F4-89.28571428571429 + G4^89.28571428571429,
89.28571428571429: C4/89.28571428571429 + B4~89.28571428571429,
89.28571428571429,
89.28571428571429: C5-89.28571428571429 + B4^89.28571428571429,
89.28571428571429: C4/89.28571428571429 + G4~89.28571428571429,
89.28571428571429: C4/89.28571428571429,
89.28571428571429: C4/89.28571428571429 + E4-89.28571428571429 + F4^89.28571428571429 + C5~89.28571428571429,
89.28571428571429: C4/89.28571428571429,
89.28571428571429: C4/89.28571428571429 + E4~89.28571428571429 + B4~89.28571428571429,
89.28571428571429: C4/89.28571428571429,
89.28571428571429: F4~89.28571428571429,
89.28571428571429: C4/89.28571428571429 + A4~89.28571428571429,
89.28571428571429: C4/89.28571428571429 + E4^89.28571428571429 + F4-89.28571428571429,
89.28571428571429: C4/89.28571428571429 + B4~89.28571428571429,
89.28571428571429: C4/89.28571428571429 + G4^89.28571428571429 + F4-89.28571428571429`
const crossingfields = tune `
225.5639097744361: C5/225.5639097744361,
225.5639097744361: E5~225.5639097744361,
225.5639097744361: G5/225.5639097744361,
225.5639097744361: B4~225.5639097744361 + D5^225.5639097744361,
225.5639097744361,
225.5639097744361: C5/225.5639097744361 + E5~225.5639097744361,
225.5639097744361,
225.5639097744361: E5^225.5639097744361,
225.5639097744361: G5~225.5639097744361,
225.5639097744361: C5~225.5639097744361 + F5/225.5639097744361,
225.5639097744361,
225.5639097744361: G5^225.5639097744361,
225.5639097744361: D5~225.5639097744361 + E5/225.5639097744361,
225.5639097744361,
225.5639097744361: C5^225.5639097744361 + F5/225.5639097744361,
225.5639097744361,
225.5639097744361: D5~225.5639097744361 + F5^225.5639097744361,
225.5639097744361: E5/225.5639097744361,
225.5639097744361: G5~225.5639097744361,
225.5639097744361: E5^225.5639097744361 + C5/225.5639097744361,
225.5639097744361,
225.5639097744361: B4~225.5639097744361 + F5~225.5639097744361,
225.5639097744361: C5^225.5639097744361,
225.5639097744361: E5~225.5639097744361 + G5/225.5639097744361,
225.5639097744361,
225.5639097744361: B4~225.5639097744361,
225.5639097744361: A5/225.5639097744361 + D5^225.5639097744361,
225.5639097744361: F5^225.5639097744361,
225.5639097744361: G5~225.5639097744361 + E5/225.5639097744361,
225.5639097744361,
225.5639097744361: C5~225.5639097744361 + F5^225.5639097744361,
225.5639097744361: E5/225.5639097744361`
const evildungeontypebeat = tune `
150: G4~150,
150: D4/150 + E4/150 + A4/150 + C5/150,
150,
150: C4/150 + E4/150 + B4/150 + G4/150,
150: E4~150,
150: G4-150 + C5^150,
150,
150: D4/150,
150: G4~150,
150: B4-150 + E4-150,
150,
150: F4~150 + A4^150,
150,
150: B4/150 + D4/150 + G4/150,
150: C4/150 + G4/150 + F4/150,
150,
150: A4~150,
150,
150: D5/150 + E4/150 + A4/150,
150: D4~150,
150: C5/150 + G4/150 + E4/150,
150,
150: F4~150 + C5^150,
150: B4-150,
150: E4~150,
150: G4-150,
150,
150: G4~150,
150: C5/150 + G4/150 + E4/150,
150: B4/150 + E4/150 + G4/150,
150: E4~150 + A4^150,
150`

// item rules
setBackground(sky1)
setSolids([gudetama, brick, concrete, box_egg, waller, platformer, waller_backgrnd, cloud1])
setPushables({
  [gudetama]: [box_egg, gudetama],
  [box_egg]: [box_egg]
})

// TITLE SCREEN
let titleScreenLevel = 0;
const titleScreenLevels = [
  map`
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooootttoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooootttoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooootttoooooooooooooooooooooootttoooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooooottttooooooooooooooooooooottttoooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooooottttoooooooooooooooooooootttooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooootttttooooooooooooooooooottttooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooottttoooooooottttooooottttttttooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooottttooooooottttttoootttttttttooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooooooottttooooottttttttootttttttttooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooootttttooootttootttooooottttooootttttoooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooottttoootttttttttooootttttoootttttttooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooootttttttttoottttttttoooottttttooottttttttoooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooottttttttttoottttttooooootttttoootttttttttoooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooootttooootttttttttttootttoootttoottttttooottttootttooootooooooooooooooooooooooooooooooooo
ooooooooooooooooooooootttottttooootttttottttttoottttttttootttttttootttoootttooottttooooooooooooooooooooooooooooooo
ooooooooooooooooooooottttoottttoottttooootttttootttttttoootttttttootttttttttooottttttooooooooooooooooooooooooooooo
ooooooooooooooooooooottttooottttottttoootttttttootttttooooottttttoottttttttttootttttttttoooooooooooooooooooooooooo
oooooooooooootttttoootttttoottttoottttttttttttooooooooooooooottoooottttttttttotttttttttttoooooooooooooooottooooooo
oooooooooootttttttooottttttttttttotttttttttooooooooooooooooooooooooottttottttottttttttttttooootttooooooottttoooooo
oooooooootttttttttttootttttttttttootttttoooooooooooooooooooooooooooooooootttotttttttttttttoottttttoooooottttoooooo
ooooooootttttooottttoootttttttottoooooooooooooooooooooooooooooooooooooooooooottttottttttttootttttttooootttttoooooo
oooooooottttoootttttoooottttttooooooooooooooooooooooooooooooooooooooooooooooottttoototttttottttttttoootttttooooooo
ooooooootttoootttttttoootttttooooooooooooooooooooooooooooooooooooooooooooooooottoooootttttotttootttoootttttooooooo
oooooooottttttttttttttoootttooooooooootttttttttttttooooooooooooooooooooooooooooooooooottttottttttttoootttttooooooo
ooooooootttttttttottttooooooooooooooothhhhhhhhhhhhhtttttttttttttooooooooooooooooooooootttooottttttttottttttooooooo
ooooooooottttttooottttoooooooooooootthhoohhhhooohhhhhhhhhhhhhhhhttoooooooooooooooooooootoooottttttttotttttoooooooo
ooooooooooooooooootttttooooooooooothhhooohhhooooooooooooooooooohhhttoooooooooooooooooooooooootttotttottttooooooooo
ooooooooooooooooootttttoooooooooothhhhoohhhhhooooooooooooooooohhhhhhttooooooooooooooooooooooooooottootttoooooooooo
oooooooooooooooooottttooooooooootthhhhhhhhhhhhhooooooooooooohhhhhhhhhhtoooooooooooooooooooooooooooottooooooooooooo
oooooooooooooooottttttoooooooooothhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhohhhhhhtooooooooooooooooooooooooooottttooooooooooo
ooooooooooootttttttttooooooooootthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhaahhhtooooooooooooooooooooooooootttoooooooooooo
ooooooooooootttttttoooooooooottothhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhaaahhttttttttooooooooooooooooooooooooooooooooo
ooooooooooootttttooooooooottttotthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhaahhtoooooottttttoooooooooooooooooooooooooooo
ooooooooooooooooooooooooottoooothhhhhhhhhhttthhhhhhhhhhhhhhhhhhhhhhhhaahhtoooooooooootttoooooooooooooooooooooooooo
oooooooooooooooooooooooottooooothhhhhhhhhtttthhhhhhhhhhhhhhhhhhhhhhhhaahhtoooooooooooootttoooooooooooooooooooooooo
ooooooooooooooooooooootttoooooothhttthhhhttthhhhhhhhhhhhhhhhhhhhhhhhhaahhtooooooooooooooottooooooooooooooooooooooo
ooooooooooooooooottttttoooooooothtttthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhaahhtooooooooooooooootttttooooooooooooooooooo
ooooooooooooooottoooooooooooooothttthttttttthhhhhhhhhhhhhhhhhhhhhhhhhaahhtoooooooooooooooooooottoooooooooooooooooo
oooooooooooooottoooooooooooooothhhhhttooooothhhhhhhhhhhhhhhhhhhhhhhhhaahhtoooooooooooooooooooootttoooooooooooooooo
oooooooooooootoooooooooooooooothhhhttoooottthhhhhhhhhhhhhhhhhhhhhhhhhhaahtooooooooooooooooooooooottooooooooooooooo
oooooooooooottossooooooooooooothhhhhtttttthhhhhhhhhhhhhhhhhhhhthhhhhhhhhhtoooooooooooooooooooossoottoooooooooooooo
ooooooooooottosssooooooooooooothhhhhthhhhhhhhhhhhhhhhhhhhhhhhhthhhhhhhhhttoooooooooooooooooooosssoottooooooooooooo
oooooooooootosssooooooooooooottthhhhhhhhhhhhhhhhhthhhhhhhhhhhhthhhhhhhhhhhtooooooooooooooooooosssoootooooooooooooo
oooooooooootossssooooooooooothhtthhhhhhhhhhtttttthhhthhhhhhhhhhthhhhhttthhhtoooooooooooooooosssssoootooooooooooooo
ooooooooooottossssooooooooothhhhttttttttttthhhhhhhhhttttttttttttthhhtooothhtoooooooooooooooosssssoottooooooooooooo
ooooooooooottoosssoooooooootthhtoooooooooothhhhhhhhtoooooooooooootttoooootttooooooooooooooosssssoottoooooooooooooo
ooooooooooootoossssssssoooootttoooooooooooottttttttooooooooooooooooooooooooooooooooooooooosssssoottooooooooooooooo
ooooooooooooottoossssssssooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooossssssoottoooooooooooooooo
oooooooooooooottossssssssssssssooooooooooooooooooooooooooooooooooooooooooooooooooooooooosssssoottooooooooooooooooo
ooooooooooooooottooooooosssssssssooooooooooooooooooooooooooooooooooooooooooooooooooooosssssooottoooooooooooooooooo
ooooooooooooooootttttttoooooossssooooooooooooooooooooooooooooooooooooooooooooooooossssssssootttooooooooooooooooooo
oooooooooooooooooooooottttttooossssssoooooooooooooooooooooooooootttttttooooooooosssssssssoottooooooooooooooooooooo
ooooooooooooooooooooooooooottooossssssooooooooooooooooooooooottttooooottttoooooossssssssoottoooooooooooooooooooooo
oooooooooooooooooooooooooooottooosssssssssoooooooooooooooootttooooooooooottttttoossssoootttooooooooooooooooooooooo
ooooooooooooooooooooooooooooottoooossssssssssssssooooooootttoooooooooooooooooottooooooottooooooooooooooooooooooooo
ooooooooooooooooooooooooooooootttoooosssssssssssssoooootttoooooooooooooooooooootttttttttoooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooootttttooooooosssssooottttoooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooootttttttoooooottttooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooottooooooooooooooottttttttoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooootttoottooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooottttotootoottttttttoooooooooooottooooooooooootttoooooooootttttooooooooooooooooooooooooooooo
oooooooooooooooooooooottttootoototttttttttttoooootttttttooooooooooootttoottoooootttttooooooooooooooooooooooooooooo
ooooooooooooooooooooottttoooottoottooooootttoooootttttttooooooootttttttttttooootttttttoooooooooooooooooooooooooooo
ooooooooooooooooooootttoooooooooooooooottttoooooooootttooooooooottttttttttoooootttttttoooooooooooooooooooooooooooo
oooooooooooooooooootttoooooooooooooooottttoottoooooottottttoooooooootttooooooootttttttoooooooooooooooooooooooooooo
ooooooooooooooooootttooooooooooooooootttoooottoooooottottttoooooooootttoottooootttttttoooooooooooooooooooooooooooo
oooooooooooooooooottttooooooooooooootttoottottoooooottooooooooootttttttttttooootttttttoooooooooooooooooooooooooooo
ooooooooooooooooooottttooooooooooottttooottooooooootttoooooooooottttttttttooooootttttooooooooooooooooooooooooooooo
oooooooooooooooooooottttooooooooootttoooottooooooootttooooooooooooootttooooooooootttoooooooooooooooooooooooooooooo
ooooooooooooooooooooottttooooooooottttooooooooooootttoooooooooooottttttooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooottttoooooooootttooooooooooootttottoooooooottooottttooooooootttoooooooooooooooooooooooooooooo
oooooooooooooooooooooootttttoooooooottttoooooooootttootttttttoootttttttttttoooootttttooooooooooooooooooooooooooooo
oooooooooooooooooooooooottttoooooooootttttttoooootttooottttttooootttottoottooooootttoooooooooooooooooooooooooooooo
oooooooooooooooooooooooootttooooooooootttttooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooopppooopppoopoopoooopppoooopooopooopoopppooppppooooopooooppooopooopoppppopooopopppppopooopoppppooppppooooooo
oooooopooopopooopopoopooopooopoopopoopooopopooopopooooooopopoopoopoopooopopooooppoopooopooopooopopooopopoooooooooo
oooooopoxooopooopopoopooopoooooopopoopooopopooooopooooooopopoopooopopooopopoooopopopooopooopooopopooopopoooooooooo
ooooooopppoopooopoopppoooopppooopppoopooopopoooooppppoooopppoopooopopooopoppppopopopooopooopooopopooopoppppooooooo
oooooooooopopooopoooopooooooopopooopopooopopooooopoooooopooopopooopoopopoopoooopooppooopooopooopoppppoopoooooooooo
oooooopooopopooopoooopooopooopopooopopooopopooopopoooooopooopopoopooopopoopoooopooopooopooopooopopooopopoooooooooo
ooooooopppooopppoopppooooopppoopooopoopppooopppooppppooopooopooppooooopoooppppopooopooopoooopppoopooopoppppooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo`,
  map`
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooppppopppoopppopppopppoooopppopppoopooopppoopppoppooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooopoopopoopopooopooopoooooopoooopoopopoopoopoopooppooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooopoopopoopopooopooopoooooopoooopoopopoopoopoopooppooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooopppoopppoopppopppopppoooopppoopoopppoopppooopooppooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooopoooopoopopooooopooopoooooopoopopooopopoopoopooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooopoooopoopopppopppopppoooopppoopopooopopoopoopooppooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooootoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooooooootttooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooooooootttooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooooooootttooooooooooooooooooootttoooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooooooootttoooooooooooooooooooottttooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooooooootttooooootttttooooooooottttooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooooooootttooooottttttttoooooottttoooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooooottttttoooottttootttoooooottttoooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooootttttttttoootttooootttootttttttoooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooootttoooootttttottttoottttttttttttotttttttoooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooootooootttoooootttooottttootttttttttttoottttttttooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooottoooottttooootttooootttoottttooooooooootttttttooootttoooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooootttooootttooootttooottttoottttooootttoooootttooootttttttoooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooottttoooottttooottttootttttootttttootttoooottttooottttttttoooottoooooooooooooooooooooooooooooooo
oooooooooooooooooootttttoootttttootttttttttttoootttttttttoootttttoottttttttttootttoooooooooooooooooooooooooooooooo
ooooooooooooooooooootttttotttttttootttttttottooottttttttoooottttooottttoottttoottttooooooooooooooooooooootoooooooo
ooooooooooottttoooootttttttttttttooottttttoooooooottttoooooottttooottttttttttottttttooooooooooooooooooootttooooooo
ooooooooottttttttooootttttttttttttoooooooooooooooooooooooooootttooottttttttttottttttotttooooooooooooooottttooooooo
oooooooottttttttttoooottttttttottoooooooooooooooooooooooooooooooooootttttttttotttttttttttoooooooooooooottttooooooo
ooooooootttttttttttooootttttttoooooooooooooooooooooooooooooooooooooootttttttoottttttttttttooootttoooootttttooooooo
ooooooottttooottttttooootttttooooooooooooooooooooooooooooooooooooooooooootttoottttttttttttoootttttooootttttooooooo
ooooootttooooottotttooooooooooooooooooooooooooooooooooooooooooooooooooooottooootttotttttttootttttttoootttttooooooo
ooooootttooootttottttoooooooooooooooooooooooooooooooooooooooooooooooooooooooooottootttotttottttttttoootttttooooooo
ooooootttttttttootttttooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooottootttottttootttootttttooooooo
oooooootttttttootttttoooooooooooooooooootttttttttooooooooooooooooooooooooooooooooooooootttotttttttttooottttooooooo
oooooooootttttootttttooooooooooooooootttthhhhhhhtttoooooooooooooooooooooooooooooooooooottootttttttttoootttoooooooo
oooooooooooooootttttooooooooooooooottthhhhhhhhhhhhhtttttttttttooooooooooooooooooooooooooooootttttttooootttoooooooo
oooooooooooottttttttooooooooooooooothhoohoooohhhhhhhhhhhhhhhhhttooooooooooooooooooooooooooooooootttooooooooooooooo
oooooooooootttttttttoooooooooooooothhoohhoooooooooooooooohhhhhhtttoooooooooooooooooooooooooooooottooootttooooooooo
ooooooooooottttttttooooooooooooootthhhhhhhhhhoooooooooooooohhhhhhttttooooooooooooooooooooooooooooooooottttoooooooo
ooooooooooootttttoooooooooooooooothhhhhhhhhhhhhhhhhhhhhoooooohhhhhhhttoooooooooooooooooooooooooooooooottttoooooooo
ooooooooooooooooooooooooooooooooothhhhhhhhhhhhhhhhhhhhhhhhoooohhhhhhhhtoooooooooooooooooooooooooooooootttooooooooo
oooooooooooooooooooooooooooooooothhhhhhhhhhhhhhhhhhhhhhhhhhhhoohhhhhhhttooooooooooooooooooooooooooooooottooooooooo
oooooooooooooooooooooooooooooooothhhhhhhhttthhhhhhhhhhhhhhhhhhhhhohhahhtoooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooothhhhhhhtttthhhhhhhhhhhhhhhhhhhhoohhaahttooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooothttthhhttthhhhhhhhhhhhhhhhhhhhhhhhhaaahtooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooothtttthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhaahtooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooothttthhttttthhhhhhhhhhhhhhhhhhhhhhhhhhaahtooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooothhhhhttoootthhhhhhhhhhhhhhhhhhhhhhhhhaahtooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooootthhtttoootthhhhhhhhhhhhhhhhhhhhhhhhhhaahttoooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooootttttttttthhtooootthhhhhhhhhhhhhhhhhhhhhhhhhhhhahhttooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooootttttooooooothttttttthhhhhhhhhhhhhhhhhhhhhthhhhhhhahhhttttoooooooooooooooooooooooooooooooooooo
ooooooooooooooooootttooooooooooothhthhhhhhhhhhttthhhthhhhhhhhhthhhhhhhhtthtootttoooooooooooooooooooooooooooooooooo
ooooooooooooooooottoooooooooootthhhhhhhhhhtttthhhhhhhthhhhhhhhthhhhhtttothtoooottttttttooooooooooooooooooooooooooo
oooooooooooooooottoossooooooothhthhhttttttthhhhhhhhhttttttttttthhhhtttooottoooooooooootttooooooooooooooooooooooooo
ooooooooooooooottoossoooooooothhhtttoooooottthhhhhtttooooooooootttttoooooooooooooooooooottttoooooooooooooooooooooo
ooooooooooooottooossooooooooootttooooooooooottttttoooooooooooooooooooooooooooooooooooooooootttoooooooooooooooooooo
oooooooooooootooossooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooossssooottooooooooooooooooooo
oooooooooooottoosssooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooosssssotooooooooooooooooooo
ooooooooooootoosssssoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooosssssotooooooooooooooooooo
ooooooooooootoossssssssssooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooossssottooooooooooooooooooo
ooooooooooootoossssssssssssssoooooooooooooooooooooooooooooooooooooooooosssssssooooooosssssoootoooooooooooooooooooo
oooooooooooottoosssssssssssssssooooooooooooooooooooooooooooooootttttoooosssssssssssosssssooootoooooooooooooooooooo
ooooooooooooottoooooooooosssssssssssssooooooooooooooooooooottttttootttooooossssssssssssoootttooooooooooooooooooooo
oooooooooooooottttttttttoooossssssssssssssooooooooooooooottttoooooooottttooooossossssoootttooooooooooooooooooooooo
ooooooooooooooooooooooottttoooooosssssssssssssssssssssoottooooooooooooootttttoooooooooootooooooooooooooooooooooooo
oooooooooooooooooooooooooottttttoooooossssssssssssssssotooooooooooooooooooootttttttttttttooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooottttttoooooosssssoooooottoooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooootttttttoooooottttttooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooottttttttooooooooooooooootttooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooottttooootooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooootoooooooooootttooooooooooooootttoooooooootttttoottoooottooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooottootttoooottttttoooooooooooootttoooooooooottttttttooottttoooooooooooooooooooooooooooooooo
oooooooooooooooooooooootttotoootootttootttoooooootttoottooooooootttttttttooooottttoooooooooooooooooooooooooooooooo
ooooooooooooooooooooooottootoootoottooottoootttootttttttoooooootttttttttoooooottttoooooooooooooooooooooooooooooooo
ooooooooooooooooooooottttoootttoootoooottoootttoooootttttoooooottttttttooooooottttoooooooooooooooooooooooooooooooo
ooooooooooooooooooootttttooooooooooooottooootttooooottttttooooooooottttoottooottttoooooooooooooooooooooooooooooooo
oooooooooooooooooooottttoooooooooooootttoooooooooooottotttooooootttttttttttooottttoooooooooooooooooooooooooooooooo
ooooooooooooooooooootttttooooooooooootttootooooooootttoootoooooottttttttttooooottooooooooooooooooooooooooooooooooo
ooooooooooooooooooootttttooooooooooottttottooooooootttooooooooooootttttoooooooottooooooooooooooooooooooooooooooooo
oooooooooooooooooooootttttoooooooootttooottoooooooottoooooootoootttttttooooooootoooooooooooooooooooooooooooooooooo
ooooooooooooooooooooootttttoooooooottttoooooooooootttoottttttootttootttttooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooottttooooooooottttoooooooootttottttttoooottttttottttooottttoooooooooooooooooooooooooooooooo
oooooooooooooooooooooooootttooooooooootttttoooooottoootttooooooooottttooottoooottooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooottoooooooooootttoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooopppooopppoopoopoooopppoooopooopooopoopppooppppooooopooooppooopooopoppppopooopopppppopooopoppppooppppooooooo
oooooopooopopooopopoopooopooopoopopoopooopopooopopooooooopopoopoopoopooopopooooppoopooopooopooopopooopopoooooooooo
oooooopoxooopooopopoopooopoooooopopoopooopopooooopooooooopopoopooopopooopopoooopopopooopooopooopopooopopoooooooooo
ooooooopppoopooopoopppoooopppooopppoopooopopoooooppppoooopppoopooopopooopoppppopopopooopooopooopopooopoppppooooooo
oooooooooopopooopoooopooooooopopooopopooopopooooopoooooopooopopooopoopopoopoooopooppooopooopooopoppppoopoooooooooo
oooooopooopopooopoooopooopooopopooopopooopopooopopoooooopooopopoopooopopoopoooopooopooopooopooopopooopopoooooooooo
ooooooopppooopppoopppooooopppoopooopoopppooopppooppppooopooopooppooooopoooppppopooopooopoooopppoopooopoppppooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo`,
  map`
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooppppopppoopppopppopppoooopppopppoopooopppoopppoppooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooopoopopoopopooopooopoooooopoooopoopopoopoopoopooppooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooopoopopoopopooopooopoooooopoooopoopopoopoopoopooppooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooopppoopppoopppopppopppoooopppoopoopppoopppooopooppooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooopoooopoopopooooopooopoooooopoopopooopopoopoopooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooopoooopoopopppopppopppoooopppoopopooopopoopoopooppooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooootttoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooootttoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooootttoooooooooooooooooooooootttoooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooooottttooooooooooooooooooooottttoooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooooottttoooooooooooooooooooootttooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooootttttooooooooooooooooooottttooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooottttoooooooottttooooottttttttooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooottttooooooottttttoootttttttttooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooooooottttooooottttttttootttttttttooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooootttttooootttootttooooottttooootttttoooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooottttoootttttttttooootttttoootttttttooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooootttttttttoottttttttoooottttttooottttttttoooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooottttttttttoottttttooooootttttoootttttttttoooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooootttooootttttttttttootttoootttoottttttooottttootttooootooooooooooooooooooooooooooooooooo
ooooooooooooooooooooootttottttooootttttottttttoottttttttootttttttootttoootttooottttooooooooooooooooooooooooooooooo
ooooooooooooooooooooottttoottttoottttooootttttootttttttoootttttttootttttttttooottttttooooooooooooooooooooooooooooo
ooooooooooooooooooooottttooottttottttoootttttttootttttooooottttttoottttttttttootttttttttoooooooooooooooooooooooooo
oooooooooooootttttoootttttoottttoottttttttttttooooooooooooooottoooottttttttttotttttttttttoooooooooooooooottooooooo
oooooooooootttttttooottttttttttttotttttttttooooooooooooooooooooooooottttottttottttttttttttooootttooooooottttoooooo
oooooooootttttttttttootttttttttttootttttoooooooooooooooooooooooooooooooootttotttttttttttttoottttttoooooottttoooooo
ooooooootttttooottttoootttttttottoooooooooooooooooooooooooooooooooooooooooooottttottttttttootttttttooootttttoooooo
ooooooootttoooottttooooootttttoooooooooooooooooooooooooooooooooooooooooooooooottootootttttottttttttoootttttooooooo
ooooooootttoootttttttoootttttooooooooooooooooooooooooooooooooooooooooooooooooooooooootttttotttootttoootttttooooooo
oooooooottttttttttttttoootttooooooooootttttttttttttooooooooooooooooooooooooooooooooooottttottttttttoootttttooooooo
ooooooootttttttttottttooooooooooooooothhhhhhhhhhhhhtttttttttttttooooooooooooooooooooootttooottttttttottttttooooooo
ooooooooottttttooottttoooooooooooootthhoohhooooohhhhhhhhhhhhhhhhttoooooooooooooooooooootoooottttttttotttttoooooooo
ooooooooooooooooootttttooooooooooothhhooohhhooooooooooooooooooohhhttoooooooooooooooooooooooootttotttottttooooooooo
ooooooooooooooooootttttoooooooooothhhhoohhhhhooooooooooooooooohhhhhhttooooooooooooooooooooooooooottootttoooooooooo
oooooooooooooooooottttooooooooootthhhhhhhhhhhhhooooooooooooohhhhhhhhhhtoooooooooooooooooooooooooooottooooooooooooo
oooooooooooooooottttttoooooooooothhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhohhhhhhtooooooooooooooooooooooooooottttooooooooooo
ooooooooooootttttttttooooooooootthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhaahhhtooooooooooooooooooooooooootttoooooooooooo
ooooooooooootttttttoooooooooottothhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhaaahhttttttttooooooooooooooooooooooooooooooooo
ooooooooooootttttooooooooottttotthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhaahhtoooooottttttoooooooooooooooooooooooooooo
ooooooooooooooooooooooooottoooothhhhhhhhhhttthhhhhhhhhhhhhhhhhhhhhhhhaahhtoooooooooootttoooooooooooooooooooooooooo
oooooooooooooooooooooooottooooothhhhhhhhhtttthhhhhhhhhhhhhhhhhhhhhhhhaahhtoooooooooooootttoooooooooooooooooooooooo
oooooooooooooootttttootttoooooothhttthhhhttthhhhhhhhhhhhhhhhhhhhhhhhhaahhtooooooooooooooottooooooooooooooooooooooo
oooooooooooootttooottttoooooooothtttthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhaahhtooooooooooooooootttttooooooooooooooooooo
oooooooooooootooooooooooooooooothttthttttttthhhhhhhhhhhhhhhhhhhhhhhhhaahhtoooooooooooooooooooottoooooooooooooooooo
oooooooooooottoooooooooooooooothhhhhttoooootthhhhhhhhhhhhhhhhhhhhhhhhaahhtoooooooooooooooooooootttoooooooooooooooo
ooooooooooottooooooooooooooooothhhhttoooottthhhhhhhhhhhhhhhhhhhhhhhhhhaahtooooooooooooooooooooooottooooooooooooooo
oooooooooootoossoooooooooooooothhhhhtttttthhhhhhhhhhhhhhhhhhhhthhhhhhhhhhtoooooooooooooooooooossoottoooooooooooooo
oooooooooottoossoooooooooooooothhhhhthhhhhhhhhhhhhhhhhhhhhhhhhthhhhhhhhhttoooooooooooooooooooosssoottooooooooooooo
ooooooooootoosssooooooooooooottthhhhhhhhhhhhhhhhhthhhhhhhhhhhhthhhhhhhhhhhtooooooooooooooooooosssoootooooooooooooo
ooooooooootossssoooooooooooothhtthhhhhhhhhhtttttthhhthhhhhhhhhhthhhhhttthhhtoooooooooooooooosssssoootooooooooooooo
ooooooooootoossssoooooooooothhhhttttttttttthhhhhhhhhttttttttttttthhhtooothhtoooooooooooooooosssssoottooooooooooooo
oooooooooottooosssoooooooootthhtoooooooooothhhhhhhhtoooooooooooootttoooootttooooooooooooooosssssoottoooooooooooooo
oooooooooootttoosssssssoooootttoooooooooooottttttttooooooooooooooooooooooooooooooooooooooosssssoottooooooooooooooo
ooooooooooooottosssssssssooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooossssssoottoooooooooooooooo
oooooooooooooottossssssssssssssooooooooooooooooooooooooooooooooooooooooooooooooooooooooosssssoottooooooooooooooooo
ooooooooooooooottooooooosssssssssooooooooooooooooooooooooooooooooooooooooooooooooooooosssssooottoooooooooooooooooo
ooooooooooooooootttttttoooooossssooooooooooooooooooooooooooooooooooooooooooooooooossssssssootttooooooooooooooooooo
oooooooooooooooooooooottttttooossssssoooooooooooooooooooooooooootttttttooooooooosssssssssoottooooooooooooooooooooo
ooooooooooooooooooooooooooottooossssssooooooooooooooooooooooottttooooottttoooooossssssssoottoooooooooooooooooooooo
oooooooooooooooooooooooooooottooosssssssssoooooooooooooooootttooooooooooottttttoossssoootttooooooooooooooooooooooo
ooooooooooooooooooooooooooooottoooossssssssssssssooooooootttoooooooooooooooooottooooooottooooooooooooooooooooooooo
ooooooooooooooooooooooooooooootttoooosssssssssssssoooootttoooooooooooooooooooootttttttttoooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooootttttooooooosssssooottttoooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooootttttttoooooottttooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooottooooooooooooooottttttttoooooooooooooottoottoooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooootttoottooooooooooooooooooooooooooooooooottttttttoooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooottttotootoottttttttoooooooooooottoooooooootttttttttooooootttttooooooooooooooooooooooooooooo
oooooooooooooooooooooottttootoototttttttttttoooootttttttooooooooooootttttoooooootttttooooooooooooooooooooooooooooo
ooooooooooooooooooooottttoooottoottooooootttoooootttttttooooooottttottoooooooootttttttoooooooooooooooooooooooooooo
ooooooooooooooooooootttoooooooooooooooottttoooooooootttooooooootttttttoooooooootttttttoooooooooooooooooooooooooooo
oooooooooooooooooootttoooooooooooooooottttoottoooooottottttooooottttttttttoooootttttttoooooooooooooooooooooooooooo
ooooooooooooooooootttooooooooooooooootttoooottoooooottottttooooooooottttttoooootttttttoooooooooooooooooooooooooooo
oooooooooooooooooottttooooooooooooootttoottottoooooottoooooooooooooottoooooooootttttttoooooooooooooooooooooooooooo
ooooooooooooooooooottttooooooooooottttooottooooooootttoooooooooootttttooooooooootttttooooooooooooooooooooooooooooo
oooooooooooooooooooottttooooooooootttoooottooooooootttooooooooootttttttooooooooootttoooooooooooooooooooooooooooooo
ooooooooooooooooooooottttooooooooottttooooooooooootttoooooooooottootttttoooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooottttoooooooootttooooooooooootttottooooooottotttotttooooooootttoooooooooooooooooooooooooooooo
oooooooooooooooooooooootttttoooooooottttoooooooootttootttttttootttttoottttooooootttttooooooooooooooooooooooooooooo
oooooooooooooooooooooooottttoooooooootttttttoooootttooottttttoootttooootttoooooootttoooooooooooooooooooooooooooooo
oooooooooooooooooooooooootttooooooooootttttooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooopppooopppoopoopoooopppoooopooopooopoopppooppppooooopooooppooopooopoppppopooopopppppopooopoppppooppppooooooo
oooooopooopopooopopoopooopooopoopopoopooopopooopopooooooopopoopoopoopooopopooooppoopooopooopooopopooopopoooooooooo
oooooopoxooopooopopoopooopoooooopopoopooopopooooopooooooopopoopooopopooopopoooopopopooopooopooopopooopopoooooooooo
ooooooopppoopooopoopppoooopppooopppoopooopopoooooppppoooopppoopooopopooopoppppopopopooopooopooopopooopoppppooooooo
oooooooooopopooopoooopooooooopopooopopooopopooooopoooooopooopopooopoopopoopoooopooppooopooopooopoppppoopoooooooooo
oooooopooopopooopoooopooopooopopooopopooopopooopopoooooopooopopoopooopopoopoooopooopooopooopooopopooopopoooooooooo
ooooooopppooopppoopppooooopppoopooopoopppooopppooppppooopooopooppooooopoooppppopooopooopoooopppoopooopoppppooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo`,
  map`
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooooooootooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooottoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooottoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooottooooooooooooooooooootttooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooottooooooooooooooooooootttooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooottoooooottttoooootttottttooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooottttooooottttttoooottttttttooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooottttttoooottttttttoootttttttoooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooottooooottttttttooottttoootttooottttttttoooooooooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooottoooottttttttttootttooottttoooottttttttooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooottooootttooottttootttttoottttttttttoooottttttttooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooootttoooottttootttoootttttoottttttttooooootttttoooootttttoooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooottttooottttootttoootttttootttoooooottooottttoooootttttttooottoooooooooooooooooooooooooooooooooo
oooooooooottttooooottttooottttoottttttttttttotttttttttttooottttoooottttttttootttoooooooooooooooooooooooottoooooooo
ooooooootttttttoooottttoottttttottttttttttttoottttttttttooottttoootttttttttootttttoooooooooooooooooooooottoooooooo
ooooooootttttttttoootttttttttttoottttttoottoootttttttttoooottttooottttoottttottttttttttoooooooooooooooottttooooooo
oooooootttooottttooottttttttttttoottttooooooooooottttttoooottttooottttttttttotttttttttttooooooooooooooottttooooooo
oooooootttooootttooootttttttttttoooooooooooooooooooooooooootttoooootttttttttotttttttttttoooooooooooooootttttoooooo
oooooootttoootttttooottttttttottoooooooooooooooooooooooooooooooooooottootttoottttttttttttoootttttooooottttttoooooo
oooooootttttttttttoooottttttooooooooooooooooooooooooooooooooooooooooooootttoottttttttttttoootttttttooottttttoooooo
oooooootttttttttttooooottttooooooooooooooooooooooooooooooooooooooooooooootoootttootttttttoottttttttooottttttoooooo
oooooooottttttttttoooooooooooooooooooooooooooooooooooooooooooooooooooooooooootttootttotttootttttttttoottttttoooooo
oooooooootttoottttooooooooooooooooooooooooooooooooooooooooooooooooooooooooooottooottootttootttoottttootttttooooooo
oooooooooooooottttooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooootoootttoottttottttootttttooooooo
oooooooooooooottttoooooooooooooooooottttttttttttoooooooooooooooooooooooooooooooooooooottoootttttttttootttttooooooo
ooooooootooooottttooooooooooooooooothhhhhhhhhhhhtttooooooooooooooooooooooooooooooooooooooootttttttttootttttooooooo
oooooootttoootttttoooooooooooooooothhhoooohhhhhhhhtttttttttttttttoooooooooooooooooooooooooootttotttooottttoooooooo
ooooooottttttttttooooooooooooooooothhhooohhhhhoohhhhhhhhhhhhhhhhhttoooooooooooooooooooooooooooootttoooottooooooooo
oooooooottttttttooooooooooooooooothhhhhhhhhhooooooooooooohhhhhhhhhhttooooooooooooooooooooooooooottoootoooooooooooo
oooooooooottttoooooooooooooooooothhhhhhhhhhhhhoooooooooooooohhhhhhhhhtooooooooooooooooooooooooooooootttooooooooooo
oooooooooooooooooooooooooooooooothhhhhhhhhhhhhhhhhhhhhhhhooooohhhhhhhhtoooooooooooooooooooooooooooootttttooooooooo
oooooooooooooooooooooooooooooooothhhhhhhhhhhhhhhhhhhhhhhhhooooohhoohhhttooooooooooooooooooooooooooooottttooooooooo
oooooooooooooooooooooooooooooooothhhhhhhhhhhhhhhhhhhhhhhhhhhhohhooohhhhtoooooooooooooooooooooooooooooottoooooooooo
oooooooooooooooooooooooooooooooothhhhhhhhttthhhhhhhhhhhhhhhhhhhhhhhhaahttooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooothhttthhhtttthhhhhhhhhhhhhhhhhhhhhhhhhaahtooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooothtttthhhttthhhhhhhhhhhhhhhhhhhhhhhhhhaahtooooooooooooooooooooooooooooooooooooooooo
ooooooooooooooooooooooooottttttthttthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhaahtoooooottttttttooooooooooooooooooooooooooo
oooooooooooooooooooooootttooooothhhhhttttthhhhhhhhhhhhhhhhhhhhhhhhhhhaahttttttttooooootttttooooooooooooooooooooooo
oooooooooooooooooooootttoooooooothhtttooothhhhhhhhhhhhhhhhhhhhhhhhhhhaahttoooooooooossoooottoooooooooooooooooooooo
oooooooooooooooooootttooosoooooothhtooootthhhhhhhhhhhhhhhhhhhhhhhhhhhhahhttooooooooossssooottooooooooooooooooooooo
ooooooooooooooooootttoosssoooooothttttttthhhhhhhhhhhhhhhhhhhhhthhhhhhhahhhttooooooooossssoootooooooooooooooooooooo
ooooooooooooooooootooosssooooooothhthhhhhhhhhhttthhhhhhhhhhhhhthhhhhhhhhhhhtoooooooooooossoottoooooooooooooooooooo
ooooooooooooooooottosssssoooootthhhhhhhhhhhttthhhhhhhhhhhhhhhthhhhhhtttthhtoooooooooooooossoootooooooooooooooooooo
oooooooooooooooottoosssoooooothhthhhtttttttothhhhhhhttttttttttthhhhhtoothhtoooooooooooooosssootooooooooooooooooooo
ooooooooooooooottoosssooooooothhhtttoooooooottthhhtttooooooooootttttoootttoooooooooooooooosssotooooooooooooooooooo
oooooooooooooootoosssoooooooootttooooooooooooottttoooooooooooooooooooooooooooooooooooooooosssottoooooooooooooooooo
oooooooooooooottoosssoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooossssootoooooooooooooooooo
oooooooooooooottossssooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooosssssootoooooooooooooooooo
ooooooooooooootoossssoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooosssssootooooooooooooooooooo
ooooooooooooootoossssssooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooossssssottooooooooooooooooooo
oooooooooooooottoossssssssoooooosssssooooooooooooooooooooooooooooooooooooooooooooooosssssssootoooooooooooooooooooo
ooooooooooooooootooooossssssssssssssssssssssoooooooooooooooooooooooooooooooooooooosssssssooootoooooooooooooooooooo
oooooooooooooooottooooooossssssssssssssssssssssssssoooooooooooooooooooooooossoooossssssoooottooooooooooooooooooooo
oooooooooooooooootttttttoooooosssoooooooooooooossssssssoooooooottttttooooossssssssssssooottooooooooooooooooooooooo
oooooooooooooooooooooottttoooooooooottttttttttoooooooooottttttttooootttoooooossssssooooottoooooooooooooooooooooooo
ooooooooooooooooooooooooootttttttttttoooooooottttttttttttooooooooooooottttooooooooottttttooooooooooooooooooooooooo
ooooooooooooooooooooooooooooooooooooootttooooooooooooooooooooooooooooooootttttttttttoooooooooooooooooooooooooooooo
oooooooooooooooooooooootttoooooooooottttttoooooooooooottttoooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooootttttooooooooottttotttoooooooooottttoooooooooooottooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooottttttooooooootttoootttooooooooootttooooooooooootttooooooooooottttoooooooooooooooooooooooooooo
oooooooooooooooooootttttoooooooooottooootttooooooooottttooooooooooootttooottoooootttttoooooooooooooooooooooooooooo
ooooooooooooooooootttttoooootttooootooottttooooottoottttoooooooooottttttttttoooootttttoooooooooooooooooooooooooooo
oooooooooooooooootttttooooottottoooooootttoooooottttttttttooooooottttttttttooooottttttoooooooooooooooooooooooooooo
ooooooooooooooootttttoooooottottoooooootttottooottttttttttttooooottttttooooooooottttttoooooooooooooooooooooooooooo
ooooooooooooooootttttoooooootttooooooottttottooooottttttttttooooooootttooooooooottttttoooooooooooooooooooooooooooo
oooooooooooooooootttttoooooooooooooootttooottoooootttttotttoooooooootttoootooooottttttoooooooooooooooooooooooooooo
oooooooooooooooooottttooooooooooooootttoooottoooooottttoooooooootttttttttttooooottttttoooooooooooooooooooooooooooo
ooooooooooooooooooottttooooooooooootttoottoooooooootttoooooooooottttttttttooooooottttooooooooooooooooooooooooooooo
oooooooooooooooooootttttoooooooooottttoottoooooootttttoooottooooooootttooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooottttttooooooootttooottooooootttttoottttooooooottttttttoooooootttttoooooooooooooooooooooooooooo
ooooooooooooooooooooottttttooooooottttoooooooooottttootttttoooooottttttttttoooootttttttooooooooooooooooooooooooooo
ooooooooooooooooooooootttttooooooottttttttoooooottooottttooooooottoottttttttooootttttttooooooooooooooooooooooooooo
oooooooooooooooooooooootttooooooooottttttooooooooooooooooooooooootttttoootttooooootttooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
ooooooopppooopppoopoopoooopppoooopooopooopoopppooppppooooopooooppooopooopoppppopooopopppppopooopoppppooppppooooooo
oooooopooopopooopopoopooopooopoopopoopooopopooopopooooooopopoopoopoopooopopooooppoopooopooopooopopooopopoooooooooo
oooooopoxooopooopopoopooopoooooopopoopooopopooooopooooooopopoopooopopooopopoooopopopooopooopooopopooopopoooooooooo
ooooooopppoopooopoopppoooopppooopppoopooopopoooooppppoooopppoopooopopooopoppppopopopooopooopooopopooopoppppooooooo
oooooooooopopooopoooopooooooopopooopopooopopooooopoooooopooopopooopoopopoopoooopooppooopooopooopoppppoopoooooooooo
oooooopooopopooopoooopooopooopopooopopooopopooopopoooooopooopopoopooopopoopoooopooopooopooopooopopooopopoooooooooo
ooooooopppooopppoopppooooopppoopooopoopppooopppooppppooopooopooppooooopoooppppopooopooopoooopppoopooopoppppooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo` 
];

let isInTitleScreen = true; // Track whether we're in the title screen

let playback = playTune(gudatheme, Infinity); // Start playing the theme on the title screen

// Display the initial title screen
setMap(titleScreenLevels[titleScreenLevel]);

// Cycle through the title screen maps periodically
setInterval(() => {
  if (isInTitleScreen) {
    titleScreenLevel = (titleScreenLevel + 1) % titleScreenLevels.length;
    setMap(titleScreenLevels[titleScreenLevel]);
  }
}, 220);

// ALL LEVELS
let currentLevel = 0;
const levels = [
  map`
b.w......w.
b....w.....
bj.w..v....
bjj...y.w..
bjj.w.y.v.w
bjjj..y.i..
bjjjj.yfi.d
bxjjjjyfiq.
ccccccccccc`, //level 0
  map`
...w......w
w......w...
....w.....d
l.......bbb
bb.w......b
.v.......lb
.iv......bb
xif.m.m.mmb
ccccccccccc`, //level 1
  map`
...w.....w.
x.....w.mmm
bb......bbb
bb.....bw..
bbb.......l
bb....wvy..
bb.....iy..
bbemmmmiy.d
ccccccccccc`, //level 2
  map`
........w.....
..w.......jj..
........jjjjjw
......w.jjjv..
w......jjjji..
.......bbbbbbb
.....l.....i..
.........w.if.
..lb.......if.
x..b.......ifd
cmmcmmmmmmmccc`, //level 3
  map`
e.w.........e
ee.jx...wjeee
bbbbb...bbbbb
...w.......wv
w........w..z
..f..w..v...r
.wf.v...i..wr
..f.q...i...r
emfmq..mimmer
ccccccdcccccc`, //level 4
  map`
..w.........w..zy
.......b......lzy
x...b....mwm.m.zy
bb..w....b.b.bvzy
bmmm..m.......izy
.bbbvbbmw...mmizy
w...q..bm.mmbbizy
..v.q...b.bb..izy
..iwq......w.fjzy
..i.qf.......fjzy
e.imqfejm.m.djjzy
ccccccccccccccccc`, //level 5
  map`
........w.....zyy
.v..w.......w.zyy
.i........v...zyy
.iw.....w.i...zyy
.i........i.w.zyy
.i.iw.....i...zyy
.i.i....m.i.j.zyy
xi.i...bb.ijj.zyy
ji.i...m.vibb.zyy
jj.i.bbb.qi...zyy
jjjimmmmmqi.edzyy
ccccccccccccccccc`, //level 6
  map`
z........dz
z........lz
z.........z
zl........z
z......jjjz
zj.....jjjz
zj....jjjjz
zjj..jjjjjz
zjj..rrrrrz
zrrr......z
zm......emz
zrrrr..rrrz
zx.......ez
zcccccccccz`, //level 7
  map`
z........dz
zrrl......z
ze........z
zrrr.....lz
zj..r.....z
zjj...rr..z
zjjj.....jz
zrrr....rrz
z......m..z
z.....rr..z
z....m....z
z..rrr....z
z.........z
zrr......lz
z........rz
zx..mmm.mmz
zrrrrrrrrrz`, //level 8
  map`
z......dz
zl.....rz
z.......z
zr.....lz
z.......z
zl.....rz
z.......z
zr.....lz
z......xz
z......rz
zmmmmmmmz`, //level 9
  map`
zzzzzzzzzzzz
z.........dz
zl.........z
z...mmmmmmmz
z.r.rrrrrrrz
z.........mz
zr......rrrz
z..........z
z.r.......lz
z....r..mmmz
z.......rrrz
z.....r....z
zl.........z
zm..m......z
zrrrrr.....z
z......r.r.z
zx.........z
zrrr.....lrz
zrmmmmmmmmmz`, //level 10
  map`
w.........w........
.....gggg.....w..n.
f...gggggg......lg.
fg.................
fgggl..............
f.......wggg...w...
fw................l
f.................g
fx.m........w....gg
zzzzzv.......v..ggg
yyyyzigmmg...f.mmmv
yyyyzgggggg.mgggggq
yyyyziw...yggggggnq`, //level 11
  map`
j...j..j.....j....jw
..w........w........
...j.j.....j.j..j..j
.j.....w.j.....j..w.
w..j.j.....j.j.w..j.
j.w....j.......j....
....jw...jw..j...j.j
..j...j....j.......w
.........j..w.j...j.
j.vwj..w..x......w.g
ggi...ggggggggg.jvgg
gggj.ggggggggggg.z..
..i.gggggggggggggrj.
.wij..w.q..w.....r.w`  //level 12
];

// Music for each level
const levelMusic = {
  0: crossingfields,
  1: crossingfields,
  2: crossingfields,
  3: crossingfields,
  4: crossingfields,
  5: crossingfields,
  6: crossingfields,
  7: evildungeontypebeat,
  8: evildungeontypebeat,
  9: evildungeontypebeat,
  10:evildungeontypebeat,
  11:crossingfields
};

// Store the current music playback instance
let currentMusic = true;

// Function to play music for the current level
const playLevelMusic = () => {
  // Stop any currently playing music
  if (currentMusic) {
    playback.end(); // Ensure the previous music ends
  }

  // Play new music if defined for the current level
  const tune = levelMusic[currentLevel];
  if (tune) {
    currentMusic = playTune(tune, Infinity); // Set the new music
  }
};

// Title screen music
let titleScreenMusic = playTune(gudatheme, Infinity);

// Handle input to transition from the title screen
onInput("i", () => {
  if (isInTitleScreen) {
    titleScreenMusic.end(); // Stop the title screen music
    playTune(vikornationhowwefeeling); // Optional transition sound

    // Transition to the game
    isInTitleScreen = false;
    currentLevel = 0; // Start at level 0
    setMap(levels[currentLevel]);
    playLevelMusic(); // Play music for level 0
  }
});

// Function to change levels
const changeLevel = (levelIndex) => {
  currentLevel = levelIndex;
  setMap(levels[currentLevel]);
  playLevelMusic(); // Play the new level's music
};

// Keyboard input for jump
onInput("w", () => jump());
//emphasis on the jump function (w), go to afterInput for further info. 

onInput("a", () => {
  let sprite = getFirst(gudetama)
  sprite.x -= 1
})

onInput("s", () => {
  let sprite = getFirst(gudetama)
  sprite.y += 1
})

onInput("d", () => {
  let sprite = getFirst(gudetama)
  sprite.x += 1
})

// game interactive elements (only two :>)
// DO NOT TOUCH, THIS WILL BREAK THE GAME
// box physics
const applyBoxPhysics = () => {
  getAll(box_egg).forEach(box => {
    const character = getFirst(gudetama);

    // Check if the box is directly below the character
    if (box.y === character.y + 1 && box.x === character.x) {
      // Box is directly below the character, do not apply gravity
      return;
    }

    // Check if the box is on a platform (use the platform logic to determine if it's on a platform)
    const isOnPlatform = getAll(platformer).some(platformSprite => {
      return platformSprite.x <= box.x && box.x < platformSprite.x + platformSprite.width && box.y === platformSprite.y - 1;
    });

    if (isOnPlatform) {
      return; // If box is on a platform, don't apply gravity
    }

    // Apply gravity to the box if it's not on a platform
    if (box.y < 10) {
      box.y++; // Apply gravity
    }
  });
};

// Periodic Box Physics and Gravity Application
setInterval(() => {
  applyBoxPhysics(); // Apply physics to boxes
}, 500);

//platforms that leaves faster than my dad
function isPlayerOnPlatform(sprite) {
  const platforms = getAll(platformer);
  let onPlatform = false;

  platforms.forEach((platformSprite) => {
    // Check if player is on top of the platform (adjust condition as necessary)
    if (sprite.y === platformSprite.y - 1 && sprite.x >= platformSprite.x && sprite.x < platformSprite.x + platformSprite.width) {
      onPlatform = true; // Player is on the platform
    }
  });

  return onPlatform;
}

// Handle player movement with the platform
function handlePlayerOnPlatforms() {
  const gudetamaSprite = getFirst(gudetama); // Get the player's sprite
  const platforms = getAll(platformer);      // Get all platforms

  platforms.forEach((platformSprite) => {
    // Check if the player is just above the platform (should land on top)
    if (gudetamaSprite.x === platformSprite.x && gudetamaSprite.y === platformSprite.y - 1) {
      // Align player vertically on top of the platform
      gudetamaSprite.y = platformSprite.y - 1; // Keep the player on top of the platform

      // Move the player horizontally with the platform's movement
      if (platformSprite._direction === 1) { // Platform moving right
        gudetamaSprite.x += 1;
      } else if (platformSprite._direction === -1) { // Platform moving left
        gudetamaSprite.x -= 1;
      }
    }
  });
}

// Move the platforms
function movePlatforms() {
  const platforms = getAll(platformer);
  const mapWidth = width(); // Get the current map's width

  // List of sprite types to ignore (these can be passed through by the platform)
  const passableSprites = ["city1", "city2", "city3", "cloud1"];

  platforms.forEach((platformSprite) => {
    let direction = platformSprite._direction || 1; // Default direction (1 for right, -1 for left)

    // Calculate the next position based on the direction
    let newX = platformSprite.x + direction;

    // Check if the platform goes beyond the map boundaries
    if (newX < 0 || newX >= mapWidth) {
      direction *= -1; // Reverse direction if out of bounds
    } else {
      // Check the tile at the new position
      let targetTile = getTile(newX, platformSprite.y);

      // If the tile is an obstacle and not in the passable list, reverse direction
      if (targetTile.length > 0 && !passableSprites.includes(targetTile[0].type)) {
        direction *= -1;
      } else {
        platformSprite.x = newX; // Move platform
      }
    }

    // Save the direction for the next iteration
    platformSprite._direction = direction;
  });
}

// Periodically move platforms
setInterval(() => {
  movePlatforms();
}, 150); // Controls platform speed

// Periodically handle player on platforms (check if player is on top of a platform)
setInterval(() => {
  handlePlayerOnPlatforms();
}, 10); // Controls player sync speed with platform


// Jumpman!~
let playerUpwardsVel = -1;
let maxJump = 2;

// Function to handle jump (called when 'W' is pressed)
function jump() {
  const playerSprite = getFirst(gudetama); // Assuming 'player' is your character's identifier

  // Check if there’s ground below the player
  if (getTile(playerSprite.x, playerSprite.y + 1) != 0) {
    playerUpwardsVel = maxJump; // Set upward velocity to start jumping
  }
}

// Function to calculate gravity (updates player position)
function calculateGravity(playerX, playerY) {
  const downTile = getTile(playerX, playerY + 1);
  const playerSprite = getFirst(gudetama); // Assuming 'player' is your character's identifier

  // If there’s an upwards velocity, move the player upwards (jumping)
  if (playerUpwardsVel > 0) {
    playerSprite.y--; // Move player upwards
    playerUpwardsVel--; // Decrease upwards velocity for controlled jump
  } else if (playerUpwardsVel < 0) {
    playerSprite.y++; // Move player down when jump ends
  } else if (downTile == 0) {
    playerUpwardsVel = -1; // Stop jumping and apply gravity if no ground is beneath
  }
  
  // Handle special tiles like clouds or platforms where the player might land
  else if (downTile.type == concrete || downTile.type == brick || downTile.type == platformer || downTile.type == cloud1) {
    playerUpwardsVel = -1; // Stop upward velocity if it's a cloud type
  }
}

// Periodically apply gravity (if needed) to ensure the player doesn't float in the air when there's no ground beneath
setInterval(() => {
  calculateGravity(getFirst(gudetama).x, getFirst(gudetama).y);
}, 150); // Check gravity every 50ms


// Function to reset player position after enemy collision
function resetPlayerPosition() {
  const gudetamaSprite = getFirst(gudetama);

  // Reset player position to initial level start
  gudetamaSprite.x = initialPlayerPosition.x;
  gudetamaSprite.y = initialPlayerPosition.y;

  // Reset upwards velocity for gravity to work correctly
  playerUpwardsVel = -1;
}

// Function to move enemies randomly
function moveEnemies() {
  const gudetamaSprite = getFirst(gudetama); // Reference to the player
  const enemies = getAll(enemy); // Get all enemies

  enemies.forEach(enemySprite => {
    const enemyX = enemySprite.x;
    const enemyY = enemySprite.y;

    // Check if the player is directly to the left or right of the enemy
    if (enemyY === gudetamaSprite.y) {
      if (gudetamaSprite.x > enemyX) {
        // Move right toward the player
        const targetTile = getTile(enemyX + 1, enemyY);
        if (targetTile.length === 0 || targetTile[0].type !== brick) {
          enemySprite.x++;
          return;
        }
      } else if (gudetamaSprite.x < enemyX) {
        // Move left toward the player
        const targetTile = getTile(enemyX - 1, enemyY);
        if (targetTile.length === 0 || targetTile[0].type !== cloud2) {
          enemySprite.x--;
          return;
        }
      }
    }
    // Otherwise, move randomly
    const direction = Math.floor(Math.random() * 4); // Random direction: 0 = left, 1 = right, 2 = up, 3 = down
    let targetTile;

    switch (direction) {
      case 0: // Move left
        targetTile = getTile(enemyX - 1, enemyY);
        if (targetTile.length === 0 || (targetTile[0].type !== brick && targetTile[0].type !== cloud2 && targetTile[0].type !== box_egg)) {
          enemySprite.x--;
        }
        break;
      case 1: // Move right
        targetTile = getTile(enemyX + 1, enemyY);
        if (targetTile.length === 0 || (targetTile[0].type !== brick && targetTile[0].type !== cloud2 && targetTile[0].type !== box_egg)) {
          enemySprite.x++;
        }
        break;
    }
  });
}

// Function to calculate gravity for enemies
function calculateEnemyGravity(enemy) {
  let downTile = getTile(enemy.x, enemy.y + 1);

  if (enemyUpwardsVel > 0) {
    enemy.y--;
    enemyUpwardsVel--;
  } else if (enemyUpwardsVel < 0) {
    enemy.y++;
  } else if (downTile == 0) {
    enemyUpwardsVel = -1;
  }
}


// Handle collisions with spine and enemy
function handleCollisions() {
  const gudetamaSprite = getFirst(gudetama);
  const spineSprites = getAll(spine);
  const enemySprites = getAll(enemy);

  // Spine collision
  spineSprites.forEach((spineSprite) => {
    if (gudetamaSprite.x === spineSprite.x && gudetamaSprite.y === spineSprite.y) {
      resetInitialPosition(); // Reset to start position
      playTune(arewedeaduzz); // Play collision sound
    }
  });

  // Enemy collision
  enemySprites.forEach((enemySprite) => {
    if (gudetamaSprite.x === enemySprite.x && gudetamaSprite.y === enemySprite.y) {
      resetInitialPosition(); // Reset to start position
      playTune(arewedeaduzz); // Play collision sound
    }
  });
}

// Initialize the initial player position (used for resetting)
let initialPlayerPosition = { x: 0, y: 0 };  // Placeholder, will be updated dynamically

// Use this array to define starting positions for each level
const levelInitialPositions = [
  { x: 0, y: 0 },  // Level 0*
  { x: 0, y: 7 },  // Level 1*
  { x: 8, y: 1 },  // Level 2*
  { x: 1, y: 7 },  // Level 3*
  { x: 4, y: 0 },  // Level 4*
  { x: 1, y: 0 },  // Level 5*
  { x: 2, y: 7 },  // Level 6*
  { x: 1, y: 13},  // Level 7*
  { x: 1, y: 15},  // Level 8*
  { x: 7, y: 8 },  // Level 9*
  { x: 1, y: 16},  // Level 10
  { x: 1, y: 8 },  // Level 11
  { x: 0, y: 0 }   // Level 12
];


// Function to save the initial player position dynamically
const setInitialPlayerPosition = () => {
  const gudetamaSprite = getFirst(gudetama);
  initialPlayerPosition = { x: gudetamaSprite.x, y: gudetamaSprite.y }; // Save the dynamic initial position
};

// Reset player position to predefined level start position
const resetInitialPosition = () => {
  const gudetamaSprite = getFirst(gudetama);
  const levelPosition = levelInitialPositions[currentLevel];

  if (levelPosition) {
    gudetamaSprite.x = levelPosition.x;
    gudetamaSprite.y = levelPosition.y;
  } else {
    // Fallback to dynamic initial position if level data is missing
    gudetamaSprite.x = initialPlayerPosition.x;
    gudetamaSprite.y = initialPlayerPosition.y;
  }
};

// Main game loop (after player input)
afterInput(() => {
  handleCollisions(); // Check for collisions with spine and enemy
  const gudetamaSprite = getFirst(gudetama);
  const spineSprites = getAll(spine);
  const enemySprites = getAll(enemy);

  // Check for collision with spine
  spineSprites.forEach(spineSprite => {
    if (gudetamaSprite.x === spineSprite.x && gudetamaSprite.y === spineSprite.y) {
      playTune(arewedeaduzz);
      gudetamaSprite.x = initialPlayerPosition.x;
      gudetamaSprite.y = initialPlayerPosition.y;
    }
  });
  
//if you're confused as to why gudetama doesn't die from the top of the spike, it's because he has a big GYYYYYYYYYYYYYAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTT

  // Check for collision with enemies
  enemySprites.forEach(enemySprite => {
    if (gudetamaSprite.x === enemySprite.x && gudetamaSprite.y === enemySprite.y) {
      playTune(arewedeaduzz);
      resetPlayerPosition();
    }
  });

  // Check for egg_portal
  if (tilesWith(gudetama, egg_portal).length >= 1) {
    playTune(portal_escape);

    if (currentLevel === 12) { // Final level check
      if (playback) playback.end();
      addText("You got the Soy Sauce!", { 
        x: 2, 
        y: 5, 
        color: color`9` });
    } else {
      currentLevel++;
      setMap(levels[currentLevel]);
    }
  }

  // Check for SoySauce_Trophy
  if (tilesWith(gudetama, SoySauce_Trophy).length >= 1) {
    playTune(wefoundthejuanpiece);
    playTune(Iamthedangerahhbeat, Infinity);
    addText("You got the\n Soy Sauce!", { 
      x: 4, 
      y: 5, 
      color: color`9` });

    if (currentLevel < 12) { // Move to the next level if not the final one
      currentLevel++;
      setMap(levels[currentLevel]);
    } else if (playback) {
      playback.end(); // End the game on the final level
    }
  }

  // Apply gravity
  calculateGravity(gudetamaSprite.x, gudetamaSprite.y);
});

// Periodically move enemies
setInterval(() => {
  moveEnemies();
}, 755);

//i don't know jack about javascript lol
//feel free to cop this code
//started on October 9th, 2024