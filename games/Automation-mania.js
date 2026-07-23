/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Automation-mania
@description: 
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/

const select = "s";
const selectPickup = "p";
const conveyerU = "u";
const conveyerD = "d";
const conveyerL = "l";
const conveyerR = "r";

const dropper = "d";


setLegend(
  [ select, bitmap`
333333....333333
33333......33333
333..........333
33............33
33............33
3..............3
................
................
................
................
...............3
33............33
33............33
333..........333
33333......33333
333333....333333` ],
  [ selectPickup, bitmap`
777777....777777
77777......77777
777..........777
77............77
77............77
7..............7
................
................
................
................
...............7
77............77
77............77
777..........777
77777......77777
777777....777777` ],
  [ conveyerU, bitmap`
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLL11LLLLLL1
1LLLLL1111LLLLL1
1LLLL111111LLLL1
1LLL11111111LLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1` ],
  [ conveyerD, bitmap`
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLL11111111LLL1
1LLLL111111LLLL1
1LLLLL1111LLLLL1
1LLLLLL11LLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1` ],
  [ conveyerL, bitmap`
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLL1LLLLLLLLLL
LLLL11LLLLLLLLLL
LLL11111111111LL
LL111111111111LL
LL111111111111LL
LLL11111111111LL
LLLL11LLLLLLLLLL
LLLLL1LLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111` ],
  [ conveyerR, bitmap`
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLL1LLLLL
LLLLLLLLLL11LLLL
LL11111111111LLL
LL111111111111LL
LL111111111111LL
LL11111111111LLL
LLLLLLLLLL11LLLL
LLLLLLLLLL1LLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111` ]
)


var cursorX = 0;
var cursorY = 0;
var picking = false;

setSolids([])

let level = 0
var gameLevel = map`
udlr......
..........
..........
..........
..........
..........
..........
..........`;


setMap(gameLevel);

addSprite(0, 0, select);

function setMode(selecting) {
  if (selecting) {
    
    addSprite(0, 0, select);
  } else {
    addSprite(0, 0, selectPickup);
  }
}

setMode(fales);

setPushables({
  [ select ]: []
})

onInput("s", () => {
  getFirst(select).y += 1
  cursorY = Math.min(cursorY + 1, 7);
})

onInput("w", () => {
  getFirst(select).y -= 1
  cursorY = Math.max(cursorY - 1, 0);
})

onInput("a", () => {
  getFirst(select).x -= 1
  cursorX = Math.max(cursorX - 1, 0);
})

onInput("d", () => {
  getFirst(select).x += 1
  cursorX = Math.min(cursorX + 1, 7);
})

afterInput(() => {
  console.log(cursorX, cursorY);
})