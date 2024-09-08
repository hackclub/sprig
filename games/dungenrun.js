/*

@title: dungen run 
@description : move to exit from start collecting keys give you automatic points
use A S W D for movement & I to reset game
@author: Saurav Alva & Gaurav Alva 
@tags: []
@addedOn: 2024-08-15
*/



const background = "b";
const wall = "w";
const player = "p";
const key = "k";
const exit = "e";

let hasKey = false;
let level = 0;
let points = 0;

setLegend(
  [background, bitmap`
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
  [wall, bitmap`
0000000000000000
0CC99FFLL1122FF0
03CC99FFLL1122F0
093CC99FFLL11220
0993CC99FFLL1120
0F993CC99FFLL110
0FF993CC99FFLL10
0LFF993CC99FFLL0
0LLFF993CC99FFL0
01LLFF993CC99FF0
011LLFF993CC99F0
0211LLFF993CC990
02211LLFF993CC90
0F2211LLFF993CC0
0FF2211LLFF993C0
0000000000000000`],
  [player, bitmap`
.....000000.....
....06666FF0....
...0666666FF0...
..003333333300..
.06666666666660.
066F00000000F660
06F0900900000F60
.0F0010010000F0.
..00C29C290000..
...0F9999F000...
....0FFFF0300...
...03999333330..
..093999303990..
..090777770990..
...0070007700...
....090..090....`],
  [key, bitmap`
................
................
................
................
................
..........66666.
........666FFF6.
........66FFFF6F
66666666666FFF6F
6.6.....6F66FF6F
........66F66F6.
..........66666.
................
................
................
................`],
  [exit, bitmap`
0000000000000000
0333333333333330
0300000000000030
0300000000000030
0300000000000030
0300000000000030
0307770077700030
0307006067666030
0307700607060030
0307006067060030
0307770077700030
0300000000000030
0300000000000030
0300000000000030
0333333333333330
0000000000000000`]
);

setSolids([player, wall]);

let levels = [
  map`
.......wwwwwwwwwwe
.......w...ww.....
wwwwwwwwww..w.wwww
.w.......w.ww.w.w.
.wwww.w.ww.w..w.w.
.w..www.........w.
.w.....wwww.w...w.
ww.ww...k...w...w.
....w.w..w.ww.wwww
www.w.w.www...w...
.pw.w.w....w....w.
w....wwwwww.w..ww.
w.ww.w...w..ww.w.w
www.wwww.wwww.ww.w`, // Level 1
  map`
......wwwwwwwwwwww
......w.w........w
wwwwwww..ww.w.w..w
ww..w..w..w..w..ww
w.w.w.wwwew.www..w
w.w.w...www...ww.w
w.w.w.w.ww..w..w.w
w.w.w.w.k..w..ww.w
w.w...w..www...w.w
w.w.w.w.w....w.w.w
w.ww..w.w.wwww.w.w
w..w.ww.w....w.w.e
wpw...w.ww.ww..www
w...w.wwwww.wwwwww`, // Level 2
  map`
.......wwwwwwwwwww
.......w....w..w.w
wwwwwwww..w......w
pwww.....w.w.www.w
...w.w.ww...k..w.w
w..ww....w..www..w
w.ww..ww.ww.w....w
w......w.w..w.ww.w
w.wwwww..w..w.w..w
w.w.....ww.w..ww.w
w.w.wwww..w..w...w
w..ww....w..w....w
w.wwwwwwwwewwwwwww
www.w.w.wwwww.w.ww`, // Level 3
  map`
.......wwwwwwwwwww
.......we.........
wwwwwwwwwwww..w...
w..w.w......w.www.
wwww.w.wwwww..w...
w......w....ww..w.
wwwwwwew.ww..w.ww.
w....www...w.w....
wwww.w.www.w..www.
ww...w.....ww..k..
ww.wwww.w.ww.w.www
ww......w....w.w..
p.wwwwwww.wwww.w..
w.................`, // Level 4
  map`
.......wwwwwwwwwww
.......w........ww
wwwwwwww.wwww..w.w
.w..w........w..ww
..w....www.ww.w..w
wwwww.ww.ww.www.ww
w.........w.w.w..w
w.wwww..w...w.w.ww
w....w.wwww...w.ww
wwww.w....w..w..ww
w..w.wwwkw.ww..w.w
wp.w.w..w.w...ww.w
.......w..w.w....e
wwwww.wwwwwwww.www`, // Level 5 - Boss Level
  map`
.......wwwwwwwwwww
.......w..w......w
wwwwwwwww..w.www.w
w....w...w.w.w.w.w
.pw.w.wwww.w...w.w
www.w.w....www.w.w
....w.w.ww..w..w.w
w.www.w..w..w..w.w
w....w..w.w.w..w.w
w.w.ww.wwww.ww.w.w
w.w....ww......w.w
w.ww.w..w.wwww.w.w
ww.w.wwww....kww.w
wwwwww.www.www.wew`, // Level 6 - Boss Level
  map`
.......wwwwwwwwwww
.......w........ww
wwwwwwww.wwww..w.w
.w..w........w..ww
..w....www.ww.w..w
wwwww.ww.w..www.ww
w.........w.wkw..w
w.wwww..w...w.w.ww
w....w.wwww...w.ww
ww.w.w....w..w..ww
w..w.www.w.ww..w.w
wp.w....w.....w..w
w.w..w.w.wew.w.www
wwwwwww.w.wwwwwwww`, // Level 7 - Boss Level
];

setBackground(background);
setMap(levels[level]);

onInput("w", () => getFirst(player).y -= 1);
onInput("a", () => getFirst(player).x -= 1);
onInput("s", () => getFirst(player).y += 1);
onInput("d", () => getFirst(player).x += 1);
onInput("i", resetGame);  // Reset game on pressing 'i'


  afterInput(() => {
  if (tilesWith(player, key).length > 0) {
    getFirst(key).remove();
    points += 5;  // Add points for collecting a key
    hasKey = true;
  }

  if (tilesWith(player, exit).length > 0) {
    level += 1;
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You Win!", { x: 6, y: 2, color: color`2` });
      addText(`Points: ${points}`, { x: 6, y: 4, color: color`2` });
      resetGame();  // Reset game after displaying the win message
    }
  }

  displayStatus();
});


function resetGame() {
  level = 0;
  points = 0;
  hasKey = false;
  setMap(levels[level]);
  displayStatus();
}

function displayStatus() {
  clearText();
  addText(`lvl: ${level + 1}`, { x: 0, y: 0, color: color`2` });
  addText(`Pts: ${points}`, { x: 0, y: 1, color: color`2` });
}

displayStatus();  // Initial status display

