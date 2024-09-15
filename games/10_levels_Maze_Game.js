/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 10 levels Maze Game
@author: YashV. Niranjan
@tags: [maze game]
@addedOn: 2024-09-15
*/

// Defining the  variables
const player = "p";
const wall = "w";
const background = "b";
const winningPoint = "x";  

// Defining the bitmaps
const playerBitmap = bitmap`
................
...33333333.....
..3399999993....
.339999999993...
.339999933333...
.339999322223...
.339999322223...
.339999933333...
.339999999993...
.339999999993...
.339999999993...
.339999999993...
.339333339993...
.33993..39993...
.33993..39993...
..333....333....`;

const wallBitmap = bitmap`
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
1111111111111111`;

const backgroundBitmap = bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`;

const trophyBitmap = bitmap`
................
....CCCCCCCCC...
...CC6666666CC..
.CCCCCCCCCCCCCCC
.C.C6CCCCCCC6C.C
.C.C666666666C.C
.C.C666C6C666C.C
.CCCC66CCC66CCCC
....CC6C6C6CC...
.....C6666CC....
......CC6CC.....
.......C6C......
.......C6C......
.......C6C......
.....CCCCCCC....
................`;

const winTune = tune`
100: G4^100,
100: B4^100,
100: C5^100,
100: E5^100,
100: G5^100,
100: B5^100,
100: undefined^100,
2500`;

const finalWinTune = tune`
100: G4^100 + F4-100 + E4~100 + D4/100,
100: B4^100 + A4-100 + G4~100 + F4/100,
100: C5^100 + B4-100 + A4~100 + G4/100,
100: E5^100 + D5-100 + C5~100 + B4/100,
100: G5^100 + F5-100 + E5~100 + D5/100,
100: B5^100 + A5-100 + G5~100 + F5/100,
100: D5^100 + C5-100 + B4~100 + A4/100,
100: F5^100 + E5-100 + D5~100 + C5/100,
2400`;


// Define the maps for 10 levels
const levels = [

  map`
wwwwwww
w.....w
w.w.w.w
w..p..w
w.w.w.w
w.....x
wwwwwww`, // Level 1

  map`
w..wwww.w..
w.......ww.
www.www..w.
w.....w....
w..w..www.w
w..w..wp..w
w..wwwwwwww
w..w......w
w.ww.wwww.w
w....ww...w
wwwwwwwxwww`, // Level 2

  map`
....wwwww.
p..ww.w...
ww.w....w.
ww.w.w..w.
ww...ww.w.
w...wwwww.
w..w...ww.
w.ww.w..w.
w..w..w...
wwwwx.www.`, // Level 3

  map`
ww..w..w.wx.
w...w.w..ww.
..p.w.w.w...
.wwww.w.w.ww
..w.....w..w
w.wwww.ww..w
w.ww.....w..
w..w.....ww.
ww..ww.w..w.
........w.w.
wwwww..w....
....ww.w..w.`, // Level 4

  map`
wwwwwwwwwwww
......w....w
w.www.wwww.w
w...w......w
www.w......w
w.w.www..w.w
w.w.w.wwww.w
w.....w....w
w.wwwww....w
w.w...wwww.w
w.......pw.x
wwwwwwwwwwww`, // Level 5

  map`
wwwwwwpwwwwwwww
ww............w
ww.wwwwww.www.w
w..w....w.w...w
wwww.ww.www.w.w
w...w.w.w...w.w
w.ww..w.w.wwwww
w.w...w.w.....w
w.w.www.wwwww.w
w...w...w.....w
w.w.wwwww.wwwww
www.......w...w
wxw......w....w
w.wwwww..w....w
w.........ww..w
wwwwwwwwwwwwwww`, // Level 6

  map`
wwwwwwwwwwwwwwwwww
w.....w..........w
w..ww.w.w........w
w...w...w..www...w
w...w.www..w.w.www
www.wwwww.ww.w.w.w
w...w...w.w..w.w.w
w..ww...w.w......w
w.w......www..w..w
w.w.wwww...w..w..w
w.w.w..ww..w.ww..w
w.w.wp.....w.ww..w
w.w.w..wwwww.ww..w
w.w.w..w.x.w.w.w.w
w.w.w..w...w.w.w.w
w....ww....wwwww.w
w..ww............w
wwwwwwwwwwwwwwwwww`, // Level 7

  map`
wwwwwwwwwwwwwwwwwwwww
w.....pw....w.......w
w.wwwwww.w..www.wwwww
w........w......w...w
w.www.wwwwww...ww...w
w...w...w...........w
www.wwwwwwwwwwwww.www
w.w.w...w...........w
w.www.www....w.www..w
w...w........w.w....w
w.w.w.www.wwwwwwwwwww
w.w.....w...w.......w
w.wwwwwwwww.w.wwwww.w
w...w.w.....w.....w.w
w...w.w.....w.wwwww.w
w...w.w.www.....w.w.w
w...w...w.......w.www
w.w.w.wwwwwwwww.w...w
w.w.w...w.......w...w
w.wwwwwww.w.www.www.w
w.........w...w....xw
wwwwwwwwwwwwwwwwwwwww`, // Level 8

  map`
wwwwwwwwwwwpwwwwwwwww
w...w.......w.......w
w.w.w.wwwww.w.wwwww.w
w.w.w.w.....w...w.w.w
w.w.w.w.wwwwwww.w.w.w
w.w...w.......w.w...w
w.wwwwwwwwwww.w.wwwww
w.........w.w.w.....w
w.wwwwwww.w.w.wwwww.w
w.....w...w.........w
w.wwwww...wwwwwww.www
w.w...w...w...w...w.w
w.w.w.w.www.w.www.w.w
w.w.w...w...w...w.w.w
w.w.wwwww.wwwww.w.w.w
w.w.....w.....w.w.w.w
w.wwwww.wwwww.w.www.w
w.w.........w.w...w.w
w.w.wwwwwwwww.www.w.w
w.w.............w...w
wwwwwwwwwwwxwwwwwwwww`, // Level 9

  map`D` // Level 10

  //You can add more levels here =D
];

setLegend(
  [ player, playerBitmap ],
  [ wall, wallBitmap ],
  [ background, backgroundBitmap ],
  [ winningPoint, trophyBitmap ]  
);

// Define the player movement
setSolids([ player, wall ]);

let currentLevel = 0;
let gameFinished = false;  
let winSoundPlayed = false;  

setMap(levels[currentLevel]);

onInput("w", () => {
  if (gameFinished) return; 
  getFirst(player).y -= 1;
});

onInput("a", () => {
  if (gameFinished) return;
  getFirst(player).x -= 1;
});

onInput("s", () => {
  if (gameFinished) return; 
  getFirst(player).y += 1;
});

onInput("d", () => {
  if (gameFinished) return;  
  getFirst(player).x += 1;
});

// Check for reaching the winning point
afterInput(() => {
  const playerElement = getFirst(player);
  const trophyElement = getFirst(winningPoint);
  
  if (playerElement.x === trophyElement.x && playerElement.y === trophyElement.y) {
    if (currentLevel === levels.length - 1) {
      // Last level
      if (!winSoundPlayed) {  
        playTune(finalWinTune);  // Play the final winning tune
        winSoundPlayed = true;  // Set the flag to true after playing the sound
      }
    } else {
      // Other levels
      if (!winSoundPlayed) {  // Check if the winning sound has not been played
        playTune(winTune);  // Play the regular winning tune
        winSoundPlayed = true;  // Set the flag to true after playing the sound
      }
    }
    
    currentLevel++;
    
    if (currentLevel < levels.length) {
      setMap(levels[currentLevel]);
      winSoundPlayed = false;  // Reset the flag for the next level
    } else {
      addText("Congratulations!", { x: 1, y: 1, color: color`D` });
      addText("You Win !!!", { x: 3, y: 2, color: color`4` });
      addText("Made By - Yash", { x: 3, y: 8, color: color`7` });
      gameFinished = true;  // Set the flag to true when the last level is completed
    }
  }
});

