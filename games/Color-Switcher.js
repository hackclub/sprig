/*
@title: Colour Switcher
@author: Unknown Gamer
@description: Color Switcher is a logic-based puzzle game where every move counts. You control a small player icon on a 5×5 grid made of red and blue tiles. Each time you step on a tile, it flips, and the four tiles around it also flip. Your goal is to change the entire board to a single color while using as few moves as possible.

The game features rising difficulty, smooth animations, sound effects, and a simple design that keeps each level fun and challenging.
@tags: []
@addedOn: 2025-11-13
*/

/* ---------- SPRITES ---------- */

const PLAYER_A = "p";
const PLAYER_B = "q";
const RED = "r";
const BLUE = "b";
const FLASH = "f";
const HUD_BG = "h";
const BORDER = "x";
const MARK_R = "m";
const MARK_B = "n";


setLegend(
  [PLAYER_A, bitmap`
................
................
......3333......
.....333333.....
.....333333.....
......3333......
.......33.......
.......33.......
......3333......
.....333333.....
.....333333.....
......3333......
................
................
................
................`],

 [PLAYER_B, bitmap`
................
................
......3333......
.....333333.....
....33333333....
....33333333....
.....333333.....
......3333......
......3333......
.....333333.....
....33333333....
....33333333....
................
................
................
................`],

  [RED, bitmap`
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
2222222222222222`],

  [BLUE, bitmap`
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
5555555555555555`],

  [FLASH, bitmap`
................
................
................
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
................
................
................
................`],

  [HUD_BG, bitmap`
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

  [BORDER, bitmap`
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
9999999999999999`],

  [MARK_R, bitmap`
................
................
................
................
........333.....
.......33333....
.......33333....
........333.....
................
................
................
................
................
................
................
................`],

  [MARK_B, bitmap`
................
................
................
................
........444.....
.......44444....
.......44444....
........444.....
................
................
................
................
................
................
................
................`]
);

/* ---------- LEVELS ---------- */

const levels = [
  ["rrrrr","rbbbr","rbpbr","rbbbr","rrrrr"],
  ["rbrbr","brbrb","rpbpr","brbrb","rbrbr"],
  ["bbbbb","brprb","brrrb","brprb","bbbbb"],
  ["rbrbrb","brbrbr","rbbpbr","brbrbr","rbrbbr","brbrbr"]
];

let totalLevels = levels.length;

/* ---------- SOUNDS ---------- */

const flipSound = tune`
50: C5-200 + B4-200
50: D5-200
100`;

const solvedSound = tune`
80: G5-200 + C6-200
80: D6-200
80: G6-200
240`;

const gameEndSound = tune`
80: E5-120 + G5-120
80: C6-120
120: G5-120`;

/* ---------- STATE ---------- */

let levelIndex = 0;
let moves = 0;
let solved = false;
let gameComplete = false;

let colorblindMode = false;
let idleInterval = null;

let inMenu = true;
let menuCursor = 0;

// Unlock system
let unlocked = [true, false, false, false];

/* ---------- MENU BACKGROUND (FIX FOR BLACK SCREEN) ---------- */

function loadMenuMap() {
  setMap(`
hhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhh
`);
}

/* ---------- CLEANUP ARRAYS ---------- */

let hudBgSprites = [];
let borderSprites = [];
let overlayMarkers = [];

function clearHUDSprites() {
  hudBgSprites.forEach(s => { try{s.remove()}catch{} });
  hudBgSprites = [];
}
function clearBorderSprites() {
  borderSprites.forEach(s => { try{s.remove()}catch{} });
  borderSprites = [];
}
function clearOverlayMarkers() {
  overlayMarkers.forEach(s => { try{s.remove()}catch{} });
  overlayMarkers = [];
}

/* ---------- HUD DRAW ---------- */

function drawHUD() {
  clearHUDSprites();
  const mapW = width();

  // 2-row HUD bar
  for (let bx = 0; bx < Math.min(8, mapW); bx++) {
    hudBgSprites.push(addSprite(bx, 0, HUD_BG));
    hudBgSprites.push(addSprite(bx, 1, HUD_BG));
  }

  addText(`Level ${levelIndex + 1}`, { x:0, y:0, color:color`6` });
  addText(`Moves ${moves}`, { x:0, y:1, color:color`4` });
}

/* ---------- BORDER ---------- */

function drawBorder() {
  clearBorderSprites();
  const w = width(), h = height();

  for (let x = -1; x <= w; x++) {
    borderSprites.push(addSprite(x, -1, BORDER));
    borderSprites.push(addSprite(x, h, BORDER));
  }
  for (let y = 0; y < h; y++) {
    borderSprites.push(addSprite(-1, y, BORDER));
    borderSprites.push(addSprite(w, y, BORDER));
  }
}

/* ---------- COLORBLIND OVERLAYS ---------- */

function refreshOverlayMarkers() {
  clearOverlayMarkers();
  if (!colorblindMode) return;

  for (let y=0; y<height(); y++) {
    for (let x=0; x<width(); x++) {
      const t = getTile(x,y).find(o => o.type===RED || o.type===BLUE);
      if (!t) continue;
      overlayMarkers.push(addSprite(x,y, t.type===RED?MARK_R:MARK_B));
    }
  }
}

/* ---------- LOAD LEVEL ---------- */

function loadLevel(i) {
  inMenu = false;
  clearText();
  clearHUDSprites();
  clearBorderSprites();
  clearOverlayMarkers();

  solved = false;
  gameComplete = false;
  moves = 0;

  setMap(levels[i].join("\n"));

  // Force PLAYER_A start
  for(let y=0;y<height();y++){
    for(let x=0;x<width();x++){
      getTile(x,y).forEach(s=>{
        if(s.type===PLAYER_B) s.remove();
      });
    }
  }

  drawHUD();
  drawBorder();
  refreshOverlayMarkers();
}

/* ---------- ANIMATION ---------- */

function flipAnimation(x,y) {
  const s = addSprite(x,y,FLASH);
  setTimeout(()=>{ try{s.remove()}catch{} }, 90);
}

function clearSpecificTile(x,y,t) {
  getTile(x,y).forEach(s => { if(s.type===t) s.remove(); });
}

function toggleTile(x,y){
  if(x<0||x>=width()||y<0||y>=height()) return;

  const t = getTile(x,y).find(o=>o.type===RED || o.type===BLUE);
  if(!t) return;

  clearSpecificTile(x,y,t.type);
  addSprite(x,y, t.type===RED ? BLUE : RED);

  playTune(flipSound);
  flipAnimation(x,y);

  if(colorblindMode) refreshOverlayMarkers();
}

function toggleAround(x,y){
  toggleTile(x,y);
  toggleTile(x+1,y);
  toggleTile(x-1,y);
  toggleTile(x,y+1);
  toggleTile(x,y-1);
}

/* ---------- SOLVE CHECK ---------- */

function isSolved(){
  let first = null;
  for(let y=0;y<height();y++){
    for(let x=0;x<width();x++){
      const t = getTile(x,y).find(o=>o.type===RED||o.type===BLUE);
      if(!t) continue;
      if(first===null) first=t.type;
      if(t.type!==first) return false;
    }
  }
  return true;
}

/* ---------- IDLE ---------- */

function startIdleAnimation(){
  stopIdleAnimation();
  idleInterval = setInterval(()=>{
    if(solved||inMenu) return;
    const p = getFirst(PLAYER_A) || getFirst(PLAYER_B);
    if(!p) return;
    const {x,y} = p;
    const current = getTile(x,y).find(s=>s.type===PLAYER_A||s.type===PLAYER_B);
    if(!current) return;
    const next = current.type===PLAYER_A ? PLAYER_B : PLAYER_A;
    current.remove();
    addSprite(x,y,next);
  },600);
}
function stopIdleAnimation(){
  if(idleInterval){
    clearInterval(idleInterval);
    idleInterval=null;
  }
}

/* ---------- MOVEMENT ---------- */

function safeMove(dx,dy){
  if(solved||inMenu) return;

  const p = getFirst(PLAYER_A) || getFirst(PLAYER_B);
  if(!p) return;

  const nx = p.x+dx, ny=p.y+dy;
  if(nx<0||nx>=width()||ny<0||ny>=height()) return;

  getTile(p.x,p.y).forEach(s=>{
    if(s.type===PLAYER_A || s.type===PLAYER_B) s.remove();
  });
  addSprite(nx,ny,PLAYER_A);

  toggleAround(nx,ny);

  moves++;
  clearText();
  drawHUD();

  if(isSolved()){
    solved=true;
    playTune(solvedSound);

    unlocked[levelIndex+1] = true;  // unlock next level

    if(levelIndex===totalLevels-1){
      gameComplete=true;
      playTune(gameEndSound);
      addText("GAME COMPLETE!",{x:0,y:3,color:color`2`});
      addText("Press K to menu",{x:0,y:4,color:color`9`});
    } else {
      addText("LEVEL SOLVED!",{x:0,y:3,color:color`2`});
      addText("Next...",{x:0,y:4,color:color`9`});
      setTimeout(()=>{
        levelIndex++;
        loadLevel(levelIndex);
      },700);
    }
  }
}

/* ---------- MENU ---------- */

function showMenu(){
  inMenu = true;
  stopIdleAnimation();

  loadMenuMap();

  clearText();
  clearHUDSprites();
  clearBorderSprites();
  clearOverlayMarkers();

  const boxW = 26;

  addText("#".repeat(boxW),{x:0,y:0,color:color`3`});
  addText("#      SELECT LEVEL      #",{x:0,y:1,color:color`3`});
  addText("#".repeat(boxW),{x:0,y:2,color:color`3`});

  for(let i=0;i<totalLevels;i++){
    const pointer = menuCursor===i ? ">" : " ";
    const lock = unlocked[i] ? "" : " (LOCKED)";
    addText(`${pointer} Level ${i+1}${lock}`,{
      x:1,
      y:4+i,
      color: unlocked[i] ? color`6` : color`2`
    });
  }

  addText("-".repeat(boxW),{x:0,y:5+totalLevels,color:color`3`});
  addText(" Press J to play",{x:1,y:6+totalLevels,color:color`5`});
  addText(" Press K to return",{x:1,y:7+totalLevels,color:color`5`});
}

/* ---------- INPUT ---------- */

// Movement
onInput("w",()=>{ if(inMenu){ menuCursor=Math.max(0,menuCursor-1); showMenu(); } else safeMove(0,-1); });
onInput("s",()=>{ if(inMenu){ menuCursor=Math.min(totalLevels-1,menuCursor+1); showMenu(); } else safeMove(0,1); });
onInput("a",()=>safeMove(-1,0));
onInput("d",()=>safeMove(1,0));

// Play level
onInput("j",()=>{
  if(!inMenu) return;
  if(!unlocked[menuCursor]) return; 
  levelIndex = menuCursor;
  loadLevel(levelIndex);
  startIdleAnimation();
});

// Back to menu / restart
onInput("k",()=>{
  showMenu();
});

// Toggle colorblind
onInput("i",()=>{
  colorblindMode=!colorblindMode;
  refreshOverlayMarkers();
});




/* ---------- START ---------- */

showMenu();
startIdleAnimation();
