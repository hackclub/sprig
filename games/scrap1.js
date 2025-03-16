/* 
@title: Error 404
@author: JNB
@tags: []
@img: ""
@addedOn: 2025-03-16
*/                  
const player = "p"
const box = "b"
const wall = "w"
const wall2 = "W"
const wall3 ="W"
const goal = "d"
const buttonRed = "B"
const buttonGreen = "f"
const bg = "q"
const corruption = "g"
const pushRight = "1"
const pushDown = "2"
const glitchorb = "i"
const lockRed = "l"
const lockGreen = "L"
const glitchmoss = "m"
const glitchWall = "c"
const e = "e"
let count = 0;
 

setBackground(bg)

setLegend(
  [player, bitmap`
.L.........1....
5.L00000001.5...
L.0HLLLLL80.L...
.0L8HLLL8HL0....
.0LL3LLL7LL0....
..0LLLLLLL0.....
...0000000......
..00LLLLLL0.....
.0LL0LLL0LL0....
0LL0L0L0L0LL0...
0LLLLLLLLLLL0...
0LLLLLLLL4LL0...
01LLLLLL96L00...
.011LLLLLLL0....
LL001LLLL000L...
L11.00000.11L...`],
  [box, bitmap`
................
..LLLLLLLLLLLL..
..LDDDDLLDDDDL..
..LD4DLL4LD4DL..
..LD4DL96LD4DL..
..LDDDDLLDDDDL..
..LLLLLLLLLLLL..
..000000000000..
..00D0D00D0D00..
..0D4DDDDDD4D0..
..0L44D44D44L0..
..0L44D44D44L0..
..0D4DDDDDD4D0..
..00D0D00D0D00..
..000000000000..
................`],
  [wall, bitmap`
LL3LLLLLLLLLL3LL
LL39LLLLLLLL33LL
LL3999LLLLL933LL
3333339999933993
LLLLL9LLL9LLL93L
LLLLL9LLLLLLLL9L
LLLLL9LLLLLLLL9L
9999999999333399
L9LLLLLLLL9LL3LL
L9LLLLLLLL9LLLLL
L9LLLLLLLL9LLLLL
3333333333999933
LLL3399999LL999L
LLL339LLLLLLL99L
LLLL3LLLLLLLLL9L
999L33LLLLLL993L`],
  [wall2, bitmap`
L75LLLLLLLLLL5LL
LL55LLLLLLLL75LL
LL557LLLLL7775LL
5775577777555555
L57LLL7LLL7LLLLL
L7LLLLLLLL7LLLLL
L7LLLLLLLL7LLLLL
7755557777777777
LL5LL7LLLLLLLL7L
LLLLL7LLLLLLLL7L
LLLLL7LLLLLLLL7L
5577775555555555
L777LL7777755LLL
L77LLLLLLL777LLL
L7LLLLLLLLL57LLL
L577LLLLLL55L777`],
  [wall3, bitmap`
LL8LLLLLLLLLL8HL
LL8HLLLL8LLL88LL
LL88HLLL8L8H8LLL
888888HHH8888HH8
LLLLLHLLLHLLLH8L
LLLLLHLLLLLLLLHL
LLLLHHLLLLLLLLHL
HH8888HHHH8888HH
LHLLLLLLLL8LL8LL
LHLLL8LLLLHLLLLL
LHLLL8LLLLHLLLLL
8888888888HHH888
LLL88HHHH8LLLL8L
LLLHHLLLLL8LLLHL
LLLH8LLLLL8LLLHL
HHHL88LLLLHLHH8L`],
  [glitchmoss, bitmap`
LL3LLLLLLLLLL3LL
LL3LLLLLLLLLL9LL
LL3LLLLLLLLLL9LL
3399999333999889
L99LLH8HHL3L8HHL
L9LLL8LLHL3HHLLL
L9LLLLLL8L3LLLLL
99333833H3999999
HHHLH8LLHLLLL39L
LLH8H9LLHLLHH833
LLLLL39LLH8HLH83
33333399999333H3
L3LL8HLLLL93LLH8
L9L8HLLLLL93LLLL
L99HLLLLLLL9LLLL
3999933333399933`],
  [goal, bitmap`
................
..2.00000000.2..
..001100001100..
.0391L08H0L1750.
.0110LL00LL0110.
.01011L01L11010.
.01L1LL00LL1L10.
.01L1LL10LL1L10.
.01L1L1001L1L10.
.01L1L0040L1L10.
.00L1L0960L1L00.
.0L01L1001L10L0.
.0L01LL00LL10L0.
.0L01LL01LL10L0.
..001LL00LL100..
..0L00010000L0..`],
  [lockRed, bitmap`
15LL111111151111
L5LLLLLLLLL7LLLL
L7LLLLLLLLL77LLL
177111111LL77111
5577555335557775
LLLLL53C23LLLL5L
LLLLL3CCC23LLL7L
11113CC57CC3LL7L
55773CC75CC35575
L7LLL32CCC3L77LL
L7LLLL32C3577LLL
1771LLL33L57LL11
5575577555775557
LL5LLLLLLLLLL5LL
117LLL1111LL15LL
5577777755577577`],
  [lockGreen, bitmap`
11H1111111111H11
LL8LLLLLLLLLLHLL
LLH88LLLLLLL88LL
HHHH888HHH888888
11111H1FF11111H1
LLLLL8F62FLLLLHL
LLLLLF6662FLLL8L
H888F668H66FH888
1881F66H86688811
LHLLLF2666F8LLLL
L88LLLF26FHLLLLL
HH8888HFFHHHHHHH
11118111111111H1
LLLL8LLLLLLLLLHL
LLLLHLLLLLLLLL8L
8HHHH8H88HH888HH`],
  [buttonRed, bitmap`
................
................
................
................
................
................
................
....CCCCCC22....
...CCCCCCCCC2...
..3CCCCCCCCCC...
..32CCCCCCCC3...
..3322CCCCC33...
...3333333333...
....33333333....
................
................`],
  [buttonGreen, bitmap`
................
................
................
................
................
................
................
....66666622....
...6666666662...
...6666666666...
..F2666666666...
..FF22666666F...
..FFFFFFFFFFF...
....FFFFFFFF....
................
................`],
  [bg, bitmap`
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
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [corruption, bitmap`
1111111111111111
1111111111H11111
11111111111HH811
1111H1111118HH11
11HHH8111111H111
11118HH111111111
1111111111111111
1111111HH8111111
188H11H18H118111
1H888111111HH811
11181111111H1HH1
1111111H11111111
11118H8H11111811
1111HH111118HH81
11111111111H8111
1111111111111111`],
  [pushRight, bitmap`
................
................
................
..........9.....
.....99.9.69....
..........669...
..999999996669..
..6666666666669.
..6666666666666.
..666666666666..
..........666...
....6..66.66....
..........6.....
................
................
................`],
  [pushDown, bitmap`
................
......9999......
......9999......
....9.9999.6....
....9.9999.6....
....9.9999.9....
....6.9999.9....
....6.9999.9....
......9999......
...9999999999...
...6999999996...
....69999996....
.....699996.....
......6996......
.......66.......
................`],
  [glitchorb, bitmap`
.............7H5
............2183
.............219
..............2.
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
................`],
  [glitchWall, bitmap`
LL5LLLLLLLLLL5LL
LL5LLLLLLLLLL7LL
LL8HLLLLLLLLL78L
7758H55555778H77
L5LLLHLLLL7LHLLL
L7LLLL8HH87H8LLL
L7LLL8LL8L88LLLL
7775HH8557785557
LLL857HLL7LHLL7L
LHHHL7LLLH8LLL7L
L8HLL57LH8LLLL5L
5H555577858H8555
L8LLLLL7L5L8H857
L8LLLL7LLL57LH7L
L7LL557LL577LLLL
5555755775555555`],
 )
let solids = [player, box, wall, wall2,wall3, lockRed, lockGreen, glitchmoss];
setSolids(solids);

let level = 1;
const levels = [
  map`
wwwww
WbebW
WgpgW
WbgbW
WwwwW`,
  map`
wmwwwm
mgbp1g
mmbwwb
mmg.m2
w.2.d.
mw.wmw`,
  map`
wwwwwwwmm2w
mpwBW.2b1..
m.w.W..gm2.
W.g.W.W....
wgw.wgWWW..
WgWbw....g.
w.W.Wlwg.gm
Wgw.mdW...W
w.w.mwWwwgw
WgWg.bg.W.W
wgW.www.W.w
wggB..bg.g.
wmwmWwwwmBW
wWWwmWwmWWw`,
  map`
wwwmWww
mpg..2w
W..gWbw
m...Wbw
cg..g2g
cl.gbBg
cdL2.fg
Wwgbmmw
WWW1Bww`,
  map`
WWWWWWWWWWWwWW
Wgp.W1.gg.g.iW
WB.gbgg.gg.ggw
Wg..Wg.ggb.g.m
W.gmWW....g.lW
WWBWWW...ggldW
WWWWWWWWWWWWWW`,
  map`
WWWWWWWWWWWWWWW
WWWWWWwWWWWWWWW
WW1.iWmWWWgggWW
W.gg.WwWWWWWgWW
W.pg.WwWWWWWggW
Wggg.WmWWWWWWdW
W..g.WwWWWWWWWW
WW...WwmwmmmWWW
WWWWWWWWWWWWWWW
WWWWWWWWWWWWWWW`,

]

setMap(levels[level])

setPushables({
  [player]: [box],
  [box]: [box]
})

onInput("s", () => {
  if (level === 4 || 5) {
    count--;
  }
  getFirst(player).y += 1
})

onInput("w", () => {
  if (level === 4 || 5) {
    count--;
  }
  getFirst(player).y += -1
})

onInput("d", () => {
  if (level === 4 || 5) {
    count--;
  }
  getFirst(player).x += 1
})

onInput("a", () => {
  if (level === 4 || 5) {
    count--;
  }
  getFirst(player).x += -1
})

onInput("i", () => {
  const currentLevel = levels[level];
  solids = [player, box, wall, wall2, lockGreen, lockRed, glitchmoss];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});
onInput("l", () => {

  if (level === 5 && getTile(7, 4).length === 2) {
      level = 0
      setMap(levels[0])
      
  } else {
  
    const targetNumber = tilesWith(goal).length;
  
    const numberCovered = tilesWith(goal, player).length;
  
    if(numberCovered === targetNumber) {
  
       level = level + 1
      
      const currentLevel = levels[level];
  
      if (currentLevel !== undefined) {
        setMap(currentLevel);
      } else {
        addText("Error 404 Restart", { y: 4, color: color`2` });
      }
    }
  }
});
afterInput(() => {

  const targetNumber = tilesWith(pushRight).length;

  const numberCovered = tilesWith(pushRight, player).length;

  if (targetNumber != 0 && numberCovered === targetNumber) {
    getFirst(player).x += 1
  }
});
let invis = false;
afterInput(() => {
  setSolids(solids);
  const targetNumber = tilesWith(glitchorb).length;
  const numberCovered = tilesWith(glitchorb, player).length; 
  if (targetNumber != 0 && numberCovered === targetNumber) {
    solids = [player];
    invis = true;
    count = 5;
    getFirst(glitchorb).remove();
  }
  const etargetNumber = tilesWith(e).length;
  const enumberCovered = tilesWith(e, player).length;
  if (etargetNumber != 0 && enumberCovered === etargetNumber) {
    getFirst(e).remove();
  }
  if (count === 0) {
    solids = [player, box, wall, wall2, lockRed, lockGreen, glitchmoss];
  }
});

afterInput(() => {

  if (tilesWith(box, pushRight).length === 1) {
    tilesWith(box, pushRight)[0][0].x += 1;
  }
});

afterInput(() => {

  const targetNumber = tilesWith(pushDown).length;

  const numberCovered = tilesWith(pushDown, player).length;

  if (targetNumber != 0 && numberCovered === targetNumber) {

    getFirst(player).y += 1
  }
});

afterInput(() => {

  const targetNumber = tilesWith(goal).length;

  const numberCovered = tilesWith(goal, player).length;

  if (numberCovered === targetNumber) {

    addText("'l' to Interact", { y: 15, color: color`2` });
  } else {
    clearText()
  } 
});

afterInput(() => {

  if (tilesWith(box, pushDown).length === 1) {
    tilesWith(box, pushDown)[0][0].y += 1;
  }
});

afterInput(() => {
  if (level === 3) {
    const targetNumber = tilesWith(goal).length;

    const numberCovered = tilesWith(goal, player).length;

    if (getTile(5, 2)[0] && getTile(5, 2)[0]["type"] === "p") {
      addText("'i' to Reset", { y: 15, color: color`2` });
    } else if (numberCovered === targetNumber) {
      addText("'l' to Interact", { y: 15, color: color`2` });
    } else {
      clearText();
    }
  } else if (level === 2) {
    const targetNumber = tilesWith(buttonRed).length;
  
    const numberCovered = tilesWith(buttonRed, player).length + tilesWith(buttonRed, box).length;
  
    if (targetNumber != 0 && numberCovered === targetNumber) {
      if (checkSprite(5, 6, lockRed)) {
        clearTile(5,6);
      }
    } else {
      addSprite(5, 6, lockRed);
    }
  } else if (level === 5) {
    const targetNumber = tilesWith(buttonGreen).length;
  
    const numberCovered = tilesWith(buttonGreen, player).length + tilesWith(buttonGreen, box).length;
  
    if (targetNumber != 0 && numberCovered === targetNumber) {
      if (checkSprite(1, 2, lockGreen)) {
        clearTile(1,2);
        clearTile(1,7);
      }
    } else {
      addSprite(1, 2, lockGreen);
    }
  } if (level === 5) {
    const targetNumber = tilesWith(buttonRed).length;
  
    const numberCovered = tilesWith(buttonRed, player).length + tilesWith(buttonRed, box).length;
  
    if (targetNumber != 0 && numberCovered === targetNumber) {
      if (checkSprite(4, 7, lockRed)) {
        clearTile(4,7);
      }
    } else {
      addSprite(4, 7, lockRed);
    }
  }
});


function checkSprite(x, y, sprite) {
  if (getTile(x, y).length === 0) {
    return false;
  } else {
    return getTile(x,y)[0]["type"] === sprite;
  }
}