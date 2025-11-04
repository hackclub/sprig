/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Pickman!
@author: overcheer
@description: Wake up! You have been locked away in an (semi) abandoned mine for hundreds of years. Luckily you're prepared with a safety helmet, a pick, and a bad sense of humour. Can you get out and touch some grass? Nobody knows...
@tags: [game, pacman, adventure]
@addedOn: 2025-18-10
*/




const player = "p";
const tile1 = "a";
const tile2 = "b";
const fog = "f";
const wall = "w";
let seen = Array(16).fill().map(() => Array(16).fill(false));
let visible = Array(16).fill().map(() => Array(16).fill(false));
const gem = "g";
const enemy = "e";
const key = "k";
const door = "d";
const boulder = "z";
let score = 0;
let tickGem = false;
let tickKey = false;
const tickSprite = "t";
const crossSprite = "c";
const gsparkle = "s";
const ksparkle = "q";
const trap = "h"; // for hidden :) 
const heartSprite = "v"; 
const pressurePlate = "j";
const faded= "x";
const boulderOverlay = "i";
const warning = "y";

setLegend(
  [ tickSprite, bitmap`
.00000000000000.
0000000000000000
0000000000000000
0000000000000000
00000000000D0000
000000000DD00000
000000000D000000
00000000D0000000
00000000D0000000
0000D00D00000000
00000DDD00000000
000000D000000000
0000000000000000
0000000000000000
0000000000000000
.00000000000000.` ],
  [ crossSprite, bitmap`
.00000000000000.
0330000000000030
0033300000000330
0000330000033000
0000033000330000
0000003303300000
0000000333000000
0000000333000000
0000003303000000
0000033000300000
0000330000330000
0003300000003000
0033000000003300
0330000000000300
0300000000000330
.00000000000000.` ],
  [ heartSprite, bitmap`
0000000000000000
0000000000000000
0003330003333000
0033333033333300
0333333333333330
0333333333333330
0333333333333330
0033333333333300
0033333333333000
0003333333330000
0000333333330000
0000333333300000
0000033333000000
0000003330000000
0000000330000000
0000000000000000` ],

  
  [ player, bitmap`
................
.....66666......
....6FFF666.....
...6FFFFFF2F....
...1L111111.....
...11101101.....
....1111111.....
....1L99999.....
.....199999.....
....66F999......
...66FF1FF66....
...6FFFFFFF6....
...6FFFFFFF6....
...1FFFFFFF1....
.....6...6......
.....0...0......` ],
  [ door, bitmap`
...1111111111...
..111LLLLLL111..
.111L000000L111.
.11L00000000L11.
.11L00000000L11.
.11L00000000L11.
.11L00000000L11.
.11L00000000L11.
.11L00000000L11.
.11L00000000L11.
.11L00000000L11.
.11L00000000L11.
.11L00000000L11.
.11L00000000L11.
.11L00000000L11.
111L00000000L111`],
  [ warning, bitmap`
................
................
.......33.......
......3333......
.....333333.....
....33300333....
...3333003333...
..333330033333..
..333330033333..
.33333300333333.
.33333300333333.
3333333333333333
3333333003333333
.33333300333333.
....33333333....
......3333......` ],
  [ gsparkle, bitmap`
................
................
................
.......7........
......777.......
.....77777......
....7777777.....
.....77777......
......777.......
.......7........
................
................
................
................
................
................`],
  [ ksparkle, bitmap`
................
................
................
.......6........
......666.......
.....66666......
....6666666.....
.....66666......
......666.......
.......6........
................
................
................
................
................
................`],
  [ boulderOverlay, bitmap`
................
................
................
....1111111.....
...111111111....
..111LLLLL111...
.111L99999L111..
.11L9999999L11..
.11L9999999L11..
.11L9993999L11..
.11L9999999L11..
.11L9999999L11..
.111L99999L111..
..111LLLLL111...
...111111111....
....1111111.....` ],
  [ pressurePlate, bitmap`
................
.11111111111111.
.12222222222221.
.12222222222221.
.12222222222221.
.12229999992221.
.12229999992221.
.12229999992221.
.12229999992221.
.12229999992221.
.12229999992221.
.12222222222221.
.12222222222221.
.12222222222221.
.11111111111111.
................`],  
  [ fog, bitmap`
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
0000000000000000` ],
  [ wall, bitmap`
L0000000000001L0
L0000000000001L0
000000000LL00000
0000000001LL0000
0LL0000000100000
0110000000000000
0000000000000000
000000LL10000000
0000000L10000000
L000000LL0000000
1000000000000000
0000000000000L00
000000000000L100
0000000000001000
00L00000000000L1
001L0000000000L1` ],
  [ key, bitmap`
................
................
................
................
...666..........
..66.66.........
.66...6.........
.6....666666666.
.666.66...66.66.
...666.....6..6.
................
................
................
................
................
................`],
  [ enemy, bitmap`
................
................
......3..3......
.....13CC31.....
....213CC312....
...2213CC3122...
..22213CC31222..
.222213CC312222.
.222213CC312222.
..22213CC31222..
...2213CC3122...
....213CC312....
.....13CC31.....
......3..3......
................
................`],
  [ trap, bitmap`
................
................
......3..3......
.....13CC31.....
....31111113....
...0311CC1130...
..303LLLLLL303..
..303L3CC3L303..
..303LLLLLL303..
..30311CC11303..
...0311111130...
....313CC313....
.....13CC31.....
......3..3......
................
................`],
  [ boulder, bitmap`
................
................
................
....1111111.....
...111111111....
..111LLLLL111...
.111L99999L111..
.11L9999999L11..
.11L9999999L11..
.11L9999999L11..
.11L9999999L11..
.11L9999999L11..
.111L99999L111..
..111LLLLL111...
...111111111....
....1111111.....` ],
   
  [ gem, bitmap`
L11LLLLLLLLLLLL1
LL1LLL1LLLL107LL
LLLLLLLLL1L01L1L
LL017LLLLL177LLL
LL10LL77777LLLLL
LLLLL7255557LLLL
LLLLL7555257L77L
LLLLLL75557L10LL
LLL7LL77577101LL
LLL11LLL7LL1LLLL
LLLL1LLLLLL1LLLL
1LLLLLLLLLLL1L01
0LLLLLL01LLLLL10
7LLLLLL10LLLLLLL
7LLLLLLL7L11LLLL
LLL11LLLLLLLLL11`],   
   
  [ faded, bitmap`
L0000000000001L0
L0000000000001L0
000000000LL00000
0000000001LL0000
0LL0000000100000
0110000000000000
0000000000000000
000000LL10000000
0000000L10000000
L000000LL0000000
1000000000000000
0000000000000L00
0000000...00L100
00000L.....L1000
00L0L......000L1
001L........00L1` ],
  [ tile1, bitmap`
LFLLLLL11LLLLL11
LLLLLFLLLLL10LLL
LLLLLLFLLLL01LLL
LL01LLLL1LLLLLFL
LL10LLLLLLL11LLF
11LLLLLLLLLLLLLL
L11LLLLLLLLLLLLL
LL1LLLL10LLL10LL
LLL1LLL01LLL01LL
LLL11L1LLLLLLLLL
LLLLLL1LL11LLLLL
1LLLLLLLLLLFLL01
0LLLLLL01LLFLL10
LLFLLLL10LLLLLLL
LLLLLLLLLLLLLLLL
1LFLL1LLL11LLLLF` ],
  [ tile2, bitmap`
LLLFLLLLLLLLL10L
LLLFLLLLLLLLF01L
LLLLFLLLLLLLFLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLL01L
LLLL10LLLLLLL10L
LLLL01LLLLLLLLFL
LLLLLFLLLLLLLLLL
LLLLLFLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLL10LLLLL
LLLLLLLLL01LLLLL
01LLLLLLLLFLLLFL
10FFLLLLLLLLLL10
LLLFLLLLLLLLLF01` ],



)

setSolids([wall, boulder, player, boulderOverlay])
// LIVES SET
let lives = 3
let level = 0
const levels = [
  map`
wwwwwwwwwwwwwwww
w...kw.........w
w..w.w...wwwww.w
w..www.......w.w
w..............w
w..............w
w......z.......w
w..............d
w...w..........w
w...www........w
w.........w....w
w.p......w....ww
w......j..w....w
w.............zw
w..ww......www.w
wwwwwwwwwwwwwwww`,
 map`
wwwwwwwwwwwwwwww
w..............w
w...........w.ww
w............wjw
w..kww.......w.w
w..w.ww......w.w
w......z.....w.w
w............w.d
w...........ww.w
w...........w..w
w...........w..w
w.p....jw..ww..w
w........www...w
w.............zw
w..............w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
wkwj...........w
w.ww.........w.w
w..w.......www.w
w...z.....ww...w
w....wwww.....ww
w.....wpw.....ww
w.....wxw......w
w.....w.......ww
w....ww........w
w.z.ww....ww...w
w..w.......ww..w
w.......z...ww.w
w.............zw
wj..........j..w
wwwwwwwdwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w......w...xxxxd
w..wwwww...wwwzw
w..wj........z.w
w..wxwww...w...w
w......w...wz..w
w..wwwwwxwwwww.w
wkjw..........pw
w..wwwwwwwwwww.w
w......z.jw....w
w........ww....w
w.z......w.....w
w.......wwxw...w
w.........zwww.w
w.........z....w
wwwwwwwwwwwwwwww`,
]
leal = level+1
 const base = 1 + (leal - 1) * (4 / 3);           
  const rand = Math.floor(Math.random() * 3) - 1;  
  const enemyCalc = Math.max(1, Math.round(base + rand));


const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ player ]: [boulder, player ]
})
function findEmptyTile(maxAttempts = 2000) {
  const W = width();
  const H = height();
  for (let i = 0; i < maxAttempts; i++) {
    const x = Math.floor(Math.random() * W);
    const y = Math.floor(Math.random() * H);
    if (getTile(x, y).length < 1) return {x,y };
  }
  return null;
}
let lastMove = {dx: 0, dy: 0};
let gameOver = false;
let testgX = null;
let testgY = null;
let gX = null;
let gY = null;
let testtX = null;
let testtY = null;
let tX = null;
let tY = null;

const gPos = findEmptyTile();
if (gPos) {
  gX = gPos.x;
  gY = gPos.y;
} else {
  console.warn("NO empty tile for gem");
}

const tPos = findEmptyTile();
if (tPos) {
  tX = tPos.x;
  tY = tPos.y;
} else {
  console.warn("no empty tile for trap");
}

function playMove(){}

function addGem(){addSprite(gX, gY, gem); console.log("Gem Location: "+gX, gY)}
a = 1

function addTrap(count) {
  const triesPerTrap = 2000;
  const n = Math.max(0, Math.floor(count));
  for (let i = 0; i < n; i++) {
    const pos = findEmptyTile(triesPerTrap);
    if (!pos) {
      console.warn("addTrap- no empty tile");
      break;
    }
    addSprite(pos.x, pos.y, trap);
  }
}

addGem();
console.log("Current Level: "+ level);


function drawFog() { 
  const p = getFirst(player); 
  const here = getTile(p.x, p.y);
  for (let s of getAll(fog)) s.remove() 
    for (let y = 0; y < 16; y++) { 
    for (let x = 0; x < 16; x++) { 
      const here = getTile(x, y); 
      if (seen[y][x]) { 
        let want = overlay[y][x]; 
        if (!want) { 
          want = overlay[y][x] = Math.random() > 0.5 ? tile2 : tile1; } 
        const hasCorrect = here.some(s => s.type === want); 
        const hasAnyOverlay = here.some(s => s.type === tile1 || s.type === tile2); 
        if (!hasCorrect) { if (hasAnyOverlay) { for (const s of here) {
          if (s.type === tile1 || s.type === tile2){ s.remove()}; } } 
                           addSprite(x, y, want); } } else { addSprite(x, y, fog); 
                                                           } } } }



let overlay = Array(16).fill().map(() => Array(16).fill(null));

function updateSeen(x, y) {
  if (x < 0 || y < 0 || y >= seen.length || x >= seen[0].length) return;

  function mark(y0, x0) {
    if (y0 < 0 || x0 < 0 || y0 >= seen.length || x0 >= seen[0].length) return;
    if (!seen[y0][x0]) {
      seen[y0][x0] = true;
      overlay[y0][x0] = Math.random() > 0.5 ? tile2 : tile1;
    }
  }

  mark(y, x);

  mark(y + lastMove.dy, x + lastMove.dx);
}



function checkGem(newX,newY){
  
  
  const t = getTile(newX, newY);
  const g = t.find(s => s.type === gem);
   if (g) {
     
     tickGem = true;
     g.remove();
      
      
}
    }
onInput("j", () => {
  
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    drawFog()
    addTrap(enemyCalc)
  }
});
function checkTrap(newX,newY){
  
  
  const t = getTile(newX, newY);
  const g = t.find(s => s.type === trap);
   if (g) {
     
     lives = lives -1;
     drawFog();
     const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
     g.remove();
      
      
}
    }

function checkKey(newX,newY){
  
  
  const t = getTile(newX, newY);
  const k = t.find(s => s.type === key);
   if (k) {
     
     tickKey = true;
     k.remove();
      
      
}
    }



function movePlayer(dx, dy) {
  const p = getFirst(player);
  const oldX = p.x;
  const oldY = p.y;

  const newX = oldX + dx;
  const newY = oldY + dy;

  if (newX >= 0 && newX <= 15 && newY >= 0 && newY <= 15) {
    const nextTile = getTile(newX, newY);
    if (!nextTile.some(t => t.type === "w")) {
      lastMove.dx = dx;
      lastMove.dy = dy;
      p.x = newX;
      p.y = newY;
      }

      updateSeen(newX, newY);
      drawFog();
      checkGem(newX, newY);
      checkKey(newX,newY);
      checkTrap(newX,newY);
      }
    }

  

const start = getFirst(player)
updateSeen(start.x, start.y)
drawFog()

const hit = tune`
229.00763358778627: D4^229.00763358778627,
229.00763358778627: C4~229.00763358778627,
229.00763358778627: C4~229.00763358778627,
229.00763358778627: C4~229.00763358778627,
229.00763358778627: C4~229.00763358778627,
229.00763358778627: E4^229.00763358778627,
229.00763358778627: E4~229.00763358778627,
229.00763358778627: G4~229.00763358778627,
229.00763358778627: G4~229.00763358778627,
229.00763358778627: G4~229.00763358778627,
229.00763358778627: G4~229.00763358778627,
229.00763358778627: D5^229.00763358778627,
229.00763358778627: D5~229.00763358778627,
229.00763358778627: B4^229.00763358778627,
229.00763358778627: B4~229.00763358778627,
229.00763358778627: F5^229.00763358778627,
229.00763358778627: F5~229.00763358778627,
229.00763358778627: E5~229.00763358778627,
229.00763358778627: E5~229.00763358778627,
229.00763358778627: C5^229.00763358778627,
229.00763358778627: C5~229.00763358778627,
229.00763358778627: D5^229.00763358778627,
229.00763358778627: D5~229.00763358778627,
229.00763358778627: B4~229.00763358778627,
229.00763358778627: B4~229.00763358778627,
229.00763358778627: B4~229.00763358778627,
229.00763358778627: B4~229.00763358778627,
229.00763358778627: C5^229.00763358778627,
229.00763358778627: C5~229.00763358778627,
229.00763358778627: D5^229.00763358778627,
229.00763358778627: D5~229.00763358778627,
229.00763358778627: C5~229.00763358778627`;



const playback = playTune(hit)


let text = "Score:" + score

addText("Gem:", { 
        x: 4,
        y: 15,
        color: color`7`
      })
addText("Key:", { 
        x: 11,
        y: 15,
        color: color`6`
      })
onInput("w", () => movePlayer(0, -1))
onInput("s", () => movePlayer(0, 1))
onInput("a", () => movePlayer(-1, 0))
onInput("d", () => movePlayer(1, 0))
addSprite(6, 15, crossSprite) // adds ----------------
addSprite(13, 15, crossSprite)
function addgText(){  
      addText("Gem:", { 
        x: 4,
        y: 15,
        color: color`7`
      });}
function addlText(){  
      addText("Lives:", { 
        x: 9,
        y: 0,
        color: color`3`
      });}
function addLevelText(){  
      addText("LVL:"+(level+1) , { 
        x: 2,
        y: 0,
        color: color`2`
      });}
function addkText(){  

addText("Key:", { 
        x: 11,
        y: 15,
        color: color`6`
      });}
chance = Math.random()*10;
console.log("Chance"+chance)
setInterval(() => {
  chance = Math.random()*10;
}, 800);
addLevelText()
setInterval(() => {
  
  for (const s of getAll(gsparkle)) s.remove();
  for (const g of getAll(gem)) {
    if (chance < 0.5) {
      addSprite(g.x, g.y, gsparkle);}}
}, 400);




setInterval(() => {

  for (const s of getAll(ksparkle)) s.remove();
  for (const k of getAll(key)) {
    if (chance < 1.5) {
      addSprite(k.x, k.y, ksparkle);}}
}, 600);

setInterval(() => {

  for (const s of getAll(warning)) s.remove();
  for (const w of getAll(trap)) {
    if (chance < 1.5) {
      addSprite(w.x, w.y, warning);}}
}, 1000);

let yesd = false;


setInterval(() => {

  if (yesd){addText("FIND THE KEY!", {x: 4, y: 4, color: color`2`})}
  
}, 200);

function gOverT(){clearText; addText("GAME OVER", { 
  x: 5,
  y: 5,
  color: color`3`
});}


addlText();
for (let i = 0; i < lives; i++){
    addSprite(13+i, 0, heartSprite);
    
  }
addTrap(enemyCalc)

function endGame() {
  if (gameOver) return;
  gameOver = true;

  try { if (typeof playback !== "undefined" && playback && playback.end) playback.end(); } catch(e) {};
  try { if (typeof gameOverPlayback !== "undefined" && gameOverPlayback && gameOverPlayback.end) gameOverPlayback.end(); } catch(e) {};
  
  clearText();
  addText("GAME OVER", { x: 3, y: 4, color: color`3` });

  const gameOverTune = tune`
500: E4-500,
500,
500: D4-500,
500,
500: C4-500,
13500`;
  playTune(gameOverTune)
  const p = getFirst(player);
  if (p) p.remove();
  for (const s of [...getAll(gsparkle), ...getAll(ksparkle), ...getAll(gem)]) s.remove();
}


afterInput(() => {
  console.log("Tiles: "+tilesWith(trap))
  if (lives === 0){clearText; endGame()}
  const covered = tilesWith(boulder, pressurePlate); // array
console.log("tiles", covered.length);

if (covered.length >= 1) {
  for (const t of covered) {
    let x = t.x ?? (Array.isArray(t) ? (t[0]?.x ?? t[0]) : undefined);
    let y = t.y ?? (Array.isArray(t) ? (t[1]?.y ?? t[1]) : undefined);
    if (x === undefined || y === undefined) {
      if (t && typeof t === "obect") {
        for (const v of Obect.values(t)) {
          if (v && typeof v.x === "number" && typeof v.y === "number") {
            x = v.x; y = v.y; break;
          }
        }
      }
    }
    if (typeof x !== "number" || typeof y !== "number") continue;
    for (const s of [...getTile(x, y)]) {
      if (s.type === boulder) s.remove();
    }
    addSprite(x, y, boulderOverlay);
    const ding = tune`
500: C4~500,
15500`
    playTune(ding)

  }
}
  
  currentLevelB4 = levels[level];
  for (let i = 0; i < lives; i++){
    addSprite(13+i, 0, heartSprite);
    
  }
  
  if ((tilesWith(door, player).length>=1) && (tickKey === false)){
    console.log("tried to pass")
    yesd = true;}
  else{yesd = false}
  
  
  const gtx = 6, gty = 15;
  const ktx = 13, kty = 15;
  for (const s of [...getTile(gtx, gty)]) {
    if (s.type === crossSprite || s.type === tickSprite) s.remove();
  }
  if (tickGem) {
    addSprite(gtx, gty, tickSprite);
  } else {
    addSprite(gtx, gty, crossSprite);
  }
  for (const s of [...getTile(ktx, kty)]) {
    if (s.type === crossSprite || s.type === tickSprite) s.remove();
  }
  if (tickKey) {
    addSprite(ktx, kty, tickSprite);
  } else {
    addSprite(ktx, kty, crossSprite);
  }
  clearText();
  addgText();
  addlText();
  addkText();
  addLevelText()
  if (gameOver){gOverT()}
  const targetNumber = tilesWith(pressurePlate).length;
  

  const numberCovered = tilesWith(pressurePlate, boulderOverlay).length;
  if (tilesWith(door, player).length === 1){
    if (tickKey){
    if (numberCovered===targetNumber){
       const diiing = tune`
500,
500: B5^500,
15000`
      playTune(diiing)
      level = level + 1;
      tickKey = false;
      tickGem = false;
    const currentLevel = levels[level];
    ;
    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
      wX = Math.floor(Math.random() * width());
      hX = Math.floor(Math.random() * width());
      addGem()
      addTrap(enemyCalc)
      seen = Array(16).fill().map(() => Array(16).fill(false));
overlay = Array(16).fill().map(() => Array(16).fill(null));
for (const s of [...getAll(fog), ...getAll(tile1), ...getAll(tile2), ...getAll(gsparkle), ...getAll(ksparkle)]) {
  s.remove();
}


const start = getFirst(player);
if (start) {
  updateSeen(start.x, start.y);

  drawFog();
}
    } else {
      const winT = tune`
115.38461538461539,
115.38461538461539: C5^115.38461538461539,
115.38461538461539,
115.38461538461539: E5~115.38461538461539,
115.38461538461539,
115.38461538461539: G5^115.38461538461539,
115.38461538461539,
115.38461538461539: B5~115.38461538461539,
115.38461538461539,
115.38461538461539: G5^115.38461538461539,
115.38461538461539: E5~115.38461538461539,
115.38461538461539: C5^115.38461538461539,
230.76923076923077,
115.38461538461539: C5^115.38461538461539,
230.76923076923077,
115.38461538461539: E5^115.38461538461539,
115.38461538461539,
115.38461538461539: B5~115.38461538461539,
1384.6153846153848`;
      addText("You win!", {x: 7, y: 4, color: color`4` });
      playback.end()
      playTune(winT)
    }
    }
     else if (numberCovered!==targetNumber){addText("MOVE THE BOULDER", {x: 2, y: 4, color: color`2`})} 
  }
  
                                                }
});


