/*
@title: TheMazeGame
@author: Navrit Angurana
@tags: []
@addedOn: 2024-02-17

First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

// Fix sounds
//Add text

//stuff
const player = "p"
const wall = "w"
const baddie = "e"
const exitdoor = "d"
const dark = "o"
const bg = "b"
const flashBang = "f"
const flashPickUp = "a";
const afterLifeDoor = "c";

const enemyFootSteps = tune`
46.15384615384615: C4/46.15384615384615,
46.15384615384615: B5/46.15384615384615,
46.15384615384615: C4/46.15384615384615,
1338.4615384615383`;
const caught = tune`
1000: F4/1000 + G4^1000 + A4^1000 + B4^1000 + C5^1000,
31000`;

const playerFootSteps = [
  tune`
66.66666666666667: C4^66.66666666666667,
2066.666666666667`,
  tune`
66.66666666666667: D4^66.66666666666667,
2066.666666666667`,
  tune`
66.66666666666667: E4^66.66666666666667,
2066.666666666667`,
  tune`
66.66666666666667: F4^66.66666666666667,
2066.666666666667`
]
const nextFloor = [
 tune`
130.43478260869566: C4^130.43478260869566,
130.43478260869566: D4^130.43478260869566,
130.43478260869566: G4^130.43478260869566,
130.43478260869566: C5^130.43478260869566,
3652.1739130434785`,
 tune`
130.43478260869566: C4^130.43478260869566,
130.43478260869566: D4^130.43478260869566,
130.43478260869566: G4^130.43478260869566,
130.43478260869566: C5^130.43478260869566,
130.43478260869566: G5^130.43478260869566,
130.43478260869566: A5^130.43478260869566,
3391.304347826087`,
 tune`
130.43478260869566: C4^130.43478260869566,
130.43478260869566: D4^130.43478260869566,
130.43478260869566: G4^130.43478260869566,
130.43478260869566: C5^130.43478260869566,
130.43478260869566: G5^130.43478260869566,
130.43478260869566: A5^130.43478260869566,
130.43478260869566: D5^130.43478260869566,
130.43478260869566: B5^130.43478260869566,
3130.434782608696`,
 tune`
130.43478260869566: C4^130.43478260869566,
130.43478260869566: E4^130.43478260869566,
130.43478260869566: A4^130.43478260869566,
130.43478260869566: C5^130.43478260869566,
130.43478260869566: G5^130.43478260869566 + F5~130.43478260869566,
130.43478260869566: A5^130.43478260869566 + G5~130.43478260869566,
130.43478260869566: D5^130.43478260869566 + C5~130.43478260869566,
130.43478260869566: B5^130.43478260869566 + C4^130.43478260869566 + A5~130.43478260869566,
3130.434782608696`,
 tune`
130.43478260869566: C4^130.43478260869566,
130.43478260869566: B5~130.43478260869566,
130.43478260869566: E4^130.43478260869566,
130.43478260869566: B5~130.43478260869566,
130.43478260869566: A4^130.43478260869566,
130.43478260869566: B5~130.43478260869566,
130.43478260869566: C5^130.43478260869566 + G5^130.43478260869566 + F5~130.43478260869566 + B4~130.43478260869566,
130.43478260869566: A5^130.43478260869566 + G5~130.43478260869566,
130.43478260869566: D5^130.43478260869566 + C5~130.43478260869566,
130.43478260869566: B5^130.43478260869566 + C4^130.43478260869566 + A5~130.43478260869566,
2869.5652173913045`,
 tune`
130.43478260869566: C4^130.43478260869566,
130.43478260869566: B5~130.43478260869566 + C4^130.43478260869566,
130.43478260869566: E4^130.43478260869566 + D4~130.43478260869566,
130.43478260869566: B5~130.43478260869566 + C4^130.43478260869566 + D4^130.43478260869566,
130.43478260869566: A4^130.43478260869566 + G4~130.43478260869566 + C4^130.43478260869566,
130.43478260869566: B5~130.43478260869566 + C4^130.43478260869566,
130.43478260869566: C5^130.43478260869566 + G5^130.43478260869566 + F5~130.43478260869566 + B4~130.43478260869566,
130.43478260869566: A5^130.43478260869566 + G5~130.43478260869566 + B5~130.43478260869566 + C4^130.43478260869566,
130.43478260869566: D5^130.43478260869566 + C5~130.43478260869566,
130.43478260869566: B5^130.43478260869566 + C4^130.43478260869566 + A5~130.43478260869566 + G5^130.43478260869566,
2869.5652173913045`,
 tune`
130.43478260869566: C4^130.43478260869566,
130.43478260869566: B5~130.43478260869566 + C4^130.43478260869566,
130.43478260869566: E4^130.43478260869566 + D4~130.43478260869566,
130.43478260869566: B5~130.43478260869566 + C4^130.43478260869566 + D4^130.43478260869566,
130.43478260869566: A4^130.43478260869566 + G4~130.43478260869566 + C4^130.43478260869566,
130.43478260869566: B5~130.43478260869566 + C4^130.43478260869566,
130.43478260869566: C5^130.43478260869566 + G5^130.43478260869566 + F5~130.43478260869566 + B4~130.43478260869566,
130.43478260869566: A5^130.43478260869566 + G5~130.43478260869566 + B5~130.43478260869566 + C4^130.43478260869566,
130.43478260869566: D5^130.43478260869566 + C5~130.43478260869566,
130.43478260869566: B5^130.43478260869566 + C4^130.43478260869566 + A5~130.43478260869566 + G5^130.43478260869566,
130.43478260869566: D5^130.43478260869566 + C5-130.43478260869566,
130.43478260869566: C4~130.43478260869566 + B5~130.43478260869566,
130.43478260869566: C5^130.43478260869566 + B4-130.43478260869566,
130.43478260869566: B5~130.43478260869566,
130.43478260869566: A4^130.43478260869566 + G4-130.43478260869566,
130.43478260869566: B5~130.43478260869566,
130.43478260869566: A4^130.43478260869566 + G4~130.43478260869566,
130.43478260869566: B5~130.43478260869566,
130.43478260869566: B4^130.43478260869566 + A4~130.43478260869566 + C4^130.43478260869566,
130.43478260869566: B5~130.43478260869566,
130.43478260869566: D5^130.43478260869566 + C5~130.43478260869566,
130.43478260869566: B5~130.43478260869566 + G5^130.43478260869566 + F5~130.43478260869566 + C4^130.43478260869566,
130.43478260869566,
130.43478260869566: B5^130.43478260869566 + G5^130.43478260869566 + A5~130.43478260869566 + C4^130.43478260869566,
1043.4782608695652` 
]

const flashsound = [
  tune`
272.72727272727275: B4^272.72727272727275 + B5~272.72727272727275 + A5~272.72727272727275 + G5/272.72727272727275 + C4-272.72727272727275,
8454.545454545456`,
  tune`
272.72727272727275: B4^272.72727272727275 + C4~272.72727272727275,
8454.545454545456`,
  tune`
272.72727272727275: C4-272.72727272727275 + D4-272.72727272727275 + B4^272.72727272727275 + A5-272.72727272727275 + B5-272.72727272727275,
8454.545454545456`
];

const popUpSoundEffect = tune`
250: C5~250 + A4~250 + B4~250,
7750`;

//timers, integerts
var timer = 0;
var exactFinishTime = 0;
let flashesUsed = 0;
var eventTimer = 0;
var lives = 3;
var retries = 0;
var lifeSymbol = "";
var flashCooldown = 0;
var intrevalCount = 0;

let level = 0;
let target = [0, 0];
let hasFlash = 0;

//Red Dude controller
let previousDirection = [];
let isFleeing = [];
let enemySpeed = 0;
let isChasing = [];

//Visable Map Variables 
let flashSight = 5;
let eyeSight = 0;

setLegend(
  [ flashBang, bitmap`
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
6666666666666666`],
  [ player, bitmap`
................
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
................` ],
  [ flashPickUp, bitmap`
................
......0000......
.....00..00.....
....00....00....
....0......0....
....0......0....
...00..33..00...
...000L33L000...
....000LL000....
....00000000....
....00022000....
...0000620000...
...0200620020...
...0600660060...
...0000000000...
.....000000.....`],
  [ dark, bitmap`
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
  [ wall, bitmap`
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
  [ baddie, bitmap`
................
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
................`],
  [ exitdoor, bitmap`
0000000000000000
0000777777770000
0007722222277000
0077222222227700
0072222222222700
0772222222222770
0722222222222270
0722222222222270
0722222222222270
0722222222222270
0772222222222770
0072222222222700
0077222222227700
0007722222277000
0000777777770000
0000000000000000`],
  [afterLifeDoor, bitmap`
0000000000000000
0000000000000000
0000333333330000
00033.3..3.33000
0033........3300
003..........300
0033........3300
003..........300
003..........300
0033........3300
003..........300
0033........3300
00033.3..3.33000
0000333333330000
0000000000000000
0000000000000000`],
  [ bg, bitmap`
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
LLLLLLLLLLLLLLLL`],
)

setBackground(bg)

setSolids([player, wall], [wall, baddie])

setPushables({
  [ player ]: []
})

const deathMap = map`
wwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwww
wwwwwwwwwpwwwwwwwww
w.................w
w.wwwwwwwwwwwwwww.w
w......dwwwc......w
wwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwww`;
  
const levels = [
  map`
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wp............dw
wwwwwwwwwwwwwwww`, //1
  map`
wwwwwwwwwwww
w.....wwwwpw
w.www.wwww.w
w.wwwdwwww.w
w.wwwwwwww.w
w..........w
wwwwwwwwwwww`, //2
  map`
wwwwwwwwwwww
w.....wwww.w
wwwww....w.w
w...ww.w...w
w.w.....ww.w
w.w.www.w..w
w.w...ww..ww
w.w.ww...wdw
wpw....w...w
wwwwwwwwwwww`, //3
  map`
wwwwwwwwwwwwww
ww...ww.dw.wpw
w..w.w..w..w.w
w.w..w.w.w...w
w..ww..w.w.w.w
w.....w..w.w.w
w.wwww..ww.w.w
w......ww...ww
w.ww.w....w..w
w.ww.www.w.w.w
w...w......w.w
wwwwwwwwwwwwww`, //4
  map`
wwwwwwwwww
we...w...w
www.w..www
www.w.w.dw
www.w...ww
www.w.w.ww
www.w..w.w
www.w.w..w
w...wp..ww
wwwwwwwwww`, //5
  map`
wwwwwwwwwwwwww
wdw......w...w
w.w.w.w.ww.w.w
w.w..ww.wwbw.w
w..w......pw.w
ww..www..www.w
www....w...w.w
wwwww...w..wew
wwwww.w....www
wwwww.ww.w..ww
wwwww.....w..w
wwwwwwwwwwwwww`, //6
  map`
wwwwwwwwwwww
wp.........w
w.wwwww.ww.w
w.w...w..w.w
w...w.ww.w.w
www...w....w
wdwwwww.ww.w
w.....w....w
w.www.www.ww
w........eww
w.wwwwwwwbww
wwwwwwwwwwww`, //7
  map`
wwwwwwwwwwww
wp.........w
w.wwwwwwww.w
w.w........w
w...w.wwew.w
www.....bw.w
wdwww.ww.w.w
w..w..w....w
w.www.www.ww
w.......w.ww
w.wwwwwww.ww
wwwwwwwwwwww`, //8
  map`
wwwwwwwwwwwwww
w...b........w
w.wwew.w.w.w.w
w..w.w...w.w.w
w.ww.w.www.w.w
w....w....ew.w
w.wwwwwwwwww.w
w.......b..w.w
wwww.w.w.w.w.w
ww...w.w.w.w.w
wp.w.w.....wdw
wwwwwwwwwwwwww`, //9
  map`
wwwwwwwwwwwwwwww
w..e.........b.w
w.www.w.ww.ww.ww
wb..w.w.....w..w
w.w.wwwwwww.ww.w
w..p..w...w....w
w.w.w.w.w.wwwwww
w.w....ew.w....w
w.wwwww.w...w.ww
w..w.ww.w.w.w.ww
ww........w.e.dw
wwwwwwwwwwwwwwww`, //10
  map`
wwwwwwwwwwwwwwww
w.....ww....ww.w
w.w.w....ww....w
w.wpw.ww.bwwww.w
w.www..w.ww....w
w...ew.w...bww.w
w.wwww.wwww..w.w
w.....b...ww.w.w
wwwww.w.w..eb..w
w.www.w.wwwwww.w
w...w...w...w..w
ww.wwwwww.w.w.ww
ww.w........w..w
ww.w.ww.www.ww.w
wd...w...we....w
wwwwwwwwwwwwwwww`, //11
  map`
wwwwwwwwwwwwww
wp..w........w
w...ww.www.w.w
w...a..w.w.w.w
wwwwwwww.w.w.w
w.....ww.www.w
wdwww........w
wwwwwwwwwwwwww`, //12
  map`
wwwwwwwwwwwwww
ww...wwwwwww.w
ww.w....w..w.w
w..w.ww.w.ww.w
w.ww..w......w
w.www.w.w.w.ww
w.wwp.w.w.w..w
ww.wwww.w.ww.w
ww.w..w.wwww.w
ww.w.ww......w
ww....www.wwww
ww.ww...w.w..w
w...dww.....ww
wwwwwwwwwwwwww`, //13
  map`
wwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwww
wp.........be...w
wwwwwwwwwwwww.w.w
wwwww.........w.w
wwwww.wwwwwwwww.w
wwwww........dw.w
wwwwwwwwwwwwwww.w
wwwwwwwwwwwwwwwww`, //14
  map`
wwwwwwwwwwwww
wwwwwwwwwwwww
wwwwwwwwwwwww
we....p....ew
w.wwwwwwwww.w
w...wwdww...w
w.w.......w.w
w.wwwwwwwww.w
wb.........bw
wwwwwwwwwwwww`, //15
  map`
wwwwwwwwwwwwwwww
wp..wwww.....e.w
w.w.....bwww.w.w
w.ww.www.w.www.w
w.ww..ww.w...w.w
w.www.ww.w.w..bw
wb..w..e.w.w.w.w
w.w.ww.w.w.wwwww
www..w.w.w.w...w
w.e..www.w...w.w
w.ww..ww.ww.ww.w
w.www.ww..w.w..w
wb...b...wwdwwww
wwwwwwwwwwwwwwww`, //16
  map`
wwwwwdwwwwwwwwwwww
w...w...ww.....w.w
w.w.w.w..w.www...w
www.www.ww.w.w.www
wb........be.w...w
w.wwwwwwww.wwwwwbw
wwww....ew...w.e.w
w..w.www.w.w.w.www
w.ww.w...w.w.w.w.w
wew..w.w.w...w...w
w.w.ww.www.w.www.w
w.b.w....wbw.....w
www.wwww.w.wwwwwbw
w.w.w..www.w.....w
w..........wpwww.w
wwwwwwwwwwwwwwwwww`, //17
  map`
wwwwwwwwwwwwwwwwww
wp.......www..b..w
w.w.w..w.....w.w.w
w.w.wwbwwwwwww.w.w
w......w....we...w
www.ww.w.ww.ww.www
wew.wwww.w...w.w.w
w.www....wwwwwb..w
w...w.ww.......w.w
wwwb...wbw.www.w.w
w...w.ww.wwwew.www
w.w.w.w......b...w
w.w.w.ww.wwwwwww.w
w.www..www....dw.w
w.e........wwwww.w
wwwwwwwwwwwwwwwwww`, //18
  map`
wwwwwwwwwwwwwwwwww
w.w.............bw
w.w.wwwwwwwww....w
w.w.w...w...w.ww.w
w.w.wpw.w.w.wwww.w
w.w.www.w.wwww.wew
wew.....w...ww.w.w
w.wwwwwwwww.w..w.w
w........e.b..b..w
w.w.wwww.wwwww.w.w
w.w..........www.w
wbwwwwwww.www..b.w
w.....www.ww..w.ww
ww.w..w......ww..w
wwdww...b.wwwwwwew
wwwwwwwwwwwwwwwwww`, //19
  map`
wwwwwwwwwwwwwwwwwwww
w..b.....wp........w
www.wwwwbw.ww.www.ww
w...w......w..w.wb.w
w.wwwwwwwwww.ww.w..w
w............w.ew..w
wwwwww.wwwww.w.ww.ww
w.e..w.w...w.w.....w
w.w.ww...w.wewwwwwww
w.w.w.bwww.w.......w
w.w...ww...wwwwwww.w
w.wwwwwwwwww...w...w
w..w.w.......w..bwww
ww.w.w.wwwwwwwwwww.w
w..w.w.w.........b.w
w.ww.w.w.w.wwwww...w
w....w.w.w.w...www.w
wwww.w.wwwbw.w.w...w
wb..e........w.wdwww
wwwwwwwwwwwwwwwwwwww`, //20
  map`
wwwwwwwwwwwwwwwwwwww
wpw.........w.w...ww
w...wwwww.w.w.w.w.ww
w.wwwb..w.w.w.w.w..w
w.w.w.w.w..ew.w.ww.w
w.w.w.w.wwwww.w..w.w
w...w.w.w.www.ww.w.w
w.www.w.w....b.....w
wb....w.www.w.w.wwww
w.wwwww.w.w.www.b..w
w.....wew.w...ww.w.w
w.www.www.w.w.w..w.w
w...wb....w.w.w.ww.w
w.www.wwwww.w.webw.w
w.w....w.w..wwww...w
w.w.ww.w.w.ww....w.w
w.w.we.w.w.w..wwwwww
w.wbwwww.w.w.ww....w
w.w........w....wwdw
wwwwwwwwwwwwwwwwwwww`, //21
  map`
wwwwwwwwwwwwwwwwwwww
wd..w.....b.....b..w
www.w.wwww..wwww.w.w
w...w.ww.wwww..w.www
w.w.w.w....b....e..w
w.w...wwwww.wwwww..w
w.wwwww.w.w.w.w.w..w
www.......w...w.w..w
weww.wwww.w.www.w..w
w..w.....bw.....w..w
ww.wwwwww.wwwww.wwww
w..................w
www.wwwwwwwwwwww.wew
ww.b.w.............w
w..w...w.wwwbwwwwwww
w.wwwwww.wew.w.w...w
w......w.w...w.w.w.w
w.wwww.w.wwwww.w.w.w
w.....ew.........wpw
wwwwwwwwwwwwwwwwwwww`, //22
  map`
wwwwwwwwwwwwwwwwwwww
wp....w.w..........w
wwww.ww.w.wwwbw.ww.w
w.....w.w.w...w..w.w
w.www.w.w.w.w.ww.w.w
w.w...w.w.w.w....w.w
w.ww.ww.w...wwwwww.w
w.web.w.w.w......w.w
w.ww.ww.wwwbwwwwwwew
w...............ew.w
wwbww.wwwwwbwwwwww.w
w...w.w.....w...b..w
w.w.w.w.w.w.w.ww.w.w
w.w.w.w.www.w.w..w.w
w.e.w.w.....w.w..w.w
www.w.w.wwwwwwwwww.w
w.....w.w........w.w
w.www.w.www.ww.wwwww
w.e.w.we....ww....dw
wwwwwwwwwwwwwwwwwwww`, //23
  map`
wwwwwwwwwwwwwwwwwwww
wdw..b.b.b.e.....b.w
w.w.w.w.w.w.w.www.ww
w.....w.w.w...e.w..w
www.w.w.w.w.w.w.w.ww
we...b...b.....b.e.w
w.www.w.w.w.www.w.ww
w.....w...w.we..w..w
www.wewww.w.w.w.w.ww
w..b.......e.....b.w
w.w.www.www.w.www.ww
w......b.....b.....w
www.w.w.www.w.w.w.ww
w..b.b......w.w...ww
w.w.w.www.w.w.w.w.ww
we...e.......b.b.b.w
www.www.www.w.w.w.ww
w..e...............w
w.w.w.www.w.w.w.w.pw
wwwwwwwwwwwwwwwwwwww`, //24
  map`
wwwwwwwwwwwwwwwwwwww
wp................bw
wwwww.w.wwww.w.....w
w...w.w.we.w.www.w.w
w.w.w.w.ww.w.w...w.w
w.w.w.w....w.w.w.w.w
w.w.w.wwwwwwww.w.w.w
w.w.w.......b..w.w.w
w.w.wwwwwwww.w.wew.w
w.w.w....b...w.www.w
w.w.wwwww.w..w.....w
w.w.w...w.w.bwwwwwww
w.w.w.w.w.w.....b..w
w.w.w.w...wewwww.w.w
w.w.w.www.www..w.w.w
w.w.w..w......wwww.w
w.w...wwew..wwwe...w
w.wwwwwwwwwwwwwwwwww
w.................dw
wwwwwwwwwwwwwwwwwwww`, //25
  map`
wwwwwwwwwwwwwwwwwwww
wd.................w
wwwwwwwwwwwwwwwwww.w
w................w.w
w.wwwwwwwwwwwwww.w.w
w.w..............w.w
w.w.wwwwwwwwwwwwww.w
w.w.w...w...w...ww.w
w.w.w.w.w.w.w.w.ww.w
w.w.w.w.w.w.w.w....w
w.w.w.w.w.w.w.wwwwww
w.w.w.w...w.w....wew
w.w.w.wwwww.wwww.w.w
w.w.w.w.....w.w..w.w
w.w.w.w.wwwww...ww.w
w.w.w.w.w...ww.www.w
w.w...w...w......w.w
w.wwwwwwwwwwwwwwww.w
w.................pw
wwwwwwwwwwwwwwwwwwww`, //26
  map`
wwwwwwwwww
wpwwwwwwww
w.wwwwwwww
w.wwwwwwww
w.wwwwwwww
w.wwwwwwww
w.wwwwwwww
w.wwwwwwww
w.wwwwwwww
w.wwwwwwww
w.wwwwwwww
w.wwwwwwww
w.wwwwwwww
w.wwwwwwww
wwwwwwwwww
wwwwwwwwwd`, //27 //finish
]

//order: EyeSight, EnemySpeed, How long they Flee, Chase Player range //Units squared, 
const levelModifiers = [
  [1, 4, 10, 0], //1
  [3, 4, 10, 0], //2
  [3, 4, 10, 0], //3
  [3, 4, 10, 0], //4
  [2, 30, 10, 10], //5 red guy introduced
  [2, 35, 10, 40], //6 red guy threat
  [2, 35, 1, 40], //7 
  [2, 40, 3, 12], //8 make darker
  [2, 40, 4, 12], //9 more enemies
  [2, 40, 0, 12], //10
  [2, 40, 0, 12], //11
  [0, 2.7, 0, 0], // 12 introduce flash
  [0, 2.7, 0, 0], //13
  [3, 40, 10, 20], // 14 Flash enemiesmies
  [3, 35, 10, 40], //15
  [2, 35, 8, 12], // 16 Mazing
  [2, 33, 8, 12], //17 enemies get faster, more enemies map bigger
  [2, 33, 10, 12], //18
  [2, 30, 10, 12], //19
  [2, 27, 13, 12], //20
  [2, 30, 20, 12], //21 //Final 5 levels are just big maps, like a final challenge
  [2, 30, 20, 12], //22
  [2, 30, 20, 12], //23
  [2, 30, 20, 12], //24
  [3, 25, 10, 40], //25
  [2, 25, 10, 40], //26
  [2, 0, 0, 0] //27 finsih
  

];

//Sets up the parameters for the starting level
initializeGame();

//Runs the game at a 10ms intreval
setInterval(function () {
  intrevalCount ++;
  
  if(intrevalCount % enemySpeed == 0){
    for(let i = 0; i < getAll("e").length; i ++){
      monsterAiMovement(i);
    }
  }
  
  if(intrevalCount % 100 == 0){
    if(lives > -1 && level != 26){
      timer++
      eventTimer ++
    }
    textManager();
    flashTimer();
  }

//Time based debug
  //addText("C: " + intrevalCount, {x: 7,y: 14, color: color`2`})
  //addText("C: " + levelModifiers[level][1], {x: 7,y: 14, color: color`2`})
  
}, 10)


playerMovement();

afterInput(() => {
  exitDoorManager();  
  updateDarkness();

  if(level == 11 && hasFlash == 0){
    if(getFirst(player).x == getFirst(flashPickUp).x && getFirst(player).y == getFirst(flashPickUp).y){
      getFirst(flashPickUp).remove();
      playTune(popUpSoundEffect);
      hasFlash = 1;
    }
  }
})

function initializeGame(){
  setMap(levels[level]);
  //setMap(deathMap);
  
  eyeSight = levelModifiers[level][0];
  enemySpeed = levelModifiers[level][1];
  
  initializeDarkness();
  updateDarkness();
  
  textManager();
  
}

function updateDarkness() {
  let playerX = getFirst(player).x
  let playerY = getFirst(player).y
  
  
  
  for(let renderDomainIntreval = playerX - (eyeSight + 2); renderDomainIntreval < (playerX + (eyeSight + 2)); renderDomainIntreval++){
    for(let renderRangeIntreval = playerY - (eyeSight + 2); renderRangeIntreval < playerY + (eyeSight + 2); renderRangeIntreval++){
      manageRenderDarkness(renderDomainIntreval, renderRangeIntreval)
    }
  }
}

function manageRenderDarkness(xCoordinates, yCoordinates){
  const renderedTiles = getTile(xCoordinates, yCoordinates);
  
  
  for(let tileCheck = 0; tileCheck < renderedTiles.length; tileCheck++){
    if(renderedTiles[tileCheck].type == "o"){
      renderedTiles[tileCheck].remove();
    }
  }

  if(xCoordinates > 0 && xCoordinates < width() && yCoordinates > 0 && yCoordinates < height()){
    if(xCoordinates < getFirst(player).x - eyeSight || xCoordinates > getFirst(player).x + eyeSight || yCoordinates > getFirst(player).y + eyeSight || yCoordinates < getFirst(player).y - eyeSight)
      {
        addSprite(xCoordinates, yCoordinates, "o");
      } //end of if
  }
  
  
}

function initializeDarkness(){
  for(let xPosition = 0; xPosition < width(); xPosition++){
    for(let yPosition = 0; yPosition < height(); yPosition++){
      addSprite(xPosition, yPosition, "o");
    }
  }
}

function makeEnemyVisible(){
  for(let iamSuffering = 0; iamSuffering < isChasing.length; iamSuffering ++){
      if(isChasing[iamSuffering] == 1)
      {
        const getRidofDarknessonEnemyTile = getTile(getAll("e")[iamSuffering].x, getAll("e")[iamSuffering].y);
          for(let runThroughList = 0; runThroughList < getRidofDarknessonEnemyTile.length; runThroughList++){
            if(getRidofDarknessonEnemyTile[runThroughList].type == "o"){
              getRidofDarknessonEnemyTile[runThroughList].remove();
              runThroughList = 999;
          }
        }
      }
    }
}

function monsterAiMovement(whichBaddie){
  //Stores Bad guys position in a easier to write variable
  let bX = getAll("e")[whichBaddie].x
  let bY = getAll("e")[whichBaddie].y
  
  
  //Gets surrounding tiles sprites of the bad guy 
  const left = getTile(bX - 1, bY);
  const right = getTile(bX + 1, bY);
  const up = getTile(bX, bY - 1);
  const down = getTile(bX, bY+ 1);

  //Checks if player is in range to chase
  if(Math.pow((getFirst(player).x - bX),2) + Math.pow(getFirst(player).y - bY,2) < levelModifiers[level][3]){
      target = [getFirst(player).x, getFirst(player).y] 
      playTune(enemyFootSteps);
      isChasing[whichBaddie] = 1;
    } else {
      isChasing[whichBaddie] = 0;
    }

  //Find how far each neighobring tile is from target location
  let l = Math.pow((bX - 1 - target[0]),2) + Math.pow((bY - target[1]), 2),
    r = Math.pow((bX + 1 - target[0]),2) + Math.pow( (bY - target[1]),2), 
    u = Math.pow((bX - target[0]),2) + Math.pow((bY-1 - target[1]),2), 
    d = Math.pow((bX - target[0]),2) + Math.pow((bY+1 - target[1]),2);

    if(isFleeing[whichBaddie] > 0){
    previousDirection[whichBaddie] = 0;
    //inverses direction values making red dot choose furthest tile from target
    l = 1/l
    r = 1/r
    d = 1/d
    u = 1/u

    isFleeing[whichBaddie] --;
  }
  
  //Finds which Neighboring tiles are walls
  for(let i = 0; i < left.length; i++){
    //addText("L: " + left[i].type, {x: 5, y: 5, color: color`9`});
    if(left[i].type == "w" || left[i].type == "e"){
      l = 999999999;
      i = 256;
    }
  }
  for(let i = 0; i < right.length; i++){
    //addText("R: " + right[i].type, {x: 5, y: 6, color: color`9`});
    if(right[i].type == "w" || right[i].type == "e"){
      r = 999999999;
      i = 256;
    }
  }
  for(let i = 0; i < up.length; i++){
    //addText("U: " + up[i].type, {x: 5, y: 7, color: color`9`});
    if(up[i].type == "w" || up[i].type == "w"){
      u = 999999999;
      i = 256;
    } 
  }
  for(let i = 0; i < down.length; i++){
    //addText("D: " + down[i].type, {x: 5, y: 8, color: color`9`});
    if(down[i].type == "w" || down[i].type == "e"){
      d = 999999999;
      i = 256;
      } 
  }



  //Prevents from going backwards
  switch(previousDirection[whichBaddie]){
    case 1:
      r = 999999
      break;
    case 2:
      l = 999999
      break;
    case 3:
      d = 999999
      break;
    case 4:
      u = 999999
      break;
    default:
      break;
  }

  //Decides where he should move depending on whatever tile gets em closest to target location, firt if statement just like stops them from getting stuck in a dead end
  if(l == r && l == d && l == u){
    switch(previousDirection[whichBaddie]){
      case 1:
        getAll("e")[whichBaddie].x -= 1;
        previousDirection[whichBaddie] = 1;
        break;
      case 2:
        getAll("e")[whichBaddie].x += 1;
        previousDirection[whichBaddie] = 2;
        break;
      case 3:
        getAll("e")[whichBaddie].y -= 1;
        previousDirection[whichBaddie] = 3;
        break;
      case 4:
        getAll("e")[whichBaddie].y += 1;
        previousDirection[whichBaddie] = 4;
        break;
      default:
        break;
    }
  } else if( l <= r && l <= u && l <= d){
    getAll("e")[whichBaddie].x -= 1;
    previousDirection[whichBaddie] = 1;
  } else if( r <= l && r <= u && r <= d){
    getAll("e")[whichBaddie].x += 1;
    previousDirection[whichBaddie] = 2;
  } else if( u <= r && u <= l && u <= d){
    getAll("e")[whichBaddie].y -= 1;
    previousDirection[whichBaddie] = 3;
  } else if (d <= r && d <= l && d <= u){
    getAll("e")[whichBaddie].y += 1;
    previousDirection[whichBaddie] = 4;
  }

  //ALOT of Debug texts, basically shows wh
  /*
  //Funny debugging texts, I couldnt figure out console log
  addText("R: " + r, {x: 0, y: 8, color: color`9`});
  addText("L: " + l , {x: 0, y: 10, color: color`9`});
  addText(target[0] + "," + target[1], {x: 0, y: 3, color: color`9`});
  addText("o", {x: bX, y: bY, color: color`8`});
  addText("T", {x: target[0], y: target[1], color: color`9`});
  addText("Run: " + isFleeing[whichBaddie], {x: 1, y: 6, color: color`9`});
  */
  
  //check if evil cuaght player
  if(bX == getFirst(player).x && bY == getFirst(player).y){
    playTune(caught)
    lives --;

    
    for(let i = 0; i < getAll("e").length; i ++){
      isFleeing[i] = levelModifiers[2] + 7; 
    }

    if(level != 25){
      const GetTpTiles = getAll(bg);
      const tpTile = Math.floor(Math.random() * (GetTpTiles.length));
      getAll("e")[whichBaddie].x = GetTpTiles[tpTile].x
      getAll("e")[whichBaddie].y = GetTpTiles[tpTile].y
    }
    if(hasFlash == 1){
      flash();
    }
      
    

    if(lives < 0){
      setMap(deathMap)
      initializeDarkness();
    }
  }

  //Makes enemy Visible if close enough
  
} 

function playerMovement(){
  //Movment controls
 
  
  onInput("w", () => {
    getFirst(player).y -= 1
     playTune(playerFootSteps[Math.floor(Math.random() * (4))]);
  })
  onInput("a", () => {
    getFirst(player).x -= 1
     playTune(playerFootSteps[Math.floor(Math.random() * (4))]);
  })
  onInput("s", () => {
    getFirst(player).y += 1
     playTune(playerFootSteps[Math.floor(Math.random() * (4))]);
  })
  onInput("d", () => {
    getFirst(player).x += 1
     playTune(playerFootSteps[Math.floor(Math.random() * (4))]);
  })
  onInput("l", () => {
    if(hasFlash == 1 && flashCooldown < 1){
      flash();
    }
  })

  
}

function flash(){
  //Checks if player even has a flash
  if(hasFlash == 1){
      playTune(flashsound[0]);
      flashesUsed++;
    //Blinds Nearby
    for(let i = getFirst(player).x - 2; i < getFirst(player).x + 3; i ++){
      for(let j = getFirst(player).y - 2; j < getFirst(player).y + 3; j ++){
        if(i < 0 || j < 0 || i > width()-1 || j > height()-1){
          //Do nothing, just need this because game is silly when you flash on edge of map
        } else {
          addSprite(i, j, "f");  
        }
        
      }
    }

    //Changes how far player can see temporarily
    eyeSight = levelModifiers[level][0] + 3; //Increases Eyesight to determined number
    if(eyeSight > 5){
      eyeSight = 5;
    }

    //Gives flash a Cooldown
    flashCooldown = 8;

    //Controls how bad guys react to flash    
    //All Bad guys go to orgin of flash
    target = [getFirst(player).x, getFirst(player).y];
    //If a bad guy is within range (2 blocks) It will cause them to flee
    for(let i = 0; i < getAll("e").length; i ++){
      if(Math.pow((getFirst(player).x - getAll("e")[i].x),2) + Math.pow(getFirst(player).y - getAll("e")[i].y,2) < levelModifiers[level][3])
        isFleeing[i] = levelModifiers[level][2];  
    }
    
    //addText("!", {x: 10, y: 8, color: color`3`} ); //visual indicator for flash taking time
    updateDarkness();
  }
}

function flashTimer(){
  //Flash controller
  flashCooldown --;


  if(flashCooldown >= 0){
    if(flashCooldown % 1 == 0){
    playTune(flashsound[1]);
    }

    
    
     switch(flashCooldown){
      case 0:
        playTune(flashsound[2]);
      break;
    case 2:
       //Sets vision to normal
       eyeSight = levelModifiers[level][0]; 
       updateDarkness();
       break;
         
    case 5:
        eyeSight = levelModifiers[level][0] + 1; // increases View
         if(eyeSight > 5){
           eyeSight = 4;
           //maximum Eyesight lets you see
         }
         updateDarkness()
      break;
    case 6:
         eyeSight = levelModifiers[level][0] + 2; // increases View
         if(eyeSight > 5){
           eyeSight = 4;
           //maximum Eyesight lets you see
         }
         updateDarkness()
      break;
      
    case 7:
          //deletes all  white tiles
         var flashBanged = getAll(flashBang);
        for(let i = 0; i < flashBanged.length; i ++){
          flashBanged[i].remove();
          
        }
      
        
         
        updateDarkness()
      break;
      
    default:
      break;  
    }
  }

  
    
}

function changeLevel(){
  
  level ++;  
  if(level < 3){
     playTune(nextFloor[0]);  
  } else if(level < 5){
    playTune(nextFloor[1]);
  } else if (level < 10) {
    playTune(nextFloor[2]);
  } else if (level < 15){
    playTune(nextFloor[3])
  } else if (level < 20){
    playTune(nextFloor[4])
  } else if (level < 25) {
    playTune(nextFloor[5])
  } else {
    playTune(nextFloor[6])
  }

  
    setMap(levels[level]);

  //Resests the entireirty of flashing sytstems
  eyeSight = levelModifiers[level][0];
  flashCooldown = 0;
  var flashBanged = getAll(flashBang);
        for(let i = 0; i < flashBanged.length; i ++){
          flashBanged[i].remove();
        }
  initializeDarkness();
  updateDarkness();
  
  enemySpeed = levelModifiers[level][1];

  if(level == 26){
    exactFinishTime = intrevalCount;
  }
  
  textManager();
   eventTimer = 0;
}

//Death door manager
function exitDoorManager(){
  if(lives < 0)
  {
    if(getFirst(player).x == getFirst(exitdoor).x && getFirst(player).y == getFirst(exitdoor).y)
    {
      lives = 3;
      level = -1;
      timer = 0;
      isFleeing = [];
      hasFlash = 0;
      intrevalCount = 0;
      for(var resetLevelVariables = 0; resetLevelVariables < levelModifiers.length; resetLevelVariables ++){
      levelModifiers[resetLevelVariables][1] +=  3 * retries;
      levelModifiers[resetLevelVariables][2] += retries;
      levelModifiers[resetLevelVariables][3] -= 2 * retries;
      }
      retries = 0;
      changeLevel();
      
    }
    else if(getFirst(player).x == getFirst(afterLifeDoor).x && getFirst(player).y == getFirst(afterLifeDoor).y)
    {
    if(retries > 3){
      for(let makeLevelsHarder = 0; makeLevelsHarder < levelModifiers.length; makeLevelsHarder ++){
        levelModifiers[makeLevelsHarder][1] -= 3;
        levelModifiers[makeLevelsHarder][2] --;
        levelModifiers[makeLevelsHarder][3] += 2;
      
        //makes sure numbers do not enter negatives
        if(levelModifiers[makeLevelsHarder][1] <= 0){
          levelModifiers[makeLevelsHarder][1] = 1;
        }
        if(levelModifiers[makeLevelsHarder][2] <= 0){
          levelModifiers[makeLevelsHarder][2] = 1;
        }
      }
    }
         
      isFleeing = [];
      lives = 3;
      level --;
      retries++;
      changeLevel();
  }
  }
  else
  {
   if(getFirst(player).x == getFirst(exitdoor).x && getFirst(player).y == getFirst(exitdoor).y)
   {
     changeLevel();
   }
  }
  
 

  }

function textManager(){
  clearText();

  //addText(levelModifiers[level][1] + "", {x: 1, y: 2 + 3, color: color`2`})

  //level display
  addText(""+ (level+1), {x: 18,y: 1,color: color`2`}) 

  //timer display
  if(level > 19)
  addText("" + timer , {x: 17,y: 15, color: color`L`})
  
  //Lives display
  lifeSymbol = "";
  for(let i = 0; i < lives; i++){
    lifeSymbol += "|";
  }
  switch(lives){
    case 0:
      addText("---", {x: 1, y: 1, color: color`3`})
    case 1:
      addText(lifeSymbol , { x: 1, y: 1, color: color`3`})  
      break;
    case 2:
      addText(lifeSymbol , { x: 1, y: 1, color: color`6`})  
      break
    default:
      addText(lifeSymbol , { x: 1, y: 1, color: color`2`})  
      break;
  }

  //Retries Display
  if(retries > 0){
    addText("x" + retries, { x: 4, y: 1, color: color`3`})  
  }

  
  //Level Text:
  if(lives > 0){
  switch(level){
    case 0:
      if(timer ==  2 || timer == 4 || timer == 5){playTune(popUpSoundEffect)}
      
      if(timer >= 4){
        if(timer >=5){
        addText("Press", {x: 6, y: 7, color: color`2`});
        addText("D", {x: 12, y: 7, color: color`7`});  
        }
        
        addText("------------>", {x: 4, y: 10, color: color`2`});
      } else if(timer >= 2){
        addText("FLASH", {x: width()/2 - 1, y: 9, color: color`7`});
      } else {
        addText("The Maze Game", {x: 4, y: 9, color: color`L`});
      }
      break;
      
    case 1:
      addText("Use", {x: 4, y: 9, color: color`2`});
      addText("W,A,S,D", {x: 8, y: 9, color: color`7`});
      break;
    case 2:
      addText("F\nI\nN\nD\n\nT\nH\nE", {x: 1, y: 5, color: color`2`});
      addText("E\nX\nI\nT", {x: 4, y: 7, color: color`7`});
      break;
    case 4:
      addText("Avoid", {x: 1, y: 9, color: color`2`});
      addText("RED", {x: 1, y: 11, color: color`3`});
      break;
    case 5:
  
      if(eventTimer >= 4){eventTimer = 0;}
      //addText(""+ eventTimer, {x: 10, y: 7, color: color`3`});
        switch(eventTimer){
          case 0:
            addText("They", {x: 1, y: height(), color: color`3`});
            break;
          case 1:
            addText("Steal", {x: 1, y: height(), color: color`2`});
            break;
          case 2:
            addText("your", {x: 1, y: height(), color: color`2`});
            break;
          case 3:
            addText("Lives |", {x: 1, y: height(), color: color`7`});
            break;
        }
      
      
     
      break;

    case 11:
      if(hasFlash == 1){
        addText("L", {x: 6, y: 13, color: color`2`})
        addText("to use", {x: 8, y: 13, color: color`2`})
          
      }
    break;

    case 13:
      addText("Flash stuns", {x: 1, y: 4, color: color`2`})
      addText("enemies", {x: 1, y: 7, color: color`3`})
      break;

    case 26:
        addText("You Won!", {x: 8, y: 3, color: color`2`})
        addText("Retries: " + retries, {x: 8, y: 6, color: color`2`})
        addText("Flashes: " + flashesUsed, {x: 8, y: 8, color: color`2`})
        addText("Time: " + timer, {x: 8, y: 10, color: color`2`})
        addText("Exact: " + exactFinishTime, {x: 8, y: 12, color: color`2`})
      
      break;
      
    default:
      break;
    }
  }
  
  if(hasFlash == 1){
    if(flashCooldown <= 1){
      addText("<++++>" , { x: 7, y: 1, color: color`2`})
    }
    else if(flashCooldown > 6)
    {
      addText("<+   >", { x: 7, y: 1, color: color`3`})
    }
    else if(flashCooldown > 4)
    {
      addText("<++  >", { x: 7, y: 1, color: color`3`})
    }
    else if(flashCooldown > 2)
    {
      addText("<+++ >", { x: 7, y: 1, color: color`3`})
    } 
    else if(flashCooldown > 1)
    {
      addText("<++++>", { x: 7, y: 1, color: color`3`})
    }
  }

  if(lives < 0){
    addText("Restart", {x:2, y:7, color:color`7`})
    addText("<----o", {x:2, y:9, color:color`2`})
    addText("Go Back", {x:11, y:7, color:color`3`})
    addText("o---->", {x:12, y:9, color:color`2`})
  }

}
