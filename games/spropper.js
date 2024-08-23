/*

@title: spropper
@author: bea
@tags: []
@addedOn: 2024-08-21
*/

/*

Scrappily put together js game about not touching spikes, got the idea from downwell! (Really fun rougelite)
Controls: W A S D, You can only move up when your on a platform
You can cheat going forward a level by pressing i, I think the game freaks out though if you do that

*/

console.log("Thank you sprig overlords for adding a console log :)")

var playing = true
var lastplayerx = 0
var time = 0 //Seconds
var gameoverHappened = false

//Sprite mapping
const player = "p"
const stock_wall = "w"
const spike = "s"
const grey = "g"
const dark_grey = "d"
const black = "b"
const platform = "l"
const background = "z"
const yestrigger = "y"
const notrigger = "n"
const leftchain = "c"
const leftendplatform = "e"
const rightendplatform = "j"
const rightchain = "f"
const wintrigger = "t"
const flame = "x"

// Constant game values - modify for a different game experience
const sinkrate = 300 // How fast the player sinks in milliseconds
const floorY = 33 // Uhhhhhh
const tickrate = 1 // How often checks for things like collision are done (ms)

// Functions
function sinkplayer() { //Responsible for applying gravity to the player
  setInterval(() => {
    if (getFirst(player).y < floorY) { //See if player is on floor
      getFirst(player).y += 1; //Subtract player height
    }
  }, sinkrate);
}

function gameoverProcess() { //Responsible for checking if the game is over
  setInterval(() => {
    if (isPlayerTouchingLose()) { // Check if player is on a spike
      clearText()
      gameoverSequence(false)
    } else if (isPlayerWon()) { // Check if player has reached the bottom
      clearText()
      gameoverSequence(true)
    }
  }, tickrate);
}

function trackPlayingProcess() { //Updates the 'playing' boolean based on if the player is in the gameover stage or not, other functions reference that boolean
  setInterval(() => {
    if (level == 0) {
      playing = false;
    } else {
      playing = true;
    }

    if (((level - 1) == 0) && gameoverHappened) {
      clearText()
      gameoverHappened = false
    }
  }, tickrate); // Added closing parenthesis and semicolon
}

function gameoverSequence(won) { //The stuff that happens when the game is over in either case
  addText("Final time: " + time, { x: 0, y: 3, color: color`2` });
  time = 0;
  gameoverHappened = true
  console.log("gameoverSequence run")
  level = 0;
  setMap(levels[level]);

  if (won) {
    addText("Game Won!", { x: 5, y: 0, color: color`4` });
  } else {
    addText("Game Over!", { x: 5, y: 0, color: color`3` });
  }

  addText("Play again?", { x: 5, y: 1, color: color`0` });

  addText("Yes", { x: 6, y: 9, color: color`4` })
  addText("No", { x: 12, y: 9, color: color`3` })

}

function nextlevelProcess() { // Handles level transitions
  setInterval(() => {
    if (isPlayerTouchingLevelTransition()) {
      lastplayerx = getFirst(player).x;
      level++;
      setMap(levels[level]);
      getFirst(player).x = lastplayerx;
    }
  }, tickrate);
}

function sleep(ms) { // What even is settimeout???
  return new Promise(resolve => setTimeout(resolve, ms));
}

function burn() {
  setInterval(() => {
    if (!playing && isPlayerRefusingToPlayMyAmazingGame()) {
      for (let i = 0; i < 5; i++) {
        addSprite((7 + i), 18, flame)
      }
    }
  }, tickrate);
}
// Functions that return booleans
function isPlayerWon() {
  const playerTileBelow = getTile(getFirst(player).x, getFirst(player).y + 1);
  return playerTileBelow.some(sprite => sprite.type === wintrigger);
}

function isPlayerOnSomething() {
  //Dictates whether the player can jump
  const playerTileBelow = getTile(getFirst(player).x, getFirst(player).y + 1);
  return playerTileBelow.some(sprite => sprite.type === platform || leftendplatform || rightendplatform);
}

function isPlayerTouchingLose() {
  //Dictates whether the player has lost or not
  const playerTileBelow = getTile(getFirst(player).x, getFirst(player).y + 1);
  return playerTileBelow.some(sprite => sprite.type === spike)
}

function isPlayerTouchingLevelTransition() {
  //Transitions the level because I couldn't figure out how to get a smooth scrolling fov...
  const playerTileBelow = getTile(getFirst(player).x, getFirst(player).y + 1);
  return playerTileBelow.some(sprite => sprite.type === black)
}

function isPlayerRefusingToPlayMyAmazingGame() {
  const playerTileBelow = getTile(getFirst(player).x, getFirst(player).y + 1);
  return playerTileBelow.some(sprite => sprite.type === notrigger)
}
// -----------------------------------------
function jumpSlowly() {
  //I don't even think this works like I mean it to
  for (let i = 0; i < 3; i++) {
    getFirst(player).y -= 1
    sleep(100)
  }
}

function updateCounters() { // Updates "level" and "time"
  addText("Time=0", { x: 12, y: 2, color: color`2` });
  //They in they own intervals cause they gotta run at different speeds
  setInterval(() => {
    if (playing) {
      time++
      addText("Time=" + time, { x: 12, y: 2, color: color`2` });
    }
  }, 1000);

  setInterval(() => {
    if (playing) {
      addText("Level=" + level, { x: 0, y: 2, color: color`2` });
    }
  }, tickrate)
}

setLegend(
  [player, bitmap`
00LLLLLLLCCCCC00
02222CCCCCCCCCC0
L2CCCCCCCCCCCC2L
L2CCCCCCC222222L
L22222222222222L
L22222222222222L
L22222222222222L
L22202222220222L
L22222222222222L
L22222222222222L
L22222222222222L
L22220222202222L
L22222000022222L
L22222222222222L
0222222222222220
00LLLLLLLLLLLL00`],
  [stock_wall, bitmap`
LLLLLLLLLLLLLLLL
111L1111111L1111
111L1111111L1111
111L1111111L1111
LLLLLLLLLLLLLLLL
111111L1111111L1
111111L1111111L1
111111L1111111L1
LLLLLLLLLLLLLLLL
11L11111111L1111
11L11111111L1111
11L11111111L1111
LLLLLLLLLLLLLLLL
11111L1111111L11
11111L1111111L11
11111L1111111L11`],
  [spike, bitmap`
.......33.......
......3..3......
.....3....3.....
.....3....3.....
....3......3....
....3......3....
...3........3...
...3........3...
...3........3...
..3..........3..
..3..........3..
.3............3.
.3............3.
.3............3.
3..............3
3..............3`],
  [grey, bitmap`
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
1111111111111111`],
  [dark_grey, bitmap`
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
  [platform, bitmap`
LLLLLLLLLLLLLLLL
CCCCLCCCCCCLCCCC
CCC1L1CCCC1L1CCC
CC11L11CC11L11CC
LLLLLLLLLLLLLLLL
................
................
................
................
................
................
................
................
................
................
................`],
  [leftendplatform, bitmap`
LLLLLLLLLLLLLLLL
CCCCLCCCCCCLCCCC
CCC1L1CCCC1L1CCC
CC11L11CC11L11CC
LLLLLLLLLLLLLLLL
.........L00000L
........L0LLLLLL
.......L0L......
......L0L.......
.....L0L........
....L0L.........
...L0L..........
..L0L...........
.L0L............
L0L.............
0L..............`],
  [rightendplatform, bitmap`
LLLLLLLLLLLLLLLL
CCCCLCCCCCCLCCCC
CCC1L1CCCC1L1CCC
CC11L11CC11L11CC
LLLLLLLLLLLLLLLL
L00000L.........
LLLLLL0L........
......L0L.......
.......L0L......
........L0L.....
.........L0L....
..........L0L...
...........L0L..
............L0L.
.............L0L
..............L0`],
  [yestrigger, bitmap`
....4...4....4..
....44...44..44.
4....4....44..44
4....44....4...4
.4....4.....4...
.4....44....44..
.44....44....44.
..44....444...44
...4......44....
...44......44...
....444.....444.
......44......44
.......44.......
........44......
.........444....
...........44...`],
  [notrigger, bitmap`
..33....3...33..
...33...33...33.
....3....3....33
....33...33....3
.....33...33...3
......33...333..
3......33....33.
33......33....33
.33......33....3
..33......33....
....33.....333..
.....33......333
......33.......3
........33......
.........33.....
..........33....`],
  [leftchain, bitmap`
..............L0
.............L0L
............L0L.
...........L0L..
..........L0L...
.........L0L....
........L0L.....
.......L0L......
......L0L.......
.....L0L........
....L0L.........
...L0L..........
..L0L...........
.L0L............
L0L.............
0L..............`],
  [rightchain, bitmap`
0L..............
L0L.............
.L0L............
..L0L...........
...L0L..........
....L0L.........
.....L0L........
......L0L.......
.......L0L......
........L0L.....
.........L0L....
..........L0L...
...........L0L..
............L0L.
.............L0L
..............L0`],
  [background, bitmap`
11LL11111L11111L
1LL11111LL1111LL
LL1111LL11111LL1
L1111LL1111LL111
1111LL1111LL1111
11LLL1111LL1111L
1LL11111LL1111LL
LL11111LL1111LL1
L11111LL1111LL11
11111LL11111L111
1111LL11111LL111
111LL11111LL1111
1LL111111LL11111
LL111111LL111111
1111111LL1111111
111111LL11111111`],
  [wintrigger, bitmap`
................
................
4D444444444D4444
44444D444D44D444
................
................
44444D4444444D44
44D4444444D44444
................
................
444D444444444444
44444444D4444444
................
................
4444444444444444
4444444444444444`],
  [flame, bitmap`
................
.........9......
........999.....
.......96699....
......996699....
.....99666699...
.99.996666699...
999.966633669.9.
999996633336999.
999966333336999.
9996663333366999
9996663333336999
9966633333336999
9966633333336699
9966333333333669
9666333333333666`]
)

setSolids([player, stock_wall, spike, platform, leftendplatform, rightendplatform, leftchain, rightchain])

setBackground("z")

let level = 1 //Level 0 is the game over stage

const levels = [
  map`
w...........w
w...........w
w.....p.....w
we..jlwle..jw
w....fwc....w
w.....w.....w
w.....w.....w
w.....w.....w
w.....w.....w
w.....w.....w
w.....w.....w
w.....w.....w
w.....w.....w
wyyyyywnnnnnw
wyyyyywnnnnnw
wyyyyywnnnnnw
wyyyyywnnnnnw
wyyyyywnnnnnw
wyyyyywnnnnnw
wbbbbbwellljw`,
  map`
w....p.....w
w..........w
w..........w
w..s.......w
w..........w
w..........w
wle..s..s..w
wc.........w
w..........w
w.....s....w
w..........w
ws.......jlw
w...s.....fw
w..........w
w..........w
w......s...w
w..........w
wggggggggggw
wddddddddddw
wbbbbbbbbbbw`, //L1
  map`
w....p.....w
w..........w
w.......sssw
w..........w
w..........w
w..........w
wlle.......w
w.c.ssss...w
wc.........w
w.....ss...w
w..........w
w..........w
w..........w
w..........w
w....sssjllw
w........f.w
w.........fw
wggggggggggw
wddddddddddw
wbbbbbbbbbbw`, //L2
  map`
w.....p....w
wle........w
wc.........w
w..........w
w..........w
w..ssssss..w
w..........w
w..........w
w.s......ssw
w....s.s...w
w...s.s....w
ws.........w
w..........w
w..........w
wsss....jllw
w...ss...f.w
w....ss...fw
wggggggggggw
wddddddddddw
wbbbbbbbbbbw`, //L3
  map`
w....p.....w
w..........w
w..........w
wsss.ll.sssw
wc........fw
w..........w
w...s..s...w
w..s....s..w
w.s......s.w
w..........w
w.........jw
wssss..ssssw
wc........fw
w.ss.....s.w
w..........w
w...s......w
w..........w
wggsggsgsggw
wddddddddddw
wbbbbbbbbbbw`, //L4
  map`
w....p.....w
w..........w
w..........w
ws........sw
w.s......s.w
w..s....s..w
w...s..s...w
w..........w
w..........w
w....ss....w
w..........w
w..s....s..w
w..........w
w....ss....w
wss......ssw
w..........w
w...s..s...w
wggggggggggw
wddddddddddw
wbbbbbbbbbbw`, //L5
  map`
wp.........w
w..........w
wllle..jlllw
w..c....f..w
w.c......f.w
wc....s...fw
w....s.....w
w.....s....w
w.s......s.w
w..........w
w..s.s..s..w
w..........w
w..........w
w....s...s.w
w..........w
w...s......w
w.....ss...w
w..s....s..w
w..........w
w....s.....w
w.......s..w
w..........w
w.s...s....w
w........s.w
ws...s.....w
w..........w
w..........w
w..........w
w........s.w
wttttttttttw` //L6
]

setMap(levels[level]) //Mabye maintain level int to be constantly referenced

onInput("w", () => {
  if (isPlayerOnSomething()) {
    jumpSlowly()
  }
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

onInput("i", () => {
  level++
  setMap(levels[level]); //Debugging
})

//All of these functions run off setInterval to form their own local little loops
sinkplayer();
gameoverProcess();
nextlevelProcess();
updateCounters();
trackPlayingProcess();
burn();

afterInput(() => {

});

