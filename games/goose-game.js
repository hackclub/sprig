/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: goose  game
@author: 
@tags: []
@addedOn: 2025-00-00
*/
const player = "p"
const grass = "g"
const platform = "c"
const platform_left = "l"
const platform_right = "r"
const end_1 = "e"
const end_2 = "f"
const sky = "s"
const dirt = "d"
const push = "q"
const fing = "a"
const lth = "u"
const rth = "x"
const rlth = "m"
const no = "n"
const pp = "o"


setLegend(
  [ player, bitmap`
................
................
................
..........0000..
000......022220.
022000..00220290
0222220022222299
00222222122000..
.0222221220.....
.0122221220.....
.0111112220.....
.022222200......
..090000........
..090...........
..0990..........
..0000..........` ],
  [ fing, bitmap`
1111111111111111
1L1777777777L1L1
11117777777L1111
1L11177777L111L1
17L111777L1117L1
177L111LL11177L1
1777L111111777L1
17777L1LL17777L1
17777L1LL17777L1
1777L111111777L1
177L111LL11177L1
17L111777L1117L1
1L11177777L111L1
11117777777L1111
1L1LLLLLLLLLL1L1
1111111111111111` ],
  [ platform, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
44D44444444444DD
DDDD44444DDDDDDD
DDDDDDDDDDDDDDDD
CCDDDDDDDDDDDDDD
CCCCDDDDDDDCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
................
................
................
................` ],
  [ platform_left, bitmap`
.444444444444444
4444444444444444
4444444444444444
4444444444444444
DD44444444444444
CDDDDDD4444DDD44
CCDDDDDDDDDDDDDD
CCCCCDDCDDDDCCDD
CCCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
..CCCCCCCCCCCCCC
...CCCCCCCCCCCCC
................
................
................
................` ],
  [ platform_right, bitmap`
4444444444444444
4444444444444444
4444444444444444
444444444444444D
DDD44444444DDDDD
DDDDD4444DDDDDDC
DDDDDDDDDDDDCCCC
CCCCCCDDDCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCC.
CCCCCCCCCCCCCC..
................
................
................
................` ],
  [ grass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
444DDDDDD4444444
DDDDDDDDDD444444
DDDDDDDDDDD4DDDD
DCDCCDDDDCDDDDDD
DDCCCCCCCCDDDDDC
DDCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
  [ dirt, bitmap`
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
CCCCCCCCCCCCCCCC` ],
  [ end_1, bitmap`
.0000000000000L.
.0000000000000L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.0000000000000L.
.0000000000000L.` ],
  [ end_2, bitmap`
.0000000000000L.
.0000000000000L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.00LHHHHHHHH00L.
.0000000000000L.
.0000000000000L.` ],
  [ sky, bitmap`
2727272727272727
7272727272727272
2727272727272727
7272727272727272
2727272727272727
7272727272727272
2727272727272727
7272727272727272
2727272727272727
7272727272727272
2727272727272727
7272727272727272
2727272727272727
7272727272727272
2727272727272727
7272727272727272` ],
  [ push, bitmap`
FFFFFFFFFFFFFFFF
F1FLLLLLLLLLLF1F
FFFFCCCCCCCLFFFF
FLFFFCCCCCLFFFLF
FCLFFFCCCLFFFCLF
FCCLFFFCLFFFCCLF
FCCCLFFFFFFCCCLF
FCCCCLFFFFCCCCLF
FCCCCLFFFFCCCCLF
FCCCLFFFFFFCCCLF
FCCLFFFLLFFFCCLF
FCLFFFCCCLFFFCLF
FLFFFCCCCCLFFFLF
FFFFCCCCCCCLFFFF
F1FLLLLLLLLLLF1F
FFFFFFFFFFFFFFFF` ],
  [ lth, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L13111111111131L
L1111333333L111L
L11133003333L11L
L113300033333L1L
L113000333333L1L
L110000000003L1L
L110000000003L1L
L113000333333L1L
L113300033333L1L
L11133003333L11L
L1111333333L111L
L13111111111131L
L11111111111111L
LLLLLLLLLLLLLLLL` ],
  [ rth, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L13111111111131L
L1111333333L111L
L11133330033L11L
L113333300033L1L
L113333330003L1L
L113000000000L1L
L113000000000L1L
L113333330003L1L
L113333300033L1L
L11133330033L11L
L1111333333L111L
L13111111111131L
L11111111111111L
LLLLLLLLLLLLLLLL` ],
  [ rlth, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L13111111111131L
L1111555555L111L
L11155555555L11L
L115555555555L1L
L115555555555L1L
L115000000005L1L
L115000000005L1L
L115555555555L1L
L115555555555L1L
L11155555555L11L
L1111555555L111L
L13111111111131L
L11111111111111L
LLLLLLLLLLLLLLLL` ],
  [ no, bitmap`
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
................
................
................` ],
  [ pp, bitmap`
1111111111111111
1311111111111131
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
1311111111111131
1111111111111111` ],
)

// setBackground(sky)

setSolids([player, grass, no, platform, platform_left, platform_right, dirt, rlth, rth, lth, push])

let level = 0
const levels = [

  
  map`
..........
..........
..........
..........
ggggg.....
...q......
.pmq....e.
gggggggggg`,
  map`
................
................
e...............
cccr...lr.....u.
................
...............g
p........x....gd
ggm....gg.......`,
  map`
...............e
..............gg
..............dd
...........lr.dd
p.............dd
gg......lr....dd
dd...lr.......dd
dd............dd`,
  map`
..............q..
..............q..
..............qqq
p..............u.
..............q..
..m....lr.....q.e
..............qqq
..............q..`,
  map`
...............e
..x...........gg
g...............
dg..............
ddg..........u..
...............g
p.............gd
gm...........gdd`,
  map`
................
................
................
p..............e
r..n..n..n.lr..l
................
................
...a..a..a......`,
  map`
p..ne...........
q..gggggggggg...
q......qqqqqqr..
q.........qq....
q.......q..qr..l
qm......qq......
q.......q....lr.
qqqqqqqqq.qq....`,
  map`
................
................
e...............
cccr..mq........
p...........lr..
...............g
x...gg.......ugd
....dd........dd`,
  map`
gg............gg
dd............dd
dd............dd
dd.....p......dd
dd............dd
ddggggggggggggdd
dddddddedddddddd
dddddddddddddddd`,
 
]

setMap(levels[level])



setPushables({
  [ rlth ]: [push, fing]
})

addText("<A D>   W^", { 
  x: 3,
  y: 4,
  color: color`D`
})

isJumping = false;
isDied = false;

function gravity() {
  let prev_y = getFirst(player).y;
  const gravity_interval = setInterval(function() {
    if (isDied) {
      clearInterval(gravity_interval);
      return;
    }
    prev_y = getFirst(player).y;
    getFirst(player).y += 1;
    if (getFirst(player).y == prev_y) {
      clearInterval(gravity_interval);
      isJumping = false;
    } else if (getFirst(player).y == 7) {
      clearInterval(gravity_interval);
      isDied = true;
      setMap(map`
..........
..........
..........
..........
..........
cccccccccc
..........
..........`);
      addText("You Died", { 
        x: 6,
        y: 7,
        color: color`D`
      });
      return;
    }
    after_move();
  }, 250);
  // clearInterval(gravity_interval);
}

onInput("w", () => {
  if (!isDied) {
    if (!isJumping) {
      isJumping = true
      getFirst(player).y -= 1;
      setTimeout(function(){ getFirst(player).y -= 1;}, 50);
      setTimeout(gravity, );
    }
  }
});
onInput("a", () => {100
  if (!isDied) {
    getFirst(player).x -= 1;
    if (!isJumping) gravity();
  }
});
onInput("d", () => {
  if (!isDied) {
    getFirst(player).x += 1;
    if (!isJumping) gravity();
  }
});

onInput("l", () => {
  if (!isDied) {
    getFirst(rth).x += 1;
    if (!isJumping) gravity();
  }
});

onInput("j", () => {
  if (!isDied) {
    getFirst(lth).x += -1;
    if (!isJumping) gravity();
  }
});

onInput("i", () => {
  if (!isDied) {
    getFirst(rlth).x += 1;
    if (!isJumping) gravity();
  }
});

onInput("k", () => {
  if (!isDied) {
    getFirst(rlth).x += -1;
    if (!isJumping) gravity();
  }
});

function after_move() {
  if (tilesWith(player, end_1).length == 1 || tilesWith(player, end_2).length == 1) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
      animation = false;
      clearText();
      if (level == 9) {
        addText("Thanks for playing!", { 
          x: 1,
          y: 14,
          color: color`D`
        })
      }
    }
  }
}

afterInput(() => {
  after_move();
})

var animation = false

const portal_animate = setInterval(function() {
  if (!isDied) {
   if (animation) {
     animation = false
     let tmp = getFirst(end_2)
     clearTile(tmp.x, tmp.y)
     addSprite(tmp.x, tmp.y, end_1)
   } else {
     animation = true
     let tmp = getFirst(end_1)
     clearTile(tmp.x, tmp.y)
     addSprite(tmp.x, tmp.y, end_2)
   }
  } else {
    clearInterval(portal_animate);
  }
}, 250);



