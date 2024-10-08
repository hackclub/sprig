/*
@title: Hangman Explode
@author: Frank Z
@tags: ['retro', 'puzzle', 'endless']
@addedOn: 2024-10-08
*/

/*
CONTROLS:
W and S to move to difficulty on the menu, WASD to move cursor to letters in the game
J to select, in menu and in game
L, a shortcut to go to the next word, you may also move the cursor and select the NEXT button

EASY has 7 fuses, meaning you will explode after 7 wrong letters
MEDIUM has 6
HARD has 5

You get points based on how many fuses you have left, 1 for each

The word list is at the bottom, it has 1891 words, I took the list from the Hangman on
Coolmathgames and cut out ones that were too long or had invalid characters, then I
cut it down more so it would actually work on the sprig (I think there's a list limit)
*/

const Cursor = "c";
const BGnormal = "b";
const BGgapMiddle = "m";
const BGgapLeft = "l";
const BGgapRight = "r";
const LetterEmpty = "-";
const NEXT1 = "q";
const NEXT2 = "w";
const CheckMark = "v";
const XMark = "x";
const Bomb = "t";
const ExplodeFrame1 = "!";
const ExplodeFrame2 = "@";
const ExplodeFrame3 = "#";
const Fuse = "f";
const FuseEnd = "e";

setLegend(
  [Cursor, bitmap`
..6.66.66.66.6..
.6.6..6..6..6.6.
6..............6
.6............6.
6..............6
6..............6
.6............6.
6..............6
6..............6
.6............6.
6..............6
6..............6
.6............6.
6..............6
.6.6..6..6..6.6.
..6.66.66.66.6..`],
  [BGnormal, bitmap`
LLLLLL11L111111L
LLLLL1LL11111111
1L1L111111111111
LLLLL11111111111
L1L1111111111111
1111111111111111
L111111111111111
1L1111111111111L
L1111111111111L1
11111111111111LL
111111111111111L
11111111111111L1
111111111111LLLL
11111111111L11LL
11111111L1LLLLLL
L11111LL11LL1LLL`],
  [BGgapMiddle, bitmap`
LLLLLL11L111111L
LL0..........011
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
110..........0LL
L11111LL11LL1LLL`],
  [BGgapLeft, bitmap`
LLLLLL11L111111L
LL0..........011
10..............
L...............
L...............
1...............
1...............
1...............
1...............
1...............
1...............
1...............
1...............
10..............
110..........0LL
L11111LL11LL1LLL`],
  [BGgapRight, bitmap`
LLLLLL11L111111L
LL0..........011
..............01
...............1
...............1
...............1
...............1
...............1
...............1
...............1
...............L
...............L
...............1
..............0L
110..........0LL
L11111LL11LL1LLL`],
  [LetterEmpty, bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L..............1
L..............1
1..............1
L..............1
1..............L
1..............1
1..............L
1..............L
1..............1
1..............L
10..00000000..0L
110..........0LL
L111111L11LLLLLL`],
  [NEXT1, bitmap`
LLLLLL11L111111L
LL0..........011
10..............
L...............
L...............
1..44..44.44444.
1..444.44.44....
1..444444.44....
1..444444.4444..
1..44.444.44....
1..44..44.44....
1..44..44.44444.
1...............
10..............
110..........0LL
L11111LL11LL1LLL`],
  [NEXT2, bitmap`
LLLLLL11L111111L
LL0..........011
..............01
...............1
...............1
44..44.444444..1
44..44.444444..1
.4444....44....1
..44.....44....1
.4444....44....1
44..44...44....L
44..44...44....L
...............1
..............0L
110..........0LL
L11111LL11LL1LLL`],
  [CheckMark, bitmap`
LL11444444441111
L144........4411
14..........D.41
14.........D4D41
4.........D444D4
4........D444D.4
4.......D444D..4
4..D...D444D...4
4.D4D.D444D....4
4D444D444D.....4
4.D44444D......4
4..D444D.......4
14..D4D.......41
14...D........41
1144........441L
11114444444411LL`],
  [XMark, bitmap`
LL11333333331111
L133........3311
13............31
13..3......3..31
3..333....333..3
3...333..333...3
3....333333....3
3.....3333.....3
3.....3333.....3
3....333333....3
3...333..333...3
3..333....333..3
13..3......3..31
13............31
1133........331L
11113333333311LL`],
  [Bomb, bitmap`
LLLLLL11L111111L
LLLLL11000001111
1L1L100000000011
LLL100000LL00011
L1L0000000LLL001
110000000000L001
L10000000000LL00
CC00000000000L00
CC00000000000000
1100000000000000
1100000000000000
11000L0000000000
11100LL00000000L
111100LLLL00000L
11111000000000LL
L11111L000001LLL`],
  [ExplodeFrame1, bitmap`
LLLLLL11L111311L
LLLLL11000033111
1L1L103000030011
LLL300030L300011
L1L03303003LL003
110003009090L333
L100009999993L00
CC00000966000L00
CC33000066900000
1103339966993300
1100009990090330
11000L9090090033
111033L090030003
113300LL3L03000L
11311000303300LL
L11111L300301LLL`],
  [ExplodeFrame2, bitmap`
LLLLLL11L311313L
LLLLL31003033331
1L1L133003030311
LLL3099999303311
33L03393363L3003
1330039060639933
L103309699693990
CC00936966600L00
CC33990666669933
1103396666963990
1103339660960330
33300L9366663033
1110333990093303
113303L93L09033L
113113099033003L
L11133L390301L3L`],
  [ExplodeFrame3, bitmap`
L33LLL13L313313L
LL33L31303333331
131L333039339333
L333999999393331
33399366969L9003
1339669969636933
L109669699666990
3339966666603330
3C33996666669933
1103396666699990
1133339966999330
33303L9966999033
3113333999939903
113303L93L09393L
113113033033333L
L11133L39030133L`],
  [Fuse, bitmap`
LLLLLL11L111111L
LL0..........011
................
................
................
................
.CC.........CCC.
CCCCC....CCCCCCC
C..CCCCCCCCC...C
.....CCCC.......
................
................
................
................
110..........0LL
L11111LL11LL1LLL`],
  [FuseEnd, bitmap`
LLLLLL11L111111L
LL0..........011
................
................
................
................
...33.......CCC.
..3993...CCCCCCC
..3966CCCCCC...C
..3996CCC.......
...393..........
....3...........
................
................
110..........0LL
L11111LL11LL1LLL`],
  ["A", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L.....0000.....1
L....000000....1
1...000..000...1
L...00....00...1
1...00....00...L
1...00000000...1
1...00000000...L
1...00....00...L
1...00....00...1
1...00....00...L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["B", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L..00000000....1
L..000000000...1
1..00.....000..1
L..00.....000..1
1..000000000...L
1..000000000...1
1..00.....000..L
1..00.....000..L
1..000000000...1
1..00000000....L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["C", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L....0000000...1
L...000000000..1
1..000.....00..1
L..00..........1
1..00..........L
1..00..........1
1..00..........L
1..000.....00..L
1...000000000..1
1....0000000...L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["D", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L..0000000.....1
L..000000000...1
1..00....000...1
L..00.....000..1
1..00......00..L
1..00......00..1
1..00.....000..L
1..00....000...L
1..000000000...1
1..0000000.....L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["E", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L..0000000000..1
L..0000000000..1
1..00..........1
L..00..........1
1..000000......L
1..000000......1
1..00..........L
1..00..........L
1..0000000000..1
1..0000000000..L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["F", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L...000000000..1
L...000000000..1
1...00.........1
L...00.........1
1...00000......L
1...00000......1
1...00.........L
1...00.........L
1...00.........1
1...00.........L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["G", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L....0000000...1
L...000000000..1
1..000.....00..1
L..00..........1
1..00...0000...L
1..00...00000..1
1..00......00..L
1..000....000..L
1...000000000..1
1....0000000...L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["H", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L..00......00..1
L..00......00..1
1..00......00..1
L..00......00..1
1..0000000000..L
1..0000000000..1
1..00......00..L
1..00......00..L
1..00......00..1
1..00......00..L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["I", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L...00000000...1
L...00000000...1
1......00......1
L......00......1
1......00......L
1......00......1
1......00......L
1......00......L
1...00000000...1
1...00000000...L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["J", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L....00000000..1
L....00000000..1
1.......00.....1
L.......00.....1
1.......00.....L
1.......00.....1
1...00..00.....L
1...00..00.....L
1...000000.....1
1....0000......L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["K", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L...00....00...1
L...00...000...1
1...00..000....1
L...00.000.....1
1...00000......L
1...00000......1
1...00.000.....L
1...00..000....L
1...00...000...1
1...00....00...L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["L", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L...00.........1
L...00.........1
1...00.........1
L...00.........1
1...00.........L
1...00.........1
1...00.........L
1...00.........L
1...00000000...1
1...00000000...L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["M", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L..00......00..1
L..000....000..1
1..0000..0000..1
L..0000000000..1
1..00.0000.00..L
1..00..00..00..1
1..00......00..L
1..00......00..L
1..00......00..1
1..00......00..L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["N", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L..00......00..1
L..000.....00..1
1..0000....00..1
L..00000...00..1
1..00.000..00..L
1..00..000.00..1
1..00...00000..L
1..00....0000..L
1..00.....000..1
1..00......00..L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["O", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L....000000....1
L...00000000...1
1..000....000..1
L..00......00..1
1..00......00..L
1..00......00..1
1..00......00..L
1..000....000..L
1...00000000...1
1....000000....L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["P", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L...0000000....1
L...00000000...1
1...00....000..1
L...00....000..1
1...00000000...L
1...0000000....1
1...00.........L
1...00.........L
1...00.........1
1...00.........L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["Q", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L....000000....1
L...00000000...1
1..000....000..1
L..00......00..1
1..00..00..00..L
1..00..000.00..1
1..00...00000..L
1..000...000...L
1...000000000..1
1....00000.00..L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["R", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L...0000000....1
L...00000000...1
1...00....000..1
L...00....000..1
1...00000000...L
1...0000000....1
1...00..000....L
1...00...000...L
1...00....000..1
1...00.....00..L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["S", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L....00000000..1
L...000000000..1
1..000.........1
L..000.........1
1...0000000....L
1....0000000...1
1.........000..L
1.........000..L
1..000000000...1
1..00000000....L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["T", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L..0000000000..1
L..0000000000..1
1......00......1
L......00......1
1......00......L
1......00......1
1......00......L
1......00......L
1......00......1
1......00......L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["U", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L..00......00..1
L..00......00..1
1..00......00..1
L..00......00..1
1..00......00..L
1..00......00..1
1..00......00..L
1..000....000..L
1...00000000...1
1....000000....L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["V", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L..00......00..1
L..00......00..1
1..000....000..1
L...00....00...1
1...000..000...L
1....00..00....1
1....000000....L
1.....0000.....L
1.....0000.....1
1......00......L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["W", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L..00......00..1
L..00......00..1
1..00......00..1
L..00......00..1
1..00..00..00..L
1..00.0000.00..1
1..0000000000..L
1..0000..0000..L
1..000....000..1
1..00......00..L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["X", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L..00......00..1
L..000....000..1
1...000..000...1
L....000000....1
1.....0000.....L
1.....0000.....1
1....000000....L
1...000..000...L
1..000....000..1
1..00......00..L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["Y", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L..00......00..1
L..000....000..1
1...000..000...1
L....000000....1
1.....0000.....L
1......00......1
1......00......L
1......00......L
1......00......1
1......00......L
10............0L
110..........0LL
L111111L11LLLLLL`],
  ["Z", bitmap`
LLLLLL11L111111L
LL0..........011
10............01
L..0000000000..1
L..0000000000..1
1........000...1
L.......000....1
1......000.....L
1.....000......1
1....000.......L
1...000........L
1..0000000000..1
1..0000000000..L
10............0L
110..........0LL
L111111L11LLLLLL`]
);

let wrongletters = 0;
let animationInterval;
let word = "";
let hint = "";
let correctletters = 0;
let wordfinished = false;
let secondwordlength = 0;
let points = 0;
let difficulty = "";

let level = 0;
const levels = [
  map`
bbbbbbbbbb
#HANGMAN##
##EXPLODE#
bbbbbbbbbb
b-J-bEASYb
bSELbMEDbb
bECTbHARDb
bbbbbbbbbb`,
  map`
bl.......b
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
ABCDEFGHIJ
KLMNOPQRbb
STUVWXYZqw`
];
setMap(levels[level]);
addSprite(5, 4, Cursor);

//Set controls and limits movement for the cursor on the menu and in game
onInput("w", () => {
  if (level === 0) {
    if(getFirst(Cursor).y > 4) getFirst(Cursor).y -= 1;
  };
  if (level === 1) {
    if(getFirst(Cursor).y > 5) getFirst(Cursor).y -= 1;
  };
});
onInput("a", () => {
  if (level === 1) {
    if(getFirst(Cursor).x > 0) getFirst(Cursor).x -= 1;
  };
});
onInput("s", () => {
  if (level === 0) {
    if(getFirst(Cursor).y < 6) getFirst(Cursor).y += 1;
  };
  if (level === 1) {
    if(getFirst(Cursor).y < 7) getFirst(Cursor).y += 1;
  };
});
onInput("d", () => {
  if (level === 1) {
    if(getFirst(Cursor).x < 9) getFirst(Cursor).x += 1;
  };
});
onInput("j", () => {
  if (level === 0) {
    pickdifficulty();
    startgame();
  }
  else if (level === 1) {
    submitletter();
  };
});
onInput("l", () => {
  if (level === 1) {
    nextbutton();
  };
});

//set the difficulty
function pickdifficulty() {
  difficulty = 11 - getFirst(Cursor).y;
};

//spawn all items and text
function startgame() {
  level += 1;
  setMap(levels[level]);
  spawnfuse();
  addSprite(0, 5, Cursor);
  setword();
  updatetext();
};

//spawn fuses based on difficulty selected
function spawnfuse() {
  for (let tile = 1; tile < 8 ; tile++) {
    clearTile(tile, 0);
  };
  addSprite(1, 0, BGgapLeft);
  addSprite(2, 0, BGgapMiddle);
  addSprite(8 - difficulty, 0, FuseEnd);
  for (let fuseX = 9 - difficulty; fuseX < 8 ; fuseX++) {
    addSprite(fuseX, 0, Fuse);
  };
  addSprite(8, 0, Bomb);
};

//shorten the fuse, if it goes all thr way down, explode the bomb
function burnfuse() {
  wrongletters += 1;
  if (wrongletters < difficulty) {
    let FuseEndX = getFirst(FuseEnd).x;
    clearTile(FuseEndX, 0);
    if (difficulty === 7 && wrongletters === 1) {
      addSprite(FuseEndX, 0, BGgapLeft);
    } else {
      addSprite(FuseEndX, 0, BGgapMiddle);
    };
    clearTile(FuseEndX + 1, 0);
    addSprite(FuseEndX + 1, 0, BGgapMiddle);
    addSprite(FuseEndX + 1, 0, FuseEnd);
  } else {
    clearTile(7, 0);
    addSprite(7, 0, BGgapMiddle);
    explode(ExplodeFrames);
    wordfinished = true;
  };
};

//animation for the bomb exploding
let ExplodeFrames = [ExplodeFrame1, ExplodeFrame2, ExplodeFrame3];
function explode(animationlist) {
  let frame = 0;
  animationInterval = setInterval(function(){
    clearTile(8, 0);
    addSprite(8, 0, animationlist[frame]);
    if (frame < animationlist.length - 1) {
      frame += 1;
    } else {
      clearInterval(animationInterval);
      points = 0;
      addText("You Exploded", {x: 2, y: 9, color: color`3`});
      revealletters();
    };
  }, 100);
};

//add sprites in letter positions to reveal the word
function revealletters() {
  for (let letter = 0; letter < word.split(" ")[0].length; letter++) {
    let selectedsprite = word.split(" ")[0][letter].toUpperCase();
    clearTile(letter + 1, 2);
    addSprite(letter + 1, 2, selectedsprite);
  };
  if (word.split(" ")[1]) {
    for (let letter = 0; letter < word.split(" ")[1].length; letter++) {
      let selectedsprite = word.split(" ")[1][letter].toUpperCase();
      clearTile(letter + 1, 3);
      addSprite(letter + 1, 3, selectedsprite);
    };
  };
};

//set the word to a random item in the list and place the blank sprites on the needed tiles
function setword() {
  let randomitemindex = Math.floor(Math.random() * WordList.length);
  word = WordList[randomitemindex]["word"];
  hint = WordList[randomitemindex]["hint"];
  console.log(word);
  let wordlength1 = word.split(" ")[0].length;
  for (let tileX = 1; tileX <= wordlength1; tileX++) {
    clearTile(tileX, 2);
    addSprite(tileX, 2, LetterEmpty);
  };
  if (word.split(" ")[1]) {
    let wordlength2 = word.split(" ")[1].length;
    for (let tileX = 1; tileX <= wordlength2; tileX++) {
      clearTile(tileX, 3);
      addSprite(tileX, 3, LetterEmpty);
    };
  };
};

//print the hint above the empty tiles, 
//but some are too long so I had manually make them each go on two lines
function printhint() {
  if (hint === "No Repeating Letters") {
    addText(hint.slice(0, 13), {x: 2, y: 2, color: color`6`});
    addText(hint.slice(13), {x: 2, y: 3, color: color`6`});
  } else if (hint === "Official Crayon Colors") {
    addText(hint.slice(0, 16), {x: 2, y: 2, color: color`6`});
    addText(hint.slice(16), {x: 2, y: 3, color: color`6`});
  } else if (hint === "Great Vocab Words") {
    addText(hint.slice(0, 12), {x: 2, y: 2, color: color`6`});
    addText(hint.slice(12), {x: 2, y: 3, color: color`6`});
  } else if (hint === "Stars of Stage & Screen") {
    addText(hint.slice(0, 15), {x: 2, y: 2, color: color`6`});
    addText(hint.slice(15), {x: 2, y: 3, color: color`6`});
  } else if (hint === "Fictional Characters") {
    addText(hint.slice(0, 10), {x: 2, y: 2, color: color`6`});
    addText(hint.slice(10), {x: 2, y: 3, color: color`6`});
  } else if (hint === "Desserts & Sweets") {
    addText(hint.slice(0, 9), {x: 2, y: 2, color: color`6`});
    addText(hint.slice(9), {x: 2, y: 3, color: color`6`});
  } else if (hint === "Gems, Rocks & Crystals") {
    addText(hint.slice(0, 12), {x: 2, y: 2, color: color`6`});
    addText(hint.slice(12), {x: 2, y: 3, color: color`6`});
  } else if (hint === "Old-Fashioned Things") {
    addText(hint.slice(0, 14), {x: 2, y: 2, color: color`6`});
    addText(hint.slice(14), {x: 2, y: 3, color: color`6`});
  } else if (hint === "Figures of Speech") {
    addText(hint.slice(0, 11), {x: 2, y: 2, color: color`6`});
    addText(hint.slice(11), {x: 2, y: 3, color: color`6`});
  } else {
    addText(hint, {x: 2, y: 3, color: color`6`});
  };
};


//submit the letter selected or go to next word if conditions fit
function submitletter() {
  //check if cursor is on NEXT button to go to next word
  if (getFirst(Cursor).y === 7 && (getFirst(Cursor).x === 8 || getFirst(Cursor).x === 9)) {
    nextbutton();
    //check if cursor is on the empty tiles in the possible area the cursor can go
  } else if (getFirst(Cursor).y === 6 && (getFirst(Cursor).x === 8 || getFirst(Cursor).x === 9)) {
    //nothing, empty tiles
  } else {
    //check if the letter the cursor is on has a check or X already or if the word is already finished
    if (getTile(getFirst(Cursor).x, getFirst(Cursor).y)[1].type !== "x" && getTile(getFirst(Cursor).x, getFirst(Cursor).y)[1].type !== "v" && wordfinished === false) {
      let selectedsprite = getTile(getFirst(Cursor).x, getFirst(Cursor).y)[1].type;
      let selectedletter = selectedsprite.toLowerCase();
      if (word.includes(selectedletter)) {
        //check for the letter is the first word of the word and show the sprites if letter is correct
        for (let letter = 0; letter < word.split(" ")[0].length; letter++) {
          if (word.split(" ")[0][letter] === selectedletter) {
            clearTile(letter + 1, 2);
            addSprite(letter + 1, 2, selectedsprite);
            correctletters += 1;
          };
        };
        //check if there is a second word then do the same as the first word
        if (word.split(" ")[1]) {
          for (let letter = 0; letter < word.split(" ")[1].length; letter++) {
            if (word.split(" ")[1][letter] === selectedletter) {
              clearTile(letter + 1, 3);
              addSprite(letter + 1, 3, selectedsprite);
              correctletters += 1;
            };
          };
        };
        addSprite(getFirst(Cursor).x, getFirst(Cursor).y, CheckMark);
        checkforcompletion();
      } else {
        addSprite(getFirst(Cursor).x, getFirst(Cursor).y, XMark);
        burnfuse();
      };
    };
  };
};

//check if amount of letters is equal to the qord and add necessary text
function checkforcompletion() {
  if (word.split(" ").length === 1) { 
    secondwordlength = 0;
  } else {
    secondwordlength = word.split(" ")[1].length;
  };
  if (correctletters >= word.split(" ")[0].length + secondwordlength) {
    wordfinished = true;
    points += difficulty - wrongletters;
    updatetext();
    addText("Bomb Defused, +" + (difficulty - wrongletters) + "pt", {x: 1, y: 9, color: color`4`});
    let FuseEndX = getFirst(FuseEnd).x;
    clearTile(FuseEndX, 0);
    if (difficulty === 7 && wrongletters === 0) {
      addSprite(FuseEndX, 0 , BGgapLeft);
    } else {
      addSprite(FuseEndX, 0 , BGgapMiddle);
    };
    addSprite(FuseEndX, 0, Fuse);
  };
};

function nextbutton() {
  if (wordfinished) {
    nextword();
  };
};

//reset everything for the next word
function nextword() {
  resetscreen();
  wrongletters = 0;
  correctletters = 0;
  wordfinished = false;
  setword();
  updatetext();
};

//clear all checks, Xs, letter sprites, and respawn the fuse
function resetscreen() {
  while (getFirst(CheckMark)) {
    getFirst(CheckMark).remove();
  };
  while (getFirst(XMark)) {
    getFirst(XMark).remove();
  };
  for (let x = 1; x < 9; x++) {
    clearTile(x, 2);
    addSprite(x, 2, BGnormal);
  };
  for (let x = 1; x < 9; x++) {
    clearTile(x, 3);
    addSprite(x, 3, BGnormal);
  };
  clearText();
  for (let x = 2; x < 9; x++) {
    clearTile(x, 0);
  };
  spawnfuse();
};

//clear and rewrite all text when changes are made
function updatetext() {
  clearText();
  addText("Pts: ", {x: 16, y: 12, color: color`4`});
  addText("" + points, {x: 16, y: 13, color: color`4`});
  printhint();
};

//the incredible word list "borrowed" from coolmathgames
const WordList = [
  {
    "word": "above board",
    "hint": "Phrases"
  },
  {
    "word": "absolute",
    "hint": "No Repeating Letters"
  },
  {
    "word": "absolute zero",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "accolade",
    "hint": "Great Vocab Words"
  },
  {
    "word": "accurate estimate",
    "hint": "Oxymorons"
  },
  {
    "word": "acoustic guitar",
    "hint": "Music & Song"
  },
  {
    "word": "acrobat",
    "hint": "Occupations"
  },
  {
    "word": "action figures",
    "hint": "Toys & Games"
  },
  {
    "word": "admonish",
    "hint": "Great Vocab Words"
  },
  {
    "word": "adult children",
    "hint": "Oxymorons"
  },
  {
    "word": "advocate",
    "hint": "Great Vocab Words"
  },
  {
    "word": "aerial skiing",
    "hint": "All About Sports"
  },
  {
    "word": "aerobics",
    "hint": "All About Sports"
  },
  {
    "word": "african elephant",
    "hint": "Animals"
  },
  {
    "word": "air bags",
    "hint": "Cars"
  },
  {
    "word": "air filter",
    "hint": "Cars"
  },
  {
    "word": "air quotes",
    "hint": "Phrases"
  },
  {
    "word": "aircraft",
    "hint": "Transportation"
  },
  {
    "word": "aircraft carrier",
    "hint": "Transportation"
  },
  {
    "word": "airplane",
    "hint": "Transportation"
  },
  {
    "word": "airport hangar",
    "hint": "Places"
  },
  {
    "word": "alabama",
    "hint": "Places"
  },
  {
    "word": "aladdin",
    "hint": "Fictional Characters"
  },
  {
    "word": "alaskan malamute",
    "hint": "Animals"
  },
  {
    "word": "alec baldwin",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "alex morgan",
    "hint": "Famous Athletes"
  },
  {
    "word": "alfalfa sprouts",
    "hint": "Eat & Drink"
  },
  {
    "word": "algebra",
    "hint": "At School"
  },
  {
    "word": "alicanto",
    "hint": "Myths & Legends"
  },
  {
    "word": "alloy orange",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "alma mater",
    "hint": "At School"
  },
  {
    "word": "almond cookie",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "almond milk",
    "hint": "Eat & Drink"
  },
  {
    "word": "alone together",
    "hint": "Oxymorons"
  },
  {
    "word": "alpaca",
    "hint": "Animals"
  },
  {
    "word": "alphabet game",
    "hint": "Toys & Games"
  },
  {
    "word": "alpine skiing",
    "hint": "All About Sports"
  },
  {
    "word": "aluminum foil",
    "hint": "In The Kitchen"
  },
  {
    "word": "amazon",
    "hint": "Famous Brands"
  },
  {
    "word": "ambrosia",
    "hint": "Myths & Legends"
  },
  {
    "word": "american bison",
    "hint": "Animals"
  },
  {
    "word": "american bulldog",
    "hint": "Animals"
  },
  {
    "word": "american eagle",
    "hint": "Famous Brands"
  },
  {
    "word": "american express",
    "hint": "Famous Brands"
  },
  {
    "word": "american foxhound",
    "hint": "Animals"
  },
  {
    "word": "american idol",
    "hint": "TV Shows"
  },
  {
    "word": "amethyst",
    "hint": "Gems, Rocks & Crystals"
  },
  {
    "word": "amicable",
    "hint": "Great Vocab Words"
  },
  {
    "word": "ancient aztecs",
    "hint": "History"
  },
  {
    "word": "ancient greece",
    "hint": "History"
  },
  {
    "word": "ancient incas",
    "hint": "History"
  },
  {
    "word": "ancient rome",
    "hint": "History"
  },
  {
    "word": "ancient ruins",
    "hint": "History"
  },
  {
    "word": "andrew carnegie",
    "hint": "History"
  },
  {
    "word": "andrew jackson",
    "hint": "History"
  },
  {
    "word": "andy serkis",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "angelina jolie",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "angler fish",
    "hint": "Animals"
  },
  {
    "word": "animal crossing",
    "hint": "Video Games"
  },
  {
    "word": "animal hospital",
    "hint": "Places"
  },
  {
    "word": "animal planet",
    "hint": "Famous Brands"
  },
  {
    "word": "animal shelter",
    "hint": "Places"
  },
  {
    "word": "anne frank",
    "hint": "Famous People"
  },
  {
    "word": "anne hathaway",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "anthony hopkins",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "anthony mackie",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "antique brass",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "antique mall",
    "hint": "Places"
  },
  {
    "word": "antique shop",
    "hint": "Places"
  },
  {
    "word": "apollo missions",
    "hint": "Outer Space"
  },
  {
    "word": "apollo thirteen",
    "hint": "Movies"
  },
  {
    "word": "apple cider",
    "hint": "Eat & Drink"
  },
  {
    "word": "apple dumpling",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "apple juice",
    "hint": "Eat & Drink"
  },
  {
    "word": "apple pie",
    "hint": "Eat & Drink"
  },
  {
    "word": "apple strudel",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "apple tree",
    "hint": "Nature"
  },
  {
    "word": "apricot",
    "hint": "Eat & Drink"
  },
  {
    "word": "aquatic",
    "hint": "Nature"
  },
  {
    "word": "arabian desert",
    "hint": "Places"
  },
  {
    "word": "arcade cabinet",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "arctic circle",
    "hint": "Places"
  },
  {
    "word": "arctic dogs",
    "hint": "Movies"
  },
  {
    "word": "arctic ocean",
    "hint": "Places"
  },
  {
    "word": "arctic wolf",
    "hint": "Animals"
  },
  {
    "word": "ariana grande",
    "hint": "Famous People"
  },
  {
    "word": "arizona",
    "hint": "Places"
  },
  {
    "word": "arm rest",
    "hint": "Cars"
  },
  {
    "word": "army men",
    "hint": "Toys & Games"
  },
  {
    "word": "art gallery",
    "hint": "Places"
  },
  {
    "word": "art supplies",
    "hint": "At School"
  },
  {
    "word": "artemis",
    "hint": "Myths & Legends"
  },
  {
    "word": "arteries",
    "hint": "Anatomy"
  },
  {
    "word": "artifact",
    "hint": "Great Vocab Words"
  },
  {
    "word": "aspen tree",
    "hint": "Nature"
  },
  {
    "word": "asteroid",
    "hint": "Outer Space"
  },
  {
    "word": "atacama desert",
    "hint": "Places"
  },
  {
    "word": "athletic wear",
    "hint": "Fashion"
  },
  {
    "word": "atlanta dream",
    "hint": "All About Sports"
  },
  {
    "word": "atlanta hawks",
    "hint": "All About Sports"
  },
  {
    "word": "atlantic cod",
    "hint": "Animals"
  },
  {
    "word": "atlantic ocean",
    "hint": "Places"
  },
  {
    "word": "atlantic salmon",
    "hint": "Animals"
  },
  {
    "word": "atomic age",
    "hint": "History"
  },
  {
    "word": "auction house",
    "hint": "Places"
  },
  {
    "word": "audrey hepburn",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "austin powers",
    "hint": "Movies"
  },
  {
    "word": "author",
    "hint": "Occupations"
  },
  {
    "word": "autozone",
    "hint": "Famous Brands"
  },
  {
    "word": "autumnal equinox",
    "hint": "Special Days"
  },
  {
    "word": "aviation mechanic",
    "hint": "Occupations"
  },
  {
    "word": "aviator",
    "hint": "Occupations"
  },
  {
    "word": "aztec gold",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "baby blues",
    "hint": "Phrases"
  },
  {
    "word": "baby boomer",
    "hint": "Phrases"
  },
  {
    "word": "baby carriage",
    "hint": "Transportation"
  },
  {
    "word": "baby doll",
    "hint": "Toys & Games"
  },
  {
    "word": "baby ruth",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "baby steps",
    "hint": "Phrases"
  },
  {
    "word": "backup camera",
    "hint": "Cars"
  },
  {
    "word": "bad romance",
    "hint": "Music & Song"
  },
  {
    "word": "bahamas",
    "hint": "Places"
  },
  {
    "word": "baked apple",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "baking dish",
    "hint": "In The Kitchen"
  },
  {
    "word": "balance beam",
    "hint": "All About Sports"
  },
  {
    "word": "balanced diet",
    "hint": "Body & Health"
  },
  {
    "word": "ball python",
    "hint": "Animals"
  },
  {
    "word": "ballet dancer",
    "hint": "Occupations"
  },
  {
    "word": "ballpark figure",
    "hint": "Phrases"
  },
  {
    "word": "baltic sea",
    "hint": "Places"
  },
  {
    "word": "bamboo shoot",
    "hint": "Nature"
  },
  {
    "word": "banana mania",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "banana pudding",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "bank teller",
    "hint": "Occupations"
  },
  {
    "word": "banner saga",
    "hint": "Video Games"
  },
  {
    "word": "banshee",
    "hint": "Myths & Legends"
  },
  {
    "word": "barbecue chicken",
    "hint": "Eat & Drink"
  },
  {
    "word": "barbeque sauce",
    "hint": "Eat & Drink"
  },
  {
    "word": "barbie doll",
    "hint": "Toys & Games"
  },
  {
    "word": "barn owl",
    "hint": "Animals"
  },
  {
    "word": "baroque period",
    "hint": "History"
  },
  {
    "word": "bart simpson",
    "hint": "Fictional Characters"
  },
  {
    "word": "base runner",
    "hint": "All About Sports"
  },
  {
    "word": "baseball cap",
    "hint": "Fashion"
  },
  {
    "word": "baseball stadium",
    "hint": "Places"
  },
  {
    "word": "baskin robbins",
    "hint": "Famous Brands"
  },
  {
    "word": "bass drum",
    "hint": "Music & Song"
  },
  {
    "word": "bastille day",
    "hint": "Special Days"
  },
  {
    "word": "bat cave",
    "hint": "Nature"
  },
  {
    "word": "bath towel",
    "hint": "Everyday Objects"
  },
  {
    "word": "bathing suit",
    "hint": "At The Beach"
  },
  {
    "word": "bathroom scale",
    "hint": "Everyday Objects"
  },
  {
    "word": "baton rouge",
    "hint": "Places"
  },
  {
    "word": "baton throwing",
    "hint": "All About Sports"
  },
  {
    "word": "batting average",
    "hint": "All About Sports"
  },
  {
    "word": "batwoman",
    "hint": "Fictional Characters"
  },
  {
    "word": "beach bag",
    "hint": "At The Beach"
  },
  {
    "word": "beach ball",
    "hint": "At The Beach"
  },
  {
    "word": "beach umbrella",
    "hint": "At The Beach"
  },
  {
    "word": "bean burger",
    "hint": "Eat & Drink"
  },
  {
    "word": "bean sprouts",
    "hint": "Eat & Drink"
  },
  {
    "word": "bear claw",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "bearded dragon",
    "hint": "Animals"
  },
  {
    "word": "beauty parlor",
    "hint": "Places"
  },
  {
    "word": "bed frame",
    "hint": "Everyday Objects"
  },
  {
    "word": "beef stock",
    "hint": "Eat & Drink"
  },
  {
    "word": "behavior",
    "hint": "No Repeating Letters"
  },
  {
    "word": "bench press",
    "hint": "One Vowel"
  },
  {
    "word": "bengal tiger",
    "hint": "Animals"
  },
  {
    "word": "benjamin franklin",
    "hint": "History"
  },
  {
    "word": "berlin airlift",
    "hint": "History"
  },
  {
    "word": "berlin wall",
    "hint": "History"
  },
  {
    "word": "berry parfait",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "best buy",
    "hint": "Famous Brands"
  },
  {
    "word": "betty rubble",
    "hint": "Fictional Characters"
  },
  {
    "word": "beverly hills",
    "hint": "Places"
  },
  {
    "word": "bicycle",
    "hint": "Transportation"
  },
  {
    "word": "big dipper",
    "hint": "Outer Space"
  },
  {
    "word": "big wheels",
    "hint": "Transportation"
  },
  {
    "word": "bighorn sheep",
    "hint": "Animals"
  },
  {
    "word": "bilbo baggins",
    "hint": "Fictional Characters"
  },
  {
    "word": "bill gates",
    "hint": "Famous People"
  },
  {
    "word": "billie eilish",
    "hint": "Famous People"
  },
  {
    "word": "billy goat",
    "hint": "Animals"
  },
  {
    "word": "biomass energy",
    "hint": "Nature"
  },
  {
    "word": "biplane",
    "hint": "Transportation"
  },
  {
    "word": "birthday child",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "biscotti",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "bitter end",
    "hint": "Phrases"
  },
  {
    "word": "bitter melon",
    "hint": "Eat & Drink"
  },
  {
    "word": "bizarre",
    "hint": "Great Vocab Words"
  },
  {
    "word": "black beans",
    "hint": "Eat & Drink"
  },
  {
    "word": "black cat",
    "hint": "Halloween"
  },
  {
    "word": "black gold",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "black hole",
    "hint": "Outer Space"
  },
  {
    "word": "black panther",
    "hint": "Fictional Characters"
  },
  {
    "word": "black pearl",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "black sea",
    "hint": "Places"
  },
  {
    "word": "black shadows",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "blake shelton",
    "hint": "Famous People"
  },
  {
    "word": "blast off",
    "hint": "Outer Space"
  },
  {
    "word": "blazing bonfire",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "blizzard blast",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "blizzard blue",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "blood orange",
    "hint": "Eat & Drink"
  },
  {
    "word": "blood vessels",
    "hint": "Anatomy"
  },
  {
    "word": "blue iguana",
    "hint": "Animals"
  },
  {
    "word": "blue jeans",
    "hint": "Fashion"
  },
  {
    "word": "blue topaz",
    "hint": "Gems, Rocks & Crystals"
  },
  {
    "word": "bluefin tuna",
    "hint": "Animals"
  },
  {
    "word": "blurred lines",
    "hint": "Music & Song"
  },
  {
    "word": "boarding house",
    "hint": "Places"
  },
  {
    "word": "boat house",
    "hint": "Places"
  },
  {
    "word": "bob dylan",
    "hint": "Famous People"
  },
  {
    "word": "bob marley",
    "hint": "Famous People"
  },
  {
    "word": "bobby pin",
    "hint": "Everyday Objects"
  },
  {
    "word": "body surfing",
    "hint": "At The Beach"
  },
  {
    "word": "bodysuit",
    "hint": "Fashion"
  },
  {
    "word": "bohemian rhapsody",
    "hint": "Music & Song"
  },
  {
    "word": "boiling mad",
    "hint": "Figures of Speech"
  },
  {
    "word": "bolster",
    "hint": "Great Vocab Words"
  },
  {
    "word": "bonus point",
    "hint": "All About Sports"
  },
  {
    "word": "book fair",
    "hint": "At School"
  },
  {
    "word": "book report",
    "hint": "At School"
  },
  {
    "word": "border collie",
    "hint": "Animals"
  },
  {
    "word": "boston bruins",
    "hint": "All About Sports"
  },
  {
    "word": "boston celtics",
    "hint": "All About Sports"
  },
  {
    "word": "botanist",
    "hint": "Occupations"
  },
  {
    "word": "boulder dam",
    "hint": "Places"
  },
  {
    "word": "boutique",
    "hint": "Fashion"
  },
  {
    "word": "bowling",
    "hint": "All About Sports"
  },
  {
    "word": "box turtle",
    "hint": "Animals"
  },
  {
    "word": "brad pitt",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "bradley cooper",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "braised meat",
    "hint": "Eat & Drink"
  },
  {
    "word": "brake light",
    "hint": "Cars"
  },
  {
    "word": "bread basket",
    "hint": "In The Kitchen"
  },
  {
    "word": "bread knife",
    "hint": "In The Kitchen"
  },
  {
    "word": "break room",
    "hint": "Places"
  },
  {
    "word": "brick red",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "bristol farms",
    "hint": "Famous Brands"
  },
  {
    "word": "british empire",
    "hint": "History"
  },
  {
    "word": "britney spears",
    "hint": "Famous People"
  },
  {
    "word": "broadway theatres",
    "hint": "Places"
  },
  {
    "word": "brocade",
    "hint": "Fashion"
  },
  {
    "word": "broiler pan",
    "hint": "In The Kitchen"
  },
  {
    "word": "bronze age",
    "hint": "History"
  },
  {
    "word": "brooklyn bridge",
    "hint": "Places"
  },
  {
    "word": "brownie",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "brownies",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "bruce wayne",
    "hint": "Fictional Characters"
  },
  {
    "word": "bruce willis",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "brussels",
    "hint": "Places"
  },
  {
    "word": "brussels sprouts",
    "hint": "Eat & Drink"
  },
  {
    "word": "bubble gum",
    "hint": "Eat & Drink"
  },
  {
    "word": "bubble tea",
    "hint": "Eat & Drink"
  },
  {
    "word": "bucket seat",
    "hint": "Cars"
  },
  {
    "word": "bucky barnes",
    "hint": "Fictional Characters"
  },
  {
    "word": "budapest",
    "hint": "Places"
  },
  {
    "word": "buenos aires",
    "hint": "Places"
  },
  {
    "word": "buffalo bills",
    "hint": "All About Sports"
  },
  {
    "word": "bulgaria",
    "hint": "Places"
  },
  {
    "word": "bull moose",
    "hint": "Animals"
  },
  {
    "word": "bull shark",
    "hint": "Animals"
  },
  {
    "word": "bullfrog",
    "hint": "Animals"
  },
  {
    "word": "bumper sticker",
    "hint": "Cars"
  },
  {
    "word": "bunker hill",
    "hint": "History"
  },
  {
    "word": "bunsen burner",
    "hint": "Science"
  },
  {
    "word": "burnout",
    "hint": "Video Games"
  },
  {
    "word": "burnt orange",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "burrito",
    "hint": "Eat & Drink"
  },
  {
    "word": "bus depot",
    "hint": "Places"
  },
  {
    "word": "bus stop",
    "hint": "Places"
  },
  {
    "word": "business casual",
    "hint": "Fashion"
  },
  {
    "word": "butcher",
    "hint": "Occupations"
  },
  {
    "word": "butter knife",
    "hint": "In The Kitchen"
  },
  {
    "word": "butter pecan",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "cabin fever",
    "hint": "Figures of Speech"
  },
  {
    "word": "cable car",
    "hint": "Transportation"
  },
  {
    "word": "cactus flower",
    "hint": "Nature"
  },
  {
    "word": "caesar augustus",
    "hint": "History"
  },
  {
    "word": "caesar salad",
    "hint": "Eat & Drink"
  },
  {
    "word": "callous",
    "hint": "Great Vocab Words"
  },
  {
    "word": "calories",
    "hint": "No Repeating Letters"
  },
  {
    "word": "cam newton",
    "hint": "Famous Athletes"
  },
  {
    "word": "cambodia",
    "hint": "Places"
  },
  {
    "word": "camelot",
    "hint": "Myths & Legends"
  },
  {
    "word": "cameroon",
    "hint": "Places"
  },
  {
    "word": "campfire jamboree",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "can opener",
    "hint": "In The Kitchen"
  },
  {
    "word": "canary islands",
    "hint": "Places"
  },
  {
    "word": "candy bar",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "candy corn",
    "hint": "Halloween"
  },
  {
    "word": "candy land",
    "hint": "Toys & Games"
  },
  {
    "word": "candy shop",
    "hint": "Places"
  },
  {
    "word": "cannoli",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "canoeing",
    "hint": "All About Sports"
  },
  {
    "word": "canola oil",
    "hint": "In The Kitchen"
  },
  {
    "word": "cape cod",
    "hint": "Places"
  },
  {
    "word": "capital one",
    "hint": "Famous Brands"
  },
  {
    "word": "capri sun",
    "hint": "Famous Brands"
  },
  {
    "word": "captain america",
    "hint": "Fictional Characters"
  },
  {
    "word": "captain marvel",
    "hint": "Movies"
  },
  {
    "word": "captain picard",
    "hint": "Fictional Characters"
  },
  {
    "word": "care bears",
    "hint": "TV Shows"
  },
  {
    "word": "carmen sandiego",
    "hint": "Video Games"
  },
  {
    "word": "carne asada",
    "hint": "Eat & Drink"
  },
  {
    "word": "carnival corn",
    "hint": "Eat & Drink"
  },
  {
    "word": "carolina panthers",
    "hint": "All About Sports"
  },
  {
    "word": "carpool lane",
    "hint": "Everyday Life"
  },
  {
    "word": "carrot cake",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "cartier",
    "hint": "Famous Brands"
  },
  {
    "word": "cashier",
    "hint": "Occupations"
  },
  {
    "word": "casino royale",
    "hint": "Movies"
  },
  {
    "word": "caspian sea",
    "hint": "Places"
  },
  {
    "word": "cassette tape",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "catfish",
    "hint": "Animals"
  },
  {
    "word": "cats eye",
    "hint": "Gems, Rocks & Crystals"
  },
  {
    "word": "caustic",
    "hint": "Great Vocab Words"
  },
  {
    "word": "cayman islands",
    "hint": "Places"
  },
  {
    "word": "celery salt",
    "hint": "In The Kitchen"
  },
  {
    "word": "celine dion",
    "hint": "Famous People"
  },
  {
    "word": "cell phone",
    "hint": "Everyday Objects"
  },
  {
    "word": "centaur",
    "hint": "Myths & Legends"
  },
  {
    "word": "centaurs",
    "hint": "Myths & Legends"
  },
  {
    "word": "center fielder",
    "hint": "All About Sports"
  },
  {
    "word": "central park",
    "hint": "Places"
  },
  {
    "word": "chainsaw",
    "hint": "Halloween"
  },
  {
    "word": "channel surfing",
    "hint": "Phrases"
  },
  {
    "word": "charcoal gray",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "charging",
    "hint": "All About Sports"
  },
  {
    "word": "charging cord",
    "hint": "Everyday Objects"
  },
  {
    "word": "charles darwin",
    "hint": "Famous People"
  },
  {
    "word": "charles dickens",
    "hint": "History"
  },
  {
    "word": "charles schwab",
    "hint": "Famous Brands"
  },
  {
    "word": "charlie brown",
    "hint": "Fictional Characters"
  },
  {
    "word": "charming",
    "hint": "No Repeating Letters"
  },
  {
    "word": "chasing cars",
    "hint": "Music & Song"
  },
  {
    "word": "cheat sheet",
    "hint": "Rhyme Time"
  },
  {
    "word": "cheddar cheese",
    "hint": "Eat & Drink"
  },
  {
    "word": "cheese board",
    "hint": "In The Kitchen"
  },
  {
    "word": "chemical",
    "hint": "Science"
  },
  {
    "word": "chemical engineer",
    "hint": "Occupations"
  },
  {
    "word": "chemist",
    "hint": "Occupations"
  },
  {
    "word": "cherry pie",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "cherry tree",
    "hint": "Nature"
  },
  {
    "word": "chestnut",
    "hint": "Nature"
  },
  {
    "word": "chicago",
    "hint": "Places"
  },
  {
    "word": "chicago bulls",
    "hint": "All About Sports"
  },
  {
    "word": "chicago cubs",
    "hint": "All About Sports"
  },
  {
    "word": "chicken curry",
    "hint": "Eat & Drink"
  },
  {
    "word": "chicken dinner",
    "hint": "Eat & Drink"
  },
  {
    "word": "chicken run",
    "hint": "Movies"
  },
  {
    "word": "chicken stock",
    "hint": "Eat & Drink"
  },
  {
    "word": "chicken tender",
    "hint": "Eat & Drink"
  },
  {
    "word": "chicken wings",
    "hint": "Eat & Drink"
  },
  {
    "word": "chile pepper",
    "hint": "Eat & Drink"
  },
  {
    "word": "chili pepper",
    "hint": "Eat & Drink"
  },
  {
    "word": "chili fries",
    "hint": "Eat & Drink"
  },
  {
    "word": "chimney sweep",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "chinese food",
    "hint": "Eat & Drink"
  },
  {
    "word": "chipotle",
    "hint": "Famous Brands"
  },
  {
    "word": "chloe kim",
    "hint": "Famous Athletes"
  },
  {
    "word": "chlorine",
    "hint": "No Repeating Letters"
  },
  {
    "word": "chris evans",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "chris paul",
    "hint": "Famous Athletes"
  },
  {
    "word": "chris pratt",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "chronos",
    "hint": "Myths & Legends"
  },
  {
    "word": "cilantro",
    "hint": "In The Kitchen"
  },
  {
    "word": "cinnamon roll",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "cinnamon satin",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "citrus grove",
    "hint": "Places"
  },
  {
    "word": "citrus juicer",
    "hint": "In The Kitchen"
  },
  {
    "word": "civil engineer",
    "hint": "Occupations"
  },
  {
    "word": "civil war",
    "hint": "Oxymorons"
  },
  {
    "word": "clarinet",
    "hint": "Music & Song"
  },
  {
    "word": "claude debussy",
    "hint": "Music & Song"
  },
  {
    "word": "claude monet",
    "hint": "Famous People"
  },
  {
    "word": "climate",
    "hint": "Nature"
  },
  {
    "word": "climb down",
    "hint": "Oxymorons"
  },
  {
    "word": "clock tower",
    "hint": "Places"
  },
  {
    "word": "clock workshop",
    "hint": "One Vowel"
  },
  {
    "word": "close quarters",
    "hint": "Figures of Speech"
  },
  {
    "word": "clothes dryer",
    "hint": "Everyday Objects"
  },
  {
    "word": "cloud nine",
    "hint": "Phrases"
  },
  {
    "word": "club house",
    "hint": "Places"
  },
  {
    "word": "club sandwich",
    "hint": "Eat & Drink"
  },
  {
    "word": "coal mine",
    "hint": "Places"
  },
  {
    "word": "coalesce",
    "hint": "Great Vocab Words"
  },
  {
    "word": "coastal marsh",
    "hint": "Nature"
  },
  {
    "word": "coat rack",
    "hint": "Everyday Objects"
  },
  {
    "word": "cobb salad",
    "hint": "Eat & Drink"
  },
  {
    "word": "cocker spaniel",
    "hint": "Animals"
  },
  {
    "word": "cocktail dress",
    "hint": "Fashion"
  },
  {
    "word": "cocoa powder",
    "hint": "In The Kitchen"
  },
  {
    "word": "coconut cake",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "coconut milk",
    "hint": "Eat & Drink"
  },
  {
    "word": "coconuts",
    "hint": "Eat & Drink"
  },
  {
    "word": "coffee maker",
    "hint": "In The Kitchen"
  },
  {
    "word": "coffee mug",
    "hint": "Everyday Objects"
  },
  {
    "word": "coffee table",
    "hint": "Everyday Objects"
  },
  {
    "word": "cold feet",
    "hint": "Figures of Speech"
  },
  {
    "word": "cold front",
    "hint": "Nature"
  },
  {
    "word": "cold shoulder",
    "hint": "Phrases"
  },
  {
    "word": "cold snap",
    "hint": "Nature"
  },
  {
    "word": "cold turkey",
    "hint": "Phrases"
  },
  {
    "word": "cold war",
    "hint": "History"
  },
  {
    "word": "colin farrell",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "collard greens",
    "hint": "Eat & Drink"
  },
  {
    "word": "college campus",
    "hint": "At School"
  },
  {
    "word": "colorado",
    "hint": "Places"
  },
  {
    "word": "colorado river",
    "hint": "Places"
  },
  {
    "word": "colored pencils",
    "hint": "At School"
  },
  {
    "word": "coloring books",
    "hint": "Toys & Games"
  },
  {
    "word": "columbus day",
    "hint": "Special Days"
  },
  {
    "word": "combine",
    "hint": "Transportation"
  },
  {
    "word": "common cold",
    "hint": "Body & Health"
  },
  {
    "word": "compact car",
    "hint": "Cars"
  },
  {
    "word": "composer",
    "hint": "Occupations"
  },
  {
    "word": "computer literacy",
    "hint": "At School"
  },
  {
    "word": "computer science",
    "hint": "At School"
  },
  {
    "word": "coney island",
    "hint": "Places"
  },
  {
    "word": "confetti sunset",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "connect four",
    "hint": "Toys & Games"
  },
  {
    "word": "cookie cutter",
    "hint": "Phrases"
  },
  {
    "word": "cookie dough",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "cookie sheet",
    "hint": "In The Kitchen"
  },
  {
    "word": "cooking apron",
    "hint": "In The Kitchen"
  },
  {
    "word": "cooking spray",
    "hint": "In The Kitchen"
  },
  {
    "word": "cool whip",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "coolmath games",
    "hint": "Famous Things"
  },
  {
    "word": "copper penny",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "corner kick",
    "hint": "All About Sports"
  },
  {
    "word": "corner pocket",
    "hint": "All About Sports"
  },
  {
    "word": "cornhole",
    "hint": "Toys & Games"
  },
  {
    "word": "cosmic cobalt",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "cosmic ray",
    "hint": "Outer Space"
  },
  {
    "word": "costa rica",
    "hint": "Places"
  },
  {
    "word": "costume",
    "hint": "Halloween"
  },
  {
    "word": "costumes",
    "hint": "Halloween"
  },
  {
    "word": "couch cushion",
    "hint": "Everyday Objects"
  },
  {
    "word": "couch potato",
    "hint": "Figures of Speech"
  },
  {
    "word": "count olaf",
    "hint": "Fictional Characters"
  },
  {
    "word": "counter turn",
    "hint": "All About Sports"
  },
  {
    "word": "counting stars",
    "hint": "Music & Song"
  },
  {
    "word": "country club",
    "hint": "Places"
  },
  {
    "word": "country music",
    "hint": "Music & Song"
  },
  {
    "word": "country store",
    "hint": "Places"
  },
  {
    "word": "court reporter",
    "hint": "Occupations"
  },
  {
    "word": "crab apple",
    "hint": "Eat & Drink"
  },
  {
    "word": "crab nebula",
    "hint": "Outer Space"
  },
  {
    "word": "cranium",
    "hint": "Toys & Games"
  },
  {
    "word": "crash landing",
    "hint": "Oxymorons"
  },
  {
    "word": "cream cheese",
    "hint": "Eat & Drink"
  },
  {
    "word": "credit union",
    "hint": "Places"
  },
  {
    "word": "crescent moon",
    "hint": "Outer Space"
  },
  {
    "word": "crop duster",
    "hint": "Transportation"
  },
  {
    "word": "croquet",
    "hint": "All About Sports"
  },
  {
    "word": "cross country",
    "hint": "All About Sports"
  },
  {
    "word": "cross stroke",
    "hint": "All About Sports"
  },
  {
    "word": "cruel kindness",
    "hint": "Oxymorons"
  },
  {
    "word": "cruise control",
    "hint": "Cars"
  },
  {
    "word": "crushing",
    "hint": "No Repeating Letters"
  },
  {
    "word": "crystal",
    "hint": "Body & Health"
  },
  {
    "word": "cucumber",
    "hint": "Eat & Drink"
  },
  {
    "word": "cue stick",
    "hint": "All About Sports"
  },
  {
    "word": "culinary arts",
    "hint": "At School"
  },
  {
    "word": "curious george",
    "hint": "Fictional Characters"
  },
  {
    "word": "curling",
    "hint": "All About Sports"
  },
  {
    "word": "curve shot",
    "hint": "All About Sports"
  },
  {
    "word": "curved line",
    "hint": "Oxymorons"
  },
  {
    "word": "custard tart",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "cyber monday",
    "hint": "Special Days"
  },
  {
    "word": "daily commute",
    "hint": "Everyday Life"
  },
  {
    "word": "dairy queen",
    "hint": "Famous Brands"
  },
  {
    "word": "daisy duck",
    "hint": "Fictional Characters"
  },
  {
    "word": "damian lillard",
    "hint": "Famous Athletes"
  },
  {
    "word": "dance hall",
    "hint": "Places"
  },
  {
    "word": "danica patrick",
    "hint": "Famous Athletes"
  },
  {
    "word": "daniel craig",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "dark horse",
    "hint": "Music & Song"
  },
  {
    "word": "darth vader",
    "hint": "Fictional Characters"
  },
  {
    "word": "dave bautista",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "daycare center",
    "hint": "Places"
  },
  {
    "word": "dead sea",
    "hint": "Places"
  },
  {
    "word": "deckhand",
    "hint": "Occupations"
  },
  {
    "word": "deep space",
    "hint": "Outer Space"
  },
  {
    "word": "definite maybe",
    "hint": "Oxymorons"
  },
  {
    "word": "delivery truck",
    "hint": "Transportation"
  },
  {
    "word": "delivery van",
    "hint": "Transportation"
  },
  {
    "word": "demeanor",
    "hint": "Great Vocab Words"
  },
  {
    "word": "demi lovato",
    "hint": "Famous People"
  },
  {
    "word": "dental floss",
    "hint": "Everyday Objects"
  },
  {
    "word": "dentist",
    "hint": "Occupations"
  },
  {
    "word": "denver nuggets",
    "hint": "All About Sports"
  },
  {
    "word": "des moines",
    "hint": "Places"
  },
  {
    "word": "desert island",
    "hint": "Places"
  },
  {
    "word": "desert sand",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "desert storm",
    "hint": "History"
  },
  {
    "word": "deserted island",
    "hint": "Places"
  },
  {
    "word": "desk lamp",
    "hint": "Everyday Objects"
  },
  {
    "word": "detroit pistons",
    "hint": "All About Sports"
  },
  {
    "word": "deutsche bank",
    "hint": "Famous Brands"
  },
  {
    "word": "diagon alley",
    "hint": "Places"
  },
  {
    "word": "diesel truck",
    "hint": "Transportation"
  },
  {
    "word": "dilemma",
    "hint": "Great Vocab Words"
  },
  {
    "word": "dingy dungeon",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "dining table",
    "hint": "Everyday Objects"
  },
  {
    "word": "dinosaur fossils",
    "hint": "Nature"
  },
  {
    "word": "dirt bike",
    "hint": "Transportation"
  },
  {
    "word": "discount store",
    "hint": "Places"
  },
  {
    "word": "discus throwing",
    "hint": "All About Sports"
  },
  {
    "word": "disney world",
    "hint": "Places"
  },
  {
    "word": "distance run",
    "hint": "All About Sports"
  },
  {
    "word": "district court",
    "hint": "Places"
  },
  {
    "word": "doberman pinscher",
    "hint": "Animals"
  },
  {
    "word": "doc hudson",
    "hint": "Fictional Characters"
  },
  {
    "word": "doctor dolittle",
    "hint": "Movies"
  },
  {
    "word": "doctor doom",
    "hint": "Fictional Characters"
  },
  {
    "word": "doctor who",
    "hint": "TV Shows"
  },
  {
    "word": "doing nothing",
    "hint": "Oxymorons"
  },
  {
    "word": "doll house",
    "hint": "Toys & Games"
  },
  {
    "word": "dollar tree",
    "hint": "Famous Brands"
  },
  {
    "word": "dolly parton",
    "hint": "Famous People"
  },
  {
    "word": "dominoes",
    "hint": "Toys & Games"
  },
  {
    "word": "dominos pizza",
    "hint": "Famous Brands"
  },
  {
    "word": "donald duck",
    "hint": "Fictional Characters"
  },
  {
    "word": "donald glover",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "doorbell",
    "hint": "Everyday Objects"
  },
  {
    "word": "dorian gray",
    "hint": "Fictional Characters"
  },
  {
    "word": "dormant",
    "hint": "Great Vocab Words"
  },
  {
    "word": "double cross",
    "hint": "Phrases"
  },
  {
    "word": "double dutch",
    "hint": "Toys & Games"
  },
  {
    "word": "double play",
    "hint": "All About Sports"
  },
  {
    "word": "double trouble",
    "hint": "Rhyme Time"
  },
  {
    "word": "downhill skating",
    "hint": "All About Sports"
  },
  {
    "word": "draco malfoy",
    "hint": "Fictional Characters"
  },
  {
    "word": "dracula",
    "hint": "Fictional Characters"
  },
  {
    "word": "dragon quest",
    "hint": "Movies"
  },
  {
    "word": "drawing paper",
    "hint": "At School"
  },
  {
    "word": "dream team",
    "hint": "Rhyme Time"
  },
  {
    "word": "dried fruit",
    "hint": "Eat & Drink"
  },
  {
    "word": "dry cleaners",
    "hint": "Places"
  },
  {
    "word": "dryer sheet",
    "hint": "Everyday Objects"
  },
  {
    "word": "dump truck",
    "hint": "Transportation"
  },
  {
    "word": "duracell",
    "hint": "Famous Brands"
  },
  {
    "word": "dust storm",
    "hint": "Nature"
  },
  {
    "word": "dwarf planet",
    "hint": "Outer Space"
  },
  {
    "word": "dwayne johnson",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "dwight schrute",
    "hint": "Fictional Characters"
  },
  {
    "word": "dynamite",
    "hint": "No Repeating Letters"
  },
  {
    "word": "ear canal",
    "hint": "Anatomy"
  },
  {
    "word": "earth day",
    "hint": "Special Days"
  },
  {
    "word": "earth science",
    "hint": "At School"
  },
  {
    "word": "easter sunday",
    "hint": "Special Days"
  },
  {
    "word": "ebenezer scrooge",
    "hint": "Fictional Characters"
  },
  {
    "word": "ed sheeran",
    "hint": "Famous People"
  },
  {
    "word": "eddie murphy",
    "hint": "Famous People"
  },
  {
    "word": "edmonton oilers",
    "hint": "All About Sports"
  },
  {
    "word": "eerie black",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "eggplant",
    "hint": "Eat & Drink"
  },
  {
    "word": "egyptian pharaoh",
    "hint": "History"
  },
  {
    "word": "eiffel tower",
    "hint": "Places"
  },
  {
    "word": "el salvador",
    "hint": "Places"
  },
  {
    "word": "election day",
    "hint": "Special Days"
  },
  {
    "word": "electric guitar",
    "hint": "Music & Song"
  },
  {
    "word": "electric lime",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "electric vehicle",
    "hint": "Transportation"
  },
  {
    "word": "elevator operator",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "eli manning",
    "hint": "Famous Athletes"
  },
  {
    "word": "elmer fudd",
    "hint": "Fictional Characters"
  },
  {
    "word": "elon musk",
    "hint": "Famous People"
  },
  {
    "word": "elusive",
    "hint": "Great Vocab Words"
  },
  {
    "word": "elvis presley",
    "hint": "Famous People"
  },
  {
    "word": "emilia clarke",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "emily blunt",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "emoji movie",
    "hint": "Movies"
  },
  {
    "word": "emperor nero",
    "hint": "History"
  },
  {
    "word": "emperor penguin",
    "hint": "Animals"
  },
  {
    "word": "endless hour",
    "hint": "Oxymorons"
  },
  {
    "word": "energy drink",
    "hint": "Eat & Drink"
  },
  {
    "word": "english bulldog",
    "hint": "Animals"
  },
  {
    "word": "english muffin",
    "hint": "Eat & Drink"
  },
  {
    "word": "envelope",
    "hint": "Everyday Objects"
  },
  {
    "word": "erie canal",
    "hint": "Places"
  },
  {
    "word": "escaped prisoner",
    "hint": "Oxymorons"
  },
  {
    "word": "ethereal",
    "hint": "Great Vocab Words"
  },
  {
    "word": "ethiopia",
    "hint": "Places"
  },
  {
    "word": "event horizon",
    "hint": "Outer Space"
  },
  {
    "word": "event planner",
    "hint": "Occupations"
  },
  {
    "word": "exact estimate",
    "hint": "Oxymorons"
  },
  {
    "word": "exhaust",
    "hint": "Cars"
  },
  {
    "word": "extra credit",
    "hint": "At School"
  },
  {
    "word": "eyeballs",
    "hint": "Anatomy"
  },
  {
    "word": "eyelids",
    "hint": "Anatomy"
  },
  {
    "word": "facebook",
    "hint": "Famous Brands"
  },
  {
    "word": "factory worker",
    "hint": "Occupations"
  },
  {
    "word": "fairly accurate",
    "hint": "Oxymorons"
  },
  {
    "word": "falafel",
    "hint": "Eat & Drink"
  },
  {
    "word": "fallout",
    "hint": "Video Games"
  },
  {
    "word": "family feud",
    "hint": "TV Shows"
  },
  {
    "word": "family reunion",
    "hint": "Special Days"
  },
  {
    "word": "fantasia",
    "hint": "Movies"
  },
  {
    "word": "far closer",
    "hint": "Oxymorons"
  },
  {
    "word": "fashion designer",
    "hint": "Occupations"
  },
  {
    "word": "fashion model",
    "hint": "Fashion"
  },
  {
    "word": "fedora hat",
    "hint": "Fashion"
  },
  {
    "word": "fenders",
    "hint": "Cars"
  },
  {
    "word": "fidget spinner",
    "hint": "Toys & Games"
  },
  {
    "word": "field hockey",
    "hint": "All About Sports"
  },
  {
    "word": "field trip",
    "hint": "At School"
  },
  {
    "word": "figure skating",
    "hint": "All About Sports"
  },
  {
    "word": "filet mignon",
    "hint": "Eat & Drink"
  },
  {
    "word": "final draft",
    "hint": "Oxymorons"
  },
  {
    "word": "final fantasy",
    "hint": "Video Games"
  },
  {
    "word": "finding nemo",
    "hint": "Movies"
  },
  {
    "word": "fingers",
    "hint": "Anatomy"
  },
  {
    "word": "finland",
    "hint": "Places"
  },
  {
    "word": "fire drill",
    "hint": "At School"
  },
  {
    "word": "fire emblem",
    "hint": "Video Games"
  },
  {
    "word": "fire fighter",
    "hint": "Occupations"
  },
  {
    "word": "fire hydrant",
    "hint": "Everyday Objects"
  },
  {
    "word": "fire station",
    "hint": "Places"
  },
  {
    "word": "fireboat",
    "hint": "Transportation"
  },
  {
    "word": "fish market",
    "hint": "At The Beach"
  },
  {
    "word": "fishing lodge",
    "hint": "Places"
  },
  {
    "word": "fitness",
    "hint": "All About Sports"
  },
  {
    "word": "fitness trainer",
    "hint": "Occupations"
  },
  {
    "word": "flag day",
    "hint": "Special Days"
  },
  {
    "word": "flamingo",
    "hint": "Animals"
  },
  {
    "word": "flamingo festival",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "flappy bird",
    "hint": "Video Games"
  },
  {
    "word": "flavor saver",
    "hint": "Rhyme Time"
  },
  {
    "word": "flea flicker",
    "hint": "All About Sports"
  },
  {
    "word": "flip flops",
    "hint": "At The Beach"
  },
  {
    "word": "floor exercise",
    "hint": "All About Sports"
  },
  {
    "word": "floor mats",
    "hint": "Cars"
  },
  {
    "word": "florence",
    "hint": "Places"
  },
  {
    "word": "florida",
    "hint": "Places"
  },
  {
    "word": "florida keys",
    "hint": "Places"
  },
  {
    "word": "florida sunrise",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "flying saucer",
    "hint": "Transportation"
  },
  {
    "word": "flying squirrel",
    "hint": "Animals"
  },
  {
    "word": "folk music",
    "hint": "Music & Song"
  },
  {
    "word": "food chain",
    "hint": "Science"
  },
  {
    "word": "food scale",
    "hint": "In The Kitchen"
  },
  {
    "word": "food trucks",
    "hint": "Eat & Drink"
  },
  {
    "word": "football coach",
    "hint": "All About Sports"
  },
  {
    "word": "football scout",
    "hint": "Occupations"
  },
  {
    "word": "footwear",
    "hint": "Fashion"
  },
  {
    "word": "ford escape",
    "hint": "Cars"
  },
  {
    "word": "ford explorer",
    "hint": "Cars"
  },
  {
    "word": "forearm",
    "hint": "Anatomy"
  },
  {
    "word": "forecast",
    "hint": "Nature"
  },
  {
    "word": "foreign language",
    "hint": "At School"
  },
  {
    "word": "forest floor",
    "hint": "Nature"
  },
  {
    "word": "forget you",
    "hint": "Music & Song"
  },
  {
    "word": "formula one",
    "hint": "All About Sports"
  },
  {
    "word": "forrest gump",
    "hint": "Movies"
  },
  {
    "word": "fortune cookie",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "forward spiral",
    "hint": "All About Sports"
  },
  {
    "word": "foul ball",
    "hint": "All About Sports"
  },
  {
    "word": "foul line",
    "hint": "All About Sports"
  },
  {
    "word": "four seasons",
    "hint": "Famous Brands"
  },
  {
    "word": "fox terrier",
    "hint": "Animals"
  },
  {
    "word": "fraction",
    "hint": "No Repeating Letters"
  },
  {
    "word": "frank sinatra",
    "hint": "Famous People"
  },
  {
    "word": "frederic chopin",
    "hint": "Famous People"
  },
  {
    "word": "free throw",
    "hint": "All About Sports"
  },
  {
    "word": "free willy",
    "hint": "Movies"
  },
  {
    "word": "freezing rain",
    "hint": "Nature"
  },
  {
    "word": "freight train",
    "hint": "Transportation"
  },
  {
    "word": "french guiana",
    "hint": "Places"
  },
  {
    "word": "french quarter",
    "hint": "Places"
  },
  {
    "word": "french toast",
    "hint": "Eat & Drink"
  },
  {
    "word": "freshman",
    "hint": "At School"
  },
  {
    "word": "frida kahlo",
    "hint": "Famous People"
  },
  {
    "word": "fried chicken",
    "hint": "Eat & Drink"
  },
  {
    "word": "fried onions",
    "hint": "Eat & Drink"
  },
  {
    "word": "fried rice",
    "hint": "Eat & Drink"
  },
  {
    "word": "friends",
    "hint": "TV Shows"
  },
  {
    "word": "frisbee golf",
    "hint": "All About Sports"
  },
  {
    "word": "frontal lobe",
    "hint": "Anatomy"
  },
  {
    "word": "frosted flakes",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "frozen banana",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "frozen yogurt",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "fruit cocktail",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "fruit ninja",
    "hint": "Video Games"
  },
  {
    "word": "fuel tank",
    "hint": "Cars"
  },
  {
    "word": "funeral home",
    "hint": "Places"
  },
  {
    "word": "funnel cake",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "galaxy",
    "hint": "Outer Space"
  },
  {
    "word": "galileo galilei",
    "hint": "History"
  },
  {
    "word": "game designer",
    "hint": "Occupations"
  },
  {
    "word": "game point",
    "hint": "All About Sports"
  },
  {
    "word": "gamma ray",
    "hint": "Outer Space"
  },
  {
    "word": "garbage truck",
    "hint": "Transportation"
  },
  {
    "word": "garden hose",
    "hint": "Everyday Objects"
  },
  {
    "word": "garden spider",
    "hint": "Animals"
  },
  {
    "word": "garden statue",
    "hint": "Everyday Objects"
  },
  {
    "word": "gardener",
    "hint": "Nature"
  },
  {
    "word": "gardenia",
    "hint": "Nature"
  },
  {
    "word": "garlic cloves",
    "hint": "Eat & Drink"
  },
  {
    "word": "garlic press",
    "hint": "In The Kitchen"
  },
  {
    "word": "gas station",
    "hint": "Places"
  },
  {
    "word": "gelatin dessert",
    "hint": "Eat & Drink"
  },
  {
    "word": "general electric",
    "hint": "Famous Brands"
  },
  {
    "word": "general motors",
    "hint": "Famous Brands"
  },
  {
    "word": "genetics",
    "hint": "Science"
  },
  {
    "word": "geometry",
    "hint": "At School"
  },
  {
    "word": "geometry dash",
    "hint": "Video Games"
  },
  {
    "word": "george clooney",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "george lucas",
    "hint": "Famous People"
  },
  {
    "word": "george orwell",
    "hint": "Famous People"
  },
  {
    "word": "geranium",
    "hint": "Nature"
  },
  {
    "word": "gerard butler",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "germany",
    "hint": "Places"
  },
  {
    "word": "ghost story",
    "hint": "Halloween"
  },
  {
    "word": "ghoulish",
    "hint": "Halloween"
  },
  {
    "word": "gianni versace",
    "hint": "Fashion"
  },
  {
    "word": "giant panda",
    "hint": "Animals"
  },
  {
    "word": "gila monster",
    "hint": "Animals"
  },
  {
    "word": "gillette razor",
    "hint": "Famous Brands"
  },
  {
    "word": "giorgio armani",
    "hint": "Famous Brands"
  },
  {
    "word": "giving tuesday",
    "hint": "Special Days"
  },
  {
    "word": "global warming",
    "hint": "Nature"
  },
  {
    "word": "glow stick",
    "hint": "Toys & Games"
  },
  {
    "word": "gmc sierra",
    "hint": "Cars"
  },
  {
    "word": "goal post",
    "hint": "All About Sports"
  },
  {
    "word": "gobi desert",
    "hint": "Places"
  },
  {
    "word": "godzilla",
    "hint": "Fictional Characters"
  },
  {
    "word": "going nowhere",
    "hint": "Oxymorons"
  },
  {
    "word": "gold medalist",
    "hint": "All About Sports"
  },
  {
    "word": "gold mine",
    "hint": "Places"
  },
  {
    "word": "gold star",
    "hint": "At School"
  },
  {
    "word": "golden dust",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "golden pheasant",
    "hint": "Animals"
  },
  {
    "word": "goldman sachs",
    "hint": "Famous Brands"
  },
  {
    "word": "golf cart",
    "hint": "Transportation"
  },
  {
    "word": "golf course",
    "hint": "Places"
  },
  {
    "word": "gondola lift",
    "hint": "Transportation"
  },
  {
    "word": "good grief",
    "hint": "Oxymorons"
  },
  {
    "word": "goodyear tire",
    "hint": "Famous Brands"
  },
  {
    "word": "gran turismo",
    "hint": "Video Games"
  },
  {
    "word": "grand slam",
    "hint": "All About Sports"
  },
  {
    "word": "granite",
    "hint": "Gems, Rocks & Crystals"
  },
  {
    "word": "grape soda",
    "hint": "Eat & Drink"
  },
  {
    "word": "graphic artist",
    "hint": "Occupations"
  },
  {
    "word": "grass jelly",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "great britain",
    "hint": "Places"
  },
  {
    "word": "great plague",
    "hint": "History"
  },
  {
    "word": "great sphinx",
    "hint": "History"
  },
  {
    "word": "green lantern",
    "hint": "Fictional Characters"
  },
  {
    "word": "green turtle",
    "hint": "Animals"
  },
  {
    "word": "grenade",
    "hint": "Music & Song"
  },
  {
    "word": "grilled cheese",
    "hint": "Eat & Drink"
  },
  {
    "word": "grim fandango",
    "hint": "Video Games"
  },
  {
    "word": "grizzly bear",
    "hint": "Animals"
  },
  {
    "word": "grocery shopping",
    "hint": "Everyday Life"
  },
  {
    "word": "ground cumin",
    "hint": "In The Kitchen"
  },
  {
    "word": "ground squirrel",
    "hint": "Animals"
  },
  {
    "word": "growing smaller",
    "hint": "Oxymorons"
  },
  {
    "word": "guest host",
    "hint": "Oxymorons"
  },
  {
    "word": "guinea pig",
    "hint": "Animals"
  },
  {
    "word": "gummy worms",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "gwyneth paltrow",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "hail storm",
    "hint": "Nature"
  },
  {
    "word": "hair brush",
    "hint": "Everyday Objects"
  },
  {
    "word": "hair stylist",
    "hint": "Occupations"
  },
  {
    "word": "hakuna matata",
    "hint": "Famous Quotes"
  },
  {
    "word": "half moon",
    "hint": "Outer Space"
  },
  {
    "word": "halle berry",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "ham radio",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "hamster",
    "hint": "Animals"
  },
  {
    "word": "han dynasty",
    "hint": "History"
  },
  {
    "word": "handball",
    "hint": "All About Sports"
  },
  {
    "word": "hang tight",
    "hint": "Phrases"
  },
  {
    "word": "hangman",
    "hint": "Toys & Games"
  },
  {
    "word": "hanukkah",
    "hint": "Special Days"
  },
  {
    "word": "happy birthday",
    "hint": "Special Days"
  },
  {
    "word": "harbor seal",
    "hint": "Animals"
  },
  {
    "word": "hard cushion",
    "hint": "Oxymorons"
  },
  {
    "word": "hard rock",
    "hint": "Music & Song"
  },
  {
    "word": "harlem shake",
    "hint": "Music & Song"
  },
  {
    "word": "harriet tubman",
    "hint": "History"
  },
  {
    "word": "harry houdini",
    "hint": "Famous People"
  },
  {
    "word": "harry potter",
    "hint": "Fictional Characters"
  },
  {
    "word": "harry truman",
    "hint": "Famous People"
  },
  {
    "word": "hash brown",
    "hint": "Eat & Drink"
  },
  {
    "word": "hat rack",
    "hint": "Everyday Objects"
  },
  {
    "word": "hat trick",
    "hint": "All About Sports"
  },
  {
    "word": "haute couture",
    "hint": "Fashion"
  },
  {
    "word": "hawaiian islands",
    "hint": "Places"
  },
  {
    "word": "hazard lights",
    "hint": "Cars"
  },
  {
    "word": "headband",
    "hint": "Everyday Objects"
  },
  {
    "word": "headless horseman",
    "hint": "Myths & Legends"
  },
  {
    "word": "heads up",
    "hint": "Phrases"
  },
  {
    "word": "health club",
    "hint": "Places"
  },
  {
    "word": "heinz ketchup",
    "hint": "Famous Brands"
  },
  {
    "word": "helen keller",
    "hint": "Famous People"
  },
  {
    "word": "henry ford",
    "hint": "Famous People"
  },
  {
    "word": "henry hudson",
    "hint": "History"
  },
  {
    "word": "herbal tea",
    "hint": "Eat & Drink"
  },
  {
    "word": "hermione granger",
    "hint": "Fictional Characters"
  },
  {
    "word": "hermit crab",
    "hint": "At The Beach"
  },
  {
    "word": "hickory farms",
    "hint": "Famous Brands"
  },
  {
    "word": "hickory nuts",
    "hint": "Eat & Drink"
  },
  {
    "word": "high chair",
    "hint": "Everyday Objects"
  },
  {
    "word": "hiking trail",
    "hint": "Nature"
  },
  {
    "word": "history museum",
    "hint": "Places"
  },
  {
    "word": "hocus pocus",
    "hint": "Halloween"
  },
  {
    "word": "hogwarts school",
    "hint": "Places"
  },
  {
    "word": "holidays",
    "hint": "No Repeating Letters"
  },
  {
    "word": "home alone",
    "hint": "Movies"
  },
  {
    "word": "home phone",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "home run",
    "hint": "All About Sports"
  },
  {
    "word": "home videos",
    "hint": "Everyday Life"
  },
  {
    "word": "homework",
    "hint": "At School"
  },
  {
    "word": "honda accord",
    "hint": "Cars"
  },
  {
    "word": "honda pilot",
    "hint": "Cars"
  },
  {
    "word": "honduras",
    "hint": "Places"
  },
  {
    "word": "honey badger",
    "hint": "Animals"
  },
  {
    "word": "honey bee",
    "hint": "Animals"
  },
  {
    "word": "honeydew melon",
    "hint": "Eat & Drink"
  },
  {
    "word": "hoop earrings",
    "hint": "Fashion"
  },
  {
    "word": "hoover dam",
    "hint": "Places"
  },
  {
    "word": "horned frog",
    "hint": "Animals"
  },
  {
    "word": "horned lizard",
    "hint": "Animals"
  },
  {
    "word": "horse racing",
    "hint": "All About Sports"
  },
  {
    "word": "horse stables",
    "hint": "Places"
  },
  {
    "word": "hostess cupcake",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "hot jupiter",
    "hint": "Outer Space"
  },
  {
    "word": "hot sauce",
    "hint": "Eat & Drink"
  },
  {
    "word": "hot wheels",
    "hint": "Toys & Games"
  },
  {
    "word": "hotel pool",
    "hint": "Places"
  },
  {
    "word": "houston astros",
    "hint": "All About Sports"
  },
  {
    "word": "houston dash",
    "hint": "All About Sports"
  },
  {
    "word": "houston texans",
    "hint": "All About Sports"
  },
  {
    "word": "hudson bay",
    "hint": "Places"
  },
  {
    "word": "hula hoop",
    "hint": "Toys & Games"
  },
  {
    "word": "hurdles",
    "hint": "All About Sports"
  },
  {
    "word": "hyundai tucson",
    "hint": "Cars"
  },
  {
    "word": "ice chest",
    "hint": "Everyday Objects"
  },
  {
    "word": "ice climbing",
    "hint": "All About Sports"
  },
  {
    "word": "ice crystals",
    "hint": "Nature"
  },
  {
    "word": "ice curling",
    "hint": "All About Sports"
  },
  {
    "word": "ice hockey",
    "hint": "All About Sports"
  },
  {
    "word": "ice king",
    "hint": "Fictional Characters"
  },
  {
    "word": "ice skating",
    "hint": "All About Sports"
  },
  {
    "word": "iceberg lettuce",
    "hint": "Eat & Drink"
  },
  {
    "word": "iced coffee",
    "hint": "Eat & Drink"
  },
  {
    "word": "iceland",
    "hint": "Places"
  },
  {
    "word": "idris elba",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "igneous rocks",
    "hint": "Nature"
  },
  {
    "word": "ill health",
    "hint": "Oxymorons"
  },
  {
    "word": "immanuel kant",
    "hint": "Famous People"
  },
  {
    "word": "in spades",
    "hint": "Phrases"
  },
  {
    "word": "in stitches",
    "hint": "Phrases"
  },
  {
    "word": "indian elephant",
    "hint": "Animals"
  },
  {
    "word": "indian ocean",
    "hint": "Places"
  },
  {
    "word": "indiana jones",
    "hint": "Fictional Characters"
  },
  {
    "word": "indiana pacers",
    "hint": "All About Sports"
  },
  {
    "word": "indoor arena",
    "hint": "Places"
  },
  {
    "word": "infrared",
    "hint": "Outer Space"
  },
  {
    "word": "inner peace",
    "hint": "Phrases"
  },
  {
    "word": "inner tube",
    "hint": "Transportation"
  },
  {
    "word": "inside out",
    "hint": "Movies"
  },
  {
    "word": "investor",
    "hint": "Occupations"
  },
  {
    "word": "irish terrier",
    "hint": "Animals"
  },
  {
    "word": "iron man",
    "hint": "Fictional Characters"
  },
  {
    "word": "isaac newton",
    "hint": "History"
  },
  {
    "word": "istanbul",
    "hint": "Places"
  },
  {
    "word": "ivory coast",
    "hint": "Places"
  },
  {
    "word": "jack black",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "jackie chan",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "jackie robinson",
    "hint": "Famous People"
  },
  {
    "word": "jackson pollock",
    "hint": "Famous People"
  },
  {
    "word": "jacob tremblay",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "jamaica",
    "hint": "Places"
  },
  {
    "word": "jamba juice",
    "hint": "Famous Brands"
  },
  {
    "word": "james harden",
    "hint": "Famous Athletes"
  },
  {
    "word": "jane austen",
    "hint": "Famous People"
  },
  {
    "word": "jane goodall",
    "hint": "Famous People"
  },
  {
    "word": "janitor",
    "hint": "Occupations"
  },
  {
    "word": "japanese plum",
    "hint": "Eat & Drink"
  },
  {
    "word": "jason momoa",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "jason statham",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "jeep wrangler",
    "hint": "Cars"
  },
  {
    "word": "jennifer lawrence",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "jennifer lopez",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "jersey shore",
    "hint": "Places"
  },
  {
    "word": "jet plane",
    "hint": "Transportation"
  },
  {
    "word": "jetpack",
    "hint": "Transportation"
  },
  {
    "word": "jewelry store",
    "hint": "Places"
  },
  {
    "word": "jim henson",
    "hint": "Famous People"
  },
  {
    "word": "jim morrison",
    "hint": "Famous People"
  },
  {
    "word": "jimmy butler",
    "hint": "Famous Athletes"
  },
  {
    "word": "jimmy neutron",
    "hint": "Fictional Characters"
  },
  {
    "word": "joaquin phoenix",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "john adams",
    "hint": "Famous People"
  },
  {
    "word": "john cena",
    "hint": "Famous People"
  },
  {
    "word": "john deere",
    "hint": "Famous Brands"
  },
  {
    "word": "john glenn",
    "hint": "Famous People"
  },
  {
    "word": "john lennon",
    "hint": "Famous People"
  },
  {
    "word": "jordan peele",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "joseph haydn",
    "hint": "Famous People"
  },
  {
    "word": "journey",
    "hint": "Video Games"
  },
  {
    "word": "jousting",
    "hint": "History"
  },
  {
    "word": "judy jetson",
    "hint": "Fictional Characters"
  },
  {
    "word": "juliet capulet",
    "hint": "Fictional Characters"
  },
  {
    "word": "jumanji",
    "hint": "Movies"
  },
  {
    "word": "jumbo jet",
    "hint": "Transportation"
  },
  {
    "word": "jump shot",
    "hint": "All About Sports"
  },
  {
    "word": "jumpsuit",
    "hint": "Fashion"
  },
  {
    "word": "junior high",
    "hint": "At School"
  },
  {
    "word": "jurassic park",
    "hint": "Movies"
  },
  {
    "word": "just dance",
    "hint": "Video Games"
  },
  {
    "word": "justice league",
    "hint": "Movies"
  },
  {
    "word": "justin bieber",
    "hint": "Famous People"
  },
  {
    "word": "kangaroo",
    "hint": "Animals"
  },
  {
    "word": "kanye west",
    "hint": "Famous People"
  },
  {
    "word": "karate dojo",
    "hint": "Places"
  },
  {
    "word": "kate winslet",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "katniss everdeen",
    "hint": "Fictional Characters"
  },
  {
    "word": "keanu reeves",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "kelloggs cereal",
    "hint": "Famous Brands"
  },
  {
    "word": "kentucky derby",
    "hint": "All About Sports"
  },
  {
    "word": "kevin durant",
    "hint": "Famous Athletes"
  },
  {
    "word": "kidney beans",
    "hint": "Eat & Drink"
  },
  {
    "word": "kim possible",
    "hint": "Fictional Characters"
  },
  {
    "word": "kinetic energy",
    "hint": "Science"
  },
  {
    "word": "king cobra",
    "hint": "Animals"
  },
  {
    "word": "king crab",
    "hint": "Animals"
  },
  {
    "word": "king triton",
    "hint": "Fictional Characters"
  },
  {
    "word": "kingdom hearts",
    "hint": "Video Games"
  },
  {
    "word": "kitchen shears",
    "hint": "In The Kitchen"
  },
  {
    "word": "kleenex tissues",
    "hint": "Famous Brands"
  },
  {
    "word": "knitted sweater",
    "hint": "Fashion"
  },
  {
    "word": "knuckles",
    "hint": "Anatomy"
  },
  {
    "word": "kobe bryant",
    "hint": "Famous Athletes"
  },
  {
    "word": "korean barbeque",
    "hint": "In The Kitchen"
  },
  {
    "word": "korean conflict",
    "hint": "History"
  },
  {
    "word": "kraft singles",
    "hint": "Famous Brands"
  },
  {
    "word": "labor day",
    "hint": "Special Days"
  },
  {
    "word": "ladder toss",
    "hint": "Toys & Games"
  },
  {
    "word": "lake huron",
    "hint": "Places"
  },
  {
    "word": "lake michigan",
    "hint": "Places"
  },
  {
    "word": "lake superior",
    "hint": "Places"
  },
  {
    "word": "lake tahoe",
    "hint": "Places"
  },
  {
    "word": "lake victoria",
    "hint": "Places"
  },
  {
    "word": "lambeau field",
    "hint": "Places"
  },
  {
    "word": "lamp post",
    "hint": "Everyday Objects"
  },
  {
    "word": "land rover",
    "hint": "Cars"
  },
  {
    "word": "landfill",
    "hint": "Places"
  },
  {
    "word": "language arts",
    "hint": "At School"
  },
  {
    "word": "laptop computer",
    "hint": "Everyday Objects"
  },
  {
    "word": "las vegas",
    "hint": "Places"
  },
  {
    "word": "lasagna",
    "hint": "Eat & Drink"
  },
  {
    "word": "laser lemon",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "laser tag",
    "hint": "Toys & Games"
  },
  {
    "word": "launch altitude",
    "hint": "Outer Space"
  },
  {
    "word": "laundry hamper",
    "hint": "Everyday Objects"
  },
  {
    "word": "lava field",
    "hint": "Nature"
  },
  {
    "word": "lavender",
    "hint": "Nature"
  },
  {
    "word": "lavender burst",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "lawn bowling",
    "hint": "All About Sports"
  },
  {
    "word": "lays chips",
    "hint": "Famous Brands"
  },
  {
    "word": "leafy greens",
    "hint": "Eat & Drink"
  },
  {
    "word": "leather jackets",
    "hint": "Fashion"
  },
  {
    "word": "lebanon",
    "hint": "Places"
  },
  {
    "word": "lecture hall",
    "hint": "At School"
  },
  {
    "word": "left fielder",
    "hint": "All About Sports"
  },
  {
    "word": "leif ericson",
    "hint": "History"
  },
  {
    "word": "lemon bars",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "lemon meringue",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "lemon pepper",
    "hint": "In The Kitchen"
  },
  {
    "word": "lemonade",
    "hint": "Eat & Drink"
  },
  {
    "word": "lentils",
    "hint": "Eat & Drink"
  },
  {
    "word": "leo tolstoy",
    "hint": "Famous People"
  },
  {
    "word": "leopard seal",
    "hint": "Animals"
  },
  {
    "word": "letter writing",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "lex luthor",
    "hint": "Fictional Characters"
  },
  {
    "word": "liaison",
    "hint": "Great Vocab Words"
  },
  {
    "word": "liberty bell",
    "hint": "History"
  },
  {
    "word": "license plate",
    "hint": "Cars"
  },
  {
    "word": "licorice",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "life jacket",
    "hint": "At The Beach"
  },
  {
    "word": "life raft",
    "hint": "Transportation"
  },
  {
    "word": "light rail",
    "hint": "Transportation"
  },
  {
    "word": "light switch",
    "hint": "Everyday Objects"
  },
  {
    "word": "lilac luster",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "lily pad",
    "hint": "Nature"
  },
  {
    "word": "lincoln memorial",
    "hint": "Places"
  },
  {
    "word": "lion den",
    "hint": "Nature"
  },
  {
    "word": "lion king",
    "hint": "Movies"
  },
  {
    "word": "lionel trains",
    "hint": "Toys & Games"
  },
  {
    "word": "liquid gold",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "lite brite",
    "hint": "Toys & Games"
  },
  {
    "word": "literary agent",
    "hint": "Occupations"
  },
  {
    "word": "little caesars",
    "hint": "Famous Brands"
  },
  {
    "word": "little women",
    "hint": "Books"
  },
  {
    "word": "living dead",
    "hint": "Oxymorons"
  },
  {
    "word": "lobster",
    "hint": "At The Beach"
  },
  {
    "word": "lobster bisque",
    "hint": "Eat & Drink"
  },
  {
    "word": "log cabin",
    "hint": "Places"
  },
  {
    "word": "logitech",
    "hint": "Famous Brands"
  },
  {
    "word": "lombardi field",
    "hint": "All About Sports"
  },
  {
    "word": "london",
    "hint": "Places"
  },
  {
    "word": "long island",
    "hint": "Places"
  },
  {
    "word": "lookout tower",
    "hint": "Places"
  },
  {
    "word": "looney tunes",
    "hint": "TV Shows"
  },
  {
    "word": "loosen up",
    "hint": "Phrases"
  },
  {
    "word": "los angeles",
    "hint": "Places"
  },
  {
    "word": "loss leader",
    "hint": "Oxymorons"
  },
  {
    "word": "lost cause",
    "hint": "Music & Song"
  },
  {
    "word": "loud whisper",
    "hint": "Oxymorons"
  },
  {
    "word": "louvre museum",
    "hint": "Places"
  },
  {
    "word": "love actually",
    "hint": "Movies"
  },
  {
    "word": "low beams",
    "hint": "Cars"
  },
  {
    "word": "lucky charms",
    "hint": "Famous Brands"
  },
  {
    "word": "lunar eclipse",
    "hint": "Outer Space"
  },
  {
    "word": "lunar landing",
    "hint": "Outer Space"
  },
  {
    "word": "luxury resort",
    "hint": "Places"
  },
  {
    "word": "lychee fruit",
    "hint": "Eat & Drink"
  },
  {
    "word": "mad hatter",
    "hint": "Fictional Characters"
  },
  {
    "word": "madden football",
    "hint": "Video Games"
  },
  {
    "word": "madeline",
    "hint": "Books"
  },
  {
    "word": "magenta",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "magenta fiesta",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "magic carpet",
    "hint": "Transportation"
  },
  {
    "word": "magic johnson",
    "hint": "Famous People"
  },
  {
    "word": "magic potion",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "magna doodle",
    "hint": "Toys & Games"
  },
  {
    "word": "magnetic alphabet",
    "hint": "Toys & Games"
  },
  {
    "word": "magnetic magenta",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "magneto",
    "hint": "Fictional Characters"
  },
  {
    "word": "magnolia tree",
    "hint": "Nature"
  },
  {
    "word": "mahatma gandhi",
    "hint": "Famous People"
  },
  {
    "word": "mailbox",
    "hint": "Everyday Objects"
  },
  {
    "word": "main street",
    "hint": "Places"
  },
  {
    "word": "makeover",
    "hint": "Fashion"
  },
  {
    "word": "malaysia",
    "hint": "Places"
  },
  {
    "word": "maltese",
    "hint": "Animals"
  },
  {
    "word": "mandarin duck",
    "hint": "Animals"
  },
  {
    "word": "mandarin oranges",
    "hint": "Eat & Drink"
  },
  {
    "word": "mango pudding",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "mango puree",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "mango tango",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "manifest destiny",
    "hint": "History"
  },
  {
    "word": "manitoba",
    "hint": "Places"
  },
  {
    "word": "maple tree",
    "hint": "Nature"
  },
  {
    "word": "marathon",
    "hint": "All About Sports"
  },
  {
    "word": "marco polo",
    "hint": "History"
  },
  {
    "word": "mardi gras",
    "hint": "Special Days"
  },
  {
    "word": "marge simpson",
    "hint": "Fictional Characters"
  },
  {
    "word": "margot robbie",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "marie curie",
    "hint": "Famous People"
  },
  {
    "word": "marilyn monroe",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "mario kart",
    "hint": "Video Games"
  },
  {
    "word": "maritime",
    "hint": "At The Beach"
  },
  {
    "word": "maritime museum",
    "hint": "Places"
  },
  {
    "word": "mark twain",
    "hint": "History"
  },
  {
    "word": "maroon mist",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "marriott",
    "hint": "Famous Brands"
  },
  {
    "word": "marshall islands",
    "hint": "Places"
  },
  {
    "word": "marshall plan",
    "hint": "History"
  },
  {
    "word": "martha stewart",
    "hint": "Famous People"
  },
  {
    "word": "martial arts",
    "hint": "All About Sports"
  },
  {
    "word": "martin freeman",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "mary poppins",
    "hint": "Fictional Characters"
  },
  {
    "word": "mashed potatoes",
    "hint": "Eat & Drink"
  },
  {
    "word": "mass effect",
    "hint": "Video Games"
  },
  {
    "word": "math teacher",
    "hint": "Occupations"
  },
  {
    "word": "maui sunset",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "mayo clinic",
    "hint": "Famous Brands"
  },
  {
    "word": "mean girls",
    "hint": "Movies"
  },
  {
    "word": "meatball",
    "hint": "Eat & Drink"
  },
  {
    "word": "mechanic",
    "hint": "Occupations"
  },
  {
    "word": "medical center",
    "hint": "Places"
  },
  {
    "word": "meerkat",
    "hint": "Animals"
  },
  {
    "word": "melting pot",
    "hint": "Figures of Speech"
  },
  {
    "word": "memorial day",
    "hint": "Special Days"
  },
  {
    "word": "memphis",
    "hint": "Places"
  },
  {
    "word": "mercury",
    "hint": "Outer Space"
  },
  {
    "word": "meringue",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "mermaid",
    "hint": "Myths & Legends"
  },
  {
    "word": "meryl streep",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "meteor",
    "hint": "Outer Space"
  },
  {
    "word": "mexico",
    "hint": "Places"
  },
  {
    "word": "miami beach",
    "hint": "Places"
  },
  {
    "word": "miami dolphins",
    "hint": "All About Sports"
  },
  {
    "word": "michael caine",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "michael douglas",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "michael jordan",
    "hint": "Famous People"
  },
  {
    "word": "michael phelps",
    "hint": "Famous People"
  },
  {
    "word": "michelin",
    "hint": "Famous Brands"
  },
  {
    "word": "mickey mouse",
    "hint": "Fictional Characters"
  },
  {
    "word": "middle ages",
    "hint": "History"
  },
  {
    "word": "midnight blue",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "midnight snack",
    "hint": "Everyday Life"
  },
  {
    "word": "mighty mouse",
    "hint": "Fictional Characters"
  },
  {
    "word": "mike trout",
    "hint": "Famous Athletes"
  },
  {
    "word": "miles morales",
    "hint": "Fictional Characters"
  },
  {
    "word": "miley cyrus",
    "hint": "Famous People"
  },
  {
    "word": "military officer",
    "hint": "Occupations"
  },
  {
    "word": "milk shake",
    "hint": "Eat & Drink"
  },
  {
    "word": "milkman",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "mince words",
    "hint": "Phrases"
  },
  {
    "word": "mindtrap",
    "hint": "Toys & Games"
  },
  {
    "word": "ming dynasty",
    "hint": "History"
  },
  {
    "word": "mini cooper",
    "hint": "Cars"
  },
  {
    "word": "minions",
    "hint": "Movies"
  },
  {
    "word": "minor league",
    "hint": "All About Sports"
  },
  {
    "word": "minor miracle",
    "hint": "Oxymorons"
  },
  {
    "word": "minute maid",
    "hint": "Famous Brands"
  },
  {
    "word": "missing link",
    "hint": "Movies"
  },
  {
    "word": "misty moss",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "mitigate",
    "hint": "Great Vocab Words"
  },
  {
    "word": "mobile home",
    "hint": "Oxymorons"
  },
  {
    "word": "modern history",
    "hint": "Oxymorons"
  },
  {
    "word": "molten rock",
    "hint": "Nature"
  },
  {
    "word": "money maker",
    "hint": "Phrases"
  },
  {
    "word": "mongoose",
    "hint": "Animals"
  },
  {
    "word": "monkey bars",
    "hint": "Toys & Games"
  },
  {
    "word": "monkey island",
    "hint": "Video Games"
  },
  {
    "word": "monopoly",
    "hint": "Toys & Games"
  },
  {
    "word": "monorail",
    "hint": "Transportation"
  },
  {
    "word": "monster mash",
    "hint": "Halloween"
  },
  {
    "word": "montana",
    "hint": "Places"
  },
  {
    "word": "monterey jack",
    "hint": "Eat & Drink"
  },
  {
    "word": "monument valley",
    "hint": "Video Games"
  },
  {
    "word": "moon rabbit",
    "hint": "Myths & Legends"
  },
  {
    "word": "moonlit pond",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "moral compass",
    "hint": "Figures of Speech"
  },
  {
    "word": "morgan freeman",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "morgan stanley",
    "hint": "Famous Brands"
  },
  {
    "word": "morning glory",
    "hint": "Nature"
  },
  {
    "word": "morning workout",
    "hint": "Everyday Life"
  },
  {
    "word": "morse code",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "mother goose",
    "hint": "Fictional Characters"
  },
  {
    "word": "mother teresa",
    "hint": "Famous People"
  },
  {
    "word": "motorola",
    "hint": "Famous Brands"
  },
  {
    "word": "mount everest",
    "hint": "Places"
  },
  {
    "word": "mount olympus",
    "hint": "Myths & Legends"
  },
  {
    "word": "mount vernon",
    "hint": "Places"
  },
  {
    "word": "mount vesuvius",
    "hint": "History"
  },
  {
    "word": "mountain biking",
    "hint": "All About Sports"
  },
  {
    "word": "mountain dew",
    "hint": "Famous Brands"
  },
  {
    "word": "mountain gorilla",
    "hint": "Animals"
  },
  {
    "word": "mountain lion",
    "hint": "Animals"
  },
  {
    "word": "mountain pass",
    "hint": "Places"
  },
  {
    "word": "mountain peak",
    "hint": "Nature"
  },
  {
    "word": "mouse trap",
    "hint": "Toys & Games"
  },
  {
    "word": "movie producer",
    "hint": "Occupations"
  },
  {
    "word": "movie studio",
    "hint": "Places"
  },
  {
    "word": "mudslide",
    "hint": "Nature"
  },
  {
    "word": "muhammad ali",
    "hint": "Famous People"
  },
  {
    "word": "muscle car",
    "hint": "Transportation"
  },
  {
    "word": "muscles",
    "hint": "Anatomy"
  },
  {
    "word": "musical chairs",
    "hint": "Toys & Games"
  },
  {
    "word": "muskrat",
    "hint": "Animals"
  },
  {
    "word": "mustard",
    "hint": "Eat & Drink"
  },
  {
    "word": "mystic maroon",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "nail file",
    "hint": "Everyday Objects"
  },
  {
    "word": "nail spa",
    "hint": "Places"
  },
  {
    "word": "nancy drew",
    "hint": "Fictional Characters"
  },
  {
    "word": "napoleon dynamite",
    "hint": "Movies"
  },
  {
    "word": "naruto",
    "hint": "Fictional Characters"
  },
  {
    "word": "natural makeup",
    "hint": "Oxymorons"
  },
  {
    "word": "nebraska",
    "hint": "Places"
  },
  {
    "word": "neck tie",
    "hint": "Everyday Objects"
  },
  {
    "word": "negative growth",
    "hint": "Oxymorons"
  },
  {
    "word": "nelson mandela",
    "hint": "Famous People"
  },
  {
    "word": "nerf ball",
    "hint": "Toys & Games"
  },
  {
    "word": "nerf blaster",
    "hint": "Toys & Games"
  },
  {
    "word": "nestle crunch",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "neutron star",
    "hint": "Outer Space"
  },
  {
    "word": "new balance",
    "hint": "Famous Brands"
  },
  {
    "word": "new delhi",
    "hint": "Places"
  },
  {
    "word": "new jersey",
    "hint": "Places"
  },
  {
    "word": "new orleans",
    "hint": "Places"
  },
  {
    "word": "new zealand",
    "hint": "Places"
  },
  {
    "word": "news anchor",
    "hint": "Occupations"
  },
  {
    "word": "niagara falls",
    "hint": "Places"
  },
  {
    "word": "niels bohr",
    "hint": "Famous People"
  },
  {
    "word": "night light",
    "hint": "Rhyme Time"
  },
  {
    "word": "night sky",
    "hint": "Nature"
  },
  {
    "word": "nikola tesla",
    "hint": "Famous People"
  },
  {
    "word": "nile river",
    "hint": "Places"
  },
  {
    "word": "ninja turtles",
    "hint": "Fictional Characters"
  },
  {
    "word": "nintendo",
    "hint": "Famous Brands"
  },
  {
    "word": "nissan sentra",
    "hint": "Cars"
  },
  {
    "word": "nonstick pan",
    "hint": "In The Kitchen"
  },
  {
    "word": "norman conquest",
    "hint": "History"
  },
  {
    "word": "norman rockwell",
    "hint": "Famous People"
  },
  {
    "word": "normandy invasion",
    "hint": "History"
  },
  {
    "word": "north america",
    "hint": "Places"
  },
  {
    "word": "north carolina",
    "hint": "Places"
  },
  {
    "word": "north pole",
    "hint": "Places"
  },
  {
    "word": "north star",
    "hint": "Outer Space"
  },
  {
    "word": "notebook paper",
    "hint": "At School"
  },
  {
    "word": "novelist",
    "hint": "Occupations"
  },
  {
    "word": "numb feeling",
    "hint": "Oxymorons"
  },
  {
    "word": "nurses run",
    "hint": "Palindromes"
  },
  {
    "word": "nut brittle",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "oatmeal cookie",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "obsidian",
    "hint": "Body & Health"
  },
  {
    "word": "obstacle course",
    "hint": "All About Sports"
  },
  {
    "word": "ocean current",
    "hint": "At The Beach"
  },
  {
    "word": "ocean foam",
    "hint": "At The Beach"
  },
  {
    "word": "ocean view",
    "hint": "At The Beach"
  },
  {
    "word": "octopus",
    "hint": "Animals"
  },
  {
    "word": "odometer",
    "hint": "Cars"
  },
  {
    "word": "odysseus",
    "hint": "Myths & Legends"
  },
  {
    "word": "off sides",
    "hint": "All About Sports"
  },
  {
    "word": "office chair",
    "hint": "Everyday Objects"
  },
  {
    "word": "oil field",
    "hint": "Places"
  },
  {
    "word": "oil lamps",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "oil tanker",
    "hint": "Transportation"
  },
  {
    "word": "oklahoma city",
    "hint": "Places"
  },
  {
    "word": "old maid",
    "hint": "Toys & Games"
  },
  {
    "word": "old news",
    "hint": "Oxymorons"
  },
  {
    "word": "olive garden",
    "hint": "Famous Brands"
  },
  {
    "word": "oliver twist",
    "hint": "Fictional Characters"
  },
  {
    "word": "olympic diving",
    "hint": "All About Sports"
  },
  {
    "word": "olympic games",
    "hint": "All About Sports"
  },
  {
    "word": "onion rings",
    "hint": "Eat & Drink"
  },
  {
    "word": "onion salt",
    "hint": "In The Kitchen"
  },
  {
    "word": "onside kick",
    "hint": "All About Sports"
  },
  {
    "word": "ontario",
    "hint": "Places"
  },
  {
    "word": "open season",
    "hint": "Movies"
  },
  {
    "word": "open secret",
    "hint": "Oxymorons"
  },
  {
    "word": "opposite day",
    "hint": "Special Days"
  },
  {
    "word": "optimus prime",
    "hint": "Fictional Characters"
  },
  {
    "word": "orange county",
    "hint": "Places"
  },
  {
    "word": "orange peel",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "orange soda",
    "hint": "Eat & Drink"
  },
  {
    "word": "oregano",
    "hint": "Eat & Drink"
  },
  {
    "word": "oregon",
    "hint": "Places"
  },
  {
    "word": "oreo cookie",
    "hint": "Famous Brands"
  },
  {
    "word": "orlando pride",
    "hint": "All About Sports"
  },
  {
    "word": "orson welles",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "oscar mayer",
    "hint": "Famous Brands"
  },
  {
    "word": "oscar wilde",
    "hint": "Famous People"
  },
  {
    "word": "outboard motor",
    "hint": "Transportation"
  },
  {
    "word": "outdoor grill",
    "hint": "In The Kitchen"
  },
  {
    "word": "Outer Space",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "oven mitts",
    "hint": "In The Kitchen"
  },
  {
    "word": "pablo picasso",
    "hint": "Famous People"
  },
  {
    "word": "pacific ocean",
    "hint": "Places"
  },
  {
    "word": "pack rat",
    "hint": "Animals"
  },
  {
    "word": "paddle boarding",
    "hint": "All About Sports"
  },
  {
    "word": "pair skating",
    "hint": "All About Sports"
  },
  {
    "word": "palm springs",
    "hint": "Places"
  },
  {
    "word": "palm sunday",
    "hint": "Special Days"
  },
  {
    "word": "palm trees",
    "hint": "At The Beach"
  },
  {
    "word": "pancake",
    "hint": "Eat & Drink"
  },
  {
    "word": "pancakes",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "pandora",
    "hint": "Famous Brands"
  },
  {
    "word": "paper airplane",
    "hint": "Toys & Games"
  },
  {
    "word": "paper cups",
    "hint": "Everyday Objects"
  },
  {
    "word": "paper maps",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "paper route",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "paper towel",
    "hint": "Everyday Objects"
  },
  {
    "word": "parallel bar",
    "hint": "All About Sports"
  },
  {
    "word": "paring knife",
    "hint": "In The Kitchen"
  },
  {
    "word": "park ranger",
    "hint": "Occupations"
  },
  {
    "word": "parking lot",
    "hint": "Places"
  },
  {
    "word": "parmesan cheese",
    "hint": "Eat & Drink"
  },
  {
    "word": "parsnip",
    "hint": "Eat & Drink"
  },
  {
    "word": "partial eclipse",
    "hint": "Outer Space"
  },
  {
    "word": "parties",
    "hint": "Halloween"
  },
  {
    "word": "passover",
    "hint": "Special Days"
  },
  {
    "word": "pastrami sandwich",
    "hint": "Eat & Drink"
  },
  {
    "word": "patrick mahomes",
    "hint": "Famous Athletes"
  },
  {
    "word": "patrick star",
    "hint": "Fictional Characters"
  },
  {
    "word": "paul bettany",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "paul george",
    "hint": "Famous Athletes"
  },
  {
    "word": "paw patrol",
    "hint": "TV Shows"
  },
  {
    "word": "pay phone",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "peanut brittle",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "pearl earrings",
    "hint": "Fashion"
  },
  {
    "word": "pearl harbor",
    "hint": "History"
  },
  {
    "word": "peculiar",
    "hint": "Great Vocab Words"
  },
  {
    "word": "pedal boat",
    "hint": "Transportation"
  },
  {
    "word": "pegasus",
    "hint": "Myths & Legends"
  },
  {
    "word": "penalty area",
    "hint": "All About Sports"
  },
  {
    "word": "penalty kick",
    "hint": "All About Sports"
  },
  {
    "word": "pep rally",
    "hint": "At School"
  },
  {
    "word": "peppa pig",
    "hint": "Fictional Characters"
  },
  {
    "word": "percy jackson",
    "hint": "Fictional Characters"
  },
  {
    "word": "pericles",
    "hint": "History"
  },
  {
    "word": "persian gulf",
    "hint": "Places"
  },
  {
    "word": "persian war",
    "hint": "History"
  },
  {
    "word": "personal foul",
    "hint": "All About Sports"
  },
  {
    "word": "pet rock",
    "hint": "Toys & Games"
  },
  {
    "word": "peter pan",
    "hint": "Fictional Characters"
  },
  {
    "word": "peter rabbit",
    "hint": "Fictional Characters"
  },
  {
    "word": "petri dish",
    "hint": "Science"
  },
  {
    "word": "petunia",
    "hint": "Nature"
  },
  {
    "word": "peyton manning",
    "hint": "Famous Athletes"
  },
  {
    "word": "phoenix mercury",
    "hint": "All About Sports"
  },
  {
    "word": "phoenix suns",
    "hint": "All About Sports"
  },
  {
    "word": "phoney baloney",
    "hint": "Rhyme Time"
  },
  {
    "word": "pickup truck",
    "hint": "Cars"
  },
  {
    "word": "picnic basket",
    "hint": "Everyday Objects"
  },
  {
    "word": "pikachu",
    "hint": "Fictional Characters"
  },
  {
    "word": "pinball arcade",
    "hint": "Toys & Games"
  },
  {
    "word": "pink flamingo",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "pink luster",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "pink panther",
    "hint": "Fictional Characters"
  },
  {
    "word": "pinto beans",
    "hint": "Eat & Drink"
  },
  {
    "word": "pipe dream",
    "hint": "Phrases"
  },
  {
    "word": "pixie dust",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "pizza hut",
    "hint": "Famous Brands"
  },
  {
    "word": "pizza palace",
    "hint": "Places"
  },
  {
    "word": "plain jane",
    "hint": "Rhyme Time"
  },
  {
    "word": "planet",
    "hint": "Outer Space"
  },
  {
    "word": "plankton",
    "hint": "Nature"
  },
  {
    "word": "plant nursery",
    "hint": "Places"
  },
  {
    "word": "plastic glasses",
    "hint": "Oxymorons"
  },
  {
    "word": "playing cards",
    "hint": "Toys & Games"
  },
  {
    "word": "playing possum",
    "hint": "Figures of Speech"
  },
  {
    "word": "plymouth colony",
    "hint": "History"
  },
  {
    "word": "plymouth rock",
    "hint": "History"
  },
  {
    "word": "pocket watch",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "pogo stick",
    "hint": "Toys & Games"
  },
  {
    "word": "poison ivy",
    "hint": "Nature"
  },
  {
    "word": "pokemon go",
    "hint": "Video Games"
  },
  {
    "word": "polar fleece",
    "hint": "Fashion"
  },
  {
    "word": "pole position",
    "hint": "All About Sports"
  },
  {
    "word": "pole vault",
    "hint": "All About Sports"
  },
  {
    "word": "police car",
    "hint": "Cars"
  },
  {
    "word": "police officer",
    "hint": "Occupations"
  },
  {
    "word": "polished pine",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "polly pocket",
    "hint": "Toys & Games"
  },
  {
    "word": "pony express",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "pool table",
    "hint": "All About Sports"
  },
  {
    "word": "pop music",
    "hint": "Music & Song"
  },
  {
    "word": "popsicle",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "popsicle stick",
    "hint": "Everyday Objects"
  },
  {
    "word": "porsche",
    "hint": "Famous Brands"
  },
  {
    "word": "porsche boxster",
    "hint": "Cars"
  },
  {
    "word": "poseidon",
    "hint": "Myths & Legends"
  },
  {
    "word": "post office",
    "hint": "Places"
  },
  {
    "word": "potato chips",
    "hint": "Eat & Drink"
  },
  {
    "word": "potato peeler",
    "hint": "In The Kitchen"
  },
  {
    "word": "potato salad",
    "hint": "Eat & Drink"
  },
  {
    "word": "pottery barn",
    "hint": "Famous Brands"
  },
  {
    "word": "pound cake",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "power boat",
    "hint": "Transportation"
  },
  {
    "word": "power plant",
    "hint": "Places"
  },
  {
    "word": "power steering",
    "hint": "Cars"
  },
  {
    "word": "prairie dress",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "praline",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "pretty ugly",
    "hint": "Oxymorons"
  },
  {
    "word": "pretzel",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "prime time",
    "hint": "Rhyme Time"
  },
  {
    "word": "primrose",
    "hint": "Nature"
  },
  {
    "word": "princess diana",
    "hint": "Famous People"
  },
  {
    "word": "princess fiona",
    "hint": "Fictional Characters"
  },
  {
    "word": "princess peach",
    "hint": "Video Games"
  },
  {
    "word": "printing press",
    "hint": "History"
  },
  {
    "word": "private jet",
    "hint": "Transportation"
  },
  {
    "word": "project runway",
    "hint": "Fashion"
  },
  {
    "word": "prop plane",
    "hint": "Transportation"
  },
  {
    "word": "pudding",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "puerto rico",
    "hint": "Places"
  },
  {
    "word": "pumpkin",
    "hint": "Halloween"
  },
  {
    "word": "pumpkin seeds",
    "hint": "Halloween"
  },
  {
    "word": "pumpkin spice",
    "hint": "In The Kitchen"
  },
  {
    "word": "puritans",
    "hint": "History"
  },
  {
    "word": "purple rain",
    "hint": "Music & Song"
  },
  {
    "word": "quarter moon",
    "hint": "Outer Space"
  },
  {
    "word": "queen latifah",
    "hint": "Famous People"
  },
  {
    "word": "quiet rage",
    "hint": "Oxymorons"
  },
  {
    "word": "quiet roar",
    "hint": "Oxymorons"
  },
  {
    "word": "radical red",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "radio dramas",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "radio host",
    "hint": "Occupations"
  },
  {
    "word": "radio station",
    "hint": "Places"
  },
  {
    "word": "rafael nadal",
    "hint": "Famous Athletes"
  },
  {
    "word": "railroad pass",
    "hint": "Places"
  },
  {
    "word": "railroad tracks",
    "hint": "Transportation"
  },
  {
    "word": "railway platform",
    "hint": "Places"
  },
  {
    "word": "rainbow",
    "hint": "Nature"
  },
  {
    "word": "rainbow trout",
    "hint": "Animals"
  },
  {
    "word": "raisin bread",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "raleigh",
    "hint": "Places"
  },
  {
    "word": "ramen noodles",
    "hint": "Eat & Drink"
  },
  {
    "word": "ranch dressing",
    "hint": "Eat & Drink"
  },
  {
    "word": "ranger station",
    "hint": "Places"
  },
  {
    "word": "rapping",
    "hint": "Music & Song"
  },
  {
    "word": "rearview mirror",
    "hint": "Cars"
  },
  {
    "word": "rebound",
    "hint": "All About Sports"
  },
  {
    "word": "recliner chair",
    "hint": "Everyday Objects"
  },
  {
    "word": "recorded live",
    "hint": "Oxymorons"
  },
  {
    "word": "red bull",
    "hint": "Famous Brands"
  },
  {
    "word": "red dwarf",
    "hint": "Outer Space"
  },
  {
    "word": "red giant",
    "hint": "Outer Space"
  },
  {
    "word": "red panda",
    "hint": "Animals"
  },
  {
    "word": "red squirrel",
    "hint": "Animals"
  },
  {
    "word": "redwood tree",
    "hint": "Nature"
  },
  {
    "word": "regular specials",
    "hint": "Oxymorons"
  },
  {
    "word": "reindeer",
    "hint": "Animals"
  },
  {
    "word": "remote control",
    "hint": "Everyday Objects"
  },
  {
    "word": "report card",
    "hint": "At School"
  },
  {
    "word": "resident alien",
    "hint": "Oxymorons"
  },
  {
    "word": "resort hotel",
    "hint": "At The Beach"
  },
  {
    "word": "retinas",
    "hint": "Anatomy"
  },
  {
    "word": "rhode island",
    "hint": "Places"
  },
  {
    "word": "rhubarb pie",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "rice pudding",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "richard nixon",
    "hint": "Famous People"
  },
  {
    "word": "richmond",
    "hint": "Places"
  },
  {
    "word": "right fielder",
    "hint": "All About Sports"
  },
  {
    "word": "ringside",
    "hint": "All About Sports"
  },
  {
    "word": "rip tide",
    "hint": "At The Beach"
  },
  {
    "word": "rite aid",
    "hint": "Famous Brands"
  },
  {
    "word": "road runner",
    "hint": "Fictional Characters"
  },
  {
    "word": "roadside diner",
    "hint": "Places"
  },
  {
    "word": "roaring twenties",
    "hint": "History"
  },
  {
    "word": "roast beef",
    "hint": "Eat & Drink"
  },
  {
    "word": "roasting pan",
    "hint": "In The Kitchen"
  },
  {
    "word": "robert frost",
    "hint": "Famous People"
  },
  {
    "word": "roblox",
    "hint": "Video Games"
  },
  {
    "word": "rock band",
    "hint": "Video Games"
  },
  {
    "word": "rock climbing",
    "hint": "All About Sports"
  },
  {
    "word": "rock star",
    "hint": "Occupations"
  },
  {
    "word": "rocket launch",
    "hint": "Outer Space"
  },
  {
    "word": "rocking horse",
    "hint": "Toys & Games"
  },
  {
    "word": "roger rabbit",
    "hint": "Fictional Characters"
  },
  {
    "word": "roll cage",
    "hint": "Cars"
  },
  {
    "word": "rolling stop",
    "hint": "Oxymorons"
  },
  {
    "word": "rolls royce",
    "hint": "Famous Brands"
  },
  {
    "word": "roman emperors",
    "hint": "History"
  },
  {
    "word": "roman empire",
    "hint": "History"
  },
  {
    "word": "romania",
    "hint": "Places"
  },
  {
    "word": "romantic era",
    "hint": "History"
  },
  {
    "word": "ron weasley",
    "hint": "Fictional Characters"
  },
  {
    "word": "ronald reagan",
    "hint": "Famous People"
  },
  {
    "word": "root beer",
    "hint": "Eat & Drink"
  },
  {
    "word": "rose byrne",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "rose dust",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "rose parade",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "rose petal",
    "hint": "Nature"
  },
  {
    "word": "rosemary",
    "hint": "Eat & Drink"
  },
  {
    "word": "rosetta stone",
    "hint": "Famous Things"
  },
  {
    "word": "rotary phone",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "rubeus hagrid",
    "hint": "Fictional Characters"
  },
  {
    "word": "rubiks cube",
    "hint": "Toys & Games"
  },
  {
    "word": "runabout",
    "hint": "Transportation"
  },
  {
    "word": "running back",
    "hint": "All About Sports"
  },
  {
    "word": "rusty red",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "ryan reynolds",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "saffron rice",
    "hint": "Eat & Drink"
  },
  {
    "word": "sahara desert",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "saint paul",
    "hint": "Places"
  },
  {
    "word": "salad spinner",
    "hint": "In The Kitchen"
  },
  {
    "word": "sally carrera",
    "hint": "Fictional Characters"
  },
  {
    "word": "salt water",
    "hint": "At The Beach"
  },
  {
    "word": "salvador dali",
    "hint": "Famous People"
  },
  {
    "word": "samuel morse",
    "hint": "History"
  },
  {
    "word": "samurai",
    "hint": "History"
  },
  {
    "word": "san diego",
    "hint": "Places"
  },
  {
    "word": "sand dollar",
    "hint": "At The Beach"
  },
  {
    "word": "sand dune",
    "hint": "At The Beach"
  },
  {
    "word": "sandbar",
    "hint": "At The Beach"
  },
  {
    "word": "sandbox",
    "hint": "Toys & Games"
  },
  {
    "word": "sandy cheeks",
    "hint": "Fictional Characters"
  },
  {
    "word": "santa barbara",
    "hint": "Places"
  },
  {
    "word": "sante fe",
    "hint": "Places"
  },
  {
    "word": "sapphire",
    "hint": "Gems, Rocks & Crystals"
  },
  {
    "word": "sausage links",
    "hint": "Eat & Drink"
  },
  {
    "word": "savannah",
    "hint": "Nature"
  },
  {
    "word": "scallion",
    "hint": "Eat & Drink"
  },
  {
    "word": "scary stories",
    "hint": "Halloween"
  },
  {
    "word": "school bus",
    "hint": "Transportation"
  },
  {
    "word": "science fiction",
    "hint": "Oxymorons"
  },
  {
    "word": "science lab",
    "hint": "At School"
  },
  {
    "word": "scooby doo",
    "hint": "Fictional Characters"
  },
  {
    "word": "scotch tape",
    "hint": "At School"
  },
  {
    "word": "scrabble",
    "hint": "Toys & Games"
  },
  {
    "word": "scrutiny",
    "hint": "Great Vocab Words"
  },
  {
    "word": "scuba diving",
    "hint": "All About Sports"
  },
  {
    "word": "sea green",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "sea gull",
    "hint": "Animals"
  },
  {
    "word": "sea otter",
    "hint": "Animals"
  },
  {
    "word": "sea serpent",
    "hint": "Myths & Legends"
  },
  {
    "word": "sea urchin",
    "hint": "Animals"
  },
  {
    "word": "seafloor",
    "hint": "At The Beach"
  },
  {
    "word": "seahorse",
    "hint": "Animals"
  },
  {
    "word": "seashell",
    "hint": "At The Beach"
  },
  {
    "word": "seaside resort",
    "hint": "Places"
  },
  {
    "word": "seasonal fruit",
    "hint": "Eat & Drink"
  },
  {
    "word": "seasoned fries",
    "hint": "Eat & Drink"
  },
  {
    "word": "seat covers",
    "hint": "Cars"
  },
  {
    "word": "seattle storm",
    "hint": "All About Sports"
  },
  {
    "word": "seaweed salad",
    "hint": "Eat & Drink"
  },
  {
    "word": "security guard",
    "hint": "Occupations"
  },
  {
    "word": "seedling",
    "hint": "Nature"
  },
  {
    "word": "seismic activity",
    "hint": "Nature"
  },
  {
    "word": "selena gomez",
    "hint": "Famous People"
  },
  {
    "word": "senegal",
    "hint": "Places"
  },
  {
    "word": "senorita",
    "hint": "Music & Song"
  },
  {
    "word": "serena williams",
    "hint": "Famous People"
  },
  {
    "word": "serving platters",
    "hint": "In The Kitchen"
  },
  {
    "word": "serving spoons",
    "hint": "In The Kitchen"
  },
  {
    "word": "sesame street",
    "hint": "TV Shows"
  },
  {
    "word": "seven dwarfs",
    "hint": "Fictional Characters"
  },
  {
    "word": "sewing machine",
    "hint": "Fashion"
  },
  {
    "word": "shakira",
    "hint": "Famous People"
  },
  {
    "word": "shallots",
    "hint": "In The Kitchen"
  },
  {
    "word": "shania twain",
    "hint": "Famous People"
  },
  {
    "word": "shark tale",
    "hint": "Movies"
  },
  {
    "word": "shaun white",
    "hint": "Famous Athletes"
  },
  {
    "word": "shaved ice",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "sheldon cooper",
    "hint": "Fictional Characters"
  },
  {
    "word": "sheraton",
    "hint": "Famous Brands"
  },
  {
    "word": "sheriff",
    "hint": "Occupations"
  },
  {
    "word": "sherlock",
    "hint": "TV Shows"
  },
  {
    "word": "shock absorber",
    "hint": "Cars"
  },
  {
    "word": "shoe shine",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "shoe store",
    "hint": "Places"
  },
  {
    "word": "shopping cart",
    "hint": "Everyday Objects"
  },
  {
    "word": "shopping center",
    "hint": "Places"
  },
  {
    "word": "shoulder blade",
    "hint": "Anatomy"
  },
  {
    "word": "shout out",
    "hint": "Rhyme Time"
  },
  {
    "word": "shredded cheddar",
    "hint": "Eat & Drink"
  },
  {
    "word": "shuttle bus",
    "hint": "Transportation"
  },
  {
    "word": "siamese cat",
    "hint": "Animals"
  },
  {
    "word": "siberian husky",
    "hint": "Animals"
  },
  {
    "word": "siberian tiger",
    "hint": "Animals"
  },
  {
    "word": "sidewalk surfer",
    "hint": "All About Sports"
  },
  {
    "word": "sidney crosby",
    "hint": "Famous Athletes"
  },
  {
    "word": "sigmund freud",
    "hint": "Famous People"
  },
  {
    "word": "silent alarm",
    "hint": "Oxymorons"
  },
  {
    "word": "silent scream",
    "hint": "Oxymorons"
  },
  {
    "word": "silkworm",
    "hint": "Animals"
  },
  {
    "word": "silly putty",
    "hint": "Toys & Games"
  },
  {
    "word": "silver fox",
    "hint": "Animals"
  },
  {
    "word": "silver medal",
    "hint": "All About Sports"
  },
  {
    "word": "silver surfer",
    "hint": "Fictional Characters"
  },
  {
    "word": "simmer down",
    "hint": "Figures of Speech"
  },
  {
    "word": "simon says",
    "hint": "Toys & Games"
  },
  {
    "word": "single ladies",
    "hint": "Music & Song"
  },
  {
    "word": "singular choice",
    "hint": "Oxymorons"
  },
  {
    "word": "sirloin steak",
    "hint": "Eat & Drink"
  },
  {
    "word": "sistine chapel",
    "hint": "Places"
  },
  {
    "word": "sixth sense",
    "hint": "Movies"
  },
  {
    "word": "skate park",
    "hint": "Places"
  },
  {
    "word": "skeleton",
    "hint": "Halloween"
  },
  {
    "word": "ski lift",
    "hint": "All About Sports"
  },
  {
    "word": "ski slope",
    "hint": "All About Sports"
  },
  {
    "word": "skipping rocks",
    "hint": "At The Beach"
  },
  {
    "word": "slam dunk",
    "hint": "All About Sports"
  },
  {
    "word": "slapshot",
    "hint": "All About Sports"
  },
  {
    "word": "sleeper shark",
    "hint": "Animals"
  },
  {
    "word": "slimy green",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "sloppy joe",
    "hint": "Eat & Drink"
  },
  {
    "word": "slumber party",
    "hint": "Oxymorons"
  },
  {
    "word": "smoke detector",
    "hint": "Everyday Objects"
  },
  {
    "word": "smoking gun",
    "hint": "Figures of Speech"
  },
  {
    "word": "snack pack",
    "hint": "Rhyme Time"
  },
  {
    "word": "snail mail",
    "hint": "Rhyme Time"
  },
  {
    "word": "snake river",
    "hint": "Places"
  },
  {
    "word": "snapping turtle",
    "hint": "Animals"
  },
  {
    "word": "snow cat",
    "hint": "Transportation"
  },
  {
    "word": "snow cone",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "snow flurry",
    "hint": "Nature"
  },
  {
    "word": "snow globe",
    "hint": "Everyday Objects"
  },
  {
    "word": "snow leopard",
    "hint": "Animals"
  },
  {
    "word": "snow white",
    "hint": "Fictional Characters"
  },
  {
    "word": "snowball fight",
    "hint": "Toys & Games"
  },
  {
    "word": "snowline",
    "hint": "Nature"
  },
  {
    "word": "snowmelt",
    "hint": "Nature"
  },
  {
    "word": "snowy owl",
    "hint": "Animals"
  },
  {
    "word": "soccer field",
    "hint": "All About Sports"
  },
  {
    "word": "soccer referee",
    "hint": "All About Sports"
  },
  {
    "word": "social studies",
    "hint": "At School"
  },
  {
    "word": "social worker",
    "hint": "Occupations"
  },
  {
    "word": "socrates",
    "hint": "History"
  },
  {
    "word": "soda bread",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "soft serve",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "softball",
    "hint": "All About Sports"
  },
  {
    "word": "solar energy",
    "hint": "Nature"
  },
  {
    "word": "solar system",
    "hint": "Outer Space"
  },
  {
    "word": "solar wind",
    "hint": "Outer Space"
  },
  {
    "word": "somalia",
    "hint": "Places"
  },
  {
    "word": "sonic silver",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "sony pictures",
    "hint": "Famous Brands"
  },
  {
    "word": "sorcery",
    "hint": "Halloween"
  },
  {
    "word": "souffle",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "soup ladle",
    "hint": "In The Kitchen"
  },
  {
    "word": "south africa",
    "hint": "Places"
  },
  {
    "word": "south korea",
    "hint": "Places"
  },
  {
    "word": "south pole",
    "hint": "Places"
  },
  {
    "word": "southern ocean",
    "hint": "Places"
  },
  {
    "word": "soy beans",
    "hint": "Eat & Drink"
  },
  {
    "word": "space jam",
    "hint": "Movies"
  },
  {
    "word": "space needle",
    "hint": "Places"
  },
  {
    "word": "space station",
    "hint": "Outer Space"
  },
  {
    "word": "spanish flu",
    "hint": "History"
  },
  {
    "word": "spare tire",
    "hint": "Cars"
  },
  {
    "word": "spectrum",
    "hint": "Outer Space"
  },
  {
    "word": "speed skating",
    "hint": "All About Sports"
  },
  {
    "word": "spice rack",
    "hint": "In The Kitchen"
  },
  {
    "word": "spider man",
    "hint": "Fictional Characters"
  },
  {
    "word": "spider web",
    "hint": "Halloween"
  },
  {
    "word": "spinal cord",
    "hint": "Anatomy"
  },
  {
    "word": "spinning wheel",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "spirited away",
    "hint": "Movies"
  },
  {
    "word": "splinter cell",
    "hint": "Video Games"
  },
  {
    "word": "spoilers",
    "hint": "Cars"
  },
  {
    "word": "sponge cake",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "sport clips",
    "hint": "Famous Brands"
  },
  {
    "word": "sports arena",
    "hint": "Places"
  },
  {
    "word": "spray bottle",
    "hint": "Everyday Objects"
  },
  {
    "word": "sprig console",
    "hint": "Toys & Games"
  },
  {
    "word": "spring carnival",
    "hint": "Places"
  },
  {
    "word": "spring equinox",
    "hint": "Special Days"
  },
  {
    "word": "spruce goose",
    "hint": "Rhyme Time"
  },
  {
    "word": "spumoni",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "square off",
    "hint": "All About Sports"
  },
  {
    "word": "stadium",
    "hint": "All About Sports"
  },
  {
    "word": "stan lee",
    "hint": "Famous People"
  },
  {
    "word": "star anise",
    "hint": "In The Kitchen"
  },
  {
    "word": "star cluster",
    "hint": "Outer Space"
  },
  {
    "word": "star gazing",
    "hint": "Outer Space"
  },
  {
    "word": "star trek",
    "hint": "Movies"
  },
  {
    "word": "stardew valley",
    "hint": "Video Games"
  },
  {
    "word": "starfish",
    "hint": "At The Beach"
  },
  {
    "word": "starting lineup",
    "hint": "All About Sports"
  },
  {
    "word": "state farm",
    "hint": "Famous Brands"
  },
  {
    "word": "static shock",
    "hint": "Fictional Characters"
  },
  {
    "word": "stay positive",
    "hint": "Phrases"
  },
  {
    "word": "steak knife",
    "hint": "In The Kitchen"
  },
  {
    "word": "steel blue",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "steer clear",
    "hint": "Rhyme Time"
  },
  {
    "word": "steering wheel",
    "hint": "Cars"
  },
  {
    "word": "stephen curry",
    "hint": "Famous Athletes"
  },
  {
    "word": "stephen king",
    "hint": "Famous People"
  },
  {
    "word": "steve irwin",
    "hint": "Famous People"
  },
  {
    "word": "steve jobs",
    "hint": "Famous People"
  },
  {
    "word": "steve martin",
    "hint": "Famous People"
  },
  {
    "word": "steven universe",
    "hint": "Fictional Characters"
  },
  {
    "word": "stick bug",
    "hint": "Animals"
  },
  {
    "word": "stick horse",
    "hint": "Transportation"
  },
  {
    "word": "stingray",
    "hint": "Animals"
  },
  {
    "word": "stirring spoon",
    "hint": "In The Kitchen"
  },
  {
    "word": "stone age",
    "hint": "History"
  },
  {
    "word": "stovetop",
    "hint": "In The Kitchen"
  },
  {
    "word": "stranger things",
    "hint": "TV Shows"
  },
  {
    "word": "street fighter",
    "hint": "Video Games"
  },
  {
    "word": "street skating",
    "hint": "All About Sports"
  },
  {
    "word": "street sweepers",
    "hint": "One Vowel"
  },
  {
    "word": "string theory",
    "hint": "Science"
  },
  {
    "word": "stroller",
    "hint": "Transportation"
  },
  {
    "word": "study hall",
    "hint": "At School"
  },
  {
    "word": "stuffed animals",
    "hint": "Toys & Games"
  },
  {
    "word": "subaru forester",
    "hint": "Cars"
  },
  {
    "word": "subaru outback",
    "hint": "Cars"
  },
  {
    "word": "subway operator",
    "hint": "Occupations"
  },
  {
    "word": "subway station",
    "hint": "Places"
  },
  {
    "word": "sucker fish",
    "hint": "Animals"
  },
  {
    "word": "sudoku",
    "hint": "Toys & Games"
  },
  {
    "word": "sugar plum",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "sumatra",
    "hint": "Places"
  },
  {
    "word": "sumatran tiger",
    "hint": "Animals"
  },
  {
    "word": "summer dress",
    "hint": "Fashion"
  },
  {
    "word": "summer solstice",
    "hint": "Special Days"
  },
  {
    "word": "sumo wrestler",
    "hint": "Occupations"
  },
  {
    "word": "sun shower",
    "hint": "Nature"
  },
  {
    "word": "sun tanning",
    "hint": "At The Beach"
  },
  {
    "word": "sunlight",
    "hint": "Nature"
  },
  {
    "word": "sunrise",
    "hint": "Nature"
  },
  {
    "word": "sunset luau",
    "hint": "At The Beach"
  },
  {
    "word": "sunset orange",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "sunshine",
    "hint": "Nature"
  },
  {
    "word": "sunspots",
    "hint": "Outer Space"
  },
  {
    "word": "super bowl",
    "hint": "All About Sports"
  },
  {
    "word": "super metroid",
    "hint": "Video Games"
  },
  {
    "word": "super troopers",
    "hint": "Movies"
  },
  {
    "word": "superman",
    "hint": "Fictional Characters"
  },
  {
    "word": "sure bet",
    "hint": "Oxymorons"
  },
  {
    "word": "surfing",
    "hint": "All About Sports"
  },
  {
    "word": "sushi go",
    "hint": "Toys & Games"
  },
  {
    "word": "sweet misery",
    "hint": "Oxymorons"
  },
  {
    "word": "sweet pea",
    "hint": "Nature"
  },
  {
    "word": "sweet roll",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "swimming",
    "hint": "At The Beach"
  },
  {
    "word": "swimming goggles",
    "hint": "All About Sports"
  },
  {
    "word": "swimsuit",
    "hint": "At The Beach"
  },
  {
    "word": "swing set",
    "hint": "Everyday Objects"
  },
  {
    "word": "swiss cheese",
    "hint": "Eat & Drink"
  },
  {
    "word": "sword fight",
    "hint": "All About Sports"
  },
  {
    "word": "table tennis",
    "hint": "All About Sports"
  },
  {
    "word": "taco bell",
    "hint": "Famous Brands"
  },
  {
    "word": "tail light",
    "hint": "Cars"
  },
  {
    "word": "taj mahal",
    "hint": "Places"
  },
  {
    "word": "taki sticks",
    "hint": "Eat & Drink"
  },
  {
    "word": "tandem bicycle",
    "hint": "Transportation"
  },
  {
    "word": "tangible",
    "hint": "Great Vocab Words"
  },
  {
    "word": "tank top",
    "hint": "Fashion"
  },
  {
    "word": "tanning salon",
    "hint": "Places"
  },
  {
    "word": "tapioca pudding",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "tater tots",
    "hint": "Eat & Drink"
  },
  {
    "word": "taxi driver",
    "hint": "Occupations"
  },
  {
    "word": "tea infuser",
    "hint": "In The Kitchen"
  },
  {
    "word": "tea shot",
    "hint": "All About Sports"
  },
  {
    "word": "teaspoon",
    "hint": "In The Kitchen"
  },
  {
    "word": "tectonic plates",
    "hint": "Nature"
  },
  {
    "word": "teenage dream",
    "hint": "Music & Song"
  },
  {
    "word": "teenie weenie",
    "hint": "Rhyme Time"
  },
  {
    "word": "tennis ball",
    "hint": "All About Sports"
  },
  {
    "word": "tennis racket",
    "hint": "All About Sports"
  },
  {
    "word": "tenuous",
    "hint": "Great Vocab Words"
  },
  {
    "word": "terry crews",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "tesla motors",
    "hint": "Famous Brands"
  },
  {
    "word": "texas toast",
    "hint": "Eat & Drink"
  },
  {
    "word": "textile factory",
    "hint": "Places"
  },
  {
    "word": "the alamo",
    "hint": "Places"
  },
  {
    "word": "the croods",
    "hint": "Movies"
  },
  {
    "word": "the crusades",
    "hint": "History"
  },
  {
    "word": "the goonies",
    "hint": "Movies"
  },
  {
    "word": "the grinch",
    "hint": "Movies"
  },
  {
    "word": "the hulk",
    "hint": "Fictional Characters"
  },
  {
    "word": "the jetsons",
    "hint": "TV Shows"
  },
  {
    "word": "the lorax",
    "hint": "Movies"
  },
  {
    "word": "the martian",
    "hint": "Books"
  },
  {
    "word": "the simpsons",
    "hint": "TV Shows"
  },
  {
    "word": "the voice",
    "hint": "TV Shows"
  },
  {
    "word": "the witches",
    "hint": "Movies"
  },
  {
    "word": "theme park",
    "hint": "Places"
  },
  {
    "word": "thin skin",
    "hint": "Rhyme Time"
  },
  {
    "word": "third baseman",
    "hint": "All About Sports"
  },
  {
    "word": "thirteen colonies",
    "hint": "History"
  },
  {
    "word": "thrift store",
    "hint": "Places"
  },
  {
    "word": "tide pool",
    "hint": "At The Beach"
  },
  {
    "word": "tiffany haddish",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "tiger lily",
    "hint": "Nature"
  },
  {
    "word": "tiger shark",
    "hint": "Animals"
  },
  {
    "word": "tim duncan",
    "hint": "Famous Athletes"
  },
  {
    "word": "tim howard",
    "hint": "Famous Athletes"
  },
  {
    "word": "timeout",
    "hint": "All About Sports"
  },
  {
    "word": "times square",
    "hint": "Places"
  },
  {
    "word": "tinker bell",
    "hint": "Fictional Characters"
  },
  {
    "word": "tire iron",
    "hint": "Cars"
  },
  {
    "word": "tissue box",
    "hint": "Everyday Objects"
  },
  {
    "word": "titanic",
    "hint": "Famous Things"
  },
  {
    "word": "toenails",
    "hint": "Anatomy"
  },
  {
    "word": "toll free",
    "hint": "Oxymorons"
  },
  {
    "word": "tom brady",
    "hint": "Famous Athletes"
  },
  {
    "word": "tom hanks",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "tom nook",
    "hint": "Fictional Characters"
  },
  {
    "word": "tom sawyer",
    "hint": "Fictional Characters"
  },
  {
    "word": "tomb raider",
    "hint": "Video Games"
  },
  {
    "word": "tommy hilfiger",
    "hint": "Famous Brands"
  },
  {
    "word": "toni collette",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "tonka truck",
    "hint": "Toys & Games"
  },
  {
    "word": "tony romo",
    "hint": "Famous Athletes"
  },
  {
    "word": "tooth brush",
    "hint": "Everyday Objects"
  },
  {
    "word": "toronto",
    "hint": "Places"
  },
  {
    "word": "tortilla",
    "hint": "Eat & Drink"
  },
  {
    "word": "tortilla soup",
    "hint": "Eat & Drink"
  },
  {
    "word": "tote bag",
    "hint": "Fashion"
  },
  {
    "word": "tow truck",
    "hint": "Transportation"
  },
  {
    "word": "town hall",
    "hint": "Places"
  },
  {
    "word": "toy store",
    "hint": "Places"
  },
  {
    "word": "toyota camry",
    "hint": "Cars"
  },
  {
    "word": "toyota tacoma",
    "hint": "Cars"
  },
  {
    "word": "trading cards",
    "hint": "Toys & Games"
  },
  {
    "word": "trail mix",
    "hint": "Eat & Drink"
  },
  {
    "word": "trailer",
    "hint": "Transportation"
  },
  {
    "word": "train set",
    "hint": "Toys & Games"
  },
  {
    "word": "train station",
    "hint": "Places"
  },
  {
    "word": "trash can",
    "hint": "Everyday Objects"
  },
  {
    "word": "trashcan",
    "hint": "One Vowel"
  },
  {
    "word": "treasure island",
    "hint": "Books"
  },
  {
    "word": "tree surgeon",
    "hint": "Occupations"
  },
  {
    "word": "tree trunk",
    "hint": "Nature"
  },
  {
    "word": "trevi fountain",
    "hint": "Places"
  },
  {
    "word": "triangle",
    "hint": "Music & Song"
  },
  {
    "word": "triple alliance",
    "hint": "History"
  },
  {
    "word": "triple crown",
    "hint": "All About Sports"
  },
  {
    "word": "triple play",
    "hint": "All About Sports"
  },
  {
    "word": "trojan war",
    "hint": "History"
  },
  {
    "word": "troll doll",
    "hint": "Toys & Games"
  },
  {
    "word": "trombone",
    "hint": "Music & Song"
  },
  {
    "word": "trophy case",
    "hint": "All About Sports"
  },
  {
    "word": "tropical fish",
    "hint": "At The Beach"
  },
  {
    "word": "tropical paradise",
    "hint": "Places"
  },
  {
    "word": "tropical storm",
    "hint": "Nature"
  },
  {
    "word": "trousers",
    "hint": "Fashion"
  },
  {
    "word": "truck terminal",
    "hint": "Places"
  },
  {
    "word": "trumpet",
    "hint": "Music & Song"
  },
  {
    "word": "tsunami",
    "hint": "Nature"
  },
  {
    "word": "tuna fish",
    "hint": "Eat & Drink"
  },
  {
    "word": "tuna salad",
    "hint": "Eat & Drink"
  },
  {
    "word": "turkey bacon",
    "hint": "Eat & Drink"
  },
  {
    "word": "turkish baklava",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "turn signal",
    "hint": "Cars"
  },
  {
    "word": "tweety bird",
    "hint": "Fictional Characters"
  },
  {
    "word": "twitch stream",
    "hint": "Famous Brands"
  },
  {
    "word": "tylenol",
    "hint": "Body & Health"
  },
  {
    "word": "tyler perry",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "ugg boots",
    "hint": "Famous Brands"
  },
  {
    "word": "ugly duckling",
    "hint": "Figures of Speech"
  },
  {
    "word": "ultimate frisbee",
    "hint": "All About Sports"
  },
  {
    "word": "umbrella",
    "hint": "At The Beach"
  },
  {
    "word": "undertow",
    "hint": "No Repeating Letters"
  },
  {
    "word": "unicorn",
    "hint": "Myths & Legends"
  },
  {
    "word": "unicorns",
    "hint": "Myths & Legends"
  },
  {
    "word": "union pacific",
    "hint": "Famous Brands"
  },
  {
    "word": "united airlines",
    "hint": "Famous Brands"
  },
  {
    "word": "unusual routine",
    "hint": "Oxymorons"
  },
  {
    "word": "uptown funk",
    "hint": "Music & Song"
  },
  {
    "word": "urban planner",
    "hint": "Occupations"
  },
  {
    "word": "utter silence",
    "hint": "Oxymorons"
  },
  {
    "word": "vacation",
    "hint": "At The Beach"
  },
  {
    "word": "vampire",
    "hint": "Halloween"
  },
  {
    "word": "vampires",
    "hint": "Myths & Legends"
  },
  {
    "word": "vanilla pudding",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "varsity football",
    "hint": "All About Sports"
  },
  {
    "word": "venetian red",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "venice beach",
    "hint": "Places"
  },
  {
    "word": "veterans day",
    "hint": "Special Days"
  },
  {
    "word": "vietnam",
    "hint": "Places"
  },
  {
    "word": "vietnam war",
    "hint": "History"
  },
  {
    "word": "vinyl records",
    "hint": "Old-Fashioned Things"
  },
  {
    "word": "virtual reality",
    "hint": "Oxymorons"
  },
  {
    "word": "visitors center",
    "hint": "Places"
  },
  {
    "word": "vitamin c",
    "hint": "Body & Health"
  },
  {
    "word": "vivid violet",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "waiting room",
    "hint": "Places"
  },
  {
    "word": "waitress",
    "hint": "Occupations"
  },
  {
    "word": "walmart",
    "hint": "Famous Brands"
  },
  {
    "word": "walnuts",
    "hint": "Eat & Drink"
  },
  {
    "word": "warner brothers",
    "hint": "Famous Brands"
  },
  {
    "word": "washable markers",
    "hint": "At School"
  },
  {
    "word": "wasp nest",
    "hint": "Nature"
  },
  {
    "word": "water balloon",
    "hint": "Toys & Games"
  },
  {
    "word": "water chestnut",
    "hint": "Eat & Drink"
  },
  {
    "word": "water faucet",
    "hint": "Everyday Objects"
  },
  {
    "word": "water park",
    "hint": "Places"
  },
  {
    "word": "water skiing",
    "hint": "All About Sports"
  },
  {
    "word": "water slide",
    "hint": "Toys & Games"
  },
  {
    "word": "weather",
    "hint": "Nature"
  },
  {
    "word": "web designer",
    "hint": "Occupations"
  },
  {
    "word": "wedding hall",
    "hint": "Places"
  },
  {
    "word": "weigh station",
    "hint": "Places"
  },
  {
    "word": "weight lifting",
    "hint": "All About Sports"
  },
  {
    "word": "welcome center",
    "hint": "Places"
  },
  {
    "word": "wells fargo",
    "hint": "Famous Brands"
  },
  {
    "word": "wembley stadium",
    "hint": "Places"
  },
  {
    "word": "wendy darling",
    "hint": "Fictional Characters"
  },
  {
    "word": "western union",
    "hint": "Famous Brands"
  },
  {
    "word": "wetland",
    "hint": "Nature"
  },
  {
    "word": "whale watching",
    "hint": "At The Beach"
  },
  {
    "word": "whipped cream",
    "hint": "Desserts & Sweets"
  },
  {
    "word": "white dwarf",
    "hint": "Outer Space"
  },
  {
    "word": "white rabbit",
    "hint": "Fictional Characters"
  },
  {
    "word": "white radish",
    "hint": "Eat & Drink"
  },
  {
    "word": "whitney houston",
    "hint": "Famous People"
  },
  {
    "word": "whole foods",
    "hint": "Famous Brands"
  },
  {
    "word": "whoopi goldberg",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "wild boar",
    "hint": "Animals"
  },
  {
    "word": "wild wasabi",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "will smith",
    "hint": "Stars of Stage & Screen"
  },
  {
    "word": "windsor castle",
    "hint": "Places"
  },
  {
    "word": "winter sky",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "winter soldier",
    "hint": "Fictional Characters"
  },
  {
    "word": "winter wizard",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "wipe out",
    "hint": "All About Sports"
  },
  {
    "word": "wireless mouse",
    "hint": "Everyday Objects"
  },
  {
    "word": "witches",
    "hint": "Halloween"
  },
  {
    "word": "wolf spider",
    "hint": "Animals"
  },
  {
    "word": "wonton soup",
    "hint": "Eat & Drink"
  },
  {
    "word": "wooden nickel",
    "hint": "Oxymorons"
  },
  {
    "word": "woolly mammoth",
    "hint": "Animals"
  },
  {
    "word": "wooly mammoth",
    "hint": "Animals"
  },
  {
    "word": "world history",
    "hint": "At School"
  },
  {
    "word": "wright brothers",
    "hint": "History"
  },
  {
    "word": "wrist watch",
    "hint": "Everyday Objects"
  },
  {
    "word": "yankee stadium",
    "hint": "Places"
  },
  {
    "word": "yearbook",
    "hint": "At School"
  },
  {
    "word": "yellow card",
    "hint": "All About Sports"
  },
  {
    "word": "yellow sunshine",
    "hint": "Official Crayon Colors"
  },
  {
    "word": "yosemite",
    "hint": "Places"
  },
  {
    "word": "young adult",
    "hint": "Oxymorons"
  },
  {
    "word": "zombies",
    "hint": "Myths & Legends"
  }
];


