// ============================================
// SPRIG OS v5.0
// 5 games: Snake, Pong, Tetris, Breakout, Asteroids
// MENU: w/s/a/d=move  i=launch  j=back
// IN GAME: j=back to menu
// ============================================

const EMPTY_MAP = map`
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

// ---- MENU SPRITES ----
const SPR_SEL = bitmap`
LLLLLLLL
L......L
L......L
L......L
L......L
L......L
L......L
LLLLLLLL`;

const SPR_BOX = bitmap`
11111111
1......1
1......1
1......1
1......1
1......1
1......1
11111111`;

// Game icons - use only valid colors 0-9 L
const ICO_SNAKE = bitmap`
........
.77777..
.7...7..
.77777..
....77..
....7...
........
........`;

const ICO_PONG = bitmap`
L......L
L......L
L..44..L
L..44..L
L......L
L......L
........
........`;

const ICO_TETRIS = bitmap`
........
.99.....
.999....
..9.....
........
........
........
........`;

const ICO_BREAK = bitmap`
........
44444444
44444444
........
...44...
...44...
........
........`;

const ICO_ASTR = bitmap`
........
...3....
..333...
.3.3.3..
..333...
...3....
........
........`;

// ---- SNAKE SPRITES ----
const SPR_SH = bitmap`
77777777
7......7
7.0..0.7
7......7
7..77..7
7......7
77777777
........`;

const SPR_SB = bitmap`
........
.777777.
.7....7.
.7....7.
.777777.
........
........
........`;

const SPR_SF = bitmap`
........
..4444..
.4....4.
.4....4.
..4444..
........
........
........`;

const SPR_SWALL = bitmap`
55555555
52525252
55555555
25252525
55555555
52525252
55555555
25252525`;

// ---- PONG SPRITES ----
const SPR_PBALL = bitmap`
........
........
..LLLL..
..LLLL..
..LLLL..
..LLLL..
........
........`;

const SPR_PPAD = bitmap`
.LL.....
.LL.....
.LL.....
.LL.....
.LL.....
.LL.....
........
........`;

// ---- TETRIS SPRITES ----
const SPR_T1 = bitmap`
99999999
9......9
9......9
9......9
9......9
9......9
9......9
99999999`;

const SPR_T2 = bitmap`
44444444
4......4
4......4
4......4
4......4
4......4
4......4
44444444`;

const SPR_T3 = bitmap`
33333333
3......3
3......3
3......3
3......3
3......3
3......3
33333333`;

const SPR_T4 = bitmap`
66666666
6......6
6......6
6......6
6......6
6......6
6......6
66666666`;

const SPR_T5 = bitmap`
77777777
7......7
7......7
7......7
7......7
7......7
7......7
77777777`;

const SPR_T6 = bitmap`
LLLLLLLL
L......L
L......L
L......L
L......L
L......L
L......L
LLLLLLLL`;

const SPR_T7 = bitmap`
44444444
4......4
4......4
4......4
4......4
4......4
4......4
44444444`;

const SPR_TWALL = bitmap`
33333333
3......3
3......3
3......3
3......3
3......3
3......3
33333333`;

// ---- BREAKOUT SPRITES ----
const SPR_BRICK1 = bitmap`
44444444
4......4
4......4
44444444
........
........
........
........`;

const SPR_BRICK2 = bitmap`
99999999
9......9
9......9
99999999
........
........
........
........`;

const SPR_BRICK3 = bitmap`
33333333
3......3
3......3
33333333
........
........
........
........`;

const SPR_BBALL = bitmap`
........
........
..LLLL..
..LLLL..
..LLLL..
........
........
........`;

const SPR_BPAD = bitmap`
LLLLLLLL
LLLLLLLL
........
........
........
........
........
........`;

// ---- ASTEROIDS SPRITES ----
const SPR_SHIP = bitmap`
...33...
...33...
..3333..
.333333.
33....33
........
........
........`;

const SPR_ABULLET = bitmap`
...LL...
...LL...
........
........
........
........
........
........`;

const SPR_AROCK1 = bitmap`
..333...
.33333..
333333..
.33333..
..333...
........
........
........`;

const SPR_AROCK2 = bitmap`
.33.....
3333....
.33.....
........
........
........
........
........`;

// ---- LOADING BAR ----
const SPR_BARFULL = bitmap`
........
........
66666666
66666666
66666666
66666666
........
........`;

const SPR_BAREMPTY = bitmap`
........
........
22222222
22222222
22222222
22222222
........
........`;

// ============================================
// GAME REGISTRY
// Use letter keys for icons to avoid number confusion
// ============================================
const GAMES = [
  { title: "SNAKE",    icon: ICO_SNAKE,  fn: "snake",    col: "7", key: "a" },
  { title: "PONG",     icon: ICO_PONG,   fn: "pong",     col: "L", key: "b" },
  { title: "TETRIS",   icon: ICO_TETRIS, fn: "tetris",   col: "9", key: "c" },
  { title: "BREAKOUT", icon: ICO_BREAK,  fn: "breakout", col: "4", key: "d" },
  { title: "ASTEROIDS",icon: ICO_ASTR,   fn: "asteroids",col: "3", key: "e" },
];

// ---- STATE ----
let sel = 0;
let inMenu = true;
let gameLoop = null;
let gameLoop2 = null;
let music = null;
const COLS = 3;
const ROWS = 2;

// ============================================
// MUSIC & SFX
// ============================================
const MENU_MUSIC = tune`
150,
sine~C5-100,sine~E5-100,sine~G5-100,sine~C6-200,
sine~G5-100,sine~E5-100,sine~C5-200,
triangle~E4-100,triangle~G4-100,triangle~B4-200,
square~C3-200,square~G3-200,
sawtooth~C4-100,sawtooth~E4-100,sawtooth~G4-200`;

const SNAKE_MUSIC = tune`
200,
square~C4-100,square~E4-100,square~G4-100,square~C5-100,
square~G4-100,square~E4-100,square~C4-200,
square~F4-100,square~A4-100,square~C5-200`;

const PONG_MUSIC = tune`
180,
triangle~C3-200,triangle~G3-200,triangle~C3-200,triangle~G3-200,
triangle~F3-200,triangle~C3-200,triangle~G3-400`;

const TETRIS_MUSIC = tune`
160,
sine~E5-100,sine~B4-50,sine~C5-50,sine~D5-100,sine~C5-50,sine~B4-50,
sine~A4-100,sine~A4-50,sine~C5-50,sine~E5-100,sine~D5-50,sine~C5-50,
sine~B4-150,sine~C5-50,sine~D5-100,sine~E5-100,
sine~C5-100,sine~A4-100,sine~A4-200`;

const BREAK_MUSIC = tune`
170,
sawtooth~C4-80,sawtooth~E4-80,sawtooth~G4-80,sawtooth~C5-160,
sawtooth~G4-80,sawtooth~E4-80,sawtooth~C4-160,
sawtooth~F4-80,sawtooth~A4-80,sawtooth~C5-160`;

const ASTR_MUSIC = tune`
140,
sine~C3-100,sine~G3-100,sine~C4-200,
sine~F3-100,sine~C4-100,sine~F4-200,
sine~G3-100,sine~D4-100,sine~G4-200`;

const SFX_BOOT   = tune`130,sine~C4-80,sine~E4-80,sine~G4-80,sine~C5-160,sine~G5-80,sine~C6-200`;
const SFX_SELECT = tune`200,sine~C5-40,sine~E5-40,sine~G5-40,sine~C6-80`;
const SFX_BACK   = tune`200,sine~C6-40,sine~G5-40,sine~C5-80`;
const SFX_MOVE   = tune`400,triangle~G5-20`;
const SFX_COUNT  = tune`200,sine~C4-80`;
const SFX_GO     = tune`150,sine~C5-60,sine~E5-60,sine~G5-60,sine~C6-120`;
const SFX_EAT    = tune`250,sine~E5-40,sine~G5-40`;
const SFX_DIE    = tune`120,square~C3-80,square~B2-80,square~A2-80,square~G2-160`;
const SFX_HIT    = tune`300,triangle~C4-30`;
const SFX_SCORE  = tune`150,sine~C5-50,sine~E5-50,sine~G5-50,sine~C6-100`;
const SFX_CLEAR  = tune`200,sine~C5-50,sine~E5-50,sine~G5-50,sine~C6-200`;
const SFX_BUMP   = tune`300,square~C3-20`;
const SFX_SHOOT  = tune`400,square~G5-20`;
const SFX_EXPLODE= tune`100,square~C3-50,square~G2-50,square~E2-100`;
const SFX_WIN    = tune`140,sine~C5-80,sine~E5-80,sine~G5-80,sine~C6-300`;

function stopMusic() { if (music) { music.end(); music = null; } }
function rm(keys) { keys.forEach(k => { try { getAll(k).forEach(s => s.remove()); } catch(e) {} }); }

// ============================================
// BOOT
// ============================================
let bootStep = 0;
const BOOT_STEPS = 8;

function boot() {
  playTune(SFX_BOOT, 1);
  bootStep = 0;
  setLegend(["F", SPR_BARFULL], ["Z", SPR_BAREMPTY]);
  setMap(EMPTY_MAP);
  drawBoot(0);
  const t = setInterval(() => {
    bootStep++;
    drawBoot(bootStep);
    if (bootStep >= BOOT_STEPS) {
      clearInterval(t);
      setTimeout(() => { setupMenu(); drawMenu(); music = playTune(MENU_MUSIC, Infinity); }, 300);
    }
  }, 200);
}

function drawBoot(step) {
  clearText();
  addText("SPRIG OS", { x: 4, y: 2, color: color`L` });
  addText("v5.0", { x: 6, y: 3, color: color`9` });
  addText("by Hack Club", { x: 2, y: 4, color: color`2` });
  rm(["F","Z"]);
  const filled = Math.floor((step / BOOT_STEPS) * 14);
  for (let x = 0; x < 14; x++) addSprite(x + 1, 10, x < filled ? "F" : "Z");
  const msgs = ["Booting","Loading games","Init sound","Init display","Start menu","Almost ready","Finalizing","Done"];
  addText(msgs[Math.min(step, msgs.length - 1)], { x: 1, y: 12, color: color`1` });
}

// ============================================
// MENU
// ============================================
function setupMenu() {
  const leg = [["B", SPR_BOX], ["S", SPR_SEL]];
  GAMES.forEach(g => leg.push([g.key, g.icon]));
  setLegend(...leg);
  setMap(EMPTY_MAP);
}

function drawMenu() {
  clearText();
  rm(["B","S",...GAMES.map(g=>g.key)]);

  addText("* SPRIG OS *", { x: 2, y: 0, color: color`L` });
  addText("i=PLAY", { x: 5, y: 1, color: color`2` });

  // 3 cols x 2 rows, cards at fixed positions
  const positions = [
    [1,2],[6,2],[11,2],
    [1,8],[6,8]
  ];

  GAMES.forEach((g, i) => {
    if (i >= positions.length) return;
    const [x, y] = positions[i];
    const isSelected = i === sel;

    // Draw card border - selected gets bright color, unselected gets gray
    addSprite(x, y, isSelected ? "S" : "B");
    addSprite(x + 1, y + 1, g.key);

    // Title with game's own color when selected, gray when not
    const ty = y + 3;
    if (ty < 14) {
      addText(
        g.title.substring(0, 7),
        { x, y: ty, color: isSelected ? color`${g.col}` : color`1` }
      );
    }

    // Arrow indicator on selected card
    if (isSelected) {
      addText(">", { x: x + 3, y: y + 1, color: color`${g.col}` });
    }
  });
}

function launch(idx) {
  if (idx >= GAMES.length) return;
  inMenu = false;
  stopMusic();
  playTune(SFX_SELECT, 1);
  clearText();
  rm(["B","S",...GAMES.map(g=>g.key)]);
  addText("LOADING", { x: 4, y: 5, color: color`6` });
  addText(GAMES[idx].title, { x: Math.floor((16-GAMES[idx].title.length)/2), y: 7, color: color`L` });
  setMap(EMPTY_MAP);
  setTimeout(() => {
    clearText();
    const fn = GAMES[idx].fn;
    if      (fn === "snake")     startSnake();
    else if (fn === "pong")      startPong();
    else if (fn === "tetris")    startTetris();
    else if (fn === "breakout")  startBreakout();
    else if (fn === "asteroids") startAsteroids();
  }, 500);
}

function showSoon(title) {
  clearText();
  addText(title, { x: Math.floor((16-title.length)/2), y: 4, color: color`6` });
  addText("COMING SOON", { x: 2, y: 6, color: color`L` });
  addText("j = back", { x: 4, y: 10, color: color`2` });
}

function goMenu() {
  if (gameLoop)  { clearInterval(gameLoop);  gameLoop  = null; }
  if (gameLoop2) { clearInterval(gameLoop2); gameLoop2 = null; }
  inMenu = true;
  stopMusic();
  playTune(SFX_BACK, 1);
  setTimeout(() => { setupMenu(); drawMenu(); music = playTune(MENU_MUSIC, Infinity); }, 300);
}

// ---- MENU INPUTS ----
onInput("w", () => { if (!inMenu) return; if (sel >= COLS) { sel -= COLS; playTune(SFX_MOVE,1); drawMenu(); } });
onInput("s", () => { if (!inMenu) return; if (sel+COLS < GAMES.length) { sel+=COLS; playTune(SFX_MOVE,1); drawMenu(); } });
onInput("a", () => { if (!inMenu) return; if (sel%COLS>0) { sel--; playTune(SFX_MOVE,1); drawMenu(); } });
onInput("d", () => { if (!inMenu) return; if (sel%COLS<COLS-1&&sel+1<GAMES.length) { sel++; playTune(SFX_MOVE,1); drawMenu(); } });
onInput("i", () => { if (inMenu) launch(sel); });
onInput("j", () => { if (!inMenu) goMenu(); });
onInput("k", () => { if (!inMenu) return; if (sel+COLS<GAMES.length) { sel+=COLS; playTune(SFX_MOVE,1); drawMenu(); } });
onInput("l", () => { if (!inMenu) return; if (sel%COLS<COLS-1&&sel+1<GAMES.length) { sel++; playTune(SFX_MOVE,1); drawMenu(); } });

// ============================================
// SNAKE
// ============================================
let snakeBody=[], snakeDir={x:1,y:0}, snakeNext={x:1,y:0};
let snakeFood={x:8,y:6}, snakeScore=0, snakeDead=false;

function startSnake() {
  snakeBody=[{x:8,y:7},{x:7,y:7},{x:6,y:7}];
  snakeDir={x:1,y:0}; snakeNext={x:1,y:0};
  snakeScore=0; snakeDead=false;
  setLegend(["h",SPR_SH],["x",SPR_SB],["f",SPR_SF],["W",SPR_SWALL]);
  setMap(EMPTY_MAP);
  // Border walls
  for(let cx=0;cx<16;cx++){addSprite(cx,0,"W");addSprite(cx,13,"W");}
  for(let cy=1;cy<13;cy++){addSprite(0,cy,"W");addSprite(15,cy,"W");}
  spawnSnakeFood();
  renderSnake();
  music = playTune(SNAKE_MUSIC, Infinity);
  gameLoop = setInterval(tickSnake, 200);
  onInput("w",()=>{if(!inMenu&&snakeDir.y!==1)  snakeNext={x:0,y:-1};});
  onInput("s",()=>{if(!inMenu&&snakeDir.y!==-1) snakeNext={x:0,y:1};});
  onInput("a",()=>{if(!inMenu&&snakeDir.x!==1)  snakeNext={x:-1,y:0};});
  onInput("d",()=>{if(!inMenu&&snakeDir.x!==-1) snakeNext={x:1,y:0};});
  onInput("i",()=>{if(!inMenu&&snakeDir.y!==1)  snakeNext={x:0,y:-1};});
  onInput("k",()=>{if(!inMenu&&snakeDir.y!==-1) snakeNext={x:0,y:1};});
}

function spawnSnakeFood() {
  do { snakeFood={x:1+Math.floor(Math.random()*14),y:1+Math.floor(Math.random()*11)}; }
  while(snakeBody.some(s=>s.x===snakeFood.x&&s.y===snakeFood.y));
}

function snakeDie() {
  snakeDead=true;
  clearInterval(gameLoop); gameLoop=null;
  stopMusic();
  playTune(SFX_DIE,1);
  clearText();
  addText("GAME OVER",{x:3,y:5,color:color`4`});
  addText("SCORE "+snakeScore,{x:3,y:7,color:color`7`});
  addText("j = MENU",{x:4,y:9,color:color`2`});
}

function tickSnake() {
  if(inMenu||snakeDead) return;
  snakeDir={...snakeNext};
  const h=snakeBody[0];
  const nh={x:h.x+snakeDir.x, y:h.y+snakeDir.y};
  if(nh.x<=0||nh.x>=15||nh.y<=0||nh.y>=13){snakeDie();return;}
  if(snakeBody.some(s=>s.x===nh.x&&s.y===nh.y)){snakeDie();return;}
  snakeBody.unshift(nh);
  if(nh.x===snakeFood.x&&nh.y===snakeFood.y){
    snakeScore++;
    spawnSnakeFood();
    playTune(SFX_EAT,1);
  } else snakeBody.pop();
  renderSnake();
}

function renderSnake() {
  clearText();
  addText("SNAKE "+snakeScore,{x:2,y:0,color:color`7`});
  addText("j=MENU",{x:10,y:0,color:color`2`});
  rm(["h","x","f"]);
  snakeBody.forEach((s,i)=>addSprite(s.x,s.y,i===0?"h":"x"));
  addSprite(snakeFood.x,snakeFood.y,"f");
}

// ============================================
// PONG
// ============================================
let pBallX=8,pBallY=7,pDX=1,pDY=1;
let pPlayerY=5,pAiY=5,pScore=0,pAiScore=0,pRunning=false;

function startPong() {
  pBallX=8;pBallY=7;pDX=1;pDY=1;
  pPlayerY=5;pAiY=5;pScore=0;pAiScore=0;pRunning=false;
  setLegend(["p",SPR_PBALL],["q",SPR_PPAD]);
  setMap(EMPTY_MAP);
  renderPong();
  pCountdown(()=>{ pRunning=true; music=playTune(PONG_MUSIC,Infinity); gameLoop=setInterval(tickPong,100); });
  onInput("w",()=>{if(!inMenu&&pPlayerY>1) pPlayerY--;});
  onInput("s",()=>{if(!inMenu&&pPlayerY<10) pPlayerY++;});
  onInput("i",()=>{if(!inMenu&&pPlayerY>1) pPlayerY--;});
  onInput("k",()=>{if(!inMenu&&pPlayerY<10) pPlayerY++;});
}

function pCountdown(cb) {
  clearText();
  addText("PONG",{x:6,y:3,color:color`L`});
  addText("j=MENU",{x:5,y:13,color:color`2`});
  let c=3;
  addText("3",{x:7,y:6,color:color`4`});
  playTune(SFX_COUNT,1);
  const t=setInterval(()=>{
    c--;
    clearText();
    addText("PONG",{x:6,y:3,color:color`L`});
    addText("j=MENU",{x:5,y:13,color:color`2`});
    if(c>0){addText(String(c),{x:7,y:6,color:color`4`});playTune(SFX_COUNT,1);}
    else{addText("GO",{x:6,y:6,color:color`7`});playTune(SFX_GO,1);clearInterval(t);setTimeout(cb,400);}
  },800);
}

function tickPong() {
  if(inMenu||!pRunning) return;
  pBallX+=pDX; pBallY+=pDY;
  if(pBallY<=1){pBallY=1;pDY=1;playTune(SFX_HIT,1);}
  if(pBallY>=12){pBallY=12;pDY=-1;playTune(SFX_HIT,1);}
  if(pAiY+1<pBallY&&pAiY<10) pAiY++;
  else if(pAiY+1>pBallY&&pAiY>1) pAiY--;
  if(pBallX<=1&&pBallY>=pPlayerY&&pBallY<=pPlayerY+2){pDX=1;playTune(SFX_HIT,1);}
  if(pBallX>=14&&pBallY>=pAiY&&pBallY<=pAiY+2){pDX=-1;playTune(SFX_HIT,1);}
  if(pBallX<1){pAiScore++;pRunning=false;playTune(SFX_DIE,1);pBallX=8;pBallY=7;pDX=1;setTimeout(()=>{pRunning=true;},1000);}
  if(pBallX>14){pScore++;pRunning=false;playTune(SFX_SCORE,1);pBallX=8;pBallY=7;pDX=-1;setTimeout(()=>{pRunning=true;},1000);}
  renderPong();
}

function renderPong() {
  clearText();
  addText("YOU "+pScore,{x:0,y:0,color:color`L`});
  addText("AI "+pAiScore,{x:11,y:0,color:color`4`});
  addText("j=MENU",{x:5,y:13,color:color`2`});
  rm(["p","q"]);
  const bx=Math.round(pBallX),by=Math.round(pBallY);
  if(by>=1&&by<=12) addSprite(bx,by,"p");
  for(let py=0;py<3;py++){
    if(pPlayerY+py>=1&&pPlayerY+py<=12) addSprite(1,pPlayerY+py,"q");
    if(pAiY+py>=1&&pAiY+py<=12) addSprite(14,pAiY+py,"q");
  }
}

// ============================================
// TETRIS - full screen 16x14, walls on sides
// Board: cols 0-15, playfield cols 2-13 (12 wide), rows 1-13
// ============================================
const TW=12, TH=12, TX=2, TY=1;
let tBoard=[], tPiece=null, tPX=0, tPY=0, tScore=0, tOver=false, tLines=0;

const TPIECES=[
  {cells:[[0,0],[1,0],[2,0],[3,0]],spr:"1"}, // I
  {cells:[[0,0],[0,1],[1,1],[2,1]],spr:"2"}, // J
  {cells:[[2,0],[0,1],[1,1],[2,1]],spr:"3"}, // L
  {cells:[[0,0],[1,0],[1,1],[2,1]],spr:"4"}, // S
  {cells:[[1,0],[2,0],[0,1],[1,1]],spr:"5"}, // Z
  {cells:[[0,0],[1,0],[0,1],[1,1]],spr:"6"}, // O
  {cells:[[1,0],[0,1],[1,1],[2,1]],spr:"7"}, // T
];

// Tetris static map with side walls
const TETRIS_MAP = map`
WWWWWWWWWWWWWWWW
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
WWWWWWWWWWWWWWWW`;

function startTetris() {
  tBoard=[];
  for(let r=0;r<TH;r++) tBoard.push(Array(TW).fill(null));
  tScore=0; tLines=0; tOver=false;
  setLegend(
    ["W",SPR_TWALL],
    ["1",SPR_T1],["2",SPR_T2],["3",SPR_T3],["4",SPR_T4],
    ["5",SPR_T5],["6",SPR_T6],["7",SPR_T7]
  );
  setMap(TETRIS_MAP);
  spawnTetris();
  renderTetris();
  music=playTune(TETRIS_MUSIC,Infinity);
  gameLoop=setInterval(tickTetris,500);
  onInput("a",()=>{if(!inMenu) tMove(-1,0);});
  onInput("d",()=>{if(!inMenu) tMove(1,0);});
  onInput("s",()=>{if(!inMenu) tMove(0,1);});
  onInput("w",()=>{if(!inMenu) tRotate();});
  onInput("i",()=>{if(!inMenu) tRotate();});
  onInput("k",()=>{if(!inMenu) tDrop();});
}

function spawnTetris() {
  const p=TPIECES[Math.floor(Math.random()*TPIECES.length)];
  tPiece={...p,cells:p.cells.map(c=>[...c])};
  tPX=4; tPY=0;
  if(!tCanPlace(tPiece.cells,tPX,tPY)){
    tOver=true;
    clearInterval(gameLoop); gameLoop=null;
    stopMusic();
    playTune(SFX_DIE,1);
    clearText();
    addText("GAME OVER",{x:3,y:5,color:color`4`});
    addText("LINES "+tLines,{x:3,y:7,color:color`9`});
    addText("SCORE "+tScore,{x:3,y:8,color:color`7`});
    addText("j = MENU",{x:4,y:10,color:color`2`});
  }
}

function tCanPlace(cells,ox,oy){
  return cells.every(([cx,cy])=>{
    const nx=ox+cx,ny=oy+cy;
    if(nx<0||nx>=TW||ny>=TH) return false;
    if(ny<0) return true;
    return tBoard[ny][nx]===null;
  });
}

function tMove(dx,dy){
  if(tOver) return;
  if(tCanPlace(tPiece.cells,tPX+dx,tPY+dy)){
    tPX+=dx; tPY+=dy;
    if(dy===0) playTune(SFX_MOVE,1);
    renderTetris();
  } else if(dy===1) tLock();
}

function tDrop(){
  if(tOver) return;
  while(tCanPlace(tPiece.cells,tPX,tPY+1)) tPY++;
  tLock();
}

function tRotate(){
  if(tOver) return;
  const rot=tPiece.cells.map(([cx,cy])=>[-cy,cx]);
  const minX=Math.min(...rot.map(([cx])=>cx));
  const minY=Math.min(...rot.map(([,cy])=>cy));
  const norm=rot.map(([cx,cy])=>[cx-minX,cy-minY]);
  if(tCanPlace(norm,tPX,tPY)){tPiece.cells=norm;playTune(SFX_HIT,1);renderTetris();}
  else if(tCanPlace(norm,tPX+1,tPY)){tPX++;tPiece.cells=norm;playTune(SFX_HIT,1);renderTetris();}
  else if(tCanPlace(norm,tPX-1,tPY)){tPX--;tPiece.cells=norm;playTune(SFX_HIT,1);renderTetris();}
}

function tLock(){
  tPiece.cells.forEach(([cx,cy])=>{
    const nx=tPX+cx,ny=tPY+cy;
    if(ny>=0&&ny<TH&&nx>=0&&nx<TW) tBoard[ny][nx]=tPiece.spr;
  });
  let cleared=0;
  for(let r=TH-1;r>=0;r--){
    if(tBoard[r].every(c=>c!==null)){
      tBoard.splice(r,1);
      tBoard.unshift(Array(TW).fill(null));
      cleared++; r++;
    }
  }
  if(cleared>0){
    tLines+=cleared;
    tScore+=cleared*100*cleared;
    playTune(SFX_CLEAR,1);
  } else playTune(SFX_HIT,1);
  spawnTetris();
  renderTetris();
}

function tickTetris(){
  if(inMenu||tOver) return;
  tMove(0,1);
}

function renderTetris(){
  clearText();
  addText("L"+tLines,{x:0,y:0,color:color`9`});
  addText(String(tScore),{x:6,y:0,color:color`7`});
  addText("j=OUT",{x:11,y:0,color:color`2`});
  // Clear piece sprites
  ["1","2","3","4","5","6","7"].forEach(k=>{try{getAll(k).forEach(s=>s.remove());}catch(e){}});
  // Draw locked board
  tBoard.forEach((row,ry)=>{
    row.forEach((spr,rx)=>{if(spr) addSprite(TX+rx,TY+ry,spr);});
  });
  // Draw active piece
  if(tPiece) tPiece.cells.forEach(([cx,cy])=>{
    const nx=tPX+cx,ny=tPY+cy;
    if(ny>=0) addSprite(TX+nx,TY+ny,tPiece.spr);
  });
}

// ============================================
// BREAKOUT
// ============================================
const BR_COLS=8, BR_ROWS=3;
const BR_X=0, BR_Y=2;
let brBallX=8,brBallY=10,brDX=1,brDY=-1;
let brPadX=6,brScore=0,brLives=3,brRunning=false;
let brBricks=[];

function startBreakout() {
  brBallX=8;brBallY=10;brDX=1;brDY=-1;
  brPadX=6;brScore=0;brLives=3;brRunning=false;
  brBricks=[];
  for(let r=0;r<BR_ROWS;r++){
    for(let c=0;c<BR_COLS;c++) brBricks.push({x:c*2,y:BR_Y+r,alive:true,spr:["n","o","u"][r]});
  }
  setLegend(
    ["n",SPR_BRICK1],["o",SPR_BRICK2],["u",SPR_BRICK3],
    ["P",SPR_BBALL],["Q",SPR_BPAD]
  );
  setMap(EMPTY_MAP);
  renderBreakout();
  brCountdown(()=>{brRunning=true;music=playTune(BREAK_MUSIC,Infinity);gameLoop=setInterval(tickBreakout,80);});
  onInput("a",()=>{if(!inMenu&&brPadX>0) brPadX--;});
  onInput("d",()=>{if(!inMenu&&brPadX<13) brPadX++;});
  onInput("j",()=>{if(!inMenu&&brPadX>0) brPadX--;});
  onInput("l",()=>{if(!inMenu&&brPadX<13) brPadX++;});
}

function brCountdown(cb){
  clearText();
  addText("BREAKOUT",{x:3,y:3,color:color`4`});
  addText("j=MENU",{x:5,y:13,color:color`2`});
  let c=3;
  addText("3",{x:7,y:6,color:color`4`});
  playTune(SFX_COUNT,1);
  const t=setInterval(()=>{
    c--;
    clearText();
    addText("BREAKOUT",{x:3,y:3,color:color`4`});
    addText("j=MENU",{x:5,y:13,color:color`2`});
    if(c>0){addText(String(c),{x:7,y:6,color:color`4`});playTune(SFX_COUNT,1);}
    else{addText("GO",{x:6,y:6,color:color`7`});playTune(SFX_GO,1);clearInterval(t);setTimeout(cb,400);}
  },800);
}

function tickBreakout(){
  if(inMenu||!brRunning) return;
  brBallX+=brDX; brBallY+=brDY;
  // Wall bounce
  if(brBallX<=0){brBallX=0;brDX=1;playTune(SFX_HIT,1);}
  if(brBallX>=15){brBallX=15;brDX=-1;playTune(SFX_HIT,1);}
  if(brBallY<=0){brBallY=0;brDY=1;playTune(SFX_HIT,1);}
  // Paddle
  if(brBallY>=12&&brBallX>=brPadX&&brBallX<=brPadX+2){brDY=-1;brBallY=12;playTune(SFX_HIT,1);}
  // Ball lost
  if(brBallY>13){
    brLives--;
    playTune(SFX_DIE,1);
    if(brLives<=0){
      brRunning=false;
      clearInterval(gameLoop);gameLoop=null;stopMusic();
      clearText();
      addText("GAME OVER",{x:3,y:5,color:color`4`});
      addText("SCORE "+brScore,{x:3,y:7,color:color`7`});
      addText("j = MENU",{x:4,y:9,color:color`2`});
      return;
    }
    brBallX=8;brBallY=10;brDX=1;brDY=-1;brRunning=false;
    setTimeout(()=>{brRunning=true;},800);
  }
  // Brick collision
  brBricks.forEach(br=>{
    if(!br.alive) return;
    const bx=Math.round(brBallX),by=Math.round(brBallY);
    if(bx===br.x&&by===br.y){
      br.alive=false;
      brDY*=-1;
      brScore+=10;
      playTune(SFX_EAT,1);
      try{getAll(br.spr).forEach(s=>{if(Math.round(s.x)===br.x&&Math.round(s.y)===br.y)s.remove();});}catch(e){}
    }
  });
  // Win
  if(brBricks.every(b=>!b.alive)){
    brRunning=false;clearInterval(gameLoop);gameLoop=null;stopMusic();
    playTune(SFX_WIN,1);
    clearText();
    addText("YOU WIN",{x:4,y:5,color:color`7`});
    addText("SCORE "+brScore,{x:3,y:7,color:color`6`});
    addText("j = MENU",{x:4,y:9,color:color`2`});
    return;
  }
  renderBreakout();
}

function renderBreakout(){
  clearText();
  addText("BR "+brScore,{x:0,y:0,color:color`4`});
  addText("LIVES "+brLives,{x:9,y:0,color:color`7`});
  addText("j=MENU",{x:5,y:13,color:color`2`});
  rm(["P","Q"]);
  const bx=Math.round(brBallX),by=Math.round(brBallY);
  if(by>=0&&by<=12) addSprite(bx,by,"P");
  for(let px=0;px<3;px++) addSprite(brPadX+px,12,"Q");
  // Redraw alive bricks
  brBricks.forEach(br=>{
    if(br.alive) addSprite(br.x,br.y,br.spr);
  });
}

// ============================================
// ASTEROIDS
// ============================================
let aShipX=8,aShipY=11;
let aBullets=[],aRocks=[],aScore=0,aLives=3,aOver=false;

function startAsteroids(){
  aShipX=8;aShipY=11;
  aBullets=[];aRocks=[];aScore=0;aLives=3;aOver=false;
  setLegend(
    ["s",SPR_SHIP],["u",SPR_ABULLET],
    ["r",SPR_AROCK1],["t",SPR_AROCK2]
  );
  setMap(EMPTY_MAP);
  // Spawn initial rocks
  for(let i=0;i<4;i++) spawnRock();
  renderAsteroids();
  music=playTune(ASTR_MUSIC,Infinity);
  gameLoop=setInterval(tickAsteroids,120);
  onInput("a",()=>{if(!inMenu&&aShipX>1) aShipX--;});
  onInput("d",()=>{if(!inMenu&&aShipX<14) aShipX++;});
  onInput("j",()=>{if(!inMenu&&aShipX>1) aShipX--;});
  onInput("l",()=>{if(!inMenu&&aShipX<14) aShipX++;});
  onInput("w",()=>{if(!inMenu&&aShipY>1) aShipY--;});
  onInput("s",()=>{if(!inMenu&&aShipY<12) aShipY++;});
  onInput("i",()=>{if(!inMenu) shootAsteroid();});
  onInput("k",()=>{if(!inMenu) shootAsteroid();});
}

function spawnRock(){
  aRocks.push({
    x:1+Math.floor(Math.random()*14),
    y:1+Math.floor(Math.random()*4),
    dy:1,
    big:Math.random()>0.5
  });
}

function shootAsteroid(){
  if(aBullets.length<3){
    aBullets.push({x:aShipX,y:aShipY-1});
    playTune(SFX_SHOOT,1);
  }
}

function tickAsteroids(){
  if(inMenu||aOver) return;
  // Move bullets up
  aBullets=aBullets.filter(b=>{b.y-=1;return b.y>=0;});
  // Move rocks down
  aRocks.forEach(r=>r.y+=r.dy);
  aRocks=aRocks.filter(r=>r.y<14);
  // Spawn more rocks
  if(aRocks.length<4&&Math.random()<0.3) spawnRock();
  // Bullet-rock collision
  aBullets.forEach((b,bi)=>{
    aRocks.forEach((r,ri)=>{
      if(Math.abs(b.x-r.x)<=1&&Math.abs(b.y-r.y)<=1){
        aBullets.splice(bi,1);
        aRocks.splice(ri,1);
        aScore+=r.big?20:10;
        playTune(SFX_EXPLODE,1);
      }
    });
  });
  // Ship-rock collision
  aRocks.forEach(r=>{
    if(Math.abs(r.x-aShipX)<=1&&Math.abs(r.y-aShipY)<=1){
      aLives--;
      aRocks=aRocks.filter(ar=>ar!==r);
      playTune(SFX_DIE,1);
      if(aLives<=0){
        aOver=true;clearInterval(gameLoop);gameLoop=null;stopMusic();
        clearText();
        addText("GAME OVER",{x:3,y:5,color:color`4`});
        addText("SCORE "+aScore,{x:3,y:7,color:color`7`});
        addText("j = MENU",{x:4,y:9,color:color`2`});
      }
    }
  });
  if(!aOver) renderAsteroids();
}

function renderAsteroids(){
  clearText();
  addText("SCORE "+aScore,{x:0,y:0,color:color`3`});
  addText("LIVES "+aLives,{x:9,y:0,color:color`7`});
  addText("i=SHOOT",{x:0,y:13,color:color`2`});
  addText("j=MENU",{x:10,y:13,color:color`2`});
  rm(["s","u","r","t"]);
  addSprite(aShipX,aShipY,"s");
  aBullets.forEach(b=>{if(b.y>=1)addSprite(b.x,b.y,"u");});
  aRocks.forEach(r=>{if(r.y>=1&&r.y<=12)addSprite(r.x,r.y,r.big?"r":"t");});
}

// ---- START ----
boot();