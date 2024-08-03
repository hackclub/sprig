/*


@title: TankCheckPoints
@author:Dev Tripathi 
@tags: [Puzzel, multiplayer,Casual]
@addedOn: 2024-00-00
*/

const player = "p";
const grass = "b";
const player2 = "g";
const barries = "w";
const bullet = "j";
let scorea = 0;
let scoreb = 0;
const melody = tune`
500: D4~500 + C4~500,
500: E4~500 + D4-500 + C4~500,
500: F4~500 + D4-500 + E4-500 + C4~500,
500: G4~500 + D4~500 + E4~500 + F4~500 + C4~500,
500: F4~500 + E4-500 + D4-500 + C4~500,
500: E4~500 + D4-500 + C4~500,
500: D4~500 + C4~500,
500: D4~500 + C4~500,
500: E4~500 + D4-500 + C4~500,
500: F4~500 + D4-500 + C4~500 + E4-500,
500: G4~500 + D4~500 + C4~500 + F4^500 + E4^500,
500: F4~500 + D4-500 + C4~500 + E4-500,
500: E4~500 + D4-500 + C4~500,
500: D4~500 + C4~500,
500: E4~500 + D4-500 + C4~500,
500: F4~500 + D4-500 + C4~500 + E4-500,
500: G4~500 + D4~500 + C4~500 + F4^500 + E4^500,
500: F4~500 + D4-500 + C4~500 + E4-500,
500: E4~500 + D4-500 + C4~500,
500: D4~500 + C4~500,
500: E4~500 + D4-500 + C4~500,
500: F4~500 + D4-500 + C4~500 + E4-500,
500: G4~500 + D4~500 + C4~500 + F4^500 + E4^500,
500: F4~500 + D4-500 + C4~500 + E4-500,
500: E4~500 + D4-500 + C4~500,
500: D4~500 + C4~500,
500: E4~500 + D4-500 + C4~500,
500: F4~500 + D4-500 + C4~500 + E4-500,
500: G4~500 + D4~500 + C4~500 + F4^500 + E4^500,
500: F4~500 + C4~500 + E4-500 + D4-500,
500: E4~500 + C4~500 + D4-500,
500: D4~500 + C4~500`

const playbackMelody = playTune(melody, Infinity);

setLegend(
  [ player, bitmap`
00044D4D4D40004D
0LLLLLLLLLLLL0D4
0L11L5555L11L04D
0L11L5555L11L0D4
0L11LL55LL11L04D
0L1111001111L0D4
0L1111001111L044
0L1111001111L04D
0L1111001111L0D4
0L1111001111L04D
00L11100111L0044
00LLLL00LLLL00DD
0004440044400044
0004D4004D4000DD
00044400D4400044
00044D004D40004D`],
  [ grass, bitmap`
D4D4D4D44D4D4D4D
4D4D4D4DD4D4D4D4
4D4D4D4DD4D4D4D4
D4D4D4D44D4D4D4D
4D4D4D4444D4D4D4
D4D4D4D44D4D4D4D
4D4D4D4DD4D4D4D4
D4D4D4D44D4D4D4D
4D4D4D4DD4D4D4D4
D4D4D4DDDD4D4D4D
444444D44D444444
4DD44D4444D44DD4
4444D44DD44D4444
4D4D4D4444D4D4D4
44D4D44DD44D4D44
D44444D44D44444D`],
  [ player2, bitmap`
000444D4D4400044
0LLLLLLLLLLLL04D
0L11L3333L11L044
0L11L3333L11L0D4
0L11LL33LL11L044
0L1111001111L044
0L1111001111L04D
0L1111001111L044
0L1111001111L044
0L1111001111L04D
00L11100111L0044
00LLLL00LLLL0044
000444004440004D
000DD400D4D000D4
00044D0044400044
000444004D400044`],
  [ bullet, bitmap`
...C44444444....
...C3333333334..
...C44444444444.
...C43333333344.
...C4444444444..
...C44444444....
...C............
...C............
...C............
...C............
...C............
...C............
...C............
...C............
..000...........
..000...........`],
  [ barries, bitmap`
LLLLLLLLLLLLLLLL
LCLCCLCLCLCCLCCL
LLLLLLLLLLLLLLLL
LCLCCLCLCLCCLCCL
LCLCCLCLCLCCLCCL
LLLLLLLLLLLLLLLL
LCLCCLCLCLCCLCCL
LCLCCLCLCLCCLCCL
LLLLLLLLLLLLLLLL
LCLCCLCLCLCCLCCL
LCLCCLCLCLCCLCCL
LLLLLLLLLLLLLLLL
LCLCCLCLCLCCLCCL
LCLCCLCLCLCCLCCL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
);

let level = 0;
setBackground(grass);
const levels = [
  map`
.........g..
.ww......ww.
...w....w...
...w....w...
.....jw.....
............
..ww.....ww.
....w...w...
....w...w...
........p...`,
  map`
........wg..
.ww.....w...
...w....w...
...w.w.ww...
..w.w.......
.jw.wwwww...
wwww.w..w...
....w...w...
....w...w...
........p...`,
  map`
.........g..
.ww......ww.
.wwwwwwww...
.www....wwww
.....ww....j
.....www.www
.www.....ww.
....w...w...
....wwwww...
........p...`,
  map`
jww......g..
.ww......ww.
.www....w...
...w....w...
............
............
..ww.....ww.
....w...w...
....w...w...
....w..wp...`,
  map`
....w....g..
.ww..w...ww.
...ww.w.....
...w...ww...
wwww.w......
w...w.......
w.ww.wwwwww.
w..jw.w.....
wwwww.w.....
......w.p...`,

];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player,player2,  barries ]);

setPushables({
  [player]: []
});

// START - PLAYER MOVEMENT CONTROLS

// Controls of P1

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

// Controls of P2

onInput("k", () => {
  getFirst(player2).y += 1;
});

onInput("i", () => {
  getFirst(player2).y -= 1;
});

onInput("l", () => {
  getFirst(player2).x += 1;
});

onInput("j", () => {
  getFirst(player2).x -= 1;
});



//addText("Blue Controls: WASD", { y: 2, color: color`0` });


afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(bullet).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(bullet, player).length;
  const numberCoveredb = tilesWith(bullet, player2).length;

  if (tilesWith(player, bullet).length==1) {
     
     scorea =  scorea + 1;
     level = level + 1;

     const currentLevel = levels[level];
     if (currentLevel !== undefined) {
            setMap(currentLevel);
        }}
  if (tilesWith(player2, bullet).length==1){
     
     scoreb =  scoreb + 1;
     level = level + 1;

     const currentLevel = levels[level];
     if (currentLevel !== undefined) {
            setMap(currentLevel);
        }}
  addText(`PlayerAFlags:${scorea}`, { 
    x: 1,
    y: 0,
    color: color`0`
  });
addText(`PlayerBFlags:${scoreb}`, { 
    x: 0,
    y: 15,
    color: color`0`
  });

  

  
});
