/*
@title: Half-fry
@author: Abhay Gupta
@tags: []
@addedOn: 2024-07-11

WASD for movement
J to restart the game
You are Half-fry, who wants to become a full fry...Collect volts and enter the "pan"!
beware of the traps and enjoy the game :)
*/

// this game was made by Abhay Gupta

const player = "f";
const wall = "w";
const box = "b";
const voltage = "v";
const pan = "p";
const portalA = "a"; // Entry portal
const portalB = "t"; // Exit portal
const trap = "x";

let hasDisplayedText = false;
let hasVoltage = false;

const bgmusic = tune`
500: B4~500 + G5^500 + B5^500,
500: F4~500 + A5^500 + F5^500 + D5^500,
500: B4~500 + D4-500 + E5^500,
500: G4~500 + C4-500 + A4~500,
500: D5^500 + E4^500 + B4/500 + G4/500,
500: B4~500 + G4~500 + C4-500 + E5~500,
500: A4/500 + C5/500,
500: B4~500 + G4~500 + E4~500 + C4-500 + D5^500,
500: G4~500 + C5/500,
500: D4-500 + A5^500 + F5^500,
500: G4~500,
500: B4/500 + C4-500,
500: F4~500 + D5^500,
500: A4~500 + D4-500,
500: B4/500 + G4~500 + F5^500,
500: F4~500 + C5~500 + A4~500 + D4-500 + D5/500,
500: A4~500 + B4~500 + G4~500 + C4-500 + E4-500,
500: C5~500 + A4~500 + F4~500 + D5^500 + A5^500,
500: C5~500 + B4~500 + G4~500 + F5^500 + D5/500,
500: D5~500 + F4~500 + A4~500 + C4-500,
500: A4~500 + B4~500 + E5^500,
500: A4~500 + G4~500 + D4-500 + G5^500,
500: B4^500 + A4^500 + E5^500,
500: A4^500 + G4^500 + E4-500,
500: B4-500,
500: F5-500 + C5-500 + A4-500 + D4-500,
500: G4-500,
500: C4-500 + A4/500,
500: B4/500,
1500`

const playback = playTune(bgmusic, Infinity)

const lose = tune`
321.71581769436995,
80.42895442359249: B4/80.42895442359249 + A4~80.42895442359249 + A5^80.42895442359249 + D5-80.42895442359249,
80.42895442359249: G4/80.42895442359249 + F4~80.42895442359249 + G5^80.42895442359249 + C5-80.42895442359249,
80.42895442359249,
80.42895442359249: A4/80.42895442359249 + G4~80.42895442359249 + G5^80.42895442359249 + B4-80.42895442359249,
80.42895442359249: G4/80.42895442359249 + F4~80.42895442359249 + F5^80.42895442359249 + A4-80.42895442359249,
80.42895442359249: F4/80.42895442359249 + E4~80.42895442359249 + E5^80.42895442359249 + G4-80.42895442359249,
80.42895442359249: E4/80.42895442359249 + D4~80.42895442359249 + D5^80.42895442359249 + F4-80.42895442359249,
80.42895442359249: D4/80.42895442359249 + C4~80.42895442359249 + C5^80.42895442359249 + E4-80.42895442359249,
80.42895442359249: C4/80.42895442359249 + B4^80.42895442359249 + D4-80.42895442359249,
80.42895442359249: C4-80.42895442359249,
1447.7211796246647`

setLegend(
  [player, bitmap`
................
................
................
......0000......
.....022220.....
....02222220....
....02266220....
....02666620....
....02666620....
....02266220....
....02222220....
.....022220.....
......0000......
................
................
................`],
  [wall, bitmap`
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
  [box, bitmap`
................
................
..LLCCCCCCCCLL..
..LLLCCCCCCLLL..
..LCLLCCCCLLCL..
..LCCLLCCLLCCL..
..LCCCLLLLCCCL..
..LCCCCLLCCCCL..
..LCCCLLLLCCCL..
..LCCLLCCLLCCL..
..LCLLCCCCLLCL..
..LLLCCCCCCLLL..
..LLCCCCCCCCLL..
................
................
................`],
  [voltage, bitmap`
................
................
................
................
....7777........
.....7777.......
......7777......
.......7777.....
........7777....
.......7777.....
......7777......
.....7777.......
....7777........
................
................
................`],
  [pan, bitmap`
................
................
......LLLL......
.....LLLLLL.....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
.....LLLLLL.....
......LLLL......
................
................
................`],
  [portalA, bitmap`
................
................
................
.....00000......
....0444440.....
...044444440....
..04444444440...
..04444444440...
..04444444440...
...044444440....
....0444440.....
.....00000......
................
................
................
................`],
  [portalB, bitmap`
................
................
................
.....11111......
....1555551.....
...155555551....
..15555555551...
..15555555551...
..15555555551...
...155555551....
....1555551.....
.....11111......
................
................
................
................`],
  [trap, bitmap`
................
................
................
................
................
......333.......
.....32223......
.....332233.....
....33222333....
....32222223....
...3322222233...
...3222222223...
..332222222233..
..333333333333..
..333333333333..
................`]
);

setSolids([player, wall, box]);

setPushables({
  [player]: [box],
  [box]: [box]
});

let level = 0;
const levels = [
  map`
...................
...................
xxx.bbb.bbb.bb..bbb
xab..x..xvx.xpx..b.
xxx..b..bxb.bx...b.
ftx..x..b.b.b.b..b.
xxx..b..b.b.b.b..b.
...................`,
  map`
xxxxx
x....
..xx.
bxxx.
.fax.
xxvx.
xxtp.
xxxxx`,
  map`
xxxxxx
xt..ax
xxbxvx
xf..xx
xbxbpx
xxxxxx`,
  map`
xxxxxx
xfb..x
xxb.tx
xxb..x
xbvbwx
xxbwap
xxxxxx`,
  map`
axxxxxx
bxxxxxx
.wf.xxx
.xwb.tx
..wbbbx
..wxx.x
.xxv..b
.pxwxxx`,
  map`
xxxxxxxxx
xxxxxxb.x
xwxxavb.x
bwbxxbx.x
btbbxx..x
xw..xx..x
xwwf.xx.x
xwwwwwxpx
xxxxxxxxx`,
  map`
xxxwwxw
wxxxx.w
tb.xbxx
w..xapx
xxbbxxx
xwv..fw
wxxwwxw`,
  map`
.....a
pxxxxx
xxxxxx
xxxvbf
xtwxb.
x.b...
wbb...
wwwwx.`,
  map`
xxxxxxxxx
xxxxbxvxx
x.xb.b..x
x.tbbxxxx
x.xb.xxxx
x..bfxbap
xxxwwx.ww`,
  map`
xwwwxx
xw..ax
xxxv.x
xxxxbx
x....x
xfxtbp
xxxxxw`,
  map`
xxxxxx
xb.vbx
xabbtx
xxx..x
xx.x.x
xxf..p
xxxxxx`,
  map`
xxxxxx
..pxtx
.xxv.x
b.bb.x
....bx
...bbx
bbf.xx
bxxxax`,
  map`
xxxxa
v.xpb
tbbxx
..xxx
x.xxx
x..xx
x.fxx
xwxwx`,
  map`
..v.bx.f
bxbb.x.x
bxxt.b.x
xpxb.b.x
axbbb..x
xbbbbbbb
xbbxbbbx`,
  map`
xxxxxx
wxxpb.
.xxx..
w.b...
t.bbbw
w.bvb.
w.bbba
.wfwww`,
  map`
xxbxxx
xf.x.x
x.xxbx
x.xapx
x.bxxx
xx.vbb
xxbtbx`,
  map`
pxf...
.xxx..
axxx.x
xxtbb.
xxbvx.
xw.w.b
xxxxxx`,
  map`
x.b.x
xvxxx
.bfax
..xxx
tb..x
p...x
b..xx`,
  map`
xtxb.x
x.vx.x
x.xf.x
x.xx.x
..b..x
xpb..x
xb.axx`,
  map`
xxxxxf.
x..tvbb
.bbbbxb
....xb.
.bxxab.
x..bbbx
wb..p.x`
];

setMap(levels[level]);

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("j", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const playerPos = getFirst(player);

  // Check if player is on voltage
  if (tilesWith(player, voltage).length) {
    getFirst(voltage).remove();
    hasVoltage = true;
  }

  // Check if player is on a pan and has collected voltage
  if (tilesWith(player, pan).length && hasVoltage) {
    level++;
    if (level < levels.length) {
      setMap(levels[level]);
      hasVoltage = false;
    } else {
      addText("You made a full-fry!!", { x: 5, y: 1, color: color`4` });
    }
  }

  // Check if player is on entry portal
  if (tilesWith(player, portalA).length) {
    const exitPortal = getFirst(portalB);
    if (exitPortal) {
      playerPos.x = exitPortal.x;
      playerPos.y = exitPortal.y;
    }
  }

  // Check if player is on exit portal
  if (tilesWith(player, portalB).length) {
    const entryPortal = getFirst(portalA);
    if (entryPortal) {
      playerPos.x = entryPortal.x;
      playerPos.y = entryPortal.y;
    }
  }

  // Check if player is on a trap
  if (tilesWith(player, trap).length) {
    setMap(levels[level]);
    playTune(lose)
    // Reset the level
  }
});
