/*
@title: Pickle Run
@author: Cam Phillips
@description: Ever Want To Be A Pickle, Well Here's Your Chance
@tags: [adventure,strategy, puzzle]
@addedOn: 2025-09/18
*/

const background = "o"
const player = "p"
const wall = "w"
const push = "h"
const flag = "g"

setLegend(
  [background, bitmap`
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
  [player, bitmap`
................
................
................
......0000......
.....00DD00.....
.....0DDDD0.....
.....0D2D20.....
.....0DDDD0.....
.....0DLLL0.....
.....0DDDD0.....
.....0DDDD0.....
.....00DD00.....
......0000......
......0..0......
......0..0......
......0..0......` ],
  [push, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L14444444444DD1L
L14444444444DD1L
L14444444444DD1L
L14444444444DD1L
L14444444444DD1L
L14444444444DD1L
L14444444444DD1L
L14444444444DD1L
L14444444444DD1L
L14444444444DD1L
L1DDDDDDDDDDDD1L
L1DDDDDDDDDDDD1L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [wall, bitmap`
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
1111111111111111` ],
  [flag, bitmap`
900220022002200.
900220022002200.
922002200220022.
922002200220022.
900220022002200.
900220022002200.
922002200220022.
922002200220022.
9...............
9...............
9...............
9...............
9...............
9...............
9...............
9...............` ]
)
setBackground([background])
let level = 0
const levels = [
  map`
p`,// Start
  map`
wwwwwww
wp...gw
wwwwwww`,// Level 1
  map`
.wwwwwww.
.w.....w.
.wpwwwgw.
.wwwwwww.`,// Level 2
  map`
wwwwwwwww.
w....wwgw.
w.ww.ww.w.
wpww....w.
wwwwwwwww.`,// Level 3
  map`
wwwwwwwww
w...w...w
w.w.w.wgw
wpw.h..ww
wwwwwwwww`,// Level 4 
  map`
wwwwwwwww
ww.w....w
ww.h..w.w
wwhwwgw.w
wph.w...w
wwwwwwwww`,// Level 5 
  map`
wwwwwwwwww
w...w.h..w
w.w.w.w..w
w.w.w.wwhw
wpw...wg.w
wwwwwwww.w`,// Level 6
  map`
wwwwwwwwwwwww
w...www.....w
w.w.....wwwgw
w.wwwwwww.www
w...........w
wwwwwwwwwhw.w
wp.h.h..h....
wwwwwwwwwwwww`,// Level 7
  map`
wwwwwwwwww.wwww
wg............w
ww.wwwwwwwhwwww
ww............w
wwhwwwwwwwwwwww
ww..p.........w
wwwwwwwwwwwwwww`,// Level 8
  map`
wwwwwwwwwww
ww.w.h..wgw
wwhh...w..w
wph.w.h...w
wwwwwwwwwww`,// Level 9
  map`
wwwwwwwwwwwwwwwww
w...w...w...w...w
w.w.w.w.w.w.w.w.w
w.w.w.w.w.w.w.w.w
w.w.w.w.w.w.w.w.w
w.w.w.w.w.w.w.w.w
w.w.w.w.w.w.w.w.w
w.w.w.w.w.w.w.w.w
wpw...w...w...wgw
wwwwwwwwwwwwwwwww`,// Level 10
  map`
wwwwwwwwww.w
wg.........w
wwhwwwwwwwhw
wp.........w
wwwwwwwwwwww`,// Level 11
  map`
wwwwwwww
wwwwh.hw
wp...hgw
wwwwh.hw
wwww.www`,// Level 12
  map`
wwwwwwwww.
w.pw.h.ww.
w.ww.h..w.
w....hgww.
wwwwwwwww.`,// Level 13
  map`
ww....www
ww..w.wgw
wphhwhw.w
w...w.h..
wwwww.www`,// Level 14
  map`
wwwwwwwww
wph.h..gw
whw.w.w.w
w...whh..
w.www.www`,// Level 15
  map`
wwwwwwwww
www.w.h..
wwhhh...w
w.hph.hgw
wwwwwwwww`,// Level 16
  map`
wwwwwwwwww.w
wwwwwwwg...w
wwww..wwwwhw
w.h...w....w
w.pww.h..www
wwwww.wwwwww`,// Level 17
  map`
wwwwwwwwwwwwww
w............w
w.wwwwwwwwww.w
w.wg.......w.w
w.wwwwwwww.w.w
w..........w.w
wwwwwwwwwwww.w
wp...........w
wwwwwwwwwwwwww`,// Level 18
  map`
w.wwwwwwwwwwww
w...hhh.......
w.wwwwwwwwhwww
whwg.....w.www
w.wwwwww...www
w.......ww.www
wwwwwww.wwwwww
wphhhhhh......
wwwwwwwwwwwwww`,// Level 19
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wp.......................................gw
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,// Level 20/
  map`
p`, // End
]

setMap(levels[level])
setSolids([player, wall, push])

setPushables({
  [player]: [push],
  [push]: [push]
});
var GameStart = false
  onInput("w", () => {
    getFirst(player).y -= 1
  })
  onInput("a", () => {
    getFirst(player).x -= 1  
  })
  onInput("s", () => {
    getFirst(player).y += 1
  })
  onInput("d", () => {
    getFirst(player).x += 1
  }) 
if (!GameStart) {
  addText("Pickle Run",{x:5,y:2,color:color`9`})
  addText("Press (J)To Start",{x:2,y:11,color:color`2`})
  onInput("j", () => {
    GameStart = true;
    currentLevel = 1;
    arrayForDescription = 0;
    level = 1;
    setMap(levels[level])
    clearText()
  })
}
var currentLevel = 1;
var currentDescription = [
  "The Start!",
  "Figuring It Out",
  "3rd Try's the Charm",
  "Lucky Number Four",
  "Getting the Hang of It",
  "Practice Makes Perfect",
  "Baby Steps",
  "On the Right Track",
  "The Moment of Truth",
  "The Winning Streak",
  "The Leap of Faith",
  "The Ups and Downs",
  "The Midlife Crisis",
  "The Learning Curve",
  "Found My Groove",
  "The Turning Point",
  "From Zero to Hero",
  "The Struggle is Real",
  "The Sweet Spot",
  "The Breakthrough",
  "The Final Push",
  "The Home Stretch",
  "The Grand Finale",
  "The End",
  " "
];
var arrayForDescription = 0;
afterInput(() => {
  const atFlag = tilesWith(flag, player).length;

  if(atFlag == 1) {
    currentLevel = currentLevel + 1;
    arrayForDescription = arrayForDescription + 1;
    level = level + 1;
    setMap(levels[level])
    clearText();
  }
  if (GameStart) {
  clearText();
  addText("Level: " + currentLevel + "/20", {x:5,y:1,color:color`6`})
  addText(currentDescription[arrayForDescription], {x:1,y:14,color:color`6`})
  }
  if (level == 21) {
    clearText();
    addText("Congrats You Beat", {x:2,y:1,color:color`2`})
    addText("Pickle Run", {x:5,y:3,color:color`2`})
    addText("Pickle Run 2", {x:3,y:10,color:color`6`})
    addText("Coming Soon", {x:3,y:12,color:color`6`})
  }
})
