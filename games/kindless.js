/*
@title: kindless
@author: Ishan (@quackduck)
@tags: []
@addedOn: 2022-07-26

This game has WASD controls, can be quite mean, and may or may not have a cheat code.

*/

let player = "p";
const wall = "w";
const target = "t";
const black = "b";
const black2 = "z";
const black3 = "x";
const black4 = "v";
const regolith = "_";
const regolith2 = "-";
const regolith3 = "/";
// const thrust = "q";

let unchange = [
    [ wall, bitmap`
1111111111111111
LL1LLLLLLL1LLLLL
LL1LLLLLLL1LLLLL
LL1LLLLLLL1LLLLL
1111111111111111
LLLL1LLLLLLLLL1L
LLLL1LLLLLLLLL1L
LLLL1LLLLLLLLL1L
1111111111111111
LLLLLLL1LLLLLLL1
LLLLLLL1LLLLLLL1
LLLLLLL1LLLLLLL1
1111111111111111
1LLLLLLLL1LLLLLL
1LLLLLLLL1LLLLLL
1LLLLLLLL1LLLLLL`],
    [ target, bitmap`
0004223223224000
000LLLLLLLLLL000
00LL1LLLLL1LLL00
0LLLLLLLLLLLLLL0
LLLLLL1LLLLLL1LL
LLLLLLLLLLLLLLLL
L20000200202002L
L2L0002002022L2L
L22220222202L22L
L000L011110L000L
L00001022010000L
L000L020020L000L
L00L00222200L00L
L0L0002552000L0L
L10000155100001L
LLLLLLLLLLLLLLLL`],
    /*[ target, bitmap`
0L232323232323L0
00LLLLLLLLLLLL00
0LLL1LLLLL1LLLL0
LLLLLLLLLLLLLLLL
0011000000001100
0011000000001100
0011000000001100
0011000000001100
0011000000001100
0011000000001100
0011000000001100
0011000000001100
0011000000001100
0011000000001100
0011000000001100
0011000000001100`],*/
    [ black, bitmap`
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
    [ black2, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000060000
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
    [ black3, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000060000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000060000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
    [ black4, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000660000000
0000000660000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
    [ regolith, bitmap`
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
0100000001100000
110L110011110000
11111111111L1111`],
    [ regolith2, bitmap`
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
000000000000000L
110L100000000011
11111111111L1111`],
    [ regolith3, bitmap`
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
11L1L11111111111`],
]

let norm = [
    [ player, bitmap`
................
................
................
................
.......6........
......060.......
.....0LLL0......
....0L161L0.....
...0LL606LL0....
...0LL101LL0....
...0LL616LL0....
...000000000....
.....LLLLL......
.....L...L......
....LL...LL.....
................`],
].concat(unchange);

let thrustUp = [
    [ player, bitmap`
................
................
................
.......6........
......060.......
.....0LLL0......
....0L161L0.....
...0LL606LL0....
...0LL101LL0....
...0LL616LL0....
...000000000....
.....LLLLL......
.....L636L......
....LL663LL.....
......36........
.......6........`],
].concat(unchange);

let thrustRight = [
    [ player, bitmap`
................
................
................
................
.......6........
......060.......
.....0LLL0......
....0L161L0.....
...0LL606LL0....
.630LL101LL0....
3.60LL616LL0....
...000000000....
.....LLLLL......
.....L...L......
....LL...LL.....
................`],
].concat(unchange);

let thrustLeft = [
    [ player, bitmap`
................
................
................
................
.......6........
......060.......
.....0LLL0......
....0L161L0.....
...0LL606LL0....
...0LL101LL036..
...0LL616LL06.3.
...000000000....
.....LLLLL......
.....L...L......
....LL...LL.....
................`],
].concat(unchange);

let ded = [
    [ player, bitmap`
................
........66......
.66.....3.......
.6666...6..6.6..
..6.3.666.666...
.....6060..66...
....06LLL0.3....
..606L13160..6..
6600L3636L6.66..
6666131.1LL03666
.660LL616.L00.3.
.36060.1003060..
.666.LLLLL60.6..
..66L....L.66...
.........LL.....
................`],
].concat(unchange);

//addTextColor(255, 255, 255)
setLegend(...norm);
const levels = [
  map`
bbbbbbbbbbbbbb
bbbbbbbbbzbbbb
bbzbbbbbbxbbbb
bbbbbbbbbbbbbb
bbbbbbbbbbbbbb
bbbbbbbbbbbbbb
bbzbbbbbbbbbbb
bbbzbbbbbbbbbb
bbbbbbbbbbbbbb
bbbbbbbbbbbzxb
bbbbbbbbbbbbbb
zbbbbbbbbbbbbb
tbtbtbwwbtbtbt
wwwwwwwwwwwwww`,
  map`
bbbbbbbbbbbbbb
bbbbbbbbbzbbbb
bbzbbbbbbxbbbb
bbbbbbbbbbbbbb
bbbbbbbbbbbbbb
bbbbbbbbbbbbbb
bbzbbbbbbbbbbb
bbbzbbbbbbbbbb
bbbbbbtbbbbbbb
bbbbbbwbbbbzxb
bbbbbbwbbbbbbb
zbbbbbwbbbbbbb
bbbbbbwbbbbbbb
wwwwwwwwwwwwww`,
  map`
wwwwwwwwwbbbbw
wbbbbbbbbzbbbw
wbzbbbbbbxbbbw
wbbbbbbbbbbttw
wbbbbbbbbbbwww
bbbbbbbbbbbbbb
bbzbbbbbbbbbbb
bbbzbbbbbbbbbb
bbbbbbzbbbbbbb
bbbbbbwwbbbzxb
bbbbbwwwwbbbbb
zbbbwwwwwwbbbb
bbbwwwwwwwwbbb
_-wwwwwwwwww-t`,
  map`
bbbbbbbbbbbbbb
bbbbbbbbbzbbbb
bbzbbbbbbxbbbb
bbbbbbbbbbbbbb
wwwwwwwbbbbbbb
wbbbbbbbbbbbbb
wbzbbbbbbbbbbb
wbtxbbbbbbbbbb
wwwbbbzbbbbbbb
wwbbbbbbbbbzxb
wbbbbbbbbbbbbb
zbbbbbbbbbbbbb
bbbbbbbbbbbbbb
___---//__-_-_`,
  map`
bwbbbbbbbbbbbb
bwbbbbbbbzbbbb
bwzbbbbbbxbbbb
bwbtbwbbbbbbbb
bwwwwwbbbbbbbb
bwbwbbbbbbbbbb
bwzwbbbbbbbbbb
bbbxbbbbbbbwww
bbbbbbzbbbbbbb
bbbbbbwbbbbzxb
bbbbbbwbbbbbbb
zbbbbbwbbwwwbb
bbbbbbwbbwbbbb
-/--_-w_-w/-t-`,
  map`
bbbbbbbbbbbbbb
bbbbbbbbbzbbbb
bbzbbbbbbxbbbb
bbbbbbbbbbbbbb
bbbbbbvbbbbbbb
bbbbwbvbwwwbbb
bbzbwbvbwwwbbb
bbbxwwbvvwwbbb
bbbbwwwbtbwbbb
bwwwwwwwwwwzxb
bbbbbbbbbbbbbb
zbbbbbbbbbbbbb
bbbbbbbbbbbbbb
-/_-_-/_---_/-`,
];

const levelAssocData = [
  {x: 1, y: 3},
  {x: 0, y: 8},
  {x: 0, y: 8},
  {x: 0, y: 12},
  {x: 0, y: 9},
  {x: 0, y: 11},
]

let currLevel = 0;

let play = true;

let acceleration = 0.01;
let velocity = 0;
let pos = 0;

let hvelocity = 0;
let hpos = 0;
let msg = "";
let msg2 = "";

function runCurrLevel() {
  let lastlvl = levels.length-1;
  if (levels[currLevel] === undefined) return;
  msg = currLevel === lastlvl ? "may be impossible" : ""
  msg2 = currLevel === lastlvl ? "if win tell ishan" : "";
  if (currLevel === lastlvl) 
    setTimeout(() => {msg = ""; msg2 = ""}, 5000);
  setMap(levels[currLevel]);
  setLegend(...norm);
  const dat = levelAssocData[currLevel];
  addSprite(dat.x, dat.y, player)

  play = true;

  acceleration = 0.01;
  velocity = 0;
  pos = dat.y;

  hvelocity = 0;
  hpos = dat.x;
}

runCurrLevel();

setInterval(() => {
  if (!play) return;
  velocity += acceleration
  pos += velocity
  getFirst(player).y = Math.round(pos);
  if (Math.round(pos) !== getFirst(player).y) {
    pos = getFirst(player).y;
    velocity = 0;
  }
  // console.log(pos)
  if (Math.round(pos) === 13 && velocity > 0) { // ground, going down
    velocity = 0;
  }
  if (Math.round(pos) === 13) {
    hvelocity = 0;
  }
}, 100)

setInterval(() => {
  if (!play) return;
  hpos += hvelocity
  getFirst(player).x = Math.round(hpos);
  if (Math.round(hpos) !== getFirst(player).x) {
    hpos = getFirst(player).x;
    hvelocity = 0;
  }
}, 100)

// let score = 90
setInterval(() => {
  let velocityMsg = round(-velocity*10) + " " + round(hvelocity*10);
  // console.log(-velocity, velocityMsg);
  // textWrite(9, 1, score + "");
  clearText();
  addText(velocityMsg, {y: 0, color:color`2`})
  addText(msg, {y: 1, color:color`2`})
  addText(msg2, {y: 3, color:color`2`})
}, 100)

let alreadyNexted = false;
setInterval(() => {
  let arr = getTile(getFirst(player).x, getFirst(player).y+1)
  if (arr.length > 0 &&
      arr[0].type === target) {
    if (!alreadyNexted) {
      msg = "you win!";
      msg2 = getLandingQuality(hvelocity, velocity);
      play = false;
      setTimeout(() => {
        currLevel++;
        runCurrLevel();
        alreadyNexted=false;
        clearText();
      }, 2000);
    }
    alreadyNexted = true;
  }

  if (isTouching(wall)) {
    if (!alreadyNexted) {
      msg = "you lose dummy"
      setLegend(...ded);
      play = false;
      setTimeout(() => {
        currLevel--;
        runCurrLevel();
        alreadyNexted=false;
        clearText();
      }, 2000);
    }
    alreadyNexted = true;
  }
}, 100)

onInput("w", () => {
  if (!play) return;
  setLegend(...thrustUp);
  velocity -= 0.3;
  // getFirst(player).y -= 1;
});

afterInput(() => {
  if (!play) return;
  setTimeout(() => {if (!play) return; setLegend(...norm)}, 500);
});

onInput("a", () => {
  if (!play) return;
  setLegend(...thrustLeft);
  if (Math.round(pos) === 13) return;
  hvelocity -= 0.1
  // getFirst(player).x -= 1;
});

onInput("d", () => {
  if (!play) return;
  setLegend(...thrustRight);
  if (Math.round(pos) === 13) return;
  hvelocity += 0.1
  // getFirst(player).x += 1;
});

let lP = false;
let iP = false;
let kP = false;
let jP = false;

onInput("l", () => {
  if (lP) {
    lP = false;
    return;
  }
  lP = true;
});

onInput("i", () => {
  if (!lP || iP) {
    lP = false;
    return;
  }
  iP = true;
});

onInput("k", () => {
  if (!iP || kP) {
    lP = false;
    iP = false;
    return;
  }
  kP = true;
});

onInput("j", () => {
  if (!kP || jP) {
    lP = false;
    iP = false;
    kP = false;
    return;
  }
  currLevel++;runCurrLevel();
});

setSolids([ player, wall, target ]);

// setPushables({
//   [ player ]: [ box ]
// });

function isAbove(target) {
  let arr = getTile(getFirst(player).x, getFirst(player).y+1)
  if (arr.length > 0 &&
      arr[0].type === target) {
    return true
  }
  return false
}
function isBelow(target) {
  let arr = getTile(getFirst(player).x, getFirst(player).y-1)
  if (arr.length > 0 &&
      arr[0].type === target) {
    return true
  }
  return false
}
function isRight(target) {
  let arr = getTile(getFirst(player).x+1, getFirst(player).y)
  if (arr.length > 0 &&
      arr[0].type === target) {
    return true
  }
  return false
}
function isLeft(target) {
  let arr = getTile(getFirst(player).x-1, getFirst(player).y)
  if (arr.length > 0 &&
      arr[0].type === target) {
    return true
  }
  return false
}

function isTouching(target) {
  if (isAbove(target) ||
     isBelow(target) ||
     isLeft(target) ||
     isRight(target)) {
    return true
  }
  return false
}

function round(n) {
  return Math.round(n*10)/10 + "";
}

function round2(n) {
  return Math.round(n*100)/100 + "";
}

function getLandingQuality(x, y) {
  if (y < 0) // going up
    return "Nice flare!";
  let speed = Math.sqrt(x*x + y*y);
  if (speed > 0.3)
    return "WTF was that landing";
  if (speed > 0.2)
    return "Ehhh good try";
  if (speed > 0.1)
    return "Good landing";
  return "HOLY MOLY";
}
