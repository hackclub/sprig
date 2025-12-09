/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: a-maze-ing
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const checkpoint = "c"
const melody = tune`
500,
500: D4~500 + B4^500,
500: D4~500 + B4^500,
500: G4~500 + D5^500,
500: G4~500 + D5^500,
500: E4~500 + B4^500,
500: D4^500 + A4~500,
500: E4~500 + B4^500,
500: G4~500 + A4^500 + F4-500,
500,
500: G4~500 + A4^500 + F4-500,
500: G4~500 + A4^500 + F4-500,
500: D4/500,
500: E4/500,
500: D4~500 + B4^500 + F4/500,
500: D4~500 + B4^500,
500: G4~500 + D5^500,
500: G4~500 + D5^500,
500: E4~500 + B4^500,
500: A4~500 + D4^500,
500: E4~500 + B4^500,
500: G4~500 + A4^500 + F4-500,
500,
500: G4~500 + A4^500 + F4-500,
500: G4~500 + A4^500 + F4-500,
500: D4/500,
500: E4/500 + A4^500,
500: F4/500 + B4~500 + G4^500,
500: A4~500 + F4^500,
500: G4~500 + E4^500,
500: F4~500 + D4^500,
500: C4^500 + E4~500`
const teleport = tune`
500,
500: C5/500,
15000`
const falsewall = "f"
const greg ="g"
const gork = "r"


setLegend(
  [ player, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4440044444400444
4440044444400444
4444444444444444
4444444444444444
4440000000000444
4444000000004444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ],
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
0000000000000000` ],
  [ checkpoint, bitmap`
....00000000....
...0888888880...
..008000000800..
.00007777770000.
0880000000000880
0807000880007080
0807000000007080
0807080770807080
0807080770807080
0807000000007080
0807000880007080
0880000000000880
.00007777770000.
..008000000800..
...0888888880...
....00000000....`],
  [ falsewall, bitmap`
0000000000L00000
000L000000LL0000
0LL0L0000L00LL00
L0000L0LL0000000
0000000000000000
0000000000000000
000000000000LLL0
00LLLLLL000LL00L
LL00000L00L00000
00000000LL000000
000000LL0000L0L0
0000000000000000
0000000000L00000
000LLLL0000LLLL0
0LL0000000LLL000
L000000000L00000`],
  [ greg, bitmap`
................
....00000000....
...000LLLLL00...
..000L00000L00..
.000L0000000L00.
.00L110011111L0.
.000L110110LLL0.
.0000LL100L0000.
.00000L0111L000.
.00000L101L0000.
.0011110011L000.
.00L00000010L00.
..00L000001L00..
...00LLLLLL00...
....00000000....
................`],
  [ gork, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000033333300000
0000300000030000
0200302002030020
0020300000030200
0002700000072000
0000700000070000
0000700000070000
0000077777700000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
  )

setSolids([player, wall, gork, greg]);
setPushables({
  [player]: [falsewall]
});


let level = 0
const levels = [
  map`
wwwwwwwww
wpw...w.w
w.w.w.w.w
w.w.w.w.w
w.w.w.w.w
w...w...w
www.w.w.w
w.....w.c
wwwwwwwww`,
  map`
pf.w.w.
.www.f.
...w.w.
ww.w.w.
...w.wc
.wwwrww
.......`,
  map`
pw..w....
.ww.w.wwf
......w..
www.www.w
....w....
.wwww.ww.
......wc.`,
   map`
p....w.....
wwww.f.www.
..cw.w.w...
.wwf.w.f.ww
.w.....w...
.wwwwwwww.w
.....r.....`,
  map`
.f..w...w
pww...w..
wwwwwww.w
..cw..f..
..ww..rw.
.wgwwwfw.
.w.......
.....www.`,
   map`
pw...w...
.wcw...w.
..wwwfwr.....
w........`,
  map`
.ppp.....
.p.p.pp.p
.....p..p
pppppp.pp
r...cp...
.ppppp.pp
....p...p
p.p....pp`
]

const playback = playTune(melody, Infinity)


setMap(levels[level])

onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

onInput("i", () => {
  getFirst(gork).y -= 1
})
onInput("k", () => {
  getFirst(gork).y += 1
})
onInput("j", () => {
  getFirst(gork).x -= 1
})
onInput("l", () => {
  getFirst(gork).x += 1
})


afterInput(() => {
  
})


afterInput(() => {
  // check if the player is on a checkpoint
  const playerOnCheckpoint = tilesWith(player, checkpoint).length > 0;

  if (playerOnCheckpoint) {
    // increase the current level number
    level = level + 1;
    playTune(teleport)


    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 8, color: color`7` });
    }
  }
});



