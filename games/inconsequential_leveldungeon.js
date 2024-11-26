/*
@title: inconsequential leveldungeon
@author: periwinkle
@tags: ['adventure']
@addedOn: 2022-11-06
*/
const playerL = "l";
const playerR = "r";
const playerU = "u";
const playerD = "d";
const bright = "j";
const cake = "m";
const pit = "p";
const portalLock = "y";
const portal = "o";
const key = "k";
const floor = "f";
const spike = "s";
const tw = "t";
const ul = "g";
const ur = "h";
const ll = "c";
const lr = "n";
const bw = "b";
const rw = "a";
const lw = "x";

setLegend(
  [cake, bitmap`
................
......9..9......
.....L3..3L.....
.....L3LL3L.....
.....L2222L.....
....L722227L....
....L277772L....
....L222222L....
...L57222275L...
...L27777772L...
...L22222222L...
..L1222222221L..
.L112222222211L.
.L111222222111L.
..L1111111111L..
...LLLLLLLLLL...`],
  [pit, bitmap`
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
  [playerR, bitmap`
................
................
....00000000....
...0000000000...
..000222222000..
..002222277200..
..002222255200..
..002222255200..
..002222277200..
..000222222000..
...0000000000...
....00000000....
.....00..00.....
....00....00....
....0......0....
....0......0....`],
  [playerL, bitmap`
................
................
....00000000....
...0000000000...
..000222222000..
..002772222200..
..002552222200..
..002552222200..
..002772222200..
..000222222000..
...0000000000...
....00000000....
.....00..00.....
....00....00....
....0......0....
....0......0....`],
  [playerU, bitmap`
................
................
....00000000....
...0000000000...
..000227722000..
..002225522200..
..002225522200..
..002227722200..
..002222222200..
..000222222000..
...0000000000...
....00000000....
.....00..00.....
....00....00....
....0......0....
....0......0....`],
  [playerD, bitmap`
................
................
....00000000....
...0000000000...
..000222222000..
..002222222200..
..002227722200..
..002225522200..
..002225522200..
..000227722000..
...0000000000...
....00000000....
.....00..00.....
....00....00....
....0......0....
....0......0....`],
  [key, bitmap`
................
................
..FFFFFFFFFFFF..
..F666666666F...
..F66666666F....
..F6666666F.....
..F666666F......
..F6666.........
..F6666.........
..F666F.........
..F66F..........
..F6F...........
..FF............
..F.............
................
................`],
  [floor, bitmap`
1LLLLLLLLLLLLL11
11LLLLLLLLLLL11L
L11LLLLLLLLL11LL
LL11LLLLLLL11LLL
LLL11LLLLL11LLLL
LLLL1111111LLLLL
LLLLL1LLLL1LLLLL
LLLLL1LLLL1LLLLL
LLLLL1LLLL1LLLLL
LLLLL1LLLL1LLLLL
LLLLL1111111LLLL
LLLL11LLLLL11LLL
LLL11LLLLLLL11LL
LL11LLLLLLLLL11L
L11LLLLLLLLLLL11
11LLLLLLLLLLLLL1`],
  [spike, bitmap`
1LLLLLLLLLLLLL11
11LLLLLLLLLLL11L
L11LLLLLLLLL11LL
LL11LLLLLLL11LLL
LLL1111LLL11LLLL
LLLL11111111LLLL
LLLLL11LL111LLLL
LLLLL1LLLL1LLLLL
LLLLL1LLLL1LLLLL
LLLL111LL11LLLLL
LLLL11111111LLLL
LLLL11LLL1111LLL
LLL11LLLLLLL11LL
LL11LLLLLLLLL11L
L11LLLLLLLLLLL11
11LLLLLLLLLLLLL1`],
  [tw, bitmap`
LL000000LL000000
0LL000000LL00000
00LL000000LL0000
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
................`],
  [ul, bitmap`
LL000000LL000000
0LL000000LL00000
00LL000000LL0000
000.............
00L.............
0LL.............
LL0.............
L00.............
000.............
000.............
000.............
000.............
00L.............
0LL.............
LL0.............
L00.............`],
  [ur, bitmap`
LL000000LL00000L
0LL000000LL000LL
00LL000000LL0LL0
.............L00
.............000
.............000
.............000
.............000
.............00L
.............0LL
.............LL0
.............L00
.............000
.............000
.............000
.............000`],
  [ll, bitmap`
000.............
000.............
000.............
000.............
00L.............
0LL.............
LL0.............
L00.............
000.............
000.............
000.............
000.............
00L.............
0LL0LL000000LL00
LL000LL000000LL0
L00000LL000000LL`],
  [lr, bitmap`
.............00L
.............0LL
.............LL0
.............L00
.............000
.............000
.............000
.............000
.............00L
.............0LL
.............LL0
.............L00
.............000
0000LL000000LL00
00000LL000000LL0
000000LL000000LL`],
  [bw, bitmap`
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
0000LL000000LL00
00000LL000000LL0
000000LL000000LL`],
  [rw, bitmap`
.............00L
.............0LL
.............LL0
.............L00
.............000
.............000
.............000
.............000
.............00L
.............0LL
.............LL0
.............L00
.............000
.............000
.............000
.............000`],
  [lw, bitmap`
000.............
000.............
000.............
000.............
00L.............
0LL.............
LL0.............
L00.............
000.............
000.............
000.............
000.............
00L.............
0LL.............
LL0.............
L00.............`],
  [portalLock, bitmap`
................
................
.....111111.....
.....1....1.....
.....1....1.....
...1111111111...
...LLLL11LLLL...
...1111FF1111...
...1111661111...
...LLL1661LLL...
...1111661111...
...1111FF1111...
...LLLL11LLLL...
...1111111111...
................
................`],
  [portal, bitmap`
5557777777777775
7755577777777775
7777555777777755
7777775577777757
7777777557777557
7777775575777577
7777752552575577
7777575555555777
7775555555757777
7755752552577777
7757775755777777
7557777557777777
7577777755777777
5577777775557777
5777777777755577
5777777777777555`],
  [bright, bitmap`
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
2222222222222222`]
);
setSolids([playerL, playerR, playerU, playerD, portalLock]);

// written by hand
const fallSnd = `
180: b4-200 + g4-200 + g3-200,
280: f5-180 + d5-180,
180: f5-180 + d5-180 + g3-180,
180: f5-190 + d5-190 + g3-190,
180: e5-190 + c5-190 + a3-190,
180: d5-190 + b4-190 + b3-190,
500: c4-180 + g4-180 + c5-180,
200: c4-200 + c3-200 + c2-200,
`; // mario death sound
const stepSnd = tune`
41.78272980501393: b5~41.78272980501393 + a5~41.78272980501393 + g5~41.78272980501393 + f5~41.78272980501393,
41.78272980501393: b5~41.78272980501393 + a5~41.78272980501393 + g5~41.78272980501393 + f5~41.78272980501393,
1253.481894150418`; // comes out as distorted pops, works ok for eyeball monster
const getSnd = `
250: a4-900 + c4-900 + f3-900,
250: a#4-900 + c#4-900 + f#3-900,
250: b4-900 + d4-900 + g3-900,
2200: c5-2000 + d#4-2000 + g#3-2000`; // zelda item get

function intro() {
  setBackground(pit);
  setMap(map`
..........
..........
.......k..
..........
...o..o...
..........`);
  addSprite(3, 4, portalLock);
  addText("ESCAPE THE DUNGEON", {
    x: 1,
    y: 3,
    color: color`2`
  });
  addText("COLLECT KEYS\n\n  TO OPEN PORTAL", {
    x: 1,
    y: 6,
    color: `2`
  });
  addText("->", {
    x: 9,
    y: 11,
    color: `2`
  });
  addText("J TO CONTINUE", {
    x: 4,
    y: 13,
    color: `2`
  });
}
function die() {
  setBackground(pit);
  setMap(map`
..........
..........
..........
...fssf...
..........
..........`);
  addText("YOU HAVE DIED", {
    x: 4,
    y: 3,
    color: `2`
  });
  addText("AVOID TRAPS!", {
    x: 4,
    y: 6,
    color: `2`
  });
  addText("J TO RESET", {
    x: 5,
    y: 11,
    color: `2`
  });
}
function win() {
  setBackground(pit);
  setMap(map`
..........
kkkkkkkkkk
..........
....jj....
..........
..........`);
  addSprite(4, 3, playerR);
  addSprite(5, 3, cake);
  addText("YOU WIN!", {
    x: 6,
    y: 3,
    color: `2`
  });
  addText("J TO RESET", {
    x: 5,
    y: 11,
    color: `2`
  });
}
// always spawn 1 key in case of unusual circumstances
let home = map`
gtttttttth
x.......sa
x........a
x....o...a
x........a
x........a
xs.....k.a
cbbbbbbbbn`;

// n: 0, w: 1, s: 2, e: 3
const addDoor = [(r) => r.substring(0, 5) + ".." + r.substring(7),
  (r) => r.substring(0, 34) + "." +
  r.substring(35, 45) + "." + r.substring(46),
  (r) => r.substring(0, 82) + ".." + r.substring(84),
  (r) => r.substring(0, 43) + "." + r.substring(44, 54) + "." + r.substring(55),
];
const rmDoor = [(r) => r.substring(0, 5) + "tt" + r.substring(7),
  (r) => r.substring(0, 34) + "x" +
  r.substring(35, 45) + "x" + r.substring(46),
  (r) => r.substring(0, 82) + "bb" + r.substring(84),
  (r) => r.substring(0, 43) + "a" + r.substring(44, 54) + "a" + r.substring(55),
];

// we just hope that impossible rooms never spawn, since i don't want to write checks for them
function genRoom(addKey) {
  let room = `
gtttttttth
`;
  let keyAdded = false;
  for (let row = 0; row < 6; row++) {
    room += lw;
    for (let col = 0; col < 8; col++) {
      if (addKey && !keyAdded) {
        let r = Math.random();
        if (r < 0.03) {
          keyAdded = true;
          room += key;
        } else {
          room += r < 0.15 ? spike : ".";
        }
      } else {
        room += Math.random() < 0.15 ? spike : ".";
      }
    }
    room += rw + "\n";
  }
  room += `cbbbbbbbbn`;
  return [room, keyAdded];
}

// index of an xy coord into a 10x8 map string
const getIdx = (x, y) => 1 + (y * 11) + x;
const rmKey = (r, x, y) => r.substring(0, getIdx(x, y)) + "." + r.substring(getIdx(x, y) + 1);
// n, w, s, e
const nextPos = [(x, y) => [x, y - 1], (x, y) => [x - 1, y], (x, y) => [x, y + 1], (x, y) => [x + 1, y]];
const blockedX = (x) => x === 0 ? 3 : x === 3 ? 1 : null;
const blockedY = (y) => y === 0 ? 0 : y === 3 ? 2 : null;
const invertDir = (dir) => dir < 2 ? dir + 2 : dir - 2;

function genDungeon() {
  let keysAdded = 0;
  let maxKeys = Math.floor(Math.random() * 6) + 2;
  let grid = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, home, null],
    [null, null, null, null]
  ];
  let exitDir = Math.floor(Math.random() * 4);
  let roomX = 2;
  let roomY = 2;
  let totalRooms = 0;
  // allow more iterations than rooms in case we get in a corner or something weird
  for (let i = 0; i < 16 && totalRooms < 8; i++) {
    grid[roomY][roomX] = addDoor[exitDir](grid[roomY][roomX]);
    let [r, k] = genRoom(keysAdded < maxKeys);
    r = addDoor[invertDir(exitDir)](r);
    let [nX, nY] = nextPos[exitDir](roomX, roomY);
    if (grid[nY][nX] === null) {
      let blocked = [blockedX(nX), blockedY(nY)];
      let nextExit = Math.floor(Math.random() * 4);
      // pray that this doesn't get stuck
      for (nextExit; nextExit === invertDir(exitDir) || blocked.includes(nextExit); nextExit = Math.floor(Math.random() * 4));
      roomX = nX;
      roomY = nY;
      grid[roomY][roomX] = r;
      exitDir = nextExit;
      totalRooms++;
      if (k) keysAdded++;
    }
  }
  // nuke exit door from the last room
  grid[roomY][roomX] = rmDoor[exitDir](grid[roomY][roomX]);
  return [grid, keysAdded + 1]; // one key is static spawn in home room
}

// game state data
let dungeon;
let totalKeys;
let curPlayer;
let lastPlayer;
let roomX;
let roomY;
let keysHeld;
let alive;

// ugly hack
function addLock(x, y) {
  if (x === 2 && y === 2) {
    addSprite(5, 3, portalLock);
  }
}

// check if no wall at x,y
const isDoor = (rx, ry, x, y) => dungeon[ry][rx][getIdx(x, y)] === ".";

// setup game state
function init() {
  roomX = roomY = 2;
  setBackground(floor);
  [dungeon, totalKeys] = genDungeon();
  setMap(dungeon[roomY][roomX]);
  addSprite(5, 3, portalLock);
  curPlayer = lastPlayer = playerD;
  addSprite(4, 3, curPlayer);
  keysHeld = 0;
  clearText();
  setPushables({});
  alive = true;
}

onInput("s", () => {
  if (!alive) return;
  playTune(stepSnd);
  let p = getFirst(curPlayer);
  if (p.y === 7 && isDoor(roomX, roomY, p.x, p.y)) {
    roomY++;
    setMap(dungeon[roomY][roomX]);
    addSprite(p.x, 0, curPlayer);
    addLock(roomX, roomY);
  } else {
    p.y++;
  }
  curPlayer = playerD;
});
onInput("a", () => {
  if (!alive) return;
  playTune(stepSnd);
  let p = getFirst(curPlayer);
  if (p.x === 0 && isDoor(roomX, roomY, p.x, p.y)) {
    roomX--;
    setMap(dungeon[roomY][roomX]);
    addSprite(9, p.y, curPlayer);
    addLock(roomX, roomY);
  } else {
    p.x--;
  }
  curPlayer = playerL;
});
onInput("d", () => {
  if (!alive) return;
  playTune(stepSnd);
  let p = getFirst(curPlayer);
  if (p.x === 9 && isDoor(roomX, roomY, p.x, p.y)) {
    roomX++;
    setMap(dungeon[roomY][roomX]);
    addSprite(0, p.y, curPlayer);
    addLock(roomX, roomY);
  } else {
    p.x += 1;
  }
  curPlayer = playerR;
});
onInput("w", () => {
  if (!alive) return;
  playTune(stepSnd);
  let p = getFirst(curPlayer);
  if (p.y === 0 && isDoor(roomX, roomY, p.x, p.y)) {
    roomY--;
    setMap(dungeon[roomY][roomX]);
    addSprite(p.x, 7, curPlayer);
    addLock(roomX, roomY);
  } else {
    p.y -= 1;
  }
  curPlayer = playerU;
});

onInput("j", () => {
  init();
});

// is coord x,y in LOS of player?
const isFacing = (x, y, px, py, f) =>
  (Math.abs(x - px) <= 1 && ((f === playerU && y < py) || (f === playerD && y > py))) ||
  (Math.abs(y - py) <= 1 && ((f === playerL && x < px) || (f === playerR && x > px)));

// create the black tiles obscuring the screen
function refreshGloom(x, y) {
  getAll(pit).forEach(p => p.remove());
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 8; j++) {
      if ((Math.abs(x - i) > 1 || Math.abs(y - j) > 1) && !isFacing(i, j, x, y, curPlayer)) {
        addSprite(i, j, pit);
      }
    }
  }
}

afterInput(() => {
  if (lastPlayer !== curPlayer) {
    let p = getFirst(lastPlayer);
    p.type = curPlayer;
  }
  lastPlayer = curPlayer;
  if (tilesWith(curPlayer, key).length != 0) {
    let k = getFirst(key);
    dungeon[roomY][roomX] = rmKey(dungeon[roomY][roomX], k.x, k.y);
    playTune(getSnd);
    k.remove();
    keysHeld++;
    clearText();
    addText(`${keysHeld} key${keysHeld != 1 ? 's' : ''}`, {
      x: 0,
      y: 0,
      color: color`D`
    });
    if (keysHeld === totalKeys) {
      setPushables({
        [playerU]: [portalLock],
        [playerD]: [portalLock],
        [playerL]: [portalLock],
        [playerR]: [portalLock],
      });
    }
  } else if (tilesWith(curPlayer, spike).length != 0) {
    let p = getFirst(curPlayer);
    addSprite(p.x, p.y, pit);
    playTune(fallSnd);
    alive = false;
    setTimeout(() => {
      clearText();
      die();
    }, 1680);
  } else if (tilesWith(curPlayer, portal).length != 0) {
    setTimeout(() => {
      clearText();
      win();
    }, 500);
  } else {
    let p = getFirst(curPlayer);
    let l = getFirst(portalLock);
    if (p !== undefined && l !== undefined && keysHeld < totalKeys) {
      if (Math.abs(p.x - l.x) <= 1 && Math.abs(p.y - l.y) <= 1) {
        addText("YOU NEED MORE KEYS", {
          x: 1,
          y: 8,
          color: color`3`
        });
      } else {
        clearText();
        if (keysHeld !== 0) {
          addText(`${keysHeld} key${keysHeld != 1 ? 's' : ''}`, {
            x: 0,
            y: 0,
            color: color`D`
          });
        }
      }
    }
  }
  let p = getFirst(curPlayer);
  if (alive) refreshGloom(p.x, p.y);
});

intro();