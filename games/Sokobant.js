/*
@title: Sokobant
@author: Brenda Díaz Bordón
@description: Can an ant sokoban? Indeed it can! Push the piles of sugar into the anthill to win.
@tags: ['sokoban', 'puzzle']
@addedOn: 2025-10-20
*/

const player = "p"
const sugar = "s"
const wall = "w"
const wall1 = "1"
const wall2 = "2"
const wall3 = "3"
const wall4 = "4"
const wall5 = "5"
const wall6 = "6"
const wall7 = "7"
const wall8 = "8"
const wall9 = "9"
const hole = "h"
const ground = "g"

setLegend(
  [ player, bitmap`
................
...3........3...
....3......3....
.....CCCCCC.....
.....C2CC2C.....
.....C0CC0C.....
.....CCCCCC.....
......CCCC......
......0CC0......
......C00C......
......CCCC......
......CCCC......
......FCCF......
.....FFCCFF.....
....FFF..FFF....
................` ],
  [ sugar, bitmap`
................
................
................
......222222....
....22222222....
...2221222222...
..22212222222...
..22222222122...
..22222222L12...
..222222222222..
.2222212222222..
.2222222222222..
.2112222222222..
.22L1222222112..
..22222222222...
................` ],
  [ wall, bitmap`
1CCLC0CC1CC0CCLC
CC0CLC0CCCLC0CCC
L1C0CCCC1CCCCCC0
CCCCCCLCC0CCCLCC
CC0C1CCCCC00CCC1
0CCLC0CLC1CCCC0C
CCLCCCCCCC1CL0CL
CC0CLC1CC0CCCCCC
0CCCCC00CC0CCCC0
C0C1CCCCCLCLC0CC
CC0C0CLC0CCCCC1C
LCCCCCC1CC0C1CCL
C1CLC0CCCCCCC0CC
CCCCCCCCLCC1CCCC
10C01CLC0CCLCC0C
C0CCC0CCLCCC0CCL` ],
  [ wall1, bitmap`
...LC0CC1CC0CCLC
.C0CLC0CCCLC0CCC
.1C0CCCC1CCCCCC0
CCCCCCLCC0CCCLCC
CC0C1CCCCC00CCC1
0CCLC0CLC1CCCC0C
CCLCCCCCCC1CL0CL
CC0CLC1CC0CCCCCC
0CCCCC00CC0CCCC0
C0C1CCCCCLCLC0CC
CC0C0CLC0CCCCC1C
LCCCCCC1CC0C1CCL
C1CLC0CCCCCCC0CC
CCCCCCCCLCC1CCCC
10C01CLC0CCLCC0C
C0CCC0CCLCCC0CCL` ],
  [ wall2, bitmap`
1CCLC0CC1CC0C...
CC0CLC0CCCLC0C..
L1C0CCCC1CCCCCC.
CCCCCCLCC0CCCLCC
CC0C1CCCCC00CCC1
0CCLC0CLC1CCCC0C
CCLCCCCCCC1CL0CL
CC0CLC1CC0CCCCCC
0CCCCC00CC0CCCC0
C0C1CCCCCLCLC0CC
CC0C0CLC0CCCCC1C
LCCCCCC1CC0C1CCL
C1CLC0CCCCCCC0CC
CCCCCCCCLCC1CCCC
10C01CLC0CCLCC0C
C0CCC0CCLCCC0CCL` ],
  [ wall3, bitmap`
1CCLC0CC1CC0CCLC
CC0CLC0CCCLC0CCC
L1C0CCCC1CCCCCC0
CCCCCCLCC0CCCLCC
CC0C1CCCCC00CCC1
0CCLC0CLC1CCCC0C
CCLCCCCCCC1CL0CL
CC0CLC1CC0CCCCCC
0CCCCC00CC0CCCC0
C0C1CCCCCLCLC0CC
CC0C0CLC0CCCCC1C
LCCCCCC1CC0C1CCL
C1CLC0CCCCCCC0CC
.CCCCCCCLCC1CCCC
..C01CLC0CCLCC0C
...CC0CCLCCC0CCL` ],
  [ wall4, bitmap`
1CCLC0CC1CC0CCLC
CC0CLC0CCCLC0CCC
L1C0CCCC1CCCCCC0
CCCCCCLCC0CCCLCC
CC0C1CCCCC00CCC1
0CCLC0CLC1CCCC0C
CCLCCCCCCC1CL0CL
CC0CLC1CC0CCCCCC
0CCCCC00CC0CCCC0
C0C1CCCCCLCLC0CC
CC0C0CLC0CCCCC1C
LCCCCCC1CC0C1CCL
C1CLC0CCCCCCC0CC
CCCCCCCCLCC1CCC.
10C01CLC0CCLCC..
C0CCC0CCLCCC0...` ],
  [ wall5, bitmap`
...LC0CC1CC0C...
..0CLC0CCCLC0C..
.1C0CCCC1CCCCCC.
CCCCCCLCC0CCCLCC
CC0C1CCCCC00CCC1
0CCLC0CLC1CCCC0C
CCLCCCCCCC1CL0CL
CC0CLC1CC0CCCCCC
0CCCCC00CC0CCCC0
C0C1CCCCCLCLC0CC
CC0C0CLC0CCCCC1C
LCCCCCC1CC0C1CCL
C1CLC0CCCCCCC0CC
CCCCCCCCLCC1CCCC
10C01CLC0CCLCC0C
C0CCC0CCLCCC0CCL` ],
  [ wall6, bitmap`
1CCLC0CC1CC0C...
CC0CLC0CCCLC0C..
L1C0CCCC1CCCCCC.
CCCCCCLCC0CCCLCC
CC0C1CCCCC00CCC1
0CCLC0CLC1CCCC0C
CCLCCCCCCC1CL0CL
CC0CLC1CC0CCCCCC
0CCCCC00CC0CCCC0
C0C1CCCCCLCLC0CC
CC0C0CLC0CCCCC1C
LCCCCCC1CC0C1CCL
C1CLC0CCCCCCC0CC
CCCCCCCCLCC1CCC.
10C01CLC0CCLCC..
C0CCC0CCLCCC0...` ],
  [ wall7, bitmap`
1CCLC0CC1CC0CCLC
CC0CLC0CCCLC0CCC
L1C0CCCC1CCCCCC0
CCCCCCLCC0CCCLCC
CC0C1CCCCC00CCC1
0CCLC0CLC1CCCC0C
CCLCCCCCCC1CL0CL
CC0CLC1CC0CCCCCC
0CCCCC00CC0CCCC0
C0C1CCCCCLCLC0CC
CC0C0CLC0CCCCC1C
LCCCCCC1CC0C1CCL
C1CLC0CCCCCCC0CC
.CCCCCCCLCC1CCC.
..C01CLC0CCLCC..
...CC0CCLCCC0...` ],
  [ wall8, bitmap`
...LC0CC1CC0CCLC
..0CLC0CCCLC0CCC
.1C0CCCC1CCCCCC0
CCCCCCLCC0CCCLCC
CC0C1CCCCC00CCC1
0CCLC0CLC1CCCC0C
CCLCCCCCCC1CL0CL
CC0CLC1CC0CCCCCC
0CCCCC00CC0CCCC0
C0C1CCCCCLCLC0CC
CC0C0CLC0CCCCC1C
LCCCCCC1CC0C1CCL
C1CLC0CCCCCCC0CC
.CCCCCCCLCC1CCCC
..C01CLC0CCLCC0C
...CC0CCLCCC0CCL` ],
  [ wall9, bitmap`
...LC0CC1CC0C...
..0CLC0CCCLC0C..
.1C0CCCC1CCCCCC.
CCCCCCLCC0CCCLCC
CC0C1CCCCC00CCC1
0CCLC0CLC1CCCC0C
CCLCCCCCCC1CL0CL
CC0CLC1CC0CCCCCC
0CCCCC00CC0CCCC0
C0C1CCCCCLCLC0CC
CC0C0CLC0CCCCC1C
LCCCCCC1CC0C1CCL
C1CLC0CCCCCCC0CC
.CCCCCCCLCC1CCC.
..C01CLC0CCLCC..
...CC0CCLCCC0...` ],
  [ hole, bitmap`
................
................
................
................
................
....CCCCC.......
...C0000CCCC....
..C00000000C....
..C000000000C...
..C0000000000C..
..C0000000000C..
..CC000000000C..
...CCC0000000C..
.....CCC00000C..
.......CCCCCC...
................` ],
  [ ground, bitmap`
4444444444444444
444444444444D444
4444D4444444D444
4444D444D444D444
444D4444D4444D44
444D44444D444D44
444D44444D444D44
4444444444444444
4444444444444444
4444444D44444444
44D4444D44444444
44D444D444D44444
444D44D4444D4444
444D44D4444D4444
4444444444444444
4444444444444444` ]
)

setBackground(ground)
setSolids([ player, sugar, wall, wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9 ])

const music = tune`
250: D4-250 + F5~250,
250: C4/250,
250: D4-250 + E5~250,
250: C4/250,
250: D5^250,
250: C4/250 + F5~250,
250: D4-250,
250: C4/250 + E5~250,
250: E5~250,
250: C4/250,
250,
250: C4/250 + F5~250 + D5^250,
250: D4-250,
250: C4/250,
250: D4-250,
250: C4/250 + E5~250,
250: E5~250,
250: C4/250,
250: D4-250 + F5~250,
250: C4/250,
250: D5^250,
250: C4/250,
250: E5~250,
250: C4/250 + E5~250,
250: D4-250,
250: C4/250 + F5~250,
250,
250: C4/250 + D5^250,
250: D4-250,
250: C4/250 + E5~250,
250: E5~250,
250: C4/250 + F5~250`
//const playback = playTune(music, Infinity)

let level = 0
const levels = [
  map`
wwwwww
w..www
w.s3ww
w.p.hw
w2.shw
wwwwww`,
  map`
wwwwwww
wwww..w
w.h7s.w
wh..h.w
w..ss.w
w..p.1w
wwwwwww`,
  map`
wwwwwwwww
wh..w4h3w
wh.s7p..w
w.....s.w
w..s...1w
www2s..ww
wwww.h1ww
wwwwwwwww`,
  map`
wwwwwwwwwwww
wwwww4..wwww
www4hs..wwww
w..h...swwww
w.8ww6..wwww
w.s...p.3www
w.s.h..h..ww
w2.9......ww
ww...12h.1ww
wws.h3w6swww
ww.......www
wwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwww
wwwwww..wwwwwwwwwww
wwhwww.swwwwwwwwwww
ww.7h7..3wwwwwwwwww
ww.......h.wwwwwwww
ww...1w2...wwwwwwww
ww6.1www2.1wwwwwwww
w...3www4.3wwwwwwww
w.s.s....p.....3www
w2..1www2....s...ww
ww..wwwww.1wh5.9s3w
ww.swwww4.3w.w..s.w
ww..wh..h..7.7hs..w
wwwwwwww2...s.....w
wwwwwwww4..5s.1wwww
wwwwh....hhw..wwwww
wwwwwwwwwwwwwwwwwww`
]
const messages = [
  ["First one is", "always easy"],
  ["Hmmm I guess", "it's fine"],
  ["That's actually", "impressive"],
  ["No way, you are", "almost there!"]
]

setMap(levels[level])

setPushables({
  [ player ]: [ sugar ]
})

onInput("w", () => { getFirst(player).y -= 1 })
onInput("a", () => { getFirst(player).x -= 1 })
onInput("s", () => { getFirst(player).y += 1 })
onInput("d", () => { getFirst(player).x += 1 })

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

function loadNextLevel() {
  level = level + 1;
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    setMap(currentLevel);
    clearText()
  } else {
    addText("You Win!", { y: 5, color: color`3` });
  }
}
afterInput(() => {
  const targetNumber = tilesWith(hole).length;
  const numberCovered = tilesWith(hole, sugar).length;

  if (numberCovered === targetNumber) {
    addText(messages[level][0], { y: 4, color: color`6` })
    addText(messages[level][1], { y: 5, color: color`6` })
    
    setTimeout(loadNextLevel, 2000)
  }
});
