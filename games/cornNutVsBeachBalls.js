/*
@title: Corn Nut vs Beach Balls
@description: You are a corn nut, and you must push the beach balls into the goal (marked G)
@author: fog
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const background = "z" //???? why do i need to set this if im never gonna use it
const block = "b"
const goal = "g"
const backgroundMusic = tune`
315.7894736842105: F5^315.7894736842105 + D4-315.7894736842105 + F4-315.7894736842105 + D5^315.7894736842105,
315.7894736842105: E5~315.7894736842105 + E4~315.7894736842105 + G4~315.7894736842105 + C5~315.7894736842105,
315.7894736842105: E5^315.7894736842105 + E4-315.7894736842105 + G4-315.7894736842105 + C5^315.7894736842105,
315.7894736842105: F5^315.7894736842105 + D4-315.7894736842105 + F4-315.7894736842105 + D5^315.7894736842105,
315.7894736842105: G5^315.7894736842105 + C4-315.7894736842105 + E4-315.7894736842105 + E5^315.7894736842105,
315.7894736842105: F5^315.7894736842105 + D4-315.7894736842105 + F4-315.7894736842105 + D5^315.7894736842105,
315.7894736842105: E5^315.7894736842105 + E4-315.7894736842105 + G4-315.7894736842105 + C5^315.7894736842105,
315.7894736842105: E5^315.7894736842105 + E4-315.7894736842105 + G4-315.7894736842105 + C5^315.7894736842105,
315.7894736842105: G5^315.7894736842105 + C4-315.7894736842105,
315.7894736842105: E4~315.7894736842105 + E5~315.7894736842105 + C5~315.7894736842105,
315.7894736842105: G5^315.7894736842105 + C4-315.7894736842105,
315.7894736842105: E5^315.7894736842105 + E4-315.7894736842105 + C5^315.7894736842105 + G4-315.7894736842105,
315.7894736842105: E5^315.7894736842105 + E4-315.7894736842105 + C5^315.7894736842105 + G4-315.7894736842105,
315.7894736842105: D5^315.7894736842105 + F4-315.7894736842105 + B4^315.7894736842105 + A4-315.7894736842105,
315.7894736842105,
315.7894736842105: F5^315.7894736842105 + D4-315.7894736842105 + F4-315.7894736842105 + D5^315.7894736842105,
315.7894736842105: F5^315.7894736842105 + D4-315.7894736842105 + F4-315.7894736842105 + D5^315.7894736842105,
315.7894736842105: E4~315.7894736842105 + E5~315.7894736842105 + G4~315.7894736842105 + C5~315.7894736842105,
315.7894736842105: F5^315.7894736842105 + D4-315.7894736842105 + F4-315.7894736842105 + D5^315.7894736842105,
315.7894736842105: F5^315.7894736842105 + D4-315.7894736842105 + F4-315.7894736842105 + D5^315.7894736842105,
315.7894736842105: D5^315.7894736842105 + F4-315.7894736842105 + A4-315.7894736842105 + B4^315.7894736842105,
315.7894736842105: G4~315.7894736842105 + C5~315.7894736842105,
315.7894736842105: G5^315.7894736842105 + C4-315.7894736842105 + E4-315.7894736842105 + E5^315.7894736842105,
315.7894736842105: G5^315.7894736842105 + C4-315.7894736842105 + E4-315.7894736842105 + E5^315.7894736842105,
315.7894736842105: E5^315.7894736842105 + E4-315.7894736842105 + G4-315.7894736842105 + C5^315.7894736842105,
315.7894736842105: F5^315.7894736842105 + D4-315.7894736842105 + F4-315.7894736842105 + D5^315.7894736842105,
315.7894736842105: E4~315.7894736842105 + E5~315.7894736842105 + G4~315.7894736842105 + C5~315.7894736842105,
315.7894736842105: D5^315.7894736842105 + F4-315.7894736842105 + A4-315.7894736842105,
315.7894736842105: C5~315.7894736842105 + G4~315.7894736842105,
315.7894736842105: D5^315.7894736842105 + F4-315.7894736842105 + A4-315.7894736842105,
315.7894736842105: E5^315.7894736842105 + F5^315.7894736842105 + E4-315.7894736842105 + D4-315.7894736842105 + G4-315.7894736842105,
315.7894736842105`;
const winMusic = tune`
133.33333333333334: F4/133.33333333333334 + E4^133.33333333333334 + G4~133.33333333333334,
133.33333333333334,
133.33333333333334: F4^133.33333333333334 + A4-133.33333333333334 + G4/133.33333333333334,
133.33333333333334,
133.33333333333334: F4^133.33333333333334 + G4/133.33333333333334 + A4-133.33333333333334,
133.33333333333334,
133.33333333333334: F4/133.33333333333334 + G4-133.33333333333334 + E4^133.33333333333334,
133.33333333333334,
133.33333333333334: G4/133.33333333333334 + A4-133.33333333333334 + F4^133.33333333333334,
133.33333333333334,
133.33333333333334: A4/133.33333333333334 + G4^133.33333333333334 + B4~133.33333333333334 + C5-133.33333333333334,
2800`;

var gameTimer = 36;

setLegend(
  [ player, bitmap`
................
................
......666.......
.....66666......
....6666666.....
..6.666C666.6...
..F.66C0C06.F...
..F666CCC666F...
....66C0006.....
....F6CCC6F.....
....F66C66F.....
.....F666F......
......F.F.......
......F.F.......
.....FF.FF......
................`],
  [ wall, bitmap`
...DDDDDDDDDD...
.DDDD4DD4D4DDDD.
DDDD4D44D4D4D4DD
DD4DD4DD4D4D4D4D
DDDD4DD444D4D4DD
DDDDD4DD4D4D4D4D
DDD4DD44D4DD44DD
DDDDD4DD4D44DD4D
DDDDDDD4D4DD44DD
D4DDD4DD4D44DD4D
DDDDDDDDDD4DD4DD
DDDDDDDD4DDD4D4D
DDDDDDDDDDDDD4DD
DDDDD4DDDDD4DDDD
.DDDDDDDDDDDDDD.
...DD.CCCCDDD...`],
  [ background, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ block, bitmap`
....77777777....
..777777777777..
.32777777777729.
.33277777777299.
3333277777729999
3333322222299999
3333322222299999
3333322222299999
3333322222299999
3333322222299999
3333322222299999
3333266666629999
.33266666666299.
.32666666666629.
..666666666666..
....66666666....`],
  [ goal, bitmap`
....DDDDDDDD....
..DDDCCCCCCDDD..
.DDCCCCCCCCCCDD.
.DCCC444444CCCD.
DDCC4DDDDDD4CCDD
DCC4DDCCCCDD4CCD
DCC4DCCCCCCD4CCD
DCC4DCCCCCCCCCCD
DCC4DCCC44444CCD
DCC4DCCCCCCD4CCD
DCC4DDCCCCDD4CCD
DDCC4DDDDDD44CDD
.DCCC444444C4CD.
.DDCCCCCCCCCCDD.
..DDDCCCCCCDDD..
....DDDDDDDD....`],
)

setBackground([ background ])
setSolids([ player, wall, block ])

let level = 0
const levels = [
  map`
www
wpw
wbw
w.w
w.w
w.w
wgw
www`,
  map`
wwww
wp.w
w.bw
w..w
w..w
w..w
w.gw
wwww`,
  map`
wwwww
wp..w
w...w
wwb.w
w...w
w..ww
w..gw
wwwww`,
  map`
wwwwww
wp...w
w....w
w.bw.w
w....w
w...ww
ww..gw
wwwwww`,
  map`
wwwwwww
wp....w
wwwww.w
ww....w
ww.b..w
wwww..w
wg....w
wwwwwww`,
  map`
wwwwwwww
wpwww..w
w..wg..w
wwbww..w
w..ww..w
w......w
w......w
wwwwwwww`,
  map`
wwwwwwwww
wp.w..w.w
w.....w.w
w..w..w.w
w..w....w
w.bww.w.w
w..wg...w
wwwwwwwww`,
  map`
wwwwwwwwww
wp.w..w..w
w.bw.....w
w..ww..w.w
w......w.w
ww..w..w.w
wwwwwwwwgw
wwwwwwwwww`,
  map`
wwwwwwwwwww
wp...w....w
w....b....w
w.bw.ww..ww
w....ww..ww
w...wwg...w
ww..gw....w
wwwwwwwwwww`,
  map`
wwwwwwwwwwww
wp..www...gw
w..........w
w...w..w..ww
w.ww...w..ww
wgw..b.w...w
ww.b.b.....w
ww.....ww.gw
wwwwwwwwwwww`,
  map`
wwwwwwwwwwwww
wgpw........w
w..wbw.wwww.w
w....w.b....w
w.w.....www.w
w....w......w
wgw.w...w...w
wwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwww
wp..w..w.w...w
w...b..w.....w
w.bww..w..ww.w
w...w..w..w..w
w...w.....w..w
ww..gw....w.gw
wwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wpw.b.....g..gw
w....wwwwwwww.w
w.bw..w...w..bw
w..w.bw.......w
w..w......w...w
w..g.....wg...w
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
w.............w
w.ww........b.w
w.wg.....b....w
w..wg..ww.wwwww
w.bww.w....w.pw
w..gwg.....b..w
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
wpw............w
w.....w....b...w
w.bw.bwwgwb.wb.w
w..w..wgwg..w..w
w..w.....w..w..w
w..g..........gw
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwww
g....b.g...g..wpw
w..w....w..w....w
wwbw.....wbw.wbww
w....wbw.....w..w
wb..w..w.....w..w
wg.....g.....g..w
wwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwww
w...............w
w...............w
w...............w
w.......p.......w
w...............w
w...............w
w...............w
wwwwwwwwwwwwwwwww`,
 //you Must defeat my 16 evil Maps
]

setMap(levels[0])

setPushables({
  [ player ]: [ block, player ],
})

let gameIntervals = [];

gameIntervals.push(
  setInterval(() => {
    if (level < 16) {
    gameTimer -= 1;
    addText(gameTimer + "", { y: 2, color:color`2` });
    if (gameTimer <= 0) {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
     }
    }
   }
  }, 1000)
);

let playback = playTune(backgroundMusic, Infinity)

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    gameTimer = 36;
  }
});

onInput("i", () => {
  if (playback) playback.end()
});

onInput("k", () => {
  if (playback) {
    playback.end()
    playback = playTune(backgroundMusic, Infinity)
  }
});

console.log("Grungular...");

afterInput(() => {

  const targetNumber = tilesWith(goal).length;
  
  const numberCovered = tilesWith(goal, block).length;

  if (numberCovered === targetNumber) {
    level = level + 1;
    gameTimer = 36;
    
    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you did it!!!", { y: 2, color: color`3` });
      if (playback) playback.end()
      playTune(winMusic)
    }
  }
})