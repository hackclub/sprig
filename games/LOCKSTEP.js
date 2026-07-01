/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: LOCKSTEP
@description: LOCKSTEP is a grid-based puzzle game with a Solid Echo that mimics your every move. It won't hurt you, but it will block your path.
@author: Xavier Shilo Saputra
@tags: ['maze', 'puzzle', "logic", "strategy", 'endless']
@addedOn: 2026-02-01

STORY:
The Mirror Catacombs run deep,
Where ancient secrets shadows keep.
Sir Alistair, by curse confined,
To a spectral Echo, fate is bound.

It mimics every step you take,
A deadly dance you must forsake.
But here’s the trick to break the trance:
Use walls to halt your own advance.

While you stand still against the stone,
The Echo moves on, all alone.
De-sync the steps, the vault is near,
But touch the ghost, and end in fear.

CONTROLS:
- WASD: Move Sir Alistair
- I: Start Story / Confirm Selection / Retry Level
- J: Enter Level Select
- K: Enter Infinite Mode
- L: Toggle How to Play / Return to Menu

OBJECTIVE:
- Reach the Treasure Chest (g) in each level.
- The Echo (c) is a solid object. You cannot walk through it.
- If you get stuck/locked, press I to retry.

Have Fun!!!
*/

const PLAYER = "p";
const CHASER = "c";
const WALL = "w";
const GOAL = "g";

setLegend(
  [PLAYER, bitmap`
.000.000000.....
0L5001L1L1L0....
0L00L1L1L1L0....
00000L111110.0..
0.01L0000000010.
..0L1666660.010.
..0L16CF6C0.010.
..01L6CFFC0.010.
...0L666660.010.
.00000LLL000010.
05L10111L1005550
.0500L11010L060.
000000001000L50.
05700LL1110.00..
05700550050.....
.00.0LL00LL0....`],
  [CHASER, bitmap`
......0000......
.....0..110.....
....0....110....
.00.0.....10.00.
0.10.0.0..100.10
0..0.0.0..10..10
.0.1.0.0..1..10.
.0...........10.
..0...0.....10..
..0...0....10...
...0......11000.
...0.......10..0
....0.........10
.....01......10.
......00111100..
........0000....`],
  [WALL, bitmap`
1111111111111111
LLL0LLL0LLL0LLLL
LLL0LLL0LLL0LLLL
LLLLLLLLLLLLLLLL
LLL0LLL0LLL0LLLL
LLL0LLL0LLL0LLLL
1111111111111111
LLL0LLL0LLL0LLLL
LLL0LLL0LLL0LLLL
LLLLLLLLLLLLLLLL
LLL0LLL0LLL0LLLL
LLL0LLL0LLL0LLLL
1111111111111111
LLL0LLL0LLL0LLLL
LLL0LLL0LLL0LLLL
1111111111111111`],
  [GOAL, bitmap`
................
................
...0000000000...
..0CC6CCCC6CC0..
..0FF6FFFF6FF0..
..066666666660..
..00000FF00000..
..0CCC0000CCC0..
..0656366F6640..
..000000000000..
..06CCCCCCCC60..
..06FFFFFFFF60..
..066666666660..
...0000000000...
................
................`]
);

setSolids([PLAYER, CHASER, WALL]);

let state = "MENU";
let gameMode = ""; // "STORY", "LEVELS", "INFINITE."
let currentLevelIdx = 0;
let infiniteScore = 0;

const levels = [
  // 1-10
  map`
wwwwwwwwww
w........w
w.p....c.w
w...w....w
w...w....w
w...w....w
w...g....w
wwwwwwwwww`, 
  map`
wwwwwwwwww
w...c....w
w........w
w...ww...w
w.p.ww.g.w
w...ww...w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
wp.w...c.w
w..w.....w
w.....w..w
w..w..w..w
w..w..g..w
w..wwwwwww
wwwwwwwwww`,
  map`
wwwwwwwwww
w.c.wwwwgw
w...w....w
w.p.w....w
w...w....w
w...w....w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
wp..w...gw
w...w....w
w........w
w...w....w
w...w....w
wc..w....w
wwwwwwwwww`,
  map`
wwwwwwwwww
w...c....w
w.wwwwww.w
w.w....w.w
w.w.ww.w.w
w.w.g..w.w
w.p....w.w
wwwwwwwwww`,
  map`
wwwwwwwwww
wc.......w
wwwwwww..w
w.....w..w
w..p..w..w
w.....w..w
w..g.....w
wwwwwwwwww`,
  map`
wwwwwwwwww
w...c....w
w..wwww..w
w..w..w..w
wp.w..w.gw
w..wwww..w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.c......w
w.wwwwww.w
w......w.w
wwwwww.w.w
wg.......w
wwwwww.w.w
wp.....w.w`,
  map`
wwwwwwwwww
wp.......w
wwww.w.w.w
w....w.w.w
w.wwww.w.w
w.w....w.w
w...cg...w
wwwwwwwwww`,
  
  // 11-20
  map`
wwwwwwwwww
w.....c..w
w.www.ww.w
w.w....w.w
w...p....w
w.w....w.w
w.ww.www.w
w.....g..w`,
  map`
wwwwwwwwww
w...w...gw
w.w.wc.w.w
w.wpww.w.w
w.ww...w.w
w.w..w.w.w
w...ww...w
wwwwwwwwww`,
  map`
wwwwwwwwww
w...c....w
w.wwwww..w
w.w......w
w.w.www..w
w.w..gw..w
w.wwwww..w
wp.......w`,
  map`
wwwwwwwwww
w........w
w.wwwwww.w
w.w...ww.w
w.w.w.wwpw
w.w.w.ww.w
w...wgwwcw
wwwwwwwwww`,
  map`
wwwwwwwwww
wp.w.....w
ww...www.w
wwww...w.w
w....w.w.w
w.wwww.www
w..g....cw
wwwwwwwwww`,
  map`
wwwwwwwwww
w....w...w
w...cwp..w
ww.wwwww.w
ww.w.g.w.w
ww.w.w.w.w
ww...w...w
wwwwwwwwww`,
  map`
wwwwwwwwww
w......wgw
w.w.wwww.w
w.w.wpcw.w
w.w....w.w
w.wwwwww.w
w........w
wwwwwwwwww`,
  map`
wwwwwwwww
wpw.w...w
w.w.w.wcw
w.w.w.www
w.w.....w
w.wwwww.w
w......gw
wwwwwwwww`,
  map`
wwwwwwwwww
w...p....w
w.wwww.w.w
w.w..w.w.w
w.w.c..w.w
w.wwwwwwww
w.......gw
wwwwwwwwww`,
  map`
wwwwwwwwww
wp..w....w
www.w.ww.w
w...w.w.cw
w.www.w.ww
w.w...w..w
w.w.w.ww.w
w...w...gw
wwwwwwwwww`,

  // 21-30
  map`
wwwwwwwwww
wc...p...w
wwwwwwww.w
w........w
w.wwwwwwww
w........w
wwwwwwww.w
wg.......w
wwwwwwwwww`,
  map`
wwwwwwwwww
w...w....w
w.w.w.ww.w
w.w.w.w..w
w.w.w.w.ww
w.w.w.wp.w
w.w.w.ww.w
wgw...wc.w
wwwwwwwwww`,
  map`
wwwwwwwwww
wgw..p...w
w.w.wwww.w
w.w.wc.w.w
w.w.ww.w.w
w.w....w.w
w.wwwwww.w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
w...w.cw.w
w.w...w...
w..wpwg.w.
ww..w.w.w.
w..w...ww.
w.w..w..w.
w...www...
wwwwwwwwww`,
  map`
wwwwwwwwww
wg.w.w..cw
ww..w.w.ww
w.w......w
ww.w..w.ww
w......w.w
ww.w.w..ww
wp..w.w..w
wwwwwwwwww`,
  map`
wwwwwwwwww
wc...p..cw
w...ww...w
w...ww...w
wwwgwwgwww
w...ww...w
w...ww...w
wc......cw
wwwwwwwwww`,
  map`
wwwwwwwwww
w...w....w
w.w.w.ww.w
w.w.w.w..w
w.w...w.ww
wcw.w.wp.w
www.w.ww.w
wg..w.wc.w
wwwwwwwwww`,
  map`
wwwwwwwwww
wccccccccw
wc......cw
wc..gg..cw
wc..gg..cw
wc..gg..cw
wcp.....cw
wccccccccw
wwwwwwwwww`,
  map`
wwwwww....
w..w...ww.
w.w...w.w.
w....w..w.
www.wg..w.
w....w..w.
w.w...w.w.
w.cw....wp
wwwwwwwwww`,
  map`
wwwwwwwwww
wc......gw
w.w....w.w
w.w.ww.w.w
w.w....w.w
w.w.ww.w.w
w.w....w.w
wp......cw
wwwwwwwwww`,

  // 31-40
  map`
wwwwwwwwww
wc..cp..cw
w.w.ww.w.w
wc..ww..cw
wwwgwwgwww
wc..ww..cw
w.w.ww.w.w
wc..cc..cw
wwwwwwwwww`,
  map`
wwwwwwwwww
w...w....w
w.w...ww.w
w.wwwww..w
w.w...w.ww
wcw.w.wc.w
www.w.ww.w
wg..w...pw
wwwwwwwwww`,
  map`
wwwwwwwwww
wp......cw
w.w.w.ww.w
w........w
w.w.ww.w.w
w........w
w.ww.w.w.w
wc......gw
wwwwwwwwww`,
  map`
wwwwwwwwww
wg......gw
w.w.w.ww.w
w.c.c.cc.w
wpw.w.ww.w
w.c.c.cc.w
w.w.w.ww.w
wg......gw
wwwwwwwwww`,
  map`
wwwwwwwwww
wc..ww..gw
w.w....w.w
w.w.ww.w.w
www....www
w.w.ww.w.w
w.w....w.w
wp..ww..cw
wwwwwwwwww`,
  map`
wwwwwwwwww
wc.....wgw
ww..w..w.w
ww..w.w..w
w..w.pw..w
w..w.w..ww
w.w..w..ww
wgw.....cw
wwwwwwwwww`,
  map`
wwwwwwwwww
w...c....w
w.w.w.ww.w
w...wg...w
w.w.ww.w.w
w...pw...w
w.ww.w.w.w
w....c...w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.......gw
w.wc.w..ww
w.cw.cw..w
w.......pw
w.wc.w..ww
w.cw.cw..w
w........w
wwwwwwwwww`,
  map`
..p.......
..w...ccc.
.www..www.
..w.......
........c.
.w.w...cw.
..w...cw..
.wgw..w...
..........`,
  map`
wwwwwwwwww
wg......cw
w..w.pw..w
w.wwwwww.w
w.wwwwww.w
w..wwww..w
w...ww...w
wc......gw
wwwwwwwwww`,

  // 41-50
  map`
wwwwwwwwww
w........w
w..ww.ww.w
w.wwccww.w
wg......pw
w.wwccww.w
w.ww.ww..w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
c...c...cw
.www.www.w
.....wpw.w
.w.w.w.w.w
.wgw.....w
.www.www.w
c...c...cw
wwwwwwwwww`,
  map`
wwwwwwwwww
wcw..wg..w
w....www.w
w.w....w.w
w.ww.w.w.w
w....w...w
w.ww.w.w.w
wpwc...w.w
wwwwwwwwww`,
  map`
wwwwwwwwww
w........w
w.wpw.wwww
w.www....w
w.wcw.w..w
w.....w..w
wwww.www.w
wg.......w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.........
w...w...w.
w.w.w.w.w.
wpw.wcw.wg
w.w.w.w.w.
w...w...w.
w.........
wwwwwwwwww`,
  map`
wwwwwwwwww
w........w
w.w.ww.w.w
wpw.ww.wcw
www.ww.www
wcw.ww.wgw
w.w.ww.w.w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.w.w.w.wp
w...w.w.w.
w.w.w...w.
w.w...w.w.
w.w.w.w.w.
w.w.w.w...
wgw.wcw.w.
wwwwwwwwww`,
  map`
.......www
wwc....w.p
www....w.w
ww..ww....
...wwww...
....ww..ww
w.w....www
g.w....cww
www.......`,
  map`
www.ww.gww
p...w...w.
www.w.w.w.
..w...w.w.
....w.w...
cw..w.wcw.
ww.ww.www.
.w......w.
...wwww.ww`,
  map`
wwwwwwwwww
w...gwc..w
w.wwwwww.w
w........w
ww.wwww.ww
w........w
w.wwwwww.w
w..cwp...w
wwwwwwwwww`,

];

function isWall(x, y) {
  if (x < 0 || x >= 16 || y < 0 || y >= 16) return true;
  const t = getTile(x, y);
  const walls = t.filter(s => s.type === WALL);
  return walls.length > 0;
}

function generateInfiniteLevel() {
  const width = 14; 
  const height = 12;
  
  let s = "";
  for (let y=0; y<height; y++) {
    for (let x=0; x<width; x++) {
      if (y===0 || y===height-1 || x===0 || x===width-1) {
        s += "w";
      } else {
        if (Math.random() < 0.15) s += "w";
        else s += ".";
      }
    }
    s += "\n";
  }
  
  setMap(s);
  
  function getEmptySpot() {
    let limit = 100;
    while(limit-- > 0) {
      const rx = Math.floor(Math.random() * (width-2)) + 1;
      const ry = Math.floor(Math.random() * (height-2)) + 1;
      if (!isWall(rx, ry)) return {x: rx, y: ry};
    }
    return {x: 1, y: 1};
  }
  
  const pPos = getEmptySpot();
  addSprite(pPos.x, pPos.y, PLAYER);
  
  let gPos = getEmptySpot();
  while (Math.abs(gPos.x - pPos.x) + Math.abs(gPos.y - pPos.y) < 4) {
    gPos = getEmptySpot();
  }
  addSprite(gPos.x, gPos.y, GOAL);
  
  let cPos = getEmptySpot();
  while (Math.abs(cPos.x - pPos.x) + Math.abs(cPos.y - pPos.y) < 4) {
    cPos = getEmptySpot();
  }
  addSprite(cPos.x, cPos.y, CHASER);
}

function loadLevel() {
  clearText();
  
  if (gameMode === "INFINITE") {
    generateInfiniteLevel();
    addText(`Score: ${infiniteScore}`, {x: 1, y: 14, color: color`3`});
    state = "PLAYING";
  } else if (state === "SELECTING") {
    setMap(levels[currentLevelIdx]);
    addText(`Level ${currentLevelIdx + 1}`, {x: 1, y: 1, color: color`4` });
    addText("A <> D", {x: 1, y: 3, color: color`9` });
    addText("Press I to Start", {x: 2, y: 14, color: color`3` });
  } else {
    if (currentLevelIdx >= levels.length) {
      if (gameMode === "STORY") {
          gameMode = "INFINITE";
          loadLevel();
          return;
      } else {
          state = "WIN";
          drawWinScreen();
          return;
      }
    }
    setMap(levels[currentLevelIdx]);
    addText(`Lvl ${currentLevelIdx + 1}`, {x: 1, y: 14, color: color`3`});
    state = "PLAYING";
  }
}

function drawMenu() {
  clearText();
  setMap(map`
wwwwwwwwww
..........
..........
..........
..........
..........
..........
wwwwwwwwww`);

  addText("LOCKSTEP CHASE", { y: 3, color: color`0` });
  addText("Story Mode   (I)", { y: 5, color: color`L` }); 
  addText("Level Select (J)", { y: 7, color: color`1` }); 
  addText("Infinite     (K)", { y: 9, color: color`F` }); 
  addText("How to Play  (L)", { y: 11, color: color`C` });
  addText("WASD TO MOVE", { y: 13, color: color`3` });
}

function drawGuide() {
  state = "GUIDE";
  clearText();
  setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`);
  
  addText("HOW TO PLAY", { y: 1, color: color`0` });
  
  addText("CONTROLS:", { y: 3, color: color`L` });
  addText("W-UP   S-DOWN", { y: 4, color: color`1` });
  addText(" A-LEFT D-RIGHT", { y: 5, color: color`1` });
  addText(" L-MENU I-RETRY", { y: 6, color: color`1` });

  addText("GOAL:", { y: 9, color: color`L` });
  addText("Reach the Treasure", { y: 10, color: color`1` });
  addText("The Echo is solid!", { y: 11, color: color`1` });
  addText("It blocks your path", { y: 12, color: color`1` });
  
  addText("PRESS I TO START", { y: 14, color: color`3` });
}

function drawWinScreen() {
  clearText();
  setMap(map`
wwwwwwwwww
..........
..........
..........
..........
..........
..........
wwwwwwwwww`);
  addText("ALL LEVELS CLEARED!", { y: 5, color: color`3` });
  addText("Press K for Menu", { y: 8, color: color`7` });
}

function playerTurn(dx, dy) {
  const p = getFirst(PLAYER);
  const c = getFirst(CHASER);
  if (!p || !c) return;

  const targetX = p.x + dx;
  const targetY = p.y + dy;
  
  if (!isWall(targetX, targetY) && !(targetX === c.x && targetY === c.y)) {
    p.x = targetX;
    p.y = targetY;
  }

  let dxC = 0;
  let dyC = 0;
  
  const diffX = p.x - c.x;
  const diffY = p.y - c.y;
  
  if (diffX !== 0) {
    dxC = Math.sign(diffX);
  } else if (diffY !== 0) {
    dyC = Math.sign(diffY);
  }
  
  const cTargetX = c.x + dxC;
  const cTargetY = c.y + dyC;
  
  if (!isWall(cTargetX, cTargetY) && !(cTargetX === p.x && cTargetY === p.y)) {
    c.x = cTargetX;
    c.y = cTargetY;
  } 
  
  const onGoal = tilesWith(PLAYER, GOAL);
  if (onGoal.length > 0) {
    if (gameMode === "INFINITE") infiniteScore++;
    else currentLevelIdx++;
    
    loadLevel(); 
  }
}

onInput("i", () => {
  if (state === "MENU" || state === "GUIDE") {
    gameMode = "STORY";
    currentLevelIdx = 0;
    loadLevel();
  } else if (state === "SELECTING") {
    state = "PLAYING";
    loadLevel();
  } else if (state === "PLAYING") {
    // Allows retry if stuck
    loadLevel(); 
  }
});

onInput("j", () => {
  if (state === "MENU") {
    gameMode = "LEVELS";
    state = "SELECTING";
    currentLevelIdx = 0;
    loadLevel();
  }
});

onInput("l", () => {
  if (state === "MENU") {
    drawGuide();
  } else {
    state = "MENU";
    drawMenu();
  }
});

onInput("k", () => {
  if (state === "MENU") {
    gameMode = "INFINITE";
    infiniteScore = 0;
    loadLevel();
  } else if (state === "WIN") {
    state = "MENU";
    drawMenu();
  }
});

const inputs = [
  ["w", 0, -1],
  ["s", 0, 1],
  ["a", -1, 0],
  ["d", 1, 0]
];

inputs.forEach(([key, dx, dy]) => {
  onInput(key, () => {
    if (state === "PLAYING") {
      playerTurn(dx, dy);
    } else if (state === "SELECTING") {
      if (key === "a") {
        currentLevelIdx = (currentLevelIdx - 1 + levels.length) % levels.length;
        loadLevel();
      } else if (key === "d") {
        currentLevelIdx = (currentLevelIdx + 1) % levels.length;
        loadLevel();
      }
    }
  });
});

drawMenu();
