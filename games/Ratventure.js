/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Ratventure
@author: j4y_boi
@tags: ['platformer']
@addedOn: 2025-01-17
*/

const player = "p"
const enemy = "e"
const enemyMirrored = "q"
const crates = "c"
const ground = "g"
const dirt = "d"
const sky = "s"
const cloud = "a"
const playerCrouch = "w"
const rock = "m"
const caveCrystal = "x"
const cheese = "h"
const caveSky = "i"

let crouching = false;
let jumping = false;
let canRestart = false;
let musicPlaying = true;
let deathCount = 0;

const jump = tune`
64.51612903225806: F4^64.51612903225806,
64.51612903225806: B4^64.51612903225806,
1935.483870967742`
const fail = tune `
125: G4^125,
125: E4^125,
125: C4^125,
3625`
const bgm = tune `
333.3333333333333: A4~333.3333333333333 + C5-333.3333333333333 + E4^333.3333333333333,
333.3333333333333: G5~333.3333333333333 + B5-333.3333333333333,
333.3333333333333: D4^333.3333333333333,
333.3333333333333: E5~333.3333333333333 + G5-333.3333333333333 + D4^333.3333333333333,
333.3333333333333,
333.3333333333333: C5~333.3333333333333 + E5-333.3333333333333 + E4^333.3333333333333,
333.3333333333333,
333.3333333333333: D4^333.3333333333333,
333.3333333333333: G5~333.3333333333333 + B5-333.3333333333333 + D4^333.3333333333333,
333.3333333333333,
333.3333333333333: D5~333.3333333333333 + F5-333.3333333333333 + E4^333.3333333333333,
333.3333333333333: F5~333.3333333333333 + A5-333.3333333333333,
333.3333333333333: E5~333.3333333333333 + G5-333.3333333333333 + D4^333.3333333333333,
333.3333333333333: D4^333.3333333333333,
333.3333333333333: D5~333.3333333333333 + F5-333.3333333333333,
333.3333333333333: E4^333.3333333333333,
333.3333333333333: B4~333.3333333333333 + D5-333.3333333333333,
333.3333333333333: C5~333.3333333333333 + E5-333.3333333333333 + D4^333.3333333333333,
333.3333333333333: D4^333.3333333333333,
333.3333333333333: C5~333.3333333333333 + E5-333.3333333333333,
333.3333333333333: E4^333.3333333333333,
333.3333333333333: E5~333.3333333333333 + G5-333.3333333333333,
333.3333333333333: D4^333.3333333333333,
333.3333333333333: C5~333.3333333333333 + E5-333.3333333333333 + D4^333.3333333333333,
333.3333333333333: B4~333.3333333333333 + D5-333.3333333333333,
333.3333333333333: B4~333.3333333333333 + D5-333.3333333333333 + E4^333.3333333333333,
333.3333333333333,
333.3333333333333: C5~333.3333333333333 + E5-333.3333333333333 + D4^333.3333333333333,
333.3333333333333: D4^333.3333333333333,
333.3333333333333: D5~333.3333333333333 + F5-333.3333333333333,
333.3333333333333: E4^333.3333333333333,
333.3333333333333: C5~333.3333333333333 + E5-333.3333333333333`
const win = tune `
125,
125: C5~125,
125: F4~125,
125: B4~125,
125: D5~125,
125: B4~125,
125: D5~125,
125: G5~125,
3000`

setLegend(
  [player, bitmap`
..LLL.......LLL.
.L111L.....L111L
L12221L...L1221L
L122221LLLL1221L
L1222111111L211L
.L1111111111LLL.
..LL111101110...
....L11111111L..
..8.L1L11111118.
.8..L11LLLLLLL..
.8.L111122L.....
8..L111122L.....
8.L1113222L5....
8.L11L3222L5....
8.L11L1222L.....
.88LL33LLL55....`],
  [playerCrouch, bitmap`
................
................
................
8.LLL.......LLL.
.L111L.....L111L
L12221L...L1221L
L122221LLLL1221L
L1222111111L211L
8L1111111111LLL.
8.LL111101110...
8...L11111111L..
88..L1L11111118.
.8LLL11LLLLLLL..
.L111111111111L.
L11111222222111L
.LL333LLLLL5555.`],
  [enemy, bitmap`
.00L.......000..
0LLL00...00LLL0.
0L11LL0.0LL111L0
0L11LLL0LL1111L0
0LL1LLLLLLL111L0
.000000000LLLL0.
...02002000L00..
..00000000L0....
.811111110L0.8..
..0000000LL0..8.
.....011LLLL0.8.
.....011LLLL0..8
....C0111CLLL0.8
....C0111C0LL0.8
.....011110LL0.8
....CC000CC0088.`],
  [enemyMirrored, bitmap`
..000.......L00.
.0LLL00...00LLL0
0L111LL0.0LL11L0
0L1111LL0LLL11L0
0L111LLLLLLL1LL0
.0LLLL000000000.
..00L00020020...
....0L00000000..
..8.0L011111118.
.8..0LL0000000..
.8.0LLLL110.....
8..0LLLL110.....
8.0LLLC1110C....
8.0LL0C1110C....
8.0LL011110.....
.8800CC000CC....`],
  [crates, bitmap`
CCCCCCCCCCCCCCCC
CC9999CCCC9999CC
C9C99C9CC9C99C9C
C99CC99CC99CC99C
C99CC99CC99CC99C
C9C99C9CC9C99C9C
CC9999CCCC9999CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC9999CCCC9999CC
C9C99C9CC9C99C9C
C99CC99CC99CC99C
C99CC99CC99CC99C
C9C99C9CC9C99C9C
CC9999CCCC9999CC
CCCCCCCCCCCCCCCC`],
  [ground, bitmap`
4444444444444444
4444444444444444
DDDDDDDDDDDDDDDD
DDDDCCDCDCDCCDCD
CDDCCCCDCCCCCDCC
CCCCCCCCCCCCCCCC
CCCLCCCCCCCCCCCC
CCCCCCCCLCCCCCCC
CCCCCCCCCCCCLCCC
CCCCCCCCCCCCCCCC
CCCLCCCCCCCCCCCC
CCCCCCCLCCCCCLCC
CCCCCCCCCCCCCCCC
CCLCCCCLCCCLCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [dirt, bitmap`
CCCCCCCCCCCCCCCC
CCCCCLCCCCCCCCCC
CCLCCCCCCCCCCLCC
CCCCCCCCLCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCLCCLCCCCCC
CCCCCCCCCCCCCCLC
CCCLCCCCCCCCCCCC
CCCCCCCCCCCCLCCC
CCCCCCCLCCCCCCCL
CCCLCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCLCCCCCCC
CCCLCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [sky, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [cloud, bitmap`
7777777777777777
7777777777777777
7777777777722777
7772227777222277
7722222777777777
7777777777777777
7777777777777777
7777777777777777
7777777777222277
7777777772222227
7777277777777777
7772227777777777
7777777777222277
7777777772222277
7777777777777777
7777777777777777`],
  [rock, bitmap`
1111111111111111
1111111111111111
11111L1111111111
1111111111111111
1111111111L11111
1111111111111111
111111111111111L
1111111111111111
1L11111111L11111
1111111111111111
1111111111111111
111111111111111L
11L1111111111111
11111L1111111111
1111111111111111
1111111111111111`],
  [caveCrystal, bitmap`
LLLLLL000LLLLLLL
LLLLL00700LLLLLL
LLLL0077700LLLLL
LLLL0527270LLLLL
L00005272700000L
L05505272700220L
L05555272707220L
L05255272777770L
L05775272777770L
L05775272777700L
L0557527277770LL
L0055577277700LL
LL00555557700LLL
LLL001111100LLLL
LLLLL11111LLLLLL
LLLLLLLLLLLLLLLL`],
  [caveSky, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [cheese, bitmap`
................
................
......LLLLLL....
.....LL6666LL...
.....L66F666LL..
....LL6666666L..
...LL6666666FL..
...L6F666FFFFL..
..LL66FFFF666L..
..LFFFF6666F6L..
..L6F6666666LL..
..L66666F66LL...
..L6F6666LLL....
..L666LLLL......
..LLLLL.........
................`],
)

setSolids([player, playerCrouch, dirt, ground, crates, rock])
let playback = playTune(bgm, Infinity)

let level = 0
const levels = [
  map`
cccc....a.
ccca...a..
.....a....
.....e....
..a.ccc.a.
p..ccccc..
gggggggggg
dddddddddd`,
  map`
.a........
..........
.a..a..a..
..........
p....e.cc.
gggggggggg
dddddddddd
dddddddddd`,
  map`
.a......a.
..........
.a.a......
..........
p.......e.
ggg.cc.ggg
ddd.ccaddd
ddd.cc.ddd`,
  map`
...ecq....
.a.ecq..a.
...ccc.a..
a........a
p..ccc....
ggcccccggg
ddgggggddd
dddddddddd`,
  map`
.......a..
.a........
.a...e....
....ggg..a
p..cdddg..
gg.cddddc.
ddgggddggg
dddddddddd`,
  map`
gggggggggg
d..x.....x
de..x.....
dq......cg
dq...cc.cd
dcc..xx.cd
d...cccccd
...ccccccd
p.cccccccd
gggggggggd
dddddddddd`,
  map`
ggggggssss
xx...ssaas
p..xxsaaaa
g....sssss
d...esssss
dgggggcccc
dddddd.c.c
dddddd.c.c`,
  map`
..........
aaa.aaa.aa
........a.
....cc....
p.ecqce...
cccccccccc
c.c.c.c.c.
c.c.c.c.c.`,
  map`
....dd....
.a..dd..a.
...add....
a...qe.a.a
p...cc....
ccc....ccc
.c.cccc.c.
.c..dd..c.`,
  map`
...ccccc..
...cehqc..
...ccccc..
..........
p.........
cccggggggg
.c.ddddddd
.c.ddddddd`,
  map`
gggggggggggggggg
m..x......x.....
m.............x.
m....x...c.ccccm
mx.....c....cc.m
.....c..x...cc.m
p..c......x.ec.m
mmmm........cc.m`,
  map`
gggggggggggggggg
..x...........x.
p.....x.........
cccc.c...x..xccc
.cc..q....c..ccc
.cc..e.xc....ccc
.cc..q.......ccc
.ccqqeeeqeeqeccc`,
  map`
gggggggggggggggg
m...........x..m
m..x..........xm
mx...ccc.......m
m...ccccx...h..m
...ccccc...ccc.m
p.cccccc...ecq.m
mmmmmmmm...mmmmm`,
]

setMap(levels[level])
if (level == 5 || level == 6 || level == 10 || level == 11 || level == 12) {
  setBackground(caveSky)
} else {
  setBackground(sky)
}

let gravity = 1;

function isGroundBelow(playerX, playerY) {
  const belowTile = getTile(playerX, playerY + 1);
  return belowTile.some(sprite => sprite.type === ground);
}

function isTouchingEnemy(playerX, playerY) {
  const frontTile = getTile(playerX, playerY);
  return frontTile.some(sprite => sprite.type === enemy || sprite.type === enemyMirrored);
}

function isTouchingCheese(playerX, playerY) {
  const frontTile = getTile(playerX, playerY);
  return frontTile.some(sprite => sprite.type === cheese);
}

function applyGravity(playerSprite) {
  if (!isGroundBelow(playerSprite.x, playerSprite.y)) {
    playerSprite.y += gravity;
  }
}

function death() {
  setMap(levels[level]); // oop u died
  playTune(fail);
  deathCount++;
}

function generateElement(levelID) {
  clearText()
  addText("Level: " + (level + 1), {
    x: 0,
    y: 15,
    color: color`2`
  })
  if (level == 0) {
    addText("Welcome to...", {
      x: 4,
      y: 4,
      color: color`3`
    })
  }
  if (level == 1) {
    addText("RATVENTURE!", {
      x: 4,
      y: 2,
      color: color`L`
    })
  }
  if (level == 2) {
    addText("A small adventure", {
      x: 2,
      y: 2,
      color: color`6`
    })
    addText("for cheese!", {
      x: 5,
      y: 3,
      color: color`6`
    })
  }
  if (level == 3) {
    addText("Good luck!", {
      x: 5,
      y: 7,
      color: color`L`
    })
  }
}

generateElement(level)

onInput("w", () => {
  const playerSprite = getFirst(player);
  if (!jumping) {
    jumping = true;
    playerSprite.y -= 1; // weeeee
    playTune(jump)
    setTimeout(() => {
      playerSprite.y += 1; // waaaaa
      jumping = false;
      if (isTouchingEnemy(playerSprite.x, playerSprite.y)) {
        death()
      }
    }, 500);
  }
});

onInput("a", () => {
  const playerSprite = getFirst(player);
  playerSprite.x -= 1; // Move left
});

onInput("d", () => {
  const playerSprite = getFirst(player);
  playerSprite.x += 1; // Move right
});

onInput("s", () => {
  // Check if the current sprite is the player sprite
  if (getFirst(player)) {
    // Replace the player's sprite with the crouching sprite
    getFirst(player).type = playerCrouch;
    setTimeout(() => {
      getFirst(playerCrouch).type = player;
    }, 100);
  }
});

onInput("j", () => {
  if (canRestart) {
    level = 0;
    setMap(levels[level]);

    if (level == 5 || level == 6 || level == 10 || level == 11 || level == 12) {
      setBackground(caveSky)
    } else {
      setBackground(sky)
    }
    generateElement(level)
  }
});

afterInput(() => {

  const playerSprite = getFirst(player);
  if (playerSprite) {
    const playerX = playerSprite.x;
    const playerY = playerSprite.y;

    if (playerY === height() - 1) {
      setMap(levels[level]);
    }

    if (playerX === width() - 1) {
      if (levels[level + 1]) {
        level++;
        setMap(levels[level]);

        if (level == 5 || level == 6 || level == 10 || level == 11 || level == 12) {
          setBackground(caveSky)
        } else {
          setBackground(sky)
        }
        generateElement(level)
      }
    }

    if (!jumping) {
      applyGravity(playerSprite);
    }

    if (isTouchingEnemy(playerSprite.x, playerSprite.y)) {
      death()
    }

    if (isTouchingCheese(playerSprite.x, playerSprite.y)) {
      playTune(win)
      addText("You win!", {
        x: 1,
        y: 1,
        color: color`4`
      })
      const cheesess = getFirst(cheese)
      cheesess.remove()
      setTimeout(() => {
        addText("Press j to restart!", {
          x: 1,
          y: 14,
          color: color`4`
        })
        addText("You died " + deathCount + " time(s)!", {
          x: 0,
          y: 1,
          color: color`3`
        })
        deathCount = 0;
        canRestart = true;
      }, 3000);

    }
  }
})

onInput("i", () => {
  if (musicPlaying) {
    playback.end(); // Stop the music
    musicPlaying = false;
  } else {
    playback = playTune(bgm, Infinity); // Start the music
    musicPlaying = true;
  }
  console.log(musicPlaying);
});
