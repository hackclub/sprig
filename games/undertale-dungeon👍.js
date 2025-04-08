/* 
@title: undertale dungeon
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
.....CCCCC......
.....0FFF0......
.....0FFF0......
.....FFFFF......
...CCCCLCCCC....
...CCCCLCCCC....
...CCCC6CCCC....
...FFC555CFF....
.....55555......
.....55555......
.....55.55......
.....00.00......`],
  [box, bitmap`
................
................
................
................
..00000.........
.0221110........
022111110.......
0101101110......
01111111L0......
011001LLLL0000..
011111LLLL11110.
01111LLL1111110.
0111111111111110
0L11111111111110
0LL1111111111110
.000000000000000`],
  [wall, bitmap`
0000000000000000
88H8888888888088
HH0HHHHHHHHHH0HH
0000000000000000
8888808888888808
HHHHH0HHHHHHHH0H
HHHHH0HHHHHHHH0H
0000000000000000
8088888888088888
H0HHHHHHHH0HHHHH
H0HHHHHHHH0HHHHH
0000000000000000
8888088888888808
HHHH0HHHHHHHHH0H
HHHH0HHHHHHHHH0H
0000000000000000`],
  [wall2, bitmap`
8808888888888088
HH0HHHHHHHHHH0HH
HH0HHHHHHHHHH0HH
0000000000000000
8888808888888808
HHHHH0HHHHHHHH0H
HHHHH0HHHHHHHH0H
0000000000000000
8088888888088888
H0HHHHHHHH0HHHHH
H0HHHHHHHH0HHHHH
0000000000000000
8888088888888808
HHHH0HHHHHHHHH0H
HHHH0HHHHHHHHH0H
0000000000000000`],
  [moss, bitmap`
8808888888888088
HH0HHHHHHHHHH0HH
HH0HHHHHHHHHH0HH
0440000000000000
8DD4808DD4D88808
HHHDD0HDHH4HHH0H
HHHHH0H4HHHHHH0H
0000000D00D00000
8088888D884D8D44
H04DDHHDHH0D4DHH
H4DHD4DHHH0HHHHH
0D00000000000000
4D88088888D48808
HHHH0HHHHHHD4H0H
HHHH0HHHHHHHDH0H
0000000000000000`],
  [goal, bitmap`
....00000000....
..00HH8H88HH00..
.088LLLLLLLL880.
.0LLLL8LLHHLLL0.
.0LHL8HLHHHLHL0.
.0LHL8HLLHLLHL0.
.0LHL8H8L8HLHL0.
.0HHL88LL8HLHH0.
.0LHLHLLLL8LHH0.
.08HLHL38L8LHL0.
.08HLHL83LHLH80.
.08HLHLLLLHLHL0.
.0LHLH8LL8HLH80.
.088LH8L88HLH80.
.0L8L88LL8HL8L0.
.00000000000000.`],
  [lockRed, bitmap`
8808888888888088
HH0HHHHHHHHHH0HH
HH0HHHHHHHHHH0HH
0000000000000000
8888808LLL888808
HHHHH0LHHHLHHH0H
HHHHH0LHHHLHHH0H
0000003333300000
8088883303388888
H0HHHH33033HHHHH
H0HHHH33333HHHHH
0000000000000000
8888088888888808
HHHH0HHHHHHHHH0H
HHHH0HHHHHHHHH0H
0000000000000000`],
  [lockGreen, bitmap`
8808888888888088
HH0HHHHHHHHHH0HH
HH0HHHHHHHHHH0HH
0000000000000000
888880LLLL888808
HHHHHLHHHHLHHH0H
HHHHHLHHHHLHHH0H
00000DDDDDD00000
80888D4444D88888
H0HHHD4444DHHHHH
H0HHHD4444DHHHHH
00000DDDDDD00000
8888088888888808
HHHH0HHHHHHHHH0H
HHHH0HHHHHHHHH0H
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
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
  [grass, bitmap`
8888888888888888
8828888888821888
8211888881111888
1L111888L1118888
8LL111888LL11188
8888188888LL1888
8888888888881888
8888888888888888
8888888888888888
8888888881288888
888888888L118888
888188888LL11888
8821188888888888
8L1L118888888888
88L8888888888888
8888888888888888`],
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
880D4D88880D4D88
HHDDD4DHHH0D4DHH
HD4DD4DHHH0D4DHH
0D4D0D4DDD0D4D00
8D44DD4444D4D808
HDD4DD4DDD4DHH0H
HHHDD4DHHDD4DH0H
0000D4D000D4D000
80888D4D88D4D888
H0HHHD4DHHD4DHHH
H0HHHD4DHDD4DHHH
00000D4D0DD4D000
8888D4D88D4D8808
HHHHD4DHDD4DHH0H
HHHDD4DHD4DHHH0H
000D4D00D4D00000`],
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

var mPart1 = tune`
125: A4^125,
1250,
125: A4^125,
125: A4^125,
125: A4^125,
125,
125: A4^125,
125: A4^125,
250,
125: G4^125,
125: A4^125,
750,
125: A4^125,
125: A4^125,
125: A4^125,
125,
125: A4^125`;
var mPart2 = tune`
125: A4^125,
250,
125: G4^125,
125: A4^125,
750,
125: A4^125,
125: A4^125,
125: A4^125,
125,
125: A4^125,
125: A4^125,
125,
125: E4^125,
125: E4^125,
125: E4^125,
125,
125: E4^125,
125: E4^125,
125: E4^125,
125,
125: E4^125,
125: E4^125,
125: E4^125,
125,
125: E4^125,
125`;
var mPart3 = tune`
125: A4^125,
375,
125: E4^125,
625,
125: A4^125,
125,
125: A4^125,
125: B4^125,
125: C5^125,
125: D5^125,
125: E5^125,
1125,
125: E5^125,
125,
125: E5^125,
125: F5^125,
125,
125: G5^125`;
var mPart4 = tune`
125: A5^125,
1125,
125: A5^125,
125,
125: A5^125,
125: G5^125,
125,
125: F5^125,
125: G5^125,
250,
125: F5^125,
125: E5^125,
875,
125: E5^125,
375`;
var mPart5 = tune`
125: D5^125,
125,
125: D5^125,
125: E5^125,
125: F5^125,
875,
125: E5^125,
125,
125: D5^125,
125,
125: C5^125,
125,
125: C5^125,
125: D5^125,
125: E5^125,
875,
125: D5^125,
125,
125: C5^125,
125`;
var mPart6 = tune`
125: B4^125,
125,
125: B4^125,
125: C5^125,
125: D5^125,
875,
125: F5^125,
375,
125: E5^125,
125,
125: E4^125,
125: E4^125,
125: E4^125,
125,
125: E4^125,
125: E4^125,
125: E4^125,
125,
125: E4^125,
125: E4^125,
125: E4^125,
125,
125: E4^125,
125`;

var bPart1 = tune`
125: A4~125 + E4~125,
375,
125: A4~125 + E4~125,
375,
125: A4~125 + E4~125,
375,
125: A4~125 + E4~125,
375,
125: G4~125 + D4~125,
375,
125: G4~125 + D4~125,
375,
125: G4~125 + D4~125,
375,
125: G4~125 + D4~125,
375`;
var bPart2 = tune`
125: C4~125 + F4~125,
375,
125: F4~125 + C4~125,
375,
125: F4~125 + C4~125,
375,
125: F4~125 + C4~125,
375,
125: E4~125 + C4~125,
375,
125: E4~125 + C4~125,
375,
125: E4~125 + C4~125,
375,
125: E4~125 + C4~125,
375`;
var bPart3 = tune`
125: A4~125 + E4~125,
375,
125: A4~125 + E4~125,
375,
125: A4~125 + E4~125,
375,
125: A4~125 + E4~125,
375,
125: G4~125 + D4~125,
375,
125: G4~125 + D4~125,
375,
125: G4~125 + D4~125,
375,
125: G4~125 + D4~125,
375`;
var bPart4 = tune`
125: C4~125 + F4~125,
375,
125: F4~125 + C4~125,
375,
125: F4~125 + C4~125,
375,
125: F4~125 + C4~125,
375,
125: G4~125 + E4~125,
375,
125: G4~125 + E4~125,
375,
125: G4~125 + E4~125,
375,
125: G4~125 + E4~125,
375`;
var bPart5 = tune`
125: D4~125 + F4~125,
375,
125: F4~125 + D4~125,
375,
125: F4~125 + D4~125,
375,
125: F4~125 + D4~125,
375,
125: E4~125 + C4~125,
375,
125: E4~125 + C4~125,
375,
125: E4~125 + C4~125,
375,
125: E4~125 + C4~125,
375`;
var bPart6 = tune`
125: D4~125 + C4~125,
375,
125: D4~125 + C4~125,
375,
125: D4~125 + C4~125,
375,
125: D4~125 + C4~125,
375,
125: C4~125 + E4~125,
375,
125: C4~125 + E4~125,
375,
125: C4~125 + E4~125,
375,
125: C4~125 + E4~125,
375`;

async function playMusic() {
  playTune(mPart1);
  playTune(bPart1);
  setTimeout(() => {
    playTune(mPart2);
    playTune(bPart2);
    setTimeout(musicLoop, 4000);
  }, 4000);
}

async function musicLoop() {
  playTune(mPart3);
  playTune(bPart3);
  setTimeout(() => {
    playTune(mPart4);
    playTune(bPart4);
    setTimeout(() => {
      playTune(mPart5);
      playTune(bPart5);
      setTimeout(() => {
        playTune(mPart6);
        playTune(bPart6);
        setTimeout(musicLoop, 4000);
      }, 4000);
    }, 4000);
  }, 4000);
}