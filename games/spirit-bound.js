
/* 
@title: spirit-bound
@author: Tom-on
@tags: ['adventure']
@addedOn: 2023-08-31
*/

    /*
@name       Spirit Bound
@author     Tom-on

About:
Spirit Bound is a 2D puzzle game made in sprig!
Your goal is to navigate the complex of rooms, while the spirits try to kill you.
If you move, the spirits move in the same direction.
Collect keys, open doors and get out.
This game has 16 Maps + 4 Challange maps (You will take -2 Damage if you want to enter the challenge)

! Every Level Is Possible Without Taking Damage !
aaaas
Controls:
WASD - Move
J    - Interact
L    - Restart level

In menu:
WS   - Navigate
K    - Submit

Tip: If you ever get stuck, restart the level by using 'L'

Note:
There is an issue with how the enemies move that creates some unexpected situations.
The issue is that when you move in certain directions, the enemies move in rapid succession which
results in one tile gaps in some cases. Since some puzzles have you exploit this 
mechanic, i won't fix it and i'll instead call it a feature :)
*/

// Sprites
const player = "@";
const wall = "#";
const wallVine = "V";
const wallCracked = "C";
const door = {y: "Y", r: "R", g: "G", b: "B"};
const doorOpen = "O";
const exit = "$";
const spirit = "X";
const key = {y: "y", r: "r", g: "g", b: "b"};
const bg = "%";
const bgGrass = "=";

setLegend(
  [ player, bitmap`
................
......1LL1......
.....1LLLL1.....
.....1L11L1.....
.....11LL11.....
.....L1LL1L.....
......L11L......
.....LLLLLL.....
....LL1LL1LL....
....1LL11LL1....
....1LLLLLL1....
....1.1LL1.1....
....2.1..1.2....
......L..L......
......2..2......
................` ], 
  [ wall, bitmap`
111111L1111111L1
111111L1111111L1
11111LL111111LL1
LLLLL1LLLLLLL11L
11L1111111L11111
11L1111111L11111
1LL1111111LL1111
L11LLLLLLL11LLLL
111111L1111111L1
111111L1111111L1
11111LL111111LL1
LLLLL11LLLLLLL1L
11L1111111L11111
11L1111111L11111
11LL11111LL11111
LL11LLLLL11LLLLL` ], 
  [ wallVine, bitmap`
4D1111LD111111L1
141111L4111111L1
1D411L4D111114L1
LLD4L14444DD411L
114114D1114D1111
1141141111L41111
14D1141111L44D11
L14DL4LLLL1DD4LL
11D414D1111114L1
11411141111114D1
114D1L4D11111D41
LLL4L14DLLLLL41L
11L111D111L114D1
11L111D411L1114D
11LL11141LL11114
LL11LLLDL11LLLL4` ], 
  [ wallCracked, bitmap`
011111L1101111L1
100011L110L111L0
11L01L1010L11L01
LL1L000LL0LLL00L
1111L0L110000LL1
100010L110L0L111
11L011010LL0L101
L11L000L00LL010L
1111LL00L111L0L1
1111110L11111L01
11111L0L00111L0L
LLL0L100LL01L0LL
11L000LL11L0L111
1000LL11010L1111
11LL1110L0L11111
LL11LLL0L01LLLL0` ], 
  [ door.y, bitmap`
111111LLLL1111L1
11111LCCCCL111L1
1111LCCCCCCLLLL1
LLLLCCCCCCCCL11L
11LLCCCCCCCCL111
11LCCCCLLCCCCL11
1LLCCCLCCLCCCL11
L1LCCCLCCLCCCLLL
11LCC111111CCLL1
11LCC1LLLL0CCLL1
11LCC1L66L0CCLL1
LLLCC1LLLL0CCL1L
11LCC000000CCL11
11LCCCCCCCCCCL11
11LCCCCCCCCCCL11
LLLCCCCCCCCCCLLL` ], 
  [ door.r, bitmap`
111111LLLL1111L1
11111LCCCCL111L1
1111LCCCCCCLLLL1
LLLLCCCCCCCCL11L
11LLCCCCCCCCL111
11LCCCCLLCCCCL11
1LLCCCLCCLCCCL11
L1LCCCLCCLCCCLLL
11LCC111111CCLL1
11LCC1LLLL0CCLL1
11LCC1L33L0CCLL1
LLLCC1LLLL0CCL1L
11LCC000000CCL11
11LCCCCCCCCCCL11
11LCCCCCCCCCCL11
LLLCCCCCCCCCCLLL` ], 
  [ door.g, bitmap`
111111LLLL1111L1
11111LCCCCL111L1
1111LCCCCCCLLLL1
LLLLCCCCCCCCL11L
11LLCCCCCCCCL111
11LCCCCLLCCCCL11
1LLCCCLCCLCCCL11
L1LCCCLCCLCCCLLL
11LCC111111CCLL1
11LCC1LLLL0CCLL1
11LCC1L44L0CCLL1
LLLCC1LLLL0CCL1L
11LCC000000CCL11
11LCCCCCCCCCCL11
11LCCCCCCCCCCL11
LLLCCCCCCCCCCLLL` ], 
  [ door.b, bitmap`
111111LLLL1111L1
11111LCCCCL111L1
1111LCCCCCCLLLL1
LLLLCCCCCCCCL11L
11LLCCCCCCCCL111
11LCCCCLLCCCCL11
1LLCCCLCCLCCCL11
L1LCCCLCCLCCCLLL
11LCC111111CCLL1
11LCC1LLLL0CCLL1
11LCC1L55L0CCLL1
LLLCC1LLLL0CCL1L
11LCC000000CCL11
11LCCCCCCCCCCL11
11LCCCCCCCCCCL11
LLLCCCCCCCCCCLLL` ], 
  [ doorOpen, bitmap`
111111LLLL1111L1
11111L0000L111L1
1111L000000LLLL1
LLLL00000000L11L
11LL00000000L111
11L0000000000L11
1LL0000000000L11
L1L0000000000LLL
11L0000000000LL1
11L0000000000LL1
11L0000000000LL1
LLL0000000000L1L
11L0000000000L11
11L0000000000L11
11L0000000000L11
LLL0000000000LLL` ], 
  [ exit, bitmap`
111111L1111111L1
111111L1111111L1
11111LLLLLL11LL1
LLLLL00000LLL11L
11L0000000L11111
11L00000000LL111
1LL000000000L111
L1L000000000LLLL
11L00000000000L1
11L00000000000L1
111L000000000LL1
LLLL00000000LL1L
11L000000000L111
11L000000000L111
11LL0000000L1111
LLLL0000000LLLLL` ], 
  [ spirit, bitmap`
...00.LLLL......
.....00000L.0...
..0.L0300300....
...0009009000...
.0..L000000L.0..
.00.L000000L....
..0..L00000...0.
..000.LLLL.0..0.
.0..00.0.....0..
.0....0000000...
.00...000.......
...000.00.......
.00....0.00.00..
0.000000..000.0.
0.....0.........
.0...0..........` ], 
  [ key.y, bitmap`
................
......6666......
.....666.66.....
.....66...6.....
.....6...66.....
.....66.666.....
......6666......
.......6........
.......6........
.......6........
.......666.6....
.......6.666....
.......6........
.......6.666....
.......666.6....
.......6........` ], 
  [ key.r, bitmap`
................
......3333......
.....333.33.....
.....33...3.....
.....3...33.....
.....33.333.....
......3333......
.......3........
.......3........
.......3........
.......333.3....
.......3.333....
.......3........
.......3.333....
.......333.3....
.......3........` ], 
  [ key.g, bitmap`
................
......4444......
.....444.44.....
.....44...4.....
.....4...44.....
.....44.444.....
......4444......
.......4........
.......4........
.......4........
.......444.4....
.......4.444....
.......4........
.......4.444....
.......444.4....
.......4........` ], 
  [ key.b, bitmap`
................
......5555......
.....555.55.....
.....55...5.....
.....5...55.....
.....55.555.....
......5555......
.......5........
.......5........
.......5........
.......555.5....
.......5.555....
.......5........
.......5.555....
.......555.5....
.......5........` ], 
  [ bg, bitmap`
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
0000000000000000` ], 
  [ bgGrass, bitmap`
4DDDDDDDDDDDDDDD
D4DDDDDDDDD44D4D
DDDDDD444DDDDDD4
D4DDDDDDDD4DDDDD
DD4444DDDDDDDDDD
D4D4DD4DDDD444DD
DDDDDDDDDDDDDD4D
DDDDDD44444DDDDD
DDDDDDDDDDD4DDDD
D4DDDDDDDDDDD4D4
D44DDDDDD4DDDDDD
DDDDD44D44DDDDDD
DDDDDDDDDD4DDD4D
DDDDDDDDDDDDDDDD
44D4DDDDDDDDDDDD
DDDD44DDDDDD44D4` ], 
)

// Levels
let level = 0;

const start = map`
X..X..X.....
......XX..X.
..X.X...X...
############
#..#.......#
#..#.......#
#..Y..@.y..$
#..#.......#
#..#.......#
############`;
const win = map`
C###########
Cy.........#
#r...@.....#
V##CC#####Y#
V##......#X#
##V......#X#
V###C#####R#
V..........C
#..........C
##C##$######`;
const chalengeWin = map`
#######=====
#.XrXX#=====
#X....#=====
###Y###=====
.@...bR=====
###B###=====
#X....#=====
#..y..#=====
#....X#=====
#######=====`
const lose = map`
.....#######
.....#....X#
.....#X....#
.....#...y.#
.....#.....#
.....###Y###
.....#.X...#
.....#.....#
.....#X...X#
.....###$###`;

const levels = [
  start, 
  map`
############
#...#......#
#.@......X.#
#...#......#
##.####Y####
#...#......#
#...#......#
#.y.#.X....$
#.X.#......#
############`, // Lvl1
  map`
#.##$#######
#@#..X#....#
#.#X..#....#
#.##Y###.#.#
#........#.#
##.#######.#
#...#.X....#
#.X.#...y..#
#...#.....X#
############`, // Lvl2
  map`
############
#...#X.#...#
$.X.Y......#
#...#.X#...#
########...#
#X.....#...#
#.y...X#...#
#..........#
#..X...#.@.#
#########.##`, // Lvl3
  map`
############
#.X.#.##...#
#.#.#XX..#.#
#y#.#X.#Y###
###...##...$
.@..#...###V
#.#####.#..#
#.....#.#.##
#.#.#......#
############`, // Lvl4
  map`
#####.######
#####@..X..#
####V..X.y.V
V#V#V.....X#
###VV#.V#VV#
#VV#V#.#...V
#V#VVV.#...V
V#####.#...#
$...Y......V
##VVV###VV##`, // Lvl5
  map`
###VVV###VVV
#..X...X..@.
VXV###VVV###
VX.X....X..V
V###V#####.V
#X..Y......V
#...V##VV#.#
#...#V.....V
V...#y.....#
VV$###VV#V##`, // Lvl6
  map`
##VV#.##VV##
V....@.....#
V..........#
V..........V
#..........V
##VV#.#####V
#X..#.#X..X#
$.XXY...Xy.V
#.X.#.#.X..V
VV###VVVV###`, // Lvl7
  map`
######$#####
#.X.#...#..#
#.b.#.....X#
#...#...#..#
##Y##...#..#
V...#####X.#
#...V...#..#
#.....y.B..#
V.@.#...#..#
V#.#V##V####`, // Lvl8
  map`
#C##########
CX..X#X...y#
..XX.#.X.X.#
XX.X.C##.###
.X.XbY.....#
X.X.X#...X.#
..X..CX....#
CX..XC##.###
C.X..#.R@Br#
##C###$#.###`, // Lvl9
  map`
############
$.....Y....#
#######..X.#
#y#.....####
#.#X.....Xb#
#X#####.####
#.#.......X#
#B#####.####
#.........@.
############`, // Lvl10
  map`
.CCC#####V##
Cb.R...XB.yV
#C.C....V##V
CX.........V
C.....X....#
.#Y##..##.##
C...#X.#...#
#...#X.#...#
#...#.X#.@.#
##$######.##`, // Lvl11
  map`
V##VV##V####
V#C..X....XV
#VCb.....X.#
####C#C..C##
.@.#$.B..C..
##.####Y##..
#X.X.....#..
#.##.##X##..
#.X..#.y.#..
##########..`, // Lvl12
  map`
###C#.#C####
#..XC@#X.rX#
#X..#....X.#
C...R.C....#
#X.XC.#.X..#
CCY.#.######
C...C.#..X.#
#.g.#.G....$
#..X#.#.X.C#
#########CC#`, // Lvl13
  map`
#####V#####V
#g..X..X...#
V#########.#
#...X......#
.@C.......##
C.C.....X.#V
V...X......V
V#########.#
$...X....G.#
####VVV#####`, // Lvl14
  map`
############
#y.#.X#X..b#
#..#..#.#X.#
#.##..Y....#
#.X.X.#.X#.#
V..##.#...X#
#..#..######
#X.#.##....#
V#V#@B.....#
#VV#.###$###`, // Lvl15
  map`
############
#.....R.Xg.#
V.#.#.####B#
#X...X#b.#.#
#.#y#.#X.#.#
#X...X#..#.#
V.#.#.#G##.#
V.....#.r#.#
V.#.#.Y..#.$
###@########`, // Lvl16
  win, 
  map`
#####.###...
#X...@.X#...
#.#.#.#.####
#..X.X..#..#
#.#.y.#.Y.r#
#..X.X..#..#
#.#.#.#.####
#X.....X#...
####R####...
...#$#......`, // Chalenge 1
  map`
.###########
.#.......#.#
.#..#.#..#.#
##.X.X.X.Yb#
$G..#.#..###
##.X.@.X.###
.#..#.#..Bg#
.#.X.X.X.#.#
.#y......#.#
.###########`, // Chalenge 2
  map`
############
#.....Y.Xr.#
#.X.#.####R#
#.#.#.#.gX.#
#...#.#G####
#.#.X.#.Xb.#
#.#.#.####B#
#.#.X....#.#
#y....##@#X#
########.#$#`, // Chalenge 3
  map`
############
.@.........#
##########.#
#.....X..#X#
#.######.#.#
#.#r...Bg#.#
#.########.#
#X.........#
#.####.#G#R#
#......#b#$#`, // Chalenge 4
  chalengeWin, 
  lose
]
// Level code
  
const startCode = () => { 
  addText("Spirit-bound", {x: 4, y: 2, color: color`3`})
  // addText("Use WASD to move", {x: 2, y: 5, color: color`2`})
  if (!keys.y) addText("Grab the key", {x: 7, y: 8, color: color`6`})
  if (keys.y) addText("Open the door", {x: 0, y: 8, color: color`2`})
  if (!getFirst(door.y)) addText("Exit ->", {x: 8, y: 10, color: color`2`})
}
const level1Code = () => { // Lvl1
  if (!keys.y) addText("You move\nSpirit moves", {x: 7, y: 9, color: color`2`});
  if (keys.y) addText("Don't touch them!", {x: 2, y: 14, color: color`2`});
}
const winCode = () => { // Win
  addText("Victory!", {x: 6, y: 7, color: color`6`})
  addText("->  Challenge", {x: 6, y: 15, color: color`2`})
}
const challengeWinCode = () => { // Challenge Win
  if (!getFirst(door.r)) {
    addText("The End", {x: 12, y: 2, color: color`6`})
    addText("For now...", {x: 1, y: 15, color: color`2`})
  }
}
const loseCode = () => { // Lose
  addText("You Died ", {x: 0, y: 0, color: color`3`});
  addText(" Restart", {x: 0, y: 4, color: navIndex == 0 ? color`6` : color`3`});
  addText("  Menu", {x: 0, y: 6, color: navIndex == 1 ? color`6` : color`3`});
  addText("W/S Nav\nJ Submit", {x: 0, y: 12, color: color`2`});
}

// Variables
let health = 3;
let oldHealth = 3;
const keys = {y: false, r: false, g: false, b: false};
let navIndex = 0;

// Functions
const levelCode = () => {
  if (level == 0) startCode();
  else if (level == 1) level1Code();
  else if (level == 17) winCode();
  else if (level == levels.length-2) challengeWinCode();
  else if (level == levels.length-1) loseCode();
}

const nextLevel = () => {
  level++;
  keys.y = false;
  keys.r = false;
  keys.g = false;
  keys.b = false;
  oldHealth = health;
  if (level >= levels.length-1) level = 0;
  setMap(levels[level]);
}

const detectAround = (x1, y1, x2, y2) => {
  if (x1 == x2 && y1 == y2+1) return true;
  else if (x1 == x2+1 && y1 == y2) return true;
  else if (x1 == x2-1 && y1 == y2) return true;
  else if (x1 == x2 && y1 == y2-1) return true;
  else if (x1 == x2 && y1 == y2) return true;
  return false;
}

const drawUi = () => {
  clearText();
  addText(`Health: ${health}`, {x: 0, y: 0, color: color`2`});
  if (level != 0 && level != 17 && level != levels.length-1) 
    addText(`Level: ${level}`, {x: 2, y: 15, color: color`2`})
}

const move = (dir) => {
  if (health == 0) {
    if (dir == 0 || dir == 2) navIndex = (navIndex + 1) % 2;
    return;
  }
  if (dir == 0) getFirst(player).y--;
  else if (dir == 1) getFirst(player).x--;
  else if (dir == 2) getFirst(player).y++;
  else if (dir == 3) getFirst(player).x++;

  // Move the enemies
  getAll(spirit).forEach(s => {
    if (dir == 0) s.y--;
    else if (dir == 1) s.x--;
    else if (dir == 2) s.y++;
    else if (dir == 3) s.x++;
  })
  // Detect damage (done seperatly do avoid bugs)
  getAll(spirit).forEach(s => {
    if (detectAround(s.x, s.y, getFirst(player).x, getFirst(player).y)) {
      health--;
      s.remove();
      if (health <= 0) {
        level = levels.length-1;
        keys.y = false;
        keys.r = false;
        keys.g = false;
        keys.b = false;
        setMap(levels[level]);
        drawUi();
        levelCode();
        return;
      }
    }
  })
}

const keyCheck = () => {
  Object.keys(key).forEach(d => {
    if (getFirst(key[d]) && detectAround(getFirst(key[d]).x, getFirst(key[d]).y, getFirst(player).x, getFirst(player).y)) {
      keys[d] = true;
      getFirst(key[d]).remove();
    }
  })
}

const doorCheck = () => {
  Object.keys(door).forEach(d => {
    if (getFirst(door[d]) && keys[d] && detectAround(getFirst(door[d]).x, getFirst(door[d]).y, getFirst(player).x, getFirst(player).y))
      getFirst(door[d]).type = doorOpen;
  })
}

// Update
afterInput(() => {
  drawUi();
  levelCode();
})

// Keybinds
onInput("w", () => move(0))
onInput("a", () => move(1))
onInput("s", () => move(2))
onInput("d", () => move(3))
onInput("j", () => { // Interact
  if (health == 0) return;
  keyCheck();
  doorCheck();
  
  if (getFirst(exit) && detectAround(getFirst(exit).x, getFirst(exit).y, getFirst(player).x, getFirst(player).y)) {
    nextLevel();
  }
})
onInput("k", () => {
  if (health == 0) {
    if (navIndex == 0) level = 1;
    else if (navIndex == 1) level = 0;
    health = 3;
    keys.y = false;
    navIndex = 0;
    setMap(levels[level]);
  }
})
onInput("l", () => {
  health = oldHealth;
  keys.y = false;
  navIndex = 0;
  setMap(levels[level]);
})

// Setup
setBackground(bg);
setSolids([player, spirit, exit, wall, wallVine, wallCracked, door.y, door.r, door.g, door.b])
setMap(levels[level]);
drawUi();
levelCode()
