/*
@title: simon
@author: riley
@tags: ['retro']
@addedOn: 2022-09-29
*/

/*
Instructions:

################
####CONTROLS####
################
W: Move selected tile up one
A: Move selected tile one to the left
S: Move selected tile down one
D: Move selected tile one to the right
J: Select a tile

################
####OBJECTIVE###
################
The objective of Simon is to remember the correct
sequence of tiles for as long as possible. The tiles 
will light up and play a sound in the sequence of the
pattern and you need to play the pattern back correctly
for as long as possible.
*/

let pattern = [];
let patternNumber = 0;

const player = "p";
const yellow = "y";
const blue = "b";
const red = "r";
const green = "g";
const brightYellow = "a";
const brightBlue = "e";
const brightRed = "c";
const brightGreen = "d";
const scoreOne = "h";
const scoreTwo = "i";
const redSound = tune`
483.8709677419355: c4-483.8709677419355,
15000`;
const greenSound = tune`
500: f4-500,
15500`;
const blueSound = tune`
500: d5-500,
15500`;
const yellowSound = tune`
500: b5-500,
15500`;
const loseSound = tune`
133.33333333333334: b5/133.33333333333334,
133.33333333333334: a5/133.33333333333334 + g5/133.33333333333334,
133.33333333333334: f5/133.33333333333334,
133.33333333333334: e5/133.33333333333334 + d5/133.33333333333334,
133.33333333333334: c5/133.33333333333334,
3600.0000000000005`;
const one = "1";
const two = "2";
const three = "3";
const four = "4";
const five = "5";
const six = "6";
const seven = "7";
const eight = "8";
const nine = "9";
const zero = "0";

setLegend(
  [ player, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0000000000000000` ],
  [ yellow, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF` ],
  [ blue, bitmap`
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
7777777777777777` ],
  [ red, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
  [ green, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ brightYellow, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666` ],
  [ brightBlue, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555` ],
  [ brightRed, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ],
  [ brightGreen, bitmap`
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
4444444444444444` ],
  [ scoreOne, bitmap`
................
..0000...0000.00
.00..0...0..0.0.
.0...0..00..0.0.
.0...0..0.....0.
00......0.....0.
0.......0....00.
00......0....0..
.00000..0....0..
.....0..0....0..
.....0..0....0..
.....0..0....0..
.....0..0....00.
....00..0.....0.
.0000...0000..00
..00............` ],
  [ scoreTwo, bitmap`
................
00.....000...00.
.00..00000..0000
..0..0...0..0...
..0..0..00..0...
..0..0.000..0...
..00.000.0..0000
...0.0...0..0.00
...0.0...0..0...
...0.0....0.0...
...0.0....0.0...
..0..0....0.0...
..0..0....0.0000
..0..0....0..00.
000..0....0.....
................` ],
  [ one, bitmap`
......000.......
......000.......
.....0000.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
....00000000....
....00000000....
................` ],
  [ two, bitmap`
....0000000.....
...00000000.....
...00....000....
...00.....00....
..........00....
..........000...
..........000...
..........00....
.........000....
........000.....
.......000......
......000.......
.....000........
....000.........
....0000000000..
...00000000000..` ],
  [ three, bitmap`
......0000......
....00000000....
....000..000....
....0......00...
...........00...
...........00...
...........00...
...........00...
..........000...
......000000....
......0000000...
..........000...
..........000...
..........000...
.....0000000....
....000000......` ],
  [ four, bitmap`
......00...00...
.....000...00...
.....00....00...
....00.....00...
...000.....00...
...00......00...
..00.......00...
..00.......00...
.000000000000...
.000000000000...
...........00...
...........00...
...........00...
...........00...
...........00...
...........00...` ],
  [ five, bitmap`
...0000000000...
...0000000000...
...00...........
...00...........
...00...........
...00...........
...00...........
...00000000.....
...0000.0000....
...000....00....
..........00....
..........00....
........0000....
.......0000.....
...0000000......
...00000........` ],
  [ six, bitmap`
......000000....
....000000000...
....000....000..
....00..........
....00..........
....00...00.....
....000000000...
....0000...000..
....000.....00..
....00......00..
....00.......00.
....00.......00.
....000......00.
.....000....00..
.....00000000...
......000000....` ],
  [ seven, bitmap`
..000000000000..
..000000000000..
...........000..
..........000...
.........0000...
.........00.....
........000.....
.......000......
.......00.......
......000.......
.....000........
.....000........
....000.........
....00..........
...00...........
...00...........` ],
  [ eight, bitmap`
....00000000....
..0000000000....
.000000....00...
.00........00...
.00.......000...
.00.......000...
.000.....000....
..0000...000....
...0000000000...
....0000000000..
....00......00..
...00.......00..
...00.....0000..
...000...00000..
....00000000....
.....000........` ],
  [ nine, bitmap`
....0000000.....
...000000000....
...000....00....
..000.....00....
..000.....00....
...0000...00....
....00000000....
.....0000000....
..........00....
..........00....
..........00....
..........00....
...00.....00....
...00000.000....
....00000000....
.......0000.....` ],
  [ zero, bitmap`
.....0000.......
....000000......
...00...000.....
...00....00.....
...00...000.....
...00...000.....
...00..0.00.....
...00..0.00.....
...00.0..00.....
...00.0..00.....
...000...00.....
...000...00.....
...00....00.....
...00....00.....
....000000......
....0000........` ]
);

setMap(map`
yb
rg`);
addSprite(0, 0, player);
pickTile();

const tileColoursDim = [ yellow, blue, red, green ]
const tileColoursBright = [ brightYellow, brightBlue, brightRed, brightGreen ]

onInput("w", () => {
  const p = getFirst(player);
  if (!p) return;
  p.y -= 1;
});
onInput("a", () => {
  const p = getFirst(player);
  if (!p) return;
  p.x -= 1;
});
onInput("s", () => {
  const p = getFirst(player);
  if (!p) return;
  p.y += 1;
});
onInput("d", () => {
  const p = getFirst(player);
  if (!p) return;
  p.x += 1;
});

//Let's you select a tile to click on
onInput("j", () => {
  const p = getFirst(player);
  if (!p) return;

  let playerX = p.x;
  let playerY = p.y;
  clearTile(playerX, playerY);
  addSprite(playerX, playerY, player);
  if(playerX == 0 && playerY == 0 && pattern[patternNumber] == "yellow") {addSprite(playerX, playerY, brightYellow);playTune(yellowSound);}
  else if(playerX == 1 && playerY == 0 && pattern[patternNumber] == "blue") {addSprite(playerX, playerY, brightBlue);playTune(blueSound);}
  else if(playerX == 0 && playerY == 1 && pattern[patternNumber] == "red") {addSprite(playerX, playerY, brightRed);playTune(redSound);}
  else if(playerX == 1 && playerY == 1 && pattern[patternNumber] == "green") {addSprite(playerX, playerY, brightGreen);playTune(greenSound);}
  else {resetGame(playerX, playerY);return;}
  
  setTimeout(() => {  
    clearTile(playerX, playerY);
    if(getFirst(player) == undefined) addSprite(playerX, playerY, player);
    if (playerX == 0 && playerY == 0) addSprite(playerX, playerY, yellow);
    if (playerX == 1 && playerY == 0) addSprite(playerX, playerY, blue);
    if (playerX == 0 && playerY == 1) addSprite(playerX, playerY, red);
    if (playerX == 1 && playerY == 1) addSprite(playerX, playerY, green);
    patternNumber++;
    if(patternNumber >= pattern.length) {i=0;setTimeout(() =>{playPattern();},750);return;}
    }, 250);
});

//Picks a new tile to add to the pattern
function pickTile() {
  const tileX = Math.floor(Math.random() * 2);
  const tileY = Math.floor(Math.random() * 2);
  clearTile(tileX, tileY);
  if(getFirst(player) == undefined) addSprite(tileX, tileY, player);
  if (tileX == 0 && tileY == 0) {addSprite(tileX, tileY, brightYellow);playTune(yellowSound);pattern.push("yellow");}
  if (tileX == 1 && tileY == 0) {addSprite(tileX, tileY, brightBlue);playTune(blueSound);pattern.push("blue");}
  if (tileX == 0 && tileY == 1) {addSprite(tileX, tileY, brightRed);playTune(redSound);pattern.push("red");}
  if (tileX == 1 && tileY == 1) {addSprite(tileX, tileY, brightGreen);playTune(greenSound);pattern.push("green");}
    setTimeout(() => {  
      clearTile(tileX, tileY);
      if (tileX == 0 && tileY == 0) addSprite(tileX, tileY, yellow);
      if (tileX == 1 && tileY == 0) addSprite(tileX, tileY, blue);
      if (tileX == 0 && tileY == 1) addSprite(tileX, tileY, red);
      if (tileX == 1 && tileY == 1) addSprite(tileX, tileY, green);
      if(getFirst(player) == undefined) addSprite(tileX, tileY, player);
      }, 250);
  return;
}

//Plays back the correct sequence to you
let i = 0;
function playPattern() {
  const playerX = getFirst(player).x;
  const playerY = getFirst(player).y;
  
  if (pattern[i] == "yellow") {clearTile(0, 0);addSprite(0, 0, brightYellow);playTune(yellowSound);}
  if (pattern[i] == "blue") {clearTile(1, 0);addSprite(1, 0, brightBlue);playTune(blueSound);}
  if (pattern[i] == "red") {clearTile(0, 1);addSprite(0, 1, brightRed);playTune(redSound);}
  if (pattern[i] == "green") {clearTile(1, 1);addSprite(1, 1, brightGreen);playTune(greenSound);}
  if(getFirst(player) == undefined) addSprite(playerX, playerY, player);
      
  setTimeout(() => {
    if (pattern[i] == "yellow") {clearTile(0, 0);addSprite(0, 0, yellow);}
    if (pattern[i] == "blue") {clearTile(1, 0);addSprite(1, 0, blue);}
    if (pattern[i] == "red") {clearTile(0, 1);addSprite(0, 1, red);}
    if (pattern[i] == "green") {clearTile(1, 1);addSprite(1, 1, green);}
    if(getFirst(player) == undefined) {addSprite(playerX, playerY, player);}
    if(i == pattern.length) {
      patternNumber = 0;
      pickTile();
        } else {i++;setTimeout(() =>{playPattern();},250);}
     }, 250); 
  }

//Displays your score and creates a new game
function resetGame(playerX, playerY) {
  const digits = ["1","2","3","4","5","6","7","8","9","0"]
  const numbers =[one,two,three,four,five,six,seven,eight,nine,zero];
  const position = (pattern.length-1).toString();
  const pos1 = (numbers[digits.indexOf(position.charAt(0))]).toString();
  let pos2;
  if(parseInt(position) > 9) pos2 = (numbers[digits.indexOf(position.charAt(1))]).toString();
  
  playTune(loseSound);
  setMap(map`
hi
..`);
  addSprite(0, 1, pos1);
  if(pos2 != null) addSprite(1, 1, pos2);
      setTimeout(() => {
        pattern = [];
        patternNumber = 0;
        setMap(map`
  yb
  rg`);
        addSprite(playerX, playerY, player);
        pickTile();
      }, 2500);
}