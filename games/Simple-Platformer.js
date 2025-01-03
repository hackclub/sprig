/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Platformer
@author: Adam Xu
@tags: []
@addedOn: 2025-01-03
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

setLegend(
  [ player, bitmap`
......0000......
.....002200.....
.....022220.....
.....022200.....
.....00220......
......0000......
.......L0.......
.......L0.......
.......0L.......
.......0L.......
.......0L.......
.......00.......
.......0.0......
......0..0......
......0..0......
......0..0......` ],
  [ platform, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDCDDDDDDDCDCDD
CCDCCCDCDDCCCCCD
CCCCCCCCCCCCCCCC
CC9CCCCCCC9CCCCC
9CCCCCC9CCCCC9CC
CCCCCCCCCCCCCCCC
................
................
................
................
................
................
................
................` ],
  [ platform_left, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDCDDDDDDDCDCDD
CCDCCCDCDDCCCCCD
.CCCCCCCCCCCCCCC
.CCC9CCCCC9CCCCC
..CCCCC9CCCCC9CC
....CCCCCCCCCCCC
................
................
................
................
................
................
................
................` ],
  [ platform_right, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDCDDDDDDDCDCDD
CCDCCCDCDDCCCCCD
CCCCCCCCCCCCC9C.
CC9CCCCCCC9CCCC.
9CCCCCC9CCCCCC..
CCCCCCCCCCCC....
................
................
................
................
................
................
................
................` ],
  [ grass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDCDDDDDDDCDCDD
CCDCCCDCDDCCCCCD
CCCCCCCCCCCCCCCC
CCCCCCCCCC9CCCCC
CC9CCC9CCCCCC9CC
CCCCCCCCCCCCCCCC
CCCCCCCC9CCCCCCC
CCCCCCCCCCCCC9CC
C9CCC9CCCCCCCCCC
CCCCCCCCCCCCCCCC
CCC9CCCC9CCC9CCC
9CCCCCCCCCCCCCC9
CCCCCCCCCCCCCCCC
CCCCC9CCCCC9CCCC` ],
  [ dirt, bitmap`
CCCC9CCCCCCCCCCC
C9CCCCCCC9CCCCCC
CCCCCCCCCCCCCC9C
CCCC9CCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCC9CCCCC
CC9CCC9CCCCCC9CC
CCCCCCCCCCCCCCCC
CCCCCCCC9CCCCCCC
CCCCCCCCCCCCC9CC
C9CCC9CCCCCCCCCC
CCCCCCCCCCCCCCCC
CCC9CCCC9CCC9CCC
9CCCCCCCCCCCCCC9
CCCCCCCCCCCCCCCC
CCCCC9CCCCC9CCCC` ],
  [ end_1, bitmap`
....57777775....
...5775555777...
..755555555577..
.75577777555577.
7577755577755575
5575557777755577
5755577557775557
7755775757575577
7555755775575575
7755775555775775
5755577777755755
5575555555557757
.55775555557757.
..557775777555..
...5557775555...
....77777777....` ],
  [ end_2, bitmap`
....77777777....
...5557775555...
..557775777555..
.55775555557757.
5575555555557757
5755577777755755
7755775555775775
7555755775575575
7755775757575577
5755577557775557
5575557777755577
7577755577755575
.75577777555577.
..755555555577..
...5775555777...
....57777775....` ],
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
)

// setBackground(sky)

setSolids([player, grass, platform, platform_left, platform_right, dirt])

let level = 0
const levels = [
  map`
..........
..........
..........
.lccccr...
..........
..........
.p......e.
gggggggggg`,
  map`
..........
..........
.........e
........lr
.....lr...
..........
p..lr.....
gg........`,
  map`
p.........
ggr.......
dd..lr....
dd.......e
dd......lg
dd.......d
dd.......d
dd.......d`,
  map`
..........
p.........
g..gcccr..
d..d......
d..de....l
d..dcr....
d..d......
d..d......`,
  map`
e.........
r.........
..........
cr....lr..
..........
.........l
p.........
ggg....ggg`,
  map`
g........g
d........d
d...p....d
.lccccccr.
.........e
..........
..........
..........`
]

setMap(levels[level])

setPushables({
  [ player ]: []
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
      setTimeout(gravity, 100);
    }
  }
});
onInput("a", () => {
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

function after_move() {
  if (tilesWith(player, end_1).length == 1 || tilesWith(player, end_2).length == 1) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
      animation = false;
      clearText();
      if (level == 5) {
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



