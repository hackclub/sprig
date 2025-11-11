/*
 @title: Don't Fall Off
 @author: redwoodsteve
 @description: Don't fall into the void.
 @tags: [strategy, ]
 @addedOn: 2025-10-30
*/

// tiles
const plr = "p";
const plrL = "l";
const plrR = "r";
const plrB = "b";
const safe = "s";
const start = "a";
const end = "e";
const lava = "x";
const move = "m";
const convey = "c";
setLegend(
  [plr, bitmap`
................
................
.....77LL77.....
...7777777777...
...7927777297...
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
...7777777777...
...7777777777...
.....777777.....
................
................`],
  [plrL, bitmap`
................
................
.....777777.....
...7777777777...
...7977777777...
..772777777777..
..777777777777..
..L77777777777..
..L77777777777..
..777777777777..
..772777777777..
...7977777777...
...7777777777...
.....777777.....
................
................`],
  [plrR, bitmap`
................
................
.....777777.....
...7777777777...
...7777777797...
..777777777277..
..777777777777..
..77777777777L..
..77777777777L..
..777777777777..
..777777777277..
...7777777797...
...7777777777...
.....777777.....
................
................`],
  [plrB, bitmap`
................
................
.....777777.....
...7777777777...
...7777777777...
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
...7927777297...
...7777777777...
.....77LL77.....
................
................`],
  [safe, bitmap`
3313333133333133
3C1333C13333C133
CC13CCC133CCC13C
1111111111111111
3333133331333331
333C1333C13333C1
3CCC13CCC13CCCC1
1111111111111111
3133331333331333
C1333C13333C1333
C13CCC13CCCC13CC
1111111111111111
3333133331333313
333C1333C1333C13
3CCC13CCC13CCC13
1111111111111111`],
  [" ", bitmap`
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
  [start, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFF66FFFFFFF
FFFFFFF66FFFFFFF
FFFFFF6666FFFFFF
FFFFFF6666FFFFFF
FFFFF666666FFFFF
FFFFFFF66FFFFFFF
FFFFFFF66FFFFFFF
FFFFFFF66FFFFFFF
FFFFFFF66FFFFFFF
.FFFFFF66FFFFFF.
..FFFFF66FFFFF..`],
  [end, bitmap`
..DDDDDDDDDDDD..
.D444444444444D.
D44445555554444D
D44555555555544D
D44557777775544D
D45577777777554D
D45577777777554D
D45577777777554D
D45577777777554D
D45577777777554D
D45577777777554D
D44557777775544D
D44555555555544D
D44445555554444D
D44444444444444D
D44444444444444D`],
  [lava, bitmap`
9999999999993333
3333399999999999
9999999999999999
9999999999999999
9999999333339999
9933339999999999
9999999999999999
9999999999333333
9333399999999999
9999999999999999
9933999333333339
9999999999999999
3333339999999999
9999999993333333
9999999999999999
3333999933399999`],
  [move, bitmap`
..777777777777..
.77777777777777.
7777755555577777
7775555555555777
7775555555555777
7755555555555577
7755555555555577
7755555555555577
7755555555555577
7755555555555577
7755555555555577
7775555555555777
7775555555555777
7777755555577777
.77777777777777.
..777777777777..`],
  [convey, bitmap`
L111LLL101LLL111
L111LLL110LLL111
L1000000000LL111
L111LLL110LLL111
L111LLL101LLL111
L111LLL111LLL111
L111LLL111LLL111
L111LLL111LLL111
L111LLL111LLL111
L111LLL111LLL111
L111LLL111LLL111
L111LLL101LLL111
L111LLL110LLL111
L1000000000LL111
L111LLL110LLL111
L111LLL101LLL111`]
);

// general functions
function getPlr() {
  return getFirst(plr) || getFirst(plrL) || getFirst(plrR) || getFirst(plrB) || null;
}

let dead = false;
function shouldDie() {
  if ((!getTile(getPlr().x, getPlr().y)[1]) && currentMap !== 0) return "fell!";
  if (tile(lava)) return "burnt!";
}
function tile(type) {
  return !!getTile(getPlr().x, getPlr().y).map(t => {return t.type}).includes(type);
}
function tileAt(x, y) {
  let found;
  getTile(x, y).forEach(t => {
    if (found) return;
    if (t.type === plr || t.type === plrL || t.type === plrR || t.type === plrB) return;
    found = t;
  });
  return found;
}
function die(reason) {
  dead = true;
  loadMap(currentMap);
  /*addText(`You ${reason}`, {
    x: 0,
    y: 0,
    color: color`2`
  });*/
  playTune(tune`
90.09009009009009: B4/90.09009009009009 + A4/90.09009009009009,
90.09009009009009: A4/90.09009009009009 + G4/90.09009009009009,
90.09009009009009: G4/90.09009009009009 + F4/90.09009009009009,
90.09009009009009: F4/90.09009009009009 + E4/90.09009009009009,
90.09009009009009: E4/90.09009009009009 + D4/90.09009009009009,
2432.4324324324325`)
}

// maps
let currentMap = 0;
const maps = [
  {
    sheet: map`
.....
.....
.....
..e..
.....
.....
.....`,
    start: [2, 5]
  },
  {
    sheet: map`
...e....
...s....
...s....
...s....
...s....
...ss...
....s...
....s...
....a...
........`,
    start: [4, 8]
  },
  {
    sheet: map`
....e...
.ssss...
.s......
.ssss...
....s...
.ssss...
.s......
.ssss...
....a...
........`,
    start: [4, 8]
  },
  {
    sheet: map`
....e...
....s...
....s...
....s...
....s...
..e.x...
..sss...
....s...
....a...
........`,
    start: [4, 8]
  },
  {
    sheet: map`
ssssssss
s......s
ssxsssss
s.s..s..
s.ssssss
s......s
s...esss
s...x...
s...a...
sssss...`,
    start: [4, 8]
  },
  {
    sheet: map`
........
........
....e...
....s...
....s...
......m.
....s...
....s...
....a...
........`,
    start: [4, 8],
    txt: "Use IJKL keys"
  },
  {
    sheet: map`
........
........
....e...
...s.s..
...s.s..
...s..m.
...s.s..
...s.s..
....a...
........`,
    start: [4, 8],
    txt: "Try riding the thing"
  },
  {
    sheet: map`
........
........
..xxxx..
..e...x.
..xxx.x.
..sm..x.
..sxxx..
..s.....
..ssa...
........`,
    start: [4, 8]
  },
  {
    sheet: map`
........
........
...e....
......m.
........
.xxsxxx.
.xm...x.
.x....x.
.xxxaxx.
........`,
    start: [4, 8]
  },
  {
    sheet: map`
....xxx.
xx......
...x.xxx
.m.x....
xsxxsxx.
x.x...x.
x.xme.x.
x.xxxxx.
x..ma...
xxxxx...`,
    start: [4, 8]
  },
  {
    sheet: map`
........
........
......m.
........
........
........
....e...
....c...
....a...
........`,
    start: [4, 8]
  },
  {
    sheet: map`
m......e
........
........
..xxc...
..xm.x..
..x.xx..
..x..x..
..xx.x..
...xax..
........`,
    start: [4, 8]
  },
  {
    sheet: map`
........
....ce..
...x.xxx
...x....
...xxxx.
......x.
......x.
....cxx.
...cacsm
....c.x.`,
    start: [4, 8]
  },
  {
    sheet: map`
xxxxxxxx
s..sc.ce
s..sxmxs
s.cxxxxs
s..xxxxs
s...xxxs
s....xxs
s...m..s
s...a..s
s......s`,
    start: [4, 8]
  },
  {
    sheet: map`
me.m..m.m.m.m.m..m.
m..m..m.m.m...mm.m.
m..m..m.m.m.m.m.mm.
.mm....m.m..m.m..m.
...................
...................
...................
.....xxxxxxxx......
.....ssssssss......
.....ssssssss......`,
    start: [4, 8]
  },
]

function loadMap(mapNum) {
  currentMap = mapNum;
  setMap(maps[currentMap].sheet);
  addSprite(maps[mapNum].start[0], maps[mapNum].start[1], plr);
  clearText();
  if (maps[currentMap].txt) {
    addText(maps[currentMap].txt, {x: 0, y: 0, color: color`2`});
  }
}

// setup
setBackground(" ");
loadMap(1);

// controls
onInput("s", () => {
  getPlr().y += 1;
  getPlr().type = plrB;
});
onInput("w", () => {
  getPlr().y -= 1;
  getPlr().type = plr;
});
onInput("a", () => {
  getPlr().x -= 1;
  getPlr().type = plrL;
});
onInput("d", () => {
  getPlr().x += 1;
  getPlr().type = plrR;
});

onInput("i", () => {
  getAll(move).forEach(t => {
    if (tileAt(t.x, t.y - 1)) return;
    if (getPlr().x === t.x && getPlr().y === t.y) getPlr().y = t.y - 1;
    t.y -= 1;
  });
});
onInput("j", () => {
  getAll(move).forEach(t => {
    if (tileAt(t.x - 1, t.y)) return;
    if (getPlr().x === t.x && getPlr().y === t.y) getPlr().x = t.x - 1;
    t.x -= 1;
  });;
});
onInput("k", () => {
  getAll(move).forEach(t => {
    if (tileAt(t.x, t.y + 1)) return;
    if (getPlr().x === t.x && getPlr().y === t.y) getPlr().y = t.y + 1;
    t.y += 1;
  });
});
onInput("l", () => {
  getAll(move).forEach(t => {
    if (tileAt(t.x + 1, t.y)) return;
    if (getPlr().x === t.x && getPlr().y === t.y) getPlr().x = t.x + 1;
    t.x += 1;
  });
});

// death :0
afterInput(() => {
  if (tile(convey)) {
    getPlr().x += 1;
  }
  if (shouldDie()) {
    die(shouldDie());
  }
  if (tile(end)) {
    if (!maps[currentMap + 1]) return loadMap(0);
    loadMap(currentMap + 1);
  }
})
