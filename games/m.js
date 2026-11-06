/*
@title: robot escape67676767
@author: miqdad salman
@description: robot escape 67676767is a game that you need to escape from fire and get to the portal to win
@tags: ['action']
@addedOn: 2026-11-06
*/

const player = "p"
const knife = "k"
const wall = "w"
const portal = "e"
const key = "y"
const black = "b";
let score = 0;
let totalKeysCollected = 0; 
const colors = [ color`L`, color`1`, color`3`, color`C`, color`7`, color`5`, color`6`, color`F`, color`4`, color`D`, color`8`, color`H`, color`9` ]
var win = false;
var pointsInt = 0;
var notCheating = false;
var text = addText("points: ", { y: 14, x: 2, color: color`0` });

const melody = tune `
500: C4-500,
500: D4-500 + C4^500 + G4~500 + F4~500,
500: D4-500 + E4-500 + C4^500 + G4~500 + A4~500,
500: E4-500 + F4-500 + D4^500 + C4-500 + B4~500,
500: F4-500 + G4-500 + D4^500 + C4-500 + D5~500,
500: G4-500 + A4-500 + E4^500 + F4^500 + D4-500,
500: A4-500 + F4^500 + E4-500 + C4~500 + D4~500,
500: B4-500 + G4^500 + A4^500 + E4-500 + D4~500,
500: C5-500 + D5-500 + A4^500 + F4-500 + G4-500,
500: D5-500 + E5-500 + A4^500 + B4^500 + G4-500,
500: E5-500 + C5^500 + B4^500 + G4-500 + F4~500,
500: E5-500 + D5-500 + B4^500 + A4^500 + F4-500,
500: D5-500 + C5-500 + A4^500 + G4^500 + E4-500,
500: C5-500 + B4-500 + G4^500 + F4^500 + E4-500,
500: B4-500 + A4-500 + F4^500 + D4-500 + C5/500,
500: A4-500 + G4-500 + F4^500 + E4^500 + C4-500,
500: F4-500 + E4^500 + D4^500 + C4^500 + G4/500,
500: E4-500 + D4^500 + C4^500 + F4/500,
500: D4-500 + C4-500 + E4/500,
500: C4-500 + D4/500,
500: D4/500,
5500`

const background = tune `
500: A4~500,
500: C5~500 + A4~500,
500: D5-500 + A4~500 + B4~500 + C5/500,
500: E5-500 + B4~500 + G4~500 + A4~500 + D5~500,
500: F5-500 + B4~500 + A4~500 + D5~500 + C5^500,
500: G5-500 + B4~500 + C5^500 + E5~500 + A4^500,
500: G5-500 + B4~500 + D5^500 + E5~500 + C5^500,
500: G5-500 + C5~500 + D5^500 + E5^500 + A4^500,
500: G5-500 + C5~500 + D5~500 + E5~500 + A4^500,
500: G5-500 + C5^500 + D5^500 + E5^500 + B4^500,
500: D5^500 + C5^500 + F5^500 + E5^500 + A4^500,
500: A5-500 + D5^500 + C5^500 + F5^500 + E5^500,
500: D5^500 + C5^500 + F5^500 + E5^500 + A4^500,
500: G5-500 + E5~500 + C5~500 + D5^500 + F5^500,
500: F5-500 + E5^500 + C5~500 + D5^500 + G5^500,
500: E5^500 + C5~500 + G5^500 + D5^500 + B4^500,
500: D5-500 + E5^500 + C5~500 + F5^500 + G5^500,
500: C5~500 + F5^500 + D5~500 + G5^500 + E5^500,
500: C5-500 + F5^500 + D5~500 + G5^500 + E5^500,
500: C5~500 + E5~500 + D5~500 + G5^500 + A5^500,
500: C5~500 + E5~500 + D5~500 + F5~500 + A5^500,
500: C5^500 + D5~500 + E5~500 + A5^500 + E4^500,
500: F5-500 + E5~500 + C5~500 + B5^500 + A5^500,
500: E5~500 + B4~500 + A4~500 + B5^500 + C5^500,
500: D5~500 + C5^500 + B5^500 + B4^500 + G5/500,
500: C5^500 + B5^500 + D5^500 + G5/500 + A5/500,
500: C5^500 + B4~500 + D5^500 + G5/500 + A5/500,
500: E4-500 + C5~500 + B4~500 + D5^500 + A5/500,
500: C5-500 + D5^500 + A5/500 + B5/500,
500: E4-500 + B5/500,
500: C5-500 + B5/500,
500: E4-500`
const playback = playTune(background, Infinity);

setLegend(
  [player, bitmap`
0000000000000000
0111111111111110
0166LLLLLLLL6610
0166LL3LL3LL6610
0166LLLLLLLL6610
01663LLLLLL36610
0166333333336610
0166444444446610
01664L4L4L4L6610
0166444444446610
0166666666666610
0166666666666610
0166666666666610
0166666666666610
0111111111111110
0000000000000000`],
  [knife, bitmap`
................
................
................
................
................
................
................
.......33.......
......3663......
.....369963.....
....36933963....
...3693663963...
..369369963963..
.369369CC963963.
369369CCCC963963
4444444444444444`],
  [wall, bitmap`
................
................
................
.......D.D......
.....DDDDDD.....
....DD3DDDDD....
....DDDDD3DD....
...D3DDCDDDD....
...DDDCCCCD.....
...DD3DCCCD.....
...D3DDCC.3D....
...DDD.CC..D....
....D..CC.......
.......CC.......
.......CC.......
................`],
  [portal, bitmap`
.......4........
.....44444......
....44DDD4......
....4DD44D4.....
....4DD44D4.....
...44D444D4.....
...4D4474D44....
...4D44744D4....
...4DD4744D4....
...44DD44DD4....
....44DDDD44....
......44DD4.....
........444.....
................
................
................`],
  [key, bitmap`
................
................
................
................
................
.......6........
......6.6.......
.......6........
.......6........
......66........
.......6........
................
................
................
................
................`],

);


let level = 0
const levels = [
  map`
..e.........
............
..y...k.....
......kk....
............
............
............
..p...y..e..`,
  map`
.ew..
.www.
p..k.
y....`,
  map`
....k
.....
.ye..
.....
p....`,
  map`
kw.w.
..w.w
.wwww
py...
.wwww
....e`,
  map`
............
.w.w.y.www..
.wyy..y..www
w.yyywyyw...
wew..y.www.w
.wp.w.kyww..
.w.w.w..yy..
..w.....y...`,
  map`
kw.......
.w.w.w.w.
.w.w.wyw.
pw.wyw.w.
.w.w.w.wy
.w.w.w.w.
.y.....ey`,
  map`
.........w..
....ww....w.
.....w...y..
www.ww.ww.ew
...w...y.www
.www.....ww.
....y.......
k.p.........`,
];

setMap(levels[level]);
setSolids([player, wall]);
let keysCollected = 0; 

onInput("s", () => {
  movePlayer(0, 1);
});

onInput("w", () => {
  movePlayer(0, -1);
});

onInput("a", () => {
  movePlayer(-1, 0);
});

onInput("d", () => {
  movePlayer(1, 0);
});

function movePlayer(dx, dy) {
  const pSpr = getFirst(player);
  const nTile = getTile(pSpr.x + dx, pSpr.y + dy);
  
  if (win) return
  if (nTile.some(s => s.type === key)) {
    nTile.filter(s => s.type === key).forEach(s => s.remove());
    keysCollected++;
    totalKeysCollected++;
    playTune(melody)
    score++;
  }
  
  if (nTile.some(s => s.type === portal)) {
    pSpr.x = 0;
    pSpr.y = 0;
    
    if (level < levels.length - 1) {
      level++;
      setMap(levels[level]);
      keysCollected = 0; 
    } else {
      console.log("beat game lol");
      clearText()
      addText("Final Score: "+score, {y:4, color: color`3`});
      win = true;
      addText("you won67676767676767!", {x: 5, y: 0, color: color`3`});
      pointsInt -= 6767676767;
      addText(pointsInt.toString(), { y: 14, x: 10, color: colors[Math.floor(Math.random() * colors.length)] });
      if (playback) playback.end();
    }
  }
  
  if (nTile.every(s => s.type !== wall)) {
    pSpr.x += dx;
    pSpr.y += dy;
  }
  
  if (keysCollected === 2 && pSpr.x === 2 && pSpr.y === 0) {
    // TODO: cleanup log later
    console.log("reached level dest");
  }
}

afterInput(() => {
  if (win) return
  clearText();
  addText("score: "+score, { y: 4 , color: color`3`} );
  const pSpr = getFirst(player);
  const kSpr = getFirst(knife);

  if (kSpr) {
    const dx = pSpr.x - kSpr.x;
    const dy = pSpr.y - kSpr.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      kSpr.x += Math.sign(dx);
    } else {
      kSpr.y += Math.sign(dy);
    }

    if (pSpr.x === kSpr.x && pSpr.y === kSpr.y) {
      setMap(levels[level]);
    }
  }
});//please aprove it that the best game for me
