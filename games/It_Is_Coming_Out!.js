/*
@title: It_Is_Coming_Out!
@author: Onovez
@tags: []
@addedOn: 2023-03-15
*/
// Game where you have to go through obstcle to go to toilet to poop
// 'w','a','s','d': to move, 'j' to reset map, and 'k' to restart game


// Sprites For the game
const player = "p";
const food = "x";
const block = "b";
const toilet = "t";
const block1 = "g";
const doorOpen = "v";
const doorClosed = "n";
const background = "z";
const poop = "h";


// Music for the game
const move = tune`
500: c4^500,
15500`;
const eat = tune`
114.06844106463879,
114.06844106463879: f4-114.06844106463879 + g4^114.06844106463879 + e4/114.06844106463879 + d4~114.06844106463879,
114.06844106463879: d4-114.06844106463879 + e4-114.06844106463879 + g4-114.06844106463879 + f4/114.06844106463879,
114.06844106463879: d4/114.06844106463879 + g4/114.06844106463879 + f4^114.06844106463879 + e4^114.06844106463879,
114.06844106463879: d4^114.06844106463879 + e4~114.06844106463879 + f4~114.06844106463879 + g4~114.06844106463879,
3079.8479087452474`;
const door_sound = tune`
500: c4^500 + d4^500 + e4^500 + f4^500 + g4^500,
15500`;
const inDoor = tune`
500: c4~500 + d4~500 + e4~500 + f4~500 + g4~500,
15500`;
const music = tune`
500: c4^500,
500: d4~500,
500: c4^500 + e4~500,
500: c4^500,
500: d4~500,
500: c4^500 + e4~500,
500: c4^500,
500: d4~500,
500: c4^500 + e4~500,
500: c4^500 + f4~500,
500: d4~500,
500: c4^500 + e4~500,
500: c4^500 + f4~500,
500: d4~500,
500: c4^500 + e4~500,
500: c4^500,
500: d4~500,
500: c4^500 + e4~500,
500: c4^500,
500: d4~500,
500: c4^500 + e4~500,
500: c4^500 + f4~500,
500: d4~500,
500: c4^500 + e4~500,
500: c4^500 + f4~500,
500: d4~500,
500: c4^500 + e4~500,
500: c4^500,
500: d4~500,
500: c4^500 + e4~500,
500: c4^500,
500: d4~500`;


// Other Variables
var eaten = false;
var win = false;
var toiletY;
var toiletX;
var doorx;
var doory;

setLegend(
  [player, bitmap`
................
....00000000....
...066666FFF0...
..066666666FF0..
.06666FFF666FF0.
.06666FF3F666F0.
.06666FFF6666F0.
.0666FFFFFF66F0.
.0666F6F66666F0.
.066666FFF666F0.
.0666FFF6F666F0.
.06666666F66FF0.
..066666666FF0..
...0666666FF0...
....00000000....
................`],
  [food, bitmap`
.....00000......
.....0.0.000....
...0006F6F.00...
..0F.F6F6F6F60..
..0F6F6F6F6F60..
..0C6F6F6F6FC0..
..0CCF6F6F6CC0..
..0C3CCCCCC3C0..
..0C33333333C0..
..0C33633363C0..
..0C33633363C0..
..0C33636363C0..
..0C33663663C0..
..0C3CCCCCC3C0..
..0CCCCCCCCCC0..
...0000000000...`],
  [block, bitmap`
0000000000000000
0221102211022110
0222102221022210
0000000000000000
0221102211022110
0222102221022210
0000000000000000
0221102211022110
0222102221022210
0000000000000000
0221102211022110
0222102221022210
0000000000000000
0221102211022110
0222102221022210
0000000000000000`],
  [toilet, bitmap`
...........LLL..
...........L2LL.
...........L12L.
...........L21L.
...........L22L.
...........L12L.
...........L22L.
..CC.......L2LL.
.CLLLLLLLLLLLL..
.CL22222122L....
...L212222LL....
.C.LL2212LL.....
.....LLLL.......
....L2221L......
...L221222L.....
...LLLLLLLL.....`],
  [block1, bitmap`
CCC000LLLL000CCC
C1C0LL0000LL0C1C
CCC000LLLL000CCC
0000000000000000
0L000333333000L0
0L003033330300L0
L0L0330330330L0L
L0L0333003330L0L
L0L0333003330L0L
L0L0330330330L0L
0L003033330300L0
0L000333333000L0
0000000000000000
CCC000LLLL000CCC
C1C0LL0000LL0C1C
CCC000LLLL000CCC`],
  [background, bitmap`
LLLLLLLLLLLLLLLL
LFFFLFFFFFFLFFFL
LFFFLFFFFFFLFFFL
LLLLLLLLLLLLLLLL
LFFFFFLFFFFLFFFL
LFFFFFLFFFFLFFFL
LLLLLLLLLLLLLLLL
LFFFFFFFLFFFFFFL
LFFFFFFFLFFFFFFL
LLLLLLLLLLLLLLLL
LFFFFLFFFFFLFFFL
LFFFFLFFFFFLFFFL
LLLLLLLLLLLLLLLL
LFFLFFFFFFLFFFFL
LFFLFFFFFFLFFFFL
LLLLLLLLLLLLLLLL`],
  [doorOpen, bitmap`
...0000000000...
...0FFCL11110...
...0FFCLL1110...
...01FCLLL110...
...0FFCLLL110...
...0FFCLLL110...
...0FFCLLLL10...
...0FFCLLLL10...
...0FFC1LLL10...
...0FFCLLLL10...
...0FFCLLL110...
...0FFCLLL110...
...01FCLLL110...
...0FFCLL1110...
...0FFCL11110...
...0000000000...`],
  [doorClosed, bitmap`
...0000000000...
...0FFCCCCCC0...
...0FFCCCCCC0...
...01FCCCCCC0...
...0FFFFCCCC0...
...0FFFFCCCC0...
...0FFFFFCCC0...
...0FFFFFCC10...
...0FFFFFCC10...
...0FFFFCCCC0...
...0FFFFCCCC0...
...0FFFCCCCC0...
...01FFCCCCC0...
...0FFCCCCCC0...
...0FFCCCCCC0...
...0000000000...`],
  [poop, bitmap`
.....00.........
....0CC00.......
.....0FCC0......
....0CC0DC0.....
...0C00CCC0.....
..0CCDDC00C0....
..0FFCC0CFFC0...
...0CFCDDCCC0...
..0DCCCCCCFCC0..
.0CDCC00DFCCC0..
.0CC00CCDDCC0C0.
0C00CCCCCCCC0CC0
0CFFCCFFFC00CFC0
0CCDDCCCCDDCCC0.
.0CC0000CCCC00..
..00....0000....`]
);
setBackground(background);

setSolids([player, block, block1]);

setPushables({
  [player]: [block1],
})

var level = 0;
const levels = [map`
bbbbbbbbbb
b........b
bp......vb
b........b
b........b
bbbbbbbbbb`,
map`
bbbbbbbbbbb
bn...b....b
bbbb.b.b..b
bp...b.b.tb
bbb..b.b..b
b..x....b.b
bbbbbbbbbbb`,
map`
pbx..bb...
.bbb.b..b.
.....bb.b.
.bb..b..bt
..nb...bb.`,
map`
bbbbbbbbbbb
bp.......bb
bbbbb..bx.b
b.....nbbbb
b..bbbb..tb
b.......b.b
bbbbbbbbbbb`,
map`
bbbbbbbbbbb
b......nbpb
bb.bb.bbb.b
bb.b..b...b
bx.b.bb.btb
bbb.....b.b
bbbbbbbbbbb`,
map`
bbbbbbbbbbb
bx.bb.b..bb
b.g.....gtb
bbb.b..b..b
b.b.b..bbbb
bg..b..b.nb
bpbb...g..b
bbbbbbbbbbb`,
map`
bbbbbbbbbbb
b.g.......b
bgng.g....b
b.g.gpg...b
b....g...bb
b......bgtb
bx.....b..b
bbbbbbbbbbb`,
map`
bbbbbbbbbbbbb
b...nb......b
b.gx.b......b
b..bbb...bb.b
bgbbbb...b..b
b........b.bb
bb.......bgtb
bpg.b....b..b
bbbbbbbbbbbbb`,
map`
bbbbbbbbbbbbb
bp.........nb
bbbbbbbbbbb.b
bx..........b
b.bbbbbbbbbbb
b...........b
bbbbbbbbbbb.b
b...........b
btbbbbbbbbbbb
b.bbbbbbbbbbb`,
map`
bbbbbbbbbbbbbb
bx....b......b
bbb...b.bbbb.b
bpb.b.b.b...gb
b.b.b...b..g.b
b....btbn....b
bbbbbb.bbbbbbb`,
map`
bbbbbbbbbbbbb
b.g......b..b
bb.b....gg..b
bx.b..g..b.nb
bbbbbbpbbbbbb
b.g.g.g.g.g.b
bg.g.g.g.g.tb
b.g.g.g.g.g..
bbbbbbbbbbbbb`,
map`
bbbbbbbbbbbbbb
bng.g.g.g.g.tb
.g.....g.g.g.b
b.g.g.g...g.gb
bg.g.gpg.g...b
b.g...g.g.g.gb
bg.g.g.g.g.g.b
b...g...g.g.gb
bg.g.g.g.g.x.b
bbbbbbbbbbbbbb`,
map`
bbb.bbbbbb
bpbgg..bnb
b.b.b.bx.b
bgb.b.tb.b
b.g..b...b
b.bbbbbbbb`,
map`
bbbbbbbbbbbbbbbb
bpb............b
bgb.b.bbbb..bb.b
b.g..b.g..g.b..b
b.bbbbb.bb..b.bb
bbbbbbbnbb..b.bb
bbbbbbbbb.b.b.bb
bbb.bb...gb.b.bb
bx.gbb.bb.b.btbb
bbb...gbb...b.bb
bbbbbb.bbbbbbbbb`,
map`
bbbbbbbbbbbbbb
....g.bbbbb..b
b.b.bpbx.g.b.b
b..b.bbb.bb..b
b.b..bnb..bb.b
b..b.b.b.....b
b.b...g...b..b
bg.bgb.b.btb.b
b.....b.b.g.gb
bbbbbbbbbbbb.b`,
map`
bb.bbbbbbbbb
bn.bbbbb..g.
bbgbhhhb.b.b
b..bhphb.b.b
b.bbh.hb.b.b
b..bbgbb.btb
...g...x.b.b
bbbbb.bbbbbb`,
map`
bbbbbbbbbbbbb
b...........b
b...........b
b...........b
b...........b
b...........b
b...........b
b...........b
bbbbbbbbbbbbb`
];

setMap(levels[level])

// The movement of the player
onInput("w", () => {
  getFirst(player).y -= 1;
  playTune(move, 1);
});
onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(move, 1);
});
onInput("s", () => {
  getFirst(player).y += 1;
  playTune(move, 1);
});
onInput("d", () => {
  getFirst(player).x += 1;
  playTune(move, 1);
});
onInput("j", () => {
  setMap(levels[level]);
});
onInput("k", () => {
  level = 0;
  setMap(levels[level]);
  text('Can\'t Hold', 6, 5, color`6`);

  text('It In!', 8, 8, color`6`);

  text('by Onovez', 9, 11, color`0`);
});

afterInput(() => {
  // Eats the Food and turns eaten to True for future use
  if (tilesWith(player, food).length > 0) {
    eaten = !eaten;
    var foodX = getFirst(food).x;
    var foodY = getFirst(food).y;

    getFirst(player).x += 1;
    clearTile(foodX, foodY);
    getFirst(player).x -= 1;
    playTune(eat, 1);


  }
  if (level == 0) {

    if (tilesWith(player, doorOpen).length > 0) {
      win = !win
    }
  }

  if (eaten) {
    if (tilesWith(player, toilet).length > 0 && win == false) {
      eaten = !eaten;
      win = !win;
      toiletX = getFirst(toilet).x;
      toiletY = getFirst(toilet).y;
      doorx = getFirst(doorClosed).x;
      doory = getFirst(doorClosed).y;

      if (level == 1) {
        addPoop();
        door();
      }
      if (level == 2) {
        addPoop();
        door();
      }
      if (level == 3) {
        addPoop();
        door();
      }
      if (level == 4) {
        addPoop();
        door();
      }
      if (level == 5) {
        addPoop();
        door();
      }
      if (level == 6) {
        addPoop();
        door();
      }
      if (level == 7) {
        addPoop();
        door();
      }
      if (level == 8) {
        addPoop();
        door();
      }
      if (level == 9) {
        addPoop();
        door();
      }
      if (level == 10) {
        addPoop();
        door();
      }
      if (level == 11) {
        addPoop();
        door();
      }
      if (level == 12) {
        addPoop();
        door();
      }
      if (level == 13) {
        addPoop();
        door();
      }
      if (level == 14) {
        addPoop();
        door();
      }
      if (level == 15) {
        addPoop();
        door();
      }

    }
  }
  // Going up levels
  if (win) {
    if (tilesWith(player, doorOpen).length > 0) {
      playTune(inDoor, 1);
      level++;
      win = !win;
      setMap(levels[level]);
      clearText();


      if (level > 15) {
        text('Finished', 6, 4, color`2`);
        text('by Onovez', 6, 6, color`0`);
        text('Last Updated:', 5, 11, color`5`);
        text('01-12-2023', 7, 12, color`7`);
        text("(Press k to", 2, 8, color`2`);
        text("Restart)", 10, 9, color`2`);
      }

    }
  }

  // Statements that reset the map if there is an error
  if (tilesWith(food, block1).length > 0) {
    setMap(levels[level]);
  }
  if (tilesWith(block1, toilet).length > 0) {
    setMap(levels[level]);
  }
  if (tilesWith(block1, doorClosed).length > 0) {
    setMap(levels[level]);
  }
  if (tilesWith(block1, doorOpen).length > 0) {
    setMap(levels[level]);
  }



})

// Functions
function addPoop() {
  addSprite(toiletX, toiletY + 1, poop);
}
function door() {
  clearTile(doorx, doory);
  addSprite(doorx, doory, doorOpen);
  playTune(door_sound, 1);
}

function text(label, xpos, ypos, colour) {
  addText(label, {
    x: xpos,
    y: ypos,
    color: colour
  });
}

playTune(music, Infinity);
text('Can\'t Hold', 6, 5, color`6`);

text('It In!', 8, 8, color`6`);

text('by Onovez', 9, 11, color`0`);






