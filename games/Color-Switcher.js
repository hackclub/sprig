/*
@title: Colour Switcher
@author: Unknown Gamer
@description: Color Switcher is a logic-based puzzle game where every move counts. You control a small player icon on a 5×5 grid made of red and blue tiles. Each time you step on a tile, it flips, and the four tiles around it also flip. Your goal is to change the entire board to a single color while using as few moves as possible. The game features rising difficulty, smooth animations, sound effects, and a simple design that keeps each level fun and challenging.
@tags: ['puzzle', 'endless', 'strategy']
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

const flipSound = tune`50: C5-200 + B4-200 50: D5-200 100`;
const solvedSound = tune`80: G5-200 + C6-200 80: D6-200 80: G6-200 240`;
const gameEndSound = tune`80: E5-120 + G5-120 80: C6-120 120: G5-120`;

/* ---------- STATE ---------- */

let levelIndex = 0;
let moves = 0;
let solved = false;
let gameComplete = false;

let colorblindMode = false;
let idleInterval = null;

let inMenu = true;
let menuCursor = 0;

let unlocked = [true, false, false, false];

/* ---------- MENU MAP ---------- */
function loadMenuMap() {
  setMap(`
hhhhhhhh
hhhhhhhh
hhhhhhhh
hhhhhhhh
hhhhhhhh
hhhhhhhh
hhhhhhhh
hhhhhhhh
`);
}

/* ---------- CLEANUP ARRAYS ---------- */

let hudBgSprites = [];
let borderSprites = [];
let overlayMarkers = [];

const clearArr = arr => arr.forEach(s => { try{s.remove()}catch{} });

/* ---------- HUD DRAW ---------- */

function drawHUD() {
  clearArr(hudBgSprites);
  hudBgSprites = [];

  for (let x=0; x<width(); x++) {
    hudBgSprites.push(addSprite(x,0,HUD_BG));
    hudBgSprites.push(addSprite(x,1,HUD_BG));
  }

  addText(`Level ${levelIndex+1}`, {x:0,y:0,color:color`6`});
  addText(`Moves ${moves}`, {x:0,y:1,color:color`4`});
}

/* ---------- BORDER (SAFE) ---------- */
function drawBorder() {
  clearArr(borderSprites);
  borderSprites = [];

  const w = width(), h = height();

  for (let x=0; x<w; x++) {
    borderSprites.push(addSprite(x, 2, BORDER));
    borderSprites.push(addSprite(x, h-1, BORDER));
  }
  for (let y=2; y<h; y++) {
    borderSprites.push(addSprite(0, y, BORDER));
    borderSprites.push(addSprite(w-1, y, BORDER));
  }
}

/* ---------- COLORBLIND ---------- */

function refreshOverlayMarkers() {
  clearArr(overlayMarkers);
  overlayMarkers = [];

  if (!colorblindMode) return;

  for (let y=0; y<height(); y++) {
    for (let x=0; x<width(); x++) {
      const t = getTile(x,y).find(o => o.type===RED || o.type===BLUE);
      if (!t) continue;
      overlayMarkers.push(addSprite(x,y, t.type===RED ? MARK_R : MARK_B));
    }
  }
}

/* ---------- LOAD LEVEL ---------- */

function loadLevel(i) {
  inMenu = false;
  solved = false;
  gameComplete = false;
  moves = 0;

  clearText();
  clearArr(hudBgSprites);
  clearArr(borderSprites);
  clearArr(overlayMarkers);

  hudBgSprites=[];
  borderSprites=[];
  overlayMarkers=[];

  setMap(levels[i].join("\n"));

  // remove PLAYER_B if spawned
  for (let y=0;y<height();y++){
    for (let x=0;x<width();x++){
      getTile(x,y).forEach(s=>{
        if (s.type===PLAYER_B) s.remove();
      });
    }
  }

  drawHUD();
  drawBorder();
  refreshOverlayMarkers();
}

/* ---------- TILE FLIP ---------- */

function flipAnimation(x,y) {
  const s = addSprite(x,y,FLASH);
  setTimeout(()=>{ try{s.remove()}catch{} }, 90);
}

function toggleTile(x,y){
  if (x<0 || y<0 || x>=width() || y>=height()) return;

  const t = getTile(x,y).find(o=>o.type===RED||o.type===BLUE);
  if(!t) return;

  t.remove();
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
  let first=null;

  for (let y=0;y<height();y++){
    for (let x=0;x<width();x++){
      const t = getTile(x,y).find(o=>o.type===RED||o.type===BLUE);
      if(!t) continue;
      if(first===null) first=t.type;
      if(t.type!==first) return false;
    }
  }
  return true;
}

/* ---------- MOVEMENT ---------- */

function safeMove(dx,dy){
  if(inMenu || solved) return;

  const p = getFirst(PLAYER_A) || getFirst(PLAYER_B);
  if(!p) return;

  const nx=p.x+dx, ny=p.y+dy;
  if(nx<0||ny<0||nx>=width()||ny>=height()) return;

  getTile(p.x,p.y).forEach(s=>{
    if(s.type===PLAYER_A||s.type===PLAYER_B) s.remove();
  });
  addSprite(nx,ny,PLAYER_A);

  toggleAround(nx,ny);
  moves++;

  clearText();
  drawHUD();

  if(isSolved()){
    solved=true;
    playTune(solvedSound);

    unlocked[levelIndex+1] = true;

    if(levelIndex===totalLevels-1){
      gameComplete=true;
      playTune(gameEndSound);
      addText("GAME COMPLETE!",{x:0,y:3,color:color`2`});
      addText("Press K to menu",{x:0,y:4,color:color`9`});
    } else {
      addText("LEVEL SOLVED!",{x:0,y:3,color:color`2`});
      setTimeout(()=>{ levelIndex++; loadLevel(levelIndex); },700);
    }
  }
}

/* ---------- MENU ---------- */

function showMenu(){
  inMenu=true;

  clearText();
  clearArr(hudBgSprites);
  clearArr(borderSprites);
  clearArr(overlayMarkers);

  loadMenuMap();

  addText("SELECT LEVEL",{x:0,y:0,color:color`3`});

  for(let i=0;i<totalLevels;i++){
    const pointer = menuCursor===i ? ">" : " ";
    const lock = unlocked[i] ? "" : " (LOCKED)";
    addText(`${pointer} Level ${i+1}${lock}`,{
      x:1,
      y:2+i,
      color: unlocked[i] ? color`6` : color`2`
    });
  }

  addText("J = Play",{x:1,y:2+totalLevels,color:color`5`});
  addText("K = Menu",{x:1,y:3+totalLevels,color:color`5`});
}

/* ---------- INPUT ---------- */

onInput("w",()=>{ if(inMenu){ menuCursor=Math.max(0,menuCursor-1); showMenu(); } else safeMove(0,-1); });
onInput("s",()=>{ if(inMenu){ menuCursor=Math.min(totalLevels-1,menuCursor+1); showMenu(); } else safeMove(0,1); });
onInput("a",()=>safeMove(-1,0));
onInput("d",()=>safeMove(1,0));

onInput("j",()=>{
  if(!inMenu || !unlocked[menuCursor]) return;
  levelIndex = menuCursor;
  loadLevel(levelIndex);
});

onInput("k",()=> showMenu() );

onInput("i",()=>{
  colorblindMode=!colorblindMode;
  refreshOverlayMarkers();
});

/* ---------- START ---------- */

showMenu();
