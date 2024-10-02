/*
@title: Up, Down, Top-down
@author: Somebud0180
@tags: ['puzzle','platformer']
@addedOn: 2024-07-15
*/

// A game with blocks, gravity blocks, flags, and stuff
// A platformer game with a maze, featuring 20 maps.
// Also featuring, a menu, that took probably half the programming time
// Most code can be found with "documentation" at the
// Github repo: https://github.com/Somebud0180/Up-Down-Top-down/

// Controls
// They're in the guide, when a item is highlighted, press L to display the description
// L to Continue (Open the guide for more)

const player = "p";
const topDownSpawner = "t";
const arrow = "q";
const block = "b";
const magicBlock = "v";
const flagDown = "o";
const flagUp = "c";
const gravityBlockDown = "m";
const gravityBlockUp = "n";

const background = "z";
const textBackground = "y";
const leftTextBackground = "x";
const rightTextBackground = "r";

const buttonW = "w";
const buttonA = "a";
const buttonS = "s";
const buttonD = "d";
const buttonI = "i";
const buttonK = "k";
const buttonJ = "j";
const buttonL = "l";
const blockActive = "h";
let buttonActive = "g";

let pingError; // Check errorPing()
let isMoving = 0; // Check gravityPull()
let jumpHeight = 0; // Check jumpUp()
let ableToJump = 0; // Check jumpUp()
let currentPointer; // Check pointer functions
let pointerX = 2; // Check pointer functions
let pointerY = 6; // Check pointer functions
let optionCoord; // Check pointer functions
let playerCoord;
let belowTile; // Check jumpUp()
let lowerTile; // Check jumpUp()
let verticalTile; // Check gravityBlockDetection()
let allBlocks; // Check displayBlocksInRange()

// Explained at updateGameIntervals()
let pointerChangeInterval;
let flagDetectionInterval;
let blockDetectionInterval;
let gravityLoopInterval;
let jumpLoopInterval;

// Resources
// Active Textures
const buttonLGlyph = bitmap`
................
................
................
................
.....222222.....
....22000222....
....22022022.2..
....22000222.22.
....22022022.22.
....22022022.2..
....22022022....
.....222222.....
................
................
................
................`;

// Inactive Textures
const buttonWInactiveGlyph = bitmap`
................
.......11.......
......1111......
................
.....111111.....
....11011111....
....11011111....
....11011111....
....11011111....
....11011111....
....11000011....
.....111111.....
................
................
................
................`;
const buttonAInactiveGlyph = bitmap`
................
................
................
................
.....111111.....
....11011111....
..1.11011111....
.11.11011111....
.11.11011111....
..1.11011111....
....11000011....
.....111111.....
................
................
................
................`;
const buttonSInactiveGlyph = bitmap`
................
................
................
................
.....111111.....
....11011111....
....11011111....
....11011111....
....11011111....
....11011111....
....11000011....
.....111111.....
................
......1111......
.......11.......
................`;
const buttonDInactiveGlyph = bitmap`
................
................
................
................
.....111111.....
....11011111....
....11011111.1..
....11011111.11.
....11011111.11.
....11011111.1..
....11000011....
.....111111.....
................
................
................
................`;
const buttonIInactiveGlyph = bitmap`
................
.......11.......
......1111......
................
.....111111.....
....11000111....
....11011011....
....11000111....
....11011011....
....11011011....
....11011011....
.....111111.....
................
................
................
................`;
const buttonJInactiveGlyph = bitmap`
................
................
................
................
.....111111.....
....11000111....
..1.11011011....
.11.11000111....
.11.11011011....
..1.11011011....
....11011011....
.....111111.....
................
................
................
................`;
const buttonKInactiveGlyph = bitmap`
................
................
................
................
.....111111.....
....11000111....
....11011011....
....11000111....
....11011011....
....11011011....
....11011011....
.....111111.....
................
......1111......
.......11.......
................`;
const buttonLInactiveGlyph = bitmap`
................
................
................
................
.....111111.....
....11000111....
....11011011.1..
....11000111.11.
....11011011.11.
....11011011.1..
....11011011....
.....111111.....
................
................
................
................`;

// Highlight
const buttonHighlightTexture = bitmap`
................
................
................
.....222222.....
....21111112....
...2111111112...
...2111111112...
...2111212112...
...2112121112...
...2111111112...
...2111111112...
....21111112....
.....222222.....
................
................
................`;
const blockHighlightTexture = bitmap`
2222222222222222
2222222222222222
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
................
................
................
................`;

const playerDown = bitmap`
................
................
................
................
.......22.......
......2222......
......2222......
................
......2222......
...2222222222...
....22222222....
.....222222.....
.....222222.....
......2222......
.......22.......
................`;
const playerUp = bitmap`
................
.......22.......
......2222......
.....222222.....
.....222222.....
....22222222....
...2222222222...
......2222......
................
......2222......
......2222......
.......22.......
................
................
................
................`;
const playerTop = bitmap`
................
................
................
................
.......11.......
......1221......
..LLL122221LLL..
.L221222222122L.
.L221222222122L.
..LLL122221LLL..
......1221......
.......11.......
................
................
................
................`;
const playerTopSide = bitmap`
................
.......LL.......
......L22L......
......L22L......
......L11L......
......1221......
.....122221.....
....12222221....
....12222221....
.....122221.....
......1221......
......L11L......
......L22L......
......L22L......
.......LL.......
................`;

const topDownSpawnerTexture = bitmap`
................
................
................
...77...........
...77...........
...77...........
.777777.........
..7777..........
...77...........
.........9......
...11...99......
..1221.999999...
..1221.999999...
...11...99......
.........9......
................`;
const arrowTexture = bitmap`
........22......
........222.....
........2222....
........22222...
.2222222222222..
.22222222222222.
.22222222222222.
.2222222222222..
........22222...
........2222....
........222.....
........22......
................
................
................
................`;
const magicBlockTexture = bitmap`
LLLLLLLLLLLLLLLL
L00LLLLLLLLLLLLL
L0000000000000LL
LL000000000000LL
LL000000000000LL
LL000077770000LL
LL000777777000LL
LL000775577000LL
LL000775577000LL
LL000777777000LL
LL000077770000LL
LL000000000000LL
LL000000000000LL
LL0000000000000L
LLLLLLLLLLLLL00L
LLLLLLLLLLLLLLLL`;
const blockTexture = bitmap`
LLLLLLLLLLLLLLLL
L00LLLLLLLLLLLLL
L0000000000000LL
LL000000000000LL
LL000000000000LL
LL000077770000LL
LL000777777000LL
LL000777777000LL
LL000777777000LL
LL000777777000LL
LL000077770000LL
LL000000000000LL
LL000000000000LL
LL0000000000000L
LLLLLLLLLLLLL00L
LLLLLLLLLLLLLLLL`;
const gravityBlockDownTexture = bitmap`
................
................
.......77.......
.......77.......
.......77.......
.......77.......
....77777777....
.....777777.....
......7777......
....7..77..7....
....7......7....
..77777..77777..
...777....777...
....7......7....
................
................`;
const gravityBlockUpTexture = bitmap`
................
................
....9......9....
...999....999...
..99999..99999..
....9......9....
....9..99..9....
......9999......
.....999999.....
....99999999....
.......99.......
.......99.......
.......99.......
.......99.......
................
................`;
const flagDownTexture = bitmap`
................
................
..CCDDDD...DDD..
..CCDDDDDDDDDD..
..CCDDDDDDDDDD..
..CCDDDDDDDDDD..
..CCDDDDDDDDDD..
..CCDDDDDDDDDD..
..CCDDDDDDDDDD..
..CC...DDDDD....
..CC............
..CC............
..CC............
..CC............
..CC............
..CC............`;
const flagUpTexture = bitmap`
............CC..
............CC..
............CC..
............CC..
............CC..
............CC..
....DDDDD...CC..
..DDDDDDDDDDCC..
..DDDDDDDDDDCC..
..DDDDDDDDDDCC..
..DDDDDDDDDDCC..
..DDDDDDDDDDCC..
..DDDDDDDDDDCC..
..DDD...DDDDCC..
................
................`;

const backgroundTexture = bitmap`
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
0000000000000000`;
const textBackgroundTexture = bitmap`
................
3333333333333333
33LL333LLLL3LLL3
3LLLL3LLLLL3LLL3
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
LLLLLLLLLLLLLLLL`;
const leftTextBackgroundTexture = bitmap`
................
.......333333333
.......33L3LLLLL
.......3LLLLLLLL
.......LLLLLLLLL
.......LLLLLLLLL
.......LLLLLLLLL
.......LLLLLLLLL
.......LLLLLLLLL
.......LLLLLLLLL
.......LLLLLLLLL
.......LLLLLLLLL
.......LLLLLLLLL
.......LLLLLLLLL
.......LLLLLLLLL
.......LLLLLLLLL`;
const rightTextBackgroundTexture = bitmap`
................
333333333.......
3LLL3LL33.......
LLLL3LLL3.......
LLLLLLLLL.......
LLLLLLLLL.......
LLLLLLLLL.......
LLLLLLLLL.......
LLLLLLLLL.......
LLLLLLLLL.......
LLLLLLLLL.......
LLLLLLLLL.......
LLLLLLLLL.......
LLLLLLLLL.......
LLLLLLLLL.......
LLLLLLLLL.......`;

const levels = [
  map`
...............
...............
...............
...w.......i...
..a.d.....j.l..
...s.......k...
..........o..n.
.p..b..v..c..m.
...............
.....l.........
...............
...............`, // 0 Guide
  map`
b.vvvvvvvvvvv.b
m.vn.......mv.m
..v.........v..
..v.........v..
..vvvvvvvvvvv..
...............
...............
...............
...............
...........b...
n.bb.b.b.bb...o
b.............b`, // 1 Main Menu || Game Map 1
  map`
...............
...............
..............o
............bbb
.........bb....
...............
........b......
.......b.......
.....b.........
..b.b..........
bb.............
...............`, // 2 Game Map 2 "Steps"
  map`
....b...b.bbbbb
....b...b.....c
..b.b...m......
..m.b..........
....b..........
....m..........
........n......
........b......
........b......
.n..n...b......
bb..b.n.b......
....b.b.b......`, // 3 Game Map 3 "Switch"
  map`
bbbbbbbbbbbbbbb
b.....tb......o
bbb.bbbb.bb.bbb
b...b..b..b...b
b.b....bbbbb..b
b.bbbb.b...bb.b
b..b.bbb.b..b.b
b.bb...b.bb.b.b
b....b.b......b
bbbb.b.bb.bbb.b
b....b....b...b
bbbbbbbbbbbbbbb`, // 4 Game Map 4 "Pathfinder"
  map`
...............
...............
bbb............
...............
...............
...............
...............
...............
...............
...............
..............o
............bbb`, // 5 Game Map 5 "Slop"
  map`
...............
..............o
.bbb..bb.bb.bbb
...............
b..............
bb..bb..bb.....
...........bbb.
...............
..............b
.............bb
...........b...
bbbbbbbbbb.....`, // 6 Game Map 6 "Simple"
  map`
...............
.....b.......o.
........b..bbb.
...b...........
..............b
.bbbbb..b..b.bb
...............
b..............
bbb..bb..b..bb.
...............
..............b
bb..b..b..b..bb`, // 7 Game Map 7 "Sly"
  map`
m....m.m.......
....bmbmbb....o
..mb.m.m..bbbbb
.bm............
...............
.........n.....
.........b.....
..........b.bb.
...............
....b..b......b
..b.........b..
b........bbb...`, // 8 Game Map 8 "Thin Line"
  map`
bbbbbbbbbbbbbbb
mmmmm..........
..............o
.bbb.b.b.bb.bbb
.b..........mmm
n...........mm.
bb.b.b..b.b.m..
............bb.
.............b.
.............b.
...b....b..b..n
bb....b....bbbb`, // 9 Game Map 9 "Up and Down"
  map`
bbbbbbbbbbbbbbbbbbb
b............b....b
b.bb.bb.bbb.bb.bb.b
b.b...b.....b.....b
bbb.b...bbb...bbbbb
b...bb.......bb...b
bbb.b..bb.bb..b.bbb
ob..b.bb.t.bb.b...o
bbb.b..bb.bb..b.bbb
b...bb....b..bb...b
bbbbb...bbb.b.b.bbb
b.....b.....b.....b
b.bb.bbbbbb.bb.bb.b
b.......b.........b
bbbbbbbbbbbbbbbbbbb`, // 10 Game Map 10 "Familiar"
  map`
bbbbbbbbbbbbbbb
b..b.......b..b
bo.v.......b.ob
bbbbbb...bbbbbb
.......b.......
...............
....b..b..b....
.b....bbb....b.
...............
b.............b
..b.b..p..b.b..
....bbbbbbb....`, // 11 Game Map 11  "Face"
  map`
..........b..mm
..........b....
....bn....b...o
.bnnb...n.b.bbb
..bbb.n...b....
.bmmb.....b....
....b..n..b....
bbb.bn....b....
....b.....b....
....b.n.n.b....
...nb....n.nnnn
bbbbbbbbbbbbbbb`, // 12 Game Map 12  "Float"
  map`
bbbbbbbbbbbbbbb
t.bbb....bbb.bb
b..b..bb..b...b
bb..b..bb.b.b.b
bbb..b.b..b.b.b
b.bb.b.b.bb.b.b
b......b....b.b
b.bbbbbbbbb.b.b
b..b.....b..b.b
bb.b.b.bbbbbb.b
b....b.bo.....b
bbbbbbbbbbbbbbb`, // 13 Game Map 13  "Bumpy"
  map`
b.....bbb.....b
b.....vov.....b
b..bbbbbbbbb..b
bb.b...b...b.bb
b..v..bbb..b..b
b.bbb..b..bbb.b
b..b..bbb..b..b
b......b......b
bb..bbbbbbb..bb
b....b...b....b
b.b..v.p.v..b.b
b...bbbbbbb...b`, // 14 Game Map 14  "Skeleton"
  map`
bbbbmbbbbvvvvvm
m......pb......
.b..m..bb.....o
.b.....b.....bb
.b.n.n.b.......
.b.....b.v.v.v.
.b.....b.v.v.v.
.b.....bmb.b.b.
.b.....b.......
..b...b..b.....
bn..b..b.bnnnnn
.........bbbbbb`, // 15 Game Map 15  "W"
  map`
bbbbbbbbbbbbbbb
b.......b...b.b
b.bbbbbbb.b...b
b.....b...bbb.b
b.b.b.bbb.b...b
b.b.b.btb.bbb.b
b.b.b.......b.b
b.bbbbbbbbbbb.b
b.b...b...b...b
b.b.b.bbb.b.b.b
b...b..ob...b.b
bbbbbbbbbbbbbbb`, // 16 Game Map 16  "Lines"
  map`
bbbbbbbbbbbbbbb
b.............b
bbb.bbtbbbbbb.b
b.b..bbb....b.b
b.bb.....bb.b.b
b....bbbbb..b.b
b.b.bbbb...bb.b
b.b.b.bb.bbb..b
bbb.b..b.b...bb
b...bb.b.b.bbbo
b.b....b.b.....
bbbbbbbbbbbbbbb`, // 17 Game Map 17  "Lol"
  map`
....bm.m.b...bb
....bm...b....m
....bm...b...b.
....b....b.m.b.
....m....b..mb.
.m......nbm..b.
.....n...b...b.
...m.b...b.m.b.
....nb...b...b.
....nb.......b.
..p.nb.......bo
..n.nb.....n.bb`, // 18 Game Map 18  "Tense"
  map`
bbbbbbbbbbbbbbbbbbbb
bt....b...b....b...b
b.bbb...b...b.bb.b.b
b...b.bbbb.b.....b.b
b.b......b.bbbbb.b.b
b.bb.b.b.b.....b.b.b
b.b..b.b.b.b.b.b.b.b
b.b.bbbb...b.b...b.b
bb..b....bb....bbb.b
b..bbbbbbb..b.bb.b.b
b.bb.b.b.vb...v....b
b.b..v.b.ob.b.b.bb.b
b.b.bb.b.vb.bbb.b..b
b....b...b........bb
bbbbbbbbbbbbbbbbbbbb`, // 19 Game Map 19  "Masive"
  map`
m.........o......mmm
.mmmmmmmmmbbbbbbb...
.b.b..b..bmmbbbmmb..
.................b..
..b.b..b...m.b...b..
..........bm.b......
...........m.b......
....b..b...bnb......
.b...........b.mmmmm
....................
b...........bmmmmmm.
b..b...b...bb.......
b..b...b...b........
.............b......
b..b...b...bb.n....n`, // 20 Game Map 20  "Final Hurdle"
  map`
bbbbbbbbbbbbbbb
.n...........m.
...............
...............
.n...........m.
...............
...............
.n...........m.
...............
...............
.n...........m.
bbbbbbbbbbbbbbb`, // 21 Finish Screen
];

const menuSFX = tune`
750: C4~750,
23250`;
const errorSFX = tune`
150: D4^150 + C4/150,
150: C4/150 + D4^150,
4500`;
const stepSFX = tune`
428.57142857142856: C4~428.57142857142856 + D4~428.57142857142856,
13285.714285714284`;
const jumpSFX = tune`
428.57142857142856: F4~428.57142857142856 + G4~428.57142857142856,
13285.714285714284`;
const gravityChangeSFX = tune`
300: F4^300,
9300`;
const deathSFX = tune`
75: B4^75,
75: B4~75,
75: B4^75,
75: B4~75,
75: B4^75,
2025`;
const finishSFX = tune`
240: A5~240,
240: B5~240,
240: A5~240,
6960`;
const completeSFX = tune`
150: G4~150,
150: G4~150,
150: A4~150,
150: A4~150,
150: D5~150,
150: D5~150,
150,
150: F5^150,
150: E5^150,
150: F5^150,
150: E5^150,
150,
150: D5~150,
150,
150: D5~150,
150,
150: D5~150,
150,
150: C5~150,
150: E5~150,
150: C5~150,
150: D5~150,
150,
150: A4/150,
150: A4/150,
150: D5/150,
150: D5/150,
150: G5/150,
150: G5/150,
150,
150: G5-150,
150: G5-150`;

// Texts (Looks more clean here)
let currentLevelText;

let mainMenuTitle = `
  Up  Down
  
  Top-Down
`;

let mainMenuOptions = `
  Start Game
  ----------
  
  Guide
  -----
`;

let backButton = `
Back
----
`;

let tutorial1 = `
Double-click
the jump button 
to get higher
`;

let tutorial2 = `
Get on 
top the
Gravity 
Block to
activate`;

let errorSpawn = `
Error: Couldn't 
find empty tile
for player spawn`;

let deathText = `You died`;

let finishText = `
You completed
  the game!


  
 Thanks for
  playing!`;

// Guide Texts
let menuGuide = `Press   

to activate`;
// Controls
let upLGuide = `Moves player 
upward in 
Top-down mode`;
let leftLGuide = `Moves player to 
the left`;
let downLGuide = `Moves player 
downward in
Top-down mode`;
let rightLGuide = `Moves player to 
the right`;
let upRGuide = `Makes player jump`;
let leftRGuide = `Returns to menu
(Level is saved)`;
let downRGuide = `Makes player jump,
also acts as the
back button in
the menu`;
let rightRGuide = `Confirm menu
selection, also 
acts as level skip`;
// Blocks
let playerGuide = `It's you!`;
let blockGuide = `A solid platform,
good for standing
on`;
let magicBlockGuide = `???`;
let flagGuide = `Get near it
and you complete
the level`;
let gravityBlockGuide = `Stand on this
block and watch
as you flip
upside down`;

// Game Default States
// Do not move this up, currentPlayer requires the texture from above
let gameState = 0; // 0 for Main Menu; 1 for In-game; 2 for Death
let menuMode = 1; // 1 for Main Menu; 2 for Guide
let pointerOption = 0;
let backButtonState = "2"; // 1 is Gray (unselected); 2 is White (selected)
let level = 1; // 0 for Guide; 1 for Main Menu; Last map for Finish screen; The in between are the game maps
let lastLevel = 1; // Tracks level before mainMenu to allow accessing the main menu whilst in game
let spawnX = 0; // Automatic
let spawnY = 0; // Automatic
let spawnHeight = 0;
let currentPlayer = playerDown;
let gravity = "down";
let rotation = "horizontal";

// Main Menu starts here
mainMenu();

// Controls
onInput("w", () => {
  if (gameState == 0) {
    pointerUp();
  } else if (gameState == 1) {
    if (gravity == "top") {
      rotation = "vertical";
      getFirst(player).y -= 1;
      playTune(stepSFX);
      characterInit();
    }
  }
});

onInput("s", () => {
  if (gameState == 0) {
    pointerDown();
  } else if (gameState == 1) {
    if (gravity == "top") {
      rotation = "vertical";
      getFirst(player).y += 1;
      playTune(stepSFX);
      characterInit();
    }
  }
});

onInput("a", () => {
  if (gameState == 0) {
    pointerUp();
  } else if (gameState == 1) {
    rotation = "horizontal";
    getFirst(player).x -= 1;
    playTune(stepSFX);
    characterInit();
  }
});

onInput("d", () => {
  if (gameState == 0) {
    pointerDown();
  } else if (gameState == 1) {
    rotation = "horizontal";
    getFirst(player).x += 1;
    playTune(stepSFX);
    characterInit();
  }
});

onInput("i", () => {
  if (gameState == 1) {
    jumpUp();
  }
});

onInput("k", () => {
  if (gameState == 0) {
    pointerContinue("k");
    pointerBack();
  } else if (gameState == 1) {
    jumpUp();
  }
});

onInput("j", () => {
  if (gameState == 1 && level != levels.length - 1) {
    // Make sure no one opens the menu during end
    mainMenu();
  }
});

onInput("l", () => {
  if (gameState == 0) {
    pointerContinue();
  } else if (gameState == 1) {
    if (level > 0 && level < levels.length - 4) {
      nextLevel();
    } else {
      pingError = true;
    }
  }
});

afterInput(() => {
  displayBlocksInRange();
});

/// Menu Code
// Sets up the main menu
function mainMenu() {
  pointerX = 2;
  pointerY = 6;
  gameState = 0;
  menuMode = 1;
  pointerOption = 0;
  updateGameIntervals();

  // Check for current level
  if (level > 1 && level < levels.length - 1) {
    lastLevel = level; // Remember last level before mainMenu (if Applicable)
  } else {
    lastLevel = 1;
  }
  currentLevelText = `Current level: ${lastLevel}`; // Grab level and add to text
  clearText();
  setTextures();
  level = 1;
  setMap(levels[level]);
  setBackground(background);
  pointerChange(); // Trigger pointer spawning in advance (Rather than wait for interval)

  addText(mainMenuTitle, {
    x: 4,
    y: 1,
    color: color`2`,
  });
  addText(mainMenuOptions, {
    x: 3,
    y: 7,
    color: color`2`,
  });
  addText(currentLevelText, {
    x: 2,
    y: 15,
    color: color`1`,
  });
}

// Sets up the guide
function guideScreen() {
  gameState = 0;
  menuMode = 2;
  updateGameIntervals();
  clearText();
  setTextures();
  level = 0;
  setMap(levels[level]);
  setBackground(background);
  addBack();
  addText(menuGuide, { x: 1, y: 12, color: color`1` });
}

function addBack() {
  clearText();
  addText(backButton, {
    x: 2,
    y: 0,
    color: backButtonState,
  });
}

// Handles pointer blinking and spawning
function pointerChange() {
  if (menuMode == 1) {
    // Point to selected
    if (currentPointer == arrow) {
      clearTile(pointerX, pointerY);
      addSprite(pointerX, pointerY, buttonL);
    } else {
      clearTile(pointerX, pointerY);
      addSprite(pointerX, pointerY, arrow);
    }
    currentPointer = getTile(pointerX, pointerY)[0].type;
  }
}

// Handles pointer selection in guide on-demand
function pointerUpdate() {
  if (pointerOption == 1) {
    if (getTile(5, 9) !== undefined) {
      clearTile(5, 9);
    }
    updateGlyph(buttonW);
  } else if (pointerOption == 2) {
    updateGlyph(buttonA);
  } else if (pointerOption == 3) {
    updateGlyph(buttonS);
  } else if (pointerOption == 4) {
    updateGlyph(buttonD);
  } else if (pointerOption == 5) {
    updateGlyph(buttonI);
  } else if (pointerOption == 6) {
    updateGlyph(buttonJ);
  } else if (pointerOption == 7) {
    updateGlyph(buttonK);
  } else if (pointerOption == 8) {
    updateGlyph(buttonL);
  } else if (pointerOption == 9) {
    updateGlyph(player);
  } else if (pointerOption == 10) {
    updateGlyph(block);
  } else if (pointerOption == 11) {
    updateGlyph(magicBlock);
  } else if (pointerOption == 12) {
    updateGlyph(flagUp);
  } else if (pointerOption == 13) {
    updateGlyph(gravityBlockDown);
  } else {
    pointerOption = 0;
    updateGlyph();
  }
  // Change back button color
  if (pointerOption == 0) {
    backButtonState = color`2`;
    addBack();
  } else {
    backButtonState = color`1`;
    addBack();
  }
}

// Handles pointer movement (downwards)
function pointerDown() {
  if (menuMode == 1) {
    if (pointerOption == 0) {
      clearTile(pointerX, pointerY);
      pointerY += 2;
      pointerOption++;
      pointerChange();
      playTune(menuSFX);
    } else {
      pingError = true;
    }
  } else if (menuMode == 2) {
    if (pointerOption < 13) {
      pointerOption++;
      pointerUpdate();
      playTune(menuSFX);
    } else {
      pingError = true;
    }
  }
}

// Handles pointer movement (upwards)
function pointerUp() {
  if (menuMode == 1) {
    if (pointerOption == 1) {
      clearTile(pointerX, pointerY);
      pointerY -= 2;
      pointerOption--;
      pointerChange();
      playTune(menuSFX);
    } else {
      pingError = true;
    }
  } else if (menuMode == 2) {
    if (pointerOption > 0) {
      pointerOption--;
      pointerUpdate();
      playTune(menuSFX);
    } else {
      pingError = true;
    }
  }
}

// Allows pointer to jump back to the first option
function pointerBack() {
  if (menuMode == 1) {
    if (pointerOption == 1) {
      clearTile(pointerX, pointerY);
      pointerY -= 2;
      pointerOption = 0;
      pointerChange();
    } else {
      pingError = true;
    }
  } else if (menuMode == 2) {
    if (pointerOption > 0) {
      pointerOption = 0;
      pointerUpdate();
    }
  }
}

// Handles pointer selection and runs/displays them accordingly
function pointerContinue(triggered) {
  if (menuMode == 1) {
    // Main Menu
    if (triggered == "k") {
      // Check if triggered by back button
      if (pointerOption == 0) {
        pingError = true;
      }
    } else if (pointerOption == 0) {
      // Start the Game
      initializeGame();
    } else if (pointerOption == 1) {
      // Go to Guide
      pointerOption = 0; // Return to first option
      guideScreen();
    }
  } else if (menuMode == 2) {
    // Guide
    if (triggered == "k") {
      // Check if triggered by back button
      if (pointerOption == 0) {
        mainMenu();
      }
    } else if (pointerOption == 0) {
      pointerOption = 0; // Return to first option
      mainMenu();
    } else if (pointerOption > 0) {
      guideText();
    }
  }
}

// Update current selected item texture to highlight in the guid
function updateGlyph(activeOption) {
  let blockActiveSprite = getFirst(blockActive);
  if (blockActiveSprite) {
    blockActiveSprite.remove();
  }
  if (pointerOption == 0) {
    buttonActive = "g"; // Reset buttonActive and activeOption when switching from buttons to back
  } else if (pointerOption > 0 && pointerOption < 9) {
    buttonActive = activeOption;
  } else if (pointerOption > 8) {
    buttonActive = "g";
    optionCoord = getFirst(activeOption);
    addSprite(optionCoord.x, 8, blockActive);
  }
  setTextures();
}

function guideText() {
  if (pointerOption == 1) {
    addBack(); // Clears text and rewrites the back button
    addText(upLGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 2) {
    addBack();
    addText(leftLGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 3) {
    addBack();
    addText(downLGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 4) {
    addBack();
    addText(rightLGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 5) {
    addBack();
    addText(upRGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 6) {
    addBack();
    addText(leftRGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 7) {
    addBack();
    addText(downRGuide, { x: 1, y: 11, color: color`2` });
  } else if (pointerOption == 8) {
    addBack();
    addText(rightRGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 9) {
    addBack();
    addText(playerGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 10) {
    addBack();
    addText(blockGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 11) {
    addBack();
    addText(magicBlockGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 12) {
    addBack();
    addText(flagGuide, { x: 1, y: 12, color: color`2` });
  } else if (pointerOption == 13) {
    addBack();
    addText(gravityBlockGuide, { x: 1, y: 11, color: color`2` });
  }
}

/// Game Logic

// Special Map Check
function mapCheck() {
  if (level == 2) {
    addText(tutorial1, { x: 1, y: 0, color: color`1` });
  } else if (level == 3) {
    addText(tutorial2, { x: 12, y: 10, color: color`1` });
  }
}

// Setup the game
function initializeGame() {
  characterInit();
  setSolids([player, block]);
  setBackground(background);
  level = lastLevel; // Restore lastLevel if applicable
  setMap(levels[level]);

  spawn(); // Start Game
}

// Spawn Code
function spawn() {
  clearText(); // Cleans stuff before it
  setMap(levels[level]);
  allBlocks = getAll(block); // Used for displayBlocksInRange()
  mapCheck();
  spawnFind();
  gameState = 1;
  characterInit();
  updateGameIntervals();
  addSprite(spawnX, spawnY, player);
  displayBlocksInRange();
}

// Reset Code
function reset() {
  playTune(deathSFX);
  if (level != 20) {
    // Level 2l has a unique size that makes the background off centre, skips background there
    addSprite(4, 5, leftTextBackground); // Makes the text background centre
    addSprite(10, 5, rightTextBackground); // Makes the text background centre
    for (let i = 5; i <= 9; i++) {
      // Adds background to text to make it readable
      addSprite(i, 5, textBackground);
    }
  }
  addText(deathText, {
    x: 6,
    y: 7,
    color: color`2`,
  });
  gameState = 2;
  updateGameIntervals();
  getFirst(player).remove();
  setTimeout(() => spawn(), 3000);
}

// End Screen Code
function gameComplete() {
  // Loads the final map and displays finishText
  level = levels.length - 1;
  spawn();
  playTune(completeSFX);
  addText(finishText, { x: 4, y: 2, color: color`6` });
  setTimeout(() => {
    mainMenu();
  }, 10000);
}

// Dynamic Spawn Finding Code (Allows manually placed or automatic air finding)
function spawnFind() {
  if (getFirst(topDownSpawner)) {
    // Check for topDownSpawner and set level accordingly
    spawnX = getFirst(topDownSpawner).x;
    spawnY = getFirst(topDownSpawner).y;
    gravity = "top";
    clearTile(spawnX, spawnY);
  } else if (getFirst(player)) {
    // Check for player and set accordingly
    spawnX = getFirst(player).x;
    spawnY = getFirst(player).y;
    gravity = "down";
    clearTile(spawnX, spawnY);
  } else {
    // If there is neither run automatic detection
    gravity = "down";
    spawnHeight = height() - 1;
    spawnX = 0;
    spawnY = spawnHeight;
    while (spawnHeight == height() - 1) {
      for (spawnY >= 0; spawnY--;) {
        // Scan from bottom to top
        if (
          getTile(spawnX, spawnY).length == 0 &&
          getTile(spawnX, spawnY + 1).length != 0 &&
          spawnY < spawnHeight
        ) {
          // Check for air block within bounds
          spawnHeight = 0; // Reset spawnHeight
          break; // Exit the loop if air block is found
        } else if (spawnY >= spawnHeight) {
          // Check if exceeded bounds
          spawnHeight = 0; // Reset
          pingError = true;
          addText(errorSpawn, {
            x: 2,
            y: 6,
            color: color`3`,
          });
          setTimeout(() => {
            console.log("Error: Couldn't find empty tile for player spawn");
            if (level > 1) {
              level--;
            }
            spawn();
          }, 5000);
          return; // Break the loop if no empty tile is found
        }
      }
    }
  }
}

// Jump Code
function jumpUp() {
  playerCoord = getFirst(player);

  // Check if ableToJump is 0
  if (ableToJump < 2) {
    if (gravity == "down") {
      jumpHeight++; // Tells jumpPull() to make player jump
      ableToJump++; // Counts jumps made
    } else if (gravity == "up") {
      jumpHeight--; // Tells jumpPull() to make player jump
      ableToJump++; // Counts jumps made
    }
    playTune(jumpSFX);
  }
}

// Jump Velocity Code
function jumpPull() {
  // Increases player y postion whilst jumpHeight is not 0
  while (jumpHeight < 0) {
    getFirst(player).y++;
    jumpHeight++;
  }
  while (jumpHeight > 0) {
    getFirst(player).y--;
    jumpHeight--;
  }
}

// Gravity Code
function gravityPull() {
  playerCoord = getFirst(player);
  let downCollision = getTile(playerCoord.x, playerCoord.y + 1);
  let upCollision = getTile(playerCoord.x, playerCoord.y - 1);
  // Collision check
  if (
    gravity == "down" &&
    downCollision.length != 0 &&
    downCollision[0].type != magicBlock
  ) {
    isMoving = 0;
    ableToJump = 0; // Resets jump counter
  } else if (
    gravity == "up" &&
    upCollision.length != 0 &&
    upCollision[0].type != magicBlock
  ) {
    isMoving = 0;
    ableToJump = 0; // Resets jump counter
  } else {
    isMoving += 1; // Jumping feels better requiring two iterations than longer intervals
  }

  // Apply Gravity
  if (isMoving > 1) {
    if (gravity == "down") {
      // If gravity is down and there is no block below, lower the player y
      getFirst(player).y++;
      if (getFirst(player).y == height() - 1) {
        // If player is at the bottom edge of the map, execute death function
        reset();
      }
    } else if (gravity == "up") {
      // If gravity is up and there is no block above, increase the player y
      getFirst(player).y--;
      if (getFirst(player).y == 0) {
        // If player is at the top edge of the map, execute death function
        reset();
      }
    }
  }
}

// Gravity Block Code
function gravityBlockDetection() {
  playerCoord = getFirst(player);
  if (
    gravity == "down" &&
    getTile(playerCoord.x, playerCoord.y + 1).length != 0
  ) {
    // Checks current gravity and if there is a exisiting block below player
    verticalTile = getTile(playerCoord.x, playerCoord.y + 1)[0];
  } else if (
    gravity == "up" &&
    getTile(playerCoord.x, playerCoord.y - 1).length != 0
  ) {
    // Checks current gravity and if there is a exisiting block above player
    verticalTile = getTile(playerCoord.x, playerCoord.y - 1)[0];
  } else {
    // Exits function if none is found
    return;
  }
  // Check tiles above and below for gravity blocks
  if (verticalTile.type == gravityBlockDown) {
    playTune(gravityChangeSFX);
    gravity = "down";
    characterInit();
  } else if (verticalTile.type == gravityBlockUp) {
    playTune(gravityChangeSFX);
    gravity = "up";
    characterInit();
  }
}

function displayBlocksInRange() {
  if (gravity == "top") {
    if (getFirst(player)) {
      // Get the player's coordinates
      playerCoord = getFirst(player);
      let playerX = playerCoord.x;
      let playerY = playerCoord.y;

      // Define the range around the player (5 grids in each direction)
      const range = 3;

      for (let blockSprite of allBlocks) {
        let blockX = blockSprite.x;
        let blockY = blockSprite.y;
        addSprite(blockX, blockY, block);
      }

      for (let blockSprite of allBlocks) {
        let blockX = blockSprite.x;
        let blockY = blockSprite.y;

        // Calculate the distance between the block and the player
        const distance =
          Math.abs(blockX - playerX) + Math.abs(blockY - playerY);

        // Check if the block is within the specified range around the player
        if (distance <= range) {
          if (!getTile(blockX, blockY)) {
            // If block is within range, add it to the game
            addSprite(blockX, blockY, blockSprite.type);
          }
        } else {
          if (getTile(blockX, blockY)) {
            // If block exceeds the range, remove it from the game
            clearTile(blockX, blockY);
          }
        }
      }
    }
  }
}

// Checks for a nearby flag and progress the level
function flagDetection() {
  playerCoord = getFirst(player);
  let surroundingTiles = [
    getTile(playerCoord.x, playerCoord.y + 1)[0], // Tile below player
    getTile(playerCoord.x, playerCoord.y - 1)[0], // Tile above player
    getTile(playerCoord.x + 1, playerCoord.y)[0], // Tile to the right of player
    getTile(playerCoord.x - 1, playerCoord.y)[0], // Tile to the left of playerd
  ];

  // Checks if surrounding tiles contain a flag and stores them
  let flagFound = surroundingTiles.some(
    (tile) => tile && (tile.type == flagDown || tile.type == flagUp),
  );

  // If flagFound returns something, run
  if (flagFound) {
    playTune(finishSFX, 1);
    nextLevel();
  }
}

function nextLevel() {
  if (levels.length - 2 == level) {
    // Checks if game is complete and loads the end screen
    gameComplete();
    return;
  } else {
    level++;
    spawn();
  }
}

function errorPing() {
  if (pingError == true) {
    playTune(errorSFX);
    pingError = false;
  }
}

// Character Update Code
function characterInit() {
  // Checks for character gravity and applies the corresponding texture
  if (gravity == "down") {
    currentPlayer = playerDown;
  } else if (gravity == "up") {
    currentPlayer = playerUp;
  } else if (gravity == "top") {
    if (rotation == "vertical") {
      currentPlayer = playerTop;
    } else if (rotation == "horizontal") {
      currentPlayer = playerTopSide;
    }
  }
  setTextures();
}

// Texture Update Code
function setTextures() {
  // This function loads the required textures for each gameState and menuMode
  if (gameState == 0) {
    // Main Menu or Guide check
    if (menuMode == 1) {
      setLegend(
        [player, currentPlayer],
        [topDownSpawner, topDownSpawnerTexture],
        [arrow, arrowTexture],
        [block, blockTexture],
        [magicBlock, magicBlockTexture],
        [flagDown, flagDownTexture],
        [flagUp, flagUpTexture],
        [gravityBlockDown, gravityBlockDownTexture],
        [gravityBlockUp, gravityBlockUpTexture],
        [buttonL, buttonLGlyph],
        [blockActive, blockHighlightTexture],
        [background, backgroundTexture],
        [textBackground, textBackgroundTexture],
        [leftTextBackground, leftTextBackgroundTexture],
        [rightTextBackground, rightTextBackgroundTexture],
      );
    } else if (menuMode == 2) {
      setLegend(
        [player, currentPlayer],
        [arrow, arrowTexture],
        [background, backgroundTexture],
        [block, blockTexture],
        [magicBlock, magicBlockTexture],
        [flagDown, flagDownTexture],
        [flagUp, flagUpTexture],
        [gravityBlockDown, gravityBlockDownTexture],
        [gravityBlockUp, gravityBlockUpTexture],
        [buttonW, buttonWInactiveGlyph],
        [buttonA, buttonAInactiveGlyph],
        [buttonS, buttonSInactiveGlyph],
        [buttonD, buttonDInactiveGlyph],
        [buttonI, buttonIInactiveGlyph],
        [buttonJ, buttonJInactiveGlyph],
        [buttonK, buttonKInactiveGlyph],
        [buttonL, buttonLInactiveGlyph],
        [buttonActive, buttonHighlightTexture],
        [blockActive, blockHighlightTexture],
      );
    }
  } else if (gameState == 1) {
    setLegend(
      [player, currentPlayer],
      [topDownSpawner, topDownSpawnerTexture],
      [block, blockTexture],
      [magicBlock, magicBlockTexture],
      [flagDown, flagDownTexture],
      [flagUp, flagUpTexture],
      [gravityBlockDown, gravityBlockDownTexture],
      [gravityBlockUp, gravityBlockUpTexture],
      [background, backgroundTexture],
      [textBackground, textBackgroundTexture],
      [leftTextBackground, leftTextBackgroundTexture],
      [rightTextBackground, rightTextBackgroundTexture],
    );
  }
}

// Refreshes gameIntervals based on current gameState and menuMode
function updateGameIntervals() {
  errorPingInterval = setInterval(errorPing, 1000); // Set interval for error sound being playe
  if (gameState == 1) {
    // Clear any existing intervals
    clearInterval(pointerChangeInterval);
    clearInterval(flagDetectionInterval);
    clearInterval(blockDetectionInterval);
    clearInterval(gravityLoopInterval);
    clearInterval(jumpLoopInterval);

    flagDetectionInterval = setInterval(flagDetection, 500); // Set interval for flag detection
    blockDetectionInterval = setInterval(gravityBlockDetection, 300); // Set interval for gravity block detection
    gravityLoopInterval = setInterval(gravityPull, 300); // Set interval for gravity calculation
    jumpLoopInterval = setInterval(jumpPull, 100); // Set interval for jump calculation
  } else if (gameState == 0) {
    // Clear any existing intervals
    clearInterval(pointerChangeInterval);
    clearInterval(flagDetectionInterval);
    clearInterval(blockDetectionInterval);
    clearInterval(gravityLoopInterval);
    clearInterval(jumpLoopInterval);

    pointerChangeInterval = setInterval(pointerChange, 1000); // Set interval for pointer texture swap
  } else {
    // Clear intervals if game is not active
    clearInterval(pointerChangeInterval);
    clearInterval(flagDetectionInterval);
    clearInterval(blockDetectionInterval);
    clearInterval(gravityLoopInterval);
    clearInterval(jumpLoopInterval);
  }
}
