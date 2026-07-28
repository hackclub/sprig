/*
@title: Push the Bucket
@author: KowKow
@description: This game is all about pushing buckets and save some water from a leaking pipe. And there is a 120 second timer so water doesnt flood ur screen! Pss.Beware of mobs and use teleporters!!!
@tags:['Puzzle']
@addedOn: 2026-7-09
*/

const player = "p";
const teleporter = "t";
const bucket = "b";
const waterleak = "g";
const wall = "w";
const laser = "l";
const rightBelt = ">";
const leftBelt = "<";
const upBelt = "^";
const downBelt = "v";
const mob = "m";
const breakableWall = "x";

setLegend(

  [player, bitmap`
................
................
................
......33333.....
......33333.....
......33333.....
........3.......
........3.......
.....3333333....
........3.......
........3.......
........3.......
.......3.3......
.......3.3......
.......3.3......
.......3.3......`],

  [teleporter, bitmap`
................
................
....77777777....
...7755555577...
..775777777577..
..757755557757..
..757577775757..
..757575575757..
..757577775757..
..757755557757..
..775777777577..
...7755555577...
....77777777....
................
................
................`],

  [mob, bitmap`
................
................
....33333333....
...3333333333...
..333333333333..
..33..3333..33..
..33..3333..33..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
....33333333....
....33....33....
...33......33...
................
................`],

  [breakableWall, bitmap`
LLLLLLLLLLLLLLLL
L1111111LL11111L
L1111111LL11111L
LLL1111L1L11111L
L1LL11LL1L1111LL
L111LLL1L1111LLL
L1111LLLL111LL1L
L11111LLL11LL11L
L1111L1LL1L1111L
L1111L11LL1111LL
L1111L11LL1111LL
L1111LL1LL1111LL
L11111LLL1L11LLL
L11111LL1LL11L1L
L11111L1L111LL1L
LLLLLLLLLLLLLLLL`],

  [rightBelt, bitmap`
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLL1LLLLL
LLLLLLLLLL11LLLL
LLLLLLLLLL111LLL
LLL11111111111LL
LLL11111111111LL
LLLLLLLLLL111LLL
LLLLLLLLLL11LLLL
LLLLLLLLLL1LLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111`],

  [leftBelt, bitmap`
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLL1LLLLLLLLLL
LLLL11LLLLLLLLLL
LLL111LLLLLLLLLL
LL11111111111LLL
LL11111111111LLL
LLL111LLLLLLLLLL
LLLL11LLLLLLLLLL
LLLLL1LLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111`],

  [upBelt, bitmap`
1LLLLLLLLLLLLLL1
1LLLLLL11LLLLLL1
1LLLLL1111LLLLL1
1LLLL111111LLLL1
1LLL11111111LLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1`],

  [downBelt, bitmap`
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LL1111111111LL1
1LLL11111111LLL1
1LLLL111111LLLL1
1LLLLL1111LLLLL1
1LLLLLL11LLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1`],

  [bucket, bitmap`
................
.....LLLLLL.....
....L777777L....
...L77777777L...
..L1L777777L1L..
..L11LLLLLL11L..
..L1111111111L..
..L1111111111L..
..L1111111111L..
..L1111111111L..
...L11111111L...
...L11111111L...
....L111111L....
.....LLLLLL.....
................
................`],

  [waterleak, bitmap`
1L1.............
1L1.............
1L1.7755........
1L7777775.......
1L55775777......
1L1.5777777.....
1L1....5577.....
1L1.....5775....
1L1......5775...
1L1.......575...
1L1.......7777..
1L1........757..
1L1.........777.
1L1.........7777
1L1......5..7575
1L1....577777775`],

  [laser, bitmap`
................
................
3333333333333333
................
................
................
3333333333333333
................
................
................
3333333333333333
................
................
................
3333333333333333
................`],

  [wall, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1L1111111111L1L
L1L1LLLLLLLL1L1L
L1L1L111111L1L1L
L1L1L1LLLL1L1L1L
L1L1L1L11L1L1L1L
L1L1L1L11L1L1L1L
L1L1L1LLLL1L1L1L
L1L1L111111L1L1L
L1L1LLLLLLLL1L1L
L1L1111111111L1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL`]
);


let level = 0;
let time = 120;


const levels = [

  map`
pwwwwwww
.w...wg.
.w.b.w..
.w^..w..
.w^..w..
.w^..w..
.w^....w
.......w`,

  map`
p....w....
.....w....
...b.x....
.....w....
.....w.g..
.....w....`,

  map`
p.........
..........
.m..m.m.m.
..........
....b.....
..........
........g.
..........
..........
..........`,

  map`
p......t..
.wwwwwwww.
.w.......w
.w.......w
.w.......w
.w..b....w
.w.......w
.w....t.gw
.wwwwwwww.
..........`,

  map`
p.w.
.bwg
....
..m.`,

  map`
p.wl
.bwg
..l.
....
....`,

  map`
p.wg.....
lbwwwww..
w.wwwww..
w.wl.....
..ww.....
......www
wlll..lll`,

  map`
l...
..l.
plwb
llwg`,

  map`
wwp.w.
..b.wg
....l.
.mwwl.
......
w.....`,

  map`
pwwwwwwwwwwwwwg.w
.wlll...........w
vw.....ll.......w
vw.....llw...w..w
vw..b.wwww...w..w
vw....wwww.w.w..w
vw....wwww.w.w..w
vwwwwwwww..www..w
vw.........w....w
vw.........w.ww.w
vw.wwwwwwwww.w..w
vw.wwwwwwwww.w..w
vw.wwwwwwwww.w..w
vw...........w..w
vwwwwwww.wwwww..w
>>>>>>>>twt.....w
wwwwwwwwwwwwwwwww`,

  map`
pllllllllllllllwg
vwt........m..tw.
vw...m.........w^
vw....m........w^
vw.............w^
vw.....>..<....w^
vw.............w^
vw....w....w...w^
vw.....wwww....w^
vw...........m.w^
vw..m..........w^
vw.......m.....w^
vw.........m...w^
vw.....m.......w^
vwt.......m...tw^
vwwwwwwwwwwwwwwwb
>>>>>>>>>>>>>>>>^`,

  map`
pt..........
............
.w.wxxxwww.m
.w..........
.w.wwww.....
.w.w..w..w^^
.w.w..w..w..
.w.ww.w..w^^
.w....w..w.t
.w.b..w..w^^
......w..g..
^wwwwwwwwww.
^<<<<<<<<<<.`,

  map`
p..wg...
..bw....
...w....
..twt...
...w..ww
........
........`
];


function drawTimer() {
  clearText();

  addText("Time: " + time, {
    x: 0,
    y: 0,
    color: color`3`
  });
}

drawTimer();


setMap(levels[level]);


setSolids([
  player,
  bucket,
  wall
]);


setPushables({
  [player]: [bucket]
});


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


onInput("j", () => {
  setMap(levels[level]);
  drawTimer();
});


const timer = setInterval(() => {

  time--;
  drawTimer();

  if (time <= 0) {

    level = 0;
    time = 120;

    setMap(levels[level]);
    drawTimer();
  }

}, 1000);


const conveyor = setInterval(() => {

  const p = getFirst(player);

  if (p) {

    if (tilesWith(rightBelt, player).length) {
      p.x++;
    }

    if (tilesWith(leftBelt, player).length) {
      p.x--;
    }

    if (tilesWith(upBelt, player).length) {
      p.y--;
    }

    if (tilesWith(downBelt, player).length) {
      p.y++;
    }
  }


  const b = getFirst(bucket);

  if (b) {

    if (tilesWith(rightBelt, bucket).length) {
      b.x++;
    }

    if (tilesWith(leftBelt, bucket).length) {
      b.x--;
    }

    if (tilesWith(upBelt, bucket).length) {
      b.y--;
    }

    if (tilesWith(downBelt, bucket).length) {
      b.y++;
    }
  }

}, 300);


let mobDirection = 1;

const mobTimer = setInterval(() => {

  const m = getFirst(mob);

  if (!m) return;

  const nextX = m.x + mobDirection;

  if (nextX < 0 || nextX >= width()) {
    mobDirection *= -1;
    return;
  }

  const nextTile = getTile(nextX, m.y);

  if (nextTile.some(tile => tile.type === wall)) {
    mobDirection *= -1;
    return;
  }

  m.x += mobDirection;


  const p = getFirst(player);

  if (p && p.x === m.x && p.y === m.y) {
    setMap(levels[level]);
  }

}, 500);


afterInput(() => {

  const breakable = getFirst(breakableWall);
  const b = getFirst(bucket);

  if (breakable && b) {

    if (
      b.x === breakable.x &&
      b.y === breakable.y
    ) {

      breakable.remove();
    }
  }

  const teleporters = getAll(teleporter);

  if (teleporters.length >= 2) {

    const p = getFirst(player);

    if (
      p &&
      tilesWith(teleporter, player).length > 0
    ) {

      const first = teleporters[0];
      const second = teleporters[1];

      if (
        p.x === first.x &&
        p.y === first.y
      ) {

        p.x = second.x;
        p.y = second.y;

      } else {

        p.x = first.x;
        p.y = first.y;
      }
    }
  }


  if (tilesWith(player, laser).length > 0) {

    setMap(levels[level]);
    return;
  }


  const numberCovered =
    tilesWith(waterleak, bucket).length;

  const targetNumber =
    tilesWith(waterleak).length;


  if (
    numberCovered === targetNumber &&
    targetNumber > 0
  ) {

    level++;



    if (level < levels.length) {

      setMap(levels[level]);

    }


    else {

      clearInterval(timer);
      clearInterval(conveyor);
      clearInterval(mobTimer);

      clearText();

      addText("You Win!", {
        x: 4,
        y: 4,
        color: color`3`
      });
    }
  }

});
