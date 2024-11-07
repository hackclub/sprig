/*
@title: Escape Arcade Prison!
@author: Felix Gao
@tags: ['puzzle']
@addedOn: 2024-07-29
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started


*/

// People lol
const player = "p";
const player2 = "o";

const guard = "g";
const guard2 = "f";

// Misc
const levelUp = "l"
const wall = "w";

// Lasers!
const laserVert = "v";
const laserVertOff = "c";

const laserHorz = "h";
const laserHorzOff = "j";

const buffDoor = "a";
const strongDoor = "u";

  // This door is never unlockable
const door = "d";
const doorHorz = "s";
  
const doorLocked = "z";
const doorLockedHorz = "x";

const key = "k";
const masterKey = "m";
const wardenKey = "n";

let vault = "y";

// Minigame stuff
// WIP!
const lockPin = "r";
const lockPinDone = "e";
const goalLine = "t";

let lockTimer = 15;
let stopPin = false;

let pinSelection = null;
let pinsFinished = 0;

let pinSprite = null;
let yPath = cyclicIteration([0, 1, 2, 3, 4]);

let attempts = 4;

let pinTimer = null;
let minigameTimer = null;

// The 3 things the player needs to do to escape
let playerStats = {
  getWardenKey: false,
  lockpickMinigameDone: false,
  getMainKey: false
};

setLegend(
  [player, bitmap`
................
................
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666006006..
..666666006006..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
................
................`],
  [player2, bitmap`
................
................
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..600600666666..
..600600666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
................
................`],
  [guard, bitmap`
................
................
..333333333333..
..333333333333..
..333333333333..
..333333003003..
..333333003003..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
................
................`],
  [guard2, bitmap`
................
................
..333333333333..
..333333333333..
..333333333333..
..300300333333..
..300300333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
................
................`],
  
  [wall, bitmap`
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
0000000000000000`],
  
  [laserVert, bitmap`
................
................
................
................
................
L..............L
L1............1L
L13333333333331L
L1............1L
L..............L
................
................
................
................
................
................`],
  [laserVertOff, bitmap`
................
................
................
................
................
L..............L
L1............1L
L1............1L
L1............1L
L..............L
................
................
................
................
................
................`],
  [laserHorz, bitmap`
......LLLLL.....
.......111......
........3.......
........3.......
........3.......
........3.......
........3.......
........3.......
........3.......
........3.......
........3.......
........3.......
........3.......
........3.......
.......111......
......LLLLL.....`],
  [laserHorzOff, bitmap`
......LLLLL.....
.......111......
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
.......111......
......LLLLL.....`],

  [buffDoor, bitmap`
....LLLLLLL.....
....L33333L.....
....L33333L.....
....L33333L.....
....L33333L.....
....L33333L.....
....L33333L.....
....L33333L.....
....L33333L.....
....L33333L.....
....L33333L.....
....L33333L.....
....L33333L.....
....L33333L.....
....L33333L.....
....LLLLLLL.....`],
  [strongDoor, bitmap`
....LLLLLLL.....
....L55555L.....
....L55555L.....
....L55555L.....
....L55555L.....
....L55555L.....
....L55555L.....
....L55555L.....
....L55555L.....
....L55555L.....
....L55555L.....
....L55555L.....
....L55555L.....
....L55555L.....
....L55555L.....
....LLLLLLL.....`],
  
  [door, bitmap`
....LLLLLLL.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....LLLLLLL.....`],
  [doorHorz, bitmap`
................
................
................
................
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL
................
................
................
................
................`],
  [doorLocked, bitmap`
.....LLLLLLL....
.....L11111L....
.....L11111L....
.....L11111L....
.....L16661L....
.....L61116L....
.....L61116L....
.....L16661L....
.....L11611L....
.....L11661L....
.....L11611L....
.....L11661L....
.....L11111L....
.....L11111L....
.....L11111L....
.....LLLLLLL....`],
  [doorLockedHorz, bitmap`
................
................
................
................
................
LLLLLLL66LLLLLLL
L11111611611111L
L11111611611111L
L11111166111111L
L11111161111111L
L11111166111111L
LLLLLLL6LLLLLLLL
.......66.......
................
................
................`],
  
  [key, bitmap`
................
................
................
................
......999.......
.....9...9......
.....9...9......
......999.......
.......9........
.......99.......
.......9........
.......99.......
................
................
................
................`],
  [masterKey, bitmap`
................
................
................
................
......333.......
.....3...3......
.....3...3......
......333.......
.......3........
.......33.......
.......3........
.......33.......
................
................
................
................`],
  [wardenKey, bitmap`
................
................
................
................
......555.......
.....5...5......
.....5...5......
......555.......
.......5........
.......55.......
.......5........
.......55.......
................
................
................
................`],
  
  [lockPin, bitmap`
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
................`],
  [lockPinDone, bitmap`
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
................`],
  [goalLine, bitmap`
................
................
................
................
................
................
6666666666666666
6666666666666666
6666666666666666
6666666666666666
................
................
................
................
................
................`],
  [vault, bitmap`
................
.LLLLLLLLLLLLLL.
.L111111111111L.
.L111111111111L.
.L111111111111L.
.L111111111111L.
.L111L11111111L.
.L11LLL1111111L.
.L1LL0LL111111L.
.L11LLL1111111L.
.L111L11111111L.
.L111111111111L.
.L111111111111L.
.L111111111111L.
.LLLLLLLLLLLLLL.
................`]
)

// Setup levels and different misc. screens here
// Using 13x9 size for most maps
// NOTE SELF: Each level should have the playerlw
const levels = [
  [
    map`
.............
.............
.............
.............
.............
www.wwwswwwsw
w...w...w...w
w..pw...w...w
wwwwwwwwwwwww`,
    map`
........w....
........w....
........wwwww
........h....
p.......h....
wwwswwwswwwww
w...w...w....
w...w...w....
wwwwwwwww....`,
    map`
..........w..
..........w.k
wwwww..wwww..
..........w..
.p......f.wvv
wwwwwxxw..w..
....wvvw..h..
....d..w..h..
....w..wwwwww`
  ],
  [
    map`
wwwwwwwwww...
w........w...
w.....g..w...
w........wwww
wwwwww...uh..
w..j.h...uho.
w..j.h...uh..
wy.j.h...wwww
wwwwwwwwww...`,
    map`
....wwwwwww..
....w.....w..
....w.....w..
wwwwwwwcwwwww
....h.....h..
..g.h.....ho.
....h.....h..
wwwwww...wwww
.....w...w...`,
    map`
....w..w.....
....wp.w.....
....w..w.....
wwwwwvvwwwwww
..h.j..j.h.ja
..h.j..jfh.ja
..h.j..j.h.ja
wwwwwvvwwwwww
....w..w.....`,
    map`
.............
.............
.............
.............
p............
.............
.............
.............
.............` // <= This map is just for win state lol
  ],
  [
    map`
wwwwwwwwww...
w........wwww
w.....g..uh..
w........uho.
wwwww....uh..
w.j.h....wwww
wmj.h....w...
w.j.h....w...
wwwwwwwwww...`,
    map`
.....w...w...
wwwwww.p.wwww
..j.h.....h..
..j.h.....h..
..j.h.....h..
wwwwwwwwwwwww
.............
.............
.............`,
    map`
...w...w.....
wwww.p.wwwwww
..h....w....w
..h....w..n.w
..h....j....w
wwwwwwwwwwwww
.............
.............
.............`
  ]
]

// Misc settings

const guardPath = [
  [
    null,
    null,
    [
    [7,4],
    [6,4],
    [5,4],
    [4,4],
    [3,4]
  ]
  ],
  [
    [
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6]
    ],
    [
      [2, 5],
      [3, 5],
      [4, 5],
      [5, 5],
      [6, 5],
      [7, 5],
      [8, 5],
      [9, 5],
      [10, 5]
    ],
    [
      [8, 5],
      [7, 5],
      [6, 5],
      [5, 5],
      [4, 5],
      [3, 5],
      [2, 5]
    ]
  ],
  [
    [
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6]
    ],
    null,
    null
  ]
]

const screenText = [
  [
    [
      ["Quick! >>>", { x: 4, y: 3, color: color`0`}]
    ], 
    [
      ["Keep going!", { x: 1, y: 3, color: color`0`}]
    ], 
    [
      ["Hide here!", { x: 2, y: 2, color: color`0`}]
    ]
  ],
  [
    null, 
    null,
    ["Exit?", { x: 2, y: 2, color: color`0`}],
    [">>>", { x: 2, y: 3, color: color`0`}]
  ],
  [
    null,
    null,
    null
  ]
]

const misc = {
  welcome: map`
.............
.............
.............
.............
.............
.............
.............
.............
.............`,
  lost: map`
.............
.............
.............
.............
.............
.............
wwwswwwswwwsw
w...w...w...w
w..pw...w...w
wwwwwwwwwwwww`,
  victory: map`
.w...........
.w...........
ww...........
.d...........
.d...........
ww...........
.w....p......
.w...........
.w...........`,
  tutorialFriendly: map`
.............
.p...........
.............
.z...........
.............
.k...........
.............
.............
.............`,
  tutorialHostile: map`
.............
.g...........
.............
.h...........
.............
.d...........
.............
.............
.............`,
  lockGame: map`
r.r.r.rw
.......w
tttttttw
.......w
.......w`,
}

const music = {
  caught: tune`
500: A4-500 + G4-500 + F4-500 + E4-500,
500,
500: G4-500 + F4-500 + E4-500 + D4-500,
14500`,
  background: tune`
500: D5-500,
500: C5^500 + G4^500,
500: F4^500 + C4^500 + D5-500 + B4~500,
500: C5^500,
500: A4-500,
500: C5^500 + G4^500,
500: F4^500 + C4^500 + B4-500 + D5~500,
500: C5^500,
500: D5-500,
500: C5^500 + G4^500,
500: F4^500 + C4^500 + B4-500 + D5~500,
500: C5^500,
500: A4-500,
500: C5^500 + G4^500,
500: F4^500 + C4^500 + D5-500 + B4~500,
500: C5^500,
500: D5-500,
500: C5^500 + G4^500,
500: F4^500 + C4^500 + D5-500 + B4~500,
500: C5^500,
500: A4-500,
500: C5^500 + G4^500,
500: F4^500 + C4^500 + D5~500 + B4-500,
500: C5^500,
500: D5-500,
500: C5^500 + G4^500,
500: F4^500 + C4^500 + B4-500 + D5~500,
500: C5^500,
500: A4-500,
500: C5^500 + G4^500,
500: F4^500 + C4^500 + D5-500 + B4~500,
500: C5^500`,
  victory: tune`
410.958904109589: E4-410.958904109589,
410.958904109589: F4-410.958904109589,
410.958904109589: B4-410.958904109589,
410.958904109589: C5-410.958904109589 + C4^410.958904109589,
410.958904109589,
410.958904109589: C4-410.958904109589 + C5^410.958904109589,
10684.931506849314`,

  correct: tune`
500: F5-500 + C5-500 + G4/500,
500: G5-500 + C5-500 + G4/500,
15000`,
  missed: tune`
500: D5/500 + G4-500,
500: G4/500 + D4-500,
15000`
}

let levelX = 0
let levelY = 0

let minigame = false;
let tutorial = true;
let restart = false;

let game = null;
let guardAI = null;
let iterator = null;
var timer = 300;

let playback = playTune(music.background, Infinity);

setSolids([player, player2, wall, door, buffDoor, strongDoor, doorHorz, doorLocked, doorLockedHorz, guard, guard2]);

setPushables({
  [player]: []
});

// Tutorial prompt
let x_align = 4;

// Tutorial text is stored in a var for convenience
let tutorialText = [
  [
    ["You!", { x: x_align, y: 3, color: color`0`}],
    ["Locked door", { x: x_align, y: 6, color: color`0`}],
    ["Key = open", { x: x_align, y: 9, color: color`0`}],
  ],
  [
    ["Avoid Guards", { x: x_align, y: 3, color: color`0` }],
    ["Avoid lasers", { x: x_align, y: 6, color: color`0` }],
    ["perma-lock door", { x: x_align, y: 9, color: color`0` }]
  ],
  [
    ["Escape Arcade JAIL:", { x: 0, y: 3, color: color`D` }],
    ["You have been caught", { x: 0, y: 5, color: color`0` }],
    ["faking points. You", { x: 0, y: 6, color: color`0` }],
    ["have been sentenced to", { x: 0, y: 7, color: color`0` }],
    ["LIFE in Arcade jail.", { x: 0, y: 8, color: color`0` }],
    ["Tip: tutorial loops", { x: 0, y: 11, color: color`9` }],
    ["check git for more", { x: 0, y: 12, color: color`9` }]
  ]
]

setMap(misc.welcome);
tutorialText[2].forEach((text) => addText(text[0], options=text[1]));
addText("Press 'L' to play!", options = { x: 1, y: 14, color: color`5` });

tutorialScreen = setInterval(tutorialAnimation, 4000);

let tutorialFlag = 1;
function tutorialAnimation() {
  clearText();
  if (tutorialFlag == 1) {
    setMap(misc.tutorialFriendly);
    tutorialText[0].forEach((text) => addText(text[0], options=text[1]));
    addText("Press 'L' to play!", options = { x: 1, y: 14, color: color`5` });
    tutorialFlag++;
  } else if (tutorialFlag == 2) {
    setMap(misc.tutorialHostile);
    tutorialText[1].forEach((text) => addText(text[0], options=text[1]));
    addText("Press 'L' to play!", options = { x: 1, y: 14, color: color`5` });
    tutorialFlag++;
  } else {
    setMap(misc.welcome);
    tutorialText[2].forEach((text) => addText(text[0], options=text[1]));
    addText("Press 'L' to play!", options = { x: 1, y: 14, color: color`5` });
    tutorialFlag = 1;
  }
}
// END TUTORIAL!


// inputs for player movement control
onInput("w", () => {
  if (!tutorial && !minigame) {
    const savedPlayerSprite = getPlayer();
    getPlayer().y -= 1
    if (getPlayer().y == 0) {
      try {
        setMap(levels[levelY - 1][levelX]);
        getPlayer().x = savedPlayerSprite.x;
        getPlayer().y = height() - 1;      
        levelY -= 1;
        nextMap();
      } catch (error) {
        console.log(`Attempted to move up:\n${levelY} ${levelX}`)
      }
    }
  }
});

onInput("a", () => {
  if (!tutorial && !minigame) {
    const savedPlayerSprite = getPlayer();
    getPlayer().x -= 1;
    getPlayer().type = "o";

    if (getPlayer().x == 0) {
      try {
        setMap(levels[levelY][levelX - 1]);
        getPlayer().x = width() - 1;
        getPlayer().y = savedPlayerSprite.y;
        levelX -= 1;
        nextMap();
      } catch (error) {
        console.log(`Attempted to move left:\n${levelY} ${levelX}`)
      }
    }  
  }
});

onInput("s", () => {
  if (!tutorial && !minigame) {
    const savedPlayerSprite = getPlayer();
    getPlayer().y += 1
    
    if (getPlayer().y == height() - 1) {
      try {
        setMap(levels[levelY + 1][levelX]);
        getPlayer().x = savedPlayerSprite.x;
        getPlayer().y = 0;
        levelY += 1;
        nextMap();
      } catch (error) {
        console.log(`Attempted to move down:\n${levelY} ${levelX}`)
      }
    }
  }
});

onInput("d", () => {
  if (!tutorial && !minigame) {
    const savedPlayerSprite = getPlayer();
    getPlayer().x += 1;
    getPlayer().type = "p";
  
    if (getPlayer().x == width() - 1) {
      try {
        setMap(levels[levelY][levelX + 1]);
        getPlayer().x = 0;
        getPlayer().y = savedPlayerSprite.y;
        levelX += 1;
        nextMap();
      } catch (error) {
        console.log(`Attempted to move right:\n${levelY} ${levelX}`)
      }
    }
  }
});

onInput("l", () => {
  if (tutorial) { // Start the game!
    levelX = 0;
    levelY = 0;
    clearInterval(tutorialScreen);
    setMap(levels[0][0]);
    clearText();
    
    game = setInterval(updateGame, 1000);
    guardAI = setInterval(runGuard, 2000);
    iterator = cyclicIteration(guardPath[levelY][levelX]);
    if (screenText[levelX][levelY] != null) {
      screenText[levelX][levelY].forEach((text) => addText(text[0], options=text[1]));
    }
    tutorial = false;
    
  } else if (restart && timer > 30) { // Restart game if caught
    timer = timer - 30 // Pentaly for getting caught

    levelX = 0;
    levelY = 0;
    setMap(levels[0][0]);
    clearText();
    game = setInterval(updateGame, 1000);
    guardAI = setInterval(runGuard, 1000);
    iterator = cyclicIteration(guardPath[0][0]);
    playback = playTune(music.background, Infinity);
    restart = false;
  }
});

// Keybinds for the lockpick minigame
// inputs for player movement control
let victory = false;
onInput("i", () => {
  if (minigame) {
    getTile(getFirst("r").x, getFirst("r").y).forEach(sprites => {
      if (sprites.type == "t") {
        victory = true;
      }
    });
    if (victory) {
      getFirst("r").type = "e";
      victory = false;
      yPath = cyclicIteration([0, 1, 2, 3, 4])
      pinsFinished++;
      if (pinsFinished == 2) { // When we finish more pins, the rest go faster
        clearInterval(pinTimer);
        pinTimer = setInterval(pinDown, 300);
      } else if (pinsFinished >= 3) {
        clearInterval(pinTimer);
        pinTimer = setInterval(pinDown, 250);
      }
    } else {
      attempts--;
      splashText(`${attempts}/4 trys left!`, 3000, false);
    }
    if (attempts <= 0) {
      clearInterval(pinTimer);
      clearInterval(minigameTimer);
      clearText();
      addText("You lost!", {color: color`2`});
      setCaught();
      minigame = false;
    }
  }
});

let playerPos = null;
function startLockGame() {
  clearText();
  playerPos = getPlayer();
  attempts = 4;      // Reset the attempts
  pinsFinished = 0;  // & progress of minigame
  let minigameTimerCount = 15;
  minigame = true;
  clearInterval(game);
  clearInterval(guardAI);
  pinTimer = setInterval(pinDown, 500);
  minigameTimer = setInterval(runTimer, 1000);
  setMap(misc.lockGame);
}

let minigameTimerCount = 15;
function runTimer() {
  addText(`Pick lock in ${minigameTimerCount} secs`, { x: 0, y: 0, color: color`2`});
  if (timer <= 0) {
    setCaught();
    minigame = false;
  }
  minigameTimerCount--;
}

function pinDown() {
  try {
    pinSprite = getFirst("r");
    if (pinSprite != null) {
      pinSprite.y = yPath.next().value;
    } else if (pinsFinished == 4) { // <= This determines if we win da minigame
      clearInterval(pinTimer);
      clearInterval(minigameTimer);
      
      game = setInterval(updateGame, 1000);
      guardAI = setInterval(runGuard, 1000);
      
      splashText("Unlocked vault!");
      setMap(levels[levelY][levelX]);
      
      getPlayer().x = playerPos.x;
      getPlayer().y = playerPos.y;
      
      getPlayer().type = playerPos.type;
      victory = false;
      minigame = false; // <= Allow player movement and loops to continue
      playerStats.lockpickMinigameDone = true;
      getFirst("y").remove();
      nextMap();
    }
  } catch (error) {
    console.log(error);
  }
}


// Add text to screen and remove it, for quick messages
function splashText(text, time = 3000, addTextBack = true) {
  let options = {y: 15, color: color`6` };
  addText(text, options=options);
  setTimeout( function() {
    clearText();
    if (addTextBack) {
      timerText = addText(`Escape in ${timer} secs`, { x: 1, y: 0, color: color`2`});
      if (screenText[levelY][levelX] != null) {
        screenText[levelY][levelX].forEach((text) => addText(text[0], options=text[1]));
      }
    }
  }, time); //Clear splash text and put other text back
}

function blockHas(block, item) {
  for (let sprite of block) {
    if (sprite.type == item) {
      return true;
    }
  }
  return false;
}

function getPlayer() {
  let playerModel = null;
  if (getFirst("p") !== undefined) {
      playerModel = getFirst("p");
  } else if (getFirst("o") !== undefined) {
      playerModel = getFirst("o");
  } else {
    throw new Error('No player sprite');
  }
  return playerModel;
}

function getGuard() {
  let GuardModel = null;
  if (getFirst("g") !== undefined) {
      GuardModel = getFirst("g");
  } else if (getFirst("f") !== undefined) {
      GuardModel = getFirst("f");
  }
  return GuardModel;
}


// Iterate infinitely front and back
// CREDIT: ChatGPT, modified code
function cyclicIteration(array) {
  if (array == null) {
    return null
  }
  let index = 0;
  let direction = 1;
  let directionStr = "";

  // Store the last move to calculate guard NPC animation
  let lastMove = null;

  return {
    next: function() {
      if (index === array.length - 1) {
        direction = -1;
      } else if (index == 0) {
        direction = 1;
      }

      const currentValue = array[index];
      index += direction;
      
      if (lastMove == null) {
        lastMove = currentValue;
        return {value: currentValue, directionStr: "nothing yet"};
      }
      
      let difference = lastMove[0] - currentValue[0];
      if (difference >= 1) { // If the x is increasing / moving left <<<
        directionStr = "left";
      } else if (difference <= -1) { // If the x is decreasing / moving right >>>
        directionStr = "right";
      } else { // else then not moving left or right
        directionStr = "up/down"
      }

      lastMove = currentValue;
      return {value: currentValue, direction: directionStr};
    }
  };
}

// Aw man I got caught by a guard!
function setCaught(allowRestart = true) {
  playback.end();
  playTune(music.caught);
  clearText(); // Clear text which may be onscreen before adding screen
  addText("You got caught!", options = { x: 3, y: 3, color: color`3` });
  if (timer > 30) {
    addText("Press 'L' to", options = { x: 4, y: 5, color: color`0` });
    addText("open the door", options = { x: 4, y: 6, color: color`0` });
  }
  setMap(misc.lost);
  clearInterval(game);
  clearInterval(guardAI);
  iterator = null;
  restart = true;
  level = 0;
}

// TODO: this handles util functions for the map changes
// otherwise too repetitive to do for each input
function nextMap() {
  clearText();
  
  iterator = cyclicIteration(guardPath[levelY][levelX]);

  // Unlock main prison door!
  const mainDoors = getAll("a");
  try {
    if (playerStats.getWardenKey && playerStats.lockpickMinigameDone && mainDoors.length !== 0) {
      mainDoors.forEach(door => door.remove());
    }
  } catch (error) {
    console.error("Error while unlocking main prison door:", error);
  }

  // Add text to screen
  try {
    if (screenText[levelY][levelX] != null) {
      screenText[levelY][levelX].forEach((text) => addText(text[0], options=text[1]));
    }
  } catch (error) {
    console.error("Error while adding screen text:", error);
  }

  // Check for keys already obtained
  const doorSprite = getAll("u");
  try {
    if (playerStats.getWardenKey && doorSprite.length !== 0) {
      doorSprite.forEach(door => door.remove());
      getAll("n").forEach(key => key.remove());
    }
  } catch (error) {
    console.error("Error while removing warden keys:", error);
  }

  // Unlock main hall doors!
  const mainHallDoors = getAll("x");
  const mainKeys = getAll("k");
  try {
    if (playerStats.getMainKey && mainHallDoors.length !== 0) {
      mainHallDoors.forEach(door => door.remove());
      mainKeys.forEach(key => key.remove());
    }
  } catch (error) {
    console.error("Error while unlocking main hall doors:", error);
  }

  // Detect win state
  try {
    if (levelX === 3 && levelY === 1) {
      addText("You WIN!", { y: 4, color: color`D` });
      playback.end();
      playTune(music.victory);
      setMap(misc.victory);
      clearInterval(game);
      clearInterval(guardAI);
    }
  } catch (error) {
    console.error("Error while detecting win state:", error);
  }
}




// Guard logic
function runGuard() {
  if (iterator != null) {
    const coords = iterator.next();
    const guardSprite = getGuard();

    guardSprite.x = coords.value[0];
    guardSprite.y = coords.value[1];

    if (coords.direction == "left") {
      guardSprite.type = "f";
      try {
        getFirst("g").remove() // BUGFIX: This fixed the duplicating guard glitch
      } catch (error) {
        console.log(error);
      }
    } else if (coords.direction == "right") {
      guardSprite.type = "g";
      try {
        getFirst("f").remove() // BUGFIX: This fixed the duplicating guard glitch
      } catch (error) {
        console.log(error);
      }
    }
  }

  let guard = getGuard();
  if (guard != null) {
    for (let x = guard.x - 1; x <= guard.x + 1; x++) {
      for (let y = guard.y - 1; y <= guard.y + 1; y++) {
        const sprites = getTile(x, y);

        // Can't use the func I built D:
        for (let sprite of sprites) {
          if (sprite.type == "p" || sprite.type == "o") {
            setCaught();
          }
        }
      }
    }
  }
}

// Most player physics is here
afterInput(() => {
  if (!minigame && !tutorial) {
    playerSprite = getPlayer();
    block = getTile(playerSprite.x, playerSprite.y);
    
    // If touch active laser then player die 
    if (blockHas(block, "h") || blockHas(block, "v")) {
      setCaught();
    }
  
    // If touch key then open all door
    if (blockHas(block, "k")) {
      getAll("x").forEach((door) => door.remove());
      getAll("z").forEach((door) => door.remove());

      getFirst("k").remove();
      playerStats.getMainKey = true;
      splashText("Doors open!", 1000);
    }

    // If touch vault finally, START DA MINIGAME!!!!!!
    if (blockHas(block, "y")) {
      startLockGame();
    }

    // If touch warden key
    if (blockHas(block, "n")) {
      getFirst("n").remove();
      playerStats.getWardenKey = true;
      splashText("What this do?", 1000)
    }

    // If touch master key
    if (blockHas(block, "m")) {
      getFirst("m").remove();
      playerStats.getMasterKey = true;
      splashText("Awesome!", 1000)
    }

    // If in 3x3 range of guard, caught!
    let guard = getGuard();
    if (guard != null) {
      for (let x = guard.x - 1; x <= guard.x + 1; x++) {
        for (let y = guard.y - 1; y <= guard.y + 1; y++) {
          const sprites = getTile(x, y);

          // Can't use the func I built D:
          for (let sprite of sprites) {
            if (sprite.type == "p" || sprite.type == "o") {
              setCaught();
            }
          }
        }
      }
    }
  }
});

/* Enable and disable all lasers every 1 sec, run timer */
var laserOn = false;
function updateGame() {
  // Timer!
  /* CREDIT TIMER: Thanks to https://sprig.hackclub.com/~/pIrXiIjFINorvL2bCYM9! */
  timerText = addText(`Escape in ${timer} secs`, { x: 1, y: 0, color: color`2`});
  
  let laserSprites = [];
  laserSprites.push.apply(laserSprites, getAll("j"));
  laserSprites.push.apply(laserSprites, getAll("c"));
  laserSprites.push.apply(laserSprites, getAll("h"));
  laserSprites.push.apply(laserSprites, getAll("v"));

  laserSprites.forEach((laser) => {
    if (laser.type == "j") {
      laser.type = "h";
    } else if (laser.type == "c") {
      laser.type = "v";
    } else if (laser.type == "h") {
      laser.type = "j";
    } else if (laser.type == "v") {
      laser.type = "c";
    }
  });

  playerSprite = getPlayer();
  block = getTile(playerSprite.x, playerSprite.y);

  //  Check if lasers touching player every sec
  if (blockHas(block, "h") || blockHas(block, "v")) {
    setCaught()
  }

  // Check if times out and Hakkuun has woken up!
  if (timer <= 0) {
    setCaught(false);
  }
  
  timer--;
}      
