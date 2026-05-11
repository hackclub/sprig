/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Gary-_-escaped
@description: help Gary escape jail
@author: goldfish
@tags: ['puzzle', 'maze', 'strategy', 'levels']
@addedOn: 2026-05-11
*/
const player = "p"
const wall = "w"
const ladder = "l"
const key = "k"
const door = "d"
const adoor = "a"
const bdoor = "b"
const floor = "f"
const melody = tune`
98.36065573770492: B4^98.36065573770492 + A4~98.36065573770492,
98.36065573770492: C5^98.36065573770492 + B4~98.36065573770492,
2950.8196721311474`

setLegend(
  [ player, bitmap`
................
................
.......7........
....5555555.....
....5555555.....
....7FF7FF7.....
....FFFFFFF.....
....F20F20F.....
....FFFFFFF.....
.....00000......
.....22222......
....0000000.....
.....22222......
.....00000......
......0.0.......
................` ],
  
  [ wall, bitmap`
LL00LLLLLL1LL21L
LLLLLLLLLLLLLLLL
2LLLLL11LLLLLL00
LLLLLLLLLLLLLLLL
000LLLLLLLLLLLLL
LLLLLLLLL22LLLLL
LLLLLLLLLLLLLL11
1LLLLLLLLLLLLLLL
LLLLLL00LLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLL0
LL1LLLLLLLLLLLLL
LLLLLLLLLL11LLLL
00LLLLLLLLLLLLLL
LLLLLLLLLLLLLLL2
LLLL111LLLLLL000`],
  [ ladder, bitmap `
..00........LL..
..LL........LL..
..LL........L0..
..LLLLLLLL2LLL..
..LL00LLLLLLLL..
..LL........LL..
..LL........L0..
..LL........LL..
..LL........LL..
..00LL2LLLLLLL..
..LLLLLLLLLL00..
..LL........LL..
..LL........LL..
..L2........LL..
..LL........L2..
..00LLLLLLLLLL..`],
  [ key, bitmap`
................
.....396663.....
....99666666....
....966..666....
....966..666....
....99666666....
.....396663.....
.......96.......
.......96.......
.......96.......
.......96.......
.......9666.....
.......96.6.....
.......9666.....
.......96.......
................`],
  [ door, bitmap `
CCCCCCCCCCCCCCCC
CCCC.C.C.C.C.C.C
CC.C.C.C.C.C.C.C
CC.CCC.C.C.C.C.C
CC.CCC.C.C.C.C.C
CC.C.CCC.C.C.C.C
CC.C.CCCCC.C.C.C
CC.C.C.CCC.C.C.C
CC.C.C.C.CCC666C
CC.C.C.C.CCC.3.C
CC.C.C.C.C.CCC.C
CC.C.C.C.C.CCC.C
CC.C.C.C.C.C.C.C
CC.C.C.C.C.C.CCC
CC.C.C.C.C.C.CCC
CCCCCCCCCCCCCCCC`],
  [ adoor, bitmap `
CCCCCCCCCCCCCCCC
C3.....CC.....3C
C.3..........3.C
C..............C
C..............C
C..............C
C..............C
CC............CC
CC............CC
C..............C
C..............C
C..............C
C..............C
C.3..........3.C
C3.....CC.....3C
CCCCCCCCCCCCCCCC`],
  [ bdoor,bitmap`
CCCCCCCCCCCCCCCC
C4.....CC.....4C
C.4..........4.C
C..............C
C..............C
C..............C
C..............C
CC............CC
CC............CC
C..............C
C..............C
C..............C
C..............C
C.4..........4.C
C4.....CC.....4C
CCCCCCCCCCCCCCCC`],
  [ floor,bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`]
)
let level=0;
const levels=[
  map`
wwwwwww
p....kw
w.wwwww
w.....w
wwwww.w
w.....w
wwwwwdw`,
  map`
wp.wwwww
wwlw...w
ww..k..w
w.wwwwlw
w......w
wwwwwdww`,
  map`
wwwwwwwpww
w........w
w.lwwwwwww
ww.......w
ww....b..w
w..wwwwwww
w......www
wwww..a..w
w....w..ww
wdwwwwkwww`,
  map`
wpwwwwwwwwwwww
w............w
wwwwwwwlwwwwww
w............w
wwwwwwwwa....w
w........wwwww
wwwwwl...w...w
w.....wwww...w
w....w.b.....w
wlwww.wwwwww.k
w..........w.w
wwwwwwwdwwwwww`,
  map`
w.p.......w
wwwwlwwwwww
w.........w
w.wwwl....w
w.w...wwwww
wkw.w.....w
w.wwwwww..w
w.w.......w
wwwlww....w
w....w.wwww
w..w..w...w
www...w...w
w.....w...w
wwdwwwwwwww`,
  map`
wwwpwwwwwww
w.w..w...kw
w.w..w.ww.w
wwwlww.wb.w
w......wwww
wwwwwww...w
w...w.wwaww
w.w.w.....w
w.wwwwww..w
w.........w
wwwwwwdwwww`,
  map`
wwwwwwpwwwwwwwww
w..............w
wwwwww....wwlwww
w...w.wwww....bw
w........w.....w
wwwwww...w.....w
w......wwwwwwwww
w.........w....w
wwwwwww...w..w.w
w.....w......w.w
wa..k.wwwwww.www
w.....w..w.....w
wwwwwww..wwlwwww
w...w..........w
w...w..wwwww...w
wwwwwwwwwwwwwwdw`,
  map`
wwwwwpw
w.....w
w.....w
w.....w
w.....w
d....kw
wwwwwww`
];

setBackground(floor)

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, wall]);

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1;
})

onInput("w", () => {
  getFirst(player).y-= 1;
})

onInput("a", () => {
  getFirst(player).x-=1;
})
onInput("d",() => {
  getFirst(player).x+=1;
})

onInput("j" ,() => {
  const currentLevel = levels[level];
  if (currentLevel!==undefined) {
    clearText(" ");
    setMap(currentLevel);
  }
});
let teleported = false;

afterInput(() => {
  const pl = getFirst(player);

  // reset after player moves off portals
  if (
    tilesWith(player, adoor).length === 0 &&
    tilesWith(player, bdoor).length === 0
  ) {
    teleported = false;
  }

  if (!teleported) {

    // red -> blue
    if (tilesWith(player, adoor).length > 0) {
      const bp = getFirst(bdoor);

      pl.x = bp.x;
      pl.y = bp.y;

      teleported = true;
    }

    // blue -> red
    else if (tilesWith(player, bdoor).length > 0) {
      const rp = getFirst(adoor);

      pl.x = rp.x;
      pl.y = rp.y;

      teleported = true;
    }
  }
});
afterInput(() => {
  
  const keyCovered = tilesWith(player, key);

  keyCovered.forEach(tile => {
    tile.forEach(sprite => {
      if (sprite.type === key) {
        sprite.remove();
      }
    });
  });

  const doorCovered = tilesWith(player, door);

  if (doorCovered.length >= 1) {
    playTune(melody)
    level += 1;
    
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("Gary is Free!!", { y: 4, color: color`3` });
    }
  }
});
      
  

