/*
@title: the journey of the box[a sokoban saga]
@author: Ethan Francis
@tags: ['puzzle']
@addedOn: 2023-04-15
//INSTRUCTIONS
 Get all blue boxes into the holes 
 if there is buttons, boxes need to be on the buttons
 to make the walls dissappear.
*/

const player = "p";
const hole = "h"
const wall ="w"
const box = "b"
const button = "u"
const sprite = "s"


setLegend(
  [ player, bitmap`
.....0000000....
....022222220...
...02222222220..
...02220202220..
...02220202220..
...01222222210..
....012020210...
.....0200020....
.....0222220....
.00000222220000.
0222222222222220
.00000222220000.
.....0221220....
.....0210120....
.....010.010....
.....00...00....`],
  [hole, bitmap`
0000000000000000
0000000000000000
00000......00000
000..........000
000..........000
00............00
00............00
00............00
00............00
00............00
00............00
000..........000
000..........000
00000......00000
0000000000000000
0000000000000000`],
  [wall, bitmap`
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
  [box, bitmap`
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
  [button, bitmap`
1LLLLLLLLLLLLLL1
11LLLLLLLLLLLL11
L11LLLLLLLLLL11L
LL11L333333L11LL
LLLL33333333LLLL
LLL3333333333LLL
LLL3333333333LLL
LLL3333333333LLL
LLL3333333333LLL
LLL3333333333LLL
LLL3333333333LLL
LLL0333333330LLL
LLLL03333330LLLL
LL11L000000L11LL
L11LLLLLLLLLL11L
11LLLLLLLLLLLL11`],

  

);

setSolids([player, box, wall]);

let level = 0;
const levels = [
  map`
.........
.b......h
ww.......
.........
.........
.........
ww.......
pb......h
ww.......`,
  map`
p.ww...
...w.b.
w...ww.
w......
ww.b...
..w...h
..ww..h`,
  map`
...w...
...w...
...w...
.w.w.w.
...w.w.
.b.....
.w.w.w.
.w.w.w.
.w.w.w.
.w...w.
.wb..wh
pw...wh`,
  map`
.....w........w.h
.....w......b....
.b.......ww......
p.w......www....h`,
  map`
h...w...h
...w.w...
......w..
.........
w..bb...w
p..bb...w
.......w.
w........
.....w...
...ww....
h...w...h`,
  map`
.pw..
.bw..
.uw.h
..w..`,
  map`
.bu....
.wwwww.
p..wbwh
.wwwww.
.bu....`,
  map`
.b..uwh
.wwwwww
......b
p......
.b.wwwb
.....ww
....uwh`,
  map`
.....ww......
...b.uwu.....
...wwwww.....
...........ww
.....b....bwh
p....wwu...ww
.....www.b.wb
....w..w...ww
.b....uw....u
wwwwwwwwwwwww`,
  map`
pw......u
.w....buw
.w..w..w.
.w..w.w.w
.w..w..w.
.w..w...w
.w..wwbw.
.w..ww..w
.b..wwuww
....wwwwh`,
  map`
uuuuuuuuuuuuuu
uuuuuuuuuuuuuu
.b...........b
w....b.......b
w.b...bb......
.b.bbb..b.b..w
......bb.....w
w..b.b...b.wb.
w.b...b.b.w...
.....b......w.
...ww..b.b.w..
.b....w.b...w.
.....wwb..b.ww
p.......w...wh`,
]

setMap(levels[level]);

setPushables({
  [ player ]: [box],
  [box]: [box],
});

onInput("s", () => {
  getFirst(player).y += 1
});


onInput("w", () => {
  getFirst(player).y -= 1
});


onInput("a", () => {
  getFirst(player).x -= 1
});


onInput("d", () => {
  getFirst(player).x += 1
});

onInput("j", () => {
  setMap(levels[level]);
});
afterInput(() => {
 const targetNumber = tilesWith(hole).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(hole, box).length;
  

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;
  const currentLevel = levels[level];
    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("YOU WIN!", { y: 4, color: color`1` });
      addText("Thanks for playing!", { y: 5, color: color`6` });
      addText("-Ethan", { y: 6, color: color`D` });
    }
  }
  const currentLevel = levels[level];
  const buttonNumber = tilesWith(button).length;
  const Coveredbuttons = tilesWith(button, box).length;
  const wallTiles = tilesWith(wall);
  // console.log("buttonNumber", buttonNumber);
  // console.log("Coveredbuttons", Coveredbuttons);
  //check level buttons
  if (level == 5) {
    if (buttonNumber === Coveredbuttons){
      wallTiles.forEach(tile => {
        clearTile(tile[0].x, tile[0].y);
      })
    }
  }

  if (level == 6) {
    if (buttonNumber === Coveredbuttons) {
      wallTiles.forEach(tile => {
        clearTile(tile[0].x, tile[0].y);
      })
    }
  }

  if (level == 7) {
    if (buttonNumber == Coveredbuttons) {
      wallTiles.forEach(tile => {
        clearTile(tile[0].x, tile[0].y);
      })
    }
  }

  if (level == 8) {
    if (buttonNumber === Coveredbuttons) {
      wallTiles.forEach(tile => {
        clearTile(tile[0].x, tile[0].y);
      })
    }
  }
  if (level == 9) {
    if (buttonNumber === Coveredbuttons) {
      wallTiles.forEach(tile => {
        clearTile(tile[0].x, tile[0].y);
        clearText()
      })
    }
  }
  if (level == 10) {
    if (buttonNumber === Coveredbuttons) {
      wallTiles.forEach(tile => {
        clearTile(tile[0].x, tile[0].y);
        clearText()
      })
    }
  }
});


  
