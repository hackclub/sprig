
/* 
@title: StickRunner
@description: StickRunner is a game where players control a stick figure attempting to jump over obstacles to achieve the highest score possible. The objective is to time jumps correctly to avoid colliding with trees.
@author: Shahzeb Wali
@tags: ['puzzle']
@addedOn: 2023-12-10
*/

    const player = "p";
const treeShort = "s";
const treeTall1 = "t";
const treeTall2 = "u";
const treeTall3 = "z";
const ground1 = "g";
const ground2 = "h";
const dead = "d";
const melody = tune`
500,
500: A5~500 + G5-500,
500: G5~500 + F5-500,
500,
500: G5~500 + F5-500,
500: G5~500 + F5-500,
500: A5~500 + G5-500,
500: G5~500 + F5-500,
500: G5-500,
500: A5~500 + G5-500,
500: A5~500 + G5-500,
500: G5~500 + F5-500,
500: F5~500 + E5-500,
500: G5~500 + F5-500,
500,
500: A5~500 + G5~500 + F5-500,
500: F5~500 + E5-500,
500: G5~500 + F5-500,
500: G5~500 + F5-500,
500: A5~500 + G5-500,
500: G5~500 + F5-500,
500: F5~500 + E5-500,
500: F5~500 + E5-500,
500: G5~500 + A5~500 + F5-500,
500: A5~500 + G5-500,
500: A5~500 + G5~500 + F5-500,
500: F5~500 + E5-500,
500: F5~500 + E5-500,
500: G5^500,
500,
500: F5^500 + D5^500 + G4^500,
500: G4^500`

setLegend(
  [player, bitmap`
....000000000...
...0.........0..
...0.000..0000..
...0.........0..
...0..0...0..0..
...0........00..
...0...000.00...
....00000000....
...0....0.......
....00..0.000...
......0.00......
.......00.......
........0.......
.......0.0......
......0...0.....
.....0.....0....`],
  [dead, bitmap`
................
................
................
................
................
................
................
................
................
.....0......000.
00....00...0...0
..00....0..0.0.0
....00000000...0
...00...00.0.0.0
..0...000..0000.
00..............`],
  [treeShort, bitmap`
................
........333.....
......3333......
....33311333....
....311L1133....
....31000133....
...3310L0133....
...3310L0133....
...3310L013.....
...3100L01133...
..3111LL0113....
..3110LL00133...
..311LLLL011.3..
..310LLLL0013...
..310LLLLL113...
...10LLLLL113...`],
  [treeTall1, bitmap`
0000000000000000
000LLLLLLLLLLL00
0011111111111110
3011111111101110
3001111111111110
3330000111111110
..33300111111100
.3...L0111100003
.....L011110333.
.....L011110L..3
3....L011110L...
....LL011110L...
.....3011110L.3.
.....L111110L...
.....3111110..3.
.3...30111103...`],
  [treeTall2, bitmap`
...993LLLLLLL39.
...933L0111LL99.
....3L00111LL9..
...99L011110L9..
..999L011111L999
..9933L11110L399
.99933L11110LL9.
999333L11110LL9.
333333L11110L39.
LLL333011110L399
L0033L01111033.9
011LLL0111103399
01110L011110339.
01110L0111103399
01110L01111033.9
01110L011110L339`],
  [treeTall3, bitmap`
....99...999.999
....999999.999.3
...333LL33333333
.993LLLLLL33333L
.93L000000000000
.3.0011111111111
.300111111111111
93L0111111111111
99.0011111111111
.93L0LLLL0000000
..93L333393.9.3.
..993399393L39..
.....9933933.3.3
.......9.9......
................
................`],
  [ground1, bitmap`
0000000000000000
.D.D...D....D...
.000.D...L00..L.
L..L..0...DL.D..
..00...D........
D.........D.0..L
..L..L...L......
.......D......L.
..D.............
................
................
................
................
................
................
................`],
  [ground2, bitmap`
0000000000000000
..4...D.0...D...
0.L1..D.L.L.D.0.
...00.C...00....
.4.....DD....D.1
.....1....1.....
.1...1......0.1.
................
................
................
................
................
................
................
................
................`]
)

const levels = [
  map`
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
...p..........................
hghghghghghghghghghghghghghghg`,
];

setMap(levels[0]);
addText("Press W to start", { 
  x: 1,
  y: 5,
})

let started = 0;
onInput("w", () => {
  if (started == 0) {
    started = 1;
    start();
    clearText();
  
    const playback = playTune(melody)
  } else if (started == -1) {
    clearText();
    started = 0;
    setMap(levels[0]);
    addText("Press W to start", { 
      x: 2,
      y: 6,
    })
  }
  jump();
});

function start() {
  let moveTree, addTree;
  let score = 0;
  moveTree = setInterval(function() {
    clearText();
    score += 1;
    getAll(treeShort).forEach(function(e) {
      e.x -= 1;
      clearTile(0, 8);
    })
    getAll(treeTall1).forEach(function(e) {
      e.x -= 1;
      clearTile(0, 8);
    })
    getAll(treeTall2).forEach(function(e) {
      e.x -= 1;
      clearTile(0, 7);
    })
    getAll(treeTall3).forEach(function(e) {
      e.x -= 2;
      clearTile(0, 7);
    })
    if (getTile(3, 8).length > 1 || getTile(3, 7).length > 1) {
      started = -1;
      clearInterval(moveTree);
      clearInterval(addTree);
      clearTile(4, 8);
      clearTile(4, 7);
      addSprite(3, 8, dead);
      addText("You Died", { 
        x: 6,
        y: 6,
      });
		 const levels = [
  map`
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
...p..........................
hghghghghghghghghghghghghghghg`,
];

    setMap(levels[0]);
    addText("Press W to restart", { x: 2, y: 7, 
      });
    }
    addText("" + score, { 
      x: 1,
      y: 5,
    })
    addText("" + score, { 
      x: 1,
      y: 5,
    })
  }, 100);
  addTree = setInterval(function() {
    setTimeout(function() {
      let tree = Math.floor(Math.random() * (4 - 1) + 1);
      if (tree == 1 || tree == 2) {
        addSprite(29, 8, treeShort);
      } else {
        addSprite(29, 8, treeTall1);
        addSprite(29, 7, treeTall2);
        addSprite(29, 7, treeTall3);
      }
    }, Math.floor(Math.random() * (700 - 1) + 1))
  }, 1200)
}
function jump() {
  getFirst(player).y = 7;
  setTimeout(function() {
    getFirst(player).y = 6;
  }, 100);
  setTimeout(function() {
    getFirst(player).y = 7;
  }, 300);
  setTimeout(function() {
    getFirst(player).y = 8;
  }, 400);
}
