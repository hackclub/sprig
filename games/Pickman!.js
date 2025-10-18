/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Pickman!
@author: overcheer
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

let score = 0;
let tickGem = false;
let tickKey = false;
const tickSprite = "t";
const crossSprite = "c";
const gsparkle = "s";
const ksparkle = "q";

setLegend(

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
  [ gsparkle, bitmap`
................
................
................
.......2........
......222.......
.....22222......
....2222222.....
.....22222......
......222.......
.......2........
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

setSolids([wall])

let level = 0
const levels = [
  map`
................
................
................
........k.......
................
................
...p............
................
................
................
................
...........d....
................
................
................
................`,
  map`
wwwwwwwwwwwwwwww
w..............w
w..............w
w.......k......w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..........d...w
w..............w
w..............w
w.............pw
wwwwwwwwwwwwwwww`
]

const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ player ]: []
})

let lastMove = {dx: 0, dy: 0};
let gameOver = false;
let wX = Math.floor(Math.random() * width());
let hX = Math.floor(Math.random() * width());
let randomTile = [wX][hX];

function playMove(){}

function addGem(){addSprite(wX, hX, gem); console.log(wX, hX)}


addGem()




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
          want = overlay[y][x] = Math.random() > 0.5 ? tile2 : tile1;
  }
        const hasCorrect = here.some(s => s.type === want);
        const hasAnyOverlay = here.some(s => s.type === tile1 || s.type === tile2);

        if (!hasCorrect) {
          
          if (hasAnyOverlay) {
            for (const s of here) {
              if (s.type === tile1 || s.type === tile2) s.remove();
            }
          }
          addSprite(x, y, want);
        }
      } else {
  
    addSprite(x, y, fog);
  }
}

    }
  
}

function checkGem(newX,newY){
  
  
  const t = getTile(newX, newY);
  const g = t.find(s => s.type === gem);
   if (g) {
     console.log("wh")
     tickGem = true;
     g.remove();
      
      
}
    }

function checkKey(newX,newY){
  
  
  const t = getTile(newX, newY);
  const k = t.find(s => s.type === key);
   if (k) {
     console.log("key")
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



const playback = playTune(hit, Infinity)


let text = "Score:" + score

addText("Gem:", { 
        x: 1,
        y: 13,
        color: color`3`
      })
addText("Key:", { 
        x: 1,
        y: 15,
        color: color`3`
      })
onInput("w", () => movePlayer(0, -1))
onInput("i", () => movePlayer(0, -1))
onInput("s", () => movePlayer(0, 1))
onInput("k", () => movePlayer(0, 1))
onInput("a", () => movePlayer(-1, 0))
onInput("j", () => movePlayer(-1, 0))
onInput("d", () => movePlayer(1, 0))
onInput("l", () => movePlayer(1, 0))
addSprite(3, 13, crossSprite)
addSprite(3, 15, crossSprite)
function addgText(){  
      addText("Gem:", { 
        x: 1,
        y: 13,
        color: color`3`
      });}
function addkText(){  
      addText("Key:", { 
        x: 1,
        y: 15,
        color: color`3`
      });}
chance = Math.random()*10;
console.log(chance)
setInterval(() => {
  chance = Math.random()*10;
}, 800);

setInterval(() => {
  
  for (const s of getAll(gsparkle)) s.remove();
  for (const g of getAll(gem)) {
    if (chance < 1) {
      addSprite(g.x, g.y, gsparkle);}}
}, 400);

setInterval(() => {

  for (const s of getAll(ksparkle)) s.remove();
  for (const k of getAll(key)) {
    if (chance < 0.5) {
      addSprite(k.x, k.y, ksparkle);}}
}, 600);

afterInput(() => {
  const gtx = 3, gty = 13;
  const ktx = 3, kty = 15;
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
  addkText();
  if (tilesWith(door, player).length === 1){
    console.log("W")
    if (tickKey){
      console.log("I")
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
  }
});


