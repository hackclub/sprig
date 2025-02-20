/* 
@title: Dungeon Quest
@author: egg948
@tags: []
@img: ""
@addedOn: 2025-01-15
*/

const player = "p"
const egg = "e"
const box = "b"
const wall = "w"
const wall2 = "W"
const goal = "d"
const buttonRed = "B"
const buttonGreen = "f"
const bg = "q"
const grass = "g"
const pushRight = "1"
const pushDown = "2"
const invisPotion = "i"
const lockRed = "l"
const lockGreen = "L"
const moss = "m"
const crackedWall = "c"
let count = 0;
let egg_collected = false

setBackground(bg)

setLegend(
  [player, bitmap`
................
................
................
................
................
......DLDL......
.....D4111L.....
....D414111L....
....L1111110....
....011110L0....
..L.0L01LLL0.L..
.L1L.0LLLL0.L1L.
..L...0000...L..
................
................
................`],
  [box, bitmap`
................
..LLLLLLLLLLLL..
..L1111111111L..
..L1L1LLLL1L1L..
..L1L1LLLL1L1L..
..L1111111111L..
..LLLLLLLLLLLL..
..000000000000..
..00LLLLLLLL00..
..0LLLLLLLLLL0..
..0LLLL00LLLL0..
..0L00L00L00L0..
..0LLLLLLLLLL0..
..00LLLLLLLL00..
..000000000000..
................`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
11L1111111111L11
11L1111111111L11
LLLLLLLLLLLLLLLL
1111101111111101
LLLLL0LLLLLLLL0L
LLLLL0LLLLLLLL0L
0000000000000000
1011111111011111
L0LLLLLLLL0LLLLL
L0LLLLLLLL0LLLLL
0000000000000000
1111011111111101
LLLL0LLLLLLLLL0L
LLLL0LLLLLLLLL0L
0000000000000000`],
  [wall2, bitmap`
1101111111111011
LL0LLLLLLLLLL0LL
LL0LLLLLLLLLL0LL
0000000000000000
1111101111111101
LLLLL0LLLLLLLL0L
LLLLL0LLLLLLLL0L
0000000000000000
1011111111011111
L0LLLLLLLL0LLLLL
L0LLLLLLLL0LLLLL
0000000000000000
1111011111111101
LLLL0LLLLLLLLL0L
LLLL0LLLLLLLLL0L
0000000000000000`],
  [moss, bitmap`
1101111111111011
LL0LLLLLLLLLL0LL
LL0LLLLLLLLLL0LL
0440000000000000
1DD4101DD4D11101
LLLDD0LDLL4LLL0L
LLLLL0L4LLLLLL0L
0000000D00D00000
1011111D114D1D44
L04DDLLDLL0D4DLL
L4DLD4DLLL0LLLLL
0D00000000000000
4D11011111D41101
LLLL0LLLLLLD4L0L
LLLL0LLLLLLLDL0L
0000000000000000`],
  [goal, bitmap`
....CCCCCCCC....
..CCFFFFFFFFCC..
.CFFCCCCCCCCFFC.
.CCCCCFCCFFCCCC.
.CCFCFFCFFFCFCC.
.CCFCFFCCFCCFCC.
.CCFCFFFCFFCFCC.
.CFFCFFCCFFCFFC.
.CCFCFCCCCFCFFC.
.CFFCFC63CFCFCC.
.CFFCFC39CFCFFC.
.CFFCFCCCCFCFCC.
.CCFCFFCCFFCFFC.
.CFFCFFCFFFCFFC.
.CCFCFFCCFFCFCC.
.CCCCCCCCCCCCCC.`],
  [lockRed, bitmap`
1101111111111011
LL0LLLLLLLLLL0LL
LL0LLLLLLLLLL0LL
0000000000000000
1111101CC1111101
LLLLL0C32CLLLL0L
LLLLLC3332CLLL0L
0000C333333C0000
1011C333333C1111
L0LLLC2333CLLLLL
L0LLLLC23C0LLLLL
0000000CC0000000
1111011111111101
LLLL0LLLLLLLLL0L
LLLL0LLLLLLLLL0L
0000000000000000`],
  [lockGreen, bitmap`
1101111111111011
LL0LLLLLLLLLL0LL
LL0LLLLLLLLLL0LL
0000000000000000
1111101DD1111101
LLLLL0D42DLLLL0L
LLLLLD4442DLLL0L
0000D444444D0000
1011D444444D1111
L0LLLD2444DLLLLL
L0LLLLD24D0LLLLL
0000000DD0000000
1111011111111101
LLLL0LLLLLLLLL0L
LLLL0LLLLLLLLL0L
0000000000000000`],
  [buttonRed, bitmap`
................
................
................
................
................
................
................
....22333333....
...2333333333...
...3333333333...
...3333333332...
...C33333322C...
...CCCCCCCCCC...
....CCCCCCCC....
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
....22444444....
...2444444444...
...4444444444...
...4444444442...
...D44444422D...
...DDDDDDDDDD...
....DDDDDDDD....
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
  [grass, bitmap`
1111111111111111
1111111111111111
1111141111111111
111111D411111111
1111111111111111
1111111111111141
1111111111141D11
111111111111D111
1111111111111111
1111111111111111
1111114111111111
11114D1111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [pushRight, bitmap`
................
................
................
..........4.....
....4..44.44....
..........444...
..444444444444..
..4444444444444.
..444444444444D.
..DDDDDDDD444D..
..........44D...
.....DD.D.4D....
..........D.....
................
................
................`],
  [pushDown, bitmap`
................
......4444......
......4444......
......4444.4....
....4.4444......
....4.4444......
......4444.D....
....D.4444.D....
......4444......
...4444444444...
...D44444444D...
....D444444D....
.....D4444D.....
......D44D......
.......DD.......
................`],
  [invisPotion, bitmap`
................
................
................
................
.........LLC....
........LFCL....
......LL..FL....
.....L7...L.....
.....02752L.....
.....057270.....
.....075750.....
......0000......
................
................
................
................`],
  [crackedWall, bitmap`
1101111111111011
LL0LLLLLLLLLL00L
LL0LLLLLLLLL00LL
0000000000000000
1101101111011101
LLL0L0LL00LLLL0L
LLLL00L0LL0LLL0L
0000000000000000
1011010111000111
L0LLL00LLL0LL0LL
L0LLLLL0LL0LLL0L
0000000000000000
1111010101111101
LLLL00LLL0LLLL0L
LLLL0LLLLL00LL0L
0000000000000000`],
  [egg, bitmap`
................
................
.......00.......
......0220......
.....022220.....
.....022220.....
....02222220....
....02221220....
....012L2220....
....01L12210....
.....011110.....
......0000......
................
................
................
................`]
)
let solids = [player, box, wall, wall2, lockRed, lockGreen, moss];
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
wwwwww
Wpb.gW
WwbwwW
WWg.WW
W..gdW
WwwwwW`,
  map`
wwwwwwwwwww
Wp.gWBb...W
Www.W.wwwgW
W.g.Wg..W.W
W.w.W.w.W.W
W.W.W.W.W.W
W.W.WlWgW.W
WgW.WdW...W
W.W.WwWwwgW
W.Wg....W.W
W.Wwwww.W.W
W.gB..bg..W
WwwwwwwwwwW
WWWWWWWWWWW`,
  map`
wwwwwww
Wpg..WW
W..b1.W
Wwww.wW
Wg..g.W
Ww.gb.W
Wd2..gW
Ww.wwwW
WWwWWWW`,
  map`
wwwwwwwww
W.g.W...W
W..gb.g.W
Wg..wg..W
W.immwbwW
WpgWmmgdW
WwwWWWwwW`,
  map`
wwwwwwwwwwwwwww
WBWWfWWWWWWW.WW
WLgWbWWWWWWg..W
Wgb.bgWWWWW...W
W.g.WWWcWWW.dgW
W.b1g.WWWWW.g.W
Wb.bwwWWWWWg.wW
WLgplimmmmm.gWW
WWwwwwWWWWWwwWW
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
  solids = [player, box, wall, wall2, lockGreen, lockRed, moss];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// onInput("j", () => {
//   if(tilesWith(invisPotion, player).length === tilesWith(invisPotion).length){
//     allSolids = setSolids([player]); 
//   }
// }


onInput("l", () => {

  if (level === 5 && egg_collected === false && getTile(7, 4).length === 2) {
      level = 0
      setMap(levels[0])
      egg_collected = true
  } else {
  
    const targetNumber = tilesWith(goal).length;
  
    const numberCovered = tilesWith(goal, player).length;
  
    if(numberCovered === targetNumber) {
  
       level = level + 1
      
      const currentLevel = levels[level];
  
      if (currentLevel !== undefined) {
        setMap(currentLevel);
      } else {
        addText("you win!", { y: 4, color: color`2` });
      }
    }
  }
});

// afterInput(() => {

//   const targetNumber = tilesWith(crackedWall).length;

//   const numberCovered = tilesWith(crackedWall, player).length;

//   if(numberCovered === targetNumber) {

//     level = level + 1
//   }
// });

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
  const targetNumber = tilesWith(invisPotion).length;
  const numberCovered = tilesWith(invisPotion, player).length;
  // Checks condition to see if player is on potion 
  if (targetNumber != 0 && numberCovered === targetNumber) {
    // Makes walls able to be passed through
    solids = [player];
    invis = true;
    count = 5;
    getFirst(invisPotion).remove();
  }

  const eggtargetNumber = tilesWith(egg).length;
  const eggnumberCovered = tilesWith(egg, player).length;
  if (eggtargetNumber != 0 && eggnumberCovered === eggtargetNumber) {
    getFirst(egg).remove();
  }
  if (count === 0) {
    solids = [player, box, wall, wall2, lockRed, lockGreen, moss];
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

    addText("'a' to Interact", { y: 15, color: color`2` });
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
      addText("'x' to Reset", { y: 15, color: color`2` });
    } else if (numberCovered === targetNumber) {
      addText("'a' to Interact", { y: 15, color: color`2` });
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
