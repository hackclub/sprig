/*
@title: Teleporter
@author: ezaz
@tags: ['puzzle','retro']
@addedOn: 2025-03-09
*/

/* 
Instructions: 
This is a one-player version of the original two-player game.
Get the player to the teleporter to finish the level.
Be careful and don't push the blocks into the teleporter, or you'll have to restart.

Controls: 
W = up
S = down 
A = left
D = right
*/

const player = "p";
const teleporter = "r"; 
const wall = "w"; 
const block1 = "l"; 
const block2 = "I"; 

setLegend(
  [ player, bitmap`
.....00.........
....0000000.....
...000000000....
...003333300....
....3333333.....
....3203203.....
....3333333.....
....3300033.....
.....33333......
......777.......
......676.......
......666.......
......676.......
.....66666......
....666.666.....
....33...33.....`],
  [ teleporter, bitmap`
0000000000000000
0000000000000000
00HHHHHHHHHHHH00
0055555555555H00
00HHHHHHHHHH5H00
00H55555555H5H00
00H5HHHHHH5H5H00
00H5H5555H5H5H00
00H5H5H55H5H5H00
00H5H5HHHH5H5H00
00H5H555555H5H00
00H5HHHHHHHH5H00
00H5555555555H00
00HHHHHHHHHHHH00
0000000000000000
0000000000000000`],
  [ wall, bitmap`
LLLLLLL1LLLLLL11
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111
LLLL1LLLLL1LLL11
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLL1LLLLLL11
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111
LLLL1LLLLL1LLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111`],
  [ block1, bitmap`
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
  [ block2, bitmap`
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
9999999999999999`]
);

setSolids([ wall, block1, block2, player ]);

setPushables({
  [ player ]: [ block1, block2 ]
});

let level = 0;
const levels = [
  // Level 0: 5 rows x 6 columns
  map`
p....r
wwwww.
......
wwwww.
......`,

  // Level 1: 6 rows x 7 columns
  map`
p......
www.www
..w.w..
..w.w..
..w.w..
......r`,

  // Level 2: 6 rows x 7 columns (fixed by ensuring all rows are 7 characters)
  map`
p.....r
...I...
..w.w..
ww.w.w.
.......
.......`,

  // Level 3: 7 rows x 11 columns (fixed by padding rows 1 & 7)
  map`
....p......
wIwwwwwwwlw
...........
...........
wlwwwwwwwIw
...........
....r......`,

  // Level 4: 9 rows x 12 columns
  map`
p.l..I......
..l..I.....w
..l..I....lr
..l..I.....w
..l..I......
..l..I.....w
..l..I.....w
..l..I.....w
..l..I......`,

  // Level 5: A new level (6 rows x 19 columns)
  map`
wwwwwwwwwwwwwwwwwww
w.................w
w.p...............w
w.....r...........w
w.................w
wwwwwwwwwwwwwwwwwww`
];

setMap(levels[level]);

var totalTime = 100;
var countdown = setInterval(function(){
  totalTime--;
  clearText();
  addText(""+totalTime, { y: 1, color: color`3` });
  if(totalTime <= 0){ 
    clearInterval(countdown);
    clearTile(getFirst(player).x, getFirst(player).y);
    addText("Try Again!", { y: 1, color: color`3` });
  }
}, 1000);

// Player movement
onInput("w", () => {
  let p = getFirst(player);
  if (p) p.y -= 1;
});
onInput("s", () => {
  let p = getFirst(player);
  if (p) p.y += 1;
});
onInput("a", () => {
  let p = getFirst(player);
  if (p) p.x -= 1;
});
onInput("d", () => {
  let p = getFirst(player);
  if (p) p.x += 1;
});

// Check for teleporter collision to complete level
afterInput(() => {
  if (tilesWith(teleporter, player).length > 0) {
    level = level + 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
      clearInterval(countdown);
    }
  }
});
