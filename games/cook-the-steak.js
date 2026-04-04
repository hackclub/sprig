/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: box pusher
@author: 
@tags: []
@addedOn: 2025-00-00
*/



/*
make the score reset after level reset and between levels.
*/
const player = "p"
const steak = "f"
const grill = "g"
const wall = "w"
const wall2 = "r"
const grass = "h"
const colorsircel = "o"
const black = "b"
const coin = "c"
const spikeUp = "^"
const spikeDown = "_"

const melody = tune`
42.97994269340974: D5-42.97994269340974 + E5-42.97994269340974,
42.97994269340974: C5-42.97994269340974 + D5-42.97994269340974,
42.97994269340974: B4-42.97994269340974 + C5-42.97994269340974,
42.97994269340974: A4-42.97994269340974 + B4-42.97994269340974,
42.97994269340974: B4-42.97994269340974 + A4-42.97994269340974,
42.97994269340974: C5-42.97994269340974 + B4-42.97994269340974,
42.97994269340974: C5-42.97994269340974 + D5-42.97994269340974,
42.97994269340974: E5-42.97994269340974 + D5-42.97994269340974,
1031.5186246418339`



let level = 0
const levels = [
  map`
bbbbbbbbbbb
bbbbbbbbbbb
bbbbwwwbbbb
bbbw.pcwbbb
bbw..wccwbb
bbwfwbwowbb
bbw.wbwcwbb
bww.wbwcwwb
w...wbwcccw
w.w.wbwcwcw
w.w.wwwcwcw
w....gccccw`,
  map`
bbbbbbbbbb
bbbbbbbbbb
rrrrrrrrrr
r...p...cr
rr.rrrrrrr
rr......cr
rrrrrr.rrr
rrcrrr..rr
r....gr.rr
r.f..r..rr
r.r....rrr
rrrrrrrrrr`,
  map`
bbbbbbbbbb
bbbbbbbwwb
wwwwwwwp.w
wg....cw.w
wc...w.w..
wwww..cwwc
c.c.cwww..
.w.w.www.w
.w.w.www.w
.wfw...w.w
c.c.cw..cw
wwwwwwwwww`,
  map`
rrr.......
rc..rrrrr.
r..rrc....
r.rwr..rr.
r..rwr..rc
wr..r.r.rw
wwr...r.pr
wwrrr.rrrw
wwrgr.crww
wwrf..rwww
wwr..r.www`,
  map`
..............................
.b...b.f.......b...b........b.
..b.b..........b...b.b......b.
...b...........b...b........b.
...b.bbb.b.b...b...b.b.bbb..b.
...b.b.b.bpb...b.b.b.b.bgb..b.
...b.b.b.b.b...b.b.b.b.b.b....
...b.bbb.bbb....b.b..b.b.b..b.
..............................`,
]

/*
steps is the active one that gets -= 
steps2 is used to pull the steps for each level
*/
steps = [30, 42, -1]
steps2 = [30, 42, -1]

let stepCounter = 30;


setLegend(
  [player, bitmap`
...222222222....
..22222222222...
.2222222222222..
.2222222222222..
.2222222222222..
.2222222222222..
..22222222222...
...222222222....
...222222222....
...222222222....
...222222222....
...222222222....
...222222222....
................
................
................`],
  [steak, bitmap`
...CCCCCCCCCC...
..CC33333333CC..
.CC32333333333C.
CC332222222223CC
C3333332333333C.
CC333332333333C.
.C33333233333CC.
.CC333323333CC..
..C33322333CC...
..C333233CCC....
...C33233C......
...C3323CC......
...CC323C.......
....C33CC.......
.....C3C........
.....CCC........`],
  [grill, bitmap`
....00000000....
...0L1LCCCL10...
..01L1LCCCL1L0..
.0L333LCCCL1L10.
01L1L1L1L1LCCCL0
033331L1L1LCCCL0
01L1L1LCCCLCCCL0
0111111CCC111110
013331LCCCL1L1L0
01L1L1L1L1LCCCL0
01L33331L1LCCCL0
01L1L1LCCCLCCCL0
.03331LCCCL1L10.
..01L1LCCCL1L0..
...0L1L1L1L10...
....00000000....`],
  [wall, bitmap`
0000000000000000
0222222222222220
0200000000000020
0200000000000020
0200000000000020
0200000000000020
0200000000000020
0200000000000020
0200000000000020
0200000000000020
0200000000000020
0200000000000020
0200000000000020
0200000000000020
0222222222222220
0000000000000000`],
  [wall2, bitmap`
0000000000000000
0333303333303333
0333303333303333
0000000000000000
3303333303333033
3303333303333033
0000000000000000
3333033330333330
3333033330333330
0000000000000000
3033333033330333
3033333033330333
0000000000000000
3333033333033330
3333033333033330
0000000000000000`],
  [grass, bitmap`
DDDDDDDDDDD4DDDD
DD4DDDDDDDD4DDDD
DD4DDDDDDDD4DD4D
DD4DDD4DDDDDDD4D
DDDDDD4DDD4DDD4D
DDDD4D4DDD4DDDDD
D4DD4DDD4D4DDDDD
D4DD4DDD4DDDDDDD
D4DDDDDD4DDDDDDD
DDDDDD4DDDDDD4DD
DDDDDD4DDDDDD4DD
DDD4DD4DD4DDD4DD
DDD4DD4DD4DDD4DD
DDD4DDDDD4DDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [colorsircel, bitmap`
....00000000....
...0333333330...
..033000000330..
.03009999990030.
0330900000090330
0309006666009030
0309060000609030
0309060220609030
0309060220609030
0309060000609030
0309006666009030
0330900000090330
.03009999990030.
..033000000330..
...0333333330...
....00000000....`],
  [black, bitmap`
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
  [coin, bitmap`
................
................
................
.....000000.....
....06666660....
...0666666660...
...0666006660...
...0666006660...
...0666006660...
...0666006660...
...0666666660...
....06666660....
.....000000.....
................
................
................`],
  [spikeUp, bitmap`
................
................
................
................
................
................
................
................
.......00.......
......0000......
.....002200.....
....00200200....
...0020000200...
..002002200200..
.00200200200200.
0000000000000000`],
  [spikeDown, bitmap`
0000000000000000
.00200200200200.
..002002200200..
...0020000200...
....00200200....
.....002200.....
......0000......
.......00.......
................
................
................
................
................
................
................
................`]
  
);

setSolids([player, steak, wall, wall2, colorsircel])



setMap(levels[level])
setBackground(grass)

let score = 0
const scoreX = 0
const scoreY = 0

let collectedCoins = new Set()

setPushables({
  [player]: [steak]
})

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
    score = scoreAtLevelStart; 
    collectedCoins.clear();
    setMap(currentLevel);
    steps[level] = steps2[level]
    stepCounter = steps[level]
  }
});


afterInput(() => {
  
  stepCounter -= 1

  if (stepCounter > -1) {
    addText("Steps: " + stepCounter + " ", {
      x: 0,
      y: 1,
      color: color`2`
    })
  }
  if (steps[level]<0) {
          clearText()
  }
  steps[level] -= 1
  if (steps[level] == 0) {
  score = scoreAtLevelStart;
  collectedCoins.clear();
  setMap(levels[level])
    steps[level] = steps2[level]
    stepCounter = steps[level]
    return;
  }
  if (tilesWith(steak, grill).length > 0) {
    level += 1
    scoreAtLevelStart = score;
    collectedCoins.clear();
    setMap(levels[level])
    if (collectedCoins > 14){
        level += 1
    }
    stepCounter = steps[level]
   
    return;
  }

  const pf = getFirst(player)
  const allCoins = getAll(coin)

  for (const c of allCoins) {
    if (collectedCoins.has(c)) continue
    
    if (pf.x === c.x && pf.y === c.y) {
      collectedCoins.add(c)
      c.remove();
      score += 1;
      playTune(melody)
      console.log("collected coin " + c.x + ", " + c.y);
     }  
   }

  

    
   addText("Score: " + score, {
     x: scoreX,
     y: scoreY,
     color: color`2`
  })
})
