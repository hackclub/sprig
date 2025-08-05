/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: MouseCat
@author:  Lor14N
@description: Pac Man like game where you escape from a mouse and collect keys.
@tags: [maze]
@addedOn: 2025-08-04
*/

//Create a title screen
function startTimer(callback, interval) {
  const timer = setInterval(callback, interval);
  return {
    end: () => clearInterval(timer)
  };
}

const player = "p";
const cornerwall = "w";
const info = "i";
const background = "b";
const exit = "e";
const score = "s";
const time = "t";
const key = "k";
const true_exit = "l";
const cat = "c";
const tit1 ="1";
const tit2 = "2";
const tit3 = "3";
const tit4 = "4";
const tit5 = "5";
const tit6 = "6";

setLegend(
  [ player, bitmap`
................
................
....11....11....
...1111..1111...
..18811..11881..
..188811118881..
...1111111111...
.....101101.....
....11011011....
....11511511....
...0111001110...
.....111111.....
....0.1111.0....
................
................
................` ],
  [ cornerwall, bitmap`
3330333330333330
3330333330333330
0000000000000000
0333330333330333
0333330333330333
0000000000000000
3330333330333330
3330333330333330
0000000000000000
0333330333330333
0333330333330333
0000000000000000
3330333330333330
3330333330333330
0000000000000000
0333330333330333`],
  [info, bitmap`
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
  [background, bitmap`
FFFF666FFFFF666F
666F666F666F666F
666F666F666F666F
666F666F666F666F
666FFFFF666FFFFF
666F666F666F666F
666F666F666F666F
666F666F666F666F
FFFF666FFFFF666F
666F666F666F666F
666F666F666F666F
666F666F666F666F
666FFFFF666FFFFF
666F666F666F666F
666F666F666F666F
666F666F666F666F`],
  [exit, bitmap`
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
  [true_exit, bitmap`
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
4444444444444444`],
  [score,  bitmap`
0000000000000000
2202202220220022
2002002020202020
2202002020220022
0202002020202020
2202202220202022
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
  [time,  bitmap`
0000000000000000
0222020200020220
0020020220220200
0020020202020220
0020020200020200
0020020200020220
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
  [key,  bitmap`
....0000........
...0DDDD0.......
..0DDDDDD0......
.0DDD00DDD0.....
0DDD0..0DDD0....
0DD0....0DD0....
0DD0....0DD0....
0DDD0..0DDD0....
.0DDD00DDD0.....
..0DDDDDD0F0....
...0DDDD0FFF0.00
....0000.0FFF0F0
..........0FFFF0
...........0FFF0
............000.
................`],
  [cat, bitmap`
................
................
....00....00....
...0000..0000...
..08800..00880..
..088800008880..
...0000000000...
....00200200....
...0002002000...
...0005005000...
..000001100000..
....00000000....
.....000000.....
......0000......
................
................`],
  [tit1, bitmap`
0000000000000000
0000000000000000
0022222200222222
0022222200222222
0022000000220000
0022000000220000
0022000000220000
0022222200222222
0022222200222222
0000002200220000
0000002200220000
0000002200220000
0022222200222222
0022222200222222
0000000000000000
0000000000000000`],
  [tit2, bitmap`
0000000000000000
0000000000000000
0022200000222222
0022200000222222
0022200000220000
0022200000220000
0022200000220000
0022200000222222
0022200000222222
0022200000220000
0022200000220000
0022200000220000
0022222200222222
0022222200222222
0000000000000000
0000000000000000`],
  [tit3, bitmap`
0000000000000000
0000000000000000
0022222200222222
0022222200222222
0022000000002220
0022000000002220
0022000000002220
0022000000002220
0022000000002220
0022000000002220
0022000000002220
0022000000002220
0022222200002220
0022222200002220
0000000000000000
0000000000000000`],
  [tit4, bitmap`
0000000000000000
0000000000000000
0022000000555522
0022022000522522
0022022000522022
0022022200222022
0022002200220022
0022002200225522
0022000000555522
0022000000550022
0022000000550022
0022000000550022
0022000000555522
0022000000555522
0000000000000000
0000000000000000`],
  [tit5, bitmap`
0000000000000000
0000000000000000
0022222200222222
0022222200222222
0022000000220000
0022000000220000
0022000000220000
0022222200222222
0022222200222222
0000002200220000
0000002200220000
0000002200220000
0022222200222222
0022222200222222
0000000000000000
0000000000000000`],
  [tit6, bitmap`
0000000000000000
0000000000000000
0022200000222222
0022200000222222
0022200000220000
0022200000220000
0022200000220000
0022200000222222
0022200000222222
0022200000220000
0022200000220000
0022200000220000
0022222200222222
0022222200222222
0000000000000000
0000000000000000`],
  
);
setBackground(background);
setSolids([]);
setSolids([ player, info, cornerwall, exit ]);


const levels = [
  map`
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii`,
  map`
...w..cwki
.w.w.w...i
kw...w.w.i
.w.w.k...i
.....www.i
.w.w...w.e
.w.www.w.i
p.k......i`,
  map`
c...ww..ki
.ww....w.i
..k.ww.w.i
w.w......i
w.w.wkww.i
w...w....e
p.w...ww.i
w...w...ki`,
  map`
p..www..ki
.w.....w.i
...w.w...i
kwwwkwww.i
.........i
.w.www.w.e
...k.w...i
cw.w...wki`,
  map`
...kwc..wi
.w.ww.w.wi
.w....w.wi
.w.ww...ki
...k..ww.i
.w.ww....e
p...w.w.wi
www.....ki`,
  map`
k..w....ci
.w.w.w.w.i
.....w.w.i
w.ww..k..i
...w.w.w.i
.w.k.w...e
.w.w...w.i
p....w..ki`,
  map`
k....w..ci
.w.w.w.w.i
.....k...i
w.w.w.ww.i
w.w.w....i
......ww.e
.w.ww....i
p..k..wwki`,
  map`
c.......ki
.ww.w.ww.i
.ww......i
....www.wi
.ww..k..wi
.ww.w.w..e
........wi
pwwkwwkwwi`,
  map`
www.....ci
kw...w.w.i
...w.k...i
ww.w.w.wwi
k.......wi
w.w.w.w..e
w.w...w.wi
p...w...ki`
];

// --- Game State ---
// gameOver = 0: false, 1:inter, 2:
let level = 1;
let gameOver = false;
let lost = false;
let counter = 0;
inter = true;




function loadLevel(index) {
  clearText();
  gameOver = true;
  lost = false;
  counter = 0;
  setMap(levels[index]);
  inter = true
}

function intermediary(){
  inter = true;
  setMap(levels[index]);
}

function placeText(){
  addText("Press J To Play!", { y: 5, color: color`H` });
}

// --- Level Progression ---
function nextLevel() {
  
  if(lost){
    loadLevel(level);
  }else{
    level++;
    if (level < levels.length) {
      loadLevel(level);
    } else {
      level = 1;
      loadLevel(level);

    }
  }
}

// --- Game Logic Loop ---
function gameLoop() {
  // inter = false;
  clearText();
  if (gameOver) return;

  const playerTile = getFirst(player);
  const catTile = getFirst(cat);
  const remainingKeys = tilesWith(key).length;

  //  Collision with Cat a.k.a Loose Game :C 
  if (playerTile && catTile.x === playerTile.x && catTile.y === playerTile.y) {
    clearText();
    addText("You Lost!", { y: 5, color: color`H` });
    playerTile.remove();
    catTile.remove();
    gameOver = true;
    setTimeout(loadLevel(level), 300000);

    return;
  }

  // --- All Keys Collected ---

  if(level !== 0){
    console.log(level);
    console.log(levels.length);
    if (remainingKeys === 0 && counter === 0) {
      addText("You Can Escape!", { y: 5, color: color`5` });
      getFirst(exit).type = true_exit;
      counter++;
    }
  }

  // --- Reached Exit (Win Condition) ---
  if (playerTile && playerTile.x === 9 && playerTile.y === 5) {
    clearText();
    addText("You Won!", { y: 5, color: color`H` });
    playerTile.remove();
    if (catTile) catTile.remove();
    gameOver = true;
    setTimeout(nextLevel, 1500);
  }
}

// --- Cat Follows Player ---
function moveCatTowardsPlayer() {
  const playerTile = getFirst(player);
  const catTile = getFirst(cat);

  if (!playerTile || !catTile) return;

  if (playerTile.x < catTile.x && !getTile(catTile.x - 1, catTile.y).some(s => s.type === cornerwall)) {
    catTile.x -= 1;
  } else if (playerTile.x > catTile.x && !getTile(catTile.x + 1, catTile.y).some(s => s.type === cornerwall)) {
    catTile.x += 1;
  }

  else if (playerTile.y < catTile.y && !getTile(catTile.x, catTile.y - 1).some(s => s.type === cornerwall)) {
    catTile.y -= 1;
  } else if (playerTile.y > catTile.y && !getTile(catTile.x, catTile.y + 1).some(s => s.type === cornerwall)) {
    catTile.y += 1;
  }
}

// --- Input ---
function handlePlayerInput(direction) { 
  if (!gameOver) {
    const playerTile = getFirst(player);
    if (direction === "w" && playerTile) playerTile.y -= 1;
    if (direction === "a" && playerTile) playerTile.x -= 1;
    if (direction === "s" && playerTile) playerTile.y += 1;
    if (direction === "d" && playerTile) playerTile.x += 1;
  } 
}

function letterJ(level){
  if(inter){
    gameOver = false;
    inter = false;
  } else{
    loadLevel(level);
  }
}

onInput("w", () => handlePlayerInput("w"));
onInput("a", () => handlePlayerInput("a"));
onInput("s", () => handlePlayerInput("s"));
onInput("d", () => handlePlayerInput("d"));
onInput("j", () => letterJ(level));

// --- After Input ---
afterInput(() => {
  const playerTile = getFirst(player);
  const keySprites = getAll(key);

  keySprites.forEach(keySprite => {
    if (playerTile && keySprite.x === playerTile.x && keySprite.y === playerTile.y) {
      keySprite.remove();
      console.log("Player picked up a key!");
    }
  });
});

// --- Timers ---
if(!gameOver){startTimer(gameLoop, 1);
             }
startTimer(() => {
  if (inter) placeText();
}, 1);

startTimer(() => {
  if (!gameOver) moveCatTowardsPlayer();
}, 285);

// --- Start First Level ---
loadLevel(level);
