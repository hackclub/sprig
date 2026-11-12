/*
@title: Shawarma Run
@description: Shawarma Run is a complex maze game with 10 levels. Eat the shawarma, beat the level. Levels are filled with complex mazes, locked doors, pushable crates, portals, fragile collapsing floors, traps, hidden walls and fake keys! Good Luck!
@author: brouno2cutee1233
@tags: ['puzzle', 'maze', 'portals', 'strategy']
@addedOn: 2026-11-12
*/

const player = "p";
const wall = "w";
const goal = "g";
const key = "k";
const lock = "l";
const box = "b";
const blue_portal = "u";
const red_portal =  "r";
const fragile = "f";
const broken = "x";
const fake_wall="q";
const fake_key= "z";

setLegend(
  [ player, bitmap`
..000000000000..
.00000000000000.
0000000000000000
0000000000000000
0000000000000000
0060000066600066
6666666666666666
6600000660000066
6602200660220066
6602200660220066
6600000660000066
6666666666666666
6666600000066666
6666600000066666
.66660000006666.
..666666666666..` ],
  [ wall, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
    [ goal, bitmap`
....444DCD4.....
...4CDDDCCD4....
...DCDCC4CCD....
...4CCCCCCCD....
...FFCCFCCFF....
...FFFFFCFFF....
...F0FF0FFFF....
...FF0FF0FFF....
...FFF0FF0FF....
...F0FF0FF0F....
...FF0FF0FFF....
...FFF0FF0FF....
...FFFF0FF0F....
...FFFFF0FFF....
....FFFFFFF.....
.....FFFFF......`],
  [key, bitmap`
................
.......66666....
.......66666....
.......66.......
.......666......
.......666......
.......66.......
.....666666.....
....66666666....
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
....66666666....
.....666666.....`],
  [lock,bitmap`
................
................
......1111......
.....122221.....
....12222221....
...1222222221...
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111LL1111...
...1111LL1111...
...1111LL1111...
...1111LL1111...
...1111111111...
...1111111111...`],
  [ box,    bitmap`
LLLLLLLLLLLLLLLL
LL211111111112LL
L2L2111111112L2L
L12L21111112L21L
L112L211112L211L
L1112L2112L2111L
L11112L22L21111L
L111112LL211111L
L111112LL211111L
L11112L22L21111L
L1112L2112L2111L
L112L211112L211L
L12L21111112L21L
L2L2111111112L2L
LL211111111112LL
LLLLLLLLLLLLLLLL` ],
  [ blue_portal, bitmap`
....55555555....
...5555555555...
..555572257555..
.55575275555555.
5555575555555555
5552755572755555
5557557525577555
5552572555525555
5555552777755555
5557575552552755
5555255272755555
5555557575275755
.55577255255755.
..555557575555..
...5555555555...
....55555555....` ],
  [ red_portal, bitmap`
....33333333....
...3323333333...
..333393233333..
.33932333232323.
3332333923333233
3339393333923333
3333332329332333
3293933399393233
3393323233239323
3322393932393933
3339933293392923
3339323393333233
.33333223993333.
..339332332333..
...3333333333...
....33333333....`],
  [fragile, bitmap`
LLLLLLLLLLLLLLLL
L1LLLL1LLLLLLLLL
LL11L1L1LLL11111
L11111LL1111LLLL
LLLLLLL11LLLLLLL
1111LLLLLLLLLLLL
LLL111LLLLLLL1LL
LLLLL11LL1LL1LLL
LLLLLLLLLL1L1LLL
LL1LLLLL1L111LLL
LLL1LLLLL11LL1LL
LLL11LLL11LLLLLL
LLL1L1111LLLLLL1
1LLLLLLLLLLLL111
L1111L1LLL1111LL
LLLLL1LLLLLLLLLL`],
  [broken, bitmap`
1LLL11LL11LLL11L
111LL11LL11L11LL
LL11L00000011LLL
LLL1000000000LLL
1LL0000000000111
1L000000000000LL
110000000000001L
L1000000000000LL
L100000000000011
LL000000000000LL
LL000000000000LL
L1100000000001LL
11L00000000001LL
11LLL000000L1L11
L11111L11L1LL1L1
11LLLLL1LL1LLL1L`],
  [fake_wall,bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCF`],
  [fake_key,bitmap`
................
.......66666....
.......66666....
.......66.......
.......666......
.......666......
.......66.......
.....666666.....
....66666666....
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
....66666666....
.....666666.....`]
);

let level = 0
const levels = [
  map`
...w..w......w.g
.p...ww.www..w..
...w..w.w.w.www.
.w.ww...w.w.w.w.
.w..wwwww.w.w...
.w........w.w.ww
.wwwwwwww.w.w.w.
.w......w.w.w.w.
.w.wwww.www...w.
.w....w.....w...
.wwww.www.www.w.
........w.w...w.`,map`
...w..w..w...www
.p.lg.ww...w....
...w..w..www.w.w
.w.wwwww.w.w.w..
.w.....w.w.w.ww.
.w.www.....w.w..
.w.w...www.w.w.w
.w.wwwww...w.w.w
.w.....www.wkw.w
.www.w...w.w.w.w
.w.w.wwwww......
...w.......wwww.`, map`
...w...w..b..w..
.p.w.w.wg.ww.w.b
.....w.wwww..b..
.www.w....wwwww.
...wwwwww.w...w.
.w.w....wwwww.w.
...w...b......w.
ww.wwwbwwww.w.w.
.w....b..w..w.wb
.w.wwww.ww.wwwwl
.w.w....w.....w.
...wkwwwwwwww...`,map`
.......w........
.p.www.ww.wwww.w
.....w....w.....
wwww.wwwwwwwww.w
.g.w.......w...w
ww.wwwwwww.w.w.w
...w...w.w.w.w..
.www.w.w.w.w.ww.
.r.w.w.....w.w..
wwww.www.w.w.w.w
.......w...w.w.u
wwwwww.wwwww.www`,map`
...x.x.x....xxxx
.p.x.....xx.x..x
...xgx.xx.x.xx.x
.x.xxxxxx......x
...x.x....xxxxxx
.x...x.xxxxx...x
.x.x.x.......x.x
.xxx.xxx.xxxx..x
...x........x.xx
.xxx.xxxxxxxx..x
...........xxx.x
.xxxxxxxxx.....x`,map`
fffffwwwwwffffff
fpfffffffffwwwwf
ffffwwwwfwfwffff
wwwffwfwfwwwwwww
ffwwfwfwffffffff
fffffwfwwfwwfwwf
fwfwfwfwfffwfwff
fwfwfffwfwfwfwfw
fwfwfwwwfwfwfwff
fwfwfffwfwwwwwwf
fwfwwwfwfwfwffff
fffffwfwfwgffwfw`, map`
........wr......
.p.wwwwwwww.w.wl
..........w.w.w.
.w.wwwww..w.w.w.
.w.w...w.ww.www.
.w.www.w.w.bw...
.w...w...w..w.w.
.ww..w.wwww...w.
.w..ww.wk.wwwww.
.w..w.....wg....
.wwwwwwww.wwwwww
.......uw.......`,map`
.......w.......z
.p.www.w.wwwwwww
..z........w...z
.wlw.wwwww...www
.wgw...wzw.w....
.wwwww...wzwwww.
.....wwwwwwwz.wk
.www.......ww.ww
.w.www.www.w..wz
.w...w..w..w.ww.
.w.w.ww...ww..w.
...wzw..w.......`,map`
...w............
.p...wwwwwwwwww.
...w........w.w.
qwwwwwwwww.ww...
.w.q...w.w..www.
.w.w.w...ww.w.w.
.w.wqwwwww..w.w.
.w.w...q.w.ww.w.
.wqwwwww.w..w...
.w.....w.w..w.ww
.wwwwwqwqwwww...
.......w...gw...`,map`
...w.......q....
.puw.www.www..r.
...w...w...w....
qwwwlwwwwwwwwwwq
...w.....w......
.w.w....wwwwwww.
.wqwwwqww.f...w.
ww.wqqqw..www.f.
...wqwwwqqw...w.
.wwwqqwwkqwwwww.
...wwgwwqq.w.f..
.wwwwwww...f.w..`,
]

setMap(levels[level])
let levelText = addText(`Level ${level + 1}`, { x: 0, y: 1, color: color`0` });

setPushables({
    [player]: [box], 
    [box]: [box] 
})

onInput("w", () => {
    getFirst(player).y -= 1;
});

onInput("a", () => {
    getFirst(player).x -= 1;
});

onInput("s", () => {
    getFirst(player).y += 1; 
});

onInput("d", () => {
    getFirst(player).x += 1;
});

onInput("i", () => {
  getFirst(player).y -= 1;
});

onInput("j", () => {
  getFirst(player).x -= 1;
});

onInput("k", () => {
  getFirst(player).y += 1;
});

onInput("l", () => {
  getFirst(player).x += 1;
});

afterInput(() => {
  
})

setSolids([ player, wall,lock,box ]);

afterInput(() => {
  const goalsCovered = tilesWith(player, goal);
  const keysTaken = tilesWith(player, key);

  if (goalsCovered.length >= 1) {
    level = level + 1;
    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
      clearText();
      addText(`Level ${level + 1}`, { x: 0, y: 1, color: color`0` });
    } else {
      clearText();
      addText("YOU WIN!", { x: 6, y: 6, color: color`5` });
    }
  }

  if (keysTaken.length >= 1) {
    getFirst(lock).remove();
    getFirst(key).remove();
  }
});
afterInput(() => {
  const redPortalsCovered = tilesWith(player, red_portal);
    const bluePortalsCovered = tilesWith(player, blue_portal);
  
  if (redPortalsCovered.length >= 1) {
    const bp = getFirst(blue_portal);
    const pl = getFirst(player);
    pl.x = bp.x;
    pl.y = bp.y;
  } 
  else if (bluePortalsCovered.length >= 1) {
    const rp = getFirst(red_portal);
    const pl = getFirst(player);
    pl.x = rp.x;
    pl.y = rp.y;
  }
});

const melody = tune`
230.76923076923077: C4-230.76923076923077 + C5-230.76923076923077,
230.76923076923077: D5-230.76923076923077,
230.76923076923077: C4-230.76923076923077 + F5-230.76923076923077,
230.76923076923077: C5-230.76923076923077,
230.76923076923077: C4-230.76923076923077 + D5-230.76923076923077,
230.76923076923077,
230.76923076923077: C4-230.76923076923077 + F5-230.76923076923077,
230.76923076923077,
230.76923076923077: C4-230.76923076923077 + C5-230.76923076923077,
230.76923076923077: D5-230.76923076923077,
230.76923076923077: C4-230.76923076923077 + F5-230.76923076923077,
230.76923076923077: C5-230.76923076923077,
230.76923076923077: C4-230.76923076923077 + D5-230.76923076923077,
230.76923076923077: G5-230.76923076923077,
230.76923076923077: C4-230.76923076923077 + A5-230.76923076923077,
230.76923076923077: C5-230.76923076923077,
230.76923076923077: A4-230.76923076923077 + C4-230.76923076923077 + D5-230.76923076923077,
230.76923076923077: F4-230.76923076923077 + F5-230.76923076923077,
230.76923076923077: B4-230.76923076923077 + C4-230.76923076923077,
230.76923076923077: A4-230.76923076923077 + D5-230.76923076923077,
230.76923076923077: C4-230.76923076923077,
230.76923076923077: F4-230.76923076923077 + D5-230.76923076923077,
230.76923076923077: C4-230.76923076923077 + E5-230.76923076923077,
230.76923076923077: B4-230.76923076923077,
230.76923076923077: A4-230.76923076923077 + C4-230.76923076923077 + G5-230.76923076923077,
230.76923076923077: F4-230.76923076923077,
230.76923076923077: C4-230.76923076923077 + F5-230.76923076923077,
230.76923076923077: A4-230.76923076923077,
230.76923076923077: D4-230.76923076923077 + C4-230.76923076923077,
230.76923076923077: B4-230.76923076923077,
230.76923076923077: B4-230.76923076923077 + D4-230.76923076923077 + C4-230.76923076923077,
230.76923076923077: B4-230.76923076923077`
playTune(melody)
const playback = playTune(melody, Infinity)

let previousX = getFirst(player).x;
let previousY = getFirst(player).y;

afterInput(() => {
  const currentX = getFirst(player).x;
  const currentY = getFirst(player).y;


  if (currentX !== previousX || currentY !== previousY) {
  
    const previousSprites = getTile(previousX, previousY);
    const fragileTile = previousSprites.find(s => s.type === fragile);
    
    if (fragileTile) {
      fragileTile.type = broken;
    }
  }


  const brokenCovered = tilesWith(player, broken);
  if (brokenCovered.length >= 1) {
    setMap(levels[level]);
    previousX = getFirst(player).x;
    previousY = getFirst(player).y;
    return;
  }

  previousX = currentX;
  previousY = currentY;

});




afterInput(() => {
  const fakeKeyTiles = tilesWith(player, fake_key);

  for (const tile of fakeKeyTiles) {
    for (const sprite of tile) {
      if (sprite.type === fake_key) {
        sprite.remove();
      }
    }
  }
});
