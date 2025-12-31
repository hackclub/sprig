/*
@title: Paws Up!
@description: Paws up is a challenging game where you a cat jump onto platforms. 
@tags: ['platformer']
@addedOn: 2025-012-06

@img: ""
*/

const coin = "c"
const player = "p"
const island = "i"
const background = "b"
const counter = "x"
var total = "0";
const portal = "z"



setLegend(
  [player, bitmap`
................
........0.....0.
.......010...010
..00...021000120
.0220..011LLL110
01120..0L10110L0
0L10...011111110
010....0L11221L0
0L0....00122220.
010...0L1LLLL0..
01L0001L11LL10..
.0110L11L11110..
..0001L1111110..
....0110110110..
....0220220220..
....0000000000..`],
  [coin, bitmap`
................
................
..........LLL...
.......L..LLLL..
L....L..L.LLLLL.
LL.L..L.L.L...LL
.LL.L.L.L.L.L.LL
..LLLLLLLLL...L.
.LL.......LLLL.L
LL..L.L.L.LLL.LL
L..L..L.L.LLLLL.
.....L..L.LLLL..
.......L..LLL...
................
................
................`],
  [island, bitmap`
0000000000000000
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
00DD00DD00DD00D0
0C00CC00CC00CC00
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000`],
  [background, bitmap`
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
  [counter, bitmap`
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
....L.L..L..LL..
....LL.L..L.L.L.
.....LLLLLLLLLLL
....LL......LLL.
....L..L..L.LL..
......L..L......`],
  [portal, bitmap`
.....000000.....
....00882200....
...00H3333200...
..00H333333800..
.00333333333800.
0033330000333800
0000002222000000
..022222222220..
..022200002220..
..0220LLLL0220..
..0201111LL020..
..02011111L020..
..02011111L020..
..02011111L020..
..02011111L020..
..02011111L020..`]
)

setSolids([player, island])

let level = 0;
const levels = [
  map`
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
pbbbbbbbbz
iiiiiiiiii
bbbbbbbbbb`,
  map`
....c..x..
..........
.........z
.........i
....i..cii
p.iii..iii
iiiiiiiii.
..........`,
  map`
...c...x..
..........
..........
...ii..c..
..iiii....
piiiiiii.z
iiiiiiiiii
..........`,
  map`
..c....x..
..i......c
..i..iiiii
..i....iii
.iii....ii
piii....zi
iiiiiiiiii
..........`,
  map`
.......x..
..........
...c......
......i...
...i..c...
p........z
i.i..i...i
..........`,
  map`
.......x..
..c.......
...c......
.p..c.....
.i...c....
......z...
i.....i...
..........`,
  map`
....c..x..
........z.
....i...i.
..........
..i..ci.c.
p.........
i....i..i.
..........`,
  map`
c......x..
i.iiii..i.
..........
......ii..
.ii.c.....
p.......z.
i...i...i.
..........`,
  map`
.......x..
..........
..cc..cz..
..cc..cc..
.........i
p.i....i..
i..iiii...
..........`,
  
]

addText("Welcome To \nPaws Up!", {
        x: 2,
        y: 2,
        color: color`0`,});
addText("W: Jump\nA: Right\nD: Left", {
        x: 5,
        y: 7,
        color: color`0`,});
addText("Go to the portal!", {
        x: 1,
        y: 5,
        color: color`0`,});

const endScreen = map`
.......x..
..........
..........
..........
..........
..........
p.........
iiiiiiiiii`;
setMap(levels[level])
setBackground(background);

/*setPushables({
  [ player ]: []
})*/

/*onInput("s", () => {
  
  getFirst(player).y += 1
})*/

onInput("w", () => {
  if (isGrounded()) {
    if (getFirst(player).y < 2) {
      getFirst(player).y -= 1;
    } else if (getFirst(player).y < 3) {
      getFirst(player).y -= 2;
    }

    getFirst(player).y -= 3
  }
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

var done = false;

function levelEnd() {
  let obstacles = getFirst(portal);
  let p = getFirst(player);
  if (obstacles.x == p.x && obstacles.y == p.y) {
    
    if (level > levels.length - 2) {
      
      
      setMap(endScreen)
      addText("Thank You \nFor Playing", {
        x: 5,
        y: 5,
        color: color`0`,
      });
      done = true;
      return;
    }
    
    level++;
    clearText();
    addText(total.toString(), {
      x: 17,
      y: 1,
      color: color`0`,
    })
    setMap(levels[level]);
  }


}

function isGrounded() {
  let obstacles = getAll(island);
  let p = getFirst(player);
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == (p.y + 1)) {
      return true;
    }
  }
  return false;
}

function checkHit() {
  let obstacles = getAll(coin);
  let p = getFirst(player);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      let tempX = p.x;
      let tempY = p.y;
      clearTile(tempX, tempY);
      addSprite(tempX, tempY, player);
      return true;
    }
  }
  return false;
}

addText("0", {
  x: 17,
  y: 1,
  color: color`0`,
})
let check = 0;
var gameLoop = setInterval(() => {
  check++;
  isGrounded();
  if (!done) {
    levelEnd();
  }
  if (getFirst(player).y > 6) {
    getFirst(player).y = 5;
    getFirst(player).x = 0;
  }
  if (checkHit()) {
    total++;
    addText(total.toString(), {
      x: 17,
      y: 1,
      color: color`0`,
    })
  }
  if ((check % 2) == 0) {
    getFirst(player).y += 1;
  }
}, 100);
