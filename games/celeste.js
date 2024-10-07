/*
@title: Celeste: Sprig Edition
@author: DillonB07
@tags: ['platformer']
@addedOn: 2024-06-14
Celeste: Sprig Editon is directly inspired by https://celestegame.com and is a version made especially for the Sprig!

@img: ""
*/

const strawberry = "a"
const blueStrawberry = "A"
const block = "b"
const verticalGirder = "c"
const goal = "B"
const darkGrass = "g"
const lightGrass = "l"
const player = "p";
const spike = "s"
const spring = "u"
const sprungSpring = "S"
const blueGround1 = "G"

let playerUpwardsVel = -1
let playerHorizontalVel = 1
let maxJump = 2;
let dashActive = false;
let dashDirections = [];
let deaths = 0;


// SPRITES

// Maddy :D
const madelineStanding = bitmap`
.....00000......
....0C333C0.....
...0C33333C0....
...03333C3330...
...03333CC330...
...03C6666600...
..033FFFFFF00...
..030C66660C0...
..030555CC500...
...0577777550...
...056F77770F0..
....06FCCCC0F0..
...00000000.0...
..00CC000C0.....
..0CC0.0CC0.....
..0CF0.0CF0.....`;
const madelineDashlessStanding = bitmap`
.....00000......
....0577750.....
...057777750....
...07777C7770...
...07777CC770...
...07C6666600...
..077FFFFFF00...
..070C66660C0...
..070555CC500...
...0577777550...
...056F77770F0..
....06FCCCC0F0..
...00000000.0...
..00CC000C0.....
..0CC0.0CC0.....
..0CF0.0CF0.....`;
const tinyline = bitmap`
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
.....333........
....33333.......
...33555........
...3.CCC........
.....0.0........`;


// Interactables
const springUnsprungBitmap = bitmap`
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
.00000000000000.
.0C9999999999C0.
.091CCCCCCCC190.`;
const springSprungBitmap = bitmap`
................
................
................
................
................
.00000000000000.
.0C9999999999C0.
.091CCCCCCCC190.
.00000L00L00000.
.....0L00L0.....
.....001100.....
.....0L00L0.....
.....0L00L0.....
.....001100.....
.....0L00L0.....
.....0L00L0.....`;
const strawberryBitmap = bitmap`
................
................
................
......0000......
.....0D0440.....
....0440D40.....
.....0H44D40....
....0H3HH3H0....
...0333333330...
...0338338330...
...0833333380...
...0333333330...
....03333330....
.....033330.....
......0330......
.......00.......`
const blueStrawberryBitmap = bitmap`
................
................
................
......0000......
.....0D0440.....
....0440D40.....
.....0H44D40....
....0H7HH7H0....
...0775777770...
...0575775770...
...0577777550...
...0777577770...
....07777770....
.....077770.....
......0770......
.......00.......`

// Blocks
const verticalGirderBitmap = bitmap`
1LLLLLLLLLLLLLL1
110LLLLLLLLLL011
11L01LLLLLL10L11
1L0L11111111L0L1
1LL0111111110LL1
1LLL0L1111L0LLL1
1LLLL011110LLLL1
1LLLL011110LLLL1
1LLLL011110LLLL1
1LLLL011110LLLL1
1LLL0L1111L0LLL1
1LL0111111110LL1
1L0L11111111L0L1
11L01LLLLLL10L11
110LLLLLLLLLL011
1LLLLLLLLLLLLLL1`;
const bottomVerticalGirderBitmap = bitmap`
1111111111111111
110LLLLLLLLLL011
11L01LLLLLL10L11
1L0L11111111L0L1
1LL0111111110LL1
1LLL0L1111L0LLL1
1LLLL011110LLLL1
1LLLL011110LLLL1
1LLLL011110LLLL1
1LLLL011110LLLL1
1LLL0L1111L0LLL1
1LL0111111110LL1
1L0L11111111L0L1
11L01LLLLLL10L11
110LLLLLLLLLL011
1111111111111111`;
const blueGround1Bitmap = bitmap`
2222222222222222
2111222112222112
2212222221221222
2221221222112212
2125215151151251
7555755251255755
7777770777777777
7777707777777777
0005775775077772
0050007777707772
0000500005577722
0000005000557072
0000000000057777
0550000000007772
0570000000000077
0000000000050007`;
const goalBitmap = bitmap`
CCCCCCCCCCCCCCCC
CDDDDDDDDDDDDDDC
CDDDDDDDDDDDDDDC
CDD4444444444DDC
CDD4444444444DDC
CDD4488888844DDC
CDD4488888844DDC
CDD4488888844DDC
CDD4488888844DDC
CDD4488888844DDC
CDD4488888844DDC
CDD4444444444DDC
CDD4444444444DDC
CDDDDDDDDDDDDDDC
CDDDDDDDDDDDDDDC
CCCCCCCCCCCCCCCC`

setLegend(
  [player, madelineStanding],
  [lightGrass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [darkGrass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [block, bitmap`
0111111L11111111
1111111011111LLL
00LLLL000LLLL00L
1111111L11111111
1111111L11111111
0LL0011L11111111
000LLLLL0L1000LL
1111111L11111111
1111110LL1111111
111111LL01111111
111111LLL1111111
1111110L11111111
111111LL01111111
1111111L0111111L
01111110L1111110
0L0LLL0L0LLL000L`],
  [spike, bitmap`
................
................
................
................
................
................
.1...1....1...1.
.1...1....1...1.
.1...1....1...1.
.1...1....1...1.
L1L.L1L..L1L.L1L
L1L.L1L..L1L.L1L
L1L.L1L..L1L.L1L
L1L.L1L..L1L.L1L
L1L.L1L..L1L.L1L
L1L.L1L..L1L.L1L`],
  [spring, springUnsprungBitmap],
  [sprungSpring, springSprungBitmap],
  [strawberry, strawberryBitmap],
  [verticalGirder, verticalGirderBitmap],
  [blueGround1, blueGround1Bitmap],
  [blueStrawberry, blueStrawberryBitmap],
  [goal, goalBitmap]
);

setSolids([lightGrass, darkGrass, player, block, spike, verticalGirder, blueGround1, goal]);

let score = 0;
let level = 0;
const levels = [
  map`
bcGGGGcGGbbbbbbbb...
.c..GGcG..bbbbbbb...
.c...Gc.....bbbbb...
.c......a....bbbb...
.c.............bb...
.c.............bb...
bb.............bb...
c...................
c...................
c...................
c.......a...........
c...................
c........us......bbB
c........bbs...bbbbb
c.......ubbbssbbbbbb
bGGGGGGbbbbbbbbbbbbb`, map`
bbbbbbbbbbbbbbbbbbbb
bbb..c.........bbbbb
bb...c...........cbb
b....c...........c.b
cccccc...........c..
c................c..
c................c..
c................c..
c..........b.....c..
c.......bb..........
c.............b..c..
c...bb...........c..
G......sss......sGGB
bG.u...GGGssssssGGbb
bGGGGGGGbGGGGGGGGbbb
bbbbbbbbbbbbbbbbbbbb`
];

setMap(levels[level]);

// Handle movement

function jump() {
  if (getTile(getFirst(player).x, getFirst(player).y + 1) != 0)
    playerUpwardsVel = maxJump;
}

function springUp(tile) {
  // We are not checking if the player is on a spring as that is done before this function is called
  playerUpwardsVel = maxJump * 3;
  // We are unable to change the bitmap of one spring instance so we recreate the spring
  clearTile(tile.x, tile.y);
  addSprite(tile.x, tile.y, sprungSpring);
  setTimeout(() => {
    clearTile(tile.x, tile.y);
    setTimeout(() => {
      addSprite(tile.x, tile.y, spring);
    }, 50);
  }, 200);
}

function containsAll(arr, values) {
  return values.every(v => arr.includes(v));
}

function dashUp(amount) {
  // Temp increase ver vel up
  playerUpwardsVel = maxJump * amount
  setTimeout(() => playerUpwardsVel = -1, 500)
}

function dashDown(amount) {
  // Temp increase ver vel down
  playerUpwardsVel = maxJump * -amount
  setTimeout(() => playerUpwardsVel = -1, 500)
}

function dashLeft(amount) {
  // Temp increase hori vel left
  playerHorizontalVel = maxJump * -2
  for (let i = 0; i < amount; i++) {
    getFirst(player).x--
    tick++
  }
  setTimeout(() => playerHorizontalVel = 1, 500)
}

function dashRight(amount) {
  // Temp increase hori vel right
  playerHorizontalVel = maxJump * amount
  for (let i = 0; i < amount; i++) {
    getFirst(player).x++
    tick++
  }
  setTimeout(() => playerHorizontalVel = 1, 500)
}

function dash() {
  if (playerUpwardsVel != -1) {
    return
  }
  if (containsAll(dashDirections, ["w", "d"])) {
    // Up right
    dashUp(2)
    dashRight(4)
  } else if (containsAll(dashDirections, ["s", "d"])) {
    // Down right
    dashDown(2)
    dashRight(2)
  } else if (containsAll(dashDirections, ["s", "a"])) {
    // Down left
    dashDown(2)
    dashLeft(2)
  } else if (containsAll(dashDirections, ["w", "a"])) {
    // Up left
    dashUp(2)
    dashLeft(2)
  } else if (containsAll(dashDirections, ["w"])) {
    // Up
    dashUp(2)
  } else if (containsAll(dashDirections, ["d"])) {
    // Right
    dashRight(4)
  } else if (containsAll(dashDirections, ["s"])) {
    // Down
    dashDown(2)
  } else if (containsAll(dashDirections, ["a"])) {
    // Left
    dashLeft(4)
  } else {
    dashRight(4)
  }
}


function calculateGravity(playerX, playerY) {
  let downTile = getTile(playerX, playerY + 1)
  if (playerUpwardsVel > 0) {
    getFirst(player).y--
    playerUpwardsVel--;
  } else if (playerUpwardsVel < 0) {
    getFirst(player).y++
  } else if (downTile == 0)
    playerUpwardsVel = -1;
}


onInput("a", () => {
  // Left
  if (dashActive) {
    if ((dashDirections.length < 2) && (!dashDirections.includes("a"))) {
      dashDirections.push("a")
    }
  } else {
    getFirst(player).x -= 1;
  }
});

onInput("d", () => {
  // Right
  if (dashActive) {
    if ((dashDirections.length < 2) && (!dashDirections.includes("d"))) {
      dashDirections.push("d")
    }
  } else {
    getFirst(player).x += 1;
  }
});

onInput("w", () => {
  // Up
  if (dashActive && (dashDirections.length < 2) && (!dashDirections.includes("w"))) {
    dashDirections.push("w");
  }
});

onInput("s", () => {
  // Down
  if (dashActive && (dashDirections.length < 2) && (!dashDirections.includes("s"))) {
    dashDirections.push("s");
  }
});

onInput("i", () => {
  jump();
});

onInput("j", () => {
  dashDirections = [];
  dashActive = true;
  setTimeout(() => {
    dash();
    dashActive = false;
  }, 150)
})

let tick = 0;
let playerX;
let playerY;

function murder() {
  deaths++;
  clearText();
  setMap(levels[level]);
  addSprite(5, 5, player)
}

function onTick() {
  addText(`Death${deaths !== 1 ? 's' : ''}: ${deaths}\nScore: ${score}`, { color: color`0` })
  if (tick == 40) clearText();
  if (typeof getFirst(player) == 'undefined') {
    addSprite(playerX, playerY, player);
  };
  playerX = getFirst(player).x;
  playerY = getFirst(player).y;
  tick++;

  let tile = getTile(playerX, playerY + 1)[0]
  try {
    if (tile.type == spike) {
      murder();
    }
  } catch (e) {
    // I have no idea why this catch exists, I should try removing it and see what happens
    // OK DO NOT REMOVE THIS UNDER ANY CIRCUMSTANCES, THAT IS AN INCREDIBLY BAD THING TO DO
  }
  try {
    if (tile.type == spring) {
      springUp(tile);
    }
    if (tile.type == strawberry) {
      score += 1000;
      clearTile(tile.x, tile.y);
      addSprite(tile.x, tile.y, blueStrawberry);
    }
    if (tile.type == goal) {
      nextLevel();
    }
  } catch (e) {}
  calculateGravity(playerX, playerY);
}

function restart() {
  clearText();
  setMap(levels[level]);
  addSprite(5, 5, player);
}

function nextLevel() {
  level++;
  if (levels.length == level) gameOver()
  restart();
}

function gameOver() {
  clearText();
  setMap(map`
bbbbbbbbbbbbbbbbbbbb
bb................bb
b....aa......aa....b
c....aa......aa....c
c..................c
c..a............a..c
c..a.....aa.....a..c
c..a............a..c
c...a..........a...c
c....a........a....c
c.....aaaaaaaa.....c
cc.ccccccccccccccccc
G.........c........G
G.................aG
GG........c......GGG
GGGGGGGGGGcssssGGGGG`)
  addSprite(5, 5, player);
}

addSprite(5, 5, player);
setInterval(onTick, 50);
